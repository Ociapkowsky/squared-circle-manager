;/* ===== live show: animated ring with pixel wrestlers — entrances, finishers, stipulations, belts, tag partners ===== */
(function(){
 Object.assign(D,{'rg.on':['Ring: włączony','Ring: on'],'rg.off':['Ring: wyłączony','Ring: off'],'rg.tap':['PODDAJE SIĘ!','TAP OUT!'],'rg.dq':['DYSKWALIFIKACJA!','DISQUALIFICATION!']});
 const RINGS=new Map(),OCS=new Map();let RGN=0;
 const L='translateY(-12px) rotate(calc(var(--s)*-90deg))';
 const hash=s=>{let h=7;String(s).split('').forEach(c=>{h=(h*31+c.charCodeAt(0))>>>0});return h};
 /* pacing: the ring needs more time per match, so the show's own timers are stretched while it is on */
 try{const _st=window.setTimeout;window.setTimeout=function(f,ms){const a=[].slice.call(arguments);
  try{if(typeof ms==='number'&&(ms===450||ms===700||ms===500)&&typeof RUN!=='undefined'&&RUN&&!RUN.fast&&!(G&&G.noring)&&document.querySelector('#live .rg')){RGN++;a[1]=ms*(RGN===4?4:1.6)}}catch(e){}
  return _st.apply(this,a)}}catch(e){}
 const place=(w,cx,y,ah)=>{const wd=Math.round(ah*16/23);return avatar(w.look,ah).replace('<svg ','<svg x="'+(cx-wd/2)+'" y="'+y+'" ').replace(/width="\d+" height="\d+"/,'width="'+wd+'" height="'+ah+'"')};
 const belt=(cx,y)=>'<g class="rgbelt"><rect x="'+(cx-9)+'" y="'+y+'" width="18" height="6" rx="1" fill="#b8860b" stroke="#fff3b0" stroke-width=".8"/><rect x="'+(cx-3.5)+'" y="'+(y-.5)+'" width="7" height="7" rx="1.5" fill="#f2c94c" stroke="#fff3b0" stroke-width=".8"/></g>';
 const chair=(cx,y,dir)=>{const o=dir>0?cx+10:cx-22,bk=dir>0?o:o+9;return '<g class="rgchair"><rect x="'+o+'" y="'+(y+8)+'" width="12" height="3" fill="#9aa0ad"/><rect x="'+bk+'" y="'+(y-4)+'" width="3" height="12" fill="#9aa0ad"/><rect x="'+o+'" y="'+(y+11)+'" width="2" height="8" fill="#9aa0ad"/><rect x="'+(o+10)+'" y="'+(y+11)+'" width="2" height="8" fill="#9aa0ad"/></g>'};
 const side=(ids,cls,hold)=>ids.slice(0,2).map((id,k)=>{const w=W(id);if(!w)return '';const ah=k?52:60,cx=cls==='a'?(k?20:84):(k?300:236),y=(k?136:126)-ah;
  return '<g class="rgd '+cls+' k'+k+'" data-id="'+esc(id)+'"><g class="rgw"><g class="rgi">'+place(w,cx,y,ah)+(hold.indexOf(id)>=0?belt(cx,y+ah*.5).replace('class="rgbelt"','class="rgbelt h"'):belt(cx,y+ah*.5))+chair(cx,y+ah*.4,cls==='a'?1:-1)+'</g></g></g>'}).join('');
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
  +'<g stroke-width="2"><line x1="26" y1="58" x2="294" y2="58" stroke="#e8e8ee"/><line x1="26" y1="74" x2="294" y2="74" stroke="#d4213d"/><line x1="26" y1="90" x2="294" y2="90" stroke="#e8e8ee"/></g>'
  +'<rect x="22" y="52" width="6" height="64" fill="#8a8a96"/><rect x="292" y="52" width="6" height="64" fill="#8a8a96"/><rect x="22" y="52" width="6" height="12" fill="#d4213d"/><rect x="292" y="52" width="6" height="12" fill="#d4213d"/>'
  +pr[0]
  +'<g class="rgref"><rect x="157" y="88" width="8" height="8" fill="#e9c9a0"/><rect x="156" y="96" width="10" height="14" fill="#f2f2f2"/><rect x="156" y="98" width="10" height="2" fill="#111"/><rect x="156" y="102" width="10" height="2" fill="#111"/><rect x="156" y="106" width="10" height="2" fill="#111"/><rect x="157" y="110" width="3" height="8" fill="#111"/><rect x="162" y="110" width="3" height="8" fill="#111"/></g>'
  +side(tm[0],'a',hold)+side(tm[1],'b',hold)+pr[1]
  +(big?'<g class="rgpy">'+[0,1,2,3,4,5].map(i=>'<circle cx="'+(i<3?30+i*7:290-(i-3)*7)+'" cy="124" r="2.2" fill="'+(i%2?'#ffd34d':'#ff6a3d')+'" style="animation-delay:'+(i%3)*.12+'s"/>').join('')+'</g>':'')
  +'<g class="rgfx"><polygon class="rgx" points="160,70 166,82 178,80 169,90 176,102 162,96 150,104 154,91 142,82 155,81" fill="#ffd34d" stroke="#fff" stroke-width="1"/>'
  +'<text class="rgc c1" x="160" y="46">1</text><text class="rgc c2" x="160" y="46">2</text><text class="rgc c3" x="160" y="46">3</text><text class="rgt rgtap" x="160" y="46">'+esc(t('rg.tap'))+'</text><text class="rgt rgdq" x="160" y="46">'+esc(t('rg.dq'))+'</text>'
  +'<text class="rgs sa" x="130" y="52">★</text><text class="rgs sb" x="190" y="52">★</text></g></svg>'};
 const phase=(r,p)=>{r.dataset.p=p;r.className=r.className.replace(/\bp\d\b/g,'').trim()+' p'+p};
 const finOf=m=>{let f=m.finish||'clean';const sp=STIPS[m.stip]||STIPS.none;if(sp.noDQ&&(f==='dq'||f==='count'))f='clean';return f};
 const kindOf=(m,fin)=>{if(fin==='draw')return'drw';if(fin==='dq')return'dq';if(fin==='count')return'out';
  return {tables:'tbl',ladder:'lad',prizematch:'lad',cage:'cag',extreme:'ext',lms:'lms',submission:'sub'}[m.stip]||('m'+(hash((m.a[0]||'')+(m.b[0]||'')+(m.mv||''))%4))};
 const setWinner=(r,m,wiOpt)=>{if(r.dataset.k&&!wiOpt)return;try{const A=sides(m).A,o=OCS.get(m),wi=wiOpt||(o&&o.wi);if(!wi)return;const fin=finOf(m),k=kindOf(m,fin),wn=fin==='draw'?'d':(wi.some(i=>A.indexOf(i)>=0)?'a':'b');
  r.dataset.wn=wn;r.dataset.fin=fin;r.dataset.k=k;r.dataset.cnt=({tbl:'pin',out:'ten',lms:'ten',sub:'tap',dq:'dq',lad:'',cag:'',drw:''})[k]!==undefined?({tbl:'pin',out:'ten',lms:'ten',sub:'tap',dq:'dq',lad:'',cag:'',drw:''})[k]:'pin';
  const ten=r.dataset.cnt==='ten';r.querySelectorAll('.rgc').forEach((e,i)=>{e.textContent=ten?['8','9','10'][i]:String(i+1)});
  r.querySelectorAll('.rgd').forEach(g=>{g.classList.remove('win','los');if(wn!=='d')g.classList.add(g.classList.contains(wn)?'win':'los')})}catch(e){}};
 const _mcNew=mcNew;mcNew=function(live,m,i,total,tt){const d=_mcNew.apply(this,arguments);
  try{if(G.noring)live.classList.add('noring');else live.classList.remove('noring');
   const tm=mcTeams(m);if(tm.length!==2||!tm[0].length||!tm[1].length)return d;RGN=0;
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
   setTimeout(()=>{phase(r,5);RINGS.delete(m);OCS.delete(m)},0)}}catch(e){}return h};
 Object.assign(ACT,{ringtog(){G.noring=!G.noring;try{save()}catch(e){}const l=document.getElementById('live');if(l)l.classList.toggle('noring',!!G.noring);const b=document.getElementById('rgtog');if(b)b.textContent=t(G.noring?'rg.off':'rg.on')}});
 const _r=render;render=function(){const r=_r.apply(this,arguments);try{if(RUN&&!document.getElementById('rgtog')){const f=document.querySelector('[data-act="fast"]');if(f)f.insertAdjacentHTML('beforebegin','<button class="btn sm" id="rgtog" data-act="ringtog">'+esc(t(G.noring?'rg.off':'rg.on'))+'</button> ')}}catch(e){}return r};
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
 /* belts: champion keeps it, a new champion gets it */
 '.rg[data-ch] .rgbelt.h{display:none}.rg.p5[data-ch][data-wn=a] .rgd.a .rgbelt,.rg.p5[data-ch][data-wn=b] .rgd.b .rgbelt{display:block}',
 '@media (prefers-reduced-motion:reduce){.rg *{animation:none!important;transition:none!important}}'
 ].join('');
 try{let s=document.getElementById('rgcss');if(!s){s=document.createElement('style');s.id='rgcss';document.head.appendChild(s)}s.textContent=css}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
