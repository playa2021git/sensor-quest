const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
process.chdir(root);
const server = spawn('python3', ['-m','http.server','4175','--bind','127.0.0.1','--directory',path.dirname(root)], { stdio:'ignore' });
const base = 'http://127.0.0.1:4175/' + path.basename(root) + '/';
process.on('exit', () => server.kill());
fs.mkdirSync('work', { recursive:true });
let browser;
const errors = [], checks = [];
function checkPage(page) { page.on('pageerror', e => errors.push(e.message)); }
async function layout(page, label) {
  const issues = await page.evaluate(() => {
    const issues = [];
    if (document.documentElement.scrollHeight > 768) issues.push('page vertical overflow');
    for (const el of document.querySelectorAll('.choice,.selection,.best,.conditions,.rank,.insight,.stage-intro,.problem')) {
      const box = el.getBoundingClientRect();
      if (el.scrollHeight > el.clientHeight + 2) issues.push(`${el.className}: content ${el.scrollHeight} > ${el.clientHeight}`);
      if (box.bottom > 768 || box.right > 1366) issues.push(`${el.className}: outside viewport`);
    }
    return issues;
  });
  errors.push(...issues.map(s => label + ': ' + s));
}
async function enterStage(page) {
  await page.locator('.stage-intro').waitFor();
  assert.equal(await page.locator('#seconds').count(), 0);
  assert.ok(await page.locator('body').evaluate(el => el.classList.contains('stage-two')));
  await layout(page, 'stage transition');
  await page.screenshot({ path:'work/v2-stage-transition.png' });
  await page.locator('[data-action="stage-start"]').click();
}
async function next(page, i) { await page.locator('[data-action="next"]').click(); if (i === 4) await enterStage(page); }
(async () => {
  for (let retry = 0; retry < 30; retry++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise(r => setTimeout(r, 100)); }
  const { questions } = await import('../src/questions.js');
  const { evaluate, summarize } = await import('../src/engine.js');
  const mixedIds = questions.map((q,i) => i % 3 === 0 ? 'best' : i % 3 === 1 ? 'c0' : 'c2');
  const mixedSummary = summarize(questions.map((q,i) => evaluate(q,mixedIds[i])));
  browser = await chromium.launch({ headless:true, executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', args:['--no-sandbox'] });
  const { basicQuestions } = await import('../src/basics.js');
  const bc = await browser.newContext({viewport:{width:1366,height:768}});
  const bp = await bc.newPage(); checkPage(bp); await bp.goto(base);
  assert.equal(await bp.locator('[data-action="start"]').isDisabled(),true);
  await bp.screenshot({path:'work/modes-title.png'});
  async function basicRun(page, correctCount) {
    await page.locator('[data-action="basic-start"]').click();
    for(let i=0;i<10;i++) {
      assert.equal(await page.locator('[data-basic-answer]').count(),2);
      assert.equal(await page.locator('#seconds').count(),0);
      await page.waitForFunction(()=>{const img=document.querySelector('.basic-sprite img');return img&&img.complete&&img.naturalWidth>0});
      const over=await page.evaluate(()=>document.documentElement.scrollHeight>768||document.querySelector('.basic-board').getBoundingClientRect().bottom>768);
      assert.equal(over,false,`basic ${i+1} overflow`);
      if(i===0) await page.screenshot({path:'work/basic-question.png'});
      const value=i<correctCount?basicQuestions[i].answer:!basicQuestions[i].answer;
      if(i===0) {await page.keyboard.press(value?'ArrowLeft':'ArrowRight');await page.keyboard.press(value?'ArrowLeft':'ArrowRight');}
      else await page.locator(`[data-basic-answer="${value}"]`).click();
      await page.locator('.basic-answer-label').waitFor();
      assert.ok((await page.locator('.basic-answer-label').innerText()).includes(`正解：${basicQuestions[i].answer?'○':'×'}`));
      if(i===0) {assert.equal(await page.locator('.pir-diagram').count(),1);await page.screenshot({path:'work/basic-pir-explanation.png'});}
      await page.locator('.basic-next').click();
    }
    assert.equal(await page.locator('.basic-score strong').innerText(),String(correctCount));
    assert.equal(await page.locator('.basic-recap details').count(),10);
  }
  await basicRun(bp,6);
  assert.equal(await bp.locator('#basic-advanced').count(),0);
  await bp.reload();assert.equal(await bp.locator('[data-action="start"]').isDisabled(),true);
  await basicRun(bp,7);
  await bp.screenshot({path:'work/basic-pass.png'});
  await bp.locator('#basic-advanced').click();assert.equal(await bp.locator('.choice').count(),4);
  await bp.reload();assert.equal(await bp.locator('[data-action="start"]').isEnabled(),true);
  await basicRun(bp,0);assert.equal(await bp.locator('#basic-advanced').count(),1);
  await bp.reload();await bp.locator('[data-action="reset-progress"]').click();await bp.locator('#close-modal').click();assert.equal(await bp.locator('[data-action="start"]').isEnabled(),true);
  await bp.locator('[data-action="reset-progress"]').click();await bp.locator('[data-action="confirm-reset-progress"]').click();assert.equal(await bp.locator('[data-action="start"]').isDisabled(),true);
  // Even invoking the advanced action on a tampered button cannot skip the gate.
  await bp.locator('[data-action="start"]').evaluate(el=>el.disabled=false);await bp.locator('[data-action="start"]').click();assert.equal(await bp.locator('.choice').count(),0);
  await basicRun(bp,10);
  const fallback=await bc.newPage();checkPage(fallback);await fallback.route('**/assets/basic-sensors.png',route=>route.abort());await fallback.goto(base);await fallback.locator('[data-action="basic-start"]').click();await fallback.locator('.basic-image-missing').waitFor();await fallback.locator('[data-basic-answer="false"]').click();await fallback.locator('.basic-answer-label').waitFor();
  await bc.close();
  const blocked=await browser.newContext({viewport:{width:1366,height:768}});
  await blocked.addInitScript(()=>{Storage.prototype.getItem=function(){throw new Error('storage disabled')};Storage.prototype.setItem=function(){throw new Error('storage disabled')};Storage.prototype.removeItem=function(){throw new Error('storage disabled')};});
  const sp=await blocked.newPage();checkPage(sp);await sp.goto(base);await basicRun(sp,7);await sp.locator('#basic-advanced').click();assert.equal(await sp.locator('.choice').count(),4);await sp.reload();assert.equal(await sp.locator('[data-action="start"]').isDisabled(),true);await blocked.close();
  checks.push('basic: 10 illustrated binary questions; keyboard/double-answer guard; 6 fail, 7 pass, 10 pass; persistence, reset, locked action guard, storage-denied session fallback');

  const context = await browser.newContext({ viewport:{ width:1366, height:768 } });
  await context.addInitScript(() => localStorage.setItem('sensor-quest-basics-v1', JSON.stringify({best:7})));
  const page = await context.newPage(); checkPage(page); await page.goto(base);
  await page.screenshot({ path:'work/v2-title.png' });
  await page.locator('[data-action="book"]').click(); assert.equal(await page.locator('[data-device]').count(), 19);
  await page.locator('#close-modal').click(); await page.locator('[data-action="help"]').click(); await page.locator('#close-modal').click();
  await page.locator('[data-action="fullscreen"]').click(); assert.ok(await page.evaluate(() => !!document.fullscreenElement)); await page.evaluate(() => document.exitFullscreen());
  checks.push('19-device encyclopedia, help, fullscreen');
  await page.locator('[data-action="start"]').click();
  for (let i = 0; i < 10; i++) {
    assert.equal(await page.locator('.choice').count(), 4);
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('stage-two')), i >= 5);
    await layout(page, `question ${i+1}`);
    if ([0,5,8].includes(i)) await page.screenshot({ path:`work/v2-question-${i+1}.png` });
    const id = mixedIds[i];
    // Removed E shortcut must not answer or throw.
    await page.keyboard.press('E');
    assert.equal(await page.locator('.choice').count(), 4);
    const key = await page.locator(`[data-choice="${id}"] kbd`).innerText();
    await page.keyboard.press(key); await page.keyboard.press(key);
    const evaluation = questions[i].choices.find(c => c.id === id).evaluation;
    await page.locator(`.selection.${evaluation}`).waitFor();
    if (evaluation === 'unsuitable') assert.equal(await page.locator('.answer-burst').count(), 0);
    else {
      assert.equal(await page.locator('.answer-burst strong').innerText(), evaluation === 'optimal' ? 'MARVELOUS!' : 'GOOD!');
      if (i === 0) { await page.waitForTimeout(180); await page.screenshot({ path:'work/marvelous-burst.png' }); }
      await page.locator('.answer-burst').waitFor({ state:'detached' });
    }
    const feedback = await page.locator('.explanation-panel').getAttribute('class');
    assert.equal(feedback.includes('feedback-optimal'), evaluation === 'optimal');
    assert.equal(feedback.includes('feedback-possible'), evaluation === 'possible');
    if (evaluation === 'possible') assert.match(await page.locator('.possible-note').innerText(), /その方法でも実現できます/);
    await layout(page, `explanation ${i+1}`);
    if ([0,1,5,8].includes(i)) await page.screenshot({ path:`work/v2-explanation-${i+1}.png` });
    await next(page, i);
  }
  await page.getByText('クエスト結果', { exact:true }).waitFor();
  await page.waitForFunction(score => document.querySelector('#score-value').textContent === String(score), mixedSummary.score);
  assert.ok((await page.locator('.rank').innerText()).includes(mixedSummary.rank)); await layout(page, 'mixed result');
  await page.screenshot({ path:'work/v2-result.png' });
  await page.locator('[data-action="review-missed"]').click(); assert.equal(await page.locator('[data-review]').count(), 10 - mixedSummary.optimal); await page.locator('#close-modal').click();
  await page.locator('[data-action="review-all"]').click(); assert.equal(await page.locator('[data-review]').count(), 10);
  await page.locator('[data-review="0"]').click();
  for (let i = 0; i < 10; i++) {
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('stage-two')), i >= 5);
    assert.equal(await page.locator('[role="tab"]').count(), 4);
    assert.equal(await page.locator('.answer-burst').count(), 0);
    for (const choice of questions[i].choices) {
      await page.locator(`[data-option="${choice.id}"]`).click();
      assert.ok((await page.locator('.option-detail').innerText()).includes(choice.information));
      assert.ok((await page.locator('.option-detail').innerText()).includes(choice.limitations));
      assert.ok((await page.locator('.option-detail').innerText()).includes(choice.explanation));
    }
    await page.locator('[role="tab"]').last().focus(); await page.keyboard.press('Home');
    assert.equal(await page.locator('[role="tab"]').first().getAttribute('aria-selected'), 'true');
    await page.locator('[data-action="review-next"]').click();
  }
  checks.push('10 questions via keys, double-answer guard, MARVELOUS/GOOD bursts and cleanup, no burst for unsuitable/review/effects off, mixed score and rank, review all 40 choice explanations, theme during review');
  // Perfect score and celebration, then disabling every animation.
  await page.locator('[data-action="start"]').click();
  for (let i = 0; i < 10; i++) { await page.locator('[data-choice="best"]').click(); await layout(page, `optimal explanation ${i+1}`); await next(page, i); }
  await page.waitForFunction(() => document.querySelector('#score-value').textContent === '20');
  assert.equal(await page.locator('.confetti i').count(), 22); assert.equal(await page.locator('.perfect').count(), 1);
  await page.screenshot({ path:'work/v2-perfect.png' });
  await page.locator('[data-action="settings"]').click(); await page.locator('#effects').uncheck(); await page.locator('#close-modal').click();
  assert.equal(await page.locator('.confetti').evaluate(el => getComputedStyle(el).display), 'none');
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  await page.locator('[data-action="review-missed"]').click(); assert.equal(await page.locator('[data-review]').count(), 0); await page.locator('#close-modal').click();
  checks.push('20/20 S, perfect celebration, no missed questions, animations off');
  // A full alternative-method run checks every question's longer possible explanation.
  await page.locator('[data-action="start"]').click();
  for (let i = 0; i < 10; i++) {
    const choice = questions[i].choices.find(c => c.evaluation === 'possible') || questions[i].choices.find(c => c.id !== 'best' && c.evaluation === 'optimal') || questions[i].choices.find(c => c.evaluation === 'unsuitable');
    await page.locator(`[data-choice="${choice.id}"]`).click();
    await page.locator(`.selection.${choice.evaluation}`).waitFor();
    assert.equal(await page.locator('.answer-burst').count(), 0);
    if (i === 0) { assert.equal(choice.id, 'c0'); assert.match(await page.locator('.selection-label').innerText(), /\+1点/); assert.match(await page.locator('.selected-reason').innerText(), /水/); }
    await layout(page, `possible explanation ${i+1}`);
    await next(page, i);
  }
  await page.waitForFunction(() => document.querySelector('#score-value').textContent === '4');
  assert.match(await page.locator('.rank').innerText(), /D/);
  assert.match(await page.locator('.result-message').innerText(), /実現可能な方法も4問/);
  assert.equal(await page.locator('.confetti').count(), 0);
  checks.push('alternative methods including questions without possible answers: 4/20 D, all longer explanations');
  await context.close();
  // A controllable monotonic clock verifies deadline and untimed behavior.
  const clockContext = await browser.newContext({ viewport:{ width:1366, height:768 }, reducedMotion:'reduce' });
  await clockContext.addInitScript(() => localStorage.setItem('sensor-quest-basics-v1', JSON.stringify({best:7})));
  const timed = await clockContext.newPage(); checkPage(timed); await timed.clock.install(); await timed.goto(base); await timed.locator('[data-action="start"]').click();
  assert.equal(await timed.locator('#seconds').innerText(), '30');
  assert.equal(await timed.locator('.question-panel').getAttribute('data-time-phase'), 'blue');
  await timed.clock.fastForward(14000); assert.equal(await timed.locator('#seconds').innerText(), '16');
  assert.equal(await timed.locator('.question-panel').getAttribute('data-time-phase'), 'blue');
  await timed.clock.fastForward(1000); assert.equal(await timed.locator('#seconds').innerText(), '15');
  assert.equal(await timed.locator('.question-panel').getAttribute('data-time-phase'), 'yellow');
  await timed.clock.fastForward(9000); assert.equal(await timed.locator('#seconds').innerText(), '6');
  assert.equal(await timed.locator('.question-panel').getAttribute('data-time-phase'), 'yellow');
  await timed.clock.fastForward(1000); assert.equal(await timed.locator('#seconds').innerText(), '5');
  assert.equal(await timed.locator('.question-panel').getAttribute('data-time-phase'), 'red');
  await timed.clock.fastForward(6000); await timed.locator('.selection.timeout').waitFor(); assert.equal(await timed.locator('.feedback-optimal,.feedback-possible').count(), 0); assert.match(await timed.locator('.selection-label').innerText(), /\+0点/);
  await timed.locator('[data-action="next"]').click(); await timed.locator('[data-action="settings"]').click(); await timed.locator('#timed').uncheck(); await timed.locator('#close-modal').click();
  await timed.keyboard.press('A'); await timed.locator('[data-action="next"]').click(); await timed.clock.fastForward(70000); assert.equal(await timed.locator('#seconds').innerText(), '∞');
  assert.equal(await timed.locator('.timer-illumination').count(), 0);
  assert.equal(await timed.evaluate(() => document.getAnimations().length), 0);
  checks.push('30-second timer and 15/5-second color boundaries, timeout 0, untimed next question, reduced-motion');
  await clockContext.close();
  const missing = await browser.newPage({ viewport:{ width:1366, height:768 } }); checkPage(missing);
  await missing.addInitScript(() => localStorage.setItem('sensor-quest-basics-v1', JSON.stringify({best:7})));
  await missing.route('**/assets/*.png', route => route.abort()); await missing.goto(base); await missing.locator('[data-action="start"]').click(); await missing.locator('.image-frame.missing').waitFor();
  await missing.locator('[data-choice="best"]').click(); await missing.locator('.selection.optimal').waitFor();
  checks.push('all PNGs missing: caption and mascot fallback, answering still works, subdirectory paths');
  await browser.close(); server.kill(); fs.writeFileSync('work/browser-results.json', JSON.stringify({ viewport:'1366x768', checks, errors }, null, 2)); console.log(JSON.stringify({ checks, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
})().catch(async e => { console.error(e); if (browser) await browser.close(); process.exitCode = 1; }).finally(() => server.kill());
