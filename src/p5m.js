/* ===== music volume in the quick bar under the logo ===== */
(function(){
 const _sq=sndQuick;
 sndQuick=function(){
  const h=_sq.apply(this,arguments);
  const ic='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'+(MUS.on?'':'<line x1="3" y1="3" x2="21" y2="21"/>')+'</svg>';
  const lbl=t(MUS.on?'mus.off':'mus.on');
  return h+'<div class="qm"><button type="button" class="qb'+(MUS.on?'':' off')+'" data-act="mustog" aria-pressed="'+(MUS.on?'true':'false')+'" aria-label="'+esc(lbl)+'" title="'+esc(lbl)+'">'+ic+'</button>'+
   '<input type="range" min="0" max="100" value="'+Math.round(MUS.vol*100)+'" data-qmv="1" aria-label="'+esc(t('mus.vol'))+'" title="'+esc(t('mus.vol'))+'"></div>'};
 try{if(typeof document!=='undefined'&&!document.getElementById('qmcss')){const s=document.createElement('style');s.id='qmcss';s.textContent='.qm{display:flex;align-items:center;gap:8px;margin:-6px 0 12px}.qm input[type=range]{flex:1;min-width:0;accent-color:var(--gold)}.qm .qb.off+input{opacity:.5}';document.head.appendChild(s)}}catch(e){}
 try{if(typeof document!=='undefined')document.addEventListener('input',ev=>{const el=ev.target;if(!el||!el.matches||!el.matches('input[data-qmv]'))return;MUS.vol=Math.min(1,Math.max(0,+el.value/100));if(MUS.vol>0&&!MUS.on){MUS.on=true;const b=el.parentNode.querySelector('.qb');if(b){b.classList.remove('off');b.setAttribute('aria-pressed','true');const l=b.querySelector('line');if(l)l.remove()}}MUS.started=true;musSave();musApply()},true)}catch(e){}
})();
if(typeof normTexts==='function')normTexts();
