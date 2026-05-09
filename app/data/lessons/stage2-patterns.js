const stage2Lessons = [
  {
    "id": "binary-search",
    "order": "05",
    "title": "二分查找",
    "subtitle": "利用有序性把搜索空间不断砍半",
    "heroSummary": "二分查找不只是一个题型，而是一种“缩小搜索空间”的思维方式。掌握它，你会更容易进入边界查找、答案二分和单调性问题。",
    "path": "面试导向系统课",
    "duration": "28 min",
    "difficulty": "基础到中等",
    "outcome": "二分缩规模思维",
    "visualTitle": "二分查找区间收缩演示",
    "visualSubtitle": "看 left、right、mid 如何不断逼近答案，理解为什么它是 O(log n)。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有序信息值得珍惜",
        "body": "当数据已经有序时，继续从头扫到尾是一种浪费。二分查找就是为了最大化利用“有序”这一条件：每做一次比较，就排除掉一半不可能的区域。",
        "bullets": [
          "它诞生于“如何更快查找”的古老问题",
          "它依赖有序性或单调性",
          "它是很多高级题型的原型，例如边界二分、答案二分"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人会写错二分",
        "body": "因为二分不是“猜中间”这么简单，真正难的是边界语义。left、right 表示什么区间，mid 命中后是返回还是继续压边界，必须统一。",
        "bullets": [
          "边界语义不统一，最容易死循环",
          "找值和找边界，写法并不完全一样",
          "面试官常考的是你是否知道为什么这么写"
        ],
        "keyLine": "二分的本质不是找中点，而是每一步都正确排除一半答案。"
      },
      {
        "label": "核心思想",
        "title": "每次比较后，只保留唯一可能有答案的一半",
        "body": "只要数组有序，就可以根据 nums[mid] 和 target 的关系，决定答案只可能在左半还是右半。你不需要知道答案在哪，但你可以不断缩小它的可能范围。",
        "bullets": [
          "有序 + 可比较，是二分的关键前提",
          "left、right 控制有效搜索区间",
          "边界题命中后不一定能立刻停"
        ]
      }
    ],
    "examples": [
      {
        "title": "标准二分查找",
        "pattern": "模板题",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "在升序数组中查找 target，返回下标，不存在返回 -1。",
        "whyAsk": "这是所有二分题的起点。你必须先把这个模板写稳，后面边界题才有基础。",
        "approaches": [
          {
            "id": "linear",
            "label": "线性查找",
            "summary": "直接从头扫到尾，逻辑简单但浪费了有序条件。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "线性查找的意义在于对比。面试里你可以先快速给出，再说明为什么有序数组不该停在这里。",
            "code": "def search_linear(nums, target):\n    for index, value in enumerate(nums):\n        if value == target:\n            return index\n    return -1"
          },
          {
            "id": "binary",
            "label": "标准二分",
            "summary": "用 left 和 right 收缩搜索区间，直到 mid 命中或区间为空。",
            "complexity": "时间 O(log n) · 空间 O(1)",
            "explanation": "每次排除一半区间，所以最多比较 log n 轮。二分越重要的不是记代码，而是知道每一行在维护什么不变量。",
            "code": "def search_binary(nums, target):\n    left, right = 0, len(nums) - 1\n\n    while left <= right:\n        mid = left + (right - left) // 2\n\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n\n    return -1"
          }
        ],
        "takeaway": [
          "要把 left、right、mid 的语义讲清楚",
          "每次更新边界时，必须能解释排除了哪一半",
          "标准模板稳了，后面边界题才不会乱"
        ]
      },
      {
        "title": "搜索插入位置",
        "pattern": "边界二分",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "在升序数组中找到 target 应插入的位置，如果存在则返回其下标。",
        "whyAsk": "它是从“找元素”过渡到“找边界”的经典一题。很多人会在这里第一次真正理解二分不只是找值。",
        "approaches": [
          {
            "id": "scan",
            "label": "顺序扫描",
            "summary": "从左到右找到第一个大于等于 target 的位置。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "这依然能做，但没利用有序数组最大的价值。它的意义在于帮助你理解：插入位置本质上是某个边界。",
            "code": "def search_insert_scan(nums, target):\n    for i, value in enumerate(nums):\n        if value >= target:\n            return i\n\n    return len(nums)"
          },
          {
            "id": "boundary",
            "label": "左边界二分",
            "summary": "始终逼近第一个大于等于 target 的位置。",
            "complexity": "时间 O(log n) · 空间 O(1)",
            "explanation": "这题的关键在于：即使命中 target，也不能立刻停，因为你要的是插入位置，本质上是左边界。",
            "code": "def search_insert(nums, target):\n    left, right = 0, len(nums) - 1\n    answer = len(nums)  # 默认插到末尾\n\n    while left <= right:\n        mid = left + (right - left) // 2\n\n        if nums[mid] >= target:\n            answer = mid\n            right = mid - 1\n        else:\n            left = mid + 1\n\n    return answer"
          }
        ],
        "takeaway": [
          "边界二分的关键是命中后不一定停止",
          "找插入位置，本质上是在找第一个满足条件的位置",
          "answer 变量是边界二分里很常见的写法"
        ]
      },
      {
        "title": "寻找第一个和最后一个位置",
        "pattern": "双边界查找",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "在升序数组中找到目标值第一次和最后一次出现的位置。",
        "whyAsk": "这题是标准的二分进阶题，能检验你是否真的把“边界二分”学会了。",
        "approaches": [
          {
            "id": "expand",
            "label": "命中后向两边扩散",
            "summary": "先用线性或普通二分找到一个位置，再向左右扩散。",
            "complexity": "最坏时间 O(n) · 空间 O(1)",
            "explanation": "在重复元素很多时，向两边扩散会退化。它说明“找到一个位置”和“找到边界”不是同一件事。",
            "code": "def search_range(nums, target):\n    pos = -1\n\n    for i, value in enumerate(nums):\n        if value == target:\n            pos = i\n            break\n\n    if pos == -1:\n        return [-1, -1]\n\n    left = right = pos\n    while left - 1 >= 0 and nums[left - 1] == target:\n        left -= 1\n    while right + 1 < len(nums) and nums[right + 1] == target:\n        right += 1\n\n    return [left, right]"
          },
          {
            "id": "twobounds",
            "label": "两次边界二分",
            "summary": "分别找左边界和右边界，最后组合答案。",
            "complexity": "时间 O(log n) · 空间 O(1)",
            "explanation": "边界题最稳定的解法，往往是把左右边界拆开分别求解。",
            "code": "def search_range_fast(nums, target):\n    def lower_bound():\n        left, right = 0, len(nums) - 1\n        answer = len(nums)\n\n        while left <= right:\n            mid = left + (right - left) // 2\n            if nums[mid] >= target:\n                answer = mid\n                right = mid - 1\n            else:\n                left = mid + 1\n\n        return answer\n\n    def upper_bound():\n        left, right = 0, len(nums) - 1\n        answer = -1\n\n        while left <= right:\n            mid = left + (right - left) // 2\n            if nums[mid] <= target:\n                answer = mid\n                left = mid + 1\n            else:\n                right = mid - 1\n\n        return answer\n\n    left = lower_bound()\n    right = upper_bound()\n\n    if left <= right and right != -1 and left < len(nums) and nums[left] == target:\n        return [left, right]\n    return [-1, -1]"
          }
        ],
        "takeaway": [
          "找到一个位置，不等于找到边界",
          "左右边界最好拆开独立处理",
          "边界二分最重要的是不变量和答案更新时机"
        ]
      }
    ],
    "implementation": [
      "先确认是否满足“有序 / 单调”这个二分前提",
      "统一边界语义：当前区间是闭区间 [left, right] 还是其他形式",
      "每次更新边界时，都要能说出排除了哪一部分"
    ],
    "complexityNotes": [
      "标准二分查找时间复杂度是 O(log n)，因为每轮规模减半",
      "空间复杂度通常是 O(1)，因为只使用常数个指针变量",
      "边界二分的难点不在复杂度，而在正确维护不变量"
    ],
    "applications": [
      "数据库索引、搜索建议、版本定位都使用有序与二分思想",
      "很多看似不是查找的问题，也可以做“答案二分”，例如最小可行值、最大满足值",
      "容量规划和参数调优中，只要存在单调性，就经常可以考虑二分"
    ],
    "summary": "二分查找不是背模板，而是在有序世界里持续砍掉不可能区间。",
    "quiz": [
      {
        "prompt": "二分查找能够成立，最核心的前提是什么？",
        "options": [
          "数组长度是偶数",
          "数组元素互不相同",
          "数据有序或满足单调性",
          "数组只能有整数"
        ],
        "answer": 2,
        "feedback": "没有有序性或单调性，就无法根据 mid 的结果排除一半区间。"
      },
      {
        "prompt": "搜索插入位置时，为什么命中 target 还常常要继续收缩边界？",
        "options": [
          "为了让代码更短",
          "为了找最左可行位置",
          "为了减少空间复杂度",
          "因为 mid 不能返回"
        ],
        "answer": 1,
        "feedback": "这题找的是左边界，不只是“有没有”。"
      },
      {
        "prompt": "标准闭区间二分里，循环条件最常见写法是什么？",
        "options": [
          "left < right",
          "left <= right",
          "left != right",
          "left >= 0"
        ],
        "answer": 1,
        "feedback": "在闭区间 [left, right] 写法里，通常使用 left <= right。"
      }
    ],
    "visual": {
      "type": "binary"
    }
  },
  {
    "id": "hash-table",
    "order": "06",
    "title": "哈希表与字典",
    "subtitle": "把重复查找变成常数级命中",
    "heroSummary": "dict 和 set 是 Python 刷题的核心武器之一。只要题目涉及快速判断、计数、去重、索引映射，你都应该第一时间想到它们。",
    "path": "面试导向系统课",
    "duration": "28 min",
    "difficulty": "基础到中等",
    "outcome": "哈希优化意识",
    "visualTitle": "哈希命中与两数之和演示",
    "visualSubtitle": "看元素如何进入桶，补数如何命中，理解“用空间换时间”的直观含义。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么我们需要比线性查找更快的结构",
        "body": "如果每次判断一个值是否存在，都要从头扫到尾，很多程序会慢得无法接受。哈希表的目标，就是把“查找某个值”从线性扫描变成接近常数级命中。",
        "bullets": [
          "它解决的是快速定位问题",
          "它广泛用于缓存、索引、计数和映射",
          "Python 的 dict 和 set 就是最常用的哈希结构"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多题会卡在重复查找上",
        "body": "很多暴力题并不是因为遍历本身慢，而是因为你在遍历过程中不断做线性查找。两数之和、字母异位词、字符串去重，本质瓶颈都是“我要快速知道某个值是否出现过”。",
        "bullets": [
          "重复查找导致 O(n²) 非常常见",
          "计数类题如果不用哈希，代码往往又慢又绕",
          "哈希表的代价是空间上升，但换来很大的时间收益"
        ],
        "keyLine": "只要题目在问“是否存在 / 出现几次 / 对应位置在哪”，就要高度警惕哈希表。"
      },
      {
        "label": "核心思想",
        "title": "把值映射到位置，而不是每次都重新找",
        "body": "哈希表的本质，是提前记录信息，避免未来重复工作。对做题来说，最重要的不是底层公式，而是你能否想到：我能不能把需要的信息先存起来，后面直接命中？",
        "bullets": [
          "set 适合做存在性判断和去重",
          "dict 适合做值到下标、字符到次数等映射",
          "哈希表最典型的 trade-off 是空间换时间"
        ]
      }
    ],
    "examples": [
      {
        "title": "两数之和",
        "pattern": "值到下标映射",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定数组 nums 和目标值 target，返回两数之和等于 target 的两个下标。",
        "whyAsk": "这是哈希表章节最经典的代表题，面试官几乎用它来直接判断你是否具备哈希优化意识。",
        "approaches": [
          {
            "id": "brute",
            "label": "暴力双循环",
            "summary": "枚举所有二元组，只要找到就返回两个下标。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "暴力法逻辑简单，但每个元素都要继续向后配对，数据量一大时会明显变慢。",
            "code": "def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n\n    return []"
          },
          {
            "id": "optimized",
            "label": "一次遍历哈希",
            "summary": "记录“某个值第一次出现在哪”，遍历到当前值时立刻检查补数。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "真正关键的转换是：把“再去找另一个数”变成“直接查字典里有没有需要的补数”。",
            "code": "def two_sum_fast(nums, target):\n    seen = {}  # 键：数字本身，值：它出现过的下标\n\n    for i, x in enumerate(nums):\n        need = target - x\n\n        # 如果补数已经出现过，直接得到答案\n        if need in seen:\n            return [seen[need], i]\n\n        # 先判断，再记录当前元素，避免自己和自己配对\n        seen[x] = i\n\n    return []"
          }
        ],
        "takeaway": [
          "dict 常见用途之一是“值 -> 下标”映射",
          "遍历顺序和记录时机经常决定代码是否正确",
          "面试里一定要能解释为什么先查再存"
        ]
      },
      {
        "title": "有效的字母异位词",
        "pattern": "频次统计",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "给定两个字符串 s 和 t，判断它们是否互为字母异位词。",
        "whyAsk": "这题很经典，因为它能直接考你是否会把字符问题转成频次统计问题。",
        "approaches": [
          {
            "id": "sort",
            "label": "排序对比",
            "summary": "把两个字符串排序后比较是否相同。",
            "complexity": "时间 O(n log n) · 空间 O(n)",
            "explanation": "排序法很好理解，但没有抓住题目本质：我们真正关心的是每个字符出现次数是否一致。",
            "code": "def is_anagram_sort(s, t):\n    # 排序后完全相同，说明字符构成一致\n    return sorted(s) == sorted(t)"
          },
          {
            "id": "count",
            "label": "哈希计数",
            "summary": "统计两个字符串中每个字符的出现次数，再比较计数字典。",
            "complexity": "时间 O(n) · 空间 O(k)",
            "explanation": "字符类题目里，频次统计是最常见的哈希用法之一。它比排序更贴近问题本质。",
            "code": "def is_anagram_count(s, t):\n    if len(s) != len(t):\n        return False\n\n    counter = {}\n\n    for ch in s:\n        counter[ch] = counter.get(ch, 0) + 1\n\n    for ch in t:\n        if ch not in counter:\n            return False\n\n        counter[ch] -= 1\n\n        # 次数减到负数，说明 t 中这个字符出现过多\n        if counter[ch] < 0:\n            return False\n\n    return True"
          }
        ],
        "takeaway": [
          "字符题常常可以转成频次数组或字典问题",
          "排序是可用方案，但频次统计更贴近哈希思维",
          "要有存在性和频次两类哈希意识"
        ]
      },
      {
        "title": "最长连续序列",
        "pattern": "集合跳过重复工作",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定一个未排序数组，求最长连续序列的长度。",
        "whyAsk": "这题很能体现哈希表不只是查一个值，还能帮助你跳过不必要的重复工作。",
        "approaches": [
          {
            "id": "sortway",
            "label": "排序后扫描",
            "summary": "先排序，再统计连续段长度。",
            "complexity": "时间 O(n log n) · 空间 O(1) 或 O(n)",
            "explanation": "排序法很自然，但它没有达到这题更理想的线性级目标。",
            "code": "def longest_consecutive(nums):\n    if not nums:\n        return 0\n\n    nums.sort()\n    best = 1\n    current = 1\n\n    for i in range(1, len(nums)):\n        if nums[i] == nums[i - 1]:\n            continue\n        if nums[i] == nums[i - 1] + 1:\n            current += 1\n        else:\n            best = max(best, current)\n            current = 1\n\n    return max(best, current)"
          },
          {
            "id": "setscan",
            "label": "集合起点法",
            "summary": "只从连续序列的起点开始往后扩展，避免重复扫描。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "核心优化点不是单次查找，而是识别“谁才值得作为起点开始扩展”。",
            "code": "def longest_consecutive_fast(nums):\n    num_set = set(nums)\n    best = 0\n\n    for x in num_set:\n        # 只有当 x-1 不存在时，x 才是某段连续序列的起点\n        if x - 1 not in num_set:\n            current = x\n            length = 1\n\n            while current + 1 in num_set:\n                current += 1\n                length += 1\n\n            best = max(best, length)\n\n    return best"
          }
        ],
        "takeaway": [
          "哈希优化不只是把查找变快，也可以避免重复扩展",
          "看到“连续”“存在”“未排序”时，要考虑 set",
          "识别起点，是这题从 O(n log n) 到 O(n) 的关键"
        ]
      }
    ],
    "implementation": [
      "先识别题目是在问存在性、计数，还是索引映射",
      "如果是存在性判断，优先考虑 set；如果是映射或计数，优先考虑 dict",
      "遍历时要想清楚是先查后存还是先存后查"
    ],
    "complexityNotes": [
      "dict / set 的查找和插入平均是 O(1)，这是哈希优化成立的基础",
      "哈希表不是免费午餐，它通常要付出 O(n) 额外空间",
      "哈希碰撞会影响常数，但面试里重点仍是平均复杂度与适用场景"
    ],
    "applications": [
      "缓存系统、数据库索引、权限映射、去重流程都大量使用哈希表",
      "日志聚合、词频统计、用户画像标签统计，本质上都是计数型哈希问题",
      "实时业务中，是否存在、是否重复、对应关系查找，几乎都离不开 dict / set"
    ],
    "summary": "哈希表真正厉害的地方，不是神秘，而是帮你避免“重复找同一件事”。",
    "quiz": [
      {
        "prompt": "题目要求快速判断一个值是否已经出现过，第一反应最应该想到什么？",
        "options": [
          "递归",
          "set",
          "栈",
          "二叉树遍历"
        ],
        "answer": 1,
        "feedback": "存在性判断和去重，是 set 最经典的使用场景。"
      },
      {
        "prompt": "为什么两数之和的一次遍历哈希写法要先查补数再存当前值？",
        "options": [
          "为了代码更短",
          "为了避免一个元素和自己配对",
          "因为字典不能覆盖",
          "因为这样空间更小"
        ],
        "answer": 1,
        "feedback": "先查后存可以防止当前元素被自己错误命中。"
      },
      {
        "prompt": "最长连续序列的集合写法，为什么只从“起点”开始扩展？",
        "options": [
          "为了更容易排序",
          "为了避免重复扫描同一段序列",
          "为了节省哈希空间",
          "因为 set 只能正向查"
        ],
        "answer": 1,
        "feedback": "如果不是起点就扩展，会把同一段连续序列重复计算很多遍。"
      }
    ],
    "visual": {
      "type": "hash"
    }
  },
  {
    "id": "two-pointers",
    "order": "10",
    "title": "双指针",
    "subtitle": "用两个位置关系换掉重复扫描",
    "heroSummary": "双指针的重点不是两个变量本身，而是利用位置关系控制搜索空间。很多数组、字符串、链表题都会因为双指针而突然变简单。",
    "path": "面试导向系统课",
    "duration": "28 min",
    "difficulty": "基础到中等",
    "outcome": "位置关系思维",
    "visualTitle": "双指针相向 / 同向推进演示",
    "visualSubtitle": "看两个指针如何根据条件移动，理解为什么它能减少重复工作。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么有些题不该老老实实双重循环",
        "body": "很多题表面看像要枚举两个位置，但实际上题目给了足够的顺序信息，可以让两个指针协同移动，而不是把所有组合都试一遍。",
        "bullets": [
          "双指针常用于数组、字符串、链表",
          "它的核心是用位置关系减少无效比较",
          "很多 O(n²) 暴力题可以优化到 O(n) 或 O(n log n)"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人知道双指针却不会用",
        "body": "因为只记题型，不记触发信号。什么时候相向移动，什么时候同向滑动，什么时候快慢指针，核心都在于题目想让你利用什么顺序关系。",
        "bullets": [
          "有序数组中常见相向双指针",
          "原地覆盖和去重常见同向双指针",
          "链表中间点、环检测常见快慢指针"
        ],
        "keyLine": "双指针不是模板名，而是一种用“移动规则”替代“重复枚举”的思维。"
      },
      {
        "label": "核心思想",
        "title": "每一步移动都应该有明确依据",
        "body": "双指针题最重要的问题是：为什么该移动左边，而不是右边？为什么能保证移动后不会漏解？你必须让每一步移动都建立在题目的单调性或顺序性质上。",
        "bullets": [
          "相向双指针：通常利用有序性",
          "同向双指针：通常维护有效区间或有效前缀",
          "快慢指针：通常利用速度差建立位置关系"
        ]
      }
    ],
    "examples": [
      {
        "title": "两数之和 II",
        "pattern": "相向双指针",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "在有序数组中找到两数之和等于 target 的两个下标。",
        "whyAsk": "这题是相向双指针最标准的入口题，能很好体现“有序条件如何替代双重循环”。",
        "approaches": [
          {
            "id": "brute",
            "label": "双重循环",
            "summary": "枚举所有二元组，看哪一组满足条件。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "能做，但完全没有利用有序数组条件，所以比较浪费。",
            "code": "def two_sum_sorted(numbers, target):\n    for i in range(len(numbers)):\n        for j in range(i + 1, len(numbers)):\n            if numbers[i] + numbers[j] == target:\n                return [i + 1, j + 1]\n\n    return []"
          },
          {
            "id": "towards",
            "label": "相向双指针",
            "summary": "左指针指向最小值，右指针指向最大值，根据和的大小收缩区间。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "因为数组有序，如果和太小，就必须让左指针右移；如果和太大，就必须让右指针左移。",
            "code": "def two_sum_sorted_fast(numbers, target):\n    left, right = 0, len(numbers) - 1\n\n    while left < right:\n        total = numbers[left] + numbers[right]\n\n        if total == target:\n            return [left + 1, right + 1]\n        if total < target:\n            left += 1\n        else:\n            right -= 1\n\n    return []"
          }
        ],
        "takeaway": [
          "有序数组是相向双指针的强触发信号",
          "移动哪边，取决于当前和与目标值的大小关系",
          "相向双指针经常把 O(n²) 降到 O(n)"
        ]
      },
      {
        "title": "盛最多水的容器",
        "pattern": "证明式移动",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定数组 height，找出两条线围成的最大容器面积。",
        "whyAsk": "这题很经典，因为它不是一眼就能想到双指针，但一旦理解移动逻辑，就会记得特别牢。",
        "approaches": [
          {
            "id": "allpairs",
            "label": "枚举所有边界",
            "summary": "尝试每一对左右边界，计算面积取最大。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "暴力法能做，但数据规模稍大就会慢。",
            "code": "def max_area(height):\n    best = 0\n\n    for i in range(len(height)):\n        for j in range(i + 1, len(height)):\n            area = (j - i) * min(height[i], height[j])\n            best = max(best, area)\n\n    return best"
          },
          {
            "id": "shorter",
            "label": "移动短板",
            "summary": "左右指针夹住区间，每次只移动较短的一边。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "因为面积受短板限制，移动长板没有意义；只有尝试换掉短板，才有可能让高度瓶颈变大。",
            "code": "def max_area_fast(height):\n    left, right = 0, len(height) - 1\n    best = 0\n\n    while left < right:\n        width = right - left\n        area = width * min(height[left], height[right])\n        best = max(best, area)\n\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n\n    return best"
          }
        ],
        "takeaway": [
          "双指针移动规则必须有证明依据",
          "这题的关键是‘面积被短板限制’",
          "面试里讲清楚为什么移动短板，比写出代码更加分"
        ]
      },
      {
        "title": "删除排序数组中的重复项 II",
        "pattern": "同向覆盖",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "有序数组中每个元素最多保留 2 次，原地修改并返回新长度。",
        "whyAsk": "这题用来训练你对同向双指针覆盖写入的掌控能力。",
        "approaches": [
          {
            "id": "extra-array",
            "label": "额外数组收集",
            "summary": "扫描数组，合法元素放入新数组，最后再写回。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "容易写，但没有体现原地覆盖的核心。",
            "code": "def remove_duplicates_twice(nums):\n    result = []\n\n    for x in nums:\n        if len(result) < 2 or x != result[-2]:\n            result.append(x)\n\n    for i in range(len(result)):\n        nums[i] = result[i]\n\n    return len(result)"
          },
          {
            "id": "cover-two",
            "label": "双指针原地覆盖",
            "summary": "写指针决定下一个合法元素写到哪，读指针负责扫描。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "利用有序数组特性，只要当前值和写入区倒数第二个值不同，就可以保留。",
            "code": "def remove_duplicates_twice_fast(nums):\n    if len(nums) <= 2:\n        return len(nums)\n\n    write = 2\n\n    for read in range(2, len(nums)):\n        if nums[read] != nums[write - 2]:\n            nums[write] = nums[read]\n            write += 1\n\n    return write"
          }
        ],
        "takeaway": [
          "同向双指针非常适合原地保留/过滤类题",
          "有序数组的相邻关系能极大简化判断",
          "写指针的语义一定要讲清楚"
        ]
      }
    ],
    "implementation": [
      "先识别题目利用的是有序性、区间有效性，还是速度差",
      "为每个指针定义清楚职责：谁负责读，谁负责写，谁负责收缩",
      "移动规则必须能解释为什么不会漏掉答案"
    ],
    "complexityNotes": [
      "双指针常见时间复杂度是 O(n)，因为每个指针通常单调移动",
      "相向双指针多为 O(1) 额外空间",
      "双指针优化的关键不是技巧，而是题目中存在单调性或可收缩性"
    ],
    "applications": [
      "字符串清洗、数组原地去重、链表快慢检测都依赖双指针",
      "很多流式数据处理、本地编辑器操作也体现了读写双指针思想",
      "双指针是滑动窗口、快慢指针等更大类方法的核心基础"
    ],
    "summary": "双指针真正重要的不是有两个指针，而是每一步移动都有明确逻辑依据。",
    "quiz": [],
    "visual": {
      "type": "twopointers"
    }
  },
  {
    "id": "sliding-window",
    "order": "11",
    "title": "滑动窗口",
    "subtitle": "维护一个动态有效区间",
    "heroSummary": "滑动窗口可以看成双指针的一个强力分支。它的核心不是‘窗口’这个词，而是持续维护一个满足条件的区间。",
    "path": "面试导向系统课",
    "duration": "30 min",
    "difficulty": "基础到中等",
    "outcome": "区间维护思维",
    "visualTitle": "窗口扩张与收缩演示",
    "visualSubtitle": "看 left/right 如何动态调整，理解窗口题为什么本质上是维护条件。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么很多子数组/子串题不该重复从头算",
        "body": "如果每次都重新统计一个区间的信息，代价会很高。滑动窗口的目标，就是让区间在移动时尽量复用之前已经算过的信息。",
        "bullets": [
          "特别适合连续子数组、连续子串问题",
          "本质是动态维护一个区间状态",
          "很多 O(n²) 枚举区间题可以优化到 O(n)"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人分不清双指针和滑动窗口",
        "body": "滑动窗口本质上也是双指针，但它比一般双指针更强调‘区间状态维护’。你不只是移动 left/right，还要同步更新窗口里的计数、和、最大值等信息。",
        "bullets": [
          "窗口扩张时要加什么信息",
          "窗口收缩时要删什么信息",
          "什么时候该收缩，是窗口题的灵魂"
        ],
        "keyLine": "滑动窗口不是简单移动两个指针，而是在维护‘当前窗口是否仍然有效’。"
      },
      {
        "label": "核心思想",
        "title": "右边扩张找机会，左边收缩保条件",
        "body": "很多窗口题都遵循同一个模式：右指针不断扩张，把新元素纳入窗口；一旦窗口不再满足条件，就移动左指针收缩，直到恢复有效。",
        "bullets": [
          "固定窗口：窗口大小不变，常见于求最大和",
          "可变窗口：窗口根据条件收缩，常见于最短覆盖、无重复子串",
          "窗口题的关键是状态变量和收缩条件"
        ]
      }
    ],
    "examples": [
      {
        "title": "长度最小的子数组",
        "pattern": "可变窗口",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "找和大于等于 target 的最短连续子数组长度。",
        "whyAsk": "这题非常适合建立‘右扩张、左收缩’的标准窗口节奏。",
        "approaches": [
          {
            "id": "enumerate-all",
            "label": "枚举所有区间",
            "summary": "固定起点和终点，计算每个区间和。",
            "complexity": "时间 O(n²) · 空间 O(1)",
            "explanation": "能做，但大量重复计算区间和，效率很低。",
            "code": "def min_sub_array_len(target, nums):\n    best = float(\"inf\")\n\n    for i in range(len(nums)):\n        total = 0\n        for j in range(i, len(nums)):\n            total += nums[j]\n            if total >= target:\n                best = min(best, j - i + 1)\n                break\n\n    return 0 if best == float(\"inf\") else best"
          },
          {
            "id": "window-shrink",
            "label": "滑动窗口",
            "summary": "右指针负责扩张，左指针负责在满足条件后尽量收缩。",
            "complexity": "时间 O(n) · 空间 O(1)",
            "explanation": "窗口中每个元素最多进一次、出一次，所以整体是线性时间。",
            "code": "def min_sub_array_len_fast(target, nums):\n    left = 0\n    total = 0\n    best = float(\"inf\")\n\n    for right in range(len(nums)):\n        total += nums[right]\n\n        while total >= target:\n            best = min(best, right - left + 1)\n            total -= nums[left]\n            left += 1\n\n    return 0 if best == float(\"inf\") else best"
          }
        ],
        "takeaway": [
          "窗口题的灵魂是‘满足条件后继续缩’",
          "左右指针都只单调前进，所以常常是 O(n)",
          "先问自己：窗口里需要维护什么状态"
        ]
      },
      {
        "title": "无重复字符的最长子串",
        "pattern": "窗口去重",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "返回不含重复字符的最长子串长度。",
        "whyAsk": "这是字符串滑动窗口最经典的高频题之一，特别适合训练窗口状态维护。",
        "approaches": [
          {
            "id": "all-substrings",
            "label": "枚举所有子串",
            "summary": "尝试每个起点和终点，检查子串是否有重复。",
            "complexity": "时间 O(n³) 或 O(n²) · 空间 O(n)",
            "explanation": "思路直观，但重复检查非常多，效率差。",
            "code": "def length_of_longest_substring(s):\n    best = 0\n\n    for i in range(len(s)):\n        seen = set()\n        for j in range(i, len(s)):\n            if s[j] in seen:\n                break\n            seen.add(s[j])\n            best = max(best, j - i + 1)\n\n    return best"
          },
          {
            "id": "window-set",
            "label": "窗口 + 集合",
            "summary": "右指针扩张，遇到重复时左指针持续收缩直到窗口恢复无重复。",
            "complexity": "时间 O(n) · 空间 O(k)",
            "explanation": "这题最重要的是理解：重复出现时，不是重来，而是缩掉左边直到问题消失。",
            "code": "def length_of_longest_substring_fast(s):\n    left = 0\n    seen = set()\n    best = 0\n\n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n\n    return best"
          }
        ],
        "takeaway": [
          "窗口去重类题常和 set / dict 联动",
          "遇到非法状态时，不是推倒重来，而是左边收缩修复状态",
          "窗口题经常和哈希表组合出现"
        ]
      },
      {
        "title": "字符串排列",
        "pattern": "固定窗口计数",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "判断字符串 s2 是否包含 s1 的某个排列。",
        "whyAsk": "这题适合训练固定窗口和字符频次维护。",
        "approaches": [
          {
            "id": "sort-compare",
            "label": "逐段排序比较",
            "summary": "枚举 s2 中长度等于 s1 的每个子串，排序后比较。",
            "complexity": "时间 O(n * m log m) · 空间 O(m)",
            "explanation": "能做，但每次都重新排序子串，成本太高。",
            "code": "def check_inclusion(s1, s2):\n    target = sorted(s1)\n    window_size = len(s1)\n\n    for i in range(len(s2) - window_size + 1):\n        if sorted(s2[i:i + window_size]) == target:\n            return True\n\n    return False"
          },
          {
            "id": "freq-window",
            "label": "固定窗口频次比较",
            "summary": "维护一个长度固定为 len(s1) 的窗口，并实时更新字符频次。",
            "complexity": "时间 O(n) · 空间 O(1) 或 O(k)",
            "explanation": "固定长度窗口的关键是：右边进一个，左边就同步出一个。",
            "code": "from collections import Counter\n\ndef check_inclusion_fast(s1, s2):\n    need = Counter(s1)\n    window = Counter()\n    left = 0\n\n    for right in range(len(s2)):\n        window[s2[right]] += 1\n\n        if right - left + 1 > len(s1):\n            window[s2[left]] -= 1\n            if window[s2[left]] == 0:\n                del window[s2[left]]\n            left += 1\n\n        if right - left + 1 == len(s1) and window == need:\n            return True\n\n    return False"
          }
        ],
        "takeaway": [
          "固定窗口重点在于‘进一个，出一个’",
          "字符题常常是频次维护问题",
          "Counter/字典是窗口题的重要搭档"
        ]
      }
    ],
    "implementation": [
      "先判断窗口是固定长度还是可变长度",
      "明确窗口状态变量：和、计数、集合、最大值等",
      "遇到不满足条件时，先想清楚窗口该怎么收缩修复"
    ],
    "complexityNotes": [
      "很多窗口题能做到 O(n)，因为左右指针都只向前移动",
      "空间复杂度常取决于窗口里维护的状态结构，例如 set / dict / Counter",
      "窗口优化的本质是复用相邻区间的已有信息"
    ],
    "applications": [
      "日志流监控、实时统计、连续行为检测都和窗口思想高度相关",
      "文本分析、DNA 序列匹配、流式告警都常用固定或可变窗口",
      "滑动窗口是处理连续区间问题的高频工业思维"
    ],
    "summary": "滑动窗口最重要的不是窗口本身，而是你能否持续维护‘窗口有效性’。",
    "quiz": [],
    "visual": {
      "type": "window"
    }
  }
];

const stage2Templates = {
  "binary-search": "# 闭区间二分模板\nleft, right = 0, len(nums) - 1\nwhile left <= right:\n    mid = left + (right - left) // 2\n    if nums[mid] == target:\n        return mid\n    if nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1",
  "hash-table": "# 哈希表统计 / 映射模板\nseen = {}\nfor i, x in enumerate(nums):\n    if 条件命中:\n        return 结果\n    seen[x] = i",
  "two-pointers": "# 相向双指针模板\nleft, right = 0, len(nums) - 1\nwhile left < right:\n    if 命中答案:\n        return ...\n    if 当前值偏小:\n        left += 1\n    else:\n        right -= 1",
  "sliding-window": "# 可变滑动窗口模板\nleft = 0\nstate = 初始化状态\nfor right in range(len(data)):\n    把 data[right] 纳入窗口\n    while 窗口不合法:\n        移除 data[left]\n        left += 1\n    更新答案"
};

export { stage2Lessons, stage2Templates };
