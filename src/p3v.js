/* ============ Batch 3: weather, equipment, deals, stunts, ceremonies, rival owners ============ */
Object.assign(WEV,{
 async sickbug(){
  if(mine().length<4)return false;const c=r10(wkRev()*.25),v={m:money(c)};
  const i=await evx('sickbug',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.sick1')}
  else{const n=1+Math.floor(rnd()*2);shuffle(mine().filter(w=>!w.injury)).slice(0,n).forEach(w=>{if(rnd()<.6)injure(w,1+Math.floor(rnd()*2))});mine().forEach(w=>{w.fatigue=clamp(w.fatigue+5,0,100)});addNews('n.sick2')}
  return true},
 async storm(){
  const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('storm',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop-.15,2,100);addNews('n.storm1')}
  else{if(rnd()<.5){G.fed.cash-=Math.min(G.fed.cash,r10(wkRev()*.5));addNews('n.storm2a')}else addNews('n.storm2b')}
  return true},
 async ringfail(){
  const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('ringfail',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;mine().forEach(w=>evMood(w,1));addNews('n.ring1')}
  else{const w=scPick();if(w&&rnd()<.5){injure(w,2+Math.floor(rnd()*4));addNews('n.ring2a',{w:w.name})}else addNews('n.ring2b')}
  return true},
 async tryouts(){
  if(G.ws.filter(w=>w.fed==='PRO').length>=6)return false;const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('tryouts',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;let n=0;for(let k=0;k<2&&G.ws.filter(w=>w.fed==='PRO').length<8;k++){G.ws.push(mkTalent({lvl:35,reg:pickR(Object.keys(REGS)),name:t('ev.w.tip.by')}));n++}addNews('n.tryouts',{n})}
  return true},
 async legendreturn(){
  const l=pickR(G.ws.filter(w=>w.fed==='RET'&&w.pop>=35&&!w.ext));if(!l)return false;
  const c=r10(wkRev()*.4),v={w:l.name,m:money(c)};
  const i=await evx('legendreturn',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1,2,100);mine().forEach(w=>evMood(w,2));addNews('n.legret1',v);twAdd('legend',{w:l.name},'me',.6)}
  return true},
 async celebcameo(){
  if(G.fed.pop<20)return false;const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('celebcameo',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.7){G.fed.pop=clamp(G.fed.pop+.9,2,100);addNews('n.celeb1a')}else{G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.celeb1b')}}
  return true},
 async rivalowner(){
  const r=pickR(G.rivals.filter(x=>Math.abs(x.pop-G.fed.pop)<=30));if(!r)return false;const v={f:r.name};
  const i=await evx('rivalowner',v,['1','2','3'],[false,false,false]);
  if(i===0){if(rnd()<.5){G.fed.pop=clamp(G.fed.pop+.7,2,100);r.pop=clamp(r.pop-.4,3,99);addNews('n.rowner1a',v)}else{G.fed.pop=clamp(G.fed.pop-.4,2,100);addNews('n.rowner1b',v)}}
  else if(i===1){if(rnd()<.5){G.fed.pop=clamp(G.fed.pop+1.6,2,100);r.pop=clamp(r.pop-1.2,3,99);addNews('n.rowner2a',v)}else{G.fed.pop=clamp(G.fed.pop-1.4,2,100);r.pop=clamp(r.pop+.8,3,99);addNews('n.rowner2b',v)}}
  return true},
 async videogame(){
  if(G.fed.pop<30)return false;const b=r10(wkRev()*8),v={m:money(b),b:money(r10(b*1.6))};
  const i=await evx('videogame',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=b;G.fed.pop=clamp(G.fed.pop+.4,2,100);addNews('n.game1',v);twAdd('deal',{},'me',.5)}
  else{if(rnd()<.5){G.fed.cash+=r10(b*1.6);G.fed.pop=clamp(G.fed.pop+.4,2,100);addNews('n.game2a',v);twAdd('deal',{},'me',.5)}else addNews('n.game2b')}
  return true},
 async localpolitics(){
  const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('localpolitics',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;addNews('n.pol1')}
  else if(i===1){G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.pol2')}
  else{if(rnd()<.5){G.fed.pop=clamp(G.fed.pop+.8,2,100);addNews('n.pol3a')}else{G.fed.cash-=Math.min(G.fed.cash,c);G.fed.pop=clamp(G.fed.pop-.6,2,100);addNews('n.pol3b')}}
  return true},
 async fandonation(){
  const m=r10(wkRev()*.8),v={m:money(m)};
  const i=await evx('fandonation',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=m;addNews('n.don1',v)}else{G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.don2')}
  return true},
 async wedding(){
  const a=pickR(mine().filter(w=>!w.farewell&&!w.injury&&alOf(w).some(x=>!W(x).injury)));if(!a)return false;
  const b=W(pickR(alOf(a).filter(x=>!W(x).injury)));const c=r10(wkRev()*.2),v={a:a.name,b:b.name,m:money(c)};
  const i=await evx('wedding',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.7){evPop(a,1.5);evPop(b,1.5);G.fed.pop=clamp(G.fed.pop+.4,2,100);addNews('n.wed1a',v)}else{evPop(a,-.5);evPop(b,-.5);addNews('n.wed1b',v)}twAdd('wedding',{a:a.name,b:b.name,w:a.name},'me',.5)}
  return true},
 async heelstunt(){
  const w=pickR(mine().filter(x=>x.role==='heel'&&x.pop>=25&&!x.injury&&!x.farewell));if(!w)return false;const c=r10(wkRev()*.15),v={w:w.name,m:money(c)};
  const i=await evx('heelstunt',v,['1','2'],[false,false]);
  if(i===0){if(rnd()<.6){evPop(w,2);G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.stunt1a',v)}else{G.fed.cash-=Math.min(G.fed.cash,c);evPop(w,.5);addNews('n.stunt1b',v)}twAdd('stunt',{w:w.name},'wire',-.1)}
  return true},
 async bootleg(){
  if(G.fed.pop<12)return false;const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('bootleg',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.boot1')}else{G.fed.cash-=Math.min(G.fed.cash,r10(c*.6));addNews('n.boot2')}
  return true},
 async sponsorup(){
  if(!G.sponsor)return false;const m=r10(wkRev()*.6),v={m:money(m)};
  const i=await evx('sponsorup',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=m;G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.spup1',v)}
  return true},
 async convention(){
  const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('convention',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.8,2,100);if(rnd()<.5)G.fed.cash+=r10(c*1.5);mine().filter(w=>w.pop>=30).forEach(w=>evPop(w,.5));addNews('n.conv1')}
  return true},
 async allianceshow(){
  const r=pickR(G.rivals.filter(x=>Math.abs(x.pop-G.fed.pop)<=15));if(!r)return false;const c=r10(wkRev()*.25),v={f:r.name,m:money(c)};
  const i=await evx('allianceshow',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.9,2,100);r.pop=clamp(r.pop+.9,3,99);addNews('n.alshow',v)}
  return true},
 async vacate(){
  const tt=pickR(G.titles.filter(x=>x.holders.length&&x.holders.some(h=>W(h)&&W(h).injury>=4)));if(!tt)return false;
  const v={t:titleName(tt),w:names(tt.holders)};const i=await evx('vacate',v,['1','2'],[false,false]);
  if(i===0){tt.holders.forEach(h=>{if(W(h))evMood(W(h),-8)});tt.holders=[];tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)-.1,1,5);addNews('n.vac1',v)}
  else{tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)-.05,1,5);tt.holders.forEach(h=>{if(W(h))evMood(W(h),4)});addNews('n.vac2',v)}
  return true},
 async kayfabebreak(){
  const a=pickR(mine().filter(w=>!w.farewell&&rvOf(w).some(x=>W(x).role!==w.role)));if(!a)return false;
  const b=W(pickR(rvOf(a).filter(x=>W(x).role!==a.role)));const v={a:a.name,b:b.name};
  const i=await evx('kayfabebreak',v,['1','2','3'],[false,false,false]);
  if(i===0){evPop(a,.5);evPop(b,.5);addNews('n.kay1',v)}
  else if(i===1){evMood(a,-5);evMood(b,-5);addNews('n.kay2',v)}
  else{G.fed.pop=clamp(G.fed.pop-.2,2,100);relUnlink(a,b,'rv');addNews('n.kay3',v)}
  return true}
});
E('sickbug','Wirus w szatni','A bug in the locker room','Po trasie połowa ekipy kicha. Badania i dezynfekcja kosztują {m}.','Half the crew is sneezing after the tour. Screening and disinfection cost {m}.',[['Zrób badania ({m})','Run screening ({m})'],['Nie ma czasu na to','No time for that']]);
E('storm','Burza w dniu gali','Storm on show day','Nad miastem nadciąga burza. Przełożenie części gali kosztuje {m}.','A storm heads for town. Rescheduling part of the show costs {m}.',[['Przełóż ({m})','Reschedule ({m})'],['Gramy mimo to','Show must go on']]);
E('ringfail','Ring się łamie','The ring is failing','Podczas treningu zawalił się narożnik. Naprawa ringu kosztuje {m}.','A corner collapsed during training. Repairing the ring costs {m}.',[['Napraw ({m})','Repair ({m})'],['Połatamy jakoś','Patch it up']]);
E('tryouts','Otwarte przesłuchania','Open tryouts','Młodzi adepci proszą o otwarte przesłuchania. Organizacja kosztuje {m}.','Young hopefuls ask for open tryouts. Organizing them costs {m}.',[['Zorganizuj ({m})','Organize ({m})'],['Nie teraz','Not now']]);
E('legendreturn','Powrót legendy','A legend returns','{w} proponuje jednorazowy powrót na jedną galę. Zorganizowanie kosztuje {m}.','{w} offers a one-night return for a single show. Organizing it costs {m}.',[['Zorganizuj ({m})','Organize ({m})'],['Odmów','Decline']]);
E('celebcameo','Gwiazda na widowni','Celebrity in the crowd','Lokalna celebrytka chce pojawić się na gali. Ochrona i loża kosztują {m}.','A local celebrity wants to appear at the show. Security and a VIP box cost {m}.',[['Zaproś ({m})','Invite ({m})'],['Odmów','Decline']]);
E('rivalowner','Właściciel rywala atakuje','Rival owner attacks','Właściciel {f} publicznie Cię wyśmiewa w wywiadzie.','The owner of {f} publicly mocks you in an interview.',[['Odpowiedz ostro','Fire back'],['Wyzwij na "walkę o wszystko"','Challenge them to a winner-takes-all show'],['Zignoruj','Ignore it']]);
E('videogame','Gra komputerowa','Video game deal','Studio chce licencji na grę o Twojej federacji. Oferta: {m}.','A studio wants a license for a game about your promotion. The offer: {m}.',[['Przyjmij ofertę ({m})','Accept ({m})'],['Negocjuj (do {b}, ryzyko utraty)','Negotiate (up to {b}, risk of losing the deal)']]);
E('localpolitics','Radny kontra wrestling','Councilman vs wrestling','Radny chce ograniczyć "brutalne widowiska". Lobbing kosztuje {m}.','A councilman wants to restrict "violent spectacles". Lobbying costs {m}.',[['Lobbuj ({m})','Lobby ({m})'],['Dostosuj się (mniej emocji)','Comply (less excitement)'],['Postaw się publicznie','Publicly defy them']]);
E('fandonation','Hojny kibic','A generous fan','Wieloletni kibic chce przekazać {m} na federację. Zawstydza go rozgłos.','A longtime fan wants to donate {m} to the promotion. Publicity embarrasses them.',[['Przyjmij po cichu','Accept quietly'],['Podziękuj publicznie','Thank them publicly']]);
E('wedding','Ślub w ringu','Wedding in the ring','{a} i {b} proponują zainscenizować ślub na gali. Oprawa kosztuje {m}.','{a} and {b} suggest staging a wedding at the show. Production costs {m}.',[['Zrób to ({m})','Do it ({m})'],['Odmów','Decline']]);
E('heelstunt','Wyskok heela','Heel stunt','{w} chce zrobić głośny wyskok poza ringiem. Może być PR, może być policja ({m}).','{w} wants to pull a loud stunt outside the ring. It could be PR or the police ({m}).',[['Pozwól','Allow it'],['Zabroń','Forbid it']]);
E('bootleg','Podróbki merchu','Bootleg merch','Na bazarze pojawiły się podróbki Twoich koszulek. Nakaz sądowy kosztuje {m}.','Bootleg versions of your T-shirts hit the market. A court order costs {m}.',[['Złóż pozew ({m})','Sue ({m})'],['Zignoruj','Ignore it']]);
E('sponsorup','Sponsor chce więcej','Sponsor wants more','Obecny sponsor chce większego logo na ringu za dopłatę {m}.','Your current sponsor wants a bigger ring logo for an extra {m}.',[['Zgódź się','Agree'],['Odmów','Decline']]);
E('convention','Konwent fanów','Fan convention','Zaproszenie na duży konwent wrestlingowy. Stoisko kosztuje {m}.','You are invited to a big wrestling convention. A booth costs {m}.',[['Jedź ({m})','Go ({m})'],['Zostań w domu','Stay home']]);
E('allianceshow','Wspólna gala federacji','Joint show','{f} proponuje wspólną galę. Koszty dzielone: {m}.','{f} proposes a joint show. Shared costs: {m}.',[['Zgódź się ({m})','Agree ({m})'],['Odmów','Decline']]);
E('vacate','Pas bez mistrza','Champion on the shelf','{w} jest kontuzjowany, a {t} nie ma obrońcy na dłużej.','{w} is injured, and the {t} has no active defender for a while.',[['Odbierz pas','Vacate the title'],['Zostaw mistrza z pasem','Keep the champion']]);
E('kayfabebreak','Zdjęcie wspólnej kolacji','A friendly dinner photo','Fotka {a} i {b} z restauracji obiega sieć. Przecież to rywale!','A photo of {a} and {b} at a restaurant spreads online. They are supposed to be rivals!',[['Przekuj w fabułę','Turn it into a storyline'],['Ukarz za złamanie roli','Punish for breaking character'],['Przyznaj, że to przyjaciele','Admit they are friends']]);
Object.assign(D,{
 'n.sick1':['Badania powstrzymały wirusa w szatni.','Screening stopped the bug in the locker room.'],'n.sick2':['Wirus rozłożył część ekipy.','The bug knocked out part of the crew.'],
 'n.storm1':['Gala przełożona przed burzą.','The show was rescheduled ahead of the storm.'],'n.storm2a':['Burza zmniejszyła frekwencję i kosztowała pieniądze.','The storm cut attendance and cost money.'],'n.storm2b':['Burza ominęła miasto, gala się odbyła.','The storm missed town, the show went on.'],
 'n.ring1':['Ring naprawiony, ekipa odetchnęła.','The ring was repaired, the crew relaxed.'],'n.ring2a':['{w} ucierpiał przez wadliwy ring.','{w} got hurt because of the faulty ring.'],'n.ring2b':['Połatany ring wytrzymał.','The patched ring held.'],
 'n.tryouts':['Przesłuchania wyłoniły {n} talentów.','The tryouts found {n} prospects.'],
 'n.legret1':['{w} wraca na jedną galę, fani są w ekstazie.','{w} returns for one show, fans are ecstatic.'],
 'n.celeb1a':['Celebrytka na widowni przyciągnęła uwagę mediów.','A celebrity in the crowd drew media attention.'],'n.celeb1b':['Występ celebrytki wyszedł niezręcznie.','The celebrity\'s appearance went awkwardly.'],
 'n.rowner1a':['Ostra riposta rozbawiła fanów kosztem {f}.','The sharp reply amused fans at the expense of {f}.'],'n.rowner1b':['Riposta wobec {f} nie wypaliła.','The reply to {f} backfired.'],'n.rowner2a':['Wyzwanie rzucone {f} podkręciło oczekiwania i zadziałało.','The challenge to {f} raised expectations and worked.'],'n.rowner2b':['Wyzwanie rzucone {f} obróciło się przeciw Tobie.','The challenge to {f} turned against you.'],
 'n.game1':['Gra z federacją trafi do sklepów (+{m}).','A game based on the promotion is coming (+{m}).'],'n.game2a':['Negocjacje się opłaciły: gra dała {b}.','Negotiations paid off: the game brought {b}.'],'n.game2b':['Studio wycofało się z negocjacji.','The studio walked away from negotiations.'],
 'n.pol1':['Lobbing powstrzymał radnego.','Lobbying stopped the councilman.'],'n.pol2':['Dostosowanie się ostudziło emocje na galach.','Complying cooled the excitement at shows.'],'n.pol3a':['Publiczne postawienie się poparli fani.','Fans backed the public defiance.'],'n.pol3b':['Postawienie się radnemu kosztowało grzywnę.','Defying the councilman cost a fine.'],
 'n.don1':['Hojny kibic wsparł federację ({m}).','A generous fan supported the promotion ({m}).'],'n.don2':['Publiczne podziękowania wzruszyły fanów.','The public thanks touched the fans.'],
 'n.wed1a':['Ślub {a} i {b} w ringu poruszył fanów.','The wedding of {a} and {b} in the ring moved the fans.'],'n.wed1b':['Ślub w ringu wyszedł sztucznie.','The ring wedding felt forced.'],
 'n.stunt1a':['Wyskok {w} wywołał burzę i podbił popularność.','{w}\'s stunt caused a storm and boosted popularity.'],'n.stunt1b':['Wyskok {w} skończył się mandatem.','{w}\'s stunt ended with a fine.'],
 'n.boot1':['Pozew zatrzymał handel podróbkami.','The lawsuit stopped the bootleg trade.'],'n.boot2':['Podróbki zabrały trochę zysków z merchu.','Bootlegs took some merch profits.'],
 'n.spup1':['Sponsor dopłacił za większe logo ({m}).','The sponsor paid extra for a bigger logo ({m}).'],
 'n.conv1':['Konwent przyniósł nowych fanów.','The convention brought new fans.'],
 'n.alshow':['Wspólna gala z {f} przyciągnęła tłumy.','The joint show with {f} drew crowds.'],
 'n.vac1':['{t} zostaje zwakowany ({w}).','The {t} is vacated ({w}).'],'n.vac2':['{w} zostaje mistrzem mimo kontuzji.','{w} stays champion despite the injury.'],
 'n.kay1':['Wspólna kolacja {a} i {b} stała się wątkiem fabuły.','The dinner of {a} and {b} became a storyline.'],'n.kay2':['{a} i {b} ukarani za złamanie roli.','{a} and {b} punished for breaking character.'],'n.kay3':['{a} i {b} przyznali, że są przyjaciółmi. Rywalizacja kończy się.','{a} and {b} admitted they are friends. The rivalry ends.'],
 'tw.wedding':['Ślub w ringu! {a} i {b} mówią "tak".','A wedding in the ring! {a} and {b} say "I do".'],
 'tw.stunt':['{w} znów robi wokół siebie szum. Co tym razem?','{w} is making noise again. What is it this time?'],
 'tw.deal':['Wielka wiadomość: nadchodzi gra o {f}!','Big news: a game about {f} is coming!']
});
TWGEN.wedding='gw';TWGEN.stunt='gw';TWGEN.deal='gf';
