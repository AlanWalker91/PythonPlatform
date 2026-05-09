import { lessons } from '../data/lessons.js';
import { lessonPractices, extraPracticeSets } from '../data/practices.js';
const state = {
  currentLessonId: lessons[0].id,
  activeExampleIndex: 0,
  activeApproachId: lessons[0].examples[0].approaches[0].id,
  activePracticeIdByLesson: {},
  activeResultTabByPractice: {},
  selectedSubmissionId: null,
  practiceSplitRatio: 0.64,
  editorTheme: "dark",
  visualTimer: null,
  visualState: {},
  practiceCode: {},
  practiceResult: {},
  learning: {
    completedLessons: {},
    attemptsByLesson: {},
    wrongLessons: {},
    submissionHistory: [],
    lastLessonId: lessons[0].id
  }
};

const STORAGE_KEY = "python-platform-learning-v1";

const refs = {
  lessonList: document.getElementById("lesson-list"),
  courseProgress: document.getElementById("course-progress"),
  courseProgressText: document.getElementById("course-progress-text"),
  learningProfile: document.getElementById("learning-profile"),
  submissionHistory: document.getElementById("submission-history"),
  reviewPanel: document.getElementById("review-panel"),
  heroPath: document.getElementById("hero-path"),
  heroTitle: document.getElementById("hero-title"),
  heroSummary: document.getElementById("hero-summary"),
  metricDuration: document.getElementById("metric-duration"),
  metricDifficulty: document.getElementById("metric-difficulty"),
  metricOutcome: document.getElementById("metric-outcome"),
  roadmapStage: document.getElementById("roadmap-stage"),
  roadmapNext: document.getElementById("roadmap-next"),
  roadmapReview: document.getElementById("roadmap-review"),
  submissionSummary: document.getElementById("submission-summary"),
  submissionFocus: document.getElementById("submission-focus"),
  submissionDetail: document.getElementById("submission-detail"),
  lessonIndex: document.getElementById("lesson-index"),
  lessonTitle: document.getElementById("lesson-title"),
  lessonSubtitle: document.getElementById("lesson-subtitle"),
  lessonSections: document.getElementById("lesson-sections"),
  exampleTabs: document.getElementById("example-tabs"),
  exampleDetail: document.getElementById("example-detail"),
  implementationList: document.getElementById("implementation-list"),
  complexityList: document.getElementById("complexity-list"),
  thinkingList: document.getElementById("thinking-list"),
  templateCode: document.getElementById("template-code"),
  chapterSummary: document.getElementById("chapter-summary"),
  practiceContainer: document.getElementById("practice-container"),
  visualTitle: document.getElementById("visual-title"),
  visualSubtitle: document.getElementById("visual-subtitle"),
  visualContent: document.getElementById("visual-content"),
  codeTitle: document.getElementById("code-title"),
  codeSubtitle: document.getElementById("code-subtitle"),
  codeSwitcher: document.getElementById("code-switcher"),
  codeBlock: document.getElementById("code-block"),
  codeExplanation: document.getElementById("code-explanation"),
  startLessonBtn: document.getElementById("start-lesson-btn"),
  visualCard: document.getElementById("visual-card"),
  homeButton: document.getElementById("home-button"),
  exportProgressBtn: document.getElementById("export-progress-btn"),
  importProgressBtn: document.getElementById("import-progress-btn"),
  resetProgressBtn: document.getElementById("reset-progress-btn"),
  importProgressInput: document.getElementById("import-progress-input")
};

function loadLearningState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state.learning = {
      ...state.learning,
      ...parsed.learning,
      completedLessons: parsed.learning?.completedLessons || {},
      attemptsByLesson: parsed.learning?.attemptsByLesson || {},
      wrongLessons: parsed.learning?.wrongLessons || {},
      submissionHistory: parsed.learning?.submissionHistory || []
    };
    state.practiceCode = parsed.practiceCode || {};
    state.activePracticeIdByLesson = parsed.activePracticeIdByLesson || {};
    state.activeResultTabByPractice = parsed.activeResultTabByPractice || {};
    state.practiceSplitRatio = parsed.practiceSplitRatio || state.practiceSplitRatio;
    state.editorTheme = parsed.editorTheme || state.editorTheme;
    state.currentLessonId = parsed.currentLessonId || state.learning.lastLessonId || state.currentLessonId;
  } catch (error) {
    console.warn("读取学习进度失败，将使用默认状态。", error);
  }
}

function saveLearningState() {
  const payload = {
    currentLessonId: state.currentLessonId,
    activePracticeIdByLesson: state.activePracticeIdByLesson,
    activeResultTabByPractice: state.activeResultTabByPractice,
    practiceSplitRatio: state.practiceSplitRatio,
    editorTheme: state.editorTheme,
    practiceCode: state.practiceCode,
    learning: state.learning
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function getLearningSnapshot() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    currentLessonId: state.currentLessonId,
    practiceCode: state.practiceCode,
    learning: state.learning
  };
}

function downloadLearningSnapshot() {
  const blob = new Blob([JSON.stringify(getLearningSnapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `python-platform-progress-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importLearningSnapshot(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      state.learning = {
        ...state.learning,
        ...parsed.learning,
        completedLessons: parsed.learning?.completedLessons || {},
        attemptsByLesson: parsed.learning?.attemptsByLesson || {},
        wrongLessons: parsed.learning?.wrongLessons || {},
        submissionHistory: parsed.learning?.submissionHistory || []
      };
      state.practiceCode = parsed.practiceCode || {};
      state.currentLessonId = parsed.currentLessonId || lessons[0].id;
      saveLearningState();
      resetVisualState();
      render();
      window.alert("学习进度导入成功，已经刷新到最新状态。");
    } catch (error) {
      window.alert("导入失败：文件格式不正确，请选择由 Python Platform 导出的 JSON 文件。");
      console.warn("导入学习进度失败", error);
    } finally {
      refs.importProgressInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetLearningProgress() {
  const confirmed = window.confirm("确定要清空当前浏览器里的学习进度吗？这会移除完成记录、提交历史和本地代码草稿。");
  if (!confirmed) return;

  state.learning = {
    completedLessons: {},
    attemptsByLesson: {},
    wrongLessons: {},
    submissionHistory: [],
    lastLessonId: lessons[0].id
  };
  state.activePracticeIdByLesson = {};
  state.activeResultTabByPractice = {};
  state.selectedSubmissionId = null;
  state.practiceSplitRatio = 0.64;
  state.editorTheme = "dark";
  state.practiceCode = {};
  state.practiceResult = {};
  state.currentLessonId = lessons[0].id;
  state.activeExampleIndex = 0;
  state.activeApproachId = lessons[0].examples[0].approaches[0].id;
  localStorage.removeItem(STORAGE_KEY);
  saveLearningState();
  resetVisualState();
  render();
}

function getLessonStatus(lessonId) {
  if (state.learning.completedLessons[lessonId]) return "done";
  if (state.learning.wrongLessons[lessonId]) return "review";
  if (state.learning.attemptsByLesson[lessonId]) return "attempted";
  return "new";
}

function getRoadmapStage() {
  const index = lessons.findIndex((lesson) => lesson.id === state.currentLessonId);
  if (index <= 3) return "第 1 阶段：基础数据结构与复杂度";
  if (index <= 7) return "第 2 阶段：查找、扫描与结构扩展";
  if (index <= 12) return "第 3 阶段：搜索、优化与进阶技巧";
  return "第 4 阶段：专题深化与面试综合";
}

function getNextLessonSuggestion() {
  const currentIndex = lessons.findIndex((lesson) => lesson.id === state.currentLessonId);
  const next = lessons[currentIndex + 1];
  if (next) {
    return `建议先完成当前章练习，再进入 ${next.order}. ${next.title}。这样学习节奏会更平滑。`;
  }
  return "主线章节已经全部走完了，建议优先回顾错题本，再按弱项做二刷。";
}

function getReviewSuggestion() {
  const wrongIds = Object.keys(state.learning.wrongLessons);
  if (!wrongIds.length) {
    return "当前没有待复习错题。你可以继续主线，或者回头把已完成章节用自己的话复述一遍。";
  }
  const labels = wrongIds
    .slice(0, 3)
    .map((id) => lessons.find((lesson) => lesson.id === id)?.title)
    .filter(Boolean)
    .join("、");
  return `优先回顾：${labels}。建议先看“思路总结与代码模板”，再重新提交实战题。`;
}

function getLessonSubmissionHistory(lessonId) {
  return state.learning.submissionHistory.filter((item) => item.lessonId === lessonId);
}

function getLastSuccessfulSubmission(lessonId) {
  return getLessonSubmissionHistory(lessonId).find((item) => item.passed) || null;
}

function buildCommentedCode(code, context = {}) {
  const lines = code.split("\n");
  const annotated = [];
  const lessonTitle = context.lessonTitle || "当前专题";
  const approachLabel = context.approachLabel || "当前解法";
  annotated.push(`# ${lessonTitle} · ${approachLabel}`);
  annotated.push("# 下面是讲解注释版代码，重点帮助你看清“每一步为什么要这么写”。");
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      annotated.push(line);
      return;
    }
    if (index === 0 && trimmed.startsWith("def ")) {
      annotated.push("# 先定义函数入口，明确输入和输出。");
    } else if (trimmed.startsWith("for ")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 遍历候选元素，逐步缩小问题范围。`);
    } else if (trimmed.startsWith("while ")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 持续推进指针或状态，直到循环条件不再满足。`);
    } else if (trimmed.startsWith("if ")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 先判断当前情况，再决定是返回答案还是继续调整状态。`);
    } else if (trimmed.startsWith("elif ")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 前一个条件不成立时，转到下一种分支。`);
    } else if (trimmed.startsWith("else:")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 前面的情况都不满足，走默认处理逻辑。`);
    } else if (trimmed.startsWith("return ")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 返回当前阶段已经得到的结果。`);
    } else if (trimmed.includes("append(") || trimmed.includes("add(")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 把当前元素加入结果或辅助结构，方便后续复用。`);
    } else if (trimmed.includes("left += 1") || trimmed.includes("right -= 1")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 根据当前比较结果收缩区间或移动指针。`);
    } else if (trimmed.includes("dp[")) {
      annotated.push(`${" ".repeat(line.search(/\S|$/))}# 利用已经算过的更小状态，推导当前状态。`);
    }
    annotated.push(line);
  });
  return annotated.join("\n");
}

function buildCodeWalkthrough(code) {
  const steps = [];
  code.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    if (trimmed.startsWith("def ")) {
      steps.push("先定义函数入口，明确这段实现接收什么输入、要返回什么结果。");
    } else if (trimmed.startsWith("for ")) {
      steps.push("这里进入遍历阶段，算法开始系统地枚举候选状态或候选元素。");
    } else if (trimmed.startsWith("while ")) {
      steps.push("这里进入持续推进阶段，通常意味着指针移动、区间收缩或状态循环更新。");
    } else if (trimmed.startsWith("if ")) {
      steps.push("这里是关键判断点，用来区分当前情况应该直接命中、更新答案还是继续搜索。");
    } else if (trimmed.startsWith("return ")) {
      steps.push("这里返回当前阶段已经确认无误的答案，说明主流程在这里收口。");
    } else if (trimmed.includes("append(") || trimmed.includes("add(")) {
      steps.push("这里把当前信息存进辅助结构，方便后面的步骤直接复用。");
    } else if (trimmed.includes("left += 1") || trimmed.includes("right -= 1")) {
      steps.push("这里在根据比较结果移动边界或指针，本质上是在缩小搜索空间。");
    } else if (trimmed.includes("dp[")) {
      steps.push("这里在做状态转移，把更小子问题的答案组合成当前状态。");
    }
  });
  return [...new Set(steps)].slice(0, 6);
}

const lessonPractices = {
  complexity: {
    title: "实战练习：判断数组中是否存在两数之和",
    difficulty: "简单",
    prompt: "实现 `has_pair_sum(nums, target)`，如果数组中存在两个不同位置的数字之和等于 `target`，返回 `True`，否则返回 `False`。",
    signature: "def has_pair_sum(nums, target):",
    starterCode: `def has_pair_sum(nums, target):
    # TODO: 在这里写你的代码
    pass
`,
    hints: [
      "先想最直接的双重循环写法，再思考瓶颈在哪里。",
      "如果你发现慢在“重复查找另一个数”，就可以考虑 set。"
    ],
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: true },
      { input: [[1, 2, 3, 4], 8], expected: false },
      { input: [[3, 3], 6], expected: true }
    ],
    functionName: "has_pair_sum"
  },
  "array-list": {
    title: "实战练习：移动零",
    difficulty: "简单",
    prompt: "实现 `move_zeroes(nums)`，原地把所有 0 移到数组末尾，并保持非零元素相对顺序不变。返回修改后的 `nums`。",
    signature: "def move_zeroes(nums):",
    starterCode: `def move_zeroes(nums):
    # TODO: 原地修改 nums，并返回 nums
    return nums
`,
    hints: [
      "如果允许额外空间，可以先收集非零元素。",
      "如果想做得更像面试答案，试试双指针原地覆盖。"
    ],
    tests: [
      { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { input: [[0]], expected: [0] },
      { input: [[4, 1, 2]], expected: [4, 1, 2] }
    ],
    functionName: "move_zeroes"
  },
  "linked-list": {
    title: "实战练习：反转链表值序列",
    difficulty: "简单",
    prompt: "为了先训练思路，这里把链表输入简化为 Python 列表。实现 `reverse_values(values)`，返回反转后的新列表。",
    signature: "def reverse_values(values):",
    starterCode: `def reverse_values(values):
    # TODO: 返回反转后的列表
    return values
`,
    hints: [
      "真实链表题考的是改指针；这里先练“从后往前”的思路。",
      "你可以先用双指针或切片，再去对照链表三指针模板。"
    ],
    tests: [
      { input: [[1, 2, 3, 4]], expected: [4, 3, 2, 1] },
      { input: [[1]], expected: [1] },
      { input: [[]], expected: [] }
    ],
    functionName: "reverse_values"
  },
  "stack-queue": {
    title: "实战练习：有效括号",
    difficulty: "简单",
    prompt: "实现 `is_valid(s)`，判断字符串中的括号是否有效匹配。",
    signature: "def is_valid(s):",
    starterCode: `def is_valid(s):
    # TODO: 返回 True 或 False
    return False
`,
    hints: [
      "只要题目问“最近一个没匹配的左括号”，就要想到栈。",
      "可以先建立右括号到左括号的映射表。"
    ],
    tests: [
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["({[]})"], expected: true }
    ],
    functionName: "is_valid"
  },
  "binary-search": {
    title: "实战练习：搜索插入位置",
    difficulty: "简单",
    prompt: "实现 `search_insert(nums, target)`，返回 `target` 在升序数组中的位置；如果不存在，返回应插入的位置。",
    signature: "def search_insert(nums, target):",
    starterCode: `def search_insert(nums, target):
    # TODO: 使用二分查找
    return 0
`,
    hints: [
      "如果你用顺序扫描能做出来，再问自己：题目为什么强调“升序”？",
      "这题本质上是在找第一个大于等于 target 的位置。"
    ],
    tests: [
      { input: [[1, 3, 5, 6], 5], expected: 2 },
      { input: [[1, 3, 5, 6], 2], expected: 1 },
      { input: [[1, 3, 5, 6], 7], expected: 4 }
    ],
    functionName: "search_insert"
  },
  "hash-table": {
    title: "实战练习：有效的字母异位词",
    difficulty: "简单",
    prompt: "实现 `is_anagram(s, t)`，判断两个字符串是否互为字母异位词。",
    signature: "def is_anagram(s, t):",
    starterCode: `def is_anagram(s, t):
    # TODO: 返回 True 或 False
    return False
`,
    hints: [
      "这题可以先排序做，再思考是否能用哈希计数优化到 O(n)。",
      "字符题里，“出现次数是否一致”是一个强烈信号。"
    ],
    tests: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["aacc", "ccac"], expected: false }
    ],
    functionName: "is_anagram"
  },
  tree: {
    title: "实战练习：二叉树最大深度",
    difficulty: "简单",
    prompt: "为了先专注算法思路，这里把二叉树输入简化成层序数组，其中 `null` 表示空节点。实现 `max_depth_level(values)`，返回树的最大深度。",
    signature: "def max_depth_level(values):",
    starterCode: `def max_depth_level(values):
    # TODO: values 例如 [3, 9, 20, None, None, 15, 7]
    # 返回最大深度
    return 0
`,
    hints: [
      "你可以先按层序把每层节点数算出来。",
      "如果愿意，也可以先把数组想象成树，再用队列按层推进。"
    ],
    tests: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { input: [[1, null, 2]], expected: 2 },
      { input: [[]], expected: 0 }
    ],
    functionName: "max_depth_level"
  },
  heap: {
    title: "实战练习：数组中的第 K 大元素",
    difficulty: "中等",
    prompt: "实现 `find_kth_largest(nums, k)`，返回数组中的第 k 大元素。",
    signature: "def find_kth_largest(nums, k):",
    starterCode: `def find_kth_largest(nums, k):
    # TODO: 可以先排序做，再尝试用堆优化
    return 0
`,
    hints: [
      "如果想先过样例，排序后取倒数第 k 个是最直接做法。",
      "如果想更接近面试优化答案，考虑固定大小为 k 的小顶堆。"
    ],
    tests: [
      { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { input: [[1], 1], expected: 1 }
    ],
    functionName: "find_kth_largest"
  },
  "graph-bfs-dfs": {
    title: "实战练习：岛屿数量",
    difficulty: "中等",
    prompt: "实现 `num_islands(grid)`，返回网格中岛屿的数量。网格中 `'1'` 表示陆地，`'0'` 表示水域。",
    signature: "def num_islands(grid):",
    starterCode: `def num_islands(grid):
    # TODO: 使用 DFS 或 BFS 统计岛屿数量
    return 0
`,
    hints: [
      "每找到一块新陆地，都要把整块连通区域一次性标记掉。",
      "网格题常常可以把上下左右四个方向看成图的边。"
    ],
    tests: [
      { input: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]], expected: 3 },
      { input: [[["1","1","1"],["0","1","0"],["1","1","1"]]], expected: 1 },
      { input: [[["0","0"],["0","0"]]], expected: 0 }
    ],
    functionName: "num_islands"
  },
  "two-pointers": {
    title: "实战练习：两数之和 II",
    difficulty: "简单",
    prompt: "实现 `two_sum_sorted(numbers, target)`，在升序数组中返回两数之和等于 target 的两个 1-based 下标。",
    signature: "def two_sum_sorted(numbers, target):",
    starterCode: `def two_sum_sorted(numbers, target):
    # TODO: 使用相向双指针
    return []
`,
    hints: [
      "当前和太小，就让左指针右移；当前和太大，就让右指针左移。",
      "这题重点不只是写出来，还要解释为什么不会漏解。"
    ],
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { input: [[2, 3, 4], 6], expected: [1, 3] },
      { input: [[-1, 0], -1], expected: [1, 2] }
    ],
    functionName: "two_sum_sorted"
  },
  "sliding-window": {
    title: "实战练习：无重复字符的最长子串",
    difficulty: "中等",
    prompt: "实现 `length_of_longest_substring(s)`，返回不含重复字符的最长子串长度。",
    signature: "def length_of_longest_substring(s):",
    starterCode: `def length_of_longest_substring(s):
    # TODO: 使用滑动窗口
    return 0
`,
    hints: [
      "右指针负责扩张，遇到重复字符时左指针持续收缩。",
      "可以用 set 维护当前窗口中的字符。"
    ],
    tests: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 }
    ],
    functionName: "length_of_longest_substring"
  },
  backtracking: {
    title: "实战练习：全排列",
    difficulty: "中等",
    prompt: "实现 `permute(nums)`，返回数组的所有全排列。结果顺序不要求固定。",
    signature: "def permute(nums):",
    starterCode: `def permute(nums):
    # TODO: 使用回溯
    return []
`,
    hints: [
      "路径里放当前已经选择的数字。",
      "每层递归都从还没使用过的数字里继续选。"
    ],
    tests: [
      { input: [[1, 2, 3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { input: [[0, 1]], expected: [[0,1],[1,0]] },
      { input: [[1]], expected: [[1]] }
    ],
    functionName: "permute"
  },
  "dynamic-programming": {
    title: "实战练习：打家劫舍",
    difficulty: "中等",
    prompt: "实现 `rob(nums)`，返回在不能偷相邻房屋的前提下，最多能偷到多少钱。",
    signature: "def rob(nums):",
    starterCode: `def rob(nums):
    # TODO: 使用动态规划
    return 0
`,
    hints: [
      "想想当前房子有哪两种选择：偷或不偷。",
      "先定义 dp[i] 表示什么，再写转移。"
    ],
    tests: [
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[2, 7, 9, 3, 1]], expected: 12 },
      { input: [[2, 1, 1, 2]], expected: 4 }
    ],
    functionName: "rob"
  },
  greedy: {
    title: "实战练习：跳跃游戏",
    difficulty: "中等",
    prompt: "实现 `can_jump(nums)`，判断是否能从数组起点跳到终点。",
    signature: "def can_jump(nums):",
    starterCode: `def can_jump(nums):
    # TODO: 使用贪心维护最远可达位置
    return False
`,
    hints: ["维护一个当前最远可达下标。", "如果当前位置已经超过最远可达范围，就可以直接返回 False。"],
    tests: [
      { input: [[2,3,1,1,4]], expected: true },
      { input: [[3,2,1,0,4]], expected: false },
      { input: [[0]], expected: true }
    ],
    functionName: "can_jump"
  },
  "prefix-diff": {
    title: "实战练习：和为 K 的子数组",
    difficulty: "中等",
    prompt: "实现 `subarray_sum(nums, k)`，返回和为 k 的连续子数组个数。",
    signature: "def subarray_sum(nums, k):",
    starterCode: `def subarray_sum(nums, k):
    # TODO: 使用前缀和 + 哈希
    return 0
`,
    hints: ["当前前缀和如果是 prefix，那么只要之前出现过 prefix-k，就找到了新的区间。", "别忘了初始化 seen[0] = 1。"],
    tests: [
      { input: [[1,1,1], 2], expected: 2 },
      { input: [[1,2,3], 3], expected: 2 },
      { input: [[1,-1,0], 0], expected: 3 }
    ],
    functionName: "subarray_sum"
  },
  monotonic: {
    title: "实战练习：下一个更大元素",
    difficulty: "中等",
    prompt: "实现 `next_greater(nums)`，返回每个位置右侧第一个更大的元素，不存在则返回 -1。",
    signature: "def next_greater(nums):",
    starterCode: `def next_greater(nums):
    # TODO: 使用单调栈
    return []
`,
    hints: ["栈里通常存下标，而不是直接存值。", "当新值更大时，弹出的旧下标正好确定答案。"],
    tests: [
      { input: [[2,1,2,4,3]], expected: [4,2,4,-1,-1] },
      { input: [[1,3,4,2]], expected: [3,4,-1,-1] },
      { input: [[5]], expected: [-1] }
    ],
    functionName: "next_greater"
  },
  "advanced-structures": {
    title: "实战练习：实现 Trie 前缀判断",
    difficulty: "中等",
    prompt: "实现 `starts_with(words, prefix)`，其中 `words` 是词典列表。请返回是否存在某个单词以 `prefix` 开头。",
    signature: "def starts_with(words, prefix):",
    starterCode: `def starts_with(words, prefix):
    # TODO: 可以先暴力做，再思考 Trie
    return False
`,
    hints: ["如果你先想快速过样例，暴力 `startswith` 是可以的。", "如果要更贴近章节主题，就思考 Trie 如何共享前缀路径。"],
    tests: [
      { input: [[["apple", "app", "banana"], "app"]], expected: true },
      { input: [[["cat", "dog"], "cae"]], expected: false },
      { input: [[["trie", "tree"], "tr"]], expected: true }
    ],
    functionName: "starts_with"
  }
};

const extraPracticeSets = {
  complexity: [
    {
      id: "find-target-index",
      title: "进阶练习：有序数组中查找目标下标",
      difficulty: "简单",
      prompt: "实现 `find_target_index(nums, target)`，在升序数组中返回 `target` 的下标，不存在返回 `-1`。",
      signature: "def find_target_index(nums, target):",
      starterCode: `def find_target_index(nums, target):
    # TODO: 用有序数组的特征优化查找
    pass
`,
      hints: ["先写线性查找，再思考“有序”意味着什么。", "如果每次都能排除一半区间，就能把复杂度降到 O(log n)。"],
      tests: [
        { input: [[1, 3, 5, 7, 9], 7], expected: 3 },
        { input: [[2, 4, 6, 8], 5], expected: -1 }
      ],
      hiddenTests: [{ input: [[1], 1], expected: 0 }],
      functionName: "find_target_index"
    }
  ],
  "binary-search": [
    {
      id: "first-ge",
      title: "进阶练习：寻找第一个大于等于目标值的位置",
      difficulty: "简单",
      prompt: "实现 `first_ge(nums, target)`，返回数组中第一个大于等于 `target` 的下标，不存在返回 `len(nums)`。",
      signature: "def first_ge(nums, target):",
      starterCode: `def first_ge(nums, target):
    # TODO: 使用二分找到左边界
    pass
`,
      hints: ["这题本质上是左边界二分。", "即使没有命中 target，也要记录候选答案。"],
      tests: [
        { input: [[1, 2, 4, 4, 5], 4], expected: 2 },
        { input: [[1, 3, 5], 6], expected: 3 }
      ],
      hiddenTests: [{ input: [[2, 2, 2], 2], expected: 0 }],
      functionName: "first_ge"
    }
  ],
  "graph-bfs-dfs": [
    {
      id: "shortest-path-grid",
      title: "进阶练习：网格最短步数",
      difficulty: "中等",
      prompt: "实现 `min_steps(grid)`，从左上角走到右下角，0 表示可走，1 表示障碍，返回最短步数，不可达返回 -1。",
      signature: "def min_steps(grid):",
      starterCode: `from collections import deque

def min_steps(grid):
    # TODO: 使用 BFS 按层扩散
    pass
`,
      hints: ["最短步数看到无权图，优先想到 BFS。", "队列里可以同时记录位置和当前步数。"],
      tests: [
        { input: [[[[0, 0], [1, 0]]]], expected: 2 },
        { input: [[[[0, 1], [1, 0]]]], expected: -1 }
      ],
      hiddenTests: [{ input: [[[[0, 0, 0], [1, 1, 0], [0, 0, 0]]]], expected: 4 }],
      functionName: "min_steps"
    }
  ],
  "dynamic-programming": [
    {
      id: "climb-stairs",
      title: "进阶练习：爬楼梯",
      difficulty: "简单",
      prompt: "实现 `climb_stairs(n)`，每次可以爬 1 或 2 阶，返回到达第 `n` 阶的方法数。",
      signature: "def climb_stairs(n):",
      starterCode: `def climb_stairs(n):
    # TODO: 写出状态定义和状态转移
    pass
`,
      hints: ["dp[i] 表示到达第 i 阶的方法数。", "想清楚 dp[i] 和更小状态的关系。"],
      tests: [
        { input: [2], expected: 2 },
        { input: [5], expected: 8 }
      ],
      hiddenTests: [{ input: [1], expected: 1 }],
      functionName: "climb_stairs"
    }
  ]
};

function getPracticeSet(lessonId) {
  const base = lessonPractices[lessonId];
  const normalized = (Array.isArray(base) ? base : [{ id: "core", ...base }]).map((practice) => ({
    hiddenTests: [],
    ...practice
  }));
  return [...normalized, ...(extraPracticeSets[lessonId] || [])];
}

function getActivePractice(lessonId = state.currentLessonId) {
  const set = getPracticeSet(lessonId);
  const activeId = state.activePracticeIdByLesson[lessonId] || set[0].id;
  return set.find((item) => item.id === activeId) || set[0];
}

function getCurrentLesson() {
  return lessons.find((lesson) => lesson.id === state.currentLessonId);
}

function getCurrentExample() {
  return getCurrentLesson().examples[state.activeExampleIndex];
}

function getCurrentApproach() {
  const example = getCurrentExample();
  return example.approaches.find((item) => item.id === state.activeApproachId) || example.approaches[0];
}

function clearVisualTimer() {
  if (state.visualTimer) {
    clearInterval(state.visualTimer);
    state.visualTimer = null;
  }
}

function resetVisualState() {
  clearVisualTimer();
  const type = getCurrentLesson().visual.type;
  const initial = {
    complexity: { n: 18, traceIndex: -1, data: [4, 7, 1, 9, 3, 11, 15, 18], targetIndex: 6 },
    array: { operation: "headInsert", step: 0 },
    linked: { step: 0 },
    stackqueue: { mode: "stack", step: 0 },
    binary: { step: 0 },
    hash: { step: 0 },
    tree: { mode: "preorder", step: 0 },
    heap: { step: 0 },
    graph: { mode: "bfs", step: 0 },
    twopointers: { mode: "towards", step: 0 },
    window: { step: 0 },
    backtracking: { step: 0 },
    dp: { step: 0 },
    greedy: { step: 0 },
    prefix: { step: 0 },
    monotonic: { step: 0 },
    advancedstruct: { mode: "union", step: 0 }
  };
  state.visualState = initial[type] || {};
}

export {
  STORAGE_KEY,
  refs,
  state,
  loadLearningState,
  saveLearningState,
  getLearningSnapshot,
  downloadLearningSnapshot,
  importLearningSnapshot,
  resetLearningProgress,
  getLessonStatus,
  getRoadmapStage,
  getNextLessonSuggestion,
  getReviewSuggestion,
  getLessonSubmissionHistory,
  getLastSuccessfulSubmission,
  buildCommentedCode,
  buildCodeWalkthrough,
  getPracticeSet,
  getActivePractice,
  getCurrentLesson,
  getCurrentExample,
  getCurrentApproach,
  clearVisualTimer,
  resetVisualState
};
