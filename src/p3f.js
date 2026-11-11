
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
