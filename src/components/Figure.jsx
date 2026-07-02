// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Renders a numbered figure (image + caption) inside
//          an MDX page. Automatically assigns the next available
//          figure number by reading from the shared figureStore.
//          Supports separate images for light and dark mode via
//          the srcDark prop. The caption label color adapts to
//          light and dark mode via the CSS class "figure-label".
//
//          Must be wrapped in a FigureProvider to work correctly.
//
// Props:
//   src      — path to the light mode image (required)
//   srcDark  — path to the dark mode image (optional,
//              falls back to src if not provided)
//   id       — unique identifier for this figure (required)
//              used for anchor links and FigureRef lookups
//   caption  — text shown below the image (required)
//   width    — controls image width, e.g. "50%" or "400px"
//              defaults to "100%" if not provided
// ============================================================

import React, { useRef } from "react";

// Docusaurus hook that converts image paths to correct URLs
// regardless of the site's base URL configuration
import useBaseUrl from "@docusaurus/useBaseUrl";

// Docusaurus built-in component that automatically swaps between
// two images depending on whether light or dark mode is active
import ThemedImage from "@theme/ThemedImage";

// The shared counter and map that tracks all figures on the page
import figureStore from "./figureStore";

// ─────────────────────────────────────────────────────────────
// Figure Component
// ─────────────────────────────────────────────────────────────
export default function Figure({ src, srcDark, id, caption, width = "100%" }) {

  // numRef stores this figure's assigned number permanently
  // useRef is used instead of useState because we do not want
  // a re-render when the number is assigned — we just want to
  // remember it for the lifetime of this component
  const numRef = useRef(null);

  // Only assign a number once per figure (when numRef is still empty)
  // This block runs during the first (hidden) render inside FigureProvider
  // and locks in the number so it never changes on subsequent renders
  if (numRef.current === null) {

    // Increment the global counter by 1
    // e.g. if 2 figures already exist, this becomes 3
    figureStore.counter += 1;

    // Save this figure's number into numRef so it is remembered
    numRef.current = figureStore.counter;

    // Register this figure in the map so FigureRef can find it
    // e.g. figureStore.map["BatteryTestModal"] = 1
    if (id) figureStore.map[id] = figureStore.counter;
  }

  // Shorthand for this figure's assigned number
  const num = numRef.current;

  // Convert the src path to a full working URL for the site
  // This handles cases where the site is hosted in a subdirectory
  const resolvedSrc = useBaseUrl(src);

  // If srcDark is provided, resolve it too
  // If not provided, fall back to the light mode image for both modes
  const resolvedSrcDark = useBaseUrl(srcDark || src);

  return (
    <>
      {/* Invisible anchor div placed just above the figure
          When a FigureRef link is clicked, the page scrolls here
          scrollMarginTop adds space above so the figure is not
          hidden behind the fixed navbar after scrolling */}
      <div id={id} style={{ scrollMarginTop: "80px" }} />

      {/* The figure wrapper — centers content and adds vertical spacing */}
      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* ThemedImage automatically shows the light image in light mode
            and the dark image in dark mode
            If no srcDark was provided both modes show the same image */}
        <ThemedImage
          alt={caption}
          sources={{
            light: resolvedSrc,
            dark: resolvedSrcDark,
          }}
          // maxWidth controls how wide the image can grow
          // margin: "0 auto" centers the image horizontally
          style={{ maxWidth: width, display: "block", margin: "0 auto" }}
        />

        {/* Caption shown below the image
            color uses a Docusaurus CSS variable that is black in
            light mode and white in dark mode automatically */}
        <figcaption style={{ marginTop: "0.5rem", color: "var(--ifm-font-color-base)" }}>

          {/* "Figure N:" label — color is controlled by the CSS class
              figure-label in custom.css which switches between
              #00559e in light mode and #4D9FD6 in dark mode */}
          <span className="figure-label">Figure {num}: </span>

          {/* The caption text passed in as a prop */}
          {caption}

        </figcaption>
      </figure>
    </>
  );
}