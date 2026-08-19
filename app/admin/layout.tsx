import type { Metadata } from 'next';

// The admin route is gated by Cloudflare Access at the edge, but keep it out of
// search results regardless — Access returns a login page to crawlers, which is
// still not something worth indexing.
export const metadata: Metadata = {
  title: 'Admin — spacebar//LABS',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
