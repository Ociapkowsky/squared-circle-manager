/* ===== round 11c: show what an event choice changed (toast + log entry) ===== */
Object.assign(D,{
 'fx.title':['Skutki wyboru','What this changed'],'fx.none':['Brak natychmiastowych zmian.','No immediate changes.'],
 'fx.cash':['Gotówka {v}','Cash {v}'],'fx.pop':['Popularność federacji {v}','Promotion popularity {v}'],'fx.board':['Zaufanie zarządu {v}','Board trust {v}'],'fx.cred':['Wiarygodność w mediach {v}','Media credibility {v}'],
 'fx.wpop':['{w}: popularność {v}','{w}: popularity {v}'],'fx.wmor':['{w}: morale {v}','{w}: morale {v}'],'fx.allmor':['Cała szatnia: morale {v}','Whole locker room: morale {v}'],
 'fx.inj':['{w}: kontuzja ({n} tyg.)','{w}: injured ({n} wk)'],'fx.heal':['{w}: wraca do zdrowia','{w}: recovered'],
 'fx.con':['{w}: kontrakt {v} tyg.','{w}: contract {v} wk'],'fx.role':['{w}: teraz {r}','{w}: now {r}'],'fx.in':['Dołącza: {w}','Joins: {w}'],'fx.out':['Odchodzi: {w}','Leaves: {w}'],
 'fx.heat':['Feud {f}: gorąco {v}','Feud {f}: heat {v}'],'fx.feudend':['Feud {f} dobiegł końca','Feud {f} has ended'],'fx.feudnew':['Nowy feud: {f}','New feud: {f}'],
 'fx.more':['… i {n} innych zmian','… and {n} more changes'],'ibx.fx':['Skutki','Effects']
});
function fxSnap(){const s={cash:G.fed.cash,pop:G.fed.pop,board:G.board?G.board.conf:null,cred:G.mr?G.mr.cred:null,w:{},f:{},ib:G.inbox&&G.inbox[0]};
 mine().forEach(w=>{s.w[w.id]={n:w.name,pop:w.pop,mor:w.morale,inj:w.injury||0,con:w.contract,role:w.role}});
 (G.feuds||[]).forEach(f=>{s.f[f.id]={heat:f.heat,n:fxFeudName(f)}});return s}
function fxFeudName(f){try{return f.A.concat(f.B).map(id=>(W(id)||{}).name||'?').join(' / ')}catch(e){return '?'}}
const fxS=(v,d)=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(d==null?1:d);
function fxDiff(a,b){const L=[];const add=(k,v,p)=>L.push({k,v,p:p||0});
 if(Math.abs(b.cash-a.cash)>=1)add('fx.cash',{v:(b.cash>=a.cash?'+':'−')+money(Math.abs(b.cash-a.cash))},3);
 if(Math.abs(b.pop-a.pop)>=.1)add('fx.pop',{v:fxS(b.pop-a.pop)},3);
 if(a.board!=null&&b.board!=null&&Math.abs(b.board-a.board)>=1)add('fx.board',{v:fxS(b.board-a.board,0)},3);
 if(a.cred!=null&&b.cred!=null&&Math.abs(b.cred-a.cred)>=1)add('fx.cred',{v:fxS(b.cred-a.cred,0)},3);
 const ids=Object.keys(b.w).filter(i=>a.w[i]);const mord=ids.map(i=>b.w[i].mor-a.w[i].mor);
 const moved=mord.filter(d=>Math.abs(d)>=1);let allm=null;
 if(ids.length>=4&&moved.length>=ids.length*.7){const avg=moved.reduce((x,y)=>x+y,0)/moved.length;if(moved.every(d=>Math.sign(d)===Math.sign(avg))){allm=avg;add('fx.allmor',{v:fxS(avg,0)},2)}}
 ids.forEach(i=>{const x=a.w[i],y=b.w[i];
  if(Math.abs(y.pop-x.pop)>=.3)add('fx.wpop',{w:y.n,v:fxS(y.pop-x.pop)},2);
  if(allm==null&&Math.abs(y.mor-x.mor)>=2)add('fx.wmor',{w:y.n,v:fxS(y.mor-x.mor,0)},1);
  if(y.inj>0&&!(x.inj>0))add('fx.inj',{w:y.n,n:y.inj},2);if(x.inj>0&&!(y.inj>0))add('fx.heal',{w:y.n},1);
  if(y.con!==x.con&&Math.abs(y.con-x.con)>=2)add('fx.con',{w:y.n,v:y.con},1);
  if(y.role!==x.role)add('fx.role',{w:y.n,r:t('role.'+y.role).split(' ')[0]},2)});
 Object.keys(b.w).filter(i=>!a.w[i]).forEach(i=>add('fx.in',{w:b.w[i].n},3));
 Object.keys(a.w).filter(i=>!b.w[i]).forEach(i=>add('fx.out',{w:a.w[i].n},3));
 Object.keys(b.f).forEach(i=>{if(!a.f[i])add('fx.feudnew',{f:b.f[i].n},2);else if(Math.abs(b.f[i].heat-a.f[i].heat)>=2)add('fx.heat',{f:b.f[i].n,v:fxS(b.f[i].heat-a.f[i].heat,0)},1)});
 Object.keys(a.f).forEach(i=>{if(!b.f[i])add('fx.feudend',{f:a.f[i].n},2)});
 L.sort((x,y)=>y.p-x.p);return L}
function fxText(L,max){const s=L.slice(0,max||8).map(x=>t(x.k,x.v));if(L.length>(max||8))s.push(t('fx.more',{n:L.length-(max||8)}));return s}
function fxToast(title,lines){if(typeof document==='undefined')return;let el=document.getElementById('fxtoast');if(el)el.remove();
 el=document.createElement('div');el.id='fxtoast';el.setAttribute('role','status');
 el.innerHTML='<div class="row spread" style="gap:10px"><b>'+esc(t('fx.title'))+'</b><button class="btn sm" aria-label="×">×</button></div>'+(title?'<div class="mute" style="font-size:12px;margin:2px 0 4px">'+esc(title)+'</div>':'')+(lines.length?lines.map(l=>'<div>'+esc(l)+'</div>').join(''):'<div class="mute">'+esc(t('fx.none'))+'</div>');
 el.querySelector('button').onclick=()=>el.remove();document.body.appendChild(el);clearTimeout(window.__fxT);window.__fxT=setTimeout(()=>{el.remove()},12000)}
(function(){
 if(typeof document!=='undefined'&&!document.getElementById('p5gcss')){const s=document.createElement('style');s.id='p5gcss';s.textContent='#fxtoast{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;width:min(420px,calc(100vw - 32px));background:var(--card,#1c1c24);color:var(--fg,#eee);border:1px solid var(--gold,#d4a53a);border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.45;box-shadow:0 10px 30px rgba(0,0,0,.4);z-index:99998;display:flex;flex-direction:column;gap:2px}';document.head.appendChild(s)}
 const _eo=ACT.evopt;ACT.evopt=function(e){let snap=null,title='',choice='';try{snap=fxSnap();const m=document.getElementById('modal');const h=m&&m.querySelector('h2');title=h?h.textContent:'';const bt=e&&e.querySelector&&e.querySelector('b');choice=bt?bt.textContent:(e&&e.textContent)||''}catch(x){}
  _eo.apply(this,arguments);if(!snap)return;
  setTimeout(()=>{try{const now=fxSnap(),L=fxDiff(snap,now),lines=fxText(L,8);
   const nm=G.inbox&&G.inbox[0]&&G.inbox[0]!==snap.ib?G.inbox[0]:null;const txt=lines.join(' · ')||t('fx.none');
   if(nm&&!nm.e)nm.e=txt;else if(title){ibxPush('e',title,'',choice);G.inbox[0].e=txt}
   fxToast(title,lines);save()}catch(x){}},0)};
})();
if(typeof normTexts==='function')normTexts();
