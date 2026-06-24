import React, { useContext, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FigureContext } from "./FigureContext";

export default function Figure({ src, id, caption, width = "100%" }) {
  const { store } = useContext(FigureContext);
  const numRef = useRef(null);

  if (!store) {
    throw new Error(
      `<Figure id="${id}"> must be wrapped in a <FigureProvider>.`
    );
  }

  // Register this figure into the map on every render during pass 1
  // numRef ensures the number is locked in and never changes after pass 1
  if (numRef.current === null) {
    store.current.counter += 1;
    numRef.current = store.current.counter;
    if (id) store.current.map[id] = store.current.counter;
  }

  const num = numRef.current;
  const resolvedSrc = useBaseUrl(src);

  return (
    <>
      <div id={id} style={{ scrollMarginTop: "80px" }} />
      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>
        <img
          src={resolvedSrc}
          alt={caption}
          style={{ maxWidth: width, display: "block" }}
        />
        <figcaption style={{ marginTop: "0.5rem", color: "#1C1E21" }}>
          <strong style={{ color: "#00559e" }}>Figure {num}: </strong>
          {caption}
        </figcaption>
      </figure>
    </>
  );
}