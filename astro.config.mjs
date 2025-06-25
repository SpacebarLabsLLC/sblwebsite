// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),

  integrations: [
    react({ serverRuntime: 'cloudflare' }), // no alias hacks needed
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  trailingSlash: 'never',
  devToolbar: { enabled: false },
});
