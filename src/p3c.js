
/* ============ Feud events: joiners and wrestler pitches ============ */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const MAXTEAMS=g=>g===1?6:g===2?4:3;
async function joinEvent(f){
 if(f.titleId||f.fedId||f.stA||f.stB||f.stR)return false;
 const g=f.mw?(f.g||1):(f.A.length===f.B.length?f.A.length:0);
 const fall=f.A.concat(f.B),fg=fall.every(isF)?true:fall.some(isF)?null:false;
 const inF=new Set(f.A.concat(f.B)),busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(i=>busy.add(i)));
 const free=healthy().filter(w=>!inF.has(w.id)&&!busy.has(w.id)&&!isGuest(w.id)&&(fg===null||isF(w.id)===fg)).sort((a,b)=>b.pop-a.pop).slice(0,8);
 if(!free.length)return false;
 const opts=[],acts=[];
 // third side
 if(g>=1&&g<=3&&free.length>=g){
  const grp=shuffle(free).slice(0,g).map(w=>w.id);
  const base=f.mw?f.A:f.A.concat(f.B);const A2=base.concat(grp);
  const tmp={mw:1,g,A:A2,B:[]};
  if(A2.length/g<=MAXTEAMS(g)&&feudMode(tmp)){
   opts.push({l:t('ev.join.third')});acts.push(()=>{f.A=A2;f.B=[];f.mw=1;f.g=g;return grp})}
  var who=grp;
 }
 // join an existing side (singles joiner)
 const w1=shuffle(free)[0];
 if(!f.mw&&w1){
  [['A',f.A,f.B,f.stA],['B',f.B,f.A,f.stB]].forEach(([k,S,O])=>{
   if(S.length+1>10)return;const t1={A:k==='A'?S.concat(w1.id):f.A,B:k==='B'?S.concat(w1.id):f.B};
   if(!feudMode(t1))return;
   opts.push({l:t('ev.join.side',{s:sideLabel(S,'')})});acts.push(()=>{f[k]=S.concat(w1.id);return[w1.id]})})}
 if(!opts.length)return false;
 const shown=(typeof who!=='undefined'&&who&&who.length)?who:[w1.id];
 opts.push({l:t('ev.join.no')});
 const i=await askGeneric(t('ev.join.t'),t('ev.join.b',{w:names(shown),f:fLabel(f)}),opts);
 if(i>=acts.length)return true;
 const j=acts[i]();j.forEach(id=>{const w=W(id);if(w)w.morale=clamp(w.morale+3,0,100)});
 f.heat=clamp(f.heat+6,0,100);addNews('n.joinfeud',{w:names(j),f:fLabel(f)});flog(f,{k:'e',key:'n.joinfeud',x:{w:names(j),f:fLabel(f)}});return true;
}
async function pitchEvent(f){
 if(f.fedId)return false;
 const mineIn=f.A.concat(f.B).map(W).filter(w=>w&&w.fed===G.fed.id&&!w.injury);if(!mineIn.length)return false;
 const p=pickR(mineIn);const others=f.A.concat(f.B).filter(i=>i!==p.id&&W(i));
 const tgt=others.length?W(pickR(others)):null;
 const types=['callout'];
 const ss=Object.keys(STIPS).filter(k=>k!=='none'&&!STNEED[k]&&G.fed.tier>=STIPS[k].tier&&lvlOf(k)<=maxLvl());if(ss.length)types.push('stip','stip');
 if(p.role!=='tweener'||rnd()<.5)types.push('turn');
 if(tgt)types.push('ambush','callout');
 const ty=pickR(types);const s=ty==='stip'?pickR(ss):'';
 const i=await askGeneric(t('ev.pitch.t'),t('ev.pitch.'+ty+'.b',{w:p.name,f:fLabel(f),s:s?t('stip.'+s):'',o:tgt?tgt.name:''}),[{l:t('ev.pitch.yes')},{l:t('ev.pitch.soft')},{l:t('ev.pitch.no')}]);
 if(i===2){p.morale=clamp(p.morale-4,0,100);return true}
 if(i===1){f.heat=clamp(f.heat+3,0,100);p.morale=clamp(p.morale+1,0,100);addNews('n.pitch',{w:p.name,f:fLabel(f)});return true}
 p.morale=clamp(p.morale+4,0,100);
 if(ty==='stip'){f.fav=s;f.heat=clamp(f.heat+8,0,100)}
 else if(ty==='turn'){p.role=p.role==='heel'?'face':'heel';f.heat=clamp(f.heat+12,0,100);addNews('n.turn',{w:p.name,r:t('role.'+p.role).split(' ')[0]})}
 else if(ty==='ambush'){f.heat=clamp(f.heat+15,0,100);if(tgt&&!tgt.injury&&tgt.fed===G.fed.id&&rnd()<.25)injure(tgt,1+Math.floor(rnd()*3))}
 else{f.heat=clamp(f.heat+10,0,100);p.pop=clamp(p.pop+.8,1,100)}
 addNews('n.pitch',{w:p.name,f:fLabel(f)});flog(f,{k:'e',key:'ev.pitch.'+ty+'.b',x:{w:p.name,f:fLabel(f),s:s?t('stip.'+s):'',o:tgt?tgt.name:''}});return true;
}
async function feudEvents(){
 const list=shuffle(G.feuds.filter(f=>!f.fedId&&rnd()<.22)).slice(0,2);
 for(const f of list){
  if(G.feuds.indexOf(f)<0)continue;
  if(rnd()<.45&&await joinEvent(f))continue;
  await pitchEvent(f);
 }
}
