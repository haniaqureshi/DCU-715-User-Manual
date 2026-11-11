// ============================================================
// Author:  Javeria Qureshi (on behalf of Hania Qureshi)
// Date:    November 11, 2026
// Purpose: Remark plugin that adds chapter and section numbers to
//          headings, for the PDF only. It is switched on in
//          docusaurus.config.js when PDF_BUILD=true, so the website
//          itself never shows the numbers.
//
//          Numbers follow the sidebar order, for example:
//            1      Introduction to DCU 715
//            2      Routes            <- chapter title, added automatically
//            2.1    Routes Overview
//            2.2    Select Route
//            2.2.1  (a ## heading inside Select Route)
//            5.2    Maintenance  ->  5.2.1 Battery Test
//
//          Adding, removing or reordering pages renumbers everything
//          on the next "yarn pdf".
// ============================================================

import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const DOCS_DIR = path.resolve(process.cwd(), "docs");
const DOC_EXT = /\.mdx?$/; // .md and .mdx files

// ------------------------------------------------------------
// Part 1: work out the sidebar order from the docs folder
// ------------------------------------------------------------

// Reads the simple "key: value" lines at the top of a doc (front matter)
function readFrontMatter(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (pair) data[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, ""); // strip quotes
  }
  return data;
}

// "2-Measurements" -> 2 (used when no position is set)
function numberPrefix(name) {
  const match = name.match(/^(\d+)-/);
  return match ? Number(match[1]) : undefined;
}

// Reads a folder's _category_.json (label, position, link)
function readCategory(dir) {
  const file = path.join(dir, "_category_.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
}

// Lists the docs and sub-folders of a folder, sorted like the sidebar
function readDir(dir) {
  const items = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // A folder is a sidebar category
      const category = readCategory(full);
      const children = readDir(full);

      // If the category links to its index.mdx, that page is the category's own page
      const linksToIndex = category.link && category.link.type === "doc";
      const indexItem = linksToIndex
        ? children.find((c) => c.type === "doc" && /^index\.mdx?$/.test(path.basename(c.file)))
        : undefined;

      items.push({
        type: "category",
        label: category.label || entry.name,
        position: category.position ?? numberPrefix(entry.name),
        source: entry.name,
        indexFile: indexItem?.file,
        items: indexItem ? children.filter((c) => c !== indexItem) : children,
      });
    } else if (DOC_EXT.test(entry.name) && !entry.name.startsWith("_")) {
      // A file is a doc page
      const frontMatter = readFrontMatter(full);
      const position =
        frontMatter.sidebar_position !== undefined ? Number(frontMatter.sidebar_position) : numberPrefix(entry.name);
      items.push({ type: "doc", file: full, position, source: entry.name, frontMatter });
    }
  }

  // Same rule as Docusaurus: sort by position, then by file/folder name
  return items.sort((a, b) => {
    const posA = a.position ?? Infinity;
    const posB = b.position ?? Infinity;
    if (posA !== posB) return posA - posB;
    return a.source < b.source ? -1 : a.source > b.source ? 1 : 0;
  });
}

// Gives every doc file its number, e.g. docs/1-Routes/1-SelectRoute.mdx -> [2, 2]
function buildNumberMap() {
  const map = new Map();

  // prefix = number of the parent (e.g. [5] for DCU Setup)
  // level  = how deep we are (1 = chapter, 2 = page, 3 = nested page)
  const walk = (items, prefix, level, chapterLabel) => {
    items.forEach((item, i) => {
      const number = [...prefix, i + 1];

      if (item.type === "doc") {
        map.set(path.normalize(item.file), {
          number,
          level,
          // The first page of a chapter also gets the chapter title above it
          chapterTitle: i === 0 && chapterLabel ? { number: prefix, label: chapterLabel } : undefined,
          frontMatter: item.frontMatter,
        });
      } else {
        // A category's own page (e.g. 5.2 Maintenance) takes the category's number
        if (item.indexFile) {
          map.set(path.normalize(item.indexFile), {
            number,
            level,
            frontMatter: readFrontMatter(item.indexFile),
            categoryLabel: item.label,
          });
        }
        // Go inside the category; top-level categories are chapters
        walk(item.items, number, level + 1, level === 1 ? item.label : undefined);
      }
    });
  };

  walk(readDir(DOCS_DIR), [], 1, undefined);
  return map;
}

let numberMap; // built once, on first use

// ------------------------------------------------------------
// Part 2: the plugin - adds the numbers to each page's headings
// ------------------------------------------------------------

// Plain text of a heading, e.g. "Select Route"
function headingText(node) {
  let text = "";
  visit(node, (n) => {
    if (n.type === "text" || n.type === "inlineCode") text += n.value;
    // Note: return nothing here. visit() treats a returned number as "jump to index".
  });
  return text.trim();
}

export default function remarkPdfNumbering() {
  return (tree, file) => {
    numberMap ??= buildNumberMap();
    const info = numberMap.get(path.normalize(file.path));
    if (!info) return; // not a doc page (e.g. the home page)

    // Collect all headings. The first "#" is the page title; the rest are sections.
    const headings = [];
    visit(tree, "heading", (node) => {
      headings.push(node);
    });
    const titleNode = headings.find((h) => h.depth === 1);
    const sections = headings.filter((h) => h !== titleNode);

    // Treat any extra "#" as a "##". Skipped levels (## then ####) are closed up.
    const effectiveDepth = (h) => (h.depth === 1 ? 2 : h.depth);
    const levelsUsed = [...new Set(sections.map(effectiveDepth))].sort((a, b) => a - b);

    // Number ## and ### only. On a category's own page (e.g. 5.2 Maintenance)
    // sections stay unnumbered so they don't clash with 5.2.1 Battery Test etc.
    const NUMBERED_LEVELS = info.categoryLabel ? 0 : 2;

    // Page title, e.g. "2.1  Routes Overview"
    if (titleNode) {
      // "Overview" pages use their pagination_label, e.g. "Routes Overview"
      const title = info.frontMatter?.pagination_label || headingText(titleNode);
      titleNode.depth = Math.min(6, info.level); // h2 for a page, h3 for a nested page
      titleNode.children = [{ type: "text", value: `${info.number.join(".")}  ${title}` }];
      titleNode.data = { ...titleNode.data, hProperties: { className: ["pdf-page-title"] } };
    }

    // Sections, e.g. "2.2.1  Measure Data"
    const counters = []; // counters[0] counts ##, counters[1] counts ###
    for (const node of sections) {
      const rank = levelsUsed.indexOf(effectiveDepth(node)); // 0 = first level under the title
      node.depth = Math.min(6, info.level + 1 + rank); // nest correctly in the contents page

      if (rank >= NUMBERED_LEVELS) continue;
      counters[rank] = (counters[rank] ?? 0) + 1;
      counters.length = rank + 1; // a new ## restarts the ### count
      if (counters.includes(undefined)) continue; // ### with no ## before it

      const label = [...info.number, ...counters].join(".");
      node.children = [{ type: "text", value: `${label}  ` }, ...node.children];
    }

    // Chapter title above the first page of a chapter, e.g. "2  Routes"
    if (info.chapterTitle) {
      tree.children.unshift({
        type: "heading",
        depth: 1,
        data: { hProperties: { className: ["pdf-chapter"] } },
        children: [{ type: "text", value: `${info.chapterTitle.number.join(".")}  ${info.chapterTitle.label}` }],
      });
    }
  };
}