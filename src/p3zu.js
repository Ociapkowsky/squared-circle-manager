// ---- v93: booker levels, XP and skill tree ----
const BK_MAX=30;
const BKT=[[1,'Stażysta','Intern'],[5,'Młodszy booker','Junior booker'],[10,'Booker','Booker'],[15,'Starszy booker','Senior booker'],[20,'Główny booker','Head booker'],[25,'Wizjoner','Visionary'],[30,'Legenda branży','Industry legend']];
// [key, branch, max, reqLevel, plName, enName, plDesc, enDesc, perRank(number used in {v}), unit]
const BKS=[
 ['eye','bk',5,1,'Oko do gwiazd','Eye for stars','Każdy pojedynek ma +{v} gwiazdki.','Every match gets +{v} stars.',.03,'f'],
 ['arch','bk',3,5,'Architekt main eventu','Main event architect','Walka wieczoru ma dodatkowo +{v} gwiazdki.','The main event gets an extra +{v} stars.',.05,'f'],
 ['stor','bk',3,10,'Opowieść o feudzie','Feud storyteller','Po dobrej gali (3+ gwiazdki) popularność rośnie o +{v}.','After a good show (3+ stars) popularity rises by +{v}.',.07,'f'],
 ['fin','bk',3,16,'Idealne finały','Perfect finishes','Po gali na 4+ gwiazdki: popularność +{v} i dodatkowe XP.','After a 4+ star show: popularity +{v} and bonus XP.',.1,'f'],
 ['spons','bz',5,1,'Nos do sponsorów','Sponsor magnet','Zyski z gali są wyższe o {v}.','Show profits are {v} higher.',1.5,'%'],
 ['cut','bz',3,5,'Cięcie kosztów','Cost cutting','Straty z gali są niższe o {v}.','Show losses are {v} lower.',3,'%'],
 ['sal','bz',3,8,'Lepszy kontrakt','Better contract','Twoja pensja bookera jest wyższa o {v}.','Your booker salary is {v} higher.',7,'%'],
 ['inv','bz',3,14,'Rekin giełdy','Market shark','Inwestycje rosną o dodatkowe {v} tygodniowo.','Investments grow an extra {v} weekly.',.04,'%'],
 ['cha','lu',5,1,'Charyzma','Charisma','Zyski relacji są większe o {v}.','Relationship gains are {v} bigger.',10,'%'],
 ['neg','lu',4,6,'Twardy negocjator','Tough negotiator','Kontrakty zawodników są tańsze o {v}.','Wrestler contracts are {v} cheaper.',3,'%'],
 ['loc','lu',3,9,'Ojciec szatni','Locker-room father','Nastroje zawodników rosną o {v} tygodniowo.','Wrestler morale rises by {v} weekly.',.25,'f'],
 ['dip','lu',3,12,'Dyplomata','Diplomat','Zaufanie rady rośnie o {v} tygodniowo (do 90).','Board confidence rises by {v} weekly (up to 90).',.08,'f'],
 ['rep','ka',5,1,'Renoma','Renown','Reputacja kariery +{v} pkt.','Career reputation +{v} pts.',1.5,'f'],
 ['int','ka',3,7,'Rozmowy kwalifikacyjne','Interview ace','Szansa na przyjęcie aplikacji +{v}.','Job application success chance +{v}.',4,'%'],
 ['men','ka',3,3,'Szybki uczeń','Fast learner','Zdobywasz o {v} więcej XP.','You earn {v} more XP.',10,'%'],
 ['img','ka',3,11,'Wizerunek','Public image','Prestiż +{v} pkt.','Prestige +{v} pts.',2,'f']
];
const BKB={bk:['Booking','Booking'],bz:['Biznes','Business'],lu:['Ludzie','People'],ka:['Kariera','Career']};
function bkEnsure(){const m=meW();if(!m)return null;if(!m.bk){m.bk={xp:0,lv:1,sp:1,sk:{},tier:G.fed.tier,bkt:G.bkTitles||0,fd:G.feudDone||0,hof:(G.hof||[]).length,resets:0,tot:0}}return m.bk}
function bkR(k){const m=G.me;return m&&m.bk&&m.bk.sk[k]||0}
function bkV(k){const s=BKS.find(x=>x[0]===k);return s?bkR(k)*s[8]:0}
function bkNeed(l){return 50+30*l}
function bkTitle(l){let r=BKT[0];BKT.forEach(x=>{if(l>=x[0])r=x});return r}
function bkXp(n,why){const b=bkEnsure();if(!b||b.lv>=BK_MAX||!(n>0))return;n=Math.round(n*(1+bkV('men')/100));b.xp+=n;b.tot+=n;
 while(b.lv<BK_MAX&&b.xp>=bkNeed(b.lv)){b.xp-=bkNeed(b.lv);b.lv++;b.sp+=1+(b.lv%5===0?1:0);addNews('n.bklv',{l:b.lv,r:lang==='pl'?bkTitle(b.lv)[1]:bkTitle(b.lv)[2]});
  G.ach=G.ach||{};if(b.lv>=10&&!G.ach.bklv10)G.ach.bklv10=G.week;if(b.lv>=BK_MAX&&!G.ach.bklv30)G.ach.bklv30=G.week}
 if(b.lv>=BK_MAX)b.xp=0}
function bkCanUp(k){const b=bkEnsure();const s=BKS.find(x=>x[0]===k);if(!b||!s)return false;return b.sp>0&&b.sk[k]!==undefined?b.sk[k]<s[2]&&b.lv>=s[3]:b.sp>0&&b.lv>=s[3]}
function bkUp(k){const b=bkEnsure();const s=BKS.find(x=>x[0]===k);if(!b||!s)return false;const r=b.sk[k]||0;if(b.sp<1||r>=s[2]||b.lv<s[3])return false;b.sk[k]=r+1;b.sp--;return true}
function bkResetCost(){const b=bkEnsure();return b?400+250*b.lv:0}
function bkReset(){const b=bkEnsure(),m=meW();if(!b||!m)return false;const spent=Object.keys(b.sk).reduce((a,k)=>a+b.sk[k],0);if(!spent)return false;const c=bkResetCost();if(m.wallet<c)return false;m.wallet-=c;b.sp+=spent;b.sk={};b.resets++;return true}
// --- effects ---
const _bs0=baseStars;baseStars=function(m,pos,total){let r=_bs0(m,pos,total);if(G.me&&G.me.bk){r+=bkV('eye');if(pos===total-1)r+=bkV('arch')}return r};
const _fs0=finishShow;finishShow=function(out){const c0=G.fed.cash,p0=G.fed.pop;_fs0(out);const b=bkEnsure();if(!b)return;
 const d=G.fed.cash-c0;if(d>0&&bkR('spons'))G.fed.cash+=d*bkV('spons')/100;else if(d<0&&bkR('cut'))G.fed.cash+=-d*bkV('cut')/100;
 const r=G.lastRating||0;if(r>=3&&bkR('stor'))xpop(bkV('stor'));if(r>=4&&bkR('fin')){xpop(bkV('fin'));bkXp(bkR('fin')*3)}
 bkXp(Math.round(r*6)+(r>=4?10:0)+(r>=4.5?15:0))};
const _sal0=meSalary;meSalary=function(){return Math.round(_sal0()*(1+bkV('sal')/100))};
const _rd0=relDisc;relDisc=function(w){return clamp(_rd0(w)*(1-bkV('neg')/100),.4,1.25)};
const _ra0=relAdd;relAdd=function(pid,dv,dr){if(dv>0)dv*=1+bkV('cha')/100;return _ra0(pid,dv,dr)};
const _cr2=careerRep;careerRep=function(){return _cr2()+bkV('rep')+(G.me&&G.me.bk?G.me.bk.lv*.4:0)};
const _ac0=applyChance;applyChance=function(r,bonus){return _ac0(r,(bonus||0)+bkV('int')/100)};
const _pp0=prestigePts;prestigePts=function(){return _pp0()+bkV('img')};
const _iwbk=infraWeekly;infraWeekly=function(){_iwbk();const b=bkEnsure();if(!b)return;const m=meW();
 if(bkR('loc'))mine().forEach(w=>evMood(w,bkV('loc')));
 if(bkR('dip')){const bd=boardEnsure();if(bd.conf<90)bd.conf=clamp(bd.conf+bkV('dip'),0,90)}
 if(bkR('inv')&&m.inv){const g=bkV('inv')/100;['idx','re','stp'].forEach(k=>{m.inv[k]=Math.round(m.inv[k]*(1+g))})}
 bkXp(2);
 if(G.fed.tier>b.tier){bkXp(90*(G.fed.tier-b.tier));b.tier=G.fed.tier}
 if((G.bkTitles||0)>b.bkt){bkXp(150*((G.bkTitles||0)-b.bkt));b.bkt=G.bkTitles||0}
 if((G.feudDone||0)>b.fd){bkXp(12*((G.feudDone||0)-b.fd));b.fd=G.feudDone||0}
 const hl=(G.hof||[]).length;if(hl>b.hof){bkXp(25*(hl-b.hof));b.hof=hl}};
// --- screen ---
function vBk(){const b=bkEnsure();if(!b)return '<div class="top"><div><h2>'+t('nav.bk')+'</h2></div></div><div class="card mute">'+t('tcg.nome')+'</div>';
 const tt=bkTitle(b.lv),pct=b.lv>=BK_MAX?100:Math.round(b.xp/bkNeed(b.lv)*100);
 let h='<div class="top"><div><h2>'+t('nav.bk')+'</h2><div class="mute">'+t('bk.sub')+'</div></div></div>';
 h+='<div class="card stack"><div class="row spread" style="flex-wrap:wrap;gap:8px"><span><b style="font-size:20px">'+t('bk.lv',{l:b.lv})+'</b> <span class="mute">· '+(lang==='pl'?tt[1]:tt[2])+'</span></span><span class="mute">'+(b.lv>=BK_MAX?t('bk.max'):t('bk.xp',{a:b.xp,b:bkNeed(b.lv)}))+'</span></div>'+
  '<div style="height:10px;background:var(--line);border-radius:5px;overflow:hidden"><div style="height:10px;width:'+pct+'%;background:var(--gold)"></div></div>'+
  '<div class="row spread" style="flex-wrap:wrap;gap:8px"><span>'+t('bk.sp')+': <b>'+b.sp+'</b></span><span class="row" style="gap:8px"><span class="mute" style="font-size:13px">'+t('bk.rc',{c:money(bkResetCost())})+'</span><button class="btn sm" data-act="bkreset"'+(meW().wallet>=bkResetCost()&&Object.keys(b.sk).length?'':' disabled')+'>'+t('bk.reset')+'</button></span></div>'+
  '<div class="mute" style="font-size:13px">'+t('bk.how')+'</div></div>';
 ['bk','bz','lu','ka'].forEach(br=>{h+='<div class="card stack"><h3>'+BKB[br][lang==='pl'?0:1]+'</h3>';
  BKS.filter(s=>s[1]===br).forEach(s=>{const r=bkR(s[0]),lock=b.lv<s[3];const cur=(s[9]==='f'?Math.round(r*s[8]*100)/100:Math.round(r*s[8]*100)/100)+(s[9]==='%'?'%':'');
   const nx=Math.round((r+1)*s[8]*100)/100+(s[9]==='%'?'%':'');
   let pips='';for(let i=0;i<s[2];i++)pips+='<span style="display:inline-block;width:10px;height:10px;margin-right:3px;border-radius:2px;border:1px solid var(--gold);background:'+(i<r?'var(--gold)':'transparent')+'"></span>';
   h+='<div class="row spread" style="gap:10px;flex-wrap:wrap;'+(lock?'opacity:.55':'')+'"><div style="min-width:220px;flex:1"><b>'+s[lang==='pl'?4:5]+'</b> '+pips+(lock?' <span class="mute" style="font-size:12px">'+t('bk.req',{l:s[3]})+'</span>':'')+
   '<div class="mute" style="font-size:13px">'+t(lang==='pl'?'bk.now':'bk.now',{})+' '+(r?s[lang==='pl'?6:7].replace('{v}',cur):'—')+'</div></div>'+
   '<button class="btn sm'+(!lock&&b.sp>0&&r<s[2]?' gold':'')+'" data-act="bkup" data-k="'+s[0]+'"'+(!lock&&b.sp>0&&r<s[2]?'':' disabled')+'>'+(r>=s[2]?t('bk.maxr'):'+1'+(r<s[2]?' → '+nx:''))+'</button></div>'});
  h+='</div>'});
 return h}
// --- events ---
const bkGate=(l)=>()=>!!meW()&&bkEnsure().lv>=(l||1);
const XSB=[
{k:'seminar',t:['Seminarium dla bookerów','Bookers\' seminar'],b:['Branżowe seminarium dla bookerów kosztuje {m}. Dobra okazja do nauki.','An industry seminar for bookers costs {m}. A good chance to learn.'],v:()=>{const c=xc(.05);return {c,m:money(c)}},o:[['Zapisz się ({m})','Sign up ({m})'],['Pomiń','Skip']],cost:[1,0],gate:bkGate(1),n:[['Wracasz z głową pełną pomysłów.','You come back full of ideas.'],['Sezon bez szkoleń.','A season without training.']],fx:[v=>{xcash(-v.c);bkXp(80)},()=>{bkXp(10)}]},
{k:'legendmentor',t:['Legenda oferuje mentoring','A legend offers mentoring'],b:['Emerytowany booker-legenda proponuje Ci kilka rozmów o tym, jak układać karty.','A retired legendary booker offers a few talks about building cards.'],o:[['Przyjmij ofertę','Accept the offer'],['Podziękuj grzecznie','Politely decline']],gate:bkGate(3),n:[['Rady legendy są bezcenne.','The legend\'s advice is priceless.'],['Okazja przepadła.','The chance is gone.']],fx:[()=>{bkXp(90);xconf(2)},()=>{}]},
{k:'bookdeal',t:['Książka o bookingu','A book about booking'],b:['Wydawca chce, żebyś napisał książkę o prowadzeniu federacji. Zajmie to sporo czasu.','A publisher wants you to write a book about running a promotion. It takes plenty of time.'],o:[['Napisz ją (+kasa, +XP)','Write it (+cash, +XP)'],['Odmów','Decline']],gate:bkGate(8),n:[['Książka się sprzedaje, Twoje nazwisko zyskuje na wadze.','The book sells and your name carries weight.'],['Nie ma czasu na pisanie.','No time to write.']],fx:[()=>{const m=meW();m.wallet+=meSalary()*4;bkXp(120);xpop(.3)},()=>{}]},
{k:'bkpodcast',t:['Wywiad w podkaście','Podcast interview'],b:['Popularny podcast branżowy zaprasza Cię na rozmowę o Twojej filozofii bookingu.','A popular industry podcast invites you to talk about your booking philosophy.'],o:[['Wystąp','Appear'],['Odmów','Decline']],gate:bkGate(4),n:[['Wywiad robi dobre wrażenie.','The interview makes a good impression.'],['Cisza w eterze.','Radio silence.']],fx:[()=>{if(rnd()<.75){xpop(.5);bkXp(40)}else{xpop(-.3);bkXp(20)}},()=>{}]},
{k:'burnout',t:['Wypalenie','Burnout'],b:['Ciągłe układanie kart zaczyna Cię męczyć. Potrzebujesz oddechu albo pracujesz dalej na siłę.','The constant card-building is wearing you down. You need a breather, or you push through.'],o:[['Weź tydzień wolnego (-XP)','Take a week off (-XP)'],['Pracuj dalej','Keep pushing']],gate:bkGate(6),n:[['Odpoczynek robi dobrze, szatnia chwilę radzi sobie sama.','Rest does you good, the locker room copes for a while.'],['Ciągniesz dalej, ale jakość spada.','You push on, but quality dips.']],fx:[()=>{const m=meW();m.wallet=Math.max(0,m.wallet-meSalary());xmood(1);xconf(1)},()=>{xpop(-.4);bkXp(30)}]},
{k:'industryaward',t:['Nagroda branżowa','Industry award'],b:['Branżowe media nominują Cię do nagrody dla najlepszego bookera dekady. Gala wymaga garnituru za {m}.','Trade media nominate you for booker of the decade. The gala needs a suit costing {m}.'],v:()=>{const c=xc(.03);return {c,m:money(c)}},o:[['Idź na galę ({m})','Attend the gala ({m})'],['Zostań w domu','Stay home']],cost:[1,0],gate:bkGate(9),n:[['Nagroda zdobyta! Rada jest dumna.','Award won! The board is proud.'],['Nominacja przechodzi bez echa.','The nomination passes unnoticed.']],fx:[v=>{xcash(-v.c);if(rnd()<.6){xconf(5);bkXp(150);xpop(.4)}else{bkXp(40)}},()=>{}]},
{k:'headhunter',t:['Łowca głów','Headhunter'],b:['Łowca głów dzwoni z propozycją pracy w większej federacji. Rozmowa zajmie tydzień.','A headhunter calls with a job offer from a bigger federation. The talks take a week.'],o:[['Porozmawiaj','Take the call'],['Odrzuć','Turn it down']],gate:bkGate(10),n:[['Propozycja nie wypala, ale Twoje notowania rosną.','The offer fizzles, but your stock rises.'],['Zostajesz lojalny. Rada to docenia.','You stay loyal. The board appreciates it.']],fx:[()=>{bkXp(60);xconf(-2)},()=>{xconf(3)}]},
{k:'wrkshop',t:['Warsztaty dla zawodników','Wrestler workshop'],b:['Możesz poprowadzić warsztaty o psychologii ringu dla zawodników. Wynajem sali: {m}.','You can run a ring-psychology workshop for wrestlers. Hall rental: {m}.'],v:()=>{const c=xc(.04);return {c,m:money(c)}},o:[['Poprowadź ({m})','Run it ({m})'],['Odpuść','Skip']],cost:[1,0],gate:bkGate(5),n:[['Zawodnicy wychodzą zmotywowani.','Wrestlers leave motivated.'],['Bez warsztatów.','No workshop.']],fx:[v=>{xcash(-v.c);xmood(4);bkXp(60)},()=>{}]},
{k:'harshcritic',t:['Krytyk wylewa żale','A critic vents'],b:['Znany krytyk rozbiera Twoją ostatnią galę na części pierwsze. Możesz się odgryźć albo wyciągnąć wnioski.','A known critic takes your last show apart. You can fire back or take notes.'],o:[['Wyciągnij wnioski','Take notes'],['Odgryź się publicznie','Fire back publicly']],gate:bkGate(2),n:[['Uwagi okazują się cenne.','The notes turn out valuable.'],['Spór nakręca zainteresowanie, ale nie wszyscy go lubią.','The spat drums up interest, but not everyone likes it.']],fx:[()=>{bkXp(50)},()=>{rnd()<.5?xpop(.5):xpop(-.3);bkXp(20)}]},
{k:'bkprotege',t:['Protegowany','A protégé'],b:['Młody zawodnik prosi, żebyś osobiście pokierował jego karierą.','A young wrestler asks you to guide his career personally.'],o:[['Zajmij się nim','Take him on'],['Odmów','Decline']],gate:()=>!!meW()&&mine().some(w=>w.age<=26),n:[['Młody błyskawicznie robi postępy.','The kid progresses fast.'],['Młody szuka innego mentora.','The kid looks for another mentor.']],fx:[()=>{const w=pickR(xyoung(3));if(w){w.pop=clamp(w.pop+3,1,100);evMood(w,8)}bkXp(40)},()=>{}]},
{k:'fanqa',t:['Q&A z fanami','Fan Q&A'],b:['Fani zadają pytania o Twoje decyzje bookerskie na żywo w sieci.','Fans ask about your booking decisions live online.'],o:[['Odpowiadaj szczerze','Answer honestly'],['Odmów spoilerów','No spoilers']],gate:bkGate(3),n:[['Fani doceniają szczerość.','Fans appreciate the honesty.'],['Fani wolą niespodzianki.','Fans prefer surprises.']],fx:[()=>{rnd()<.65?xpop(.5):xpop(-.2);bkXp(30)},()=>{bkXp(15)}]},
{k:'consulting',t:['Oferta konsultingu','Consulting offer'],b:['Mała federacja płaci za Twoją poradę w sprawie kart gal.','A small promotion pays for your advice on show cards.'],o:[['Przyjmij zlecenie','Take the job'],['Odmów','Decline']],gate:bkGate(6),n:[['Dodatkowy zarobek i kontakty.','Extra income and contacts.'],['Brak czasu na boczne projekty.','No time for side projects.']],fx:[()=>{meW().wallet+=meSalary()*2;bkXp(30)},()=>{}]},
{k:'keynote',t:['Panel na konwencie','Convention panel'],b:['Konwent wrestlingowy zaprasza Cię na panel dyskusyjny.','A wrestling convention invites you to a panel.'],o:[['Wystąp','Speak'],['Odmów','Decline']],gate:bkGate(12),n:[['Panel to hit, notowania rosną.','The panel is a hit, your stock rises.'],['Konwent obejdzie się bez Ciebie.','The convention gets by without you.']],fx:[()=>{bkXp(100);xpop(.4);xconf(2)},()=>{}]},
{k:'rivalmentor',t:['Rywal prosi o radę','A rival asks for advice'],b:['Rywalizujący booker prosi o radę w trudnym momencie. Możesz pomóc albo to wykorzystać.','A rival booker asks for advice in a tough spot. You can help or exploit it.'],o:[['Pomóż','Help'],['Wykorzystaj to','Exploit it']],gate:()=>{try{rbEnsure()}catch(e){}return !!meW()&&!!G.rb&&Object.keys(G.rb).length>0},n:[['Zyskujesz szacunek w branży.','You earn respect in the industry.'],['Zyskujesz przewagę, ale tracisz opinię.','You gain an edge but lose reputation.']],fx:[()=>{bkXp(60);xconf(2)},()=>{xpop(.3);xconf(-2);bkXp(20)}]},
{k:'skillcamp',t:['Obóz bookerski','Booker camp'],b:['Elitarny obóz dla bookerów kosztuje {m}, ale obiecuje przełom w Twoich umiejętnościach.','An elite booker camp costs {m} but promises a breakthrough in your skills.'],v:()=>{const c=xc(.15);return {c,m:money(c)}},o:[['Zapisz się ({m})','Enrol ({m})'],['Pomiń','Skip']],cost:[1,0],gate:bkGate(14),n:[['Zdobywasz dodatkowy punkt umiejętności!','You gain an extra skill point!'],['Obóz Cię omija.','The camp passes you by.']],fx:[v=>{xcash(-v.c);const b=bkEnsure();b.sp++;bkXp(60)},()=>{}]}
];
XSB.forEach(XE);
Object.assign(D,{'nav.bk':['Rozwój bookera','Booker growth'],'bk.sub':['Zdobywaj XP za dobre gale, awanse federacji i nagrody. Każdy poziom daje punkt umiejętności.','Earn XP from good shows, federation promotions and awards. Every level grants a skill point.'],
 'bk.lv':['Poziom {l}','Level {l}'],'bk.max':['Maksymalny poziom','Max level'],'bk.xp':['{a} / {b} XP','{a} / {b} XP'],'bk.sp':['Punkty umiejętności','Skill points'],'bk.rc':['Reset: {c}','Respec: {c}'],'bk.reset':['Resetuj umiejętności','Reset skills'],
 'bk.how':['Co 5 poziomów dostajesz dodatkowy punkt. Resetu dokonujesz za pieniądze z osobistego portfela.','Every 5 levels you get a bonus point. Respecs cost money from your personal wallet.'],'bk.req':['wymaga poz. {l}','needs lvl {l}'],'bk.now':['Teraz:','Now:'],'bk.maxr':['MAX','MAX'],
 'n.bklv':['Awans bookera! Poziom {l}: {r}.','Booker level up! Level {l}: {r}.'],'ach.bklv10':['Booker poziom 10','Booker level 10'],'ach.bklv30':['Legenda branży: poziom 30','Industry legend: level 30']});
