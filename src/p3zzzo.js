/* ===== Stipulation packs (data-driven; balance set by eye). Add a pack = add rows to STROWS. ===== */
const STNEED={},STCAT={};
const STCATS=[['win','Warunki zwycięstwa','Win conditions'],['cons','Klatki i konstrukcje','Cages and structures'],['wpn','Broń i przedmioty','Weapons and objects'],['cont','Kontenery (trumna, karetka…)','Containers (casket, ambulance…)'],['hard','Hardcore i deathmatch','Hardcore and deathmatch'],['multi','Wieloosobowe i turniejowe','Multi-person and tournament'],['casino','Kasyno i wielkie bitwy','Casino and mass battles'],['out','Poza ringiem i kinowe','Outside the ring and cinematic'],['rules','Zasady sportowe','Sporting rules'],['stake','Stawka (kariera, włosy, pas)','Stakes (career, hair, title)'],['odd','Nietypowe i dziwaczne','Odd and one-off']];
const STP={HC:{hardcore:4,brawler:3,powerhouse:1,technician:-3,highflyer:0,lucha:-1,strong:0},CAGE:{brawler:3,powerhouse:3,hardcore:2,strong:1,highflyer:-1,lucha:-1,technician:0},AIR:{highflyer:4,lucha:4,hardcore:2,technician:-2,powerhouse:-2,strong:-1,brawler:0},TECH:{technician:4,strong:2,hardcore:-2,brawler:-1,powerhouse:0,highflyer:-2,lucha:0},END:{technician:3,strong:4,highflyer:1,lucha:1,powerhouse:-1,brawler:-2,hardcore:-3},FUN:{highflyer:2,lucha:2,hardcore:1,technician:-1,brawler:0,strong:0,powerhouse:0},BRL:{brawler:3,hardcore:3,strong:2,powerhouse:2,technician:-2,highflyer:-1,lucha:-1},MMA:{strong:3,technician:2,brawler:3,powerhouse:1,highflyer:-3,lucha:-3,hardcore:0},NEU:{}};
const STNEEDTXT={ffa:['walki każdy na każdego','free-for-all mode'],ffa5:['walki każdy na każdego (5+ osób)','free-for-all (5+ people)'],big:['walki każdy na każdego (8+ osób)','free-for-all (8+ people)'],team:['walki drużynowej (min. 2 na 2)','a team match (2v2 or more)'],team3:['walki drużynowej (min. 3 na 3)','a team match (3v3 or more)'],multi:['walki min. 3-osobowej','a match with 3+ people'],solo:['walki 1 na 1','a 1v1 match']};
function stNeedOk(m,need){const n=MODES[m.mode];if(!n)return true;const ffa=!!n.ffa,ppl=ffa?n.a:n.a+n.b;
 switch(need){case 'ffa':return ffa&&(n.g||1)===1;case 'ffa5':return ffa&&(n.g||1)===1&&ppl>=5;case 'big':return ffa&&ppl>=8;case 'team':return !ffa&&n.a>=2&&n.b>=2;case 'team3':return !ffa&&n.a>=3&&n.b>=3;case 'multi':return ppl>=3;case 'solo':return !ffa&&n.a===1&&n.b===1}return true}
function stReg(r){const[cat,k,pl,en,dpl,den,tier,cost,inj,dq,lvl,aff,need]=r;STIPS[k]={tier,cost,inj,noDQ:!!dq,aff:STP[aff]||{}};STLVL[k]=lvl;STCAT[k]=cat;if(need)STNEED[k]=need;D['stip.'+k]=[pl,en];D['stipd.'+k]=[dpl,den]}
Object.assign(STCAT,{cage:'cons',extreme:'wpn',tables:'wpn',ladder:'wpn',submission:'win',ironman:'win',lms:'win',prizematch:'stake',tourney:'multi'});
/* [cat,key,pl,en,descPl,descEn,tier,cost,inj,noDQ,platformLvl,affinity,needs] */
const STROWS=[
/* --- pack 1: constructions --- */
['cons','hiac','Hell in a Cell','Hell in a Cell','Ogromna zamknięta klatka z dachem wokół ringu. Brak dyskwalifikacji. Siłacze i zadymiarze błyszczą, ryzyko kontuzji jest wysokie.','A huge roofed cage around the ring. No DQ. Powerhouses and brawlers shine, injury risk is high.',4,.2,1.9,1,2,'CAGE'],
['cons','chamber','Elimination Chamber','Elimination Chamber','Okrągła konstrukcja z kapsułami; zawodnicy wchodzą kolejno, eliminacja przez pinfall lub poddanie.','A circular structure with pods; wrestlers enter in turn and are eliminated by pinfall or submission.',5,.22,2,1,2,'CAGE','multi'],
['cons','wargames','WarGames','WarGames','Dwa ringi pod jedną wielką klatką, drużyny wchodzą falami. Wielka walka drużynowa.','Two rings under one huge cage, teams enter in waves. A grand team war.',5,.25,2,1,2,'BRL','team3'],
['cons','punjabi','Punjabi Prison','Punjabi Prison','Dwie bambusowe klatki jedna w drugiej; wygrywa ten, kto wydostanie się z obu.','Two bamboo cages, one inside the other; escape both to win.',4,.15,2,1,2,'CAGE'],
['cons','fightpit','Fight Pit','Fight Pit','Klatka jak oktagon MMA z podestem zamiast lin; wygrana przez nokaut lub poddanie.','An MMA-style cage with a platform instead of ropes; win by knockout or submission.',3,.1,1.8,1,3,'MMA'],
['cons','kennel','Kennel from Hell','Kennel from Hell','Klatka w klatce, a między nimi biegają psy obronne. Brutalna atmosfera.','A cage inside a cage with guard dogs between them. A brutal atmosphere.',4,.18,1.9,1,2,'CAGE'],
['cons','inferno','Inferno / Ring of Fire','Inferno / Ring of Fire','Ring otoczony płomieniami. Efektowne i niebezpieczne.','The ring is ringed with fire. Spectacular and dangerous.',4,.16,1.7,1,3,'HC'],
['cons','lionsden',"Lion's Den","Lion's Den",'Walka w oktagonie jak w UFC, kończy się nokautem lub poddaniem.','A fight in an octagon like UFC, ending by knockout or submission.',3,.09,1.7,1,2,'MMA'],
['cons','underground','Underground','Underground','Ring bez lin i narożników. Wygrana tylko przez nokaut lub poddanie.','A ring without ropes or corners. Win only by knockout or submission.',3,.08,1.6,1,2,'MMA'],
['cons','barbcage','Klatka z drutem kolczastym','Barbed Wire Steel Cage','Klasyczna klatka zwieńczona drutem kolczastym. Bardzo ostre.','A classic steel cage topped with barbed wire. Very rough.',4,.16,2.2,1,3,'HC'],
/* --- pack 1: weapons --- */
['wpn','hardcore','Hardcore','Hardcore','Brak dyskwalifikacji i falls count anywhere. Wszystko jest bronią.','No DQ and falls count anywhere. Everything is a weapon.',2,.05,1.9,1,2,'HC'],
['wpn','mitb','Money in the Bank Ladder','Money in the Bank Ladder','Wielu zawodników walczy o walizkę z szansą na pas w dowolnym momencie.','Many wrestlers fight for a briefcase with a title shot any time.',4,.2,2.3,1,2,'AIR','multi'],
['wpn','tlc','TLC (stoły, drabiny, krzesła)','TLC (tables, ladders, chairs)','Stoły, drabiny i krzesła są legalne. Wysokie ryzyko kontuzji i widowiskowość.','Tables, ladders and chairs are legal. High injury risk and spectacle.',4,.18,2.4,1,2,'AIR'],
['wpn','chairs','Walka na krzesła','Chairs match','Główną bronią są stalowe krzesła.','Steel chairs are the weapon of choice.',2,.04,1.8,1,2,'HC'],
['wpn','stairs','Walka na schody','Stairs match','Legalną bronią są stalowe schody ringowe.','Steel ring steps are legal weapons.',2,.04,1.7,1,2,'HC'],
['wpn','cane','Singapore Cane / Kendo Stick','Singapore Cane / Kendo Stick','Legalną bronią są kije kendo i laski.','Kendo sticks and canes are legal weapons.',3,.05,1.9,1,3,'HC'],
['wpn','strap','Strap / Bullrope / Łańcuch','Strap / Bullrope / Chain','Rywale są związani pasem, liną lub łańcuchem; trzeba dotknąć wszystkich narożników.','Rivals are tied by a strap, rope or chain; touch all four corners to win.',3,.06,1.4,1,2,'BRL'],
['wpn','dogcollar','Dog Collar','Dog Collar','Rywale połączeni łańcuchem przypiętym do obroży.','Rivals joined by a chain attached to collars.',3,.05,1.6,1,2,'BRL'],
['wpn','itempole','Przedmiot na słupku','Item on a Pole','Przedmiot wisi na słupku w narożniku; kto go zdejmie, użyje go jako broni.','An item hangs on a corner post; whoever takes it uses it as a weapon.',2,.03,1.3,0,1,'FUN'],
['wpn','xmas','Świąteczny Street Fight','Holiday Street Fight','Bójka uliczna z tematycznymi bronimi: choinki, dynie, jedzenie.','A street fight with themed weapons: trees, pumpkins, leftovers.',2,.04,1.5,1,1,'FUN'],
['wpn','donny','Donnybrook','Good Old Fashioned Donnybrook','Dziki Street Fight z improwizowanymi przedmiotami.','A wild street fight with improvised items.',3,.05,1.7,1,2,'FUN'],
['wpn','pitchblack','Pitch Black','Pitch Black','Walka w ciemności, widać tylko światło UV.','A fight in the dark, lit only by UV.',3,.07,1.5,1,2,'FUN'],
['wpn','symphony','Symphony of Destruction','Symphony of Destruction','Legalną bronią są instrumenty muzyczne.','Musical instruments are legal weapons.',3,.06,1.6,1,2,'FUN'],
/* --- pack 1: containers --- */
['cont','casket','Casket Match','Casket Match','Wygrywa ten, kto zamknie rywala w trumnie.','Win by locking the opponent in a casket.',3,.1,1.3,1,2,'BRL'],
['cont','buried','Buried Alive','Buried Alive','Rywala trzeba wrzucić do grobu i zasypać ziemią.','Throw your rival into a grave and bury him.',4,.14,1.4,1,3,'BRL'],
['cont','ambulance','Ambulance Match','Ambulance Match','Rywala trzeba wrzucić do karetki i zamknąć drzwi. Bez przypięć.','Put your rival in an ambulance and shut the doors. No pinfalls.',3,.09,1.5,1,2,'BRL'],
['cont','lastride','Last Ride','Last Ride','Odmiana Ambulance Matchu z karawanem.','An Ambulance Match variant with a hearse.',3,.09,1.4,1,2,'BRL'],
['cont','stretcher','Stretcher Match','Stretcher Match','Rywala trzeba położyć na noszach i przewieźć za linię.','Put your rival on a stretcher and wheel him past a line.',2,.05,1.3,1,2,'BRL'],
['cont','dumpster','Dumpster Match','Dumpster Match','Wygrywa ten, kto wrzuci rywala do kontenera na śmieci.','Win by throwing your rival into a dumpster.',2,.05,1.4,1,2,'BRL'],
['cont','bodybag','Body Bag Match','Body Bag Match','Wygrywa ten, kto zapakuje rywala do worka.','Win by zipping your rival into a body bag.',3,.07,1.3,1,2,'BRL'],
/* --- pack 1: win conditions --- */
['win','iquit','I Quit','I Quit','Walka kończy się słowem „poddaję się" do mikrofonu. Silnie podkręca feudy.','Ends when someone says "I quit" into the mic. Strongly heats feuds.',3,.04,1.6,1,2,'BRL'],
['win','firstblood','First Blood','First Blood','Kończy się, gdy ktoś zacznie krwawić.','Ends when someone bleeds.',3,.03,1.5,1,3,'BRL'],
['win','twofalls','Do dwóch wygranych (2 out of 3)','2 out of 3 Falls','Walka do dwóch wygranych przypięć lub poddań.','First to two falls wins.',2,0,1.2,0,1,'END'],
['win','threestages','Three Stages of Hell','Three Stages of Hell','Trzy różne stypulacje, do dwóch zwycięstw.','Three different stipulations, best of three.',4,.12,1.9,1,2,'END'],
['win','fca','Falls Count Anywhere','Falls Count Anywhere','Przypięcia liczą się w całej hali i poza nią.','Pinfalls count anywhere in and outside the arena.',2,.03,1.5,1,2,'HC'],
['win','blindfold','Blindfold Match','Blindfold Match','Zawodnicy walczą z zawiązanymi oczami.','Wrestlers fight blindfolded.',3,.04,1.3,0,2,'FUN'],
['win','flag','Flag Match','Flag Match','Zdobądź flagę rywala i zanieś ją do swojego narożnika.','Capture the rival\'s flag and carry it to your corner.',3,.05,1.2,1,1,'FUN'],
['win','beatclock','Beat the Clock','Beat the Clock','Wygrywa ten, kto pokona rywala w najkrótszym czasie.','Win by beating your rival in the shortest time.',2,.02,1.1,0,1,'END'],
['win','lumberjack','Lumberjack','Lumberjack','Ring otoczony drwalami, którzy wrzucają z powrotem każdego, kto wypadnie.','The ring is ringed by lumberjacks who throw back anyone who falls out.',3,.08,1.2,0,1,'BRL'],
['win','referee','Specjalny sędzia','Special Guest Referee','Walkę sędziuje inny wrestler lub celebryta.','Another wrestler or a celebrity referees.',2,.02,1,0,1,'NEU'],
['win','pinonly','Tylko pinfall','Pinfall Only','Bez poddań, count-outów i DQ. Czysty pinfall.','No submissions, count-outs or DQs. Pinfall only.',1,0,1,0,1,'TECH'],
['win','finisher','Walka o finisher','Finisher Match','Wygrywa ten, kto wykona konkretną akcję kończącą.','Win by hitting a specific finishing move.',2,.01,1,0,1,'NEU'],
/* --- pack 1: multi / tournament --- */
['multi','scramble','Championship Scramble','Championship Scramble','Pięciu zawodników, każde przypięcie daje tymczasowy tytuł; wygrywa ten, kto ma go po czasie.','Five wrestlers; each pin gives a temporary title; whoever holds it at the bell wins.',3,.08,1.4,1,1,'AIR','ffa5'],
['multi','battleroyal','Battle Royal','Battle Royal','Wielu zawodników; eliminacja przez wyrzucenie nad górną liną.','Many wrestlers; eliminate by throwing over the top rope.',2,.06,1.5,1,1,'BRL','ffa5'],
['multi','rumble','Royal Rumble','Royal Rumble','Zawodnicy wchodzą w odstępach, eliminacja nad górną liną. Wielki show.','Wrestlers enter at intervals and are eliminated over the top rope. A big show.',4,.2,1.7,1,1,'BRL','big'],
['multi','gauntlet','Gauntlet','Gauntlet','Seria walk, zwycięzca zostaje w ringu i mierzy się z kolejnym.','A series of matches; the winner stays and faces the next one.',2,.05,1.5,0,1,'END','ffa'],
['multi','survivor','Survivor Series Elimination','Survivor Series Elimination','Drużyny walczą do pełnej eliminacji przeciwników.','Teams fight until one is fully eliminated.',3,.08,1.4,0,1,'END','team3'],
['multi','tornado','Tornado Tag','Tornado Tag','Wszyscy są legalnie w ringu jednocześnie, bez zmian.','Everyone is legal at once, no tags.',2,.03,1.5,1,1,'BRL','team'],
['multi','ironsurv','Iron Survivor','Iron Survivor','Walka na czas z punktacją; przypięty trafia do boksu kar.','A timed match with points; the pinned wrestler goes to a penalty box.',3,.08,1.5,0,1,'END','ffa5'],
['multi','mixedtag','Mixed Tag','Mixed Tag','Drużyny mieszane: mężczyźni walczą z mężczyznami, kobiety z kobietami.','Mixed teams: men face men, women face women.',2,.02,1,0,1,'NEU','team'],
/* --- pack 1: outside / cinematic --- */
['out','emptyarena','Pusta hala','Empty Arena','Walka przy pustych trybunach.','A fight in an empty arena.',2,.02,1,0,1,'FUN'],
['out','boiler','Boiler Room Brawl','Boiler Room Brawl','Bójka w kotłowni; wygrywa ten, kto wyjdzie pierwszy.','A brawl in the boiler room; first to escape wins.',3,.05,1.5,1,2,'BRL'],
['out','parking','Parking Lot Brawl','Parking Lot Brawl','Walka na parkingu między samochodami.','A fight in the parking lot among cars.',3,.05,1.5,1,2,'BRL'],
['out','backstage','Backstage / Supermarket Brawl','Backstage / Supermarket Brawl','Bójka na zapleczu lub w sklepie.','A brawl backstage or in a supermarket.',2,.04,1.4,1,1,'FUN'],
['out','cinematic','Walka filmowa','Cinematic Match','Nagrywana walka w stylu filmowym: cmentarz, bagna, siedziba federacji.','A filmed cinematic fight: cemetery, swamp, company HQ.',4,.2,1.1,0,1,'FUN'],
/* --- pack 1: stakes --- */
['stake','loserleaves','Przegrany odchodzi','Loser Leaves Town','Narracyjna stawka: przegrany odchodzi (bez efektu w grze).','A story stake: the loser leaves (no gameplay effect).',3,.02,1,0,1,'NEU'],
['stake','career','Stawką jest kariera','Career on the Line','Narracyjna stawka: przegrany kończy karierę (bez efektu w grze).','A story stake: the loser retires (no gameplay effect).',4,.03,1,0,1,'NEU'],
['stake','maskhair','Maska / włosy','Mask / Hair','Przegrany traci maskę albo włosy (narracyjnie).','The loser loses his mask or hair (story only).',3,.02,1,0,1,'FUN'],
['stake','titletitle','Pas przeciwko pasowi','Title vs. Title','Walka o dwa pasy jednocześnie, zwycięzca bierze wszystko.','A match for two titles at once; winner takes all.',4,.03,1,0,1,'NEU'],
['stake','custody','Walka o opiekę','Custody Ladder Match','Jednorazowa drabinowa walka o prawa do opieki nad dzieckiem.','A one-off ladder match for custody of a child.',3,.1,2,1,1,'AIR'],
['stake','kissfoot','Kiss My Foot','Kiss My Foot','Przegrany całuje stopę zwycięzcy.','The loser kisses the winner\'s foot.',2,.01,1,0,1,'FUN'],
/* --- pack 1: odd --- */
['odd','brapanties','Bra & Panties / Evening Gown','Bra & Panties / Evening Gown','Walka na zdzieranie ubrań (retro, kontrowersyjna).','A match stripping clothes (retro and controversial).',2,.02,1,0,3,'FUN'],
['odd','pudding','Budyń / sos / błoto','Pudding / Gravy / Mud','Walka w basenie budyniu, sosu lub błota.','A fight in a pool of pudding, gravy or mud.',2,.04,1.2,0,2,'FUN'],
['odd','pillow','Walka na poduszki','Pillow Fight','Poduszki w łóżku na środku ringu.','Pillows on a bed in the middle of the ring.',1,.01,1,0,1,'FUN'],
['odd','hogpen','Hog Pen','Hog Pen','Walka w zagrodzie dla świń pełnej błota.','A fight in a muddy hog pen.',2,.05,1.2,0,3,'FUN'],
['odd','duchess','Duchess of Queensbury Rules','Duchess of Queensbury Rules','Zasady wymyślane na bieżąco w trakcie walki.','The rules are made up on the fly.',2,.01,1,0,1,'FUN'],
['odd','armwrest','Siłowanie / przeciąganie liny','Arm Wrestling / Tug of War','Konkursy siłowe jako oficjalne pojedynki.','Strength contests as official matches.',1,.01,.8,0,1,'FUN','solo'],
['odd','eyeeye','Eye for an Eye','Eye for an Eye','Warunek zwycięstwa: „wyłupienie" oka przeciwnikowi.','Win by "gouging" the opponent\'s eye.',3,.03,1.3,1,3,'HC'],
/* --- pack 2 (casino / AEW-style) --- */
['casino','casinobr','Casino Battle Royale','Casino Battle Royale','Wielka bitwa z grupami kart i Jokerem; wejścia co kilka minut.','A big battle with card-suit groups and a Joker; entrants every few minutes.',5,.22,1.5,1,1,'BRL','big'],
['casino','casinoladder','Casino Ladder','Casino Ladder','Drabinowa z wielkim żetonem nad ringiem; wchodzą kolejno.','A ladder match with a giant chip above the ring; wrestlers enter in turn.',5,.2,2.2,1,1,'AIR','big'],
['casino','casinogaunt','Casino Gauntlet','Casino Gauntlet','Losowe wejścia, bez eliminacji, koniec po pierwszym pinfallu lub poddaniu.','Random entrances, no eliminations, ends on the first fall.',5,.2,1.4,0,1,'END','big'],
['casino','rampage','Royal Rampage','Royal Rampage','Battle Royal w dwóch ringach, zwycięzcy walczą na koniec.','A Battle Royal in two rings; the winners meet at the end.',4,.18,1.5,1,1,'BRL','big'],
['casino','bloodguts','Blood and Guts','Blood and Guts','Dwa ringi pod klatką z dachem, drużyny wchodzą falami; wygrana tylko przez poddanie.','Two rings under a roofed cage, teams enter in waves; win only by submission.',5,.25,2,1,2,'BRL','team3'],
['casino','stadium','Stadium Stampede','Stadium Stampede','Chaotyczna bójka drużynowa na całym stadionie.','A chaotic team brawl all over the stadium.',5,.25,1.8,1,2,'BRL','team'],
['casino','anarchy','Anarchy in the Arena','Anarchy in the Arena','Walka drużynowa bez zasad po całej hali.','A rule-free team fight all over the arena.',4,.15,1.8,1,2,'BRL','team'],
['hard','lightsout','Lights Out (nieusankcjonowana)','Lights Out (Unsanctioned)','Federacja zrzeka się odpowiedzialności; brak zasad.','The promotion disclaims responsibility; no rules.',3,.08,2,1,3,'HC'],
['hard','texas','Texas Deathmatch','Texas Deathmatch','Bez DQ; poddanie albo nokaut na dziesięć.','No DQ; submission or knockout on a ten count.',3,.06,1.9,1,3,'HC'],
['hard','explodebw','Exploding Barbed Wire','Exploding Barbed Wire','Druty kolczaste z ładunkami zamiast lin; ring wybucha po czasie.','Barbed wire with explosives instead of ropes; the ring blows after the time limit.',5,.22,2.6,1,3,'HC'],
['hard','barbedeverywhere','Barbed Wire Everywhere','Barbed Wire Everywhere','Drut kolczasty wszędzie, bez DQ.','Barbed wire everywhere, no DQ.',4,.15,2.3,1,3,'HC'],
['hard','coffin','Coffin Match','Coffin Match','Odmiana Casket Matchu: zamknij rywala w trumnie.','A Casket Match variant: shut your rival in a coffin.',3,.1,1.3,1,2,'BRL'],
['hard','bunkhouse','Bunkhouse / Street Fight','Bunkhouse / Street Fight','Bójka w ubraniach ulicznych, z pinezkami, szkłem, drutem.','A brawl in street clothes with tacks, glass and wire.',2,.04,1.7,1,2,'BRL'],
['hard','arcade','Arcade Anarchy','Arcade Anarchy','Bez DQ wśród automatów, pluszaków i gadżetów.','No DQ among arcade machines, plushies and gadgets.',3,.07,1.4,1,1,'FUN'],
['hard','mimosa','Mimosa Mayhem','Mimosa Mayhem','Można wygrać wrzucając rywala do zbiornika z koktajlem.','You can win by throwing your rival into a tank of cocktail.',3,.05,1.2,1,1,'FUN'],
['rules','eliminator','Title Eliminator','Title Eliminator','Pas nie jest na szali, ale zwycięzca zdobywa walkę o pas.','The title is not at stake, but the winner earns a title shot.',2,.01,1,0,1,'NEU'],
['rules','ccrules','Continental Classic Rules','Continental Classic Rules','20 minut, brak osób przy ringu, zakaz interwencji.','20 minutes, nobody ringside, no interference.',3,.02,1,0,1,'TECH'],
['rules','houserules','House Rules','House Rules','Pretendent wybiera jedną własną zasadę, 20 sekund poza ringiem.','The challenger picks one rule; only 20 seconds outside the ring.',3,.02,1,0,1,'NEU'],
['rules','ftw','FTW Rules','FTW Rules','Pełny brak dyskwalifikacji i wyliczeń.','No disqualifications or counts at all.',2,.02,1.5,1,1,'HC'],
['rules','purewrest','Pure Wrestling Rules','Pure Wrestling Rules','Sędziowie punktowi, limit rope breaks, zakaz uderzeń pięścią.','Point judges, limited rope breaks, no closed-fist strikes.',2,0,.9,0,1,'TECH'],
['rules','mma','MMA Rules','MMA Rules','Nokaut, poddanie lub decyzja sędziego.','Knockout, submission or judges\' decision.',3,.05,1.6,1,2,'MMA'],
/* --- pack 3 (X-Division / hardcore classics) --- */
['cons','ultimatex','Ultimate X','Ultimate X','Słupy i liny w kształcie X nad ringiem; zdejmij zawieszony cel. Bez drabin.','Posts and ropes forming an X above the ring; retrieve the hanging prize. No ladders.',4,.18,2,1,2,'AIR'],
['cons','kotm','King of the Mountain','King of the Mountain','Odwrócona drabinowa: zawieś pas na haku. Przypięty trafia na karę.','A reverse ladder match: hang the title on the hook. The pinned wrestler goes to a penalty box.',4,.16,2.1,1,2,'AIR','ffa5'],
['cons','elevationx','Elevation X','Elevation X','Walka na rusztowaniu w kształcie X wysoko nad ringiem. Wygrywa ten, kto zrzuci rywala.','A match on an X-shaped scaffold high above the ring. Win by throwing your rival off.',5,.22,2.5,1,3,'AIR'],
['cons','steelasylum','Steel Asylum / TerrorDome','Steel Asylum / TerrorDome','Klatka-kopuła z dachem; ucieczka przez otwór na szczycie.','A dome cage with a roof; escape through the hole at the top.',4,.15,1.8,1,2,'CAGE'],
['cons','sixsides','Six Sides of Steel','Six Sides of Steel','Sześciokątna klatka; ucieczka górą albo wcale.','A hexagonal steel cage; escape over the top or not at all.',3,.11,1.5,1,2,'CAGE'],
['cons','xscape','Xscape','Xscape','Wieloosobowa walka w klatce: eliminacje, a na końcu ucieczka.','A multi-person cage match: eliminations, then an escape finish.',4,.15,1.6,1,2,'CAGE','multi'],
['cons','lockdown','Lethal Lockdown','Lethal Lockdown','Drużynowa klatka z dachem pełnym broni, który się opuszcza.','A team cage match with a weapon-laden roof lowered onto it.',5,.24,2.2,1,2,'BRL','team3'],
['hard','monstersball',"Monster's Ball","Monster's Ball",'Bez DQ i z ekstremalnymi broniami; uczestnicy podobno trzymani w izolatkach.','No DQ and extreme weapons; the participants were supposedly isolated beforehand.',4,.14,2.1,1,3,'HC'],
['hard','fullmetal','Full Metal Mayhem','Full Metal Mayhem','TLC z legalnymi stalowymi łańcuchami od początku.','TLC with legal steel chains from the start.',4,.18,2.4,1,2,'AIR'],
['hard','houseoffun','House of Fun','House of Fun','Broń zawieszona na łańcuchach nad ringiem, wygrana przez stoły lub falls count anywhere.','Weapons hang from chains above the ring; win through tables or falls count anywhere.',3,.1,1.8,1,2,'HC'],
['hard','bwmassacre','Barbed Wire Massacre','Barbed Wire Massacre','Liny zamienione na drut kolczasty, wokół ringu drucianki.','Ropes replaced by barbed wire, with wire structures around the ring.',4,.15,2.3,1,3,'HC'],
['hard','doomsday','Doomsday Chamber of Blood','Doomsday Chamber of Blood','Klatka z drutem; przypiąć można tylko krwawiącego.','A barbed-wire cage; you can only pin a bleeding opponent.',4,.14,2.2,1,3,'HC'],
['hard','hangman','Hangman\'s Horror','Hangman\'s Horror','Obroże na łańcuchu; przerzuć rywala przez linę, by zawisł.','Collars on a chain; throw your rival over the rope so he hangs.',4,.12,2,1,3,'HC','solo'],
['hard','tacks','Match of 10,000 Tacks','Match of 10,000 Tacks','Tysiące pinezek na macie; wygrywa ten, kto rzuci w nie rywala.','Thousands of tacks on the mat; win by throwing your rival into them.',4,.1,2.1,1,3,'HC'],
['multi','feast','Feast or Fired','Feast or Fired','Cztery walizki na słupkach: trzy z szansami na pas, jedna ze zwolnieniem.','Four briefcases on the posts: three title shots and one firing.',4,.1,1.5,1,1,'AIR','multi'],
['multi','gftg','Gauntlet for the Gold','Gauntlet for the Gold','Rumble z finałem 1 na 1, gdy zostanie dwóch.','A Rumble that becomes a 1v1 when two remain.',4,.15,1.6,1,1,'BRL','big'],
['multi','reversebr','Reverse Battle Royal','Reverse Battle Royal','Wszyscy zaczynają poza ringiem i wspinają się do środka.','Everyone starts outside the ring and climbs in.',3,.07,1.6,1,1,'BRL','big'],
['multi','queencage','Queen of the Cage','Queen of the Cage','Zaczynają na zewnątrz klatki, dwie pierwsze, które wejdą, walczą o wygraną.','They start outside the cage; the first two in fight for the win.',4,.14,1.6,1,2,'CAGE','ffa5'],
['multi','deadlydraw','Deadly Draw','Deadly Draw','Czterech zawodników; co 5 minut dołącza kolejny.','Four wrestlers; another joins every 5 minutes.',3,.06,1.4,0,1,'END','ffa'],
['odd','electrified','Electrified Six Sides of Steel','Electrified Six Sides of Steel','Klatka pod prądem z efektownymi iskrami (teatralnie).','An electrified cage with sparks (theatrical).',3,.12,1.4,1,2,'FUN'],
['odd','fishmarket','Fish Market Street Fight','Fish Market Street Fight','Bójka wśród stoisk z rybami i owocami morza.','A street fight among stalls of fish and seafood.',2,.05,1.4,1,1,'FUN'],
['odd','lastrites','Last Rites','Last Rites','Casket Match z trumną opuszczaną z sufitu po walce.','A Casket Match with the coffin lowered from the ceiling afterwards.',3,.1,1.3,1,2,'BRL'],
['odd','committed','Committed Match','Committed Match','Ambulance Match z furgonetką szpitala psychiatrycznego.','An Ambulance-style match with a psychiatric hospital van.',3,.09,1.4,1,2,'BRL'],
['odd','fansrevenge','Fan\'s Revenge Lumberjack','Fan\'s Revenge Lumberjack','Drwalami są kibice uzbrojeni w pasy.','The lumberjacks are fans armed with belts.',3,.08,1.4,0,1,'BRL'],
['odd','streetvar','Uliczne bójki tematyczne','Themed street fights','8 Mile, Little Italy i inne bójki nawiązujące do gimmicków zawodników.','8 Mile, Little Italy and other brawls tied to the wrestlers\' gimmicks.',2,.04,1.5,1,1,'FUN']
];
STROWS.forEach(stReg);
Object.assign(D,{'stip.need':['(wymaga: {v})','(needs: {v})'],'stip.need.ffa':STNEEDTXT.ffa,'stip.need.ffa5':STNEEDTXT.ffa5,'stip.need.big':STNEEDTXT.big,'stip.need.team':STNEEDTXT.team,'stip.need.team3':STNEEDTXT.team3,'stip.need.multi':STNEEDTXT.multi,'stip.need.solo':STNEEDTXT.solo});
STCATS.forEach(c=>{D['stc.'+c[0]]=[c[1],c[2]]});
function stipOpts(m){
 const mk=k=>{const s=STIPS[k],lock=G.fed.tier<s.tier,pl=lvlOf(k)>maxLvl(),nd=!!STNEED[k]&&!stNeedOk(m,STNEED[k]);
  return '<option value="'+k+'"'+(m.stip===k?' selected':'')+(lock||pl||nd?' disabled':'')+'>'+t('stip.'+k)+(lock?' '+t('stip.lock',{v:t('tier.'+s.tier)}):pl?' '+t('stip.plat'):nd?' '+t('stip.need',{v:t('stip.need.'+STNEED[k])}):'')+'</option>'};
 let h=mk('none');const seen={none:1};
 STCATS.forEach(c=>{const ks=Object.keys(STIPS).filter(k=>STCAT[k]===c[0]&&(k!=='tourney'||m.stip==='tourney')).sort((a,b)=>STIPS[a].tier-STIPS[b].tier);ks.forEach(k=>seen[k]=1);if(ks.length)h+='<optgroup label="'+esc(t('stc.'+c[0]))+'">'+ks.map(mk).join('')+'</optgroup>'});
 const rest=Object.keys(STIPS).filter(k=>!seen[k]&&(k!=='tourney'||m.stip==='tourney'));if(rest.length)h+=rest.map(mk).join('');
 return h}
const _fixMatchSt=fixMatch;fixMatch=function(m){_fixMatchSt(m);try{if(STNEED[m.stip]&&!stNeedOk(m,STNEED[m.stip]))m.stip='none'}catch(e){}};
