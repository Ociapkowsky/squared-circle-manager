;/* ring extras: commentators, camera, crowd flashes/wave, title ceremony, backstage scenes, venue lighting */
(function(){
 Object.assign(D,{
  'rx.i':['Zaczynamy! Hala aż huczy!|Publiczność już wstała z miejsc!|Wchodzimy w tę walkę na pełnych obrotach!','Here we go! The arena is buzzing!|The crowd is already on its feet!|This one starts at full speed!'],
  'rx.m':['Ale wymiana ciosów!|Nikt nie odpuszcza!|Co za tempo!','What an exchange!|Nobody is backing down!|What a pace!'],
  'rx.f':['Co za finisz!|Tego nikt się nie spodziewał!|Wielki moment!','What a finish!|Nobody saw that coming!|A huge moment!'],
  'rx.pin':['Raz... dwa... trzy!|Sędzia odlicza!','One... two... three!|The ref is counting!'],
  'rx.tap':['Poddaje się!|Nie ma wyjścia, klepie!','He taps out!|No way out, he taps!'],
  'rx.dq':['Sędzia nie wierzy własnym oczom!|Dyskwalifikacja!','The ref cannot believe it!|Disqualification!'],
  'rx.out':['Nie zdążył wrócić do ringu!|Count-out!','He did not make it back in!|Count-out!'],
  'rx.d':['Remis! Nikt nie wygrał!|Obaj padli, nikt nie wstaje!','A draw! Nobody wins!|Both are down, nobody gets up!'],
  'rx.t':['Mamy nowego mistrza!|Historia zapisana na naszych oczach!','We have a new champion!|History made right before our eyes!'],
  'rx.nc':['NOWY MISTRZ!','NEW CHAMPION!'],
  'rx.b':['Spokojnie, chłopaki, jeszcze nie ring!|Jeszcze zobaczymy, kto tu rządzi!|Nie wchodź mi w drogę!','Easy, lads, save it for the ring!|We will see who runs this place!|Stay out of my way!'],
  'rx.bk':['ZAPLECZE','BACKSTAGE']
 });
 const L=k=>{const e=D[k];if(!e)return'';const v=String(e[lang==='en'?1:0]).split('|');return v[Math.floor(Math.random()*v.length)]};
 const ok=r=>r&&document.body.contains(r)&&!r.classList.contains('promo')&&!(typeof G!=='undefined'&&G&&G.noring)&&!(typeof RUN!=='undefined'&&RUN&&RUN.fast);
 const fig=c=>'<i class="cmf"><b class="cmh"></b><b class="cmb" style="background:'+c+'"></b><b class="cmm"></b></i>';
 const ov=r=>{let o=r.querySelector(':scope > .rgx');if(!o){o=document.createElement('div');o.className='rgx';
   const lite=(()=>{try{const p=G.fed.pop;return p>=55?'hi':p<22?'lo':'mid'}catch(e){return'mid'}})();o.dataset.lite=lite;
   o.innerHTML='<div class="rgbeam b1"></div><div class="rgbeam b2"></div><div class="rgwave"></div><div class="cmt l">'+fig('#3a6ea5')+'<span class="cmq"></span></div><div class="cmt r">'+fig('#a53a4a')+'<span class="cmq"></span></div><div class="rgfl"></div>';r.appendChild(o)}return o};
 const say=(r,txt,ms)=>{if(!txt)return;const o=ov(r),q=[...o.querySelectorAll('.cmq')],q1=q[Math.floor(Math.random()*2)];q.forEach(x=>x.classList.remove('on'));q1.textContent=txt;q1.classList.add('on');setTimeout(()=>q1.classList.remove('on'),ms||2200)};
 const flash=(r,n)=>{const f=ov(r).querySelector('.rgfl');for(let i=0;i<n;i++)setTimeout(()=>{if(!document.body.contains(r))return;const s=document.createElement('u');s.style.left=(8+Math.random()*84)+'%';s.style.top=(4+Math.random()*30)+'%';f.appendChild(s);setTimeout(()=>s.remove(),420)},i*90+Math.random()*120)};
 const ceremony=r=>{const o=ov(r),c=document.createElement('div');c.className='rgcer';c.innerHTML='<i class="cmf an"><b class="cmh"></b><b class="cmb" style="background:#222"></b></i><span>🏆 '+L('rx.nc')+'</span>';o.appendChild(c);try{sPlay('cash')}catch(e){}flash(r,14);setTimeout(()=>c.remove(),4200)};
 const seen=new WeakMap();
 const onPhase=(r,p)=>{if(!ok(r)||!r.classList.contains('rg'))return;ov(r);
  if(p===1)say(r,L('rx.i'),2300);
  else if(p===2)say(r,L('rx.m'),1800);
  else if(p===3){const c=r.dataset.cnt,fin=r.dataset.fin,k=r.dataset.k;let key='rx.f';if(c==='pin'||c==='ten')key='rx.pin';else if(c==='tap'||fin==='sub')key='rx.tap';else if(c==='dq'||fin==='dq')key='rx.dq';else if(fin==='count'||k==='out')key='rx.out';
   say(r,L(key),2000);if(!r.classList.contains('ffa')){r.classList.add('cam')}flash(r,r.classList.contains('big')?10:4)}
  else if(p===5){r.classList.remove('cam');if(r.dataset.wn==='d')say(r,L('rx.d'),2200);else if(r.dataset.ch==='1'){say(r,L('rx.t'),2800);ceremony(r)}}};
 try{new MutationObserver(ms=>{ms.forEach(m=>{const r=m.target;if(!(r.classList&&r.classList.contains('rg')))return;const mm=/\bp(\d)\b/.exec(r.className);if(!mm)return;const p=+mm[1];if(seen.get(r)===p)return;seen.set(r,p);try{onPhase(r,p)}catch(e){}})}).observe(document.documentElement,{attributes:true,attributeFilter:['class'],subtree:true})}catch(e){}
 /* backstage scene before some matches */
 const _mn=mcNew;mcNew=function(live,m,i,total,tt){try{if(live&&i>0&&i<total-1&&Math.random()<.35&&!(G&&G.noring)&&!(RUN&&RUN.fast)){const a=W((m.a||[])[0]),b=W((m.b||[])[0]);if(a&&b){const d=document.createElement('div');d.className='rgbk';d.innerHTML='<div class="rgbkt">'+esc(L('rx.bk'))+'</div><div class="rgbkr"><div class="rgbkp">'+fig('#3a6ea5')+'<span>'+esc(a.name)+'</span><em>'+esc(L('rx.b'))+'</em></div><div class="rgbkp r">'+fig('#a53a4a')+'<span>'+esc(b.name)+'</span></div></div>';live.appendChild(d);try{sPlay('pop')}catch(e){}setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),600)},3600)}}}catch(e){}return _mn.apply(this,arguments)};
 const css='.rg{position:relative}.rgx{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit}.rg svg{transition:transform 1.1s ease-in-out;transform-origin:50% 55%}.rg.cam svg{transform:scale(1.14)}'+
 '.cmt{position:absolute;bottom:2px;display:flex;align-items:flex-end;gap:3px;z-index:3}.cmt.l{left:4px}.cmt.r{right:4px;flex-direction:row-reverse}.cmf{display:block;position:relative;width:16px;height:22px}.cmh{position:absolute;left:4px;top:0;width:8px;height:8px;border-radius:50%;background:#e3b98f;box-shadow:0 -2px 0 1px #2a2a2a}.cmb{position:absolute;left:2px;top:8px;width:12px;height:14px;border-radius:3px 3px 0 0}.cmm{position:absolute;left:0;top:6px;width:5px;height:3px;border-radius:2px;background:#111}'+
 '.cmq{display:none;max-width:130px;background:#fff;color:#111;font:700 10px/1.2 system-ui,sans-serif;padding:3px 6px;border-radius:8px;border:1px solid #444;margin-bottom:18px}.cmq.on{display:block;animation:rxpop .25s ease-out}@keyframes rxpop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}'+
 '.rgfl{position:absolute;inset:0}.rgfl u{position:absolute;width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 8px 4px rgba(255,255,255,.85);animation:rxfl .4s ease-out both}@keyframes rxfl{0%{opacity:0;transform:scale(.3)}30%{opacity:1}100%{opacity:0;transform:scale(1.6)}}'+
 '.rgwave{position:absolute;left:0;right:0;top:6%;height:30%;background:linear-gradient(90deg,transparent 0,rgba(255,255,255,.16) 45%,transparent 90%);transform:translateX(-100%);animation:rxwv 2.4s ease-in-out 2 .3s}@keyframes rxwv{to{transform:translateX(110%)}}.rg.big .rgwave{animation-iteration-count:4}'+
 '.rgbeam{position:absolute;top:-10%;width:36%;height:120%;opacity:0;background:linear-gradient(180deg,rgba(255,255,255,.35),transparent 70%);clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);transform-origin:50% 0}.rgx[data-lite=hi] .rgbeam{opacity:.5;animation:rxbm 3.2s ease-in-out infinite alternate}.rgbeam.b1{left:6%;filter:hue-rotate(0deg)}.rgbeam.b2{right:6%;animation-delay:-1.6s!important;background:linear-gradient(180deg,rgba(255,80,180,.4),transparent 70%)}@keyframes rxbm{from{transform:rotate(-16deg)}to{transform:rotate(16deg)}}.rgx[data-lite=lo]{background:rgba(0,0,0,.28)}'+
 '.rgcer{position:absolute;left:50%;top:10%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.72);color:#f2c94c;font:900 15px system-ui,sans-serif;padding:6px 12px;border-radius:12px;border:2px solid #f2c94c;animation:rxcer 4.2s ease-in-out both;z-index:4;white-space:nowrap}.rgcer .an{animation:rxhop .5s ease-in-out 5}@keyframes rxcer{0%{opacity:0;transform:translate(-50%,-30px) scale(.6)}12%,82%{opacity:1;transform:translate(-50%,0) scale(1)}100%{opacity:0;transform:translate(-50%,-10px)}}@keyframes rxhop{50%{transform:translateY(-6px)}}'+
 '.rgbk{border:1px dashed rgba(128,128,128,.6);border-radius:12px;padding:8px 10px;margin:8px 0;background:rgba(40,40,50,.92);color:#eee;animation:rxbk .4s ease-out both}.rgbk.out{opacity:0;transition:opacity .6s}.rgbkt{font:700 10px monospace;letter-spacing:.14em;color:#aaa;margin-bottom:6px}.rgbkr{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.rgbkp{display:flex;align-items:flex-end;gap:6px;font-size:12px;flex-wrap:wrap}.rgbkp.r{flex-direction:row-reverse}.rgbkp span{font-weight:700}.rgbkp em{font-style:normal;background:#fff;color:#111;padding:3px 7px;border-radius:8px;font-size:11px;max-width:200px}.rgbkp .cmf{animation:rxhop .6s ease-in-out infinite}@keyframes rxbk{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}';
 try{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
