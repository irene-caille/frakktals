import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import playformCompress from '@playform/compress';
import { defineConfig } from 'astro/config';
import settings from './settings.json';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: settings.url,
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), mdx(), keystatic(), sitemap(), playformCompress({
    Image: false
  })],
  output: 'hybrid',
  adapter: netlify({
	imageCDN:false
  })
});