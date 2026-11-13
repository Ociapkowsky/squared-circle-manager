;/* ===== "Fill up" - keep the matches the player booked and add auto-booked ones ===== */
(function(){
Object.assign(D,{'sh.fill':['Uzupełnij automatycznie','Fill up automatically'],
'sh.fillt':['Zostawia Twoje walki i dokłada kilka z auto-układu (bez powtarzania zawodników).','Keeps your matches and adds a few from the auto-book (no repeated wrestlers).'],
'sh.fillfull':['Karta jest już pełna (max 6 walk).','The card is already full (6 matches max).'],
'sh.fillnone':['Nie ma już wolnych zawodników do uzupełnienia karty.','No free wrestlers left to fill the card.'],
'sh.filled':['Dodano walk: {n}.','Matches added: {n}.']});
const _vs7=vShow;vShow=function(){let h=_vs7.apply(this,arguments);try{const n=G.card.length;if(n>=1&&n<6&&!RUN){h=h.replace('<button class="btn" data-act="auto">','<button class="btn gold" data-act="fillcard" title="'+esc(t('sh.fillt'))+'">'+esc(t('sh.fill'))+'</button><button class="btn" data-act="auto">')}}catch(e){}return h};
ACT.fillcard=function(){if(RUN)return;const keep=G.card.slice();if(keep.length>=6){G.shmsg='sh.fillfull';render();return}
 const promos=(G.promos||[]).slice();const hide=new Set();keep.forEach(m=>{const s=sides(m);s.A.concat(s.B).forEach(x=>x&&hide.add(x))});
 const hid=[];hide.forEach(id=>{const w=W(id);if(w){hid.push([w,w.injury||0]);w.injury=999}});
 let added=[];try{autoBook();added=G.card.slice()}finally{hid.forEach(([w,i])=>{w.injury=i})}
 added=added.filter(m=>matchReady(m)).slice(0,6-keep.length);
 const wt=m=>{const s=sides(m);return s.A.concat(s.B).reduce((x,i)=>x+W(i).pop,0)/Math.max(1,s.A.length+s.B.length)};
 added.sort((a,b)=>wt(a)-wt(b));
 G.card=added.concat(keep);G.promos=promos;
 G.shmsg=added.length?'':'sh.fillnone';save();render()};
})();
if(typeof normTexts==="function")normTexts();
