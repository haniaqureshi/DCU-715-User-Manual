/**
 * Docs home page ("Home" tab): hero + section tiles.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const SUPPORT_EMAIL = 'support@ITR.com';

/* ---------- Tile illustrations (simple shapes in the brand blues) ---------- */
const Art = {
  start: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="250" cy="20" r="120" />
      <rect className={styles.card} x="70" y="22" width="180" height="128" rx="14" />
      <rect className={styles.mid} x="84" y="36" width="152" height="18" rx="5" />
      <rect className={styles.soft} x="84" y="64" width="96" height="60" rx="6" />
      <rect className={styles.soft} x="188" y="64" width="48" height="26" rx="6" />
      <rect className={styles.accent} x="188" y="98" width="48" height="26" rx="6" />
    </svg>
  ),
  routes: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="40" cy="150" r="110" />
      <path className={styles.line} d="M60 108 C110 108 100 44 160 44 S210 108 262 96" />
      <circle className={styles.card} cx="60" cy="108" r="18" />
      <circle className={styles.accent} cx="60" cy="108" r="7" />
      <circle className={styles.card} cx="160" cy="44" r="18" />
      <circle className={styles.mid} cx="160" cy="44" r="7" />
      <circle className={styles.card} cx="262" cy="96" r="18" />
      <circle className={styles.mid} cx="262" cy="96" r="7" />
    </svg>
  ),
  measurements: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="290" cy="140" r="115" />
      <rect className={styles.card} x="60" y="24" width="200" height="126" rx="14" />
      <rect className={styles.soft} x="84" y="96" width="22" height="40" rx="4" />
      <rect className={styles.mid} x="118" y="70" width="22" height="66" rx="4" />
      <rect className={styles.soft} x="152" y="84" width="22" height="52" rx="4" />
      <rect className={styles.accent} x="186" y="48" width="22" height="88" rx="4" />
      <rect className={styles.mid} x="220" y="76" width="22" height="60" rx="4" />
    </svg>
  ),
  special: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="40" cy="10" r="110" />
      <rect className={styles.card} x="50" y="26" width="220" height="124" rx="14" />
      <path className={styles.gridLine} d="M66 88 H254" />
      <path
        className={styles.wave}
        d="M66 88 C78 52 90 52 102 88 S126 124 138 88 S162 40 174 88 S198 136 210 88 S234 62 254 88"
      />
    </svg>
  ),
  setup: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="280" cy="10" r="115" />
      <rect className={styles.card} x="70" y="24" width="180" height="126" rx="14" />
      <rect className={styles.soft} x="88" y="48" width="144" height="6" rx="3" />
      <circle className={styles.accent} cx="190" cy="51" r="10" />
      <rect className={styles.soft} x="88" y="84" width="144" height="6" rx="3" />
      <circle className={styles.mid} cx="122" cy="87" r="10" />
      <rect className={styles.soft} x="88" y="120" width="144" height="6" rx="3" />
      <circle className={styles.mid} cx="214" cy="123" r="10" />
    </svg>
  ),
  power: (
    <svg viewBox="0 0 320 150" aria-hidden="true">
      <circle className={styles.blob} cx="160" cy="170" r="120" />
      <circle className={styles.card} cx="160" cy="80" r="50" />
      <path className={styles.powerIcon} d="M144 66 A24 24 0 1 0 176 66" />
      <path className={styles.powerIcon} d="M160 54 V80" />
    </svg>
  ),
};

const SECTIONS = [
  {
    title: 'Getting Started',
    to: '/intro',
    art: Art.start,
    description:
      'Get to know the Series 715 Digital Collection Unit: its screen layout, hardware and how it works.',
  },
  {
    title: 'Routes',
    to: '/Routes/',
    art: Art.routes,
    description: 'Create, update, select and delete the measurement routes you collect vibration data on.',
  },
  {
    title: 'Measurements',
    to: '/Measurements/',
    art: Art.measurements,
    description: 'Perform, review, manage and transmit the measurement data collected from your routes.',
  },
  {
    title: 'Special Tests',
    to: '/SpecialTests/',
    art: Art.special,
    description:
      'Run advanced vibration tests such as bump, coast down, orbit plot, waterfall and balancing.',
  },
  {
    title: 'DCU Setup',
    to: '/DCUSetup/',
    art: Art.setup,
    description: 'Maintain, test and configure the DCU before you take it into the field.',
  },
  {
    title: 'Power',
    to: '/Power/',
    art: Art.power,
    description: 'Turn off the DCU, minimize the application, or close it while the DCU stays on.',
  },
];

const REFERENCE = [
  {
    title: 'Troubleshooting',
    to: '/Appendix/B-Troubleshooting/',
    description: 'Common errors and how to fix them.',
    icon: <path d="M12 8v5M12 16.5v.5M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />,
  },
  {
    title: 'Glossary',
    to: '/Appendix/C-glossary',
    description: 'Terms and abbreviations used in this manual.',
    icon: <path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2Zm0 0A2 2 0 0 0 6 22h14M8 7h8M8 11h6" />,
  },
  {
    title: 'URE Measurements',
    to: '/Appendix/A-UREMeasurements',
    description: 'Ultrasonic Resonance Excitation: detecting impulsive faults on slow-speed assets.',
    icon: <path d="M3 12h3l3-8 4 16 3-8h5" />,
  },
];

function openSearch() {
  const input = document.querySelector('.navbar__search-input');
  if (input) input.focus();
}

export default function Home() {
  return (
    <Layout
      title="DCU 715"
      description="Learn how to use the ITR Series 715 Digital Collection Unit.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>ITR · Series 715 Digital Collection Unit</p>
          <h1 className={styles.title}>Learn how to use DCU 715</h1>
          <p className={styles.lead}>
            Step-by-step modules for collecting, reviewing and transmitting vibration data with your DCU 715.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} to="/intro">
              Get started
            </Link>
            <a className={styles.secondaryButton} href={`mailto:${SUPPORT_EMAIL}`}>
              Contact support
            </a>
          </div>
          <button type="button" className={styles.searchBox} onClick={openSearch}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Search the DCU 715 modules...
          </button>
        </header>

        <section aria-labelledby="sections-heading">
          <h2 id="sections-heading" className={styles.sectionTitle}>
            Explore the modules 
          </h2>
          <div className={styles.tiles}>
            {SECTIONS.map(({title, to, art, description}) => (
              <Link key={title} to={to} className={styles.tile}>
                <div className={styles.tileArt}>{art}</div>
                <div className={styles.tileBody}>
                  <h3 className={styles.tileTitle}>{title}</h3>
                  <p className={styles.tileText}>{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="reference-heading" className={styles.referenceSection}>
          <h2 id="reference-heading" className={styles.sectionTitle}>
            Reference
          </h2>
          <div className={styles.refTiles}>
            {REFERENCE.map(({title, to, description, icon}) => (
              <Link key={title} to={to} className={styles.refTile}>
                <span className={styles.refIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true">
                    {icon}
                  </svg>
                </span>
                <span>
                  <span className={styles.refTitle}>{title}</span>
                  <span className={styles.refText}>{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
