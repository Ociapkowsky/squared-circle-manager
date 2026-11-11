// ---- Feud expansion: chapters (beats), finale stakes, legacy, rematches ----
const fbPair=f=>{const ids=f.mw?f.A:[f.A[0],f.B[0]];const X=W(ids[0]),Y=W(ids[1]);return X&&Y?[X,Y]:null};
const fbMine=f=>f.A.concat(f.B).some(i=>W(i)&&W(i).fed===G.fed.id);
async function fbBeat(f){
 const p=fbPair(f);if(!p)return false;const [X,Y]=p,c=f.chp||0,ev=SC[f.sc].ev||'crowd';
 const isSt=!!(f.stA||f.stB);const v={f:fLabel(f),s:t('sc.'+f.sc),a:isSt?sideLabel(f.A,f.stA):X.name,b:isSt?sideLabel(f.B,f.stB):Y.name,x:X.name,y:Y.name},k='fb.'+(isSt?'stable':ev)+'.'+(c+1)+'.';
 const i=await askGeneric(t(k+'t',v),t(k+'b',v),[{l:t(k+'1',v)},{l:t(k+'2',v)},{l:t(k+'3',v)}]);
 const up=c?10:14;f.chp=c+1;let nk='n.fb.ok';
 if(i===0){if(rnd()<.65){f.heat=clamp(f.heat+up,0,100);[X,Y].forEach(w=>evPop(w,.5));nk='n.fb.good'}else{f.heat=clamp(f.heat-5,0,100);[X,Y].forEach(w=>evMood(w,-3));nk='n.fb.bad'}}
 else if(i===1){f.heat=clamp(f.heat+6,0,100);[X,Y].forEach(w=>evMood(w,2))}
 else{
  if(isSt){const sid=f.stA||f.stB,stb=G.stables.find(z=>z.id===sid),mem=stb&&stb.members.map(W).filter(w=>w&&w.fed===G.fed.id).sort((p,q)=>p.pop-q.pop)[0];if(mem&&stb.members.length>2){v.x=mem.name;removeFromStable(mem.id);evMood(mem,-4);addNews('n.fb.defect',{w:mem.name,s:stb.name});nk='n.fb.defect'}f.heat=clamp(f.heat+12,0,100)}
  else if(ev==='turn'){X.role=X.role==='heel'?'face':'heel';f.heat=clamp(f.heat+10,0,100);relLink(X,Y,'rv');nk='n.fb.turn'}
  else if(ev==='after'){const ok=await joinEvent(f);f.heat=clamp(f.heat+(ok?4:8),0,100);nk='n.fb.third'}
  else if(ev==='crowd'){const ss=Object.keys(STIPS).filter(s=>s!=='none'&&!STNEED[s]&&G.fed.tier>=STIPS[s].tier&&lvlOf(s)<=maxLvl());if(ss.length)f.fav=pickR(ss);f.heat=clamp(f.heat+8,0,100);nk='n.fb.crowd'}
  else{relLink(X,Y,'rv');f.heat=clamp(f.heat+10,0,100);nk='n.fb.rv'}}
 flog(f,{k:'e',key:nk,x:v});addNews(nk,v);return true}
async function fbStake(f){
 const p=fbPair(f);if(!p)return false;const [X,Y]=p,c=r10(wkRev()*.3),v={f:fLabel(f),s:t('sc.'+f.sc),m:money(c)};
 const i=await askGeneric(t('fb.stake.t',v),t('fb.stake.b',v),[{l:t('fb.stake.0',v)},{l:t('fb.stake.1',v)},{l:t('fb.stake.2',v)},{l:t('fb.stake.3',v),dis:G.fed.cash<c}]);
 f.stake=['none','leave','push','prize'][i];
 if(i>0){f.heat=clamp(f.heat+4,0,100);addNews('n.fb.stake'+i,v)}if(i===3)G.fed.cash-=c;return true}
function feudStake(m){const fo=feudOf(m);return fo&&fo.f.stake&&fo.f.stake!=='none'&&fo.cov>=.99?.25:0}
async function feudChapters(){
 ibx();if(!G.rem)G.rem=[];if(!G.fhist)G.fhist=[];
 for(const r of G.rem.slice()){if(r.due>G.week)continue;G.rem=G.rem.filter(x=>x!==r);
  const a=W(r.a),b=W(r.b);if(!a||!b||a.fed!==G.fed.id||b.fed!==G.fed.id||a.injury||b.injury)continue;
  if(G.feuds.some(f=>f.A.concat(f.B).some(i=>i===r.a||i===r.b)))continue;
  const v={a:a.name,b:b.name};const i=await askGeneric(t('fb.rem.t',v),t('fb.rem.b',v),[{l:t('fb.rem.1')},{l:t('fb.rem.2')}]);
  if(i===0){const f={id:'f'+(G.uid++),sc:'revenge',A:[a.id],B:[b.id],stA:null,stB:null,stR:null,titleId:null,fedId:null,mw:0,g:1,heat:SC.revenge.h*3+8,matches:0,used:false,chp:0};
   if(feudMode(f)){flog(f,{k:'s'});G.feuds.push(f);addNews('n.fb.remstart',v)}}
  return}
 const fs=shuffle(G.feuds.filter(f=>!f.fedId&&SC[f.sc]&&fbMine(f)));
 for(const f of fs){
  if(f.heat>=70&&f.stake==null&&(f.matches||0)>=2){await fbStake(f);return}
  const need=f.heat>=60?2:f.heat>=30?1:0;if((f.chp||0)<need&&(f.matches||0)>=1){if(await fbBeat(f))return}}}
function feudAfter(f,aWon,li){
 try{if(!G.fhist)G.fhist=[];const W1=aWon?f.A:f.B,L1=aWon?f.B:f.A;
  G.fhist.unshift({w:G.week,sc:f.sc,t:f.mw?fLabel(f):(aWon?sideLabel(f.A,f.stA):sideLabel(f.B,f.stB))+' > '+(aWon?sideLabel(f.B,f.stB):sideLabel(f.A,f.stA)),st:f.stake||'none',m:f.matches||0});G.fhist=G.fhist.slice(0,30);
  G.feudDone=(G.feudDone||0)+1;
  const wins=W1.map(W).filter(Boolean),los=L1.map(W).filter(Boolean);
  if(f.stake==='leave'&&(f.stA||f.stB)){const st=G.stables.find(z=>z.id===(aWon?f.stB:f.stA));const m=st&&st.members.map(W).filter(Boolean).sort((p,q)=>p.pop-q.pop)[0];if(m&&st.members.length>2){removeFromStable(m.id);addNews('n.fb.defect',{w:m.name,s:st.name})}}
  if(f.stake==='leave')los.forEach(w=>{if(w.fed===G.fed.id){suspend(w,4);evMood(w,-6)}});
  if(f.stake==='leave'||f.stake==='push')wins.forEach(w=>evPop(w,f.stake==='push'?2.2:1.2));
  if(f.stake==='prize')wins.forEach(w=>{evMood(w,8);w.loyal=Math.min(100,(w.loyal||50)+4)});
  if(f.stake&&f.stake!=='none')G.fed.pop=clamp(G.fed.pop+.3,2,100);
  if(!f.mw&&f.A.length===1&&f.B.length===1&&wins[0]&&los[0]){relLink(wins[0],los[0],'rv');
   if(rnd()<.4){if(!G.rem)G.rem=[];G.rem.push({a:wins[0].id,b:los[0].id,due:G.week+8+Math.floor(rnd()*9)})}}
 }catch(e){}}
{const _ae=applyEnd;applyEnd=function(f,aWon,li){_ae(f,aWon,li);feudAfter(f,aWon,li)}}
function feudHistHtml(){
 if(!G||!G.fhist||!G.fhist.length)return '';
 return '<div class="card stack"><h3>'+t('fb.hist')+' ('+(G.feudDone||0)+')</h3>'+G.fhist.slice(0,12).map(x=>'<div class="row spread" style="gap:8px"><span><b>'+esc(t('sc.'+x.sc))+'</b> <span class="mute">· '+esc(x.t)+'</span></span><span class="mute" style="font-size:12px">'+(x.st!=='none'?t('fb.st.'+x.st)+' · ':'')+t('ibx.wk')+' '+x.w+'</span></div>').join('')+(G.rem&&G.rem.length?'<div class="mute" style="font-size:13px">'+t('fb.remq',{n:G.rem.length})+'</div>':'')+'</div>'}
// ---- texts ----
Object.assign(D,{'fb.chn':['Rozdziały: {n}/2','Chapters: {n}/2'],'fb.hist':['Historia feudów','Feud history'],'fb.remq':['Zapowiadane rewanże: {n}','Rematches in the works: {n}'],
 'fb.st.leave':['przegrany odchodzi','loser leaves'],'fb.st.push':['push dla zwycięzcy','winner push'],'fb.st.prize':['nagroda','prize'],
 'fb.stake.t':['Stawka finału feudu','Finale stakes'],'fb.stake.b':['Feud „{s}”: {f} dojrzał do finału. Co jest na szali?','The “{s}” feud: {f} is ready for its finale. What is at stake?'],
 'fb.stake.0':['Zwykła walka, bez stawki','A normal match, no stakes'],'fb.stake.1':['Przegrany znika na 4 tygodnie','The loser disappears for 4 weeks'],'fb.stake.2':['Zwycięzca dostaje duży push','The winner gets a big push'],'fb.stake.3':['Nagroda dla zwycięzcy ({m})','A prize for the winner ({m})'],
 'fb.rem.t':['Rewanż?','Rematch?'],'fb.rem.b':['Fani domagają się rewanżu {a} vs {b}. Stare rany jeszcze się nie zagoiły.','Fans demand a rematch of {a} vs {b}. The old wounds have not healed.'],'fb.rem.1':['Odpal nowy feud','Start a new feud'],'fb.rem.2':['Zostaw przeszłość za sobą','Leave the past behind'],
 'n.fb.good':['Rozdział feudu „{s}” trafia w punkt: {a} i {b} rozpalają trybuny.','A chapter of “{s}” hits home: {a} and {b} ignite the crowd.'],'n.fb.bad':['Pomysł w feudzie „{s}” nie wypalił – fani się nudzą.','An idea in “{s}” missed – fans are bored.'],'n.fb.ok':['Feud „{s}” rozwija się spokojnie.','“{s}” develops steadily.'],
 'n.fb.turn':['W feudzie „{s}” {a} zmienia oblicze!','In “{s}”, {a} changes face!'],'n.fb.third':['Feud „{s}” się komplikuje – wchodzi nowa strona.','“{s}” gets complicated – a new party enters.'],'n.fb.crowd':['Fani wybrali stypulację finału w feudzie „{s}”.','Fans picked the finale stipulation in “{s}”.'],'n.fb.rv':['{a} i {b} to teraz prawdziwi wrogowie.','{a} and {b} are now real enemies.'],
 'n.fb.stake1':['Stawka: przegrany zniknie na miesiąc!','Stakes: the loser vanishes for a month!'],'n.fb.stake2':['Stawka: zwycięzca dostaje mocny push.','Stakes: the winner gets a strong push.'],'n.fb.stake3':['Stawka: nagroda dla zwycięzcy.','Stakes: a prize for the winner.'],'n.fb.remstart':['Rewanż! {a} vs {b} wracają do feudu.','Rematch! {a} vs {b} are back in a feud.']});
{const B=(ev,c,tp,te,bp,be,o)=>{const k='fb.'+ev+'.'+c+'.';D[k+'t']=[tp,te];D[k+'b']=[bp,be];o.forEach((x,i)=>D[k+(i+1)]=x)};
 B('turn',1,'Rysa w fasadzie','A crack in the facade','Feud „{s}”: {a} i {b} coraz bardziej podejrzliwie na siebie patrzą. Fani czują, że to nie jest zwykły spór.','“{s}”: {a} and {b} eye each other ever more suspiciously. Fans sense this is no ordinary dispute.',[['Odważnie: atak zza kulis','Bold: an attack from behind the scenes'],['Bezpiecznie: kamera łapie spojrzenia','Safe: the camera catches the glares'],['Twist: {a} zmienia postawę','Twist: {a} changes sides']]);
 B('turn',2,'Punkt zwrotny','Turning point','Feud „{s}” zbliża się do końca. {a} musi zdecydować, kim naprawdę chce być wobec {b}.','“{s}” nears its end. {a} must decide who they really want to be against {b}.',[['Odważnie: publiczna zdrada na żywo','Bold: a public betrayal live'],['Bezpiecznie: emocjonalne promo','Safe: an emotional promo'],['Twist: przemiana {a}','Twist: a transformation of {a}']]);
 B('after',1,'Echa przeszłości','Echoes of the past','Feud „{s}” odżywa: {a} nie wybaczył {b} tego, co się stało. Archiwalne klipy krążą po sieci.','“{s}” revives: {a} never forgave {b}. Archive clips circulate online.',[['Odważnie: wspólny segment z przeszłością','Bold: a joint segment about the past'],['Bezpiecznie: montaż klipów','Safe: a clip montage'],['Twist: zamieszanie z udziałem trzeciej osoby','Twist: a third party stirs things up']]);
 B('after',2,'Rachunek krzywd','Settling scores','Feud „{s}”: {b} ogłasza, że skończy to, co zaczął. {a} jest wściekły.','“{s}”: {b} announces they will finish what they started. {a} is furious.',[['Odważnie: bijatyka w całej hali','Bold: a brawl across the arena'],['Bezpiecznie: zimna wymiana zdań','Safe: a cold exchange of words'],['Twist: nowa osoba w tle','Twist: a new face in the background']]);
 B('crowd',1,'Głos trybun','Voice of the crowd','Feud „{s}”: trybuny dzielą się na dwa obozy – jedni skandują nazwisko {a}, inni {b}.','“{s}”: the stands split into two camps – some chant {a}, others {b}.',[['Odważnie: wyzwanie rzucone prosto do kamery','Bold: a challenge straight to camera'],['Bezpiecznie: ankieta fanów','Safe: a fan poll'],['Twist: fani wybierają stypulację','Twist: fans choose the stipulation']]);
 B('crowd',2,'Wielkie oczekiwania','Great expectations','Feud „{s}” rozgrzewa miasto. Bilety na finał {a} vs {b} już teraz znikają.','“{s}” heats up the city. Tickets for {a} vs {b} are already vanishing.',[['Odważnie: duża konferencja przed finałem','Bold: a big pre-finale press conference'],['Bezpiecznie: zapowiedź w mediach','Safe: a media teaser'],['Twist: fani wybierają stypulację finału','Twist: fans pick the finale stipulation']]);
 B('interf',1,'Cudze palce','Foreign fingers','Feud „{s}”: w ostatniej walce ktoś ingerował. {a} i {b} wzajemnie się oskarżają.','“{s}”: someone interfered in the last match. {a} and {b} accuse each other.',[['Odważnie: tajemniczy napastnik w maskach','Bold: a mysterious masked attacker'],['Bezpiecznie: sędzia zaostrza kontrolę','Safe: the referee tightens control'],['Twist: ogłoś prawdziwą wrogość {a} i {b}','Twist: declare real animosity between {a} and {b}']]);
 B('interf',2,'Przekroczona granica','A line crossed','Feud „{s}”: ingerencje się mnożą. {b} przysięga, że w finale zrobi porządek z {a}.','“{s}”: interferences multiply. {b} swears to settle things with {a} in the finale.',[['Odważnie: wejście z krzesłami na ring','Bold: a chairs-in-the-ring entrance'],['Bezpiecznie: ochrona rozdziela rywali','Safe: security separates the rivals'],['Twist: wrogość {a} i {b} staje się osobista','Twist: the animosity of {a} and {b} gets personal']])}
D['fb.stable.1.t']=['Wojna stajni','Stable war'];D['fb.stable.1.b']=['Feud „{s}”: {a} kontra {b}. W szatni nikt nie jest już pewny, po której stronie stoi.','“{s}”: {a} versus {b}. Nobody in the locker room is sure which side they are on.'];
D['fb.stable.1.1']=['Odważnie: atak całą grupą po gali','Bold: a group attack after the show'];D['fb.stable.1.2']=['Bezpiecznie: pojedynki zwiadowcze','Safe: scouting duels'];D['fb.stable.1.3']=['Twist: ktoś ze stajni się wyłamuje','Twist: a member breaks away from the stable'];
D['fb.stable.2.t']=['Ostatnia bitwa','The final battle'];D['fb.stable.2.b']=['Feud „{s}”: {a} i {b} szykują się do rozstrzygającego starcia. Napięcie jest nie do zniesienia.','“{s}”: {a} and {b} prepare the decisive clash. The tension is unbearable.'];
D['fb.stable.2.1']=['Odważnie: zapowiedź wojny w całej hali','Bold: a war declaration for the whole arena'];D['fb.stable.2.2']=['Bezpiecznie: wspólne promo obu stajni','Safe: a joint promo from both stables'];D['fb.stable.2.3']=['Twist: zdrada w szeregach','Twist: a betrayal in the ranks'];
D['n.fb.defect']=['{w} opuszcza stajnię „{s}”.','{w} leaves the “{s}” stable.'];
// ---- extra events ----
E('feudfans','Podział fanów','Fans divided','W sieci trwa wojna fanów o feud „{s}”. Jedni murują za {a}, drudzy za {b}.','A fan war rages online over the “{s}” feud. Some back {a}, others back {b}.',[['Dolej oliwy do ognia','Pour oil on the fire'],['Zachowaj neutralność','Stay neutral']]);
E('feudbrawl','Bójka przed galą','Pre-show brawl','{a} i {b} z feudu „{s}” pobili się za kulisami przed galą.','{a} and {b} from the “{s}” feud brawled backstage before the show.',[['Przekształć to w segment na żywo','Turn it into a live segment'],['Ukarz obu (kara {m})','Punish both (fine {m})'],['Zignoruj incydent','Ignore the incident']]);
E('feudmerch','Koszulka feudu','Feud shirt','Fani proszą o koszulki z feudu „{s}”. Zamówienie kosztuje {m}.','Fans ask for “{s}” feud shirts. The order costs {m}.',[['Zamów ({m})','Order ({m})'],['Nie teraz','Not now']]);
E('feudtruce','Rozejm?','Truce?','{a} i {b} proponują zawieszenie feudu „{s}”: „Dość tego”. Tracisz napięcie, ale zyskujesz spokój.','{a} and {b} propose suspending the “{s}” feud: “Enough”. You lose the heat but gain peace.',[['Zgoda na rozejm','Agree to the truce'],['Nie – feud trwa','No – the feud goes on']]);
Object.assign(D,{'n.ff1':['Wojna fanów o „{s}” nakręca zainteresowanie.','The fan war over “{s}” boosts interest.'],'n.ff2':['Feud „{s}” bez dodatkowego szumu.','“{s}” continues without extra noise.'],
 'n.fbr1':['Bójka {a} i {b} zamieniona w segment – publiczność wniebowzięta.','The {a} and {b} brawl became a segment – the crowd loved it.'],'n.fbr2':['{a} i {b} dostają kary za bójkę.','{a} and {b} are fined for the brawl.'],'n.fbr3':['Bójka {a} i {b} bez konsekwencji.','No consequences for the {a} and {b} brawl.'],
 'n.fm1':['Koszulki z feudu „{s}” rozchodzą się jak ciepłe bułki.','“{s}” shirts sell like hot cakes.'],'n.fm2':['Koszulki feudu odłożone na później.','The feud shirts are postponed.'],'n.ft1':['Feud „{s}” zawieszony – wszyscy odetchnęli.','The “{s}” feud is suspended – everyone sighed with relief.'],'n.ft2':['Feud „{s}” trwa dalej.','The “{s}” feud continues.']});
const fev=()=>{const f=pickR(G.feuds.filter(x=>!x.fedId&&SC[x.sc]&&fbMine(x)&&fbPair(x)));if(!f)return null;const p=fbPair(f);return {f,X:p[0],Y:p[1],v:{s:t('sc.'+f.sc),a:p[0].name,b:p[1].name}}};
Object.assign(WEV,{
 async feudfans(){const o=fev();if(!o)return false;const i=await evx('feudfans',o.v,['1','2'],[false,false]);if(i===0){if(rnd()<.6){o.f.heat=clamp(o.f.heat+9,0,100);G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.ff1',o.v)}else{o.f.heat=clamp(o.f.heat+3,0,100);addNews('n.ff2',o.v)}}else addNews('n.ff2',o.v);return true},
 async feudbrawl(){const o=fev();if(!o)return false;const c=r10(wkRev()*.15);o.v.m=money(c);const i=await evx('feudbrawl',o.v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){o.f.heat=clamp(o.f.heat+10,0,100);[o.X,o.Y].forEach(w=>evPop(w,.4));addNews('n.fbr1',o.v)}else if(i===1){G.fed.cash-=c;[o.X,o.Y].forEach(w=>evMood(w,-5));addNews('n.fbr2',o.v)}else{if(rnd()<.4)o.f.heat=clamp(o.f.heat+4,0,100);addNews('n.fbr3',o.v)}return true},
 async feudmerch(){const o=fev();if(!o)return false;const c=r10(wkRev()*.2);o.v.m=money(c);const i=await evx('feudmerch',o.v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;G.fed.cash+=Math.round(c*(rnd()<.7?1.8:.6));addNews('n.fm1',o.v)}else addNews('n.fm2',o.v);return true},
 async feudtruce(){const o=fev();if(!o||o.f.heat<40)return false;const i=await evx('feudtruce',o.v,['1','2'],[false,false]);if(i===0){G.feuds=G.feuds.filter(x=>x!==o.f);[o.X,o.Y].forEach(w=>evMood(w,6));addNews('n.ft1',o.v)}else{o.f.heat=clamp(o.f.heat+5,0,100);addNews('n.ft2',o.v)}return true}
});
