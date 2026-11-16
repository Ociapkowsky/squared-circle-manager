function vStables(){
 const free=mine().filter(w=>!stableOf(w.id));
 let h='<div class="top"><div><h2>'+t('stb.title')+'</h2><div class="mute" style="max-width:66ch">'+t('stb.hint')+'</div></div></div>';
 if(!G.stables.length)h+='<div class="card mute">'+t('stb.none')+'</div>';
 h+='<div class="grid g2">'+G.stables.map(s=>{const ms=s.members.map(W).filter(Boolean);
  return '<div class="card stack"><div class="row spread"><div class="wname" style="font-size:19px">'+esc(s.name)+'</div><span class="tag">'+t('stb.pop',{n:Math.round(avg(ms.map(w=>w.pop)))})+'</span></div>'+
   ms.map(w=>'<div class="row spread" style="flex-wrap:nowrap">'+wMini(w,t('role.'+w.role).split(' ')[0]+' · '+t('style.'+w.style))+'<button class="btn sm" data-act="strem" data-id="'+w.id+'">'+t('stb.remove')+'</button></div>').join('')+
   (s.members.length<4&&free.length?'<div class="row"><select id="stadd-'+s.id+'" class="field" style="width:auto;max-width:100%">'+free.map(w=>'<option value="'+w.id+'">'+esc(w.name)+'</option>').join('')+'</select><button class="btn sm" data-act="stadd" data-id="'+s.id+'">'+t('stb.addmember')+'</button></div>':'')+
   '<div><button class="btn sm danger" data-act="stdisband" data-id="'+s.id+'">'+t('stb.disband')+'</button></div></div>'}).join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('stb.create')+'</h3><div><label class="px" for="stname">'+t('stb.name')+'</label><input id="stname" class="field" maxlength="24"></div><div class="px">'+t('stb.members')+'</div><div class="chk">'+
  mine().map(w=>'<label class="row" style="gap:6px;flex-wrap:nowrap"><input type="checkbox" name="smem" value="'+w.id+'"'+(stableOf(w.id)?' disabled':'')+'> <span style="min-width:0;overflow-wrap:anywhere">'+esc(w.name)+'</span> <span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span></label>').join('')+'</div>'+
  (G.stmsg?'<div class="note neg">'+t('stb.need')+'</div>':'')+'<div><button class="btn gold" data-act="stcreate">'+t('stb.create')+'</button></div></div>';
 return h;
}
const tdraft=()=>G.td||(G.td={name:'',teams:1,prestige:2,strap:STRAPS[1],plate:'gold'});
function vTitles(){
 let h='<div class="top"><h2>'+t('t.title')+'</h2></div><div class="grid g2">';
 G.titles.forEach(tt=>{h+='<div class="card stack"><div class="beltbox">'+belt(tt,230)+'</div><div class="row spread"><div class="wname" style="font-size:19px;color:var(--gold)">'+esc(titleName(tt))+'</div><span class="tag">'+t('t.kind'+tt.teams)+' · '+t('t.prestige')+' '+tt.prestige+'</span></div><div class="px">'+t('t.holder')+'</div>'+holdersHtml(tt)+(tt.holders.length?'<div class="note">'+t('t.since',{w:tt.since})+'</div>':'')+(tt.custom?'<div><button class="btn sm danger" data-act="tddelete" data-id="'+tt.id+'">'+t('t.delete')+'</button></div>':'')+'</div>'});
 h+='</div>';
 const d=tdraft();const pv={name:d.name||t('t.defaultname',{n:G.titles.length+1}),teams:d.teams,prestige:d.prestige,strap:d.strap,plate:d.plate,kind:'custom'};
 h+='<div class="card stack"><h3>'+t('t.create')+'</h3><div class="grid g2"><div class="stack"><div><label class="px" for="tdname">'+t('t.name')+'</label><input id="tdname" class="field" maxlength="30" value="'+esc(d.name)+'" data-chg="tdname"></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="tdteams">'+t('t.type')+'</label><select id="tdteams" class="field" data-chg="tdf" data-k="teams"><option value="1"'+(d.teams===1?' selected':'')+'>'+t('t.singles')+'</option><option value="2"'+(d.teams===2?' selected':'')+'>'+t('t.tagteam')+'</option></select></div>'+
  '<div><label class="px" for="tdpres">'+t('t.prestige')+'</label><select id="tdpres" class="field" data-chg="tdf" data-k="prestige">'+[1,2,3].map(n=>'<option value="'+n+'"'+(d.prestige===n?' selected':'')+'>'+n+'</option>').join('')+'</select></div></div>'+
  '<div class="px">'+t('t.strap')+'</div><div class="sw">'+STRAPS.map(c=>'<button class="sq'+(d.strap===c?' on':'')+'" style="background:'+c+'" data-act="tdset" data-k="strap" data-v="'+c+'" aria-label="'+c+'"></button>').join('')+'</div>'+
  '<div class="px">'+t('t.plate')+'</div><div class="sw">'+Object.keys(PLATE).map(k=>'<button class="txt'+(d.plate===k?' on':'')+'" data-act="tdset" data-k="plate" data-v="'+k+'">'+t('pl.'+k)+'</button>').join('')+'</div></div>'+
  '<div class="stack"><div class="px">'+t('t.preview')+'</div><div class="beltbox">'+belt(pv,250)+'</div><div><button class="btn gold" data-act="tdcreate">'+t('t.add')+'</button></div></div></div></div>';
 h+='<div class="card stack"><h3>'+t('t.hist')+'</h3>'+(G.reigns.length?'<div class="scroll"><table><tbody>'+G.reigns.slice(0,14).map(r=>'<tr><td class="mute">W'+r.week+'</td><td>'+esc(r.name)+'</td><td>'+esc(names(r.w))+'</td></tr>').join('')+'</tbody></table></div>':'<div class="mute">'+t('t.nohist')+'</div>')+'</div>';
 return h;
}
function vMoney(){
 const f=G.fed,T=tdNow(),last=G.hist[G.hist.length-1];
 let h='<div class="top"><h2>'+t('m.title')+'</h2></div>';
 h+='<div class="grid g3"><div class="card kpi"><div class="px">'+t('d.cash')+'</div><div class="v '+(f.cash<0?'neg':'')+'">'+money(f.cash)+'</div></div><div class="card kpi"><div class="px">'+t('m.income')+'</div><div class="v pos">'+(last?money(last.rev):'—')+'</div></div><div class="card kpi"><div class="px">'+t('m.costs')+'</div><div class="v neg">'+(last?money(last.cost):'—')+'</div></div></div>';
 if(last)h+='<div class="card"><div class="grid g2"><div class="stack"><div class="row spread"><span>'+t('m.gate')+'</span><b>'+money(last.gate)+'</b></div><div class="row spread"><span>'+t('m.merch')+'</span><b>'+money(last.merch)+'</b></div><div class="row spread"><span>'+t('m.tv')+'</span><b>'+money(last.tv)+'</b></div><div class="row spread"><span>'+t('m.spons')+'</span><b>'+money(last.spons)+'</b></div></div><div class="stack"><div class="row spread"><span>'+t('m.sal')+'</span><b>'+money(last.sal)+'</b></div><div class="row spread"><span>'+t('m.prod')+' ('+t('sh.stipcost')+')</span><b>'+money(last.prod)+'</b></div></div></div></div>';
 h+='<div class="card stack"><h3>'+t('m.hist')+'</h3>'+histChart()+'</div>';
 const rows=[70,85,100,115,130,150].map(p=>{const e=econAt(p,false);return{p,e,rev:e.gate+e.merch}});const best=rows.reduce((a,b)=>b.rev>a.rev?b:a).p;
 h+='<div class="grid g2"><div class="card stack"><label for="price">'+t('m.price',{n:G.price})+'</label><input id="price" type="range" min="60" max="160" step="5" value="'+G.price+'" data-chg="price"><div class="note">'+t('m.pricehelp')+'</div></div>';
 h+='<div class="card stack"><h3>'+t('m.estimate')+'</h3><div class="scroll"><table><thead><tr><th>'+t('m.estp')+'</th><th>'+t('m.esta')+'</th><th>'+t('m.estr')+'</th><th></th></tr></thead><tbody>'+rows.map(r=>'<tr'+(r.p===G.price?' style="background:var(--panel2)"':'')+'><td>'+r.p+'%</td><td>'+num(r.e.att)+' / '+num(T.cap)+'</td><td>'+money(r.rev)+'</td><td class="gold">'+(r.p===best?t('m.best'):'')+(r.e.sold?' · '+t('sh.sold'):'')+'</td></tr>').join('')+'</tbody></table></div></div></div>';
 h+='<div class="card stack">';
 if(f.tier<5){const nt=f.tier+1,ok=f.pop>=TPOP[f.tier]&&f.cash>=UPG[f.tier];
  h+='<h3>'+t('m.upgrade',{v:t('venue.'+nt)})+'</h3><div class="mute">'+t('d.cap',{n:num(TD[nt-1].cap)})+'</div><div class="mute">'+t('m.upneed',{p:TPOP[f.tier],c:money(UPG[f.tier])})+'</div><div><button class="btn gold" data-act="upgrade"'+(ok?'':' disabled')+'>'+t('m.upgrade',{v:t('venue.'+nt)})+'</button></div>'}
 else h+='<h3>'+t('venue.5')+'</h3><div class="mute">'+t('m.maxed')+'</div>';
 return h+'</div>';
}
function vWorld(){
 const fa=G.ws.filter(w=>w.fed==='FA').sort((a,b)=>b.pop-a.pop);const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 let h='<div class="top"><h2>'+t('w.title')+'</h2></div><div class="card stack"><h3>'+t('w.feds')+'</h3><div class="scroll"><table><tbody>'+allFeds().map((f,i)=>'<tr><td class="mute">'+(i+1)+'</td><td><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name)+(f.id===G.fed.id?' <span class="tag">'+t('nav.dash')+'</span>':'')+'</td><td>'+cn(f.country)+'</td><td>'+t('tier.'+f.tier)+'</td><td><div style="min-width:90px">'+bar(f.pop,f.id===G.fed.id?'':'b')+'</div></td><td>'+Math.round(f.pop)+'</td></tr>').join('')+'</tbody></table></div></div>';
 return h+'<h3>'+t('w.market')+'</h3><div class="grid gW">'+fa.map(w=>{const fee=salaryOf(w,G.fed.tier)*8;return wCard(w,'<div><button class="btn sm gold" data-act="sign" data-id="'+w.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('w.sign',{m:money(fee)})+'</button> <span class="mute" style="font-size:12px">'+(full?t('w.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>')}).join('')+'</div>';
}
function vSettings(){
 let h='<div class="top"><h2>'+t('s.title')+'</h2></div><div class="card stack"><b>'+t('s.lang')+'</b>'+langSwitch()+'</div>';
 h+='<div class="card stack"><h3>'+t('s.pack')+'</h3><div class="mute" style="max-width:70ch">'+t('s.packd')+'</div><label class="px" for="packout">'+t('s.export')+'</label><textarea id="packout" readonly>'+esc(packText())+'</textarea><div class="row"><button class="btn sm" data-act="copypack">'+t('s.copy')+'</button></div>'+
  '<label class="px" for="packin">'+t('s.import')+'</label><textarea id="packin"></textarea><div class="row"><input type="file" id="packfile" accept=".json,application/json" data-chg="packfile"><button class="btn gold" data-act="loadpack">'+t('s.load')+'</button><button class="btn" data-act="resetpack">'+t('s.reset')+'</button></div><div id="packmsg" class="mute"></div></div>';
 return h+'<div class="card stack"><b>'+t('s.new')+'</b>'+(G.confirmNew?'<div><button class="btn danger" data-act="newgame2">'+t('s.confirm')+'</button></div>':'<div><button class="btn danger" data-act="newgame">'+t('s.new')+'</button></div>')+'<div class="mute" style="font-size:13px">'+t('s.about')+'</div></div>';
}
function render(){
 if(!hasDoc)return;const app=document.getElementById('app');
 if(!G){app.innerHTML=viewStart();return}
 const V={dash:vDash,roster:vRoster,show:vShow,feuds:vFeuds,stables:vStables,titles:vTitles,money:vMoney,world:vWorld,settings:vSettings};
 app.innerHTML=shell(V[G.screen]());
}

/* ============ Events ============ */
function applyPack(txt){
 const msg=document.getElementById('packmsg');
 try{const p=JSON.parse(txt);if(!validPack(p)){msg.textContent=t('s.bad');return}
  PACK=p;try{localStorage.setItem(LS_PACK,JSON.stringify(p))}catch(x){}G=null;render()}catch(e){if(msg)msg.textContent=t('s.bad')}
}
const ACT={
 lang(e){lang=e.dataset.v;try{localStorage.setItem(LS_LANG,lang)}catch(x){}render()},
 nav(e){if(RUN)return;G.screen=e.dataset.v;G.showResult=false;render()},
 continue(){G=loadSave();render()},
 start(e){newGame(e.dataset.v);render()},
 custom(){newGame(null,{name:document.getElementById('cname').value,country:document.getElementById('ccountry').value});render()},
 rmslot(e){G.card.splice(+e.dataset.i,1);render()},
 addslot(){G.card.push(emptyMatch());render()},
 auto(){autoBook();render()},
 clearcard(){G.card=[];render()},
 skipweek(){skipWeek()},
 run(){const r=G.card.filter(matchReady);if(r.length<2||RUN)return;RUN={fast:false,started:false};G.showResult=false;render();runShow()},
 fast(){if(RUN)RUN.fast=true},
 done(){G.showResult=false;G.screen='dash';render()},
 evopt(e){if(window.__evResolve)window.__evResolve(+e.dataset.i)},
 gameover(){closeModal();try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;render()},
 renew(e){const w=W(e.dataset.id);const c=w.salary*10;if(G.fed.cash>=c){G.fed.cash-=c;w.contract=52;addNews('n.resign',{w:w.name});save();render()}},
 release(e){releaseW(W(e.dataset.id));save();render()},
 avedit(e){openModal(avEditor(e.dataset.id))},
 avclose(){closeModal();save();render()},
 avrand(e){const w=W(e.dataset.id);w.look=randLook(Math.random,w.country);document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 look(e){const w=W(e.dataset.id),k=e.dataset.k;w.look[k]=(k==='skin'||k==='hairC'||k==='outC'||k==='maskC')?+e.dataset.v:e.dataset.v;document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 newfeud(){
  const d=G.fd,r=fdSides(d);G.fdmsg='';
  if(!r)G.fdmsg=SC[d.sc].st?'f.nostables':'f.invalid';
  else if(r.err)G.fdmsg=r.err;
  else{const f={id:'f'+(G.uid++),sc:d.sc,A:r.A,B:r.B,stA:r.stA,stB:r.stB,heat:10,matches:0,used:false};
   if(!feudMode(f))G.fdmsg='f.nomode';
   else if(G.feuds.some(x=>inter(x.A,f.A).length&&inter(x.B,f.B).length===x.B.length&&x.B.length===f.B.length&&x.A.length===f.A.length))G.fdmsg='f.dup';
   else{G.feuds.push(f);addNews('n.feudstart',{a:sideLabel(f.A,f.stA),b:sideLabel(f.B,f.stB)});G.fd=fdDefaults(d.sc)}}
  save();render()},
 endfeud(e){G.feuds.splice(+e.dataset.i,1);save();render()},
 upgrade(){const f=G.fed;if(f.tier<5&&f.pop>=TPOP[f.tier]&&f.cash>=UPG[f.tier]){f.cash-=UPG[f.tier];f.tier++;addNews('n.tier',{v:t('venue.'+f.tier)});save();render()}},
 sign(e){const w=W(e.dataset.id);const fee=salaryOf(w,G.fed.tier)*8;if(mine().length>=ROSTERMAX[G.fed.tier-1]||G.fed.cash<fee)return;
  G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=52;w.acc=accStart(w.country,G.fed.country);w.morale=70;w.fatigue=0;addNews('n.sign',{w:w.name});save();render()},
 copypack(){const ta=document.getElementById('packout');ta.select();try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(x){}},
 loadpack(){applyPack(document.getElementById('packin').value)},
 resetpack(){PACK=buildPack();try{localStorage.removeItem(LS_PACK)}catch(x){}G=null;render()},
 newgame(){G.confirmNew=true;render()},
 newgame2(){try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;render()},
 stcreate(){
  const nm=(document.getElementById('stname').value||'').trim().slice(0,24);const ids=[].slice.call(document.querySelectorAll('input[name=smem]:checked')).map(x=>x.value);
  if(!nm||ids.length<2||ids.length>4){G.stmsg=1;render();return}
  G.stmsg=0;G.stables.push({id:'s'+(G.uid++),name:nm,members:ids});ids.forEach(i=>{W(i).morale=clamp(W(i).morale+3,0,100)});addNews('n.stnew',{s:nm});save();render()},
 stadd(e){const st=G.stables.find(s=>s.id===e.dataset.id),sel=document.getElementById('stadd-'+e.dataset.id);if(!st||!sel||!sel.value||st.members.length>=4||stableOf(sel.value))return;st.members.push(sel.value);save();render()},
 strem(e){removeFromStable(e.dataset.id);cleanFeuds();save();render()},
 stdisband(e){const st=G.stables.find(s=>s.id===e.dataset.id);if(st){G.stables=G.stables.filter(s=>s!==st);addNews('n.stdisband',{s:st.name});cleanFeuds()}save();render()},
 tdset(e){const d=tdraft();d[e.dataset.k]=e.dataset.v;render()},
 tdcreate(){const d=tdraft();const nm=(document.getElementById('tdname').value||d.name||'').trim().slice(0,30)||t('t.defaultname',{n:G.titles.length+1});
  G.titles.push({id:'T'+(G.uid++),kind:'custom',name:nm,prestige:d.prestige,teams:d.teams,strap:d.strap,plate:d.plate,holders:[],since:G.week,custom:true});G.td=null;save();render()},
 tddelete(e){G.titles=G.titles.filter(x=>x.id!==e.dataset.id);G.card.forEach(m=>{if(m.title===e.dataset.id)m.title=''});save();render()}
};
const CHG={
 sf(e){START_F=e.value;render()},
 sort(e){G.sort=e.value;render()},
 slot(e){G.card[+e.dataset.i][e.dataset.side][+e.dataset.j]=e.value;render()},
 winner(e){G.card[+e.dataset.i].winner=e.dataset.v;render()},
 fw(e){G.card[+e.dataset.i].fw=+e.dataset.v;render()},
 mode(e){const m=G.card[+e.dataset.i];m.mode=e.value;fixMatch(m);render()},
 stip(e){const m=G.card[+e.dataset.i];m.stip=e.value;fixMatch(m);render()},
 finish(e){G.card[+e.dataset.i].finish=e.value;render()},
 mtitle(e){G.card[+e.dataset.i].title=e.value;render()},
 price(e){G.price=+e.value;const l=e.previousElementSibling;if(l)l.textContent=t('m.price',{n:G.price});save()},
 packfile(e){const f=e.files&&e.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{document.getElementById('packin').value=String(r.result)};r.readAsText(f)},
 tdname(e){tdraft().name=e.value},
 tdf(e){const d=tdraft();d[e.dataset.k]=+e.value;render()},
 fd(e){
  const k=e.dataset.k,d=G.fd;G.fdmsg='';
  if(k==='sc'){G.fd=fdDefaults(e.value)}
  else if(k==='stA'){d.stA=e.value;const st=G.stables.find(s=>s.id===e.value);if(SC[d.sc].member)d.mem=st?st.members[st.members.length-1]:''}
  else if(k==='stB')d.stB=e.value;
  else if(k==='mem')d.mem=e.value;
  else{const side=k.charAt(0),idx=+k.slice(1);d[side][idx]=e.value}
  render()}
};
function init(){
 loadPackLS();
 document.addEventListener('click',ev=>{const el=ev.target.closest('[data-act]');if(!el||el.disabled)return;const fn=ACT[el.dataset.act];if(fn)fn(el)});
 document.addEventListener('change',ev=>{const el=ev.target.closest('[data-chg]');if(!el)return;const fn=CHG[el.dataset.chg];if(fn){fn(el);if(G&&el.dataset.chg!=='packfile'&&el.dataset.chg!=='sf')save()}});
 render();
}
if(hasDoc)init();
