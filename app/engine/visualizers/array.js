import { refs, state, clearVisualTimer } from "../state.js";
import { svgNodeStageMarkup, svgArrayStageMarkup } from "./shared.js";

function renderComplexityVisual() {
  const { n } = state.visualState;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="complexity-range">输入规模 n</label>
        <input id="complexity-range" type="range" min="4" max="96" value="${n}">
        <strong id="complexity-range-value">${n}</strong>
      </div>
      <div class="complexity-chart" id="complexity-chart"></div>
      <div class="visual-note" id="complexity-note"></div>
    </div>
    <div class="visual-slot" style="margin-top:16px;">
      <div class="visual-tabs">
        <button class="ghost-button small" id="complexity-play" type="button">播放线性扫描</button>
        <button class="ghost-button small" id="complexity-reset" type="button">重置</button>
      </div>
      <div class="trace-array" id="complexity-trace-array" style="margin-top:16px;"></div>
      <div class="trace-caption" id="complexity-trace-caption"></div>
    </div>
  `;
  const range = document.getElementById("complexity-range");
  range.addEventListener("input", () => {
    state.visualState.n = Number(range.value);
    document.getElementById("complexity-range-value").textContent = range.value;
    updateComplexityChart();
  });
  document.getElementById("complexity-play").addEventListener("click", playComplexityTrace);
  document.getElementById("complexity-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.traceIndex = -1;
    renderComplexityTrace();
  });
  updateComplexityChart();
  renderComplexityTrace();
}

function updateComplexityChart() {
  const n = state.visualState.n;
  const values = [
    { label: "O(1)", key: "o1", raw: 1 },
    { label: "O(log n)", key: "ologn", raw: Math.log2(n) },
    { label: "O(n)", key: "on", raw: n },
    { label: "O(n²)", key: "on2", raw: n * n }
  ];
  const max = Math.max(...values.map((item) => item.raw));
  document.getElementById("complexity-chart").innerHTML = values
    .map((item) => {
      const width = (item.raw / max) * 100;
      return `
        <div class="complexity-row">
          <div class="complexity-label">${item.label}</div>
          <div class="complexity-track"><div class="complexity-fill ${item.key}" style="width:${Math.max(width, 2)}%"></div></div>
          <div class="complexity-value">${formatValue(item.raw)}</div>
        </div>`;
    })
    .join("");
  document.getElementById("complexity-note").innerHTML =
    `当 <strong>n = ${n}</strong> 时，O(log n) 仍然很平缓，而 O(n²) 已经明显爆炸。` +
    `这就是为什么写出“能跑”的代码还不够，你必须继续比较增长趋势。`;
}

function renderComplexityTrace() {
  const { data, targetIndex, traceIndex } = state.visualState;
  document.getElementById("complexity-trace-array").innerHTML = data
    .map((value, index) => {
      const classes = ["trace-cell"];
      if (index < traceIndex) classes.push("done");
      if (index === traceIndex) classes.push("current");
      if (index === targetIndex && traceIndex >= targetIndex) classes.push("target");
      return `<div class="${classes.join(" ")}"><strong>${value}</strong><div>idx ${index}</div></div>`;
    })
    .join("");
  const caption = document.getElementById("complexity-trace-caption");
  if (traceIndex < 0) caption.textContent = "点击播放，观察线性查找如何从左到右逐个比较，直到在下标 6 命中目标值 15。";
  else if (traceIndex < targetIndex) caption.textContent = `当前检查下标 ${traceIndex}。线性查找不知道答案在哪里，只能继续向后一个个试。`;
  else caption.textContent = "找到目标后流程结束。最坏情况下，线性查找要把整个数组都看完，所以时间复杂度通常是 O(n)。";
}

function playComplexityTrace() {
  clearVisualTimer();
  state.visualState.traceIndex = -1;
  renderComplexityTrace();
  state.visualTimer = setInterval(() => {
    state.visualState.traceIndex += 1;
    renderComplexityTrace();
    if (state.visualState.traceIndex >= state.visualState.targetIndex) clearVisualTimer();
  }, 1200);
}

function getArraySnapshots(operation) {
  return {
    headInsert: [
      { cells: ["_", 10, 20, 30, 40, 50, "_", "_"], active: 0, shifted: [], note: "准备在头部插入 5，必须先腾出位置。" },
      { cells: ["_", 10, 20, 30, 40, 50, "_", "_"], active: 4, shifted: [5], note: "从右往左搬动元素，避免覆盖。" },
      { cells: ["_", 10, 20, 30, 40, 50, 50, "_"], active: 3, shifted: [4, 5], note: "后面的元素整体右移，成本会随着元素数量上升。" },
      { cells: ["_", 10, 20, 30, 40, 40, 50, "_"], active: 2, shifted: [3, 4, 5], note: "继续右移，直到最前面腾出空位。" },
      { cells: [5, 10, 20, 30, 40, 50, "_", "_"], active: 0, shifted: [0, 1, 2, 3, 4, 5], note: "头插完成。你看到的整体搬移，就是 O(n) 的来源。" }
    ],
    tailAppend: [
      { cells: [10, 20, 30, 40, 50, "_", "_", "_"], active: 5, shifted: [], note: "尾插通常只需要找到末尾空位。" },
      { cells: [10, 20, 30, 40, 50, 60, "_", "_"], active: 5, shifted: [], note: "把 60 直接放到末尾，几乎没有元素搬移，因此 append 通常很快。" }
    ],
    middleDelete: [
      { cells: [10, 20, 30, 40, 50, 60, "_", "_"], active: 2, shifted: [], note: "准备删除中间的元素 30。" },
      { cells: [10, 20, 40, 50, 60, "_", "_", "_"], active: 2, shifted: [2, 3, 4], note: "删除后，后面的元素要整体左移来填坑，这也是 O(n) 的来源。" }
    ]
  }[operation];
}

function renderArrayVisual() {
  const operation = state.visualState.operation;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="array-operation">操作</label>
        <select id="array-operation">
          <option value="headInsert">头部插入</option>
          <option value="tailAppend">尾部追加</option>
          <option value="middleDelete">中间删除</option>
        </select>
        <button class="ghost-button small" id="array-play" type="button">播放</button>
        <button class="ghost-button small" id="array-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="array-lane"></div>
      <div class="trace-caption" id="array-caption"></div>
    </div>
  `;
  document.getElementById("array-operation").value = operation;
  document.getElementById("array-operation").addEventListener("change", (event) => {
    clearVisualTimer();
    state.visualState.operation = event.target.value;
    state.visualState.step = 0;
    renderArrayVisual();
  });
  document.getElementById("array-play").addEventListener("click", playArrayVisual);
  document.getElementById("array-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintArraySnapshot();
  });
  paintArraySnapshot();
}

function paintArraySnapshot() {
  const snapshots = getArraySnapshots(state.visualState.operation);
  const snapshot = snapshots[state.visualState.step];
  document.getElementById("array-lane").innerHTML = svgArrayStageMarkup({
    values: snapshot.cells,
    activeIndices: [snapshot.active],
    successIndices: snapshot.shifted,
    extraNote: "数组的核心是连续存储，所以插入和删除经常伴随整体搬移。"
  });
  document.getElementById("array-caption").textContent = snapshot.note;
}

function playArrayVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintArraySnapshot();
  const snapshots = getArraySnapshots(state.visualState.operation);
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= snapshots.length) {
      state.visualState.step = snapshots.length - 1;
      paintArraySnapshot();
      clearVisualTimer();
      return;
    }
    paintArraySnapshot();
  }, 2100);
}

function getLinkedSteps() {
  return [
    { nodes: ["dummy", 1, 2, 6, 3], active: "dummy", removed: null, note: "dummy 节点先指向原链表头部，这样删除头节点也能统一处理。" },
    { nodes: ["dummy", 1, 2, 6, 3], active: 2, removed: null, note: "遍历到值为 2 的节点，它是待删除节点 6 的前驱。" },
    { nodes: ["dummy", 1, 2, 3], active: 2, removed: 6, note: "把前驱节点 2 的 next 直接改到 3，值为 6 的节点就被跳过了。" }
  ];
}

function renderLinkedVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="linked-play" type="button">播放改链</button>
        <button class="ghost-button small" id="linked-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="linked-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="linked-caption"></div>
    </div>
  `;
  document.getElementById("linked-play").addEventListener("click", playLinkedVisual);
  document.getElementById("linked-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintLinkedStep();
  });
  paintLinkedStep();
}

function paintLinkedStep() {
  const step = getLinkedSteps()[state.visualState.step];
  const visibleNodes = step.nodes.map((node, index) => ({
    id: `${node}-${index}`,
    x: 110 + index * 130,
    y: 110,
    label: String(node)
  }));
  const edges = visibleNodes.slice(0, -1).map((node, index) => ({ from: node.id, to: visibleNodes[index + 1].id }));
  document.getElementById("linked-lane").innerHTML =
    svgNodeStageMarkup({
      width: Math.max(720, visibleNodes.length * 130 + 80),
      height: 220,
      nodes: visibleNodes,
      edges,
      activeIds: visibleNodes.filter((node) => node.label === String(step.active)).map((node) => node.id),
      successIds: visibleNodes.filter((node) => node.label === String(step.removed)).map((node) => node.id)
    }) +
    (step.removed !== null ? `<div class="svg-legend">被跳过的节点：${step.removed}。改的是前驱的 next，而不是“删除数组中的位置”。</div>` : `<div class="svg-legend">dummy 节点让删除头节点也能统一成“改前驱 next 指针”。</div>`);
  document.getElementById("linked-caption").textContent = step.note;
}

function playLinkedVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintLinkedStep();
  const steps = getLinkedSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintLinkedStep();
      clearVisualTimer();
      return;
    }
    paintLinkedStep();
  }, 2100);
}

function getStackQueueSteps(mode) {
  if (mode === "stack") {
    return [
      { items: [], active: null, note: "栈遵循后进先出，新的元素总是压到顶端。" },
      { items: [1], active: 1, note: "push 1，1 成为栈顶。" },
      { items: [1, 3], active: 3, note: "push 3，3 后进，所以现在在最顶端。" },
      { items: [1], active: 3, note: "pop 时，最后进入的 3 最先离开，这就是 LIFO。" }
    ];
  }
  return [
    { items: [], active: null, note: "队列遵循先进先出，新的元素总是排到队尾。" },
    { items: [2], active: 2, note: "enqueue 2，2 进入队尾。" },
    { items: [2, 5], active: 5, note: "enqueue 5，5 在队尾等待。" },
    { items: [5], active: 2, note: "dequeue 时，最早进入的 2 先离开，这就是 FIFO。" }
  ];
}

function renderStackQueueVisual() {
  const mode = state.visualState.mode;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="sq-mode">模式</label>
        <select id="sq-mode">
          <option value="stack">栈</option>
          <option value="queue">队列</option>
        </select>
        <button class="ghost-button small" id="sq-play" type="button">播放</button>
        <button class="ghost-button small" id="sq-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="sq-lane"></div>
      <div class="trace-caption" id="sq-caption"></div>
    </div>
  `;
  document.getElementById("sq-mode").value = mode;
  document.getElementById("sq-mode").addEventListener("change", (event) => {
    clearVisualTimer();
    state.visualState.mode = event.target.value;
    state.visualState.step = 0;
    renderStackQueueVisual();
  });
  document.getElementById("sq-play").addEventListener("click", playStackQueueVisual);
  document.getElementById("sq-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintStackQueueStep();
  });
  paintStackQueueStep();
}

function paintStackQueueStep() {
  const step = getStackQueueSteps(state.visualState.mode)[state.visualState.step];
  const values = step.items.length ? step.items : ["空"];
  const topLabels =
    state.visualState.mode === "stack" && step.items.length
      ? { [step.items.length - 1]: "top" }
      : state.visualState.mode === "queue" && step.items.length
        ? { 0: "front" }
        : {};
  const bottomLabels = state.visualState.mode === "queue" && step.items.length ? { [step.items.length - 1]: "rear" } : {};
  const activeIndices = step.items.length ? step.items.map((item, index) => (item === step.active ? index : -1)).filter((index) => index >= 0) : [];
  document.getElementById("sq-lane").innerHTML = svgArrayStageMarkup({
    values,
    activeIndices,
    topLabels,
    bottomLabels,
    extraNote: state.visualState.mode === "stack" ? "栈从同一端进出，后进先出。" : "队列一端进、一端出，先进先出。"
  });
  document.getElementById("sq-caption").textContent = step.note;
}

function playStackQueueVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintStackQueueStep();
  const steps = getStackQueueSteps(state.visualState.mode);
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintStackQueueStep();
      clearVisualTimer();
      return;
    }
    paintStackQueueStep();
  }, 2100);
}

function getBinarySteps() {
  return [
    { left: 0, right: 8, mid: 4, note: "初始区间覆盖整个数组，先检查中点 19。" },
    { left: 5, right: 8, mid: 6, note: "24 比 19 大，所以左半边都可以排除，只看右半段。" },
    { left: 5, right: 5, mid: 5, note: "24 比 31 小，因此继续收缩到左半边。" },
    { left: 5, right: 5, mid: 5, found: true, note: "在下标 5 找到目标值 24。每次砍半，就是 O(log n) 的来源。" }
  ];
}

function renderBinaryVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="binary-play" type="button">播放二分</button>
        <button class="ghost-button small" id="binary-reset" type="button">重置</button>
      </div>
      <div class="window-row" id="binary-row" style="margin-top:16px;"></div>
      <div class="trace-caption" id="binary-caption"></div>
    </div>
  `;
  document.getElementById("binary-play").addEventListener("click", playBinaryVisual);
  document.getElementById("binary-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintBinaryStep();
  });
  paintBinaryStep();
}

function paintBinaryStep() {
  const step = getBinarySteps()[state.visualState.step];
  const data = [3, 7, 11, 15, 19, 24, 31, 42, 57];
  document.getElementById("binary-row").innerHTML = svgArrayStageMarkup({
    values: data,
    activeIndices: [step.mid],
    successIndices: step.found ? [step.mid] : [],
    dimIndices: data.map((_, index) => index).filter((index) => index < step.left || index > step.right),
    leftIndex: step.left,
    rightIndex: step.right,
    topLabels: { [step.left]: "left", [step.mid]: "mid", [step.right]: "right" },
    extraNote: `当前比较值 = ${data[step.mid]}`
  });
  document.getElementById("binary-caption").textContent = step.note;
}

function playBinaryVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintBinaryStep();
  const steps = getBinarySteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintBinaryStep();
      clearVisualTimer();
      return;
    }
    paintBinaryStep();
  }, 2100);
}

function getHashSteps() {
  return [
    { current: null, need: null, seen: [], note: "目标值 target = 9。准备一边遍历，一边记录已经见过的数字。", hit: false },
    { current: 2, need: 7, seen: [2], note: "先看 2，需要补数 7。当前 seen 里没有，所以把 2 记录下来。", hit: false },
    { current: 7, need: 2, seen: [2, 7], note: "再看 7，需要补数 2。2 已经在 seen 里，说明答案命中。", hit: true }
  ];
}

function renderHashVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="hash-play" type="button">播放命中过程</button>
        <button class="ghost-button small" id="hash-reset" type="button">重置</button>
      </div>
      <div class="bucket-grid" id="hash-buckets" style="margin-top:16px;"></div>
      <div class="visual-note" id="hash-seen"></div>
      <div class="trace-caption" id="hash-caption"></div>
    </div>
  `;
  document.getElementById("hash-play").addEventListener("click", playHashVisual);
  document.getElementById("hash-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintHashStep();
  });
  paintHashStep();
}

function paintHashStep() {
  const step = getHashSteps()[state.visualState.step];
  const bucketCount = 4;
  const buckets = Array.from({ length: bucketCount }, () => []);
  step.seen.forEach((value) => buckets[value % bucketCount].push(value));
  const activeBucket = step.current === null ? null : step.current % bucketCount;
  const hitBucket = step.need === null ? null : step.need % bucketCount;
  const bucketValues = buckets.map((items, index) => `b${index}: ${items.length ? items.join("/") : "空"}`);
  document.getElementById("hash-buckets").innerHTML = svgArrayStageMarkup({
    values: bucketValues,
    activeIndices: activeBucket === null ? [] : [activeBucket],
    successIndices: step.hit && hitBucket !== null ? [hitBucket] : [],
    extraNote: "桶内展示的是已经 seen 过的值。命中补数时，说明当前值可以和历史值组成答案。"
  });
  document.getElementById("hash-seen").innerHTML =
    step.current === null ? "seen = {}" : `当前值 = <strong>${step.current}</strong>，需要补数 = <strong>${step.need}</strong>，seen = { ${step.seen.join(", ")} }`;
  document.getElementById("hash-caption").textContent = step.note;
}

function playHashVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintHashStep();
  const steps = getHashSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintHashStep();
      clearVisualTimer();
      return;
    }
    paintHashStep();
  }, 2100);
}

function getTwoPointerSteps() {
  return [
    {
      values: [2, 7, 11, 15],
      left: 0,
      right: 3,
      note: "初始时 left 指向最小值，right 指向最大值，先看最外侧这对数。"
    },
    {
      values: [2, 7, 11, 15],
      left: 0,
      right: 2,
      dim: [3],
      note: "2 + 15 太大，所以右指针左移。被划出区间的 15 以后都不会再参与比较。"
    },
    {
      values: [2, 7, 11, 15],
      left: 0,
      right: 1,
      dim: [2, 3],
      note: "2 + 11 仍然太大，继续缩小右边界。"
    },
    {
      values: [2, 7, 11, 15],
      left: 0,
      right: 1,
      hit: true,
      note: "2 + 7 命中目标。双指针通过有序性持续收缩搜索区间。"
    }
  ];
}

function renderTwoPointersVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="tp-play" type="button">播放双指针</button>
        <button class="ghost-button small" id="tp-reset" type="button">重置</button>
      </div>
      <div id="tp-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="tp-caption"></div>
    </div>
  `;
  document.getElementById("tp-play").addEventListener("click", playTwoPointerVisual);
  document.getElementById("tp-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintTwoPointerStep();
  });
  paintTwoPointerStep();
}

function paintTwoPointerStep() {
  const step = getTwoPointerSteps()[state.visualState.step];
  document.getElementById("tp-lane").innerHTML = svgArrayStageMarkup({
    values: step.values,
    activeIndices: [step.left, step.right],
    successIndices: step.hit ? [step.left, step.right] : [],
    dimIndices: step.dim || [],
    leftIndex: step.left,
    rightIndex: step.right,
    topLabels: { [step.left]: "left", [step.right]: "right" },
    extraNote: `当前和 = ${step.values[step.left] + step.values[step.right]}`
  });
  document.getElementById("tp-caption").textContent = step.note;
}

function playTwoPointerVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintTwoPointerStep();
  const steps = getTwoPointerSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintTwoPointerStep();
      clearVisualTimer();
      return;
    }
    paintTwoPointerStep();
  }, 2100);
}

function getWindowSteps() {
  return [
    {
      values: ["a", "b", "c", "a"],
      left: 0,
      right: 0,
      windowText: "a",
      note: "窗口从单个字符开始，先把 right 位置纳入窗口。"
    },
    {
      values: ["a", "b", "c", "a"],
      left: 0,
      right: 2,
      windowText: "abc",
      note: "当前窗口 abc 没有重复，可以继续扩张。"
    },
    {
      values: ["a", "b", "c", "a"],
      left: 1,
      right: 3,
      windowText: "bca",
      note: "右边加入 a 后出现重复，所以 left 向右收缩，直到窗口恢复合法。"
    },
    {
      values: ["a", "b", "c", "a"],
      left: 1,
      right: 3,
      hit: true,
      windowText: "bca",
      note: "收缩后窗口 bca 重新合法。窗口题的关键就在于‘扩张 + 修复’。"
    }
  ];
}

function renderWindowVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="window-play" type="button">播放窗口</button>
        <button class="ghost-button small" id="window-reset" type="button">重置</button>
      </div>
      <div id="window-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="window-caption"></div>
    </div>
  `;
  document.getElementById("window-play").addEventListener("click", playWindowVisual);
  document.getElementById("window-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintWindowStep();
  });
  paintWindowStep();
}

function paintWindowStep() {
  const step = getWindowSteps()[state.visualState.step];
  document.getElementById("window-lane").innerHTML = svgArrayStageMarkup({
    values: step.values,
    activeIndices: [],
    successIndices: step.hit ? [step.left, step.right] : [],
    windowRange: [step.left, step.right],
    leftIndex: step.left,
    rightIndex: step.right,
    topLabels: { [step.right]: "right" },
    bottomLabels: { [step.left]: "left" },
    extraNote: `当前窗口 = ${step.windowText}`
  });
  document.getElementById("window-caption").textContent = step.note;
}

function playWindowVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintWindowStep();
  const steps = getWindowSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintWindowStep();
      clearVisualTimer();
      return;
    }
    paintWindowStep();
  }, 2100);
}

function getGreedySteps() {
  return [
    { values: [2, 3, 1, 1, 4], active: 0, reach: 2, note: "从位置 0 出发，最远可达下标是 2。" },
    { values: [2, 3, 1, 1, 4], active: 1, reach: 4, note: "走到位置 1 后，最远可达更新到 4，已经覆盖终点。" },
    { values: [2, 3, 1, 1, 4], active: 4, reach: 4, note: "一旦最远可达覆盖终点，就说明可以成功到达。" }
  ];
}

function renderGreedyVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="greedy-play" type="button">播放贪心</button>
        <button class="ghost-button small" id="greedy-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="greedy-lane" style="margin-top:16px;"></div>
      <div class="trace-caption" id="greedy-caption"></div>
    </div>
  `;
  document.getElementById("greedy-play").addEventListener("click", playGreedyVisual);
  document.getElementById("greedy-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintGreedyStep();
  });
  paintGreedyStep();
}

function paintGreedyStep() {
  const step = getGreedySteps()[state.visualState.step];
  document.getElementById("greedy-lane").innerHTML = svgArrayStageMarkup({
    values: step.values,
    activeIndices: [step.active],
    successIndices: Array.from({ length: step.reach + 1 }, (_, index) => index),
    topLabels: { [step.active]: "当前位置" },
    extraNote: `当前最远可达 = ${step.reach}`
  });
  document.getElementById("greedy-caption").textContent = step.note;
}

function playGreedyVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintGreedyStep();
  const steps = getGreedySteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintGreedyStep();
      clearVisualTimer();
      return;
    }
    paintGreedyStep();
  }, 2100);
}

function getPrefixSteps() {
  return [
    { raw: [3, 1, 4, 2], prefix: [0, 3, 4, 8, 10], active: 1, note: "前缀和数组从左到右累加：prefix[i+1] = prefix[i] + nums[i]。" },
    { raw: [3, 1, 4, 2], prefix: [0, 3, 4, 8, 10], active: 3, note: "查询区间 [1, 3] 时，只要做 prefix[4] - prefix[1] = 7。" },
    { raw: [3, 1, 4, 2], prefix: [0, 3, 4, 8, 10], active: 4, note: "预处理一次后，很多区间查询都能 O(1) 得到答案。" }
  ];
}

function renderPrefixVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="prefix-play" type="button">播放前缀和</button>
        <button class="ghost-button small" id="prefix-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="prefix-raw" style="margin-top:16px;"></div>
      <div class="array-lane" id="prefix-sum" style="margin-top:12px;"></div>
      <div class="trace-caption" id="prefix-caption"></div>
    </div>
  `;
  document.getElementById("prefix-play").addEventListener("click", playPrefixVisual);
  document.getElementById("prefix-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintPrefixStep();
  });
  paintPrefixStep();
}

function paintPrefixStep() {
  const step = getPrefixSteps()[state.visualState.step];
  document.getElementById("prefix-raw").innerHTML = svgArrayStageMarkup({
    values: step.raw,
    activeIndices: step.active > 0 ? [step.active - 1] : [],
    extraNote: "原数组"
  });
  document.getElementById("prefix-sum").innerHTML = svgArrayStageMarkup({
    values: step.prefix,
    successIndices: [step.active],
    extraNote: "前缀和数组"
  });
  document.getElementById("prefix-caption").textContent = step.note;
}

function playPrefixVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintPrefixStep();
  const steps = getPrefixSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintPrefixStep();
      clearVisualTimer();
      return;
    }
    paintPrefixStep();
  }, 2100);
}

function getMonotonicSteps() {
  return [
    { values: [2, 1, 2, 4], stack: [], active: 2, note: "单调栈维护一个递减候选集合，先看值 2。" },
    { values: [2, 1, 2, 4], stack: [2, 1], active: 1, note: "1 比栈顶 2 小，可以直接入栈等待未来更大值。" },
    { values: [2, 1, 2, 4], stack: [2, 2], active: 2, note: "新的 2 到来时，1 被弹出，它的下一个更大值已经确定。" },
    { values: [2, 1, 2, 4], stack: [4], active: 4, note: "4 到来后把前面更小候选都淘汰掉，说明单调结构的关键是‘永久淘汰无用元素’。" }
  ];
}

function renderMonotonicVisual() {
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="trace-controls">
        <button class="ghost-button small" id="mono-play" type="button">播放单调栈</button>
        <button class="ghost-button small" id="mono-reset" type="button">重置</button>
      </div>
      <div class="array-lane" id="mono-raw" style="margin-top:16px;"></div>
      <div class="array-lane" id="mono-stack" style="margin-top:12px;"></div>
      <div class="trace-caption" id="mono-caption"></div>
    </div>
  `;
  document.getElementById("mono-play").addEventListener("click", playMonotonicVisual);
  document.getElementById("mono-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintMonotonicStep();
  });
  paintMonotonicStep();
}

function paintMonotonicStep() {
  const step = getMonotonicSteps()[state.visualState.step];
  const activeIndex = step.values.findIndex((value) => value === step.active);
  document.getElementById("mono-raw").innerHTML = svgArrayStageMarkup({
    values: step.values,
    activeIndices: activeIndex >= 0 ? [activeIndex] : [],
    extraNote: "扫描中的原数组"
  });
  document.getElementById("mono-stack").innerHTML = svgArrayStageMarkup({
    values: step.stack.length ? step.stack : ["空栈"],
    successIndices: Array.from({ length: step.stack.length || 1 }, (_, index) => index),
    topLabels: step.stack.length ? { [step.stack.length - 1]: "栈顶" } : {},
    extraNote: "单调栈里只保留未来仍然可能有用的候选。"
  });
  document.getElementById("mono-caption").textContent = step.note;
}

function playMonotonicVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintMonotonicStep();
  const steps = getMonotonicSteps();
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintMonotonicStep();
      clearVisualTimer();
      return;
    }
    paintMonotonicStep();
  }, 2100);
}

function getAdvancedStructSteps(mode) {
  const union = [
    {
      activeNodes: ["0", "1", "2", "3"],
      activeEdges: [],
      groups: ["{0}", "{1}", "{2}", "{3}"],
      note: "初始时每个节点各自属于一个集合，图上还没有合并边。"
    },
    {
      activeNodes: ["1", "2"],
      activeEdges: ["0-1", "1-2"],
      visitedNodes: ["0", "1", "2"],
      groups: ["{0,1,2}", "{3}"],
      note: "先 union(0,1)，再 union(1,2)。并查集最关键的是“合并后具有传递性”。"
    },
    {
      activeNodes: ["2", "0"],
      activeEdges: ["2-1", "1-0"],
      visitedNodes: ["0", "1", "2"],
      groups: ["find(2) -> root 0", "{3}"],
      note: "此时 find(2) 会沿父指针一路找到根 0。路径压缩的目标，就是把这条路变短。"
    }
  ];
  const trie = [
    {
      activeNodes: ["root"],
      activeEdges: [],
      words: ["app", "apple"],
      note: "Trie 从根开始，按字符逐层延伸路径。所有单词都共享根节点。"
    },
    {
      activeNodes: ["a", "p1", "p2"],
      activeEdges: ["root-a", "a-p1", "p1-p2"],
      visitedNodes: ["root", "a", "p1", "p2"],
      words: ["app"],
      note: "插入 app 时，路径 root -> a -> p -> p 被依次创建。"
    },
    {
      activeNodes: ["l", "e"],
      activeEdges: ["p2-l", "l-e"],
      visitedNodes: ["root", "a", "p1", "p2", "l", "e"],
      words: ["app", "apple"],
      note: "再插入 apple 时，前缀 app 直接复用，只需要从第二个 p 往下继续分叉。"
    }
  ];
  return mode === "trie" ? trie : union;
}

function renderAdvancedStructVisual() {
  const mode = state.visualState.mode;
  refs.visualContent.innerHTML = `
    <div class="visual-slot">
      <div class="visual-toolbar">
        <label for="adv-mode">模式</label>
        <select id="adv-mode">
          <option value="union">并查集</option>
          <option value="trie">Trie</option>
        </select>
        <button class="ghost-button small" id="adv-play" type="button">播放</button>
        <button class="ghost-button small" id="adv-reset" type="button">重置</button>
      </div>
      <div id="adv-lane"></div>
      <div class="trace-caption" id="adv-caption"></div>
    </div>
  `;
  document.getElementById("adv-mode").value = mode;
  document.getElementById("adv-mode").addEventListener("change", (event) => {
    clearVisualTimer();
    state.visualState.mode = event.target.value;
    state.visualState.step = 0;
    renderAdvancedStructVisual();
  });
  document.getElementById("adv-play").addEventListener("click", playAdvancedStructVisual);
  document.getElementById("adv-reset").addEventListener("click", () => {
    clearVisualTimer();
    state.visualState.step = 0;
    paintAdvancedStructStep();
  });
  paintAdvancedStructStep();
}

function paintAdvancedStructStep() {
  const step = getAdvancedStructSteps(state.visualState.mode)[state.visualState.step];
  if (state.visualState.mode === "trie") {
    const nodes = [
      { id: "root", x: 120, y: 130, label: "root" },
      { id: "a", x: 260, y: 130, label: "a" },
      { id: "p1", x: 400, y: 130, label: "p" },
      { id: "p2", x: 540, y: 130, label: "p*" },
      { id: "l", x: 620, y: 70, label: "l" },
      { id: "e", x: 700, y: 70, label: "e*" }
    ];
    const edges = [
      { from: "root", to: "a" },
      { from: "a", to: "p1" },
      { from: "p1", to: "p2" },
      { from: "p2", to: "l" },
      { from: "l", to: "e" }
    ];
    document.getElementById("adv-lane").innerHTML =
      svgNodeStageMarkup({
        width: 780,
        height: 220,
        nodes,
        edges,
        activeIds: step.activeNodes || [],
        visitedIds: step.visitedNodes || [],
        activeEdges: step.activeEdges || []
      }) + `<div class="svg-legend">当前词集：${step.words.join("、")}，带 * 的节点表示一个单词在这里结束。</div>`;
  } else {
    const nodes = [
      { id: "0", x: 120, y: 130, label: "0" },
      { id: "1", x: 280, y: 130, label: "1" },
      { id: "2", x: 440, y: 130, label: "2" },
      { id: "3", x: 620, y: 130, label: "3" }
    ];
    const edges = [
      { from: "0", to: "1" },
      { from: "1", to: "2" }
    ];
    document.getElementById("adv-lane").innerHTML =
      svgNodeStageMarkup({
        width: 720,
        height: 220,
        nodes,
        edges,
        activeIds: step.activeNodes || [],
        visitedIds: step.visitedNodes || [],
        activeEdges: step.activeEdges || []
      }) + `<div class="svg-legend">集合状态：${step.groups.join(" · ")}</div>`;
  }
  document.getElementById("adv-caption").textContent = step.note;
}

function playAdvancedStructVisual() {
  clearVisualTimer();
  state.visualState.step = 0;
  paintAdvancedStructStep();
  const steps = getAdvancedStructSteps(state.visualState.mode);
  state.visualTimer = setInterval(() => {
    state.visualState.step += 1;
    if (state.visualState.step >= steps.length) {
      state.visualState.step = steps.length - 1;
      paintAdvancedStructStep();
      clearVisualTimer();
      return;
    }
    paintAdvancedStructStep();
  }, 2100);
}

function formatValue(value) {
  return value >= 1000 ? value.toLocaleString("zh-CN") : Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export { renderComplexityVisual, renderArrayVisual, renderLinkedVisual, renderStackQueueVisual, renderBinaryVisual, renderHashVisual, renderTwoPointersVisual, renderWindowVisual, renderGreedyVisual, renderPrefixVisual, renderMonotonicVisual, renderAdvancedStructVisual };
