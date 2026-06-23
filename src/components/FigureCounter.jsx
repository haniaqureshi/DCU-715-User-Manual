import React, { createContext, useContext, useRef } from "react";

const FigureContext = createContext(null);

export function FigureProvider({ children }) {
  const counter = useRef(0);
  return (
    <FigureContext.Provider value={counter}>
      {children}
    </FigureContext.Provider>
  );
}

export function Figure({ src, alt, caption }) {
  const counter = useContext(FigureContext);
  counter.current += 1;
  const num = counter.current;

  return (
    <figure style={{ textAlign: "center", margin: "1.5rem 0" }}>
      <img src={src} alt={alt || caption} style={{ maxWidth: "100%" }} />
      <figcaption style={{ color: "gray", marginTop: "0.5rem" }}>
        <strong>Figure {num}:</strong> {caption}
      </figcaption>
    </figure>
  );
}