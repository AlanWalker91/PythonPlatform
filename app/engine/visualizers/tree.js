import { refs, state, clearVisualTimer } from "../state.js";
import { svgNodeStageMarkup, svgArrayStageMarkup } from "./shared.js";

function getTreeSteps(mode) {
  const preorder = [
    {
      visited: [],
      active: ["A"],
      activeEdges: [],
      note: "前序遍历先访问当前节点，再递归左右子树。现在来到根节点 A。"
    },
    {
      visited: ["A"],
      active: ["B"],
      activeEdges: ["A-B"],
      note: "访问 A 后，先进入左子树，沿着边 A -> B 深入。"
    },
    {
      visited: ["A", "B"],
      active: ["D"],
      activeEdges: ["B-D"],
      note: "继续优先走左边，到达叶子节点 D。此时路径 A -> B -> D 已经完整展开。"
    },
    {
      visited: ["A", "B", "D"],
      active: ["C"],
      activeEdges: ["A-C"],
      note: "左子树处理完，回到 A 后转向右子树，开始访问 C。"
    }
  ];
  const level = [
    {
      visited: [],
      active: ["A"],
      activeEdges: [],
      queue: ["A"],
      note: "层序遍历按层推进，队列里最先只有根节点 A。"
    },
    {
      visited: ["A"],
      active: ["B", "C"],
      activeEdges: ["A-B", "A-C"],
      queue: ["B", "C"],
      note: "处理完 A 后，把下一层的 B 和 C 入队。你会看到同一层节点一起变亮。"
    },
    {
      visited: ["A", "B", "C"],
      active: ["D", "E", "F"],
      activeEdges: ["B-D", "B-E", "C-F"],
      queue: ["D", "E", "F"],
      note: "继续按先来先服务处理第二层，再把第三层孩子扩展开。"
    },
    {
      visited: ["A", "B", "C", "D", "E", "F"],
      active: [],
      activeEdges: [],
      queue: [],
      note: "所有层都处理完，层序遍历结束。BFS 的核心就是队列驱动的按层推进。"
    }
  ];
  return mode === "level" ? level : preorder;
}

function renderTreeVisual() {
  const mode = state.visualState.mode;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="tree-mode">模式</label>
        <select id="tree-mode">
          <option value="preorder">前序遍历</option>
          <option value="level">层序遍历</option>
        </select>
        <button class="ghost-button small" id="tree-play" type="button">播放演示</button>
        <button class="ghost-button small" id="tree-reset" type="button">重置</button>
      </div>
      <div id="tree-lane"></div>
      <div class="trace-caption" id="tree-caption"></div>
    </div>
  `;
  document.getElementById("tree-mode").value = mode;
  document.getElementById("tree-mode").addEventListener("change", (event) => {
    clearVisualTimer();
    state.visualState.mode = event.target.value;
    state.visualState.step = 0;
    renderTreeVisual();
  });
  document.getElementById("tree-play").addEventListener("click", playTreeVisual);
  document.getElementById("tree-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintTreeStep();
  });
  paintTreeStep();
}

function paintTreeStep() {
  const step = getTreeSteps(state.visualState.mode)[state.visualState.step];
  const nodes = [
    { id: "A", x: 360, y: 52 },
    { id: "B", x: 220, y: 122 },
    { id: "C", x: 500, y: 122 },
    { id: "D", x: 132, y: 204 },
    { id: "E", x: 308, y: 204 },
    { id: "F", x: 500, y: 204 }
  ];
  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "B", to: "E" },
    { from: "C", to: "F" }
  ];
  document.getElementById("tree-lane").innerHTML = svgNodeStageMarkup({
    height: 250,
    nodes,
    edges,
    activeIds: step.active || [],
    visitedIds: step.visited || [],
    activeEdges: step.activeEdges || []
  }) + (step.queue ? `<div class="svg-legend">当前队列：${step.queue.length ? step.queue.join(" → ") : "空"}</div>` : "");
  document.getElementById("tree-caption").textContent = step.note;
}

function playTreeVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintTreeStep();
  const steps = getTreeSteps(state.visualState.mode);
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintTreeStep();
      clearVisualTimer();
      return;
    }
    paintTreeStep();
  }, 2100);
}

function getHeapSteps() {
  return [
    {
      values: [4, 7, 9, 10],
      activeIndices: [0, 1, 3],
      note: "当前是一个小顶堆，树形关系让你能直接看到父节点 7 与孩子 10 的位置。"
    },
    {
      values: [4, 7, 9, 10, 3],
      activeIndices: [4],
      note: "插入 3 后，先放到数组末尾，也就是树的最底层最右侧，接下来开始上浮。"
    },
    {
      values: [4, 3, 9, 10, 7],
      activeIndices: [1, 4],
      note: "3 比父节点 7 小，先和父节点交换。你能同时看到数组交换和树上位置变化。"
    },
    {
      values: [3, 4, 9, 10, 7],
      activeIndices: [0, 1],
      successIndices: [0],
      note: "3 继续上浮到堆顶，小顶堆的最小值维护完成。"
    }
  ];
}

function renderHeapVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="heap-play" type="button">播放上浮</button>
        <button class="ghost-button small" id="heap-reset" type="button">重置</button>
      </div>
      <div id="heap-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="heap-caption"></div>
    </div>
  `;
  document.getElementById("heap-play").addEventListener("click", playHeapVisual);
  document.getElementById("heap-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintHeapStep();
  });
  paintHeapStep();
}

function paintHeapStep() {
  const step = getHeapSteps()[state.visualState.step];
  const positions = [
    { id: "0", x: 360, y: 54 },
    { id: "1", x: 240, y: 126 },
    { id: "2", x: 480, y: 126 },
    { id: "3", x: 160, y: 208 },
    { id: "4", x: 320, y: 208 }
  ];
  const edges = [
    { from: "0", to: "1" },
    { from: "0", to: "2" },
    { from: "1", to: "3" },
    { from: "1", to: "4" }
  ];
  document.getElementById("heap-lane").innerHTML =
    svgNodeStageMarkup({
      height: 250,
      nodes: positions.filter((node) => step.values[node.id] !== undefined),
      edges: edges.filter((edge) => step.values[edge.from] !== undefined && step.values[edge.to] !== undefined),
      activeIds: (step.activeIndices || []).map(String),
      successIds: (step.successIndices || []).map(String),
      labels: Object.fromEntries(step.values.map((value, index) => [String(index), value]))
    }) +
    svgArrayStageMarkup({
      values: step.values,
      activeIndices: step.activeIndices || [],
      successIndices: step.successIndices || [],
      extraNote: "数组下标就是堆的层序存储，下标 0 永远是堆顶。"
    });
  document.getElementById("heap-caption").textContent = step.note;
}

function playHeapVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintHeapStep();
  const steps = getHeapSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintHeapStep();
      clearVisualTimer();
      return;
    }
    paintHeapStep();
  }, 2100);
}

export { renderTreeVisual, renderHeapVisual };
