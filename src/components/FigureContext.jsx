import React, { createContext, useContext, useRef, useState, useLayoutEffect } from "react";

export const FigureContext = createContext(null);

export function FigureProvider({ children }) {
  const [ready, setReady] = useState(false);
  const store = useRef({ counter: 0, map: {} });

  // Pass 1: render children invisibly to let all Figure components
  // register themselves into the map, then flip ready to true
  // Pass 2: re-render children visibly with the map fully populated
  useLayoutEffect(() => {
    setReady(true);
  }, []);

  return (
    <FigureContext.Provider value={{ store, ready }}>
      {/* Hide content during pass 1 so user never sees ? or wrong numbers */}
      <div style={{ visibility: ready ? "visible" : "hidden" }}>
        {children}
      </div>
    </FigureContext.Provider>
  );
}

export function FigureRef({ id }) {
  const { store } = useContext(FigureContext);
  const num = store.current.map[id];
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}