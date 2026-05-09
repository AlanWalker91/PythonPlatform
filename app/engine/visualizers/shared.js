function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svgNodeMarkup(node, options = {}) {
  const {
    activeIds = [],
    visitedIds = [],
    successIds = [],
    labels = {},
    radius = 24
  } = options;
  const classes = ["svg-node"];
  if (visitedIds.includes(node.id)) classes.push("visited");
  if (activeIds.includes(node.id)) classes.push("active");
  if (successIds.includes(node.id)) classes.push("success");
  return `
    <g class="${classes.join(" ")}" transform="translate(${node.x} ${node.y})">
      <circle r="${radius}"></circle>
      <text y="6">${escapeHtml(labels[node.id] ?? node.label ?? node.id)}</text>
    </g>
  `;
}

function svgEdgeMarkup(edge, nodeMap, options = {}) {
  const { activeEdges = [], successEdges = [] } = options;
  const from = nodeMap[edge.from];
  const to = nodeMap[edge.to];
  if (!from || !to) return "";
  const key = `${edge.from}-${edge.to}`;
  const reverseKey = `${edge.to}-${edge.from}`;
  const classes = ["svg-edge"];
  if (activeEdges.includes(key) || activeEdges.includes(reverseKey)) classes.push("active");
  if (successEdges.includes(key) || successEdges.includes(reverseKey)) classes.push("success");
  return `<line class="${classes.join(" ")}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"></line>`;
}

function svgNodeStageMarkup({
  width = 720,
  height = 280,
  nodes = [],
  edges = [],
  activeIds = [],
  visitedIds = [],
  activeEdges = [],
  successIds = [],
  successEdges = [],
  labels = {},
  annotations = []
}) {
  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));
  return `
    <div class="svg-stage">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="算法演示图">
        <defs>
          <marker id="arrow-head" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
            <path d="M0,0 L12,6 L0,12 z" fill="#3e7cff"></path>
          </marker>
        </defs>
        ${edges.map((edge) => svgEdgeMarkup(edge, nodeMap, { activeEdges, successEdges })).join("")}
        ${annotations.join("")}
        ${nodes.map((node) => svgNodeMarkup(node, { activeIds, visitedIds, successIds, labels })).join("")}
      </svg>
    </div>
  `;
}

function svgArrayStageMarkup({
  values = [],
  activeIndices = [],
  successIndices = [],
  dimIndices = [],
  windowRange = null,
  leftIndex = null,
  rightIndex = null,
  topLabels = {},
  bottomLabels = {},
  extraNote = ""
}) {
  const cellWidth = 86;
  const startX = 34;
  const baseY = 88;
  const width = Math.max(460, startX * 2 + values.length * cellWidth);
  const cells = values
    .map((value, index) => {
      const x = startX + index * cellWidth;
      const classes = ["svg-array-cell"];
      if (activeIndices.includes(index)) classes.push("active");
      if (successIndices.includes(index)) classes.push("success");
      if (dimIndices.includes(index)) classes.push("dim");
      if (windowRange && index >= windowRange[0] && index <= windowRange[1]) classes.push("window");
      return `
        <g class="${classes.join(" ")}" transform="translate(${x} ${baseY})">
          <rect width="64" height="52" rx="16"></rect>
          <text class="value" x="32" y="30">${escapeHtml(value)}</text>
          <text class="index" x="32" y="70">idx ${index}</text>
        </g>
      `;
    })
    .join("");

  const topPointers = Object.entries(topLabels)
    .map(([index, label]) => {
      const x = startX + Number(index) * cellWidth + 32;
      return `
        <g class="svg-pointer top">
          <line x1="${x}" y1="20" x2="${x}" y2="78" marker-end="url(#arrow-head)"></line>
          <text x="${x}" y="16">${escapeHtml(label)}</text>
        </g>
      `;
    })
    .join("");

  const bottomPointers = Object.entries(bottomLabels)
    .map(([index, label]) => {
      const x = startX + Number(index) * cellWidth + 32;
      return `
        <g class="svg-pointer bottom">
          <line x1="${x}" y1="148" x2="${x}" y2="114" marker-end="url(#arrow-head)"></line>
          <text x="${x}" y="170">${escapeHtml(label)}</text>
        </g>
      `;
    })
    .join("");

  const bracket =
    windowRange
      ? (() => {
          const leftX = startX + windowRange[0] * cellWidth + 2;
          const rightX = startX + windowRange[1] * cellWidth + 62;
          return `<path class="svg-window-bracket" d="M${leftX} 78 L${leftX} 58 L${rightX} 58 L${rightX} 78"></path>`;
        })()
      : "";

  const footer =
    leftIndex !== null && rightIndex !== null
      ? `<div class="svg-legend">当前关注区间：<strong>[${leftIndex}, ${rightIndex}]</strong>${extraNote ? ` · ${escapeHtml(extraNote)}` : ""}</div>`
      : extraNote
        ? `<div class="svg-legend">${escapeHtml(extraNote)}</div>`
        : "";

  return `
    <div class="svg-stage">
      <svg viewBox="0 0 ${width} 190" role="img" aria-label="数组指针演示图">
        <defs>
          <marker id="arrow-head" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
            <path d="M0,0 L12,6 L0,12 z" fill="#3e7cff"></path>
          </marker>
        </defs>
        ${bracket}
        ${cells}
        ${topPointers}
        ${bottomPointers}
      </svg>
      ${footer}
    </div>
  `;
}

export { escapeHtml, svgNodeMarkup, svgEdgeMarkup, svgNodeStageMarkup, svgArrayStageMarkup };
