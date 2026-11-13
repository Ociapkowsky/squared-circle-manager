/* ===== simplified left menu: 5 core items + 8 topic hubs with tabs, tabs unlock with promotion tier ===== */
const HUBS=[
 ['h.story','feuds',['feuds','rd']],
 ['h.titles','titles',['titles','prizes','cup','ppv']],
 ['h.talent','gim',['gim','fin','fa','ct','health','lk','rel','bonds']],
 ['h.team','staff',['staff','mg','sct','dev','bk','train']],
 ['h.biz','money',['money','infra','board','life','hobby','cmk','loan']],
 ['h.exp','br',['br','rt','dy','emp','hold']],
 ['h.world','world',['world','rank','war','tw']],
 ['h.career','hof',['hof','career','charts','sk','chron','rpl','season']]];
/* minimum promotion tier for a tab to be listed (set by eye); the current screen is always listed */
const NAV_MIN={prizes:2,cup:2,ppv:3,mg:2,sct:2,dev:3,life:2,hobby:2,cmk:2,br:4,rt:3,dy:2,emp:4,hold:5,war:2,loan:2};
const HUBLAST={};
function navVis(sc){try{if(G.screen===sc)return true;if((sc==='hobby'||sc==='cmk')&&G.me&&G.me.hobbyOff)return false;return (NAV_MIN[sc]||0)<=(G.fed.tier||1)}catch(e){return true}}
const ROSTER_HUB=['h.roster','roster',['roster','tm','stables']];
function hubOf(sc){return HUBS.find(h=>h[2].indexOf(sc)>=0)||(ROSTER_HUB[2].indexOf(sc)>=0?ROSTER_HUB:null)}
function hubTabsHtml(){try{const h=hubOf(G.screen);if(!h)return '';const vis=h[2].filter(navVis);if(vis.length<2)return '';
  const locked=h[2].some(s=>!navVis(s)&&!((s==='hobby'||s==='cmk')&&G.me&&G.me.hobbyOff));
  return '<div class="hubtabs" role="tablist">'+vis.map(s=>'<button class="btn'+(G.screen===s?' gold':'')+'" role="tab" aria-selected="'+(G.screen===s)+'" data-act="nav" data-v="'+s+'">'+t('nav.'+s)+(s==='tw'&&twNew()?' <span class="tag">'+twNew()+'</span>':'')+'</button>').join('')+'</div>'+(locked?'<div class="mute hubmore">'+t('h.more')+'</div>':'')}catch(e){return ''}}
function hubNavHtml(){const tag=(n,c)=>c?' <span class="tag">'+c+'</span>':'';
  const btn=(sc,label,ic,extra,on)=>'<button data-act="nav" data-v="'+sc+'" class="'+(on?'on':'')+'">'+navIc(ic)+'<span>'+label+'</span>'+(extra||'')+'</button>';
  let h='<nav class="nav"><div class="ng"><div class="ng-i">';
  ['dash','inbox','roster','show','cal'].forEach(n=>{h+=btn(n,t('nav.'+n),n,n==='inbox'&&ibxNew()?tag(0,ibxNew()):'',n==='roster'?ROSTER_HUB[2].indexOf(G.screen)>=0:G.screen===n)});
  h+='<div class="nsep"></div>';
  HUBS.forEach(hb=>{const vis=hb[2].filter(navVis);if(!vis.length)return;const act=hb[2].indexOf(G.screen)>=0;
   if(act)HUBLAST[hb[0]]=G.screen;const go=(HUBLAST[hb[0]]&&vis.indexOf(HUBLAST[hb[0]])>=0)?HUBLAST[hb[0]]:vis[0];
   h+=btn(go,t(hb[0]),hb[1],hb[2].indexOf('tw')>=0&&twNew()?tag(0,twNew()):'',act)});
  h+='<div class="nsep"></div>'+btn('settings',t('nav.settings'),'settings','',G.screen==='settings');
  return h+'</div></div></nav>'}
(function(){const _sh=shell;shell=function(inner){try{inner=hubTabsHtml()+inner}catch(e){}let h=_sh.call(this,inner);try{h=h.replace(/<nav class="nav">[\s\S]*?<\/nav>/,hubNavHtml())}catch(e){}return h};
 const _tb=tutBtn;tutBtn=function(s){try{if(!hasDoc)return true;if(['dash','inbox','roster','show','cal','settings'].indexOf(s)>=0)return true;return !!hubOf(s)&&navVis(s)}catch(e){return _tb.apply(this,arguments)}};
 try{if(typeof document!=='undefined'&&!document.getElementById('hubcss')){const s=document.createElement('style');s.id='hubcss';s.textContent='.hubtabs{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}.hubtabs .btn{padding:6px 14px;border-radius:999px;font-size:13px}.hubmore{font-size:12px;margin:-2px 0 12px}.nav .nsep{height:1px;background:currentColor;opacity:.12;margin:8px 6px}@media (max-width:900px){.nav .nsep{display:none}}';document.head.appendChild(s)}}catch(e){}})();
Object.assign(D,{'h.story':['Fabuła','Storylines'],'h.titles':['Tytuły i gale','Titles & events'],'h.talent':['Zawodnicy','Talent'],'h.team':['Zespół','Team'],'h.biz':['Biznes','Business'],'h.exp':['Ekspansja','Expansion'],'h.world':['Świat','World'],'h.career':['Kariera','Career'],
 'nav.tm':['Tag Teamy','Tag teams'],'h.more':['Kolejne zakładki odblokują się wraz z rozwojem federacji.','More tabs unlock as your promotion grows.']});
if(typeof normTexts==="function")normTexts();
