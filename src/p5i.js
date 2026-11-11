/* ===== round 11e: background music (looped, own volume, starts after the first click) ===== */
Object.assign(D,{
 'mus.title':['Muzyka w tle','Background music'],'mus.on':['Muzyka włączona','Music on'],'mus.off':['Muzyka wyłączona','Music off'],'mus.vol':['Głośność muzyki','Music volume'],
 'mus.credit':['Utwór „Cyberpunk Moonlight Sonata” (CC0, domena publiczna).','Track “Cyberpunk Moonlight Sonata” (CC0, public domain).']
});
const LS_MUS='ringboss.mus.v1';
const MUS={on:true,vol:.35,el:null,started:false};
try{const s=JSON.parse(localStorage.getItem(LS_MUS)||'null');if(s){MUS.on=s.on!==false;MUS.vol=typeof s.vol==='number'?Math.min(1,Math.max(0,s.vol)):.35}}catch(e){}
function musSave(){try{localStorage.setItem(LS_MUS,JSON.stringify({on:MUS.on,vol:MUS.vol}))}catch(e){}}
function musEl(){if(!MUS.el&&typeof Audio!=='undefined'){try{MUS.el=new Audio(MUS_SRC);MUS.el.loop=true;MUS.el.preload='auto'}catch(e){MUS.el=null}}return MUS.el}
function musApply(){const a=musEl();if(!a)return;a.volume=Math.min(1,Math.max(0,MUS.vol));if(MUS.on&&MUS.started&&!document.hidden){const p=a.play();if(p&&p.catch)p.catch(()=>{MUS.started=false})}else a.pause()}
if(typeof document!=='undefined'&&document.addEventListener){
 const go=()=>{if(MUS.started)return;MUS.started=true;musApply()};
 ['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,go,{capture:true,passive:true}));
 document.addEventListener('visibilitychange',musApply)}
Object.assign(CHG,{musvol(e){MUS.vol=+e.value/100;musSave();musApply()}});
ACT.mustog=function(){MUS.on=!MUS.on;MUS.started=true;musSave();musApply();render()};
(function(){const _vs=vSettings;vSettings=function(){const h=_vs.apply(this,arguments);
 return h+'<div class="card stack"><h3>'+t('mus.title')+'</h3><div class="row" style="gap:12px;flex-wrap:wrap;align-items:center"><button class="btn'+(MUS.on?' gold':'')+'" data-act="mustog">'+t(MUS.on?'mus.on':'mus.off')+'</button><label class="row" style="gap:8px;align-items:center">'+t('mus.vol')+' <input type="range" min="0" max="100" value="'+Math.round(MUS.vol*100)+'" data-chg="musvol" aria-label="'+t('mus.vol')+'"></label></div><div class="mute" style="font-size:13px">'+t('mus.credit')+'</div></div>'}})();
if(typeof normTexts==='function')normTexts();
