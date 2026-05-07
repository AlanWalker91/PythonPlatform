const lessons = [
  {
    id: "complexity",
    order: "01",
    title: "复杂度分析",
    subtitle: "判断算法优劣的第一把尺子",
    heroSummary:
      "先建立时间复杂度与空间复杂度的底层直觉。以后做题时，不只要会做，还要会比较方案、解释代价、给出更优路线。",
    path: "面试导向系统课",
    duration: "22 min",
    difficulty: "基础",
    outcome: "复杂度判断力",
    visualTitle: "复杂度增长与线性扫描动画",
    visualSubtitle: "先感受数量级分化，再看线性查找如何一步步扫完整个数组。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么算法世界必须有复杂度",
        body:
          "程序规模小时，很多解法看起来都差不多；但输入规模变大后，算法的差异会被迅速放大。复杂度分析就是为了解决这个问题：当 n 变大时，代码要做多少工作、要占多少额外空间。",
        bullets: [
          "它解决的是“方案值不值得用”，不是“代码能不能跑”",
          "它来自真实工程中的性能瓶颈，不是只为面试服务",
          "它能帮助你在动手前先判断风险"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人刷题越刷越乱",
        body:
          "因为只背题解，不比较方案。没有复杂度意识，暴力解法和优化解法在脑中没有统一的判断标准，题目一换壳就不会推导。",
        bullets: [
          "不知道先写什么、再优化什么",
          "能看懂题解，但自己不会推导更优路线",
          "面试官一追问复杂度，就只会报结论"
        ],
        keyLine: "复杂度不是背公式，而是把“增长趋势”变成你的直觉。"
      },
      {
        label: "核心思想",
        title: "看的是增长趋势，而不是这次跑了几秒",
        body:
          "O(1) 几乎不受规模影响，O(log n) 增长很慢，O(n) 和输入成正比，O(n²) 会在规模变大时迅速失控。分析时最重要的两条规则是：顺序执行看相加，嵌套执行看相乘。",
        bullets: [
          "忽略常数：O(2n) 和 O(100n) 最后都看作 O(n)",
          "只看主导项：O(n + n²) 最后看作 O(n²)",
          "空间复杂度关注额外开销，而不是输入本身"
        ]
      }
    ],
    examples: [
      {
        title: "两数之和是否存在",
        pattern: "查找 + 优化意识",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定数组 nums 和目标值 target，判断是否存在两个数之和等于 target。",
        whyAsk:
          "这是最经典的“从暴力双循环推到哈希优化”的题型。面试官看重的不是题目本身，而是你是否能讲清楚瓶颈在哪里。",
        approaches: [
          {
            id: "brute",
            label: "暴力解法",
            summary: "双重循环枚举所有二元组，只要找到一对满足条件就返回。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation:
              "暴力法的好处是容易想到、容易写对；缺点是每个元素都要和很多后续元素配对，输入一大就会明显变慢。",
            code: `def has_pair_sum(nums, target):
    # 枚举第一个数字
    for i in range(len(nums)):
        # 枚举第二个数字，避免和自己配对，也避免重复
        for j in range(i + 1, len(nums)):
            # 只要当前这组数字满足条件，直接返回
            if nums[i] + nums[j] == target:
                return True

    # 所有二元组都试过了，仍然没有
    return False`
          },
          {
            id: "optimized",
            label: "哈希优化",
            summary: "一边遍历，一边记录已经见过的数字，快速判断补数是否存在。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "真正慢的不是遍历，而是“反复查找另一个数”。哈希表把查找降到平均 O(1)，于是整体只要一趟扫描。",
            code: `def has_pair_sum_fast(nums, target):
    seen = set()  # 记录已经出现过的数字

    for x in nums:
        need = target - x  # 如果 x 参与配对，还差多少

        # 只要补数已经出现过，就找到答案了
        if need in seen:
            return True

        # 当前数字还没有配上，就先记录下来
        seen.add(x)

    return False`
          }
        ],
        takeaway: [
          "先给暴力，再指出瓶颈在“重复查找”",
          "哈希表是从 O(n²) 到 O(n) 的经典优化模板",
          "这题是“空间换时间”最标准的入门案例"
        ]
      },
      {
        title: "有序数组查找",
        pattern: "利用输入特征",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "在升序数组中查找目标值是否存在，存在返回下标，不存在返回 -1。",
        whyAsk:
          "这题用来区分你是否真正会利用题目给出的额外条件。数组“有序”不是装饰，而是在暗示二分查找。",
        approaches: [
          {
            id: "linear",
            label: "线性查找",
            summary: "从头到尾一个个比，逻辑最直接，但没利用有序条件。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "线性查找不是错，而是浪费了“有序”这个条件。面试里如果题目特意强调有序，通常就是希望你想到更快的方法。",
            code: `def find_linear(nums, target):
    for index, value in enumerate(nums):
        # 挨个比较，命中就返回
        if value == target:
            return index

    return -1`
          },
          {
            id: "binary",
            label: "二分查找",
            summary: "每次检查中间元素，把搜索空间直接砍半。",
            complexity: "时间 O(log n) · 空间 O(1)",
            explanation:
              "有序数组最重要的价值，就是让你能根据 mid 和 target 的大小关系排除掉一半不可能的区域。",
            code: `def find_binary(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            # 目标值只可能出现在右半区
            left = mid + 1
        else:
            # 目标值只可能出现在左半区
            right = mid - 1

    return -1`
          }
        ],
        takeaway: [
          "复杂度不是死记，而是看你是否利用了输入特征",
          "有序数组是二分查找的经典触发信号",
          "二分不是“更难的遍历”，而是“持续缩规模”"
        ]
      },
      {
        title: "找重复元素",
        pattern: "暴力与去重对比",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "判断数组中是否存在重复元素。",
        whyAsk:
          "这题非常适合训练你快速识别“存在性判断”和“去重”场景，也常被拿来考复杂度表达。",
        approaches: [
          {
            id: "nested",
            label: "双循环比较",
            summary: "让每个元素和后面所有元素比较，看是否有相同值。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation:
              "双循环能做出来，但每个元素都要反复比较很多次，随着规模增长会很慢。",
            code: `def contains_duplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            # 只要发现两处值相同，就说明有重复
            if nums[i] == nums[j]:
                return True

    return False`
          },
          {
            id: "setway",
            label: "集合去重",
            summary: "把元素放进集合，只要发现已经出现过，就立刻返回。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "这题的核心是“某个值是否见过”，而这正是 set 最擅长的事情。",
            code: `def contains_duplicate_fast(nums):
    seen = set()

    for x in nums:
        # 如果当前数字已经在集合里，说明重复出现
        if x in seen:
            return True

        seen.add(x)

    return False`
          }
        ],
        takeaway: [
          "看到“是否见过”就要想到 set",
          "复杂度优化经常来自把“重复比较”变成“直接命中”",
          "这题很适合练习空间换时间的解释"
        ]
      }
    ],
    implementation: [
      "先识别输入规模 n 和主要操作是什么",
      "判断代码是顺序执行还是嵌套执行",
      "如果题目给了特殊条件，例如有序、可哈希，优先思考能否利用它降复杂度"
    ],
    complexityNotes: [
      "复杂度讨论的是增长趋势，所以忽略常数和低阶项",
      "时间复杂度回答“会慢到什么程度”，空间复杂度回答“要多占多少额外内存”",
      "面试时最好同时说时间复杂度、空间复杂度和瓶颈所在"
    ],
    applications: [
      "日志检索、行为分析、风控扫描都要做复杂度判断，否则数据规模一大就会拖垮系统",
      "面试里几乎每道题最后都会追问复杂度，复杂度表达也是你的技术沟通能力",
      "很多企业级优化，本质上就是把 O(n²) 的流程拆成 O(n) 或 O(n log n)"
    ],
    summary: "复杂度不是为了炫技，而是帮助你在“能做”和“值得做”之间做判断。",
    quiz: [
      {
        prompt: "下面代码的时间复杂度是什么？\nfor i in range(n):\n    print(i)",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 2,
        feedback: "循环执行 n 次，每次只做常数工作，所以是 O(n)。"
      },
      {
        prompt: "为什么哈希表经常能把题目从 O(n²) 优化到 O(n)？",
        options: ["因为哈希表会自动排序", "因为查找和插入平均是 O(1)", "因为哈希表不需要空间", "因为哈希表能让输入变小"],
        answer: 1,
        feedback: "很多暴力题慢在重复查找，哈希表把这一步降成平均 O(1)。"
      },
      {
        prompt: "下面代码的时间复杂度是什么？\ni = 1\nwhile i < n:\n    i *= 2",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 1,
        feedback: "每次翻倍都在快速缩小剩余差距，这类过程通常是 O(log n)。"
      }
    ],
    visual: { type: "complexity" }
  },
  {
    id: "array-list",
    order: "02",
    title: "数组与 Python list",
    subtitle: "最常用结构的底层直觉",
    heroSummary:
      "理解 Python list 为什么几乎是你刷题的默认容器：它快在哪里，慢在哪里，什么时候该继续用，什么时候要换结构。",
    path: "面试导向系统课",
    duration: "26 min",
    difficulty: "基础",
    outcome: "list 底层直觉",
    visualTitle: "list 元素移动动态演示",
    visualSubtitle: "观察头插、尾插和中间删除时，哪些元素要整体搬动。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么数组类结构会成为一切的起点",
        body:
          "数组的思想很早就出现了：把数据按连续位置组织起来，这样就能通过位置快速访问。Python 的 list 不是最原始的静态数组，但它保留了数组最核心的优势：随机访问快、遍历友好、适合承载大多数基础算法题。",
        bullets: [
          "它的设计目标是通用、稳定、访问快",
          "它是很多高级结构的基础容器",
          "刷题时你看到的很多“数组题”在 Python 里就是 list"
        ]
      },
      {
        label: "痛点",
        title: "为什么头插慢、尾插快，经常被问到",
        body:
          "因为很多人只会用 list，不知道它背后的元素移动成本。按下标访问快，是因为能直接定位；头部插入慢，是因为后面的元素通常要整体后移；中间删除也类似，会造成搬移成本。",
        bullets: [
          "按下标访问和按值查找完全不是一回事",
          "尾部 append 通常快，因为更接近“在末尾追加”",
          "中间插入和删除要警惕 O(n) 的元素移动"
        ],
        keyLine: "数组类结构最大的优势是随机访问，最大的代价是中间插删。"
      },
      {
        label: "核心思想",
        title: "把 list 想成一排连续编号的储物格",
        body:
          "如果你已经知道格子编号，就能一步定位，所以 nums[i] 很快；如果你要在最前面塞一个新值，后面的值必须整体腾位。这个图景会决定你选不选 list，以及后面要不要引入双指针、前缀和、哈希来避免重复搬动。",
        bullets: [
          "位置访问快：因为目标位置明确",
          "值查找慢：因为需要一个个比",
          "插删成本取决于会不会引发搬移"
        ]
      }
    ],
    examples: [
      {
        title: "移动零",
        pattern: "双指针 + 原地修改",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "把数组中的 0 移到末尾，同时保持非零元素相对顺序不变。",
        whyAsk:
          "它用来考察你是否能在数组上做原地操作，而不是一遇到问题就新开数组，也是双指针的入门题。",
        approaches: [
          {
            id: "extra",
            label: "额外数组法",
            summary: "先收集所有非零元素，再把剩余位置补 0。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "这种写法容易对，但没有利用“原地修改”的要求。面试官往往会继续追问：能不能不用额外数组？",
            code: `def move_zeroes(nums):
    non_zero = []

    # 第一步：收集所有非零元素
    for x in nums:
        if x != 0:
            non_zero.append(x)

    # 第二步：把非零元素写回原数组前面
    for i in range(len(non_zero)):
        nums[i] = non_zero[i]

    # 第三步：剩余位置补 0
    for i in range(len(non_zero), len(nums)):
        nums[i] = 0`
          },
          {
            id: "two-pointers",
            label: "双指针原地法",
            summary: "慢指针记录下一个非零元素应该放的位置，快指针负责扫描。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "优化点不在时间，而在空间。它体现了数组题里最重要的原地覆盖思维。",
            code: `def move_zeroes_fast(nums):
    slow = 0  # slow 指向下一个应该放非零元素的位置

    for fast in range(len(nums)):
        # 只有遇到非零元素时，才需要把它放到前面
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1`
          }
        ],
        takeaway: [
          "数组原地题要主动思考能否用双指针减少空间",
          "slow / fast 是面试里非常常见的套路",
          "同样是 O(n)，空间 O(1) 和 O(n) 的含义完全不同"
        ]
      },
      {
        title: "删除有序数组中的重复项",
        pattern: "覆盖写入",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定有序数组，原地删除重复元素，使每个元素只出现一次，并返回新长度。",
        whyAsk:
          "这题要求你利用“有序”条件，在同一个数组里完成去重。它特别锻炼你对下标和覆盖写入的感觉。",
        approaches: [
          {
            id: "rewrite",
            label: "集合去重后重写",
            summary: "先去重，再把结果写回原数组。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "虽然时间不差，但没利用有序性质，也没有体现原地处理的价值。",
            code: `def remove_duplicates(nums):
    unique = []
    seen = set()

    for x in nums:
        if x not in seen:
            seen.add(x)
            unique.append(x)

    for i in range(len(unique)):
        nums[i] = unique[i]

    return len(unique)`
          },
          {
            id: "cover",
            label: "双指针覆盖法",
            summary: "慢指针维护有效区间末尾，快指针扫描新值。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "因为数组有序，重复值一定连在一起，所以比较当前值和有效区间末尾即可。",
            code: `def remove_duplicates_fast(nums):
    if not nums:
        return 0

    slow = 0  # nums[0:slow+1] 是去重后的有效区间

    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]

    return slow + 1`
          }
        ],
        takeaway: [
          "有序数组里，重复值相邻这一点非常关键",
          "覆盖写入是数组原地题的常见手法",
          "看到“返回新长度”时，要明确 slow 指针的语义"
        ]
      },
      {
        title: "合并两个有序数组",
        pattern: "从后往前覆盖",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定两个有序数组 nums1 和 nums2，把 nums2 合并到 nums1 中，结果仍保持有序。",
        whyAsk:
          "这题是数组题里很有代表性的“从后往前填”技巧。它能训练你从空间布局反推指针移动方向。",
        approaches: [
          {
            id: "sortall",
            label: "拼接后排序",
            summary: "先把两个数组拼起来，再整体排序。",
            complexity: "时间 O((m+n) log(m+n)) · 空间 O(1) 或 O(m+n)",
            explanation:
              "这种写法能完成任务，但完全忽略了两个数组本来就是有序的事实。",
            code: `def merge(nums1, m, nums2, n):
    # 把 nums2 拷到 nums1 后面
    nums1[m:m+n] = nums2

    # 再整体排序
    nums1.sort()`
          },
          {
            id: "backfill",
            label: "从后往前填",
            summary: "从两个数组的末尾开始比较，把较大的值写到 nums1 的最后位置。",
            complexity: "时间 O(m+n) · 空间 O(1)",
            explanation:
              "因为 nums1 末尾本来就留了空位，所以从后往前填可以避免覆盖还没比较过的元素。",
            code: `def merge_fast(nums1, m, nums2, n):
    i = m - 1          # nums1 有效部分的末尾
    j = n - 1          # nums2 的末尾
    write = m + n - 1  # 最后一个可写位置

    while j >= 0:
        # 只有当 nums1 还有值，且 nums1 当前值更大时，才先放 nums1 的值
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[write] = nums1[i]
            i -= 1
        else:
            nums1[write] = nums2[j]
            j -= 1

        write -= 1`
          }
        ],
        takeaway: [
          "原地合并时，指针方向往往由“哪里有空位”决定",
          "从后往前填是很重要的数组技巧",
          "看到“两个有序数组”要立刻想到双指针"
        ]
      }
    ],
    implementation: [
      "先判断题目是否允许原地修改，如果允许，优先思考双指针",
      "区分读指针和写指针的职责，避免边遍历边乱改",
      "如果题目给了有序条件，优先考虑相邻比较、覆盖写入或从后往前填"
    ],
    complexityNotes: [
      "list 按下标访问通常是 O(1)，因为能够直接定位",
      "头插、中间插删通常是 O(n)，因为可能触发整体搬移",
      "很多数组题的优化目标不是降时间，而是把空间从 O(n) 压到 O(1)"
    ],
    applications: [
      "日志清洗、批量数据规整、原地过滤都经常使用数组原地覆盖思路",
      "前端列表渲染、表格处理、数据管道中的顺序扫描也依赖数组的连续访问特性",
      "很多更复杂的技巧，例如前缀和、滑动窗口、双指针，本质上都以数组为舞台"
    ],
    summary: "数组题的关键不是会不会遍历，而是会不会控制“位置”和“移动成本”。",
    quiz: [
      {
        prompt: "Python list 中，按下标访问 nums[i] 的平均时间复杂度通常是？",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 0,
        feedback: "因为 list 可以根据下标直接定位到对应位置。"
      },
      {
        prompt: "为什么 list 头插通常比尾插慢？",
        options: ["因为头部元素更难读取", "因为后面的元素可能整体后移", "因为 Python 会自动排序", "因为头插一定会复制整个数组两次"],
        answer: 1,
        feedback: "头插的主要代价是后续元素腾位置，而不是读取本身。"
      },
      {
        prompt: "合并两个有序数组时，为什么常常从后往前写？",
        options: ["因为倒着看更容易", "因为末尾有空位，能避免覆盖未比较元素", "因为这样复杂度更高", "因为 Python 只能倒序赋值"],
        answer: 1,
        feedback: "这正是原地合并的关键：利用末尾空位避免提前覆盖数据。"
      }
    ],
    visual: { type: "array" }
  },
  {
    id: "linked-list",
    order: "03",
    title: "链表",
    subtitle: "用指针连接节点，而不是依赖连续空间",
    heroSummary:
      "链表的重点不是背结构定义，而是理解为什么它适合频繁插删、为什么访问慢，以及怎么用指针安全地改链。",
    path: "面试导向系统课",
    duration: "28 min",
    difficulty: "基础到中等",
    outcome: "指针操作意识",
    visualTitle: "链表指针改链演示",
    visualSubtitle: "看节点如何被重新连接，理解为什么链表题关键是改指针而不是搬元素。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么数组之外还需要链表",
        body:
          "数组依赖连续空间，随机访问快，但中间插删成本高。链表把每个节点分散存储，再用指针把它们连起来，于是插入和删除只需要改连接关系，不需要整体搬动元素。",
        bullets: [
          "它解决的是“插删频繁时搬移成本高”的问题",
          "它牺牲随机访问，换来局部改动更灵活",
          "很多缓存结构、队列实现、图结构都离不开链表思维"
        ]
      },
      {
        label: "痛点",
        title: "为什么链表题容易写挂",
        body:
          "因为链表题的核心不是遍历，而是指针安全。你只要少存一个 next，或者改链顺序错了，就可能把后续节点丢掉。",
        bullets: [
          "访问第 k 个节点必须从头走，不能直接跳",
          "删除和插入前要先找到前驱节点",
          "改链时顺序错了，容易断链"
        ],
        keyLine: "链表题真正考的是“指针关系管理能力”。"
      },
      {
        label: "核心思想",
        title: "把链表理解成一个个节点互相指向",
        body:
          "链表里每个节点都知道“下一个是谁”，但不知道自己在第几个位置。所以插入/删除的本质，是修改几个节点的 next 指向；访问的本质，是顺着 next 一步一步走。",
        bullets: [
          "插删快：因为只改局部指针",
          "访问慢：因为要从头走",
          "虚拟头节点 dummy 是处理边界问题的重要工具"
        ]
      }
    ],
    examples: [
      {
        title: "删除链表中的节点",
        pattern: "改前驱指针",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "删除链表中等于给定值 val 的所有节点。",
        whyAsk:
          "这题是 dummy 节点和指针删除思维的标准入门题，尤其适合讲透边界情况。",
        approaches: [
          {
            id: "special",
            label: "分类讨论头节点",
            summary: "先单独处理头节点，再逐步删除中间节点。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "能做，但边界处理很绕，一旦题目变化就容易漏掉头节点重复删除的情况。",
            code: `def remove_elements(head, val):
    # 先把头部连续等于 val 的节点全部跳过
    while head and head.val == val:
        head = head.next

    current = head

    while current and current.next:
        # 发现下一个节点需要删除，就直接跳过去
        if current.next.val == val:
            current.next = current.next.next
        else:
            current = current.next

    return head`
          },
          {
            id: "dummy",
            label: "dummy 节点法",
            summary: "在头节点前面放一个虚拟头节点，统一所有删除逻辑。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "dummy 的价值是把“删头节点”和“删中间节点”统一成同一种操作，让代码更稳定、更面试化。",
            code: `def remove_elements_fast(head, val):
    dummy = ListNode(0, head)  # dummy.next 指向原始头节点
    current = dummy

    while current.next:
        if current.next.val == val:
            # 直接跳过当前需要删除的节点
            current.next = current.next.next
        else:
            current = current.next

    return dummy.next`
          }
        ],
        takeaway: [
          "dummy 节点是链表题的重要模板",
          "删除节点本质上是改前驱节点的 next",
          "统一边界比单独分类讨论更稳定"
        ]
      },
      {
        title: "反转链表",
        pattern: "指针重连",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "反转一个单链表，并返回反转后的头节点。",
        whyAsk:
          "这题是链表题最经典的模板题，几乎必考。它能看出你是否能安全地保存 next 并逐步改链。",
        approaches: [
          {
            id: "stack",
            label: "借助数组/栈",
            summary: "先把节点收集起来，再倒序重连。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "思路容易想到，但没有体现链表原地改指针的价值，也多用了额外空间。",
            code: `def reverse_list(head):
    nodes = []
    current = head

    # 先把所有节点收集起来
    while current:
        nodes.append(current)
        current = current.next

    # 没有节点时直接返回
    if not nodes:
        return None

    # 倒序重连
    for i in range(len(nodes) - 1, 0, -1):
        nodes[i].next = nodes[i - 1]

    nodes[0].next = None
    return nodes[-1]`
          },
          {
            id: "iterative",
            label: "三指针迭代",
            summary: "遍历链表时，逐个把当前节点的 next 指向前一个节点。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "这是链表改链题最经典的模板。关键在于每次改指针前，先保存原来的 next。",
            code: `def reverse_list_fast(head):
    prev = None
    current = head

    while current:
        next_node = current.next   # 先保存后继，防止断链
        current.next = prev        # 反转当前节点指向
        prev = current             # prev 向前移动
        current = next_node        # current 继续向后走

    return prev`
          }
        ],
        takeaway: [
          "改链顺序的关键是：先存 next，再改 current.next",
          "prev / current / next 是必须熟练的链表模板",
          "链表题里很多复杂题都能拆成这个模板"
        ]
      },
      {
        title: "找链表中间节点",
        pattern: "快慢指针",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "返回链表的中间节点。如果有两个中间节点，返回第二个。",
        whyAsk:
          "这题是快慢指针最典型的入门题，也是后面判断环、找倒数节点的基础。",
        approaches: [
          {
            id: "count",
            label: "先计数再走",
            summary: "先遍历一次统计长度，再走到中间位置。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "能做，但需要两次遍历。它的意义主要在于给出一个基准方案。",
            code: `def middle_node(head):
    length = 0
    current = head

    while current:
        length += 1
        current = current.next

    current = head
    for _ in range(length // 2):
        current = current.next

    return current`
          },
          {
            id: "fastslow",
            label: "快慢指针",
            summary: "快指针每次走两步，慢指针每次走一步，快指针到尾时慢指针刚好在中间。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "快慢指针是链表题里极其重要的统一思维，很多看似不同的问题都能转成它。",
            code: `def middle_node_fast(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow`
          }
        ],
        takeaway: [
          "快慢指针是链表题的核心套路之一",
          "双倍速度差经常对应中点、倒数、环检测",
          "链表无法随机访问，所以用“速度关系”替代“下标关系”"
        ]
      }
    ],
    implementation: [
      "先判断题目是在考遍历、删除、插入，还是反转",
      "删除和插入通常先找前驱，必要时用 dummy 统一边界",
      "改链时优先保存 next，避免断链"
    ],
    complexityNotes: [
      "链表按位置访问通常是 O(n)，因为必须从头走",
      "已知前驱节点时，插入和删除可以做到 O(1)",
      "很多链表优化不一定改变时间，而是让指针操作更安全、更简洁"
    ],
    applications: [
      "LRU 缓存、任务队列、浏览器前进后退等场景都能看到链表思想",
      "很多底层容器用链表处理频繁插删，因为不需要整体搬动元素",
      "链表题训练的是指针管理，这对理解树和图也很重要"
    ],
    summary: "链表题真正考的不是遍历，而是你能不能安全地管理节点关系。",
    quiz: [
      {
        prompt: "链表为什么插入和删除通常比数组灵活？",
        options: ["因为链表能随机访问", "因为只需要改局部指针，不用整体搬动元素", "因为链表一定更省空间", "因为链表会自动排序"],
        answer: 1,
        feedback: "这正是链表存在的核心意义：局部改动代价低。"
      },
      {
        prompt: "反转链表时，为什么要先保存 next_node？",
        options: ["为了更好看", "为了避免 current.next 改掉后丢失后续链", "为了降低时间复杂度", "因为 Python 语法要求"],
        answer: 1,
        feedback: "链表题最怕断链，先存后继是标准动作。"
      },
      {
        prompt: "dummy 节点最常用来解决什么问题？",
        options: ["提高随机访问速度", "统一头节点和中间节点的边界处理", "减少空间复杂度", "避免快慢指针"],
        answer: 1,
        feedback: "dummy 的最大价值就是让边界更统一。"
      }
    ],
    visual: { type: "linked" }
  },
  {
    id: "stack-queue",
    order: "04",
    title: "栈与队列",
    subtitle: "顺序受限的数据流管理",
    heroSummary:
      "栈是后进先出，队列是先进先出。它们看起来简单，却是括号匹配、层序遍历、任务调度等大量题目的基础。",
    path: "面试导向系统课",
    duration: "26 min",
    difficulty: "基础",
    outcome: "受限顺序思维",
    visualTitle: "入栈 / 出栈 / 入队 / 出队演示",
    visualSubtitle: "看元素如何按规则流动，理解“后进先出”和“先进先出”的差别。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么需要受限访问的数据结构",
        body:
          "有些场景不需要任意位置访问，只需要保证一种严格顺序。比如函数调用要后进先出，任务排队要先进先出。栈和队列就是为这种“受限顺序”问题设计的。",
        bullets: [
          "栈解决的是“最近进入的先处理”",
          "队列解决的是“先来的先处理”",
          "很多看似复杂的问题，本质上就是顺序约束"
        ]
      },
      {
        label: "痛点",
        title: "为什么做题时经常该用栈却没想到",
        body:
          "因为很多人只看题面，不去识别数据流顺序。只要题目涉及最近匹配、回退、括号配对、单调维护、层序推进，就要高度敏感。",
        bullets: [
          "最近一个未处理对象，常对应栈",
          "按层扩散、排队处理，常对应队列",
          "Python 里 list 和 deque 的选择也很重要"
        ],
        keyLine: "识别顺序约束，是栈和队列题的核心。"
      },
      {
        label: "核心思想",
        title: "别把它们只看成容器，要看成规则",
        body:
          "栈强调后进先出，队列强调先进先出。算法题里真正关键的，不是容器名字，而是你能不能看出题目数据流应该按什么顺序被处理。",
        bullets: [
          "括号配对、本地回退、最近更大更小值，常用栈",
          "层序遍历、消息消费、最短步数扩散，常用队列",
          "Python 里队列通常优先用 collections.deque"
        ]
      }
    ],
    examples: [
      {
        title: "有效括号",
        pattern: "匹配关系",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定只包含括号的字符串，判断括号是否有效匹配。",
        whyAsk:
          "这题是栈最标准的模板题，几乎所有算法学习都会从这里建立“最近未匹配对象”的直觉。",
        approaches: [
          {
            id: "replace",
            label: "字符串替换法",
            summary: "反复删除成对括号，直到不能再删为止。",
            complexity: "时间 O(n²) · 空间 O(n)",
            explanation:
              "能做，但效率低，而且没有抓住问题本质：我们真正关心的是“最近一个还没匹配的左括号”。",
            code: `def is_valid(s):
    changed = True

    while changed:
        changed = False
        for pair in ("()", "[]", "{}"):
            if pair in s:
                s = s.replace(pair, "")
                changed = True

    return s == ""`
          },
          {
            id: "stack",
            label: "栈匹配",
            summary: "遇到左括号入栈，遇到右括号就和栈顶左括号匹配。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "最近一个未匹配左括号，天然就是栈顶。只要你识别出“最近匹配”关系，栈就非常自然。",
            code: `def is_valid_fast(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for ch in s:
        # 左括号直接入栈，等待未来匹配
        if ch not in pairs:
            stack.append(ch)
        else:
            # 栈空或栈顶不是匹配的左括号，都说明无效
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    # 全部处理完后，栈必须为空才说明完全匹配
    return not stack`
          }
        ],
        takeaway: [
          "最近一个未匹配对象，常常就是栈顶",
          "有效括号是识别栈题的第一道门",
          "栈题常用 push / pop / peek 三个动作表达"
        ]
      },
      {
        title: "用队列实现层序遍历",
        pattern: "按层推进",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定二叉树，按层序遍历返回节点值。",
        whyAsk:
          "这题是队列在树问题里的最经典应用。即使你还没系统学树，也可以先理解“先进先出”为什么适合按层扩散。",
        approaches: [
          {
            id: "recursive",
            label: "递归按层收集",
            summary: "用递归记录深度，再把值放进对应层级。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "能做，但它隐藏了层序遍历真正的顺序控制本质：谁先进入，谁先处理。",
            code: `def level_order(root):
    levels = []

    def dfs(node, depth):
        if not node:
            return

        if depth == len(levels):
            levels.append([])

        levels[depth].append(node.val)
        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)

    dfs(root, 0)
    return levels`
          },
          {
            id: "queue",
            label: "队列层序法",
            summary: "把每一层待处理节点放进队列，先进先出地处理。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "层序遍历的本质就是“这一层先处理完，再进入下一层”，而队列正好保证这种顺序。",
            code: `from collections import deque

def level_order_fast(root):
    if not root:
        return []

    queue = deque([root])
    result = []

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()  # 队首节点最先进入，也最先处理
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`
          }
        ],
        takeaway: [
          "按层推进、按波次扩散，通常优先想到队列",
          "Python 做队列优先用 deque，而不是 list.pop(0)",
          "BFS 的很多场景都能抽象成队列推进"
        ]
      },
      {
        title: "最小栈",
        pattern: "辅助结构",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "设计一个支持 push、pop、top 和 getMin 的栈，并且 getMin 需要 O(1)。",
        whyAsk:
          "这题用来考察你是否能在基本结构上再附加一个辅助结构，保持操作复杂度稳定。",
        approaches: [
          {
            id: "scanmin",
            label: "每次扫描最小值",
            summary: "普通栈保存所有元素，需要最小值时重新遍历。",
            complexity: "push/pop O(1) · getMin O(n)",
            explanation:
              "问题不在栈本身，而在额外需求。只用一个栈时，最小值查询没法稳定做到常数级。",
            code: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        self.stack.append(val)

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        # 每次都重新找最小值，代价是 O(n)
        return min(self.stack)`
          },
          {
            id: "assist",
            label: "辅助最小栈",
            summary: "除了主栈外，再维护一个“到当前位置为止的最小值栈”。",
            complexity: "所有操作均摊 O(1) · 空间 O(n)",
            explanation:
              "这题的关键是：在 push 时顺手把“当前最小值”也记录下来，未来查询就不必重新扫描。",
            code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)

        if not self.min_stack:
            self.min_stack.append(val)
        else:
            # 当前位置的最小值 = 新值 和 之前最小值 的较小者
            self.min_stack.append(min(val, self.min_stack[-1]))

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]`
          }
        ],
        takeaway: [
          "很多设计题的关键是“辅助结构同步维护”",
          "不是所有优化都降低主流程复杂度，有时是稳定关键操作复杂度",
          "栈设计题要特别关注每个操作的时间保证"
        ]
      }
    ],
    implementation: [
      "先识别题目需要的是 LIFO 还是 FIFO 顺序",
      "如果是最近匹配、回退、撤销，优先考虑栈",
      "如果是按层、按波次、按先来先服务推进，优先考虑队列"
    ],
    complexityNotes: [
      "栈的 push/pop/top 通常都是 O(1)",
      "队列如果用 deque，则 append/popleft 都是 O(1)",
      "很多设计题的难点不在大 O，而在能否保证每个操作都稳定"
    ],
    applications: [
      "函数调用栈、浏览器撤销、表达式求值都使用栈思想",
      "消息队列、任务调度、BFS、网络请求缓冲都使用队列思想",
      "单调栈、单调队列是后续更高级算法技巧的重要基础"
    ],
    summary: "栈和队列最重要的不是名字，而是你能否识别出题目想要的数据流顺序。",
    quiz: [
      {
        prompt: "“最近一个还没配对的左括号”最自然对应哪种结构？",
        options: ["队列", "栈", "哈希表", "链表"],
        answer: 1,
        feedback: "最近未处理对象通常就是栈顶。"
      },
      {
        prompt: "Python 中实现高效队列时，通常优先选择什么？",
        options: ["list", "dict", "set", "collections.deque"],
        answer: 3,
        feedback: "因为 deque 的 popleft 是 O(1)，而 list.pop(0) 通常是 O(n)。"
      },
      {
        prompt: "最小栈为什么需要辅助栈？",
        options: ["为了减少空间", "为了让 getMin 保持 O(1)", "为了更容易排序", "为了更容易递归"],
        answer: 1,
        feedback: "辅助栈的作用就是把“当前最小值”实时维护下来。"
      }
    ],
    visual: { type: "stackqueue" }
  },
  {
    id: "binary-search",
    order: "05",
    title: "二分查找",
    subtitle: "利用有序性把搜索空间不断砍半",
    heroSummary:
      "二分查找不只是一个题型，而是一种“缩小搜索空间”的思维方式。掌握它，你会更容易进入边界查找、答案二分和单调性问题。",
    path: "面试导向系统课",
    duration: "28 min",
    difficulty: "基础到中等",
    outcome: "二分缩规模思维",
    visualTitle: "二分查找区间收缩演示",
    visualSubtitle: "看 left、right、mid 如何不断逼近答案，理解为什么它是 O(log n)。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么有序信息值得珍惜",
        body:
          "当数据已经有序时，继续从头扫到尾是一种浪费。二分查找就是为了最大化利用“有序”这一条件：每做一次比较，就排除掉一半不可能的区域。",
        bullets: [
          "它诞生于“如何更快查找”的古老问题",
          "它依赖有序性或单调性",
          "它是很多高级题型的原型，例如边界二分、答案二分"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人会写错二分",
        body:
          "因为二分不是“猜中间”这么简单，真正难的是边界语义。left、right 表示什么区间，mid 命中后是返回还是继续压边界，必须统一。",
        bullets: [
          "边界语义不统一，最容易死循环",
          "找值和找边界，写法并不完全一样",
          "面试官常考的是你是否知道为什么这么写"
        ],
        keyLine: "二分的本质不是找中点，而是每一步都正确排除一半答案。"
      },
      {
        label: "核心思想",
        title: "每次比较后，只保留唯一可能有答案的一半",
        body:
          "只要数组有序，就可以根据 nums[mid] 和 target 的关系，决定答案只可能在左半还是右半。你不需要知道答案在哪，但你可以不断缩小它的可能范围。",
        bullets: [
          "有序 + 可比较，是二分的关键前提",
          "left、right 控制有效搜索区间",
          "边界题命中后不一定能立刻停"
        ]
      }
    ],
    examples: [
      {
        title: "标准二分查找",
        pattern: "模板题",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "在升序数组中查找 target，返回下标，不存在返回 -1。",
        whyAsk:
          "这是所有二分题的起点。你必须先把这个模板写稳，后面边界题才有基础。",
        approaches: [
          {
            id: "linear",
            label: "线性查找",
            summary: "直接从头扫到尾，逻辑简单但浪费了有序条件。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "线性查找的意义在于对比。面试里你可以先快速给出，再说明为什么有序数组不该停在这里。",
            code: `def search_linear(nums, target):
    for index, value in enumerate(nums):
        if value == target:
            return index
    return -1`
          },
          {
            id: "binary",
            label: "标准二分",
            summary: "用 left 和 right 收缩搜索区间，直到 mid 命中或区间为空。",
            complexity: "时间 O(log n) · 空间 O(1)",
            explanation:
              "每次排除一半区间，所以最多比较 log n 轮。二分越重要的不是记代码，而是知道每一行在维护什么不变量。",
            code: `def search_binary(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`
          }
        ],
        takeaway: [
          "要把 left、right、mid 的语义讲清楚",
          "每次更新边界时，必须能解释排除了哪一半",
          "标准模板稳了，后面边界题才不会乱"
        ]
      },
      {
        title: "搜索插入位置",
        pattern: "边界二分",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "在升序数组中找到 target 应插入的位置，如果存在则返回其下标。",
        whyAsk:
          "它是从“找元素”过渡到“找边界”的经典一题。很多人会在这里第一次真正理解二分不只是找值。",
        approaches: [
          {
            id: "scan",
            label: "顺序扫描",
            summary: "从左到右找到第一个大于等于 target 的位置。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation:
              "这依然能做，但没利用有序数组最大的价值。它的意义在于帮助你理解：插入位置本质上是某个边界。",
            code: `def search_insert_scan(nums, target):
    for i, value in enumerate(nums):
        if value >= target:
            return i

    return len(nums)`
          },
          {
            id: "boundary",
            label: "左边界二分",
            summary: "始终逼近第一个大于等于 target 的位置。",
            complexity: "时间 O(log n) · 空间 O(1)",
            explanation:
              "这题的关键在于：即使命中 target，也不能立刻停，因为你要的是插入位置，本质上是左边界。",
            code: `def search_insert(nums, target):
    left, right = 0, len(nums) - 1
    answer = len(nums)  # 默认插到末尾

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] >= target:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1

    return answer`
          }
        ],
        takeaway: [
          "边界二分的关键是命中后不一定停止",
          "找插入位置，本质上是在找第一个满足条件的位置",
          "answer 变量是边界二分里很常见的写法"
        ]
      },
      {
        title: "寻找第一个和最后一个位置",
        pattern: "双边界查找",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "在升序数组中找到目标值第一次和最后一次出现的位置。",
        whyAsk:
          "这题是标准的二分进阶题，能检验你是否真的把“边界二分”学会了。",
        approaches: [
          {
            id: "expand",
            label: "命中后向两边扩散",
            summary: "先用线性或普通二分找到一个位置，再向左右扩散。",
            complexity: "最坏时间 O(n) · 空间 O(1)",
            explanation:
              "在重复元素很多时，向两边扩散会退化。它说明“找到一个位置”和“找到边界”不是同一件事。",
            code: `def search_range(nums, target):
    pos = -1

    for i, value in enumerate(nums):
        if value == target:
            pos = i
            break

    if pos == -1:
        return [-1, -1]

    left = right = pos
    while left - 1 >= 0 and nums[left - 1] == target:
        left -= 1
    while right + 1 < len(nums) and nums[right + 1] == target:
        right += 1

    return [left, right]`
          },
          {
            id: "twobounds",
            label: "两次边界二分",
            summary: "分别找左边界和右边界，最后组合答案。",
            complexity: "时间 O(log n) · 空间 O(1)",
            explanation:
              "边界题最稳定的解法，往往是把左右边界拆开分别求解。",
            code: `def search_range_fast(nums, target):
    def lower_bound():
        left, right = 0, len(nums) - 1
        answer = len(nums)

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] >= target:
                answer = mid
                right = mid - 1
            else:
                left = mid + 1

        return answer

    def upper_bound():
        left, right = 0, len(nums) - 1
        answer = -1

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] <= target:
                answer = mid
                left = mid + 1
            else:
                right = mid - 1

        return answer

    left = lower_bound()
    right = upper_bound()

    if left <= right and right != -1 and left < len(nums) and nums[left] == target:
        return [left, right]
    return [-1, -1]`
          }
        ],
        takeaway: [
          "找到一个位置，不等于找到边界",
          "左右边界最好拆开独立处理",
          "边界二分最重要的是不变量和答案更新时机"
        ]
      }
    ],
    implementation: [
      "先确认是否满足“有序 / 单调”这个二分前提",
      "统一边界语义：当前区间是闭区间 [left, right] 还是其他形式",
      "每次更新边界时，都要能说出排除了哪一部分"
    ],
    complexityNotes: [
      "标准二分查找时间复杂度是 O(log n)，因为每轮规模减半",
      "空间复杂度通常是 O(1)，因为只使用常数个指针变量",
      "边界二分的难点不在复杂度，而在正确维护不变量"
    ],
    applications: [
      "数据库索引、搜索建议、版本定位都使用有序与二分思想",
      "很多看似不是查找的问题，也可以做“答案二分”，例如最小可行值、最大满足值",
      "容量规划和参数调优中，只要存在单调性，就经常可以考虑二分"
    ],
    summary: "二分查找不是背模板，而是在有序世界里持续砍掉不可能区间。",
    quiz: [
      {
        prompt: "二分查找能够成立，最核心的前提是什么？",
        options: ["数组长度是偶数", "数组元素互不相同", "数据有序或满足单调性", "数组只能有整数"],
        answer: 2,
        feedback: "没有有序性或单调性，就无法根据 mid 的结果排除一半区间。"
      },
      {
        prompt: "搜索插入位置时，为什么命中 target 还常常要继续收缩边界？",
        options: ["为了让代码更短", "为了找最左可行位置", "为了减少空间复杂度", "因为 mid 不能返回"],
        answer: 1,
        feedback: "这题找的是左边界，不只是“有没有”。"
      },
      {
        prompt: "标准闭区间二分里，循环条件最常见写法是什么？",
        options: ["left < right", "left <= right", "left != right", "left >= 0"],
        answer: 1,
        feedback: "在闭区间 [left, right] 写法里，通常使用 left <= right。"
      }
    ],
    visual: { type: "binary" }
  },
  {
    id: "hash-table",
    order: "06",
    title: "哈希表与字典",
    subtitle: "把重复查找变成常数级命中",
    heroSummary:
      "dict 和 set 是 Python 刷题的核心武器之一。只要题目涉及快速判断、计数、去重、索引映射，你都应该第一时间想到它们。",
    path: "面试导向系统课",
    duration: "28 min",
    difficulty: "基础到中等",
    outcome: "哈希优化意识",
    visualTitle: "哈希命中与两数之和演示",
    visualSubtitle: "看元素如何进入桶，补数如何命中，理解“用空间换时间”的直观含义。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么我们需要比线性查找更快的结构",
        body:
          "如果每次判断一个值是否存在，都要从头扫到尾，很多程序会慢得无法接受。哈希表的目标，就是把“查找某个值”从线性扫描变成接近常数级命中。",
        bullets: [
          "它解决的是快速定位问题",
          "它广泛用于缓存、索引、计数和映射",
          "Python 的 dict 和 set 就是最常用的哈希结构"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多题会卡在重复查找上",
        body:
          "很多暴力题并不是因为遍历本身慢，而是因为你在遍历过程中不断做线性查找。两数之和、字母异位词、字符串去重，本质瓶颈都是“我要快速知道某个值是否出现过”。",
        bullets: [
          "重复查找导致 O(n²) 非常常见",
          "计数类题如果不用哈希，代码往往又慢又绕",
          "哈希表的代价是空间上升，但换来很大的时间收益"
        ],
        keyLine: "只要题目在问“是否存在 / 出现几次 / 对应位置在哪”，就要高度警惕哈希表。"
      },
      {
        label: "核心思想",
        title: "把值映射到位置，而不是每次都重新找",
        body:
          "哈希表的本质，是提前记录信息，避免未来重复工作。对做题来说，最重要的不是底层公式，而是你能否想到：我能不能把需要的信息先存起来，后面直接命中？",
        bullets: [
          "set 适合做存在性判断和去重",
          "dict 适合做值到下标、字符到次数等映射",
          "哈希表最典型的 trade-off 是空间换时间"
        ]
      }
    ],
    examples: [
      {
        title: "两数之和",
        pattern: "值到下标映射",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定数组 nums 和目标值 target，返回两数之和等于 target 的两个下标。",
        whyAsk:
          "这是哈希表章节最经典的代表题，面试官几乎用它来直接判断你是否具备哈希优化意识。",
        approaches: [
          {
            id: "brute",
            label: "暴力双循环",
            summary: "枚举所有二元组，只要找到就返回两个下标。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation:
              "暴力法逻辑简单，但每个元素都要继续向后配对，数据量一大时会明显变慢。",
            code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

    return []`
          },
          {
            id: "optimized",
            label: "一次遍历哈希",
            summary: "记录“某个值第一次出现在哪”，遍历到当前值时立刻检查补数。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "真正关键的转换是：把“再去找另一个数”变成“直接查字典里有没有需要的补数”。",
            code: `def two_sum_fast(nums, target):
    seen = {}  # 键：数字本身，值：它出现过的下标

    for i, x in enumerate(nums):
        need = target - x

        # 如果补数已经出现过，直接得到答案
        if need in seen:
            return [seen[need], i]

        # 先判断，再记录当前元素，避免自己和自己配对
        seen[x] = i

    return []`
          }
        ],
        takeaway: [
          "dict 常见用途之一是“值 -> 下标”映射",
          "遍历顺序和记录时机经常决定代码是否正确",
          "面试里一定要能解释为什么先查再存"
        ]
      },
      {
        title: "有效的字母异位词",
        pattern: "频次统计",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "给定两个字符串 s 和 t，判断它们是否互为字母异位词。",
        whyAsk:
          "这题很经典，因为它能直接考你是否会把字符问题转成频次统计问题。",
        approaches: [
          {
            id: "sort",
            label: "排序对比",
            summary: "把两个字符串排序后比较是否相同。",
            complexity: "时间 O(n log n) · 空间 O(n)",
            explanation:
              "排序法很好理解，但没有抓住题目本质：我们真正关心的是每个字符出现次数是否一致。",
            code: `def is_anagram_sort(s, t):
    # 排序后完全相同，说明字符构成一致
    return sorted(s) == sorted(t)`
          },
          {
            id: "count",
            label: "哈希计数",
            summary: "统计两个字符串中每个字符的出现次数，再比较计数字典。",
            complexity: "时间 O(n) · 空间 O(k)",
            explanation:
              "字符类题目里，频次统计是最常见的哈希用法之一。它比排序更贴近问题本质。",
            code: `def is_anagram_count(s, t):
    if len(s) != len(t):
        return False

    counter = {}

    for ch in s:
        counter[ch] = counter.get(ch, 0) + 1

    for ch in t:
        if ch not in counter:
            return False

        counter[ch] -= 1

        # 次数减到负数，说明 t 中这个字符出现过多
        if counter[ch] < 0:
            return False

    return True`
          }
        ],
        takeaway: [
          "字符题常常可以转成频次数组或字典问题",
          "排序是可用方案，但频次统计更贴近哈希思维",
          "要有存在性和频次两类哈希意识"
        ]
      },
      {
        title: "最长连续序列",
        pattern: "集合跳过重复工作",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定一个未排序数组，求最长连续序列的长度。",
        whyAsk:
          "这题很能体现哈希表不只是查一个值，还能帮助你跳过不必要的重复工作。",
        approaches: [
          {
            id: "sortway",
            label: "排序后扫描",
            summary: "先排序，再统计连续段长度。",
            complexity: "时间 O(n log n) · 空间 O(1) 或 O(n)",
            explanation:
              "排序法很自然，但它没有达到这题更理想的线性级目标。",
            code: `def longest_consecutive(nums):
    if not nums:
        return 0

    nums.sort()
    best = 1
    current = 1

    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            continue
        if nums[i] == nums[i - 1] + 1:
            current += 1
        else:
            best = max(best, current)
            current = 1

    return max(best, current)`
          },
          {
            id: "setscan",
            label: "集合起点法",
            summary: "只从连续序列的起点开始往后扩展，避免重复扫描。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "核心优化点不是单次查找，而是识别“谁才值得作为起点开始扩展”。",
            code: `def longest_consecutive_fast(nums):
    num_set = set(nums)
    best = 0

    for x in num_set:
        # 只有当 x-1 不存在时，x 才是某段连续序列的起点
        if x - 1 not in num_set:
            current = x
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            best = max(best, length)

    return best`
          }
        ],
        takeaway: [
          "哈希优化不只是把查找变快，也可以避免重复扩展",
          "看到“连续”“存在”“未排序”时，要考虑 set",
          "识别起点，是这题从 O(n log n) 到 O(n) 的关键"
        ]
      }
    ],
    implementation: [
      "先识别题目是在问存在性、计数，还是索引映射",
      "如果是存在性判断，优先考虑 set；如果是映射或计数，优先考虑 dict",
      "遍历时要想清楚是先查后存还是先存后查"
    ],
    complexityNotes: [
      "dict / set 的查找和插入平均是 O(1)，这是哈希优化成立的基础",
      "哈希表不是免费午餐，它通常要付出 O(n) 额外空间",
      "哈希碰撞会影响常数，但面试里重点仍是平均复杂度与适用场景"
    ],
    applications: [
      "缓存系统、数据库索引、权限映射、去重流程都大量使用哈希表",
      "日志聚合、词频统计、用户画像标签统计，本质上都是计数型哈希问题",
      "实时业务中，是否存在、是否重复、对应关系查找，几乎都离不开 dict / set"
    ],
    summary: "哈希表真正厉害的地方，不是神秘，而是帮你避免“重复找同一件事”。",
    quiz: [
      {
        prompt: "题目要求快速判断一个值是否已经出现过，第一反应最应该想到什么？",
        options: ["递归", "set", "栈", "二叉树遍历"],
        answer: 1,
        feedback: "存在性判断和去重，是 set 最经典的使用场景。"
      },
      {
        prompt: "为什么两数之和的一次遍历哈希写法要先查补数再存当前值？",
        options: ["为了代码更短", "为了避免一个元素和自己配对", "因为字典不能覆盖", "因为这样空间更小"],
        answer: 1,
        feedback: "先查后存可以防止当前元素被自己错误命中。"
      },
      {
        prompt: "最长连续序列的集合写法，为什么只从“起点”开始扩展？",
        options: ["为了更容易排序", "为了避免重复扫描同一段序列", "为了节省哈希空间", "因为 set 只能正向查"],
        answer: 1,
        feedback: "如果不是起点就扩展，会把同一段连续序列重复计算很多遍。"
      }
    ],
    visual: { type: "hash" }
  },
  {
    id: "tree",
    order: "07",
    title: "树与二叉树",
    subtitle: "从线性结构进入层级结构",
    heroSummary:
      "树把“父子层级关系”变成了可计算结构。学会树，很多组织架构、目录系统、表达式结构和搜索问题都会变得自然。",
    path: "面试导向系统课",
    duration: "30 min",
    difficulty: "基础到中等",
    outcome: "树结构直觉",
    visualTitle: "二叉树层级与遍历演示",
    visualSubtitle: "看节点如何按层分布，以及前序/中序/后序遍历分别在什么时候访问节点。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么数组和链表不够用",
        body:
          "很多现实问题不是线性排列，而是天然带层级关系：公司组织架构、文件目录、HTML DOM、表达式语法树。树结构就是用来描述这种“一个节点下面还能接很多子节点”的关系。",
        bullets: [
          "树解决的是层级化组织数据的问题",
          "二叉树是最经典、最适合入门的树形结构",
          "学会树后，很多递归问题会突然变得自然"
        ]
      },
      {
        label: "痛点",
        title: "为什么树题常让人一眼发懵",
        body:
          "因为树题通常不再是简单的线性遍历，而是要同时处理“当前节点”和“子树”。如果脑中没有‘节点 + 左右子树’这个递归画面，就很容易乱。",
        bullets: [
          "不知道遍历顺序为什么不同",
          "递归时分不清‘当前层该做什么’和‘子问题该做什么’",
          "层序遍历和深度遍历容易混淆"
        ],
        keyLine: "树题最重要的不是背模板，而是把“当前节点 + 子树”想清楚。"
      },
      {
        label: "核心思想",
        title: "每个节点都能看成一棵更小的树",
        body:
          "树题几乎天然适合递归，因为任意节点都可以作为一棵小树的根。你只要明确当前节点要做什么，再把同样的问题交给左右子树，就能写出很多看似复杂的树题。",
        bullets: [
          "前序：先处理当前节点，再处理左右子树",
          "中序：先左子树，再当前节点，再右子树",
          "后序：先左右子树，再当前节点"
        ]
      }
    ],
    examples: [
      {
        title: "二叉树前序遍历",
        pattern: "递归入门",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "返回二叉树的前序遍历结果。",
        whyAsk:
          "这是树题最经典的入门模板，面试官会借它看你是否真正理解递归访问顺序。",
        approaches: [
          {
            id: "iter-list",
            label: "手动栈模拟",
            summary: "用栈手动控制访问顺序，模拟递归过程。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "它能帮助你理解递归本质上也是在借助调用栈管理未完成节点。",
            code: `def preorder_traversal(root):
    if not root:
        return []

    stack = [root]
    result = []

    while stack:
        node = stack.pop()
        result.append(node.val)

        # 先压右，再压左，保证左子树先被处理
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result`
          },
          {
            id: "recursive",
            label: "递归前序",
            summary: "当前节点 -> 左子树 -> 右子树。",
            complexity: "时间 O(n) · 空间 O(h)",
            explanation:
              "这是最贴近树定义的写法。关键是把访问当前节点和递归子树的顺序固定下来。",
            code: `def preorder_traversal_fast(root):
    result = []

    def dfs(node):
        if not node:
            return

        result.append(node.val)  # 先访问当前节点
        dfs(node.left)           # 再递归左子树
        dfs(node.right)          # 最后递归右子树

    dfs(root)
    return result`
          }
        ],
        takeaway: [
          "树题入门先把三种 DFS 顺序练熟",
          "前序遍历的访问时机是‘递归下去之前’",
          "递归和手动栈往往是可互换的两种视角"
        ]
      },
      {
        title: "二叉树最大深度",
        pattern: "树形递归",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "求二叉树的最大深度。",
        whyAsk:
          "这题特别适合训练‘当前节点答案由左右子树答案组合而来’的树形 DP 思维。",
        approaches: [
          {
            id: "bfs",
            label: "层序计层数",
            summary: "按层遍历，每处理完一层深度加一。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "层序能做，但它更偏队列思维。这里的价值在于和递归方案做对照。",
            code: `from collections import deque

def max_depth(root):
    if not root:
        return 0

    queue = deque([root])
    depth = 0

    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth`
          },
          {
            id: "rec-depth",
            label: "递归求深度",
            summary: "当前节点深度 = max(左子树深度, 右子树深度) + 1。",
            complexity: "时间 O(n) · 空间 O(h)",
            explanation:
              "这是树题里最经典的递归组合方式：先求子问题，再组合当前答案。",
            code: `def max_depth_fast(root):
    if not root:
        return 0

    left_depth = max_depth_fast(root.left)
    right_depth = max_depth_fast(root.right)

    return max(left_depth, right_depth) + 1`
          }
        ],
        takeaway: [
          "树高题很适合练递归返回值语义",
          "很多树题答案都是由左右子树组合出来的",
          "层序和递归都能做，但树形递归更贴近本质"
        ]
      },
      {
        title: "对称二叉树",
        pattern: "镜像比较",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "判断一棵二叉树是否关于中心对称。",
        whyAsk:
          "这题很适合训练“两个子树之间的关系”而不是只看单棵子树。",
        approaches: [
          {
            id: "serialize",
            label: "序列化后比较",
            summary: "把左右子树序列化，再比较是否互为镜像。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "能做，但绕了一层。它没有直接表达出镜像比较的核心关系。",
            code: `def is_symmetric(root):
    def serialize(node):
        if not node:
            return [None]
        return [node.val] + serialize(node.left) + serialize(node.right)

    if not root:
        return True

    left = serialize(root.left)
    right = serialize(root.right)
    return left == right[::-1]`
          },
          {
            id: "mirror-rec",
            label: "递归镜像比较",
            summary: "左子树的左边要和右子树的右边相等，左子树的右边要和右子树的左边相等。",
            complexity: "时间 O(n) · 空间 O(h)",
            explanation:
              "这题的关键不是遍历，而是成对比较两个位置是否互为镜像。",
            code: `def is_symmetric_fast(root):
    def is_mirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        if left.val != right.val:
            return False

        return is_mirror(left.left, right.right) and is_mirror(left.right, right.left)

    if not root:
        return True

    return is_mirror(root.left, root.right)`
          }
        ],
        takeaway: [
          "树题不一定只看单节点，也可能比较两棵子树关系",
          "镜像题的关键是配对位置",
          "递归参数不一定只传一个节点"
        ]
      }
    ],
    implementation: [
      "先判断题目是在考 DFS、BFS，还是树形递归返回值",
      "如果答案依赖左右子树，优先考虑递归返回值怎么定义",
      "如果题目强调按层、最短步数或波次扩散，则优先考虑队列层序"
    ],
    complexityNotes: [
      "大多数树遍历时间复杂度都是 O(n)，因为每个节点至少访问一次",
      "递归空间复杂度常写 O(h)，h 是树高",
      "极度不平衡树会让递归深度接近 O(n)"
    ],
    applications: [
      "组织架构、文件目录、语法树、评论楼层都天然是树结构",
      "数据库索引、搜索系统、编译器内部结构大量依赖树",
      "树题训练的是层级关系建模能力，这是很多复杂系统设计的基础"
    ],
    summary: "树题的灵魂是：当前节点答案，如何由子树答案和当前信息组合而来。",
    quiz: [],
    visual: { type: "tree" }
  },
  {
    id: "heap",
    order: "08",
    title: "堆与优先队列",
    subtitle: "快速拿到当前最值",
    heroSummary:
      "堆并不是为了排序全部元素，而是为了高效维护“当前最小”或“当前最大”。看到 Top K、合并有序流、调度问题，都要对堆敏感。",
    path: "面试导向系统课",
    duration: "30 min",
    difficulty: "基础到中等",
    outcome: "Top K 与最值维护意识",
    visualTitle: "小顶堆上浮 / 下沉演示",
    visualSubtitle: "看元素如何保持堆序，理解为什么堆适合动态维护当前最值。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么排序还不够",
        body:
          "如果你每次都为了拿最小值或前 K 大把所有元素重新排序，代价通常过高。堆的目标不是把整体完全排好，而是用更低成本维护‘谁当前最值得先拿出来’。",
        bullets: [
          "堆适合动态数据流，不适合只做一次静态排序的场景",
          "Python 里最常用的是 `heapq` 小顶堆",
          "Top K、合并多个有序流、任务调度都和堆高度相关"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人想到 Top K 只会先排序",
        body:
          "因为没有建立‘部分最优维护’的意识。排序是全局有序，而堆只要求局部有序就够了，这正是它省时间的原因。",
        bullets: [
          "不是所有问题都需要完整排序",
          "堆关注的是堆顶，而不是整体顺序",
          "面试里经常考的就是你能否避免‘全排一遍’"
        ],
        keyLine: "堆最重要的价值，不是排整齐，而是快速拿到当前最值。"
      },
      {
        label: "核心思想",
        title: "用局部顺序维护全局最值入口",
        body:
          "小顶堆保证每个父节点都不大于子节点，因此堆顶始终是当前最小值。最大堆也是同理。你不需要知道每个元素的完整排名，只要知道堆顶永远是‘当前最该先处理的那个’。",
        bullets: [
          "建堆、插入、弹出都围绕上浮和下沉",
          "Python 默认是小顶堆，求大顶堆通常对值取负",
          "固定大小的堆特别适合 Top K"
        ]
      }
    ],
    examples: [
      {
        title: "数组中的第 K 大元素",
        pattern: "固定大小堆",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "在未排序数组中找到第 k 大的元素。",
        whyAsk:
          "这是堆的最经典题型之一，几乎是 Top K 思维的标准入口。",
        approaches: [
          {
            id: "sort-all",
            label: "整体排序",
            summary: "先把数组排序，再取倒数第 k 个。",
            complexity: "时间 O(n log n) · 空间 O(1) 或 O(n)",
            explanation:
              "能做，但它解决的是比题目更大的问题：把所有元素都排好。这里其实只关心前 k 大。",
            code: `def find_kth_largest(nums, k):
    nums.sort()
    return nums[-k]`
          },
          {
            id: "heap-k",
            label: "固定大小小顶堆",
            summary: "维护一个大小为 k 的小顶堆，堆顶始终是当前第 k 大。",
            complexity: "时间 O(n log k) · 空间 O(k)",
            explanation:
              "只保留最重要的 k 个元素，比全量排序更贴近题目本质。",
            code: `import heapq

def find_kth_largest_fast(nums, k):
    heap = []

    for x in nums:
        if len(heap) < k:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            # 只有当前值比堆顶更大，才值得进入前 k 大集合
            heapq.heapreplace(heap, x)

    return heap[0]`
          }
        ],
        takeaway: [
          "Top K 不一定要全排序",
          "固定大小小顶堆是第 K 大/前 K 大的标准套路",
          "时间复杂度从 O(n log n) 降到 O(n log k)"
        ]
      },
      {
        title: "合并 K 个有序链表",
        pattern: "多路归并",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "合并 k 个升序链表，返回合并后的升序链表。",
        whyAsk:
          "这题能很好体现堆在‘多个来源里反复选最小值’时的价值。",
        approaches: [
          {
            id: "flatten-sort",
            label: "展开后排序",
            summary: "把所有值取出来，排序后再重建链表。",
            complexity: "时间 O(n log n) · 空间 O(n)",
            explanation:
              "能完成任务，但完全丢掉了每个链表本来就是有序的宝贵信息。",
            code: `def merge_k_lists(lists):
    values = []
    for head in lists:
        while head:
            values.append(head.val)
            head = head.next

    values.sort()
    return values  # 这里用值序列代表结果，便于演示`
          },
          {
            id: "heap-merge",
            label: "最小堆多路归并",
            summary: "每次从 k 个链表当前头节点里取最小值，再把它的后继放回堆中。",
            complexity: "时间 O(n log k) · 空间 O(k)",
            explanation:
              "这题堆的价值特别直接：你只需要关心每个链表的当前头，而不是所有剩余元素。",
            code: `import heapq

def merge_k_lists_fast(lists):
    heap = []

    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    result = []

    while heap:
        value, i, node = heapq.heappop(heap)
        result.append(value)

        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return result  # 这里仍用值序列代表结果`
          }
        ],
        takeaway: [
          "多个有序来源反复选最小值，是堆的强触发信号",
          "多路归并的关键是‘只维护每一路当前头部’",
          "堆把 k 路选择降到每次 O(log k)"
        ]
      },
      {
        title: "前 K 个高频元素",
        pattern: "统计 + 堆",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "返回数组中出现频率最高的前 k 个元素。",
        whyAsk:
          "这题经常用来联合考察哈希计数和堆的配合能力。",
        approaches: [
          {
            id: "count-sort",
            label: "计数后整体排序",
            summary: "先统计频次，再按频次排序。",
            complexity: "时间 O(n log n) · 空间 O(n)",
            explanation:
              "思路直接，但对所有元素都完整排序了，代价比题目需要的大。",
            code: `def top_k_frequent(nums, k):
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1

    pairs = sorted(freq.items(), key=lambda item: item[1], reverse=True)
    return [num for num, _ in pairs[:k]]`
          },
          {
            id: "freq-heap",
            label: "计数 + 小顶堆",
            summary: "统计频次后，用固定大小小顶堆维护前 k 高频元素。",
            complexity: "时间 O(n log k) · 空间 O(n)",
            explanation:
              "哈希负责统计，堆负责筛出最重要的 k 个结果，这是很常见的组合技。",
            code: `import heapq

def top_k_frequent_fast(nums, k):
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1

    heap = []
    for num, count in freq.items():
        if len(heap) < k:
            heapq.heappush(heap, (count, num))
        elif count > heap[0][0]:
            heapq.heapreplace(heap, (count, num))

    return [num for _, num in heap]`
          }
        ],
        takeaway: [
          "哈希 + 堆是面试里非常经典的组合",
          "统计类题如果最后只要前 K 个结果，要对堆敏感",
          "固定大小堆特别适合‘筛选最重要少数’"
        ]
      }
    ],
    implementation: [
      "先判断题目是否只关心当前最值或前 K 个元素",
      "如果不是要完整排序，而是动态维护最重要元素，优先考虑堆",
      "Python 默认小顶堆，遇到大顶需求时要主动想到取负或反向维护"
    ],
    complexityNotes: [
      "堆顶查询通常是 O(1)，插入和弹出通常是 O(log n)",
      "固定大小为 k 的堆，很多操作复杂度会变成 O(log k)",
      "Top K 问题的常见优化核心，就是从全量排序降到部分维护"
    ],
    applications: [
      "任务调度、定时器系统、实时排行榜、流式 Top K 都是堆的主战场",
      "搜索系统和推荐系统常常需要动态维护候选结果的最值集合",
      "操作系统调度、优先队列消费、本质上都依赖堆序"
    ],
    summary: "堆的价值在于：不用把所有元素排好，也能持续拿到当前最重要的那个。",
    quiz: [],
    visual: { type: "heap" }
  },
  {
    id: "graph-bfs-dfs",
    order: "09",
    title: "图、BFS 与 DFS",
    subtitle: "从节点关系到搜索路径",
    heroSummary:
      "图让我们能表达任意节点之间的连接关系。BFS 和 DFS 则是遍历图的两种基本方式，分别代表按层扩散和沿路径深入。",
    path: "面试导向系统课",
    duration: "32 min",
    difficulty: "基础到中等",
    outcome: "图搜索建模能力",
    visualTitle: "图遍历波次演示",
    visualSubtitle: "看 BFS 如何按层扩散，DFS 如何沿一条路径一路深入。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么树还不够描述现实连接",
        body:
          "很多现实关系不是严格层级，而是任意连接：社交网络、航线地图、课程依赖、路由网络。这类问题不能只用树，因为一个节点可能和多个节点任意相连，于是我们需要图。",
        bullets: [
          "图是比树更一般的连接结构",
          "节点 + 边，是图最基本的组成",
          "很多最短路、连通性、依赖分析题都建立在图上"
        ]
      },
      {
        label: "痛点",
        title: "为什么图题看起来像迷宫",
        body:
          "因为图题表面形式很多：矩阵、邻接表、课程表、岛屿、单词接龙，但底层常常都在考‘如何从一个点扩展到它的邻居’。",
        bullets: [
          "不会把题目抽象成节点和边",
          "BFS 和 DFS 场景分不清",
          "忘记标记访问状态，容易重复走甚至死循环"
        ],
        keyLine: "图题的第一步，不是写代码，而是先把“谁是节点，谁和谁相连”建出来。"
      },
      {
        label: "核心思想",
        title: "BFS 按层扩散，DFS 沿路径深入",
        body:
          "BFS 适合最短步数、最少层数、按波次推进；DFS 适合搜索所有可能路径、判断连通块、做回溯探索。它们的本质区别，是访问顺序不同。",
        bullets: [
          "BFS 通常配队列",
          "DFS 通常配递归或显式栈",
          "无论 BFS 还是 DFS，都要有 visited 概念"
        ]
      }
    ],
    examples: [
      {
        title: "岛屿数量",
        pattern: "网格图遍历",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定二维网格，统计岛屿数量。相邻的陆地属于同一座岛。",
        whyAsk:
          "这题是矩阵图建模的经典题，能让你真正理解‘网格也是图’。",
        approaches: [
          {
            id: "scan-alone",
            label: "只计数不扩展",
            summary: "碰到陆地就加一，但不继续扩展整块区域。",
            complexity: "错误思路",
            explanation:
              "这类错误很常见：只看当前格子，不把整块连通区域一次性吃掉，就会重复计数。",
            code: `def num_islands(grid):
    count = 0
    for row in grid:
        for cell in row:
            if cell == "1":
                count += 1
    return count`
          },
          {
            id: "dfs-island",
            label: "DFS 淹没整座岛",
            summary: "每次遇到陆地，就用 DFS 把整块连通区域都标记掉。",
            complexity: "时间 O(mn) · 空间 O(mn) 或 O(h)",
            explanation:
              "这题的本质不是计数单个格子，而是数连通块。每发现一块新陆地，就要一次性吃掉整座岛。",
            code: `def num_islands_fast(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return

        grid[r][c] = "0"  # 标记为已访问
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)

    return count`
          }
        ],
        takeaway: [
          "网格题常常本质上是图遍历",
          "看到“连通块数量”要对 DFS / BFS 敏感",
          "访问标记是避免重复遍历的关键"
        ]
      },
      {
        title: "二叉树层序遍历",
        pattern: "BFS 按层扩散",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "按层序返回二叉树节点值。",
        whyAsk:
          "它虽然长在树章节，但本质是 BFS 最标准的按层推进模板。",
        approaches: [
          {
            id: "dfs-level",
            label: "DFS 记录深度",
            summary: "用递归深度把值放到对应层数组里。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "能做，但它隐藏了 BFS 的层次推进画面。这里主要用于对比。",
            code: `def level_order(root):
    levels = []

    def dfs(node, depth):
        if not node:
            return
        if depth == len(levels):
            levels.append([])
        levels[depth].append(node.val)
        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)

    dfs(root, 0)
    return levels`
          },
          {
            id: "bfs-level",
            label: "队列 BFS",
            summary: "每次取出当前层全部节点，再把下一层压入队列。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation:
              "它非常适合作为 BFS 模板，因为“按层处理”的感觉最清晰。",
            code: `from collections import deque

def level_order_fast(root):
    if not root:
        return []

    queue = deque([root])
    result = []

    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result`
          }
        ],
        takeaway: [
          "BFS 最适合处理层次、最短步数、波次扩散",
          "len(queue) 经常用来锁定当前层节点数",
          "同一题可能既能 DFS 又能 BFS，但思维重点不同"
        ]
      },
      {
        title: "课程表",
        pattern: "图建模 + 环检测",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定课程依赖关系，判断是否能完成所有课程。",
        whyAsk:
          "这题非常经典，因为它要求你先把业务描述抽象成有向图，再判断图中是否有环。",
        approaches: [
          {
            id: "naive-deps",
            label: "反复扫描依赖",
            summary: "不断试着找没有前置条件的课程，靠重复扫描推进。",
            complexity: "时间较高，逻辑复杂",
            explanation:
              "能勉强推进，但很难稳定表达，也不适合作为面试答案。",
            code: `def can_finish(num_courses, prerequisites):
    remaining = prerequisites[:]
    learned = set()
    changed = True

    while changed:
        changed = False
        for a, b in remaining[:]:
            if b in learned or all(x != b for x, _ in prerequisites):
                learned.add(a)
                remaining.remove([a, b])
                changed = True

    return not remaining`
          },
          {
            id: "topo",
            label: "BFS 拓扑排序",
            summary: "统计入度，从入度为 0 的课程开始一层层消掉依赖。",
            complexity: "时间 O(V+E) · 空间 O(V+E)",
            explanation:
              "课程依赖图里，只要能把所有节点都按入度为 0 的顺序处理掉，就说明没有环。",
            code: `from collections import deque

def can_finish_fast(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses

    for course, pre in prerequisites:
        graph[pre].append(course)
        indegree[course] += 1

    queue = deque([i for i in range(num_courses) if indegree[i] == 0])
    finished = 0

    while queue:
        node = queue.popleft()
        finished += 1

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return finished == num_courses`
          }
        ],
        takeaway: [
          "业务题常常需要先抽象成图",
          "有向图依赖关系经常和拓扑排序绑定出现",
          "BFS 不只是遍历，还能做约束消解"
        ]
      }
    ],
    implementation: [
      "先把题目抽象成节点和边，再选 BFS 还是 DFS",
      "如果题目在问最短步数、最少层数、依赖消解，优先考虑 BFS",
      "如果题目在问连通块、所有路径、递归扩展，优先考虑 DFS"
    ],
    complexityNotes: [
      "图遍历常见复杂度是 O(V+E)，V 是节点数，E 是边数",
      "网格图常写作 O(mn)，因为每个格子最多访问一次",
      "visited 结构会带来额外空间，但通常是必须的"
    ],
    applications: [
      "社交关系、地图路径、课程依赖、服务调用链都可以建模成图",
      "推荐系统、路由网络、工作流调度和权限传播都和图有关",
      "BFS/DFS 是理解更复杂图算法的地基"
    ],
    summary: "图题最关键的第一步，是把题面翻译成‘谁是节点，谁和谁相连’。",
    quiz: [],
    visual: { type: "graph" }
  },
  {
    id: "two-pointers",
    order: "10",
    title: "双指针",
    subtitle: "用两个位置关系换掉重复扫描",
    heroSummary:
      "双指针的重点不是两个变量本身，而是利用位置关系控制搜索空间。很多数组、字符串、链表题都会因为双指针而突然变简单。",
    path: "面试导向系统课",
    duration: "28 min",
    difficulty: "基础到中等",
    outcome: "位置关系思维",
    visualTitle: "双指针相向 / 同向推进演示",
    visualSubtitle: "看两个指针如何根据条件移动，理解为什么它能减少重复工作。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么有些题不该老老实实双重循环",
        body:
          "很多题表面看像要枚举两个位置，但实际上题目给了足够的顺序信息，可以让两个指针协同移动，而不是把所有组合都试一遍。",
        bullets: [
          "双指针常用于数组、字符串、链表",
          "它的核心是用位置关系减少无效比较",
          "很多 O(n²) 暴力题可以优化到 O(n) 或 O(n log n)"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人知道双指针却不会用",
        body:
          "因为只记题型，不记触发信号。什么时候相向移动，什么时候同向滑动，什么时候快慢指针，核心都在于题目想让你利用什么顺序关系。",
        bullets: [
          "有序数组中常见相向双指针",
          "原地覆盖和去重常见同向双指针",
          "链表中间点、环检测常见快慢指针"
        ],
        keyLine: "双指针不是模板名，而是一种用“移动规则”替代“重复枚举”的思维。"
      },
      {
        label: "核心思想",
        title: "每一步移动都应该有明确依据",
        body:
          "双指针题最重要的问题是：为什么该移动左边，而不是右边？为什么能保证移动后不会漏解？你必须让每一步移动都建立在题目的单调性或顺序性质上。",
        bullets: [
          "相向双指针：通常利用有序性",
          "同向双指针：通常维护有效区间或有效前缀",
          "快慢指针：通常利用速度差建立位置关系"
        ]
      }
    ],
    examples: [
      {
        title: "两数之和 II",
        pattern: "相向双指针",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "在有序数组中找到两数之和等于 target 的两个下标。",
        whyAsk:
          "这题是相向双指针最标准的入口题，能很好体现“有序条件如何替代双重循环”。",
        approaches: [
          {
            id: "brute",
            label: "双重循环",
            summary: "枚举所有二元组，看哪一组满足条件。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation: "能做，但完全没有利用有序数组条件，所以比较浪费。",
            code: `def two_sum_sorted(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]

    return []`
          },
          {
            id: "towards",
            label: "相向双指针",
            summary: "左指针指向最小值，右指针指向最大值，根据和的大小收缩区间。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation: "因为数组有序，如果和太小，就必须让左指针右移；如果和太大，就必须让右指针左移。",
            code: `def two_sum_sorted_fast(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]

        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1

    return []`
          }
        ],
        takeaway: [
          "有序数组是相向双指针的强触发信号",
          "移动哪边，取决于当前和与目标值的大小关系",
          "相向双指针经常把 O(n²) 降到 O(n)"
        ]
      },
      {
        title: "盛最多水的容器",
        pattern: "证明式移动",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定数组 height，找出两条线围成的最大容器面积。",
        whyAsk:
          "这题很经典，因为它不是一眼就能想到双指针，但一旦理解移动逻辑，就会记得特别牢。",
        approaches: [
          {
            id: "allpairs",
            label: "枚举所有边界",
            summary: "尝试每一对左右边界，计算面积取最大。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation: "暴力法能做，但数据规模稍大就会慢。",
            code: `def max_area(height):
    best = 0

    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            area = (j - i) * min(height[i], height[j])
            best = max(best, area)

    return best`
          },
          {
            id: "shorter",
            label: "移动短板",
            summary: "左右指针夹住区间，每次只移动较短的一边。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation: "因为面积受短板限制，移动长板没有意义；只有尝试换掉短板，才有可能让高度瓶颈变大。",
            code: `def max_area_fast(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        width = right - left
        area = width * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`
          }
        ],
        takeaway: [
          "双指针移动规则必须有证明依据",
          "这题的关键是‘面积被短板限制’",
          "面试里讲清楚为什么移动短板，比写出代码更加分"
        ]
      },
      {
        title: "删除排序数组中的重复项 II",
        pattern: "同向覆盖",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "有序数组中每个元素最多保留 2 次，原地修改并返回新长度。",
        whyAsk:
          "这题用来训练你对同向双指针覆盖写入的掌控能力。",
        approaches: [
          {
            id: "extra-array",
            label: "额外数组收集",
            summary: "扫描数组，合法元素放入新数组，最后再写回。",
            complexity: "时间 O(n) · 空间 O(n)",
            explanation: "容易写，但没有体现原地覆盖的核心。",
            code: `def remove_duplicates_twice(nums):
    result = []

    for x in nums:
        if len(result) < 2 or x != result[-2]:
            result.append(x)

    for i in range(len(result)):
        nums[i] = result[i]

    return len(result)`
          },
          {
            id: "cover-two",
            label: "双指针原地覆盖",
            summary: "写指针决定下一个合法元素写到哪，读指针负责扫描。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation: "利用有序数组特性，只要当前值和写入区倒数第二个值不同，就可以保留。",
            code: `def remove_duplicates_twice_fast(nums):
    if len(nums) <= 2:
        return len(nums)

    write = 2

    for read in range(2, len(nums)):
        if nums[read] != nums[write - 2]:
            nums[write] = nums[read]
            write += 1

    return write`
          }
        ],
        takeaway: [
          "同向双指针非常适合原地保留/过滤类题",
          "有序数组的相邻关系能极大简化判断",
          "写指针的语义一定要讲清楚"
        ]
      }
    ],
    implementation: [
      "先识别题目利用的是有序性、区间有效性，还是速度差",
      "为每个指针定义清楚职责：谁负责读，谁负责写，谁负责收缩",
      "移动规则必须能解释为什么不会漏掉答案"
    ],
    complexityNotes: [
      "双指针常见时间复杂度是 O(n)，因为每个指针通常单调移动",
      "相向双指针多为 O(1) 额外空间",
      "双指针优化的关键不是技巧，而是题目中存在单调性或可收缩性"
    ],
    applications: [
      "字符串清洗、数组原地去重、链表快慢检测都依赖双指针",
      "很多流式数据处理、本地编辑器操作也体现了读写双指针思想",
      "双指针是滑动窗口、快慢指针等更大类方法的核心基础"
    ],
    summary: "双指针真正重要的不是有两个指针，而是每一步移动都有明确逻辑依据。",
    quiz: [],
    visual: { type: "twopointers" }
  },
  {
    id: "sliding-window",
    order: "11",
    title: "滑动窗口",
    subtitle: "维护一个动态有效区间",
    heroSummary:
      "滑动窗口可以看成双指针的一个强力分支。它的核心不是‘窗口’这个词，而是持续维护一个满足条件的区间。",
    path: "面试导向系统课",
    duration: "30 min",
    difficulty: "基础到中等",
    outcome: "区间维护思维",
    visualTitle: "窗口扩张与收缩演示",
    visualSubtitle: "看 left/right 如何动态调整，理解窗口题为什么本质上是维护条件。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么很多子数组/子串题不该重复从头算",
        body:
          "如果每次都重新统计一个区间的信息，代价会很高。滑动窗口的目标，就是让区间在移动时尽量复用之前已经算过的信息。",
        bullets: [
          "特别适合连续子数组、连续子串问题",
          "本质是动态维护一个区间状态",
          "很多 O(n²) 枚举区间题可以优化到 O(n)"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人分不清双指针和滑动窗口",
        body:
          "滑动窗口本质上也是双指针，但它比一般双指针更强调‘区间状态维护’。你不只是移动 left/right，还要同步更新窗口里的计数、和、最大值等信息。",
        bullets: [
          "窗口扩张时要加什么信息",
          "窗口收缩时要删什么信息",
          "什么时候该收缩，是窗口题的灵魂"
        ],
        keyLine: "滑动窗口不是简单移动两个指针，而是在维护‘当前窗口是否仍然有效’。"
      },
      {
        label: "核心思想",
        title: "右边扩张找机会，左边收缩保条件",
        body:
          "很多窗口题都遵循同一个模式：右指针不断扩张，把新元素纳入窗口；一旦窗口不再满足条件，就移动左指针收缩，直到恢复有效。",
        bullets: [
          "固定窗口：窗口大小不变，常见于求最大和",
          "可变窗口：窗口根据条件收缩，常见于最短覆盖、无重复子串",
          "窗口题的关键是状态变量和收缩条件"
        ]
      }
    ],
    examples: [
      {
        title: "长度最小的子数组",
        pattern: "可变窗口",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "找和大于等于 target 的最短连续子数组长度。",
        whyAsk: "这题非常适合建立‘右扩张、左收缩’的标准窗口节奏。",
        approaches: [
          {
            id: "enumerate-all",
            label: "枚举所有区间",
            summary: "固定起点和终点，计算每个区间和。",
            complexity: "时间 O(n²) · 空间 O(1)",
            explanation: "能做，但大量重复计算区间和，效率很低。",
            code: `def min_sub_array_len(target, nums):
    best = float("inf")

    for i in range(len(nums)):
        total = 0
        for j in range(i, len(nums)):
            total += nums[j]
            if total >= target:
                best = min(best, j - i + 1)
                break

    return 0 if best == float("inf") else best`
          },
          {
            id: "window-shrink",
            label: "滑动窗口",
            summary: "右指针负责扩张，左指针负责在满足条件后尽量收缩。",
            complexity: "时间 O(n) · 空间 O(1)",
            explanation: "窗口中每个元素最多进一次、出一次，所以整体是线性时间。",
            code: `def min_sub_array_len_fast(target, nums):
    left = 0
    total = 0
    best = float("inf")

    for right in range(len(nums)):
        total += nums[right]

        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1

    return 0 if best == float("inf") else best`
          }
        ],
        takeaway: [
          "窗口题的灵魂是‘满足条件后继续缩’",
          "左右指针都只单调前进，所以常常是 O(n)",
          "先问自己：窗口里需要维护什么状态"
        ]
      },
      {
        title: "无重复字符的最长子串",
        pattern: "窗口去重",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "返回不含重复字符的最长子串长度。",
        whyAsk: "这是字符串滑动窗口最经典的高频题之一，特别适合训练窗口状态维护。",
        approaches: [
          {
            id: "all-substrings",
            label: "枚举所有子串",
            summary: "尝试每个起点和终点，检查子串是否有重复。",
            complexity: "时间 O(n³) 或 O(n²) · 空间 O(n)",
            explanation: "思路直观，但重复检查非常多，效率差。",
            code: `def length_of_longest_substring(s):
    best = 0

    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen:
                break
            seen.add(s[j])
            best = max(best, j - i + 1)

    return best`
          },
          {
            id: "window-set",
            label: "窗口 + 集合",
            summary: "右指针扩张，遇到重复时左指针持续收缩直到窗口恢复无重复。",
            complexity: "时间 O(n) · 空间 O(k)",
            explanation: "这题最重要的是理解：重复出现时，不是重来，而是缩掉左边直到问题消失。",
            code: `def length_of_longest_substring_fast(s):
    left = 0
    seen = set()
    best = 0

    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1

        seen.add(s[right])
        best = max(best, right - left + 1)

    return best`
          }
        ],
        takeaway: [
          "窗口去重类题常和 set / dict 联动",
          "遇到非法状态时，不是推倒重来，而是左边收缩修复状态",
          "窗口题经常和哈希表组合出现"
        ]
      },
      {
        title: "字符串排列",
        pattern: "固定窗口计数",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "判断字符串 s2 是否包含 s1 的某个排列。",
        whyAsk: "这题适合训练固定窗口和字符频次维护。",
        approaches: [
          {
            id: "sort-compare",
            label: "逐段排序比较",
            summary: "枚举 s2 中长度等于 s1 的每个子串，排序后比较。",
            complexity: "时间 O(n * m log m) · 空间 O(m)",
            explanation: "能做，但每次都重新排序子串，成本太高。",
            code: `def check_inclusion(s1, s2):
    target = sorted(s1)
    window_size = len(s1)

    for i in range(len(s2) - window_size + 1):
        if sorted(s2[i:i + window_size]) == target:
            return True

    return False`
          },
          {
            id: "freq-window",
            label: "固定窗口频次比较",
            summary: "维护一个长度固定为 len(s1) 的窗口，并实时更新字符频次。",
            complexity: "时间 O(n) · 空间 O(1) 或 O(k)",
            explanation: "固定长度窗口的关键是：右边进一个，左边就同步出一个。",
            code: `from collections import Counter

def check_inclusion_fast(s1, s2):
    need = Counter(s1)
    window = Counter()
    left = 0

    for right in range(len(s2)):
        window[s2[right]] += 1

        if right - left + 1 > len(s1):
            window[s2[left]] -= 1
            if window[s2[left]] == 0:
                del window[s2[left]]
            left += 1

        if right - left + 1 == len(s1) and window == need:
            return True

    return False`
          }
        ],
        takeaway: [
          "固定窗口重点在于‘进一个，出一个’",
          "字符题常常是频次维护问题",
          "Counter/字典是窗口题的重要搭档"
        ]
      }
    ],
    implementation: [
      "先判断窗口是固定长度还是可变长度",
      "明确窗口状态变量：和、计数、集合、最大值等",
      "遇到不满足条件时，先想清楚窗口该怎么收缩修复"
    ],
    complexityNotes: [
      "很多窗口题能做到 O(n)，因为左右指针都只向前移动",
      "空间复杂度常取决于窗口里维护的状态结构，例如 set / dict / Counter",
      "窗口优化的本质是复用相邻区间的已有信息"
    ],
    applications: [
      "日志流监控、实时统计、连续行为检测都和窗口思想高度相关",
      "文本分析、DNA 序列匹配、流式告警都常用固定或可变窗口",
      "滑动窗口是处理连续区间问题的高频工业思维"
    ],
    summary: "滑动窗口最重要的不是窗口本身，而是你能否持续维护‘窗口有效性’。",
    quiz: [],
    visual: { type: "window" }
  },
  {
    id: "backtracking",
    order: "12",
    title: "回溯",
    subtitle: "在搜索树里试、退、再试",
    heroSummary:
      "回溯适合解决‘列出所有可能、在约束下搜索合法方案’的问题。它的核心不是暴力，而是在搜索过程中及时剪枝。",
    path: "面试导向系统课",
    duration: "32 min",
    difficulty: "中等",
    outcome: "搜索树与剪枝意识",
    visualTitle: "回溯搜索树演示",
    visualSubtitle: "看路径如何扩展、回退，再体会剪枝为什么能大幅减少无效搜索。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么有些题必须尝试多种可能",
        body:
          "当问题要求你找所有组合、所有排列、所有合法路径时，往往没有一种直接公式能一步算出来。你必须在决策树里不断尝试，每走一步就记录状态，走不通就退回来换别的路。",
        bullets: [
          "回溯适合全排列、组合、子集、棋盘搜索等问题",
          "它本质上是在一棵隐式搜索树上做 DFS",
          "剪枝决定了回溯题能不能从“暴力”变成“可用”"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人会写出回溯模板，却不会剪枝",
        body:
          "因为只记住了‘选 / 递归 / 撤销选择’三步，却没有想明白：什么情况下这条路径已经不可能成为答案，可以提前停掉。",
        bullets: [
          "路径、选择列表、结束条件经常分不清",
          "没有剪枝时搜索量会非常大",
          "同层去重和树枝去重容易混淆"
        ],
        keyLine: "回溯不是盲搜，而是边搜索边排除不可能。"
      },
      {
        label: "核心思想",
        title: "做选择、递归下探、撤销选择",
        body:
          "回溯的通用框架是：当前路径先尝试一个选择，递归到下一层；递归回来后撤销这个选择，再尝试下一个。你可以把它想成在搜索树里不断试路和退路。",
        bullets: [
          "路径：当前已经做出的选择",
          "选择列表：当前还能选什么",
          "结束条件：什么时候得到一个完整答案"
        ]
      }
    ],
    examples: [
      {
        title: "全排列",
        pattern: "路径构建",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定一个不含重复数字的数组，返回所有可能的全排列。",
        whyAsk: "这是回溯最标准的模板题，几乎所有回溯学习都从这里开始。",
        approaches: [
          {
            id: "manual-enumerate",
            label: "手动分类枚举",
            summary: "按位置人工拆情况，逐层写死。",
            complexity: "不可扩展",
            explanation: "规模小的时候能硬写，但一旦输入长度变化就完全不可维护。",
            code: `def permute(nums):
    if len(nums) == 1:
        return [nums[:]]
    return []`
          },
          {
            id: "backtrack-perm",
            label: "回溯生成",
            summary: "每一层选择一个还没使用过的数字加入路径，直到路径长度等于数组长度。",
            complexity: "时间 O(n * n!) · 空间 O(n)",
            explanation: "全排列本身答案量就是 n!，所以重点不在避免所有搜索，而在于写出清晰正确的生成过程。",
            code: `def permute_fast(nums):
    result = []
    path = []
    used = [False] * len(nums)

    def backtrack():
        if len(path) == len(nums):
            result.append(path[:])
            return

        for i in range(len(nums)):
            if used[i]:
                continue

            path.append(nums[i])
            used[i] = True
            backtrack()
            used[i] = False
            path.pop()

    backtrack()
    return result`
          }
        ],
        takeaway: [
          "路径、used 数组、撤销选择是全排列模板核心",
          "回溯题经常需要复制路径，而不是直接引用",
          "结束条件往往就是路径长度达到要求"
        ]
      },
      {
        title: "组合总和",
        pattern: "可重复选择 + 剪枝",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "给定无重复元素数组 candidates 和目标值 target，找出所有和为 target 的组合。",
        whyAsk: "这题很适合讲清楚剪枝和‘同一层从哪个位置继续选’。",
        approaches: [
          {
            id: "all-combos",
            label: "先列大量组合再过滤",
            summary: "粗暴生成很多可能，再筛掉和不对的。",
            complexity: "搜索量极大",
            explanation: "没有剪枝时，搜索树会长得很快，效率差且不易控制。",
            code: `def combination_sum(candidates, target):
    return []`
          },
          {
            id: "backtrack-sum",
            label: "回溯 + 剪枝",
            summary: "路径和超过 target 时立刻停止，递归时从当前下标继续选，允许重复使用元素。",
            complexity: "取决于搜索树规模",
            explanation: "这题的关键是把‘和超过 target’当作剪枝条件，而不是等搜完再说。",
            code: `def combination_sum_fast(candidates, target):
    result = []
    path = []

    def backtrack(start, total):
        if total == target:
            result.append(path[:])
            return
        if total > target:
            return

        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, total + candidates[i])
            path.pop()

    backtrack(0, 0)
    return result`
          }
        ],
        takeaway: [
          "剪枝是回溯题效率的关键",
          "start 参数常用来控制组合问题的选择范围",
          "组合和排列的区别，往往就在是否重排和是否回头选"
        ]
      },
      {
        title: "子集",
        pattern: "选或不选",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "返回一个数组的所有子集。",
        whyAsk: "这题特别适合建立‘每个元素都有选 / 不选两种决策’的搜索树画面。",
        approaches: [
          {
            id: "bitmask",
            label: "位运算枚举",
            summary: "用二进制掩码表示选和不选。",
            complexity: "时间 O(n * 2^n) · 空间 O(n)",
            explanation: "位运算法很好，但它不一定最直观，不利于初学者建立回溯树直觉。",
            code: `def subsets(nums):
    result = []
    n = len(nums)

    for mask in range(1 << n):
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)

    return result`
          },
          {
            id: "backtrack-subset",
            label: "回溯生成子集",
            summary: "每到一个位置，都把当前路径记录为一个子集，再继续向后选择。",
            complexity: "时间 O(n * 2^n) · 空间 O(n)",
            explanation: "子集题非常适合训练‘每一层从当前位置往后选’的感觉。",
            code: `def subsets_fast(nums):
    result = []
    path = []

    def backtrack(start):
        result.append(path[:])

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()

    backtrack(0)
    return result`
          }
        ],
        takeaway: [
          "子集题很适合练‘路径本身就是答案’这种结束时机",
          "组合类问题常用 start 控制往后选",
          "回溯不一定只有一个最终终点，有时中途每层都是答案"
        ]
      }
    ],
    implementation: [
      "先画出搜索树，明确路径、选择列表和结束条件",
      "写回溯时形成固定节奏：做选择 -> 递归 -> 撤销选择",
      "优先找剪枝条件，它往往决定这题是否可做"
    ],
    complexityNotes: [
      "回溯题复杂度通常由搜索树规模决定，常见指数级",
      "空间复杂度常与递归深度和路径长度相关",
      "剪枝不能改变最坏上界太多，但能极大优化实际运行"
    ],
    applications: [
      "排班、路径规划、约束求解、棋盘搜索都常用回溯",
      "配置组合生成、权限方案枚举、规则匹配等场景也有回溯影子",
      "回溯是理解搜索、剪枝、约束传播的重要基础"
    ],
    summary: "回溯的本质不是暴力乱试，而是在搜索树里有策略地试、退、再试。",
    quiz: [],
    visual: { type: "backtracking" }
  },
  {
    id: "dynamic-programming",
    order: "13",
    title: "动态规划",
    subtitle: "把重叠子问题的答案存下来",
    heroSummary:
      "动态规划并不神秘，它是在问：这个问题能不能拆成更小的问题，而且这些小问题会不会反复出现？如果会，就把答案存下来别再重复算。",
    path: "面试导向系统课",
    duration: "36 min",
    difficulty: "中等",
    outcome: "状态定义能力",
    visualTitle: "DP 状态转移演示",
    visualSubtitle: "看状态如何从前面的结果一步步推到后面的答案，理解‘转移方程’到底在说什么。",
    sections: [
      {
        label: "背景与来源",
        title: "为什么有些递归会慢到无法接受",
        body:
          "如果一个大问题不断拆成相同的小问题，而你每次都重新算一遍，就会产生巨大重复工作。动态规划就是针对这类“重叠子问题”设计的优化方法。",
        bullets: [
          "DP 常处理最优值、计数、可达性问题",
          "它本质上是在复用子问题答案",
          "状态定义比代码技巧更重要"
        ]
      },
      {
        label: "痛点",
        title: "为什么很多人觉得 DP 最抽象",
        body:
          "因为大家往往只背题型，不练状态定义。其实 DP 最核心的问题只有两个：状态是什么？状态之间怎么转移？",
        bullets: [
          "不会定义 dp[i] / dp[i][j] 的含义",
          "分不清初始化和转移方程谁先谁后",
          "看懂答案后，自己仍然写不出来"
        ],
        keyLine: "动态规划的灵魂不是表格，而是状态含义和转移关系。"
      },
      {
        label: "核心思想",
        title: "先定义状态，再写转移，再定初始化",
        body:
          "做 DP 时，不要一上来就写循环。先用一句话定义状态，再问当前状态能由哪些更小状态得到，最后再想初始条件和遍历顺序。",
        bullets: [
          "状态：dp[i] 到底表示什么",
          "转移：当前答案和哪些过去答案有关",
          "初始化：最小规模问题的答案是什么"
        ]
      }
    ],
    examples: [
      {
        title: "爬楼梯",
        pattern: "一维 DP 入门",
        difficulty: "简单",
        frequency: "面试高频",
        prompt: "每次可以爬 1 阶或 2 阶，求到第 n 阶有多少种方法。",
        whyAsk: "这题是动态规划最经典的入门题，非常适合建立‘状态转移’直觉。",
        approaches: [
          {
            id: "naive-rec",
            label: "朴素递归",
            summary: "每次尝试从 n-1 阶和 n-2 阶走到当前阶。",
            complexity: "时间 O(2^n) · 空间 O(n)",
            explanation: "会反复计算相同的子问题，例如 f(3)、f(4) 等。",
            code: `def climb_stairs(n):
    if n <= 2:
        return n

    return climb_stairs(n - 1) + climb_stairs(n - 2)`
          },
          {
            id: "dp-steps",
            label: "动态规划",
            summary: "dp[i] 表示到第 i 阶的方法数，转移来自前两阶。",
            complexity: "时间 O(n) · 空间 O(n) 或 O(1)",
            explanation: "关键不在公式像斐波那契，而在于你能用状态语义把它讲清楚。",
            code: `def climb_stairs_fast(n):
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]`
          }
        ],
        takeaway: [
          "DP 入门题先练状态定义：dp[i] 是什么",
          "重叠子问题是从递归转 DP 的强信号",
          "很多一维 DP 都可以做空间压缩"
        ]
      },
      {
        title: "打家劫舍",
        pattern: "相邻约束最优值",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "不能偷相邻房屋，求能偷到的最大金额。",
        whyAsk: "这题非常适合训练‘当前最优由前面哪几个状态决定’的思维。",
        approaches: [
          {
            id: "search-all",
            label: "暴力枚举偷法",
            summary: "尝试偷或不偷每间房，递归搜索所有方案。",
            complexity: "时间指数级",
            explanation: "能表达问题，但存在大量重复子问题。",
            code: `def rob(nums):
    def dfs(i):
        if i >= len(nums):
            return 0

        return max(dfs(i + 1), nums[i] + dfs(i + 2))

    return dfs(0)`
          },
          {
            id: "dp-rob",
            label: "一维 DP",
            summary: "dp[i] 表示考虑到第 i 间房时的最大收益。",
            complexity: "时间 O(n) · 空间 O(n) 或 O(1)",
            explanation: "当前房子要么偷，要么不偷，所以转移来自两种选择中的较大值。",
            code: `def rob_fast(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

    return dp[-1]`
          }
        ],
        takeaway: [
          "很多最优值题都可以从‘选 / 不选当前项’入手",
          "状态转移经常来源于互斥选择",
          "面试里讲清楚‘为什么是 max(dp[i-1], dp[i-2] + nums[i])’非常重要"
        ]
      },
      {
        title: "最长递增子序列",
        pattern: "序列型 DP",
        difficulty: "中等",
        frequency: "面试高频",
        prompt: "返回数组的最长严格递增子序列长度。",
        whyAsk: "这题很经典，因为它要求你定义‘以某个位置结尾’的状态语义。",
        approaches: [
          {
            id: "all-subseq",
            label: "枚举所有子序列",
            summary: "尝试所有子序列，再找最长递增长度。",
            complexity: "时间指数级",
            explanation: "理论上能做，但完全不可扩展。",
            code: `def length_of_lis(nums):
    return 0`
          },
          {
            id: "dp-lis",
            label: "O(n²) 动态规划",
            summary: "dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。",
            complexity: "时间 O(n²) · 空间 O(n)",
            explanation: "这题的状态定义特别重要：一旦定义成‘以 i 结尾’，转移关系就会自然很多。",
            code: `def length_of_lis_fast(nums):
    if not nums:
        return 0

    dp = [1] * len(nums)

    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)`
          }
        ],
        takeaway: [
          "状态定义一变，题目难度感受也会变",
          "‘以 i 结尾’是序列 DP 中很常见的定义方式",
          "先学会 O(n²) 版本，再谈更快优化"
        ]
      }
    ],
    implementation: [
      "先问自己：这题能不能拆成更小的同类问题",
      "用一句话精确定义状态含义，再写转移关系",
      "最后补初始化、遍历顺序和是否需要空间压缩"
    ],
    complexityNotes: [
      "DP 复杂度通常取决于状态数量和每个状态的转移成本",
      "很多一维 DP 是 O(n)，很多区间/序列 DP 可能达到 O(n²)",
      "空间压缩能优化内存，但前提是你已经彻底理解状态转移"
    ],
    applications: [
      "资源分配、路径最优、调度最优、概率决策都有 DP 影子",
      "推荐系统、金融策略、规划问题里经常要做最优值转移",
      "动态规划训练的是拆问题和定义状态的能力，这对系统设计也有帮助"
    ],
    summary: "动态规划真正难的不是代码，而是你能不能把问题拆成正确的状态和转移。",
    quiz: [],
    visual: { type: "dp" }
  },
  {
    id: "greedy",
    order: "14",
    title: "贪心",
    subtitle: "每一步先做当前最优选择",
    heroSummary: "贪心不是盲目选最大的或最小的，而是证明‘当前最优决策不会妨碍全局最优’。很多区间、调度、跳跃问题都离不开它。",
    path: "面试导向系统课",
    duration: "26 min",
    difficulty: "中等",
    outcome: "局部最优意识",
    visualTitle: "贪心选择过程演示",
    visualSubtitle: "看每一步如何只根据当前最优标准做决策，并持续推进到答案。",
    sections: [
      { label: "背景与来源", title: "为什么有些题不需要回头看", body: "如果当前做出的最优选择不会破坏未来更优解，就可以用贪心一步步推进，而不必枚举所有方案。", bullets: ["常见于区间、调度、跳跃、覆盖类问题", "关键在于证明当前选择是安全的", "贪心重在决策标准"], keyLine: "贪心的难点不在写代码，而在证明为什么当前选择不会后悔。" },
      { label: "核心思想", title: "先定义选择标准，再一路推进", body: "一旦你找到正确的局部选择标准，问题就能转成顺序扫描。", bullets: ["先想每一步最该选谁", "再想选了以后剩余问题是否同构", "最后验证不会漏掉全局最优"] }
    ],
    examples: [
      { title: "分发饼干", pattern: "排序 + 局部匹配", difficulty: "简单", frequency: "面试高频", prompt: "让尽可能多的孩子满意，每个孩子有胃口值，每块饼干有尺寸。", whyAsk: "这题很适合建立‘当前最小可满足对象优先处理’的直觉。", approaches: [{ id: "allmatch", label: "枚举匹配", summary: "尝试不同分配组合。", complexity: "组合爆炸", explanation: "没有必要，因为题目只关心满意人数，不关心具体所有方案。", code: `def find_content_children(g, s):\n    return 0` }, { id: "greedy-sort", label: "排序贪心", summary: "用最小可用饼干满足当前胃口最小的孩子。", complexity: "时间 O(n log n) · 空间 O(1) 或 O(n)", explanation: "这是最经典的资源分配贪心：小资源优先满足小需求，避免浪费。", code: `def find_content_children_fast(g, s):\n    g.sort()\n    s.sort()\n    child = cookie = 0\n\n    while child < len(g) and cookie < len(s):\n        if s[cookie] >= g[child]:\n            child += 1\n        cookie += 1\n\n    return child` }], takeaway: ["资源分配题常和排序贪心绑定", "小资源先满足小需求是高频策略", "贪心标准要和目标函数保持一致"] },
      { title: "跳跃游戏", pattern: "可达范围维护", difficulty: "中等", frequency: "面试高频", prompt: "判断是否能从数组起点跳到终点。", whyAsk: "这题能帮助你理解‘维护当前最远可达位置’这种贪心思路。", approaches: [{ id: "dfsjump", label: "DFS 搜索", summary: "从每个位置递归尝试所有跳法。", complexity: "时间指数级", explanation: "能表达问题，但重复搜索很多。", code: `def can_jump(nums):\n    return False` }, { id: "reach", label: "最远可达贪心", summary: "遍历时维护当前能到达的最远下标。", complexity: "时间 O(n) · 空间 O(1)", explanation: "只要当前位置在可达范围内，就继续更新最远可达位置。", code: `def can_jump_fast(nums):\n    farthest = 0\n\n    for i, step in enumerate(nums):\n        if i > farthest:\n            return False\n        farthest = max(farthest, i + step)\n\n    return True` }], takeaway: ["很多贪心题不是选值，而是维护一个关键范围", "一旦当前位置超出可达范围，就可以提前结束", "最远可达值是这题的核心状态"] },
      { title: "无重叠区间", pattern: "区间结束位置贪心", difficulty: "中等", frequency: "面试高频", prompt: "删除最少区间，使剩余区间互不重叠。", whyAsk: "它是区间贪心的标准题型。", approaches: [{ id: "allremove", label: "枚举删除", summary: "尝试删掉不同区间组合。", complexity: "搜索量极大", explanation: "区间问题通常不需要暴力删组合。", code: `def erase_overlap_intervals(intervals):\n    return 0` }, { id: "endfirst", label: "按结束位置贪心", summary: "优先保留结束更早的区间，为后面留出更多空间。", complexity: "时间 O(n log n) · 空间 O(1)", explanation: "结束越早，越不容易挡住后续区间，这就是贪心标准。", code: `def erase_overlap_intervals_fast(intervals):\n    intervals.sort(key=lambda x: x[1])\n    end = intervals[0][1]\n    count = 0\n\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < end:\n            count += 1\n        else:\n            end = intervals[i][1]\n\n    return count` }], takeaway: ["区间题高频标准：按结束位置排序", "贪心的目标是给未来留下更多空间", "这类题很适合练‘为什么当前选择最安全’"] }
    ],
    implementation: ["先判断题目是否只关心数量、覆盖、最远可达或资源分配", "找出每一步最自然的局部选择标准", "必须能解释为什么这个选择不会妨碍全局最优"],
    complexityNotes: ["贪心常搭配排序，所以常见复杂度是 O(n log n)", "扫描推进部分通常是 O(n)", "证明正确性比复杂度更重要"],
    applications: ["任务调度、资源分配、区间安排、网络覆盖都有贪心思维", "很多工程决策并不求绝对最优，而求可解释的局部最优策略", "贪心训练的是决策标准抽象能力"],
    summary: "贪心的关键不是‘先选最大的’，而是找到一个被证明安全的局部选择标准。",
    quiz: [],
    visual: { type: "greedy" }
  },
  {
    id: "prefix-diff",
    order: "15",
    title: "前缀和与差分",
    subtitle: "把区间问题变成常数级查询或更新",
    heroSummary: "前缀和适合快速求区间和，差分适合高效做区间增减。看到大量区间查询或区间更新时，要第一时间想到它们。",
    path: "面试导向系统课",
    duration: "28 min",
    difficulty: "中等",
    outcome: "区间预处理意识",
    visualTitle: "前缀和 / 差分变化演示",
    visualSubtitle: "看原数组、前缀数组、差分数组之间的关系，理解为什么预处理能省掉重复计算。",
    sections: [
      { label: "背景与来源", title: "为什么区间题不该每次重新累加", body: "如果你要频繁求很多区间和，或者频繁修改很多连续区间，直接每次重算会非常浪费。前缀和和差分就是两类高频预处理技巧。", bullets: ["前缀和解决区间查询", "差分解决区间更新", "两者本质上都是把重复工作前置"] },
      { label: "核心思想", title: "预处理一次，后面反复复用", body: "前缀和让区间和变成两个前缀值相减；差分让区间加法变成两个端点操作。", bullets: ["query 型问题对前缀和敏感", "update 型问题对差分敏感", "二维版本也是高频考点"], keyLine: "这类题的关键往往不是复杂算法，而是先把重复计算拿掉。" }
    ],
    examples: [
      { title: "区域和检索", pattern: "一维前缀和", difficulty: "简单", frequency: "面试高频", prompt: "多次查询数组区间和。", whyAsk: "前缀和最标准的入门题。", approaches: [{ id: "sum-each", label: "每次重算", summary: "查询一次就遍历一次区间。", complexity: "单次 O(n)", explanation: "查询多了会很慢。", code: `def sum_range(nums, left, right):\n    return sum(nums[left:right+1])` }, { id: "prefix1d", label: "前缀和", summary: "先建 prefix 数组，区间和直接相减。", complexity: "预处理 O(n)，单次查询 O(1)", explanation: "这是典型的以空间换查询时间。", code: `class NumArray:\n    def __init__(self, nums):\n        self.prefix = [0]\n        for x in nums:\n            self.prefix.append(self.prefix[-1] + x)\n\n    def sumRange(self, left, right):\n        return self.prefix[right + 1] - self.prefix[left]` }], takeaway: ["多次查询同一数组时，前缀和非常划算", "区间 [l, r] 常转成 prefix[r+1] - prefix[l]", "边界下标很容易写错，要反复练"] },
      { title: "和为 K 的子数组", pattern: "前缀和 + 哈希", difficulty: "中等", frequency: "面试高频", prompt: "统计和为 k 的连续子数组个数。", whyAsk: "这题很适合展示前缀和和哈希表的组合威力。", approaches: [{ id: "allsub", label: "枚举所有子数组", summary: "枚举起点终点再算和。", complexity: "时间 O(n²)", explanation: "重复算和很多次。", code: `def subarray_sum(nums, k):\n    count = 0\n    for i in range(len(nums)):\n        total = 0\n        for j in range(i, len(nums)):\n            total += nums[j]\n            if total == k:\n                count += 1\n    return count` }, { id: "prefix-hash", label: "前缀和 + 计数哈希", summary: "统计历史前缀和出现次数。", complexity: "时间 O(n) · 空间 O(n)", explanation: "如果当前前缀和是 s，那么只要之前出现过 s-k，就说明存在一个和为 k 的区间。", code: `def subarray_sum_fast(nums, k):\n    count = 0\n    prefix = 0\n    seen = {0: 1}\n\n    for x in nums:\n        prefix += x\n        count += seen.get(prefix - k, 0)\n        seen[prefix] = seen.get(prefix, 0) + 1\n\n    return count` }], takeaway: ["前缀和不只适合查询，还能和哈希联动", "子数组和类题对 prefix - target 很敏感", "seen[0] = 1 是高频初始化细节"] },
      { title: "区间加法", pattern: "差分", difficulty: "中等", frequency: "面试高频", prompt: "给定多个区间加法操作，输出最终数组。", whyAsk: "这是差分最经典的存在理由。", approaches: [{ id: "update-all", label: "逐段更新", summary: "每次操作都把区间内元素一个个加上。", complexity: "时间 O(n*m)", explanation: "区间多时会很慢。", code: `def get_modified_array(length, updates):\n    nums = [0] * length\n    for left, right, inc in updates:\n        for i in range(left, right + 1):\n            nums[i] += inc\n    return nums` }, { id: "diff-way", label: "差分数组", summary: "只改区间起点和终点后一位，最后还原前缀和。", complexity: "时间 O(n+m) · 空间 O(n)", explanation: "差分把整个区间更新压缩成两个端点操作。", code: `def get_modified_array_fast(length, updates):\n    diff = [0] * (length + 1)\n\n    for left, right, inc in updates:\n        diff[left] += inc\n        if right + 1 < len(diff):\n            diff[right + 1] -= inc\n\n    result = [0] * length\n    current = 0\n    for i in range(length):\n        current += diff[i]\n        result[i] = current\n\n    return result` }], takeaway: ["差分适合大量区间更新", "前缀和与差分是一对镜像技巧", "端点操作是差分的灵魂"] }
    ],
    implementation: ["先判断题目是区间查询还是区间更新", "查询多时优先考虑前缀和，更新多时优先考虑差分", "写的时候先把下标关系画出来，避免边界错误"],
    complexityNotes: ["前缀和常见是预处理 O(n)，查询 O(1)", "差分常见是单次更新 O(1)，最后还原 O(n)", "哈希和前缀和结合后，很多区间计数题可做到 O(n)"],
    applications: ["日志区间统计、在线报表、批量区间调整都和前缀和/差分类似", "很多数据库和分析系统也会做预聚合以减少重复计算", "这是高频工程优化思维：把重复工作前置或压缩"],
    summary: "前缀和与差分的核心是：不要每次都从头算一遍同样的区间工作。",
    quiz: [],
    visual: { type: "prefix" }
  },
  {
    id: "monotonic",
    order: "16",
    title: "单调栈与单调队列",
    subtitle: "把局部顺序维护成高效答案",
    heroSummary: "单调结构常出现在‘下一个更大元素’、‘滑动窗口最大值’、‘接雨水’这类题目里。关键不是容器本身，而是维护一种单调性。",
    path: "面试导向系统课",
    duration: "30 min",
    difficulty: "中等",
    outcome: "单调维护意识",
    visualTitle: "单调结构维护过程演示",
    visualSubtitle: "看元素如何进栈、出栈或进队、出队，理解为什么单调性能帮你快速找到答案。",
    sections: [
      { label: "背景与来源", title: "为什么很多题总在找‘最近更大/更小’", body: "如果每个位置都向左向右线性找最近更大值，代价通常是 O(n²)。单调结构通过维护候选集合，让这些问题变成线性时间。", bullets: ["单调栈常处理最近更大/更小", "单调队列常处理滑动窗口最值", "它们本质上都在维护一组有效候选"] },
      { label: "核心思想", title: "新元素进来时，把无用候选淘汰掉", body: "单调结构的威力来自淘汰：一旦一个旧元素在当前情境下已经不可能对未来有贡献，就把它移除。", bullets: ["单调栈偏位置关系", "单调队列偏窗口最值", "每个元素通常只进出一次"], keyLine: "单调结构高效的根本原因，是旧候选被永久淘汰，不会反复比较。" }
    ],
    examples: [
      { title: "下一个更大元素", pattern: "单调栈", difficulty: "中等", frequency: "面试高频", prompt: "找每个元素右侧第一个比它大的元素。", whyAsk: "这是单调栈最标准的模板题。", approaches: [{ id: "scan-right", label: "向右枚举", summary: "对每个元素都向右找。", complexity: "时间 O(n²)", explanation: "重复比较很多。", code: `def next_greater(nums):\n    result = [-1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[j] > nums[i]:\n                result[i] = nums[j]\n                break\n    return result` }, { id: "mono-stack", label: "单调栈", summary: "维护一个递减栈，新元素进来时弹出所有更小元素。", complexity: "时间 O(n) · 空间 O(n)", explanation: "被弹出的元素正好在当前元素处找到了下一个更大值。", code: `def next_greater_fast(nums):\n    result = [-1] * len(nums)\n    stack = []  # 存下标，且对应值递减\n\n    for i, x in enumerate(nums):\n        while stack and nums[stack[-1]] < x:\n            idx = stack.pop()\n            result[idx] = x\n        stack.append(i)\n\n    return result` }], takeaway: ["单调栈常存下标而不是直接存值", "弹栈时往往意味着‘答案确定了’", "维护单调性是核心"] },
      { title: "滑动窗口最大值", pattern: "单调队列", difficulty: "困难偏中", frequency: "面试高频", prompt: "求每个长度为 k 的窗口中的最大值。", whyAsk: "它是单调队列最经典的题。", approaches: [{ id: "max-each", label: "每窗重算", summary: "每个窗口都重新取 max。", complexity: "时间 O(nk)", explanation: "窗口大时会慢。", code: `def max_sliding_window(nums, k):\n    result = []\n    for i in range(len(nums) - k + 1):\n        result.append(max(nums[i:i + k]))\n    return result` }, { id: "mono-queue", label: "单调队列", summary: "队列里始终按值递减，队首就是当前窗口最大值。", complexity: "时间 O(n) · 空间 O(k)", explanation: "新元素进入时，把后面更小的候选全部弹掉。", code: `from collections import deque\n\ndef max_sliding_window_fast(nums, k):\n    queue = deque()\n    result = []\n\n    for i, x in enumerate(nums):\n        while queue and nums[queue[-1]] <= x:\n            queue.pop()\n        queue.append(i)\n\n        if queue[0] <= i - k:\n            queue.popleft()\n\n        if i >= k - 1:\n            result.append(nums[queue[0]])\n\n    return result` }], takeaway: ["单调队列通常维护下标", "队首是当前窗口最优候选", "窗口滑出时要记得清理过期下标"] },
      { title: "接雨水", pattern: "边界维护", difficulty: "困难偏中", frequency: "面试高频", prompt: "给定柱子高度，求能接多少雨水。", whyAsk: "这题是单调栈思想非常经典的代表。", approaches: [{ id: "level-fill", label: "逐层模拟", summary: "按高度一层层模拟积水。", complexity: "时间较高", explanation: "能做，但不够优雅。", code: `def trap(height):\n    return 0` }, { id: "stack-water", label: "单调栈求凹槽", summary: "遇到更高柱子时，弹出栈顶并计算形成的凹槽面积。", complexity: "时间 O(n) · 空间 O(n)", explanation: "单调栈帮助你在恰当时机找到左右边界。", code: `def trap_fast(height):\n    stack = []\n    water = 0\n\n    for i, h in enumerate(height):\n        while stack and h > height[stack[-1]]:\n            bottom = stack.pop()\n            if not stack:\n                break\n            left = stack[-1]\n            width = i - left - 1\n            bounded_height = min(height[left], h) - height[bottom]\n            water += width * bounded_height\n        stack.append(i)\n\n    return water` }], takeaway: ["单调结构不仅能找更大值，也能找有效边界", "接雨水是‘单调栈 + 边界计算’高频题", "复杂题也常能拆成标准结构套路"] }
    ],
    implementation: ["先判断题目是在找最近更大/更小，还是窗口最值", "栈/队列里优先存下标，便于处理位置和过期问题", "每次新元素进来时，思考哪些旧候选已经永久失效"],
    complexityNotes: ["单调结构常见时间复杂度是 O(n)，因为每个元素最多进出一次", "空间复杂度取决于栈或队列长度，通常是 O(n) 或 O(k)", "效率来源于淘汰无用候选，而不是更快的单次比较"],
    applications: ["实时监控最大值、温度趋势、价格趋势和告警阈值都可见单调结构影子", "很多在线算法的核心都是维护候选最优集合", "这是面试里非常能区分模板熟练度的专题"],
    summary: "单调结构的本质是：把不可能再有价值的旧候选及时淘汰掉。",
    quiz: [],
    visual: { type: "monotonic" }
  },
  {
    id: "advanced-structures",
    order: "17",
    title: "并查集与 Trie",
    subtitle: "两种很有辨识度的进阶结构",
    heroSummary: "并查集擅长处理连通性，Trie 擅长处理前缀查询。它们出现频率没有哈希和数组高，但一旦题型对上，就非常强。",
    path: "面试导向系统课",
    duration: "30 min",
    difficulty: "中等",
    outcome: "结构匹配意识",
    visualTitle: "并查集合并 / Trie 前缀树演示",
    visualSubtitle: "看集合如何合并，看单词如何共享前缀路径，理解这两种结构的‘专用场景’。",
    sections: [
      { label: "背景与来源", title: "为什么有些问题需要‘专用结构’", body: "当题目在问‘这些点是否连通’或‘这些单词是否共享某个前缀’时，用通用结构能做，但不够直接。并查集和 Trie 就是为这些问题设计的。", bullets: ["并查集擅长动态合并集合", "Trie 擅长前缀匹配和字典类问题", "识别题型比死记结构更重要"] },
      { label: "核心思想", title: "一个管集合关系，一个管字符串前缀", body: "并查集通过 find / union 管理连通块；Trie 通过字符路径共享前缀。", bullets: ["并查集高频信号：连通性、朋友圈、岛屿合并", "Trie 高频信号：前缀、字典树、搜索建议", "两者都是非常强的‘题型匹配器’"], keyLine: "这类结构最重要的是识别适用场景，而不是一上来就硬套。" }
    ],
    examples: [
      { title: "朋友圈 / 省份数量", pattern: "并查集连通性", difficulty: "中等", frequency: "面试高频", prompt: "给定城市连通关系，统计省份数量。", whyAsk: "这是并查集最常见的题型之一。", approaches: [{ id: "dfs-province", label: "DFS 连通块", summary: "用 DFS 统计连通块数量。", complexity: "时间 O(n²)", explanation: "图搜索能做，但并查集更贴题。", code: `def find_circle_num(isConnected):\n    n = len(isConnected)\n    visited = set()\n\n    def dfs(i):\n        for j in range(n):\n            if isConnected[i][j] == 1 and j not in visited:\n                visited.add(j)\n                dfs(j)\n\n    count = 0\n    for i in range(n):\n        if i not in visited:\n            visited.add(i)\n            dfs(i)\n            count += 1\n\n    return count` }, { id: "union-find", label: "并查集", summary: "把连通城市所在集合不断合并，最后数根节点个数。", complexity: "时间接近 O(n² * α(n))", explanation: "并查集特别适合大量合并和查询是否属于同一集合。", code: `def find_circle_num_fast(isConnected):\n    n = len(isConnected)\n    parent = list(range(n))\n\n    def find(x):\n        if parent[x] != x:\n            parent[x] = find(parent[x])\n        return parent[x]\n\n    def union(a, b):\n        pa, pb = find(a), find(b)\n        if pa != pb:\n            parent[pa] = pb\n\n    for i in range(n):\n        for j in range(i + 1, n):\n            if isConnected[i][j] == 1:\n                union(i, j)\n\n    return sum(1 for i in range(n) if find(i) == i)` }], takeaway: ["并查集最核心就是 find / union", "路径压缩是并查集高频优化", "看到连通块合并要对并查集敏感"] },
      { title: "实现 Trie", pattern: "前缀树", difficulty: "中等", frequency: "面试高频", prompt: "实现插入、搜索和前缀判断。", whyAsk: "这是 Trie 的标准题型。", approaches: [{ id: "list-search", label: "列表暴力查找", summary: "把所有单词存下来，搜索和前缀判断都靠遍历。", complexity: "查询效率较低", explanation: "能做，但没有利用公共前缀。", code: `class Trie:\n    def __init__(self):\n        self.words = []\n\n    def insert(self, word):\n        self.words.append(word)\n\n    def search(self, word):\n        return word in self.words\n\n    def startsWith(self, prefix):\n        return any(word.startswith(prefix) for word in self.words)` }, { id: "trie-tree", label: "字典树", summary: "每个字符一层，共享相同前缀路径。", complexity: "单次操作 O(L)", explanation: "Trie 最大的价值，就是把大量重复前缀合并成共享路径。", code: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.is_end\n\n    def startsWith(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return True` }], takeaway: ["Trie 的核心是共享前缀路径", "前缀题和字典树高度相关", "实现 Trie 时要区分路径存在和单词结束"] },
      { title: "替换单词 / 搜索建议", pattern: "前缀匹配应用", difficulty: "中等", frequency: "面试常考", prompt: "根据词根字典替换句子中的单词前缀。", whyAsk: "它能帮助你把 Trie 从结构题过渡到应用题。", approaches: [{ id: "prefix-loop", label: "逐词逐前缀检查", summary: "对每个单词都去和所有词根比较。", complexity: "时间较高", explanation: "字典大时会明显慢。", code: `def replace_words(dictionary, sentence):\n    words = sentence.split()\n    result = []\n    for word in words:\n        root = word\n        for d in dictionary:\n            if word.startswith(d) and len(d) < len(root):\n                root = d\n        result.append(root)\n    return " ".join(result)` }, { id: "trie-apply", label: "Trie 前缀命中", summary: "把词根建成 Trie，每个单词从头沿树走，最先遇到结束标记就替换。", complexity: "时间更优，按字符推进", explanation: "这题体现了 Trie 真正的业务价值：快速前缀匹配。", code: `def replace_words_fast(dictionary, sentence):\n    trie = {}\n    END = '#'\n\n    for word in dictionary:\n        node = trie\n        for ch in word:\n            node = node.setdefault(ch, {})\n        node[END] = True\n\n    def find_root(word):\n        node = trie\n        prefix = []\n        for ch in word:\n            if END in node:\n                return ''.join(prefix)\n            if ch not in node:\n                return word\n            prefix.append(ch)\n            node = node[ch]\n        return ''.join(prefix) if END in node else word\n\n    return ' '.join(find_root(word) for word in sentence.split())` }], takeaway: ["Trie 的价值主要体现在前缀型应用题", "并查集和 Trie 都是高辨识度结构", "遇到对口题型时，它们的优势非常明显"] }
    ],
    implementation: ["看到连通性、集合合并、是否同属一组时，优先想到并查集", "看到前缀、词典、搜索建议时，优先想到 Trie", "这类结构题最重要的是先识别场景，再落实现模板"],
    complexityNotes: ["并查集在路径压缩后，均摊复杂度非常低", "Trie 单次插入 / 查询常按字符串长度计 O(L)", "专用结构的价值不在通用性，而在题型命中时的高效率"],
    applications: ["社交网络、集群连通、权限分组常和并查集思维相似", "搜索建议、输入法、词典匹配和敏感词过滤常和 Trie 高度相关", "这类专题能显著提升你对题型的识别精度"],
    summary: "并查集和 Trie 都是典型的‘一旦题型匹配，就非常值得使用’的专用结构。",
    quiz: [],
    visual: { type: "advancedstruct" }
  }
];

const state = {
  currentLessonId: lessons[0].id,
  activeExampleIndex: 0,
  activeApproachId: lessons[0].examples[0].approaches[0].id,
  activePracticeIdByLesson: {},
  activeResultTabByPractice: {},
  selectedSubmissionId: null,
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

const lessonTemplates = {
  complexity: `# 复杂度分析模板
# 1. 先说主要操作做了几次
# 2. 再说时间复杂度
# 3. 最后说额外空间来自哪里
def analyze_solution():
    pass`,
  "array-list": `# 数组 / list 原地覆盖模板
write = 0
for read in range(len(nums)):
    if 满足保留条件:
        nums[write] = nums[read]
        write += 1
return write`,
  "linked-list": `# 链表 dummy + 改链模板
dummy = ListNode(0, head)
current = dummy
while current.next:
    if 需要删除 current.next:
        current.next = current.next.next
    else:
        current = current.next
return dummy.next`,
  "stack-queue": `# 栈 / 队列基础模板
stack = []
for x in data:
    if 需要压栈:
        stack.append(x)
    else:
        stack.pop()

from collections import deque
queue = deque([start])
while queue:
    node = queue.popleft()`,
  "binary-search": `# 闭区间二分模板
left, right = 0, len(nums) - 1
while left <= right:
    mid = left + (right - left) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1`,
  "hash-table": `# 哈希表统计 / 映射模板
seen = {}
for i, x in enumerate(nums):
    if 条件命中:
        return 结果
    seen[x] = i`,
  tree: `# 树形递归模板
def dfs(node):
    if not node:
        return base
    left = dfs(node.left)
    right = dfs(node.right)
    return 用 left / right 组合当前答案`,
  heap: `# 固定大小小顶堆模板
import heapq
heap = []
for x in nums:
    if len(heap) < k:
        heapq.heappush(heap, x)
    elif x > heap[0]:
        heapq.heapreplace(heap, x)`,
  "graph-bfs-dfs": `# BFS / DFS 模板
from collections import deque
queue = deque([start])
visited = {start}
while queue:
    node = queue.popleft()
    for nxt in graph[node]:
        if nxt not in visited:
            visited.add(nxt)
            queue.append(nxt)

def dfs(node):
    if node in visited:
        return
    visited.add(node)
    for nxt in graph[node]:
        dfs(nxt)`,
  "two-pointers": `# 相向双指针模板
left, right = 0, len(nums) - 1
while left < right:
    if 命中答案:
        return ...
    if 当前值偏小:
        left += 1
    else:
        right -= 1`,
  "sliding-window": `# 可变滑动窗口模板
left = 0
state = 初始化状态
for right in range(len(data)):
    把 data[right] 纳入窗口
    while 窗口不合法:
        移除 data[left]
        left += 1
    更新答案`,
  backtracking: `# 回溯模板
path = []
result = []
def backtrack(start):
    if 达到结束条件:
        result.append(path[:])
        return
    for i in range(start, len(nums)):
        做选择
        backtrack(下一层参数)
        撤销选择`,
  "dynamic-programming": `# 一维 DP 模板
dp = [初始值] * (n + 1)
写好 base case
for i in range(起点, 终点):
    dp[i] = 根据更小状态转移
return dp[目标状态]`
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

function setLesson(lessonId) {
  state.currentLessonId = lessonId;
  state.learning.lastLessonId = lessonId;
  state.activeExampleIndex = 0;
  state.activeApproachId = getCurrentLesson().examples[0].approaches[0].id;
  const practiceSet = getPracticeSet(lessonId);
  if (!state.activePracticeIdByLesson[lessonId] && practiceSet.length) {
    state.activePracticeIdByLesson[lessonId] = practiceSet[0].id;
  }
  resetVisualState();
  saveLearningState();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setExample(index) {
  state.activeExampleIndex = index;
  state.activeApproachId = getCurrentExample().approaches[0].id;
  renderExamples();
  renderCodePanel();
}

function setApproach(approachId) {
  state.activeApproachId = approachId;
  renderCodePanel();
}

function renderLessonList() {
  refs.lessonList.innerHTML = "";
  lessons.forEach((lesson) => {
    const status = getLessonStatus(lesson.id);
    const statusLabel =
      status === "done" ? "已完成" : status === "review" ? "待复习" : status === "attempted" ? "已练习" : "未开始";
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lesson-item${lesson.id === state.currentLessonId ? " active" : ""}`;
    button.innerHTML = `<strong>${lesson.order}. ${lesson.title}</strong><span>${lesson.subtitle}</span><div class="lesson-meta"><span class="mini-badge ${status}">${statusLabel}</span></div>`;
    button.addEventListener("click", () => setLesson(lesson.id));
    refs.lessonList.appendChild(button);
  });

  const completedCount = Object.keys(state.learning.completedLessons).length;
  refs.courseProgress.style.width = `${(completedCount / lessons.length) * 100}%`;
  refs.courseProgressText.textContent = `${completedCount} / ${lessons.length} 章节已完成`;
}

function renderLearningProfile() {
  const completedCount = Object.keys(state.learning.completedLessons).length;
  const reviewCount = Object.keys(state.learning.wrongLessons).length;
  const submissionCount = state.learning.submissionHistory.length;
  const lastSubmitted = state.learning.submissionHistory[0];
  refs.learningProfile.innerHTML = `
    <div class="profile-grid">
      <div class="profile-stat"><strong>${completedCount}</strong><span>已完成章节</span></div>
      <div class="profile-stat"><strong>${reviewCount}</strong><span>待复习章节</span></div>
      <div class="profile-stat"><strong>${submissionCount}</strong><span>总提交次数</span></div>
      <div class="profile-stat"><strong>${lastSubmitted ? lastSubmitted.lessonTitle : "暂无"}</strong><span>最近提交</span></div>
    </div>
  `;

  const wrongEntries = Object.entries(state.learning.wrongLessons);
  if (!wrongEntries.length) {
    refs.reviewPanel.innerHTML = "<p>当前没有待复习错题，继续保持。完成一章后记得再跑一遍实战题巩固。</p>";
    return;
  }

  refs.reviewPanel.innerHTML = `<ul class="review-list">${wrongEntries
    .slice(0, 5)
    .map(([lessonId, detail]) => {
      const lesson = lessons.find((item) => item.id === lessonId);
      return `<li>
        <strong>${lesson?.title || lessonId}</strong>：${detail.message}
        <div class="review-actions">
          <button class="ghost-button small review-jump-btn" data-lesson-id="${lessonId}" type="button">去二刷</button>
        </div>
      </li>`;
    })
    .join("")}</ul>`;

  refs.reviewPanel.querySelectorAll(".review-jump-btn").forEach((button) => {
    button.addEventListener("click", () => focusLessonPractice(button.dataset.lessonId));
  });
}

function renderSubmissionHistory() {
  const history = state.learning.submissionHistory.slice(0, 6);
  if (!history.length) {
    refs.submissionHistory.innerHTML = "<p>你还没有提交记录。建议每学完一章就至少完整跑一次实战题。</p>";
    return;
  }

  refs.submissionHistory.innerHTML = `<ol class="history-list">${history
    .map(
      (item) => `<li>
        <strong>${item.lessonTitle}</strong>
        <span class="history-meta ${item.passed ? "history-pass" : "history-fail"}">
          ${item.passed ? "通过" : "未通过"} · ${item.timestamp}
        </span>
      </li>`
    )
    .join("")}</ol>`;
}

function renderSubmissionPage() {
  const lessonId = state.currentLessonId;
  const lessonHistory = getLessonSubmissionHistory(lessonId);
  const total = lessonHistory.length;
  const passed = lessonHistory.filter((item) => item.passed).length;
  const failed = total - passed;
  const activePractice = getActivePractice(lessonId);
  const activePracticeKey = `${lessonId}::${activePractice.id}`;
  const lastSuccess = getLastSuccessfulSubmission(lessonId);
  refs.submissionSummary.innerHTML = `
    <div class="profile-grid">
      <div class="profile-stat"><strong>${total}</strong><span>本章总提交</span></div>
      <div class="profile-stat"><strong>${passed}</strong><span>本章通过次数</span></div>
      <div class="profile-stat"><strong>${failed}</strong><span>本章未通过次数</span></div>
    </div>
  `;

  refs.submissionFocus.innerHTML = `
    <div class="focus-grid">
      <div class="focus-stat"><strong>${getCurrentLesson().title}</strong><span>当前章节</span></div>
      <div class="focus-stat"><strong>${activePractice.title}</strong><span>当前实战练习</span></div>
      <div class="focus-stat"><strong>${state.learning.attemptsByLesson[lessonId] || 0}</strong><span>本章累计提交次数</span></div>
      <div class="focus-stat"><strong>${state.practiceResult[activePracticeKey]?.passed ? "已通过" : "待完成"}</strong><span>当前题目状态</span></div>
    </div>
  `;

  if (!lastSuccess) {
    refs.submissionDetail.innerHTML = "<p>当前章节还没有成功记录。先完成一次通过提交，这里会展示最近一次成功提交的代码快照、测试统计和结果说明。</p>";
    return;
  }
  state.selectedSubmissionId = lastSuccess.id;
  renderSubmissionDetail();
}

function renderSubmissionDetail() {
  const fallback = "<p>当前章节还没有可展示的提交详情。完成一次提交后，这里会展示完整反馈和代码快照。</p>";
  if (!state.selectedSubmissionId) {
    refs.submissionDetail.innerHTML = fallback;
    return;
  }
  const submission = state.learning.submissionHistory.find((item) => item.id === state.selectedSubmissionId);
  if (!submission) {
    refs.submissionDetail.innerHTML = fallback;
    return;
  }
  refs.submissionDetail.innerHTML = `
    <div class="submission-detail-card">
      <strong>${submission.lessonTitle} · ${submission.practiceTitle || "章节核心题"}</strong>
      <span class="history-status ${submission.passed ? "pass" : "fail"}">${submission.passed ? "最近一次成功提交" : "未通过"}</span>
      <p>${submission.message}</p>
      <div class="history-meta">${submission.timestamp}</div>
      <p>公开样例：${submission.visibleCount ?? 0} 个，隐藏测试：${submission.hiddenCount ?? 0} 个</p>
      <div class="history-actions">
        <button class="ghost-button small" id="submission-back-to-practice" type="button">回到当前练习</button>
      </div>
      <pre><code>${escapeHtml(submission.codeSnapshot || "# 本次提交没有保留代码快照")}</code></pre>
    </div>
  `;
  document.getElementById("submission-back-to-practice")?.addEventListener("click", () => focusLessonPractice(submission.lessonId));
}

function focusLessonPractice(lessonId) {
  if (!lessonId) return;
  setLesson(lessonId);
  window.setTimeout(() => {
    document.querySelector(".quiz-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 160);
}

function renderRoadmap() {
  refs.roadmapStage.innerHTML = `<p>${getRoadmapStage()}</p>`;
  refs.roadmapNext.innerHTML = `<p>${getNextLessonSuggestion()}</p>`;
  refs.roadmapReview.innerHTML = `<p>${getReviewSuggestion()}</p>`;
}

function renderLessonContent() {
  const lesson = getCurrentLesson();
  refs.heroPath.textContent = lesson.path;
  refs.heroTitle.textContent = `${lesson.order}. ${lesson.title}`;
  refs.heroSummary.textContent = lesson.heroSummary;
  refs.metricDuration.textContent = lesson.duration;
  refs.metricDifficulty.textContent = lesson.difficulty;
  refs.metricOutcome.textContent = lesson.outcome;
  refs.lessonIndex.textContent = lesson.order;
  refs.lessonTitle.textContent = `${lesson.order}. ${lesson.title}`;
  refs.lessonSubtitle.textContent = lesson.subtitle;
  refs.visualTitle.textContent = lesson.visualTitle;
  refs.visualSubtitle.textContent = lesson.visualSubtitle;

  refs.lessonSections.innerHTML = "";
  lesson.sections.forEach((section) => {
    const el = document.createElement("section");
    el.className = "lesson-section";
    el.innerHTML = `
      <div class="section-label">${section.label}</div>
      <h4>${section.title}</h4>
      <p>${section.body}</p>
      <ul>${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${section.keyLine ? `<div class="key-line">${section.keyLine}</div>` : ""}
    `;
    refs.lessonSections.appendChild(el);
  });
}

function renderExamples() {
  const lesson = getCurrentLesson();
  refs.exampleTabs.innerHTML = "";
  lesson.examples.forEach((example, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-button${index === state.activeExampleIndex ? " active" : ""}`;
    button.textContent = `例题 ${index + 1} · ${example.title}`;
    button.addEventListener("click", () => setExample(index));
    refs.exampleTabs.appendChild(button);
  });

  const example = getCurrentExample();
  refs.exampleDetail.innerHTML = `
    <div class="example-panel">
      <h4>${example.title}</h4>
      <div class="example-meta">
        <span class="badge">${example.pattern}</span>
        <span class="badge">${example.difficulty}</span>
        <span class="badge">${example.frequency}</span>
      </div>
      <p><strong>题目：</strong>${example.prompt}</p>
      <p><strong>为什么爱考：</strong>${example.whyAsk}</p>
      <div class="example-grid">
        ${example.approaches
          .map(
            (approach) => `
          <section class="approach-card">
            <h5>${approach.label}</h5>
            <p>${approach.summary}</p>
            <div class="complexity-badge">${approach.complexity}</div>
          </section>`
          )
          .join("")}
      </div>
      <div class="section-label" style="margin-top:16px;">这一题你要拿走什么</div>
      <ul class="example-points">
        ${example.takeaway.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderCodePanel() {
  const example = getCurrentExample();
  const approaches = example.approaches;
  const active = getCurrentApproach();
  refs.codeTitle.textContent = `${example.title} · ${active.label}`;
  refs.codeSubtitle.textContent = `${active.complexity} · ${active.summary}`;
  refs.codeSwitcher.innerHTML = "";
  approaches.forEach((approach) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-button${approach.id === active.id ? " active" : ""}`;
    button.textContent = approach.label;
    button.addEventListener("click", () => setApproach(approach.id));
    refs.codeSwitcher.appendChild(button);
  });
  const lesson = getCurrentLesson();
  refs.codeBlock.textContent = buildCommentedCode(active.code, {
    lessonTitle: lesson.title,
    approachLabel: active.label
  });
  refs.codeExplanation.innerHTML = `
    <p>${escapeHtml(active.explanation)}</p>
    <ul class="code-helper-list">
      <li>优先看函数入口和返回值，明确这段代码“输入什么、输出什么”。</li>
      <li>再看循环和判断，理解代码是在“枚举”“收缩区间”还是“复用状态”。</li>
      <li>如果想对照原始实现，可以把上面的注释当成老师讲解，再一行行读代码主体。</li>
    </ul>
    <div class="section-label" style="margin-top:14px;">逐步带读</div>
    <ol class="code-helper-list">
      ${buildCodeWalkthrough(active.code).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ol>
  `;
}

function renderSummary() {
  const lesson = getCurrentLesson();
  refs.implementationList.innerHTML = listMarkup(lesson.implementation, true);
  refs.complexityList.innerHTML = listMarkup(lesson.complexityNotes, false);
  refs.thinkingList.innerHTML = listMarkup(lesson.applications, false);
  refs.templateCode.textContent = lessonTemplates[lesson.id] || "# 该章节模板整理中";
  refs.chapterSummary.textContent = lesson.summary;
}

function listMarkup(items, ordered) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`;
}

function renderQuiz() {
  renderPractice();
}

function renderPractice() {
  const lesson = getCurrentLesson();
  const practiceSet = getPracticeSet(lesson.id);
  if (!state.activePracticeIdByLesson[lesson.id]) {
    state.activePracticeIdByLesson[lesson.id] = practiceSet[0].id;
  }
  const practice = getActivePractice(lesson.id);
  const practiceKey = `${lesson.id}::${practice.id}`;
  const reviewInfo = state.learning.wrongLessons[lesson.id];
  const lessonSubmissionCount = getLessonSubmissionHistory(lesson.id).length;
  if (!state.activeResultTabByPractice[practiceKey]) {
    state.activeResultTabByPractice[practiceKey] = "result";
  }
  if (!state.practiceCode[practiceKey]) {
    state.practiceCode[practiceKey] = practice.starterCode;
  }
  const result = state.practiceResult[practiceKey];
  refs.practiceContainer.innerHTML = `
    <div class="practice-panel">
      ${
        reviewInfo
          ? `<div class="practice-review-banner">
              <strong>二刷模式已开启</strong>
              <p>你上一次没有通过这一章的练习。建议先看上面的“算法思路总结与代码模板”，再重新提交一次。</p>
              <p>上次反馈：${reviewInfo.message}</p>
            </div>`
          : ""
      }
      <div class="practice-card">
        <div class="section-label">题目列表</div>
        <div class="practice-problem-tabs">
          ${practiceSet
            .map(
              (item, index) =>
                `<button class="tab-button${item.id === practice.id ? " active" : ""}" type="button" data-practice-id="${item.id}">题目 ${index + 1} · ${item.title}</button>`
            )
            .join("")}
        </div>
      </div>
      <div class="practice-shell">
        <div class="practice-card">
          <details class="practice-details" open>
            <summary class="practice-summary">
              <span>
                <strong>${practice.title}</strong>
                <span class="practice-toolbar-meta">点击展开 / 收起题目说明</span>
              </span>
            </summary>
            <div class="practice-details-body">
              <div class="practice-meta">
                <span class="badge">${practice.difficulty}</span>
                <span class="badge">Python</span>
                <span class="badge">${practice.signature}</span>
              </div>
              <p><strong>题目：</strong>${practice.prompt}</p>
            </div>
          </details>
        </div>

        <div class="practice-workspace">
          <div class="practice-card practice-editor-card">
            <div class="practice-editor-topbar">
              <div>
                <strong>代码编辑器</strong>
                <div class="practice-toolbar-meta">像力扣一样，先在编辑区完成实现，再运行公开样例和隐藏测试。</div>
              </div>
              <div class="practice-actions">
                <button class="primary-button" id="run-practice-btn" type="button">提交运行</button>
                <button class="ghost-button" id="reset-practice-btn" type="button">重置代码</button>
                <button class="ghost-button" id="next-lesson-btn" type="button">下一章</button>
              </div>
            </div>
            <div class="practice-editor-wrap">
              <label class="editor-label" for="practice-editor">实现函数：</label>
              <textarea id="practice-editor" class="practice-editor" spellcheck="false">${escapeHtml(state.practiceCode[practiceKey])}</textarea>
            </div>
          </div>

          <div class="practice-sidepanel">
            <div class="practice-detail-card">
              <div class="section-label">提交状态</div>
              <div class="practice-status-board">
                <div class="practice-status-item"><strong>${lessonSubmissionCount}</strong><span>本章提交次数</span></div>
                <div class="practice-status-item"><strong>${getLessonSubmissionHistory(lesson.id).filter((item) => item.practiceId === practice.id).length}</strong><span>当前题目提交次数</span></div>
                <div class="practice-status-item"><strong>${result ? (result.passed ? "已通过" : "待修正") : "未提交"}</strong><span>当前题目状态</span></div>
              </div>
            </div>

            <div class="practice-detail-card">
              <div class="section-label">测试结果</div>
              <div class="practice-result-tabs">
                <button class="tab-button${state.activeResultTabByPractice[practiceKey] === "result" ? " active" : ""}" type="button" data-result-tab="result">运行结果</button>
                <button class="tab-button${state.activeResultTabByPractice[practiceKey] === "examples" ? " active" : ""}" type="button" data-result-tab="examples">公开样例</button>
                <button class="tab-button${state.activeResultTabByPractice[practiceKey] === "tips" ? " active" : ""}" type="button" data-result-tab="tips">提示与隐藏测试</button>
              </div>
              <div class="practice-result-panel">
                ${
                  state.activeResultTabByPractice[practiceKey] === "examples"
                    ? `<ul class="testcase-list">
                        ${practice.tests
                          .map(
                            (test, index) =>
                              `<li>样例 ${index + 1}：输入 = ${escapeHtml(JSON.stringify(test.input))}，期望输出 = ${escapeHtml(
                                JSON.stringify(test.expected)
                              )}</li>`
                          )
                          .join("")}
                      </ul>`
                    : state.activeResultTabByPractice[practiceKey] === "tips"
                      ? `<ul class="practice-hints">
                          ${practice.hints.map((hint) => `<li>${hint}</li>`).join("")}
                        </ul>
                        <div class="hidden-tests-note" style="margin-top:12px;">
                          本题共有 <strong>${practice.hiddenTests?.length || 0}</strong> 个隐藏测试，不会展示具体输入。
                          它们通常检查边界条件、空输入、重复值和极端规模。
                        </div>`
                      : result
                        ? `<div class="practice-output ${result.passed ? "pass" : "fail"}">
                            <strong>${result.passed ? "测试通过" : "测试未通过"}</strong>
                            <div style="margin-top:8px;">${result.message}</div>
                          </div>`
                        : `<div class="practice-output">
                            <strong>等待运行</strong>
                            <div style="margin-top:8px;">先在左侧完成实现，再点击“提交运行”。运行结果会显示在这里。</div>
                          </div>`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  refs.practiceContainer.querySelectorAll("[data-practice-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePracticeIdByLesson[lesson.id] = button.dataset.practiceId;
      saveLearningState();
      renderPractice();
    });
  });
  refs.practiceContainer.querySelectorAll("[data-result-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeResultTabByPractice[practiceKey] = button.dataset.resultTab;
      saveLearningState();
      renderPractice();
    });
  });
  document.getElementById("practice-editor").addEventListener("input", (event) => {
    state.practiceCode[practiceKey] = event.target.value;
    saveLearningState();
  });
  document.getElementById("run-practice-btn").addEventListener("click", () => runPractice(lesson.id, practice.id));
  document.getElementById("reset-practice-btn").addEventListener("click", () => {
    state.practiceCode[practiceKey] = practice.starterCode;
    state.practiceResult[practiceKey] = null;
    renderPractice();
  });
  document.getElementById("next-lesson-btn").addEventListener("click", () => {
    const currentIndex = lessons.findIndex((lessonItem) => lessonItem.id === lesson.id);
    const next = lessons[currentIndex + 1] || lessons[0];
    setLesson(next.id);
  });
}

async function runPractice(lessonId, practiceId) {
  const practice = getPracticeSet(lessonId).find((item) => item.id === practiceId) || getActivePractice(lessonId);
  const practiceKey = `${lessonId}::${practice.id}`;
  const code = state.practiceCode[practiceKey];
  const lesson = lessons.find((item) => item.id === lessonId);
  const allTests = [...practice.tests, ...(practice.hiddenTests || []).map((test) => ({ ...test, hidden: true }))];
  try {
    const response = await fetch("/run-practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        functionName: practice.functionName,
        tests: allTests
      })
    });
    const result = await response.json();
    state.practiceResult[practiceKey] = {
      passed: result.ok,
      message: result.message,
      visibleCount: result.visibleCount,
      hiddenCount: result.hiddenCount
    };
  } catch (error) {
    state.practiceResult[practiceKey] = {
      passed: false,
      message: "当前页面没有通过本地服务启动，所以无法执行 Python 测试。请使用“启动PythonPath平台.bat”打开平台。"
    };
  }
  state.learning.attemptsByLesson[lessonId] = (state.learning.attemptsByLesson[lessonId] || 0) + 1;
  const submissionId = `submission-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  state.learning.submissionHistory.unshift({
    id: submissionId,
    lessonId,
    lessonTitle: lesson?.title || lessonId,
    practiceId: practice.id,
    practiceTitle: practice.title,
    passed: state.practiceResult[practiceKey].passed,
    message: state.practiceResult[practiceKey].message,
    visibleCount: state.practiceResult[practiceKey].visibleCount ?? practice.tests.length,
    hiddenCount: state.practiceResult[practiceKey].hiddenCount ?? (practice.hiddenTests?.length || 0),
    codeSnapshot: code,
    timestamp: new Date().toLocaleString("zh-CN")
  });
  state.learning.submissionHistory = state.learning.submissionHistory.slice(0, 20);
  state.selectedSubmissionId = submissionId;

  if (state.practiceResult[practiceKey].passed) {
    state.learning.completedLessons[lessonId] = true;
    delete state.learning.wrongLessons[lessonId];
  } else {
    state.learning.wrongLessons[lessonId] = {
      message: state.practiceResult[practiceKey].message,
      timestamp: new Date().toLocaleString("zh-CN")
    };
  }
  saveLearningState();
  renderPractice();
  renderLearningProfile();
  renderSubmissionHistory();
  renderSubmissionPage();
  renderRoadmap();
  renderLessonList();
}

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

function bindStaticEvents() {
  refs.startLessonBtn.addEventListener("click", () => {
    document.querySelector(".lesson-card").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelectorAll("[data-action='focus-visual']").forEach((button) => {
    button.addEventListener("click", () => {
      refs.visualCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  refs.homeButton.addEventListener("click", () => setLesson(lessons[0].id));
  refs.exportProgressBtn.addEventListener("click", downloadLearningSnapshot);
  refs.importProgressBtn.addEventListener("click", () => refs.importProgressInput.click());
  refs.importProgressInput.addEventListener("change", (event) => {
    importLearningSnapshot(event.target.files?.[0]);
  });
  refs.resetProgressBtn.addEventListener("click", resetLearningProgress);
}

function render() {
  renderLessonList();
  renderLearningProfile();
  renderSubmissionHistory();
  renderSubmissionPage();
  renderRoadmap();
  renderLessonContent();
  renderExamples();
  renderCodePanel();
  renderSummary();
  renderQuiz();
  renderVisual();
}

loadLearningState();
resetVisualState();
bindStaticEvents();
render();
