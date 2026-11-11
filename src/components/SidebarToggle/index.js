/**
 * Navbar button that hides / shows the docs sidebar.
 * The choice is remembered in this browser. A small script in
 * docusaurus.config.js (headTags) applies it before the page paints,
 * so the sidebar doesn't flash.
 */
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

const KEY = 'itr-docs-sidebar-hidden';
const ATTR = 'data-sidebar-hidden';

function readHidden() {
  try {
    return localStorage.getItem(KEY) === 'true';
  } catch {
    return false;
  }
}

export default function SidebarToggle({mobile, className}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(readHidden());
  }, []);

  // Only meaningful on desktop; the phone menu already has its own sidebar
  if (mobile) return null;

  const toggle = () => {
    const next = !hidden;
    setHidden(next);
    document.documentElement.setAttribute(ATTR, String(next));
    try {
      localStorage.setItem(KEY, String(next));
    } catch {
      /* storage unavailable: the choice just won't be remembered */
    }
  };

  return (
    <button
      type="button"
      className={clsx('clean-btn', 'navbar__item', 'navbar-sidebar-toggle', className)}
      aria-pressed={hidden}
      aria-label={hidden ? 'Show sidebar' : 'Hide sidebar'}
      title={hidden ? 'Show sidebar' : 'Hide sidebar'}
      onClick={toggle}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 4v16" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    </button>
  );
}
