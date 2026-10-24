/**
 * LDS-P3-EN-01 Watch & Talk — static practice app
 * No accounts, no PII, local sessionStorage only.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "lds-p3-en-01-session";

  const ANIMALS = {
    dog: { en: "dog", zh: "狗" },
    cat: { en: "cat", zh: "貓" },
    mouse: { en: "mouse", zh: "老鼠" },
    bird: { en: "bird", zh: "鳥" },
    fish: { en: "fish", zh: "魚" },
    lion: { en: "lion", zh: "獅子" },
  };

  const VOCAB = ["dog", "cat", "mouse", "bird", "fish", "lion"];

  const QUESTIONS = [
    {
      id: "Q1",
      type: "picture",
      promptHtml: 'Tap the <strong class="target">dog</strong>.',
      hint: "狗",
      choices: ["dog", "cat", "fish"],
      correct: "dog",
    },
    {
      id: "Q2",
      type: "picture",
      promptHtml: 'Tap the <strong class="target">lion</strong>.',
      hint: "獅子",
      choices: ["lion", "bird", "mouse"],
      correct: "lion",
    },
    {
      id: "Q3",
      type: "yesno",
      promptHtml: 'Is this a <strong class="target">cat</strong>?',
      hint: "這是貓嗎？",
      picture: "cat",
      correct: true,
    },
    {
      id: "Q4",
      type: "yesno",
      promptHtml: 'Is this a <strong class="target">bird</strong>?',
      hint: "這是鳥嗎？（圖是魚）",
      picture: "fish",
      correct: false,
    },
    {
      id: "Q5",
      type: "match",
      promptHtml: 'Match: <strong class="target">mouse</strong>',
      hint: "老鼠 — 把英文配對正確圖",
      word: "mouse",
      choices: ["mouse", "cat", "dog"],
      correct: "mouse",
    },
    {
      id: "Q6",
      type: "picture",
      promptHtml: 'Tap the <strong class="target">fish</strong>.',
      hint: "魚",
      choices: ["fish", "dog", "lion"],
      correct: "fish",
    },
  ];

  const FRAMES = [
    { id: "F1", animal: "dog", sentence: "I have a dog.", gloss: "我有一隻狗。（請說／選英文）" },
    { id: "F2", animal: "cat", sentence: "I have a cat.", gloss: "我有一隻貓。" },
    { id: "F3", animal: "fish", sentence: "I have a fish.", gloss: "我有一條魚。" },
  ];

  const EXIT = {
    id: "E1",
    promptHtml: '★ Exit ticket: Tap the animal for <strong class="target">bird</strong>.',
    hint: "鳥",
    choices: ["bird", "mouse", "lion"],
    correct: "bird",
  };

  /* My Pets — canonical sentences S1–S23. Paragraphs are display groups only. */
  const STORY = [
    { text: "My name is Sam." },
    { text: "I live in a small house." },
    { text: "I love animals." },
    { text: "I have a dog.", animal: "dog" },
    { text: "My dog is big and brown.", animal: "dog" },
    { text: "He likes to run and play with me." },
    { text: "I have a cat.", animal: "cat" },
    { text: "My cat is soft and white.", animal: "cat" },
    { text: "She likes to sleep on my bed." },
    { text: "I have a mouse.", animal: "mouse" },
    { text: "My mouse is small and grey.", animal: "mouse" },
    { text: "He likes to eat cheese." },
    { text: "I have a bird.", animal: "bird" },
    { text: "My bird can sing a happy song.", animal: "bird" },
    { text: "I have a fish.", animal: "fish" },
    { text: "My fish is orange.", animal: "fish" },
    { text: "He swims in a big bowl." },
    { text: "Look!" },
    { text: "I have a lion too!", animal: "lion" },
    { text: "My lion is not a real lion.", animal: "lion" },
    { text: "It is a big toy." },
    { text: "I love my pets." },
    { text: "They make me happy every day." },
  ];

  /** Paragraph ranges [start, end) → P1 S1–S6, P2 S7–S14, P3 S15–S23. */
  const STORY_PARAS = [
    [0, 6],
    [6, 14],
    [14, 23],
  ];

  const DISCUSS = [
    {
      en: "Who is Sam?",
      zh: "誰是 Sam？",
      note: "故事裏的孩子 — 接受 “Sam”",
    },
    { en: "Is the dog big or small?", zh: "狗是大還是小？" },
    { en: "What colour is the cat?", zh: "貓是什麼顏色？" },
    { en: "Can the bird sing?", zh: "鳥會唱歌嗎？" },
    { en: "Say: I have a ___.", zh: "學生選一隻動物說／指" },
    {
      en: "Do you have a pet? What is it?",
      zh: "可用中文答；老師幫套 I have a …",
    },
    {
      en: "Is a real lion a good pet at home? Why?",
      zh: "接受中文；可帶 A lion is big.",
    },
    {
      en: "Point to / say: fish or mouse — which is small?",
      zh: "指一指或說：fish 還是 mouse，哪個小？",
    },
  ];

  /* ---------- Original SVG illustrations (not from song/YouTube) ---------- */
  function animalSVG(id) {
    const map = {
      dog: `
<svg viewBox="0 0 200 200" role="img" aria-label="dog">
  <rect width="200" height="200" fill="#eef6f4"/>
  <ellipse cx="100" cy="120" rx="48" ry="40" fill="#c48a4a"/>
  <circle cx="100" cy="78" r="36" fill="#d4a06a"/>
  <ellipse cx="68" cy="52" rx="14" ry="22" fill="#b8753a"/>
  <ellipse cx="132" cy="52" rx="14" ry="22" fill="#b8753a"/>
  <ellipse cx="68" cy="54" rx="8" ry="14" fill="#f0c9a0"/>
  <ellipse cx="132" cy="54" rx="8" ry="14" fill="#f0c9a0"/>
  <circle cx="88" cy="74" r="5" fill="#2a2a2a"/>
  <circle cx="112" cy="74" r="5" fill="#2a2a2a"/>
  <ellipse cx="100" cy="88" rx="8" ry="6" fill="#3a2a22"/>
  <path d="M92 96 Q100 104 108 96" stroke="#3a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="58" cy="130" rx="10" ry="18" fill="#c48a4a"/>
  <ellipse cx="145" cy="118" rx="18" ry="8" fill="#b8753a"/>
  <ellipse cx="82" cy="158" rx="12" ry="8" fill="#a86a35"/>
  <ellipse cx="118" cy="158" rx="12" ry="8" fill="#a86a35"/>
</svg>`,
      cat: `
<svg viewBox="0 0 200 200" role="img" aria-label="cat">
  <rect width="200" height="200" fill="#f5f0fa"/>
  <ellipse cx="100" cy="130" rx="42" ry="36" fill="#d9a85c"/>
  <circle cx="100" cy="86" r="38" fill="#e6bc72"/>
  <polygon points="68,58 62,28 88,52" fill="#e6bc72"/>
  <polygon points="132,58 138,28 112,52" fill="#e6bc72"/>
  <polygon points="70,52 66,36 82,50" fill="#f3d9a8"/>
  <polygon points="130,52 134,36 118,50" fill="#f3d9a8"/>
  <ellipse cx="86" cy="86" rx="7" ry="10" fill="#4a7c3a"/>
  <ellipse cx="114" cy="86" rx="7" ry="10" fill="#4a7c3a"/>
  <circle cx="86" cy="86" r="3" fill="#1a1a1a"/>
  <circle cx="114" cy="86" r="3" fill="#1a1a1a"/>
  <path d="M100 92 L100 102" stroke="#c48a4a" stroke-width="2"/>
  <ellipse cx="100" cy="108" rx="7" ry="5" fill="#e89a9a"/>
  <path d="M78 100 Q70 98 62 94 M78 106 Q68 108 60 110 M122 100 Q130 98 138 94 M122 106 Q132 108 140 110" stroke="#c48a4a" stroke-width="2" fill="none"/>
  <path d="M142 120 Q170 100 165 70" stroke="#d9a85c" stroke-width="8" fill="none" stroke-linecap="round"/>
</svg>`,
      mouse: `
<svg viewBox="0 0 200 200" role="img" aria-label="mouse">
  <rect width="200" height="200" fill="#f2f4f7"/>
  <circle cx="62" cy="70" r="28" fill="#c5cdd6"/>
  <circle cx="138" cy="70" r="28" fill="#c5cdd6"/>
  <circle cx="62" cy="70" r="16" fill="#e8edf2"/>
  <circle cx="138" cy="70" r="16" fill="#e8edf2"/>
  <ellipse cx="100" cy="110" rx="46" ry="38" fill="#b8c2cd"/>
  <circle cx="100" cy="92" r="32" fill="#c5cdd6"/>
  <circle cx="88" cy="90" r="4" fill="#2a2a2a"/>
  <circle cx="112" cy="90" r="4" fill="#2a2a2a"/>
  <ellipse cx="100" cy="102" rx="6" ry="4" fill="#e8a0b0"/>
  <path d="M146 120 Q175 110 178 80" stroke="#b8c2cd" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="78" cy="142" rx="10" ry="7" fill="#a8b4c0"/>
  <ellipse cx="122" cy="142" rx="10" ry="7" fill="#a8b4c0"/>
</svg>`,
      bird: `
<svg viewBox="0 0 200 200" role="img" aria-label="bird">
  <rect width="200" height="200" fill="#eef7fb"/>
  <ellipse cx="100" cy="118" rx="40" ry="32" fill="#5dade2"/>
  <circle cx="118" cy="82" r="28" fill="#85c1e9"/>
  <ellipse cx="70" cy="110" rx="28" ry="14" fill="#3498db" transform="rotate(-20 70 110)"/>
  <polygon points="142,82 168,88 142,96" fill="#f5b041"/>
  <circle cx="124" cy="78" r="5" fill="#1a1a1a"/>
  <circle cx="126" cy="76" r="1.5" fill="#fff"/>
  <path d="M90 148 L82 168 M100 150 L100 170 M110 148 L118 168" stroke="#7d6608" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="55" cy="70" rx="8" ry="4" fill="#aed6f1"/>
</svg>`,
      fish: `
<svg viewBox="0 0 200 200" role="img" aria-label="fish">
  <rect width="200" height="200" fill="#e8f4fc"/>
  <ellipse cx="105" cy="100" rx="52" ry="32" fill="#48c9b0"/>
  <polygon points="50,100 22,72 22,128" fill="#1abc9c"/>
  <polygon points="120,72 135,48 148,78" fill="#1abc9c"/>
  <polygon points="120,128 135,152 148,122" fill="#1abc9c"/>
  <circle cx="138" cy="94" r="6" fill="#1a1a1a"/>
  <circle cx="140" cy="92" r="2" fill="#fff"/>
  <path d="M90 100 Q105 88 120 100 Q105 112 90 100" fill="#76d7c4"/>
  <circle cx="40" cy="60" r="4" fill="#aed6f1" opacity="0.8"/>
  <circle cx="55" cy="140" r="3" fill="#aed6f1" opacity="0.8"/>
  <circle cx="170" cy="130" r="5" fill="#aed6f1" opacity="0.7"/>
</svg>`,
      lion: `
<svg viewBox="0 0 200 200" role="img" aria-label="lion">
  <rect width="200" height="200" fill="#fff6e8"/>
  <circle cx="100" cy="100" r="62" fill="#d68910"/>
  <circle cx="100" cy="100" r="52" fill="#e67e22"/>
  <circle cx="100" cy="100" r="42" fill="#f5b041"/>
  <circle cx="100" cy="102" r="34" fill="#f7c878"/>
  <circle cx="86" cy="98" r="5" fill="#2a2a2a"/>
  <circle cx="114" cy="98" r="5" fill="#2a2a2a"/>
  <ellipse cx="100" cy="112" rx="9" ry="7" fill="#c0392b"/>
  <path d="M88 122 Q100 130 112 122" stroke="#6e2c00" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M70 90 Q78 86 84 90 M116 90 Q122 86 130 90" stroke="#6e2c00" stroke-width="2" fill="none"/>
  <ellipse cx="78" cy="148" rx="10" ry="6" fill="#e67e22"/>
  <ellipse cx="122" cy="148" rx="10" ry="6" fill="#e67e22"/>
</svg>`,
    };
    return map[id] || "";
  }

  function art(id, className) {
    return `<div class="animal-art ${className || ""}">${animalSVG(id)}</div>`;
  }

  /* ---------- State ---------- */
  function defaultState() {
    return {
      screen: "start", // start | story | discuss | vocab | question | frame | exit | done
      storyIndex: 0,
      vocabIndex: 0,
      qIndex: 0,
      frameIndex: 0,
      showHint: false,
      feedback: null, // null | 'ok' | 'retry'
      answered: false,
      checkCorrect: 0,
      checkAttempted: {}, // qId -> boolean first-correct
      exitTries: 0,
      exitSubmitted: false,
      frameFilled: false,
      selectedChip: null,
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const next = Object.assign(defaultState(), parsed);
      if (
        typeof next.storyIndex !== "number" ||
        next.storyIndex < 0 ||
        next.storyIndex >= STORY.length
      ) {
        next.storyIndex = 0;
      }
      return next;
    } catch (_) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      /* ignore quota / private mode */
    }
  }

  function resetSession() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    state = defaultState();
    render();
  }

  /* ---------- TTS (optional) ---------- */
  function stopSpeak() {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {
      /* ignore */
    }
  }

  function speak(text) {
    try {
      if (!window.speechSynthesis) return;
      stopSpeak();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (_) {
      /* muted / unsupported — app still works */
    }
  }

  /* ---------- Helpers ---------- */
  function progressPct() {
    // story 23 + discuss 1 + vocab 6 + questions 6 + frames 3 + exit 1 = 40
    const total = 40;
    let step = 0;
    if (state.screen === "story") step = state.storyIndex + 1;
    else if (state.screen === "discuss") step = 24;
    else if (state.screen === "vocab") step = 24 + state.vocabIndex + 1;
    else if (state.screen === "question") step = 30 + state.qIndex + 1;
    else if (state.screen === "frame") step = 36 + state.frameIndex + 1;
    else if (state.screen === "exit" || state.screen === "done") step = 40;
    return Math.round((step / total) * 100);
  }

  function progressLabel() {
    if (state.screen === "story") return `故事 ${state.storyIndex + 1}/23`;
    if (state.screen === "discuss") return "討論";
    if (state.screen === "vocab") return `Vocab ${state.vocabIndex + 1}/6`;
    if (state.screen === "question") return `第 ${state.qIndex + 1} 題（共 6 題）`;
    if (state.screen === "frame") return `句子 ${state.frameIndex + 1}/3`;
    if (state.screen === "exit") return "Exit ticket";
    if (state.screen === "done") return "完成";
    return "Start";
  }

  function feedbackEl() {
    if (!state.feedback) return `<div class="feedback idle" aria-hidden="true">·</div>`;
    if (state.feedback === "ok") return `<div class="feedback ok" role="status">答對了！</div>`;
    return `<div class="feedback retry" role="status">再試一次</div>`;
  }

  function shuffleCopy(arr) {
    // Keep order from spec for predictability in classroom; no shuffle needed
    return arr.slice();
  }

  /* ---------- Screens ---------- */
  function renderStart() {
    return `
      <section class="screen">
        <div class="card hero">
          <div class="hero-emoji" aria-hidden="true">🐾</div>
          <h1>Watch & Talk · 動物</h1>
          <p class="subtitle">I Have A Pet · 一起讀故事 → 討論 → vocab → questions → frames → exit ticket</p>
          <div class="helper">不用登入 · 不會問名字 · 只保存在這個裝置的這次 session</div>
        </div>
        <button type="button" class="btn btn-primary" data-action="start">開始</button>
        <p class="footer-note">影片由老師播放 · 做完練習回到老師</p>
      </section>`;
  }

  function renderVocab() {
    const id = VOCAB[state.vocabIndex];
    const a = ANIMALS[id];
    const isLast = state.vocabIndex === VOCAB.length - 1;
    return `
      <section class="screen">
        <div class="progress">
          <span>${progressLabel()}</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <div class="card">
          ${art(id)}
          <div class="vocab-en">${a.en}</div>
          <div class="vocab-zh">${a.zh}</div>
          <div class="vocab-index">${state.vocabIndex + 1} / 6</div>
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" data-action="tts-word" data-word="${a.en}">聽一聽</button>
          <button type="button" class="btn btn-secondary" data-action="vocab-prev" ${state.vocabIndex === 0 ? "disabled" : ""}>上一張</button>
          ${
            isLast
              ? `<button type="button" class="btn btn-primary" data-action="vocab-to-questions">開始練習</button>`
              : `<button type="button" class="btn btn-primary" data-action="vocab-next">下一張</button>`
          }
        </div>
      </section>`;
  }

  function renderQuestion() {
    const q = QUESTIONS[state.qIndex];
    const hintBtn = state.showHint
      ? `<button type="button" class="btn btn-ghost" data-action="toggle-hint">隱藏提示</button>`
      : `<button type="button" class="btn btn-ghost" data-action="toggle-hint">看提示</button>`;

    let body = "";
    if (q.type === "picture") {
      const choices = shuffleCopy(q.choices)
        .map(
          (c) => `
        <button type="button" class="choice" data-action="answer-pic" data-value="${c}" ${state.answered && state.feedback === "ok" ? "disabled" : ""}>
          ${art(c)}
          <span class="sr-only">${ANIMALS[c].en}</span>
        </button>`
        )
        .join("");
      body = `<div class="choice-grid">${choices}</div>`;
    } else if (q.type === "yesno") {
      body = `
        ${art(q.picture)}
        <div class="yesno-row" style="margin-top:12px">
          <button type="button" class="yesno-btn" data-action="answer-yesno" data-value="true" ${state.answered && state.feedback === "ok" ? "disabled" : ""}>
            是<span class="sub">Yes</span>
          </button>
          <button type="button" class="yesno-btn" data-action="answer-yesno" data-value="false" ${state.answered && state.feedback === "ok" ? "disabled" : ""}>
            不是<span class="sub">No</span>
          </button>
        </div>`;
    } else if (q.type === "match") {
      const choices = shuffleCopy(q.choices)
        .map(
          (c) => `
        <button type="button" class="choice" data-action="answer-pic" data-value="${c}" ${state.answered && state.feedback === "ok" ? "disabled" : ""}>
          ${art(c)}
          <span class="sr-only">${ANIMALS[c].zh}</span>
        </button>`
        )
        .join("");
      body = `
        <div class="match-area">
          <div class="match-word">${q.word}</div>
          <div class="choice-grid">${choices}</div>
        </div>`;
    }

    const nextDisabled = !(state.answered && state.feedback === "ok");
    const isLast = state.qIndex === QUESTIONS.length - 1;

    return `
      <section class="screen">
        <div class="progress">
          <span>第 ${state.qIndex + 1} 題（共 6 題）</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <div class="card">
          <p class="prompt">${q.promptHtml}</p>
          ${state.showHint ? `<div class="zh-hint">提示：${q.hint}</div>` : ""}
          ${body}
        </div>
        ${feedbackEl()}
        <div class="btn-row">
          ${hintBtn}
          <button type="button" class="btn btn-ghost" data-action="tts-prompt" data-text="${escapeAttr(stripHtml(q.promptHtml))}">聽一聽</button>
          <button type="button" class="btn btn-primary" data-action="q-next" ${nextDisabled ? "disabled" : ""}>
            ${isLast ? "去做句子" : "下一題"}
          </button>
        </div>
      </section>`;
  }

  function renderFrame() {
    const f = FRAMES[state.frameIndex];
    // 3 chips: correct + 2 distractors (lighter load for weak P3)
    const chipSet = [f.animal, ...VOCAB.filter((x) => x !== f.animal)].slice(0, 3);

    const filled = state.frameFilled ? f.animal : "___";
    const isLast = state.frameIndex === FRAMES.length - 1;

    return `
      <section class="screen">
        <div class="progress">
          <span>跟著說 / 選一選 · ${state.frameIndex + 1}/3</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <div class="card">
          ${art(f.animal)}
          <div class="frame-blank">I have a <span class="blank">${filled}</span>.</div>
          <div class="zh-hint">${f.gloss}</div>
          <div class="chips">
            ${chipSet
              .map(
                (c) =>
                  `<button type="button" class="chip ${state.selectedChip === c ? "picked" : ""}" data-action="pick-chip" data-value="${c}">${c}</button>`
              )
              .join("")}
          </div>
        </div>
        ${state.frameFilled ? `<div class="feedback ok" role="status">答對了！</div>` : feedbackEl()}
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" data-action="tts-sentence" data-text="${escapeAttr(f.sentence)}">聽示範</button>
          <button type="button" class="btn btn-primary" data-action="frame-next" ${state.frameFilled ? "" : "disabled"}>
            ${isLast ? "去做 exit ticket" : "下一句"}
          </button>
        </div>
      </section>`;
  }

  function renderExit() {
    const choices = EXIT.choices
      .map(
        (c) => `
      <button type="button" class="choice" data-action="exit-pic" data-value="${c}" ${state.exitSubmitted ? "disabled" : ""}>
        ${art(c)}
        <span class="sr-only">${ANIMALS[c].en}</span>
      </button>`
      )
      .join("");

    const canContinue =
      (state.answered && state.feedback === "ok") || state.exitTries >= 2;

    return `
      <section class="screen">
        <div class="progress">
          <span>Exit ticket · 最後一題</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <span class="star-badge">★ Exit ticket</span>
        <div class="card">
          <p class="prompt">${EXIT.promptHtml}</p>
          ${state.showHint ? `<div class="zh-hint">提示：${EXIT.hint}</div>` : ""}
          <div class="choice-grid">${choices}</div>
        </div>
        ${feedbackEl()}
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" data-action="toggle-hint">${state.showHint ? "隱藏提示" : "看提示"}</button>
          <button type="button" class="btn btn-primary" data-action="exit-submit" ${canContinue ? "" : "disabled"}>
            ${state.feedback === "ok" ? "提交" : state.exitTries >= 2 ? "提交繼續" : "提交"}
          </button>
        </div>
      </section>`;
  }

  function renderDone() {
    return `
      <section class="screen">
        <div class="card hero">
          <div class="hero-emoji" aria-hidden="true">⭐</div>
          <h1>完成了！</h1>
          <p class="subtitle">今天練習了動物 vocab 和句子 I have a…。可以告訴老師你做完了。</p>
          <div class="done-score">本次答對 Check：${state.checkCorrect}/6</div>
          <div class="helper" style="margin-top:14px">結果只留在這個瀏覽器分頁的 local session · 沒有上雲 · 沒有記名字</div>
        </div>
        <button type="button" class="btn btn-primary" data-action="restart">再做一次</button>
        <p class="footer-note">關掉分頁即可結束 session</p>
      </section>`;
  }

  function renderStorySentence(index) {
    const sentence = STORY[index];
    const current = index === state.storyIndex;
    const animalBtn = sentence.animal
      ? `<button type="button" class="story-animal" data-action="tts-word" data-word="${sentence.animal}" aria-label="${sentence.animal}">${animalSVG(sentence.animal)}</button>`
      : "";
    return `<span class="story-sent${current ? " is-current" : ""}" id="story-sent-${index}"${current ? ' aria-current="true"' : ""}>${escapeHtml(sentence.text)}</span>${animalBtn}`;
  }

  function renderStory() {
    const paras = STORY_PARAS.map(([start, end]) => {
      const parts = [];
      for (let i = start; i < end; i += 1) {
        if (i > start) parts.push(" ");
        parts.push(renderStorySentence(i));
      }
      return `<p>${parts.join("")}</p>`;
    }).join("");
    const onLast = state.storyIndex === STORY.length - 1;

    return `
      <section class="screen">
        <div class="progress">
          <span>${progressLabel()}</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <div class="card story-card">
          <h1 class="story-title">一起讀故事 · My Pets</h1>
          <div class="helper">App 先讀一句 → 你跟著說一句</div>
          <div class="story-prose" lang="en">${paras}</div>
        </div>
        <div class="story-controls">
          <div class="btn-row">
            <button type="button" class="btn btn-ghost" data-action="story-hear">聽一句</button>
            <button type="button" class="btn btn-primary" data-action="story-next">${onLast ? "跟讀完了 · 去討論" : "跟讀完了 · 下一句"}</button>
          </div>
          <div class="btn-row">
            <button type="button" class="btn btn-secondary" data-action="story-prev" ${state.storyIndex === 0 ? "disabled" : ""}>上一句</button>
            <button type="button" class="btn btn-secondary" data-action="story-restart">從頭聽</button>
          </div>
          <button type="button" class="btn btn-ghost" data-action="story-to-discuss">讀完了 · 去討論</button>
        </div>
      </section>`;
  }

  function renderDiscuss() {
    const items = DISCUSS.map((q, i) => {
      const note = q.note ? `<p class="discuss-note">老師提示：${escapeHtml(q.note)}</p>` : "";
      return `
        <li class="discuss-item">
          <p class="discuss-kicker">Q${i + 1}</p>
          <p class="discuss-en">${escapeHtml(q.en)}</p>
          <p class="discuss-zh">${escapeHtml(q.zh)}</p>
          ${note}
        </li>`;
    }).join("");

    const pictures = VOCAB.map(
      (id) => `
        <button type="button" class="discuss-animal" data-action="tts-word" data-word="${ANIMALS[id].en}" aria-label="${ANIMALS[id].en}">
          ${art(id, "discuss-art")}
          <span>${ANIMALS[id].en}</span>
        </button>`
    ).join("");

    return `
      <section class="screen">
        <div class="progress">
          <span>${progressLabel()}</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
        </div>
        <div class="card">
          <h1 class="story-title">討論</h1>
          <div class="helper">老師帶問 · 口頭回答 · 不用在 app 打字 · 沒有對錯分數</div>
          <p class="discuss-point-label">指圖說 · 點一下可聽英文</p>
          <div class="discuss-animals">${pictures}</div>
          <ol class="discuss-list">${items}</ol>
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-secondary" data-action="discuss-back-story">返回故事</button>
          <button type="button" class="btn btn-primary" data-action="discuss-to-vocab">繼續 · 去生字</button>
        </div>
      </section>`;
  }

  function stripHtml(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent || "";
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Render ---------- */
  function render() {
    const root = document.getElementById("app");
    if (!root) return;
    let html = "";
    switch (state.screen) {
      case "start":
        html = renderStart();
        break;
      case "story":
        html = renderStory();
        break;
      case "discuss":
        html = renderDiscuss();
        break;
      case "vocab":
        html = renderVocab();
        break;
      case "question":
        html = renderQuestion();
        break;
      case "frame":
        html = renderFrame();
        break;
      case "exit":
        html = renderExit();
        break;
      case "done":
        html = renderDone();
        break;
      default:
        html = renderStart();
    }
    root.innerHTML = html;
    saveState();
    if (state.screen === "story") {
      const current = document.getElementById("story-sent-" + state.storyIndex);
      if (current && current.scrollIntoView) {
        current.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  /* ---------- Actions ---------- */
  function markCheckCorrect(qId) {
    if (!state.checkAttempted[qId]) {
      state.checkAttempted[qId] = true;
      state.checkCorrect += 1;
    }
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      state.feedback = "ok";
      state.answered = true;
      if (state.screen === "question") {
        markCheckCorrect(QUESTIONS[state.qIndex].id);
      }
    } else {
      state.feedback = "retry";
      state.answered = false;
    }
    render();
  }

  function onAction(action, el) {
    switch (action) {
      case "start":
        state.screen = "story";
        state.storyIndex = 0;
        state.feedback = null;
        state.answered = false;
        render();
        speak(STORY[0].text);
        break;
      case "story-hear":
        speak(STORY[state.storyIndex].text);
        break;
      case "story-next":
        if (state.storyIndex < STORY.length - 1) {
          state.storyIndex += 1;
          render();
          speak(STORY[state.storyIndex].text);
        } else {
          stopSpeak();
          state.screen = "discuss";
          render();
        }
        break;
      case "story-prev":
        if (state.storyIndex > 0) {
          state.storyIndex -= 1;
          render();
          speak(STORY[state.storyIndex].text);
        }
        break;
      case "story-restart":
        state.storyIndex = 0;
        render();
        speak(STORY[0].text);
        break;
      case "story-to-discuss":
        stopSpeak();
        state.screen = "discuss";
        render();
        break;
      case "discuss-back-story":
        state.screen = "story";
        render();
        speak(STORY[state.storyIndex].text);
        break;
      case "discuss-to-vocab":
        state.screen = "vocab";
        state.vocabIndex = 0;
        state.showHint = false;
        state.feedback = null;
        state.answered = false;
        render();
        break;
      case "vocab-next":
        if (state.vocabIndex < VOCAB.length - 1) {
          state.vocabIndex += 1;
          render();
        }
        break;
      case "vocab-prev":
        if (state.vocabIndex > 0) {
          state.vocabIndex -= 1;
          render();
        }
        break;
      case "vocab-to-questions":
        state.screen = "question";
        state.qIndex = 0;
        state.showHint = false;
        state.feedback = null;
        state.answered = false;
        render();
        break;
      case "toggle-hint":
        state.showHint = !state.showHint;
        render();
        break;
      case "tts-word":
        speak(el.getAttribute("data-word") || "");
        break;
      case "tts-prompt":
      case "tts-sentence":
        speak(el.getAttribute("data-text") || "");
        break;
      case "answer-pic": {
        if (state.answered && state.feedback === "ok") return;
        const val = el.getAttribute("data-value");
        const q = QUESTIONS[state.qIndex];
        handleAnswer(val === q.correct);
        break;
      }
      case "answer-yesno": {
        if (state.answered && state.feedback === "ok") return;
        const val = el.getAttribute("data-value") === "true";
        const q = QUESTIONS[state.qIndex];
        handleAnswer(val === q.correct);
        break;
      }
      case "q-next": {
        if (!(state.answered && state.feedback === "ok")) return;
        if (state.qIndex < QUESTIONS.length - 1) {
          state.qIndex += 1;
          state.showHint = false;
          state.feedback = null;
          state.answered = false;
          render();
        } else {
          state.screen = "frame";
          state.frameIndex = 0;
          state.frameFilled = false;
          state.selectedChip = null;
          state.feedback = null;
          state.answered = false;
          state.showHint = false;
          render();
        }
        break;
      }
      case "pick-chip": {
        const val = el.getAttribute("data-value");
        const f = FRAMES[state.frameIndex];
        state.selectedChip = val;
        if (val === f.animal) {
          state.frameFilled = true;
          state.feedback = "ok";
        } else {
          state.frameFilled = false;
          state.feedback = "retry";
        }
        render();
        break;
      }
      case "frame-next": {
        if (!state.frameFilled) return;
        if (state.frameIndex < FRAMES.length - 1) {
          state.frameIndex += 1;
          state.frameFilled = false;
          state.selectedChip = null;
          state.feedback = null;
          render();
        } else {
          state.screen = "exit";
          state.showHint = false;
          state.feedback = null;
          state.answered = false;
          state.exitTries = 0;
          state.exitSubmitted = false;
          render();
        }
        break;
      }
      case "exit-pic": {
        if (state.exitSubmitted) return;
        const val = el.getAttribute("data-value");
        if (val === EXIT.correct) {
          state.feedback = "ok";
          state.answered = true;
        } else {
          state.feedback = "retry";
          state.answered = false;
          state.exitTries += 1;
        }
        render();
        break;
      }
      case "exit-submit": {
        const can =
          (state.answered && state.feedback === "ok") || state.exitTries >= 2;
        if (!can) return;
        state.exitSubmitted = true;
        state.screen = "done";
        render();
        break;
      }
      case "restart":
        resetSession();
        break;
      default:
        break;
    }
  }

  document.getElementById("app").addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    onAction(el.getAttribute("data-action"), el);
  });

  render();
})();
