const stage1Lessons = [
  {
    "id": "complexity",
    "order": "01",
    "title": "复杂度分析",
    "subtitle": "判断算法优劣的第一把尺子",
    "heroSummary": "先建立时间复杂度与空间复杂度的底层直觉。以后做题时，不只要会做，还要会比较方案、解释代价、给出更优路线。",
    "path": "面试导向系统课",
    "duration": "22 min",
    "difficulty": "基础",
    "outcome": "复杂度判断力",
    "visualTitle": "复杂度增长与线性扫描动画",
    "visualSubtitle": "先感受数量级分化，再看线性查找如何一步步扫完整个数组。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么算法世界必须有复杂度",
        "body": "程序规模小时，很多解法看起来都差不多；但输入规模变大后，算法的差异会被迅速放大。复杂度分析就是为了解决这个问题：当 n 变大时，代码要做多少工作、要占多少额外空间。",
        "bullets": [
          "它解决的是“方案值不值得用”，不是“代码能不能跑”",
          "它来自真实工程中的性能瓶颈，不是只为面试服务",
          "它能帮助你在动手前先判断风险"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人刷题越刷越乱",
        "body": "因为只背题解，不比较方案。没有复杂度意识，暴力解法和优化解法在脑中没有统一的判断标准，题目一换壳就不会推导。",
        "bullets": [
          "不知道先写什么、再优化什么",
          "能看懂题解，但自己不会推导更优路线",
          "面试官一追问复杂度，就只会报结论"
        ],
        "keyLine": "复杂度不是背公式，而是把“增长趋势”变成你的直觉。"
      },
      {
        "label": "核心思想",
        "title": "看的是增长趋势，而不是这次跑了几秒",
        "body": "O(1) 几乎不受规模影响，O(log n) 增长很慢，O(n) 和输入成正比，O(n²) 会在规模变大时迅速失控。分析时最重要的两条规则是：顺序执行看相加，嵌套执行看相乘。",
        "bullets": [
          "忽略常数：O(2n) 和 O(100n) 最后都看作 O(n)",
          "只看主导项：O(n + n²) 最后看作 O(n²)",
          "空间复杂度关注额外开销，而不是输入本身"
        ]
      }
    ],
    "examples": [
      {
        "title": "两数之和是否存在",
        "pattern": "查找 + 优化意识",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定数组 nums 和目标值 target，判断是否存在两个数之和等于 target。",
        "whyAsk": "这是最经典的“从暴力双循环推到哈希优化”的题型。面试官看重的不是题目本身，而是你是否能讲清楚瓶颈在哪里。",
        "approaches": [
          {
            "id": "brute",
            "label": "暴力解法",
            "summary": "双重循环枚举所有二元组，只要找到一对满足条件就返回。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "暴力法的好处是容易想到、容易写对；缺点是每个元素都要和很多后续元素配对，输入一大就会明显变慢。",
            "code": "def has_pair_sum(nums, target):\n    # 枚举第一个数字\n    for i in range(len(nums)):\n        # 枚举第二个数字，避免和自己配对，也避免重复\n        for j in range(i + 1, len(nums)):\n            # 只要当前这组数字满足条件，直接返回\n            if nums[i] + nums[j] == target:\n                return True\n\n    # 所有二元组都试过了，仍然没有\n    return False"
          },
          {
            "id": "optimized",
            "label": "哈希优化",
            "summary": "一边遍历，一边记录已经见过的数字，快速判断补数是否存在。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "真正慢的不是遍历，而是“反复查找另一个数”。哈希表把查找降到平均 O(1)，于是整体只要一趟扫描。",
            "code": "def has_pair_sum_fast(nums, target):\n    seen = set()  # 记录已经出现过的数字\n\n    for x in nums:\n        need = target - x  # 如果 x 参与配对，还差多少\n\n        # 只要补数已经出现过，就找到答案了\n        if need in seen:\n            return True\n\n        # 当前数字还没有配上，就先记录下来\n        seen.add(x)\n\n    return False"
          }
        ],
        "takeaway": [
          "先给暴力，再指出瓶颈在“重复查找”",
          "哈希表是从 O(n²) 到 O(n) 的经典优化模板",
          "这题是“空间换时间”最标准的入门案例"
        ]
      },
      {
        "title": "有序数组查找",
        "pattern": "利用输入特征",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "在升序数组中查找目标值是否存在，存在返回下标，不存在返回 -1。",
        "whyAsk": "这题用来区分你是否真正会利用题目给出的额外条件。数组“有序”不是装饰，而是在暗示二分查找。",
        "approaches": [
          {
            "id": "linear",
            "label": "线性查找",
            "summary": "从头到尾一个个比，逻辑最直接，但没利用有序条件。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "线性查找不是错，而是浪费了“有序”这个条件。面试里如果题目特意强调有序，通常就是希望你想到更快的方法。",
            "code": "def find_linear(nums, target):\n    for index, value in enumerate(nums):\n        # 挨个比较，命中就返回\n        if value == target:\n            return index\n\n    return -1"
          },
          {
            "id": "binary",
            "label": "二分查找",
            "summary": "每次检查中间元素，把搜索空间直接砍半。",
            "complexity": "时间 O(log n) · 空间 O(1)",
            "explanation": "有序数组最重要的价值，就是让你能根据 mid 和 target 的大小关系排除掉一半不可能的区域。",
            "code": "def find_binary(nums, target):\n    left, right = 0, len(nums) - 1\n\n    while left <= right:\n        mid = left + (right - left) // 2\n\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            # 目标值只可能出现在右半区\n            left = mid + 1\n        else:\n            # 目标值只可能出现在左半区\n            right = mid - 1\n\n    return -1"
          }
        ],
        "takeaway": [
          "复杂度不是死记，而是看你是否利用了输入特征",
          "有序数组是二分查找的经典触发信号",
          "二分不是“更难的遍历”，而是“持续缩规模”"
        ]
      },
      {
        "title": "找重复元素",
        "pattern": "暴力与去重对比",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "判断数组中是否存在重复元素。",
        "whyAsk": "这题非常适合训练你快速识别“存在性判断”和“去重”场景，也常被拿来考复杂度表达。",
        "approaches": [
          {
            "id": "nested",
            "label": "双循环比较",
            "summary": "让每个元素和后面所有元素比较，看是否有相同值。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "双循环能做出来，但每个元素都要反复比较很多次，随着规模增长会很慢。",
            "code": "def contains_duplicate(nums):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            # 只要发现两处值相同，就说明有重复\n            if nums[i] == nums[j]:\n                return True\n\n    return False"
          },
          {
            "id": "setway",
            "label": "集合去重",
            "summary": "把元素放进集合，只要发现已经出现过，就立刻返回。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "这题的核心是“某个值是否见过”，而这正是 set 最擅长的事情。",
            "code": "def contains_duplicate_fast(nums):\n    seen = set()\n\n    for x in nums:\n        # 如果当前数字已经在集合里，说明重复出现\n        if x in seen:\n            return True\n\n        seen.add(x)\n\n    return False"
          }
        ],
        "takeaway": [
          "看到“是否见过”就要想到 set",
          "复杂度优化经常来自把“重复比较”变成“直接命中”",
          "这题很适合练习空间换时间的解释"
        ]
      }
    ],
    "implementation": [
      "先识别输入规模 n 和主要操作是什么",
      "判断代码是顺序执行还是嵌套执行",
      "如果题目给了特殊条件，例如有序、可哈希，优先思考能否利用它降复杂度"
    ],
    "complexityNotes": [
      "复杂度讨论的是增长趋势，所以忽略常数和低阶项",
      "时间复杂度回答“会慢到什么程度”，空间复杂度回答“要多占多少额外内存”",
      "面试时最好同时说时间复杂度、空间复杂度和瓶颈所在"
    ],
    "applications": [
      "日志检索、行为分析、风控扫描都要做复杂度判断，否则数据规模一大就会拖垮系统",
      "面试里几乎每道题最后都会追问复杂度，复杂度表达也是你的技术沟通能力",
      "很多企业级优化，本质上就是把 O(n²) 的流程拆成 O(n) 或 O(n log n)"
    ],
    "summary": "复杂度不是为了炫技，而是帮助你在“能做”和“值得做”之间做判断。",
    "quiz": [
      {
        "prompt": "下面代码的时间复杂度是什么？\nfor i in range(n):\n    print(i)",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        "answer": 2,
        "feedback": "循环执行 n 次，每次只做常数工作，所以是 O(n)。"
      },
      {
        "prompt": "为什么哈希表经常能把题目从 O(n²) 优化到 O(n)？",
        "options": [
          "因为哈希表会自动排序",
          "因为查找和插入平均是 O(1)",
          "因为哈希表不需要空间",
          "因为哈希表能让输入变小"
        ],
        "answer": 1,
        "feedback": "很多暴力题慢在重复查找，哈希表把这一步降成平均 O(1)。"
      },
      {
        "prompt": "下面代码的时间复杂度是什么？\ni = 1\nwhile i < n:\n    i *= 2",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        "answer": 1,
        "feedback": "每次翻倍都在快速缩小剩余差距，这类过程通常是 O(log n)。"
      }
    ],
    "visual": {
      "type": "complexity"
    }
  },
  {
    "id": "array-list",
    "order": "02",
    "title": "数组与 Python list",
    "subtitle": "最常用结构的底层直觉",
    "heroSummary": "理解 Python list 为什么几乎是你刷题的默认容器：它快在哪里，慢在哪里，什么时候该继续用，什么时候要换结构。",
    "path": "面试导向系统课",
    "duration": "26 min",
    "difficulty": "基础",
    "outcome": "list 底层直觉",
    "visualTitle": "list 元素移动动态演示",
    "visualSubtitle": "观察头插、尾插和中间删除时，哪些元素要整体搬动。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么数组类结构会成为一切的起点",
        "body": "数组的思想很早就出现了：把数据按连续位置组织起来，这样就能通过位置快速访问。Python 的 list 不是最原始的静态数组，但它保留了数组最核心的优势：随机访问快、遍历友好、适合承载大多数基础算法题。",
        "bullets": [
          "它的设计目标是通用、稳定、访问快",
          "它是很多高级结构的基础容器",
          "刷题时你看到的很多“数组题”在 Python 里就是 list"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么头插慢、尾插快，经常被问到",
        "body": "因为很多人只会用 list，不知道它背后的元素移动成本。按下标访问快，是因为能直接定位；头部插入慢，是因为后面的元素通常要整体后移；中间删除也类似，会造成搬移成本。",
        "bullets": [
          "按下标访问和按值查找完全不是一回事",
          "尾部 append 通常快，因为更接近“在末尾追加”",
          "中间插入和删除要警惕 O(n) 的元素移动"
        ],
        "keyLine": "数组类结构最大的优势是随机访问，最大的代价是中间插删。"
      },
      {
        "label": "核心思想",
        "title": "把 list 想成一排连续编号的储物格",
        "body": "如果你已经知道格子编号，就能一步定位，所以 nums[i] 很快；如果你要在最前面塞一个新值，后面的值必须整体腾位。这个图景会决定你选不选 list，以及后面要不要引入双指针、前缀和、哈希来避免重复搬动。",
        "bullets": [
          "位置访问快：因为目标位置明确",
          "值查找慢：因为需要一个个比",
          "插删成本取决于会不会引发搬移"
        ]
      }
    ],
    "examples": [
      {
        "title": "移动零",
        "pattern": "双指针 + 原地修改",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "把数组中的 0 移到末尾，同时保持非零元素相对顺序不变。",
        "whyAsk": "它用来考察你是否能在数组上做原地操作，而不是一遇到问题就新开数组，也是双指针的入门题。",
        "approaches": [
          {
            "id": "extra",
            "label": "额外数组法",
            "summary": "先收集所有非零元素，再把剩余位置补 0。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "这种写法容易对，但没有利用“原地修改”的要求。面试官往往会继续追问：能不能不用额外数组？",
            "code": "def move_zeroes(nums):\n    non_zero = []\n\n    # 第一步：收集所有非零元素\n    for x in nums:\n        if x != 0:\n            non_zero.append(x)\n\n    # 第二步：把非零元素写回原数组前面\n    for i in range(len(non_zero)):\n        nums[i] = non_zero[i]\n\n    # 第三步：剩余位置补 0\n    for i in range(len(non_zero), len(nums)):\n        nums[i] = 0"
          },
          {
            "id": "two-pointers",
            "label": "双指针原地法",
            "summary": "慢指针记录下一个非零元素应该放的位置，快指针负责扫描。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "优化点不在时间，而在空间。它体现了数组题里最重要的原地覆盖思维。",
            "code": "def move_zeroes_fast(nums):\n    slow = 0  # slow 指向下一个应该放非零元素的位置\n\n    for fast in range(len(nums)):\n        # 只有遇到非零元素时，才需要把它放到前面\n        if nums[fast] != 0:\n            nums[slow], nums[fast] = nums[fast], nums[slow]\n            slow += 1"
          }
        ],
        "takeaway": [
          "数组原地题要主动思考能否用双指针减少空间",
          "slow / fast 是面试里非常常见的套路",
          "同样是 O(n)，空间 O(1) 和 O(n) 的含义完全不同"
        ]
      },
      {
        "title": "删除有序数组中的重复项",
        "pattern": "覆盖写入",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定有序数组，原地删除重复元素，使每个元素只出现一次，并返回新长度。",
        "whyAsk": "这题要求你利用“有序”条件，在同一个数组里完成去重。它特别锻炼你对下标和覆盖写入的感觉。",
        "approaches": [
          {
            "id": "rewrite",
            "label": "集合去重后重写",
            "summary": "先去重，再把结果写回原数组。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "虽然时间不差，但没利用有序性质，也没有体现原地处理的价值。",
            "code": "def remove_duplicates(nums):\n    unique = []\n    seen = set()\n\n    for x in nums:\n        if x not in seen:\n            seen.add(x)\n            unique.append(x)\n\n    for i in range(len(unique)):\n        nums[i] = unique[i]\n\n    return len(unique)"
          },
          {
            "id": "cover",
            "label": "双指针覆盖法",
            "summary": "慢指针维护有效区间末尾，快指针扫描新值。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "因为数组有序，重复值一定连在一起，所以比较当前值和有效区间末尾即可。",
            "code": "def remove_duplicates_fast(nums):\n    if not nums:\n        return 0\n\n    slow = 0  # nums[0:slow+1] 是去重后的有效区间\n\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[slow]:\n            slow += 1\n            nums[slow] = nums[fast]\n\n    return slow + 1"
          }
        ],
        "takeaway": [
          "有序数组里，重复值相邻这一点非常关键",
          "覆盖写入是数组原地题的常见手法",
          "看到“返回新长度”时，要明确 slow 指针的语义"
        ]
      },
      {
        "title": "合并两个有序数组",
        "pattern": "从后往前覆盖",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定两个有序数组 nums1 和 nums2，把 nums2 合并到 nums1 中，结果仍保持有序。",
        "whyAsk": "这题是数组题里很有代表性的“从后往前填”技巧。它能训练你从空间布局反推指针移动方向。",
        "approaches": [
          {
            "id": "sortall",
            "label": "拼接后排序",
            "summary": "先把两个数组拼起来，再整体排序。",
            "complexity": "时间 O((m+n) log(m+n)) · 空间 O(1) 或 O(m+n)",
            "explanation": "这种写法能完成任务，但完全忽略了两个数组本来就是有序的事实。",
            "code": "def merge(nums1, m, nums2, n):\n    # 把 nums2 拷到 nums1 后面\n    nums1[m:m+n] = nums2\n\n    # 再整体排序\n    nums1.sort()"
          },
          {
            "id": "backfill",
            "label": "从后往前填",
            "summary": "从两个数组的末尾开始比较，把较大的值写到 nums1 的最后位置。",
            "complexity": "时间 O(m+n) · 空间 O(1)",
            "explanation": "因为 nums1 末尾本来就留了空位，所以从后往前填可以避免覆盖还没比较过的元素。",
            "code": "def merge_fast(nums1, m, nums2, n):\n    i = m - 1          # nums1 有效部分的末尾\n    j = n - 1          # nums2 的末尾\n    write = m + n - 1  # 最后一个可写位置\n\n    while j >= 0:\n        # 只有当 nums1 还有值，且 nums1 当前值更大时，才先放 nums1 的值\n        if i >= 0 and nums1[i] > nums2[j]:\n            nums1[write] = nums1[i]\n            i -= 1\n        else:\n            nums1[write] = nums2[j]\n            j -= 1\n\n        write -= 1"
          }
        ],
        "takeaway": [
          "原地合并时，指针方向往往由“哪里有空位”决定",
          "从后往前填是很重要的数组技巧",
          "看到“两个有序数组”要立刻想到双指针"
        ]
      }
    ],
    "implementation": [
      "先判断题目是否允许原地修改，如果允许，优先思考双指针",
      "区分读指针和写指针的职责，避免边遍历边乱改",
      "如果题目给了有序条件，优先考虑相邻比较、覆盖写入或从后往前填"
    ],
    "complexityNotes": [
      "list 按下标访问通常是 O(1)，因为能够直接定位",
      "头插、中间插删通常是 O(n)，因为可能触发整体搬移",
      "很多数组题的优化目标不是降时间，而是把空间从 O(n) 压到 O(1)"
    ],
    "applications": [
      "日志清洗、批量数据规整、原地过滤都经常使用数组原地覆盖思路",
      "前端列表渲染、表格处理、数据管道中的顺序扫描也依赖数组的连续访问特性",
      "很多更复杂的技巧，例如前缀和、滑动窗口、双指针，本质上都以数组为舞台"
    ],
    "summary": "数组题的关键不是会不会遍历，而是会不会控制“位置”和“移动成本”。",
    "quiz": [
      {
        "prompt": "Python list 中，按下标访问 nums[i] 的平均时间复杂度通常是？",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        "answer": 0,
        "feedback": "因为 list 可以根据下标直接定位到对应位置。"
      },
      {
        "prompt": "为什么 list 头插通常比尾插慢？",
        "options": [
          "因为头部元素更难读取",
          "因为后面的元素可能整体后移",
          "因为 Python 会自动排序",
          "因为头插一定会复制整个数组两次"
        ],
        "answer": 1,
        "feedback": "头插的主要代价是后续元素腾位置，而不是读取本身。"
      },
      {
        "prompt": "合并两个有序数组时，为什么常常从后往前写？",
        "options": [
          "因为倒着看更容易",
          "因为末尾有空位，能避免覆盖未比较元素",
          "因为这样复杂度更高",
          "因为 Python 只能倒序赋值"
        ],
        "answer": 1,
        "feedback": "这正是原地合并的关键：利用末尾空位避免提前覆盖数据。"
      }
    ],
    "visual": {
      "type": "array"
    }
  },
  {
    "id": "linked-list",
    "order": "03",
    "title": "链表",
    "subtitle": "用指针连接节点，而不是依赖连续空间",
    "heroSummary": "链表的重点不是背结构定义，而是理解为什么它适合频繁插删、为什么访问慢，以及怎么用指针安全地改链。",
    "path": "面试导向系统课",
    "duration": "28 min",
    "difficulty": "基础到中等",
    "outcome": "指针操作意识",
    "visualTitle": "链表指针改链演示",
    "visualSubtitle": "看节点如何被重新连接，理解为什么链表题关键是改指针而不是搬元素。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么数组之外还需要链表",
        "body": "数组依赖连续空间，随机访问快，但中间插删成本高。链表把每个节点分散存储，再用指针把它们连起来，于是插入和删除只需要改连接关系，不需要整体搬动元素。",
        "bullets": [
          "它解决的是“插删频繁时搬移成本高”的问题",
          "它牺牲随机访问，换来局部改动更灵活",
          "很多缓存结构、队列实现、图结构都离不开链表思维"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么链表题容易写挂",
        "body": "因为链表题的核心不是遍历，而是指针安全。你只要少存一个 next，或者改链顺序错了，就可能把后续节点丢掉。",
        "bullets": [
          "访问第 k 个节点必须从头走，不能直接跳",
          "删除和插入前要先找到前驱节点",
          "改链时顺序错了，容易断链"
        ],
        "keyLine": "链表题真正考的是“指针关系管理能力”。"
      },
      {
        "label": "核心思想",
        "title": "把链表理解成一个个节点互相指向",
        "body": "链表里每个节点都知道“下一个是谁”，但不知道自己在第几个位置。所以插入/删除的本质，是修改几个节点的 next 指向；访问的本质，是顺着 next 一步一步走。",
        "bullets": [
          "插删快：因为只改局部指针",
          "访问慢：因为要从头走",
          "虚拟头节点 dummy 是处理边界问题的重要工具"
        ]
      }
    ],
    "examples": [
      {
        "title": "删除链表中的节点",
        "pattern": "改前驱指针",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "删除链表中等于给定值 val 的所有节点。",
        "whyAsk": "这题是 dummy 节点和指针删除思维的标准入门题，尤其适合讲透边界情况。",
        "approaches": [
          {
            "id": "special",
            "label": "分类讨论头节点",
            "summary": "先单独处理头节点，再逐步删除中间节点。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "能做，但边界处理很绕，一旦题目变化就容易漏掉头节点重复删除的情况。",
            "code": "def remove_elements(head, val):\n    # 先把头部连续等于 val 的节点全部跳过\n    while head and head.val == val:\n        head = head.next\n\n    current = head\n\n    while current and current.next:\n        # 发现下一个节点需要删除，就直接跳过去\n        if current.next.val == val:\n            current.next = current.next.next\n        else:\n            current = current.next\n\n    return head"
          },
          {
            "id": "dummy",
            "label": "dummy 节点法",
            "summary": "在头节点前面放一个虚拟头节点，统一所有删除逻辑。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "dummy 的价值是把“删头节点”和“删中间节点”统一成同一种操作，让代码更稳定、更面试化。",
            "code": "def remove_elements_fast(head, val):\n    dummy = ListNode(0, head)  # dummy.next 指向原始头节点\n    current = dummy\n\n    while current.next:\n        if current.next.val == val:\n            # 直接跳过当前需要删除的节点\n            current.next = current.next.next\n        else:\n            current = current.next\n\n    return dummy.next"
          }
        ],
        "takeaway": [
          "dummy 节点是链表题的重要模板",
          "删除节点本质上是改前驱节点的 next",
          "统一边界比单独分类讨论更稳定"
        ]
      },
      {
        "title": "反转链表",
        "pattern": "指针重连",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "反转一个单链表，并返回反转后的头节点。",
        "whyAsk": "这题是链表题最经典的模板题，几乎必考。它能看出你是否能安全地保存 next 并逐步改链。",
        "approaches": [
          {
            "id": "stack",
            "label": "借助数组/栈",
            "summary": "先把节点收集起来，再倒序重连。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "思路容易想到，但没有体现链表原地改指针的价值，也多用了额外空间。",
            "code": "def reverse_list(head):\n    nodes = []\n    current = head\n\n    # 先把所有节点收集起来\n    while current:\n        nodes.append(current)\n        current = current.next\n\n    # 没有节点时直接返回\n    if not nodes:\n        return None\n\n    # 倒序重连\n    for i in range(len(nodes) - 1, 0, -1):\n        nodes[i].next = nodes[i - 1]\n\n    nodes[0].next = None\n    return nodes[-1]"
          },
          {
            "id": "iterative",
            "label": "三指针迭代",
            "summary": "遍历链表时，逐个把当前节点的 next 指向前一个节点。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "这是链表改链题最经典的模板。关键在于每次改指针前，先保存原来的 next。",
            "code": "def reverse_list_fast(head):\n    prev = None\n    current = head\n\n    while current:\n        next_node = current.next   # 先保存后继，防止断链\n        current.next = prev        # 反转当前节点指向\n        prev = current             # prev 向前移动\n        current = next_node        # current 继续向后走\n\n    return prev"
          }
        ],
        "takeaway": [
          "改链顺序的关键是：先存 next，再改 current.next",
          "prev / current / next 是必须熟练的链表模板",
          "链表题里很多复杂题都能拆成这个模板"
        ]
      },
      {
        "title": "找链表中间节点",
        "pattern": "快慢指针",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "返回链表的中间节点。如果有两个中间节点，返回第二个。",
        "whyAsk": "这题是快慢指针最典型的入门题，也是后面判断环、找倒数节点的基础。",
        "approaches": [
          {
            "id": "count",
            "label": "先计数再走",
            "summary": "先遍历一次统计长度，再走到中间位置。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "能做，但需要两次遍历。它的意义主要在于给出一个基准方案。",
            "code": "def middle_node(head):\n    length = 0\n    current = head\n\n    while current:\n        length += 1\n        current = current.next\n\n    current = head\n    for _ in range(length // 2):\n        current = current.next\n\n    return current"
          },
          {
            "id": "fastslow",
            "label": "快慢指针",
            "summary": "快指针每次走两步，慢指针每次走一步，快指针到尾时慢指针刚好在中间。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "快慢指针是链表题里极其重要的统一思维，很多看似不同的问题都能转成它。",
            "code": "def middle_node_fast(head):\n    slow = head\n    fast = head\n\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n\n    return slow"
          }
        ],
        "takeaway": [
          "快慢指针是链表题的核心套路之一",
          "双倍速度差经常对应中点、倒数、环检测",
          "链表无法随机访问，所以用“速度关系”替代“下标关系”"
        ]
      }
    ],
    "implementation": [
      "先判断题目是在考遍历、删除、插入，还是反转",
      "删除和插入通常先找前驱，必要时用 dummy 统一边界",
      "改链时优先保存 next，避免断链"
    ],
    "complexityNotes": [
      "链表按位置访问通常是 O(n)，因为必须从头走",
      "已知前驱节点时，插入和删除可以做到 O(1)",
      "很多链表优化不一定改变时间，而是让指针操作更安全、更简洁"
    ],
    "applications": [
      "LRU 缓存、任务队列、浏览器前进后退等场景都能看到链表思想",
      "很多底层容器用链表处理频繁插删，因为不需要整体搬动元素",
      "链表题训练的是指针管理，这对理解树和图也很重要"
    ],
    "summary": "链表题真正考的不是遍历，而是你能不能安全地管理节点关系。",
    "quiz": [
      {
        "prompt": "链表为什么插入和删除通常比数组灵活？",
        "options": [
          "因为链表能随机访问",
          "因为只需要改局部指针，不用整体搬动元素",
          "因为链表一定更省空间",
          "因为链表会自动排序"
        ],
        "answer": 1,
        "feedback": "这正是链表存在的核心意义：局部改动代价低。"
      },
      {
        "prompt": "反转链表时，为什么要先保存 next_node？",
        "options": [
          "为了更好看",
          "为了避免 current.next 改掉后丢失后续链",
          "为了降低时间复杂度",
          "因为 Python 语法要求"
        ],
        "answer": 1,
        "feedback": "链表题最怕断链，先存后继是标准动作。"
      },
      {
        "prompt": "dummy 节点最常用来解决什么问题？",
        "options": [
          "提高随机访问速度",
          "统一头节点和中间节点的边界处理",
          "减少空间复杂度",
          "避免快慢指针"
        ],
        "answer": 1,
        "feedback": "dummy 的最大价值就是让边界更统一。"
      }
    ],
    "visual": {
      "type": "linked"
    }
  },
  {
    "id": "stack-queue",
    "order": "04",
    "title": "栈与队列",
    "subtitle": "顺序受限的数据流管理",
    "heroSummary": "栈是后进先出，队列是先进先出。它们看起来简单，却是括号匹配、层序遍历、任务调度等大量题目的基础。",
    "path": "面试导向系统课",
    "duration": "26 min",
    "difficulty": "基础",
    "outcome": "受限顺序思维",
    "visualTitle": "入栈 / 出栈 / 入队 / 出队演示",
    "visualSubtitle": "看元素如何按规则流动，理解“后进先出”和“先进先出”的差别。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么需要受限访问的数据结构",
        "body": "有些场景不需要任意位置访问，只需要保证一种严格顺序。比如函数调用要后进先出，任务排队要先进先出。栈和队列就是为这种“受限顺序”问题设计的。",
        "bullets": [
          "栈解决的是“最近进入的先处理”",
          "队列解决的是“先来的先处理”",
          "很多看似复杂的问题，本质上就是顺序约束"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么做题时经常该用栈却没想到",
        "body": "因为很多人只看题面，不去识别数据流顺序。只要题目涉及最近匹配、回退、括号配对、单调维护、层序推进，就要高度敏感。",
        "bullets": [
          "最近一个未处理对象，常对应栈",
          "按层扩散、排队处理，常对应队列",
          "Python 里 list 和 deque 的选择也很重要"
        ],
        "keyLine": "识别顺序约束，是栈和队列题的核心。"
      },
      {
        "label": "核心思想",
        "title": "别把它们只看成容器，要看成规则",
        "body": "栈强调后进先出，队列强调先进先出。算法题里真正关键的，不是容器名字，而是你能不能看出题目数据流应该按什么顺序被处理。",
        "bullets": [
          "括号配对、本地回退、最近更大更小值，常用栈",
          "层序遍历、消息消费、最短步数扩散，常用队列",
          "Python 里队列通常优先用 collections.deque"
        ]
      }
    ],
    "examples": [
      {
        "title": "有效括号",
        "pattern": "匹配关系",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定只包含括号的字符串，判断括号是否有效匹配。",
        "whyAsk": "这题是栈最标准的模板题，几乎所有算法学习都会从这里建立“最近未匹配对象”的直觉。",
        "approaches": [
          {
            "id": "replace",
            "label": "字符串替换法",
            "summary": "反复删除成对括号，直到不能再删为止。",
            "complexity": "时间 O(n²) · 空间 O(n)",
            "explanation": "能做，但效率低，而且没有抓住问题本质：我们真正关心的是“最近一个还没匹配的左括号”。",
            "code": "def is_valid(s):\n    changed = True\n\n    while changed:\n        changed = False\n        for pair in (\"()\", \"[]\", \"{}\"):\n            if pair in s:\n                s = s.replace(pair, \"\")\n                changed = True\n\n    return s == \"\""
          },
          {
            "id": "stack",
            "label": "栈匹配",
            "summary": "遇到左括号入栈，遇到右括号就和栈顶左括号匹配。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "最近一个未匹配左括号，天然就是栈顶。只要你识别出“最近匹配”关系，栈就非常自然。",
            "code": "def is_valid_fast(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n\n    for ch in s:\n        # 左括号直接入栈，等待未来匹配\n        if ch not in pairs:\n            stack.append(ch)\n        else:\n            # 栈空或栈顶不是匹配的左括号，都说明无效\n            if not stack or stack[-1] != pairs[ch]:\n                return False\n            stack.pop()\n\n    # 全部处理完后，栈必须为空才说明完全匹配\n    return not stack"
          }
        ],
        "takeaway": [
          "最近一个未匹配对象，常常就是栈顶",
          "有效括号是识别栈题的第一道门",
          "栈题常用 push / pop / peek 三个动作表达"
        ]
      },
      {
        "title": "用队列实现层序遍历",
        "pattern": "按层推进",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定二叉树，按层序遍历返回节点值。",
        "whyAsk": "这题是队列在树问题里的最经典应用。即使你还没系统学树，也可以先理解“先进先出”为什么适合按层扩散。",
        "approaches": [
          {
            "id": "recursive",
            "label": "递归按层收集",
            "summary": "用递归记录深度，再把值放进对应层级。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "能做，但它隐藏了层序遍历真正的顺序控制本质：谁先进入，谁先处理。",
            "code": "def level_order(root):\n    levels = []\n\n    def dfs(node, depth):\n        if not node:\n            return\n\n        if depth == len(levels):\n            levels.append([])\n\n        levels[depth].append(node.val)\n        dfs(node.left, depth + 1)\n        dfs(node.right, depth + 1)\n\n    dfs(root, 0)\n    return levels"
          },
          {
            "id": "queue",
            "label": "队列层序法",
            "summary": "把每一层待处理节点放进队列，先进先出地处理。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "层序遍历的本质就是“这一层先处理完，再进入下一层”，而队列正好保证这种顺序。",
            "code": "from collections import deque\n\ndef level_order_fast(root):\n    if not root:\n        return []\n\n    queue = deque([root])\n    result = []\n\n    while queue:\n        level_size = len(queue)\n        level = []\n\n        for _ in range(level_size):\n            node = queue.popleft()  # 队首节点最先进入，也最先处理\n            level.append(node.val)\n\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n        result.append(level)\n\n    return result"
          }
        ],
        "takeaway": [
          "按层推进、按波次扩散，通常优先想到队列",
          "Python 做队列优先用 deque，而不是 list.pop(0)",
          "BFS 的很多场景都能抽象成队列推进"
        ]
      },
      {
        "title": "最小栈",
        "pattern": "辅助结构",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "设计一个支持 push、pop、top 和 getMin 的栈，并且 getMin 需要 O(1)。",
        "whyAsk": "这题用来考察你是否能在基本结构上再附加一个辅助结构，保持操作复杂度稳定。",
        "approaches": [
          {
            "id": "scanmin",
            "label": "每次扫描最小值",
            "summary": "普通栈保存所有元素，需要最小值时重新遍历。",
            "complexity": "push/pop O(1) · getMin O(n)",
            "explanation": "问题不在栈本身，而在额外需求。只用一个栈时，最小值查询没法稳定做到常数级。",
            "code": "class MinStack:\n    def __init__(self):\n        self.stack = []\n\n    def push(self, val):\n        self.stack.append(val)\n\n    def pop(self):\n        self.stack.pop()\n\n    def top(self):\n        return self.stack[-1]\n\n    def getMin(self):\n        # 每次都重新找最小值，代价是 O(n)\n        return min(self.stack)"
          },
          {
            "id": "assist",
            "label": "辅助最小栈",
            "summary": "除了主栈外，再维护一个“到当前位置为止的最小值栈”。",
            "complexity": "所有操作均摊 O(1) · 空间 O(n)",
            "explanation": "这题的关键是：在 push 时顺手把“当前最小值”也记录下来，未来查询就不必重新扫描。",
            "code": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val):\n        self.stack.append(val)\n\n        if not self.min_stack:\n            self.min_stack.append(val)\n        else:\n            # 当前位置的最小值 = 新值 和 之前最小值 的较小者\n            self.min_stack.append(min(val, self.min_stack[-1]))\n\n    def pop(self):\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self):\n        return self.stack[-1]\n\n    def getMin(self):\n        return self.min_stack[-1]"
          }
        ],
        "takeaway": [
          "很多设计题的关键是“辅助结构同步维护”",
          "不是所有优化都降低主流程复杂度，有时是稳定关键操作复杂度",
          "栈设计题要特别关注每个操作的时间保证"
        ]
      }
    ],
    "implementation": [
      "先识别题目需要的是 LIFO 还是 FIFO 顺序",
      "如果是最近匹配、回退、撤销，优先考虑栈",
      "如果是按层、按波次、按先来先服务推进，优先考虑队列"
    ],
    "complexityNotes": [
      "栈的 push/pop/top 通常都是 O(1)",
      "队列如果用 deque，则 append/popleft 都是 O(1)",
      "很多设计题的难点不在大 O，而在能否保证每个操作都稳定"
    ],
    "applications": [
      "函数调用栈、浏览器撤销、表达式求值都使用栈思想",
      "消息队列、任务调度、BFS、网络请求缓冲都使用队列思想",
      "单调栈、单调队列是后续更高级算法技巧的重要基础"
    ],
    "summary": "栈和队列最重要的不是名字，而是你能否识别出题目想要的数据流顺序。",
    "quiz": [
      {
        "prompt": "“最近一个还没配对的左括号”最自然对应哪种结构？",
        "options": [
          "队列",
          "栈",
          "哈希表",
          "链表"
        ],
        "answer": 1,
        "feedback": "最近未处理对象通常就是栈顶。"
      },
      {
        "prompt": "Python 中实现高效队列时，通常优先选择什么？",
        "options": [
          "list",
          "dict",
          "set",
          "collections.deque"
        ],
        "answer": 3,
        "feedback": "因为 deque 的 popleft 是 O(1)，而 list.pop(0) 通常是 O(n)。"
      },
      {
        "prompt": "最小栈为什么需要辅助栈？",
        "options": [
          "为了减少空间",
          "为了让 getMin 保持 O(1)",
          "为了更容易排序",
          "为了更容易递归"
        ],
        "answer": 1,
        "feedback": "辅助栈的作用就是把“当前最小值”实时维护下来。"
      }
    ],
    "visual": {
      "type": "stackqueue"
    }
  }
];

const stage1Templates = {
  "complexity": "# 复杂度分析模板\n# 1. 先说主要操作做了几次\n# 2. 再说时间复杂度\n# 3. 最后说额外空间来自哪里\ndef analyze_solution():\n    pass",
  "array-list": "# 数组 / list 原地覆盖模板\nwrite = 0\nfor read in range(len(nums)):\n    if 满足保留条件:\n        nums[write] = nums[read]\n        write += 1\nreturn write",
  "linked-list": "# 链表 dummy + 改链模板\ndummy = ListNode(0, head)\ncurrent = dummy\nwhile current.next:\n    if 需要删除 current.next:\n        current.next = current.next.next\n    else:\n        current = current.next\nreturn dummy.next",
  "stack-queue": "# 栈 / 队列基础模板\nstack = []\nfor x in data:\n    if 需要压栈:\n        stack.append(x)\n    else:\n        stack.pop()\n\nfrom collections import deque\nqueue = deque([start])\nwhile queue:\n    node = queue.popleft()"
};

export { stage1Lessons, stage1Templates };
