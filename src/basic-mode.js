import { basicQuestions, basicScore, BASIC_PASS_SCORE } from './basics.js';
export const progressKey = 'sensor-quest-basics-v1';
let best = 0;
try { const saved = JSON.parse(localStorage.getItem(progressKey) || '{}'); best = Number.isInteger(saved.best) && saved.best >= 0 && saved.best <= 10 ? saved.best : 0; } catch { /* Session-only progress remains usable. */ }
export const basicsUnlocked = () => best >= BASIC_PASS_SCORE;
export const basicBest = () => best;
export function resetBasicProgress() { best = 0; try { localStorage.removeItem(progressKey); } catch { /* optional storage */ } }
export function createBasicMode({app, cat, advanced, celebrate}) {
  let index=0, answers=[], phase='';
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function frame(content) {
    app.innerHTML=`<div class="game basic-game"><header><div class="brand">SENSOR<br>QUEST<small>基礎編 ○×チャレンジ</small></div><div class="basic-progress">${basicQuestions.map((_,i)=>`<i class="${i<index?'done':i===index?'current':''}"></i>`).join('')}</div><button data-action="home">⌂ タイトルへ</button></header>${content}</div>`;
  }
  function visual(q) {
    return `<figure class="basic-visual"><div class="basic-sprite" role="img" aria-label="${esc(q.sensor)}の${q.tile===0?'外観':'概念図'}"><img src="assets/basic-sensors.png" style="--col:${q.tile%4};--row:${Math.floor(q.tile/4)}" alt="" onerror="this.parentElement.classList.add('basic-image-missing');this.remove()"></div><figcaption>${esc(q.sensor)}<small>生成した教材用イメージ</small></figcaption></figure>`;
  }
  function show() {
    phase='question';const q=basicQuestions[index];
    frame(`<main class="basic-board"><div class="basic-heading"><span>基礎編</span><b>第 ${index+1} 問 / 10問</b><span>時間制限なし</span></div><div class="basic-question">${visual(q)}<section><p class="basic-topic">${q.title}</p><h1>${esc(q.statement)}</h1><p class="basic-prompt">正しいと思ったら ○、違うと思ったら ×</p></section></div><div class="binary-choices"><button class="binary yes" data-basic-answer="true" aria-label="○ 正しい"><strong>○</strong><span>正しい <kbd>←</kbd></span></button><button class="binary no" data-basic-answer="false" aria-label="× 違う"><strong>×</strong><span>違う <kbd>→</kbd></span></button></div></main><footer class="basic-footer">${cat('think')}<p>何を測る？ 何は分からない？<br><b>センサの役割を確かめよう。</b></p><span>左右キーで選択 ／ Tab＋Enterでも回答</span></footer>`);
    app.querySelectorAll('[data-basic-answer]').forEach(button=>button.onclick=()=>answer(button.dataset.basicAnswer==='true'));
  }
  function answer(value) {
    if(phase!=='question')return;phase='explanation';answers.push(value);const q=basicQuestions[index], correct=value===q.answer;
    frame(`<main class="basic-board basic-explanation"><div class="basic-heading"><span>基礎編 / 解説</span><b>第 ${index+1} 問 / 10問</b></div><div class="basic-answer-label ${correct?'correct':'incorrect'}">${correct?'正解！':'ここを確認しよう'}<span>あなたの回答：${value?'○':'×'} ／ 正解：${q.answer?'○':'×'}</span></div><div class="basic-explain-grid">${visual(q)}<section><h1>${esc(q.title)}</h1><p class="basic-explain-text">${esc(q.explanation)}</p><p class="basic-note">${esc(q.note)}</p>${q.diagram?`<figure class="pir-diagram"><svg viewBox="0 0 520 125" role="img" aria-label="白いレンズの正面から検知範囲が広がる模式図。横を通る動きも範囲に入る。"><path d="M65 65 L430 10 Q500 65 430 115 Z" fill="#c5f2df" stroke="#16785b" stroke-width="2" stroke-dasharray="7 5"/><rect x="12" y="40" width="38" height="50" rx="5" fill="#286452"/><path d="M45 40 A25 25 0 0 1 45 90" fill="#fff" stroke="#6b8391" stroke-width="3"/><text x="150" y="55">レンズの前に広がる範囲</text><text x="150" y="82">横を通る動きも検知の対象</text></svg><figcaption>範囲の模式図。実際の角度・距離は機種によって異なります。</figcaption></figure>`:''}</section></div><button class="gold basic-next">${index===9?'結果を見る':'次の問題へ'} ›</button></main>`);
    app.querySelector('.basic-next').onclick=()=>{index++;if(index===10)result();else show();};
    if(correct)celebrate('optimal');
  }
  function result() {
    phase='result';const score=basicScore(answers),passed=score>=BASIC_PASS_SCORE;
    best=Math.max(best,score);try{localStorage.setItem(progressKey,JSON.stringify({best}));}catch{/* session fallback */}
    frame(`<main class="basic-board basic-result"><p class="basic-topic">基礎編 / 結果</p><h1>${passed?'基礎クリア！': 'もう一度、確かめよう。'}</h1><div class="basic-score"><strong>${score}</strong> / 10問正解</div><p>${passed?'応用編が解放されました！':basicsUnlocked()?'今回の合格ラインは7問。応用編の解放は維持されています。':'7問以上正解すると応用編が解放されます。'}</p><div class="basic-result-actions"><button class="gold" id="basic-retry">もう一度 基礎編</button>${basicsUnlocked()?'<button class="gold" id="basic-advanced">応用編へ進む</button>':''}<button data-action="home">タイトルへ</button></div><div class="basic-recap">${basicQuestions.map((q,i)=>`<details><summary><b class="${answers[i]===q.answer?'correct':'incorrect'}">${answers[i]===q.answer?'○ 正解':'× 要確認'}</b> ${i+1}. ${q.title} <span>正解：${q.answer?'○':'×'}</span></summary><p>${esc(q.statement)}</p><p>${esc(q.explanation)}</p></details>`).join('')}</div><p class="basic-save-note">進捗はこのブラウザに保存します。保存できない場合は、このページを開いている間だけ有効です。</p></main>`);
    app.querySelector('#basic-retry').onclick=start;const button=app.querySelector('#basic-advanced');if(button)button.onclick=advanced;
  }
  function start(){index=0;answers=[];show();}
  document.addEventListener('keydown',e=>{if(!app.querySelector('.basic-game')||phase!=='question'||document.querySelector('dialog[open]')||e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();answer(e.key==='ArrowLeft');}});
  return {start};
}
