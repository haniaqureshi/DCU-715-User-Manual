import {themes as prismThemes} from 'prism-react-renderer';
import figureRegister from "./plugins/remark-figure-register.mjs";

// PDF numbering plugin (see plugins/remark-pdf-numbering.mjs)
import pdfNumbering from "./plugins/remark-pdf-numbering.mjs";

// Writes llms.txt, llms-full.txt and sitemap.md for AI agents (see plugins/llms-files.mjs)
import llmsFiles from "./plugins/llms-files.mjs";

// true only while "yarn pdf" runs, so the numbers never appear on the website
const IS_PDF_BUILD = process.env.PDF_BUILD === 'true';

// Docs version shown in the navbar. Update this when you tag a new release on GitHub.
const DOCS_VERSION = 'v1.0.0';
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

  // "generated" holds llms.txt, llms-full.txt and sitemap.md (made by plugins/llms-files.mjs)
  staticDirectories: ['static', 'generated'],

  // Read by the footer (src/theme/Footer) for the Contact link
  customFields: {
    supportUrl: SUPPORT_URL,
  },

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
    llmsFiles,
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

      // The footer is a custom component: edit its links in src/theme/Footer/index.js
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;