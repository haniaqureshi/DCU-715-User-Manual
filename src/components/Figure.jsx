// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Renders a numbered figure (image + caption).
//          Reads its number from the pre-populated map in
//          FigureContext. Supports light and dark mode images.
//
// Props:
//   src      — light mode image path (required)
//   srcDark  — dark mode image path (optional, falls back to src)
//   id       — must match an entry in the figures array (required)
//   caption  — text shown below the image (required)
//   width    — image width e.g. "50%" or "400px" (default "100%")
// ============================================================

import React, { useContext } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import { FigureContext } from "./FigureContext";

export default function Figure({ src, srcDark, id, caption, width = "100%" }) {

  // Read the pre-populated map from FigureProvider
  const map = useContext(FigureContext);

  // Look up this figure's number using its id
  const num = map?.[id];

  const resolvedSrc = useBaseUrl(src);

  // Fall back to light image if no dark image provided
  const resolvedSrcDark = useBaseUrl(srcDark || src);

  return (
    <>
      {/* Anchor div — FigureRef links scroll to this point
          scrollMarginTop prevents figure hiding behind navbar */}
      <div id={id} style={{ scrollMarginTop: "80px" }} />

      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* Swaps between light and dark image automatically */}
        <ThemedImage
          alt={caption}
          sources={{ light: resolvedSrc, dark: resolvedSrcDark }}
          style={{ maxWidth: width, display: "block", margin: "0 auto" }}
        />

        {/* Caption — color switches automatically in dark mode */}
        <figcaption style={{ marginTop: "0.5rem", color: "var(--ifm-font-color-base)" }}>
          <span className="figure-label">Figure {num}: </span>
          {caption}
        </figcaption>
      </figure>
    </>
  );
}