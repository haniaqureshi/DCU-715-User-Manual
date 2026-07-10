// ============================================================
// Author:  Hania Qureshi
// Date:    July 3, 2026
// Purpose: Shared counter and map for figure numbering.
// ============================================================

// map: stores { "fig-id": figureNumber } for every figure on the page
// counter: tracks how many figures have been registered
const figureStore = { counter: 0, map: {} };

export default figureStore;