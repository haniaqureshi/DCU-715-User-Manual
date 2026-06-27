import React, { useContext, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import { FigureContext } from "./FigureContext";

export default function Figure({ src, srcDark, id, caption, width = "100%" }) {
  const { store } = useContext(FigureContext);
  const numRef = useRef(null);

  if (!store) {
    throw new Error(
      `<Figure id="${id}"> must be wrapped in a <FigureProvider>.`
    );
  }

  if (numRef.current === null) {
    store.current.counter += 1;
    numRef.current = store.current.counter;
    if (id) store.current.map[id] = store.current.counter;
  }

  const num = numRef.current;
  const resolvedSrc = useBaseUrl(src);
  const resolvedSrcDark = useBaseUrl(srcDark || src);

  return (
    <>
      <div id={id} style={{ scrollMarginTop: "80px" }} />
      <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>

        {/* If srcDark is provided, use ThemedImage to swap automatically */}
        {/* If no srcDark provided, falls back to the same image for both modes */}
        <ThemedImage
          alt={caption}
          sources={{
            light: resolvedSrc,
            dark: resolvedSrcDark,
          }}
          style={{ maxWidth: width, display: "block" }}
        />

      <figcaption style={{ marginTop: "0.5rem", color: "var(--ifm-font-color-base)" }}>
        <span style={{ color: "#00559e", fontWeight: "bold" }}>Figure {num}: </span>
        {caption}
      </figcaption>
      </figure>
    </>
  );
}