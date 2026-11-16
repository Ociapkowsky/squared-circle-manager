function feudForm(){
 const d=G.fd||(G.fd=fdDefaults('betrayal'));const sp=SC[d.sc],k=kd(d.sc);const pool=mine().sort((a,b)=>a.name.localeCompare(b.name));
 const wsel=(key,cur,list)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+(list||pool).map(w=>'<option value="'+w.id+'"'+(w.id===cur?' selected':'')+'>'+esc(w.name)+'</option>').join('')+'</select>';
 const ssel=(key,cur)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+G.stables.map(s=>'<option value="'+s.id+'"'+(s.id===cur?' selected':'')+'>'+esc(s.name)+' ('+s.members.length+')</option>').join('')+'</select>';
 let h='<div class="card stack"><h3>'+t('f.new')+'</h3><div><label class="px" for="fsc">'+t('f.scn')+'</label><select id="fsc" class="field" data-chg="fd" data-k="sc">'+
  SC_CATS.map(c=>'<optgroup label="'+esc(t('sc.cat'+c))+'">'+Object.keys(SC).filter(id=>SC[id].cat===c).map(id=>'<option value="'+id+'"'+(d.sc===id?' selected':'')+'>'+esc(t('sc.'+id))+' · ★'+SC[id].h+'</option>').join('')+'</optgroup>').join('')+'</select></div>';
 h+='<div class="note">'+esc(t('sc.'+d.sc+'.d'))+'</div><div class="row" style="gap:8px"><span class="px">'+t('f.heatlvl')+'</span><span class="gold">'+heatStars(sp.h)+'</span></div>';
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
  else{let ch='';for(let i=0;i<(tt?tt.teams:1);i++)ch+=wsel('A'+i,d.A[i],pool.filter(w=>!tt||tt.holders.indexOf(w.id)<0));
   h+='<div class="grid g2"><div><div class="px">'+t('f.titlesel')+'</div><select class="field" data-chg="fd" data-k="titleId"><option value="">—</option>'+tts.map(x=>'<option value="'+x.id+'"'+(x.id===d.titleId?' selected':'')+'>'+esc(titleName(x))+'</option>').join('')+'</select>'+(tt?'<div class="note">'+esc(names(tt.holders))+'</div>':'')+'</div><div class="stack"><div class="px">'+(tt&&tt.teams===2?t('f.challengers'):t('f.challenger'))+'</div>'+ch+'</div></div>'}}
 else if(k.fed){const rvs=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id));let mine2='';for(let i=0;i<sp.n;i++)mine2+=wsel('A'+i,d.A[i]);
  const rvw=d.fedId?topOf(d.fedId,sp.n):[];
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.rivalfed')+'</div><select class="field" data-chg="fd" data-k="fedId"><option value="">—</option>'+rvs.map(r=>'<option value="'+r.id+'"'+(r.id===d.fedId?' selected':'')+'>'+esc(r.name)+' ('+t('tier.'+r.tier)+')</option>').join('')+'</select><div class="px">'+t('f.theirs')+'</div>'+avsHtml(rvw)+'<div class="note">'+esc(names(rvw))+'</div></div><div class="stack"><div class="px">'+t('f.yours')+'</div>'+mine2+'</div></div><div class="note">'+t('f.guest')+'</div>'}
 else{let a='',b='';for(let i=0;i<k.a;i++)a+=wsel('A'+i,d.A[i]);for(let i=0;i<k.b;i++)b+=wsel('B'+i,d.B[i]);
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.sideA')+'</div>'+a+'</div><div class="stack"><div class="px">'+t('f.sideB')+'</div>'+b+'</div></div>'}
 if(G.fdmsg)h+='<div class="note neg">'+t(G.fdmsg)+'</div>';
 return h+'<div><button class="btn gold" data-act="newfeud">'+t('f.create')+'</button></div></div>';
}
function vFeuds(){
 let h='<div class="top"><div><h2>'+t('f.title')+'</h2><div class="mute" style="max-width:66ch">'+t('f.hint')+'</div></div></div>';
 if(!G.feuds.length)h+='<div class="card mute">'+t('f.none')+'</div>';
 h+='<div class="grid g2">'+G.feuds.map((f,i)=>{const sp=SC[f.sc];if(!sp)return '';const ch=f.heat>=70?2:f.heat>=35?1:0;const md=feudMode(f);const rv=f.fedId?G.rivals.find(r=>r.id===f.fedId):null;
  return '<div class="card stack"><div class="row spread"><b>'+esc(t('sc.'+f.sc))+'</b><span class="tag">'+t('f.ch'+ch)+'</span></div>'+
   '<div class="mute" style="font-size:14px">'+esc(t('sc.'+f.sc+'.d'))+'</div>'+
   '<div class="row spread" style="flex-wrap:nowrap;align-items:flex-start"><div class="stack" style="gap:4px;min-width:0"><b style="overflow-wrap:anywhere">'+esc(sideLabel(f.A,f.stA))+'</b>'+avsHtml(f.A)+'</div><span class="px">VS</span><div class="stack" style="gap:4px;min-width:0;text-align:right"><b style="overflow-wrap:anywhere">'+esc(rv?rv.name+': '+names(f.B):sideLabel(f.B,f.stB))+'</b>'+avsHtml(f.B)+'</div></div>'+
   '<div><div class="lbl"><span>'+t('f.live')+'</span><span class="gold">'+heatStars(liveStars(f.heat))+'</span></div>'+bar(f.heat,'r')+'</div>'+
   '<div class="lbl"><span>'+t('f.heatlvl')+'</span><span>'+heatStars(sp.h)+'</span></div>'+
   (sp.stip?'<div class="note">'+t('f.suggest',{s:t('stip.'+sp.stip)})+'</div>':'')+
   (D['sc.'+f.sc+'.e']?'<div class="note">'+t('sc.'+f.sc+'.e')+'</div>':'')+
   ['retire','fire'].map(e=>sp.end===e?'<div class="note neg">'+t('f.warn.'+e)+'</div>':'').join('')+
   (f.heat>=70&&md?'<div class="note gold">'+t('f.fullmatch',{n:f.A.length+f.B.length,m:t('mode.'+md)})+'</div>':'')+
   '<div class="row"><button class="btn sm danger" data-act="endfeud" data-i="'+i+'">'+t('f.end')+'</button></div></div>'}).join('')+'</div>';
 return h+feudForm();
}
