import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static (no route handlers, middleware, or server data
  // fetching), so export plain HTML/CSS/JS into `out/` — the directory the
  // Worker serves as static assets (see [assets] in wrangler.toml).
  output: "export",

  // next/image's optimizer needs a server; static export has none.
  images: { unoptimized: true },

  // Emit `/about/index.html` instead of `/about.html`, so the Worker serves
  // clean URLs directly instead of redirecting to them.
  trailingSlash: true,
};

export default nextConfig;
