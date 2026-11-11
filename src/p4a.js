/* ============ Graphics and helpers ============ */
function avatar(l,px){
 l=l||{};px=px||64;const sk=SKIN[(l.skin||0)%SKIN.length],hc=HAIRC[(l.hairC||0)%HAIRC.length],oc=OUTC[(l.outC||0)%OUTC.length],mc=OUTC[(l.maskC||0)%OUTC.length];
 const c2=OUTC[(l.o2==null?((l.outC||0)+3):l.o2)%OUTC.length],bc=l.beardC==null?hc:HAIRC[l.beardC%HAIRC.length];
 const hair=l.hair||'short',beard=l.beard||'none',outfit=l.outfit||'trunks',mask=l.mask||'none',acc=l.acc||'none',gear=l.gear||'none',face=l.face||'none',build=l.build||'std',neck=l.neck||'none';
 let s='';const R=(x,y,w,h,c,o)=>{s+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"'+(o?' opacity="'+o+'"':'')+'/>'};
 const B={std:[4,8,2,12,5,9,2],big:[3,10,1,13,4,9,3],lean:[5,6,3,11,5,9,2],stocky:[4,8,2,12,4,9,3],bulk:[2,12,0,14,4,9,3]}[build]||[4,8,2,12,5,9,2];
 const TX=B[0],TW=B[1],AL=B[2],AR=B[3],LL=B[4],LR=B[5],LW=B[6];
 // hair behind the body
 if(hair==='long'){R(4,3,1,8,hc);R(11,3,1,8,hc)}
 else if(hair==='bob'){R(4,3,1,5,hc);R(11,3,1,5,hc)}
 else if(hair==='pony'){R(11,3,2,1,hc);R(12,4,1,5,hc)}
 else if(hair==='pigtails'){R(2,3,2,5,hc);R(12,3,2,5,hc)}
 else if(hair==='braids'){R(3,3,1,9,hc);R(4,3,1,5,hc);R(11,3,1,5,hc);R(12,3,1,9,hc)}
 else if(hair==='dreads'){R(3,3,1,8,hc);R(4,3,1,6,hc);R(11,3,1,6,hc);R(12,3,1,8,hc)}
 else if(hair==='wavy'||hair==='halfup'||hair==='bangs'){R(3,3,1,7,hc);R(12,3,1,7,hc);R(4,3,1,8,hc);R(11,3,1,8,hc)}
 else if(hair==='mullet'){R(4,3,1,5,hc);R(11,3,1,5,hc);R(3,6,1,3,hc);R(12,6,1,3,hc)}
 // body
 let legC=sk,torC=sk,armC=sk,hipC=oc;
 if(outfit==='singlet'){torC=oc}
 else if(outfit==='pants'){legC=oc}
 else if(outfit==='suit'){legC=oc;torC=oc}
 else if(outfit==='tank'){torC=oc;hipC=c2}
 else if(outfit==='shorts'){}
 else if(outfit==='tights'){legC=oc;hipC=c2}
 else if(outfit==='jacket'){torC=oc;armC=oc;legC=c2;hipC=c2}
 else if(outfit==='vest'){legC=c2;hipC=c2}
 else if(outfit==='gi'){torC=oc;armC=oc;legC=oc;hipC=oc}
 else if(outfit==='stripes'){torC=oc}
 else if(outfit==='armor'){torC=oc;hipC=c2}
 else if(outfit==='tshirt'){torC=oc;hipC=c2}
 else if(outfit==='hoodie'){torC=oc;armC=oc;legC=c2;hipC=c2}
 else if(outfit==='leather'){torC='#1a1a1a';armC='#1a1a1a';legC='#1a1a1a';hipC='#1a1a1a'}
 else if(outfit==='coat'||outfit==='robe'){torC=oc;armC=oc;legC=sk;hipC=oc}
 else if(outfit==='tux'){torC=oc;armC=oc;legC=oc;hipC=oc}
 else if(outfit==='leotard'){torC=oc;hipC=oc}
 else if(outfit==='overalls'){torC=c2;legC=oc;hipC=oc}
 else if(outfit==='kilt'){hipC=oc}
 else if(outfit==='bodysuit'){torC=oc;armC=oc;legC=oc;hipC=c2}
 R(LL,17,LW,5,legC);R(LR,17,LW,5,legC);R(LL,22,LW,1,'#222');R(LR,22,LW,1,'#222');
 R(TX,9,TW,6,torC);R(AL,9,2,6,armC);R(AR,9,2,6,armC);R(TX,14,TW,3,hipC);
 if(outfit==='shorts'){R(LL,17,LW,2,oc);R(LR,17,LW,2,oc)}
 else if(outfit==='tights'){R(LL,17,1,5,c2);R(LR+LW-1,17,1,5,c2)}
 else if(outfit==='jacket'){R(7,9,2,5,sk)}
 else if(outfit==='vest'){R(TX,9,2,5,oc);R(TX+TW-2,9,2,5,oc)}
 else if(outfit==='gi'){R(7,9,2,3,sk);R(TX,14,TW,1,c2)}
 else if(outfit==='stripes'){R(TX,11,TW,1,c2);R(TX,13,TW,1,c2)}
 else if(outfit==='armor'){R(AL-1,9,3,2,c2);R(AR,9,3,2,c2);R(7,9,2,2,c2)}
 else if(outfit==='tshirt'){R(AL,9,2,2,oc);R(AR,9,2,2,oc)}
 else if(outfit==='hoodie'){R(6,9,4,1,c2);R(7,12,2,2,c2,.6)}
 else if(outfit==='leather'){R(TX,11,TW,1,c2);R(7,9,2,5,sk,.5);R(AL,10,1,1,'#c4c4c4');R(AR+1,10,1,1,'#c4c4c4')}
 else if(outfit==='coat'){R(TX,17,TW,4,oc);R(7,9,2,12,c2)}
 else if(outfit==='robe'){R(TX,17,TW,5,oc);R(7,9,2,13,c2);R(TX,14,TW,1,c2)}
 else if(outfit==='tux'){R(7,9,2,4,'#f5f5f5');R(7,13,2,1,'#111')}
 else if(outfit==='overalls'){R(TX+1,9,1,6,oc);R(TX+TW-2,9,1,6,oc);R(6,12,4,2,oc)}
 else if(outfit==='kilt'){R(TX,17,TW,3,oc);R(TX,18,TW,1,c2);R(7,17,1,3,c2)}
 else if(outfit==='bodysuit'){R(TX,11,TW,1,c2);R(LL,17,1,5,c2)}
 // head
 R(5,3,6,6,sk);
 // gear
 if(gear==='kneepads'||gear==='pads'){R(LL,19,LW,1,c2);R(LR,19,LW,1,c2)}
 if(gear==='wristbands'||gear==='pads'){R(AL,13,2,1,c2);R(AR,13,2,1,c2)}
 if(gear==='tape'){R(AL,14,2,1,'#e8e6df');R(AR,14,2,1,'#e8e6df');R(AL,12,2,1,'#e8e6df');R(AR,12,2,1,'#e8e6df')}
 if(gear==='chain'){R(6,9,4,1,'#c4c4c4');R(7,10,2,1,'#c4c4c4')}
 if(gear==='tattoo'){R(AL,10,2,1,'#2a2a2a');R(AL,12,2,1,'#2a2a2a');R(AR,11,2,1,'#2a2a2a');R(AR,13,2,1,'#2a2a2a')}
 if(gear==='gloves'){R(AL,14,2,2,c2);R(AR,14,2,2,c2)}
 if(gear==='elbow'){R(AL,11,2,1,c2);R(AR,11,2,1,c2)}
 if(gear==='boots'){R(LL,20,LW,2,c2);R(LR,20,LW,2,c2)}
 if(neck==='scarf'){R(5,8,6,1,c2);R(9,9,1,3,c2)}
 else if(neck==='bowtie'){R(6,9,1,1,c2);R(9,9,1,1,c2);R(7,9,2,1,'#111')}
 else if(neck==='towel'){R(4,8,8,2,'#f5f5f5')}
 else if(neck==='belt'){R(4,9,2,1,'#6b4423');R(5,10,2,1,'#6b4423');R(6,11,2,1,'#6b4423');R(7,12,3,2,'#f2c94c');R(8,12,1,1,'#fff')}
 else if(neck==='tie'){R(7,9,2,1,c2);R(7,10,2,3,c2)}
 if(gear==='armband'){R(AL,10,2,1,'#f2c94c');R(AR,10,2,1,'#f2c94c')}
 // hair on top
 if(hair==='short'||hair==='side'||hair==='slick'||hair==='mullet'||hair==='bun'||hair==='pigtails'||hair==='braids'||hair==='dreads'){R(5,2,6,2,hc);R(4,3,1,2,hc);R(11,3,1,2,hc)}
 if(hair==='side')R(7,2,1,1,sk,.5);
 if(hair==='slick'){R(4,2,1,4,hc);R(11,2,1,4,hc)}
 if(hair==='bun')R(7,0,2,2,hc);
 if(hair==='buzz'){R(5,2,6,1,hc);R(4,3,1,1,hc,.6);R(11,3,1,1,hc,.6)}
 if(hair==='crop'){R(5,1,6,2,hc);R(4,2,1,3,hc);R(11,2,1,3,hc)}
 if(hair==='pompadour'){R(5,0,6,3,hc);R(4,1,1,3,hc);R(11,1,1,3,hc)}
 if(hair==='spiky'){R(5,2,6,1,hc);R(5,0,1,2,hc);R(7,0,1,2,hc);R(9,0,1,2,hc);R(10,1,1,1,hc)}
 if(hair==='fauxhawk'){R(6,1,4,2,hc);R(7,0,2,1,hc);R(5,3,1,1,hc);R(10,3,1,1,hc)}
 if(hair==='mohawk'){R(7,0,2,3,hc);R(6,3,4,1,hc)}
 if(hair==='curly'){R(4,1,8,3,hc);R(3,2,1,3,hc);R(12,2,1,3,hc);R(4,4,1,2,hc);R(11,4,1,2,hc)}
 if(hair==='afro'){R(4,1,8,4,hc);R(3,2,1,3,hc);R(12,2,1,3,hc)}
 if(hair==='long'||hair==='bob'||hair==='pony'||hair==='wavy'||hair==='halfup'){R(5,2,6,2,hc)}
 if(hair==='shaggy'){R(4,1,8,3,hc);R(4,3,1,4,hc);R(11,3,1,4,hc)}
 if(hair==='undercut'){R(5,2,6,1,hc,.5);R(6,0,4,2,hc)}
 if(hair==='topknot'){R(5,2,6,1,hc,.5);R(7,0,2,2,hc)}
 if(hair==='flattop'){R(5,0,6,3,hc);R(4,2,1,2,hc,.6);R(11,2,1,2,hc,.6)}
 if(hair==='bangs'){R(5,2,6,3,hc)}
 if(hair==='cornrows'){R(5,2,6,1,hc);R(5,1,1,2,hc);R(7,1,1,2,hc);R(9,1,1,2,hc);R(10,1,1,1,hc)}
 if(hair==='halfup'){R(7,0,2,2,hc)}
 // beard
 if(beard==='stubble')R(5,7,6,2,bc,.4);
 else if(beard==='heavy')R(5,6,6,3,bc,.55);
 else if(beard==='full')R(5,7,6,3,bc);
 else if(beard==='mustache')R(6,7,4,1,bc);
 else if(beard==='handlebar'){R(5,7,6,1,bc);R(5,8,1,1,bc);R(10,8,1,1,bc)}
 else if(beard==='goatee')R(7,8,2,2,bc);
 else if(beard==='soulpatch')R(7,8,2,1,bc);
 else if(beard==='chinstrap'){R(5,8,1,2,bc);R(10,8,1,2,bc);R(5,9,6,1,bc)}
 else if(beard==='vandyke'){R(6,7,4,1,bc);R(7,8,2,3,bc)}
 else if(beard==='mutton'){R(4,5,1,4,bc);R(11,5,1,4,bc);R(5,7,1,2,bc);R(10,7,1,2,bc);R(6,7,4,1,bc)}
 else if(beard==='sideburns'){R(4,5,1,3,bc);R(11,5,1,3,bc)}
 else if(beard==='long'){R(5,7,6,3,bc);R(6,10,4,2,bc)}
 else if(beard==='anchor'){R(6,7,4,1,bc);R(7,8,2,1,bc);R(5,9,6,1,bc)}
 else if(beard==='circle'){R(6,7,4,1,bc);R(6,8,1,2,bc);R(9,8,1,2,bc);R(7,9,2,1,bc)}
 else if(beard==='bushy'){R(4,6,8,4,bc)}
 else if(beard==='patchy'){R(5,7,1,1,bc,.8);R(7,8,1,1,bc,.8);R(9,7,1,1,bc,.8);R(10,8,1,1,bc,.8);R(6,9,1,1,bc,.8)}
 // face extras
 if(face==='scar')R(9,4,1,3,'#b04a4a');
 else if(face==='freckles'){R(6,6,1,1,'#8a5a2b',.7);R(9,6,1,1,'#8a5a2b',.7);R(7,6,1,1,'#8a5a2b',.5);R(10,6,1,1,'#8a5a2b',.5)}
 else if(face==='stripe')R(5,5,6,1,c2,.85);
 else if(face==='bruise')R(5,6,2,2,'#7a4a8a',.6);
 else if(face==='lipstick')R(7,8,2,1,'#c2185b');
 else if(face==='eyeliner'){R(6,4,1,1,'#111');R(9,4,1,1,'#111');R(5,5,1,1,'#111',.7);R(10,5,1,1,'#111',.7)}
 else if(face==='warpaint'){R(5,5,6,1,'#fff',.9);R(5,6,1,2,'#fff',.9);R(10,6,1,2,'#fff',.9)}
 else if(face==='bandage'){R(8,3,3,2,'#f5f5f5');R(9,3,1,2,'#d33',.6)}
 else if(face==='tears'){R(6,6,1,2,'#38bdf8',.8);R(9,6,1,2,'#38bdf8',.8)}
 // mask
 if(mask==='full'){R(5,3,6,6,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(7,7,2,1,sk)}
 else if(mask==='half'){R(5,3,6,3,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='domino'){R(5,4,6,2,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='bandana'){R(5,7,6,2,mc)}
 else if(mask==='paint'){R(5,3,3,6,mc,.9)}
 else if(mask==='hood'){R(4,2,8,2,mc);R(4,4,1,5,mc);R(11,4,1,5,mc)}
 else if(mask==='skull'){R(5,3,6,6,'#eee');R(6,5,1,2,'#111');R(9,5,1,2,'#111');R(6,8,4,1,'#111');R(7,7,1,1,'#111');R(9,7,1,1,'#111')}
 else if(mask==='cat'){R(5,3,6,6,mc);R(5,2,1,1,mc);R(10,2,1,1,mc);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(7,7,2,1,'#111')}
 else if(mask==='oni'){R(5,3,6,6,mc);R(5,1,1,2,'#fff');R(10,1,1,2,'#fff');R(6,5,1,1,'#fff');R(9,5,1,1,'#fff');R(6,8,4,1,'#fff')}
 else if(mask==='stripe'){R(5,3,6,6,mc);R(7,3,2,6,c2);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 else if(mask==='wings'){R(5,3,6,6,mc);R(3,3,2,3,c2);R(11,3,2,3,c2);R(6,5,1,1,'#fff');R(9,5,1,1,'#fff')}
 // eyes
 if(face==='eyepatch'){R(6,4,2,2,'#111');R(5,3,6,1,'#111');R(9,5,1,1,'#1a1a1a')}
 else if(mask==='none'||mask==='bandana'||mask==='paint'||mask==='hood'){R(6,5,1,1,'#1a1a1a');R(9,5,1,1,'#1a1a1a')}
 // head accessories
 if(acc==='headband')R(5,3,6,1,c2);
 else if(acc==='cap'){R(4,2,8,2,oc);R(10,3,3,1,oc)}
 else if(acc==='backcap'){R(4,2,8,2,oc);R(3,3,2,1,oc)}
 else if(acc==='bandana'){R(4,2,8,2,c2);R(11,3,2,1,c2)}
 else if(acc==='shades'){R(5,5,3,1,'#111');R(8,5,3,1,'#111');R(5,4,6,1,'#111',.0)}
 else if(acc==='glasses'){R(5,4,3,1,'#333');R(5,6,3,1,'#333');R(5,4,1,3,'#333');R(7,4,1,3,'#333');R(8,4,3,1,'#333');R(8,6,3,1,'#333');R(8,4,1,3,'#333');R(10,4,1,3,'#333')}
 else if(acc==='crown'){R(5,1,6,2,'#f2c94c');R(5,0,1,1,'#f2c94c');R(7,0,1,1,'#f2c94c');R(9,0,1,1,'#f2c94c');R(10,0,1,1,'#f2c94c')}
 else if(acc==='cowboy'){R(3,2,10,1,'#6b3a1f');R(5,0,6,2,'#6b3a1f')}
 else if(acc==='beanie'){R(4,2,8,2,oc);R(5,1,6,1,oc)}
 else if(acc==='fedora'){R(3,2,10,1,'#2a2a2a');R(5,0,6,2,'#2a2a2a');R(5,1,6,1,c2)}
 else if(acc==='visor'){R(4,2,8,1,oc);R(9,3,4,1,oc)}
 else if(acc==='tiara'){R(5,1,6,1,'#c0c0c0');R(7,0,2,1,'#c0c0c0')}
 else if(acc==='flowers'){R(4,2,8,1,'#ec4899');R(5,1,1,1,'#fde047');R(8,1,1,1,'#fb7185');R(10,1,1,1,'#fde047')}
 else if(acc==='earrings'){R(4,7,1,1,'#f2c94c');R(11,7,1,1,'#f2c94c')}
 return '<svg viewBox="0 0 16 23" width="'+Math.round(px*16/23)+'" height="'+px+'" shape-rendering="crispEdges" aria-hidden="true">'+s+'</svg>';
}
function openModal(html){if(!hasDoc)return;const m=document.getElementById('modal');m.innerHTML='<div class="mbox" role="dialog" aria-modal="true">'+html+'</div>';m.hidden=false}
function closeModal(){if(!hasDoc)return;const m=document.getElementById('modal');m.hidden=true;m.innerHTML=''}
const bar=(v,cls)=>'<div class="bar '+(cls||'')+'"><i style="width:'+clamp(v,0,100)+'%"></i></div>';
const stat=(l,v,cls)=>'<div><div class="lbl"><span>'+l+'</span><span>'+Math.round(v)+'</span></div>'+bar(v,cls)+'</div>';
function spark(arr,w,h,col){
 if(arr.length<2)return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'"></svg>';
 const mn=Math.min.apply(null,arr),mx=Math.max.apply(null,arr),rg=(mx-mn)||1,p=4;
 const pts=arr.map((v,i)=>[p+i*(w-2*p)/(arr.length-1),h-p-(v-mn)/rg*(h-2*p)]);
 const line=pts.map(x=>x[0].toFixed(1)+','+x[1].toFixed(1)).join(' ');
 const area='M'+pts[0][0]+','+(h-p)+' L'+line.split(' ').join(' L')+' L'+pts[pts.length-1][0]+','+(h-p)+' Z';const last=pts[pts.length-1];
 return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'" preserveAspectRatio="none" role="img"><path d="'+area+'" fill="'+col+'" opacity=".16"/><polyline points="'+line+'" fill="none" stroke="'+col+'" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="'+last[0]+'" cy="'+last[1]+'" r="3.5" fill="'+col+'"/></svg>';
}
function gauge(v,col){
 const r=34,c=2*Math.PI*r,d=c*clamp(v,0,100)/100;
 return '<svg viewBox="0 0 90 90" width="84" height="84" role="img" aria-label="'+Math.round(v)+'/100"><circle cx="45" cy="45" r="'+r+'" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="45" cy="45" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="9" stroke-dasharray="'+d.toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 45 45)"/><text x="45" y="51" text-anchor="middle" font-family="var(--font-d)" font-size="22" fill="var(--fg)">'+Math.round(v)+'</text></svg>';
}
const cn=c=>t('cn.'+c);
function wMini(w,extra){return '<div class="row" style="flex-wrap:nowrap;gap:8px"><div class="av" style="min-width:40px;padding:3px">'+avatar(w.look,38)+'</div><div style="min-width:0"><div class="wname" style="font-size:14px">'+esc(w.name)+'</div><div class="mute" style="font-size:12px">'+(extra||'')+'</div></div></div>'}
function langSwitch(){return '<div class="row" role="group" aria-label="'+t('s.lang')+'"><button class="btn sm thm" data-act="theme" title="'+t('s.theme')+'" aria-label="'+t('s.theme')+'">'+themeIcon()+'</button><button class="btn sm'+(lang==='pl'?' gold':'')+'" data-act="lang" data-v="pl">PL</button><button class="btn sm'+(lang==='en'?' gold':'')+'" data-act="lang" data-v="en">EN</button></div>'}
function newsList(n){if(!G.news.length)return '<p class="mute">'+t('d.none')+'</p>';return '<ul class="news">'+G.news.slice(0,n).map(x=>'<li><span class="w">W'+x.w+'</span><span>'+esc(t(x.k,x.v))+'</span></li>').join('')+'</ul>'}
function histChart(){
 const H=G.hist.slice(-12);if(!H.length)return '<p class="mute">'+t('d.none')+'</p>';
 const w=520,h=170,pl=44,pb=22,pt=10;const mx=Math.max.apply(null,H.map(x=>Math.max(x.rev,x.cost)))||1;const bw=(w-pl)/H.length;let s='';
 [0,.5,1].forEach(g=>{const y=pt+(h-pt-pb)*(1-g);s+='<line x1="'+pl+'" x2="'+w+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-width="1"/><text x="'+(pl-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="10" fill="var(--mute)">'+money(mx*g)+'</text>'});
 H.forEach((x,i)=>{const x0=pl+i*bw+bw*.12,bwid=bw*.36;const hr=(h-pt-pb)*x.rev/mx,hc=(h-pt-pb)*x.cost/mx;s+='<rect x="'+x0+'" y="'+(h-pb-hr)+'" width="'+bwid+'" height="'+hr+'" fill="var(--teal)"/><rect x="'+(x0+bwid+1)+'" y="'+(h-pb-hc)+'" width="'+bwid+'" height="'+hc+'" fill="var(--red)"/><text x="'+(x0+bwid)+'" y="'+(h-6)+'" text-anchor="middle" font-size="10" fill="var(--mute)">'+x.week+'</text>'});
 return '<div class="scroll"><svg viewBox="0 0 '+w+' '+h+'" width="100%" style="min-width:420px" role="img" aria-label="'+t('m.hist')+'">'+s+'</svg></div><div class="row mute" style="font-size:12px"><span><span class="dot" style="background:var(--teal)"></span>'+t('m.income')+'</span><span><span class="dot" style="background:var(--red)"></span>'+t('m.costs')+'</span></div>';
}
function avEditor(id){
 const w=W(id);const l=w.look;
 const sw=(k,arr,cur)=>'<div class="sw">'+arr.map((c,i)=>'<button style="background:'+c+'" class="'+(cur===i?'on':'')+'" data-act="look" data-id="'+id+'" data-k="'+k+'" data-v="'+i+'" aria-label="'+k+' '+(i+1)+'"></button>').join('')+'</div>';
 const tx=(k,arr,cur,pfx)=>'<div class="sw">'+arr.map(v=>'<button class="txt'+(cur===v?' on':'')+'" data-act="look" data-id="'+id+'" data-k="'+k+'" data-v="'+v+'">'+t(pfx+'.'+v)+'</button>').join('')+'</div>';
 return '<div class="row spread"><h2>'+t('av.title')+'</h2><button class="btn gold" data-act="avclose">'+t('av.close')+'</button></div><div class="row" style="align-items:flex-start;flex-wrap:nowrap"><div class="av" style="padding:10px">'+avatar(l,150)+'</div><div class="stack" style="gap:8px;min-width:0"><b>'+esc(w.name)+'</b><button class="btn sm" data-act="avrand" data-id="'+id+'">'+t('av.random')+'</button></div></div>'+
  '<div class="px">'+t('av.build')+'</div>'+tx('build',BUILDS,l.build||'std','bld')+'<div class="px">'+t('av.skin')+'</div>'+sw('skin',SKIN,l.skin)+'<div class="px">'+t('av.hair')+'</div>'+tx('hair',HAIRS,l.hair,'hs')+'<div class="px">'+t('av.hairc')+'</div>'+sw('hairC',HAIRC,l.hairC)+
  '<div class="px">'+t('av.beard')+'</div>'+tx('beard',BEARDS,l.beard||'none','bd')+'<div class="px">'+t('av.beardc')+'</div>'+sw('beardC',HAIRC,l.beardC==null?l.hairC:l.beardC)+
  '<div class="px">'+t('av.outfit')+'</div>'+tx('outfit',OUTFITS,l.outfit,'of')+'<div class="px">'+t('av.outc')+'</div>'+sw('outC',OUTC,l.outC)+'<div class="px">'+t('av.o2')+'</div>'+sw('o2',OUTC,l.o2==null?((l.outC||0)+3)%OUTC.length:l.o2)+
  '<div class="px">'+t('av.acc')+'</div>'+tx('acc',ACCS,l.acc||'none','acc')+'<div class="px">'+t('av.neck')+'</div>'+tx('neck',NECKS,l.neck||'none','nk')+'<div class="px">'+t('av.gear')+'</div>'+tx('gear',GEARS,l.gear||'none','gear')+'<div class="px">'+t('av.face')+'</div>'+tx('face',FACES,l.face||'none','face')+
  '<div class="px">'+t('av.mask')+'</div>'+tx('mask',MASKS,l.mask||'none','mk')+'<div class="px">'+t('av.maskc')+'</div>'+sw('maskC',OUTC,l.maskC);
}

