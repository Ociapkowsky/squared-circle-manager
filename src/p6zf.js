;/* ===== live show: animated ring with pixel wrestlers (prototype) ===== */
(function(){
 Object.assign(D,{'rg.on':['Ring: włączony','Ring: on'],'rg.off':['Ring: wyłączony','Ring: off'],'rg.pin':['1 … 2 … 3','1 … 2 … 3']});
 const RINGS=new Map(),OCS=new Map();
 const AH=60;
 const place=(w,cx,y,sc)=>{let s=avatar(w.look,AH);const wd=Math.round(AH*16/23);return s.replace('<svg ','<svg x="'+(cx-wd/2)+'" y="'+y+'" ').replace(/width="\d+" height="\d+"/,'width="'+wd+'" height="'+AH+'"')};
 const side=(ids,cls)=>ids.slice(0,2).map((id,k)=>{const w=W(id);if(!w)return '';const base=cls==='a'?[84,60][k]:[236,260][k];return '<g class="rgd '+cls+' k'+k+'"><g class="rgw"><g class="rgi">'+place(w,base,66+k*0)+'</g></g></g>'}).join('');
 const crowd=()=>{let h='';for(let i=0;i<26;i++){const x=6+i*12.2,y=34+((i*7)%5)*2;h+='<circle class="rgcr" cx="'+x.toFixed(1)+'" cy="'+y+'" r="'+(4+(i%3))+'" style="animation-delay:'+((i%6)*.15)+'s"/>'}return h};
 const ringSvg=(tm)=>'<svg class="rgsvg" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'
  +'<defs><linearGradient id="rgsp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'
  +'<rect width="320" height="150" fill="#0d0d12"/>'+crowd()
  +'<polygon points="95,0 225,0 285,138 35,138" fill="url(#rgsp)"/>'
  +'<polygon points="26,112 294,112 316,142 4,142" fill="#2b2b36"/><polygon points="4,142 316,142 316,150 4,150" fill="#a8232b"/>'
  +'<g class="rgrope" stroke-width="2"><line x1="26" y1="58" x2="294" y2="58" stroke="#e8e8ee"/><line x1="26" y1="74" x2="294" y2="74" stroke="#d4213d"/><line x1="26" y1="90" x2="294" y2="90" stroke="#e8e8ee"/></g>'
  +'<rect x="22" y="52" width="6" height="64" fill="#8a8a96"/><rect x="292" y="52" width="6" height="64" fill="#8a8a96"/><rect x="22" y="52" width="6" height="12" fill="#d4213d"/><rect x="292" y="52" width="6" height="12" fill="#d4213d"/>'
  +'<g class="rgref"><rect x="157" y="88" width="8" height="8" fill="#e9c9a0"/><rect x="156" y="96" width="10" height="14" fill="#f2f2f2"/><rect x="156" y="98" width="10" height="2" fill="#111"/><rect x="156" y="102" width="10" height="2" fill="#111"/><rect x="156" y="106" width="10" height="2" fill="#111"/><rect x="157" y="110" width="3" height="8" fill="#111"/><rect x="162" y="110" width="3" height="8" fill="#111"/></g>'
  +side(tm[0],'a')+side(tm[1],'b')
  +'<g class="rgfx"><polygon class="rgx" points="160,70 166,82 178,80 169,90 176,102 162,96 150,104 154,91 142,82 155,81" fill="#ffd34d" stroke="#fff" stroke-width="1"/>'
  +'<text class="rgc c1" x="160" y="46">1</text><text class="rgc c2" x="160" y="46">2</text><text class="rgc c3" x="160" y="46">3</text>'
  +'<text class="rgs sa" x="130" y="52">★</text><text class="rgs sb" x="190" y="52">★</text></g></svg>';
 const phase=(r,p)=>{r.className.baseVal!==undefined;r.dataset.p=p;r.className=r.className.replace(/\bp\d\b/g,'').trim()+' p'+p};
 const setWinner=(r,m)=>{const o=OCS.get(m);if(!o||r.dataset.wn)return;try{const A=sides(m).A;r.dataset.wn=o.wi.some(i=>A.indexOf(i)>=0)?'a':'b'}catch(e){}};
 const _mcNew=mcNew;mcNew=function(live,m,i,total,tt){const d=_mcNew.apply(this,arguments);
  try{if(G.noring)live.classList.add('noring');else live.classList.remove('noring');
   const tm=mcTeams(m);if(tm.length!==2||!tm[0].length||!tm[1].length)return d;
   const r=document.createElement('div');r.className='rg p0';r.innerHTML=ringSvg(tm);const v=d.querySelector('.mcv');if(v)v.insertAdjacentElement('afterend',r);else d.appendChild(r);
   if(v)v.classList.add('rg-hide');RINGS.set(m,r);let timer=null;
   const mo=new MutationObserver(()=>{const n=d.querySelectorAll(':scope > .ln').length;if(d.querySelector(':scope > .mcr'))return;const p=n>=3?3:n;if(+r.dataset.p!==p&&p>+r.dataset.p){phase(r,p);if(p>=3){setWinner(r,m);clearTimeout(timer);timer=setTimeout(()=>{if(+r.dataset.p<4)phase(r,4)},RUN&&RUN.fast?0:1100)}}});
   mo.observe(d,{childList:true});r._mo=mo;r.dataset.p=0}catch(e){}return d};
 const _out=outcome;outcome=function(m){const o=_out.apply(this,arguments);try{OCS.set(m,o)}catch(e){}return o};
 const _mcR=mcResult;mcResult=function(m,res,oc,tt,held0){const h=_mcR.apply(this,arguments);
  try{const r=RINGS.get(m);if(r){const A=sides(m).A;r.dataset.wn=res.finish==='draw'?'d':(oc.wi.some(i=>A.indexOf(i)>=0)?'a':'b');r.dataset.fin=res.finish||'clean';
   if(r._mo)r._mo.disconnect();setTimeout(()=>{phase(r,5);RINGS.delete(m);OCS.delete(m)},0)}}catch(e){}return h};
 Object.assign(ACT,{ringtog(){G.noring=!G.noring;try{save()}catch(e){}const l=document.getElementById('live');if(l)l.classList.toggle('noring',!!G.noring);const b=document.getElementById('rgtog');if(b)b.textContent=t(G.noring?'rg.off':'rg.on')}});
 const _r=render;render=function(){const r=_r.apply(this,arguments);try{if(RUN&&!document.getElementById('rgtog')){const f=document.querySelector('[data-act="fast"]');if(f)f.insertAdjacentHTML('beforebegin','<button class="btn sm" id="rgtog" data-act="ringtog">'+esc(t(G.noring?'rg.off':'rg.on'))+'</button> ')}}catch(e){}return r};
 try{if(!document.getElementById('rgcss')){const s=document.createElement('style');s.id='rgcss';s.textContent=[
 '.rg{background:#0d0d12;border-radius:10px;overflow:hidden;border:1px solid var(--line);margin:2px 0}.rgsvg{display:block;width:100%;height:auto;max-height:240px}.live.noring .rg{display:none}.live.noring .rg-hide{display:flex!important}.live:not(.noring) .rg-hide{display:none}',
 '.rgcr{fill:#17171f;animation:rgbob 1.2s ease-in-out infinite alternate}@keyframes rgbob{to{transform:translateY(-2px)}}',
 '.rgd{transition:transform .9s ease-in-out}.rgw{transform-box:fill-box;transform-origin:50% 100%;transition:transform .55s ease-out}.rgi{transform-box:fill-box;transform-origin:50% 100%;animation:rgidle 1.1s ease-in-out infinite alternate}@keyframes rgidle{to{transform:translateY(-1.5px) scaleY(1.015)}}',
 '.rgd.k1{opacity:.92}.rgref{transition:transform .8s ease-in-out;opacity:.95}.rgfx>*{opacity:0}',
 /* p1 lock-up */
 '.rg.p1 .rgd.a,.rg.p2 .rgd.a,.rg.p3 .rgd.a{transform:translateX(48px)}.rg.p1 .rgd.b,.rg.p2 .rgd.b,.rg.p3 .rgd.b{transform:translateX(-48px)}.rg.p1 .rgd.a .rgw{transform:rotate(7deg)}.rg.p1 .rgd.b .rgw{transform:rotate(-7deg)}',
 /* p2 exchange */
 '.rg.p2 .rgd.a .rgw{animation:rgsa 1.3s ease-in-out infinite}.rg.p2 .rgd.b .rgw{animation:rgsb 1.3s ease-in-out infinite}@keyframes rgsa{0%,100%{transform:rotate(5deg)}25%{transform:rotate(18deg) translateX(8px)}50%{transform:rotate(-6deg) translateX(-3px)}}@keyframes rgsb{0%,100%{transform:rotate(-5deg)}25%{transform:rotate(-12deg) translateX(3px)}50%{transform:rotate(-18deg) translateX(-8px)}75%{transform:rotate(6deg)}}',
 '.rg.p2 .rgx{animation:rgfl 1.3s steps(1) infinite}@keyframes rgfl{0%,100%{opacity:0}20%,30%{opacity:1}55%,65%{opacity:1}}',
 /* p3 climax */
 '.rg.p3[data-wn=a] .rgd.b .rgw{transform:rotate(24deg) translateY(2px)}.rg.p3[data-wn=b] .rgd.a .rgw{transform:rotate(-24deg) translateY(2px)}.rg.p3[data-wn=a] .rgd.a .rgw{transform:rotate(10deg) scaleY(.94)}.rg.p3[data-wn=b] .rgd.b .rgw{transform:rotate(-10deg) scaleY(.94)}.rg.p3 .rgx{opacity:1}',
 /* p4 pin */
 '.rg.p4 .rgd.a,.rg.p5 .rgd.a{transform:translateX(48px)}.rg.p4 .rgd.b,.rg.p5 .rgd.b{transform:translateX(-48px)}',
 '.rg.p4[data-wn=a] .rgd.b .rgw,.rg.p5[data-wn=a] .rgd.b .rgw{transform:translateY(-12px) rotate(90deg);animation:none}.rg.p4[data-wn=b] .rgd.a .rgw,.rg.p5[data-wn=b] .rgd.a .rgw{transform:translateY(-12px) rotate(-90deg);animation:none}',
 '.rg.p4[data-wn=a] .rgd.a,.rg.p5[data-wn=a] .rgd.a{transform:translateX(62px)}.rg.p4[data-wn=b] .rgd.b,.rg.p5[data-wn=b] .rgd.b{transform:translateX(-62px)}',
 '.rg.p4[data-wn=a] .rgd.a .rgw,.rg.p4[data-wn=b] .rgd.b .rgw{transform:scaleY(.86)}.rg.p4[data-wn=a] .rgref{transform:translateX(34px)}.rg.p4[data-wn=b] .rgref{transform:translateX(-34px)}',
 '.rg.p4[data-wn=d] .rgw,.rg.p5[data-wn=d] .rgw{animation:rgsway 1s ease-in-out infinite alternate}@keyframes rgsway{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}',
 '.rgc{font:700 22px system-ui,sans-serif;fill:#fff;stroke:#000;stroke-width:.8;text-anchor:middle;opacity:0}.rg.p4[data-wn=a] .rgc,.rg.p4[data-wn=b] .rgc{animation:rgcnt .75s ease-out both}.rg.p4 .c2{animation-delay:.8s!important}.rg.p4 .c3{animation-delay:1.6s!important}@keyframes rgcnt{0%{opacity:0;transform:translateY(6px)}20%,70%{opacity:1;transform:none}100%{opacity:0}}',
 /* p5 finish */
 '.rg.p5[data-wn=a] .rgd.a .rgw{animation:rgwin .6s ease-in-out infinite alternate;transform:none}.rg.p5[data-wn=b] .rgd.b .rgw{animation:rgwin .6s ease-in-out infinite alternate;transform:none}@keyframes rgwin{to{transform:translateY(-7px) scale(1.04)}}',
 '.rgs{font:20px system-ui;fill:#ffd34d;text-anchor:middle}.rg.p5[data-wn=a] .sa{opacity:1;animation:rgpop .7s ease-out both}.rg.p5[data-wn=b] .sb{opacity:1;animation:rgpop .7s ease-out both}@keyframes rgpop{from{opacity:0;transform:translateY(10px) scale(.4)}}',
 '.rg.p5[data-wn=a] .rgref{transform:translateX(-20px)}.rg.p5[data-wn=b] .rgref{transform:translateX(20px)}',
 '@media (prefers-reduced-motion:reduce){.rg *{animation:none!important;transition:none!important}}'
 ].join('');document.head.appendChild(s)}}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
