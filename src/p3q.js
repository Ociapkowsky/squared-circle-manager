/* ============ Rivals & allies (per wrestler, up to 5 each, rotating) ============ */
const REL_MAX=5;
function relList(w,k){return (w[k]=(w[k]||[]).filter(id=>{const x=W(id);return x&&x!==w&&x.fed===G.fed.id}))}
const rvOf=w=>relList(w,'rv'),alOf=w=>relList(w,'al');
function relLink(a,b,k){const A=relList(a,k),B=relList(b,k);if(A.length<REL_MAX&&A.indexOf(b.id)<0)A.push(b.id);if(B.length<REL_MAX&&B.indexOf(a.id)<0)B.push(a.id)}
function relUnlink(a,b,k){a[k]=(a[k]||[]).filter(x=>x!==b.id);b[k]=(b[k]||[]).filter(x=>x!==a.id)}
function relWeights(w,x,k){
 const st=stableOf(w.id),same=st&&st===stableOf(x.id);const feud=G.feuds.some(f=>(f.A.indexOf(w.id)>=0&&f.B.indexOf(x.id)>=0)||(f.B.indexOf(w.id)>=0&&f.A.indexOf(x.id)>=0));
 const pc=G.pairs[pairKey(w.id,x.id)]||0;
 if(k==='rv'){if(same)return 0;let s=1;if(w.role!==x.role&&w.role!=='neutral'&&x.role!=='neutral')s+=3;if(feud)s+=4;if(Math.abs(w.pop-x.pop)<=15)s+=2;if(w.style===x.style)s+=.5;if(x.pop>w.pop+5)s+=1;return s}
 let s=.5;if(same)s+=4;if(w.role===x.role)s+=2;s+=Math.min(4,pc*.5);if(feud)return 0;if(w.g===x.g)s+=.5;return s}
function relPick(w,pool,k){
 const c=pool.map(x=>({x,s:relWeights(w,x,k)})).filter(o=>o.s>0);let tot=0;c.forEach(o=>tot+=o.s);if(!tot)return null;
 let r=rnd()*tot;for(const o of c){r-=o.s;if(r<=0)return o.x}return c[0].x}
function relWeekly(){
 const ms=mine().filter(w=>!w.farewell);
 ms.forEach(w=>{rvOf(w);alOf(w)});
 ms.forEach(w=>{
  rvOf(w).slice().forEach(id=>{if(rnd()<.045)relUnlink(w,W(id),'rv')});
  alOf(w).slice().forEach(id=>{if(rnd()<.025)relUnlink(w,W(id),'al')});
  if(w.rv.length<REL_MAX&&rnd()<.14){const x=relPick(w,ms.filter(o=>o!==w&&w.rv.indexOf(o.id)<0&&w.al.indexOf(o.id)<0&&o.rv.length<REL_MAX),'rv');
   if(x){relLink(w,x,'rv');if(w.pop>=35||x.pop>=35)addNews('n.rvnew',{a:w.name,b:x.name})}}
  if(w.al.length<REL_MAX&&rnd()<.12){const x=relPick(w,ms.filter(o=>o!==w&&w.rv.indexOf(o.id)<0&&w.al.indexOf(o.id)<0&&o.al.length<REL_MAX),'al');
   if(x){relLink(w,x,'al');if(w.pop>=35||x.pop>=35)addNews('n.alnew',{a:w.name,b:x.name})}}
 });
}
function relEnsure(){if(G.relInit)return;G.relInit=1;for(let i=0;i<14;i++)relWeekly()}
function relAfterMatch(m,wi,li){
 if(MODES[m.mode].ffa)return;
 const k=m.title?.2:.1;
 wi.forEach(a=>li.forEach(b=>{const x=W(a),y=W(b);if(x&&y&&rnd()<k&&(x.al||[]).indexOf(b)<0&&stableOf(a)!==stableOf(b)&&(!x.rv||x.rv.indexOf(b)<0))relLink(x,y,'rv')}));
 if(wi.length>1)for(let i=0;i<wi.length;i++)for(let j=i+1;j<wi.length;j++){const x=W(wi[i]),y=W(wi[j]);if(x&&y&&rnd()<.1&&(x.rv||[]).indexOf(y.id)<0)relLink(x,y,'al')}
}
function relBonus(A,B){let v=0;A.forEach(a=>{const rv=W(a).rv||[];B.forEach(b=>{if(rv.indexOf(b)>=0)v+=1.5})});return Math.min(3,v)}
/* rival interference during a show; returns null (nothing), false (saved by an ally) or true (result flipped) */
function rvInterfere(m,oc,res,log){
 if(MODES[m.mode].ffa)return null;
 const{A,B}=sides(m);const inM=new Set(A.concat(B));const rivs=[];
 oc.wi.forEach(id=>{const w=W(id);if(!w)return;rvOf(w).forEach(r=>{const x=W(r);if(x&&!inM.has(r)&&!x.injury&&!rivs.some(y=>y.r===x))rivs.push({r:x,t:w})})});
 if(!rivs.length)return null;
 const rf=1-clamp((sfx().refL-SBASE)/70,0,1)*.6;
 if(rnd()>clamp(.02+.025*rivs.length,0,.12)*rf*(m.title?1.25:1))return null;
 const pk=pickR(rivs),tg=pk.t;
 const al=[];oc.wi.forEach(id=>{const w=W(id);if(w)alOf(w).forEach(a=>{const x=W(a);if(x&&!inM.has(a)&&!x.injury&&x!==pk.r&&al.indexOf(x)<0)al.push(x)})});
 const sv=shuffle(al.slice()).find(a=>rnd()<.17+(a.loyal||50)/500);
 res.stars+=.25;
 if(sv){
  log('ln gold',esc(t('rv.save',{a:sv.name,r:pk.r.name,w:tg.name})));addNews('n.rvsave',{a:sv.name,r:pk.r.name,w:tg.name});
  sv.pop=clamp(sv.pop+.3*popDim(sv.pop),1,100);tg.morale=clamp(tg.morale+2,0,100);relLink(sv,pk.r,'rv');return false}
 log('ln gold',esc(t('rv.hit',{r:pk.r.name,w:tg.name})));addNews('n.rvhit',{r:pk.r.name,w:tg.name});
 m.winner=m.winner==='a'?'b':'a';m.finish='dirty';res.finish='dirty';
 tg.morale=clamp(tg.morale-4,0,100);pk.r.pop=clamp(pk.r.pop+.5*popDim(pk.r.pop),1,100);return true}
function relHtml(w){
 if(w.fed!==G.fed.id)return '';
 const nm=a=>a.length?esc(a.map(i=>W(i).name).join(', ')):'—';
 return cupHtml(w)+'<div class="mute" style="font-size:13px"><b>'+t('rv.rivals')+':</b> '+nm(rvOf(w))+'</div><div class="mute" style="font-size:13px"><b>'+t('rv.allies')+':</b> '+nm(alOf(w))+'</div>';
}
Object.assign(WEV,{
 async allyboost(){
  if(rnd()>.4)return false;
  const pr=[];mine().filter(w=>!w.farewell&&!w.injury).forEach(w=>alOf(w).forEach(id=>{const a=W(id);if(a&&!a.injury&&w.id<id)pr.push([w,a])}));
  if(!pr.length)return false;
  const p=pickR(pr),k=pickR(['ring','psy','sta','mic','cha',KEY[p[0].style]]);
  const lo=p[0][k]<=p[1][k]?p[0]:p[1],hi=lo===p[0]?p[1]:p[0];if(lo[k]>=96)return false;
  const c=r10(wkRev()*.25),v={a:hi.name,b:lo.name,s:t('st.'+k),m:money(c)};
  const i=await evx('allyboost',v,['1','2','3'],[false,G.fed.cash<c,false]);
  if(i===0){lo[k]=clamp(lo[k]+1,1,99);addNews('n.alboost',v)}
  else if(i===1){G.fed.cash-=c;lo[k]=clamp(lo[k]+1,1,99);if(hi[k]<99)hi[k]=clamp(hi[k]+1,1,99);lo.morale=clamp(lo.morale+3,0,100);hi.morale=clamp(hi.morale+3,0,100);addNews('n.alboost2',v)}
  return true}
});
E('allyboost','Sojusznicy trenują razem','Allies train together','{a} i {b} to sojusznicy. {a} proponuje wspólne treningi: {s} u {b} mogłoby się poprawić. Obóz sponsorowany kosztuje {m}.','{a} and {b} are allies. {a} offers to train together: {b}\'s {s} could improve. A sponsored camp costs {m}.',[['Wspólny trening (za darmo, +1 {s} dla {b})','Train together (free, +1 {s} for {b})'],['Sponsoruj obóz ({m}, +1 {s} dla obu)','Sponsor a camp ({m}, +1 {s} for both)'],['Nie teraz','Not now']]);
Object.assign(D,{
 'rv.rivals':['Rywale','Rivals'],'rv.allies':['Sojusznicy','Allies'],
 'rv.save':['{a} wbiega do ringu i zatrzymuje {r}, który chciał popsuć wygraną {w}!','{a} runs in and stops {r}, who tried to ruin {w}\'s win!'],
 'rv.hit':['{r} ingeruje w walkę i odbiera zwycięstwo zawodnikowi {w}!','{r} interferes and robs {w} of the win!'],
 'n.rvnew':['{a} i {b} zostają rywalami.','{a} and {b} have become rivals.'],
 'n.alnew':['{a} i {b} zostają sojusznikami.','{a} and {b} have become allies.'],
 'n.rvsave':['{a} uratował wygraną {w}, odpierając {r}.','{a} saved {w}\'s win by fending off {r}.'],
 'n.rvhit':['{r} zniweczył wygraną {w} swoją ingerencją.','{r} wrecked {w}\'s win with an interference.'],
 'n.alboost':['{b} poprawia {s} dzięki wspólnym treningom z {a}.','{b} improved {s} after training with {a}.'],
 'n.alboost2':['Obóz sponsorowany: {a} i {b} poprawiają {s}.','Sponsored camp: {a} and {b} improved {s}.']
});
