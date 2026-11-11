// ---- Injury system: types, medics, relapse, rust ----
const INJS=[{k:'bruise',s:1,st:''},{k:'sprain',s:1,st:'spd'},{k:'cut',s:1,st:''},{k:'ribs',s:2,st:'sta'},{k:'knee',s:2,st:'spd'},{k:'shoulder',s:2,st:'str'},{k:'back',s:2,st:'sta'},{k:'concussion',s:2,st:'psy'},{k:'neck',s:3,st:'tec'},{k:'acl',s:3,st:'spd'},{k:'fracture',s:3,st:'str'},{k:'trauma',s:3,st:'psy'}];
const medLvls=r=>staffOf(r).map(s=>s.lvl);
const docChance=()=>1-medLvls('doc').reduce((p,l)=>p*(1-.10*l/100),1);
const physLvl=()=>medLvls('phys').reduce((m,l)=>Math.max(m,l),0);
const physMul=()=>Math.max(.5,medLvls('phys').reduce((p,l)=>p*(1-.35*l/100),1));
const coachRisk=()=>1-Math.min(.25,medLvls('coach').reduce((a,b)=>a+b,0)/400);
const injRisk=w=>(w.rust>0?1.5:1)*trInj(w)*((w.fed===G.fed.id||w.fed==='GST')?coachRisk():1);
const ours=w=>w.fed===G.fed.id||w.fed==='GST';
function injure(w,weeks,quiet){
 const sev=weeks<=2?1:weeks<=5?2:3,k=pickR(INJS.filter(x=>x.s===sev));
 const wk=ours(w)?Math.max(1,Math.round(weeks*physMul()*medMul())):weeks;
 w.injury=wk;w.inj={k:k.k,s:sev,tot:wk,rel:0};
 if(!quiet)addNews('n.injury',{w:w.name,i:t('inj.'+k.k),n:wk})}
const injTxt=w=>(w.inj?t('inj.'+w.inj.k)+' · ':'')+t('r.inj',{n:wks(w.injury)});
function recover(w){
 const i=w.inj;delete w.inj;if(!i)return;
 if(!ours(w))return;
 const st=(INJS.find(x=>x.k===i.k)||{}).st;
 const pm=1-.5*physLvl()/100;
 if(st&&i.s>=2&&rnd()<(i.s===3?.35:.12)*pm){const loss=i.s===3?3:2;w[st]=Math.max(10,(w[st]||30)-loss);addNews('n.injperm',{w:w.name,s:t('st.'+st),n:loss})}
 if(i.s>=2){w.rust=2;
  if(!i.rel&&rnd()<.08*(1-.6*physLvl()/100)){w.injury=Math.max(1,Math.ceil(i.tot/2));w.inj={k:i.k,s:i.s,tot:w.injury,rel:1};addNews('n.relapse',{w:w.name,i:t('inj.'+i.k),n:w.injury})}
  else addNews('n.rust',{w:w.name})}}
function injWeekly(){
 const dc=docChance();
 G.ws.forEach(w=>{
  if(w.rust>0&&!w.injury)w.rust--;
  if(ours(w)){
   if(w.injury>0&&dc>0&&rnd()<dc){w.injury=0;addNews('n.docheal',{w:w.name})}
   if(w.injury<=0&&w.inj)recover(w);
  }else if(w.fed!=='RET'&&!w.ext&&w.fed!=='PRO'){
   if(w.injury>0){w.injury--;if(w.injury<=0)delete w.inj}
   else if(rnd()<.006)injure(w,1+Math.floor(rnd()*8),true)}})}

// ---- Free-agent pool ----
const FAMAX=300;
const faList=()=>G.ws.filter(w=>w.fed==='FA');
function fillFA(n){let c=faList().length;while(c<n){spawnFA(true);c++}}
function faFlow(){
 const k=2+Math.floor(rnd()*3);for(let i=0;i<k;i++)spawnFA();
 // veterans and washed-out wrestlers drop out of the pool
 const gone=new Set();faList().forEach(w=>{if(w.age>=41&&w.pop<35&&rnd()<.1)gone.add(w.id)});
 const fa=faList().filter(w=>!gone.has(w.id));if(fa.length>FAMAX){fa.sort((a,b)=>a.pop-b.pop||b.age-a.age).slice(0,fa.length-FAMAX).forEach(w=>gone.add(w.id))}
 if(gone.size)G.ws=G.ws.filter(w=>!gone.has(w.id))}
