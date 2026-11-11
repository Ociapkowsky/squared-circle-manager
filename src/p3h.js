
/* ============ Prizes, opportunity items, tournaments ============ */
const PKINDS=['case','contract','medal','key','ticket','ring','cup','crown'];
const POPP=['case','contract','medal','key','ticket'];
const isOpp=k=>POPP.indexOf(k)>=0;
const prizeOf=id=>(G.prizes||[]).find(p=>p.id===id);
const prizeName=p=>p.name||t('pz.def.'+p.kind);
function defaultPrizes(){const o=[{id:'pzc',kind:'cup',name:null,plate:'gold',target:'',life:0,holder:'',since:0,exp:0,wins:0}];
 if(G.fed.tier>=2)o.unshift({id:'pzb',kind:'case',name:null,plate:'black',target:'',life:52,holder:'',since:0,exp:0,wins:0});return o}
function awardPrize(pz,wi){
 const w=W(wi[0]);if(!w)return;pz.holder=w.id;pz.since=G.week;pz.wins=(pz.wins||0)+1;pz.exp=isOpp(pz.kind)&&pz.life?G.week+pz.life:0;
 w.pop=clamp(w.pop+(isOpp(pz.kind)?.8:1.5),1,100);w.morale=clamp(w.morale+4,0,100);
 G.reigns.unshift({name:prizeName(pz),w:[w.id],week:G.week});addNews('n.prizewin',{w:w.name,p:prizeName(pz)})}
function cashOk(m,pz){
 if(!pz||!pz.holder||!isOpp(pz.kind)||!m.title)return false;const tt=titleOf(m.title);if(!tt)return false;
 if(pz.target&&pz.target!==m.title)return false;const s=sides(m);if(s.A.concat(s.B).indexOf(pz.holder)<0)return false;
 return tt.holders.indexOf(pz.holder)<0}
const cashOpts=m=>(G.prizes||[]).filter(p=>cashOk(m,p));
function cashIn(m,wi,fin){
 const pz=prizeOf(m.cash);if(!pz)return;const tt=titleOf(m.title);if(!tt)return;
 const won=wi.indexOf(pz.holder)>=0&&(fin==='clean'||fin==='dirty'),w=W(pz.holder);
 addNews(won?'n.cashwin':'n.cashfail',{w:w?w.name:'?',p:prizeName(pz),t:titleName(tt)});pz.holder='';pz.exp=0}
function prizeTick(){
 (G.prizes||[]).forEach(p=>{if(p.holder&&!W(p.holder))p.holder='';
  if(p.holder&&p.exp&&G.week>=p.exp){addNews('n.prizeexp',{w:W(p.holder).name,p:prizeName(p)});p.holder='';p.exp=0}});
 tourTick()}
/* tournaments */
const TSIZES=[4,8,16];
const validP=id=>!!W(id)&&W(id).fed===G.fed.id;
function tourRoundName(tr,r){const n=tr.rounds[r].length;return n===1?t('tr.final'):n===2?t('tr.semi'):n===4?t('tr.quarter'):t('tr.round',{n:r+1})}
function mkTour(o){
 const pool=healthy().filter(w=>!w.ext&&(o.gen==='x'||((o.gen==='f')===isF(w.id)))).sort((a,b)=>b.pop-a.pop).slice(0,o.n);
 if(pool.length<o.n)return null;let ids=pool.map(w=>w.id);
 if(o.seed==='rand')ids=shuffle(ids);else{const h=[];for(let i=0;i<ids.length/2;i++)h.push(ids[i],ids[ids.length-1-i]);ids=h}
 const R0=[];for(let i=0;i<ids.length;i+=2)R0.push({a:ids[i],b:ids[i+1],w:''});
 return{id:'TR'+(G.uid++),name:o.name,n:o.n,gen:o.gen,prize:o.prize||'',rounds:[R0],r:0,done:false,winner:'',wk:G.week}}
function tourProgress(tr){
 for(;;){const R=tr.rounds[tr.r];if(R.some(x=>!x.w))return;
  if(R.length===1){tr.done=true;tr.winner=R[0].w;const w=W(tr.winner),pz=tr.prize?prizeOf(tr.prize):null;
   if(w){w.pop=clamp(w.pop+2.5,1,100);w.morale=clamp(w.morale+6,0,100);G.fed.pop=clamp(G.fed.pop+.4,2,100)}
   G.reigns.unshift({name:tr.name,w:[tr.winner],week:G.week});addNews('n.tourwin',{w:w?w.name:'?',t:tr.name});if(pz&&w)awardPrize(pz,[tr.winner]);return}
  const nx=[];for(let i=0;i<R.length;i+=2)nx.push({a:R[i].w,b:R[i+1].w,w:''});tr.rounds.push(nx);tr.r++}}
function tourAdvance(m,wi){
 const tr=(G.tours||[]).find(x=>x.id===m.tour.tid);if(!tr||tr.done)return;
 const mt=tr.rounds[m.tour.r]&&tr.rounds[m.tour.r][m.tour.i];if(!mt||mt.w||!wi.length)return;mt.w=wi[0];tourProgress(tr)}
function tourWO(tr,r,i,side){const mt=tr.rounds[r]&&tr.rounds[r][i];if(!mt||mt.w||tr.r!==r)return;mt.w=mt[side];tourProgress(tr)}
function tourTick(){
 (G.tours||[]).filter(x=>!x.done).forEach(tr=>{
  tr.rounds[tr.r].forEach(mt=>{if(mt.w)return;const va=validP(mt.a),vb=validP(mt.b);if(!va||!vb)mt.w=va?mt.a:vb?mt.b:mt.a});
  tourProgress(tr)});
 G.tours=(G.tours||[]).filter((x,i,a)=>!x.done||a.filter(y=>y.done).indexOf(x)<4)}
const tourOnCard=(tr,i)=>G.card.some(m=>m.tour&&m.tour.tid===tr.id&&m.tour.r===tr.r&&m.tour.i===i);
function tourMatch(tr,i){
 const mt=tr.rounds[tr.r][i];if(!mt||mt.w||tourOnCard(tr,i))return null;
 const a=W(mt.a),b=W(mt.b);if(!a||!b||a.injury||b.injury)return null;const u=usedIds(-1);if(u.has(a.id)||u.has(b.id))return null;
 const m=emptyMatch();m.mode='1v1';m.a[0]=a.id;m.b[0]=b.id;m.stip='tourney';m.tour={tid:tr.id,r:tr.r,i};return m}
function tourSlots(){
 (G.tours||[]).filter(x=>!x.done).forEach(tr=>{if(G.card.length>=6)return;
  for(let i=0;i<tr.rounds[tr.r].length;i++){const m=tourMatch(tr,i);if(m){G.card.unshift(m);break}}})}
/* graphics */
function prizeSvg(pz,w){
 const pl=PLATE[pz.plate]||PLATE.gold,a=pl[0],b=pl[1],k=pz.kind;let s='';
 if(k==='case')s='<path d="M36,28 v-8 a4,4 0 0 1 4,-4 h20 a4,4 0 0 1 4,4 v8" fill="none" stroke="'+b+'" stroke-width="4"/><rect x="12" y="28" width="76" height="44" rx="6" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><rect x="12" y="44" width="76" height="6" fill="'+b+'" opacity=".5"/><rect x="44" y="40" width="12" height="14" rx="2" fill="'+b+'"/><circle cx="50" cy="47" r="2" fill="'+a+'"/><rect x="19" y="33" width="7" height="34" fill="#fff" opacity=".15"/>';
 else if(k==='contract')s='<rect x="22" y="8" width="56" height="64" rx="3" fill="#f3ead2" stroke="#b9a77a" stroke-width="2"/><path d="M30,22 h40 M30,30 h40 M30,38 h26" stroke="#8a7a52" stroke-width="2"/><path d="M30,56 q6,-8 10,0 t10,0" fill="none" stroke="#3b3b6e" stroke-width="1.6"/><polygon points="60,64 56,78 63,73 70,78 66,64" fill="'+b+'"/><circle cx="63" cy="60" r="8" fill="'+a+'" stroke="'+b+'" stroke-width="2"/>';
 else if(k==='medal')s='<path d="M38,6 L50,26 L62,6" fill="none" stroke="'+b+'" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="48" r="28" fill="'+a+'" stroke="'+b+'" stroke-width="4"/><circle cx="50" cy="48" r="20" fill="none" stroke="'+b+'" stroke-width="2"/>'+embSvg('star',50,48,1.2,pl,{},'');
 else if(k==='key')s='<circle cx="28" cy="40" r="17" fill="'+a+'" stroke="'+b+'" stroke-width="4"/><circle cx="28" cy="40" r="6" fill="#000" opacity=".35"/><rect x="42" y="36" width="46" height="8" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="70" y="44" width="7" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="82" y="44" width="6" height="9" fill="'+a+'" stroke="'+b+'" stroke-width="2"/>';
 else if(k==='ticket')s='<rect x="8" y="20" width="84" height="44" rx="5" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><circle cx="8" cy="42" r="6" fill="#000" opacity=".3"/><circle cx="92" cy="42" r="6" fill="#000" opacity=".3"/><path d="M30,24 v36" stroke="'+b+'" stroke-width="2" stroke-dasharray="3 3"/>'+embSvg('star',60,42,1.1,pl,{},'');
 else if(k==='ring')s='<ellipse cx="50" cy="52" rx="26" ry="22" fill="none" stroke="'+b+'" stroke-width="11"/><ellipse cx="50" cy="52" rx="26" ry="22" fill="none" stroke="'+a+'" stroke-width="7"/><polygon points="38,26 62,26 70,16 50,4 30,16" fill="#8be3ff" stroke="'+b+'" stroke-width="2.5" stroke-linejoin="round"/><path d="M30,16 L38,26 M70,16 L62,26 M50,4 L50,26" stroke="'+b+'" stroke-width="1.2"/>';
 else if(k==='cup')s='<path d="M26,10 h48 v20 a24,24 0 0 1 -48,0 z" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><path d="M26,16 h-10 a10,12 0 0 0 10,22 M74,16 h10 a10,12 0 0 1 -10,22" fill="none" stroke="'+b+'" stroke-width="3.5"/><rect x="44" y="54" width="12" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="2"/><rect x="28" y="66" width="44" height="9" rx="2" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><path d="M34,14 v16" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>';
 else s='<polygon points="12,62 12,24 32,44 50,12 68,44 88,24 88,62" fill="'+a+'" stroke="'+b+'" stroke-width="3" stroke-linejoin="round"/><rect x="12" y="56" width="76" height="12" fill="'+a+'" stroke="'+b+'" stroke-width="3"/><circle cx="50" cy="40" r="4" fill="#d83a3a"/><circle cx="30" cy="50" r="3" fill="#3a7bd8"/><circle cx="70" cy="50" r="3" fill="#3a7bd8"/>';
 return '<svg viewBox="0 0 100 80" width="'+w+'" height="'+Math.round(w*.8)+'" role="img" aria-label="'+esc(prizeName(pz))+'">'+s+'</svg>'}
