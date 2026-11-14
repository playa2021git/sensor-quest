import { drawMorph } from './morph.js';
const depthAnimations=[];
export function stopParallax(){depthAnimations.splice(0).forEach(a=>a?.cancel());}
const allowed=()=>!document.body.classList.contains('reduce-effects')&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=x=>Math.max(0,Math.min(1,x));
const phase=(t,a,b)=>clamp((t-a)/(b-a));
const spring=(t,w,d)=>t<=0?0:1-Math.exp(-d*t)*Math.cos(w*t);
// Sample the source equations, rather than substituting a generic easing.
function play(el,seconds,fn,delay=0){
  if(!el||!allowed())return;
  const frames=Array.from({length:101},(_,i)=>fn(seconds*i/100));
  return el.animate(frames,{duration:seconds*1000,delay:delay*1000,fill:'backwards',easing:'linear'});
}
// Motion Prompt #001 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#001
// Play entrance once and hold (no gallery exit), with original spring frequencies/damping.
export function popIn(el,delay=.28){
  play(el,1.3,t=>({transform:`rotate(${(1-spring(t,11,6))*-.35}rad) scale(${spring(t,15,6.5)})`}),delay);
}
// Motion Prompt #008 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#008
function kinetic(label,delay){
  // Isolate only the judgement, keeping answer details static and accessible.
  if(!label)return;
  const text=[...label.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
  let target=label.querySelector('strong');
  if(!target&&text){target=document.createElement('span');target.className='kinetic-verdict';text.replaceWith(target);target.textContent=text.textContent;}
  if(!target)return;
  play(target,.9,t=>{
    const tt=t-.2,sc=tt<0?3.4-2.4*Math.pow(phase(t,.02,.2),3):1;
    const dx=tt>0?10*Math.exp(-9*tt)*Math.sin(38*tt):0,sy=tt>0?1-.2*Math.exp(-11*tt):1;
    return {transform:`translateX(${dx}px) scale(${sc*(2-sy)},${sc*sy})`,opacity:phase(t,.02,.1)};
  },delay);
}
// Motion Prompt #012 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#012
function morph(host){
  if(!host||!allowed())return;
  const c=document.createElement('canvas');c.width=539;c.height=208;c.className='motion-morph';c.setAttribute('aria-hidden','true');host.append(c);
  const k=c.getContext('2d'),start=performance.now();
  function frame(now){if(!c.isConnected)return;if(!allowed()){c.remove();return;}k.clearRect(0,0,539,208);k.save();drawMorph(k,539,208,(Math.max(0,now-start)/1000)%4.7);k.restore();requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
}
// Motion Prompt #020 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#020
function zoom(panel){
  const radius=24.5,max=Math.hypot(innerWidth/2,innerHeight/2)/radius*1.08;
  const portal=document.createElement('div');portal.className='feedback-portal';portal.setAttribute('aria-hidden','true');panel.closest('.game').append(portal);
  const scale=t=>Math.pow(max,.8*Math.pow(phase(t,.25,1.2),3)+.2*(1-Math.pow(1-phase(t,1.2,1.65),3)));
  const a=play(portal,1.65,t=>({transform:`scale(${scale(t)})`}));
  const rect=panel.getBoundingClientRect();
  panel.style.transformOrigin=`${innerWidth/2-rect.left}px ${innerHeight/2-rect.top}px`;
  const contentAnimation=play(panel,1.65,t=>({transform:`scale(${scale(t)/max})`}));
  contentAnimation?.finished.then(()=>panel.style.removeProperty('transform-origin'),()=>panel.style.removeProperty('transform-origin'));
  if(a)a.finished.then(()=>portal.remove(),()=>portal.remove());else portal.remove();
}
// Motion Prompt #005 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#005
function mask(panel){
  const label=panel.querySelector('.basic-answer-label,.selection');
  const content=panel.querySelector('.basic-explain-grid,.explain-bottom');
  for(const [el,duration,delay,travel] of [[label,.65,.35,120],[content,.6,.55,-60]]){
    if(!el)continue;
    // Keep grid/flex placement on the original element; clip each item itself.
    el.classList.add('mask-reveal-item');
    play(el,duration,t=>({clipPath:`inset(${travel>0?(1-(1-Math.pow(1-t/duration,5)))*100:0}% 0 ${travel<0?Math.pow(1-t/duration,5)*100:0}% 0)`,translate:`0 ${travel*Math.pow(1-t/duration,5)}px`}),delay);
  }
  panel.classList.add('feedback-mask');
  setTimeout(()=>panel.classList.remove('feedback-mask'),1200);
}
export function animateFeedback(panel,correct){
  if(!panel||!allowed())return;
  if(correct)zoom(panel);else mask(panel);
  kinetic(panel.querySelector('.basic-answer-label,.selection-label'),correct?1.5:.35);
  popIn(panel.querySelector('.basic-next')||panel.closest('.game').querySelector('.next'),correct?1.65:1.15);
  morph(panel.querySelector('.basic-feedback-cat,.explanation-mascot'));
}
export function stopFeedbackMotion(){
  if(allowed())return;
  document.querySelectorAll('.feedback-portal,.motion-morph').forEach(el=>el.remove());
  document.querySelectorAll('#app *').forEach(el=>el.getAnimations().forEach(a=>{if(a.effect?.getTiming().fill==='backwards')a.cancel();}));
}
// Motion Prompt #016 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#016
export function parallax(root){
  stopParallax();
  if(!allowed())return;
  for(const [el,factor] of [[document.querySelector('.workshop-scene'),.05],[root.querySelector('.lab-hero img'),.1],[root.querySelector('.title-photo-cat'),.28]]){
    if(!el)continue;
    el.getAnimations().filter(a=>a.animationName?.endsWith('depth')).forEach(a=>a.cancel());
    depthAnimations.push(play(el,4.7,t=>({translate:`${-108*Math.sin(t/4.7*Math.PI*2)*factor}px 0`})));
    // A single title visit runs one complete depth pass and settles, avoiding reading-time motion.
  }
}
