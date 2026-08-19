import type { MetadataRoute } from 'next';

// Required by `output: "export"` — metadata routes must opt in to being
// generated at build time rather than served dynamically.
export const dynamic = 'force-static';

// Cloudflare Access already gates /admin at the edge; this just keeps it out of
// crawl queues too.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
  };
}
