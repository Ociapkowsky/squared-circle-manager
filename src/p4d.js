
/* ============ Views: staff, guests, legends, retirement ============ */
const spcT=k=>t('spec.'+k);
function staffCard(s,mode){
 const fee=s.salary*4,full=staffFull(s.role);
 let b='';
 if(mode==='hired'){const rc=s.salary*6;
  b='<div class="row"><button class="btn sm" data-act="renewstaff" data-id="'+s.id+'"'+(G.fed.cash<rc?' disabled':'')+'>'+t('r.renew')+' ('+money(rc)+')</button><button class="btn sm danger" data-act="firestaff" data-id="'+s.id+'">'+t('r.release')+'</button>'+(s.role==='scout'?'<button class="btn sm" data-act="scoutreg" data-id="'+s.id+'">'+t('reg.chg')+'</button>':'')+'</div>'}
 else b='<div class="row"><button class="btn sm gold" data-act="hirestaff" data-id="'+s.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('stf.hire',{m:money(fee)})+'</button><span class="mute" style="font-size:12px">'+(full?t('stf.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>';
 return '<div class="card wcard"><div class="av">'+avatar(s.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(s.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(s.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag">'+t('sr.'+s.role)+'</span>'+(s.role==='coach'?'<span class="tag">'+spcT(s.spec)+'</span>':'')+(s.role==='scout'?'<span class="tag">'+t('reg.'+(s.reg||'eu'))+'</span>':'')+'<span class="tag">'+cn(s.country)+'</span>'+(s.legend?'<span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('lg.tag')+'</span>':'')+(s.temp?'<span class="tag">'+t('stf.temp')+'</span>':'')+'</div></div>'+
  stat(t('stf.lvl'),s.lvl,s.lvl>=70?'t':'')+'<div class="mute" style="font-size:13px">'+t('st.age',{n:s.age})+' · '+t('st.salary',{m:money(s.salary)})+(mode==='hired'?' · '+t('st.contract',{n:wks(Math.max(0,s.contract))}):'')+'</div>'+b+'</div></div>'}
function guestCard(g,mode){
 let b='';const cc=celebCost(g),cdis=G.fed.cash<cc||mine().length>=ROSTERMAX[G.fed.tier-1];
 if(mode==='hired'){b='<div class="row"><button class="btn sm gold" data-act="gpromo" data-id="'+g.id+'">'+t('gs.addpromo')+'</button><button class="btn sm danger" data-act="dropguest" data-id="'+g.id+'">'+t('gs.release')+'</button></div>'}
 else{const full=guestFull();b='<div class="row">'+[1,4,12].map(n=>{const p=guestFee(g,n);return '<button class="btn sm" data-act="hireguest" data-id="'+g.id+'" data-w="'+n+'"'+(full||G.fed.cash<p?' disabled':'')+'>'+t('gs.for'+n,{m:money(p)})+'</button>'}).join('')+'</div>'+(full?'<span class="mute" style="font-size:12px">'+t('gs.full')+'</span>':'')}
 b+='<div class="row"><button class="btn sm" data-act="celebsign" data-id="'+g.id+'"'+(cdis?' disabled':'')+'>'+t('gs.convert',{m:money(cc)})+'</button></div>';
 const x=g.film?t('gs.film',{f:g.film}):g.hit?t('gs.hit',{f:g.hit}):'';
 return '<div class="card wcard"><div class="av">'+avatar(g.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(g.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(g.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag" style="color:var(--gold);border-color:var(--gold)">'+catLabel(g)+'</span><span class="tag">'+cn(g.country)+'</span></div></div>'+
  stat(t('gs.fame'),g.fame,'')+'<div class="sg">'+stat(t('st.mic'),g.mic,'b')+stat(t('st.cha'),g.cha,'t')+stat(t('st.ring'),g.ring,'')+'</div>'+(x?'<div class="mute" style="font-size:13px">'+esc(x)+'</div>':'')+
  (mode==='hired'?'<div class="mute" style="font-size:13px">'+t('st.contract',{n:wks(Math.max(0,g.contract))})+' · '+t('gs.apps',{n:g.apps||0})+(g.injury?' · '+t('r.inj',{n:g.injury}):'')+'</div>':'')+b+'</div></div>'}
function legendCard(w){
 return '<div class="card wcard"><div class="av">'+avatar(w.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(w.name)+'</div><div class="row" style="gap:6px;margin-top:3px"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('lg.tag')+'</span><span class="tag">'+cn(w.country)+'</span><span class="tag">'+t('style.'+w.style)+'</span></div></div>'+
  '<div class="mute" style="font-size:13px">'+t('st.age',{n:w.age})+' · '+t('st.pop')+' '+Math.round(w.pop)+'</div>'+
  RETR.map(r=>{const l=clamp(staffFit(w,r)+(w.pop>=50?4:0),15,96),fee=staffSal(r,l,G.fed.tier)*4,dis=staffFull(r)||G.fed.cash<fee;
   return '<button class="btn sm" data-act="hirelegend" data-id="'+w.id+'" data-r="'+r+'"'+(dis?' disabled':'')+'>'+t('sr.'+r)+' · '+t('stf.lvl')+' '+l+' · '+money(fee)+'</button>'}).join('')+'</div></div>'}
function staffFxBox(){
 const f=sfx(),cf=coachFx(),cs=staffOf('coach'),tr=G.fed.tier-1;
 const cap=cs.reduce((s,c)=>s+3+Math.floor(c.lvl/25),0);
 const box=(h,b,s)=>'<div class="card kpi"><div class="px">'+h+'</div><div class="v" style="font-size:20px">'+b+'</div><div class="s">'+s+'</div></div>';
 return '<div class="grid g4">'+
  box(t('sr.coach'),staffOf('coach').length+' / '+SMAX.coach[tr],t('stf.fx.coach',{n:Math.min(cap,mine().length),p:Math.round(cf.p*100)}))+
  box(t('sr.ref'),staffOf('ref').length+' / '+SMAX.ref[tr],t('stf.fx.ref',{n:(f.ref>=0?'+':'')+f2(f.ref)}))+
  box(t('sr.comm'),staffOf('comm').length+' / '+SMAX.comm[tr],t('stf.fx.comm',{n:(f.comm>=0?'+':'')+f2(f.comm)}))+
  box(t('sr.ann'),staffOf('ann').length+' / '+SMAX.ann[tr],t('stf.fx.ann',{n:Math.round(f.ann*10)}))+
  box(t('sr.scout'),staffOf('scout').length+' / '+SMAX.scout[tr],t('stf.fx.scout',{n:Math.round(staffOf('scout').reduce((p,s)=>p*(1-(.05+.12*s.lvl/100)),1)*-100+100)}))+
  box(t('sr.doc'),staffOf('doc').length+' / '+SMAX.doc[tr],t('stf.fx.doc',{n:Math.round(docChance()*1000)/10}))+
  box(t('sr.phys'),staffOf('phys').length+' / '+SMAX.phys[tr],t('stf.fx.phys',{n:Math.round((1-physMul())*100)}))+'</div>'}
function vStaff(){
 const tab=G.stTab||'staff';
 let h='<div class="top"><div><h2>'+t('stf.title')+'</h2><div class="mute" style="max-width:64ch">'+t('stf.sub')+'</div></div><div class="row">'+['staff','guests','legends'].map(k=>'<button class="btn sm'+(tab===k?' gold':'')+'" data-act="sttab" data-v="'+k+'">'+t('stf.tab.'+k)+'</button>').join('')+'</div></div>';
 if(tab==='staff'){
  h+=staffFxBox();
  SROLES.forEach(r=>{
   const hired=staffOf(r),cand=(G.smarket||[]).filter(s=>s.role===r);
   h+='<h3>'+t('sr.'+r)+' · '+hired.length+' / '+SMAX[r][G.fed.tier-1]+'</h3><div class="mute" style="font-size:13px;max-width:70ch">'+t('stf.d.'+r)+'</div>';
   if(hired.length)h+='<div class="grid gW">'+hired.map(s=>staffCard(s,'hired')).join('')+'</div>';
   h+='<div class="px">'+t('stf.market')+'</div><div class="grid gW">'+cand.map(s=>staffCard(s,'cand')).join('')+'</div>'});
  return h}
 if(tab==='guests'){
  const hg=guestsHired();
  h+='<div class="card stack"><div class="mute" style="max-width:72ch">'+t('gs.sub')+'</div><div class="row"><span class="tag">'+t('gs.cap',{n:hg.length,m:GCAPS[G.fed.tier-1]})+'</span><span class="tag">'+t('gs.disc',{n:Math.round(celebDisc()*100)})+'</span></div><div class="mute" style="max-width:72ch;font-size:13px">'+t('gs.convd')+'</div></div>';
  h+='<h3>'+t('gs.hired')+'</h3>'+(hg.length?'<div class="grid gW">'+hg.map(g=>guestCard(g,'hired')).join('')+'</div>':'<p class="mute">'+t('gs.none')+'</p>');
  h+='<h3>'+t('gs.market')+'</h3><div class="mute" style="font-size:13px">'+t('gs.marketd')+'</div><div class="grid gW">'+(G.gmarket||[]).map(g=>guestCard(g,'cand')).join('')+'</div>';
  return h}
 const L=legends().sort((a,b)=>b.pop-a.pop);
 h+='<div class="card"><div class="mute" style="max-width:72ch">'+t('lg.sub')+'</div></div>';
 return h+(L.length?'<div class="grid gW">'+L.map(legendCard).join('')+'</div>':'<p class="mute">'+t('lg.none')+'</p>')}
function guestChips(){
 const hg=guestsHired().filter(g=>!g.injury);if(!hg.length)return '';
 return '<div class="card stack"><div class="px">'+t('gs.onshow')+'</div><div class="row">'+hg.map(g=>'<div class="row" style="gap:8px;flex-wrap:nowrap"><div class="av" style="min-width:36px;padding:2px">'+avatar(g.look,34)+'</div><div><b>'+esc(g.name)+'</b> <span class="tag">'+catLabel(g)+'</span></div><button class="btn sm" data-act="gpromo" data-id="'+g.id+'">'+t('gs.addpromo')+'</button></div>').join('')+'</div><div class="mute" style="font-size:13px">'+t('gs.hint')+'</div></div>'}
function sumExtra(s){
 const l=[];
 if(s.guests&&s.guests.length)l.push(t('sum.guests',{n:s.guests.join(', ')}));
 if(s.fwn)l.push(t('sum.farewell',{n:s.fwn}));
 const f=s.sfx;if(f&&(Math.abs(f.ref)>.005||Math.abs(f.comm)>.005||f.ann>.005))l.push(t('sum.staff',{c:f2(f.comm+f.ann*.08),r:f2(f.ref),a:Math.round(f.ann*10)}));
 return l.length?'<div class="card stack">'+l.map(x=>'<div class="mute">'+esc(x)+'</div>').join('')+'</div>':''}

/* ----- retirement modal ----- */
function retModal(){
 const r=G.ret,w=W(r.id);if(!w)return '';
 const fp=r.msg?'<p class="mute">'+esc(r.msg)+'</p>':'';
 if(r.counter){const c=r.counter;
  return '<h2>'+esc(w.name)+'</h2>'+fp+'<div class="stack"><button class="opt" data-act="retacc"><b>'+t('rt.acc')+'</b><small>'+t('rt.w'+c.weeks)+' · '+(c.role?t('sr.'+c.role):t('rt.norole'))+'</small></button><button class="opt" data-act="retrej"><b>'+t('rt.rej')+'</b></button></div>'}
 if(r.done)return '<h2>'+esc(w.name)+'</h2>'+fp+'<button class="btn gold" data-act="retclose">OK</button>';
 return '<h2>'+t('rt.title',{w:esc(w.name)})+'</h2><p class="mute">'+t('rt.intro',{p:Math.round(retireWill(w)*100)})+'</p>'+
  '<label class="px" for="retw">'+t('rt.when')+'</label><select id="retw" class="field" data-chg="retw">'+FW_OPTS.map(n=>'<option value="'+n+'"'+(r.weeks===n?' selected':'')+'>'+t('rt.w'+n)+'</option>').join('')+'</select>'+
  '<label class="px" for="retr">'+t('rt.role')+'</label><select id="retr" class="field" data-chg="retr"><option value="">'+t('rt.norole')+'</option>'+RETR.map(x=>'<option value="'+x+'"'+(r.role===x?' selected':'')+(staffFull(x)?' disabled':'')+'>'+t('sr.'+x)+' · '+t('stf.fit',{n:staffFit(w,x)})+(staffFull(x)?' · '+t('stf.full'):'')+'</option>').join('')+'</select>'+
  '<div class="row"><button class="btn gold" data-act="retsend">'+t('rt.send')+'</button><button class="btn" data-act="mclose">'+t('rt.cancel')+'</button></div>'}
const retRefresh=()=>{document.getElementById('modal').firstChild.innerHTML=retModal()};

Object.assign(ACT,{
 celebsign(e){const g=W(e.dataset.id)||(G.gmarket||[]).find(x=>x.id===e.dataset.id);if(!g||!g.ext||mine().length>=ROSTERMAX[G.fed.tier-1]||G.fed.cash<celebCost(g))return;celebSign(g);save();render()},
 sttab(e){G.stTab=e.dataset.v;render()},
 hirestaff(e){const s=(G.smarket||[]).find(x=>x.id===e.dataset.id);if(!s||staffFull(s.role))return;const fee=s.salary*4;if(G.fed.cash<fee)return;
  G.fed.cash-=fee;G.smarket=G.smarket.filter(x=>x!==s);G.staff.push(s);addNews('n.staffhire',{w:s.name,r:t('sr.'+s.role)});save();render()},
 firestaff(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;G.staff=G.staff.filter(x=>x!==s);addNews('n.stafffire',{w:s.name});save();render()},
 renewstaff(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;const c=s.salary*6;if(G.fed.cash<c)return;G.fed.cash-=c;s.contract=52;s.temp=false;save();render()},
 hirelegend(e){const w=W(e.dataset.id),r=e.dataset.r;if(!w||w.fed!=='RET'||w.staffed||staffFull(r))return;
  const l=clamp(staffFit(w,r)+(w.pop>=50?4:0),15,96),fee=staffSal(r,l,G.fed.tier)*4;if(G.fed.cash<fee)return;
  G.fed.cash-=fee;toStaff(w,r);addNews('n.staffhire',{w:w.name,r:t('sr.'+r)});save();render()},
 hireguest(e){const g=(G.gmarket||[]).find(x=>x.id===e.dataset.id),n=+e.dataset.w;if(!g||guestFull())return;const p=guestFee(g,n);if(G.fed.cash<p)return;hireGuest(g,n,p);save();render()},
 dropguest(e){const g=W(e.dataset.id);if(!g||!g.ext)return;dropGuest(g);addNews('n.guestend',{w:g.name});save();render()},
 gpromo(e){if(G.promos.length>=4){G.shmsg='sh.promoMax';G.screen='show';render();return}G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:e.dataset.id,b:'',at:Math.max(0,G.card.length-1)});G.screen='show';save();render()},
 retire(e){const w=W(e.dataset.id);if(!w)return;G.ret={id:w.id,weeks:4,role:'',msg:'',counter:null,done:false};openModal(retModal())},
 retsend(){const r=G.ret,w=W(r.id);if(!w)return;
  const a=retAnswer(w,r.weeks,r.role);
  if(a.res==='ok'){startFarewell(w,a.weeks,a.role);closeModal();G.ret=null;save();render()}
  else if(a.res==='no'){w.morale=clamp(w.morale-6,0,100);w.retCD=G.week+8;r.msg=t('rt.no',{w:w.name});r.done=true;retRefresh();render()}
  else{r.counter={weeks:a.weeks,role:a.role};r.msg=t(a.why==='role'?'rt.counter.role':'rt.counter.time',{w:w.name});retRefresh()}},
 retacc(){const r=G.ret,w=W(r.id),c=r.counter;if(!w)return;startFarewell(w,c.weeks,c.role);closeModal();G.ret=null;save();render()},
 retrej(){const r=G.ret,w=W(r.id);if(w){w.morale=clamp(w.morale-3,0,100);w.retCD=G.week+6}r.counter=null;r.msg=t('rt.rejected',{w:w?w.name:''});r.done=true;retRefresh();render()},
 retclose(){closeModal();G.ret=null},
 cancelfw(e){const w=W(e.dataset.id);if(!w||!w.farewell)return;delete w.farewell;w.morale=clamp(w.morale-4,0,100);addNews('n.unretire',{w:w.name});save();render()}
});
Object.assign(CHG,{
 retw(e){G.ret.weeks=+e.value},
 retr(e){G.ret.role=e.value}
});

/* ----- belt designer and match poster ----- */
const ACC2=['#f2c94c','#ffffff','#b8b8b8','#13a89e','#f5d130','#d4213d'].concat(STRAPS.slice(0,4));
function tdraft(){const d=G.td||(G.td=Object.assign({},BPRESETS.classic,{name:'',teams:1,prestige:3,g:'m',strap:STRAPS[1]}));BELTKEYS.forEach(k=>{if(d[k]===undefined)d[k]=BPRESETS.classic[k]});return d}
function tdCreator(){
 const d=tdraft();
 const btn=(k,list,lab)=>'<div class="px">'+t('t.o.'+k)+'</div><div class="sw">'+list.map(v=>'<button class="txt'+(String(d[k])===String(v)?' on':'')+'" data-act="tdset" data-k="'+k+'" data-v="'+v+'">'+(lab?t(lab+v):v)+'</button>').join('')+'</div>';
 const sw=(k,list,lbl)=>'<div class="px">'+lbl+'</div><div class="sw">'+list.map(c=>'<button class="sq'+(d[k]===c?' on':'')+'" style="background:'+c+'" data-act="tdset" data-k="'+k+'" data-v="'+c+'" aria-label="'+c+'"></button>').join('')+'</div>';
 const pv=Object.assign({},d,{name:d.name||t('t.defaultname',{n:G.titles.length+1}),kind:'custom'});
 const needFlag=d.mainEmb==='flag'||d.sideEmb==='flag';
 return '<div class="card stack"><h3>'+t('t.create')+'</h3><div class="grid g2"><div class="stack">'+
  '<div class="px">'+t('t.preset')+'</div><div class="sw">'+BPRESET_IDS.map(k=>'<button class="txt" data-act="tdpreset" data-v="'+k+'">'+t('bp.'+k)+'</button>').join('')+'</div>'+
  '<div><label class="px" for="tdname">'+t('t.name')+'</label><input id="tdname" class="field" maxlength="30" value="'+esc(d.name)+'" data-chg="tdname"></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="tdteams">'+t('t.type')+'</label><select id="tdteams" class="field" data-chg="tdf" data-k="teams"><option value="1"'+(d.teams===1?' selected':'')+'>'+t('t.singles')+'</option><option value="2"'+(d.teams===2?' selected':'')+'>'+t('t.tagteam')+'</option></select></div>'+
  '<div><label class="px" for="tdpres">'+t('t.prestige')+'</label><select id="tdpres" class="field" data-chg="tdf" data-k="prestige">'+[1,2,3,4,5].map(n=>'<option value="'+n+'"'+(d.prestige===n?' selected':'')+'>'+n+'</option>').join('')+'</select></div></div>'+
  '<div class="px">'+t('g.div')+'</div><div class="sw">'+['m','f','x'].map(k=>'<button class="txt'+((d.g||'m')===k?' on':'')+'" data-act="tdset" data-k="g" data-v="'+k+'">'+t('g.'+k)+'</button>').join('')+'</div>'+
  sw('strap',STRAPS,t('t.strap'))+btn('pat',BPATS,'bpat.')+sw('strap2',ACC2,t('t.o.strap2'))+
  '<div class="px">'+t('t.plate')+'</div><div class="sw">'+Object.keys(PLATE).map(k=>'<button class="txt'+(d.plate===k?' on':'')+'" data-act="tdset" data-k="plate" data-v="'+k+'">'+t('pl.'+k)+'</button>').join('')+'</div>'+
  btn('mainShape',BSHAPES,'bsh.')+btn('mainEmb',BEMBS,'bem.')+btn('sideN',[0,1,2,3])+btn('sideShape',SSHAPES,'bsh.')+btn('sideEmb',SEMBS,'sem.')+
  (needFlag?'<div><label class="px" for="tdflag">'+t('t.o.flag')+'</label><select id="tdflag" class="field" data-chg="tdflag">'+FLAGS.map(f=>'<option value="'+f+'"'+(d.flag===f?' selected':'')+'>'+t('fl.'+f)+'</option>').join('')+'</select></div>':'')+
  '<div class="px">'+t('t.o.worn')+'</div><div class="sw"><button class="txt'+(!d.worn?' on':'')+'" data-act="tdset" data-k="worn" data-v="0">'+t('t.o.wornno')+'</button><button class="txt'+(d.worn?' on':'')+'" data-act="tdset" data-k="worn" data-v="1">'+t('t.o.wornyes')+'</button></div></div>'+
  '<div class="stack" style="position:sticky;top:8px;align-self:start"><div class="px">'+t('t.preview')+'</div><div class="beltbox">'+belt(pv,280)+'</div><div><button class="btn gold" data-act="tdcreate">'+t('t.add')+'</button></div></div></div></div>'}
function posterAv(id,px,win,nm){const w=W(id);if(!w)return '';return '<div class="pc'+(win?' pw':'')+'" title="'+esc(w.name)+'"><div class="av" style="min-width:0;padding:2px">'+avatar(w.look,px)+'</div>'+(nm?'<span>'+esc(w.name.split(' ').slice(-1)[0])+'</span>':'')+'</div>'}
function poster(m){
 const n=MODES[m.mode];if(!n)return '';const s=sides(m);const tt=m.title?titleOf(m.title):null;
 if(!s.A.length&&!s.B.length&&!tt&&!m.prize&&!m.cash)return '';
 const groups=n.ffa?teamsOf(m):[s.A,s.B];const total=groups.reduce((a,g)=>a+g.length,0);
 const px=total<=2?64:total<=4?52:total<=6?42:total<=10?34:28,nm=total<=4;
 const win=matchReady(m)?outcome(m).wi:[];
 return '<div class="poster">'+prizeBits(m)+(tt?'<div class="pbelt">'+belt(tt,150)+'<div class="mute" style="font-size:12px">'+esc(titleName(tt))+'</div></div>':'')+
  '<div class="pv">'+groups.map((g,gi)=>(gi?'<div class="pvs">VS</div>':'')+'<div class="pg">'+(g.length?g.map(id=>posterAv(id,px,win.indexOf(id)>=0,nm)).join(''):'<div class="pc"><div class="av ph">?</div></div>')+'</div>').join('')+'</div></div>'}
Object.assign(ACT,{
 tdset(e){const d=tdraft(),k=e.dataset.k,v=e.dataset.v;d[k]=k==='sideN'?+v:k==='worn'?v==='1':v;render()},
 tdpreset(e){const p=BPRESETS[e.dataset.v];if(!p)return;const d=tdraft();Object.assign(d,p);d.name=t('bp.'+e.dataset.v);if(!p.g)d.g=d.g==='f'&&e.dataset.v!=='women'?'m':d.g;render()},
 tdcreate(){const d=tdraft();const nm=(document.getElementById('tdname').value||d.name||'').trim().slice(0,30)||t('t.defaultname',{n:G.titles.length+1});
  const o={id:'T'+(G.uid++),kind:'custom',name:nm,prestige:d.prestige,teams:d.teams,g:d.g||'m',holders:[],since:G.week,custom:true};BELTKEYS.forEach(k=>{o[k]=d[k]});
  G.titles.push(o);G.td=null;save();render()}
});
Object.assign(CHG,{tdflag(e){tdraft().flag=e.value;render()}});
