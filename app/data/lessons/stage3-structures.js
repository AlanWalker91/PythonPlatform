const stage3Lessons = [
  {
    "id": "tree",
    "order": "07",
    "title": "树与二叉树",
    "subtitle": "从线性结构进入层级结构",
    "heroSummary": "树把“父子层级关系”变成了可计算结构。学会树，很多组织架构、目录系统、表达式结构和搜索问题都会变得自然。",
    "path": "面试导向系统课",
    "duration": "30 min",
    "difficulty": "基础到中等",
    "outcome": "树结构直觉",
    "visualTitle": "二叉树层级与遍历演示",
    "visualSubtitle": "看节点如何按层分布，以及前序/中序/后序遍历分别在什么时候访问节点。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么数组和链表不够用",
        "body": "很多现实问题不是线性排列，而是天然带层级关系：公司组织架构、文件目录、HTML DOM、表达式语法树。树结构就是用来描述这种“一个节点下面还能接很多子节点”的关系。",
        "bullets": [
          "树解决的是层级化组织数据的问题",
          "二叉树是最经典、最适合入门的树形结构",
          "学会树后，很多递归问题会突然变得自然"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么树题常让人一眼发懵",
        "body": "因为树题通常不再是简单的线性遍历，而是要同时处理“当前节点”和“子树”。如果脑中没有‘节点 + 左右子树’这个递归画面，就很容易乱。",
        "bullets": [
          "不知道遍历顺序为什么不同",
          "递归时分不清‘当前层该做什么’和‘子问题该做什么’",
          "层序遍历和深度遍历容易混淆"
        ],
        "keyLine": "树题最重要的不是背模板，而是把“当前节点 + 子树”想清楚。"
      },
      {
        "label": "核心思想",
        "title": "每个节点都能看成一棵更小的树",
        "body": "树题几乎天然适合递归，因为任意节点都可以作为一棵小树的根。你只要明确当前节点要做什么，再把同样的问题交给左右子树，就能写出很多看似复杂的树题。",
        "bullets": [
          "前序：先处理当前节点，再处理左右子树",
          "中序：先左子树，再当前节点，再右子树",
          "后序：先左右子树，再当前节点"
        ]
      }
    ],
    "examples": [
      {
        "title": "二叉树前序遍历",
        "pattern": "递归入门",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "返回二叉树的前序遍历结果。",
        "whyAsk": "这是树题最经典的入门模板，面试官会借它看你是否真正理解递归访问顺序。",
        "approaches": [
          {
            "id": "iter-list",
            "label": "手动栈模拟",
            "summary": "用栈手动控制访问顺序，模拟递归过程。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "它能帮助你理解递归本质上也是在借助调用栈管理未完成节点。",
            "code": "def preorder_traversal(root):\n    if not root:\n        return []\n\n    stack = [root]\n    result = []\n\n    while stack:\n        node = stack.pop()\n        result.append(node.val)\n\n        # 先压右，再压左，保证左子树先被处理\n        if node.right:\n            stack.append(node.right)\n        if node.left:\n            stack.append(node.left)\n\n    return result"
          },
          {
            "id": "recursive",
            "label": "递归前序",
            "summary": "当前节点 -> 左子树 -> 右子树。",
            "complexity": "时间 O(n) · 空间 O(h)",
            "explanation": "这是最贴近树定义的写法。关键是把访问当前节点和递归子树的顺序固定下来。",
            "code": "def preorder_traversal_fast(root):\n    result = []\n\n    def dfs(node):\n        if not node:\n            return\n\n        result.append(node.val)  # 先访问当前节点\n        dfs(node.left)           # 再递归左子树\n        dfs(node.right)          # 最后递归右子树\n\n    dfs(root)\n    return result"
          }
        ],
        "takeaway": [
          "树题入门先把三种 DFS 顺序练熟",
          "前序遍历的访问时机是‘递归下去之前’",
          "递归和手动栈往往是可互换的两种视角"
        ]
      },
      {
        "title": "二叉树最大深度",
        "pattern": "树形递归",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "求二叉树的最大深度。",
        "whyAsk": "这题特别适合训练‘当前节点答案由左右子树答案组合而来’的树形 DP 思维。",
        "approaches": [
          {
            "id": "bfs",
            "label": "层序计层数",
            "summary": "按层遍历，每处理完一层深度加一。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "层序能做，但它更偏队列思维。这里的价值在于和递归方案做对照。",
            "code": "from collections import deque\n\ndef max_depth(root):\n    if not root:\n        return 0\n\n    queue = deque([root])\n    depth = 0\n\n    while queue:\n        depth += 1\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n    return depth"
          },
          {
            "id": "rec-depth",
            "label": "递归求深度",
            "summary": "当前节点深度 = max(左子树深度, 右子树深度) + 1。",
            "complexity": "时间 O(n) · 空间 O(h)",
            "explanation": "这是树题里最经典的递归组合方式：先求子问题，再组合当前答案。",
            "code": "def max_depth_fast(root):\n    if not root:\n        return 0\n\n    left_depth = max_depth_fast(root.left)\n    right_depth = max_depth_fast(root.right)\n\n    return max(left_depth, right_depth) + 1"
          }
        ],
        "takeaway": [
          "树高题很适合练递归返回值语义",
          "很多树题答案都是由左右子树组合出来的",
          "层序和递归都能做，但树形递归更贴近本质"
        ]
      },
      {
        "title": "对称二叉树",
        "pattern": "镜像比较",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "判断一棵二叉树是否关于中心对称。",
        "whyAsk": "这题很适合训练“两个子树之间的关系”而不是只看单棵子树。",
        "approaches": [
          {
            "id": "serialize",
            "label": "序列化后比较",
            "summary": "把左右子树序列化，再比较是否互为镜像。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "能做，但绕了一层。它没有直接表达出镜像比较的核心关系。",
            "code": "def is_symmetric(root):\n    def serialize(node):\n        if not node:\n            return [None]\n        return [node.val] + serialize(node.left) + serialize(node.right)\n\n    if not root:\n        return True\n\n    left = serialize(root.left)\n    right = serialize(root.right)\n    return left == right[::-1]"
          },
          {
            "id": "mirror-rec",
            "label": "递归镜像比较",
            "summary": "左子树的左边要和右子树的右边相等，左子树的右边要和右子树的左边相等。",
            "complexity": "时间 O(n) · 空间 O(h)",
            "explanation": "这题的关键不是遍历，而是成对比较两个位置是否互为镜像。",
            "code": "def is_symmetric_fast(root):\n    def is_mirror(left, right):\n        if not left and not right:\n            return True\n        if not left or not right:\n            return False\n        if left.val != right.val:\n            return False\n\n        return is_mirror(left.left, right.right) and is_mirror(left.right, right.left)\n\n    if not root:\n        return True\n\n    return is_mirror(root.left, root.right)"
          }
        ],
        "takeaway": [
          "树题不一定只看单节点，也可能比较两棵子树关系",
          "镜像题的关键是配对位置",
          "递归参数不一定只传一个节点"
        ]
      }
    ],
    "implementation": [
      "先判断题目是在考 DFS、BFS，还是树形递归返回值",
      "如果答案依赖左右子树，优先考虑递归返回值怎么定义",
      "如果题目强调按层、最短步数或波次扩散，则优先考虑队列层序"
    ],
    "complexityNotes": [
      "大多数树遍历时间复杂度都是 O(n)，因为每个节点至少访问一次",
      "递归空间复杂度常写 O(h)，h 是树高",
      "极度不平衡树会让递归深度接近 O(n)"
    ],
    "applications": [
      "组织架构、文件目录、语法树、评论楼层都天然是树结构",
      "数据库索引、搜索系统、编译器内部结构大量依赖树",
      "树题训练的是层级关系建模能力，这是很多复杂系统设计的基础"
    ],
    "summary": "树题的灵魂是：当前节点答案，如何由子树答案和当前信息组合而来。",
    "quiz": [],
    "visual": {
      "type": "tree"
    }
  },
  {
    "id": "heap",
    "order": "08",
    "title": "堆与优先队列",
    "subtitle": "快速拿到当前最值",
    "heroSummary": "堆并不是为了排序全部元素，而是为了高效维护“当前最小”或“当前最大”。看到 Top K、合并有序流、调度问题，都要对堆敏感。",
    "path": "面试导向系统课",
    "duration": "30 min",
    "difficulty": "基础到中等",
    "outcome": "Top K 与最值维护意识",
    "visualTitle": "小顶堆上浮 / 下沉演示",
    "visualSubtitle": "看元素如何保持堆序，理解为什么堆适合动态维护当前最值。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么排序还不够",
        "body": "如果你每次都为了拿最小值或前 K 大把所有元素重新排序，代价通常过高。堆的目标不是把整体完全排好，而是用更低成本维护‘谁当前最值得先拿出来’。",
        "bullets": [
          "堆适合动态数据流，不适合只做一次静态排序的场景",
          "Python 里最常用的是 `heapq` 小顶堆",
          "Top K、合并多个有序流、任务调度都和堆高度相关"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么很多人想到 Top K 只会先排序",
        "body": "因为没有建立‘部分最优维护’的意识。排序是全局有序，而堆只要求局部有序就够了，这正是它省时间的原因。",
        "bullets": [
          "不是所有问题都需要完整排序",
          "堆关注的是堆顶，而不是整体顺序",
          "面试里经常考的就是你能否避免‘全排一遍’"
        ],
        "keyLine": "堆最重要的价值，不是排整齐，而是快速拿到当前最值。"
      },
      {
        "label": "核心思想",
        "title": "用局部顺序维护全局最值入口",
        "body": "小顶堆保证每个父节点都不大于子节点，因此堆顶始终是当前最小值。最大堆也是同理。你不需要知道每个元素的完整排名，只要知道堆顶永远是‘当前最该先处理的那个’。",
        "bullets": [
          "建堆、插入、弹出都围绕上浮和下沉",
          "Python 默认是小顶堆，求大顶堆通常对值取负",
          "固定大小的堆特别适合 Top K"
        ]
      }
    ],
    "examples": [
      {
        "title": "数组中的第 K 大元素",
        "pattern": "固定大小堆",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "在未排序数组中找到第 k 大的元素。",
        "whyAsk": "这是堆的最经典题型之一，几乎是 Top K 思维的标准入口。",
        "approaches": [
          {
            "id": "sort-all",
            "label": "整体排序",
            "summary": "先把数组排序，再取倒数第 k 个。",
            "complexity": "时间 O(n log n) · 空间 O(1) 或 O(n)",
            "explanation": "能做，但它解决的是比题目更大的问题：把所有元素都排好。这里其实只关心前 k 大。",
            "code": "def find_kth_largest(nums, k):\n    nums.sort()\n    return nums[-k]"
          },
          {
            "id": "heap-k",
            "label": "固定大小小顶堆",
            "summary": "维护一个大小为 k 的小顶堆，堆顶始终是当前第 k 大。",
            "complexity": "时间 O(n log k) · 空间 O(k)",
            "explanation": "只保留最重要的 k 个元素，比全量排序更贴近题目本质。",
            "code": "import heapq\n\ndef find_kth_largest_fast(nums, k):\n    heap = []\n\n    for x in nums:\n        if len(heap) < k:\n            heapq.heappush(heap, x)\n        elif x > heap[0]:\n            # 只有当前值比堆顶更大，才值得进入前 k 大集合\n            heapq.heapreplace(heap, x)\n\n    return heap[0]"
          }
        ],
        "takeaway": [
          "Top K 不一定要全排序",
          "固定大小小顶堆是第 K 大/前 K 大的标准套路",
          "时间复杂度从 O(n log n) 降到 O(n log k)"
        ]
      },
      {
        "title": "合并 K 个有序链表",
        "pattern": "多路归并",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "合并 k 个升序链表，返回合并后的升序链表。",
        "whyAsk": "这题能很好体现堆在‘多个来源里反复选最小值’时的价值。",
        "approaches": [
          {
            "id": "flatten-sort",
            "label": "展开后排序",
            "summary": "把所有值取出来，排序后再重建链表。",
            "complexity": "时间 O(n log n) · 空间 O(n)",
            "explanation": "能完成任务，但完全丢掉了每个链表本来就是有序的宝贵信息。",
            "code": "def merge_k_lists(lists):\n    values = []\n    for head in lists:\n        while head:\n            values.append(head.val)\n            head = head.next\n\n    values.sort()\n    return values  # 这里用值序列代表结果，便于演示"
          },
          {
            "id": "heap-merge",
            "label": "最小堆多路归并",
            "summary": "每次从 k 个链表当前头节点里取最小值，再把它的后继放回堆中。",
            "complexity": "时间 O(n log k) · 空间 O(k)",
            "explanation": "这题堆的价值特别直接：你只需要关心每个链表的当前头，而不是所有剩余元素。",
            "code": "import heapq\n\ndef merge_k_lists_fast(lists):\n    heap = []\n\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n\n    result = []\n\n    while heap:\n        value, i, node = heapq.heappop(heap)\n        result.append(value)\n\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n\n    return result  # 这里仍用值序列代表结果"
          }
        ],
        "takeaway": [
          "多个有序来源反复选最小值，是堆的强触发信号",
          "多路归并的关键是‘只维护每一路当前头部’",
          "堆把 k 路选择降到每次 O(log k)"
        ]
      },
      {
        "title": "前 K 个高频元素",
        "pattern": "统计 + 堆",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "返回数组中出现频率最高的前 k 个元素。",
        "whyAsk": "这题经常用来联合考察哈希计数和堆的配合能力。",
        "approaches": [
          {
            "id": "count-sort",
            "label": "计数后整体排序",
            "summary": "先统计频次，再按频次排序。",
            "complexity": "时间 O(n log n) · 空间 O(n)",
            "explanation": "思路直接，但对所有元素都完整排序了，代价比题目需要的大。",
            "code": "def top_k_frequent(nums, k):\n    freq = {}\n    for x in nums:\n        freq[x] = freq.get(x, 0) + 1\n\n    pairs = sorted(freq.items(), key=lambda item: item[1], reverse=True)\n    return [num for num, _ in pairs[:k]]"
          },
          {
            "id": "freq-heap",
            "label": "计数 + 小顶堆",
            "summary": "统计频次后，用固定大小小顶堆维护前 k 高频元素。",
            "complexity": "时间 O(n log k) · 空间 O(n)",
            "explanation": "哈希负责统计，堆负责筛出最重要的 k 个结果，这是很常见的组合技。",
            "code": "import heapq\n\ndef top_k_frequent_fast(nums, k):\n    freq = {}\n    for x in nums:\n        freq[x] = freq.get(x, 0) + 1\n\n    heap = []\n    for num, count in freq.items():\n        if len(heap) < k:\n            heapq.heappush(heap, (count, num))\n        elif count > heap[0][0]:\n            heapq.heapreplace(heap, (count, num))\n\n    return [num for _, num in heap]"
          }
        ],
        "takeaway": [
          "哈希 + 堆是面试里非常经典的组合",
          "统计类题如果最后只要前 K 个结果，要对堆敏感",
          "固定大小堆特别适合‘筛选最重要少数’"
        ]
      }
    ],
    "implementation": [
      "先判断题目是否只关心当前最值或前 K 个元素",
      "如果不是要完整排序，而是动态维护最重要元素，优先考虑堆",
      "Python 默认小顶堆，遇到大顶需求时要主动想到取负或反向维护"
    ],
    "complexityNotes": [
      "堆顶查询通常是 O(1)，插入和弹出通常是 O(log n)",
      "固定大小为 k 的堆，很多操作复杂度会变成 O(log k)",
      "Top K 问题的常见优化核心，就是从全量排序降到部分维护"
    ],
    "applications": [
      "任务调度、定时器系统、实时排行榜、流式 Top K 都是堆的主战场",
      "搜索系统和推荐系统常常需要动态维护候选结果的最值集合",
      "操作系统调度、优先队列消费、本质上都依赖堆序"
    ],
    "summary": "堆的价值在于：不用把所有元素排好，也能持续拿到当前最重要的那个。",
    "quiz": [],
    "visual": {
      "type": "heap"
    }
  },
  {
    "id": "graph-bfs-dfs",
    "order": "09",
    "title": "图、BFS 与 DFS",
    "subtitle": "从节点关系到搜索路径",
    "heroSummary": "图让我们能表达任意节点之间的连接关系。BFS 和 DFS 则是遍历图的两种基本方式，分别代表按层扩散和沿路径深入。",
    "path": "面试导向系统课",
    "duration": "32 min",
    "difficulty": "基础到中等",
    "outcome": "图搜索建模能力",
    "visualTitle": "图遍历波次演示",
    "visualSubtitle": "看 BFS 如何按层扩散，DFS 如何沿一条路径一路深入。",
    "sections": [
      {
        "label": "背景与来源",
        "title": "为什么树还不够描述现实连接",
        "body": "很多现实关系不是严格层级，而是任意连接：社交网络、航线地图、课程依赖、路由网络。这类问题不能只用树，因为一个节点可能和多个节点任意相连，于是我们需要图。",
        "bullets": [
          "图是比树更一般的连接结构",
          "节点 + 边，是图最基本的组成",
          "很多最短路、连通性、依赖分析题都建立在图上"
        ]
      },
      {
        "label": "痛点",
        "title": "为什么图题看起来像迷宫",
        "body": "因为图题表面形式很多：矩阵、邻接表、课程表、岛屿、单词接龙，但底层常常都在考‘如何从一个点扩展到它的邻居’。",
        "bullets": [
          "不会把题目抽象成节点和边",
          "BFS 和 DFS 场景分不清",
          "忘记标记访问状态，容易重复走甚至死循环"
        ],
        "keyLine": "图题的第一步，不是写代码，而是先把“谁是节点，谁和谁相连”建出来。"
      },
      {
        "label": "核心思想",
        "title": "BFS 按层扩散，DFS 沿路径深入",
        "body": "BFS 适合最短步数、最少层数、按波次推进；DFS 适合搜索所有可能路径、判断连通块、做回溯探索。它们的本质区别，是访问顺序不同。",
        "bullets": [
          "BFS 通常配队列",
          "DFS 通常配递归或显式栈",
          "无论 BFS 还是 DFS，都要有 visited 概念"
        ]
      }
    ],
    "examples": [
      {
        "title": "岛屿数量",
        "pattern": "网格图遍历",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定二维网格，统计岛屿数量。相邻的陆地属于同一座岛。",
        "whyAsk": "这题是矩阵图建模的经典题，能让你真正理解‘网格也是图’。",
        "approaches": [
          {
            "id": "scan-alone",
            "label": "只计数不扩展",
            "summary": "碰到陆地就加一，但不继续扩展整块区域。",
            "complexity": "错误思路",
            "explanation": "这类错误很常见：只看当前格子，不把整块连通区域一次性吃掉，就会重复计数。",
            "code": "def num_islands(grid):\n    count = 0\n    for row in grid:\n        for cell in row:\n            if cell == \"1\":\n                count += 1\n    return count"
          },
          {
            "id": "dfs-island",
            "label": "DFS 淹没整座岛",
            "summary": "每次遇到陆地，就用 DFS 把整块连通区域都标记掉。",
            "complexity": "时间 O(mn) · 空间 O(mn) 或 O(h)",
            "explanation": "这题的本质不是计数单个格子，而是数连通块。每发现一块新陆地，就要一次性吃掉整座岛。",
            "code": "def num_islands_fast(grid):\n    if not grid:\n        return 0\n\n    rows, cols = len(grid), len(grid[0])\n\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != \"1\":\n            return\n\n        grid[r][c] = \"0\"  # 标记为已访问\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == \"1\":\n                count += 1\n                dfs(r, c)\n\n    return count"
          }
        ],
        "takeaway": [
          "网格题常常本质上是图遍历",
          "看到“连通块数量”要对 DFS / BFS 敏感",
          "访问标记是避免重复遍历的关键"
        ]
      },
      {
        "title": "二叉树层序遍历",
        "pattern": "BFS 按层扩散",
        "difficulty": "简单",
        "frequency": "面试高频",
        "prompt": "按层序返回二叉树节点值。",
        "whyAsk": "它虽然长在树章节，但本质是 BFS 最标准的按层推进模板。",
        "approaches": [
          {
            "id": "dfs-level",
            "label": "DFS 记录深度",
            "summary": "用递归深度把值放到对应层数组里。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "能做，但它隐藏了 BFS 的层次推进画面。这里主要用于对比。",
            "code": "def level_order(root):\n    levels = []\n\n    def dfs(node, depth):\n        if not node:\n            return\n        if depth == len(levels):\n            levels.append([])\n        levels[depth].append(node.val)\n        dfs(node.left, depth + 1)\n        dfs(node.right, depth + 1)\n\n    dfs(root, 0)\n    return levels"
          },
          {
            "id": "bfs-level",
            "label": "队列 BFS",
            "summary": "每次取出当前层全部节点，再把下一层压入队列。",
            "complexity": "时间 O(n) · 空间 O(n)",
            "explanation": "它非常适合作为 BFS 模板，因为“按层处理”的感觉最清晰。",
            "code": "from collections import deque\n\ndef level_order_fast(root):\n    if not root:\n        return []\n\n    queue = deque([root])\n    result = []\n\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level)\n\n    return result"
          }
        ],
        "takeaway": [
          "BFS 最适合处理层次、最短步数、波次扩散",
          "len(queue) 经常用来锁定当前层节点数",
          "同一题可能既能 DFS 又能 BFS，但思维重点不同"
        ]
      },
      {
        "title": "课程表",
        "pattern": "图建模 + 环检测",
        "difficulty": "中等",
        "frequency": "面试高频",
        "prompt": "给定课程依赖关系，判断是否能完成所有课程。",
        "whyAsk": "这题非常经典，因为它要求你先把业务描述抽象成有向图，再判断图中是否有环。",
        "approaches": [
          {
            "id": "naive-deps",
            "label": "反复扫描依赖",
            "summary": "不断试着找没有前置条件的课程，靠重复扫描推进。",
            "complexity": "时间较高，逻辑复杂",
            "explanation": "能勉强推进，但很难稳定表达，也不适合作为面试答案。",
            "code": "def can_finish(num_courses, prerequisites):\n    remaining = prerequisites[:]\n    learned = set()\n    changed = True\n\n    while changed:\n        changed = False\n        for a, b in remaining[:]:\n            if b in learned or all(x != b for x, _ in prerequisites):\n                learned.add(a)\n                remaining.remove([a, b])\n                changed = True\n\n    return not remaining"
          },
          {
            "id": "topo",
            "label": "BFS 拓扑排序",
            "summary": "统计入度，从入度为 0 的课程开始一层层消掉依赖。",
            "complexity": "时间 O(V+E) · 空间 O(V+E)",
            "explanation": "课程依赖图里，只要能把所有节点都按入度为 0 的顺序处理掉，就说明没有环。",
            "code": "from collections import deque\n\ndef can_finish_fast(num_courses, prerequisites):\n    graph = [[] for _ in range(num_courses)]\n    indegree = [0] * num_courses\n\n    for course, pre in prerequisites:\n        graph[pre].append(course)\n        indegree[course] += 1\n\n    queue = deque([i for i in range(num_courses) if indegree[i] == 0])\n    finished = 0\n\n    while queue:\n        node = queue.popleft()\n        finished += 1\n\n        for neighbor in graph[node]:\n            indegree[neighbor] -= 1\n            if indegree[neighbor] == 0:\n                queue.append(neighbor)\n\n    return finished == num_courses"
          }
        ],
        "takeaway": [
          "业务题常常需要先抽象成图",
          "有向图依赖关系经常和拓扑排序绑定出现",
          "BFS 不只是遍历，还能做约束消解"
        ]
      }
    ],
    "implementation": [
      "先把题目抽象成节点和边，再选 BFS 还是 DFS",
      "如果题目在问最短步数、最少层数、依赖消解，优先考虑 BFS",
      "如果题目在问连通块、所有路径、递归扩展，优先考虑 DFS"
    ],
    "complexityNotes": [
      "图遍历常见复杂度是 O(V+E)，V 是节点数，E 是边数",
      "网格图常写作 O(mn)，因为每个格子最多访问一次",
      "visited 结构会带来额外空间，但通常是必须的"
    ],
    "applications": [
      "社交关系、地图路径、课程依赖、服务调用链都可以建模成图",
      "推荐系统、路由网络、工作流调度和权限传播都和图有关",
      "BFS/DFS 是理解更复杂图算法的地基"
    ],
    "summary": "图题最关键的第一步，是把题面翻译成‘谁是节点，谁和谁相连’。",
    "quiz": [],
    "visual": {
      "type": "graph"
    }
  }
];

const stage3Templates = {
  "tree": "# 树形递归模板\ndef dfs(node):\n    if not node:\n        return base\n    left = dfs(node.left)\n    right = dfs(node.right)\n    return 用 left / right 组合当前答案",
  "heap": "# 固定大小小顶堆模板\nimport heapq\nheap = []\nfor x in nums:\n    if len(heap) < k:\n        heapq.heappush(heap, x)\n    elif x > heap[0]:\n        heapq.heapreplace(heap, x)",
  "graph-bfs-dfs": "# BFS / DFS 模板\nfrom collections import deque\nqueue = deque([start])\nvisited = {start}\nwhile queue:\n    node = queue.popleft()\n    for nxt in graph[node]:\n        if nxt not in visited:\n            visited.add(nxt)\n            queue.append(nxt)\n\ndef dfs(node):\n    if node in visited:\n        return\n    visited.add(node)\n    for nxt in graph[node]:\n        dfs(nxt)"
};

export { stage3Lessons, stage3Templates };
