# spacebar//LABS

Marketing site for spacebar//LABS. A static Next.js export served by a
Cloudflare Worker, with a git-backed admin editor.

## Architecture

`next build` exports the whole site to `out/` (`output: "export"` in
`next.config.ts`) — there is no server rendering. A Worker sits in front purely
to back the admin editor:

```
GET  /, /admin/, …        -> served from the static asset bundle (free, no Worker)
POST /admin/api/publish   -> Worker commits one data file to GitHub
GET  /admin/api/whoami    -> Worker echoes the Access identity
```

Page copy lives in `data/*.json`, not in components. `/admin` edits those files
and commits them to GitHub via `/admin/api/publish`; the push triggers a Workers Build,
which rebuilds the export and promotes it. So publishing is "commit and let CI
redeploy" — there is no database and no runtime content store.

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | The site. Reads from `data/*.json` |
| `app/admin/` | Editor UI (Cloudflare Access gated) |
| `worker/index.ts` | Publish API + asset fallback |
| `data/*.json` | Source of truth for all copy |

## Local development

```bash
npm install
npm run dev      # Next dev server on :3000
npm run preview  # Build, then serve through the real Worker on :8787
```

`/admin/api/*` only works under `npm run preview` — the Next dev server has no
Worker.
Locally there is no Access in front, so the Worker accepts any request carrying a
`Cf-Access-Jwt-Assertion` header; that is a local-only convenience.

## Deploying

Pushes to `main` are built and deployed by Workers Builds. Dashboard settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` |
| Root directory | `/` |

The Worker name in the dashboard must match `name` in `wrangler.toml`
(`sblwebsite`) or the build fails. To deploy by hand instead: `npm run deploy`.

## Required configuration

1. **`GITHUB_TOKEN`** — a fine-grained PAT with Contents: read/write on this repo
   only. Never committed:
   ```bash
   npx wrangler secret put GITHUB_TOKEN
   ```
2. **Cloudflare Access** — one Zero Trust application on `/admin` covers both
   the editor and its API, since everything privileged lives under that path.
3. **Leave `workers_dev` and `preview_urls` off.** Both are already set to
   `false` in `wrangler.toml`. The Worker trusts the `Cf-Access-Jwt-Assertion`
   header without verifying its signature, which is only safe while every route
   to the Worker passes through Access. A custom domain alone does not achieve
   that — `workers.dev` and per-version preview URLs resolve to the same Worker
   and bypass a domain-scoped Access policy. If either is ever re-enabled, the
   Worker must verify the JWT properly instead. See the note at the top of
   `worker/index.ts`.

## Editing content

Prefer `/admin`. To edit by hand, change `data/*.json` and push — same result,
same rebuild. Only three things are written: `engagements.json` (the index),
`capabilities.json`, and `socials.json`.

Two rules the copy depends on:

- **Everything must be verifiable.** No invented metrics, clients, or dates.
- **Keep capabilities shorter than the index is long.** The evidence should
  outweigh the claim.

An engagement or social with an empty `href` renders as plain text rather than
a dead link.
