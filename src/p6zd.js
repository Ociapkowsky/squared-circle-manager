;/* ===== roster: compact wrestler cards, each expandable on its own ===== */
(function(){
 const OPEN=new Set();
 const _wc=wCard;wCard=function(w){let h=_wc.apply(this,arguments);try{if(w&&w.id)h=h.replace('<div class="card wcard">','<div class="card wcard" data-wid="'+esc(w.id)+'">')}catch(e){}return h};
 function enhance(){try{if(G.screen!=='roster')return;document.querySelectorAll('.wcard[data-wid]:not([data-wc])').forEach(c=>{c.dataset.wc='1';const id=c.dataset.wid,st=c.querySelector(':scope > .stack');if(!st)return;
  const kids=[...st.children],head=kids[0],age=kids.find(k=>k.classList.contains('mute'));if(!head)return;
  const w=W(id);const rest=kids.filter(k=>k!==head);
  const more=document.createElement('div');more.className='wc-more stack';more.style.gap='7px';rest.forEach(k=>more.appendChild(k));
  const sum=document.createElement('div');sum.className='wc-sum';
  if(w)sum.innerHTML='<span>'+esc(t('st.ring'))+' <b>'+Math.round(w.ring)+'</b></span><span>'+esc(t('st.mic'))+' <b>'+Math.round(w.mic)+'</b></span><span>'+esc(t('st.cha'))+' <b>'+Math.round(w.cha)+'</b></span><span>'+esc(t('st.pop'))+' <b>'+Math.round(w.pop)+'</b></span>';
  const ageC=age?age.cloneNode(true):null;
  st.appendChild(sum);if(ageC){ageC.className='mute wc-age';st.appendChild(ageC)}st.appendChild(more);
  const b=document.createElement('button');b.className='wc-tg';b.type='button';b.setAttribute('aria-label','toggle');b.innerHTML='▾';
  const set=o=>{c.classList.toggle('wc-open',o);c.classList.toggle('wc-c',!o);b.innerHTML=o?'▴':'▾';b.setAttribute('aria-expanded',o?'true':'false')};
  set(OPEN.has(id));
  b.addEventListener('click',e=>{e.stopPropagation();const o=!c.classList.contains('wc-open');if(o)OPEN.add(id);else OPEN.delete(id);set(o)});
  c.appendChild(b)})}catch(e){}}
 const _r=render;render=function(){const r=_r.apply(this,arguments);enhance();return r};
 try{if(typeof document!=='undefined'&&!document.getElementById('wccss')){const s=document.createElement('style');s.id='wccss';s.textContent='.wcard[data-wc]{position:relative;padding-right:44px}.grid.gW:has(.wcard[data-wc]){align-items:start}.wc-tg{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:8px;border:1px solid rgba(128,128,128,.4);background:rgba(128,128,128,.12);color:inherit;font-size:16px;cursor:pointer;line-height:1}.wc-tg:hover{background:rgba(128,128,128,.28)}.wcard.wc-c .wc-more{display:none}.wcard.wc-c .av{min-height:0!important;height:auto!important;align-self:flex-start}.wcard.wc-c .av svg{width:44px;height:63px}.wc-sum{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:13px;opacity:.85}.wc-sum b{font-weight:700}.wcard.wc-open .wc-sum,.wcard.wc-open .wc-age{display:none}';document.head.appendChild(s)}}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
