/**
 * Browser-tab titles: just the page title ("Create New Route"),
 * without " | DCU 715" on the end. Pages without a title fall back to the site name.
 */
import React from 'react';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';

const formatter = ({title, siteTitle}) => title?.trim() || siteTitle;

export default function ThemeProviderTitleFormatter({children}) {
  return <TitleFormatterProvider formatter={formatter}>{children}</TitleFormatterProvider>;
}
