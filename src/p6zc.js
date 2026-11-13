;/* ===== Many more vector belt-plate shapes (coloured like the rest) + shape icons in the designer ===== */
(function(){
const NEW=[
 ['pill','Pigułka','Pill'],['wide','Szeroki owal','Wide oval'],['tall','Wysoki owal','Tall oval'],['chamfer','Ścięty prostokąt','Chamfered rectangle'],['arch','Łuk','Arch'],
 ['crest','Herb','Crest'],['pointed','Tarcza szpic','Pointed shield'],['pentagon','Pięciokąt','Pentagon'],['heptagon','Siedmiokąt','Heptagon'],['decagon','Dziesięciokąt','Decagon'],['dodeca','Dwunastokąt','Dodecagon'],
 ['burst','Eksplozja','Burst'],['sun','Słońce','Sun'],['gear','Zębatka','Gear'],['scallop','Falbana','Scallop'],['flower','Kwiat','Flower'],['clover','Koniczyna','Clover'],
 ['cross','Krzyż','Cross'],['maltese','Krzyż maltański','Maltese cross'],['wings','Skrzydła','Wings'],['crown','Korona','Crown'],['kite','Latawiec','Kite'],['trap','Trapez','Trapezoid'],
 ['para','Równoległobok','Parallelogram'],['lens','Soczewka','Lens'],['hexv','Sześciokąt pionowy','Pointy hexagon'],['hexw','Wydłużony sześciokąt','Long hexagon'],['homep','Baza','Home plate'],['ornate','Ozdobny','Ornate'],['diamw','Szeroki romb','Wide diamond']];
const D2={};NEW.forEach(([k,pl,en])=>{D2['bsh.'+k]=[pl,en]});Object.assign(D,D2);
const SIDE=['pill','chamfer','arch','pentagon','burst','gear','cross','scallop','flower','kite','pointed','crest','star','lens','hexv','maltese','octagon','diamw','tall','trap'];
NEW.forEach(([k])=>{if(BSHAPES.indexOf(k)<0)BSHAPES.push(k)});SIDE.forEach(k=>{if(SSHAPES.indexOf(k)<0)SSHAPES.push(k)});
const rp=(cx,cy,rx,ry,n,rot)=>{const o=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2+(rot==null?-Math.PI/2:rot);o.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry])}return o};
const rad=(cx,cy,rx,ry,n,f)=>{const o=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2-Math.PI/2,m=f(a,i);o.push([cx+Math.cos(a)*rx*m,cy+Math.sin(a)*ry*m])}return o};
const _shp=shp;shp=function(k,cx,cy,rx,ry,ex){
 const P=a=>'<polygon points="'+a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+'" stroke-linejoin="round" '+ex+'/>';
 const R=(x,y,w,h,r)=>'<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+r.toFixed(1)+'" '+ex+'/>';
 const Pa=d=>'<path d="'+d+'" stroke-linejoin="round" '+ex+'/>';
 const f=n=>n.toFixed(1);
 switch(k){
  case 'pill':return R(cx-rx,cy-ry*.62,rx*2,ry*1.24,ry*.62);
  case 'wide':return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+f(rx)+'" ry="'+f(ry*.72)+'" '+ex+'/>';
  case 'tall':return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+f(rx*.76)+'" ry="'+f(ry)+'" '+ex+'/>';
  case 'chamfer':{const a=.28;return P([[cx-rx*(1-a),cy-ry],[cx+rx*(1-a),cy-ry],[cx+rx,cy-ry*(1-a*1.4)],[cx+rx,cy+ry*(1-a*1.4)],[cx+rx*(1-a),cy+ry],[cx-rx*(1-a),cy+ry],[cx-rx,cy+ry*(1-a*1.4)],[cx-rx,cy-ry*(1-a*1.4)]])}
  case 'arch':return Pa('M'+f(cx-rx)+','+f(cy+ry*.9)+' L'+f(cx-rx)+','+f(cy-ry*.1)+' A'+f(rx)+','+f(ry*.9)+' 0 0 1 '+f(cx+rx)+','+f(cy-ry*.1)+' L'+f(cx+rx)+','+f(cy+ry*.9)+' Z');
  case 'crest':return Pa('M'+f(cx-rx)+','+f(cy-ry*.85)+' Q'+f(cx-rx*.45)+','+f(cy-ry*.55)+' '+f(cx)+','+f(cy-ry*.9)+' Q'+f(cx+rx*.45)+','+f(cy-ry*.55)+' '+f(cx+rx)+','+f(cy-ry*.85)+' L'+f(cx+rx)+','+f(cy+ry*.05)+' Q'+f(cx+rx)+','+f(cy+ry*.7)+' '+f(cx)+','+f(cy+ry)+' Q'+f(cx-rx)+','+f(cy+ry*.7)+' '+f(cx-rx)+','+f(cy+ry*.05)+' Z');
  case 'pointed':return P([[cx-rx,cy-ry*.9],[cx+rx,cy-ry*.9],[cx+rx,cy+ry*.1],[cx,cy+ry],[cx-rx,cy+ry*.1]]);
  case 'pentagon':return P(rp(cx,cy+ry*.05,rx,ry,5));
  case 'heptagon':return P(rp(cx,cy,rx,ry,7));
  case 'decagon':return P(rp(cx,cy,rx,ry,10));
  case 'dodeca':return P(rp(cx,cy,rx,ry,12,Math.PI/12));
  case 'burst':return P(rad(cx,cy,rx,ry,32,(a,i)=>i%2?.76:1));
  case 'sun':return P(rad(cx,cy,rx,ry,56,(a,i)=>i%2?.9:1));
  case 'gear':{const o=[];const n=12;for(let i=0;i<n;i++){const a0=i/n*Math.PI*2-Math.PI/2,w=Math.PI*2/n;[[0,.82],[.18,.82],[.28,1],[.62,1],[.72,.82],[.9,.82]].forEach(([u,m])=>{const a=a0+u*w;o.push([cx+Math.cos(a)*rx*m,cy+Math.sin(a)*ry*m])})}return P(o)}
  case 'scallop':return P(rad(cx,cy,rx,ry,72,a=>.94+.06*Math.cos(a*12)));
  case 'flower':return P(rad(cx,cy,rx,ry,72,a=>.8+.2*Math.cos(a*6)));
  case 'clover':return P(rad(cx,cy,rx,ry,72,a=>.62+.38*Math.abs(Math.cos(a*2))));
  case 'cross':{const w=.36;return P([[cx-rx*w,cy-ry],[cx+rx*w,cy-ry],[cx+rx*w,cy-ry*w],[cx+rx,cy-ry*w],[cx+rx,cy+ry*w],[cx+rx*w,cy+ry*w],[cx+rx*w,cy+ry],[cx-rx*w,cy+ry],[cx-rx*w,cy+ry*w],[cx-rx,cy+ry*w],[cx-rx,cy-ry*w],[cx-rx*w,cy-ry*w]])}
  case 'maltese':return P([[cx-rx*.3,cy-ry],[cx+rx*.3,cy-ry],[cx+rx*.22,cy-ry*.22],[cx+rx,cy-ry*.3],[cx+rx,cy+ry*.3],[cx+rx*.22,cy+ry*.22],[cx+rx*.3,cy+ry],[cx-rx*.3,cy+ry],[cx-rx*.22,cy+ry*.22],[cx-rx,cy+ry*.3],[cx-rx,cy-ry*.3],[cx-rx*.22,cy-ry*.22]]);
  case 'wings':return P([[cx-rx,cy-ry*.7],[cx-rx*.55,cy-ry*.55],[cx-rx*.3,cy-ry],[cx+rx*.3,cy-ry],[cx+rx*.55,cy-ry*.55],[cx+rx,cy-ry*.7],[cx+rx*.85,cy],[cx+rx,cy+ry*.55],[cx+rx*.5,cy+ry*.5],[cx+rx*.28,cy+ry],[cx-rx*.28,cy+ry],[cx-rx*.5,cy+ry*.5],[cx-rx,cy+ry*.55],[cx-rx*.85,cy]]);
  case 'crown':return P([[cx-rx,cy+ry*.85],[cx-rx,cy-ry*.6],[cx-rx*.5,cy-ry*.05],[cx,cy-ry],[cx+rx*.5,cy-ry*.05],[cx+rx,cy-ry*.6],[cx+rx,cy+ry*.85]]);
  case 'kite':return P([[cx,cy-ry],[cx+rx,cy-ry*.1],[cx,cy+ry],[cx-rx,cy-ry*.1]]);
  case 'trap':return P([[cx-rx*.68,cy-ry*.9],[cx+rx*.68,cy-ry*.9],[cx+rx,cy+ry*.9],[cx-rx,cy+ry*.9]]);
  case 'para':return P([[cx-rx*.7,cy-ry*.85],[cx+rx,cy-ry*.85],[cx+rx*.7,cy+ry*.85],[cx-rx,cy+ry*.85]]);
  case 'lens':return Pa('M'+f(cx-rx)+','+f(cy)+' Q'+f(cx)+','+f(cy-ry*1.9)+' '+f(cx+rx)+','+f(cy)+' Q'+f(cx)+','+f(cy+ry*1.9)+' '+f(cx-rx)+','+f(cy)+' Z');
  case 'hexv':return P(rp(cx,cy,rx,ry,6));
  case 'hexw':return P([[cx-rx,cy],[cx-rx*.6,cy-ry*.8],[cx+rx*.6,cy-ry*.8],[cx+rx,cy],[cx+rx*.6,cy+ry*.8],[cx-rx*.6,cy+ry*.8]]);
  case 'homep':return P([[cx-rx,cy-ry*.85],[cx+rx,cy-ry*.85],[cx+rx,cy+ry*.1],[cx,cy+ry],[cx-rx,cy+ry*.1]].map(p=>[p[0],p[1]]));
  case 'ornate':{const c=.3;return Pa('M'+f(cx-rx*(1-c))+','+f(cy-ry)+' L'+f(cx+rx*(1-c))+','+f(cy-ry)+' Q'+f(cx+rx*(1-c))+','+f(cy-ry*(1-c))+' '+f(cx+rx)+','+f(cy-ry*(1-c))+' L'+f(cx+rx)+','+f(cy+ry*(1-c))+' Q'+f(cx+rx*(1-c))+','+f(cy+ry*(1-c))+' '+f(cx+rx*(1-c))+','+f(cy+ry)+' L'+f(cx-rx*(1-c))+','+f(cy+ry)+' Q'+f(cx-rx*(1-c))+','+f(cy+ry*(1-c))+' '+f(cx-rx)+','+f(cy+ry*(1-c))+' L'+f(cx-rx)+','+f(cy-ry*(1-c))+' Q'+f(cx-rx*(1-c))+','+f(cy-ry*(1-c))+' '+f(cx-rx*(1-c))+','+f(cy-ry)+' Z')}
  case 'diamw':return P([[cx,cy-ry*.8],[cx+rx,cy],[cx,cy+ry*.8],[cx-rx,cy]]);
 }
 return _shp.apply(this,arguments)};
/* shape icons in the designer: show the real shape in the current plate colours */
const _tc3=tdCreator;tdCreator=function(){let h=_tc3.apply(this,arguments);try{const d=tdraft(),pl=PLATE[d.plate]||PLATE.gold;
  ['mainShape','sideShape'].forEach(k=>{const re=new RegExp('<button class="txt( on)?" data-act="tdset" data-k="'+k+'" data-v="([a-z0-9]+)">([^<]*)</button>','g');
   h=h.replace(re,(m,on,v,lab)=>'<button class="pl-b shp'+(on||'')+'" data-act="tdset" data-k="'+k+'" data-v="'+v+'" title="'+lab+'" aria-label="'+lab+'"><svg viewBox="0 0 44 32" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">'+shp(v,22,16,k==='sideShape'?9:17,k==='sideShape'?13:13,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="2"')+'</svg></button>')})}catch(e){}return h};
})();
if(typeof normTexts==="function")normTexts();
