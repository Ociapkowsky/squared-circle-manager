;/* ===== Depth: star power of the card, story payoff vs stale booking, locker-room life, fan segments ===== */
(function(){
const SEGS=[['pur',['technician','strong']],['brw',['brawler','hardcore']],['fly',['highflyer','lucha']],['pwr',['powerhouse']],['fam',null],['edge',null]];
Object.assign(D,{
'sg.pur':['Puryści','Purists'],'sg.brw':['Miłośnicy brutalności','Brawl lovers'],'sg.fly':['Fani widowiska','Spectacle fans'],'sg.pwr':['Fani siły','Power fans'],'sg.fam':['Rodziny (lubią face’ów)','Families (love faces)'],'sg.edge':['Fani dramatu (heele i feudy)','Drama fans (heels & feuds)'],
'sg.pur.d':['technicy i siłowi','technicians & strong style'],'sg.brw.d':['brawlerzy i hardcore','brawlers & hardcore'],'sg.fly.d':['high-flyerzy i lucha','high-flyers & lucha'],'sg.pwr.d':['powerhouse','powerhouse'],'sg.fam.d':['dużo face’ów na karcie','lots of faces on the card'],'sg.edge.d':['heele i walki w feudach','heels and feud matches'],
'sg.title':['Gusta widowni','Crowd tastes'],'sg.share':['udział','share'],'sg.hint':['Fani nagradzają kartę, która im odpowiada: ich zadowolenie zmienia frekwencję. Zadowolenie zmienia się z każdą galą.','Fans reward cards that suit them: their mood changes attendance. It shifts after every show.'],
'cd.sp':['Siła gwiazd karty','Card star power'],'cd.spx':['oczekiwana dla Twojej federacji','expected for your promotion'],
'cd.title':['Skład ma znaczenie','The roster matters'],'cd.sp1':['Siła gwiazd na karcie: {a} (federacja oczekuje ok. {b}). Wpływ na popularność: {c}.','Star power on the card: {a} (the promotion expects about {b}). Effect on popularity: {c}.'],
'cd.stale1':['Karta bez żadnej walki w feudzie przy aktywnych feudach: nuda narasta (seria {n}).','No feud match on the card despite active feuds: boredom builds (streak {n}).'],
'cd.rep1':['Powtórki zestawień bez fabuły ({n}): fani mają dość tych samych walk.','Repeated pairings without a story ({n}): fans are tired of the same matches.'],
'cd.seg1':['Widownia najbardziej zadowolona: {a}. Najbardziej niezadowolona: {b}.','Happiest crowd: {a}. Least happy: {b}.'],
'n.buried':['{w} od tygodni nie dostaje walk i traci formę oraz humor.','{w} has been left off the card for weeks and is losing form and mood.'],
'n.quitbury':['{w} zażądał rozwiązania kontraktu: zakopany w szatni, odchodzi.','{w} demanded a release: buried in the locker room, leaving.']});
function segEnsure(){if(!G.seg){const s={};let tot=0;SEGS.forEach(x=>{const v=.6+rnd()*.9;s[x[0]]={sat:50,sh:v};tot+=v});SEGS.forEach(x=>{s[x[0]].sh=s[x[0]].sh/tot});G.seg=s}return G.seg}
function readyMs(){return (G.card||[]).filter(matchReady)}
const slotW=(i,n)=>1+(i>=n-2?.5:0)+(i===n-1?.5:0);
function popsOf(m){return sides(m).A.concat(sides(m).B).map(W).filter(Boolean)}
function cardSP(){const ms=readyMs();if(ms.length<2)return null;let sw=0,sp=0;ms.forEach((m,i)=>{const w=slotW(i,ms.length),ps=popsOf(m);if(!ps.length)return;let p=avg(ps.map(x=>x.pop));if(m.title)p+=3;sw+=w;sp+=w*p});return sw?sp/sw:null}
function segDelivery(){const ms=readyMs(),S=segEnsure(),out={};if(ms.length<2)return null;let sw=0;const fr={},style={};SEGS.forEach(x=>{fr[x[0]]=0});let fam=0,edge=0;
 ms.forEach((m,i)=>{const w=slotW(i,ms.length),ps=popsOf(m);if(!ps.length)return;sw+=w;
  SEGS.forEach(x=>{if(x[1])fr[x[0]]+=w*ps.filter(p=>x[1].indexOf(p.style)>=0).length/ps.length});
  fam+=w*ps.filter(p=>p.role==='face').length/ps.length;
  edge+=w*(ps.filter(p=>p.role==='heel').length/ps.length*.6+(feudOf(m)?.55:0)+(m.stip&&m.stip!=='none'?.1:0))});
 SEGS.forEach(x=>{if(x[1]){const base=x[1].length/7,f=fr[x[0]]/sw;out[x[0]]=clamp(50+(f-base)*260,0,100)}});
 out.fam=clamp(fam/sw*105,0,100);out.edge=clamp(edge/sw*105,0,100);return out}
const baseSP=()=>G.fed.pop*.75;
/* --- demand/merch/ppv hooks --- */
const _dm=demandAt;demandAt=function(pm,noise){let d=_dm.apply(this,arguments);try{const sp=cardSP();if(sp!=null)d+=clamp((sp-30)/100*.30,-.10,.18);
 const S=segEnsure();let sg=0;SEGS.forEach(x=>{sg+=S[x[0]].sh*(S[x[0]].sat-50)/50});d+=sg*.09}catch(e){}return d};
const _ec=econAt;econAt=function(pm,noise){const r=_ec.apply(this,arguments);try{const sp=cardSP(),hl=healthy(),ap=hl.length?avg(hl.map(w=>w.pop)):20;if(sp!=null&&ap>0)r.merch=r.merch*clamp((sp/60)/(ap/60),.5,2.2)}catch(e){}return r};
const _be=bigEst;bigEst=function(type,rating){const r=_be.apply(this,arguments);try{const sp=cardSP();if(sp!=null&&type==='ppv'){const k=clamp(.65+sp/80,.6,1.6);r.buys=Math.round(r.buys*k);r.rev=Math.round(r.rev*k)}}catch(e){}return r};
/* --- stale pairings / feud payoff in match stars --- */
function recentPairs(){const h=G.pairHist||{},c={};Object.keys(h).forEach(wk=>{if(+wk>=G.week-6)h[wk].forEach(k=>{c[k]=(c[k]||0)+1})});return c}
function oppPairs(m){const s=sides(m);if(MODES[m.mode].ffa){const a=s.A.concat(s.B),o=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)o.push(pairKey(a[i],a[j]));return o}const o=[];s.A.forEach(a=>s.B.forEach(b=>o.push(pairKey(a,b))));return o}
function repOf(m,c){if(feudOf(m))return 0;let mx=0;oppPairs(m).forEach(k=>{mx=Math.max(mx,c[k]||0)});return mx>=2?Math.min(.8,.2*(mx-1)):0}
const _bs=baseStars;baseStars=function(m,pos,total){let s=_bs.apply(this,arguments);try{const fo=feudOf(m);if(fo&&fo.f.heat>=50)s+=.3*(.5+.5*fo.cov);s-=repOf(m,recentPairs())}catch(e){}return clamp(s,.5,5)};
/* --- finish show: apply card effects once --- */
const _fs=finishShow;finishShow=function(out){let ctx=null;try{const ms=readyMs(),sp=cardSP(),c=recentPairs();
  ctx={sp:sp,exp:baseSP(),rep:ms.filter(m=>repOf(m,c)>0).length,feud:ms.some(m=>feudOf(m)),del:segDelivery(),main:ms.length?popsOf(ms[ms.length-1]):[],keys:[].concat.apply([],ms.map(oppPairs)),before:G.fed.pop}}catch(e){}
 const r=_fs.apply(this,arguments);
 try{if(ctx&&ctx.sp!=null&&G.summary){let adj=clamp((ctx.sp-ctx.exp)/100*.7,-1.2,.6);
  const hasF=G.feuds.length>0;G.stale=(!ctx.feud&&hasF)?(G.stale||0)+1:0;if(G.stale>=2)adj-=Math.min(.5,.12*G.stale);adj-=Math.min(.5,.1*ctx.rep);
  adj=Math.round(adj*100)/100;const b2=G.fed.pop;G.fed.pop=clamp(G.fed.pop+adj,2,100);G.summary.dpop+=G.fed.pop-b2;
  ctx.main.forEach(w=>{w.pop=clamp(w.pop+.25*popDim(w.pop),1,100)});
  G.pairHist=G.pairHist||{};G.pairHist[G.week-1]=ctx.keys;Object.keys(G.pairHist).forEach(k=>{if(+k<G.week-10)delete G.pairHist[k]});
  const S=segEnsure(),rt=G.summary.rating;if(ctx.del)SEGS.forEach(x=>{const q=S[x[0]];q.sat=clamp(q.sat+(ctx.del[x[0]]-q.sat)*.22+(rt-2.8)*1.5,0,100)});
  G.summary.cx={sp:ctx.sp,exp:ctx.exp,adj:adj,stale:G.stale,rep:ctx.rep,del:ctx.del};save()}}catch(e){}return r};
/* --- locker room life (before endWeek runs) --- */
const _ew=endWeek;endWeek=function(){try{if(G.summary){mine().forEach(w=>{if(w.injury>0||isChamp(w.id))return;const wr=w.wrestled;w.idle=wr?0:(w.idle||0)+1;
  if(!wr&&w.idle>=4){w.pop=Math.max(1,w.pop-(w.pop>=30?.15:.07));w.morale=clamp(w.morale-1,0,100);
   if(w.idle===6&&w.pop>=25)addNews('n.buried',{w:w.name});
   if(w.idle>=8&&w.morale<40&&rnd()<.2){addNews('n.quitbury',{w:w.name});w.fed='FA';purgeW(w.id)}}
  if(wr&&w.age<=26&&w.pop<45)w.pop=clamp(w.pop+.12,1,100);
  if(w.age>=38&&rnd()<.03)w.pop=Math.max(1,w.pop-.3)})}}catch(e){}return _ew.apply(this,arguments)};
/* --- UI --- */
function barRow(id,sat,sh){const col=sat>=60?'#2f9e44':sat>=40?'#e0a100':'#d6336c';return '<div style="display:grid;grid-template-columns:minmax(120px,1.3fr) 2fr auto;gap:8px;align-items:center;font-size:13px"><div><b>'+esc(t('sg.'+id))+'</b><div class="mute" style="font-size:12px">'+esc(t('sg.'+id+'.d'))+' · '+esc(t('sg.share'))+' '+Math.round(sh*100)+'%</div></div><div style="height:8px;border-radius:5px;background:var(--line,#8883);overflow:hidden"><div style="height:100%;width:'+Math.round(sat)+'%;background:'+col+'"></div></div><b>'+Math.round(sat)+'</b></div>'}
function segPanel(){const S=segEnsure(),sp=cardSP();let h='<div class="card stack" style="gap:8px"><div class="row spread"><h3>'+esc(t('sg.title'))+'</h3>'+(sp!=null?'<span class="tag">'+esc(t('cd.sp'))+': <b>'+Math.round(sp)+'</b> <span class="mute">('+esc(t('cd.spx'))+' ~'+Math.round(baseSP())+')</span></span>':'')+'</div><div class="mute" style="font-size:13px">'+esc(t('sg.hint'))+'</div>';
 SEGS.forEach(x=>{h+=barRow(x[0],S[x[0]].sat,S[x[0]].sh)});return h+'</div>'}
const _vs3=vShow;vShow=function(){const h=_vs3.apply(this,arguments);try{if(RUN||(G.summary&&G.showResult))return h;return h+segPanel()}catch(e){return h}};
const _vsum=vSummary;vSummary=function(){let h=_vsum.apply(this,arguments);try{const c=G.summary&&G.summary.cx;if(!c)return h;
  const f=x=>(x>=0?'+':'−')+String(Math.abs(Math.round(x*100)/100)).replace('.',lang==='pl'?',':'.');let l='<div class="card stack" style="gap:6px"><h3>'+esc(t('cd.title'))+'</h3><div style="font-size:14px">⭐ '+esc(t('cd.sp1',{a:Math.round(c.sp),b:Math.round(c.exp),c:f(c.adj)}))+'</div>';
  if(c.stale>=2)l+='<div style="font-size:14px">📉 '+esc(t('cd.stale1',{n:c.stale}))+'</div>';if(c.rep>0)l+='<div style="font-size:14px">🔁 '+esc(t('cd.rep1',{n:c.rep}))+'</div>';
  if(c.del){const S=segEnsure(),a=SEGS.slice().sort((x,y)=>S[y[0]].sat-S[x[0]].sat);l+='<div style="font-size:14px">👥 '+esc(t('cd.seg1',{a:t('sg.'+a[0][0]),b:t('sg.'+a[a.length-1][0])}))+'</div>'}
  l+='</div>';const key='<div class="card stack"><h3>'+t('d.news')+'</h3>';const i=h.lastIndexOf(key);return i<0?h+l:h.slice(0,i)+l+h.slice(i)}catch(e){return h}};
})();
if(typeof normTexts==="function")normTexts();
