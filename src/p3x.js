/* ============ Batch 4: seasonal events, foreign tours, in-show accidents ============ */
const woy=()=>((G.week-1)%52)+1;
const inWk=(a,b)=>woy()>=a&&woy()<=b;
Object.assign(WEV,{
 async halloween(){
  if(!inWk(42,44))return false;const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('halloween',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.8,2,100);if(rnd()<.5)G.fed.cash+=r10(c*1.4);mine().forEach(w=>evMood(w,2));addNews('n.hallo');twAdd('season',{},'me',.6)}
  return true},
 async xmas(){
  if(!inWk(50,52))return false;const c=r10(wkRev()*.35),v={m:money(c)};
  const i=await evx('xmas',v,['1','2','3'],[G.fed.cash<c,G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1,2,100);mine().forEach(w=>evMood(w,2));addNews('n.xmas1');twAdd('season',{},'me',.7)}
  else if(i===1){G.fed.cash-=c;mine().forEach(w=>evMood(w,6));addNews('n.xmas2')}
  return true},
 async newyear(){
  if(!(inWk(1,2)||inWk(52,52)))return false;const c=r10(wkRev()*.25),v={m:money(c)};
  const i=await evx('newyear',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.7,2,100);addNews('n.newy');twAdd('season',{},'me',.6)}
  return true},
 async valentine(){
  if(!inWk(6,7))return false;const a=pickR(mine().filter(w=>!w.injury&&alOf(w).some(x=>!W(x).injury)));if(!a)return false;
  const b=W(pickR(alOf(a).filter(x=>!W(x).injury)));const c=r10(wkRev()*.15),v={a:a.name,b:b.name,m:money(c)};
  const i=await evx('valentine',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;evPop(a,1);evPop(b,1);G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.valent',v)}
  return true},
 async blackfriday(){
  if(!inWk(47,48))return false;const c=r10(wkRev()*.5),v={m:money(c)};
  const i=await evx('blackfriday',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=c;G.fed.pop=clamp(G.fed.pop+.15,2,100);addNews('n.bf1',v)}
  return true},
 async summershow(){
  if(!inWk(27,31))return false;const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('summershow',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.65){G.fed.pop=clamp(G.fed.pop+.9,2,100);G.fed.cash+=r10(c*1.3);addNews('n.summer1a')}else{G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.summer1b')}}
  return true},
 async easter(){
  if(!inWk(13,16))return false;const c=r10(wkRev()*.15),v={m:money(c)};
  const i=await evx('easter',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.5,2,100);mine().forEach(w=>evMood(w,1));addNews('n.easter')}
  return true},
 async tour(){
  if(mine().length<6||G.fed.pop<10)return false;
  const cc=pickR(COUNTRIES.filter(x=>x!==G.fed.country)),c=r10(wkRev()*.6),v={c:cn(cc),m:money(c),h:money(r10(c/2))};
  const i=await evx('tour',v,['1','2','3'],[G.fed.cash<c,G.fed.cash<c/2,false]);
  if(i===0){G.fed.cash-=c;mine().forEach(w=>{w.fatigue=clamp(w.fatigue+14,0,100)});const r=rnd();
   if(r<.65){G.fed.pop=clamp(G.fed.pop+1.2,2,100);G.fed.cash+=r10(c*1.3);mine().filter(w=>w.country===cc).forEach(w=>evMood(w,6));addNews('n.tour1a',v)}
   else if(r<.9){G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.tour1b',v)}
   else{G.fed.pop=clamp(G.fed.pop-.3,2,100);const w=scPick();if(w)injure(w,2+Math.floor(rnd()*4));addNews('n.tour1c',v)}}
  else if(i===1){G.fed.cash-=r10(c/2);G.fed.pop=clamp(G.fed.pop+.5,2,100);mine().forEach(w=>{w.fatigue=clamp(w.fatigue+6,0,100)});addNews('n.tour2',v)}
  return true},
 async visa(){
  const w=pickR(mine().filter(x=>x.country!==G.fed.country&&x.pop>=18&&!x.injury&&!x.farewell));if(!w)return false;
  const c=r10(wkRev()*.15),v={w:w.name,m:money(c)};
  const i=await evx('visa',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.visa1',v)}else{suspend(w,3);evMood(w,-5);addNews('n.visa2',v)}
  return true},
 async homesick(){
  const w=pickR(mine().filter(x=>x.country!==G.fed.country&&x.pop>=18&&!x.injury&&!x.farewell&&x.morale<75));if(!w)return false;
  const v={w:w.name};const i=await evx('homesick',v,['1','2'],[false,false]);
  if(i===0){suspend(w,2);evMood(w,12);w.loyal=Math.min(100,(w.loyal||50)+5);addNews('n.home1',v)}else{evMood(w,-6);addNews('n.home2',v)}
  return true},
 async foreignfans(){
  if(G.fed.pop<25)return false;const cc=pickR(COUNTRIES.filter(x=>x!==G.fed.country)),c=r10(wkRev()*.2),v={c:cn(cc),m:money(c)};
  const i=await evx('foreignfans',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.6,2,100);G.fed.cash+=r10(c*1.2);addNews('n.fforeign',v)}
  return true}
});
E('halloween','Gala Halloween','Halloween show','Fani proszą o halloweenową galę w kostiumach. Dekoracje kosztują {m}.','Fans ask for a costumed Halloween show. Decorations cost {m}.',[['Zrób specjał ({m})','Do a special ({m})'],['Odpuść','Pass']]);
E('xmas','Święta w federacji','Holidays at the promotion','Zbliżają się święta. Co robisz?','The holidays are coming. What do you do?',[['Świąteczna gala charytatywna ({m})','A holiday charity show ({m})'],['Premie świąteczne dla ekipy ({m})','Holiday bonuses for the crew ({m})'],['Nic specjalnego','Nothing special']]);
E('newyear','Noworoczna gala','New Year show','Po sylwestrze fani czekają na wielką noworoczną galę. Organizacja kosztuje {m}.','After New Year\'s Eve fans want a big New Year show. Organizing it costs {m}.',[['Zrób noworoczny specjał ({m})','Do a New Year special ({m})'],['Odpuść','Pass']]);
E('valentine','Walentynkowy wątek','Valentine\'s angle','Na walentynki {a} i {b} mogą zagrać wątek miłosny na gali. Oprawa kosztuje {m}.','For Valentine\'s Day {a} and {b} could play a romantic angle on the show. Production costs {m}.',[['Zrób to ({m})','Do it ({m})'],['Odpuść','Pass']]);
E('blackfriday','Wyprzedaż merchu','Merch sale','Czarny piątek: duża wyprzedaż merchu mogłaby dać szybki zastrzyk gotówki ({m}), ale zbija prestiż marki.','Black Friday: a big merch sale could bring a quick cash boost ({m}), but cheapens the brand.',[['Zrób wyprzedaż (+{m})','Run the sale (+{m})'],['Zachowaj prestiż','Keep the prestige']]);
E('summershow','Plenerowa gala','Outdoor summer show','Miasto proponuje plenerową galę w amfiteatrze. Scena i ochrona kosztują {m}.','The city offers an outdoor show at an amphitheater. Stage and security cost {m}.',[['Zorganizuj ({m})','Organize ({m})'],['Odpuść','Pass']]);
E('easter','Wielkanocne spotkanie','Easter meetup','Lokalna społeczność prosi o spotkanie z fanami i zawodnikami. Koszt {m}.','The local community asks for a meetup with fans and wrestlers. Cost {m}.',[['Zorganizuj ({m})','Organize ({m})'],['Nie teraz','Not now']]);
E('tour','Trasa zagraniczna','Foreign tour','Zaproszenie na trasę do kraju: {c}. Pełna trasa kosztuje {m}, mała ekipa {h}.','An invitation to tour {c}. A full tour costs {m}, a small crew {h}.',[['Pełna trasa ({m})','Full tour ({m})'],['Mała trasa ({h})','Small tour ({h})'],['Odmów','Decline']]);
E('visa','Problem z wizą','Visa trouble','{w} ma problem z wizą. Prawnik imigracyjny kosztuje {m}.','{w} has a visa problem. An immigration lawyer costs {m}.',[['Wynajmij prawnika ({m})','Hire a lawyer ({m})'],['Poczekaj (3 tyg. zawieszenia)','Wait (3 weeks out)']]);
E('homesick','Tęsknota za domem','Homesick','{w} tęskni za domem i prosi o kilka dni wolnego.','{w} is homesick and asks for a few days off.',[['Pozwól (2 tyg. wolnego)','Allow it (2 weeks off)'],['Odmów','Refuse']]);
E('foreignfans','Fani zza granicy','Fans from abroad','Fani z kraju {c} chcą kupować Twój merch. Wysyłka i obsługa kosztują {m}.','Fans from {c} want to buy your merch. Shipping and service cost {m}.',[['Uruchom sprzedaż ({m})','Start selling ({m})'],['Nie teraz','Not now']]);
Object.assign(D,{
 'n.hallo':['Halloweenowa gala wciągnęła fanów w kostiumach.','The Halloween show pulled in costumed fans.'],'n.xmas1':['Świąteczna gala charytatywna wzruszyła fanów.','The holiday charity show touched the fans.'],'n.xmas2':['Premie świąteczne poprawiły nastroje w ekipie.','Holiday bonuses lifted the crew\'s mood.'],
 'n.newy':['Noworoczna gala rozpoczęła rok z przytupem.','The New Year show kicked off the year in style.'],'n.valent':['Walentynkowy wątek {a} i {b} spodobał się fanom.','The Valentine\'s angle of {a} and {b} charmed the fans.'],
 'n.bf1':['Wyprzedaż merchu dała szybki zastrzyk gotówki (+{m}).','The merch sale brought a quick cash boost (+{m}).'],
 'n.summer1a':['Plenerowa gala przyciągnęła tłumy.','The outdoor show drew crowds.'],'n.summer1b':['Plenerowa gala zepsuła się przez pogodę.','The outdoor show was spoiled by the weather.'],
 'n.easter':['Spotkanie z fanami ocieplił wizerunek federacji.','The fan meetup warmed up the promotion\'s image.'],
 'n.tour1a':['Trasa po kraju {c} okazała się sukcesem.','The tour of {c} was a success.'],'n.tour1b':['Trasa po kraju {c} wyszła przeciętnie.','The tour of {c} was average.'],'n.tour1c':['Trasa po kraju {c} to katastrofa logistyczna.','The tour of {c} was a logistical disaster.'],'n.tour2':['Mała trasa po kraju {c} dała trochę rozgłosu.','The small tour of {c} brought some exposure.'],
 'n.visa1':['Prawnik załatwił wizę {w}.','The lawyer sorted {w}\'s visa.'],'n.visa2':['{w} czeka 3 tygodnie na wizę.','{w} waits 3 weeks for the visa.'],
 'n.home1':['{w} wraca z urlopu w domu odświeżony.','{w} returns from time at home refreshed.'],'n.home2':['{w} jest sfrustrowany odmową wolnego.','{w} is frustrated by the refusal.'],
 'n.fforeign':['Sprzedaż merchu za granicę ruszyła ({c}).','Overseas merch sales started ({c}).'],
 'tw.season':['{f} życzy wszystkim wspaniałego okresu. Dziękujemy za wsparcie!','{f} wishes everyone a great season. Thank you for your support!']
});
TWGEN.season='gf';
/* in-show accidents */
Object.assign(EV,{ropesnap:[{stars:.25,inj:.1},{stars:-.25}],bloodied:[{stars:.5,heat:5,inj:.15},{stars:-.25},{stars:.25,heat:2}],wrongspot:[{stars:.25,heat:2},{stars:-.5,fin:'dirty'}],pyro:[{stars:.5,inj:.1},{stars:0}],rookie:[{stars:.5},{stars:0}]});
Object.assign(D,{
 'ev.ropesnap.t':['Pęka lina','A rope snaps'],'ev.ropesnap.b':['Górna lina pęka w trakcie akcji {w}.','The top rope snaps during {w}\'s move.'],
 'ev.ropesnap.1':['Improwizujcie dalej','Improvise on'],'ev.ropesnap.1d':['Fani to kupują, ale ryzyko kontuzji.','Fans buy it, but injury risk.'],
 'ev.ropesnap.2':['Przerwij i napraw','Stop and fix it'],'ev.ropesnap.2d':['Bezpiecznie, ale gubi się rytm.','Safe, but the flow is lost.'],
 'ev.bloodied.t':['Krew na masce','Crimson mask'],'ev.bloodied.b':['{w} niechcący rozcina łuk brwiowy rywalowi.','{w} accidentally cuts the rival\'s brow open.'],
 'ev.bloodied.1':['Wykorzystaj to','Make use of it'],'ev.bloodied.1d':['Dramatyzm rośnie, ryzyko kontuzji.','Drama rises, injury risk.'],
 'ev.bloodied.2':['Przerwij walkę','Stop the match'],'ev.bloodied.2d':['Bezpieczniej, ale słabsze wrażenie.','Safer, but a weaker impression.'],
 'ev.bloodied.3':['Oklep i leć dalej','Wipe it and move on'],'ev.bloodied.3d':['Mały zysk dla widowiska.','A small gain for the spectacle.'],
 'ev.wrongspot.t':['Pomyłka w choreografii','Miscommunication'],'ev.wrongspot.b':['{w} i {l} pomylili kolejność akcji.','{w} and {l} mixed up the order of moves.'],
 'ev.wrongspot.1':['Obróć w żart','Play it off'],'ev.wrongspot.1d':['Fani się śmieją, nic się nie stało.','The fans laugh, nothing lost.'],
 'ev.wrongspot.2':['Skończ szybko brudnym wynikiem','End it quickly dirty'],'ev.wrongspot.2d':['Gubi się jakość, walka kończy się nieczysto.','Quality drops, the match ends dirty.'],
 'ev.pyro.t':['Pirotechnika wymyka się','Pyro misfire'],'ev.pyro.b':['Efekty specjalne odpalają się za wcześnie.','Special effects fire off too early.'],
 'ev.pyro.1':['Wykorzystaj efekt','Use the effect'],'ev.pyro.1d':['Imponuje, ale ryzyko kontuzji.','Impressive, but injury risk.'],
 'ev.pyro.2':['Kontynuuj bez zmian','Continue as normal'],'ev.pyro.2d':['Bez efektu.','No effect.'],
 'ev.rookie.t':['Debiutant błyszczy','A rookie shines'],'ev.rookie.b':['Fani zaczynają skandować nazwisko {w}.','Fans start chanting {w}\'s name.'],
 'ev.rookie.1':['Pozwól nacieszyć się chwilą','Let them enjoy the moment'],'ev.rookie.1d':['Fani to pamiętają.','The fans remember it.'],
 'ev.rookie.2':['Wróć do planu','Back to the plan'],'ev.rookie.2d':['Bez efektu.','No effect.']});
