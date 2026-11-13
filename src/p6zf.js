;/* ===== live show: animated ring with pixel wrestlers — entrances, finishers, stipulations, belts, tag partners ===== */
(function(){
 Object.assign(D,{'rg.on':['Ring: włączony','Ring: on'],'rg.off':['Ring: wyłączony','Ring: off'],'rg.tap':['PODDAJE SIĘ!','TAP OUT!'],'rg.dq':['DYSKWALIFIKACJA!','DISQUALIFICATION!']});
 const RINGS=new Map(),OCS=new Map();let RGN=0,RGP=false,RGK=0;
 const L='translateY(-12px) rotate(calc(var(--s)*-90deg))';
 const hash=s=>{let h=7;String(s).split('').forEach(c=>{h=(h*31+c.charCodeAt(0))>>>0});return h};
 /* pacing: the ring needs more time per match, so the show's own timers are stretched while it is on */
 try{const _st=window.setTimeout;window.setTimeout=function(f,ms){const a=[].slice.call(arguments);
  try{if(typeof ms==='number'&&(ms===450||ms===700||ms===500)&&typeof RUN!=='undefined'&&RUN&&!RUN.fast&&!(G&&G.noring)&&document.querySelector('#live .rg')){RGN++;let k=RGN===4?4:1.6;if(RGP&&ms===700){k=4;RGP=false}else if(RGK&&ms===700){k=RGK;RGK=0}a[1]=ms*k}}catch(e){}
  return _st.apply(this,a)}}catch(e){}
 const place=(w,cx,y,ah)=>{const wd=Math.round(ah*16/23);return avatar(w.look,ah).replace('<svg ','<svg x="'+(cx-wd/2)+'" y="'+y+'" ').replace(/width="\d+" height="\d+"/,'width="'+wd+'" height="'+ah+'"')};
 const belt=(cx,y)=>'<g class="rgbelt"><rect x="'+(cx-9)+'" y="'+y+'" width="18" height="6" rx="1" fill="#b8860b" stroke="#fff3b0" stroke-width=".8"/><rect x="'+(cx-3.5)+'" y="'+(y-.5)+'" width="7" height="7" rx="1.5" fill="#f2c94c" stroke="#fff3b0" stroke-width=".8"/></g>';
 const chair=(cx,y,dir)=>{const o=dir>0?cx+10:cx-22,bk=dir>0?o:o+9;return '<g class="rgchair"><rect x="'+o+'" y="'+(y+8)+'" width="12" height="3" fill="#9aa0ad"/><rect x="'+bk+'" y="'+(y-4)+'" width="3" height="12" fill="#9aa0ad"/><rect x="'+o+'" y="'+(y+11)+'" width="2" height="8" fill="#9aa0ad"/><rect x="'+(o+10)+'" y="'+(y+11)+'" width="2" height="8" fill="#9aa0ad"/></g>'};
 const micG=(cx,y,dir)=>'<g class="rgmic"><rect x="'+(cx+(dir>0?8:-11))+'" y="'+(y+3)+'" width="3" height="9" rx="1" fill="#222"/><circle cx="'+(cx+(dir>0?9.5:-9.5))+'" cy="'+y+'" r="3.8" fill="#d9dce6" stroke="#111" stroke-width=".8"/><circle cx="'+(cx+(dir>0?8.5:-10.5))+'" cy="'+(y-1)+'" r="1.2" fill="#fff"/></g>';
 const side=(ids,cls,hold)=>ids.slice(0,2).map((id,k)=>{const w=W(id);if(!w)return '';const ah=k?52:60,cx=cls==='a'?(k?20:84):(k?300:236),y=(k?136:126)-ah;
  return '<g class="rgd '+cls+' k'+k+'" data-id="'+esc(id)+'"><g class="rgw"><g class="rgi">'+place(w,cx,y,ah)+(hold.indexOf(id)>=0?belt(cx,y+ah*.5).replace('class="rgbelt"','class="rgbelt h"'):belt(cx,y+ah*.5))+chair(cx,y+ah*.4,cls==='a'?1:-1)+micG(cx,y+ah*.46,cls==='a'?1:-1)+'</g></g></g>'}).join('');
 const crowd=()=>{let h='';for(let i=0;i<26;i++){const x=6+i*12.2,y=34+((i*7)%5)*2;h+='<circle class="rgcr" cx="'+x.toFixed(1)+'" cy="'+y+'" r="'+(4+(i%3))+'" style="animation-delay:'+((i%6)*.15)+'s"/>'}return h};
 const props=(stip)=>{let b='',f='';
  if(stip==='tables')b+='<g class="rgtab"><rect class="tl" x="140" y="108" width="20" height="5" fill="#d9c9a6" stroke="#6b5a3a"/><rect class="tr" x="160" y="108" width="20" height="5" fill="#d9c9a6" stroke="#6b5a3a"/><rect x="143" y="113" width="3" height="9" fill="#6b5a3a"/><rect x="174" y="113" width="3" height="9" fill="#6b5a3a"/></g>';
  if(stip==='ladder'||stip==='prizematch'){b+='<g class="rglad"><rect x="150" y="44" width="3" height="84" fill="#c9ccd6"/><rect x="167" y="44" width="3" height="84" fill="#c9ccd6"/>'+[54,66,78,90,102,114].map(y=>'<rect x="150" y="'+y+'" width="20" height="2" fill="#aab0bf"/>').join('')+'</g><g class="rgprz"><rect x="152" y="32" width="16" height="9" rx="2" fill="'+(stip==='prizematch'?'#2a2a33':'#f2c94c')+'" stroke="#fff3b0" stroke-width="1"/>'+(stip==='prizematch'?'<rect x="158" y="30" width="4" height="3" fill="#2a2a33"/>':'')+'</g>'}
  if(stip==='extreme'||stip==='lms')b+='<g class="rgwp"><rect x="100" y="124" width="26" height="2.5" fill="#b07a3a" transform="rotate(-8 112 125)"/><ellipse cx="214" cy="126" rx="9" ry="3" fill="#8a8a96"/><rect x="236" y="121" width="22" height="2.5" fill="#b07a3a" transform="rotate(10 247 122)"/></g>';
  if(stip==='cage'){f+='<g class="rgcg" stroke="#c9ccd6" stroke-width="1" opacity=".55">'+Array.from({length:23},(_,i)=>'<line x1="'+(30+i*11.8).toFixed(1)+'" y1="34" x2="'+(30+i*11.8).toFixed(1)+'" y2="126"/>').join('')+'<line x1="24" y1="34" x2="296" y2="34" stroke-width="3"/><line x1="24" y1="80" x2="296" y2="80" stroke-width=".8"/></g>'}
  return [b,f]};
 const ringSvg=(tm,m,tt,big)=>{const hold=tt?(tt.holders||[]):[];const pr=props(m.stip);
  return '<svg class="rgsvg" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'
  +'<defs><linearGradient id="rgsp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'
  +'<rect width="320" height="150" fill="#0d0d12"/>'+crowd()+'<polygon points="95,0 225,0 285,138 35,138" fill="url(#rgsp)"/>'
  +'<polygon points="26,112 294,112 316,142 4,142" fill="#2b2b36"/><polygon points="4,142 316,142 316,150 4,150" fill="#a8232b"/>'
  +'<g stroke-width="2"><line class="rr1" x1="26" y1="58" x2="294" y2="58" stroke="#e8e8ee"/><line class="rr2" x1="26" y1="74" x2="294" y2="74" stroke="#d4213d"/><line class="rr3" x1="26" y1="90" x2="294" y2="90" stroke="#e8e8ee"/></g>'
  +'<rect x="22" y="52" width="6" height="64" fill="#8a8a96"/><rect x="292" y="52" width="6" height="64" fill="#8a8a96"/><rect x="22" y="52" width="6" height="12" fill="#d4213d"/><rect x="292" y="52" width="6" height="12" fill="#d4213d"/>'
  +pr[0]
  +'<g class="rgref"><rect x="157" y="88" width="8" height="8" fill="#e9c9a0"/><rect x="156" y="96" width="10" height="14" fill="#f2f2f2"/><rect x="156" y="98" width="10" height="2" fill="#111"/><rect x="156" y="102" width="10" height="2" fill="#111"/><rect x="156" y="106" width="10" height="2" fill="#111"/><rect x="157" y="110" width="3" height="8" fill="#111"/><rect x="162" y="110" width="3" height="8" fill="#111"/></g>'
  +side(tm[0],'a',hold)+side(tm[1],'b',hold)+pr[1]
  +('<g class="rgpy">'+[0,1,2,3,4,5].map(i=>'<circle cx="'+(i<3?30+i*7:290-(i-3)*7)+'" cy="124" r="2.2" fill="'+(i%2?'#ffd34d':'#ff6a3d')+'" style="animation-delay:'+(i%3)*.12+'s"/>').join('')+'</g>')
  +'<g class="rgbub bA"><ellipse cx="124" cy="36" rx="22" ry="11" fill="#fff"/><polygon points="132,45 140,45 137,53" fill="#fff"/><circle class="d1" cx="114" cy="36" r="2.4" fill="#222"/><circle class="d2" cx="124" cy="36" r="2.4" fill="#222"/><circle class="d3" cx="134" cy="36" r="2.4" fill="#222"/></g><g class="rgbub bB"><ellipse cx="196" cy="36" rx="22" ry="11" fill="#fff"/><polygon points="188,45 180,45 183,53" fill="#fff"/><circle class="d1" cx="186" cy="36" r="2.4" fill="#222"/><circle class="d2" cx="196" cy="36" r="2.4" fill="#222"/><circle class="d3" cx="206" cy="36" r="2.4" fill="#222"/></g>'
  +'<g class="rgwpn"><rect x="152" y="112" width="14" height="3" fill="#9aa0ad"/><rect x="152" y="101" width="3" height="12" fill="#9aa0ad"/><rect x="152" y="115" width="2" height="8" fill="#9aa0ad"/><rect x="164" y="115" width="2" height="8" fill="#9aa0ad"/></g><g class="rgban"><rect x="92" y="12" width="46" height="16" fill="#d4213d" stroke="#fff"/><rect x="98" y="18" width="34" height="3" fill="#fff"/><rect x="98" y="23" width="22" height="2" fill="#fff"/></g>'
  +'<g class="rgfx"><polygon class="rgx" points="160,70 166,82 178,80 169,90 176,102 162,96 150,104 154,91 142,82 155,81" fill="#ffd34d" stroke="#fff" stroke-width="1"/>'
  +'<text class="rgc c1" x="160" y="46">1</text><text class="rgc c2" x="160" y="46">2</text><text class="rgc c3" x="160" y="46">3</text><text class="rgt rgtap" x="160" y="46">'+esc(t('rg.tap'))+'</text><text class="rgt rgdq" x="160" y="46">'+esc(t('rg.dq'))+'</text>'
  +'<text class="rgs sa" x="130" y="52">★</text><text class="rgs sb" x="190" y="52">★</text></g><g class="rgbigbelt sa2"><rect x="114" y="26" width="32" height="11" rx="2" fill="#b8860b" stroke="#fff3b0"/><rect x="123" y="24" width="14" height="15" rx="3" fill="#f2c94c" stroke="#fff3b0"/></g><g class="rgbigbelt sb2"><rect x="174" y="26" width="32" height="11" rx="2" fill="#b8860b" stroke="#fff3b0"/><rect x="183" y="24" width="14" height="15" rx="3" fill="#f2c94c" stroke="#fff3b0"/></g><g class="rgconf">'+Array.from({length:16},(_,i)=>'<rect x="'+(14+i*19)+'" y="-8" width="4" height="6" fill="'+['#ffd34d','#ff6a3d','#4fc3f7','#e8e8ee','#d4213d'][i%5]+'" style="animation-delay:'+((i*.13)%1.2).toFixed(2)+'s"/>').join('')+'</g><rect class="rglt" width="320" height="150" fill="#000"/></svg>'};

 /* sounds for the ring (synthesised with the game's own sound engine) */
 try{Object.assign(SFX,{
  slap(n){const c=sndCtx();if(!c)return;const t=c.currentTime;sNoise(c,t,.09,.22,'bandpass',1400,700,1.1,.002);sTone(c,95,t,.16,.26,'sine',55);sTone(c,330+(n||0)*70,t+.02,.1,.05,'triangle')},
  thud(){const c=sndCtx();if(!c)return;const t=c.currentTime;sNoise(c,t,.07,.16,'lowpass',700,250,.8,.002);sTone(c,130,t,.12,.18,'sine',60)},
  entry(seed){const c=sndCtx();if(!c)return;const t=c.currentTime;let h=(seed||1)>>>0;const r=()=>{h=(h*1103515245+12345)>>>0;return h/4294967296};const sc=[0,3,5,7,10,12,15],base=82+Math.floor(r()*7)*5;for(let i=0;i<6;i++){const f=base*2*Math.pow(2,sc[Math.floor(r()*sc.length)]/12),d=t+i*.19;sTone(c,f,d,.26,.045,'sawtooth');sTone(c,f/2,d,.26,.05,'square')}sNoise(c,t,.35,.05,'highpass',3000,5000,.6,.01)},
  tap(){const c=sndCtx();if(!c)return;const t=c.currentTime;[0,.16,.32].forEach(d=>sNoise(c,t+d,.05,.14,'bandpass',1800,1000,1,.002))}})}catch(e){}
 const seq=(r,list)=>{if(RUN&&RUN.fast)return;list.forEach(([ms,k,a])=>setTimeout(()=>{if(document.body.contains(r)&&document.getElementById('live'))sPlay(k,a)},ms))};
 const sfxPhase=(r,p)=>{try{if(p===1&&r.classList.contains('big')){const ids=[...r.querySelectorAll('.rgd.k0')].map(g=>g.dataset.id);seq(r,[[100,'entry',hash(ids[0]||'a')],[1200,'entry',hash(ids[1]||'b')]])}
  if(p===2)seq(r,[[330,'thud'],[660,'thud'],[1000,'thud']]);
  if(p===3)seq(r,[[1050,'slam']]);
  if(p===4){const c=r.dataset.cnt;if(c==='pin'||c==='ten')seq(r,[[20,'slap',1],[420,'slap',2],[820,'slap',3]]);else if(c==='tap')seq(r,[[20,'tap']]);else if(c==='dq')seq(r,[[20,'bell',3]]);else if(r.dataset.k==='lad')seq(r,[[20,'cheer',1]]);else if(r.dataset.k==='cag')seq(r,[[20,'cheer',1]]);if(c==='ten')seq(r,[[1300,'bell',1]])}
  if(p===5&&r.dataset.k==='drw')seq(r,[[20,'bell',2]])}catch(e){}};
 const LASTHP=new Map();
 const _hs=helperStable;helperStable=function(m){const h=_hs.apply(this,arguments);try{if(h)LASTHP.set(m,h);else LASTHP.delete(m)}catch(e){}return h};
 const phase=(r,p)=>{r.dataset.p=p;r.className=r.className.replace(/\bp\d\b/g,'').trim()+' p'+p;sfxPhase(r,p)};
 const finOf=m=>{let f=m.finish||'clean';const sp=STIPS[m.stip]||STIPS.none;if(sp.noDQ&&(f==='dq'||f==='count'))f='clean';return f};
 const kindOf=(m,fin)=>{if(fin==='draw')return'drw';if(fin==='dq')return'dq';if(fin==='count')return'out';
  return {tables:'tbl',ladder:'lad',prizematch:'lad',cage:'cag',extreme:'ext',lms:'lms',submission:'sub'}[m.stip]||('m'+(hash((m.a[0]||'')+(m.b[0]||'')+(m.mv||''))%4))};
 const setWinner=(r,m,wiOpt)=>{if(r.dataset.k&&!wiOpt)return;try{const A=sides(m).A,o=OCS.get(m),wi=wiOpt||(o&&o.wi);if(!wi)return;const fin=finOf(m),k=kindOf(m,fin),wn=fin==='draw'?'d':(wi.some(i=>A.indexOf(i)>=0)?'a':'b');
  r.dataset.wn=wn;r.dataset.fin=fin;r.dataset.k=k;r.dataset.cnt=({tbl:'pin',out:'ten',lms:'ten',sub:'tap',dq:'dq',lad:'',cag:'',drw:''})[k]!==undefined?({tbl:'pin',out:'ten',lms:'ten',sub:'tap',dq:'dq',lad:'',cag:'',drw:''})[k]:'pin';
  const ten=r.dataset.cnt==='ten';r.querySelectorAll('.rgc').forEach((e,i)=>{e.textContent=ten?['8','9','10'][i]:String(i+1)});
  r.querySelectorAll('.rgd').forEach(g=>{g.classList.remove('win','los');if(wn!=='d')g.classList.add(g.classList.contains(wn)?'win':'los')})}catch(e){}};
 const _mcNew=mcNew;mcNew=function(live,m,i,total,tt){const d=_mcNew.apply(this,arguments);
  try{if(G.noring)live.classList.add('noring');else live.classList.remove('noring');
   const tm=mcTeams(m);if(tm.length!==2||!tm[0].length||!tm[1].length)return d;RGN=0;RGP=false;RGK=0;
   const big=i===total-1||!!tt;const r=document.createElement('div');r.className='rg pre walk p0'+(big?' big':'');r.innerHTML=ringSvg(tm,m,tt,big);
   const v=d.querySelector('.mcv');if(v){v.insertAdjacentElement('afterend',r);v.classList.add('rg-hide')}else d.appendChild(r);
   RINGS.set(m,r);r.dataset.p=0;let timer=null;
   setTimeout(()=>r.classList.remove('pre'),60);setTimeout(()=>r.classList.remove('walk'),1500);
   const mo=new MutationObserver(()=>{const n=d.querySelectorAll(':scope > .ln').length;if(d.querySelector(':scope > .mcr'))return;const p=n>=3?3:n;
    if(p>+r.dataset.p){phase(r,p);if(p>=3){setWinner(r,m);clearTimeout(timer);timer=setTimeout(()=>{if(+r.dataset.p<4)phase(r,4)},RUN&&RUN.fast?0:1450)}}});
   mo.observe(d,{childList:true});r._mo=mo}catch(e){}return d};
 const _out=outcome;outcome=function(m){const o=_out.apply(this,arguments);try{OCS.set(m,o)}catch(e){}return o};
 const _mcR=mcResult;mcResult=function(m,res,oc,tt,held0){const h=_mcR.apply(this,arguments);
  try{const r=RINGS.get(m);if(r){if(r._mo)r._mo.disconnect();const fin0=r.dataset.fin;m.finish=res.finish||m.finish;
   r.dataset.k='';setWinner(r,m,oc.wi);if(res.finish==='draw'){r.dataset.wn='d'}
   if(tt&&held0&&!mcSame(held0,tt.holders))r.dataset.ch='1';
   setTimeout(()=>{phase(r,5);RINGS.delete(m);OCS.delete(m);LASTHP.delete(m);setTimeout(()=>r.querySelectorAll('.rgguest').forEach(g=>g.remove()),3000)},0)}}catch(e){}return h};
 Object.assign(ACT,{ringtog(){G.noring=!G.noring;try{save()}catch(e){}const l=document.getElementById('live');if(l)l.classList.toggle('noring',!!G.noring);const b=document.getElementById('rgtog');if(b)b.textContent=t(G.noring?'rg.off':'rg.on')}});
 /* sound buttons during a running show must not re-render the screen (it would restart the ring animation) */
 try{const qsRefresh=()=>{const q=document.querySelector('.qs');if(q)q.outerHTML=sndQuick()};
  ['sndtoggle','sndclk'].forEach(k=>{const o=ACT[k];ACT[k]=function(){if(RUN&&RUN.started&&document.getElementById('live')){if(k==='sndtoggle'){SND.on=!SND.on;sndSave();sndCtx();if(SND.on)sPlay('pop')}else{SND.clk=!SND.clk;sndSave();if(SND.clk)sPlay('click')}qsRefresh();return}return o.apply(this,arguments)}})}catch(e){}
 const _r=render;render=function(){let old=null;try{if(RUN&&RUN.started)old=document.getElementById('live')}catch(e){}const r=_r.apply(this,arguments);try{if(old){const nw=document.getElementById('live');if(nw&&nw!==old)nw.replaceWith(old)}}catch(e){}try{if(RUN&&!document.getElementById('rgtog')){const f=document.querySelector('[data-act="fast"]');if(f)f.insertAdjacentHTML('beforebegin','<button class="btn sm" id="rgtog" data-act="ringtog">'+esc(t(G.noring?'rg.off':'rg.on'))+'</button> ')}}catch(e){}return r};

 /* ---------- interventions and match events ---------- */
 const FAN={skin:2,hair:'short',hairC:3,outfit:'tshirt',outC:4,o2:1,build:'std'};
 const gav=(w,kind,s,dl,dx,extra)=>'<g class="rgguest '+kind+'" style="--s:'+s+';--dl:'+dl+'s;--dx:'+(dx||0)+'px"><g class="ga">'+(/\brs\b/.test(kind)?place(w,s>0?34:286,92,54):place(w,160,70,56))+'</g>'+(extra||'')+'</g>';
 const evFx=(id,m,x)=>{try{if(RUN&&RUN.fast)return;const r=RINGS.get(m);if(!r)return;const svg=r.querySelector('svg'),add=h=>svg.insertAdjacentHTML('beforeend',h);const sd=sides(m),A=sd.A,inM=A.concat(sd.B);
  const flag=(c,ms)=>{r.classList.add(c);if(ms)setTimeout(()=>r.classList.remove(c),ms)};const gq=(sel,c,ms)=>setTimeout(()=>{if(document.body.contains(r))r.querySelectorAll(sel).forEach(g=>g.classList.add(c))},ms);
  if(id==='interf'){const hp=LASTHP.get(m);if(hp){const s=A.indexOf(hp.side[0])>=0?1:-1;hp.st.members.filter(i=>inM.indexOf(i)<0&&W(i)&&!W(i).injury).slice(0,2).forEach((i,k)=>add(gav(W(i),'run',s,k*.25,k*(-s)*16)));gq('.rgguest.run','atk',1400);gq('.rgguest.run','out',3300);try{sPlay('whoosh')}catch(e){}}}
  else if(id==='rvheckle'||id==='allycorner'){const w=G.ws.find(q=>q.name===(x&&x.s));if(w){const s=rnd()<.5?1:-1;add(gav(w,'rs '+(id==='rvheckle'?'heckle':'ally'),s,0,0,'<text class="rggt '+(id==='rvheckle'?'h':'a')+'" x="'+(s>0?34:286)+'" y="90">'+(id==='rvheckle'?'!':'★')+'</text>'))}}
  else if(id==='fanrun'){add(gav({look:FAN},'fan',1,0,0));try{sPlay('murmur')}catch(e){}}
  else if(id==='refbump')flag('ev-refdown',3600);
  else if(id==='lights'){flag('ev-lights',2600)}
  else if(id==='pyro'){flag('ev-pyro',2800);try{sPlay('slam')}catch(e){}}
  else if(id==='ropesnap')flag('ev-ropesnap');
  else if(id==='weapon')flag('ev-weapon');
  else if(id==='botch')flag('ev-botch',1000);
  else if(id==='crowd'||id==='chant'){flag('ev-crowd',2600)}
  else if(id==='banner')flag('ev-banner',3200)}catch(e){}};
 const _ask=ask;ask=function(evId,m,x){const pr=_ask.apply(this,arguments);try{pr.then(()=>evFx(evId,m,x))}catch(e){}return pr};
 const _rv=rvInterfere;rvInterfere=function(m,oc,res,log){const lines=[];const lg=function(c,h){lines.push(h);return log.apply(this,arguments)};const o=_rv.call(this,m,oc,res,lg);
  try{if(o!==null&&lines.length&&!(RUN&&RUN.fast)){const r=RINGS.get(m);if(r){const sd=sides(m),A=sd.A,inM=new Set(A.concat(sd.B)),txt=lines.join(' ');const svg=r.querySelector('svg'),add=h=>svg.insertAdjacentHTML('beforeend',h);
   const cand=G.ws.filter(q=>!inM.has(q.id)&&txt.indexOf(esc(q.name))>=0);const win=W(oc.wi[0]);const rvs=win?rvOf(win):[];
   const riv=cand.find(c=>rvs.indexOf(c.id)>=0)||cand[0];const sav=cand.find(c=>c!==riv);const ws=oc.wi.some(i=>A.indexOf(i)>=0)?1:-1;
   if(riv){add(gav(riv,'run',-ws,0,0));setTimeout(()=>r.querySelectorAll('.rgguest.run').forEach(g=>g.classList.add('atk')),1100);
    if(o===false&&sav){add(gav(sav,'run',ws,.7,0));setTimeout(()=>{const g=r.querySelectorAll('.rgguest.run');if(g[0])g[0].classList.add('out')},1700)}
    try{sPlay('whoosh')}catch(e){}RGK=3.4}}}}catch(e){}return o};
 /* ---------- promo stage ---------- */
 const HEAT={insult:1,cheap:1,menace:1};
 const promoStage=(c,p,o)=>{const sc=document.createElement('div');const solo=!p.b;sc.className='rg promo pre walk'+(solo?' solo':'');sc.innerHTML=ringSvg([[p.a],p.b?[p.b]:[]],{stip:'none'},null,false);sc.dataset.sp='';
  c.insertBefore(sc,c.firstChild);const hot=o.stars>=3.5,cold=o.stars<2,heat=!!HEAT[o.ty];
  const A=sc.querySelector('.rgd.a.k0'),B=sc.querySelector('.rgd.b.k0');const speak=w=>{sc.dataset.sp=w;sc.querySelectorAll('.rgd').forEach(g=>g.classList.toggle('sp',(w==='a'&&g===A)||(w==='b'&&g===B)))};
  const fast=RUN&&RUN.fast;const T=(ms,f)=>{if(fast)f();else setTimeout(()=>{if(document.body.contains(sc))f()},ms)};
  const cls=n=>{sc.className=sc.className.replace(/\bpr\d\b/g,'').trim()+' '+n};
  const react=()=>{speak('');cls('pr3'+(hot?' hot':'')+(cold?' cold':'')+(heat&&!cold?' heat':''));sc.classList.add(o.ty==='faceoff'&&p.b&&hot?'shove':'x');
   try{if(!fast){if(heat&&!cold)sPlay('boo');else if(hot)sPlay('cheer',2);else if(cold)sPlay('boo');else sPlay('murmur')}}catch(e){}};
  T(60,()=>sc.classList.remove('pre'));T(1300,()=>sc.classList.remove('walk'));
  T(500,()=>{cls('pr1');speak('a');try{if(!fast)sPlay('thud')}catch(e){}});
  if(p.b&&(o.ty==='faceoff'||o.ty==='champ'))T(1450,()=>speak('b'));
  T(2300,react);if(fast){cls('pr1');react()}
  RGP=!fast};
 const _rp=runPromo;runPromo=function(p,log){const live=document.getElementById('live');const o=_rp.apply(this,arguments);try{if(live&&!G.noring){const c=live.lastElementChild;if(c&&c.classList.contains('mc-promo'))promoStage(c,p,o)}}catch(e){}return o};
 /* ---------- css ---------- */
 const K=(n,frames)=>'@keyframes '+n+'{'+frames+'}';
 const css=[
 '.rg{background:#0d0d12;border-radius:10px;overflow:hidden;border:1px solid var(--line);margin:2px 0}.rgsvg{display:block;width:100%;height:auto;max-height:240px}.live.noring .rg{display:none}.live.noring .rg-hide{display:flex!important}.live:not(.noring) .rg-hide{display:none}',
 '.rgcr{fill:#17171f;animation:rgbob 1.2s ease-in-out infinite alternate}'+K('rgbob','to{transform:translateY(-2px)}')+'.rg:is(.p3,.p5) .rgcr{animation-duration:.3s}',
 '.rgd{transition:transform 1.1s ease-in-out}.rgd.a{--s:1}.rgd.b{--s:-1}.rgw{transform-box:fill-box;transform-origin:50% 100%;transition:transform .55s ease-out}.rgi{transform-box:fill-box;transform-origin:50% 100%;animation:rgidle 1.1s ease-in-out infinite alternate}'+K('rgidle','to{transform:translateY(-1.5px) scaleY(1.015)}'),
 '.rg.walk .rgi{animation:rgwalk .28s steps(2) infinite}'+K('rgwalk','from{transform:translateY(0)}to{transform:translateY(-3px)}'),
 '.rgd.k1{opacity:.95}.rgref{transition:transform .8s ease-in-out}.rgfx>*{opacity:0}.rgbelt,.rgchair{display:none}.rgbelt.h{display:block}.rgpy circle{opacity:0}.rg.walk .rgpy circle{animation:rgpy 1.2s ease-out infinite}'+K('rgpy','0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-46px)}'),
 /* entrance + lock-up */
 '.rg.pre .rgd.k0{transform:translateX(calc(var(--s)*-130px))}.rg.pre .rgd.k1{transform:translateX(calc(var(--s)*-60px))}',
 '.rg:is(.p1,.p2,.p3,.p4,.p5) .rgd.k0{transform:translateX(calc(var(--s)*48px))}.rg.p1 .rgd.k0 .rgw{transform:rotate(calc(var(--s)*7deg))}',
 /* p2 exchange */
 '.rg.p2 .rgd.a .rgw{animation:rgsa 1.3s ease-in-out infinite}.rg.p2 .rgd.b .rgw{animation:rgsb 1.3s ease-in-out infinite}'+K('rgsa','0%,100%{transform:rotate(5deg)}25%{transform:rotate(18deg) translateX(8px)}50%{transform:rotate(-6deg) translateX(-3px)}')+K('rgsb','0%,100%{transform:rotate(-5deg)}25%{transform:rotate(-12deg) translateX(3px)}50%{transform:rotate(-18deg) translateX(-8px)}75%{transform:rotate(6deg)}'),
 '.rg.p2 .rgd.k1 .rgw{animation:rgwave .7s ease-in-out infinite alternate}'+K('rgwave','to{transform:rotate(calc(var(--s)*14deg))}'),
 '.rg.p2 .rgx{animation:rgfl 1.3s steps(1) infinite}'+K('rgfl','0%,100%{opacity:0}20%,30%{opacity:1}55%,65%{opacity:1}'),
 /* p3 finishers (1.3s) — final frame of the loser equals the static lying pose of p4 */
 '.rg.p3 .rgx{opacity:1}',
 '.rg.p3[data-k=m0] .rgd.los .rgw{animation:rgm0l 1.3s ease-in-out both}'+K('rgm0l','0%{transform:none}35%{transform:translateY(-8px) rotate(calc(var(--s)*-14deg))}62%{transform:translateY(-78px) rotate(180deg)}100%{transform:'+L+'}'),
 '.rg.p3[data-k=m0] .rgd.win .rgw{animation:rgm0w 1.3s ease-in-out both}'+K('rgm0w','35%,62%{transform:scaleY(.9) rotate(calc(var(--s)*6deg))}100%{transform:none}'),
 '.rg.p3[data-k=m1] .rgd.win .rgw{animation:rgm1w 1.3s ease-in-out both}'+K('rgm1w','0%{transform:none}30%{transform:translateY(-26px) rotate(calc(var(--s)*-62deg))}50%{transform:translate(calc(var(--s)*14px),-12px) rotate(calc(var(--s)*-82deg))}100%{transform:none}'),
 '.rg.p3[data-k=m1] .rgd.los .rgw{animation:rgm1l 1.3s ease-in-out both}'+K('rgm1l','0%,45%{transform:none}65%{transform:rotate(calc(var(--s)*-35deg))}100%{transform:'+L+'}'),
 '.rg.p3:is([data-k=m2],[data-k=ext]) .rgd.win .rgw{animation:rgm2w 1.3s ease-in-out both}'+K('rgm2w','0%{transform:none}30%{transform:translateX(calc(var(--s)*14px)) rotate(calc(var(--s)*14deg))}60%,100%{transform:none}'),
 '.rg.p3:is([data-k=m2],[data-k=ext]) .rgd.los .rgw{animation:rgm2l 1.3s ease-in-out both}'+K('rgm2l','0%,30%{transform:none}60%{transform:translateY(-22px) rotate(calc(var(--s)*-200deg))}100%{transform:'+L+'}'),
 '.rg[data-k=ext] .rgd.win .rgchair{display:block}',
 '.rg.p3[data-k=m3] .rgd.win{animation:rgm3d 1.3s ease-in-out both}'+K('rgm3d','0%{transform:translateX(calc(var(--s)*48px))}25%{transform:translateX(calc(var(--s)*-59px))}50%{transform:translate(calc(var(--s)*-59px),-48px)}80%{transform:translate(calc(var(--s)*62px),-28px)}100%{transform:translateX(calc(var(--s)*62px))}'),
 '.rg.p3[data-k=m3] .rgd.win .rgw{animation:rgm3w 1.3s ease-in-out both}'+K('rgm3w','0%,50%{transform:none}80%{transform:rotate(calc(var(--s)*-80deg))}100%{transform:none}'),
 '.rg.p3[data-k=m3] .rgd.los .rgw{animation:rgm3l 1.3s ease-in-out both}'+K('rgm3l','0%,70%{transform:none}100%{transform:'+L+'}'),
 /* soft (submission / last man standing) */
 '.rg.p3:is([data-k=sub],[data-k=lms]) .rgd.los .rgw{animation:rgsfl 1.3s ease-in-out both}'+K('rgsfl','0%{transform:none}50%{transform:rotate(calc(var(--s)*-18deg))}100%{transform:'+L+'}'),
 /* tables */
 '.rg.p3[data-k=tbl] .rgd.los.k0{transform:translateX(calc(var(--s)*76px))}.rg.p3[data-k=tbl] .rgd.los .rgw{animation:rgm0l 1.3s ease-in-out both}.rg.p3[data-k=tbl] .rgd.win .rgw{animation:rgm0w 1.3s ease-in-out both}',
 '.rg:is(.p3,.p4,.p5)[data-k=tbl] .rgd.los.k0{transform:translateX(calc(var(--s)*76px))}.rgtab .tl,.rgtab .tr{transform-box:fill-box;transform-origin:50% 100%;transition:transform .2s}.rg:is(.p4,.p5)[data-k=tbl] .tl{transform:rotate(-20deg) translateY(4px)}.rg:is(.p4,.p5)[data-k=tbl] .tr{transform:rotate(20deg) translateY(4px)}.rg.p3[data-k=tbl] .tl{transition-delay:.9s;transform:rotate(-20deg) translateY(4px)}.rg.p3[data-k=tbl] .tr{transition-delay:.9s;transform:rotate(20deg) translateY(4px)}',
 /* ladder */
 '.rg.p3[data-k=lad] .rgd.win.k0{animation:rgld 1.3s ease-in-out both}'+K('rgld','0%{transform:translateX(calc(var(--s)*48px))}40%{transform:translateX(calc(var(--s)*76px))}100%{transform:translate(calc(var(--s)*76px),-50px)}'),
 '.rg:is(.p4,.p5)[data-k=lad] .rgd.win.k0{transform:translate(calc(var(--s)*76px),-50px)}.rg.p3[data-k=lad] .rgd.los .rgw{animation:rgm1l 1.3s ease-in-out both}.rg:is(.p4,.p5)[data-k=lad] .rgprz{transform:translate(0,12px);opacity:0}.rg.p3[data-k=lad] .rgprz{animation:rgprz 1.3s both}'+K('rgprz','0%,75%{opacity:1}100%{opacity:0;transform:translateY(10px)}'),
 /* cage */
 '.rg.p3[data-k=cag] .rgd.win.k0{animation:rgcg 1.3s ease-in-out both}'+K('rgcg','0%{transform:translateX(calc(var(--s)*48px))}35%{transform:translateX(calc(var(--s)*-52px))}100%{transform:translate(calc(var(--s)*-52px),-60px)}'),
 '.rg:is(.p4,.p5)[data-k=cag] .rgd.win.k0{transform:translate(calc(var(--s)*-74px),-52px)}.rg.p3[data-k=cag] .rgd.los .rgw{animation:rgm1l 1.3s ease-in-out both}',
 /* disqualification: the loser attacks with a chair, the winner is the victim */
 '.rg[data-k=dq] .rgd.los .rgchair{display:block}.rg.p3[data-k=dq] .rgd.win .rgw{animation:rgdqw 1.3s ease-in-out both}.rg.p3[data-k=dq] .rgd.los .rgw{animation:rgm2w 1.3s ease-in-out both}'+K('rgdqw','0%,45%{transform:none}100%{transform:'+L+'}'),
 /* count-out: the loser rolls out of the ring */
 '.rg.p3[data-k=out] .rgd.los .rgw{animation:rgoutl 1.3s ease-in-out both}'+K('rgoutl','0%{transform:none}50%{transform:translateY(-14px) rotate(calc(var(--s)*-100deg))}100%{transform:translateY(16px) rotate(calc(var(--s)*-90deg))}'),
 '.rg:is(.p3,.p4,.p5)[data-k=out] .rgd.los.k0{transform:translateX(calc(var(--s)*70px))}',
 /* draw: both exhausted */
 '.rg:is(.p3,.p4)[data-k=drw] .rgw{animation:rgsway 1s ease-in-out infinite alternate}'+K('rgsway','from{transform:rotate(-6deg)}to{transform:rotate(6deg)}'),
 /* p4/p5 static */
 '.rg:is(.p4,.p5):not([data-k=dq]):not([data-k=out]) .rgd.los .rgw{transform:'+L+';animation:none}.rg:is(.p4,.p5)[data-k=dq] .rgd.win .rgw{transform:'+L+';animation:none}.rg:is(.p4,.p5)[data-k=out] .rgd.los .rgw{transform:translateY(16px) rotate(calc(var(--s)*-90deg));animation:none}',
 '.rg:is(.p4,.p5):is([data-k=m0],[data-k=m1],[data-k=m2],[data-k=m3],[data-k=ext],[data-k=sub],[data-k=lms],[data-k=tbl],[data-k=out],[data-k=dq]) .rgd.win.k0{transform:translateX(calc(var(--s)*62px))}',
 '.rg.p4:not([data-k=lad]):not([data-k=cag]):not([data-k=dq]) .rgd.win .rgw{transform:scaleY(.86);animation:none}',
 '.rg.p4[data-wn=a] .rgref{transform:translateX(34px)}.rg.p4[data-wn=b] .rgref{transform:translateX(-34px)}.rg.p5[data-wn=a] .rgref{transform:translateX(-20px)}.rg.p5[data-wn=b] .rgref{transform:translateX(20px)}',
 '.rg.p4:is([data-k=lad],[data-k=cag]) .rgref{transform:none}',
 '.rgd.k1.win{}.rg:is(.p3,.p4,.p5) .rgd.k1.win{transform:translate(calc(var(--s)*106px),-10px)}',
 /* counts, tap, dq */
 '.rgc,.rgt{font:700 22px system-ui,sans-serif;fill:#fff;stroke:#000;stroke-width:.8;text-anchor:middle;opacity:0}.rgt{font-size:15px;fill:#ffd34d}',
 '.rg.p4:is([data-cnt=pin],[data-cnt=ten]) .rgc{animation:rgcnt .75s ease-out both}.rg.p4 .c2{animation-delay:.4s!important}.rg.p4 .c3{animation-delay:.8s!important}'+K('rgcnt','0%{opacity:0;transform:translateY(6px)}20%,70%{opacity:1;transform:none}100%{opacity:0}'),
 '.rg.p4[data-cnt=tap] .rgtap{animation:rgcnt 1.1s ease-out both}.rg:is(.p4,.p5)[data-cnt=dq] .rgdq{opacity:1}',
 /* p5 finish */
 '.rg.p5 .rgd.win .rgw{animation:rgwin .6s ease-in-out infinite alternate;transform:none}'+K('rgwin','to{transform:translateY(-7px) scale(1.04)}'),
 '.rg.p5[data-k=dq] .rgd.win .rgw{animation:none;transform:'+L+'}.rg.p5[data-k=dq] .rgd.los .rgw{animation:rgsway 1s ease-in-out infinite alternate}',
 '.rg.p5[data-wn=d] .rgd.k0{transform:translateX(calc(var(--s)*38px))}.rg.p5[data-wn=d] .rgw{animation:none;transform:none}',
 '.rgs{font:20px system-ui;fill:#ffd34d;text-anchor:middle}.rg.p5[data-wn=a] .sa{opacity:1;animation:rgpop .7s ease-out both}.rg.p5[data-wn=b] .sb{opacity:1;animation:rgpop .7s ease-out both}'+K('rgpop','from{opacity:0;transform:translateY(10px) scale(.4)}'),
 /* promo */
 '.rgbub{display:none}.rgmic{display:none}.rg.promo .rgbub{display:block;opacity:0;transition:opacity .25s}.rg.promo[data-sp=a] .bA,.rg.promo[data-sp=b] .bB{opacity:1}.rgbub circle{animation:rgdot .9s ease-in-out infinite}.rgbub .d2{animation-delay:.15s}.rgbub .d3{animation-delay:.3s}'+K('rgdot','0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}'),
 '.rg.promo .rgd.sp .rgw{animation:rgtalk .55s ease-in-out infinite alternate}'+K('rgtalk','from{transform:rotate(calc(var(--s)*-3deg))}to{transform:rotate(calc(var(--s)*6deg)) translateY(-2px)}'),
 '.rg.promo:is(.pr1,.pr3) .rgd.k0{transform:translateX(calc(var(--s)*48px))}.rg.promo.solo:is(.pr1,.pr3) .rgd.a.k0{transform:translateX(76px)}.rg.promo.solo .bA{transform:translateX(34px)}',
 '.rg.promo.pr3.hot .rgd.a .rgw,.rg.promo.pr3.hot:not(.shove) .rgd.b .rgw{animation:rgwin .6s ease-in-out infinite alternate}.rg.promo.pr3.hot .rgcr{animation-duration:.3s}.rg.promo.pr3.heat .rgcr{fill:#4a1520;animation-duration:.3s}.rg.promo.pr3.cold .rgcr{fill:#2b1a1f}.rg.promo.pr3.cold .rgd.a .rgw{transform:rotate(calc(var(--s)*8deg)) scaleY(.96)}',
 '.rg.promo.pr3.hot .sa{opacity:1;animation:rgpop .7s ease-out both}.rg.promo.pr3.hot:not(.solo) .sb{opacity:1;animation:rgpop .7s ease-out both}.rg.promo.solo.pr3.hot .sa{transform:translateX(30px)}',
 '.rg.promo.pr3.shove .rgd.a .rgw{transform:rotate(14deg) translateX(8px);animation:none}.rg.promo.pr3.shove .rgd.b .rgw{transform:rotate(calc(var(--s)*-26deg));animation:none}.rg.promo.pr3.shove .rgx{opacity:1}',
 /* guests and events */
 '.rgguest{pointer-events:none}.rgguest .ga{transform-box:fill-box;transform-origin:50% 100%}',
 '.rgguest.run{transform:translateX(calc(var(--s)*-190px));animation:rgrun 1s ease-out var(--dl) forwards}'+K('rgrun','to{transform:translateX(calc(var(--s)*-30px + var(--dx)))}'),
 '.rgguest.run.atk .ga{animation:rgatk .35s ease-in-out infinite alternate}'+K('rgatk','from{transform:rotate(calc(var(--s)*-4deg))}to{transform:rotate(calc(var(--s)*12deg)) translateX(calc(var(--s)*6px))}'),
 '.rgguest.run.out{animation:rgrunout .9s ease-in forwards}'+K('rgrunout','from{transform:translateX(calc(var(--s)*-30px + var(--dx)))}to{transform:translateX(calc(var(--s)*-190px))}'),
 '.rgguest.rs{opacity:0;animation:rgrs .5s ease-out var(--dl) forwards}'+K('rgrs','from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}'),
 '.rgguest.rs.ally .ga{animation:rgjump .45s ease-in-out infinite alternate}'+K('rgjump','to{transform:translateY(-6px)}')+'.rgguest.rs.heckle .ga{animation:rgshk .22s ease-in-out infinite alternate}'+K('rgshk','from{transform:rotate(-6deg)}to{transform:rotate(6deg)}'),
 '.rggt{font:700 16px system-ui;text-anchor:middle}.rggt.h{fill:#ff5a5a}.rggt.a{fill:#ffd34d}',
 '.rgguest.fan{animation:rgfan 2.2s ease-in-out forwards}'+K('rgfan','0%{transform:translateX(-190px)}38%,55%{transform:translateX(-10px)}100%{transform:translateX(200px);opacity:0}'),
 '.rgwpn,.rgban{display:none}.rg.ev-weapon .rgwpn{display:block}.rg.ev-banner .rgban{display:block;animation:rgbn 3.2s ease-in-out both}'+K('rgbn','0%{transform:translateY(-30px)}15%,85%{transform:none}100%{transform:translateY(-30px)}'),
 '.rg.ev-refdown .rgref{transform:rotate(90deg) translate(-12px,-10px);transform-box:fill-box;transform-origin:50% 100%}',
 '.rglt{opacity:0;pointer-events:none}.rg.ev-lights .rglt{animation:rglt 2.6s steps(1) both}'+K('rglt','0%,20%,40%{opacity:.9}10%,30%{opacity:0}50%,95%{opacity:.88}100%{opacity:0}'),
 '.rg.ev-pyro .rgpy circle{animation:rgpy 1.1s ease-out infinite}.rg.big.walk .rgpy circle{animation:rgpy 1.2s ease-out infinite}.rg.ev-pyro .rgcr{animation-duration:.3s}',
 '.rr1,.rr2,.rr3{transform-box:fill-box;transform-origin:0 50%;transition:transform .5s ease-in}.rg.ev-ropesnap .rr2{transform:translateY(24px) rotate(10deg)}',
 '.rg.ev-botch .rgw{animation:rgshk .12s 7 alternate}.rg.ev-crowd .rgcr{animation-duration:.25s}',
 '.rgbigbelt{opacity:0}.rg.p5[data-ch][data-wn=a] .sa2,.rg.p5[data-ch][data-wn=b] .sb2{opacity:1;animation:rgpop .8s ease-out both}.rgconf rect{opacity:0}.rg.p5[data-ch] .rgconf rect{animation:rgcf 2.2s linear infinite}'+K('rgcf','0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:1;transform:translateY(160px) rotate(300deg)}'),
 '.rg.promo .rgmic{display:block}.rg.promo .rgd .rgmic{transition:transform .3s}.rg.promo .rgd.sp .rgmic{transform:translateY(-13px)}',
 /* belts: champion keeps it, a new champion gets it */
 '.rg[data-ch] .rgbelt.h{display:none}.rg.p5[data-ch][data-wn=a] .rgd.a .rgbelt,.rg.p5[data-ch][data-wn=b] .rgd.b .rgbelt{display:block}',
 '@media (prefers-reduced-motion:reduce){.rg *{animation:none!important;transition:none!important}}'
 ].join('');
 try{let s=document.getElementById('rgcss');if(!s){s=document.createElement('style');s.id='rgcss';document.head.appendChild(s)}s.textContent=css}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
