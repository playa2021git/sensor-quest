const {chromium}=require('playwright');
const fs=require('fs');
const {spawn}=require('child_process');
const path=require('path');
const root=path.resolve(__dirname,'..');
process.chdir(root);
const server=spawn('python3',['-m','http.server','4175','--bind','127.0.0.1','--directory',path.dirname(root)],{stdio:'ignore'});
const base='http://127.0.0.1:4175/'+path.basename(root)+'/';
process.on('exit',()=>server.kill());
fs.mkdirSync('work',{recursive:true});
(async()=>{
for(let retry=0;retry<30;retry++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
const errors=[];
for(const size of [{width:1366,height:768},{width:1280,height:720}]){
 const context=await browser.newContext({viewport:size});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);
 await page.screenshot({path:`work/title-${size.width}.png`});
 await page.locator('[data-action="book"]').click();if(await page.locator('.book-grid article').count()<14)throw Error('encyclopedia incomplete');await page.locator('#close-modal').click();
 await page.locator('[data-action="help"]').click();await page.locator('#close-modal').click();
 await page.getByRole('button',{name:'▶ ゲームを始める'}).click();
 await page.screenshot({path:`work/question-${size.width}.png`});
 for(let i=0;i<10;i++){
  const layout=await page.evaluate(()=>({scroll:document.documentElement.scrollHeight,viewport:innerHeight,choices:[...document.querySelectorAll('.choice')].map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})),panel:document.querySelector('.panel').getBoundingClientRect().bottom}));
  if(layout.scroll>size.height||layout.choices.some(e=>e.bottom>size.height))throw Error(JSON.stringify(layout));
  await page.locator(`[data-choice="${i%3===0?'best':i%3===1?'c0':'c3'}"]`).click();await page.keyboard.press('a');
  await page.locator('.selection').waitFor();
  const over=await page.evaluate(()=>[...document.querySelectorAll('.selection,.best')].filter(e=>e.scrollHeight>e.clientHeight+2).map(e=>({class:e.className,h:e.clientHeight,sh:e.scrollHeight})));
  if(over.length)errors.push(`overflow ${size.width} Q${i+1} ${JSON.stringify(over)}`);
  if(i===0)await page.screenshot({path:`work/explanation-${size.width}.png`});
  await page.locator('[data-action="next"]').click();
 }
 await page.getByText('クエスト結果',{exact:true}).waitFor();if(!(await page.locator('.score').innerText()).startsWith('11'))throw Error('mixed score should be 11/20');await page.screenshot({path:`work/result-${size.width}.png`});
 await page.locator('[data-action="review-all"]').click();if(await page.locator('[data-review]').count()!==10)throw Error('review count');
 await page.locator('[data-review="0"]').click();await page.locator('.selection').waitFor();
 await page.locator('[data-action="result"]').click();await page.locator('[data-action="start"]').click();await page.locator('.choice').first().waitFor();
 await context.close();
}
// Test timer through controllable browser clock without a minute of real waiting.
const page=await browser.newPage({viewport:{width:1280,height:720}});await page.clock.install();await page.goto(base);await page.locator('[data-action="start"]').click();await page.clock.fastForward(61000);await page.locator('.selection.timeout').waitFor();
await page.locator('[data-action="next"]').click();await page.locator('[data-action="settings"]').click();await page.locator('#timed').uncheck();await page.locator('#close-modal').click();await page.keyboard.press('b');await page.locator('[data-action="next"]').click();await page.clock.fastForward(70000);if(await page.locator('#seconds').innerText()!=='∞')throw Error('timer disable failed');
// Missing illustration fallback.
await page.route('**/assets/*.svg',route=>route.abort());await page.reload();await page.locator('[data-action="start"]').click();await page.locator('.image-fallback').waitFor();
await browser.close();server.kill();fs.writeFileSync('work/browser-results.json',JSON.stringify({errors,sizes:['1366x768','1280x720'],tests:['10 questions','keyboard','double answer','result','review','restart','timeout','timer disabled','missing image','subdirectory']},null,2));console.log(JSON.stringify({errors}));if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
