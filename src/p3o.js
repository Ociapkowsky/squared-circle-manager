// ---- Late-game pressure: fatigue, rival competition, ageing, big-spend events, season goals ----
function wkRev(){const h=(G.hist||[]).slice(-12).map(x=>x.rev).filter(x=>x>0).sort((a,b)=>a-b);return h.length?h[h.length>>1]:sw()*20}
const r10=x=>Math.round(x/10)*10;
function lastRat(n){const h=(G.hist||[]).slice(-n).map(x=>x.rating);return h.length?avg(h):3}
function fameWeekly(){
 const f=G.fed,hist=G.hist||[],a3=lastRat(3);
 globalWeekly(f,a3);
 if(f.pop>=85){let d=0;if(a3<3.8)d=(f.pop-80)/100*1.2;else if(a3<4.2)d=(f.pop-80)/100*.35;
  if(d>0){f.pop=clamp(f.pop-d,2,100);if(G.week-(G.lastFat||-9)>=8&&d>.3){G.lastFat=G.week;addNews('n.fatigue')}}}
 if(hist.length&&f.tier>=3&&a3<[2.6,2.8,3.0,3.5,3.8][f.tier-1]){let tot=0;G.rivals.filter(r=>r.tier>=f.tier&&r.tier<=f.tier+1&&r.pop>f.pop*.9&&G.ws.some(w=>w.fed===r.id)).sort((a,b)=>b.pop-a.pop).slice(0,2).forEach(r=>{
  const d=Math.min(.2,(r.pop-f.pop*.9)/80,.4-tot)*Math.min(1,f.pop/60);if(d>.03){tot+=d;f.pop=clamp(f.pop-d,2,100);r.pop=clamp(r.pop+d*.4,3,99);
   if(G.week-(G.lastRv||-9)>=10&&d>.1){G.lastRv=G.week;addNews('n.rivdrain',{f:r.short||r.name})}}})}
 G.ws.forEach(w=>{if(w.fed==='RET'||w.fed==='PRO'||w.age<36||w.pop<=20)return;w.pop=Math.max(1,w.pop-(w.age-35)*.008*(w.injury?1.5:1))});
 const d=G.tvDeal;if(d){d.wk--;if(d.wk<=0){if(lastRat(8)>=d.need){f.cash+=d.bonus;f.pop=clamp(f.pop+1.5,2,100);addNews('n.tvwin',{m:money(d.bonus)})}else{f.cash-=d.pen;f.pop=clamp(f.pop-2,2,100);addNews('n.tvlose',{m:money(d.pen)})}G.tvDeal=null}}
 const g=G.goal;if(g){
  if(g.k==='streak'){const l=hist[hist.length-1];if(l&&l.week!==g.lw){g.lw=l.week;g.cur=l.rating>=g.x?g.cur+1:0}}
  else if(g.k==='profit')g.cur=f.cash-g.base;else if(g.k==='pop')g.cur=f.pop-g.base;else if(g.k==='hold')g.cur=f.pop>=g.x?g.cur+1:0;
  if(g.cur>=g.tar){f.cash+=g.cash;f.pop=clamp(f.pop+g.rp,2,100);addNews('n.goalok',{m:money(g.cash)});G.goal=null;G.goalWk=G.week}
  else if(G.week>=g.dl){addNews('n.goalfail');G.goal=null;G.goalWk=G.week}}
}
Object.assign(WEV,{
 async scandal(){
  const w=mine().filter(x=>x.pop>=40&&!x.farewell).sort((a,b)=>b.pop-a.pop)[0];if(!w||G.fed.pop<45)return false;
  const c=r10(wkRev()*.5),v={w:w.name,m:money(c)};const i=await evx('scandal',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;w.morale=clamp((w.morale||60)+3,0,100);addNews('n.scandal1',v)}
  else{w.pop=clamp(w.pop-3,1,100);G.fed.pop=clamp(G.fed.pop-.8,2,100);w.morale=clamp((w.morale||60)-6,0,100);addNews('n.scandal2',v)}
  return true},
 async boycott(){
  if(G.fed.pop<70||lastRat(3)>=3.6)return false;const c=r10(wkRev()*.6),v={m:money(c)};
  const i=await evx('boycott',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.8,2,100);addNews('n.boycott1')}else{G.fed.pop=clamp(G.fed.pop-1.5,2,100);addNews('n.boycott2')}
  return true},
 async rivalshow(){
  const r=pickR(G.rivals.filter(x=>x.tier>=G.fed.tier&&G.ws.some(w=>w.fed===x.id)));if(!r)return false;
  const c=r10(wkRev()*.4),v={f:r.short||r.name,m:money(c)};const i=await evx('rivalshow',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.4,2,100);r.pop=clamp(r.pop-.6,3,99);addNews('n.rivshow1',v)}else{G.fed.pop=clamp(G.fed.pop-.8,2,100);r.pop=clamp(r.pop+.5,3,99);addNews('n.rivshow2',v)}
  return true},
 async acquire(){
  if(G.fed.tier<3)return false;const r=pickR(G.rivals.filter(x=>x.tier<G.fed.tier&&G.ws.filter(w=>w.fed===x.id&&!w.ext).length>=4));if(!r)return false;
  const c=r10(wkRev()*(6+r.pop/10)),v={f:r.name,m:money(c)};if(G.fed.cash<c*1.5)return false;
  const i=await evx('acquire',v,['1','2']);
  if(i===0){G.fed.cash-=c;const room=Math.max(0,ROSTERMAX[G.fed.tier-1]-mine().length);const pick=G.ws.filter(w=>w.fed===r.id&&!w.ext&&!w.injury).sort((a,b)=>b.pop-a.pop).slice(0,Math.min(3,room));
   pick.forEach(w=>{w.fed=G.fed.id;purgeW(w.id);w.salary=salaryOf(w,G.fed.tier);w.contract=52;w.morale=75;w.fatigue=0;w.acc=accStart(w.country,G.fed.country)});
   r.pop=clamp(r.pop-6,3,99);G.fed.pop=clamp(G.fed.pop+1.5,2,100);addNews('n.acquire',{f:r.name,n:pick.length})}
  return true},
 async tvdeal(){
  if(G.fed.tier<3||G.tvDeal)return false;const R=wkRev(),need=Math.round((2.4+G.fed.tier*.32)*10)/10,bonus=r10(R*14),pen=r10(R*6),safe=r10(R*3);
  const v={s:money(safe),b:money(bonus),p:money(pen),n:need};const i=await evx('tvdeal',v,['1','2']);
  if(i===0){G.fed.cash+=safe;G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.tvsafe',v)}else{G.tvDeal={wk:10,need,bonus,pen};addNews('n.tvrisk',v)}
  return true},
 async arena(){
  if(G.fed.tier<3||G.arena)return false;const c=r10(wkRev()*12),v={m:money(c)};if(G.fed.cash<c*2.5)return false;
  const i=await evx('arena',v,['1','2']);if(i===0){G.fed.cash-=c;G.arena=1;G.fed.pop=clamp(G.fed.pop+1,2,100);addNews('n.arena',v)}return true},
 async lawsuit(){
  if(G.fed.tier<3||G.fed.cash<wkRev()*10)return false;const R=wkRev(),sc=r10(R*1.5),lc=r10(R*5),v={s:money(sc),l:money(lc)};
  const i=await evx('lawsuit',v,['1','2']);
  if(i===0){G.fed.cash-=sc;addNews('n.law1',v)}else if(rnd()<.55){G.fed.cash+=r10(R*2);G.fed.pop=clamp(G.fed.pop+1,2,100);addNews('n.law2',v)}else{G.fed.cash-=lc;G.fed.pop=clamp(G.fed.pop-1.5,2,100);addNews('n.law3',v)}
  return true},
 async goal(){
  if(G.goal||(G.goalWk!=null&&G.week-G.goalWk<6)||G.week<4)return false;const R=wkRev(),f=G.fed;let g;
  if(f.pop>=88)g={k:'hold',x:88,tar:20,dl:G.week+30,cur:0};
  else{const ks=['streak','profit'];if(f.pop<=88)ks.push('pop');const k=pickR(ks);
   g=k==='streak'?{k,x:[3,3,3.3,3.6,4][f.tier-1],tar:6,dl:G.week+20,cur:0,lw:-1}:k==='profit'?{k,tar:r10(R*4),dl:G.week+20,cur:0,base:f.cash}:{k,tar:5,dl:G.week+26,cur:0,base:f.pop}}
  g.cash=r10(R*3);g.rp=1.5;g.k0=g.k;
  const v={m:money(g.cash),x:g.x,n:g.tar,w:g.dl-G.week,t:g.k==='profit'?money(g.tar):g.tar,g:g.k};
  const i=await evx('goal',Object.assign({},v,{d:t('ev.w.goal.d.'+g.k,v)}),['1','2']);
  if(i===0){G.goal=g;addNews('n.goalon',v)}else G.goalWk=G.week-3;
  return true}
});
const _obj0=objectives;
objectives=function(){const o=_obj0();const g=G.goal;if(g)o.push({k:'o.g_'+g.k,v:{x:g.x,n:g.tar,t:g.k==='profit'?money(g.tar):g.tar,w:Math.max(0,g.dl-G.week)},cur:g.cur,tar:g.tar});return o};
function E(k,tp,te,bp,be,opts){D['ev.w.'+k+'.t']=[tp,te];D['ev.w.'+k+'.b']=[bp,be];opts.forEach((o,i)=>D['ev.w.'+k+'.'+(i+1)]=o)}
E('scandal','Skandal gwiazdy','Star scandal','{w} trafia na pierwsze strony po wpadce poza ringiem. Kampania PR kosztuje {m}.','{w} is all over the tabloids after an off-ring blunder. A PR campaign costs {m}.',[['Zapłać {m} za PR','Pay {m} for PR'],['Przeczekaj','Ride it out']]);
E('boycott','Bojkot fanów','Fan boycott','Fani narzekają na słabe gale i grożą bojkotem. Darmowe bilety kosztowałyby {m}.','Fans are fed up with weak shows and threaten a boycott. Free tickets would cost {m}.',[['Rozdaj bilety ({m})','Give free tickets ({m})'],['Zignoruj','Ignore it']]);
E('rivalshow','Rywal kontruje','Rival counter-programs','{f} ogłasza wielką galę w tym samym terminie. Kontrprogram kosztuje {m}.','{f} announces a huge show on the same date. Counter-programming costs {m}.',[['Kontruj ({m})','Counter ({m})'],['Zignoruj','Ignore it']]);
E('acquire','Przejęcie federacji','Federation takeover','Możesz przejąć gwiazdy federacji {f} za {m}. Ich popularność spadnie, Twoja wzrośnie.','You can buy out the top talent of {f} for {m}. Their popularity falls, yours rises.',[['Przejmij za {m}','Buy for {m}'],['Odpuść','Pass']]);
E('tvdeal','Kontrakt telewizyjny','TV deal','Stacja oferuje: bezpieczna wypłata {s} od razu albo ryzykowny kontrakt na 10 tygodni (premia {b} przy średniej ocenie gal co najmniej {n}, kara {p} przy porażce).','A network offers a safe {s} upfront or a risky 10-week deal ({b} bonus if the average show rating stays at {n}+, {p} penalty if not).',[['Bezpiecznie: {s}','Safe: {s}'],['Ryzykownie: do {b}','Risky: up to {b}']]);
E('arena','Własna arena','Own arena','Możesz zbudować własną arenę za {m}. Wyższe wpływy z biletów i gadżetów, prestiż.','You can build your own arena for {m}. Higher gate and merch income, plus prestige.',[['Zbuduj ({m})','Build ({m})'],['Nie teraz','Not now']]);
E('lawsuit','Pozew','Lawsuit','Były współpracownik pozywa federację. Ugoda kosztuje {s}, proces: 55% szans na wygraną, przegrana to {l}.','A former partner sues the company. Settling costs {s}; going to trial has a 55% chance to win, but losing costs {l}.',[['Ugoda ({s})','Settle ({s})'],['Proces','Go to trial']]);
E('goal','Cel sezonowy','Season goal','Zarząd stawia cel: {d} Nagroda: {m} i +1,5 popularności.','The board sets a goal: {d} Reward: {m} and +1.5 popularity.',[['Przyjmij','Accept'],['Odmów','Decline']]);
Object.assign(D,{
'ev.w.goal.d.streak':['Zdobądź ocenę gali co najmniej {x} sześć razy z rzędu w {w} tygodni.','Get a show rating of {x}+ six shows in a row within {w} weeks.'],
'ev.w.goal.d.profit':['Zarób {t} w {w} tygodni.','Earn {t} within {w} weeks.'],
'ev.w.goal.d.pop':['Podnieś popularność o {n} w {w} tygodni.','Raise popularity by {n} within {w} weeks.'],
'ev.w.goal.d.hold':['Utrzymaj popularność co najmniej {x} przez {n} tygodni w {w} tygodni.','Keep popularity at {x}+ for {n} weeks within {w} weeks.'],
'o.g_streak':['Cel: ocena {x}+ ({n} gal z rzędu, {w} tyg.)','Goal: {x}+ rating ({n} shows in a row, {w} wks)'],
'o.g_profit':['Cel: zarobić {t} ({w} tyg.)','Goal: earn {t} ({w} wks)'],
'o.g_pop':['Cel: +{n} popularności ({w} tyg.)','Goal: +{n} popularity ({w} wks)'],
'o.g_hold':['Cel: popularność {x}+ przez {n} tyg. ({w} tyg.)','Goal: popularity {x}+ for {n} wks ({w} wks left)'],
'n.fatigue':['Widzowie mają dość: popularność federacji spada po słabszych galach.','Audiences are growing tired: popularity slips after weaker shows.'],
'n.rivdrain':['{f} odbiera część widzów Twojej federacji.','{f} is pulling viewers away from your promotion.'],
'n.scandal1':['{w} był bohaterem skandalu, ale kampania PR zażegnała kryzys.','{w} was in a scandal, but a PR campaign contained it.'],
'n.scandal2':['Skandal wokół {w} zaszkodził wizerunkowi federacji.','The scandal around {w} hurt the promotion.'],
'n.boycott1':['Darmowe bilety uspokoiły fanów.','Free tickets calmed the fans.'],
'n.boycott2':['Bojkot fanów uderzył w popularność.','The fan boycott hurt popularity.'],
'n.rivshow1':['Kontrprogram przyciągnął widzów przed galą {f}.','Counter-programming pulled viewers away from {f}.'],
'n.rivshow2':['Gala {f} odebrała Ci widzów.','The {f} show took viewers from you.'],
'n.acquire':['Przejęto {n} zawodników z federacji {f}.','You bought out {n} wrestlers from {f}.'],
'n.tvsafe':['Podpisano bezpieczny kontrakt TV: {s}.','Signed a safe TV deal: {s}.'],
'n.tvrisk':['Podpisano ryzykowny kontrakt TV na 10 tygodni (premia {b}).','Signed a risky 10-week TV deal ({b} bonus).'],
'n.tvwin':['Kontrakt TV spełniony: premia {m}.','TV deal delivered: {m} bonus.'],
'n.tvlose':['Kontrakt TV nie spełniony: kara {m}.','TV deal missed: {m} penalty.'],
'n.arena':['Otwarto własną arenę za {m}.','Your own arena opened ({m}).'],
'n.law1':['Ugoda w sprawie pozwu: {s}.','Lawsuit settled for {s}.'],
'n.law2':['Wygrano proces, odzyskano koszty i prestiż.','Won the trial and some goodwill.'],
'n.law3':['Przegrano proces: {l} odszkodowania.','Lost the trial: {l} in damages.'],
'n.goalon':['Przyjęto cel sezonowy.','Season goal accepted.'],
'n.goalok':['Cel sezonowy osiągnięty! Nagroda: {m}.','Season goal reached! Reward: {m}.'],
'n.goalfail':['Cel sezonowy nie został osiągnięty.','The season goal was missed.']
});
