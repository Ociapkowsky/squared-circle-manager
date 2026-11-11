/* ============ Tweener X: a living social feed (world news) ============ */
const TWC={};
function TC(pool,tone,arr){TWC[pool]=TWC[pool]||{};TWC[pool][tone]=arr.map((p,i)=>{const k='tc.'+pool+'.'+tone+'.'+(i+1);D[k]=p;return k})}
const TWP={
 gw:{pos:[['{w} to teraz najlepszy zawodnik w {f}, kropka.','{w} is the best performer in {f} right now, period.'],['Oglądam każdą walkę {w}, nigdy nie zawodzi.','I watch every {w} match, never disappoints.'],['{w} zasługuje na więcej czasu na ekranie.','{w} deserves more screen time.']],
  neg:[['Przereklamowany. {w} nie ma w sobie nic specjalnego.','Overrated. {w} has nothing special.'],['Znowu {w}? Nie ma nikogo innego w tej federacji?','{w} again? Is there nobody else in the company?'],['{w} jest nudny, przełączam na inną federację.','{w} is boring, I\'m switching to another promotion.']],
  neu:[['Ciekawe, jak {w} wypadnie w kolejnych tygodniach.','Curious how {w} does over the next few weeks.'],['Bez emocji, poczekam na następną galę.','Not reacting yet, waiting for the next show.'],['Czy ktoś ma statystyki {w} z ostatnich walk?','Does anyone have {w}\'s stats from recent matches?']],
  joke:[['Mój kot ma lepszy plan na walkę niż {w}.','My cat has a better game plan than {w}.'],['{w} wchodzi do ringu jak ja do lodówki o 2 w nocy.','{w} walks into the ring like me into the fridge at 2am.'],['Podpisuję petycję, żeby {w} dostał motyw muzyczny z orkiestrą.','Signing a petition for {w} to get a full-orchestra theme.']]},
 gf:{pos:[['{f} robi to dobrze, oby tak dalej.','{f} is doing it right, keep it up.'],['Najlepszy produkt wrestlingowy w okolicy.','Best wrestling product around.'],['Idę na kolejną galę {f}, bilety wzięte.','Going to the next {f} show, tickets bought.']],
  neg:[['{f} się stacza, widziałem lepsze gale w remizie.','{f} is going downhill, I\'ve seen better shows in a fire station.'],['Booking {f} to jakiś żart.','{f}\'s booking is a joke.'],['Kiedyś było lepiej w {f}.','{f} was better back in the day.']],
  neu:[['Zobaczymy, co z tego wyniknie dla {f}.','We\'ll see what comes of this for {f}.'],['Ciekawe, czy {f} utrzyma tempo.','Wonder if {f} can keep the pace.'],['Ktoś był na żywo? Jakie wrażenia?','Anyone there live? How was it?']],
  joke:[['Moja żona pyta, czy {f} to nowa religia. Odpowiedziałem, że tak.','My wife asks if {f} is a new religion. I said yes.'],['Zapisuję się na kurs wrestlingu po tej wiadomości.','Signing up for wrestling school after this news.'],['{f} bije telewizję na głowę.','{f} beats TV any day.']]},
 champ:{pos:[['FINALNIE! {w} zasłużył na {t}!','FINALLY! {w} earned the {t}!'],['Łzy w oczach. {w} mistrzem!','Tears in my eyes. {w} is champion!'],['Nowa era. Szacunek, {w}.','A new era. Respect, {w}.']],
  neg:[['To skandal, {w} nie zasłużył na {t}.','This is a scandal, {w} did not deserve the {t}.'],['Ktoś tu źle ułożył booking. {w} mistrzem? Serio?','Someone botched the booking. {w} as champion? Seriously?'],['{t} straciło prestiż w jedną noc.','The {t} lost its prestige overnight.']],
  neu:[['Ciekawe, kto będzie pierwszym pretendentem do {t}.','Wonder who the first challenger for the {t} will be.'],['Dobra walka, zobaczymy jak {w} poradzi sobie z pasem.','Good match, let\'s see how {w} handles the belt.'],['Panie i panowie, nowy rozdział.','Ladies and gentlemen, a new chapter.']],
  joke:[['Teraz {w} będzie spał z pasem jak dziecko z misiem.','Now {w} will sleep with that belt like a kid with a teddy.'],['Ktoś niech powie {w}, że pas nie jest do zastawienia.','Somebody tell {w} the belt isn\'t for pawning.'],['Mam nadzieję, że {w} ma ścianę na ten pas.','Hope {w} has a wall for that belt.']]},
 defend:{pos:[['{w} znów pokazuje, dlaczego jest mistrzem.','{w} shows again why they\'re champion.'],['Obrona czysta jak łza, szacunek.','Clean defense, respect.'],['Nikt nie zbliża się do poziomu {w}.','Nobody is on {w}\'s level.']],
  neg:[['Kolejna nudna obrona {t}.','Another boring {t} defense.'],['{w} trzyma pas za długo, czas na zmianę.','{w} has held the belt too long, time for a change.'],['Pretendenci to kpina.','These challengers are a joke.']],
  neu:[['Dobra obrona, ale kto następny?','Solid defense, but who\'s next?'],['Ciekawe, jak długo {w} utrzyma {t}.','Wonder how long {w} can hold the {t}.']],
  joke:[['{w} i pas to małżeństwo dłuższe niż telenowela.','{w} and the belt are a marriage longer than a soap opera.'],['Niech ktoś zabierze ten pas, bo {w} zacznie go używać jako deski do prasowania.','Somebody take that belt before {w} starts using it as an ironing board.']]},
 turn:{pos:[['Wreszcie! {w} w tej roli to coś nowego.','Finally! {w} in this role is something new.'],['Ten zwrot zmienia wszystko, jestem w szoku.','That turn changes everything, I\'m shocked.']],
  neg:[['Nie kupuję tej zmiany, {w} był lepszy wcześniej.','Not buying this turn, {w} was better before.'],['Zepsuli postać {w}.','They ruined {w}\'s character.']],
  neu:[['Zobaczymy, czy ta zmiana wytrzyma dłużej niż miesiąc.','Let\'s see if this turn lasts more than a month.'],['{w} w nowej roli... mam mieszane uczucia.','{w} in the new role... mixed feelings.']],
  joke:[['Plot twist: {w} i tak zrobi to samo, tylko z innym wejściem.','Plot twist: {w} will do the same thing with a different entrance.'],['Nowa rola, nowa kurtka, ten sam {w}.','New role, new jacket, same {w}.']]},
 inj:{pos:[['Wracaj szybko, {w}! Trzymamy kciuki.','Get well soon, {w}! Fingers crossed.'],['Zdrowia dla {w}, bez Ciebie ring nie jest ten sam.','Health to {w}, the ring isn\'t the same without you.']],
  neg:[['Za dużo walk, za mało odpoczynku. Zawodnicy się wypalają.','Too many matches, too little rest. Wrestlers are burning out.'],['Federacja przepracowuje ludzi, {w} to kolejna ofiara.','The company overworks people, {w} is another victim.']],
  neu:[['Jak długo {w} będzie pauzować?','How long will {w} be out?'],['Mam nadzieję, że obejdzie się bez operacji.','Hope it doesn\'t need surgery.']],
  joke:[['Ring zawsze wygrywa, {w} to wie.','The ring always wins, {w} knows that.'],['Niech {w} ma chociaż dobrego fizjoterapeutę.','{w} had better get a good physio.']]},
 retire:{pos:[['Dziękujemy za wszystko, {w}. Legenda.','Thank you for everything, {w}. A legend.'],['Szacunek na lata, {w}.','Respect for years, {w}.']],
  neg:[['Czas najwyższy, już się nie dało oglądać.','About time, it was getting hard to watch.'],['Oby {w} nie wrócił po trzech miesiącach jak wszyscy.','Hope {w} doesn\'t come back in three months like everyone else.']],
  neu:[['Koniec pewnej epoki.','End of an era.'],['Ciekawe, co {w} zrobi po karierze.','Wonder what {w} will do after the career.']],
  joke:[['Emerytura we wrestlingu trwa zwykle do następnej gali.','Retirement in wrestling usually lasts until the next show.'],['Czekam na powrót, już zaznaczyłem w kalendarzu.','Waiting for the comeback, already marked the calendar.']]},
 move:{pos:[['Świetny ruch, {w} wzmocni skład.','Great move, {w} will strengthen the roster.'],['Kocham ten transfer, {w} idealnie pasuje.','Love this transfer, {w} fits perfectly.']],
  neg:[['Oczekiwania wobec {w} są za duże, to przeciętniak.','Expectations for {w} are too high, they\'re average.'],['Po co im jeszcze {w}? Roster i tak pęka.','Why do they need {w}? The roster is already full.']],
  neu:[['Zobaczymy, jak {w} odnajdzie się w nowej roli.','We\'ll see how {w} adapts to the new role.'],['Ciekawe, jaki kontrakt dostał {w}.','Wonder what contract {w} got.']],
  joke:[['{w} zmienia federację częściej niż ja kanały w telewizji.','{w} changes promotions more often than I change TV channels.'],['Kto następny? Menedżerowie mają dziś dużo roboty.','Who\'s next? Agents have a busy day.']]},
 leave:{pos:[['Powodzenia, {w}! Zasługujesz na więcej.','Good luck, {w}! You deserve more.'],['Dzięki za walki, {w}.','Thanks for the matches, {w}.']],
  neg:[['To błąd, {w} był jednym z lepszych.','That\'s a mistake, {w} was one of the better ones.'],['{f} nie szanuje swoich zawodników.','{f} doesn\'t respect its wrestlers.']],
  neu:[['Ciekawe, gdzie wyląduje {w}.','Wonder where {w} will land.'],['Kolejna zmiana w składzie, zobaczymy.','Another roster change, let\'s see.']],
  joke:[['{w} wolny na rynku, ktoś pożyczy mu na bilet?','{w} is a free agent, anyone lend them money for a ticket?'],['Wolni agenci wracają jak bumerang.','Free agents come back like boomerangs.']]},
 hit:{pos:[['Ha! {r} wiedział, że to musi się stać.','Ha! {r} knew this had to happen.'],['Wreszcie ktoś pokrzyżował plany {w}.','Finally someone ruined {w}\'s plans.']],
  neg:[['To oszustwo! {w} wygrał czysto.','That\'s cheating! {w} won clean.'],['Ingerencja {r} była beznadziejna.','{r}\'s interference was awful.']],
  neu:[['Ciekawe, czy {w} się zemści.','Wonder if {w} will get revenge.'],['Mamy kolejną rywalizację na horyzoncie.','Another rivalry on the horizon.']],
  joke:[['{r} wchodzi bez zaproszenia jak teściowa.','{r} shows up uninvited like a mother-in-law.'],['Ktoś zamówił {r} razem z pizzą?','Did someone order {r} with the pizza?']]},
 save:{pos:[['Sojusznik na ratunek! {a} legendą!','Ally to the rescue! {a} is a legend!'],['{a} pokazał, co to znaczy lojalność.','{a} showed what loyalty means.']],
  neg:[['Naprawdę? {a} musiał się wtrącać?','Really? Did {a} have to get involved?'],['Za dużo wtrącania się, ring to nie wesele.','Too much meddling, a ring isn\'t a wedding.']],
  neu:[['{r} chyba nie odpuści po tej akcji.','{r} probably won\'t let this go.'],['Ciekawe, czy {a} i {w} są teraz drużyną.','Wonder if {a} and {w} are a team now.']],
  joke:[['{a} wbiegł szybciej niż ja do lodówki w reklamach.','{a} ran in faster than I hit the fridge during ads.'],['Cała ekipa na ringu, brakuje tylko popcornu.','The whole crew in the ring, only popcorn is missing.']]},
 showhi:{pos:[['Ta gala była niesamowita!','That show was incredible!'],['Najlepsza gala {f} od miesięcy.','Best {f} show in months.'],['Dawać więcej takich wieczorów!','Give us more nights like this!']],
  neg:[['Hype, ale ja się nudziłem.','Hyped, but I was bored.'],['Przereklamowane, widziałem lepsze.','Overhyped, I\'ve seen better.']],
  neu:[['Dobra gala, ale kto się wyróżnił?','Good show, but who stood out?'],['Mocny karnet, zobaczymy co dalej.','Strong card, let\'s see what\'s next.']],
  joke:[['Moje serce wytrzymało, kanapa nie.','My heart survived, the couch didn\'t.'],['Dostałem zakwasów od samego oglądania.','Got sore just from watching.']]},
 showlo:{pos:[['Nie każda gala musi być klasykiem, wierzę w {f}.','Not every show has to be a classic, I believe in {f}.'],['Następna będzie lepsza, trzymamy kciuki.','The next one will be better, fingers crossed.']],
  neg:[['Co to była za gala? Rozczarowanie.','What was that show? A letdown.'],['Płacę za bilet i oglądam NUDĘ.','I pay for a ticket and watch BORING.'],['{f} traci formę, czas na zmiany.','{f} is losing form, time for changes.']],
  neu:[['Kilka dobrych walk, reszta przeciętna.','A few good matches, the rest average.'],['Booking wymaga poprawy, ale jest potencjał.','Booking needs work, but there\'s potential.']],
  joke:[['Wolałbym oglądać schnącą farbę. Ale tylko trochę.','I\'d rather watch paint dry. But only slightly.'],['Przynajmniej popcorn był dobry.','At least the popcorn was good.']]},
 rv:{pos:[['Ta rywalizacja zapowiada się świetnie!','This rivalry promises to be great!'],['Wreszcie prawdziwe napięcie w szatni.','Finally some real tension in the locker room.']],
  neg:[['Sztuczny konflikt, znowu to samo.','A fake conflict, the same thing again.'],['Nikt nie kupuje tej wrogości.','Nobody buys this hostility.']],
  neu:[['Ciekawe, kto pierwszy straci cierpliwość.','Wonder who loses patience first.'],['Zobaczymy, czy to dojdzie do ringu.','Let\'s see if this reaches the ring.']],
  joke:[['Zakład, że za miesiąc będą w jednej drużynie.','Bet they\'ll be a team in a month.'],['Szatnia robi się ciasna.','The locker room is getting crowded.']]},
 al:{pos:[['Sojusz marzeń!','Dream alliance!'],['Razem są groźniejsi, nie mogę się doczekać.','They\'re deadlier together, can\'t wait.']],
  neg:[['Ten sojusz nie potrwa długo.','This alliance won\'t last long.'],['Kolejny sojusz z przypadku, nuda.','Another random alliance, boring.']],
  neu:[['Ciekawe, czy to przerodzi się w drużynę.','Wonder if this turns into a team.'],['Zobaczymy, kto komu będzie pomagał częściej.','Let\'s see who helps whom more often.']],
  joke:[['Przyjaźń do pierwszej szansy na pas.','Friendship until the first title shot.'],['Wspólne treningi i wspólna lodówka.','Shared training and a shared fridge.']]},
 reply:{x:[['@you jasne szefie, ale kiedy zbookujesz to porządnie?','@you sure boss, but when will you book it properly?'],['Szef sam się odezwał! Szacunek za rozmowy z fanami.','The boss actually replied! Respect for talking to fans.'],['Haha, dobre. Ale i tak czekam na lepsze gale.','Haha, good one. Still waiting for better shows.'],['Zgadzam się w stu procentach!','100% agree!'],['Nie zgadzam się, ale lubię, że odpowiadasz.','Disagree, but I like that you reply.'],['Pozdrowienia dla całej ekipy z ringu!','Greetings to the whole crew in the ring!']]}
};
Object.keys(TWP).forEach(p=>Object.keys(TWP[p]).forEach(tn=>TC(p,tn,TWP[p][tn])));
const TWPOOL={champ:'champ',tourwin:'champ',rchamp:'champ',defend:'defend',turn:'turn',inj:'inj',retire:'retire',mvsign:'move',mvtrans:'move',sign:'move',mvrel:'leave',rvnew:'rv',alnew:'al',hit:'hit',save:'save',showhi:'showhi',showlo:'showlo'};
const TWGEN={blow:'gw',hot:'gw',guest:'gw',tier:'gf',stnew:'gf',rann:'gf',rank:'gf'};
Object.assign(D,{
 'tw.champ':['🏆 NOWY MISTRZ! {w} zdobywa {t}!','🏆 NEW CHAMPION! {w} wins the {t}!'],
 'tw.defend':['{w} skutecznie broni {t}. Kto następny?','{w} retains the {t}. Who\'s next?'],
 'tw.blow':['Koniec feudu: {a} vs {b}. Górą {w}!','Feud over: {a} vs {b}. {w} comes out on top!'],
 'tw.turn':['{w} zmienia barwy: teraz {r}!','{w} turns: now a {r}!'],
 'tw.inj':['Smutna wiadomość: {w} kontuzjowany ({i}).','Sad news: {w} is injured ({i}).'],
 'tw.retire':['{w} kończy karierę. Dziękujemy!','{w} retires. Thank you!'],
 'tw.mvsign':['{w} podpisuje kontrakt z {f}.','{w} signs with {f}.'],
 'tw.mvtrans':['Transfer! {w} przechodzi z {a} do {b}.','Transfer! {w} moves from {a} to {b}.'],
 'tw.mvrel':['{f} zwalnia {w}.','{f} releases {w}.'],
 'tw.sign':['Witamy w rodzinie: {w} podpisuje z nami!','Welcome to the family: {w} signs with us!'],
 'tw.hit':['Chaos na gali! {r} niweczy wygraną {w}.','Chaos on the show! {r} wrecks {w}\'s win.'],
 'tw.save':['{a} ratuje {w} przed ingerencją {r}!','{a} saves {w} from {r}\'s interference!'],
 'tw.showhi':['Gala za nami: ocena {r}/5. Dziękujemy za wspólny wieczór!','Show\'s done: rated {r}/5. Thanks for a great night!'],
 'tw.showlo':['Dziękujemy za przybycie. Następnym razem będzie lepiej (ocena {r}/5).','Thanks for coming. We\'ll do better next time (rated {r}/5).'],
 'tw.tier':['Awans! {f} przenosi się do większej hali: {v}.','Promotion! {f} moves up to a bigger venue: {v}.'],
 'tw.tourwin':['{w} wygrywa turniej {t}!','{w} wins the {t} tournament!'],
 'tw.stnew':['Nowa stajnia w {f}: {s}!','New stable in {f}: {s}!'],
 'tw.guest':['Gwiazda gościnna! {w} ({c}) pojawi się na naszych galach.','Guest star! {w} ({c}) will appear on our shows.'],
 'tw.rvnew':['Napięcie w szatni: {a} i {b} zostali rywalami.','Tension in the locker room: {a} and {b} are now rivals.'],
 'tw.alnew':['Nowy sojusz: {a} i {b} trzymają teraz razem.','New alliance: {a} and {b} now stick together.'],
 'tw.rchamp':['NOWY MISTRZ! {w} pokonuje {o} i zdobywa {t}!','NEW CHAMPION! {w} defeats {o} to win the {t}!'],
 'tw.rtitle':['pas {f}','{f} title'],
 'tw.rann':['Wielka gala {f} już wkrótce! Karta walk robi się coraz mocniejsza.','{f}\'s big show is coming soon! The card keeps getting stronger.'],
 'tw.rank':['Ranking federacji: 1. {a}, 2. {b}, 3. {c}.','Promotion rankings: 1. {a}, 2. {b}, 3. {c}.'],
 'tw.hot':['Niepopularna opinia: {w} to najlepszy zawodnik w {f}.','Hot take: {w} is the best wrestler in {f}.'],
 'tw.sub':['(newsy ze świata)','(world news)'],'tw.you':['Ty','You'],'tw.ph':['Napisz odpowiedź...','Write a reply...'],'tw.reply':['Odpowiedz','Reply'],'tw.empty':['Cisza w eterze. Wróć po następnej gali.','Quiet on the timeline. Come back after the next show.'],'nav.tw':['Tweener X','Tweener X']
});
const FAN_A=['ring','mat','suplex','pin','lariat','chair','kayfabe','heel','face','belt','bell','promo','indy','smark','arena','stiff'],FAN_B=['Rat','Dad','Guy','Nerd','King','Fan','Pro','Jr','Mark','Hunter'];
const randHandle=()=>'@'+pickR(FAN_A)+'_'+pickR(FAN_B)+Math.floor(rnd()*99);
function twEnsure(){
 if(G.tw)return;G.tw=[];G.twId=0;G.twSeen=0;
 const bi=[{pos:.7,neg:3,neu:.8,joke:1},{pos:2.5,neg:.5,neu:.8,joke:1},{pos:.8,neg:.8,neu:3,joke:.8},{pos:1,neg:1,neu:.6,joke:3},{pos:1.4,neg:1.4,neu:1,joke:1}];
 G.fans=[];for(let i=0;i<12;i++)G.fans.push({h:randHandle(),b:bi[i%bi.length]});
 const rs=shuffle(G.rivals.filter(r=>G.ws.filter(w=>w.fed===r.id).length>=5)).slice(0,4);
 rs.forEach((r,i)=>twWorldChamp(r,G.week-1-i));
 twRank();twHot();
}
function twTone(mood,fan){
 const w={pos:Math.max(.05,.34+mood*.28),neg:Math.max(.05,.26-mood*.22),neu:.16,joke:.18};let tot=0;
 for(const k in w){w[k]*=(fan.b[k]||1);tot+=w[k]}let r=rnd()*tot;for(const k in w){r-=w[k];if(r<=0)return k}return 'neu'}
function twComment(p){
 const fan=rnd()<.7?pickR(G.fans):{h:randHandle(),b:{pos:1,neg:1,neu:1,joke:1}};const tn=twTone(p.mood,fan);
 const sp=TWPOOL[p.k],gen=TWGEN[p.k]||(sp?null:'gw');
 const pool=((sp?TWC[sp][tn]:null)||TWC[gen||'gw'][tn]||TWC.gw[tn]).filter(k=>!p.c.some(c=>c.k===k));
 if(!pool.length)return;const key=pickR(pool);
 p.c.push({u:fan.h,k:key,lk:Math.floor(rnd()*rnd()*(8+G.fed.pop*.6))})}
function twAdd(k,v,acc,mood){
 twEnsure();const p={id:++G.twId,w:G.week,k,v:Object.assign({f:G.fed.name},v),acc,c:[],lk:0,rt:0,mood:mood||0};
 p.lk=Math.round(Math.max(5,G.fed.pop)*(.8+rnd()*2.2)*(acc==='me'?1:.8));p.rt=Math.round(p.lk*(.1+rnd()*.25));
 const n=2+Math.floor(rnd()*3)+(G.fed.pop>50?1:0);for(let i=0;i<n;i++)twComment(p);
 G.tw.unshift(p);G.tw=G.tw.slice(0,120);return p}
function twWorldChamp(r,wk){
 const ros=G.ws.filter(w=>w.fed===r.id&&!w.injury).sort((a,b)=>b.pop-a.pop).slice(0,6);if(ros.length<3)return false;
 const cur=ros.find(w=>w.id===r.champ),nw=pickR(ros.filter(w=>w!==cur));if(!nw)return false;const o=cur||ros.find(w=>w!==nw);
 const p=twAdd('rchamp',{w:nw.name,o:o?o.name:'?',t:t('tw.rtitle',{f:r.short||r.name}),f:r.name},'r:'+r.id,.2);if(wk!=null)p.w=wk;r.champ=nw.id;return true}
function twRank(){
 const l=G.rivals.map(r=>({n:r.name,p:r.pop})).concat([{n:G.fed.name,p:G.fed.pop}]).sort((a,b)=>b.p-a.p);
 if(l.length>=3)twAdd('rank',{a:l[0].n,b:l[1].n,c:l[2].n},'wire',0)}
function twHot(){
 const ms=mine().filter(w=>!w.farewell);if(!ms.length)return;const w=ms.slice().sort((a,b)=>b.pop-a.pop).slice(0,5);const x=pickR(w);
 twAdd('hot',{w:x.name},'fan:'+pickR(G.fans).h,(rnd()-.5)*.8)}
function twWeekly(){
 twEnsure();
 if(rnd()<.2){const r=pickR(G.rivals.filter(r=>G.ws.filter(w=>w.fed===r.id).length>=5));if(r)twWorldChamp(r)}
 if(rnd()<.12){const r=pickR(G.rivals);if(r)twAdd('rann',{f:r.name},'r:'+r.id,.3)}
 if(G.week%8===0)twRank();
 if(rnd()<.45)twHot();
 G.tw.filter(p=>p.w>=G.week-3&&p.c.length<9).slice(0,4).forEach(p=>{if(rnd()<.35)twComment(p)});
}
const twW=n=>G.ws.find(x=>x.name===n);
function twHook(k,v){
 if(!G||!G.fed)return;v=v||{};
 const moodOf=n=>{const w=twW(n);return w?(w.role==='face'?.3:w.role==='heel'?-.15:0):0};
 const big=n=>{const w=twW(n);return w&&w.pop>=28};
 switch(k){
  case 'n.champ':twAdd('champ',{w:v.w,t:v.t},'me',moodOf(v.w));break;
  case 'n.defend':if(rnd()<.35)twAdd('defend',{w:v.w,t:v.t},'me',moodOf(v.w)+.1);break;
  case 'n.feudend':twAdd('blow',{a:v.a,b:v.b,w:v.w},'me',.2);break;
  case 'n.turn':twAdd('turn',{w:v.w,r:v.r},'me',0);break;
  case 'n.injury':case 'n.injperm':if(big(v.w))twAdd('inj',{w:v.w,i:v.i||v.s||''},'me',-.2);break;
  case 'n.retire':case 'n.farewell':if(big(v.w))twAdd('retire',{w:v.w},'me',.1);break;
  case 'n.mvsign':twAdd('mvsign',{w:v.w,f:v.f},'wire',0);break;
  case 'n.mvtrans':twAdd('mvtrans',{w:v.w,a:v.a,b:v.b,f:v.b},'wire',0);break;
  case 'n.mvrel':twAdd('mvrel',{w:v.w,f:v.f},'wire',-.1);break;
  case 'n.sign':if(big(v.w))twAdd('sign',{w:v.w},'me',.2);break;
  case 'n.rvhit':twAdd('hit',{r:v.r,w:v.w},'wire',-.1);break;
  case 'n.rvsave':twAdd('save',{a:v.a,r:v.r,w:v.w},'wire',.2);break;
  case 'n.rvnew':if(rnd()<.5)twAdd('rvnew',{a:v.a,b:v.b,w:v.a},'wire',0);break;
  case 'n.alnew':if(rnd()<.5)twAdd('alnew',{a:v.a,b:v.b,w:v.a},'wire',.2);break;
  case 'n.show':{const r=parseFloat(String(v.r).replace(',','.'));if(r>=4.25)twAdd('showhi',{r:v.r},'me',.5);else if(r&&r<=2.4)twAdd('showlo',{r:v.r},'me',-.5);break}
  case 'n.tier':twAdd('tier',{v:v.v},'me',.4);break;
  case 'n.tourwin':twAdd('tourwin',{w:v.w,t:v.t},'me',.2);break;
  case 'n.stnew':twAdd('stnew',{s:v.s},'me',.1);break;
  case 'n.guest':case 'n.celebsign':twAdd('guest',{w:v.w,c:v.c||''},'me',.3);break;
 }
}
