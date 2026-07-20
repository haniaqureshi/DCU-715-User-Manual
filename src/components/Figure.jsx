// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Renders a numbered figure (image + caption).
//          The num prop is injected automatically at build time
//          by the remark plugin — never written manually.
//          Supports light/dark mode image swapping via srcDark.
//
// Props:
//   src     — light mode image path (required)
//   srcDark — dark mode image path (optional, falls back to src)
//   id      — unique identifier for this figure (required)
//   caption — text shown below the image (required)
//   width   — image width e.g. "50%" or "400px" (default "100%")
//   num     — figure number, injected automatically by plugin
// ============================================================

import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

export default function Figure({ src, srcDark, id, caption, width = "100%", num }) {
  console.log("Figure:", id, "num:", num); // ← add this line temporarily

  const resolvedSrc = useBaseUrl(src);

  // Fall back to light image if no dark image provided
  const resolvedSrcDark = useBaseUrl(srcDark || src);

  return (
    <>
      {/* Anchor div — FigureRef links scroll to this point
          scrollMarginTop prevents figure hiding behind navbar */}
      <div id={id} style={{ scrollMarginTop: "80px" }} />

      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* Swaps between light and dark image based on theme */}
        <ThemedImage
          alt={caption}
          sources={{ light: resolvedSrc, dark: resolvedSrcDark }}
          style={{ maxWidth: width, display: "block", margin: "0 auto" }}
        />

        {/* Caption with themed color and branded figure label */}
        <figcaption style={{ marginTop: "0.5rem", color: "var(--ifm-font-color-base)" }}>
          <span className="figure-label">Figure {num}: </span>
          {caption}
        </figcaption>
      </figure>
    </>
  );
}