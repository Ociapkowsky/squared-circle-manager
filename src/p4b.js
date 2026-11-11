
/* ============ Views: start, dashboard, roster, show ============ */
function viewStart(){
 const sv=loadSave();
 let h='<div class="shell" style="grid-template-columns:minmax(0,1fr)"><main><div class="top">'+wordmark()+''+langSwitch()+'</div>';
 h+='<div class="hero"><div class="px">'+t('app.tag')+'</div><h1>'+t('start.title')+'</h1><p class="mute" style="max-width:62ch;margin:0">'+t('start.sub')+'</p></div>';
 if(sv)h+='<div class="card pop row spread"><div><b>'+esc(sv.fed.name)+'</b><div class="mute">'+t('common.week',{w:((sv.week-1)%52)+1,y:yearOf(sv.week)})+' · '+money(sv.fed.cash)+'</div></div><button class="btn gold" data-act="continue">'+t('start.continue')+'</button></div>';
 h+='<details class="card"><summary style="cursor:pointer"><b>'+t('sv.start')+'</b></summary><div class="stack" style="margin-top:10px"><div class="mute" style="max-width:70ch">'+t('sv.startd')+'</div><textarea id="svin0" rows="3" style="width:100%" placeholder="SCM1:…"></textarea><div class="row"><button class="btn gold" data-act="svimport0">'+t('sv.load')+'</button></div>'+(SVUI.msg?'<div><b>'+esc(SVUI.msg)+'</b></div>':'')+'</div></details>';
 h+='<div class="row"><label class="px" for="sd">'+t('start.diff')+'</label><select id="sd" class="field" style="width:auto" data-chg="sd">'+Object.keys(DIFF).map(d=>'<option value="'+d+'"'+(START_D===d?' selected':'')+'>'+t('diff.'+d)+'</option>').join('')+'</select><label class="px" for="sch">'+t('start.chal')+'</label><select id="sch" class="field" style="width:auto" data-chg="sch">'+CHALS.map(d=>'<option value="'+d+'"'+(START_CH===d?' selected':'')+'>'+t('chal.'+d)+'</option>').join('')+'</select></div>';
 h+='<div class="row"><label class="px" for="sf">'+t('start.filter')+'</label><select id="sf" class="field" style="width:auto" data-chg="sf"><option value="all">'+t('start.all')+'</option>'+[5,4,3,2,1].map(n=>'<option value="'+n+'"'+(String(START_F)===String(n)?' selected':'')+'>'+t('tier.'+n)+'</option>').join('')+'</select><label class="px" for="sk">'+t('ui.continent')+'</label><select id="sk" class="field" style="width:auto" data-chg="sk"><option value="all">'+t('start.all')+'</option>'+CONTS.map(c=>'<option value="'+c+'"'+(START_K===c?' selected':'')+'>'+t('ct.'+c)+'</option>').join('')+'</select><label class="px" for="sc">'+t('ui.country')+'</label><select id="sc" class="field" style="width:auto" data-chg="sc"><option value="all">'+t('start.all')+'</option>'+[...new Set(PACK.feds.map(f=>f.country))].sort((a,b)=>cn(a).localeCompare(cn(b))).map(c=>'<option value="'+c+'"'+(START_C===c?' selected':'')+'>'+cn(c)+'</option>').join('')+'</select><label class="px" for="ss">'+t('r.sort')+'</label><select id="ss" class="field" style="width:auto" data-chg="ss">'+[['tier','ui.sTier'],['ct','ui.sCt'],['cn','ui.sCn'],['name','r.sortname'],['pop','r.sortpop']].map(o=>'<option value="'+o[0]+'"'+(START_S===o[0]?' selected':'')+'>'+t(o[1])+'</option>').join('')+'</select></div>';
 h+='<div class="grid gA">';
 PACK.feds.filter(f=>(START_F==='all'||String(f.tier)===String(START_F))&&(START_C==='all'||f.country===START_C)&&(START_K==='all'||contOf(f.country)===START_K)).sort((a,b)=>START_S==='ct'?CONTS.indexOf(contOf(a.country))-CONTS.indexOf(contOf(b.country))||cn(a.country).localeCompare(cn(b.country))||b.tier-a.tier:START_S==='cn'?cn(a.country).localeCompare(cn(b.country))||b.tier-a.tier||b.pop-a.pop:START_S==='name'?a.name.localeCompare(b.name):START_S==='pop'?b.pop-a.pop:b.tier-a.tier||b.pop-a.pop).forEach(f=>{
  const n=PACK.wrestlers.filter(w=>w.fed===f.id).length;
  h+='<div class="card fedpick"><div class="row spread"><div class="wname"><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name)+'</div><span class="tag">'+esc(f.short||'')+'</span></div>'+
   '<div class="row"><span class="tag">'+t('tier.'+f.tier)+'</span><span class="tag">'+cn(f.country)+'</span></div><div class="mute">'+t('diff.'+f.tier)+'</div>'+
   '<div class="grid g2" style="gap:8px"><div><div class="px">'+t('start.cash')+'</div><b>'+money(f.cash)+'</b></div><div><div class="px">'+t('start.pop')+'</div><b>'+f.pop+'</b></div></div>'+
   bar(f.pop)+'<div class="mute" style="font-size:13px">'+t('start.roster',{n})+'</div><button class="btn gold" data-act="start" data-v="'+esc(f.id)+'">'+t('start.play')+'</button></div>';
 });
 h+='<div class="card fedpick"><div class="wname">'+t('start.custom')+'</div><div class="mute">'+t('start.customsub')+'</div>'+
  '<label class="px" for="cname">'+t('start.name')+'</label><input id="cname" class="field" maxlength="40" value="My Promotion">'+
  '<label class="px" for="ccountry">'+t('start.country')+'</label><select id="ccountry" class="field">'+COUNTRIES.map(c=>'<option value="'+c+'"'+(c==='PL'?' selected':'')+'>'+cn(c)+'</option>').join('')+'</select>'+
  '<button class="btn gold" data-act="custom">'+t('start.create')+'</button></div>';
 return h+'</div><p class="mute" style="font-size:13px">'+t('s.about')+'</p></main></div>';
}
const NAVG=[['g.main',['dash','inbox','roster','show','cal']],['g.story',['feuds','stables','tm','gim','fin','rd','titles','prizes','cup','ppv']],['g.fed',['staff','money','ct','lk','health','infra','board','rel','life','bk','mg','sct','dev','br','rt','dy','emp','hold','hobby']],['g.world',['world','fa','rank','tw','war']],['g.hist',['hof','career','charts']],['g.sys',['settings']]];
const NAV=NAVG.reduce((a,g)=>a.concat(g[1]),[]);
function navCol(){try{return JSON.parse(localStorage.getItem('ringboss.nav.v1')||'{}')}catch(e){return {}}}
function shell(inner){
 const f=G.fed;let h='<div class="shell"><aside class="side">'+wordmark()+'<div class="tagline">'+t('app.tag')+'</div>'+sndQuick()+'<nav class="nav">';
 const nc=navCol();NAVG.forEach(g=>{const act=g[1].indexOf(G.screen)>=0,col=!!nc[g[0]]&&!act,single=g[1].length===1&&g[0]==='g.sys';if(!single)h+='<div class="ng'+(col?' c':'')+'"><button class="nh" data-act="navg" data-g="'+g[0]+'" aria-expanded="'+(!col)+'"><span>'+t(g[0])+(col&&g[1].indexOf('tw')>=0&&twNew()?' <span class="tag">'+twNew()+'</span>':'')+'</span><span class="ar">'+(col?'▸':'▾')+'</span></button><div class="ng-i">';g[1].forEach(n=>{if(n==='hobby'&&G.me&&G.me.hobbyOff)return;h+='<button data-act="nav" data-v="'+n+'" class="'+(G.screen===n?'on':'')+'">'+navIc(n)+'<span>'+t('nav.'+n)+'</span>'+(n==='tw'&&twNew()?' <span class="tag">'+twNew()+'</span>':'')+(n==='inbox'&&ibxNew()?' <span class="tag">'+ibxNew()+'</span>':'')+'</button>'});if(!single)h+='</div></div>'});
 return h+'</nav><div class="fedbox"><div class="px">'+t('common.week',{w:((G.week-1)%52)+1,y:yearOf(G.week)})+'</div><b>'+esc(f.name)+'</b><div class="mute" style="font-size:13px">'+t('tier.'+f.tier)+' · '+t('venue.'+f.tier)+'</div></div></aside><main>'+inner+'</main></div>';
}
function holdersHtml(tt){return tt.holders.length?tt.holders.map(i=>W(i)?wMini(W(i)):'').join(''):'<span class="tag" style="align-self:flex-start">'+t('t.vacant')+'</span>'}
function vDash(){
 const f=G.fed,T=tdNow();const last=G.hist[G.hist.length-1];
 let h='<div class="top"><h2>'+t('nav.dash')+'</h2><button class="btn gold" data-act="nav" data-v="show">'+t('d.next')+'</button></div>';
 h+='<div class="grid g4"><div class="card kpi"><div class="px">'+t('d.cash')+'</div><div class="v '+(f.cash<0?'neg':'')+'">'+money(f.cash)+'</div><div class="s">'+(last?(last.rev-last.cost>=0?'<span class="pos">+':'<span class="neg">')+money(last.rev-last.cost)+'</span> / '+t('nav.show').toLowerCase():'&nbsp;')+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.pop')+'</div><div class="row" style="flex-wrap:nowrap">'+gauge(f.pop,'var(--gold)')+'<div class="s">'+f1(f.pop)+' / 100</div></div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.venue')+'</div><div class="v" style="font-size:20px">'+t('venue.'+f.tier)+'</div><div class="s">'+t('d.cap',{n:num(T.cap)})+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.trend')+'</div>'+spark(G.popHist,160,60,'var(--gold)')+'</div></div>';
 h+=cmdCard()+boardStrip()+chalHtml();
 h+='<div class="grid g2"><div class="card stack"><h3>'+t('d.last')+'</h3>';
 if(G.summary){const s=G.summary;h+='<div class="row">'+starsHtml(s.rating)+'<b>'+f2(s.rating)+'</b></div><div class="mute">'+t('sh.att')+': '+num(s.att)+' / '+num(s.cap)+(s.sold?' · '+t('sh.sold'):'')+' · '+t('sh.profit')+': <span class="'+(s.profit>=0?'pos':'neg')+'">'+money(s.profit)+'</span></div>'+s.out.map(o=>o.promo?'<div class="row spread"><div style="min-width:0"><b>'+esc(o.a)+'</b> <span class="tag">'+t('pr.type.'+o.ty)+'</span><div class="mute" style="font-size:13px">'+esc(o.line)+'</div></div>'+starsHtml(o.stars)+'</div>':'<div class="row spread"><span style="min-width:0;overflow-wrap:anywhere">'+esc(o.winner)+'</span>'+starsHtml(o.stars)+'</div>').join('')}
 else h+='<p class="mute">'+t('d.none')+'</p>';
 h+='</div><div class="card stack"><h3>'+t('d.obj')+'</h3>';
 objectives().forEach(o=>{const p=clamp(o.cur/o.tar*100,0,100);const done=o.cur>=o.tar;h+='<div><div class="lbl"><span>'+t(o.k,o.v)+'</span><span>'+(done?'<span class="pos">✓</span>':Math.round(p)+'%')+'</span></div>'+bar(p,done?'t':'')+'</div>'});
 h+='</div></div><div class="grid g2"><div class="card stack"><h3>'+t('d.war')+'</h3>';
 allFeds().slice(0,10).forEach((x,i)=>{const me=x.id===G.fed.id;h+='<div><div class="lbl"><span'+(me?' style="color:var(--gold);font-weight:600"':'')+'>'+(i+1)+'. '+esc(x.short||x.name)+' · '+t('tier.'+x.tier)+'</span><span>'+Math.round(x.pop)+'</span></div>'+bar(x.pop,me?'':'b')+'</div>'});
 h+='</div><div class="card stack"><h3>'+t('d.champs')+'</h3>'+G.titles.map(tt=>'<div class="row" style="flex-wrap:nowrap;gap:12px;align-items:flex-start">'+belt(tt,92)+'<div class="stack" style="gap:4px;min-width:0"><div class="mute" style="font-size:13px">'+esc(titleName(tt))+'</div>'+holdersHtml(tt)+'</div></div>').join('')+
  '<h3 style="margin-top:6px">'+t('d.feuds')+'</h3>';
 if(!G.feuds.length)h+='<div class="mute">'+t('f.none').split('.')[0]+'.</div>';
 G.feuds.slice().sort((a,b)=>b.heat-a.heat).slice(0,3).forEach(fd=>{h+='<div><div class="lbl"><span>'+esc(fLabel(fd))+'</span><span>'+Math.round(fd.heat)+'</span></div>'+bar(fd.heat,'r')+'</div>'});
 return h+'</div></div><div class="card stack"><h3>'+t('d.news')+'</h3>'+newsList(8)+'</div>';
}
function wCard(w,extra){
 const ow=w.fed===G.fed.id;const st=ow?stableOf(w.id):null;const acc=ow?w.acc:accStart(w.country,G.fed.country);
 let h='<div class="card wcard"><div class="av">'+avatar(w.look,96)+'</div><div class="stack" style="gap:7px"><div><div class="wname">'+esc(w.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(w.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀ '+t('g.f')+'</span>':'')+(w.celeb?'<span class="tag" style="color:var(--gold);border-color:var(--gold)">★ '+t('gs.celeb')+'</span>':'')+'<span class="tag">'+cn(w.country)+'</span><span class="tag">'+t('style.'+w.style)+'</span><span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span><span class="tag">'+(foreign(w)?t('st.foreign'):t('st.home'))+'</span>'+(st?'<span class="tag">'+t('st.stable',{n:esc(st.name)})+'</span>':'')+(w.injury?'<span class="tag inj">'+injTxt(w)+'</span>':(w.rust>0?'<span class="tag">'+t('r.rust')+'</span>':''))+potTag(w)+trTag(w)+'</div></div>';
 h+='<div class="sgh">'+t('st.g.main')+'</div><div class="sg">'+stat(t('st.ring'),w.ring,'')+stat(t('st.mic'),w.mic,'b')+stat(t('st.cha'),w.cha,'t')+stat(t('st.pop'),w.pop,'')+'</div>';
 h+='<div class="sgh">'+t('st.g.body')+'</div><div class="sg">'+stat(t('st.str'),w.str,'')+stat(t('st.spd'),w.spd,'')+stat(t('st.tec'),w.tec,'')+stat(t('st.sta'),w.sta,'')+stat(t('st.psy'),w.psy,'')+'</div>';
 h+='<div class="sgh">'+t('st.g.status')+'</div><div class="sg">'+stat(t('st.morale'),w.morale,'t')+stat(t('st.fat'),w.fatigue,'r')+stat(t('st.acc'),acc,'b')+stat(t('st.loy'),w.loyal,'')+'</div>';
 h+='<div class="mute" style="font-size:13px">'+t('st.age',{n:w.age})+' · '+t('st.salary',{m:money(w.salary)})+(ow?' · '+t('st.contract',{n:wks(Math.max(0,w.contract))}):'')+'</div>';
 return h+relHtml(w)+(extra||'')+'</div></div>';
}
function vRoster(){
 const list=mine().filter(w=>!G.rgen||(G.rgen==='f')===(w.g==='f')).sort((a,b)=>G.sort==='ct'?CONTS.indexOf(contOf(a.country))-CONTS.indexOf(contOf(b.country))||cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='cn'?cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='name'?a.name.localeCompare(b.name):G.sort==='ring'?b.ring-a.ring:b.pop-a.pop);
 let h='<div class="top"><div><h2>'+t('r.title')+'</h2><div class="mute">'+t('r.limit',{n:list.length,m:ROSTERMAX[G.fed.tier-1]})+'</div></div><div class="row"><select class="field" style="width:auto" data-chg="rgen"><option value="">'+t('g.all')+'</option><option value="m"'+(G.rgen==='m'?' selected':'')+'>'+t('g.m')+'</option><option value="f"'+(G.rgen==='f'?' selected':'')+'>'+t('g.f')+'</option></select><label class="px" for="sort">'+t('r.sort')+'</label><select id="sort" class="field" style="width:auto" data-chg="sort"><option value="pop"'+(G.sort==='pop'?' selected':'')+'>'+t('r.sortpop')+'</option><option value="ring"'+(G.sort==='ring'?' selected':'')+'>'+t('r.sortring')+'</option><option value="name"'+(G.sort==='name'?' selected':'')+'>'+t('r.sortname')+'</option><option value="ct"'+(G.sort==='ct'?' selected':'')+'>'+t('ui.sCt')+'</option><option value="cn"'+(G.sort==='cn'?' selected':'')+'>'+t('ui.sCn')+'</option></select></div></div>';
 return h+'<div class="grid gW">'+list.map(w=>wCard(w,'<div class="row"><button class="btn sm" data-act="avedit" data-id="'+w.id+'">'+t('r.edit')+'</button><button class="btn sm" data-act="renew" data-id="'+w.id+'"'+(G.fed.cash<w.salary*10?' disabled':'')+'>'+t('r.renew')+' ('+money(w.salary*10)+')</button><button class="btn sm" data-act="retire" data-id="'+w.id+'">'+t('r.retire')+'</button><button class="btn sm danger" data-act="release" data-id="'+w.id+'">'+t('r.release')+'</button></div>'+(w.farewell?'<div class="row"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('rt.tag',{n:wks(Math.max(0,w.farewell.left)),r:w.farewell.role?t('sr.'+w.farewell.role):t('rt.norole')})+'</span><button class="btn sm" data-act="cancelfw" data-id="'+w.id+'">'+t('rt.cancel2')+'</button></div>':''))).join('')+'</div>';
}
function wOpts(except,sel){
 const u=usedIds(except);const cm=G.card[except];
 if(cm&&cm.cash&&cm.title){const tc=titleOf(cm.title);if(tc)tc.holders.forEach(c=>u.delete(c))}
 if(cm){const n=MODES[cm.mode];cm.a.slice(0,n.a).concat(cm.b.slice(0,n.b)).forEach(x=>{if(x&&x!==sel)u.add(x)})}
 return '<option value="">'+t('sh.pick')+'</option>'+bookable().sort((a,b)=>b.pop-a.pop).filter(w=>!u.has(w.id)||w.id===sel).map(w=>'<option value="'+w.id+'"'+(w.id===sel?' selected':'')+'>'+(w.ext?'★ ['+catLabel(w)+'] ':w.fed!==G.fed.id?'['+esc((G.rivals.find(r=>r.id===w.fed)||{}).short||'?')+'] ':'')+esc(w.name)+(w.g==='f'?' ♀':'')+' · '+t('role.'+w.role).split(' ')[0]+' · '+t('style.'+w.style)+' · '+Math.round(w.pop)+esc(feudTag(w.id))+'</option>').join('');
}
function rolesLine(id){
 const w=id?W(id):null;if(!w)return '<div class="note">&nbsp;</div>';const st=stableOf(id);
 return '<div class="row" style="gap:5px">'+(w.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span><span class="tag">'+t('style.'+w.style)+'</span>'+(st?'<span class="tag">'+esc(st.name)+'</span>':'')+(w.fatigue>70?'<span class="tag inj">'+t('st.fat')+' '+Math.round(w.fatigue)+'</span>':'')+(foreign(w)?'<span class="tag">'+t('st.acc')+' '+Math.round(w.acc)+'</span>':'')+'</div>';
}
function selHtml(m,i,sd,j){return '<select data-chg="slot" data-i="'+i+'" data-side="'+sd+'" data-j="'+j+'" aria-label="'+t('sh.pick')+'">'+wOpts(i,m[sd][j])+'</select>'+rolesLine(m[sd][j])}
function modeOpts(cur){
 const ks=Object.keys(MODES),o=k=>'<option value="'+k+'"'+(cur===k?' selected':'')+'>'+esc(modeLabel(k))+'</option>';
 let h='';for(let a=1;a<=10;a++){const g=ks.filter(k=>!MODES[k].ffa&&MODES[k].a===a);if(g.length)h+='<optgroup label="'+esc(t('mode.g.n',{n:a}))+'">'+g.map(o).join('')+'</optgroup>'}
 return h+'<optgroup label="'+esc(t('mode.g.multi'))+'">'+ks.filter(k=>MODES[k].ffa).map(o).join('')+'</optgroup>'}
function timeline(){const L=[],n=G.card.length;for(let k=0;k<=n;k++){G.promos.filter(p=>Math.min(p.at,n)===k).forEach(p=>L.push({t:'p',o:p}));if(k<n)L.push({t:'m',o:G.card[k]})}return L}
function applyTL(L){G.card=L.filter(x=>x.t==='m').map(x=>x.o);let c=0;G.promos=[];L.forEach(x=>{if(x.t==='m')c++;else{x.o.at=c;G.promos.push(x.o)}})}
const PLATN={yt:['YouTube','YouTube'],twitch:['Twitch','Twitch'],kick:['Kick','Kick'],own:['Własna platforma','Own platform'],tv:['Telewizja','Television']};
const platName=p=>PLATN[p][lang==='pl'?0:1];
function bigBanner(){
 const m=media();let h='<div class="card stack"><div class="row spread"><div><span class="px">'+t('sh.weekly')+'</span> <b>'+esc(platName(m.p))+'</b> <span class="tag">'+t('rate.'+PLAT[m.p].rate)+'</span></div><span class="mute" style="font-size:13px">'+t('sh.weeklyrev',{m:money(mediaRev())})+'</span></div>';
 if(isBig()){const bt=bigType(),pe=bigEst('ppv'),le=bigEst('ple');
  h+='<div class="note gold"><b>'+t('sh.bigweek',{n:esc(bigName())})+'</b></div><div class="grid g2"><label class="pick'+(bt==='ppv'?' win':'')+'" style="cursor:pointer"><div class="row" style="gap:8px"><input type="radio" name="bigt" data-chg="bigt" value="ppv"'+(bt==='ppv'?' checked':'')+'><b>PPV</b></div><div class="mute" style="font-size:13px">'+t('sh.ppvd',{m:money(pe.rev)})+'</div></label>'+
   '<label class="pick'+(bt==='ple'?' win':'')+'" style="cursor:pointer"><div class="row" style="gap:8px"><input type="radio" name="bigt" data-chg="bigt" value="ple"'+(bt==='ple'?' checked':'')+'><b>PLE</b></div><div class="mute" style="font-size:13px">'+(m.p==='tv'?t('sh.pled',{m:money(le.rev)}):t('sh.plenotv'))+'</div></label></div><div class="note">'+t('sh.bigmin')+'</div>'}
 else h+='<div class="mute" style="font-size:13px">'+t('sh.nextbig',{n:4-G.week%4})+'</div>';
 return h+'</div>'}
function promoOpts(sel,blank){return '<option value="">'+blank+'</option>'+bookable().sort((a,b)=>b.pop-a.pop).map(w=>'<option value="'+w.id+'"'+(w.id===sel?' selected':'')+'>'+(w.ext?'★ ['+catLabel(w)+'] ':w.fed!==G.fed.id?'['+esc((G.rivals.find(r=>r.id===w.fed)||{}).short||'?')+'] ':'')+esc(w.name)+(w.g==='f'?' ♀':'')+' · '+t('role.'+w.role).split(' ')[0]+' · '+t('st.mic')+' '+Math.round(w.mic)+esc(feudTag(w.id))+'</option>').join('')}
function promoHtml(p,i,pos,len){
 const n=G.card.length;let at='';for(let k=0;k<n;k++)at+='<option value="'+k+'"'+(Math.min(p.at,n)===k?' selected':'')+'>'+t(k===n-1&&n>1?'sh.beforeMain':'sh.before',{n:k+1})+'</option>';at+='<option value="'+n+'"'+(Math.min(p.at,n)===n?' selected':'')+'>'+t('sh.afterAll')+'</option>';
 const pf=p.a?promoFeud(p):null;
 return '<div class="slot"><div class="row spread"><div class="row" style="gap:6px"><span class="tag">#'+(pos+1)+'</span><b>'+t('sh.promo')+' '+(i+1)+'</b></div><div class="row" style="gap:4px">'+mvBtns(pos,len)+'<button class="btn sm danger" data-act="rmpromo" data-i="'+i+'">'+t('sh.remove')+'</button></div></div>'+
  '<div class="grid g2" style="gap:8px"><div><div class="px">'+t('sh.promoA')+'</div><select data-chg="pr" data-k="a" data-i="'+i+'">'+promoOpts(p.a,t('sh.pick'))+'</select>'+rolesLine(p.a)+'</div>'+
  '<div><div class="px">'+t('sh.promoB')+'</div><select data-chg="pr" data-k="b" data-i="'+i+'">'+promoOpts(p.b,t('sh.promoSolo'))+'</select>'+rolesLine(p.b)+'</div></div>'+
  (pf?'<div class="row"><span class="tag" style="color:var(--red);border-color:var(--red)">'+t('sh.feudheat',{n:Math.round(pf.f.heat)})+'</span></div>':'')+'</div>'}
function feudChips(){
 const fs=G.feuds.map((f,i)=>({f,i})).sort((x,y)=>y.f.heat-x.f.heat).slice(0,8);if(!fs.length)return '';
 return '<div class="card stack"><div class="px">'+t('sh.fromfeud')+'</div>'+fs.map(({f,i})=>'<div class="row spread" style="flex-wrap:wrap"><div style="min-width:0;overflow-wrap:anywhere"><b>'+esc(t('sc.'+f.sc))+'</b> <span class="mute" style="font-size:13px">'+esc(fLabel(f))+'</span> '+heatNum(f.heat)+'</div><div class="row"><button class="btn sm" data-act="fbook" data-i="'+i+'">'+t('sh.addmatch')+'</button><button class="btn sm" data-act="fpromo" data-i="'+i+'">'+t('sh.addpr')+'</button></div></div>').join('')+'</div>'}
function mvBtns(pos,len){return (pos>0?'<button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="-1" aria-label="'+t('sh.left')+'">◀</button>':'')+(pos<len-1?'<button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="1" aria-label="'+t('sh.right')+'">▶</button>':'')}
function slotHtml(m,i,pos,len){
 const n=MODES[m.mode],total=G.card.length,ffa=!!n.ffa,stp=STIPS[m.stip]||STIPS.none;
 let h='<div class="slot"><div class="row spread"><div class="row" style="gap:6px"><span class="tag">#'+(pos+1)+'</span><b>'+(i===total-1&&total>1?t('sh.main'):t('sh.match',{n:i+1}))+'</b></div><div class="row" style="gap:4px">'+mvBtns(pos,len)+'<button class="btn sm danger" data-act="rmslot" data-i="'+i+'">'+t('sh.remove')+'</button></div></div>';
 h+=poster(m);
 h+='<div class="grid" style="gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">'+modeSel(m,i)+
  '<div><div class="px">'+t('sh.stip')+'</div>'+stpBtn(m,i)+'</div></div>';
 if(m.stip!=='none')h+='<div class="note">'+t('stipd.'+m.stip)+'</div>';
 if(ffa){h+='<div class="note">'+t('sh.ffa')+'</div><div class="stack">';
  const g=n.g||1;for(let ti=0;ti<n.a/g;ti++){let sl='';for(let j=0;j<g;j++)sl+=selHtml(m,i,'a',ti*g+j);
   h+='<div class="pick side-sel'+((m.fw||0)===ti?' win':'')+'">'+(g>1?'<div class="px">'+t('sh.teamn',{n:ti+1})+'</div>':'')+sl+'<label class="row" style="gap:6px;font-size:13px"><input type="radio" name="win'+i+'" data-chg="fw" data-i="'+i+'" data-v="'+ti+'"'+((m.fw||0)===ti?' checked':'')+'> '+t('sh.winner')+'</label></div>'}
  h+='</div>';
 }else{
  h+='<div class="vs">';
  ['a','b'].forEach((sd,si)=>{if(si===1)h+='<div class="mid">VS</div>';h+='<div class="pick side-sel'+(m.winner===sd?' win':'')+'">';
   for(let j=0;j<n[sd];j++)h+=selHtml(m,i,sd,j);
   h+='<label class="row" style="gap:6px;font-size:13px"><input type="radio" name="win'+i+'" data-chg="winner" data-i="'+i+'" data-v="'+sd+'"'+(m.winner===sd?' checked':'')+'> '+t('sh.winner')+'</label></div>'});
  h+='</div>';
 }
 const fins=ffa?['clean','dirty']:['clean','dirty','dq','count','draw'].filter(f=>!(stp.noDQ&&(f==='dq'||f==='count')));
 h+='<div class="grid g2" style="gap:8px"><div><div class="px">'+t('sh.finish')+'</div><select data-chg="finish" data-i="'+i+'">'+fins.map(f=>'<option value="'+f+'"'+(m.finish===f?' selected':'')+'>'+t('fin.'+f)+'</option>').join('')+'</select></div>'+
  '<div><div class="px">'+t('sh.titlefor')+'</div><select data-chg="mtitle" data-i="'+i+'"><option value="">'+t('sh.notitle')+'</option>'+G.titles.filter(tt=>titleOk(tt,m)).map(tt=>'<option value="'+tt.id+'"'+(m.title===tt.id?' selected':'')+'>'+esc(titleName(tt))+'</option>').join('')+'</select></div></div>';
 h+=prizeRow(m,i);
 if(matchReady(m)){const s=sides(m);const c=matchChem(s.A,s.B,ffa);const ck=c>=7?'chem.great':c>=4?'chem.ok':c<0?'chem.bad':'chem.none';const fo=feudOf(m);
  const tb=teamsOf(m).reduce((q,S)=>q+teamBonus(S),0);const tired=s.A.concat(s.B).filter(x=>W(x).fatigue>70).length;
  h+='<div class="row" style="gap:6px"><span class="tag">'+t(ck)+'</span>'+(ffa?'':'<span class="tag">'+t(alignKey(m))+'</span>')+(tb>=2?'<span class="tag">'+t('sh.team')+'</span>':'')+(tired?'<span class="tag inj">'+t('sh.tired',{n:tired})+'</span>':'')+(fo?'<span class="tag" style="color:var(--red);border-color:var(--red)">'+t('sh.feudheat',{n:Math.round(fo.f.heat)})+(fo.f.heat>=70&&fo.cov>=.99?' · '+t('sh.blow'):'')+'</span>':'')+'</div>';
 }
 return h+'</div>';
}
function vShow(){
 if(RUN)return '<div class="top"><h2>'+t('sh.title')+'</h2><button class="btn sm" data-act="fast">'+t('sh.skipanim')+'</button></div><div class="card"><div id="live" class="live"></div></div>';
 if(G.summary&&G.showResult)return vSummary();
 const ready=G.card.filter(matchReady).length;
 let h='<div class="top"><div><h2>'+t('sh.title')+'</h2><div class="mute" style="max-width:60ch">'+t('sh.sub')+'</div></div><div class="row"><button class="btn" data-act="auto">'+t('sh.auto')+'</button><button class="btn" data-act="clearcard">'+t('sh.clear')+'</button></div></div>';
 h+=bigBanner()+'<div class="px">'+t('sh.timeline')+'</div>';const TL=timeline();
 h+='<div class="tl">'+TL.map((x,pos)=>x.t==='m'?slotHtml(x.o,G.card.indexOf(x.o),pos,TL.length):promoHtml(x.o,G.promos.indexOf(x.o),pos,TL.length)).join('')+'</div>';
 h+='<div class="row">'+(G.card.length<6?'<button class="btn" data-act="addslot">'+t('sh.add')+'</button>':'')+(G.promos.length<4?'<button class="btn" data-act="addpromo">'+t('sh.addpromo')+'</button>':'')+'</div>';
 if(G.shmsg)h+='<div class="note neg">'+t(G.shmsg)+'</div>';
 h+=feudChips()+guestChips();
 h+='<div class="card row spread"><div>'+(ready<2?'<span class="mute">'+t('sh.need')+'</span>':'<span class="pos">'+ready+' '+pn(ready,['walka','walki','walk'],['match','matches'])+'</span>')+'</div><div class="row"><button class="btn" data-act="skipweek">'+t('sh.skipweek')+'</button><button class="btn gold" data-act="run"'+(ready<2?' disabled':'')+'>'+t('sh.run')+'</button></div></div><div class="mute" style="font-size:13px">'+t('sh.skipnote')+'</div>';
 return h;
}
function vSummary(){
 const s=G.summary;
 let h='<div class="top"><h2>'+t('sh.result')+'</h2><button class="btn gold" data-act="done">'+t('sh.continue')+'</button></div>';
 h+='<div class="grid g4"><div class="card kpi"><div class="px">'+t('sh.rating')+'</div><div class="v">'+f2(s.rating)+'</div>'+starsHtml(s.rating)+'</div>'+
  '<div class="card kpi"><div class="px">'+t('sh.att')+'</div><div class="v">'+num(s.att)+'</div><div class="s">/ '+num(s.cap)+(s.sold?' · '+t('sh.sold'):'')+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('sh.profit')+'</div><div class="v '+(s.profit>=0?'pos':'neg')+'">'+money(s.profit)+'</div><div class="s">'+money(s.rev)+' − '+money(s.cost)+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('sh.dpop')+'</div><div class="v '+(s.dpop>=0?'pos':'neg')+'">'+(s.dpop>=0?'+':'')+f1(s.dpop)+'</div></div></div>';
 h+=sumExtra(s)+(s.big?'<div class="card stack"><div class="row spread"><b>'+t('sh.bigres',{k:s.bt.toUpperCase()})+'</b><b class="pos">'+money(s.bt==='ppv'?s.ppv:s.ple)+'</b></div>'+(s.bt==='ppv'?'<div class="mute" style="font-size:13px">'+t('sh.buys',{n:num(s.buys)})+'</div>':'')+(s.thin?'<div class="note neg">'+t('sh.thin')+'</div>':'')+'</div>':'')+'<div class="card stack">'+s.out.map(o=>o.promo?'<div class="row spread"><div style="min-width:0"><b>'+esc(o.a)+'</b> <span class="tag">'+t('pr.type.'+o.ty)+'</span><div class="mute" style="font-size:13px">'+esc(o.line)+'</div></div>'+starsHtml(o.stars)+'</div>':sumRow(o,s)).join('')+'</div>';
 return h+'<div class="card stack"><h3>'+t('d.news')+'</h3>'+newsList(6)+'</div>';
}
