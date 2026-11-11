// ---- v116: seeded star contracts, star demands, negotiated signings ----
const CTSEED={'Roman Rains':['push','creative','merch','attend'],'Cody Rhoads':['push','creative','rival'],'Jon Sena':['merch','nochar','spot'],'Seth Rawlins':['creative','nochar','exit'],'CN Punk':['creative','exit','rival'],'Randy Ortin':['spot','medical','escalator'],'Drew McIntire':['merch','medical'],'Gunter':['nochar','medical','escalator'],'Rhea Ripple':['push','spot'],'Bianca Bellair':['push','merch','attend'],'Becca Lynch':['merch','creative','attend'],'Charlotte Flare':['push','creative','rival'],'Liv Morgen':['creative','merch'],'Bron Breaker':['push','spot'],'Finn Baylor':['nochar','merch','creative'],'Damien Prince':['creative','exclusive'],'AJ Stiles':['medical','escalator','spot'],'The Mizz':['merch','creative'],'Kenji Omega':['creative','rival','exit'],'Jon Moxlee':['rival','spot','nochar'],'Chris Jerricho':['creative','exit','rival'],'Hiroshi Tanahasi':['escalator','nochar','merch'],'Kazuchika Okata':['merch','attend','nochar'],'Mercedes Mon':['creative','merch','attend'],'Toni Stormm':['medical','escalator'],'Swerve Stricklin':['merch','attend'],'Will Osprey':['creative','spot'],'Hangman Paige':['rival','nochar']};
const CTREQ={'Roman Rains':['push'],'Cody Rhoads':['push','creative'],'Jon Sena':['nochar'],'CN Punk':['creative'],'Bianca Bellair':['push'],'Charlotte Flare':['push'],'Becca Lynch':['merch'],'Kenji Omega':['creative'],'Jon Moxlee':['rival'],'Mercedes Mon':['attend'],'Chris Jerricho':['creative'],'Seth Rawlins':['creative'],'Hiroshi Tanahasi':['nochar'],'Kazuchika Okata':['merch']};
const ctReq=w=>CTREQ[w.name]||[];
const ctPick=(a,n)=>{const u=a.filter((x,i)=>a.indexOf(x)===i).sort(()=>rnd()-.5);return u.slice(0,n)};
function ctSeed(w,fresh){if(!w||w.ext||w.cs)return;w.cs=1;if(w.contract<=0)return;
 let l=[];const mx=ctMax(w);
 if(CTSEED[w.name])l=CTSEED[w.name].slice(0,mx);
 else if(w.pop>=75)l=ctPick(ctWant(w).concat(['escalator','merch','medical','attend']).filter(c=>c!=='push'&&c!=='spot'),Math.min(mx,w.pop>=90?3:2));
 else if(w.pop>=50)l=ctPick(ctWant(w).concat(['escalator','medical']).filter(c=>c!=='push'&&c!=='spot'),rnd()<.6?(rnd()<.3?2:1):0);
 else if(w.pop>=30)l=rnd()<.3?ctPick(ctWant(w).concat(['medical']).filter(c=>c!=='push'&&c!=='spot'),1):[];
 if(l.length<mx&&w.pop>=45&&rnd()<.08&&l.indexOf('exclusive')<0)l.push('exclusive');
 let ty='full';if(w.age<=26&&w.pop<35&&rnd()<.7)ty='dev';else if(w.pop<25&&rnd()<.25)ty='ppa';else if(w.pop>=30&&w.pop<60&&rnd()<.25)ty='option';
 if(fresh){if(w.pop>=85)w.contract=78+Math.floor(rnd()*52);w.salary=Math.round(w.salary*CTT[ty].sal*(w.pop>=90?1.12:w.pop>=75?1.05:1)/10)*10}
 w.cl={l,until:G.week+Math.max(1,w.contract),esc:G.week,push:null,type:ty,opt:0,spotAt:G.week+(fresh?20:0)};
 if(l.indexOf('push')>=0)w.cl.push={until:G.week+(fresh?52:26),ok:isChamp(w.id)}}
const ctSeedAll=f=>{try{mine().forEach(w=>ctSeed(w,f))}catch(e){}};
const _ngco=newGame;newGame=function(id,c){_ngco(id,c);ctSeedAll(true)};
const _toco=takeOver;takeOver=function(tid){const ok=_toco(tid);if(ok)ctSeedAll(true);return ok};
const _iwco=infraWeekly;infraWeekly=function(){ctSeedAll(false);_iwco()};
// star requirements apply to renegotiation
const _cof=ctOffer;ctOffer=function(n){const w=W(n.id),rq=w?ctReq(w).filter(c=>n.cl.indexOf(c)<0):[];if(w&&(w.negCD||0)<=G.week&&rq.length){ctPatHit(w,15);return {res:ctPat(w)<=0?'walk':'req',msg:ctPat(w)<=0?ctWalk(w,n):t('ng.h.req',{w:w.name,c:rq.map(c=>t('cl.'+c)).join(', ')})}}return _cof(n)};
// ---- negotiated signings (free agents, rival stars, pro-scene talents) ----
function sgFee(w,mode){return mode==='fa'?Math.round(salaryOf(w,G.fed.tier)*8*relDisc(w)):mode==='pro'?proFee(w):poachFee(w)}
function ctApply(w,n,fee0){w.salary=ctSal(w,n);w.contract=n.len;w.cl={l:n.cl.slice(),until:G.week+n.len,esc:G.week,push:null,type:n.type||'full',opt:0,spotAt:G.week};
 if(n.cl.indexOf('push')>=0)w.cl.push={until:G.week+26,ok:isChamp(w.id)};w.cs=1;w.bid=null;G.fed.cash-=fee0;w.morale=clamp(Math.max(w.morale||0,72)+4,0,100);w.loyal=clamp(Math.max(w.loyal||0,55)+3,0,100)}
function ctSignOffer(n){const w=W(n.id);if(!w)return {res:'no',msg:''};const mode=n.sign,fee=sgFee(w,mode),sal=ctSal(w,n),fee0=n.bonus*sal;
 const rq=ctReq(w).filter(c=>n.cl.indexOf(c)<0);if(rq.length){ctPatHit(w,15);return {res:ctPat(w)<=0?'walk':'req',msg:ctPat(w)<=0?ctWalk(w,n):t('ng.h.req',{w:w.name,c:rq.map(c=>t('cl.'+c)).join(', ')})}}
 if(mine().length>=ROSTERMAX[G.fed.tier-1])return {res:'fin',msg:t('ng.sign.full')};
 if(G.fed.cash<fee+fee0)return {res:'cash',msg:t('ng.cash')};
 if((w.negCD||0)>G.week)return {res:'wait',msg:t('ng.wait',{w:w.name,n:w.negCD-G.week})};
 if(mode==='poach'&&rnd()>poachChance(w)){w.pcd=G.week+8;const r=G.rivals.find(x=>x.id===w.fed);addNews('n.poachno',{w:w.name,f:r?r.name:'?'});return {res:'fin',msg:t('ng.sign.pno',{w:w.name})}}
 const s=ctScore(w,n)-(w.salary>sal?(1-sal/w.salary)*50:0),roll=rnd()*14-7;
 if(s+roll>=62){
  if(mode==='fa'){if(!ACT.__sign)return {res:'no',msg:''};ACT.__sign({dataset:{id:w.id}})}
  else if(mode==='pro'){signPro(w.id)}
  else{const r=G.rivals.find(x=>x.id===w.fed);G.fed.cash-=fee;w.fed=G.fed.id;w.fatigue=0;w.pat=null;w.acc=accStart(w.country,G.fed.country);if(r){r.pop=clamp(r.pop-(w.pop>=45?1.2:.5),3,99);addNews('n.poachok',{w:w.name,f:r.name})}G.fed.pop=clamp(G.fed.pop+(w.pop>=45?.5:.2),2,100)}
  if(w.fed!==G.fed.id)return {res:'no',msg:''};
  ctApply(w,n,fee0);return {res:'ok',msg:t('ng.sign.ok',{w:w.name,m:money(sal),n:wks(n.len)})}}
 return ctFail(w,n,s)}
const _nmo=negModal;negModal=function(){let h=_nmo();const n=G.neg,w=n&&W(n.id);if(!w||n.done)return h;
 const rq=ctReq(w);
 if(n.sign){const fee=sgFee(w,n.sign),ask=ctAsk(w),r=G.rivals.find(x=>x.id===w.fed);
  h=h.replace(/<h2>[\s\S]*?<\/h2>/,'<h2>'+t('ng.sign.title',{w:esc(w.name)})+'</h2>').replace(/<p class="mute">[\s\S]*?<\/p>/,'<p class="mute">'+(n.sign==='poach'?t('ng.sign.poach',{r:esc(r?r.name:'?'),f:money(fee),p:Math.round(poachChance(w)*100),a:money(ask)}):t('ng.sign.intro',{f:money(fee),a:money(ask)}))+'</p>')}
 if(rq.length&&ctKnow(w)>=3)h=h.replace('<label class="px" for="ngt">','<p class="note">'+t('ng.req',{c:rq.map(c=>t('cl.'+c)).join(', ')})+'</p><label class="px" for="ngt">');
 return h};
// ---- star events ----
const stars=f=>lrw(x=>x.pop>=80&&(!f||f(x)));
const XSST=[
{k:'ststrmain',t:['Gwiazda żąda głównego eventu','A star demands the main event'],b:['{w} twierdzi, że zasługuje na główny event na każdej gali.','{w} says he deserves the main event on every show.'],v:()=>lrv(stars()),gate:()=>mine().some(x=>!x.ext&&x.pop>=80),o:[['Obiecaj częściej','Promise more'],['Odmów','Refuse']],n:[['Gwiazda jest zadowolona, ale presja rośnie.','The star is pleased, but the pressure grows.'],['Gwiazda się obraża.','The star takes offence.']],fx:[v=>{lrM(lrW(v.id),6);lrL(lrW(v.id),3);xmood(-1)},v=>{lrM(lrW(v.id),-6);lrL(lrW(v.id),-4)}]},
{k:'ststrface',t:['Twarz federacji domaga się podwyżki','The face of the company wants a raise'],b:['{w} uważa, że jako twarz federacji zasługuje na wyraźnie wyższą pensję.','{w} thinks that as the face of the company he deserves a clearly higher salary.'],v:()=>lrv(stars()),gate:()=>mine().some(x=>!x.ext&&x.pop>=80),o:[['Daj +15%','Give +15%'],['Odmów','Refuse']],n:[['Gwiazda jest wniebowzięta.','The star is delighted.'],['Gwiazda zaczyna słuchać ofert z zewnątrz.','The star starts listening to outside offers.']],fx:[v=>{const w=lrW(v.id);if(w){w.salary=Math.round(w.salary*1.15/10)*10;lrM(w,7);lrL(w,5)}},v=>{lrM(lrW(v.id),-5);lrL(lrW(v.id),-6)}]},
{k:'ststrquit',t:['Gwiazda grozi odejściem','A star threatens to walk'],b:['{w} grozi, że nie przedłuży umowy, jeśli nie dostanie klauzuli kreatywnej.','{w} threatens not to extend unless he gets a creative-control clause.'],v:()=>lrv(stars(x=>x.contract<=40)),gate:()=>mine().some(x=>!x.ext&&x.pop>=80&&x.contract<=40),o:[['Przyznaj klauzulę','Grant the clause'],['Odmów','Refuse']],n:[['Gwiazda zostaje i przedłuża umowę.','The star stays and extends.'],['Gwiazda patrzy na rywali.','The star looks at rivals.']],fx:[v=>{const w=lrW(v.id);if(w){ctGrant(w,'creative');w.contract+=52;if(w.cl)w.cl.until+=52;lrM(w,6);lrL(w,6)}},v=>{lrM(lrW(v.id),-5);lrL(lrW(v.id),-6)}]},
{k:'ststrloyal',t:['Gwiazda przedłuża z lojalności','A star extends out of loyalty'],b:['{w} chce przedłużyć umowę, bo czuje się tu jak w domu.','{w} wants to extend because he feels at home here.'],v:()=>lrv(stars(x=>x.loyal>=65)),gate:()=>mine().some(x=>!x.ext&&x.pop>=80&&x.loyal>=65),o:[['Przedłuż o 2 lata','Extend by two years'],['Może później','Maybe later']],n:[['Gwiazda wiąże się z federacją na dłużej.','The star commits for longer.'],['Gwiazda wzrusza ramionami.','The star shrugs.']],fx:[v=>{const w=lrW(v.id);if(w){w.contract+=104;if(w.cl)w.cl.until+=104;lrL(w,5)}},()=>{}]},
{k:'ststrfeud',t:['Dwie gwiazdy chcą ze sobą walczyć','Two stars want to face each other'],b:['{w} i {w2} proszą o wielki feud między sobą.','{w} and {w2} ask for a big feud between them.'],v:()=>lrv2(),gate:()=>mine().filter(x=>!x.ext&&x.pop>=70).length>=2,o:[['Zbookuj feud','Book the feud'],['Nie teraz','Not now']],n:[['Fani szaleją na myśl o tym starciu.','Fans go wild at the thought of the clash.'],['Gwiazdy rozumieją.','The stars understand.']],fx:[v=>{lrM(lrW(v.id),4);lrM(lrW(v.id2),4);xpop(.3)},()=>{}]},
{k:'ststrfilm',t:['Gwiazda dostała ofertę filmową','A star got a film offer'],b:['{w} dostał propozycję roli w filmie. Zniknie na kilka tygodni.','{w} got a movie offer and will be away for a few weeks.'],v:()=>lrv(stars()),gate:()=>mine().some(x=>!x.ext&&x.pop>=80),o:[['Puść go','Let him go'],['Zablokuj wyjazd','Block it']],n:[['Gwiazda wraca z jeszcze większą sławą.','The star comes back more famous.'],['Gwiazda się dąsa.','The star sulks.']],fx:[v=>{const w=lrW(v.id);if(w){lrPop(w,2);lrM(w,5);lrHurt(w,3)}xpop(.2)},v=>{lrM(lrW(v.id),-6);lrL(lrW(v.id),-3)}]}
];
XSST.forEach(XE);
Object.assign(D,{'ng.h.req':['{w} stawia warunek: musi mieć {c}.','{w} sets a condition: he must get {c}.'],'ng.req':['Warunek zawodnika: {c}.','His condition: {c}.'],
 'ng.sign.title':['Podpisanie: {w}','Signing: {w}'],'ng.sign.intro':['Negocjujesz z wolnym zawodnikiem. Opłata za podpis: {f}, oczekiwana pensja {a}/tydz.','You negotiate with a free agent. Signing fee: {f}, expected salary {a}/wk.'],
 'ng.sign.poach':['Podkupujesz zawodnika z {r}. Opłata: {f}, szansa na odejście z rywala: {p}%, oczekiwana pensja {a}/tydz.','You are poaching a wrestler from {r}. Fee: {f}, chance he leaves: {p}%, expected salary {a}/wk.'],
 'ng.sign.ok':['{w} podpisuje umowę: {m}/tydz. na {n}.','{w} signs: {m}/wk for {n}.'],'ng.sign.pno':['{w} woli zostać u rywala.','{w} prefers to stay with his promotion.'],'ng.sign.full':['Skład jest pełny.','The roster is full.']});
