// ============================================================
// Author:  Javeria Qureshi (on behalf of Hania Qureshi)
// Date:    November 11, 2026
// Purpose: Builds the whole user manual as ONE numbered PDF.
//          Run it with:  yarn pdf
//
//          Step 1 - Builds a copy of the site into build-pdf/ with
//                   chapter numbers turned on (website is not changed).
//          Step 2 - docs-to-pdf reads that copy page by page and saves it
//                   as one PDF with contents, bookmarks, header and footer.
//          Step 3 - The image in pdf/cover/ is added as page 1.
// ============================================================

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = process.cwd(); // the repo folder (where "yarn pdf" is run)

// ---------------------------- SETTINGS ----------------------------
// Change these values to update the PDF. Nothing else needs editing.
const TITLE = "DCU 715 User Manual";        // text on the left of the header
const VERSION = "v1.0.0";                   // text on the right of the header
const COVER_FOLDER = "pdf/cover";           // put ONE .png or .jpg cover image here
const OUTPUT_FILE = "pdf/DCU-715-User-Manual.pdf"; // where the finished PDF is saved
const FIRST_PAGE = "/intro";                // page the manual starts from
const BUILD_DIR = "build-pdf";              // temporary site copy used for the PDF
const CSS_FILE = "pdf/pdf.css";             // PDF-only styles
// -----------------------------------------------------------------

// Find the cover image first, so a missing cover stops us before the slow steps
const coverName = fs
  .readdirSync(path.join(ROOT, COVER_FOLDER))
  .find((file) => /\.(png|jpe?g)$/i.test(file));

if (!coverName) {
  console.error(`No cover found. Put a .png or .jpg image in ${COVER_FOLDER}/`);
  process.exit(1);
}

// Today's date, e.g. "November 11, 2026", shown in the footer
const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Header on every page after the cover: title (left) and version (right)
const headerTemplate = `
<div style="width:100%; margin:0 15mm; padding-bottom:2mm; border-bottom:0.5px solid #c8c8c8;
            font-family:Arial, sans-serif; font-size:8pt; color:#555; display:flex; justify-content:space-between;">
  <span>${TITLE}</span><span>${VERSION}</span>
</div>`;

// Footer on every page after the cover: date (left) and page number (right).
// "pageNumber" and "totalPages" are filled in automatically.
const footerTemplate = `
<div style="width:100%; margin:0 15mm; padding-top:2mm; border-top:0.5px solid #c8c8c8;
            font-family:Arial, sans-serif; font-size:8pt; color:#555; display:flex; justify-content:space-between;">
  <span>ITR &middot; ${today}</span>
  <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
</div>`;

// Runs a Node tool and stops everything if it fails
function run(label, args, env = {}) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    stdio: "inherit", // show the tool's output in the terminal
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    console.error(`\n${label} failed.`);
    process.exit(result.status ?? 1);
  }
}

// ---------- Step 1: build the numbered copy of the site ----------
// PDF_BUILD=true switches on the numbering plugin (see docusaurus.config.js)
const docusaurusCli = require.resolve("@docusaurus/core/bin/docusaurus.mjs");
run("Building the site for the PDF", [docusaurusCli, "build", "--out-dir", BUILD_DIR], { PDF_BUILD: "true" });

// ---------- Step 2: turn the site copy into one PDF ----------
const css = fs.readFileSync(path.join(ROOT, CSS_FILE), "utf8");
const docsToPdfCli = require.resolve("docs-to-pdf/lib/cli.js");

run("Creating the PDF", [
  docsToPdfCli,
  "docusaurus",
  "--version=3",                                        // Docusaurus version of this site
  `--docsDir=${BUILD_DIR}`,                             // serve the site copy from Step 1
  `--initialDocURLs=http://localhost:3000${FIRST_PAGE}`, // start here, then follow "Next"
  `--outputPDFFilename=${OUTPUT_FILE}`,
  "--paperFormat=A4",
  "--pdfMargin=18mm,15mm,22mm,15mm",                    // top, right, bottom, left
  "--disableCover",                                     // we add our own cover in Step 3
  "--tocTitle=Contents",                                // title of the contents page
  `--headerTemplate=${headerTemplate}`,
  `--footerTemplate=${footerTemplate}`,
  `--cssStyle=${css}`,                                  // apply pdf/pdf.css
  // On GitHub Actions (CI=true) Chrome must run without its sandbox, or it will not start.
  // On your own PC nothing changes.
  ...(process.env.CI ? ["--puppeteerArgs=--no-sandbox"] : []),
]);

// ---------- Step 3: add the cover image as page 1 ----------
console.log(`\n=== Adding cover: ${coverName} ===`);

// pdf-lib comes with docs-to-pdf, so no extra install is needed
const { PDFDocument } = createRequire(docsToPdfCli)("pdf-lib");

const pdfPath = path.join(ROOT, OUTPUT_FILE);
const pdf = await PDFDocument.load(fs.readFileSync(pdfPath));

// Read the cover image (PNG or JPG)
const coverBytes = fs.readFileSync(path.join(ROOT, COVER_FOLDER, coverName));
const cover = /\.png$/i.test(coverName) ? await pdf.embedPng(coverBytes) : await pdf.embedJpg(coverBytes);

// Insert a new first page, the same size as the others, and fill it with the cover
const { width, height } = pdf.getPage(0).getSize();
pdf.insertPage(0, [width, height]).drawImage(cover, { x: 0, y: 0, width, height });

fs.writeFileSync(pdfPath, await pdf.save());
console.log(`\nDone: ${OUTPUT_FILE}`);