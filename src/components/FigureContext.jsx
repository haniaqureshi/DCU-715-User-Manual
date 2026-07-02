// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Provides the FigureProvider wrapper component and
//          the FigureRef component.
//
//          FigureProvider: wraps individual figures on a page.
//          Multiple FigureProviders on the same page all share
//          the same figureStore counter so numbering stays
//          sequential. The counter only resets when the user
//          navigates to a new page (detected via URL change).
//          Hides content briefly on first render so that figure
//          numbers are fully registered before the user sees
//          anything (prevents "Figure ?" flashing).
//
//          FigureRef: renders a clickable "Figure N" link that
//          jumps to the figure on the page. Reads directly from
//          figureStore so it works anywhere on the page, even
//          outside a FigureProvider tag.
// ============================================================

import React, { createContext, useRef, useState, useLayoutEffect } from "react";

// Import the shared counter and map
import figureStore from "./figureStore";

// Create a React context so FigureProvider can pass the ready
// state down to child components
export const FigureContext = createContext(null);

// Tracks the current page URL so we know when the user navigates
// to a new page and the counter needs to reset
// Lives outside the component so it persists across renders
let currentPage = "";

// ─────────────────────────────────────────────────────────────
// FigureProvider
// Wrap this around each Figure component in your MDX page.
// You can use multiple FigureProviders on the same page and
// numbering will stay sequential across all of them.
// The counter only resets when the page URL changes — not when
// a new FigureProvider mounts — so Figure 1, 2, 3... works
// correctly across multiple providers on the same page.
//
// Usage:
//   <FigureProvider>
//     <Figure src="..." id="MyFigure" caption="My Caption" />
//   </FigureProvider>
//
//   ## Some Heading
//
//   <FigureProvider>
//     <Figure src="..." id="MyFigure2" caption="My Caption 2" />
//   </FigureProvider>
// ─────────────────────────────────────────────────────────────
export function FigureProvider({ children }) {

  // ready: controls whether the content is visible or hidden
  // starts as false (hidden) so the user never sees wrong numbers
  const [ready, setReady] = useState(false);

  // Check if the user has navigated to a new page by comparing
  // the current URL to the last URL we recorded
  // typeof window check is needed because Docusaurus renders on
  // the server too where window does not exist
  if (typeof window !== "undefined" && window.location.pathname !== currentPage) {

    // Update the recorded page to the current one
    currentPage = window.location.pathname;

    // Reset the counter and map so numbering starts fresh at 1
    // This only happens on page navigation, not on every render
    figureStore.counter = 0;
    figureStore.map = {};
  }

  // useLayoutEffect runs after the first render but before the
  // browser paints anything to the screen
  // This gives all Figure components a chance to register
  // themselves into figureStore during the first (hidden) render
  // Once that is done, we flip ready to true which makes the
  // content visible with all correct figure numbers already in place
  useLayoutEffect(() => {
    setReady(true);
  }, []); // empty array means this only runs once when the component first mounts

  return (
    // Pass the ready state down to child components via context
    <FigureContext.Provider value={{ ready }}>

      {/* Wrap children in a div that is invisible during the first render
          (pass 1) and visible after all figures have registered (pass 2)
          visibility: hidden hides the content but still takes up space
          so the page layout does not jump when content appears */}
      <div style={{ visibility: ready ? "visible" : "hidden" }}>
        {children}
      </div>

    </FigureContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// FigureRef
// Renders a clickable link like "Figure 1" that scrolls to the
// figure when clicked. Can be placed anywhere on the page —
// before or after the Figure, inside or outside a FigureProvider.
//
// Usage:
//   As shown in <FigureRef id="MyFigure" />, the screen appears.
//
// If the id is not found in figureStore (e.g. typo in the id),
// it renders "Figure ?" so you can spot the broken reference.
// ─────────────────────────────────────────────────────────────
export function FigureRef({ id }) {

  // Look up the figure number from the shared store using the id
  // example: figureStore.map["BatteryTestModal"] → 1
  const num = figureStore.map[id];

  // Render a link that scrolls to the figure's anchor div
  // The href matches the id on the <div> rendered by Figure.jsx
  // If num is undefined (id not found), show "?" as a warning
  return <a href={`#${id}`}>Figure {num ?? "?"}</a>;
}