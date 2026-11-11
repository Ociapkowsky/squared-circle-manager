/* ===== Stipulation consequences (stakes, humiliation, feud heat) — set by eye ===== */
const STFX={};
[['leave','loserleaves lltecw'],['retire','career'],['unmask','maskhair apuestas domo'],['humil','kissfoot custody hogpen pudding'],
 ['heat','iquit firstblood texas texasecw taipei doomsday lightsout hangman monstersball dogcollar strap casket buried lastrites grave ambulance hiac kennel inferno barbcage'],
 ['shot','eliminator'],['both','titletitle']].forEach(r=>r[1].split(' ').forEach(k=>{STFX[k]=r[0]}));
function stqPush(k,id){if(!G.stq)G.stq=[];if(!G.stq.some(x=>x.k===k&&x.id===id))G.stq.push({k,id})}
const _fmStk=finalizeMatch;
finalizeMatch=function(m,res,pos,total,fo){
 const r=_fmStk(m,res,pos,total,fo);
 try{const fx=STFX[m.stip];if(!fx||!r||r.finish==='draw'||(r.finish||m.finish)==='draw')return r;
  const{wi,li}=outcome(m);const mineL=li.map(W).filter(w=>w&&w.fed===G.fed.id),mineW=wi.map(W).filter(w=>w&&w.fed===G.fed.id);
  if(fx==='leave')mineL.forEach(w=>stqPush('leave',w.id));
  else if(fx==='retire')mineL.forEach(w=>stqPush('retire',w.id));
  else if(fx==='unmask'){mineL.forEach(w=>{if(w.look){w.look.hair='bald';w.look.beard='none'}w.pop=clamp(w.pop-(w.style==='lucha'?1.5:.3),1,100);w.morale=clamp(w.morale-8,0,100);addNews('n.stkmask',{w:w.name})});mineW.forEach(w=>{w.pop=clamp(w.pop+1,1,100);w.morale=clamp(w.morale+4,0,100)})}
  else if(fx==='humil'){mineL.forEach(w=>{w.morale=clamp(w.morale-6,0,100);w.pop=clamp(w.pop-.3,1,100)});mineW.forEach(w=>{w.morale=clamp(w.morale+4,0,100)})}
  else if(fx==='heat'){if(fo&&fo.f)fo.f.heat=clamp(fo.f.heat+6,0,100)}
  else if(fx==='shot'){mineW.forEach(w=>{w.pop=clamp(w.pop+.6,1,100);w.morale=clamp(w.morale+4,0,100);addNews('n.stkshot',{w:w.name})})}
  else if(fx==='both'){mineW.forEach(w=>{w.pop=clamp(w.pop+1.2,1,100);w.morale=clamp(w.morale+5,0,100)})}
 }catch(e){}
 return r};
const _fsStk=finishShow;
finishShow=function(out){const r=_fsStk(out);
 try{const q=G.stq||[];G.stq=[];q.forEach(x=>{const w=W(x.id);if(!w||w.fed!==G.fed.id)return;
  if(x.k==='leave'){addNews('n.stkleave',{w:w.name});releaseW(w)}
  else if(x.k==='retire'){w.fed='RET';addNews('n.retire',{w:w.name});purgeW(w.id)}})}catch(e){}
 return r};
Object.assign(D,{'n.stkleave':['{w} przegrał stawkę i opuszcza federację (trafia do wolnych agentów).','{w} lost the stake and leaves the promotion (now a free agent).'],'n.stkmask':['{w} przegrał stawkę i traci maskę/włosy.','{w} lost the stake and loses mask/hair.'],'n.stkshot':['{w} wygrywa eliminator i zdobywa szansę na pas.','{w} wins the eliminator and earns a title shot.'],
 'stipd.loserleaves':['Prawdziwa stawka: przegrany opuszcza federację po gali (trafia do wolnych agentów, możesz go potem odkupić).','A real stake: the loser leaves the promotion after the show (becomes a free agent you can sign again).'],
 'stipd.lltecw':['Prawdziwa stawka: przegrany opuszcza federację po gali (trafia do wolnych agentów).','A real stake: the loser leaves the promotion after the show (becomes a free agent).'],
 'stipd.career':['Prawdziwa stawka: przegrany KOŃCZY KARIERĘ na stałe. Używaj rozważnie!','A real stake: the loser RETIRES for good. Use carefully!'],
 'stipd.maskhair':['Przegrany traci włosy (zostaje łysy) i część popularności, a zwycięzca zyskuje.','The loser is shaved bald and loses some popularity, while the winner gains.'],
 'stipd.apuestas':['Przegrany traci maskę/włosy: spadek popularności (luchadorzy najbardziej), zwycięzca zyskuje.','The loser loses mask/hair: a popularity drop (luchadors most), the winner gains.'],
 'stipd.domo':['Ostatni w środku traci maskę/włosy i część popularności.','The last one inside loses mask/hair and some popularity.'],
 'stipd.eliminator':['Pas nie jest na szali, ale zwycięzca zyskuje popularność i pewność siebie jako pretendent.','The title is not at stake, but the winner gains popularity and confidence as the contender.'],
 'stipd.titletitle':['Walka o dwa pasy: zwycięzca zyskuje dużą popularność.','A match for two titles: the winner gains a lot of popularity.']});
