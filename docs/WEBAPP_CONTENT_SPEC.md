# WEBAPP_CONTENT_SPEC — LDS-P3-EN-01 Watch & Talk（Animals / pets）

**status:** drafted · static app is published  
**Project:** LDS-P3-EN-01  
**Purpose:** Content & screen spec for the static app.  
**Live app:** https://angusma0711.github.io/lds-p3-en-watch-talk/  
**Repo:** https://github.com/angusma0711/lds-p3-en-watch-talk  
**Constraints:** Static; **no accounts**; **no student PII / names**; **local session only** (e.g. `sessionStorage` / in-memory). No cloud analytics that identify learners.  
**Language:** UI default Traditional Chinese; English kept for target words and educational terms (vocab, exit ticket, scaffold 等視自然程度保留).  
**Practice note:** Practice-informed item bank only; no invented research claims.

---

## 1. Screen flow

```
Start
  → Story (Read with me — My Pets, S1–S23 in paragraphs P1–P3)
  → 討論 (guiding questions Q1–Q8, teacher-led, no typed answers)
  → Vocab cards (6, swipe/next)
  → Questions (Q1–Q6; may configure to end at Q4 if fatigued — default all 6)
  → Sentence frames (2–3)
  → Exit ticket (1 star item)
  → Done
```

**Navigation rules**
- Linear forward; Back allowed within Vocab / between Questions, but Exit ticket answers not editable after submit.
- No login gate. No “enter your name” field anywhere.
- Progress can live in `sessionStorage` for refresh-within-tab; clearing tab = fresh session.
- Teacher URL: https://angusma0711.github.io/lds-p3-en-watch-talk/

---

## 2. Start screen

| Element | Copy (ZH UI) |
|---|---|
| Title | Watch & Talk · 動物 |
| Subtitle | I Have A Pet · 一起讀故事 → 討論 → vocab → questions → frames → exit ticket |
| Helper | 不用登入 · 不會問名字 · 只保存在這個裝置的這次 session |
| Primary button | 開始 · 一起讀故事 |
| Footer note | 影片由老師播放 · 做完練習回到老師 |
| Primary action | 開始 · 一起讀故事 → Story |

### 2.1 Story（Read with me · My Pets）

Show **paragraphs** P1–P3 (continuous prose). Advance **one sentence** at a time (S1–S23). Highlight / underline the current sentence. Web Speech `speak()` reads the current sentence. Learner echoes, then taps 跟讀完了 · 下一句. No speech recognition and no typed echo.

| Control | Copy |
|---|---|
| Title | 一起讀故事 · My Pets |
| Helper | App 先讀一句 → 你跟著說一句 |
| Hear | 聽一句 |
| Echo done | 跟讀完了 · 下一句（last sentence: 跟讀完了 · 去討論） |
| Previous | 上一句 |
| Restart audio | 從頭聽 |
| Skip | 讀完了 · 去討論 |

Animal pictures (same SVG set) sit beside sentences that **name** dog, cat, mouse, bird, fish, or lion. Tap speaks that word. Target frame remains `I have a ___`.

### 2.2 討論

Teacher-led. No answer fields, no marking, no student name. Button: 繼續 · 去生字 → Vocab.

| ID | Ask (EN) | 中文 / teacher note |
|---|---|---|
| Q1 | Who is Sam? | 誰是 Sam？故事裏的孩子 — 接受 “Sam” |
| Q2 | Is the dog big or small? | 狗是大還是小？ |
| Q3 | What colour is the cat? | 貓是什麼顏色？ |
| Q4 | Can the bird sing? | 鳥會唱歌嗎？ |
| Q5 | Say: I have a ___. | 學生選一隻動物說／指 |
| Q6 | Do you have a pet? What is it? | 可用中文答；老師幫套 *I have a …* |
| Q7 | Is a real lion a good pet at home? Why? | 接受中文；可帶 *A lion is big.* |
| Q8 | Point to / say: fish or mouse — which is small? | 指一指或說：fish 還是 mouse，哪個小？ |

---

## 3. Exact item bank

### 3.1 Vocab cards（6）

Each card: large image + English (big) + 中文 + optional tap-to-hear + Next.

| ID | English | 中文 | Image need (describe; do not ship copyrighted song art) | Optional audio cue |
|---|---|---|---|---|
| V1 | dog | 狗 | Friendly cartoon/realistic dog, side or front, plain background | “dog” (+ optional woof) |
| V2 | cat | 貓 | Clear cat face/body, plain background | “cat” (+ optional meow) |
| V3 | mouse | 老鼠 | Small mouse, readable silhouette, plain background | “mouse” (+ optional squeak) |
| V4 | bird | 鳥 | Simple bird (not tiny sparrow-only; readable), plain background | “bird” (+ optional tweet) |
| V5 | fish | 魚 | Side-view fish, plain background | “fish” (+ optional blub) |
| V6 | lion | 獅子 | Lion with visible mane, plain background | “lion” (+ optional roar) |

**Card UI strings**
- 下一張
- 上一張
- 聽一聽（optional control）
- 開始練習（on last card → Questions）

### 3.2 Check questions（6 default; teacher may stop at 4）

All items: one screen, large choices, ZH hint toggle, instant feedback.

| ID | Type | Prompt (EN, short) | ZH hint | Choices | Correct |
|---|---|---|---|---|---|
| Q1 | picture choice | Tap the **dog**. | 狗 | [pic dog] [pic cat] [pic fish] | dog |
| Q2 | picture choice | Tap the **lion**. | 獅子 | [pic lion] [pic bird] [pic mouse] | lion |
| Q3 | yes-no | Is this a **cat**? *(show cat pic)* | 這是貓嗎？ | 是 Yes / 不是 No | 是 Yes |
| Q4 | yes-no | Is this a **bird**? *(show fish pic)* | 這是鳥嗎？（圖是魚） | 是 Yes / 不是 No | 不是 No |
| Q5 | match | Match: **mouse** | 老鼠 — 把英文配對正確圖 | drag/tap mouse→鼠圖；distractors cat/dog | mouse → 老鼠圖 |
| Q6 | picture choice | Tap the **fish**. | 魚 | [pic fish] [pic dog] [pic lion] | fish |

**Question UI strings**
- 第 X 題（共 6 題）
- 看提示
- 隱藏提示
- 下一題
- （見 §5 Feedback）

### 3.3 Sentence frames（2–3）

Frame pattern: `I have a ___`  
Each screen: picture + English frame with blank + ZH gloss + optional tap-to-hear model + choice chips or tap-picture to fill.

| ID | Picture | Model sentence | ZH gloss (scaffold) | Learner action |
|---|---|---|---|---|
| F1 | dog | I have a **dog**. | 我有一隻狗。（請說／選英文） | Tap chip `dog` or say aloud; show complete sentence |
| F2 | cat | I have a **cat**. | 我有一隻貓。 | Same with `cat` |
| F3 | fish | I have a **fish**. | 我有一條魚。 | Same with `fish` |

**Frame UI strings**
- 跟著說 / 選一選
- 聽示範（optional）
- 下一句
- 去做 exit ticket（after last frame）

*Note:* Do not teach *a/an* edge cases in UI. Keep `a` fixed for these nouns in this lesson.

### 3.4 Exit ticket（1 star item）

| ID | Type | Prompt | ZH hint | Choices | Correct |
|---|---|---|---|---|---|
| E1 | picture choice (star) | ★ Exit ticket: Tap the animal for **bird**. | 鳥 | [pic bird] [pic mouse] [pic lion] | bird |

**Exit UI strings**
- Exit ticket · 最後一題
- 提交
- （然後進 Done）

### 3.5 Done screen

| Element | Copy |
|---|---|
| Title | 完成了！ |
| Body | 今天練習了動物 vocab 和句子 I have a…。可以告訴老師你做完了。 |
| Session note | 結果只留在這個瀏覽器分頁的 local session · 沒有上雲 · 沒有記名字 |
| Button | 再做一次（clears session → Start） |

Do **not** show leaderboards, percentages that imply certification, or “You are Level X”. Optional soft count OK: 「本次答對 Check：N/6」（local only, no name）.

---

## 4. All ZH UI strings（master list）

```
Watch & Talk · 動物
不用登入 · 不會問名字 · 只保存在這個裝置的這次 session
開始 · 一起讀故事
一起讀故事 · My Pets
App 先讀一句 → 你跟著說一句
聽一句
跟讀完了 · 下一句
上一句
從頭聽
讀完了 · 去討論
討論
老師帶問 · 口頭回答 · 不用在 app 打字 · 沒有對錯分數
繼續 · 去生字
返回故事
影片由老師播放 · 做完練習回到老師
下一張
上一張
聽一聽
開始練習
第 X 題（共 6 題）
看提示
隱藏提示
下一題
是
不是
跟著說 / 選一選
聽示範
下一句
去做 exit ticket
Exit ticket · 最後一題
提交
完成了！
今天練習了動物 vocab 和句子 I have a…。可以告訴老師你做完了。
結果只留在這個瀏覽器分頁的 local session · 沒有上雲 · 沒有記名字
再做一次
答對了！
再試一次
提示：
```

English retained in UI where natural: Watch & Talk, vocab, exit ticket, Yes/No labels alongside 是/不是, target words dog/cat/mouse/bird/fish/lion, frame `I have a ___`.

---

## 5. Feedback copy

| Case | Copy |
|---|---|
| Correct | 答對了！ |
| Try again | 再試一次 |
| After correct | auto-advance or show 下一題 |
| After try-again | keep same item; ZH hint stays available |
| Exit correct | 答對了！ → Done |
| Exit incorrect | 再試一次（allow retry once or twice, then allow 提交繼續 to avoid trap） |

No shame copy. No “Wrong!” in red without a path forward.

---

## 6. Privacy & session rules（build must follow）

- No account, no OAuth, no class code tied to student identity.
- No input fields for name, school ID, phone, photo.
- Persist at most: current screen index + answers in **local session** (`sessionStorage` or memory).
- No backend write of learner answers. No third-party analytics that fingerprint children.
- Teacher may screenshot Done for their own planning **without** student face/name — materials must not instruct collecting PII.

---

## 7. Image needs

Describe only — **do not invent or paste copyrighted Super Simple Songs / YouTube assets into the repo.**

| Asset | Spec |
|---|---|
| 6 animal stills | dog, cat, mouse, bird, fish, lion — one subject, plain/light background, readable at tablet distance |
| Optional yes-no thumb | same animals reused |
| Star icon | simple ★ for exit ticket header |
| App icon / OG (later) | out of scope until publish OK |

**Source options for build later:** teacher-drawn; CC0 / public-domain stock; or newly commissioned simple illustrations. Attribution file if required by licence. Do not rip frames from the YouTube video.

---

## 8. Optional tap-to-hear

| Place | Behaviour |
|---|---|
| Vocab cards | Tap 聽一聽 → play English word (± sound word) |
| Sentence frames | Tap 聽示範 → play full model *I have a dog.* etc. |
| Questions | Optional read-aloud of prompt |

**Implementation note (later build):** optional browser **TTS** (Web Speech API) *or* short **pre-recorded** mp3/ogg per word/sentence. If TTS quality for child English is poor on target devices, prefer pre-recorded. Feature is **optional** — app must work muted with pictures + ZH only.

---

## 9. Tech shape（for later builder; not building now）

- Static HTML/JS or simple React static export.
- Single URL, mobile-first, large tap targets (≥44px).
- Offline-friendly nice-to-have; online OK for v1.
- Live app: https://angusma0711.github.io/lds-p3-en-watch-talk/  
- Repo: https://github.com/angusma0711/lds-p3-en-watch-talk

---

## 10. Acceptance checklist（content ready for build）

- [x] Screen flow Start → Story → 討論 → Vocab → Q1–6 → Frames → Exit → Done  
- [x] 6 vocab rows with EN/ZH  
- [x] 6 check items with answers + ZH hints  
- [x] 3 sentence frames  
- [x] 1 exit-ticket star item  
- [x] ZH UI string list + feedback copy  
- [x] No accounts / no names / local session only  
- [x] Image needs described without copyrighted assets  
- [x] Optional TTS / pre-recorded noted  

**Next:** Try the live app at https://angusma0711.github.io/lds-p3-en-watch-talk/ (repo: https://github.com/angusma0711/lds-p3-en-watch-talk).
