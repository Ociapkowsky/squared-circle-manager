
/* ============ Promos (segments between matches) ============ */
const PTYPES={
 rally:{role:{face:3,tweener:1.5,heel:.3}},heartfelt:{role:{face:3,tweener:1,heel:.1}},
 insult:{role:{heel:3,tweener:1.5,face:.3}},cheap:{role:{heel:3,tweener:.7,face:0}},
 menace:{role:{heel:2,tweener:1,face:.5},st:{brawler:2,hardcore:2,powerhouse:2}},
 analytic:{role:{face:1,heel:1,tweener:1},st:{technician:3,strong:2}},
 comedy:{role:{face:1.5,tweener:2.5,heel:1}},humble:{role:{face:2,tweener:1,heel:0}},
 highflyer:{role:{face:2,tweener:1.5,heel:.7},st:{highflyer:3,lucha:3}},
 faceoff:{role:{face:1,tweener:1,heel:1}},champ:{role:{face:1.5,tweener:1,heel:1.5}}};
function promoFeud(p){const ids=[p.a,p.b].filter(Boolean);let best=null;
 G.feuds.forEach(f=>{const all=f.A.concat(f.B);const c=ids.filter(i=>all.indexOf(i)>=0).length;if(c&&(!best||c>best.c||(c===best.c&&f.heat>best.f.heat)))best={f,c}});return best}
function promoType(a,b,both){
 const ws=[];Object.keys(PTYPES).forEach(k=>{const P=PTYPES[k];let v=(P.role[a.role]!=null?P.role[a.role]:.5)+((P.st||{})[a.style]||0);
  if(k==='comedy')v+=Math.max(0,(a.cha-50)/30);if(k==='heartfelt')v+=Math.max(0,(a.mic-50)/30);
  if(k==='humble')v=a.pop<35?v+2.5:0;if(k==='champ')v=isChamp(a.id)?v+4:0;
  if(k==='faceoff')v=b&&both?6:0;else if(b)v*=.5;
  if(maxLvl()<2&&(k==='cheap'||k==='menace'))v*=.3;
  if(v>0)ws.push([k,v])});
 let r=rnd()*ws.reduce((s,x)=>s+x[1],0);for(const x of ws){r-=x[1];if(r<=0)return x[0]}return ws[0][0]}
function runPromo(p,log){
 const a=W(p.a),b=p.b?W(p.b):null;const pf=promoFeud(p);const both=!!(pf&&b&&pf.c>=2);
 const ty=promoType(a,b,both),v=1+Math.floor(rnd()*3);
 const tgtId=b?b.id:(feudFoes(a.id)[0]||'');const tgt=tgtId&&W(tgtId)?W(tgtId).name:t('pr.crowd');
 const sp=[a].concat(b?[b]:[]);
 const fit=(PTYPES[ty].role[a.role]||.5)/3+((PTYPES[ty].st||{})[a.style]?.3:0);
 const score=avg(sp.map(w=>micEff(w)*.5+chaEff(w)*.3+w.psy*.1))+Math.min(1,fit)*10+(rnd()-.5)*14+avg(sp.map(w=>w.ext?w.fame*.08:0));
 let stars=Math.round(clamp(score/20,.5,5)*4)/4;
 sp.forEach(w=>{w.pop=clamp(w.pop+(stars-2.5)*.15,1,100);w.morale=clamp(w.morale+1,0,100);w.wrestled=true});
 if(pf){const f=pf.f;const gain=(stars*3+(ty==='faceoff'?2:0))*heatMul(f.sc)*(both?1.25:1)+(avg(sp.map(w=>micEff(w)))-50)/40;f.heat=clamp(f.heat+gain,0,100);f.used=true;
  flog(f,{k:'p',ty,v,a:a.name,b:tgt,s:stars})}
 const q=stars>=4?4:stars>=3?3:stars>=2?2:1;
 log('hd',esc(t('pr.hd',{a:names(sp.map(w=>w.id)),ty:t('pr.type.'+ty)})));
 if(a.ext)log('ln',esc(t('gs.cam.'+a.ext+'.'+v,{a:a.name,x:a.film||a.hit||(a.sport?t('sp.'+a.sport):''),b:tgt})));
 log('ln',esc(t('pr.'+ty+'.'+v,{a:a.name,b:tgt})));
 log('ln',esc(t('pr.q'+q,{a:a.name})));
 log('',starsHtml(stars)+' <b>'+f2(stars)+'</b>');
 return{promo:1,a:names(sp.map(w=>w.id)),b:'',ty,stars,winner:'',feud:!!pf,line:t('pr.'+ty+'.'+v,{a:a.name,b:tgt}),pos:p.at};
}
