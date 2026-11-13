/**
 * Docs page layout (swizzled from @docusaurus/theme-classic 3.10.2).
 *
 * Change from the original: the main content and the footer sit together in
 * one column to the right of the sidebar, so the left sidebar runs the full
 * height of the page (like the Tailwind CSS docs). The usual full-width footer
 * is hidden on docs pages in src/css/custom.css.
 */
import React, {useState} from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import Footer from '@theme/Footer';
import styles from './styles.module.css';

export default function DocRootLayout({children}) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <div
          className={clsx(
            'doc-main-column',
            styles.docMainColumn,
            (hiddenSidebarContainer || !sidebar) && styles.docMainColumnEnhanced,
          )}>
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocRootLayoutMain>
          <Footer placement="docs" />
        </div>
      </div>
    </div>
  );
}
