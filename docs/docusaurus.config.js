// eslint-disable-next-line @typescript-eslint/no-require-imports
const lightCodeTheme = require('prism-react-renderer/themes/github');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Crypto Price Tracker',
  tagline: 'Top 5 cryptocurrency price tracking application',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MarianaES',
  projectName: 'crypto-price-tracker',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/MarianaES/crypto-price-tracker.git',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/MarianaES/crypto-price-tracker.git',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Crypto Price Tracker',
        logo: {
          alt: 'Crypto Price Tracker Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'project-setup',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/MarianaES/crypto-price-tracker.git',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: "Project Setup Guide",
                to: 'docs/project-setup/',
              },
              {
                label: 'API Integration',
                to: 'docs/api-integration/',
              },
              {
                label: 'State Management',
                to: 'docs/state-management/',
              },
              {
                label: "Challenges & Solutions",
                to: 'docs/challenges-solutions/',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/MarianaES/crypto-price-tracker.gits',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Crypto Tracker, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
