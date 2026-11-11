// ---- Hidden potential + scouting fog ----
const avgSt=w=>(w.ring+w.mic+w.cha)/3;
function hpOf(w){if(w.hp==null){w.hp=clamp(Math.round(avgSt(w)+(w.age<=22?18:w.age<=25?10:w.age<=27?4:0)+(rnd()-.4)*30),25,99);w.hn=rnd()*2-1}return w.hp}
const scoutLvl=()=>{const s=(G.staff||[]).filter(x=>x.role==='scout');return s.length?Math.max.apply(null,s.map(x=>x.lvl||0)):0};
function potErr(w){if(w.rev)return 0;let own=0;if(w.fed===G.fed.id){if(w.sinceF!==G.fed.id){w.sinceF=G.fed.id;w.since=G.week}own=Math.min(10,(G.week-w.since)/6)}return clamp(22-scoutLvl()*.18-own,3,22)}
function potShown(w){const e=potErr(w);return {v:clamp(Math.round(hpOf(w)+(w.hn||0)*e),20,99),e}}
function potTag(w){
 if(w.potEst)return '<span class="tag" style="color:var(--star);border-color:var(--star)">'+t('r.pot')+' '+potStars(w.potEst)+'</span>';
 if(w.age>27||w.farewell)return '';
 const p=potShown(w);return '<span class="tag" style="color:var(--star);border-color:var(--star)" title="'+t('pot.tip')+'">'+t('r.pot')+' '+potStars(p.v)+(p.e===0?' ✔':p.e>=10?' ?':'')+'</span>'}
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
