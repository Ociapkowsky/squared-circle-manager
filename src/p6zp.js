;/* federation logos: built-in logos + upload your own */
(function(){
const FL={gwf:'logos/gwf.webp',apw:'logos/apw.webp',cwe:'logos/cwe.webp',nnp:'logos/nnpw.webp',cul:'logos/cull.webp',roh:'logos/rog.webp',nwc:'logos/nwc.webp',mlw:'logos/mpw.webp',gcw:'logos/gbw.webp',rsp:'logos/anpw.webp',ark:'logos/ark.webp',str:'logos/starburst.webp',dtt:'logos/dtt.webp',drg:'logos/dpp.webp',lfl:'logos/lta.webp',rvp:'logos/rvp.webp',pgr:'logos/prw.webp',wxx:'logos/wxw.webp',nlw:'logos/nlw.webp',spw:'logos/spw.webp',bra:'logos/bra.webp',icw:'logos/icw.webp',eve:'logos/eden.webp'};
window.FEDLOGO=FL;
let CL=null;
Object.assign(D,{'lg.t':['Logo federacji','Promotion logo'],'lg.up':['Wgraj logo','Upload logo'],'lg.rm':['Usuń logo','Remove logo'],
 'lg.hint':['PNG, JPG lub WebP, najlepiej na przezroczystym tle. Obraz zostanie zmniejszony i zapisany razem z grą.','PNG, JPG or WebP, ideally on a transparent background. The image is shrunk and stored with the save.'],
 'lg.none':['Brak logo','No logo'],'lg.big':['Plik jest za duży (max 6 MB).','File is too large (max 6 MB).'],'lg.bad':['Nie udało się wczytać obrazu.','Could not read the image.']});
try{const st=document.createElement('style');st.textContent='.fedlogo{display:inline-block;vertical-align:middle;object-fit:contain;max-width:100%}.fedlogo.lgbox{background:rgba(127,127,127,.12);border-radius:8px;padding:4px}';document.head.appendChild(st)}catch(e){}
const logoOf=f=>(f&&(f.logo||FL[f.id]))||'';
const lg=(f,h)=>{const s=logoOf(f);return s?'<img class="fedlogo" src="'+esc(s)+'" alt="" style="max-height:'+h+'px;max-width:'+Math.round(h*3.4)+'px;width:auto;height:auto">':''};
window.fedLogoHtml=lg;
function readLogo(file,cb){
 if(!file)return;if(file.size>6e6){alert&&0;try{toast&&toast(t('lg.big'))}catch(e){}return}
 const fr=new FileReader();fr.onerror=()=>{};
 fr.onload=()=>{const im=new Image();im.onload=()=>{try{const M=256,k=Math.min(1,M/Math.max(im.width,im.height)),w=Math.max(1,Math.round(im.width*k)),h=Math.max(1,Math.round(im.height*k));
   const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);
   let u=c.toDataURL('image/webp',.9);if(u.indexOf('data:image/webp')!==0)u=c.toDataURL('image/png');cb(u)}catch(e){}};
  im.onerror=()=>{};im.src=fr.result};
 fr.readAsDataURL(file)}
const _vs=viewStart;viewStart=function(){let h=_vs.apply(this,arguments);
 try{if(typeof h==='string'){
  PACK.feds.forEach(f=>{if(!FL[f.id])return;const a='<div class="wname"><span class="dot" style="background:'+esc(f.color||'#888')+'"></span>'+esc(f.name);h=h.replace(a,'<div class="wname">'+lg(f,28)+' '+esc(f.name))});
  const blk='<label class="px">'+esc(t('lg.t'))+'</label><div class="row"><span id="lgprev">'+(CL?'<img class="fedlogo lgbox" src="'+CL+'" alt="" style="max-height:44px;max-width:150px;width:auto;height:auto">':'<span class="mute">'+esc(t('lg.none'))+'</span>')+'</span><label class="btn sm" style="cursor:pointer">'+esc(t('lg.up'))+'<input type="file" accept="image/*" data-chg="lgnew" hidden></label><button class="btn sm" data-act="lgnewclear">'+esc(t('lg.rm'))+'</button></div><div class="mute" style="font-size:12px">'+esc(t('lg.hint'))+'</div>';
  h=h.replace('<button class="btn gold" data-act="custom">',blk+'<button class="btn gold" data-act="custom">')}}catch(e){}return h};
CHG.lgnew=function(el){readLogo(el.files&&el.files[0],u=>{CL=u;const p=document.getElementById('lgprev');if(p)p.innerHTML='<img class="fedlogo lgbox" src="'+u+'" alt="" style="max-height:44px;max-width:150px;width:auto;height:auto">'})};
Object.assign(ACT,{lgnewclear(){CL=null;const p=document.getElementById('lgprev');if(p)p.innerHTML='<span class="mute">'+esc(t('lg.none'))+'</span>'},
 lgrm(){if(G&&G.fed){delete G.fed.logo;save();render()}}});
CHG.lgset=function(el){readLogo(el.files&&el.files[0],u=>{if(G&&G.fed){G.fed.logo=u;save();render()}})};
const _ng=newGame;newGame=function(fedId,custom){const r=_ng.apply(this,arguments);try{if(custom&&CL&&G&&G.fed){G.fed.logo=CL;CL=null}}catch(e){}return r};
const _sh=shell;shell=function(){let h=_sh.apply(this,arguments);
 try{const f=G&&G.fed;if(f&&logoOf(f)){const i=h.indexOf('<div class="fedbox">');if(i>=0){const j=h.indexOf('<b>'+esc(f.name)+'</b>',i);if(j>0)h=h.slice(0,j)+'<div style="margin:4px 0 6px">'+lg(f,44)+'</div>'+h.slice(j)}}}catch(e){}return h};
const _vst=vSettings;vSettings=function(){let h=_vst.apply(this,arguments);
 try{const f=G.fed,k='<div class="card stack"><b>'+t('s.new')+'</b>',card='<div class="card stack"><h3>'+esc(t('lg.t'))+'</h3><div class="row">'+(logoOf(f)?'<img class="fedlogo lgbox" src="'+esc(logoOf(f))+'" alt="" style="max-height:56px;max-width:190px;width:auto;height:auto">':'<span class="mute">'+esc(t('lg.none'))+'</span>')+'<label class="btn sm" style="cursor:pointer">'+esc(t('lg.up'))+'<input type="file" accept="image/*" data-chg="lgset" hidden></label>'+(f.logo?'<button class="btn sm" data-act="lgrm">'+esc(t('lg.rm'))+'</button>':'')+'</div><div class="mute" style="font-size:12px">'+esc(t('lg.hint'))+'</div></div>';
  if(h.indexOf(k)>=0)h=h.replace(k,card+k)}catch(e){}return h};
if(typeof normTexts==="function")normTexts();
})();
