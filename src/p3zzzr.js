/* ===== Time limits, multi-fall matches, title shots (balance set by eye) ===== */
const STL={limit60:.15,ironman:.2,allnight:.15,diffstyle:.2};
const STFALLS={twofalls:1,threestages:1,ironman:1,allnight:1};
function shotOk(w){return !!(w&&G.shots&&G.shots[w.id]>=G.week)}
const _fmFl=finalizeMatch;
finalizeMatch=function(m,res,pos,total,fo){
 let tl=false;
 try{const p=STL[m.stip];if(p&&rnd()<p){res.finish='draw';tl=true}}catch(e){}
 let parts=[],oc=null,sh=[];
 try{oc=outcome(m);parts=oc.wi.concat(oc.li).map(W).filter(Boolean);if(m.title)sh=parts.filter(w=>w.fed===G.fed.id&&shotOk(w))}catch(e){}
 const r=_fmFl(m,res,pos,total,fo);
 try{
  let add=0,note='';const ST=(m.stip||'');
  if(tl){add+=.25;note=t('tl.draw')}
  else if(r.finish!=='draw'&&(r.finish||m.finish)!=='draw'){
   if(ST==='notimelimit'){add+=.2}
   if(ST==='twofalls'){const s=rnd()<.55?'2-0':'2-1';if(s==='2-1'){add+=.25;parts.forEach(w=>{w.fatigue=clamp(w.fatigue+4,0,100)})}note=t('fl.score',{s})}
   else if(ST==='threestages'){const pool=['none','tables','cage','ladder','lms','extreme','submission'],a=pickR(pool),b=pickR(pool.filter(x=>x!==a)),c=pickR(pool.filter(x=>x!==a&&x!==b));const s=rnd()<.5?'2-0':'2-1';add+=.3;parts.forEach(w=>{w.fatigue=clamp(w.fatigue+8,0,100);if(!w.injury&&rnd()<.12)injure(w,2+Math.floor(rnd()*3),false)});note=t('fl.stages',{a:t('stip.'+a),b:t('stip.'+b),c:s==='2-1'?t('stip.'+c):'-',s})}
   else if(ST==='ironman'||ST==='allnight'){const lo=1+Math.floor(rnd()*3),s=(lo+1+Math.floor(rnd()*2))+'-'+lo;add+=.2;parts.forEach(w=>{w.fatigue=clamp(w.fatigue+5,0,100)});note=t('fl.score',{s})}
  }
  if(r.finish!=='draw'&&STFX[m.stip]==='shot'&&oc){const mw=oc.wi.map(W).filter(w=>w&&w.fed===G.fed.id);if(!G.shots)G.shots={};mw.forEach(w=>{G.shots[w.id]=G.week+12})}
  if(sh.length){add+=.2;const tt=titleOf(m.title);sh.forEach(w=>{delete G.shots[w.id];if(tt&&tt.holders.indexOf(w.id)>=0){w.pop=clamp(w.pop+1,1,100);w.morale=clamp(w.morale+6,0,100);addNews('n.shotwin',{w:w.name})}})}
  if(add)r.stars=Math.round(clamp(r.stars+add,.5,5)*4)/4;
  if(note)r.sknote=note;
 }catch(e){}
 return r};
const _flSk=finLine;finLine=function(m,oc,res){let a=_flSk(m,oc,res);if(res&&res.sknote)a=(a?a+' ':'')+res.sknote;return a};
function shTag(w){return shotOk(w)?'<span class="tag" style="color:var(--teal);border-color:var(--teal)" title="'+esc(t('sh.shotH'))+'">🎯 '+t('sh.shot')+'</span>':''}
const _ptSh=potTag;potTag=function(w){return _ptSh(w)+shTag(w)};
Object.assign(D,{'tl.draw':['Remis czasowy: czas minął bez rozstrzygnięcia.','Time-limit draw: time ran out with no winner.'],'fl.score':['Wynik: {s}.','Score: {s}.'],'fl.stages':['Etapy: {a}, {b}, {c}. Wynik: {s}.','Stages: {a}, {b}, {c}. Score: {s}.'],
 'sh.shot':['szansa na pas','title shot'],'sh.shotH':['Wygrał eliminator: ma 12 tygodni na walkę o pas.','Won an eliminator: 12 weeks to use the title shot.'],
 'n.shotwin':['{w} zdobywa pas po szansie z eliminatora!','{w} wins the title from an eliminator shot!'],
 'stipd.limit60':['Limit 60 minut. Ok. 15% szans na remis czasowy (wtedy nikt nie wygrywa).','60-minute limit. About a 15% chance of a time-limit draw (then nobody wins).'],
 'stipd.notimelimit':['Bez limitu czasu: brak remisów, a wielki rewanż zyskuje +0,2★.','No time limit: no draws, and a huge rematch gains +0.2★.'],
 'stipd.ironman':['Walka na punkty: wynik np. 3-2, +0,2★, większe zmęczenie. Ok. 20% szans na remis.','A points match: a score like 3-2, +0.2★, more fatigue. About a 20% chance of a draw.'],
 'stipd.allnight':['Iron Man przez cały odcinek: wynik w punktach, +0,2★, zmęczenie. Ok. 15% szans na remis.','An Iron Man for the whole episode: a points score, +0.2★, fatigue. About 15% chance of a draw.'],
 'stipd.diffstyle':['Starcie różnych stylów; ok. 20% szans na remis (np. ugodowy wynik).','A clash of styles; about a 20% chance of a draw.'],
 'stipd.twofalls':['Do dwóch wygranych: wynik 2-0 lub 2-1. Wynik 2-1 daje +0,25★ i większe zmęczenie.','Best of three falls: 2-0 or 2-1. A 2-1 result gives +0.25★ and more fatigue.'],
 'stipd.threestages':['Trzy etapy z losowymi stypulacjami, do dwóch wygranych. +0,3★, duże zmęczenie, ryzyko kontuzji.','Three stages with random stipulations, best of three. +0.3★, heavy fatigue, injury risk.'],
 'stipd.eliminator':['Pas nie jest na szali. Zwycięzca dostaje 12 tygodni na szansę na pas: walka o pas z nim ma +0,2★, a jego wygrana daje bonus.','The title is not at stake. The winner gets 12 weeks of a title shot: a title match with him gets +0.2★ and winning gives a bonus.']});
