
/* ============ Media (TV / streaming), PPV-PLE weeks, show events ============ */
const PLAT={yt:{lvl:1,pm:1,sp:1.15,share:.7,rate:'pg'},twitch:{lvl:1,pm:.95,sp:1.1,share:.7,rate:'pg'},kick:{lvl:3,pm:1.2,sp:.8,share:.95,rate:'mature'},own:{lvl:3,pm:0,sp:.9,share:1,rate:'mature',setup:12,infra:.12},tv:{lvl:2,pm:0,sp:1.2,share:.85,rate:'tv14'}};
const SB=[300,2500,22e3,200e3,1.6e6],TVPOP=[0,16,34,55,75],TVWEEKS=26,PLATCD=4;
const STLVL={none:1,submission:1,ironman:1,prizematch:1,tourney:1,lms:2,cage:2,ladder:2,tables:3,extreme:3};
const lvlOf=s=>STLVL[s]||1;
const tvFee=()=>Math.round(tdNow().tv*(.75+G.fed.pop/200));
function media(){if(!G.media)G.media=G.fed.tier>=3?{k:'tv',p:'tv',fee:tvFee(),exp:G.week+TVWEEKS,last:'yt',chg:0}:{k:'stream',p:'yt',chg:-99,last:'yt'};return G.media}
const maxLvl=()=>PLAT[media().p].lvl;
function platRev(p){if(p==='tv')return media().p==='tv'?media().fee:tvFee();const P=PLAT[p];const pm=p==='own'?.45+G.fed.pop/100*1.1:P.pm;return Math.round(SB[G.fed.tier-1]*pm*(.4+G.fed.pop/100*1.2))}
const mediaRev=()=>platRev(media().p)*(G.netPen&&G.netPen.wk>0?G.netPen.m:1);
const mediaCost=()=>media().p==='own'?Math.round(tdNow().prod*PLAT.own.infra):0;
const sponsMul=()=>PLAT[media().p].sp*studioMul();
const isBig=()=>G.week%4===0;
const bigType=()=>G.bigType||(media().p==='tv'?'ple':'ppv');
const BIGN=[['Fala Uderzeniowa','Shockwave'],['Wieczór Żelaza','Iron Evening'],['Rozstrzygnięcie','Decision Night'],['Zerwane Łańcuchy','Broken Chains'],['Noc Pretendentów','Contenders\' Night'],['Grom nad Areną','Thunder Over the Arena'],['Czerwona Linia','Red Line'],['Wielki Finał','Grand Finale']];
const bigName=()=>bigNameFor(G.fed.id,G.week);
function bigEst(type,rating){const T=tdNow(),m=media();rating=rating||3;
 if(type==='ppv'){const buys=Math.round(T.cap*(.6+G.fed.pop/100*1.6)*clamp(rating/3,.4,1.5));return{buys,rev:Math.round(buys*T.price*1.3*PLAT[m.p].share)}}
 return{buys:0,rev:m.p==='tv'?Math.round(m.fee*3):0}}
function setPlatform(p){const m=media();m.last=p;m.k='stream';m.p=p;m.chg=G.week;G.card.forEach(fixMatch)}
function mediaWeekly(){ // contract expiry
 const m=media();if(m.p==='tv'&&G.week>=m.exp){G.media={k:'stream',p:m.last||'yt',chg:G.week,last:m.last||'yt'};addNews('n.tvend');G.card.forEach(fixMatch)}
 if(isBig())addNews('n.bigwk',{n:bigName()});
}
/* in-show events between matches */
async function showEvent(fast){
 const T=tdNow();const ids=['glitch','stunt','fan'];const fa=G.ws.filter(w=>w.fed==='FA'&&w.pop>=Math.max(10,G.fed.pop*.5)).sort((a,b)=>b.pop-a.pop)[0];
 if(fa&&G.fed.cash>fa.salary*3)ids.push('vet','vet');
 const ms=healthy();if(ms.length>=2)ids.push('brawl','brawl');
 const id=pickR(ids);let bonus=0;
 const ask2=async(x,opts)=>fast?opts.findIndex(o=>!o.dis):await askGeneric(t('se.'+id+'.t'),t('se.'+id+'.b',x),opts);
 if(id==='vet'){const cost=Math.round(fa.salary*2);
  const i=await ask2({w:fa.name,m:money(cost)},[{l:t('se.vet.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('se.vet.2')}]);
  if(i===0){G.fed.cash-=cost;bonus+=.2;G.fed.pop=clamp(G.fed.pop+.4,2,100);fa.pop=clamp(fa.pop+.5,1,100);addNews('n.vet',{w:fa.name})}}
 else if(id==='glitch'){const cost=Math.round(T.prod*.15);
  const i=await ask2({m:money(cost)},[{l:t('se.glitch.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('se.glitch.2')}]);
  if(i===0)G.fed.cash-=cost;else{bonus-=.2;G.fed.pop=clamp(G.fed.pop-.3,2,100)}}
 else if(id==='stunt'){const amt=Math.round(T.prod*.4);
  const i=await ask2({m:money(amt)},[{l:t('se.stunt.1',{m:money(amt)})},{l:t('se.stunt.2')}]);
  if(i===0){G.fed.cash+=amt;bonus-=.1}}
 else if(id==='fan'){const i=await ask2({},[{l:t('se.fan.1')},{l:t('se.fan.2')}]);
  if(i===0){bonus+=.1;G.fed.pop=clamp(G.fed.pop+.2,2,100)}}
 else if(id==='brawl'){const p=shuffle(ms).slice(0,2);const mature=maxLvl()>=2;
  const i=await ask2({a:p[0].name,b:p[1].name},[{l:t('se.brawl.1')},{l:t('se.brawl.2'),dis:!mature},{l:t('se.brawl.3')}]);
  if(i===0)p.forEach(w=>w.morale=clamp(w.morale-2,0,100));
  else if(i===1){bonus+=.2;p.forEach(w=>w.morale=clamp(w.morale-3,0,100));if(rnd()<.15){const w=pickR(p);if(!w.injury)injure(w,1+Math.floor(rnd()*3))}}
  else{p.forEach(w=>{w.morale=clamp(w.morale-5,0,100);G.fed.cash+=Math.round(w.salary*.3)});}}
 return bonus}
