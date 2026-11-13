/**
 * Site footer (replaces the Docusaurus footer).
 *
 * Layout, left-aligned like the Tailwind and Yuno docs:
 *   - Top: ITR logo, short description, copyright and the WCAG badge,
 *     then the link columns.
 *   - Bottom bar: "Powered by Docusaurus" on the left,
 *     "Built with ♥ by Javeria Qureshi" on the right.
 *
 * On docs pages the footer is drawn inside the content column, next to the
 * full-height left sidebar (see src/theme/DocRoot/Layout). On every other
 * page (Home, About, Search) Docusaurus draws it full width as usual.
 *
 * To change a link, edit the COLUMNS list below.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// type: 'doc' = page in this site, 'file' = static file (llms.txt etc.),
// 'external' = another website (opens in a new tab), 'mail' = email link
const COLUMNS = [
  {
    title: 'Documentation',
    items: [
      {label: 'Getting started', to: '/intro', type: 'doc'},
      {label: 'Routes', to: '/Routes/', type: 'doc'},
      {label: 'Measurements', to: '/Measurements/', type: 'doc'},
      {label: 'Special Tests', to: '/SpecialTests/', type: 'doc'},
      {label: 'DCU Setup', to: '/DCUSetup/', type: 'doc'},
      {label: 'Power', to: '/Power/', type: 'doc'},
    ],
  },
  {
    title: 'Resources',
    items: [
      {label: 'Appendix', to: '/Appendix/', type: 'doc'},
      {label: 'URE measurements', to: '/Appendix/A-UREMeasurements', type: 'doc'},
      {label: 'Troubleshooting', to: '/Appendix/B-Troubleshooting/', type: 'doc'},
      {label: 'Glossary', to: '/Appendix/C-glossary', type: 'doc'},
    ],
  },
  {
    title: 'For AI agents',
    items: [
      {label: 'llms.txt', to: '/llms.txt', type: 'file'},
      {label: 'llms-full.txt', to: '/llms-full.txt', type: 'file'},
      {label: 'AGENTS.md', to: '/AGENTS.md', type: 'file'},
      {label: 'Sitemap (markdown)', to: '/sitemap.md', type: 'file'},
    ],
  },
  {
    title: 'Company',
    items: [
      {label: 'About', to: '/about', type: 'doc'},
      {label: 'Contact', type: 'mail'},
      {label: 'ITR website', to: 'https://www.itr.com/', type: 'external'},
      {label: 'LinkedIn', to: 'https://www.linkedin.com/company/industrial-technology-research', type: 'external'},
    ],
  },
];

function ExternalIcon() {
  return (
    <svg className="site-footer__ext" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
    </svg>
  );
}

function FooterLink({item, supportUrl, fileUrl}) {
  if (item.type === 'doc') {
    return <Link className="site-footer__link" to={item.to}>{item.label}</Link>;
  }
  if (item.type === 'mail') {
    return <a className="site-footer__link" href={supportUrl}>{item.label}</a>;
  }
  if (item.type === 'file') {
    // Plain link so the browser loads the text file instead of the site router
    return <a className="site-footer__link" href={fileUrl(item.to)}>{item.label}</a>;
  }
  return (
    <a className="site-footer__link" href={item.to} target="_blank" rel="noopener noreferrer">
      {item.label}
      <ExternalIcon />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Footer({placement = 'page'}) {
  const {siteConfig} = useDocusaurusContext();
  const supportUrl = siteConfig.customFields?.supportUrl ?? 'mailto:support@ITR.com';
  const logoUrl = useBaseUrl('/img/logo.png');
  const docusaurusLogoUrl = useBaseUrl('/img/docusaurus-logo.svg');
  const baseUrl = useBaseUrl('/');
  const fileUrl = (path) => baseUrl.replace(/\/$/, '') + path;
  const year = new Date().getFullYear();

  return (
    <footer className={clsx('site-footer', `site-footer--${placement}`)}>
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              <img src={logoUrl} alt="" width="36" height="36" />
              <span>DCU 715 User Manual</span>
            </Link>
            <p className="site-footer__tagline">
              How to set up, use and maintain the ITR Series 715 Digital Collection Unit.
            </p>
            <p className="site-footer__copyright">Copyright © 2016–{year} ITR</p>
            <a
              className="site-footer__badge"
              href="https://www.w3.org/WAI/WCAG2AA-Conformance"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://www.w3.org/WAI/WCAG22/wcag2.2AA"
                width="88"
                height="31"
                alt="Level AA conformance, W3C Web Content Accessibility Guidelines 2.2 (opens in a new tab)"
              />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav className="site-footer__col" key={col.title} aria-labelledby={`footer-${placement}-${col.title.replace(/\s+/g, '-').toLowerCase()}`}>
              <h2 className="site-footer__title" id={`footer-${placement}-${col.title.replace(/\s+/g, '-').toLowerCase()}`}>
                {col.title}
              </h2>
              <ul className="site-footer__list">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} supportUrl={supportUrl} fileUrl={fileUrl} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <a className="site-footer__powered" href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">
            Powered by
            <img src={docusaurusLogoUrl} alt="" width="18" height="18" />
            <span className="site-footer__powered-name">Docusaurus</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="site-footer__credit">
            Built with <span className="site-footer__heart" aria-hidden="true">♥</span>
            <span className="sr-only">love</span> by Javeria Qureshi
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
