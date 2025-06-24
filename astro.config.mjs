// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare'; // ✅ REQUIRED

export default defineConfig({
  output: 'server', // ✅ so /api/chat works adsadas
  adapter: cloudflare(),

  integrations: [
    react(),
    sitemap({
      serialize: (item) => {
        const url = item.url.endsWith('/') ? item.url.slice(0, -1) : item.url;
        return { ...item, url };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  trailingSlash: 'never',

  devToolbar: {
    enabled: false,
  },
});
