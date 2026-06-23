// Import React and three hooks:
// - createContext: creates the shared data container all Figure components read from
// - useContext: lets FigureRef read from that shared container
// - useRef: keeps the counter/map stable so it doesn't reset on re-render
import React, { createContext, useContext, useRef } from "react";

// Create the shared context with a default value of null
// null means "no provider found" — Figure.jsx checks for this and throws a clear error
export const FigureContext = createContext(null);

// FigureProvider wraps your page content and sets up the shared counter + map
// Every <Figure> and <FigureRef> on the page must be inside this wrapper
export function FigureProvider({ children }) {

  // useRef holds the shared store as a stable object that never gets recreated
  // counter: tracks how many figures have been registered so far
  // map: stores { "fig-id": figureNumber } so FigureRef can look up numbers by id
  const store = useRef({ counter: 0, map: {} });

  // Pass the store down to every child component via context
  return (
    <FigureContext.Provider value={store}>
      {children}
    </FigureContext.Provider>
  );
}

// FigureRef renders a clickable link like "Figure 1" that scrolls to the figure
// Pass the same id you gave the <Figure> component
export function FigureRef({ id }) {

  // Read the shared store to look up which number belongs to this id
  const store = useContext(FigureContext);

  // Look up the figure number by id — e.g. map["fig-dcu-setup"] → 1
  const num = store.current.map[id];

  // Render a link to the figure's anchor
  // If the id isn't found in the map, show "?" as a fallback so you know something is wrong
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}