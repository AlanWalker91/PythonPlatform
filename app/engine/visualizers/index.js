import { getCurrentLesson } from "../state.js";
import { renderComplexityVisual, renderArrayVisual, renderLinkedVisual, renderStackQueueVisual, renderBinaryVisual, renderHashVisual, renderTwoPointersVisual, renderWindowVisual, renderGreedyVisual, renderPrefixVisual, renderMonotonicVisual, renderAdvancedStructVisual } from "./array.js";
import { renderTreeVisual, renderHeapVisual } from "./tree.js";
import { renderGraphVisual } from "./graph.js";
import { renderBacktrackingVisual, renderDPVisual } from "./backtrack.js";

function renderVisual() {
  const type = getCurrentLesson().visual.type;
  if (type === "complexity") renderComplexityVisual();
  else if (type === "array") renderArrayVisual();
  else if (type === "linked") renderLinkedVisual();
  else if (type === "stackqueue") renderStackQueueVisual();
  else if (type === "binary") renderBinaryVisual();
  else if (type === "hash") renderHashVisual();
  else if (type === "tree") renderTreeVisual();
  else if (type === "heap") renderHeapVisual();
  else if (type === "graph") renderGraphVisual();
  else if (type === "twopointers") renderTwoPointersVisual();
  else if (type === "window") renderWindowVisual();
  else if (type === "backtracking") renderBacktrackingVisual();
  else if (type === "dp") renderDPVisual();
  else if (type === "greedy") renderGreedyVisual();
  else if (type === "prefix") renderPrefixVisual();
  else if (type === "monotonic") renderMonotonicVisual();
  else if (type === "advancedstruct") renderAdvancedStructVisual();
}

export { renderVisual };
