const { chromium } = require('playwright');
const { spawn } = require('child_process');
const assert = require('node:assert/strict');
const path = require('path');
const server = spawn('python3',['-m','http.server','4177','--bind','127.0.0.1','--directory',path.resolve(__dirname,'..')],{stdio:'ignore'});
process.on('exit',()=>server.kill());
(async()=>{
  let browser;
  try {
    for(let i=0;i<30;i++){try{if((await fetch('http://127.0.0.1:4177')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
    browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
    const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    async function basic(value){await page.goto('http://127.0.0.1:4177');await page.locator('[data-action="basic-start"]').click();await page.locator(`[data-basic-answer="${value}"]`).click();}
    await basic(false);
    assert.equal(await page.locator('.feedback-portal').count(),1,'correct answer opens zoom portal');
    await page.locator('.feedback-portal').waitFor({state:'detached'});
    assert.equal(await page.locator('.motion-morph').count(),1);
    assert.equal(await page.locator('.basic-explain-grid').evaluate(e=>e.scrollHeight<=e.clientHeight+1),true,'first explanation and diagrams need no internal scroll');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight<=768),true);
    await page.locator('.basic-next').click();assert.equal(await page.locator('.motion-morph,.feedback-portal').count(),0,'navigation removes transient decorations');
    await basic(true);assert.equal(await page.locator('.feedback-mask').count(),1,'wrong answer uses mask');assert.equal(await page.locator('.feedback-portal').count(),0);
    await page.waitForTimeout(1300);assert.equal(await page.locator('.basic-explain-grid').evaluate(e=>e.scrollHeight<=e.clientHeight+1),true,'incorrect first explanation also fits');
    await page.addInitScript(()=>localStorage.setItem('sensor-quest-basics-v1',JSON.stringify({best:7})));
    await page.goto('http://127.0.0.1:4177');await page.locator('[data-action="start"]').click();await page.locator('[data-choice="best"]').click();assert.equal(await page.locator('.feedback-portal').count(),1,'advanced optimal answer uses same zoom');
    await page.locator('.feedback-portal').waitFor({state:'detached'});await page.locator('.next').click();
    await page.locator('[data-choice="c2"]').click();assert.equal(await page.locator('.feedback-mask').count(),1,'advanced unsuitable answer uses mask');
    await page.emulateMedia({reducedMotion:'reduce'});await basic(false);assert.equal(await page.locator('.feedback-portal,.motion-morph').count(),0);assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
    await page.emulateMedia({reducedMotion:'no-preference'});await page.addInitScript(()=>localStorage.setItem('sensor-quest-settings',JSON.stringify({effects:false})));await basic(false);assert.equal(await page.locator('.feedback-portal,.motion-morph').count(),0);assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
    assert.deepEqual(errors,[]);console.log('Motion checks passed: basic/advanced zoom and mask, no-scroll first explanation, cleanup, reduced motion and effects OFF.');
  } finally {await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
