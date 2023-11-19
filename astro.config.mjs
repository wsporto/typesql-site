import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
      },
      {
        label: 'Transaction',
        link: '/guides/transaction/'
      }
    ]
    }, {
      label: 'How-to Guides',
      items: [
        {
          label: 'IN/NOT IN',
          link: '/how-to/in-operator'
        },
        {
          label: 'Count relations',
          link: '/how-to/count-relations'
        },
        {
          label: 'UPSERT',
          link: '/how-to/upsert'
        },
        {
          label: 'WITH RECURSIVE',
          link: '/how-to/with-recursive'
        }
      ]
    }],
    customCss: [
    // Relative path to your custom CSS file
    './src/styles/custom.css']
  })]
});