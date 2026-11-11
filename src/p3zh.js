// ---- Title lore (history, contenders, controversies, streaks) + hidden traits ----
function tqEnsure(){if(!G.tcq)G.tcq=[]}
function titleRecord(tt,wi,fin){
 tqEnsure();if(tt.holders.length){tt.log=tt.log||[];tt.log.unshift({n:names(tt.holders),s:tt.since||1,e:G.week,d:tt.def||0});tt.log=tt.log.slice(0,12)}
 if(fin==='dirty'&&tt.holders.length&&!G.tcq.some(x=>x.k==='contro'&&x.tid===tt.id))G.tcq.push({k:'contro',tid:tt.id,old:tt.holders.slice(),nw:wi.slice(0,tt.teams)})}
function titleDef(tt){tqEnsure();if([5,10,15].indexOf(tt.def)>=0&&!G.tcq.some(x=>x.k==='streak'&&x.tid===tt.id))G.tcq.push({k:'streak',tid:tt.id,n:tt.def})}
function titleBonus(m,A,B){
 if(!m.title)return 0;const tt=titleOf(m.title);if(!tt)return 0;let b=0;
 if(tt.rcl&&tt.rcl.ids.every(i=>A.concat(B).indexOf(i)>=0)&&G.week<=tt.rcl.due+4){b+=.3;const ch=tt.rcl.ids.map(W).filter(Boolean);ch.forEach(w=>evPop(w,.6));addNews('n.tt.rematch',{t:titleName(tt),w:names(tt.rcl.ids)});tt.rcl=null}
 return b}
function makeTitleFeud(tt,ch){
 if(!tt||tt.holders.length!==tt.teams)return false;const A=ch.slice(0,tt.teams);if(A.length!==tt.teams||!genderOK(tt,A))return false;
 const busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));if(A.some(i=>busy.has(i))||tt.holders.some(i=>busy.has(i)))return false;
 const f={id:'f'+(G.uid++),sc:'f13',A,B:tt.holders.slice(),stA:null,stB:null,stR:null,titleId:tt.id,fedId:null,mw:0,g:tt.teams,heat:SC.f13.h*3,matches:0,used:false};
 if(!feudMode(f))return false;flog(f,{k:'s'});G.feuds.push(f);addNews('n.feudstart',{a:sideLabel(f.A,f.stA),b:sideLabel(f.B,f.stB)});return true}
function contenders(tt,n){
 const hs=new Set(tt.holders),busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));
 const pool=healthy().filter(w=>!hs.has(w.id)&&!busy.has(w.id)&&!isGuest(w.id)&&genderOK(tt,[w.id])).sort((a,b)=>b.pop-a.pop);
 return tt.teams===1?pool.slice(0,n).map(w=>[w.id]):[pool.slice(0,tt.teams)].filter(g=>g.length===tt.teams).map(g=>g.map(w=>w.id))}
async function titleStory(){
 tqEnsure();const q=G.tcq.shift();
 if(q){const tt=titleOf(q.tid);if(!tt)return;
  if(q.k==='contro'){const v={t:titleName(tt),w:names(q.nw),o:names(q.old)};
   const i=await askGeneric(t('tt.contro.t',v),t('tt.contro.b',v),[{l:t('tt.contro.1',v)},{l:t('tt.contro.2',v)},{l:t('tt.contro.3',v)}]);
   const nw=q.nw.map(W).filter(Boolean),old=q.old.map(W).filter(Boolean);
   if(i===0){old.forEach(w=>evMood(w,-5));if(rnd()<.5)nw.forEach(w=>{if(w.role==='face')w.role='heel'});G.fed.pop=clamp(G.fed.pop+.1,2,100);if(rnd()<.45)makeTitleFeud(tt,q.old);addNews('n.tt.c1',v)}
   else if(i===1){tt.rcl={ids:q.old.slice(),due:G.week+6};old.forEach(w=>evMood(w,4));addNews('n.tt.c2',v)}
   else{tt.holders=[];tt.pdyn=clamp(prestOf(tt)-.15,1,5);old.concat(nw).forEach(w=>evMood(w,-8));addNews('n.tt.c3',v)}
   return}
  if(q.k==='streak'){const c=r10(wkRev()*.3),v={t:titleName(tt),w:names(tt.holders),n:q.n,m:money(c)};
   const i=await askGeneric(t('tt.streak.t',v),t('tt.streak.b',v),[{l:t('tt.streak.1',v),dis:G.fed.cash<c},{l:t('tt.streak.2',v)},{l:t('tt.streak.3',v)}]);
   if(i===0){G.fed.cash-=c;tt.pdyn=clamp(prestOf(tt)+.08,1,5);G.fed.pop=clamp(G.fed.pop+.3,2,100);tt.holders.forEach(id=>{if(W(id))evPop(W(id),1)});addNews('n.tt.s1',v)}
   else if(i===1){const c1=contenders(tt,1)[0];if(c1&&makeTitleFeud(tt,c1))addNews('n.tt.s2',v);else addNews('n.tt.s3',v)}
   else addNews('n.tt.s3',v);return}
  return}
 if(G.week%5===0&&rnd()<.5){
  const tt=pickR(G.titles.filter(x=>x.holders.length===x.teams&&x.holders.every(i=>W(i)&&W(i).fed===G.fed.id)&&!G.feuds.some(f=>f.titleId===x.id)));if(!tt)return;
  const cs=contenders(tt,3);if(!cs.length)return;
  const v={t:titleName(tt),h:names(tt.holders)};
  const i=await askGeneric(t('tt.cont.t',v),t('tt.cont.b',v),cs.map(c=>({l:t('tt.cont.o',{w:names(c)})})).concat([{l:t('tt.cont.no')}]));
  if(i<cs.length&&makeTitleFeud(tt,cs[i])){cs[i].forEach(id=>evMood(W(id),6));addNews('n.tt.cont',{w:names(cs[i]),t:titleName(tt)})}}}
function titlesHistHtml(){
 const L=G.titles.filter(tt=>tt.log&&tt.log.length||tt.holders.length);if(!L.length)return '';
 return '<div class="card stack"><h3>'+t('tt.lore')+'</h3>'+L.map(tt=>{const lg=tt.log||[];const best=lg.concat(tt.holders.length?[{n:names(tt.holders),s:tt.since||1,e:G.week,d:tt.def||0}]:[]).sort((a,b)=>(b.e-b.s)-(a.e-a.s))[0];
  return '<div class="stack" style="gap:2px;border-top:1px solid var(--line,#8884);padding-top:6px"><div class="row spread"><b>'+esc(titleName(tt))+'</b><span class="mute" style="font-size:12px">'+t('tt.def',{n:tt.def||0})+(tt.rcl?' · '+t('tt.rcl'):'')+'</span></div>'+
   (best?'<div class="mute" style="font-size:13px">'+t('tt.best',{w:best.n,n:Math.max(1,best.e-best.s)})+'</div>':'')+
   lg.slice(0,3).map(x=>'<div class="mute" style="font-size:12px">'+t('ibx.wk')+' '+x.s+'–'+x.e+' · '+esc(x.n)+' · '+t('tt.def',{n:x.d})+'</div>').join('')+'</div>'}).join('')+'</div>'}
Object.assign(D,{'tt.lore':['Historia i dziedzictwo pasów','Belt history and legacy'],'tt.def':['obrony: {n}','defences: {n}'],'tt.rcl':['klauzula rewanżu','rematch clause'],'tt.best':['Najdłuższe panowanie: {w} ({n} tyg.)','Longest reign: {w} ({n} wks)'],
 'tt.contro.t':['Kontrowersyjna zmiana mistrza','A controversial title change'],'tt.contro.b':['Pas „{t}” zmienił właściciela w niejasnych okolicznościach: {w} zabrał go {o}. Fani i szatnia są podzieleni.','The “{t}” belt changed hands in murky circumstances: {w} took it from {o}. Fans and the locker room are divided.'],
 'tt.contro.1':['Zatwierdź zmianę – niech się kłócą','Uphold the change – let them argue'],'tt.contro.2':['Nakaż rewanż w ciągu 6 tygodni','Order a rematch within 6 weeks'],'tt.contro.3':['Odbierz pas (vacat) – uderz w kontrowersję','Strip the belt (vacate) – hit the controversy head-on'],
 'tt.streak.t':['Seria obron: {n}','Defence streak: {n}'],'tt.streak.b':['{w} obronił „{t}” już {n} razy z rzędu. To historia dla fanów.','{w} has defended “{t}” {n} times running. A story for the fans.'],
 'tt.streak.1':['Zrób wielkie święto ({m})','Throw a big celebration ({m})'],'tt.streak.2':['Zapowiedz pretendenta i zacznij feud','Announce a contender and start a feud'],'tt.streak.3':['Zachowaj spokój','Keep calm'],
 'tt.cont.t':['Pretendent do pasa','A contender for the belt'],'tt.cont.b':['„{t}” trzyma {h}. Kto ma być następnym pretendentem?','{h} holds “{t}”. Who should be the next contender?'],'tt.cont.o':['{w}','{w}'],'tt.cont.no':['Na razie nikt','Nobody for now'],
 'n.tt.c1':['Zmiana mistrza „{t}” zatwierdzona – kontrowersje trwają.','The “{t}” title change stands – the controversy goes on.'],'n.tt.c2':['Rewanż o „{t}” zlecony w ciągu 6 tygodni.','A rematch for “{t}” ordered within 6 weeks.'],'n.tt.c3':['„{t}” zwakowany po kontrowersyjnej zmianie.','“{t}” vacated after a controversial change.'],
 'n.tt.s1':['Seria obron {w} świętowana – prestiż „{t}” rośnie.','{w}\'s defence streak celebrated – “{t}” prestige rises.'],'n.tt.s2':['Po serii obron wchodzi pretendent do „{t}”.','After a defence streak, a contender enters for “{t}”.'],'n.tt.s3':['Seria obron {w} mija bez wielkiego świętowania.','{w}\'s defence streak passes quietly.'],
 'n.tt.cont':['{w} zostaje pretendentem do „{t}”.','{w} becomes the contender for “{t}”.'],'n.tt.rematch':['Rewanż o „{t}”: {w} dostają swoją szansę.','Rematch for “{t}”: {w} get their chance.']});
// ---------- hidden traits ----------
const TRAITS=['iron','glass','clutch','ego','pro','troub','mentor'];
function trOf(w){if(w.tr===undefined)w.tr=rnd()<.55?pickR(TRAITS):'';return w.tr}
function trInj(w){const x=trOf(w);return x==='iron'?.6:x==='glass'?1.5:1}
function trBonus(m,A,B){const ids=A.concat(B);let b=0;const big=!!m.title||(G.card&&G.card.indexOf(m)===G.card.length-1);
 ids.forEach(i=>{const w=W(i);if(!w)return;const x=trOf(w);if(x==='clutch'&&big)b+=.12;else if(x==='pro')b+=.05;else if(x==='ego'&&!big)b-=.05});return clamp(b,-.15,.3)}
function trTag(w){
 if(w.farewell)return '';const x=trOf(w);
 if(w.trv)return x?'<span class="tag" style="border-style:dashed" title="'+esc(t('tr.d.'+x))+'">'+t('tr.'+x)+'</span>':'';
 return w.fed===G.fed.id?'<span class="tag mute" style="border-style:dashed" title="'+esc(t('tr.hid'))+'">❓</span>':''}
function trWeekly(){
 const lvl=scoutLvl();
 mine().forEach(w=>{const x=trOf(w);
  if(!w.trv){if(w.sinceF!==G.fed.id){w.sinceF=G.fed.id;w.since=G.week}if(G.week-w.since>=18-lvl*.06){w.trv=1;if(x){addNews('n.tr.rev',{w:w.name,x:t('tr.'+x)});ibxPush('m',t('tr.rev'),w.name+': '+t('tr.'+x)+' – '+t('tr.d.'+x))}}}
  if(x==='ego'&&w.pop>=40&&!G.titles.some(tt=>tt.holders.indexOf(w.id)>=0))evMood(w,-1.2);
  else if(x==='pro'&&w.morale<70)evMood(w,1);
  else if(x==='troub'&&rnd()<.015){const o=pickR(mine().filter(z=>z!==w&&!z.farewell));if(o){evMood(o,-3);evMood(w,-2);addNews('n.tr.troub',{w:w.name,o:o.name})}}
  else if(x==='mentor'&&rnd()<.03){const y=mine().filter(z=>z!==w&&z.age<=25).sort((a,b)=>a.ring-b.ring)[0];if(y){y.ring=clamp(y.ring+1,1,99);addNews('n.tr.mentor',{w:w.name,y:y.name})}}})}
Object.assign(D,{'tr.iron':['Żelazny','Ironclad'],'tr.glass':['Szklany','Fragile'],'tr.clutch':['Na wielkie okazje','Big-match player'],'tr.ego':['Gwiazdorskie ego','Star ego'],'tr.pro':['Profesjonalista','Pro'],'tr.troub':['Awanturnik','Troublemaker'],'tr.mentor':['Mentor','Mentor'],
 'tr.d.iron':['mniejsze ryzyko kontuzji','lower injury risk'],'tr.d.glass':['większe ryzyko kontuzji','higher injury risk'],'tr.d.clutch':['lepsze walki o pas i w main evencie','better in title matches and main events'],'tr.d.ego':['traci humor, gdy nie jest mistrzem; słabsze walki w środku karty','loses morale when not champion; weaker mid-card matches'],
 'tr.d.pro':['stabilny humor, drobny plus w każdej walce','steady morale, a small plus in every match'],'tr.d.troub':['czasem psuje humor w szatni','sometimes sours the locker room'],'tr.d.mentor':['pomaga młodym w rozwoju','helps youngsters develop'],
 'tr.hid':['Ukryta cecha – ujawni się z czasem lub po rozmowie.','Hidden trait – revealed over time or after a talk.'],'tr.rev':['Ujawniona cecha','Trait revealed'],
 'n.tr.rev':['{w} ma cechę: {x}.','{w} has the trait: {x}.'],'n.tr.troub':['{w} wszczął awanturę z {o} w szatni.','{w} started a row with {o} in the locker room.'],'n.tr.mentor':['{w} uczy młodego {y} – widać postęp.','{w} teaches young {y} – progress shows.']});
E('lockertalk','Rozmowa w szatni','Locker-room talk','Możesz porozmawiać z {w} jeden na jeden i lepiej go poznać ({m}).','You can have a one-on-one with {w} and get to know them better ({m}).',[['Porozmawiaj ({m})','Have the talk ({m})'],['Nie teraz','Not now']]);
Object.assign(D,{'n.lt1':['Rozmowa z {w}: {x}.','Talk with {w}: {x}.'],'n.lt1n':['Rozmowa z {w} nie wykazała nic szczególnego.','The talk with {w} revealed nothing special.'],'n.lt2':['Rozmowa z {w} odłożona.','The talk with {w} was postponed.']});
Object.assign(WEV,{async lockertalk(){const w=pickR(mine().filter(x=>!x.trv&&!x.farewell));if(!w)return false;const c=r10(wkRev()*.08),v={w:w.name,m:money(c)};const i=await evx('lockertalk',v,['1','2'],[G.fed.cash<c,false]);
 if(i===0){G.fed.cash-=c;w.trv=1;evMood(w,3);const x=trOf(w);addNews(x?'n.lt1':'n.lt1n',{w:w.name,x:x?t('tr.'+x):''})}else addNews('n.lt2',v);return true}});
