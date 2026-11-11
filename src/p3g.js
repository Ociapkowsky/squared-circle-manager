
/* ============ Belt graphics, presets, flags ============ */
const BPATS=['plain','stripe','dual','checker','zigzag','diamond','dots','wave','stitch','barbed'];
const BSHAPES=['oval','round','shield','diamond','hex','octagon','star','rect'];
const SSHAPES=['rect','round','diamond','hex','shield'];
const BEMBS=['letter','star','skull','crown','bolt','flag','none'];
const SEMBS=['gem','star','flag','mix','none'];
const FLAGS=['eu','pl','de','fr','it','es','gb','us','jp','br','mx','ca'];
const EUMIX=['pl','de','fr','it','es','gb'];
const BELTKEYS=['strap','strap2','pat','plate','mainShape','mainEmb','flag','sideN','sideShape','sideEmb','worn'];
const BPRESETS={
 euro:{teams:1,prestige:4,strap:'#1f3f8a',strap2:'#f5d130',pat:'dual',plate:'gold',mainShape:'shield',mainEmb:'flag',flag:'eu',sideN:3,sideShape:'rect',sideEmb:'mix',worn:false},
 hardcore:{teams:1,prestige:2,strap:'#1a1a1a',strap2:'#b8b8b8',pat:'barbed',plate:'rust',mainShape:'octagon',mainEmb:'skull',flag:'eu',sideN:1,sideShape:'diamond',sideEmb:'none',worn:true},
 classic:{teams:1,prestige:5,strap:'#8a1c1c',strap2:'#f2c94c',pat:'stripe',plate:'gold',mainShape:'oval',mainEmb:'letter',flag:'eu',sideN:1,sideShape:'rect',sideEmb:'gem',worn:false},
 heritage:{teams:1,prestige:3,strap:'#6b4423',strap2:'#e8c98a',pat:'stitch',plate:'bronze',mainShape:'round',mainEmb:'crown',flag:'eu',sideN:2,sideShape:'rect',sideEmb:'gem',worn:false},
 ultra:{teams:1,prestige:3,strap:'#1a1a1a',strap2:'#13a89e',pat:'zigzag',plate:'blue',mainShape:'hex',mainEmb:'bolt',flag:'eu',sideN:2,sideShape:'hex',sideEmb:'star',worn:false},
 women:{teams:1,prestige:4,g:'f',strap:'#c4358a',strap2:'#ffffff',pat:'wave',plate:'rose',mainShape:'round',mainEmb:'star',flag:'eu',sideN:2,sideShape:'round',sideEmb:'gem',worn:false},
 tag:{teams:2,prestige:3,strap:'#1d6b4f',strap2:'#f2c94c',pat:'checker',plate:'silver',mainShape:'shield',mainEmb:'none',flag:'eu',sideN:1,sideShape:'rect',sideEmb:'gem',worn:false},
 national:{teams:1,prestige:3,strap:'#e8e6df',strap2:'#d4213d',pat:'stripe',plate:'silver',mainShape:'shield',mainEmb:'flag',flag:'pl',sideN:2,sideShape:'round',sideEmb:'flag',worn:false}};
const BPRESET_IDS=Object.keys(BPRESETS);
function flagSvg(id,x,y,w,h){
 const R=(a,b,c,d,f)=>'<rect x="'+(x+a*w).toFixed(2)+'" y="'+(y+b*h).toFixed(2)+'" width="'+(c*w).toFixed(2)+'" height="'+(d*h).toFixed(2)+'" fill="'+f+'"/>';
 const C=(a,b,r,f)=>'<circle cx="'+(x+a*w).toFixed(2)+'" cy="'+(y+b*h).toFixed(2)+'" r="'+Math.max(.4,r).toFixed(2)+'" fill="'+f+'"/>';
 let s='';
 if(id==='eu'){s=R(0,0,1,1,'#1d3f9a');for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=C(.5+Math.cos(a)*.32*h/w,.5+Math.sin(a)*.32,h*.07,'#f5d130')}}
 else if(id==='pl')s=R(0,0,1,.5,'#f2f2f2')+R(0,.5,1,.5,'#d4213d');
 else if(id==='de')s=R(0,0,1,.34,'#111')+R(0,.33,1,.34,'#d00')+R(0,.66,1,.34,'#ffce00');
 else if(id==='fr')s=R(0,0,.34,1,'#1f3fa8')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#d6232c');
 else if(id==='it')s=R(0,0,.34,1,'#169b3f')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#d6232c');
 else if(id==='es')s=R(0,0,1,1,'#c60b1e')+R(0,.25,1,.5,'#ffc400');
 else if(id==='gb')s=R(0,0,1,1,'#1f2f7a')+'<path d="M'+x+','+y+' L'+(x+w)+','+(y+h)+' M'+(x+w)+','+y+' L'+x+','+(y+h)+'" stroke="#fff" stroke-width="'+(h*.22).toFixed(2)+'"/>'+R(0,.38,1,.24,'#fff')+R(.4,0,.2,1,'#fff')+R(0,.44,1,.12,'#c8102e')+R(.44,0,.12,1,'#c8102e');
 else if(id==='us'){for(let i=0;i<7;i++)s+=R(0,i/7,1,1/7,i%2?'#f4f4f4':'#b22234');s+=R(0,0,.45,4/7,'#3c3b6e')}
 else if(id==='jp')s=R(0,0,1,1,'#f4f4f4')+C(.5,.5,h*.3,'#bc002d');
 else if(id==='br')s=R(0,0,1,1,'#119a48')+'<polygon points="'+[[.5,.12],[.9,.5],[.5,.88],[.1,.5]].map(p=>(x+p[0]*w).toFixed(2)+','+(y+p[1]*h).toFixed(2)).join(' ')+'" fill="#fedf00"/>'+C(.5,.5,h*.2,'#1f3f8a');
 else if(id==='mx')s=R(0,0,.34,1,'#006847')+R(.33,0,.34,1,'#f4f4f4')+R(.66,0,.34,1,'#ce1126')+C(.5,.5,h*.12,'#8a5a2b');
 else if(id==='ca')s=R(0,0,.25,1,'#d52b1e')+R(.25,0,.5,1,'#f4f4f4')+R(.75,0,.25,1,'#d52b1e')+C(.5,.5,h*.16,'#d52b1e');
 return s+'<rect x="'+x.toFixed(2)+'" y="'+y.toFixed(2)+'" width="'+w.toFixed(2)+'" height="'+h.toFixed(2)+'" fill="none" stroke="#000" stroke-opacity=".45" stroke-width=".6"/>'}
function shp(k,cx,cy,rx,ry,ex){
 const P=a=>'<polygon points="'+a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+'" '+ex+'/>';
 if(k==='round')return '<circle cx="'+cx+'" cy="'+cy+'" r="'+Math.min(rx,ry).toFixed(1)+'" '+ex+'/>';
 if(k==='rect')return '<rect x="'+(cx-rx).toFixed(1)+'" y="'+(cy-ry*.86).toFixed(1)+'" width="'+(rx*2).toFixed(1)+'" height="'+(ry*1.72).toFixed(1)+'" rx="4" '+ex+'/>';
 if(k==='diamond')return P([[cx,cy-ry],[cx+rx,cy],[cx,cy+ry],[cx-rx,cy]]);
 if(k==='hex')return P([[cx-rx,cy],[cx-rx/2,cy-ry],[cx+rx/2,cy-ry],[cx+rx,cy],[cx+rx/2,cy+ry],[cx-rx/2,cy+ry]]);
 if(k==='octagon'){const a=.42;return P([[cx-rx*a,cy-ry],[cx+rx*a,cy-ry],[cx+rx,cy-ry*a],[cx+rx,cy+ry*a],[cx+rx*a,cy+ry],[cx-rx*a,cy+ry],[cx-rx,cy+ry*a],[cx-rx,cy-ry*a]])}
 if(k==='star'){const pts=[];for(let i=0;i<20;i++){const a=i/20*Math.PI*2-Math.PI/2,m=i%2?.8:1;pts.push([cx+Math.cos(a)*rx*m,cy+Math.sin(a)*ry*m])}return P(pts)}
 if(k==='shield')return '<path d="M'+(cx-rx)+','+(cy-ry*.88)+' L'+(cx+rx)+','+(cy-ry*.88)+' L'+(cx+rx)+','+(cy+ry*.1)+' Q'+(cx+rx)+','+(cy+ry)+' '+cx+','+(cy+ry)+' Q'+(cx-rx)+','+(cy+ry)+' '+(cx-rx)+','+(cy+ry*.1)+' Z" '+ex+'/>';
 return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" '+ex+'/>'}
function strapPat(p,c){
 let s='';
 if(p==='stripe')s='<rect x="0" y="31" width="160" height="4" fill="'+c+'"/>';
 else if(p==='dual')s='<rect x="0" y="22.5" width="160" height="2.5" fill="'+c+'"/><rect x="0" y="41" width="160" height="2.5" fill="'+c+'"/>';
 else if(p==='checker'){for(let i=0;i<40;i++){const o=i%2?4:0;s+='<rect x="'+i*4+'" y="'+(21+o)+'" width="4" height="4" fill="'+c+'"/><rect x="'+i*4+'" y="'+(37+4-o)+'" width="4" height="4" fill="'+c+'"/>'}}
 else if(p==='zigzag'){let d='M0,33';for(let i=0;i<=32;i++)d+=' L'+i*5+','+(i%2?27:39);s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="2" stroke-linejoin="round"/>'}
 else if(p==='diamond'){for(let i=0;i<16;i++)s+='<polygon points="'+(i*10+5)+',27 '+(i*10+10)+',33 '+(i*10+5)+',39 '+(i*10)+',33" fill="'+c+'"/>'}
 else if(p==='dots'){for(let i=0;i<20;i++)s+='<circle cx="'+(i*8+4)+'" cy="'+(i%2?29:37)+'" r="1.8" fill="'+c+'"/>'}
 else if(p==='wave'){let d='M0,33';for(let i=0;i<=40;i++)d+=' L'+i*4+','+(33+Math.sin(i*.9)*5).toFixed(1);s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="2.2"/>'}
 else if(p==='stitch')s='<line x1="0" y1="24" x2="160" y2="24" stroke="'+c+'" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="0" y1="42" x2="160" y2="42" stroke="'+c+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
 else if(p==='barbed'){let d='M0,33';for(let i=0;i<=40;i++)d+=' L'+i*4+','+(33+(i%2?2.5:-2.5));s='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="1.3"/>';for(let i=0;i<16;i++){const x=i*10+5;s+='<path d="M'+(x-3)+',29 L'+(x+3)+',37 M'+(x+3)+',29 L'+(x-3)+',37" stroke="'+c+'" stroke-width="1.1"/>'}}
 return s}
function embSvg(k,cx,cy,sc,pl,tt,nm){
 if(k==='letter')return '<text x="'+cx+'" y="'+(cy+5*sc)+'" text-anchor="middle" font-family="Russo One,Impact,sans-serif" font-size="'+(15*sc).toFixed(1)+'" fill="'+pl[1]+'">'+esc(nm)+'</text>';
 const f='fill="'+pl[1]+'"';
 if(k==='star'){const pts=[];for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=(i%2?4:10)*sc;pts.push((cx+Math.cos(a)*r).toFixed(1)+','+(cy+Math.sin(a)*r+1).toFixed(1))}return '<polygon points="'+pts.join(' ')+'" '+f+'/>'}
 if(k==='skull')return '<circle cx="'+cx+'" cy="'+(cy-1.5*sc)+'" r="'+6.5*sc+'" '+f+'/><rect x="'+(cx-3.5*sc)+'" y="'+(cy+3*sc)+'" width="'+7*sc+'" height="'+4.5*sc+'" '+f+'/><circle cx="'+(cx-2.6*sc)+'" cy="'+(cy-1.5*sc)+'" r="'+1.9*sc+'" fill="'+pl[0]+'"/><circle cx="'+(cx+2.6*sc)+'" cy="'+(cy-1.5*sc)+'" r="'+1.9*sc+'" fill="'+pl[0]+'"/><rect x="'+(cx-1.5*sc)+'" y="'+(cy+4*sc)+'" width="'+sc+'" height="'+2.5*sc+'" fill="'+pl[0]+'"/><rect x="'+(cx+.5*sc)+'" y="'+(cy+4*sc)+'" width="'+sc+'" height="'+2.5*sc+'" fill="'+pl[0]+'"/>';
 if(k==='crown'){const P=[[-8,6],[-8,-4],[-4,1],[0,-7],[4,1],[8,-4],[8,6]].map(p=>(cx+p[0]*sc).toFixed(1)+','+(cy+p[1]*sc).toFixed(1)).join(' ');return '<polygon points="'+P+'" '+f+'/>'}
 if(k==='bolt'){const P=[[2,-10],[-5,1],[-1,1],[-3,10],[5,-2],[1,-2]].map(p=>(cx+p[0]*sc).toFixed(1)+','+(cy+p[1]*sc).toFixed(1)).join(' ');return '<polygon points="'+P+'" '+f+'/>'}
 if(k==='flag')return flagSvg(tt.flag||'eu',cx-11*sc,cy-7*sc,22*sc,14*sc);
 return ''}
function wornSvg(cx,cy,rx,ry){
 const X=(a,b)=>(cx+a*rx).toFixed(1)+','+(cy+b*ry).toFixed(1);
 return '<ellipse cx="'+(cx+rx*.45).toFixed(1)+'" cy="'+(cy-ry*.4).toFixed(1)+'" rx="'+(rx*.24).toFixed(1)+'" ry="'+(ry*.2).toFixed(1)+'" fill="#8a3f14" opacity=".55"/><ellipse cx="'+(cx-rx*.5).toFixed(1)+'" cy="'+(cy+ry*.4).toFixed(1)+'" rx="'+(rx*.2).toFixed(1)+'" ry="'+(ry*.16).toFixed(1)+'" fill="#8a3f14" opacity=".5"/>'+
  '<ellipse cx="'+(cx-rx*.1).toFixed(1)+'" cy="'+(cy+ry*.1).toFixed(1)+'" rx="'+(rx*.3).toFixed(1)+'" ry="'+(ry*.22).toFixed(1)+'" fill="#000" opacity=".16"/>'+
  '<polyline points="'+[X(-.5,-.75),X(-.25,-.25),X(-.42,.1),X(-.1,.5),X(-.22,.86)].join(' ')+'" fill="none" stroke="#1a0f00" stroke-width="1.5" stroke-linejoin="bevel"/>'+
  '<polyline points="'+[X(.62,-.45),X(.34,0),X(.52,.38),X(.4,.7)].join(' ')+'" fill="none" stroke="#1a0f00" stroke-width="1.2" stroke-linejoin="bevel"/>'+
  '<path d="M'+X(.1,-.8)+' L'+X(.3,-.55)+' M'+X(-.7,.1)+' L'+X(-.55,.3)+' M'+X(.2,.6)+' L'+X(.45,.7)+'" stroke="#fff" stroke-opacity=".45" stroke-width=".9"/>'}
function belt(tt,w){
 w=w||160;const st=tt.strap||'#1a1a1a',st2=tt.strap2||'#f2c94c',pl=PLATE[tt.plate]||PLATE.gold,tag=tt.teams===2;
 const ms=tt.mainShape||'oval',ss=tt.sideShape||'rect',sn=tt.sideN==null?1:tt.sideN,me=tt.mainEmb||(tag?'none':'letter'),se=tt.sideEmb||'gem';
 let s='<rect x="0" y="20" width="160" height="26" rx="4" fill="'+st+'"/>'+strapPat(tt.pat||'plain',st2)+'<rect x="0" y="23" width="160" height="2" fill="#fff" opacity=".2"/><rect x="0" y="41" width="160" height="2" fill="#000" opacity=".3"/>';
 const mains=tag?[[54,22,26],[106,22,26]]:[[80,34,30]];
 const left=mains[0][0]-mains[0][1],right=mains[mains.length-1][0]+mains[mains.length-1][1];
 const nm=(titleName(tt).replace(/[^A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż ]/g,'').trim().charAt(0)||'★').toUpperCase();
 if(sn>0)[[-1,left],[1,right]].forEach(([dir,edge])=>{
  const av=dir<0?edge-3:157-edge,gap=2,pw=clamp((av-gap*(sn-1))/sn,6,15),ph=pw<10?26:34;
  for(let i=0;i<sn;i++){const cx=dir<0?edge-3-pw/2-i*(pw+gap):edge+3+pw/2+i*(pw+gap);
   s+=shp(ss,cx,33,pw/2,ph/2,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="1.8"');
   if(se==='gem')s+='<circle cx="'+cx+'" cy="33" r="'+(pw*.26).toFixed(1)+'" fill="'+pl[1]+'"/>';
   else if(se==='star')s+=embSvg('star',cx,33,pw/22,pl,tt,nm);
   else if(se==='flag'||se==='mix'){const id=se==='mix'?EUMIX[(i+(dir>0?3:0))%EUMIX.length]:(tt.flag||'eu');s+=flagSvg(id,cx-pw*.36,33-pw*.26,pw*.72,pw*.52)}}});
 mains.forEach(([cx,rx,ry])=>{
  s+=shp(ms,cx,33,rx,ry,'fill="'+pl[0]+'" stroke="'+pl[1]+'" stroke-width="3"')+shp(ms,cx,33,rx-7,ry-7,'fill="none" stroke="'+pl[1]+'" stroke-width="1.5"');
  s+=embSvg(me,cx,33,tag?.65:1,pl,tt,nm);
  if(tt.worn)s+=wornSvg(cx,33,rx,ry)});
 const p=clamp(Math.round(prestOf(tt)),1,5);
 for(let k=0;k<p;k++){const cx=80+(k-(p-1)/2)*9;s+='<circle cx="'+cx+'" cy="'+(tag?33:50)+'" r="2.8" fill="#d83a3a" stroke="#fff" stroke-width=".7"/>'}
 return '<svg viewBox="0 0 160 66" width="'+w+'" height="'+Math.round(w*66/160)+'" role="img" aria-label="'+esc(titleName(tt))+'">'+s+'</svg>'}
