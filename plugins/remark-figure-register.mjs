// ============================================================
// Author:  Javeria Qureshi (on behalf of Hania Qureshi)
// Date:    July 3, 2026
// Purpose: Remark plugin that runs at build time on every MDX
//          file. Scans for all <Figure id="..."> components,
//          assigns them numbers in order, then injects those
//          numbers directly as a num prop on each Figure and
//          populates every FigureProvider with the full map.
//          This means zero manual work for tech writers —
//          adding, deleting, or reordering figures is handled
//          automatically on every build.
// ============================================================

import { visit } from "unist-util-visit";

const plugin = () => {
  return (tree) => {

    // Step 1: Collect all Figure IDs in page order
    const figureIds = [];

    visit(tree, "mdxJsxFlowElement", (node) => {
      if (node.name === "Figure") {
        const idAttr = node.attributes?.find((a) => a.name === "id");
        if (idAttr?.value) {
          figureIds.push(idAttr.value);
        }
      }
    });

    // Nothing to do if no figures on this page
    if (figureIds.length === 0) return;

    // Build a map of { id: number } e.g. { "fig1": 1, "fig2": 2 }
    const figureMap = {};
    figureIds.forEach((id, index) => {
      figureMap[id] = index + 1;
    });

    // Step 2: Inject the num prop directly onto each Figure node
    // so each Figure knows its number at build time — no runtime
    // counter needed, no re-render issues
    visit(tree, "mdxJsxFlowElement", (node) => {
      if (node.name === "Figure") {
        const idAttr = node.attributes?.find((a) => a.name === "id");
        if (!idAttr?.value) return;

        const num = figureMap[idAttr.value];

        // Remove any existing num prop to avoid duplicates
        node.attributes = node.attributes.filter((a) => a.name !== "num");

        // Inject num={1} or num={2} etc. directly onto the Figure
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "num",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: String(num),
            data: {
              estree: {
                type: "Program",
                body: [{
                  type: "ExpressionStatement",
                  expression: { type: "Literal", value: num, raw: String(num) },
                }],
              },
            },
          },
        });
      }
    });

    // Step 3: Inject the full figureMap into every FigureProvider
    // so FigureRef can look up any figure number by id
    const mapExpression = JSON.stringify(figureMap);

    visit(tree, "mdxJsxFlowElement", (node) => {
      if (node.name === "FigureProvider") {

        // Remove existing figureMap prop to avoid duplicates
        node.attributes = node.attributes?.filter(
          (a) => a.name !== "figureMap"
        ) ?? [];

        // Build the object expression for the map
        const properties = Object.entries(figureMap).map(([key, val]) => ({
          type: "Property",
          key: { type: "Literal", value: key },
          value: { type: "Literal", value: val },
          kind: "init",
          computed: false,
          shorthand: false,
          method: false,
        }));

        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "figureMap",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: mapExpression,
            data: {
              estree: {
                type: "Program",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "ObjectExpression",
                    properties,
                  },
                }],
              },
            },
          },
        });
      }
    });
  };
};

export default plugin;