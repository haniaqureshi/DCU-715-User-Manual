import {themes as prismThemes} from 'prism-react-renderer';
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DCU 715',
  favicon: 'img/favicon.ico',

  future: {
    // Improve compatibility with the upcoming Docusaurus v4
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // For the image zoom functionality, we are using the docusaurus-plugin-image-zoom plugin.
  // This plugin allows users to click on images in the documentation to view them in a larger format.
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // For the search functionality, we are using the local search plugin. 
  // This plugin indexes the documentation and provides a search bar for users to find relevant content quickly.
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
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // For the image zoom functionality, we are using the docusaurus-plugin-image-zoom plugin.
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          margin: 24,
          scrollOffset: 0,
        },
      },
      // For the table of contents functionality, we are using the built-in Docusaurus table of contents feature.
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
          // ...
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },

      // Footer configuration for the website, including links to documentation, resources, and social media.
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Routes',
                to: '/Routes/',
              },
              {
                label: 'Measurements',
                to: '/Measurements/',
              },
              {
                label: 'Special Tests',
                to: '/SpecialTests/',
              },
              {
                label: 'DCU Setup',
                to: '/DCUSetup/',
              },
              {
                label: 'Power',
                to: '/Power/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Appendix A: Glossary',
                to: '/Appendix/glossary',
              },
              {
                label: 'Appendix B: Troubleshooting',
                to: '/Appendix/troubleshooting',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/company/industrial-technology-research',
              },
              {
                label: 'Website',
                href: 'https://www.itr.com/',
              },
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