// ---- Scouting talents + movement between promotions ----
const REGS={eu:['GB','DE','PL','FR','ES','IT','CZ'],am:['US','CA','MX','BR'],as:['JP','AU','NG']};
const regOf=cc=>Object.keys(REGS).find(k=>REGS[k].indexOf(cc)>=0)||'eu';
const potStars=p=>{const s=Math.round(p/10)/2;return '★'.repeat(Math.floor(s))+(s%1?'½':'')};
function mkTalent(sc){
 const lvl=sc.lvl,cc=pickR(REGS[sc.reg||'eu']),fem=rnd()<.4;
 let pot=clamp(Math.round(48+lvl*.3+(rnd()-.3)*38),40,97);if(rnd()<.03)pot=clamp(pot+20,0,99);
 const st=pickR(STYLES),b=SBIAS[st],base=18+rnd()*12+(pot-50)*.12;
 const w={id:'x'+(G.uid++),name:nameFor(cc,fem),country:cc,style:st,role:pickR(['face','heel','tweener']),
  ring:clamp(Math.round(base+b.ring+(rnd()-.5)*10),12,62),mic:clamp(Math.round(base-4+b.mic+(rnd()-.5)*12),10,62),cha:clamp(Math.round(base+b.cha+(rnd()-.5)*12),10,66),
  pop:2+Math.floor(rnd()*8),age:17+Math.floor(rnd()*6),fed:'PRO',contract:0,injury:0,look:randLook(Math.random,cc,fem),acc:0,
  pot,potEst:clamp(Math.round(pot+(rnd()-.5)*2*(100-lvl)/5),20,99),exp:G.week+10,by:sc.name};
 if(fem)w.g='f';genStats(w,Math.random);w.salary=salaryOf(w,G.fed.tier);return w}
const proFee=w=>Math.round((salaryOf(w,G.fed.tier)*8+600*SALM[G.fed.tier-1])*(.6+w.pot/100)/10)*10;
function scoutWeekly(){
 staffOf('scout').forEach(sc=>{if(G.ws.filter(w=>w.fed==='PRO').length>=8)return;
  if(rnd()<.05+.12*sc.lvl/100){const w=mkTalent(sc);G.ws.push(w);addNews('n.scout',{s:sc.name,w:w.name,c:cn(w.country)})}})}
function proWeekly(){
 G.ws.filter(w=>w.fed==='PRO'&&w.exp<=G.week).forEach(w=>{
  if(rnd()<.5&&G.rivals.length){const r=pickR(G.rivals.filter(x=>x.tier<=3).concat(G.rivals.slice(0,2)));w.fed=r.id;if(w.potEst>=70)addNews('n.prolost',{w:w.name,f:r.name})}
  else{w.fed='FA';w.salary=salaryOf(w,1)}})}
function signPro(id){const w=W(id);if(!w||w.fed!=='PRO'||mine().length>=ROSTERMAX[G.fed.tier-1])return false;const fee=proFee(w);if(G.fed.cash<fee)return false;
 G.fed.cash-=fee;w.fed=G.fed.id;w.salary=salaryOf(w,G.fed.tier);w.contract=104;w.morale=85;w.fatigue=0;w.acc=accStart(w.country,G.fed.country);addNews('n.sign',{w:w.name});return true}
// ----- rival movement -----
function devLite(w){
 const pm=w.pot&&w.age<=27?.4+w.pot/50:1;
 if(w.age<=29&&rnd()<.05*pm){const k=pickR(['ring','str','spd','tec','sta','psy','mic','cha']);if(w[k]<95)w[k]++}
 else if(w.age>=36&&rnd()<.04){const k=pickR(['spd','sta','str']);w[k]=Math.max(5,w[k]-1)}
 if(w.pot&&w.age<=27&&w.pop<w.pot&&rnd()<.03+.05*w.pot/100)w.pop=Math.min(100,w.pop+1);
 else if(w.age>=34&&rnd()<.03)w.pop=Math.max(1,w.pop-1)}
function fedMoves(){
 const real=w=>!w.ext&&w.fed!=='RET'&&w.fed!=='GST'&&w.fed!==G.fed.id;
 G.ws.filter(real).forEach(devLite);
 const cnt=r=>G.ws.filter(w=>w.fed===r.id).length;
 G.rivals.forEach(r=>{
  if(r.tgt===undefined)r.tgt=Math.max(8,cnt(r));
  const roster=G.ws.filter(w=>w.fed===r.id);
  // release
  if(roster.length>r.tgt*.8&&rnd()<.04){const w=roster.sort((a,b)=>(a.pop-(a.age>=38?15:0))-(b.pop-(b.age>=38?15:0)))[0];
   if(w){w.fed='FA';w.salary=salaryOf(w,1);r.pop=clamp(r.pop-(w.pop>=45?.3:0),3,99);if(w.pop>=45)addNews('n.mvrel',{w:w.name,f:r.name})}}
  // sign from free agents
  const open=cnt(r)<r.tgt;
  if(open?rnd()<.35:rnd()<.03){
   const lo=r.pop*.55-5,hi=r.pop*1.2+10;
   const c=G.ws.filter(w=>w.fed==='FA'&&w.pop>=lo&&w.pop<=hi).sort((a,b)=>Math.abs(a.pop-r.pop)-Math.abs(b.pop-r.pop)).slice(0,6);
   if(c.length){const w=pickR(c);w.fed=r.id;r.pop=clamp(r.pop+(w.pop>=45?.3:0),3,99);if(w.pop>=45)addNews('n.mvsign',{w:w.name,f:r.name})}}});
 // transfers between promotions
 if(rnd()<.18){
  const from=G.ws.filter(w=>real(w)&&w.fed!=='FA'&&w.fed!=='PRO'&&w.pop>=30);
  if(from.length){const w=pickR(from),src=G.rivals.find(r=>r.id===w.fed);
   const dst=G.rivals.filter(r=>src&&r.id!==src.id&&r.pop>src.pop&&r.pop>=w.pop*.8&&cnt(r)<r.tgt+3).sort(()=>rnd()-.5)[0];
   if(src&&dst){w.fed=dst.id;src.pop=clamp(src.pop-.4,3,99);dst.pop=clamp(dst.pop+.4,3,99);addNews('n.mvtrans',{w:w.name,a:src.name,b:dst.name})}}}
 proWeekly()}
