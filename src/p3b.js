
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
function stipBonus(m){const s=STIPS[m.stip]||STIPS.none;const{A,B}=sides(m);return 2.2*avg(A.concat(B).map(i=>s.aff[W(i).style]||0))}
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
 try{res.stars+=angleMatch(m,A,B,wi,li)+feudStake(m)+titleBonus(m,A,B)+trBonus(m,A,B)+meStars()}catch(e){}
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
 if(m.title){const tt=titleOf(m.title);if(tt){tt.lw=G.week;const hid=tt.holders;const held=hid.length>0&&hid.every(x=>wi.indexOf(x)>=0);const changes=(fin==='clean'||fin==='dirty')&&!held;
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
 try{mcProg(live,total)}catch(e){}
 let cur=null;const log=(cls,html)=>{const d=document.createElement('div');d.className=cls;d.innerHTML=html;(cur||live).appendChild(d);if(d.scrollIntoView)d.scrollIntoView({block:'nearest'})};
 const dl=ms=>RUN&&RUN.fast?Promise.resolve():sleep(ms);
 const prs=(G.promos||[]).filter(promoReady);
 const doPromos=async(at)=>{for(const p of prs.filter(p=>Math.min(p.at,total)===at)){cur=document.createElement('div');cur.className='mc mc-promo';live.appendChild(cur);let o;try{o=runPromo(p,log)}finally{cur=null}out.push(o);await dl(700)}};
 for(let i=0;i<total;i++){
  await doPromos(i);
  if(i>0&&i<total&&RUN.nev<2&&rnd()<.22){RUN.nev++;RUN.bonus+=await showEvent(RUN.fast)}
  const m=ready[i];const{A,B}=sides(m);let oc=outcome(m);const ffa=!!MODES[m.mode].ffa;
  const an=ffa?names(teamsOf(m)[0]):names(A),bn=ffa?names(A.slice(teamsOf(m)[0].length)):names(B);
  const fo=feudOf(m);const wasBlow=!!fo&&fo.f.heat>=70&&fo.cov>=.99;
  let surprise=false;if(m.cash&&m.title){const tt0=titleOf(m.title);if(tt0&&ready.slice(0,i).some(x=>{const s0=sides(x);return tt0.holders.some(c=>s0.A.concat(s0.B).indexOf(c)>=0)})){surprise=true;tt0.holders.forEach(c=>{if(W(c))W(c).fatigue=clamp(W(c).fatigue+25,0,100)})}}
  const res={stars:baseStars(m,i,total)+(surprise?.3:0),heatFx:0,finish:m.finish};
  const tt=m.title?titleOf(m.title):null;const held0=tt?tt.holders.slice():null;try{cur=mcNew(live,m,i,total,tt);mcProgSet(live,i)}catch(e){cur=null}
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
  try{const fl=finLine(m,oc,res);if(fl)log('ln gold',esc(fl))}catch(e){}
  log('ln',esc(t('ln.f.'+(res.finish==='clean'?'clean':res.finish==='dirty'?'dirty':res.finish==='dq'?'dq':res.finish==='count'?'count':'draw'),{w:wn,l:ln})));
  try{if(cur){cur.insertAdjacentHTML('beforeend',mcResult(m,res,oc,tt,held0));mcCount(cur);const rr=cur.lastElementChild;if(rr&&rr.scrollIntoView)rr.scrollIntoView({block:'nearest'})}else log('',starsHtml(res.stars)+' <b>'+f2(res.stars)+'</b>')}catch(e){log('',starsHtml(res.stars)+' <b>'+f2(res.stars)+'</b>')}
  out.push({a:ffa?names(A.map(x=>x)):an,b:ffa?'':bn,ffa,stars:res.stars,winner:wn,title:tt?titleName(tt):'',stip:m.stip,finish:res.finish,feud:!!fo,blow:wasBlow,pos:i,tc:!!tt&&!!held0&&!mcSame(held0,tt.holders),wid:oc.wi.slice(0,2)});
  cur=null;await dl(500);
 }
 await doPromos(total);
 finishShow(out);RUN=null;
}

function popDim(p){return Math.max(.12,1-Math.pow(p/100,2.2)*1.05)}
/* ============ Economy and week ============ */
function demandAt(pm,noise){
 const homeN=healthy().filter(w=>w.country===G.fed.country).length;
 return .2+G.fed.pop/100*.8+((G.lastRating===null?2.5:G.lastRating)-2.5)*.07-priceFx(pm)+Math.min(.06,homeN*.008)+(noise?(rnd()-.5)*.08:0);
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
 const stipRev=G.card.reduce((a,m)=>{const sp=STIPS[m.stip]||STIPS.none;if(m.stip==='none')return a;let fit=0;try{fit=stipBonus(m)/2.2}catch(e){}return a+T.prod*sp.cost*clamp(.55+.35*fit,.15,1.5)},0)*(big?1.3:1);
 const rev=gate+merch+tv+spons+ppv+ple+stipRev;
 const sal=mine().reduce((s,w)=>s+w.salary,0)+staffPay();
 const stipCost=G.card.reduce((s,m)=>s+T.prod*(STIPS[m.stip]||STIPS.none).cost*.8,0);
 const prod=(T.prod*1.4+stipCost)*(big?2.2:1)+mediaCost(),ovh=Math.round(rev*(OVHR[G.fed.tier-1]||0)),cost=sal+prod+ovh;
 G.fed.cash+=rev-cost;
 const exp=1.8+G.fed.pop/45+Math.max(0,G.fed.pop-70)/100*2.2+(G.fed.tier-1)*.12+(big?.3:0);let dp=clamp((rating-exp)*(G.fed.pop<25?1.5:.9)-.1+(sold?.3:0),-3,4);
 if(big&&bt==='ple'){if(dp>0)dp*=1.25;if(rating>=3)dp+=.3}
 if(big&&thin)dp-=.5;if(media().p==='yt'&&dp>0)dp*=1.1;
 if(G.price>125)dp-=(G.price-125)/100*.8;else if(G.price<90)dp+=(90-G.price)/100*.5;
 if(dp>0)dp*=Math.max(.25,1.15-G.fed.pop/100*.9);if(dp>0)dp*=G.fed.pop<25?PGR[0]:PGR[1];dp+=gf.pp;const before=G.fed.pop;G.fed.pop=clamp(G.fed.pop+dp,2,100);
 G.streak=rating>=3.5?G.streak+1:0;G.lastRating=rating;
 G.hist.push({week:G.week,rating,att,cap:T.cap,gate,merch,tv,spons,ppv,ple,rev,sal,prod,ovh,cost});if(G.hist.length>40)G.hist.shift();
 G.summary={rating,att,cap:T.cap,sold,rev,cost,ovh,profit:rev-cost,dpop:G.fed.pop-before,out,gate,merch:merch+stipRev,stipRev,tv,spons,ppv,ple,big,bt,buys,thin,plat:media().p,sal,prod,guests:gf.names,fwn:fwN,sfx:{ref:sf.ref,comm:sf.comm,ann:sf.ann}};
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
