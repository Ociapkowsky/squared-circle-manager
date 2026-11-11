/* ============ More random world events (batch: relations, fans, stables, titles, shows) ============ */
const evMood=(w,d)=>{w.morale=clamp((w.morale||60)+d,0,100)};
const evPop=(w,d)=>{w.pop=clamp(w.pop+d*popDim(w.pop),1,100)};
Object.assign(WEV,{
 async rivalspat(){
  const ms=mine().filter(w=>!w.farewell&&!w.injury&&rvOf(w).some(r=>!W(r).injury));const a=pickR(ms);if(!a)return false;
  const b=W(pickR(rvOf(a).filter(r=>!W(r).injury)));const c=r10(wkRev()*.2),v={a:a.name,b:b.name,m:money(c)};
  const i=await evx('rivalspat',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;relUnlink(a,b,'rv');evMood(a,4);evMood(b,4);addNews('n.rvspat1',v)}
  else if(i===1){evPop(a,1.2);evPop(b,1.2);evMood(a,-4);evMood(b,-4);G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.rvspat2',v)}
  else{evMood(a,-3);evMood(b,-3)}
  return true},
 async allywish(){
  const a=pickR(mine().filter(w=>!w.farewell&&!w.injury&&alOf(w).some(x=>!W(x).injury)));if(!a)return false;
  const b=W(pickR(alOf(a).filter(x=>!W(x).injury)));const v={a:a.name,b:b.name};
  const i=await evx('allywish',v,['1','2'],[false,false]);
  if(i===0){evMood(a,8);evMood(b,8);G.pairs[pairKey(a.id,b.id)]=(G.pairs[pairKey(a.id,b.id)]||0)+3;addNews('n.allywish1',v)}else{evMood(a,-3);evMood(b,-3)}
  return true},
 async fanfest(){
  if(G.fed.pop<8)return false;const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('fanfest',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.7,2,100);mine().filter(w=>w.pop>=25).forEach(w=>evPop(w,.4));addNews('n.fanfest')}
  return true},
 async charity(){
  const c=r10(wkRev()*.35),v={m:money(c)};
  const i=await evx('charity',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.9,2,100);mine().forEach(w=>evMood(w,3));addNews('n.charity');twAdd('charity',{},'me',.6)}
  else G.fed.pop=clamp(G.fed.pop-.15,2,100);
  return true},
 async podcast(){
  const w=pickR(mine().filter(x=>x.pop>=25&&x.mic>=45&&!x.farewell));if(!w)return false;
  const v={w:w.name};const i=await evx('podcast',v,['1','2'],[false,false]);
  if(i===0){if(rnd()<.75){evPop(w,2);evMood(w,5);G.fed.pop=clamp(G.fed.pop+.15,2,100);addNews('n.podcast1',v)}else{evPop(w,-1.5);G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.podcast2',v)}}
  else evMood(w,-5);
  return true},
 async hiddeninj(){
  const w=pickR(mine().filter(x=>x.fatigue>=65&&!x.injury&&x.pop>=15));if(!w)return false;
  const v={w:w.name};const i=await evx('hiddeninj',v,['1','2'],[false,false]);
  if(i===0){w.fatigue=Math.max(0,w.fatigue-35);evMood(w,-2);addNews('n.hiddeninj1',v)}
  else{evMood(w,4);if(rnd()<.45&&!w.injury){injure(w,2+Math.floor(rnd()*6));addNews('n.hiddeninj2',v)}}
  return true},
 async merchbet(){
  if(G.fed.pop<10)return false;const c=r10(wkRev()*.4),v={m:money(c),b:money(r10(c*2))};
  const i=await evx('merchbet',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.55){G.fed.cash+=r10(c*2);addNews('n.merchbet1',v)}else addNews('n.merchbet2',v)}
  return true},
 async hallissue(){
  const c=r10(wkRev()*.3),v={m:money(c)};
  const i=await evx('hallissue',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.hall1')}else{G.fed.pop=clamp(G.fed.pop-.8,2,100);G.fed.cash+=r10(c*.5);addNews('n.hall2')}
  return true},
 async legendvisit(){
  const l=pickR(mine().filter(x=>x.age>=36&&x.pop>=35&&!x.farewell));if(!l)return false;
  const c=r10(wkRev()*.25),v={w:l.name,m:money(c)};
  const i=await evx('legendvisit',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.8,2,100);evPop(l,1);mine().filter(x=>x.age<=28).forEach(x=>evMood(x,3));addNews('n.legend1',v);twAdd('legend',{w:l.name},'me',.5)}
  return true},
 async fanpoll(){
  const w=pickR(mine().filter(x=>x.pop>=20&&x.pop<=70&&!x.farewell&&!x.injury));if(!w)return false;
  const v={w:w.name};const i=await evx('fanpoll',v,['1','2'],[false,false]);
  if(i===0){evPop(w,2.2);evMood(w,8);G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.fanpoll1',v)}
  else{evMood(w,-4);G.fed.pop=clamp(G.fed.pop-.1,2,100)}
  return true},
 async docucrew(){
  if(G.fed.pop<20)return false;const v={};const i=await evx('docucrew',v,['1','2'],[false,false]);
  if(i===0){if(rnd()<.7){G.fed.pop=clamp(G.fed.pop+1.1,2,100);addNews('n.docu1')}else{G.fed.pop=clamp(G.fed.pop-1,2,100);addNews('n.docu2')}}
  return true},
 async mentor(){
  const y=pickR(mine().filter(x=>x.age<=26&&x.pot>=50&&!x.injury&&!x.farewell));if(!y)return false;
  const o=pickR(mine().filter(x=>x.age>=34&&x.psy>=y.psy&&!x.injury&&!x.farewell&&x!==y));if(!o)return false;
  const v={a:o.name,b:y.name};const i=await evx('mentor',v,['1','2'],[false,false]);
  if(i===0){const k=pickR(['psy','ring','sta']);y[k]=clamp(y[k]+2,1,99);evMood(o,5);evMood(y,5);relLink(o,y,'al');addNews('n.mentor1',{a:o.name,b:y.name,k:t('st.'+k)})}
  else evMood(o,-3);
  return true},
 async titledispute(){
  const tt=pickR(G.titles.filter(x=>x.holders.length&&G.week-(x.since||0)>=10&&(x.def||0)<=1));if(!tt)return false;
  const v={t:titleName(tt),w:names(tt.holders)};const i=await evx('titledispute',v,['1','2'],[false,false]);
  if(i===0){tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)+.1,1,5);tt.holders.forEach(h=>{if(W(h))evMood(W(h),3)});addNews('n.tdisp1',v)}
  else{tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)-.15,1,5);addNews('n.tdisp2',v)}
  return true},
 async stablerow(){
  const st=pickR(G.stables.filter(s=>s.members.filter(id=>W(id)&&!W(id).farewell).length>=3));if(!st)return false;
  const ms=st.members.map(W).filter(Boolean);const c=r10(wkRev()*.15),x=pickR(ms),v={s:st.name,w:x.name,m:money(c)};
  const i=await evx('stablerow',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;ms.forEach(w=>evMood(w,4));addNews('n.strow1',v)}
  else{evMood(x,-10);if(rnd()<.45){removeFromStable(x.id);addNews('n.strow2',v)}}
  return true},
 async anniv(){
  if(G.week%52>3||G.week<30)return false;const c=r10(wkRev()*.5),v={m:money(c)};
  const i=await evx('anniv',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1,2,100);mine().forEach(w=>evMood(w,2));addNews('n.anniv1');twAdd('charity',{},'me',.6)}
  return true},
 async tourbus(){
  const c=r10(wkRev()*.2),v={m:money(c)};
  const i=await evx('tourbus',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.bus1')}else{mine().forEach(w=>{w.fatigue=clamp(w.fatigue+8,0,100)});G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.bus2')}
  return true},
 async socialcallout(){
  const a=pickR(mine().filter(x=>x.pop>=25&&!x.injury&&!x.farewell&&rvOf(x).length));if(!a)return false;
  const b=W(pickR(rvOf(a)));if(!b||b.injury)return false;const v={a:a.name,b:b.name};
  const i=await evx('socialcallout',v,['1','2'],[false,false]);
  if(i===0){evPop(a,1);evPop(b,1);G.fed.pop=clamp(G.fed.pop+.3,2,100);twAdd('callout',{a:a.name,b:b.name,w:a.name},'fan:'+pickR(G.fans).h,0);addNews('n.callout1',v)}
  else{evMood(a,-3)}
  return true}
});
E('rivalspat','Starcie rywali w szatni','Rivals clash backstage','{a} i {b} pokłócili się za kulisami. Mediator kosztuje {m}. Możesz też wykorzystać napięcie przed kamerami.','{a} and {b} got into it backstage. A mediator costs {m}. You could also use the tension on camera.',[['Mediacja ({m}) – koniec rywalizacji','Mediation ({m}) – ends the rivalry'],['Wykorzystaj to (popularność w górę, morale w dół)','Use it (popularity up, morale down)'],['Zignoruj','Ignore it']]);
E('allywish','Prośba sojuszników','Allies\' request','{a} i {b} proszą, żeby częściej występowali razem.','{a} and {b} ask to be booked together more often.',[['Zgódź się (morale +, więcej wspólnych walk)','Agree (morale up, more teamwork)'],['Odmów','Decline']]);
E('fanfest','Festiwal fanów','Fan festival','Fani proszą o dzień otwarty z autografami. Organizacja kosztuje {m}.','Fans ask for an open day with autographs. Organizing it costs {m}.',[['Zorganizuj ({m})','Organize it ({m})'],['Nie teraz','Not now']]);
E('charity','Gala charytatywna','Charity show','Lokalna fundacja prosi o charytatywny pokaz. Koszt: {m}, ale zyskasz sympatię miasta i ekipy.','A local foundation asks for a charity show. Cost: {m}, but the city and your roster will like you for it.',[['Zgódź się ({m})','Agree ({m})'],['Odmów','Decline']]);
E('podcast','Podcast zawodnika','Wrestler\'s podcast','{w} chce założyć własny podcast o wrestlingu. To może przynieść rozgłos, ale i kłopoty.','{w} wants to start their own wrestling podcast. It could bring exposure, but also trouble.',[['Pozwól','Allow it'],['Zabroń','Forbid it']]);
E('hiddeninj','Ukryta kontuzja','Hidden injury','{w} jest wyraźnie wyczerpany i coś ukrywa. Trener radzi odpoczynek.','{w} is clearly exhausted and hiding something. The trainer advises rest.',[['Wymuś odpoczynek','Force rest'],['Niech walczy dalej','Let them keep wrestling']]);
E('merchbet','Ryzykowny merch','Merch gamble','Projektant proponuje limitowaną serię koszulek za {m}. Może przynieść nawet {b}, ale może też zostać na magazynie.','A designer pitches a limited T-shirt run for {m}. It might return up to {b}, or rot in the warehouse.',[['Zainwestuj ({m})','Invest ({m})'],['Odpuść','Pass']]);
E('hallissue','Problem z halą','Venue problem','Hala ogłasza awarię ogrzewania. Tymczasowa hala kosztuje {m}, albo odwołujesz część biletów.','The venue reports a heating failure. A temporary hall costs {m}, or you refund part of the tickets.',[['Wynajmij zastępczą ({m})','Rent a replacement ({m})'],['Zwróć część biletów','Refund part of the tickets']]);
E('legendvisit','Wizyta legendy','Legend\'s visit','{w} chce wygłosić pożegnalne przemówienie do młodych zawodników. Gala okolicznościowa kosztuje {m}.','{w} wants to give a farewell speech to the young wrestlers. A tribute show costs {m}.',[['Zorganizuj ({m})','Organize it ({m})'],['Odpuść','Pass']]);
E('fanpoll','Fani wybierają','Fan poll','Fani w ankiecie online chcą większej roli dla {w}.','Fans in an online poll want a bigger role for {w}.',[['Wysłuchaj fanów (push dla {w})','Listen to the fans (push {w})'],['Zignoruj ankietę','Ignore the poll']]);
E('docucrew','Ekipa dokumentalna','Documentary crew','Ekipa filmowa chce nakręcić dokument o Twojej federacji. Może to być PR lub skandal.','A film crew wants to shoot a documentary about your promotion. It could be great PR or a scandal.',[['Zgódź się','Agree'],['Odmów','Decline']]);
E('mentor','Mentoring','Mentorship','{a} chce wziąć pod skrzydła młodego {b}.','{a} wants to take young {b} under their wing.',[['Zgódź się (+2 do umiejętności)','Approve (+2 to a skill)'],['Odmów','Decline']]);
E('titledispute','Spór o pas','Title dispute','Fani narzekają, że {t} ({w}) rzadko jest broniony.','Fans complain that the {t} ({w}) is rarely defended.',[['Obiecaj częstsze obrony','Promise more defenses'],['Zignoruj','Ignore it']]);
E('stablerow','Kłótnia w stajni','Stable argument','W stajni {s} zrobiło się gorąco: {w} chce odejść. Mediacja kosztuje {m}.','Tension in stable {s}: {w} wants out. Mediation costs {m}.',[['Mediacja ({m})','Mediate ({m})'],['Niech sami to rozwiążą','Let them sort it out']]);
E('anniv','Rocznica federacji','Promotion anniversary','Zbliża się rocznica Twojej federacji. Specjalne obchody kosztują {m}.','Your promotion\'s anniversary is coming. Special celebrations cost {m}.',[['Świętuj ({m})','Celebrate ({m})'],['Nie teraz','Not now']]);
E('tourbus','Awaria autobusu','Bus breakdown','Autobus ekipy zepsuł się w trasie. Naprawa kosztuje {m}.','The crew bus broke down on the road. Repairs cost {m}.',[['Napraw natychmiast ({m})','Repair now ({m})'],['Jedźcie jak się da (zmęczenie)','Make do (fatigue)']]);
E('socialcallout','Wyzwanie w sieci','Online callout','{a} publicznie wyzywa {b} na Tweener X.','{a} publicly calls out {b} on Tweener X.',[['Podkręć napięcie','Fuel the fire'],['Uspokój sytuację','Calm things down']]);
Object.assign(D,{
 'n.rvspat1':['Mediacja zakończyła konflikt {a} i {b}.','Mediation ended the conflict between {a} and {b}.'],
 'n.rvspat2':['Kłótnia {a} i {b} podgrzała atmosferę przed galą.','The {a} and {b} spat heated up the build.'],
 'n.allywish1':['{a} i {b} będą częściej występować razem.','{a} and {b} will team up more often.'],
 'n.fanfest':['Festiwal fanów przyciągnął tłumy.','The fan festival drew crowds.'],
 'n.charity':['Gala charytatywna poprawiła wizerunek federacji.','The charity show improved the promotion\'s image.'],
 'n.podcast1':['Podcast {w} zdobył słuchaczy i rozgłos.','{w}\'s podcast found an audience.'],
 'n.podcast2':['Podcast {w} wywołał kontrowersje.','{w}\'s podcast caused controversy.'],
 'n.hiddeninj1':['{w} odpoczął i wrócił do formy.','{w} rested and recovered.'],
 'n.hiddeninj2':['Ukryta kontuzja {w} wyszła na jaw.','{w}\'s hidden injury came to light.'],
 'n.merchbet1':['Limitowany merch rozszedł się błyskawicznie (+{b}).','The limited merch sold out fast (+{b}).'],
 'n.merchbet2':['Limitowany merch zalega w magazynie.','The limited merch is stuck in the warehouse.'],
 'n.hall1':['Zastępcza hala uratowała galę.','A replacement hall saved the show.'],
 'n.hall2':['Część widzów dostała zwrot biletów po awarii hali.','Part of the crowd was refunded after the venue failure.'],
 'n.legend1':['Wieczór dla {w} wzruszył fanów i młodych zawodników.','The tribute for {w} moved fans and young wrestlers.'],
 'n.fanpoll1':['Fani dostali swoje: {w} dostaje większy push.','Fans got their way: {w} gets a bigger push.'],
 'n.docu1':['Dokument o federacji spodobał się widzom.','The documentary about the promotion won viewers over.'],
 'n.docu2':['Dokument pokazał kulisy w złym świetle.','The documentary showed the backstage in a bad light.'],
 'n.mentor1':['{a} uczy {b}: poprawa ({k}).','{a} mentors {b}: improved {k}.'],
 'n.tdisp1':['Obietnica częstszych obron podniosła prestiż {t}.','The promise of more defenses raised the prestige of the {t}.'],
 'n.tdisp2':['Prestiż {t} spadł po krytyce fanów.','The {t} lost prestige after fan criticism.'],
 'n.strow1':['Mediacja uspokoiła stajnię {s}.','Mediation calmed stable {s}.'],
 'n.strow2':['{w} opuszcza stajnię {s} po kłótni.','{w} leaves stable {s} after an argument.'],
 'n.anniv1':['Rocznica federacji uczczona wielką fetą.','The promotion\'s anniversary was celebrated in style.'],
 'n.bus1':['Autobus naprawiony, trasa bez opóźnień.','Bus repaired, tour back on schedule.'],
 'n.bus2':['Awaria autobusu zmęczyła ekipę.','The bus breakdown wore out the crew.'],
 'n.callout1':['{a} wywołał {b} na Tweener X: fani oszaleli.','{a} called out {b} on Tweener X: fans went wild.'],
 'tw.charity':['Dziękujemy wszystkim, którzy wspierają nas poza ringiem!','Thank you to everyone who supports us outside the ring!'],
 'tw.callout':['{a} publicznie wyzywa {b}: "Podaj datę!"','{a} publicly calls out {b}: "Name the date!"'],
 'tw.legend':['Wieczór pożegnalny dla {w} - łzy w oczach.','A tribute night for {w} - tears all around.']
});
TWGEN.callout='gw';TWGEN.charity='gf';TWGEN.legend='gw';

/* in-show events tied to rivals/allies and the crowd */
Object.assign(EV,{rvheckle:[{stars:.25,heat:8},{stars:.5,heat:12,fin:'dirty',inj:.08},{stars:-.25}],allycorner:[{stars:.25,heat:3},{stars:.1}],lights:[{stars:.5,heat:5,inj:.05},{stars:-.25}],banner:[{stars:.25,heat:4},{stars:0}]});
Object.assign(D,{
 'ev.rvheckle.t':['Rywal na widowni','A rival in the crowd'],'ev.rvheckle.b':['{s} siedzi na widowni i wyzywa zawodników.','{s} sits in the crowd and taunts the wrestlers.'],
 'ev.rvheckle.1':['Niech się wyżyje','Let them vent'],'ev.rvheckle.1d':['Ciche napięcie podnosi emocje.','The tension raises the heat.'],
 'ev.rvheckle.2':['Wpuść do ringu','Bring them in'],'ev.rvheckle.2d':['Chaos i brudne zakończenie, ryzyko kontuzji.','Chaos and a dirty finish, some injury risk.'],
 'ev.rvheckle.3':['Ochrona go wyprowadza','Security removes them'],'ev.rvheckle.3d':['Spokój, ale mniej emocji.','Calm, but less excitement.'],
 'ev.allycorner.t':['Sojusznik w narożniku','An ally at ringside'],'ev.allycorner.b':['{s} pojawia się przy ringu, żeby wspierać zawodnika.','{s} shows up at ringside to support the wrestler.'],
 'ev.allycorner.1':['Niech zostanie','Let them stay'],'ev.allycorner.1d':['Fani reagują na wsparcie.','The fans react to the support.'],
 'ev.allycorner.2':['Odeślij za kulisy','Send them backstage'],'ev.allycorner.2d':['Bez zmian.','No change.'],
 'ev.lights.t':['Awaria oświetlenia','Lighting failure'],'ev.lights.b':['W połowie walki gaśnie połowa świateł.','Half the lights go out mid-match.'],
 'ev.lights.1':['Walczcie dalej w półmroku','Keep fighting in the dim light'],'ev.lights.1d':['Klimat podnosi emocje, drobne ryzyko.','The mood raises the heat, small risk.'],
 'ev.lights.2':['Przerwij na chwilę','Pause briefly'],'ev.lights.2d':['Bezpiecznie, ale mniej płynnie.','Safe, but it kills the flow.'],
 'ev.banner.t':['Transparent fanów','A fan banner'],'ev.banner.b':['Fani rozwijają wielki transparent dla {w}.','Fans unfurl a huge banner for {w}.'],
 'ev.banner.1':['Pokaż w kamerze','Show it on camera'],'ev.banner.1d':['Mały zastrzyk emocji.','A small boost of excitement.'],
 'ev.banner.2':['Zignoruj','Ignore it'],'ev.banner.2d':['Bez efektu.','No effect.']});
