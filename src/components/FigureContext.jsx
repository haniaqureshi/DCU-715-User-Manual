// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: FigureProvider pre-registers all figure IDs upfront
//          so FigureRef always resolves correctly, including
//          forward references (FigureRef before Figure).
//          FigureRef renders a clickable "Figure N" link.
// ============================================================

import React, { createContext, useContext } from "react";
import figureStore from "./figureStore";

export const FigureContext = createContext(null);

// ─────────────────────────────────────────────────────────────
// FigureProvider
// Place ONE of these per page, wrapping only the figures.
// Pass all figure IDs in the order they appear on the page
// using the figures prop. This pre-populates the map so
// FigureRef works anywhere on the page — before or after
// the actual Figure component.
//
// Usage:
//   export const figures = ["fig1", "fig2", "fig3"];
//
//   <FigureProvider figures={figures}>
//     <Figure src="..." id="fig1" caption="..." />
//   </FigureProvider>
// ─────────────────────────────────────────────────────────────
export function FigureProvider({ children, figures = [] }) {

  // Reset the store and pre-populate the map using the figures array
  // The order of IDs in the array determines the figure numbers
  // fig1 → Figure 1, fig2 → Figure 2, fig3 → Figure 3 etc.
  figureStore.counter = figures.length;
  figureStore.map = {};
  figures.forEach((id, index) => {
    figureStore.map[id] = index + 1;
  });

  return (
    // Pass the map down so Figure and FigureRef can read it
    <FigureContext.Provider value={figureStore.map}>
      {children}
    </FigureContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// FigureRef
// Renders a clickable "Figure N" link that scrolls to the figure.
// Works anywhere on the page — before or after the Figure.
// Shows "Figure ?" if the id is not in the figures array.
// ─────────────────────────────────────────────────────────────
export function FigureRef({ id }) {
  const map = useContext(FigureContext);
  const num = map?.[id];
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}