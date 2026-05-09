import { lessons, lessonTemplates } from '../data/lessons.js';
import { renderVisual } from './visualizers/index.js';
import { escapeHtml } from './visualizers/shared.js';
import {
  refs,
  state,
  saveLearningState,
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
  resetVisualState
} from './state.js';
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

  if (!refs.reviewPanel) {
    return;
  }
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

function bindPracticeSplitter() {
  const workspace = refs.practiceContainer.querySelector(".practice-workspace");
  const splitter = refs.practiceContainer.querySelector(".practice-splitter");
  if (!workspace || !splitter || window.innerWidth <= 840) return;

  workspace.style.gridTemplateColumns = `${Math.round(state.practiceSplitRatio * 100)}fr 14px ${Math.round((1 - state.practiceSplitRatio) * 100)}fr`;

  const onPointerMove = (event) => {
    const rect = workspace.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const ratio = Math.min(0.78, Math.max(0.36, relativeX / rect.width));
    state.practiceSplitRatio = ratio;
    workspace.style.gridTemplateColumns = `${Math.round(ratio * 100)}fr 14px ${Math.round((1 - ratio) * 100)}fr`;
  };

  const onPointerUp = () => {
    splitter.classList.remove("dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    saveLearningState();
  };

  splitter.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    splitter.classList.add("dragging");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });
}

async function copyPracticeCode(code) {
  try {
    await navigator.clipboard.writeText(code);
    window.alert("代码已复制到剪贴板。");
  } catch (error) {
    window.alert("复制失败，请手动复制编辑器中的代码。");
  }
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
              <div class="editor-tool-row">
                <button class="ghost-button small" id="copy-practice-btn" type="button">复制代码</button>
                <button class="ghost-button small" id="toggle-theme-btn" type="button">${state.editorTheme === "dark" ? "浅色主题" : "深色主题"}</button>
              </div>
              <div class="practice-actions">
                <button class="primary-button" id="run-practice-btn" type="button">提交运行</button>
                <button class="ghost-button" id="reset-practice-btn" type="button">重置代码</button>
                <button class="ghost-button" id="next-lesson-btn" type="button">下一章</button>
              </div>
            </div>
            <div class="practice-editor-wrap">
              <label class="editor-label" for="practice-editor">实现函数：</label>
              <textarea id="practice-editor" class="practice-editor ${state.editorTheme === "light" ? "light" : ""}" spellcheck="false">${escapeHtml(state.practiceCode[practiceKey])}</textarea>
            </div>
          </div>

          <div class="practice-splitter" aria-hidden="true" title="拖拽调整左右面板宽度"></div>

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
  document.getElementById("copy-practice-btn").addEventListener("click", () => {
    copyPracticeCode(state.practiceCode[practiceKey]);
  });
  document.getElementById("toggle-theme-btn").addEventListener("click", () => {
    state.editorTheme = state.editorTheme === "dark" ? "light" : "dark";
    saveLearningState();
    renderPractice();
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
  bindPracticeSplitter();
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

export { bindStaticEvents, render, renderPractice, renderCodePanel, renderSubmissionPage };
