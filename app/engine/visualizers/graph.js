import { refs, state, clearVisualTimer } from "../state.js";
import { svgNodeStageMarkup } from "./shared.js";

function getGraphSteps(mode) {
  const bfs = [
    {
      visited: [],
      active: ["A"],
      activeEdges: [],
      fringe: ["A"],
      note: "BFS 从起点 A 开始，按层扩散。起点所在的一层最先被点亮。"
    },
    {
      visited: ["A"],
      active: ["B", "C"],
      activeEdges: ["A-B", "A-C"],
      fringe: ["B", "C"],
      note: "A 的邻居 B、C 进入队列，它们是离起点一步的节点。"
    },
    {
      visited: ["A", "B", "C"],
      active: ["D", "E"],
      activeEdges: ["B-D", "C-D", "C-E"],
      fringe: ["D", "E"],
      note: "继续处理第二层，再把下一层扩展出来。BFS 的层次感在图上会特别明显。"
    },
    {
      visited: ["A", "B", "C", "D", "E"],
      active: [],
      activeEdges: [],
      fringe: [],
      note: "按波次扩散结束，这种顺序特别适合最短步数问题。"
    }
  ];
  const dfs = [
    {
      visited: [],
      active: ["A"],
      activeEdges: [],
      stack: ["A"],
      note: "DFS 从 A 出发，优先沿一条路径一直走下去。"
    },
    {
      visited: ["A"],
      active: ["B"],
      activeEdges: ["A-B"],
      stack: ["A", "B"],
      note: "先深入到 B，而不是马上处理同层其他节点。"
    },
    {
      visited: ["A", "B"],
      active: ["D"],
      activeEdges: ["B-D"],
      stack: ["A", "B", "D"],
      note: "继续沿路径深入到 D，直到走不动为止。"
    },
    {
      visited: ["A", "B", "D"],
      active: ["C"],
      activeEdges: ["A-C"],
      stack: ["A", "C"],
      note: "回溯后再转向另一条路径，访问 C。DFS 的关键是深挖后再退回。"
    }
  ];
  return mode === "dfs" ? dfs : bfs;
}

function renderGraphVisual() {
  const mode = state.visualState.mode;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="graph-mode">模式</label>
        <select id="graph-mode">
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
        </select>
        <button class="ghost-button small" id="graph-play" type="button">播放演示</button>
        <button class="ghost-button small" id="graph-reset" type="button">重置</button>
      </div>
      <div id="graph-lane"></div>
      <div class="trace-caption" id="graph-caption"></div>
    </div>
  `;
  document.getElementById("graph-mode").value = mode;
  document.getElementById("graph-mode").addEventListener("change", (event) => {
    clearVisualTimer();
    state.visualState.mode = event.target.value;
    state.visualState.step = 0;
    renderGraphVisual();
  });
  document.getElementById("graph-play").addEventListener("click", playGraphVisual);
  document.getElementById("graph-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintGraphStep();
  });
  paintGraphStep();
}

function paintGraphStep() {
  const step = getGraphSteps(state.visualState.mode)[state.visualState.step];
  const nodes = [
    { id: "A", x: 132, y: 142 },
    { id: "B", x: 292, y: 64 },
    { id: "C", x: 292, y: 220 },
    { id: "D", x: 470, y: 98 },
    { id: "E", x: 600, y: 178 }
  ];
  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "C", to: "E" }
  ];
  const fringe = step.fringe || step.stack || [];
  document.getElementById("graph-lane").innerHTML =
    svgNodeStageMarkup({
      height: 280,
      nodes,
      edges,
      activeIds: step.active || [],
      visitedIds: step.visited || [],
      activeEdges: step.activeEdges || []
    }) +
    `<div class="svg-legend">${state.visualState.mode === "dfs" ? "递归栈" : "队列"}：${fringe.length ? fringe.join(" → ") : "空"}</div>`;
  document.getElementById("graph-caption").textContent = step.note;
}

function playGraphVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintGraphStep();
  const steps = getGraphSteps(state.visualState.mode);
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintGraphStep();
      clearVisualTimer();
      return;
    }
    paintGraphStep();
  }, 2100);
}

export { renderGraphVisual };
