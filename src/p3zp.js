// ---- v86: booker wealth: housing, cars, investments, net worth ----
const HOMES=[[0,0,0],[15000,60,2],[80000,300,5],[400000,1500,9],[2000000,8000,14],[12000000,45000,20]];
const CARS=[[8000,1],[35000,2],[150000,4],[600000,6],[2500000,9],[9000000,12]];
function lsEnsure(){const m=meW();if(!m)return null;if(m.home==null){m.home=0;m.cars=[];m.inv={idx:0,re:0,stp:0};m.mkt=0;m.nwMax=0}return m}
function carsOwned(){const m=lsEnsure();return m?m.cars:[]}
function prestigePts(){const m=lsEnsure();if(!m)return 0;return HOMES[m.home][2]+m.cars.reduce((a,i)=>a+CARS[i][1],0)}
function lsUpkeep(){const m=lsEnsure();if(!m)return 0;return HOMES[m.home][1]+Math.round(m.cars.reduce((a,i)=>a+CARS[i][0]*.0006,0))}
function netWorth(){const m=lsEnsure();if(!m)return 0;return Math.round(m.wallet+m.inv.idx+m.inv.re+m.inv.stp+HOMES[m.home][0]*.7+m.cars.reduce((a,i)=>a+CARS[i][0]*.6,0))}
const _iw3=infraWeekly;
infraWeekly=function(){_iw3();const m=lsEnsure();if(!m)return;
 const u=lsUpkeep();m.wallet=Math.max(0,m.wallet-u);
 const v=m.mkt||0;m.mkt=v*.9;
 m.inv.idx*=1+.0015+(rnd()-.5)*.02+v*.01;m.inv.re*=1+.001+(rnd()-.5)*.006+v*.004;
 let s=1+(rnd()-.5)*.12+v*.02;if(rnd()<.01)s=.3;else if(rnd()<.01)s=2.5;m.inv.stp*=s;
 ['idx','re','stp'].forEach(k=>{m.inv[k]=Math.max(0,Math.round(m.inv[k]))});
 const pts=prestigePts();if(pts){memEnsure().forEach(x=>{if(x.r==='pres')x.t=clamp(x.t+pts*.003,0,100)})}
 const nw=netWorth();if(nw>m.nwMax)m.nwMax=nw;if(nw>=1e6){G.ach=G.ach||{};if(!G.ach.nw1m)G.ach.nw1m=G.week}};
const _cr=careerRep;careerRep=function(){return _cr()+prestigePts()*.6};
function invBuy(k,pct){const m=lsEnsure(),a=Math.floor(m.wallet*pct);if(a<=0)return;m.wallet-=a;m.inv[k]+=a}
function invSellAll(k){const m=lsEnsure();m.wallet+=m.inv[k];m.inv[k]=0}
function homeNext(){const m=lsEnsure();return m.home<5?m.home+1:null}
function vLife(){const m=lsEnsure();if(!m)return '<div class="top"><div><h2>'+t('nav.life')+'</h2></div></div><div class="card mute">'+t('tcg.nome')+'</div>';
 const disc=m.homeDisc?1-m.homeDisc:1;
 let h='<div class="top"><div><h2>'+t('nav.life')+'</h2><div class="mute">'+t('ls.sub')+'</div></div></div>';
 h+='<div class="card"><div class="grid g3" style="gap:10px"><div><div class="px">'+t('tcg.wallet')+'</div><b>'+money(m.wallet)+'</b></div><div><div class="px">'+t('ls.nw')+'</div><b>'+money(netWorth())+'</b></div><div><div class="px">'+t('ls.upk')+'</div><b>'+money(lsUpkeep())+'/'+t('ls.wk')+'</b></div></div><div class="mute" style="font-size:13px;margin-top:6px">'+t('ls.pres',{n:prestigePts()})+'</div></div>';
 const nx=homeNext();
 h+='<div class="card stack"><h3>'+t('ls.home')+'</h3><div class="row spread"><span><b>'+t('ls.h.'+m.home)+'</b> <span class="mute">· '+t('ls.pp',{n:HOMES[m.home][2]})+'</span></span></div>'+(nx!=null?'<div class="row spread" style="gap:8px"><span>'+t('ls.next')+': '+t('ls.h.'+nx)+' <span class="mute">('+money(Math.round(HOMES[nx][0]*disc))+', '+t('ls.upk')+' '+money(HOMES[nx][1])+'/'+t('ls.wk')+(disc<1?', −'+Math.round(m.homeDisc*100)+'%':'')+')</span></span><button class="btn sm gold" data-act="lsbuyhome"'+(m.wallet<Math.round(HOMES[nx][0]*disc)?' disabled':'')+'>'+t('ls.buy')+'</button></div>':'<div class="mute">'+t('ls.max')+'</div>')+'</div>';
 h+='<div class="card stack"><h3>'+t('ls.cars')+'</h3>'+CARS.map((c,i)=>{const own=m.cars.indexOf(i)>=0;return '<div class="row spread" style="gap:8px"><span>🚗 '+t('ls.c.'+i)+' <span class="mute">('+t('ls.pp',{n:c[1]})+')</span></span>'+(own?'<span class="tag">'+t('ls.own')+'</span>':'<button class="btn sm" data-act="lsbuycar" data-i="'+i+'"'+(m.wallet<c[0]?' disabled':'')+'>'+money(c[0])+'</button>')+'</div>'}).join('')+'</div>';
 const INV=[['idx','ls.i.idx'],['re','ls.i.re'],['stp','ls.i.stp']];
 h+='<div class="card stack"><h3>'+t('ls.inv')+'</h3><div class="mute" style="font-size:13px">'+t('ls.inv.note')+'</div>'+INV.map(([k,n])=>'<div class="row spread" style="gap:8px;flex-wrap:wrap"><span><b>'+t(n)+'</b> <span class="mute">'+money(m.inv[k])+'</span></span><span class="row" style="gap:6px"><button class="btn sm" data-act="lsinv" data-k="'+k+'" data-p="0.1">10%</button><button class="btn sm" data-act="lsinv" data-k="'+k+'" data-p="0.5">50%</button><button class="btn sm" data-act="lsinv" data-k="'+k+'" data-p="1">100%</button><button class="btn sm" data-act="lssell" data-k="'+k+'"'+(m.inv[k]>0?'':' disabled')+'>'+t('ls.sellall')+'</button></span></div>').join('')+'</div>';
 h+='<div class="card stack"><div class="row spread"><span><b>'+t('ls.hobby')+'</b> <span class="mute">'+t(m.hobbyOff?'ls.off':'ls.on')+'</span></span><button class="btn sm" data-act="lshobby">'+t(m.hobbyOff?'ls.turnon':'ls.turnoff')+'</button></div></div>';
 return h}
E('ls.crash','Krach na rynkach','Market crash','Giełda szoruje po dnie. Twoje inwestycje tracą wartość. Możesz sprzedać z dużą stratą albo przeczekać.','Markets are tanking. Your investments lose value. You can sell at a big loss or ride it out.',[['Sprzedaj teraz (−12%)','Sell now (−12%)'],['Przeczekaj','Ride it out']]);
E('ls.boom','Gorąca wskazówka','Hot tip','Znajomy z branży zachwala startup medialny. Możesz wrzucić 10% portfela.','An industry friend raves about a media startup. You can put in 10% of your wallet.',[['Zainwestuj 10%','Invest 10%'],['Odpuść','Pass']]);
E('ls.carshow','Targi samochodowe','Car show','Na targach trafia się auto ze zniżką 25%. Możesz kupić następny model z garażu.','The car show has a car at 25% off. You can buy the next model for your garage.',[['Kup ({m})','Buy ({m})'],['Nie teraz','Not now']]);
E('ls.burglar','Włamanie','Burglary','Ktoś włamał się do Twojego domu. Straty zależą od zabezpieczeń.','Someone broke into your home. Losses depend on your security.',[['Zgłoś ubezpieczycielowi','Call the insurer'],['Zignoruj','Ignore it']]);
E('ls.reno','Okazja remontowa','Renovation deal','Znajomy ekipa remontowa: następna zmiana mieszkania będzie o 30% tańsza.','A friend\'s renovation crew: your next home upgrade will cost 30% less.',[['Skorzystaj','Take it'],['Odmów','Decline']]);
Object.assign(D,{'nav.life':['Majątek','Wealth'],'ls.sub':['Mieszkanie, samochody i inwestycje bookera. Wydatki dają prestiż, który pomaga w aplikacjach i rozmowach z radą.','The booker\'s home, cars and investments. Spending brings prestige that helps in job applications and with the board.'],
 'ls.nw':['Majątek netto','Net worth'],'ls.upk':['Utrzymanie','Upkeep'],'ls.wk':['tydz.','wk'],'ls.pres':['Punkty prestiżu: {n}','Prestige points: {n}'],'ls.pp':['prestiż +{n}','prestige +{n}'],'ls.home':['Mieszkanie','Home'],'ls.next':['Następne','Next'],'ls.buy':['Kup','Buy'],'ls.max':['Masz najlepszą możliwą posiadłość.','You own the best possible estate.'],'ls.cars':['Garaż','Garage'],'ls.own':['w garażu','owned'],
 'ls.h.0':['Wynajęta kawalerka','Rented studio'],'ls.h.1':['Mieszkanie w centrum','Downtown apartment'],'ls.h.2':['Dom z ogrodem','House with a garden'],'ls.h.3':['Penthouse','Penthouse'],'ls.h.4':['Rezydencja','Mansion'],'ls.h.5':['Zamek na wzgórzu','Hilltop castle'],
 'ls.c.0':['Używany hatchback','Used hatchback'],'ls.c.1':['Sedan biznesowy','Business sedan'],'ls.c.2':['Sportowe coupé','Sports coupé'],'ls.c.3':['Klasyk kolekcjonerski','Collector classic'],'ls.c.4':['Superauto','Supercar'],'ls.c.5':['Limuzyna z kierowcą','Limousine with a driver'],
 'ls.inv':['Inwestycje','Investments'],'ls.inv.note':['Fundusz indeksowy: spokojny. Nieruchomości: stabilne i wolne. Startupy medialne: wysokie ryzyko, możliwy wielki zysk albo strata.','Index fund: calm. Real estate: stable and slow. Media startups: high risk, a possible huge gain or loss.'],'ls.i.idx':['Fundusz indeksowy','Index fund'],'ls.i.re':['Nieruchomości','Real estate'],'ls.i.stp':['Startupy medialne','Media startups'],'ls.sellall':['Sprzedaj całość','Sell all'],
 'ls.hobby':['Hobby: karty wrestlerów','Hobby: wrestler cards'],'ls.on':['włączone','on'],'ls.off':['wyłączone','off'],'ls.turnon':['Włącz','Turn on'],'ls.turnoff':['Wyłącz','Turn off'],
 'n.lc1':['Sprzedano z dużą stratą – ale już nie boli.','Sold at a heavy loss – but it no longer hurts.'],'n.lc2':['Rynek wciąż spada – inwestycje tracą wartość.','The market keeps falling – investments lose value.'],'n.lb1':['Startup wchodzi do portfela – zobaczymy, co z tego będzie.','The startup joins your portfolio – let\'s see what comes of it.'],'n.lb2':['Wskazówka odpuszczona.','The tip was passed on.'],'n.lcs1':['Nowe auto w garażu.','A new car in the garage.'],'n.lcs2':['Targi bez zakupów.','No purchase at the car show.'],
 'n.lbg1':['Ubezpieczenie pokryło większość strat.','Insurance covered most of the losses.'],'n.lbg2':['Włamanie pochłonęło część oszczędności.','The break-in swallowed part of your savings.'],'n.lr1':['Ekipa remontowa umówiona – kolejne mieszkanie taniej.','The renovation crew is booked – your next home is cheaper.'],'n.lr2':['Remont odrzucony.','Renovation declined.']});
Object.assign(WEV,{
 async lscrash(){const m=lsEnsure();if(!m||m.inv.idx+m.inv.re+m.inv.stp<5000)return false;const i=await evx('ls.crash',{},['1','2'],[false,false]);if(i===0){['idx','re','stp'].forEach(k=>{m.wallet+=Math.round(m.inv[k]*.88);m.inv[k]=0});addNews('n.lc1')}else{m.mkt=-4;addNews('n.lc2')}return true},
 async lsboom(){const m=lsEnsure();if(!m||m.wallet<3000)return false;const i=await evx('ls.boom',{},['1','2'],[false,false]);if(i===0){const a=Math.floor(m.wallet*.1);m.wallet-=a;m.inv.stp+=a;addNews('n.lb1')}else addNews('n.lb2');return true},
 async lscarshow(){const m=lsEnsure();const nx=CARS.findIndex((c,i)=>m&&m.cars.indexOf(i)<0);if(!m||nx<0)return false;const c=Math.round(CARS[nx][0]*.75);if(m.wallet<c)return false;const i=await evx('ls.carshow',{m:money(c)},['1','2'],[false,false]);if(i===0){m.wallet-=c;m.cars.push(nx);addNews('n.lcs1')}else addNews('n.lcs2');return true},
 async lsburglar(){const m=lsEnsure();if(!m||m.wallet<2000||m.home<1)return false;const i=await evx('ls.burglar',{},['1','2'],[false,false]);const lose=Math.round(m.wallet*.08);if(i===0){m.wallet-=Math.round(lose*(m.home>=3?.15:.5));addNews('n.lbg1')}else{m.wallet-=lose;addNews('n.lbg2')}return true},
 async lsreno(){const m=lsEnsure();if(!m||m.home>=5||m.homeDisc)return false;const i=await evx('ls.reno',{},['1','2'],[false,false]);if(i===0){m.homeDisc=.3;addNews('n.lr1')}else addNews('n.lr2');return true}
});
