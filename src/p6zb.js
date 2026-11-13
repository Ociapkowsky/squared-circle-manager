;/* ===== Wrestler picker: avatar thumbnails, face/heel role and held belts in every wrestler dropdown ===== */
(function(){
if(typeof document==='undefined')return;
Object.assign(D,{'wp.search':['Szukaj zawodnika…','Search wrestler…'],'wp.none':['Brak wyników.','No results.'],'wp.close':['Zamknij','Close'],'wp.injured':['kontuzja','injured']});
const BELT_RE=/^\s*$/;
function belts(id){try{return G.titles.filter(tt=>(tt.holders||[]).indexOf(id)>=0).map(tt=>titleName(tt))}catch(e){return[]}}
function roleTag(w){const r=w.role||'tweener';return '<span class="tag '+r+'">'+esc(t('role.'+r).split(' ')[0])+'</span>'}
function rowHtml(w,sel){const bl=belts(w.id),st=(typeof stableOf==='function')?stableOf(w.id):null;
 return '<button class="wp-row'+(sel?' on':'')+'" data-v="'+esc(w.id)+'" type="button"><span class="wp-av">'+avatar(w.look,38)+'</span><span class="wp-tx"><b>'+esc(w.name)+(w.g==='f'?' ♀':'')+'</b><span class="wp-sub">'+roleTag(w)+'<span class="tag">'+esc(t('style.'+w.style))+'</span><span class="mute">★ '+Math.round(w.pop||0)+'</span>'+(st?'<span class="tag">'+esc(st.name)+'</span>':'')+(w.injury>0?'<span class="tag inj">'+esc(t('wp.injured'))+'</span>':'')+'</span>'+(bl.length?'<span class="wp-belt">🏆 '+bl.map(esc).join(' · ')+'</span>':'')+'</span></button>'}
function wrestlerSelect(sel){let n=0;for(const o of sel.options){if(o.value===''||BELT_RE.test(o.value))continue;if(!W(o.value))return false;n++}return n>0}
function btnHtml(sel){const o=sel.options[sel.selectedIndex];const w=o&&o.value?W(o.value):null;
 if(!w)return '<span class="wp-ph">'+esc(o?o.textContent:'—')+'</span><span class="wp-car">▾</span>';
 const bl=belts(w.id);return '<span class="wp-av">'+avatar(w.look,28)+'</span><span class="wp-tx"><b>'+esc(w.name)+'</b><span class="wp-sub">'+roleTag(w)+(bl.length?'<span class="wp-belt">🏆 '+bl.map(esc).join(' · ')+'</span>':'')+'</span></span><span class="wp-car">▾</span>'}
let pop=null;
function closePop(){if(pop){pop.remove();pop=null}}
function openPop(sel){closePop();const opts=[...sel.options];const blank=opts.find(o=>o.value==='');const ws=opts.filter(o=>o.value!=='').map(o=>({o,w:W(o.value)})).filter(x=>x.w);
 pop=document.createElement('div');pop.className='wp-ov';
 const cur=sel.value;const render=q=>{q=(q||'').toLowerCase();const list=ws.filter(x=>!q||x.w.name.toLowerCase().indexOf(q)>=0);
  return (blank&&!q?'<button class="wp-row" data-v="" type="button"><span class="wp-tx"><b>'+esc(blank.textContent)+'</b></span></button>':'')+(list.length?list.map(x=>rowHtml(x.w,x.o.value===cur)).join(''):'<div class="mute" style="padding:14px">'+esc(t('wp.none'))+'</div>')};
 pop.innerHTML='<div class="wp-box" role="dialog"><div class="row spread" style="gap:8px">'+(ws.length>7?'<input class="field wp-q" placeholder="'+esc(t('wp.search'))+'" style="flex:1">':'<span></span>')+'<button class="btn sm" data-x="1" type="button">'+esc(t('wp.close'))+'</button></div><div class="wp-list">'+render('')+'</div></div>';
 document.body.appendChild(pop);const list=pop.querySelector('.wp-list'),q=pop.querySelector('.wp-q');if(q){q.focus();q.addEventListener('input',()=>{list.innerHTML=render(q.value)})}
 pop.addEventListener('click',e=>{if(e.target===pop||e.target.closest('[data-x]')){closePop();return}const r=e.target.closest('.wp-row');if(!r)return;const v=r.dataset.v;closePop();if(sel.value!==v){sel.value=v;sel.dispatchEvent(new Event('change',{bubbles:true}))}});
 const sc=pop.querySelector('.wp-row.on');if(sc)sc.scrollIntoView({block:'center'})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pop)closePop()});
function enhance(){try{document.querySelectorAll('select:not([data-wp])').forEach(sel=>{if(sel.closest('#wp-skip'))return;sel.dataset.wp='1';if(!wrestlerSelect(sel))return;
  const b=document.createElement('button');b.type='button';b.className='wp-btn';b.innerHTML=btnHtml(sel);b.setAttribute('aria-label',sel.getAttribute('aria-label')||'');b.addEventListener('click',()=>openPop(sel));
  sel.style.display='none';sel.insertAdjacentElement('afterend',b)})}catch(e){}}
const _rn=render;render=function(){const r=_rn.apply(this,arguments);enhance();return r};
const _om2=openModal;openModal=function(){const r=_om2.apply(this,arguments);enhance();return r};
try{const s=document.createElement('style');s.textContent='.wp-btn{display:flex;align-items:center;gap:8px;min-width:0;width:100%;max-width:100%;text-align:left;padding:4px 8px;border-radius:8px;border:1px solid var(--line,#8886);background:var(--panel2,#0003);color:inherit;cursor:pointer;font:inherit}.wp-btn .wp-tx{display:flex;flex-direction:column;min-width:0;flex:1;gap:1px}.wp-btn .wp-tx b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px}.wp-ph{flex:1;opacity:.8;font-size:13px}.wp-car{opacity:.6}.wp-av{flex:none;display:inline-flex;border-radius:6px;overflow:hidden}.wp-sub{display:flex;gap:5px;flex-wrap:wrap;align-items:center;font-size:11px}.wp-belt{color:var(--gold);font-size:11px}.wp-ov{position:fixed;inset:0;background:#000a;z-index:9999;display:flex;align-items:center;justify-content:center;padding:12px}.wp-box{background:var(--panel,#1c1c1f);color:var(--text,inherit);border:1px solid var(--line,#8886);border-radius:12px;padding:12px;width:min(520px,100%);max-height:82vh;display:flex;flex-direction:column;gap:8px}.wp-list{overflow:auto;display:flex;flex-direction:column;gap:4px;min-height:0}.wp-row{display:flex;align-items:center;gap:10px;text-align:left;padding:6px 8px;border-radius:8px;border:1px solid transparent;background:transparent;color:inherit;cursor:pointer;font:inherit}.wp-row:hover,.wp-row.on{background:var(--panel2,#ffffff14);border-color:var(--gold,#c9a227)}.wp-row .wp-tx{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.wp-row b{font-size:14px}';document.head.appendChild(s)}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
