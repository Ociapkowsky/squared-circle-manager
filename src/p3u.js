/* ============ Controversies: police trouble, wellness, owner scandals, shady money ============ */
Object.assign(D,{'inj.susp':['Zawieszenie','Suspension']});
function suspend(w,weeks){w.injury=Math.max(w.injury||0,weeks);w.inj={k:'susp',s:1,tot:weeks,rel:0}}
const scPick=(f)=>pickR(mine().filter(w=>!w.farewell&&!w.injury&&w.pop>=18&&(!f||f(w))));
Object.assign(WEV,{
 async arrest(){
  const w=scPick();if(!w)return false;const c=r10(wkRev()*.3),v={w:w.name,m:money(c)};
  const i=await evx('arrest',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;suspend(w,1);evPop(w,-.5);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.arrest1',v)}
  else if(i===1){suspend(w,3);evMood(w,-10);w.loyal=Math.max(0,(w.loyal||50)-8);evPop(w,-1.5);addNews('n.arrest2',v)}
  else{releaseW(w);G.fed.pop=clamp(G.fed.pop-.3,2,100);mine().forEach(x=>evMood(x,-1));addNews('n.arrest3',v)}
  twAdd('crime',{w:v.w},'wire',-.6);return true},
 async dui(){
  const w=scPick();if(!w)return false;const c=r10(wkRev()*.15),v={w:w.name,m:money(c)};
  const i=await evx('dui',v,['1','2','3'],[false,false,G.fed.cash<c]);
  if(i===0){suspend(w,1);evMood(w,-3);evPop(w,-1);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.dui1',v)}
  else if(i===1){if(rnd()<.5){G.fed.pop=clamp(G.fed.pop-1.2,2,100);evPop(w,-2);addNews('n.dui2a',v)}else addNews('n.dui2b',v)}
  else{G.fed.cash-=c;suspend(w,4);w.loyal=Math.min(100,(w.loyal||50)+5);evMood(w,2);addNews('n.dui3',v)}
  twAdd('crime',{w:v.w},'wire',-.5);return true},
 async wellness(){
  const w=scPick(x=>x.fatigue>=40||x.age>=28);if(!w)return false;const c=r10(wkRev()*.4),v={w:w.name,m:money(c)};
  const i=await evx('wellness',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){suspend(w,4);evPop(w,-.8);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.well1',v)}
  else if(i===1){G.fed.cash-=c;suspend(w,6);w.loyal=Math.min(100,(w.loyal||50)+10);evMood(w,8);addNews('n.well2',v)}
  else{if(rnd()<.5){G.fed.pop=clamp(G.fed.pop-2,2,100);evPop(w,-2);addNews('n.well3a',v)}else addNews('n.well3b',v)}
  twAdd('drug',{w:v.w},'wire',-.5);return true},
 async drugsraid(){
  if(G.fed.pop<15)return false;const c=r10(wkRev()*.25),v={m:money(c)};
  const i=await evx('drugsraid',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){mine().forEach(x=>evMood(x,-2));addNews('n.raidp1')}
  else if(i===1){G.fed.cash-=c;addNews('n.raidp2')}
  else{if(rnd()<.5){G.fed.pop=clamp(G.fed.pop-2,2,100);addNews('n.raidp3a')}else addNews('n.raidp3b')}
  twAdd('raid',{},'wire',-.4);return true},
 async fanbrawl(){
  const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('fanbrawl',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.fanb1')}else{if(rnd()<.5){G.fed.pop=clamp(G.fed.pop-1,2,100);addNews('n.fanb2a')}else addNews('n.fanb2b')}
  return true},
 async ownerscandal(){
  if(G.week<20||G.fed.pop<12)return false;const c=r10(wkRev()*.7),v={m:money(c)};
  const i=await evx('ownerscandal',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop-(rnd()<.7?.3:1),2,100);addNews('n.owner1')}
  else if(i===1){if(rnd()<.5){G.fed.pop=clamp(G.fed.pop+.5,2,100);addNews('n.owner2a')}else{G.fed.pop=clamp(G.fed.pop-2,2,100);G.fed.cash-=Math.min(G.fed.cash,c);addNews('n.owner2b')}}
  else{G.fed.pop=clamp(G.fed.pop-.5,2,100);mine().forEach(x=>evMood(x,2));addNews('n.owner3')}
  twAdd('owner',{},'wire',-.6);return true},
 async payoff(){
  if(G.week<15)return false;const c=r10(wkRev()*.6),v={m:money(c)};
  const i=await evx('payoff',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.35){G.fed.pop=clamp(G.fed.pop-3,2,100);addNews('n.payoff1a');twAdd('owner',{},'wire',-.8)}else addNews('n.payoff1b')}
  else{G.fed.pop=clamp(G.fed.pop-.5,2,100);mine().forEach(x=>evMood(x,3));addNews('n.payoff2')}
  return true},
 async shadybacker(){
  const b=r10(wkRev()*6),v={m:money(b)};
  const i=await evx('shadybacker',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=b;if(rnd()<.4){G.fed.cash-=Math.round(b*.8);G.fed.pop=clamp(G.fed.pop-1.5,2,100);addNews('n.shady1a');twAdd('owner',{},'wire',-.6)}else addNews('n.shady1b')}
  return true},
 async taxaudit(){
  if(G.week<26)return false;const c=r10(wkRev()*.35),v={m:money(c),f:money(r10(c*2.4))};
  const i=await evx('taxaudit',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.tax1')}else{if(rnd()<.45){G.fed.cash-=Math.min(G.fed.cash,r10(c*2.4));addNews('n.tax2a')}else addNews('n.tax2b')}
  return true},
 async leakedvideo(){
  const w=scPick();if(!w)return false;const v={w:w.name};
  const i=await evx('leakedvideo',v,['1','2','3'],[false,false,false]);
  if(i===0){evMood(w,-6);w.loyal=Math.max(0,(w.loyal||50)-3);addNews('n.leak1',v)}
  else if(i===1){evPop(w,1.2);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.leak2',v)}
  twAdd('viral',{w:v.w},'wire',0);return true},
 async bullying(){
  const a=scPick(x=>x.age>=30&&x.pop>=25),b=pickR(mine().filter(x=>x.age<=27&&!x.farewell&&x!==a));if(!a||!b)return false;
  const c=r10(wkRev()*.15),v={a:a.name,b:b.name,m:money(c)};
  const i=await evx('bullying',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;suspend(a,2);evMood(b,8);evMood(a,-4);relLink(a,b,'rv');addNews('n.bully1',v)}
  else{evMood(b,-10);addNews('n.bully2',v)}
  return true},
 async gambling(){
  const w=scPick();if(!w)return false;const c=r10(wkRev()*.3),v={w:w.name,m:money(c)};
  const i=await evx('gambling',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;evMood(w,10);w.loyal=Math.min(100,(w.loyal||50)+8);addNews('n.gamble1',v)}
  else{if(rnd()<.4){evPop(w,-1);evMood(w,-10);addNews('n.gamble2a',v);twAdd('crime',{w:v.w},'wire',-.5)}else evMood(w,-4)}
  return true},
 async trolltweet(){
  const w=scPick();if(!w)return false;const v={w:w.name};
  const i=await evx('trolltweet',v,['1','2','3'],[false,false,false]);
  if(i===0){evMood(w,-2);evPop(w,-.5);addNews('n.troll1',v)}
  else if(i===1){if(rnd()<.5){evPop(w,1);addNews('n.troll2a',v)}else{evPop(w,-2);G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.troll2b',v)}}
  else{evMood(w,-5);addNews('n.troll3',v)}
  twAdd('viral',{w:v.w},'wire',-.2);return true}
});
E('arrest','Zatrzymanie po bójce','Arrested after a brawl','{w} został zatrzymany przez policję po bójce w barze. Kaucja i prawnik kosztują {m}.','{w} was detained by police after a bar brawl. Bail and a lawyer cost {m}.',[['Wpłać kaucję ({m})','Post bail ({m})'],['Niech spędzi noc w areszcie (zawieszenie)','Let them cool off in a cell (suspension)'],['Zwolnij','Release them']]);
E('dui','Jazda po alkoholu','Drunk driving','{w} został zatrzymany za jazdę po alkoholu. Media już o tym piszą.','{w} was stopped for drunk driving. The media is already on it.',[['Publiczne przeprosiny i zawieszenie','Public apology and suspension'],['Broń zawodnika w mediach','Defend them in the media'],['Program terapii ({m}, 4 tyg. zawieszenia)','Treatment program ({m}, 4 weeks suspended)']]);
E('wellness','Oblany test wellness','Failed wellness test','{w} nie przeszedł testu wellness. Co robisz?','{w} failed the wellness test. What do you do?',[['Zawieś na 4 tygodnie','Suspend for 4 weeks'],['Opłać rehabilitację ({m}, 6 tyg.)','Pay for rehab ({m}, 6 weeks)'],['Zatuszuj sprawę','Cover it up']]);
E('drugsraid','Nalot policji','Police raid','Anonimowy donos: policja chce przeszukać zaplecze po gali.','An anonymous tip: police want to search the backstage area after the show.',[['Współpracuj (ekipa się denerwuje)','Cooperate (the crew gets nervous)'],['Wynajmij prawnika ({m})','Hire a lawyer ({m})'],['Utrudniaj','Obstruct']]);
E('fanbrawl','Bójka z kibicami','Fan brawl','Po gali ochrona starła się z grupą kibiców. Poszkodowani żądają {m}.','After the show security clashed with a group of fans. The injured want {m}.',[['Zapłać odszkodowanie ({m})','Pay damages ({m})'],['Wszystkiego się wyprzyj','Deny everything']]);
E('ownerscandal','Afera wokół właściciela','Owner scandal','Media publikują niepokojące zarzuty pod adresem Twojej osoby jako właściciela. Firma PR kosztuje {m}.','The press runs troubling allegations about you as the owner. A PR firm costs {m}.',[['Zatrudnij firmę PR ({m})','Hire a PR firm ({m})'],['Walcz publicznie','Fight it publicly'],['Wycofaj się z kamer na jakiś czas','Step back from the cameras for a while']]);
E('payoff','Cichy układ','Hush money','Doradca sugeruje, żeby zapłacić {m} za milczenie w niewygodnej sprawie.','An adviser suggests paying {m} to keep a sensitive matter quiet.',[['Zapłać ({m})','Pay ({m})'],['Odmów i niech sprawa wyjdzie','Refuse and let it come out']]);
E('shadybacker','Podejrzany inwestor','Shady backer','Tajemniczy inwestor oferuje {m} bez zbędnych pytań.','A mysterious investor offers {m} with no questions asked.',[['Weź pieniądze ({m})','Take the money ({m})'],['Odmów','Refuse']]);
E('taxaudit','Kontrola skarbowa','Tax audit','Urząd skarbowy zapowiada kontrolę. Księgowi kosztują {m}, a kara za błędy to {f}.','The tax office announces an audit. Accountants cost {m}, while a penalty for errors is {f}.',[['Zatrudnij księgowych ({m})','Hire accountants ({m})'],['Poradź sobie sam','Handle it yourself']]);
E('leakedvideo','Wyciek nagrania','Leaked video','Do sieci trafiło nagranie z imprezy {w}. Krąży po całym internecie.','A video from {w}\'s party leaked online. It is spreading everywhere.',[['Kara i ostrzeżenie','Fine and a warning'],['Obrać w żart','Laugh it off'],['Zignoruj','Ignore it']]);
E('bullying','Dokuczanie w szatni','Locker room bullying','{b} skarży się na dokuczanie ze strony {a}. Wewnętrzne dochodzenie kosztuje {m}.','{b} complains about bullying from {a}. An internal investigation costs {m}.',[['Zbadaj sprawę ({m})','Investigate ({m})'],['Zbagatelizuj','Brush it off']]);
E('gambling','Długi hazardowe','Gambling debts','{w} wpadł w długi hazardowe i prosi o pomoc. Zaliczka kosztuje {m}.','{w} fell into gambling debts and asks for help. An advance costs {m}.',[['Daj zaliczkę ({m})','Give an advance ({m})'],['Odmów','Refuse']]);
E('trolltweet','Kontrowersyjny wpis','Controversial post','Wpis {w} w sieci wywołał burzę.','A post by {w} sparked a storm online.',[['Przeprosiny','Apology'],['Broń zawodnika','Defend them'],['Kara i usunięcie wpisu','Fine and delete the post']]);
Object.assign(D,{
 'n.arrest1':['{w} wyszedł za kaucją i wraca po tygodniu.','{w} was bailed out and returns after a week.'],'n.arrest2':['{w} zawieszony na 3 tygodnie po zatrzymaniu.','{w} suspended for 3 weeks after the arrest.'],'n.arrest3':['Federacja zwolniła {w} po zatrzymaniu przez policję.','The promotion released {w} after the police arrest.'],
 'n.dui1':['{w} przeprosił za jazdę po alkoholu i został zawieszony.','{w} apologized for drunk driving and was suspended.'],'n.dui2a':['Obrona {w} w mediach zakończyła się burzą.','Defending {w} in the media backfired.'],'n.dui2b':['Fani wybaczyli {w} wpadkę.','Fans forgave {w} for the slip.'],'n.dui3':['{w} zawieszony na 4 tygodnie i skierowany na terapię.','{w} suspended for 4 weeks and sent to treatment.'],
 'n.well1':['{w} zawieszony na 4 tygodnie po teście wellness.','{w} suspended for 4 weeks after the wellness test.'],'n.well2':['{w} trafia na rehabilitację opłaconą przez federację.','{w} enters rehab paid for by the promotion.'],'n.well3a':['Próba zatuszowania sprawy {w} wyszła na jaw.','The attempt to cover up the {w} case came out.'],'n.well3b':['Sprawa {w} nie wyszła poza szatnię.','The {w} case stayed in the locker room.'],
 'n.raidp1':['Policja przeszukała zaplecze, ekipa jest zdenerwowana.','Police searched the backstage, the crew is on edge.'],'n.raidp2':['Prawnik przypilnował, by kontrola przebiegła spokojnie.','A lawyer kept the search calm.'],'n.raidp3a':['Utrudnianie kontroli skończyło się medialną aferą.','Obstructing the search ended in a media scandal.'],'n.raidp3b':['Policja nic nie znalazła i odpuściła.','Police found nothing and dropped it.'],
 'n.fanb1':['Odszkodowanie uciszyło sprawę po bójce z kibicami.','Damages settled the fan brawl.'],'n.fanb2a':['Wyparcie się bójki z kibicami zaszkodziło wizerunkowi.','Denying the fan brawl hurt the image.'],'n.fanb2b':['Sprawa bójki z kibicami rozeszła się po kościach.','The fan brawl blew over.'],
 'n.owner1':['Firma PR opanowała aferę wokół właściciela.','A PR firm contained the owner scandal.'],'n.owner2a':['Fani stanęli po stronie właściciela.','Fans rallied behind the owner.'],'n.owner2b':['Publiczna walka o dobre imię skończyła się porażką i kosztami.','The public fight for your name ended in defeat and costs.'],'n.owner3':['Właściciel zniknął z kamer, a ekipa odetchnęła.','The owner stepped away from the cameras and the crew relaxed.'],
 'n.payoff1a':['Cichy układ wyszedł na jaw i uderzył w federację.','The hush deal came out and hurt the promotion.'],'n.payoff1b':['Cichy układ pozostał tajemnicą.','The hush deal stayed secret.'],'n.payoff2':['Odmowa zapłaty zaskarbiła szacunek szatni.','Refusing to pay earned the locker room\'s respect.'],
 'n.shady1a':['Podejrzany inwestor zniknął, zostawiając śledztwo i straty.','The shady backer vanished, leaving an investigation and losses.'],'n.shady1b':['Tajemniczy inwestor wpłacił pieniądze i zniknął.','The mysterious investor paid in and disappeared.'],
 'n.tax1':['Księgowi przeprowadzili federację przez kontrolę skarbową.','Accountants guided the promotion through the tax audit.'],'n.tax2a':['Kontrola skarbowa nałożyła karę.','The tax audit imposed a penalty.'],'n.tax2b':['Kontrola skarbowa nic nie wykryła.','The tax audit found nothing.'],
 'n.leak1':['{w} dostał karę po wycieku nagrania.','{w} was fined after the leaked video.'],'n.leak2':['{w} obrócił wyciek nagrania w żart.','{w} turned the leaked video into a joke.'],
 'n.bully1':['Dochodzenie: {a} zawieszony za dokuczanie {b}.','Investigation: {a} suspended for bullying {b}.'],'n.bully2':['Zbagatelizowanie skargi {b} nadwerężyło atmosferę.','Brushing off {b}\'s complaint strained the mood.'],
 'n.gamble1':['{w} dostał zaliczkę i spłacił długi.','{w} got an advance and paid off the debts.'],'n.gamble2a':['Długi hazardowe {w} wyszły na jaw.','{w}\'s gambling debts came to light.'],
 'n.troll1':['{w} przeprosił za kontrowersyjny wpis.','{w} apologized for the controversial post.'],'n.troll2a':['Fani stanęli murem za {w} po kontrowersyjnym wpisie.','Fans stood behind {w} after the controversial post.'],'n.troll2b':['Obrona {w} po kontrowersyjnym wpisie zaszkodziła federacji.','Defending {w} after the controversial post hurt the promotion.'],'n.troll3':['{w} dostał karę i usunął wpis.','{w} was fined and deleted the post.'],
 'tw.crime':['{w} zatrzymany po incydencie. Federacja bada sprawę.','{w} detained after an incident. The promotion is looking into it.'],
 'tw.drug':['{w} i sprawa testów wellness: federacja wydaje oświadczenie.','{w} and the wellness test issue: the promotion issues a statement.'],
 'tw.raid':['Policja na zapleczu gali {f}: trwa przeszukanie.','Police backstage at {f}: a search is underway.'],
 'tw.owner':['Wokół właściciela {f} narastają kontrowersje.','Controversy swirls around the owner of {f}.'],
 'tw.viral':['{w} na językach całej sieci po głośnym incydencie.','{w} is all over the internet after a viral incident.']
});
const SCP={
 crime:{pos:[['Trzymaj się, {w}. Każdemu zdarza się błąd.','Hang in there, {w}. Everyone makes mistakes.'],['Mam nadzieję, że to nieporozumienie.','Hope it\'s a misunderstanding.']],
  neg:[['{w} znowu pakuje się w kłopoty. Dość tego.','{w} in trouble again. Enough already.'],['Federacja nie może tego tolerować.','The promotion can\'t tolerate this.']],
  neu:[['Poczekajmy na oficjalne oświadczenie.','Let\'s wait for the official statement.'],['Ciekawe, co na to zarząd.','Wonder what management says.']],
  joke:[['Po tym {w} potrzebuje lepszego menedżera. I prawnika.','After this {w} needs a better manager. And a lawyer.'],['Chociaż wejście do ringu miało więcej klasy.','At least the ring entrance had more class.']]},
 drug:{pos:[['Zdrowie najważniejsze. Wracaj silniejszy.','Health comes first. Come back stronger.'],['Dobrze, że federacja reaguje.','Good that the promotion reacts.']],
  neg:[['Kolejny test, kolejny skandal.','Another test, another scandal.'],['Zero tolerancji. Powinni zwolnić zawodnika.','Zero tolerance. They should fire the wrestler.']],
  neu:[['Ciekawe, jak długo potrwa zawieszenie.','Wonder how long the suspension lasts.'],['Mam nadzieję, że dostanie pomoc, a nie tylko karę.','Hope they get help, not just punishment.']],
  joke:[['Wellness w nazwie, test w życiu.','Wellness in the name, test in real life.'],['Ten test miał więcej akcji niż ostatnia gala.','That test had more action than the last show.']]},
 owner:{pos:[['Poczekajmy na fakty, zanim kogoś osądzimy.','Let\'s wait for the facts before judging.'],['{f} zawsze dbało o fanów, wierzę w nich.','{f} always cared for fans, I believe in them.']],
  neg:[['Właściciel powinien się wytłumaczyć. Natychmiast.','The owner should explain. Immediately.'],['{f} traci wiarygodność z dnia na dzień.','{f} is losing credibility by the day.']],
  neu:[['Czekam na oświadczenie, to brzmi poważnie.','Waiting for a statement, this sounds serious.'],['Ciekawe, czy sponsorzy się wycofają.','Wonder if sponsors will pull out.']],
  joke:[['Gorsza fabuła niż w niejednym feudzie.','Worse storyline than most feuds.'],['Booker w tej historii wyraźnie się pogubił.','The booker in this story is clearly lost.']]},
 viral:{pos:[['Szczerze? {w} ma rację, kocham to.','Honestly? {w} is right, love it.'],['Prawdziwy showman, wiedział co robi.','A true showman, knew what they were doing.']],
  neg:[['Żenada. {w} powinien przeprosić.','Cringe. {w} should apologize.'],['To nie przystoi gwieździe federacji.','That\'s not becoming of a star of the promotion.']],
  neu:[['Wyrwane z kontekstu czy nie, internet już zdecydował.','Out of context or not, the internet has decided.'],['Ciekawe, czy to część fabuły.','Wonder if it\'s part of a storyline.']],
  joke:[['{w} ma więcej wyświetleń niż na ostatniej gali.','{w} has more views than at the last show.'],['Szef pewnie już pisze oświadczenie, w trzech wersjach.','The boss is probably already writing a statement, in three versions.']]}
};
Object.keys(SCP).forEach(p=>Object.keys(SCP[p]).forEach(tn=>TC(p,tn,SCP[p][tn])));
Object.assign(TWPOOL,{raid:'drug',crime:'crime',drug:'drug',owner:'owner',viral:'viral'});
