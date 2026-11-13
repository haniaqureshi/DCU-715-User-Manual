/**
 * Generates the "For AI agents" files linked in the footer:
 *
 *   /llms.txt       index of every page, grouped by sidebar section (https://llmstxt.org)
 *   /llms-full.txt  the full text of every page in one file, cleaned of MDX code
 *   /sitemap.md     the page tree as a Markdown list
 *
 * (AGENTS.md is written by hand: static/AGENTS.md.)
 *
 * The files are rebuilt every time the docs load (yarn start and yarn build)
 * and written to the "generated" folder, which docusaurus.config.js serves as
 * an extra static folder. The folder is in .gitignore, so never edit it by hand.
 *
 * Links are absolute when `url` in docusaurus.config.js is a real address.
 * While it is still the "example.com" placeholder, links start with "/".
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR_NAME = 'generated';

const SITE_SUMMARY =
  'User manual for the ITR Series 715 Digital Collection Unit (DCU 715), a portable ' +
  'vibration data collector used for predictive maintenance. It explains how to start ' +
  'the unit, collect route measurements, run special tests, set up and maintain the DCU, ' +
  'and turn it off.';

/* ---------- helpers ---------- */

function writeIfChanged(file, content) {
  try {
    if (fs.readFileSync(file, 'utf8') === content) return;
  } catch {
    // file doesn't exist yet
  }
  fs.writeFileSync(file, content, 'utf8');
}

function oneLine(text = '', max = 200) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

// Reads a JSX attribute: name="..." | name='...' | name={"..."} | name={'...'}
function attr(tag, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*(?:\\{\\s*)?(["'])([\\s\\S]*?)\\1`);
  const m = tag.match(re);
  return m ? m[2] : '';
}

/**
 * Turns one MDX page into plain Markdown that a language model can read.
 */
function mdxToMarkdown(source, {filePath, docsDir, linkFor}) {
  let text = source.replace(/\r\n/g, '\n');

  // Front matter, imports and exports
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  text = text.replace(/^(?:import|export)\s.*$/gm, '');

  // Figure captions, so <FigureRef id="..."/> can say which figure it means
  const captions = {};
  for (const m of text.matchAll(/<Figure\b[\s\S]*?\/>/g)) {
    const id = attr(m[0], 'id');
    if (id) captions[id] = attr(m[0], 'caption');
  }

  // <Figure .../> -> [Figure: caption. alt text]
  text = text.replace(/^([ \t]*)<Figure\b[\s\S]*?\/>/gm, (tag, indent) => {
    const caption = attr(tag, 'caption');
    const alt = attr(tag, 'alt');
    const parts = [caption, alt && alt !== caption ? alt : ''].filter(Boolean);
    // Keep figures inside list items, but never indent 4+ spaces (that's a code block)
    const pad = indent.length ? '   ' : '';
    return parts.length ? `${pad}[Figure: ${parts.join('. ')}]` : '';
  });
  text = text.replace(/<FigureRef\b[\s\S]*?\/>/g, (tag) => {
    const caption = captions[attr(tag, 'id')];
    return caption ? `the figure "${caption}"` : 'the figure';
  });
  text = text.replace(/^[ \t]*<\/?FigureProvider>[ \t]*$/gm, '');

  // Links to other pages: ./Page.mdx -> page URL
  text = text.replace(/\]\(([^)\s]+?\.mdx?)(#[^)\s]*)?\)/g, (all, target, hash = '') => {
    if (/^[a-z]+:/i.test(target)) return all;
    const abs = path.resolve(path.dirname(filePath), target);
    const rel = path.relative(docsDir, abs).split(path.sep).join('/');
    const url = linkFor(rel);
    return url ? `](${url}${hash})` : all;
  });

  // Tidy up blank lines left behind
  return text.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
}

// First real paragraph of a cleaned page (Docusaurus cuts descriptions at the first line break)
function firstParagraph(markdown) {
  for (const block of markdown.split(/\n\s*\n/)) {
    const b = block.trim();
    if (!b || /^(#|:::|\[Figure|<|[-*] |\d+\. |\|)/.test(b)) continue;
    return b.replace(/\*\*|__/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  }
  return '';
}

/* ---------- plugin ---------- */

export default function llmsFilesPlugin(context) {
  const {siteDir, siteConfig} = context;
  const outDir = path.join(siteDir, OUT_DIR_NAME);
  // Create the folder now, so the dev server can serve it from the start
  fs.mkdirSync(outDir, {recursive: true});

  return {
    name: 'llms-files',

    async allContentLoaded({allContent}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      if (!docsContent) return;
      const version = docsContent.loadedVersions[0];
      const docsDir = path.join(siteDir, version.path ?? 'docs');

      const placeholderUrl = /example\.com/.test(siteConfig.url);
      const origin = placeholderUrl ? '' : siteConfig.url.replace(/\/$/, '');
      const abs = (p) => `${origin}${p}`;

      const docsById = new Map(version.docs.map((d) => [d.id, d]));
      const docsBySource = new Map(
        version.docs.map((d) => [d.source.replace(/^@site\/docs\//, ''), d]),
      );
      const linkFor = (rel) => {
        const doc = docsBySource.get(rel);
        return doc ? abs(doc.permalink) : null;
      };

      // Walk the sidebar in order: [{doc, depth, section}]
      const sidebar = Object.values(version.sidebars)[0] ?? [];
      const ordered = [];
      const seen = new Set();
      const pushDoc = (id, depth, section) => {
        const doc = docsById.get(id);
        if (!doc || seen.has(id)) return;
        seen.add(id);
        ordered.push({doc, depth, section});
      };
      const walk = (items, depth, section) => {
        for (const item of items) {
          if (item.type === 'doc' || item.type === 'ref') {
            pushDoc(item.id, depth, section);
          } else if (item.type === 'category') {
            const sec = depth === 0 ? item.label : section;
            const linkId = item.link?.type === 'doc' ? item.link.id : null;
            if (depth > 0 && !(linkId && docsById.has(linkId) && !seen.has(linkId))) {
              ordered.push({heading: item.label, depth, section: sec});
            } else if (linkId) {
              pushDoc(linkId, depth, sec);
            }
            walk(item.items, depth + 1, sec);
          }
        }
      };
      walk(sidebar, 0, 'Pages');
      // Anything not in the sidebar goes at the end
      version.docs.forEach((d) => pushDoc(d.id, 0, 'Other pages'));

      // Clean every page once; used for descriptions and llms-full.txt
      const bodies = new Map();
      for (const {doc} of ordered.filter((e) => e.doc)) {
        const filePath = path.join(siteDir, doc.source.replace(/^@site\//, ''));
        try {
          bodies.set(doc.id, mdxToMarkdown(fs.readFileSync(filePath, 'utf8'), {filePath, docsDir, linkFor}));
        } catch {
          bodies.set(doc.id, oneLine(doc.description, 500));
        }
      }
      const describe = (doc) =>
        oneLine(doc.frontMatter?.description || firstParagraph(bodies.get(doc.id) ?? '') || doc.description);
      // "Overview" alone says little in a flat list, so name the section too
      const titleOf = (doc, section) => (doc.title === 'Overview' ? `${section} overview` : doc.title);

      const sections = [...new Set(ordered.map((e) => e.section))];
      const docsIn = (section) => ordered.filter((e) => e.section === section && e.doc);
      const title = `${siteConfig.title} User Manual`;

      /* llms.txt */
      const llms = [
        `# ${title}`,
        '',
        `> ${SITE_SUMMARY}`,
        '',
        'Each link below opens one page of the manual. The full text of every page is in ' +
          `[llms-full.txt](${abs('/llms-full.txt')}). Guidance for AI agents is in ` +
          `[AGENTS.md](${abs('/AGENTS.md')}).`,
        '',
      ];
      for (const section of sections) {
        llms.push(`## ${section}`, '');
        for (const {doc} of docsIn(section)) {
          const desc = describe(doc);
          llms.push(`- [${titleOf(doc, section)}](${abs(doc.permalink)})${desc ? `: ${desc}` : ''}`);
        }
        llms.push('');
      }
      llms.push(
        '## Optional',
        '',
        `- [Sitemap (Markdown)](${abs('/sitemap.md')}): every page as a nested list`,
        `- [About this manual](${abs('/about')})`,
        '',
      );

      /* llms-full.txt */
      const full = [`# ${title}`, '', `> ${SITE_SUMMARY}`, ''];
      for (const {doc} of ordered.filter((e) => e.doc)) {
        full.push('---', '', `Source: ${abs(doc.permalink)}`, '', bodies.get(doc.id), '');
      }

      /* sitemap.md */
      const map = [`# ${title}: sitemap`, '', `Every page of the manual, in the same order as the sidebar.`, ''];
      for (const section of sections) {
        map.push(`## ${section}`, '');
        for (const entry of ordered.filter((e) => e.section === section)) {
          const indent = '  '.repeat(Math.max(0, entry.depth - 1));
          map.push(
            entry.heading
              ? `${indent}- ${entry.heading}`
              : `${indent}- [${titleOf(entry.doc, section)}](${abs(entry.doc.permalink)})`,
          );
        }
        map.push('');
      }
      map.push('## Other', '', `- [About this manual](${abs('/about')})`, '');

      fs.mkdirSync(outDir, {recursive: true});
      writeIfChanged(path.join(outDir, 'llms.txt'), llms.join('\n'));
      writeIfChanged(path.join(outDir, 'llms-full.txt'), full.join('\n'));
      writeIfChanged(path.join(outDir, 'sitemap.md'), map.join('\n'));
    },
  };
}
