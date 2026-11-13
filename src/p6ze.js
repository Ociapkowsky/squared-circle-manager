;/* ===== quality of life: Ctrl+K palette, back/recent, shortcuts, favourites, week to-do, clickable names, remembered roster filters ===== */
(function(){
 const L=(pl,en)=>[pl,en];
 Object.assign(D,{'qk.back':L('Wstecz','Back'),'qk.search':L('Szukaj (Ctrl+K)','Search (Ctrl+K)'),'qk.ph':L('Szukaj zawodnika, ekranu, pasa…','Search wrestler, screen, belt…'),'qk.recent':L('Ostatnio','Recent'),'qk.scr':L('Ekran','Screen'),'qk.wr':L('Zawodnik','Wrestler'),'qk.bl':L('Pas','Belt'),'qk.none':L('Brak wyników','No results'),
  'qk.hint':L('↑↓ wybór · Enter otwórz · Esc zamknij · ? skróty','↑↓ select · Enter open · Esc close · ? shortcuts'),
  'qk.help':L('Skróty klawiszowe','Keyboard shortcuts'),'qk.h1':L('Ctrl+K lub / – wyszukiwarka','Ctrl+K or / – search'),'qk.h2':L('Alt+← lub Backspace – wstecz','Alt+← or Backspace – back'),'qk.h3':L('1–9 – Pulpit, Skrzynka, Skład, Show, Kalendarz, Feudy, Pasy, Finanse, Świat','1–9 – Dashboard, Inbox, Roster, Show, Calendar, Feuds, Titles, Money, World'),'qk.h4':L('N – przejdź do Show (następny tydzień)','N – go to Show (next week)'),'qk.h5':L('E – rozwiń/zwiń wszystkich w Składzie','E – expand/collapse all in Roster'),
  'qk.expall':L('Rozwiń wszystkich','Expand all'),'qk.colall':L('Zwiń wszystkich','Collapse all'),'qk.favonly':L('Tylko ulubieni','Favourites only'),
  'qk.todo':L('Do zrobienia w tym tygodniu','To do this week'),'qk.favs':L('Ulubieni','Favourites'),
  'qk.t.card':L('Karta walk: gotowych walk {n}','Fight card: {n} matches ready'),'qk.t.con':L('Wygasające kontrakty: {n}','Expiring contracts: {n}'),'qk.t.inbox':L('Nowe w skrzynce: {n}','New in inbox: {n}'),'qk.t.inj':L('Kontuzjowani: {n}','Injured: {n}'),'qk.t.vac':L('Wakujące pasy: {n}','Vacant belts: {n}'),'qk.t.offer':L('Oferty pracy: {n}','Job offers: {n}'),'qk.t.ok':L('Wszystko ogarnięte ✔','All clear ✔'),'qk.fav':L('Ulubiony','Favourite')});
 const SCR=['dash','inbox','roster','show','cal','feuds','titles','money','world'];
 const HIST=[];let last=null,skip=false,restored=false,favOnly=false;
 const tn=n=>{const k='nav.'+n;return D[k]?t(k):null};
 const isInput=el=>el&&(/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)||el.isContentEditable);
 const modalOpen=()=>{const m=document.getElementById('modal');return !!(m&&!m.hidden)||!!document.getElementById('qkp')||!!document.getElementById('wp-pop')};
 const go=sc=>{try{if(typeof RUN!=='undefined'&&RUN)return;G.screen=sc;G.showResult=false;render()}catch(e){}};
 const goBack=()=>{while(HIST.length){const p=HIST.pop();if(p!==G.screen){skip=true;go(p);return}}};
 /* ---------- palette ---------- */
 let items=[],sel=0;
 const allScreens=()=>{const seen=new Set(),out=[];try{(typeof NAVG!=='undefined'?NAVG.flatMap(g=>g[1]):[]).concat(['tm','stables','cmk']).forEach(n=>{if(seen.has(n))return;seen.add(n);const l=tn(n);if(l)out.push({k:'scr',id:n,l,s:l.toLowerCase()})})}catch(e){}return out};
 const build=q=>{q=q.trim().toLowerCase();const out=[];
  if(!q){HIST.slice(-6).reverse().forEach(n=>{const l=tn(n);if(l&&!out.some(o=>o.id===n))out.push({k:'scr',id:n,l,r:1})});}
  const pool=allScreens();
  try{mine().forEach(w=>pool.push({k:'wr',id:w.id,l:w.name,s:w.name.toLowerCase(),w}))}catch(e){}
  try{G.titles.forEach(tt=>pool.push({k:'bl',id:tt.id,l:titleName(tt),s:titleName(tt).toLowerCase()}))}catch(e){}
  if(q)pool.filter(o=>o.s.indexOf(q)>=0).sort((a,b)=>(a.s.indexOf(q)-b.s.indexOf(q))||a.s.localeCompare(b.s)).slice(0,30).forEach(o=>out.push(o));
  else if(!out.length)pool.filter(o=>o.k==='scr').slice(0,10).forEach(o=>out.push(o));
  return out};
 const closeP=()=>{const e=document.getElementById('qkp');if(e)e.remove()};
 const act=o=>{closeP();if(!o)return;if(o.k==='scr'||o.k==='bl')return go(o.k==='bl'?'titles':o.id);
  if(o.k==='wr'){go('roster');try{ACT.pfopen({dataset:{id:o.id}})}catch(e){}}};
 const paint=()=>{const l=document.getElementById('qkl');if(!l)return;l.innerHTML=items.length?items.map((o,i)=>'<button type="button" class="qk-i'+(i===sel?' on':'')+'" data-qi="'+i+'"><span class="qk-t">'+(o.k==='wr'&&o.w?'':'')+esc(o.l)+'</span><span class="qk-k">'+esc(o.r?t('qk.recent'):t(o.k==='scr'?'qk.scr':o.k==='wr'?'qk.wr':'qk.bl'))+'</span></button>').join(''):'<div class="qk-n">'+esc(t('qk.none'))+'</div>';const on=l.querySelector('.on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest'})};
 const openP=()=>{if(document.getElementById('qkp'))return;const d=document.createElement('div');d.id='qkp';d.innerHTML='<div class="qk-box" role="dialog" aria-modal="true"><input id="qkin" class="field" autocomplete="off" placeholder="'+esc(t('qk.ph'))+'"><div id="qkl" class="qk-l"></div><div class="qk-h">'+esc(t('qk.hint'))+'</div></div>';document.body.appendChild(d);
  const inp=d.querySelector('#qkin');items=build('');sel=0;paint();inp.focus();
  inp.addEventListener('input',()=>{items=build(inp.value);sel=0;paint()});
  inp.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(items.length-1,sel+1);paint()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);paint()}else if(e.key==='Enter'){e.preventDefault();act(items[sel])}else if(e.key==='Escape'){e.preventDefault();closeP()}});
  d.addEventListener('mousedown',e=>{const b=e.target.closest('[data-qi]');if(b){e.preventDefault();act(items[+b.dataset.qi])}else if(e.target===d)closeP()})};
 const openHelp=()=>{if(document.getElementById('qkp'))return;const d=document.createElement('div');d.id='qkp';d.innerHTML='<div class="qk-box"><h3 style="margin:0 0 8px">'+esc(t('qk.help'))+'</h3><div class="qk-hl">'+['qk.h1','qk.h2','qk.h3','qk.h4','qk.h5'].map(k=>'<div>'+esc(t(k))+'</div>').join('')+'</div><div class="qk-h">Esc</div></div>';document.body.appendChild(d);d.addEventListener('mousedown',e=>{if(e.target===d)closeP()})};
 document.addEventListener('keydown',e=>{try{
  if(!G||!G.fed)return;
  if(e.key==='Escape'&&document.getElementById('qkp')){closeP();return}
  if((e.ctrlKey||e.metaKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();if(document.getElementById('qkp'))closeP();else openP();return}
  if(isInput(e.target)||e.ctrlKey||e.metaKey||modalOpen())return;
  if(e.key==='/'){e.preventDefault();openP();return}
  if(e.key==='?'){openHelp();return}
  if((e.altKey&&e.key==='ArrowLeft')||e.key==='Backspace'){e.preventDefault();goBack();return}
  if(e.altKey)return;
  if(/^[1-9]$/.test(e.key)){go(SCR[+e.key-1]);return}
  if(e.key==='n'||e.key==='N'){go('show');return}
  if((e.key==='e'||e.key==='E')&&G.screen==='roster'){const cs=[...document.querySelectorAll('.wcard[data-wc]')];if(cs.length){const any=cs.some(c=>!c.classList.contains('wc-open'));window.__wcAll&&window.__wcAll(any);}}
 }catch(x){}});
 /* ---------- render hook ---------- */
 const todo=()=>{const a=[];try{const ready=(G.card||[]).filter(m=>{try{return matchReady(m)}catch(e){return false}}).length;a.push(['qk.t.card',ready,'show',ready<3]);
  const ex=mine().filter(w=>w.contract<=8).length;if(ex)a.push(['qk.t.con',ex,'roster',true]);
  const nb=typeof ibxNew==='function'?ibxNew():0;if(nb)a.push(['qk.t.inbox',nb,'inbox',true]);
  const inj=mine().filter(w=>w.injury).length;if(inj)a.push(['qk.t.inj',inj,'roster',false]);
  const vac=G.titles.filter(tt=>!tt.holders||!tt.holders.length).length;if(vac)a.push(['qk.t.vac',vac,'titles',false]);
  const of=(G.offers||[]).length;if(of)a.push(['qk.t.offer',of,'inbox',false])}catch(e){}return a};
 const _vd=vDash;vDash=function(){let h=_vd.apply(this,arguments);try{const td=todo(),warn=td.filter(x=>x[3]);
  let c='<div class="card" id="qk-todo" style="margin-bottom:12px"><div class="px">'+esc(t('qk.todo'))+'</div><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:6px">'+td.map(x=>'<button class="btn sm'+(x[3]?' gold':'')+'" data-act="nav" data-v="'+x[2]+'">'+esc(t(x[0],{n:x[1]}))+'</button>').join('')+(td.length?'':'<span class="mute">'+esc(t('qk.t.ok'))+'</span>')+'</div>';
  const fav=mine().filter(w=>G.fav&&G.fav[w.id]);if(fav.length)c+='<div class="px" style="margin-top:10px">★ '+esc(t('qk.favs'))+'</div><div class="row" style="gap:10px;flex-wrap:wrap;margin-top:6px">'+fav.map(w=>'<button class="btn sm" data-act="pfopen" data-id="'+esc(w.id)+'" style="display:inline-flex;gap:6px;align-items:center">'+avatar(w.look,22)+esc(w.name)+'</button>').join('')+'</div>';
  c+='</div>';const i=h.indexOf('</div>');/* after the first .top header */const j=h.indexOf('<div class="top">');if(j>=0){const e=h.indexOf('</div>',h.indexOf('</button>',j));const k=e>=0?e+6:-1;if(k>0)return h.slice(0,k)+c+h.slice(k)}return c+h}catch(e){}return h};
 const star=id=>'<button type="button" class="wc-fav" data-fid="'+id+'" aria-label="'+esc(t('qk.fav'))+'">'+((G.fav&&G.fav[id])?'★':'☆')+'</button>';
 const linkNames=()=>{try{if(G.screen==='roster'||(typeof RUN!=='undefined'&&RUN))return;const main=document.querySelector('main');if(!main)return;const ws=mine().filter(w=>w.name&&w.name.length>=5);if(!ws.length)return;const map={};ws.forEach(w=>map[w.name]=w.id);
  const re=new RegExp(ws.map(w=>w.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).sort((a,b)=>b.length-a.length).join('|'),'g');
  const tw=document.createTreeWalker(main,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||n.nodeValue.length<5)return NodeFilter.FILTER_REJECT;if(p.closest('button,a,select,option,textarea,input,script,style,[data-act],.qk-l,.wlink,svg,h1,h2'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});
  const nodes=[];let n;while((n=tw.nextNode())&&nodes.length<600)nodes.push(n);
  nodes.forEach(n=>{re.lastIndex=0;if(!re.test(n.nodeValue))return;re.lastIndex=0;const f=document.createDocumentFragment();let i=0,m;const s=n.nodeValue;while((m=re.exec(s))){if(m.index>i)f.appendChild(document.createTextNode(s.slice(i,m.index)));const a=document.createElement('span');a.className='wlink';a.setAttribute('data-act','pfopen');a.setAttribute('data-id',map[m[0]]);a.setAttribute('role','button');a.tabIndex=0;a.textContent=m[0];f.appendChild(a);i=m.index+m[0].length}if(i<s.length)f.appendChild(document.createTextNode(s.slice(i)));n.parentNode.replaceChild(f,n)})}catch(e){}};
 const sideBar=()=>{try{const nav=document.querySelector('.side .nav');if(!nav||document.getElementById('qkbar'))return;const d=document.createElement('div');d.id='qkbar';d.innerHTML='<button type="button" class="qk-b" id="qkback" aria-label="'+esc(t('qk.back'))+'" title="'+esc(t('qk.back'))+' (Alt+←)">←</button><button type="button" class="qk-b qk-s" id="qksearch">'+esc(t('qk.search'))+'</button>';nav.parentNode.insertBefore(d,nav);
  d.querySelector('#qkback').addEventListener('click',goBack);d.querySelector('#qksearch').addEventListener('click',openP)}catch(e){}};
 const rosterUi=()=>{try{if(G.screen!=='roster')return;const grid=document.querySelector('.grid.gW');if(!grid)return;
  const cs=[...grid.querySelectorAll('.wcard[data-wc]')];
  cs.forEach(c=>{if(c.querySelector('.wc-fav'))return;const id=c.dataset.wid,nm=c.querySelector('.wname');if(nm){nm.insertAdjacentHTML('afterbegin',star(id)+' ')}});
  if(favOnly)cs.forEach(c=>{if(!(G.fav&&G.fav[c.dataset.wid]))c.style.display='none'});
  /* favourites first (stable) */
  if(G.fav&&Object.keys(G.fav).length){const fv=cs.filter(c=>G.fav[c.dataset.wid]);fv.slice().reverse().forEach(c=>grid.insertBefore(c,grid.firstChild))}
  if(!document.getElementById('qkro')){const bar=document.createElement('div');bar.id='qkro';bar.className='row';bar.style.cssText='gap:8px;margin:6px 0';const any=cs.some(c=>!c.classList.contains('wc-open'));
   bar.innerHTML='<button type="button" class="btn sm" id="qkexp">'+esc(t(any?'qk.expall':'qk.colall'))+'</button><button type="button" class="btn sm'+(favOnly?' gold':'')+'" id="qkfo">★ '+esc(t('qk.favonly'))+'</button>';grid.parentNode.insertBefore(bar,grid);
   bar.querySelector('#qkexp').addEventListener('click',()=>{const a=cs.some(c=>!c.classList.contains('wc-open'));window.__wcAll(a)});
   bar.querySelector('#qkfo').addEventListener('click',()=>{favOnly=!favOnly;render()})}}catch(e){}};
 window.__wcAll=function(open){document.querySelectorAll('.wcard[data-wc]').forEach(c=>{if(c.classList.contains('wc-open')!==open){const b=c.querySelector('.wc-tg');if(b)b.click()}});const x=document.getElementById('qkexp');if(x)x.textContent=t(open?'qk.colall':'qk.expall')};
 document.addEventListener('click',e=>{const f=e.target.closest&&e.target.closest('.wc-fav');if(!f)return;e.stopPropagation();e.preventDefault();const id=f.dataset.fid;G.fav=G.fav||{};if(G.fav[id])delete G.fav[id];else G.fav[id]=1;try{save()}catch(x){}render()},true);
 const _r=render;render=function(){
  if(!restored&&G){restored=true;try{if(G.rfui&&typeof RFUI!=='undefined')Object.assign(RFUI,G.rfui)}catch(e){}}
  const prev=G&&G.screen;const r=_r.apply(this,arguments);
  try{if(G&&G.screen!==last){if(last!=null&&!skip&&last!==G.screen){HIST.push(last);if(HIST.length>30)HIST.shift()}skip=false;last=G.screen}
   if(G&&typeof RFUI!=='undefined')G.rfui=Object.assign({},RFUI);
   sideBar();rosterUi();linkNames()}catch(e){}return r};
 try{if(!document.getElementById('qkcss')){const s=document.createElement('style');s.id='qkcss';s.textContent='#qkbar{display:flex;gap:6px;margin:8px 0}.qk-b{border:1px solid rgba(128,128,128,.4);background:rgba(128,128,128,.12);color:inherit;border-radius:8px;padding:6px 10px;cursor:pointer;font:inherit}.qk-b:hover{background:rgba(128,128,128,.28)}.qk-s{flex:1;text-align:left;opacity:.85}#qkp{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;padding:12vh 16px 16px}.qk-box{width:min(560px,100%);background:var(--panel);color:var(--fg);border-radius:14px;padding:14px;box-shadow:0 20px 60px rgba(0,0,0,.5);border:1px solid rgba(128,128,128,.35)}.qk-box .field{width:100%;box-sizing:border-box}.qk-l{max-height:48vh;overflow:auto;margin-top:8px;display:flex;flex-direction:column;gap:2px}.qk-i{display:flex;justify-content:space-between;gap:10px;border:0;background:transparent;color:inherit;padding:8px 10px;border-radius:8px;cursor:pointer;font:inherit;text-align:left}.qk-i.on,.qk-i:hover{background:rgba(212,33,61,.18)}.qk-k{opacity:.6;font-size:12px}.qk-n{padding:12px;opacity:.7}.qk-h{margin-top:8px;font-size:12px;opacity:.6}.qk-hl{display:flex;flex-direction:column;gap:6px}.wc-fav{border:0;background:transparent;color:var(--gold,#d4a017);font-size:18px;cursor:pointer;padding:0 4px;line-height:1}.wlink{cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px}.wlink:hover{color:var(--gold,#d4213d)}';document.head.appendChild(s)}}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
