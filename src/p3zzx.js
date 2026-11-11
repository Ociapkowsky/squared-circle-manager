// ---- v125: tours and markets (cities, fan base, planner, house shows, residencies, local heroes) ----
const RTM=[
['us1','US','Nowy Jork','New York',1],['us2','US','Chicago','Chicago',.8],['us3','US','Los Angeles','Los Angeles',.9],['us4','US','Dallas','Dallas',.6],
['jp1','JP','Tokio','Tokyo',1],['jp2','JP','Osaka','Osaka',.7],['mx1','MX','Meksyk','Mexico City',1],['mx2','MX','Guadalajara','Guadalajara',.6],
['gb1','GB','Londyn','London',1],['gb2','GB','Manchester','Manchester',.6],['de1','DE','Berlin','Berlin',.8],['de2','DE','Hamburg','Hamburg',.6],
['pl1','PL','Warszawa','Warsaw',.8],['pl2','PL','Kraków','Krakow',.6],['pl3','PL','Wrocław','Wroclaw',.5],['ca1','CA','Toronto','Toronto',.8],['ca2','CA','Montreal','Montreal',.6],
['br1','BR','São Paulo','Sao Paulo',.9],['br2','BR','Rio de Janeiro','Rio de Janeiro',.7],['au1','AU','Sydney','Sydney',.7],['au2','AU','Melbourne','Melbourne',.6],
['ng1','NG','Lagos','Lagos',.8],['fr1','FR','Paryż','Paris',.8],['fr2','FR','Lyon','Lyon',.5],['es1','ES','Madryt','Madrid',.8],['es2','ES','Barcelona','Barcelona',.7],
['it1','IT','Rzym','Rome',.7],['it2','IT','Mediolan','Milan',.7],['cz1','CZ','Praga','Prague',.7],['cz2','CZ','Brno','Brno',.4]].map(a=>({k:a[0],cc:a[1],n:[a[2],a[3]],s:a[4]}));
const RTMODE={house:{n:'rt.m.house',g:1,c:1,f:5,inj:1,cast:0},gala:{n:'rt.m.gala',g:1.8,c:1.5,f:8,inj:1.5,cast:2},rookie:{n:'rt.m.rookie',g:.7,c:.8,f:4,inj:.7,cast:0}};
const rtOn=()=>!!(G&&G.fed&&G.fed.tier>=2);
const rtDist=cc=>{const a=accStart(cc,G.fed.country);return a>=55?0:a>=42?1:a>=32?2:a>=18?3:4};
const rtNm=m=>m.n[lang==='pl'?0:1];
const rtMk=k=>RTM.find(m=>m.k===k);
function rtEnsure(){if(!G.rt)G.rt={m:{},plan:[],hist:[],legs:0,net:0,ev:{}};const g=G.rt;
 RTM.forEach(m=>{if(!g.m[m.k]){const d=rtDist(m.cc);g.m[m.k]={f:Math.round(d===0?28+m.s*14:d===1?14+m.s*8:d===2?8+m.s*5:4+m.s*3),vis:0,last:-99,res:0}}});return g}
function rtReach(){const g=rtEnsure();let a=0,b=0;RTM.forEach(m=>{a+=g.m[m.k].f*m.s;b+=m.s});return b?a/b:0}
const rtN=()=>[4,6,8,10,12][clamp(G.fed.tier,1,5)-1];
const rtRival=mk=>G.rivals.find(r=>r.country===mk.cc);
function rtEst(mk,mode){const M=RTMODE[mode]||RTMODE.house,R=Math.max(wkRev(),2000),d=rtDist(mk.cc),N=rtN()+M.cast;return {cost:r10(R*(.045+.03*d)*(N/6)*M.c),n:N}}
function rtCast(mk,mode){const M=RTMODE[mode]||RTMODE.house,N=rtN()+M.cast,pool=mine().filter(w=>!w.ext&&!w.farewell&&!(w.injury>0)&&(w.fatigue||0)<80);
 const sc=w=>mode==='rookie'?(100-w.pop)+(w.age<=26?20:0):w.pop+(w.country===mk.cc?18:0);return pool.sort((a,b)=>sc(b)-sc(a)).slice(0,N)}
function rtRun(leg){const g=rtEnsure(),mk=rtMk(leg.m);if(!mk)return;const M=RTMODE[leg.mode]||RTMODE.house,st=g.m[mk.k],T=tdNow(),R=Math.max(wkRev(),2000),dist=rtDist(mk.cc);
 const cast=rtCast(mk,leg.mode);if(cast.length<3){addNews('n.rtnocast',{m:rtNm(mk)});return}
 const star=cast.reduce((a,w)=>a+w.pop,0)/cast.length/100,local=cast.some(w=>w.country===mk.cc)?1:0,rv=rtRival(mk),host=rv&&rv.pop>=G.fed.pop-5;
 const d=clamp(.22+st.f/100*.5+star*.22+local*.1+(rtReach()-13)/100*.05-(host?.05:0),.05,1.1);
 const att=Math.round(T.cap*mk.s*(leg.mode==='gala'?1:.7)*d),gross=r10(R*(.1+.16*d)*mk.s*M.g),cost=rtEst(mk,leg.mode).cost,net=gross-cost;
 G.fed.cash+=net;const dF=(2.5+star*5+(M.f-5)*.6+local*1.5)*(1-st.f/130)*(host?.7:1);st.f=clamp(st.f+dF,0,100);st.vis++;st.last=G.week-1;
 let inj=0;cast.forEach(w=>{w.fatigue=clamp((w.fatigue||0)+(leg.mode==='gala'?8:leg.mode==='rookie'?4:5),0,100);
  if(w.country===mk.cc)evMood(w,3);else if(dist>=3&&w.country!==G.fed.country)evMood(w,-1);
  if(leg.mode==='rookie'&&w.age<=24&&rnd()<.3)w.ring=clamp(w.ring+.2,1,99);
  if(rnd()<.012*M.inj){injure(w,2+Math.floor(rnd()*4),true);inj++;addNews('n.rtinj',{w:w.name,m:rtNm(mk)})}});
 xpop(.03*mk.s*(d>.6?1:.3));if(host&&leg.mode==='gala'&&st.f>50)rv.pop=clamp(rv.pop-.08,2,100);
 if(typeof rdRoad==='function'&&rdRoad()&&G.rd&&G.rd.p)G.rd.hype=clamp(G.rd.hype+2,0,100);
 g.legs++;g.net+=net;g.hist.push({w:G.week-1,k:mk.k,mode:leg.mode,att,gross,cost,net,df:dF,n:cast.length,inj,host:!!host});if(g.hist.length>14)g.hist.shift();
 addNews('n.rtleg',{m:rtNm(mk),a:num(att),n:money(net)})}
const _iwRt=infraWeekly;infraWeekly=function(){_iwRt();try{if(!rtOn())return;const g=rtEnsure();
 g.plan.filter(l=>l.wk===G.week-1).forEach(l=>rtRun(l));g.plan=g.plan.filter(l=>l.wk>=G.week);
 const R=Math.max(wkRev(),2000);RTM.forEach(m=>{const s=g.m[m.k];
  if(s.res>G.week&&s.f>=60){G.fed.cash+=r10(R*.012*m.s);s.f=clamp(s.f+.3,0,100)}else if(s.res&&s.res<=G.week)s.res=0;
  if(G.week-s.last>6)s.f=Math.max(rtDist(m.cc)===0?15:4,s.f-.12)})}catch(e){}};
const _dmRt=demandAt;demandAt=function(pm,noise){let d=_dmRt(pm,noise);try{if(rtOn())d+=(rtReach()-13)/100*.06}catch(e){}return d};
function rtAdd(k,wk,mode){const g=rtEnsure();if(!rtMk(k)||!RTMODE[mode]||g.plan.length>=6)return 'full';if(wk<G.week||g.plan.some(l=>l.wk===wk))return 'dup';g.plan.push({wk,m:k,mode});g.plan.sort((a,b)=>a.wk-b.wk);return 'ok'}
function rtRes(k){const g=rtEnsure(),mk=rtMk(k),s=g.m[k];if(!mk||!s||s.res>G.week||s.f<75||s.vis<4)return 'no';const c=r10(xc(.15)*mk.s);if(G.fed.cash<c)return 'cash';G.fed.cash-=c;s.res=G.week+26;return 'ok'}
const _toRt=takeOver;takeOver=function(tid){const ok=_toRt(tid);if(ok)G.rt=null;return ok};
// ---- UI ----
const RTUI={msg:'',m:'',mode:'house'};
function vRt(){let h='<div class="top"><div><h2>'+t('nav.rt')+'</h2><div class="mute" style="max-width:66ch">'+t('rt.sub')+'</div></div></div>';
 if(!rtOn())return h+'<div class="card mute">'+t('rt.locked')+'</div>';
 const g=rtEnsure();if(RTUI.msg){h+='<div class="note">'+esc(RTUI.msg)+'</div>';RTUI.msg=''}
 if(!rtMk(RTUI.m))RTUI.m=RTM[0].k;
 const mk=rtMk(RTUI.m),est=rtEst(mk,RTUI.mode);
 h+='<div class="card"><div class="grid g3" style="gap:10px"><div><div class="px">'+t('rt.legs')+'</div><b>'+g.legs+'</b></div><div><div class="px">'+t('rt.net')+'</div><b>'+money(g.net)+'</b></div><div><div class="px">'+t('rt.reach')+'</div><b>'+Math.round(rtReach())+'</b></div></div><div class="mute" style="font-size:13px">'+t('rt.reachd')+'</div></div>';
 const wks=[];for(let i=0;i<10;i++){const w=G.week+i;if(!g.plan.some(l=>l.wk===w))wks.push(w)}
 const mks=RTM.slice().sort((a,b)=>rtDist(a.cc)-rtDist(b.cc)||b.s-a.s);
 h+='<div class="card stack"><h3>'+t('rt.plan')+'</h3><div class="mute" style="font-size:13px">'+t('rt.pland')+'</div><div class="grid g2" style="gap:8px">'+
  '<div><div class="px">'+t('rt.city')+'</div><select id="rtm" class="field" style="width:auto;max-width:100%" data-chg="rtm">'+mks.map(m=>'<option value="'+m.k+'"'+(m.k===RTUI.m?' selected':'')+'>'+esc(rtNm(m))+' ('+esc(cn(m.cc))+') · '+t('rt.d.'+rtDist(m.cc))+' · '+Math.round(g.m[m.k].f)+'</option>').join('')+'</select></div>'+
  '<div><div class="px">'+t('rt.mode')+'</div><select id="rtmode" class="field" style="width:auto;max-width:100%" data-chg="rtmode">'+Object.keys(RTMODE).map(k=>'<option value="'+k+'"'+(k===RTUI.mode?' selected':'')+'>'+t(RTMODE[k].n)+'</option>').join('')+'</select></div>'+
  '<div><div class="px">'+t('rt.when')+'</div><select id="rtw" class="field" style="width:auto;max-width:100%">'+wks.map(w=>'<option value="'+w+'">'+t('rt.after',{n:w})+'</option>').join('')+'</select></div></div>'+
  '<div class="mute" style="font-size:13px">'+t('rt.est',{c:money(est.cost),n:est.n})+(rtRival(mk)?' · '+t('rt.hostile',{r:esc(rtRival(mk).short||rtRival(mk).name)}):'')+'</div>'+
  '<div><button class="btn gold" data-act="rtadd"'+(g.plan.length>=6?' disabled':'')+'>'+t('rt.add')+'</button></div>'+
  (g.plan.length?'<div class="stack" style="gap:6px">'+g.plan.map((l,i)=>{const m=rtMk(l.m);return '<div class="row spread" style="gap:8px;flex-wrap:wrap"><span><b>'+esc(rtNm(m))+'</b> <span class="mute">· '+t('rt.after',{n:l.wk})+' · '+t(RTMODE[l.mode].n)+'</span></span><button class="btn sm" data-act="rtdel" data-i="'+i+'">'+t('rt.del')+'</button></div>'}).join('')+'</div>':'<div class="mute">'+t('rt.noplan')+'</div>')+'</div>';
 if(g.hist.length)h+='<div class="card stack"><h3>'+t('rt.hist')+'</h3>'+g.hist.slice(-8).reverse().map(x=>{const m=rtMk(x.k);return '<div class="row spread" style="gap:8px;flex-wrap:wrap"><span><b>'+esc(rtNm(m))+'</b> <span class="mute">· '+t('cal.wk',{n:x.w})+' · '+t(RTMODE[x.mode].n)+(x.host?' · '+t('rt.host'):'')+'</span></span><span class="mute">'+num(x.att)+' · '+(x.net>=0?'+':'')+money(x.net)+' · +'+x.df.toFixed(1)+(x.inj?' · 🩹'+x.inj:'')+'</span></div>'}).join('')+'</div>';
 const LA=RTM.slice().sort((a,b)=>g.m[b.k].f-g.m[a.k].f),L=RTUI.all?LA:LA.slice(0,18);
 h+='<div class="card stack"><h3>'+t('rt.markets')+'</h3>'+L.map(m=>{const s=g.m[m.k],rv=rtRival(m),res=s.res>G.week;return '<div class="stack" style="gap:3px;padding:4px 0;border-top:1px solid var(--line)"><div class="row spread" style="gap:8px;flex-wrap:wrap"><span><b>'+esc(rtNm(m))+'</b> <span class="mute">· '+esc(cn(m.cc))+' · '+t('rt.d.'+rtDist(m.cc))+(rv?' · ⚔ '+esc(rv.short||rv.name):(typeof rtFront==='function'&&rtFront(m.cc)?' · 🌍 '+t('rt.new'):''))+'</span></span><span class="mute">'+Math.round(s.f)+(res?' · 🏟 '+t('rt.res',{n:s.res-G.week}):'')+'</span></div>'+bar(s.f,'t')+
  (!res&&s.f>=75&&s.vis>=4?'<div><button class="btn sm" data-act="rtres" data-k="'+m.k+'">'+t('rt.resbtn',{m:money(r10(xc(.15)*m.s))})+'</button></div>':'')+'</div>'}).join('')+'</div>';
 h+='<div><button class="btn sm" data-act="rtall">'+t(RTUI.all?'rt.top':'rt.all')+'</button></div>';return h}
// ---- events ----
const rtG=f=>()=>{try{return rtOn()&&f(rtEnsure())}catch(e){return false}};
const rtLast=()=>{const g=rtEnsure(),x=g.hist[g.hist.length-1];return x&&G.week-x.w<=3?x:null};
const rtV=()=>{const x=rtLast(),m=x?rtMk(x.k):RTM[0];return {m:rtNm(m),k:m.k,c:xc(.05),mm:money(xc(.05))}};
const rtF=(k,d)=>{const s=rtEnsure().m[k];if(s)s.f=clamp(s.f+d,0,100)};
const XRT=[
{k:'rtvisa',t:['Kłopoty wizowe','Visa trouble'],b:['Część ekipy utknęła na granicy po etapie w mieście {m}. Prawnik kosztuje {mm}.','Part of the crew is stuck at the border after the {m} leg. A lawyer costs {mm}.'],v:rtV,gate:rtG(g=>{const x=rtLast();return x&&rtDist(rtMk(x.k).cc)>=2}),o:[['Wynajmij prawnika ({mm})','Hire a lawyer ({mm})'],['Wracajcie bez części ekipy','Go back without part of the crew']],cost:[1,0],n:[['Wszyscy wracają bezpiecznie.','Everyone gets back safely.'],['Ekipa jest zła, fani zawiedzeni.','The crew is angry, fans disappointed.']],fx:[()=>{xcash(-xc(.05))},v=>{xmood(-2);rtF(v.k,-3)}]},
{k:'rtlocal',t:['Lokalny promotor','A local promoter'],b:['Promotor z miasta {m} proponuje wspólną galę i dopłatę.','A promoter from {m} proposes a joint show and a subsidy.'],v:()=>({...rtV(),c:xc(.08)}),gate:rtG(g=>!!rtLast()),o:[['Przyjmij','Accept'],['Odrzuć','Decline']],n:[['Dodatkowy zysk i nowi fani.','Extra profit and new fans.'],['Pozostajecie samodzielni.','You stay independent.']],fx:[v=>{xcash(v.c);rtF(v.k,4);xmood(-1)},()=>{}]},
{k:'rtbus',t:['Wypadek busa','A bus accident'],b:['Bus z ekipą miał kolizję w drodze z miasta {m}. Pełna kontrola medyczna kosztuje {mm}.','The crew bus had a collision on the way back from {m}. A full medical check costs {mm}.'],v:rtV,gate:rtG(g=>!!rtLast()),o:[['Pełna kontrola ({mm})','Full check-up ({mm})'],['Jedźcie dalej','Keep going']],cost:[1,0],n:[['Nic poważnego.','Nothing serious.'],['Ktoś nie wytrzymał.','Someone could not cope.']],fx:[()=>{xcash(-xc(.05));mine().forEach(w=>{w.fatigue=clamp((w.fatigue||0)+6,0,100)})},()=>{const w=pickR(mine().filter(x=>!x.ext&&!(x.injury>0)));if(w)injure(w,2+Math.floor(rnd()*4),true);mine().forEach(x=>{x.fatigue=clamp((x.fatigue||0)+10,0,100)})}]},
{k:'rtherohome',t:['Powrót bohatera do domu','A hero returns home'],b:['{w} marzy, by zagrać w rodzinnym kraju. Fani w mieście {m} czekają.','{w} dreams of working in his home country. Fans in {m} are waiting.'],v:()=>{const w=pickR(mine().filter(x=>!x.ext&&x.country!==G.fed.country&&RTM.some(m=>m.cc===x.country)));const m=w?pickR(RTM.filter(x=>x.cc===w.country)):RTM[0];return {w:w?w.name:'?',id:w?w.id:'',m:rtNm(m),k:m.k}},gate:rtG(g=>mine().some(x=>!x.ext&&x.country!==G.fed.country&&RTM.some(m=>m.cc===x.country))),o:[['Zaplanuj etap tam','Plan a leg there'],['Nie tym razem','Not this time']],n:[['Rodzinne miasto szykuje wielkie przyjęcie.','His home city prepares a big welcome.'],['Bohater jest rozczarowany.','The hero is disappointed.']],fx:[v=>{const w=lrW(v.id);if(w)evMood(w,5);rtAdd(v.k,G.week,'gala');rtF(v.k,5)},v=>{const w=lrW(v.id);if(w)evMood(w,-3)}]},
{k:'rtrival',t:['Terytorium rywala','Rival territory'],b:['Rywal z miasta {m} ma tam wierną publiczność. Wejście na jego teren to ryzyko.','A rival has a loyal crowd in {m}. Entering its turf is a risk.'],v:()=>{const m=pickR(RTM.filter(x=>rtRival(x)&&rtDist(x.cc)>0))||RTM[0];return {m:rtNm(m),k:m.k,c:xc(.06),mm:money(xc(.06))}},gate:rtG(g=>RTM.some(x=>rtRival(x)&&rtDist(x.cc)>0)),o:[['Wejdź na ich teren ({mm})','Enter their turf ({mm})'],['Unikaj','Avoid it']],cost:[1,0],n:[['Zdobywasz przyczółek.','You gain a foothold.'],['Spokojniej, ale mniej fanów.','Calmer, but fewer fans.']],fx:[v=>{xcash(-v.c);rtF(v.k,6);const mk=rtMk(v.k),r=rtRival(mk);if(r)r.pop=clamp(r.pop-.2,2,100)},()=>{}]},
{k:'rtfanclub',t:['Fanklub na trasie','A tour fan club'],b:['Fani z miasta {m} założyli oficjalny fanklub federacji.','Fans in {m} founded an official promotion fan club.'],v:rtV,gate:rtG(g=>!!rtLast()),o:[['Wesprzyj fanklub','Support the fan club'],['Zostaw ich samych','Leave them be']],n:[['Fanklub rośnie jak na drożdżach.','The fan club grows fast.'],['Fanklub działa po cichu.','The fan club works quietly.']],fx:[v=>{rtF(v.k,7);xpop(.1)},v=>{rtF(v.k,2)}]},
{k:'rtcancel',t:['Hala odwołała etap','The venue cancels a leg'],b:['Hala w mieście {m} odwołuje najbliższy etap. Zastępcza kosztuje {mm}.','The venue in {m} cancels the next leg. A replacement costs {mm}.'],v:()=>{const l=rtEnsure().plan[0],m=l?rtMk(l.m):RTM[0];return {m:rtNm(m),k:m.k,c:xc(.04),mm:money(xc(.04))}},gate:rtG(g=>g.plan.length>0),o:[['Znajdź nową halę ({mm})','Find a new venue ({mm})'],['Odwołaj etap','Cancel the leg']],cost:[1,0],n:[['Etap się odbędzie.','The leg goes ahead.'],['Fani w mieście są zawiedzeni.','Fans in the city are disappointed.']],fx:[()=>xcash(-xc(.04)),v=>{const g=rtEnsure();g.plan.shift();rtF(v.k,-3)}]},
{k:'rttoursp',t:['Sponsor trasy','A tour sponsor'],b:['Sponsor oferuje {m} za logo na plakatach trasy.','A sponsor offers {m} for a logo on the tour posters.'],v:()=>{const c=xc(.1);return {c,m:money(c)}},gate:rtG(g=>g.legs>=1),o:[['Przyjmij ({m})','Accept ({m})'],['Odmów','Decline']],n:[['Pieniądze wpływają.','The money arrives.'],['Plakaty zostają czyste.','The posters stay clean.']],fx:[v=>xcash(v.c),()=>{}]},
{k:'rtbreak',t:['Ekipa prosi o przerwę','The crew asks for a break'],b:['Ekipa jest wykończona jeżdżeniem po kraju i prosi o tydzień wolnego.','The crew is exhausted from traveling and asks for a week off.'],v:()=>({}),gate:rtG(g=>g.hist.filter(x=>G.week-x.w<=4).length>=2),o:[['Daj im przerwę','Give them a break'],['Odmów','Refuse']],n:[['Siły wracają.','Strength returns.'],['Ekipa jest zła.','The crew is angry.']],fx:[()=>{mine().forEach(w=>{w.fatigue=Math.max(0,(w.fatigue||0)-12);evMood(w,2)});const g=rtEnsure();g.plan.shift()},()=>xmood(-3)]},
{k:'rttv',t:['Lokalna telewizja','Local TV'],b:['Telewizja z miasta {m} chce transmitować Twój etap.','A TV channel in {m} wants to broadcast your leg.'],v:()=>({...rtV(),c:xc(.07)}),gate:rtG(g=>!!rtLast()),o:[['Zgódź się','Agree'],['Odmów','Decline']],n:[['Transmisja przyciąga nowych fanów.','The broadcast draws new fans.'],['Zostajecie na żywo.','You stay live only.']],fx:[v=>{xcash(v.c);rtF(v.k,5)},()=>{}]},
{k:'rtmerch',t:['Koszulki z trasy','Tour T-shirts'],b:['Fani chcą pamiątek z trasy. Produkcja kosztuje {mm}.','Fans want tour souvenirs. Production costs {mm}.'],v:()=>({...rtV(),c:xc(.03),mm:money(xc(.03))}),gate:rtG(g=>g.legs>=2),o:[['Wyprodukuj ({mm})','Produce ({mm})'],['Odpuść','Skip it']],cost:[1,0],n:[['Pamiątki znikają z półek.','The souvenirs sell out.'],['Szansa przepadła.','The chance is gone.']],fx:[v=>{xcash(-v.c+Math.round(v.c*3));xpop(.05)},()=>{}]}
];
XRT.forEach(XE);
Object.assign(D,{'nav.rt':['Trasy i rynki','Tours and markets'],
 'rt.sub':['Federacja nie gra tylko w jednej hali. Planuj etapy po miastach (house show, gala, trasa dla debiutantów), buduj bazę fanów w każdym mieście i zdobywaj rezydencje. Lokalni bohaterowie przyciągają tłumy, a rywale bronią swoich terytoriów. Od tieru 2.','A promotion does not play in a single arena. Plan legs across cities (house show, gala, rookie tour), grow a fan base in every city and win residencies. Local heroes draw crowds, and rivals defend their turf. From tier 2.'],
 'rt.locked':['Trasy zaczynają się od tieru 2.','Tours start at tier 2.'],'rt.legs':['Etapy','Legs'],'rt.net':['Zysk z tras','Tour profit'],'rt.reach':['Zasięg','Reach'],'rt.reachd':['Zasięg to średnia baza fanów po wszystkich miastach. Podnosi frekwencję na Twoich galach.','Reach is the average fan base across all cities. It raises attendance at your shows.'],
 'rt.plan':['Planer trasy','Tour planner'],'rt.pland':['Etap odbywa się po gali w wybranym tygodniu. Wysyłasz skład, który męczy się w drodze. Max 6 zaplanowanych etapów.','A leg takes place after the show of the chosen week. You send a squad that tires on the road. At most 6 planned legs.'],
 'rt.city':['Miasto','City'],'rt.mode':['Rodzaj','Type'],'rt.when':['Kiedy','When'],'rt.after':['po gali w tyg. {n}','after week {n} show'],'rt.est':['Koszt wyjazdu {c}, skład {n} osób.','Travel cost {c}, squad of {n}.'],'rt.hostile':['teren rywala: {r}','rival turf: {r}'],'rt.host':['teren rywala','rival turf'],
 'rt.add':['Dodaj etap','Add a leg'],'rt.del':['Usuń','Remove'],'rt.noplan':['Brak zaplanowanych etapów.','No planned legs.'],'rt.hist':['Ostatnie etapy','Recent legs'],'rt.markets':['Rynki','Markets'],
 'rt.m.house':['House show','House show'],'rt.m.gala':['Gala (gwiazdy)','Gala (stars)'],'rt.m.rookie':['Trasa debiutantów','Rookie tour'],
 'rt.d.0':['kraj','home'],'rt.d.1':['sąsiad','neighbour'],'rt.d.2':['region','region'],'rt.d.3':['daleko','far'],'rt.d.4':['za oceanem','overseas'],
 'rt.res':['rezydencja ({n} tyg.)','residency ({n} wks)'],'rt.resbtn':['Zawrzyj rezydencję ({m})','Sign a residency ({m})'],
 'rt.m.full':['Nie można dodać etapu (limit albo ten termin jest zajęty).','Cannot add the leg (limit reached or that week is taken).'],'rt.m.ok':['Etap dodany.','Leg added.'],'rt.m.res':['Rezydencja zawarta.','Residency signed.'],'rt.m.nores':['Brak warunków albo środków.','Conditions not met or not enough cash.'],
 'n.rtleg':['Etap trasy w mieście {m}: {a} widzów, wynik {n}.','Tour leg in {m}: {a} attendance, result {n}.'],'n.rtinj':['{w} kontuzjowany podczas etapu w mieście {m}.','{w} injured during the {m} leg.'],'n.rtnocast':['Etap w mieście {m} odwołany: zabrakło zdrowych zawodników.','The {m} leg is cancelled: not enough healthy wrestlers.']});
