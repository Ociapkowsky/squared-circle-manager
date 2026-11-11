// ---- World events: transfers, poaching, talents ----
const evx=(k,v,labels,dis)=>{const o=labels.map((n,i)=>({l:t('ev.w.'+k+'.'+n,v),dis:!!(dis&&dis[i])}));const dfr=!!window.__inWE&&!window.__noDefer&&G.defer&&G.defer.length<3&&!G.defer.some(d=>d.k===k);if(dfr)o.push({l:t('ev.defer')});return askGeneric(t('ev.w.'+k+'.t'),t('ev.w.'+k+'.b',v),o).then(i=>{if(i>=labels.length)throw {defer:k};return i})};
const sw=()=>Math.round(900*SALM[G.fed.tier-1]/10)*10;
const rivalWith=f=>{const rs=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id&&f(w)));return rs.length?pickR(rs):null};
const leaveTo=(w,r)=>{w.fed=r.id;purgeW(w.id);addNews('n.leave',{w:w.name,f:r.short||r.name})};
const WEV={
 async swap(){
  const A=pickR(mine().filter(w=>w.pop>=15&&!w.farewell&&!isChamp(w.id)&&w.contract>0&&!w.injury));if(!A)return false;
  const r=rivalWith(w=>!w.injury&&!w.ext&&Math.abs(w.pop-A.pop)<=10);if(!r)return false;
  const B=pickR(G.ws.filter(w=>w.fed===r.id&&!w.injury&&!w.ext&&Math.abs(w.pop-A.pop)<=10));if(!B)return false;
  const v={f:r.name,a:A.name,b:B.name,pa:Math.round(A.pop),pb:Math.round(B.pop)};
  const i=await evx('swap',v,['1','2']);
  if(i===0){leaveTo(A,r);B.fed=G.fed.id;B.salary=salaryOf(B,G.fed.tier);B.contract=52;B.morale=70;B.fatigue=0;B.acc=accStart(B.country,G.fed.country);addNews('n.swap',{a:A.name,b:B.name,f:r.name})}
  return true},
 async starfa(){
  if(mine().length>=ROSTERMAX[G.fed.tier-1])return false;
  const w=G.ws.filter(x=>x.fed==='FA'&&x.pop>=Math.max(40,G.fed.pop*.6)).sort((a,b)=>b.pop-a.pop)[0];if(!w)return false;
  const fee=Math.round(salaryOf(w,G.fed.tier)*6/10)*10,v={w:w.name,p:Math.round(w.pop),m:money(fee)};
  const i=await evx('starfa',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=52;w.morale=80;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);addNews('n.sign',{w:w.name})}
  else{const r=pickR(G.rivals);w.fed=r.id;addNews('n.mvsign',{w:w.name,f:r.name})}
  return true},
 async crossover(){
  const r=pickR(G.rivals.filter(x=>Math.abs(x.pop-G.fed.pop)<=25));if(!r)return false;
  const c=Math.round(tdNow().prod*.5/10)*10,v={f:r.name,m:money(c)};
  const i=await evx('cross',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+1.2,2,100);r.pop=clamp(r.pop+.6,3,99);addNews('n.cross',{f:r.name})}
  return true},
 async callout(){
  const r=pickR(G.rivals);const c=Math.round(tdNow().prod*.3/10)*10,v={f:r.name,m:money(c)};
  const i=await evx('call',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;if(rnd()<.7){G.fed.pop=clamp(G.fed.pop+.9,2,100);r.pop=clamp(r.pop-.6,3,99);addNews('n.callok',{f:r.name})}else{G.fed.pop=clamp(G.fed.pop-.8,2,100);addNews('n.callbad',{f:r.name})}}
  else G.fed.pop=clamp(G.fed.pop-.2,2,100);
  return true},
 async unhappy(){
  const w=pickR(mine().filter(x=>x.morale<55&&x.pop>=15&&x.contract>0&&!x.farewell));if(!w)return false;
  const up=Math.round(w.salary*.2/10)*10,v={w:w.name,m:money(up)};
  const i=await evx('unhappy',v,['1','2']);
  if(i===0){w.salary+=up;w.morale=clamp(w.morale+15,0,100)}
  else if(rnd()<.4){leaveTo(w,pickR(G.rivals))}else w.morale=clamp(w.morale-5,0,100);
  return true},
 async campus(){
  const sc=staffOf('scout').sort((a,b)=>b.lvl-a.lvl)[0];if(!sc||G.ws.filter(w=>w.fed==='PRO').length>5)return false;
  const c=sw()*3,v={m:money(c),s:sc.name};
  const i=await evx('campus',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;const s2=Object.assign({},sc,{lvl:Math.min(100,sc.lvl+10)});let n=0;for(let k=0;k<3&&G.ws.filter(w=>w.fed==='PRO').length<8;k++){G.ws.push(mkTalent(s2));n++}addNews('n.campus',{n})}
  return true},
 async agent(){
  const w=pickR(G.ws.filter(x=>x.fed==='PRO'));if(!w||mine().length>=ROSTERMAX[G.fed.tier-1])return false;
  const fee=Math.round(proFee(w)*1.25/10)*10,v={w:w.name,m:money(fee),p:potStars(w.potEst)};
  const i=await evx('agent',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){const f0=G.fed.cash;G.fed.cash-=fee-proFee(w);if(!signPro(w.id))G.fed.cash=f0}else w.exp=Math.min(w.exp,G.week+3);
  return true},
 async tip(){
  if(G.ws.filter(w=>w.fed==='PRO').length>=3)return false;
  const sc={lvl:40,reg:pickR(Object.keys(REGS)),name:t('ev.w.tip.by')};const w=mkTalent(sc);w.by=sc.name;
  const i=await evx('tip',{w:w.name,c:cn(w.country),a:w.age},['1','2']);
  if(i===0)G.ws.push(w);return true},
 async breakthrough(){
  const w=pickR(mine().filter(x=>x.pot>=60&&x.age<=25&&!x.injury));if(!w)return false;
  const c=sw(),v={w:w.name,m:money(c)};
  const i=await evx('break',v,['1','2'],[false,G.fed.cash<c]);
  if(i===0){w.pop=clamp(w.pop+3,1,100);w.morale=clamp(w.morale+8,0,100)}else{G.fed.cash-=c;w.pop=clamp(w.pop+6,1,100);w.morale=clamp(w.morale+12,0,100)}
  addNews('n.break',{w:w.name});return true},
 async buytalent(){
  const w=pickR(mine().filter(x=>x.pot>=65&&x.age<=24&&x.contract>0&&!isChamp(x.id)));if(!w)return false;
  const r=pickR(G.rivals),off=Math.max(sw()*2,Math.round(w.salary*70/10)*10),v={w:w.name,f:r.name,m:money(off)};
  const i=await evx('buy',v,['1','2']);
  if(i===0){G.fed.cash+=off;leaveTo(w,r)}else w.morale=clamp(w.morale+4,0,100);
  return true},
 async scoutraise(){
  const sc=pickR(staffOf('scout'));if(!sc)return false;
  const up=Math.round(sc.salary*.3/10)*10,v={s:sc.name,m:money(up)};
  const i=await evx('scraise',v,['1','2']);
  if(i===0)sc.salary+=up;else{G.staff=G.staff.filter(x=>x!==sc);addNews('n.stafffire',{w:sc.name})}
  return true}
};
async function worldEvents(){
 const keys=Object.keys(WEV);
 for(let round=0;round<2;round++){
  if(rnd()>(round?.25:.65))break;
  const order=shuffle(keys.slice());
  window.__inWE=true;try{ibx();
  for(const k of order.slice(0,8)){let ok=false;try{ok=await WEV[k]()}catch(e){if(e&&e.defer){ok=true;deferEv(e.defer)}else ok=false}if(ok)break}}finally{window.__inWE=false}}}
// ----- poaching rival wrestlers (player-initiated) -----
function poachFee(w){return Math.round(salaryOf(w,G.fed.tier)*14/10)*10}
function poachChance(w){const r=G.rivals.find(x=>x.id===w.fed);if(!r)return 0;
 return clamp(.28+(G.fed.pop-r.pop)/180+(G.fed.tier-r.tier)*.1-(w.pop>G.fed.pop?.1:0)-((w.loyal||50)-50)/300,.05,.85)}
async function poach(id){
 const w=W(id);if(!w||w.fed==='FA'||w.fed==='PRO'||w.fed==='RET'||w.fed===G.fed.id||w.ext)return;
 if(mine().length>=ROSTERMAX[G.fed.tier-1])return;if((w.pcd||0)>G.week)return;
 const r=G.rivals.find(x=>x.id===w.fed);if(!r)return;const fee=poachFee(w),ch=Math.round(poachChance(w)*100);
 const v={w:w.name,f:r.name,m:money(fee),p:ch};
 const i=await askGeneric(t('ev.w.poach.t'),t('ev.w.poach.b',v),[{l:t('ev.w.poach.1',v),dis:G.fed.cash<fee},{l:t('ev.w.poach.2')}]);
 if(i!==0)return;
 w.pcd=G.week+8;
 if(rnd()<poachChance(w)){G.fed.cash-=fee;w.fed=G.fed.id;w.salary=Math.round(salaryOf(w,G.fed.tier)*1.1/10)*10;w.contract=52;w.morale=75;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);
  r.pop=clamp(r.pop-(w.pop>=45?1.2:.5),3,99);G.fed.pop=clamp(G.fed.pop+(w.pop>=45?.5:.2),2,100);addNews('n.poachok',{w:w.name,f:r.name});
  await askGeneric(t('ev.w.poachok.t'),t('ev.w.poachok.b',v),[{l:t('ev.w.ok')}])}
 else{addNews('n.poachno',{w:w.name,f:r.name});await askGeneric(t('ev.w.poachno.t'),t('ev.w.poachno.b',v),[{l:t('ev.w.ok')}])}
 save();render()}
