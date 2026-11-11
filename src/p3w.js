/* ============ Staff events: coaches, referees, commentators, doctors, scouts ============ */
const stPick=(role,f)=>pickR(G.staff.filter(s=>(!role||s.role===role)&&(!f||f(s))));
const stDrop=s=>{G.staff=G.staff.filter(x=>x!==s)};
Object.assign(WEV,{
 async staffpoach(){
  const s=G.staff.slice().sort((a,b)=>b.lvl-a.lvl)[0];if(!s||s.lvl<40)return false;const r=pickR(G.rivals);if(!r)return false;
  const up=Math.round(s.salary*.25/10)*10,v={s:s.name,r:t('sr.'+s.role).toLowerCase(),f:r.name,m:money(up)};
  const i=await evx('staffpoach',v,['1','2'],[false,false]);
  if(i===0){s.salary+=up;s.contract=Math.max(s.contract,52);addNews('n.stpoach1',v)}else{stDrop(s);addNews('n.stpoach2',v)}
  return true},
 async staffraise(){
  const s=stPick(null,x=>x.role!=='scout'&&x.lvl>=35);if(!s)return false;
  const up=Math.round(s.salary*.2/10)*10,v={s:s.name,r:t('sr.'+s.role).toLowerCase(),m:money(up)};
  const i=await evx('staffraise',v,['1','2'],[false,false]);
  if(i===0)s.salary+=up;else if(rnd()<.35){stDrop(s);addNews('n.stfire',v)}
  return true},
 async refblunder(){
  const s=stPick('ref');if(!s)return false;const c=r10(wkRev()*.15),v={s:s.name,m:money(c)};
  const i=await evx('refblunder',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0)G.fed.pop=clamp(G.fed.pop-.1,2,100);
  else if(i===1){G.fed.cash-=c;s.lvl=clamp(s.lvl+4,15,95);addNews('n.refb2',v)}
  else if(rnd()<.5){G.fed.pop=clamp(G.fed.pop-.8,2,100);addNews('n.refb3',v)}
  twAdd('viral',{w:s.name},'wire',-.3);return true},
 async commgaffe(){
  const s=stPick('comm');if(!s)return false;const v={s:s.name};
  const i=await evx('commgaffe',v,['1','2'],[false,false]);
  if(i===0){G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.gaffe1',v)}
  else if(rnd()<.5){G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.gaffe2a',v)}else{G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.gaffe2b',v)}
  twAdd('viral',{w:s.name},'wire',0);return true},
 async annvoice(){
  const s=stPick('ann');if(!s)return false;const c=r10(wkRev()*.1),v={s:s.name,m:money(c)};
  const i=await evx('annvoice',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.annv1',v)}else{G.fed.pop=clamp(G.fed.pop-.15,2,100);addNews('n.annv2',v)}
  return true},
 async docmistake(){
  const d=stPick('doc'),w=pickR(mine().filter(x=>x.injury>=2&&x.injury<12));if(!d||!w)return false;
  const c=r10(wkRev()*.2),v={d:d.name,w:w.name,m:money(c)};
  const i=await evx('docmistake',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;addNews('n.docm1',v)}
  else if(i===1){stDrop(d);w.injury+=2;addNews('n.docm2',v)}
  else{w.injury+=2;evMood(w,-4);addNews('n.docm3',v)}
  return true},
 async physburn(){
  const s=stPick('phys',x=>x.lvl>=30);if(!s)return false;const c=r10(s.salary*4),v={s:s.name,m:money(c)};
  const i=await evx('physburn',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.phys1',v)}else{s.lvl=clamp(s.lvl-3,15,95);addNews('n.phys2',v)}
  return true},
 async coachclash(){
  const s=stPick('coach'),w=pickR(mine().filter(x=>x.pop>=20&&!x.farewell));if(!s||!w)return false;
  const c=r10(wkRev()*.12),v={s:s.name,w:w.name,m:money(c)};
  const i=await evx('coachclash',v,['1','2','3'],[false,false,G.fed.cash<c]);
  if(i===0){evMood(w,-8);addNews('n.cclash1',v)}
  else if(i===1){evMood(w,6);if(rnd()<.35){stDrop(s);addNews('n.cclash2a',v)}else addNews('n.cclash2b',v)}
  else{G.fed.cash-=c;evMood(w,2);addNews('n.cclash3',v)}
  return true},
 async seminar(){
  const s=stPick('coach');if(!s||s.lvl>=90)return false;const c=r10(wkRev()*.3),v={s:s.name,m:money(c)};
  const i=await evx('seminar',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;s.lvl=clamp(s.lvl+4,15,95);addNews('n.sem1',v)}
  return true},
 async scoutgem(){
  const s=stPick('scout');if(!s||G.ws.filter(w=>w.fed==='PRO').length>=7)return false;
  const w=mkTalent({lvl:Math.min(95,s.lvl+12),reg:s.reg||pickR(Object.keys(REGS)),name:s.name});w.by=s.name;
  const i=await evx('scoutgem',{s:s.name,w:w.name,c:cn(w.country),a:w.age},['1','2']);
  if(i===0)G.ws.push(w);return true},
 async legendcoach(){
  const l=pickR(G.ws.filter(w=>w.fed==='RET'&&w.pop>=35&&!w.staffed&&!w.ext));if(!l||staffFull('coach'))return false;
  const v={w:l.name};const i=await evx('legendcoach',v,['1','2'],[false,false]);
  if(i===0){toStaff(l,'coach');addNews('n.legcoach',v)}
  return true},
 async staffparty(){
  if(!G.staff.length)return false;const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('staffparty',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;mine().forEach(w=>evMood(w,4));addNews('n.stparty')}
  return true},
 async refstrike(){
  const rs=staffOf('ref');if(rs.length<2)return false;const v={};
  const i=await evx('refstrike',v,['1','2'],[false,false]);
  if(i===0)rs.forEach(s=>{s.salary=Math.round(s.salary*1.15/10)*10});
  else if(rnd()<.35){const s=pickR(rs);stDrop(s);addNews('n.refstrike',{s:s.name})}
  return true},
 async mole(){
  const s=stPick(null,x=>x.lvl>=30);const r=pickR(G.rivals);if(!s||!r)return false;const c=r10(wkRev()*.2),v={s:s.name,f:r.name,m:money(c)};
  const i=await evx('mole',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){stDrop(s);addNews('n.mole1',v)}
  else if(i===1){G.fed.cash-=c;if(rnd()<.6){stDrop(s);addNews('n.mole2a',v)}else addNews('n.mole2b',v)}
  else{r.pop=clamp(r.pop+.4,3,99);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.mole3',v)}
  return true}
});
E('staffpoach','Rywal podbiera pracownika','A rival poaches your staffer','{f} chce zatrudnić {s} ({r}). Przebicie oferty kosztuje {m} więcej w pensji.','{f} wants to hire {s} ({r}). Matching the offer costs {m} more in salary.',[['Przebij ofertę (+{m})','Counter-offer (+{m})'],['Pozwól odejść','Let them go']]);
E('staffraise','Żądanie podwyżki','Raise demand','{s} ({r}) domaga się podwyżki o {m}.','{s} ({r}) demands a raise of {m}.',[['Daj podwyżkę (+{m})','Give the raise (+{m})'],['Odmów (ryzyko odejścia)','Refuse (risk of leaving)']]);
E('refblunder','Wpadka sędziego','Referee blunder','{s} fatalnie przeliczył pinfall na gali, fani są wściekli.','{s} botched a pinfall count at the show, fans are furious.',[['Przyznaj się do błędu','Admit the mistake'],['Wyślij na szkolenie ({m}, +4 poziom)','Send to training ({m}, +4 level)'],['Broń sędziego','Defend the referee']]);
E('commgaffe','Wpadka komentatora','Commentator gaffe','{s} palnął na antenie coś, co stało się viralem.','{s} said something on air that went viral.',[['Przeproś publicznie','Apologize publicly'],['Niech się samo rozejdzie','Let it ride']]);
E('annvoice','Zdarty głos','Lost voice','{s} stracił głos przed galą. Foniatra kosztuje {m}.','{s} lost their voice before the show. A specialist costs {m}.',[['Zapłać foniatrze ({m})','Pay the specialist ({m})'],['Niech się męczy','Let them struggle']]);
E('docmistake','Błąd lekarza','Doctor\'s mistake','{d} źle zdiagnozował uraz {w}. Konieczna druga opinia ({m}).','{d} misdiagnosed {w}\'s injury. A second opinion is needed ({m}).',[['Druga opinia ({m})','Second opinion ({m})'],['Zwolnij lekarza','Fire the doctor'],['Zignoruj (dłuższa przerwa)','Ignore it (longer recovery)']]);
E('physburn','Wypalony fizjoterapeuta','Burned-out physio','{s} jest wykończony pracą. Premia urlopowa kosztuje {m}.','{s} is worn out. A vacation bonus costs {m}.',[['Daj premię ({m})','Pay the bonus ({m})'],['Zignoruj (spadek formy)','Ignore it (performance drop)']]);
E('coachclash','Trener kontra zawodnik','Coach vs wrestler','{s} i {w} pokłócili się o plan treningowy. Mediacja kosztuje {m}.','{s} and {w} argued about the training plan. Mediation costs {m}.',[['Stań po stronie trenera','Side with the coach'],['Stań po stronie zawodnika (ryzyko odejścia trenera)','Side with the wrestler (risk of the coach leaving)'],['Mediacja ({m})','Mediate ({m})']]);
E('seminar','Seminarium trenerskie','Coaching seminar','{s} chce pojechać na seminarium za {m}. Wróci lepszy.','{s} wants to attend a seminar for {m}. They will come back better.',[['Opłać ({m}, +4 poziom)','Pay ({m}, +4 level)'],['Nie teraz','Not now']]);
E('scoutgem','Znalezisko skauta','Scout\'s find','{s} znalazł zdolnego {w} ({c}, {a} lat). Warto zaprosić.','{s} found a talented {w} ({c}, age {a}). Worth inviting.',[['Zaproś do puli talentów','Add to the prospect pool'],['Odpuść','Pass']]);
E('legendcoach','Legenda chce uczyć','A legend wants to coach','{w} proponuje, że zostanie trenerem w Twojej federacji.','{w} offers to become a coach in your promotion.',[['Zatrudnij','Hire them'],['Odmów','Decline']]);
E('staffparty','Impreza dla ekipy','Crew party','Ekipa prosi o wspólny wieczór po trasie. Koszt: {m}.','The crew asks for a get-together after the tour. Cost: {m}.',[['Zorganizuj ({m})','Organize ({m})'],['Nie teraz','Not now']]);
E('refstrike','Sędziowie żądają podwyżki','Referees demand a raise','Sędziowie grożą bojkotem, jeśli nie dostaną 15% więcej.','Referees threaten a boycott unless they get 15% more.',[['Zgódź się','Agree'],['Odmów (ryzyko odejścia)','Refuse (risk of losing one)']]);
E('mole','Przeciek informacji','Insider leak','Ktoś z ekipy ({s}) może przekazywać plany gal do {f}. Dochodzenie kosztuje {m}.','Someone on your crew ({s}) may be leaking show plans to {f}. An investigation costs {m}.',[['Zwolnij od razu','Fire immediately'],['Wszczyj dochodzenie ({m})','Investigate ({m})'],['Zignoruj','Ignore it']]);
Object.assign(D,{
 'n.stpoach1':['{s} zostaje po przebiciu oferty rywala.','{s} stays after you matched the rival\'s offer.'],'n.stpoach2':['{s} odchodzi do {f}.','{s} leaves for {f}.'],'n.stfire':['{s} odchodzi po odmowie podwyżki.','{s} leaves after the raise was refused.'],
 'n.refb2':['{s} wraca po szkoleniu sędziowskim lepszy.','{s} returns from referee training better.'],'n.refb3':['Obrona sędziego {s} zdenerwowała fanów.','Defending referee {s} angered fans.'],
 'n.gaffe1':['{s} przeprosił za wpadkę na antenie.','{s} apologized for the on-air gaffe.'],'n.gaffe2a':['Wpadka {s} stała się memem i przyciągnęła widzów.','{s}\'s gaffe became a meme and drew viewers.'],'n.gaffe2b':['Wpadka {s} zaszkodziła wizerunkowi.','{s}\'s gaffe hurt the image.'],
 'n.annv1':['Foniatra uratował głos {s} na galę.','A specialist saved {s}\'s voice for the show.'],'n.annv2':['{s} wystąpił ze ściśniętym gardłem, fani zauważyli.','{s} worked with a sore throat, fans noticed.'],
 'n.docm1':['Druga opinia poprawiła diagnozę {w}.','A second opinion corrected {w}\'s diagnosis.'],'n.docm2':['{d} zwolniony po błędnej diagnozie {w}.','{d} fired after misdiagnosing {w}.'],'n.docm3':['Błąd {d} wydłużył przerwę {w}.','{d}\'s mistake extended {w}\'s time out.'],
 'n.phys1':['{s} wrócił z urlopu wypoczęty.','{s} returned from vacation rested.'],'n.phys2':['{s} pracuje z coraz mniejszym zapałem.','{s} works with less and less enthusiasm.'],
 'n.cclash1':['{w} dostał burę od trenera {s}.','{w} got a talking-to from coach {s}.'],'n.cclash2a':['Trener {s} odchodzi po kłótni z {w}.','Coach {s} leaves after the argument with {w}.'],'n.cclash2b':['Trener {s} przełknął decyzję w sprawie {w}.','Coach {s} swallowed the decision about {w}.'],'n.cclash3':['Mediacja uspokoiła {s} i {w}.','Mediation calmed {s} and {w}.'],
 'n.sem1':['{s} wrócił z seminarium z nowymi metodami.','{s} came back from the seminar with new methods.'],
 'n.legcoach':['{w} zostaje trenerem w federacji.','{w} becomes a coach in the promotion.'],
 'n.stparty':['Wspólny wieczór poprawił nastroje w ekipie.','The get-together lifted the crew\'s mood.'],
 'n.refstrike':['Sędzia {s} odchodzi po odmowie podwyżki.','Referee {s} leaves after the raise refusal.'],
 'n.mole1':['{s} zwolniony za podejrzenie o przecieki do {f}.','{s} fired on suspicion of leaking to {f}.'],'n.mole2a':['Dochodzenie potwierdziło: {s} przekazywał plany {f}.','The investigation confirmed: {s} was passing plans to {f}.'],'n.mole2b':['Dochodzenie oczyściło {s} z zarzutów.','The investigation cleared {s}.'],'n.mole3':['Plany gal wyciekły do {f}.','Show plans leaked to {f}.']
});
