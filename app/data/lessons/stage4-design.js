const stage4Lessons = [
  {
    "id": "backtracking",
    "order": "12",
    "title": "回溯",
    "subtitle": "在搜索树里试、退、再试",
    "heroSummary": "回溯适合解决‘列出所有可能、在约束下搜索合法方案’的问题。它的核心不是暴力，而是在搜索过程中及时剪枝。",
    "path": "面试导向系统课",
    "duration": "32 min",
    "difficulty": "中等",
    "outcome": "搜索树与剪枝意识",
    "visualTitle": "回溯搜索树演示",
    "visualSubtitle": "看路径如何扩展、回退，再体会剪枝为什么能大幅减少无效搜索。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有些题必须尝试多种可能",
        "body": "当问题要求你找所有组合、所有排列、所有合法路径时，往往没有一种直接公式能一步算出来。你必须在决策树里不断尝试，每走一步就记录状态，走不通就退回来换别的路。",
        "bullets": [
          "回溯适合全排列、组合、子集、棋盘搜索等问题",
          "它本质上是在一棵隐式搜索树上做 DFS",
          "剪枝决定了回溯题能不能从“暴力”变成“可用”"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人会写出回溯模板，却不会剪枝",
        "body": "因为只记住了‘选 / 递归 / 撤销选择’三步，却没有想明白：什么情况下这条路径已经不可能成为答案，可以提前停掉。",
        "bullets": [
          "路径、选择列表、结束条件经常分不清",
          "没有剪枝时搜索量会非常大",
          "同层去重和树枝去重容易混淆"
        ],
        "keyLine": "回溯不是盲搜，而是边搜索边排除不可能。"
      },
      {
        "label": "核心思想",
        "title": "做选择、递归下探、撤销选择",
        "body": "回溯的通用框架是：当前路径先尝试一个选择，递归到下一层；递归回来后撤销这个选择，再尝试下一个。你可以把它想成在搜索树里不断试路和退路。",
        "bullets": [
          "路径：当前已经做出的选择",
          "选择列表：当前还能选什么",
          "结束条件：什么时候得到一个完整答案"
        ]
      }
    ],
    "examples": [
      {
        "title": "全排列",
        "pattern": "路径构建",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定一个不含重复数字的数组，返回所有可能的全排列。",
        "whyAsk": "这是回溯最标准的模板题，几乎所有回溯学习都从这里开始。",
        "approaches": [
          {
            "id": "manual-enumerate",
            "label": "手动分类枚举",
            "summary": "按位置人工拆情况，逐层写死。",
            "complexity": "不可扩展",
            "explanation": "规模小的时候能硬写，但一旦输入长度变化就完全不可维护。",
            "code": "def permute(nums):\n    if len(nums) == 1:\n        return [nums[:]]\n    return []"
          },
          {
            "id": "backtrack-perm",
            "label": "回溯生成",
            "summary": "每一层选择一个还没使用过的数字加入路径，直到路径长度等于数组长度。",
            "complexity": "时间 O(n * n!) · 空间 O(n)",
            "explanation": "全排列本身答案量就是 n!，所以重点不在避免所有搜索，而在于写出清晰正确的生成过程。",
            "code": "def permute_fast(nums):\n    result = []\n    path = []\n    used = [False] * len(nums)\n\n    def backtrack():\n        if len(path) == len(nums):\n            result.append(path[:])\n            return\n\n        for i in range(len(nums)):\n            if used[i]:\n                continue\n\n            path.append(nums[i])\n            used[i] = True\n            backtrack()\n            used[i] = False\n            path.pop()\n\n    backtrack()\n    return result"
          }
        ],
        "takeaway": [
          "路径、used 数组、撤销选择是全排列模板核心",
          "回溯题经常需要复制路径，而不是直接引用",
          "结束条件往往就是路径长度达到要求"
        ]
      },
      {
        "title": "组合总和",
        "pattern": "可重复选择 + 剪枝",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定无重复元素数组 candidates 和目标值 target，找出所有和为 target 的组合。",
        "whyAsk": "这题很适合讲清楚剪枝和‘同一层从哪个位置继续选’。",
        "approaches": [
          {
            "id": "all-combos",
            "label": "先列大量组合再过滤",
            "summary": "粗暴生成很多可能，再筛掉和不对的。",
            "complexity": "搜索量极大",
            "explanation": "没有剪枝时，搜索树会长得很快，效率差且不易控制。",
            "code": "def combination_sum(candidates, target):\n    return []"
          },
          {
            "id": "backtrack-sum",
            "label": "回溯 + 剪枝",
            "summary": "路径和超过 target 时立刻停止，递归时从当前下标继续选，允许重复使用元素。",
            "complexity": "取决于搜索树规模",
            "explanation": "这题的关键是把‘和超过 target’当作剪枝条件，而不是等搜完再说。",
            "code": "def combination_sum_fast(candidates, target):\n    result = []\n    path = []\n\n    def backtrack(start, total):\n        if total == target:\n            result.append(path[:])\n            return\n        if total > target:\n            return\n\n        for i in range(start, len(candidates)):\n            path.append(candidates[i])\n            backtrack(i, total + candidates[i])\n            path.pop()\n\n    backtrack(0, 0)\n    return result"
          }
        ],
        "takeaway": [
          "剪枝是回溯题效率的关键",
          "start 参数常用来控制组合问题的选择范围",
          "组合和排列的区别，往往就在是否重排和是否回头选"
        ]
      },
      {
        "title": "子集",
        "pattern": "选或不选",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "返回一个数组的所有子集。",
        "whyAsk": "这题特别适合建立‘每个元素都有选 / 不选两种决策’的搜索树画面。",
        "approaches": [
          {
            "id": "bitmask",
            "label": "位运算枚举",
            "summary": "用二进制掩码表示选和不选。",
            "complexity": "时间 O(n * 2^n) · 空间 O(n)",
            "explanation": "位运算法很好，但它不一定最直观，不利于初学者建立回溯树直觉。",
            "code": "def subsets(nums):\n    result = []\n    n = len(nums)\n\n    for mask in range(1 << n):\n        subset = []\n        for i in range(n):\n            if mask & (1 << i):\n                subset.append(nums[i])\n        result.append(subset)\n\n    return result"
          },
          {
            "id": "backtrack-subset",
            "label": "回溯生成子集",
            "summary": "每到一个位置，都把当前路径记录为一个子集，再继续向后选择。",
            "complexity": "时间 O(n * 2^n) · 空间 O(n)",
            "explanation": "子集题非常适合训练‘每一层从当前位置往后选’的感觉。",
            "code": "def subsets_fast(nums):\n    result = []\n    path = []\n\n    def backtrack(start):\n        result.append(path[:])\n\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1)\n            path.pop()\n\n    backtrack(0)\n    return result"
          }
        ],
        "takeaway": [
          "子集题很适合练‘路径本身就是答案’这种结束时机",
          "组合类问题常用 start 控制往后选",
          "回溯不一定只有一个最终终点，有时中途每层都是答案"
        ]
      }
    ],
    "implementation": [
      "先画出搜索树，明确路径、选择列表和结束条件",
      "写回溯时形成固定节奏：做选择 -> 递归 -> 撤销选择",
      "优先找剪枝条件，它往往决定这题是否可做"
    ],
    "complexityNotes": [
      "回溯题复杂度通常由搜索树规模决定，常见指数级",
      "空间复杂度常与递归深度和路径长度相关",
      "剪枝不能改变最坏上界太多，但能极大优化实际运行"
    ],
    "applications": [
      "排班、路径规划、约束求解、棋盘搜索都常用回溯",
      "配置组合生成、权限方案枚举、规则匹配等场景也有回溯影子",
      "回溯是理解搜索、剪枝、约束传播的重要基础"
    ],
    "summary": "回溯的本质不是暴力乱试，而是在搜索树里有策略地试、退、再试。",
    "quiz": [],
    "visual": {
      "type": "backtracking"
    }
  },
  {
    "id": "dynamic-programming",
    "order": "13",
    "title": "动态规划",
    "subtitle": "把重叠子问题的答案存下来",
    "heroSummary": "动态规划并不神秘，它是在问：这个问题能不能拆成更小的问题，而且这些小问题会不会反复出现？如果会，就把答案存下来别再重复算。",
    "path": "面试导向系统课",
    "duration": "36 min",
    "difficulty": "中等",
    "outcome": "状态定义能力",
    "visualTitle": "DP 状态转移演示",
    "visualSubtitle": "看状态如何从前面的结果一步步推到后面的答案，理解‘转移方程’到底在说什么。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有些递归会慢到无法接受",
        "body": "如果一个大问题不断拆成相同的小问题，而你每次都重新算一遍，就会产生巨大重复工作。动态规划就是针对这类“重叠子问题”设计的优化方法。",
        "bullets": [
          "DP 常处理最优值、计数、可达性问题",
          "它本质上是在复用子问题答案",
          "状态定义比代码技巧更重要"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人觉得 DP 最抽象",
        "body": "因为大家往往只背题型，不练状态定义。其实 DP 最核心的问题只有两个：状态是什么？状态之间怎么转移？",
        "bullets": [
          "不会定义 dp[i] / dp[i][j] 的含义",
          "分不清初始化和转移方程谁先谁后",
          "看懂答案后，自己仍然写不出来"
        ],
        "keyLine": "动态规划的灵魂不是表格，而是状态含义和转移关系。"
      },
      {
        "label": "核心思想",
        "title": "先定义状态，再写转移，再定初始化",
        "body": "做 DP 时，不要一上来就写循环。先用一句话定义状态，再问当前状态能由哪些更小状态得到，最后再想初始条件和遍历顺序。",
        "bullets": [
          "状态：dp[i] 到底表示什么",
          "转移：当前答案和哪些过去答案有关",
          "初始化：最小规模问题的答案是什么"
        ]
      }
    ],
    "examples": [
      {
        "title": "爬楼梯",
        "pattern": "一维 DP 入门",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "每次可以爬 1 阶或 2 阶，求到第 n 阶有多少种方法。",
        "whyAsk": "这题是动态规划最经典的入门题，非常适合建立‘状态转移’直觉。",
        "approaches": [
          {
            "id": "naive-rec",
            "label": "朴素递归",
            "summary": "每次尝试从 n-1 阶和 n-2 阶走到当前阶。",
            "complexity": "时间 O(2^n) · 空间 O(n)",
            "explanation": "会反复计算相同的子问题，例如 f(3)、f(4) 等。",
            "code": "def climb_stairs(n):\n    if n <= 2:\n        return n\n\n    return climb_stairs(n - 1) + climb_stairs(n - 2)"
          },
          {
            "id": "dp-steps",
            "label": "动态规划",
            "summary": "dp[i] 表示到第 i 阶的方法数，转移来自前两阶。",
            "complexity": "时间 O(n) · 空间 O(n) 或 O(1)",
            "explanation": "关键不在公式像斐波那契，而在于你能用状态语义把它讲清楚。",
            "code": "def climb_stairs_fast(n):\n    if n <= 2:\n        return n\n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    dp[2] = 2\n\n    for i in range(3, n + 1):\n        dp[i] = dp[i - 1] + dp[i - 2]\n\n    return dp[n]"
          }
        ],
        "takeaway": [
          "DP 入门题先练状态定义：dp[i] 是什么",
          "重叠子问题是从递归转 DP 的强信号",
          "很多一维 DP 都可以做空间压缩"
        ]
      },
      {
        "title": "打家劫舍",
        "pattern": "相邻约束最优值",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "不能偷相邻房屋，求能偷到的最大金额。",
        "whyAsk": "这题非常适合训练‘当前最优由前面哪几个状态决定’的思维。",
        "approaches": [
          {
            "id": "search-all",
            "label": "暴力枚举偷法",
            "summary": "尝试偷或不偷每间房，递归搜索所有方案。",
            "complexity": "时间指数级",
            "explanation": "能表达问题，但存在大量重复子问题。",
            "code": "def rob(nums):\n    def dfs(i):\n        if i >= len(nums):\n            return 0\n\n        return max(dfs(i + 1), nums[i] + dfs(i + 2))\n\n    return dfs(0)"
          },
          {
            "id": "dp-rob",
            "label": "一维 DP",
            "summary": "dp[i] 表示考虑到第 i 间房时的最大收益。",
            "complexity": "时间 O(n) · 空间 O(n) 或 O(1)",
            "explanation": "当前房子要么偷，要么不偷，所以转移来自两种选择中的较大值。",
            "code": "def rob_fast(nums):\n    if not nums:\n        return 0\n    if len(nums) == 1:\n        return nums[0]\n\n    dp = [0] * len(nums)\n    dp[0] = nums[0]\n    dp[1] = max(nums[0], nums[1])\n\n    for i in range(2, len(nums)):\n        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])\n\n    return dp[-1]"
          }
        ],
        "takeaway": [
          "很多最优值题都可以从‘选 / 不选当前项’入手",
          "状态转移经常来源于互斥选择",
          "面试里讲清楚‘为什么是 max(dp[i-1], dp[i-2] + nums[i])’非常重要"
        ]
      },
      {
        "title": "最长递增子序列",
        "pattern": "序列型 DP",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "返回数组的最长严格递增子序列长度。",
        "whyAsk": "这题很经典，因为它要求你定义‘以某个位置结尾’的状态语义。",
        "approaches": [
          {
            "id": "all-subseq",
            "label": "枚举所有子序列",
            "summary": "尝试所有子序列，再找最长递增长度。",
            "complexity": "时间指数级",
            "explanation": "理论上能做，但完全不可扩展。",
            "code": "def length_of_lis(nums):\n    return 0"
          },
          {
            "id": "dp-lis",
            "label": "O(n²) 动态规划",
            "summary": "dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。",
            "complexity": "时间 O(n²) · 空间 O(n)",
            "explanation": "这题的状态定义特别重要：一旦定义成‘以 i 结尾’，转移关系就会自然很多。",
            "code": "def length_of_lis_fast(nums):\n    if not nums:\n        return 0\n\n    dp = [1] * len(nums)\n\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n\n    return max(dp)"
          }
        ],
        "takeaway": [
          "状态定义一变，题目难度感受也会变",
          "‘以 i 结尾’是序列 DP 中很常见的定义方式",
          "先学会 O(n²) 版本，再谈更快优化"
        ]
      }
    ],
    "implementation": [
      "先问自己：这题能不能拆成更小的同类问题",
      "用一句话精确定义状态含义，再写转移关系",
      "最后补初始化、遍历顺序和是否需要空间压缩"
    ],
    "complexityNotes": [
      "DP 复杂度通常取决于状态数量和每个状态的转移成本",
      "很多一维 DP 是 O(n)，很多区间/序列 DP 可能达到 O(n²)",
      "空间压缩能优化内存，但前提是你已经彻底理解状态转移"
    ],
    "applications": [
      "资源分配、路径最优、调度最优、概率决策都有 DP 影子",
      "推荐系统、金融策略、规划问题里经常要做最优值转移",
      "动态规划训练的是拆问题和定义状态的能力，这对系统设计也有帮助"
    ],
    "summary": "动态规划真正难的不是代码，而是你能不能把问题拆成正确的状态和转移。",
    "quiz": [],
    "visual": {
      "type": "dp"
    }
  }
];

const stage4Templates = {
  "backtracking": "# 回溯模板\npath = []\nresult = []\ndef backtrack(start):\n    if 达到结束条件:\n        result.append(path[:])\n        return\n    for i in range(start, len(nums)):\n        做选择\n        backtrack(下一层参数)\n        撤销选择",
  "dynamic-programming": "# 一维 DP 模板\ndp = [初始值] * (n + 1)\n写好 base case\nfor i in range(起点, 终点):\n    dp[i] = 根据更小状态转移\nreturn dp[目标状态]"
};

export { stage4Lessons, stage4Templates };
