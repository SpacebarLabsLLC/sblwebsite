/**
 * spacebar//LABS — admin publish Worker.
 *
 * Receives POST /api/publish from /admin and commits a single JSON file to the
 * GitHub repo using a server-side stored PAT. The browser never sees the token.
 * The commit triggers a Workers Build, which rebuilds the static export and
 * promotes it — so publishing is just "commit and let CI redeploy".
 *
 * Trust model: Cloudflare Access is expected to gate /admin and every request
 * to this Worker. We additionally check for the Cf-Access-Jwt-Assertion header
 * as a defense-in-depth measure — if Access is bypassed or misconfigured, the
 * Worker refuses unauthenticated requests rather than writing to the repo.
 *
 * IMPORTANT: that header check is presence-only — it does not verify the JWT
 * signature, because Access has already done so upstream. That reasoning holds
 * only while EVERY route to this Worker passes through Access. The workers.dev
 * route does not, so it must be disabled (Settings -> Domains & Routes), or
 * anyone could forge the header and publish to the repo. If workers.dev has to
 * stay enabled, verify the JWT properly against
 * https://<team>.cloudflareaccess.com/cdn-cgi/access/certs instead.
 *
 * For all non-API requests the Worker hands off to the static assets bundle.
 *
 * Ported from the aireus-portfolio sibling site, minus the image-upload and
 * font-catalog routes, which SBL has no use for.
 */

interface Env {
  /** Static assets binding — the exported Next site in out/. */
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  /** Encrypted secret. Set with: npx wrangler secret put GITHUB_TOKEN */
  GITHUB_TOKEN: string;
  /** e.g. "SpacebarLabsLLC/sblwebsite" — plain var, set in wrangler.toml */
  GITHUB_REPO: string;
  /** e.g. "main" — plain var, set in wrangler.toml */
  GITHUB_BRANCH: string;
}

interface PublishPayload {
  /** Repo-relative path, e.g. "data/engagements.json" */
  path: string;
  /** Raw file content (UTF-8 string) */
  content: string;
  /** Commit message */
  message: string;
}

/** Only these files may ever be written, even if Access is bypassed. */
const ALLOWED_PATH = /^data\/[a-z0-9_-]+\.json$/i;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isAuthenticated(req: Request): boolean {
  // Cloudflare Access adds this header to every authenticated request. We do
  // not validate the JWT signature here — Access has already done that
  // upstream. We only verify the header is present.
  return req.headers.get('Cf-Access-Jwt-Assertion') !== null;
}

function utf8ToBase64(s: string): string {
  // Workers runtime: encode to bytes, then base64.
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

async function commitToGitHub(env: Env, payload: PublishPayload): Promise<Response> {
  const { path, content, message } = payload;
  const ghHeaders = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'sblwebsite-admin',
  };

  // 1. Look up the current file SHA — GitHub requires it to overwrite a file.
  const getRes = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}?ref=${env.GITHUB_BRANCH}`,
    { headers: ghHeaders }
  );

  let existingSha: string | undefined;
  if (getRes.ok) {
    const meta = (await getRes.json()) as { sha?: string };
    existingSha = meta.sha;
  } else if (getRes.status !== 404) {
    return jsonResponse(
      { error: 'github_lookup_failed', status: getRes.status, body: await getRes.text() },
      502
    );
  }

  // 2. Commit.
  const putRes = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: ghHeaders,
    body: JSON.stringify({
      message,
      content: utf8ToBase64(content),
      branch: env.GITHUB_BRANCH,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });

  if (!putRes.ok) {
    return jsonResponse(
      { error: 'github_commit_failed', status: putRes.status, body: await putRes.text() },
      502
    );
  }

  return jsonResponse(await putRes.json(), 200);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // /api/publish — commit one data file to GitHub.
    if (url.pathname === '/api/publish') {
      if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405);
      if (!isAuthenticated(req)) return jsonResponse({ error: 'unauthorized' }, 401);

      let payload: PublishPayload;
      try {
        payload = (await req.json()) as PublishPayload;
      } catch {
        return jsonResponse({ error: 'invalid_json' }, 400);
      }

      if (!payload.path || typeof payload.content !== 'string' || !payload.message) {
        return jsonResponse(
          { error: 'missing_fields', required: ['path', 'content', 'message'] },
          400
        );
      }

      if (!ALLOWED_PATH.test(payload.path)) {
        return jsonResponse({ error: 'path_not_allowed', path: payload.path }, 403);
      }

      // Reject anything that isn't parseable JSON before it reaches the repo —
      // a malformed commit would break the very next build.
      try {
        JSON.parse(payload.content);
      } catch {
        return jsonResponse({ error: 'content_not_valid_json' }, 400);
      }

      return commitToGitHub(env, payload);
    }

    // /api/whoami — confirms Access is forwarding identity. Used by /admin to
    // show who is signed in, and to fail loudly when Access is misconfigured.
    if (url.pathname === '/api/whoami') {
      if (!isAuthenticated(req)) return jsonResponse({ authenticated: false }, 401);
      return jsonResponse({
        authenticated: true,
        email: req.headers.get('Cf-Access-Authenticated-User-Email'),
      });
    }

    // Everything else: serve from the static assets bundle.
    return env.ASSETS.fetch(req);
  },
};
