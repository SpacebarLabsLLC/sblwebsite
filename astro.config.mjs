// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
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
    resolve: {
      alias: {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },

  trailingSlash: 'never',

  devToolbar: {
    enabled: false,
  },
});
