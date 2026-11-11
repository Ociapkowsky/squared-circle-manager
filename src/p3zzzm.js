/* ===== extra random events: health, career, sound (set by eye) ===== */
{
const NX=(k,t,b,o,n,fx,v,gate,cost)=>XE({k,t,b,o,n,fx,v:v||(()=>({})),gate,cost});
const H=f=>()=>{try{return G.week>=30&&f()}catch(e){return false}};
const hp=f=>{const l=hlLive().filter(f);return l.length?pickR(l):null};
const hv=(f,ex)=>()=>{const w=hp(f);return Object.assign({w:w?w.name:'?',id:w?w.id:''},ex?ex(w):{})};
const cm=f=>({c:xc(f),mm:money(xc(f))});
const adj=(id,a,b)=>{const w=W(id);if(w){if(a)w.morale=clamp((w.morale||50)+a,0,100);if(b)w.wear=clamp(wearOf(w)+b,0,100)}};
/* --- health --- */
NX('hlmassage',['Fizjoterapeuta w ekipie','A physio on staff'],['Fizjoterapeuta chce dołączyć do ekipy na kilka gal. Koszt: {mm}.','A physiotherapist wants to join the crew for a few shows. Cost: {mm}.'],
 [['Zatrudnij ({mm})','Hire ({mm})'],['Odmów','Decline']],[['Skład czuje się lepiej.','The roster feels better.'],['Bez zmian.','No change.']],
 [v=>{xcash(-v.c);hlLive().forEach(w=>{w.wear=clamp(wearOf(w)-8,0,100)})},()=>{}],()=>cm(.07),H(()=>rnd()<.3),[1,0]);
NX('hlnutri',['Dietetyk sportowy','A sports dietitian'],['Dietetyk oferuje plan żywieniowy dla składu za {mm}.','A dietitian offers a nutrition plan for the roster for {mm}.'],
 [['Wykup plan ({mm})','Buy the plan ({mm})'],['Zawodnicy poradzą sobie sami','They can manage alone']],[['Zawodnicy są w lepszej formie i nastroju.','Wrestlers are in better shape and mood.'],['Jedzą, co popadnie.','They eat whatever.']],
 [v=>{xcash(-v.c);hlLive().forEach(w=>{w.wear=clamp(wearOf(w)-4,0,100);w.morale=clamp((w.morale||50)+2,0,100)})},()=>{}],()=>cm(.06),H(()=>rnd()<.3),[1,0]);
NX('hlsleep',['Zmęczenie po trasie','Tour fatigue'],['Skład jest wykończony serią gal. Możesz dać wszystkim tydzień luzu albo jechać dalej.','The roster is drained from the run of shows. You can give everyone a week off or push on.'],
 [['Daj tydzień wolnego','Give a week off'],['Jedziemy dalej','Push on']],[['Odpoczęci wracają silniejsi, ale gala traci rozmach.','Rested, they return stronger, but the show loses momentum.'],['Gala trzyma tempo, zmęczenie rośnie.','The show keeps its pace, fatigue grows.']],
 [()=>{hlLive().forEach(w=>{w.wear=clamp(wearOf(w)-6,0,100)});xpop(-.2)},()=>{hlLive().forEach(w=>{w.wear=clamp(wearOf(w)+4,0,100)});xpop(.2)}],null,H(()=>rnd()<.3));
NX('hlretire',['Weteran myśli o emeryturze','A veteran thinks about retiring'],['Kontuzjowany {w} przyznaje, że zastanawia się nad końcem kariery.','The injured {w} admits he is thinking about the end of his career.'],
 [['Namów, by został','Persuade him to stay'],['Uszanuj jego zdanie','Respect his view']],[['Zostaje, ale z ciężkim sercem.','He stays, but reluctantly.'],['Szatnia ceni Twoją postawę.','The locker room values your attitude.']],
 [v=>adj(v.id,-4,0),()=>{xconf(1);xmood(2)}],hv(w=>(w.age||0)>=36&&w.injury>0),H(()=>!!hp(w=>(w.age||0)>=36&&w.injury>0)&&rnd()<.4));
NX('hlrehab',['Ośrodek rehabilitacji','A rehab centre'],['Ośrodek rehabilitacji proponuje pakiet dla Twoich kontuzjowanych za {mm}.','A rehab centre offers a package for your injured wrestlers for {mm}.'],
 [['Skorzystaj ({mm})','Accept ({mm})'],['Nie','No']],[['Kontuzje goją się szybciej.','Injuries heal faster.'],['Wszystko po staremu.','Same as before.']],
 [v=>{xcash(-v.c);hlLive().filter(w=>w.injury>0).forEach(w=>{w.injury=Math.max(1,w.injury-2)})},()=>{}],()=>cm(.09),H(()=>hlLive().some(w=>w.injury>0)&&rnd()<.4),[1,0]);
NX('hlsupp',['Podejrzane suplementy','Questionable supplements'],['{w} chce brać suplementy "na regenerację" od nieznanego dostawcy.','{w} wants to take "recovery" supplements from an unknown supplier.'],
 [['Pozwól','Allow it'],['Zakaż','Ban it']],[['Czuje się świetnie, ale to ryzykowne.','He feels great, but it is risky.'],['Jest zawiedziony, ale bezpieczny.','He is disappointed but safe.']],
 [v=>{const w=W(v.id);if(w){w.wear=clamp(wearOf(w)-10,0,100);if(rnd()<.25&&!w.injury)injure(w,5,false);xconf(-2)}},v=>adj(v.id,-3,0)],hv(w=>w.pop>=20),H(()=>!!hp(w=>w.pop>=20)&&rnd()<.3));
NX('hlyoung',['Młody talent się przepracowuje','A young talent is overworked'],['{w} jest młody i chce pokazać się w każdej walce, ale jego ciało ma dość.','{w} is young and wants to feature in every match, but his body has had enough.'],
 [['Dać mu odpocząć','Rest him'],['Daj mu szansę','Give him the spot']],[['Rozsądna decyzja.','A sensible call.'],['Publiczność go pokochała, ale ryzyko rośnie.','The crowd loved him, but the risk rises.']],
 [v=>adj(v.id,0,-12),v=>{const w=W(v.id);if(w){w.pop=clamp(w.pop+.8,0,100);w.wear=clamp(wearOf(w)+6,0,100);if(rnd()<.2&&!w.injury)injure(w,4,false)}}],hv(w=>(w.age||99)<=25&&wearOf(w)>=45),H(()=>!!hp(w=>(w.age||99)<=25&&wearOf(w)>=45)&&rnd()<.4));
NX('hlfamily',['Rodzina się martwi','The family is worried'],['Żona {w} prosi, żeby odpuścił ryzykowne walki.','{w}\'s wife asks him to avoid risky matches.'],
 [['Zgódź się','Agree'],['Odmów','Refuse']],[['Zawodnik jest wdzięczny.','The wrestler is grateful.'],['W domu nie jest wesoło.','Things are tense at home.']],
 [v=>adj(v.id,6,-5),v=>adj(v.id,-5,0)],hv(w=>(w.age||0)>=28&&wearOf(w)>=40),H(()=>!!hp(w=>(w.age||0)>=28&&wearOf(w)>=40)&&rnd()<.35));
NX('hlmats',['Nowe maty i zabezpieczenia','New mats and padding'],['Ring wymaga nowych mat i osłon na liny. Koszt: {mm}.','The ring needs new mats and rope padding. Cost: {mm}.'],
 [['Wymień ({mm})','Replace ({mm})'],['Jeszcze posłużą','They will last']],[['Upadki są mniej bolesne, zarząd chwali.','Falls hurt less and the board approves.'],['Zużycie rośnie.','Wear grows.']],
 [v=>{xcash(-v.c);hlLive().forEach(w=>{w.wear=clamp(wearOf(w)-6,0,100)});xconf(2)},()=>{hlLive().forEach(w=>{w.wear=clamp(wearOf(w)+2,0,100)})}],()=>cm(.08),H(()=>rnd()<.3),[1,0]);
NX('hlangle',['Kontuzja jako wątek','An injury angle'],['Kontuzja {w} może posłużyć jako wątek fabularny: powrót z zemstą.','{w}\'s injury could become a storyline: a return for revenge.'],
 [['Wykorzystaj wątek','Use the angle'],['Nie, to nie czas','Not now']],[['Fani nie mogą się doczekać powrotu.','Fans cannot wait for the return.'],['Kontuzja to tylko kontuzja.','An injury is just an injury.']],
 [v=>{adj(v.id,3,0);const w=W(v.id);if(w)w.pop=clamp(w.pop+.5,0,100);xpop(.2)},()=>{}],hv(w=>w.injury>0&&w.pop>=25),H(()=>!!hp(w=>w.injury>0&&w.pop>=25)&&rnd()<.35));
/* --- career --- */
const C=f=>()=>{try{return G.week>=150&&G.fed.tier>=3&&!(G.cs&&G.cs.ret)&&f()}catch(e){return false}};
NX('cspodcast',['Podcast promotora','A promoter podcast'],['Popularny podcast zaprasza Cię na wywiad o prowadzeniu federacji. Sponsor dorzuca {mm}.','A popular podcast invites you for an interview on running a promotion. The sponsor adds {mm}.'],
 [['Przyjmij zaproszenie','Accept'],['Odmów','Decline']],[['Wywiad jest świetnie odbierany.','The interview goes down well.'],['Bez wywiadu.','No interview.']],
 [()=>{xcash(xc(.05));xpop(.4)},()=>{}],()=>({mm:money(xc(.05))}),C(()=>rnd()<.3));
NX('csconf',['Konferencja branżowa','An industry conference'],['Zaproszono Cię na konferencję promotorów. Wyjazd kosztuje {mm}, ale to szansa na kontakty.','You are invited to a promoters\' conference. The trip costs {mm}, but it is a chance to network.'],
 [['Jedź ({mm})','Go ({mm})'],['Zostań w biurze','Stay at the office']],[['Wracasz z nowymi kontaktami.','You return with new contacts.'],['Biuro działa jak zwykle.','The office runs as usual.']],
 [v=>{xcash(-v.c);xconf(3);xpop(.3)},()=>{}],()=>cm(.06),C(()=>rnd()<.3),[1,0]);
NX('csaward',['Promotor roku','Promoter of the year'],['Branżowy magazyn przyznaje Ci tytuł Promotora Roku. Jak zareagujesz na scenie?','A trade magazine names you Promoter of the Year. How do you react on stage?'],
 [['Skromne podziękowanie','A humble thank-you'],['Efektowne przemówienie','A showy speech']],[['Zarząd jest pod wrażeniem.','The board is impressed.'],['Media mają o czym pisać.','The media have plenty to write about.']],
 [()=>{xconf(3)},()=>{xpop(.6)}],null,C(()=>G.hist.length>=40&&rnd()<.25));
NX('csheir',['Następca','A successor'],['Twój asystent prosi o większą rolę w zarządzaniu federacją. Awans kosztuje {mm} rocznie.','Your assistant asks for a bigger management role. The promotion costs {mm} a year.'],
 [['Awansuj ({mm})','Promote ({mm})'],['Jeszcze nie czas','Not yet']],[['Obowiązki są lepiej rozdzielone.','Duties are better shared.'],['Asystent jest rozczarowany.','The assistant is disappointed.']],
 [v=>{xcash(-v.c);xconf(3);xmood(2)},()=>{xmood(-1)}],()=>cm(.08),C(()=>rnd()<.3),[1,0]);
NX('cslegend',['Legenda wraca na jedną galę','A legend returns for one show'],['Ktoś z Galerii Sław chce wystąpić na jednej gali. Żąda {mm}.','A Hall of Famer wants to appear at one show. He asks for {mm}.'],
 [['Zgódź się ({mm})','Agree ({mm})'],['Odmów','Decline']],[['Hala wstaje na jego widok.','The arena stands for him.'],['Legenda się obraża.','The legend takes offence.']],
 [v=>{xcash(-v.c);xpop(1);xmood(3)},()=>{xmood(-1)}],()=>cm(.1),C(()=>(G.hof||[]).length>=1&&rnd()<.3),[1,0]);
NX('csconv',['Zjazd fanów','A fan convention'],['Fani proszą o oficjalny zjazd Waszej federacji. Możesz go zorganizować i zarobić na biletach.','Fans ask for an official convention of your promotion. You can host it and earn from tickets.'],
 [['Zorganizuj','Host it'],['Odmów','Decline']],[['Zjazd wypala się znakomicie.','The convention is a hit.'],['Fani trochę się dąsają.','Fans sulk a little.']],
 [()=>{xcash(xc(.08));xpop(.5)},()=>{xpop(-.1)}],null,C(()=>rnd()<.3));
NX('cstax',['Kontrola skarbowa','A tax audit'],['Urząd skarbowy zapowiada kontrolę. Możesz zapłacić {mm} i załatwić sprawę po cichu albo walczyć o swoje.','The tax office announces an audit. You can pay {mm} and settle quietly, or fight it.'],
 [['Zapłać ({mm})','Pay ({mm})'],['Walcz','Fight it']],[['Sprawa załatwiona.','Settled.'],['Sąd przyznaje Ci rację... albo i nie.','The court sides with you... or not.']],
 [v=>{xcash(-v.c)},v=>{if(rnd()<.5){xconf(2)}else{xcash(-v.c*2);xconf(-3)}}],()=>cm(.1),C(()=>rnd()<.25),[1,0]);
NX('csbio',['Film biograficzny','A biopic'],['Studio filmowe chce kupić prawa do historii Twojej federacji za {mm}.','A film studio wants the rights to your promotion\'s story for {mm}.'],
 [['Sprzedaj prawa','Sell the rights'],['Odmów','Decline']],[['Film wchodzi do kin, a Ty zarabiasz.','The film hits cinemas and you profit.'],['Historia zostaje u Ciebie.','The story stays with you.']],
 [()=>{xcash(xc(.2));xpop(.4)},()=>{}],()=>({mm:money(xc(.2))}),C(()=>G.hist.length>=60&&rnd()<.2));
NX('csletter',['List od dawnego rywala','A letter from an old rival'],['Stary rywal wysyła Ci list z gratulacjami i propozycją pojednania.','An old rival sends you a congratulatory letter offering a truce.'],
 [['Odpisz serdecznie','Reply warmly'],['Zignoruj','Ignore it']],[['Branża widzi klasę.','The industry sees class.'],['Cisza.','Silence.']],
 [()=>{xconf(2);xmood(2)},()=>{}],null,C(()=>G.rivals.length>0&&rnd()<.3));
NX('csschool',['Szkoła Twojego imienia','A school in your name'],['Młodzi zapaśnicy chcą nazwać szkołę treningową Twoim imieniem. Ty sfinansujesz remont: {mm}.','Young wrestlers want to name a training school after you. You would fund the renovation: {mm}.'],
 [['Zgódź się ({mm})','Agree ({mm})'],['Nie, dziękuję','No, thank you']],[['Zyskujesz szacunek szatni.','The locker room respects you.'],['Szkoła zostaje bez patrona.','The school stays without a patron.']],
 [v=>{xcash(-v.c);xpop(.5);xmood(3)},()=>{}],()=>cm(.1),C(()=>rnd()<.25),[1,0]);
/* --- sound --- */
const S=f=>()=>{try{return G.week>=10&&f()}catch(e){return false}};
const sp=f=>{const l=mine().filter(w=>!w.ext&&!w.farewell&&f(w));return l.length?pickR(l):null};
const sv=(f,ex)=>()=>{const w=sp(f);return Object.assign({w:w?w.name:'?',id:w?w.id:''},ex?ex(w):{})};
NX('sndmic',['Mikrofon zawodzi','A dead mic'],['Mikrofon {w} gaśnie w środku promo. Zawodnik może improwizować albo przerwać.','{w}\'s mic dies in the middle of a promo. He can improvise or cut it short.'],
 [['Niech improwizuje','Let him improvise'],['Przerwij','Cut it']],[['Mimo wszystko publiczność jest zachwycona.','The crowd is delighted anyway.'],['Niezręczna cisza.','An awkward silence.']],
 [v=>{if(rnd()<.7){adj(v.id,4,0);xpop(.3)}else{adj(v.id,-4,0);xpop(-.2)}},()=>{xpop(-.1)}],sv(w=>w.pop>=20),S(()=>!!sp(w=>w.pop>=20)&&rnd()<.3));
NX('sndnoise',['Skarga na hałas','A noise complaint'],['Sąsiedzi skarżą się na hałas z hali. Mandat to {mm}, ale możesz przyciszyć gale.','Neighbours complain about noise from the arena. The fine is {mm}, but you could turn the volume down.'],
 [['Zapłać ({mm})','Pay ({mm})'],['Ścisz głośniki','Turn it down']],[['Sprawa załatwiona.','Settled.'],['Atmosfera na gali nieco gaśnie.','The atmosphere dims a bit.']],
 [v=>{xcash(-v.c)},()=>{xpop(-.2)}],()=>cm(.04),S(()=>rnd()<.25),[1,0]);
NX('sndband',['Orkiestra na żywo','A live band'],['Lokalny zespół chce zagrać na żywo na Twojej gali za {mm}.','A local band wants to play live at your show for {mm}.'],
 [['Zatrudnij ({mm})','Hire ({mm})'],['Nie','No']],[['Atmosfera jest elektryzująca.','The atmosphere is electric.'],['Zostaje playlista.','The playlist stays.']],
 [v=>{xcash(-v.c);xpop(.3);xmood(2)},()=>{}],()=>cm(.05),S(()=>rnd()<.3),[1,0]);
NX('sndpyro',['Pirotechnika','Pyrotechnics'],['Ekipa pirotechniczna oferuje efekty na wejścia gwiazd za {mm}.','A pyro crew offers effects for star entrances for {mm}.'],
 [['Kup efekty ({mm})','Buy the effects ({mm})'],['Za drogo','Too expensive']],[['Wejścia robią wrażenie.','The entrances look spectacular.'],['Bez fajerwerków.','No fireworks.']],
 [v=>{xcash(-v.c);xpop(.5)},()=>{}],()=>cm(.07),S(()=>G.fed.tier>=2&&rnd()<.3),[1,0]);
NX('sndbell',['Zabytkowy dzwon','A historic ring bell'],['Antykwariusz sprzedaje dzwon ze starej areny. Ma duszę i kosztuje {mm}.','An antique dealer sells a bell from an old arena. It has soul and costs {mm}.'],
 [['Kup ({mm})','Buy ({mm})'],['Nie','No']],[['Każdy gong brzmi lepiej.','Every bell sounds better.'],['Zostaje stary dzwonek.','The old bell stays.']],
 [v=>{xcash(-v.c);xconf(2);xpop(.2)},()=>{}],()=>cm(.03),S(()=>rnd()<.25),[1,0]);
NX('sndcomm',['Legendarny komentator','A legendary commentator'],['Stary komentator chce dołączyć do Waszego stołu za {mm}.','A veteran commentator wants to join your desk for {mm}.'],
 [['Zatrudnij ({mm})','Hire ({mm})'],['Odmów','Decline']],[['Gale zyskują głos.','The shows gain a voice.'],['Zostaje stara ekipa.','The old crew stays.']],
 [v=>{xcash(-v.c);xpop(.4);xconf(1)},()=>{}],()=>cm(.06),S(()=>G.fed.tier>=2&&rnd()<.3),[1,0]);
NX('sndlicense',['Licencja na muzykę','A music licence'],['Zespół rockowy chce wykorzystać Waszą muzykę z gali w teledysku i płaci {mm}.','A rock band wants to use your show music in a video and pays {mm}.'],
 [['Sprzedaj licencję','Sell the licence'],['Odmów','Decline']],[['Dodatkowy dochód i reklama.','Extra income and publicity.'],['Muzyka zostaje u Was.','The music stays with you.']],
 [()=>{xcash(xc(.04));xpop(.2)},()=>{}],()=>({mm:money(xc(.04))}),S(()=>rnd()<.25));
NX('sndacoustic',['Dudniąca hala','A booming hall'],['Hala ma fatalną akustykę i komentarze giną w echu. Panele kosztują {mm}.','The hall has awful acoustics and commentary is lost in echo. Panels cost {mm}.'],
 [['Zamontuj panele ({mm})','Install panels ({mm})'],['Zignoruj','Ignore it']],[['Dźwięk jest wyraźny.','The sound is crisp.'],['Widzowie narzekają.','Viewers complain.']],
 [v=>{xcash(-v.c);xconf(2)},()=>{xpop(-.2)}],()=>cm(.06),S(()=>rnd()<.25),[1,0]);
NX('sndboo',['Buczenie na hali','Boos in the arena'],['Kibice buczą po niepopularnej decyzji bookingowej. Odpowiesz?','Fans boo after an unpopular booking decision. Will you respond?'],
 [['Przeproś','Apologise'],['Zignoruj','Ignore it']],[['Fani doceniają szczerość.','Fans appreciate the honesty.'],['Buczenie ucicha po kilku galach.','The booing fades after a few shows.']],
 [()=>{xpop(.2);xconf(-1)},()=>{xpop(-.2)}],null,S(()=>rnd()<.25));
NX('sndanthem',['Hymn przed galą','An anthem before the show'],['Lokalna śpiewaczka zaoferowała zaśpiewać hymn przed galą za darmo.','A local singer offers to perform the anthem before the show for free.'],
 [['Zgódź się','Accept'],['Nie, dziękuję','No, thanks']],[['Hala jest wzruszona.','The arena is moved.'],['Bez hymnu.','No anthem.']],
 [()=>{xpop(.3);xmood(2)},()=>{}],null,S(()=>rnd()<.3));
}
