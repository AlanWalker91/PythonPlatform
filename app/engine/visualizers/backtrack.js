import { refs, state, clearVisualTimer } from "../state.js";
import { svgNodeStageMarkup, svgArrayStageMarkup } from "./shared.js";

function getBacktrackingSteps() {
  return [
    {
      path: [],
      activeNode: "root",
      activeEdges: [],
      choices: "从空路径开始，先站在根节点，准备尝试第一层选择。"
    },
    {
      path: [1],
      activeNode: "1",
      activeEdges: ["root-1"],
      choices: "先选择 1，沿树向下一层递归，路径变成 [1]。"
    },
    {
      path: [1, 2],
      activeNode: "12",
      activeEdges: ["1-12"],
      choices: "继续选择 2，路径扩成 [1, 2]。这是“做选择”的瞬间。"
    },
    {
      path: [1],
      activeNode: "1",
      successNode: "12",
      activeEdges: ["1-12"],
      choices: "从下一层回来后，撤销 2，回到 [1]。这就是“撤销选择”的回溯动作。"
    },
    {
      path: [1, 3],
      activeNode: "13",
      activeEdges: ["1-13"],
      choices: "换成 3 再试一次。回溯不是倒退，而是换分支继续搜索。"
    }
  ];
}

function renderBacktrackingVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="bt-play" type="button">播放回溯</button>
        <button class="ghost-button small" id="bt-reset" type="button">重置</button>
      </div>
      <div id="bt-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="bt-caption"></div>
    </div>
  `;
  document.getElementById("bt-play").addEventListener("click", playBacktrackingVisual);
  document.getElementById("bt-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintBacktrackingStep();
  });
  paintBacktrackingStep();
}

function paintBacktrackingStep() {
  const step = getBacktrackingSteps()[state.visualState.step];
  const nodes = [
    { id: "root", x: 360, y: 44, label: "[]" },
    { id: "1", x: 220, y: 122, label: "[1]" },
    { id: "2", x: 360, y: 122, label: "[2]" },
    { id: "3", x: 500, y: 122, label: "[3]" },
    { id: "12", x: 170, y: 214, label: "[1,2]" },
    { id: "13", x: 270, y: 214, label: "[1,3]" }
  ];
  const edges = [
    { from: "root", to: "1" },
    { from: "root", to: "2" },
    { from: "root", to: "3" },
    { from: "1", to: "12" },
    { from: "1", to: "13" }
  ];
  document.getElementById("bt-lane").innerHTML =
    svgNodeStageMarkup({
      height: 260,
      nodes,
      edges,
      activeIds: step.activeNode ? [step.activeNode] : [],
      successIds: step.successNode ? [step.successNode] : [],
      activeEdges: step.activeEdges || []
    }) +
    `<div class="svg-legend">当前递归路径：${step.path.length ? `[${step.path.join(", ")}]` : "[]"} </div>`;
  document.getElementById("bt-caption").textContent = step.choices;
}

function playBacktrackingVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintBacktrackingStep();
  const steps = getBacktrackingSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintBacktrackingStep();
      clearVisualTimer();
      return;
    }
    paintBacktrackingStep();
  }, 2100);
}

function getDPSteps() {
  return [
    {
      values: [1, 2, 0, 0, 0],
      activeIndex: 1,
      activeNode: "2",
      visitedNodes: ["1", "2"],
      activeEdges: ["1-3", "2-3"],
      note: "以爬楼梯为例，先初始化最小状态：dp[1] = 1，dp[2] = 2。后面的状态都会依赖它们。"
    },
    {
      values: [1, 2, 3, 0, 0],
      activeIndex: 2,
      activeNode: "3",
      visitedNodes: ["1", "2", "3"],
      activeEdges: ["1-3", "2-3"],
      note: "dp[3] = dp[2] + dp[1] = 3。图上的两条依赖边会一起汇入状态 3。"
    },
    {
      values: [1, 2, 3, 5, 0],
      activeIndex: 3,
      activeNode: "4",
      visitedNodes: ["1", "2", "3", "4"],
      activeEdges: ["2-4", "3-4"],
      note: "dp[4] = dp[3] + dp[2] = 5。每个新状态都只依赖更小的问题。"
    },
    {
      values: [1, 2, 3, 5, 8],
      activeIndex: 4,
      activeNode: "5",
      visitedNodes: ["1", "2", "3", "4", "5"],
      activeEdges: ["3-5", "4-5"],
      note: "dp[5] = dp[4] + dp[3] = 8。DP 的核心就是把已经算过的状态复用起来。"
    }
  ];
}

function renderDPVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="dp-play" type="button">播放状态转移</button>
        <button class="ghost-button small" id="dp-reset" type="button">重置</button>
      </div>
      <div id="dp-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="dp-caption"></div>
    </div>
  `;
  document.getElementById("dp-play").addEventListener("click", playDPVisual);
  document.getElementById("dp-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintDPStep();
  });
  paintDPStep();
}

function paintDPStep() {
  const step = getDPSteps()[state.visualState.step];
  const nodes = [
    { id: "1", x: 120, y: 170, label: "1" },
    { id: "2", x: 240, y: 92, label: "2" },
    { id: "3", x: 360, y: 170, label: "3" },
    { id: "4", x: 500, y: 92, label: "4" },
    { id: "5", x: 620, y: 170, label: "5" }
  ];
  const edges = [
    { from: "1", to: "3" },
    { from: "2", to: "3" },
    { from: "2", to: "4" },
    { from: "3", to: "4" },
    { from: "3", to: "5" },
    { from: "4", to: "5" }
  ];
  document.getElementById("dp-lane").innerHTML =
    svgNodeStageMarkup({
      height: 240,
      nodes,
      edges,
      activeIds: [step.activeNode],
      visitedIds: step.visitedNodes || [],
      activeEdges: step.activeEdges || [],
      labels: Object.fromEntries(step.values.map((value, index) => [String(index + 1), `dp${index + 1}=${value}`]))
    }) +
    svgArrayStageMarkup({
      values: step.values,
      activeIndices: [step.activeIndex],
      successIndices: Array.from({ length: step.activeIndex }, (_, index) => index),
      extraNote: `正在计算 dp[${step.activeIndex + 1}]`
    });
  document.getElementById("dp-caption").textContent = step.note;
}

function playDPVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintDPStep();
  const steps = getDPSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintDPStep();
      clearVisualTimer();
      return;
    }
    paintDPStep();
  }, 2100);
}

export { renderBacktrackingVisual, renderDPVisual };
