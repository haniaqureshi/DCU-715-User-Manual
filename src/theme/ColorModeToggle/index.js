/**
 * Theme switch: a sun / moon pill like Tonder's docs.
 * Replaces Docusaurus' built-in toggle (swizzled ColorModeToggle).
 * Until a visitor picks one, the site follows their system setting.
 */
import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

function ColorModeToggle({className, onChange}) {
  const isBrowser = useIsBrowser();
  return (
    <div className={clsx(styles.pill, className)} role="group" aria-label="Theme">
      <button
        type="button"
        className={clsx('clean-btn', styles.option, styles.light)}
        disabled={!isBrowser}
        aria-label="Light theme"
        title="Light theme"
        onClick={() => onChange('light')}>
        <IconLightMode aria-hidden width={18} height={18} />
      </button>
      <button
        type="button"
        className={clsx('clean-btn', styles.option, styles.dark)}
        disabled={!isBrowser}
        aria-label="Dark theme"
        title="Dark theme"
        onClick={() => onChange('dark')}>
        <IconDarkMode aria-hidden width={18} height={18} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
