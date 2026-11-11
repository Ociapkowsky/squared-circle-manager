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
 let d=0;res.forEach(r=>{d+=r.ok?5*clamp((100-b.conf)/30,.2,1):-4.5*(amb?1.3:1)*b.pat});if(okN===3)d+=4*clamp((100-b.conf)/30,.2,1);
 const bonus=okN===3?r10(wkRev()*1.5*(amb?1.6:easy?.6:1)):0;if(bonus)G.fed.cash+=bonus;
 b.conf=clamp(b.conf+d,0,100);b.hist.unshift({wk:G.week,ok:okN,n:res.length,d:Math.round(d),bonus});b.hist=b.hist.slice(0,12);
 addNews(okN===3?'n.bdgood':okN===0?'n.bdbad':'n.bdmid',{k:okN});
 await askGeneric(t('bd.end.t'),res.map(r=>(r.ok?'✓ ':'✗ ')+goalTxt(r.g)).join(' · ')+' · '+t('bd.end.d',{c:(d>=0?'+':'')+Math.round(d)})+(bonus?' · '+t('bd.end.bonus',{m:money(bonus)}):''),[{l:t('ev.w.ok')}])}
async function boardWeekly(){
 const b=boardEnsure();const last=G.hist[G.hist.length-1];
 if(last&&last.week!==b.lastHW){b.lastHW=last.week;b.profit+=last.rev-last.cost;if(G.summary&&G.summary.sold)b.sold++;b.bs=Math.max(b.bs,G.streak||0);
  let dc=0;if(last.rating>=[3.5,3.5,3.7,3.9,4.1][Math.max(0,Math.min(4,G.fed.tier-1))])dc+=.4;else if(last.rating<2)dc-=.6*b.pat;if(b.conf>70)dc-=(b.conf-70)*.035;if(last.rev-last.cost<0)dc-=.15*b.pat;b.conf=clamp(b.conf+dc,0,100)}
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
 'bg.rating':['Średnia ocena gal min. {n}★','Average show rating at least {n}★'],'bg.profit':['Zysk w kwartale min. {n}','Quarter profit at least {n}'],'bg.pop':['Wzrost popularności o {n} pkt','Popularity up by {n} pts'],'bg.rank':['Pozycja w rankingu: {n} lub lepiej','Ranking position: {n} or better'],'bg.streak':['Seria gal z oceną 3,5★+: {n}','A streak of shows rated 3.5★+: {n}'],'bg.sell':['{n} wyprzedane gale','{n} sold-out shows'],'bg.cup':['Reprezentant wygrywa rundę w turnieju','Your representative wins a round in a tournament'],
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
 'car.l':['Walki w karierze: {m}, bilans {w}-{l}, 5★: {f}','Career: {m} matches, {w}-{l}, 5★: {f}']
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
