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
  browser = await chromium.launch({ headless:true, executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', args:['--no-sandbox'] });
  const context = await browser.newContext({ viewport:{ width:1366, height:768 } });
  const page = await context.newPage(); checkPage(page); await page.goto(base);
  await page.screenshot({ path:'work/v2-title.png' });
  await page.locator('[data-action="book"]').click(); assert.equal(await page.locator('[data-device]').count(), 19);
  await page.locator('#close-modal').click(); await page.locator('[data-action="help"]').click(); await page.locator('#close-modal').click();
  await page.locator('[data-action="fullscreen"]').click(); assert.ok(await page.evaluate(() => !!document.fullscreenElement)); await page.evaluate(() => document.exitFullscreen());
  checks.push('19-device encyclopedia, help, fullscreen');
  await page.locator('[data-action="start"]').click();
  for (let i = 0; i < 10; i++) {
    assert.equal(await page.locator('.choice').count(), 5);
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('stage-two')), i >= 5);
    await layout(page, `question ${i+1}`);
    if ([0,5,8].includes(i)) await page.screenshot({ path:`work/v2-question-${i+1}.png` });
    const id = i % 3 === 0 ? 'best' : i % 3 === 1 ? 'c0' : 'c3';
    const key = await page.locator(`[data-choice="${id}"] kbd`).innerText();
    await page.keyboard.press(key); await page.keyboard.press(key);
    const evaluation = questions[i].choices.find(c => c.id === id).evaluation;
    await page.locator(`.selection.${evaluation}`).waitFor();
    const feedback = await page.locator('.explanation-panel').getAttribute('class');
    assert.equal(feedback.includes('feedback-optimal'), evaluation === 'optimal');
    assert.equal(feedback.includes('feedback-possible'), evaluation === 'possible');
    if (evaluation === 'possible') assert.match(await page.locator('.possible-note').innerText(), /その方法でも実現できます/);
    await layout(page, `explanation ${i+1}`);
    if ([0,1,5,8].includes(i)) await page.screenshot({ path:`work/v2-explanation-${i+1}.png` });
    await next(page, i);
  }
  await page.getByText('クエスト結果', { exact:true }).waitFor();
  await page.waitForFunction(() => document.querySelector('#score-value').textContent === '11');
  assert.match(await page.locator('.rank').innerText(), /B/); await layout(page, 'mixed result');
  await page.screenshot({ path:'work/v2-result.png' });
  await page.locator('[data-action="review-missed"]').click(); assert.equal(await page.locator('[data-review]').count(), 6); await page.locator('#close-modal').click();
  await page.locator('[data-action="review-all"]').click(); assert.equal(await page.locator('[data-review]').count(), 10);
  await page.locator('[data-review="0"]').click();
  for (let i = 0; i < 10; i++) {
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('stage-two')), i >= 5);
    assert.equal(await page.locator('[role="tab"]').count(), 5);
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
  checks.push('10 questions via keys, double-answer guard, mixed 11/20 B, review all 50 choice explanations, theme during review');
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
    const choice = questions[i].choices.find(c => c.evaluation === 'possible');
    await page.locator(`[data-choice="${choice.id}"]`).click();
    await page.locator('.selection.possible').waitFor();
    await layout(page, `possible explanation ${i+1}`);
    await next(page, i);
  }
  assert.equal(await page.locator('#score-value').innerText(), '10');
  assert.match(await page.locator('.rank').innerText(), /C/);
  assert.match(await page.locator('.result-message').innerText(), /実現可能な方法も10問/);
  assert.equal(await page.locator('.confetti').count(), 0);
  checks.push('all 10 possible answers: 10/20 C, longer explanations, positive learning message');
  await context.close();
  // A controllable monotonic clock verifies deadline and untimed behavior.
  const clockContext = await browser.newContext({ viewport:{ width:1366, height:768 }, reducedMotion:'reduce' });
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
  await missing.route('**/assets/*.png', route => route.abort()); await missing.goto(base); await missing.locator('[data-action="start"]').click(); await missing.locator('.image-frame.missing').waitFor();
  await missing.locator('[data-choice="best"]').click(); await missing.locator('.selection.optimal').waitFor();
  checks.push('all PNGs missing: caption and mascot fallback, answering still works, subdirectory paths');
  await browser.close(); server.kill(); fs.writeFileSync('work/browser-results.json', JSON.stringify({ viewport:'1366x768', checks, errors }, null, 2)); console.log(JSON.stringify({ checks, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
})().catch(async e => { console.error(e); if (browser) await browser.close(); process.exitCode = 1; }).finally(() => server.kill());
