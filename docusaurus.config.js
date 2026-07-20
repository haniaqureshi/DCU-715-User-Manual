import {themes as prismThemes} from 'prism-react-renderer';
import figureRegister from "./plugins/remark-figure-register.mjs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DCU 715',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-image-zoom',
      {
        selector: '.markdown img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          remarkPlugins: [figureRegister],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          margin: 24,
          scrollOffset: 0,
        },
      },
      themeConfig: {
        tableOfContents: {
          minHeadingLevel: 2,
          maxHeadingLevel: 5,
        },
      },
      navbar: {
        title: 'DCU 715',
        logo: {
          alt: 'DCU 715',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'localeDropdown',
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
              { label: 'Routes', to: '/Routes/' },
              { label: 'Measurements', to: '/Measurements/' },
              { label: 'Special Tests', to: '/SpecialTests/' },
              { label: 'DCU Setup', to: '/DCUSetup/' },
              { label: 'Power', to: '/Power/' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Introduction', to: '/' },
              { label: 'Appendix A: URE Measurements', to: '/Appendix/UREMeasurements' },
              { label: 'Appendix B: Troubleshooting', to: '/Appendix/troubleshooting' },
              { label: 'Appendix C: Glossary', to: '/Appendix/glossary' },
            ],
          },
          {
            title: 'Social',
            items: [
              { label: 'LinkedIn', to: 'https://www.linkedin.com/company/industrial-technology-research' },
              { label: 'Website', href: 'https://www.itr.com/' },
            ],
          },
        ],
        copyright: `Copyright © 2016 - ${new Date().getFullYear()} ITR - Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;