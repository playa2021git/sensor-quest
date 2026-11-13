import { questions } from './questions.js';
import { evaluate, summarize, shuffle } from './engine.js';
import { devices } from './encyclopedia.js';
import { sceneSheets, catSheet, catPoses, sceneReplacements, catReplacements } from './assets.js';

const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const QUESTION_SECONDS = 30;
const letters = ['A', 'B', 'C', 'D'];
const labels = { optimal: '最適', possible: '実現可能', unsuitable: '不適切', timeout: '時間切れ' };
let settings = { timed: true, effects: true, volume: 0 };
try {
  const saved = JSON.parse(localStorage.getItem('sensor-quest-settings') || '{}');
  settings = { timed: saved.timed !== false, effects: saved.effects !== false, volume: Math.max(0, Math.min(100, Number(saved.volume) || 0)) };
} catch { /* Browser storage is optional. */ }
let state = 'title', index = 0, answers = [], order = [], timer, deadline = 0, activeTimed = false;
let review = false, reviewIndex = 0, scoreFrame;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const effectsEnabled = () => settings.effects && !motionPreference.matches;
const brand = '<div class="brand">SENSOR<br>QUEST<small>センサークエスト</small></div>';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function cat(pose = 'normal') {
  const config = catPoses[pose] || catPoses.normal;
  const replacement = catReplacements[pose];
  return `<span class="cat ${pose}" role="img" aria-label="黄色い瞳と安全ヘルメットの灰白の案内猫"><img class="${replacement ? 'cat-individual' : 'cat-sheet'}" src="${replacement || catSheet}" data-fallback="cat" data-tile="${config.tile}" style="--column:${config.tile % 3};--row:${Math.floor(config.tile / 3)}" alt=""></span>`;
}
function image(q) {
  const replacement = sceneReplacements[q.id];
  return `<div class="image-frame" role="img" aria-label="${escape(q.imageAlt)}"><img class="scene ${replacement ? 'individual' : 'scene-sheet'}" src="${replacement || q.image}" data-fallback="scene" data-sheet="${sceneSheets[q.sceneSheet]}" data-tile="${q.sceneTile}" style="--column:${q.sceneTile % 2};--row:${Math.floor(q.sceneTile / 2)}" alt=""><span class="image-caption">${q.imageAlt}</span></div>`;
}
function setTheme(stage = 1) {
  document.body.classList.toggle('stage-two', stage === 2);
  document.body.classList.toggle('reduce-effects', !effectsEnabled());
}
function shell(content, cls = '', active = index) {
  cancelAnimationFrame(scoreFrame);
  app.innerHTML = `<div class="game ${cls}"><header>${brand}<div class="progress" aria-label="全${questions.length}問中、第${active + 1}問">${questions.map((_, i) => `<i class="${i < active ? 'done' : i === active ? 'current' : ''}"></i>`).join('')}</div><div class="top-tools"><button data-action="fullscreen">⛶ 全画面</button><button data-action="settings">⚙ 設定</button></div></header>${content}</div>`;
}
function title() {
  clearInterval(timer); cancelAnimationFrame(scoreFrame); state = 'title'; setTheme(1);
  app.innerHTML = `<div class="game title"><div class="title-top"><span>TECHNOLOGY & INGENUITY</span><button data-action="fullscreen">⛶ 全画面表示</button></div><div class="title-art"><div class="board">◉　▥　♩<hr>計 測 と 制 御<br><span>小さな発見から、未来をつくる。</span></div>${cat()}</div><main class="title-copy"><div class="emblem">▂ ▅ █</div><p class="eyebrow">技術の工房へ、ようこそ。</p><h1>SENSOR QUEST</h1><p class="jtitle">センサークエスト</p><p class="subtitle">― 最適なセンサを選べ！ ―</p><p class="intro">できる方法は、ひとつじゃない。<br>条件を読み解き、最適な入力を選ぼう。</p><button class="gold start" data-action="start"><span>▶</span> ゲームを始める</button><div class="title-links"><button data-action="book">▤ 入出力デバイス図鑑</button><button data-action="help">？ 遊び方</button><button data-action="settings">⚙ 設定</button></div><p class="meta">全10問 / 約15分 / 中学校 技術科</p></main><footer>身近な「なぜ？」を、技術で解き明かそう。<span>STAGE 01 身近な技術　→　STAGE 02 再発明</span></footer></div>`;
}
function start() { answers = []; index = 0; review = false; question(); }
function stageTransition() {
  clearInterval(timer); state = 'transition'; setTheme(2);
  shell(`<main class="panel stage-intro"><section><p class="eyebrow">STAGE 02 / REINVENTION</p><h1>ここからは、きみが発明家。</h1><p class="stage-lead">身近な困りごとに、<br>入力の組み合わせで挑もう。</p><p>ひとつのセンサでは分からないことも、<br>役割を分けると、解決の糸口が見えてくる。</p><div class="stage-principles"><span>何を取得する？</span><b>→</b><span>どう判断する？</span><b>→</b><span>何を動かす？</span></div><p class="ai-note">AIはChromebook等で実行し、結果をmicro:bitへ渡します。<br>micro:bit単体でTeachable Machineは実行できません。</p><button class="gold" data-action="stage-start">再発明のクエストへ　›</button><small>この画面では制限時間は進みません。</small></section><div class="stage-mascot">${cat('think')}<span>増やす前に、役割を考えよう。</span></div></main>`, 'transitioning');
}
function question() {
  clearInterval(timer); state = 'question'; order = shuffle(questions[index].choices);
  const q = questions[index]; activeTimed = settings.timed; setTheme(q.stage);
  shell(`<main class="panel question-panel" ${activeTimed ? 'data-time-phase="blue"' : ''}>${activeTimed ? '<div class="timer-illumination" aria-hidden="true"></div>' : ''}<div class="panel-heading"><span class="tag">STAGE ${q.stage} / ${q.stage === 1 ? '身近な技術を、授業のデバイスで' : '再発明・問題解決'}</span><span class="counter">第 ${index + 1} 問 <em>/ 全${questions.length}問</em></span></div><div class="question-grid"><section class="problem"><h1>${q.title}</h1><div class="illustration">${image(q)}<span>MISSION ${String(index + 1).padStart(2, '0')}</span></div><h2>${q.scenario}</h2><div class="conditions"><b>▧ 今回の条件・優先すること</b><p>${q.requirements}</p></div></section><section class="answer-area"><div class="answer-heading"><h2>最適な入力は、どれ？</h2><span class="clock" role="timer" aria-label="回答の残り時間">◷ <b id="seconds">${activeTimed ? QUESTION_SECONDS : '∞'}</b><small>${settings.timed ? '秒' : '制限なし'}</small></span></div><div class="choices">${order.map((c, i) => `<button class="choice" data-choice="${c.id}"><kbd>${letters[i]}</kbd><span>${c.label}</span><span class="arrow">›</span></button>`).join('')}</div><p class="keyboard">A〜Dキー / Tab＋Enter でも回答できます</p><div class="guide">${cat('think')}<p>何を知るために、何を取得する？<br><strong>条件と優先事項</strong>を手がかりにしよう。</p></div></section></div></main><div class="bottom-bar"><button data-action="quit">⌂ タイトルへ</button><span>入力で情報を取得 → プログラムで判断 → 出力で動作</span><button data-action="book">▤ 図鑑</button></div>`);
  if (activeTimed) { deadline = performance.now() + QUESTION_SECONDS * 1000; timer = setInterval(tick, 200); }
}
function tick() {
  if (state !== 'question') return;
  const seconds = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
  const el = document.querySelector('#seconds');
  if (el) {
    el.textContent = seconds;
    document.querySelector('.question-panel').dataset.timePhase = seconds > 15 ? 'blue' : seconds > 5 ? 'yellow' : 'red';
  }
  if (seconds === 0) answer(null);
}
function answer(id) {
  if (state !== 'question') return;
  if (activeTimed && performance.now() >= deadline) id = null;
  state = 'explanation'; clearInterval(timer);
  answers.push(evaluate(questions[index], id));
  playAnswerSound(answers.at(-1).score);
  explanation(answers.at(-1));
}
function playAnswerSound(score) {
  if (!settings.volume) return;
  try {
    const ac = new AudioContext(), oscillator = ac.createOscillator(), gain = ac.createGain();
    oscillator.connect(gain); gain.connect(ac.destination); oscillator.frequency.value = score === 2 ? 660 : 330;
    gain.gain.value = settings.volume / 500; oscillator.start(); gain.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .2);
    oscillator.stop(ac.currentTime + .2); oscillator.onended = () => ac.close();
  } catch { /* Audio is optional. */ }
}
function explanation(a) {
  state = 'explanation';
  const q = questions.find(q => q.id === a.questionId), chosen = q.choices.find(c => c.id === a.choiceId);
  const optimalChoices = q.choices.filter(c => c.evaluation === 'optimal');
  const best = optimalChoices[0], good = a.evaluation === 'optimal';
  setTheme(q.stage);
  shell(`<main class="panel explanation-panel ${good ? 'feedback-optimal' : a.evaluation === 'possible' ? 'feedback-possible' : ''}"><div class="panel-heading"><span class="tag">${review ? '振り返り' : '解説'} / ${q.title}</span><span class="counter">第 ${questions.indexOf(q) + 1} 問 / 全${questions.length}問</span></div><div class="explain-top"><div class="illustration">${image(q)}</div><section class="selection ${a.evaluation}"><div class="selection-label">あなたの選択 <strong>${labels[a.evaluation]}</strong><span>+${a.score}点</span></div><h1>${chosen?.label ?? '回答時間が終了しました'}</h1><p class="selected-info"><b>取得：</b>${chosen?.information ?? '今回は未回答です。最適な方法と他の選択肢を確認しよう。'}</p>${a.evaluation === 'possible' ? '<p class="possible-note">その方法でも実現できます。ただし、今回は最適とは言えません。</p>' : ''}<p class="selected-reason">${chosen?.explanation ?? q.explanation}</p></section></div><div class="explain-bottom"><section class="best"><span class="ribbon">♛ 今回の最適な入力</span><h2>${optimalChoices.map(c => c.label).join(" ／ ")}</h2><p>${q.explanation}</p><div class="learning">✓ ${q.learningPoint}</div><div class="output-note">出力の例：${q.outputs.map(id => devices.find(d => d.id === id).name).join('・')}<small>入力を取得する装置とは別の役割です。</small></div></section><section class="others"><h2>4つの方法を比較する <small>選んで詳しく確認</small></h2><div class="option-tabs" role="tablist" aria-label="全選択肢の比較">${q.choices.map((c, i) => `<button role="tab" id="option-${i}" aria-controls="option-detail" aria-selected="${c === (chosen || best)}" tabindex="${c === (chosen || best) ? 0 : -1}" data-option="${c.id}">${i + 1}<span>${c.label}</span></button>`).join('')}</div><div id="option-detail" class="option-detail" role="tabpanel" tabindex="0"></div></section></div></main><div class="explain-footer">${cat(good ? 'success' : 'explain')}<span class="cat-caption">${good ? '条件に合う入力を発見！' : '比べて考えることが、発明の力になる。'}</span><button class="gold next" data-action="${review ? 'review-next' : 'next'}">${review ? (reviewIndex === answers.length - 1 ? '結果に戻る' : '次の解説へ') : index === questions.length - 1 ? 'クエスト結果へ' : index === 4 ? '次のステージへ' : '次の問題へ'}　›</button>${review ? '<button data-action="result">結果に戻る</button>' : ''}</div>`, 'explaining', questions.indexOf(q));
  optionDetail(q, chosen?.id || best.id);
}
function optionDetail(q, id) {
  const c = q.choices.find(c => c.id === id);
  const tabs = [...document.querySelectorAll('[data-option]')];
  tabs.forEach(tab => { tab.setAttribute('aria-selected', String(tab.dataset.option === id)); tab.tabIndex = tab.dataset.option === id ? 0 : -1; });
  const detail = document.querySelector('#option-detail');
  detail.setAttribute('aria-labelledby', tabs.find(t => t.dataset.option === id).id);
  detail.innerHTML = `<div class="detail-heading"><h3>${c.label}</h3><span class="eval ${c.evaluation}">${labels[c.evaluation]}</span></div><p><b>取得できる：</b>${c.information}</p><p><b>長所：</b>${c.strength}</p><p><b>限界・注意：</b>${c.limitations}</p><p class="detail-reason"><b>今回の判定：</b>${c.explanation}</p>`;
  detail.scrollTop = 0;
}
function result() {
  state = 'result'; review = false; clearInterval(timer); setTheme(2);
  const s = summarize(answers), missed = answers.filter(a => a.evaluation !== 'optimal');
  const celebrations = effectsEnabled() ? `${s.score >= 18 ? `<div class="confetti" aria-hidden="true">${Array.from({ length: 22 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>` : ''}<div class="rainbow-sweep" aria-hidden="true"></div>` : '';
  shell(`<main class="panel results ${s.score === 20 ? 'perfect' : ''}">${celebrations}<div class="result-ribbon">クエスト結果</div><div class="result-grid"><section class="score-area"><p>最終スコア</p><div class="score" aria-label="${s.score}点、20点満点"><b id="score-value">${s.score}</b><span> / 20点</span></div><p class="optimal-count">最適な選択 <b>${s.optimal}</b> / ${questions.length}問</p><div class="rank"><small>センサ選択の評価</small><strong>${s.rank}</strong><span>${s.rank === 'S' ? '条件を見抜く力！' : s.rank === 'A' ? 'よい比較ができたね！' : s.rank === 'B' ? '選択の理由が見えてきた！' : '気づきが、次の発明の種！'}</span></div><div class="result-cat">${cat('result')}</div><p class="result-message">${s.possible ? `実現可能な方法も${s.possible}問見つけられたね。` : '比較して気づいたことが、学びの成果。'}<br>正解の数だけでなく、選ぶ理由を大切に。</p></section><section class="summary"><h2>▥ 選択のまとめ</h2>${[['optimal', '最適'], ['possible', '実現可能'], ['unsuitable', '不適切'], ['timeout', '時間切れ']].map(([k, v]) => `<div class="stat"><span>${v}</span><b>${s[k]}<small> 問</small></b><div class="track"><i class="${k}" style="width:${s[k] * 10}%"></i></div></div>`).join('')}<div class="insight"><h3>☀ 今回の気づき</h3><p>人を検知することと、意思を受け取ることは別。<br>AIも、ボタンも、目的に合わせて選ぶ入力。<br>次の再発明では「なぜその入力か」を説明しよう。</p></div><p class="review-needed">${missed.length ? `振り返りのヒント：第 ${missed.map(a => questions.findIndex(q => q.id === a.questionId) + 1).join('・')} 問` : '全問で最適な選択！別の方法の長所・限界も振り返ろう。'}</p></section></div></main><div class="result-actions"><button data-action="review-missed">↻ 最適でなかった問題を復習</button><button data-action="review-all">▤ 全問を振り返る</button><button class="gold" data-action="start">もう一度挑戦</button><button data-action="home">⌂ タイトル</button></div><p class="assessment">得点は理解の参考情報であり、学習評価そのものではありません。回答データは外部へ送信しません。</p>`, 'result-screen');
  if (effectsEnabled()) animateScore(s.score);
}
function animateScore(score) {
  const el = document.querySelector('#score-value'), begin = performance.now();
  function frame(now) {
    if (state !== 'result' || !el.isConnected) return;
    const progress = effectsEnabled() ? Math.min(1, (now - begin) / 800) : 1;
    el.textContent = Math.round(score * (1 - (1 - progress) ** 3));
    if (progress < 1) scoreFrame = requestAnimationFrame(frame);
  }
  scoreFrame = requestAnimationFrame(frame);
}
function reviewList(missed) {
  const list = answers.map((a, i) => ({ a, i })).filter(({ a }) => !missed || a.evaluation !== 'optimal');
  showModal(`<p class="eyebrow">QUEST RECORD</p><h2>${missed ? '最適でなかった問題' : '全問の振り返り'}</h2>${list.length ? list.map(({ a, i }) => `<button class="review-row" data-review="${i}"><b>${i + 1}. ${questions[i].title}</b><span>${labels[a.evaluation]}　›</span></button>`).join('') : '<p>全問で最適な選択ができました！「全問を振り返る」で比較を続けよう。</p>'}`);
}
function showModal(html) { document.querySelector('#modal-content').innerHTML = html; modal.showModal(); }
function help() {
  showModal(`<p class="eyebrow">HOW TO PLAY</p><h2>条件を読み、最適な入力を選ぼう。</h2><ol class="help-list"><li>「今回の条件・優先すること」を確認。</li><li>4つから選ぶ。クリック、A〜Dキー、Tab＋Enterが使えます。</li><li>解説の比較タブで4つすべての長所・限界を確認。</li></ol><div class="help-scores"><b>最適：2点</b><b>実現可能：1点</b><b>不適切・時間切れ：0点</b></div><p>全10問・20点満点。最適な入力が複数ある問題では、どちらも2点です。1問30秒。速さによる加点はなく、設定で時間制限をなくせます。第6問の前にステージが切り替わります。</p><p>ボタンも入力装置。AIはカメラやマイク等の情報をモデルで分類する仕組みです。micro:bit単体ではTeachable Machineを実行できず、Chromebook等との連携が必要です。</p>`);
}
function book() {
  const groups = [['input', '入力装置・センサ / 11種類'], ['ai', 'AI入力 / 3種類'], ['output', '出力装置 / 5種類']];
  showModal(`<p class="eyebrow">DEVICE FIELD GUIDE</p><h2>入出力デバイス図鑑</h2><p>ボタンとタッチロゴも入力装置。AIは取得した情報を学習済みモデルで分類します。<br>Teachable MachineはChromebook等で実行し、結果をmicro:bitと連携します。</p>${groups.map(([type, title]) => `<h3 class="device-group">${title}</h3><div class="book-grid">${devices.filter(d => d.category === type).map(d => `<article data-device="${d.id}"><h3>${d.name}</h3><p><b>${type === 'output' ? '出力する働き' : '取得する情報'}：</b>${d.information}</p><p><b>分からない：</b>${d.unknown}</p><p><b>使用例：</b>${d.example}</p><p><b>限界・注意：</b>${d.limitation}</p></article>`).join('')}</div>`).join('')}`);
}
function settingsModal() {
  showModal(`<p class="eyebrow">WORKSHOP SETTINGS</p><h2>音量・演出設定</h2><label class="setting"><span>1問30秒の時間制限<small>変更は次の問題から適用</small></span><input id="timed" type="checkbox" ${settings.timed ? 'checked' : ''}></label><label class="setting"><span>アニメーション・演出<small>時間のイルミネーション、解説の枠、猫、結果の演出</small></span><input id="effects" type="checkbox" ${settings.effects ? 'checked' : ''}></label><label class="setting"><span>回答音の音量<small>初期設定はミュート</small></span><input id="volume" type="range" min="0" max="100" value="${settings.volume}"></label><p>設定はこのブラウザに保存します。OSの「動きを減らす」設定も優先します。問題の時計はダイアログ表示中も進みます。</p>`);
}
function currentExplanationQuestion() { return questions[review ? reviewIndex : index]; }
document.querySelector('#close-modal').onclick = () => modal.close();
document.addEventListener('input', e => {
  if (!['timed', 'effects', 'volume'].includes(e.target.id)) return;
  settings[e.target.id] = e.target.id === 'volume' ? Number(e.target.value) : e.target.checked;
  document.body.classList.toggle('reduce-effects', !effectsEnabled());
  try { localStorage.setItem('sensor-quest-settings', JSON.stringify(settings)); } catch { /* optional */ }
});
motionPreference.addEventListener('change', () => document.body.classList.toggle('reduce-effects', !effectsEnabled()));
document.addEventListener('click', e => {
  const c = e.target.closest('[data-choice]'); if (c) { answer(c.dataset.choice); return; }
  const option = e.target.closest('[data-option]'); if (option) { optionDetail(currentExplanationQuestion(), option.dataset.option); return; }
  const r = e.target.closest('[data-review]');
  if (r) { review = true; reviewIndex = Number(r.dataset.review); modal.close(); explanation(answers[reviewIndex]); return; }
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (action === 'start') start();
  if (action === 'home') title();
  if (action === 'quit') showModal('<h2>タイトルへ戻りますか？</h2><p>今回の回答記録は終了します。</p><button class="gold" data-action="confirm-quit">タイトルへ戻る</button>');
  if (action === 'confirm-quit') { modal.close(); title(); }
  if (action === 'next' && state === 'explanation' && !review) {
    if (index === questions.length - 1) result();
    else { index++; if (index === 5) stageTransition(); else question(); }
  }
  if (action === 'stage-start' && state === 'transition') question();
  if (action === 'review-next' && review) { if (reviewIndex === answers.length - 1) result(); else { reviewIndex++; explanation(answers[reviewIndex]); } }
  if (action === 'result') result();
  if (action === 'review-missed') reviewList(true);
  if (action === 'review-all') reviewList(false);
  if (action === 'settings') settingsModal();
  if (action === 'help') help();
  if (action === 'book') book();
  if (action === 'fullscreen') {
    const request = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    request.catch(() => showModal('<h2>全画面表示</h2><p>ブラウザの全画面機能も利用できます。ChromeOSでは全画面キーを使えます。</p>'));
  }
});
document.addEventListener('keydown', e => {
  if (modal.open || e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
  const activeTab = e.target.closest('[data-option]');
  if (activeTab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
    e.preventDefault(); const tabs = [...document.querySelectorAll('[data-option]')], current = tabs.indexOf(activeTab);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (current + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus(); optionDetail(currentExplanationQuestion(), tabs[next].dataset.option); return;
  }
  const i = letters.indexOf(e.key.toUpperCase());
  if (state === 'question' && i >= 0 && i < order.length) { e.preventDefault(); answer(order[i].id); }
});
document.addEventListener('error', e => {
  const img = e.target;
  if (img.dataset?.fallback === 'scene') {
    if (img.classList.contains('individual')) { img.className = 'scene scene-sheet'; img.src = img.dataset.sheet; }
    else { img.parentElement.classList.add('missing'); img.remove(); }
  }
  if (img.dataset?.fallback === 'cat') {
    if (img.classList.contains('cat-individual')) { img.className = 'cat-sheet'; img.src = catSheet; }
    else { img.parentElement.classList.add('missing-cat'); img.parentElement.textContent = '✦'; }
  }
}, true);
title();
