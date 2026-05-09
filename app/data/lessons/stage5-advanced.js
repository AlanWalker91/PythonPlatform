const stage5Lessons = [
  {
    "id": "greedy",
    "order": "14",
    "title": "贪心",
    "subtitle": "每一步先做当前最优选择",
    "heroSummary": "贪心不是盲目选最大的或最小的，而是证明‘当前最优决策不会妨碍全局最优’。很多区间、调度、跳跃问题都离不开它。",
    "path": "面试导向系统课",
    "duration": "26 min",
    "difficulty": "中等",
    "outcome": "局部最优意识",
    "visualTitle": "贪心选择过程演示",
    "visualSubtitle": "看每一步如何只根据当前最优标准做决策，并持续推进到答案。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有些题不需要回头看",
        "body": "如果当前做出的最优选择不会破坏未来更优解，就可以用贪心一步步推进，而不必枚举所有方案。",
        "bullets": [
          "常见于区间、调度、跳跃、覆盖类问题",
          "关键在于证明当前选择是安全的",
          "贪心重在决策标准"
        ],
        "keyLine": "贪心的难点不在写代码，而在证明为什么当前选择不会后悔。"
      },
      {
        "label": "核心思想",
        "title": "先定义选择标准，再一路推进",
        "body": "一旦你找到正确的局部选择标准，问题就能转成顺序扫描。",
        "bullets": [
          "先想每一步最该选谁",
          "再想选了以后剩余问题是否同构",
          "最后验证不会漏掉全局最优"
        ]
      }
    ],
    "examples": [
      {
        "title": "分发饼干",
        "pattern": "排序 + 局部匹配",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "让尽可能多的孩子满意，每个孩子有胃口值，每块饼干有尺寸。",
        "whyAsk": "这题很适合建立‘当前最小可满足对象优先处理’的直觉。",
        "approaches": [
          {
            "id": "allmatch",
            "label": "枚举匹配",
            "summary": "尝试不同分配组合。",
            "complexity": "组合爆炸",
            "explanation": "没有必要，因为题目只关心满意人数，不关心具体所有方案。",
            "code": "def find_content_children(g, s):\n    return 0"
          },
          {
            "id": "greedy-sort",
            "label": "排序贪心",
            "summary": "用最小可用饼干满足当前胃口最小的孩子。",
            "complexity": "时间 O(n log n) · 空间 O(1) 或 O(n)",
            "explanation": "这是最经典的资源分配贪心：小资源优先满足小需求，避免浪费。",
            "code": "def find_content_children_fast(g, s):\n    g.sort()\n    s.sort()\n    child = cookie = 0\n\n    while child < len(g) and cookie < len(s):\n        if s[cookie] >= g[child]:\n            child += 1\n        cookie += 1\n\n    return child"
          }
        ],
        "takeaway": [
          "资源分配题常和排序贪心绑定",
          "小资源先满足小需求是高频策略",
          "贪心标准要和目标函数保持一致"
        ]
      },
      {
        "title": "跳跃游戏",
        "pattern": "可达范围维护",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "判断是否能从数组起点跳到终点。",
        "whyAsk": "这题能帮助你理解‘维护当前最远可达位置’这种贪心思路。",
        "approaches": [
          {
            "id": "dfsjump",
            "label": "DFS 搜索",
            "summary": "从每个位置递归尝试所有跳法。",
            "complexity": "时间指数级",
            "explanation": "能表达问题，但重复搜索很多。",
            "code": "def can_jump(nums):\n    return False"
          },
          {
            "id": "reach",
            "label": "最远可达贪心",
            "summary": "遍历时维护当前能到达的最远下标。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "只要当前位置在可达范围内，就继续更新最远可达位置。",
            "code": "def can_jump_fast(nums):\n    farthest = 0\n\n    for i, step in enumerate(nums):\n        if i > farthest:\n            return False\n        farthest = max(farthest, i + step)\n\n    return True"
          }
        ],
        "takeaway": [
          "很多贪心题不是选值，而是维护一个关键范围",
          "一旦当前位置超出可达范围，就可以提前结束",
          "最远可达值是这题的核心状态"
        ]
      },
      {
        "title": "无重叠区间",
        "pattern": "区间结束位置贪心",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "删除最少区间，使剩余区间互不重叠。",
        "whyAsk": "它是区间贪心的标准题型。",
        "approaches": [
          {
            "id": "allremove",
            "label": "枚举删除",
            "summary": "尝试删掉不同区间组合。",
            "complexity": "搜索量极大",
            "explanation": "区间问题通常不需要暴力删组合。",
            "code": "def erase_overlap_intervals(intervals):\n    return 0"
          },
          {
            "id": "endfirst",
            "label": "按结束位置贪心",
            "summary": "优先保留结束更早的区间，为后面留出更多空间。",
            "complexity": "时间 O(n log n) · 空间 O(1)",
            "explanation": "结束越早，越不容易挡住后续区间，这就是贪心标准。",
            "code": "def erase_overlap_intervals_fast(intervals):\n    intervals.sort(key=lambda x: x[1])\n    end = intervals[0][1]\n    count = 0\n\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < end:\n            count += 1\n        else:\n            end = intervals[i][1]\n\n    return count"
          }
        ],
        "takeaway": [
          "区间题高频标准：按结束位置排序",
          "贪心的目标是给未来留下更多空间",
          "这类题很适合练‘为什么当前选择最安全’"
        ]
      }
    ],
    "implementation": [
      "先判断题目是否只关心数量、覆盖、最远可达或资源分配",
      "找出每一步最自然的局部选择标准",
      "必须能解释为什么这个选择不会妨碍全局最优"
    ],
    "complexityNotes": [
      "贪心常搭配排序，所以常见复杂度是 O(n log n)",
      "扫描推进部分通常是 O(n)",
      "证明正确性比复杂度更重要"
    ],
    "applications": [
      "任务调度、资源分配、区间安排、网络覆盖都有贪心思维",
      "很多工程决策并不求绝对最优，而求可解释的局部最优策略",
      "贪心训练的是决策标准抽象能力"
    ],
    "summary": "贪心的关键不是‘先选最大的’，而是找到一个被证明安全的局部选择标准。",
    "quiz": [],
    "visual": {
      "type": "greedy"
    }
  },
  {
    "id": "prefix-diff",
    "order": "15",
    "title": "前缀和与差分",
    "subtitle": "把区间问题变成常数级查询或更新",
    "heroSummary": "前缀和适合快速求区间和，差分适合高效做区间增减。看到大量区间查询或区间更新时，要第一时间想到它们。",
    "path": "面试导向系统课",
    "duration": "28 min",
    "difficulty": "中等",
    "outcome": "区间预处理意识",
    "visualTitle": "前缀和 / 差分变化演示",
    "visualSubtitle": "看原数组、前缀数组、差分数组之间的关系，理解为什么预处理能省掉重复计算。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么区间题不该每次重新累加",
        "body": "如果你要频繁求很多区间和，或者频繁修改很多连续区间，直接每次重算会非常浪费。前缀和和差分就是两类高频预处理技巧。",
        "bullets": [
          "前缀和解决区间查询",
          "差分解决区间更新",
          "两者本质上都是把重复工作前置"
        ]
      },
      {
        "label": "核心思想",
        "title": "预处理一次，后面反复复用",
        "body": "前缀和让区间和变成两个前缀值相减；差分让区间加法变成两个端点操作。",
        "bullets": [
          "query 型问题对前缀和敏感",
          "update 型问题对差分敏感",
          "二维版本也是高频考点"
        ],
        "keyLine": "这类题的关键往往不是复杂算法，而是先把重复计算拿掉。"
      }
    ],
    "examples": [
      {
        "title": "区域和检索",
        "pattern": "一维前缀和",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "多次查询数组区间和。",
        "whyAsk": "前缀和最标准的入门题。",
        "approaches": [
          {
            "id": "sum-each",
            "label": "每次重算",
            "summary": "查询一次就遍历一次区间。",
            "complexity": "单次 O(n)",
            "explanation": "查询多了会很慢。",
            "code": "def sum_range(nums, left, right):\n    return sum(nums[left:right+1])"
          },
          {
            "id": "prefix1d",
            "label": "前缀和",
            "summary": "先建 prefix 数组，区间和直接相减。",
            "complexity": "预处理 O(n)，单次查询 O(1)",
            "explanation": "这是典型的以空间换查询时间。",
            "code": "class NumArray:\n    def __init__(self, nums):\n        self.prefix = [0]\n        for x in nums:\n            self.prefix.append(self.prefix[-1] + x)\n\n    def sumRange(self, left, right):\n        return self.prefix[right + 1] - self.prefix[left]"
          }
        ],
        "takeaway": [
          "多次查询同一数组时，前缀和非常划算",
          "区间 [l, r] 常转成 prefix[r+1] - prefix[l]",
          "边界下标很容易写错，要反复练"
        ]
      },
      {
        "title": "和为 K 的子数组",
        "pattern": "前缀和 + 哈希",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "统计和为 k 的连续子数组个数。",
        "whyAsk": "这题很适合展示前缀和和哈希表的组合威力。",
        "approaches": [
          {
            "id": "allsub",
            "label": "枚举所有子数组",
            "summary": "枚举起点终点再算和。",
            "complexity": "时间 O(n²)",
            "explanation": "重复算和很多次。",
            "code": "def subarray_sum(nums, k):\n    count = 0\n    for i in range(len(nums)):\n        total = 0\n        for j in range(i, len(nums)):\n            total += nums[j]\n            if total == k:\n                count += 1\n    return count"
          },
          {
            "id": "prefix-hash",
            "label": "前缀和 + 计数哈希",
            "summary": "统计历史前缀和出现次数。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "如果当前前缀和是 s，那么只要之前出现过 s-k，就说明存在一个和为 k 的区间。",
            "code": "def subarray_sum_fast(nums, k):\n    count = 0\n    prefix = 0\n    seen = {0: 1}\n\n    for x in nums:\n        prefix += x\n        count += seen.get(prefix - k, 0)\n        seen[prefix] = seen.get(prefix, 0) + 1\n\n    return count"
          }
        ],
        "takeaway": [
          "前缀和不只适合查询，还能和哈希联动",
          "子数组和类题对 prefix - target 很敏感",
          "seen[0] = 1 是高频初始化细节"
        ]
      },
      {
        "title": "区间加法",
        "pattern": "差分",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定多个区间加法操作，输出最终数组。",
        "whyAsk": "这是差分最经典的存在理由。",
        "approaches": [
          {
            "id": "update-all",
            "label": "逐段更新",
            "summary": "每次操作都把区间内元素一个个加上。",
            "complexity": "时间 O(n*m)",
            "explanation": "区间多时会很慢。",
            "code": "def get_modified_array(length, updates):\n    nums = [0] * length\n    for left, right, inc in updates:\n        for i in range(left, right + 1):\n            nums[i] += inc\n    return nums"
          },
          {
            "id": "diff-way",
            "label": "差分数组",
            "summary": "只改区间起点和终点后一位，最后还原前缀和。",
            "complexity": "时间 O(n+m) · 空间 O(n)",
            "explanation": "差分把整个区间更新压缩成两个端点操作。",
            "code": "def get_modified_array_fast(length, updates):\n    diff = [0] * (length + 1)\n\n    for left, right, inc in updates:\n        diff[left] += inc\n        if right + 1 < len(diff):\n            diff[right + 1] -= inc\n\n    result = [0] * length\n    current = 0\n    for i in range(length):\n        current += diff[i]\n        result[i] = current\n\n    return result"
          }
        ],
        "takeaway": [
          "差分适合大量区间更新",
          "前缀和与差分是一对镜像技巧",
          "端点操作是差分的灵魂"
        ]
      }
    ],
    "implementation": [
      "先判断题目是区间查询还是区间更新",
      "查询多时优先考虑前缀和，更新多时优先考虑差分",
      "写的时候先把下标关系画出来，避免边界错误"
    ],
    "complexityNotes": [
      "前缀和常见是预处理 O(n)，查询 O(1)",
      "差分常见是单次更新 O(1)，最后还原 O(n)",
      "哈希和前缀和结合后，很多区间计数题可做到 O(n)"
    ],
    "applications": [
      "日志区间统计、在线报表、批量区间调整都和前缀和/差分类似",
      "很多数据库和分析系统也会做预聚合以减少重复计算",
      "这是高频工程优化思维：把重复工作前置或压缩"
    ],
    "summary": "前缀和与差分的核心是：不要每次都从头算一遍同样的区间工作。",
    "quiz": [],
    "visual": {
      "type": "prefix"
    }
  },
  {
    "id": "monotonic",
    "order": "16",
    "title": "单调栈与单调队列",
    "subtitle": "把局部顺序维护成高效答案",
    "heroSummary": "单调结构常出现在‘下一个更大元素’、‘滑动窗口最大值’、‘接雨水’这类题目里。关键不是容器本身，而是维护一种单调性。",
    "path": "面试导向系统课",
    "duration": "30 min",
    "difficulty": "中等",
    "outcome": "单调维护意识",
    "visualTitle": "单调结构维护过程演示",
    "visualSubtitle": "看元素如何进栈、出栈或进队、出队，理解为什么单调性能帮你快速找到答案。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么很多题总在找‘最近更大/更小’",
        "body": "如果每个位置都向左向右线性找最近更大值，代价通常是 O(n²)。单调结构通过维护候选集合，让这些问题变成线性时间。",
        "bullets": [
          "单调栈常处理最近更大/更小",
          "单调队列常处理滑动窗口最值",
          "它们本质上都在维护一组有效候选"
        ]
      },
      {
        "label": "核心思想",
        "title": "新元素进来时，把无用候选淘汰掉",
        "body": "单调结构的威力来自淘汰：一旦一个旧元素在当前情境下已经不可能对未来有贡献，就把它移除。",
        "bullets": [
          "单调栈偏位置关系",
          "单调队列偏窗口最值",
          "每个元素通常只进出一次"
        ],
        "keyLine": "单调结构高效的根本原因，是旧候选被永久淘汰，不会反复比较。"
      }
    ],
    "examples": [
      {
        "title": "下一个更大元素",
        "pattern": "单调栈",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "找每个元素右侧第一个比它大的元素。",
        "whyAsk": "这是单调栈最标准的模板题。",
        "approaches": [
          {
            "id": "scan-right",
            "label": "向右枚举",
            "summary": "对每个元素都向右找。",
            "complexity": "时间 O(n²)",
            "explanation": "重复比较很多。",
            "code": "def next_greater(nums):\n    result = [-1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[j] > nums[i]:\n                result[i] = nums[j]\n                break\n    return result"
          },
          {
            "id": "mono-stack",
            "label": "单调栈",
            "summary": "维护一个递减栈，新元素进来时弹出所有更小元素。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "被弹出的元素正好在当前元素处找到了下一个更大值。",
            "code": "def next_greater_fast(nums):\n    result = [-1] * len(nums)\n    stack = []  # 存下标，且对应值递减\n\n    for i, x in enumerate(nums):\n        while stack and nums[stack[-1]] < x:\n            idx = stack.pop()\n            result[idx] = x\n        stack.append(i)\n\n    return result"
          }
        ],
        "takeaway": [
          "单调栈常存下标而不是直接存值",
          "弹栈时往往意味着‘答案确定了’",
          "维护单调性是核心"
        ]
      },
      {
        "title": "滑动窗口最大值",
        "pattern": "单调队列",
        "difficulty": "困难偏中",
        "frequency": "面试高频",
        "prompt": "求每个长度为 k 的窗口中的最大值。",
        "whyAsk": "它是单调队列最经典的题。",
        "approaches": [
          {
            "id": "max-each",
            "label": "每窗重算",
            "summary": "每个窗口都重新取 max。",
            "complexity": "时间 O(nk)",
            "explanation": "窗口大时会慢。",
            "code": "def max_sliding_window(nums, k):\n    result = []\n    for i in range(len(nums) - k + 1):\n        result.append(max(nums[i:i + k]))\n    return result"
          },
          {
            "id": "mono-queue",
            "label": "单调队列",
            "summary": "队列里始终按值递减，队首就是当前窗口最大值。",
            "complexity": "时间 O(n) · 空间 O(k)",
            "explanation": "新元素进入时，把后面更小的候选全部弹掉。",
            "code": "from collections import deque\n\ndef max_sliding_window_fast(nums, k):\n    queue = deque()\n    result = []\n\n    for i, x in enumerate(nums):\n        while queue and nums[queue[-1]] <= x:\n            queue.pop()\n        queue.append(i)\n\n        if queue[0] <= i - k:\n            queue.popleft()\n\n        if i >= k - 1:\n            result.append(nums[queue[0]])\n\n    return result"
          }
        ],
        "takeaway": [
          "单调队列通常维护下标",
          "队首是当前窗口最优候选",
          "窗口滑出时要记得清理过期下标"
        ]
      },
      {
        "title": "接雨水",
        "pattern": "边界维护",
        "difficulty": "困难偏中",
        "frequency": "面试高频",
        "prompt": "给定柱子高度，求能接多少雨水。",
        "whyAsk": "这题是单调栈思想非常经典的代表。",
        "approaches": [
          {
            "id": "level-fill",
            "label": "逐层模拟",
            "summary": "按高度一层层模拟积水。",
            "complexity": "时间较高",
            "explanation": "能做，但不够优雅。",
            "code": "def trap(height):\n    return 0"
          },
          {
            "id": "stack-water",
            "label": "单调栈求凹槽",
            "summary": "遇到更高柱子时，弹出栈顶并计算形成的凹槽面积。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "单调栈帮助你在恰当时机找到左右边界。",
            "code": "def trap_fast(height):\n    stack = []\n    water = 0\n\n    for i, h in enumerate(height):\n        while stack and h > height[stack[-1]]:\n            bottom = stack.pop()\n            if not stack:\n                break\n            left = stack[-1]\n            width = i - left - 1\n            bounded_height = min(height[left], h) - height[bottom]\n            water += width * bounded_height\n        stack.append(i)\n\n    return water"
          }
        ],
        "takeaway": [
          "单调结构不仅能找更大值，也能找有效边界",
          "接雨水是‘单调栈 + 边界计算’高频题",
          "复杂题也常能拆成标准结构套路"
        ]
      }
    ],
    "implementation": [
      "先判断题目是在找最近更大/更小，还是窗口最值",
      "栈/队列里优先存下标，便于处理位置和过期问题",
      "每次新元素进来时，思考哪些旧候选已经永久失效"
    ],
    "complexityNotes": [
      "单调结构常见时间复杂度是 O(n)，因为每个元素最多进出一次",
      "空间复杂度取决于栈或队列长度，通常是 O(n) 或 O(k)",
      "效率来源于淘汰无用候选，而不是更快的单次比较"
    ],
    "applications": [
      "实时监控最大值、温度趋势、价格趋势和告警阈值都可见单调结构影子",
      "很多在线算法的核心都是维护候选最优集合",
      "这是面试里非常能区分模板熟练度的专题"
    ],
    "summary": "单调结构的本质是：把不可能再有价值的旧候选及时淘汰掉。",
    "quiz": [],
    "visual": {
      "type": "monotonic"
    }
  },
  {
    "id": "advanced-structures",
    "order": "17",
    "title": "并查集与 Trie",
    "subtitle": "两种很有辨识度的进阶结构",
    "heroSummary": "并查集擅长处理连通性，Trie 擅长处理前缀查询。它们出现频率没有哈希和数组高，但一旦题型对上，就非常强。",
    "path": "面试导向系统课",
    "duration": "30 min",
    "difficulty": "中等",
    "outcome": "结构匹配意识",
    "visualTitle": "并查集合并 / Trie 前缀树演示",
    "visualSubtitle": "看集合如何合并，看单词如何共享前缀路径，理解这两种结构的‘专用场景’。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有些问题需要‘专用结构’",
        "body": "当题目在问‘这些点是否连通’或‘这些单词是否共享某个前缀’时，用通用结构能做，但不够直接。并查集和 Trie 就是为这些问题设计的。",
        "bullets": [
          "并查集擅长动态合并集合",
          "Trie 擅长前缀匹配和字典类问题",
          "识别题型比死记结构更重要"
        ]
      },
      {
        "label": "核心思想",
        "title": "一个管集合关系，一个管字符串前缀",
        "body": "并查集通过 find / union 管理连通块；Trie 通过字符路径共享前缀。",
        "bullets": [
          "并查集高频信号：连通性、朋友圈、岛屿合并",
          "Trie 高频信号：前缀、字典树、搜索建议",
          "两者都是非常强的‘题型匹配器’"
        ],
        "keyLine": "这类结构最重要的是识别适用场景，而不是一上来就硬套。"
      }
    ],
    "examples": [
      {
        "title": "朋友圈 / 省份数量",
        "pattern": "并查集连通性",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定城市连通关系，统计省份数量。",
        "whyAsk": "这是并查集最常见的题型之一。",
        "approaches": [
          {
            "id": "dfs-province",
            "label": "DFS 连通块",
            "summary": "用 DFS 统计连通块数量。",
            "complexity": "时间 O(n²)",
            "explanation": "图搜索能做，但并查集更贴题。",
            "code": "def find_circle_num(isConnected):\n    n = len(isConnected)\n    visited = set()\n\n    def dfs(i):\n        for j in range(n):\n            if isConnected[i][j] == 1 and j not in visited:\n                visited.add(j)\n                dfs(j)\n\n    count = 0\n    for i in range(n):\n        if i not in visited:\n            visited.add(i)\n            dfs(i)\n            count += 1\n\n    return count"
          },
          {
            "id": "union-find",
            "label": "并查集",
            "summary": "把连通城市所在集合不断合并，最后数根节点个数。",
            "complexity": "时间接近 O(n² * α(n))",
            "explanation": "并查集特别适合大量合并和查询是否属于同一集合。",
            "code": "def find_circle_num_fast(isConnected):\n    n = len(isConnected)\n    parent = list(range(n))\n\n    def find(x):\n        if parent[x] != x:\n            parent[x] = find(parent[x])\n        return parent[x]\n\n    def union(a, b):\n        pa, pb = find(a), find(b)\n        if pa != pb:\n            parent[pa] = pb\n\n    for i in range(n):\n        for j in range(i + 1, n):\n            if isConnected[i][j] == 1:\n                union(i, j)\n\n    return sum(1 for i in range(n) if find(i) == i)"
          }
        ],
        "takeaway": [
          "并查集最核心就是 find / union",
          "路径压缩是并查集高频优化",
          "看到连通块合并要对并查集敏感"
        ]
      },
      {
        "title": "实现 Trie",
        "pattern": "前缀树",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "实现插入、搜索和前缀判断。",
        "whyAsk": "这是 Trie 的标准题型。",
        "approaches": [
          {
            "id": "list-search",
            "label": "列表暴力查找",
            "summary": "把所有单词存下来，搜索和前缀判断都靠遍历。",
            "complexity": "查询效率较低",
            "explanation": "能做，但没有利用公共前缀。",
            "code": "class Trie:\n    def __init__(self):\n        self.words = []\n\n    def insert(self, word):\n        self.words.append(word)\n\n    def search(self, word):\n        return word in self.words\n\n    def startsWith(self, prefix):\n        return any(word.startswith(prefix) for word in self.words)"
          },
          {
            "id": "trie-tree",
            "label": "字典树",
            "summary": "每个字符一层，共享相同前缀路径。",
            "complexity": "单次操作 O(L)",
            "explanation": "Trie 最大的价值，就是把大量重复前缀合并成共享路径。",
            "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.is_end\n\n    def startsWith(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return True"
          }
        ],
        "takeaway": [
          "Trie 的核心是共享前缀路径",
          "前缀题和字典树高度相关",
          "实现 Trie 时要区分路径存在和单词结束"
        ]
      },
      {
        "title": "替换单词 / 搜索建议",
        "pattern": "前缀匹配应用",
        "difficulty": "中等",
        "frequency": "面试常考",
        "prompt": "根据词根字典替换句子中的单词前缀。",
        "whyAsk": "它能帮助你把 Trie 从结构题过渡到应用题。",
        "approaches": [
          {
            "id": "prefix-loop",
            "label": "逐词逐前缀检查",
            "summary": "对每个单词都去和所有词根比较。",
            "complexity": "时间较高",
            "explanation": "字典大时会明显慢。",
            "code": "def replace_words(dictionary, sentence):\n    words = sentence.split()\n    result = []\n    for word in words:\n        root = word\n        for d in dictionary:\n            if word.startswith(d) and len(d) < len(root):\n                root = d\n        result.append(root)\n    return \" \".join(result)"
          },
          {
            "id": "trie-apply",
            "label": "Trie 前缀命中",
            "summary": "把词根建成 Trie，每个单词从头沿树走，最先遇到结束标记就替换。",
            "complexity": "时间更优，按字符推进",
            "explanation": "这题体现了 Trie 真正的业务价值：快速前缀匹配。",
            "code": "def replace_words_fast(dictionary, sentence):\n    trie = {}\n    END = '#'\n\n    for word in dictionary:\n        node = trie\n        for ch in word:\n            node = node.setdefault(ch, {})\n        node[END] = True\n\n    def find_root(word):\n        node = trie\n        prefix = []\n        for ch in word:\n            if END in node:\n                return ''.join(prefix)\n            if ch not in node:\n                return word\n            prefix.append(ch)\n            node = node[ch]\n        return ''.join(prefix) if END in node else word\n\n    return ' '.join(find_root(word) for word in sentence.split())"
          }
        ],
        "takeaway": [
          "Trie 的价值主要体现在前缀型应用题",
          "并查集和 Trie 都是高辨识度结构",
          "遇到对口题型时，它们的优势非常明显"
        ]
      }
    ],
    "implementation": [
      "看到连通性、集合合并、是否同属一组时，优先想到并查集",
      "看到前缀、词典、搜索建议时，优先想到 Trie",
      "这类结构题最重要的是先识别场景，再落实现模板"
    ],
    "complexityNotes": [
      "并查集在路径压缩后，均摊复杂度非常低",
      "Trie 单次插入 / 查询常按字符串长度计 O(L)",
      "专用结构的价值不在通用性，而在题型命中时的高效率"
    ],
    "applications": [
      "社交网络、集群连通、权限分组常和并查集思维相似",
      "搜索建议、输入法、词典匹配和敏感词过滤常和 Trie 高度相关",
      "这类专题能显著提升你对题型的识别精度"
    ],
    "summary": "并查集和 Trie 都是典型的‘一旦题型匹配，就非常值得使用’的专用结构。",
    "quiz": [],
    "visual": {
      "type": "advancedstruct"
    }
  }
];

const stage5Templates = {};

export { stage5Lessons, stage5Templates };
