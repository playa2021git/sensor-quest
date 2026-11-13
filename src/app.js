import { questions } from './questions.js';
import { evaluate, summarize, shuffle } from './engine.js';
import { sensors } from './encyclopedia.js';
const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const letters = ['A','B','C','D','E'];
const labels = { optimal:'最適な選択', possible:'実現可能・最適ではない', unsuitable:'条件に合わない選択', timeout:'時間切れ' };
let settings = { timed:true, effects:true, volume:0 };
try { settings = { ...settings, ...JSON.parse(localStorage.getItem('sensor-quest-settings') || '{}') }; } catch {}
let state='title', index=0, answers=[], order=[], timer, deadline=0, seconds=60, review=false, reviewIndex=0;
const cat = (pose='normal') => `<img class="cat ${pose}" src="assets/cat-${['normal','explain','success','improve','result'].includes(pose)?pose:'normal'}.svg" alt="安全ヘルメットと作業着を着た灰色の案内猫">`;
const image = q => `<img class="scene" src="${q.image}" alt="${q.title}の模式図">`;
const brand = '<div class="brand">SENSOR<br>QUEST<small>センサークエスト</small></div>';
function shell(content, cls='') { app.innerHTML=`<div class="game ${cls}"><header>${brand}<div class="progress">${questions.map((_,i)=>`<i class="${i < index ? 'done' : i === index ? 'current' : ''}"></i>`).join('')}</div><div class="top-tools"><button data-action="fullscreen" title="全画面表示">⛶ 全画面</button><button data-action="settings" title="設定">⚙ 設定</button></div></header>${content}</div>`; }
function title() {
  clearInterval(timer); state='title';
  app.innerHTML=`<div class="game title"><div class="title-top"><span>TECHNOLOGY & INGENUITY</span><button data-action="fullscreen">⛶ 全画面表示</button></div><div class="title-art"><div class="board">◉　▥　♩<hr>計 測 と 制 御<br><span>小さな発見から、未来をつくる。</span></div>${cat()}</div><main class="title-copy"><div class="emblem">▂ ▅ █</div><p class="eyebrow">技術の工房へ、ようこそ。</p><h1>SENSOR QUEST</h1><p class="jtitle">センサークエスト</p><p class="subtitle">― 最適なセンサを選べ！ ―</p><p class="intro">できる方法は、ひとつじゃない。<br>条件を読み解き、最適な技術を見つけよう。</p><button class="gold start" data-action="start"><span>▶</span> ゲームを始める</button><div class="title-links"><button data-action="book">▤ センサ図鑑</button><button data-action="help">？ 遊び方</button><button data-action="settings">⚙ 設定</button></div><p class="meta">全10問 / 約10〜15分 / 中学校 技術科</p></main><footer>身近な「なぜ？」を、技術で解き明かそう。<span>STAGE 01 実際の技術　→　STAGE 02 再発明</span></footer></div>`;
}
function start() { answers=[]; index=0; review=false; question(); }
function question() {
  clearInterval(timer); state='question'; order=shuffle(questions[index].choices); seconds=60;
  const q=questions[index];
  shell(`<main class="panel question-panel"><div class="panel-heading"><span class="tag">STAGE ${q.stage} / ${q.stage===1?'身近な技術':'再発明・問題解決'}</span><span class="counter">第 ${index+1} 問 <em>/ 全10問</em></span></div><div class="question-grid"><section class="problem"><h1>${q.title}</h1><div class="illustration">${image(q)}<span>MISSION ${String(index+1).padStart(2,'0')}</span></div><h2>${q.scenario}</h2><div class="conditions"><b>▧ 今回の条件</b><p>${q.requirements}</p></div></section><section class="answer-area"><div class="answer-heading"><h2>最適な方法は、どれ？</h2><span class="clock" role="timer">◷ <b id="seconds">${settings.timed?'60':'∞'}</b><small>${settings.timed?'秒':'制限なし'}</small></span></div><div class="choices">${order.map((c,i)=>`<button class="choice" data-choice="${c.id}"><kbd>${letters[i]}</kbd><span>${c.label}</span><span class="arrow">›</span></button>`).join('')}</div><p class="keyboard">キーボードの A〜E でも回答できます</p><div class="guide">${cat()}<p>名前だけで決めずに、<br><strong>「何を測る必要があるか」</strong><br>から考えてみよう。</p></div></section></div></main><div class="bottom-bar"><button data-action="quit">⌂ タイトルへ</button><span>費用・精度・複雑さも、選択の手がかり。</span><button data-action="help">？ 遊び方</button></div>`);
  if(settings.timed) { deadline=Date.now()+60000; timer=setInterval(tick,200); }
}
function tick() {
  if(state!=='question') return;
  seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  const el=document.querySelector('#seconds'); if(el) {el.textContent=seconds;el.parentElement.classList.toggle('urgent',seconds<=10);}
  if(seconds===0) answer(null);
}
function answer(id) {
  if(state!=='question')return;
  state='explanation'; clearInterval(timer);
  answers.push(evaluate(questions[index],id));
  if(settings.volume>0) { try {const ac=new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=answers.at(-1).score===2?660:330;g.gain.value=settings.volume/500;o.start();g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.2);o.stop(ac.currentTime+.2);o.onended=()=>ac.close();}catch{} }
  explanation(answers.at(-1));
}
function explanation(a) {
  state='explanation'; const q=questions.find(q=>q.id===a.questionId), chosen=q.choices.find(c=>c.id===a.choiceId), best=q.choices.find(c=>c.evaluation==='optimal');
  const good=a.evaluation==='optimal';
  shell(`<main class="panel explanation-panel"><div class="panel-heading"><span class="tag">${review?'振り返り':'解説'} / ${q.title}</span><span class="counter">${review?'REVIEW':`第 ${index+1} 問 / 全10問`}</span></div><div class="explain-top"><div class="illustration">${image(q)}</div><section class="selection ${a.evaluation}"><div class="selection-label">${good?'✦':a.evaluation==='possible'?'◇':'▧'} ${labels[a.evaluation]} <span>+${a.score}点</span></div><h2>${chosen?.label??'回答時間が終了しました'}</h2>${a.evaluation==='possible'?'<p class="possible-note">その方法でも実現可能です。</p>':''}<p><b>取得できる情報：</b>${chosen?.information??'今回は未回答です。最適な方法を確認しましょう。'}</p><p><b>${good?'特性と注意点':'問題点・比較のポイント'}：</b>${chosen?.explanation??q.explanation}</p></section></div><div class="explain-bottom"><section class="best"><span class="ribbon">♛ 最適な解決策</span><h2>${best.label}</h2><p>${best.explanation}</p><div class="learning">✓ ${q.learningPoint}</div></section><section class="others"><h3>▤ 他の選択肢について</h3>${q.choices.filter(c=>c!==best&&c!==chosen).map(c=>`<div><b>${c.label}</b><p><span class="eval ${c.evaluation}">${c.evaluation==='possible'?'実現可能':'条件に不適切'}</span> ${c.explanation}</p></div>`).join('')}</section></div></main><div class="explain-footer">${cat(good?(settings.effects?'success':'normal'):'improve')}<span class="cat-caption">${good?'最適解を発見！ センサ・インサイト！':'比較することが、技術を選ぶ力になる。'}</span><button class="gold next" data-action="${review?'review-next':'next'}">${review?(reviewIndex===answers.length-1?'結果に戻る':'次の解説へ'):index===9?'クエスト結果へ':'次の問題へ'}　›</button>${review?'<button data-action="result">結果に戻る</button>':''}</div>`,'explaining');
}
function result() {
  state='result'; review=false; clearInterval(timer); const s=summarize(answers);
  shell(`<main class="panel results"><div class="result-ribbon">クエスト結果</div><div class="result-grid"><section class="score-area"><p>最終スコア</p><div class="score">${s.score}<span> / 20点</span></div><p class="optimal-count">最適な選択 <b>${s.optimal}</b> / 10問</p><div class="rank"><small>センサ選択の評価</small><strong>${s.rank}</strong><span>${s.rank==='S'?'すばらしい洞察力！':s.rank==='A'?'とても良い！':'発見を次の一歩に！'}</span></div><div class="result-cat">${cat('result')}</div><p class="result-message">実現可能な方法を見つけることにも価値がある。<br>条件に合わせて、選択を磨いていこう。</p></section><section class="summary"><h2>▥ 選択のまとめ</h2>${[['optimal','最適な選択'],['possible','代替可能な選択'],['unsuitable','不適切な選択'],['timeout','時間切れ']].map(([k,v])=>`<div class="stat"><span>${v}</span><b>${s[k]}<small> 問</small></b><div class="track"><i class="${k}" style="width:${s[k]*10}%"></i></div></div>`).join('')}<div class="insight"><h3>☀ 今回の気づき</h3><p>センサには、得意な場面と苦手な場面がある。<br>AIも使えるが、いつも最適とは限らない。<br>次の授業では、条件を決めて試作品をつくろう。</p></div></section></div></main><div class="result-actions"><button data-action="review-missed">↻ 最適でなかった問題を復習</button><button data-action="review-all">▤ 全問を振り返る</button><button class="gold" data-action="start">もう一度挑戦</button><button data-action="home">⌂ タイトル</button></div><p class="assessment">得点は理解の参考情報です。学習評価そのものではありません。回答データは外部に送信しません。</p>`);
}
function reviewList(missed) {
  const list=answers.map((a,i)=>({a,i})).filter(({a})=>!missed||a.evaluation!=='optimal');
  showModal(`<p class="eyebrow">QUEST RECORD</p><h2>${missed?'最適でなかった問題':'全問の振り返り'}</h2>${list.length?list.map(({a,i})=>`<button class="review-row" data-review="${i}"><b>${i+1}. ${questions[i].title}</b><span>${labels[a.evaluation]}　›</span></button>`).join(''):'<p>全問で最適な選択ができました！「全問を振り返る」で解説を確認できます。</p>'}`);
}
function showModal(html) { document.querySelector('#modal-content').innerHTML=html; modal.showModal(); }
function help() {showModal(`<p class="eyebrow">HOW TO PLAY</p><h2>条件を読み、最適な技術を選ぼう。</h2><ol class="help-list"><li>問題の「今回の条件」を確認します。</li><li>5つの方法から選びます。クリック、A〜Eキー、Tab＋Enterが使えます。</li><li>解説で、取得できる情報と限界を比較します。</li></ol><div class="help-scores"><b>最適な選択：2点</b><b>実現可能：1点</b><b>条件に不適切・時間切れ：0点</b></div><p>全10問・20点満点。速さによる追加点はありません。初期設定は1問60秒。設定で時間制限をなくせます。</p><p>「実現できる」と「条件に最も合う」は違います。結果画面で自分の選択と最適解を振り返りましょう。</p>`); }
function book() {showModal(`<p class="eyebrow">SENSOR FIELD GUIDE</p><h2>センサ図鑑 <small>— 情報と限界を知ろう —</small></h2><p>AIカメラ・AIマイクは、カメラやマイクの情報を学習済みモデルが分類する仕組みです。</p><div class="book-grid">${sensors.map(([name,info,unknown,example,limit])=>`<article><h3>${name}</h3><p><b>取得：</b>${info}</p><p><b>分からない：</b>${unknown}</p><p><b>使用例：</b>${example}</p><p><b>苦手・注意：</b>${limit}</p></article>`).join('')}</div>`); }
function settingsModal() {showModal(`<p class="eyebrow">WORKSHOP SETTINGS</p><h2>音量・演出設定</h2><label class="setting"><span>1問60秒の時間制限<small>変更は次の問題から適用</small></span><input id="timed" type="checkbox" ${settings.timed?'checked':''}></label><label class="setting"><span>正解時の猫の演出<small>小さなアニメーション</small></span><input id="effects" type="checkbox" ${settings.effects?'checked':''}></label><label class="setting"><span>回答音の音量<small>初期設定はミュート</small></span><input id="volume" type="range" min="0" max="100" value="${settings.volume}"></label><p>設定はこのブラウザに保存されます。問題の時計はダイアログ表示中も進みます。</p>`); }
document.querySelector('#close-modal').onclick=()=>modal.close();
document.addEventListener('input',e=> {if(['timed','effects','volume'].includes(e.target.id)){settings[e.target.id]=e.target.id==='volume'?Number(e.target.value):e.target.checked;document.body.classList.toggle('reduce-effects',!settings.effects);try{localStorage.setItem('sensor-quest-settings',JSON.stringify(settings));}catch{}}});
document.addEventListener('click',e=>{
 const c=e.target.closest('[data-choice]');if(c){answer(c.dataset.choice);return;}
 const r=e.target.closest('[data-review]');if(r){review=true;reviewIndex=Number(r.dataset.review);modal.close();explanation(answers[reviewIndex]);return;}
 const a=e.target.closest('[data-action]')?.dataset.action;
 if(a==='start')start();if(a==='home')title();if(a==='quit')showModal('<h2>タイトルへ戻りますか？</h2><p>今回の回答記録は終了します。</p><button class="gold" data-action="confirm-quit">タイトルへ戻る</button>');
 if(a==='confirm-quit'){modal.close();title();}
 if(a==='next'){if(index===9)result();else{index++;question();}}
 if(a==='review-next'){if(reviewIndex===answers.length-1)result();else{reviewIndex++;explanation(answers[reviewIndex]);}}
 if(a==='result')result();if(a==='review-missed')reviewList(true);if(a==='review-all')reviewList(false);
 if(a==='settings')settingsModal();if(a==='help')help();if(a==='book')book();
 if(a==='fullscreen'){const request=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();request.catch(()=>showModal('<h2>全画面表示</h2><p>ブラウザの全画面表示機能も利用できます（ChromeOSでは全画面キー）。</p>'));}
});
document.addEventListener('keydown',e=>{if(modal.open||e.repeat||e.ctrlKey||e.altKey||e.metaKey)return;const i=letters.indexOf(e.key.toUpperCase());if(state==='question'&&i>=0){e.preventDefault();answer(order[i].id);}});
document.addEventListener('error',e=>{if(e.target.matches?.('img.scene')){e.target.replaceWith(Object.assign(document.createElement('div'),{className:'image-fallback',textContent:'▧ 場面の図（準備中）'}));}},true);
document.body.classList.toggle('reduce-effects',!settings.effects);
title();
