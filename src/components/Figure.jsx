// Import React and two hooks we need:
// - useContext: lets this component read shared data (the figure counter)
// - useRef: lets us store a value that persists across re-renders without causing re-renders
import React, { useContext, useRef } from "react";

// Docusaurus helper that converts image paths to the correct URL for the site
import useBaseUrl from "@docusaurus/useBaseUrl";

// The shared counter/map that all Figure components on the page read from
import { FigureContext } from "./FigureContext";

// The Figure component accepts:
// - src: path to the image
// - id: unique name used for anchoring and cross-referencing
// - caption: text shown below the image
// - width: how wide the image should be (defaults to 100% if not specified)
export default function Figure({ src, id, caption, width = "100%" }) {

  // Read the shared store (counter + map) that FigureProvider set up
  const store = useContext(FigureContext);

  // numRef stores this figure's assigned number
  // We use useRef so the number is remembered and never recalculated on re-render
  const numRef = useRef(null);

  // Only run this block once per figure (when numRef is still empty)
  if (numRef.current === null) {
    // Increment the global counter by 1 (e.g. 0 → 1, 1 → 2)
    store.current.counter += 1;

    // Save this figure's number into numRef so we never lose it
    numRef.current = store.current.counter;

    // If this figure has an id, register it in the map so FigureRef can look it up
    // e.g. map["fig-dcu-setup"] = 1
    if (id) store.current.map[id] = store.current.counter;
  }

  // Shorthand for this figure's number
  const num = numRef.current;

  // Convert the src path to a full URL that works regardless of site base path
  const resolvedSrc = useBaseUrl(src);

  return (
    <>
      {/* Invisible anchor div placed above the image so clicking a FigureRef
          scrolls to just above the figure, not behind the navbar */}
      <div id={id} style={{ scrollMarginTop: "80px" }} />

      {/* The figure wrapper — centers everything and adds spacing above/below */}
      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* The actual image — width is controlled by the width prop */}
        <img
          src={resolvedSrc}
          alt={caption}
          style={{ maxWidth: width, display: "block", margin: "0 auto" }}
        />

        {/* Caption shown below the image */}
        {/* "Figure 1:" is blue and bold, the rest of the caption is dark */}
        <figcaption style={{ marginTop: "0.5rem", color: "#1C1E21" }}>
          <strong style={{ color: "#00559e" }}>Figure {num}: </strong>
          {caption}
        </figcaption>

      </figure>
    </>
  );
}