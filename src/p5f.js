/* ===== round 11b: drag & drop reordering of the show card ===== */
Object.assign(D,{'ch.drag':['Przeciągnij kartę za nagłówek (⠿), aby zmienić jej miejsce.','Drag a card by its header (⠿) to move it.']});
(function(){
 const _sl=slotHtml;slotHtml=function(m,i,pos,len){return _sl.apply(this,arguments).replace('<div class="slot ','<div data-pos="'+pos+'" class="slot ').replace('<div class="row" style="gap:6px">','<div class="row" style="gap:6px"><span class="grip" aria-hidden="true">⠿</span>')};
 const _ph=promoHtml;promoHtml=function(p,i,pos,len){return _ph.apply(this,arguments).replace('<div class="slot">','<div data-pos="'+pos+'" class="slot pm">').replace('<div class="row" style="gap:6px">','<div class="row" style="gap:6px"><span class="grip" aria-hidden="true">⠿</span>')};
 const _vs=vShow;vShow=function(){let h=_vs.apply(this,arguments);return h.replace(t('ch.leg')+'</div>',t('ch.leg')+' · '+t('ch.drag')+'</div>')};
 if(typeof document==='undefined'||!document.addEventListener)return;
 if(!document.getElementById('p5fcss')){const s=document.createElement('style');s.id='p5fcss';s.textContent=
  '.tl>.slot>:first-child{cursor:grab;touch-action:none;user-select:none}.tl .grip{color:var(--mute);font-size:18px;line-height:1;cursor:grab}'+
  '.slot.dragging{position:relative;z-index:50;opacity:.92;box-shadow:0 12px 32px rgba(0,0,0,.35);cursor:grabbing;transition:none}.slot.dragging>:first-child{cursor:grabbing}'+
  '.tl.isdrag{user-select:none}.slot.dropbefore{box-shadow:0 -4px 0 0 var(--gold)}.slot.dropafter{box-shadow:0 4px 0 0 var(--gold)}';
  document.head.appendChild(s)}
 let DR=null;
 const others=()=>[].slice.call(DR.tl.children).filter(x=>x!==DR.slot);
 const target=y=>{let n=0;others().forEach(x=>{const r=x.getBoundingClientRect();if(r.top+window.scrollY+r.height/2<y)n++});return n};
 const clear=()=>{if(!DR)return;DR.tl.classList.remove('isdrag');DR.slot.classList.remove('dragging');DR.slot.style.transform='';[].slice.call(DR.tl.children).forEach(x=>x.classList.remove('dropbefore','dropafter'))};
 let raf=0;const auto=()=>{if(!DR||!DR.started)return;const y=DR.cy;if(y<70)window.scrollBy(0,-14);else if(y>innerHeight-70)window.scrollBy(0,14);else{raf=0;return}paint();raf=requestAnimationFrame(auto)};
 const paint=()=>{if(!DR||!DR.started)return;const py=DR.cy+window.scrollY;DR.slot.style.transform='translateY('+(py-DR.y0)+'px)';
  const o=others(),n=target(py);[].forEach.call(DR.tl.children,x=>x.classList.remove('dropbefore','dropafter'));
  if(o.length){if(n<o.length)o[n].classList.add('dropbefore');else o[o.length-1].classList.add('dropafter')}};
 document.addEventListener('pointerdown',e=>{if(e.button>0)return;const hd=e.target.closest&&e.target.closest('.tl>.slot>:first-child');if(!hd||e.target.closest('button,select,input,a,label'))return;
  const slot=hd.parentElement;DR={slot,tl:slot.parentElement,y0:e.clientY+window.scrollY,cy:e.clientY,started:false,pos0:+slot.dataset.pos,id:e.pointerId,hd};try{hd.setPointerCapture(e.pointerId)}catch(x){}});
 document.addEventListener('pointermove',e=>{if(!DR||e.pointerId!==DR.id)return;DR.cy=e.clientY;
  if(!DR.started){if(Math.abs(e.clientY+window.scrollY-DR.y0)<6)return;DR.started=true;DR.slot.classList.add('dragging');DR.tl.classList.add('isdrag')}
  paint();if(!raf)raf=requestAnimationFrame(auto)});
 const end=(e,cancel)=>{if(!DR||e.pointerId!==DR.id)return;const d=DR;try{d.hd.releasePointerCapture(d.id)}catch(x){}
  if(d.started&&!cancel){const n=target(e.clientY+window.scrollY);clear();DR=null;
   if(n!==d.pos0){const L=timeline();const it=L.splice(d.pos0,1)[0];L.splice(n,0,it);applyTL(L);render()}}
  else{clear();DR=null}};
 document.addEventListener('pointerup',e=>end(e,false));document.addEventListener('pointercancel',e=>end(e,true));
})();
if(typeof normTexts==='function')normTexts();
