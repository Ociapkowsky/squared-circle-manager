
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
