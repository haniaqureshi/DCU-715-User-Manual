// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Renders a numbered figure (image + caption).
//          The num prop is injected automatically at build time
//          by the remark plugin — never written manually.
//          Supports light/dark mode image swapping via srcDark.
//          Images can be enlarged with the mouse or the keyboard
//          (Tab to the image, then press Enter or Space; Esc closes).
//
// Props:
//   src     — light mode image path (required)
//   srcDark — dark mode image path (optional, falls back to src)
//   id      — unique identifier for this figure (required)
//   caption — text shown below the image (required)
//   alt     — text alternative for screen readers (optional, falls back to caption)
//   width   — image width e.g. "50%" or "400px" (default "100%")
//   num     — figure number, injected automatically by plugin
// ============================================================

import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

export default function Figure({ src, srcDark, id, caption, alt, width = "100%", num }) {
  console.log("Figure:", id, "num:", num); // ← add this line temporarily

  const resolvedSrc = useBaseUrl(src);

  // Fall back to light image if no dark image provided
  const resolvedSrcDark = useBaseUrl(srcDark || src);

  // Text alternative, also used to name the keyboard-focusable image
  const altText = alt || caption;

  // Keyboard support for image zoom: Enter or Space triggers the same
  // click that the zoom plugin (medium-zoom) listens for. Esc closes it.
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const img = event.currentTarget;
      // Return keyboard focus to the image when the zoom closes
      img.addEventListener("medium-zoom:closed", () => img.focus(), { once: true });
      img.click();
    }
  };

  return (
    <>
      {/* Anchor div — FigureRef links scroll to this point
          scrollMarginTop prevents figure hiding behind navbar */}
      <div id={id} style={{ scrollMarginTop: "80px" }} />

      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* Swaps between light and dark image based on theme */}
        <ThemedImage
          alt={altText}
          tabIndex={0}
          role="button"
          aria-label={`Enlarge image: ${altText}`}
          onKeyDown={handleKeyDown}
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