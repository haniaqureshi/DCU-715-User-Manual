/**
 * Adds custom navbar item types on top of Docusaurus' built-in ones.
 * Use them in docusaurus.config.js as { type: 'custom-sidebarToggle' }.
 */
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import SidebarToggle from '@site/src/components/SidebarToggle';

export default {
  ...ComponentTypes,
  'custom-sidebarToggle': SidebarToggle,
};
