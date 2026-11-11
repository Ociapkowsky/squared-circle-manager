
/* ============ Views: feuds, stables, titles, money, world, settings ============ */
const avsHtml=ids=>'<div class="avs">'+ids.filter(i=>W(i)).map(i=>'<div class="av" title="'+esc(W(i).name)+'">'+avatar(W(i).look,44)+'</div>').join('')+'</div>';
const fmtSel=(d,k)=>{let o='';for(let n=2;n<=maxFmt(d.sc);n++)o+='<option value="'+n+'"'+((d.fmt||2)===n?' selected':'')+'>'+(n===2?t('f.fmt.std'):k.a===1?n+' '+pn(n,['strona konfliktu','strony konfliktu','stron konfliktu'],['side of the conflict','sides of the conflict'])+' – '+(lang==='pl'?'każdy na każdego':'free-for-all'):t('f.fmtT',{n:n,g:k.a}))+'</option>';return '<div><label class="px">'+t('f.format')+'</label><select class="field" data-chg="fd" data-k="fmt">'+o+'</select></div>'};
function feudHist(f){
 const sp=SC[f.sc]||{s:0};const L=(f.log||[]).slice().reverse();const nm=L.filter(x=>x.k==='m').length,np=L.filter(x=>x.k==='p').length;
 let h='<div class="row spread"><h2 style="margin:0">'+esc(t('sc.'+f.sc))+'</h2><button class="btn sm" data-act="mclose">'+t('f.close')+'</button></div>'+
  '<div class="mute" style="font-size:14px">'+esc(fLabel(f))+'</div><div class="lbl"><span>'+t('f.live')+'</span>'+heatNum(f.heat)+'</div>'+bar(f.heat,'r')+
  '<div class="row" style="gap:8px"><span class="tag">'+t('f.hist.sum',{m:nm,p:np})+'</span></div><h3 style="margin:0">'+t('f.details')+'</h3>';
 if(!L.length)return h+'<div class="mute">'+t('f.hist.none')+'</div>';
 h+='<div class="stack" style="gap:8px">'+L.map(x=>{let body='',tag=t('f.hist.'+x.k);
  if(x.k==='m')body='<b>'+esc(x.vs)+'</b><div class="mute" style="font-size:13px">'+esc(x.w)+' · '+t('fin.'+x.fin)+(x.stip&&x.stip!=='none'?' · '+t('stip.'+x.stip):'')+(x.title?' · '+esc(x.title):'')+(x.blow?' · '+t('f.hist.blow'):'')+'</div>'+starsHtml(x.s);
  else if(x.k==='p')body='<b>'+t('pr.type.'+x.ty)+'</b><div class="mute" style="font-size:13px">'+esc(t('pr.'+x.ty+'.'+x.v,{a:x.a,b:x.b}))+'</div>'+starsHtml(x.s);
  else if(x.k==='e')body='<div class="mute" style="font-size:13px">'+esc(t(x.key,x.x))+'</div>';
  else body='<div class="mute" style="font-size:13px">'+t('f.hist.start')+'</div>';
  return '<div class="row" style="flex-wrap:nowrap;align-items:flex-start;gap:10px"><div style="min-width:64px"><span class="px">'+t('f.hist.wk',{n:x.wk})+'</span><br><span class="tag">'+tag+'</span></div><div class="stack" style="gap:3px;min-width:0">'+body+'</div></div>'}).join('')+'</div>';
 return h}
function feudForm(){
 const d=G.fd||(G.fd=fdDefaults('betrayal'));const sp=SC[d.sc],k=kd(d.sc);const pool=genPool(d).sort((a,b)=>a.name.localeCompare(b.name));const full=mine().sort((a,b)=>a.name.localeCompare(b.name));
 const genSel='<div><label class="px">'+t('g.div')+'</label><select class="field" data-chg="fd" data-k="gen"><option value="m"'+(d.gen==='m'?' selected':'')+'>'+t('g.m')+'</option><option value="f"'+(d.gen==='f'?' selected':'')+'>'+t('g.f')+'</option><option value="x"'+(d.gen==='x'?' selected':'')+'>'+t('g.x')+'</option></select></div>';
 const wsel=(key,cur,list)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+(list||pool).map(w=>'<option value="'+w.id+'"'+(w.id===cur?' selected':'')+wOptSty(w)+'>'+wBadge(w)+esc(w.name)+'</option>').join('')+'</select>';
 const ssel=(key,cur)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+G.stables.map(s=>'<option value="'+s.id+'"'+(s.id===cur?' selected':'')+'>'+esc(s.name)+' ('+s.members.length+')</option>').join('')+'</select>';
 let h='<div class="card stack"><h3>'+t('f.new')+'</h3><div><label class="px" for="fsc">'+t('f.scn')+'</label><select id="fsc" class="field" data-chg="fd" data-k="sc">'+
  SC_CATS.map(c=>'<optgroup label="'+esc(t('sc.cat'+c))+'">'+Object.keys(SC).filter(id=>SC[id].cat===c).sort((x,y)=>SC[y].s-SC[x].s).map(id=>'<option value="'+id+'"'+(d.sc===id?' selected':'')+'>'+esc(t('sc.'+id))+' · '+SC[id].s+'/100</option>').join('')+'</optgroup>').join('')+'</select></div>';
 h+='<div class="note">'+esc(t('sc.'+d.sc+'.d'))+'</div><div class="row" style="gap:8px"><span class="px">'+t('f.heatlvl')+'</span>'+heatNum(sp.s)+'</div>'+bar(sp.s,'r');
 if(sp.stip)h+='<div class="note">'+t('f.suggest',{s:t('stip.'+sp.stip)})+'</div>';
 ['retire','fire','fed','heel'].forEach(e=>{if(sp.end===e)h+='<div class="note'+(e==='retire'||e==='fire'?' neg':'')+'">'+t('f.warn.'+e)+'</div>'});
 if(k.st&&!G.stables.length)h+='<div class="note neg">'+t('f.nostables')+'</div>';
 else if(k.st===2)h+='<div class="grid g2"><div><div class="px">'+t('f.stableA')+'</div>'+ssel('stA',d.stA)+'</div><div><div class="px">'+t('f.stableB')+'</div>'+ssel('stB',d.stB)+'</div></div>';
 else if(k.st===1){const st=G.stables.find(s=>s.id===d.stA);const mem=st?st.members.map(W).filter(Boolean):[];
  let right='';
  if(k.extra)right='<div class="px">'+t('f.target')+'</div>'+wsel('B0',d.B[0],pool.filter(w=>!stableOf(w.id)));
  else if(k.member)right='<div class="px">'+t('f.member')+'</div>'+wsel('mem',d.mem,mem);
  else right='<div class="px">'+t('f.memberA')+'</div>'+wsel('A0',d.A[0],mem)+'<div class="px">'+t('f.memberB')+'</div>'+wsel('B0',d.B[0],mem);
  h+='<div class="grid g2"><div><div class="px">'+t('f.stable')+'</div>'+ssel('stA',d.stA)+'</div><div class="stack">'+right+'</div></div>'}
 else if(k.title){const tts=G.titles.filter(x=>x.holders.length===x.teams);const tt=titleOf(d.titleId);
  if(!tts.length)h+='<div class="note neg">'+t('f.notitle')+'</div>';
  else{let ch='';for(let i=0;i<(tt?tt.teams:1);i++)ch+=wsel('A'+i,d.A[i],full.filter(w=>!tt||(tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id]))));
   h+='<div class="grid g2"><div><div class="px">'+t('f.titlesel')+'</div><select class="field" data-chg="fd" data-k="titleId"><option value="">—</option>'+tts.map(x=>'<option value="'+x.id+'"'+(x.id===d.titleId?' selected':'')+'>'+esc(titleName(x))+'</option>').join('')+'</select>'+(tt?'<div class="note">'+esc(names(tt.holders))+'</div>':'')+'</div><div class="stack"><div class="px">'+(tt&&tt.teams===2?t('f.challengers'):t('f.challenger'))+'</div>'+ch+'</div></div>'}}
 else if(k.fed){h+=genSel;const rvs=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id));let mine2='';for(let i=0;i<sp.n;i++)mine2+=wsel('A'+i,d.A[i]);
  const rvw=d.fedId?topOf(d.fedId,sp.n,isF(d.A[0])):[];
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.rivalfed')+'</div><select class="field" data-chg="fd" data-k="fedId"><option value="">—</option>'+rvs.map(r=>'<option value="'+r.id+'"'+(r.id===d.fedId?' selected':'')+'>'+esc(r.name)+' ('+t('tier.'+r.tier)+')</option>').join('')+'</select><div class="px">'+t('f.theirs')+'</div>'+avsHtml(rvw)+'<div class="note">'+esc(names(rvw))+'</div></div><div class="stack"><div class="px">'+t('f.yours')+'</div>'+mine2+'</div></div><div class="note">'+t('f.guest')+'</div>'}
 else if(d.fmt>2&&multiOK(d.sc)){let c='';const g=k.a;for(let ti=0;ti<d.fmt;ti++){let s2='';for(let j=0;j<g;j++)s2+=wsel('A'+(ti*g+j),d.A[ti*g+j]);c+='<div class="stack"><div class="px">'+t('sh.teamn',{n:ti+1})+'</div>'+s2+'</div>'}
  h+=genSel+fmtSel(d,k)+'<div class="grid g2">'+c+'</div>'}
 else{let a='',b='';for(let i=0;i<k.a;i++)a+=wsel('A'+i,d.A[i]);for(let i=0;i<k.b;i++)b+=wsel('B'+i,d.B[i]);
  h+=genSel;if(multiOK(d.sc))h+=fmtSel(d,k);
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.sideA')+'</div>'+a+'</div><div class="stack"><div class="px">'+t('f.sideB')+'</div>'+b+'</div></div>'}
 if(G.fdmsg)h+='<div class="note neg">'+t(G.fdmsg)+'</div>';
 return h+'<div><button class="btn gold" data-act="newfeud">'+t('f.create')+'</button></div></div>';
}
function vFeuds(){
 let h='<div class="top"><div><h2>'+t('f.title')+'</h2><div class="mute" style="max-width:66ch">'+t('f.hint')+'</div></div></div>';
 if(!G.feuds.length)h+='<div class="card mute">'+t('f.none')+'</div>';
 h+='<div class="grid g2">'+G.feuds.map((f,i)=>{const sp=SC[f.sc];if(!sp)return '';const ch=f.heat>=70?2:f.heat>=35?1:0;const md=feudMode(f);const rv=f.fedId?G.rivals.find(r=>r.id===f.fedId):null;
  return '<div class="card stack" style="cursor:pointer" data-act="feuddet" data-i="'+i+'"><div class="row spread"><b>'+esc(t('sc.'+f.sc))+'</b><span class="tag">'+t('f.ch'+ch)+'</span></div>'+
   '<div class="mute" style="font-size:14px">'+esc(t('sc.'+f.sc+'.d'))+'</div>'+
   (f.mw?'<div class="stack" style="gap:6px">'+mwTeams(f).map((S,ti)=>(ti?'<span class="px" style="text-align:center">VS</span>':'')+'<div class="stack" style="gap:4px"><b style="overflow-wrap:anywhere">'+esc(names(S))+'</b>'+avsHtml(S)+'</div>').join('')+'</div>':'<div class="row spread" style="flex-wrap:nowrap;align-items:flex-start"><div class="stack" style="gap:4px;min-width:0"><b style="overflow-wrap:anywhere">'+esc(sideLabel(f.A,f.stA))+'</b>'+avsHtml(f.A)+'</div><span class="px">VS</span><div class="stack" style="gap:4px;min-width:0;text-align:right"><b style="overflow-wrap:anywhere">'+esc(rv?rv.name+': '+names(f.B):sideLabel(f.B,f.stB))+'</b>'+avsHtml(f.B)+'</div></div>')+
   '<div><div class="lbl"><span>'+t('f.live')+'</span>'+heatNum(f.heat)+'</div>'+bar(f.heat,'r')+'</div>'+
   '<div class="lbl"><span>'+t('f.heatlvl')+'</span>'+heatNum(sp.s)+'</div>'+
   (sp.stip?'<div class="note">'+t('f.suggest',{s:t('stip.'+sp.stip)})+'</div>':'')+(f.fav?'<div class="note gold">'+t('f.fav',{s:t('stip.'+f.fav)})+'</div>':'')+((f.chp||f.stake&&f.stake!=='none')?'<div class="note">'+(f.chp?t('fb.chn',{n:f.chp}):'')+(f.stake&&f.stake!=='none'?' · '+t('fb.st.'+f.stake):'')+'</div>':'')+
   (D['sc.'+f.sc+'.e']?'<div class="note">'+t('sc.'+f.sc+'.e')+'</div>':'')+
   ['retire','fire'].map(e=>sp.end===e?'<div class="note neg">'+t('f.warn.'+e)+'</div>':'').join('')+
   ppvFeudUi(f,i)+
   (f.heat>=70&&md?'<div class="note gold">'+t('f.fullmatch',{n:f.A.length+f.B.length,m:modeLabel(md)})+'</div>':'')+
   '<div class="row"><button class="btn sm" data-act="feuddet" data-i="'+i+'">'+t('f.details')+'</button><button class="btn sm danger" data-act="endfeud" data-i="'+i+'">'+t('f.end')+'</button></div></div>'}).join('')+'</div>';
 return h+feudForm();
}
function vStables(){
 const free=mine().filter(w=>!stableOf(w.id));
 let h='<div class="top"><div><h2>'+t('stb.title')+'</h2><div class="mute" style="max-width:66ch">'+t('stb.hint')+'</div></div></div>';
 if(!G.stables.length)h+='<div class="card mute">'+t('stb.none')+'</div>';
 h+='<div class="grid g2">'+G.stables.map(s=>{const ms=s.members.map(W).filter(Boolean);
  return '<div class="card stack"><div class="row spread"><div class="wname" style="font-size:19px">'+esc(s.name)+'</div><span class="tag">'+t('stb.pop',{n:Math.round(avg(ms.map(w=>w.pop)))})+'</span></div>'+
   ms.map(w=>'<div class="row spread" style="flex-wrap:nowrap">'+wMini(w,t('role.'+w.role).split(' ')[0]+' · '+t('style.'+w.style))+'<button class="btn sm" data-act="strem" data-id="'+w.id+'">'+t('stb.remove')+'</button></div>').join('')+
   (free.length?'<div class="row"><select id="stadd-'+s.id+'" class="field" style="width:auto;max-width:100%">'+free.map(w=>'<option value="'+w.id+'">'+esc(w.name)+'</option>').join('')+'</select><button class="btn sm" data-act="stadd" data-id="'+s.id+'">'+t('stb.addmember')+'</button></div>':'')+
   '<div><button class="btn sm danger" data-act="stdisband" data-id="'+s.id+'">'+t('stb.disband')+'</button></div></div>'}).join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('stb.create')+'</h3><div><label class="px" for="stname">'+t('stb.name')+'</label><input id="stname" class="field" maxlength="24"></div><div class="px">'+t('stb.members')+'</div><div class="chk">'+
  mine().map(w=>'<label class="row" style="gap:6px;flex-wrap:nowrap"><input type="checkbox" name="smem" value="'+w.id+'"'+(stableOf(w.id)?' disabled':'')+'> <span style="min-width:0;overflow-wrap:anywhere">'+esc(w.name)+'</span> <span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span></label>').join('')+'</div>'+
  (G.stmsg?'<div class="note neg">'+t('stb.need')+'</div>':'')+'<div><button class="btn gold" data-act="stcreate">'+t('stb.create')+'</button></div></div>';
 return h;
}
function vTitles(){
 let h='<div class="top"><h2>'+t('t.title')+'</h2></div><div class="grid g2">';
 G.titles.forEach(tt=>{h+='<div class="card stack"><div class="beltbox">'+belt(tt,230)+'</div><div class="row spread"><div class="wname" style="font-size:19px;color:var(--gold)">'+esc(titleName(tt))+'</div><span class="tag">'+t('g.'+(tt.g||'m'))+' · '+t('t.kind'+tt.teams)+' · '+t('t.prestige')+' '+pr1(tt)+prTrend(tt)+'</span></div><div class="px">'+t('t.holder')+'</div>'+holdersHtml(tt)+(tt.holders.length?'<div class="note">'+t('t.since',{w:tt.since})+'</div>':'')+'<div class="row" style="gap:6px"><button class="btn sm" data-act="tdedit" data-id="'+tt.id+'">'+t('tdx.edit')+'</button></div>'+(tt.custom?'<div><button class="btn sm danger" data-act="tddelete" data-id="'+tt.id+'">'+t('t.delete')+'</button></div>':'')+'</div>'});
 h+='</div>';
 h+=tdCreator();
 h+='<div class="card stack"><h3>'+t('t.hist')+'</h3>'+(G.reigns.length?'<div class="scroll"><table><tbody>'+G.reigns.slice(0,14).map(r=>'<tr><td class="mute">W'+r.week+'</td><td>'+esc(r.name)+'</td><td>'+esc(names(r.w))+'</td></tr>').join('')+'</tbody></table></div>':'<div class="mute">'+t('t.nohist')+'</div>')+'</div>';
 return h;
}
function mediaCard(){
 const m=media(),T=tdNow(),f=G.fed;let h='<div class="card stack"><h3>'+t('md.title')+'</h3><div class="mute" style="font-size:14px">'+t('md.intro')+'</div>';
 h+='<div class="row spread"><div><b>'+esc(platName(m.p))+'</b> <span class="tag">'+t('rate.'+PLAT[m.p].rate)+'</span></div><b class="pos">'+t('md.perweek',{m:money(mediaRev())})+'</b></div>';
 if(m.p==='tv'){const left=Math.max(0,m.exp-G.week);h+='<div class="note">'+t('md.tvon',{n:left,m:money(m.fee*5)})+'</div><div><button class="btn sm danger" data-act="tvcancel"'+(f.cash<m.fee*5?' disabled':'')+'>'+t('md.cancel')+'</button></div>'}
 else{
  const ok=f.tier>=2&&f.pop>=TVPOP[f.tier-1];
  h+='<div class="card stack" style="background:var(--panel2)"><b>'+t('md.tvoffer')+'</b>'+(f.tier<2?'<div class="mute">'+t('md.tvtier')+'</div>':ok?'<div class="mute">'+t('md.tvd',{m:money(tvFee()),w:TVWEEKS})+'</div><div><button class="btn gold sm" data-act="tvsign">'+t('md.sign')+'</button></div>':'<div class="mute">'+t('md.tvpop',{p:TVPOP[f.tier-1]})+'</div>')+'</div>';
  h+='<div class="grid g2">'+['yt','twitch','kick','own'].map(p=>{const P=PLAT[p],cur=m.p===p,cd=!cur&&m.chg>0&&G.week-m.chg<PLATCD;const need=p==='own'&&!G.ownPaid?Math.round(T.prod*P.setup):0;const blocked=cur||cd||(p==='own'&&(f.tier<2||f.cash<need));
   return '<div class="card stack'+(cur?' pick win':'')+'"><div class="row spread"><b>'+platName(p)+'</b><span class="tag">'+t('rate.'+P.rate)+'</span></div><div class="mute" style="font-size:13px">'+t('md.'+p)+'</div><div class="row spread"><span class="mute" style="font-size:13px">'+t('md.est')+'</span><b>'+money(platRev(p))+'</b></div>'+(need?'<div class="note">'+t('md.setup',{m:money(need)})+'</div>':'')+(cd?'<div class="note">'+t('md.cd',{n:PLATCD-(G.week-m.chg)})+'</div>':'')+'<div><button class="btn sm" data-act="mset" data-p="'+p+'"'+(blocked?' disabled':'')+'>'+(cur?t('md.current'):t('md.choose'))+'</button></div></div>'}).join('')+'</div>'}
 return h+'<div class="note">'+t('md.ppvle')+'</div></div>'}
function vMoney(){
 const f=G.fed,T=tdNow(),last=G.hist[G.hist.length-1];
 let h='<div class="top"><h2>'+t('m.title')+'</h2></div>';
 h+='<div class="grid g3"><div class="card kpi"><div class="px">'+t('d.cash')+'</div><div class="v '+(f.cash<0?'neg':'')+'">'+money(f.cash)+'</div></div><div class="card kpi"><div class="px">'+t('m.income')+'</div><div class="v pos">'+(last?money(last.rev):'—')+'</div></div><div class="card kpi"><div class="px">'+t('m.costs')+'</div><div class="v neg">'+(last?money(last.cost):'—')+'</div></div></div>';
 if(last)h+='<div class="card"><div class="grid g2"><div class="stack"><div class="row spread"><span>'+t('m.gate')+'</span><b>'+money(last.gate)+'</b></div><div class="row spread"><span>'+t('m.merch')+'</span><b>'+money(last.merch)+'</b></div><div class="row spread"><span>'+t('m.tv')+'</span><b>'+money(last.tv)+'</b></div>'+(last.ppv?'<div class="row spread"><span>PPV</span><b>'+money(last.ppv)+'</b></div>':'')+(last.ple?'<div class="row spread"><span>PLE</span><b>'+money(last.ple)+'</b></div>':'')+'<div class="row spread"><span>'+t('m.spons')+'</span><b>'+money(last.spons)+'</b></div></div><div class="stack"><div class="row spread"><span>'+t('m.sal')+'</span><b>'+money(last.sal)+'</b></div><div class="row spread"><span>'+t('m.prod')+' ('+t('sh.stipcost')+')</span><b>'+money(last.prod)+'</b></div></div></div></div>';
 h+=mediaCard();
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
 const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 let h='<div class="top"><h2>'+t('w.title')+'</h2></div><div class="card stack"><h3>'+t('w.feds')+'</h3><div class="row"><label class="px" for="wso">'+t('r.sort')+'</label><select id="wso" class="field" style="width:auto" data-chg="wsort">'+[['pop','r.sortpop'],['ct','ui.sCt'],['cn','ui.sCn'],['tier','ui.sTier'],['name','r.sortname']].map(o=>'<option value="'+o[0]+'"'+((G.wsort||'pop')===o[0]?' selected':'')+'>'+t(o[1])+'</option>').join('')+'</select></div><div class="scroll"><table><tbody>'+wFeds().map((f,i)=>'<tr><td class="mute">'+(i+1)+'</td><td><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name)+(f.id===G.fed.id?' <span class="tag">'+t('nav.dash')+'</span>':'')+'</td><td>'+cn(f.country)+'</td><td>'+t('tier.'+f.tier)+'</td><td><div style="min-width:90px">'+bar(f.pop,f.id===G.fed.id?'':'b')+'</div></td><td>'+Math.round(f.pop)+'</td></tr>').join('')+'</tbody></table></div></div>';
 return h+prosView();
}
function vFa(){const full=mine().length>=ROSTERMAX[G.fed.tier-1];return '<div class="top"><h2>'+t('nav.fa')+'</h2></div>'+marketView(full)}
function vSettings(){
 let h='<div class="top"><h2>'+t('s.title')+'</h2></div><div class="card stack"><b>'+t('s.lang')+'</b>'+langSwitch()+'</div>';
 h+='<div class="card stack"><h3>'+t('s.pack')+'</h3><div class="mute" style="max-width:70ch">'+t('s.packd')+'</div><label class="px" for="packout">'+t('s.export')+'</label><textarea id="packout" readonly>'+esc(packText())+'</textarea><div class="row"><button class="btn sm" data-act="copypack">'+t('s.copy')+'</button></div>'+
  '<label class="px" for="packin">'+t('s.import')+'</label><textarea id="packin"></textarea><div class="row"><input type="file" id="packfile" accept=".json,application/json" data-chg="packfile"><button class="btn gold" data-act="loadpack">'+t('s.load')+'</button><button class="btn" data-act="resetpack">'+t('s.reset')+'</button></div><div id="packmsg" class="mute"></div></div>';
 return h+'<div class="card stack"><b>'+t('s.new')+'</b>'+(G.confirmNew?'<div><button class="btn danger" data-act="newgame2">'+t('s.confirm')+'</button></div>':'<div><button class="btn danger" data-act="newgame">'+t('s.new')+'</button></div>')+'<div class="mute" style="font-size:13px">'+t('s.about')+'</div></div>';
}
function render(){
 if(!hasDoc)return;const app=document.getElementById('app');
 if(!G){app.innerHTML=viewStart();return}
 const V={dash:vDash,roster:vRoster,staff:vStaff,show:vShow,feuds:vFeuds,stables:vStables,titles:vTitles,prizes:vPrizes,cal:vCal,rank:vRank,money:vMoney,world:vWorld,tw:vTw,ppv:vPpv,cup:vCup,inbox:vInbox,board:vBoard,hobby:vHobby,life:vLife,bk:vBk,mg:vMg,gim:vGim,rt:vRt,dy:vDy,emp:vEmp,hold:vHold,career:vCareer,sk:vStreaks,health:vHealth,charts:vCharts,rd:vRd,war:vWar,fin:vFin,tm:vTm,lk:vLk,ct:vCt,sct:vSct,dev:vDev,br:vBr,rel:vRel,infra:vInfra,hof:vHof,fa:vFa,settings:vSettings};
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
 continue(){G=loadSave();ensureExtras();render()},
 start(e){newGame(e.dataset.v);render()},
 custom(){newGame(null,{name:document.getElementById('cname').value,country:document.getElementById('ccountry').value});render()},
 rmslot(e){G.card.splice(+e.dataset.i,1);render()},
 addslot(){G.card.push(emptyMatch());render()},
 auto(){autoBook();render()},
 feuddet(e){const f=G.feuds[+e.dataset.i];if(!f)return;openModal(feudHist(f))},
 mclose(){closeModal()},
 fbook(e){const f=G.feuds[+e.dataset.i];if(!f)return;const m=buildFeudMatch(f);if(!m||G.card.length>=6){G.shmsg='sh.feudbusy';render();return}G.shmsg='';G.card.splice(Math.max(0,G.card.length-(G.card.length?1:0)),0,m);render()},
 fpromo(e){const f=G.feuds[+e.dataset.i];if(!f)return;if(G.promos.length>=4){G.shmsg='sh.promoMax';render();return}const ids=f.mw?f.A:[f.A[0],f.B[0]];G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:ids[0]||'',b:ids[1]||'',at:Math.max(0,G.card.length-1)});render()},
 addpromo(){if(G.promos.length>=4){G.shmsg='sh.promoMax';render();return}G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:'',b:'',at:Math.max(0,G.card.length-1)});render()},
 tmove(e){const L=timeline(),p=+e.dataset.p,d=+e.dataset.d,q=p+d;if(q<0||q>=L.length)return;const x=L[p];L[p]=L[q];L[q]=x;applyTL(L);render()},
 mset(e){const p=e.dataset.p,m=media();if(m.p==='tv')return;if(G.week-(m.chg||-99)<PLATCD&&m.p!==p&&m.chg>0)return;const P=PLAT[p];if(p==='own'){if(G.fed.tier<2)return;if(!G.ownPaid){const c=Math.round(tdNow().prod*P.setup);if(G.fed.cash<c)return;G.fed.cash-=c;G.ownPaid=1}}setPlatform(p);addNews('n.plat',{p:platName(p)});save();render()},
 tvsign(){const m=media(),T=tdNow();if(m.p==='tv'||G.fed.tier<2||G.fed.pop<TVPOP[G.fed.tier-1])return;G.media={k:'tv',p:'tv',fee:tvFee(),exp:G.week+TVWEEKS,last:m.last||'yt',chg:G.week};addNews('n.tvsign',{m:money(G.media.fee)});G.card.forEach(fixMatch);save();render()},
 tvcancel(){const m=media();if(m.p!=='tv')return;const c=m.fee*5;if(G.fed.cash<c)return;G.fed.cash-=c;G.media={k:'stream',p:m.last||'yt',chg:G.week,last:m.last||'yt'};addNews('n.tvcancel');G.card.forEach(fixMatch);save();render()},
 rmpromo(e){G.promos.splice(+e.dataset.i,1);render()},
 clearcard(){G.card=[];G.promos=[];render()},
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
 avrand(e){const w=W(e.dataset.id);w.look=randLook(Math.random,w.country,w.g==='f');document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 look(e){const w=W(e.dataset.id),k=e.dataset.k;w.look[k]=(k==='skin'||k==='hairC'||k==='outC'||k==='maskC'||k==='o2'||k==='beardC')?+e.dataset.v:e.dataset.v;document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 newfeud(){
  const d=G.fd,r=fdSides(d);G.fdmsg='';
  if(!r)G.fdmsg=kd(d.sc).st?'f.nostables':'f.invalid';
  else if(r.err)G.fdmsg=r.err;
  else{const f={id:'f'+(G.uid++),sc:d.sc,A:r.A,B:r.B,stA:r.stA,stB:r.stB,stR:r.stR,titleId:r.titleId,fedId:r.fedId,mw:r.mw,g:r.g,heat:SC[d.sc].h*3,matches:0,used:false};
   if(!feudMode(f))G.fdmsg='f.nomode';
   else if(G.feuds.some(x=>x.sc===f.sc&&!!x.mw===!!f.mw&&x.A.length===f.A.length&&x.B.length===f.B.length&&inter(x.A,f.A).length===f.A.length&&inter(x.B,f.B).length===f.B.length))G.fdmsg='f.dup';
   else{flog(f,{k:'s'});G.feuds.push(f);if(f.mw)addNews('n.feudstart.mw',{a:fLabel(f)});else addNews('n.feudstart',{a:sideLabel(f.A,f.stA),b:f.fedId?names(f.B):sideLabel(f.B,f.stB)});G.fd=fdDefaults(d.sc)}}
  save();render()},
 endfeud(e){G.feuds.splice(+e.dataset.i,1);save();render()},
 upgrade(){const f=G.fed;if(f.tier<5&&f.pop>=TPOP[f.tier]&&f.cash>=UPG[f.tier]){f.cash-=UPG[f.tier];f.tier++;mine().forEach(w=>{w.salary=Math.max(w.salary,salaryOf(w,f.tier))});addNews('n.tier',{v:t('venue.'+f.tier)});save();render()}},
 sign(e){const w=W(e.dataset.id);const fee=Math.round(salaryOf(w,G.fed.tier)*8*relDisc(w));if(mine().length>=ROSTERMAX[G.fed.tier-1]||G.fed.cash<fee)return;
  G.fed.cash-=fee;w.fed=G.fed.id;w.salary=Math.round(salaryOf(w,G.fed.tier)*Math.min(1,relDisc(w))/10)*10||salaryOf(w,G.fed.tier);relDealUsed();w.contract=52;w.acc=accStart(w.country,G.fed.country);w.morale=70;w.fatigue=0;addNews('n.sign',{w:w.name});save();render()},
 copypack(){const ta=document.getElementById('packout');ta.select();try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(x){}},
 loadpack(){applyPack(document.getElementById('packin').value)},
 resetpack(){PACK=buildPack();try{localStorage.removeItem(LS_PACK)}catch(x){}G=null;render()},
 newgame(){G.confirmNew=true;render()},
 newgame2(){try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;render()},
 stcreate(){
  const nm=(document.getElementById('stname').value||'').trim().slice(0,24);const ids=[].slice.call(document.querySelectorAll('input[name=smem]:checked')).map(x=>x.value);
  if(!nm||ids.length<2){G.stmsg=1;render();return}
  G.stmsg=0;G.stables.push({id:'s'+(G.uid++),name:nm,members:ids});ids.forEach(i=>{W(i).morale=clamp(W(i).morale+3,0,100)});addNews('n.stnew',{s:nm});save();render()},
 stadd(e){const st=G.stables.find(s=>s.id===e.dataset.id),sel=document.getElementById('stadd-'+e.dataset.id);if(!st||!sel||!sel.value||stableOf(sel.value))return;st.members.push(sel.value);save();render()},
 strem(e){removeFromStable(e.dataset.id);cleanFeuds();save();render()},
 stdisband(e){const st=G.stables.find(s=>s.id===e.dataset.id);if(st){G.stables=G.stables.filter(s=>s!==st);addNews('n.stdisband',{s:st.name});cleanFeuds()}save();render()},
 tdset(e){const d=tdraft();d[e.dataset.k]=e.dataset.v;render()},
 tdcreate(){const d=tdraft();const nm=(document.getElementById('tdname').value||d.name||'').trim().slice(0,30)||t('t.defaultname',{n:G.titles.length+1});
  G.titles.push({id:'T'+(G.uid++),kind:'custom',name:nm,prestige:d.prestige,teams:d.teams,strap:d.strap,plate:d.plate,g:d.g||'m',holders:[],since:G.week,custom:true});G.td=null;save();render()},
 tddelete(e){G.titles=G.titles.filter(x=>x.id!==e.dataset.id);G.card.forEach(m=>{if(m.title===e.dataset.id)m.title=''});save();render()}
};
const CHG={
 sf(e){START_F=e.value;render()},
 sort(e){G.sort=e.value;render()},
 rgen(e){G.rgen=e.value;render()},
 bigt(e){G.bigType=e.value;render()},
 pr(e){const p=G.promos[+e.dataset.i];if(!p)return;const k=e.dataset.k;p[k]=k==='at'?+e.value:e.value;if(p.a&&p.a===p.b)p.b='';render()},
 slot(e){const m=G.card[+e.dataset.i];m[e.dataset.side][+e.dataset.j]=e.value;fixMatch(m);render()},
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
  else if(k==='stA'){d.stA=e.value;const st=G.stables.find(s=>s.id===e.value);const kk=kd(d.sc);
   if(kk.member)d.mem=st?st.members[st.members.length-1]:'';else if(kk.pair){d.A=[st?st.members[0]:''];d.B=[st?st.members[1]:'']}}
  else if(k==='stB')d.stB=e.value;
  else if(k==='mem')d.mem=e.value;
  else if(k==='fmt'){d.fmt=+e.value;fdFill(d)}
  else if(k==='gen'){d.gen=e.value;const kk=kd(d.sc);if(kk.fed){d.A=genPool(d).sort((a,b)=>b.pop-a.pop).slice(0,SC[d.sc].n).map(w=>w.id)}else fdFill(d)}
  else if(k==='titleId'){d.titleId=e.value;d.A=[]}
  else if(k==='fedId')d.fedId=e.value;
  else{const side=k.charAt(0),idx=+k.slice(1);d[side][idx]=e.value}
  render()}
};
function init(){
 loadPackLS();
 document.addEventListener('click',ev=>{const el=ev.target.closest('[data-act]');if(!el||el.disabled)return;const fn=ACT[el.dataset.act];if(fn)fn(el)});
 document.addEventListener('change',ev=>{const el=ev.target.closest('[data-chg]');if(!el)return;const fn=CHG[el.dataset.chg];if(fn){fn(el);if(G&&el.dataset.chg!=='packfile'&&el.dataset.chg!=='sf')save()}});
 render();
}

