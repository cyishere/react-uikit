// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx({
      rehypePlugins: [rehypeSlug]
    })
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import']
        }
      }
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'material-theme-lighter'
    }
  }
});
