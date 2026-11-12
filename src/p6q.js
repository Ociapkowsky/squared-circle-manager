;/* ===== Gimmick type chart: some gimmicks counter others (Pokemon-style) -> match rating ===== */
(function(){
const BEAT={monster:['comedian','prodigy','technician'],underdog:['monster','enforcer','legend'],coward:['patriot','veteran','showman'],veteran:['prodigy','cult','sadist'],mask:['technician','showman','menace'],patriot:['menace','cult','sadist'],menace:['patriot','comedian','enforcer'],comedian:['coward','enforcer','cult'],rebel:['legend','enforcer','coward'],sadist:['underdog','prodigy','mask'],prodigy:['legend','technician','mask'],showman:['rebel','sadist','enforcer'],technician:['monster','showman','sadist'],cult:['prodigy','underdog','rebel'],legend:['menace','cult','coward'],enforcer:['comedian','mask','rebel']};
const WHY={ // short reason per directed pair (pl/en) for a few classics, fallback generic
 'underdog>monster':['Kopciuszek kontra potwór: klasyczny Dawid i Goliat.','Underdog vs monster: classic David and Goliath.'],
 'technician>monster':['Technika przechytrza siłę.','Technique outsmarts brute strength.'],
 'patriot>menace':['Lokalny bohater kontra obcy najeźdźca: publiczność szaleje.','Local hero vs foreign menace: the crowd goes wild.'],
 'menace>patriot':['Najeźdźca wkurza lokalną publiczność: świetny heat.','The invader angers the home crowd: great heat.'],
 'veteran>prodigy':['Stary wyjadacz uczy młodego pokory.','The veteran teaches the kid humility.'],
 'prodigy>legend':['Zmiana warty: młody kontra legenda.','Passing of the torch: young vs legend.'],
 'rebel>legend':['Buntownik rzuca wyzwanie legendzie.','A rebel challenges the legend.'],
 'coward>veteran':['Tchórz gra nieczysto i zaskakuje weterana.','The coward cheats and surprises the veteran.']};
Object.assign(D,{'gx.title':['Mapa starć gimmicków','Gimmick matchup chart'],'gx.sub':['Jak w grach z typami: niektóre postaci świetnie pasują przeciw sobie (kontra) i dają wyższą ocenę walki. Pełny bonus tylko dla dobrze dopasowanych i rozwiniętych gimmicków. Logiczny zwycięzca (ten, kto kontruje) dostaje jeszcze trochę. Dwóch takich samych gimmicków to nuda.','Like type matchups in monster games: some characters play great against each other (a counter) and raise the match rating. Full bonus needs well-fitting, developed gimmicks. The logical winner (the one who counters) adds a little. Two of the same gimmick is dull.'],
 'gx.beats':['kontruje','counters'],'gx.weak':['słaby wobec','weak to'],'gx.cnt':['{a} kontruje {b}','{a} counters {b}'],'gx.mir':['Ten sam gimmick po obu stronach: nuda','Same gimmick on both sides: dull'],'gx.logic':['logiczny zwycięzca','logical winner'],'gx.upset':['niespodzianka','upset']});
function giOK(w){return w&&!w.ext&&w.fed!==undefined}
const keyOf=w=>{try{return giOf(w).k}catch(e){return null}};
function rel(ka,kb){if(!ka||!kb)return 0;if(ka===kb)return 2;if((BEAT[ka]||[]).indexOf(kb)>=0)return 1;if((BEAT[kb]||[]).indexOf(ka)>=0)return -1;return 0}
function qOf(a,b){let v=(giVal(a)+giVal(b))/2;return Math.max(.3,Math.min(1,v/.5))}
function gimPairs(m){const s=sides(m),ffa=MODES[m.mode].ffa,out=[];const ws=(ids)=>ids.map(W).filter(w=>giOK(w));
 if(ffa){const a=ws(s.A.concat(s.B));for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)out.push([a[i],a[j],0])}
 else{const A=ws(s.A),B=ws(s.B);A.forEach(a=>B.forEach(b=>out.push([a,b,m.winner==='a'?1:m.winner==='b'?-1:0])))}
 return out}
window.gimFx=function(m){let tot=0,n=0,best=null;gimPairs(m).forEach(([a,b,win])=>{const ka=keyOf(a),kb=keyOf(b),r=rel(ka,kb),q=qOf(a,b);let v=0;
  if(r===2)v=-.2*q;else if(r!==0){v=.45*q;if(win!==0&&((r===1&&win===1)||(r===-1&&win===-1)))v+=.15*q}
  tot+=v;n++;if(r!==0&&(!best||Math.abs(v)>Math.abs(best.v)))best={a:a,b:b,r:r,v:v,win:win,ka:ka,kb:kb}});
 return n?{v:Math.max(-.4,Math.min(.7,tot/n)),best:best}:{v:0,best:null}};
const _bsq=baseStars;baseStars=function(m,pos,total){let s=_bsq.apply(this,arguments);try{s+=gimFx(m).v}catch(e){}return clamp(s,.5,5)};
const f2s=x=>(x>=0?'+':'−')+String(Math.abs(Math.round(x*100)/100)).replace('.',lang==='pl'?',':'.');
const _slot=slotHtml;slotHtml=function(m){let h=_slot.apply(this,arguments);try{if(!matchReady(m))return h;const g=gimFx(m),b=g.best;if(!b||Math.abs(g.v)<.01)return h;
  let chip;if(b.r===2)chip='<span class="tag" style="color:#d6336c" title="'+esc(t('gx.mir'))+'">'+esc(t('gx.mir'))+' '+f2s(g.v)+'★</span>';
  else{const win=b.r===1?b.a:b.b,los=b.r===1?b.b:b.a,kw=b.r===1?b.ka:b.kb,kl=b.r===1?b.kb:b.ka;const why=WHY[kw+'>'+kl];const logical=(b.r===1&&b.win===1)||(b.r===-1&&b.win===-1);
   chip='<span class="tag" data-act="gxopen" style="cursor:pointer;color:#2f9e44" title="'+esc(why?(lang==='pl'?why[0]:why[1]):'')+'">⚡ '+esc(t('gx.cnt',{a:giNm(kw),b:giNm(kl)}))+' '+f2s(g.v)+'★'+(b.win!==0?' · '+esc(t(logical?'gx.logic':'gx.upset')):'')+'</span>'}
  const i=h.lastIndexOf('</div>');return h.slice(0,i)+'<div class="row" style="gap:6px;flex-wrap:wrap">'+chip+'</div>'+h.slice(i)}catch(e){return h}};
const ICO={monster:'👹',underdog:'🐕',coward:'🐔',veteran:'🎖️',mask:'🎭',patriot:'🦅',menace:'🦹',comedian:'🤡',rebel:'🤘',sadist:'😈',prodigy:'⭐',showman:'🎩',technician:'🧠',cult:'🔮',legend:'👑',enforcer:'🥊'};
Object.assign(D,{'gx.open':['📖 Ściągawka gimmicków','📖 Gimmick cheat sheet'],'gx.legend':['Wiersz kontruje kolumnę','Row counters column'],'gx.l1':['kontra: wyższa ocena walki','counter: higher match rating'],'gx.l2':['jest kontrowany','gets countered'],'gx.l3':['to samo: nuda','mirror: dull'],'gx.l4':['neutralnie','neutral'],'gx.tip':['Kliknij ikonę lub pole, żeby zobaczyć szczegóły.','Tap an icon or a cell for details.'],'gx.pick':['Wybierz gimmick (ikona po lewej).','Pick a gimmick (icon on the left).']});
function sheetHtml(){const ks=Object.keys(BEAT);const c=22;
 let h='<div class="stack" style="gap:8px"><div class="mute" style="font-size:13px;max-width:70ch">'+esc(t('gx.sub'))+'</div>'+
 '<div class="row" style="gap:10px;flex-wrap:wrap;font-size:12px"><span><b style="color:#2f9e44">▲</b> '+esc(t('gx.l1'))+'</span><span><b style="color:#d6336c">▼</b> '+esc(t('gx.l2'))+'</span><span><b style="color:#8a8a8a">＝</b> '+esc(t('gx.l3'))+'</span><span><b style="opacity:.4">·</b> '+esc(t('gx.l4'))+'</span></div>'+
 '<div style="overflow-x:auto;max-width:100%"><table style="border-collapse:separate;border-spacing:1px;font-size:11px;table-layout:fixed;width:'+(124+16*(c+2))+'px"><colgroup><col style="width:124px">'+ks.map(()=>'<col style="width:'+(c+1)+'px">').join('')+'</colgroup><tr><td class="mute" style="font-size:11px;white-space:nowrap">'+esc(t('gx.legend'))+'</td>'+ks.map(k=>'<td data-act="gxinfo" data-r="'+k+'" title="'+esc(giNm(k))+'" style="text-align:center;font-size:15px;cursor:pointer;width:'+c+'px">'+ICO[k]+'</td>').join('')+'</tr>';
 ks.forEach(r=>{h+='<tr><td data-act="gxinfo" data-r="'+r+'" style="white-space:nowrap;cursor:pointer;padding:0;overflow:hidden"><span style="font-size:15px">'+ICO[r]+'</span> <b style="font-size:11px">'+esc(giNm(r))+'</b></td>'+ks.map(k=>{let bg='transparent',tx='<span style="opacity:.3">·</span>',tt=giNm(r)+' / '+giNm(k);
   if(r===k){bg='#8a8a8a33';tx='＝';tt+=': '+t('gx.l3')}else if(BEAT[r].indexOf(k)>=0){bg='#2f9e4455';tx='<b style="color:#2f9e44">▲</b>';tt=t('gx.cnt',{a:giNm(r),b:giNm(k)})}else if(BEAT[k].indexOf(r)>=0){bg='#d6336c40';tx='<b style="color:#d6336c">▼</b>';tt=t('gx.cnt',{a:giNm(k),b:giNm(r)})}
   return '<td data-act="gxinfo" data-r="'+r+'" data-c="'+k+'" title="'+esc(tt)+'" style="text-align:center;padding:0;height:'+(c-4)+'px;border-radius:5px;background:'+bg+';cursor:pointer">'+tx+'</td>'}).join('')+'</tr>'});
 return h+'</table></div><div id="gxinfo" class="note" style="min-height:44px;font-size:13px">'+esc(t('gx.tip'))+'</div></div>'}
Object.assign(ACT,{gxopen(){openModal('<h2>'+esc(t('gx.title'))+'</h2>'+sheetHtml())},
 gxinfo(e){const r=e.dataset.r,c=e.dataset.c,el=document.getElementById('gxinfo');if(!el)return;let tx='';
  const weak=k=>Object.keys(BEAT).filter(x=>BEAT[x].indexOf(k)>=0);
  if(!c){const g=giDef(r);tx='<b>'+ICO[r]+' '+esc(giNm(r))+'</b> – '+esc(lang==='pl'?g.d[0]:g.d[1])+'<br><span style="color:#2f9e44">▲ '+esc(t('gx.beats'))+': '+BEAT[r].map(giNm).join(', ')+'</span><br><span style="color:#d6336c">▼ '+esc(t('gx.weak'))+': '+weak(r).map(giNm).join(', ')+'</span>'}
  else if(r===c)tx=esc(t('gx.mir'));
  else{const a=BEAT[r].indexOf(c)>=0?r:BEAT[c].indexOf(r)>=0?c:null,b=a===r?c:r;
   if(!a)tx=esc(giNm(r)+' / '+giNm(c)+': '+t('gx.l4'));else{const w=WHY[a+'>'+b];tx='<b>⚡ '+esc(t('gx.cnt',{a:giNm(a),b:giNm(b)}))+'</b>'+(w?'<br>'+esc(lang==='pl'?w[0]:w[1]):'')}}
  el.innerHTML=tx}});
const _vg=vGim;vGim=function(){let h=_vg.apply(this,arguments);try{return h+'<div class="card stack"><h3>'+esc(t('gx.title'))+'</h3>'+sheetHtml()+'</div>'}catch(e){return h}};
const _vs5=vShow;vShow=function(){const h=_vs5.apply(this,arguments);try{if(RUN||(G.summary&&G.showResult))return h;return h+'<div class="row"><button class="btn sm" data-act="gxopen">'+esc(t('gx.open'))+'</button></div>'}catch(e){return h}};
})();
if(typeof normTexts==="function")normTexts();
