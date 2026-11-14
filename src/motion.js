// Motion Prompt #130 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#130
// Wave text: original 4.7/3s cycle and 0.62rad character lag; distances scale with 70px reference type.
export function modeHeading(text) {
  return `<span class="mode-word" aria-label="${text}">${[...text].map((letter,i)=>`<i aria-hidden="true" style="--letter:${i}">${letter}</i>`).join('')}</span>`;
}
const allowed = () => !document.body.classList.contains('reduce-effects') && !matchMedia('(prefers-reduced-motion: reduce)').matches;
export function animateModeHeadings(root) {
  if (!allowed()) return;
  root.querySelectorAll('.mode-word i').forEach((el,i) => {
    const size = parseFloat(getComputedStyle(el).fontSize);
    const frames = Array.from({length:61},(_,n) => {
      const s = Math.sin(2*Math.PI*n/60 - .62*(i%3));
      return {transform:`translateY(${-28*size/70*s}px) scaleY(${1+.06*s})`,color:s>0?'var(--mode-bright)':'var(--mode-ink)'};
    });
    el.animate(frames,{duration:4700/3,iterations:Infinity});
  });
}
// Motion Prompt #003 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#003
// Ring, lines and dots ported from the source; transparent canvas replaces gallery stage/heart.
export function successBurst(host) {
  if (!allowed()) return;
  const canvas=document.createElement('canvas');canvas.width=539;canvas.height=300;canvas.className='success-canvas';canvas.setAttribute('aria-hidden','true');host.append(canvas);
  const k=canvas.getContext('2d'), start=performance.now();
  const clamp=x=>Math.min(1,Math.max(0,x));
  function draw(now){
    if(!canvas.isConnected)return;
    const t=(now-start)/1000;
    if(t>.75||!allowed()){canvas.remove();return;}
    const q=1-Math.pow(1-clamp(t/.6),5),fade=1-clamp((t-.3)/.42),X=269.5,Y=150;
    k.clearRect(0,0,539,300);k.globalAlpha=1;k.strokeStyle='#ffc83d';k.lineWidth=Math.max(.1,16*(1-q));
    k.beginPath();k.arc(X,Y,44+46*q,0,7);if(q<.98)k.stroke();k.lineCap='round';
    for(let i=0;i<10;i++){
      const a=i/10*Math.PI*2-Math.PI/2,r=64+66*q,len=36*(1-clamp((t-.22)/.48));
      if(len>.5){k.globalAlpha=1;k.strokeStyle=i%2?'#2edba8':'#ffc83d';k.lineWidth=9;k.beginPath();k.moveTo(X+Math.cos(a)*(r-len),Y+Math.sin(a)*(r-len)*.82);k.lineTo(X+Math.cos(a)*r,Y+Math.sin(a)*r*.82);k.stroke();}
      const a2=a+Math.PI/10,r2=58+92*q;k.globalAlpha=fade;k.fillStyle=i%2?'#ff6b5c':'#3b7bff';k.beginPath();k.arc(X+Math.cos(a2)*r2*1.45,Y+Math.sin(a2)*r2*.78,8*(1-q*.4),0,7);k.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
export function syncMotionPreference(){
  if(!allowed())document.querySelectorAll('.mode-word i').forEach(el=>el.getAnimations().forEach(a=>a.cancel()));
  else if(document.querySelector('.mode-title')&&!document.querySelector('.mode-word i')?.getAnimations().length)animateModeHeadings(document);
}
