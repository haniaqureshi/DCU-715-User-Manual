import {themes as prismThemes} from 'prism-react-renderer';
import figureRegister from "./plugins/remark-figure-register.mjs";

// PDF numbering plugin (see plugins/remark-pdf-numbering.mjs)
import pdfNumbering from "./plugins/remark-pdf-numbering.mjs";

// true only while "yarn pdf" runs, so the numbers never appear on the website
const IS_PDF_BUILD = process.env.PDF_BUILD === 'true';

// Docs version shown in the navbar. Update this when you tag a new release on GitHub.
const DOCS_VERSION = 'v1.0';
const GITHUB_REPO = 'https://github.com/haniaqureshi/DCU-715-User-Manual';
// The "Support" link in the top bar opens an email to this address
const SUPPORT_URL = 'mailto:support@ITR.com';

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

  // Inter: the site font (free; it's the font Tonder's docs fall back to)
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap',
      type: 'text/css',
    },
  ],

  // Re-applies "sidebar hidden" before the page paints, so the sidebar doesn't flash
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
    {
      tagName: 'script',
      attributes: {},
      innerHTML:
        "try{if(localStorage.getItem('itr-docs-sidebar-hidden')==='true'){document.documentElement.setAttribute('data-sidebar-hidden','true')}}catch(e){}",
    },
  ],

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
          // add chapter/section numbers only when building the PDF
          remarkPlugins: IS_PDF_BUILD ? [figureRegister, pdfNumbering] : [figureRegister],
          // Sidebar = the docs folders as they are (Getting Started is docs/0-GettingStarted),
          // plus a "Powered by Docusaurus" line at the bottom
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebar = await defaultSidebarItemsGenerator(args);
            // "Powered by Docusaurus" line at the very bottom of the sidebar
            return [
              ...sidebar,
              {
                type: 'html',
                defaultStyle: false,
                className: 'sidebar-powered-by',
                value: '<a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Powered by <img src="/img/docusaurus-logo.svg" alt="" width="18" height="18" /><span class="sidebar-powered-by__name">Docusaurus</span></a>',
              },
            ];
          },
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
        items: [
          // Version label (not a tab) - links to the GitHub releases page
          {
            type: 'html',
            position: 'left',
            className: 'navbar-version',
            value: `<a href="${GITHUB_REPO}/releases" target="_blank" rel="noopener noreferrer" title="Docs version ${DOCS_VERSION} (view releases on GitHub)">${DOCS_VERSION}</a>`,
          },
          // Thin grey divider between the version and the tabs
          {
            type: 'html',
            position: 'left',
            className: 'navbar-divider',
            value: '<span aria-hidden="true"></span>',
          },
          // Home tab - the docs home page (src/pages/index.js)
          {
            to: '/',
            label: 'Home',
            position: 'left',
            className: 'navbar-tab',
            activeBaseRegex: '^/$',
          },
          // Documentation tab - active on every docs page except Home and Search
          {
            to: '/intro',
            label: 'Documentation',
            position: 'left',
            className: 'navbar-tab',
            activeBaseRegex: '^/(?!$|search)',
          },
          // Right side of the top row (the search box is centred by CSS)
          {
            href: SUPPORT_URL,
            label: 'Support',
            position: 'right',
            className: 'navbar-support',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'custom-sidebarToggle',
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
              { label: 'Introduction', to: '/intro' },
              { label: 'Appendix A: URE Measurements', to: '/Appendix/A-UREMeasurements' },
              { label: 'Appendix B: Troubleshooting', to: '/Appendix/B-Troubleshooting/' },
              { label: 'Appendix C: Glossary', to: '/Appendix/C-glossary' },
            ],
          },
          {
            title: 'Social',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/industrial-technology-research' },
              { label: 'Website', href: 'https://www.itr.com/' },
            ],
          },
          {
            title: 'Conformance',
            items: [
              {
                html: `
                  <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" title="Explanation of WCAG 2 Level AA conformance">
                    <img height="31" width="88" src="https://www.w3.org/WAI/WCAG22/wcag2.2AA" alt="Level AA conformance, W3C Web Content Accessibility Guidelines 2.2" />
                  </a>
                `,
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