/* ===== Tutorial v2: concept lessons, richer screen lessons, table of contents ===== */
(function(){
 const L=[]; // [id, screen, plTitle, plBody, enTitle, enBody]
 const add=(id,scr,pt,pb,et,eb)=>L.push([id,scr,pt,pb,et,eb]);

 add('ui','dash','Przyciski szybkiego dostępu',
  `Pod logo masz cztery skróty: dźwięk (głośnik), wyciszenie samych kliknięć (klawiatura), flagi PL i EN oraz przełącznik motywu jasny/ciemny. Wszystko pamięta się w przeglądarce. Przy starcie gry zobaczysz ekran tytułowy z wersją gry i podpisem twórców, a kliknięcie wchodzi do wyboru federacji. Pełne ustawienia dźwięku i głośności są w Ustawieniach.`,
  'Quick buttons',
  `Under the logo there are four shortcuts: sound (speaker), mute only the clicks (keyboard), PL and EN flags and a light/dark theme switch. Your choices are remembered in the browser. When the game starts you see a title screen with the game version and credits, and a click takes you to promotion selection. Full sound and volume options are in Settings.`);

 add('start','dash','Start gry: federacja, trudność, wyzwanie',
  `Na ekranie startowym wybierasz federację (filtry: poziom, kraj, kontynent, sortowanie). Możesz zacząć od małej, jak lokalna scena, albo od giganta, ale gigant jest znacznie trudniejszy do prowadzenia. Wybierasz też trudność (Łatwy, Normalny, Trudny, Legenda), opcjonalne wyzwanie (np. poziom 3 w 2 lata, 10 mln w 3 lata, nr 1 rankingu) i kreator bookera z własnym profilem. Zapis możesz wczytać z kodu, który skopiowałeś w Ustawieniach.`,
  'Starting a game',
  `On the start screen you pick a promotion (filters: tier, country, continent, sorting). You can start small, like a local scene, or as a giant, but a giant is much harder to run. You also pick a difficulty (Easy, Normal, Hard, Legend), an optional challenge (e.g. tier 3 in 2 years, 10M in 3 years, ranked no. 1) and a booker creator with your own profile. You can load a save from a code you copied in Settings.`);

 add('events','inbox','Zdarzenia losowe',
  `W grze jest ponad 700 zdarzeń losowych: z szatni, od zarządu, finansowe, zdrowotne, kariery, dźwięku, mediów społecznościowych, rywali i gości. Pojawiają się w skrzynce i w trakcie gal. Zwykle masz 2–3 opcje, a każda ma skutki: kasa, popularność, morale, kontuzje, relacje. Niektóre są bardzo rzadkie (np. rozłam niezadowolonych zawodników, którzy zakładają własną federację). Część zależy od poziomu federacji i czasu gry.`,
  'Random events',
  `The game has over 700 random events: locker room, board, money, health, career, sound, social media, rivals and guests. They show up in the inbox and during shows. You usually get 2 or 3 options, each with consequences: cash, popularity, morale, injuries, relationships. Some are very rare (e.g. unhappy wrestlers breaking away to found their own promotion). Some depend on your tier and how long you have played.`);

 add('styles','roster','Style, role i chemia',
  `Każdy zawodnik ma styl: Technik, Siłacz, Lotnik, Lucha, Mocny styl, Zadymiarz albo Hardcore, oraz rolę: face, heel lub tweener. Pary stylów mają chemię (np. Technik z Mocnym stylem, Lotnik z Luchą, Zadymiarz z Hardcore). Klasyczny face przeciwko heelowi daje bonus do oceny, dwie takie same role wypadają gorzej. Cudzoziemcy mają karę aklimatyzacji, która maleje z czasem w federacji. Gwiazdy mają też rywali i sojuszników (do 5 każdych), którzy mogą się wtrącać w walki.`,
  'Styles, roles and chemistry',
  `Every wrestler has a style: Technician, Powerhouse, High-flyer, Lucha, Strong style, Brawler or Hardcore, and a role: face, heel or tweener. Style pairs have chemistry (e.g. Technician with Strong style, High-flyer with Lucha, Brawler with Hardcore). A classic face against a heel gives a rating bonus, two of the same role do worse. Foreigners suffer an acclimatization penalty that shrinks as they stay with the promotion. Stars also have rivals and allies (up to 5 each) who can interfere in matches.`);

 add('mtype','show','Rodzaj walki i liczba osób',
  `Przy każdej walce najpierw wybierasz rodzaj: Pojedynek, Tag team 2 na 2, Drużynowa 3+, Handicap, Każdy na każdego albo Multi-team. Dopiero pod spodem pojawia się wybór „Ilu na ilu”: w drużynowej od 3 na 3 do 10 na 10, w handicapie od 1 na 2 do 9 na 10 (pogrupowane według mniejszej strony), w każdy na każdego od 3 do 10 osób, w multi-team np. 2 na 2 na 2. Zmiana rodzaju ustawia domyślny rozmiar. W większych walkach każdy męczy się nieco mniej.`,
  'Match type and size',
  `For each match you first pick a type: Singles, Tag team 2v2, Team match 3+, Handicap, Free-for-all or Multi-team. Only then does the “How many vs how many” choice appear: team matches go from 3v3 to 10v10, handicap from 1v2 to 9v10 (grouped by the smaller side), free-for-all from 3 to 10 people, multi-team e.g. 2v2v2. Changing the type resets the default size. In bigger matches everyone gets a little less tired.`);

 add('stips','show','Stypulacje: 190+ do wyboru',
  `Pod rodzajem walki jest przycisk stypulacji. Otwiera okno z wyszukiwarką (nazwa i opis), filtrami 11 kategorii (warunki zwycięstwa, klatki, broń, kontenery, hardcore, wieloosobowe, kasyno, poza ringiem, zasady sportowe, stawki, nietypowe), listami Polecane, Ulubione (gwiazdka) i Ostatnie. Przy każdej widzisz premię lub karę w ★ dla zawodników z tej walki, koszt ($ do $$$), ⚠ przy ryzyku kontuzji i opis. „Pasuje do feudu” oznacza ulubioną stypulację rywalizacji.`,
  'Stipulations: 190+ to choose from',
  `Below the match type there is a stipulation button. It opens a window with a search (name and description), 11 category filters (win conditions, cages, weapons, containers, hardcore, multi-person, casino, outside the ring, sporting rules, stakes, odd ones), and Recommended, Favorites (star) and Recent lists. Each entry shows a ★ bonus or penalty for the wrestlers in that match, a cost ($ to $$$), ⚠ for injury risk and a description. “Fits the feud” marks a feud’s favorite stipulation.`);

 add('stipecon','show','Stypulacje: koszty i ograniczenia',
  `Stypulacja kosztuje produkcję, ale dobrze dobrana do stylów zawodników oddaje część kosztu jako przychód widowiskowy, a źle dobrana tylko kosztuje. Zwiększa też żar feudu, zmęczenie i ryzyko kontuzji. Stypulacje bez dyskwalifikacji zamieniają DQ i count-out w czysty finisz. Szare pozycje są zablokowane: zbyt niski poziom federacji, platforma (PG na YouTube i Twitchu, TV-14 w telewizji, ostre treści tylko w streamingu dla dorosłych) albo warunek (np. minimum 5 osób).`,
  'Stipulations: costs and limits',
  `A stipulation costs production money, but one that fits the wrestlers’ styles returns part of that cost as spectacle revenue, while a poor fit just costs. It also raises feud heat, fatigue and injury risk. No-DQ stipulations turn DQ and count-out finishes into clean ones. Greyed-out entries are locked: your promotion tier is too low, the platform blocks them (PG on YouTube and Twitch, TV-14 on television, harsh content only on adult streaming) or a condition is missing (e.g. at least 5 people).`);

 add('stakes','show','Stawki i ich skutki',
  `Stypulacje ze stawką mają konsekwencje po gali. Przegrany odchodzi (zawodnik opuszcza federację i trafia do wolnych agentów), Stawką jest kariera (przegrany przechodzi na emeryturę), Maska i włosy oraz Lucha de Apuestas (przegrany traci maskę lub włosy, spadają morale i popularność, szczególnie u luchadorów), Pas przeciwko pasowi (zwycięzca zgarnia oba), upokarzające walki jak Kiss My Foot obniżają morale przegranego. Eliminator daje zwycięzcy szansę na pas. Zastanów się, kogo narażasz.`,
  'Stakes and consequences',
  `Stipulations with a stake have consequences after the show. Loser Leaves (the wrestler leaves the promotion and becomes a free agent), Career on the Line (the loser retires), Mask or Hair and Lucha de Apuestas (the loser loses the mask or hair, morale and popularity drop, especially for luchadores), Title vs Title (the winner takes both), humiliation matches like Kiss My Foot lower the loser’s morale. An Eliminator gives the winner a title shot. Think about who you put at risk.`);

 add('timelimit','show','Limity czasu, remisy i wiele upadków',
  `Walki z limitem (np. 60 minut, 30 minut, 20-count) mogą zakończyć się remisem czasowym. To pełnoprawny wynik: mistrz zachowuje pas, a feud dostaje trochę żaru. Walki wielopadkowe (do dwóch wygranych, Three Stages of Hell, Iron Man i inne) pokazują w podsumowaniu wynik upadków, np. 2-1. Są też stypulacje bez limitu czasu, tryby turniejowe i wieloetapowe walki z eliminacjami, w których liczy się kolejność wejścia.`,
  'Time limits, draws and multiple falls',
  `Matches with a limit (e.g. 60 minutes, 30 minutes, 20-count) can end in a time-limit draw. That is a full result: the champion keeps the belt and the feud gains a bit of heat. Multi-fall matches (best of three falls, Three Stages of Hell, Iron Man and others) show the fall score in the summary, e.g. 2-1. There are also no-time-limit stipulations, tournament formats and multi-stage elimination matches where entry order matters.`);

 add('finishes','show','Finisze i decyzje w trakcie gali',
  `W każdej walce wybierasz zwycięzcę i finisz: czysty, brudny, DQ lub count-out (w stypulacjach z limitem możliwy jest też remis). Pas zmienia właściciela tylko po czystym lub brudnym zakończeniu, DQ i count-out go nie przenoszą. W trakcie gali wyskakują zdarzenia w ringu: interwencja stajni, zwrot face/heel, wpadka, krzesło od kibica, rywal w narożniku. Twoja reakcja wpływa na ocenę, żar feudu i ryzyko kontuzji.`,
  'Finishes and in-match decisions',
  `In every match you choose the winner and the finish: clean, dirty, DQ or count-out (stipulations with a limit can also end in a draw). A title changes hands only on a clean or dirty finish, DQ and count-out do not move it. During the show in-ring events pop up: stable interference, a face/heel turn, a botch, a chair from a fan, a rival at ringside. Your reaction affects the rating, feud heat and injury risk.`);

 add('rating','show','Z czego składa się ocena walki',
  `Na ocenę wpływają: forma w ringu, charyzma i popularność zawodników, chemia stylów i drużyn, role face/heel, dopasowanie stypulacji do stylów, stawka tytułowa, żar feudu, seria zwycięstw i trochę losowości. Ocena gali to średnia ważona, a dwie ostatnie walki liczą się bardziej, więc najlepsze zostaw na koniec. Gala PPV z mniej niż 4 walkami zarabia mniej. Ocena napędza popularność federacji, frekwencję i dalsze oferty.`,
  'What goes into a match rating',
  `A match rating depends on: in-ring form, charisma and popularity of the wrestlers, style and team chemistry, face/heel roles, how well the stipulation fits the styles, title stakes, feud heat, win streaks and some luck. The show rating is a weighted average where the last two matches count more, so save your best for the end. A PPV with fewer than 4 matches earns less. The rating drives promotion popularity, attendance and later offers.`);

 add('feudsx','feuds','Feudy w szczegółach',
  `Masz do wyboru ponad 130 scenariuszy: zdrada, zemsta, stajnia przeciw stajni, drużyna przeciw drużynie, handicap, feudy wieloosobowe. Żar rośnie od 1 do 100 z każdą walką, tym szybciej, im lepsza ocena i im pełniejszy skład feudu. Scenariusze mają swoje zdarzenia. Reakcja fanów potrafi wskazać ulubioną stypulację feudu: walka w niej daje dodatkowe ★ i żar. Przy żarze 70+ możesz zakończyć feud walką rozstrzygającą z bonusem do oceny i popularności zwycięzcy.`,
  'Feuds in detail',
  `You can choose from over 130 scenarios: betrayal, revenge, stable vs stable, tag vs tag, handicap, multi-person feuds. Heat climbs from 1 to 100 with every match, faster for better ratings and a fuller feud roster. Scenarios come with their own events. Fan reaction can reveal a feud’s favorite stipulation: fighting in it gives extra ★ and heat. At heat 70+ you can end the feud with a blow-off match, which gives a rating bonus and a popularity boost to the winner.`);

 add('settings','settings','Ustawienia: zapisy, trudność, paczki, dźwięk',
  `Gra zapisuje się sama, a w Ustawieniach masz 5 dodatkowych slotów i kod zapisu do skopiowania. Wklejasz go później w Ustawieniach lub na ekranie startowym, nawet na innym urządzeniu. Trudność zmienisz w każdej chwili, wpływa na przychody, koszty, kontuzje i cierpliwość zarządu. Paczka danych to plik JSON z federacjami i zawodnikami, który możesz edytować i wczytać. Tu też ustawisz dźwięk i głośność, uruchomisz ten samouczek lub zaczniesz od nowa.`,
  'Settings: saves, difficulty, packs, sound',
  `The game autosaves, and in Settings you get 5 extra slots and a save code to copy. Paste it later in Settings or on the start screen, even on another device. You can change difficulty at any time, it affects revenue, costs, injuries and board patience. The data pack is a JSON file with promotions and wrestlers that you can edit and load back. Here you also set sound and volume, replay this tutorial or start over.`);

 // enrich a few existing lessons
 const E={
  roster:[`Twoi zawodnicy. Filtruj skład, sprawdzaj popularność, formę, zużycie, morale i koniec kontraktu. Gwiazdy przyciągają widzów, ale kosztują, a niezadowoleni zawodnicy potrafią narobić kłopotów. Kontuzjowani nie występują, a przemęczeni częściej się kontuzjują. Ukryty potencjał zdradzają skauci i hobby.`,`Your wrestlers. Filter the roster and watch popularity, form, wear, morale and contract expiry. Stars draw crowds but cost money, and unhappy wrestlers can cause trouble. Injured wrestlers cannot perform and tired ones get hurt more often. Hidden potential is revealed by scouts and the hobby.`],
  show:[`Tu układasz kartę walk, ustawiasz cenę biletów i startujesz galę. Łącz zawodników w pojedynki, wybieraj rodzaj walki i stypulację, ustawiaj zwycięzców i finisze, dodawaj promo, a najlepsze walki zostaw na koniec. Przy zbyt wysokiej cenie ludzie przestaną przychodzić. Kolejne kroki wyjaśniają rodzaje walk, stypulacje i ocenę.`,`Here you build the card, set the ticket price and start the show. Pair up wrestlers, pick a match type and stipulation, set winners and finishes, add promos and keep your best matches for the end. If the price is too high people stop coming. The next steps explain match types, stipulations and ratings.`],
  money:[`Przychody to bilety, towary, telewizja, sponsorzy i platformy. Koszty to pensje, produkcja, stypulacje i utrzymanie. Tu wybierasz też platformę: telewizja (TV-14, stała wypłata), YouTube i Twitch (PG), Kick albo własna platforma (treści 18+). Platforma decyduje, jakie stypulacje są dozwolone. Pilnuj, żeby gotówka nie spadła poniżej zera, bo długi wpędzą Cię w kłopoty.`,`Income comes from tickets, merch, television, sponsors and platforms. Costs are salaries, production, stipulations and upkeep. Here you also choose a platform: television (TV-14, fixed pay), YouTube and Twitch (PG), Kick or your own platform (18+ content). The platform decides which stipulations are allowed. Keep cash above zero, because debt gets you into trouble.`],
  titles:[`Pasy dają prestiż i tematy do fabuły, także dla dywizji kobiet. Obrona tytułu na gali podnosi jej wagę, a długie panowanie buduje legendę mistrza. Pas zmienia właściciela po czystym lub brudnym zakończeniu, a Eliminator daje szansę na tytuł.`,`Titles give prestige and story hooks, including the women’s division. Defending a title on a show raises its weight and a long reign builds a champion’s legend. A belt changes hands on a clean or dirty finish, and an Eliminator earns a title shot.`]
 };
 const old=TUTS.map(x=>x.slice());
 const ids={};old.forEach(x=>ids[x[1]]=x);
 L.forEach(l=>{ids[l[0]]=[l[1],l[0]];_T(l[0],l[2],l[3],l[4],l[5])});
 Object.keys(E).forEach(k=>{if(D['tut.'+k+'.b']){D['tut.'+k+'.b']=E[k]}});
 const order=['welcome','ui','start','dash','inbox','events','cal','roster','styles','show','mtype','stips','stipecon','stakes','timelimit','finishes','rating'];
 NAVG.forEach(g=>{if(g[0]==='g.main'||g[0]==='g.sys')return;g[1].forEach(sc=>{order.push(sc);if(sc==='feuds')order.push('feudsx')})});
 order.push('settings','end');
 const seen={};const next=[];order.forEach(id=>{if(ids[id]&&!seen[id]){seen[id]=1;next.push(ids[id])}});
 old.forEach(x=>{if(!seen[x[1]]&&x[1]!=='end'){seen[x[1]]=1;next.splice(next.length-1,0,x)}});
 TUTS.length=0;next.forEach(x=>TUTS.push(x));
 // welcome / end texts
 _T('welcome','Witaj w Squared Circle Manager',`Prowadzisz własną federację wrestlingu. Co tydzień układasz galę, zarabiasz, rozwijasz skład i próbujesz awansować na wyższy poziom. Ten przewodnik omawia wszystkie ekrany i mechaniki: rodzaje walk, stypulacje, stawki, serie, zdarzenia, zapisy i późniejsze systemy. Masz spis treści pod ręką, możesz też pominąć samouczek i wrócić do niego w Ustawieniach.`,'Welcome to Squared Circle Manager',`You run your own wrestling promotion. Every week you book a show, earn money, grow your roster and try to climb to a higher tier. This guide covers every screen and mechanic: match types, stipulations, stakes, streaks, events, saves and the later systems. The table of contents is always at hand, and you can skip the tutorial and restart it from Settings.`);
 // chapters + table of contents
 Object.assign(D,{'tut.toc':['Spis','Contents'],'tut.toct':['Spis treści samouczka','Tutorial contents'],'tut.close':['Zamknij','Close'],'tut.ch.start':['Start','Getting started'],'tut.ch.fight':['Walki i stypulacje','Matches and stipulations'],'tut.ch.end':['Koniec','The end']});
})();
const TUT_FIGHT={mtype:1,stips:1,stipecon:1,stakes:1,timelimit:1,finishes:1,rating:1},TUT_START={welcome:1,ui:1,start:1};
function tutChap(i){const id=TUTS[i][1],sc=TUTS[i][0];if(id==='end')return 'tut.ch.end';if(TUT_START[id])return 'tut.ch.start';if(TUT_FIGHT[id])return 'tut.ch.fight';const g=NAVG.find(g=>g[1].indexOf(sc)>=0);return g?g[0]:'tut.ch.start'}
function tutToc(){
 let h='<div class="row spread"><h2 style="margin:0">'+esc(t('tut.toct'))+'</h2><button class="btn ghost" data-act="tutclose">'+esc(t('tut.close'))+'</button></div><div class="tuttoc">';
 let last='';TUTS.forEach((x,i)=>{const c=tutChap(i);if(c!==last){last=c;h+='<div class="stph">'+esc(t(c))+'</div>'}
  const cur=G&&G.tut&&G.tut.step===i;h+='<button class="tuti'+(cur?' on':'')+'" data-act="tutjump" data-i="'+i+'"><span class="tc">'+(i+1)+'</span> '+esc(t('tut.'+x[1]+'.t'))+'</button>'});
 openModal(h+'</div>')}
Object.assign(ACT,{tuttoc(){if(G&&G.tut)tutToc()},tutclose(){closeModal()},tutjump(e){closeModal();tutGo(+e.dataset.i)}});
// tutorial box: add the "Spis" button and let long lessons scroll
(function(){const _td=tutDraw;tutDraw=function(){_td.apply(this,arguments);try{if(!hasDoc||!tutOn())return;const el=document.getElementById('tut');if(!el||el.querySelector('[data-act="tuttoc"]'))return;const sk=el.querySelector('[data-act="tutskip"]');if(sk){const b=document.createElement('button');b.className='btn';b.setAttribute('data-act','tuttoc');b.textContent=t('tut.toc');sk.parentNode.insertBefore(b,sk.nextSibling)}}catch(e){}};
 if(hasDoc&&!document.getElementById('tuttoccss')){const s=document.createElement('style');s.id='tuttoccss';s.textContent='#tut{max-height:52vh;overflow:auto}#tut .tr{position:sticky;bottom:-14px;background:var(--panel2);padding:6px 0 2px}.tuttoc{display:flex;flex-direction:column;gap:4px;overflow:auto;max-height:62vh}.tuti{display:flex;gap:8px;align-items:baseline;text-align:left;background:var(--panel2);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:7px 10px;font:inherit;cursor:pointer}.tuti:hover{border-color:var(--gold)}.tuti.on{border-color:var(--gold);font-weight:600}.tuti .tc{min-width:22px;color:var(--mute)}';document.head.appendChild(s)}})();

/* ===== "?" help button on every screen: shows that screen's tutorial lessons ===== */
const HLP_SKIP={welcome:1,start:1,end:1};
function hlpIdx(sc){const r=[];TUTS.forEach((x,i)=>{if(x[0]===sc&&!HLP_SKIP[x[1]])r.push(i)});return r}
function hlpDraw(sc){
 const ix=hlpIdx(sc);if(!ix.length)return;
 let h='<div class="row spread"><h2 style="margin:0">'+esc(t('hlp.title'))+'</h2><button class="btn ghost" data-act="tutclose">'+esc(t('tut.close'))+'</button></div><div class="hlpl">';
 ix.forEach((i,n)=>{const id=TUTS[i][1];h+='<details class="hlpd"'+(n===0?' open':'')+'><summary>'+esc(t('tut.'+id+'.t'))+'</summary><p>'+esc(t('tut.'+id+'.b'))+'</p></details>'});
 h+='</div><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn gold" data-act="hlpgo" data-i="'+ix[0]+'">'+esc(t('hlp.tour'))+'</button></div>';
 openModal(h)}
Object.assign(ACT,{hlpopen(e){hlpDraw(e.dataset.s)},hlpgo(e){closeModal();if(G){G.tut={step:+e.dataset.i,done:0};tutGo(+e.dataset.i)}}});
Object.assign(D,{'hlp.title':['Podpowiedź do tego ekranu','Help for this screen'],'hlp.tour':['Uruchom samouczek od tego miejsca','Start the tutorial from here'],'hlp.btn':['Pomoc do tego ekranu','Help for this screen']});
(function(){
 const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{
  if(!hasDoc||!G||RUN)return r;const sc=G.screen;if(!hlpIdx(sc).length)return r;
  const h=document.querySelector('main .top h2')||document.querySelector('.top h2');
  if(h&&!h.querySelector('.hlp')){const b=document.createElement('button');b.className='hlp';b.setAttribute('data-act','hlpopen');b.setAttribute('data-s',sc);b.setAttribute('aria-label',t('hlp.btn'));b.title=t('hlp.btn');b.textContent='?';h.appendChild(b)}
 }catch(e){}return r};
 if(hasDoc&&!document.getElementById('hlpcss')){const s=document.createElement('style');s.id='hlpcss';s.textContent='.hlp{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;margin-left:10px;vertical-align:middle;border-radius:50%;border:1px solid var(--line);background:var(--panel2);color:var(--mute);font:600 13px/1 var(--font-b,inherit);cursor:pointer;padding:0}.hlp:hover{border-color:var(--gold);color:var(--fg)}.hlpl{display:flex;flex-direction:column;gap:6px;overflow:auto;max-height:58vh}.hlpd{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:8px 12px}.hlpd summary{cursor:pointer;font-weight:600}.hlpd p{margin:8px 0 2px;font-size:14px;line-height:1.5}';document.head.appendChild(s)}})();
normTexts();
