;/* tournament bracket visual */
(function(){
 Object.assign(D,{'cb.t':['Drabinka turnieju','Tournament bracket']});
 const cut=(s,n)=>{s=String(s||'');return s.length>n?s.slice(0,n-1)+'…':s};
 const bracket=L=>{const R=L.rounds,bw=96,bh=15,gx=22,W=R.length*(bw+gx)+46,n0=R[0].m.length,H=Math.max(110,n0*(bh*2+10)+16);
  let s='',pos=[];
  R.forEach((rd,ri)=>{const cnt=rd.m.length,slot=H/cnt;pos[ri]=[];rd.m.forEach((m,mi)=>{const cy=slot*(mi+.5),x=6+ri*(bw+gx);pos[ri][mi]=cy;
   [[m.a,cy-bh-1],[m.b,cy+1]].forEach(([nm,y])=>{const win=nm===m.w,own=L.own&&nm===L.own;
    s+='<g class="cbn" style="animation-delay:'+(ri*.45+mi*.06).toFixed(2)+'s"><rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="3" fill="'+(win?'#f2c94c':'#2a2a33')+'" stroke="'+(own?'#d83a3a':'#555')+'" stroke-width="'+(own?1.8:.8)+'"/><text x="'+(x+4)+'" y="'+(y+10.5)+'" font-size="8.5" font-weight="'+(win?800:500)+'" fill="'+(win?'#1a1a1a':'#ddd')+'">'+cut(nm,16).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text></g>'});
   if(ri<R.length-1){const nx=x+bw,nm2=Math.floor(mi/2),ty=(H/R[ri+1].m.length)*(nm2+.5);s+='<path class="cbl" style="animation-delay:'+(ri*.45+.3).toFixed(2)+'s" d="M'+nx+' '+cy+' h'+(gx/2)+' V'+ty+' h'+(gx/2)+'" fill="none" stroke="#888" stroke-width="1"/>'}})});
  const lx=6+R.length*(bw+gx)-gx+8,ly=pos[R.length-1][0];
  s+='<g class="cbt" style="animation-delay:'+(R.length*.45+.2).toFixed(2)+'s"><path d="M'+(lx+2)+' '+(ly-12)+'h20v8c0 8-5 12-10 13-5-1-10-5-10-13z" fill="#f2c94c" stroke="#a8841c"/><rect x="'+(lx+9)+'" y="'+(ly+9)+'" width="6" height="6" fill="#a8841c"/><rect x="'+(lx+4)+'" y="'+(ly+15)+'" width="16" height="4" rx="1" fill="#6b4f10"/></g>';
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.round(W*1.6)+'px;background:#16161c;border-radius:10px;padding:6px">'+s+'</svg>'};
 const _v=vCup;vCup=function(){let h=_v.apply(this,arguments);try{const L=cupsEnsure().last;if(L&&L.rounds&&L.rounds.length){const k=h.indexOf('<div class="card stack"><h3>'+esc(cupName({id:L.id})));if(k>=0){const c='<div class="card stack"><h3>🏆 '+esc(cupName({id:L.id}))+' · '+esc(t('cb.t'))+'</h3><div class="scroll">'+bracket(L)+'</div></div>';h=h.slice(0,k)+c+h.slice(k)}}}catch(e){}return h};
 try{const st=document.createElement('style');st.textContent='.cbn,.cbl,.cbt{animation:cbin .5s ease-out both}.cbt{transform-box:fill-box;transform-origin:center;animation:cbtr 1.2s cubic-bezier(.3,1.6,.5,1) both}@keyframes cbin{from{opacity:0}to{opacity:1}}@keyframes cbtr{0%{opacity:0;transform:scale(.2) translateY(14px)}100%{opacity:1;transform:none}}';document.head.appendChild(st)}catch(e){}
})();
if(typeof normTexts==="function")normTexts();
