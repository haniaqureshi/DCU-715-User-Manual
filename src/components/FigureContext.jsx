// ============================================================
// Author:  Javeria Qureshi (on behalf of Hania Qureshi)
// Date:    July 3, 2026
// Purpose: FigureProvider stores the figureMap injected at
//          build time by the remark plugin. FigureRef reads
//          from a module-level map so it works anywhere on
//          the page — inside or outside FigureProvider tags.
// ============================================================

import React, { createContext, useContext, useEffect, useState } from "react";

export const FigureContext = createContext({});

// Module-level map that persists across renders
// FigureProvider writes to this, FigureRef reads from it
let globalFigureMap = {};

// ─────────────────────────────────────────────────────────────
// FigureProvider
// Wrap each individual Figure with this. The remark plugin
// automatically injects the figureMap prop at build time.
// FigureProvider writes the map to globalFigureMap so FigureRef
// can read it from anywhere on the page.
// ─────────────────────────────────────────────────────────────
export function FigureProvider({ children, figureMap = {} }) {

  // Write the injected map to the module-level variable
  // so FigureRef can access it without being inside this provider
  // Object.assign merges without overwriting entries from other
  // providers on the same page
  Object.assign(globalFigureMap, figureMap);

  return (
    <FigureContext.Provider value={figureMap}>
      {children}
    </FigureContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// FigureRef
// Renders a clickable "Figure N" link that scrolls to the figure.
// Reads from globalFigureMap so it works anywhere on the page —
// before or after the Figure, inside or outside FigureProvider.
// ─────────────────────────────────────────────────────────────
export function FigureRef({ id }) {
  // Force a re-render after mount so the map is guaranteed to
  // be populated before we look up the number
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const num = globalFigureMap[id];
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}