import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Infinite Client',
  tagline: 'Lightweight Fabric utility client for Minecraft 1.21.10',
  favicon: 'img/infinite-icon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // Production site root (no path segments)
  url: 'https://infinite-client.infinityon.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'The-Infinitys', // Usually your GitHub org/user name.
  projectName: 'minecraft.infinite-client', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Infinite-Client/infinite-client/tree/main/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Infinite-Client/infinite-client/tree/main/docs',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/infinite-icon.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Infinite Client',
      logo: {
        alt: 'Infinite Client Logo',
        src: 'img/infinite-icon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/downloads',
          label: 'Download',
          position: 'right',
        },
        {
          href: 'https://github.com/Infinite-Client/infinite-client',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub Repo',
              href: 'https://github.com/Infinite-Client/infinite-client',
            },
            {
              label: 'Releases',
              to: '/downloads',
            },
            {
              label: 'Issue Tracker',
              href: 'https://github.com/Infinite-Client/infinite-client/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Homepage',
              href: 'https://the-infinitys.f5.si/minecraft/infinite-client',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Infinite-Client/infinite-client',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Infinite Client.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
