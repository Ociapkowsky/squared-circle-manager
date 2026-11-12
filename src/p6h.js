/* ===== belts: selectable image main plates and side plates ===== */
(function(){
 if(typeof BELTKEYS!=='undefined'){['mainImg','sideImg'].forEach(k=>{if(BELTKEYS.indexOf(k)<0)BELTKEYS.push(k)})}
 const PM={},PS={};PLM.forEach(r=>{PM[r[0]]={w:r[1],h:r[2],blank:r[3]===1}});PLS.forEach(r=>{PS[r[0]]={w:r[1],h:r[2],w2:r[4]||r[1],h2:r[5]||r[2],pair:!!r[4]}});
 window.PLATE_MAIN=PM;window.PLATE_SIDE=PS;
 const defs=()=>{try{if(typeof document==='undefined'||document.getElementById('plate-defs'))return;if(!document.body){document.addEventListener('DOMContentLoaded',defs);return}
  let h='<svg id="plate-defs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"><defs>';
  PLM.forEach(r=>{h+='<image id="pl'+r[0]+'" width="'+r[1]+'" height="'+r[2]+'" href="data:image/webp;base64,'+r[4]+'"/>'});
  PLS.forEach(r=>{h+='<image id="pl'+r[0]+'" width="'+r[1]+'" height="'+r[2]+'" href="data:image/webp;base64,'+r[3]+'"/>';if(r[6])h+='<image id="pl'+r[0]+'r" width="'+r[4]+'" height="'+r[5]+'" href="data:image/webp;base64,'+r[6]+'"/>'});
  const d=document.createElement('div');d.innerHTML=h+'</defs></svg>';document.body.appendChild(d.firstChild)}catch(e){}};defs();
 const use=(id,cx,cy,bw,bh,sw,sh)=>{const k=Math.min(bw/sw,bh/sh);const w=sw*k,h=sh*k;return '<use href="#pl'+id+'" transform="translate('+(cx-w/2).toFixed(2)+' '+(cy-h/2).toFixed(2)+') scale('+k.toFixed(4)+')"/>'};
 const _belt=belt;
 belt=function(tt,w){
  const mi=PM[tt.mainImg],si=PS[tt.sideImg];if(!mi&&!si)return _belt.apply(this,arguments);
  w=w||160;const st=tt.strap||'#1a1a1a',st2=tt.strap2||'#f2c94c',pl=PLATE[tt.plate]||PLATE.gold,tag=tt.teams===2;
  const ms=tt.mainShape||'oval',ss=tt.sideShape||'rect',sn=tt.sideN==null?1:tt.sideN,me=tt.mainEmb||(tag?'none':'letter'),se=tt.sideEmb||'gem';
  let s='<rect x="0" y="20" width="160" height="26" rx="4" fill="'+st+'"/>'+strapPat(tt.pat||'plain',st2)+'<rect x="0" y="23" width="160" height="2" fill="#fff" opacity=".2"/><rect x="0" y="41" width="160" height="2" fill="#000" opacity=".3"/>';
  const bw=tag?50:82,bh=tag?42:58;
  const mains=(tag?[54,106]:[80]).map(cx=>{if(mi){const k=Math.min(bw/mi.w,bh/mi.h);return [cx,mi.w*k/2,mi.h*k/2]}return [cx,tag?26:30,tag?22:30]});
  const left=mains[0][0]-mains[0][1],right=mains[mains.length-1][0]+mains[mains.length-1][1];
  const nm=(titleName(tt).replace(/[^A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż ]/g,'').trim().charAt(0)||'★').toUpperCase();
  if(sn>0)[[-1,left],[1,right]].forEach(([dir,edge])=>{
   const av=dir<0?edge-3:157-edge,gap=2,pw=clamp((av-gap*(sn-1))/sn,6,si?24:15),ph=si?(pw<12?30:36):(pw<10?26:34);
   for(let i=0;i<sn;i++){const cx=dir<0?edge-3-pw/2-i*(pw+gap):edge+3+pw/2+i*(pw+gap);
    if(si){const id=tt.sideImg+(dir>0&&si.pair?'r':''),sw=dir>0&&si.pair?si.w2:si.w,sh=dir>0&&si.pair?si.h2:si.h;
     if(dir>0&&!si.pair)s+='<g transform="translate('+(cx*2).toFixed(2)+' 0) scale(-1 1)">'+use(id,cx,33,pw,ph,sw,sh)+'</g>';else s+=use(id,cx,33,pw,ph,sw,sh)}
    else{
     s+=shp(ss,cx,33,pw/2,ph/2,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="1.8"');
     if(se==='gem')s+='<circle cx="'+cx+'" cy="33" r="'+(pw*.26).toFixed(1)+'" fill="'+pl[1]+'"/>';
     else if(se==='star')s+=embSvg('star',cx,33,pw/22,pl,tt,nm);
     else if(se==='flag'||se==='mix'){const id=se==='mix'?EUMIX[(i+(dir>0?3:0))%EUMIX.length]:(tt.flag||'eu');s+=flagSvg(id,cx-pw*.36,33-pw*.26,pw*.72,pw*.52)}}}});
  mains.forEach(([cx,rx,ry])=>{
   if(mi){s+=use(tt.mainImg,cx,33,bw,bh,mi.w,mi.h);if(mi.blank&&me!=='none')s+=embSvg(me,cx,33,(tag?.5:.8),pl,tt,nm)}
   else{s+=shp(ms,cx,33,rx,ry,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="3"')+shp(ms,cx,33,rx-7,ry-7,'fill="none" stroke="'+pl[1]+'" stroke-width="1.5"');s+=embSvg(me,cx,33,tag?.65:1,pl,tt,nm)}
   if(tt.worn)s+=wornSvg(cx,33,rx,ry)});
  const p=clamp(Math.round(prestOf(tt)),1,5);
  for(let k=0;k<p;k++){const cx=80+(k-(p-1)/2)*9;s+='<circle cx="'+cx+'" cy="'+(tag?33:50)+'" r="2.8" fill="#d83a3a" stroke="#fff" stroke-width=".7"/>'}
  return '<svg viewBox="0 0 160 66" width="'+w+'" height="'+Math.round(w*66/160)+'" role="img" aria-label="'+esc(titleName(tt))+'">'+s+'</svg>'};
 /* pickers in the belt designer */
 const thumbs=(k,list,cur,keyFn)=>'<div class="plpick"><button class="pl-b txt'+(!cur?' on':'')+'" data-act="tdset" data-k="'+k+'" data-v="">'+t('t.o.imgnone')+'</button>'+list.map(r=>'<button class="pl-b'+(cur===r[0]?' on':'')+'" data-act="tdset" data-k="'+k+'" data-v="'+r[0]+'" aria-label="'+r[0]+'"><svg viewBox="0 0 '+r[1]+' '+r[2]+'" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"><use href="#pl'+r[0]+'"/></svg></button>').join('')+'</div>';
 const _tc=tdCreator;tdCreator=function(){let h=_tc.apply(this,arguments);try{const d=tdraft();const mark='<div class="px">'+t('t.o.worn')+'</div>';
   const add='<div class="px">'+t('t.o.mainImg')+'</div>'+thumbs('mainImg',PLM,d.mainImg)+'<div class="px">'+t('t.o.sideImg')+'</div>'+thumbs('sideImg',PLS,d.sideImg);
   const i=h.indexOf(mark);if(i>=0)h=h.slice(0,i)+add+h.slice(i)}catch(e){}return h};
 try{if(typeof document!=='undefined'&&!document.getElementById('plcss')){const s=document.createElement('style');s.id='plcss';s.textContent='.plpick{display:flex;flex-wrap:wrap;gap:6px;max-height:190px;overflow:auto;padding:6px;border:1px solid rgba(128,128,128,.3);border-radius:10px}.plpick .pl-b{width:62px;height:46px;padding:3px;border-radius:8px;border:2px solid transparent;background:rgba(128,128,128,.12);cursor:pointer;display:flex;align-items:center;justify-content:center}.plpick .pl-b.txt{width:auto;padding:0 10px;font-size:13px}.plpick .pl-b.on{border-color:var(--gold,#d4213d);background:rgba(212,33,61,.12)}';document.head.appendChild(s)}}catch(e){}
})();
Object.assign(D,{'t.o.mainImg':['Płytka główna (obrazek)','Main plate (image)'],'t.o.sideImg':['Płytki boczne (obrazek)','Side plates (image)'],'t.o.imgnone':['Klasyczna','Classic']});
if(typeof normTexts==='function')normTexts()
