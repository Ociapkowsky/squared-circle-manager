
/* ============ Views: prizes and tournaments ============ */
const pzd=()=>G.pzd||(G.pzd={name:'',kind:'case',plate:'black',target:'',life:52});
const trd=()=>G.trd||(G.trd={name:'',n:8,gen:'m',prize:'',seed:'pop'});
function prizeBits(m){
 let h='';const one=(p,lbl)=>'<div class="pbelt">'+prizeSvg(p,68)+'<div class="mute" style="font-size:12px">'+esc(lbl)+'</div></div>';
 if(m.stip==='prizematch'&&prizeOf(m.prize))h+=one(prizeOf(m.prize),t('pz.prizehd',{p:prizeName(prizeOf(m.prize))}));
 if(m.cash&&prizeOf(m.cash))h+=one(prizeOf(m.cash),t('pz.cashhd',{p:prizeName(prizeOf(m.cash))}));
 if(m.tour){const tr=(G.tours||[]).find(x=>x.id===m.tour.tid);if(tr)h+='<div class="pbelt"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+esc(t('tr.tag',{t:tr.name,r:' · '+tourRoundName(tr,m.tour.r)}))+'</span></div>'}
 return h}
function prizeRow(m,i){
 let h='';
 if(m.stip==='prizematch')h+='<div><div class="px">'+t('pz.row.prize')+'</div><select data-chg="mprize" data-i="'+i+'">'+(G.prizes||[]).map(p=>'<option value="'+p.id+'"'+(m.prize===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>';
 const co=cashOpts(m);
 if(co.length)h+='<div><div class="px">'+t('pz.row.cash')+'</div><select data-chg="mcash" data-i="'+i+'"><option value="">'+t('pz.row.nocash')+'</option>'+co.map(p=>'<option value="'+p.id+'"'+(m.cash===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>';
 return h}
function pzCard(p){
 const h=W(p.holder),left=p.exp?Math.max(0,p.exp-G.week):0,tt=p.target?titleOf(p.target):null;
 let s='<div class="card stack"><div class="beltbox">'+prizeSvg(p,130)+'</div><div class="row spread"><div class="wname" style="font-size:18px;color:var(--gold)">'+esc(prizeName(p))+'</div><span class="tag">'+t('pz.k.'+p.kind)+' · '+t(isOpp(p.kind)?'pz.cls.opp':'pz.cls.trophy')+'</span></div>';
 if(isOpp(p.kind))s+='<div class="mute" style="font-size:13px">'+(tt?t('pz.target',{t:titleName(tt)}):t('pz.target.any'))+' · '+(p.life?t('pz.life',{n:wks(p.life)}):t('pz.never'))+'</div>';
 s+='<div class="px">'+t('pz.holder')+'</div>'+(h?wMini(h):'<span class="tag" style="align-self:flex-start">'+t('pz.vacant')+'</span>')+(h?'<div class="note">'+t('pz.since',{w:p.since})+(p.exp?' · '+t('pz.exp',{n:wks(left)}):'')+'</div>':'');
 s+='<div class="row"><button class="btn sm gold" data-act="pzmatch" data-id="'+p.id+'">'+t('pz.btn.match')+'</button>'+(h&&isOpp(p.kind)?'<button class="btn sm" data-act="pzcash" data-id="'+p.id+'">'+t('pz.btn.cash')+'</button>':'')+(p.id!=='pzb'&&p.id!=='pzc'?'<button class="btn sm danger" data-act="pzdel" data-id="'+p.id+'">'+t('pz.btn.del')+'</button>':'')+'</div></div>';
 return s}
function tourView(tr){
 const rn=Math.log2(tr.n);let cols='';
 for(let r=0;r<rn;r++){const R=tr.rounds[r],cnt=tr.n>>(r+1);
  cols+='<div class="bround"><div class="px">'+(R?tourRoundName(tr,r):(cnt===1?t('tr.final'):cnt===2?t('tr.semi'):cnt===4?t('tr.quarter'):t('tr.round',{n:r+1})))+'</div>';
  for(let i=0;i<cnt;i++){const mt=R&&R[i];
   if(!mt){cols+='<div class="bm mute"><div>?</div><div>?</div></div>';continue}
   const nm=id=>W(id)?esc(W(id).name):'?',cur=!tr.done&&r===tr.r&&!mt.w;
   const a=W(mt.a),b=W(mt.b),can=cur&&a&&b&&!a.injury&&!b.injury&&!tourOnCard(tr,i);
   cols+='<div class="bm"><div class="'+(mt.w===mt.a?'win':'')+'">'+nm(mt.a)+(a&&a.injury?' <span class="tag inj">'+t('tr.inj')+'</span>':'')+'</div><div class="'+(mt.w===mt.b?'win':'')+'">'+nm(mt.b)+(b&&b.injury?' <span class="tag inj">'+t('tr.inj')+'</span>':'')+'</div>'+
    (cur?'<div class="row" style="gap:4px"><button class="btn sm" data-act="tradd" data-id="'+tr.id+'" data-i="'+i+'"'+(can&&G.card.length<6?'':' disabled')+'>'+(tourOnCard(tr,i)?t('tr.onshow'):t('tr.addm'))+'</button><button class="btn sm" data-act="trwo" data-id="'+tr.id+'" data-i="'+i+'" data-s="a" title="'+t('tr.wo',{w:a?esc(a.name):'?'})+'">◀</button><button class="btn sm" data-act="trwo" data-id="'+tr.id+'" data-i="'+i+'" data-s="b" title="'+t('tr.wo',{w:b?esc(b.name):'?'})+'">▶</button></div>':'')+'</div>'}
  cols+='</div>'}
 const pz=tr.prize?prizeOf(tr.prize):null,wn=tr.done&&W(tr.winner)?W(tr.winner):null;
 return '<div class="card stack"><div class="row spread"><div class="row" style="gap:10px">'+(pz?prizeSvg(pz,56):'')+'<div><div class="wname" style="font-size:18px;color:var(--gold)">'+esc(tr.name)+'</div><div class="mute" style="font-size:13px">'+t('tr.size',{n:tr.n})+' · '+t('g.'+tr.gen)+(pz?' · '+esc(prizeName(pz)):'')+'</div></div></div>'+(tr.done?'<span class="tag" style="color:var(--teal);border-color:var(--teal)">'+t('tr.done')+(wn?' · '+esc(wn.name):'')+'</span>':'<button class="btn sm" data-act="tradda" data-id="'+tr.id+'"'+(G.card.length>=6?' disabled':'')+'>'+t('tr.addround')+'</button>')+'</div><div class="bracket">'+cols+'</div></div>'}
function vPrizes(){
 const d=pzd(),td=trd();
 let h='<div class="top"><div><h2>'+t('pz.title')+'</h2><div class="mute" style="max-width:70ch">'+t('pz.sub')+'</div></div></div>';
 if(G.pzmsg)h+='<div class="note neg">'+t(G.pzmsg)+'</div>';
 h+='<div class="grid g3">'+(G.prizes||[]).map(pzCard).join('')+'</div>';
 const pv={kind:d.kind,plate:d.plate,name:d.name};
 h+='<div class="card stack"><h3>'+t('pz.create')+'</h3><div class="grid g2"><div class="stack"><div><label class="px" for="pzname">'+t('pz.name')+'</label><input id="pzname" class="field" maxlength="30" value="'+esc(d.name)+'" data-chg="pzname"></div>'+
  '<div class="px">'+t('pz.kindlbl')+'</div><div class="sw">'+PKINDS.map(k=>'<button class="txt'+(d.kind===k?' on':'')+'" data-act="pzset" data-k="kind" data-v="'+k+'">'+t('pz.k.'+k)+'</button>').join('')+'</div>'+
  '<div class="px">'+t('t.plate')+'</div><div class="sw">'+Object.keys(PLATE).map(k=>'<button class="txt'+(d.plate===k?' on':'')+'" data-act="pzset" data-k="plate" data-v="'+k+'">'+t('pl.'+k)+'</button>').join('')+'</div>'+
  (isOpp(d.kind)?'<div class="grid g2" style="gap:8px"><div><label class="px" for="pztarget">'+t('pz.targetlbl')+'</label><select id="pztarget" class="field" data-chg="pzf" data-k="target"><option value="">'+t('pz.target.any')+'</option>'+G.titles.filter(x=>x.teams===1).map(x=>'<option value="'+x.id+'"'+(d.target===x.id?' selected':'')+'>'+esc(titleName(x))+'</option>').join('')+'</select></div>'+
   '<div><label class="px" for="pzlife">'+t('pz.lifelbl')+'</label><select id="pzlife" class="field" data-chg="pzf" data-k="life">'+[0,26,52].map(n=>'<option value="'+n+'"'+(+d.life===n?' selected':'')+'>'+(n?wks(n):t('pz.never'))+'</option>').join('')+'</select></div></div>':'')+
  '</div><div class="stack"><div class="px">'+t('t.preview')+'</div><div class="beltbox">'+prizeSvg(pv,150)+'</div><div><button class="btn gold" data-act="pzcreate">'+t('pz.add')+'</button></div></div></div></div>';
 h+='<h3>'+t('tr.title')+'</h3>';
 const tours=G.tours||[];h+=tours.length?tours.map(tourView).join(''):'<p class="mute">'+t('tr.none')+'</p>';
 const need=healthy().filter(w=>td.gen==='x'||((td.gen==='f')===isF(w.id))).length;
 h+='<div class="card stack"><h3>'+t('tr.create')+'</h3><div class="grid g2"><div class="stack"><div><label class="px" for="trname">'+t('pz.name')+'</label><input id="trname" class="field" maxlength="30" value="'+esc(td.name)+'" data-chg="trname"></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="trn">'+t('tr.sizelbl')+'</label><select id="trn" class="field" data-chg="trf" data-k="n">'+TSIZES.map(n=>'<option value="'+n+'"'+(td.n===n?' selected':'')+'>'+n+'</option>').join('')+'</select></div>'+
  '<div><label class="px" for="trg">'+t('g.div')+'</label><select id="trg" class="field" data-chg="trf" data-k="gen">'+['m','f','x'].map(k=>'<option value="'+k+'"'+(td.gen===k?' selected':'')+'>'+t('g.'+k)+'</option>').join('')+'</select></div></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="trp">'+t('tr.prize')+'</label><select id="trp" class="field" data-chg="trf" data-k="prize"><option value="">'+t('tr.noprize')+'</option>'+(G.prizes||[]).map(p=>'<option value="'+p.id+'"'+(td.prize===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>'+
  '<div><label class="px" for="trs">'+t('tr.seed')+'</label><select id="trs" class="field" data-chg="trf" data-k="seed"><option value="pop"'+(td.seed==='pop'?' selected':'')+'>'+t('tr.seed.pop')+'</option><option value="rand"'+(td.seed==='rand'?' selected':'')+'>'+t('tr.seed.rand')+'</option></select></div></div></div>'+
  '<div class="stack"><div class="mute">'+t('tr.need',{n:need,m:td.n})+'</div><div><button class="btn gold" data-act="trcreate"'+(need<td.n||tours.filter(x=>!x.done).length>=2?' disabled':'')+'>'+t('tr.start')+'</button></div>'+(tours.filter(x=>!x.done).length>=2?'<div class="note neg">'+t('tr.max')+'</div>':'')+'</div></div></div>';
 return h}
Object.assign(ACT,{
 pzset(e){pzd()[e.dataset.k]=e.dataset.v;render()},
 pzcreate(){const d=pzd(),nm=(document.getElementById('pzname').value||d.name||'').trim().slice(0,30);
  G.prizes.push({id:'P'+(G.uid++),kind:d.kind,name:nm||null,plate:d.plate,target:isOpp(d.kind)?d.target:'',life:isOpp(d.kind)?+d.life:0,holder:'',since:0,exp:0,wins:0,custom:true});G.pzd=null;save();render()},
 pzdel(e){G.prizes=G.prizes.filter(p=>p.id!==e.dataset.id);G.card.forEach(m=>fixMatch(m));save();render()},
 pzmatch(e){const p=prizeOf(e.dataset.id);if(!p)return;G.pzmsg='';
  const u=usedIds(-1),pool=healthy().filter(w=>!u.has(w.id)&&!w.ext).sort((a,b)=>b.pop-a.pop);
  const n=Math.min(6,pool.length);if(n<3||G.card.length>=6){G.pzmsg='pz.msg.nomatch';render();return}
  const m=emptyMatch();m.mode=n+'way';if(!MODES[m.mode]){render();return}
  pool.slice(0,n).forEach((w,i)=>{m.a[i]=w.id});m.stip='prizematch';m.prize=p.id;m.finish='clean';fixMatch(m);G.card.push(m);G.screen='show';save();render()},
 pzcash(e){const p=prizeOf(e.dataset.id);if(!p||!p.holder)return;G.pzmsg='';
  const tts=G.titles.filter(x=>x.teams===1&&x.holders.length===1&&x.holders[0]!==p.holder&&genderOK(x,[p.holder])&&(!p.target||p.target===x.id)).sort((a,b)=>prestOf(b)-prestOf(a));
  const tt=tts[0],u=usedIds(-1);
  if(!tt||G.card.length>=6||u.has(p.holder)){G.pzmsg='pz.msg.nocash';render();return}
  const m=emptyMatch();m.mode='1v1';m.a[0]=p.holder;m.b[0]=tt.holders[0];m.title=tt.id;m.cash=p.id;m.finish='clean';fixMatch(m);G.card.push(m);G.screen='show';save();render()},
 trcreate(){const d=trd();if((G.tours||[]).filter(x=>!x.done).length>=2)return;
  const nm=(document.getElementById('trname').value||d.name||'').trim().slice(0,30)||t('tr.defname',{n:(G.tours||[]).length+1});
  const tr=mkTour({name:nm,n:d.n,gen:d.gen,prize:d.prize,seed:d.seed});if(!tr)return;G.tours.push(tr);G.trd=null;addNews('n.tourstart',{t:nm});save();render()},
 tradd(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done||G.card.length>=6)return;const m=tourMatch(tr,+e.dataset.i);if(!m)return;G.card.push(m);save();render()},
 tradda(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done)return;for(let i=0;i<tr.rounds[tr.r].length;i++){if(G.card.length>=6)break;const m=tourMatch(tr,i);if(m)G.card.push(m)}save();render()},
 trwo(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done)return;tourWO(tr,tr.r,+e.dataset.i,e.dataset.s);G.card.forEach(fixMatch);save();render()}
});
Object.assign(CHG,{
 pzname(e){pzd().name=e.value},pzf(e){pzd()[e.dataset.k]=e.dataset.k==='life'?+e.value:e.value;render()},
 trname(e){trd().name=e.value},trf(e){const d=trd();d[e.dataset.k]=e.dataset.k==='n'?+e.value:e.value;render()},
 mprize(e){const m=G.card[+e.dataset.i];m.prize=e.value;render()},
 mcash(e){const m=G.card[+e.dataset.i];m.cash=e.value;fixMatch(m);render()}
});
