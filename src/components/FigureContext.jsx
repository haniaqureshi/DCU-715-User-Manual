// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: FigureProvider stores the figureMap (injected at
//          build time by the remark plugin) in React context
//          so FigureRef can look up figure numbers by id.
//          FigureRef renders a clickable link to any figure.
// ============================================================

import React, { createContext, useContext } from "react";

export const FigureContext = createContext({});

// ─────────────────────────────────────────────────────────────
// FigureProvider
// Wrap each individual Figure with this. The remark plugin
// automatically injects the figureMap prop at build time —
// you never write this prop manually.
//
// Usage:
//   <FigureProvider>
//     <Figure src="..." id="fig1" caption="..." />
//   </FigureProvider>
// ─────────────────────────────────────────────────────────────
export function FigureProvider({ children, figureMap = {} }) {
  return (
    // Pass the full page figure map down to any FigureRef
    // or Figure components that are children
    <FigureContext.Provider value={figureMap}>
      {children}
    </FigureContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// FigureRef
// Renders a clickable "Figure N" link that scrolls to the
// figure. Can appear anywhere on the page — before or after
// the Figure — because the map is pre-built at build time.
//
// Usage:
//   As shown in <FigureRef id="fig1" />, the modal appears.
// ─────────────────────────────────────────────────────────────
export function FigureRef({ id }) {
  const figureMap = useContext(FigureContext);
  const num = figureMap[id];
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}