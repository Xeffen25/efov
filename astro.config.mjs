import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    runtime: {
      mode: "local"
    },
    imageService: "cloudflare"
  }),
  scopedStyleStrategy: "class",
  build: {
    inlineStylesheets: "auto"
  },
  vite: {
    build: {
      assetsInlineLimit: 256
    }
  },
  output: "server"
});