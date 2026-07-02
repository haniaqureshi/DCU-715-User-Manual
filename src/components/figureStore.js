// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: A shared storage object that holds the figure counter
//          and a map of figure IDs to their assigned numbers.
//          Lives outside of React so that all components across
//          the page can read from and write to the same data
//          without needing to pass props or use context.
// ============================================================

// A plain JavaScript object that acts as the single source of truth
// for figure numbering across the entire page.
//
// counter: tracks how many figures have been registered so far
//          starts at 0 and increases by 1 for each new figure
//
// map: stores each figure's ID and its assigned number
//      example after 2 figures: { "BatteryTestModal": 1, "SerialNumberModal": 2 }
//      FigureRef uses this to look up "what number is this figure?"
const figureStore = { counter: 0, map: {} };

export default figureStore;