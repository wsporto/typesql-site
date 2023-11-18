import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'TypeSQL',
    social: {
      github: 'https://github.com/wsporto/typesql'
    },
    sidebar: [{
      label: 'Overview',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Get started',
        link: '/guides/get-started/'
      }, {
        label: 'Automatic CRUD generation',
        link: '/guides/crud/'
      }, {
        label: 'Custom queries',
        link: '/guides/custom-queries/'
      }, {
        label: 'Nested query result',
        link: '/guides/nested-query-result/'
      }]
    }, {
      label: 'How-to Guides',
      autogenerate: {
        directory: 'how-to'
      }
    }],
    customCss: [
    // Relative path to your custom CSS file
    './src/styles/custom.css']
  })],
  output: "server",
  adapter: cloudflare()
});