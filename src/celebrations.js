// Decorative only: never covers controls or contributes to screen-reader output.
export function metalShine() {
  return `<div class="metal-shine" aria-hidden="true">${Array.from({length:16},(_,i)=>`<i style="--x:${5+(i*37)%91}%;--y:${8+(i*23)%83}%;--delay:${i*.29}s">✦</i>`).join('')}</div>`;
}
export function finaleEffects() {
  return `<div class="finale-effects" aria-hidden="true"><div class="finale-rays"></div>${Array.from({length:32},(_,i)=>`<i style="--x:${(i*29)%100}%;--delay:${-(i%9)*.5}s;--fall:${4+i%4}s;--tone:${i%3}"></i>`).join('')}</div>`;
}

export function advancedFinale() {
  return `<div class="advanced-finale" aria-hidden="true"><div class="advanced-spotlights"></div>${Array.from({length:6},(_,i)=>`<div class="finale-firework" style="--fx:${12+i*15}%;--fy:${18+i%3*24}%;--start:${-i*.7}s">${Array.from({length:12},(_,j)=>`<b style="--ray:${j*30}deg;--hue:${i*61+j*12}"></b>`).join('')}</div>`).join('')}</div>`;
}
