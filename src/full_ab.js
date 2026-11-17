global.window=global;
const mkEl=()=>({innerHTML:'',hidden:true,className:'',firstChild:{innerHTML:''},value:'x',appendChild(){},select(){},scrollIntoView(){}});
const _el=mkEl();
global.document={getElementById:()=>_el,createElement:()=>mkEl(),addEventListener(){},querySelectorAll:()=>[]};
global.localStorage={_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}};
global.navigator={language:'pl'};
'use strict';
/* ============ i18n: each key holds [PL, EN]; add a language by adding a third slot ============ */
const LS_SAVE='ringboss.save.v2',LS_LANG='ringboss.lang.v1',LS_PACK='ringboss.pack.v2';
const hasDoc=typeof document!=='undefined';
let lang='en';
function detectLang(){try{const s=localStorage.getItem(LS_LANG);if(s)return s}catch(e){}try{return(navigator.language||'').toLowerCase().indexOf('pl')===0?'pl':'en'}catch(e){return'en'}}
lang=detectLang();
const D={
'app.tag':['Menedżer federacji wrestlingowej','Wrestling promotion manager'],
'nav.dash':['Panel','Dashboard'],'nav.roster':['Skład','Roster'],'nav.show':['Gala','Show'],'nav.feuds':['Feudy','Feuds'],'nav.stables':['Stajnie','Stables'],'nav.titles':['Pasy','Titles'],'nav.money':['Finanse','Finance'],'nav.world':['Świat','World'],'nav.settings':['Ustawienia','Settings'],
'common.week':['Tydzień {w} · rok {y}','Week {w} · year {y}'],
'start.title':['Wybierz federację','Choose your promotion'],
'start.sub':['Każda federacja gra się inaczej: od hali na 250 osób po stadiony na 50 tysięcy. Wszystkie nazwy i zawodnicy w paczce domyślnej są fikcyjni.','Every promotion plays differently: from a 250-seat hall to 50,000-seat stadiums. All names and wrestlers in the default pack are fictional.'],
'start.continue':['Kontynuuj zapisaną grę','Continue saved game'],'start.play':['Prowadź tę federację','Run this promotion'],
'start.custom':['Załóż własną federację','Found your own promotion'],'start.customsub':['Zaczynasz od zera: mała hala, 4 zawodników i 12 tysięcy dolarów.','Start from nothing: a small hall, 4 wrestlers and $12k.'],
'start.name':['Nazwa federacji','Promotion name'],'start.country':['Kraj','Country'],'start.create':['Zacznij od zera','Start from zero'],
'start.roster':['{n} zawodników w składzie','{n} wrestlers on the roster'],'start.cash':['Budżet','Cash'],'start.pop':['Popularność','Popularity'],
'tier.1':['Lokalna','Local'],'tier.2':['Regionalna','Regional'],'tier.3':['Krajowa','National'],'tier.4':['Międzynarodowa','International'],'tier.5':['Globalna','Global'],
'venue.1':['Hala osiedlowa','Community hall'],'venue.2':['Hala sportowa','Sports hall'],'venue.3':['Arena miejska','City arena'],'venue.4':['Wielka arena','Major arena'],'venue.5':['Stadion','Stadium'],
'diff.1':['Przetrwaj i rośnij','Survive and grow'],'diff.2':['Walka o ligę','Fight for the league'],'diff.3':['Wyścig na szczyt','Race to the top'],'diff.4':['Rywal giganta','Challenger to the giant'],'diff.5':['Zarządzaj imperium','Run an empire'],
'st.ring':['Ring','Ring'],'st.psy':['Psychologia','Ring IQ'],'st.sta':['Kondycja','Stamina'],'st.mic':['Mikrofon','Mic'],'st.cha':['Charyzma','Charisma'],'st.pop':['Popularność','Popularity'],'st.acc':['Zaklimatyzowanie','Acclimatization'],'st.mor':['Morale','Morale'],
'st.age':['Wiek {n}','Age {n}'],'st.salary':['{m}/tydz.','{m}/wk'],'st.contract':['Kontrakt: {n}','Contract: {n}'],'st.foreign':['obcokrajowiec','foreigner'],'st.acc0':['Zaklimatyzowanie po podpisaniu: {n}','Acclimatization on signing: {n}'],'st.stable':['Stajnia: {n}','Stable: {n}'],
'style.technician':['Technik','Technician'],'style.powerhouse':['Siłacz','Powerhouse'],'style.highflyer':['Lotnik','High-flyer'],'style.lucha':['Lucha','Lucha'],'style.strong':['Mocny styl','Strong style'],'style.brawler':['Zadymiarz','Brawler'],'style.hardcore':['Hardcore','Hardcore'],
'role.face':['Face (ulubieniec)','Face (fan favourite)'],'role.heel':['Heel (łotr)','Heel (villain)'],'role.tweener':['Tweener','Tweener'],
'cn.US':['USA','USA'],'cn.JP':['Japonia','Japan'],'cn.MX':['Meksyk','Mexico'],'cn.GB':['Wielka Brytania','United Kingdom'],'cn.DE':['Niemcy','Germany'],'cn.PL':['Polska','Poland'],'cn.CA':['Kanada','Canada'],'cn.BR':['Brazylia','Brazil'],'cn.AU':['Australia','Australia'],'cn.NG':['Nigeria','Nigeria'],'cn.KR':['Korea Południowa','South Korea'],'cn.FR':['Francja','France'],'cn.IT':['Włochy','Italy'],'cn.ES':['Hiszpania','Spain'],'cn.IN':['Indie','India'],'cn.ZA':['RPA','South Africa'],
'd.cash':['Budżet','Cash'],'d.pop':['Popularność federacji','Promotion popularity'],'d.venue':['Miejsce gal','Venue'],'d.cap':['{n} miejsc','{n} seats'],'d.next':['Ułóż galę','Book the show'],'d.obj':['Cele','Objectives'],'d.last':['Ostatnia gala','Last show'],'d.news':['Wiadomości','News'],'d.war':['Ranking federacji','Promotion ranking'],'d.champs':['Mistrzowie','Champions'],'d.feuds':['Gorące feudy','Hot feuds'],'d.none':['Brak danych. Zorganizuj pierwszą galę.','No data yet. Run your first show.'],'d.trend':['Popularność w czasie','Popularity over time'],
'o.pop':['Popularność federacji {v}','Promotion popularity {v}'],'o.cash':['Budżet {v}','Cash {v}'],'o.streak':['Trzy gale z oceną 3,5★+ z rzędu','Three shows rated 3.5★+ in a row'],'o.top':['Zostań numerem 1 w rankingu','Become #1 in the ranking'],
'r.title':['Twój skład','Your roster'],'r.sort':['Sortuj','Sort'],'r.sortpop':['Popularność','Popularity'],'r.sortring':['Ring','Ring'],'r.sortname':['Nazwa','Name'],'r.edit':['Awatar','Avatar'],'r.release':['Zwolnij','Release'],'r.renew':['Przedłuż','Renew'],
'r.inj':['Kontuzja: {n}','Injured: {n}'],'r.limit':['Limit składu: {n}/{m}','Roster limit: {n}/{m}'],
'r.note':['Zawodnik spoza kraju federacji zaczyna z niskim zaklimatyzowaniem. Rośnie ono z każdym tygodniem w składzie i wpływa na jakość walk. Niskie morale też obniża formę.','A wrestler from outside the promotion\'s country starts with low acclimatization. It grows every week on the roster and affects match quality. Low morale hurts form too.'],
'sh.title':['Gala','Show'],'sh.sub':['Ułóż walki, wybierz zwycięzców, zakończenia i stypulacje. W trakcie walk możesz podejmować decyzje.','Book matches, pick winners, finishes and stipulations. You can make decisions during the matches.'],
'sh.auto':['Auto-układ','Auto-book'],'sh.clear':['Wyczyść','Clear'],'sh.run':['Rozpocznij galę','Start the show'],'sh.add':['Dodaj walkę','Add match'],'sh.remove':['Usuń','Remove'],
'sh.match':['Walka {n}','Match {n}'],'sh.main':['Walka wieczoru','Main event'],'sh.mode':['Rodzaj walki','Match type'],'sh.stip':['Stypulacja','Stipulation'],
'sh.pick':['Wybierz zawodnika','Select wrestler'],'sh.winner':['Zwycięzca','Winner'],'sh.finish':['Zakończenie','Finish'],'sh.notitle':['Bez pasa','No title'],'sh.titlefor':['O pas','For title'],
'md.1v1':['1 na 1','1 vs 1'],'md.2v2':['2 na 2 (tag team)','2 vs 2 (tag team)'],'md.3v3':['3 na 3 (trio)','3 vs 3 (trios)'],'md.4v4':['4 na 4','4 vs 4'],'md.1v2':['1 na 2 (handicap)','1 vs 2 (handicap)'],'md.2v3':['2 na 3 (handicap)','2 vs 3 (handicap)'],
'stip.none':['Standardowa','Standard'],'stip.extreme':['Extreme Rules','Extreme Rules'],'stip.cage':['Klatka','Steel Cage'],'stip.ladder':['Walka drabinowa','Ladder match'],'stip.tables':['Stoły','Tables match'],'stip.lastman':['Last Man Standing','Last Man Standing'],'stip.iquit':['I Quit','I Quit'],'stip.submission':['Tylko poddanie','Submission match'],
'stipd.none':['Bez zmian zasad.','No rule changes.'],'stipd.extreme':['Brak DQ i count-outów, broń legalna. Lubią to hardcore i zadymiarze, technicy gorzej.','No DQs or count-outs, weapons legal. Hardcore and brawlers love it, technicians less so.'],'stipd.cage':['Ucieczka tylko przez zwycięstwo. Siłacze i zadymiarze błyszczą.','The only way out is to win. Powerhouses and brawlers shine.'],'stipd.ladder':['Zwycięzca zdejmuje cel z góry. Lotnicy i luchadorzy na prowadzeniu, wysokie ryzyko kontuzji.','Winner retrieves the prize from above. High-flyers and luchadores lead, high injury risk.'],'stipd.tables':['Trzeba przebić stół. Dobre dla hardcore, niezła widowisko.','Put your rival through a table. Great for hardcore, solid spectacle.'],'stipd.lastman':['Wygrywa ten, kto wstanie po dziesięciu. Duży żar feudu.','Win by standing after ten. Big feud heat.'],'stipd.iquit':['Walka kończy się słowem "poddaję się". Silnie podkręca feudy.','Ends when someone says "I quit". Strongly boosts feuds.'],'stipd.submission':['Wygrywa tylko poddanie. Technicy i mocny styl, nuda dla hardcore.','Only a submission wins. Technicians and strong style, dull for hardcore.'],
'stip.cost':['Koszt rekwizytów','Props cost'],
'rm.classic':['Klasyczny konflikt face-heel','Classic face vs heel'],'rm.neutral':['Neutralne role','Neutral roles'],'rm.dull':['Te same role: słabszy efekt','Same alignment: weaker effect'],
'fin.clean':['Czysta wygrana','Clean win'],'fin.dirty':['Brudna wygrana','Dirty win'],'fin.dq':['Dyskwalifikacja','Disqualification'],'fin.count':['Count-out','Count-out'],'fin.draw':['Remis','Draw'],
'chem.great':['Świetna chemia stylów','Great style chemistry'],'chem.ok':['Dobra chemia','Good chemistry'],'chem.none':['Neutralnie','Neutral'],'chem.bad':['Kiepskie dopasowanie','Poor match-up'],
'sh.feudheat':['Feud: żar {n}','Feud: heat {n}'],'sh.blow':['gotowe na walkę kończącą feud','ready for the blow-off'],
'sh.need':['Ułóż co najmniej 2 walki z pełnymi składami.','Book at least 2 matches with full line-ups.'],
'sh.skipweek':['Pomiń tydzień (bez gali)','Skip the week (no show)'],'sh.skipnote':['Kosztuje popularność, pensje nadal się płaci.','Costs popularity, salaries still apply.'],
'sh.skipanim':['Pomiń animację','Skip animation'],'sh.continue':['Zakończ i przejdź dalej','Finish and continue'],
'sh.result':['Wynik gali','Show result'],'sh.att':['Frekwencja','Attendance'],'sh.sold':['wyprzedane','sold out'],'sh.rev':['Przychód','Revenue'],'sh.cost':['Koszty','Costs'],'sh.profit':['Zysk','Profit'],'sh.rating':['Ocena gali','Show rating'],'sh.dpop':['Zmiana popularności','Popularity change'],
'f.title':['Feudy i rywalizacje','Feuds and rivalries'],'f.new':['Nowy feud','New feud'],'f.scn':['Scenariusz','Scenario'],'f.create':['Rozpocznij feud','Start feud'],
'f.heat':['Żar feudu','Feud heat'],'f.none':['Brak aktywnych feudów. Zacznij jeden poniżej.','No active feuds. Start one below.'],'f.end':['Zakończ','End'],
'f.ch0':['Zawiązanie','Setup'],'f.ch1':['Rozwinięcie','Build'],'f.ch2':['Gotowe na finał','Ready for the finale'],
'f.hint':['Gdy uczestnicy feudu zostaną ustawieni przeciw sobie, żar rośnie. Przy żarze 70+ walka kończy feud i ma skutki zależne od scenariusza.','When feud participants are booked against each other, heat grows. At heat 70+ the match ends the feud with consequences that depend on the scenario.'],
'f.side':['Strona {s}','Side {s}'],'f.sa':['Stajnia (strona A)','Stable (side A)'],'f.sb':['Stajnia (strona B)','Stable (side B)'],'f.member':['Członek stajni','Stable member'],'f.auto':['Rywalem będzie reszta jego stajni.','His own stable will be the opponent.'],
'f.nostable':['Ten scenariusz wymaga stajni. Stwórz ją w zakładce Stajnie.','This scenario needs a stable. Create one in the Stables tab.'],'f.invalid':['Uzupełnij wszystkie pola różnymi osobami.','Fill every field with different people.'],'f.size':['{n} vs {m}','{n} vs {m}'],
'sc.betrayal':['Zdrada partnera','Partner betrayal'],'sc.betrayal.d':['Dawni sojusznicy stają naprzeciw siebie.','Former allies face each other.'],'sc.betrayal.1':['Pierwsze oznaki konfliktu: spór o to, kto zasłużył na szansę.','First cracks: a dispute over who deserved the shot.'],'sc.betrayal.2':['Zdrada wisi w powietrzu. Fani żądają wyjaśnień.','Betrayal is in the air. Fans demand answers.'],
'sc.revenge':['Zemsta za porażkę','Revenge for a loss'],'sc.revenge.d':['Przegrany nie zapomina upokorzenia.','The loser never forgets the humiliation.'],'sc.revenge.1':['Zawodnik wraca z zaciętą miną i żąda rewanżu.','He returns scowling and demands a rematch.'],'sc.revenge.2':['Atak zza kulis zmienia rywalizację w wojnę.','An attack from behind turns it into a war.'],
'sc.title':['Wyścig o pas','Chase for the title'],'sc.title.d':['Pretendent bez końca ściga mistrza.','A challenger relentlessly pursues the champion.'],'sc.title.1':['Pretendent wygrywa serię walk i zyskuje szansę.','The challenger wins a streak and earns a shot.'],'sc.title.2':['Mistrz unika walki, a publiczność robi się niecierpliwa.','The champion dodges the fight and fans grow restless.'],
'sc.legend':['Powrót legendy','Legend returns'],'sc.legend.d':['Weteran wraca, by sprawdzić młodego.','A veteran returns to test the young star.'],'sc.legend.1':['Legenda pojawia się na gali i wywołuje owację.','The legend appears on the show to a huge ovation.'],'sc.legend.2':['Młody zawodnik odpowiada: nikt nie zabierze mu miejsca.','The youngster answers: nobody takes his spot.'],
'sc.rookie':['Debiutant kontra weteran','Rookie vs veteran'],'sc.rookie.d':['Nowa twarz rzuca wyzwanie ustalonej hierarchii.','A new face challenges the established order.'],'sc.rookie.1':['Debiutant bez szacunku wchodzi w drogę weteranowi.','The rookie shows no respect and gets in the veteran\'s way.'],'sc.rookie.2':['Weteran traci cierpliwość. Starcie jest nieuniknione.','The veteran loses patience. A showdown is inevitable.'],
'sc.recruit':['Nowy członek stajni','New stable member'],'sc.recruit.d':['Stajnia próbuje zwerbować zawodnika. Jeśli wygra, ten dołącza.','A stable tries to recruit a wrestler. If it wins, he joins.'],'sc.recruit.1':['Stajnia składa ofertę, której zawodnik nie chce przyjąć.','The stable makes an offer he refuses to accept.'],'sc.recruit.2':['Presja rośnie, a koledzy ze stajni otaczają ring.','Pressure builds as stable mates surround the ring.'],
'sc.stablewar':['Stajnia kontra stajnia','Stable vs stable'],'sc.stablewar.d':['Dwie ekipy walczą o dominację w federacji.','Two crews fight for dominance in the promotion.'],'sc.stablewar.1':['Obie ekipy mijają się na korytarzach i dochodzi do przepychanek.','Both crews clash backstage in heated shoving matches.'],'sc.stablewar.2':['Pełna wojna: wszyscy członkowie wpadają do ringu.','Full-blown war: every member storms the ring.'],
'sc.defector':['Dezerter ze stajni','Stable defector'],'sc.defector.d':['Członek buntuje się przeciw własnej ekipie. Po finale odchodzi.','A member turns on his own crew. He leaves after the finale.'],'sc.defector.1':['Zawodnik podważa decyzje lidera stajni.','The wrestler questions the leader\'s decisions.'],'sc.defector.2':['Dawni koledzy atakują go po walce.','His former mates attack him after the match.'],
'sc.tagwar':['Tag team kontra tag team','Tag team vs tag team'],'sc.tagwar.d':['Dwa duety rywalizują o miano najlepszego.','Two duos compete to be the best.'],'sc.tagwar.1':['Duety wymieniają się obelgami po gali.','The duos trade insults after the show.'],'sc.tagwar.2':['Nikt nie chce ustąpić. Pojedynek zespołów jest coraz bliżej.','Nobody backs down. The team showdown approaches.'],
'sc.trioswar':['Wojna trio','Trios war'],'sc.trioswar.d':['Dwa trzyosobowe zespoły stają do wielkiego starcia.','Two three-man teams square up for a huge clash.'],'sc.trioswar.1':['Trójki atakują się nawzajem na każdej gali.','The trios attack each other on every show.'],'sc.trioswar.2':['Walka 6-osobowa jest nieunikniona.','A six-man showdown is unavoidable.'],
'sc.handicap':['Jeden przeciw dwóm','One against two'],'sc.handicap.d':['Dwaj rywale wspólnie polują na samotnego zawodnika.','Two rivals gang up on a lone wrestler.'],'sc.handicap.1':['Dwóch zawodników atakuje samotnika po walce.','Two wrestlers attack the loner after his match.'],'sc.handicap.2':['Samotnik żąda starcia z obydwoma naraz.','The loner demands to face both at once.'],
'sb.title':['Stajnie','Stables'],'sb.hint':['Członkowie stajni dostają premię w walkach razem, a w walkach przeciw innym mogą interweniować. Stajnie napędzają feudy.','Stable mates get a bonus when wrestling together and can interfere in other matches. Stables drive feuds.'],
'sb.new':['Nowa stajnia','New stable'],'sb.name':['Nazwa stajni','Stable name'],'sb.members':['Członkowie (od 2 do 6)','Members (2 to 6)'],'sb.create':['Utwórz stajnię','Create stable'],'sb.dissolve':['Rozwiąż','Dissolve'],'sb.add':['Dodaj','Add'],'sb.kick':['Usuń','Remove'],'sb.none':['Nie masz jeszcze żadnych stajni.','You have no stables yet.'],'sb.min':['Wybierz co najmniej 2 zawodników i podaj nazwę.','Pick at least 2 wrestlers and enter a name.'],'sb.free':['Brak wolnych zawodników.','No free wrestlers.'],'sb.addm':['Dodaj członka','Add member'],
'av.title':['Edytor awatara','Avatar editor'],'av.skin':['Skóra','Skin'],'av.hair':['Włosy','Hair'],'av.hairc':['Kolor włosów','Hair color'],'av.beard':['Broda','Beard'],'av.outfit':['Strój','Outfit'],'av.outc':['Kolor stroju','Outfit color'],'av.mask':['Maska','Mask'],'av.maskc':['Kolor maski','Mask color'],'av.random':['Losuj','Randomize'],'av.close':['Gotowe','Done'],
'hs.bald':['Łysy','Bald'],'hs.short':['Krótkie','Short'],'hs.long':['Długie','Long'],'hs.mohawk':['Irokez','Mohawk'],'hs.afro':['Afro','Afro'],
'bd.none':['Brak','None'],'bd.stubble':['Zarost','Stubble'],'bd.full':['Pełna','Full'],'of.trunks':['Spodenki','Trunks'],'of.singlet':['Kostium','Singlet'],'of.pants':['Spodnie','Pants'],'mk.none':['Brak','None'],'mk.half':['Pół','Half'],'mk.full':['Cała','Full'],
't.title':['Pasy mistrzowskie','Championships'],'t.world':['Mistrzostwo Świata','World Championship'],'t.second':['Pas drugiej kategorii','Secondary Title'],'t.tag':['Pasy tag team','Tag Team Titles'],'t.vacant':['Wakat','Vacant'],'t.since':['od tygodnia {w}','since week {w}'],'t.hist':['Historia panowań','Reign history'],'t.nohist':['Brak historii.','No history yet.'],
't.create':['Stwórz własny pas','Create your own title'],'t.name':['Nazwa pasa','Title name'],'t.size':['Rodzaj','Type'],'t.size1':['Indywidualny','Singles'],'t.size2':['Tag team (2 osoby)','Tag team (2 people)'],'t.size3':['Trio (3 osoby)','Trios (3 people)'],
't.prest':['Prestiż','Prestige'],'t.p1':['Niski','Low'],'t.p2':['Średni','Medium'],'t.p3':['Wysoki','High'],'t.shape':['Kształt płyty','Plate shape'],'t.plate':['Kolor płyty','Plate color'],'t.strap':['Kolor pasa','Strap color'],'t.emb':['Emblemat','Emblem'],
't.add':['Dodaj pas','Add title'],'t.retire':['Wycofaj pas','Retire title'],'t.max':['Limit 8 pasów osiągnięty.','Limit of 8 titles reached.'],'t.preview':['Podgląd','Preview'],'t.custom':['Mój pas','My Title'],'t.holder':['Mistrz','Champion'],
'bs.oval':['Owal','Oval'],'bs.round':['Koło','Round'],'bs.shield':['Tarcza','Shield'],'bs.rect':['Prostokąt','Rectangle'],'be.star':['Gwiazda','Star'],'be.crown':['Korona','Crown'],'be.bolt':['Piorun','Bolt'],'be.globe':['Glob','Globe'],'be.diamond':['Diament','Diamond'],
'm.title':['Finanse','Finance'],'m.income':['Przychód','Income'],'m.costs':['Koszty','Costs'],'m.profit':['Zysk','Profit'],'m.price':['Cena biletu: {n}% bazowej','Ticket price: {n}% of base'],
'm.pricehelp':['Każde +10% do ceny odejmuje ok. 5 punktów procentowych wypełnienia hali, ale bilet jest droższy. Gdy hala i tak by się wyprzedała, podwyżka nic nie kosztuje. Wysoka cena obniża też popularność, niska ją lekko podnosi.','Every +10% to the price removes about 5 percentage points of seats filled, but each ticket costs more. When the venue would sell out anyway, raising the price is free money. High prices also lower popularity, low prices raise it slightly.'],
'm.est':['Szacunek przy różnych cenach','Estimate at different prices'],'m.estp':['Cena','Price'],'m.esta':['Frekwencja','Attendance'],'m.estg':['Bilety','Tickets'],
'm.upgrade':['Awans do: {v}','Upgrade to: {v}'],'m.upneed':['Wymaga popularności {p} i budżetu {c}.','Requires popularity {p} and cash {c}.'],'m.maxed':['Osiągnięto najwyższy poziom.','Top level reached.'],
'm.hist':['Przychody i koszty ostatnich gal','Income and costs, recent shows'],'m.gate':['Bilety','Tickets'],'m.merch':['Gadżety','Merch'],'m.tv':['Telewizja','TV deal'],'m.spons':['Sponsor','Sponsor'],'m.sal':['Pensje','Salaries'],'m.prod':['Produkcja i hala','Production and venue'],
'w.title':['Świat wrestlingu','Wrestling world'],'w.feds':['Federacje','Federations'],'w.market':['Wolni agenci','Free agents'],'w.sign':['Zatrudnij ({m})','Sign ({m})'],'w.full':['Skład pełny','Roster full'],'w.cannot':['Za mało budżetu','Not enough cash'],
's.title':['Ustawienia','Settings'],'s.lang':['Język','Language'],'s.new':['Nowa gra','New game'],'s.confirm':['Potwierdź: to zakończy bieżącą grę','Confirm: this ends the current game'],
's.pack':['Paczka danych','Data pack'],'s.packd':['Federacje i zawodnicy to zwykły plik JSON. Skopiuj go, edytuj i wczytaj z powrotem, aby podmienić całą bazę (np. na paczkę społeczności).','Federations and wrestlers are a plain JSON file. Copy it, edit it and load it back to replace the whole database (e.g. with a community pack).'],
's.export':['Eksport paczki (JSON)','Pack export (JSON)'],'s.import':['Wklej paczkę lub wybierz plik','Paste a pack or choose a file'],'s.load':['Wczytaj paczkę','Load pack'],'s.reset':['Przywróć paczkę domyślną','Restore default pack'],'s.bad':['Nieprawidłowa paczka: potrzebne pola "feds" i "wrestlers".','Invalid pack: "feds" and "wrestlers" are required.'],'s.copy':['Kopiuj','Copy'],
's.about':['Zapis gry jest przechowywany w tej przeglądarce. Domyślna paczka zawiera wyłącznie fikcyjne postacie i federacje.','Your save is stored in this browser. The default pack contains only fictional characters and promotions.'],
'ev.interf.t':['Interwencja stajni','Stable interference'],'ev.interf.b':['Koledzy ze stajni {w} biegną do ringu. Co robisz?','The stable mates of {w} run to the ring. What do you do?'],
'ev.interf.1':['Pozwól na wbiegnięcie','Let the run-in happen'],'ev.interf.1d':['Wyższa ocena i duży żar, publiczność wrze.','Higher rating and big heat, the crowd erupts.'],
'ev.interf.2':['Sędzia to wyłapuje, brak interwencji','Referee spots it, no interference'],'ev.interf.2d':['Bezpieczny wybór, mały zysk.','Safe choice, small gain.'],
'ev.interf.3':['Chaos i dyskwalifikacja','Chaos and disqualification'],'ev.interf.3d':['Zakończenie zmienia się na DQ (w walkach bez DQ na brudną wygraną).','The finish becomes a DQ (a dirty win when DQs are off).'],
'ev.turn.t':['Heel turn?','Heel turn?'],'ev.turn.b':['{w} ma okazję zdradzić fanów w trakcie walki z {l}.','{w} has a chance to betray the fans mid-match against {l}.'],
'ev.turn.1':['Zrób zwrot','Make the turn'],'ev.turn.1d':['Zmiana roli, duży żar. Ryzykowne, ale pamiętne.','Role changes, big heat. Risky but memorable.'],'ev.turn.2':['Poczekaj z tym','Hold it for later'],'ev.turn.2d':['Mały żar, bez zmian.','Small heat, no change.'],
'ev.crowd.t':['Gorąca publiczność','Hot crowd'],'ev.crowd.b':['Hala żyje podczas walki {w} z {l}. Jak to wykorzystać?','The crowd is alive for {w} vs {l}. How do you use it?'],
'ev.crowd.1':['Przedłuż walkę','Extend the match'],'ev.crowd.1d':['Wyższa ocena, niewielkie ryzyko kontuzji.','Higher rating, slight injury risk.'],'ev.crowd.2':['Skróć i zostaw ich głodnych','Cut it short'],'ev.crowd.2d':['Niższa ocena, zero ryzyka.','Lower rating, no risk.'],
'ev.crowd.3':['Spektakularna akcja','Spectacular spot'],'ev.crowd.3d':['Największa ocena, spore ryzyko kontuzji.','Biggest rating, serious injury risk.'],
'ev.after.t':['Atak po walce','Post-match attack'],'ev.after.b':['Walka {w} z {l} dobiegła końca, a emocje nie opadają.','The match between {w} and {l} is over but tempers are not.'],
'ev.after.1':['Pozwól na atak','Allow the attack'],'ev.after.1d':['Duży wzrost żaru feudu.','Large feud heat gain.'],'ev.after.2':['Uścisk dłoni','Handshake'],'ev.after.2d':['Żar nieco spada.','Heat drops slightly.'],'ev.after.3':['Tylko spojrzenia','Just a stare-down'],'ev.after.3d':['Mały wzrost żaru.','Small heat gain.'],
'ev.contract.t':['Koniec kontraktu','Contract expiring'],'ev.contract.b':['Kontrakt {w} wygasa. Zawodnik ma {p} popularności.','The contract of {w} expires. Popularity {p}.'],'ev.contract.1':['Przedłuż o rok ({m})','Re-sign for a year ({m})'],'ev.contract.2':['Pozwól odejść','Let him go'],
'ev.poach.t':['Rywale podbierają zawodnika','A rival is poaching'],'ev.poach.b':['{f} składa ofertę zawodnikowi {w}. Możesz przebić ofertę.','{f} made an offer to {w}. You can counter it.'],'ev.poach.1':['Przebij ofertę ({m})','Counter-offer ({m})'],'ev.poach.2':['Pozwól odejść','Let him leave'],
'ev.spons.t':['Oferta sponsora','Sponsor offer'],'ev.spons.b':['Marka proponuje {m} tygodniowo przez 8 tygodni. Fani niezbyt lubią reklamy w ringu.','A brand offers {m} per week for 8 weeks. Fans are not thrilled about ads in the ring.'],'ev.spons.1':['Przyjmij','Accept'],'ev.spons.2':['Odrzuć','Decline'],
'ev.unhappy.t':['Niezadowolony zawodnik','Unhappy wrestler'],'ev.unhappy.b':['{w} ma dość braku szans i zaczyna szukać nowego miejsca.','{w} is tired of the lack of opportunities and is looking elsewhere.'],'ev.unhappy.1':['Podnieś pensję o 10% ({m} tygodniowo)','Raise salary by 10% ({m} per week)'],'ev.unhappy.2':['Zignoruj','Ignore it'],
'ln.open1':['{a} i {b} krążą wokół siebie.','{a} and {b} circle each other.'],'ln.open2':['Gong, a {a} od razu rusza na {b}.','The bell rings and {a} rushes {b} immediately.'],'ln.open3':['Tłum skanduje, gdy {a} i {b} łapią się za kołnierze.','The crowd chants as {a} and {b} lock up.'],
'ln.mid1':['{b} odpowiada serią uderzeń.','{b} answers with a flurry of strikes.'],'ln.mid2':['{a} przejmuje kontrolę i dusi tempo.','{a} takes control and slows the pace.'],'ln.mid3':['Wymiana ciosów, żadna ze stron nie ustępuje.','A back-and-forth exchange, neither side gives ground.'],
'ln.clx1':['Pojawiają się akcje kończące, widownia wstaje.','Near-falls and finishers, the crowd is on its feet.'],'ln.clx2':['Kto sięgnie po decydujący ruch?','Who will reach for the deciding move?'],'ln.clx3':['Wszyscy są wyczerpani, ale walka trwa.','Everyone is exhausted but the fight goes on.'],
'ln.stip':['Stypulacja: {s}.','Stipulation: {s}.'],
'ln.f.clean':['{w} wygrywa czysto z {l}.','{w} wins clean over {l}.'],'ln.f.dirty':['{w} wygrywa nieczysto, sędzia nic nie widzi.','{w} wins dirty while the referee misses it.'],'ln.f.dq':['{w} wygrywa przez dyskwalifikację {l}.','{w} wins by disqualification of {l}.'],'ln.f.count':['{w} wygrywa przez count-out.','{w} wins by count-out.'],'ln.f.draw':['Walka kończy się remisem.','The match ends in a draw.'],
'n.show':['Gala zakończona: ocena {r}★, frekwencja {a}.','Show done: {r}★ rating, attendance {a}.'],'n.champ':['{w} zdobywa pas: {t}.','{w} win the title: {t}.'],'n.defend':['{w} bronią pasa: {t}.','{w} retain: {t}.'],
'n.injury':['{w} doznaje kontuzji ({n} tyg.).','{w} gets injured ({n} wks).'],'n.turn':['{w} zmienia rolę: teraz {r}.','{w} changes role: now {r}.'],
'n.feudend':['Feud {a} vs {b} zakończony. Wygrywa {w}.','Feud {a} vs {b} concluded. {w} wins.'],'n.feudstart':['Rusza feud: {a} vs {b}.','A feud begins: {a} vs {b}.'],
'n.recruit':['{w} dołącza do stajni {s}.','{w} joins the stable {s}.'],'n.recruitfail':['{w} odrzuca ofertę stajni {s}.','{w} rejects the offer from {s}.'],'n.defect':['{w} odchodzi ze stajni {s}.','{w} leaves the stable {s}.'],
'n.stablenew':['Powstaje stajnia {s}.','The stable {s} is formed.'],'n.stabledis':['Stajnia {s} przestaje istnieć.','The stable {s} breaks up.'],'n.titlenew':['Nowy pas: {t}.','New title: {t}.'],'n.titleold':['Wycofano pas: {t}.','Title retired: {t}.'],
'n.sign':['Zatrudniono: {w}.','Signed: {w}.'],'n.release':['Zwolniono: {w}.','Released: {w}.'],'n.leave':['{w} odchodzi do {f}.','{w} leaves for {f}.'],
'n.tier':['Awans! Nowa skala: {v}.','Promoted! New scale: {v}.'],'n.skip':['Tydzień bez gali. Fani nie są zadowoleni.','A week without a show. Fans are unhappy.'],
'n.spons':['Nowy sponsor: {m} tygodniowo przez 8 tygodni.','New sponsor: {m} weekly for 8 weeks.'],'n.resign':['{w} przedłuża kontrakt.','{w} re-signs.'],'n.raise':['{w} dostaje podwyżkę.','{w} gets a raise.'],
'go.title':['Bankructwo','Bankruptcy'],'go.body':['Długi rosły zbyt długo i wierzyciele przejęli federację.','Debts piled up for too long and creditors took over the promotion.'],'go.again':['Zacznij od nowa','Start over']
};
function t(k,v){let s=D[k]?D[k][lang==='pl'?0:1]:k;if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function pn(n,pl3,en2){if(lang==='pl'){const a=Math.abs(n)%100,b=a%10;if(n===1)return pl3[0];if(a>10&&a<20)return pl3[2];if(b>=2&&b<=4)return pl3[1];return pl3[2]}return n===1?en2[0]:en2[1]}
const wks=n=>n+' '+pn(n,['tydzień','tygodnie','tygodni'],['week','weeks']);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const rnd=()=>Math.random();
const pickR=a=>a[Math.floor(rnd()*a.length)];
function money(n){const s=n<0?'-':'';n=Math.abs(n);let r;if(n>=1e9)r='$'+(n/1e9).toFixed(2)+'B';else if(n>=1e7)r='$'+Math.round(n/1e6)+'M';else if(n>=1e6)r='$'+(n/1e6).toFixed(1)+'M';else if(n>=1e4)r='$'+Math.round(n/1e3)+'k';else if(n>=1e3)r='$'+(n/1e3).toFixed(1)+'k';else r='$'+Math.round(n);if(lang==='pl')r=r.replace('.',',');return s+r}
const num=n=>Math.round(n).toLocaleString(lang==='pl'?'pl-PL':'en-US');
const f1=n=>{const s=(Math.round(n*10)/10).toFixed(1);return lang==='pl'?s.replace('.',','):s};
const f2=n=>{const s=(Math.round(n*100)/100).toFixed(2);return lang==='pl'?s.replace('.',','):s};


const avg=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:0;
/* ============ i18n additions (round 2) ============ */
Object.assign(D,{
'nav.stables':['Stajnie','Stables'],
'cn.FR':['Francja','France'],'cn.ES':['Hiszpania','Spain'],'cn.IT':['Włochy','Italy'],'cn.CZ':['Czechy','Czechia'],
'st.str':['Siła','Strength'],'st.spd':['Szybkość','Speed'],'st.tec':['Technika','Technique'],'st.sta':['Wytrzymałość','Stamina'],'st.psy':['Psychologia','Psychology'],
'st.morale':['Morale','Morale'],'st.fat':['Zmęczenie','Fatigue'],'st.acc':['Aklimatyzacja','Acclimatization'],'st.loy':['Lojalność','Loyalty'],
'st.g.main':['Główne','Core'],'st.g.body':['Umiejętności','Skills'],'st.g.status':['Stan','Status'],
'st.home':['Swój','Local'],'st.foreign':['Zagraniczny','Foreign'],'st.stable':['Stajnia: {n}','Stable: {n}'],
'sh.mode':['Rodzaj walki','Match type'],'sh.stip':['Stypulacja','Stipulation'],
'mode.1v1':['1 na 1','Singles'],'mode.1v2':['Handicap 1 na 2','Handicap 1 vs 2'],'mode.1v3':['Handicap 1 na 3','Handicap 1 vs 3'],
'mode.2v2':['Tag team 2 na 2','Tag team 2 vs 2'],'mode.2v3':['Handicap 2 na 3','Handicap 2 vs 3'],'mode.3v3':['Walka 3 na 3','Six-man tag 3 vs 3'],
'mode.4v4':['Walka 4 na 4','Eight-man tag 4 vs 4'],'mode.3way':['Triple threat (3 osoby)','Triple threat (3 people)'],'mode.4way':['Fatal 4-way (4 osoby)','Fatal 4-way (4 people)'],
'stip.none':['Standardowa','Standard'],'stip.extreme':['Extreme Rules','Extreme Rules'],'stip.submission':['Na poddanie','Submission match'],'stip.lms':['Last Man Standing','Last Man Standing'],
'stip.tables':['Na stoły','Tables match'],'stip.cage':['Klatka','Steel cage'],'stip.ladder':['Drabinowa','Ladder match'],'stip.ironman':['Iron Man','Iron Man'],
'stip.lock':['(od poziomu: {v})','(requires: {v})'],
'stipd.none':['Zwykłe zasady.','Normal rules.'],
'stipd.extreme':['Bez dyskwalifikacji, bronie dozwolone. Hardcore i Zadymiarze błyszczą, więcej kontuzji.','No DQs, weapons allowed. Hardcore wrestlers and Brawlers shine, more injuries.'],
'stipd.submission':['Wygrywa się tylko poddaniem. Technicy i Mocny styl w swoim żywiole.','Won by submission only. Technicians and Strong style thrive.'],
'stipd.lms':['Trzeba położyć rywala na dłużej. Twarde starcie, więcej kontuzji.','You must keep the rival down. A hard fight with more injuries.'],
'stipd.tables':['Rywala przebija się przez stół. Hardcore, spore ryzyko kontuzji.','Put your rival through a table. Hardcore, high injury risk.'],
'stipd.cage':['Walka w klatce, kosztowna produkcja. Siłacze i Zadymiarze mają przewagę.','A cage match with costly production. Powerhouses and Brawlers have the edge.'],
'stipd.ironman':['Walka na czas, wygrywa więcej wygranych. Technicy i Mocny styl mają przewagę.','Timed match won on falls. Technicians and Strong style have the edge.'],
'stipd.ladder':['Zwycięzca sięga po trofeum nad ringiem. Lotnicy i Lucha w swoim żywiole, duże ryzyko.','The winner grabs the prize above the ring. High-flyers and Lucha thrive, very risky.'],
'sh.align.classic':['Klasyczny układ face vs heel','Classic face vs heel'],'sh.align.same':['Ten sam typ po obu stronach','Same alignment on both sides'],'sh.align.mixed':['Mieszany układ','Mixed alignment'],
'sh.team':['Zgrany zespół','Well-oiled team'],'sh.stable':['Ta sama stajnia','Same stable'],'sh.tired':['Zmęczeni: {n}','Tired: {n}'],'sh.stipcost':['Stypulacje','Stipulations'],
'sh.ffa':['Walka wieloosobowa: wybierz zwycięzcę','Multi-person match: pick the winner'],
't.tag':['Pasy tag team','Tag Team Titles'],'t.create':['Stwórz pas','Create a title'],'t.name':['Nazwa pasa','Title name'],'t.type':['Typ','Type'],
't.singles':['Indywidualny','Singles'],'t.tagteam':['Tag team (para)','Tag team (pair)'],'t.prestige':['Prestiż','Prestige'],'t.strap':['Kolor pasa','Strap colour'],'t.plate':['Kolor blach','Plate colour'],
't.preview':['Podgląd','Preview'],'t.add':['Dodaj pas','Add title'],'t.delete':['Usuń pas','Delete title'],'t.defaultname':['Pas {n}','Title {n}'],
'pl.gold':['Złoty','Gold'],'pl.silver':['Srebrny','Silver'],'pl.bronze':['Brązowy','Bronze'],'pl.black':['Czarny','Black'],
't.kind1':['Indywidualny','Singles'],'t.kind2':['Tag team','Tag team'],
'stb.title':['Stajnie','Stables'],'stb.hint':['Stajnie dają bonus za wspólne walki, interwencje podczas gal i wyższe morale. Maksymalnie 4 członków.','Stables give a bonus for fighting together, run-ins during shows and higher morale. Up to 4 members.'],
'stb.create':['Utwórz stajnię','Form a stable'],'stb.name':['Nazwa stajni','Stable name'],'stb.members':['Członkowie (2 do 4)','Members (2 to 4)'],
'stb.add':['Dodaj','Add'],'stb.remove':['Usuń','Remove'],'stb.disband':['Rozwiąż stajnię','Disband'],'stb.none':['Brak stajni. Utwórz pierwszą poniżej.','No stables yet. Form the first one below.'],
'stb.need':['Wpisz nazwę i wybierz od 2 do 4 członków.','Enter a name and pick 2 to 4 members.'],'stb.pop':['Średnia popularność: {n}','Average popularity: {n}'],'stb.addmember':['Dodaj członka','Add a member'],
'f.sideA':['Strona A','Side A'],'f.sideB':['Strona B','Side B'],'f.stable':['Stajnia','Stable'],'f.stableA':['Stajnia A','Stable A'],'f.stableB':['Stajnia B','Stable B'],
'f.target':['Cel (zawodnik spoza stajni)','Target (not in a stable)'],'f.member':['Buntownik (członek stajni)','Rebel (stable member)'],
'f.nostables':['Ten scenariusz wymaga stajni. Utwórz je w zakładce Stajnie.','This scenario needs stables. Form them in the Stables tab.'],
'f.invalid':['Wybierz różnych zawodników na każdą pozycję.','Pick different wrestlers for every slot.'],'f.nomode':['Brak rodzaju walki dla takiego układu osób.','No match type fits this number of people.'],
'f.dup':['Taki feud już trwa.','This feud already exists.'],
'f.fullmatch':['Finał wymaga walki z udziałem wszystkich {n} zaangażowanych ({m}).','The finale needs a match with all {n} involved wrestlers ({m}).'],
'f.hint':['Żar rośnie, gdy zaangażowani zawodnicy walczą przeciwko sobie. Przy żarze 70+ walka z udziałem wszystkich zaangażowanych kończy feud i daje premię.','Heat grows when the involved wrestlers fight each other. At heat 70+ a match with everyone involved ends the feud and earns a bonus.'],
'sc.mentor':['Mistrz kontra uczeń','Mentor vs protégé'],'sc.mentor.d':['Uczeń chce przerosnąć nauczyciela.','The student wants to surpass the teacher.'],
'sc.mentor.1':['Uczeń kwestionuje rady mistrza.','The student questions the mentor.'],'sc.mentor.2':['Mistrz chce pokazać, kto tu rządzi.','The mentor wants to show who is in charge.'],
'sc.tagwar':['Wojna tag teamów','Tag team war'],'sc.tagwar.d':['Dwie pary walczą o dominację w dywizji tag teamów.','Two duos fight for dominance of the tag division.'],
'sc.tagwar.1':['Pary wymieniają zaczepki i psują sobie wejścia.','The teams trade insults and sabotage each other.'],'sc.tagwar.2':['Jedna z par traci cierpliwość. Starcie wisi w powietrzu.','One duo loses patience. A showdown looms.'],
'sc.handicap':['Jeden przeciw wielu','One against many'],'sc.handicap.d':['Samotny wojownik kontra duet lub trio.','A lone fighter against a duo or trio.'],
'sc.handicap.1':['Dwóch rywali dopada go po gali.','Rivals ambush him after the show.'],'sc.handicap.2':['Fani żądają, by mógł oddać ciosy.','Fans demand he gets to hit back.'],
'sc.trios':['Wojna trójek','Trios war'],'sc.trios.d':['Dwie trójki walczą o kontrolę nad rozpiską gal.','Two trios fight for control of the card.'],
'sc.trios.1':['Obie trójki walczą o prestiż.','Both trios fight for prestige.'],'sc.trios.2':['Obie strony chcą rozstrzygnięcia w walce 3 na 3.','Both sides want a 3-on-3 settlement.'],
'sc.stablewar':['Stajnia kontra stajnia','Stable vs stable'],'sc.stablewar.d':['Dwie stajnie walczą o władzę w federacji.','Two stables battle for power in the promotion.'],
'sc.stablewar.1':['Pierwsze starcia kończą się chaosem i bójkami za kulisami.','First clashes end in chaos and backstage brawls.'],'sc.stablewar.2':['Obie stajnie wypowiadają totalną wojnę.','Both stables declare all-out war.'],
'sc.stablewar.e':['Przegrana stajnia traci morale.','The losing stable loses morale.'],
'sc.newmember':['Nowy członek stajni','New stable member'],'sc.newmember.d':['Stajnia próbuje zwerbować niezależnego zawodnika.','A stable tries to recruit an independent wrestler.'],
'sc.newmember.1':['Stajnia składa ofertę i nie przyjmuje odmowy.','The stable makes an offer and does not take no for an answer.'],'sc.newmember.2':['Zawodnik musi wybrać: dołączyć lub stawić czoła całej stajni.','The wrestler must choose: join them or face the whole stable.'],
'sc.newmember.e':['Jeśli stajnia wygra, zawodnik do niej dołączy.','If the stable wins, the wrestler joins it.'],
'sc.stablesplit':['Rozłam w stajni','Stable breakup'],'sc.stablesplit.d':['Członek stajni buntuje się przeciwko reszcie.','A stable member turns on his own group.'],
'sc.stablesplit.1':['Napięcie w szatni rośnie, pojawiają się pierwsze kłótnie.','Tension grows backstage and arguments erupt.'],'sc.stablesplit.2':['Zdrada jest bliska, a stajnia nie wybacza.','Betrayal is near and the stable does not forgive.'],
'sc.stablesplit.e':['Jeśli buntownik wygra, opuszcza stajnię.','If the rebel wins, he leaves the stable.'],
'ev.interf.b':['Stajnia {s} biegnie do ringu, aby pomóc: {w}. Co robisz?','The stable {s} runs to the ring to back: {w}. What do you do?'],
'n.joined':['{w} dołącza do stajni {s}.','{w} joins the stable {s}.'],'n.leftst':['{w} opuszcza stajnię {s}.','{w} leaves the stable {s}.'],
'n.stdisband':['Stajnia {s} rozpada się.','The stable {s} breaks up.'],'n.stnew':['Powstaje stajnia {s}.','The stable {s} is formed.'],'n.resisted':['{w} odrzuca ofertę stajni {s}.','{w} rejects the offer of {s}.'],
'n.fa':['Na rynku pojawia się nowy wolny agent: {w}.','A new free agent hits the market: {w}.'],
'm.estimate':['Szacunek dla różnych cen','Estimate for different prices'],'m.estp':['Cena','Price'],'m.esta':['Widownia','Attendance'],'m.estr':['Przychód z gali','Show income'],'m.best':['najlepszy','best'],
'm.pricehelp':['Wyższa cena daje więcej z biletu, ale mniej widzów. Gdy wyprzedajesz halę, podwyżka nic nie kosztuje. Gala droższa niż 125% powoli obniża popularność federacji, a tańsza niż 90% lekko ją podnosi.','A higher price brings more per ticket but fewer fans. When you sell out, raising it costs nothing. A show priced above 125% slowly hurts popularity, below 90% it slightly helps.'],
'start.filter':['Poziom federacji','Promotion tier'],'start.all':['Wszystkie','All'],
});

Object.assign(D,{
'f.heatlvl':['Intensywność scenariusza','Scenario intensity'],'f.live':['Gorąco feudu','Feud heat'],
'f.titlesel':['Pas, o który walczysz','Title at stake'],'f.challenger':['Pretendent','Challenger'],'f.challengers':['Pretendenci','Challengers'],
'f.rivalfed':['Rywalizująca federacja','Rival promotion'],'f.yours':['Twoi zawodnicy','Your wrestlers'],'f.theirs':['Zawodnicy rywala (wybierani automatycznie)','Rival wrestlers (picked automatically)'],
'f.guest':['Goście z federacji rywala pojawią się na liście zawodników w układaniu gali, dopóki feud trwa.','Wrestlers from the rival promotion appear in the match builder while the feud lasts.'],
'f.notitle':['Brak pasa z kompletnymi mistrzami. Najpierw ustaw mistrza.','No title with a full set of champions. Crown a champion first.'],
'f.memberA':['Członek stajni A','Stable member A'],'f.memberB':['Członek stajni B','Stable member B'],
'f.suggest':['Pasuje stypulacja: {s} (więcej żaru)','Fits the stipulation: {s} (more heat)'],
'f.warn.retire':['Uwaga: przegrany kończy karierę i odchodzi z federacji.','Warning: the loser retires and leaves the promotion.'],
'f.warn.fire':['Uwaga: przegrany traci kontrakt.','Warning: the loser loses the contract.'],
'f.warn.fed':['Wynik wpływa na prestiż Twojej federacji i rywala.','The result affects the prestige of your promotion and the rival.'],
'f.warn.heel':['Na końcu uwielbiany zawodnik może zmienić się w heela.','At the end a beloved wrestler may turn heel.'],
'n.retire':['{w} kończy karierę.','{w} retires.'],'n.fired':['{w} traci kontrakt.','{w} loses the contract.'],'n.fedwin':['{f} traci prestiż po przegranym starciu.','{f} loses prestige after the defeat.'],
});

Object.assign(D,{
'mode.ffa':['Każdy na każdego ({n} osób)','Free-for-all ({n} people)'],'mode.teamffa':['{n} (wiele drużyn)','{n} (multi-team)'],
'mode.same':['Walka {a} na {a}','{a} vs {a}'],'mode.hand':['Handicap {a} na {b}','Handicap {a} vs {b}'],
'mode.g.n':['Od {n} vs …','From {n} vs …'],'mode.g.multi':['Wielostronne (każdy na każdego)','Multi-way (free-for-all)'],
'sh.teamn':['Drużyna {n}','Team {n}'],
'f.format':['Format feudu','Feud format'],'f.fmt.std':['Standardowy (dwie strony)','Standard (two sides)'],
'f.fmt':['{n} stron – każdy na każdego','{n} sides – free-for-all'],'f.fmtT':['{n} drużyny/drużyn po {g}','{n} teams of {g}'],
'f.fav':['Zawodnik prosi o stypulację: {s} (w najbliższej walce feudu).','A wrestler wants a stipulation: {s} (in the next feud match).'],
'ev.pitch.t':['Pomysł zawodnika','A wrestler has an idea'],
'ev.pitch.stip.b':['{w} ma pomysł na feud „{f}”: walka w stypulacji {s}. Przekonuje, że publika to pokocha.','{w} has an idea for "{f}": a {s} match. Says the crowd will love it.'],
'ev.pitch.turn.b':['{w} chce zmienić swoją postać w feudzie „{f}” – zdradzić publiczność i przejść na drugą stronę (face/heel).','{w} wants to switch alignment in "{f}" – turn on the crowd (face/heel).'],
'ev.pitch.ambush.b':['{w} proponuje zakulisowy atak na {o} w feudzie „{f}”. Będzie głośno, ale to ryzykowne.','{w} pitches a backstage ambush on {o} in "{f}". It will get loud, but it is risky.'],
'ev.pitch.callout.b':['{w} chce wywołać {o} na ring i rzucić mu wyzwanie w feudzie „{f}”.','{w} wants to call out {o} in the ring in "{f}".'],
'ev.pitch.yes':['Zgoda, realizujemy','Approve it'],'ev.pitch.soft':['Złagodź pomysł (mniejszy efekt)','Tone it down (smaller effect)'],'ev.pitch.no':['Odrzuć (morale spada)','Decline (morale drops)'],
'ev.join.t':['Ktoś chce wejść do feudu','Someone wants in on a feud'],
'ev.join.b':['{w}: prośba o włączenie do feudu „{f}”.','{w}: request to be written into the feud "{f}".'],
'ev.join.third':['Jako osobna strona (feud wieloosobowy)','As a separate side (multi-way feud)'],
'ev.join.side':['Dołącz do strony: {s}','Join the side of: {s}'],'ev.join.no':['Nie, feud zostaje jak jest','No, keep the feud as is'],
'n.joinfeud':['{w} dołącza do feudu „{f}”.','{w} joins the feud "{f}".'],'n.pitch':['Pomysł {w} trafia do feudu „{f}”.','{w}\'s idea goes into the feud "{f}".'],
'n.feudstart.mw':['Rusza feud wieloosobowy: {a}.','A multi-way feud begins: {a}.'],'n.feudend.mw':['Feud {a} zakończony. Wygrywa {w}.','Feud {a} concluded. {w} comes out on top.'],
'stb.hint':['Stajnie dają bonus za wspólne walki, interwencje podczas gal i wyższe morale. Mogą mieć dowolną liczbę członków – w feudach walczy do 10 najpopularniejszych.','Stables give a bonus for fighting together, run-ins during shows and higher morale. They can have any number of members – up to the 10 most popular fight in feuds.'],
'stb.members':['Członkowie (minimum 2)','Members (at least 2)'],'stb.need':['Wpisz nazwę i wybierz co najmniej 2 członków.','Enter a name and pick at least 2 members.'],
});

Object.assign(D,{'pr.rally.1':['{a} rozgrzewa halę do czerwoności i wciąga publiczność w wiec przeciwko {b}.','{a} fires the arena up and turns the crowd into a rally against {b}.'],'pr.rally.2':['{a} zapewnia kibiców, że nikt go nie powstrzyma, a hala skanduje jego imię.','{a} promises the fans that nobody will stop the run, and the hall chants the name.'],'pr.rally.3':['{a} chwyta mikrofon i obiecuje fanom, że {b} dostanie lekcję, której nie zapomni.','{a} grabs the mic and promises the fans that {b} will learn a lesson to remember.'],'pr.type.rally':['Wiec','Rally'],'pr.heartfelt.1':['{a} zdejmuje maskę twardziela i opowiada szczerze, co dla niego znaczy ta rywalizacja z {b}.','{a} drops the tough act and speaks honestly about what the rivalry with {b} means.'],'pr.heartfelt.2':['{a} ze łzami w oczach dziękuje kibicom i obiecuje walczyć dla nich do końca.','{a} thanks the fans with a trembling voice and promises to fight for them to the end.'],'pr.heartfelt.3':['{a} mówi cicho i spokojnie. Hala milknie, słuchając każdego słowa.','{a} speaks softly and calmly. The hall falls silent, hanging on every word.'],'pr.type.heartfelt':['Szczere słowa','Heartfelt'],'pr.insult.1':['{a} wyśmiewa {b} przed całą halą, a każda riposta ma ostre jak brzytwa wykończenie.','{a} ridicules {b} in front of the whole hall, every line razor-sharp.'],'pr.insult.2':['{a} nazywa {b} pomyłką, którą federacja dawno powinna naprawić.','{a} calls {b} a mistake the promotion should have fixed long ago.'],'pr.insult.3':['{a} robi z występu {b} parodię, a publika nie wie, czy go kochać, czy nienawidzić.',"{a} turns {b}'s act into a parody, and the crowd cannot decide whether to love or hate it."],'pr.type.insult':['Szyderstwo','Mockery'],'pr.cheap.1':['{a} obraża miasto i kibiców. Hala buczy tak głośno, że prawie nie słychać mikrofonu.','{a} insults the city and the fans. The hall boos so loudly the mic is barely heard.'],'pr.cheap.2':['{a} chwali się, jak łatwo wykiwa {b}, i drwi z lokalnej drużyny.',"{a} brags about how easily {b} will be outsmarted and mocks the local team."],'pr.cheap.3':['{a} zrywa transparent z napisem {b} i rzuca nim w publiczność.',"{a} rips down a banner with {b}'s name and throws it into the crowd."],'pr.type.cheap':['Tani heat','Cheap heat'],'pr.menace.1':['{a} nie podnosi głosu. Patrzy w kamerę i mówi, co zrobi z {b}. Nikt nie śmie się odezwać.','{a} stays calm and stares into the camera while describing exactly what will happen to {b}. Nobody dares to speak.'],'pr.menace.2':['{a} wchodzi na ring w ciszy i zostawia {b} zakrwawioną koszulkę.','{a} enters the ring in silence and leaves {b} a bloodied shirt.'],'pr.menace.3':['{a} szepcze do mikrofonu, że ta rywalizacja skończy się tylko w jeden sposób.','{a} whispers into the mic that this rivalry can only end one way.'],'pr.type.menace':['Groźba','Menace'],'pr.analytic.1':['{a} spokojnie rozkłada styl {b} na części i wylicza, jak go złamie.',"{a} calmly dissects {b}'s style and explains how he will break it."],'pr.analytic.2':['{a} prezentuje na ekranie zestawienie błędów {b}. Publika jest pod wrażeniem.',"{a} shows a breakdown of {b}'s mistakes on screen. The crowd is impressed."],'pr.analytic.3':['{a} wyjaśnia, dlaczego technika zawsze pokona pasję, i patrzy {b} prosto w oczy.','{a} explains why technique always beats passion, looking {b} straight in the eyes.'],'pr.type.analytic':['Chłodna analiza','Cold analysis'],'pr.comedy.1':['{a} żartuje z {b}, z publiki i z samego siebie. Hala co chwilę wybucha śmiechem.','{a} jokes about {b}, the crowd and himself. The hall bursts into laughter again and again.'],'pr.comedy.2':['{a} wciąga {b} w serię ripost, które rozbawiają fanów do łez.','{a} drags {b} into a string of comebacks that has the fans in tears.'],'pr.comedy.3':['{a} przynosi na ring dziwny rekwizyt i robi z niego główny punkt skeczu o {b}.','{a} brings a strange prop to the ring and builds a sketch about {b} around it.'],'pr.type.comedy':['Komediowe','Comedy'],'pr.humble.1':['{a} mówi skromnie, że dostał szansę życia i zrobi wszystko, by ją wykorzystać.','{a} says humbly that this is the chance of a lifetime and everything will be done to use it.'],'pr.humble.2':['{a} dziękuje {b} za szacunek i obiecuje, że nie zawiedzie publiki.','{a} thanks {b} for the respect and promises not to let the crowd down.'],'pr.humble.3':['{a} przyznaje, że się boi, ale to właśnie dlatego nie odpuści.',"{a} admits to being scared, and that is exactly why there is no backing down."],'pr.type.humble':['Pokora','Humble'],'pr.highflyer.1':['{a} obiecuje, że pokaże coś, czego hala jeszcze nie widziała, a {b} nie zdąży mrugnąć.',"{a} promises to show the hall something it has never seen, and {b} won't have time to blink."],'pr.highflyer.2':['{a} wchodzi na narożnik i ogłasza publice, że dziś lata dla nich.',"{a} climbs the turnbuckle and tells the crowd tonight's flight is for them."],'pr.highflyer.3':['{a} rzuca {b} wyzwanie do wyścigu na akcje, których nikt inny nie odważy się zrobić.','{a} challenges {b} to a contest of moves nobody else would dare to try.'],'pr.type.highflyer':['Zapowiedź akcji','Hype'],'pr.faceoff.1':['{a} i {b} stają twarzą w twarz i wymieniają się słowami, aż muszą ich rozdzielać.','{a} and {b} stand face to face and trade words until they have to be pulled apart.'],'pr.faceoff.2':['{a} i {b} podpisują warunki walki, ale stół ląduje na ringu po kilku zdaniach.','{a} and {b} sign the match terms, but the table ends up on the mat after a few sentences.'],'pr.faceoff.3':['{a} i {b} obrzucają się oskarżeniami. Publika nie wie, komu kibicować.','{a} and {b} throw accusations at each other. The crowd cannot decide whom to cheer.'],'pr.type.faceoff':['Konfrontacja','Face-off'],'pr.champ.1':['{a} podnosi pas i przypomina wszystkim, dlaczego to on jest mistrzem.','{a} lifts the belt and reminds everyone why it belongs right here.'],'pr.champ.2':['{a} kpi z pretendentów: mówi, że ten pas jest dla niego za mały... i dla nich za duży.','{a} mocks the contenders, saying the title is already in the right hands.'],'pr.champ.3':['{a} dziękuje fanom za wsparcie i zapowiada, że będzie bronił pasa do końca.','{a} thanks the fans for their support and promises to defend the title to the end.'],'pr.type.champ':['Mistrzowskie','Champion'],'pr.crowd':['publiczności','the crowd'],'pr.hd':['Promo: {a} · {ty}','Promo: {a} · {ty}'],
'pr.q1':['Mikrofon nie zagrał – publika milczy.','The mic did not click – the crowd is quiet.'],'pr.q2':['Poprawne promo, bez fajerwerków.','A decent promo, no fireworks.'],'pr.q3':['Dobre promo, hala reaguje.','A good promo, the hall reacts.'],'pr.q4':['Świetne promo! Hala szaleje.','A great promo! The hall goes wild.'],
'sh.promo':['Promo','Promo'],'sh.addpromo':['Dodaj promo','Add a promo'],'sh.promoA':['Mówi','Speaker'],'sh.promoB':['Z kim (opcjonalnie)','With (optional)'],'sh.promoAt':['Kiedy','When'],
'sh.promoSolo':['— solo, do publiczności / rywala —','— solo, to the crowd / rival —'],'sh.before':['Przed walką {n}','Before match {n}'],'sh.afterAll':['Na zakończenie gali','Closing the show'],
'sh.fromfeud':['Dodaj z feudu','Add from a feud'],'sh.addmatch':['+ Walka','+ Match'],'sh.addpr':['+ Promo','+ Promo'],'sh.feudwith':['feud: {n}','feud with: {n}'],'sh.feudbusy':['Ktoś z tego feudu jest kontuzjowany, zajęty lub już na karcie.','Someone from this feud is injured, busy or already on the card.'],
'sh.promoMic':['Mikrofon','Mic'],'sh.promoMax':['Limit 4 promo na galę.','Limit of 4 promos per show.'],
'f.details':['Historia feudu','Feud history'],'f.hist.none':['Jeszcze nic się nie wydarzyło.','Nothing has happened yet.'],'f.hist.sum':['Walki: {m} · Proma: {p}','Matches: {m} · Promos: {p}'],'f.hist.wk':['Tydz. {n}','Wk {n}'],
'f.hist.m':['Walka','Match'],'f.hist.p':['Promo','Promo'],'f.hist.e':['Zdarzenie','Event'],'f.hist.s':['Start','Start'],'f.hist.start':['Feud się zaczyna.','The feud begins.'],'f.close':['Zamknij','Close'],
'f.hist.mw':['{vs} – wygrywa {w} ({fin}) · ★{s}','{vs} – {w} wins ({fin}) · ★{s}'],'f.hist.blow':['Finał feudu','Feud finale'],
'f.heatnum':['Intensywność scenariusza (1–100)','Scenario intensity (1–100)'],
'f.fmt':['{n} strony konfliktu – każdy na każdego','{n} sides of the conflict – free-for-all'],
});
Object.assign(D,{'sh.beforeMain':['Przed main eventem','Before the main event']});

Object.assign(D,{'ev.botch.t':['Nieudana akcja','A spot goes wrong'],'ev.botch.b':['Podczas walki {w} z {l} akcja idzie nie tak. Jak zareagować?','A spot goes wrong in {w} vs {l}. How do you react?'],'ev.botch.1':['Kontynuuj walkę','Keep going'],'ev.botch.1d':['Niższa ocena, ryzyko kontuzji.','Lower rating, injury risk.'],'ev.botch.2':['Improwizuj','Improvise'],'ev.botch.2d':['Wyższa ocena, małe ryzyko kontuzji.','Higher rating, small injury risk.'],'ev.botch.3':['Przerwij walkę','Stop the match'],'ev.botch.3d':['Niższa ocena, koniec przez dyskwalifikację, bez kontuzji.','Lower rating, ends in a DQ, no injury.'],'ev.chant.t':['Skandowanie hali','Crowd chants'],'ev.chant.b':['Publika skanduje imię zawodnika w walce {w} z {l}.','The crowd chants a name in {w} vs {l}.'],'ev.chant.1':['Wykorzystaj to','Embrace it'],'ev.chant.1d':['Wyższa ocena i trochę żaru.','Higher rating and some heat.'],'ev.chant.2':['Ignoruj','Ignore it'],'ev.chant.2d':['Bez zmian.','No change.'],'ev.chant.3':['Zagraj przeciwko publice','Play against the crowd'],'ev.chant.3d':['Zmiana postaci (face/heel), spory żar.','An alignment turn, big heat.'],'ev.weapon.t':['Krzesło w ringu','A chair in the ring'],'ev.weapon.b':['W walce {w} z {l} ktoś wyciąga krzesło. Co robimy?','Someone grabs a chair in {w} vs {l}. What now?'],'ev.weapon.1':['Pozwól na chaos','Allow the chaos'],'ev.weapon.1d':['Duży żar, walka kończy się dyskwalifikacją.','Large heat, the match ends in a DQ.'],'ev.weapon.2':['Odbierz krzesło','Take the chair away'],'ev.weapon.2d':['Żar spada.','Heat drops.'],'ev.weapon.3':['Użyj go w akcji','Use it in a spot'],'ev.weapon.3d':['Wyższa ocena, ryzyko kontuzji.','Higher rating, injury risk.'],'ev.fanrun.t':['Kibic na ringu','A fan runs in'],'ev.fanrun.b':['Kibic wbiega do ringu w trakcie walki {w} z {l}.','A fan runs into the ring during {w} vs {l}.'],'ev.fanrun.1':['Ochrona go zabiera','Security removes him'],'ev.fanrun.1d':['Niższa ocena.','Lower rating.'],'ev.fanrun.2':['Niech zawodnicy go złapią','Let the wrestlers catch him'],'ev.fanrun.2d':['Wyższa ocena, małe ryzyko kontuzji.','Higher rating, small injury risk.'],'ev.fanrun.3':['Zrób z tego wątek','Make it an angle'],'ev.fanrun.3d':['Wysoka ocena i żar.','High rating and heat.'],'ev.refbump.t':['Sędzia pada','Referee is down'],'ev.refbump.b':['Sędzia traci przytomność w walce {w} z {l}.','The referee is knocked out in {w} vs {l}.'],'ev.refbump.1':['Pozwól na zamieszanie','Allow the confusion'],'ev.refbump.1d':['Wyższa ocena i trochę żaru.','Higher rating and some heat.'],'ev.refbump.2':['Nieczyste zakończenie','A dirty finish'],'ev.refbump.2d':['Najwyższa ocena i żar.','Top rating and heat.'],'ev.refbump.3':['Szybka wymiana sędziów','Swap the referee'],'ev.refbump.3d':['Bez zmian.','No change.'],'ev.mic.t':['Awaria nagłośnienia','Sound issue'],'ev.mic.b':['Mikrofon i dźwięk zawodzą w walce {w} z {l}.','The sound cuts out during {w} vs {l}.'],'ev.mic.1':['Przeczekaj','Wait it out'],'ev.mic.1d':['Niższa ocena.','Lower rating.'],'ev.mic.2':['Niech hala krzyczy sama','Let the crowd carry it'],'ev.mic.2d':['Wyższa ocena i trochę żaru.','Higher rating and some heat.'],'ev.mic.3':['Ignoruj','Ignore it'],'ev.mic.3d':['Bez zmian.','No change.'],'se.vet.t':['Niespodziewany gość','Surprise guest'],'se.vet.b':['{w} (wolny agent) siedzi na widowni i prosi o chwilę w ringu.','{w} (a free agent) is in the crowd and asks for a moment in the ring.'],'se.vet.1':['Wpuść na ring ({m})','Let him in the ring ({m})'],'se.vet.2':['Odmów','Decline'],'se.glitch.t':['Awaria transmisji','Broadcast glitch'],'se.glitch.b':['Transmisja zacina się w trakcie gali.','The broadcast glitches during the show.'],'se.glitch.1':['Napraw od razu ({m})','Fix it right away ({m})'],'se.glitch.2':['Jedziemy dalej','Carry on'],'se.stunt.t':['Oferta sponsora','Sponsor offer'],'se.stunt.b':['Sponsor chce ulokować produkt w ringu za {m}.','A sponsor wants to place a product in the ring for {m}.'],'se.stunt.1':['Zgódź się (+{m})','Accept (+{m})'],'se.stunt.2':['Odmów','Decline'],'se.fan.t':['Transparent kibiców','Fan banner'],'se.fan.b':['Fani rozwinęli wzruszający transparent dla jednego z zawodników.','Fans unfurl a touching banner for one of the wrestlers.'],'se.fan.1':['Pokaż na kamerze','Show it on camera'],'se.fan.2':['Zignoruj','Ignore it'],'se.brawl.t':['Bójka w szatni','Backstage brawl'],'se.brawl.b':['{a} i {b} kłócą się za kulisami i dochodzi do bójki.','{a} and {b} get into a brawl backstage.'],'se.brawl.1':['Rozdziel ich','Separate them'],'se.brawl.2':['Nagraj i pokaż (tylko dorosła platforma)','Film it and air it (mature platforms only)'],'se.brawl.3':['Nałóż kary finansowe','Fine them'],
'sh.left':['Przesuń w lewo','Move left'],'sh.right':['Przesuń w prawo','Move right'],'sh.timeline':['Przebieg gali (od lewej do prawej)','Show order (left to right)'],
'stip.plat':['(zablokowane na tej platformie)','(blocked on this platform)'],
'rate.pg':['PG','PG'],'rate.tv14':['TV-14','TV-14'],'rate.mature':['18+','Mature'],
'sh.weekly':['Tygodniówka:','Weekly show:'],'sh.weeklyrev':['Przychód z mediów: {m}','Media revenue: {m}'],
'sh.bigweek':['Ten tydzień to gala specjalna „{n}”! Wybierz format:','This week is the special show "{n}"! Choose a format:'],
'sh.ppvd':['PPV: kibice kupują dostęp. Szacunek: {m} od ręki. Wyższe koszty produkcji.','PPV: fans buy access. Estimate: {m} up front. Higher production cost.'],
'sh.pled':['PLE w telewizji: premia {m} od stacji i większy wzrost popularności.','PLE on TV: a {m} bonus from the network and a bigger popularity boost.'],
'sh.plenotv':['PLE bez kontraktu TV nie daje dodatkowych pieniędzy, tylko większy wzrost popularności.','PLE without a TV deal brings no extra money, only a bigger popularity boost.'],
'sh.bigmin':['Gala specjalna oczekuje co najmniej 4 walk. Przy mniejszej liczbie wpływy z PPV spadają, a fani są zawiedzeni.','A special show expects at least 4 matches. With fewer, PPV income drops and fans are disappointed.'],
'sh.nextbig':['Gala specjalna (PPV/PLE) za {n} tyg.','Special show (PPV/PLE) in {n} wk.'],
'sh.bigres':['Gala specjalna: {k}','Special show: {k}'],'sh.buys':['Wykupiło: {n}','Buys: {n}'],'sh.thin':['Za mało walk na galę specjalną.','Too few matches for a special show.'],
'md.title':['Media i transmisja','Media and broadcast'],'md.intro':['Telewizja daje stałą wypłatę i dopuszcza ostrzejszy produkt (TV-14). Streaming nie wymaga umowy, ale platformy różnią się zasięgiem, zarobkiem i dopuszczalnymi treściami.','TV gives a steady fee and allows a harder product (TV-14). Streaming needs no contract, but platforms differ in reach, income and allowed content.'],
'md.perweek':['{m} / tydz.','{m} / wk'],'md.tvon':['Umowa TV trwa jeszcze {n} tyg. Zerwanie kosztuje {m}.','The TV deal runs for {n} more wk. Cancelling costs {m}.'],'md.cancel':['Zerwij umowę','Cancel the deal'],
'md.tvoffer':['Oferta telewizyjna','TV offer'],'md.tvtier':['Telewizja interesuje się federacjami od drugiego poziomu hali.','Networks only look at promotions from the second venue tier.'],'md.tvd':['Stała wypłata {m} tygodniowo przez {w} tyg., plus premie za gale PLE.','A steady {m} per week for {w} wk, plus bonuses for PLE shows.'],
'md.sign':['Podpisz umowę','Sign the deal'],'md.tvpop':['Wymagana popularność: {p}.','Required popularity: {p}.'],
'md.yt':['Duży zasięg, bezpieczne dla sponsorów, tylko PG. Dobre na wzrost popularności.','Big reach, sponsor-friendly, PG only. Good for growing popularity.'],
'md.twitch':['Lojalna widownia i lepsze gadżety, tylko PG.','Loyal audience and better merch, PG only.'],
'md.kick':['Wysoki udział w przychodach i treści 18+, ale sponsorzy płacą mniej.','High revenue share and 18+ content, but sponsors pay less.'],
'md.own':['Pełna kontrola i treści 18+. Opłata startowa i koszty serwerów; opłaca się przy dużej popularności.','Full control and 18+ content. Setup fee and server costs; pays off with high popularity.'],
'md.est':['Szacunek / tydz.','Estimate / wk'],'md.setup':['Opłata startowa: {m}','Setup fee: {m}'],'md.cd':['Zmiana możliwa za {n} tyg.','Can change in {n} wk'],'md.current':['Obecna','Current'],'md.choose':['Wybierz','Choose'],
'md.ppvle':['Co 4. tydzień jest gala specjalna. PPV: kibice płacą od razu, więc dużo gotówki, ale z kosztami. PLE: pieniądze tylko z kontraktu TV, za to większy wzrost popularności.','Every 4th week is a special show. PPV: fans pay up front, lots of cash but higher costs. PLE: money only with a TV deal, but a bigger popularity gain.'],
'n.tvend':['Umowa telewizyjna wygasła. Wracasz do streamingu.','The TV deal has expired. You are back to streaming.'],'n.bigwk':['W tym tygodniu gala specjalna: {n}.','This week is the special show: {n}.'],
'n.vet':['{w} pojawia się na gali jako gość specjalny.','{w} appears at the show as a special guest.'],'n.plat':['Nowa platforma tygodniówek: {p}.','New weekly show platform: {p}.'],
'n.tvsign':['Podpisano umowę telewizyjną: {m} tygodniowo.','TV deal signed: {m} per week.'],'n.tvcancel':['Umowa telewizyjna zerwana.','The TV deal was cancelled.'],
'm.tv':['Media (TV / streaming)','Media (TV / streaming)'],
'g.m':['Mężczyźni','Men'],'g.f':['Kobiety','Women'],'g.x':['Mieszana / otwarta','Mixed / open'],'g.all':['Wszyscy','Everyone'],'g.div':['Dywizja','Division'],
't.wworld':['Mistrzostwo Kobiet','Women\'s Championship'],'t.wtag':['Pasy Tag Team Kobiet','Women\'s Tag Titles'],
'hs.bob':['Bob','Bob'],'hs.pony':['Kucyk','Ponytail'],'of.suit':['Strój cały','Full suit'],
});

Object.assign(D,{'hs.bald':['Łysy','Bald'],'hs.buzz':['Zeroiówka','Buzz cut'],'hs.short':['Krótkie','Short'],'hs.crop':['Płaski czub','Crop'],'hs.side':['Przedziałek','Side part'],'hs.slick':['Zaczesane','Slicked back'],'hs.pompadour':['Pompadour','Pompadour'],'hs.spiky':['Kolce','Spiky'],'hs.fauxhawk':['Fauxhawk','Faux hawk'],'hs.mohawk':['Irokez','Mohawk'],'hs.curly':['Loki','Curly'],'hs.afro':['Afro','Afro'],'hs.dreads':['Dredy','Dreads'],'hs.braids':['Warkocze','Braids'],'hs.mullet':['Mullet','Mullet'],'hs.bun':['Kok','Top knot'],'hs.long':['Długie','Long'],'hs.bob':['Bob','Bob'],'hs.pony':['Kucyk','Ponytail'],'hs.pigtails':['Dwa kucyki','Pigtails'],'bd.none':['Brak','None'],'bd.stubble':['Zarost','Stubble'],'bd.heavy':['Gęsty zarost','Heavy stubble'],'bd.full':['Pełna','Full'],'bd.mustache':['Wąsy','Mustache'],'bd.handlebar':['Wąsy z podkręceniem','Handlebar'],'bd.goatee':['Kozia bródka','Goatee'],'bd.soulpatch':['Muszka','Soul patch'],'bd.chinstrap':['Pod brodą','Chinstrap'],'bd.vandyke':['Van Dyke','Van Dyke'],'bd.mutton':['Baczki z wąsami','Mutton chops'],'bd.sideburns':['Baczki','Sideburns'],'bd.long':['Długa broda','Long beard'],'of.trunks':['Spodenki','Trunks'],'of.singlet':['Kostium','Singlet'],'of.pants':['Spodnie','Pants'],'of.suit':['Strój cały','Full suit'],'of.tank':['Podkoszulek','Tank top'],'of.shorts':['Długie szorty','Long shorts'],'of.tights':['Legginsy','Tights'],'of.jacket':['Kurtka','Jacket'],'of.vest':['Kamizelka','Vest'],'of.gi':['Kimono','Gi'],'of.stripes':['Pasiak','Striped'],'of.armor':['Naramienniki','Shoulder pads'],'mk.none':['Brak','None'],'mk.half':['Pół','Half'],'mk.full':['Cała','Full'],'mk.domino':['Domino','Domino'],'mk.bandana':['Chusta na twarz','Face wrap'],'mk.paint':['Malowanie połowy','Half paint'],'mk.hood':['Kaptur','Hood'],'mk.skull':['Czaszka','Skull paint'],'acc.none':['Brak','None'],'acc.headband':['Opaska','Headband'],'acc.cap':['Czapka','Cap'],'acc.backcap':['Czapka tyłem','Backwards cap'],'acc.bandana':['Bandana','Bandana'],'acc.shades':['Ciemne okulary','Shades'],'acc.glasses':['Okulary','Glasses'],'acc.crown':['Korona','Crown'],'acc.cowboy':['Kowbojski kapelusz','Cowboy hat'],'acc.earrings':['Kolczyki','Earrings'],'gear.none':['Brak','None'],'gear.kneepads':['Ochraniacze kolan','Knee pads'],'gear.wristbands':['Opaski na nadgarstki','Wristbands'],'gear.pads':['Ochraniacze','Pads'],'gear.tape':['Taśma na rękach','Taped hands'],'gear.chain':['Łańcuch','Chain'],'gear.tattoo':['Tatuaże','Tattoos'],'gear.armband':['Opaska na ramię','Armband'],'face.none':['Brak','None'],'face.scar':['Blizna','Scar'],'face.freckles':['Piegi','Freckles'],'face.stripe':['Pasek na twarzy','Face stripe'],'face.eyepatch':['Przepaska na oko','Eyepatch'],'face.bruise':['Siniak','Bruise'],'bld.std':['Normalna','Average'],'bld.big':['Masywna','Big'],'bld.lean':['Szczupła','Lean'],'av.build':['Budowa','Build'],'av.beardc':['Kolor zarostu','Beard color'],'av.o2':['Kolor dodatkowy','Accent color'],'av.acc':['Nakrycie głowy i dodatki','Headwear'],'av.gear':['Ochraniacze i ozdoby','Gear'],'av.face':['Twarz','Face'],});

/* ============ i18n: round 9 (staff, retirement, guests, hiring events) ============ */
Object.assign(D,{
'nav.staff':['Kadra','Staff'],'r.retire':['Emerytura','Retire'],
'sr.coach':['Trener','Coach'],'sr.ref':['Sędzia','Referee'],'sr.comm':['Komentator','Commentator'],'sr.ann':['Announcer','Ring announcer'],
'spec.ring':['Ring i technika','In-ring and technique'],'spec.mic':['Mikrofon i charyzma','Mic and charisma'],'spec.power':['Siła i kondycja','Strength and stamina'],'spec.air':['Szybkość i lotnictwo','Speed and agility'],
'stf.title':['Kadra i goście','Staff and guests'],'stf.sub':['Zatrudniaj personel, ściągaj gości spoza wrestlingu i zarządzaj końcem karier swoich zawodników.','Hire staff, book guests from outside wrestling and manage the end of your wrestlers’ careers.'],
'stf.tab.staff':['Personel','Staff'],'stf.tab.guests':['Goście','Guests'],'stf.tab.legends':['Emeryci','Retirees'],
'stf.market':['Kandydaci','Candidates'],'stf.hire':['Zatrudnij ({m})','Hire ({m})'],'stf.full':['Limit na tym poziomie federacji','Limit reached for this tier'],'stf.lvl':['Poziom','Skill'],'stf.temp':['Okres próbny','Trial'],'stf.fit':['dopasowanie {n}','fit {n}'],
'stf.fx.coach':['Opieka nad {n} zawodnikami, +{p} pkt proc. szansy na rozwój','Covers {n} wrestlers, +{p} pts growth chance'],'stf.fx.ref':['{n} ★ do każdej walki','{n} ★ to every match'],'stf.fx.comm':['{n} ★ do oceny gali','{n} ★ to show rating'],'stf.fx.ann':['+{n}% do biletów i merchu','+{n}% tickets and merch'],
'stf.d.coach':['Trenerzy rozwijają zawodników: zwiększają tygodniową szansę na poprawę statystyk (zgodnie ze specjalizacją), spowalniają starzenie się i przyspieszają aklimatyzację obcokrajowców. Jeden trener obejmuje opieką kilku zawodników.','Coaches develop wrestlers: they raise the weekly chance of stat growth (by specialty), slow down aging and speed up acclimatization of foreigners. One coach looks after several wrestlers.'],
'stf.d.ref':['Dobry sędzia podnosi jakość walk i rzadziej dochodzi do wpadek i nieudanych akcji. Bez zatrudnionego sędziego pracuje lokalny wolontariusz (poziom 30).','A good referee raises match quality and reduces botches and referee mishaps. Without a hired referee a local volunteer works the shows (skill 30).'],
'stf.d.comm':['Komentatorzy podnoszą ocenę całej gali. Dwóch (prowadzący i ekspert) działa lepiej niż jeden. Bez nich komentuje wolontariusz (poziom 30).','Commentators raise the rating of the whole show. Two (play-by-play and color) work better than one. Without them a volunteer calls the show (skill 30).'],
'stf.d.ann':['Announcer buduje atmosferę wejść i podkręca sprzedaż biletów oraz merchu. Bez niego anonsuje wolontariusz (poziom 30).','The ring announcer builds the atmosphere and lifts ticket and merch sales. Without one a volunteer does the introductions (skill 30).'],
'lg.tag':['Legenda','Legend'],'lg.sub':['Zawodnicy, którzy zakończyli karierę, mogą zostać trenerami, sędziami, komentatorami albo announcerami. Im większa była ich popularność, tym lepsi są w nowej roli. Dołączają tu też weterani z innych federacji.','Retired wrestlers can become coaches, referees, commentators or announcers. The more popular they were, the better they are in the new role. Veterans from other promotions show up here too.'],'lg.none':['Brak emerytów. Zawodnicy kończą kariery z wiekiem.','No retirees yet. Wrestlers retire as they age.'],
'gc.actor':['Aktor/ka','Actor'],'gc.singer':['Muzyk (piosenka, rap)','Musician (singer, rapper)'],'gc.athlete':['Sportowiec/ka','Athlete'],'gc.strong':['Strongman','Strongman'],'gc.builder':['Kulturysta/ka','Bodybuilder'],'gc.influencer':['Influencer/ka','Influencer'],
'sp.football':['Piłka nożna','Football'],'sp.basket':['Koszykówka','Basketball'],'sp.boxing':['Boks','Boxing'],'sp.mma':['MMA','MMA'],'sp.sprint':['Lekkoatletyka','Athletics'],'sp.volley':['Siatkówka','Volleyball'],'sp.handball':['Piłka ręczna','Handball'],'sp.rugby':['Rugby','Rugby'],
'gs.sub':['Aktorzy, muzycy, sportowcy, siłacze, kulturyści i influencerzy. Dają bonus do oceny gali, frekwencji, merchu i popularności federacji, ale tylko wtedy, gdy wystąpią na gali, czyli w promo albo w walce. Z każdym kolejnym występem efekt nowości słabnie. Nie mogą zdobywać pasów ani należeć do stajni.','Actors, musicians, athletes, strongmen, bodybuilders and influencers. They boost show rating, attendance, merch and promotion popularity, but only when they appear on a show, in a promo or in a match. The novelty fades with each appearance. They cannot win titles or join stables.'],
'gs.cap':['Aktywni goście: {n} / {m}','Active guests: {n} / {m}'],'gs.hired':['Zatrudnieni goście','Hired guests'],'gs.none':['Nikt nie jest zatrudniony. Wybierz kogoś poniżej.','Nobody is booked. Pick someone below.'],
'gs.market':['Dostępni goście','Available guests'],'gs.marketd':['Lista odświeża się co 3 tygodnie. Okazje z niższą ceną pojawiają się losowo jako wydarzenia.','The list refreshes every 3 weeks. Discounted deals show up randomly as events.'],
'gs.fame':['Sława','Fame'],'gs.for1':['Jedna gala ({m})','One show ({m})'],'gs.for4':['Miesiąc ({m})','A month ({m})'],'gs.for12':['Sezon, 12 tyg. ({m})','Season, 12 wks ({m})'],'gs.full':['Limit gości osiągnięty','Guest limit reached'],
'gs.apps':['Występy: {n}','Appearances: {n}'],'gs.film':['Nowy film: „{f}”','New film: “{f}”'],'gs.hit':['Nowy hit: „{f}”','New hit: “{f}”'],'gs.addpromo':['Dodaj promo z gościem','Add a promo with the guest'],'gs.release':['Rozwiąż umowę','End the deal'],
'gs.onshow':['Goście do wykorzystania na gali','Guests available for this show'],'gs.hint':['Gość daje bonus tylko wtedy, gdy pojawi się na gali: w promo albo w walce (wybierz go z listy zawodników, oznaczony ★).','A guest only gives a bonus if they appear on the show: in a promo or a match (pick them from the wrestler list, marked ★).'],
'st.inj2':['Kontuzja: {n}','Injured: {n}'],
'gs.cam.actor.1':['{a} wchodzi do ringu w asyście ochrony i zapowiada premierę: „{x}”.','{a} walks to the ring with security and announces the premiere of “{x}”.'],
'gs.cam.actor.2':['{a} rozdaje autografy przy ringu i reklamuje „{x}”.','{a} signs autographs at ringside and plugs “{x}”.'],
'gs.cam.actor.3':['{a} rzuca żart o własnym filmie „{x}” i zgarnia brawa.','{a} jokes about their own film “{x}” and gets a pop.'],
'gs.cam.singer.1':['{a} wykonuje na żywo „{x}”, a cała hala śpiewa refren.','{a} performs “{x}” live and the whole arena sings the chorus.'],
'gs.cam.singer.2':['{a} wskakuje na linę z mikrofonem i zapowiada „{x}”.','{a} climbs the ropes with a mic and hypes “{x}”.'],
'gs.cam.singer.3':['{a} nagrywa fanów do teledysku „{x}” prosto z trybun.','{a} films the crowd for the “{x}” music video.'],
'gs.cam.athlete.1':['Gwiazda sportu ({x}), {a}, wita publiczność i sprawdza kondycję na linach.','Sports star ({x}), {a}, greets the crowd and tests the ropes.'],
'gs.cam.athlete.2':['{a} ({x}) podaje rękę pierwszym rzędom i obiecuje, że formy nie brakuje także w ringu.','{a} ({x}) shakes hands in the front row and promises to bring the form to the ring.'],
'gs.cam.athlete.3':['{a} ({x}) pokazuje kilka ćwiczeń z treningu, a hala bije brawo.','{a} ({x}) shows a few training drills and the arena applauds.'],
'gs.cam.strong.1':['{a} podnosi stolik sędziowski jedną ręką, a publiczność ryczy.','{a} lifts the timekeeper’s table with one hand and the crowd roars.'],
'gs.cam.strong.2':['{a} przeciąga ciężką oponę przez cały ring.','{a} drags a massive tire across the ring.'],
'gs.cam.strong.3':['{a} łamie w dłoniach łańcuch i rzuca wyzwanie szatni.','{a} snaps a chain in their hands and challenges the locker room.'],
'gs.cam.builder.1':['{a} pozuje do zdjęć na narożniku, fani szaleją.','{a} poses for photos on the turnbuckle and the fans go wild.'],
'gs.cam.builder.2':['{a} rozciąga się na ringu i prezentuje formę przed kamerami.','{a} stretches in the ring and shows off the physique for the cameras.'],
'gs.cam.builder.3':['{a} podnosi sztangę ze stolika i zbiera brawa.','{a} presses a barbell off the table and gets applause.'],
'gs.cam.influencer.1':['{a} streamuje całą scenę na żywo, a czat szaleje.','{a} streams the whole scene live and chat goes wild.'],
'gs.cam.influencer.2':['{a} robi z fanami selfie i rzuca hasło, które od razu trafia do sieci.','{a} takes selfies with the fans and drops a catchphrase that hits the web instantly.'],
'gs.cam.influencer.3':['{a} nagrywa reakcje publiczności i obiecuje, że klip będzie hitem.','{a} films the crowd reactions and promises the clip will go viral.'],
'gs.convert':['Podpisz jako wrestlera ({m})','Sign as a wrestler ({m})'],'gs.celeb':['Gwiazda popkultury','Pop-culture star'],'gs.disc':['Zniżka na gości dzięki gwiazdom w składzie: {n}%','Guest discount from stars on the roster: {n}%'],
'gs.convd':['Gwiazdę można zrobić pełnoprawnym wrestlerem: ma niskie statystyki, ale bardzo dużą popularność, a każda taka osoba w składzie obniża ceny zatrudnienia innych gości. To bardzo drogie, a zawodnik zajmuje miejsce w składzie i dostaje pensję jak wrestler.','A star can be signed as a full wrestler: low stats but huge popularity, and every such star on the roster lowers the price of hiring other guests. It is very expensive, takes a roster slot and the star is paid like a wrestler.'],
'n.celebsign':['{w} ({c}) podpisuje kontrakt jako pełnoprawny wrestler. Goście będą tańsi.','{w} ({c}) signs as a full wrestler. Guests will be cheaper.'],
'pr.type.guest':['Gość','Guest'],
'ev.h.one':['Jedna gala ({m})','One show ({m})'],'ev.h.month':['Miesiąc, 4 gale ({m})','A month, 4 shows ({m})'],'ev.h.no':['Odpuść','Pass'],'ev.h.sign':['Podpisz taniej ({m})','Sign cheaper ({m})'],'ev.h.trial':['Zatrudnij na próbę: {w}, {m}/tydz.','Hire on trial: {w}, {m}/wk'],
'ev.h.local.t':['Gwiazda w okolicy','A star is in town'],'ev.h.local.b':['{n} ({c}) przebywa akurat w okolicy ({co}) i może wpaść na galę. Nie trzeba płacić za podróż, więc cena jest o {d}% niższa. Oferta ważna tylko teraz.','{n} ({c}) happens to be in the area ({co}) and could drop by your show. No travel costs, so the price is {d}% lower. The offer is only good right now.'],
'ev.h.movie.t':['Premiera filmowa','Film premiere'],'ev.h.movie.b':['{n} promuje nowy film „{f}” i chętnie wpadnie na galę. Dystrybutor dopłaca do kontraktu, więc cena jest niższa o {d}%.','{n} is promoting the new film “{f}” and would gladly drop by. The distributor chips in, so the price is {d}% lower.'],
'ev.h.album.t':['Premiera singla','Single release'],'ev.h.album.b':['{n} wydaje nowy utwór i szuka sceny na promocję. Występ na żywo w hali to świetna reklama, więc cena jest niższa o {d}%. Wytwórnia dorzuci też pieniądze za sprzedaż płyt w hali.','{n} is dropping a new track and wants a stage to promote it. A live arena show is great exposure, so the price is {d}% lower. The label also pays extra for record sales at the venue.'],
'ev.h.sport.t':['Przerwa między sezonami','Off-season'],'ev.h.sport.b':['{n} ({s}) ma wolne między sezonami i szuka nowych wrażeń. Oferuje gościnny występ ze zniżką {d}%.','{n} ({s}) is between seasons and looking for a new thrill. They offer a guest appearance at a {d}% discount.'],
'ev.h.strong.t':['Wyzwanie siłacza','Strongman challenge'],'ev.h.strong.b':['{n} rzuca wyzwanie Twojemu najsilniejszemu zawodnikowi, {w}, i chce pokazać siłę przed publicznością. Zniżka {d}%. Pojedynek sił podbije popularność zawodnika.','{n} challenges your strongest wrestler, {w}, to a feat of strength in front of the crowd. {d}% discount. The showdown will lift the wrestler’s popularity.'],
'ev.h.builder.t':['Pokaz kulturysty','Bodybuilding exhibition'],'ev.h.builder.b':['{n} po wygranych zawodach szuka sceny, a marka suplementów pokryje część kosztów i dorzuci {m} za reklamę. Zniżka {d}%.','{n} just won a contest and wants a stage. A supplement brand covers part of the cost and adds {m} for advertising. {d}% discount.'],
'ev.h.influ.t':['Streamer za kulisami','Streamer backstage'],'ev.h.influ.b':['{n} chce nadawać na żywo zza kulis Twojej gali. Obecna platforma: {p}. Na platformach streamingowych taki występ działa najlepiej. Zniżka {d}%.','{n} wants to livestream from backstage at your show. Current platform: {p}. This works best on streaming platforms. {d}% discount.'],
'ev.h.wlocal.t':['Wolny agent w okolicy','Free agent nearby'],'ev.h.wlocal.b':['{w} jest akurat w okolicy ({co}), bo ma tu inną galę, i może od razu podpisać kontrakt za {m}, czyli taniej niż zwykle.','{w} is nearby ({co}) for another show and can sign with you on the spot for {m}, cheaper than usual.'],
'ev.h.coach.t':['Znany trener bez pracy','A known coach is available'],'ev.h.coach.b':['{n} (poziom {l}) szuka nowego miejsca i oferuje okres próbny: {w}, {m}/tydz.','{n} (skill {l}) is looking for a new place and offers a trial: {w}, {m}/wk.'],
'ev.h.ref.t':['Sędzia weteran','Veteran referee'],'ev.h.ref.b':['{n} (poziom {l}) po zamknięciu lokalnej ligi szuka pracy. Okres próbny: {w}, {m}/tydz.','{n} (skill {l}) is looking for work after a local league closed. Trial: {w}, {m}/wk.'],
'ev.h.comm.t':['Gościnny komentator','Guest commentator'],'ev.h.comm.b':['{n} (poziom {l}), znany głos sportowych transmisji, może skomentować Twoje gale. Umowa: {w}, {m}/tydz.','{n} (skill {l}), a well-known voice from sports broadcasts, can call your shows. Deal: {w}, {m}/wk.'],
'ev.h.ann.t':['Gwiazda mikrofonu','Mic star'],'ev.h.ann.b':['{n} (poziom {l}), znany z dużych aren, może zapowiedzieć Twoją galę. Umowa: {w}, {m}/tydz.','{n} (skill {l}), known from big arenas, can introduce your show. Deal: {w}, {m}/wk.'],
'ev.scontract.t':['Koniec kontraktu pracownika','Staff contract expiring'],'ev.scontract.b':['Kontrakt {w} ({r}, poziom {l}) wygasa. Przedłużyć?','The contract of {w} ({r}, skill {l}) expires. Renew?'],'ev.scontract.1':['Przedłuż o rok ({m})','Renew for a year ({m})'],'ev.scontract.2':['Pozwól odejść','Let go'],
'rt.title':['Emerytura: {w}','Retirement: {w}'],'rt.intro':['Zaproponuj zakończenie kariery. Wybierz okres pożegnania i, jeśli chcesz, nową rolę w federacji. Zawodnik może się zgodzić, zaproponować inne warunki albo odmówić. Szansa na zgodę: około {p}%.','Propose ending the career. Choose the farewell period and, if you want, a new role in the company. The wrestler can accept, counter with other terms or refuse. Chance to accept: about {p}%.'],
'rt.when':['Okres pożegnania','Farewell period'],'rt.w0':['Bez pożegnania (od razu)','No farewell (right away)'],'rt.w4':['Miesiąc (4 tygodnie)','A month (4 weeks)'],'rt.w13':['Kwartał (13 tygodni)','A quarter (13 weeks)'],'rt.w52':['Rok (52 tygodnie)','A year (52 weeks)'],
'rt.role':['Nowa rola po zakończeniu kariery','New role after retiring'],'rt.norole':['Brak (zwykła emerytura)','None (plain retirement)'],'rt.send':['Złóż propozycję','Make the offer'],'rt.cancel':['Anuluj','Cancel'],'rt.cancel2':['Odwołaj pożegnanie','Call off the farewell'],
'rt.tag':['Pożegnanie: {n} · rola: {r}','Farewell: {n} · role: {r}'],
'rt.no':['{w} odmawia: „Mam jeszcze sporo do pokazania w ringu”. Nastrój spadł, spróbuj ponownie za kilka tygodni.','{w} refuses: “I still have a lot to show in the ring.” Morale dropped, try again in a few weeks.'],
'rt.counter.time':['{w} nie chce odchodzić po cichu i proponuje inny okres pożegnania.','{w} does not want to leave quietly and proposes a different farewell period.'],
'rt.counter.role':['{w} ma własny pomysł na swoją przyszłość i proponuje inną rolę.','{w} has their own idea about the future and proposes a different role.'],
'rt.acc':['Przyjmij propozycję zawodnika','Accept the counter-offer'],'rt.rej':['Odrzuć i wycofaj się','Reject and back off'],'rt.rejected':['Rozmowa z {w} zakończyła się bez ustaleń. Nastrój lekko spadł.','The talk with {w} ended with no deal. Morale dipped slightly.'],
'rt.req.t':['Prośba o emeryturę','Retirement request'],'rt.req.b':['{w} ({a} l.) prosi o rozmowę: ciało coraz częściej odmawia posłuszeństwa i pora pomyśleć o zakończeniu kariery.','{w} (age {a}) asks for a talk: the body keeps letting them down and it is time to think about retiring.'],
'rt.req.1':['Sezon pożegnalny (13 tygodni)','Farewell season (13 weeks)'],'rt.req.2':['Miesiąc pożegnania i nowa rola: {r}','A month of farewell and a new role: {r}'],'rt.req.2b':['Miesiąc pożegnania, bez nowej roli','A month of farewell, no new role'],'rt.req.3':['Przekonaj do zostania (premia {m})','Convince to stay (bonus {m})'],'rt.req.4':['Emerytura od razu','Retire right away'],
'rt.cer.t':['Pożegnalny wieczór','Farewell night'],'rt.cer.b':['Dziś ostatni wieczór {w} w roli zawodnika. Nowa rola: {r}. Jak ma wyglądać pożegnanie?','Tonight is the last night of {w} as an active wrestler. New role: {r}. How should the send-off look?'],'rt.cer.1':['Wielka ceremonia ({m})','A grand ceremony ({m})'],'rt.cer.2':['Skromne podziękowania','A modest thank-you'],
'rt.e.lastmatch.t':['Ostatnia walka','The last match'],'rt.e.lastmatch.b':['{w} chce, by ostatnia walka kariery była wyjątkowa. Kto ma wyjść z niej zwycięsko? Pałeczkę mógłby przejąć {z}.','{w} wants the last match of the career to be special. Who should come out on top? {z} could take the torch.'],'rt.e.lastmatch.1':['Niech wygra legenda','Let the veteran win'],'rt.e.lastmatch.2':['Przekaż pałeczkę młodszemu zawodnikowi','Pass the torch to a younger wrestler'],
'rt.e.tribute.t':['Hołd legend','Legends’ tribute'],'rt.e.tribute.b':['Dawni rywale {w} chcą pojawić się na pożegnaniu. Sprowadzenie ich kosztuje {m}.','Old rivals of {w} want to appear at the farewell. Bringing them in costs {m}.'],'rt.e.tribute.1':['Ściągnij legendy ({m})','Bring in the legends ({m})'],'rt.e.tribute.2':['Nie teraz','Not now'],
'rt.e.merch.t':['Kolekcja pamiątkowa','Souvenir collection'],'rt.e.merch.b':['Partner handlowy proponuje limitowaną kolekcję pożegnalną {w}. Zysk około {m}, ale fani mogą uznać to za wyciąganie pieniędzy.','A merch partner proposes a limited farewell collection for {w}. About {m} in profit, but fans may see it as a cash grab.'],'rt.e.merch.1':['Wypuść kolekcję (+{m})','Release the collection (+{m})'],'rt.e.merch.2':['Zrezygnuj','Skip it'],
'rt.e.hurt.t':['Uraz w trakcie pożegnania','Injury during the farewell'],'rt.e.hurt.b':['Podczas pożegnalnej serii {w} doznaje urazu. Co robisz?','{w} gets hurt during the farewell run. What do you do?'],'rt.e.hurt.1':['Skróć pożegnanie, ceremonia w tym tygodniu','Cut it short, ceremony this week'],'rt.e.hurt.2':['Dokończ pożegnanie mimo bólu','Finish the farewell through the pain'],
'rt.e.comeback.t':['Rywal kusi','A rival makes an offer'],'rt.e.comeback.b':['{f} podsyła ofertę: duże pieniądze, jeśli {w} odłoży emeryturę. Decyzja jest teraz niepewna.','{f} sends an offer: big money if {w} postpones retirement. The decision is now up in the air.'],'rt.e.comeback.1':['Przekonaj do zostania (premia {m})','Convince to stay (bonus {m})'],'rt.e.comeback.2':['Uszanuj decyzję o emeryturze','Respect the retirement decision'],
'n.trained':['Trening: {w} poprawia statystykę {k} dzięki trenerowi {c}.','Training: {w} improves {k} thanks to coach {c}.'],'n.stafftemp':['{w} ({r}) kończy okres próbny i odchodzi.','{w} ({r}) finishes the trial and leaves.'],
'n.guest':['{w} ({c}) gościnnie w federacji: {n}.','{w} ({c}) guests in the promotion: {n}.'],'n.guestend':['Umowa gościa {w} dobiegła końca.','The guest deal with {w} has ended.'],
'n.rolefull':['Brak wolnego miejsca w kadrze, emerytura bez nowej roli.','No free staff slot, retirement without a new role.'],'n.farewell':['{w} rozpoczyna pożegnanie: {n}.','{w} begins a farewell run: {n}.'],'n.retstaff':['{w} kończy karierę i zostaje w federacji: {r}.','{w} retires and stays with the company as {r}.'],'n.retire2':['{w} kończy karierę.','{w} retires.'],
'n.tribute':['Legendy oddają hołd {w} na pożegnaniu.','Legends pay tribute to {w} at the farewell.'],'n.unretire':['{w} odkłada emeryturę.','{w} postpones retirement.'],'n.merchbump':['Wytwórnia dopłaca {m} za sprzedaż płyt w hali.','The label pays {m} for record sales at the venue.'],'n.sponsorg':['Marka suplementów płaci {m} za reklamę.','A supplement brand pays {m} for the advertising.'],
'n.stafftrial':['{w} ({r}) rozpoczyna okres próbny.','{w} ({r}) starts a trial.'],'n.staffhire':['{w} dołącza do kadry jako {r}.','{w} joins the staff as {r}.'],'n.stafffire':['{w} opuszcza kadrę.','{w} leaves the staff.'],
'sum.guests':['Goście na gali: {n}.','Guests on the show: {n}.'],'sum.farewell':['Pożegnanie w programie wzmocniło wpływy z biletów ({n}).','The farewell on the card lifted ticket revenue ({n}).'],
'sum.staff':['Kadra: komentarz i anons {c} ★ do oceny, sędziowie {r} ★ do walk, announcer +{a}% do biletów.','Staff: commentary and announcing {c} ★ to the rating, referees {r} ★ to matches, announcer +{a}% to tickets.']
});

/* ============ i18n: round 10 (belt designer, match poster) ============ */
Object.assign(D,{
'pl.rose':['Różowy','Rose'],'pl.blue':['Niebieski','Blue'],'pl.red':['Czerwony','Red'],'pl.rust':['Zardzewiały','Rusty'],'pl.emerald':['Szmaragdowy','Emerald'],
'bpat.plain':['Gładki','Plain'],'bpat.stripe':['Pasek środkowy','Center stripe'],'bpat.dual':['Dwa paski','Twin stripes'],'bpat.checker':['Szachownica','Checker'],'bpat.zigzag':['Zygzak','Zigzag'],'bpat.diamond':['Romby','Diamonds'],'bpat.dots':['Kropki','Dots'],'bpat.wave':['Fala','Wave'],'bpat.stitch':['Szwy','Stitching'],'bpat.barbed':['Drut kolczasty','Barbed wire'],
'bsh.oval':['Owal','Oval'],'bsh.round':['Koło','Circle'],'bsh.shield':['Tarcza','Shield'],'bsh.diamond':['Romb','Diamond'],'bsh.hex':['Sześciokąt','Hexagon'],'bsh.octagon':['Ośmiokąt','Octagon'],'bsh.star':['Gwiazda','Star'],'bsh.rect':['Prostokąt','Rectangle'],
'bem.letter':['Litera','Letter'],'bem.star':['Gwiazda','Star'],'bem.skull':['Czaszka','Skull'],'bem.crown':['Korona','Crown'],'bem.bolt':['Błyskawica','Lightning'],'bem.flag':['Flaga','Flag'],'bem.none':['Brak','None'],
'sem.gem':['Kamień','Gem'],'sem.star':['Gwiazda','Star'],'sem.flag':['Flaga','Flag'],'sem.mix':['Flagi krajów Europy','European flags'],'sem.none':['Brak','None'],
'fl.eu':['Unia Europejska','European Union'],'fl.pl':['Polska','Poland'],'fl.de':['Niemcy','Germany'],'fl.fr':['Francja','France'],'fl.it':['Włochy','Italy'],'fl.es':['Hiszpania','Spain'],'fl.gb':['Wielka Brytania','United Kingdom'],'fl.us':['USA','USA'],'fl.jp':['Japonia','Japan'],'fl.br':['Brazylia','Brazil'],'fl.mx':['Meksyk','Mexico'],'fl.ca':['Kanada','Canada'],
't.o.pat':['Wzór na pasku','Strap pattern'],'t.o.strap2':['Kolor wzoru','Pattern color'],'t.o.mainShape':['Kształt głównej płyty','Main plate shape'],'t.o.mainEmb':['Ozdoba głównej płyty','Main plate emblem'],'t.o.sideN':['Boczne płyty po każdej stronie','Side plates per side'],'t.o.sideShape':['Kształt bocznych płyt','Side plate shape'],'t.o.sideEmb':['Ozdoba bocznych płyt','Side plate emblem'],'t.o.flag':['Flaga','Flag'],'t.o.worn':['Stan głównej płyty','Main plate condition'],'t.o.wornno':['Nowa','Pristine'],'t.o.wornyes':['Poniszczona','Battered'],
't.preset':['Propozycje pasów','Belt presets'],
'bp.euro':['Pas Europejski','European Title'],'bp.hardcore':['Pas Hardcore','Hardcore Title'],'bp.classic':['Pas Klasyczny','Classic Title'],'bp.heritage':['Pas Tradycji','Heritage Title'],'bp.ultra':['Pas Ultra','Ultra Title'],'bp.women':['Pas Różowy','Pink Title'],'bp.tag':['Pasy Drużynowe','Tag Team Titles'],'bp.national':['Pas Narodowy','National Title'],
'bp.euro.d':['flagi na płytach','flags on the plates'],'bp.hardcore.d':['poniszczona płyta','battered plate'],
'poster.win':['Zwycięzca','Winner']
});

/* ============ i18n: round 11 (prizes, opportunity items, tournaments) ============ */
Object.assign(D,{
'nav.prizes':['Nagrody','Prizes'],
'pz.title':['Nagrody i turnieje','Prizes and tournaments'],
'pz.sub':['Walizki, kontrakty, medaliony, klucze i bilety dają posiadaczowi szansę na pas, którą może wykorzystać w dowolnym momencie. Pierścienie, puchary i korony to trofea za prestiż. Nagrody zdobywa się w walkach o nagrodę (stypulacja) albo w turniejach.','Cases, contracts, medallions, keys and tickets give the holder a title shot they can cash in at any time. Rings, cups and crowns are prestige trophies. Prizes are won in prize matches (a stipulation) or in tournaments.'],
'pz.k.case':['Walizka','Briefcase'],'pz.k.contract':['Kontrakt','Contract'],'pz.k.medal':['Okrąg (medalion)','Circle (medallion)'],'pz.k.key':['Klucz','Key'],'pz.k.ticket':['Złoty bilet','Golden ticket'],'pz.k.ring':['Pierścień','Ring'],'pz.k.cup':['Puchar','Cup'],'pz.k.crown':['Korona','Crown'],
'pz.def.case':['Walizka Szansy','Opportunity Case'],'pz.def.contract':['Kontrakt Szansy','Opportunity Contract'],'pz.def.medal':['Medalion Szansy','Opportunity Medallion'],'pz.def.key':['Złoty Klucz','Golden Key'],'pz.def.ticket':['Złoty Bilet','Golden Ticket'],'pz.def.ring':['Pierścień Zwycięzcy','Winner’s Ring'],'pz.def.cup':['Puchar Zwycięzców','Champions’ Cup'],'pz.def.crown':['Korona Turnieju','Tournament Crown'],
'pz.cls.opp':['Szansa na pas','Title shot'],'pz.cls.trophy':['Trofeum','Trophy'],'pz.holder':['Posiadacz','Holder'],'pz.vacant':['Nikt jej nie ma','Nobody holds it'],'pz.since':['od tyg. {w}','since wk {w}'],'pz.exp':['wygasa za {n}','expires in {n}'],'pz.never':['bez terminu','no expiry'],
'pz.target.any':['Cel: dowolny pas','Target: any title'],'pz.target':['Cel: {t}','Target: {t}'],'pz.life':['ważna {n}','valid for {n}'],
'pz.btn.match':['Dodaj walkę o nagrodę','Add a prize match'],'pz.btn.cash':['Wykorzystaj teraz','Cash in now'],'pz.btn.del':['Usuń','Delete'],
'pz.create':['Stwórz własną nagrodę','Create your own prize'],'pz.name':['Nazwa','Name'],'pz.kindlbl':['Rodzaj','Kind'],'pz.targetlbl':['Pas, o który można walczyć','Title that can be challenged'],'pz.lifelbl':['Ważność po zdobyciu','Validity once won'],'pz.add':['Dodaj nagrodę','Add prize'],
'pz.msg.nomatch':['Za mało wolnych zdrowych zawodników (min. 3) albo karta jest pełna.','Not enough free healthy wrestlers (min. 3) or the card is full.'],'pz.msg.nocash':['Brak odpowiedniego mistrza, wolnych zawodników albo miejsca na karcie.','No suitable champion, free wrestlers or room on the card.'],
'pz.row.prize':['Nagroda w stawce','Prize at stake'],'pz.row.cash':['Wykorzystaj nagrodę','Cash in a prize'],'pz.row.nocash':['Nie wykorzystuj','Do not cash in'],
'pz.cashhd':['Wykorzystanie: {p}','Cash-in: {p}'],'pz.prizehd':['Stawka: {p}','At stake: {p}'],'pz.surprise':['Mistrz był już dziś w ringu, więc {w} wykorzystuje okazję! Mistrz jest wyraźnie zmęczony.','The champion already worked tonight, so {w} seizes the chance! The champion is visibly worn out.'],
'stip.prizematch':['Walka o nagrodę','Prize match'],'stipd.prizematch':['Zwycięzca zdobywa wybraną nagrodę specjalną (walizkę, kontrakt, trofeum itp.). Najlepiej sprawdza się w walkach wieloosobowych. Lubią to lotnicy i zadymiarze.','The winner takes the chosen special prize (case, contract, trophy and so on). Works best in multi-person matches. High-flyers and brawlers love it.'],
'stip.tourney':['Mecz turniejowy','Tournament match'],'stipd.tourney':['Walka w ramach turnieju. Zwycięzca przechodzi do kolejnej rundy.','A match in a tournament. The winner advances to the next round.'],
'tr.title':['Turnieje','Tournaments'],'tr.create':['Stwórz turniej','Create a tournament'],'tr.sizelbl':['Liczba uczestników','Participants'],'tr.size':['{n} uczestników','{n} participants'],'tr.prize':['Nagroda dla zwycięzcy','Prize for the winner'],'tr.noprize':['Tylko prestiż','Prestige only'],
'tr.seed':['Rozstawienie','Seeding'],'tr.seed.pop':['Według popularności','By popularity'],'tr.seed.rand':['Losowe','Random'],'tr.start':['Rozpocznij turniej','Start the tournament'],'tr.need':['Dostępnych zdrowych zawodników: {n} z {m} potrzebnych.','Healthy wrestlers available: {n} of {m} needed.'],
'tr.round':['Runda {n}','Round {n}'],'tr.final':['Finał','Final'],'tr.semi':['Półfinał','Semifinal'],'tr.quarter':['Ćwierćfinał','Quarterfinal'],'tr.addm':['Dodaj do gali','Add to show'],'tr.onshow':['Na gali','On the show'],'tr.addround':['Dodaj całą rundę','Add the whole round'],
'tr.wo':['Walkower: {w}','Walkover: {w}'],'tr.done':['Zakończony','Finished'],'tr.none':['Brak turniejów.','No tournaments yet.'],'tr.defname':['Turniej {n}','Tournament {n}'],'tr.inj':['kontuzja','injured'],'tr.tag':['Turniej: {t}{r}','Tournament: {t}{r}'],'tr.max':['Limit dwóch aktywnych turniejów.','Limit of two active tournaments.'],
'n.prizewin':['{w} zdobywa nagrodę: {p}.','{w} wins the prize: {p}.'],'n.cashwin':['{w} wykorzystuje {p} i zdobywa pas: {t}!','{w} cashes in {p} and wins the title: {t}!'],'n.cashfail':['{w} wykorzystuje {p}, ale pas {t} zostaje u mistrza.','{w} cashes in {p}, but the title {t} stays with the champion.'],
'n.prizeexp':['Ważność nagrody {p} wygasła, {w} traci szansę.','The prize {p} has expired, {w} loses the shot.'],'n.tourwin':['{w} wygrywa turniej: {t}.','{w} wins the tournament: {t}.'],'n.tourstart':['Rusza turniej: {t}.','Tournament starts: {t}.']
});
Object.assign(D,{
'nav.cal':['Kalendarz','Calendar'],
'cal.title':['Kalendarz gal','Show calendar'],
'cal.sub':['Harmonogram gal Twojej federacji i rywali. Na bieżącej gali rywala możesz zrobić interwencję swoim zawodnikiem.','Schedule of your shows and rival shows. At a rival show this week you can run an interference with one of your wrestlers.'],
'cal.thisweek':['Ten tydzień (tydz. {n})','This week (week {n})'],
'cal.ownnow':['Twoja gala: ułożone walki: {n}','Your show: booked matches: {n}'],
'cal.pick':['Zawodnik do interwencji','Wrestler for the interference'],
'cal.rules':['Jedna interwencja na tydzień. Sukces zależy od popularności i charyzmy; zwycięstwo rywala można odwrócić. Porażka grozi zmęczeniem i kontuzją. Rozstrzyga się po zakończeniu tygodnia.','One interference per week. Success depends on popularity and charisma and can flip the rival\'s result. Failure risks fatigue and injury. Resolved when the week ends.'],
'cal.help':['Pomóż: {n}','Help: {n}'],
'cal.set':['interwencja: {n}','interference: {n}'],
'cal.active':['Zaplanowana interwencja: {w} na gali {f}.','Interference planned: {w} at {f}.'],
'cal.cancel':['Anuluj','Cancel'],
'cal.all':['Wszystkie federacje: {n}','All promotions: {n}'],'cal.near':['Najbliższe Twojej federacji i z wielką galą: {n}','Closest to you plus those with a big event: {n}'],'cal.showall':['Pokaż wszystkie','Show all'],'cal.shownear':['Tylko najbliższe','Only closest'],
'cal.main':['Main event','Main event'],'cal.show':['Gala','Show'],'cal.nocard':['Brak zdrowych zawodników do ułożenia karty.','No healthy wrestlers to build a card.'],
'cal.sched':['Najbliższe 12 tygodni','Next 12 weeks'],'cal.week':['Tydzień','Week'],'cal.wk':['Tydz. {n}','Wk {n}'],
'cal.legend':['• tygodniowa gala, ★ wielka gala (PPV/PLE) z nazwą.','• weekly show, ★ big event (PPV/PLE) with its name.'],
'cal.results':['Ostatnie wyniki rywali','Recent rival results'],'cal.def':['pokonuje','defeats'],
'cal.ok':['Interwencja udana','Interference worked'],'cal.fail':['Interwencja nieudana','Interference failed'],
'n.intvok':['{w} interweniuje na gali {f} i {m} wygrywa! Rywal traci prestiż.','{w} interferes at {f} and {m} wins! The rival loses prestige.'],
'n.intvfail':['{w} próbuje interweniować na gali {f}, ale zostaje przyłapany.','{w} tries to interfere at {f} but gets caught.'],
'n.intvinj':['{w} kontuzjowany po nieudanej interwencji.','{w} is hurt after the failed interference.']
});
Object.assign(D,{
'sr.doc':['Lekarz','Doctor'],'sr.phys':['Fizjoterapeuta','Physiotherapist'],
'stf.d.doc':['Lekarz co tydzień ma szansę wyleczyć kontuzję każdego Twojego zawodnika (na maksymalnym poziomie 10%). Kilku lekarzy sumuje szanse.','Each week the doctor has a chance to cure each of your injured wrestlers (10% at max level). Several doctors add up.'],
'stf.d.phys':['Fizjoterapeuta skraca czas nowych kontuzji (do -35% na maks. poziomie) oraz zmniejsza ryzyko trwałych skutków i nawrotu.','The physio shortens new injuries (up to -35% at max level) and lowers the risk of lasting damage and relapse.'],
'stf.fx.doc':['{n}% szansy na wyleczenie tygodniowo','{n}% weekly cure chance'],
'stf.fx.phys':['-{n}% czasu kontuzji','-{n}% injury time'],
'inj.bruise':['Stłuczenie','Bruising'],'inj.sprain':['Skręcenie kostki','Sprained ankle'],'inj.cut':['Rozcięcie łuku','Cut brow'],
'inj.ribs':['Pęknięte żebra','Cracked ribs'],'inj.knee':['Uraz kolana','Knee injury'],'inj.shoulder':['Uraz barku','Shoulder injury'],'inj.back':['Uraz pleców','Back injury'],'inj.concussion':['Wstrząs mózgu','Concussion'],
'inj.neck':['Uraz szyi','Neck injury'],'inj.acl':['Zerwane więzadła','Torn ligaments'],'inj.fracture':['Złamanie','Fracture'],'inj.trauma':['Uraz głowy','Head trauma'],
'r.rust':['Osłabiony po kontuzji','Rusty after injury'],
'n.injury':['{w} doznaje kontuzji: {i} ({n} tyg.).','{w} gets injured: {i} ({n} wks).'],
'n.injperm':['{w} nie wróci do pełni sił: {s} -{n} na stałe.','{w} will not fully recover: {s} -{n} for good.'],
'n.relapse':['Nawrót! {w} znów kontuzjowany: {i} ({n} tyg.).','Relapse! {w} is hurt again: {i} ({n} wks).'],
'n.rust':['{w} wraca po kontuzji, ale jest osłabiony przez 2 tygodnie.','{w} is back from injury but rusty for 2 weeks.'],
'n.docheal':['Lekarz wyleczył kontuzję: {w}.','The doctor cured {w}\'s injury.']
});
Object.assign(D,{
'nav.rank':['Rankingi','Rankings'],
'rk.title':['TOP 100 zawodników','TOP 100 wrestlers'],
'rk.sub':['Ranking wszystkich zawodników ze wszystkich federacji i wolnych agentów. Filtruj po federacji, dywizji i sortuj po statystykach. Strzałki pokazują zmianę względem poprzedniego tygodnia.','Ranking of every wrestler across all promotions and free agents. Filter by promotion and division, sort by stat. Arrows show the change since last week.'],
'rk.fed':['Federacja','Promotion'],'rk.all':['Wszyscy','All'],'rk.fa':['Wolni agenci','Free agents'],'rk.mine':['Twoja','yours'],'rk.div':['Dywizja','Division'],'rk.sort':['Sortuj wg','Sort by'],
'rk.ovr':['Ocena ogólna','Overall'],'rk.w':['Zawodnik','Wrestler'],'rk.cn':['Kraj','Country'],'rk.age':['Wiek','Age'],'rk.count':['Pokazano: {n}','Showing: {n}'],'rk.none':['Brak zawodników.','No wrestlers.']
});
Object.assign(D,{'mk.search':['Szukaj','Search'],'mk.ph':['Nazwisko…','Name…'],'mk.young':['Najmłodsi','Youngest'],'mk.cheap':['Najtańsi','Cheapest'],'mk.page':['Strona {p}/{n} · znaleziono {c}','Page {p}/{n} · found {c}'],'mk.found':['Znaleziono: {c}','Found: {c}']});
Object.assign(D,{
'sr.scout':['Łowca talentów','Talent scout'],
'stf.d.scout':['Łowca talentów szuka młodych zawodników w wybranym regionie. Im wyższy poziom, tym częściej znajduje talenty, lepsze potencjały i dokładniejsza ocena potencjału. Znalezieni zawodnicy czekają 10 tygodni, zanim zgarnie ich rywal.','A scout looks for young prospects in the chosen region. A higher level means more finds, better potential and a more accurate potential rating. Prospects wait 10 weeks before a rival grabs them.'],
'stf.fx.scout':['{n}% szansy na talent tygodniowo','{n}% weekly chance of a prospect'],
'reg.eu':['Europa','Europe'],'reg.am':['Ameryki','Americas'],'reg.as':['Azja, Oceania, Afryka','Asia, Oceania, Africa'],'reg.chg':['Zmień region','Change region'],
'pr.title':['Młode talenty','Young talents'],'pr.sub':['Odkryte przez Twoich łowców. Mają niskie statystyki, ale duży potencjał rozwoju i popularności. Ocena potencjału jest tym dokładniejsza, im lepszy łowca.','Found by your scouts. Low stats now, but high growth and popularity potential. The rating is more accurate with a better scout.'],
'pr.noscout':['Zatrudnij łowcę talentów w zakładce Kadra, aby odkrywać młode talenty.','Hire a talent scout in the Staff tab to discover young talents.'],
'pr.pot':['Potencjał','Potential'],'pr.found':['Znalazł: {s} · jeszcze {n} tyg.','Found by {s} · {n} wks left'],
'r.pot':['Potencjał','Potential'],
'n.scout':['Łowca {s} odkrył talent: {w} ({c}).','Scout {s} discovered a talent: {w} ({c}).'],
'n.prolost':['Talent {w} podpisał kontrakt z federacją {f}.','Talent {w} signed with {f}.'],
'n.mvsign':['{w} podpisuje kontrakt z {f}.','{w} signs with {f}.'],
'n.mvrel':['{f} rozstaje się z {w}.','{f} parts ways with {w}.'],
'n.mvtrans':['Transfer: {w} przechodzi z {a} do {b}.','Transfer: {w} moves from {a} to {b}.']
});
Object.assign(D,{
'ev.w.ok':['OK','OK'],
'ev.w.swap.t':['Propozycja wymiany','Trade offer'],'ev.w.swap.b':['{f} proponuje wymianę: oddajesz {a} (popularność {pa}), dostajesz {b} (popularność {pb}). Kontrakty zaczynają się od nowa.','{f} proposes a swap: you give {a} (pop. {pa}) and get {b} (pop. {pb}). Contracts start fresh.'],'ev.w.swap.1':['Zgódź się na wymianę','Accept the swap'],'ev.w.swap.2':['Odmów','Decline'],
'ev.w.starfa.t':['Gwiazda na rynku','A star on the market'],'ev.w.starfa.b':['{w} (popularność {p}) jest wolnym agentem i rozmawia z rywalami. Możesz podpisać ją teraz ze zniżką.','{w} (pop. {p}) is a free agent talking to rivals. You can sign now at a discount.'],'ev.w.starfa.1':['Podpisz za {m}','Sign for {m}'],'ev.w.starfa.2':['Odpuść','Pass'],
'ev.w.cross.t':['Wspólna gala','Joint show'],'ev.w.cross.b':['{f} proponuje wspólną promocję i występy gościnne. Koszt: {m}. Obie federacje zyskają prestiż, a Ty więcej.','{f} proposes a joint promotion with guest appearances. Cost: {m}. Both gain prestige, you more.'],'ev.w.cross.1':['Przyjmij ({m})','Accept ({m})'],'ev.w.cross.2':['Odmów','Decline'],
'ev.w.call.t':['Rywal wyzywa Twoją federację','A rival calls you out'],'ev.w.call.b':['Szef {f} publicznie lekceważy Twoją federację. Możesz odpowiedzieć kampanią ({m}), ryzykując wpadkę, albo zignorować.','The boss of {f} publicly mocks your promotion. You can answer with a campaign ({m}), risking a flop, or ignore it.'],'ev.w.call.1':['Odpowiedz ({m})','Answer ({m})'],'ev.w.call.2':['Zignoruj','Ignore'],
'ev.w.unhappy.t':['Niezadowolony zawodnik','An unhappy wrestler'],'ev.w.unhappy.b':['{w} jest sfrustrowany i rozgląda się za ofertami. Chce podwyżki o {m} tygodniowo.','{w} is frustrated and looking at offers. He wants a raise of {m} a week.'],'ev.w.unhappy.1':['Daj podwyżkę (+{m}/tydz.)','Give a raise (+{m}/wk)'],'ev.w.unhappy.2':['Odmów','Refuse'],
'ev.w.campus.t':['Obóz talentów','Talent camp'],'ev.w.campus.b':['{s} zaprasza na obóz młodych zawodników. Za {m} poznasz 3 nowe talenty, z premią do poziomu łowcy.','{s} invites you to a camp of young wrestlers. For {m} you meet 3 new talents, with a bonus to the scout level.'],'ev.w.campus.1':['Zorganizuj obóz ({m})','Run the camp ({m})'],'ev.w.campus.2':['Nie teraz','Not now'],
'ev.w.agent.t':['Menedżer naciska','A pushy manager'],'ev.w.agent.b':['Menedżer talentu {w} (potencjał {p}) żąda szybkiej decyzji. Zapłać {m} teraz albo oferta wygaśnie za 3 tygodnie.','The manager of {w} (potential {p}) wants a quick answer. Pay {m} now or the offer expires in 3 weeks.'],'ev.w.agent.1':['Podpisz od razu ({m})','Sign now ({m})'],'ev.w.agent.2':['Poczekaj','Wait'],
'ev.w.tip.by':['Znajomy trener','A coach friend'],'ev.w.tip.t':['Polecenie od znajomego','A friend\'s tip'],'ev.w.tip.b':['Znajomy trener poleca młodego zawodnika: {w} ({c}, {a} lat). Dodać do listy talentów?','A coach friend recommends a young wrestler: {w} ({c}, {a} y/o). Add to your talent list?'],'ev.w.tip.1':['Dodaj do talentów','Add to talents'],'ev.w.tip.2':['Odmów','Decline'],
'ev.w.break.t':['Przełomowy występ młodego','A young breakthrough'],'ev.w.break.b':['{w} zachwycił publiczność. Możesz to wykorzystać kampanią za {m}.','{w} wowed the crowd. You can capitalise with a campaign for {m}.'],'ev.w.break.1':['Pochwal go (za darmo)','Praise him (free)'],'ev.w.break.2':['Zainwestuj ({m})','Invest ({m})'],
'ev.w.buy.t':['Oferta za talent','An offer for a talent'],'ev.w.buy.b':['{f} oferuje {m} za młodego {w}.','{f} offers {m} for young {w}.'],'ev.w.buy.1':['Sprzedaj za {m}','Sell for {m}'],'ev.w.buy.2':['Odmów','Refuse'],
'ev.w.scraise.t':['Łowca żąda podwyżki','The scout wants a raise'],'ev.w.scraise.b':['{s} chce podwyżki o {m} tygodniowo, inaczej odejdzie.','{s} wants a raise of {m} a week or will leave.'],'ev.w.scraise.1':['Zgódź się (+{m}/tydz.)','Agree (+{m}/wk)'],'ev.w.scraise.2':['Pozwól odejść','Let go'],
'ev.w.poach.t':['Podkupienie zawodnika','Poaching a wrestler'],'ev.w.poach.b':['Składasz ofertę dla {w} z {f}. Opłata: {m}. Szansa powodzenia: {p}%. Przy odmowie nie zapłacisz, ale nie spróbujesz ponownie przez 8 tygodni.','You make an offer to {w} of {f}. Fee: {m}. Success chance: {p}%. If refused you pay nothing but cannot retry for 8 weeks.'],'ev.w.poach.1':['Złóż ofertę ({m})','Make the offer ({m})'],'ev.w.poach.2':['Anuluj','Cancel'],
'ev.w.poachok.t':['Udało się!','Success!'],'ev.w.poachok.b':['{w} przechodzi z {f} do Twojej federacji.','{w} leaves {f} and joins you.'],
'ev.w.poachno.t':['Odmowa','Refused'],'ev.w.poachno.b':['{w} odrzuca ofertę i zostaje w {f}.','{w} turns the offer down and stays at {f}.'],
'rk.poach':['Podkup {m} · {p}%','Poach {m} · {p}%'],'rk.act':['Akcja','Action'],
'n.swap':['Wymiana: {a} odchodzi do {f}, {b} dołącza do Ciebie.','Swap: {a} goes to {f}, {b} joins you.'],
'n.cross':['Wspólna gala z {f} podnosi prestiż.','A joint show with {f} lifts prestige.'],
'n.callok':['Twoja odpowiedź na zaczepki {f} podbija popularność.','Your reply to {f} boosts popularity.'],'n.callbad':['Odpowiedź na zaczepki {f} okazała się wpadką.','Your reply to {f} backfired.'],
'n.campus':['Obóz talentów: znaleziono {n} młodych zawodników.','Talent camp: {n} young wrestlers found.'],
'n.break':['{w} ma przełomowy występ.','{w} has a breakthrough performance.'],
'n.poachok':['{w} został podkupiony z {f}.','{w} was poached from {f}.'],'n.poachno':['{w} odrzucił ofertę i został w {f}.','{w} refused and stayed at {f}.']
});
Object.assign(D,{
'av.neck':['Szyja / pas','Neck / belt'],
'bld.stocky':['Krępa','Stocky'],'bld.bulk':['Potężna','Bulky'],
'hs.shaggy':['Rozczochrane','Shaggy'],'hs.undercut':['Undercut','Undercut'],'hs.topknot':['Kok samuraja','Top knot'],'hs.flattop':['Flat top','Flat top'],'hs.wavy':['Falowane','Wavy'],'hs.bangs':['Grzywka','Bangs'],'hs.cornrows':['Warkoczyki','Cornrows'],'hs.halfup':['Półupięte','Half-up'],
'bd.anchor':['Kotwica','Anchor'],'bd.circle':['Kółko','Circle'],'bd.bushy':['Gęsta','Bushy'],'bd.patchy':['Rzadka','Patchy'],
'of.tshirt':['T-shirt','T-shirt'],'of.hoodie':['Bluza','Hoodie'],'of.leather':['Skóra','Leather'],'of.coat':['Płaszcz','Coat'],'of.robe':['Szlafrok','Robe'],'of.tux':['Smoking','Tuxedo'],'of.leotard':['Trykot','Leotard'],'of.overalls':['Ogrodniczki','Overalls'],'of.kilt':['Kilt','Kilt'],'of.bodysuit':['Kombinezon','Bodysuit'],
'mk.cat':['Kot','Cat'],'mk.oni':['Oni','Oni'],'mk.stripe':['Lucha z pasem','Lucha stripe'],'mk.wings':['Skrzydła','Wings'],
'acc.beanie':['Czapka zimowa','Beanie'],'acc.fedora':['Kapelusz','Fedora'],'acc.visor':['Daszek','Visor'],'acc.tiara':['Tiara','Tiara'],'acc.flowers':['Wianek','Flower crown'],
'gear.gloves':['Rękawice','Gloves'],'gear.elbow':['Ochraniacze łokci','Elbow pads'],'gear.boots':['Buty do kolan','Tall boots'],
'face.lipstick':['Szminka','Lipstick'],'face.eyeliner':['Kredka','Eyeliner'],'face.warpaint':['Barwy wojenne','Warpaint'],'face.bandage':['Plaster','Bandage'],'face.tears':['Łzy','Tears'],
'nk.none':['Brak','None'],'nk.scarf':['Szalik','Scarf'],'nk.bowtie':['Muszka','Bow tie'],'nk.towel':['Ręcznik','Towel'],'nk.belt':['Pas na ramieniu','Belt on shoulder'],'nk.tie':['Krawat','Tie']
});
// ---- Curated rosters: names are parodies of real wrestlers (altered), looks stylised ----
// format: name|country|style|role(f/h/t)|g(f or empty)|look tokens
// tokens: a=age sk=skin h=hair hc=hair color b=beard bc=beard color of=outfit oc=color o2=2nd color bd=build ac=accessory gr=gear fc=face mk=mask mc=mask color nk=neck bt=boots
const CUR={
gwf:[
'Roman Rains|US|powerhouse|h||a:40 h:long hc:0 b:full bd:big of:vest oc:21 o2:6 gr:tattoo sk:9',
'Cody Rhoads|US|technician|f||a:40 h:side hc:3 b:stubble of:trunks oc:21 o2:14 gr:tattoo sk:0 nk:belt',
'Jon Sena|US|strong|f||a:49 h:buzz hc:7 of:shorts oc:1 o2:7 bd:big gr:wristbands ac:backcap sk:0',
'Seth Rawlins|US|highflyer|t||a:39 h:long hc:6 b:stubble of:pants oc:21 o2:0 sk:0 bt:laced',
'CN Punk|US|technician|t||a:47 h:short hc:0 b:full of:trunks oc:21 o2:5 gr:tattoo sk:0',
'Randy Ortin|US|strong|h||a:45 h:buzz hc:1 of:trunks oc:21 o2:6 bd:big gr:tattoo sk:0',
'Drew McIntire|GB|powerhouse|f||a:40 h:long hc:2 b:full bd:big of:kilt oc:1 o2:6 sk:6',
'Gunter|GB|powerhouse|h||a:38 h:bald b:heavy bd:big of:singlet oc:21 o2:14 sk:6',
'Rhea Ripple|AU|strong|h|f|a:29 h:long hc:0 fc:eyeliner of:singlet oc:21 o2:0 gr:tattoo sk:0',
'Bianca Bellair|US|strong|f|f|a:36 h:braids hc:0 of:singlet oc:9 o2:1 sk:4 gr:wristbands',
'Becca Lynch|GB|brawler|t|f|a:38 h:long hc:5 fc:freckles of:singlet oc:2 o2:6 sk:6 nk:belt',
'Charlotte Flare|US|technician|h|f|a:39 h:long hc:3 of:robe oc:5 o2:14 sk:5',
'Liv Morgen|US|highflyer|t|f|a:31 h:long hc:3 of:tights oc:21 o2:9 sk:5',
'Jay Usso|US|brawler|f||a:40 h:long hc:0 b:full bd:big of:vest oc:6 o2:5 gr:tattoo sk:9',
'Jimmy Uzo|US|brawler|f||a:40 h:long hc:0 b:heavy bd:big of:vest oc:6 o2:0 gr:tattoo sk:9',
'L.A. Night|US|strong|f||a:42 h:long hc:2 b:goatee ac:shades of:vest oc:21 o2:14 sk:0',
'Sammy Zane|CA|technician|t||a:41 h:long hc:0 b:full of:hoodie oc:21 o2:1 sk:1',
'Kevin Owenz|CA|brawler|h||a:42 h:short hc:2 b:full bd:big of:shorts oc:21 o2:6 sk:0',
'Damien Prince|US|strong|h||a:43 h:long hc:0 b:goatee of:leather oc:21 gr:tattoo sk:9',
'Finn Baylor|GB|highflyer|f||a:44 h:slick hc:0 b:stubble of:trunks oc:21 o2:12 sk:5',
'Dominic Misterio|US|lucha|h||a:29 h:short hc:0 b:soulpatch of:tank oc:21 o2:7 gr:tattoo sk:9',
'Ray Misterio|US|lucha|f||a:50 mk:full mc:1 of:pants oc:1 o2:5 sk:9 bd:lean',
'AJ Stiles|US|technician|t||a:48 h:short hc:1 b:full of:trunks oc:21 o2:1 sk:0',
'The Mizz|US|technician|h||a:45 h:slick hc:1 b:goatee of:suit oc:21 o2:14 sk:0',
'Bron Breaker|US|powerhouse|f||a:27 h:buzz hc:3 of:singlet oc:7 o2:6 bd:big sk:0',
'Jacob Fatoo|US|powerhouse|h||a:34 h:long hc:0 b:full bd:big of:trunks oc:21 fc:stripe gr:tattoo sk:3',
'Solo Sikowa|US|powerhouse|h||a:32 h:buzz b:full bd:big of:singlet oc:21 gr:tattoo sk:3',
'Shamus|GB|brawler|t||a:48 h:fauxhawk hc:5 b:full bd:big of:shorts oc:20 sk:6',
'Chad Gabel|US|technician|f||a:40 h:short hc:1 b:chinstrap of:singlet oc:1 bd:stocky sk:0',
'Bailey|US|technician|f|f|a:36 h:pony hc:3 of:singlet oc:2 o2:5 sk:0',
'Iyo Skye|JP|highflyer|h|f|a:34 h:long hc:0 of:tights oc:8 o2:5 sk:5',
'Tiffany Stratten|US|technician|h|f|a:27 h:long hc:3 of:singlet oc:9 o2:14 gr:wristbands sk:0',
'Jade Cargil|US|powerhouse|f|f|a:33 h:long hc:0 of:tank oc:21 o2:14 bd:big sk:3',
'Asuki|JP|technician|f|f|a:44 h:long hc:5 of:singlet oc:0 o2:5 sk:5'
],
apw:[
'Jon Moxlee|US|hardcore|t||a:40 h:shaggy hc:2 b:stubble of:vest oc:21 gr:tattoo sk:0 nk:belt',
'Kenji Omega|CA|highflyer|f||a:42 h:long hc:2 b:stubble of:pants oc:5 o2:14 sk:5',
'Swerve Stricklin|US|brawler|h||a:35 h:buzz b:goatee of:trunks oc:14 o2:21 gr:tattoo sk:3 nk:belt',
'Will Osprey|GB|highflyer|f||a:32 h:undercut hc:3 b:stubble of:trunks oc:5 o2:0 sk:6',
'MJ Friedlander|US|technician|h||a:30 h:slick hc:0 of:robe oc:14 o2:21 sk:0 nk:belt',
'Hangman Paige|US|strong|f||a:34 h:long hc:2 b:full ac:cowboy of:vest oc:21 o2:6 sk:0',
'Orange Cassady|US|technician|t||a:40 h:long hc:2 ac:shades of:jacket oc:7 o2:6 sk:0',
'Brian Danielsen|US|technician|f||a:44 h:long hc:2 b:long of:trunks oc:21 o2:5 sk:0',
'Darby Allen|US|hardcore|t||a:33 h:short hc:0 fc:stripe of:pants oc:21 o2:5 gr:tattoo sk:0 mk:paint mc:5',
'Chris Jerricho|CA|technician|h||a:55 h:long hc:6 of:jacket oc:14 o2:21 sk:0',
'Adam Coal|US|technician|h||a:37 h:side hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Kyle Fletch|AU|technician|h||a:28 h:buzz hc:3 b:stubble of:trunks oc:21 o2:7 sk:0',
'Mark Briskoe|US|brawler|f||a:40 h:short hc:0 b:goatee of:shorts oc:0 o2:5 sk:3',
'Samoa Jo|US|strong|h||a:46 h:buzz b:soulpatch bd:big of:trunks oc:21 o2:6 gr:tattoo sk:3',
'Toni Stormm|AU|technician|f|f|a:30 h:bob hc:6 of:singlet oc:14 o2:9 sk:0 nk:belt',
'Mercedes Mon|US|technician|f|f|a:34 h:long hc:0 of:singlet oc:9 o2:14 sk:9',
'Jaimie Hayder|GB|brawler|h|f|a:31 h:long hc:6 of:singlet oc:21 o2:1 sk:0',
'Willow Nightengale|US|powerhouse|f|f|a:31 h:long hc:5 bd:big of:singlet oc:9 o2:5 sk:0',
'Britt Bakar|US|technician|h|f|a:34 h:long hc:6 of:singlet oc:14 o2:0 sk:0',
'Thunder Rose|US|brawler|f|f|a:37 h:long hc:0 of:singlet oc:6 o2:11 sk:9',
'Kris Statlandar|US|powerhouse|f|f|a:28 h:long hc:6 of:singlet oc:21 o2:3 gr:wristbands sk:0',
'Jay Lethel|US|technician|f||a:40 h:buzz hc:0 of:trunks oc:21 o2:14 sk:3',
'Athina|US|brawler|f|f|a:36 h:long hc:0 of:singlet oc:21 o2:14 sk:9'
],
cwe:[
'Moos|CA|powerhouse|h||a:33 h:buzz b:goatee bd:big of:trunks oc:21 o2:7 sk:3',
'Joe Hendrie|GB|technician|f||a:36 h:short hc:0 b:stubble of:suit oc:1 o2:14 sk:0',
'Nic Nemith|CA|technician|h||a:42 h:slick hc:1 b:stubble of:trunks oc:21 o2:14 sk:0',
'Frankie Kazarin|US|technician|f||a:46 h:short hc:0 of:trunks oc:21 o2:1 sk:9',
'Mike Santanna|US|brawler|f||a:42 h:long hc:0 b:full of:vest oc:21 gr:tattoo sk:9',
'Eric Youngs|CA|brawler|t||a:45 h:long hc:1 b:full of:shorts oc:7 sk:0',
'Trick Wilhelm|US|technician|f||a:30 h:buzz of:trunks oc:21 o2:14 sk:4 nk:belt',
'Josh Alexandre|CA|technician|f||a:37 h:short hc:0 b:stubble of:trunks oc:3 o2:21 sk:5 bd:stocky',
'Steve McLin|US|brawler|h||a:37 h:long hc:1 b:full of:trunks oc:21 o2:7 sk:0',
'Ash Elegante|US|technician|h|f|a:32 h:long hc:6 of:robe oc:21 o2:5 sk:0',
'Jordynne Grayce|US|powerhouse|f|f|a:30 h:long hc:0 of:singlet oc:3 o2:21 bd:big sk:3',
'Masha Slamovitch|US|hardcore|t|f|a:32 h:long hc:0 of:singlet oc:21 o2:0 gr:tattoo sk:0',
'Elijah Rey|US|brawler|t||a:41 h:long hc:2 b:full of:trunks oc:21 sk:0',
'Matt Cardonna|US|technician|h||a:38 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:0'
],
nnp:[
'Hiroshi Tanahasi|JP|technician|f||a:49 h:long hc:0 of:trunks oc:21 o2:14 sk:5 nk:belt',
'Kazuchika Okata|JP|technician|f||a:38 h:slick hc:3 of:trunks oc:21 o2:0 sk:5',
'Tetsuya Naido|JP|technician|t||a:43 h:long hc:0 of:suit oc:21 o2:5 sk:5',
'SANDA|JP|technician|h||a:37 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:5',
'Shingo Takaki|JP|strong|t||a:43 h:slick hc:0 b:stubble of:trunks oc:3 o2:6 bd:big sk:5',
'Hirooki Gotoh|JP|strong|f||a:46 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Yoshi-Hasi|JP|technician|h||a:42 h:short hc:0 of:trunks oc:21 o2:3 sk:5',
'Zach Saber Jr|GB|technician|h||a:38 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:6',
'Kota Ibusi|JP|highflyer|f||a:43 h:long hc:0 of:trunks oc:3 o2:21 sk:5',
'Tomohiro Ishi|JP|brawler|t||a:50 h:buzz of:trunks oc:21 o2:5 bd:stocky sk:5',
'Hiromu Takahasi|JP|highflyer|f||a:35 h:long hc:0 of:trunks oc:3 o2:21 mk:half mc:3 sk:5',
'El Desparado|JP|highflyer|h||a:40 mk:full mc:6 of:trunks oc:21 o2:3 sk:5 bd:lean',
'Yuji Nagada|JP|strong|f||a:57 h:buzz of:trunks oc:21 o2:5 bd:big sk:5',
'Jeff Kobb|US|powerhouse|h||a:44 h:short hc:0 of:trunks oc:21 o2:14 bd:big sk:3',
'Great-O-Kan|JP|powerhouse|h||a:42 h:topknot hc:0 of:vest oc:6 o2:0 bd:big mk:paint mc:0 sk:5',
'Taiji Ishimore|JP|highflyer|h||a:41 h:spiky hc:0 of:trunks oc:21 o2:7 sk:5',
'Shota Umeno|JP|technician|f||a:30 h:short hc:0 of:trunks oc:21 o2:5 sk:5'
],
cul:[
'Místiko|MX|lucha|f||a:43 mk:full mc:1 of:trunks oc:1 o2:5 sk:9 bd:lean',
'Atlantys|MX|lucha|f||a:41 mk:full mc:0 of:trunks oc:2 o2:5 sk:9',
'Voladora Jr|MX|lucha|f||a:39 mk:full mc:1 of:trunks oc:21 o2:3 sk:9 bd:lean',
'Último Guerrera|MX|lucha|h||a:42 mk:full mc:6 of:trunks oc:21 o2:0 sk:9 bd:stocky',
'Blue Pantera|MX|lucha|f||a:60 mk:full mc:1 of:pants oc:1 o2:5 sk:9',
'Negro Cazas|MX|lucha|h||a:62 mk:none h:buzz b:full of:trunks oc:21 o2:5 sk:9',
'Dragón Rojo Jr|MX|lucha|h||a:41 mk:full mc:0 of:trunks oc:0 o2:21 sk:9',
'Soberano Jr|MX|lucha|f||a:31 mk:full mc:14 of:trunks oc:14 o2:21 sk:9 bd:lean',
'Hechizero|MX|lucha|h||a:38 mk:full mc:6 of:trunks oc:4 o2:21 sk:9',
'Templaro|MX|lucha|h||a:35 mk:full mc:21 of:trunks oc:21 o2:15 sk:9 bd:stocky',
'Stuca Jr|MX|lucha|f||a:39 mk:full mc:0 of:trunks oc:0 o2:5 sk:9',
'Diamante Azur|MX|lucha|f||a:40 mk:full mc:11 of:trunks oc:11 o2:5 sk:9',
'Mefisto|MX|lucha|h||a:36 mk:full mc:21 of:trunks oc:21 o2:0 sk:9',
'Marsela|MX|lucha|f|f|a:30 mk:half mc:0 h:long hc:0 of:singlet oc:0 o2:5 sk:9'
],
lfl:[
'Andrada el Ídolo|MX|highflyer|h||a:35 h:long hc:0 b:goatee of:trunks oc:21 o2:14 gr:tattoo sk:9',
'El Hijo del Víking|MX|highflyer|f||a:30 mk:full mc:14 of:trunks oc:14 o2:21 sk:9 bd:lean',
'Psico Clown|MX|brawler|f||a:40 mk:paint mc:0 h:mohawk hc:5 of:vest oc:0 o2:6 bd:big sk:9',
'Dr. Wagner Hijo|MX|lucha|f||a:40 mk:full mc:1 of:trunks oc:1 o2:5 sk:9',
'Laredo Kidd|MX|highflyer|f||a:38 mk:full mc:1 of:trunks oc:1 o2:14 sk:9 bd:lean',
'Pagan|MX|brawler|h||a:50 mk:full mc:6 of:trunks oc:21 o2:0 bd:big sk:9',
'La Parca|MX|lucha|h||a:48 mk:skull of:trunks oc:21 o2:5 sk:9 bd:lean',
'Octágono|MX|lucha|f||a:50 mk:full mc:3 of:trunks oc:3 o2:21 sk:9',
'Sexy Estrella|MX|lucha|t|f|a:33 mk:half mc:9 h:long hc:0 of:singlet oc:9 o2:5 sk:9',
'Bandido Kid|MX|highflyer|f||a:30 mk:full mc:3 of:trunks oc:3 o2:6 sk:9 bd:lean'
],
roh:[
'Bandit Jr|MX|highflyer|f||a:30 mk:full mc:7 of:trunks oc:7 o2:6 sk:9',
'Lee Moriarti|US|technician|f||a:30 h:long hc:0 of:trunks oc:21 o2:5 sk:0',
'Ethan Paige|CA|technician|t||a:37 h:short hc:3 b:stubble of:trunks oc:21 o2:0 sk:0',
'Mina Shirakawa|JP|highflyer|f|f|a:28 h:long hc:0 of:singlet oc:9 o2:5 sk:5',
'Billie Starkz|US|highflyer|f|f|a:21 h:long hc:0 of:singlet oc:4 o2:9 sk:0',
'Komandor|MX|highflyer|f||a:23 mk:full mc:3 of:trunks oc:3 o2:21 sk:9 bd:lean',
'Shane Tailor|GB|strong|h||a:36 h:buzz b:stubble of:trunks oc:21 o2:14 bd:big sk:3',
'Serena Dibe|US|technician|h|f|a:38 h:long hc:6 of:singlet oc:21 o2:14 sk:0',
'Rush Jr|MX|brawler|h||a:35 h:short hc:0 b:full of:trunks oc:21 o2:0 sk:9',
'Tony Nesse|US|highflyer|f||a:36 h:long hc:3 of:trunks oc:3 o2:21 sk:0'
],
rsp:[
'Kenoh Miyahara|JP|strong|f||a:35 h:long hc:0 of:trunks oc:21 o2:5 sk:5',
'Suwama Jr|JP|powerhouse|h||a:46 h:buzz of:trunks oc:21 o2:0 bd:big sk:5',
'Yuma Aoyagi|JP|technician|f||a:29 h:short hc:0 of:trunks oc:1 o2:21 sk:5',
'Jun Akiyama|JP|technician|h||a:55 h:short hc:4 of:trunks oc:21 o2:5 sk:5',
'Shuji Ishikawa|JP|powerhouse|h||a:51 h:buzz b:full bd:big of:trunks oc:21 o2:0 sk:5',
'Atsushi Aoki|JP|highflyer|f||a:36 h:short hc:0 of:trunks oc:1 sk:5',
'Dan Tamura|JP|strong|t||a:44 h:buzz of:trunks oc:21 o2:3 sk:5',
'Rei Saito|JP|strong|h||a:40 h:buzz of:trunks oc:21 bd:big sk:5'
],
ark:[
'Kenou|JP|strong|f||a:41 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Naomichi Marufuzi|JP|highflyer|f||a:46 h:short hc:0 of:trunks oc:1 o2:5 sk:5',
'Katsuhiko Nakajima|JP|brawler|h||a:37 h:buzz of:trunks oc:21 o2:3 sk:5',
'Takashi Sugiyura|JP|technician|t||a:49 h:buzz b:stubble of:trunks oc:21 sk:5',
'Kaito Kiyomiyo|JP|strong|f||a:29 h:short hc:0 of:trunks oc:1 o2:5 sk:5',
'Go Shiosaki|JP|technician|f||a:42 h:short hc:0 of:trunks oc:0 o2:5 sk:5',
'Jake Leigh|AU|powerhouse|h||a:36 h:buzz b:full bd:big of:trunks oc:21 o2:7 sk:0',
'Eita Hayata|JP|highflyer|h||a:35 h:short hc:0 of:trunks oc:21 o2:3 sk:5',
'Masa Kitamiya|JP|powerhouse|h||a:40 h:buzz bd:big of:trunks oc:21 sk:5'
],
str:[
'Shuri|JP|technician|h|f|a:34 h:long hc:0 of:singlet oc:0 o2:21 sk:5',
'Mayu Iwatami|JP|technician|f|f|a:32 h:pony hc:0 of:singlet oc:0 o2:5 sk:5',
'Tam Nakamo|JP|technician|f|f|a:29 h:long hc:9 of:singlet oc:9 o2:6 sk:5',
'Saya Kamitane|JP|highflyer|f|f|a:28 h:long hc:0 of:singlet oc:4 o2:5 sk:5',
'Utami Hayashisita|JP|powerhouse|f|f|a:31 h:long hc:0 of:singlet oc:7 o2:6 sk:5',
'Momo Watanabi|JP|technician|h|f|a:30 h:long hc:0 of:singlet oc:21 o2:9 sk:5',
'Julia Star|JP|technician|h|f|a:31 h:long hc:0 of:singlet oc:21 o2:14 sk:5',
'Starlight Kidd|JP|highflyer|f|f|a:28 h:pony hc:3 of:singlet oc:1 o2:5 sk:5',
'Suzu Suzuka|JP|brawler|t|f|a:25 h:short hc:2 of:singlet oc:7 o2:6 sk:5',
'Hazuki Mori|JP|technician|f|f|a:30 h:bob hc:0 of:singlet oc:5 o2:9 sk:5',
'Maika Ozaki|JP|technician|h|f|a:27 h:long hc:6 of:singlet oc:21 o2:9 sk:5',
'Natsumi Kuro|JP|brawler|h|f|a:26 h:pigtails hc:9 of:singlet oc:21 o2:9 sk:5'
],
rvp:[
'Michael Okoye|GB|technician|f||a:36 h:short hc:0 of:trunks oc:21 o2:0 sk:3',
'Ricky Knight Jr|GB|brawler|h||a:32 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Luke Jakobs|GB|technician|f||a:35 h:short hc:3 b:stubble of:trunks oc:1 sk:0',
'Ethan Allyn|GB|technician|f||a:38 h:buzz of:trunks oc:21 o2:14 sk:0',
'Kenny Williamss|GB|technician|t||a:33 h:short hc:0 of:trunks oc:3 o2:21 sk:4',
'Jonathan Gresham II|US|technician|t||a:37 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:4',
'Safa Mahone|GB|highflyer|f||a:31 h:spiky hc:0 of:trunks oc:2 sk:2',
'Gideon Greyy|GB|strong|h||a:36 h:buzz b:full of:trunks oc:21 bd:big sk:0'
],
wxx:[
'Alex Wolff|DE|powerhouse|h||a:35 h:short hc:0 b:full bd:big of:trunks oc:21 o2:0 sk:0',
'Francesco Aker|IT|technician|f||a:36 h:long hc:0 b:stubble of:trunks oc:21 sk:9',
'Axel Dieter|DE|technician|t||a:33 h:undercut hc:3 of:trunks oc:21 o2:14 sk:0',
'Robert Dreissker|DE|powerhouse|h||a:36 h:bald b:full bd:big of:trunks oc:21 sk:0',
'Bobby Gunns|DE|strong|h||a:33 h:short hc:0 b:stubble of:trunks oc:21 sk:0',
'Jay Skillet|GB|technician|f||a:28 h:long hc:0 of:trunks oc:1 sk:0',
'Laurance Roman|DE|brawler|f||a:35 h:short hc:2 of:trunks oc:21 sk:0',
'Veit Mueller|DE|brawler|t||a:32 h:long hc:2 b:full of:trunks oc:21 sk:0'
],
gcw:[
'Nick Gagge|US|hardcore|h||a:37 h:short hc:2 b:full of:trunks oc:21 gr:tattoo sk:0',
'Matt Colt|US|hardcore|t||a:34 h:short hc:0 b:stubble of:trunks oc:21 gr:tattoo sk:0',
'Joey Jenga|US|hardcore|t||a:33 h:crop hc:3 of:trunks oc:21 sk:0',
'Jordan Opel|US|hardcore|h||a:31 h:short hc:0 of:vest oc:21 sk:0',
'Effy Bro|US|hardcore|h||a:29 h:short hc:0 of:shorts oc:6 gr:wristbands sk:0',
'Blake Christiano|US|highflyer|f||a:28 h:short hc:2 of:trunks oc:1 sk:0',
'Alex Colon|US|hardcore|h||a:30 h:short hc:0 of:vest oc:6 sk:9',
'Masha Slamo|US|hardcore|t|f|a:30 h:long hc:0 of:singlet oc:21 gr:tattoo sk:0'
],
nwc:[
'Tyrus Jr|US|powerhouse|h||a:42 h:buzz b:heavy bd:big of:trunks oc:21 sk:0',
'Trevor Murdok|US|technician|h||a:38 h:short hc:0 of:trunks oc:21 sk:0',
'Kamille Brown|US|powerhouse|h|f|a:31 h:long hc:0 of:singlet oc:21 bd:big sk:3',
'Mike Knoxx|US|strong|f||a:40 h:short hc:1 b:full of:trunks oc:1 sk:0',
'Thom Latimar|US|technician|h||a:42 h:short hc:2 of:suit oc:21 sk:0',
'Matt Tarrant|US|technician|f||a:30 h:short hc:0 of:trunks oc:21 sk:0'
],
mlw:[
'Alexander Hammerston|GB|powerhouse|h||a:38 h:short hc:0 b:full bd:big of:trunks oc:21 sk:0',
'Matt Cardona Jr|US|technician|h||a:30 h:short hc:0 of:trunks oc:21 sk:0',
'Satoshi Kojimba|JP|strong|f||a:45 h:buzz of:trunks oc:21 bd:big sk:5',
'Bobby Fishe|US|technician|h||a:42 h:slick hc:0 of:suit oc:21 sk:0',
'Jacob Fatu Jr|US|powerhouse|h||a:30 h:long hc:0 b:full bd:big of:trunks oc:21 sk:3',
'Ron Hoskins|US|brawler|t||a:35 h:short hc:2 b:stubble of:trunks oc:21 sk:0'
],
dtt:[
'Kosuke Takeshima|JP|technician|f||a:30 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Chris Brooks|GB|technician|f||a:36 h:long hc:0 b:stubble of:trunks oc:21 sk:0',
'Mao Hirata|JP|highflyer|f||a:28 h:short hc:0 of:trunks oc:3 sk:5',
'Yuki Uena|JP|highflyer|f||a:28 h:short hc:0 of:trunks oc:1 sk:5',
'Kazusada Higuchi|JP|strong|h||a:32 h:short hc:0 of:trunks oc:21 sk:5',
'Danshoku Dieno|JP|brawler|t||a:40 h:long hc:0 b:mustache of:trunks oc:9 sk:5',
'Shunma Katsumada|JP|technician|f||a:27 h:short hc:0 of:trunks oc:3 sk:5'
],
drg:[
'Masaaki Mochizuku|JP|technician|f||a:46 h:short hc:0 of:trunks oc:21 sk:5',
'Ben-Kay|JP|highflyer|f||a:31 h:short hc:0 of:trunks oc:3 sk:5',
'Shun Skywalkar|JP|highflyer|f||a:27 h:short hc:0 of:trunks oc:2 sk:5',
'Yamado|JP|technician|h||a:42 h:short hc:0 of:trunks oc:21 sk:5',
'Susumu Yokosuka Jr|JP|technician|f||a:45 h:buzz of:trunks oc:1 sk:5',
'Naruki Doi Jr|JP|brawler|h||a:41 h:short hc:0 of:trunks oc:21 sk:5',
'Kzi|JP|technician|h||a:35 h:short hc:0 of:trunks oc:21 sk:5'
],
bnp:[
'Daisuke Sekimata|JP|hardcore|f||a:42 h:buzz b:full bd:big of:trunks oc:21 sk:5',
'Yuko Miyamata|JP|hardcore|h||a:43 h:short hc:0 b:stubble of:trunks oc:21 sk:5',
'Abdullah Kobayasi|JP|hardcore|h||a:50 h:bald b:heavy bd:big of:trunks oc:0 fc:scar sk:5',
'Ryuji Itoh|JP|hardcore|f||a:44 h:short hc:0 of:trunks oc:21 sk:5',
'Kohei Satoh|JP|powerhouse|h||a:40 h:buzz of:trunks oc:21 bd:big sk:5'
],
icw:[
'Joe Hendry Jr|GB|technician|f||a:30 h:short hc:0 of:suit oc:1 sk:0',
'Wolfgang Wolf|GB|powerhouse|h||a:38 h:long hc:1 b:full bd:big of:trunks oc:21 sk:0',
'Mark Coffee|GB|brawler|f||a:34 h:short hc:1 b:full of:trunks oc:21 sk:0',
'Lewis Gunn|GB|technician|t||a:30 h:short hc:2 of:kilt oc:1 sk:0',
'Kay Lee Roy|GB|brawler|f|f|a:28 h:long hc:5 of:singlet oc:21 sk:0'
],
mys:[
'Alex Silvestre|CA|technician|f||a:30 h:short hc:0 of:trunks oc:21 sk:0',
'Mathieu Pelletier|CA|technician|h||a:33 h:short hc:2 b:stubble of:trunks oc:1 sk:0',
'Samuel Roy|CA|highflyer|f||a:28 h:short hc:0 of:trunks oc:0 sk:0',
'Marie-Pier|CA|technician|f|f|a:29 h:long hc:2 of:singlet oc:0 sk:0',
'Phil Tremblay|CA|brawler|h||a:35 h:short hc:2 b:full of:trunks oc:21 sk:0'
]
};
Object.assign(CUR,{
pgr:['Will Ospreay Jr|GB|highflyer|f||a:30 h:short hc:3 of:trunks oc:21 o2:5 sk:6','Zack Gibbson|GB|technician|f||a:31 h:short hc:2 b:stubble of:trunks oc:21 sk:0','Trent Beretta|US|technician|h||a:38 h:short hc:0 b:stubble of:trunks oc:1 sk:0','Mark Haskins|GB|brawler|h||a:37 h:long hc:2 b:full of:trunks oc:21 sk:0','Cara Noir|GB|technician|t||a:37 h:long hc:0 b:stubble of:trunks oc:21 mk:domino mc:21 sk:0','Session Moth|GB|highflyer|f||a:35 h:short hc:0 of:trunks oc:0 sk:0','Chuck Mambo|GB|brawler|f||a:38 h:slick hc:0 b:stubble of:suit oc:21 sk:0','Rhio Mizuki|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:9 sk:5'],
nlw:['Kenny Omegaz|CA|highflyer|f||a:40 h:long hc:2 of:pants oc:5 sk:5','Mathieu Roy|CA|technician|f||a:33 h:short hc:2 of:trunks oc:1 sk:0','Elijah Truong|CA|brawler|h||a:34 h:short hc:0 b:stubble of:trunks oc:21 sk:0','Alex Silva|CA|technician|f||a:28 h:buzz of:trunks oc:0 sk:0','Bear Bronson|CA|powerhouse|h||a:36 h:long hc:1 b:full bd:bulk of:vest oc:21 sk:0','Tessa Blanchett|CA|technician|f|f|a:30 h:long hc:6 of:singlet oc:21 sk:0'],
spw:['Rafael Brasil|BR|highflyer|f||a:30 h:curly hc:0 of:trunks oc:2 o2:3 sk:3','Thiago Machado|BR|strong|h||a:35 h:buzz b:full bd:big of:trunks oc:21 sk:2','Lucas Cabral|BR|technician|f||a:29 h:short hc:0 of:trunks oc:2 sk:1','Valentina Costa|BR|technician|f|f|a:28 h:long hc:0 of:singlet oc:3 o2:2 sk:2','Matheus Rocha|BR|brawler|t||a:33 h:short hc:0 b:stubble of:trunks oc:21 sk:3'],
bra:['Will Zayn|GB|technician|f||a:33 h:short hc:2 of:trunks oc:21 sk:0','Pete Dunn Jr|GB|technician|h||a:31 h:short hc:2 b:stubble of:trunks oc:21 o2:5 sk:0','Tyler Basset|GB|technician|f||a:34 h:short hc:2 of:trunks oc:21 sk:0','Trent Seven|GB|brawler|f||a:40 h:long hc:2 b:full bd:big of:trunks oc:21 sk:0','Tyler Bate|GB|strong|f||a:28 h:short hc:2 bd:stocky of:trunks oc:1 sk:0'],

eve:['Jimmy Havok|GB|brawler|h||a:38 h:short hc:2 b:stubble of:trunks oc:21 sk:0','Kyle Fletcher|AU|strong|f||a:28 h:buzz of:trunks oc:0 sk:0','Liam Slamdunn|GB|powerhouse|h||a:30 h:short hc:3 b:full bd:big of:trunks oc:21 sk:0','Nina Sampson|GB|technician|f|f|a:30 h:long hc:6 of:singlet oc:2 sk:0'],
hwu:['Karsten Beck|DE|technician|f||a:36 h:short hc:3 b:stubble of:trunks oc:1 sk:0','Marcel Barthell|DE|technician|h||a:40 h:slick hc:3 of:suit oc:21 sk:0','Walter Wiener|DE|powerhouse|h||a:42 h:bald b:full bd:big of:singlet oc:0 sk:0','Ilja Dragunowa|DE|brawler|h||a:35 h:buzz b:heavy of:trunks oc:21 sk:0','Lena Fischer|DE|technician|f|f|a:29 h:pony hc:3 of:singlet oc:21 sk:0'],
bwf:['Axel Dieter Jr|DE|technician|f||a:30 h:undercut hc:3 of:trunks oc:1 sk:0','Big Rüdiger|DE|powerhouse|h||a:38 h:buzz b:full bd:bulk of:vest oc:21 sk:0','Jan Fuchs|DE|highflyer|f||a:27 h:short hc:2 of:trunks oc:0 sk:0','Anni Berg|DE|brawler|f|f|a:30 h:long hc:2 of:singlet oc:21 sk:0'],
cwa:['Karl Gotsch|DE|technician|f||a:45 h:buzz hc:4 b:mustache of:singlet oc:0 sk:0','Hans Hackenschmidt|DE|powerhouse|f||a:34 h:short hc:2 b:handlebar of:singlet oc:21 sk:0','Rolf Catcher|DE|technician|h||a:40 h:slick hc:3 b:stubble of:singlet oc:1 sk:0','Eva Stahl|DE|technician|f|f|a:28 h:bob hc:3 of:singlet oc:0 sk:0'],
atl:['Titán Jr|MX|lucha|f||a:34 mk:full mc:3 of:trunks oc:3 o2:21 sk:9','Dr. Karonte|MX|lucha|h||a:40 mk:full mc:21 of:trunks oc:21 o2:0 sk:9','Volcán Azteca|MX|brawler|h||a:37 h:short hc:0 b:full of:trunks oc:0 gr:tattoo sk:9','Estrella Rosa|MX|lucha|f|f|a:28 mk:half mc:9 h:long hc:0 of:singlet oc:9 sk:9'],
sxw:['Mark Weston|AU|strong|f||a:33 h:short hc:3 b:stubble of:shorts oc:3 o2:2 sk:0','Kyle Brisbane|AU|technician|h||a:30 h:short hc:2 of:trunks oc:2 sk:0','Charlie Aussie|AU|brawler|f||a:35 h:buzz b:full of:shorts oc:2 o2:3 sk:6','Bondi Barbie|AU|technician|t|f|a:27 h:long hc:3 of:singlet oc:3 sk:0'],
def:['Mike Elgin Jr|US|brawler|f||a:35 h:short hc:2 b:full of:trunks oc:21 sk:0','Eddie Kingston Jr|US|brawler|f||a:42 h:short hc:0 b:full bd:stocky of:trunks oc:21 sk:0','Joey Jewel|US|technician|h||a:35 h:short hc:0 of:trunks oc:21 sk:0','Mercedes Marten|US|technician|f|f|a:30 h:long hc:0 of:singlet oc:21 sk:9'],
orw:['Dusty Hickory|US|brawler|f||a:40 h:short hc:2 b:full ac:cowboy of:vest oc:21 sk:0','Big Tom Carter|US|powerhouse|h||a:34 h:buzz b:heavy bd:bulk of:singlet oc:0 sk:0','Rusty Ames|US|technician|f||a:30 h:short hc:5 of:trunks oc:1 fc:freckles sk:0','Lacey Dawn|US|technician|f|f|a:28 h:pony hc:3 of:singlet oc:0 sk:0'],
llf:['Mathias Lefèvre|FR|technician|f||a:34 h:short hc:1 b:stubble of:trunks oc:1 o2:0 sk:0','Bastien Lunel|FR|highflyer|f||a:29 h:short hc:2 of:trunks oc:1 sk:0','Dr. Fantôme|FR|brawler|h||a:38 mk:skull of:trunks oc:21 sk:0','Colette Morel|FR|technician|f|f|a:30 h:long hc:2 of:singlet oc:1 sk:0'],
lib:['El Matador Ibérico|ES|technician|f||a:34 h:slick hc:0 b:goatee of:trunks oc:0 o2:3 sk:1','Toro Sevilla|ES|powerhouse|h||a:38 h:short hc:0 b:full bd:big of:trunks oc:0 sk:1','Pablo Aguila|ES|highflyer|f||a:28 h:short hc:0 of:trunks oc:0 sk:1','Carmen Duende|ES|technician|h|f|a:30 h:long hc:0 of:singlet oc:0 sk:1'],
rwc:['Gladiatore Romano|IT|strong|f||a:35 h:short hc:0 b:stubble bd:big of:armor oc:0 o2:14 sk:1','Marco Duca|IT|technician|f||a:30 h:short hc:0 of:trunks oc:1 sk:1','Il Barone|IT|technician|h||a:42 h:slick hc:4 of:suit oc:21 sk:1','Giulia Fiamma|IT|technician|f|f|a:28 h:long hc:0 of:singlet oc:0 sk:1'],
llp:['Chidi Thunder|NG|powerhouse|f||a:32 h:buzz bd:big of:trunks oc:2 o2:5 sk:4','Emeka Falcon|NG|highflyer|f||a:27 h:short hc:0 of:trunks oc:2 sk:4','Obi Kingsley|NG|technician|h||a:34 h:short hc:0 b:goatee of:trunks oc:21 sk:8','Ngozi Queen|NG|technician|f|f|a:29 h:braids hc:0 of:singlet oc:2 sk:4'],
psw:['Marek Ocel|CZ|powerhouse|f||a:36 h:buzz b:full bd:big of:trunks oc:0 sk:0','Tomáš Praga|CZ|technician|f||a:30 h:short hc:2 of:trunks oc:1 sk:0','Jakub Kovář|CZ|brawler|h||a:33 h:short hc:2 b:stubble of:trunks oc:21 sk:0','Lucie Moravcová|CZ|technician|f|f|a:28 h:long hc:2 of:singlet oc:0 sk:0'],
ptw:['Adrian Kruk|PL|technician|f||a:30 h:short hc:0 b:stubble of:trunks oc:0 o2:5 sk:0','Marcin Orzeł|PL|strong|f||a:33 h:buzz b:full bd:big of:trunks oc:0 sk:0','Kacper Żbik|PL|highflyer|f||a:26 h:short hc:2 of:trunks oc:5 o2:0 sk:0','Dominik Wilk|PL|brawler|h||a:35 h:short hc:0 b:full of:trunks oc:21 gr:tattoo sk:0','Patryk Cień|PL|technician|h||a:31 h:slick hc:0 b:goatee of:suit oc:21 sk:0','Oliwia Burza|PL|technician|f|f|a:27 h:long hc:2 of:singlet oc:0 sk:0','Natalia Lis|PL|brawler|h|f|a:29 h:bob hc:0 of:singlet oc:21 sk:0'],
plz:['Krzysztof Bizon|PL|powerhouse|f||a:38 h:buzz b:full bd:bulk of:trunks oc:0 sk:0','Michał Sokół|PL|highflyer|f||a:25 h:short hc:2 of:trunks oc:5 sk:0','Bartek Wąż|PL|technician|h||a:32 h:slick hc:0 of:pants oc:21 sk:0','Jędrek Młot|PL|brawler|t||a:36 h:short hc:2 b:stubble of:trunks oc:1 sk:0','Karolina Zima|PL|technician|f|f|a:27 h:long hc:3 of:singlet oc:5 sk:0'],
ppw:['Szymon Fenomen|PL|technician|f||a:29 h:short hc:2 of:trunks oc:3 o2:21 sk:0','Rafał Gruby|PL|powerhouse|h||a:40 h:bald b:full bd:bulk of:singlet oc:21 sk:0','Tomek Fala|PL|highflyer|f||a:24 h:spiky hc:0 of:trunks oc:1 sk:0','Wojtek Kat|PL|hardcore|h||a:34 mk:skull of:trunks oc:21 gr:tattoo sk:0','Marta Szalona|PL|brawler|t|f|a:28 h:pony hc:5 of:singlet oc:0 sk:0'],
mzw:['Dawid Mania|PL|hardcore|t||a:31 h:short hc:0 b:stubble of:vest oc:21 gr:tattoo sk:0','Paweł Chaos|PL|brawler|h||a:35 h:buzz b:full of:trunks oc:0 sk:0','Kuba Rekin|PL|highflyer|f||a:25 h:short hc:2 of:trunks oc:2 sk:0','Ewa Wrzask|PL|brawler|h|f|a:27 h:long hc:0 of:singlet oc:21 sk:0'],
mcw:['Śląski Hajer|PL|powerhouse|f||a:37 h:buzz b:full bd:big of:trunks oc:21 o2:3 sk:0 ac:cap','Górnik Janek|PL|brawler|f||a:34 h:short hc:2 b:stubble of:trunks oc:3 o2:21 sk:0','Lampa|PL|technician|h||a:30 h:short hc:0 of:trunks oc:21 sk:0','Ola Kopalnia|PL|technician|f|f|a:26 h:long hc:2 of:singlet oc:3 sk:0'],
kpw:['Kaszub Wojownik|PL|strong|f||a:33 h:short hc:3 b:full of:trunks oc:1 o2:5 sk:0','Rybak Zenek|PL|brawler|h||a:41 h:buzz b:full bd:stocky of:trunks oc:1 sk:0','Gryf Jr|PL|highflyer|f||a:24 h:short hc:3 of:trunks oc:1 sk:0','Basia Fala|PL|technician|f|f|a:27 h:long hc:3 of:singlet oc:1 sk:0'],
low:['Legenda Leszek|PL|technician|f||a:45 h:short hc:4 b:mustache of:trunks oc:0 sk:0','Młody Wilk|PL|highflyer|f||a:22 h:short hc:2 of:trunks oc:0 sk:0','Cichy Zbyszek|PL|brawler|h||a:38 h:bald b:full of:trunks oc:21 sk:0','Agata Lwica|PL|technician|f|f|a:27 h:long hc:2 of:singlet oc:0 sk:0'],
nst:['Geordie Kidd|GB|brawler|f||a:31 h:short hc:2 of:trunks oc:21 o2:5 sk:0','Yorkshire Tank|GB|powerhouse|h||a:36 h:buzz b:full bd:bulk of:singlet oc:5 sk:0','Pit Lad Parker|GB|technician|f||a:29 h:short hc:3 of:trunks oc:21 o2:0 sk:0','Steph Ferrous|GB|brawler|f|f|a:28 h:bob hc:6 of:singlet oc:21 sk:0'],
rpc:['Ruhrpott Rocky|DE|brawler|f||a:35 h:buzz b:full of:trunks oc:21 o2:3 sk:0','Kohle Kalle|DE|powerhouse|h||a:40 h:bald b:full bd:bulk of:singlet oc:21 sk:0','Schalke Sven|DE|technician|f||a:28 h:short hc:2 of:trunks oc:1 sk:0','Pott Petra|DE|technician|f|f|a:29 h:long hc:2 of:singlet oc:1 sk:0'],
tfc:['El Tijuanero|MX|brawler|f||a:35 h:short hc:0 b:full of:trunks oc:2 o2:0 sk:9','Frontera Kid|MX|highflyer|f||a:24 mk:full mc:2 of:trunks oc:2 sk:9','Narco Rojo|MX|hardcore|h||a:38 mk:skull of:trunks oc:21 sk:9','Lupita Fuego|MX|lucha|f|f|a:27 mk:half mc:0 h:long hc:0 of:singlet oc:0 sk:9'],
tir:['Maple Leaf Max|CA|technician|f||a:30 h:short hc:2 of:trunks oc:0 o2:5 sk:0','Hogtown Hank|CA|brawler|h||a:36 h:short hc:2 b:full of:trunks oc:21 sk:0','Raptor Ray|CA|highflyer|f||a:25 h:spiky hc:0 of:trunks oc:4 sk:3','Jess Skyline|CA|technician|f|f|a:28 h:long hc:6 of:singlet oc:0 sk:0']
});
// PTW roster based on ptwrestling.pl/roster (names slightly altered, looks guessed from data)
CUR.ptw=[
'Spartan Wojownik|PL|powerhouse|f||a:34 h:buzz b:full bd:big of:armor oc:0 o2:14 gr:armband sk:0',
'Dawid "Puncher" Seńko|PL|strong|h||a:32 h:short hc:0 b:stubble bd:big of:trunks oc:21 o2:0 gr:tattoo sk:0',
'Vincent Caravaggi|PL|technician|h||a:36 h:slick hc:0 b:goatee of:suit oc:17 o2:14 nk:tie sk:0',
'Daniel Rozor|PL|technician|f||a:30 h:short hc:0 of:trunks oc:21 o2:0 sk:0',
'Łukasz "Prezes" Okoń|PL|strong|h||a:40 h:side hc:1 of:suit oc:6 o2:5 nk:tie sk:0',
'Alek Brawo|PL|technician|f||a:28 h:short hc:2 of:trunks oc:0 o2:5 sk:0',
'Kalom|PL|highflyer|f||a:30 h:short hc:0 b:stubble of:trunks oc:0 sk:0',
'Piotr "Pierre" Sandomierski|PL|strong|f||a:32 h:short hc:2 of:trunks oc:1 sk:0',
'Fabian Monaco|PL|technician|h||a:33 h:slick hc:3 of:robe oc:14 o2:21 ac:shades sk:0',
'Ben Rogers|GB|strong|f||a:33 h:short hc:2 b:stubble of:trunks oc:21 o2:1 sk:0',
'Blazej Wildcard|CZ|highflyer|f||a:27 h:spiky hc:5 of:trunks oc:7 o2:0 sk:0',
'Bittersweet Jozef|IT|powerhouse|h||a:34 h:buzz b:full bd:big of:trunks oc:21 sk:1',
'El Clavo Jr|MX|lucha|f||a:28 mk:full mc:0 of:trunks oc:0 o2:5 sk:9 bd:lean',
'Miyagi Sigma|PL|technician|f||a:26 h:topknot hc:0 of:gi oc:5 o2:21 sk:0',
'Sigma Boy Xd|PL|highflyer|f||a:22 h:short hc:0 of:tshirt oc:2 sk:0 bd:lean',
'Nik Wesker|DE|technician|h||a:31 h:short hc:0 b:stubble of:trunks oc:2 o2:21 sk:0',
'Krampus|DE|brawler|h||a:35 mk:oni mc:21 of:trunks oc:20 o2:21 bd:bulk sk:0',
'Jonny Stormm|GB|highflyer|f||a:30 h:short hc:3 of:trunks oc:1 sk:0',
'Misiek z Lasu|PL|powerhouse|h||a:35 h:long hc:1 b:bushy bd:bulk of:overalls oc:15 o2:20 sk:0',
'Polski Niedźwiedź Jr|PL|powerhouse|h||a:33 h:short hc:1 b:full bd:big of:vest oc:20 o2:15 sk:0',
'Whiteblade|PL|technician|f||a:28 h:short hc:4 of:trunks oc:22 o2:21 sk:0',
'SchwarzMann|PL|strong|h||a:34 h:buzz b:stubble of:trunks oc:21 o2:6 sk:0',
'Nano "Starboy" Lopes|PL|highflyer|f||a:25 h:short hc:0 of:trunks oc:3 o2:21 sk:0',
'Serg Sullivan|PL|brawler|t||a:30 h:short hc:2 of:trunks oc:21 sk:0',
'Diana Mocna|PL|powerhouse|f|f|a:29 h:long hc:0 of:singlet oc:9 o2:21 sk:0',
'Wiktoria Lis|PL|technician|h|f|a:26 h:pony hc:0 of:singlet oc:21 o2:5 sk:0'
];
// KPW and PpW rosters based on the federations' roster pages (names slightly altered; looks guessed)
CUR.kpw=[
'Filip Fuks|PL|strong|f||a:30 h:short hc:2 b:stubble of:trunks oc:0 sk:0',
'Leon Lato|PL|technician|f||a:28 h:short hc:3 of:trunks oc:3 sk:0',
'Michał Fuks|PL|powerhouse|h||a:33 h:short hc:2 b:full bd:big of:trunks oc:0 o2:21 sk:0',
'Greg "Pijus I"|PL|brawler|t||a:33 h:short hc:1 b:full of:trunks oc:3 o2:21 sk:0',
'Chemik|PL|brawler|h||a:32 h:bald b:full bd:big of:vest oc:2 o2:21 mk:half mc:2 sk:0',
'Rosseti|PL|strong|f||a:31 h:short hc:0 b:stubble bd:big of:trunks oc:1 sk:0',
'Tomczak|PL|powerhouse|h||a:36 h:buzz b:heavy bd:bulk of:singlet oc:21 sk:0',
'Markus Paskal|PL|technician|f||a:29 h:short hc:2 of:trunks oc:1 sk:0',
'Eryk Lasak|PL|powerhouse|h||a:34 h:buzz b:full bd:bulk of:trunks oc:21 o2:0 nk:belt sk:0',
'Kuba Kałużny|PL|technician|f||a:24 h:short hc:2 of:trunks oc:1 sk:0',
'David Oliwa|PL|strong|h||a:32 h:slick hc:0 b:stubble of:trunks oc:21 o2:0 sk:0',
'Hans Schulz|DE|technician|h||a:35 h:short hc:3 of:trunks oc:21 sk:0',
'Red Skorpion|IT|brawler|f||a:34 h:buzz hc:5 b:stubble of:trunks oc:0 mk:half mc:0 sk:1',
'Ron Corvo|CZ|brawler|h||a:32 h:short hc:0 b:stubble of:trunks oc:21 mk:paint mc:21 sk:0',
'Iestyn Reese|GB|strong|f||a:33 h:short hc:2 b:stubble bd:big of:trunks oc:0 o2:14 nk:belt sk:0',
'Oskar Haler|PL|technician|f||a:31 h:short hc:2 of:trunks oc:1 o2:5 sk:0',
'Veit Müller|DE|powerhouse|h||a:34 h:long hc:2 b:full bd:big of:trunks oc:21 sk:0',
'Kamil Aleksandrowicz|PL|technician|f||a:30 h:short hc:2 of:trunks oc:0 o2:14 sk:0',
'Polish Punisher|PL|brawler|h||a:35 h:buzz b:goatee of:vest oc:0 o2:5 gr:tattoo sk:0',
'Fynn Freyhard|DE|highflyer|f||a:27 h:long hc:3 of:trunks oc:2 o2:5 sk:0',
'Michael Kowac|DE|brawler|h||a:36 h:short hc:2 b:full bd:big of:trunks oc:21 o2:3 sk:0',
'Wild Boar|GB|brawler|h||a:35 h:mohawk hc:5 b:bushy bd:stocky of:trunks oc:20 sk:0',
'Zefir|PL|highflyer|f||a:25 h:spiky hc:3 of:trunks oc:11 sk:0',
'Darius Persja|PL|highflyer|f||a:28 h:short hc:0 b:stubble of:trunks oc:0 sk:7',
'Dom Tailor|GB|powerhouse|f||a:30 h:short hc:0 bd:bulk of:trunks oc:21 sk:3',
'Carlos Zamorra|ES|highflyer|f||a:28 h:short hc:0 of:trunks oc:0 o2:3 sk:1',
'Crowchester|PL|highflyer|h||a:27 h:undercut hc:0 of:trunks oc:21 mk:domino mc:21 sk:0',
'David "Renegade" Turgor|CZ|strong|h||a:33 h:long hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Fabio Ferrarri|IT|strong|f||a:31 h:slick hc:0 of:trunks oc:0 o2:21 sk:1',
'Gianni Valetta|IT|powerhouse|f||a:35 h:short hc:0 b:full bd:big of:trunks oc:1 o2:0 sk:1',
'Jack Jestor|GB|brawler|h||a:34 h:short hc:2 b:full of:trunks oc:21 fc:warpaint sk:0',
'Joey Osbourne|GB|technician|f||a:30 h:short hc:2 b:stubble bd:stocky of:trunks oc:21 sk:0',
'Jon Rian|GB|technician|f||a:31 h:short hc:2 b:stubble of:trunks oc:0 sk:0',
'Mark Haskinz|GB|technician|f||a:38 h:short hc:2 of:trunks oc:21 sk:0',
'Martin Pane|DE|strong|h||a:34 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Mateusz Kakarek|PL|technician|f||a:29 h:short hc:2 of:trunks oc:1 sk:0',
'Piękny Kawaler|PL|technician|h||a:32 h:slick hc:3 b:goatee of:robe oc:5 o2:14 sk:0',
'Primat|GB|brawler|h||a:34 h:buzz b:full bd:stocky of:trunks oc:21 sk:0',
'Reinback|CA|powerhouse|h||a:33 h:short hc:2 b:full of:trunks oc:21 o2:0 sk:0',
'Shigehiro Irye|JP|powerhouse|f||a:36 h:buzz bd:bulk of:trunks oc:21 o2:5 sk:5',
'Sixt|DE|strong|t||a:32 h:short hc:3 b:stubble of:trunks oc:21 sk:0',
'Steinbolt|DE|strong|h||a:34 h:long hc:3 b:stubble bd:big of:trunks oc:21 o2:0 sk:0',
'Tom La Rufa|FR|technician|f||a:31 h:short hc:0 of:trunks oc:1 sk:0',
'Tom Fulten|GB|technician|f||a:29 h:short hc:2 of:trunks oc:1 o2:5 sk:0',
'Tristan Archar|FR|powerhouse|h||a:34 h:short hc:2 b:stubble bd:big of:trunks oc:1 sk:0',
'William "Pastor" Eaver|GB|technician|h||a:35 h:short hc:0 b:stubble of:coat oc:21 o2:5 sk:0',
'Yuu|JP|highflyer|f||a:27 h:short hc:0 of:trunks oc:3 sk:5',
'Zak Zodiak|GB|powerhouse|h||a:36 h:long hc:2 b:full bd:big of:trunks oc:21 sk:0',
'Bianka|PL|technician|f|f|a:28 h:long hc:2 of:singlet oc:9 o2:21 sk:0',
'Kat von Keige|GB|technician|h|f|a:28 h:long hc:0 of:singlet oc:21 o2:9 sk:0'
];
CUR.ppw=[
'Gustaw Gryffin|PL|brawler|h||a:35 h:short hc:0 b:goatee of:vest oc:21 o2:0 nk:belt gr:tattoo sk:0',
'Biesiad Mocny|PL|powerhouse|f||a:36 h:buzz b:full bd:bulk of:singlet oc:0 o2:14 sk:0',
'Johnny Blaid|PL|hardcore|h||a:33 h:mohawk hc:5 of:leather oc:21 o2:0 fc:scar gr:chain sk:0',
'Mister Zet|PL|technician|f||a:40 h:slick hc:0 b:stubble of:suit oc:21 o2:14 ac:shades sk:0',
'Samson z Będzina|PL|powerhouse|f||a:34 h:long hc:1 b:bushy bd:bulk of:vest oc:0 sk:0',
'Goblin|PL|hardcore|h||a:31 mk:oni mc:2 of:overalls oc:2 o2:3 sk:0',
'Axel Fux|PL|technician|f||a:30 h:short hc:5 b:stubble of:trunks oc:7 o2:21 sk:0',
'Ricardo Dizel|PL|brawler|h||a:37 h:buzz b:full bd:stocky of:trunks oc:21 o2:3 sk:0',
'Osamu Piękny|JP|technician|f||a:33 h:topknot hc:0 of:robe oc:9 o2:5 sk:5',
'Jacob Crain|GB|technician|f||a:32 h:slick hc:3 of:trunks oc:14 o2:21 sk:0',
'Kapitan Bazooka|PL|strong|h||a:38 h:flattop hc:0 b:circle of:suit oc:21 ac:shades sk:0',
'Gabriel Quinn|PL|technician|f||a:28 h:short hc:2 of:trunks oc:1 sk:0',
'Vic Goldman|PL|technician|h||a:33 h:slick hc:3 of:tux oc:21 nk:bowtie sk:0',
'Marek Hammers|IT|strong|h||a:34 h:short hc:0 b:stubble of:trunks oc:21 sk:1',
'Olgierd|PL|strong|f||a:30 h:long hc:2 b:full of:vest oc:6 sk:0',
'Franz Schlederer|DE|technician|h||a:60 h:bald b:mustache of:singlet oc:0 sk:0',
'Aytaç Bahar|PL|powerhouse|f||a:32 h:buzz b:full bd:big of:trunks oc:0 sk:0',
'Feyyaz Akwila|PL|technician|f||a:30 h:short hc:0 b:stubble of:trunks oc:21 sk:0',
'Isnor|PL|brawler|h||a:34 h:long hc:3 b:long of:vest oc:20 sk:0',
'Dominik Fischer|PL|highflyer|f||a:28 h:wavy hc:3 of:shorts oc:11 o2:3 sk:0',
'Edu Pedrolo|ES|technician|f||a:30 h:short hc:0 of:trunks oc:0 sk:1',
'Joe Bravvo|PL|technician|h||a:33 h:slick hc:0 b:stubble of:leather oc:21 ac:shades sk:0',
'Rob Skaffold|PL|highflyer|f||a:29 h:short hc:2 of:trunks oc:14 o2:21 sk:0',
'Joshua Amaro|PL|highflyer|f||a:27 h:short hc:0 of:trunks oc:2 sk:0',
'Tony Skin|PL|brawler|h||a:35 h:buzz b:goatee gr:tattoo of:trunks oc:21 sk:0',
'Viking|PL|powerhouse|h||a:36 h:long hc:3 b:full bd:big of:vest oc:20 o2:6 sk:0',
'Alex Berkner|PL|technician|f||a:29 h:short hc:2 of:trunks oc:1 sk:0',
'Goran|PL|brawler|h||a:34 h:buzz b:full of:trunks oc:21 sk:0',
'Madman Charly|PL|hardcore|t||a:33 mk:paint mc:0 h:mohawk hc:5 of:vest oc:21 sk:0',
'Rafi Kid|PL|highflyer|f||a:26 h:spiky hc:2 of:trunks oc:3 sk:0',
'Lexi Luks|PL|brawler|h|f|a:29 h:long hc:5 fc:eyeliner of:leotard oc:21 o2:0 sk:0'
];

// Real-style stables (names altered). members are wrestler names from CUR rosters
const STB={
gwf:[['The Bloodline Dynasty',['Roman Rains','Jay Usso','Jimmy Uzo','Solo Sikowa','Jacob Fatoo']],['Judgment Night',['Damien Prince','Finn Baylor','Dominic Misterio','Rhea Ripple']],['Imperial Order',['Gunter','Chad Gabel']],['The Wyatt Order',['Bron Breaker','Shamus']]],
apw:[['The Callis Clan',['Kenji Omega','Will Osprey','Samoa Jo','Kyle Fletch']],['Blackpool Fight Club',['Jon Moxlee','Mark Briskoe','Jay Lethel']],['The Elite Squad',['Brian Danielsen','Adam Coal','Orange Cassady']],['Hurt Hooligans',['Swerve Stricklin','MJ Friedlander','Darby Allen']],['Triad of Queens',['Toni Stormm','Mercedes Mon','Britt Bakar']]],
cwe:[['The Mainframe',['Moos','Eric Youngs','Steve McLin']],['Nonstop Elite',['Josh Alexandre','Frankie Kazarin','Trick Wilhelm']]],
nnp:[['Los Ingovernables Japón',['Tetsuya Naido','SANDA','Hiromu Takahasi','Shingo Takaki']],['Bullet Crew',['Jeff Kobb','Great-O-Kan','Zach Saber Jr']],['Kaos',['Kazuchika Okata','Hirooki Gotoh','Tomohiro Ishi','Yoshi-Hasi']]],
cul:[['Los Guerreros del Desierto',['Último Guerrera','Mefisto','Templaro']],['Los Infernales',['Hechizero','Dragón Rojo Jr','Diamante Azur']]],
lfl:[['La Facción Rebelde',['Psico Clown','Pagan','La Parca']],['Los Hijos de la Lucha',['Dr. Wagner Hijo','Laredo Kidd','El Hijo del Víking']]],
roh:[['Mexcellence',['Bandit Jr','Rush Jr','Komandor']]],
rsp:[['Voodoo Squad',['Suwama Jr','Shuji Ishikawa','Dan Tamura']]],
ark:[['Kongo Force',['Kenou','Katsuhiko Nakajima','Masa Kitamiya','Eita Hayata']]],
str:[['Starburst Stars',['Mayu Iwatami','Saya Kamitane','Starlight Kidd','Hazuki Mori']],['Donna Del Universo',['Maika Ozaki','Natsumi Kuro','Momo Watanabi']],['Edo Gang',['Utami Hayashisita','Julia Star','Tam Nakamo']]],
dtt:[['Damnation TX',['Danshoku Dieno','Kazusada Higuchi','Yuki Uena']]],
drg:[['Mad Blankey',['Naruki Doi Jr','Yamado','Kzi']]],
wxx:[['Ringkampf Allianz',['Alex Wolff','Axel Dieter','Robert Dreissker']]],
gcw:[['The Gutter Gang',['Nick Gagge','Matt Colt','Joey Jenga','Effy Bro']]],
ptw:[['Royal Rebels',['Alek Brawo','Vincent Caravaggi']],['Proroctwo',['Whiteblade','SchwarzMann']],['Synowie Lasu',['Misiek z Lasu','Polski Niedźwiedź Jr']],['First Class',['Daniel Rozor','Fabian Monaco']]],
ppw:[['Biesiad Team',['Biesiad Mocny','Samson z Będzina','Olgierd']]]
};
// All-time-roster based rosters for Polish feds + free agents (names slightly altered; looks guessed)
CUR.mzw=[
'Marco Hamers|PL|powerhouse|f||a:34 h:buzz b:full bd:big of:trunks oc:0 o2:21 nk:belt sk:0',
'Matt Bukna|PL|technician|f||a:31 h:short hc:2 b:stubble of:trunks oc:1 o2:0 sk:0',
'Shadow|PL|brawler|h||a:35 mk:hood mc:21 of:trunks oc:21 sk:0',
'Justin Joyy|PL|highflyer|f||a:27 h:short hc:3 of:trunks oc:3 o2:21 sk:0',
'Asmund|PL|powerhouse|h||a:36 h:long hc:3 b:long bd:big of:vest oc:20 sk:0',
'Rafael Kidd|PL|highflyer|f||a:26 h:spiky hc:2 of:trunks oc:3 sk:0',
'Rick Baxter|PL|brawler|h||a:37 h:slick hc:0 b:goatee of:suit oc:21 sk:0',
'Stanisław Van Dobroniak|PL|strong|h||a:40 h:bald b:full bd:bulk of:singlet oc:2 sk:0',
'Jędruś Bułka|PL|brawler|f||a:33 h:short hc:3 of:overalls oc:3 sk:0',
'Red Thunder|PL|lucha|f||a:30 mk:full mc:0 of:trunks oc:0 o2:21 sk:0',
'Szymon Siwy|PL|technician|f||a:30 h:short hc:4 of:trunks oc:1 sk:0',
'Aron Wake|PL|technician|h||a:32 h:slick hc:0 b:stubble of:suit oc:21 sk:0',
'Mr B.|PL|strong|h||a:38 h:flattop hc:0 b:circle of:tux oc:21 nk:bowtie sk:0',
'Dynamite Dave|PL|hardcore|f||a:34 h:mohawk hc:5 of:vest oc:0 gr:tattoo sk:0',
'Prince Viktor|PL|technician|h||a:30 h:side hc:3 of:robe oc:4 o2:14 ac:tiara sk:0',
'Christopher Anthoni|PL|technician|f||a:31 h:short hc:2 of:trunks oc:1 sk:0',
'Krueger|PL|hardcore|h||a:36 mk:paint mc:0 h:shaggy hc:2 of:overalls oc:20 fc:scar sk:0',
'Damian Rothschild|PL|technician|h||a:35 h:slick hc:0 of:suit oc:6 ac:shades sk:0',
'Disco Pablo Jr|PL|highflyer|f||a:30 h:afro hc:1 of:tights oc:9 o2:3 ac:shades sk:1',
'Nathan Kross|PL|brawler|f||a:31 h:short hc:2 of:trunks oc:0 sk:0',
'Robert Kayser|DE|strong|h||a:36 h:buzz b:full of:trunks oc:21 sk:0',
'Ronny Kessel|DE|brawler|h||a:35 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Zeritus|PL|powerhouse|h||a:33 mk:full mc:4 of:trunks oc:4 bd:big sk:0',
'The Grannatic|PL|hardcore|t||a:34 mk:skull of:vest oc:21 sk:0',
'Hexia|PL|brawler|h|f|a:28 h:long hc:0 fc:warpaint of:singlet oc:4 o2:21 sk:0',
'Valeria|PL|technician|f|f|a:27 h:long hc:5 of:singlet oc:0 sk:0',
'Aleksandra Osowska|PL|technician|f|f|a:26 h:pony hc:3 of:singlet oc:1 sk:0',
'Sandra Michalska|PL|highflyer|f|f|a:25 h:bob hc:2 of:singlet oc:3 sk:0'
];
CUR.mcw=[
'Johny Vegas|PL|brawler|h||a:35 h:pompadour hc:0 ac:shades of:jacket oc:14 o2:0 nk:belt sk:0',
'RAV|PL|highflyer|f||a:26 h:spiky hc:0 of:trunks oc:0 sk:0',
'Chris Steeler|PL|powerhouse|f||a:33 h:short hc:4 b:full bd:big of:trunks oc:21 o2:14 sk:0',
'David Sirch|PL|technician|h||a:32 mk:half mc:21 of:trunks oc:21 sk:0',
'Terror|PL|hardcore|h||a:34 mk:oni mc:0 of:vest oc:21 sk:0',
'Doomfist|PL|powerhouse|h||a:36 h:bald b:full bd:bulk of:trunks oc:21 gr:gloves sk:0',
'Phantom|PL|technician|f||a:30 mk:full mc:8 of:trunks oc:21 o2:8 sk:0',
'Shida|PL|strong|f||a:31 h:short hc:0 of:gi oc:21 sk:0',
'Sigurd|PL|strong|h||a:35 h:long hc:3 b:long bd:big of:vest oc:20 sk:0'
];
CUR.low=[
'Disco Pablo|PL|highflyer|f||a:31 h:afro hc:1 of:tights oc:9 o2:3 ac:shades sk:1',
'Arek Paterek|PL|technician|f||a:30 h:short hc:2 of:trunks oc:1 sk:0',
'Marcelito|PL|lucha|f||a:29 mk:full mc:3 of:trunks oc:3 o2:0 sk:0',
'Sambor|PL|powerhouse|h||a:36 h:long hc:2 b:full bd:big of:vest oc:6 sk:0',
'Syriusz Dziedzic|PL|technician|h||a:33 h:slick hc:0 b:stubble of:suit oc:21 sk:0',
'Taras|PL|brawler|t||a:34 h:buzz b:full of:trunks oc:3 o2:1 sk:0',
'Sinister|PL|hardcore|h||a:32 mk:half mc:21 of:vest oc:21 sk:0',
'Mr Chairman|PL|strong|h||a:42 h:side hc:4 of:suit oc:21 nk:tie sk:0',
'Curtis Blake|GB|technician|f||a:30 h:short hc:2 of:trunks oc:1 sk:0',
'Jakub Linda|PL|technician|f||a:28 h:short hc:2 of:trunks oc:0 sk:0',
'Boro|PL|brawler|t||a:34 h:buzz b:goatee of:trunks oc:21 sk:0',
'Omar Prince|PL|highflyer|f||a:27 h:spiky hc:0 of:trunks oc:2 sk:7',
'Patrykos|PL|brawler|t||a:29 h:short hc:2 of:tshirt oc:0 sk:0',
'Piotr "ShowOff" Małecki|PL|technician|f||a:30 h:slick hc:3 of:trunks oc:14 o2:21 sk:0',
'Sam Della Vale|IT|technician|f||a:31 h:short hc:0 of:trunks oc:1 sk:1',
'Tony Sheen|PL|brawler|t||a:36 h:short hc:2 b:stubble of:trunks oc:1 sk:0',
'Wiktor Longman|PL|strong|h||a:34 h:long hc:2 b:full of:trunks oc:21 sk:0',
'Yaqub|PL|highflyer|f||a:26 h:short hc:0 of:trunks oc:2 sk:7',
'Zétény|PL|brawler|t||a:30 h:short hc:2 b:stubble of:trunks oc:0 sk:0',
'Erik Šlotir|CZ|strong|f||a:33 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Gulyás Öcsi|CZ|technician|f||a:32 h:short hc:2 of:trunks oc:0 sk:0',
'Rusałka|PL|highflyer|f|f|a:27 h:long hc:10 of:singlet oc:10 o2:2 sk:0',
'Ania|PL|technician|f|f|a:27 h:pony hc:3 of:singlet oc:1 sk:0'
];
CUR.plz=[
'Bartosz Plata|PL|technician|f||a:31 h:short hc:2 of:trunks oc:1 sk:0',
'Oskar Alexandrowicz|PL|strong|f||a:32 h:short hc:0 b:stubble of:trunks oc:0 sk:0',
'Emil Völler|DE|brawler|h||a:34 h:buzz b:full of:trunks oc:21 sk:0',
'Bart Petro|PL|technician|f||a:30 h:slick hc:0 of:trunks oc:1 sk:0',
'Kondzio Cannonball|PL|powerhouse|f||a:29 h:short hc:3 bd:bulk of:trunks oc:3 sk:0',
'Dieter Schwarz|DE|technician|h||a:35 h:slick hc:4 of:suit oc:21 sk:0',
'Szymon Kurczak|PL|brawler|t||a:31 h:short hc:2 of:trunks oc:21 sk:0',
'Laurance Romain|DE|technician|f||a:34 h:short hc:2 of:trunks oc:1 sk:0',
'Barbarossa|DE|powerhouse|h||a:38 h:long hc:5 b:long bd:big of:vest oc:0 sk:0',
'Jakub Fox|PL|technician|f||a:28 h:short hc:5 of:trunks oc:7 sk:0',
'Agentka Agatka|PL|technician|h|f|a:29 h:bob hc:0 ac:glasses of:suit oc:21 sk:0',
'Gloria G. Szek|PL|brawler|f|f|a:28 h:long hc:3 of:singlet oc:9 sk:0',
'Kalyana|PL|highflyer|f|f|a:26 h:braids hc:0 of:singlet oc:3 sk:3',
'Akane Fujita|JP|technician|h|f|a:27 h:long hc:0 of:singlet oc:0 sk:5'
];
CUR.FA=[
'Babatunde|NG|powerhouse|f||a:33 h:buzz b:stubble bd:big of:trunks oc:2 o2:3 sk:4',
'Max Speed|PL|highflyer|f||a:28 h:short hc:3 of:trunks oc:3 o2:21 sk:0',
'Dawid Kruk|PL|technician|f||a:30 h:short hc:5 b:stubble of:trunks oc:7 sk:0',
'Rafi Rarytas|PL|technician|h||a:31 h:slick hc:0 of:suit oc:14 o2:21 sk:0',
'Jack Kalom|PL|highflyer|f||a:29 h:short hc:0 of:trunks oc:0 sk:0',
'Adam Wong|PL|technician|f||a:30 h:short hc:0 of:trunks oc:1 sk:5',
'Jerry "Rich" Mandecki|PL|technician|h||a:36 h:slick hc:3 of:tux oc:21 nk:bowtie sk:0',
'Matt Kordas|PL|brawler|h||a:35 h:short hc:2 b:full of:trunks oc:21 sk:0',
'Diana Rega|PL|technician|f|f|a:27 h:long hc:2 of:singlet oc:1 sk:0',
'Kinga Miotke|PL|brawler|h|f|a:28 h:long hc:0 of:singlet oc:21 sk:0',
'Mira|PL|highflyer|f|f|a:25 h:pony hc:2 of:singlet oc:3 sk:0',
'Krzysztof Zasada|PL|strong|h||a:34 h:buzz b:stubble of:trunks oc:21 sk:0'
];
CUR.ppw=CUR.ppw.concat([
'Jerry Rich|PL|technician|h||a:35 h:slick hc:0 of:suit oc:6 sk:0',
'Steve Kuningas|PL|strong|f||a:31 h:short hc:3 of:trunks oc:1 sk:0',
'Ultimo Combo|MX|lucha|f||a:30 mk:full mc:3 of:trunks oc:3 o2:21 sk:9',
'Automatico|MX|lucha|h||a:34 mk:half mc:21 of:trunks oc:21 sk:9',
'Jim Enerico|PL|brawler|f||a:33 h:short hc:2 of:trunks oc:0 sk:0',
'Hades|PL|hardcore|h||a:35 mk:oni mc:0 of:trunks oc:21 sk:0',
'Steven Strong|PL|powerhouse|f||a:34 h:buzz b:full bd:big of:trunks oc:0 sk:0',
'Black Orion|PL|technician|h||a:32 mk:half mc:21 of:trunks oc:21 sk:0',
'Danny Roxx|PL|highflyer|f||a:27 h:undercut hc:4 of:trunks oc:9 sk:0',
'Electrico|MX|lucha|f||a:29 mk:full mc:11 of:trunks oc:11 o2:3 sk:9',
'Mystic Tiger|PL|lucha|f||a:30 mk:cat mc:3 of:trunks oc:3 o2:21 sk:0',
'Angel Guerero|ES|lucha|f||a:30 mk:full mc:12 of:trunks oc:12 sk:1',
'El Ogre|ES|powerhouse|h||a:36 mk:oni mc:2 bd:bulk of:trunks oc:2 sk:1',
'Esteban Lucha|ES|lucha|f||a:31 mk:full mc:0 of:trunks oc:0 sk:1',
'Red Dorada|MX|lucha|f||a:33 mk:full mc:0 of:trunks oc:14 sk:9',
'Wonder Haze|PL|technician|h|f|a:28 h:long hc:9 of:leotard oc:9 sk:0',
'Asara|PL|brawler|f|f|a:27 h:long hc:0 of:singlet oc:21 sk:0',
'Rozalia Nyx|PL|hardcore|h|f|a:28 h:long hc:0 fc:warpaint of:leotard oc:21 sk:0',
'Julia Rave|PL|highflyer|f|f|a:26 h:pony hc:9 of:singlet oc:9 o2:3 sk:0'
]);
CUR.ptw=CUR.ptw.concat([
'Syriusz|PL|technician|f||a:32 h:short hc:0 of:trunks oc:4 sk:0',
'Disco Pablito|PL|highflyer|f||a:28 h:afro hc:1 of:tights oc:3 sk:1',
'Santino Marela|IT|brawler|f||a:42 h:short hc:0 b:mustache of:trunks oc:0 o2:5 ac:fedora sk:1',
'Karol "Iskra" Górecki|PL|highflyer|f||a:27 h:spiky hc:3 of:trunks oc:0 o2:21 sk:0',
'Rust|PL|brawler|h||a:35 h:buzz b:stubble of:vest oc:20 sk:0',
'Nitro|PL|highflyer|f||a:27 h:spiky hc:5 of:trunks oc:7 sk:0'
]);
// Updated rosters from Cagematch current data (names altered)
CUR.gwf=[
'Roman Rains|US|powerhouse|h||a:40 h:long hc:0 b:full bd:big of:vest oc:21 o2:6 gr:tattoo sk:9',
'Cody Rhoads|US|technician|f||a:41 h:side hc:3 b:stubble of:trunks oc:21 o2:14 gr:tattoo sk:0 nk:belt',
'CN Punk|US|technician|t||a:47 h:short hc:0 b:full of:trunks oc:21 o2:5 gr:tattoo sk:0',
'Seth Rawlins|US|highflyer|t||a:40 h:long hc:6 b:stubble of:pants oc:21 o2:0 sk:0',
'Gunter Wolf|GB|powerhouse|h||a:38 h:bald b:heavy bd:big of:singlet oc:21 o2:14 sk:6',
'Drew McIntire|GB|powerhouse|f||a:41 h:long hc:2 b:full bd:big of:kilt oc:1 o2:6 sk:6',
'Randy Ortin|US|strong|h||a:46 h:buzz hc:1 of:trunks oc:21 o2:6 bd:big gr:tattoo sk:0',
'Jay Usso|US|brawler|f||a:40 h:long hc:0 b:full bd:big of:vest oc:6 o2:5 gr:tattoo sk:9',
'LA Knite|US|strong|f||a:43 h:long hc:2 b:goatee ac:shades of:vest oc:21 o2:14 sk:0',
'AJ Stiles|US|technician|t||a:49 h:short hc:1 b:full of:trunks oc:21 o2:1 sk:0',
'Kevin Owenz|CA|brawler|h||a:42 h:short hc:2 b:full bd:big of:shorts oc:21 o2:6 sk:0',
'Sammy Zane|CA|technician|f||a:41 h:long hc:0 b:full of:hoodie oc:21 o2:1 sk:1',
'Rey Misterio|US|lucha|f||a:51 mk:full mc:1 of:pants oc:1 o2:5 sk:9 bd:lean',
'Solo Sikowa|US|powerhouse|h||a:32 h:buzz b:full bd:big of:singlet oc:21 gr:tattoo sk:3',
'Jacob Fatoo|US|powerhouse|h||a:34 h:long hc:0 b:full bd:big of:trunks oc:21 fc:stripe gr:tattoo sk:3',
'Bron Breaker|US|powerhouse|f||a:28 h:buzz hc:3 of:singlet oc:7 o2:6 bd:big sk:0',
'Penta Zero|MX|lucha|h||a:41 mk:full mc:21 of:trunks oc:21 o2:3 sk:9',
'Trick Williams|US|strong|f||a:30 h:short hc:0 of:trunks oc:21 o2:3 nk:belt sk:3',
'Je\'Von Evans|US|highflyer|f||a:22 h:flattop hc:0 of:trunks oc:3 o2:0 sk:3',
'Oba Femi|NG|powerhouse|f||a:28 h:buzz bd:big of:singlet oc:21 o2:14 sk:4',
'Finn Baylor|GB|highflyer|f||a:45 h:slick hc:0 b:stubble of:trunks oc:21 o2:12 sk:5',
'Damien Prince|US|strong|h||a:44 h:long hc:0 b:goatee of:leather oc:21 gr:tattoo sk:9',
'Dominic Misterio|US|lucha|h||a:29 h:short hc:0 b:soulpatch of:tank oc:21 o2:7 gr:tattoo sk:9',
'JD McDonagh|GB|technician|h||a:35 h:short hc:2 of:trunks oc:21 o2:0 sk:0',
'Logan Paul|US|highflyer|h||a:31 h:short hc:1 of:trunks oc:3 o2:21 sk:0',
'Jimmy Uzo|US|brawler|f||a:40 h:long hc:0 b:heavy bd:big of:vest oc:6 o2:0 gr:tattoo sk:9',
'Tama Tonga Jr|US|strong|h||a:42 h:long hc:0 b:stubble of:trunks oc:21 o2:7 sk:3',
'Johnny Gargano|US|technician|f||a:38 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:0',
'Carmelo Hayes|US|technician|h||a:31 h:short hc:0 b:goatee of:trunks oc:21 o2:14 sk:3',
'The Mizz|US|technician|h||a:46 h:slick hc:1 b:goatee of:suit oc:21 o2:14 sk:0',
'Bronson Reid|AU|powerhouse|h||a:37 h:buzz b:full bd:big of:singlet oc:21 sk:0',
'Rusev Jr|CZ|powerhouse|h||a:39 h:short hc:2 b:full bd:big of:trunks oc:0 o2:21 sk:0',
'Joe Hendry|GB|technician|f||a:37 h:long hc:2 b:stubble of:suit oc:1 o2:14 ac:shades sk:0',
'Dragon Lee Jr|MX|lucha|f||a:31 mk:full mc:0 of:trunks oc:0 o2:21 sk:9 bd:lean',
'Rey Fenyx|MX|lucha|f||a:35 mk:full mc:3 of:trunks oc:3 o2:21 sk:9 bd:lean',
'Austin Theory|US|highflyer|t||a:29 h:short hc:3 of:trunks oc:3 o2:21 sk:0',
'Grayson Waler|AU|technician|h||a:36 h:slick hc:0 b:stubble of:suit oc:21 sk:0',
'Chad Gabel|US|technician|f||a:40 h:short hc:1 b:chinstrap of:singlet oc:1 bd:stocky sk:0',
'Ethan Paige|GB|technician|t||a:38 h:short hc:3 of:trunks oc:21 o2:5 sk:0',
'Ricky Saints|US|brawler|h||a:36 h:short hc:0 b:stubble of:trunks oc:21 o2:0 sk:0',
'Baron Corbyn|US|brawler|h||a:41 h:short hc:2 b:full bd:big of:trunks oc:21 sk:0',
'Matt Cardona|US|technician|h||a:41 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:0',
'Shinsuke Nakamora|JP|strong|t||a:46 h:long hc:0 of:trunks oc:21 o2:0 sk:5',
'Montez Forde|US|highflyer|f||a:35 h:short hc:0 of:trunks oc:6 o2:3 sk:3',
'Angelo Dawkins|US|strong|f||a:40 h:short hc:0 of:trunks oc:6 o2:3 sk:3',
'R-Truth|US|brawler|f||a:54 h:short hc:0 b:goatee ac:cap of:tshirt oc:2 sk:3',
'Otis Mann|US|powerhouse|f||a:35 h:short hc:2 b:full bd:bulk of:singlet oc:3 sk:0',
'Akira Tozawa|JP|highflyer|f||a:40 h:short hc:0 of:trunks oc:0 sk:5',
'Rhea Ripple|AU|strong|h|f|a:30 h:long hc:0 fc:eyeliner of:singlet oc:21 o2:0 gr:tattoo sk:0',
'Becca Lynch|GB|brawler|f|f|a:39 h:long hc:5 fc:freckles of:singlet oc:2 o2:6 sk:6 nk:belt',
'Charlotte Flare|US|technician|h|f|a:40 h:long hc:3 of:robe oc:5 o2:14 sk:5',
'Bianca Bellair|US|strong|f|f|a:37 h:braids hc:0 of:singlet oc:9 o2:1 sk:4 gr:wristbands',
'Iyo Skye|JP|highflyer|h|f|a:35 h:long hc:0 of:tights oc:8 o2:5 sk:5 nk:belt',
'Liv Morgen|US|highflyer|t|f|a:32 h:long hc:3 of:tights oc:21 o2:9 sk:5',
'Tiffany Stratten|US|technician|h|f|a:28 h:long hc:3 of:singlet oc:9 o2:14 gr:wristbands sk:0 nk:belt',
'Jade Cargil|US|powerhouse|f|f|a:33 h:long hc:0 of:tank oc:21 o2:14 bd:big sk:3',
'Asuki|JP|technician|f|f|a:45 h:long hc:5 of:singlet oc:0 o2:5 sk:5',
'Bailey Hart|US|technician|f|f|a:37 h:pony hc:3 of:singlet oc:2 o2:5 sk:0',
'Giulia Rossi|JP|strong|h|f|a:32 h:long hc:0 of:singlet oc:3 o2:21 sk:5',
'Stephanie Vaquero|MX|technician|f|f|a:31 h:long hc:0 of:singlet oc:21 o2:3 sk:9',
'Raquel Rodriguez|US|powerhouse|f|f|a:35 h:long hc:0 bd:big of:singlet oc:21 o2:9 sk:3',
'Roxanne Perez|US|highflyer|f|f|a:25 h:long hc:5 of:singlet oc:9 o2:21 sk:0',
'Jordynne Grayce|US|powerhouse|f|f|a:31 h:long hc:0 of:singlet oc:3 o2:21 bd:big sk:3',
'Nia Jaxx|US|powerhouse|h|f|a:42 h:long hc:0 of:singlet oc:21 bd:bulk sk:3',
'Lyra Valkyrie|US|technician|f|f|a:30 h:pony hc:3 of:singlet oc:1 o2:5 sk:0',
'Naomi|US|highflyer|f|f|a:38 h:long hc:0 of:singlet oc:9 o2:3 sk:3',
'Alexa Blisss|US|highflyer|h|f|a:35 h:long hc:3 of:singlet oc:4 o2:9 sk:0'
];
STB.gwf=[['The Bloodline Dynasty',['Roman Rains','Jay Usso','Jimmy Uzo','Solo Sikowa','Jacob Fatoo','Tama Tonga Jr']],['Judgment Night',['Finn Baylor','Damien Prince','Dominic Misterio','JD McDonagh','Liv Morgen','Raquel Rodriguez']],['Los Ingovernables Garza',['Rey Fenyx','Dragon Lee Jr','Penta Zero']],['The Vanity Crew',['Ethan Paige','Baron Corbyn']],['Hurt Order',['Bron Breaker','Bronson Reid']]];
// AEW, TNA, NJPW, ROH, Stardom rosters from Cagematch champions + best knowledge (names altered)
CUR.apw=[
'Will Osprey|GB|highflyer|f||a:33 h:undercut hc:3 b:stubble of:trunks oc:5 o2:0 nk:belt sk:6',
'Jon Moxlee|US|hardcore|t||a:40 h:shaggy hc:2 b:stubble of:vest oc:21 gr:tattoo sk:0 nk:belt',
'Kazuchika Okata|JP|technician|h||a:38 h:slick hc:3 of:trunks oc:21 o2:0 nk:belt sk:5',
'Darby Allen|US|hardcore|f||a:33 h:short hc:0 fc:stripe of:pants oc:21 o2:5 gr:tattoo sk:0 nk:belt',
'Andrade El Idolo|MX|technician|h||a:37 h:long hc:0 b:goatee of:trunks oc:21 o2:14 gr:tattoo sk:9 nk:belt',
'MJ Friedlander|US|technician|h||a:30 h:slick hc:0 of:robe oc:14 o2:21 sk:0',
'Hangman Paige|US|strong|f||a:34 h:long hc:2 b:full ac:cowboy of:vest oc:21 o2:6 sk:0',
'Kenji Omega|CA|highflyer|f||a:43 h:long hc:2 b:stubble of:pants oc:5 o2:14 sk:5',
'Swerve Stricklin|US|brawler|h||a:36 h:buzz b:goatee of:trunks oc:14 o2:21 gr:tattoo sk:3',
'Matt Jacksen|US|technician|f||a:41 h:long hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Nick Jacksen|US|highflyer|f||a:39 h:long hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Brian Danielsen|US|technician|f||a:45 h:long hc:2 b:long of:trunks oc:21 o2:5 sk:0',
'Orange Cassady|US|technician|t||a:41 h:long hc:2 ac:shades of:jacket oc:7 o2:6 sk:0',
'Claudio Castagnolo|DE|strong|h||a:45 h:short hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Konosuke Takeshite|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Kyle Fletch|AU|technician|h||a:29 h:buzz hc:3 b:stubble of:trunks oc:21 o2:7 sk:0',
'Mark Davies|GB|powerhouse|h||a:37 h:buzz b:full bd:big of:trunks oc:21 o2:0 sk:0',
'Brody Kingg|US|powerhouse|h||a:38 h:short hc:2 b:full bd:bulk of:vest oc:21 sk:0',
'Powerhouse Hobbz|US|powerhouse|f||a:36 h:buzz bd:bulk of:trunks oc:21 o2:3 sk:3',
'Adam Coal|US|technician|h||a:38 h:side hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Chris Jerricho|CA|technician|h||a:55 h:long hc:6 of:jacket oc:14 o2:21 sk:0',
'Samoa Jo|US|strong|h||a:47 h:buzz b:soulpatch bd:big of:trunks oc:21 o2:6 gr:tattoo sk:3',
'Mark Briskoe|US|brawler|f||a:41 h:short hc:0 b:goatee of:shorts oc:0 o2:5 sk:3',
'Jay Lethel|US|technician|f||a:41 h:buzz hc:0 of:trunks oc:21 o2:14 sk:3',
'Daniel Garsia|US|technician|f||a:28 h:short hc:2 of:trunks oc:21 o2:0 sk:0',
'Wheeler Yuto|US|technician|f||a:28 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Ricochet Jr|US|highflyer|f||a:38 h:mohawk hc:2 of:trunks oc:2 o2:21 sk:3',
'Bobby Lashly|US|powerhouse|f||a:50 h:bald bd:bulk of:trunks oc:0 sk:0',
'Austin Creeds|US|highflyer|f||a:30 h:short hc:0 of:trunks oc:4 o2:3 sk:3',
'Kofi Kingstown|US|highflyer|f||a:44 h:dreads hc:0 of:trunks oc:2 o2:3 sk:3',
'Toni Stormm|AU|technician|f|f|a:31 h:bob hc:6 of:singlet oc:14 o2:9 sk:0 nk:belt',
'Mercedes Mon|US|technician|f|f|a:35 h:long hc:0 of:singlet oc:9 o2:14 sk:9 nk:belt',
'Jamie Hayder|GB|brawler|h|f|a:32 h:long hc:6 of:singlet oc:21 o2:1 sk:0',
'Alex Windsore|GB|brawler|f|f|a:30 h:long hc:2 of:singlet oc:1 o2:0 sk:0',
'Persephone|US|highflyer|f|f|a:28 h:long hc:0 of:singlet oc:4 o2:9 sk:0 nk:belt',
'Willow Nightengale|US|powerhouse|f|f|a:32 h:long hc:5 bd:big of:singlet oc:9 o2:5 sk:0',
'Kris Statlandar|US|powerhouse|f|f|a:30 h:long hc:6 of:singlet oc:21 o2:3 gr:wristbands sk:0',
'Julia Hartt|US|brawler|h|f|a:28 h:long hc:0 fc:warpaint of:singlet oc:21 o2:0 sk:0',
'Skye Blu|US|highflyer|f|f|a:27 h:long hc:10 of:singlet oc:11 sk:0',
'Thunder Rose|US|brawler|f|f|a:39 h:long hc:0 of:singlet oc:6 o2:11 sk:9',
'Britt Bakar|US|technician|h|f|a:35 h:long hc:6 of:singlet oc:14 o2:0 sk:0',
'Hikaru Shidah|JP|strong|f|f|a:37 h:long hc:0 of:singlet oc:0 o2:5 sk:5'
];
STB.apw=[['The Callis Clan',['Will Osprey','Kyle Fletch','Konosuke Takeshite','Kazuchika Okata','Mark Davies']],['Blackpool Fight Club',['Jon Moxlee','Claudio Castagnolo','Wheeler Yuto']],['The Elite Squad',['Kenji Omega','Matt Jacksen','Nick Jacksen','Brian Danielsen']],['Hurt Hooligans',['Swerve Stricklin','Austin Creeds','Kofi Kingstown']],['Brawling Chicks',['Jamie Hayder','Alex Windsore']],['Triangle of Madness',['Julia Hartt','Skye Blu','Persephone']]];
CUR.cwe=[
'Leon Slayter|GB|highflyer|f||a:23 h:short hc:3 of:trunks oc:3 o2:21 nk:belt sk:0',
'Moos|CA|powerhouse|h||a:34 h:buzz b:goatee bd:big of:trunks oc:21 o2:7 sk:3',
'Nic Nemith|CA|technician|h||a:42 h:slick hc:1 b:stubble of:trunks oc:21 o2:14 nk:belt sk:0',
'Ryan Nemith|CA|technician|h||a:39 h:short hc:2 of:trunks oc:21 o2:14 nk:belt sk:0',
'Jason Hotch|US|technician|f||a:34 h:short hc:2 of:trunks oc:1 nk:belt sk:0',
'Amazing Red|US|highflyer|f||a:42 h:short hc:0 of:trunks oc:0 o2:5 nk:belt sk:3',
'Mike Santanna|US|brawler|f||a:42 h:long hc:0 b:full of:vest oc:21 gr:tattoo sk:9',
'Josh Alexandre|CA|technician|f||a:38 h:short hc:0 b:stubble of:trunks oc:3 o2:21 bd:stocky sk:5',
'Frankie Kazarin|US|technician|f||a:47 h:short hc:0 of:trunks oc:21 o2:1 sk:9',
'Steve McLin|US|brawler|h||a:38 h:long hc:1 b:full of:trunks oc:21 o2:7 sk:0',
'Trey Migel|US|highflyer|f||a:34 h:long hc:2 of:trunks oc:3 o2:21 sk:0',
'Ace Austen|CA|highflyer|f||a:32 h:short hc:3 of:trunks oc:21 o2:5 sk:0',
'Eddie Edwardz|US|technician|f||a:42 h:short hc:2 b:stubble of:trunks oc:1 o2:0 sk:0',
'Sami Calihan|US|hardcore|t||a:39 h:buzz b:full of:trunks oc:21 o2:0 gr:tattoo sk:0',
'Eric Youngs|CA|brawler|t||a:46 h:long hc:1 b:full of:shorts oc:7 sk:0',
'Matt Hardee|US|technician|f||a:51 h:long hc:2 b:goatee of:pants oc:21 o2:5 sk:0',
'Mustafa Alee|US|highflyer|f||a:39 h:short hc:0 b:stubble of:trunks oc:3 o2:21 sk:7',
'Elijah Rey|US|brawler|t||a:42 h:long hc:2 b:full of:trunks oc:21 sk:0',
'Indi Hartwel|AU|technician|f|f|a:34 h:long hc:6 of:singlet oc:9 o2:14 nk:belt sk:0',
'M by Elegance|US|technician|h|f|a:31 h:long hc:0 of:robe oc:9 o2:14 nk:belt sk:3',
'Zoey Serano|US|brawler|f|f|a:29 h:long hc:0 of:singlet oc:21 o2:9 nk:belt sk:0',
'Shayna Baszlar|US|brawler|h|f|a:45 h:long hc:2 of:singlet oc:21 o2:0 nk:belt sk:0',
'Masha Slamovich|US|hardcore|t|f|a:32 h:long hc:0 of:singlet oc:21 o2:0 gr:tattoo sk:0',
'Tasha Steelz|US|technician|f|f|a:32 h:braids hc:0 of:singlet oc:14 o2:9 sk:3',
'Rosemari|CA|hardcore|h|f|a:40 h:long hc:0 fc:warpaint of:leotard oc:21 sk:0'
];
CUR.nnp=[
'Yota Tsuji|JP|technician|f||a:26 h:short hc:0 of:trunks oc:21 o2:0 nk:belt sk:5',
'Gabe Kid|GB|brawler|h||a:29 h:buzz b:stubble of:trunks oc:21 o2:6 nk:belt sk:0',
'Hiroshi Tanahasi|JP|technician|f||a:50 h:long hc:0 of:trunks oc:21 o2:14 sk:5',
'Tetsuya Naido|JP|technician|t||a:44 h:long hc:0 of:suit oc:21 o2:5 sk:5',
'SANDA|JP|technician|h||a:38 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:5',
'Shingo Takaki|JP|strong|t||a:44 h:slick hc:0 b:stubble of:trunks oc:3 o2:6 bd:big sk:5',
'Zach Saber Jr|GB|technician|h||a:39 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:6',
'Hiromu Takahasi|JP|highflyer|f||a:36 h:long hc:0 of:trunks oc:3 o2:21 mk:half mc:3 sk:5',
'Great-O-Kan|JP|powerhouse|h||a:43 h:topknot hc:0 of:vest oc:6 o2:0 bd:big mk:paint mc:0 sk:5',
'Henare|AU|strong|f||a:30 h:buzz b:full bd:big of:trunks oc:21 o2:0 sk:7',
'Aaron Wolfe|CA|strong|f||a:28 h:short hc:2 of:trunks oc:21 o2:5 nk:belt sk:0',
'YOH|JP|highflyer|f||a:35 h:short hc:0 of:trunks oc:21 o2:5 nk:belt sk:5',
'El Desparado|JP|highflyer|h||a:41 mk:full mc:6 of:trunks oc:21 o2:3 sk:5 bd:lean',
'Mistiko|MX|lucha|f||a:45 mk:full mc:1 of:trunks oc:1 o2:5 sk:9 bd:lean',
'Konosuke Takeshite Jr|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 nk:belt sk:5',
'Oleg Boltin|DE|powerhouse|h||a:31 h:short hc:2 b:stubble bd:big of:trunks oc:21 o2:0 nk:belt sk:0',
'Yoshi-Hasi|JP|technician|h||a:43 h:short hc:0 of:trunks oc:21 o2:3 sk:5',
'Shota Umeno|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Hirooki Gotoh|JP|strong|f||a:46 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Tomohiro Ishi|JP|brawler|t||a:50 h:buzz of:trunks oc:21 o2:5 bd:stocky sk:5',
'Taiji Ishimore|JP|highflyer|h||a:42 h:spiky hc:0 of:trunks oc:21 o2:7 sk:5',
'Jeff Kobb|US|powerhouse|h||a:44 h:short hc:0 of:trunks oc:21 o2:14 bd:big sk:3',
'Kenta Kobayasi|JP|brawler|h||a:44 h:short hc:0 of:trunks oc:21 o2:6 sk:5',
'TJ Ilies|US|highflyer|f||a:30 h:short hc:2 of:trunks oc:21 o2:6 sk:0',
'Trent Hoper|US|technician|f||a:32 h:short hc:3 of:trunks oc:21 o2:6 sk:0',
'Angel de Oro|MX|lucha|f||a:28 mk:full mc:14 of:trunks oc:14 o2:21 sk:9',
'Niebla Roja|MX|lucha|f||a:30 mk:full mc:0 of:trunks oc:0 o2:21 sk:9',
'Syuri|JP|strong|f|f|a:36 h:long hc:0 of:singlet oc:0 o2:21 nk:belt sk:5',
'Alex Windsor|GB|brawler|f|f|a:30 h:long hc:2 of:singlet oc:1 o2:0 nk:belt sk:0',
];
STB.nnp=[['Los Ingovernables Japón',['Tetsuya Naido','SANDA','Hiromu Takahasi','Shingo Takaki']],['United Dominion',['Great-O-Kan','Henare','Zach Saber Jr','Aaron Wolfe']],['Bullet Crew',['Jeff Kobb','Taiji Ishimore','Kenta Kobayasi']],['Kaos',['Hirooki Gotoh','Tomohiro Ishi','Yoshi-Hasi']],['Los Hermanos Chaves',['Angel de Oro','Niebla Roja']],['Ungrateful Ones',['TJ Ilies','Trent Hoper']]];
CUR.roh=[
'Bandito|MX|highflyer|f||a:30 mk:full mc:7 of:trunks oc:7 o2:6 nk:belt sk:9',
'Lee Moriarti|US|technician|f||a:30 h:long hc:0 of:trunks oc:21 o2:5 nk:belt sk:0',
'Action Andretty|US|highflyer|f||a:27 h:short hc:2 of:trunks oc:0 o2:5 nk:belt sk:0',
'Mistiko Jr|MX|lucha|f||a:30 mk:full mc:1 of:trunks oc:1 o2:5 sk:9',
'Mascara Doradah|MX|lucha|f||a:41 mk:full mc:14 of:trunks oc:14 o2:21 sk:9',
'Blake Christian|US|highflyer|f||a:30 h:short hc:2 of:trunks oc:1 sk:0',
'Jay Lethal|US|technician|f||a:41 h:buzz hc:0 of:trunks oc:21 o2:14 sk:3',
'Lee Jonson|US|technician|f||a:34 h:short hc:2 of:trunks oc:21 sk:0',
'Tony Nese|US|technician|f||a:40 h:short hc:0 of:trunks oc:21 o2:14 sk:0',
'Ariya Davari|US|brawler|h||a:37 h:short hc:0 b:full of:trunks oc:0 sk:7',
'AR Fox|US|highflyer|f||a:38 h:short hc:0 of:trunks oc:3 o2:21 sk:3',
'Dalton Castel|CA|brawler|h||a:39 h:long hc:6 of:robe oc:14 o2:21 ac:crown sk:0',
'Shane Taylor|US|powerhouse|h||a:40 h:buzz b:full bd:big of:trunks oc:21 sk:3',
'Komandor|MX|highflyer|f||a:24 mk:full mc:3 of:trunks oc:3 o2:21 sk:9 bd:lean',
'Rocky Romeo|US|technician|f||a:43 h:short hc:2 b:stubble of:trunks oc:1 sk:1',
'Bandit Jr|MX|highflyer|f||a:30 mk:full mc:0 of:trunks oc:0 sk:9',
'Eddie Kingstown|US|brawler|f||a:44 h:short hc:0 b:full bd:stocky of:trunks oc:21 sk:0',
'Athena Ray|US|technician|h|f|a:37 h:long hc:0 of:singlet oc:21 o2:14 nk:belt sk:0',
'Deonna Purrazo|US|technician|f|f|a:31 h:long hc:5 of:singlet oc:3 o2:21 nk:belt sk:0',
'Red Velvett|US|strong|f|f|a:35 h:long hc:5 of:singlet oc:0 o2:21 nk:belt sk:3',
'Billie Starks|US|highflyer|f|f|a:22 h:long hc:0 of:singlet oc:4 o2:9 sk:0',
'Mina Shirakawa|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:9 o2:5 sk:5',
'Queen Aminata|US|technician|h|f|a:30 h:braids hc:0 of:singlet oc:9 o2:21 sk:3'
];
STB.roh=[['Mexcellence',['Bandito','Komandor','Bandit Jr']],['El Sky Squad',['Mistiko Jr','Mascara Doradah']],['The Lethal Twist',['Blake Christian','Jay Lethal','Lee Jonson']],['Premier Athletes',['Tony Nese','Ariya Davari','AR Fox']]];
CUR.str=[
'Suzu Suzuka|JP|brawler|f|f|a:26 h:short hc:2 of:singlet oc:7 o2:6 nk:belt sk:5',
'Hanan|JP|technician|f|f|a:27 h:long hc:0 of:singlet oc:9 o2:5 nk:belt sk:5',
'Ranna Yagami|JP|technician|f|f|a:21 h:pigtails hc:0 of:singlet oc:3 o2:5 nk:belt sk:5',
'Yuna Mizumori|JP|highflyer|f|f|a:20 h:pony hc:0 of:singlet oc:11 o2:5 nk:belt sk:5',
'AZM Hart|JP|highflyer|f|f|a:27 h:pigtails hc:3 of:singlet oc:9 o2:21 nk:belt sk:5',
'Miyu Amasaki|JP|technician|f|f|a:24 h:long hc:0 of:singlet oc:9 o2:0 sk:5',
'Aya Sakuraba|JP|technician|f|f|a:24 h:long hc:0 of:singlet oc:9 o2:5 sk:5',
'Sayaka Kurahara|JP|highflyer|f|f|a:24 h:long hc:0 of:singlet oc:3 o2:5 sk:5',
'Mayu Iwatami|JP|technician|f|f|a:33 h:pony hc:0 of:singlet oc:0 o2:5 sk:5',
'Saya Kamitane|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:4 o2:5 sk:5',
'Starlight Kidd|JP|highflyer|f|f|a:29 h:pony hc:3 of:singlet oc:1 o2:5 sk:5',
'Mei Seirah|JP|brawler|f|f|a:28 h:long hc:5 of:singlet oc:21 o2:0 sk:5',
'Hazuki Mori|JP|technician|f|f|a:31 h:bob hc:0 of:singlet oc:5 o2:9 sk:5',
'Natsupoi|JP|brawler|t|f|a:28 h:short hc:2 of:singlet oc:21 o2:9 sk:5',
'Koguma|JP|brawler|h|f|a:34 h:short hc:2 of:singlet oc:7 o2:21 sk:5',
'Konami|JP|technician|h|f|a:41 h:long hc:0 of:singlet oc:21 o2:0 sk:5',
'Maika Ozaki|JP|technician|h|f|a:28 h:long hc:6 of:singlet oc:21 o2:9 sk:5',
'Momo Watanabi|JP|technician|h|f|a:31 h:long hc:0 of:singlet oc:21 o2:9 sk:5',
'Utami Hayashisita|JP|powerhouse|f|f|a:32 h:long hc:0 of:singlet oc:7 o2:6 sk:5',
'Tam Nakamo|JP|technician|f|f|a:30 h:long hc:9 of:singlet oc:9 o2:6 sk:5',
'Thekla|DE|powerhouse|h|f|a:30 h:long hc:0 of:singlet oc:21 o2:4 sk:0',
'Waka Tsukiyama|JP|brawler|h|f|a:31 h:long hc:0 of:singlet oc:21 o2:9 sk:5',
'Hina|JP|highflyer|f|f|a:26 h:pony hc:5 of:singlet oc:11 sk:5'
];
STB.str=[['Neo Genesis',['AZM Hart','Miyu Amasaki']],['Cosmic Angels',['Aya Sakuraba','Sayaka Kurahara']],['Starburst Stars',['Mayu Iwatami','Saya Kamitane','Starlight Kidd','Hazuki Mori']],['Donna Del Universo',['Maika Ozaki','Natsupoi','Momo Watanabi']],['Edo Gang',['Utami Hayashisita','Tam Nakamo','Waka Tsukiyama']]];
// Rosters from user-provided roster lists (AEW, NJPW, TNA, AAA, CMLL, NOAH, AJPW, DDT, Dragon Gate, NWA, MLW). Names altered.
CUR.apw=[
'Will Osprey|GB|highflyer|f||a:33 h:undercut hc:3 b:stubble of:trunks oc:5 o2:0 nk:belt sk:6',
'Jon Moxlee|US|hardcore|t||a:40 h:shaggy hc:2 b:stubble of:vest oc:21 gr:tattoo nk:belt sk:0',
'Kazuchika Okata|JP|technician|h||a:38 h:slick hc:3 of:trunks oc:21 o2:0 nk:belt sk:5',
'Darby Allen|US|hardcore|f||a:33 h:short hc:0 fc:stripe of:pants oc:21 o2:5 gr:tattoo nk:belt sk:0',
'Tomaso Ciampo|US|brawler|h||a:40 h:slick hc:0 b:stubble of:trunks oc:21 o2:7 nk:belt sk:0',
'Andrade El Idolo|MX|technician|h||a:37 h:long hc:0 b:goatee of:trunks oc:21 o2:14 gr:tattoo sk:9',
'MJ Friedlander|US|technician|h||a:30 h:slick hc:0 of:robe oc:14 o2:21 sk:0',
'Hangman Paige|US|strong|f||a:34 h:long hc:2 b:full ac:cowboy of:vest oc:21 o2:6 sk:0',
'Kenji Omega|CA|highflyer|f||a:43 h:long hc:2 b:stubble of:pants oc:5 o2:14 sk:5',
'Swerve Stricklin|US|brawler|h||a:36 h:buzz b:goatee of:trunks oc:14 o2:21 gr:tattoo sk:3',
'Matt Jacksen|US|technician|f||a:41 h:long hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Nick Jacksen|US|highflyer|f||a:39 h:long hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Brian Danielsen|US|technician|f||a:45 h:long hc:2 b:long of:trunks oc:21 o2:5 sk:0',
'Orange Cassady|US|technician|t||a:41 h:long hc:2 ac:shades of:jacket oc:7 o2:6 sk:0',
'Claudio Castagnolo|DE|strong|h||a:45 h:short hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Konosuke Takeshite|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Kyle Fletch|AU|technician|h||a:29 h:buzz hc:3 b:stubble of:trunks oc:21 o2:7 sk:0',
'Mark Davies|GB|powerhouse|h||a:37 h:buzz b:full bd:big of:trunks oc:21 o2:0 sk:0',
'Brody Kingg|US|powerhouse|h||a:38 h:short hc:2 b:full bd:bulk of:vest oc:21 sk:0',
'Adam Coal|US|technician|h||a:38 h:side hc:2 b:stubble of:trunks oc:21 o2:14 sk:0',
'Adam Copland|CA|strong|f||a:52 h:long hc:3 b:stubble of:trunks oc:21 o2:5 sk:0',
'Chris Jerricho|CA|technician|h||a:55 h:long hc:6 of:jacket oc:14 o2:21 sk:0',
'Samoa Jo|US|strong|h||a:47 h:buzz b:soulpatch bd:big of:trunks oc:21 o2:6 gr:tattoo sk:3',
'Mark Briskoe|US|brawler|f||a:41 h:short hc:0 b:goatee of:shorts oc:0 o2:5 sk:3',
'Daniel Garsia|US|technician|f||a:28 h:short hc:2 of:trunks oc:21 o2:0 sk:0',
'Wheeler Yuto|US|technician|f||a:28 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Ricochet Jr|US|highflyer|f||a:38 h:mohawk hc:2 of:trunks oc:2 o2:21 sk:3',
'Bobby Lashly|US|powerhouse|f||a:50 h:bald bd:bulk of:trunks oc:0 sk:0',
'Austin Creeds|US|highflyer|f||a:30 h:short hc:0 of:trunks oc:4 o2:3 sk:3',
'Kofi Kingstown|US|highflyer|f||a:44 h:dreads hc:0 of:trunks oc:2 o2:3 sk:3',
'Cash Wheelor|US|technician|f||a:38 h:slick hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Dax Harwoode|US|technician|f||a:41 h:short hc:2 b:full of:trunks oc:21 o2:0 sk:0',
'Brian Caige|US|powerhouse|h||a:42 h:short hc:0 b:stubble bd:big of:trunks oc:21 o2:3 sk:0',
'Christian Caige|CA|technician|h||a:52 h:short hc:3 b:stubble of:trunks oc:21 o2:14 sk:0',
'Chris Sabbin|US|technician|f||a:43 h:short hc:2 b:stubble of:trunks oc:21 sk:0',
'Dante Martyn|US|highflyer|f||a:30 h:afro hc:0 of:trunks oc:3 o2:21 sk:3',
'Darius Martyn|US|highflyer|f||a:31 h:afro hc:0 of:trunks oc:3 o2:21 sk:3',
'David Finley|GB|strong|f||a:41 h:short hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Dustin Rhoades|US|brawler|f||a:57 h:slick hc:3 b:goatee of:trunks oc:21 o2:14 sk:0',
'Eddie Kingstone|US|brawler|f||a:44 h:short hc:0 b:full bd:stocky of:trunks oc:21 sk:0',
'Ilya Dragunoff|DE|strong|f||a:32 h:short hc:0 b:stubble of:trunks oc:21 o2:0 sk:0',
'Jay Whyte|AU|technician|h||a:33 h:short hc:3 b:stubble of:trunks oc:21 o2:3 sk:0',
'Jack Perri|US|highflyer|t||a:31 h:short hc:2 of:trunks oc:21 o2:5 sk:0',
'Kyle O\'Reilley|CA|technician|f||a:39 h:short hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Lance Archar|US|powerhouse|h||a:48 h:buzz b:full bd:big of:trunks oc:21 sk:0',
'Roderick Strang|US|strong|f||a:43 h:slick hc:2 b:stubble of:trunks oc:21 o2:0 sk:0',
'Sammy Guevera|US|highflyer|t||a:32 h:long hc:0 b:stubble of:trunks oc:21 o2:5 sk:9',
'Shelton Benjamen|US|technician|f||a:50 h:buzz hc:0 of:trunks oc:2 o2:21 sk:3',
'Wardlaw|US|powerhouse|t||a:37 h:buzz bd:bulk of:trunks oc:21 gr:tattoo sk:0',
'Hook Jr|US|technician|f||a:27 h:short hc:2 of:trunks oc:21 o2:0 sk:0',
'Orange Cassady Jr|US|technician|f||a:29 h:short hc:2 of:trunks oc:21 sk:0',
'Daniel Chrono|US|highflyer|f||a:30 h:short hc:2 of:trunks oc:21 sk:0',
'Evil Unno|US|technician|h||a:34 h:short hc:0 of:trunks oc:21 o2:0 sk:0',
'Mercedes Mon|US|technician|f|f|a:35 h:long hc:0 of:singlet oc:9 o2:14 nk:belt sk:9',
'Jamie Hayder|GB|brawler|h|f|a:32 h:long hc:6 of:singlet oc:21 o2:1 sk:0',
'Alex Windsore|GB|brawler|f|f|a:30 h:long hc:2 of:singlet oc:1 o2:0 sk:0',
'Willow Nightengale|US|powerhouse|f|f|a:32 h:long hc:5 bd:big of:singlet oc:9 o2:5 sk:0',
'Kris Statlandar|US|powerhouse|f|f|a:30 h:long hc:6 of:singlet oc:21 o2:3 gr:wristbands sk:0',
'Britt Bakar|US|technician|h|f|a:35 h:long hc:6 of:singlet oc:14 o2:0 sk:0',
'Hikaru Shidah|JP|strong|f|f|a:37 h:long hc:0 of:singlet oc:0 o2:5 sk:5',
'Julia Hartt|US|brawler|h|f|a:28 h:long hc:0 fc:warpaint of:singlet oc:21 o2:0 sk:0',
'Skye Blu|US|highflyer|f|f|a:27 h:long hc:10 of:singlet oc:11 sk:0',
'Thekla Von|DE|powerhouse|h|f|a:30 h:long hc:0 of:singlet oc:21 o2:4 sk:0',
'Queen Aminato|US|technician|h|f|a:30 h:braids hc:0 of:singlet oc:9 o2:21 nk:belt sk:3',
'Harley Cameroon|AU|highflyer|f|f|a:26 h:pigtails hc:5 of:singlet oc:9 sk:0',
'Megan Bayn|US|powerhouse|h|f|a:31 h:long hc:0 bd:big of:singlet oc:21 sk:3',
'Marina Shafer|US|brawler|h|f|a:38 h:long hc:2 of:singlet oc:21 o2:0 sk:0',
'Thunder Rose|US|brawler|f|f|a:39 h:long hc:0 of:singlet oc:6 o2:11 sk:9',
'Toni Stormm|AU|technician|f|f|a:31 h:bob hc:6 of:singlet oc:14 o2:9 sk:0',
'Lena Krossa|US|brawler|h|f|a:30 h:long hc:2 of:singlet oc:21 sk:0',
'Anna Jai|US|technician|f|f|a:27 h:long hc:2 of:singlet oc:21 o2:9 sk:0',
'Dani Lunna|US|powerhouse|h|f|a:30 h:long hc:0 of:singlet oc:21 bd:big sk:0',
'Penelope Forde|US|highflyer|f|f|a:30 h:long hc:3 of:singlet oc:9 sk:0'
];
STB.apw=[['The Callis Clan',['Will Osprey','Kyle Fletch','Konosuke Takeshite','Kazuchika Okata','Mark Davies']],['Blackpool Fight Club',['Jon Moxlee','Claudio Castagnolo','Wheeler Yuto','Marina Shafer']],['The Elite Squad',['Kenji Omega','Matt Jacksen','Nick Jacksen','Brian Danielsen']],['Hurt Hooligans',['Swerve Stricklin','Austin Creeds','Kofi Kingstown']],['Brawling Chicks',['Jamie Hayder','Alex Windsore']],['Triangle of Madness',['Julia Hartt','Skye Blu','Thekla Von']],['FTR Crew',['Cash Wheelor','Dax Harwoode']],['Dark Order Club',['Evil Unno','Hook Jr','Anna Jai']],['Top Flight',['Dante Martyn','Darius Martyn']]];
CUR.nnp=[
'Yota Tsuji|JP|technician|f||a:26 h:short hc:0 of:trunks oc:21 o2:0 nk:belt sk:5',
'Gabe Kid|GB|brawler|h||a:29 h:buzz b:stubble of:trunks oc:21 o2:6 nk:belt sk:0',
'Hiroshi Tanahasi|JP|technician|f||a:50 h:long hc:0 of:trunks oc:21 o2:14 sk:5',
'Tetsuya Naido|JP|technician|t||a:44 h:long hc:0 of:suit oc:21 o2:5 sk:5',
'SANADA|JP|technician|h||a:38 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:5',
'Shingo Takaki|JP|strong|t||a:44 h:slick hc:0 b:stubble of:trunks oc:3 o2:6 bd:big sk:5',
'Zack Saber Jr|GB|technician|h||a:39 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:6',
'Great-O-Kan|JP|powerhouse|h||a:43 h:topknot hc:0 of:vest oc:6 o2:0 bd:big mk:paint mc:0 sk:5',
'Henare|AU|strong|f||a:30 h:buzz b:full bd:big of:trunks oc:21 o2:0 sk:7',
'Aaron Wolfe|CA|strong|f||a:28 h:short hc:2 of:trunks oc:21 o2:5 nk:belt sk:0',
'YOH|JP|highflyer|f||a:35 h:short hc:0 of:trunks oc:21 o2:5 nk:belt sk:5',
'El Desparado|JP|highflyer|h||a:41 mk:full mc:6 of:trunks oc:21 o2:3 sk:5 bd:lean',
'Shun Skywalkar|JP|highflyer|f||a:28 h:short hc:0 of:trunks oc:2 sk:5',
'Oleg Boltin|DE|powerhouse|h||a:31 h:short hc:2 b:stubble bd:big of:trunks oc:21 o2:0 nk:belt sk:0',
'Yoshi-Hasi|JP|technician|h||a:43 h:short hc:0 of:trunks oc:21 o2:3 sk:5',
'Shota Umeno|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Hirooki Gotoh|JP|strong|f||a:46 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Tomohiro Ishi|JP|brawler|t||a:50 h:buzz of:trunks oc:21 o2:5 bd:stocky sk:5',
'Taiji Ishimore|JP|highflyer|h||a:42 h:spiky hc:0 of:trunks oc:21 o2:7 sk:5',
'Jeff Kobb|US|powerhouse|h||a:44 h:short hc:0 of:trunks oc:21 o2:14 bd:big sk:3',
'Toru Yanno|JP|brawler|h||a:47 h:short hc:0 of:suit oc:21 o2:3 sk:5',
'Togi Makabi|JP|powerhouse|f||a:52 h:buzz b:stubble bd:big of:trunks oc:21 sk:5',
'Tomoaki Honna|JP|brawler|f||a:49 h:short hc:0 of:trunks oc:21 sk:5',
'Yuji Nagatta|JP|strong|f||a:57 h:short hc:0 of:trunks oc:21 o2:14 sk:5',
'Satoshi Kojimba|JP|strong|f||a:55 h:buzz of:trunks oc:21 bd:big sk:5',
'Ryusuke Taguci|JP|technician|f||a:45 h:short hc:0 b:stubble of:trunks oc:21 o2:3 sk:5',
'Master Watto|JP|highflyer|f||a:30 h:spiky hc:0 of:trunks oc:21 o2:3 sk:5',
'Ren Narrita|JP|technician|f||a:34 h:short hc:0 of:trunks oc:21 sk:5',
'Yuya Uemuro|JP|technician|f||a:29 h:short hc:0 of:trunks oc:21 sk:5',
'Kosei Fujito|JP|technician|f||a:26 h:short hc:0 of:trunks oc:21 sk:5',
'Ryohei Oywa|JP|brawler|f||a:25 h:short hc:0 of:trunks oc:21 sk:5',
'Callum Newmann|AU|technician|f||a:30 h:short hc:2 of:trunks oc:21 sk:0',
'Robbie Eaglez|AU|highflyer|f||a:35 h:short hc:2 of:trunks oc:3 sk:0',
'Kushido|JP|technician|f||a:42 h:short hc:0 of:trunks oc:21 o2:0 sk:5',
'El Phantazmo|CA|highflyer|h||a:35 h:short hc:3 of:trunks oc:3 o2:21 sk:0',
'Chase Owenz|US|technician|h||a:43 h:short hc:0 b:stubble of:trunks oc:21 sk:0',
'Taichii|JP|technician|h||a:46 h:short hc:0 of:suit oc:21 o2:5 sk:5',
'Yujiro Takahasi|JP|brawler|h||a:46 h:slick hc:0 ac:shades of:suit oc:21 sk:5',
'Gedo|JP|technician|h||a:56 h:buzz of:suit oc:21 sk:5',
'Rocky Romano|US|technician|f||a:43 h:short hc:2 b:stubble of:trunks oc:1 sk:1',
'Hartley Jackzon|AU|powerhouse|h||a:35 h:short hc:2 b:full bd:big of:trunks oc:21 sk:7',
'Don Fall|US|powerhouse|h||a:42 h:short hc:0 bd:bulk of:trunks oc:21 sk:7',
'DOUKY|JP|technician|h||a:36 h:short hc:0 of:trunks oc:21 sk:5',
'TAKA Mikinoku|JP|technician|h||a:52 h:buzz hc:0 of:trunks oc:21 sk:5',
'Yoshinobu Kanemara|JP|technician|h||a:41 h:short hc:0 of:trunks oc:21 sk:5',
'Mima Shimoda|JP|technician|f|f|a:27 h:long hc:0 of:singlet oc:9 sk:5',
'Syuri|JP|strong|f|f|a:36 h:long hc:0 of:singlet oc:0 o2:21 nk:belt sk:5',
'Saya Kamitani|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:4 o2:5 sk:5'
];
STB.nnp=[['Los Ingovernables Japón',['Tetsuya Naido','SANADA','Shingo Takaki','Yuji Nagatta']],['United Dominion',['Great-O-Kan','Henare','Zack Saber Jr','Aaron Wolfe','Callum Newmann','Robbie Eaglez']],['Bullet Crew',['Jeff Kobb','Taiji Ishimore','Yujiro Takahasi','El Phantazmo','Chase Owenz','Hartley Jackzon','Gedo']],['Kaos',['Hirooki Gotoh','Tomohiro Ishi','Yoshi-Hasi','Toru Yanno','Tomoaki Honna']],['Hontai',['Hiroshi Tanahasi','Yuya Uemuro','Kosei Fujito','Ryohei Oywa','Ren Narrita']],['Taguchi Japan',['Ryusuke Taguci','Master Watto','Satoshi Kojimba']]];
CUR.cwe=[
'Leon Slayter|GB|highflyer|f||a:23 h:short hc:3 of:trunks oc:3 o2:21 nk:belt sk:0',
'Moos|CA|powerhouse|h||a:34 h:buzz b:goatee bd:big of:trunks oc:21 o2:7 sk:3',
'Nic Nemith|CA|technician|h||a:42 h:slick hc:1 b:stubble of:trunks oc:21 o2:14 nk:belt sk:0',
'Ryan Nemith|CA|technician|h||a:39 h:short hc:2 of:trunks oc:21 o2:14 sk:0',
'Jason Hotch|US|technician|f||a:34 h:short hc:2 of:trunks oc:1 sk:0',
'Amazing Red|US|highflyer|f||a:42 h:short hc:0 of:trunks oc:0 o2:5 sk:3',
'Frankie Kazarin|US|technician|f||a:47 h:short hc:0 of:trunks oc:21 o2:1 sk:9',
'Trey Migel|US|highflyer|f||a:34 h:long hc:2 of:trunks oc:3 o2:21 sk:0',
'Eddie Edwardz|US|technician|f||a:42 h:short hc:2 b:stubble of:trunks oc:1 o2:0 sk:0',
'Matt Hardee|US|technician|f||a:51 h:long hc:2 b:goatee of:pants oc:21 o2:5 sk:0',
'Jeff Hardee|US|highflyer|f||a:49 h:long hc:6 fc:warpaint of:pants oc:21 o2:5 sk:0',
'Mustafa Alee|US|highflyer|f||a:39 h:short hc:0 b:stubble of:trunks oc:3 o2:21 sk:7',
'Elijah Rey|US|brawler|t||a:42 h:long hc:2 b:full of:trunks oc:21 sk:0',
'Brian Myerz|US|technician|h||a:40 h:short hc:2 b:stubble of:suit oc:21 o2:14 sk:0',
'Cedric Alexandro|US|technician|f||a:36 h:short hc:0 of:trunks oc:3 o2:21 sk:3',
'Rich Swan|US|highflyer|f||a:35 h:short hc:0 of:trunks oc:21 o2:9 sk:3',
'Santino Marelli|IT|brawler|f||a:42 h:short hc:0 b:mustache of:trunks oc:0 o2:5 ac:fedora sk:1',
'Fabian Aichner|IT|strong|h||a:36 h:short hc:2 b:full of:trunks oc:21 o2:0 sk:1',
'Bear Bronzon|CA|powerhouse|h||a:36 h:long hc:1 b:full bd:bulk of:vest oc:21 sk:0',
'Joe Alonso|US|technician|f||a:32 h:short hc:2 of:trunks oc:21 sk:0',
'Zer0|US|hardcore|h||a:34 mk:half mc:21 of:trunks oc:21 sk:0',
'Joseph Sawyer|US|brawler|h||a:36 h:short hc:2 b:full of:trunks oc:21 o2:0 sk:0',
'BDE|US|technician|f||a:30 h:short hc:0 of:trunks oc:3 sk:3',
'Brian Johnston|US|technician|f||a:34 h:short hc:2 of:trunks oc:21 sk:0',
'AJ Franzis|US|powerhouse|h||a:40 h:bald b:full bd:big of:trunks oc:21 sk:3',
'Chris Bay|US|highflyer|f||a:30 h:short hc:0 of:trunks oc:21 o2:5 sk:3',
'Dutch Carr|US|brawler|h||a:50 h:bald b:full bd:stocky of:trunks oc:21 sk:0',
'The Hometown Man|CA|brawler|h||a:40 h:short hc:2 b:stubble of:vest oc:21 sk:0',
'John Skylar|US|technician|f||a:30 h:short hc:2 of:trunks oc:21 sk:0',
'KC Navarra|US|highflyer|f||a:30 h:short hc:0 of:trunks oc:21 sk:9',
'Matt Rehwald|US|technician|f||a:39 h:short hc:2 b:goatee of:trunks oc:21 sk:0',
'Ricky Sosso|US|technician|f||a:31 h:short hc:0 of:trunks oc:21 sk:9',
'Samuel Shawe|US|hardcore|h||a:37 h:long hc:0 b:full of:vest oc:21 sk:0',
'Vinny Marseglio|US|technician|h||a:35 h:slick hc:0 of:suit oc:21 sk:1',
'Mr. Elegence|US|technician|h||a:42 h:slick hc:0 b:stubble of:suit oc:9 sk:3',
'Indi Hartwel|AU|technician|f|f|a:34 h:long hc:6 of:singlet oc:9 o2:14 nk:belt sk:0',
'M by Elegance|US|technician|h|f|a:31 h:long hc:0 of:robe oc:9 o2:14 sk:3',
'Zoey Serano|US|brawler|f|f|a:29 h:long hc:0 of:singlet oc:21 o2:9 sk:0',
'Shayna Baszlar|US|brawler|h|f|a:45 h:long hc:2 of:singlet oc:21 o2:0 sk:0',
'Tasha Steelz|US|technician|f|f|a:32 h:braids hc:0 of:singlet oc:14 o2:9 sk:3',
'Rosemari|CA|hardcore|h|f|a:40 h:long hc:0 fc:warpaint of:leotard oc:21 sk:0',
'Ash by Elegence|US|technician|h|f|a:34 h:long hc:0 of:robe oc:9 sk:3',
'Gabby Forzo|US|brawler|f|f|a:29 h:long hc:5 of:singlet oc:21 o2:9 sk:0',
'Kiera Hogann|US|highflyer|f|f|a:35 h:long hc:6 of:singlet oc:9 o2:3 sk:0',
'Jada Stoun|US|powerhouse|h|f|a:30 h:braids hc:0 of:singlet oc:21 bd:big sk:3',
'Taryn Terell|US|technician|f|f|a:40 h:long hc:3 of:singlet oc:9 sk:0',
'Harley Hudsen|US|brawler|f|f|a:30 h:pony hc:2 of:singlet oc:21 sk:0',
'Heather by Elegence|US|technician|h|f|a:31 h:long hc:0 of:robe oc:9 sk:0',
'Alisha Edwardz|US|technician|f|f|a:38 h:long hc:2 of:singlet oc:9 sk:0',
'Allie Kay|CA|technician|f|f|a:30 h:long hc:5 of:singlet oc:3 o2:21 sk:0',
'Avery Stylez|US|technician|f|f|a:28 h:long hc:2 of:singlet oc:9 sk:0',
'Daria Ray|US|brawler|h|f|a:31 h:long hc:6 of:singlet oc:21 sk:0',
'Elayna Blake|US|technician|f|f|a:25 h:long hc:0 of:singlet oc:21 o2:9 sk:0',
'Gabby LaSpiza|US|technician|f|f|a:27 h:long hc:3 of:singlet oc:9 sk:0',
'KiLynn Kingg|US|brawler|f|f|a:28 h:long hc:2 of:singlet oc:21 sk:0',
'Lei Ying Li|CA|highflyer|f|f|a:30 h:long hc:0 of:singlet oc:0 sk:5',
'Mila Moor|US|technician|f|f|a:27 h:long hc:2 of:singlet oc:9 sk:0',
'Xia Brookeside|US|technician|f|f|a:30 h:long hc:0 of:singlet oc:9 sk:5'
];
STB.cwe=[['The System',['Moos','Eddie Edwardz','Brian Myerz','Alisha Edwardz']],['Nemith Brothers',['Nic Nemith','Ryan Nemith']],['The Elegence Collective',['Mr. Elegence','M by Elegance','Ash by Elegence','Heather by Elegence']],['Hardee Boyz',['Matt Hardee','Jeff Hardee']],['The Rascalz',['Trey Migel','Leon Slayter']],['Hotch Crew',['Jason Hotch','Joe Alonso']]];
CUR.lfl=[
'El Grande Americano|MX|lucha|h||a:36 mk:full mc:0 of:trunks oc:0 o2:5 nk:belt sk:9',
'El Hijo del Vikingo|MX|highflyer|f||a:30 mk:full mc:14 of:trunks oc:14 o2:21 sk:9 bd:lean',
'Damian Priest Jr|US|strong|h||a:43 h:bald b:full of:trunks oc:21 o2:0 sk:9',
'Psico Clown|MX|brawler|f||a:40 mk:paint mc:0 h:mohawk hc:5 of:vest oc:0 o2:6 bd:big sk:9',
'La Parca|MX|lucha|h||a:48 mk:skull of:trunks oc:21 o2:5 sk:9 bd:lean',
'Laredo Kidd|MX|highflyer|f||a:38 mk:full mc:1 of:trunks oc:1 o2:14 sk:9 bd:lean',
'Octagón Jr|MX|lucha|f||a:30 mk:full mc:3 of:trunks oc:3 o2:21 sk:9',
'Dr. Wagner Hijo|MX|lucha|f||a:40 mk:full mc:1 of:trunks oc:1 o2:5 sk:9',
'Galena|MX|highflyer|f||a:29 mk:full mc:7 of:trunks oc:7 o2:6 sk:9',
'Rayo Americano|MX|lucha|f||a:30 mk:full mc:0 of:trunks oc:0 o2:5 sk:9',
'Bravo Americano|MX|lucha|f||a:32 mk:full mc:1 of:trunks oc:1 o2:0 sk:9',
'Cruz Del Torro|MX|brawler|f||a:34 h:short hc:0 b:full of:trunks oc:0 sk:9',
'Axiom|US|technician|f||a:32 h:short hc:0 of:trunks oc:21 o2:5 sk:0',
'Nathan Frazier|GB|technician|f||a:27 h:short hc:3 of:trunks oc:1 sk:0',
'Joaquin Wilder|MX|highflyer|f||a:31 h:short hc:0 of:trunks oc:0 o2:5 sk:9',
'Chavo Guerreiro Jr|US|technician|f||a:54 h:short hc:0 b:stubble of:trunks oc:2 o2:3 sk:9',
'Rey Mysterio Jr|US|lucha|f||a:51 mk:full mc:1 of:pants oc:1 o2:5 sk:9 bd:lean',
'Lince Dorado|MX|highflyer|f||a:38 mk:half mc:14 of:trunks oc:14 o2:21 sk:9',
'Myzteziz Jr|MX|lucha|f||a:41 mk:full mc:1 of:trunks oc:1 o2:5 sk:9',
'El Texano Jr|MX|brawler|f||a:44 h:short hc:0 b:full ac:cowboy of:vest oc:21 sk:9',
'Pagano|MX|brawler|h||a:46 mk:full mc:6 of:trunks oc:21 o2:0 bd:big sk:9',
'Psicosis|MX|lucha|h||a:51 mk:full mc:3 of:trunks oc:3 o2:21 sk:9',
'Negro Cazas|MX|lucha|h||a:62 h:buzz b:full of:trunks oc:21 o2:5 sk:9',
'Sanson|MX|strong|f||a:35 h:buzz bd:big of:trunks oc:0 sk:9',
'Vampiro|CA|hardcore|h||a:58 h:long hc:0 fc:warpaint of:vest oc:21 sk:0',
'Epidemius Jr|MX|brawler|h||a:40 mk:full mc:0 of:trunks oc:21 sk:9',
'Murder Clown|MX|hardcore|h||a:42 mk:paint mc:0 h:mohawk hc:5 of:overalls oc:0 sk:9',
'Monster Clown|MX|hardcore|h||a:44 mk:paint mc:0 h:afro hc:5 of:overalls oc:0 bd:big sk:9',
'Panic Clown|MX|hardcore|h||a:38 mk:paint mc:0 of:overalls oc:3 sk:9',
'Noisy Boy|MX|brawler|h||a:35 h:short hc:0 of:vest oc:21 sk:9',
'Aero Star|MX|highflyer|f||a:35 mk:full mc:11 of:trunks oc:11 o2:3 sk:9 bd:lean',
'Taurus|MX|powerhouse|h||a:41 h:short hc:0 b:full bd:big of:trunks oc:0 sk:9',
'Chessman|MX|technician|h||a:36 h:slick hc:0 of:trunks oc:21 o2:5 sk:9',
'Hijo del Dr. Wagner|MX|lucha|f||a:38 mk:full mc:1 of:trunks oc:1 o2:14 sk:9',
'Garra de Oro|MX|brawler|h||a:37 h:short hc:0 gr:gloves of:trunks oc:14 sk:9',
'Colmillo de Plata|MX|brawler|h||a:40 mk:full mc:4 of:trunks oc:21 sk:9',
'La Catalina|MX|lucha|f|f|a:33 mk:half mc:9 h:long hc:0 of:singlet oc:9 sk:9',
'La Hiedra|MX|brawler|h|f|a:36 h:long hc:0 of:singlet oc:2 o2:21 sk:9',
'Faby Apache|MX|technician|f|f|a:37 h:long hc:0 of:singlet oc:9 o2:3 sk:9',
'Lady Shani|MX|technician|f|f|a:30 h:long hc:0 of:singlet oc:21 o2:9 sk:9',
'Dulce Kanela|MX|highflyer|f|f|a:28 h:pigtails hc:9 of:singlet oc:9 sk:9',
'Reina Dorada|MX|lucha|f|f|a:30 mk:half mc:14 h:long hc:3 of:singlet oc:14 sk:9',
'Vero Rodrigez|MX|technician|f|f|a:35 h:long hc:0 of:singlet oc:21 sk:9',
'Lady Maravilla|MX|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:3 o2:9 sk:9'
];
STB.lfl=[['La Facción Rebelde',['Psico Clown','Murder Clown','Monster Clown','Panic Clown']],['Los Americanos',['El Grande Americano','Rayo Americano','Bravo Americano']],['Judgment Night Mexico',['Damian Priest Jr','Chessman']],['Los Hijos de la Lucha',['Dr. Wagner Hijo','Hijo del Dr. Wagner','Laredo Kidd']]];
CUR.cul=[
'Mistiko|MX|lucha|f||a:45 mk:full mc:1 of:trunks oc:1 o2:5 sk:9 bd:lean nk:belt',
'Mascara Doradah Jr|MX|lucha|f||a:41 mk:full mc:14 of:trunks oc:14 o2:21 sk:9 nk:belt',
'Hechicero Jr|MX|lucha|h||a:36 mk:full mc:6 of:trunks oc:4 o2:21 sk:9 nk:belt',
'Templaro|MX|lucha|h||a:35 mk:full mc:21 of:trunks oc:21 o2:15 sk:9 bd:stocky',
'Titan|MX|lucha|f||a:30 mk:full mc:3 of:trunks oc:3 o2:21 sk:9',
'Volador Jr|MX|lucha|f||a:39 mk:full mc:1 of:trunks oc:21 o2:3 sk:9 bd:lean',
'Atlantys Jr|MX|lucha|f||a:41 mk:full mc:0 of:trunks oc:2 o2:5 sk:9',
'Komandor Jr|MX|highflyer|f||a:24 mk:full mc:3 of:trunks oc:3 o2:21 sk:9 bd:lean',
'Flip Gordone|US|highflyer|h||a:35 h:short hc:3 of:trunks oc:3 o2:21 sk:0',
'Shoma Kata|JP|technician|f||a:30 h:short hc:0 of:trunks oc:21 sk:5',
'Robbie X|AU|highflyer|f||a:33 h:short hc:2 of:trunks oc:0 sk:0',
'Último Guerrera|MX|lucha|h||a:42 mk:full mc:6 of:trunks oc:21 o2:0 sk:9 bd:stocky',
'Blue Pantera|MX|lucha|f||a:60 mk:full mc:1 of:pants oc:1 o2:5 sk:9',
'Soberano Jr|MX|lucha|f||a:31 mk:full mc:14 of:trunks oc:14 o2:21 sk:9 bd:lean',
'Dragón Rojo Jr|MX|lucha|h||a:41 mk:full mc:0 of:trunks oc:0 o2:21 sk:9',
'Stuca Jr|MX|lucha|f||a:39 mk:full mc:0 of:trunks oc:0 o2:5 sk:9',
'Diamante Azur|MX|lucha|f||a:40 mk:full mc:11 of:trunks oc:11 o2:5 sk:9',
'Mefisto|MX|lucha|h||a:36 mk:full mc:21 of:trunks oc:21 o2:0 sk:9',
'Persefone|US|technician|f|f|a:28 h:long hc:0 of:singlet oc:4 o2:9 nk:belt sk:0',
'Tessa Blanchart|US|technician|h|f|a:31 h:long hc:6 of:singlet oc:21 o2:9 sk:0',
'Marsela|MX|lucha|f|f|a:30 mk:half mc:0 h:long hc:0 of:singlet oc:0 o2:5 sk:9'
];
STB.cul=[['Los Guerreros del Desierto',['Último Guerrera','Mefisto','Templaro']],['Los Infernales',['Hechicero Jr','Dragón Rojo Jr','Diamante Azur']],['El Sky Squad',['Mistiko','Mascara Doradah Jr']]];
CUR.ark=[
'Tetsuya Naido Jr|JP|technician|t||a:44 h:long hc:0 of:suit oc:21 o2:5 nk:belt sk:5',
'Shuji Kondoh|JP|strong|f||a:51 h:short hc:0 of:trunks oc:21 nk:belt sk:5',
'Kaito Kiyomiya|JP|strong|f||a:29 h:short hc:0 of:trunks oc:1 o2:5 sk:5',
'Kenoh|JP|strong|f||a:41 h:long hc:0 of:trunks oc:21 o2:5 sk:5',
'KENTA Kobayasi|JP|brawler|h||a:44 h:short hc:0 of:trunks oc:21 o2:6 sk:5',
'Naomichi Marufuzi|JP|highflyer|f||a:46 h:short hc:0 of:trunks oc:1 o2:5 sk:5',
'Takashi Sugiyura|JP|technician|t||a:49 h:buzz b:stubble of:trunks oc:21 sk:5',
'Masato Tanaki|JP|brawler|t||a:49 h:short hc:0 of:trunks oc:21 o2:6 sk:5',
'Katsuhiko Nakajima|JP|brawler|h||a:37 h:buzz of:trunks oc:21 o2:3 sk:5',
'Kazuyuki Fujitta|JP|brawler|h||a:55 h:buzz b:stubble of:trunks oc:21 sk:5',
'Takeshi Rikyo|JP|powerhouse|h||a:48 h:buzz bd:big of:trunks oc:21 sk:5',
'Yoshiki Inamura|JP|powerhouse|f||a:37 h:buzz bd:big of:trunks oc:2 sk:5',
'Mohammed Yone|JP|powerhouse|f||a:31 h:buzz b:full bd:big of:trunks oc:21 o2:3 sk:3',
'Atsushi Kotogi|JP|brawler|h||a:41 h:short hc:0 of:trunks oc:21 sk:5',
'Amakuza|JP|highflyer|f||a:36 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Bushi|JP|technician|h||a:42 mk:full mc:21 of:trunks oc:21 o2:0 sk:5',
'Hi69|JP|technician|f||a:34 h:short hc:0 of:trunks oc:21 sk:5',
'Ozawa|JP|brawler|f||a:34 h:short hc:0 of:trunks oc:21 sk:5',
'Super Crazy|MX|highflyer|h||a:51 h:mohawk hc:0 of:trunks oc:21 o2:3 sk:9',
'Yoshitatsu|JP|technician|f||a:46 h:short hc:0 of:trunks oc:21 sk:5',
'Mikey Nicolls|AU|technician|f||a:44 h:short hc:2 of:trunks oc:1 sk:0',
'Shane Hastie|AU|technician|f||a:41 h:short hc:2 of:trunks oc:1 sk:0',
'Saxon Huxly|AU|powerhouse|h||a:37 h:buzz b:full of:trunks oc:21 sk:0',
'Doc Gallowz|US|brawler|h||a:40 h:bald b:full of:vest oc:21 sk:0',
'Karl Andersen|US|technician|h||a:37 h:short hc:3 b:stubble of:trunks oc:21 sk:0',
'Miray|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:9 nk:belt sk:5'
];
STB.ark=[['Kongo Force',['Kenoh','Kaito Kiyomiya','Katsuhiko Nakajima','Yoshiki Inamura','Mohammed Yone']],['Los Ingovernables NOAH',['Tetsuya Naido Jr','Bushi']],['Mad Dogs',['Doc Gallowz','Karl Andersen']],['Funky Dojo',['Atsushi Kotogi','Amakuza','Hi69']]];
CUR.rsp=[
'Go Shiozaky|JP|strong|f||a:38 h:short hc:0 of:trunks oc:21 o2:5 nk:belt sk:5',
'Hideki Suzuky|JP|technician|h||a:54 h:short hc:0 of:trunks oc:21 sk:5',
'Davey Boy Smith Jr|GB|technician|f||a:40 h:short hc:3 b:stubble of:trunks oc:21 o2:1 sk:0',
'Masanobu Fuchi|JP|technician|f||a:70 h:short hc:4 of:trunks oc:21 sk:5',
'Kuroshio Tokyo Japan|JP|brawler|h||a:40 h:buzz of:trunks oc:21 sk:5',
'Oddyssey|JP|highflyer|f||a:30 h:short hc:0 of:trunks oc:21 sk:5',
'Talos|JP|powerhouse|h||a:40 h:buzz b:full bd:big of:trunks oc:21 sk:5',
'Xyon|JP|technician|f||a:34 h:short hc:0 of:trunks oc:21 sk:5'
];
CUR.dtt=[
'Konosuke Takeshima|JP|technician|f||a:31 h:short hc:0 of:trunks oc:21 o2:5 sk:5',
'Kota Ibushy|JP|highflyer|f||a:43 h:long hc:0 of:trunks oc:3 o2:21 sk:5',
'Mike Baily|CA|highflyer|f||a:37 h:short hc:2 of:trunks oc:21 o2:3 sk:0',
'Ethan Paige Jr|GB|technician|t||a:38 h:short hc:3 of:trunks oc:21 o2:5 sk:0',
'Daiki Nagay|JP|technician|f||a:36 h:short hc:0 of:trunks oc:21 sk:5',
'Dick Togo Jr|JP|brawler|h||a:50 h:short hc:0 b:stubble of:trunks oc:21 sk:5',
'Hartley Jackson|AU|powerhouse|h||a:35 h:short hc:2 b:full bd:big of:trunks oc:21 sk:7',
'Atsushi Aoky|JP|technician|f||a:36 h:short hc:0 of:trunks oc:1 sk:5',
'Yuki Sato|JP|technician|f||a:34 h:short hc:0 of:trunks oc:21 sk:5',
'Joey Janella|US|hardcore|t||a:38 h:short hc:0 b:stubble of:trunks oc:21 gr:tattoo sk:0',
'Minoru Tanaki|JP|technician|h||a:55 h:buzz of:trunks oc:21 sk:5',
'El Generico Jr|CA|technician|f||a:44 h:short hc:2 mk:half mc:0 of:trunks oc:0 sk:0',
'Ricky Starkz|US|technician|h||a:35 h:slick hc:2 of:trunks oc:21 sk:3',
'Matt Cardonna|US|technician|h||a:41 h:short hc:0 b:stubble of:trunks oc:21 o2:5 sk:0',
'Naomichi Marufuji Jr|JP|highflyer|f||a:46 h:short hc:0 of:trunks oc:21 sk:5',
'Great Sasuki|JP|highflyer|h||a:55 mk:full mc:0 of:trunks oc:0 sk:5',
'Masahiro Inoue|JP|brawler|f||a:50 h:buzz of:trunks oc:21 sk:5',
'Yoshitatsu Jr|JP|technician|f||a:46 h:short hc:0 of:trunks oc:21 sk:5',
'Mr. Pogo|JP|hardcore|h||a:56 h:bald b:full bd:big of:vest oc:21 sk:5',
'Kazushi Sakurabo|JP|technician|f||a:57 h:bald of:trunks oc:21 sk:5',
'Maki Itoh|JP|brawler|h|f|a:29 h:pigtails hc:0 of:singlet oc:9 sk:5',
'Yuka Sakazaky|JP|highflyer|f|f|a:34 h:long hc:0 of:singlet oc:9 sk:5',
'Mina Shiraishi|JP|highflyer|f|f|a:29 h:long hc:0 of:singlet oc:9 o2:5 sk:5',
'Candice LeRay|US|technician|f|f|a:38 h:long hc:2 of:singlet oc:9 sk:0',
'Meiko Satomure|JP|strong|f|f|a:47 h:long hc:0 of:singlet oc:21 sk:5',
'Aja Kong|JP|powerhouse|h|f|a:55 h:long hc:0 bd:bulk of:singlet oc:21 sk:5',
'Kana|JP|technician|f|f|a:35 h:long hc:0 of:singlet oc:21 sk:5'
];
CUR.drg=[
'YAMATTO|JP|strong|f||a:38 h:short hc:0 of:trunks oc:1 o2:21 nk:belt sk:5',
'Kzy|JP|technician|h||a:41 h:short hc:0 of:trunks oc:21 sk:5',
'Kota Minoura|JP|highflyer|f||a:35 h:short hc:0 of:trunks oc:0 sk:5',
'Yuki Yoshioka|JP|technician|f||a:28 h:short hc:0 of:trunks oc:21 sk:5',
'Ben-Kay|JP|highflyer|f||a:31 h:short hc:0 of:trunks oc:3 sk:5',
'BIG BOSS Shimizo|JP|powerhouse|h||a:44 h:buzz bd:bulk of:trunks oc:21 sk:5',
'Naruki Doi Jr|JP|brawler|h||a:41 h:short hc:0 of:trunks oc:21 sk:5',
'Dragon Kidd|JP|highflyer|f||a:46 mk:full mc:0 of:trunks oc:0 o2:5 sk:5',
'Susumu Yokosuko|JP|technician|f||a:45 h:buzz of:trunks oc:1 sk:5',
'Masaaki Mochizuku|JP|technician|f||a:46 h:short hc:0 of:trunks oc:21 sk:5',
'B×B Hulk|JP|powerhouse|h||a:48 h:buzz of:trunks oc:21 bd:big sk:5',
'Último Dragón Jr|JP|technician|f||a:55 mk:full mc:3 of:trunks oc:3 sk:5',
'KAI|JP|highflyer|f||a:38 h:short hc:0 of:trunks oc:21 sk:5',
'ISHIN|JP|technician|h||a:37 h:short hc:0 of:trunks oc:21 sk:5',
'Luis Mantey|JP|technician|f||a:33 h:short hc:0 of:trunks oc:21 sk:5',
'Madoka Kikuta|JP|technician|f||a:34 h:short hc:0 of:trunks oc:21 sk:5',
'U-T|JP|brawler|t||a:32 h:short hc:0 of:trunks oc:21 sk:5',
'Don Fuji|JP|strong|h||a:60 h:buzz of:trunks oc:21 sk:5',
'Genki Horigucchi|JP|brawler|h||a:48 h:short hc:0 of:trunks oc:21 sk:5',
'Jason Lea|US|brawler|h||a:33 h:short hc:2 of:trunks oc:21 sk:0',
'Jacky Kamey|JP|technician|f||a:36 h:short hc:0 of:trunks oc:21 sk:5',
'H・Y・O|JP|highflyer|f||a:39 h:short hc:0 of:trunks oc:21 sk:5',
'Strong Machine J|JP|brawler|h||a:41 mk:full mc:21 of:trunks oc:21 sk:5'
];
STB.drg=[['Natural Vibes',['Dragon Kidd','Kota Minoura','Yuki Yoshioka']],['Love & Peace Squad',['YAMATTO','Kzy','Naruki Doi Jr']],['Gajadokuro Crew',['Strong Machine J','Don Fuji','Genki Horigucchi']],['Xenis Unit',['Susumu Yokosuko','Masaaki Mochizuku']],['Paradox Team',['Ben-Kay','KAI','ISHIN']],['Bang Bang Piero',['H・Y・O','Jacky Kamey']]];
CUR.nwc=[
'Thrillbilly Silas Mason|US|brawler|h||a:34 h:long hc:2 b:full of:overalls oc:20 o2:0 nk:belt sk:0',
'Tiffany Nievez|US|technician|f|f|a:30 h:long hc:5 of:singlet oc:9 o2:14 nk:belt sk:0',
'Bryan Idle|US|technician|f||a:38 h:short hc:3 of:trunks oc:21 o2:5 nk:belt sk:0',
'Alex Mizery|US|technician|h||a:34 h:slick hc:0 of:suit oc:6 o2:14 nk:belt sk:0',
'AJ Cazano|US|technician|f||a:33 h:short hc:2 of:trunks oc:21 o2:3 sk:0',
'KC Cazano|US|technician|f||a:31 h:short hc:2 of:trunks oc:21 o2:3 sk:0',
'Dalton McKenzy|US|highflyer|f||a:30 h:short hc:2 of:trunks oc:0 sk:0',
'Jack Vaughan|US|brawler|f||a:31 h:short hc:3 of:trunks oc:1 sk:0',
'Jeremiah Plunket|US|brawler|h||a:34 h:buzz b:full of:trunks oc:21 sk:0',
'King Trevor Murdock|US|technician|h||a:45 h:short hc:0 b:stubble ac:cowboy of:suit oc:21 sk:0',
'Thom Latimar|US|technician|h||a:42 h:short hc:2 of:suit oc:21 sk:0',
'Mike Knoxx|US|strong|f||a:42 h:short hc:1 b:full of:trunks oc:1 sk:0',
'Aron Stevenz|US|technician|h||a:41 h:short hc:0 b:stubble of:suit oc:21 sk:0',
'Austin Idol Jr|US|technician|f||a:34 h:long hc:3 of:trunks oc:3 sk:0',
'Doc Gallows Jr|US|brawler|h||a:41 h:bald b:full of:vest oc:21 sk:0',
'Karl Anderson Jr|US|technician|h||a:38 h:short hc:3 of:trunks oc:21 sk:0',
'Alex Taylor|US|technician|f||a:30 h:short hc:2 of:trunks oc:1 sk:0',
'Eric Smaller|US|brawler|h||a:32 h:short hc:0 of:trunks oc:21 sk:0',
'Kerry Morten|US|technician|f||a:40 h:long hc:3 of:trunks oc:2 o2:21 sk:0',
'Ricky Morten|US|technician|f||a:59 h:long hc:3 of:trunks oc:2 sk:0',
'Wrecking Ball Legursky|US|powerhouse|h||a:42 h:short hc:2 bd:bulk of:singlet oc:21 sk:0',
'Slade|US|powerhouse|h||a:33 h:buzz bd:big of:trunks oc:21 sk:0',
'Odinson|US|powerhouse|h||a:36 h:long hc:3 b:full bd:big of:vest oc:21 sk:0',
'The Pope|US|technician|h||a:42 h:slick hc:0 b:stubble of:suit oc:21 sk:3',
'Pat Kenny|US|technician|h||a:35 h:short hc:2 of:trunks oc:21 sk:0',
'Mims|US|hardcore|h||a:30 h:short hc:0 of:trunks oc:21 sk:0',
'Daisy Kil|US|hardcore|h|f|a:28 h:long hc:0 fc:warpaint of:singlet oc:21 sk:0',
'Allysin Kai|US|technician|f|f|a:34 h:long hc:5 of:singlet oc:21 o2:9 sk:0',
'Kenzie Paige|US|technician|f|f|a:26 h:long hc:3 of:singlet oc:9 sk:0',
'Kylie Paige|US|technician|f|f|a:28 h:long hc:3 of:singlet oc:9 sk:0',
'Natalia Marcova|US|brawler|h|f|a:30 h:long hc:0 of:singlet oc:21 sk:0',
'Marti Bell|US|technician|f|f|a:30 h:long hc:2 of:singlet oc:21 sk:0',
'Gisele Shaww|US|brawler|f|f|a:30 h:long hc:2 of:singlet oc:9 sk:0',
'Miss Star|US|technician|f|f|a:33 h:long hc:3 of:singlet oc:9 sk:0'
];
STB.nwc=[['Country Gentlemen',['Jeremiah Plunket','King Trevor Murdock','Thom Latimar']],['The Cazano Family',['AJ Cazano','KC Cazano']],['Mims Crew',['Mims','Daisy Kil']],['Good Brothers Rejects',['Doc Gallows Jr','Karl Anderson Jr']]];
CUR.mlw=[
'Killer Kross|US|powerhouse|h||a:40 h:bald b:full bd:big of:trunks oc:21 gr:tattoo nk:belt sk:0',
'Alex Hammerstone|US|powerhouse|h||a:36 h:long hc:2 b:full bd:big of:trunks oc:21 sk:0',
'Austin Aries|US|technician|h||a:47 h:short hc:2 b:stubble of:trunks oc:2 nk:belt sk:0',
'Matt Riddel|US|brawler|f||a:40 h:long hc:2 b:full ac:headband of:trunks oc:21 sk:0',
'Trevor Lea|US|technician|f||a:39 h:short hc:2 b:stubble of:trunks oc:0 sk:0',
'Joe Coffy|US|powerhouse|h||a:37 h:buzz b:full bd:big of:trunks oc:21 sk:0',
'Mark Coffy|US|powerhouse|h||a:38 h:short hc:2 b:full bd:big of:trunks oc:21 sk:0',
'Donovan Dijak|US|technician|f||a:36 h:short hc:0 bd:big of:trunks oc:21 o2:5 sk:3',
'Andrew Everet|US|highflyer|f||a:33 h:short hc:2 of:trunks oc:1 sk:0',
'Jesús Rodrigez|MX|brawler|f||a:32 h:short hc:0 of:trunks oc:0 sk:9',
'Alan Angles|US|highflyer|f||a:29 h:short hc:2 of:trunks oc:3 sk:0',
'Big Damo|GB|powerhouse|h||a:37 h:buzz b:full bd:bulk of:trunks oc:21 sk:0',
'Wolfgang|GB|brawler|h||a:35 h:short hc:3 b:stubble of:trunks oc:21 sk:0',
'Bill Alfonzo|US|technician|h||a:62 h:bald b:mustache of:suit oc:21 sk:0',
'Masha Slamovitch|US|hardcore|t|f|a:32 h:long hc:0 of:singlet oc:21 o2:0 gr:tattoo sk:0',
'Priscilla Kelley|US|technician|f|f|a:30 h:long hc:2 of:singlet oc:9 sk:0',
'Scarlett Bordeux|US|technician|h|f|a:32 h:long hc:3 of:singlet oc:21 o2:5 sk:0',
'Shotzi Blackhart|US|brawler|f|f|a:32 h:long hc:6 of:singlet oc:21 o2:9 sk:0'
];
STB.mlw=[['Contra Squad',['Killer Kross','Alex Hammerstone','Joe Coffy','Mark Coffy']]];
// ROH + Stardom rosters (from user lists, names altered)
CUR.roh=[
'Aaron Solowe|US|technician|f||a:31 sk:0 h:undercut hc:2 of:trunks oc:1 o2:21 gr:tattoo ',
'Ace Austen|CA|highflyer|f||a:29 sk:0 h:undercut hc:3 b:full of:trunks oc:21 o2:0 ',
'Action Andretty|US|highflyer|f||a:29 sk:0 h:slick hc:0 b:full of:trunks oc:21 o2:0 ',
'Adam Priestt|US|technician|f||a:33 sk:3 h:spiky hc:0 of:trunks oc:21 o2:7 gr:tattoo ',
'Alan Angelz|US|highflyer|f||a:29 sk:0 h:short hc:0 of:trunks oc:14 o2:7 ',
'Alec Pryce|US|technician|f||a:28 sk:9 h:undercut hc:0 b:goatee of:trunks oc:14 o2:21 ',
'Alex Reynoldz|US|technician|f||a:34 sk:3 h:short hc:0 b:stubble of:trunks oc:21 o2:5 ',
'Alex Zaine|US|highflyer|f||a:34 sk:0 h:shaggy hc:2 b:full of:trunks oc:21 o2:0 ',
'Angélico Jr|MX|highflyer|f||a:42 sk:9 h:short hc:2 of:trunks oc:21 o2:21 ',
'Anthony Henri|US|technician|f||a:30 sk:3 h:long hc:2 of:trunks oc:21 o2:0 ',
'Anthony Ogogu|GB|brawler|f||a:37 sk:0 h:slick hc:0 of:trunks oc:21 o2:7 ',
'AR Fax|US|highflyer|f||a:38 sk:0 h:long hc:0 b:goatee of:trunks oc:14 o2:0 gr:tattoo ',
'Ariya Davari|US|technician|f||a:37 sk:7 h:bald of:trunks oc:21 o2:5 gr:tattoo ',
'Bandido Jr|MX|lucha|f||a:31 sk:9 of:trunks oc:21 o2:7 mk:full mc:0 ',
'The Beast Mortoz|US|powerhouse|f||a:35 sk:0 h:undercut hc:2 bd:big of:trunks oc:3 o2:7 ',
'BEEF Boy|US|brawler|f||a:30 sk:7 h:long hc:3 of:trunks oc:14 o2:5 ',
'Blake Christien|US|highflyer|f||a:29 sk:0 h:short hc:0 b:mustache of:trunks oc:21 o2:5 gr:tattoo ',
'Bobby Cruize|US|technician|f||a:34 sk:0 h:long hc:0 of:trunks oc:21 o2:0 ',
'Brian Kage|US|powerhouse|f||a:41 sk:0 h:undercut hc:0 bd:big of:trunks oc:21 o2:21 ',
'Bryan Keyth|US|technician|f||a:36 sk:0 h:shaggy hc:0 b:mustache of:trunks oc:1 o2:21 ',
'Caprice Colman|US|technician|f||a:40 sk:0 h:long hc:3 of:trunks oc:21 o2:7 gr:tattoo ',
'Christian XO|US|technician|f||a:33 sk:0 h:bald of:trunks oc:0 o2:21 ',
'Cole Carter|US|technician|f||a:30 sk:1 h:buzz hc:2 of:trunks oc:21 o2:21 ',
'Colt Cabanna|US|technician|f||a:44 sk:9 h:bald of:trunks oc:0 o2:5 ',
'Dalton Castel|US|technician|f||a:39 sk:0 h:short hc:0 b:mustache of:trunks oc:3 o2:7 ',
'Dante Martinn|US|highflyer|f||a:30 sk:0 h:buzz hc:0 of:trunks oc:1 o2:7 ',
'Darius Martinn|US|highflyer|f||a:31 sk:3 h:long hc:0 of:trunks oc:21 o2:5 gr:tattoo ',
'Dralistico Jr|MX|lucha|f||a:32 sk:1 of:trunks oc:21 o2:5 mk:full mc:21 ',
'Dustin Rodes|US|brawler|f||a:57 sk:1 h:long hc:3 b:stubble of:trunks oc:21 o2:21 ',
'Eddie Colonn|US|technician|f||a:44 sk:0 h:side hc:0 of:trunks oc:3 o2:7 ',
'Eddie Kingstown|US|brawler|f||a:44 sk:7 h:bald of:trunks oc:14 o2:0 ',
'Evil Oono|US|technician|f||a:34 sk:1 h:bald of:trunks oc:0 o2:21 ',
'Griff Garrisen|US|technician|f||a:29 sk:3 h:buzz hc:0 b:mustache of:trunks oc:21 o2:0 ',
'Hyan Jr|ES|highflyer|f||a:26 sk:1 h:buzz hc:2 b:goatee of:trunks oc:0 o2:21 ',
'Jacked Jamison|US|powerhouse|f||a:33 sk:9 h:slick hc:0 b:goatee bd:big of:trunks oc:21 o2:21 ',
'James Drayk|US|technician|f||a:33 sk:0 h:undercut hc:0 b:stubble of:trunks oc:21 o2:21 ',
'Jay Lethel|US|technician|f||a:40 sk:3 h:undercut hc:0 b:goatee of:trunks oc:0 o2:7 ',
'JD Drayk|US|technician|f||a:33 sk:7 h:long hc:0 b:full of:trunks oc:21 o2:7 gr:tattoo ',
'Jerry Lynne|US|technician|f||a:62 sk:9 h:buzz hc:0 of:trunks oc:0 o2:5 ',
'John Silvar|US|brawler|f||a:36 sk:0 h:long hc:0 b:stubble of:trunks oc:0 o2:0 ',
'Jordan Olivar|US|highflyer|f||a:29 sk:0 h:short hc:0 of:trunks oc:14 o2:5 ',
'Josh Woodz|US|technician|f||a:34 sk:0 h:slick hc:2 b:mustache of:trunks oc:0 o2:21 gr:tattoo ',
'Komandero|MX|highflyer|f||a:25 sk:1 h:spiky hc:3 b:mustache of:trunks oc:3 o2:21 ',
'Lance Arker|US|powerhouse|f||a:48 sk:0 h:long hc:3 b:mustache bd:big of:trunks oc:0 o2:21 ',
'Lee Johnsen|US|technician|f||a:33 sk:9 h:buzz hc:2 b:stubble of:trunks oc:0 o2:5 ',
'Lee Moriarti|US|technician|f||a:29 sk:3 h:short hc:0 of:trunks oc:21 o2:21 ',
'Lio Rusch|US|highflyer|f||a:30 sk:0 h:shaggy hc:3 of:trunks oc:1 o2:21 ',
'Main Man Oroo|US|strong|f||a:30 sk:0 h:slick hc:3 of:trunks oc:21 o2:0 ',
'Mance Warnar|US|hardcore|f||a:38 sk:0 h:short hc:3 of:trunks oc:21 o2:21 ',
'Mansour|GB|powerhouse|f||a:31 sk:0 h:undercut hc:3 bd:big of:trunks oc:3 o2:21 ',
'Mark Briscoo|US|brawler|f||a:41 sk:9 h:short hc:0 b:full of:trunks oc:21 o2:21 ',
'Mark Davys|US|powerhouse|f||a:38 sk:1 h:side hc:2 b:goatee bd:big of:trunks oc:1 o2:7 ',
'Marshall von Erik|US|brawler|f||a:29 sk:3 h:spiky hc:0 of:trunks oc:21 o2:0 gr:tattoo ',
'Ross von Erik|US|brawler|f||a:30 sk:0 h:shaggy hc:0 of:trunks oc:14 o2:5 gr:tattoo ',
'Mason Maddin|US|technician|f||a:27 sk:0 h:undercut hc:3 of:trunks oc:14 o2:7 gr:tattoo ',
'Matt Menarde|US|technician|f||a:40 sk:0 h:slick hc:3 b:full of:trunks oc:0 o2:21 ',
'Matt Tavan|US|technician|f||a:39 sk:3 h:short hc:2 b:goatee of:trunks oc:1 o2:21 ',
'Mike Benett|US|technician|f||a:40 sk:0 h:long hc:3 of:trunks oc:14 o2:5 ',
'Mascara Dorado|MX|lucha|f||a:39 sk:9 of:trunks oc:21 o2:7 mk:full mc:14 ',
'Místico X|MX|lucha|f||a:45 sk:9 of:trunks oc:3 o2:21 mk:full mc:3 ',
'Nick Comorotto|US|powerhouse|f||a:31 sk:0 h:undercut hc:0 bd:big of:trunks oc:21 o2:0 gr:tattoo ',
'Nigel McGinnes|GB|technician|f||a:50 sk:1 h:buzz hc:0 of:trunks oc:1 o2:5 ',
'Orlando Colonn|US|technician|f||a:36 sk:0 h:spiky hc:2 of:trunks oc:1 o2:21 ',
'Ortis|US|brawler|f||a:34 sk:0 h:short hc:2 of:trunks oc:21 o2:5 ',
'Paul Wite|US|powerhouse|f||a:54 sk:7 h:slick hc:0 bd:big of:trunks oc:3 o2:21 gr:tattoo ',
'Preston Vanse|US|powerhouse|f||a:36 sk:0 h:shaggy hc:2 b:full bd:big of:trunks oc:21 o2:5 ',
'Rocky Romerro|US|technician|f||a:43 sk:7 h:shaggy hc:0 of:trunks oc:21 o2:7 ',
'Rush Toro|MX|brawler|f||a:37 sk:9 h:slick hc:0 b:goatee of:trunks oc:14 o2:7 ',
'Sammy Gevara|US|highflyer|f||a:32 sk:0 h:bald of:trunks oc:3 o2:5 ',
'Satnam Sing|CA|powerhouse|f||a:31 sk:1 h:shaggy hc:0 b:full bd:big of:trunks oc:21 o2:5 ',
'Serpentiko|US|technician|f||a:33 sk:3 h:side hc:0 b:stubble of:trunks oc:0 o2:5 ',
'Shane Tayler|US|powerhouse|f||a:37 sk:3 h:undercut hc:0 b:stubble bd:big of:trunks oc:3 o2:0 ',
'Shawn Deen|US|technician|f||a:33 sk:7 h:long hc:3 b:goatee of:trunks oc:21 o2:0 ',
'Smart Mark Sterlin|US|technician|f||a:37 sk:7 h:undercut hc:0 b:goatee of:trunks oc:14 o2:5 ',
'Soliel|US|technician|f||a:33 sk:3 h:shaggy hc:3 of:trunks oc:0 o2:21 ',
'Tehuti Myles|US|technician|f||a:28 sk:9 h:short hc:0 of:trunks oc:1 o2:5 ',
'Tony Nesse|US|technician|f||a:38 sk:3 h:slick hc:2 b:full of:trunks oc:21 o2:21 ',
'Trent Baretta|US|technician|f||a:40 sk:3 h:shaggy hc:3 of:trunks oc:14 o2:21 ',
'Truth Magnom|US|brawler|f||a:32 sk:0 h:buzz hc:2 b:full of:trunks oc:1 o2:7 ',
'Turbo Floid|US|highflyer|f||a:29 sk:3 h:spiky hc:0 of:trunks oc:0 o2:21 ',
'Zack Gibsen|GB|technician|f||a:38 sk:0 h:long hc:0 b:full of:trunks oc:21 o2:7 ',
'Billie Starkzz|US|technician|h|f|a:22 sk:3 h:halfup hc:10 of:singlet oc:14 o2:0 ',
'Carly Bravo|US|technician|h|f|a:25 sk:7 h:bob hc:10 of:singlet oc:4 o2:5 ',
'Cassie Lea|AU|technician|h|f|a:35 sk:0 h:bangs hc:3 of:singlet oc:11 o2:5 ',
'Charlette Renegate|US|brawler|h|f|a:27 sk:0 h:bob hc:3 of:singlet oc:1 o2:21 ',
'Deonna Purazzo|US|technician|h|f|a:30 sk:3 h:long hc:10 of:singlet oc:21 o2:5 ',
'Diamante Rae|US|technician|h|f|a:36 sk:7 h:pigtails hc:6 of:singlet oc:1 o2:0 ',
'Emi Sakuro|JP|technician|h|f|a:46 sk:5 h:bangs hc:6 of:singlet oc:11 o2:5 ',
'Isla Dawne|GB|brawler|h|f|a:30 sk:1 h:halfup hc:5 of:singlet oc:3 o2:9 ',
'Janai Kay|US|technician|h|f|a:32 sk:1 h:bob hc:0 of:singlet oc:21 o2:21 ',
'Jessie McKaye|AU|technician|h|f|a:35 sk:7 h:halfup hc:6 of:singlet oc:3 o2:9 ',
'Lacey Layne|US|technician|h|f|a:28 sk:7 h:bangs hc:3 of:singlet oc:21 o2:5 ',
'Leila Gray|US|technician|h|f|a:26 sk:3 h:wavy hc:6 of:singlet oc:1 o2:5 ',
'Maya Wurld|JP|highflyer|h|f|a:26 sk:5 h:bob hc:3 of:singlet oc:4 o2:21 ',
'Marina Shafeer|US|brawler|h|f|a:38 sk:0 h:long hc:2 of:singlet oc:3 o2:21 ',
'Mina Shirakawa|JP|highflyer|h|f|a:29 sk:5 h:bob hc:3 of:singlet oc:11 o2:21 ',
'Queen Aminatta|US|technician|h|f|a:30 sk:9 h:pony hc:0 of:singlet oc:9 o2:9 ',
'Rachel Ellering|US|powerhouse|h|f|a:30 sk:0 h:braids hc:0 of:singlet oc:11 o2:0 ',
'Red Velvett|US|powerhouse|h|f|a:33 sk:0 h:bob hc:6 of:singlet oc:21 o2:5 ',
'Robyn Renegate|US|brawler|h|f|a:27 sk:3 h:bob hc:6 of:singlet oc:4 o2:0 ',
'Serena Debb|US|technician|h|f|a:39 sk:9 h:pigtails hc:6 of:singlet oc:9 o2:5 ',
'Stori Denalli|US|technician|h|f|a:29 sk:0 h:halfup hc:3 of:singlet oc:21 o2:5 ',
'Steph DeLander|US|technician|h|f|a:30 sk:0 h:pigtails hc:0 of:singlet oc:9 o2:0 ',
'Trish Adorra|US|technician|h|f|a:34 sk:0 h:bob hc:2 of:singlet oc:1 o2:0 ',
'Vert Vixen|US|hardcore|h|f|a:31 sk:0 h:pigtails hc:3 of:singlet oc:11 o2:5 ',
'Viva Vann|US|technician|h|f|a:31 sk:0 h:braids hc:5 of:singlet oc:21 o2:21 ',
'Zayda Steele|US|technician|h|f|a:25 sk:0 h:bob hc:3 of:singlet oc:3 o2:21 '
];
STB.roh=[['Mogul Embassy',['Brian Kage','Shane Tayler','Preston Vanse']],['La Facción Ingobernable',['Rush Toro','Dralistico Jr','Komandero']],['The Kingdom',['Matt Tavan','Mike Benett','Marshall von Erik','Mason Maddin']],['Von Erik Brothers',['Marshall von Erik','Ross von Erik']],['Best Friends',['Trent Baretta','Rocky Romerro','Mark Davys']],['The Renegates',['Charlette Renegate','Robyn Renegate']],['Dark Squad',['Evil Oono','John Silvar','Alex Reynoldz']],['Hart Foundation Jr',['Dante Martinn','Darius Martinn']]];
CUR.str=[
'Athenna|US|brawler|h|f|a:37 sk:3 h:pigtails hc:10 of:singlet oc:3 o2:21 ',
'AZM|JP|highflyer|h|f|a:27 sk:5 h:bob hc:0 of:singlet oc:21 o2:21 ',
'Bea Priestly|GB|strong|h|f|a:29 sk:1 h:bob hc:3 of:singlet oc:3 o2:21 ',
'Julia Hartte|US|brawler|h|f|a:28 sk:0 h:halfup hc:10 of:singlet oc:0 o2:5 ',
'Maki Ito|JP|brawler|h|f|a:29 sk:5 h:bangs hc:0 of:singlet oc:14 o2:5 ',
'Sareee|JP|strong|h|f|a:27 sk:5 h:long hc:0 of:singlet oc:3 o2:5 ',
'Saya Kamitane|JP|highflyer|h|f|a:29 sk:5 h:wavy hc:0 of:singlet oc:0 o2:0 ',
'Skye Bleu|US|highflyer|h|f|a:27 sk:0 h:wavy hc:5 of:singlet oc:1 o2:21 ',
'Shuri|JP|strong|h|f|a:36 sk:5 h:bob hc:10 of:singlet oc:9 o2:21 ',
'Thekla Fon|DE|powerhouse|h|f|a:30 sk:0 h:bob hc:0 of:singlet oc:0 o2:0 ',
'Utami Hayashishta|JP|powerhouse|h|f|a:31 sk:5 h:braids hc:6 of:singlet oc:0 o2:9 '
];
STB.str=[['God\'s Eye',['Bea Priestly','Shuri','Saya Kamitane']],['Queens Quest Crew',['Utami Hayashishta','AZM','Sareee']],['Donna Del Mondo Jr',['Maki Ito','Thekla Fon']]];// GCW roster from user list (names altered)
CUR.gcw=[
'2 Cold Scorpyo|US|technician|f||a:59 sk:9 h:bald of:trunks oc:21 o2:21',
'Alec Prise|US|technician|f||a:28 sk:3 h:side hc:0 of:trunks oc:21 o2:7',
'Bear Brunson|CA|powerhouse|f||a:36 sk:3 h:undercut hc:0 b:mustache bd:big of:trunks oc:0 o2:21',
'Blake Christyan|US|highflyer|f||a:29 sk:7 h:slick hc:2 of:trunks oc:21 o2:21',
'Colin Delaine|US|technician|f||a:42 sk:0 h:side hc:0 of:trunks oc:21 o2:5',
'Gringo Locko|MX|lucha|h|f|a:44 sk:9 h:long hc:10 of:singlet oc:0 o2:5',
'Gurv Sihrah|CA|brawler|f||a:38 sk:3 h:undercut hc:2 of:trunks oc:21 o2:7',
'Harv Sihrah|CA|brawler|f||a:37 sk:1 h:bald b:full of:trunks oc:21 o2:7 gr:tattoo',
'Jack Cartwheal|US|highflyer|f||a:30 sk:0 h:long hc:0 of:trunks oc:21 o2:5',
'Joey Janello|US|hardcore|f||a:38 sk:7 h:short hc:2 b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Jordan Olliver|US|highflyer|f||a:29 sk:0 h:side hc:0 of:trunks oc:1 o2:7',
'Joe Sawyar|US|brawler|f||a:36 sk:0 h:side hc:0 b:mustache of:trunks oc:14 o2:7',
'Josh Barnet|US|strong|f||a:48 sk:7 h:slick hc:2 of:trunks oc:21 o2:7',
'Kerry Mortan|US|technician|f||a:40 sk:0 h:undercut hc:2 b:full of:trunks oc:0 o2:7',
'KJ Orsso|US|technician|f||a:34 sk:0 h:undercut hc:2 b:goatee of:trunks oc:3 o2:7',
'Lio Rushe|US|highflyer|f||a:30 sk:0 h:side hc:2 b:stubble of:trunks oc:0 o2:0',
'Main Man Orro|US|strong|f||a:30 sk:3 h:shaggy hc:3 b:stubble of:trunks oc:21 o2:7',
'Mance Warnor|US|hardcore|f||a:38 sk:7 h:undercut hc:0 of:trunks oc:14 o2:7 gr:tattoo',
'Marcus Mathars|US|technician|f||a:33 sk:3 h:undercut hc:0 of:trunks oc:14 o2:7',
'Nick Gauge|US|hardcore|f||a:45 sk:9 h:slick hc:2 of:trunks oc:0 o2:21',
'Raj Dhesy|CA|powerhouse|f||a:38 sk:0 h:shaggy hc:2 bd:big of:trunks oc:14 o2:0',
'Rey Horuz|MX|lucha|h|f|a:33 sk:9 h:wavy hc:2 of:singlet oc:1 o2:21',
'Ricky Mortan|US|technician|f||a:69 sk:7 h:slick hc:3 b:stubble of:trunks oc:1 o2:0 gr:tattoo',
'Soleil X|US|technician|f||a:33 sk:0 h:slick hc:2 b:full of:trunks oc:21 o2:7',
'Tony Depen|US|technician|f||a:34 sk:3 h:bald b:stubble of:trunks oc:0 o2:0',
'Tracy Willams|US|technician|f||a:40 sk:7 h:bald of:trunks oc:14 o2:0',
'Avery Stylis|US|technician|h|f|a:28 sk:0 h:bob hc:6 of:singlet oc:14 o2:21',
'Gabby Forsa|US|brawler|h|f|a:29 sk:9 h:bob hc:2 of:singlet oc:11 o2:5',
'Maki Itou|JP|brawler|h|f|a:29 sk:5 h:bob hc:5 of:singlet oc:0 o2:0',
'Masha Slamovick|US|hardcore|h|f|a:32 sk:3 h:braids hc:3 of:singlet oc:14 o2:5',
'Megan Bain|US|powerhouse|h|f|a:31 sk:1 h:pigtails hc:2 of:singlet oc:4 o2:5',
'Priscila Kelli|US|technician|h|f|a:30 sk:1 h:pigtails hc:10 of:singlet oc:4 o2:5',
'Steph DeLandr|US|technician|h|f|a:30 sk:0 h:bangs hc:0 of:singlet oc:21 o2:21'
];
STB.gcw=[['Sihrah Brothers', ['Gurv Sihrah', 'Harv Sihrah']], ['Rock n Roll Mortans', ['Kerry Mortan', 'Ricky Mortan']], ['Death Match Alliance', ['Nick Gauge', 'Joey Janello', 'Mance Warnor']], ['Hardcore Heat', ['Masha Slamovick', 'Joe Sawyar']]];

// AJPW roster from user list (names altered)
CUR.rsp=[
'Kento Miyahira|JP|strong|f||a:37 sk:5 h:side hc:3 of:trunks oc:3 o2:0',
'Yuma Aoyagy|JP|highflyer|f||a:27 sk:5 h:undercut hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Yuma Anzay|JP|technician|f||a:29 sk:5 h:shaggy hc:0 of:trunks oc:1 o2:7',
'Suwamma|JP|powerhouse|f||a:45 sk:5 h:undercut hc:0 bd:big of:trunks oc:14 o2:7',
'Shotaro Ashinoh|JP|strong|f||a:27 sk:5 h:short hc:0 of:trunks oc:14 o2:7 gr:tattoo',
'Jun Saitoh|JP|powerhouse|f||a:27 sk:5 h:side hc:0 b:goatee bd:big of:trunks oc:21 o2:5',
'Rei Saitoh|JP|powerhouse|f||a:28 sk:5 h:undercut hc:3 bd:big of:trunks oc:14 o2:21',
'Ren Ayabi|JP|technician|f||a:28 sk:5 h:shaggy hc:3 b:goatee of:trunks oc:0 o2:21',
'Ryuki Hondo|JP|technician|f||a:27 sk:5 h:undercut hc:2 of:trunks oc:21 o2:0',
'Hokuto Omorri|JP|technician|f||a:30 sk:5 h:shaggy hc:3 b:full of:trunks oc:1 o2:5',
'Go Shiozaky|JP|strong|f||a:38 sk:5 h:buzz hc:2 of:trunks oc:3 o2:7',
'Hideki Suzuky|JP|technician|f||a:54 sk:5 h:shaggy hc:0 b:mustache of:trunks oc:0 o2:21',
'Davey Boy Smith Jr|GB|technician|f||a:40 sk:0 h:long hc:0 of:trunks oc:0 o2:5 gr:tattoo',
'Daisuke Sekimotto|JP|powerhouse|f||a:44 sk:5 h:buzz hc:0 bd:big of:trunks oc:21 o2:7 gr:tattoo',
'Masanobu Fuchy|JP|technician|f||a:70 sk:5 h:shaggy hc:2 of:trunks oc:1 o2:0 gr:tattoo',
'Dan Tamora|JP|highflyer|f||a:29 sk:5 h:undercut hc:3 of:trunks oc:21 o2:0',
'Atsuki Aoyagy|JP|highflyer|f||a:28 sk:5 h:slick hc:0 b:stubble of:trunks oc:21 o2:5',
'Rising HAYATOH|JP|highflyer|f||a:32 sk:5 h:short hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'MUSASHI Jr|JP|highflyer|f||a:31 sk:5 h:short hc:2 of:trunks oc:21 o2:5',
'Hikaru Satoh|JP|technician|f||a:27 sk:5 h:long hc:2 of:trunks oc:1 o2:21',
'Seiki Yoshiyoka|JP|highflyer|f||a:29 sk:5 h:short hc:2 of:trunks oc:0 o2:0 gr:tattoo',
'Ryo Inoe|JP|technician|f||a:27 sk:5 h:long hc:2 b:goatee of:trunks oc:14 o2:5',
'Shota Kofujy|JP|technician|f||a:26 sk:5 h:slick hc:3 of:trunks oc:14 o2:0 gr:tattoo',
'Yasutaka Yanoh|JP|technician|f||a:44 sk:5 h:short hc:0 b:mustache of:trunks oc:14 o2:0 gr:tattoo',
'Cal Blume|AU|brawler|f||a:30 sk:0 h:long hc:0 of:trunks oc:3 o2:0',
'Cyrus Vale|JP|technician|f||a:30 sk:5 h:spiky hc:3 b:mustache of:trunks oc:14 o2:21',
'Jack Talus|AU|powerhouse|f||a:35 sk:0 h:bald bd:big of:trunks oc:21 o2:21',
'Kuma Arashy|JP|powerhouse|f||a:37 sk:5 h:spiky hc:3 bd:big of:trunks oc:21 o2:7',
'Kuroshio Tokyo Nippon|JP|brawler|f||a:40 sk:5 h:spiky hc:0 of:trunks oc:21 o2:21',
'Oddysey|JP|highflyer|f||a:30 sk:5 h:buzz hc:2 of:trunks oc:0 o2:0',
'Seigo Tachibanna|JP|technician|f||a:33 sk:5 h:slick hc:2 of:trunks oc:1 o2:21',
'Takashi Hara|JP|technician|f||a:34 sk:5 h:long hc:0 b:full of:trunks oc:21 o2:0',
'Xyon X|JP|technician|f||a:34 sk:5 h:long hc:0 of:trunks oc:21 o2:0',
'Yuko Myamoto|JP|brawler|f||a:38 sk:5 h:slick hc:0 of:trunks oc:1 o2:21'
];
STB.rsp=[['Saito Brothers', ['Jun Saitoh', 'Rei Saitoh']], ['Evolution Squad', ['Yuma Aoyagy', 'Yuma Anzay', 'Shotaro Ashinoh']], ['Mugen', ['Suwamma', 'Takashi Hara', 'Ren Ayabi']]];

// Stardom roster from user list (names altered, stable names as given)
CUR.str=[
'Hanan Ito|JP|technician|h|f|a:24 sk:5 h:long hc:0 of:singlet oc:9 o2:9',
'Saya Iyda|JP|highflyer|h|f|a:25 sk:5 h:halfup hc:5 of:singlet oc:9 o2:5',
'Momo Kogo|JP|technician|h|f|a:26 sk:5 h:pigtails hc:0 of:singlet oc:1 o2:0',
'Yuria Himme|JP|technician|h|f|a:26 sk:5 h:bob hc:5 of:singlet oc:11 o2:0',
'Matoi Hamabi|JP|brawler|h|f|a:25 sk:5 h:braids hc:6 of:singlet oc:11 o2:0',
'Maikka|JP|strong|h|f|a:28 sk:5 h:bangs hc:3 of:singlet oc:21 o2:21',
'Waka Tsukiyamma|JP|technician|h|f|a:27 sk:5 h:halfup hc:0 of:singlet oc:14 o2:5',
'Hanakko|JP|brawler|h|f|a:29 sk:5 h:bob hc:3 of:singlet oc:14 o2:5',
'Utami Hayashishta|JP|powerhouse|h|f|a:31 sk:5 h:braids hc:6 of:singlet oc:0 o2:9',
'Aya Sakurra|JP|technician|h|f|a:31 sk:5 h:wavy hc:6 of:singlet oc:11 o2:9',
'Sayaka Kurarra|JP|technician|h|f|a:28 sk:5 h:wavy hc:6 of:singlet oc:3 o2:21',
'Natsupoy|JP|highflyer|h|f|a:27 sk:5 h:pony hc:2 of:singlet oc:11 o2:21',
'Saori Anoh|JP|technician|h|f|a:29 sk:5 h:bob hc:0 of:singlet oc:11 o2:21',
'Yuna Mizumory|JP|highflyer|h|f|a:27 sk:5 h:braids hc:0 of:singlet oc:0 o2:9',
'Anne Kanaja|JP|technician|h|f|a:26 sk:5 h:long hc:0 of:singlet oc:11 o2:0',
'Shuri|JP|strong|h|f|a:36 sk:5 h:bob hc:10 of:singlet oc:9 o2:21',
'Ami Sorei|JP|powerhouse|h|f|a:33 sk:5 h:pigtails hc:2 of:singlet oc:14 o2:0',
'Ranna Yagamy|JP|technician|h|f|a:30 sk:5 h:long hc:3 of:singlet oc:9 o2:5',
'Hinna|JP|brawler|h|f|a:30 sk:5 h:long hc:2 of:singlet oc:1 o2:0',
'Lady Cee|JP|technician|h|f|a:37 sk:5 h:halfup hc:6 of:singlet oc:14 o2:5',
'Tomoka Inabba|JP|technician|h|f|a:31 sk:5 h:bob hc:10 of:singlet oc:1 o2:9',
'Kiyoka Kotatzu|JP|technician|h|f|a:25 sk:5 h:braids hc:0 of:singlet oc:9 o2:21',
'Starlite Kid|JP|highflyer|h|f|a:24 sk:5 h:pony hc:5 of:singlet oc:11 o2:21',
'Azumy|JP|highflyer|h|f|a:28 sk:5 h:bob hc:10 of:singlet oc:0 o2:5',
'Mei Seyra|JP|technician|h|f|a:26 sk:5 h:long hc:0 of:singlet oc:21 o2:5',
'Miyu Amasaky|JP|highflyer|h|f|a:23 sk:5 h:halfup hc:0 of:singlet oc:9 o2:9',
'Ema Maishma|JP|technician|h|f|a:26 sk:5 h:braids hc:0 of:singlet oc:0 o2:21',
'Natsuko Tohra|JP|brawler|h|f|a:34 sk:5 h:pigtails hc:0 of:singlet oc:11 o2:0',
'Momo Watanabi|JP|technician|h|f|a:28 sk:5 h:braids hc:3 of:singlet oc:3 o2:9',
'Konammi|JP|technician|h|f|a:34 sk:5 h:braids hc:3 of:singlet oc:0 o2:9',
'Saya Kamitany|JP|highflyer|h|f|a:29 sk:5 h:bangs hc:0 of:singlet oc:9 o2:21',
'Ruakka|JP|brawler|h|f|a:28 sk:5 h:long hc:0 of:singlet oc:9 o2:9',
'Rinna|JP|technician|h|f|a:26 sk:5 h:pigtails hc:0 of:singlet oc:0 o2:5',
'Bea Priestly|GB|strong|h|f|a:29 sk:1 h:bob hc:3 of:singlet oc:3 o2:21',
'Azusa Inabba|JP|technician|h|f|a:30 sk:5 h:pony hc:0 of:singlet oc:0 o2:0',
'Fukigen Deth|JP|brawler|h|f|a:28 sk:5 h:wavy hc:0 of:singlet oc:1 o2:0',
'Suzu Suzuky|JP|technician|h|f|a:24 sk:5 h:braids hc:0 of:singlet oc:0 o2:9',
'Rina Yamashta|JP|technician|h|f|a:28 sk:5 h:halfup hc:10 of:singlet oc:3 o2:5',
'Itsuki Aoky|JP|technician|h|f|a:27 sk:5 h:pony hc:0 of:singlet oc:11 o2:9',
'Bozzilla|JP|powerhouse|h|f|a:30 sk:5 h:long hc:0 of:singlet oc:14 o2:21',
'Akira Kuroganne|JP|powerhouse|h|f|a:27 sk:5 h:long hc:5 of:singlet oc:11 o2:21',
'Hazuky|JP|technician|h|f|a:40 sk:5 h:bob hc:5 of:singlet oc:14 o2:9',
'Kogumma|JP|highflyer|h|f|a:29 sk:5 h:long hc:5 of:singlet oc:4 o2:0',
'Riann|JP|technician|h|f|a:24 sk:5 h:bangs hc:3 of:singlet oc:21 o2:9',
'Kikyo Furusawwa|JP|technician|h|f|a:24 sk:5 h:pigtails hc:10 of:singlet oc:0 o2:21',
'Fuwa Chann|JP|brawler|h|f|a:25 sk:5 h:wavy hc:5 of:singlet oc:21 o2:5',
'Maki Itoo|JP|brawler|h|f|a:29 sk:5 h:pony hc:10 of:singlet oc:3 o2:9'
];
STB.str=[['STARS', ['Hanan Ito', 'Saya Iyda', 'Momo Kogo', 'Yuria Himme', 'Matoi Hamabi', 'Maikka', 'Waka Tsukiyamma', 'Hanakko', 'Utami Hayashishta']], ['COSMIC ANGELS', ['Aya Sakurra', 'Sayaka Kurarra', 'Natsupoy', 'Saori Anoh', 'Yuna Mizumory', 'Anne Kanaja']], ["God's Eye", ['Shuri', 'Ami Sorei', 'Ranna Yagamy', 'Hinna', 'Lady Cee', 'Tomoka Inabba', 'Kiyoka Kotatzu']], ['NEO GENESIS', ['Starlite Kid', 'Azumy', 'Mei Seyra', 'Miyu Amasaky', 'Ema Maishma']], ['H.A.T.E.', ['Natsuko Tohra', 'Momo Watanabi', 'Konammi', 'Saya Kamitany', 'Ruakka', 'Rinna', 'Bea Priestly', 'Azusa Inabba', 'Fukigen Deth']], ['Mi Vida Loca', ['Suzu Suzuky', 'Rina Yamashta', 'Itsuki Aoky', 'Bozzilla', 'Akira Kuroganne']]];

// RevPro roster from user list (names altered)
CUR.rvp=[
'Brendon Whyte|GB|technician|f||a:28 sk:0 h:long hc:0 of:trunks oc:21 o2:0',
'Calum Newmen|AU|technician|f||a:30 sk:0 h:slick hc:2 of:trunks oc:3 o2:7',
'Cameron Kai|GB|highflyer|f||a:28 sk:0 h:shaggy hc:2 of:trunks oc:14 o2:21',
'Charlie Sterlyng|GB|technician|f||a:33 sk:0 h:spiky hc:0 of:trunks oc:21 o2:21',
'Chris Bronsen|GB|strong|f||a:28 sk:0 h:side hc:0 b:full of:trunks oc:14 o2:5',
'Chuck Mambow|GB|technician|f||a:36 sk:0 h:undercut hc:0 of:trunks oc:21 o2:21',
'Conor Millz|GB|technician|f||a:27 sk:1 h:bald of:trunks oc:21 o2:0',
'Danny Joans|GB|technician|f||a:27 sk:1 h:long hc:0 b:mustache of:trunks oc:14 o2:21',
'Dave Fransisco|GB|powerhouse|f||a:32 sk:0 h:shaggy hc:0 b:mustache bd:big of:trunks oc:3 o2:21 gr:tattoo',
'Eddie Denis|GB|brawler|f||a:35 sk:1 h:side hc:0 of:trunks oc:21 o2:0',
'Francesko Akyra|IT|technician|f||a:30 sk:0 h:bald of:trunks oc:1 o2:21 gr:tattoo',
'Gabriel Kid|GB|technician|f||a:27 sk:0 h:bald b:stubble of:trunks oc:1 o2:21',
'Gideon Gray|GB|technician|f||a:33 sk:0 h:side hc:0 b:mustache of:trunks oc:21 o2:7',
'Great-O-Khaan|JP|powerhouse|f||a:43 sk:5 h:buzz hc:0 bd:big of:trunks oc:21 o2:0 gr:tattoo',
'JJ Gayle|GB|brawler|f||a:31 sk:0 h:spiky hc:2 of:trunks oc:14 o2:21',
'Kanjy|JP|technician|f||a:38 sk:5 h:slick hc:2 of:trunks oc:14 o2:0',
'Lee Hunta|GB|technician|f||a:30 sk:0 h:undercut hc:0 of:trunks oc:21 o2:7',
'Leon Slaytor|GB|highflyer|f||a:23 sk:1 h:bald of:trunks oc:0 o2:0',
'Lucian Philips|GB|technician|f||a:30 sk:1 h:undercut hc:3 b:full of:trunks oc:3 o2:7',
'Luke Jacobz|GB|technician|f||a:28 sk:0 h:long hc:2 b:mustache of:trunks oc:1 o2:0',
'Mike Oku|GB|technician|f||a:33 sk:0 h:buzz hc:2 of:trunks oc:21 o2:5 gr:tattoo',
'Nathen Cruz|GB|technician|f||a:30 sk:1 h:slick hc:2 b:mustache of:trunks oc:14 o2:7',
'Nick Reilly|GB|strong|f||a:32 sk:1 h:long hc:3 of:trunks oc:21 o2:5 gr:tattoo',
'Remy Adetunjy|GB|strong|f||a:27 sk:0 h:slick hc:2 of:trunks oc:14 o2:0 gr:tattoo',
'RKJay|GB|technician|f||a:30 sk:0 h:undercut hc:0 of:trunks oc:3 o2:21 gr:tattoo',
'Robby X|AU|highflyer|f||a:33 sk:1 h:side hc:3 b:mustache of:trunks oc:0 o2:5',
'Samuel Hawks|GB|technician|f||a:29 sk:1 h:buzz hc:2 b:full of:trunks oc:14 o2:0',
'Shawn Jaxon|GB|technician|f||a:30 sk:0 h:buzz hc:0 of:trunks oc:21 o2:7',
'TK Coopar|GB|technician|f||a:32 sk:1 h:undercut hc:3 b:mustache of:trunks oc:21 o2:7',
'Will Kavan|GB|brawler|f||a:29 sk:1 h:shaggy hc:3 of:trunks oc:21 o2:7',
'Wil Ospray|GB|highflyer|f||a:33 sk:0 h:shaggy hc:3 of:trunks oc:21 o2:5',
'Zach Sabre Jr|GB|technician|f||a:39 sk:1 h:buzz hc:0 b:stubble of:trunks oc:14 o2:21',
'Zac Knyght|GB|brawler|f||a:27 sk:0 h:side hc:2 of:trunks oc:21 o2:0',
'Alex Windser|GB|brawler|h|f|a:30 sk:1 h:pony hc:3 of:singlet oc:9 o2:21',
'Chantel Jordon|GB|technician|h|f|a:30 sk:0 h:long hc:0 of:singlet oc:9 o2:9',
'Dany Luna|GB|powerhouse|h|f|a:30 sk:0 h:bangs hc:3 of:singlet oc:11 o2:5',
'Lucia Leigh|GB|technician|h|f|a:28 sk:0 h:braids hc:6 of:singlet oc:9 o2:9',
'Maya Mathews|GB|technician|h|f|a:27 sk:0 h:pigtails hc:3 of:singlet oc:9 o2:5',
'Mercedes Blayze|GB|technician|h|f|a:29 sk:0 h:pigtails hc:5 of:singlet oc:9 o2:9',
'Saphire Reed|GB|technician|h|f|a:28 sk:1 h:pigtails hc:3 of:singlet oc:9 o2:9'
];
STB.rvp=[['TMDK Crew', ['Zach Sabre Jr', 'Great-O-Khaan', 'Kanjy']], ['Young Lions', ['Leon Slaytor', 'Lee Hunta', 'Luke Jacobz']]];

// PROGRESS roster from user list (names altered)
CUR.pgr=[
'Axel Tisher|DE|technician|f||a:36 sk:0 h:long hc:3 b:full of:trunks oc:21 o2:0 gr:tattoo',
'Big Damm|GB|powerhouse|f||a:37 sk:1 h:slick hc:3 bd:big of:trunks oc:3 o2:21 gr:tattoo',
'Drila Malony|GB|brawler|f||a:30 sk:1 h:short hc:0 of:trunks oc:21 o2:7 gr:tattoo',
'Luke Jacobbs|GB|technician|f||a:28 sk:1 h:short hc:3 b:stubble of:trunks oc:1 o2:0',
'Mark Haskyns|GB|technician|f||a:35 sk:1 h:spiky hc:0 b:full of:trunks oc:21 o2:21 gr:tattoo',
'Paul Walther Hauzer|US|brawler|f||a:49 sk:0 h:long hc:3 of:trunks oc:21 o2:0',
'Session Moth Martyna|GB|brawler|f||a:30 sk:1 h:side hc:0 of:trunks oc:21 o2:0',
'Tate Mayfares|GB|technician|f||a:30 sk:0 h:spiky hc:0 of:trunks oc:14 o2:0',
'Tommy Endd|DE|technician|f||a:40 sk:0 h:shaggy hc:0 of:trunks oc:1 o2:21',
'Lizzy Evoh|GB|technician|h|f|a:28 sk:0 h:pony hc:0 of:singlet oc:0 o2:9',
'Millie McKenzy|GB|technician|h|f|a:27 sk:0 h:pony hc:6 of:singlet oc:3 o2:5',
'Nikki Storme|GB|brawler|h|f|a:36 sk:1 h:wavy hc:5 of:singlet oc:11 o2:0',
'Nina Samuells|GB|technician|h|f|a:31 sk:1 h:bangs hc:5 of:singlet oc:3 o2:9',
'Renee Michele|GB|technician|h|f|a:30 sk:0 h:bangs hc:5 of:singlet oc:14 o2:9',
'SoCal Vall|US|highflyer|h|f|a:31 sk:0 h:bob hc:10 of:singlet oc:9 o2:9',
'Vicky Haskyns|GB|technician|h|f|a:33 sk:0 h:long hc:2 of:singlet oc:11 o2:0',
'Xelinna|US|brawler|h|f|a:34 sk:0 h:pigtails hc:2 of:singlet oc:21 o2:9'
];
STB.pgr=[['Haskyns Family', ['Mark Haskyns', 'Vicky Haskyns']]];

// wXw roster from user list (names altered)
CUR.wxx=[
'Elijah Bloom|DE|technician|f||a:29 sk:0 h:spiky hc:3 of:trunks oc:21 o2:0',
'Axel Tischa|DE|technician|f||a:36 sk:0 h:buzz hc:0 of:trunks oc:0 o2:0 gr:tattoo',
'Zoltann|DE|powerhouse|f||a:35 sk:0 h:short hc:3 b:goatee bd:big of:trunks oc:0 o2:5',
'Marc Empyre|DE|brawler|f||a:37 sk:0 h:undercut hc:3 of:trunks oc:1 o2:21',
'Robert Dreisker|DE|powerhouse|f||a:34 sk:0 h:undercut hc:2 b:full bd:big of:trunks oc:1 o2:7 gr:tattoo',
'Amall|FR|highflyer|f||a:28 sk:0 h:long hc:2 b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Katsuya Murashma|JP|technician|f||a:31 sk:5 h:bald b:stubble of:trunks oc:21 o2:0',
'Luke Jakobs|GB|technician|f||a:28 sk:0 h:buzz hc:2 of:trunks oc:21 o2:5 gr:tattoo',
'Metehann|DE|strong|f||a:31 sk:0 h:spiky hc:0 b:stubble of:trunks oc:21 o2:21',
'Michal Oku|GB|technician|f||a:33 sk:0 h:spiky hc:0 b:full of:trunks oc:14 o2:7',
'Rikki Soza|US|technician|f||a:31 sk:0 h:short hc:0 of:trunks oc:3 o2:5'
];
STB.wxx=[['Tag Team Titans', ['Marc Empyre', 'Robert Dreisker']]];

// NLW (No Limit Wrestling) roster from user list (names altered)
CUR.nlw=[
'Luke Frehil|GB|technician|f||a:28 sk:0 h:slick hc:2 b:mustache of:trunks oc:0 o2:5',
'Sammy Dee|GB|technician|f||a:27 sk:0 h:side hc:3 of:trunks oc:1 o2:7',
'Callum Blak|GB|technician|f||a:29 sk:0 h:bald b:full of:trunks oc:1 o2:21',
'Damian Corvyn|GB|strong|f||a:32 sk:1 h:bald of:trunks oc:0 o2:21',
'DD Crookz|GB|brawler|f||a:30 sk:0 h:side hc:0 of:trunks oc:0 o2:0',
'Halfdann|GB|powerhouse|f||a:31 sk:0 h:short hc:0 bd:big of:trunks oc:3 o2:5 gr:tattoo',
'Josh Wiley|GB|technician|f||a:28 sk:0 h:spiky hc:2 b:full of:trunks oc:21 o2:21',
'Matt Bullet Smith|GB|brawler|f||a:29 sk:1 h:bald of:trunks oc:3 o2:21',
'Terry Thatchar|GB|technician|f||a:26 sk:0 h:long hc:0 of:trunks oc:14 o2:21 gr:tattoo',
'Young Daragh|GB|highflyer|f||a:22 sk:0 h:long hc:2 of:trunks oc:21 o2:0 gr:tattoo',
'CBL The Bull|GB|powerhouse|f||a:33 sk:1 h:short hc:0 b:mustache bd:big of:trunks oc:1 o2:7',
'LXT Jr|GB|highflyer|f||a:27 sk:0 h:buzz hc:0 of:trunks oc:21 o2:5',
'Tommy Lightnyng|GB|highflyer|f||a:26 sk:0 h:spiky hc:2 b:mustache of:trunks oc:0 o2:0',
'Mike Mayy|GB|technician|f||a:30 sk:0 h:buzz hc:2 b:stubble of:trunks oc:21 o2:7',
'Ken Cutlar|GB|strong|f||a:31 sk:1 h:short hc:3 b:full of:trunks oc:21 o2:5',
'Nando Libra|GB|technician|f||a:29 sk:0 h:slick hc:3 b:full of:trunks oc:21 o2:5',
'Paddy Morrowe|GB|brawler|f||a:30 sk:1 h:buzz hc:3 b:goatee of:trunks oc:3 o2:0',
'Steve Savaje|GB|brawler|f||a:34 sk:0 h:bald b:mustache of:trunks oc:21 o2:7',
'Fabbio|GB|technician|f||a:27 sk:0 h:side hc:2 b:stubble of:trunks oc:0 o2:7',
'Big Nick|GB|powerhouse|f||a:32 sk:1 h:spiky hc:0 b:goatee bd:big of:trunks oc:3 o2:7',
'Jacob Strang|GB|strong|f||a:28 sk:0 h:shaggy hc:0 b:full of:trunks oc:21 o2:21',
'Bonesaww|GB|hardcore|f||a:33 sk:0 h:undercut hc:0 of:trunks oc:21 o2:7',
'Jay Jaye|GB|technician|f||a:25 sk:0 h:spiky hc:0 b:mustache of:trunks oc:1 o2:0 gr:tattoo',
'Robby Macc|GB|technician|f||a:29 sk:1 h:side hc:0 of:trunks oc:21 o2:7',
'Francis Mercar|GB|technician|f||a:30 sk:0 h:bald b:goatee of:trunks oc:14 o2:21',
'Corey Zeroh|GB|technician|h|f|a:27 sk:1 h:halfup hc:2 of:singlet oc:1 o2:0',
'Lily LaRue|GB|technician|h|f|a:26 sk:0 h:pigtails hc:3 of:singlet oc:14 o2:0',
'Kat Von Kaye|GB|brawler|h|f|a:28 sk:0 h:halfup hc:0 of:singlet oc:4 o2:21',
'Morganna|GB|hardcore|h|f|a:30 sk:0 h:bangs hc:5 of:singlet oc:4 o2:9'
];
STB.nlw=[['Reckoning', ['Robby Macc', 'Francis Mercar']], ['Big Nick & Strang', ['Big Nick', 'Jacob Strang']]];

// Brazilian roster (BWF list) from user (names altered)
CUR.spw=[
'Victor Boar|BR|technician|f||a:32 sk:7 h:buzz hc:0 of:trunks oc:3 o2:0',
'Allan Salles|BR|technician|f||a:31 sk:1 h:long hc:3 of:trunks oc:21 o2:0 gr:tattoo',
'Yan Karlor|BR|highflyer|f||a:27 sk:1 h:long hc:2 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Adolfo Bogart|BR|brawler|f||a:35 sk:7 h:shaggy hc:0 b:full of:trunks oc:1 o2:5',
'Hyron Rocha|BR|technician|f||a:30 sk:3 h:shaggy hc:3 of:trunks oc:21 o2:0',
'Acce|BR|highflyer|f||a:27 sk:9 h:bald b:goatee of:trunks oc:3 o2:21',
'Dantee|BR|technician|f||a:38 sk:3 h:spiky hc:0 b:goatee of:trunks oc:21 o2:0',
'Insano Igor|BR|hardcore|f||a:33 sk:1 h:short hc:3 of:trunks oc:1 o2:5',
'Colossuss|BR|powerhouse|f||a:36 sk:9 h:short hc:2 bd:big of:trunks oc:21 o2:0',
'Big Boyy|BR|powerhouse|f||a:34 sk:1 h:spiky hc:3 b:mustache bd:big of:trunks oc:21 o2:21 gr:tattoo',
'Big Tomm|BR|powerhouse|f||a:35 sk:7 h:bald b:full bd:big of:trunks oc:3 o2:0',
'Blackoutt|BR|brawler|f||a:31 sk:3 h:side hc:0 b:full of:trunks oc:3 o2:5',
'Brian Racerr|BR|highflyer|f||a:28 sk:1 h:spiky hc:3 of:trunks oc:21 o2:7 gr:tattoo',
'Dillios|BR|technician|f||a:29 sk:7 h:short hc:2 of:trunks oc:21 o2:7',
'Fred Turboo|BR|strong|f||a:32 sk:1 h:long hc:3 b:goatee of:trunks oc:21 o2:7',
'Fukujy|BR|technician|f||a:28 sk:1 h:shaggy hc:2 of:trunks oc:0 o2:0',
'Leonny|BR|highflyer|f||a:26 sk:1 h:slick hc:3 of:trunks oc:21 o2:21',
'Mahuu|BR|technician|f||a:29 sk:1 h:buzz hc:3 of:trunks oc:21 o2:21',
'Matths Alvez|BR|technician|f||a:27 sk:7 h:slick hc:0 b:goatee of:trunks oc:3 o2:21',
'Max Millar|BR|strong|f||a:30 sk:9 h:undercut hc:2 of:trunks oc:21 o2:7',
'Mike Furie|BR|brawler|f||a:33 sk:1 h:slick hc:0 b:full of:trunks oc:14 o2:7',
'Peter Bulll|BR|powerhouse|f||a:34 sk:3 h:bald bd:big of:trunks oc:21 o2:5 gr:tattoo',
'Rapha Lukke|BR|technician|f||a:29 sk:1 h:long hc:3 b:mustache of:trunks oc:3 o2:7 gr:tattoo',
'Roddoxx|BR|brawler|f||a:31 sk:7 h:short hc:0 b:stubble of:trunks oc:21 o2:21 gr:tattoo',
'Romullo|BR|technician|f||a:30 sk:1 h:bald b:full of:trunks oc:1 o2:21',
'Rurik Jr|BR|technician|f||a:27 sk:9 h:shaggy hc:0 b:stubble of:trunks oc:21 o2:7',
'Sollyy|BR|technician|f||a:29 sk:9 h:shaggy hc:0 b:stubble of:trunks oc:14 o2:5',
'Sonicco|BR|highflyer|f||a:26 sk:1 h:long hc:0 b:mustache of:trunks oc:21 o2:5 gr:tattoo',
'Speedd|BR|highflyer|f||a:25 sk:1 h:long hc:0 of:trunks oc:14 o2:0 gr:tattoo',
'Thuro Thurro|BR|brawler|f||a:32 sk:3 h:buzz hc:0 b:mustache of:trunks oc:21 o2:21',
'Tim Andersen|BR|technician|f||a:33 sk:3 h:spiky hc:0 b:goatee of:trunks oc:21 o2:21',
'Tokko|BR|technician|f||a:28 sk:9 h:long hc:0 of:trunks oc:21 o2:5',
'Tubarao Negrro|BR|powerhouse|f||a:37 sk:7 h:spiky hc:3 b:stubble bd:big of:trunks oc:21 o2:7 gr:tattoo',
'Vitao Big Doog|BR|powerhouse|f||a:35 sk:7 h:short hc:0 b:goatee bd:big of:trunks oc:0 o2:21',
'Adam Blakk|BR|technician|f||a:30 sk:9 h:bald b:full of:trunks oc:21 o2:5',
'Albertt|BR|technician|f||a:31 sk:1 h:short hc:0 b:goatee of:trunks oc:21 o2:0',
'Bob Jr Boss|BR|technician|f||a:45 sk:1 h:slick hc:0 of:trunks oc:14 o2:5'
];
STB.spw=[['Tag Team Champions', ['Victor Boar', 'Acce']]];

// UKWA roster from user list (names altered)
CUR.bra=[
'Luke Bashem|GB|technician|f||a:30 sk:1 h:buzz hc:2 b:full of:trunks oc:14 o2:21',
'Kenny Tempel|GB|technician|f||a:34 sk:0 h:side hc:0 b:mustache of:trunks oc:21 o2:21',
'Woody Andersen|GB|technician|f||a:33 sk:0 h:bald of:trunks oc:14 o2:21',
'Reagan|GB|technician|f||a:27 sk:0 h:buzz hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Cain Richards|GB|technician|f||a:30 sk:0 h:short hc:0 b:stubble of:trunks oc:21 o2:0',
'Mayhem X|GB|highflyer|f||a:28 sk:1 h:side hc:0 b:mustache of:trunks oc:0 o2:7',
'Aidan Potar|GB|technician|f||a:27 sk:0 h:short hc:0 of:trunks oc:21 o2:5',
'Alex Conners|GB|technician|f||a:29 sk:0 h:undercut hc:2 b:full of:trunks oc:3 o2:0',
'Angus Jaymes|GB|strong|f||a:31 sk:1 h:undercut hc:2 b:full of:trunks oc:21 o2:0',
'Bjorne|GB|powerhouse|f||a:33 sk:0 h:bald bd:big of:trunks oc:21 o2:21',
'Charles Kelsy|GB|technician|f||a:28 sk:1 h:side hc:2 of:trunks oc:0 o2:5 gr:tattoo',
'Charlie Rykar|GB|technician|f||a:26 sk:1 h:spiky hc:0 of:trunks oc:21 o2:0',
'Chris Drue|GB|technician|f||a:30 sk:1 h:short hc:2 of:trunks oc:14 o2:21',
'James Seadin|GB|technician|f||a:29 sk:0 h:undercut hc:0 of:trunks oc:1 o2:0 gr:tattoo',
'Jay Huntar|GB|highflyer|f||a:25 sk:0 h:spiky hc:0 b:full of:trunks oc:21 o2:7',
'Joshua Vanse|GB|technician|f||a:28 sk:1 h:short hc:0 of:trunks oc:21 o2:5',
'Killer Kyle Georgie|GB|brawler|f||a:35 sk:0 h:short hc:2 b:stubble of:trunks oc:14 o2:5',
'Liam Portar|GB|technician|f||a:27 sk:0 h:long hc:3 b:stubble of:trunks oc:21 o2:21',
'Logan Wardd|GB|technician|f||a:27 sk:1 h:slick hc:3 b:goatee of:trunks oc:21 o2:21',
'Luke Edwerds|GB|technician|f||a:29 sk:0 h:slick hc:0 b:mustache of:trunks oc:14 o2:21 gr:tattoo',
'Main Event Muzzie|GB|brawler|f||a:34 sk:1 h:bald of:trunks oc:21 o2:21',
'Mikey McLoven|GB|highflyer|f||a:26 sk:0 h:long hc:3 b:goatee of:trunks oc:3 o2:0',
'No Fun Dunn|GB|brawler|f||a:33 sk:0 h:spiky hc:0 of:trunks oc:21 o2:0',
'Reese Reynoldz|GB|technician|f||a:28 sk:1 h:slick hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Rocky Underwud|GB|strong|f||a:31 sk:1 h:undercut hc:2 of:trunks oc:21 o2:5',
'Sam Bestt|GB|technician|f||a:30 sk:0 h:spiky hc:2 of:trunks oc:21 o2:21',
'Sanguin|GB|hardcore|f||a:32 sk:0 h:long hc:2 b:stubble of:trunks oc:0 o2:7',
'The Brier|GB|hardcore|f||a:30 sk:1 h:long hc:0 b:goatee of:trunks oc:21 o2:0',
'Whitaker|GB|technician|f||a:29 sk:0 h:slick hc:3 b:mustache of:trunks oc:21 o2:0 gr:tattoo',
'Wil Robberts|GB|technician|f||a:27 sk:0 h:undercut hc:2 of:trunks oc:21 o2:7',
'Zander Palmar|GB|technician|f||a:26 sk:0 h:long hc:3 b:stubble of:trunks oc:1 o2:5'
];
STB.bra=[['T.I.D', ['Kenny Tempel', 'Woody Andersen']], ['The Golden Age', ['Cain Richards', 'Mayhem X']]];

// ICW roster from user list (names altered, officials/commentators left out)
CUR.icw=[
'Mark Coffee|GB|powerhouse|f||a:38 sk:0 h:side hc:3 b:stubble bd:big of:trunks oc:14 o2:0',
'Miles Kaymen|GB|highflyer|f||a:28 sk:1 h:bald b:goatee of:trunks oc:21 o2:7 gr:tattoo',
'Wulfgang|GB|brawler|f||a:35 sk:0 h:short hc:0 of:trunks oc:21 o2:21',
'Bowan|GB|strong|f||a:29 sk:0 h:slick hc:0 b:stubble of:trunks oc:21 o2:0',
'Judas Gray|GB|technician|f||a:30 sk:0 h:spiky hc:2 b:goatee of:trunks oc:21 o2:7',
'Aron Ecko|GB|technician|f||a:31 sk:1 h:long hc:0 b:stubble of:trunks oc:14 o2:7 gr:tattoo',
'Adam Kyng|GB|technician|f||a:28 sk:1 h:spiky hc:0 of:trunks oc:21 o2:0',
'Andy Robarts|GB|technician|f||a:30 sk:0 h:bald of:trunks oc:21 o2:5',
'Austen Brooks|GB|technician|f||a:27 sk:0 h:slick hc:2 b:mustache of:trunks oc:14 o2:21',
'Ben Rodgerz|GB|technician|f||a:28 sk:0 h:side hc:0 of:trunks oc:21 o2:0',
'Big Dammo|GB|powerhouse|f||a:36 sk:0 h:short hc:3 b:goatee bd:big of:trunks oc:0 o2:7 gr:tattoo',
'Brodie Turnbul|GB|strong|f||a:31 sk:0 h:spiky hc:0 of:trunks oc:14 o2:5 gr:tattoo',
'Jason Read|GB|technician|f||a:29 sk:0 h:long hc:0 b:full of:trunks oc:14 o2:5',
'Jake Lawlis|GB|technician|f||a:29 sk:0 h:spiky hc:3 b:stubble of:trunks oc:1 o2:21',
'Kez Evens|GB|technician|f||a:29 sk:1 h:undercut hc:0 b:full of:trunks oc:3 o2:21',
'Kenny Willams|GB|technician|f||a:33 sk:0 h:shaggy hc:2 of:trunks oc:21 o2:5 gr:tattoo',
'BT Gun|GB|brawler|f||a:34 sk:0 h:long hc:0 of:trunks oc:21 o2:0',
'Rudo Lightnyng|GB|highflyer|f||a:27 sk:1 h:short hc:3 of:trunks oc:21 o2:21',
'Rabbu|GB|brawler|f||a:30 sk:1 h:bald b:mustache of:trunks oc:14 o2:21 gr:tattoo',
'Louis Girvan|GB|technician|f||a:30 sk:1 h:spiky hc:2 of:trunks oc:21 o2:5',
'Shah Samuels|GB|technician|f||a:31 sk:0 h:spiky hc:2 b:full of:trunks oc:1 o2:7 gr:tattoo',
'Colten Davis|GB|technician|f||a:27 sk:1 h:slick hc:2 of:trunks oc:21 o2:0 gr:tattoo',
'Joe Coffee|GB|strong|f||a:38 sk:0 h:long hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Frazer Girvan|GB|technician|f||a:28 sk:0 h:side hc:3 b:full of:trunks oc:14 o2:21',
'Craig Anthoney|GB|technician|f||a:30 sk:0 h:slick hc:0 b:mustache of:trunks oc:21 o2:0',
'Dylan Thorne|GB|technician|f||a:27 sk:1 h:buzz hc:0 of:trunks oc:21 o2:21',
'Gene Muny|GB|technician|f||a:32 sk:0 h:bald of:trunks oc:21 o2:5 gr:tattoo',
'Jack Ripely|GB|technician|f||a:26 sk:0 h:shaggy hc:0 b:full of:trunks oc:3 o2:5 gr:tattoo',
'Landen Reilly|GB|technician|f||a:27 sk:1 h:side hc:2 of:trunks oc:0 o2:0',
'Gradoh|GB|brawler|f||a:31 sk:0 h:shaggy hc:0 of:trunks oc:14 o2:7',
'Mike Mailar|GB|technician|f||a:32 sk:0 h:side hc:0 of:trunks oc:21 o2:7',
'Daz Blak|GB|technician|f||a:30 sk:1 h:side hc:3 b:stubble of:trunks oc:21 o2:5',
'Jack Moris|GB|technician|f||a:27 sk:1 h:short hc:2 b:stubble of:trunks oc:21 o2:0',
'Leyton Buzzerd|GB|brawler|f||a:33 sk:0 h:undercut hc:2 of:trunks oc:14 o2:21',
'Nik Justis|GB|technician|f||a:31 sk:1 h:long hc:0 of:trunks oc:0 o2:0 gr:tattoo',
'Rampage Browne|GB|powerhouse|f||a:37 sk:0 h:bald b:full bd:big of:trunks oc:1 o2:21',
'Theo Dorros|GB|technician|f||a:28 sk:0 h:long hc:3 of:trunks oc:21 o2:21',
'Xeero|GB|highflyer|f||a:26 sk:1 h:buzz hc:0 b:stubble of:trunks oc:0 o2:7',
'Marcos Kyng|GB|technician|f||a:29 sk:0 h:spiky hc:0 of:trunks oc:14 o2:7',
'Shaun Sumers|GB|technician|f||a:27 sk:0 h:long hc:0 of:trunks oc:14 o2:5 gr:tattoo',
'Tommy Lockhert|GB|technician|f||a:30 sk:0 h:short hc:3 of:trunks oc:21 o2:21',
'Stevie Jaymes|GB|technician|f||a:30 sk:1 h:shaggy hc:2 b:stubble of:trunks oc:21 o2:5',
'Molly Sparten|GB|technician|h|f|a:27 sk:0 h:pony hc:2 of:singlet oc:11 o2:21',
'Aspen Faythe|GB|technician|h|f|a:28 sk:0 h:pony hc:0 of:singlet oc:4 o2:0',
'Rhyo|GB|highflyer|h|f|a:26 sk:0 h:bob hc:2 of:singlet oc:4 o2:0',
'Angel Hayz|GB|brawler|h|f|a:30 sk:1 h:pony hc:10 of:singlet oc:9 o2:21',
'Kay Lee Rae|GB|technician|h|f|a:34 sk:0 h:halfup hc:2 of:singlet oc:11 o2:0',
'Hollie Barlowe|GB|technician|h|f|a:28 sk:1 h:braids hc:2 of:singlet oc:0 o2:0',
'Natasha Swan|GB|technician|h|f|a:27 sk:1 h:long hc:5 of:singlet oc:0 o2:9',
'Daisy Jenkyns|GB|technician|h|f|a:25 sk:1 h:bob hc:0 of:singlet oc:1 o2:9',
'Lana Austen|GB|technician|h|f|a:27 sk:0 h:braids hc:6 of:singlet oc:21 o2:0'
];
STB.icw=[['Arcade Violence', ['Bowan', 'Judas Gray', 'Aron Ecko']], ['Girvan Family', ['Louis Girvan', 'Frazer Girvan']]];

// EWW roster from user list (names altered)
CUR.eve=[
'Cyrus Shayde|GB|technician|f||a:30 sk:0 h:spiky hc:3 of:trunks oc:0 o2:5',
'Grayson Dawne|GB|technician|f||a:28 sk:1 h:side hc:2 b:mustache of:trunks oc:21 o2:21',
'FLX Flash|GB|highflyer|f||a:27 sk:1 h:undercut hc:0 of:trunks oc:14 o2:7',
'The Dominatr|GB|powerhouse|f||a:36 sk:0 h:buzz hc:0 bd:big of:trunks oc:21 o2:7',
'Titan GB|GB|powerhouse|f||a:34 sk:1 h:buzz hc:3 bd:big of:trunks oc:3 o2:7',
'Critical Massa|GB|powerhouse|f||a:35 sk:0 h:long hc:2 bd:big of:trunks oc:21 o2:7',
'Drakke|GB|brawler|f||a:31 sk:0 h:shaggy hc:0 of:trunks oc:1 o2:0',
'Bruiser Browne|GB|brawler|f||a:38 sk:0 h:slick hc:3 b:stubble of:trunks oc:21 o2:0',
'Corvyss|GB|hardcore|f||a:30 sk:1 h:shaggy hc:0 of:trunks oc:21 o2:21',
'Lupo Leigh|GB|brawler|f||a:33 sk:0 h:spiky hc:0 of:trunks oc:3 o2:21',
'Damien Cross|GB|technician|f||a:29 sk:1 h:undercut hc:0 of:trunks oc:0 o2:5 gr:tattoo',
'El Jugador Jr|GB|lucha|h|f|a:32 sk:0 h:long hc:5 of:singlet oc:1 o2:21',
'Necrosys|GB|hardcore|f||a:34 sk:0 h:spiky hc:3 b:stubble of:trunks oc:21 o2:7',
'Matty Spilatty|GB|technician|f||a:32 sk:1 h:spiky hc:2 of:trunks oc:21 o2:5',
'Rabid Raccoon|GB|hardcore|f||a:33 sk:1 h:buzz hc:0 of:trunks oc:21 o2:0 gr:tattoo',
'Tony Dynamyte|GB|brawler|f||a:40 sk:1 h:undercut hc:0 b:full of:trunks oc:3 o2:0',
'Bone Brother Rex|GB|brawler|f||a:35 sk:0 h:spiky hc:0 b:mustache of:trunks oc:21 o2:0 gr:tattoo',
'Bone Brother Ash|GB|brawler|f||a:34 sk:0 h:shaggy hc:0 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Billy Zeroh|GB|technician|f||a:28 sk:1 h:bald of:trunks oc:14 o2:7',
'Sir Eric Howard Scot|GB|technician|f||a:45 sk:1 h:undercut hc:0 b:stubble of:trunks oc:21 o2:7',
'Jessie Bell|GB|technician|h|f|a:27 sk:0 h:bangs hc:0 of:singlet oc:4 o2:0'
];
STB.eve=[['The Bone Brothers', ['Bone Brother Rex', 'Bone Brother Ash']]];

// HWU roster from user list (names altered)
CUR.hwu=[
'Mike Schwartz|DE|strong|f||a:36 sk:0 h:short hc:2 of:trunks oc:21 o2:7',
'Tempesto|DE|brawler|f||a:32 sk:0 h:bald b:mustache of:trunks oc:0 o2:21 gr:tattoo',
'Cody Kidmann|DE|technician|f||a:30 sk:0 h:undercut hc:0 b:full of:trunks oc:21 o2:21',
'Ivan Kiew|DE|powerhouse|f||a:34 sk:0 h:undercut hc:3 bd:big of:trunks oc:21 o2:7',
'Pete Bouncar|DE|strong|f||a:33 sk:0 h:slick hc:3 of:trunks oc:1 o2:5',
'Carnagge|DE|powerhouse|f||a:38 sk:0 h:bald bd:big of:trunks oc:0 o2:0 gr:tattoo',
'Tarkan Aslann|DE|brawler|f||a:37 sk:0 h:side hc:0 of:trunks oc:14 o2:5',
'Laurence Romann|DE|technician|f||a:39 sk:0 h:slick hc:2 b:mustache of:trunks oc:0 o2:5',
'Michael Schenkenbarg|DE|strong|f||a:40 sk:0 h:bald of:trunks oc:3 o2:7 gr:tattoo',
'Johnny Malibou|DE|technician|f||a:29 sk:0 h:buzz hc:3 b:stubble of:trunks oc:14 o2:5',
'Joshua Amarru|DE|technician|f||a:27 sk:0 h:bald b:full of:trunks oc:14 o2:7',
'Tim Stubing|DE|highflyer|f||a:24 sk:0 h:side hc:3 b:mustache of:trunks oc:21 o2:0',
'Elija Blume|DE|highflyer|f||a:25 sk:0 h:spiky hc:2 b:goatee of:trunks oc:14 o2:21',
'Feyaz Aguilar|DE|highflyer|f||a:29 sk:0 h:undercut hc:0 of:trunks oc:0 o2:7',
'Romerro|DE|strong|f||a:31 sk:0 h:spiky hc:3 b:goatee of:trunks oc:0 o2:21',
'Aleksander Belamy|DE|technician|f||a:30 sk:0 h:bald of:trunks oc:21 o2:7',
'Breezy Bruzer|DE|brawler|f||a:33 sk:0 h:slick hc:2 b:mustache of:trunks oc:21 o2:7',
'Dieter Schwarts|DE|brawler|f||a:41 sk:0 h:slick hc:2 b:goatee of:trunks oc:21 o2:0',
'Eli Castel|DE|technician|f||a:27 sk:0 h:undercut hc:0 of:trunks oc:21 o2:5',
'Nick Schreyer|DE|technician|f||a:28 sk:0 h:spiky hc:3 of:trunks oc:3 o2:5',
'Nik Hellstrom|DE|technician|f||a:29 sk:0 h:undercut hc:3 of:trunks oc:0 o2:21',
'Nitro Greene|DE|highflyer|f||a:26 sk:0 h:side hc:0 b:full of:trunks oc:3 o2:5 gr:tattoo',
'Ryan Klark|DE|technician|f||a:28 sk:0 h:slick hc:0 of:trunks oc:3 o2:5'
];
STB.hwu=[['Bremer Tag-Fundament', ['Ivan Kiew', 'Pete Bouncar']]];

// GWF (German Wrestling Federation) roster from user list (names altered)
CUR.bwf=[
'Ahuro|DE|strong|f||a:33 sk:0 h:slick hc:3 b:mustache of:trunks oc:14 o2:5',
'Max Feyfel|DE|technician|f||a:28 sk:0 h:bald b:full of:trunks oc:3 o2:0',
'Kurosh Bohemien|DE|technician|f||a:31 sk:0 h:long hc:2 b:goatee of:trunks oc:0 o2:0',
'Soranni|DE|highflyer|f||a:29 sk:0 h:shaggy hc:0 b:mustache of:trunks oc:14 o2:21',
'Axel Tischar|DE|technician|f||a:37 sk:0 h:shaggy hc:3 b:mustache of:trunks oc:21 o2:5',
'Rotten Moodoh|DE|hardcore|f||a:34 sk:0 h:short hc:3 of:trunks oc:1 o2:21',
'Metehaan|DE|strong|f||a:31 sk:0 h:bald of:trunks oc:14 o2:0',
'Tony Hartting|DE|brawler|f||a:35 sk:0 h:buzz hc:0 of:trunks oc:0 o2:0',
'Pascal Spalder|DE|powerhouse|f||a:36 sk:0 h:bald b:mustache bd:big of:trunks oc:21 o2:21 gr:tattoo',
'Tarkan Aslaan|DE|brawler|f||a:37 sk:0 h:short hc:2 of:trunks oc:0 o2:0',
'Erkan Sulcanni|DE|brawler|f||a:33 sk:0 h:bald of:trunks oc:3 o2:7',
'Evil Jarred|DE|hardcore|f||a:32 sk:0 h:side hc:0 of:trunks oc:3 o2:0 gr:tattoo',
'Hugo Brandt|DE|highflyer|f||a:26 sk:0 h:long hc:2 of:trunks oc:3 o2:0',
'Niklas Bok|DE|highflyer|f||a:25 sk:0 h:bald of:trunks oc:21 o2:0',
'Aytac Bahhar|DE|technician|f||a:29 sk:0 h:shaggy hc:0 b:stubble of:trunks oc:14 o2:5',
'Abdul Kenaan|DE|technician|f||a:30 sk:0 h:long hc:0 of:trunks oc:0 o2:5',
'Rambo Jr|DE|powerhouse|f||a:40 sk:0 h:spiky hc:3 bd:big of:trunks oc:0 o2:7',
'Peter Tihanyy|CZ|technician|f||a:34 sk:0 h:bald of:trunks oc:14 o2:21',
'Chuk Mambo|GB|technician|f||a:36 sk:1 h:short hc:2 of:trunks oc:21 o2:0',
'TK Cooperr|GB|technician|f||a:32 sk:0 h:spiky hc:3 of:trunks oc:1 o2:0',
'Lawrence Romaan|DE|technician|f||a:39 sk:0 h:spiky hc:0 of:trunks oc:14 o2:7',
'Kougga|JP|highflyer|f||a:33 sk:5 h:side hc:0 of:trunks oc:21 o2:21',
'Violet Nite|DE|technician|h|f|a:29 sk:0 h:pony hc:3 of:singlet oc:9 o2:21',
'Jane Neroh|DE|technician|h|f|a:27 sk:0 h:long hc:0 of:singlet oc:4 o2:21',
'Orsy|CZ|powerhouse|h|f|a:28 sk:0 h:bob hc:2 of:singlet oc:21 o2:9',
'Nixy XS|DE|highflyer|h|f|a:23 sk:0 h:wavy hc:3 of:singlet oc:1 o2:5'
];
STB.bwf=[['Blutsbrüder', ['Erkan Sulcanni', 'Evil Jarred']], ['Quick And Dirty', ['Hugo Brandt', 'Niklas Bok']], ['The Royal Throne', ['Kurosh Bohemien', 'Soranni']], ['Sunshine Machine', ['Chuk Mambo', 'TK Cooperr']]];

// CWA roster based on POW (Hannover), user list (names altered)
CUR.cwa=[
'Paskal Spalter|DE|powerhouse|f||a:36 sk:0 h:buzz hc:0 bd:big of:trunks oc:21 o2:21',
'Leon van Gastern|DE|technician|f||a:45 sk:0 h:spiky hc:0 of:trunks oc:14 o2:0',
'Tim Stübbing|DE|highflyer|f||a:24 sk:0 h:undercut hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Kevin Hartman|DE|technician|f||a:23 sk:0 h:side hc:3 of:trunks oc:0 o2:7 gr:tattoo',
'Ricky Skye|CZ|technician|f||a:29 sk:0 h:long hc:0 b:goatee of:trunks oc:14 o2:7',
'David Oliva|PL|strong|f||a:31 sk:0 h:slick hc:0 of:trunks oc:14 o2:5',
'Chris Raber|DE|strong|f||a:35 sk:0 h:shaggy hc:2 b:full of:trunks oc:1 o2:0',
'Andy Theos|DE|strong|f||a:33 sk:0 h:long hc:0 of:trunks oc:1 o2:21',
'Michel Schenkenberg|DE|strong|f||a:40 sk:0 h:buzz hc:0 of:trunks oc:21 o2:7',
'Florenz de la Vegga|DE|technician|f||a:36 sk:0 h:slick hc:0 of:trunks oc:21 o2:5',
'Hector Invictus|DE|strong|f||a:32 sk:0 h:buzz hc:0 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Nik Schrayer|DE|highflyer|f||a:26 sk:0 h:slick hc:3 of:trunks oc:14 o2:0',
'Demolition Davys|GB|powerhouse|f||a:38 sk:1 h:slick hc:0 bd:big of:trunks oc:14 o2:7',
'Mila Smid|DE|technician|h|f|a:27 sk:0 h:bangs hc:2 of:singlet oc:21 o2:5'
];
STB.cwa=[['Team Visegrad', ['Ricky Skye', 'David Oliva']]];

// BJW roster from user list (names altered)
CUR.bnp=[
'Abdullah Kobayashy|JP|hardcore|f||a:44 sk:5 h:shaggy hc:0 b:mustache of:trunks oc:14 o2:7',
'Kazumasa Yoshidah|JP|strong|f||a:30 sk:5 h:short hc:3 b:goatee of:trunks oc:21 o2:0 gr:tattoo',
'Shoki Kitamora|JP|highflyer|f||a:26 sk:5 h:short hc:0 b:goatee of:trunks oc:21 o2:5',
'Kazumi Kikuto|JP|technician|f||a:37 sk:5 h:undercut hc:3 b:stubble of:trunks oc:21 o2:21 gr:tattoo',
'Toru Sugiyura|JP|technician|f||a:33 sk:5 h:short hc:0 of:trunks oc:3 o2:5',
'Ryuji Itou|JP|hardcore|f||a:45 sk:5 h:bald of:trunks oc:21 o2:5',
'Kankuro Hoshyno|JP|hardcore|f||a:42 sk:5 h:undercut hc:0 of:trunks oc:21 o2:5',
'Hideyoshi Kamitany|JP|brawler|f||a:37 sk:5 h:slick hc:3 b:full of:trunks oc:14 o2:5',
'Masashi Takedah|JP|hardcore|f||a:44 sk:5 h:side hc:2 b:full of:trunks oc:21 o2:0',
'Masaya Takahasi|JP|hardcore|f||a:34 sk:5 h:side hc:0 of:trunks oc:14 o2:21 gr:tattoo',
'Yuko Miyamotto|JP|hardcore|f||a:40 sk:5 h:spiky hc:0 of:trunks oc:14 o2:5',
'Daysuke Sekimoto|JP|powerhouse|f||a:44 sk:5 h:undercut hc:2 b:full bd:big of:trunks oc:14 o2:5 gr:tattoo',
'Daichi Hashimotto|JP|strong|f||a:28 sk:5 h:shaggy hc:3 of:trunks oc:21 o2:5',
'Yasufumi Nakanoe|JP|powerhouse|f||a:39 sk:5 h:spiky hc:3 b:goatee bd:big of:trunks oc:21 o2:0 gr:tattoo',
'Yuya Aokyi|JP|strong|f||a:30 sk:5 h:spiky hc:0 b:full of:trunks oc:21 o2:21',
'Towa Iwasaky|JP|strong|f||a:26 sk:5 h:shaggy hc:0 b:stubble of:trunks oc:21 o2:7'
];
STB.bnp=[['Strong BJ', ['Daysuke Sekimoto', 'Daichi Hashimotto', 'Yuya Aokyi', 'Towa Iwasaky']], ['Deathmatch Dragons', ['Ryuji Itou', 'Kankuro Hoshyno', 'Hideyoshi Kamitany']], ['Tag Champions', ['Kazumi Kikuto', 'Toru Sugiyura']]];

// IWRG roster from user list (names altered)
CUR.atl=[
'Hijo de Silver Kin|MX|lucha|f||a:30 sk:9 mk:full mc:0 of:trunks oc:3 o2:0',
'Toxyn|MX|lucha|f||a:40 sk:9 mk:full mc:0 of:trunks oc:21 o2:21',
'Flamyta|MX|highflyer|f||a:31 sk:9 mk:full mc:3 of:trunks oc:1 o2:0',
'Rey Halcon Jr|MX|highflyer|f||a:29 sk:1 mk:full mc:6 of:trunks oc:21 o2:0',
'Jack Morriz|US|technician|f||a:32 sk:0 h:undercut hc:0 of:trunks oc:14 o2:0',
'Tiranno|MX|brawler|f||a:34 sk:1 mk:full mc:14 of:trunks oc:0 o2:0',
'Gran Pandemonio|MX|powerhouse|f||a:40 sk:9 mk:full mc:21 of:trunks oc:0 o2:21',
'Hijo de Pandemonio|MX|brawler|f||a:32 sk:9 mk:full mc:3 of:trunks oc:0 o2:5',
'Pandemonio Jr|MX|brawler|f||a:27 sk:1 mk:full mc:3 of:trunks oc:14 o2:5',
'El Hijo de Canis Lupo|MX|brawler|f||a:34 sk:1 mk:full mc:1 of:trunks oc:0 o2:21',
'Multifacetico Jr|MX|lucha|f||a:32 sk:9 mk:full mc:6 of:trunks oc:3 o2:21',
'Rey Mictlan II|MX|brawler|f||a:30 sk:9 mk:full mc:6 of:trunks oc:21 o2:5',
'Rokambol Jr|MX|lucha|f||a:27 sk:9 mk:full mc:6 of:trunks oc:14 o2:5',
'Villano Vee Jr|MX|lucha|f||a:33 sk:9 mk:full mc:0 of:trunks oc:1 o2:21',
'Rokambol|MX|lucha|f||a:53 sk:9 mk:full mc:0 of:trunks oc:0 o2:21',
'Cerebro Negrro|MX|brawler|f||a:50 sk:9 mk:full mc:14 of:trunks oc:3 o2:5',
'Freelancer|MX|technician|f||a:33 sk:1 mk:full mc:21 of:trunks oc:0 o2:21',
'Hijo de Scorpion Jr|MX|lucha|f||a:30 sk:9 mk:full mc:3 of:trunks oc:1 o2:5',
'Caballero de Platta|MX|technician|f||a:36 sk:9 mk:full mc:0 of:trunks oc:21 o2:5',
'Bombero Infernall|MX|brawler|f||a:45 sk:9 mk:full mc:14 of:trunks oc:0 o2:21',
'Fly Jr|MX|highflyer|f||a:25 sk:1 mk:full mc:21 of:trunks oc:3 o2:21',
'Kikiri Bum|MX|highflyer|f||a:27 sk:9 mk:full mc:1 of:trunks oc:1 o2:5',
'Aguila Orientall|MX|highflyer|f||a:26 sk:1 mk:full mc:21 of:trunks oc:1 o2:5',
'Rey Leon X|MX|lucha|f||a:27 sk:9 mk:full mc:3 of:trunks oc:1 o2:0',
'Tokii|MX|highflyer|f||a:24 sk:9 mk:full mc:1 of:trunks oc:0 o2:0',
'Brad Alexis|MX|technician|f||a:27 sk:9 h:side hc:2 of:trunks oc:21 o2:7',
'Principe Centauro Jr|MX|highflyer|f||a:26 sk:9 mk:full mc:6 of:trunks oc:3 o2:21',
'Angelux Jr|MX|highflyer|f||a:25 sk:9 mk:full mc:6 of:trunks oc:21 o2:5',
'Histeriosis|MX|brawler|f||a:38 sk:9 mk:full mc:21 of:trunks oc:14 o2:5',
'Comando Negrro Jr|MX|brawler|f||a:34 sk:9 mk:full mc:1 of:trunks oc:21 o2:0',
'Faunno|MX|brawler|f||a:37 sk:1 mk:full mc:14 of:trunks oc:21 o2:0',
'Kenjy|MX|brawler|f||a:31 sk:1 h:short hc:0 b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Kid Laberynto|MX|brawler|f||a:33 sk:1 mk:full mc:1 of:trunks oc:3 o2:0',
'Sagitarius|MX|technician|h|f|a:27 sk:9 h:braids hc:6 of:singlet oc:3 o2:9',
'Quimerra|MX|technician|h|f|a:31 sk:9 h:pigtails hc:0 of:singlet oc:14 o2:0',
'Lady Katt|MX|highflyer|h|f|a:29 sk:9 h:bob hc:10 of:singlet oc:9 o2:5',
'Kristta|MX|technician|h|f|a:28 sk:9 h:bangs hc:0 of:singlet oc:3 o2:0',
'Lady Pantha|MX|brawler|h|f|a:30 sk:9 h:pony hc:10 of:singlet oc:21 o2:0'
];
STB.atl=[['La Pandemia', ['Gran Pandemonio', 'Hijo de Pandemonio', 'Pandemonio Jr']], ['Revolución Crew', ['El Hijo de Canis Lupo', 'Multifacetico Jr', 'Rey Mictlan II']], ['Los Villanos', ['Rokambol Jr', 'Villano Vee Jr', 'Rokambol']]];

// PWA roster from user list (names altered)
CUR.sxw=[
'Will Kiedus|AU|strong|f||a:33 sk:1 h:buzz hc:0 of:trunks oc:21 o2:21',
'Kai Drakke|AU|brawler|f||a:32 sk:1 h:undercut hc:3 of:trunks oc:0 o2:5 gr:tattoo',
'Sam Osborn|AU|technician|f||a:29 sk:0 h:short hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Jack Osbourn|AU|technician|f||a:27 sk:0 h:side hc:0 of:trunks oc:14 o2:5 gr:tattoo',
'Robby Eagels|AU|highflyer|f||a:33 sk:7 h:side hc:0 b:goatee of:trunks oc:21 o2:0 gr:tattoo',
'Ricky Sauth|AU|strong|f||a:34 sk:0 h:long hc:2 b:stubble of:trunks oc:21 o2:0',
'Jack J Bonzo|AU|brawler|f||a:45 sk:1 h:short hc:0 of:trunks oc:14 o2:5',
'Big Fudgee|AU|powerhouse|f||a:37 sk:0 h:bald b:goatee bd:big of:trunks oc:0 o2:7',
'Mick Moreti|AU|technician|f||a:36 sk:7 h:long hc:0 b:goatee of:trunks oc:14 o2:5',
'Caveman Ugh|AU|powerhouse|f||a:38 sk:1 h:bald bd:big of:trunks oc:21 o2:5 gr:tattoo',
'Paris De Silvia|AU|highflyer|f||a:28 sk:0 h:slick hc:3 of:trunks oc:21 o2:21',
'Jude Londen|AU|highflyer|f||a:27 sk:1 h:slick hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Robby Thorp|AU|strong|f||a:31 sk:1 h:slick hc:3 of:trunks oc:21 o2:5',
'Tony Synn|AU|technician|f||a:32 sk:7 h:bald b:goatee of:trunks oc:0 o2:7 gr:tattoo',
'Mana Jr|AU|brawler|f||a:35 sk:1 h:bald of:trunks oc:3 o2:7 gr:tattoo',
'Manoosh|AU|brawler|f||a:33 sk:1 h:spiky hc:0 of:trunks oc:0 o2:5',
'Charli Evens|AU|hardcore|h|f|a:31 sk:1 h:pony hc:0 of:singlet oc:14 o2:5',
'Jessica Troyy|AU|technician|h|f|a:29 sk:0 h:bob hc:6 of:singlet oc:0 o2:5',
'Nikki Van Blare|AU|brawler|h|f|a:24 sk:1 h:bob hc:0 of:singlet oc:21 o2:9',
'Madison Eagels|AU|technician|h|f|a:42 sk:1 h:pony hc:5 of:singlet oc:4 o2:5',
'Shazza McKenzy|AU|highflyer|h|f|a:29 sk:1 h:wavy hc:0 of:singlet oc:0 o2:0'
];
STB.sxw=[['North Shore Wrestling', ['Sam Osborn', 'Jack Osbourn']], ['The Velocities', ['Paris De Silvia', 'Jude Londen']], ['Pillars of Majesty', ['Robby Thorp', 'Tony Synn']], ['Mana & Manoosh', ['Mana Jr', 'Manoosh']]];

// Mystery Wrestling roster from user list (names altered)
CUR.mys=[
'Cool Reff|CA|technician|f||a:38 sk:3 h:shaggy hc:0 of:trunks oc:21 o2:0',
'Junior Benyto|CA|highflyer|f||a:28 sk:3 h:short hc:2 of:trunks oc:21 o2:21',
'Evil Unoh|CA|technician|f||a:37 sk:1 h:spiky hc:2 of:trunks oc:1 o2:7',
'Stu Graysen|CA|highflyer|f||a:36 sk:3 h:side hc:0 b:goatee of:trunks oc:3 o2:5',
'Psyko Mike|CA|hardcore|f||a:40 sk:1 h:bald b:stubble of:trunks oc:21 o2:5',
'Londen Lightning|CA|highflyer|f||a:26 sk:1 h:spiky hc:0 of:trunks oc:3 o2:7',
'Thomas Dubwa|CA|powerhouse|f||a:33 sk:0 h:slick hc:0 bd:big of:trunks oc:0 o2:5',
'Cecil Nyxx|CA|brawler|f||a:34 sk:3 h:side hc:3 of:trunks oc:0 o2:21',
'Sasquatch Jr|CA|powerhouse|f||a:38 sk:3 mk:full mc:21 of:trunks oc:1 o2:0',
'HADDI|CA|brawler|f||a:29 sk:0 h:undercut hc:3 of:trunks oc:3 o2:0 gr:tattoo',
'James Stoan|CA|technician|f||a:28 sk:0 h:long hc:0 b:full of:trunks oc:3 o2:0 gr:tattoo',
'Dreya Mitchel|CA|powerhouse|h|f|a:31 sk:1 h:halfup hc:6 of:singlet oc:4 o2:9',
'Layla Wild|CA|technician|h|f|a:27 sk:0 h:wavy hc:10 of:singlet oc:21 o2:21',
'Katrina Creedd|CA|brawler|h|f|a:29 sk:3 h:pony hc:3 of:singlet oc:21 o2:5'
];
STB.mys=[['Mystère Originals', ['Evil Unoh', 'Stu Graysen', 'Psyko Mike']]];

// DEFY roster from user list (names altered)
CUR.def=[
'Brian Keeth|US|strong|f||a:37 sk:9 h:bald b:goatee of:trunks oc:14 o2:21',
'Trey Migell|US|highflyer|f||a:34 sk:7 h:undercut hc:2 of:trunks oc:21 o2:7',
'Judas Icaris|CA|technician|f||a:31 sk:0 h:buzz hc:3 of:trunks oc:21 o2:21 gr:tattoo',
'Travis Willams|CA|technician|f||a:31 sk:0 h:long hc:3 of:trunks oc:21 o2:21',
'Guillermo Rosaz|US|brawler|f||a:30 sk:1 h:long hc:3 of:trunks oc:21 o2:21',
'Schaf|US|powerhouse|f||a:37 sk:0 h:bald bd:big of:trunks oc:21 o2:7',
'Russ Joans|US|brawler|f||a:37 sk:0 h:spiky hc:3 b:full of:trunks oc:14 o2:21 gr:tattoo',
'Cody Chun|US|technician|f||a:33 sk:0 h:long hc:2 b:stubble of:trunks oc:3 o2:0',
'Steven Bordan|US|technician|f||a:25 sk:3 h:bald of:trunks oc:0 o2:7',
'Jon Moxly|US|hardcore|f||a:40 sk:3 h:buzz hc:2 of:trunks oc:1 o2:7',
'Danyel Garcya|US|technician|f||a:28 sk:3 h:buzz hc:3 of:trunks oc:3 o2:7',
'Shaun Deane|US|technician|f||a:34 sk:3 h:short hc:0 of:trunks oc:21 o2:0',
'Lyo Rush|US|highflyer|f||a:30 sk:0 h:side hc:0 b:mustache of:trunks oc:21 o2:7',
'Alan Angls|US|highflyer|f||a:29 sk:3 h:side hc:3 of:trunks oc:1 o2:21',
'Gringo Loko|MX|lucha|f||a:44 sk:1 mk:full mc:0 of:trunks oc:3 o2:5',
'Trent Beretti|US|technician|f||a:40 sk:3 h:short hc:3 of:trunks oc:21 o2:0',
'Marina Shafyr|US|brawler|h|f|a:38 sk:3 h:pony hc:2 of:singlet oc:21 o2:9',
'Carli Bravvo|US|technician|h|f|a:25 sk:3 h:pigtails hc:5 of:singlet oc:4 o2:21',
'Trysh Adora|US|technician|h|f|a:34 sk:1 h:pony hc:2 of:singlet oc:21 o2:0'
];
STB.def=[['Death Riders', ['Jon Moxly', 'Danyel Garcya', 'Marina Shafyr']], ['Hellhounds', ['Schaf', 'Russ Joans']], ['Sinner & Saint', ['Judas Icaris', 'Travis Willams']], ['The Infantry', ['Shaun Deane', 'Carli Bravvo', 'Trysh Adora']]];

// OVW roster from user list (names altered)
CUR.orw=[
'Dustin Jaxon|US|strong|f||a:32 sk:0 h:short hc:3 b:mustache of:trunks oc:21 o2:5',
'Tommy Boi|US|highflyer|f||a:27 sk:7 h:side hc:2 of:trunks oc:3 o2:7 gr:tattoo',
'Adam Revolvar|US|brawler|f||a:44 sk:1 h:shaggy hc:2 b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Tony Gunne|US|brawler|f||a:45 sk:7 h:buzz hc:0 of:trunks oc:21 o2:7',
'Jay DeNeiro|US|strong|f||a:31 sk:3 h:buzz hc:2 b:mustache of:trunks oc:1 o2:5',
'Jay Threee|US|technician|f||a:28 sk:0 h:buzz hc:2 b:mustache of:trunks oc:0 o2:0',
'Al Snoe|US|hardcore|f||a:62 sk:0 h:spiky hc:0 of:trunks oc:21 o2:0',
'Ca$h Floh|US|powerhouse|f||a:38 sk:3 h:slick hc:0 bd:big of:trunks oc:3 o2:0',
'Mahabali Shara|CA|powerhouse|f||a:41 sk:0 h:shaggy hc:0 bd:big of:trunks oc:21 o2:0',
'Jesse Godders|US|technician|f||a:38 sk:1 h:buzz hc:0 of:trunks oc:3 o2:7',
'Kal Hero|US|technician|f||a:29 sk:0 h:buzz hc:0 of:trunks oc:21 o2:5',
'Kid Colossal|US|powerhouse|f||a:34 sk:1 h:bald bd:big of:trunks oc:0 o2:5',
'Jack Vawn|US|strong|f||a:33 sk:3 h:bald of:trunks oc:0 o2:7',
'Metto|US|brawler|f||a:30 sk:0 h:buzz hc:0 b:goatee of:trunks oc:0 o2:21 gr:tattoo',
'Stephen Steele|US|technician|f||a:29 sk:7 h:slick hc:0 b:stubble of:trunks oc:3 o2:0 gr:tattoo',
'Brandon Davies|US|technician|f||a:28 sk:0 h:buzz hc:0 of:trunks oc:14 o2:21',
'Crixxus|US|brawler|f||a:34 sk:9 h:side hc:2 b:goatee of:trunks oc:21 o2:5',
'J-Rodd|US|technician|h|f|a:27 sk:1 h:wavy hc:6 of:singlet oc:4 o2:0',
'Hollywood Haley Jay|US|brawler|h|f|a:27 sk:1 h:halfup hc:2 of:singlet oc:0 o2:0',
'Dayamy|US|technician|h|f|a:31 sk:1 h:pony hc:2 of:singlet oc:1 o2:21',
'Freya the Slayah|US|powerhouse|h|f|a:30 sk:7 h:wavy hc:2 of:singlet oc:11 o2:9',
'Shalonce Royale|US|technician|h|f|a:28 sk:7 h:long hc:0 of:singlet oc:1 o2:5',
'Janey Hartmann|US|technician|h|f|a:27 sk:1 h:bob hc:5 of:singlet oc:9 o2:5',
'Lovely Miss Larken|US|technician|h|f|a:29 sk:7 h:long hc:2 of:singlet oc:11 o2:21'
];
STB.orw=[['Damn OGs', ['Adam Revolvar', 'Tony Gunne']]];

// APC (France) roster from user list (names altered)
CUR.llf=[
'Nate Prynce|GB|strong|f||a:31 sk:0 h:shaggy hc:3 b:goatee of:trunks oc:21 o2:7',
'Joe Landoh|GB|highflyer|f||a:29 sk:0 h:short hc:3 b:mustache of:trunks oc:21 o2:21',
'Danny Blakk|GB|highflyer|f||a:28 sk:0 h:short hc:3 of:trunks oc:3 o2:5',
'Erin Ordoh|FR|technician|f||a:26 sk:1 h:undercut hc:3 of:trunks oc:3 o2:7 gr:tattoo',
'Jax Numedyo|FR|highflyer|f||a:24 sk:0 h:undercut hc:2 of:trunks oc:21 o2:5 gr:tattoo',
'Kuroh|FR|powerhouse|f||a:36 sk:0 h:bald bd:big of:trunks oc:3 o2:0',
'Mecka|FR|powerhouse|f||a:35 sk:1 h:buzz hc:2 bd:big of:trunks oc:21 o2:5',
'Ricky Sosaa|FR|brawler|f||a:27 sk:3 h:slick hc:0 b:full of:trunks oc:14 o2:21',
'Zack Eritti|FR|technician|f||a:29 sk:3 h:buzz hc:0 of:trunks oc:1 o2:5',
'Cuma Bolatt|FR|powerhouse|f||a:34 sk:3 h:spiky hc:0 bd:big of:trunks oc:0 o2:5',
'Josh-Tee|FR|technician|f||a:25 sk:3 h:long hc:3 of:trunks oc:21 o2:7 gr:tattoo',
'Marcus Jawe|FR|technician|f||a:30 sk:1 h:undercut hc:0 b:mustache of:trunks oc:3 o2:5',
'JGU X|FR|technician|f||a:29 sk:3 h:spiky hc:0 of:trunks oc:21 o2:21',
'Jadon Carte|FR|highflyer|f||a:24 sk:1 h:side hc:0 b:full of:trunks oc:21 o2:21 gr:tattoo',
'Lio Jaice|FR|highflyer|f||a:25 sk:0 h:shaggy hc:2 b:stubble of:trunks oc:1 o2:21',
'Leeds Lewiss|FR|technician|f||a:24 sk:3 h:buzz hc:0 of:trunks oc:14 o2:0',
'Thiago Montera|FR|technician|f||a:26 sk:0 h:long hc:2 b:goatee of:trunks oc:21 o2:0',
'Ad Leonys|FR|technician|f||a:27 sk:1 h:shaggy hc:2 b:full of:trunks oc:14 o2:7 gr:tattoo',
'Amedeo X|FR|technician|f||a:26 sk:0 h:undercut hc:3 b:goatee of:trunks oc:14 o2:0',
'Skaarr|FR|brawler|f||a:27 sk:0 h:shaggy hc:2 b:mustache of:trunks oc:21 o2:0',
'Griffe|FR|technician|f||a:25 sk:1 h:shaggy hc:0 b:full of:trunks oc:21 o2:5 gr:tattoo',
'Ravgenne|FR|technician|f||a:25 sk:3 h:buzz hc:0 of:trunks oc:3 o2:0 gr:tattoo',
'Rhyoh|GB|highflyer|h|f|a:29 sk:0 h:braids hc:0 of:singlet oc:0 o2:21',
'Princesse Laurianna|FR|technician|h|f|a:27 sk:3 h:pigtails hc:3 of:singlet oc:11 o2:5',
'Celine Faerie|FR|brawler|h|f|a:28 sk:3 h:bangs hc:2 of:singlet oc:1 o2:9'
];
STB.llf=[['CPF', ['Joe Landoh', 'Danny Blakk']]];

// LLB (Barcelona) roster from user list (names altered)
CUR.lib=[
'Lacayo Sureno|ES|strong|f||a:30 sk:1 h:long hc:0 b:goatee of:trunks oc:1 o2:21 gr:tattoo',
'Joey Torrez|ES|brawler|f||a:33 sk:1 h:spiky hc:2 of:trunks oc:21 o2:5',
'Sito Sanchez|ES|brawler|f||a:34 sk:9 h:shaggy hc:0 b:full of:trunks oc:1 o2:7',
'Javier Vivez|ES|strong|f||a:36 sk:1 h:slick hc:2 of:trunks oc:3 o2:5',
'Marti Ubak|ES|powerhouse|f||a:35 sk:9 h:short hc:0 b:full bd:big of:trunks oc:21 o2:5',
'Iker Navaro|ES|technician|f||a:26 sk:1 h:short hc:2 of:trunks oc:21 o2:5',
'Ricky Barcelo|ES|technician|f||a:38 sk:9 h:buzz hc:0 b:goatee of:trunks oc:14 o2:7',
'Lozano X|ES|technician|f||a:30 sk:9 h:slick hc:0 b:mustache of:trunks oc:14 o2:0',
'Rogelio Maravila|ES|technician|f||a:31 sk:9 h:slick hc:3 b:full of:trunks oc:1 o2:7',
'Marc Menyno|ES|technician|f||a:28 sk:9 h:undercut hc:0 of:trunks oc:14 o2:7',
'Nathan de Wynd|ES|technician|f||a:27 sk:1 h:bald b:stubble of:trunks oc:21 o2:0',
'Calderra|ES|brawler|f||a:33 sk:1 h:long hc:2 b:stubble of:trunks oc:14 o2:5',
'Angel Reyez|ES|technician|f||a:29 sk:1 h:side hc:2 of:trunks oc:14 o2:21',
'Kid Lykus|GB|lucha|f||a:28 sk:1 mk:full mc:1 of:trunks oc:3 o2:5',
'Kid Lykus II|GB|lucha|f||a:26 sk:0 mk:full mc:21 of:trunks oc:3 o2:0',
'Abril de la Platta|ES|lucha|h|f|a:30 sk:1 h:bangs hc:2 of:singlet oc:14 o2:0',
'Alexa Jayde|ES|technician|h|f|a:27 sk:1 h:bob hc:0 of:singlet oc:21 o2:0',
'Session Moth Martinna|GB|brawler|h|f|a:30 sk:1 h:braids hc:2 of:singlet oc:14 o2:5'
];
STB.lib=[['Barcelona Blacklist', ['Joey Torrez', 'Sito Sanchez']], ['Plan C', ['Lozano X', 'Rogelio Maravila']], ['Lykos Gym', ['Kid Lykus', 'Kid Lykus II']]];

// RWA/PWR (Rome) roster from user list (names altered)
CUR.rwc=[
'Leon Chyro|IT|technician|f||a:27 sk:1 h:shaggy hc:3 b:goatee of:trunks oc:0 o2:5',
'Matthew Bulet Smyth|GB|brawler|f||a:30 sk:0 h:buzz hc:0 of:trunks oc:0 o2:5',
'Karim Brigant|IT|strong|f||a:37 sk:0 h:buzz hc:2 of:trunks oc:21 o2:5',
'Adryano|IT|powerhouse|f||a:36 sk:0 h:buzz hc:2 bd:big of:trunks oc:1 o2:5',
'Christyan Gladio|IT|powerhouse|f||a:40 sk:1 h:shaggy hc:3 b:stubble bd:big of:trunks oc:0 o2:7 gr:tattoo',
'D3 Jr|IT|technician|f||a:33 sk:0 h:buzz hc:3 of:trunks oc:14 o2:0',
'Luke Astarot|IT|hardcore|f||a:34 sk:0 h:spiky hc:0 of:trunks oc:21 o2:7 gr:tattoo',
'Max Peche|IT|technician|f||a:28 sk:1 h:undercut hc:2 of:trunks oc:21 o2:21',
'Zero The Fule|IT|highflyer|f||a:27 sk:1 h:bald of:trunks oc:21 o2:0',
'Jay Otto|IT|technician|f||a:29 sk:1 h:buzz hc:2 b:goatee of:trunks oc:21 o2:5',
'Omar Espozito|IT|technician|f||a:30 sk:0 h:spiky hc:0 b:goatee of:trunks oc:14 o2:5',
'Flavyo Augusto|IT|brawler|f||a:31 sk:0 h:buzz hc:3 of:trunks oc:3 o2:21',
'The Semm|IT|brawler|f||a:32 sk:0 h:shaggy hc:0 of:trunks oc:14 o2:21',
'DMTaomann|IT|technician|f||a:26 sk:0 h:side hc:0 of:trunks oc:21 o2:7',
'Dave Blasko|IT|technician|f||a:27 sk:1 h:spiky hc:0 of:trunks oc:3 o2:0',
'Vittorio Costansi|IT|technician|f||a:25 sk:0 h:side hc:3 of:trunks oc:1 o2:21',
'Miss Monika|IT|technician|h|f|a:30 sk:1 h:halfup hc:6 of:singlet oc:9 o2:21',
'Jaguar Julye|IT|lucha|h|f|a:29 sk:1 h:pigtails hc:0 of:singlet oc:3 o2:9',
'B3cca Jr|US|technician|h|f|a:28 sk:3 h:pony hc:5 of:singlet oc:11 o2:9',
'Elizabeth Rege|US|brawler|h|f|a:30 sk:9 h:bob hc:0 of:singlet oc:21 o2:0'
];
STB.rwc=[['ARCADIA', ['Max Peche', 'Zero The Fule']]];

// NPWF (Lagos) roster from user list (names altered)
CUR.llp=[
'Ultimate Commandar|NG|powerhouse|f||a:48 sk:3 h:shaggy hc:0 b:goatee bd:big of:trunks oc:3 o2:5 gr:tattoo',
'Flying Dankko|NG|highflyer|f||a:34 sk:3 h:buzz hc:2 of:trunks oc:14 o2:21',
'Mighty Mann|NG|powerhouse|f||a:40 sk:7 h:slick hc:2 b:full bd:big of:trunks oc:1 o2:21',
'Eagle De Great Nayl|NG|brawler|f||a:37 sk:3 h:long hc:0 of:trunks oc:21 o2:5',
'Zion Lyon|NG|strong|f||a:33 sk:3 h:bald of:trunks oc:21 o2:21',
'Mr. Sharpmann|NG|technician|f||a:42 sk:3 h:shaggy hc:3 of:trunks oc:3 o2:0',
'Afro De Gyant|NG|powerhouse|f||a:38 sk:7 h:buzz hc:0 bd:big of:trunks oc:21 o2:7',
'Kilimanjaro Jr|NG|strong|f||a:36 sk:7 h:short hc:0 b:stubble of:trunks oc:14 o2:0',
'Ikenga Red Dragon|NG|hardcore|f||a:32 sk:7 mk:full mc:21 of:trunks oc:21 o2:0',
'Malaysia Wulf|NG|brawler|f||a:35 sk:3 h:slick hc:0 of:trunks oc:14 o2:5',
'PowerLey|NG|strong|f||a:45 sk:3 h:spiky hc:2 of:trunks oc:0 o2:7 gr:tattoo',
'Super Armstrang|NG|highflyer|f||a:29 sk:7 h:undercut hc:3 b:stubble of:trunks oc:14 o2:0 gr:tattoo',
'Flying Dangerman X|NG|highflyer|f||a:27 sk:7 h:slick hc:3 b:stubble of:trunks oc:0 o2:21 gr:tattoo',
'Iron Skatter|NG|technician|f||a:31 sk:7 h:short hc:0 b:goatee of:trunks oc:21 o2:0',
'Alexandra The Quen|NG|powerhouse|h|f|a:30 sk:7 h:pony hc:2 of:singlet oc:11 o2:5'
];
STB.llp=[];

// Art of Wrestling (Prague) roster from user list (names altered)
CUR.psw=[
'Lorence Romann|DE|technician|f||a:39 sk:0 h:side hc:0 of:trunks oc:21 o2:7 gr:tattoo',
'Asarra|CZ|highflyer|f||a:26 sk:0 h:long hc:3 of:trunks oc:3 o2:0',
'Zeritas|CZ|brawler|f||a:34 sk:0 h:side hc:2 of:trunks oc:21 o2:21 gr:tattoo',
'Maverik|CZ|highflyer|f||a:25 sk:0 h:undercut hc:0 b:full of:trunks oc:21 o2:7',
'Tamas Sabo|CZ|powerhouse|f||a:36 sk:0 h:spiky hc:0 b:goatee bd:big of:trunks oc:21 o2:0',
'Tarkan Aslahn|DE|brawler|f||a:37 sk:0 h:undercut hc:0 of:trunks oc:21 o2:5',
'Nik Schreir|DE|highflyer|f||a:26 sk:0 h:long hc:0 of:trunks oc:1 o2:21',
'Zoltahn|DE|technician|f||a:28 sk:0 h:slick hc:3 of:trunks oc:14 o2:0',
'Icarrus|CZ|highflyer|f||a:30 sk:0 h:short hc:2 of:trunks oc:21 o2:0 gr:tattoo',
'Emil Voller|DE|powerhouse|f||a:35 sk:0 h:spiky hc:2 bd:big of:trunks oc:21 o2:7',
'Alex Dyuke|DE|powerhouse|f||a:37 sk:0 h:undercut hc:2 b:goatee bd:big of:trunks oc:14 o2:0 gr:tattoo',
'Ricky Skai|CZ|technician|f||a:29 sk:0 h:shaggy hc:0 of:trunks oc:21 o2:21',
'David Olywa|PL|strong|f||a:31 sk:0 h:shaggy hc:0 of:trunks oc:0 o2:0',
'Gulyas Bro Adam|CZ|powerhouse|f||a:33 sk:0 h:shaggy hc:2 bd:big of:trunks oc:21 o2:21 gr:tattoo',
'Gulyas Bro Bela|CZ|powerhouse|f||a:31 sk:0 h:side hc:0 bd:big of:trunks oc:14 o2:7',
'SkullEvyl|CZ|brawler|f||a:32 sk:0 h:long hc:0 of:trunks oc:14 o2:21 gr:tattoo',
'Ken Pyroh|CZ|highflyer|f||a:29 sk:0 h:shaggy hc:0 b:mustache of:trunks oc:21 o2:5',
'Axel Foxx|CZ|highflyer|f||a:28 sk:0 h:long hc:2 b:goatee of:trunks oc:3 o2:5',
'Orsii|CZ|powerhouse|h|f|a:28 sk:0 h:wavy hc:2 of:singlet oc:4 o2:5',
'Jane Neero|DE|technician|h|f|a:27 sk:0 h:pigtails hc:3 of:singlet oc:3 o2:9',
'Iva Kolaski|CZ|technician|h|f|a:26 sk:0 h:bangs hc:0 of:singlet oc:14 o2:0',
'Reyka|CZ|technician|h|f|a:27 sk:0 h:pony hc:0 of:singlet oc:9 o2:0'
];
STB.psw=[['Visegrad', ['Ricky Skai', 'David Olywa']], ['Gulyas Bros', ['Gulyas Bro Adam', 'Gulyas Bro Bela']], ['Team Visegrad Alternative', ['SkullEvyl', 'Ken Pyroh']]];
STB.kpw=[['Bracia Fuks',['Filip Fuks','Michał Fuks']]];

// Freelance Wrestling roster (altered)
CUR.flw=[
'Trevor Outlaw|US|brawler|f||a:34 sk:0 h:long hc:0 b:stubble of:trunks oc:21 o2:7',
'Davey Bangg|US|highflyer|f||a:29 sk:3 h:shaggy hc:2 of:trunks oc:1 o2:0',
'August Mathews|US|technician|f||a:30 sk:0 h:spiky hc:0 b:full of:trunks oc:3 o2:5',
'Chico Suavé|US|highflyer|f||a:27 sk:7 h:spiky hc:0 of:trunks oc:21 o2:5',
'Shane Mercier|US|powerhouse|f||a:36 sk:1 h:long hc:0 b:mustache bd:big of:trunks oc:21 o2:21',
'James Russo|US|technician|f||a:45 sk:9 h:buzz hc:0 of:trunks oc:0 o2:7 gr:tattoo',
'Mason Morgen|US|strong|f||a:29 sk:3 h:shaggy hc:3 b:stubble of:trunks oc:21 o2:21',
'Sean Logan|US|brawler|f||a:32 sk:0 h:buzz hc:2 b:goatee of:trunks oc:14 o2:5',
'Victor Iniesta|MX|lucha|f||a:30 sk:9 mk:full mc:1 of:trunks oc:3 o2:0',
'Darin Corben|US|technician|f||a:42 sk:0 h:undercut hc:0 of:trunks oc:21 o2:7',
'Craig Mitchel|US|brawler|f||a:35 sk:0 h:short hc:2 of:trunks oc:1 o2:0',
'Devon Monrow|US|technician|f||a:31 sk:3 h:bald b:mustache of:trunks oc:0 o2:7',
'Cole Radrik|US|strong|f||a:33 sk:0 h:buzz hc:0 of:trunks oc:21 o2:0 gr:tattoo',
'Sabin Gage|US|brawler|f||a:34 sk:3 h:buzz hc:3 b:goatee of:trunks oc:21 o2:7',
'Frank the Klown|US|technician|f||a:48 sk:3 h:undercut hc:0 of:trunks oc:14 o2:5 gr:tattoo',
'Shaza Mckenzi|US|technician|h|f|a:28 sk:9 h:wavy hc:0 of:singlet oc:0 o2:0',
'Lili Ruizz|MX|lucha|h|f|a:27 sk:1 h:braids hc:10 of:singlet oc:21 o2:5',
'Kylie Rae|US|technician|h|f|a:33 sk:3 h:pony hc:5 of:singlet oc:1 o2:9',
'Izzy Morreno|US|highflyer|h|f|a:24 sk:0 h:pony hc:3 of:singlet oc:9 o2:21'
];
STB.flw=[['The Syndicate', ['Shane Mercier', 'Davey Bangg', 'August Mathews', 'James Russo']], ['SMS', ['Shaza Mckenzi', 'Mason Morgen', 'Sean Logan']], ['Mexican AF', ['Victor Iniesta', 'Lili Ruizz']], ['C.O.C.K.', ['Darin Corben', 'Craig Mitchel']]];

// PCW Preston roster mapped to nst (altered)
CUR.nst=[
'RP Davis|GB|technician|f||a:36 sk:0 h:long hc:2 of:trunks oc:21 o2:21',
'Jack Jonson|GB|highflyer|f||a:27 sk:0 h:long hc:0 of:trunks oc:21 o2:5',
'Rampage Braun|GB|powerhouse|f||a:37 sk:0 h:bald b:full bd:big of:trunks oc:1 o2:21',
'Tyson T-Bonne|GB|powerhouse|f||a:38 sk:0 h:undercut hc:0 b:full bd:big of:trunks oc:14 o2:5',
'Death Roe A|GB|hardcore|f||a:35 sk:0 h:long hc:2 of:trunks oc:1 o2:5',
'Death Roe B|GB|hardcore|f||a:33 sk:0 h:slick hc:0 of:trunks oc:0 o2:7',
'Philip Mikael|GB|technician|f||a:33 sk:0 h:side hc:0 of:trunks oc:3 o2:5',
'Tel Banhem|GB|brawler|f||a:32 sk:1 h:spiky hc:0 b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Uhaa Nations|US|highflyer|f||a:37 sk:0 h:spiky hc:0 of:trunks oc:21 o2:5',
'Ernest Boggz|GB|strong|f||a:29 sk:0 h:short hc:0 b:stubble of:trunks oc:3 o2:5',
'Dean Allmarc|GB|technician|f||a:46 sk:1 h:slick hc:3 b:mustache of:trunks oc:1 o2:5',
'Iestyn Reece|GB|powerhouse|f||a:34 sk:0 h:bald bd:big of:trunks oc:1 o2:21',
'Commander Stefanie Sterlin|GB|technician|h|f|a:36 sk:0 h:braids hc:2 of:singlet oc:0 o2:5',
'Priscila Kelley|GB|technician|h|f|a:27 sk:0 h:braids hc:5 of:singlet oc:0 o2:9'
];
STB.nst=[['Team Single', ['Rampage Braun', 'Tyson T-Bonne']], ['Death Roe', ['Death Roe A', 'Death Roe B']], ['Philip & Tel', ['Philip Mikael', 'Tel Banhem']]];

// WrestlingKULT Oberhausen mapped to rpc (altered)
CUR.rpc=[
'Mike Schwarz|DE|powerhouse|f||a:40 sk:0 h:short hc:2 bd:big of:trunks oc:21 o2:7',
'Don Shin|DE|brawler|f||a:33 sk:0 h:undercut hc:2 of:trunks oc:0 o2:7',
'Kevin Kaydan|DE|brawler|f||a:31 sk:0 h:slick hc:0 b:mustache of:trunks oc:1 o2:5 gr:tattoo',
'Aaron Insane|DE|brawler|f||a:33 sk:0 h:shaggy hc:3 b:goatee of:trunks oc:21 o2:7',
'Chris Rusch|DE|brawler|f||a:34 sk:0 h:undercut hc:2 b:full of:trunks oc:1 o2:21',
'Carnage Kult|DE|hardcore|f||a:38 sk:0 h:short hc:0 of:trunks oc:3 o2:0',
'Bernd Föhn|DE|technician|f||a:41 sk:0 h:long hc:3 of:trunks oc:14 o2:21',
'Feyyaz Aguilar|ES|highflyer|f||a:32 sk:9 h:slick hc:2 b:goatee of:trunks oc:3 o2:5',
'Marius Al-Anni|DE|technician|f||a:37 sk:0 h:side hc:0 of:trunks oc:14 o2:0',
'Tarkan Aslan|DE|brawler|f||a:37 sk:0 h:undercut hc:0 of:trunks oc:21 o2:5',
'Amalé|FR|technician|h|f|a:29 sk:3 h:braids hc:6 of:singlet oc:4 o2:9',
'Melanie Grey|DE|technician|h|f|a:30 sk:0 h:halfup hc:6 of:singlet oc:11 o2:5',
'La Catrinna|MX|lucha|h|f|a:28 sk:9 h:long hc:3 of:singlet oc:1 o2:0'
];
STB.rpc=[['The Dark Society', ['Don Shin', 'Kevin Kaydan']], ['Insane Rush', ['Aaron Insane', 'Chris Rusch']]];

// The Crash Tijuana mapped to tfc (altered)
CUR.tfc=[
'D-Luxe|MX|lucha|f||a:32 sk:1 mk:full mc:3 of:trunks oc:0 o2:5',
'Anubiss|MX|lucha|f||a:29 sk:1 mk:full mc:14 of:trunks oc:21 o2:21',
'El Texano Junior|MX|lucha|f||a:41 sk:1 mk:full mc:6 of:trunks oc:21 o2:5',
'Super Novva|MX|lucha|f||a:33 sk:1 mk:full mc:0 of:trunks oc:3 o2:0',
'Zonic|MX|lucha|f||a:23 sk:9 mk:full mc:0 of:trunks oc:21 o2:21',
'Mambaa|MX|lucha|f||a:28 sk:9 mk:full mc:21 of:trunks oc:3 o2:0',
'Black Dangerr|MX|lucha|f||a:31 sk:9 mk:full mc:6 of:trunks oc:0 o2:0',
'Valentinno|MX|lucha|f||a:33 sk:1 mk:full mc:21 of:trunks oc:21 o2:21',
'Demonio Infernall|MX|lucha|f||a:36 sk:9 mk:full mc:1 of:trunks oc:3 o2:0',
'Xtreme Tigre|MX|lucha|f||a:38 sk:1 mk:full mc:3 of:trunks oc:21 o2:21',
'Hijo de Rey Mistero|MX|lucha|f||a:34 sk:9 mk:full mc:6 of:trunks oc:0 o2:0',
'Santo Junior|MX|lucha|f||a:38 sk:1 mk:full mc:1 of:trunks oc:21 o2:21',
'Santino Marello|CA|strong|f||a:42 sk:3 h:short hc:0 b:full of:trunks oc:14 o2:5',
'Ninja Mac|US|highflyer|f||a:34 sk:0 h:slick hc:0 of:trunks oc:21 o2:7',
'Jack Cartwheell|US|highflyer|f||a:29 sk:0 h:buzz hc:0 b:goatee of:trunks oc:21 o2:5 gr:tattoo',
'Sam Adonnis|MX|brawler|f||a:35 sk:9 h:side hc:3 of:trunks oc:21 o2:0 gr:tattoo',
'Heddi Karaouy|FR|brawler|f||a:33 sk:0 h:long hc:0 of:trunks oc:21 o2:21',
'Amnesia Junior|MX|lucha|f||a:26 sk:9 mk:full mc:3 of:trunks oc:0 o2:0',
'Noisy Boyy|MX|lucha|f||a:30 sk:1 mk:full mc:3 of:trunks oc:1 o2:21',
'El Moscoo|MX|lucha|f||a:31 sk:9 mk:full mc:0 of:trunks oc:3 o2:0',
'Lady Shadoww|MX|lucha|h|f|a:30 sk:9 h:wavy hc:3 of:singlet oc:9 o2:9',
'Dulce Canela|MX|lucha|h|f|a:27 sk:9 h:bob hc:10 of:singlet oc:0 o2:9',
'Keira Tj|MX|lucha|h|f|a:28 sk:9 h:braids hc:0 of:singlet oc:4 o2:21'
];
STB.tfc=[['La Fashion', ['Mambaa', 'Dulce Canela']], ['Los Infieles', ['Black Dangerr', 'Valentinno']]];

// Superkick-D Toronto mapped to tir (altered)
CUR.tir=[
'Dallas Kyle|CA|highflyer|f||a:27 sk:0 h:side hc:0 b:full of:trunks oc:3 o2:21',
'Dior Nolinz|CA|hardcore|f||a:27 sk:0 h:spiky hc:0 b:goatee of:trunks oc:1 o2:5',
'Psycho Mikee|CA|hardcore|f||a:37 sk:3 h:short hc:2 of:trunks oc:14 o2:0',
'Duragg|CA|brawler|f||a:34 sk:3 h:shaggy hc:2 of:trunks oc:21 o2:0',
'Jessie Vee|CA|technician|f||a:33 sk:1 h:spiky hc:0 b:goatee of:trunks oc:21 o2:21',
'Jack Maguirre|CA|powerhouse|f||a:35 sk:0 h:short hc:0 b:full bd:big of:trunks oc:3 o2:21 gr:tattoo',
'Kris Chambars|CA|technician|f||a:44 sk:3 h:short hc:0 of:trunks oc:14 o2:5',
'Ashley Sixxx|CA|brawler|f||a:45 sk:1 h:spiky hc:0 of:trunks oc:21 o2:7',
'Slam Campbel|CA|powerhouse|f||a:36 sk:0 h:side hc:3 b:goatee bd:big of:trunks oc:1 o2:21',
'Jimmy Townsen|CA|highflyer|f||a:26 sk:3 h:slick hc:0 b:full of:trunks oc:21 o2:7 gr:tattoo',
'Jay Blasst|CA|highflyer|f||a:25 sk:0 h:slick hc:3 of:trunks oc:0 o2:0',
'Kobe Durstt|CA|strong|f||a:30 sk:0 h:undercut hc:2 b:goatee of:trunks oc:21 o2:7',
'Alessandro Del Brunno|CA|technician|f||a:31 sk:0 h:undercut hc:3 b:mustache of:trunks oc:14 o2:21',
'Jax Willams|CA|brawler|f||a:29 sk:1 h:buzz hc:3 of:trunks oc:3 o2:7 gr:tattoo',
'Ren Joans|CA|strong|f||a:28 sk:1 h:slick hc:0 of:trunks oc:1 o2:5',
'Layla Wylde|CA|brawler|h|f|a:28 sk:0 h:halfup hc:2 of:singlet oc:3 o2:0'
];
STB.tir=[['Kings of the 6IX', ['Psycho Mikee', 'Duragg']]];
// NFW (Russia) - mapped from Federacje.docx, altered
CUR.nfw=[
'Dmitri Orlovsky|RU|powerhouse|f||a:34 sk:0 h:buzz hc:2 b:mustache bd:big of:trunks oc:1 o2:0',
'Aleksei Prisiazhny|RU|strong|f||a:31 sk:0 h:shaggy hc:0 of:trunks oc:0 o2:0 gr:tattoo',
'Artem Vlasik|RU|highflyer|f||a:26 sk:0 h:undercut hc:0 b:full of:trunks oc:0 o2:21',
'Akamir Bojkin|RU|hardcore|h||a:33 sk:0 h:bald of:trunks oc:14 o2:0',
'Digital Mesiah|RU|technician|f||a:29 sk:0 h:short hc:0 b:stubble of:trunks oc:3 o2:21 gr:tattoo',
'Ronnie Carmine|RU|highflyer|f||a:27 sk:0 h:long hc:3 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Ivan Markin|RU|powerhouse|f||a:41 sk:0 h:short hc:2 bd:big of:trunks oc:21 o2:7',
'Vladimir Kulikov|RU|brawler|h||a:45 sk:0 h:spiky hc:0 b:stubble of:trunks oc:1 o2:5',
'Yaroslav Derzhin|RU|powerhouse|h||a:36 sk:0 h:short hc:2 b:goatee bd:big of:trunks oc:1 o2:5',
'Alexei Anisimin|RU|technician|t||a:30 sk:0 h:spiky hc:0 b:goatee of:trunks oc:1 o2:7',
'Artyom Mazurov|RU|strong|t||a:28 sk:0 h:long hc:2 of:trunks oc:21 o2:21 gr:tattoo',
'Amur Ognyov|RU|brawler|h||a:27 sk:0 h:spiky hc:3 b:full of:trunks oc:0 o2:21',
'David Garrow|RU|technician|h||a:31 sk:0 h:side hc:2 b:full of:trunks oc:0 o2:5',
'Ilya Gusin|RU|highflyer|f||a:24 sk:0 h:long hc:0 of:trunks oc:21 o2:0',
'Gena Kuzmin|RU|strong|h||a:35 sk:0 h:buzz hc:0 b:mustache of:trunks oc:14 o2:5',
'Mister Chilex|RU|highflyer|h||a:29 sk:0 h:side hc:0 b:full of:trunks oc:21 o2:0 gr:tattoo',
'Spike Dayman|RU|hardcore|h||a:32 sk:0 h:undercut hc:0 b:stubble of:trunks oc:14 o2:5',
'Buyan Khristoforov|RU|powerhouse|t||a:38 sk:0 h:buzz hc:0 bd:big of:trunks oc:0 o2:0 gr:tattoo',
'Shamilo|RU|brawler|f||a:30 sk:0 h:bald b:full of:trunks oc:1 o2:7',
'Helkin|RU|hardcore|h||a:34 sk:0 h:side hc:3 b:stubble of:trunks oc:1 o2:21',
'Sanchez Rus|RU|lucha|h||a:28 sk:0 mk:full mc:1 of:trunks oc:21 o2:5',
'Harry Sweat|RU|technician|h||a:26 sk:0 h:side hc:2 b:full of:trunks oc:0 o2:5',
'Petrukha Traktor|RU|powerhouse|f||a:39 sk:0 h:short hc:2 b:full bd:big of:trunks oc:14 o2:0',
'Zack Nathen|RU|highflyer|h||a:23 sk:0 h:long hc:0 b:full of:trunks oc:1 o2:21',
'Brutus Rus|RU|brawler|h||a:33 sk:0 h:bald of:trunks oc:21 o2:0 gr:tattoo',
'Swipe|RU|highflyer|f||a:21 sk:0 h:undercut hc:2 b:full of:trunks oc:14 o2:5',
'Alisa Ostrovska|RU|technician|f|f|a:27 sk:0 h:bangs hc:10 of:singlet oc:14 o2:5',
'Harvi Raida|RU|technician|f|f|a:28 sk:0 h:pigtails hc:5 of:singlet oc:11 o2:21',
'Ramona Voss|RU|highflyer|f|f|a:25 sk:0 h:braids hc:2 of:singlet oc:11 o2:9',
'Mefisto Queen|RU|hardcore|h|f|a:31 sk:0 h:braids hc:2 of:singlet oc:14 o2:5',
'Korra Lee|RU|brawler|h|f|a:26 sk:0 h:halfup hc:5 of:singlet oc:11 o2:0',
'Kseniya Case|RU|highflyer|f|f|a:23 sk:0 h:pigtails hc:6 of:singlet oc:21 o2:0'
];
STB.nfw=[['Digital Team', ['Digital Mesiah', 'Ronnie Carmine']]];

// UWA (Ukraine) - altered; women invented (source lists none)
CUR.uwa=[
'Adam Hart|UA|technician|f||a:31 sk:0 h:spiky hc:0 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Ranger Leon|UA|brawler|h||a:34 sk:0 h:buzz hc:3 of:trunks oc:0 o2:5',
'Miller Volodymyr|UA|strong|h||a:33 sk:0 h:side hc:0 of:trunks oc:21 o2:7',
'Zlovisniy Voron|UA|hardcore|h||a:36 sk:0 h:bald b:mustache of:trunks oc:0 o2:7',
'Illya Grimm|UA|strong|h||a:28 sk:0 h:slick hc:3 of:trunks oc:1 o2:5 gr:tattoo',
'Ivan Grimm|UA|strong|t||a:27 sk:0 h:bald b:goatee of:trunks oc:21 o2:0',
'Levin Ogyda|UA|strong|t||a:29 sk:0 h:short hc:0 of:trunks oc:14 o2:7 gr:tattoo',
'Lyubomir Ogyda|UA|strong|f||a:30 sk:0 h:bald of:trunks oc:3 o2:7',
'Hantry|UA|highflyer|f||a:26 sk:0 h:shaggy hc:2 of:trunks oc:0 o2:21 gr:tattoo',
'Hex Dark|UA|hardcore|h||a:30 sk:0 h:short hc:3 b:goatee of:trunks oc:3 o2:0',
'Kosherny|UA|hardcore|h||a:35 sk:0 h:long hc:3 of:trunks oc:21 o2:21',
'Viktor Vitrolom|UA|brawler|h||a:36 sk:0 h:undercut hc:0 b:full of:trunks oc:0 o2:21',
'Dmytro Gambit Shamray|UA|technician|f||a:29 sk:0 h:side hc:2 of:trunks oc:21 o2:5',
'Igor Turam|UA|powerhouse|f||a:42 sk:0 h:buzz hc:2 b:stubble bd:big of:trunks oc:0 o2:21 gr:tattoo',
'Maks Sylov|UA|powerhouse|f||a:34 sk:0 h:buzz hc:2 b:full bd:big of:trunks oc:21 o2:7',
'Ivan Sanov|UA|technician|f||a:31 sk:0 h:slick hc:0 b:mustache of:trunks oc:14 o2:7',
'Andriy Gaydak|UA|strong|h||a:28 sk:0 h:side hc:0 b:mustache of:trunks oc:3 o2:21',
'Russel Crosse|UA|hardcore|h||a:33 sk:0 h:short hc:0 b:full of:trunks oc:1 o2:5',
'Oskar Young|UA|highflyer|f||a:22 sk:0 h:bald of:trunks oc:0 o2:0',
'Konstantin Perlov|UA|technician|f||a:44 sk:0 h:bald of:trunks oc:14 o2:7 gr:tattoo',
'Tony Hardy|UA|brawler|f||a:38 sk:0 h:long hc:3 of:trunks oc:0 o2:7 gr:tattoo',
'Yaros Lyutyi|UA|powerhouse|h||a:32 sk:0 h:short hc:2 bd:big of:trunks oc:21 o2:0',
'Vitaliy Scherbyn|UA|brawler|f||a:48 sk:0 h:spiky hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Papa Joey|UA|brawler|h||a:40 sk:0 h:short hc:3 of:trunks oc:0 o2:21',
'Mascara Del Bayle|UA|lucha|f||a:31 sk:0 mk:full mc:21 of:trunks oc:0 o2:5',
'Oksana Hart|UA|technician|f|f|a:28 sk:0 h:bangs hc:0 of:singlet oc:11 o2:21',
'Mila Kyiv|UA|highflyer|f|f|a:24 sk:0 h:long hc:2 of:singlet oc:9 o2:5',
'Daryna Fury|UA|brawler|h|f|a:27 sk:0 h:wavy hc:2 of:singlet oc:0 o2:5'
];
STB.uwa=[['Grim Brothers', ['Illya Grimm', 'Ivan Grimm']], ['OGYDA', ['Levin Ogyda', 'Lyubomir Ogyda']]];

// FCS (Finland) - altered
CUR.fcf=[
'Septimus Rex|FI|powerhouse|h||a:36 sk:0 h:long hc:0 bd:big of:trunks oc:21 o2:5',
'Jake Luupaa|FI|technician|f||a:30 sk:0 h:buzz hc:0 b:stubble of:trunks oc:3 o2:5',
'Koobra Kovanen|FI|brawler|h||a:33 sk:0 h:undercut hc:3 of:trunks oc:14 o2:0 gr:tattoo',
'Raivo Romppanen|FI|strong|h||a:31 sk:0 h:side hc:3 of:trunks oc:21 o2:7 gr:tattoo',
'Viktor Tykky|FI|strong|f||a:34 sk:0 h:buzz hc:0 of:trunks oc:21 o2:5',
'ALFA Wolf|FI|powerhouse|f||a:32 sk:0 h:side hc:0 bd:big of:trunks oc:21 o2:0',
'Starbuck Rebel|FI|technician|f||a:52 sk:0 h:long hc:0 of:trunks oc:0 o2:0',
'Juhani Karhula|FI|powerhouse|f||a:43 sk:0 h:side hc:0 b:stubble bd:big of:trunks oc:1 o2:21 gr:tattoo',
'Prinssi Maki|FI|strong|f||a:39 sk:0 h:spiky hc:2 of:trunks oc:21 o2:5',
'Valentin Hale|FI|brawler|h||a:47 sk:0 h:bald b:goatee of:trunks oc:14 o2:0 gr:tattoo',
'Shemeikko|FI|technician|f||a:35 sk:0 h:short hc:0 of:trunks oc:3 o2:0',
'Heimo Ukonsalo|FI|brawler|h||a:50 sk:0 h:buzz hc:3 of:trunks oc:1 o2:7',
'Vincenzo Charm|FI|technician|h||a:33 sk:0 h:long hc:3 of:trunks oc:1 o2:0',
'Polar Pekka|FI|highflyer|f||a:28 sk:0 h:long hc:2 of:trunks oc:0 o2:0 gr:tattoo',
'TAIGA Fin|FI|brawler|t||a:27 sk:0 h:slick hc:3 of:trunks oc:21 o2:5',
'Tuukka Poika|FI|highflyer|f||a:24 sk:0 h:long hc:0 b:mustache of:trunks oc:21 o2:21 gr:tattoo',
'TT Suosala|FI|technician|f||a:25 sk:0 h:bald b:goatee of:trunks oc:1 o2:0',
'Salomon Stride|FI|strong|h||a:31 sk:0 h:short hc:0 b:stubble of:trunks oc:1 o2:7 gr:tattoo',
'Akmeli|FI|strong|h||a:29 sk:0 h:short hc:0 b:stubble of:trunks oc:3 o2:5 gr:tattoo',
'Katvo|FI|hardcore|f||a:30 sk:0 h:side hc:0 b:stubble of:trunks oc:1 o2:0',
'Sebastian Vauhko|FI|highflyer|t||a:24 sk:0 h:buzz hc:0 of:trunks oc:21 o2:0 gr:tattoo',
'Severi Kosko|FI|highflyer|f||a:20 sk:0 h:bald of:trunks oc:21 o2:0',
'Stella Hale|FI|powerhouse|f|f|a:34 sk:0 h:pigtails hc:5 of:singlet oc:21 o2:5',
'Jessica Lovett|FI|technician|f|f|a:36 sk:0 h:pony hc:0 of:singlet oc:9 o2:9',
'Regina Rosenthal|FI|brawler|h|f|a:31 sk:0 h:pigtails hc:10 of:singlet oc:11 o2:21',
'Reima Kuu|FI|highflyer|f|f|a:23 sk:0 h:long hc:10 of:singlet oc:21 o2:0'
];
STB.fcf=[['Rahinaryhma', ['Koobra Kovanen', 'Raivo Romppanen']], ['Isot Pojat', ['Viktor Tykky', 'ALFA Wolf']]];

// STW (Sweden) - altered
CUR.sth=[
'Emil fran Holo|SE|strong|f||a:32 sk:0 h:bald of:trunks oc:21 o2:7 gr:tattoo',
'Captain TooT TooT|SE|hardcore|f||a:35 sk:0 h:slick hc:0 b:full of:trunks oc:14 o2:7',
'Youngblood Glam|SE|highflyer|f||a:27 sk:0 h:undercut hc:2 of:trunks oc:21 o2:7',
'Timmy Forse|SE|technician|f||a:40 sk:0 h:shaggy hc:0 b:mustache of:trunks oc:0 o2:7',
'LOBO Nord|SE|brawler|f||a:46 sk:0 h:bald b:goatee of:trunks oc:21 o2:5',
'Ricky Sorensen|SE|technician|h||a:33 sk:0 h:side hc:0 of:trunks oc:0 o2:5',
'Deacon Drede|SE|powerhouse|h||a:36 sk:0 h:shaggy hc:0 b:goatee bd:big of:trunks oc:21 o2:7',
'Cael Stormen|SE|highflyer|f||a:28 sk:0 h:buzz hc:3 b:mustache of:trunks oc:3 o2:21',
'Julius Silverhammer|SE|technician|h||a:34 sk:0 h:side hc:3 of:trunks oc:21 o2:7',
'El Styggelse|SE|lucha|h||a:31 sk:0 mk:full mc:14 of:trunks oc:1 o2:5',
'Frank Napoleon Ratell|SE|technician|h||a:39 sk:0 h:long hc:0 of:trunks oc:21 o2:5',
'Kid Vicioso|SE|brawler|t||a:24 sk:0 h:side hc:2 of:trunks oc:3 o2:21 gr:tattoo',
'Jacob Stronghammar|SE|powerhouse|h||a:33 sk:0 h:undercut hc:3 b:full bd:big of:trunks oc:1 o2:0',
'Edward Airborne|SE|highflyer|f||a:26 sk:0 h:side hc:0 b:goatee of:trunks oc:21 o2:0',
'Stanislaw Van Dobrowiak|SE|strong|f||a:35 sk:0 h:bald b:stubble of:trunks oc:21 o2:21',
'The Sane|SE|technician|f||a:29 sk:0 h:spiky hc:0 of:trunks oc:21 o2:0',
'Brody Turnbill|SE|technician|h||a:31 sk:0 h:shaggy hc:0 of:trunks oc:21 o2:21',
'Alexander Beck|SE|brawler|h||a:38 sk:0 h:undercut hc:3 of:trunks oc:1 o2:5',
'Dr. NOPE|SE|hardcore|h||a:37 sk:0 h:shaggy hc:2 of:trunks oc:21 o2:7',
'Kottfars Man|SE|brawler|f||a:34 sk:0 h:shaggy hc:0 b:goatee of:trunks oc:21 o2:0',
'Captain Charismo|SE|technician|f||a:28 sk:0 h:shaggy hc:2 of:trunks oc:1 o2:21',
'Danny Sharpe|SE|highflyer|f||a:25 sk:0 h:spiky hc:0 of:trunks oc:21 o2:21',
'The Great Kaijuu|SE|powerhouse|h||a:36 sk:0 mk:full mc:1 of:trunks oc:14 o2:21',
'Ken Malmsteen|SE|technician|f||a:41 sk:0 h:long hc:2 b:full of:trunks oc:21 o2:7 gr:tattoo',
'Wonderchild|SE|highflyer|f||a:30 sk:0 h:buzz hc:0 of:trunks oc:3 o2:0 gr:tattoo',
'Doden Death|SE|hardcore|f||a:38 sk:0 mk:full mc:6 of:trunks oc:3 o2:5',
'JO Hanson|SE|strong|h||a:29 sk:0 h:spiky hc:0 of:trunks oc:21 o2:0',
'Aliss Inkwell|SE|technician|f|f|a:30 sk:0 h:halfup hc:10 of:singlet oc:21 o2:5',
'Vikki Noctis|SE|hardcore|h|f|a:28 sk:0 h:long hc:10 of:singlet oc:21 o2:9',
'Lexi Luxe|SE|highflyer|f|f|a:25 sk:0 h:braids hc:0 of:singlet oc:9 o2:21',
'Betty Rosa|SE|brawler|h|f|a:27 sk:0 h:pigtails hc:3 of:singlet oc:14 o2:0',
'Kira Frost|SE|technician|h|f|a:24 sk:0 h:bob hc:10 of:singlet oc:1 o2:0'
];
STB.sth=[];

// NWB (Norway) - altered
CUR.nwf=[
'Espen Olsson|NO|technician|f||a:32 sk:0 h:spiky hc:3 b:full of:trunks oc:21 o2:21',
'Fredrik Den Store|NO|powerhouse|f||a:35 sk:0 h:side hc:0 b:stubble bd:big of:trunks oc:21 o2:0 gr:tattoo',
'Jonny Stormen|NO|brawler|h||a:37 sk:0 h:short hc:0 of:trunks oc:21 o2:0',
'Aron Frosten|NO|strong|f||a:30 sk:0 h:spiky hc:2 b:mustache of:trunks oc:21 o2:7',
'Erik Isaksson|NO|strong|f||a:31 sk:0 h:shaggy hc:0 b:full of:trunks oc:21 o2:21 gr:tattoo',
'Bjorn Semm|NO|powerhouse|h||a:34 sk:0 h:undercut hc:0 b:mustache bd:big of:trunks oc:14 o2:7',
'Allan Ackerson|NO|strong|f||a:33 sk:0 h:slick hc:0 b:mustache of:trunks oc:3 o2:21',
'Hjertebank|NO|hardcore|h||a:32 sk:0 h:undercut hc:3 b:mustache of:trunks oc:21 o2:0',
'Garm Stoylen|NO|hardcore|h||a:33 sk:0 h:slick hc:0 b:goatee of:trunks oc:14 o2:5',
'Dax Nicolai|NO|highflyer|f||a:24 sk:0 h:slick hc:0 of:trunks oc:14 o2:0',
'Kriss Adoniss|NO|technician|f||a:28 sk:0 h:shaggy hc:0 b:goatee of:trunks oc:3 o2:21',
'Rayo Floress|NO|lucha|f||a:29 sk:0 mk:full mc:6 of:trunks oc:14 o2:0',
'Sindre Alexandersen|NO|highflyer|f||a:27 sk:0 h:undercut hc:0 b:mustache of:trunks oc:21 o2:21',
'Daniel Sebastiansen|NO|technician|t||a:40 sk:0 h:bald of:trunks oc:21 o2:7',
'Ruslan Vik|NO|strong|f||a:31 sk:0 h:spiky hc:3 b:mustache of:trunks oc:21 o2:5',
'Tommy Pee|NO|brawler|t||a:35 sk:0 h:short hc:2 of:trunks oc:0 o2:21',
'Adrian Stormer|NO|powerhouse|f||a:38 sk:0 h:long hc:0 bd:big of:trunks oc:3 o2:5',
'Prins Hjerte|NO|technician|f||a:26 sk:0 h:side hc:0 b:stubble of:trunks oc:0 o2:0',
'Rimfrost|NO|hardcore|h||a:30 sk:0 h:long hc:3 of:trunks oc:14 o2:0 gr:tattoo',
'Samhane|NO|hardcore|h||a:31 sk:0 h:short hc:2 b:goatee of:trunks oc:0 o2:0',
'Tyrr|NO|powerhouse|h||a:36 sk:0 h:spiky hc:2 b:mustache bd:big of:trunks oc:21 o2:5 gr:tattoo',
'Dobbel Ex|NO|brawler|f||a:29 sk:0 h:undercut hc:0 of:trunks oc:21 o2:0',
'Liam Ulv|NO|strong|f||a:28 sk:0 h:long hc:0 b:full of:trunks oc:3 o2:7',
'Markus Lexx|NO|technician|f||a:27 sk:0 h:spiky hc:2 b:mustache of:trunks oc:21 o2:7',
'Piwo Pivo|NO|brawler|f||a:40 sk:0 h:short hc:0 b:full of:trunks oc:14 o2:7',
'Emma Frost|NO|technician|f|f|a:29 sk:0 h:halfup hc:0 of:singlet oc:21 o2:9',
'Nora Valkyrie|NO|highflyer|f|f|a:25 sk:0 h:bob hc:0 of:singlet oc:21 o2:9',
'Hilde Storm|NO|brawler|h|f|a:28 sk:0 h:bangs hc:2 of:singlet oc:9 o2:9'
];
STB.nwf=[['Hovedstaden', ['Bjorn Semm', 'Allan Ackerson']], ['Galskapens Teater', ['Hjertebank', 'Garm Stoylen']], ['Overmakt', ['Aron Frosten', 'Erik Isaksson']]];

// DWP (Denmark) - altered
CUR.dpw=[
'Nitro Greenfield|DK|highflyer|f||a:29 sk:0 h:side hc:0 b:full of:trunks oc:3 o2:5 gr:tattoo',
'Robert Starr|DK|powerhouse|f||a:36 sk:0 h:shaggy hc:0 b:goatee bd:big of:trunks oc:21 o2:0 gr:tattoo',
'El Tesoro Nego|DK|lucha|f||a:31 sk:0 mk:full mc:14 of:trunks oc:21 o2:21',
'Christian Colombus|DK|technician|f||a:33 sk:0 h:shaggy hc:2 b:mustache of:trunks oc:21 o2:5',
'Nicolai Wachman|DK|technician|h||a:32 sk:0 h:shaggy hc:0 b:goatee of:trunks oc:1 o2:21',
'Kris Reichert|DK|strong|h||a:34 sk:0 h:side hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Ron Rubin|DK|strong|h||a:33 sk:0 h:undercut hc:2 b:goatee of:trunks oc:0 o2:0 gr:tattoo',
'Chaos Dane|DK|brawler|f||a:42 sk:0 h:spiky hc:0 of:trunks oc:0 o2:0',
'Ragnar The Viking|DK|powerhouse|h||a:38 sk:0 h:undercut hc:0 bd:big of:trunks oc:1 o2:7',
'Pete Phoenixx|DK|highflyer|f||a:24 sk:0 h:buzz hc:3 of:trunks oc:1 o2:7 gr:tattoo',
'Alastor Cain|DK|hardcore|h||a:32 sk:0 h:short hc:0 of:trunks oc:21 o2:21',
'Sean Blazer|DK|highflyer|f||a:27 sk:0 h:short hc:3 b:full of:trunks oc:14 o2:21 gr:tattoo',
'Hunyadi Tamasz|DK|powerhouse|f||a:35 sk:0 h:shaggy hc:3 b:stubble bd:big of:trunks oc:1 o2:5',
'Daniel Debell|DK|technician|h||a:36 sk:0 h:bald of:trunks oc:1 o2:7 gr:tattoo',
'Bam Bam Quade|DK|strong|t||a:26 sk:0 h:short hc:0 of:trunks oc:21 o2:0',
'Jackpott|DK|brawler|f||a:30 sk:0 h:long hc:0 b:mustache of:trunks oc:21 o2:5',
'Liam Hanssen|DK|technician|f||a:25 sk:0 h:bald of:trunks oc:21 o2:0 gr:tattoo',
'Jack Stormer|DK|brawler|f||a:28 sk:0 h:slick hc:0 of:trunks oc:1 o2:7',
'Carlos Zamoro|DK|technician|f||a:34 sk:0 h:long hc:2 of:trunks oc:0 o2:7',
'Elena Morgenstern|DK|technician|f|f|a:34 sk:0 h:bob hc:2 of:singlet oc:1 o2:21',
'Freja Blaze|DK|highflyer|f|f|a:25 sk:0 h:halfup hc:10 of:singlet oc:1 o2:21',
'Sigrid Rage|DK|brawler|h|f|a:29 sk:0 h:long hc:0 of:singlet oc:4 o2:21'
];
STB.dpw=[['Hope n Rich Connection', ['Kris Reichert', 'Ron Rubin']]];

// PWN (Netherlands) - altered
CUR.pwh=[
'Lorenzo Linna|NL|powerhouse|f||a:34 sk:3 h:short hc:3 bd:big of:trunks oc:21 o2:0',
'TANK Dutch|NL|powerhouse|h||a:33 sk:0 h:spiky hc:3 b:full bd:big of:trunks oc:21 o2:0 gr:tattoo',
'Axl Starr|NL|highflyer|f||a:27 sk:0 h:shaggy hc:2 of:trunks oc:21 o2:0 gr:tattoo',
'Scotty Valentin|NL|highflyer|f||a:28 sk:0 h:slick hc:0 b:mustache of:trunks oc:0 o2:7',
'Daniel Akindel|NL|strong|h||a:30 sk:3 h:slick hc:2 b:stubble of:trunks oc:14 o2:21',
'Noe Ahukan|NL|strong|h||a:29 sk:0 h:buzz hc:3 of:trunks oc:1 o2:0',
'Pippo Segundo|NL|technician|f||a:31 sk:0 h:long hc:0 b:goatee of:trunks oc:14 o2:21 gr:tattoo',
'Johnny Everts|NL|brawler|h||a:29 sk:0 h:slick hc:3 of:trunks oc:21 o2:5 gr:tattoo',
'Jurn Simmonds|NL|powerhouse|f||a:36 sk:0 h:buzz hc:0 b:full bd:big of:trunks oc:21 o2:0',
'Tengqua|NL|lucha|f||a:45 sk:0 mk:full mc:6 of:trunks oc:1 o2:21',
'Brandon Bandz|NL|strong|f||a:32 sk:0 h:undercut hc:0 b:full of:trunks oc:14 o2:5',
'Valon Cage|NL|hardcore|h||a:34 sk:0 h:bald of:trunks oc:14 o2:21',
'Joel Vexx|NL|technician|h||a:35 sk:0 h:long hc:0 of:trunks oc:21 o2:21',
'Feyaz|NL|highflyer|f||a:24 sk:0 h:undercut hc:3 b:full of:trunks oc:21 o2:0 gr:tattoo',
'Michael Dantes|NL|technician|f||a:43 sk:3 h:buzz hc:0 of:trunks oc:0 o2:5',
'Amedeo Rossi|NL|technician|f||a:32 sk:0 h:slick hc:0 of:trunks oc:3 o2:0',
'Zafar Amin|NL|technician|h||a:33 sk:3 h:long hc:0 of:trunks oc:3 o2:21',
'Tom Barong Chang|NL|highflyer|f||a:21 sk:0 h:long hc:0 b:stubble of:trunks oc:0 o2:7',
'Baelthazar|NL|hardcore|t||a:37 sk:0 mk:full mc:1 of:trunks oc:21 o2:21',
'Hyena Wez|NL|hardcore|h||a:30 sk:3 h:buzz hc:0 b:mustache of:trunks oc:14 o2:21',
'Jonas Joens|NL|strong|h||a:30 sk:0 h:side hc:3 of:trunks oc:21 o2:21',
'Katsuya Murashiba|NL|strong|t||a:34 sk:3 h:buzz hc:3 of:trunks oc:21 o2:5',
'MECCA Boss|NL|technician|f||a:28 sk:3 h:spiky hc:0 of:trunks oc:21 o2:5',
'Ricky Sosa Jr|NL|highflyer|f||a:28 sk:3 h:side hc:3 b:full of:trunks oc:21 o2:5',
'Gridlok|NL|powerhouse|h||a:35 sk:3 h:spiky hc:0 b:goatee bd:big of:trunks oc:21 o2:21 gr:tattoo',
'Julia Stone|NL|technician|f|f|a:28 sk:3 h:bangs hc:0 of:singlet oc:4 o2:0',
'Aluna Rage|NL|brawler|h|f|a:27 sk:0 h:pony hc:3 of:singlet oc:14 o2:0',
'Nixi XL|NL|highflyer|f|f|a:24 sk:0 h:bob hc:3 of:singlet oc:14 o2:21',
'Ava Everton|NL|technician|f|f|a:30 sk:3 h:halfup hc:2 of:singlet oc:3 o2:9'
];
STB.pwh=[['The Flamingbros', ['Axl Starr', 'Scotty Valentin']], ['VCC', ['Daniel Akindel', 'Noe Ahukan']], ['The Circus', ['Pippo Segundo', 'Johnny Everts']]];

// PWB (Belgium) - altered
CUR.pwb=[
'Noe Ahuka Jr|BE|strong|f||a:29 sk:0 h:spiky hc:3 of:trunks oc:21 o2:21',
'O. Nathaniel|BE|highflyer|f||a:27 sk:3 h:slick hc:0 of:trunks oc:21 o2:5',
'Rami Romero|BE|technician|h||a:32 sk:0 h:bald b:stubble of:trunks oc:1 o2:21',
'Joel Vauxe|BE|technician|h||a:34 sk:0 h:side hc:2 b:full of:trunks oc:21 o2:5 gr:tattoo',
'Catch Regiment Max|BE|technician|h||a:35 sk:0 h:side hc:0 of:trunks oc:21 o2:0',
'Dante Mercier|BE|strong|h||a:30 sk:3 h:spiky hc:3 of:trunks oc:0 o2:7',
'Leo Leroy|BE|technician|f||a:41 sk:0 h:bald of:trunks oc:1 o2:5',
'Colin Williamson|BE|strong|h||a:31 sk:0 h:side hc:0 b:mustache of:trunks oc:14 o2:0 gr:tattoo',
'Tommy Mayhem Jr|BE|hardcore|h||a:33 sk:0 h:bald b:mustache of:trunks oc:0 o2:21',
'Jason TNT|BE|highflyer|f||a:25 sk:3 h:bald of:trunks oc:21 o2:21 gr:tattoo',
'Brandon Jordaan|BE|strong|h||a:28 sk:0 h:bald of:trunks oc:3 o2:21',
'Cory Zeroh|BE|hardcore|h||a:30 sk:0 h:buzz hc:2 b:goatee of:trunks oc:0 o2:7',
'Valon Kage|BE|powerhouse|h||a:34 sk:3 h:buzz hc:2 bd:big of:trunks oc:14 o2:21',
'Jonas Jonsen|BE|technician|h||a:30 sk:3 h:side hc:0 b:mustache of:trunks oc:14 o2:21',
'Hyena Wezzel|BE|hardcore|h||a:31 sk:0 h:side hc:0 of:trunks oc:3 o2:7 gr:tattoo',
'Gridlock Belg|BE|powerhouse|h||a:36 sk:0 h:undercut hc:2 b:mustache bd:big of:trunks oc:0 o2:0',
'Tommen De Winters|BE|technician|f||a:29 sk:3 h:shaggy hc:0 of:trunks oc:1 o2:21',
'Calypsa|BE|technician|f|f|a:29 sk:3 h:bob hc:3 of:singlet oc:3 o2:21',
'Celine Fairy|BE|technician|f|f|a:27 sk:0 h:wavy hc:2 of:singlet oc:4 o2:0',
'Anastasia Bardo|BE|brawler|h|f|a:30 sk:3 h:wavy hc:3 of:singlet oc:0 o2:0',
'Chantal Jordane|BE|technician|f|f|a:38 sk:3 h:bangs hc:3 of:singlet oc:14 o2:9'
];
STB.pwb=[['The Safe Space', ['Rami Romero', 'Joel Vauxe']], ['The Catch Regiment', ['Catch Regiment Max', 'Dante Mercier']]];

// EWL (Austria) - altered
CUR.ewa=[
'Kris Rabber|AT|powerhouse|f||a:37 sk:0 h:shaggy hc:2 b:full bd:big of:trunks oc:1 o2:0',
'Iestin Rees|AT|technician|f||a:33 sk:0 h:short hc:3 b:mustache of:trunks oc:1 o2:0',
'Martin Payne|AT|strong|f||a:34 sk:0 h:bald b:stubble of:trunks oc:21 o2:7 gr:tattoo',
'Rage Sniper|AT|hardcore|h||a:31 sk:0 h:bald of:trunks oc:0 o2:5',
'Barbarossa Wrath|AT|powerhouse|h||a:36 sk:0 h:side hc:3 bd:big of:trunks oc:21 o2:0',
'Curtis Blaque|AT|brawler|h||a:33 sk:0 h:short hc:0 b:full of:trunks oc:0 o2:7',
'Chris Colen|AT|technician|f||a:35 sk:0 h:undercut hc:2 b:full of:trunks oc:21 o2:5',
'Damon Brixx|AT|technician|f||a:34 sk:0 h:shaggy hc:3 b:goatee of:trunks oc:21 o2:5',
'Michael Kovacs|AT|strong|f||a:44 sk:0 h:slick hc:3 b:full of:trunks oc:0 o2:7',
'Peter Whitey|AT|strong|h||a:32 sk:0 h:bald b:goatee of:trunks oc:21 o2:21',
'Sultanov|AT|powerhouse|h||a:34 sk:0 h:slick hc:0 bd:big of:trunks oc:21 o2:0 gr:tattoo',
'Mirko Panic|AT|brawler|t||a:30 sk:0 h:bald of:trunks oc:14 o2:7 gr:tattoo',
'Johann Ottmar|AT|technician|f||a:36 sk:0 h:buzz hc:0 b:stubble of:trunks oc:21 o2:21',
'Darius Wolf|AT|highflyer|f||a:27 sk:0 h:slick hc:2 of:trunks oc:21 o2:7',
'Tamato|AT|lucha|h||a:29 sk:0 mk:full mc:14 of:trunks oc:14 o2:21',
'Binolt Leech|AT|brawler|h||a:33 sk:0 h:long hc:2 of:trunks oc:3 o2:5',
'Igor Rachimow|AT|strong|h||a:32 sk:0 h:shaggy hc:0 of:trunks oc:1 o2:0',
'Alexander Berkner|AT|technician|f||a:31 sk:0 h:undercut hc:3 b:goatee of:trunks oc:21 o2:0 gr:tattoo',
'Der Soldner|AT|hardcore|h||a:35 sk:0 h:spiky hc:2 of:trunks oc:14 o2:0',
'Ludy Lohan|AT|highflyer|f||a:28 sk:0 h:side hc:0 b:mustache of:trunks oc:21 o2:5',
'Asaro|AT|highflyer|f||a:26 sk:0 h:bald b:stubble of:trunks oc:1 o2:7',
'Jon Drake|AT|technician|f||a:31 sk:0 h:buzz hc:2 of:trunks oc:21 o2:5',
'Georg Khoukas|AT|brawler|h||a:37 sk:0 h:spiky hc:0 b:mustache of:trunks oc:1 o2:5',
'Bulit|AT|strong|f||a:36 sk:0 h:long hc:2 b:full of:trunks oc:21 o2:5',
'Mila Smitt|AT|technician|f|f|a:28 sk:0 h:pony hc:6 of:singlet oc:4 o2:0',
'Moxie Wolf|AT|highflyer|f|f|a:26 sk:0 h:pigtails hc:6 of:singlet oc:21 o2:0',
'Diotima Stark|AT|technician|f|f|a:29 sk:0 h:halfup hc:0 of:singlet oc:14 o2:21',
'Betty Boa|AT|brawler|h|f|a:27 sk:0 h:wavy hc:10 of:singlet oc:9 o2:9',
'Zelina Pauer|AT|technician|f|f|a:25 sk:0 h:braids hc:3 of:singlet oc:1 o2:21',
'Lexa Valo|AT|highflyer|f|f|a:24 sk:0 h:bangs hc:3 of:singlet oc:14 o2:21'
];
STB.ewa=[['Tribe Of Wrath', ['Barbarossa Wrath', 'Curtis Blaque']], ['Team Energy', ['Chris Colen', 'Damon Brixx']]];

// HUN (Hungary) - altered
CUR.hcw=[
'Icarus Hun|HU|highflyer|f||a:33 sk:0 h:slick hc:0 of:trunks oc:21 o2:0',
'Kris Jokich|HU|technician|f||a:30 sk:0 h:spiky hc:0 of:trunks oc:21 o2:5',
'Sentinell|HU|powerhouse|f||a:34 sk:0 h:side hc:0 bd:big of:trunks oc:21 o2:21',
'Mylan Boros|HU|strong|h||a:31 sk:0 h:shaggy hc:2 of:trunks oc:1 o2:7 gr:tattoo',
'Zafar Amen Hun|HU|technician|h||a:33 sk:0 h:spiky hc:0 b:full of:trunks oc:0 o2:0',
'Dover Titan|HU|powerhouse|f||a:40 sk:0 h:undercut hc:3 b:goatee bd:big of:trunks oc:1 o2:7 gr:tattoo',
'David Olivar|HU|strong|f||a:33 sk:0 h:bald b:mustache of:trunks oc:1 o2:7',
'Ricky Skyler|HU|technician|f||a:29 sk:0 h:long hc:0 b:goatee of:trunks oc:14 o2:7',
'Angel Hayse|HU|highflyer|f||a:27 sk:0 h:long hc:0 of:trunks oc:21 o2:5',
'Renegat|HU|brawler|h||a:32 sk:0 h:side hc:3 b:full of:trunks oc:14 o2:21',
'Tamas Szabo|HU|technician|f||a:31 sk:0 h:long hc:0 of:trunks oc:1 o2:21',
'Maverick Hun|HU|strong|f||a:35 sk:0 h:undercut hc:0 b:full of:trunks oc:21 o2:7',
'Krizsi Boy|HU|highflyer|h||a:26 sk:0 h:spiky hc:2 b:full of:trunks oc:14 o2:21 gr:tattoo',
'Helion|HU|lucha|f||a:29 sk:0 mk:full mc:1 of:trunks oc:0 o2:5',
'Jett Creedy|HU|strong|f||a:30 sk:0 h:shaggy hc:3 b:stubble of:trunks oc:14 o2:0',
'Boldo|HU|brawler|f||a:33 sk:0 h:spiky hc:3 b:full of:trunks oc:21 o2:21',
'Nitrox|HU|hardcore|h||a:31 sk:0 h:shaggy hc:2 of:trunks oc:0 o2:7',
'Zoltan Beast|HU|powerhouse|h||a:36 sk:0 h:long hc:3 b:stubble bd:big of:trunks oc:14 o2:5',
'Jonas Hun|HU|technician|h||a:28 sk:0 h:long hc:3 of:trunks oc:21 o2:0',
'Ozzy Spenser|HU|brawler|h||a:34 sk:0 h:side hc:3 b:goatee of:trunks oc:21 o2:7 gr:tattoo',
'Bete|HU|highflyer|h||a:24 sk:0 h:undercut hc:0 b:goatee of:trunks oc:1 o2:21',
'Laurent Romain|HU|technician|f||a:32 sk:0 h:bald of:trunks oc:14 o2:21 gr:tattoo',
'Chris Dyce|HU|hardcore|f||a:30 sk:0 h:spiky hc:2 b:full of:trunks oc:21 o2:7 gr:tattoo',
'Lil Mau|HU|highflyer|h||a:22 sk:0 h:slick hc:0 b:stubble of:trunks oc:14 o2:5',
'Zeteny Boy|HU|strong|h||a:27 sk:0 h:shaggy hc:0 of:trunks oc:0 o2:21',
'Orsi Fury|HU|technician|f|f|a:29 sk:0 h:pony hc:3 of:singlet oc:4 o2:21',
'Jane Nera|HU|highflyer|f|f|a:26 sk:0 h:long hc:10 of:singlet oc:0 o2:0',
'Maddie Morgen|HU|brawler|h|f|a:27 sk:0 h:long hc:0 of:singlet oc:14 o2:21'
];
STB.hcw=[['Arrows of Hungary', ['Icarus Hun', 'Dover Titan']], ['Visegrad Group', ['David Olivar', 'Ricky Skyler']]];

// HWF (Croatia/Serbia) - altered; roster extended
CUR.cwf=[
'Frozen Flame|HR|powerhouse|f||a:38 sk:0 h:buzz hc:2 bd:big of:trunks oc:0 o2:7',
'Krampus Bal|HR|hardcore|h||a:37 sk:0 h:slick hc:0 of:trunks oc:21 o2:5',
'Iron Benn|HR|brawler|f||a:43 sk:0 h:undercut hc:0 b:goatee of:trunks oc:21 o2:21',
'Sasha Srb|HR|hardcore|h||a:32 sk:0 h:spiky hc:0 b:full of:trunks oc:21 o2:5',
'Vuk Srb|HR|powerhouse|h||a:34 sk:0 h:side hc:0 b:full bd:big of:trunks oc:21 o2:0 gr:tattoo',
'Tibor Sky|HR|technician|f||a:27 sk:0 h:short hc:0 of:trunks oc:0 o2:5',
'Aeroo|HR|lucha|h||a:29 sk:0 mk:full mc:14 of:trunks oc:3 o2:5',
'Nemanja Novi|HR|highflyer|f||a:24 sk:0 h:spiky hc:0 of:trunks oc:14 o2:7 gr:tattoo',
'Luka Mid|HR|strong|t||a:28 sk:0 h:buzz hc:3 b:goatee of:trunks oc:14 o2:7 gr:tattoo',
'Marko Jadran|HR|strong|f||a:30 sk:0 h:short hc:0 of:trunks oc:3 o2:0',
'Dino Split|HR|technician|h||a:29 sk:0 h:slick hc:0 of:trunks oc:21 o2:0 gr:tattoo',
'Zoran Beast|HR|brawler|h||a:33 sk:0 h:buzz hc:2 b:full of:trunks oc:0 o2:0 gr:tattoo',
'Ivo Zagreb|HR|technician|h||a:26 sk:0 h:shaggy hc:3 b:stubble of:trunks oc:0 o2:21',
'Wesna Busich|HR|technician|f|f|a:38 sk:0 h:long hc:10 of:singlet oc:11 o2:5',
'Tanja Zagreb|HR|highflyer|f|f|a:22 sk:0 h:pony hc:5 of:singlet oc:1 o2:0',
'Mia Balkan|HR|brawler|h|f|a:26 sk:0 h:pigtails hc:2 of:singlet oc:1 o2:21'
];
STB.cwf=[['Balkan Beasts', ['Krampus Bal', 'Iron Benn']], ['Novi Sad Connection', ['Sasha Srb', 'Vuk Srb']]];

// ZMK (Greece) - altered
CUR.zmk=[
'Leonidas Tombolis|GR|powerhouse|f||a:36 sk:0 h:short hc:0 bd:big of:trunks oc:3 o2:21',
'Markellos Komninos|GR|technician|f||a:31 sk:1 h:long hc:0 of:trunks oc:21 o2:0',
'Ninja Cyprus|GR|highflyer|f||a:26 sk:1 h:short hc:3 of:trunks oc:14 o2:0',
'Mr. Perris|GR|strong|h||a:38 sk:0 h:buzz hc:0 of:trunks oc:21 o2:0',
'Gedeon Tax|GR|strong|h||a:35 sk:0 h:slick hc:2 b:stubble of:trunks oc:21 o2:7',
'Alekos Tombolis|GR|powerhouse|f||a:34 sk:0 h:shaggy hc:0 b:goatee bd:big of:trunks oc:1 o2:0',
'Vakat Greek|GR|brawler|h||a:33 sk:0 h:undercut hc:0 b:mustache of:trunks oc:21 o2:7',
'Elias Markopoulis|GR|technician|f||a:30 sk:0 h:slick hc:3 of:trunks oc:1 o2:5',
'Pano Seretis|GR|technician|f||a:34 sk:0 h:side hc:3 of:trunks oc:21 o2:21',
'Dimitris Palis|GR|brawler|h||a:36 sk:0 h:long hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Playboy Spiros Lewis|GR|technician|h||a:33 sk:1 h:buzz hc:0 of:trunks oc:3 o2:7',
'Father Yannis|GR|hardcore|h||a:45 sk:0 h:slick hc:0 of:trunks oc:14 o2:0',
'Andros Abel|GR|technician|f||a:31 sk:0 h:short hc:3 of:trunks oc:14 o2:7',
'Edi Xhepai|GR|strong|f||a:32 sk:1 h:slick hc:0 b:mustache of:trunks oc:1 o2:0',
'Aaron Ramy|GR|highflyer|h||a:27 sk:0 h:slick hc:3 b:mustache of:trunks oc:3 o2:0 gr:tattoo',
'Duke Danil|GR|brawler|f||a:30 sk:1 h:undercut hc:2 b:full of:trunks oc:21 o2:5 gr:tattoo',
'Elias Sinis|GR|strong|f||a:29 sk:0 h:shaggy hc:3 of:trunks oc:3 o2:21',
'Hadis|GR|hardcore|h||a:35 sk:0 mk:full mc:21 of:trunks oc:1 o2:21',
'Hey Kidd|GR|highflyer|f||a:23 sk:0 h:shaggy hc:0 of:trunks oc:0 o2:7',
'Jack Pikas|GR|brawler|f||a:32 sk:0 h:bald b:full of:trunks oc:14 o2:5',
'Kong Karim Brigante|GR|powerhouse|h||a:37 sk:1 h:spiky hc:0 bd:big of:trunks oc:14 o2:5 gr:tattoo',
'The Mosquito Gr|GR|highflyer|f||a:26 sk:0 mk:full mc:1 of:trunks oc:14 o2:0',
'Kostikas Taxi|GR|strong|f||a:41 sk:0 h:buzz hc:3 b:goatee of:trunks oc:3 o2:0 gr:tattoo',
'Mike Galousis Jr|GR|technician|h||a:40 sk:1 h:long hc:0 b:mustache of:trunks oc:0 o2:5',
'FBI Squad|GR|brawler|f||a:33 sk:1 h:slick hc:0 of:trunks oc:21 o2:5',
'Four-Oh-Four|GR|hardcore|f||a:29 sk:1 h:short hc:3 b:mustache of:trunks oc:0 o2:0',
'Amelia Kane|GR|technician|f|f|a:28 sk:1 h:pigtails hc:5 of:singlet oc:21 o2:21',
'Eleni Storm|GR|highflyer|f|f|a:25 sk:1 h:long hc:10 of:singlet oc:0 o2:0',
'Sofia Hades|GR|brawler|h|f|a:29 sk:1 h:bob hc:2 of:singlet oc:14 o2:5'
];
STB.zmk=[['Tax Collectors', ['Mr. Perris', 'Gedeon Tax']], ['Tombolis Family', ['Leonidas Tombolis', 'Alekos Tombolis']]];

// BWV (Bulgaria) - altered
CUR.bwe=[
'Sexy Kev|BG|technician|h||a:31 sk:0 h:side hc:2 of:trunks oc:21 o2:21',
'Asen Bg|BG|strong|f||a:30 sk:1 h:bald b:full of:trunks oc:21 o2:21',
'Nsereko Lion|BG|powerhouse|f||a:34 sk:0 h:undercut hc:2 b:stubble bd:big of:trunks oc:0 o2:7',
'Sebb Strife|BG|highflyer|f||a:29 sk:1 h:undercut hc:3 b:full of:trunks oc:0 o2:5',
'Bas Bane|BG|brawler|h||a:35 sk:0 h:buzz hc:0 b:stubble of:trunks oc:21 o2:7',
'Rory Coyne|BG|brawler|h||a:34 sk:1 h:bald of:trunks oc:1 o2:5 gr:tattoo',
'Tiger Nenov|BG|hardcore|f||a:46 sk:1 h:buzz hc:3 of:trunks oc:1 o2:21',
'Petyo Hristov|BG|technician|h||a:35 sk:1 h:bald of:trunks oc:0 o2:0',
'Stoyan Kolov|BG|powerhouse|f||a:31 sk:1 h:slick hc:0 bd:big of:trunks oc:0 o2:21',
'Atanas Mitov|BG|brawler|t||a:32 sk:1 h:shaggy hc:2 b:goatee of:trunks oc:3 o2:7',
'Vasil Tenev|BG|strong|h||a:33 sk:0 h:shaggy hc:3 of:trunks oc:21 o2:7',
'John McGregory|BG|technician|f||a:30 sk:1 h:spiky hc:3 b:full of:trunks oc:0 o2:0 gr:tattoo',
'Tel Benham|BG|strong|f||a:29 sk:0 h:undercut hc:3 b:stubble of:trunks oc:1 o2:7',
'Xia Brookside|BG|technician|f|f|a:29 sk:0 h:pony hc:10 of:singlet oc:9 o2:21',
'Little Miss Roxxi|BG|highflyer|f|f|a:23 sk:1 h:halfup hc:5 of:singlet oc:14 o2:5',
'Mila Sofia|BG|brawler|h|f|a:26 sk:0 h:pigtails hc:6 of:singlet oc:3 o2:21'
];
STB.bwe=[['Lion Kings', ['Nsereko Lion', 'Sebb Strife']], ['Sons Of Ulaid', ['Bas Bane', 'Rory Coyne']]];

// TPW (Turkey) - altered; roster extended
CUR.tpw=[
'Murat Bosphorus|TR|powerhouse|f||a:40 sk:0 h:bald b:goatee bd:big of:trunks oc:21 o2:7',
'Ozgur Bakir|TR|technician|f||a:34 sk:0 h:side hc:2 of:trunks oc:1 o2:7',
'Battal Gazi|TR|powerhouse|h||a:37 sk:0 h:short hc:0 b:goatee bd:big of:trunks oc:1 o2:0',
'Barbarus|TR|powerhouse|h||a:36 sk:1 h:side hc:2 b:full bd:big of:trunks oc:1 o2:0',
'Strongman Turko|TR|powerhouse|f||a:38 sk:1 h:undercut hc:0 bd:big of:trunks oc:1 o2:7',
'Camoka|TR|brawler|h||a:33 sk:9 h:short hc:0 of:trunks oc:14 o2:5',
'Anadolu Kaplani|TR|strong|f||a:35 sk:1 h:spiky hc:3 of:trunks oc:3 o2:7',
'Atabay|TR|technician|h||a:29 sk:1 h:buzz hc:3 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'Big Boi Tur|TR|strong|h||a:32 sk:1 h:spiky hc:3 b:mustache of:trunks oc:21 o2:21 gr:tattoo',
'Demirci Kubo|TR|hardcore|h||a:34 sk:1 h:short hc:0 of:trunks oc:21 o2:0',
'Samuray Ferit|TR|highflyer|f||a:28 sk:9 h:short hc:2 of:trunks oc:1 o2:5 gr:tattoo',
'The Turkish Rocky|TR|strong|f||a:33 sk:0 h:shaggy hc:3 of:trunks oc:14 o2:7',
'Yargic Warrior|TR|brawler|h||a:31 sk:9 h:short hc:3 of:trunks oc:3 o2:0 gr:tattoo',
'Zaza Tr|TR|hardcore|h||a:30 sk:0 h:undercut hc:3 of:trunks oc:0 o2:7',
'Shanna Port|TR|technician|f|f|a:30 sk:1 h:long hc:6 of:singlet oc:21 o2:5',
'Natalia Markova Tr|TR|highflyer|f|f|a:27 sk:9 h:wavy hc:6 of:singlet oc:9 o2:21',
'Elif Storm|TR|brawler|h|f|a:26 sk:9 h:wavy hc:3 of:singlet oc:21 o2:21'
];
STB.tpw=[['Turkish Warriors', ['Battal Gazi', 'Barbarus', 'Strongman Turko']]];

// SAW (South Africa, from AWA) - altered; women invented
CUR.saw=[
'Johnny Palazzo|ZA|technician|f||a:36 sk:0 h:bald b:goatee of:trunks oc:0 o2:7',
'Romeo Valentino Jr|ZA|highflyer|h||a:28 sk:0 h:long hc:2 of:trunks oc:1 o2:5 gr:tattoo',
'Mr Moneyz|ZA|technician|h||a:33 sk:3 h:short hc:0 of:trunks oc:21 o2:7',
'Chad Le Brun|ZA|technician|h||a:30 sk:0 h:side hc:0 b:stubble of:trunks oc:21 o2:0',
'Bulldog Za|ZA|powerhouse|f||a:38 sk:0 h:bald b:goatee bd:big of:trunks oc:21 o2:21 gr:tattoo',
'Just Ted|ZA|strong|f||a:33 sk:0 h:buzz hc:3 of:trunks oc:3 o2:7',
'Shaun Coen|ZA|technician|f||a:50 sk:0 h:short hc:0 b:full of:trunks oc:1 o2:5',
'BDX-treme|ZA|hardcore|h||a:34 sk:3 h:shaggy hc:3 b:mustache of:trunks oc:3 o2:21',
'The Ozz|ZA|brawler|h||a:32 sk:7 h:short hc:0 of:trunks oc:14 o2:5',
'Mad-Jack Maverick Hun|ZA|hardcore|h||a:31 sk:7 h:undercut hc:2 b:stubble of:trunks oc:14 o2:0',
'Jay Coopar|ZA|strong|f||a:29 sk:0 h:undercut hc:2 of:trunks oc:3 o2:0 gr:tattoo',
'Missing Link Za|ZA|brawler|f||a:36 sk:0 mk:full mc:14 of:trunks oc:0 o2:21',
'Alex Princess|ZA|highflyer|t||a:26 sk:3 h:short hc:2 of:trunks oc:14 o2:5',
'Wilfred Mc-Fish|ZA|brawler|f||a:35 sk:0 h:side hc:0 of:trunks oc:3 o2:0 gr:tattoo',
'Nicky Vexx|ZA|highflyer|f||a:27 sk:7 h:bald of:trunks oc:14 o2:7',
'Jan Die Skaapboer|ZA|powerhouse|f||a:40 sk:0 h:side hc:0 bd:big of:trunks oc:3 o2:5 gr:tattoo',
'Alvarito|ZA|lucha|f||a:28 sk:3 mk:full mc:6 of:trunks oc:0 o2:0',
'Black Widoe|ZA|hardcore|h|f|a:29 sk:3 h:pigtails hc:3 of:singlet oc:11 o2:0',
'Thandi Storm|ZA|highflyer|f|f|a:25 sk:7 h:pony hc:6 of:singlet oc:4 o2:21',
'Lerato Fury|ZA|brawler|h|f|a:28 sk:0 h:long hc:2 of:singlet oc:1 o2:5'
];
STB.saw=[['House of Money', ['Mr Moneyz', 'Chad Le Brun']], ['Heavy Hitters', ['Bulldog Za', 'Just Ted']]];

// QPW (Qatar) - altered; women invented
CUR.qpw=[
'Mustafa Alley|QA|technician|f||a:36 sk:1 h:slick hc:3 of:trunks oc:3 o2:5 gr:tattoo',
'Matt Cardone|QA|strong|f||a:38 sk:9 h:slick hc:0 of:trunks oc:14 o2:7',
'Shaheen Gold|QA|highflyer|f||a:29 sk:9 h:buzz hc:0 of:trunks oc:0 o2:7',
'Classy Alley|QA|technician|h||a:33 sk:1 h:buzz hc:0 of:trunks oc:3 o2:5',
'Anas Rexx|QA|strong|f||a:30 sk:9 h:side hc:2 of:trunks oc:0 o2:5 gr:tattoo',
'Sam Ex|QA|highflyer|f||a:29 sk:1 h:slick hc:2 of:trunks oc:14 o2:21',
'Nic Nemmeth|QA|technician|h||a:40 sk:9 h:long hc:2 b:mustache of:trunks oc:1 o2:21',
'Bobby Lashly Jr|QA|powerhouse|h||a:41 sk:1 h:bald b:stubble bd:big of:trunks oc:21 o2:5',
'Brian Cagey|QA|powerhouse|h||a:38 sk:1 h:slick hc:3 b:full bd:big of:trunks oc:21 o2:7',
'Stu Grayling|QA|technician|f||a:34 sk:1 h:bald b:mustache of:trunks oc:3 o2:0',
'Alofa Qa|QA|powerhouse|f||a:33 sk:9 h:bald b:goatee bd:big of:trunks oc:14 o2:5',
'Mo Jabbari|QA|strong|h||a:31 sk:9 h:bald b:stubble of:trunks oc:21 o2:7',
'Tito Hatim|QA|technician|h||a:28 sk:9 h:buzz hc:2 b:goatee of:trunks oc:1 o2:5',
'Ali Rezza|QA|brawler|t||a:30 sk:1 h:side hc:2 b:mustache of:trunks oc:1 o2:21',
'Axel Tishner|QA|technician|h||a:35 sk:1 h:long hc:3 b:full of:trunks oc:21 o2:0 gr:tattoo',
'White Eagle Qa|QA|highflyer|f||a:30 sk:9 mk:full mc:21 of:trunks oc:3 o2:5',
'Jonathan Gresh|QA|technician|h||a:34 sk:9 h:slick hc:0 b:goatee of:trunks oc:14 o2:7',
'Alberto Del Rey|QA|technician|h||a:45 sk:1 h:slick hc:2 b:mustache of:trunks oc:21 o2:7 gr:tattoo',
'The Maharaj|QA|powerhouse|h||a:39 sk:9 h:slick hc:2 bd:big of:trunks oc:3 o2:21',
'Fallah Bahh|QA|powerhouse|f||a:40 sk:1 h:long hc:2 b:full bd:big of:trunks oc:0 o2:7 gr:tattoo',
'Chris Raabe|QA|powerhouse|h||a:38 sk:9 h:buzz hc:0 b:goatee bd:big of:trunks oc:3 o2:21',
'Matt Crossey|QA|highflyer|f||a:30 sk:9 h:slick hc:0 of:trunks oc:14 o2:21 gr:tattoo',
'Rage Qa|QA|brawler|h||a:32 sk:1 h:long hc:2 of:trunks oc:0 o2:0 gr:tattoo',
'Piero the Clown|QA|brawler|f||a:44 sk:9 h:spiky hc:0 of:trunks oc:21 o2:5',
'Layla Doha|QA|technician|f|f|a:27 sk:9 h:bangs hc:0 of:singlet oc:11 o2:21',
'Noor Desert|QA|highflyer|f|f|a:25 sk:9 h:bob hc:0 of:singlet oc:3 o2:0',
'Samira Fury|QA|brawler|h|f|a:28 sk:9 h:halfup hc:2 of:singlet oc:21 o2:5'
];
STB.qpw=[['International Elite', ['Nic Nemmeth', 'Bobby Lashly Jr', 'Brian Cagey']]];

// AWO (Israel/Middle East) - altered
CUR.awo=[
'Arabian Horsey|IL|lucha|f||a:32 sk:0 mk:full mc:14 of:trunks oc:21 o2:0',
'Sultan Amadell|IL|powerhouse|h||a:36 sk:1 h:buzz hc:0 bd:big of:trunks oc:21 o2:0',
'Omar Nasim|IL|technician|f||a:31 sk:0 h:side hc:0 of:trunks oc:1 o2:7',
'Abdullah Barak|IL|brawler|f||a:33 sk:0 h:side hc:3 of:trunks oc:21 o2:0',
'Barak Baramy|IL|strong|f||a:30 sk:1 h:buzz hc:2 b:mustache of:trunks oc:0 o2:7 gr:tattoo',
'Ben Barell|IL|technician|f||a:29 sk:0 h:side hc:0 of:trunks oc:1 o2:0',
'Happy Dos|IL|highflyer|f||a:28 sk:0 h:buzz hc:0 of:trunks oc:0 o2:21',
'Happy Uno|IL|highflyer|f||a:28 sk:1 h:long hc:2 of:trunks oc:21 o2:7',
'David Elbaz|IL|technician|f||a:34 sk:9 h:bald of:trunks oc:21 o2:0',
'El Gran Carisma|IL|highflyer|f||a:28 sk:1 mk:full mc:21 of:trunks oc:14 o2:0',
'Eyal Smiley|IL|highflyer|f||a:27 sk:0 h:long hc:0 of:trunks oc:21 o2:5 gr:tattoo',
'Freddy Machette|IL|brawler|h||a:33 sk:0 h:side hc:0 of:trunks oc:14 o2:5',
'Hadar Horowitz|IL|strong|f||a:32 sk:9 h:side hc:2 b:stubble of:trunks oc:21 o2:7',
'Idan Boulderr|IL|powerhouse|f||a:34 sk:0 h:slick hc:3 b:goatee bd:big of:trunks oc:3 o2:7',
'Ken Kerbis Jr|IL|brawler|h||a:36 sk:0 h:shaggy hc:0 of:trunks oc:21 o2:5',
'Netanel Dar|IL|technician|f||a:29 sk:0 h:undercut hc:3 of:trunks oc:1 o2:21',
'Sagi Dayan Jr|IL|strong|f||a:31 sk:9 h:short hc:3 b:goatee of:trunks oc:21 o2:7',
'Yarin Elkarif|IL|highflyer|t||a:26 sk:1 h:shaggy hc:0 of:trunks oc:21 o2:7 gr:tattoo',
'Rom Ungar|IL|technician|f||a:30 sk:9 h:short hc:0 b:stubble of:trunks oc:21 o2:21',
'Black Mamba Il|IL|hardcore|h||a:31 sk:9 mk:full mc:1 of:trunks oc:0 o2:0',
'Benny Rigerovich|IL|technician|h||a:35 sk:1 h:shaggy hc:0 of:trunks oc:14 o2:0',
'Gaia Glass|IL|technician|f|f|a:28 sk:1 h:halfup hc:2 of:singlet oc:14 o2:5',
'Lana Navo|IL|highflyer|f|f|a:25 sk:0 h:bangs hc:2 of:singlet oc:21 o2:5',
'Piper Sweeter|IL|brawler|h|f|a:27 sk:1 h:braids hc:10 of:singlet oc:1 o2:0',
'Amaranta Del Mare|IL|technician|f|f|a:30 sk:9 h:long hc:6 of:singlet oc:14 o2:0'
];
STB.awo=[['The Happy Duo', ['Happy Uno', 'Happy Dos']], ['The Desert Shield', ['Sultan Amadell', 'Abdullah Barak']]];

// LCW (Singapore) - altered
CUR.sgw=[
'Carlo Cannan|SG|strong|f||a:32 sk:5 h:undercut hc:2 b:mustache of:trunks oc:1 o2:0',
'Mason Dollar|SG|hardcore|h||a:30 sk:1 h:bald of:trunks oc:1 o2:5',
'The Statement Sg|SG|technician|h||a:36 sk:5 h:short hc:3 of:trunks oc:0 o2:21',
'Emman Azmin|SG|highflyer|h||a:27 sk:1 h:shaggy hc:2 b:stubble of:trunks oc:21 o2:0',
'Black Arrow Sg|SG|highflyer|f||a:26 sk:5 h:shaggy hc:3 of:trunks oc:0 o2:21',
'Mighty Mightier|SG|powerhouse|f||a:33 sk:1 h:buzz hc:0 b:goatee bd:big of:trunks oc:1 o2:0',
'BGJ Duo|SG|technician|f||a:29 sk:1 h:short hc:0 b:goatee of:trunks oc:3 o2:0',
'CBK Duo|SG|highflyer|t||a:28 sk:1 h:bald b:stubble of:trunks oc:21 o2:21 gr:tattoo',
'Da Butcherman|SG|powerhouse|f||a:38 sk:5 h:bald b:full bd:big of:trunks oc:1 o2:7',
'Dr. Gorr|SG|hardcore|f||a:44 sk:1 mk:full mc:21 of:trunks oc:3 o2:21',
'Bryson Blake|SG|strong|f||a:29 sk:5 h:undercut hc:3 of:trunks oc:0 o2:7 gr:tattoo',
'CK Vinn|SG|technician|f||a:31 sk:5 h:undercut hc:2 of:trunks oc:21 o2:7',
'Aiden Rexx|SG|technician|h||a:28 sk:1 h:spiky hc:0 of:trunks oc:21 o2:21',
'Ryan Shenn|SG|brawler|f||a:30 sk:5 h:spiky hc:0 b:goatee of:trunks oc:14 o2:5',
'Monomoth|SG|powerhouse|h||a:35 sk:5 h:short hc:3 bd:big of:trunks oc:21 o2:7',
'Golem Thay|SG|powerhouse|f||a:34 sk:1 h:undercut hc:2 b:full bd:big of:trunks oc:0 o2:0',
'Miss Selene|SG|highflyer|f|f|a:28 sk:1 h:long hc:3 of:singlet oc:9 o2:21',
'Alexis Leigh|SG|technician|f|f|a:30 sk:5 h:halfup hc:5 of:singlet oc:21 o2:0',
'Mad Kat Karena|SG|brawler|h|f|a:26 sk:5 h:pigtails hc:2 of:singlet oc:21 o2:9'
];
STB.sgw=[['Real Global Threat', ['The Statement Sg', 'Emman Azmin']], ['Mighty Arrow', ['Black Arrow Sg', 'Mighty Mightier']], ['Jack N Cheese', ['BGJ Duo', 'CBK Duo']]];

// MEW (China) - altered
CUR.mkw=[
'Ho Ho Lan|CN|technician|f||a:38 sk:5 h:buzz hc:0 of:trunks oc:21 o2:21',
'Benji Chen|CN|highflyer|f||a:28 sk:5 h:slick hc:3 of:trunks oc:21 o2:0',
'Sunny Zed|CN|highflyer|f||a:27 sk:5 h:long hc:2 of:trunks oc:21 o2:7',
'Saga Xiong|CN|powerhouse|h||a:34 sk:5 h:shaggy hc:3 bd:big of:trunks oc:3 o2:5 gr:tattoo',
'Shining Poseidonn|CN|highflyer|f||a:26 sk:5 h:bald of:trunks oc:14 o2:0',
'The Slamm|CN|powerhouse|f||a:42 sk:5 h:side hc:0 bd:big of:trunks oc:1 o2:5 gr:tattoo',
'Zombie Dragoon|CN|lucha|f||a:31 sk:5 mk:full mc:0 of:trunks oc:3 o2:21',
'Michael Sue|CN|technician|h||a:29 sk:5 h:side hc:2 b:goatee of:trunks oc:21 o2:7',
'Black Mambo|CN|hardcore|h||a:33 sk:5 mk:full mc:1 of:trunks oc:14 o2:21',
'Bitmann|CN|brawler|h||a:28 sk:5 h:spiky hc:3 b:mustache of:trunks oc:3 o2:21 gr:tattoo',
'Jyunyan Li|CN|technician|h||a:27 sk:5 h:buzz hc:0 of:trunks oc:0 o2:21 gr:tattoo',
'Coldrey|CN|highflyer|f||a:25 sk:5 h:undercut hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Mofi Angus Jr|CN|strong|h||a:31 sk:5 h:slick hc:0 b:stubble of:trunks oc:0 o2:5',
'Wang Tau|CN|strong|f||a:32 sk:5 h:slick hc:2 b:stubble of:trunks oc:21 o2:5',
'Ash Silvia|CN|brawler|h||a:30 sk:5 h:long hc:0 b:full of:trunks oc:0 o2:7',
'Curry Kidd|CN|brawler|f||a:24 sk:5 h:shaggy hc:0 of:trunks oc:21 o2:0 gr:tattoo',
'Uncle Monney|CN|brawler|h||a:41 sk:5 h:shaggy hc:0 b:full of:trunks oc:21 o2:5',
'Queen Maria|CN|technician|f|f|a:29 sk:5 h:braids hc:6 of:singlet oc:21 o2:5',
'Lin Storm|CN|highflyer|f|f|a:24 sk:5 h:bangs hc:2 of:singlet oc:4 o2:21',
'Mei Fury|CN|brawler|h|f|a:27 sk:5 h:bob hc:0 of:singlet oc:0 o2:5'
];
STB.mkw=[['The New Dynasty', ['Ho Ho Lan', 'Saga Xiong', 'Shining Poseidonn']], ['Benji and Sunny', ['Benji Chen', 'Sunny Zed']]];

// WSI (India) - altered; roster extended
CUR.ind=[
'Baliyan Akki|IN|technician|f||a:32 sk:3 h:bald b:goatee of:trunks oc:21 o2:0',
'Deepak Rana|IN|strong|f||a:30 sk:9 h:undercut hc:0 of:trunks oc:21 o2:5',
'Rudra Singh|IN|powerhouse|h||a:34 sk:3 h:buzz hc:0 b:goatee bd:big of:trunks oc:14 o2:0 gr:tattoo',
'Shera Khan|IN|powerhouse|h||a:33 sk:3 h:spiky hc:0 b:goatee bd:big of:trunks oc:21 o2:5',
'Sangram Sing|IN|strong|f||a:36 sk:3 h:slick hc:0 b:full of:trunks oc:21 o2:0',
'Commander Kumaar|IN|strong|f||a:35 sk:3 h:buzz hc:0 of:trunks oc:21 o2:7',
'Guru Raj|IN|technician|h||a:38 sk:3 h:shaggy hc:0 b:full of:trunks oc:3 o2:5',
'Zafar Ameen In|IN|technician|h||a:34 sk:9 h:undercut hc:3 of:trunks oc:1 o2:21',
'Prince Kallu|IN|highflyer|f||a:26 sk:3 h:long hc:0 of:trunks oc:21 o2:21 gr:tattoo',
'Shanky Giant|IN|powerhouse|f||a:40 sk:3 h:undercut hc:0 bd:big of:trunks oc:1 o2:21',
'Gaurav Kumaar|IN|brawler|f||a:29 sk:3 h:slick hc:0 b:stubble of:trunks oc:0 o2:5',
'Vikram Thunder|IN|highflyer|h||a:27 sk:3 h:long hc:3 of:trunks oc:3 o2:7',
'Arjun Storm|IN|brawler|h||a:31 sk:3 h:bald b:mustache of:trunks oc:21 o2:21',
'Kavita Devy|IN|technician|f|f|a:31 sk:9 h:bangs hc:6 of:singlet oc:1 o2:9',
'Tyra Gatess|IN|highflyer|f|f|a:26 sk:9 h:bangs hc:10 of:singlet oc:1 o2:21',
'Meera Fury|IN|brawler|h|f|a:28 sk:9 h:pigtails hc:10 of:singlet oc:14 o2:9'
];
STB.ind=[['Indian Vipers', ['Rudra Singh', 'Shera Khan']], ['Desi Power', ['Sangram Sing', 'Commander Kumaar', 'Guru Raj']]];

// CTW (Portugal) - altered
CUR.ctw=[
'Lencastro|PT|highflyer|f||a:25 sk:1 h:shaggy hc:0 b:full of:trunks oc:3 o2:7 gr:tattoo',
'Red Eagle Pt|PT|technician|f||a:41 sk:0 h:buzz hc:0 b:goatee of:trunks oc:21 o2:7',
'Baltazar Pt|PT|brawler|h||a:34 sk:1 h:bald of:trunks oc:21 o2:5 gr:tattoo',
'Bruno Bammer|PT|brawler|h||a:38 sk:0 h:side hc:0 of:trunks oc:21 o2:5',
'Dani Duarte|PT|strong|t||a:30 sk:0 h:bald of:trunks oc:21 o2:5',
'Os Imortal|PT|powerhouse|h||a:35 sk:1 h:undercut hc:0 b:stubble bd:big of:trunks oc:21 o2:5',
'Abreu Pt|PT|strong|f||a:31 sk:0 h:shaggy hc:3 b:stubble of:trunks oc:14 o2:5',
'Guerra Dragon|PT|technician|f||a:33 sk:1 h:slick hc:0 b:mustache of:trunks oc:14 o2:21',
'Leo Rossi Pt|PT|technician|f||a:28 sk:1 h:bald of:trunks oc:0 o2:5',
'David Francis|PT|technician|h||a:32 sk:0 h:long hc:3 of:trunks oc:14 o2:0',
'Ian Rosaro|PT|highflyer|h||a:24 sk:1 h:slick hc:2 of:trunks oc:21 o2:7 gr:tattoo',
'Bacalhau Master|PT|technician|f||a:36 sk:0 h:side hc:0 of:trunks oc:14 o2:21',
'Nathan Blayd|PT|strong|h||a:30 sk:0 h:long hc:0 b:mustache of:trunks oc:21 o2:21 gr:tattoo',
'Wanderlei|PT|powerhouse|f||a:29 sk:1 h:undercut hc:3 b:full bd:big of:trunks oc:21 o2:7',
'Killer Kelli|PT|hardcore|f|f|a:33 sk:0 h:wavy hc:3 of:singlet oc:3 o2:9',
'Claudia Bradston|PT|technician|f|f|a:28 sk:0 h:pigtails hc:3 of:singlet oc:0 o2:9',
'Diana Strongh|PT|powerhouse|f|f|a:30 sk:0 h:wavy hc:5 of:singlet oc:0 o2:9'
];
STB.ctw=[['The New Order', ['Baltazar Pt', 'Bruno Bammer', 'Dani Duarte']], ['Os Imortais', ['Os Imortal', 'Abreu Pt']]];

// FAL (Argentina) - altered
CUR.fal=[
'Alan Strongh|AR|strong|f||a:33 sk:1 h:short hc:2 b:mustache of:trunks oc:21 o2:5 gr:tattoo',
'Javi Guerrero|AR|technician|f||a:40 sk:0 h:short hc:3 b:goatee of:trunks oc:21 o2:5',
'Chuck Jonas|AR|brawler|h||a:34 sk:0 h:spiky hc:0 of:trunks oc:21 o2:0',
'Ricky Roca|AR|hardcore|h||a:35 sk:0 h:side hc:2 b:mustache of:trunks oc:21 o2:21',
'Byron Blair|AR|brawler|h||a:31 sk:1 h:undercut hc:3 of:trunks oc:1 o2:7',
'Mike Money Ar|AR|technician|h||a:36 sk:0 h:buzz hc:0 b:stubble of:trunks oc:21 o2:5 gr:tattoo',
'Lionhart|AR|powerhouse|f||a:32 sk:1 h:buzz hc:2 bd:big of:trunks oc:3 o2:21',
'Benjamin Stollo|AR|technician|t||a:28 sk:0 h:bald b:mustache of:trunks oc:21 o2:7',
'Demetrio Ar|AR|strong|h||a:30 sk:0 h:slick hc:2 of:trunks oc:0 o2:5',
'Bobby Walters Ar|AR|highflyer|f||a:27 sk:1 h:slick hc:2 of:trunks oc:0 o2:21',
'J-Masterr|AR|highflyer|f||a:26 sk:1 h:spiky hc:0 b:full of:trunks oc:3 o2:21',
'Vicente Viloni|AR|powerhouse|f||a:52 sk:1 h:spiky hc:0 bd:big of:trunks oc:21 o2:7',
'La Massa|AR|powerhouse|f||a:38 sk:1 mk:full mc:3 of:trunks oc:14 o2:5',
'Diosa Athena|AR|technician|f|f|a:29 sk:0 h:halfup hc:5 of:singlet oc:9 o2:9',
'Morgana Ar|AR|hardcore|h|f|a:31 sk:1 h:long hc:6 of:singlet oc:11 o2:9',
'Luna Libre|AR|highflyer|f|f|a:25 sk:0 h:pony hc:2 of:singlet oc:14 o2:0'
];
STB.fal=[['Masters of Wrestling', ['Javi Guerrero', 'Alan Strongh']], ['Los Hijos del Mal', ['Chuck Jonas', 'Ricky Roca', 'Byron Blair']]];

Object.assign(D,{'cn.RU':['Rosja','Russia'],'cn.UA':['Ukraina','Ukraine'],'cn.FI':['Finlandia','Finland'],'cn.SE':['Szwecja','Sweden'],'cn.NO':['Norwegia','Norway'],'cn.DK':['Dania','Denmark'],'cn.NL':['Holandia','Netherlands'],'cn.BE':['Belgia','Belgium'],'cn.AT':['Austria','Austria'],'cn.HU':['Węgry','Hungary'],'cn.HR':['Chorwacja','Croatia'],'cn.GR':['Grecja','Greece'],'cn.BG':['Bułgaria','Bulgaria'],'cn.TR':['Turcja','Turkey'],'cn.ZA':['RPA','South Africa'],'cn.QA':['Katar','Qatar'],'cn.IL':['Izrael','Israel'],'cn.SG':['Singapur','Singapore'],'cn.CN':['Chiny','China'],'cn.IN':['Indie','India'],'cn.PT':['Portugalia','Portugal'],'cn.AR':['Argentyna','Argentina']});

/* ============ Static game data ============ */
const STYLES=['technician','powerhouse','highflyer','lucha','strong','brawler','hardcore'];
const COUNTRIES=['US','JP','MX','GB','DE','PL','CA','BR','AU','NG','FR','ES','IT','CZ'];
const REGION={US:'na',CA:'na',MX:'la',BR:'la',GB:'eu',DE:'eu',PL:'eu',FR:'eu',ES:'eu',IT:'eu',CZ:'eu',JP:'as',AU:'oc',NG:'af',RU:'eu',UA:'eu',FI:'eu',SE:'eu',NO:'eu',DK:'eu',NL:'eu',BE:'eu',AT:'eu',HU:'eu',HR:'eu',GR:'eu',BG:'eu',TR:'eu',PT:'eu',ZA:'af',QA:'as',IL:'as',SG:'as',CN:'as',IN:'as',AR:'la'};
const NEARREG=['la|na','eu|na','af|eu','as|oc','eu|la'];
const NEIGH=['CZ|PL','DE|PL','CZ|DE','DE|FR','ES|FR','FR|IT','FR|GB','CA|US','MX|US','DK|SE','NO|SE','FI|SE','FI|NO','NL|BE','DE|NL','DE|AT','AT|HU','HU|PL','PL|UA','RU|UA','GR|BG','BG|TR','ES|PT','DE|DK','AT|HR','BE|FR','BE|DE','CN|SG','IN|SG','QA|IL'];
const pairKey=(a,b)=>[a,b].sort().join('|');
function accStart(c,fc){if(c===fc)return 55;if(NEIGH.indexOf(pairKey(c,fc))>=0)return 42;const a=REGION[c],b=REGION[fc];if(a&&a===b)return 32;if(NEARREG.indexOf(pairKey(a,b))>=0)return 18;return 8}
const NAMES={
 US:{f:['Jake','Cole','Marcus','Dante','Tyler','Nate','Colt','Zane','Wade','Luke'],l:['Steele','Maddox','Cross','Holloway','Ryker','Dalton','Voss','Mercer','Hale','Kane']},
 JP:{f:['Kenji','Daichi','Ryota','Haruto','Shun','Takumi','Akira','Naoki'],l:['Tanaka','Mori','Sakamoto','Hayashi','Kuroda','Fujimoto','Ishida','Nakano']},
 MX:{f:['Diego','Mateo','Santiago','Rafael','Emilio','Joaquín','Ángel','Hugo'],l:['Ramírez','Torres','Navarro','Castillo','Vargas','Ortega','Mendoza','Salazar']},
 GB:{f:['Oliver','Callum','Rhys','Jamie','Liam','Archie','Finn','Declan'],l:['Whitfield','Blackwood','Hargreaves','Pryce','Lockhart','Ashby','Thorne','Fenwick']},
 DE:{f:['Lukas','Jonas','Felix','Tobias','Niklas','Jens','Moritz','Stefan'],l:['Krüger','Becker','Hartmann','Vogel','Brandt','Lehmann','Richter','Falk']},
 PL:{f:['Marek','Kamil','Bartosz','Szymon','Dawid','Michał','Kuba','Radek'],l:['Wrona','Kowal','Zalewski','Sokół','Mazur','Bielak','Cichocki','Dudek']},
 CA:{f:['Ethan','Mason','Gavin','Brody','Carter','Dylan'],l:['Tremblay','Gagnon','MacLeod','Fraser','Lavoie','Sutherland']},
 BR:{f:['Thiago','Rodrigo','Caio','Bruno','Gustavo','Leandro'],l:['Almeida','Barbosa','Carvalho','Teixeira','Moreira','Duarte']},
 AU:{f:['Hayden','Riley','Brandon','Cameron','Josh','Kyle'],l:['Mitchell','Sullivan','Cooper','Gibson','Nash','Baxter']},
 NG:{f:['Chidi','Tunde','Emeka','Kunle','Obi','Segun'],l:['Okafor','Adeyemi','Nwosu','Balogun','Eze','Oladipo']},
 FR:{f:['Lucas','Hugo','Théo','Maxime','Antoine','Julien','Baptiste','Romain'],l:['Moreau','Lefèvre','Garnier','Roussel','Fontaine','Dubois','Marchand','Girard']},
 ES:{f:['Javier','Alejandro','Pablo','Álvaro','Sergio','Iván','Adrián','Rubén'],l:['Herrera','Molina','Cabrera','Ibáñez','Santana','Quintero','Pastor','Vidal']},
 IT:{f:['Matteo','Luca','Marco','Davide','Federico','Andrea','Nicolò','Riccardo'],l:['Rossetti','Bellini','Moretti','Ferraro','Caruso','Conti','Greco','Lombardi']},
 CZ:{f:['Tomáš','Jakub','Ondřej','Matěj','Filip','Vojtěch','Martin','Lukáš'],l:['Novák','Dvořák','Černý','Procházka','Horák','Kučera','Veselý','Král']}
};
const NAMESF={US:['Ava','Brooke','Skylar','Jade','Harper','Reese','Quinn','Tessa'],JP:['Yui','Aiko','Rin','Sakura','Mio','Hana','Nanami','Kaede'],MX:['Valentina','Camila','Ximena','Renata','Daniela','Itzel','Marisol','Fernanda'],GB:['Poppy','Imogen','Freya','Eleanor','Isla','Matilda','Harriet','Beatrice'],DE:['Lena','Marie','Greta','Hanna','Svenja','Clara','Jana','Franziska'],PL:['Kinga','Ola','Weronika','Zuzia','Agata','Marta','Natalia','Julia'],CA:['Chloe','Addison','Maeve','Piper','Sloane','Willa'],BR:['Larissa','Beatriz','Camila','Luana','Giovana','Thaís'],AU:['Matilda','Stevie','Kayla','Tahlia','Indi','Bronte'],NG:['Adaeze','Ngozi','Folake','Amara','Zainab','Chioma'],FR:['Camille','Léa','Manon','Chloé','Inès','Margaux','Océane','Élodie'],ES:['Lucía','Carmen','Paula','Noelia','Irene','Marta','Alba','Sara'],IT:['Giulia','Chiara','Sofia','Elisa','Martina','Federica','Alice','Giorgia'],CZ:['Tereza','Klára','Eliška','Adéla','Barbora','Kateřina','Nikola','Veronika']};
const STYLEW={
 US:{technician:2,powerhouse:3,highflyer:2,lucha:.5,strong:1,brawler:3,hardcore:2},
 JP:{technician:3,powerhouse:1,highflyer:2,lucha:.5,strong:5,brawler:1,hardcore:1},
 MX:{technician:1,powerhouse:.5,highflyer:3,lucha:6,strong:.3,brawler:1,hardcore:.5},
 GB:{technician:5,powerhouse:1,highflyer:1,lucha:.3,strong:1,brawler:2,hardcore:1},
 DE:{technician:3,powerhouse:3,highflyer:1,lucha:.3,strong:2,brawler:1,hardcore:1},
 PL:{technician:2,powerhouse:3,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:1},
 CA:{technician:3,powerhouse:2,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:1},
 BR:{technician:2,powerhouse:1,highflyer:3,lucha:2,strong:.5,brawler:2,hardcore:.5},
 AU:{technician:1,powerhouse:2,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:3},
 NG:{technician:1,powerhouse:4,highflyer:2,lucha:.3,strong:1,brawler:2,hardcore:1},
 FR:{technician:3,powerhouse:2,highflyer:2,lucha:.5,strong:1,brawler:2,hardcore:1},
 ES:{technician:2,powerhouse:1.5,highflyer:2.5,lucha:3,strong:.5,brawler:1.5,hardcore:1},
 IT:{technician:3,powerhouse:2,highflyer:1.5,lucha:.5,strong:1,brawler:2.5,hardcore:1},
 CZ:{technician:3,powerhouse:3,highflyer:1,lucha:.3,strong:1.5,brawler:2.5,hardcore:1}
};
const SBIAS={technician:{ring:6,mic:-3,cha:0},powerhouse:{ring:0,mic:0,cha:3},highflyer:{ring:2,mic:-2,cha:4},lucha:{ring:3,mic:-4,cha:3},strong:{ring:5,mic:-5,cha:0},brawler:{ring:-3,mic:3,cha:1},hardcore:{ring:-4,mic:0,cha:2}};
const STYLE_SUB={technician:{tec:14,psy:8,str:-4,spd:0,sta:2},powerhouse:{str:16,sta:4,spd:-8,tec:-6,psy:-2},highflyer:{spd:14,tec:2,str:-8,sta:0,psy:0},lucha:{spd:16,tec:4,str:-10,sta:-2,psy:2},strong:{str:10,sta:12,tec:3,spd:-2,psy:2},brawler:{str:8,sta:6,tec:-8,spd:-2,psy:0},hardcore:{sta:14,str:4,tec:-6,spd:0,psy:-2}};
const KEY={technician:'tec',powerhouse:'str',highflyer:'spd',lucha:'spd',strong:'str',brawler:'str',hardcore:'sta'};
const CHEM={'technician|strong':8,'technician|technician':6,'highflyer|lucha':8,'lucha|lucha':6,'highflyer|powerhouse':7,'brawler|hardcore':8,'hardcore|hardcore':6,'brawler|powerhouse':6,'strong|strong':7,'brawler|strong':5,'highflyer|highflyer':5,'powerhouse|powerhouse':3,'brawler|brawler':4,'lucha|technician':5,'highflyer|technician':5,'powerhouse|strong':5,'powerhouse|technician':4,'hardcore|powerhouse':4,'hardcore|highflyer':-2,'hardcore|technician':-4,'brawler|lucha':-2,'brawler|highflyer':-2,'hardcore|lucha':-3,'lucha|strong':2,'highflyer|strong':3,'hardcore|strong':1,'brawler|technician':0,'lucha|powerhouse':1};
function chem(a,b){const k=pairKey(a,b);const v=CHEM[k]!==undefined?CHEM[k]:0;return{v,k:v>=7?'chem.great':v>=4?'chem.ok':v<0?'chem.bad':'chem.none'}}
const FED_SPECS=[
 // global giants
 {id:'gwf',name:'World Wrestling Empire',short:'WWE',country:'US',tier:5,pop:90,cash:150e6,n:26,color:'#d7263d'},
 {id:'apw',name:'All Elevated Wrestling',short:'AEW',country:'US',tier:5,pop:82,cash:90e6,n:22,color:'#f2b632'},
 // big
 {id:'cwe',name:'Total Nonstop Attack',short:'TNA',country:'US',tier:4,pop:66,cash:30e6,n:16,color:'#2b6fd6'},
 {id:'nnp',name:'New Nippon Pro-Wrestling',short:'NNPW',country:'JP',tier:4,pop:72,cash:40e6,n:18,color:'#c8102e'},
 {id:'cul',name:'Consejo Universal de Lucha Libre',short:'CULL',country:'MX',tier:4,pop:62,cash:25e6,n:16,color:'#1e90a8'},
 // strong
 {id:'roh',name:'Ring of Glory',short:'ROG',country:'US',tier:3,pop:56,cash:6e6,n:14,color:'#8c1d2f'},
 {id:'nwc',name:'National Wrestling Coalition',short:'NWC',country:'US',tier:3,pop:46,cash:3e6,n:12,color:'#5c6b8a'},
 {id:'mlw',name:'Major Pro Wrestling',short:'MPW',country:'US',tier:3,pop:43,cash:2.6e6,n:12,color:'#3b7a57'},
 {id:'gcw',name:'Game Breaker Wrestling',short:'GBW',country:'US',tier:3,pop:42,cash:2.4e6,n:12,color:'#e8782a'},
 {id:'rsp',name:'All Nippon Pro-Wrestling',short:'ANPW',country:'JP',tier:3,pop:52,cash:5e6,n:14,color:'#d9577a'},
 {id:'ark',name:'Pro Wrestling ARK',short:'ARK',country:'JP',tier:3,pop:50,cash:4.5e6,n:14,color:'#2f6fb0'},
 {id:'str',name:'World Wonder Ring Starburst',short:'WWRS',country:'JP',tier:3,pop:51,cash:4.5e6,n:13,wo:1,color:'#f06292'},
 {id:'dtt',name:'DTT Pro-Wrestling',short:'DTT',country:'JP',tier:3,pop:45,cash:3e6,n:12,color:'#ffb300'},
 {id:'drg',name:'Dragon Portal Pro',short:'DPP',country:'JP',tier:3,pop:43,cash:2.6e6,n:12,color:'#00897b'},
 {id:'lfl',name:'Lucha Libre Triple Alianza',short:'LTA',country:'MX',tier:3,pop:54,cash:5e6,n:14,color:'#3cc4b1'},
 {id:'rvp',name:'Revolt Pro Wrestling',short:'RVP',country:'GB',tier:3,pop:48,cash:3.2e6,n:12,color:'#ef6c00'},
 {id:'pgr',name:'Progressive Wrestling',short:'PRG',country:'GB',tier:3,pop:44,cash:2.6e6,n:12,color:'#7e57c2'},
 {id:'wxx',name:'Westend Xtreme Wrestling',short:'WXW',country:'DE',tier:3,pop:49,cash:3.5e6,n:13,color:'#546e7a'},
 {id:'nlw',name:'Northern Lights Wrestling',short:'NLW',country:'CA',tier:3,pop:40,cash:2.2e6,n:11,color:'#5fb3e6'},
 {id:'spw',name:'Samba Pro Wrestling',short:'SPW',country:'BR',tier:3,pop:44,cash:2.2e6,n:12,color:'#35a853'},
 // regional
 {id:'bra',name:'British Ring Alliance',short:'BRA',country:'GB',tier:2,pop:34,cash:220e3,n:10,color:'#6a96f2'},
 {id:'icw',name:'Insane Clash Wrestling',short:'ICW',country:'GB',tier:2,pop:31,cash:180e3,n:10,color:'#c62828'},
 {id:'eve',name:'Pro-Wrestling EDEN',short:'EDEN',country:'GB',tier:2,pop:27,cash:140e3,n:9,color:'#ab47bc'},
 {id:'hwu',name:'Hanse Wrestling Union',short:'HWU',country:'DE',tier:2,pop:30,cash:160e3,n:10,color:'#9b7bff'},
 {id:'bwf',name:'Berlin Wrestling Federation',short:'BWF',country:'DE',tier:2,pop:24,cash:120e3,n:9,color:'#455a64'},
 {id:'cwa',name:'Catch Wrestling Alliance',short:'CWA',country:'DE',tier:2,pop:22,cash:110e3,n:9,color:'#8d6e63'},
 {id:'bnp',name:'Big Nippon Pro-Wrestling',short:'BNPW',country:'JP',tier:2,pop:31,cash:180e3,n:10,color:'#6d4c41'},
 {id:'atl',name:'Arena Titán',short:'ATL',country:'MX',tier:2,pop:29,cash:150e3,n:10,color:'#e8b53c'},
 {id:'sxw',name:'Sydney City Wrestling',short:'SCW',country:'AU',tier:2,pop:28,cash:140e3,n:9,color:'#2f9ec9'},
 {id:'mys',name:'Mystère Wrestling',short:'MYS',country:'CA',tier:2,pop:32,cash:170e3,n:10,color:'#6a1b9a'},
 {id:'def',name:'Defiance Wrestling',short:'DEF',country:'US',tier:2,pop:33,cash:190e3,n:10,color:'#00838f'},
 {id:'orw',name:'Ohio River Wrestling',short:'ORW',country:'US',tier:2,pop:28,cash:140e3,n:9,color:'#9e7b2e'},
 {id:'llf',name:'Lutte Libre Française',short:'LLF',country:'FR',tier:2,pop:25,cash:130e3,n:9,color:'#3b5bdb'},
 {id:'lib',name:'Lucha Ibérica',short:'LIB',country:'ES',tier:2,pop:26,cash:130e3,n:9,color:'#d94a4a'},
 {id:'rwc',name:'Roma Wrestling Club',short:'RWC',country:'IT',tier:2,pop:22,cash:110e3,n:9,color:'#2f8f5a'},
 {id:'llp',name:'Lagos Lariat Pro',short:'LLP',country:'NG',tier:2,pop:24,cash:100e3,n:9,color:'#2aa876'},
 {id:'psw',name:'Prague Steel Wrestling',short:'PSW',country:'CZ',tier:2,pop:28,cash:140e3,n:9,color:'#8a56d9'},
 // Poland
 {id:'ptw',name:'Primetime Wrestling',short:'PTW',country:'PL',tier:2,pop:21,cash:90e3,n:30,color:'#f9a825'},
 {id:'plz',name:'Fundacja Rozwoju Polskiego Wrestlingu',short:'FRPW',country:'PL',tier:1,pop:14,cash:15e3,n:10,color:'#d8344c'},
 {id:'ppw',name:'PpW Fenomen',short:'PpW',country:'PL',tier:1,pop:16,cash:18e3,n:44,color:'#b71c1c'},
 {id:'mzw',name:'Manic Zone Wrestling',short:'MZW',country:'PL',tier:1,pop:12,cash:12e3,n:24,color:'#e65100'},
 {id:'mcw',name:'Mining City Wrestling',short:'MCW',country:'PL',tier:1,pop:11,cash:11e3,n:9,color:'#37474f'},
 {id:'kpw',name:'Kaszuby Pro Wrestling',short:'KPW',country:'PL',tier:1,pop:13,cash:13e3,n:40,color:'#0277bd'},
 {id:'low',name:'Legacy of Wrestlers',short:'LOW',country:'PL',tier:1,pop:9,cash:9e3,n:22,color:'#6a1b9a'},
 // small independents
 {id:'flw',name:'Freelance Wrestling',short:'FLW',country:'US',tier:1,pop:14,cash:15e3,n:8,color:'#c2185b'},
 {id:'nst',name:'Preston City Wrestling',short:'PCW',country:'GB',tier:1,pop:15,cash:16e3,n:7,color:'#7a8aa6'},
 {id:'rpc',name:'WrestlingKULT',short:'WK',country:'DE',tier:1,pop:10,cash:10e3,n:6,color:'#4a4a55'},
 {id:'tfc',name:'The Crash',short:'CRASH',country:'MX',tier:1,pop:9,cash:9e3,n:6,color:'#6bbf3a'},
 {id:'tir',name:'Superkick-D',short:'SKD',country:'CA',tier:1,pop:13,cash:12e3,n:6,color:'#d96a6a'},
 {id:'nfw',name:'Nezavisimaya Federatsiya Wrestlinga',short:'NFW',country:'RU',tier:2,pop:20,cash:80e3,n:8,color:'#c0392b'},
 {id:'uwa',name:'Ukrainian Wrestling Area',short:'UWA',country:'UA',tier:1,pop:14,cash:14e3,n:8,color:'#1e88e5'},
 {id:'fcf',name:'Fight Club Suomi',short:'FCS',country:'FI',tier:1,pop:13,cash:13e3,n:8,color:'#0d47a1'},
 {id:'sth',name:'STHLM Wrestlers',short:'STW',country:'SE',tier:1,pop:14,cash:14e3,n:8,color:'#f9a825'},
 {id:'nwf',name:'Norsk Wrestling Forbund',short:'NWB',country:'NO',tier:1,pop:13,cash:13e3,n:8,color:'#c62828'},
 {id:'dpw',name:'Dansk Wrestling Pro',short:'DWP',country:'DK',tier:1,pop:12,cash:12e3,n:8,color:'#d32f2f'},
 {id:'pwh',name:'Pro Wrestling Nederland',short:'PWN',country:'NL',tier:2,pop:21,cash:90e3,n:8,color:'#ef6c00'},
 {id:'pwb',name:'Pro Wrestling Allstars Belgie',short:'PWB',country:'BE',tier:1,pop:13,cash:13e3,n:8,color:'#fbc02d'},
 {id:'ewa',name:'Euro Wrestling Alliance',short:'EWL',country:'AT',tier:1,pop:15,cash:16e3,n:8,color:'#b71c1c'},
 {id:'hcw',name:'Hungaria Championship Wrestling',short:'HUN',country:'HU',tier:2,pop:22,cash:90e3,n:8,color:'#2e7d32'},
 {id:'cwf',name:'Hrvatska Wrestling Federacija',short:'HWF',country:'HR',tier:1,pop:10,cash:10e3,n:8,color:'#1565c0'},
 {id:'zmk',name:'Zmaki Wrestling',short:'ZMK',country:'GR',tier:1,pop:14,cash:14e3,n:8,color:'#0277bd'},
 {id:'bwe',name:'Bulgaria Wrestling Event',short:'BWV',country:'BG',tier:1,pop:10,cash:10e3,n:8,color:'#388e3c'},
 {id:'tpw',name:'Turkiye Power Wrestling',short:'TPW',country:'TR',tier:2,pop:20,cash:80e3,n:8,color:'#d50000'},
 {id:'saw',name:'Southern Africa Wrestling',short:'SAW',country:'ZA',tier:1,pop:12,cash:12e3,n:8,color:'#00897b'},
 {id:'qpw',name:'Qatar Pro Wrestling',short:'QPW',country:'QA',tier:2,pop:24,cash:150e3,n:8,color:'#6a1b3a'},
 {id:'awo',name:'All Wrestling Organisation',short:'AWO',country:'IL',tier:1,pop:11,cash:11e3,n:8,color:'#3949ab'},
 {id:'sgw',name:'Lion City Pro Wrestling',short:'LCW',country:'SG',tier:1,pop:14,cash:14e3,n:8,color:'#e53935'},
 {id:'mkw',name:'Middle Empire Wrestling',short:'MEW',country:'CN',tier:1,pop:13,cash:13e3,n:8,color:'#ff8f00'},
 {id:'ind',name:'Wrestle Square India',short:'WSI',country:'IN',tier:1,pop:12,cash:12e3,n:8,color:'#ff6f00'},
 {id:'ctw',name:'Centro de Treino de Wrestling',short:'CTW',country:'PT',tier:1,pop:12,cash:12e3,n:8,color:'#2e7d32'},
 {id:'fal',name:'Federacion Argentina de Lucha Libre',short:'FAL',country:'AR',tier:1,pop:11,cash:11e3,n:8,color:'#4fc3f7'}
];
const TD=[{cap:250,price:15,prod:350,tv:0},{cap:1200,price:18,prod:5e3,tv:2e3},{cap:5000,price:30,prod:30e3,tv:25e3},{cap:14000,price:50,prod:150e3,tv:300e3},{cap:50000,price:80,prod:600e3,tv:2.5e6}];
const TPOP=[0,18,38,60,80],UPG=[0,16e3,300e3,4e6,90e6],ROSTERMAX=[12,17,25,34,48],SALM=[.6,2.3,9,32,110];
const OBJ_POP=[18,38,60,80,95],OBJ_CASH=[25e3,600e3,12e6,120e6,400e6];
const EV={
 interf:[{stars:.5,heat:15},{stars:.25,heat:3},{stars:-.25,heat:8,fin:'dq'}],
 turn:[{stars:.5,heat:25,turn:1},{stars:.1,heat:4}],
 crowd:[{stars:.5,inj:.12},{stars:-.25,inj:0},{stars:.75,inj:.3}],
 after:[{heat:20},{heat:-5},{heat:8}],
 botch:[{stars:-.25,inj:.2},{stars:.25,inj:.1},{stars:-.5,inj:0,fin:'dq'}],
 chant:[{stars:.5,heat:5},{stars:0},{stars:.25,heat:10,turn:1}],
 weapon:[{stars:.25,heat:12,fin:'dq'},{stars:-.25,heat:-3},{stars:.5,heat:8,inj:.2}],
 fanrun:[{stars:-.25},{stars:.25,heat:5,inj:.1},{stars:.5,heat:10}],
 refbump:[{stars:.25,heat:6},{stars:.5,heat:10,fin:'dirty'},{stars:0}],
 mic:[{stars:-.25},{stars:.25,heat:4},{stars:0}]
};
const MODES={};
for(let a=1;a<=10;a++)for(let b=a;b<=10;b++)MODES[a+'v'+b]={a,b};
[3,4,5,6].forEach(n=>MODES[n+'way']={a:n,b:0,ffa:1,g:1});
MODES['2v2v2']={a:6,b:0,ffa:1,g:2};MODES['2v2v2v2']={a:8,b:0,ffa:1,g:2};MODES['3v3v3']={a:9,b:0,ffa:1,g:3};
const STIPS={
 none:{tier:1,cost:0,inj:1,noDQ:false,aff:{}},
 extreme:{tier:1,cost:.04,inj:1.8,noDQ:true,aff:{hardcore:4,brawler:3,powerhouse:1,technician:-3,strong:0,highflyer:0,lucha:-1}},
 submission:{tier:1,cost:0,inj:1,noDQ:true,aff:{technician:4,strong:2,hardcore:-2,brawler:-1,powerhouse:0,highflyer:-2,lucha:0}},
 ironman:{tier:2,cost:0,inj:1.2,noDQ:false,aff:{technician:3,strong:4,highflyer:1,lucha:1,powerhouse:-1,brawler:-2,hardcore:-3}},
 lms:{tier:2,cost:.03,inj:1.6,noDQ:true,aff:{brawler:3,hardcore:3,strong:3,powerhouse:2,technician:-1,highflyer:-2,lucha:-2}},
 tables:{tier:2,cost:.05,inj:1.9,noDQ:true,aff:{hardcore:4,brawler:2,powerhouse:2,highflyer:1,technician:-3,strong:-1,lucha:0}},
 cage:{tier:3,cost:.1,inj:1.5,noDQ:true,aff:{brawler:3,powerhouse:3,hardcore:2,strong:1,highflyer:-1,lucha:-1,technician:0}},
 ladder:{tier:3,cost:.12,inj:2.1,noDQ:true,aff:{highflyer:4,lucha:4,hardcore:2,technician:-2,powerhouse:-2,strong:-1,brawler:0}},
 prizematch:{tier:2,cost:.1,inj:1.8,noDQ:true,aff:{highflyer:3,lucha:3,hardcore:2,brawler:1,technician:0,strong:-1,powerhouse:-1}},
 tourney:{tier:1,cost:0,inj:1,noDQ:false,aff:{}}
};
const SKIN=['#f1c9a5','#e0ac7e','#c68642','#8d5524','#5c3a21','#f6d7c3','#fde2cf','#a0673a','#3b2414','#d9a27a','#e8b894','#6f4326','#f9e0d0'];
const HAIRC=['#1b1b1b','#4a2c1a','#8a5a2b','#d9b45a','#c4c4c4','#b2342a','#f2e6b8','#6b3a1f','#2f6df2','#e0488f','#2fae5c','#8a56d9','#7a7a7a','#ff6b00','#14b8a6','#f5f5f5'];
const OUTC=['#d94a4a','#3b82d6','#35a853','#e8b53c','#8a56d9','#e8e6df','#2a2a2a','#e8782a','#14b8a6','#ec4899','#84cc16','#0ea5e9','#7a1f1f','#1e293b','#d4af37','#556b2f','#5a1020','#14213d','#b8bcc8','#0f766e','#6b4423','#111111','#f8f8f8','#f43f5e'];
const HAIRS=['bald','buzz','short','crop','side','slick','pompadour','spiky','fauxhawk','mohawk','curly','afro','dreads','braids','mullet','bun','long','bob','pony','pigtails','shaggy','undercut','topknot','flattop','wavy','bangs','cornrows','halfup'];
const BEARDS=['none','stubble','heavy','full','mustache','handlebar','goatee','soulpatch','chinstrap','vandyke','mutton','sideburns','long','anchor','circle','bushy','patchy'];
const OUTFITS=['trunks','singlet','pants','suit','tank','shorts','tights','jacket','vest','gi','stripes','armor','tshirt','hoodie','leather','coat','robe','tux','leotard','overalls','kilt','bodysuit'];
const MASKS=['none','half','full','domino','bandana','paint','hood','skull','cat','oni','stripe','wings'];
const ACCS=['none','headband','cap','backcap','bandana','shades','glasses','crown','cowboy','earrings','beanie','fedora','visor','tiara','flowers'];
const NECKS=['none','scarf','bowtie','towel','belt','tie'];
const GEARS=['none','kneepads','wristbands','pads','tape','chain','tattoo','armband','gloves','elbow','boots'];
const FACES=['none','scar','freckles','stripe','eyepatch','bruise','lipstick','eyeliner','warpaint','bandage','tears'];
const BUILDS=['std','big','lean','stocky','bulk'];
const STRAPS=['#1a1a1a','#8a1c1c','#1f3f8a','#1d6b4f','#6a3aa8','#b26a1a','#e8e6df','#c4358a','#2b2b6e','#6b4423','#13a89e','#e0541f'];
const PLATE={gold:['#f2c94c','#9a6a00'],silver:['#e6e9ef','#6f7890'],bronze:['#d08a4a','#6e3f14'],black:['#3a3a44','#a8acc0'],rose:['#f4b6d4','#a0366a'],blue:['#7fb4ff','#1f4e9a'],red:['#ff8a80','#8a1c1c'],rust:['#a65a2a','#4a2410'],emerald:['#6fd6a0','#14664a']};

/* ============ Data pack ============ */
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function tierOfPop(p){let tr=1;for(let i=1;i<5;i++)if(p>=TPOP[i])tr=i+1;return tr}
function salaryOf(w,tier){return Math.max(20,Math.round((w.pop*w.pop/8+w.ring*2)*SALM[tier-1]/10)*10)}
function genStats(w,r){
 const b=STYLE_SUB[w.style]||{};
 ['str','spd','tec','sta','psy'].forEach(k=>{if(w[k]===undefined)w[k]=clamp(Math.round(w.ring+(b[k]||0)+(r()-.5)*16),10,98)});
 if(w.loyal===undefined)w.loyal=clamp(Math.round(35+r()*55),10,98);
 if(w.morale===undefined)w.morale=Math.round(55+r()*30);
 if(w.fatigue===undefined)w.fatigue=0;
 return w;
}
function randLook(r,cc,fem){
 const skinBias={JP:[0,5,0,1,9],NG:[3,4,3,2,8,7],MX:[1,2,1,2,9],BR:[1,2,3,4,7,9]}[cc];
 const sk=skinBias&&r()<.7?skinBias[Math.floor(r()*skinBias.length)]:Math.floor(r()*SKIN.length);
 const pk=a=>a[Math.floor(r()*a.length)];
 const MH=['shaggy','undercut','topknot','flattop','cornrows','bald','buzz','buzz','short','short','short','crop','crop','side','side','slick','slick','pompadour','spiky','fauxhawk','mohawk','curly','afro','dreads','braids','mullet','bun','long'];
 const FH=['wavy','bangs','halfup','long','long','long','bob','bob','pony','pony','pony','pigtails','short','side','curly','afro','braids','bun','crop','dreads','buzz'];
 const MB=['none','none','none','none','none','stubble','stubble','heavy','full','full','mustache','handlebar','goatee','soulpatch','chinstrap','vandyke','mutton','sideburns','long','anchor','circle','bushy','patchy'];
 const MO=['trunks','trunks','trunks','singlet','singlet','pants','pants','tank','shorts','tights','jacket','vest','gi','stripes','armor','suit','tshirt','hoodie','leather','kilt','bodysuit'];
 const FO=['singlet','singlet','suit','tank','tights','jacket','stripes','armor','gi','leotard','leotard','bodysuit','robe','overalls'];
 const hairC=Math.floor(r()*(r()<.8?6:HAIRC.length)),outC=Math.floor(r()*OUTC.length);
 const L={skin:sk,hair:fem?pk(FH):pk(MH),hairC,beardC:hairC,beard:fem?'none':pk(MB),outfit:fem?pk(FO):pk(MO),outC,o2:Math.floor(r()*OUTC.length),
  mask:r()<(fem?.08:.14)?pk(MASKS.slice(1)):'none',maskC:Math.floor(r()*OUTC.length),acc:r()<.25?pk(ACCS.slice(1)):'none',gear:r()<.4?pk(GEARS.slice(1)):'none',face:r()<.15?pk(FACES.slice(1)):'none',neck:r()<.1?pk(NECKS.slice(1)):'none',build:r()<.25?pk(['big','lean','stocky','bulk']):'std'};
 return L;
}
function buildPack(){
 const r=mulberry(20261108),used=new Set(),W=[];let n=1;
 const wpick=o=>{const ks=Object.keys(o);let tot=0;ks.forEach(k=>tot+=o[k]);let x=r()*tot;for(const k of ks){x-=o[k];if(x<=0)return k}return ks[0]};
 const mk=(fed,cc,fpop,rank,total,fc,fem)=>{
  let nm;for(let g=0;g<40;g++){const N=NAMES[cc],FN=fem?NAMESF[cc]:N.f;nm=FN[Math.floor(r()*FN.length)]+' '+N.l[Math.floor(r()*N.l.length)];if(!used.has(nm))break}
  if(used.has(nm))nm+=' Jr.';used.add(nm);
  const style=wpick(STYLEW[cc]),b=SBIAS[style];
  const pop=clamp(Math.round(fpop+(0.5-rank/total)*40+(r()-.5)*10),3,98),tr=tierOfPop(pop);
  const base=28+tr*9,g=()=>(r()-.5)*24;
  const w={id:'w'+(n++),name:nm,country:cc,style,role:r()<.5?'face':r()<.7?'heel':'tweener',
   ring:clamp(Math.round(base+b.ring+g()+(pop-fpop)*.2),18,97),mic:clamp(Math.round(base-6+b.mic+g()),12,97),cha:clamp(Math.round(base-2+b.cha+g()),12,97),
   pop,age:20+Math.floor(r()*r()*22)+Math.floor(r()*8),fed,contract:12+Math.floor(r()*90),injury:0,look:randLook(r,cc,fem)};
  if(fem)w.g='f';
  genStats(w,r);
  w.acc=fed==='FA'?0:clamp(accStart(cc,fc)+Math.floor(r()*r()*130),0,100);
  w.salary=salaryOf(w,tierOfPop(fpop));return w;
 };
 const HK={long:'long',short:'short',buzz:'buzz',bald:'bald',slick:'slick',side:'side',spiky:'spiky',mohawk:'mohawk',fauxhawk:'fauxhawk',curly:'curly',afro:'afro',dreads:'dreads',braids:'braids',mullet:'mullet',bun:'bun',bob:'bob',pony:'pony',pigtails:'pigtails',crop:'crop',pompadour:'pompadour',shaggy:'shaggy',undercut:'undercut',topknot:'topknot',flattop:'flattop',wavy:'wavy',bangs:'bangs',cornrows:'cornrows',halfup:'halfup'};
 const mkCur=(f,e,rank,total)=>{
  const s=e.split('|'),nm=s[0],cc=s[1],style=STYLES.indexOf(s[2])>=0?s[2]:'technician',fem=s[4]==='f',tk={};
  (s[5]||'').split(' ').forEach(x=>{const i=x.indexOf(':');if(i>0)tk[x.slice(0,i)]=x.slice(i+1)});
  const tot=total||f.n,fp=fem?f.pop*.92:f.pop,b=SBIAS[style];
  const pop=clamp(Math.round(fp+(f.tier>=3?14:10)-Math.pow(rank/tot,.85)*(f.tier>=3?58:44)+(r()-.5)*5),3,98),tr=tierOfPop(pop),base=28+tr*9,g=()=>(r()-.5)*24;
  const role=s[3]==='f'?'face':s[3]==='h'?'heel':'tweener';
  const L=randLook(r,cc,fem),num=k=>tk[k]===undefined?undefined:+tk[k];
  if(tk.sk!==undefined)L.skin=num('sk');if(tk.h)L.hair=HK[tk.h]||L.hair;else if(tk.mk&&tk.mk!=='none')L.hair='bald';if(tk.hc!==undefined){L.hairC=num('hc');L.beardC=num('hc')}
  L.beard=tk.b||(fem?'none':(tk.h?'none':L.beard));if(tk.bc!==undefined)L.beardC=num('bc');
  if(tk.of)L.outfit=tk.of;if(tk.oc!==undefined)L.outC=num('oc');if(tk.o2!==undefined)L.o2=num('o2');
  L.mask=tk.mk||'none';if(tk.mc!==undefined)L.maskC=num('mc');L.acc=tk.ac||'none';L.gear=tk.gr||'none';L.face=tk.fc||'none';L.neck=tk.nk||'none';L.build=tk.bd||'std';
  const w={id:'w'+(n++),name:nm,country:cc,style,role,
   ring:clamp(Math.round(base+b.ring+g()+(pop-fp)*.2),18,97),mic:clamp(Math.round(base-6+b.mic+g()),12,97),cha:clamp(Math.round(base-2+b.cha+g()),12,97),
   pop,age:+(tk.a||30),fed:f.id,contract:12+Math.floor(r()*90),injury:0,look:L};
  if(fem)w.g='f';used.add(nm);genStats(w,r);
  w.acc=clamp(accStart(cc,f.country)+Math.floor(r()*r()*130),0,100);w.salary=salaryOf(w,tierOfPop(f.pop));return w;
 };
 FED_SPECS.forEach(f=>{if(f.wo)return;const cur=((typeof CUR!=='undefined'&&CUR[f.id])||[]).filter(e=>e.split('|')[4]!=='f');const CN=Math.max(f.n,cur.length);for(let i=0;i<CN;i++){if(i<cur.length){W.push(mkCur(f,cur[i],i,CN));continue}const home=r()<(f.tier>=4?.35:f.tier>=2?.7:.75)?f.country:COUNTRIES[Math.floor(r()*COUNTRIES.length)];W.push(mk(f.id,home,f.pop,i,CN,f.country))}});
 {const fa=(typeof CUR!=='undefined'&&CUR.FA||[]).filter(e=>e.split('|')[4]!=='f');fa.forEach((e,i)=>{const w=mkCur({id:'FA',pop:26,country:'PL',n:fa.length},e,i,fa.length);w.acc=0;W.push(w)})}
 for(let i=0;i<24;i++){const fp=8+Math.floor(r()*42);W.push(mk('FA',COUNTRIES[Math.floor(r()*COUNTRIES.length)],fp,Math.floor(r()*10),10,'US'))}
 {const fa=(typeof CUR!=='undefined'&&CUR.FA||[]).filter(e=>e.split('|')[4]==='f');fa.forEach((e,i)=>{const w=mkCur({id:'FA',pop:24,country:'PL',n:fa.length},e,i,fa.length);w.acc=0;W.push(w)})}
 FED_SPECS.forEach(f=>{const nf=Math.max(3,Math.round(f.n*.4));const curF=((typeof CUR!=='undefined'&&CUR[f.id])||[]).filter(e=>e.split('|')[4]==='f');const NF=Math.max(nf,curF.length);for(let i=0;i<NF;i++){if(i<curF.length){W.push(mkCur(f,curF[i],i,NF));continue}const home=r()<(f.tier>=4?.35:f.tier>=2?.7:.75)?f.country:COUNTRIES[Math.floor(r()*COUNTRIES.length)];W.push(mk(f.id,home,f.pop*.92,i,NF,f.country,1))}});
 for(let i=0;i<8;i++){const fp=8+Math.floor(r()*38);W.push(mk('FA',COUNTRIES[Math.floor(r()*COUNTRIES.length)],fp,Math.floor(r()*10),10,'US',1))}
 FED_SPECS.forEach(f=>{const cap=Math.round(ROSTERMAX[f.tier-1]*(f.tier===1?1.05:1.3)),mc=f.wo?0:Math.ceil(cap*.72),fc=cap-mc;const mine=W.filter(w=>w.fed===f.id);[mine.filter(w=>w.g!=='f').sort((x,y)=>y.pop-x.pop).slice(mc),mine.filter(w=>w.g==='f').sort((x,y)=>y.pop-x.pop).slice(fc)].forEach(l=>l.forEach(w=>{w.fed='FA';w.acc=0;delete w.stb}))});
 const byName={};W.forEach(w=>{if(!byName[w.fed+'|'+w.name])byName[w.fed+'|'+w.name]=w});const stables=[];
 if(typeof STB!=='undefined')Object.keys(STB).forEach(fid=>STB[fid].forEach(s=>{const ms=s[1].map(n=>byName[fid+'|'+n]).filter(Boolean);if(ms.length>=2){ms.forEach(w=>w.stb=s[0]);stables.push({fed:fid,name:s[0],members:ms.map(w=>w.id)})}}));
 return{name:'Ring Boss default pack (fictional)',version:2,feds:FED_SPECS.map(f=>Object.assign({},f)),wrestlers:W,stables};
}
let PACK=buildPack();
function validPack(p){return p&&Array.isArray(p.feds)&&p.feds.length>0&&Array.isArray(p.wrestlers)&&p.wrestlers.length>0&&p.feds.every(f=>f.id&&f.name&&f.tier>=1&&f.tier<=5)&&p.wrestlers.every(w=>w.id&&w.name&&STYLES.indexOf(w.style)>=0)}
function loadPackLS(){try{const s=localStorage.getItem(LS_PACK);if(s){const p=JSON.parse(s);if(validPack(p))PACK=p}}catch(e){}}
function packText(){return '{"name":'+JSON.stringify(PACK.name||'pack')+',"version":2,\n"feds":[\n'+PACK.feds.map(f=>JSON.stringify(f)).join(',\n')+'\n],\n"wrestlers":[\n'+PACK.wrestlers.map(w=>JSON.stringify(w)).join(',\n')+'\n]}'}

/* ============ Feud catalogue (generated from the scenario list) ============ */
const KINDS={duo:{a:1,b:1},tag:{a:2,b:2},trio:{a:3,b:3},hand:{a:1,b:2},stwar:{st:2},newm:{st:1,extra:1},stvs:{st:1,extra:1},split:{st:1,member:1},stduo:{st:1,pair:1},title:{title:1},fed:{fed:1}};
const SC={"betrayal": {"cat": 1, "kind": "duo", "h": 8, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "revenge": {"cat": 1, "kind": "duo", "h": 6, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f2": {"cat": 1, "kind": "duo", "h": 7, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f3": {"cat": 1, "kind": "duo", "h": 5, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f4": {"cat": 1, "kind": "duo", "h": 8, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f5": {"cat": 1, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f6": {"cat": 1, "kind": "duo", "h": 10, "ev": "after", "end": "", "stip": "extreme", "pop": 0, "n": 1}, "f7": {"cat": 1, "kind": "duo", "h": 6, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f8": {"cat": 1, "kind": "duo", "h": 9, "ev": "after", "end": "", "stip": "extreme", "pop": 0, "n": 1}, "f9": {"cat": 1, "kind": "duo", "h": 8, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f10": {"cat": 1, "kind": "duo", "h": 7, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f11": {"cat": 1, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "title": {"cat": 2, "kind": "duo", "h": 5, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f13": {"cat": 2, "kind": "title", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f14": {"cat": 2, "kind": "duo", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f15": {"cat": 2, "kind": "title", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f16": {"cat": 2, "kind": "title", "h": 8, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f17": {"cat": 2, "kind": "title", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f18": {"cat": 2, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f19": {"cat": 2, "kind": "title", "h": 7, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f20": {"cat": 2, "kind": "duo", "h": 5, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f21": {"cat": 2, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f22": {"cat": 2, "kind": "tag", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f23": {"cat": 2, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f24": {"cat": 2, "kind": "duo", "h": 6, "ev": "interf", "end": "", "stip": "ladder", "pop": 0, "n": 1}, "f25": {"cat": 2, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f26": {"cat": 2, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "legend": {"cat": 3, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 2, "n": 1}, "rookie": {"cat": 3, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 3, "n": 1}, "mentor": {"cat": 3, "kind": "duo", "h": 8, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f30": {"cat": 3, "kind": "duo", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f31": {"cat": 3, "kind": "trio", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f32": {"cat": 3, "kind": "trio", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f33": {"cat": 3, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f34": {"cat": 3, "kind": "hand", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f35": {"cat": 3, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f36": {"cat": 3, "kind": "split", "h": 8, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f37": {"cat": 3, "kind": "trio", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f38": {"cat": 3, "kind": "hand", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "stablewar": {"cat": 4, "kind": "stwar", "h": 10, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "newmember": {"cat": 4, "kind": "newm", "h": 6, "ev": "interf", "end": "join", "stip": "", "pop": 0, "n": 1}, "stablesplit": {"cat": 4, "kind": "split", "h": 9, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f42": {"cat": 4, "kind": "stduo", "h": 8, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f43": {"cat": 4, "kind": "split", "h": 9, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f44": {"cat": 4, "kind": "split", "h": 7, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f45": {"cat": 4, "kind": "stwar", "h": 9, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f46": {"cat": 4, "kind": "stwar", "h": 8, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f47": {"cat": 4, "kind": "split", "h": 8, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f48": {"cat": 4, "kind": "trio", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f49": {"cat": 4, "kind": "stwar", "h": 10, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f50": {"cat": 4, "kind": "stvs", "h": 10, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f51": {"cat": 4, "kind": "newm", "h": 9, "ev": "interf", "end": "join", "stip": "", "pop": 0, "n": 1}, "f52": {"cat": 4, "kind": "stduo", "h": 8, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f53": {"cat": 4, "kind": "split", "h": 10, "ev": "turn", "end": "leave", "stip": "", "pop": 0, "n": 1}, "f54": {"cat": 4, "kind": "newm", "h": 9, "ev": "interf", "end": "join", "stip": "", "pop": 0, "n": 1}, "tagwar": {"cat": 5, "kind": "tag", "h": 7, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "trios": {"cat": 5, "kind": "trio", "h": 8, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "handicap": {"cat": 5, "kind": "hand", "h": 9, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f58": {"cat": 5, "kind": "duo", "h": 8, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f59": {"cat": 5, "kind": "tag", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f60": {"cat": 5, "kind": "title", "h": 6, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f61": {"cat": 5, "kind": "tag", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f62": {"cat": 5, "kind": "duo", "h": 7, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f63": {"cat": 5, "kind": "tag", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f64": {"cat": 5, "kind": "tag", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f65": {"cat": 5, "kind": "duo", "h": 8, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f66": {"cat": 5, "kind": "duo", "h": 5, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f67": {"cat": 6, "kind": "fed", "h": 10, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 3}, "f68": {"cat": 6, "kind": "fed", "h": 10, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 3}, "f69": {"cat": 6, "kind": "fed", "h": 8, "ev": "crowd", "end": "fed", "stip": "", "pop": 0, "n": 1}, "f70": {"cat": 6, "kind": "fed", "h": 9, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 2}, "f71": {"cat": 6, "kind": "fed", "h": 9, "ev": "turn", "end": "fed", "stip": "", "pop": 0, "n": 2}, "f72": {"cat": 6, "kind": "fed", "h": 10, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 3}, "f73": {"cat": 6, "kind": "fed", "h": 8, "ev": "crowd", "end": "fed", "stip": "", "pop": 0, "n": 1}, "f74": {"cat": 6, "kind": "fed", "h": 8, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 1}, "f75": {"cat": 6, "kind": "fed", "h": 6, "ev": "crowd", "end": "fed", "stip": "", "pop": 0, "n": 2}, "f76": {"cat": 6, "kind": "fed", "h": 10, "ev": "after", "end": "fed", "stip": "", "pop": 0, "n": 3}, "f77": {"cat": 6, "kind": "fed", "h": 9, "ev": "crowd", "end": "fed", "stip": "", "pop": 0, "n": 1}, "f78": {"cat": 6, "kind": "fed", "h": 10, "ev": "interf", "end": "fed", "stip": "", "pop": 0, "n": 2}, "f79": {"cat": 7, "kind": "trio", "h": 9, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f80": {"cat": 7, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f81": {"cat": 7, "kind": "trio", "h": 10, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f82": {"cat": 7, "kind": "stwar", "h": 9, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f83": {"cat": 7, "kind": "duo", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f84": {"cat": 7, "kind": "trio", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f85": {"cat": 7, "kind": "hand", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f86": {"cat": 7, "kind": "tag", "h": 8, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f87": {"cat": 7, "kind": "trio", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f88": {"cat": 7, "kind": "trio", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f89": {"cat": 8, "kind": "tag", "h": 7, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f90": {"cat": 8, "kind": "duo", "h": 7, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f91": {"cat": 8, "kind": "duo", "h": 6, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f92": {"cat": 8, "kind": "duo", "h": 4, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f93": {"cat": 8, "kind": "duo", "h": 7, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f94": {"cat": 8, "kind": "duo", "h": 6, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f95": {"cat": 8, "kind": "stwar", "h": 8, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f96": {"cat": 8, "kind": "stvs", "h": 8, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f97": {"cat": 8, "kind": "newm", "h": 8, "ev": "interf", "end": "join", "stip": "", "pop": 0, "n": 1}, "f98": {"cat": 8, "kind": "duo", "h": 7, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f99": {"cat": 8, "kind": "title", "h": 7, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f100": {"cat": 8, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f101": {"cat": 8, "kind": "stvs", "h": 6, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f102": {"cat": 8, "kind": "duo", "h": 9, "ev": "turn", "end": "heel", "stip": "", "pop": 0, "n": 1}, "f103": {"cat": 8, "kind": "hand", "h": 10, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f104": {"cat": 8, "kind": "trio", "h": 7, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f105": {"cat": 8, "kind": "duo", "h": 8, "ev": "turn", "end": "", "stip": "", "pop": 0, "n": 1}, "f106": {"cat": 8, "kind": "duo", "h": 8, "ev": "crowd", "end": "fire", "stip": "", "pop": 0, "n": 1}, "f107": {"cat": 8, "kind": "tag", "h": 9, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f108": {"cat": 8, "kind": "stvs", "h": 10, "ev": "interf", "end": "", "stip": "", "pop": 0, "n": 1}, "f109": {"cat": 9, "kind": "duo", "h": 10, "ev": "after", "end": "", "stip": "extreme", "pop": 0, "n": 1}, "f110": {"cat": 9, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f111": {"cat": 9, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f112": {"cat": 9, "kind": "duo", "h": 10, "ev": "after", "end": "", "stip": "lms", "pop": 0, "n": 1}, "f113": {"cat": 9, "kind": "stwar", "h": 10, "ev": "interf", "end": "war", "stip": "", "pop": 0, "n": 1}, "f114": {"cat": 9, "kind": "duo", "h": 10, "ev": "after", "end": "", "stip": "", "pop": 0, "n": 1}, "f115": {"cat": 9, "kind": "duo", "h": 8, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}, "f116": {"cat": 9, "kind": "duo", "h": 10, "ev": "after", "end": "retire", "stip": "", "pop": 0, "n": 1}, "f117": {"cat": 9, "kind": "duo", "h": 10, "ev": "after", "end": "", "stip": "extreme", "pop": 0, "n": 1}, "f118": {"cat": 9, "kind": "duo", "h": 9, "ev": "crowd", "end": "", "stip": "", "pop": 0, "n": 1}};
const SC_CATS=[1,2,3,4,5,6,7,8,9];
const heatMul=sc=>.7+.06*SC[sc].h;
const heatStars=n=>{n=clamp(Math.round(n),1,10);return '\u2605'.repeat(n)+'\u2606'.repeat(10-n)+' '+n+'/10'};
const liveStars=h=>clamp(Math.ceil(h/10),1,10);
Object.assign(D,{"sc.betrayal": ["Zdrada partnera", "Partner betrayal"], "sc.betrayal.d": ["Jeden z członków drużyny zdradza swojego wieloletniego partnera, rozpoczynając osobistą vendettę.", "One half of a team betrays his longtime partner and starts a personal vendetta."], "sc.revenge": ["Zemsta za porażkę", "Revenge for a loss"], "sc.revenge.d": ["Zawodnik nie może pogodzić się z przegraną i wraca, aby odebrać rywalowi zwycięstwo oraz dumę.", "A wrestler cannot accept defeat and returns to take back his rival's victory and pride."], "sc.f2": ["Złamana obietnica", "Broken promise"], "sc.f2.d": ["Przyjaciele obiecali sobie wspólny sukces, ale jeden wybiera własną karierę i mistrzostwo.", "Friends swore to succeed together, but one chooses his own career and the championship."], "sc.f3": ["Nie jesteś lepszy ode mnie", "You are not better than me"], "sc.f3.d": ["Dwóch zawodników o podobnych umiejętnościach próbuje udowodnić swoją wyższość.", "Two wrestlers of similar skill try to prove their superiority."], "sc.f4": ["Zabrałeś mi wszystko", "You took everything from me"], "sc.f4.d": ["Zawodnik obwinia przeciwnika o zniszczenie swojej kariery i odebranie mu najważniejszych szans.", "A wrestler blames his opponent for ruining his career and stealing his biggest chances."], "sc.f5": ["Cień przeszłości", "Shadow of the past"], "sc.f5.d": ["Powrót dawnego przeciwnika przywołuje wydarzenia, o których jeden z wrestlerów chciał zapomnieć.", "The return of an old opponent brings back events one wrestler wanted to forget."], "sc.f6": ["Nienawiść bez granic", "Hatred without limits"], "sc.f6.d": ["Konflikt wymyka się spod kontroli, a obaj zawodnicy przestają respektować jakiekolwiek zasady.", "The conflict spirals out of control and both wrestlers stop respecting any rules."], "sc.f7": ["Zazdrość", "Jealousy"], "sc.f7.d": ["Zawodnik nie potrafi zaakceptować sukcesów swojego przyjaciela i zaczyna sabotować jego karierę.", "A wrestler cannot accept his friend's success and starts sabotaging his career."], "sc.f8": ["Bez litości", "No mercy"], "sc.f8.d": ["Po kontuzjowaniu przeciwnika wrestler staje się celem brutalnej zemsty.", "After injuring an opponent, a wrestler becomes the target of brutal revenge."], "sc.f9": ["Fałszywy przyjaciel", "False friend"], "sc.f9.d": ["Jeden zawodnik udaje wsparcie dla rywala, aby w odpowiednim momencie go zdradzić.", "One wrestler pretends to support his rival, only to betray him at the right moment."], "sc.f10": ["Wrobiony", "Framed"], "sc.f10.d": ["Wrestler zostaje oskarżony o ataki, których nie dokonał. Musi znaleźć prawdziwego sprawcę.", "A wrestler is accused of attacks he did not commit and must find the real culprit."], "sc.f11": ["Ostatni rozdział", "The final chapter"], "sc.f11.d": ["Dwóch wieloletnich rywali spotyka się po raz ostatni, aby definitywnie zakończyć swoją historię.", "Two longtime rivals meet one last time to end their story for good."], "sc.title": ["Wyścig o pas", "Race for the title"], "sc.title.d": ["Dwóch lub więcej zawodników rywalizuje o możliwość zdobycia mistrzowskiego pasa.", "Two or more wrestlers compete for the chance to win the championship."], "sc.f13": ["Prawdziwy mistrz", "The real champion"], "sc.f13.d": ["Pretendent uważa, że obecny mistrz nie zasługuje na tytuł i chce udowodnić swoją wyższość.", "A contender believes the current champion does not deserve the title and wants to prove his superiority."], "sc.f14": ["Król bez korony", "King without a crown"], "sc.f14.d": ["Były mistrz wraca, aby odzyskać utracony tytuł i udowodnić, że nadal jest najlepszy.", "A former champion returns to reclaim his lost title and prove he is still the best."], "sc.f15": ["Niepokonany", "Undefeated"], "sc.f15.d": ["Mistrz pozostaje niepokonany, a nowy pretendent chce zakończyć jego dominację.", "The champion stays unbeaten and a new contender wants to end his dominance."], "sc.f16": ["Cena dominacji", "Price of dominance"], "sc.f16.d": ["Mistrz stosuje nieuczciwe metody, aby utrzymać pas, a rywal chce go zdemaskować.", "The champion uses dirty methods to keep the belt and a rival wants to expose him."], "sc.f17": ["Mistrz kontra pretendent", "Champion vs contender"], "sc.f17.d": ["Pretendent wielokrotnie otrzymuje szanse na tytuł, ale nie potrafi pokonać mistrza.", "A contender gets title shot after title shot but cannot beat the champion."], "sc.f18": ["Dwa pasy, jeden król", "Two belts, one king"], "sc.f18.d": ["Dwóch mistrzów chce udowodnić, który z nich jest prawdziwą twarzą federacji.", "Two champions want to prove which of them is the true face of the promotion."], "sc.f19": ["Mistrzostwo za wszelką cenę", "Title at any cost"], "sc.f19.d": ["Pretendent eliminuje wszystkich konkurentów, aby dostać walkę o mistrzostwo.", "A contender eliminates every competitor to earn a title match."], "sc.f20": ["Mistrzostwo bez wartości", "A worthless title"], "sc.f20.d": ["Mistrz jednego tytułu kwestionuje prestiż pozostałych mistrzostw.", "The holder of one title questions the prestige of all the other championships."], "sc.f21": ["Ostatnia szansa", "Last chance"], "sc.f21.d": ["Doświadczony wrestler dostaje ostatnią możliwość zdobycia mistrzostwa przed zakończeniem kariery.", "A veteran gets one last opportunity to win a title before his career ends."], "sc.f22": ["Wojna mistrzów", "War of champions"], "sc.f22.d": ["Kilku mistrzów zaczyna walczyć o miano najlepszego zawodnika całej federacji.", "Several champions start fighting over who is the best wrestler in the whole promotion."], "sc.f23": ["Walka o dziedzictwo", "Fight for legacy"], "sc.f23.d": ["Dwóch największych wrestlerów chce zapisać się w historii jako najlepszy zawodnik swojego pokolenia.", "The two greatest wrestlers want to be remembered as the best of their generation."], "sc.f24": ["Złoty bilet", "Golden ticket"], "sc.f24.d": ["Zwycięzca turnieju otrzymuje wyjątkową szansę na mistrzostwo, ale pozostali próbują odebrać mu tę możliwość.", "A tournament winner earns a special title shot, but the others try to take that chance away."], "sc.f25": ["Korona i chwała", "Crown and glory"], "sc.f25.d": ["Zwycięzca prestiżowego turnieju koronacyjnego zaczyna uważać się za nietykalnego, a rywale chcą odebrać mu koronę.", "The winner of a prestigious tournament starts to feel untouchable and rivals want his crown."], "sc.f26": ["Ostatni król", "The last king"], "sc.f26.d": ["Były dominator wraca, aby odzyskać pozycję i tytuł, które odebrała mu nowa generacja.", "A former dominator returns to win back the position and title taken by a new generation."], "sc.legend": ["Powrót legendy", "Legend returns"], "sc.legend.d": ["Legenda powraca do federacji i od razu rzuca wyzwanie największym gwiazdom.", "A legend comes back to the promotion and immediately challenges the biggest stars."], "sc.rookie": ["Debiutant kontra weteran", "Rookie vs veteran"], "sc.rookie.d": ["Młody zawodnik chce udowodnić swoją wartość, pokonując doświadczoną gwiazdę.", "A young wrestler wants to prove his worth by beating an experienced star."], "sc.mentor": ["Mistrz kontra uczeń", "Mentor vs protégé"], "sc.mentor.d": ["Mentor i jego podopieczny zaczynają rywalizować, gdy uczeń postanawia przebić swojego nauczyciela.", "A mentor and his protégé start fighting when the student decides to surpass the teacher."], "sc.f30": ["Twoja era dobiegła końca", "Your era is over"], "sc.f30.d": ["Młody wrestler publicznie ogłasza koniec ery legendy i chce zająć jej miejsce.", "A young wrestler publicly declares the end of a legend's era and wants to take his place."], "sc.f31": ["Nowa generacja", "New generation"], "sc.f31.d": ["Młodzi zawodnicy jednoczą się, aby przejąć federację od starszych gwiazd.", "Young wrestlers unite to take the promotion from the older stars."], "sc.f32": ["Nienawiść pokoleniowa", "Generational hatred"], "sc.f32.d": ["Weterani uważają młodych za niedoświadczonych, a młodzi oskarżają ich o blokowanie kariery.", "Veterans think the young are inexperienced, and the young accuse them of blocking their careers."], "sc.f33": ["Nie jestem twoim następcą", "I am not your successor"], "sc.f33.d": ["Młody wrestler odrzuca rolę następcy legendy i chce zbudować własną historię.", "A young wrestler refuses the role of a legend's heir and wants to build his own story."], "sc.f34": ["Wybór następcy", "Choosing a successor"], "sc.f34.d": ["Legenda wybiera kilku potencjalnych następców, którzy rozpoczynają rywalizację o jej uznanie.", "A legend picks several potential successors, who start competing for his approval."], "sc.f35": ["Człowiek, którego nie doceniono", "The overlooked man"], "sc.f35.d": ["Niedoceniany zawodnik postanawia udowodnić, że zasługuje na miejsce wśród największych gwiazd.", "An underrated wrestler decides to prove he belongs among the biggest stars."], "sc.f36": ["Ostatnia dominacja", "Last dominance"], "sc.f36.d": ["Legenda tworzy własną frakcję młodych wrestlerów, ale z czasem traci nad nimi kontrolę.", "A legend builds his own faction of young wrestlers, but gradually loses control over them."], "sc.f37": ["Koniec pewnej ery", "End of an era"], "sc.f37.d": ["Nowe gwiazdy próbują odebrać władzę i pozycję dotychczasowym liderom federacji.", "New stars try to take power and position away from the promotion's current leaders."], "sc.f38": ["Ostatni bastion", "The last bastion"], "sc.f38.d": ["Weteran broni honoru swojego pokolenia przed młodymi zawodnikami.", "A veteran defends the honor of his generation against the young wrestlers."], "sc.stablewar": ["Stajnia kontra stajnia", "Stable vs stable"], "sc.stablewar.d": ["Dwie frakcje rozpoczynają rywalizację o dominację nad federacją, atakując swoich członków i ingerując w walki.", "Two factions fight for dominance over the promotion, attacking each other's members and meddling in matches."], "sc.newmember": ["Nowy członek stajni", "New stable member"], "sc.newmember.d": ["Pojawienie się nowego członka zmienia układ sił w grupie i wzbudza zazdrość pozostałych.", "A newcomer changes the balance of power in the group and stirs up jealousy among the others."], "sc.stablesplit": ["Rozłam w stajni", "Stable breakup"], "sc.stablesplit.d": ["Członkowie frakcji przestają zgadzać się z liderem, co prowadzi do podziału na dwa obozy.", "Members of a faction stop agreeing with their leader, splitting the group into two camps."], "sc.f42": ["Wojna o tron", "War for the throne"], "sc.f42.d": ["Członkowie jednej grupy walczą o przejęcie przywództwa i zajęcie miejsca dotychczasowego lidera.", "Members of one group fight to take over leadership from the current leader."], "sc.f43": ["Upadek imperium", "Fall of an empire"], "sc.f43.d": ["Potężna frakcja zaczyna się rozpadać, gdy jej członkowie stawiają własne ambicje ponad lojalność.", "A powerful faction starts to crumble as its members put their own ambitions above loyalty."], "sc.f44": ["Zdrajca wśród nas", "Traitor among us"], "sc.f44.d": ["Lider podejrzewa, że ktoś z jego grupy współpracuje z przeciwnikami.", "A leader suspects that someone in his group is working with the enemy."], "sc.f45": ["Nowy porządek", "New order"], "sc.f45.d": ["Nowa frakcja chce zmienić zasady funkcjonowania federacji i przejąć wszystkie najważniejsze tytuły.", "A new faction wants to change the rules of the promotion and take all the most important titles."], "sc.f46": ["Wojna o dziedzictwo", "War for the legacy"], "sc.f46.d": ["Dwie frakcje wywodzące się z jednej grupy walczą o prawo do jej nazwy i dziedzictwa.", "Two factions that came from one group fight for the right to its name and legacy."], "sc.f47": ["Niepotrzebny element", "Unwanted element"], "sc.f47.d": ["Wyrzucony członek stajni tworzy własną grupę, aby zemścić się na byłych sojusznikach.", "A kicked-out stable member forms his own group to take revenge on his former allies."], "sc.f48": ["Rewolucja", "Revolution"], "sc.f48.d": ["Niedoceniani zawodnicy tworzą sojusz przeciwko największym gwiazdom federacji.", "Underrated wrestlers form an alliance against the promotion's biggest stars."], "sc.f49": ["Władza absolutna", "Absolute power"], "sc.f49.d": ["Dominująca stajnia zaczyna kontrolować gale, zastraszać wrestlerów i wpływać na decyzje zarządu.", "A dominant stable starts controlling shows, intimidating wrestlers and influencing management decisions."], "sc.f50": ["Wszyscy przeciwko jednemu", "Everyone against one"], "sc.f50.d": ["Rywalizujące frakcje zawierają tymczasowy sojusz, aby pokonać wspólnego, potężnego przeciwnika.", "Rival factions form a temporary alliance to beat a common, powerful opponent."], "sc.f51": ["Przejęcie", "Takeover"], "sc.f51.d": ["Frakcja stopniowo rekrutuje kolejnych wrestlerów i przejmuje kontrolę nad całym składem.", "A faction gradually recruits more wrestlers and takes control of the whole roster."], "sc.f52": ["Bracia krwi", "Blood brothers"], "sc.f52.d": ["Dwóch najbliższych sobie członków stajni zaczyna rywalizować o władzę i uwagę lidera.", "Two of the closest members of a stable start competing for power and the leader's attention."], "sc.f53": ["Ostatnia zdrada", "The final betrayal"], "sc.f53.d": ["Lider zostaje opuszczony przez swoich ludzi, ale niespodziewanie znajduje nowego sojusznika.", "A leader is abandoned by his men but unexpectedly finds a new ally."], "sc.f54": ["Projekt: Nowa Era", "Project: New Era"], "sc.f54.d": ["Tajemnicza organizacja rekrutuje młodych wrestlerów, tworząc armię do przejęcia federacji.", "A mysterious organization recruits young wrestlers, building an army to take over the promotion."], "sc.tagwar": ["Wojna tag teamów", "Tag team war"], "sc.tagwar.d": ["Dwie drużyny rozpoczynają rywalizację o dominację w dywizji tag team.", "Two teams start fighting for dominance of the tag team division."], "sc.trios": ["Wojna trójek", "Trios war"], "sc.trios.d": ["Trzy drużyny rywalizują jednocześnie o dominację, a sojusze zmieniają się z gali na galę.", "Three teams compete at once for dominance, and alliances change from show to show."], "sc.handicap": ["Jeden przeciwko wielu", "One against many"], "sc.handicap.d": ["Samotny zawodnik staje naprzeciwko całej drużyny, która chce wyeliminować go z rywalizacji.", "A lone wrestler faces a whole team that wants to eliminate him from the competition."], "sc.f58": ["Rozpad drużyny", "Team breakup"], "sc.f58.d": ["Jeden z partnerów zaczyna sabotować wspólne walki, ponieważ chce rozwijać karierę solową.", "One partner starts sabotaging joint matches because he wants a solo career."], "sc.f59": ["Nowi pretendenci", "New contenders"], "sc.f59.d": ["Nowa drużyna pojawia się w dywizji i rzuca wyzwanie aktualnym mistrzom.", "A new team appears in the division and challenges the current champions."], "sc.f60": ["Mistrzowie kontra pretendenci", "Champions vs contenders"], "sc.f60.d": ["Aktualni mistrzowie muszą bronić swoich tytułów przed drużyną, która nieustannie domaga się kolejnej szansy.", "The current champions must defend their titles against a team that keeps demanding another shot."], "sc.f61": ["Najlepsi na świecie", "Best in the world"], "sc.f61.d": ["Dwie drużyny uważające się za najlepsze na świecie walczą o udowodnienie swojej wyższości.", "Two teams who consider themselves the best in the world fight to prove it."], "sc.f62": ["Zjednoczeni w nienawiści", "United in hatred"], "sc.f62.d": ["Dwóch indywidualnych rywali zostaje zmuszonych do współpracy w drużynie, mimo wzajemnej niechęci.", "Two individual rivals are forced to team up despite their mutual dislike."], "sc.f63": ["Turniej o dominację", "Tournament for dominance"], "sc.f63.d": ["Kilka drużyn bierze udział w turnieju, którego stawką jest mistrzostwo i pozycja numer jeden w dywizji.", "Several teams enter a tournament with the title and the number one spot at stake."], "sc.f64": ["Nowa krew kontra doświadczenie", "New blood vs experience"], "sc.f64.d": ["Młoda drużyna próbuje odebrać tytuły doświadczonym mistrzom tag team.", "A young team tries to take the titles from experienced tag team champions."], "sc.f65": ["Byli mistrzowie", "Former champions"], "sc.f65.d": ["Byli partnerzy, którzy kiedyś dominowali dywizję, spotykają się po latach jako przeciwnicy.", "Former partners who once dominated the division meet years later as opponents."], "sc.f66": ["Walka o partnera", "Fight for a partner"], "sc.f66.d": ["Dwóch wrestlerów próbuje przekonać tego samego zawodnika, aby dołączył do ich drużyny.", "Two wrestlers try to convince the same wrestler to join their team."], "sc.f67": ["Inwazja", "Invasion"], "sc.f67.d": ["Zawodnicy konkurencyjnej federacji pojawiają się w Twojej federacji i zaczynają atakować lokalne gwiazdy.", "Wrestlers of a rival promotion show up in your promotion and start attacking the local stars."], "sc.f68": ["Wojna federacji", "Federation war"], "sc.f68.d": ["Dwie federacje rozpoczynają otwarty konflikt, w którym wrestlerzy walczą o prestiż swojej organizacji.", "Two promotions start an open conflict in which wrestlers fight for the prestige of their organization."], "sc.f69": ["Najlepsi na świecie", "Best in the world"], "sc.f69.d": ["Mistrzowie dwóch federacji chcą udowodnić, która organizacja posiada lepszych zawodników.", "Champions of two promotions want to prove which organization has better wrestlers."], "sc.f70": ["Przejęcie konkurencji", "Buying out the rival"], "sc.f70.d": ["Jedna federacja próbuje wykupić lub przejąć drugą, a wrestlerzy walczą o swoją przyszłość.", "One promotion tries to buy out or take over another, and the wrestlers fight for their future."], "sc.f71": ["Zdrajcy federacji", "Traitors of the promotion"], "sc.f71.d": ["Zawodnicy jednej organizacji przechodzą do konkurencji, zabierając ze sobą mistrzostwa i sekrety.", "Wrestlers of one organization defect to the competition, taking titles and secrets with them."], "sc.f72": ["Otwarta wojna", "Open war"], "sc.f72.d": ["Przedstawiciele dwóch federacji regularnie atakują się podczas gal przeciwników.", "Representatives of two promotions regularly attack each other during the rival's shows."], "sc.f73": ["Champion kontra Champion", "Champion vs champion"], "sc.f73.d": ["Mistrzowie dwóch organizacji walczą o tytuł najlepszego mistrza w branży.", "Champions of two organizations fight for the title of the best champion in the business."], "sc.f74": ["Polowanie na gwiazdy", "Star hunt"], "sc.f74.d": ["Jedna federacja próbuje podkupić największe gwiazdy konkurencyjnej organizacji.", "One promotion tries to poach the biggest stars of a rival organization."], "sc.f75": ["Wojna o prestiż", "War for prestige"], "sc.f75.d": ["Obie federacje organizują własne turnieje, próbując udowodnić, która jest bardziej prestiżowa.", "Both promotions run their own tournaments to prove which one is more prestigious."], "sc.f76": ["Ostatnia federacja", "The last promotion standing"], "sc.f76.d": ["Jedna organizacja chce całkowicie zniszczyć konkurencję i pozostać jedyną liczącą się federacją.", "One organization wants to destroy the competition completely and remain the only promotion that matters."], "sc.f77": ["Pojedynek gigantów", "Clash of giants"], "sc.f77.d": ["Dwie największe gwiazdy konkurencyjnych federacji spotykają się, aby rozstrzygnąć, kto jest twarzą wrestlingu.", "The two biggest stars of rival promotions meet to settle who is the face of wrestling."], "sc.f78": ["Sojusz przeciwko gigantowi", "Alliance against the giant"], "sc.f78.d": ["Kilka mniejszych federacji łączy siły przeciwko największej organizacji wrestlingowej.", "Several smaller promotions join forces against the biggest wrestling organization."], "sc.f79": ["Wojna dywizji", "War of the divisions"], "sc.f79.d": ["Dwie dywizje federacji rozpoczynają rywalizację o dominację w całej organizacji.", "Two divisions of the promotion start fighting for dominance over the whole organization."], "sc.f80": ["Jedna korona", "One crown"], "sc.f80.d": ["Zawodnicy dwóch dywizji walczą o tytuł najlepszego wrestlera całej organizacji.", "Wrestlers from two divisions fight for the title of best wrestler in the whole organization."], "sc.f81": ["Inwazja dywizji", "Division invasion"], "sc.f81.d": ["Jedna dywizja niespodziewanie atakuje drugą i próbuje przejąć jej gale oraz mistrzostwa.", "One division suddenly attacks another and tries to take over its shows and titles."], "sc.f82": ["Przejęcie dywizji", "Division takeover"], "sc.f82.d": ["Szef jednej dywizji próbuje przejąć kontrolę nad konkurencyjną dywizją.", "The head of one division tries to take control of a competing division."], "sc.f83": ["Najlepsi z najlepszych", "Best of the best"], "sc.f83.d": ["Największe gwiazdy poszczególnych dywizji rywalizują o miano najlepszego zawodnika federacji.", "The biggest stars of the individual divisions compete to be called the best wrestler of the promotion."], "sc.f84": ["Walka o supremację", "Fight for supremacy"], "sc.f84.d": ["Każda dywizja chce udowodnić, że posiada lepszych mistrzów, drużyny i gwiazdy.", "Each division wants to prove it has better champions, teams and stars."], "sc.f85": ["Transfer, który zmienił wszystko", "The transfer that changed everything"], "sc.f85.d": ["Przeniesienie wielkiej gwiazdy do innej dywizji wywołuje konflikt z dotychczasowymi zawodnikami.", "Moving a big star to another division sparks a conflict with the wrestlers already there."], "sc.f86": ["Wojna szefów dywizji", "War of the division bosses"], "sc.f86.d": ["Szefowie dwóch dywizji zaczynają rywalizować, wykorzystując swoich zawodników jako narzędzia w konflikcie.", "The bosses of two divisions start competing, using their wrestlers as tools in the conflict."], "sc.f87": ["Ostatnia dywizja na placu boju", "Last division standing"], "sc.f87.d": ["W wielkim turnieju lub serii walk dywizje stopniowo eliminują się nawzajem.", "In a big tournament or a series of matches the divisions gradually eliminate each other."], "sc.f88": ["Najeźdźcy z akademii", "Invaders from the academy"], "sc.f88.d": ["Młodzi zawodnicy z niższej dywizji przybywają do głównej, aby udowodnić, że zasługują na miejsce wśród największych gwiazd.", "Young wrestlers from the lower division come up to the main one to prove they belong among the biggest stars."], "sc.f89": ["Marionetka", "Puppet"], "sc.f89.d": ["Doświadczony wrestler wykorzystuje młodego zawodnika do eliminowania swoich przeciwników.", "An experienced wrestler uses a young wrestler to eliminate his rivals."], "sc.f90": ["Gra psychologiczna", "Mind games"], "sc.f90.d": ["Jeden zawodnik próbuje zniszczyć pewność siebie rywala poprzez prowokacje i manipulacje.", "One wrestler tries to destroy his rival's confidence through provocation and manipulation."], "sc.f91": ["Cena sławy", "Price of fame"], "sc.f91.d": ["Popularny wrestler zaczyna zaniedbywać przyjaciół i sojuszników, skupiając się wyłącznie na własnej karierze.", "A popular wrestler starts neglecting friends and allies, focusing only on his own career."], "sc.f92": ["Zakład", "The wager"], "sc.f92.d": ["Dwóch zawodników zawiera zakład, w którym przegrany musi spełnić upokarzający warunek.", "Two wrestlers make a bet in which the loser must meet a humiliating condition."], "sc.f93": ["Zakazany przeciwnik", "Forbidden opponent"], "sc.f93.d": ["Zarząd zabrania dwóm wrestlerom walki ze względu na wcześniejsze brutalne incydenty.", "Management forbids two wrestlers from fighting each other because of earlier brutal incidents."], "sc.f94": ["Lista do skreślenia", "Hit list"], "sc.f94.d": ["Zawodnik tworzy listę rywali, których musi pokonać, zanim rzuci wyzwanie mistrzowi.", "A wrestler makes a list of rivals he must beat before challenging the champion."], "sc.f95": ["Podwójna gra", "Double game"], "sc.f95.d": ["Wrestler współpracuje z dwiema rywalizującymi frakcjami, próbując manipulować obiema stronami.", "A wrestler works with two rival factions, trying to manipulate both sides."], "sc.f96": ["Kto pociąga za sznurki?", "Who pulls the strings?"], "sc.f96.d": ["Tajemnicza osoba wpływa na wyniki walk i decyzje zarządu, pozostając w ukryciu.", "A mysterious person influences match results and management decisions while staying hidden."], "sc.f97": ["Cena współpracy", "Price of cooperation"], "sc.f97.d": ["Zawodnik otrzymuje propozycję dołączenia do potężnej stajni w zamian za zdradzenie przyjaciela.", "A wrestler is offered a place in a powerful stable in exchange for betraying a friend."], "sc.f98": ["Niewygodna prawda", "Inconvenient truth"], "sc.f98.d": ["Jeden wrestler ujawnia kompromitujące informacje dotyczące kariery swojego przeciwnika.", "One wrestler reveals compromising information about his opponent's career."], "sc.f99": ["Mistrzostwo za kulisami", "Title behind the scenes"], "sc.f99.d": ["Mistrz zdobywa przewagę dzięki układom z zarządem, a rywal próbuje ujawnić kulisy jego sukcesów.", "The champion gains an edge through deals with management and a rival tries to expose them."], "sc.f100": ["Wszystko albo nic", "All or nothing"], "sc.f100.d": ["Zawodnicy stawiają na szali mistrzostwo, karierę lub miejsce w federacji.", "Wrestlers put the championship, their career or their place in the promotion on the line."], "sc.f101": ["Wybór strony", "Choosing a side"], "sc.f101.d": ["Wrestler zostaje zmuszony do opowiedzenia się po jednej ze stron konfliktu.", "A wrestler is forced to pick a side in a conflict."], "sc.f102": ["Upadek bohatera", "Fall of a hero"], "sc.f102.d": ["Uwielbiany babyface stopniowo przechodzi na ciemną stronę po serii porażek i zdrad.", "A beloved babyface slowly turns to the dark side after a series of losses and betrayals."], "sc.f103": ["Nikt nie jest bezpieczny", "Nobody is safe"], "sc.f103.d": ["Tajemniczy napastnik atakuje kolejne gwiazdy, nie ujawniając swojej tożsamości ani motywów.", "A mysterious attacker takes out one star after another without revealing identity or motives."], "sc.f104": ["Ostatni ocalały", "Last survivor"], "sc.f104.d": ["Wrestlerzy rywalizują o przetrwanie w turnieju lub serii eliminacji, w której każdy chce wyeliminować konkurencję.", "Wrestlers compete to survive a tournament or elimination series in which everyone wants to eliminate the competition."], "sc.f105": ["Droga do upadku", "Road to ruin"], "sc.f105.d": ["Zawodnik w desperacji zaczyna zawierać niebezpieczne sojusze, tracąc szacunek fanów.", "A desperate wrestler starts making dangerous alliances and loses the respect of the fans."], "sc.f106": ["Walka o kontrakt", "Fight for a contract"], "sc.f106.d": ["Dwóch zawodników rywalizuje o miejsce w federacji, a przegrany może stracić zatrudnienie.", "Two wrestlers compete for a place in the promotion, and the loser may lose his job."], "sc.f107": ["Rewolucja mistrzów", "Champions' revolution"], "sc.f107.d": ["Mistrzowie buntują się przeciwko zarządowi, który według nich faworyzuje wybrane gwiazdy.", "Champions rebel against management, which they say favors selected stars."], "sc.f108": ["Ostatnia nadzieja", "Last hope"], "sc.f108.d": ["Samotny wrestler staje naprzeciwko całej frakcji, próbując uratować swoją federację przed przejęciem.", "A lone wrestler faces a whole faction, trying to save his promotion from a takeover."], "sc.f109": ["Krwawa vendetta", "Bloody vendetta"], "sc.f109.d": ["Konflikt dwóch wrestlerów staje się tak brutalny, że zwykłe walki przestają wystarczać.", "The conflict between two wrestlers gets so brutal that ordinary matches are no longer enough."], "sc.f110": ["Ostatnia szansa na nieśmiertelność", "Last chance at immortality"], "sc.f110.d": ["Legenda próbuje zdobyć ostatnie mistrzostwo, zanim zakończy karierę.", "A legend tries to win one last title before ending his career."], "sc.f111": ["Król kontra król", "King vs king"], "sc.f111.d": ["Dwóch wrestlerów z koronami lub prestiżowymi osiągnięciami walczy o prawo do tytułu najlepszego.", "Two wrestlers with crowns or prestigious achievements fight for the right to be called the best."], "sc.f112": ["Ostatni człowiek", "Last man"], "sc.f112.d": ["Dwaj przeciwnicy zgadzają się na pojedynek, w którym liczy się wyłącznie całkowite pokonanie rywala.", "Two opponents agree to a match in which only the complete defeat of the rival counts."], "sc.f113": ["Koniec dynastii", "End of a dynasty"], "sc.f113.d": ["Dominująca rodzina lub grupa wrestlerów zostaje postawiona przed próbą utraty całego swojego dziedzictwa.", "A dominant family or group of wrestlers is put to the test of losing its entire legacy."], "sc.f114": ["Pojedynek o wszystko", "Winner takes all"], "sc.f114.d": ["Rywale ustalają, że zwycięzca otrzyma wszystko, co posiada przegrany w federacji.", "Rivals agree that the winner gets everything the loser has in the promotion."], "sc.f115": ["Nieśmiertelny", "Immortal"], "sc.f115.d": ["Wrestler przechodzi przez kolejnych przeciwników, twierdząc, że nikt nie jest w stanie go pokonać.", "A wrestler goes through opponent after opponent, claiming nobody can beat him."], "sc.f116": ["Ostatnia walka", "The final match"], "sc.f116.d": ["Dwaj wrestlerzy zgadzają się, że przegrany musi zakończyć karierę.", "Two wrestlers agree that the loser must end his career."], "sc.f117": ["Piekło na ziemi", "Hell on earth"], "sc.f117.d": ["Długoletnia rywalizacja przeradza się w serię ekstremalnych pojedynków, z których każdy jest bardziej brutalny.", "A long rivalry turns into a series of extreme matches, each more brutal than the last."], "sc.f118": ["Wojna o nieśmiertelność", "War for immortality"], "sc.f118.d": ["Dwie największe gwiazdy walczą o miejsce w historii i uznanie kolejnych pokoleń.", "The two biggest stars fight for a place in history and the respect of future generations."], "sc.cat1": ["Klasyczne rywalizacje osobiste", "Classic personal rivalries"], "sc.cat2": ["Rywalizacje o mistrzostwa i pozycję", "Title and ranking rivalries"], "sc.cat3": ["Powroty, debiuty i zmiana pokoleń", "Returns, debuts and changing generations"], "sc.cat4": ["Stajnie i frakcje", "Stables and factions"], "sc.cat5": ["Tag teamy i rywalizacje drużynowe", "Tag teams and team rivalries"], "sc.cat6": ["Rywalizacje między federacjami", "Rivalries between promotions"], "sc.cat7": ["Rywalizacje między dywizjami", "Division rivalries"], "sc.cat8": ["Nietypowe scenariusze i psychologiczne gry", "Unusual scenarios and mind games"], "sc.cat9": ["Dodatkowe scenariusze na duże wydarzenia", "Blockbuster event scenarios"]});

/* ============ Scenario intensity on a 1-100 scale + low-key scenarios ============ */
(function(){
 Object.keys(SC).forEach((id,i)=>{const x=SC[id];x.s=clamp(Math.round(18+(x.h-1)*8.5+((i*37)%13)-6),8,99)});
 const L=[
 ['l1','duo',9,'Spór o szatnię','Locker room dispute','Dwóch zawodników nie potrafi dogadać się, kto zajmuje lepszy kąt w szatni. Drobiazg, który powoli robi się osobisty.','Two wrestlers cannot agree on who gets the better corner of the locker room. A small thing that slowly turns personal.'],
 ['l2','duo',12,'Kłótnia o kolejność wejść','Entrance order argument','Obaj uważają, że to oni powinni wychodzić na ring jako ostatni. Publika zaczyna zauważać napięcie.','Both think they should walk out last. The crowd starts noticing the tension.'],
 ['l3','duo',15,'Przytyki w sieci','Online jabs','Wymiana złośliwych wpisów po ostatniej gali. Na razie to tylko słowa, ale kibice już wybierają strony.','A trade of snarky posts after the last show. Just words for now, but fans are already picking sides.'],
 ['l4','duo',18,'Miejsce na plakacie','Spot on the poster','Zawodnik czuje się pominięty na materiałach promocyjnych i zaczyna to głośno komentować.','A wrestler feels left off the promotional material and starts commenting on it loudly.'],
 ['l5','duo',22,'Przyjacielskie współzawodnictwo','Friendly rivalry','Dwóch kolegów z szatni zakłada się, kto zdobędzie więcej braw. Walki są uczciwe, ale z błyskiem w oku.','Two locker-room friends bet on who earns more cheers. Clean matches, with a twinkle in the eye.'],
 ['l6','duo',14,'Nieporozumienie po walce','Post-match misunderstanding','Przypadkowy cios i brak przeprosin. Jeden z nich uznał, że to było zrobione specjalnie.','An accidental shot and no apology. One of them decided it was on purpose.'],
 ['l7','duo',11,'Uraza o żart','Grudge over a joke','Żart w backstage\'u poszedł o krok za daleko. Teraz obaj czekają na okazję do rewanżu.','A backstage joke went a step too far. Now both wait for a chance to settle it.'],
 ['l8','duo',27,'Walka o uwagę kibiców','Fight for the fans\' attention','Dwaj zawodnicy rywalizują o to, kto ma głośniejszy doping. Każdy swoją okazję wykorzystuje, by przyćmić drugiego.','Two wrestlers compete over who gets the louder chants. Each uses every chance to outshine the other.'],
 ['l9','duo',31,'Podkradziona akcja','Stolen move','Jeden z nich zaczął używać popisowego ciosu drugiego. Ten uważa to za brak szacunku.','One of them started using the other\'s signature move. The other calls it disrespect.'],
 ['l10','duo',35,'Weteran kontra żółtodziób','Veteran vs rookie','Doświadczony zawodnik chce nauczyć młodego pokory. Młody nie ma zamiaru słuchać.','A seasoned wrestler wants to teach a youngster humility. The youngster is not listening.'],
 ['l11','tag',16,'Zadra między partnerami','Friction between partners','Tag team po serii porażek zaczyna się kłócić. Drużyna rywala wykorzystuje to bez litości.','A tag team starts bickering after a losing streak. The rival team exploits it mercilessly.'],
 ['l12','tag',24,'Walka o numer jeden','Race for the number one spot','Dwie drużyny chcą być pierwszym wyborem do pasów. Nikt jeszcze nie rzuca wyzwań, ale rywalizacja rośnie.','Two teams want to be the first pick for the belts. Nobody is making challenges yet, but the rivalry grows.'],
 ['l13','trio',20,'Spór trójek treningowych','Training trios rivalry','Dwie grupy ćwiczące razem na sali zaczynają się rywalizować o to, która jest lepsza.','Two groups that train together start competing over which one is better.'],
 ['l14','duo',6,'Niewinne przekomarzanie','Playful teasing','Dwóch zawodników żartuje z siebie przed kamerami. Nic poważnego, ale publice się to podoba.','Two wrestlers tease each other in front of the cameras. Nothing serious, but the crowd likes it.'],
 ];
 SC_CATS.push(10);
 const add={'sc.cat10':['Drobne zadrażnienia i lokalne spory','Minor grudges and local disputes']};
 L.forEach(([id,kind,s,pl,en,dpl,den])=>{SC['f'+id]={cat:10,kind,h:s/10,s,ev:pickR2(['crowd','after']),end:'',stip:'',pop:0,n:1};add['sc.f'+id]=[pl,en];add['sc.f'+id+'.d']=[dpl,den]});
 function pickR2(a){return a[Math.floor(Math.random()*a.length)]}
 Object.assign(D,add);
 Object.keys(SC).forEach(id=>{SC[id].h=SC[id].s/10});
})();
const heatNum=n=>'<b class="gold">'+Math.round(n)+'</b><span class="mute">/100</span>';

/* gender-neutral scenario texts */
Object.assign(D,{
'sc.betrayal.d':['Jedna osoba z duetu zdradza wieloletniego partnera, rozpoczynając osobistą vendettę.','One half of a team betrays a longtime partner and starts a personal vendetta.'],
'sc.revenge.d':['Zawodnik nie może pogodzić się z przegraną i wraca, aby odebrać rywalowi zwycięstwo oraz dumę.',"A wrestler cannot accept defeat and returns to take back a rival's victory and pride."],
'sc.revenge.1':['Zawodnik wraca z zaciętą miną i żąda rewanżu.','Back with a scowl, demanding a rematch.'],
'sc.legend.2':['Młody zawodnik odpowiada: tego miejsca nikt nie odbierze.','The youngster answers: nobody takes that spot.'],
'sc.rookie.d':['Młody zawodnik chce udowodnić swoją wartość, pokonując doświadczoną gwiazdę.','A young wrestler wants to prove their worth by beating an experienced star.'],
'sc.recruit.d':['Stajnia próbuje zwerbować zawodnika. Jeśli stajnia wygra, nowy człowiek dołącza.','A stable tries to recruit a wrestler. If the stable wins, the target joins.'],
'sc.recruit.1':['Stajnia składa ofertę, której zawodnik nie chce przyjąć.','The stable makes an offer that gets refused.'],
'sc.defector.d':['Członek buntuje się przeciw własnej ekipie. Po finale odchodzi.','A member turns on their own crew and leaves after the finale.'],
'sc.defector.2':['Po walce dawna ekipa przypuszcza atak.','The former crew attacks after the match.'],
'sc.trioswar.d':['Dwa trzyosobowe zespoły stają do wielkiego starcia.','Two three-person teams square up for a huge clash.'],
'sc.handicap.d':['Samotny zawodnik staje naprzeciwko całej drużyny, która chce wykluczyć przeciwnika z rywalizacji.','A lone wrestler faces a whole team that wants to eliminate the opponent from the competition.'],
'sc.handicap.1':['Po gali rywale łapią samotnika w zasadzkę.','Rivals ambush the lone wrestler after the show.'],
'sc.handicap.2':['Fani żądają prawa do oddania ciosów.','Fans demand a chance to hit back.'],
'sc.mentor.d':['Mentor i podopieczny zaczynają rywalizować, gdy uczeń postanawia przebić nauczyciela.','A mentor and a protégé start fighting when the student decides to surpass the teacher.'],
'sc.stablesplit.e':['Jeśli buntownik wygra, opuszcza stajnię.','If the rebel wins, the rebel leaves the stable.'],
'sc.f2.d':['Przyjaciele obiecali sobie wspólny sukces, ale jedna osoba wybiera własną karierę i mistrzostwo.','Friends swore to succeed together, but one chooses a solo career and the championship.'],
'sc.f4.d':['Zawodnik obwinia przeciwnika o zniszczenie kariery i odebranie najważniejszych szans.','A wrestler blames an opponent for ruining a career and stealing the biggest chances.'],
'sc.f5.d':['Powrót dawnego przeciwnika przywołuje wydarzenia, o których ktoś wolałby zapomnieć.','The return of an old opponent brings back events somebody wanted to forget.'],
'sc.f7.d':['Zawodnik nie potrafi zaakceptować sukcesu bliskiej osoby z szatni i zaczyna sabotować jej karierę.',"A wrestler cannot accept a close friend's success and starts sabotaging that career."],
'sc.f9.d':['Zawodnik udaje wsparcie dla rywala, aby w odpowiednim momencie zadać cios w plecy.','One wrestler pretends to support a rival, only to betray them at the right moment.'],
'sc.f10.d':['Zawodnik zostaje oskarżony o ataki, o których nic nie wie. Musi znaleźć prawdziwego sprawcę.','A wrestler is accused of attacks they did not commit and must find the real culprit.'],
'sc.f13.d':['Pretendent uważa, że obecny mistrz nie zasługuje na tytuł i chce udowodnić swoją wyższość.','A contender believes the current champion does not deserve the title and wants to prove superiority.'],
'sc.f14.d':['Były mistrz wraca, aby odzyskać utracony tytuł i udowodnić, że nadal jest najlepszy.','A former champion returns to reclaim the lost title and prove they are still the best.'],
'sc.f15.d':['Mistrz pozostaje niepokonany, a nowy pretendent chce zakończyć tę dominację.','The champion stays unbeaten and a new contender wants to end the dominance.'],
'sc.f16.d':['Mistrz stosuje nieuczciwe metody, aby utrzymać pas, a rywal chce zdemaskować te praktyki.','The champion uses dirty methods to keep the belt and a rival wants to expose them.'],
'sc.f21.d':['Doświadczony wrestler dostaje ostatnią możliwość zdobycia mistrzostwa, zanim kariera dobiegnie końca.','A veteran gets one last opportunity to win a title before the career ends.'],
'sc.f24.d':['Zwycięzca turnieju otrzymuje wyjątkową szansę na mistrzostwo, ale pozostali próbują odebrać zwycięzcy tę szansę.','A tournament winner earns a special title shot, but the others try to take that chance away.'],
'sc.f25.d':['Zwycięzca prestiżowego turnieju koronacyjnego uważa się za nietykalną gwiazdę, a rywale chcą odebrać koronę.','The winner of a prestigious tournament starts to feel untouchable and rivals want the crown.'],
'sc.f26.d':['Były dominator wraca, aby odzyskać pozycję i tytuł odebrane przez nową generację.','A former dominator returns to win back the position and title taken by a new generation.'],
'sc.f30.d':['Młody wrestler publicznie ogłasza koniec ery legendy i chce zająć jej miejsce.',"A young wrestler publicly declares the end of a legend's era and wants to take the spot."],
'sc.f34.d':['Legenda wybiera kilku potencjalnych następców, którzy rozpoczynają rywalizację o jej uznanie.','A legend picks several potential successors, who start competing for the approval.'],
'sc.f35.d':['Niedoceniany zawodnik postanawia udowodnić, że zasługuje na miejsce wśród największych gwiazd.','An underrated wrestler decides to prove they belong among the biggest stars.'],
'sc.f36.d':['Legenda tworzy własną frakcję młodych wrestlerów, ale z czasem traci nad nimi kontrolę.','A legend builds a faction of young wrestlers, but gradually loses control over them.'],
'sc.f38.d':['Weteran broni honoru swojego pokolenia przed młodymi zawodnikami.','A veteran defends the honor of a generation against the young wrestlers.'],
'sc.f44.d':['Lider podejrzewa, że ktoś z grupy współpracuje z przeciwnikami.','A leader suspects that someone in the group is working with the enemy.'],
'sc.f47.d':['Wyrzucony członek stajni tworzy własną grupę, aby zemścić się na byłych sojusznikach.','A kicked-out stable member forms a new group to take revenge on former allies.'],
'sc.f53.d':['Lider zostaje opuszczony przez swoich ludzi, ale niespodziewanie znajduje nowego sojusznika.','A leader is abandoned by the followers but unexpectedly finds a new ally.'],
'sc.f58.d':['Jeden z partnerów zaczyna sabotować wspólne walki, ponieważ kusi go kariera solowa.','One partner starts sabotaging joint matches because a solo career is calling.'],
'sc.f89.d':['Doświadczony wrestler wykorzystuje młodego zawodnika do eliminowania przeciwników.','An experienced wrestler uses a young wrestler to eliminate the rivals.'],
'sc.f90.d':['Zawodnik próbuje zniszczyć pewność siebie rywala poprzez prowokacje i manipulacje.',"One wrestler tries to destroy a rival's confidence through provocation and manipulation."],
'sc.f91.d':['Popularny wrestler zaczyna zaniedbywać przyjaciół i sojuszników, skupiając się wyłącznie na karierze.','A popular wrestler starts neglecting friends and allies, focusing only on a personal career.'],
'sc.f94.d':['Zawodnik tworzy listę rywali, których musi pokonać, zanim rzuci wyzwanie mistrzowi.','A wrestler makes a list of rivals that must be beaten before challenging the champion.'],
'sc.f98.d':['Zawodnik ujawnia kompromitujące informacje o karierze przeciwnika.',"One wrestler reveals compromising information about an opponent's career."],
'sc.f99.d':['Mistrz zdobywa przewagę dzięki układom z zarządem, a rywal próbuje ujawnić kulisy tych sukcesów.','The champion gains an edge through deals with management and a rival tries to expose them.'],
'sc.f106.d':['Dwoje zawodników rywalizuje o miejsce w federacji, a przegrany może stracić zatrudnienie.','Two wrestlers compete for a place in the promotion, and the loser may lose the job.'],
'sc.f108.d':['Samotny wrestler staje naprzeciwko całej frakcji, próbując uratować federację przed przejęciem.','A lone wrestler faces a whole faction, trying to save the promotion from a takeover.'],
'sc.f110.d':['Legenda próbuje zdobyć ostatnie mistrzostwo, zanim zakończy karierę.','A legend tries to win one last title before the career ends.'],
'sc.f115.d':['Zawodnik przechodzi przez kolejnych przeciwników, twierdząc, że nikt nie ma szans na zwycięstwo.','A wrestler goes through opponent after opponent, claiming nobody can win.'],
'sc.f116.d':['Dwoje zawodników zgadza się, że przegrany musi zakończyć karierę.','Two wrestlers agree that the loser must end the career.'],
'sc.fl1.d':['Dwoje zawodników nie potrafi dogadać się, kto zajmuje lepszy kąt w szatni. Drobiazg, który powoli robi się osobisty.','Two wrestlers cannot agree on who gets the better corner of the locker room. A small thing that slowly turns personal.'],
'sc.fl2.d':['Obie strony uważają, że to one powinny wychodzić na ring jako ostatnie. Publika zaczyna zauważać napięcie.','Both sides think they should walk out last. The crowd starts noticing the tension.'],
'sc.fl5.d':['Dwoje znajomych z szatni zakłada się, kto zdobędzie więcej braw. Walki są uczciwe, ale z błyskiem w oku.','Two locker-room friends bet on who earns more cheers. Clean matches, with a twinkle in the eye.'],
'sc.fl6.d':['Przypadkowy cios i brak przeprosin. Jedna ze stron uznała, że to było zrobione specjalnie.','An accidental shot and no apology. One side decided it was on purpose.'],
'sc.fl7.d':["Żart w backstage'u poszedł o krok za daleko. Teraz obie strony czekają na okazję do rewanżu.",'A backstage joke went a step too far. Now both sides wait for a chance to settle it.'],
'sc.fl8.d':['Dwoje zawodników rywalizuje o to, kto ma głośniejszy doping. Każde wykorzystuje okazję, by przyćmić drugie.','Two wrestlers compete over who gets the louder chants. Each uses every chance to outshine the other.'],
'sc.fl9.d':['Jedna ze stron zaczęła używać popisowego ciosu drugiej. Druga uznaje to za brak szacunku.',"One side started using the other's signature move. The other calls it disrespect."],
'sc.fl10.d':['Doświadczona osoba chce nauczyć młodszą pokory. Młodsza nie ma zamiaru słuchać.','A seasoned wrestler wants to teach a youngster humility. The youngster is not listening.'],
'sc.fl14.d':['Dwoje zawodników żartuje z siebie przed kamerami. Nic poważnego, ale publice się to podoba.','Two wrestlers tease each other in front of the cameras. Nothing serious, but the crowd likes it.'],
'sc.rookie':['Debiut kontra doświadczenie','Rookie vs veteran'],
'sc.defector':['Ucieczka ze stajni','Escape from the stable'],
'sc.handicap':['Samotna walka z wieloma','One against many'],
'sc.mentor':['Lekcja pokory','Lesson in humility'],
'sc.f3':['Nie dorastasz mi do pięt',"You can't touch me"],
'sc.f4':['Odebrano mi wszystko','Everything was taken from me'],
'sc.f13':['Prawdziwe mistrzostwo','The real championship'],
'sc.f14':['Władza bez korony','Power without a crown'],
'sc.f15':['Seria bez porażki','Unbeaten streak'],
'sc.f17':['Pas w ogniu','The belt under fire'],
'sc.f26':['Ostatnia korona','The last crown'],
'sc.f33':['Nie będę twoją kontynuacją','I am not your successor'],
'sc.f35':['Niedoceniona gwiazda','The overlooked star'],
'sc.f44':['Zdrada wśród nas','Betrayal among us'],
'sc.f89':['Marionetka','Puppet'],
'sc.f102':['Upadek bohatera','Fall of a hero'],
'sc.f104':['Ostatnia osoba na nogach','Last one standing'],
'sc.f111':['Korona kontra korona','Crown vs crown'],
'sc.f112':['Ostatnia osoba w ringu','Last in the ring'],
'sc.f115':['Nieśmiertelność','Immortality'],
'sc.fl10':['Doświadczenie kontra świeża krew','Experience vs fresh blood'],
'sc.f33.d':['Młody wrestler odrzuca rolę następcy legendy i chce zbudować własną historię.',"A young wrestler refuses the role of a legend's heir and wants to build a personal story."],
'sc.f66.d':['Dwoje wrestlerów próbuje przekonać tego samego zawodnika, aby dołączył do ich drużyny.','Two wrestlers try to convince the same wrestler to join their team.'],
});

/* ============ Game state ============ */
let G=null,RUN=null,START_F='all',START_C='all',START_K='all',START_S='tier';
const W=id=>G.ws.find(w=>w.id===id);
const mine=()=>G.ws.filter(w=>w.fed===G.fed.id);
const healthy=()=>mine().filter(w=>!w.injury);
const stableOf=id=>G.stables.find(s=>s.members.indexOf(id)>=0)||null;
const names=ids=>ids.filter(Boolean).map(i=>W(i)?W(i).name:'?').join(' & ');
const tdNow=()=>TD[G.fed.tier-1];
const yearOf=w=>1+Math.floor((w-1)/52);
const inter=(a,b)=>a.filter(x=>b.indexOf(x)>=0);
function addNews(k,v){G.news.unshift({w:G.week,k,v:v||{}});G.news=G.news.slice(0,40);try{twHook(k,v)}catch(e){}}
const isF=id=>{const w=W(id);return !!w&&w.g==='f'};
function genderOK(tt,ids){const g=tt.g||'m';if(g==='x')return true;return ids.every(i=>isF(i)===(g==='f'))}
function titleName(tt){return tt.name||(G.fed.short+' '+t(tt.kind==='world'?'t.world':tt.kind==='second'?'t.second':tt.kind==='wworld'?'t.wworld':tt.kind==='wtag'?'t.wtag':'t.tag'))}
const titleOf=id=>G.titles.find(x=>x.id===id);
const isChamp=id=>G.titles.some(tt=>tt.holders.indexOf(id)>=0);

function defaultTitles(tier){const wp=Math.min(5,(tier||1)+1);return[
 {id:'w',g:'m',kind:'world',name:null,prestige:wp,teams:1,strap:'#8a1c1c',plate:'gold',holders:[],since:1},
 {id:'s',g:'m',kind:'second',name:null,prestige:Math.max(1,wp-1.5),teams:1,strap:'#1f3f8a',plate:'silver',holders:[],since:1},
 {id:'tg',g:'m',kind:'tag',name:null,prestige:Math.max(1,wp-1.5),teams:2,strap:'#1d6b4f',plate:'silver',holders:[],since:1}]}

/* ----- match structure ----- */
function emptyMatch(){return{mode:'1v1',a:Array(10).fill(''),b:Array(10).fill(''),winner:'a',fw:0,finish:'clean',stip:'none',title:''}}
function sides(m){const n=MODES[m.mode];return{A:m.a.slice(0,n.a).filter(Boolean),B:m.b.slice(0,n.b).filter(Boolean)}}
function matchReady(m){const n=MODES[m.mode];if(!n)return false;const A=m.a.slice(0,n.a),B=m.b.slice(0,n.b);const all=A.concat(B);return all.every(x=>x&&W(x))&&new Set(all).size===all.length}
function teamsOf(m){const{A,B}=sides(m);const n=MODES[m.mode];if(!n.ffa)return[A,B];const g=n.g||1,r=[];for(let i=0;i<A.length;i+=g)r.push(A.slice(i,i+g));return r}
function outcome(m){const{A,B}=sides(m);const n=MODES[m.mode];
 if(n.ffa){const g=n.g||1,ti=m.fw||0;let wi=A.slice(ti*g,ti*g+g);if(!wi.length)wi=A.slice(0,g);return{wi,li:A.filter(x=>wi.indexOf(x)<0)}}
 return m.winner==='a'?{wi:A,li:B}:{wi:B,li:A}}
function vsText(m){return MODES[m.mode].ffa?teamsOf(m).map(S=>names(S)).join(' vs '):names(sides(m).A)+' vs '+names(sides(m).B)}
function modeLabel(k){const n=MODES[k];if(D['mode.'+k])return t('mode.'+k);if(n.ffa)return n.g>1?t('mode.teamffa',{n:k}):t('mode.ffa',{n:n.a});return n.a===n.b?t('mode.same',{a:n.a}):t('mode.hand',{a:n.a,b:n.b})}
function usedIds(except){const u=new Set();G.card.forEach((m,i)=>{if(i===except)return;const s=sides(m);s.A.concat(s.B).forEach(x=>u.add(x))});return u}
function titleOk(tt,m){const n=MODES[m.mode];const s=sides(m);if(!genderOK(tt,s.A.concat(s.B))||s.A.concat(s.B).some(x=>W(x)&&W(x).ext))return false;return tt.teams===2?(m.mode==='2v2'||(n.ffa&&n.g===2)):(m.mode==='1v1'||(n.ffa&&(n.g||1)===1))}
function fixMatch(m){if(typeof lvlOf==='function'&&lvlOf(m.stip)>maxLvl())m.stip='none';const n=MODES[m.mode],s=STIPS[m.stip]||STIPS.none;
 if(s.noDQ&&(m.finish==='dq'||m.finish==='count'))m.finish='clean';
 if(n.ffa&&(m.finish==='dq'||m.finish==='count'||m.finish==='draw'))m.finish='clean';
 if(m.title){const tt=titleOf(m.title);if(!tt||!titleOk(tt,m))m.title=''}
 if(m.tour){const tr=(G.tours||[]).find(x=>x.id===m.tour.tid),mt=tr&&!tr.done&&tr.rounds[m.tour.r]&&tr.rounds[m.tour.r][m.tour.i];
  if(!mt||mt.w||!W(mt.a)||!W(mt.b)||W(mt.a).injury||W(mt.b).injury){m.tour=null;if(m.stip==='tourney')m.stip='none'}
  else{m.mode='1v1';m.a=Array(10).fill('');m.b=Array(10).fill('');m.a[0]=mt.a;m.b[0]=mt.b;m.stip='tourney';m.title='';m.prize='';m.cash=''}}
 if(m.stip==='tourney'&&!m.tour)m.stip='none';
 if(m.stip==='prizematch'){if(!(m.prize&&prizeOf(m.prize)))m.prize=((G.prizes||[])[0]||{}).id||'';if(!m.prize)m.stip='none'}else m.prize='';
 if(m.cash&&!cashOk(m,prizeOf(m.cash)))m.cash=''
 if(n.ffa&&m.fw>=n.a/(n.g||1))m.fw=0}

/* ----- stables ----- */
function removeFromStable(id,quiet){const st=stableOf(id);if(!st)return;st.members=st.members.filter(x=>x!==id);
 if(!quiet&&W(id))addNews('n.leftst',{w:W(id).name,s:st.name});
 if(st.members.length<2){G.stables=G.stables.filter(x=>x!==st);addNews('n.stdisband',{s:st.name})}}
function seedStables(){
 const tr=G.fed.tier,n=tr>=5?3:tr>=4?2:tr>=3?1:0;if(!n)return;
 const nm=['Iron Circle','Black Sun','Night Shift','Red Hand'];
 const pool=mine().filter(w=>!isChamp(w.id)).sort((a,b)=>b.pop-a.pop);
 for(let k=0;k<n;k++){const role=k%2===0?'heel':'face';let g=pool.filter(w=>w.role===role&&!stableOf(w.id)).slice(0,3);
  if(g.length<2)g=pool.filter(w=>!stableOf(w.id)).slice(0,3);if(g.length<2)break;
  G.stables.push({id:'s'+(G.uid++),name:nm[k],members:g.map(w=>w.id)})}
}
function purgeW(id){
 G.titles.forEach(tt=>{if(tt.holders.indexOf(id)>=0)tt.holders=[]});
 removeFromStable(id,true);
 G.feuds.forEach(f=>{f.A=f.A.filter(x=>x!==id);f.B=f.B.filter(x=>x!==id)});
 G.feuds=G.feuds.filter(f=>f.mw?f.A.length>=2:(f.A.length&&f.B.length));
 (G.prizes||[]).forEach(p=>{if(p.holder===id)p.holder=''});
 G.card=[];G.promos=[];
}
function cleanFeuds(){G.feuds=G.feuds.filter(f=>f.A.length&&(f.mw||f.B.length)&&(!f.stA||G.stables.some(s=>s.id===f.stA))&&(!f.stB||G.stables.some(s=>s.id===f.stB))&&(!f.stR||G.stables.some(s=>s.id===f.stR))&&(!f.fedId||G.rivals.some(r=>r.id===f.fedId))&&(!f.titleId||titleOf(f.titleId)))}

/* ----- feuds ----- */
function sideLabel(ids,stId){const st=stId?G.stables.find(s=>s.id===stId):null;return st?st.name:names(ids)}
const core=ids=>ids.slice().sort((a,b)=>(W(b)?W(b).pop:0)-(W(a)?W(a).pop:0)).slice(0,10);
function mwTeams(f){const g=f.g||1,r=[];for(let i=0;i<f.A.length;i+=g)r.push(f.A.slice(i,i+g));return r}
function fLabel(f){return f.mw?mwTeams(f).map(S=>names(S)).join(' vs '):sideLabel(f.A,f.stA)+' vs '+sideLabel(f.B,f.stB)}
function feudMode(f){if(f.mw){const g=f.g||1,n=f.A.length;if(n%g||n<2)return null;if(g===1)return MODES[n+'way']?n+'way':null;const k=Array(n/g).fill(g).join('v');return MODES[k]?k:null}
 const a=f.A.length,b=f.B.length;if(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa)return a+'v'+b;if(MODES[b+'v'+a]&&!MODES[b+'v'+a].ffa)return b+'v'+a;return null}
function feudHit(f,A,B){
 if(f.mw){const c=inter(f.A,A.concat(B)).length;return c>=2?c:0}
 const ia=inter(f.A,A),ib=inter(f.B,B),ja=inter(f.A,B),jb=inter(f.B,A);
 if(ia.length&&ib.length)return ia.length+ib.length;
 if(ja.length&&jb.length)return ja.length+jb.length;
 if(!B.length&&ia.length&&jb.length)return ia.length+jb.length;
 return 0}
function feudOf(m){const{A,B}=sides(m);let best=null;
 G.feuds.forEach(f=>{const h=feudHit(f,A,B);if(h){const cov=h/(f.A.length+f.B.length);if(!best||cov>best.cov||(cov===best.cov&&f.heat>best.f.heat))best={f,cov}}});return best}
const guestIds=()=>{const s=new Set();G.feuds.forEach(f=>{if(f.fedId)f.B.forEach(i=>s.add(i))});return s};
const isGuest=id=>guestIds().has(id);
const kd=sc=>KINDS[SC[sc].kind];
function topOf(fedId,n,fem){return G.ws.filter(w=>w.fed===fedId&&!w.injury&&(fem===undefined||isF(w.id)===fem)).sort((a,b)=>b.pop-a.pop).slice(0,n).map(w=>w.id)}
function bookable(){const g=guestIds();return healthy().concat(G.ws.filter(w=>(g.has(w.id)||(w.ext&&w.fed==='GST'))&&!w.injury))}
function fdDefaults(sc){
 const k=kd(sc),pool=mine().sort((a,b)=>b.pop-a.pop);const d={sc,A:[],B:[],stA:'',stB:'',mem:'',titleId:'',fedId:''};
 if(k.st===2){d.stA=(G.stables[0]||{}).id||'';d.stB=(G.stables[1]||{}).id||''}
 else if(k.st===1){const st=G.stables[0];d.stA=st?st.id:'';
  if(k.extra){const x=pool.find(w=>!stableOf(w.id));d.B=[x?x.id:'']}
  else if(k.member)d.mem=st?st.members[st.members.length-1]:'';
  else if(k.pair){d.A=[st?st.members[0]:''];d.B=[st?st.members[1]:'']}}
 else if(k.title){const tt=G.titles.find(x=>x.holders.length===x.teams);d.titleId=tt?tt.id:'';const ch=pool.filter(w=>!tt||(tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id])));for(let i=0;i<(tt?tt.teams:1);i++)d.A.push((ch[i]||{}).id||'')}
 else if(k.fed){const rv=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id)).sort((a,b)=>Math.abs(a.pop-G.fed.pop)-Math.abs(b.pop-G.fed.pop))[0];d.fedId=rv?rv.id:'';for(let i=0;i<SC[sc].n;i++)d.A.push((pool[i]||{}).id||'')}
 else{d.fmt=2;d.gen=mine().filter(w=>!isF(w.id)).length>=k.a+k.b?'m':'f';fdFill(d)}
 return d}
function genPool(d){return mine().filter(w=>(d.gen||'x')==='x'||((d.gen==='f')===isF(w.id)))}
function fdFill(d){const k=kd(d.sc),pool=genPool(d).sort((a,b)=>b.pop-a.pop);d.A=[];d.B=[];let j=0;
 if(d.fmt>2){for(let i=0;i<d.fmt*k.a;i++)d.A.push((pool[j++]||{}).id||'')}
 else{for(let i=0;i<k.a;i++)d.A.push((pool[j++]||{}).id||'');for(let i=0;i<k.b;i++)d.B.push((pool[j++]||{}).id||'')}}
const multiOK=sc=>{const k=kd(sc);return !!(k.a&&k.a===k.b)};
const maxFmt=sc=>{const g=kd(sc).a;return g===1?6:g===2?4:3};
function fdSides(d){
 const sp=SC[d.sc],k=kd(d.sc);let A=[],B=[],stA='',stB='',stR='',titleId='',fedId='',mw=0,mg=1;
 if(k.st===2){const a=G.stables.find(s=>s.id===d.stA),b=G.stables.find(s=>s.id===d.stB);if(!a||!b||a===b)return null;A=core(a.members);B=core(b.members);stA=a.id;stB=b.id}
 else if(k.st===1){const a=G.stables.find(s=>s.id===d.stA);if(!a)return null;
  if(k.extra){stA=a.id;A=core(a.members);B=[d.B[0]]}
  else if(k.member){stA=a.id;if(a.members.indexOf(d.mem)<0)return null;A=core(a.members.filter(x=>x!==d.mem));B=[d.mem]}
  else if(k.pair){stR=a.id;A=[d.A[0]];B=[d.B[0]];if(!A[0]||!B[0]||a.members.indexOf(A[0])<0||a.members.indexOf(B[0])<0)return{err:'f.invalid'}}}
 else if(k.title){const tt=titleOf(d.titleId);if(!tt||tt.holders.length!==tt.teams)return{err:'f.notitle'};titleId=tt.id;A=d.A.slice(0,tt.teams);B=tt.holders.slice()}
 else if(k.fed){const rv=G.rivals.find(r=>r.id===d.fedId);if(!rv)return{err:'f.invalid'};fedId=rv.id;A=d.A.slice(0,sp.n);B=topOf(rv.id,sp.n,isF(A[0]));if(B.length<sp.n)return{err:'f.invalid'}}
 else if(d.fmt>2&&multiOK(d.sc)){A=d.A.slice(0,d.fmt*k.a);B=[];mw=1;mg=k.a}
 else{A=d.A.slice(0,k.a);B=d.B.slice(0,k.b)}
 const all=A.concat(B);if(!all.every(x=>x&&W(x))||new Set(all).size!==all.length)return{err:'f.invalid'};
 return{A,B,stA,stB,stR,titleId,fedId,mw,g:mg}}
function applyEnd(f,aWon,li){
 const e=SC[f.sc].end;const st=G.stables.find(s=>s.id===f.stA);
 if(e==='join'&&st){const w=W(f.B[0]);if(w){if(aWon&&!stableOf(w.id)){st.members.push(w.id);w.morale=clamp(w.morale+4,0,100);addNews('n.joined',{w:w.name,s:st.name})}else{w.pop=clamp(w.pop+2,1,100);addNews('n.resisted',{w:w.name,s:st.name})}}}
 else if(e==='leave'&&st){const w=W(f.B[0]);if(w){if(!aWon)removeFromStable(w.id);else st.members.forEach(i=>{if(W(i))W(i).morale=clamp(W(i).morale+3,0,100)})}}
 else if(e==='war'){(aWon?f.B:f.A).forEach(i=>{if(W(i))W(i).morale=clamp(W(i).morale-4,0,100)})}
 else if(e==='fed'){const rv=G.rivals.find(r=>r.id===f.fedId);if(rv){if(aWon){rv.pop=clamp(rv.pop-3,3,99);G.fed.pop=clamp(G.fed.pop+2,2,100)}else{rv.pop=clamp(rv.pop+3,3,99);G.fed.pop=clamp(G.fed.pop-2,2,100)}addNews('n.fedwin',{f:(aWon?rv:G.fed).short||(aWon?rv:G.fed).name})}}
 else if(e==='retire'){li.slice().forEach(i=>{const w=W(i);if(w&&w.fed===G.fed.id){w.fed='RET';addNews('n.retire',{w:w.name});purgeW(i)}})}
 else if(e==='fire'){li.slice().forEach(i=>{const w=W(i);if(w&&w.fed===G.fed.id){w.fed='FA';addNews('n.fired',{w:w.name});purgeW(i)}})}
 else if(e==='heel'){const w=W(f.A[0]);if(w&&w.role==='face'){w.role='heel';addNews('n.turn',{w:w.name,r:t('role.heel').split(' ')[0]})}}
}

/* ----- per-federation state setup (new game and job change) ----- */
function fedSetup(custom){
 if(!custom){const cap=ROSTERMAX[G.fed.tier-1]-2,mc=Math.ceil(cap*.72);const m=mine().filter(w=>w.g!=='f').sort((a,b)=>champPri(b)-champPri(a)||b.pop-a.pop),f=mine().filter(w=>w.g==='f').sort((a,b)=>champPri(b)-champPri(a)||b.pop-a.pop);const fk=Math.min(f.length,Math.max(cap-Math.min(m.length,mc),0));m.slice(mc).concat(f.slice(fk)).forEach(w=>{w.fed='FA';w.acc=0})}
 const top=mine().filter(w=>w.g!=='f').sort((a,b)=>b.pop-a.pop);
 {const wom=mine().filter(w=>w.g==='f').sort((a,b)=>b.pop-a.pop);if(wom.length>=2)G.titles.push({id:'ww',g:'f',kind:'wworld',name:null,prestige:wom[0].pop>45?Math.min(5,G.fed.tier+1):Math.max(1,G.fed.tier),teams:1,strap:'#c4358a',plate:'gold',holders:[wom[0].id],since:1});if(wom.length>=4)G.titles.push({id:'wt',g:'f',kind:'wtag',name:null,prestige:Math.max(1,G.fed.tier-.5),teams:2,strap:'#6a3aa8',plate:'silver',holders:[wom[2].id,wom[3].id],since:1})}
 if(top[0])G.titles[0].holders=[top[0].id];if(top[1])G.titles[1].holders=[top[1].id];
 if(top.length>=4)G.titles[2].holders=[top[2].id,top[3].id];
 if(!custom&&typeof bigTitleSeed==='function')bigTitleSeed();
 if(!custom)champSeed();
 {const st=(!custom&&PACK.stables||[]).filter(s=>s.fed===G.fed.id);st.forEach(s=>{const ms=s.members.filter(id=>{const w=W(id);return w&&w.fed===G.fed.id&&!stableOf(id)});if(ms.length>=2)G.stables.push({id:'s'+(G.uid++),name:s.name,members:ms})});if(!G.stables.length)seedStables()}
}

/* ----- new game ----- */
function newGame(fedId,custom){
 const ws=JSON.parse(JSON.stringify(PACK.wrestlers));let fed,rivals;const fedC={};PACK.feds.forEach(f=>fedC[f.id]=f.country);
 if(custom){
  const nm=(custom.name||'My Promotion').slice(0,40),cc=custom.country||'PL';fedC.mine=cc;
  fed={id:'mine',name:nm,short:(nm.replace(/[^A-Za-z0-9 ]/g,'').split(' ').filter(Boolean).map(x=>x[0]).join('').slice(0,4)||'MYP').toUpperCase(),country:cc,tier:1,pop:6,cash:12000,color:'#f2b632'};
  rivals=PACK.feds.map(f=>Object.assign({},f));
  for(let i=0;i<4;i++){const N=NAMES[cc]||NAMES.US;const nmw=N.f[Math.floor(rnd()*N.f.length)]+' '+N.l[Math.floor(rnd()*N.l.length)];const style=STYLES[Math.floor(rnd()*7)];
   const w={id:'c'+i,name:nmw,country:cc,style,role:i%2?'heel':'face',ring:clamp(Math.round(34+SBIAS[style].ring+(rnd()-.5)*12),20,60),mic:30+Math.floor(rnd()*20),cha:32+Math.floor(rnd()*20),pop:6+Math.floor(rnd()*8),age:22+Math.floor(rnd()*12),fed:'mine',contract:52,injury:0,look:randLook(Math.random,cc)};
   w.salary=salaryOf(w,1);ws.push(w)}
  for(let i=0;i<2;i++){const N=NAMES[cc]||NAMES.US,FN=NAMESF[cc]||NAMESF.US;const nmw=FN[Math.floor(rnd()*FN.length)]+' '+N.l[Math.floor(rnd()*N.l.length)];const style=STYLES[Math.floor(rnd()*7)];
   const w={id:'c'+(4+i),g:'f',name:nmw,country:cc,style,role:i%2?'heel':'face',ring:clamp(Math.round(34+SBIAS[style].ring+(rnd()-.5)*12),20,60),mic:30+Math.floor(rnd()*20),cha:32+Math.floor(rnd()*20),pop:6+Math.floor(rnd()*8),age:22+Math.floor(rnd()*12),fed:'mine',contract:52,injury:0,look:randLook(Math.random,cc,1)};
   w.salary=salaryOf(w,1);ws.push(w)}
 }else{
  const spec=PACK.feds.find(f=>f.id===fedId);fed=Object.assign({},spec);rivals=PACK.feds.filter(f=>f.id!==fedId).map(f=>Object.assign({},f));
 }
 ws.forEach(w=>{genStats(w,Math.random);if(w.acc===undefined)w.acc=w.fed==='FA'?0:clamp(accStart(w.country,fedC[w.fed]||w.country)+Math.floor(rnd()*rnd()*130),0,100)});
 G={v:2,screen:'dash',week:1,fed,rivals,ws,price:100,card:[],promos:[],feuds:[],titles:defaultTitles(fed.tier),reigns:[],hist:[],news:[],streak:0,debt:0,lastRating:null,popHist:[fed.pop],sponsor:null,summary:null,uid:1,sort:'pop',stables:[],pairs:{},fd:null,td:null};
 fedSetup(custom);
 G.fd=fdDefaults('betrayal');initExtras();
 save();
}
function save(){if(!G)return;try{localStorage.setItem(LS_SAVE,JSON.stringify(G))}catch(e){}}
function loadSave(){try{const s=localStorage.getItem(LS_SAVE);if(s){const g=JSON.parse(s);if(g&&g.v===2&&g.ws&&g.fed){g.promos=g.promos||[];return g}}}catch(e){}return null}

/* ----- auto booking ----- */
function flog(f,o){f.log=f.log||[];f.log.push(Object.assign({wk:G.week},o));if(f.log.length>80)f.log.shift()}
function feudFoes(id){const s=[];G.feuds.forEach(f=>{const a=f.A.indexOf(id)>=0,b=f.B.indexOf(id)>=0;if(!a&&!b)return;(f.mw?f.A.filter(x=>x!==id):a?f.B:f.A).forEach(x=>{if(s.indexOf(x)<0&&W(x))s.push(x)})});return s}
function feudTag(id){const s=feudFoes(id);if(!s.length)return '';const n=s.slice(0,2).map(x=>W(x).name);return ' ('+t('sh.feudwith',{n:n.join(', ')+(s.length>2?' +'+(s.length-2):'')})+')'}
function buildFeudMatch(f){
 const mode=feudMode(f);if(!mode)return null;const gst=guestIds(),used=usedIds(-1);const ids=f.A.concat(f.B);
 if(!ids.every(id=>{const w=W(id);return w&&!w.injury&&(w.fed===G.fed.id||gst.has(id))&&!used.has(id)}))return null;
 const a=f.A.length,b=f.B.length;const flip=!f.mw&&!(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa);
 const A=flip?f.B:f.A,B=flip?f.A:f.B;const m=emptyMatch();m.mode=mode;A.forEach((x,i)=>m.a[i]=x);B.forEach((x,i)=>m.b[i]=x);
 const sa=avg(A.map(x=>W(x).pop))+(rnd()-.5)*30,sb=avg(B.map(x=>W(x).pop))+(rnd()-.5)*30;m.winner=sa>=sb?'a':'b';
 const nn=MODES[mode];if(nn.ffa)m.fw=Math.floor(rnd()*nn.a/(nn.g||1));
 if(f.fav&&G.fed.tier>=STIPS[f.fav].tier)m.stip=f.fav;
 fixMatch(m);return m}
function promoReady(p){const a=W(p.a);if(!p.a||!a||a.injury)return false;if(p.b){const b=W(p.b);if(!b||b.injury||p.b===p.a)return false}return true}
function autoBook(){
 const hl=healthy().sort((a,b)=>b.pop-a.pop);const used=new Set();const card=[];
 const maxM=Math.min(5,Math.floor(hl.length/2));
 const gst=guestIds();const free=id=>{const w=W(id);return w&&!w.injury&&(w.fed===G.fed.id||gst.has(id))&&!used.has(id)};
 const roleOpp=(a,b)=>(W(a).role==='face'&&W(b).role==='heel')||(W(a).role==='heel'&&W(b).role==='face')?1:0;
 const mk=(mode,A,B,o)=>{const m=emptyMatch();m.mode=mode;A.forEach((x,i)=>m.a[i]=x);B.forEach((x,i)=>m.b[i]=x);A.concat(B).forEach(x=>used.add(x));
  const sa=avg(A.map(x=>W(x).pop))+(rnd()-.5)*30,sb=avg(B.map(x=>W(x).pop))+(rnd()-.5)*30;m.winner=sa>=sb?'a':'b';
  const nn=MODES[mode];if(nn.ffa)m.fw=Math.floor(rnd()*nn.a/(nn.g||1));Object.assign(m,o||{});fixMatch(m);return m};
 G.feuds.slice().sort((x,y)=>y.heat-x.heat).forEach(f=>{
  if(card.length>=maxM)return;const mode=feudMode(f);if(!mode)return;if(!f.A.concat(f.B).every(free))return;
  const a=f.A.length,b=f.B.length;const flip=!f.mw&&!(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa);const so=f.fav&&G.fed.tier>=STIPS[f.fav].tier?{stip:f.fav}:{};
  card.push(flip?mk(mode,f.B,f.A,so):mk(mode,f.A,f.B,so))});
 G.titles.forEach(tt=>{
  if(card.length>=maxM)return;const c=hl.filter(w=>free(w.id)&&tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id]));
  if(tt.teams===1){
   if(tt.holders.length===1&&free(tt.holders[0])){const h=tt.holders[0];const ch=c.slice().sort((x,y)=>(roleOpp(h,y.id)*8-Math.abs(y.pop-W(h).pop)/4)-(roleOpp(h,x.id)*8-Math.abs(x.pop-W(h).pop)/4))[0];if(ch)card.push(mk('1v1',[h],[ch.id],{title:tt.id,winner:'a'}))}
   else if(!tt.holders.length&&c.length>=2)card.push(mk('1v1',[c[0].id],[c[1].id],{title:tt.id}));
  }else{
   if(tt.holders.length===2&&tt.holders.every(free)&&c.length>=2)card.push(mk('2v2',tt.holders,[c[0].id,c[1].id],{title:tt.id,winner:'a'}));
   else if(!tt.holders.length&&c.length>=4)card.push(mk('2v2',[c[0].id,c[2].id],[c[1].id,c[3].id],{title:tt.id}));
  }});
 while(card.length<maxM){const c0=hl.filter(w=>free(w.id));const cm=c0.filter(w=>!isF(w.id)),cf=c0.filter(w=>isF(w.id));const hasF=card.some(m=>sides(m).A.some(isF));
  const c=(cf.length>=2&&(!hasF||cm.length<2))?cf:(cm.length>=2?cm:cf);if(c.length<2)break;
  if(c.length>=4&&rnd()<.3){card.push(mk('2v2',[c[0].id,c[2].id],[c[1].id,c[3].id]));continue}
  const a=c[0];let best=null,bs=-99;c.slice(1,7).forEach(b=>{const s=chem(a.style,b.style).v-Math.abs(a.pop-b.pop)/6+roleOpp(a.id,b.id)*3;if(s>bs){bs=s;best=b}});
  card.push(mk('1v1',[a.id],[best.id]))}
 const wt=m=>{const s=sides(m);return s.A.concat(s.B).reduce((x,i)=>x+W(i).pop,0)/Math.max(1,s.A.length+s.B.length)+(m.title?18*(titleOf(m.title)?prestOf(titleOf(m.title)):1):0)};
 card.sort((x,y)=>wt(x)-wt(y));G.card=card;
 G.promos=[];
 const pf=G.feuds.filter(f=>!f.titleId||1).sort((x,y)=>y.heat-x.heat).find(f=>{const ids=f.mw?f.A:[f.A[0],f.B[0]];return ids.length>=2&&ids[0]&&ids[1]&&W(ids[0])&&W(ids[1])&&!W(ids[0]).injury&&!W(ids[1]).injury&&(isGuest(ids[0])||W(ids[0]).fed===G.fed.id)&&(isGuest(ids[1])||W(ids[1]).fed===G.fed.id)});
 if(pf){const ids=pf.mw?pf.A:[pf.A[0],pf.B[0]];G.promos.push({id:'p'+(G.uid++),a:ids[0],b:ids[1],at:Math.max(0,card.length-1)})}
 tourSlots();
 guestsHired().filter(g=>!g.injury&&!G.promos.some(x=>x.a===g.id||x.b===g.id)).slice(0,2).forEach(g=>{if(G.promos.length<4)G.promos.push({id:'p'+(G.uid++),a:g.id,b:'',at:Math.max(0,card.length-1)})});
}

/* ============ Match simulation ============ */
function accF(w){return .86+.14*(w.acc||0)/100}
function foreign(w){return w.country!==G.fed.country}
function perf(w){
 const base=w.ring*.5+w[KEY[w.style]]*.22+w.psy*.15+w.sta*.13;
 return base*accF(w)*(1-Math.max(0,w.fatigue-60)/200)*(.94+.06*w.morale/100);
}
const chaEff=w=>w.cha*(foreign(w)?.8+.2*(w.acc||0)/100:1);
const micEff=w=>w.mic*(foreign(w)?.8+.2*(w.acc||0)/100:1);
function matchChem(A,B,ffa){
 const vs=[];
 if(ffa){for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++)vs.push(chem(W(A[i]).style,W(A[j]).style).v)}
 else A.forEach(a=>B.forEach(b=>vs.push(chem(W(a).style,W(b).style).v)));
 return avg(vs)+(ffa?0:relBonus(A,B));
}
function teamBonus(S){
 if(S.length<2)return 0;const v=[];
 for(let i=0;i<S.length;i++)for(let j=i+1;j<S.length;j++){const pc=G.pairs[pairKey(S[i],S[j])]||0;const s1=stableOf(S[i]);v.push(Math.min(4,pc*.4)+(s1&&s1===stableOf(S[j])?2:0))}
 return avg(v);
}
function roleVal(id){const r=W(id).role;return r==='face'?1:r==='heel'?-1:0}
function roleBonus(m){const{A,B}=sides(m);if(MODES[m.mode].ffa)return 0;const a=avg(A.map(roleVal)),b=avg(B.map(roleVal));
 if(a*b<0)return 2.5;if(a===b&&a!==0)return -1.5;return .5}
function alignKey(m){const v=roleBonus(m);return v>=2?'sh.align.classic':v<0?'sh.align.same':'sh.align.mixed'}
function stipBonus(m){const s=STIPS[m.stip]||STIPS.none;const{A,B}=sides(m);return avg(A.concat(B).map(i=>s.aff[W(i).style]||0))}
function baseStars(m,pos,total){
 const{A,B}=sides(m);const ws=A.concat(B).map(W),ffa=!!MODES[m.mode].ffa;const fo=feudOf(m);const tt=m.title?titleOf(m.title):null;
 const score=avg(ws.map(perf))*.6+avg(ws.map(chaEff))*.2+avg(ws.map(w=>w.pop))*.1+matchChem(A,B,ffa)+teamsOf(m).reduce((s,S)=>s+teamBonus(S),0)+roleBonus(m)+stipBonus(m)
  +(tt?1+prestOf(tt)*.6:0)+(m.stip==='prizematch'?3:0)+(m.cash?4:0)+(m.tour?2:0)+sfx().ref*20+avg(ws.map(w=>w.ext?w.fame*.1:0))+(fo?Math.min(8,fo.f.heat/12)*(.5+.5*fo.cov):0)+(pos===total-1?2:0)+(rnd()-.5)*12;
 return clamp(score/20,.5,5);
}
function helperStable(m){
 const{A,B}=sides(m);const inM=new Set(A.concat(B));const c=[];
 [A,B].forEach(S=>{const seen=new Set();S.forEach(id=>{const st=stableOf(id);if(st&&!seen.has(st.id)){seen.add(st.id);const rest=st.members.filter(x=>!inM.has(x)&&W(x)&&!W(x).injury);if(rest.length)c.push({st,side:S})}})});
 return c.length?pickR(c):null;
}
function pickEvent(m,fo,hp){
 const f=fo?fo.f:null;if(rnd()>(f?.82:.66))return null;
 const c=[];const boost=f?SC[f.sc].ev:null;
 if(hp)c.push({id:'interf',w:1+(f?1:0)+(boost==='interf'?2:0)+(f&&kd(f.sc).st?2:0)});
 const{A,B}=sides(m);
 if(f&&A.concat(B).some(i=>W(i).role==='face'))c.push({id:'turn',w:2+(boost==='turn'?3:0)});
 c.push({id:'crowd',w:2+(boost==='crowd'?2:0)});
 const rf=1-clamp((sfx().refL-SBASE)/70,0,1)*.6;c.push({id:'botch',w:1.2*rf},{id:'refbump',w:1*rf},{id:'mic',w:.8},{id:'fanrun',w:.8});
 if(A.concat(B).length)c.push({id:'chant',w:1.5});
 if(maxLvl()>=2)c.push({id:'weapon',w:1.2+(f?1:0)});
 if(f)c.push({id:'after',w:2+(boost==='after'?3:0)});
 {const inM=new Set(A.concat(B)),rvc=[],alc=[];A.concat(B).forEach(id=>{const w=W(id);if(!w)return;rvOf(w).forEach(r=>{if(!inM.has(r)&&!W(r).injury)rvc.push(W(r).name)});alOf(w).forEach(r=>{if(!inM.has(r)&&!W(r).injury)alc.push(W(r).name)})});
  if(rvc.length)c.push({id:'rvheckle',w:1.3,nm:pickR(rvc)});if(alc.length)c.push({id:'allycorner',w:1.3,nm:pickR(alc)});c.push({id:'lights',w:.5},{id:'banner',w:.7},{id:'ropesnap',w:.5},{id:'wrongspot',w:.6},{id:'pyro',w:.4});if(maxLvl()>=1)c.push({id:'bloodied',w:.7});if(A.concat(B).some(i=>W(i).age<=25&&W(i).pop<40))c.push({id:'rookie',w:.8})}
 let tot=0;c.forEach(x=>tot+=x.w);let x=rnd()*tot;for(const e of c){x-=e.w;if(x<=0){RUN.relx=e.nm||'';return e.id}}return c[0].id;
}
function applyFx(m,res,opt,winIds,loseIds){
 res.stars+=opt.stars||0;res.heatFx+=opt.heat||0;
 if(opt.fin){m.finish=opt.fin;res.finish=opt.fin}
 if(opt.inj&&rnd()<opt.inj){const w=W(pickR(winIds.concat(loseIds)));if(!w.injury&&rnd()<injRisk(w))injure(w,2+Math.floor(rnd()*6))}
 if(opt.turn){const w=W(winIds[0]);w.role=w.role==='face'?'heel':w.role==='heel'?'face':'heel';addNews('n.turn',{w:w.name,r:t('role.'+w.role).split(' ')[0]})}
}
function finalizeMatch(m,res,pos,total,fo){
 const{A,B}=sides(m);const{wi,li}=outcome(m);const stp=STIPS[m.stip]||STIPS.none;const ffa=!!MODES[m.mode].ffa;
 const f=fo?fo.f:null,cov=fo?fo.cov:0;const blow=!!f&&f.heat>=70&&cov>=.99;
 if(blow)res.stars+=.4;
 try{res.stars+=angleMatch(m,A,B,wi,li)+feudStake(m)+titleBonus(m,A,B)+trBonus(m,A,B)}catch(e){}
 if(f&&f.sc==='title'&&m.title)res.stars+=.3;
 const favHit=!!(f&&f.fav&&m.stip===f.fav);if(favHit)res.stars+=.25;
 res.stars=Math.round(clamp(res.stars,.5,5)*4)/4;
 let fin=res.finish||m.finish;if(stp.noDQ&&(fin==='dq'||fin==='count'))fin='clean';res.finish=fin;
 const parts=A.concat(B);
 try{careerNote(wi,li,parts,res,fin)}catch(e){}
 const under=avg(li.map(i=>W(i).pop))>avg(wi.map(i=>W(i).pop))+10;
 wi.forEach(i=>{const w=W(i);w.pop=clamp(w.pop+((under?1.5:.6)+(res.stars>=4?.3:0))*popDim(w.pop),1,100);w.morale=clamp(w.morale+(fin==='draw'?1:2.5),0,100)});
 li.forEach(i=>{const w=W(i);w.pop=clamp(w.pop-.2+(res.stars>=4?.3:0),1,100);w.morale=clamp(w.morale-.5,0,100)});
 parts.forEach(i=>{const w=W(i);w.fatigue=clamp(w.fatigue+(parts.length>2?11:14)+(m.stip!=='none'?4:0),0,100);w.wrestled=true;if(pos===total-1)w.morale=clamp(w.morale+1.5,0,100)});
 teamsOf(m).forEach(S=>{for(let i=0;i<S.length;i++)for(let j=i+1;j<S.length;j++){const k=pairKey(S[i],S[j]);G.pairs[k]=(G.pairs[k]||0)+1}});
 if(m.stip==='prizematch'&&m.prize){const pz=prizeOf(m.prize);if(pz)awardPrize(pz,wi)}
 if(m.tour)tourAdvance(m,wi);
 if(m.title){const tt=titleOf(m.title);if(tt){const hid=tt.holders;const held=hid.length>0&&hid.every(x=>wi.indexOf(x)>=0);const changes=(fin==='clean'||fin==='dirty')&&!held;
  if(changes){try{titleRecord(tt,wi,fin)}catch(e){}tt.holders=wi.slice(0,tt.teams);tt.since=G.week;tt.def=0;tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)+(avg(wi.map(i=>W(i).pop))>45+tt.prestige*4?.12:-.02),1,5);G.reigns.unshift({name:titleName(tt),w:tt.holders.slice(),week:G.week});addNews('n.champ',{w:names(wi),t:titleName(tt)});wi.forEach(i=>{W(i).pop=clamp(W(i).pop+.36*prestOf(tt),1,100);W(i).morale=clamp(W(i).morale+3,0,100)})}
  else if(held){tt.def=(tt.def||0)+1;try{titleDef(tt)}catch(e){}addNews('n.defend',{w:names(wi),t:titleName(tt)})}
  tt.pdyn=clamp((tt.pdyn==null?tt.prestige:tt.pdyn)+((res.stars||3)-3)*.05,1,5)}}
 if(m.cash)cashIn(m,wi,fin);
 if(f){
  flog(f,{k:'m',vs:vsText(m),w:names(wi),s:res.stars,fin:fin,stip:m.stip,title:m.title?titleName(titleOf(m.title)||{}):'',blow:blow?1:0});
  const mic=avg(parts.map(i=>micEff(W(i))));
  const gain=(res.stars*5+res.heatFx)*heatMul(f.sc)*(.4+.6*cov)*(favHit?1.25:1)*(m.stip!=='none'?1.2:1)*(SC[f.sc].stip&&m.stip===SC[f.sc].stip?1.2:1)+(mic-50)/25+(fin==='draw'?3:0);
  f.heat=clamp(f.heat+gain,0,100);f.used=true;f.matches++;if(favHit)f.fav='';
  if(blow){const aWon=wi.some(i=>f.A.indexOf(i)>=0);const bonus=SC[f.sc].pop||0;
   const young=f.A.concat(f.B).map(W).filter(Boolean).sort((x,y)=>x.age-y.age)[0];
   const hb=SC[f.sc].h/10;wi.forEach(i=>{W(i).pop=clamp(W(i).pop+(2+2*hb)*popDim(W(i).pop),1,100)});li.forEach(i=>{W(i).pop=clamp(W(i).pop+1,1,100)});
   if(bonus&&young)young.pop=clamp(young.pop+bonus,1,100);
   if(f.mw)addNews('n.feudend.mw',{a:fLabel(f),w:names(wi)});else addNews('n.feudend',{a:sideLabel(f.A,f.stA),b:sideLabel(f.B,f.stB),w:names(wi)});
   applyEnd(f,aWon,li);G.feuds=G.feuds.filter(x=>x!==f);cleanFeuds()}
 }
 parts.forEach(i=>{const w=W(i);if(!w.injury&&rnd()<.02*stp.inj*injRisk(w)*(1+Math.max(0,w.fatigue-60)/50))injure(w,1+Math.floor(rnd()*4))});
 res.blow=blow;return res;
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function ask(evId,m,x){
 return new Promise(res=>{
  const opts=EV[evId];let h='<h2>'+t('ev.'+evId+'.t')+'</h2><p class="mute">'+esc(t('ev.'+evId+'.b',x))+'</p>';
  opts.forEach((o,i)=>{h+='<button class="opt" data-act="evopt" data-i="'+i+'"><b>'+t('ev.'+evId+'.'+(i+1))+'</b><small>'+t('ev.'+evId+'.'+(i+1)+'d')+'</small></button>'});
  openModal(h);window.__evResolve=i=>{closeModal();res(opts[i])};
 });
}
function lineFor(kind,a,b,w,l){return t('ln.'+kind+pickR([1,2,3]),{a,b,w,l})}
function starsHtml(v){return '<span class="stars" style="--v:'+(v/5*100)+'%" aria-label="'+f2(v)+' / 5">★★★★★</span>'}
async function runShow(){
 if(!RUN||RUN.started)return;const ready=G.card.filter(matchReady);if(ready.length<2){RUN=null;return}
 relEnsure();RUN.started=true;RUN.bonus=0;RUN.nev=0;G.card=ready;const total=ready.length;const out=[];
 const live=document.getElementById('live');if(!live){RUN=null;return}
 const log=(cls,html)=>{const d=document.createElement('div');d.className=cls;d.innerHTML=html;live.appendChild(d);if(d.scrollIntoView)d.scrollIntoView({block:'nearest'})};
 const dl=ms=>RUN&&RUN.fast?Promise.resolve():sleep(ms);
 const prs=(G.promos||[]).filter(promoReady);
 const doPromos=async(at)=>{for(const p of prs.filter(p=>Math.min(p.at,total)===at)){const o=runPromo(p,log);out.push(o);await dl(700)}};
 for(let i=0;i<total;i++){
  await doPromos(i);
  if(i>0&&i<total&&RUN.nev<2&&rnd()<.22){RUN.nev++;RUN.bonus+=await showEvent(RUN.fast)}
  const m=ready[i];const{A,B}=sides(m);let oc=outcome(m);const ffa=!!MODES[m.mode].ffa;
  const an=ffa?names(teamsOf(m)[0]):names(A),bn=ffa?names(A.slice(teamsOf(m)[0].length)):names(B);
  const fo=feudOf(m);const wasBlow=!!fo&&fo.f.heat>=70&&fo.cov>=.99;
  let surprise=false;if(m.cash&&m.title){const tt0=titleOf(m.title);if(tt0&&ready.slice(0,i).some(x=>{const s0=sides(x);return tt0.holders.some(c=>s0.A.concat(s0.B).indexOf(c)>=0)})){surprise=true;tt0.holders.forEach(c=>{if(W(c))W(c).fatigue=clamp(W(c).fatigue+25,0,100)})}}
  const res={stars:baseStars(m,i,total)+(surprise?.3:0),heatFx:0,finish:m.finish};
  const tt=m.title?titleOf(m.title):null;
  log('hd',esc(vsText(m))+(i===total-1?' · '+t('sh.main'):'')+(m.stip!=='none'?' · '+t('stip.'+m.stip):'')+(tt?' · '+esc(titleName(tt)):'')+(m.cash&&prizeOf(m.cash)?' · '+esc(t('pz.cashhd',{p:prizeName(prizeOf(m.cash))})):'')+(m.stip==='prizematch'&&prizeOf(m.prize)?' · '+esc(t('pz.prizehd',{p:prizeName(prizeOf(m.prize))})):'')+(m.tour?' · '+esc(t('tr.tag',{t:((G.tours||[]).find(x=>x.id===m.tour.tid)||{}).name||'',r:''})):''));
  if(surprise)log('ln gold',esc(t('pz.surprise',{w:names(sides(m).A.concat(sides(m).B).filter(x=>prizeOf(m.cash)&&x===prizeOf(m.cash).holder))})));
  await dl(450);log('ln',esc(lineFor('open',an,bn)));await dl(700);
  log('ln',esc(lineFor('mid',an,bn)));await dl(700);
  const hp=helperStable(m);const ev=pickEvent(m,fo,hp);
  if(ev){
   const x={w:names(oc.wi),l:names(oc.li),s:''};if(ev==='interf'&&hp){x.s=hp.st.name;x.w=names(hp.side)}if(ev==='rvheckle'||ev==='allycorner')x.s=RUN.relx||'?';
   const o=RUN.fast?EV[ev][0]:await ask(ev,m,x);applyFx(m,res,o,oc.wi,oc.li);
   if(ev==='interf'&&hp)hp.st.members.forEach(id=>{if(W(id))W(id).morale=clamp(W(id).morale+1.5,0,100)});
  }
  log('ln',esc(lineFor('clx',an,bn)));await dl(700);
  {const fl=rvInterfere(m,oc,res,log);if(fl!==null){await dl(700);if(fl)oc=outcome(m)}}
  finalizeMatch(m,res,i,total,fo);relAfterMatch(m,oc.wi,oc.li);
  const wn=names(oc.wi),ln=names(oc.li);
  log('ln',esc(t('ln.f.'+(res.finish==='clean'?'clean':res.finish==='dirty'?'dirty':res.finish==='dq'?'dq':res.finish==='count'?'count':'draw'),{w:wn,l:ln})));
  log('',starsHtml(res.stars)+' <b>'+f2(res.stars)+'</b>');
  out.push({a:ffa?names(A.map(x=>x)):an,b:ffa?'':bn,ffa,stars:res.stars,winner:wn,title:tt?titleName(tt):'',stip:m.stip,finish:res.finish,feud:!!fo,blow:wasBlow,pos:i});
  await dl(500);
 }
 await doPromos(total);
 finishShow(out);RUN=null;
}

function popDim(p){return Math.max(.12,1-Math.pow(p/100,2.2)*1.05)}
/* ============ Economy and week ============ */
function demandAt(pm,noise){
 const homeN=healthy().filter(w=>w.country===G.fed.country).length;
 return .2+G.fed.pop/100*.8+((G.lastRating===null?2.5:G.lastRating)-2.5)*.07-(pm/100-1)*.5+Math.min(.06,homeN*.008)+(noise?(rnd()-.5)*.08:0);
}
function econAt(pm,noise){
 const T=tdNow(),d=demandAt(pm,noise);const att=Math.round(T.cap*clamp(d,.05,1));
 const hl=healthy();const avgPop=hl.length?avg(hl.map(w=>w.pop)):20;
 return{att,sold:d>=1,gate:att*T.price*pm/100,merch:att*T.price*.2*(avgPop/60)};
}
function finishShow(out){
 const ms=out.filter(o=>!o.promo),total=ms.length;let sw=0,ss=0;ms.forEach((o,i)=>{const w=1+(i>=total-2?.5:0)+(i===total-1?.5:0);sw+=w;ss+=w*o.stars});out.filter(o=>o.promo).forEach(o=>{sw+=.4;ss+=.4*o.stars});
 const sf=sfx(),gf=guestFx(),fwN=mine().filter(w=>w.farewell&&w.wrestled).length;
 const rating=Math.round(clamp(ss/sw+((RUN&&RUN.bonus)||0)+sf.comm+sf.ann*.08+gf.rt+Math.min(.15,fwN*.05),.5,5)*100)/100;const T=tdNow();const gm=1+sf.ann*.1+gf.mul+Math.min(3,fwN)*.05;
 const big=isBig(),bt=bigType(),thin=ms.length<4;
 const e=econAt(G.price,true);const att=e.att,sold=e.sold,gate=e.gate*(big?1.25:1)*gm*(G.arena?1.12:1)*diffRev(),merch=e.merch*(big?1.3:1)*gm*(G.arena?1.1:1)*merchMul()*diffRev(),tv=mediaRev()+tvRecord(rating),spons=G.sponsor?Math.round(G.sponsor.amt*sponsMul()):0;
 let ppv=0,ple=0,buys=0;if(big){const est=bigEst(bt,rating);if(bt==='ppv'){ppv=Math.round(est.rev*(thin?.6:1));buys=Math.round(est.buys*(thin?.6:1))}else ple=est.rev}
 const rev=gate+merch+tv+spons+ppv+ple;
 const sal=mine().reduce((s,w)=>s+w.salary,0)+staffPay();
 const stipCost=G.card.reduce((s,m)=>s+T.prod*(STIPS[m.stip]||STIPS.none).cost,0);
 const prod=(T.prod*1.4+stipCost)*(big?2.2:1)+mediaCost(),cost=sal+prod;
 G.fed.cash+=rev-cost;
 const exp=1.8+G.fed.pop/45+Math.max(0,G.fed.pop-70)/100*1.2+(big?.3:0);let dp=clamp((rating-exp)*(G.fed.pop<25?1.5:.9)-.1+(sold?.3:0),-3,4);
 if(big&&bt==='ple'){if(dp>0)dp*=1.25;if(rating>=3)dp+=.3}
 if(big&&thin)dp-=.5;if(media().p==='yt'&&dp>0)dp*=1.1;
 if(G.price>125)dp-=(G.price-125)/100*.8;else if(G.price<90)dp+=(90-G.price)/100*.5;
 if(dp>0)dp*=Math.max(.25,1.15-G.fed.pop/100*.9);dp+=gf.pp;const before=G.fed.pop;G.fed.pop=clamp(G.fed.pop+dp,2,100);
 G.streak=rating>=3.5?G.streak+1:0;G.lastRating=rating;
 G.hist.push({week:G.week,rating,att,cap:T.cap,gate,merch,tv,spons,ppv,ple,rev,sal,prod,cost});if(G.hist.length>40)G.hist.shift();
 G.summary={rating,att,cap:T.cap,sold,rev,cost,profit:rev-cost,dpop:G.fed.pop-before,out,gate,merch,tv,spons,ppv,ple,big,bt,buys,thin,plat:media().p,sal,prod,guests:gf.names,fwn:fwN,sfx:{ref:sf.ref,comm:sf.comm,ann:sf.ann}};
 addNews('n.show',{r:f2(rating),a:num(att)});
 G.showResult=true;G.bigType=null;endWeek();
}
function skipWeek(){
 const T=tdNow();const sal=mine().reduce((s,w)=>s+w.salary,0)+staffPay();const rev=Math.round(mediaRev()*(media().p==='tv'?1:.3))+(G.sponsor?Math.round(G.sponsor.amt*sponsMul()):0);
 G.fed.cash+=rev-sal-T.prod*.5;G.fed.pop=clamp(G.fed.pop-2-(isBig()?2:0),2,100);G.bigType=null;G.streak=0;G.summary=null;G.showResult=false;addNews('n.skip');
 endWeek();
}
function releaseW(w){w.fed='FA';purgeW(w.id);addNews('n.release',{w:w.name})}
function spawnFA(quiet){
 const cc=pickR(COUNTRIES),N=NAMES[cc];const fem=rnd()<.38;const nm=pickR(fem?NAMESF[cc]:N.f)+' '+pickR(N.l);const st=pickR(STYLES),b=SBIAS[st];
 const q=rnd(),pop=q<.68?6+Math.floor(rnd()*24):q<.92?30+Math.floor(rnd()*20):50+Math.floor(rnd()*19),tr=tierOfPop(pop),base=28+tr*9;
 const w={id:'x'+(G.uid++),name:nm,country:cc,style:st,role:pickR(['face','heel','tweener']),ring:clamp(Math.round(base+b.ring+(rnd()-.5)*20),18,90),mic:clamp(Math.round(base-6+b.mic+(rnd()-.5)*20),12,90),cha:clamp(Math.round(base-2+b.cha+(rnd()-.5)*20),12,90),pop,age:20+Math.floor(rnd()*(pop>=50?20:14)),fed:'FA',contract:0,injury:0,look:randLook(Math.random,cc,fem),acc:0};
 if(fem)w.g='f';
 genStats(w,Math.random);w.salary=salaryOf(w,1);G.ws.push(w);if(!quiet&&pop>=35)addNews('n.fa',{w:nm});
}
async function endWeek(){
 calResolve();if(G.week%4===0)ppvRotate();G.week++;G.card=[];G.promos=[];mediaWeekly();
 if((G.week-1)%52===0)G.ws.forEach(w=>w.age++);
 const cfx=coachFx();
 mine().forEach(w=>{
  if(w.injury>0)w.injury--;w.contract--;w.acc=Math.min(100,(w.acc||0)+1+cfx.acc);
  const wr=w.wrestled;w.fatigue=Math.max(0,w.fatigue-(wr?9:16)+(G.fed.tier>=5?2:0));
  if(!wr&&!w.injury)w.morale-=w.pop>=30?.8:.4;
  w.morale=clamp(w.morale+(60-w.morale)*.03+(isChamp(w.id)?.8:0)+(stableOf(w.id)?.3:0),0,100);
  w.wrestled=false;w.pop=Math.max(1,w.pop-Math.max(0,w.pop-45)*.0025);develop(w)});
 G.ws.filter(w=>isGuest(w.id)).forEach(w=>{if(w.injury>0)w.injury--;w.fatigue=Math.max(0,w.fatigue-(w.wrestled?9:16));w.wrestled=false});
 staffWeekly();prizeTick();injWeekly();rankWeekly();scoutWeekly();fedMoves();titleWeekly();fameWeekly();relWeekly();twWeekly();infraWeekly();chalWeekly();trWeekly();trScout();
 G.feuds.forEach(f=>{if(!f.used)f.heat=clamp(f.heat-3,0,100);f.used=false});
 if(G.sponsor){G.sponsor.wk--;if(G.sponsor.wk<=0)G.sponsor=null}
 G.rivals.forEach(r=>{const base=(PACK.feds.find(x=>x.id===r.id)||{pop:r.pop}).pop;r.pop=clamp(r.pop+(base-r.pop)*.04+(rnd()-.48)*1.4,3,99)});
 G.popHist.push(G.fed.pop);if(G.popHist.length>60)G.popHist.shift();
 faFlow();
 if(G.fed.cash<0)G.debt++;else G.debt=0;
 save();
 await weekEvents();
 await staffEvents();
 await worldEvents(); await inboxWeekly(); await angleWeekly();
 await cupWeekly();
 await tvRenew();
 await jobWeekly();
 await legacyWeekly();
 if(await boardWeekly())return;
 await feudEvents(); await feudChapters(); await titleStory();
 save();
 if(G.debt>=6){openModal('<h2>'+t('go.title')+'</h2><p class="mute">'+t('go.body')+'</p><button class="btn gold" data-act="gameover">'+t('go.again')+'</button>');return}
 G.screen='show';render();
}
function askGeneric(title,body,opts){
 return new Promise(res=>{
  let h='<h2>'+title+'</h2><p class="mute">'+esc(body)+'</p>';
  opts.forEach((o,i)=>{h+='<button class="opt"'+(o.dis?' disabled':'')+' data-act="evopt" data-i="'+i+'"><b>'+o.l+'</b></button>'});
  window.__evOpts=opts;openModal(h);window.__evResolve=i=>{closeModal();res(i)};
 });
}
async function weekEvents(){
 for(const w of mine().slice()){
  if(w.contract<=0&&!w.farewell){
   const cost=w.salary*(G.fed.tier>=5?13:10);
   const i=await askGeneric(t('ev.contract.t'),t('ev.contract.b',{w:w.name,p:Math.round(w.pop)}),[{l:t('ev.contract.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('ev.contract.2')}]);
   if(i===0){G.fed.cash-=cost;w.contract=52;addNews('n.resign',{w:w.name})}else releaseW(w);
  }
 }
 const cand=mine().filter(w=>w.pop>=35&&w.contract>0);
 for(const w of cand){
  if(rnd()<.02*(1.4-w.loyal/100+(w.morale<35?.5:0))){
   const rv=pickR(G.rivals);const cost=w.salary*12;
   const i=await askGeneric(t('ev.poach.t'),t('ev.poach.b',{f:rv.name,w:w.name}),[{l:t('ev.poach.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('ev.poach.2')}]);
   if(i===0){G.fed.cash-=cost;w.contract=60;w.morale=clamp(w.morale+8,0,100)}else{w.fed=rv.id;purgeW(w.id);addNews('n.leave',{w:w.name,f:rv.short||rv.name})}
   break;
  }
 }
 if(!G.sponsor&&rnd()<.06){
  const amt=Math.round(tdNow().price*tdNow().cap*.06/10)*10;
  const i=await askGeneric(t('ev.spons.t'),t('ev.spons.b',{m:money(amt)}),[{l:t('ev.spons.1')},{l:t('ev.spons.2')}]);
  if(i===0){G.sponsor={wk:8,amt};G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.spons',{m:money(amt)})}
 }
}
function allFeds(){return[G.fed].concat(G.rivals).sort((a,b)=>b.pop-a.pop)}
function objectives(){
 const tr=G.fed.tier-1;const rank=allFeds().findIndex(f=>f.id===G.fed.id)+1;
 return[{k:'o.pop',v:{v:OBJ_POP[tr]},cur:G.fed.pop,tar:OBJ_POP[tr]},{k:'o.cash',v:{v:money(OBJ_CASH[tr])},cur:G.fed.cash,tar:OBJ_CASH[tr]},{k:'o.streak',v:{},cur:G.streak,tar:3},{k:'o.top',v:{},cur:rank===1?1:0,tar:1}];
}

/* ============ Feud events: joiners and wrestler pitches ============ */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const MAXTEAMS=g=>g===1?6:g===2?4:3;
async function joinEvent(f){
 if(f.titleId||f.fedId||f.stA||f.stB||f.stR)return false;
 const g=f.mw?(f.g||1):(f.A.length===f.B.length?f.A.length:0);
 const fall=f.A.concat(f.B),fg=fall.every(isF)?true:fall.some(isF)?null:false;
 const inF=new Set(f.A.concat(f.B)),busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));
 const free=healthy().filter(w=>!inF.has(w.id)&&!busy.has(w.id)&&!isGuest(w.id)&&(fg===null||isF(w.id)===fg)).sort((a,b)=>b.pop-a.pop).slice(0,8);
 if(!free.length)return false;
 const opts=[],acts=[];
 // third side
 if(g>=1&&g<=3&&free.length>=g){
  const grp=shuffle(free).slice(0,g).map(w=>w.id);
  const base=f.mw?f.A:f.A.concat(f.B);const A2=base.concat(grp);
  const tmp={mw:1,g,A:A2,B:[]};
  if(A2.length/g<=MAXTEAMS(g)&&feudMode(tmp)){
   opts.push({l:t('ev.join.third')});acts.push(()=>{f.A=A2;f.B=[];f.mw=1;f.g=g;return grp})}
  var who=grp;
 }
 // join an existing side (singles joiner)
 const w1=shuffle(free)[0];
 if(!f.mw&&w1){
  [['A',f.A,f.B,f.stA],['B',f.B,f.A,f.stB]].forEach(([k,S,O])=>{
   if(S.length+1>10)return;const t1={A:k==='A'?S.concat(w1.id):f.A,B:k==='B'?S.concat(w1.id):f.B};
   if(!feudMode(t1))return;
   opts.push({l:t('ev.join.side',{s:sideLabel(S,'')})});acts.push(()=>{f[k]=S.concat(w1.id);return[w1.id]})})}
 if(!opts.length)return false;
 const shown=(typeof who!=='undefined'&&who&&who.length)?who:[w1.id];
 opts.push({l:t('ev.join.no')});
 const i=await askGeneric(t('ev.join.t'),t('ev.join.b',{w:names(shown),f:fLabel(f)}),opts);
 if(i>=acts.length)return true;
 const j=acts[i]();j.forEach(id=>{const w=W(id);if(w)w.morale=clamp(w.morale+3,0,100)});
 f.heat=clamp(f.heat+6,0,100);addNews('n.joinfeud',{w:names(j),f:fLabel(f)});flog(f,{k:'e',key:'n.joinfeud',x:{w:names(j),f:fLabel(f)}});return true;
}
async function pitchEvent(f){
 if(f.fedId)return false;
 const mineIn=f.A.concat(f.B).map(W).filter(w=>w&&w.fed===G.fed.id&&!w.injury);if(!mineIn.length)return false;
 const p=pickR(mineIn);const others=f.A.concat(f.B).filter(i=>i!==p.id&&W(i));
 const tgt=others.length?W(pickR(others)):null;
 const types=['callout'];
 const ss=Object.keys(STIPS).filter(k=>k!=='none'&&G.fed.tier>=STIPS[k].tier&&lvlOf(k)<=maxLvl());if(ss.length)types.push('stip','stip');
 if(p.role!=='tweener'||rnd()<.5)types.push('turn');
 if(tgt)types.push('ambush','callout');
 const ty=pickR(types);const s=ty==='stip'?pickR(ss):'';
 const i=await askGeneric(t('ev.pitch.t'),t('ev.pitch.'+ty+'.b',{w:p.name,f:fLabel(f),s:s?t('stip.'+s):'',o:tgt?tgt.name:''}),[{l:t('ev.pitch.yes')},{l:t('ev.pitch.soft')},{l:t('ev.pitch.no')}]);
 if(i===2){p.morale=clamp(p.morale-4,0,100);return true}
 if(i===1){f.heat=clamp(f.heat+3,0,100);p.morale=clamp(p.morale+1,0,100);addNews('n.pitch',{w:p.name,f:fLabel(f)});return true}
 p.morale=clamp(p.morale+4,0,100);
 if(ty==='stip'){f.fav=s;f.heat=clamp(f.heat+8,0,100)}
 else if(ty==='turn'){p.role=p.role==='heel'?'face':'heel';f.heat=clamp(f.heat+12,0,100);addNews('n.turn',{w:p.name,r:t('role.'+p.role).split(' ')[0]})}
 else if(ty==='ambush'){f.heat=clamp(f.heat+15,0,100);if(tgt&&!tgt.injury&&tgt.fed===G.fed.id&&rnd()<.25)injure(tgt,1+Math.floor(rnd()*3))}
 else{f.heat=clamp(f.heat+10,0,100);p.pop=clamp(p.pop+.8,1,100)}
 addNews('n.pitch',{w:p.name,f:fLabel(f)});flog(f,{k:'e',key:'ev.pitch.'+ty+'.b',x:{w:p.name,f:fLabel(f),s:s?t('stip.'+s):'',o:tgt?tgt.name:''}});return true;
}
async function feudEvents(){
 const list=shuffle(G.feuds.filter(f=>!f.fedId&&rnd()<.22)).slice(0,2);
 for(const f of list){
  if(G.feuds.indexOf(f)<0)continue;
  if(rnd()<.45&&await joinEvent(f))continue;
  await pitchEvent(f);
 }
}

/* ============ Promos (segments between matches) ============ */
const PTYPES={
 rally:{role:{face:3,tweener:1.5,heel:.3}},heartfelt:{role:{face:3,tweener:1,heel:.1}},
 insult:{role:{heel:3,tweener:1.5,face:.3}},cheap:{role:{heel:3,tweener:.7,face:0}},
 menace:{role:{heel:2,tweener:1,face:.5},st:{brawler:2,hardcore:2,powerhouse:2}},
 analytic:{role:{face:1,heel:1,tweener:1},st:{technician:3,strong:2}},
 comedy:{role:{face:1.5,tweener:2.5,heel:1}},humble:{role:{face:2,tweener:1,heel:0}},
 highflyer:{role:{face:2,tweener:1.5,heel:.7},st:{highflyer:3,lucha:3}},
 faceoff:{role:{face:1,tweener:1,heel:1}},champ:{role:{face:1.5,tweener:1,heel:1.5}}};
function promoFeud(p){const ids=[p.a,p.b].filter(Boolean);let best=null;
 G.feuds.forEach(f=>{const all=f.A.concat(f.B);const c=ids.filter(i=>all.indexOf(i)>=0).length;if(c&&(!best||c>best.c||(c===best.c&&f.heat>best.f.heat)))best={f,c}});return best}
function promoType(a,b,both){
 const ws=[];Object.keys(PTYPES).forEach(k=>{const P=PTYPES[k];let v=(P.role[a.role]!=null?P.role[a.role]:.5)+((P.st||{})[a.style]||0);
  if(k==='comedy')v+=Math.max(0,(a.cha-50)/30);if(k==='heartfelt')v+=Math.max(0,(a.mic-50)/30);
  if(k==='humble')v=a.pop<35?v+2.5:0;if(k==='champ')v=isChamp(a.id)?v+4:0;
  if(k==='faceoff')v=b&&both?6:0;else if(b)v*=.5;
  if(maxLvl()<2&&(k==='cheap'||k==='menace'))v*=.3;
  if(v>0)ws.push([k,v])});
 let r=rnd()*ws.reduce((s,x)=>s+x[1],0);for(const x of ws){r-=x[1];if(r<=0)return x[0]}return ws[0][0]}
function runPromo(p,log){
 const a=W(p.a),b=p.b?W(p.b):null;const pf=promoFeud(p);const both=!!(pf&&b&&pf.c>=2);
 const ty=promoType(a,b,both),v=1+Math.floor(rnd()*3);
 const tgtId=b?b.id:(feudFoes(a.id)[0]||'');const tgt=tgtId&&W(tgtId)?W(tgtId).name:t('pr.crowd');
 const sp=[a].concat(b?[b]:[]);
 const fit=(PTYPES[ty].role[a.role]||.5)/3+((PTYPES[ty].st||{})[a.style]?.3:0);
 const score=avg(sp.map(w=>micEff(w)*.5+chaEff(w)*.3+w.psy*.1))+Math.min(1,fit)*10+(rnd()-.5)*14+avg(sp.map(w=>w.ext?w.fame*.08:0));
 let stars=Math.round(clamp(score/20,.5,5)*4)/4;
 sp.forEach(w=>{w.pop=clamp(w.pop+(stars-2.5)*.15,1,100);w.morale=clamp(w.morale+1,0,100);w.wrestled=true});
 if(pf){const f=pf.f;const gain=(stars*3+(ty==='faceoff'?2:0))*heatMul(f.sc)*(both?1.25:1)+(avg(sp.map(w=>micEff(w)))-50)/40;f.heat=clamp(f.heat+gain,0,100);f.used=true;
  flog(f,{k:'p',ty,v,a:a.name,b:tgt,s:stars})}
 const q=stars>=4?4:stars>=3?3:stars>=2?2:1;
 log('hd',esc(t('pr.hd',{a:names(sp.map(w=>w.id)),ty:t('pr.type.'+ty)})));
 if(a.ext)log('ln',esc(t('gs.cam.'+a.ext+'.'+v,{a:a.name,x:a.film||a.hit||(a.sport?t('sp.'+a.sport):''),b:tgt})));
 log('ln',esc(t('pr.'+ty+'.'+v,{a:a.name,b:tgt})));
 log('ln',esc(t('pr.q'+q,{a:a.name})));
 log('',starsHtml(stars)+' <b>'+f2(stars)+'</b>');
 return{promo:1,a:names(sp.map(w=>w.id)),b:'',ty,stars,winner:'',feud:!!pf,line:t('pr.'+ty+'.'+v,{a:a.name,b:tgt}),pos:p.at};
}

/* ============ Media (TV / streaming), PPV-PLE weeks, show events ============ */
const PLAT={yt:{lvl:1,pm:1,sp:1.15,share:.7,rate:'pg'},twitch:{lvl:1,pm:.95,sp:1.1,share:.7,rate:'pg'},kick:{lvl:3,pm:1.2,sp:.8,share:.95,rate:'mature'},own:{lvl:3,pm:0,sp:.9,share:1,rate:'mature',setup:12,infra:.12},tv:{lvl:2,pm:0,sp:1.2,share:.85,rate:'tv14'}};
const SB=[300,2500,22e3,200e3,1.6e6],TVPOP=[0,16,34,55,75],TVWEEKS=26,PLATCD=4;
const STLVL={none:1,submission:1,ironman:1,prizematch:1,tourney:1,lms:2,cage:2,ladder:2,tables:3,extreme:3};
const lvlOf=s=>STLVL[s]||1;
const tvFee=()=>Math.round(tdNow().tv*(.75+G.fed.pop/200));
function media(){if(!G.media)G.media=G.fed.tier>=3?{k:'tv',p:'tv',fee:tvFee(),exp:G.week+TVWEEKS,last:'yt',chg:0}:{k:'stream',p:'yt',chg:-99,last:'yt'};return G.media}
const maxLvl=()=>PLAT[media().p].lvl;
function platRev(p){if(p==='tv')return media().p==='tv'?media().fee:tvFee();const P=PLAT[p];const pm=p==='own'?.45+G.fed.pop/100*1.1:P.pm;return Math.round(SB[G.fed.tier-1]*pm*(.4+G.fed.pop/100*1.2))}
const mediaRev=()=>platRev(media().p)*(G.netPen&&G.netPen.wk>0?G.netPen.m:1);
const mediaCost=()=>media().p==='own'?Math.round(tdNow().prod*PLAT.own.infra):0;
const sponsMul=()=>PLAT[media().p].sp*studioMul();
const isBig=()=>G.week%4===0;
const bigType=()=>G.bigType||(media().p==='tv'?'ple':'ppv');
const BIGN=[['Fala Uderzeniowa','Shockwave'],['Wieczór Żelaza','Iron Evening'],['Rozstrzygnięcie','Decision Night'],['Zerwane Łańcuchy','Broken Chains'],['Noc Pretendentów','Contenders\' Night'],['Grom nad Areną','Thunder Over the Arena'],['Czerwona Linia','Red Line'],['Wielki Finał','Grand Finale']];
const bigName=()=>bigNameFor(G.fed.id,G.week);
function bigEst(type,rating){const T=tdNow(),m=media();rating=rating||3;
 if(type==='ppv'){const buys=Math.round(T.cap*(.6+G.fed.pop/100*1.6)*clamp(rating/3,.4,1.5));return{buys,rev:Math.round(buys*T.price*1.3*PLAT[m.p].share)}}
 return{buys:0,rev:m.p==='tv'?Math.round(m.fee*3):0}}
function setPlatform(p){const m=media();m.last=p;m.k='stream';m.p=p;m.chg=G.week;G.card.forEach(fixMatch)}
function mediaWeekly(){ // contract expiry
 const m=media();if(m.p==='tv'&&G.week>=m.exp){G.media={k:'stream',p:m.last||'yt',chg:G.week,last:m.last||'yt'};addNews('n.tvend');G.card.forEach(fixMatch)}
 if(isBig())addNews('n.bigwk',{n:bigName()});
}
/* in-show events between matches */
async function showEvent(fast){
 const T=tdNow();const ids=['glitch','stunt','fan'];const fa=G.ws.filter(w=>w.fed==='FA'&&w.pop>=Math.max(10,G.fed.pop*.5)).sort((a,b)=>b.pop-a.pop)[0];
 if(fa&&G.fed.cash>fa.salary*3)ids.push('vet','vet');
 const ms=healthy();if(ms.length>=2)ids.push('brawl','brawl');
 const id=pickR(ids);let bonus=0;
 const ask2=async(x,opts)=>fast?opts.findIndex(o=>!o.dis):await askGeneric(t('se.'+id+'.t'),t('se.'+id+'.b',x),opts);
 if(id==='vet'){const cost=Math.round(fa.salary*2);
  const i=await ask2({w:fa.name,m:money(cost)},[{l:t('se.vet.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('se.vet.2')}]);
  if(i===0){G.fed.cash-=cost;bonus+=.2;G.fed.pop=clamp(G.fed.pop+.4,2,100);fa.pop=clamp(fa.pop+.5,1,100);addNews('n.vet',{w:fa.name})}}
 else if(id==='glitch'){const cost=Math.round(T.prod*.15);
  const i=await ask2({m:money(cost)},[{l:t('se.glitch.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('se.glitch.2')}]);
  if(i===0)G.fed.cash-=cost;else{bonus-=.2;G.fed.pop=clamp(G.fed.pop-.3,2,100)}}
 else if(id==='stunt'){const amt=Math.round(T.prod*.4);
  const i=await ask2({m:money(amt)},[{l:t('se.stunt.1',{m:money(amt)})},{l:t('se.stunt.2')}]);
  if(i===0){G.fed.cash+=amt;bonus-=.1}}
 else if(id==='fan'){const i=await ask2({},[{l:t('se.fan.1')},{l:t('se.fan.2')}]);
  if(i===0){bonus+=.1;G.fed.pop=clamp(G.fed.pop+.2,2,100)}}
 else if(id==='brawl'){const p=shuffle(ms).slice(0,2);const mature=maxLvl()>=2;
  const i=await ask2({a:p[0].name,b:p[1].name},[{l:t('se.brawl.1')},{l:t('se.brawl.2'),dis:!mature},{l:t('se.brawl.3')}]);
  if(i===0)p.forEach(w=>w.morale=clamp(w.morale-2,0,100));
  else if(i===1){bonus+=.2;p.forEach(w=>w.morale=clamp(w.morale-3,0,100));if(rnd()<.15){const w=pickR(p);if(!w.injury)injure(w,1+Math.floor(rnd()*3))}}
  else{p.forEach(w=>{w.morale=clamp(w.morale-5,0,100);G.fed.cash+=Math.round(w.salary*.3)});}}
 return bonus}

/* ============ Staff, retirement, outside guests, hiring events ============ */
const SROLES=['coach','ref','comm','ann','scout','doc','phys'],RETR=['coach','ref','comm','ann','scout'];
const SMAX={coach:[1,2,3,4,5],ref:[1,2,3,3,4],comm:[1,2,2,3,3],ann:[1,1,2,2,3],doc:[1,1,1,2,2],phys:[1,1,2,2,3],scout:[1,1,2,2,3]};
const SBASE=30,SMUL={coach:1,ref:.7,comm:.9,ann:.65,doc:1.3,phys:.8,scout:.85};
const SPEC_ST={ring:['ring','tec','psy'],mic:['mic','cha'],power:['str','sta'],air:['spd','tec','sta']};
const SPECS=Object.keys(SPEC_ST);
const GCATS=['actor','singer','athlete','strong','builder','influencer'];
const SPORTS=['football','basket','boxing','mma','sprint','volley','handball','rugby'];
const CATM={actor:1,singer:1,athlete:.9,strong:.8,builder:.8,influencer:.9};
const GCAPS=[2,2,3,4,5];
const GFEE={actor:1.2,singer:1.1,athlete:1.3,strong:.9,builder:.8,influencer:.7};
const GDEF={
 actor:{st:'brawler',ring:[10,26],mic:[52,82],cha:[58,90],str:[25,50],spd:[25,50],tec:[15,35],sta:[30,55],psy:[40,70],age:[25,60]},
 singer:{st:'highflyer',ring:[8,22],mic:[40,70],cha:[66,95],str:[20,40],spd:[30,55],tec:[10,30],sta:[30,55],psy:[30,60],age:[22,50]},
 athlete:{st:'strong',ring:[26,48],mic:[25,55],cha:[40,75],str:[45,80],spd:[40,80],tec:[25,50],sta:[55,90],psy:[35,65],age:[21,38]},
 strong:{st:'powerhouse',ring:[22,40],mic:[22,44],cha:[40,66],str:[85,99],spd:[18,34],tec:[15,30],sta:[60,82],psy:[25,45],age:[26,44]},
 builder:{st:'strong',ring:[12,28],mic:[30,52],cha:[56,86],str:[75,95],spd:[25,45],tec:[15,30],sta:[50,75],psy:[25,45],age:[24,48]},
 influencer:{st:'hardcore',ring:[5,18],mic:[56,86],cha:[56,86],str:[15,40],spd:[25,50],tec:[8,25],sta:[25,50],psy:[30,60],age:[19,35]}};
const rg=a=>a[0]+Math.floor(rnd()*(a[1]-a[0]+1));
function nameFor(cc,fem){const N=NAMES[cc]||NAMES.US,FN=NAMESF[cc]||NAMESF.US;return pickR(fem?FN:N.f)+' '+pickR(N.l)}
const STAGE=['Lil','Young','MC','DJ','Big','Yung','Mr.','Dr.','Saint','Kid'],STAGEW=['Hammer','Bolt','Nitro','Rumble','Vandal','Cobra','Zeus','Glitch','Comet','Voltage','Pharaoh','Static','Havoc','Mirage','Blaze','Orbit'];

/* ----- generators: film and song titles ----- */
const FILMS=[['Szybcy, Wściekli i Zmęczeni','Fast, Furious & Tired'],['Mission: Improbable','Mission: Improbable'],['Jan Fitil 4','John Quick 4'],['Matrix: Przeładowanie Kontraktu','The Matrix: Contract Reloaded'],['Szklana Pułapka na Wynajem','Die Hard with a Mortgage'],['Skazani na Redakcję','The Shawshank Redaction'],['Pulp Friction','Pulp Friction'],['Terminator: Dzień Zapłaty','Terminator: Payday'],['Władca Ringu','Lord of the Ringside'],['Kevin Sam w Ringu','Home Alone in the Ring'],['Dzień Świstaka 2: Znowu Poniedziałek','Groundhog Day Again'],['Piraci z Karaibów: Zemsta Księgowego','Pirates of the Caribbean: Revenge of the Accountant'],['Rocky 9: Pięść Przeznaczenia','Rocky 9: Fist of Destiny'],['Gwiezdne Wojny: Powrót Wujka','Star Wars: Return of the Uncle'],['Szeregowiec Ryan i Spóźniony Pociąg','Saving Private Ryan from the Late Train'],['Park Jurajski: Parking','Jurassic Park: Parking Lot'],['Incepcja w Piątek','Inception on a Friday'],['Mroczny Rycerz Wraca po Bułki','The Dark Knight Returns for Rolls'],['Forrest Biegnie Dalej','Forrest Keeps Running'],['Titanic 2: Tym Razem z Szalupami','Titanic 2: Now with Lifeboats'],['Gladiator: Rewanż w Piżamie','Gladiator: Rematch in Pajamas'],['Avengers: Spotkanie Rodzinne','Avengers: Family Reunion'],['Kung Fu Panda i Podatek','Kung Fu Panda and the Tax Return'],['Toy Story 12: Zabawki Pozywają','Toy Story 12: The Toys Sue']];
const FA_=[['Ostatni Rewanż','The Last Rematch'],['Zemsta Cieni','Revenge of Shadows'],['Mroczna Dzielnica','Dark District'],['Złota Pułapka','The Golden Trap'],['Cichy Huragan','Silent Hurricane'],['Nocny Kurier','Night Courier'],['Stalowe Serce','Heart of Steel'],['Szalony Weekend','Mad Weekend'],['Pożyczony Czas','Borrowed Time'],['Granica Gniewu','Edge of Fury'],['Nieproszeni Goście','Uninvited Guests'],['Kod Czerwony','Code Red'],['Zimny Ogień','Cold Fire'],['Miasto Bez Hamulców','City Without Brakes'],['Wyścig o Jutro','Race for Tomorrow']];
const FS_=[['',''],[' 2',' 2'],[' 3D',' 3D'],[': Reaktywacja',': Reloaded'],[': Początek',': Origins'],[': Dzień Zapłaty',': Payday'],[': Rozdział {n}',': Chapter {n}'],[' II',' II'],[': Ostatnie Starcie',': The Final Round']];
function filmTitle(){
 const i=rnd()<.5?Math.floor(rnd()*FILMS.length):-1;
 if(i>=0)return FILMS[i][lang==='pl'?0:1];
 const a=FA_[Math.floor(rnd()*FA_.length)],s=FS_[Math.floor(rnd()*FS_.length)],n=2+Math.floor(rnd()*8);
 return (a[lang==='pl'?0:1]+s[lang==='pl'?0:1]).replace('{n}',n)}
const SONGS=[['Ostatni Taniec','Last Dance'],['Kask i Korona','Helmet & Crown'],['Gong','The Bell'],['Złoty Pas','Golden Strap'],['Dzień Walki','Fight Night'],['Niepokonany','Undefeated'],['Sześć na Ringu','Six in the Ring'],['Trzy, Dwa, Jeden','Three, Two, One'],['Pod Linami','Under the Ropes'],['Wchodzę Bez Pukania','Walking in Unannounced'],['Neon i Pot','Neon & Sweat'],['Heel Turn Love','Heel Turn Love']];
const songTitle=()=>pickR(SONGS)[lang==='pl'?0:1];

/* ----- staff ----- */
const staffOf=r=>(G.staff||[]).filter(s=>s.role===r);
const staffPay=()=>(G.staff||[]).reduce((s,x)=>s+x.salary,0);
const staffFull=r=>staffOf(r).length>=SMAX[r][G.fed.tier-1];
function staffSal(role,lvl,tier){tier=clamp(tier|0,1,5);return Math.max(20,Math.round((lvl*lvl/16+lvl)*SALM[tier-1]/10*SMUL[role])*10)}
function staffFit(w,r){
 const v=r==='coach'?w.tec*.28+w.psy*.24+w.ring*.2+w.pop*.12+(w.age>=32?8:0)+(w.age>=40?4:0)
  :r==='ref'?w.psy*.3+w.sta*.2+w.tec*.25+w.ring*.1+12
  :r==='comm'?w.mic*.4+w.psy*.2+w.cha*.2+w.pop*.2+5
  :r==='scout'?w.psy*.3+w.pop*.25+w.tec*.2+(w.age>=32?8:0)+12
  :r==='doc'||r==='phys'?40
  :w.mic*.35+w.cha*.35+w.pop*.2+8;
 return clamp(Math.round(v),15,95)}
const bestRole=(w,free)=>RETR.filter(r=>!free||!staffFull(r)).sort((a,b)=>staffFit(w,b)-staffFit(w,a))[0]||'';
function bestSpec(w){return SPECS.map(k=>[k,avg(SPEC_ST[k].map(s=>w[s]||0))]).sort((a,b)=>b[1]-a[1])[0][0]}
function staffLook(role,l){l=Object.assign({},l);l.mask='none';l.gear='none';l.acc=role==='ref'||role==='ann'?'none':l.acc;
 if(role==='ref'){l.outfit='stripes';l.outC=5;l.o2=6}
 else if(role==='comm'||role==='ann'){l.outfit='suit';l.outC=role==='ann'?13:6;l.o2=5}
 else{l.outfit='jacket';l.outC=l.outC%OUTC.length;l.o2=6}
 if(l.build==='big'&&role!=='coach')l.build='std';
 return l}
function mkStaff(role,tier){
 const cc=pickR(COUNTRIES),fem=rnd()<(role==='coach'?.2:.28);
 const lo=18+tier*5,hi=40+tier*11,lvl=clamp(Math.round(lo+(hi-lo)*Math.pow(rnd(),1.1)),15,95);
 const s={id:'s'+(G.uid++),role,name:nameFor(cc,fem),country:cc,age:rg([role==='ref'?26:30,62]),lvl,spec:pickR(SPECS),contract:52,look:staffLook(role,randLook(Math.random,cc,fem))};
 if(fem)s.g='f';if(role==='scout')s.reg=pickR(Object.keys(REGS));s.salary=staffSal(role,lvl,tier);return s}
function toStaff(w,role){
 const lvl=clamp(staffFit(w,role)+(w.pop>=50?4:0),15,96);
 const s={id:'s'+(G.uid++),role,name:w.name,country:w.country,age:w.age,lvl,spec:bestSpec(w),contract:52,look:staffLook(role,w.look||randLook(Math.random,w.country)),from:w.id,legend:w.pop>=45};
 if(w.g==='f')s.g='f';if(role==='scout')s.reg=regOf(w.country);s.salary=staffSal(role,lvl,G.fed.tier);G.staff.push(s);w.staffed=s.id;return s}
function sfx(){
 const best=r=>Math.max.apply(null,[SBASE].concat(staffOf(r).map(s=>s.lvl)));
 const cm=staffOf('comm').map(s=>s.lvl).sort((a,b)=>b-a).slice(0,2);while(cm.length<2)cm.push(SBASE);
 const pair=staffOf('comm').length>=2?1.15:1;
 return{refL:best('ref'),annL:best('ann'),ref:(best('ref')-SBASE)/100*.3,comm:(avg(cm)-SBASE)/100*.3*pair,ann:clamp((best('ann')-SBASE)/100,0,.7)}}
function coachFx(){
 const cs=staffOf('coach');if(!cs.length)return{p:0,acc:0,cover:0,coach:null};
 const cap=cs.reduce((s,c)=>s+3+Math.floor(c.lvl/25),0),cover=Math.min(1,cap/Math.max(1,mine().length));
 const al=avg(cs.map(c=>c.lvl))/100;
 let x=rnd()*cs.reduce((s,c)=>s+c.lvl,0),pick=cs[0];for(const c of cs){x-=c.lvl;if(x<=0){pick=c;break}}
 return{p:cover*al*.12,acc:cover*al*.8,cover,coach:pick}}
function develop(w){
 const cf=coachFx();
 const pm=w.pot&&w.age<=27?.4+w.pot/50:(w.age<=27&&w.fed===G.fed.id?.7+hpOf(w)/150:1);
 if(w.pot&&w.age<=27&&w.pop<w.pot&&rnd()<.03+.05*w.pot/100)w.pop=Math.min(100,w.pop+1);
 if(rnd()<(.1+cf.p+(w.fed===G.fed.id?infraDojo():0))*pm){
  if(w.age<=30||(cf.p>0&&w.age<=36&&rnd()<.5)){
   const pool=cf.coach&&rnd()<.7?SPEC_ST[cf.coach.spec]:['ring','str','spd','tec','sta','psy','mic','cha'];
   const k=pickR(pool);if(w[k]<99){w[k]=clamp(w[k]+1,1,99);if(cf.p>0&&rnd()<.4&&w.fed===G.fed.id)addNews('n.trained',{w:w.name,k:t('st.'+k),c:cf.coach.name})}}
  else if(w.age>=36&&rnd()>cf.cover*cf.p*5){const k=pickR(['spd','sta','str']);w[k]=clamp(w[k]-1,5,99)}}
 else if(w.age>=36&&rnd()<.04*(1-cf.cover*.8)){const k=pickR(['spd','sta','str']);w[k]=clamp(w[k]-1,5,99)}}

/* ----- guests (outside wrestling) ----- */
function mkGuest(cat,tier){
 const cc=pickR(COUNTRIES),fem=cat==='influencer'?rnd()<.5:rnd()<.3;const d=GDEF[cat];
 let name=nameFor(cc,fem);if(cat==='singer'&&rnd()<.6)name=pickR(fem?STAGE.filter(x=>x!=='Mr.'):STAGE)+' '+pickR(STAGEW);
 const lo=6+(tier-1)*14,hi=26+(tier-1)*17,fame=Math.round(lo+(hi-lo)*Math.pow(rnd(),.8));
 const g={id:'g'+(G.uid++),ext:cat,name,country:cc,style:d.st,role:pickR(['face','heel','tweener']),ring:rg(d.ring),mic:rg(d.mic),cha:rg(d.cha),str:rg(d.str),spd:rg(d.spd),tec:rg(d.tec),sta:rg(d.sta),psy:rg(d.psy),pop:fame,fame,age:rg(d.age),fed:'GMK',contract:0,injury:0,morale:70,fatigue:0,loyal:50,acc:100,salary:0,apps:0};
 const l=randLook(Math.random,cc,fem);
 if(cat==='actor'){l.outfit=fem?'suit':'suit'}else if(cat==='strong'){l.outfit='singlet';l.build='big'}else if(cat==='builder'){l.outfit='trunks';l.build='big';l.mask='none'}
 else if(cat==='athlete'){l.outfit=pickR(['tank','shorts']);l.mask='none'}else if(cat==='influencer'){l.outfit='jacket'}else if(cat==='singer'){l.outfit=pickR(['jacket','vest','suit','tank'])}
 g.look=l;if(fem)g.g='f';
 if(cat==='athlete'){g.sport=pickR(SPORTS);
  if(g.sport==='boxing'||g.sport==='mma'){g.ring=rg([40,62]);g.tec=rg([45,70])}
  else if(g.sport==='sprint'){g.spd=rg([75,95])}else if(g.sport==='rugby'){g.str=rg([70,90])}else if(g.sport==='basket'||g.sport==='volley'){g.spd=rg([50,75])}}
 if(cat==='actor')g.film=filmTitle();if(cat==='singer')g.hit=songTitle();
 return g}
const celebDisc=()=>Math.min(.45,mine().filter(w=>w.celeb).reduce((s,w)=>s+.1+(w.fame||w.pop)/100*.12,0));
function guestFee(g,weeks,raw){const T=tdNow(),base=T.cap*T.price*.035*Math.pow(g.fame/50,2)*GFEE[g.ext];const mul=weeks<=1?1:weeks<=4?3:8;return Math.max(20,Math.round(base*mul*(raw?1:1-celebDisc())/10)*10)}
const celebCost=g=>Math.round(guestFee(g,12,true)*4/10)*10;
function celebSign(g){
 G.gmarket=(G.gmarket||[]).filter(x=>x.id!==g.id);if(G.ws.indexOf(g)<0)G.ws.push(g);
 G.fed.cash-=celebCost(g);const cat=g.ext;delete g.ext;delete g.apps;g.celeb=cat;g.fed=G.fed.id;g.pop=clamp(g.fame+8,1,100);
 g.acc=accStart(g.country,G.fed.country);g.contract=52;g.morale=85;g.fatigue=0;g.salary=salaryOf(g,G.fed.tier);
 addNews('n.celebsign',{w:g.name,c:t('gc.'+cat)})}
const guestsHired=()=>G.ws.filter(w=>w.ext&&w.fed==='GST');
const guestFull=()=>guestsHired().length>=GCAPS[G.fed.tier-1];
const catLabel=g=>g.ext==='athlete'&&g.sport?t('sp.'+g.sport):t('gc.'+g.ext);
function hireGuest(g,weeks,price){
 G.gmarket=(G.gmarket||[]).filter(x=>x.id!==g.id);g.fed='GST';g.contract=weeks;g.apps=0;g.morale=75;G.fed.cash-=price;G.ws.push(g);
 addNews('n.guest',{w:g.name,c:catLabel(g),n:wks(weeks)})}
function dropGuest(g){
 G.card.forEach(m=>{['a','b'].forEach(s=>{m[s]=m[s].map(x=>x===g.id?'':x)})});
 G.promos.forEach(p=>{if(p.a===g.id)p.a='';if(p.b===g.id)p.b=''});
 G.ws=G.ws.filter(x=>x!==g)}
function guestFx(){
 const ap=guestsHired().filter(w=>w.wrestled),pl=media().p,strm=pl==='yt'||pl==='twitch'||pl==='kick';let rt=0,mul=0,pp=0;
 ap.forEach(g=>{const nov=1-Math.min(.5,(g.apps||0)*.08);let v=g.fame/100*CATM[g.ext]*nov;
  if(g.ext==='influencer')v*=strm?1.5:.7;if(g.movie||g.hit)v*=1.25;
  rt+=v*.25;mul+=v*.18;pp+=v*.4;g.apps=(g.apps||0)+1});
 return{n:ap.length,rt:Math.min(.5,rt),mul:Math.min(.5,mul),pp:Math.min(1.5,pp),names:ap.map(g=>g.name)}}

/* ----- markets ----- */
function refreshMarkets(force){
 const tr=G.fed.tier;G.smarket=G.smarket||[];G.gmarket=G.gmarket||[];
 if(force||G.week%4===1||!G.smarket.length){G.smarket=[];SROLES.forEach(r=>{for(let i=0;i<5;i++)G.smarket.push(mkStaff(r,clamp(tr+(rnd()<.25?1:0)-(rnd()<.2?1:0),1,5)))})}
 if(force||G.week%3===0||!G.gmarket.length){G.gmarket=[];const cats=shuffle(GCATS.concat(GCATS,GCATS)).slice(0,Math.max(12,GCATS.length*2));cats.forEach(c=>G.gmarket.push(mkGuest(c,Math.max(1,tr+(rnd()<.3?1:0)-(rnd()<.3?1:0)))))}}
function mkLegend(){
 const cc=pickR(COUNTRIES),fem=rnd()<.3,st=pickR(STYLES),b=SBIAS[st],base=34+rnd()*28,pop=30+Math.floor(rnd()*36);
 const w={id:'x'+(G.uid++),name:nameFor(cc,fem),country:cc,style:st,role:pickR(['face','heel','tweener']),ring:clamp(Math.round(base+b.ring),20,85),mic:clamp(Math.round(base-4+b.mic+(rnd()-.5)*20),15,85),cha:clamp(Math.round(base+b.cha+(rnd()-.5)*20),15,85),pop,age:41+Math.floor(rnd()*16),fed:'RET',contract:0,injury:0,look:randLook(Math.random,cc,fem),acc:0};
 if(fem)w.g='f';genStats(w,Math.random);w.salary=salaryOf(w,1);return w}
function initExtras(){fillFA(190);G.cal=G.cal||{};G.prizes=G.prizes||defaultPrizes();G.tours=G.tours||[];G.staff=G.staff||[];G.pendingRet=G.pendingRet||[];G.smarket=[];G.gmarket=[];if(!G.ws.some(w=>w.fed==='RET'))for(let i=0;i<4;i++)G.ws.push(mkLegend());refreshMarkets(true)}
const legends=()=>G.ws.filter(w=>w.fed==='RET'&&!w.staffed);

/* ----- weekly ticks (sync, called from endWeek) ----- */
function staffWeekly(){
 G.pendingRet=G.pendingRet||[];
 (G.staff||[]).forEach(s=>s.contract--);
 G.staff=(G.staff||[]).filter(s=>{if(s.temp&&s.contract<=0){addNews('n.stafftemp',{w:s.name,r:t('sr.'+s.role)});return false}return true});
 guestsHired().forEach(g=>{if(g.injury>0)g.injury--;g.fatigue=Math.max(0,g.fatigue-(g.wrestled?9:16));g.wrestled=false;g.contract--;
  if(g.contract<=0){addNews('n.guestend',{w:g.name});dropGuest(g)}});
 mine().forEach(w=>{if(w.farewell){w.farewell.left--;if(w.farewell.left<=0&&G.pendingRet.indexOf(w.id)<0)G.pendingRet.push(w.id)}});
 if((G.week-1)%52===0)G.ws.forEach(w=>{ // veterans outside the roster slowly retire (supply of legends)
  if(w.ext||w.fed==='RET'||w.fed===G.fed.id)return;
  const rv=w.fed!=='FA'?G.ws.filter(x=>x.fed===w.fed).length:99;
  if(w.age>=(w.fed==='FA'?36:40)&&rv>9&&rnd()<.2){w.fed='RET'}});
 refreshMarkets(false)}

/* ----- retirement ----- */
const FW_OPTS=[0,4,13,52];
function retireWill(w){return clamp(.12+(w.age-30)*.045+(w.injury>6?.15:0)-(w.pop-40)*.003+(60-w.morale)*.002+(w.loyal-50)*.001,.03,.95)}
function retAnswer(w,weeks,role){
 const p=retireWill(w);const fit=role?staffFit(w,role):100;
 if(role&&fit<30&&rnd()<.7){const alt=bestRole(w,true);return{res:'counter',weeks,role:fit<30&&alt&&staffFit(w,alt)>fit?alt:'',why:'role'}}
 const r=rnd();
 if(r<p)return{res:'ok',weeks,role};
 if(r<p+(1-p)*.45){
  let cw=weeks,cr=role;
  if(weeks<52&&rnd()<.6)cw=weeks<13?13:52;else if(!role&&rnd()<.6)cr=bestRole(w,true);
  if(cw===weeks&&cr===role)cw=weeks<52?52:13;
  return{res:'counter',weeks:cw,role:cr,why:cw!==weeks?'time':'role'}}
 return{res:'no'}}
function startFarewell(w,weeks,role){
 if(role&&staffFull(role)){role='';addNews('n.rolefull')}
 if(weeks<=0){finishRetire(w,role);return}
 w.farewell={left:weeks,total:weeks,role:role||''};w.contract=Math.max(w.contract,weeks+1);w.morale=clamp(w.morale+4,0,100);
 addNews('n.farewell',{w:w.name,n:wks(weeks)})}
function finishRetire(w,role){
 if(role&&staffFull(role))role='';
 let s=null;if(role)s=toStaff(w,role);
 delete w.farewell;w.fed='RET';addNews(s?'n.retstaff':'n.retire2',{w:w.name,r:s?t('sr.'+role):''});purgeW(w.id)}

/* ----- events (async, called from endWeek) ----- */
async function farewellEvent(w){
 const f=w.farewell,T=tdNow();const kinds=['lastmatch','tribute','merch'];if(w.injury<=0)kinds.push('hurt');if(f.total>=13)kinds.push('comeback');
 const k=pickR(kinds),x={w:w.name,m:''};let o;
 if(k==='lastmatch'){const z=mine().filter(y=>y.id!==w.id&&!y.farewell&&y.pop<w.pop).sort((a,b)=>b.pop-a.pop)[0];x.z=z?z.name:'—';
  o=await askGeneric(t('rt.e.lastmatch.t'),t('rt.e.lastmatch.b',x),[{l:t('rt.e.lastmatch.1')},{l:t('rt.e.lastmatch.2'),dis:!z}]);
  if(o===0){w.pop=clamp(w.pop+1.5,1,100);w.morale=clamp(w.morale+6,0,100)}else if(z){z.pop=clamp(z.pop+2,1,100);w.morale=clamp(w.morale-4,0,100);G.fed.pop=clamp(G.fed.pop+.3,2,100)}}
 else if(k==='tribute'){const c=Math.round(T.prod*.5);x.m=money(c);
  o=await askGeneric(t('rt.e.tribute.t'),t('rt.e.tribute.b',x),[{l:t('rt.e.tribute.1',x),dis:G.fed.cash<c},{l:t('rt.e.tribute.2')}]);
  if(o===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1.2,2,100);w.morale=clamp(w.morale+5,0,100);addNews('n.tribute',{w:w.name})}}
 else if(k==='merch'){const gain=Math.round(T.price*T.cap*.15);x.m=money(gain);
  o=await askGeneric(t('rt.e.merch.t'),t('rt.e.merch.b',x),[{l:t('rt.e.merch.1',x)},{l:t('rt.e.merch.2')}]);
  if(o===0){G.fed.cash+=gain;G.fed.pop=clamp(G.fed.pop-.2,2,100)}else w.morale=clamp(w.morale+3,0,100)}
 else if(k==='hurt'){
  o=await askGeneric(t('rt.e.hurt.t'),t('rt.e.hurt.b',x),[{l:t('rt.e.hurt.1')},{l:t('rt.e.hurt.2')}]);
  if(o===0){f.left=0;if(G.pendingRet.indexOf(w.id)<0)G.pendingRet.push(w.id)}else{w.injury=4;w.pop=clamp(w.pop+1,1,100)}}
 else if(k==='comeback'){const rv=pickR(G.rivals),c=w.salary*10;x.f=rv.name;x.m=money(c);
  o=await askGeneric(t('rt.e.comeback.t'),t('rt.e.comeback.b',x),[{l:t('rt.e.comeback.1',x),dis:G.fed.cash<c},{l:t('rt.e.comeback.2')}]);
  if(o===0){G.fed.cash-=c;delete w.farewell;w.contract=52;w.morale=clamp(w.morale+8,0,100);addNews('n.unretire',{w:w.name})}}}
async function ceremony(w){
 const f=w.farewell||{role:''};const c=Math.round(tdNow().prod*.4);
 const i=await askGeneric(t('rt.cer.t'),t('rt.cer.b',{w:w.name,r:f.role?t('sr.'+f.role):'—'}),[{l:t('rt.cer.1',{m:money(c)}),dis:G.fed.cash<c},{l:t('rt.cer.2')}]);
 if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1,2,100);mine().forEach(x=>{x.morale=clamp(x.morale+1.5,0,100)})}
 finishRetire(w,f.role)}
async function retireRequest(w){
 const role=bestRole(w,true),m=w.salary*8;
 const opts=[{l:t('rt.req.1')},{l:role?t('rt.req.2',{r:t('sr.'+role)}):t('rt.req.2b'),dis:false},{l:t('rt.req.3',{m:money(m)}),dis:G.fed.cash<m},{l:t('rt.req.4')}];
 const i=await askGeneric(t('rt.req.t'),t('rt.req.b',{w:w.name,a:w.age}),opts);
 if(i===0)startFarewell(w,13,'');else if(i===1)startFarewell(w,4,role);
 else if(i===2){G.fed.cash-=m;w.contract=Math.max(w.contract,26);w.morale=clamp(w.morale-4,0,100);w.retCD=G.week+30}
 else{finishRetire(w,'');G.fed.pop=clamp(G.fed.pop-.1,2,100)}}
async function hireOffer(){
 const T=tdNow(),tr=G.fed.tier;
 const kinds=['local','local','movie','album','sport','strong','builder','influ','coach','ref','comm','ann','wlocal'];
 const k=pickR(kinds);
 const gOffer=async(cat,disc,x,bonus)=>{
  const g=mkGuest(cat,tr);const p1=Math.round(guestFee(g,1)*(1-disc)/10)*10,p4=Math.round(guestFee(g,4)*(1-disc)/10)*10;
  x=Object.assign({n:g.name,c:catLabel(g),co:cn(G.fed.country),f:g.film||'',s:catLabel(g),p:platName(media().p),d:Math.round(disc*100)},x||{});
  const full=guestFull();
  const i=await askGeneric(t('ev.h.'+k+'.t'),t('ev.h.'+k+'.b',x),[{l:t('ev.h.one',{m:money(p1)}),dis:full||G.fed.cash<p1},{l:t('ev.h.month',{m:money(p4)}),dis:full||G.fed.cash<p4},{l:t('ev.h.no')}]);
  if(i===2)return;
  if(k==='movie')g.movie=true;
  hireGuest(g,i===0?1:4,i===0?p1:p4);
  if(bonus)bonus(g,i);};
 if(k==='local')return gOffer(pickR(GCATS),.4);
 if(k==='movie')return gOffer('actor',.55);
 if(k==='album')return gOffer('singer',.45,null,(g)=>{const c=Math.round(T.price*T.cap*.05);G.fed.cash+=c;addNews('n.merchbump',{m:money(c)})});
 if(k==='sport')return gOffer('athlete',.35);
 if(k==='strong'){const top=mine().sort((a,b)=>b.str-a.str)[0];if(!top)return;return gOffer('strong',.3,{w:top.name},()=>{top.pop=clamp(top.pop+.8,1,100)})}
 if(k==='builder'){const spon=Math.round(T.price*T.cap*.08);return gOffer('builder',.25,{m:money(spon)},()=>{G.fed.cash+=spon;addNews('n.sponsorg',{m:money(spon)})})}
 if(k==='influ')return gOffer('influencer',.5);
 if(k==='wlocal'){
  const fa=G.ws.filter(w=>w.fed==='FA'&&w.pop>=Math.max(8,G.fed.pop*.35)).sort((a,b)=>b.pop-a.pop)[0];
  if(!fa||mine().length>=ROSTERMAX[tr-1])return;const fee=Math.round(salaryOf(fa,tr)*4/10)*10;
  const i=await askGeneric(t('ev.h.wlocal.t'),t('ev.h.wlocal.b',{w:fa.name,co:cn(G.fed.country),m:money(fee)}),[{l:t('ev.h.sign',{m:money(fee)}),dis:G.fed.cash<fee},{l:t('ev.h.no')}]);
  if(i===0){G.fed.cash-=fee;fa.fed=G.fed.id;fa.salary=salaryOf(fa,tr);fa.contract=52;fa.acc=accStart(fa.country,G.fed.country);fa.morale=70;fa.fatigue=0;addNews('n.sign',{w:fa.name});}
  return}
 // temporary staff
 const role=k,s=mkStaff(role,Math.min(5,tr+1));s.lvl=clamp(s.lvl+12,15,96);s.temp=true;s.contract={coach:4,ref:4,comm:2,ann:1}[role];s.salary=Math.round(staffSal(role,s.lvl,tr)*.6/10)*10;
 const full=staffFull(role);
 const i=await askGeneric(t('ev.h.'+role+'.t'),t('ev.h.'+role+'.b',{n:s.name,l:s.lvl,w:wks(s.contract),m:money(s.salary)}),[{l:t('ev.h.trial',{w:wks(s.contract),m:money(s.salary)}),dis:full},{l:t('ev.h.no')}]);
 if(i===0){G.staff.push(s);addNews('n.stafftrial',{w:s.name,r:t('sr.'+role)})}}
async function staffEvents(){
 G.pendingRet=G.pendingRet||[];
 // staff contracts
 for(const s of (G.staff||[]).slice()){
  if(s.contract<=0&&!s.temp){const c=s.salary*6;
   const i=await askGeneric(t('ev.scontract.t'),t('ev.scontract.b',{w:s.name,r:t('sr.'+s.role),l:s.lvl}),[{l:t('ev.scontract.1',{m:money(c)}),dis:G.fed.cash<c},{l:t('ev.scontract.2')}]);
   if(i===0){G.fed.cash-=c;s.contract=52}else{G.staff=G.staff.filter(x=>x!==s);addNews('n.stafffire',{w:s.name})}}}
 // farewell finishes
 for(const id of G.pendingRet.slice()){const w=W(id);G.pendingRet=G.pendingRet.filter(x=>x!==id);if(w&&w.fed===G.fed.id&&w.farewell)await ceremony(w)}
 // events from retirement
 const fw=mine().filter(w=>w.farewell&&w.farewell.left>0&&w.farewell.total>=4);
 if(fw.length&&rnd()<.14)await farewellEvent(pickR(fw));
 const old=mine().filter(w=>!w.farewell&&w.age>=35&&!(w.retCD>G.week));
 if(old.length&&rnd()<.35){const w=pickR(old);if(rnd()<.012*(w.age-33)*(w.injury>4?1.6:1))await retireRequest(w)}
 if(rnd()<.38)await hireOffer();
}

function ensureExtras(){migrateTitles();G.prizes=G.prizes||defaultPrizes();G.tours=G.tours||[];if(!G.staff||!G.smarket||!G.gmarket)initExtras();G.pendingRet=G.pendingRet||[];fillFA(190);G.cal=G.cal||{};G.rk=G.rk||{f:'all',s:'ovr',g:'all'};G.staff.forEach(s=>{if(!isFinite(s.salary))s.salary=staffSal(s.role,s.lvl||30,G.fed.tier)});G.smarket=G.smarket.filter(s=>isFinite(s.salary));if(G.smarket.length<20||G.gmarket.length<12)refreshMarkets(true)}

/* ============ Belt graphics, presets, flags ============ */
const BPATS=['plain','stripe','dual','checker','zigzag','diamond','dots','wave','stitch','barbed'];
const BSHAPES=['oval','round','shield','diamond','hex','octagon','star','rect'];
const SSHAPES=['rect','round','diamond','hex','shield'];
const BEMBS=['letter','star','skull','crown','bolt','flag','none'];
const SEMBS=['gem','star','flag','mix','none'];
const FLAGS=['eu','pl','de','fr','it','es','gb','us','jp','br','mx','ca'];
const EUMIX=['pl','de','fr','it','es','gb'];
const BELTKEYS=['strap','strap2','pat','plate','mainShape','mainEmb','flag','sideN','sideShape','sideEmb','worn'];
const BPRESETS={
 euro:{teams:1,prestige:4,strap:'#1f3f8a',strap2:'#f5d130',pat:'dual',plate:'gold',mainShape:'shield',mainEmb:'flag',flag:'eu',sideN:3,sideShape:'rect',sideEmb:'mix',worn:false},
 hardcore:{teams:1,prestige:2,strap:'#1a1a1a',strap2:'#b8b8b8',pat:'barbed',plate:'rust',mainShape:'octagon',mainEmb:'skull',flag:'eu',sideN:1,sideShape:'diamond',sideEmb:'none',worn:true},
 classic:{teams:1,prestige:5,strap:'#8a1c1c',strap2:'#f2c94c',pat:'stripe',plate:'gold',mainShape:'oval',mainEmb:'letter',flag:'eu',sideN:1,sideShape:'rect',sideEmb:'gem',worn:false},
 heritage:{teams:1,prestige:3,strap:'#6b4423',strap2:'#e8c98a',pat:'stitch',plate:'bronze',mainShape:'round',mainEmb:'crown',flag:'eu',sideN:2,sideShape:'rect',sideEmb:'gem',worn:false},
 ultra:{teams:1,prestige:3,strap:'#1a1a1a',strap2:'#13a89e',pat:'zigzag',plate:'blue',mainShape:'hex',mainEmb:'bolt',flag:'eu',sideN:2,sideShape:'hex',sideEmb:'star',worn:false},
 women:{teams:1,prestige:4,g:'f',strap:'#c4358a',strap2:'#ffffff',pat:'wave',plate:'rose',mainShape:'round',mainEmb:'star',flag:'eu',sideN:2,sideShape:'round',sideEmb:'gem',worn:false},
 tag:{teams:2,prestige:3,strap:'#1d6b4f',strap2:'#f2c94c',pat:'checker',plate:'silver',mainShape:'shield',mainEmb:'none',flag:'eu',sideN:1,sideShape:'rect',sideEmb:'gem',worn:false},
 national:{teams:1,prestige:3,strap:'#e8e6df',strap2:'#d4213d',pat:'stripe',plate:'silver',mainShape:'shield',mainEmb:'flag',flag:'pl',sideN:2,sideShape:'round',sideEmb:'flag',worn:false}};
const BPRESET_IDS=Object.keys(BPRESETS);
function flagSvg(id,x,y,w,h){
 const R=(a,b,c,d,f)=>'<rect x="'+(x+a*w).toFixed(2)+'" y="'+(y+b*h).toFixed(2)+'" width="'+(c*w).toFixed(2)+'" height="'+(d*h).toFixed(2)+'" fill="'+f+'"/>';
 const C=(a,b,r,f)=>'<circle cx="'+(x+a*w).toFixed(2)+'" cy="'+(y+b*h).toFixed(2)+'" r="'+Math.max(.4,r).toFixed(2)+'" fill="'+f+'"/>';
 let s='';
 if(id==='eu'){s=R(0,0,1,1,'#1d3f9a');for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=C(.5+Math.cos(a)*.32*h/w,.5+Math.sin(a)*.32,h*.07,'#f5d130')}}
 else if(id==='pl')s=R(0,0,1,.5,'#f2f2f2')+R(0,.5,1,.5,'#d4213d');
 else if(id==='de')s=R(0,0,1,.34,'#111')+R(0,.33,1,.34,'#d00')+R(0,.66,1,.34,'#ffce00');
 else if(id==='fr')s=R(0,0,.34,1,'#1f3fa8')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#d6232c');
 else if(id==='it')s=R(0,0,.34,1,'#169b3f')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#d6232c');
 else if(id==='es')s=R(0,0,1,1,'#c60b1e')+R(0,.25,1,.5,'#ffc400');
 else if(id==='gb')s=R(0,0,1,1,'#1f2f7a')+'<path d="M'+x+','+y+' L'+(x+w)+','+(y+h)+' M'+(x+w)+','+y+' L'+x+','+(y+h)+'" stroke="#fff" stroke-width="'+(h*.22).toFixed(2)+'"/>'+R(0,.38,1,.24,'#fff')+R(.4,0,.2,1,'#fff')+R(0,.44,1,.12,'#c8102e')+R(.44,0,.12,1,'#c8102e');
 else if(id==='us'){for(let i=0;i<7;i++)s+=R(0,i/7,1,1/7,i%2?'#f4f4f4':'#b22234');s+=R(0,0,.45,4/7,'#3c3b6e')}
 else if(id==='jp')s=R(0,0,1,1,'#f4f4f4')+C(.5,.5,h*.3,'#bc002d');
 else if(id==='br')s=R(0,0,1,1,'#119a48')+'<polygon points="'+[[.5,.12],[.9,.5],[.5,.88],[.1,.5]].map(p=>(x+p[0]*w).toFixed(2)+','+(y+p[1]*h).toFixed(2)).join(' ')+'" fill="#fedf00"/>'+C(.5,.5,h*.2,'#1f3f8a');
 else if(id==='mx')s=R(0,0,.34,1,'#006847')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#ce1126')+C(.5,.5,h*.12,'#8a5a2b');
 else if(id==='ca')s=R(0,0,.25,1,'#d52b1e')+R(.25,0,.5,1,'#f4f4f4')+R(.75,0,.25,1,'#d52b1e')+C(.5,.5,h*.16,'#d52b1e');
 return s+'<rect x="'+x.toFixed(2)+'" y="'+y.toFixed(2)+'" width="'+w.toFixed(2)+'" height="'+h.toFixed(2)+'" fill="none" stroke="#000" stroke-opacity=".45" stroke-width=".6"/>'}
function shp(k,cx,cy,rx,ry,ex){
 const P=a=>'<polygon points="'+a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+'" '+ex+'/>';
 if(k==='round')return '<circle cx="'+cx+'" cy="'+cy+'" r="'+Math.min(rx,ry).toFixed(1)+'" '+ex+'/>';
 if(k==='rect')return '<rect x="'+(cx-rx).toFixed(1)+'" y="'+(cy-ry*.86).toFixed(1)+'" width="'+(rx*2).toFixed(1)+'" height="'+(ry*1.72).toFixed(1)+'" rx="4" '+ex+'/>';
 if(k==='diamond')return P([[cx,cy-ry],[cx+rx,cy],[cx,cy+ry],[cx-rx,cy]]);
 if(k==='hex')return P([[cx-rx,cy],[cx-rx/2,cy-ry],[cx+rx/2,cy-ry],[cx+rx,cy],[cx+rx/2,cy+ry],[cx-rx/2,cy+ry]]);
 if(k==='octagon'){const a=.42;return P([[cx-rx*a,cy-ry],[cx+rx*a,cy-ry],[cx+rx,cy-ry*a],[cx+rx,cy+ry*a],[cx+rx*a,cy+ry],[cx-rx*a,cy+ry],[cx-rx,cy+ry*a],[cx-rx,cy-ry*a]])}
 if(k==='star'){const pts=[];for(let i=0;i<20;i++){const a=i/20*Math.PI*2-Math.PI/2,m=i%2?.8:1;pts.push([cx+Math.cos(a)*rx*m,cy+Math.sin(a)*ry*m])}return P(pts)}
 if(k==='shield')return '<path d="M'+(cx-rx)+','+(cy-ry*.88)+' L'+(cx+rx)+','+(cy-ry*.88)+' L'+(cx+rx)+','+(cy+ry*.1)+' Q'+(cx+rx)+','+(cy+ry)+' '+cx+','+(cy+ry)+' Q'+(cx-rx)+','+(cy+ry)+' '+(cx-rx)+','+(cy+ry*.1)+' Z" '+ex+'/>';
 return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" '+ex+'/>'}
function strapPat(p,c){
 let s='';
 if(p==='stripe')s='<rect x="0" y="31" width="160" height="4" fill="'+c+'"/>';
 else if(p==='dual')s='<rect x="0" y="22.5" width="160" height="2.5" fill="'+c+'"/><rect x="0" y="41" width="160" height="2.5" fill="'+c+'"/>';
 else if(p==='checker'){for(let i=0;i<40;i++){const o=i%2?4:0;s+='<rect x="'+i*4+'" y="'+(21+o)+'" width="4" height="4" fill="'+c+'"/><rect x="'+i*4+'" y="'+(37+4-o)+'" width="4" height="4" fill="'+c+'"/>'}}
 else if(p==='zigzag'){let d='M0,33';for(let i=0;i<=32;i++)d+=' L'+i*5+','+(i%2?27:39);s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="2" stroke-linejoin="round"/>'}
 else if(p==='diamond'){for(let i=0;i<16;i++)s+='<polygon points="'+(i*10+5)+',27 '+(i*10+10)+',33 '+(i*10+5)+',39 '+(i*10)+',33" fill="'+c+'"/>'}
 else if(p==='dots'){for(let i=0;i<20;i++)s+='<circle cx="'+(i*8+4)+'" cy="'+(i%2?29:37)+'" r="1.8" fill="'+c+'"/>'}
 else if(p==='wave'){let d='M0,33';for(let i=0;i<=40;i++)d+=' L'+i*4+','+(33+Math.sin(i*.9)*5).toFixed(1);s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="2.2"/>'}
 else if(p==='stitch')s='<line x1="0" y1="24" x2="160" y2="24" stroke="'+c+'" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="0" y1="42" x2="160" y2="42" stroke="'+c+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
 else if(p==='barbed'){let d='M0,33';for(let i=0;i<=40;i++)d+=' L'+i*4+','+(33+(i%2?2.5:-2.5));s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="1.3"/>';for(let i=0;i<16;i++){const x=i*10+5;s+='<path d="M'+(x-3)+',29 L'+(x+3)+',37 M'+(x+3)+',29 L'+(x-3)+',37" stroke="'+c+'" stroke-width="1.1"/>'}}
 return s}
function embSvg(k,cx,cy,sc,pl,tt,nm){
 if(k==='letter')return '<text x="'+cx+'" y="'+(cy+5*sc)+'" text-anchor="middle" font-family="Russo One,Impact,sans-serif" font-size="'+(15*sc).toFixed(1)+'" fill="'+pl[1]+'">'+esc(nm)+'</text>';
 const f='fill="'+pl[1]+'"';
 if(k==='star'){const pts=[];for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=(i%2?4:10)*sc;pts.push((cx+Math.cos(a)*r).toFixed(1)+','+(cy+Math.sin(a)*r+1).toFixed(1))}return '<polygon points="'+pts.join(' ')+'" '+f+'/>'}
 if(k==='skull')return '<circle cx="'+cx+'" cy="'+(cy-1.5*sc)+'" r="'+6.5*sc+'" '+f+'/><rect x="'+(cx-3.5*sc)+'" y="'+(cy+3*sc)+'" width="'+7*sc+'" height="'+4.5*sc+'" '+f+'/><circle cx="'+(cx-2.6*sc)+'" cy="'+(cy-1.5*sc)+'" r="'+1.9*sc+'" fill="'+pl[0]+'"/><circle cx="'+(cx+2.6*sc)+'" cy="'+(cy-1.5*sc)+'" r="'+1.9*sc+'" fill="'+pl[0]+'"/><rect x="'+(cx-1.5*sc)+'" y="'+(cy+4*sc)+'" width="'+sc+'" height="'+2.5*sc+'" fill="'+pl[0]+'"/><rect x="'+(cx+.5*sc)+'" y="'+(cy+4*sc)+'" width="'+sc+'" height="'+2.5*sc+'" fill="'+pl[0]+'"/>';
 if(k==='crown'){const P=[[-8,6],[-8,-4],[-4,1],[0,-7],[4,1],[8,-4],[8,6]].map(p=>(cx+p[0]*sc).toFixed(1)+','+(cy+p[1]*sc).toFixed(1)).join(' ');return '<polygon points="'+P+'" '+f+'/>'}
 if(k==='bolt'){const P=[[2,-10],[-5,1],[-1,1],[-3,10],[5,-2],[1,-2]].map(p=>(cx+p[0]*sc).toFixed(1)+','+(cy+p[1]*sc).toFixed(1)).join(' ');return '<polygon points="'+P+'" '+f+'/>'}
 if(k==='flag')return flagSvg(tt.flag||'eu',cx-11*sc,cy-7*sc,22*sc,14*sc);
 return ''}
function wornSvg(cx,cy,rx,ry){
 const X=(a,b)=>(cx+a*rx).toFixed(1)+','+(cy+b*ry).toFixed(1);
 return '<ellipse cx="'+(cx+rx*.45).toFixed(1)+'" cy="'+(cy-ry*.4).toFixed(1)+'" rx="'+(rx*.24).toFixed(1)+'" ry="'+(ry*.2).toFixed(1)+'" fill="#8a3f14" opacity=".55"/><ellipse cx="'+(cx-rx*.5).toFixed(1)+'" cy="'+(cy+ry*.4).toFixed(1)+'" rx="'+(rx*.2).toFixed(1)+'" ry="'+(ry*.16).toFixed(1)+'" fill="#8a3f14" opacity=".5"/>'+
  '<ellipse cx="'+(cx-rx*.1).toFixed(1)+'" cy="'+(cy+ry*.1).toFixed(1)+'" rx="'+(rx*.3).toFixed(1)+'" ry="'+(ry*.22).toFixed(1)+'" fill="#000" opacity=".16"/>'+
  '<polyline points="'+[X(-.5,-.75),X(-.25,-.25),X(-.42,.1),X(-.1,.5),X(-.22,.86)].join(' ')+'" fill="none" stroke="#1a0f00" stroke-width="1.5" stroke-linejoin="bevel"/>'+
  '<polyline points="'+[X(.62,-.45),X(.34,0),X(.52,.38),X(.4,.7)].join(' ')+'" fill="none" stroke="#1a0f00" stroke-width="1.2" stroke-linejoin="bevel"/>'+
  '<path d="M'+X(.1,-.8)+' L'+X(.3,-.55)+' M'+X(-.7,.1)+' L'+X(-.55,.3)+' M'+X(.2,.6)+' L'+X(.45,.7)+'" stroke="#fff" stroke-opacity=".45" stroke-width=".9"/>'}
function belt(tt,w){
 w=w||160;const st=tt.strap||'#1a1a1a',st2=tt.strap2||'#f2c94c',pl=PLATE[tt.plate]||PLATE.gold,tag=tt.teams===2;
 const ms=tt.mainShape||'oval',ss=tt.sideShape||'rect',sn=tt.sideN==null?1:tt.sideN,me=tt.mainEmb||(tag?'none':'letter'),se=tt.sideEmb||'gem';
 let s='<rect x="0" y="20" width="160" height="26" rx="4" fill="'+st+'"/>'+strapPat(tt.pat||'plain',st2)+'<rect x="0" y="23" width="160" height="2" fill="#fff" opacity=".2"/><rect x="0" y="41" width="160" height="2" fill="#000" opacity=".3"/>';
 const mains=tag?[[54,22,26],[106,22,26]]:[[80,34,30]];
 const left=mains[0][0]-mains[0][1],right=mains[mains.length-1][0]+mains[mains.length-1][1];
 const nm=(titleName(tt).replace(/[^A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż ]/g,'').trim().charAt(0)||'★').toUpperCase();
 if(sn>0)[[-1,left],[1,right]].forEach(([dir,edge])=>{
  const av=dir<0?edge-3:157-edge,gap=2,pw=clamp((av-gap*(sn-1))/sn,6,15),ph=pw<10?26:34;
  for(let i=0;i<sn;i++){const cx=dir<0?edge-3-pw/2-i*(pw+gap):edge+3+pw/2+i*(pw+gap);
   s+=shp(ss,cx,33,pw/2,ph/2,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="1.8"');
   if(se==='gem')s+='<circle cx="'+cx+'" cy="33" r="'+(pw*.26).toFixed(1)+'" fill="'+pl[1]+'"/>';
   else if(se==='star')s+=embSvg('star',cx,33,pw/22,pl,tt,nm);
   else if(se==='flag'||se==='mix'){const id=se==='mix'?EUMIX[(i+(dir>0?3:0))%EUMIX.length]:(tt.flag||'eu');s+=flagSvg(id,cx-pw*.36,33-pw*.26,pw*.72,pw*.52)}}});
 mains.forEach(([cx,rx,ry])=>{
  s+=shp(ms,cx,33,rx,ry,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="3"')+shp(ms,cx,33,rx-7,ry-7,'fill="none" stroke="'+pl[1]+'" stroke-width="1.5"');
  s+=embSvg(me,cx,33,tag?.65:1,pl,tt,nm);
  if(tt.worn)s+=wornSvg(cx,33,rx,ry)});
 const p=clamp(Math.round(prestOf(tt)),1,5);
 for(let k=0;k<p;k++){const cx=80+(k-(p-1)/2)*9;s+='<circle cx="'+cx+'" cy="'+(tag?33:50)+'" r="2.8" fill="#d83a3a" stroke="#fff" stroke-width=".7"/>'}
 return '<svg viewBox="0 0 160 66" width="'+w+'" height="'+Math.round(w*66/160)+'" role="img" aria-label="'+esc(titleName(tt))+'">'+s+'</svg>'}

/* ============ Prizes, opportunity items, tournaments ============ */
const PKINDS=['case','contract','medal','key','ticket','ring','cup','crown'];
const POPP=['case','contract','medal','key','ticket'];
const isOpp=k=>POPP.indexOf(k)>=0;
const prizeOf=id=>(G.prizes||[]).find(p=>p.id===id);
const prizeName=p=>p.name||t('pz.def.'+p.kind);
function defaultPrizes(){const o=[{id:'pzc',kind:'cup',name:null,plate:'gold',target:'',life:0,holder:'',since:0,exp:0,wins:0}];
 if(G.fed.tier>=2)o.unshift({id:'pzb',kind:'case',name:null,plate:'black',target:'',life:52,holder:'',since:0,exp:0,wins:0});return o}
function awardPrize(pz,wi){
 const w=W(wi[0]);if(!w)return;pz.holder=w.id;pz.since=G.week;pz.wins=(pz.wins||0)+1;pz.exp=isOpp(pz.kind)&&pz.life?G.week+pz.life:0;
 w.pop=clamp(w.pop+(isOpp(pz.kind)?.8:1.5),1,100);w.morale=clamp(w.morale+4,0,100);
 G.reigns.unshift({name:prizeName(pz),w:[w.id],week:G.week});addNews('n.prizewin',{w:w.name,p:prizeName(pz)})}
function cashOk(m,pz){
 if(!pz||!pz.holder||!isOpp(pz.kind)||!m.title)return false;const tt=titleOf(m.title);if(!tt)return false;
 if(pz.target&&pz.target!==m.title)return false;const s=sides(m);if(s.A.concat(s.B).indexOf(pz.holder)<0)return false;
 return tt.holders.indexOf(pz.holder)<0}
const cashOpts=m=>(G.prizes||[]).filter(p=>cashOk(m,p));
function cashIn(m,wi,fin){
 const pz=prizeOf(m.cash);if(!pz)return;const tt=titleOf(m.title);if(!tt)return;
 const won=wi.indexOf(pz.holder)>=0&&(fin==='clean'||fin==='dirty'),w=W(pz.holder);
 addNews(won?'n.cashwin':'n.cashfail',{w:w?w.name:'?',p:prizeName(pz),t:titleName(tt)});pz.holder='';pz.exp=0}
function prizeTick(){
 (G.prizes||[]).forEach(p=>{if(p.holder&&!W(p.holder))p.holder='';
  if(p.holder&&p.exp&&G.week>=p.exp){addNews('n.prizeexp',{w:W(p.holder).name,p:prizeName(p)});p.holder='';p.exp=0}});
 tourTick()}
/* tournaments */
const TSIZES=[4,8,16];
const validP=id=>!!W(id)&&W(id).fed===G.fed.id;
function tourRoundName(tr,r){const n=tr.rounds[r].length;return n===1?t('tr.final'):n===2?t('tr.semi'):n===4?t('tr.quarter'):t('tr.round',{n:r+1})}
function mkTour(o){
 const pool=healthy().filter(w=>!w.ext&&(o.gen==='x'||((o.gen==='f')===isF(w.id)))).sort((a,b)=>b.pop-a.pop).slice(0,o.n);
 if(pool.length<o.n)return null;let ids=pool.map(w=>w.id);
 if(o.seed==='rand')ids=shuffle(ids);else{const h=[];for(let i=0;i<ids.length/2;i++)h.push(ids[i],ids[ids.length-1-i]);ids=h}
 const R0=[];for(let i=0;i<ids.length;i+=2)R0.push({a:ids[i],b:ids[i+1],w:''});
 return{id:'TR'+(G.uid++),name:o.name,n:o.n,gen:o.gen,prize:o.prize||'',rounds:[R0],r:0,done:false,winner:'',wk:G.week}}
function tourProgress(tr){
 for(;;){const R=tr.rounds[tr.r];if(R.some(x=>!x.w))return;
  if(R.length===1){tr.done=true;tr.winner=R[0].w;const w=W(tr.winner),pz=tr.prize?prizeOf(tr.prize):null;
   if(w){w.pop=clamp(w.pop+2.5,1,100);w.morale=clamp(w.morale+6,0,100);G.fed.pop=clamp(G.fed.pop+.4,2,100)}
   G.reigns.unshift({name:tr.name,w:[tr.winner],week:G.week});addNews('n.tourwin',{w:w?w.name:'?',t:tr.name});if(pz&&w)awardPrize(pz,[tr.winner]);return}
  const nx=[];for(let i=0;i<R.length;i+=2)nx.push({a:R[i].w,b:R[i+1].w,w:''});tr.rounds.push(nx);tr.r++}}
function tourAdvance(m,wi){
 const tr=(G.tours||[]).find(x=>x.id===m.tour.tid);if(!tr||tr.done)return;
 const mt=tr.rounds[m.tour.r]&&tr.rounds[m.tour.r][m.tour.i];if(!mt||mt.w||!wi.length)return;mt.w=wi[0];tourProgress(tr)}
function tourWO(tr,r,i,side){const mt=tr.rounds[r]&&tr.rounds[r][i];if(!mt||mt.w||tr.r!==r)return;mt.w=mt[side];tourProgress(tr)}
function tourTick(){
 (G.tours||[]).filter(x=>!x.done).forEach(tr=>{
  tr.rounds[tr.r].forEach(mt=>{if(mt.w)return;const va=validP(mt.a),vb=validP(mt.b);if(!va||!vb)mt.w=va?mt.a:vb?mt.b:mt.a});
  tourProgress(tr)});
 G.tours=(G.tours||[]).filter((x,i,a)=>!x.done||a.filter(y=>y.done).indexOf(x)<4)}
const tourOnCard=(tr,i)=>G.card.some(m=>m.tour&&m.tour.tid===tr.id&&m.tour.r===tr.r&&m.tour.i===i);
function tourMatch(tr,i){
 const mt=tr.rounds[tr.r][i];if(!mt||mt.w||tourOnCard(tr,i))return null;
 const a=W(mt.a),b=W(mt.b);if(!a||!b||a.injury||b.injury)return null;const u=usedIds(-1);if(u.has(a.id)||u.has(b.id))return null;
 const m=emptyMatch();m.mode='1v1';m.a[0]=a.id;m.b[0]=b.id;m.stip='tourney';m.tour={tid:tr.id,r:tr.r,i};return m}
function tourSlots(){
 (G.tours||[]).filter(x=>!x.done).forEach(tr=>{if(G.card.length>=6)return;
  for(let i=0;i<tr.rounds[tr.r].length;i++){const m=tourMatch(tr,i);if(m){G.card.unshift(m);break}}})}
/* graphics */
function prizeSvg(pz,w){
 const pl=PLATE[pz.plate]||PLATE.gold,a=pl[0],b=pl[1],k=pz.kind;let s='';
 if(k==='case')s='<path d="M36,28 v-8 a4,4 0 0 1 4,-4 h20 a4,4 0 0 1 4,4 v8" fill="none" stroke="'+b+'" stroke-width="4"/><rect x="12" y="28" width="76" height="44" rx="6" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><rect x="12" y="44" width="76" height="6" fill="'+b+'" opacity=".5"/><rect x="44" y="40" width="12" height="14" rx="2" fill="'+b+'"/><circle cx="50" cy="47" r="2" fill="'+a+'"/><rect x="19" y="33" width="7" height="34" fill="#fff" opacity=".15"/>';
 else if(k==='contract')s='<rect x="22" y="8" width="56" height="64" rx="3" fill="#f3ead2" stroke="#b9a77a" stroke-width="2"/><path d="M30,22 h40 M30,30 h40 M30,38 h26" stroke="#8a7a52" stroke-width="2"/><path d="M30,56 q6,-8 10,0 t10,0" fill="none" stroke="#3b3b6e" stroke-width="1.6"/><polygon points="60,64 56,78 63,73 70,78 66,64" fill="'+b+'"/><circle cx="63" cy="60" r="8" fill="'+a+'" stroke="'+b+'" stroke-width="2"/>';
 else if(k==='medal')s='<path d="M38,6 L50,26 L62,6" fill="none" stroke="'+b+'" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="48" r="28" fill="'+a+'" stroke="'+b+'" stroke-width="4"/><circle cx="50" cy="48" r="20" fill="none" stroke="'+b+'" stroke-width="2"/>'+embSvg('star',50,48,1.2,pl,{},'');
 else if(k==='key')s='<circle cx="28" cy="40" r="17" fill="'+a+'" stroke="'+b+'" stroke-width="4"/><circle cx="28" cy="40" r="6" fill="#000" opacity=".35"/><rect x="42" y="36" width="46" height="8" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="70" y="44" width="7" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="82" y="44" width="6" height="9" fill="'+a+'" stroke="'+b+'" stroke-width="2"/>';
 else if(k==='ticket')s='<rect x="8" y="20" width="84" height="44" rx="5" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><circle cx="8" cy="42" r="6" fill="#000" opacity=".3"/><circle cx="92" cy="42" r="6" fill="#000" opacity=".3"/><path d="M30,24 v36" stroke="'+b+'" stroke-width="2" stroke-dasharray="3 3"/>'+embSvg('star',60,42,1.1,pl,{},'');
 else if(k==='ring')s='<ellipse cx="50" cy="52" rx="26" ry="22" fill="none" stroke="'+b+'" stroke-width="11"/><ellipse cx="50" cy="52" rx="26" ry="22" fill="none" stroke="'+a+'" stroke-width="7"/><polygon points="38,26 62,26 70,16 50,4 30,16" fill="#8be3ff" stroke="'+b+'" stroke-width="2.5" stroke-linejoin="round"/><path d="M30,16 L38,26 M70,16 L62,26 M50,4 L50,26" stroke="'+b+'" stroke-width="1.2"/>';
 else if(k==='cup')s='<path d="M26,10 h48 v20 a24,24 0 0 1 -48,0 z" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><path d="M26,16 h-10 a10,12 0 0 0 10,22 M74,16 h10 a10,12 0 0 1 -10,22" fill="none" stroke="'+b+'" stroke-width="3.5"/><rect x="44" y="54" width="12" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="28" y="66" width="44" height="9" rx="2" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><path d="M34,14 v16" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>';
 else s='<polygon points="12,62 12,24 32,44 50,12 68,44 88,24 88,62" fill="'+a+'" stroke="'+b+'" stroke-width="3" stroke-linejoin="round"/><rect x="12" y="56" width="76" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><circle cx="50" cy="40" r="4" fill="#d83a3a"/><circle cx="30" cy="50" r="3" fill="#3a7bd8"/><circle cx="70" cy="50" r="3" fill="#3a7bd8"/>';
 return '<svg viewBox="0 0 100 80" width="'+w+'" height="'+Math.round(w*.8)+'" role="img" aria-label="'+esc(prizeName(pz))+'">'+s+'</svg>'}
// ---- Calendar of shows + interventions at rival shows ----
const hsh=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const rvCad=r=>{const p=4+hsh(r.id)%3;return{p,o:hsh(r.id+'o')%p}};
const rvBig=(r,wk)=>((wk+rvCad(r).o)%rvCad(r).p)===0;
BIGN.push(['Złota Godzina','Golden Hour'],['Punkt Zapłonu','Flashpoint'],['Ostatnia Runda','Final Round'],['Noc Długich Noży','Night of Long Knives'],['Stalowa Klatka','Steel Cage Night'],['Hołd dla Mistrzów','Tribute to Champions'],['Krwawy Księżyc','Blood Moon'],['Czarny Piątek','Black Friday'],['Dzień Rozliczenia','Day of Reckoning'],['Wojenna Ścieżka','Warpath'],['Zimna Krew','Cold Blood'],['Burza na Ringu','Ringside Storm'],['Pod Napięciem','Under Pressure'],['Ostatni Gwizdek','Final Bell'],['Złamana Korona','Broken Crown'],['Rewanż Stulecia','Rematch of the Century'],['Brama Piekieł','Gates of Hell'],['Nowy Świt','New Dawn'],['Ogień i Stal','Fire and Steel'],['Wielki Zjazd','Grand Homecoming'],['Czas Zemsty','Revenge Time'],['Granica Bólu','Pain Threshold'],['Noc Legend','Night of Legends'],['Dzikie Karty','Wild Cards'],['Walka o Honor','Fight for Honor'],['Pierwsza Krew','First Blood'],['Stawka Życia','Life on the Line'],['Wieczór Wilków','Night of the Wolves'],['Szczyt Mocy','Peak of Power'],['Trzask Kości','Crack of Bones'],['Droga do Chwały','Road to Glory'],['Bitwa Królów','Battle of Kings'],['Granat w Ringu','Ring Grenade'],['Szósty Zmysł','Sixth Sense'],['Gorączka Soboty','Saturday Fever'],['Ostry Dyżur','Hard Duty'],['Chaos Totalny','Total Chaos'],['Złoty Pas','Golden Belt Classic'],['Ciemna Strona','Dark Side'],['Wielka Ucieczka','Great Escape'],['Maraton Siły','Strength Marathon'],['Ognisty Chrzest','Baptism of Fire'],['Piąty Bieg','Fifth Gear'],['Echo Areny','Arena Echo'],['Mgła Wojny','Fog of War'],['Zimowa Burza','Winter Storm'],['Letni Upał','Summer Heat'],['Jesienna Rzeź','Autumn Carnage'],['Wiosenne Porządki','Spring Cleaning'],['Pas na Szali','Belt on the Line'],['Wrota Zemsty','Gates of Vengeance'],['Rozstaje Dróg','Crossroads'],['Zew Krwi','Call of Blood'],['Ring Płonie','Ring on Fire'],['Gong Ostateczny','Final Gong'],['Wielki Wybuch','Big Bang']);
const bigNameAt=(i)=>BIGN[((i%BIGN.length)+BIGN.length)%BIGN.length][lang==='pl'?0:1];
/* every promotion gets its own event name; two promotions never share a name in the same week */
const FEDBIG={gwf:'WrestleManiac;Royal Riot;SummerBlast;Survivor Showdown;Elimination Cage;Backfire;King and Queen of the Hill;Clash at the Fortress;Night of Titans;Cash in the Vault;Bitter Blood;Brawl in Bremen;Crown Gem;Saturday Night Main Attraction',apw:'Double or Bust;Out for All;Full Armor;Revolt Day;All Over;Forbidden Gate;WrestleVision;Worlds Edge;Empire;Grand Smash;Absolution;Wrestle Dominion',cwe:'Bound for Honor;Slamversary;Lockout;Uprising;Destination Z;Exodus;No Retreat;Offering;Under Fire;Beyond All Odds;Hard to Break;Turning Tide;Ascension',nnp:'Wrestle Realm;New Year Rush;Dominance;Wrestling Sontaku;Crown of Pro-Wrestling;Sakura Origins;The Fresh Start;Power Strife;G1 Zenith;New Nippon Cup;Best of the Hyper Juniors;World Duo League',cul:'Aniversario de Oro;Homenaje a Dos Mitos;Gran Premio Mundial;Noche de Muertos;Juicio Supremo;Sin Clemencia;Infierno en la Arena;Torneo de Parejas Imposibles;Fantástica Fiesta',lfl:'Triplemanía Max;Rey de Coronas;Verano de Furia;Guerra de Gigantes;Noche de Campeones;Héroes Eternos;Alianza Épica;Lucha Metrópoli;Sin Límite',atl:'Rey de la Arena;Guerra del Mar;Prisión Fatal;Gran Apuesta;Festival Titán;Noche de Naucalpan;Copa Titán;Leyenda Viva',roh:'Last Stand;Supercard of Glory;Glory or Death;Best of the Globe;Tag Wars II;World Wars;Glory Rising;Wrestling Gate',gcw:'Spring Wreck;The Gathering;Tournament of Pain;Cage of Survival;Violent Invitational;Homecoming Weekend;Welcome to Pain;Bloodsport Night',mlw:'Battle Riot Night;Never Say Never II;War Chamber;Slaughterhouse;Fusion Fest;Kings of the Colosseum;Summer of Beasts;Blood and Thunder',nwc:'Cromwell Cup;Hard Knocks;Power Surge;Samhain Night;Always Armed;80th Anniversary;Back at Them;Southern Heat',rvp:'Live at the Rotunda;Epic Encounter;Uprising Night;High Stakes;Summer Sizzler;Great Britannia Tag League;Revolt Rumble;Castle Night',pgr:'Chapter Alpha;Chapter Omega;Super Stiff Style;Wembley Clash;Thunderbrute;Natural Advance Series;Chapter Special;Progress Rising',rsp:'Champion Festival;Real World Duo League;Giant Series;Summer Action Series;Royal Road Tournament;Thrill Series;New Year Battles;Dream Force Series',ark:'Great Odyssey;Fate Night;Departure Day;Navigation;Grand Ship;Global Cup;Sacred Anchor;Harbor Clash',drg:'Kobe Pro Fest;Dead or Survive;Gate Kings;Gate of Danger;Summer Duo Adventure;Last Gate;Gate of Destiny;Dragon Rising',dtt:'Verdict;Into the Fray;King of Dramatic;Lost Boys Show;Sumo Hall Peter;Neverland Night;Maximum Blast;Sweet Dreams Show',str:'6Star Grand Prix;Cinderella Cup;Dream Kingdom;Goddess Festival;Midsummer Champions;Yokohama Princess;All-Star Queendom;Starlight Night',bnp:'Sumo Hall Night;Deathmatch Survivor Cup;Strong Rise;Strongest Tag League;Ueno Hardcore;Yokohama Shock;Barbed Wire Night;Light Tubes Festival',wxx:'18 Carat Gold;Back to the Roots;World Tag Festival;Shortcut to Glory;Shattered Rules;Femmes Mortelles;Westend Fest;Fan Night',nlw:'Prairie Rumble;Maple Clash;Northern Fury;Aurora Night;Hockey Night Brawl;Frozen Lake Fight;Calgary Clash;Stampede Fire',spw:'Copa Samba;Noite do Carnaval;Rei do Ringue;Arena Samba;Copacabana Clash;Amazonia Brawl;Maracanã Night;Sertão Fire',mys:'Masquerade Night;Mystery Carnival;Midnight Veil;Unmasked;Nuit Mystère;Mont-Royal Showdown;Secret Society;Veil of Shadows',bra:'Albion Showdown;Ring Alliance Classic;Union Brawl;Thames Night;Royal Charter;Crown and Anchor;Brit Grit;Castle Clash',icw:'Fear and Hatred;Square Up;Barramaul;Glasgow Riot;Clash of Clans;Thistle Rumble;Tartan Terror;Iron Fist Night',eve:'Eden Rising;Paradise Lost;Garden Party;Forbidden Fruit;Serpent\'s Kiss;Tree of Life;Apple Cart;Gate of Eden',def:'Defy Fest;Rise Night;Defiance Day;Pacific Clash;Seattle Showdown;Rain City Brawl;Cascade Night;Defiant Hour',orw:'Ohio Valley Brawl;River Rumble;Steel Bridge Night;Bluegrass Bash;Barge Night;Valley Throwdown;Floodgate;Riverboat Brawl',sxw:'Harbour Night;Opera House Clash;Outback Brawl;Southern Cross;Bondi Bash;Koala Crush;Sydney Slam;Coat Hanger Cup',cwa:'Catch Gipfel|Catch Summit;Ruhr Rumble;Catch Classic;Kampfabend|Fight Night;Zechenabend|Pit Night;Stahlgipfel|Steel Summit;Altmeister Cup;Hallenfest|Arena Fest',bwf:'Berliner Nacht|Berlin Night;Bärenkampf|Bear Fight;Mauer-Brawl|Wall Brawl;Spree Clash;Tempelhof Showdown;Alexanderplatz Cup;Kiez Kampf|Neighborhood Fight;Brandenburg Brawl',hwu:'Hamburger Sturm|Hamburg Storm;Hanse Duell|Hanseatic Duel;Hafen Fest|Harbor Fest;Elbe Clash;Reeperbahn Rumble;Fischmarkt Fight|Fish Market Fight;Michel Night;Speicherstadt Showdown',llf:'Nuit Française|French Night;Bastille Brawl;Coup de Théâtre;Tour de Ring;Seine Clash;Lutte à Paris|Fight in Paris;Marseillaise;Montmartre Night',lib:'Noche Ibérica|Iberian Night;Gran Corrida;Toro y Ring|Bull and Ring;Copa Ibérica;Flamenco Fury;Madrid Mayhem;Sangría Slam;Sevilla Showdown',rwc:'Notte Romana|Roman Night;Gladiator Cup;Colosseum Night;Via Appia Brawl;Tiber Clash;Forum Fight;Caesar\'s Cup;Pantheon Night',psw:'Visegrad Cup;Steel Night;Golden City Clash;Bohemian Brawl;Vltava Rumble;Charles Bridge Showdown;Prague Fury;Castle Gate Night',ptw:'Gala Primetime|Primetime Gala;Prime Showdown;Wielka Noc Prime|Big Prime Night;Wisła Brawl|Vistula Brawl;Prime Clash;Telewizyjna Noc|TV Night',kpw:'Godzina Zero|Zero Hour;Kaszuby Fest;Gdyńska Noc|Gdynia Night;Bałtycka Burza|Baltic Storm;Oldtown Brawl;Gala Bursztynowa|Amber Gala',ppw:'Fenomen Fest;Gala Fenomenów|Gala of Phenomena;Noc Fenomenów|Night of Phenomena;Fenomenalny Wieczór|Phenomenal Evening;Pokaz Mocy|Show of Power;Wielki Fenomen|Grand Phenomenon',low:'Dziedzictwo Ringu|Legacy of the Ring;Legacy Night;Noc Legend Ringu|Night of Ring Legends;Dziedzictwo Stali|Legacy of Steel;Gala Spadkobierców|Heirs Gala;Spuścizna|Heritage',mcw:'Górnicza Noc|Miners\' Night;Szyb Fest|Shaft Fest;Węglowy Pojedynek|Coal Duel;Gala Kopalni|Mine Gala;Barbórka Brawl;Pod Ziemią|Underground',mzw:'Strefa Szaleństwa|Zone of Madness;Manic Night;Szalona Gala|Manic Gala;Strefa Zero|Zone Zero;Chaos Manic;Wieczór Furii|Evening of Fury',plz:'Gala Fundacji|Foundation Gala;Dzień Wrestlingu|Wrestling Day;Rozwój Ringu|Ring Growth;Turniej Młodych|Young Talents Cup;Gala Charytatywna|Charity Gala;Szkoła Ringu|Ring School Show',flw:'Windy City Brawl;Chicago Chaos;Lakefront Night;Loop Rumble;Deep Dish Fight;Second City Showdown',nst:'Preston Mayhem;Northern Fury Night;Live in Preston;Guild Night;Lancashire Brawl;Docks Clash',rpc:'Ruhrpott Death Night;Kohle und Stahl|Coal and Steel;Schachtfest|Pit Festival;Oberhausen Brawl;Zeche Showdown;Gasometer Night',tfc:'Aniversario Crash;Tijuana Night;Máscara contra Máscara;Frontera Fury;Revolución Crash;Noche de Gladiadores',tir:'Six Night;Toronto Takeover;Kings of the 6IX Night;CN Tower Clash;Queen Street Brawl;Raptor Rumble',llp:'Lagos Lariat Night;Naija Clash;Atlantic Fury;Eko Showdown;Lagoon Brawl;Afrobeat Night'};
const fedBigList=id=>FEDBIG[id]?FEDBIG[id].split(';').map(s=>{const p=s.split('|');return[p[0],p[1]||p[0]]}):null;
let __bnG=null,__bnM={};
function bigNameFor(fid,wk){
 if(__bnG!==G){__bnG=G;__bnM={}}
 let m=__bnM[wk];
 if(!m){m=__bnM[wk]={};const N=BIGN.length,used=new Set();
  const ids=[{id:G.fed.id,n:wk%4===0?Math.floor(wk/4):-1,own:1}].concat(G.rivals.slice().sort((a,b)=>a.id<b.id?-1:1).map(r=>({id:r.id,n:rvBig(r,wk)?Math.floor((wk+rvCad(r).o)/rvCad(r).p):-1})));
  ids.forEach(o=>{if(o.n<0)return;if(o.own){m[o.id]=[ppvName(wk,'pl'),ppvName(wk,'en')];return}const cl=fedBigList(o.id);if(cl){m[o.id]=cl[(hsh(o.id)+o.n)%cl.length];return}let i=(hsh(o.id)+o.n*13)%N;while(used.has(i))i=(i+1)%N;used.add(i);m[o.id]=i})}
 const v=m[fid];return v==null?'':typeof v==='number'?bigNameAt(v):v[lang==='pl'?0:1];
}
const rvBigName=(r,wk)=>bigNameFor(r.id,wk);
const ownBigName=wk=>bigNameFor(G.fed.id,wk);
function rivalShow(r,wk){
 G.cal=G.cal||{};const key=wk+'|'+r.id;if(G.cal[key])return G.cal[key];
 if(wk!==G.week)return null;
 const rg=mulberry(hsh(key)),big=rvBig(r,wk);
 const pool=G.ws.filter(w=>w.fed===r.id&&!w.injury&&!w.ext).sort((a,b)=>b.pop-a.pop);
 const grp=[pool.filter(w=>w.g!=='f'),pool.filter(w=>w.g==='f')],pairs=[];
 grp.forEach(g=>{for(let i=0;i+1<g.length&&i<10;i+=2)pairs.push([g[i],g[i+1]])});
 pairs.sort((x,y)=>(y[0].pop+y[1].pop)-(x[0].pop+x[1].pop));
 const n=Math.min(pairs.length,big?5:3);
 const ms=pairs.slice(0,n).map((p,i)=>{const[a,b]=rg()<.5?p:[p[1],p[0]];
  return{a:a.id,b:b.id,an:a.name,bn:b.name,w:rg()<.5+(a.pop-b.pop)/200?'a':'b',main:i===0,intv:''}});
 return G.cal[key]={wk,fed:r.id,big,name:big?rvBigName(r,wk):'',ms,done:false};
}
function intvChance(w,m,card){
 return clamp(.38+(w.pop-30)/200+(w.cha-40)/300-(m.main?.08:0)-(card.big?.05:0),.15,.85)}
const intvOk=w=>w&&w.fed===G.fed.id&&!w.injury&&(w.fatigue||0)<85;
function setIntv(fed,mi,wid,side){
 const r=G.rivals.find(x=>x.id===fed),w=W(wid);if(!r||!intvOk(w))return false;
 const c=rivalShow(r,G.week);if(!c||!c.ms[mi])return false;
 G.intv={wk:G.week,fed,mi,wid,side};return true}
function calResolve(){
 G.cal=G.cal||{};
 G.rivals.forEach(r=>{const c=rivalShow(r,G.week);if(!c||c.done)return;
  const iv=G.intv&&G.intv.wk===G.week&&G.intv.fed===r.id?G.intv:null;
  c.ms.forEach((m,i)=>{
   if(iv&&iv.mi===i){const w=W(iv.wid);
    if(intvOk(w)||(w&&w.fed===G.fed.id)){
     const ch=intvChance(w,m,c);w.fatigue=Math.min(100,(w.fatigue||0)+10);
     const vars={w:w.name,f:r.name,m:(iv.side==='a'?m.an:m.bn)};
     if(rnd()<ch){m.w=iv.side;m.intv='ok';G.fed.pop=clamp(G.fed.pop+(c.big?1.4:.8),2,100);r.pop=clamp(r.pop-(c.big?2.5:1.4),3,99);w.pop=clamp(w.pop+1.5,1,100);w.morale=clamp((w.morale||70)+3,0,100);addNews('intvok',vars)}
     else{m.intv='fail';r.pop=clamp(r.pop+.8,3,99);G.fed.pop=clamp(G.fed.pop-.4,2,100);w.fatigue=Math.min(100,w.fatigue+8);addNews('intvfail',vars);
      if(rnd()<.25){w.injury=1+Math.floor(rnd()*3);addNews('intvinj',vars)}}
    }}
   const W1=W(m.w==='a'?m.a:m.b),L1=W(m.w==='a'?m.b:m.a);if(W1&&W1.fed===r.id)W1.pop=clamp(W1.pop+.3,1,100);if(L1&&L1.fed===r.id)L1.pop=clamp(L1.pop-.1,1,100)});
  c.done=true});
 G.intv=null;
 Object.keys(G.cal).forEach(k=>{if(G.week-(+k.split('|')[0])>3)delete G.cal[k]});
}
// ---- Injury system: types, medics, relapse, rust ----
const INJS=[{k:'bruise',s:1,st:''},{k:'sprain',s:1,st:'spd'},{k:'cut',s:1,st:''},{k:'ribs',s:2,st:'sta'},{k:'knee',s:2,st:'spd'},{k:'shoulder',s:2,st:'str'},{k:'back',s:2,st:'sta'},{k:'concussion',s:2,st:'psy'},{k:'neck',s:3,st:'tec'},{k:'acl',s:3,st:'spd'},{k:'fracture',s:3,st:'str'},{k:'trauma',s:3,st:'psy'}];
const medLvls=r=>staffOf(r).map(s=>s.lvl);
const docChance=()=>1-medLvls('doc').reduce((p,l)=>p*(1-.10*l/100),1);
const physLvl=()=>medLvls('phys').reduce((m,l)=>Math.max(m,l),0);
const physMul=()=>Math.max(.5,medLvls('phys').reduce((p,l)=>p*(1-.35*l/100),1));
const coachRisk=()=>1-Math.min(.25,medLvls('coach').reduce((a,b)=>a+b,0)/400);
const injRisk=w=>(w.rust>0?1.5:1)*trInj(w)*((w.fed===G.fed.id||w.fed==='GST')?coachRisk():1);
const ours=w=>w.fed===G.fed.id||w.fed==='GST';
function injure(w,weeks,quiet){
 const sev=weeks<=2?1:weeks<=5?2:3,k=pickR(INJS.filter(x=>x.s===sev));
 const wk=ours(w)?Math.max(1,Math.round(weeks*physMul()*medMul())):weeks;
 w.injury=wk;w.inj={k:k.k,s:sev,tot:wk,rel:0};
 if(!quiet)addNews('n.injury',{w:w.name,i:t('inj.'+k.k),n:wk})}
const injTxt=w=>(w.inj?t('inj.'+w.inj.k)+' · ':'')+t('r.inj',{n:wks(w.injury)});
function recover(w){
 const i=w.inj;delete w.inj;if(!i)return;
 if(!ours(w))return;
 const st=(INJS.find(x=>x.k===i.k)||{}).st;
 const pm=1-.5*physLvl()/100;
 if(st&&i.s>=2&&rnd()<(i.s===3?.35:.12)*pm){const loss=i.s===3?3:2;w[st]=Math.max(10,(w[st]||30)-loss);addNews('n.injperm',{w:w.name,s:t('st.'+st),n:loss})}
 if(i.s>=2){w.rust=2;
  if(!i.rel&&rnd()<.08*(1-.6*physLvl()/100)){w.injury=Math.max(1,Math.ceil(i.tot/2));w.inj={k:i.k,s:i.s,tot:w.injury,rel:1};addNews('n.relapse',{w:w.name,i:t('inj.'+i.k),n:w.injury})}
  else addNews('n.rust',{w:w.name})}}
function injWeekly(){
 const dc=docChance();
 G.ws.forEach(w=>{
  if(w.rust>0&&!w.injury)w.rust--;
  if(ours(w)){
   if(w.injury>0&&dc>0&&rnd()<dc){w.injury=0;addNews('n.docheal',{w:w.name})}
   if(w.injury<=0&&w.inj)recover(w);
  }else if(w.fed!=='RET'&&!w.ext&&w.fed!=='PRO'){
   if(w.injury>0){w.injury--;if(w.injury<=0)delete w.inj}
   else if(rnd()<.006)injure(w,1+Math.floor(rnd()*8),true)}})}

// ---- Free-agent pool ----
const FAMAX=300;
const faList=()=>G.ws.filter(w=>w.fed==='FA');
function fillFA(n){let c=faList().length;while(c<n){spawnFA(true);c++}}
function faFlow(){
 const k=2+Math.floor(rnd()*3);for(let i=0;i<k;i++)spawnFA();
 // veterans and washed-out wrestlers drop out of the pool
 const gone=new Set();faList().forEach(w=>{if(w.age>=41&&w.pop<35&&rnd()<.1)gone.add(w.id)});
 const fa=faList().filter(w=>!gone.has(w.id));if(fa.length>FAMAX){fa.sort((a,b)=>a.pop-b.pop||b.age-a.age).slice(0,fa.length-FAMAX).forEach(w=>gone.add(w.id))}
 if(gone.size)G.ws=G.ws.filter(w=>!gone.has(w.id))}
// ---- Scouting talents + movement between promotions ----
const REGS={eu:['GB','DE','PL','FR','ES','IT','CZ'],am:['US','CA','MX','BR'],as:['JP','AU','NG']};
const regOf=cc=>Object.keys(REGS).find(k=>REGS[k].indexOf(cc)>=0)||'eu';
const potStars=p=>{const s=Math.round(p/10)/2;return '★'.repeat(Math.floor(s))+(s%1?'½':'')};
function mkTalent(sc){
 const lvl=sc.lvl,cc=pickR(REGS[sc.reg||'eu']),fem=rnd()<.4;
 let pot=clamp(Math.round(48+lvl*.3+(rnd()-.3)*38),40,97);if(rnd()<.03)pot=clamp(pot+20,0,99);
 const st=pickR(STYLES),b=SBIAS[st],base=18+rnd()*12+(pot-50)*.12;
 const w={id:'x'+(G.uid++),name:nameFor(cc,fem),country:cc,style:st,role:pickR(['face','heel','tweener']),
  ring:clamp(Math.round(base+b.ring+(rnd()-.5)*10),12,62),mic:clamp(Math.round(base-4+b.mic+(rnd()-.5)*12),10,62),cha:clamp(Math.round(base+b.cha+(rnd()-.5)*12),10,66),
  pop:2+Math.floor(rnd()*8),age:17+Math.floor(rnd()*6),fed:'PRO',contract:0,injury:0,look:randLook(Math.random,cc,fem),acc:0,
  pot,potEst:clamp(Math.round(pot+(rnd()-.5)*2*(100-lvl)/5),20,99),exp:G.week+10,by:sc.name};
 if(fem)w.g='f';genStats(w,Math.random);w.salary=salaryOf(w,G.fed.tier);return w}
const proFee=w=>Math.round((salaryOf(w,G.fed.tier)*8+600*SALM[G.fed.tier-1])*(.6+w.pot/100)/10)*10;
function scoutWeekly(){
 staffOf('scout').forEach(sc=>{if(G.ws.filter(w=>w.fed==='PRO').length>=8)return;
  if(rnd()<.05+.12*sc.lvl/100){const w=mkTalent(sc);G.ws.push(w);addNews('n.scout',{s:sc.name,w:w.name,c:cn(w.country)})}})}
function proWeekly(){
 G.ws.filter(w=>w.fed==='PRO'&&w.exp<=G.week).forEach(w=>{
  if(rnd()<.5&&G.rivals.length){const r=pickR(G.rivals.filter(x=>x.tier<=3).concat(G.rivals.slice(0,2)));w.fed=r.id;if(w.potEst>=70)addNews('n.prolost',{w:w.name,f:r.name})}
  else{w.fed='FA';w.salary=salaryOf(w,1)}})}
function signPro(id){const w=W(id);if(!w||w.fed!=='PRO'||mine().length>=ROSTERMAX[G.fed.tier-1])return false;const fee=proFee(w);if(G.fed.cash<fee)return false;
 G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=104;w.morale=85;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);addNews('n.sign',{w:w.name});return true}
// ----- rival movement -----
function devLite(w){
 const pm=w.pot&&w.age<=27?.4+w.pot/50:1;
 if(w.age<=29&&rnd()<.05*pm){const k=pickR(['ring','str','spd','tec','sta','psy','mic','cha']);if(w[k]<95)w[k]++}
 else if(w.age>=36&&rnd()<.04){const k=pickR(['spd','sta','str']);w[k]=Math.max(5,w[k]-1)}
 if(w.pot&&w.age<=27&&w.pop<w.pot&&rnd()<.03+.05*w.pot/100)w.pop=Math.min(100,w.pop+1);
 else if(w.age>=34&&rnd()<.03)w.pop=Math.max(1,w.pop-1)}
function fedMoves(){
 const real=w=>!w.ext&&w.fed!=='RET'&&w.fed!=='GST'&&w.fed!==G.fed.id;
 G.ws.filter(real).forEach(devLite);
 const cnt=r=>G.ws.filter(w=>w.fed===r.id).length;
 G.rivals.forEach(r=>{
  if(r.tgt===undefined)r.tgt=Math.max(8,cnt(r));
  const roster=G.ws.filter(w=>w.fed===r.id);
  // release
  if(roster.length>r.tgt*.8&&rnd()<.04){const w=roster.sort((a,b)=>(a.pop-(a.age>=38?15:0))-(b.pop-(b.age>=38?15:0)))[0];
   if(w){w.fed='FA';w.salary=salaryOf(w,1);r.pop=clamp(r.pop-(w.pop>=45?.3:0),3,99);if(w.pop>=45)addNews('n.mvrel',{w:w.name,f:r.name})}}
  // sign from free agents
  const open=cnt(r)<r.tgt;
  if(open?rnd()<.35:rnd()<.03){
   const lo=r.pop*.55-5,hi=r.pop*1.2+10;
   const c=G.ws.filter(w=>w.fed==='FA'&&w.pop>=lo&&w.pop<=hi).sort((a,b)=>Math.abs(a.pop-r.pop)-Math.abs(b.pop-r.pop)).slice(0,6);
   if(c.length){const w=pickR(c);w.fed=r.id;r.pop=clamp(r.pop+(w.pop>=45?.3:0),3,99);if(w.pop>=45)addNews('n.mvsign',{w:w.name,f:r.name})}}});
 // transfers between promotions
 if(rnd()<.18){
  const from=G.ws.filter(w=>real(w)&&w.fed!=='FA'&&w.fed!=='PRO'&&w.pop>=30);
  if(from.length){const w=pickR(from),src=G.rivals.find(r=>r.id===w.fed);
   const dst=G.rivals.filter(r=>src&&r.id!==src.id&&r.pop>src.pop&&r.pop>=w.pop*.8&&cnt(r)<r.tgt+3).sort(()=>rnd()-.5)[0];
   if(src&&dst){w.fed=dst.id;src.pop=clamp(src.pop-.4,3,99);dst.pop=clamp(dst.pop+.4,3,99);addNews('n.mvtrans',{w:w.name,a:src.name,b:dst.name})}}}
 proWeekly()}
// ---- World events: transfers, poaching, talents ----
const evx=(k,v,labels,dis)=>{const o=labels.map((n,i)=>({l:t('ev.w.'+k+'.'+n,v),dis:!!(dis&&dis[i])}));const dfr=!!window.__inWE&&!window.__noDefer&&G.defer&&G.defer.length<3&&!G.defer.some(d=>d.k===k);if(dfr)o.push({l:t('ev.defer')});return askGeneric(t('ev.w.'+k+'.t'),t('ev.w.'+k+'.b',v),o).then(i=>{if(i>=labels.length)throw {defer:k};return i})};
const sw=()=>Math.round(900*SALM[G.fed.tier-1]/10)*10;
const rivalWith=f=>{const rs=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id&&f(w)));return rs.length?pickR(rs):null};
const leaveTo=(w,r)=>{w.fed=r.id;purgeW(w.id);addNews('n.leave',{w:w.name,f:r.short||r.name})};
const WEV={
 async swap(){
  const A=pickR(mine().filter(w=>w.pop>=15&&!w.farewell&&!isChamp(w.id)&&w.contract>0&&!w.injury));if(!A)return false;
  const r=rivalWith(w=>!w.injury&&!w.ext&&Math.abs(w.pop-A.pop)<=10);if(!r)return false;
  const B=pickR(G.ws.filter(w=>w.fed===r.id&&!w.injury&&!w.ext&&Math.abs(w.pop-A.pop)<=10));if(!B)return false;
  const v={f:r.name,a:A.name,b:B.name,pa:Math.round(A.pop),pb:Math.round(B.pop)};
  const i=await evx('swap',v,['1','2']);
  if(i===0){leaveTo(A,r);B.fed=G.fed.id;B.salary=salaryOf(B,G.fed.tier);B.contract=52;B.morale=70;B.fatigue=0;B.acc=accStart(B.country,G.fed.country);addNews('n.swap',{a:A.name,b:B.name,f:r.name})}
  return true},
 async starfa(){
  if(mine().length>=ROSTERMAX[G.fed.tier-1])return false;
  const w=G.ws.filter(x=>x.fed==='FA'&&x.pop>=Math.max(40,G.fed.pop*.6)).sort((a,b)=>b.pop-a.pop)[0];if(!w)return false;
  const fee=Math.round(salaryOf(w,G.fed.tier)*6/10)*10,v={w:w.name,p:Math.round(w.pop),m:money(fee)};
  const i=await evx('starfa',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=52;w.morale=80;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);addNews('n.sign',{w:w.name})}
  else{const r=pickR(G.rivals);w.fed=r.id;addNews('n.mvsign',{w:w.name,f:r.name})}
  return true},
 async crossover(){
  const r=pickR(G.rivals.filter(x=>Math.abs(x.pop-G.fed.pop)<=25));if(!r)return false;
  const c=Math.round(tdNow().prod*.5/10)*10,v={f:r.name,m:money(c)};
  const i=await evx('cross',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1.2,2,100);r.pop=clamp(r.pop+.6,3,99);addNews('n.cross',{f:r.name})}
  return true},
 async callout(){
  const r=pickR(G.rivals);const c=Math.round(tdNow().prod*.3/10)*10,v={f:r.name,m:money(c)};
  const i=await evx('call',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.7){G.fed.pop=clamp(G.fed.pop+.9,2,100);r.pop=clamp(r.pop-.6,3,99);addNews('n.callok',{f:r.name})}else{G.fed.pop=clamp(G.fed.pop-.8,2,100);addNews('n.callbad',{f:r.name})}}
  else G.fed.pop=clamp(G.fed.pop-.2,2,100);
  return true},
 async unhappy(){
  const w=pickR(mine().filter(x=>x.morale<55&&x.pop>=15&&x.contract>0&&!x.farewell));if(!w)return false;
  const up=Math.round(w.salary*.2/10)*10,v={w:w.name,m:money(up)};
  const i=await evx('unhappy',v,['1','2']);
  if(i===0){w.salary+=up;w.morale=clamp(w.morale+15,0,100)}
  else if(rnd()<.4){leaveTo(w,pickR(G.rivals))}else w.morale=clamp(w.morale-5,0,100);
  return true},
 async campus(){
  const sc=staffOf('scout').sort((a,b)=>b.lvl-a.lvl)[0];if(!sc||G.ws.filter(w=>w.fed==='PRO').length>5)return false;
  const c=sw()*3,v={m:money(c),s:sc.name};
  const i=await evx('campus',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;const s2=Object.assign({},sc,{lvl:Math.min(100,sc.lvl+10)});let n=0;for(let k=0;k<3&&G.ws.filter(w=>w.fed==='PRO').length<8;k++){G.ws.push(mkTalent(s2));n++}addNews('n.campus',{n})}
  return true},
 async agent(){
  const w=pickR(G.ws.filter(x=>x.fed==='PRO'));if(!w||mine().length>=ROSTERMAX[G.fed.tier-1])return false;
  const fee=Math.round(proFee(w)*1.25/10)*10,v={w:w.name,m:money(fee),p:potStars(w.potEst)};
  const i=await evx('agent',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){const f0=G.fed.cash;G.fed.cash-=fee-proFee(w);if(!signPro(w.id))G.fed.cash=f0}else w.exp=Math.min(w.exp,G.week+3);
  return true},
 async tip(){
  if(G.ws.filter(w=>w.fed==='PRO').length>=3)return false;
  const sc={lvl:40,reg:pickR(Object.keys(REGS)),name:t('ev.w.tip.by')};const w=mkTalent(sc);w.by=sc.name;
  const i=await evx('tip',{w:w.name,c:cn(w.country),a:w.age},['1','2']);
  if(i===0)G.ws.push(w);return true},
 async breakthrough(){
  const w=pickR(mine().filter(x=>x.pot>=60&&x.age<=25&&!x.injury));if(!w)return false;
  const c=sw(),v={w:w.name,m:money(c)};
  const i=await evx('break',v,['1','2'],[false,G.fed.cash<c]);
  if(i===0){w.pop=clamp(w.pop+3,1,100);w.morale=clamp(w.morale+8,0,100)}else{G.fed.cash-=c;w.pop=clamp(w.pop+6,1,100);w.morale=clamp(w.morale+12,0,100)}
  addNews('n.break',{w:w.name});return true},
 async buytalent(){
  const w=pickR(mine().filter(x=>x.pot>=65&&x.age<=24&&x.contract>0&&!isChamp(x.id)));if(!w)return false;
  const r=pickR(G.rivals),off=Math.max(sw()*2,Math.round(w.salary*70/10)*10),v={w:w.name,f:r.name,m:money(off)};
  const i=await evx('buy',v,['1','2']);
  if(i===0){G.fed.cash+=off;leaveTo(w,r)}else w.morale=clamp(w.morale+4,0,100);
  return true},
 async scoutraise(){
  const sc=pickR(staffOf('scout'));if(!sc)return false;
  const up=Math.round(sc.salary*.3/10)*10,v={s:sc.name,m:money(up)};
  const i=await evx('scraise',v,['1','2']);
  if(i===0)sc.salary+=up;else{G.staff=G.staff.filter(x=>x!==sc);addNews('n.stafffire',{w:sc.name})}
  return true}
};
async function worldEvents(){
 const keys=Object.keys(WEV);
 for(let round=0;round<2;round++){
  if(rnd()>(round?.15:.55))break;
  const order=shuffle(keys.slice());
  window.__inWE=true;try{ibx();
  for(const k of order.slice(0,5)){let ok=false;try{ok=await WEV[k]()}catch(e){if(e&&e.defer){ok=true;deferEv(e.defer)}else ok=false}if(ok)break}}finally{window.__inWE=false}}}
// ----- poaching rival wrestlers (player-initiated) -----
function poachFee(w){return Math.round(salaryOf(w,G.fed.tier)*14/10)*10}
function poachChance(w){const r=G.rivals.find(x=>x.id===w.fed);if(!r)return 0;
 return clamp(.28+(G.fed.pop-r.pop)/180+(G.fed.tier-r.tier)*.1-(w.pop>G.fed.pop?.1:0)-((w.loyal||50)-50)/300,.05,.85)}
async function poach(id){
 const w=W(id);if(!w||w.fed==='FA'||w.fed==='PRO'||w.fed==='RET'||w.fed===G.fed.id||w.ext)return;
 if(mine().length>=ROSTERMAX[G.fed.tier-1])return;if((w.pcd||0)>G.week)return;
 const r=G.rivals.find(x=>x.id===w.fed);if(!r)return;const fee=poachFee(w),ch=Math.round(poachChance(w)*100);
 const v={w:w.name,f:r.name,m:money(fee),p:ch};
 const i=await askGeneric(t('ev.w.poach.t'),t('ev.w.poach.b',v),[{l:t('ev.w.poach.1',v),dis:G.fed.cash<fee},{l:t('ev.w.poach.2')}]);
 if(i!==0)return;
 w.pcd=G.week+8;
 if(rnd()<poachChance(w)){G.fed.cash-=fee;w.fed=G.fed.id;w.salary=Math.round(salaryOf(w,G.fed.tier)*1.1/10)*10;w.contract=52;w.morale=75;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);
  r.pop=clamp(r.pop-(w.pop>=45?1.2:.5),3,99);G.fed.pop=clamp(G.fed.pop+(w.pop>=45?.5:.2),2,100);addNews('n.poachok',{w:w.name,f:r.name});
  await askGeneric(t('ev.w.poachok.t'),t('ev.w.poachok.b',v),[{l:t('ev.w.ok')}])}
 else{addNews('n.poachno',{w:w.name,f:r.name});await askGeneric(t('ev.w.poachno.t'),t('ev.w.poachno.b',v),[{l:t('ev.w.ok')}])}
 save();render()}
// look-related world events
Object.assign(WEV,{
 async makeover(){
  const w=pickR(mine().filter(x=>x.pop>=12&&!x.injury&&!x.farewell&&x.look));if(!w)return false;
  const fee=Math.round(sw()*.5/10)*10,v={w:w.name,m:money(fee)};
  const i=await evx('makeover',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){G.fed.cash-=fee;const o=w.look,n=randLook(rnd,w.country,w.g==='f');
   w.look=Object.assign({},o,{hair:n.hair,hairC:n.hairC,outfit:n.outfit,outC:n.outC,o2:n.o2,acc:n.acc,gear:n.gear,neck:n.neck});
   w.pop=clamp(w.pop+1.5,1,100);w.cha=clamp(w.cha+2,1,100);w.morale=clamp((w.morale||60)+8,0,100);addNews('n.makeover',{w:w.name})}
  else{w.morale=clamp((w.morale||60)-6,0,100)}
  return true},
 async cosplay(){
  const w=pickR(mine().filter(x=>x.pop>=20&&!x.farewell));if(!w)return false;
  const v={w:w.name};await evx('cosplay',v,['1']);
  w.pop=clamp(w.pop+1,1,100);G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.cosplay',{w:w.name});return true}
});
Object.assign(D,{
'ev.w.makeover.t':['Nowy image','New look'],'ev.w.makeover.b':['{w} prosi o zmianę wyglądu: nowa fryzura, strój i dodatki. Koszt stylizacji: {m}.','{w} asks for a new look: new hair, outfit and accessories. Styling costs {m}.'],'ev.w.makeover.1':['Zapłać {m}','Pay {m}'],'ev.w.makeover.2':['Odmów','Refuse'],
'ev.w.cosplay.t':['Fani przebierają się!','Fans in costume!'],'ev.w.cosplay.b':['Na widowni zrobiło się głośno o przebierańcach za {w}. Popularność rośnie.','Fans dressed up as {w} went viral. Popularity rises.'],'ev.w.cosplay.1':['Super','Great'],
'n.makeover':['{w} pokazał nowy image.','{w} debuted a new look.'],'n.cosplay':['Fani przebrani za {w} podbijają media społecznościowe.','Fans dressed as {w} are all over social media.']
});
// rival stable invasion
Object.assign(WEV,{
 async invasion(){
  const sts=(PACK.stables||[]).filter(s=>s.fed!==G.fed.id&&G.rivals.some(r=>r.id===s.fed));if(!sts.length)return false;
  const s=pickR(sts),r=G.rivals.find(x=>x.id===s.fed),v={s:s.name,f:r.short||r.name};
  const ours=pickR(healthy().filter(w=>w.pop>=10));if(!ours)return false;v.w=ours.name;
  const i=await evx('invasion',v,['1','2']);
  if(i===0){G.fed.pop=clamp(G.fed.pop+.5,2,100);r.pop=clamp(r.pop+.3,3,99);ours.injury=Math.max(ours.injury||0,2);ours.morale=clamp((ours.morale||60)-5,0,100);addNews('n.invasion',v)}
  else{const fee=Math.round(sw()*.3/10)*10;G.fed.cash-=fee;addNews('n.invasion2',v)}
  return true}
});
Object.assign(D,{
'ev.w.invasion.t':['Inwazja stajni!','Stable invasion!'],'ev.w.invasion.b':['Stajnia {s} z federacji {f} wpada na Twoją galę i zaatakowała {w}. Pozwolić im na to dla szumu medialnego, czy wezwać ochronę?','The stable {s} from {f} storms your show and targets {w}. Let it happen for the buzz, or call security?'],'ev.w.invasion.1':['Niech wejdą','Let them in'],'ev.w.invasion.2':['Wezwij ochronę','Call security'],
'n.invasion':['Stajnia {s} ({f}) wtargnęła na galę i pobiła {w}. Media szaleją.','{s} ({f}) invaded the show and beat down {w}. The press is buzzing.'],'n.invasion2':['Ochrona wyprowadziła stajnię {s} z hali.','Security removed {s} from the arena.']
});
// ---- dynamic title prestige (1..5) and large-federation title sets ----
function prestOf(tt){return clamp(tt.pdyn==null?(tt.prestige||1):tt.pdyn,1,5)}
function pr1(tt){return prestOf(tt).toFixed(1)}
function prTrend(tt){const d=tt.ptr||0;const b=tt.prestige||1;const base=' <span class="mute" style="font-size:12px">('+t('t.pbase')+' '+(+b).toFixed(1)+')</span>';return (d>.004?' <span style="color:var(--teal)">▲</span>':d<-.004?' <span style="color:var(--red)">▼</span>':'')+base}
function titleWeekly(){
 G.titles.forEach(tt=>{
  const base=tt.prestige||1,old=prestOf(tt);let p=old;
  if(!tt.holders.length)p-=.07;
  else{const hs=tt.holders.map(W).filter(Boolean);if(hs.length){const h=avg(hs.map(w=>w.pop)),exp=10+base*11;p+=clamp((h-exp)/400,-.05,.05);
    if(hs.some(w=>w.injury))p-=.015;
    if((G.week-(tt.since||1))>20&&(tt.def||0)>=3)p+=.02;
    if((G.week-(tt.since||1))>60&&!(tt.def>=2))p-=.03}}
  p+=(base-p)*.015;
  p=clamp(p,Math.max(1,base-1.5),Math.min(5,base+1.5));
  tt.pdyn=p;tt.ptr=p-old})}
function migrateTitles(){(G.titles||[]).forEach(tt=>{if(!tt.pv){tt.pv=2;tt.prestige=[2,3.5,5][clamp(Math.round(tt.prestige||2),1,3)-1];tt.pdyn=tt.prestige}else if(tt.pdyn==null)tt.pdyn=tt.prestige})}
// [name, base prestige, teams(1-3), gender, belt preset, strap colour]
const FEDTITLES={
gwf:[['Undisputed World Championship',5,1,'m','classic','#8a1c1c'],['World Heavyweight Championship',5,1,'m','classic','#1f3f8a'],['Intercontinental Championship',4,1,'m','euro'],['United States Championship',3,1,'m','heritage'],['Raw Tag Team Championship',3,2,'m','tag','#8a1c1c'],['SmackDown Tag Team Championship',3,2,'m','tag','#1f3f8a'],['Developmental Championship',2,1,'m','ultra'],['24/7 Championship',1,1,'m','hardcore'],['Women\'s World Championship',4,1,'f','women','#c4358a'],['Women\'s Championship',4,1,'f','women','#6a3aa8'],['Women\'s Intercontinental Championship',3,1,'f','women','#13a89e'],['Women\'s Tag Team Championship',3,2,'f','tag','#c4358a']],
apw:[['World Championship',5,1,'m','classic','#1a1a1a'],['International Championship',4,1,'m','euro','#13a89e'],['TNT Championship',3,1,'m','ultra','#e8782a'],['Pure Rules Championship',3,1,'m','heritage'],['World Tag Team Championship',4,2,'m','tag','#1a1a1a'],['World Trios Championship',3,3,'m','tag','#6a3aa8'],['Women\'s World Championship',4,1,'f','women','#c4358a'],['Women\'s Television Championship',3,1,'f','women','#13a89e'],['Women\'s Tag Team Championship',3,2,'f','tag','#c4358a']],
cwe:[['Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['X-Division Championship',3,1,'m','ultra','#e8b53c'],['Tag Team Championship',3,2,'m','tag'],['Digital Media Championship',2,1,'m','hardcore'],['Knockouts World Championship',4,1,'f','women'],['Knockouts Tag Team Championship',2,2,'f','tag','#c4358a']],
nnp:[['World Heavyweight Championship',5,1,'m','classic','#8a1c1c'],['Intercontinental Championship',4,1,'m','euro','#e8e6df'],['Openweight Championship',3,1,'m','heritage'],['Junior Heavyweight Championship',3,1,'m','ultra'],['Tag Team Championship',4,2,'m','tag','#1f3f8a'],['Six-Man Tag Championship',2,3,'m','tag','#b26a1a']],
roh:[['World Championship',4,1,'m','classic','#1a1a1a'],['Television Championship',3,1,'m','heritage'],['Pure Championship',3,1,'m','euro','#e8e6df'],['Tag Team Championship',3,2,'m','tag'],['Six-Man Tag Championship',2,3,'m','tag','#b26a1a'],['Women\'s World Championship',3,1,'f','women']],
nwc:[['National Heavyweight Championship',4,1,'m','classic','#8a1c1c'],['Television Championship',3,1,'m','heritage'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
mlw:[['World Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['National Openweight Championship',3,1,'m','heritage'],['World Middleweight Championship',3,1,'m','ultra'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Featherweight Championship',3,1,'f','women']],
gcw:[['World Championship',4,1,'m','classic','#1a1a1a'],['Ultraviolent Championship',2,1,'m','hardcore'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
rsp:[['Triple Crown Heavyweight Championship',4,1,'m','classic','#8a1c1c'],['Junior Heavyweight Championship',3,1,'m','ultra'],['World Tag Team Championship',4,2,'m','tag'],['Gaora Television Championship',2,1,'m','heritage'],['Women\'s Championship',3,1,'f','women']],
ark:[['Global Championship',4,1,'m','classic','#1f3f8a'],['Global Tag Team Championship',3,2,'m','tag'],['Junior Heavyweight Championship',3,1,'m','ultra'],['Openweight Championship',2,1,'m','heritage']],
str:[['World of Starburst Championship',4,1,'f','women','#c4358a'],['Wonder of Starburst Championship',3,1,'f','women','#13a89e'],['Goddesses Tag Team Championship',3,2,'f','tag','#c4358a'],['High Speed Championship',2,1,'f','women','#e8b53c'],['Artist of Starburst Championship',2,3,'f','tag','#6a3aa8']],
dtt:[['Universal Championship',4,1,'m','classic','#1d6b4f'],['Ironman Heavymetalweight Championship',1,1,'m','hardcore'],['KO-D Tag Team Championship',3,2,'m','tag'],['Openweight Championship',3,1,'m','heritage']],
drg:[['Open the Dream Gate Championship',4,1,'m','classic','#6a3aa8'],['Brave Gate Championship',3,1,'m','ultra'],['Twin Gate Championship',3,2,'m','tag'],['Triangle Gate Championship',3,3,'m','tag','#13a89e']],
lfl:[['Mega Championship',4,1,'m','classic','#e8b53c'],['Latin American Championship',3,1,'m','euro'],['Trios Championship',3,3,'m','tag','#1d6b4f'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
rvp:[['Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['British Cruiserweight Championship',3,1,'m','ultra'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
pgr:[['World Championship',4,1,'m','classic','#1a1a1a'],['Atlas Championship',3,1,'m','heritage','#6b4423'],['Tag Team Championship',3,2,'m','tag'],['Women\'s World Championship',3,1,'f','women']],
wxx:[['Unified World Wrestling Championship',4,1,'m','classic','#8a1c1c'],['Shotgun Championship',3,1,'m','heritage'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
nlw:[['Heavyweight Championship',3,1,'m','classic','#8a1c1c'],['Maple Leaf Championship',3,1,'m','euro'],['Tag Team Championship',2,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
spw:[['Brazil Heavyweight Championship',3,1,'m','classic','#1d6b4f'],['Carnival Championship',3,1,'m','ultra','#e8b53c'],['Tag Team Championship',2,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
cul:[['World Heavyweight Championship',4,1,'m','classic','#1d6b4f'],['Welterweight Championship',3,1,'m','ultra'],['Trios Championship',3,3,'m','tag','#e8782a'],['Tag Team Championship',3,2,'m','tag'],['Women\'s World Championship',3,1,'f','women']]
};
function bigTitleSeed(){
 const spec=FEDTITLES[G.fed.id];if(!spec)return;
 const used=new Set(),pool={m:mine().filter(w=>w.g!=='f').sort((a,b)=>b.pop-a.pop),f:mine().filter(w=>w.g==='f').sort((a,b)=>b.pop-a.pop)};
 G.titles=spec.map((s,i)=>{const bp=BPRESETS[s[4]]||BPRESETS.classic,tt={id:'T'+(G.uid++),kind:'custom',name:s[0],prestige:s[1],pdyn:s[1],pv:2,teams:s[2],g:s[3],holders:[],since:1,custom:true};
  BELTKEYS.forEach(k=>{tt[k]=bp[k]});if(s[5])tt.strap=s[5];tt.plate=s[1]>=4?'gold':s[1]>=3?'silver':bp.plate;
  const p=pool[s[3]].filter(w=>!used.has(w.id));if(p.length>=s[2]){tt.holders=p.slice(0,s[2]).map(w=>w.id);tt.holders.forEach(id=>used.add(id))}
  return tt})}
Object.assign(D,{'t.pbase':['bazowy','base']});
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
// ---- Global-tier (tier 5) extra pressure ----
function globalWeekly(f,a3){
 if(f.tier<5)return;
 if(f.pop>=92&&a3<4.4)f.pop=clamp(f.pop-.25,2,100);
 const n=G.netPen;if(n&&n.wk>0){n.wk--;if(n.wk<=0)G.netPen=null}
 if(G.week%13===0&&(G.hist||[]).length>=6){const a=lastRat(13);
  if(a<3.9){G.netPen={wk:13,m:.88};addNews('n.netbad',{r:f2(a)})}
  else if(a>=4.3){f.cash+=r10(wkRev()*2);f.pop=clamp(f.pop+.4,2,100);addNews('n.netgood',{r:f2(a)})}}
}
Object.assign(WEV,{
 async raid(){
  if(G.fed.tier<5)return false;const w=mine().filter(x=>x.pop>=60&&!x.farewell&&!x.injury).sort((a,b)=>b.pop-a.pop)[pickR([0,0,1,2])];if(!w)return false;
  const rv=pickR(G.rivals.filter(r=>r.tier>=5));if(!rv)return false;const c=r10(w.salary*14),v={w:w.name,f:rv.short||rv.name,m:money(c)};
  const i=await evx('raid',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;w.salary=r10(w.salary*1.4);w.contract=52;w.morale=clamp((w.morale||60)+6,0,100);addNews('n.raid1',v)}
  else{w.fed=rv.id;purgeW(w.id);G.fed.pop=clamp(G.fed.pop-.6,2,100);rv.pop=clamp(rv.pop+.5,3,99);addNews('n.raid2',v)}
  return true},
 async hostile(){
  if(G.fed.tier<5||G.netPen)return false;const c=r10(wkRev()*10),v={m:money(c)};
  const i=await evx('hostile',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.host1',v)}else{G.netPen={wk:8,m:.85};G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.host2')}
  return true}
});
E('raid','Rywal wykrada gwiazdę','Rival raids a star','{f} składa ofertę {w}. Podwyżka i nowy kontrakt kosztują {m} (pensja +40%). Jeśli odmówisz, odchodzi.','{f} makes an offer to {w}. A raise and new deal cost {m} (salary +40%). Refuse and they leave.',[['Przebij ofertę ({m})','Match the offer ({m})'],['Pozwól odejść','Let them go']]);
E('hostile','Wrogie przejęcie','Hostile takeover bid','Inwestorzy próbują przejąć kontrolę. Obrona (wypłata dla akcjonariuszy) kosztuje {m}. Bez obrony na 8 tygodni stracisz część przychodów z TV.','Investors attempt a hostile takeover. Defending (shareholder payout) costs {m}. Without a defense you lose part of your TV income for 8 weeks.',[['Broń się ({m})','Defend ({m})'],['Nie broń','Do not defend']]);
Object.assign(D,{
'n.netbad':['Stacja oceniła średnią gal na {r}: poniżej oczekiwań, przychody z TV obcięte o 20% na kwartał.','The network rated your shows {r} on average: below expectations, TV income cut by 20% for a quarter.'],
'n.netgood':['Stacja chwali średnią {r}: premia za wyniki.','The network praises your {r} average: performance bonus.'],
'n.raid1':['Przebito ofertę rywala: {w} został w federacji.','You matched the rival offer: {w} stays.'],
'n.raid2':['{w} przeszedł do federacji {f}.','{w} left for {f}.'],
'n.host1':['Odparto próbę wrogiego przejęcia ({m}).','Hostile takeover repelled ({m}).'],
'n.host2':['Inwestorzy przejęli część kontroli: przychody z TV spadły.','Investors gained a foothold: TV income dropped.']
});
/* ============ Rivals & allies (per wrestler, up to 5 each, rotating) ============ */
const REL_MAX=5;
function relList(w,k){return (w[k]=(w[k]||[]).filter(id=>{const x=W(id);return x&&x!==w&&x.fed===G.fed.id}))}
const rvOf=w=>relList(w,'rv'),alOf=w=>relList(w,'al');
function relLink(a,b,k){const A=relList(a,k),B=relList(b,k);if(A.length<REL_MAX&&A.indexOf(b.id)<0)A.push(b.id);if(B.length<REL_MAX&&B.indexOf(a.id)<0)B.push(a.id)}
function relUnlink(a,b,k){a[k]=(a[k]||[]).filter(x=>x!==b.id);b[k]=(b[k]||[]).filter(x=>x!==a.id)}
function relWeights(w,x,k){
 const st=stableOf(w.id),same=st&&st===stableOf(x.id);const feud=G.feuds.some(f=>(f.A.indexOf(w.id)>=0&&f.B.indexOf(x.id)>=0)||(f.B.indexOf(w.id)>=0&&f.A.indexOf(x.id)>=0));
 const pc=G.pairs[pairKey(w.id,x.id)]||0;
 if(k==='rv'){if(same)return 0;let s=1;if(w.role!==x.role&&w.role!=='neutral'&&x.role!=='neutral')s+=3;if(feud)s+=4;if(Math.abs(w.pop-x.pop)<=15)s+=2;if(w.style===x.style)s+=.5;if(x.pop>w.pop+5)s+=1;return s}
 let s=.5;if(same)s+=4;if(w.role===x.role)s+=2;s+=Math.min(4,pc*.5);if(feud)return 0;if(w.g===x.g)s+=.5;return s}
function relPick(w,pool,k){
 const c=pool.map(x=>({x,s:relWeights(w,x,k)})).filter(o=>o.s>0);let tot=0;c.forEach(o=>tot+=o.s);if(!tot)return null;
 let r=rnd()*tot;for(const o of c){r-=o.s;if(r<=0)return o.x}return c[0].x}
function relWeekly(){
 const ms=mine().filter(w=>!w.farewell);
 ms.forEach(w=>{rvOf(w);alOf(w)});
 ms.forEach(w=>{
  rvOf(w).slice().forEach(id=>{if(rnd()<.045)relUnlink(w,W(id),'rv')});
  alOf(w).slice().forEach(id=>{if(rnd()<.025)relUnlink(w,W(id),'al')});
  if(w.rv.length<REL_MAX&&rnd()<.14){const x=relPick(w,ms.filter(o=>o!==w&&w.rv.indexOf(o.id)<0&&w.al.indexOf(o.id)<0&&o.rv.length<REL_MAX),'rv');
   if(x){relLink(w,x,'rv');if(w.pop>=35||x.pop>=35)addNews('n.rvnew',{a:w.name,b:x.name})}}
  if(w.al.length<REL_MAX&&rnd()<.12){const x=relPick(w,ms.filter(o=>o!==w&&w.rv.indexOf(o.id)<0&&w.al.indexOf(o.id)<0&&o.al.length<REL_MAX),'al');
   if(x){relLink(w,x,'al');if(w.pop>=35||x.pop>=35)addNews('n.alnew',{a:w.name,b:x.name})}}
 });
}
function relEnsure(){if(G.relInit)return;G.relInit=1;for(let i=0;i<14;i++)relWeekly()}
function relAfterMatch(m,wi,li){
 if(MODES[m.mode].ffa)return;
 const k=m.title?.2:.1;
 wi.forEach(a=>li.forEach(b=>{const x=W(a),y=W(b);if(x&&y&&rnd()<k&&(x.al||[]).indexOf(b)<0&&stableOf(a)!==stableOf(b)&&(!x.rv||x.rv.indexOf(b)<0))relLink(x,y,'rv')}));
 if(wi.length>1)for(let i=0;i<wi.length;i++)for(let j=i+1;j<wi.length;j++){const x=W(wi[i]),y=W(wi[j]);if(x&&y&&rnd()<.1&&(x.rv||[]).indexOf(y.id)<0)relLink(x,y,'al')}
}
function relBonus(A,B){let v=0;A.forEach(a=>{const rv=W(a).rv||[];B.forEach(b=>{if(rv.indexOf(b)>=0)v+=1.5})});return Math.min(3,v)}
/* rival interference during a show; returns null (nothing), false (saved by an ally) or true (result flipped) */
function rvInterfere(m,oc,res,log){
 if(MODES[m.mode].ffa)return null;
 const{A,B}=sides(m);const inM=new Set(A.concat(B));const rivs=[];
 oc.wi.forEach(id=>{const w=W(id);if(!w)return;rvOf(w).forEach(r=>{const x=W(r);if(x&&!inM.has(r)&&!x.injury&&!rivs.some(y=>y.r===x))rivs.push({r:x,t:w})})});
 if(!rivs.length)return null;
 const rf=1-clamp((sfx().refL-SBASE)/70,0,1)*.6;
 if(rnd()>clamp(.02+.025*rivs.length,0,.12)*rf*(m.title?1.25:1))return null;
 const pk=pickR(rivs),tg=pk.t;
 const al=[];oc.wi.forEach(id=>{const w=W(id);if(w)alOf(w).forEach(a=>{const x=W(a);if(x&&!inM.has(a)&&!x.injury&&x!==pk.r&&al.indexOf(x)<0)al.push(x)})});
 const sv=shuffle(al.slice()).find(a=>rnd()<.17+(a.loyal||50)/500);
 res.stars+=.25;
 if(sv){
  log('ln gold',esc(t('rv.save',{a:sv.name,r:pk.r.name,w:tg.name})));addNews('n.rvsave',{a:sv.name,r:pk.r.name,w:tg.name});
  sv.pop=clamp(sv.pop+.3*popDim(sv.pop),1,100);tg.morale=clamp(tg.morale+2,0,100);relLink(sv,pk.r,'rv');return false}
 log('ln gold',esc(t('rv.hit',{r:pk.r.name,w:tg.name})));addNews('n.rvhit',{r:pk.r.name,w:tg.name});
 m.winner=m.winner==='a'?'b':'a';m.finish='dirty';res.finish='dirty';
 tg.morale=clamp(tg.morale-4,0,100);pk.r.pop=clamp(pk.r.pop+.5*popDim(pk.r.pop),1,100);return true}
function relHtml(w){
 if(w.fed!==G.fed.id)return '';
 const nm=a=>a.length?esc(a.map(i=>W(i).name).join(', ')):'—';
 return cupHtml(w)+'<div class="mute" style="font-size:13px"><b>'+t('rv.rivals')+':</b> '+nm(rvOf(w))+'</div><div class="mute" style="font-size:13px"><b>'+t('rv.allies')+':</b> '+nm(alOf(w))+'</div>';
}
Object.assign(WEV,{
 async allyboost(){
  if(rnd()>.4)return false;
  const pr=[];mine().filter(w=>!w.farewell&&!w.injury).forEach(w=>alOf(w).forEach(id=>{const a=W(id);if(a&&!a.injury&&w.id<id)pr.push([w,a])}));
  if(!pr.length)return false;
  const p=pickR(pr),k=pickR(['ring','psy','sta','mic','cha',KEY[p[0].style]]);
  const lo=p[0][k]<=p[1][k]?p[0]:p[1],hi=lo===p[0]?p[1]:p[0];if(lo[k]>=96)return false;
  const c=r10(wkRev()*.25),v={a:hi.name,b:lo.name,s:t('st.'+k),m:money(c)};
  const i=await evx('allyboost',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){lo[k]=clamp(lo[k]+1,1,99);addNews('n.alboost',v)}
  else if(i===1){G.fed.cash-=c;lo[k]=clamp(lo[k]+1,1,99);if(hi[k]<99)hi[k]=clamp(hi[k]+1,1,99);lo.morale=clamp(lo.morale+3,0,100);hi.morale=clamp(hi.morale+3,0,100);addNews('n.alboost2',v)}
  return true}
});
E('allyboost','Sojusznicy trenują razem','Allies train together','{a} i {b} to sojusznicy. {a} proponuje wspólne treningi: {s} u {b} mogłoby się poprawić. Obóz sponsorowany kosztuje {m}.','{a} and {b} are allies. {a} offers to train together: {b}\'s {s} could improve. A sponsored camp costs {m}.',[['Wspólny trening (za darmo, +1 {s} dla {b})','Train together (free, +1 {s} for {b})'],['Sponsoruj obóz ({m}, +1 {s} dla obu)','Sponsor a camp ({m}, +1 {s} for both)'],['Nie teraz','Not now']]);
Object.assign(D,{
 'rv.rivals':['Rywale','Rivals'],'rv.allies':['Sojusznicy','Allies'],
 'rv.save':['{a} wbiega do ringu i zatrzymuje {r}, który chciał popsuć wygraną {w}!','{a} runs in and stops {r}, who tried to ruin {w}\'s win!'],
 'rv.hit':['{r} ingeruje w walkę i odbiera zwycięstwo zawodnikowi {w}!','{r} interferes and robs {w} of the win!'],
 'n.rvnew':['{a} i {b} zostają rywalami.','{a} and {b} have become rivals.'],
 'n.alnew':['{a} i {b} zostają sojusznikami.','{a} and {b} have become allies.'],
 'n.rvsave':['{a} uratował wygraną {w}, odpierając {r}.','{a} saved {w}\'s win by fending off {r}.'],
 'n.rvhit':['{r} zniweczył wygraną {w} swoją ingerencją.','{r} wrecked {w}\'s win with an interference.'],
 'n.alboost':['{b} poprawia {s} dzięki wspólnym treningom z {a}.','{b} improved {s} after training with {a}.'],
 'n.alboost2':['Obóz sponsorowany: {a} i {b} poprawiają {s}.','Sponsored camp: {a} and {b} improved {s}.']
});
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
/* ============ PPV/PLE editor: own promotion's big-event names and order ============ */
function ppvDefault(){
 const cl=fedBigList(G.fed.id);
 if(cl)return cl.map(p=>({pl:p[0],en:p[1]}));
 const h=hsh(G.fed.id),r=[];for(let i=0;i<8;i++){const b=BIGN[(h+i*13)%BIGN.length];r.push({pl:b[0],en:b[1]})}return r}
function ppvEnsure(){if(!G.ppv||!G.ppv.length)G.ppv=ppvDefault();return G.ppv}
function ppvNextWeek(){return G.week%4===0?G.week:G.week+(4-G.week%4)}
function ppvName(wk,lg){
 const l=ppvEnsure(),idx=Math.round((wk-ppvNextWeek())/4),i=((idx%l.length)+l.length)%l.length;
 return (lg||lang)==='pl'?l[i].pl:l[i].en}
function ppvRotate(){const l=ppvEnsure();if(l.length>1)l.push(l.shift());__bnG=null}
Object.assign(D,{'nav.ppv':['PPV/PLE','PPV/PLE'],
 'pv.sub':['Lista nazw wielkich gal Twojej federacji. Pierwsza pozycja to najbliższa gala (co 4 tygodnie); po każdej gali pozycja trafia na koniec listy. Zmień nazwy i kolejność jak chcesz.','Names of your promotion\'s big shows. The first entry is the next show (every 4 weeks); after each show it moves to the end of the list. Edit names and order as you like.'],
 'pv.upc':['Najbliższe gale','Upcoming shows'],'pv.list':['Lista gal','Show list'],'pv.wk':['Tydz. {n}','Wk {n}'],
 'pv.add':['Dodaj','Add'],'pv.addph':['Nazwa nowej gali...','New show name...'],'pv.reset':['Przywróć domyślne','Restore defaults'],
 'pv.up':['W górę','Move up'],'pv.dn':['W dół','Move down'],'pv.del':['Usuń','Delete']});
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
/* ============ Real champions seeded into gameplay + continents ============ */
const CHAMPS={
kpw:[['world',null,['Filip Fuks']],['second','KPW Oldtown Championship',['Leon Lato']]],
flw:[['world','Freelance World Championship',['Trevor Outlaw']],['tag','Freelance Tag Team Championship',['Davey Bangg','August Mathews']],['second','Freelance Legacy Championship',['Chico Suavé']]],
nst:[['world','PCW Heavyweight Championship',['RP Davis']],['second','PCW Cruiserweight Championship',['Jack Jonson']],['tag','PCW Tag Team Championship',['Rampage Braun','Tyson T-Bonne']],['wworld','PCW Women\'s Championship',['Commander Stefanie Sterlin']]],
rpc:[['world','WrestlingKULT Championship',['Mike Schwarz']],['tag','WrestlingKULT Tag Team Championship',['Don Shin','Kevin Kaydan']],['wworld','WrestlingKULT Women\'s Championship',['Amalé']]],
tfc:[['world','Crash Heavyweight Championship',['D-Luxe']],['second','Crash Cruiserweight Championship',['Anubiss']],['tag','Crash Tag Team Championship',['El Texano Junior','Super Novva']],['x','Crash Junior Championship',['Zonic']],['wworld','Crash Women\'s Championship',['Lady Shadoww']]],
tir:[['world','Superkick-D Championship',['Dallas Kyle']],['second','Superkick-D 420 Championship',['Dior Nolinz']],['tag','Kings of the 6IX Tag Team Championship',['Psycho Mikee','Duragg']]],
nfw:[['world','NFW Heavyweight Championship',['Dmitri Orlovsky']],['second','NFW Moscow Championship',['Aleksei Prisiazhny']],['x','NFW Lightweight World Championship',['Artem Vlasik']],['x','NFW Extreme Championship',['Akamir Bojkin']],['tag','NFW Tag Team Championship',['Digital Mesiah','Ronnie Carmine']],['wworld','NFW Women\'s Championship',['Alisa Ostrovska']]],
uwa:[['world','UWA World Championship',['Adam Hart']],['second','UWA Extreme Championship',['Ranger Leon']],['tag','UWA Tag Team Championship',['Miller Volodymyr','Zlovisniy Voron']]],
fcf:[['world','FCS Finnish Heavyweight Championship',['Septimus Rex']],['second','FCS Nordic Championship',['Jake Luupaa']],['tag','FCS Tag Team Championship',['Koobra Kovanen','Raivo Romppanen']]],
sth:[['world','STW Championship',['Emil fran Holo']],['second','STW Swedish Heavyweight Championship',['Captain TooT TooT']],['x','STW Glam Championship',['Youngblood Glam']]],
nwf:[['world','NWB Norwegian Championship',['Espen Olsson']],['second','NWB West Coast Championship',['Fredrik Den Store']],['x','NWB European Heavyweight Championship',['Jonny Stormen']],['tag','NWB Tag Team Championship',['Aron Frosten','Erik Isaksson']]],
dpw:[['world','DWP World Championship',['Nitro Greenfield']],['second','DWP Heavyweight Championship',['Robert Starr']],['x','DWP Light Heavyweight Championship',['El Tesoro Nego']],['tag','DWP Tag Team Championship',['Christian Colombus','Nicolai Wachman']]],
pwh:[['world','PWN Heavyweight Championship',['Lorenzo Linna']],['second','PWN Television Championship',['TANK Dutch']],['tag','PWN Tag Team Championship',['Axl Starr','Scotty Valentin']],['wworld','PWN Women\'s Championship',['Julia Stone']]],
pwb:[['world','PWB European Allstar Championship',['Noe Ahuka Jr']],['second','PWB DareDevil Championship',['O. Nathaniel']],['tag','PWB Tag Team Championship',['Rami Romero','Joel Vauxe']],['wworld','PWB Queen of Diamonds Championship',['Calypsa']]],
ewa:[['world','EWL World Heavyweight Championship',['Kris Rabber']],['second','EWL Intercontinental Championship',['Iestin Rees']],['x','EWL European Championship',['Martin Payne']],['x','EWL Austrian National Championship',['Rage Sniper']],['tag','EWL Tag Team Championship',['Barbarossa Wrath','Curtis Blaque']],['wworld','EWL Women\'s Championship',['Mila Smitt']]],
hcw:[['world','HUN Championship',['Icarus Hun']],['second','HUN Revolution Championship',['Kris Jokich']],['x','HUN Passion Championship',['Sentinell']],['tag','HUN Tag Team Championship',['Mylan Boros','Zafar Amen Hun']]],
cwf:[['world','HWF Heavyweight Championship',['Frozen Flame']],['tag','HWF Tag Team Championship',['Krampus Bal','Iron Benn']],['wworld','HWF Balkan Women\'s Championship',['Wesna Busich']]],
zmk:[['world','ZMK Championship',['Leonidas Tombolis']],['second','ZMK International Championship',['Markellos Komninos']],['x','ZMK Cyprus Championship',['Ninja Cyprus']],['tag','ZMK Tag Team Championship',['Mr. Perris','Gedeon Tax']]],
bwe:[['world','BWV Heavyweight Championship',['Sexy Kev']],['second','BWV National Championship',['Asen Bg']],['tag','BWV Tag Team Championship',['Nsereko Lion','Sebb Strife']]],
tpw:[['world','TPW Heavyweight Championship',['Murat Bosphorus']],['second','TPW Intercontinental Championship',['Ozgur Bakir']]],
saw:[['world','SAW Heavyweight Championship',['Johnny Palazzo']],['second','SAW Cruiserweight Championship',['Romeo Valentino Jr']]],
qpw:[['world','QPW Championship',['Mustafa Alley']],['second','QPW Middle East Championship',['Matt Cardone']],['x','QPW King of Ladders Championship',['Shaheen Gold']],['x','QPW Qatar Championship',['Classy Alley']],['tag','QPW Tag Team Championship',['Anas Rexx','Sam Ex']]],
sgw:[['world','LCW Singapore Championship',['Carlo Cannan']],['x','LCW Hardcore Championship',['Mason Dollar']],['tag','LCW Southeast Asian Tag Team Championship',['The Statement Sg','Emman Azmin']],['wworld','LCW Queen of Asia Championship',['Miss Selene']]],
mkw:[['world','MEW World Championship',['Ho Ho Lan']],['tag','MEW Tag Team Championship',['Benji Chen','Sunny Zed']]],
ind:[['world','WSI Indian Championship',['Baliyan Akki']],['second','WSI Intercontinental Championship',['Deepak Rana']],['tag','WSI Tag Team Championship',['Rudra Singh','Shera Khan']]],
ctw:[['world','CTW World Heavyweight Championship',['Lencastro']],['second','CTW European Championship',['Red Eagle Pt']]],
fal:[['world','FAL Championship',['Alan Strongh']]]
};
const champPri=w=>{const c=CHAMPS[G&&G.fed&&G.fed.id];return c&&c.some(x=>x[2].indexOf(w.name)>=0)?1:0};
const XSTRAP=['#6a3aa8','#b26a1a','#13a89e','#e8782a','#1f3f8a'];
function champSeed(){
 G.rivals.forEach(r=>{const sp=CHAMPS[r.id];if(!sp)return;const wd=sp.find(x=>x[0]==='world');const w=wd&&G.ws.find(z=>z.fed===r.id&&z.name===wd[2][0]);if(w)r.champ=w.id});
 const sp=CHAMPS[G.fed.id];if(!sp||FEDTITLES[G.fed.id])return;
 const wp=Math.min(5,G.fed.tier+1),used=new Set(),seeded=new Set(),M={w:'w',s:'s',tg:'tg'},KID={world:'w',second:'s',tag:'tg',wworld:'ww',wtag:'wt'};let xi=0;
 const idOf=nm=>{const w=mine().find(z=>z.name===nm);return w?w.id:null};
 sp.forEach(([k,name,names])=>{const ids=names.map(idOf);if(ids.some(i=>!i))return;
  let tt=k==='x'?null:G.titles.find(x=>x.id===KID[k]);
  if(k==='x'){tt={id:'x'+(++xi),g:'m',kind:'second',name:null,prestige:Math.max(1,wp-2),teams:1,strap:XSTRAP[xi%XSTRAP.length],plate:'silver',holders:[],since:1};G.titles.push(tt)}
  if(!tt||tt.teams!==ids.length)return;
  tt.holders=ids;if(name)tt.name=name;ids.forEach(i=>used.add(i));seeded.add(tt.id)});
 G.titles.forEach(tt=>{if(seeded.has(tt.id)||!tt.holders.some(i=>used.has(i)))return;
  const pool=mine().filter(w=>!used.has(w.id)&&(tt.g==='f')===(w.g==='f')&&!w.injury).sort((a,b)=>b.pop-a.pop);
  tt.holders=pool.slice(0,tt.teams).map(w=>w.id);tt.holders.forEach(i=>used.add(i))});
 // rivalries and alliances from the champions
 try{const hw=(G.titles.find(x=>x.id==='w')||{}).holders||[],hs=(G.titles.find(x=>x.id==='s')||{}).holders||[];
  if(hw[0]&&hs[0])relLink(W(hw[0]),W(hs[0]),'rv');
  G.titles.forEach(tt=>{if(tt.teams===2&&tt.holders.length===2)relLink(W(tt.holders[0]),W(tt.holders[1]),'al')})}catch(e){}
}
/* continents */
const CONTS=['na','la','eu','as','oc','af'];
const contOf=cc=>REGION[cc]||'x';
Object.assign(D,{'ct.na':['Ameryka Północna','North America'],'ct.la':['Ameryka Południowa i Środkowa','Latin America'],'ct.eu':['Europa','Europe'],'ct.as':['Azja i Bliski Wschód','Asia & Middle East'],'ct.oc':['Oceania','Oceania'],'ct.af':['Afryka','Africa'],'ct.x':['Inne','Other'],'ui.continent':['Kontynent','Continent'],'ui.sCt':['Kontynent','Continent']});
/* ============ Continental cups + World Cup (pure skill) ============ */
const CUPS=[
 {id:'oc',cont:'oc',wk:8,size:8},{id:'af',cont:'af',wk:13,size:8},{id:'la',cont:'la',wk:18,size:8},
 {id:'na',cont:'na',wk:23,size:8},{id:'as',cont:'as',wk:28,size:8},{id:'eu',cont:'eu',wk:33,size:8},{id:'world',cont:null,wk:44,size:16}];
const cupName=c=>t('cup.'+c.id);
function cupsEnsure(){if(!G.cups)G.cups={hist:[],last:null,win:{}};return G.cups}
function cupPower(w){return(w.ring*.5+((w.str+w.spd+w.tec+w.sta+w.psy)/5)*.4+w.cha*.1)*(1-Math.max(0,(w.fatigue||0)-50)/250)}
function cupFed(w){if(w.fed===G.fed.id)return G.fed.short;const r=G.rivals.find(x=>x.id===w.fed);return r?(r.short||r.name):'FA'}
function cupNext(){const wk=woy();let best=null;CUPS.forEach(c=>{const d=(c.wk-wk+52)%52;if(!best||d<best.d)best={c,d}});return best}
function cupCands(c){return mine().filter(w=>!w.injury&&!w.farewell&&(c.id==='world'||contOf(w.country)===c.cont)).sort((a,b)=>cupPower(b)-cupPower(a))}
function cupAiField(c,n,skip){
 const cs=cupsEnsure(),yr=yearOf(G.week),pre=[];
 if(c.id==='world')CUPS.forEach(x=>{const id=cs.win[yr+':'+x.id];const w=id&&W(id);if(w&&w.fed!==G.fed.id&&!w.injury&&w.fed!=='RET')pre.push(w)});
 const pool=G.ws.filter(w=>!w.ext&&w.fed!==G.fed.id&&w.fed!=='RET'&&w.fed!=='PRO'&&!w.injury&&(c.id==='world'||contOf(w.country)===c.cont)&&pre.indexOf(w)<0).sort((a,b)=>cupPower(b)-cupPower(a));
 const cnt={},out=pre.slice();out.forEach(w=>cnt[w.fed]=(cnt[w.fed]||0)+1);
 for(const w of pool){if(out.length>=n)break;if((cnt[w.fed]||0)>=2&&w.fed!=='FA')continue;out.push(w);cnt[w.fed]=(cnt[w.fed]||0)+1}
 return out.slice(0,n)}
const CUPR={8:['qf','sf','f'],16:['r16','qf','sf','f']};
async function cupRun(c){
 const cs=cupsEnsure(),yr=yearOf(G.week),nm=cupName(c);
 const cand=cupCands(c).slice(0,6);let own=null;
 addNews('n.cupstart',{c:nm});
 if(cand.length){
  const opts=cand.map(w=>({l:esc(w.name)+' — '+t('cup.pow',{p:Math.round(cupPower(w))}),dis:false})).concat([{l:t('cup.skip')}]);
  const i=await askGeneric(t('cup.inv.t',{c:nm}),t('cup.inv.b',{c:nm,n:c.size,k:c.id==='world'?t('cup.kw'):t('cup.kc',{k:t('ct.'+c.cont)})}),opts);
  if(i<cand.length)own=cand[i]}
 let boost=0;const log=[];
 if(own){
  {const cost=r10(wkRev()*.25);
   const i=await askGeneric(t('cup.e1.t'),t('cup.e1.b',{w:own.name,m:money(cost)}),[{l:t('cup.e1.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('cup.e1.2')}]);
   if(i===0){G.fed.cash-=cost;boost+=4;own.fatigue=Math.max(0,own.fatigue-10)}}
  if(rnd()<.45){const m=r10(wkRev()*.3);const i=await askGeneric(t('cup.e2.t'),t('cup.e2.b',{w:own.name,m:money(m)}),[{l:t('cup.e2.1',{m:money(m)})},{l:t('cup.e2.2')}]);
   if(i===0){G.fed.cash+=m;evMood(own,-2)}else evMood(own,3)}}
 let field=cupAiField(c,c.size-(own?1:0));if(own)field.push(own);
 if(field.length<4){return}
 let sz=1;while(sz*2<=field.length)sz*=2;if(sz>c.size)sz=c.size;
 field=field.sort((a,b)=>cupPower(b)-cupPower(a)+(rnd()-.5)*6).slice(0,sz);
 // seeded bracket 1vN, 2v(N-1)...
 let cur=[];for(let i=0;i<sz/2;i++)cur.push([field[i],field[sz-1-i]]);
 const rn=CUPR[sz]||(sz===4?['sf','f']:['qf','sf','f']);const rounds=[];let ownRound=0,ownDone=!own,champ=null;
 for(let r=0;r<rn.length;r++){
  const res=[],next=[];
  for(const[a,b]of cur){
   let w=null;const hasOwn=own&&(a===own||b===own);
   if(hasOwn){
    if(rn[r]==='sf'&&rnd()<.3){
     const i=await askGeneric(t('cup.e4.t'),t('cup.e4.b',{w:own.name}),[{l:t('cup.e4.1')},{l:t('cup.e4.2')}]);
     if(i===0){boost-=6;if(rnd()<.35)injure(own,2+Math.floor(rnd()*4))}else{w=a===own?b:a}}
    else if(rn[r]===rn[Math.min(1,rn.length-2)]&&r<rn.length-1&&rnd()<.3){
     const m=r10(wkRev()*.5),o=a===own?b:a;
     const i=await askGeneric(t('cup.e3.t'),t('cup.e3.b',{w:own.name,o:o.name,m:money(m)}),[{l:t('cup.e3.1',{m:money(m)})},{l:t('cup.e3.2')}]);
     if(i===0){G.fed.cash+=m;w=o;evMood(own,-8);if(rnd()<.3){G.fed.pop=clamp(G.fed.pop-1.5,2,100);addNews('n.cupbribe',{w:own.name})}}else{evMood(own,6);boost+=1}}}
   if(!w){const pa=cupPower(a)+(a===own?boost:0),pb=cupPower(b)+(b===own?boost:0);w=rnd()<1/(1+Math.exp(-(pa-pb)/7))?a:b}
   if(hasOwn){const l=w===own?(a===own?b:a):own;if(w===own){ownRound++;log.push(t('cup.r.'+rn[r])+': '+t('cup.won',{o:l.name}))}else{log.push(t('cup.r.'+rn[r])+': '+t('cup.lost',{o:w.name}));ownDone=true}
    own.fatigue=clamp((own.fatigue||0)+12,0,100);if(!own.injury&&rnd()<.04)injure(own,1+Math.floor(rnd()*3))}
   res.push({a:a.name,b:b.name,w:w.name,fa:cupFed(a),fb:cupFed(b)});next.push(w)}
  rounds.push({r:rn[r],m:res});cur=[];for(let i=0;i<next.length;i+=2)if(next[i+1])cur.push([next[i],next[i+1]]);
  if(next.length===1)champ=next[0]}
 const R=rn.length,ownChamp=own&&champ===own;
 cs.win[yr+':'+c.id]=champ.id;
 // rewards
 const wcup=c.id==='world',k=ownRound;
 if(own){own.pop=clamp(own.pop+k*(wcup?1.1:.8)+(ownChamp?(wcup?7:4):0),1,100);evMood(own,k*3+(ownChamp?10:0));
  G.fed.pop=clamp(G.fed.pop+(ownChamp?(wcup?2.5:1.2):k*.15),2,100);
  const prize=ownChamp?r10(wkRev()*(wcup?5:2.5)):k===R-1?r10(wkRev()*(wcup?1.5:.8)):0;if(prize)G.fed.cash+=prize;
  if(ownChamp){own.cups=(own.cups||[]).concat([{id:c.id,yr}])}
  log.unshift(own.name+':');
  await askGeneric(t(ownChamp?'cup.res.win':'cup.res.t',{c:nm}),(ownChamp?t('cup.res.wb',{w:own.name,c:nm})+' ':'')+log.join(' · ')+(prize?' · '+t('cup.prize',{m:money(prize)}):''),[{l:t('ev.w.ok')}])}

 if(!ownChamp){champ.pop=clamp(champ.pop+(wcup?2.5:1.5),1,100);champ.cups=(champ.cups||[]).concat([{id:c.id,yr}])}
 cs.hist.push({yr,id:c.id,champ:champ.name,fed:cupFed(champ),own:!!own,ownName:own?own.name:'',k,ownChamp:!!ownChamp});
 cs.hist=cs.hist.slice(-40);cs.last={id:c.id,yr,wk:G.week,rounds,own:own?own.name:null,champ:champ.name};
 addNews('n.cupwin',{c:nm,w:champ.name});
 twAdd('cup',{w:champ.name,c:nm},ownChamp?'me':'wire',ownChamp?.8:.2);
 save()}
async function cupWeekly(){const c=CUPS.find(x=>x.wk===woy());if(!c)return;try{await cupRun(c)}catch(e){console.error&&console.error('cup',e)}}
function cupHtml(w){const l=(w.cups||[]).slice(-4);return careerHtml(w)+(l.length?'<div style="font-size:13px;color:var(--gold)">🏆 '+l.map(x=>esc(t('cup.'+x.id))+' '+x.yr).join(', ')+'</div>':'')}
function vCup(){
 const cs=cupsEnsure(),nx=cupNext(),wk=woy();
 let h='<div class="top"><div><h2>'+t('nav.cup')+'</h2><div class="mute" style="max-width:72ch">'+t('cup.sub')+'</div></div></div>';
 h+='<div class="card stack"><h3>'+t('cup.sched')+'</h3><div class="scroll"><table><tbody>'+CUPS.map(c=>{const d=(c.wk-wk+52)%52;const n=cupCands(c).length;return '<tr'+(nx&&nx.c===c?' style="background:var(--panel2)"':'')+'><td><b>'+esc(cupName(c))+'</b></td><td class="mute">'+t('cup.wk',{n:c.wk})+'</td><td>'+(d===0?t('cup.now'):t('cup.in',{n:d}))+'</td><td class="mute">'+t('cup.elig',{n:n})+'</td></tr>'}).join('')+'</tbody></table></div></div>';
 const L=cs.last;
 if(L){h+='<div class="card stack"><h3>'+esc(cupName({id:L.id}))+' · '+t('cup.yr',{y:L.yr})+'</h3><div class="mute">'+t('cup.champ',{w:L.champ})+'</div>'+L.rounds.map(r=>'<div><div class="px">'+t('cup.r.'+r.r)+'</div>'+r.m.map(m=>'<div class="row" style="gap:6px;font-size:13px"><span'+(m.w===m.a?' style="color:var(--gold)"':'')+'>'+esc(m.a)+' <span class="mute">('+esc(m.fa)+')</span></span><span class="mute">vs</span><span'+(m.w===m.b?' style="color:var(--gold)"':'')+'>'+esc(m.b)+' <span class="mute">('+esc(m.fb)+')</span></span></div>').join('')+'</div>').join('')+'</div>'}
 h+='<div class="card stack"><h3>'+t('cup.hall')+'</h3>'+(cs.hist.length?cs.hist.slice().reverse().map(x=>'<div class="row spread" style="gap:8px"><span>'+esc(cupName({id:x.id}))+' '+x.yr+'</span><span><b'+(x.ownChamp?' style="color:var(--gold)"':'')+'>'+esc(x.champ)+'</b> <span class="mute">('+esc(x.fed)+')</span>'+(x.own&&!x.ownChamp?' <span class="mute">· '+esc(x.ownName)+' +'+x.k+'</span>':'')+'</span></div>').join(''):'<div class="mute">'+t('cup.none')+'</div>')+'</div>';
 return h}
Object.assign(D,{
 'nav.cup':['Turnieje','Tournaments'],
 'cup.oc':['Puchar Oceanii','Oceania Cup'],'cup.af':['Puchar Afryki','Africa Cup'],'cup.la':['Puchar Ameryki Łacińskiej','Latin America Cup'],'cup.na':['Puchar Ameryki Północnej','North America Cup'],'cup.as':['Puchar Azji','Asia Cup'],'cup.eu':['Puchar Europy','Europe Cup'],'cup.world':['Puchar Świata Ring Boss','Ring Boss World Cup'],
 'cup.sub':['Turnieje kontynentalne (8 zawodników) i Puchar Świata (16). Wybierasz reprezentanta, a o wyniku decydują wyłącznie umiejętności i zmęczenie, bez bookingu.','Continental cups (8 wrestlers) and the World Cup (16). You pick a representative; results depend purely on skill and fatigue, no booking.'],
 'cup.yr':['rok {y}','year {y}'],'cup.sched':['Kalendarz','Calendar'],'cup.wk':['tydzień {n}','week {n}'],'cup.now':['TERAZ','NOW'],'cup.in':['za {n} tyg.','in {n} wk'],'cup.elig':['Twoi zawodnicy: {n}','Your wrestlers: {n}'],
 'cup.hall':['Historia zwycięzców','Winners history'],'cup.none':['Brak rozegranych turniejów.','No tournaments played yet.'],'cup.champ':['Zwycięzca: {w}','Winner: {w}'],
 'cup.pow':['siła {p}','power {p}'],'cup.skip':['Nie wysyłam nikogo','Send nobody'],'cup.kc':['Mogą wystąpić zawodnicy z kontynentu: {k}.','Open to wrestlers from: {k}.'],'cup.kw':['Otwarty dla zawodników z całego świata.','Open to wrestlers worldwide.'],
 'cup.inv.t':['Turniej: {c}','Tournament: {c}'],'cup.inv.b':['Startuje {c} ({n} uczestników). {k} Wybierz reprezentanta federacji. O wyniku zdecydują umiejętności i zmęczenie.','{c} is starting ({n} entrants). {k} Pick your representative. Skill and fatigue decide the result.'],
 'cup.r.r16':['1/8 finału','Round of 16'],'cup.r.qf':['Ćwierćfinał','Quarterfinal'],'cup.r.sf':['Półfinał','Semifinal'],'cup.r.f':['Finał','Final'],
 'cup.won':['wygrana z {o}','beat {o}'],'cup.lost':['porażka z {o}','lost to {o}'],'cup.prize':['nagroda {m}','prize {m}'],
 'cup.res.t':['Koniec turnieju: {c}','Tournament over: {c}'],'cup.res.win':['Zwycięstwo w turnieju: {c}!','Tournament won: {c}!'],'cup.res.wb':['{w} wygrywa {c}!','{w} wins {c}!'],
 'cup.e1.t':['Przygotowania','Preparation'],'cup.e1.b':['Trener proponuje intensywne przygotowania {w} do turnieju. Koszt {m}.','The coach suggests intensive preparation for {w}. Cost {m}.'],'cup.e1.1':['Zainwestuj ({m}, +siła)','Invest ({m}, +power)'],'cup.e1.2':['Bez dodatkowych przygotowań','No extra preparation'],
 'cup.e2.t':['Oferta sponsora','Sponsor offer'],'cup.e2.b':['Sponsor oferuje {m} za noszenie logo przez {w} podczas turnieju.','A sponsor offers {m} for {w} to wear their logo at the tournament.'],'cup.e2.1':['Przyjmij (+{m})','Accept (+{m})'],'cup.e2.2':['Odmów','Decline'],
 'cup.e3.t':['Podejrzana oferta','Shady offer'],'cup.e3.b':['Ktoś z otoczenia {o} oferuje {m}, jeśli {w} odda im walkę.','Someone from {o}\'s camp offers {m} if {w} throws the match.'],'cup.e3.1':['Przyjmij ({m}, przegrana walka)','Accept ({m}, lose the match)'],'cup.e3.2':['Odmów i walcz uczciwie','Refuse and fight clean'],
 'cup.e4.t':['Uraz w półfinale','Semifinal knock'],'cup.e4.b':['{w} skręca kostkę tuż przed półfinałem.','{w} twists an ankle just before the semifinal.'],'cup.e4.1':['Walcz mimo bólu (słabszy, ryzyko kontuzji)','Fight through (weaker, injury risk)'],'cup.e4.2':['Wycofaj się (walkower)','Withdraw (walkover)'],
 'n.cupstart':['Rusza turniej: {c}.','{c} is starting.'],'n.cupwin':['{w} wygrywa turniej: {c}.','{w} wins {c}.'],'n.cupbribe':['Plotki o ustawionej walce z udziałem {w}.','Rumours of a fixed match involving {w}.'],
 'tw.cup':['{w} wygrywa {c}! Co za turniej!','{w} wins {c}! What a tournament!']
});
TWGEN.cup='gw';
/* ============ Board (goals/confidence), TV ratings, Legacy (records, Hall of Fame, years, achievements) ============ */
const BQ=13;
const OWNERS=[['Richard Hanes',1.0],['Margaret Voss',.8],['Viktor Kral',1.25],['Lena Okafor',.9],['Samuel Brandt',1.1],['Hiroshi Tanabe',.85]];
function boardEnsure(){if(!G.board){const o=pickR(OWNERS);G.board={conf:60,owner:o[0],pat:o[1],qs:0,goals:[],hist:[],sold:0,bs:0,warn:-99,mode:1}}return G.board}
function fedRank(){return allFeds().findIndex(f=>f.id===G.fed.id)+1}
function goalPool(){
 const p=['rating','profit','pop','rank','streak','sell'];
 const cupSoon=CUPS.some(c=>{const d=(c.wk-woy()+52)%52;return d<BQ&&d>0&&cupCands(c).length});if(cupSoon)p.push('cup','cup');
 return p}
function mkGoal(k,m){const b=boardEnsure(),dm=m;
 const g={k,done:null,base:0};
 if(k==='rating')g.tar=Math.round(clamp(2.85+G.fed.tier*.04+(dm-1)*.5,2.6,3.9)*10)/10;
 else if(k==='profit')g.tar=r10(Math.max(wkRev()*1.2,800)*dm);
 else if(k==='pop'){g.tar=Math.round(clamp(3.2-G.fed.pop/40,.8,3)*dm*10)/10;g.base=G.fed.pop}
 else if(k==='rank'){const r=fedRank();g.tar=Math.max(1,r-(dm>1.1?2:1));if(r===1)g.tar=1}
 else if(k==='streak')g.tar=dm>1.1?3:2;
 else if(k==='sell')g.tar=dm>1.1?3:dm<.9?1:2;
 else if(k==='cup')g.tar=1;
 return g}
function newGoals(m){const b=boardEnsure();const pool=goalPool(),out=[];const sh=shuffle(pool.slice());for(const k of sh){if(out.length>=3)break;if(out.some(g=>g.k===k))continue;out.push(mkGoal(k,m))}
 b.goals=out;b.qs=G.week;b.bs=0;b.sold=0;b.cupk=0;b.mode=m;b.pc0=G.fed.cash;b.profit=0}
function goalCur(g){const b=boardEnsure();
 const hs=G.hist.filter(h=>h.week>=b.qs);
 if(g.k==='rating')return hs.length>=3?hs.reduce((s,h)=>s+h.rating,0)/hs.length:0;
 if(g.k==='profit')return b.profit;
 if(g.k==='pop')return G.fed.pop-g.base;
 if(g.k==='rank')return fedRank();
 if(g.k==='streak')return b.bs;
 if(g.k==='sell')return b.sold;
 if(g.k==='cup')return b.cupk;return 0}
function goalMet(g){const c=goalCur(g);return g.k==='rank'?c<=g.tar:c>=g.tar}
function goalTxt(g){return t('bg.'+g.k,{n:g.k==='profit'?money(g.tar):g.k==='rating'||g.k==='pop'?f1(g.tar):g.tar})}
function goalProg(g){const c=goalCur(g);if(g.k==='rank')return clamp((fedRank()<=g.tar?100:100-(fedRank()-g.tar)*25),0,100);return clamp(g.tar>0?c/g.tar*100:0,0,100)}
function goalVal(g){const c=goalCur(g);return g.k==='profit'?money(c):g.k==='rating'||g.k==='pop'?f1(c):g.k==='rank'?'#'+c:String(c)}
async function boardMeeting(first){
 const b=boardEnsure();
 const i=await askGeneric(t('bd.meet.t'),t(first?'bd.meet.b1':'bd.meet.b',{o:b.owner}),[{l:t('bd.meet.1')},{l:t('bd.meet.2')},{l:t('bd.meet.3')}]);
 const m=i===1?1.3:i===2?.8:1;newGoals(m);if(i===2)b.conf=clamp(b.conf-2,0,100);
 addNews('n.bdgoals');save();
 await askGeneric(t('bd.goals.t'),b.goals.map(g=>goalTxt(g)).join(' · '),[{l:t('ev.w.ok')}])}
async function boardQuarterEnd(){
 const b=boardEnsure();const res=b.goals.map(g=>({g,ok:goalMet(g)}));const okN=res.filter(r=>r.ok).length,amb=b.mode>1.1,easy=b.mode<.9;
 let d=0;res.forEach(r=>{d+=r.ok?5:-4.5*(amb?1.3:1)*b.pat});if(okN===3)d+=4;
 const bonus=okN===3?r10(wkRev()*1.5*(amb?1.6:easy?.6:1)):0;if(bonus)G.fed.cash+=bonus;
 b.conf=clamp(b.conf+d,0,100);b.hist.unshift({wk:G.week,ok:okN,n:res.length,d:Math.round(d),bonus});b.hist=b.hist.slice(0,12);
 addNews(okN===3?'n.bdgood':okN===0?'n.bdbad':'n.bdmid',{k:okN});
 await askGeneric(t('bd.end.t'),res.map(r=>(r.ok?'✓ ':'✗ ')+goalTxt(r.g)).join(' · ')+' · '+t('bd.end.d',{c:(d>=0?'+':'')+Math.round(d)})+(bonus?' · '+t('bd.end.bonus',{m:money(bonus)}):''),[{l:t('ev.w.ok')}])}
async function boardWeekly(){
 const b=boardEnsure();const last=G.hist[G.hist.length-1];
 if(last&&last.week!==b.lastHW){b.lastHW=last.week;b.profit+=last.rev-last.cost;if(G.summary&&G.summary.sold)b.sold++;b.bs=Math.max(b.bs,G.streak||0);
  let dc=0;if(last.rating>=3.5)dc+=.4;else if(last.rating<2)dc-=.6*b.pat;if(last.rev-last.cost<0)dc-=.15*b.pat;b.conf=clamp(b.conf+dc,0,100)}
 if(G.fed.cash<0)b.conf=clamp(b.conf-1.2*b.pat,0,100);
 if(!b.goals.length){await boardMeeting(true);return}
 if(G.week-b.qs>=BQ){await boardQuarterEnd();await boardMeeting(false)}
 if(b.conf<28&&G.week-b.warn>=10){b.warn=G.week;await askGeneric(t('bd.warn.t'),t('bd.warn.b',{o:b.owner,c:Math.round(b.conf)}),[{l:t('ev.w.ok')}])}
 if(b.conf<=0&&G.week>BQ*4&&!b.reprieve){b.reprieve=1;b.conf=25;await askGeneric(t('bd.last.t'),t('bd.last.b',{o:b.owner}),[{l:t('ev.w.ok')}])}
 if(b.conf<=0&&G.week>BQ*4&&!G.fired){G.fired=1;save();
  openModal(firedModal(b));return true}
}
/* ---------- TV ratings ---------- */
const TVV=[900,7e3,50e3,320e3,2.2e6];
function viewersFor(tier,pop,rating){return TVV[tier-1]*(.4+pop/100*1.2)*Math.pow(clamp(rating/3,.35,1.7),1.5)}
function tvEnsure(){if(!G.tvr)G.tvr={h:[],vmod:0,vwk:0,tvt:0,war:null};return G.tvr}
function fmtV(v){return v>=1e6?f2(v/1e6)+(lang==='pl'?' mln':'M'):v>=1e3?num(v/1e3)+(lang==='pl'?' tys.':'K'):num(v)}
function tvAvg(n){const h=tvEnsure().h.slice(-(n||8));return h.length?h.reduce((s,x)=>s+x.v,0)/h.length:0}
function tvTarget(){return Math.round(viewersFor(G.fed.tier,G.fed.pop,3)*.92)}
function tvRecord(rating){const v=tvEnsure();let vw=viewersFor(G.fed.tier,G.fed.pop,rating)*studioMul()*(.93+rnd()*.14)*(v.vwk>0?1+v.vmod:1);if(v.vwk>0)v.vwk--;
 const comp=G.rivals.filter(r=>Math.abs(r.pop-G.fed.pop)<=14&&r.tier>=Math.max(1,G.fed.tier-1)).map(r=>({n:r.short||r.name,v:viewersFor(r.tier,r.pop,2.5+rnd()*1.0)*(.93+rnd()*.14)})).sort((a,b)=>b.v-a.v).slice(0,3);
 const rk=1+G.rivals.filter(r=>viewersFor(r.tier,r.pop,2.5+rnd())>vw).length;
 v.h.push({w:G.week,v:Math.round(vw),rk,comp});if(v.h.length>40)v.h.shift();
 let bonus=0;const m=media();if(m.p==='tv'&&m.tvb&&vw>=m.tvt)bonus=Math.round(m.fee*.5);
 return bonus}
function tvRenewNeeded(){const m=media();return m.p==='tv'&&!m.renewAsked&&G.week>=m.exp-2&&G.week<m.exp}
async function tvRenew(){const m=media();if(!tvRenewNeeded())return;m.renewAsked=true;
 const avg=tvAvg(8),tg=m.tvt||tvTarget(),ok=avg>=tg;const base=tvFee();
 const fee1=Math.round(base*(ok?1.15:.9)/10)*10,fee2=Math.round(fee1*.78/10)*10,tgn=Math.round(Math.max(tg,viewersFor(G.fed.tier,G.fed.pop,3)*.95));
 const v={a:fmtV(avg),t:fmtV(tg),f1:money(fee1),f2:money(fee2),t2:fmtV(tgn)};
 const i=await askGeneric(t('tv.rn.t'),t(ok?'tv.rn.bok':'tv.rn.bbad',v),[{l:t('tv.rn.1',v)},{l:t('tv.rn.2',v)},{l:t('tv.rn.3')}]);
 if(i===0){G.media={k:'tv',p:'tv',fee:fee1,exp:G.week+TVWEEKS+(m.exp-G.week),last:m.last||'yt',chg:G.week,tvt:tgn,tvb:0,renewAsked:false};addNews('n.tvrenew',{f:money(fee1)})}
 else if(i===1){G.media={k:'tv',p:'tv',fee:fee2,exp:G.week+TVWEEKS+(m.exp-G.week),last:m.last||'yt',chg:G.week,tvt:tgn,tvb:1,renewAsked:false};addNews('n.tvrenew2',{f:money(fee2)})}
 else{m.exp=G.week+1}
 save()}
/* ---------- Legacy ---------- */
function careerNote(wi,li,parts,res,fin){
 const mk=w=>{if(!w.cs)w.cs={m:0,w:0,l:0,f:0};return w.cs};
 parts.forEach(i=>{const w=W(i);if(!w)return;const c=mk(w);c.m++;if(res.stars>=5)c.f++});
 if(fin!=='draw'){wi.forEach(i=>{const w=W(i);if(w)mk(w).w++});li.forEach(i=>{const w=W(i);if(w)mk(w).l++})}}
function recEnsure(){if(!G.rec)G.rec={rating:{v:0},att:{v:0},rev:{v:0},streak:{v:0},reign:{v:0},viewers:{v:0},pop:{v:0},ytd:null};if(!G.hof)G.hof=[];if(!G.years)G.years=[];if(!G.ach)G.ach={};return G.rec}
function setRec(k,v,extra){const r=G.rec[k];if(v>r.v){r.v=v;r.wk=G.week;Object.assign(r,extra||{});return true}return false}
const ACHS=[
 ['sell',()=>G.summary&&G.summary.sold],['five',()=>G.summary&&G.summary.out&&G.summary.out.some(o=>o.stars>=5)],['str5',()=>(G.streak||0)>=5],
 ['t2',()=>G.fed.tier>=2],['t3',()=>G.fed.tier>=3],['t4',()=>G.fed.tier>=4],['t5',()=>G.fed.tier>=5],
 ['cash',()=>G.fed.cash>=1e6],['cashb',()=>G.fed.cash>=1e8],['cup',()=>G.cups&&G.cups.hist.some(h=>h.ownChamp)],['cupw',()=>G.cups&&G.cups.hist.some(h=>h.ownChamp&&h.id==='world')],
 ['hof',()=>G.hof.length>=1],['hof3',()=>G.hof.length>=3],['top',()=>fedRank()===1],['pop50',()=>G.fed.pop>=50],['conf',()=>G.board&&G.board.conf>=90],['yr3',()=>G.week>=157],['tvk',()=>G.rec&&G.rec.viewers.v>=1e6]];
async function legacyWeekly(){
 recEnsure();const r=G.rec,last=G.hist[G.hist.length-1];
 mine().forEach(w=>{w.ownWk=(w.ownWk||0)+1;w.peak=Math.max(w.peak||0,w.pop)});
 if(last&&last.week!==r.lastHW){r.lastHW=last.week;setRec('rating',last.rating,{wk:last.week});setRec('att',last.att);setRec('rev',Math.round(last.rev));setRec('streak',G.streak||0);
  const tv=tvEnsure().h[tvEnsure().h.length-1];if(tv)setRec('viewers',tv.v);
  if(!r.ytd)r.ytd={n:0,s:0,best:0,c0:G.fed.cash,p0:G.fed.pop,wk0:G.week};r.ytd.n++;r.ytd.s+=last.rating;r.ytd.best=Math.max(r.ytd.best,last.rating)}
 setRec('pop',Math.round(G.fed.pop*10)/10);
 G.titles.forEach(tt=>{const len=G.week-(tt.since||1);if(tt.holders.length&&len>r.reign.v)setRec('reign',len,{n:tt.holders.map(i=>W(i)?W(i).name:'?').join(' & '),t:titleName(tt)})});
 // hall of fame
 for(const w of G.ws){if(w.fed!=='RET'||!(w.ownWk>0)||w.hofDone)continue;w.hofDone=1;
  const ti=G.reigns.filter(x=>x.w.indexOf(w.id)>=0).length,c=w.cs||{m:0,w:0,l:0,f:0},cp=(G.cups?G.cups.hist.filter(h=>h.champ===w.name).length:0);
  const sc=Math.round(w.ownWk/52*4+ti*7+c.f*5+c.w*.12+(w.peak||0)*.5+cp*9);
  if(sc>=55){const e={n:w.name,c:w.country,yr:yearOf(G.week),sc,ti,m:c.m,w:c.w,f:c.f,pk:Math.round(w.peak||0),y:Math.round(w.ownWk/52*10)/10};G.hof.unshift(e);G.fed.pop=clamp(G.fed.pop+.6,2,100);addNews('n.hof',{w:w.name});twAdd('hof',{w:w.name},'me',.8);
   await askGeneric(t('hof.ind.t'),t('hof.ind.b',{w:w.name,t:ti,m:c.m,y:e.y}),[{l:t('ev.w.ok')}])}}
 // achievements
 for(const [id,fn] of ACHS){if(G.ach[id])continue;let ok=false;try{ok=!!fn()}catch(e){}if(ok){G.ach[id]=G.week;addNews('n.ach',{a:t('ach.'+id)})}}
 // yearly review
 if(woy()===1&&G.week>1&&r.ytd){const y=r.ytd,yr=yearOf(G.week)-1;const e={yr,rank:fedRank(),pop:Math.round(G.fed.pop),dp:Math.round((G.fed.pop-y.p0)*10)/10,cash:Math.round(G.fed.cash-y.c0),avg:y.n?Math.round(y.s/y.n*100)/100:0,best:y.best,top:(G.titles[0]&&G.titles[0].holders[0]&&W(G.titles[0].holders[0]))?W(G.titles[0].holders[0]).name:'-'};
  G.years.unshift(e);G.years=G.years.slice(0,20);r.ytd={n:0,s:0,best:0,c0:G.fed.cash,p0:G.fed.pop,wk0:G.week};
  await askGeneric(t('yr.t',{y:yr}),t('yr.b',{r:e.rank,p:e.pop,dp:(e.dp>=0?'+':'')+e.dp,c:money(e.cash),a:f2(e.avg),b:f2(e.best),w:e.top}),[{l:t('ev.w.ok')}])}
}
async function boardTick(){const f=await boardWeekly();return f}
/* ---------- events ---------- */
Object.assign(WEV,{
 async ownerfav(){const b=boardEnsure();const w=pickR(mine().filter(x=>!x.injury&&x.pop<60));if(!w)return false;const v={o:b.owner,w:w.name};
  const i=await evx('ownerfav',v,['1','2'],[false,false]);
  if(i===0){w.pop=clamp(w.pop+2,1,100);b.conf=clamp(b.conf+5,0,100);addNews('n.ofav',v)}else{b.conf=clamp(b.conf-4*b.pat,0,100);evMood(w,-2)}return true},
 async ownervisit(){const b=boardEnsure();const c=r10(wkRev()*.3),v={o:b.owner,m:money(c)};
  const i=await evx('ownervisit',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;b.conf=clamp(b.conf+(G.lastRating>=3?5:2),0,100);addNews('n.ovisit',v)}else b.conf=clamp(b.conf-(G.lastRating<2.5?3:0),0,100);return true},
 async investor(){const b=boardEnsure();const m=r10(wkRev()*6),v={o:b.owner,m:money(m)};
  const i=await evx('investor',v,['1','2'],[false,false]);
  if(i===0){G.fed.cash+=m;b.conf=clamp(b.conf-4,0,100);addNews('n.invest',v)}else b.conf=clamp(b.conf+2,0,100);return true},
 async boardrumor(){const b=boardEnsure();if(b.conf>55)return false;const c=r10(wkRev()*.2),v={o:b.owner,m:money(c)};
  const i=await evx('boardrumor',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;b.conf=clamp(b.conf+4,0,100)}else b.conf=clamp(b.conf-2,0,100);return true},
 async ratingwar(){const v=tvEnsure();if(v.war&&v.war>G.week)return false;const r=G.rivals.filter(x=>Math.abs(x.pop-G.fed.pop)<=15).sort(()=>rnd()-.5)[0];if(!r)return false;const c=r10(wkRev()*.35),x={r:r.name,m:money(c)};
  const i=await evx('ratingwar',x,['1','2'],[G.fed.cash<c,false]);v.war=G.week+8;
  if(i===0){G.fed.cash-=c;v.vmod=.18;v.vwk=4;addNews('n.rwar1',x);twAdd('rwar',{r:r.name},'wire',.2)}else{v.vmod=-.08;v.vwk=4;addNews('n.rwar2',x)}return true},
 async tvexec(){const m=media();if(m.p!=='tv'||tvEnsure().h.length<4)return false;const avg=tvAvg(6),tg=m.tvt||tvTarget();if(avg>=tg)return false;const v={a:fmtV(avg),t:fmtV(tg)};
  const i=await evx('tvexec',v,['1','2'],[false,false]);if(i===0){G.card.forEach(c=>{});evMood(pickR(mine()),-1);G.fed.pop=clamp(G.fed.pop+.2,2,100);tvEnsure().vmod=.08;tvEnsure().vwk=3;addNews('n.tvexec1')}else{boardEnsure().conf=clamp(boardEnsure().conf-2,0,100)}return true},
 async viralclip(){const v=tvEnsure();const w=pickR(mine().filter(x=>!x.injury));if(!w)return false;const x={w:w.name};
  const i=await evx('viralclip',x,['1','2'],[false,false]);
  if(i===0){v.vmod=.25;v.vwk=3;w.pop=clamp(w.pop+1.2,1,100);addNews('n.viral2',x);twAdd('viral',x,'fan:@clipfan',.7)}return true}
});
E('ownerfav','Faworyt właściciela','Owner\'s favorite','{o} chce, żebyś mocniej wypromował {w}.','{o} wants you to push {w}.',[['Spełnij prośbę','Grant the request'],['Odmów','Refuse']]);
E('ownervisit','Właściciel na gali','Owner at the show','{o} zapowiada wizytę na gali. Specjalna oprawa kosztuje {m}.','{o} announces a visit to the show. A special presentation costs {m}.',[['Wystaw specjalną oprawę ({m})','Put on a special presentation ({m})'],['Bez zmian','Business as usual']]);
E('investor','Inwestor','Investor','Inwestor oferuje {m} za większy wpływ na decyzje. {o} nie będzie zachwycony.','An investor offers {m} for more say in decisions. {o} will not be pleased.',[['Przyjmij ({m})','Accept ({m})'],['Odrzuć','Decline']]);
E('boardrumor','Plotki o zwolnieniu','Firing rumors','W mediach krążą plotki, że {o} szuka następcy. Zdementowanie to koszt {m}.','Rumors say {o} is looking for a replacement. A denial costs {m}.',[['Zdementuj ({m})','Deny ({m})'],['Zignoruj','Ignore']]);
E('ratingwar','Wojna oglądalności','Ratings war','{r} przesuwa swoją galę na Twój termin. Kontrprogramowanie kosztuje {m}.','{r} moves its show into your slot. Counter-programming costs {m}.',[['Kontrprogramowanie ({m})','Counter-program ({m})'],['Zignoruj','Ignore']]);
E('tvexec','Niezadowolona telewizja','Unhappy network','Stacja zauważa, że oglądalność ({a}) jest poniżej celu ({t}).','The network notes viewership ({a}) is below target ({t}).',[['Obiecaj poprawę','Promise improvement'],['Zignoruj','Ignore']]);
E('viralclip','Viral','Viral clip','Fragment z udziałem {w} obiegł media społecznościowe.','A clip featuring {w} went viral.',[['Wykorzystaj to','Make the most of it'],['Nie rób nic','Do nothing']]);
Object.assign(D,{
 'nav.board':['Zarząd i TV','Board & TV'],'nav.hof':['Historia','Legacy'],
 'bd.meet.t':['Zebranie zarządu','Board meeting'],'bd.meet.b':['{o} przedstawia cele na kolejny kwartał. Jakie cele przyjmujesz?','{o} presents goals for the next quarter. What do you accept?'],'bd.meet.b1':['{o}, właściciel federacji, chce poznać Twoje plany. Jakie cele przyjmujesz na pierwszy kwartał?','{o}, the owner, wants to hear your plans. What goals do you accept for the first quarter?'],
 'bd.meet.1':['Standardowe cele','Standard goals'],'bd.meet.2':['Ambitne cele (większa premia i kara)','Ambitious goals (bigger bonus and penalty)'],'bd.meet.3':['Łatwiejsze cele (mniejsza premia, −2 zaufania)','Easier goals (smaller bonus, −2 trust)'],
 'bd.goals.t':['Cele na kwartał','Quarter goals'],'bd.end.t':['Podsumowanie kwartału','Quarter review'],'bd.end.d':['zaufanie zarządu {c}','board trust {c}'],'bd.end.bonus':['premia {m}','bonus {m}'],
 'bd.warn.t':['Ostrzeżenie od zarządu','Board warning'],'bd.warn.b':['{o} traci cierpliwość. Zaufanie zarządu spadło do {c}/100. Popraw wyniki, zanim będzie za późno.','{o} is losing patience. Board trust dropped to {c}/100. Improve results before it is too late.'],
 'bd.last.t':['Ostatnia szansa','Last chance'],'bd.last.b':['{o} jest o krok od zwolnienia Cię. Dostajesz ostatnią szansę. Zaufanie zarządu zostaje podniesione do 25.','{o} is one step from firing you. You get one last chance. Board trust is raised to 25.'],
 'bd.fired.t':['Zwolniony!','You are fired!'],'bd.fired.b':['{o} traci zaufanie do Twojej pracy i odwołuje Cię ze stanowiska.','{o} loses faith in your work and removes you from the position.'],
 'bg.rating':['Średnia ocena gal min. {n}★','Average show rating at least {n}★'],'bg.profit':['Zysk w kwartale min. {n}','Quarter profit at least {n}'],'bg.pop':['Wzrost popularności o {n} pkt','Popularity up by {n} pts'],'bg.rank':['Pozycja w rankingu: {n} lub lepiej','Ranking position: {n} or better'],'bg.streak':['Seria {n} gal z oceną 3,5★+','A streak of {n} shows rated 3.5★+'],'bg.sell':['{n} wyprzedane gale','{n} sold-out shows'],'bg.cup':['Reprezentant wygrywa rundę w turnieju','Your representative wins a round in a tournament'],
 'n.bdgoals':['Zarząd ustalił cele na kwartał.','The board set goals for the quarter.'],'n.bdgood':['Zarząd jest zachwycony wynikami kwartału.','The board is delighted with the quarter.'],'n.bdmid':['Zarząd ocenia kwartał jako przeciętny.','The board rates the quarter as average.'],'n.bdbad':['Zarząd jest rozczarowany wynikami kwartału.','The board is disappointed with the quarter.'],
 'n.ofav':['Właściciel jest zadowolony: {w} dostaje push.','The owner is pleased: {w} gets a push.'],'n.ovisit':['Wizyta właściciela {o} wypadła dobrze.','The visit by owner {o} went well.'],'n.invest':['Inwestor wpłacił {m}.','An investor put in {m}.'],'n.rwar1':['Kontrprogramowanie przeciw {r} podbiło oglądalność.','Counter-programming against {r} lifted viewership.'],'n.rwar2':['{r} podbiera widzów Twojej gali.','{r} is taking viewers from your show.'],'n.tvexec1':['Obiecałeś stacji poprawę oglądalności.','You promised the network better viewership.'],'n.viral2':['{w} stał się viralem.','{w} went viral.'],
 'tw.rwar':['{r} odpala wojnę oglądalności! Kto wygra wieczór?','{r} starts a ratings war! Who wins the night?'],'tw.hof':['{w} trafia do Galerii Sław! Legenda.','{w} enters the Hall of Fame! A legend.'],
 'tv.rn.t':['Odnowienie umowy TV','TV deal renewal'],'tv.rn.bok':['Średnia oglądalność {a} (cel {t}). Stacja chce przedłużyć umowę na lepszych warunkach.','Average viewership {a} (target {t}). The network wants to extend on better terms.'],'tv.rn.bbad':['Średnia oglądalność {a} (cel {t}). Stacja proponuje gorsze warunki.','Average viewership {a} (target {t}). The network offers worse terms.'],
 'tv.rn.1':['Stała opłata {f1}/tydz., cel {t2}','Fixed fee {f1}/wk, target {t2}'],'tv.rn.2':['Niższa stała {f2}/tydz. + 50% premii za cel {t2}','Lower fixed {f2}/wk + 50% bonus for target {t2}'],'tv.rn.3':['Nie przedłużaj (przejdź na streaming)','Do not renew (go streaming)'],'n.tvrenew':['Przedłużono umowę TV ({f}/tydz.).','TV deal extended ({f}/wk).'],'n.tvrenew2':['Przedłużono umowę TV z premią ({f}/tydz.).','TV deal extended with bonus ({f}/wk).'],
 'hof.ind.t':['Galeria Sław','Hall of Fame'],'hof.ind.b':['{w} zostaje wprowadzony do Galerii Sław federacji: {t} tytułów, {m} walk, {y} lat u Ciebie.','{w} is inducted into the federation Hall of Fame: {t} titles, {m} matches, {y} years with you.'],'n.hof':['{w} w Galerii Sław.','{w} enters the Hall of Fame.'],
 'yr.t':['Podsumowanie roku {y}','Year {y} in review'],'yr.b':['Ranking: #{r}. Popularność: {p} ({dp}). Wynik finansowy: {c}. Średnia ocena gal: {a}★ (najlepsza {b}★). Mistrz świata: {w}.','Ranking: #{r}. Popularity: {p} ({dp}). Financial result: {c}. Average show rating: {a}★ (best {b}★). World champion: {w}.'],
 'n.ach':['Osiągnięcie: {a}','Achievement: {a}'],
 'ach.sell':['Pierwsza wyprzedana gala','First sold-out show'],'ach.five':['Walka na 5★','A 5★ match'],'ach.str5':['Seria 5 dobrych gal','A streak of 5 good shows'],'ach.t2':['Awans na poziom 2','Reach tier 2'],'ach.t3':['Awans na poziom 3','Reach tier 3'],'ach.t4':['Awans na poziom 4','Reach tier 4'],'ach.t5':['Szczyt: poziom 5','Top: tier 5'],'ach.cash':['Milion w kasie','A million in cash'],'ach.cashb':['Sto milionów w kasie','A hundred million in cash'],'ach.cup':['Wygrany turniej','Won a tournament'],'ach.cupw':['Puchar Świata Twój','World Cup winner'],'ach.hof':['Pierwszy w Galerii Sław','First Hall of Fame inductee'],'ach.hof3':['Trzech w Galerii Sław','Three Hall of Fame inductees'],'ach.top':['Numer 1 w rankingu','Ranked #1'],'ach.pop50':['Popularność 50+','Popularity 50+'],'ach.conf':['Zaufanie zarządu 90+','Board trust 90+'],'ach.yr3':['Trzy lata za sterami','Three years at the helm'],'ach.tvk':['Milion widzów','A million viewers'],
 'ui.board.conf':['Zaufanie zarządu','Board trust'],'ui.board.owner':['Właściciel','Owner'],'ui.goals':['Cele kwartału','Quarter goals'],'ui.qleft':['Do końca kwartału: {n} tyg.','Quarter ends in {n} wk'],'ui.tvh':['Oglądalność','Viewership'],'ui.tvlast':['Ostatnia gala','Last show'],'ui.tvavg':['Średnia (8 gal)','Average (8 shows)'],'ui.tvrank':['Pozycja: #{n}','Position: #{n}'],'ui.tvcomp':['Konkurencja w tym samym przedziale','Competition in your range'],'ui.tvdeal':['Umowa: {p}, cel {t}','Deal: {p}, target {t}'],
 'ui.hist':['Historia kwartałów','Quarter history'],'ui.rec':['Rekordy','Records'],'ui.hof':['Galeria Sław','Hall of Fame'],'ui.years':['Podsumowania lat','Yearly reviews'],'ui.ach':['Osiągnięcia','Achievements'],'ui.none':['Brak.','None yet.'],
 'rec.rating':['Najlepsza gala','Best show'],'rec.att':['Rekord frekwencji','Attendance record'],'rec.rev':['Najwyższy przychód z gali','Highest show revenue'],'rec.streak':['Najdłuższa seria','Longest streak'],'rec.reign':['Najdłuższe panowanie (tyg.)','Longest reign (wks)'],'rec.viewers':['Rekord oglądalności','Viewership record'],'rec.pop':['Najwyższa popularność','Peak popularity'],
 'car.l':['Kariera: {m} walk, {w}-{l}, 5★: {f}','Career: {m} matches, {w}-{l}, 5★: {f}']
});
TWGEN.rwar='gw';TWGEN.hof='gf';
function careerHtml(w){const c=w.cs;if(!c||!c.m)return '';return '<div class="mute" style="font-size:13px">'+t('car.l',{m:c.m,w:c.w,l:c.l,f:c.f})+'</div>'}
function boardStrip(){const b=boardEnsure();return '<div class="card"><div class="row spread" style="gap:12px;flex-wrap:wrap"><div><div class="px">'+t('ui.board.conf')+' · '+esc(b.owner)+'</div><div class="row" style="flex-wrap:nowrap">'+gauge(b.conf,b.conf<30?'var(--red,#d44)':'var(--gold)')+'<b>'+Math.round(b.conf)+'/100</b></div></div><div class="mute" style="font-size:13px">'+(b.goals.length?b.goals.map(g=>(goalMet(g)?'✓ ':'· ')+esc(goalTxt(g))).join('<br>'):'')+'</div></div></div>'}
function vBoard(){
 const b=boardEnsure(),v=tvEnsure(),last=v.h[v.h.length-1],m=media();
 let h='<div class="top"><div><h2>'+t('nav.board')+'</h2></div></div>';
 h+='<div class="card stack"><h3>'+t('ui.board.conf')+'</h3><div class="row" style="flex-wrap:nowrap">'+gauge(b.conf,b.conf<30?'var(--red,#d44)':'var(--gold)')+'<b>'+Math.round(b.conf)+'/100</b></div><div class="mute">'+t('ui.board.owner')+': '+esc(b.owner)+' · '+t('ui.qleft',{n:Math.max(0,BQ-(G.week-b.qs))})+'</div></div>';
 h+='<div class="card stack"><h3>'+t('ui.goals')+'</h3>'+b.goals.map(g=>{const ok=goalMet(g);return '<div><div class="lbl"><span>'+esc(goalTxt(g))+'</span><span>'+(ok?'<span class="pos">✓</span> ':'')+esc(goalVal(g))+'</span></div>'+bar(goalProg(g),ok?'t':'')+'</div>'}).join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('ui.tvh')+'</h3>'+(last?'<div class="row spread"><span>'+t('ui.tvlast')+'</span><b>'+fmtV(last.v)+'</b></div><div class="row spread"><span>'+t('ui.tvavg')+'</span><b>'+fmtV(tvAvg(8))+'</b></div><div class="mute">'+t('ui.tvrank',{n:last.rk})+(m.p==='tv'&&m.tvt?' · '+t('ui.tvdeal',{p:m.tvb?t('tv.bonus'):t('tv.fixed'),t:fmtV(m.tvt)}):'')+'</div>'+spark(v.h.map(x=>x.v),280,60,'var(--gold)')+(last.comp.length?'<div class="px">'+t('ui.tvcomp')+'</div>'+last.comp.map(c=>'<div class="row spread"><span>'+esc(c.n)+'</span><span class="mute">'+fmtV(c.v)+'</span></div>').join(''):''):'<div class="mute">'+t('ui.none')+'</div>')+'</div>';
 h+=jobsHtml();
 h+='<div class="card stack"><h3>'+t('ui.hist')+'</h3>'+(b.hist.length?b.hist.map(x=>'<div class="row spread"><span class="mute">'+t('pv.wk',{n:x.wk})+'</span><span>'+x.ok+'/'+x.n+' · '+(x.d>=0?'+':'')+x.d+(x.bonus?' · '+money(x.bonus):'')+'</span></div>').join(''):'<div class="mute">'+t('ui.none')+'</div>')+'</div>';
 return h}
function vHof(){
 recEnsure();const r=G.rec;let h='<div class="top"><div><h2>'+t('nav.hof')+'</h2></div></div>';
 const fmt=(k,x)=>k==='rating'?f2(x.v)+'★':k==='rev'?money(x.v):k==='viewers'?fmtV(x.v):k==='pop'?f1(x.v):num(x.v)+(k==='reign'&&x.n?' · '+esc(x.n):'');
 h+='<div class="card stack"><h3>'+t('ui.rec')+'</h3>'+['rating','att','rev','streak','reign','viewers','pop'].map(k=>'<div class="row spread"><span>'+t('rec.'+k)+'</span><b>'+(r[k].v?fmt(k,r[k]):'—')+'</b></div>').join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('ui.hof')+'</h3>'+(G.hof.length?G.hof.map(x=>'<div class="row spread" style="gap:8px"><span><b>'+esc(x.n)+'</b> <span class="mute">('+esc(cn(x.c))+')</span></span><span class="mute" style="font-size:13px">'+x.ti+' 🏆 · '+x.m+' · 5★ '+x.f+' · '+x.y+'y</span></div>').join(''):'<div class="mute">'+t('ui.none')+'</div>')+'</div>';
 h+='<div class="card stack"><h3>'+t('ui.years')+'</h3>'+(G.years.length?G.years.map(y=>'<div class="row spread" style="gap:8px"><span>'+t('cup.yr',{y:y.yr})+'</span><span class="mute" style="font-size:13px">#'+y.rank+' · '+y.pop+' ('+(y.dp>=0?'+':'')+y.dp+') · '+money(y.cash)+' · '+f2(y.avg)+'★</span></div>').join(''):'<div class="mute">'+t('ui.none')+'</div>')+'</div>';
 h+='<div class="card stack"><h3>'+t('ui.ach')+' '+Object.keys(G.ach).length+'/'+ACHS.length+'</h3><div class="grid g2" style="gap:6px">'+ACHS.map(a=>{const on=G.ach[a[0]];return '<div class="row" style="gap:6px;'+(on?'':'opacity:.45')+'"><span>'+(on?'🏆':'🔒')+'</span><span style="font-size:13px">'+esc(t('ach.'+a[0]))+'</span></div>'}).join('')+'</div></div>';
 return h}
Object.assign(D,{'tv.bonus':['premia za wynik','performance bonus'],'tv.fixed':['stała opłata','fixed fee']});
/* ============ Facilities and job market ============ */
const FACS=['dojo','merch','studio','medic'];
const FAC_ICON={dojo:'🥋',merch:'🛍️',studio:'🎬',medic:'🩺'};
function infra(){if(!G.infra)G.infra={dojo:0,merch:0,studio:0,medic:0,disc:0};return G.infra}
const facLvl=k=>infra()[k]||0;
const infraDojo=()=>.03*facLvl('dojo'),merchMul=()=>1+.1*facLvl('merch'),studioMul=()=>1+.06*facLvl('studio'),medMul=()=>1-.12*facLvl('medic');
const facBase=()=>Math.max(wkRev(),SB[G.fed.tier-1]*.8);
const facCost=k=>{const L=facLvl(k);if(L>=3)return 0;return r10(facBase()*[8,18,36][L]*(1-infra().disc))};
const facUpkeep=()=>FACS.reduce((s,k)=>s+facLvl(k),0)*r10(facBase()*.012);
function infraWeekly(){const u=facUpkeep();if(u>0)G.fed.cash-=u}
function vInfra(){
 let h='<div class="top"><div><h2>'+t('nav.infra')+'</h2><div class="mute" style="max-width:70ch">'+t('fac.sub')+'</div></div></div>';
 h+='<div class="card"><div class="row spread"><span class="mute">'+t('fac.upk')+'</span><b>'+money(facUpkeep())+'</b></div>'+(infra().disc?'<div class="pos" style="font-size:13px">'+t('fac.disc',{p:Math.round(infra().disc*100)})+'</div>':'')+'</div>';
 h+='<div class="grid g2">'+FACS.map(k=>{const L=facLvl(k),c=facCost(k);return '<div class="card stack"><h3>'+FAC_ICON[k]+' '+t('fac.'+k)+' · '+t('fac.lvl',{n:L})+'</h3><div class="mute">'+t('fac.'+k+'.d')+'</div><div>'+bar(L/3*100,'')+'</div><div class="mute" style="font-size:13px">'+t('fac.eff',{e:t('fac.'+k+'.e',{n:L*({dojo:3,merch:10,studio:6,medic:12})[k]})})+'</div>'+(L>=3?'<div class="pos">'+t('fac.max')+'</div>':'<button class="btn sm" data-act="facup" data-k="'+k+'"'+(G.fed.cash<c?' disabled':'')+'>'+t('fac.up',{m:money(c)})+'</button>')+'</div>'}).join('')+'</div>';
 return h}
Object.assign(WEV,{
 async fireinsp(){if(G.fed.tier<2)return false;const c=r10(facBase()*.4),v={m:money(c)};const i=await evx('fireinsp',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.insp1')}else if(rnd()<.5){G.fed.cash-=c*2;G.fed.pop=clamp(G.fed.pop-.4,2,100);addNews('n.insp2',{m:money(c*2)})}else addNews('n.insp3');return true},
 async dojomaster(){const c=r10(facBase()*.5),v={m:money(c)};const y=mine().filter(w=>w.age<=29).sort(()=>rnd()-.5).slice(0,3);if(y.length<2)return false;
  const i=await evx('dojomaster',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;y.forEach(w=>{const k=pickR(['ring','tec','psy','str','spd','sta']);w[k]=clamp(w[k]+1+(facLvl('dojo')>=2?1:0),1,99)});addNews('n.dmaster',{w:y.map(w=>w.name).join(', ')})}return true},
 async merchhit(){const v={m:money(r10(facBase()*.8*merchMul()))};const w=pickR(mine());if(!w)return false;const x={w:w.name,m:v.m};
  const i=await evx('merchhit',x,['1','2'],[false,false]);if(i===0){G.fed.cash+=r10(facBase()*.8*merchMul());w.pop=clamp(w.pop+.6,1,100);addNews('n.merchhit',x)}return true},
 async facgrant(){if(infra().disc||FACS.every(k=>facLvl(k)>=3))return false;const v={};const i=await evx('facgrant',v,['1','2'],[false,false]);if(i===0){infra().disc=.4;addNews('n.facgrant')}else G.fed.pop=clamp(G.fed.pop+.1,2,100);return true},
 async roofleak(){const c=r10(facBase()*.3),v={m:money(c)};const i=await evx('roofleak',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.roof1')}else{G.ws.filter(w=>w.fed===G.fed.id).slice(0,2).forEach(w=>evMood(w,-2));G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.roof2')}return true}
});
E('fireinsp','Kontrola przeciwpożarowa','Fire inspection','Inspektorzy sprawdzają halę. Doposażenie kosztuje {m}.','Inspectors check the venue. Upgrades cost {m}.',[['Doposaż halę ({m})','Upgrade the venue ({m})'],['Zaryzykuj','Take the risk']]);
E('dojomaster','Gościnny trener','Guest trainer','Znany trener oferuje intensywny trening dla młodych zawodników za {m}.','A well-known trainer offers intensive training for young wrestlers for {m}.',[['Zatrudnij ({m})','Hire ({m})'],['Odmów','Decline']]);
E('merchhit','Hit merchowy','Merch hit','Koszulka z {w} sprzedaje się świetnie. Domawiasz partię ({m}).','The {w} t-shirt is selling great. You reorder ({m}).',[['Domów partię (+{m})','Reorder (+{m})'],['Nie teraz','Not now']]);
E('facgrant','Dotacja miejska','City subsidy','Miasto oferuje dotację: 40% zniżki na najbliższą rozbudowę obiektów.','The city offers a subsidy: 40% off your next facility upgrade.',[['Przyjmij','Accept'],['Odrzuć','Decline']]);
E('roofleak','Przeciekający dach','Leaking roof','W hali przecieka dach. Naprawa kosztuje {m}.','The venue roof is leaking. Repair costs {m}.',[['Napraw ({m})','Repair ({m})'],['Odłóż','Postpone']]);
/* ---------- job market ---------- */
function jobsEnsure(){if(!G.jobs)G.jobs=[];if(!G.offers)G.offers=[]}
function takeOver(tid){
 const r=G.rivals.find(x=>x.id===tid);if(!r)return false;jobsEnsure();
 const old=G.fed,oldRec={id:old.id,name:old.name,short:old.short,country:old.country,tier:old.tier,pop:old.pop,color:old.color,cash:old.cash};
 const spec=PACK.feds.find(f=>f.id===tid)||r;const nf=Object.assign({},spec,{pop:r.pop,tier:r.tier});nf.cash=Math.max(spec.cash||0,Math.round(old.cash*.3));
 G.rivals=G.rivals.filter(x=>x.id!==tid);G.rivals.push(oldRec);
 G.ws.filter(w=>w.ext&&w.fed===old.id).forEach(w=>{});
 G.fed=nf;G.card=[];G.promos=[];G.feuds=[];G.reigns=[];G.hist=[];G.popHist=[nf.pop];G.streak=0;G.debt=0;G.summary=null;G.sponsor=null;G.stables=[];G.pairs={};G.media=null;G.arena=0;G.infra=null;G.ppv=null;G.board=null;G.tvr=null;G.relInit=0;G.staff=[];G.tours=[];G.price=100;G.fired=0;G.offers=[];
 G.titles=defaultTitles(nf.tier);G.prizes=defaultPrizes();
 fedSetup(false);G.fd=fdDefaults('betrayal');refreshMarkets(true);
 G.jobs.push({wk:G.week,from:oldRec.short||oldRec.name,to:nf.short||nf.name,tier:nf.tier});
 addNews('n.takeover',{f:nf.name});twAdd('job',{f:nf.name,o:oldRec.name},'wire',.3);
 save();return true}
async function jobWeekly(){
 jobsEnsure();G.offers=G.offers.filter(o=>o.exp>G.week&&G.rivals.some(r=>r.id===o.id));
 if(G.week<26||G.week%13!==5||G.offers.length>=2)return;const b=boardEnsure();
 let c=[];if(b.conf>=68)c=G.rivals.filter(r=>r.tier>=G.fed.tier&&r.pop>=G.fed.pop*.95&&!G.offers.some(o=>o.id===r.id)).sort((a,b)=>a.pop-b.pop).slice(0,4);
 else if(b.conf<35&&rnd()<.5)c=G.rivals.filter(r=>r.tier<=G.fed.tier&&r.tier>=1&&r.pop<G.fed.pop&&!G.offers.some(o=>o.id===r.id)).slice(0,5);
 if(!c.length||rnd()>.5)return;const r=pickR(c);G.offers.push({id:r.id,wk:G.week,exp:G.week+10});
 const v={f:r.name,t:t('tier.'+r.tier),p:Math.round(r.pop),c:cn(r.country)};
 const i=await askGeneric(t('job.t'),t('job.b',v),[{l:t('job.1',v)},{l:t('job.2')}]);if(i===0){if(takeOver(r.id)){G.screen='dash'}}}
function jobsHtml(){jobsEnsure();let h='';
 if(G.offers.length)h+='<div class="card stack"><h3>'+t('job.list')+'</h3>'+G.offers.map(o=>{const r=G.rivals.find(x=>x.id===o.id);return r?'<div class="row spread" style="gap:8px"><span><b>'+esc(r.name)+'</b> <span class="mute">('+esc(cn(r.country))+', '+t('tier.'+r.tier)+', '+Math.round(r.pop)+')</span></span><button class="btn sm" data-act="takejob" data-id="'+r.id+'">'+t('job.take')+'</button></div>':''}).join('')+'<div class="mute" style="font-size:13px">'+t('job.warn')+'</div></div>';
 if(G.jobs.length)h+='<div class="card stack"><h3>'+t('job.career')+'</h3>'+G.jobs.slice().reverse().map(j=>'<div class="row spread"><span class="mute">'+t('pv.wk',{n:j.wk})+'</span><span>'+esc(j.from)+' → <b>'+esc(j.to)+'</b></span></div>').join('')+'</div>';
 return h}
function firedModal(b){jobsEnsure();const low=G.rivals.filter(r=>r.tier<=Math.max(1,G.fed.tier-1)).sort(()=>rnd()-.5).slice(0,3);
 return '<h2>'+t('bd.fired.t')+'</h2><p class="mute">'+t('bd.fired.b',{o:b.owner})+'</p>'+(low.length?'<p class="mute">'+t('job.after')+'</p>'+low.map(r=>'<button class="opt" data-act="takejob" data-id="'+r.id+'"><b>'+esc(r.name)+'</b> <span class="mute">('+esc(cn(r.country))+', '+t('tier.'+r.tier)+')</span></button>').join(''):'')+'<button class="btn gold" data-act="gameover">'+t('go.again')+'</button>'}
Object.assign(D,{
 'nav.infra':['Obiekty','Facilities'],
 'fac.sub':['Rozbudowuj zaplecze federacji. Każdy poziom daje stałą korzyść, ale kosztuje w utrzymaniu co tydzień.','Expand your federation\'s facilities. Each level gives a permanent benefit but costs upkeep every week.'],'fac.upk':['Utrzymanie obiektów (tygodniowo)','Facility upkeep (weekly)'],'fac.disc':['Dotacja: −{p}% na najbliższą rozbudowę','Subsidy: −{p}% on the next upgrade'],'fac.lvl':['poz. {n}/3','lvl {n}/3'],'fac.max':['Maksymalny poziom','Max level'],'fac.up':['Rozbuduj ({m})','Upgrade ({m})'],'fac.eff':['Obecny efekt: {e}','Current effect: {e}'],
 'fac.dojo':['Ośrodek treningowy','Training dojo'],'fac.dojo.d':['Młodzi i trenowani zawodnicy szybciej się rozwijają.','Young and trained wrestlers develop faster.'],'fac.dojo.e':['+{n}% szansy na rozwój','+{n}% development chance'],
 'fac.merch':['Sklep z merchem','Merch store'],'fac.merch.d':['Większe przychody ze sprzedaży koszulek i gadżetów.','Higher income from t-shirts and merchandise.'],'fac.merch.e':['+{n}% przychodu z merchu','+{n}% merch revenue'],
 'fac.studio':['Studio telewizyjne','TV studio'],'fac.studio.d':['Lepsza produkcja: więcej widzów i sponsorów.','Better production: more viewers and sponsors.'],'fac.studio.e':['+{n}% widzów i sponsorów','+{n}% viewers and sponsors'],
 'fac.medic':['Centrum medyczne','Medical center'],'fac.medic.d':['Krótsze kontuzje zawodników.','Shorter injuries.'],'fac.medic.e':['−{n}% czasu kontuzji','−{n}% injury time'],
 'n.facup':['Rozbudowa: {f}, poziom {l}.','Upgrade: {f}, level {l}.'],'n.insp1':['Kontrola przeciwpożarowa zakończona bez uwag.','Fire inspection passed with no issues.'],'n.insp2':['Kontrola wykryła uchybienia: kara {m}.','The inspection found violations: fine {m}.'],'n.insp3':['Kontrola nie wykryła problemów.','The inspection found no problems.'],'n.dmaster':['Trener gościnny podszkolił: {w}.','The guest trainer coached: {w}.'],'n.merchhit':['Koszulka {w} jest hitem (+{m}).','The {w} shirt is a hit (+{m}).'],'n.facgrant':['Miasto przyznało dotację na rozbudowę.','The city granted an upgrade subsidy.'],'n.roof1':['Dach naprawiony.','The roof was repaired.'],'n.roof2':['Dach nadal przecieka, nastroje spadają.','The roof still leaks; morale drops.'],
 'job.t':['Oferta pracy','Job offer'],'job.b':['Federacja {f} ({c}, {t}, popularność {p}) proponuje Ci stanowisko. Przejmiesz jej skład, a Twoja obecna federacja przejdzie pod kontrolę komputera.','{f} ({c}, {t}, popularity {p}) offers you the job. You would take over their roster, and your current federation would be run by the computer.'],'job.1':['Przyjmij ofertę: {f}','Accept the offer: {f}'],'job.2':['Zostań (oferta wisi w zakładce Zarząd)','Stay (the offer stays in the Board tab)'],
 'job.list':['Oferty pracy','Job offers'],'job.take':['Przyjmij','Accept'],'job.warn':['Przejście zresetuje obiekty, zarząd, umowę TV, personel i pasy. Skład przejmujesz od nowej federacji, a Twoje rekordy i historia zostają.','A move resets facilities, board, TV deal, staff and titles. You take over the new federation\'s roster, while your records and history stay.'],'job.career':['Kariera menedżera','Manager career'],'job.after':['Możesz objąć mniejszą federację i zacząć od nowa:','You can take a smaller federation and start again:'],
 'n.takeover':['Nowa praca: przejmujesz {f}.','New job: you take over {f}.'],'tw.job':['{o} traci szefa! Nowy boss {f} już działa.','{o} loses its boss! The new head of {f} is already at work.']
});
TWGEN.job='gw';
// ---- Inbox + multi-week storylines (angles) ----
function ibx(){if(!G.inbox){G.inbox=[];G.ibxN=0;G.ibxR=0}if(!G.angles)G.angles=[];if(!G.defer)G.defer=[];if(G.angDone==null)G.angDone=0}
const stripH=s=>String(s==null?'':s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
function ibxPush(k,title,body,ch){ibx();G.inbox.unshift({w:G.week,k,t:title,b:body||'',c:ch||''});G.inbox=G.inbox.slice(0,80);G.ibxN++}
const ibxNew=()=>{if(!G||!G.inbox)return 0;return Math.min(G.inbox.length,(G.ibxN||0)-(G.ibxR||0))+(G.angles||[]).filter(a=>a.st===0&&a.wait).length};
const ibxPend=()=>G?((G.defer||[]).length+(G.angles||[]).length):0;
// log every decision modal
{const _ag=askGeneric;askGeneric=function(title,body,opts){return _ag(title,body,opts).then(i=>{try{if(G&&opts[i]&&!window.__noLog)ibxPush('d',stripH(title),stripH(body).slice(0,220),stripH(opts[i].l).slice(0,120))}catch(e){}return i})}}
function deferEv(k){ibx();G.defer.push({k,due:G.week+2+Math.floor(rnd()*2)});ibxPush('m',t('ibx.defd'),t('ev.w.'+k+'.t'),'')}
async function runDeferred(k){
 window.__noDefer=true;window.__inWE=true;let ok=false;
 try{ok=await WEV[k]()}catch(e){ok=false}finally{window.__noDefer=false;window.__inWE=false}
 if(!ok)addNews('n.deferlost')}
async function inboxWeekly(){
 ibx();const due=G.defer.filter(d=>d.due<=G.week);
 for(const d of due){G.defer=G.defer.filter(x=>x!==d);ibxPush('m',t('ibx.back'),t('ev.w.'+d.k+'.t'),'');await runDeferred(d.k)}}
// ---------- storylines ----------
const ANGK=['betray','comeback','rise','turn','topwar','mentor','champ','chase'];
const aliveA=a=>a.ids.every(id=>{const w=W(id);return w&&w.fed===G.fed.id&&!w.farewell});
function angPick(k){
 const ms=mine().filter(w=>!w.farewell&&!w.injury&&w.contract>0);
 const busy=new Set();G.angles.forEach(a=>a.ids.forEach(i=>busy.add(i)));
 const f=ms.filter(w=>!busy.has(w.id));if(f.length<2)return null;
 const sorted=f.slice().sort((x,y)=>y.pop-x.pop);
 if(k==='betray'){const a=pickR(f.filter(w=>w.role==='face'&&w.pop>=12));if(!a)return null;const al=relList(a,'al').map(W).filter(x=>x&&!busy.has(x.id)&&!x.injury);const b=al.length?pickR(al):pickR(f.filter(w=>w!==a&&w.role==='face'&&w.pop>=10));return b?[a.id,b.id]:null}
 if(k==='comeback'){const a=pickR(f.filter(w=>w.age>=33&&w.pop>=14));const b=a&&pickR(f.filter(w=>w!==a&&w.age<=29&&w.pop>=10));return a&&b?[a.id,b.id]:null}
 if(k==='rise'){const a=pickR(f.filter(w=>w.age<=27&&w.pop<=40));const b=a&&sorted.find(w=>w!==a&&w.pop>=a.pop+8);return a&&b?[a.id,b.id]:null}
 if(k==='turn'){const a=pickR(f.filter(w=>w.role==='face'&&w.pop>=18));const b=a&&pickR(f.filter(w=>w!==a&&w.role==='face'&&w.pop>=8));return a&&b?[a.id,b.id]:null}
 if(k==='topwar'){if(sorted.length<2||sorted[1].pop<14)return null;return [sorted[0].id,sorted[1].id]}
 if(k==='champ'||k==='chase'){const tt=pickR(G.titles.filter(x=>x.teams===1&&x.holders.length===1&&f.some(w=>w.id===x.holders[0])));if(!tt)return null;const h=W(tt.holders[0]);const b=sorted.find(w=>w!==h&&w.pop>=10&&genderOK(tt,[w.id]));if(!b)return null;if(k==='champ'&&h.age<30)return null;return k==='champ'?[h.id,b.id]:[b.id,h.id]}
 if(k==='mentor'){const a=pickR(f.filter(w=>w.age>=31&&w.pop>=15));const b=a&&pickR(f.filter(w=>w!==a&&w.age<=25));return a&&b?[a.id,b.id]:null}
 return null}
function angStart(){
 ibx();if(G.angles.length>=2||mine().length<4)return null;
 for(const k of shuffle(ANGK.slice())){if(G.angles.some(a=>a.k===k))continue;const ids=angPick(k);if(ids){const a={id:'an'+G.week+k,k,ids,st:0,q:0,at:G.week,wait:true};G.angles.push(a);return a}}
 return null}
const angV=a=>({a:W(a.ids[0]).name,b:W(a.ids[1]).name});
async function angStage(a){
 const v=angV(a),s=a.st+1;
 const i=await askGeneric(t('ang.'+a.k+'.'+s+'.t'),t('ang.'+a.k+'.'+s+'.b',v),[{l:t('ang.'+a.k+'.'+s+'.1',v)},{l:t('ang.'+a.k+'.'+s+'.2',v)}]);
 const A=W(a.ids[0]),B=W(a.ids[1]);
 if(i===0){if(rnd()<.62){a.q+=2;evMood(A,2)}else{a.q+=0;evMood(B,-3);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.misfire',v))}}
 else{a.q+=1;evMood(A,1);evMood(B,1)}
 if(a.k==='betray'&&s===1&&i===0)relLink(A,B,'rv');
 a.st=s;a.at=G.week;a.wait=false;
 if(s>=2){a.pay=true;a.dl=G.week+7;ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.book',v))}
 addNews('n.ang.s'+s,{a:v.a,b:v.b,n:t('ang.'+a.k+'.t')})}
async function angleWeekly(){
 ibx();
 for(const a of G.angles.slice()){
  if(!aliveA(a)){G.angles=G.angles.filter(x=>x!==a);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.cancel'));continue}
  if(a.pay){if(G.week>a.dl){G.angles=G.angles.filter(x=>x!==a);const v=angV(a);evMood(W(a.ids[0]),-3);evMood(W(a.ids[1]),-2);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.expire',v));addNews('n.ang.exp',v)}continue}
  if(a.st===1&&G.week>=a.at+1+(a.q>=2?0:1)){await angStage(a)}}
 if(G.week>=5&&G.angles.length<2&&((G.week%3===0&&rnd()<.45)||(!G.angles.length&&rnd()<.25))){
  const a=angStart();if(a){const v=angV(a);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.start',v));await angStage(a)}}}
function angleMatch(m,A,B,wi,li){
 if(!G.angles||!G.angles.length)return 0;
 const all=A.concat(B);let bonus=0;
 for(const a of G.angles.slice()){
  if(!a.pay||!a.ids.every(id=>all.indexOf(id)>=0))continue;
  const X=W(a.ids[0]),Y=W(a.ids[1]),v={a:X.name,b:Y.name,n:t('ang.'+a.k+'.t')};
  const same=(A.indexOf(a.ids[0])>=0)===(A.indexOf(a.ids[1])>=0);
  bonus=Math.max(bonus,Math.min(.8,.3+.12*a.q)-(same&&a.k!=='mentor'?.15:0));
  const hit=a.q>=3;
  if(hit){evPop(X,1.2);evPop(Y,.7);G.fed.pop=clamp(G.fed.pop+.3,2,100);evMood(X,4);evMood(Y,3)}
  else{evPop(X,.3);evMood(X,-1)}
  if(a.k==='betray'){relLink(X,Y,'rv');if(hit)X.role='heel'}
  else if(a.k==='turn'){X.role='heel';relLink(X,Y,'rv')}
  else if(a.k==='topwar'||a.k==='comeback'){relLink(X,Y,'rv')}
  else if(a.k==='mentor'){relLink(X,Y,'al');if(hit)Y.ring=Math.min(99,(Y.ring||40)+1)}
  else if(a.k==='champ'||a.k==='chase'){relLink(X,Y,'rv');if(hit){G.titles.forEach(tt=>{if(tt.holders.some(h=>a.ids.indexOf(h)>=0))tt.pdyn=clamp(prestOf(tt)+.1,1,5)})}}
  else if(a.k==='rise'){if(hit)X.ring=Math.min(99,(X.ring||40)+1)}
  G.angDone=(G.angDone||0)+1;G.angles=G.angles.filter(x=>x!==a);
  addNews(hit?'n.ang.hit':'n.ang.flop',v);ibxPush('a',v.n,t(hit?'ibx.hit':'ibx.flop',v));
  twAdd('angle',v,'wire',hit?.6:-.1)}
 return bonus}
// ---------- views ----------
function vInbox(){
 ibx();let h='<div class="top"><div><h2>'+t('nav.inbox')+'</h2><div class="mute">'+t('ibx.sub')+'</div></div></div>';
 h+='<div class="card stack"><h3>'+t('ibx.angles')+' '+G.angles.length+'/2</h3>';
 if(!G.angles.length)h+='<div class="mute">'+t('ibx.noang')+'</div>';
 G.angles.forEach(a=>{if(!aliveA(a))return;const v=angV(a);h+='<div class="stack" style="gap:2px;border-top:1px solid var(--line,#8884);padding-top:6px"><div class="row spread"><b>'+esc(t('ang.'+a.k+'.t'))+'</b><span class="tag">'+(a.pay?t('ibx.stPay'):t('ibx.stRun',{s:Math.max(1,a.st)}))+'</span></div><div>'+esc(v.a)+' ⚔ '+esc(v.b)+'</div><div class="mute" style="font-size:13px">'+(a.pay?t('ibx.book',v)+' '+t('ibx.until',{w:a.dl}):t('ibx.wait'))+'</div>'+(a.pay?'<div><button data-act="nav" data-v="show">'+t('nav.show')+'</button></div>':'')+'</div>'});
 h+='<div class="mute" style="font-size:13px">'+t('ibx.done',{n:G.angDone||0})+'</div></div>';
 h+='<div class="card stack"><h3>'+t('ibx.deferred')+'</h3>';
 if(!G.defer.length)h+='<div class="mute">'+t('ui.none')+'</div>';
 G.defer.forEach(d=>{h+='<div class="row spread" style="gap:8px"><span>'+esc(t('ev.w.'+d.k+'.t'))+' <span class="mute">· '+t('ibx.until',{w:d.due})+'</span></span><button data-act="ibxnow" data-k="'+d.k+'">'+t('ibx.now')+'</button></div>'});
 h+='</div>';
 h+='<div class="card stack"><h3>'+t('ibx.log')+'</h3>';
 if(!G.inbox.length)h+='<div class="mute">'+t('ui.none')+'</div>';
 G.inbox.slice(0,40).forEach((m,i)=>{const nw=i<Math.min(G.inbox.length,(G.ibxN||0)-(G.ibxR||0));h+='<div class="stack" style="gap:1px;border-top:1px solid var(--line,#8884);padding-top:5px"><div class="row spread" style="gap:8px"><b>'+(nw?'● ':'')+(m.k==='a'?'📖 ':m.k==='m'?'⏳ ':'✉ ')+esc(m.t)+'</b><span class="mute" style="font-size:12px">'+t('ibx.wk')+' '+m.w+'</span></div>'+(m.b?'<div class="mute" style="font-size:13px">'+esc(m.b)+'</div>':'')+(m.c?'<div style="font-size:13px">→ '+esc(m.c)+'</div>':'')+'</div>'});
 h+='</div>';G.ibxR=G.ibxN;return h}
function angCard(){
 if(!G||!G.angles||!G.angles.length)return '';
 return '<div class="card stack"><h3>📖 '+t('ibx.angles')+'</h3>'+G.angles.filter(aliveA).map(a=>{const v=angV(a);return '<div class="row spread" style="gap:8px"><span><b>'+esc(t('ang.'+a.k+'.t'))+'</b> · '+esc(v.a)+' ⚔ '+esc(v.b)+'</span><span class="mute" style="font-size:12px">'+(a.pay?t('ibx.stPay'):t('ibx.wait'))+'</span></div>'}).join('')+'</div>'}
// ---------- texts ----------
Object.assign(D,{'nav.inbox':['Skrzynka','Inbox'],'ev.defer':['⏳ Odłóż decyzję (wróci za kilka tygodni)','⏳ Decide later (it will return in a few weeks)'],
 'ibx.sub':['Decyzje, wątki fabularne i odłożone sprawy w jednym miejscu.','Decisions, storylines and postponed matters in one place.'],
 'ibx.angles':['Wątki fabularne','Storylines'],'ibx.noang':['Brak aktywnych wątków. Co kilka tygodni pojawi się nowy.','No active storylines. A new one appears every few weeks.'],
 'ibx.stPay':['czeka na walkę','awaiting match'],'ibx.stRun':['etap {s}/2','stage {s}/2'],'ibx.wait':['rozwija się…','developing…'],
 'ibx.book':['Zabookuj walkę {a} vs {b} – tam zapłaci się cały wątek (bonus do gwiazdek).','Book {a} vs {b} – that is where the storyline pays off (star bonus).'],
 'ibx.until':['do tyg. {w}','by wk {w}'],'ibx.done':['Zakończone wątki: {n}','Finished storylines: {n}'],
 'ibx.deferred':['Odłożone decyzje','Postponed decisions'],'ibx.now':['Rozpatrz teraz','Decide now'],'ibx.log':['Dziennik','Log'],'ibx.wk':['tyg.','wk'],
 'ibx.defd':['Decyzja odłożona','Decision postponed'],'ibx.back':['Sprawa wraca','Matter returns'],
 'ibx.start':['Nowy wątek: {a} i {b}.','New storyline: {a} and {b}.'],'ibx.misfire':['Pomysł nie chwycił – {b} nie jest zachwycony.','The idea did not click – {b} is not thrilled.'],
 'ibx.cancel':['Wątek anulowany – jeden z zawodników odszedł.','Storyline cancelled – one of the wrestlers left.'],
 'ibx.expire':['Nie zabookowano walki {a} vs {b} – publiczność zapomniała o wątku.','No match {a} vs {b} was booked – the crowd forgot the storyline.'],
 'ibx.hit':['Pełny sukces! {a} vs {b} – publiczność oszalała.','A hit! {a} vs {b} – the crowd went wild.'],'ibx.flop':['Wątek {a} vs {b} wypalił średnio.','The {a} vs {b} storyline fizzled.'],
 'n.ang.s1':['Wątek „{n}”: {a} i {b} – start.','Storyline “{n}”: {a} and {b} – kickoff.'],'n.ang.s2':['Wątek „{n}”: {a} vs {b} się zaostrza.','Storyline “{n}”: {a} vs {b} escalates.'],
 'n.ang.hit':['Wątek „{n}” wypalił: {a} vs {b} to hit!','Storyline “{n}” paid off: {a} vs {b} was a hit!'],'n.ang.flop':['Wątek „{n}” ({a} vs {b}) nie porwał tłumów.','Storyline “{n}” ({a} vs {b}) failed to catch fire.'],
 'n.ang.exp':['Wątek {a} vs {b} wygasł bez walki.','The {a} vs {b} storyline died without a match.'],'n.deferlost':['Odłożona sprawa sama się rozwiązała.','The postponed matter resolved itself.'],
 'tw.angle':['{a} i {b} – fani żyją tym wątkiem!','{a} and {b} – fans are glued to this storyline!']});
TWGEN.angle='gw';
{const A=(k,np,ne,s1,s2)=>{D['ang.'+k+'.t']=[np,ne];[s1,s2].forEach((s,i)=>{const n=i+1;D['ang.'+k+'.'+n+'.t']=[s[0],s[1]];D['ang.'+k+'.'+n+'.b']=[s[2],s[3]];D['ang.'+k+'.'+n+'.1']=[s[4],s[5]];D['ang.'+k+'.'+n+'.2']=[s[6],s[7]]})};
A('betray','Zdrada','Betrayal',
 ['Cień wątpliwości','A shadow of doubt','{a} zaczyna mieć dość {b}. Kamery łapią chłodne spojrzenia za kulisami.','{a} is getting tired of {b}. Cameras catch cold stares backstage.','Podsyć konflikt – nagły cios w plecy','Fuel it – a sudden back-attack','Zasiej tylko ziarno niepewności','Plant only a seed of doubt'],
 ['Pęknięcie','The split','Napięcie rośnie. Fani wyczuwają, że przyjaźń {a} i {b} wisi na włosku.','Tension grows. Fans sense the friendship of {a} and {b} hangs by a thread.','Rozbij to publicznie – promo na całą arenę','Break it publicly – an arena-wide promo','Buduj powoli – spojrzenia i zagrywki','Build slowly – glances and mind-games']);
A('comeback','Powrót weterana','Veteran Comeback',
 ['Wielkie słowa','Big words','{a} twierdzi, że „stare psy mają jeszcze zęby”, i celuje w młodego {b}.','{a} claims “old dogs still have teeth” and eyes the young {b}.','Wielka konferencja – weteran rzuca wyzwanie','A big press event – the veteran issues a challenge','Pokaż archiwalne klipy {a}','Show archive clips of {a}'],
 ['Cios w kolano','A low blow','{b} odpowiada pogardą. Hala jest podzielona na dwa obozy.','{b} answers with scorn. The arena splits into two camps.','Pozwól {b} upokorzyć weterana w promo','Let {b} humiliate the veteran on the mic','Niech {a} odpowie spokojnie i z klasą','Let {a} answer calmly and with class']);
A('rise','Wschodząca gwiazda','Rising Star',
 ['Ktoś chce więcej','Someone wants more','{a} nie chce już otwierać gali. Spogląda w stronę {b}.','{a} no longer wants to open the show. Eyes turn to {b}.','Daj {a} szansę – atak po gali na {b}','Give {a} a shot – a post-show attack on {b}','Niech {a} najpierw wygra kilka walk','Let {a} win a few matches first'],
 ['Gorączka','Heat','{b} lekceważy debiutanta, a trybuny zaczynają skandować nazwisko {a}.','{b} brushes the upstart off, and the crowd begins chanting {a}\'s name.','Wejdź na całość – {a} publicznie żąda walki','Go all in – {a} publicly demands a match','Spokojnie – niech chór fanów zrobi swoje','Easy – let the fan chants do the work']);
A('turn','Zwrot','The Turn',
 ['Coś nie gra','Something is off','{a} zachowuje się dziwnie wobec {b}. Fani szepczą o zmianie postawy.','{a} acts strangely around {b}. Fans whisper about a change of heart.','Zagraj zaskoczeniem – ostry atak krzesłem','Go for shock – a vicious chair attack','Zostaw wskazówki – podziel trybuny','Leave clues – divide the crowd'],
 ['Ostatnia kropla','The last straw','Gala nabiera tempa. Wszyscy czekają, czy {a} naprawdę odwróci się od {b}.','The pressure builds. Everyone waits to see if {a} will really turn on {b}.','Zrób z tego wydarzenie – ogłoś walkę o honor','Make it an event – announce a match of honour','Zostaw to niedopowiedzenie – niech spekulują','Keep it ambiguous – let them speculate']);
A('topwar','Wojna o szczyt','War for the Top',
 ['Dwóch na jednym tronie','Two on one throne','{a} i {b} mają dość dzielenia głównej sceny. Szatnia jest podzielona.','{a} and {b} are tired of sharing the main stage. The locker room is divided.','Podsyć rywalizację – głośne wyzwania','Stoke the rivalry – loud challenges','Utrzymaj szacunek – rywalizacja sportowa','Keep respect – a sporting rivalry'],
 ['Gorąca krew','Hot blood','Rywalizacja {a} vs {b} wymyka się spod kontroli. Ochrona rozdziela ich za kulisami.','The {a} vs {b} rivalry gets out of hand. Security separates them backstage.','Wykorzystaj to – bij pasem w promo','Use it – swing the belt in a promo','Zażegnaj spór i zamień go w walkę','Defuse it and turn it into a match']);
A('mentor','Mistrz i uczeń','Master and Apprentice',
 ['Nauka','The lesson','{a} bierze pod skrzydła młodego {b}. Fani kochają takie historie.','{a} takes young {b} under his wing. Fans love stories like this.','Pokaż trening – wspólna sekwencja przed galą','Show training – a joint pre-show sequence','Niech uczeń najpierw obserwuje z boku','Let the student watch from ringside first'],
 ['Sprawdzian','The test','{b} chce udowodnić, że jest gotowy. {a} zgadza się na próbę.','{b} wants to prove he is ready. {a} agrees to a test.','Daj {b} szansę – walka pokazowa na żywo','Give {b} a chance – a live exhibition','Zachowaj wątek na większą okazję','Save the storyline for a bigger occasion'])}
// ---------- extra events (storyline flavour) ----------
const scp=f=>pickR(mine().filter(w=>!w.farewell&&!w.injury&&(!f||f(w))));
E('fanvote','Ankieta fanów','Fan poll','Fani w sieci głosują, kogo chcą zobaczyć w głównym wydarzeniu: wygrywa {w}.','Fans vote online on who they want in the main event: {w} wins.',[['Spełnij życzenie fanów (+popularność {w})','Grant the fans\' wish (+{w} popularity)'],['Zignoruj ankietę','Ignore the poll']]);
E('crowdchant','Skandowanie','Crowd chant','Trybuny same zaczęły skandować nazwisko {w}. Można to podkręcić albo zostawić naturalnie.','The crowd started chanting {w}\'s name on its own. You can amplify it or leave it natural.',[['Podkręć – nowa wejściówka i oświetlenie ({m})','Amplify – new entrance and lighting ({m})'],['Zostaw naturalnie','Leave it natural']]);
E('castguest','Podcast','Podcast','{w} dostał zaproszenie do popularnego podcastu wrestlingowego. Może mówić o wszystkim.','{w} was invited to a popular wrestling podcast. They could say anything.',[['Zgódź się, ale z briefem','Agree, with a brief'],['Pozwól mówić swobodnie','Let them speak freely'],['Odmów','Decline']]);
E('mercyplea','Prośba o szansę','Plea for a chance','{w} prosi o większą rolę w wątku fabularnym i obiecuje, że się wykaże.','{w} asks for a bigger storyline role and promises to deliver.',[['Daj szansę','Give a chance'],['Powiedz, żeby poczekał','Tell them to wait']]);
E('crewdrama','Dramat w szatni','Locker-room drama','{a} i {b} publicznie pokłócili się o kolejność wejść, a ekipa patrzy, jak to rozwiążesz.','{a} and {b} openly argued over the entrance order and the crew watches how you handle it.',[['Rozstrzygnij na korzyść {a}','Decide in favour of {a}'],['Rozstrzygnij na korzyść {b}','Decide in favour of {b}'],['Zamień to w wątek fabularny','Turn it into a storyline']]);
E('fakeinj','Udawana kontuzja','Fake injury','{w} proponuje udawaną kontuzję, by wrócić z hukiem za kilka tygodni.','{w} proposes a fake injury to return with a bang in a few weeks.',[['Zgoda – sprytny booking','Agree – clever booking'],['Nie, za ryzykowne','No, too risky']]);
Object.assign(D,{'n.fanvote1':['Fani dostali swojego faworyta – {w} rośnie w siłę.','Fans got their favourite – {w} is on the rise.'],'n.fanvote2':['Ankieta fanów zignorowana – w sieci jest gorąco.','The fan poll was ignored – the internet is heated.'],
 'n.chant1':['{w} dostaje spektakularne wejście – trybuny szaleją.','{w} gets a spectacular entrance – the crowd goes wild.'],'n.chant2':['Skandowanie dla {w} samo się niesie.','The chant for {w} carries on by itself.'],
 'n.cg1':['{w} w podcaście – dobra reklama federacji.','{w} on the podcast – good promotion for the federation.'],'n.cg2a':['{w} powiedział w podcaście za dużo – viral!','{w} said too much on the podcast – viral!'],'n.cg2b':['{w} był w podcaście ciekawy i wyluzowany.','{w} was entertaining and relaxed on the podcast.'],
 'n.plea1':['{w} dostaje szansę i ją wykorzystuje.','{w} gets a chance and runs with it.'],'n.plea2':['{w} czeka cierpliwie na swoją kolej.','{w} waits patiently for their turn.'],
 'n.crew1':['{a} wygrywa spór o kolejność, {b} jest zły.','{a} wins the order dispute, {b} is upset.'],'n.crew2':['{b} wygrywa spór o kolejność, {a} jest zły.','{b} wins the order dispute, {a} is upset.'],'n.crew3':['Kłótnia {a} i {b} stała się rywalizacją na ringu.','The {a} and {b} argument became an in-ring rivalry.'],
 'n.fake1a':['Udawana kontuzja {w} zadziałała – fani czekają na powrót.','{w}\'s fake injury worked – fans await the return.'],'n.fake1b':['Fani przejrzeli udawaną kontuzję {w}.','Fans saw through {w}\'s fake injury.'],'n.fake2':['Nie ma zgody na udawaną kontuzję {w}.','No fake injury for {w}.']});
Object.assign(WEV,{
 async fanvote(){const w=scp(x=>x.pop>=8&&x.pop<60);if(!w)return false;const v={w:w.name};const i=await evx('fanvote',v,['1','2'],[false,false]);if(i===0){evPop(w,1.1);evMood(w,5);addNews('n.fanvote1',v)}else{evMood(w,-3);G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.fanvote2',v)}return true},
 async crowdchant(){const w=scp(x=>x.pop>=15);if(!w)return false;const c=r10(wkRev()*.2),v={w:w.name,m:money(c)};const i=await evx('crowdchant',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;evPop(w,1.5);evMood(w,4);G.fed.pop=clamp(G.fed.pop+.15,2,100);addNews('n.chant1',v)}else{evPop(w,.4);addNews('n.chant2',v)}return true},
 async castguest(){const w=scp(x=>x.pop>=12&&x.mic>=30);if(!w)return false;const v={w:w.name};const i=await evx('castguest',v,['1','2','3'],[false,false,false]);
  if(i===0){evPop(w,.4);G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.cg1',v)}else if(i===1){if(rnd()<.45){evPop(w,1.4);addNews('n.cg2a',v);twAdd('viral',{w:v.w},'wire',0)}else{evPop(w,-.8);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.cg2b',v)}}return true},
 async mercyplea(){const w=scp(x=>x.pop<=40&&x.morale<70);if(!w)return false;const v={w:w.name};const i=await evx('mercyplea',v,['1','2'],[false,false]);if(i===0){evMood(w,12);w.loyal=Math.min(100,(w.loyal||50)+6);if(rnd()<.5)evPop(w,.8);addNews('n.plea1',v)}else{evMood(w,-4);addNews('n.plea2',v)}return true},
 async crewdrama(){const a=scp(x=>x.pop>=14),b=a&&scp(x=>x!==a&&x.pop>=10);if(!a||!b)return false;const v={a:a.name,b:b.name};const i=await evx('crewdrama',v,['1','2','3'],[false,false,false]);
  if(i===0){evMood(a,6);evMood(b,-6);addNews('n.crew1',v)}else if(i===1){evMood(b,6);evMood(a,-6);addNews('n.crew2',v)}else{relLink(a,b,'rv');evMood(a,2);evMood(b,2);addNews('n.crew3',v)}return true},
 async fakeinj(){const w=scp(x=>x.pop>=20);if(!w)return false;const v={w:w.name};const i=await evx('fakeinj',v,['1','2'],[false,false]);
  if(i===0){suspend(w,3);if(rnd()<.6){evPop(w,1.8);addNews('n.fake1a',v)}else{evPop(w,-1);G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.fake1b',v)}}else addNews('n.fake2',v);return true}
});
// ---- Hidden potential + scouting fog ----
const avgSt=w=>(w.ring+w.mic+w.cha)/3;
function hpOf(w){if(w.hp==null){w.hp=clamp(Math.round(avgSt(w)+(w.age<=22?18:w.age<=25?10:w.age<=27?4:0)+(rnd()-.4)*30),25,99);w.hn=rnd()*2-1}return w.hp}
const scoutLvl=()=>{const s=(G.staff||[]).filter(x=>x.role==='scout');return s.length?Math.max.apply(null,s.map(x=>x.lvl||0)):0};
function potErr(w){if(w.rev)return 0;let own=0;if(w.fed===G.fed.id){if(w.sinceF!==G.fed.id){w.sinceF=G.fed.id;w.since=G.week}own=Math.min(10,(G.week-w.since)/6)}return clamp(22-scoutLvl()*.18-own,3,22)}
function potShown(w){const e=potErr(w);return {v:clamp(Math.round(hpOf(w)+(w.hn||0)*e),20,99),e}}
function potTag(w){
 if(w.potEst)return '<span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('r.pot')+' '+potStars(w.potEst)+'</span>';
 if(w.age>27||w.farewell)return '';
 const p=potShown(w);return '<span class="tag" style="color:var(--gold);border-color:var(--gold)" title="'+t('pot.tip')+'">'+t('r.pot')+' '+potStars(p.v)+(p.e===0?' ✔':p.e>=10?' ?':'')+'</span>'}
Object.assign(D,{'pot.tip':['Szacunek potencjału. Zatrudnij skauta lub poczekaj – niepewność maleje z czasem.','Potential estimate. Hire a scout or wait – the uncertainty shrinks over time.']});
const prospect=f=>pickR(mine().filter(w=>!w.farewell&&w.age<=27&&(!f||f(w))));
E('prodigy','Cudowne dziecko?','A prodigy?','Trener mówi, że {w} ma w sobie coś wyjątkowego. Możesz zlecić pełną ocenę potencjału ({m}).','The coach says {w} has something special. You can order a full potential assessment ({m}).',[['Zleć ocenę – poznaj prawdziwy potencjał','Order it – learn the real potential'],['Nie trzeba, poobserwujemy','No need, we will observe']]);
E('latebloom','Późny rozkwit','Late bloomer','{w} nagle łapie wiatr w żagle – trenerzy mówią o ukrytym potencjale.','{w} suddenly takes off – coaches talk about hidden potential.',[['Zainwestuj w dodatkowe treningi ({m})','Invest in extra training ({m})'],['Pozwól rozwijać się naturalnie','Let it develop naturally']]);
E('slump','Zastój formy','Sophomore slump','{w} stoi w miejscu i wątpi w siebie. Być może potencjał był przereklamowany.','{w} is stagnating and doubts themselves. Perhaps the potential was overrated.',[['Rozmowa i wsparcie psychologa ({m})','A talk and a sports psychologist ({m})'],['Ostra krytyka – niech się weźmie w garść','Harsh criticism – make them toughen up'],['Zostaw ich w spokoju','Leave them be']]);
E('rivalscout','Skaut rywala','Rival scout','Skaut rywalizującej federacji zerka na {w}. Wiesz, że to prawdziwy talent.','A rival federation\'s scout is eyeing {w}. You know it is real talent.',[['Zaproponuj nowy kontrakt ({m})','Offer a new contract ({m})'],['Ryzykuj – nic nie rób','Risk it – do nothing']]);
E('showcase','Pokaz talentów','Talent showcase','Lokalna szkoła wrestlingu organizuje pokaz. {w} z Twojej federacji błyszczy przed publicznością.','A local wrestling school holds a showcase. {w} from your federation shines.',[['Pochwal publicznie','Praise publicly'],['Zachowaj dystans','Stay reserved']]);
Object.assign(D,{'n.prod1':['Pełna ocena: {w} ma ★ potencjał {p}!','Full assessment: {w} has potential {p}!'],'n.prod2':['{w} nadal skrywa swoje możliwości.','{w} still hides their ability.'],
 'n.late1':['{w} przechodzi przyspieszony kurs – widać poprawę.','{w} takes a crash course – improvement is visible.'],'n.late2':['{w} rozwija się własnym tempem.','{w} develops at their own pace.'],
 'n.slump1':['{w} wraca do formy po rozmowie.','{w} returns to form after the talk.'],'n.slump2a':['Ostra krytyka zadziałała – {w} ma ogień w oczach.','Harsh criticism worked – {w} has fire in their eyes.'],'n.slump2b':['{w} zniechęcony po krytyce.','{w} is discouraged after the criticism.'],'n.slump3':['{w} wciąż w dołku formy.','{w} is still in a slump.'],
 'n.rsc1':['{w} podpisuje nowy kontrakt – skaut wraca z niczym.','{w} signs a new contract – the scout returns empty-handed.'],'n.rsc2a':['Skaut zawiódł – {w} został.','The scout failed – {w} stayed.'],'n.rsc2b':['{w} odszedł do konkurencji!','{w} left for the competition!'],
 'n.show1':['{w} błyszczy na pokazie – fani pytają o nazwisko.','{w} shines at the showcase – fans ask about the name.'],'n.show2':['{w} bez echa na pokazie.','{w} unnoticed at the showcase.']});
Object.assign(WEV,{
 async prodigy(){const w=prospect(x=>!x.rev&&x.pop>=5);if(!w)return false;const c=r10(wkRev()*.15),v={w:w.name,m:money(c)};const i=await evx('prodigy',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;w.rev=1;v.p=potStars(hpOf(w));addNews('n.prod1',v)}else addNews('n.prod2',v);return true},
 async latebloom(){const w=pickR(mine().filter(x=>!x.farewell&&x.age>=26&&x.age<=32));if(!w)return false;const c=r10(wkRev()*.25),v={w:w.name,m:money(c)};const i=await evx('latebloom',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;['ring','mic','cha'].forEach(k=>{if(rnd()<.6)w[k]=clamp(w[k]+1+Math.floor(rnd()*2),1,99)});evMood(w,5);addNews('n.late1',v)}else{if(rnd()<.5)w.ring=clamp(w.ring+1,1,99);addNews('n.late2',v)}return true},
 async slump(){const w=prospect(x=>x.age>=20&&x.pop>=12);if(!w)return false;const c=r10(wkRev()*.12),v={w:w.name,m:money(c)};const i=await evx('slump',v,['1','2','3'],[G.fed.cash<c,false,false]);
  if(i===0){G.fed.cash-=c;evMood(w,10);addNews('n.slump1',v)}else if(i===1){if(rnd()<.5){evMood(w,6);w.ring=clamp(w.ring+1,1,99);addNews('n.slump2a',v)}else{evMood(w,-10);w.loyal=Math.max(0,(w.loyal||50)-6);addNews('n.slump2b',v)}}else{evMood(w,-2);addNews('n.slump3',v)}return true},
 async rivalscout(){const w=pickR(mine().filter(x=>!x.farewell&&x.pop>=20&&x.age<=30));if(!w||!G.rivals.length)return false;const c=r10(salaryOf(w,G.fed.tier)*4),v={w:w.name,m:money(c)};const i=await evx('rivalscout',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;w.contract=Math.max(w.contract,52);w.loyal=Math.min(100,(w.loyal||50)+8);addNews('n.rsc1',v)}else{if(rnd()<.45){const r=pickR(G.rivals);leaveTo(w,r);addNews('n.rsc2b',v)}else addNews('n.rsc2a',v)}return true},
 async showcase(){const w=prospect(x=>x.pop<45);if(!w)return false;const v={w:w.name};const i=await evx('showcase',v,['1','2'],[false,false]);
  if(i===0){evPop(w,.9);evMood(w,6);G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.show1',v)}else{evMood(w,-2);addNews('n.show2',v)}return true}
});
// ---- Difficulty + challenges ----
let START_D='norm',START_CH='none';
const DIFF={easy:{cash:1.6,rev:1.1,pat:.8},norm:{cash:1,rev:1,pat:1},hard:{cash:.7,rev:.9,pat:1.25},legend:{cash:.5,rev:.8,pat:1.5}};
const CHALS=['none','tier3','cash','rank1','cup'];
const diffRev=()=>(DIFF[(G&&G.diff)||'norm']||DIFF.norm).rev;
{const _ng=newGame;newGame=function(id,c){_ng(id,c);const d=DIFF[START_D]||DIFF.norm;G.diff=START_D;G.fed.cash=Math.round(G.fed.cash*d.cash);try{boardEnsure();G.board.pat*=d.pat}catch(e){}
 G.chal=START_CH==='none'?null:{k:START_CH,st:G.week,end:G.week+({tier3:104,cash:156,rank1:156,cup:208}[START_CH]),res:0};ibx();
 if(G.chal)ibxPush('m',t('chal.t'),t('chal.'+G.chal.k)+' '+t('chal.dl',{w:G.chal.end}))}}
function chalMet(c){
 if(c.k==='tier3')return G.fed.tier>=3;
 if(c.k==='cash')return G.fed.cash>=1e7;
 if(c.k==='rank1')return fedRank()===1;
 if(c.k==='cup')return !!(G.cups&&G.cups.hist.some(h=>h.ownChamp));
 return false}
function chalWeekly(){
 const c=G.chal;if(!c||c.res)return;
 if(chalMet(c)){c.res=1;c.wk=G.week;G.ach.chal=G.week;addNews('n.chalok',{c:t('chal.'+c.k)});ibxPush('m',t('chal.ok'),t('chal.'+c.k))}
 else if(G.week>c.end){c.res=-1;addNews('n.chalfail',{c:t('chal.'+c.k)});ibxPush('m',t('chal.fail'),t('chal.'+c.k))}}
function chalHtml(){const c=G&&G.chal;if(!c)return '';
 return '<div class="card stack"><h3>🎯 '+t('chal.t')+'</h3><div class="row spread"><span>'+esc(t('chal.'+c.k))+'</span><span class="tag">'+(c.res===1?t('chal.ok'):c.res===-1?t('chal.fail'):t('chal.dl',{w:c.end}))+'</span></div></div>'}
Object.assign(D,{'start.diff':['Trudność','Difficulty'],'start.chal':['Wyzwanie','Challenge'],'diff.easy':['Łatwy','Easy'],'diff.norm':['Normalny','Normal'],'diff.hard':['Trudny (mniej kasy, ostrzejszy zarząd)','Hard (less cash, stricter board)'],'diff.legend':['Legenda (−50% kasy, −20% przychodów)','Legend (−50% cash, −20% revenue)'],
 'chal.none':['Bez wyzwania','No challenge'],'chal.tier3':['Dotrzyj do poziomu 3 w 2 lata','Reach tier 3 within 2 years'],'chal.cash':['Zgromadź 10 mln w 3 lata','Save $10M within 3 years'],'chal.rank1':['Zostań nr 1 rankingu w 3 lata','Become #1 in the ranking within 3 years'],'chal.cup':['Wygraj turniej kontynentalny w 4 lata','Win a continental cup within 4 years'],
 'chal.t':['Wyzwanie','Challenge'],'chal.dl':['do tyg. {w}','by wk {w}'],'chal.ok':['Wyzwanie zaliczone!','Challenge complete!'],'chal.fail':['Wyzwanie nieudane','Challenge failed'],
 'n.chalok':['Wyzwanie zaliczone: {c}','Challenge complete: {c}'],'n.chalfail':['Wyzwanie nieudane: {c}','Challenge failed: {c}'],'ach.chal':['Wyzwanie zaliczone','Challenge complete']});
// ---- extra events ----
E('pressprofile','Profil w prasie','Press profile','Lokalna gazeta chce zrobić duży profil Twojej federacji. Dziennikarz pyta o plany.','A local paper wants a big profile of your federation. The reporter asks about your plans.',[['Pochwal się ambicjami','Boast about your ambitions'],['Mów skromnie','Stay modest']]);
E('fanclub','Klub kibica','Fan club','Fani założyli oficjalny klub i proszą o wsparcie ({m}).','Fans started an official fan club and ask for support ({m}).',[['Wesprzyj klub','Support the club'],['Odmów grzecznie','Politely decline']]);
E('rainout','Dziura w kalendarzu','Calendar gap','Hala, którą zwykle wynajmujesz, oferuje tańszy termin, ale gorszą porę.','The venue you usually rent offers a cheaper slot, but a worse time.',[['Weź tańszy termin','Take the cheaper slot'],['Zostań przy standardzie','Stay with the standard']]);
E('lucky','Szczęśliwy traf','Lucky break','Nieoczekiwany sponsor lokalny pyta, czy może dorzucić pieniądze na następną galę.','An unexpected local sponsor asks if it can chip in for the next show.',[['Przyjmij ({m})','Accept ({m})'],['Odmów, by uniknąć zobowiązań','Decline to avoid obligations']]);
Object.assign(D,{'n.press1':['Artykuł o ambicjach federacji podbija zainteresowanie.','The article on the federation\'s ambitions boosts interest.'],'n.press2':['Skromny artykuł nie robi wrażenia, ale buduje zaufanie.','The modest article is low-key but builds trust.'],
 'n.fclub1':['Klub kibica rośnie i nosi Twoje barwy.','The fan club grows and wears your colours.'],'n.fclub2':['Klub kibica się obraził.','The fan club took offence.'],
 'n.rain1':['Tańszy termin – oszczędność, ale mniej widzów.','Cheaper slot – savings, but fewer fans.'],'n.rain2':['Zostajesz przy standardzie.','You stay with the standard.'],
 'n.lucky1':['Lokalny sponsor dorzuca pieniądze.','A local sponsor chips in.'],'n.lucky2':['Odmawiasz sponsorowi.','You turn the sponsor down.']});
Object.assign(WEV,{
 async pressprofile(){const v={};const i=await evx('pressprofile',v,['1','2'],[false,false]);if(i===0){if(rnd()<.6){G.fed.pop=clamp(G.fed.pop+.4,2,100);addNews('n.press1')}else{G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.press2')}}else{G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.press2')}return true},
 async fanclub(){const c=r10(wkRev()*.1),v={m:money(c)};const i=await evx('fanclub',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.fclub1')}else{G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.fclub2')}return true},
 async rainout(){const v={};const i=await evx('rainout',v,['1','2'],[false,false]);if(i===0){G.fed.cash+=r10(wkRev()*.25);G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.rain1')}else addNews('n.rain2');return true},
 async lucky(){const b=r10(wkRev()*.8),v={m:money(b)};const i=await evx('lucky',v,['1','2'],[false,false]);if(i===0){G.fed.cash+=b;addNews('n.lucky1')}else addNews('n.lucky2');return true}
});
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
  else if(ev==='crowd'){const ss=Object.keys(STIPS).filter(s=>s!=='none'&&G.fed.tier>=STIPS[s].tier&&lvlOf(s)<=maxLvl());if(ss.length)f.fav=pickR(ss);f.heat=clamp(f.heat+8,0,100);nk='n.fb.crowd'}
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
// ---- Title lore (history, contenders, controversies, streaks) + hidden traits ----
function tqEnsure(){if(!G.tcq)G.tcq=[]}
function titleRecord(tt,wi,fin){
 tqEnsure();if(tt.holders.length){tt.log=tt.log||[];tt.log.unshift({n:names(tt.holders),s:tt.since||1,e:G.week,d:tt.def||0});tt.log=tt.log.slice(0,12)}
 if(fin==='dirty'&&tt.holders.length&&!G.tcq.some(x=>x.k==='contro'&&x.tid===tt.id))G.tcq.push({k:'contro',tid:tt.id,old:tt.holders.slice(),nw:wi.slice(0,tt.teams)})}
function titleDef(tt){tqEnsure();if([5,10,15].indexOf(tt.def)>=0&&!G.tcq.some(x=>x.k==='streak'&&x.tid===tt.id))G.tcq.push({k:'streak',tid:tt.id,n:tt.def})}
function titleBonus(m,A,B){
 if(!m.title)return 0;const tt=titleOf(m.title);if(!tt)return 0;let b=0;
 if(tt.rcl&&tt.rcl.ids.every(i=>A.concat(B).indexOf(i)>=0)&&G.week<=tt.rcl.due+4){b+=.3;const ch=tt.rcl.ids.map(W).filter(Boolean);ch.forEach(w=>evPop(w,.6));addNews('n.tt.rematch',{t:titleName(tt),w:names(tt.rcl.ids)});tt.rcl=null}
 return b}
function makeTitleFeud(tt,ch){
 if(!tt||tt.holders.length!==tt.teams)return false;const A=ch.slice(0,tt.teams);if(A.length!==tt.teams||!genderOK(tt,A))return false;
 const busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));if(A.some(i=>busy.has(i))||tt.holders.some(i=>busy.has(i)))return false;
 const f={id:'f'+(G.uid++),sc:'f13',A,B:tt.holders.slice(),stA:null,stB:null,stR:null,titleId:tt.id,fedId:null,mw:0,g:tt.teams,heat:SC.f13.h*3,matches:0,used:false};
 if(!feudMode(f))return false;flog(f,{k:'s'});G.feuds.push(f);addNews('n.feudstart',{a:sideLabel(f.A,f.stA),b:sideLabel(f.B,f.stB)});return true}
function contenders(tt,n){
 const hs=new Set(tt.holders),busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));
 const pool=healthy().filter(w=>!hs.has(w.id)&&!busy.has(w.id)&&!isGuest(w.id)&&genderOK(tt,[w.id])).sort((a,b)=>b.pop-a.pop);
 return tt.teams===1?pool.slice(0,n).map(w=>[w.id]):[pool.slice(0,tt.teams)].filter(g=>g.length===tt.teams).map(g=>g.map(w=>w.id))}
async function titleStory(){
 tqEnsure();const q=G.tcq.shift();
 if(q){const tt=titleOf(q.tid);if(!tt)return;
  if(q.k==='contro'){const v={t:titleName(tt),w:names(q.nw),o:names(q.old)};
   const i=await askGeneric(t('tt.contro.t',v),t('tt.contro.b',v),[{l:t('tt.contro.1',v)},{l:t('tt.contro.2',v)},{l:t('tt.contro.3',v)}]);
   const nw=q.nw.map(W).filter(Boolean),old=q.old.map(W).filter(Boolean);
   if(i===0){old.forEach(w=>evMood(w,-5));if(rnd()<.5)nw.forEach(w=>{if(w.role==='face')w.role='heel'});G.fed.pop=clamp(G.fed.pop+.1,2,100);if(rnd()<.45)makeTitleFeud(tt,q.old);addNews('n.tt.c1',v)}
   else if(i===1){tt.rcl={ids:q.old.slice(),due:G.week+6};old.forEach(w=>evMood(w,4));addNews('n.tt.c2',v)}
   else{tt.holders=[];tt.pdyn=clamp(prestOf(tt)-.15,1,5);old.concat(nw).forEach(w=>evMood(w,-8));addNews('n.tt.c3',v)}
   return}
  if(q.k==='streak'){const c=r10(wkRev()*.3),v={t:titleName(tt),w:names(tt.holders),n:q.n,m:money(c)};
   const i=await askGeneric(t('tt.streak.t',v),t('tt.streak.b',v),[{l:t('tt.streak.1',v),dis:G.fed.cash<c},{l:t('tt.streak.2',v)},{l:t('tt.streak.3',v)}]);
   if(i===0){G.fed.cash-=c;tt.pdyn=clamp(prestOf(tt)+.08,1,5);G.fed.pop=clamp(G.fed.pop+.3,2,100);tt.holders.forEach(id=>{if(W(id))evPop(W(id),1)});addNews('n.tt.s1',v)}
   else if(i===1){const c1=contenders(tt,1)[0];if(c1&&makeTitleFeud(tt,c1))addNews('n.tt.s2',v);else addNews('n.tt.s3',v)}
   else addNews('n.tt.s3',v);return}
  return}
 if(G.week%5===0&&rnd()<.5){
  const tt=pickR(G.titles.filter(x=>x.holders.length===x.teams&&x.holders.every(i=>W(i)&&W(i).fed===G.fed.id)&&!G.feuds.some(f=>f.titleId===x.id)));if(!tt)return;
  const cs=contenders(tt,3);if(!cs.length)return;
  const v={t:titleName(tt),h:names(tt.holders)};
  const i=await askGeneric(t('tt.cont.t',v),t('tt.cont.b',v),cs.map(c=>({l:t('tt.cont.o',{w:names(c)})})).concat([{l:t('tt.cont.no')}]));
  if(i<cs.length&&makeTitleFeud(tt,cs[i])){cs[i].forEach(id=>evMood(W(id),6));addNews('n.tt.cont',{w:names(cs[i]),t:titleName(tt)})}}}
function titlesHistHtml(){
 const L=G.titles.filter(tt=>tt.log&&tt.log.length||tt.holders.length);if(!L.length)return '';
 return '<div class="card stack"><h3>'+t('tt.lore')+'</h3>'+L.map(tt=>{const lg=tt.log||[];const best=lg.concat(tt.holders.length?[{n:names(tt.holders),s:tt.since||1,e:G.week,d:tt.def||0}]:[]).sort((a,b)=>(b.e-b.s)-(a.e-a.s))[0];
  return '<div class="stack" style="gap:2px;border-top:1px solid var(--line,#8884);padding-top:6px"><div class="row spread"><b>'+esc(titleName(tt))+'</b><span class="mute" style="font-size:12px">'+t('tt.def',{n:tt.def||0})+(tt.rcl?' · '+t('tt.rcl'):'')+'</span></div>'+
   (best?'<div class="mute" style="font-size:13px">'+t('tt.best',{w:best.n,n:Math.max(1,best.e-best.s)})+'</div>':'')+
   lg.slice(0,3).map(x=>'<div class="mute" style="font-size:12px">'+t('ibx.wk')+' '+x.s+'–'+x.e+' · '+esc(x.n)+' · '+t('tt.def',{n:x.d})+'</div>').join('')+'</div>'}).join('')+'</div>'}
Object.assign(D,{'tt.lore':['Historia i dziedzictwo pasów','Belt history and legacy'],'tt.def':['obrony: {n}','defences: {n}'],'tt.rcl':['klauzula rewanżu','rematch clause'],'tt.best':['Najdłuższe panowanie: {w} ({n} tyg.)','Longest reign: {w} ({n} wks)'],
 'tt.contro.t':['Kontrowersyjna zmiana mistrza','A controversial title change'],'tt.contro.b':['Pas „{t}” zmienił właściciela w niejasnych okolicznościach: {w} zabrał go {o}. Fani i szatnia są podzieleni.','The “{t}” belt changed hands in murky circumstances: {w} took it from {o}. Fans and the locker room are divided.'],
 'tt.contro.1':['Zatwierdź zmianę – niech się kłócą','Uphold the change – let them argue'],'tt.contro.2':['Nakaż rewanż w ciągu 6 tygodni','Order a rematch within 6 weeks'],'tt.contro.3':['Odbierz pas (vacat) – uderz w kontrowersję','Strip the belt (vacate) – hit the controversy head-on'],
 'tt.streak.t':['Seria obron: {n}','Defence streak: {n}'],'tt.streak.b':['{w} obronił „{t}” już {n} razy z rzędu. To historia dla fanów.','{w} has defended “{t}” {n} times running. A story for the fans.'],
 'tt.streak.1':['Zrób wielkie święto ({m})','Throw a big celebration ({m})'],'tt.streak.2':['Zapowiedz pretendenta i zacznij feud','Announce a contender and start a feud'],'tt.streak.3':['Zachowaj spokój','Keep calm'],
 'tt.cont.t':['Pretendent do pasa','A contender for the belt'],'tt.cont.b':['„{t}” trzyma {h}. Kto ma być następnym pretendentem?','{h} holds “{t}”. Who should be the next contender?'],'tt.cont.o':['{w}','{w}'],'tt.cont.no':['Na razie nikt','Nobody for now'],
 'n.tt.c1':['Zmiana mistrza „{t}” zatwierdzona – kontrowersje trwają.','The “{t}” title change stands – the controversy goes on.'],'n.tt.c2':['Rewanż o „{t}” zlecony w ciągu 6 tygodni.','A rematch for “{t}” ordered within 6 weeks.'],'n.tt.c3':['„{t}” zwakowany po kontrowersyjnej zmianie.','“{t}” vacated after a controversial change.'],
 'n.tt.s1':['Seria obron {w} świętowana – prestiż „{t}” rośnie.','{w}\'s defence streak celebrated – “{t}” prestige rises.'],'n.tt.s2':['Po serii obron wchodzi pretendent do „{t}”.','After a defence streak, a contender enters for “{t}”.'],'n.tt.s3':['Seria obron {w} mija bez wielkiego świętowania.','{w}\'s defence streak passes quietly.'],
 'n.tt.cont':['{w} zostaje pretendentem do „{t}”.','{w} becomes the contender for “{t}”.'],'n.tt.rematch':['Rewanż o „{t}”: {w} dostają swoją szansę.','Rematch for “{t}”: {w} get their chance.']});
// ---------- hidden traits ----------
const TRAITS=['iron','glass','clutch','ego','pro','troub','mentor'];
function trOf(w){if(w.tr===undefined)w.tr=rnd()<.55?pickR(TRAITS):'';return w.tr}
function trInj(w){const x=trOf(w);return x==='iron'?.6:x==='glass'?1.5:1}
function trBonus(m,A,B){const ids=A.concat(B);let b=0;const big=!!m.title||(G.card&&G.card.indexOf(m)===G.card.length-1);
 ids.forEach(i=>{const w=W(i);if(!w)return;const x=trOf(w);if(x==='clutch'&&big)b+=.12;else if(x==='pro')b+=.05;else if(x==='ego'&&!big)b-=.05});return clamp(b,-.15,.3)}
function trTag(w){
 if(w.farewell)return '';const x=trOf(w);
 if(w.trv)return x?'<span class="tag" style="border-style:dashed" title="'+esc(t('tr.d.'+x))+'">'+t('tr.'+x)+'</span>':'';
 return w.fed===G.fed.id?'<span class="tag mute" style="border-style:dashed" title="'+esc(t('tr.hid'))+'">❓</span>':''}
function trWeekly(){
 const lvl=scoutLvl();
 mine().forEach(w=>{const x=trOf(w);
  if(!w.trv){if(w.sinceF!==G.fed.id){w.sinceF=G.fed.id;w.since=G.week}if(G.week-w.since>=18-lvl*.06){w.trv=1;if(x){addNews('n.tr.rev',{w:w.name,x:t('tr.'+x)});ibxPush('m',t('tr.rev'),w.name+': '+t('tr.'+x)+' – '+t('tr.d.'+x))}}}
  if(x==='ego'&&w.pop>=40&&!G.titles.some(tt=>tt.holders.indexOf(w.id)>=0))evMood(w,-1.2);
  else if(x==='pro'&&w.morale<70)evMood(w,1);
  else if(x==='troub'&&rnd()<.015){const o=pickR(mine().filter(z=>z!==w&&!z.farewell));if(o){evMood(o,-3);evMood(w,-2);addNews('n.tr.troub',{w:w.name,o:o.name})}}
  else if(x==='mentor'&&rnd()<.03){const y=mine().filter(z=>z!==w&&z.age<=25).sort((a,b)=>a.ring-b.ring)[0];if(y){y.ring=clamp(y.ring+1,1,99);addNews('n.tr.mentor',{w:w.name,y:y.name})}}})}
Object.assign(D,{'tr.iron':['Żelazny','Ironclad'],'tr.glass':['Szklany','Fragile'],'tr.clutch':['Na wielkie okazje','Big-match player'],'tr.ego':['Gwiazdorskie ego','Star ego'],'tr.pro':['Profesjonalista','Pro'],'tr.troub':['Awanturnik','Troublemaker'],'tr.mentor':['Mentor','Mentor'],
 'tr.d.iron':['mniejsze ryzyko kontuzji','lower injury risk'],'tr.d.glass':['większe ryzyko kontuzji','higher injury risk'],'tr.d.clutch':['lepsze walki o pas i w main evencie','better in title matches and main events'],'tr.d.ego':['traci humor, gdy nie jest mistrzem; słabsze walki w środku karty','loses morale when not champion; weaker mid-card matches'],
 'tr.d.pro':['stabilny humor, drobny plus w każdej walce','steady morale, a small plus in every match'],'tr.d.troub':['czasem psuje humor w szatni','sometimes sours the locker room'],'tr.d.mentor':['pomaga młodym w rozwoju','helps youngsters develop'],
 'tr.hid':['Ukryta cecha – ujawni się z czasem lub po rozmowie.','Hidden trait – revealed over time or after a talk.'],'tr.rev':['Ujawniona cecha','Trait revealed'],
 'n.tr.rev':['{w} ma cechę: {x}.','{w} has the trait: {x}.'],'n.tr.troub':['{w} wszczął awanturę z {o} w szatni.','{w} started a row with {o} in the locker room.'],'n.tr.mentor':['{w} uczy młodego {y} – widać postęp.','{w} teaches young {y} – progress shows.']});
E('lockertalk','Rozmowa w szatni','Locker-room talk','Możesz porozmawiać z {w} jeden na jeden i lepiej go poznać ({m}).','You can have a one-on-one with {w} and get to know them better ({m}).',[['Porozmawiaj ({m})','Have the talk ({m})'],['Nie teraz','Not now']]);
Object.assign(D,{'n.lt1':['Rozmowa z {w}: {x}.','Talk with {w}: {x}.'],'n.lt1n':['Rozmowa z {w} nie wykazała nic szczególnego.','The talk with {w} revealed nothing special.'],'n.lt2':['Rozmowa z {w} odłożona.','The talk with {w} was postponed.']});
Object.assign(WEV,{async lockertalk(){const w=pickR(mine().filter(x=>!x.trv&&!x.farewell));if(!w)return false;const c=r10(wkRev()*.08),v={w:w.name,m:money(c)};const i=await evx('lockertalk',v,['1','2'],[G.fed.cash<c,false]);
 if(i===0){G.fed.cash-=c;w.trv=1;evMood(w,3);const x=trOf(w);addNews(x?'n.lt1':'n.lt1n',{w:w.name,x:x?t('tr.'+x):''})}else addNews('n.lt2',v);return true}});
// ---- scouting reveals traits; title-linked storylines (texts) ----
function trScout(){
 const sc=(G.staff||[]).filter(x=>x.role==='scout');
 sc.forEach(s=>{if(rnd()<.2+s.lvl*.004){const w=pickR(G.ws.filter(x=>!x.trv&&x.fed!==G.fed.id&&x.fed!=='RET'&&x.fed!=='PRO'));if(w){trOf(w);w.trv=1;if(w.tr&&w.fed==='FA')addNews('n.tr.scout',{w:w.name,x:t('tr.'+w.tr),s:s.name})}}})}
Object.assign(D,{'n.tr.scout':['Skaut {s}: {w} to „{x}”.','Scout {s}: {w} is “{x}”.']});
{const A=(k,np,ne,s1,s2)=>{D['ang.'+k+'.t']=[np,ne];[s1,s2].forEach((s,i)=>{const n=i+1;D['ang.'+k+'.'+n+'.t']=[s[0],s[1]];D['ang.'+k+'.'+n+'.b']=[s[2],s[3]];D['ang.'+k+'.'+n+'.1']=[s[4],s[5]];D['ang.'+k+'.'+n+'.2']=[s[6],s[7]]})};
 A('champ','Ostatnia szansa mistrza','Champion\'s Last Stand',
  ['Zmierzch panowania','Twilight of a reign','{a} od dawna dzierży pas, ale młody {b} puka coraz głośniej. Czy to ostatnia obrona?','{a} has held the belt for ages, but young {b} knocks ever louder. Could this be the final defence?','Odważnie: {a} deklaruje, że nigdy nie odda pasa','Bold: {a} vows never to give up the belt','Bezpiecznie: kamera pokazuje zmęczenie mistrza','Safe: the camera shows the champion\'s fatigue'],
  ['Ostatnia prosta','The final stretch','Trybuny dzielą się: jedni wierzą w {a}, inni w {b}. Wielka walka o pas jest nieunikniona.','The stands divide: some believe in {a}, others in {b}. The big title match is inevitable.','Odważnie: {b} atakuje mistrza po gali','Bold: {b} attacks the champion after the show','Bezpiecznie: wspólna konferencja przed walką','Safe: a joint pre-match press conference']);
 A('chase','Pościg za pasem','Chasing the Belt',
  ['Obsesja','Obsession','{a} nie myśli o niczym innym niż pas {b}. Każdego wieczoru wraca do tematu.','{a} thinks of nothing but {b}\'s belt. Every night the subject returns.','Odważnie: {a} wyrywa pas na ringu i ucieka','Bold: {a} snatches the belt in the ring and runs','Bezpiecznie: {a} regularnie zgłasza się po walkę','Safe: {a} keeps asking for a title shot'],
  ['Mistrz kontratakuje','The champion strikes back','{b} nie zamierza oddać pasa bez walki. Fani liczą dni do starcia z {a}.','{b} has no intention of surrendering the belt without a fight. Fans count the days to the clash with {a}.','Odważnie: {b} publicznie upokarza pretendenta','Bold: {b} publicly humiliates the challenger','Bezpiecznie: ostra, ale szanująca się wymiana zdań','Safe: a sharp but respectful exchange'])}
/* ============ Graphics and helpers ============ */
function avatar(l,px){
 l=l||{};px=px||64;const sk=SKIN[(l.skin||0)%SKIN.length],hc=HAIRC[(l.hairC||0)%HAIRC.length],oc=OUTC[(l.outC||0)%OUTC.length],mc=OUTC[(l.maskC||0)%OUTC.length];
 const c2=OUTC[(l.o2==null?((l.outC||0)+3):l.o2)%OUTC.length],bc=l.beardC==null?hc:HAIRC[l.beardC%HAIRC.length];
 const hair=l.hair||'short',beard=l.beard||'none',outfit=l.outfit||'trunks',mask=l.mask||'none',acc=l.acc||'none',gear=l.gear||'none',face=l.face||'none',build=l.build||'std',neck=l.neck||'none';
 let s='';const R=(x,y,w,h,c,o)=>{s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"'+(o?' opacity="'+o+'"':'')+'/>'};
 const B={std:[4,8,2,12,5,9,2],big:[3,10,1,13,4,9,3],lean:[5,6,3,11,5,9,2],stocky:[4,8,2,12,4,9,3],bulk:[2,12,0,14,4,9,3]}[build]||[4,8,2,12,5,9,2];
 const TX=B[0],TW=B[1],AL=B[2],AR=B[3],LL=B[4],LR=B[5],LW=B[6];
 // hair behind the body
 if(hair==='long'){R(4,3,1,8,hc);R(11,3,1,8,hc)}
 else if(hair==='bob'){R(4,3,1,5,hc);R(11,3,1,5,hc)}
 else if(hair==='pony'){R(11,3,2,1,hc);R(12,4,1,5,hc)}
 else if(hair==='pigtails'){R(2,3,2,5,hc);R(12,3,2,5,hc)}
 else if(hair==='braids'){R(3,3,1,9,hc);R(4,3,1,5,hc);R(11,3,1,5,hc);R(12,3,1,9,hc)}
 else if(hair==='dreads'){R(3,3,1,8,hc);R(4,3,1,6,hc);R(11,3,1,6,hc);R(12,3,1,8,hc)}
 else if(hair==='wavy'||hair==='halfup'||hair==='bangs'){R(3,3,1,7,hc);R(12,3,1,7,hc);R(4,3,1,8,hc);R(11,3,1,8,hc)}
 else if(hair==='mullet'){R(4,3,1,5,hc);R(11,3,1,5,hc);R(3,6,1,3,hc);R(12,6,1,3,hc)}
 // body
 let legC=sk,torC=sk,armC=sk,hipC=oc;
 if(outfit==='singlet'){torC=oc}
 else if(outfit==='pants'){legC=oc}
 else if(outfit==='suit'){legC=oc;torC=oc}
 else if(outfit==='tank'){torC=oc;hipC=c2}
 else if(outfit==='shorts'){}
 else if(outfit==='tights'){legC=oc;hipC=c2}
 else if(outfit==='jacket'){torC=oc;armC=oc;legC=c2;hipC=c2}
 else if(outfit==='vest'){legC=c2;hipC=c2}
 else if(outfit==='gi'){torC=oc;armC=oc;legC=oc;hipC=oc}
 else if(outfit==='stripes'){torC=oc}
 else if(outfit==='armor'){torC=oc;hipC=c2}
 else if(outfit==='tshirt'){torC=oc;hipC=c2}
 else if(outfit==='hoodie'){torC=oc;armC=oc;legC=c2;hipC=c2}
 else if(outfit==='leather'){torC='#1a1a1a';armC='#1a1a1a';legC='#1a1a1a';hipC='#1a1a1a'}
 else if(outfit==='coat'||outfit==='robe'){torC=oc;armC=oc;legC=sk;hipC=oc}
 else if(outfit==='tux'){torC=oc;armC=oc;legC=oc;hipC=oc}
 else if(outfit==='leotard'){torC=oc;hipC=oc}
 else if(outfit==='overalls'){torC=c2;legC=oc;hipC=oc}
 else if(outfit==='kilt'){hipC=oc}
 else if(outfit==='bodysuit'){torC=oc;armC=oc;legC=oc;hipC=c2}
 R(LL,17,LW,5,legC);R(LR,17,LW,5,legC);R(LL,22,LW,1,'#222');R(LR,22,LW,1,'#222');
 R(TX,9,TW,6,torC);R(AL,9,2,6,armC);R(AR,9,2,6,armC);R(TX,14,TW,3,hipC);
 if(outfit==='shorts'){R(LL,17,LW,2,oc);R(LR,17,LW,2,oc)}
 else if(outfit==='tights'){R(LL,17,1,5,c2);R(LR+LW-1,17,1,5,c2)}
 else if(outfit==='jacket'){R(7,9,2,5,sk)}
 else if(outfit==='vest'){R(TX,9,2,5,oc);R(TX+TW-2,9,2,5,oc)}
 else if(outfit==='gi'){R(7,9,2,3,sk);R(TX,14,TW,1,c2)}
 else if(outfit==='stripes'){R(TX,11,TW,1,c2);R(TX,13,TW,1,c2)}
 else if(outfit==='armor'){R(AL-1,9,3,2,c2);R(AR,9,3,2,c2);R(7,9,2,2,c2)}
 else if(outfit==='tshirt'){R(AL,9,2,2,oc);R(AR,9,2,2,oc)}
 else if(outfit==='hoodie'){R(6,9,4,1,c2);R(7,12,2,2,c2,.6)}
 else if(outfit==='leather'){R(TX,11,TW,1,c2);R(7,9,2,5,sk,.5);R(AL,10,1,1,'#c4c4c4');R(AR+1,10,1,1,'#c4c4c4')}
 else if(outfit==='coat'){R(TX,17,TW,4,oc);R(7,9,2,12,c2)}
 else if(outfit==='robe'){R(TX,17,TW,5,oc);R(7,9,2,13,c2);R(TX,14,TW,1,c2)}
 else if(outfit==='tux'){R(7,9,2,4,'#f5f5f5');R(7,13,2,1,'#111')}
 else if(outfit==='overalls'){R(TX+1,9,1,6,oc);R(TX+TW-2,9,1,6,oc);R(6,12,4,2,oc)}
 else if(outfit==='kilt'){R(TX,17,TW,3,oc);R(TX,18,TW,1,c2);R(7,17,1,3,c2)}
 else if(outfit==='bodysuit'){R(TX,11,TW,1,c2);R(LL,17,1,5,c2)}
 // head
 R(5,3,6,6,sk);
 // gear
 if(gear==='kneepads'||gear==='pads'){R(LL,19,LW,1,c2);R(LR,19,LW,1,c2)}
 if(gear==='wristbands'||gear==='pads'){R(AL,13,2,1,c2);R(AR,13,2,1,c2)}
 if(gear==='tape'){R(AL,14,2,1,'#e8e6df');R(AR,14,2,1,'#e8e6df');R(AL,12,2,1,'#e8e6df');R(AR,12,2,1,'#e8e6df')}
 if(gear==='chain'){R(6,9,4,1,'#c4c4c4');R(7,10,2,1,'#c4c4c4')}
 if(gear==='tattoo'){R(AL,10,2,1,'#2a2a2a');R(AL,12,2,1,'#2a2a2a');R(AR,11,2,1,'#2a2a2a');R(AR,13,2,1,'#2a2a2a')}
 if(gear==='gloves'){R(AL,14,2,2,c2);R(AR,14,2,2,c2)}
 if(gear==='elbow'){R(AL,11,2,1,c2);R(AR,11,2,1,c2)}
 if(gear==='boots'){R(LL,20,LW,2,c2);R(LR,20,LW,2,c2)}
 if(neck==='scarf'){R(5,8,6,1,c2);R(9,9,1,3,c2)}
 else if(neck==='bowtie'){R(6,9,1,1,c2);R(9,9,1,1,c2);R(7,9,2,1,'#111')}
 else if(neck==='towel'){R(4,8,8,2,'#f5f5f5')}
 else if(neck==='belt'){R(4,9,2,1,'#6b4423');R(5,10,2,1,'#6b4423');R(6,11,2,1,'#6b4423');R(7,12,3,2,'#f2c94c');R(8,12,1,1,'#fff')}
 else if(neck==='tie'){R(7,9,2,1,c2);R(7,10,2,3,c2)}
 if(gear==='armband'){R(AL,10,2,1,'#f2c94c');R(AR,10,2,1,'#f2c94c')}
 // hair on top
 if(hair==='short'||hair==='side'||hair==='slick'||hair==='mullet'||hair==='bun'||hair==='pigtails'||hair==='braids'||hair==='dreads'){R(5,2,6,2,hc);R(4,3,1,2,hc);R(11,3,1,2,hc)}
 if(hair==='side')R(7,2,1,1,sk,.5);
 if(hair==='slick'){R(4,2,1,4,hc);R(11,2,1,4,hc)}
 if(hair==='bun')R(7,0,2,2,hc);
 if(hair==='buzz'){R(5,2,6,1,hc);R(4,3,1,1,hc,.6);R(11,3,1,1,hc,.6)}
 if(hair==='crop'){R(5,1,6,2,hc);R(4,2,1,3,hc);R(11,2,1,3,hc)}
 if(hair==='pompadour'){R(5,0,6,3,hc);R(4,1,1,3,hc);R(11,1,1,3,hc)}
 if(hair==='spiky'){R(5,2,6,1,hc);R(5,0,1,2,hc);R(7,0,1,2,hc);R(9,0,1,2,hc);R(10,1,1,1,hc)}
 if(hair==='fauxhawk'){R(6,1,4,2,hc);R(7,0,2,1,hc);R(5,3,1,1,hc);R(10,3,1,1,hc)}
 if(hair==='mohawk'){R(7,0,2,3,hc);R(6,3,4,1,hc)}
 if(hair==='curly'){R(4,1,8,3,hc);R(3,2,1,3,hc);R(12,2,1,3,hc);R(4,4,1,2,hc);R(11,4,1,2,hc)}
 if(hair==='afro'){R(4,1,8,4,hc);R(3,2,1,3,hc);R(12,2,1,3,hc)}
 if(hair==='long'||hair==='bob'||hair==='pony'||hair==='wavy'||hair==='halfup'){R(5,2,6,2,hc)}
 if(hair==='shaggy'){R(4,1,8,3,hc);R(4,3,1,4,hc);R(11,3,1,4,hc)}
 if(hair==='undercut'){R(5,2,6,1,hc,.5);R(6,0,4,2,hc)}
 if(hair==='topknot'){R(5,2,6,1,hc,.5);R(7,0,2,2,hc)}
 if(hair==='flattop'){R(5,0,6,3,hc);R(4,2,1,2,hc,.6);R(11,2,1,2,hc,.6)}
 if(hair==='bangs'){R(5,2,6,3,hc)}
 if(hair==='cornrows'){R(5,2,6,1,hc);R(5,1,1,2,hc);R(7,1,1,2,hc);R(9,1,1,2,hc);R(10,1,1,1,hc)}
 if(hair==='halfup'){R(7,0,2,2,hc)}
 // beard
 if(beard==='stubble')R(5,7,6,2,bc,.4);
 else if(beard==='heavy')R(5,6,6,3,bc,.55);
 else if(beard==='full')R(5,7,6,3,bc);
 else if(beard==='mustache')R(6,7,4,1,bc);
 else if(beard==='handlebar'){R(5,7,6,1,bc);R(5,8,1,1,bc);R(10,8,1,1,bc)}
 else if(beard==='goatee')R(7,8,2,2,bc);
 else if(beard==='soulpatch')R(7,8,2,1,bc);
 else if(beard==='chinstrap'){R(5,8,1,2,bc);R(10,8,1,2,bc);R(5,9,6,1,bc)}
 else if(beard==='vandyke'){R(6,7,4,1,bc);R(7,8,2,3,bc)}
 else if(beard==='mutton'){R(4,5,1,4,bc);R(11,5,1,4,bc);R(5,7,1,2,bc);R(10,7,1,2,bc);R(6,7,4,1,bc)}
 else if(beard==='sideburns'){R(4,5,1,3,bc);R(11,5,1,3,bc)}
 else if(beard==='long'){R(5,7,6,3,bc);R(6,10,4,2,bc)}
 else if(beard==='anchor'){R(6,7,4,1,bc);R(7,8,2,1,bc);R(5,9,6,1,bc)}
 else if(beard==='circle'){R(6,7,4,1,bc);R(6,8,1,2,bc);R(9,8,1,2,bc);R(7,9,2,1,bc)}
 else if(beard==='bushy'){R(4,6,8,4,bc)}
 else if(beard==='patchy'){R(5,7,1,1,bc,.8);R(7,8,1,1,bc,.8);R(9,7,1,1,bc,.8);R(10,8,1,1,bc,.8);R(6,9,1,1,bc,.8)}
 // face extras
 if(face==='scar')R(9,4,1,3,'#b04a4a');
 else if(face==='freckles'){R(6,6,1,1,'#8a5a2b',.7);R(9,6,1,1,'#8a5a2b',.7);R(7,6,1,1,'#8a5a2b',.5);R(10,6,1,1,'#8a5a2b',.5)}
 else if(face==='stripe')R(5,5,6,1,c2,.85);
 else if(face==='bruise')R(5,6,2,2,'#7a4a8a',.6);
 else if(face==='lipstick')R(7,8,2,1,'#c2185b');
 else if(face==='eyeliner'){R(6,4,1,1,'#111');R(9,4,1,1,'#111');R(5,5,1,1,'#111',.7);R(10,5,1,1,'#111',.7)}
 else if(face==='warpaint'){R(5,5,6,1,'#fff',.9);R(5,6,1,2,'#fff',.9);R(10,6,1,2,'#fff',.9)}
 else if(face==='bandage'){R(8,3,3,2,'#f5f5f5');R(9,3,1,2,'#d33',.6)}
 else if(face==='tears'){R(6,6,1,2,'#38bdf8',.8);R(9,6,1,2,'#38bdf8',.8)}
 // mask
 if(mask==='full'){R(5,3,6,6,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(7,7,2,1,sk)}
 else if(mask==='half'){R(5,3,6,3,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='domino'){R(5,4,6,2,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='bandana'){R(5,7,6,2,mc)}
 else if(mask==='paint'){R(5,3,3,6,mc,.9)}
 else if(mask==='hood'){R(4,2,8,2,mc);R(4,4,1,5,mc);R(11,4,1,5,mc)}
 else if(mask==='skull'){R(5,3,6,6,'#eee');R(6,5,1,2,'#111');R(9,5,1,2,'#111');R(6,8,4,1,'#111');R(7,7,1,1,'#111');R(9,7,1,1,'#111')}
 else if(mask==='cat'){R(5,3,6,6,mc);R(5,2,1,1,mc);R(10,2,1,1,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(7,7,2,1,'#111')}
 else if(mask==='oni'){R(5,3,6,6,mc);R(5,1,1,2,'#fff');R(10,1,1,2,'#fff');R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(6,8,4,1,'#fff')}
 else if(mask==='stripe'){R(5,3,6,6,mc);R(7,3,2,6,c2);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='wings'){R(5,3,6,6,mc);R(3,3,2,3,c2);R(11,3,2,3,c2);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 // eyes
 if(face==='eyepatch'){R(6,4,2,2,'#111');R(5,3,6,1,'#111');R(9,5,1,1,'#1a1a1a')}
 else if(mask==='none'||mask==='bandana'||mask==='paint'||mask==='hood'){R(6,5,1,1,'#1a1a1a');R(9,5,1,1,'#1a1a1a')}
 // head accessories
 if(acc==='headband')R(5,3,6,1,c2);
 else if(acc==='cap'){R(4,2,8,2,oc);R(10,3,3,1,oc)}
 else if(acc==='backcap'){R(4,2,8,2,oc);R(3,3,2,1,oc)}
 else if(acc==='bandana'){R(4,2,8,2,c2);R(11,3,2,1,c2)}
 else if(acc==='shades'){R(5,5,3,1,'#111');R(8,5,3,1,'#111');R(5,4,6,1,'#111',.0)}
 else if(acc==='glasses'){R(5,4,3,1,'#333');R(5,6,3,1,'#333');R(5,4,1,3,'#333');R(7,4,1,3,'#333');R(8,4,3,1,'#333');R(8,6,3,1,'#333');R(8,4,1,3,'#333');R(10,4,1,3,'#333')}
 else if(acc==='crown'){R(5,1,6,2,'#f2c94c');R(5,0,1,1,'#f2c94c');R(7,0,1,1,'#f2c94c');R(9,0,1,1,'#f2c94c');R(10,0,1,1,'#f2c94c')}
 else if(acc==='cowboy'){R(3,2,10,1,'#6b3a1f');R(5,0,6,2,'#6b3a1f')}
 else if(acc==='beanie'){R(4,2,8,2,oc);R(5,1,6,1,oc)}
 else if(acc==='fedora'){R(3,2,10,1,'#2a2a2a');R(5,0,6,2,'#2a2a2a');R(5,1,6,1,c2)}
 else if(acc==='visor'){R(4,2,8,1,oc);R(9,3,4,1,oc)}
 else if(acc==='tiara'){R(5,1,6,1,'#c0c0c0');R(7,0,2,1,'#c0c0c0')}
 else if(acc==='flowers'){R(4,2,8,1,'#ec4899');R(5,1,1,1,'#fde047');R(8,1,1,1,'#fb7185');R(10,1,1,1,'#fde047')}
 else if(acc==='earrings'){R(4,7,1,1,'#f2c94c');R(11,7,1,1,'#f2c94c')}
 return '<svg viewBox="0 0 16 23" width="'+Math.round(px*16/23)+'" height="'+px+'" shape-rendering="crispEdges" aria-hidden="true">'+s+'</svg>';
}
function openModal(html){if(!hasDoc)return;const m=document.getElementById('modal');m.innerHTML='<div class="mbox" role="dialog" aria-modal="true">'+html+'</div>';m.hidden=false}
function closeModal(){if(!hasDoc)return;const m=document.getElementById('modal');m.hidden=true;m.innerHTML=''}
const bar=(v,cls)=>'<div class="bar '+(cls||'')+'"><i style="width:'+clamp(v,0,100)+'%"></i></div>';
const stat=(l,v,cls)=>'<div><div class="lbl"><span>'+l+'</span><span>'+Math.round(v)+'</span></div>'+bar(v,cls)+'</div>';
function spark(arr,w,h,col){
 if(arr.length<2)return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'"></svg>';
 const mn=Math.min.apply(null,arr),mx=Math.max.apply(null,arr),rg=(mx-mn)||1,p=4;
 const pts=arr.map((v,i)=>[p+i*(w-2*p)/(arr.length-1),h-p-(v-mn)/rg*(h-2*p)]);
 const line=pts.map(x=>x[0].toFixed(1)+','+x[1].toFixed(1)).join(' ');
 const area='M'+pts[0][0]+','+(h-p)+' L'+line.split(' ').join(' L')+' L'+pts[pts.length-1][0]+','+(h-p)+' Z';const last=pts[pts.length-1];
 return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'" preserveAspectRatio="none" role="img"><path d="'+area+'" fill="'+col+'" opacity=".16"/><polyline points="'+line+'" fill="none" stroke="'+col+'" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="'+last[0]+'" cy="'+last[1]+'" r="3.5" fill="'+col+'"/></svg>';
}
function gauge(v,col){
 const r=34,c=2*Math.PI*r,d=c*clamp(v,0,100)/100;
 return '<svg viewBox="0 0 90 90" width="84" height="84" role="img" aria-label="'+Math.round(v)+'/100"><circle cx="45" cy="45" r="'+r+'" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="45" cy="45" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="9" stroke-dasharray="'+d.toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 45 45)"/><text x="45" y="51" text-anchor="middle" font-family="var(--font-d)" font-size="22" fill="var(--fg)">'+Math.round(v)+'</text></svg>';
}
const cn=c=>t('cn.'+c);
function wMini(w,extra){return '<div class="row" style="flex-wrap:nowrap;gap:8px"><div class="av" style="min-width:40px;padding:3px">'+avatar(w.look,38)+'</div><div style="min-width:0"><div class="wname" style="font-size:14px">'+esc(w.name)+'</div><div class="mute" style="font-size:12px">'+(extra||'')+'</div></div></div>'}
function langSwitch(){return '<div class="row" role="group" aria-label="'+t('s.lang')+'"><button class="btn sm'+(lang==='pl'?' gold':'')+'" data-act="lang" data-v="pl">PL</button><button class="btn sm'+(lang==='en'?' gold':'')+'" data-act="lang" data-v="en">EN</button></div>'}
function newsList(n){if(!G.news.length)return '<p class="mute">'+t('d.none')+'</p>';return '<ul class="news">'+G.news.slice(0,n).map(x=>'<li><span class="w">W'+x.w+'</span><span>'+esc(t(x.k,x.v))+'</span></li>').join('')+'</ul>'}
function histChart(){
 const H=G.hist.slice(-12);if(!H.length)return '<p class="mute">'+t('d.none')+'</p>';
 const w=520,h=170,pl=44,pb=22,pt=10;const mx=Math.max.apply(null,H.map(x=>Math.max(x.rev,x.cost)))||1;const bw=(w-pl)/H.length;let s='';
 [0,.5,1].forEach(g=>{const y=pt+(h-pt-pb)*(1-g);s+='<line x1="'+pl+'" x2="'+w+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-width="1"/><text x="'+(pl-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="10" fill="var(--mute)">'+money(mx*g)+'</text>'});
 H.forEach((x,i)=>{const x0=pl+i*bw+bw*.12,bwid=bw*.36;const hr=(h-pt-pb)*x.rev/mx,hc=(h-pt-pb)*x.cost/mx;s+='<rect x="'+x0+'" y="'+(h-pb-hr)+'" width="'+bwid+'" height="'+hr+'" fill="var(--teal)"/><rect x="'+(x0+bwid+1)+'" y="'+(h-pb-hc)+'" width="'+bwid+'" height="'+hc+'" fill="var(--red)"/><text x="'+(x0+bwid)+'" y="'+(h-6)+'" text-anchor="middle" font-size="10" fill="var(--mute)">'+x.week+'</text>'});
 return '<div class="scroll"><svg viewBox="0 0 '+w+' '+h+'" width="100%" style="min-width:420px" role="img" aria-label="'+t('m.hist')+'">'+s+'</svg></div><div class="row mute" style="font-size:12px"><span><span class="dot" style="background:var(--teal)"></span>'+t('m.income')+'</span><span><span class="dot" style="background:var(--red)"></span>'+t('m.costs')+'</span></div>';
}
function avEditor(id){
 const w=W(id);const l=w.look;
 const sw=(k,arr,cur)=>'<div class="sw">'+arr.map((c,i)=>'<button style="background:'+c+'" class="'+(cur===i?'on':'')+'" data-act="look" data-id="'+id+'" data-k="'+k+'" data-v="'+i+'" aria-label="'+k+' '+(i+1)+'"></button>').join('')+'</div>';
 const tx=(k,arr,cur,pfx)=>'<div class="sw">'+arr.map(v=>'<button class="txt'+(cur===v?' on':'')+'" data-act="look" data-id="'+id+'" data-k="'+k+'" data-v="'+v+'">'+t(pfx+'.'+v)+'</button>').join('')+'</div>';
 return '<div class="row spread"><h2>'+t('av.title')+'</h2><button class="btn gold" data-act="avclose">'+t('av.close')+'</button></div><div class="row" style="align-items:flex-start;flex-wrap:nowrap"><div class="av" style="padding:10px">'+avatar(l,150)+'</div><div class="stack" style="gap:8px;min-width:0"><b>'+esc(w.name)+'</b><button class="btn sm" data-act="avrand" data-id="'+id+'">'+t('av.random')+'</button></div></div>'+
  '<div class="px">'+t('av.build')+'</div>'+tx('build',BUILDS,l.build||'std','bld')+'<div class="px">'+t('av.skin')+'</div>'+sw('skin',SKIN,l.skin)+'<div class="px">'+t('av.hair')+'</div>'+tx('hair',HAIRS,l.hair,'hs')+'<div class="px">'+t('av.hairc')+'</div>'+sw('hairC',HAIRC,l.hairC)+
  '<div class="px">'+t('av.beard')+'</div>'+tx('beard',BEARDS,l.beard||'none','bd')+'<div class="px">'+t('av.beardc')+'</div>'+sw('beardC',HAIRC,l.beardC==null?l.hairC:l.beardC)+
  '<div class="px">'+t('av.outfit')+'</div>'+tx('outfit',OUTFITS,l.outfit,'of')+'<div class="px">'+t('av.outc')+'</div>'+sw('outC',OUTC,l.outC)+'<div class="px">'+t('av.o2')+'</div>'+sw('o2',OUTC,l.o2==null?((l.outC||0)+3)%OUTC.length:l.o2)+
  '<div class="px">'+t('av.acc')+'</div>'+tx('acc',ACCS,l.acc||'none','acc')+'<div class="px">'+t('av.neck')+'</div>'+tx('neck',NECKS,l.neck||'none','nk')+'<div class="px">'+t('av.gear')+'</div>'+tx('gear',GEARS,l.gear||'none','gear')+'<div class="px">'+t('av.face')+'</div>'+tx('face',FACES,l.face||'none','face')+
  '<div class="px">'+t('av.mask')+'</div>'+tx('mask',MASKS,l.mask||'none','mk')+'<div class="px">'+t('av.maskc')+'</div>'+sw('maskC',OUTC,l.maskC);
}


/* ============ Views: start, dashboard, roster, show ============ */
function viewStart(){
 const sv=loadSave();
 let h='<div class="shell" style="grid-template-columns:minmax(0,1fr)"><main><div class="top"><div class="logo">RING <b>BOSS</b></div>'+langSwitch()+'</div>';
 h+='<div class="hero"><div class="px">'+t('app.tag')+'</div><h1>'+t('start.title')+'</h1><p class="mute" style="max-width:62ch;margin:0">'+t('start.sub')+'</p></div>';
 if(sv)h+='<div class="card pop row spread"><div><b>'+esc(sv.fed.name)+'</b><div class="mute">'+t('common.week',{w:((sv.week-1)%52)+1,y:yearOf(sv.week)})+' · '+money(sv.fed.cash)+'</div></div><button class="btn gold" data-act="continue">'+t('start.continue')+'</button></div>';
 h+='<div class="row"><label class="px" for="sd">'+t('start.diff')+'</label><select id="sd" class="field" style="width:auto" data-chg="sd">'+Object.keys(DIFF).map(d=>'<option value="'+d+'"'+(START_D===d?' selected':'')+'>'+t('diff.'+d)+'</option>').join('')+'</select><label class="px" for="sch">'+t('start.chal')+'</label><select id="sch" class="field" style="width:auto" data-chg="sch">'+CHALS.map(d=>'<option value="'+d+'"'+(START_CH===d?' selected':'')+'>'+t('chal.'+d)+'</option>').join('')+'</select></div>';
 h+='<div class="row"><label class="px" for="sf">'+t('start.filter')+'</label><select id="sf" class="field" style="width:auto" data-chg="sf"><option value="all">'+t('start.all')+'</option>'+[5,4,3,2,1].map(n=>'<option value="'+n+'"'+(String(START_F)===String(n)?' selected':'')+'>'+t('tier.'+n)+'</option>').join('')+'</select><label class="px" for="sk">'+t('ui.continent')+'</label><select id="sk" class="field" style="width:auto" data-chg="sk"><option value="all">'+t('start.all')+'</option>'+CONTS.map(c=>'<option value="'+c+'"'+(START_K===c?' selected':'')+'>'+t('ct.'+c)+'</option>').join('')+'</select><label class="px" for="sc">'+t('ui.country')+'</label><select id="sc" class="field" style="width:auto" data-chg="sc"><option value="all">'+t('start.all')+'</option>'+[...new Set(PACK.feds.map(f=>f.country))].sort((a,b)=>cn(a).localeCompare(cn(b))).map(c=>'<option value="'+c+'"'+(START_C===c?' selected':'')+'>'+cn(c)+'</option>').join('')+'</select><label class="px" for="ss">'+t('r.sort')+'</label><select id="ss" class="field" style="width:auto" data-chg="ss">'+[['tier','ui.sTier'],['ct','ui.sCt'],['cn','ui.sCn'],['name','r.sortname'],['pop','r.sortpop']].map(o=>'<option value="'+o[0]+'"'+(START_S===o[0]?' selected':'')+'>'+t(o[1])+'</option>').join('')+'</select></div>';
 h+='<div class="grid gA">';
 PACK.feds.filter(f=>(START_F==='all'||String(f.tier)===String(START_F))&&(START_C==='all'||f.country===START_C)&&(START_K==='all'||contOf(f.country)===START_K)).sort((a,b)=>START_S==='ct'?CONTS.indexOf(contOf(a.country))-CONTS.indexOf(contOf(b.country))||cn(a.country).localeCompare(cn(b.country))||b.tier-a.tier:START_S==='cn'?cn(a.country).localeCompare(cn(b.country))||b.tier-a.tier||b.pop-a.pop:START_S==='name'?a.name.localeCompare(b.name):START_S==='pop'?b.pop-a.pop:b.tier-a.tier||b.pop-a.pop).forEach(f=>{
  const n=PACK.wrestlers.filter(w=>w.fed===f.id).length;
  h+='<div class="card fedpick"><div class="row spread"><div class="wname"><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name)+'</div><span class="tag">'+esc(f.short||'')+'</span></div>'+
   '<div class="row"><span class="tag">'+t('tier.'+f.tier)+'</span><span class="tag">'+cn(f.country)+'</span></div><div class="mute">'+t('diff.'+f.tier)+'</div>'+
   '<div class="grid g2" style="gap:8px"><div><div class="px">'+t('start.cash')+'</div><b>'+money(f.cash)+'</b></div><div><div class="px">'+t('start.pop')+'</div><b>'+f.pop+'</b></div></div>'+
   bar(f.pop)+'<div class="mute" style="font-size:13px">'+t('start.roster',{n})+'</div><button class="btn gold" data-act="start" data-v="'+esc(f.id)+'">'+t('start.play')+'</button></div>';
 });
 h+='<div class="card fedpick"><div class="wname">'+t('start.custom')+'</div><div class="mute">'+t('start.customsub')+'</div>'+
  '<label class="px" for="cname">'+t('start.name')+'</label><input id="cname" class="field" maxlength="40" value="My Promotion">'+
  '<label class="px" for="ccountry">'+t('start.country')+'</label><select id="ccountry" class="field">'+COUNTRIES.map(c=>'<option value="'+c+'"'+(c==='PL'?' selected':'')+'>'+cn(c)+'</option>').join('')+'</select>'+
  '<button class="btn gold" data-act="custom">'+t('start.create')+'</button></div>';
 return h+'</div><p class="mute" style="font-size:13px">'+t('s.about')+'</p></main></div>';
}
const NAVG=[['g.main',['dash','inbox','roster','show','cal']],['g.story',['feuds','stables','titles','prizes','cup','ppv']],['g.fed',['staff','money','infra','board']],['g.world',['world','fa','rank','tw']],['g.hist',['hof']],['g.sys',['settings']]];
const NAV=NAVG.reduce((a,g)=>a.concat(g[1]),[]);
function navCol(){try{return JSON.parse(localStorage.getItem('ringboss.nav.v1')||'{}')}catch(e){return {}}}
function shell(inner){
 const f=G.fed;let h='<div class="shell"><aside class="side"><div class="logo">RING <b>BOSS</b></div><div class="tagline">'+t('app.tag')+'</div><nav class="nav">';
 const nc=navCol();NAVG.forEach(g=>{const act=g[1].indexOf(G.screen)>=0,col=!!nc[g[0]]&&!act,single=g[1].length===1&&g[0]==='g.sys';if(!single)h+='<div class="ng'+(col?' c':'')+'"><button class="nh" data-act="navg" data-g="'+g[0]+'" aria-expanded="'+(!col)+'"><span>'+t(g[0])+(col&&g[1].indexOf('tw')>=0&&twNew()?' <span class="tag">'+twNew()+'</span>':'')+'</span><span class="ar">'+(col?'▸':'▾')+'</span></button><div class="ng-i">';g[1].forEach(n=>{h+='<button data-act="nav" data-v="'+n+'" class="'+(G.screen===n?'on':'')+'">'+t('nav.'+n)+(n==='tw'&&twNew()?' <span class="tag">'+twNew()+'</span>':'')+(n==='inbox'&&ibxNew()?' <span class="tag">'+ibxNew()+'</span>':'')+'</button>'});if(!single)h+='</div></div>'});
 return h+'</nav><div class="fedbox"><div class="px">'+t('common.week',{w:((G.week-1)%52)+1,y:yearOf(G.week)})+'</div><b>'+esc(f.name)+'</b><div class="mute" style="font-size:13px">'+t('tier.'+f.tier)+' · '+t('venue.'+f.tier)+'</div></div></aside><main>'+inner+'</main></div>';
}
function holdersHtml(tt){return tt.holders.length?tt.holders.map(i=>W(i)?wMini(W(i)):'').join(''):'<span class="tag" style="align-self:flex-start">'+t('t.vacant')+'</span>'}
function vDash(){
 const f=G.fed,T=tdNow();const last=G.hist[G.hist.length-1];
 let h='<div class="top"><h2>'+t('nav.dash')+'</h2><button class="btn gold" data-act="nav" data-v="show">'+t('d.next')+'</button></div>';
 h+='<div class="grid g4"><div class="card kpi"><div class="px">'+t('d.cash')+'</div><div class="v '+(f.cash<0?'neg':'')+'">'+money(f.cash)+'</div><div class="s">'+(last?(last.rev-last.cost>=0?'<span class="pos">+':'<span class="neg">')+money(last.rev-last.cost)+'</span> / '+t('nav.show').toLowerCase():'&nbsp;')+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.pop')+'</div><div class="row" style="flex-wrap:nowrap">'+gauge(f.pop,'var(--gold)')+'<div class="s">'+f1(f.pop)+' / 100</div></div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.venue')+'</div><div class="v" style="font-size:20px">'+t('venue.'+f.tier)+'</div><div class="s">'+t('d.cap',{n:num(T.cap)})+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('d.trend')+'</div>'+spark(G.popHist,160,60,'var(--gold)')+'</div></div>';
 h+=boardStrip()+chalHtml();
 h+='<div class="grid g2"><div class="card stack"><h3>'+t('d.last')+'</h3>';
 if(G.summary){const s=G.summary;h+='<div class="row">'+starsHtml(s.rating)+'<b>'+f2(s.rating)+'</b></div><div class="mute">'+t('sh.att')+': '+num(s.att)+' / '+num(s.cap)+(s.sold?' · '+t('sh.sold'):'')+' · '+t('sh.profit')+': <span class="'+(s.profit>=0?'pos':'neg')+'">'+money(s.profit)+'</span></div>'+s.out.map(o=>o.promo?'<div class="row spread"><div style="min-width:0"><b>'+esc(o.a)+'</b> <span class="tag">'+t('pr.type.'+o.ty)+'</span><div class="mute" style="font-size:13px">'+esc(o.line)+'</div></div>'+starsHtml(o.stars)+'</div>':'<div class="row spread"><span style="min-width:0;overflow-wrap:anywhere">'+esc(o.winner)+'</span>'+starsHtml(o.stars)+'</div>').join('')}
 else h+='<p class="mute">'+t('d.none')+'</p>';
 h+='</div><div class="card stack"><h3>'+t('d.obj')+'</h3>';
 objectives().forEach(o=>{const p=clamp(o.cur/o.tar*100,0,100);const done=o.cur>=o.tar;h+='<div><div class="lbl"><span>'+t(o.k,o.v)+'</span><span>'+(done?'<span class="pos">✓</span>':Math.round(p)+'%')+'</span></div>'+bar(p,done?'t':'')+'</div>'});
 h+='</div></div><div class="grid g2"><div class="card stack"><h3>'+t('d.war')+'</h3>';
 allFeds().slice(0,10).forEach((x,i)=>{const me=x.id===G.fed.id;h+='<div><div class="lbl"><span'+(me?' style="color:var(--gold);font-weight:600"':'')+'>'+(i+1)+'. '+esc(x.short||x.name)+' · '+t('tier.'+x.tier)+'</span><span>'+Math.round(x.pop)+'</span></div>'+bar(x.pop,me?'':'b')+'</div>'});
 h+='</div><div class="card stack"><h3>'+t('d.champs')+'</h3>'+G.titles.map(tt=>'<div class="row" style="flex-wrap:nowrap;gap:12px;align-items:flex-start">'+belt(tt,92)+'<div class="stack" style="gap:4px;min-width:0"><div class="mute" style="font-size:13px">'+esc(titleName(tt))+'</div>'+holdersHtml(tt)+'</div></div>').join('')+
  '<h3 style="margin-top:6px">'+t('d.feuds')+'</h3>';
 if(!G.feuds.length)h+='<div class="mute">'+t('f.none').split('.')[0]+'.</div>';
 G.feuds.slice().sort((a,b)=>b.heat-a.heat).slice(0,3).forEach(fd=>{h+='<div><div class="lbl"><span>'+esc(fLabel(fd))+'</span><span>'+Math.round(fd.heat)+'</span></div>'+bar(fd.heat,'r')+'</div>'});
 return h+'</div></div><div class="card stack"><h3>'+t('d.news')+'</h3>'+newsList(8)+'</div>';
}
function wCard(w,extra){
 const ow=w.fed===G.fed.id;const st=ow?stableOf(w.id):null;const acc=ow?w.acc:accStart(w.country,G.fed.country);
 let h='<div class="card wcard"><div class="av">'+avatar(w.look,96)+'</div><div class="stack" style="gap:7px"><div><div class="wname">'+esc(w.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(w.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀ '+t('g.f')+'</span>':'')+(w.celeb?'<span class="tag" style="color:var(--gold);border-color:var(--gold)">★ '+t('gs.celeb')+'</span>':'')+'<span class="tag">'+cn(w.country)+'</span><span class="tag">'+t('style.'+w.style)+'</span><span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span><span class="tag">'+(foreign(w)?t('st.foreign'):t('st.home'))+'</span>'+(st?'<span class="tag">'+t('st.stable',{n:esc(st.name)})+'</span>':'')+(w.injury?'<span class="tag inj">'+injTxt(w)+'</span>':(w.rust>0?'<span class="tag">'+t('r.rust')+'</span>':''))+potTag(w)+trTag(w)+'</div></div>';
 h+='<div class="sgh">'+t('st.g.main')+'</div><div class="sg">'+stat(t('st.ring'),w.ring,'')+stat(t('st.mic'),w.mic,'b')+stat(t('st.cha'),w.cha,'t')+stat(t('st.pop'),w.pop,'')+'</div>';
 h+='<div class="sgh">'+t('st.g.body')+'</div><div class="sg">'+stat(t('st.str'),w.str,'')+stat(t('st.spd'),w.spd,'')+stat(t('st.tec'),w.tec,'')+stat(t('st.sta'),w.sta,'')+stat(t('st.psy'),w.psy,'')+'</div>';
 h+='<div class="sgh">'+t('st.g.status')+'</div><div class="sg">'+stat(t('st.morale'),w.morale,'t')+stat(t('st.fat'),w.fatigue,'r')+stat(t('st.acc'),acc,'b')+stat(t('st.loy'),w.loyal,'')+'</div>';
 h+='<div class="mute" style="font-size:13px">'+t('st.age',{n:w.age})+' · '+t('st.salary',{m:money(w.salary)})+(ow?' · '+t('st.contract',{n:wks(Math.max(0,w.contract))}):'')+'</div>';
 return h+relHtml(w)+(extra||'')+'</div></div>';
}
function vRoster(){
 const list=mine().filter(w=>!G.rgen||(G.rgen==='f')===(w.g==='f')).sort((a,b)=>G.sort==='ct'?CONTS.indexOf(contOf(a.country))-CONTS.indexOf(contOf(b.country))||cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='cn'?cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='name'?a.name.localeCompare(b.name):G.sort==='ring'?b.ring-a.ring:b.pop-a.pop);
 let h='<div class="top"><div><h2>'+t('r.title')+'</h2><div class="mute">'+t('r.limit',{n:list.length,m:ROSTERMAX[G.fed.tier-1]})+'</div></div><div class="row"><select class="field" style="width:auto" data-chg="rgen"><option value="">'+t('g.all')+'</option><option value="m"'+(G.rgen==='m'?' selected':'')+'>'+t('g.m')+'</option><option value="f"'+(G.rgen==='f'?' selected':'')+'>'+t('g.f')+'</option></select><label class="px" for="sort">'+t('r.sort')+'</label><select id="sort" class="field" style="width:auto" data-chg="sort"><option value="pop"'+(G.sort==='pop'?' selected':'')+'>'+t('r.sortpop')+'</option><option value="ring"'+(G.sort==='ring'?' selected':'')+'>'+t('r.sortring')+'</option><option value="name"'+(G.sort==='name'?' selected':'')+'>'+t('r.sortname')+'</option><option value="ct"'+(G.sort==='ct'?' selected':'')+'>'+t('ui.sCt')+'</option><option value="cn"'+(G.sort==='cn'?' selected':'')+'>'+t('ui.sCn')+'</option></select></div></div>';
 return h+'<div class="grid gW">'+list.map(w=>wCard(w,'<div class="row"><button class="btn sm" data-act="avedit" data-id="'+w.id+'">'+t('r.edit')+'</button><button class="btn sm" data-act="renew" data-id="'+w.id+'"'+(G.fed.cash<w.salary*10?' disabled':'')+'>'+t('r.renew')+' ('+money(w.salary*10)+')</button><button class="btn sm" data-act="retire" data-id="'+w.id+'">'+t('r.retire')+'</button><button class="btn sm danger" data-act="release" data-id="'+w.id+'">'+t('r.release')+'</button></div>'+(w.farewell?'<div class="row"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('rt.tag',{n:wks(Math.max(0,w.farewell.left)),r:w.farewell.role?t('sr.'+w.farewell.role):t('rt.norole')})+'</span><button class="btn sm" data-act="cancelfw" data-id="'+w.id+'">'+t('rt.cancel2')+'</button></div>':''))).join('')+'</div>';
}
function wOpts(except,sel){
 const u=usedIds(except);const cm=G.card[except];
 if(cm&&cm.cash&&cm.title){const tc=titleOf(cm.title);if(tc)tc.holders.forEach(c=>u.delete(c))}
 if(cm){const n=MODES[cm.mode];cm.a.slice(0,n.a).concat(cm.b.slice(0,n.b)).forEach(x=>{if(x&&x!==sel)u.add(x)})}
 return '<option value="">'+t('sh.pick')+'</option>'+bookable().sort((a,b)=>b.pop-a.pop).filter(w=>!u.has(w.id)||w.id===sel).map(w=>'<option value="'+w.id+'"'+(w.id===sel?' selected':'')+'>'+(w.ext?'★ ['+catLabel(w)+'] ':w.fed!==G.fed.id?'['+esc((G.rivals.find(r=>r.id===w.fed)||{}).short||'?')+'] ':'')+esc(w.name)+(w.g==='f'?' ♀':'')+' · '+t('role.'+w.role).split(' ')[0]+' · '+t('style.'+w.style)+' · '+Math.round(w.pop)+esc(feudTag(w.id))+'</option>').join('');
}
function rolesLine(id){
 const w=id?W(id):null;if(!w)return '<div class="note">&nbsp;</div>';const st=stableOf(id);
 return '<div class="row" style="gap:5px">'+(w.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span><span class="tag">'+t('style.'+w.style)+'</span>'+(st?'<span class="tag">'+esc(st.name)+'</span>':'')+(w.fatigue>70?'<span class="tag inj">'+t('st.fat')+' '+Math.round(w.fatigue)+'</span>':'')+(foreign(w)?'<span class="tag">'+t('st.acc')+' '+Math.round(w.acc)+'</span>':'')+'</div>';
}
function selHtml(m,i,sd,j){return '<select data-chg="slot" data-i="'+i+'" data-side="'+sd+'" data-j="'+j+'" aria-label="'+t('sh.pick')+'">'+wOpts(i,m[sd][j])+'</select>'+rolesLine(m[sd][j])}
function modeOpts(cur){
 const ks=Object.keys(MODES),o=k=>'<option value="'+k+'"'+(cur===k?' selected':'')+'>'+esc(modeLabel(k))+'</option>';
 let h='';for(let a=1;a<=10;a++){const g=ks.filter(k=>!MODES[k].ffa&&MODES[k].a===a);if(g.length)h+='<optgroup label="'+esc(t('mode.g.n',{n:a}))+'">'+g.map(o).join('')+'</optgroup>'}
 return h+'<optgroup label="'+esc(t('mode.g.multi'))+'">'+ks.filter(k=>MODES[k].ffa).map(o).join('')+'</optgroup>'}
function timeline(){const L=[],n=G.card.length;for(let k=0;k<=n;k++){G.promos.filter(p=>Math.min(p.at,n)===k).forEach(p=>L.push({t:'p',o:p}));if(k<n)L.push({t:'m',o:G.card[k]})}return L}
function applyTL(L){G.card=L.filter(x=>x.t==='m').map(x=>x.o);let c=0;G.promos=[];L.forEach(x=>{if(x.t==='m')c++;else{x.o.at=c;G.promos.push(x.o)}})}
const PLATN={yt:['YouTube','YouTube'],twitch:['Twitch','Twitch'],kick:['Kick','Kick'],own:['Własna platforma','Own platform'],tv:['Telewizja','Television']};
const platName=p=>PLATN[p][lang==='pl'?0:1];
function bigBanner(){
 const m=media();let h='<div class="card stack"><div class="row spread"><div><span class="px">'+t('sh.weekly')+'</span> <b>'+esc(platName(m.p))+'</b> <span class="tag">'+t('rate.'+PLAT[m.p].rate)+'</span></div><span class="mute" style="font-size:13px">'+t('sh.weeklyrev',{m:money(mediaRev())})+'</span></div>';
 if(isBig()){const bt=bigType(),pe=bigEst('ppv'),le=bigEst('ple');
  h+='<div class="note gold"><b>'+t('sh.bigweek',{n:esc(bigName())})+'</b></div><div class="grid g2"><label class="pick'+(bt==='ppv'?' win':'')+'" style="cursor:pointer"><div class="row" style="gap:8px"><input type="radio" name="bigt" data-chg="bigt" value="ppv"'+(bt==='ppv'?' checked':'')+'><b>PPV</b></div><div class="mute" style="font-size:13px">'+t('sh.ppvd',{m:money(pe.rev)})+'</div></label>'+
   '<label class="pick'+(bt==='ple'?' win':'')+'" style="cursor:pointer"><div class="row" style="gap:8px"><input type="radio" name="bigt" data-chg="bigt" value="ple"'+(bt==='ple'?' checked':'')+'><b>PLE</b></div><div class="mute" style="font-size:13px">'+(m.p==='tv'?t('sh.pled',{m:money(le.rev)}):t('sh.plenotv'))+'</div></label></div><div class="note">'+t('sh.bigmin')+'</div>'}
 else h+='<div class="mute" style="font-size:13px">'+t('sh.nextbig',{n:4-G.week%4})+'</div>';
 return h+'</div>'}
function promoOpts(sel,blank){return '<option value="">'+blank+'</option>'+bookable().sort((a,b)=>b.pop-a.pop).map(w=>'<option value="'+w.id+'"'+(w.id===sel?' selected':'')+'>'+(w.ext?'★ ['+catLabel(w)+'] ':w.fed!==G.fed.id?'['+esc((G.rivals.find(r=>r.id===w.fed)||{}).short||'?')+'] ':'')+esc(w.name)+(w.g==='f'?' ♀':'')+' · '+t('role.'+w.role).split(' ')[0]+' · '+t('st.mic')+' '+Math.round(w.mic)+esc(feudTag(w.id))+'</option>').join('')}
function promoHtml(p,i,pos,len){
 const n=G.card.length;let at='';for(let k=0;k<n;k++)at+='<option value="'+k+'"'+(Math.min(p.at,n)===k?' selected':'')+'>'+t(k===n-1&&n>1?'sh.beforeMain':'sh.before',{n:k+1})+'</option>';at+='<option value="'+n+'"'+(Math.min(p.at,n)===n?' selected':'')+'>'+t('sh.afterAll')+'</option>';
 const pf=p.a?promoFeud(p):null;
 return '<div class="slot"><div class="row spread"><div class="row" style="gap:6px"><span class="tag">#'+(pos+1)+'</span><b>'+t('sh.promo')+' '+(i+1)+'</b></div><div class="row" style="gap:4px">'+mvBtns(pos,len)+'<button class="btn sm danger" data-act="rmpromo" data-i="'+i+'">'+t('sh.remove')+'</button></div></div>'+
  '<div class="grid g2" style="gap:8px"><div><div class="px">'+t('sh.promoA')+'</div><select data-chg="pr" data-k="a" data-i="'+i+'">'+promoOpts(p.a,t('sh.pick'))+'</select>'+rolesLine(p.a)+'</div>'+
  '<div><div class="px">'+t('sh.promoB')+'</div><select data-chg="pr" data-k="b" data-i="'+i+'">'+promoOpts(p.b,t('sh.promoSolo'))+'</select>'+rolesLine(p.b)+'</div></div>'+
  (pf?'<div class="row"><span class="tag" style="color:var(--red);border-color:var(--red)">'+t('sh.feudheat',{n:Math.round(pf.f.heat)})+'</span></div>':'')+'</div>'}
function feudChips(){
 const fs=G.feuds.map((f,i)=>({f,i})).sort((x,y)=>y.f.heat-x.f.heat).slice(0,8);if(!fs.length)return '';
 return '<div class="card stack"><div class="px">'+t('sh.fromfeud')+'</div>'+fs.map(({f,i})=>'<div class="row spread" style="flex-wrap:wrap"><div style="min-width:0;overflow-wrap:anywhere"><b>'+esc(t('sc.'+f.sc))+'</b> <span class="mute" style="font-size:13px">'+esc(fLabel(f))+'</span> '+heatNum(f.heat)+'</div><div class="row"><button class="btn sm" data-act="fbook" data-i="'+i+'">'+t('sh.addmatch')+'</button><button class="btn sm" data-act="fpromo" data-i="'+i+'">'+t('sh.addpr')+'</button></div></div>').join('')+'</div>'}
function mvBtns(pos,len){return (pos>0?'<button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="-1" aria-label="'+t('sh.left')+'">◀</button>':'')+(pos<len-1?'<button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="1" aria-label="'+t('sh.right')+'">▶</button>':'')}
function slotHtml(m,i,pos,len){
 const n=MODES[m.mode],total=G.card.length,ffa=!!n.ffa,stp=STIPS[m.stip]||STIPS.none;
 let h='<div class="slot"><div class="row spread"><div class="row" style="gap:6px"><span class="tag">#'+(pos+1)+'</span><b>'+(i===total-1&&total>1?t('sh.main'):t('sh.match',{n:i+1}))+'</b></div><div class="row" style="gap:4px">'+mvBtns(pos,len)+'<button class="btn sm danger" data-act="rmslot" data-i="'+i+'">'+t('sh.remove')+'</button></div></div>';
 h+=poster(m);
 h+='<div class="grid g2" style="gap:8px"><div><div class="px">'+t('sh.mode')+'</div><select data-chg="mode" data-i="'+i+'">'+modeOpts(m.mode)+'</select></div>'+
  '<div><div class="px">'+t('sh.stip')+'</div><select data-chg="stip" data-i="'+i+'">'+Object.keys(STIPS).filter(k=>k!=='tourney'||m.stip==='tourney').map(k=>{const lock=G.fed.tier<STIPS[k].tier,pl=lvlOf(k)>maxLvl();return '<option value="'+k+'"'+(m.stip===k?' selected':'')+(lock||pl?' disabled':'')+'>'+t('stip.'+k)+(lock?' '+t('stip.lock',{v:t('tier.'+STIPS[k].tier)}):pl?' '+t('stip.plat'):'')+'</option>'}).join('')+'</select></div></div>';
 if(m.stip!=='none')h+='<div class="note">'+t('stipd.'+m.stip)+'</div>';
 if(ffa){h+='<div class="note">'+t('sh.ffa')+'</div><div class="stack">';
  const g=n.g||1;for(let ti=0;ti<n.a/g;ti++){let sl='';for(let j=0;j<g;j++)sl+=selHtml(m,i,'a',ti*g+j);
   h+='<div class="pick side-sel'+((m.fw||0)===ti?' win':'')+'">'+(g>1?'<div class="px">'+t('sh.teamn',{n:ti+1})+'</div>':'')+sl+'<label class="row" style="gap:6px;font-size:13px"><input type="radio" name="win'+i+'" data-chg="fw" data-i="'+i+'" data-v="'+ti+'"'+((m.fw||0)===ti?' checked':'')+'> '+t('sh.winner')+'</label></div>'}
  h+='</div>';
 }else{
  h+='<div class="vs">';
  ['a','b'].forEach((sd,si)=>{if(si===1)h+='<div class="mid">VS</div>';h+='<div class="pick side-sel'+(m.winner===sd?' win':'')+'">';
   for(let j=0;j<n[sd];j++)h+=selHtml(m,i,sd,j);
   h+='<label class="row" style="gap:6px;font-size:13px"><input type="radio" name="win'+i+'" data-chg="winner" data-i="'+i+'" data-v="'+sd+'"'+(m.winner===sd?' checked':'')+'> '+t('sh.winner')+'</label></div>'});
  h+='</div>';
 }
 const fins=ffa?['clean','dirty']:['clean','dirty','dq','count','draw'].filter(f=>!(stp.noDQ&&(f==='dq'||f==='count')));
 h+='<div class="grid g2" style="gap:8px"><div><div class="px">'+t('sh.finish')+'</div><select data-chg="finish" data-i="'+i+'">'+fins.map(f=>'<option value="'+f+'"'+(m.finish===f?' selected':'')+'>'+t('fin.'+f)+'</option>').join('')+'</select></div>'+
  '<div><div class="px">'+t('sh.titlefor')+'</div><select data-chg="mtitle" data-i="'+i+'"><option value="">'+t('sh.notitle')+'</option>'+G.titles.filter(tt=>titleOk(tt,m)).map(tt=>'<option value="'+tt.id+'"'+(m.title===tt.id?' selected':'')+'>'+esc(titleName(tt))+'</option>').join('')+'</select></div></div>';
 h+=prizeRow(m,i);
 if(matchReady(m)){const s=sides(m);const c=matchChem(s.A,s.B,ffa);const ck=c>=7?'chem.great':c>=4?'chem.ok':c<0?'chem.bad':'chem.none';const fo=feudOf(m);
  const tb=teamsOf(m).reduce((q,S)=>q+teamBonus(S),0);const tired=s.A.concat(s.B).filter(x=>W(x).fatigue>70).length;
  h+='<div class="row" style="gap:6px"><span class="tag">'+t(ck)+'</span>'+(ffa?'':'<span class="tag">'+t(alignKey(m))+'</span>')+(tb>=2?'<span class="tag">'+t('sh.team')+'</span>':'')+(tired?'<span class="tag inj">'+t('sh.tired',{n:tired})+'</span>':'')+(fo?'<span class="tag" style="color:var(--red);border-color:var(--red)">'+t('sh.feudheat',{n:Math.round(fo.f.heat)})+(fo.f.heat>=70&&fo.cov>=.99?' · '+t('sh.blow'):'')+'</span>':'')+'</div>';
 }
 return h+'</div>';
}
function vShow(){
 if(RUN)return '<div class="top"><h2>'+t('sh.title')+'</h2><button class="btn sm" data-act="fast">'+t('sh.skipanim')+'</button></div><div class="card"><div id="live" class="live"></div></div>';
 if(G.summary&&G.showResult)return vSummary();
 const ready=G.card.filter(matchReady).length;
 let h='<div class="top"><div><h2>'+t('sh.title')+'</h2><div class="mute" style="max-width:60ch">'+t('sh.sub')+'</div></div><div class="row"><button class="btn" data-act="auto">'+t('sh.auto')+'</button><button class="btn" data-act="clearcard">'+t('sh.clear')+'</button></div></div>';
 h+=bigBanner()+'<div class="px">'+t('sh.timeline')+'</div>';const TL=timeline();
 h+='<div class="tl">'+TL.map((x,pos)=>x.t==='m'?slotHtml(x.o,G.card.indexOf(x.o),pos,TL.length):promoHtml(x.o,G.promos.indexOf(x.o),pos,TL.length)).join('')+'</div>';
 h+='<div class="row">'+(G.card.length<6?'<button class="btn" data-act="addslot">'+t('sh.add')+'</button>':'')+(G.promos.length<4?'<button class="btn" data-act="addpromo">'+t('sh.addpromo')+'</button>':'')+'</div>';
 if(G.shmsg)h+='<div class="note neg">'+t(G.shmsg)+'</div>';
 h+=feudChips()+guestChips();
 h+='<div class="card row spread"><div>'+(ready<2?'<span class="mute">'+t('sh.need')+'</span>':'<span class="pos">'+ready+' '+pn(ready,['walka','walki','walk'],['match','matches'])+'</span>')+'</div><div class="row"><button class="btn" data-act="skipweek">'+t('sh.skipweek')+'</button><button class="btn gold" data-act="run"'+(ready<2?' disabled':'')+'>'+t('sh.run')+'</button></div></div><div class="mute" style="font-size:13px">'+t('sh.skipnote')+'</div>';
 return h;
}
function vSummary(){
 const s=G.summary;
 let h='<div class="top"><h2>'+t('sh.result')+'</h2><button class="btn gold" data-act="done">'+t('sh.continue')+'</button></div>';
 h+='<div class="grid g4"><div class="card kpi"><div class="px">'+t('sh.rating')+'</div><div class="v">'+f2(s.rating)+'</div>'+starsHtml(s.rating)+'</div>'+
  '<div class="card kpi"><div class="px">'+t('sh.att')+'</div><div class="v">'+num(s.att)+'</div><div class="s">/ '+num(s.cap)+(s.sold?' · '+t('sh.sold'):'')+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('sh.profit')+'</div><div class="v '+(s.profit>=0?'pos':'neg')+'">'+money(s.profit)+'</div><div class="s">'+money(s.rev)+' − '+money(s.cost)+'</div></div>'+
  '<div class="card kpi"><div class="px">'+t('sh.dpop')+'</div><div class="v '+(s.dpop>=0?'pos':'neg')+'">'+(s.dpop>=0?'+':'')+f1(s.dpop)+'</div></div></div>';
 h+=sumExtra(s)+(s.big?'<div class="card stack"><div class="row spread"><b>'+t('sh.bigres',{k:s.bt.toUpperCase()})+'</b><b class="pos">'+money(s.bt==='ppv'?s.ppv:s.ple)+'</b></div>'+(s.bt==='ppv'?'<div class="mute" style="font-size:13px">'+t('sh.buys',{n:num(s.buys)})+'</div>':'')+(s.thin?'<div class="note neg">'+t('sh.thin')+'</div>':'')+'</div>':'')+'<div class="card stack">'+s.out.map(o=>o.promo?'<div class="row spread"><div style="min-width:0"><b>'+esc(o.a)+'</b> <span class="tag">'+t('pr.type.'+o.ty)+'</span><div class="mute" style="font-size:13px">'+esc(o.line)+'</div></div>'+starsHtml(o.stars)+'</div>':'<div class="row spread"><div style="min-width:0"><b>'+esc(o.a)+'</b>'+(o.b?' <span class="mute">vs</span> <b>'+esc(o.b)+'</b>':'')+'<div class="mute" style="font-size:13px">'+esc(o.winner)+' · '+t('fin.'+o.finish)+(o.stip&&o.stip!=='none'?' · '+t('stip.'+o.stip):'')+(o.title?' · '+esc(o.title):'')+'</div></div>'+starsHtml(o.stars)+'</div>').join('')+'</div>';
 return h+'<div class="card stack"><h3>'+t('d.news')+'</h3>'+newsList(6)+'</div>';
}

/* ============ Views: feuds, stables, titles, money, world, settings ============ */
const avsHtml=ids=>'<div class="avs">'+ids.filter(i=>W(i)).map(i=>'<div class="av" title="'+esc(W(i).name)+'">'+avatar(W(i).look,44)+'</div>').join('')+'</div>';
const fmtSel=(d,k)=>{let o='';for(let n=2;n<=maxFmt(d.sc);n++)o+='<option value="'+n+'"'+((d.fmt||2)===n?' selected':'')+'>'+(n===2?t('f.fmt.std'):k.a===1?n+' '+pn(n,['strona konfliktu','strony konfliktu','stron konfliktu'],['side of the conflict','sides of the conflict'])+' – '+(lang==='pl'?'każdy na każdego':'free-for-all'):t('f.fmtT',{n:n,g:k.a}))+'</option>';return '<div><label class="px">'+t('f.format')+'</label><select class="field" data-chg="fd" data-k="fmt">'+o+'</select></div>'};
function feudHist(f){
 const sp=SC[f.sc]||{s:0};const L=(f.log||[]).slice().reverse();const nm=L.filter(x=>x.k==='m').length,np=L.filter(x=>x.k==='p').length;
 let h='<div class="row spread"><h2 style="margin:0">'+esc(t('sc.'+f.sc))+'</h2><button class="btn sm" data-act="mclose">'+t('f.close')+'</button></div>'+
  '<div class="mute" style="font-size:14px">'+esc(fLabel(f))+'</div><div class="lbl"><span>'+t('f.live')+'</span>'+heatNum(f.heat)+'</div>'+bar(f.heat,'r')+
  '<div class="row" style="gap:8px"><span class="tag">'+t('f.hist.sum',{m:nm,p:np})+'</span></div><h3 style="margin:0">'+t('f.details')+'</h3>';
 if(!L.length)return h+'<div class="mute">'+t('f.hist.none')+'</div>';
 h+='<div class="stack" style="gap:8px">'+L.map(x=>{let body='',tag=t('f.hist.'+x.k);
  if(x.k==='m')body='<b>'+esc(x.vs)+'</b><div class="mute" style="font-size:13px">'+esc(x.w)+' · '+t('fin.'+x.fin)+(x.stip&&x.stip!=='none'?' · '+t('stip.'+x.stip):'')+(x.title?' · '+esc(x.title):'')+(x.blow?' · '+t('f.hist.blow'):'')+'</div>'+starsHtml(x.s);
  else if(x.k==='p')body='<b>'+t('pr.type.'+x.ty)+'</b><div class="mute" style="font-size:13px">'+esc(t('pr.'+x.ty+'.'+x.v,{a:x.a,b:x.b}))+'</div>'+starsHtml(x.s);
  else if(x.k==='e')body='<div class="mute" style="font-size:13px">'+esc(t(x.key,x.x))+'</div>';
  else body='<div class="mute" style="font-size:13px">'+t('f.hist.start')+'</div>';
  return '<div class="row" style="flex-wrap:nowrap;align-items:flex-start;gap:10px"><div style="min-width:64px"><span class="px">'+t('f.hist.wk',{n:x.wk})+'</span><br><span class="tag">'+tag+'</span></div><div class="stack" style="gap:3px;min-width:0">'+body+'</div></div>'}).join('')+'</div>';
 return h}
function feudForm(){
 const d=G.fd||(G.fd=fdDefaults('betrayal'));const sp=SC[d.sc],k=kd(d.sc);const pool=genPool(d).sort((a,b)=>a.name.localeCompare(b.name));const full=mine().sort((a,b)=>a.name.localeCompare(b.name));
 const genSel='<div><label class="px">'+t('g.div')+'</label><select class="field" data-chg="fd" data-k="gen"><option value="m"'+(d.gen==='m'?' selected':'')+'>'+t('g.m')+'</option><option value="f"'+(d.gen==='f'?' selected':'')+'>'+t('g.f')+'</option><option value="x"'+(d.gen==='x'?' selected':'')+'>'+t('g.x')+'</option></select></div>';
 const wsel=(key,cur,list)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+(list||pool).map(w=>'<option value="'+w.id+'"'+(w.id===cur?' selected':'')+'>'+esc(w.name)+'</option>').join('')+'</select>';
 const ssel=(key,cur)=>'<select class="field" data-chg="fd" data-k="'+key+'"><option value="">—</option>'+G.stables.map(s=>'<option value="'+s.id+'"'+(s.id===cur?' selected':'')+'>'+esc(s.name)+' ('+s.members.length+')</option>').join('')+'</select>';
 let h='<div class="card stack"><h3>'+t('f.new')+'</h3><div><label class="px" for="fsc">'+t('f.scn')+'</label><select id="fsc" class="field" data-chg="fd" data-k="sc">'+
  SC_CATS.map(c=>'<optgroup label="'+esc(t('sc.cat'+c))+'">'+Object.keys(SC).filter(id=>SC[id].cat===c).sort((x,y)=>SC[y].s-SC[x].s).map(id=>'<option value="'+id+'"'+(d.sc===id?' selected':'')+'>'+esc(t('sc.'+id))+' · '+SC[id].s+'/100</option>').join('')+'</optgroup>').join('')+'</select></div>';
 h+='<div class="note">'+esc(t('sc.'+d.sc+'.d'))+'</div><div class="row" style="gap:8px"><span class="px">'+t('f.heatlvl')+'</span>'+heatNum(sp.s)+'</div>'+bar(sp.s,'r');
 if(sp.stip)h+='<div class="note">'+t('f.suggest',{s:t('stip.'+sp.stip)})+'</div>';
 ['retire','fire','fed','heel'].forEach(e=>{if(sp.end===e)h+='<div class="note'+(e==='retire'||e==='fire'?' neg':'')+'">'+t('f.warn.'+e)+'</div>'});
 if(k.st&&!G.stables.length)h+='<div class="note neg">'+t('f.nostables')+'</div>';
 else if(k.st===2)h+='<div class="grid g2"><div><div class="px">'+t('f.stableA')+'</div>'+ssel('stA',d.stA)+'</div><div><div class="px">'+t('f.stableB')+'</div>'+ssel('stB',d.stB)+'</div></div>';
 else if(k.st===1){const st=G.stables.find(s=>s.id===d.stA);const mem=st?st.members.map(W).filter(Boolean):[];
  let right='';
  if(k.extra)right='<div class="px">'+t('f.target')+'</div>'+wsel('B0',d.B[0],pool.filter(w=>!stableOf(w.id)));
  else if(k.member)right='<div class="px">'+t('f.member')+'</div>'+wsel('mem',d.mem,mem);
  else right='<div class="px">'+t('f.memberA')+'</div>'+wsel('A0',d.A[0],mem)+'<div class="px">'+t('f.memberB')+'</div>'+wsel('B0',d.B[0],mem);
  h+='<div class="grid g2"><div><div class="px">'+t('f.stable')+'</div>'+ssel('stA',d.stA)+'</div><div class="stack">'+right+'</div></div>'}
 else if(k.title){const tts=G.titles.filter(x=>x.holders.length===x.teams);const tt=titleOf(d.titleId);
  if(!tts.length)h+='<div class="note neg">'+t('f.notitle')+'</div>';
  else{let ch='';for(let i=0;i<(tt?tt.teams:1);i++)ch+=wsel('A'+i,d.A[i],full.filter(w=>!tt||(tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id]))));
   h+='<div class="grid g2"><div><div class="px">'+t('f.titlesel')+'</div><select class="field" data-chg="fd" data-k="titleId"><option value="">—</option>'+tts.map(x=>'<option value="'+x.id+'"'+(x.id===d.titleId?' selected':'')+'>'+esc(titleName(x))+'</option>').join('')+'</select>'+(tt?'<div class="note">'+esc(names(tt.holders))+'</div>':'')+'</div><div class="stack"><div class="px">'+(tt&&tt.teams===2?t('f.challengers'):t('f.challenger'))+'</div>'+ch+'</div></div>'}}
 else if(k.fed){h+=genSel;const rvs=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id));let mine2='';for(let i=0;i<sp.n;i++)mine2+=wsel('A'+i,d.A[i]);
  const rvw=d.fedId?topOf(d.fedId,sp.n,isF(d.A[0])):[];
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.rivalfed')+'</div><select class="field" data-chg="fd" data-k="fedId"><option value="">—</option>'+rvs.map(r=>'<option value="'+r.id+'"'+(r.id===d.fedId?' selected':'')+'>'+esc(r.name)+' ('+t('tier.'+r.tier)+')</option>').join('')+'</select><div class="px">'+t('f.theirs')+'</div>'+avsHtml(rvw)+'<div class="note">'+esc(names(rvw))+'</div></div><div class="stack"><div class="px">'+t('f.yours')+'</div>'+mine2+'</div></div><div class="note">'+t('f.guest')+'</div>'}
 else if(d.fmt>2&&multiOK(d.sc)){let c='';const g=k.a;for(let ti=0;ti<d.fmt;ti++){let s2='';for(let j=0;j<g;j++)s2+=wsel('A'+(ti*g+j),d.A[ti*g+j]);c+='<div class="stack"><div class="px">'+t('sh.teamn',{n:ti+1})+'</div>'+s2+'</div>'}
  h+=genSel+fmtSel(d,k)+'<div class="grid g2">'+c+'</div>'}
 else{let a='',b='';for(let i=0;i<k.a;i++)a+=wsel('A'+i,d.A[i]);for(let i=0;i<k.b;i++)b+=wsel('B'+i,d.B[i]);
  h+=genSel;if(multiOK(d.sc))h+=fmtSel(d,k);
  h+='<div class="grid g2"><div class="stack"><div class="px">'+t('f.sideA')+'</div>'+a+'</div><div class="stack"><div class="px">'+t('f.sideB')+'</div>'+b+'</div></div>'}
 if(G.fdmsg)h+='<div class="note neg">'+t(G.fdmsg)+'</div>';
 return h+'<div><button class="btn gold" data-act="newfeud">'+t('f.create')+'</button></div></div>';
}
function vFeuds(){
 let h='<div class="top"><div><h2>'+t('f.title')+'</h2><div class="mute" style="max-width:66ch">'+t('f.hint')+'</div></div></div>';
 if(!G.feuds.length)h+='<div class="card mute">'+t('f.none')+'</div>';
 h+='<div class="grid g2">'+G.feuds.map((f,i)=>{const sp=SC[f.sc];if(!sp)return '';const ch=f.heat>=70?2:f.heat>=35?1:0;const md=feudMode(f);const rv=f.fedId?G.rivals.find(r=>r.id===f.fedId):null;
  return '<div class="card stack" style="cursor:pointer" data-act="feuddet" data-i="'+i+'"><div class="row spread"><b>'+esc(t('sc.'+f.sc))+'</b><span class="tag">'+t('f.ch'+ch)+'</span></div>'+
   '<div class="mute" style="font-size:14px">'+esc(t('sc.'+f.sc+'.d'))+'</div>'+
   (f.mw?'<div class="stack" style="gap:6px">'+mwTeams(f).map((S,ti)=>(ti?'<span class="px" style="text-align:center">VS</span>':'')+'<div class="stack" style="gap:4px"><b style="overflow-wrap:anywhere">'+esc(names(S))+'</b>'+avsHtml(S)+'</div>').join('')+'</div>':'<div class="row spread" style="flex-wrap:nowrap;align-items:flex-start"><div class="stack" style="gap:4px;min-width:0"><b style="overflow-wrap:anywhere">'+esc(sideLabel(f.A,f.stA))+'</b>'+avsHtml(f.A)+'</div><span class="px">VS</span><div class="stack" style="gap:4px;min-width:0;text-align:right"><b style="overflow-wrap:anywhere">'+esc(rv?rv.name+': '+names(f.B):sideLabel(f.B,f.stB))+'</b>'+avsHtml(f.B)+'</div></div>')+
   '<div><div class="lbl"><span>'+t('f.live')+'</span>'+heatNum(f.heat)+'</div>'+bar(f.heat,'r')+'</div>'+
   '<div class="lbl"><span>'+t('f.heatlvl')+'</span>'+heatNum(sp.s)+'</div>'+
   (sp.stip?'<div class="note">'+t('f.suggest',{s:t('stip.'+sp.stip)})+'</div>':'')+(f.fav?'<div class="note gold">'+t('f.fav',{s:t('stip.'+f.fav)})+'</div>':'')+((f.chp||f.stake&&f.stake!=='none')?'<div class="note">'+(f.chp?t('fb.chn',{n:f.chp}):'')+(f.stake&&f.stake!=='none'?' · '+t('fb.st.'+f.stake):'')+'</div>':'')+
   (D['sc.'+f.sc+'.e']?'<div class="note">'+t('sc.'+f.sc+'.e')+'</div>':'')+
   ['retire','fire'].map(e=>sp.end===e?'<div class="note neg">'+t('f.warn.'+e)+'</div>':'').join('')+
   (f.heat>=70&&md?'<div class="note gold">'+t('f.fullmatch',{n:f.A.length+f.B.length,m:modeLabel(md)})+'</div>':'')+
   '<div class="row"><button class="btn sm" data-act="feuddet" data-i="'+i+'">'+t('f.details')+'</button><button class="btn sm danger" data-act="endfeud" data-i="'+i+'">'+t('f.end')+'</button></div></div>'}).join('')+'</div>';
 return h+feudForm();
}
function vStables(){
 const free=mine().filter(w=>!stableOf(w.id));
 let h='<div class="top"><div><h2>'+t('stb.title')+'</h2><div class="mute" style="max-width:66ch">'+t('stb.hint')+'</div></div></div>';
 if(!G.stables.length)h+='<div class="card mute">'+t('stb.none')+'</div>';
 h+='<div class="grid g2">'+G.stables.map(s=>{const ms=s.members.map(W).filter(Boolean);
  return '<div class="card stack"><div class="row spread"><div class="wname" style="font-size:19px">'+esc(s.name)+'</div><span class="tag">'+t('stb.pop',{n:Math.round(avg(ms.map(w=>w.pop)))})+'</span></div>'+
   ms.map(w=>'<div class="row spread" style="flex-wrap:nowrap">'+wMini(w,t('role.'+w.role).split(' ')[0]+' · '+t('style.'+w.style))+'<button class="btn sm" data-act="strem" data-id="'+w.id+'">'+t('stb.remove')+'</button></div>').join('')+
   (free.length?'<div class="row"><select id="stadd-'+s.id+'" class="field" style="width:auto;max-width:100%">'+free.map(w=>'<option value="'+w.id+'">'+esc(w.name)+'</option>').join('')+'</select><button class="btn sm" data-act="stadd" data-id="'+s.id+'">'+t('stb.addmember')+'</button></div>':'')+
   '<div><button class="btn sm danger" data-act="stdisband" data-id="'+s.id+'">'+t('stb.disband')+'</button></div></div>'}).join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('stb.create')+'</h3><div><label class="px" for="stname">'+t('stb.name')+'</label><input id="stname" class="field" maxlength="24"></div><div class="px">'+t('stb.members')+'</div><div class="chk">'+
  mine().map(w=>'<label class="row" style="gap:6px;flex-wrap:nowrap"><input type="checkbox" name="smem" value="'+w.id+'"'+(stableOf(w.id)?' disabled':'')+'> <span style="min-width:0;overflow-wrap:anywhere">'+esc(w.name)+'</span> <span class="tag '+w.role+'">'+t('role.'+w.role).split(' ')[0]+'</span></label>').join('')+'</div>'+
  (G.stmsg?'<div class="note neg">'+t('stb.need')+'</div>':'')+'<div><button class="btn gold" data-act="stcreate">'+t('stb.create')+'</button></div></div>';
 return h;
}
function vTitles(){
 let h='<div class="top"><h2>'+t('t.title')+'</h2></div><div class="grid g2">';
 G.titles.forEach(tt=>{h+='<div class="card stack"><div class="beltbox">'+belt(tt,230)+'</div><div class="row spread"><div class="wname" style="font-size:19px;color:var(--gold)">'+esc(titleName(tt))+'</div><span class="tag">'+t('g.'+(tt.g||'m'))+' · '+t('t.kind'+tt.teams)+' · '+t('t.prestige')+' '+pr1(tt)+prTrend(tt)+'</span></div><div class="px">'+t('t.holder')+'</div>'+holdersHtml(tt)+(tt.holders.length?'<div class="note">'+t('t.since',{w:tt.since})+'</div>':'')+(tt.custom?'<div><button class="btn sm danger" data-act="tddelete" data-id="'+tt.id+'">'+t('t.delete')+'</button></div>':'')+'</div>'});
 h+='</div>';
 h+=tdCreator();
 h+='<div class="card stack"><h3>'+t('t.hist')+'</h3>'+(G.reigns.length?'<div class="scroll"><table><tbody>'+G.reigns.slice(0,14).map(r=>'<tr><td class="mute">W'+r.week+'</td><td>'+esc(r.name)+'</td><td>'+esc(names(r.w))+'</td></tr>').join('')+'</tbody></table></div>':'<div class="mute">'+t('t.nohist')+'</div>')+'</div>';
 return h;
}
function mediaCard(){
 const m=media(),T=tdNow(),f=G.fed;let h='<div class="card stack"><h3>'+t('md.title')+'</h3><div class="mute" style="font-size:14px">'+t('md.intro')+'</div>';
 h+='<div class="row spread"><div><b>'+esc(platName(m.p))+'</b> <span class="tag">'+t('rate.'+PLAT[m.p].rate)+'</span></div><b class="pos">'+t('md.perweek',{m:money(mediaRev())})+'</b></div>';
 if(m.p==='tv'){const left=Math.max(0,m.exp-G.week);h+='<div class="note">'+t('md.tvon',{n:left,m:money(m.fee*5)})+'</div><div><button class="btn sm danger" data-act="tvcancel"'+(f.cash<m.fee*5?' disabled':'')+'>'+t('md.cancel')+'</button></div>'}
 else{
  const ok=f.tier>=2&&f.pop>=TVPOP[f.tier-1];
  h+='<div class="card stack" style="background:var(--panel2)"><b>'+t('md.tvoffer')+'</b>'+(f.tier<2?'<div class="mute">'+t('md.tvtier')+'</div>':ok?'<div class="mute">'+t('md.tvd',{m:money(tvFee()),w:TVWEEKS})+'</div><div><button class="btn gold sm" data-act="tvsign">'+t('md.sign')+'</button></div>':'<div class="mute">'+t('md.tvpop',{p:TVPOP[f.tier-1]})+'</div>')+'</div>';
  h+='<div class="grid g2">'+['yt','twitch','kick','own'].map(p=>{const P=PLAT[p],cur=m.p===p,cd=!cur&&m.chg>0&&G.week-m.chg<PLATCD;const need=p==='own'&&!G.ownPaid?Math.round(T.prod*P.setup):0;const blocked=cur||cd||(p==='own'&&(f.tier<2||f.cash<need));
   return '<div class="card stack'+(cur?' pick win':'')+'"><div class="row spread"><b>'+platName(p)+'</b><span class="tag">'+t('rate.'+P.rate)+'</span></div><div class="mute" style="font-size:13px">'+t('md.'+p)+'</div><div class="row spread"><span class="mute" style="font-size:13px">'+t('md.est')+'</span><b>'+money(platRev(p))+'</b></div>'+(need?'<div class="note">'+t('md.setup',{m:money(need)})+'</div>':'')+(cd?'<div class="note">'+t('md.cd',{n:PLATCD-(G.week-m.chg)})+'</div>':'')+'<div><button class="btn sm" data-act="mset" data-p="'+p+'"'+(blocked?' disabled':'')+'>'+(cur?t('md.current'):t('md.choose'))+'</button></div></div>'}).join('')+'</div>'}
 return h+'<div class="note">'+t('md.ppvle')+'</div></div>'}
function vMoney(){
 const f=G.fed,T=tdNow(),last=G.hist[G.hist.length-1];
 let h='<div class="top"><h2>'+t('m.title')+'</h2></div>';
 h+='<div class="grid g3"><div class="card kpi"><div class="px">'+t('d.cash')+'</div><div class="v '+(f.cash<0?'neg':'')+'">'+money(f.cash)+'</div></div><div class="card kpi"><div class="px">'+t('m.income')+'</div><div class="v pos">'+(last?money(last.rev):'—')+'</div></div><div class="card kpi"><div class="px">'+t('m.costs')+'</div><div class="v neg">'+(last?money(last.cost):'—')+'</div></div></div>';
 if(last)h+='<div class="card"><div class="grid g2"><div class="stack"><div class="row spread"><span>'+t('m.gate')+'</span><b>'+money(last.gate)+'</b></div><div class="row spread"><span>'+t('m.merch')+'</span><b>'+money(last.merch)+'</b></div><div class="row spread"><span>'+t('m.tv')+'</span><b>'+money(last.tv)+'</b></div>'+(last.ppv?'<div class="row spread"><span>PPV</span><b>'+money(last.ppv)+'</b></div>':'')+(last.ple?'<div class="row spread"><span>PLE</span><b>'+money(last.ple)+'</b></div>':'')+'<div class="row spread"><span>'+t('m.spons')+'</span><b>'+money(last.spons)+'</b></div></div><div class="stack"><div class="row spread"><span>'+t('m.sal')+'</span><b>'+money(last.sal)+'</b></div><div class="row spread"><span>'+t('m.prod')+' ('+t('sh.stipcost')+')</span><b>'+money(last.prod)+'</b></div></div></div></div>';
 h+=mediaCard();
 h+='<div class="card stack"><h3>'+t('m.hist')+'</h3>'+histChart()+'</div>';
 const rows=[70,85,100,115,130,150].map(p=>{const e=econAt(p,false);return{p,e,rev:e.gate+e.merch}});const best=rows.reduce((a,b)=>b.rev>a.rev?b:a).p;
 h+='<div class="grid g2"><div class="card stack"><label for="price">'+t('m.price',{n:G.price})+'</label><input id="price" type="range" min="60" max="160" step="5" value="'+G.price+'" data-chg="price"><div class="note">'+t('m.pricehelp')+'</div></div>';
 h+='<div class="card stack"><h3>'+t('m.estimate')+'</h3><div class="scroll"><table><thead><tr><th>'+t('m.estp')+'</th><th>'+t('m.esta')+'</th><th>'+t('m.estr')+'</th><th></th></tr></thead><tbody>'+rows.map(r=>'<tr'+(r.p===G.price?' style="background:var(--panel2)"':'')+'><td>'+r.p+'%</td><td>'+num(r.e.att)+' / '+num(T.cap)+'</td><td>'+money(r.rev)+'</td><td class="gold">'+(r.p===best?t('m.best'):'')+(r.e.sold?' · '+t('sh.sold'):'')+'</td></tr>').join('')+'</tbody></table></div></div></div>';
 h+='<div class="card stack">';
 if(f.tier<5){const nt=f.tier+1,ok=f.pop>=TPOP[f.tier]&&f.cash>=UPG[f.tier];
  h+='<h3>'+t('m.upgrade',{v:t('venue.'+nt)})+'</h3><div class="mute">'+t('d.cap',{n:num(TD[nt-1].cap)})+'</div><div class="mute">'+t('m.upneed',{p:TPOP[f.tier],c:money(UPG[f.tier])})+'</div><div><button class="btn gold" data-act="upgrade"'+(ok?'':' disabled')+'>'+t('m.upgrade',{v:t('venue.'+nt)})+'</button></div>'}
 else h+='<h3>'+t('venue.5')+'</h3><div class="mute">'+t('m.maxed')+'</div>';
 return h+'</div>';
}
function vWorld(){
 const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 let h='<div class="top"><h2>'+t('w.title')+'</h2></div><div class="card stack"><h3>'+t('w.feds')+'</h3><div class="row"><label class="px" for="wso">'+t('r.sort')+'</label><select id="wso" class="field" style="width:auto" data-chg="wsort">'+[['pop','r.sortpop'],['ct','ui.sCt'],['cn','ui.sCn'],['tier','ui.sTier'],['name','r.sortname']].map(o=>'<option value="'+o[0]+'"'+((G.wsort||'pop')===o[0]?' selected':'')+'>'+t(o[1])+'</option>').join('')+'</select></div><div class="scroll"><table><tbody>'+wFeds().map((f,i)=>'<tr><td class="mute">'+(i+1)+'</td><td><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name)+(f.id===G.fed.id?' <span class="tag">'+t('nav.dash')+'</span>':'')+'</td><td>'+cn(f.country)+'</td><td>'+t('tier.'+f.tier)+'</td><td><div style="min-width:90px">'+bar(f.pop,f.id===G.fed.id?'':'b')+'</div></td><td>'+Math.round(f.pop)+'</td></tr>').join('')+'</tbody></table></div></div>';
 return h+prosView();
}
function vFa(){const full=mine().length>=ROSTERMAX[G.fed.tier-1];return '<div class="top"><h2>'+t('nav.fa')+'</h2></div>'+marketView(full)}
function vSettings(){
 let h='<div class="top"><h2>'+t('s.title')+'</h2></div><div class="card stack"><b>'+t('s.lang')+'</b>'+langSwitch()+'</div>';
 h+='<div class="card stack"><h3>'+t('s.pack')+'</h3><div class="mute" style="max-width:70ch">'+t('s.packd')+'</div><label class="px" for="packout">'+t('s.export')+'</label><textarea id="packout" readonly>'+esc(packText())+'</textarea><div class="row"><button class="btn sm" data-act="copypack">'+t('s.copy')+'</button></div>'+
  '<label class="px" for="packin">'+t('s.import')+'</label><textarea id="packin"></textarea><div class="row"><input type="file" id="packfile" accept=".json,application/json" data-chg="packfile"><button class="btn gold" data-act="loadpack">'+t('s.load')+'</button><button class="btn" data-act="resetpack">'+t('s.reset')+'</button></div><div id="packmsg" class="mute"></div></div>';
 return h+'<div class="card stack"><b>'+t('s.new')+'</b>'+(G.confirmNew?'<div><button class="btn danger" data-act="newgame2">'+t('s.confirm')+'</button></div>':'<div><button class="btn danger" data-act="newgame">'+t('s.new')+'</button></div>')+'<div class="mute" style="font-size:13px">'+t('s.about')+'</div></div>';
}
function render(){
 if(!hasDoc)return;const app=document.getElementById('app');
 if(!G){app.innerHTML=viewStart();return}
 const V={dash:vDash,roster:vRoster,staff:vStaff,show:vShow,feuds:vFeuds,stables:vStables,titles:vTitles,prizes:vPrizes,cal:vCal,rank:vRank,money:vMoney,world:vWorld,tw:vTw,ppv:vPpv,cup:vCup,inbox:vInbox,board:vBoard,infra:vInfra,hof:vHof,fa:vFa,settings:vSettings};
 app.innerHTML=shell(V[G.screen]());
}

/* ============ Events ============ */
function applyPack(txt){
 const msg=document.getElementById('packmsg');
 try{const p=JSON.parse(txt);if(!validPack(p)){msg.textContent=t('s.bad');return}
  PACK=p;try{localStorage.setItem(LS_PACK,JSON.stringify(p))}catch(x){}G=null;render()}catch(e){if(msg)msg.textContent=t('s.bad')}
}
const ACT={
 lang(e){lang=e.dataset.v;try{localStorage.setItem(LS_LANG,lang)}catch(x){}render()},
 nav(e){if(RUN)return;G.screen=e.dataset.v;G.showResult=false;render()},
 continue(){G=loadSave();ensureExtras();render()},
 start(e){newGame(e.dataset.v);render()},
 custom(){newGame(null,{name:document.getElementById('cname').value,country:document.getElementById('ccountry').value});render()},
 rmslot(e){G.card.splice(+e.dataset.i,1);render()},
 addslot(){G.card.push(emptyMatch());render()},
 auto(){autoBook();render()},
 feuddet(e){const f=G.feuds[+e.dataset.i];if(!f)return;openModal(feudHist(f))},
 mclose(){closeModal()},
 fbook(e){const f=G.feuds[+e.dataset.i];if(!f)return;const m=buildFeudMatch(f);if(!m||G.card.length>=6){G.shmsg='sh.feudbusy';render();return}G.shmsg='';G.card.splice(Math.max(0,G.card.length-(G.card.length?1:0)),0,m);render()},
 fpromo(e){const f=G.feuds[+e.dataset.i];if(!f)return;if(G.promos.length>=4){G.shmsg='sh.promoMax';render();return}const ids=f.mw?f.A:[f.A[0],f.B[0]];G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:ids[0]||'',b:ids[1]||'',at:Math.max(0,G.card.length-1)});render()},
 addpromo(){if(G.promos.length>=4){G.shmsg='sh.promoMax';render();return}G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:'',b:'',at:Math.max(0,G.card.length-1)});render()},
 tmove(e){const L=timeline(),p=+e.dataset.p,d=+e.dataset.d,q=p+d;if(q<0||q>=L.length)return;const x=L[p];L[p]=L[q];L[q]=x;applyTL(L);render()},
 mset(e){const p=e.dataset.p,m=media();if(m.p==='tv')return;if(G.week-(m.chg||-99)<PLATCD&&m.p!==p&&m.chg>0)return;const P=PLAT[p];if(p==='own'){if(G.fed.tier<2)return;if(!G.ownPaid){const c=Math.round(tdNow().prod*P.setup);if(G.fed.cash<c)return;G.fed.cash-=c;G.ownPaid=1}}setPlatform(p);addNews('n.plat',{p:platName(p)});save();render()},
 tvsign(){const m=media(),T=tdNow();if(m.p==='tv'||G.fed.tier<2||G.fed.pop<TVPOP[G.fed.tier-1])return;G.media={k:'tv',p:'tv',fee:tvFee(),exp:G.week+TVWEEKS,last:m.last||'yt',chg:G.week};addNews('n.tvsign',{m:money(G.media.fee)});G.card.forEach(fixMatch);save();render()},
 tvcancel(){const m=media();if(m.p!=='tv')return;const c=m.fee*5;if(G.fed.cash<c)return;G.fed.cash-=c;G.media={k:'stream',p:m.last||'yt',chg:G.week,last:m.last||'yt'};addNews('n.tvcancel');G.card.forEach(fixMatch);save();render()},
 rmpromo(e){G.promos.splice(+e.dataset.i,1);render()},
 clearcard(){G.card=[];G.promos=[];render()},
 skipweek(){skipWeek()},
 run(){const r=G.card.filter(matchReady);if(r.length<2||RUN)return;RUN={fast:false,started:false};G.showResult=false;render();runShow()},
 fast(){if(RUN)RUN.fast=true},
 done(){G.showResult=false;G.screen='dash';render()},
 evopt(e){if(window.__evResolve)window.__evResolve(+e.dataset.i)},
 gameover(){closeModal();try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;render()},
 renew(e){const w=W(e.dataset.id);const c=w.salary*10;if(G.fed.cash>=c){G.fed.cash-=c;w.contract=52;addNews('n.resign',{w:w.name});save();render()}},
 release(e){releaseW(W(e.dataset.id));save();render()},
 avedit(e){openModal(avEditor(e.dataset.id))},
 avclose(){closeModal();save();render()},
 avrand(e){const w=W(e.dataset.id);w.look=randLook(Math.random,w.country,w.g==='f');document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 look(e){const w=W(e.dataset.id),k=e.dataset.k;w.look[k]=(k==='skin'||k==='hairC'||k==='outC'||k==='maskC'||k==='o2'||k==='beardC')?+e.dataset.v:e.dataset.v;document.getElementById('modal').firstChild.innerHTML=avEditor(e.dataset.id)},
 newfeud(){
  const d=G.fd,r=fdSides(d);G.fdmsg='';
  if(!r)G.fdmsg=kd(d.sc).st?'f.nostables':'f.invalid';
  else if(r.err)G.fdmsg=r.err;
  else{const f={id:'f'+(G.uid++),sc:d.sc,A:r.A,B:r.B,stA:r.stA,stB:r.stB,stR:r.stR,titleId:r.titleId,fedId:r.fedId,mw:r.mw,g:r.g,heat:SC[d.sc].h*3,matches:0,used:false};
   if(!feudMode(f))G.fdmsg='f.nomode';
   else if(G.feuds.some(x=>x.sc===f.sc&&!!x.mw===!!f.mw&&x.A.length===f.A.length&&x.B.length===f.B.length&&inter(x.A,f.A).length===f.A.length&&inter(x.B,f.B).length===f.B.length))G.fdmsg='f.dup';
   else{flog(f,{k:'s'});G.feuds.push(f);if(f.mw)addNews('n.feudstart.mw',{a:fLabel(f)});else addNews('n.feudstart',{a:sideLabel(f.A,f.stA),b:f.fedId?names(f.B):sideLabel(f.B,f.stB)});G.fd=fdDefaults(d.sc)}}
  save();render()},
 endfeud(e){G.feuds.splice(+e.dataset.i,1);save();render()},
 upgrade(){const f=G.fed;if(f.tier<5&&f.pop>=TPOP[f.tier]&&f.cash>=UPG[f.tier]){f.cash-=UPG[f.tier];f.tier++;mine().forEach(w=>{w.salary=Math.max(w.salary,salaryOf(w,f.tier))});addNews('n.tier',{v:t('venue.'+f.tier)});save();render()}},
 sign(e){const w=W(e.dataset.id);const fee=salaryOf(w,G.fed.tier)*8;if(mine().length>=ROSTERMAX[G.fed.tier-1]||G.fed.cash<fee)return;
  G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=52;w.acc=accStart(w.country,G.fed.country);w.morale=70;w.fatigue=0;addNews('n.sign',{w:w.name});save();render()},
 copypack(){const ta=document.getElementById('packout');ta.select();try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(x){}},
 loadpack(){applyPack(document.getElementById('packin').value)},
 resetpack(){PACK=buildPack();try{localStorage.removeItem(LS_PACK)}catch(x){}G=null;render()},
 newgame(){G.confirmNew=true;render()},
 newgame2(){try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;render()},
 stcreate(){
  const nm=(document.getElementById('stname').value||'').trim().slice(0,24);const ids=[].slice.call(document.querySelectorAll('input[name=smem]:checked')).map(x=>x.value);
  if(!nm||ids.length<2){G.stmsg=1;render();return}
  G.stmsg=0;G.stables.push({id:'s'+(G.uid++),name:nm,members:ids});ids.forEach(i=>{W(i).morale=clamp(W(i).morale+3,0,100)});addNews('n.stnew',{s:nm});save();render()},
 stadd(e){const st=G.stables.find(s=>s.id===e.dataset.id),sel=document.getElementById('stadd-'+e.dataset.id);if(!st||!sel||!sel.value||stableOf(sel.value))return;st.members.push(sel.value);save();render()},
 strem(e){removeFromStable(e.dataset.id);cleanFeuds();save();render()},
 stdisband(e){const st=G.stables.find(s=>s.id===e.dataset.id);if(st){G.stables=G.stables.filter(s=>s!==st);addNews('n.stdisband',{s:st.name});cleanFeuds()}save();render()},
 tdset(e){const d=tdraft();d[e.dataset.k]=e.dataset.v;render()},
 tdcreate(){const d=tdraft();const nm=(document.getElementById('tdname').value||d.name||'').trim().slice(0,30)||t('t.defaultname',{n:G.titles.length+1});
  G.titles.push({id:'T'+(G.uid++),kind:'custom',name:nm,prestige:d.prestige,teams:d.teams,strap:d.strap,plate:d.plate,g:d.g||'m',holders:[],since:G.week,custom:true});G.td=null;save();render()},
 tddelete(e){G.titles=G.titles.filter(x=>x.id!==e.dataset.id);G.card.forEach(m=>{if(m.title===e.dataset.id)m.title=''});save();render()}
};
const CHG={
 sf(e){START_F=e.value;render()},
 sort(e){G.sort=e.value;render()},
 rgen(e){G.rgen=e.value;render()},
 bigt(e){G.bigType=e.value;render()},
 pr(e){const p=G.promos[+e.dataset.i];if(!p)return;const k=e.dataset.k;p[k]=k==='at'?+e.value:e.value;if(p.a&&p.a===p.b)p.b='';render()},
 slot(e){const m=G.card[+e.dataset.i];m[e.dataset.side][+e.dataset.j]=e.value;fixMatch(m);render()},
 winner(e){G.card[+e.dataset.i].winner=e.dataset.v;render()},
 fw(e){G.card[+e.dataset.i].fw=+e.dataset.v;render()},
 mode(e){const m=G.card[+e.dataset.i];m.mode=e.value;fixMatch(m);render()},
 stip(e){const m=G.card[+e.dataset.i];m.stip=e.value;fixMatch(m);render()},
 finish(e){G.card[+e.dataset.i].finish=e.value;render()},
 mtitle(e){G.card[+e.dataset.i].title=e.value;render()},
 price(e){G.price=+e.value;const l=e.previousElementSibling;if(l)l.textContent=t('m.price',{n:G.price});save()},
 packfile(e){const f=e.files&&e.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{document.getElementById('packin').value=String(r.result)};r.readAsText(f)},
 tdname(e){tdraft().name=e.value},
 tdf(e){const d=tdraft();d[e.dataset.k]=+e.value;render()},
 fd(e){
  const k=e.dataset.k,d=G.fd;G.fdmsg='';
  if(k==='sc'){G.fd=fdDefaults(e.value)}
  else if(k==='stA'){d.stA=e.value;const st=G.stables.find(s=>s.id===e.value);const kk=kd(d.sc);
   if(kk.member)d.mem=st?st.members[st.members.length-1]:'';else if(kk.pair){d.A=[st?st.members[0]:''];d.B=[st?st.members[1]:'']}}
  else if(k==='stB')d.stB=e.value;
  else if(k==='mem')d.mem=e.value;
  else if(k==='fmt'){d.fmt=+e.value;fdFill(d)}
  else if(k==='gen'){d.gen=e.value;const kk=kd(d.sc);if(kk.fed){d.A=genPool(d).sort((a,b)=>b.pop-a.pop).slice(0,SC[d.sc].n).map(w=>w.id)}else fdFill(d)}
  else if(k==='titleId'){d.titleId=e.value;d.A=[]}
  else if(k==='fedId')d.fedId=e.value;
  else{const side=k.charAt(0),idx=+k.slice(1);d[side][idx]=e.value}
  render()}
};
function init(){
 loadPackLS();
 document.addEventListener('click',ev=>{const el=ev.target.closest('[data-act]');if(!el||el.disabled)return;const fn=ACT[el.dataset.act];if(fn)fn(el)});
 document.addEventListener('change',ev=>{const el=ev.target.closest('[data-chg]');if(!el)return;const fn=CHG[el.dataset.chg];if(fn){fn(el);if(G&&el.dataset.chg!=='packfile'&&el.dataset.chg!=='sf')save()}});
 render();
}


/* ============ Views: staff, guests, legends, retirement ============ */
const spcT=k=>t('spec.'+k);
function staffCard(s,mode){
 const fee=s.salary*4,full=staffFull(s.role);
 let b='';
 if(mode==='hired'){const rc=s.salary*6;
  b='<div class="row"><button class="btn sm" data-act="renewstaff" data-id="'+s.id+'"'+(G.fed.cash<rc?' disabled':'')+'>'+t('r.renew')+' ('+money(rc)+')</button><button class="btn sm danger" data-act="firestaff" data-id="'+s.id+'">'+t('r.release')+'</button>'+(s.role==='scout'?'<button class="btn sm" data-act="scoutreg" data-id="'+s.id+'">'+t('reg.chg')+'</button>':'')+'</div>'}
 else b='<div class="row"><button class="btn sm gold" data-act="hirestaff" data-id="'+s.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('stf.hire',{m:money(fee)})+'</button><span class="mute" style="font-size:12px">'+(full?t('stf.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>';
 return '<div class="card wcard"><div class="av">'+avatar(s.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(s.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(s.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag">'+t('sr.'+s.role)+'</span>'+(s.role==='coach'?'<span class="tag">'+spcT(s.spec)+'</span>':'')+(s.role==='scout'?'<span class="tag">'+t('reg.'+(s.reg||'eu'))+'</span>':'')+'<span class="tag">'+cn(s.country)+'</span>'+(s.legend?'<span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('lg.tag')+'</span>':'')+(s.temp?'<span class="tag">'+t('stf.temp')+'</span>':'')+'</div></div>'+
  stat(t('stf.lvl'),s.lvl,s.lvl>=70?'t':'')+'<div class="mute" style="font-size:13px">'+t('st.age',{n:s.age})+' · '+t('st.salary',{m:money(s.salary)})+(mode==='hired'?' · '+t('st.contract',{n:wks(Math.max(0,s.contract))}):'')+'</div>'+b+'</div></div>'}
function guestCard(g,mode){
 let b='';const cc=celebCost(g),cdis=G.fed.cash<cc||mine().length>=ROSTERMAX[G.fed.tier-1];
 if(mode==='hired'){b='<div class="row"><button class="btn sm gold" data-act="gpromo" data-id="'+g.id+'">'+t('gs.addpromo')+'</button><button class="btn sm danger" data-act="dropguest" data-id="'+g.id+'">'+t('gs.release')+'</button></div>'}
 else{const full=guestFull();b='<div class="row">'+[1,4,12].map(n=>{const p=guestFee(g,n);return '<button class="btn sm" data-act="hireguest" data-id="'+g.id+'" data-w="'+n+'"'+(full||G.fed.cash<p?' disabled':'')+'>'+t('gs.for'+n,{m:money(p)})+'</button>'}).join('')+'</div>'+(full?'<span class="mute" style="font-size:12px">'+t('gs.full')+'</span>':'')}
 b+='<div class="row"><button class="btn sm" data-act="celebsign" data-id="'+g.id+'"'+(cdis?' disabled':'')+'>'+t('gs.convert',{m:money(cc)})+'</button></div>';
 const x=g.film?t('gs.film',{f:g.film}):g.hit?t('gs.hit',{f:g.hit}):'';
 return '<div class="card wcard"><div class="av">'+avatar(g.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(g.name)+'</div><div class="row" style="gap:6px;margin-top:3px">'+(g.g==='f'?'<span class="tag" style="color:#c4358a;border-color:#c4358a">♀</span>':'')+'<span class="tag" style="color:var(--gold);border-color:var(--gold)">'+catLabel(g)+'</span><span class="tag">'+cn(g.country)+'</span></div></div>'+
  stat(t('gs.fame'),g.fame,'')+'<div class="sg">'+stat(t('st.mic'),g.mic,'b')+stat(t('st.cha'),g.cha,'t')+stat(t('st.ring'),g.ring,'')+'</div>'+(x?'<div class="mute" style="font-size:13px">'+esc(x)+'</div>':'')+
  (mode==='hired'?'<div class="mute" style="font-size:13px">'+t('st.contract',{n:wks(Math.max(0,g.contract))})+' · '+t('gs.apps',{n:g.apps||0})+(g.injury?' · '+t('r.inj',{n:g.injury}):'')+'</div>':'')+b+'</div></div>'}
function legendCard(w){
 return '<div class="card wcard"><div class="av">'+avatar(w.look,84)+'</div><div class="stack" style="gap:6px"><div><div class="wname">'+esc(w.name)+'</div><div class="row" style="gap:6px;margin-top:3px"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('lg.tag')+'</span><span class="tag">'+cn(w.country)+'</span><span class="tag">'+t('style.'+w.style)+'</span></div></div>'+
  '<div class="mute" style="font-size:13px">'+t('st.age',{n:w.age})+' · '+t('st.pop')+' '+Math.round(w.pop)+'</div>'+
  RETR.map(r=>{const l=clamp(staffFit(w,r)+(w.pop>=50?4:0),15,96),fee=staffSal(r,l,G.fed.tier)*4,dis=staffFull(r)||G.fed.cash<fee;
   return '<button class="btn sm" data-act="hirelegend" data-id="'+w.id+'" data-r="'+r+'"'+(dis?' disabled':'')+'>'+t('sr.'+r)+' · '+t('stf.lvl')+' '+l+' · '+money(fee)+'</button>'}).join('')+'</div></div>'}
function staffFxBox(){
 const f=sfx(),cf=coachFx(),cs=staffOf('coach'),tr=G.fed.tier-1;
 const cap=cs.reduce((s,c)=>s+3+Math.floor(c.lvl/25),0);
 const box=(h,b,s)=>'<div class="card kpi"><div class="px">'+h+'</div><div class="v" style="font-size:20px">'+b+'</div><div class="s">'+s+'</div></div>';
 return '<div class="grid g4">'+
  box(t('sr.coach'),staffOf('coach').length+' / '+SMAX.coach[tr],t('stf.fx.coach',{n:Math.min(cap,mine().length),p:Math.round(cf.p*100)}))+
  box(t('sr.ref'),staffOf('ref').length+' / '+SMAX.ref[tr],t('stf.fx.ref',{n:(f.ref>=0?'+':'')+f2(f.ref)}))+
  box(t('sr.comm'),staffOf('comm').length+' / '+SMAX.comm[tr],t('stf.fx.comm',{n:(f.comm>=0?'+':'')+f2(f.comm)}))+
  box(t('sr.ann'),staffOf('ann').length+' / '+SMAX.ann[tr],t('stf.fx.ann',{n:Math.round(f.ann*10)}))+
  box(t('sr.scout'),staffOf('scout').length+' / '+SMAX.scout[tr],t('stf.fx.scout',{n:Math.round(staffOf('scout').reduce((p,s)=>p*(1-(.05+.12*s.lvl/100)),1)*-100+100)}))+
  box(t('sr.doc'),staffOf('doc').length+' / '+SMAX.doc[tr],t('stf.fx.doc',{n:Math.round(docChance()*1000)/10}))+
  box(t('sr.phys'),staffOf('phys').length+' / '+SMAX.phys[tr],t('stf.fx.phys',{n:Math.round((1-physMul())*100)}))+'</div>'}
function vStaff(){
 const tab=G.stTab||'staff';
 let h='<div class="top"><div><h2>'+t('stf.title')+'</h2><div class="mute" style="max-width:64ch">'+t('stf.sub')+'</div></div><div class="row">'+['staff','guests','legends'].map(k=>'<button class="btn sm'+(tab===k?' gold':'')+'" data-act="sttab" data-v="'+k+'">'+t('stf.tab.'+k)+'</button>').join('')+'</div></div>';
 if(tab==='staff'){
  h+=staffFxBox();
  SROLES.forEach(r=>{
   const hired=staffOf(r),cand=(G.smarket||[]).filter(s=>s.role===r);
   h+='<h3>'+t('sr.'+r)+' · '+hired.length+' / '+SMAX[r][G.fed.tier-1]+'</h3><div class="mute" style="font-size:13px;max-width:70ch">'+t('stf.d.'+r)+'</div>';
   if(hired.length)h+='<div class="grid gW">'+hired.map(s=>staffCard(s,'hired')).join('')+'</div>';
   h+='<div class="px">'+t('stf.market')+'</div><div class="grid gW">'+cand.map(s=>staffCard(s,'cand')).join('')+'</div>'});
  return h}
 if(tab==='guests'){
  const hg=guestsHired();
  h+='<div class="card stack"><div class="mute" style="max-width:72ch">'+t('gs.sub')+'</div><div class="row"><span class="tag">'+t('gs.cap',{n:hg.length,m:GCAPS[G.fed.tier-1]})+'</span><span class="tag">'+t('gs.disc',{n:Math.round(celebDisc()*100)})+'</span></div><div class="mute" style="max-width:72ch;font-size:13px">'+t('gs.convd')+'</div></div>';
  h+='<h3>'+t('gs.hired')+'</h3>'+(hg.length?'<div class="grid gW">'+hg.map(g=>guestCard(g,'hired')).join('')+'</div>':'<p class="mute">'+t('gs.none')+'</p>');
  h+='<h3>'+t('gs.market')+'</h3><div class="mute" style="font-size:13px">'+t('gs.marketd')+'</div><div class="grid gW">'+(G.gmarket||[]).map(g=>guestCard(g,'cand')).join('')+'</div>';
  return h}
 const L=legends().sort((a,b)=>b.pop-a.pop);
 h+='<div class="card"><div class="mute" style="max-width:72ch">'+t('lg.sub')+'</div></div>';
 return h+(L.length?'<div class="grid gW">'+L.map(legendCard).join('')+'</div>':'<p class="mute">'+t('lg.none')+'</p>')}
function guestChips(){
 const hg=guestsHired().filter(g=>!g.injury);if(!hg.length)return '';
 return '<div class="card stack"><div class="px">'+t('gs.onshow')+'</div><div class="row">'+hg.map(g=>'<div class="row" style="gap:8px;flex-wrap:nowrap"><div class="av" style="min-width:36px;padding:2px">'+avatar(g.look,34)+'</div><div><b>'+esc(g.name)+'</b> <span class="tag">'+catLabel(g)+'</span></div><button class="btn sm" data-act="gpromo" data-id="'+g.id+'">'+t('gs.addpromo')+'</button></div>').join('')+'</div><div class="mute" style="font-size:13px">'+t('gs.hint')+'</div></div>'}
function sumExtra(s){
 const l=[];
 if(s.guests&&s.guests.length)l.push(t('sum.guests',{n:s.guests.join(', ')}));
 if(s.fwn)l.push(t('sum.farewell',{n:s.fwn}));
 const f=s.sfx;if(f&&(Math.abs(f.ref)>.005||Math.abs(f.comm)>.005||f.ann>.005))l.push(t('sum.staff',{c:f2(f.comm+f.ann*.08),r:f2(f.ref),a:Math.round(f.ann*10)}));
 return l.length?'<div class="card stack">'+l.map(x=>'<div class="mute">'+esc(x)+'</div>').join('')+'</div>':''}

/* ----- retirement modal ----- */
function retModal(){
 const r=G.ret,w=W(r.id);if(!w)return '';
 const fp=r.msg?'<p class="mute">'+esc(r.msg)+'</p>':'';
 if(r.counter){const c=r.counter;
  return '<h2>'+esc(w.name)+'</h2>'+fp+'<div class="stack"><button class="opt" data-act="retacc"><b>'+t('rt.acc')+'</b><small>'+t('rt.w'+c.weeks)+' · '+(c.role?t('sr.'+c.role):t('rt.norole'))+'</small></button><button class="opt" data-act="retrej"><b>'+t('rt.rej')+'</b></button></div>'}
 if(r.done)return '<h2>'+esc(w.name)+'</h2>'+fp+'<button class="btn gold" data-act="retclose">OK</button>';
 return '<h2>'+t('rt.title',{w:esc(w.name)})+'</h2><p class="mute">'+t('rt.intro',{p:Math.round(retireWill(w)*100)})+'</p>'+
  '<label class="px" for="retw">'+t('rt.when')+'</label><select id="retw" class="field" data-chg="retw">'+FW_OPTS.map(n=>'<option value="'+n+'"'+(r.weeks===n?' selected':'')+'>'+t('rt.w'+n)+'</option>').join('')+'</select>'+
  '<label class="px" for="retr">'+t('rt.role')+'</label><select id="retr" class="field" data-chg="retr"><option value="">'+t('rt.norole')+'</option>'+RETR.map(x=>'<option value="'+x+'"'+(r.role===x?' selected':'')+(staffFull(x)?' disabled':'')+'>'+t('sr.'+x)+' · '+t('stf.fit',{n:staffFit(w,x)})+(staffFull(x)?' · '+t('stf.full'):'')+'</option>').join('')+'</select>'+
  '<div class="row"><button class="btn gold" data-act="retsend">'+t('rt.send')+'</button><button class="btn" data-act="mclose">'+t('rt.cancel')+'</button></div>'}
const retRefresh=()=>{document.getElementById('modal').firstChild.innerHTML=retModal()};

Object.assign(ACT,{
 celebsign(e){const g=W(e.dataset.id)||(G.gmarket||[]).find(x=>x.id===e.dataset.id);if(!g||!g.ext||mine().length>=ROSTERMAX[G.fed.tier-1]||G.fed.cash<celebCost(g))return;celebSign(g);save();render()},
 sttab(e){G.stTab=e.dataset.v;render()},
 hirestaff(e){const s=(G.smarket||[]).find(x=>x.id===e.dataset.id);if(!s||staffFull(s.role))return;const fee=s.salary*4;if(G.fed.cash<fee)return;
  G.fed.cash-=fee;G.smarket=G.smarket.filter(x=>x!==s);G.staff.push(s);addNews('n.staffhire',{w:s.name,r:t('sr.'+s.role)});save();render()},
 firestaff(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;G.staff=G.staff.filter(x=>x!==s);addNews('n.stafffire',{w:s.name});save();render()},
 renewstaff(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;const c=s.salary*6;if(G.fed.cash<c)return;G.fed.cash-=c;s.contract=52;s.temp=false;save();render()},
 hirelegend(e){const w=W(e.dataset.id),r=e.dataset.r;if(!w||w.fed!=='RET'||w.staffed||staffFull(r))return;
  const l=clamp(staffFit(w,r)+(w.pop>=50?4:0),15,96),fee=staffSal(r,l,G.fed.tier)*4;if(G.fed.cash<fee)return;
  G.fed.cash-=fee;toStaff(w,r);addNews('n.staffhire',{w:w.name,r:t('sr.'+r)});save();render()},
 hireguest(e){const g=(G.gmarket||[]).find(x=>x.id===e.dataset.id),n=+e.dataset.w;if(!g||guestFull())return;const p=guestFee(g,n);if(G.fed.cash<p)return;hireGuest(g,n,p);save();render()},
 dropguest(e){const g=W(e.dataset.id);if(!g||!g.ext)return;dropGuest(g);addNews('n.guestend',{w:g.name});save();render()},
 gpromo(e){if(G.promos.length>=4){G.shmsg='sh.promoMax';G.screen='show';render();return}G.shmsg='';G.promos.push({id:'p'+(G.uid++),a:e.dataset.id,b:'',at:Math.max(0,G.card.length-1)});G.screen='show';save();render()},
 retire(e){const w=W(e.dataset.id);if(!w)return;G.ret={id:w.id,weeks:4,role:'',msg:'',counter:null,done:false};openModal(retModal())},
 retsend(){const r=G.ret,w=W(r.id);if(!w)return;
  const a=retAnswer(w,r.weeks,r.role);
  if(a.res==='ok'){startFarewell(w,a.weeks,a.role);closeModal();G.ret=null;save();render()}
  else if(a.res==='no'){w.morale=clamp(w.morale-6,0,100);w.retCD=G.week+8;r.msg=t('rt.no',{w:w.name});r.done=true;retRefresh();render()}
  else{r.counter={weeks:a.weeks,role:a.role};r.msg=t(a.why==='role'?'rt.counter.role':'rt.counter.time',{w:w.name});retRefresh()}},
 retacc(){const r=G.ret,w=W(r.id),c=r.counter;if(!w)return;startFarewell(w,c.weeks,c.role);closeModal();G.ret=null;save();render()},
 retrej(){const r=G.ret,w=W(r.id);if(w){w.morale=clamp(w.morale-3,0,100);w.retCD=G.week+6}r.counter=null;r.msg=t('rt.rejected',{w:w?w.name:''});r.done=true;retRefresh();render()},
 retclose(){closeModal();G.ret=null},
 cancelfw(e){const w=W(e.dataset.id);if(!w||!w.farewell)return;delete w.farewell;w.morale=clamp(w.morale-4,0,100);addNews('n.unretire',{w:w.name});save();render()}
});
Object.assign(CHG,{
 retw(e){G.ret.weeks=+e.value},
 retr(e){G.ret.role=e.value}
});

/* ----- belt designer and match poster ----- */
const ACC2=['#f2c94c','#ffffff','#b8b8b8','#13a89e','#f5d130','#d4213d'].concat(STRAPS.slice(0,4));
function tdraft(){const d=G.td||(G.td=Object.assign({},BPRESETS.classic,{name:'',teams:1,prestige:3,g:'m',strap:STRAPS[1]}));BELTKEYS.forEach(k=>{if(d[k]===undefined)d[k]=BPRESETS.classic[k]});return d}
function tdCreator(){
 const d=tdraft();
 const btn=(k,list,lab)=>'<div class="px">'+t('t.o.'+k)+'</div><div class="sw">'+list.map(v=>'<button class="txt'+(String(d[k])===String(v)?' on':'')+'" data-act="tdset" data-k="'+k+'" data-v="'+v+'">'+(lab?t(lab+v):v)+'</button>').join('')+'</div>';
 const sw=(k,list,lbl)=>'<div class="px">'+lbl+'</div><div class="sw">'+list.map(c=>'<button class="sq'+(d[k]===c?' on':'')+'" style="background:'+c+'" data-act="tdset" data-k="'+k+'" data-v="'+c+'" aria-label="'+c+'"></button>').join('')+'</div>';
 const pv=Object.assign({},d,{name:d.name||t('t.defaultname',{n:G.titles.length+1}),kind:'custom'});
 const needFlag=d.mainEmb==='flag'||d.sideEmb==='flag';
 return '<div class="card stack"><h3>'+t('t.create')+'</h3><div class="grid g2"><div class="stack">'+
  '<div class="px">'+t('t.preset')+'</div><div class="sw">'+BPRESET_IDS.map(k=>'<button class="txt" data-act="tdpreset" data-v="'+k+'">'+t('bp.'+k)+'</button>').join('')+'</div>'+
  '<div><label class="px" for="tdname">'+t('t.name')+'</label><input id="tdname" class="field" maxlength="30" value="'+esc(d.name)+'" data-chg="tdname"></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="tdteams">'+t('t.type')+'</label><select id="tdteams" class="field" data-chg="tdf" data-k="teams"><option value="1"'+(d.teams===1?' selected':'')+'>'+t('t.singles')+'</option><option value="2"'+(d.teams===2?' selected':'')+'>'+t('t.tagteam')+'</option></select></div>'+
  '<div><label class="px" for="tdpres">'+t('t.prestige')+'</label><select id="tdpres" class="field" data-chg="tdf" data-k="prestige">'+[1,2,3,4,5].map(n=>'<option value="'+n+'"'+(d.prestige===n?' selected':'')+'>'+n+'</option>').join('')+'</select></div></div>'+
  '<div class="px">'+t('g.div')+'</div><div class="sw">'+['m','f','x'].map(k=>'<button class="txt'+((d.g||'m')===k?' on':'')+'" data-act="tdset" data-k="g" data-v="'+k+'">'+t('g.'+k)+'</button>').join('')+'</div>'+
  sw('strap',STRAPS,t('t.strap'))+btn('pat',BPATS,'bpat.')+sw('strap2',ACC2,t('t.o.strap2'))+
  '<div class="px">'+t('t.plate')+'</div><div class="sw">'+Object.keys(PLATE).map(k=>'<button class="txt'+(d.plate===k?' on':'')+'" data-act="tdset" data-k="plate" data-v="'+k+'">'+t('pl.'+k)+'</button>').join('')+'</div>'+
  btn('mainShape',BSHAPES,'bsh.')+btn('mainEmb',BEMBS,'bem.')+btn('sideN',[0,1,2,3])+btn('sideShape',SSHAPES,'bsh.')+btn('sideEmb',SEMBS,'sem.')+
  (needFlag?'<div><label class="px" for="tdflag">'+t('t.o.flag')+'</label><select id="tdflag" class="field" data-chg="tdflag">'+FLAGS.map(f=>'<option value="'+f+'"'+(d.flag===f?' selected':'')+'>'+t('fl.'+f)+'</option>').join('')+'</select></div>':'')+
  '<div class="px">'+t('t.o.worn')+'</div><div class="sw"><button class="txt'+(!d.worn?' on':'')+'" data-act="tdset" data-k="worn" data-v="0">'+t('t.o.wornno')+'</button><button class="txt'+(d.worn?' on':'')+'" data-act="tdset" data-k="worn" data-v="1">'+t('t.o.wornyes')+'</button></div></div>'+
  '<div class="stack" style="position:sticky;top:8px;align-self:start"><div class="px">'+t('t.preview')+'</div><div class="beltbox">'+belt(pv,280)+'</div><div><button class="btn gold" data-act="tdcreate">'+t('t.add')+'</button></div></div></div></div>'}
function posterAv(id,px,win,nm){const w=W(id);if(!w)return '';return '<div class="pc'+(win?' pw':'')+'" title="'+esc(w.name)+'"><div class="av" style="min-width:0;padding:2px">'+avatar(w.look,px)+'</div>'+(nm?'<span>'+esc(w.name.split(' ').slice(-1)[0])+'</span>':'')+'</div>'}
function poster(m){
 const n=MODES[m.mode];if(!n)return '';const s=sides(m);const tt=m.title?titleOf(m.title):null;
 if(!s.A.length&&!s.B.length&&!tt&&!m.prize&&!m.cash)return '';
 const groups=n.ffa?teamsOf(m):[s.A,s.B];const total=groups.reduce((a,g)=>a+g.length,0);
 const px=total<=2?64:total<=4?52:total<=6?42:total<=10?34:28,nm=total<=4;
 const win=matchReady(m)?outcome(m).wi:[];
 return '<div class="poster">'+prizeBits(m)+(tt?'<div class="pbelt">'+belt(tt,150)+'<div class="mute" style="font-size:12px">'+esc(titleName(tt))+'</div></div>':'')+
  '<div class="pv">'+groups.map((g,gi)=>(gi?'<div class="pvs">VS</div>':'')+'<div class="pg">'+(g.length?g.map(id=>posterAv(id,px,win.indexOf(id)>=0,nm)).join(''):'<div class="pc"><div class="av ph">?</div></div>')+'</div>').join('')+'</div></div>'}
Object.assign(ACT,{
 tdset(e){const d=tdraft(),k=e.dataset.k,v=e.dataset.v;d[k]=k==='sideN'?+v:k==='worn'?v==='1':v;render()},
 tdpreset(e){const p=BPRESETS[e.dataset.v];if(!p)return;const d=tdraft();Object.assign(d,p);d.name=t('bp.'+e.dataset.v);if(!p.g)d.g=d.g==='f'&&e.dataset.v!=='women'?'m':d.g;render()},
 tdcreate(){const d=tdraft();const nm=(document.getElementById('tdname').value||d.name||'').trim().slice(0,30)||t('t.defaultname',{n:G.titles.length+1});
  const o={id:'T'+(G.uid++),kind:'custom',name:nm,prestige:d.prestige,teams:d.teams,g:d.g||'m',holders:[],since:G.week,custom:true};BELTKEYS.forEach(k=>{o[k]=d[k]});
  G.titles.push(o);G.td=null;save();render()}
});
Object.assign(CHG,{tdflag(e){tdraft().flag=e.value;render()}});

/* ============ Views: prizes and tournaments ============ */
const pzd=()=>G.pzd||(G.pzd={name:'',kind:'case',plate:'black',target:'',life:52});
const trd=()=>G.trd||(G.trd={name:'',n:8,gen:'m',prize:'',seed:'pop'});
function prizeBits(m){
 let h='';const one=(p,lbl)=>'<div class="pbelt">'+prizeSvg(p,68)+'<div class="mute" style="font-size:12px">'+esc(lbl)+'</div></div>';
 if(m.stip==='prizematch'&&prizeOf(m.prize))h+=one(prizeOf(m.prize),t('pz.prizehd',{p:prizeName(prizeOf(m.prize))}));
 if(m.cash&&prizeOf(m.cash))h+=one(prizeOf(m.cash),t('pz.cashhd',{p:prizeName(prizeOf(m.cash))}));
 if(m.tour){const tr=(G.tours||[]).find(x=>x.id===m.tour.tid);if(tr)h+='<div class="pbelt"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+esc(t('tr.tag',{t:tr.name,r:' · '+tourRoundName(tr,m.tour.r)}))+'</span></div>'}
 return h}
function prizeRow(m,i){
 let h='';
 if(m.stip==='prizematch')h+='<div><div class="px">'+t('pz.row.prize')+'</div><select data-chg="mprize" data-i="'+i+'">'+(G.prizes||[]).map(p=>'<option value="'+p.id+'"'+(m.prize===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>';
 const co=cashOpts(m);
 if(co.length)h+='<div><div class="px">'+t('pz.row.cash')+'</div><select data-chg="mcash" data-i="'+i+'"><option value="">'+t('pz.row.nocash')+'</option>'+co.map(p=>'<option value="'+p.id+'"'+(m.cash===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>';
 return h}
function pzCard(p){
 const h=W(p.holder),left=p.exp?Math.max(0,p.exp-G.week):0,tt=p.target?titleOf(p.target):null;
 let s='<div class="card stack"><div class="beltbox">'+prizeSvg(p,130)+'</div><div class="row spread"><div class="wname" style="font-size:18px;color:var(--gold)">'+esc(prizeName(p))+'</div><span class="tag">'+t('pz.k.'+p.kind)+' · '+t(isOpp(p.kind)?'pz.cls.opp':'pz.cls.trophy')+'</span></div>';
 if(isOpp(p.kind))s+='<div class="mute" style="font-size:13px">'+(tt?t('pz.target',{t:titleName(tt)}):t('pz.target.any'))+' · '+(p.life?t('pz.life',{n:wks(p.life)}):t('pz.never'))+'</div>';
 s+='<div class="px">'+t('pz.holder')+'</div>'+(h?wMini(h):'<span class="tag" style="align-self:flex-start">'+t('pz.vacant')+'</span>')+(h?'<div class="note">'+t('pz.since',{w:p.since})+(p.exp?' · '+t('pz.exp',{n:wks(left)}):'')+'</div>':'');
 s+='<div class="row"><button class="btn sm gold" data-act="pzmatch" data-id="'+p.id+'">'+t('pz.btn.match')+'</button>'+(h&&isOpp(p.kind)?'<button class="btn sm" data-act="pzcash" data-id="'+p.id+'">'+t('pz.btn.cash')+'</button>':'')+(p.id!=='pzb'&&p.id!=='pzc'?'<button class="btn sm danger" data-act="pzdel" data-id="'+p.id+'">'+t('pz.btn.del')+'</button>':'')+'</div></div>';
 return s}
function tourView(tr){
 const rn=Math.log2(tr.n);let cols='';
 for(let r=0;r<rn;r++){const R=tr.rounds[r],cnt=tr.n>>(r+1);
  cols+='<div class="bround"><div class="px">'+(R?tourRoundName(tr,r):(cnt===1?t('tr.final'):cnt===2?t('tr.semi'):cnt===4?t('tr.quarter'):t('tr.round',{n:r+1})))+'</div>';
  for(let i=0;i<cnt;i++){const mt=R&&R[i];
   if(!mt){cols+='<div class="bm mute"><div>?</div><div>?</div></div>';continue}
   const nm=id=>W(id)?esc(W(id).name):'?',cur=!tr.done&&r===tr.r&&!mt.w;
   const a=W(mt.a),b=W(mt.b),can=cur&&a&&b&&!a.injury&&!b.injury&&!tourOnCard(tr,i);
   cols+='<div class="bm"><div class="'+(mt.w===mt.a?'win':'')+'">'+nm(mt.a)+(a&&a.injury?' <span class="tag inj">'+t('tr.inj')+'</span>':'')+'</div><div class="'+(mt.w===mt.b?'win':'')+'">'+nm(mt.b)+(b&&b.injury?' <span class="tag inj">'+t('tr.inj')+'</span>':'')+'</div>'+
    (cur?'<div class="row" style="gap:4px"><button class="btn sm" data-act="tradd" data-id="'+tr.id+'" data-i="'+i+'"'+(can&&G.card.length<6?'':' disabled')+'>'+(tourOnCard(tr,i)?t('tr.onshow'):t('tr.addm'))+'</button><button class="btn sm" data-act="trwo" data-id="'+tr.id+'" data-i="'+i+'" data-s="a" title="'+t('tr.wo',{w:a?esc(a.name):'?'})+'">◀</button><button class="btn sm" data-act="trwo" data-id="'+tr.id+'" data-i="'+i+'" data-s="b" title="'+t('tr.wo',{w:b?esc(b.name):'?'})+'">▶</button></div>':'')+'</div>'}
  cols+='</div>'}
 const pz=tr.prize?prizeOf(tr.prize):null,wn=tr.done&&W(tr.winner)?W(tr.winner):null;
 return '<div class="card stack"><div class="row spread"><div class="row" style="gap:10px">'+(pz?prizeSvg(pz,56):'')+'<div><div class="wname" style="font-size:18px;color:var(--gold)">'+esc(tr.name)+'</div><div class="mute" style="font-size:13px">'+t('tr.size',{n:tr.n})+' · '+t('g.'+tr.gen)+(pz?' · '+esc(prizeName(pz)):'')+'</div></div></div>'+(tr.done?'<span class="tag" style="color:var(--teal);border-color:var(--teal)">'+t('tr.done')+(wn?' · '+esc(wn.name):'')+'</span>':'<button class="btn sm" data-act="tradda" data-id="'+tr.id+'"'+(G.card.length>=6?' disabled':'')+'>'+t('tr.addround')+'</button>')+'</div><div class="bracket">'+cols+'</div></div>'}
function vPrizes(){
 const d=pzd(),td=trd();
 let h='<div class="top"><div><h2>'+t('pz.title')+'</h2><div class="mute" style="max-width:70ch">'+t('pz.sub')+'</div></div></div>';
 if(G.pzmsg)h+='<div class="note neg">'+t(G.pzmsg)+'</div>';
 h+='<div class="grid g3">'+(G.prizes||[]).map(pzCard).join('')+'</div>';
 const pv={kind:d.kind,plate:d.plate,name:d.name};
 h+='<div class="card stack"><h3>'+t('pz.create')+'</h3><div class="grid g2"><div class="stack"><div><label class="px" for="pzname">'+t('pz.name')+'</label><input id="pzname" class="field" maxlength="30" value="'+esc(d.name)+'" data-chg="pzname"></div>'+
  '<div class="px">'+t('pz.kindlbl')+'</div><div class="sw">'+PKINDS.map(k=>'<button class="txt'+(d.kind===k?' on':'')+'" data-act="pzset" data-k="kind" data-v="'+k+'">'+t('pz.k.'+k)+'</button>').join('')+'</div>'+
  '<div class="px">'+t('t.plate')+'</div><div class="sw">'+Object.keys(PLATE).map(k=>'<button class="txt'+(d.plate===k?' on':'')+'" data-act="pzset" data-k="plate" data-v="'+k+'">'+t('pl.'+k)+'</button>').join('')+'</div>'+
  (isOpp(d.kind)?'<div class="grid g2" style="gap:8px"><div><label class="px" for="pztarget">'+t('pz.targetlbl')+'</label><select id="pztarget" class="field" data-chg="pzf" data-k="target"><option value="">'+t('pz.target.any')+'</option>'+G.titles.filter(x=>x.teams===1).map(x=>'<option value="'+x.id+'"'+(d.target===x.id?' selected':'')+'>'+esc(titleName(x))+'</option>').join('')+'</select></div>'+
   '<div><label class="px" for="pzlife">'+t('pz.lifelbl')+'</label><select id="pzlife" class="field" data-chg="pzf" data-k="life">'+[0,26,52].map(n=>'<option value="'+n+'"'+(+d.life===n?' selected':'')+'>'+(n?wks(n):t('pz.never'))+'</option>').join('')+'</select></div></div>':'')+
  '</div><div class="stack"><div class="px">'+t('t.preview')+'</div><div class="beltbox">'+prizeSvg(pv,150)+'</div><div><button class="btn gold" data-act="pzcreate">'+t('pz.add')+'</button></div></div></div></div>';
 h+='<h3>'+t('tr.title')+'</h3>';
 const tours=G.tours||[];h+=tours.length?tours.map(tourView).join(''):'<p class="mute">'+t('tr.none')+'</p>';
 const need=healthy().filter(w=>td.gen==='x'||((td.gen==='f')===isF(w.id))).length;
 h+='<div class="card stack"><h3>'+t('tr.create')+'</h3><div class="grid g2"><div class="stack"><div><label class="px" for="trname">'+t('pz.name')+'</label><input id="trname" class="field" maxlength="30" value="'+esc(td.name)+'" data-chg="trname"></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="trn">'+t('tr.sizelbl')+'</label><select id="trn" class="field" data-chg="trf" data-k="n">'+TSIZES.map(n=>'<option value="'+n+'"'+(td.n===n?' selected':'')+'>'+n+'</option>').join('')+'</select></div>'+
  '<div><label class="px" for="trg">'+t('g.div')+'</label><select id="trg" class="field" data-chg="trf" data-k="gen">'+['m','f','x'].map(k=>'<option value="'+k+'"'+(td.gen===k?' selected':'')+'>'+t('g.'+k)+'</option>').join('')+'</select></div></div>'+
  '<div class="grid g2" style="gap:8px"><div><label class="px" for="trp">'+t('tr.prize')+'</label><select id="trp" class="field" data-chg="trf" data-k="prize"><option value="">'+t('tr.noprize')+'</option>'+(G.prizes||[]).map(p=>'<option value="'+p.id+'"'+(td.prize===p.id?' selected':'')+'>'+esc(prizeName(p))+'</option>').join('')+'</select></div>'+
  '<div><label class="px" for="trs">'+t('tr.seed')+'</label><select id="trs" class="field" data-chg="trf" data-k="seed"><option value="pop"'+(td.seed==='pop'?' selected':'')+'>'+t('tr.seed.pop')+'</option><option value="rand"'+(td.seed==='rand'?' selected':'')+'>'+t('tr.seed.rand')+'</option></select></div></div></div>'+
  '<div class="stack"><div class="mute">'+t('tr.need',{n:need,m:td.n})+'</div><div><button class="btn gold" data-act="trcreate"'+(need<td.n||tours.filter(x=>!x.done).length>=2?' disabled':'')+'>'+t('tr.start')+'</button></div>'+(tours.filter(x=>!x.done).length>=2?'<div class="note neg">'+t('tr.max')+'</div>':'')+'</div></div></div>';
 return h}
Object.assign(ACT,{
 pzset(e){pzd()[e.dataset.k]=e.dataset.v;render()},
 pzcreate(){const d=pzd(),nm=(document.getElementById('pzname').value||d.name||'').trim().slice(0,30);
  G.prizes.push({id:'P'+(G.uid++),kind:d.kind,name:nm||null,plate:d.plate,target:isOpp(d.kind)?d.target:'',life:isOpp(d.kind)?+d.life:0,holder:'',since:0,exp:0,wins:0,custom:true});G.pzd=null;save();render()},
 pzdel(e){G.prizes=G.prizes.filter(p=>p.id!==e.dataset.id);G.card.forEach(m=>fixMatch(m));save();render()},
 pzmatch(e){const p=prizeOf(e.dataset.id);if(!p)return;G.pzmsg='';
  const u=usedIds(-1),pool=healthy().filter(w=>!u.has(w.id)&&!w.ext).sort((a,b)=>b.pop-a.pop);
  const n=Math.min(6,pool.length);if(n<3||G.card.length>=6){G.pzmsg='pz.msg.nomatch';render();return}
  const m=emptyMatch();m.mode=n+'way';if(!MODES[m.mode]){render();return}
  pool.slice(0,n).forEach((w,i)=>{m.a[i]=w.id});m.stip='prizematch';m.prize=p.id;m.finish='clean';fixMatch(m);G.card.push(m);G.screen='show';save();render()},
 pzcash(e){const p=prizeOf(e.dataset.id);if(!p||!p.holder)return;G.pzmsg='';
  const tts=G.titles.filter(x=>x.teams===1&&x.holders.length===1&&x.holders[0]!==p.holder&&genderOK(x,[p.holder])&&(!p.target||p.target===x.id)).sort((a,b)=>prestOf(b)-prestOf(a));
  const tt=tts[0],u=usedIds(-1);
  if(!tt||G.card.length>=6||u.has(p.holder)){G.pzmsg='pz.msg.nocash';render();return}
  const m=emptyMatch();m.mode='1v1';m.a[0]=p.holder;m.b[0]=tt.holders[0];m.title=tt.id;m.cash=p.id;m.finish='clean';fixMatch(m);G.card.push(m);G.screen='show';save();render()},
 trcreate(){const d=trd();if((G.tours||[]).filter(x=>!x.done).length>=2)return;
  const nm=(document.getElementById('trname').value||d.name||'').trim().slice(0,30)||t('tr.defname',{n:(G.tours||[]).length+1});
  const tr=mkTour({name:nm,n:d.n,gen:d.gen,prize:d.prize,seed:d.seed});if(!tr)return;G.tours.push(tr);G.trd=null;addNews('n.tourstart',{t:nm});save();render()},
 tradd(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done||G.card.length>=6)return;const m=tourMatch(tr,+e.dataset.i);if(!m)return;G.card.push(m);save();render()},
 tradda(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done)return;for(let i=0;i<tr.rounds[tr.r].length;i++){if(G.card.length>=6)break;const m=tourMatch(tr,i);if(m)G.card.push(m)}save();render()},
 trwo(e){const tr=G.tours.find(x=>x.id===e.dataset.id);if(!tr||tr.done)return;tourWO(tr,tr.r,+e.dataset.i,e.dataset.s);G.card.forEach(fixMatch);save();render()}
});
Object.assign(CHG,{
 pzname(e){pzd().name=e.value},pzf(e){pzd()[e.dataset.k]=e.dataset.k==='life'?+e.value:e.value;render()},
 trname(e){trd().name=e.value},trf(e){const d=trd();d[e.dataset.k]=e.dataset.k==='n'?+e.value:e.value;render()},
 mprize(e){const m=G.card[+e.dataset.i];m.prize=e.value;render()},
 mcash(e){const m=G.card[+e.dataset.i];m.cash=e.value;fixMatch(m);render()}
});
// ---- Calendar view ----
function calChosen(){const hs=healthy().filter(w=>intvOk(w)).sort((a,b)=>b.pop-a.pop);let w=hs.find(x=>x.id===G.calSel);if(!w){w=hs[0];G.calSel=w?w.id:''}return{w,hs}}
function calMatchRow(r,c,m,i,w){
 const iv=G.intv&&G.intv.wk===G.week&&G.intv.fed===r.id&&G.intv.mi===i?G.intv:null;
 const btn=s=>{const on=iv&&iv.side===s;const ch=w?Math.round(intvChance(w,m,c)*100):0;
  return '<button class="btn sm'+(on?' gold':'')+'" data-act="intv" data-f="'+esc(r.id)+'" data-i="'+i+'" data-s="'+s+'"'+(w?'':' disabled')+'>'+t('cal.help',{n:esc(s==='a'?m.an:m.bn)})+(w?' · '+ch+'%':'')+'</button>'};
 return '<div class="row spread" style="gap:8px;padding:6px 0;border-top:1px solid var(--line);flex-wrap:wrap"><div style="min-width:0"><b>'+esc(m.an)+'</b> <span class="mute">vs</span> <b>'+esc(m.bn)+'</b>'+(m.main?' <span class="tag">'+t('cal.main')+'</span>':'')+(iv?' <span class="tag" style="color:var(--gold)">'+t('cal.set',{n:esc(W(iv.wid)?W(iv.wid).name:'?')})+'</span>':'')+'</div><div class="row" style="gap:6px">'+btn('a')+btn('b')+'</div></div>'}
function calFeds(){if(G.calAll)return G.rivals;const near=G.rivals.slice().sort((a,b)=>Math.abs(a.pop-G.fed.pop)-Math.abs(b.pop-G.fed.pop));const s=new Set(near.slice(0,6).map(r=>r.id));near.forEach(r=>{if(s.size<10&&rvBig(r,G.week))s.add(r.id)});return G.rivals.filter(r=>s.has(r.id))}
function vCal(){
 const {w,hs}=calChosen();
 let h='<div class="top"><div><h2>'+t('cal.title')+'</h2><div class="mute" style="max-width:70ch">'+t('cal.sub')+'</div></div></div>';
 // this week
 h+='<div class="card stack"><div class="row spread"><h3>'+t('cal.thisweek',{n:G.week})+'</h3>'+(isBig()?'<span class="tag" style="color:var(--gold)">★ '+esc(bigName())+'</span>':'')+'</div>'+
  '<div class="mute" style="font-size:13px">'+t('cal.ownnow',{n:G.card.length})+'</div>';
 if(G.intv&&G.intv.wk===G.week){const rv=G.rivals.find(x=>x.id===G.intv.fed);h+='<div class="note gold row spread"><span>'+t('cal.active',{w:esc(W(G.intv.wid)?W(G.intv.wid).name:'?'),f:esc(rv?rv.name:'?')})+'</span><button class="btn sm danger" data-act="intvx">'+t('cal.cancel')+'</button></div>'}
 h+='<div><label class="px" for="calw">'+t('cal.pick')+'</label><select id="calw" class="field" data-chg="calw">'+(hs.length?hs.map(x=>'<option value="'+x.id+'"'+(w&&x.id===w.id?' selected':'')+'>'+esc(x.name)+' · '+t('st.pop')+' '+Math.round(x.pop)+'</option>').join(''):'<option value="">—</option>')+'</select><div class="mute" style="font-size:12px">'+t('cal.rules')+'</div></div></div>';
 h+='<div class="row spread"><span class="mute">'+t(G.calAll?'cal.all':'cal.near',{n:calFeds().length})+'</span><button class="btn sm" data-act="calall">'+t(G.calAll?'cal.shownear':'cal.showall')+'</button></div><div class="grid g2">'+calFeds().map(r=>{const c=rivalShow(r,G.week);
  return '<div class="card stack"><div class="row spread"><div class="row" style="gap:8px"><span class="dot" style="background:'+esc(r.color||'#888')+'"></span><b>'+esc(r.name)+'</b></div>'+(c&&c.big?'<span class="tag" style="color:var(--gold)">★ '+esc(c.name)+'</span>':'<span class="tag">'+t('cal.show')+'</span>')+'</div>'+
   (c&&c.ms.length?c.ms.map((m,i)=>calMatchRow(r,c,m,i,w)).join(''):'<div class="mute">'+t('cal.nocard')+'</div>')+'</div>'}).join('')+'</div>';
 // schedule
 const feds=[G.fed].concat(calFeds());
 let rows='';for(let k=0;k<12;k++){const wk=G.week+k;rows+='<tr'+(k===0?' style="background:var(--panel2)"':'')+'><td class="mute">'+t('cal.wk',{n:wk})+'</td>'+feds.map(f=>{const own=f.id===G.fed.id;const big=own?wk%4===0:rvBig(f,wk);const nm=own?ownBigName(wk):rvBigName(f,wk);
   return '<td>'+(big?'<b style="color:var(--gold)">★ '+esc(nm)+'</b>':'<span class="mute">•</span>')+'</td>'}).join('')+'</tr>'}
 h+='<div class="card stack"><h3>'+t('cal.sched')+'</h3><div class="scroll"><table><thead><tr><th>'+t('cal.week')+'</th>'+feds.map(f=>'<th><span class="dot" style="background:'+esc(f.color||'#888')+'"></span> '+esc(f.short||f.name)+'</th>').join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div><div class="mute" style="font-size:12px">'+t('cal.legend')+'</div></div>';
 // results
 let res='';Object.values(G.cal||{}).filter(c=>c.done).sort((a,b)=>b.wk-a.wk).slice(0,12).forEach(c=>{const r=G.rivals.find(x=>x.id===c.fed);const m=c.ms[0];if(!r||!m)return;const wn=m.w==='a'?m.an:m.bn,ln=m.w==='a'?m.bn:m.an;
  const iv=c.ms.find(x=>x.intv);res+='<div class="row spread" style="gap:8px;padding:4px 0;border-top:1px solid var(--line);flex-wrap:wrap"><span><span class="mute">'+t('cal.wk',{n:c.wk})+'</span> · '+esc(r.name)+(c.big?' ★':'')+': <b>'+esc(wn)+'</b> '+t('cal.def')+' '+esc(ln)+'</span>'+(iv?'<span class="tag" style="color:var('+(iv.intv==='ok'?'--gold':'--bad,#c44')+')">'+t('cal.'+(iv.intv==='ok'?'ok':'fail'))+'</span>':'')+'</div>'});
 if(res)h+='<div class="card stack"><h3>'+t('cal.results')+'</h3>'+res+'</div>';
 return h}
Object.assign(ACT,{
 intv(e){const d=e.dataset;if(!G.intv||G.intv.wk!==G.week||true){const wid=calChosen().w;if(wid&&setIntv(d.f,+d.i,wid.id,d.s))save()}render()},
 calall(){G.calAll=!G.calAll;render()},
 intvx(){G.intv=null;save();render()}});
Object.assign(CHG,{calw(e){G.calSel=e.value;render()}});
// ---- Rankings: TOP 100 ----
const RKS={ovr:w=>ovr(w),pop:w=>w.pop,ring:w=>w.ring,mic:w=>w.mic,cha:w=>w.cha};
function ovr(w){const o=(w.str+w.spd+w.tec+w.sta+w.psy)/5;return Math.round(w.ring*.4+o*.2+w.mic*.12+w.cha*.12+w.pop*.16)}
const rkPool=()=>G.ws.filter(w=>!w.ext&&w.fed!=='RET'&&w.fed!=='GST'&&w.fed!=='PRO'&&w.str!==undefined);
function rkState(){G.rk=G.rk||{f:'all',s:'ovr',g:'all',c:'all'};return G.rk}
function rankWeekly(){const p=rkPool().sort((a,b)=>ovr(b)-ovr(a)||b.pop-a.pop);G.rankPrev=G.rankNow||{};G.rankNow={};p.forEach((w,i)=>G.rankNow[w.id]=i+1)}
function fedTag(id){if(id==='FA')return '<span class="tag">'+t('rk.fa')+'</span>';const f=id===G.fed.id?G.fed:G.rivals.find(r=>r.id===id);if(!f)return '';return '<span class="dot" style="background:'+esc(f.color||'#888')+'"></span> '+esc(f.short||f.name)}
function vRank(){
 const d=rkState();
 let list=rkPool();
 if(d.f==='FA')list=list.filter(w=>w.fed==='FA');else if(d.f!=='all')list=list.filter(w=>w.fed===d.f);
 if(d.c&&d.c!=='all')list=list.filter(w=>w.country===d.c);
 if(d.k&&d.k!=='all')list=list.filter(w=>contOf(w.country)===d.k);
 if(d.g==='m')list=list.filter(w=>w.g!=='f');else if(d.g==='f')list=list.filter(w=>w.g==='f');
 const fn=RKS[d.s]||RKS.ovr;
 list=list.sort((a,b)=>fn(b)-fn(a)||b.pop-a.pop).slice(0,100);
 const opt=(v,l,cur)=>'<option value="'+esc(v)+'"'+(cur===v?' selected':'')+'>'+esc(l)+'</option>';
 let h='<div class="top"><div><h2>'+t('rk.title')+'</h2><div class="mute" style="max-width:70ch">'+t('rk.sub')+'</div></div></div>';
 h+='<div class="card"><div class="grid g3" style="gap:8px"><div><label class="px" for="rkk">'+t('ui.continent')+'</label><select id="rkk" class="field" data-chg="rkset" data-k="k">'+opt('all',t('rk.all'),d.k||'all')+CONTS.map(c=>opt(c,t('ct.'+c),d.k)).join('')+'</select></div><div><label class="px" for="rkc">'+t('rk.cn')+'</label><select id="rkc" class="field" data-chg="rkset" data-k="c">'+opt('all',t('rk.all'),d.c||'all')+[...new Set(rkPool().map(w=>w.country))].sort((a,b)=>cn(a).localeCompare(cn(b))).map(c=>opt(c,cn(c),d.c)).join('')+'</select></div><div><label class="px" for="rkf">'+t('rk.fed')+'</label><select id="rkf" class="field" data-chg="rkset" data-k="f">'+opt('all',t('rk.all'),d.f)+opt('FA',t('rk.fa'),d.f)+opt(G.fed.id,G.fed.name+' ('+t('rk.mine')+')',d.f)+G.rivals.slice().sort((a,b)=>cn(a.country).localeCompare(cn(b.country))||a.name.localeCompare(b.name)).map(r=>opt(r.id,'['+r.country+'] '+r.name,d.f)).join('')+'</select></div>'+
  '<div><label class="px" for="rkg">'+t('rk.div')+'</label><select id="rkg" class="field" data-chg="rkset" data-k="g">'+opt('all',t('rk.all'),d.g)+opt('m',t('g.m'),d.g)+opt('f',t('g.f'),d.g)+'</select></div>'+
  '<div><label class="px" for="rks">'+t('rk.sort')+'</label><select id="rks" class="field" data-chg="rkset" data-k="s">'+opt('ovr',t('rk.ovr'),d.s)+opt('pop',t('st.pop'),d.s)+opt('ring',t('st.ring'),d.s)+opt('mic',t('st.mic'),d.s)+opt('cha',t('st.cha'),d.s)+'</select></div></div></div>';
 const rows=list.map((w,i)=>{const pr=(G.rankPrev||{})[w.id],nw=(G.rankNow||{})[w.id];let mv='<span class="mute">–</span>';
  if(pr&&nw&&d.f==='all'&&d.g==='all'&&d.s==='ovr'){const df=pr-nw;mv=df>0?'<span style="color:var(--gold)">▲'+df+'</span>':df<0?'<span style="color:#c44">▼'+(-df)+'</span>':'<span class="mute">=</span>'}
  const mineW=w.fed===G.fed.id;
  return '<tr'+(mineW?' style="background:var(--panel2)"':'')+'><td class="mute">'+(i+1)+'</td><td>'+mv+'</td><td><div class="row" style="gap:8px;flex-wrap:nowrap"><div style="width:34px;height:34px;overflow:hidden;flex:none">'+avatar(w.look,34)+'</div><b>'+esc(w.name)+'</b>'+(w.stb&&w.fed!==G.fed.id&&w.fed!=='FA'?' <span class="tag">'+esc(w.stb)+'</span>':'')+(w.g==='f'?' <span style="color:#c4358a">♀</span>':'')+(w.injury?' <span class="tag inj">'+t('r.inj',{n:wks(w.injury)})+'</span>':'')+'</div></td><td>'+fedTag(w.fed)+'</td><td>'+cn(w.country)+'</td><td>'+w.age+'</td><td><b>'+ovr(w)+'</b></td><td>'+Math.round(w.pop)+'</td><td>'+w.ring+'</td><td>'+w.mic+'</td><td>'+w.cha+'</td><td>'+rkAct(w)+'</td></tr>'}).join('');
 h+='<div class="card stack"><div class="mute">'+t('rk.count',{n:list.length})+'</div><div class="scroll"><table><thead><tr><th>#</th><th></th><th>'+t('rk.w')+'</th><th>'+t('rk.fed')+'</th><th>'+t('rk.cn')+'</th><th>'+t('rk.age')+'</th><th>'+t('rk.ovr')+'</th><th>'+t('st.pop')+'</th><th>'+t('st.ring')+'</th><th>'+t('st.mic')+'</th><th>'+t('st.cha')+'</th><th>'+t('rk.act')+'</th></tr></thead><tbody>'+(rows||'<tr><td colspan="12" class="mute">'+t('rk.none')+'</td></tr>')+'</tbody></table></div></div>';
 return h}
Object.assign(CHG,{rkset(e){rkState()[e.dataset.k]=e.value;render()}});

// ---- Free-agent market with filters and pages ----
const MKP=24;
function mkState(){G.mk=G.mk||{s:'pop',g:'all',q:'',p:0,c:'all'};return G.mk}
function marketView(full){
 const d=mkState();let fa=G.ws.filter(w=>w.fed==='FA');const total=fa.length;
 if(d.g==='m')fa=fa.filter(w=>w.g!=='f');else if(d.g==='f')fa=fa.filter(w=>w.g==='f');
 if(d.c!=='all')fa=fa.filter(w=>w.country===d.c);
 const q=(d.q||'').trim().toLowerCase();if(q)fa=fa.filter(w=>w.name.toLowerCase().indexOf(q)>=0);
 const key={pop:w=>-w.pop,ovr:w=>-ovr(w),age:w=>w.age,price:w=>salaryOf(w,G.fed.tier)}[d.s]||(w=>-w.pop);
 fa.sort((a,b)=>key(a)-key(b)||b.pop-a.pop);
 const pages=Math.max(1,Math.ceil(fa.length/MKP));d.p=clamp(d.p,0,pages-1);
 const opt=(v,l,c)=>'<option value="'+esc(v)+'"'+(c===v?' selected':'')+'>'+esc(l)+'</option>';
 const cs=[...new Set(G.ws.filter(w=>w.fed==='FA').map(w=>w.country))].sort((a,b)=>cn(a).localeCompare(cn(b)));
 let h='<h3>'+t('w.market')+' · '+total+'</h3><div class="card"><div class="grid g4" style="gap:8px">'+
  '<div><label class="px" for="mkq">'+t('mk.search')+'</label><input id="mkq" class="field" data-chg="mkset" data-k="q" value="'+esc(d.q||'')+'" placeholder="'+t('mk.ph')+'"></div>'+
  '<div><label class="px" for="mks">'+t('rk.sort')+'</label><select id="mks" class="field" data-chg="mkset" data-k="s">'+opt('pop',t('st.pop'),d.s)+opt('ovr',t('rk.ovr'),d.s)+opt('age',t('mk.young'),d.s)+opt('price',t('mk.cheap'),d.s)+'</select></div>'+
  '<div><label class="px" for="mkg">'+t('rk.div')+'</label><select id="mkg" class="field" data-chg="mkset" data-k="g">'+opt('all',t('rk.all'),d.g)+opt('m',t('g.m'),d.g)+opt('f',t('g.f'),d.g)+'</select></div>'+
  '<div><label class="px" for="mkc">'+t('rk.cn')+'</label><select id="mkc" class="field" data-chg="mkset" data-k="c">'+opt('all',t('rk.all'),d.c)+cs.map(c=>opt(c,cn(c),d.c)).join('')+'</select></div></div></div>';
 const pg=pages>1?'<div class="row spread"><button class="btn sm" data-act="mkpage" data-d="-1"'+(d.p<=0?' disabled':'')+'>◀</button><span class="mute">'+t('mk.page',{p:d.p+1,n:pages,c:fa.length})+'</span><button class="btn sm" data-act="mkpage" data-d="1"'+(d.p>=pages-1?' disabled':'')+'>▶</button></div>':'<div class="mute">'+t('mk.found',{c:fa.length})+'</div>';
 h+=pg+'<div class="grid gW">'+fa.slice(d.p*MKP,d.p*MKP+MKP).map(w=>{const fee=salaryOf(w,G.fed.tier)*8;return wCard(w,'<div><button class="btn sm gold" data-act="sign" data-id="'+w.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('w.sign',{m:money(fee)})+'</button> <span class="mute" style="font-size:12px">'+(full?t('w.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>')}).join('')+'</div>'+(pages>1?pg:'');
 return h}
Object.assign(CHG,{mkset(e){const d=mkState();d[e.dataset.k]=e.value;d.p=0;render()}});
Object.assign(ACT,{mkpage(e){const d=mkState();d.p+=+e.dataset.d;render();window.scrollTo(0,document.body.scrollHeight>2000?600:0)}});
// ---- Talent prospects on the World screen ----
function prosView(){
 const ps=G.ws.filter(w=>w.fed==='PRO').sort((a,b)=>b.potEst-a.potEst);const scouts=staffOf('scout').length;const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 let h='<h3>'+t('pr.title')+' · '+ps.length+'</h3><div class="mute" style="max-width:70ch">'+t(scouts?'pr.sub':'pr.noscout')+'</div>';
 if(!ps.length)return h;
 return h+'<div class="grid gW">'+ps.map(w=>{const fee=proFee(w);return wCard(w,'<div class="row" style="gap:8px;flex-wrap:wrap"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('pr.pot')+' '+potStars(w.potEst)+'</span><span class="mute" style="font-size:12px">'+t('pr.found',{s:esc(w.by||'?'),n:Math.max(0,w.exp-G.week)})+'</span></div><div><button class="btn sm gold" data-act="signpro" data-id="'+w.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('w.sign',{m:money(fee)})+'</button> <span class="mute" style="font-size:12px">'+(full?t('w.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>')}).join('')+'</div>'}
Object.assign(ACT,{signpro(e){if(signPro(e.dataset.id)){save()}render()},
 scoutreg(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;const ks=Object.keys(REGS);s.reg=ks[(ks.indexOf(s.reg)+1)%ks.length];save();render()}});

function rkAct(w){if(w.fed==='FA'||w.fed==='PRO'||w.fed===G.fed.id||w.fed==='RET'||w.ext)return '';
 const off=mine().length>=ROSTERMAX[G.fed.tier-1]||(w.pcd||0)>G.week;const fee=poachFee(w);
 return '<button class="btn sm" data-act="poach" data-id="'+w.id+'"'+(off||G.fed.cash<fee?' disabled':'')+'>'+t('rk.poach',{m:money(fee),p:Math.round(poachChance(w)*100)})+'</button>'}
Object.assign(ACT,{async poach(e){await poach(e.dataset.id)}});
/* ============ Tweener X view ============ */
function twNew(){return G&&G.tw?G.tw.filter(p=>p.id>(G.twSeen||0)).length:0}
function twAcc(p){
 const a=p.acc||'wire';
 if(a==='me')return{name:G.fed.name,handle:'@'+String(G.fed.short||G.fed.name).toLowerCase().replace(/[^a-z0-9]/g,''),ver:1};
 if(a==='wire')return{name:'Ring Wire',handle:'@RingWire',ver:1};
 if(a.indexOf('r:')===0){const r=G.rivals.find(x=>x.id===a.slice(2));return{name:r?r.name:'?',handle:'@'+String(r?(r.short||r.id):'x').toLowerCase().replace(/[^a-z0-9]/g,''),ver:1}}
 const h=a.slice(4);return{name:h.slice(1).replace(/_/g,' '),handle:h,ver:0}}
function twCol(s){let n=0;for(let i=0;i<s.length;i++)n=(n*31+s.charCodeAt(i))%360;return 'hsl('+n+',45%,42%)'}
function twAv(s,name){return '<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;flex:none;color:#fff;font-weight:700;font-size:13px;background:'+twCol(s)+'">'+esc(String(name||s).replace('@','').charAt(0).toUpperCase())+'</span>'}
function twHeart(on,n,id,ci){return '<button data-act="twlike" data-id="'+id+'"'+(ci!=null?' data-c="'+ci+'"':'')+' aria-pressed="'+(on?'true':'false')+'" style="background:none;border:0;padding:0 2px;cursor:pointer;font:inherit;font-size:inherit;color:'+(on?'#e0245e':'inherit')+'">'+(on?'♥':'♡')+' '+n+'</button>'}
function twPost(p){
 const a=twAcc(p);
 let h='<div class="card stack" style="gap:8px"><div class="row" style="gap:8px;flex-wrap:nowrap">'+twAv(a.handle,a.name)+'<div style="min-width:0"><b>'+esc(a.name)+'</b>'+(a.ver?' <span style="color:var(--gold)">✔</span>':'')+' <span class="mute" style="font-size:13px">'+esc(a.handle)+' · W'+p.w+'</span></div></div>';
 h+='<div style="font-size:15px;overflow-wrap:anywhere">'+esc(t('tw.'+p.k,p.v))+'</div><div class="mute" style="font-size:13px">💬 '+p.c.length+' &nbsp; ♻ '+p.rt+' &nbsp; '+twHeart(p.liked,p.lk,p.id)+'</div>';
 h+=p.c.map((c,ci)=>{const you=c.u==='you';return '<div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start;padding-left:12px;border-left:2px solid var(--line,#8884)">'+twAv(c.u,you?t('tw.you'):c.u)+'<div style="min-width:0;font-size:14px;overflow-wrap:anywhere"><b>'+(you?esc(t('tw.you')):esc(c.u))+'</b> '+esc(c.raw!=null?c.raw:t(c.k,p.v))+' <span class="mute" style="font-size:12px">'+twHeart(c.liked,c.lk||0,p.id,ci)+'</span>'+'</div></div>'}).join('');
 return h+'<div class="row" style="gap:6px;flex-wrap:nowrap"><input class="field" id="twin'+p.id+'" maxlength="140" placeholder="'+esc(t('tw.ph'))+'" style="min-width:0"><button class="btn sm" data-act="twrep" data-id="'+p.id+'">'+t('tw.reply')+'</button></div></div>';
}
function vTw(){
 twEnsure();const top=G.tw.length?G.tw[0].id:0;
 const h='<div class="top"><div><h2>Tweener X <span class="mute" style="font-size:15px;font-weight:400">'+t('tw.sub')+'</span></h2></div></div><div class="stack">'+(G.tw.length?G.tw.slice(0,40).map(twPost).join(''):'<p class="mute">'+t('tw.empty')+'</p>')+'</div>';
 G.twSeen=top;return h}
Object.assign(ACT,{twrep(e){
 const id=+e.dataset.id,p=(G.tw||[]).find(x=>x.id===id),inp=document.getElementById('twin'+id);if(!p||!inp)return;
 const txt=inp.value.trim().slice(0,140);if(!txt)return;
 p.c.push({u:'you',raw:txt,lk:0});
 if(rnd()<.6)p.c.push({u:pickR(G.fans).h,k:pickR(TWC.reply.x),lk:Math.floor(rnd()*6)});
 save();render()}});
Object.assign(ACT,{twlike(e){
 const p=(G.tw||[]).find(x=>x.id===+e.dataset.id);if(!p)return;
 const o=e.dataset.c!=null?p.c[+e.dataset.c]:p;if(!o)return;
 o.liked=!o.liked;o.lk=Math.max(0,(o.lk||0)+(o.liked?1:-1));save();render()}});
function vPpv(){
 const l=ppvEnsure(),nb=ppvNextWeek();
 let h='<div class="top"><div><h2>'+t('nav.ppv')+'</h2><div class="mute" style="max-width:70ch">'+t('pv.sub')+'</div></div></div>';
 h+='<div class="card stack"><h3>'+t('pv.upc')+'</h3>'+[0,1,2,3,4,5].map(k=>'<div class="row spread" style="gap:8px"><span class="mute">'+t('pv.wk',{n:nb+4*k})+'</span><b style="color:var(--gold)">★ '+esc(ppvName(nb+4*k))+'</b></div>').join('')+'</div>';
 h+='<div class="card stack"><h3>'+t('pv.list')+'</h3>'+l.map((x,i)=>'<div class="row" style="gap:6px;flex-wrap:nowrap"><span class="mute" style="width:22px;flex:none">'+(i+1)+'.</span><input class="field" maxlength="40" value="'+esc(lang==='pl'?x.pl:x.en)+'" data-chg="ppvname" data-i="'+i+'" style="min-width:0"><button class="btn sm" data-act="ppvup" data-i="'+i+'" title="'+esc(t('pv.up'))+'"'+(i===0?' disabled':'')+'>▲</button><button class="btn sm" data-act="ppvdn" data-i="'+i+'" title="'+esc(t('pv.dn'))+'"'+(i===l.length-1?' disabled':'')+'>▼</button><button class="btn sm danger" data-act="ppvdel" data-i="'+i+'" title="'+esc(t('pv.del'))+'"'+(l.length<=1?' disabled':'')+'>✕</button></div>').join('')+
  '<div class="row" style="gap:6px;flex-wrap:nowrap"><input class="field" id="ppvnew" maxlength="40" placeholder="'+esc(t('pv.addph'))+'" style="min-width:0"><button class="btn sm" data-act="ppvadd"'+(l.length>=24?' disabled':'')+'>'+t('pv.add')+'</button></div>'+
  '<div><button class="btn sm" data-act="ppvreset">'+t('pv.reset')+'</button></div></div>';
 return h}
Object.assign(CHG,{ppvname(e){const l=ppvEnsure(),i=+e.dataset.i,v=e.value.trim().slice(0,40);if(l[i]&&v)l[i]={pl:v,en:v};__bnG=null;render()}});
Object.assign(ACT,{
 ppvup(e){const l=ppvEnsure(),i=+e.dataset.i;if(i>0){[l[i-1],l[i]]=[l[i],l[i-1]];__bnG=null;save();render()}},
 ppvdn(e){const l=ppvEnsure(),i=+e.dataset.i;if(i<l.length-1){[l[i+1],l[i]]=[l[i],l[i+1]];__bnG=null;save();render()}},
 ppvdel(e){const l=ppvEnsure();if(l.length>1){l.splice(+e.dataset.i,1);__bnG=null;save();render()}},
 ppvadd(){const l=ppvEnsure(),i=document.getElementById('ppvnew'),v=i?i.value.trim().slice(0,40):'';if(v&&l.length<24){l.push({pl:v,en:v});__bnG=null;save();render()}},
 ppvreset(){G.ppv=ppvDefault();__bnG=null;save();render()}});
function wFeds(){const a=allFeds().slice(),s=G.wsort||'pop';if(s==='ct')a.sort((x,y)=>CONTS.indexOf(contOf(x.country))-CONTS.indexOf(contOf(y.country))||cn(x.country).localeCompare(cn(y.country))||y.pop-x.pop);else if(s==='cn')a.sort((x,y)=>cn(x.country).localeCompare(cn(y.country))||y.pop-x.pop);else if(s==='tier')a.sort((x,y)=>y.tier-x.tier||y.pop-x.pop);else if(s==='name')a.sort((x,y)=>x.name.localeCompare(y.name));else a.sort((x,y)=>y.pop-x.pop);return a}
Object.assign(CHG,{sc(e){START_C=e.value;render()},sk(e){START_K=e.value;render()},ss(e){START_S=e.value;render()},wsort(e){G.wsort=e.value;render()}});
Object.assign(D,{'ui.country':['Kraj','Country'],'ui.sCn':['Kraj','Country'],'ui.sTier':['Poziom','Tier']});
Object.assign(D,{'nav.fa':['Wolni agenci','Free agents']});
Object.assign(ACT,{takejob(e){const id=e.dataset.id;closeModal();if(takeOver(id)){G.screen='dash';render()}else render()},facup(e){const k=e.dataset.k,c=facCost(k);if(!FACS.includes(k)||c<=0||G.fed.cash<c)return;G.fed.cash-=c;infra()[k]++;infra().disc=0;addNews('n.facup',{f:t('fac.'+k),l:infra()[k]});save();render()}});

Object.assign(ACT,{navg(e){const k=e.dataset.g,c=navCol();c[k]=!c[k];try{localStorage.setItem('ringboss.nav.v1',JSON.stringify(c))}catch(x){}render()}});
Object.assign(D,{'g.main':['Główne','Main'],'g.story':['Fabuła i show','Storylines'],'g.fed':['Federacja','Promotion'],'g.world':['Świat','World'],'g.hist':['Kariera','Career'],'g.sys':['System','System']});

Object.assign(ACT,{async ibxnow(e){if(RUN)return;const k=e.dataset.k;ibx();G.defer=G.defer.filter(d=>d.k!==k);await runDeferred(k);save();render()}});
{const _vd=vDash;vDash=function(){return _vd()+angCard()}}
ACHS.push(['ang',()=>(G.angDone||0)>=3]);Object.assign(D,{'ach.ang':['Showrunner: 3 wątki zakończone','Showrunner: 3 storylines finished']});

Object.assign(CHG,{sd(e){START_D=e.value;render()},sch(e){START_CH=e.value;render()}});ACHS.push(['chal',()=>G.chal&&G.chal.res===1]);

{const _vf=vFeuds;vFeuds=function(){return _vf()+feudHistHtml()}}
ACHS.push(['feud5',()=>(G.feudDone||0)>=5]);Object.assign(D,{'ach.feud5':['Reżyser feudów: 5 zakończonych','Feud director: 5 finished feuds']});

{const _vt=vTitles;vTitles=function(){return _vt()+titlesHistHtml()}}

if(hasDoc)init();
;(async()=>{
 const pump=async()=>{for(let k=0;k<60;k++){await new Promise(r=>setTimeout(r,0));if(!document.getElementById('modal').hidden){const o=window.__evOpts;let j=0;if(o){j=Math.floor(Math.random()*o.length);if(o[j]&&o[j].dis)j=0}if(window.__evResolve)window.__evResolve(j)}}};
 lang='pl';let bad=0;const orig=askGeneric;askGeneric=function(title,body,opts){if(/\{[a-z]|undefined|NaN/.test(title+body+opts.map(o=>o.l).join())){bad++;console.log('BAD',title,'|',body)}return orig.apply(this,arguments)};
 const kinds={};const oa=angStart;angStart=function(){const a=oa();if(a)kinds[a.k]=(kinds[a.k]||0)+1;return a};let hits=0,starts=0,defers=0,payoffs=0;
 for(const f of ['kpw','gwf','nfw']){newGame(f);G.fed.cash=3e5;
  for(let i=0;i<110;i++){
   // book angle pairs deliberately when payoff pending
   autoBook();
   const pay=(G.angles||[]).find(a=>a.pay);
   if(pay&&i%2===0){const idx=G.card.findIndex(m=>true);try{const m=G.card[0];m.mode=m.mode||'s11';m.a[0]=pay.ids[0];m.b[0]=pay.ids[1]}catch(e){}}
   const ready=G.card.filter(matchReady);if(ready.length<2){skipWeek();await pump()}else{RUN={fast:true,started:false};G.showResult=false;await runShow();await pump()}
   if(G.fired){G.fired=0}
   if(i%15===0)for(const fn of [vInbox,vDash]){const h=fn();if(/undefined|NaN|\{[a-z]/.test(h))console.log('BAD HTML',fn.name,h.match(/.{0,40}(undefined|NaN|\{[a-z]).{0,40}/)[0])}}
  ibx();console.log(f,'week',G.week,'angDone',G.angDone,'active',G.angles.length,'defer',G.defer.length,'inbox',G.inbox.length,'unread',ibxNew());
  const h=vInbox();if(/undefined|NaN|\{[a-z]/.test(h))console.log('BAD INBOX');
 }
 for(const k of ['fanvote','crowdchant','castguest','mercyplea','crewdrama','fakeinj']){window.__inWE=false;for(let r=0;r<3;r++){const p=WEV[k]();const q=pump();const ok=await p;await q;}}
 console.log('kinds',JSON.stringify(kinds),'revealedFA',G.ws.filter(w=>w.fed==='FA'&&w.trv).length);console.log('bad',bad,'tdone')})();
