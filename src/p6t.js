;/* ===== Chronicle, weekly challenge, show replays, season awards ===== */
(function(){
window.NEWV=window.NEWV||{};
const yr=w=>Math.floor((w-1)/52)+1;
Object.assign(D,{'nav.chron':['Kronika','Chronicle'],'nav.rpl':['Replaye gal','Show replays'],'nav.season':['Sezon','Season'],
'ch.title':['Kronika federacji','Federation chronicle'],'ch.sub':['Najważniejsze momenty Twojej federacji w kolejności czasu.','The key moments of your promotion in time order.'],'ch.year':['Rok {y}','Year {y}'],'ch.none':['Na razie pusto. Pierwsze ważne wydarzenia wpadną tu same.','Empty for now. The first big events will land here on their own.'],
'n.rec':['Rekord federacji: gala z oceną {r}★.','Promotion record: a show rated {r}★.'],'n.lowshow':['Gala z oceną {r}★ przejdzie do historii jako wpadka.','A {r}★ show will go down as a flop.'],
'rp.title':['Replaye gal','Show replays'],'rp.sub':['Najlepsze gale z rozpisanym tempem: co wypadło najlepiej i gdzie był przestój.','Best shows with the pace laid out: what shone and where it dipped.'],'rp.none':['Brak gal do pokazania. Rozegraj kilka gal.','No shows to show. Run a few shows.'],'rp.att':['frekwencja','attendance'],'rp.main':['Main event','Main event'],
'cl.title':['Wyzwanie tygodnia','Weekly challenge'],'cl.reward':['Nagroda: +{p} popularności i {m}','Reward: +{p} popularity and {m}'],'cl.done':['Wyzwanie wykonane: {c}. Nagroda: +{p} popularności i {m}.','Challenge complete: {c}. Reward: +{p} popularity and {m}.'],'cl.missed':['Wyzwanie niewykonane: {c}','Challenge missed: {c}'],'cl.streak':['Seria wyzwań: {n}','Challenge streak: {n}'],'cl.skip':['Zmień wyzwanie','Reroll'],
'cl.star4':['Zrób choć jedną walkę na co najmniej 4★','Run at least one match rated 4★ or more'],'cl.gx':['Zbookuj walkę z kontrą gimmicków i zrób galę na 3★+','Book a gimmick-counter match and run a 3★+ show'],'cl.rate35':['Zrób galę ocenioną na co najmniej 3,5★','Run a show rated 3.5★ or more'],'cl.mefeud':['Main event w feudzie na 3,5★+','A feud main event rated 3.5★+'],'cl.theme':['Wybierz motyw gali i zrób galę na 3,5★+','Pick a show theme and run a 3.5★+ show'],'cl.debut':['Walka z debiutantem (popularność poniżej 25) na 3,5★+','A match with a rookie (popularity below 25) rated 3.5★+'],'cl.all3':['Wszystkie walki na karcie na co najmniej 3★','Every match on the card rated 3★ or more'],'cl.risky':['Ryzykowna walka i gala na 3,5★+','A risky match and a 3.5★+ show'],'cl.titlemain':['Main event o pas na 3,5★+','A title main event rated 3.5★+'],'cl.sold':['Wyprzedaj halę i zrób galę na 3★+','Sell out the arena and run a 3★+ show'],
'sn.title':['Sezon {y}','Season {y}'],'sn.sub':['Na koniec roku rozdawane są nagrody: Gala Roku, Walka Roku, Zawodnik Roku i Debiutant Roku.','At year-end awards are handed out: Show, Match, Wrestler and Rookie of the Year.'],'sn.lead':['Liderzy sezonu','Season leaders'],'sn.hist':['Poprzednie sezony','Past seasons'],'sn.nohist':['Pierwsze nagrody po końcu roku.','The first awards come at the end of the year.'],
'aw.show':['Gala Roku','Show of the Year'],'aw.match':['Walka Roku','Match of the Year'],'aw.wrest':['Zawodnik Roku','Wrestler of the Year'],'aw.rookie':['Debiutant Roku','Rookie of the Year'],'aw.title':['Nagrody roku {y}','Awards of year {y}'],'aw.body':['Rok {y} dobiegł końca. Oto laureaci.','Year {y} is over. Here are the winners.'],'aw.ok':['Gratulacje!','Congratulations!'],'n.award':['Nagroda roku: {a} dla {w}.','Award: {a} to {w}.'],'sn.wins':['wygranych','wins'],'sn.pts':['pkt','pts']});
/* --- chronicle --- */
const KEEP={'n.champ':'🏆','n.feudend':'🔥','n.feudend.mw':'🔥','n.tier':'⬆️','n.retire':'👋','n.farewell':'👋','n.tourwin':'🥇','n.prizewin':'💰','n.stnew':'🛡️','n.guest':'⭐','n.mom':'🎤','n.quitbury':'🚪','n.charity':'❤️','n.legend1':'👑','n.anniv1':'🎂','n.rec':'⭐','n.lowshow':'📉','n.award':'🏅','n.turn':'🔄','n.sign':'✍️','n.defend':'🛡️'};
function chron(k,v,ic){G.chron=G.chron||[];G.chron.unshift({w:G.week,k:k,v:v||{},i:ic||KEEP[k]||'•'});if(G.chron.length>500)G.chron.length=500}
const _an=addNews;addNews=function(k,v){const r=_an.apply(this,arguments);try{if(KEEP[k]){if(k==='n.defend'&&rnd()>.15)return r;chron(k,v)}}catch(e){}return r};
NEWV.chron=function(){let h='<div class="top"><div><h2>'+esc(t('ch.title'))+'</h2><div class="mute">'+esc(t('ch.sub'))+'</div></div></div>';const l=G.chron||[];if(!l.length)return h+'<div class="note">'+esc(t('ch.none'))+'</div>';
 let y=0;h+='<div class="card stack" style="gap:0">';l.slice(0,200).forEach(x=>{const yy=yr(x.w);if(yy!==y){y=yy;h+='<div style="font-weight:700;margin:12px 0 4px;color:var(--gold)">'+esc(t('ch.year',{y:y}))+'</div>'}
  h+='<div style="display:grid;grid-template-columns:54px 24px 1fr;gap:6px;padding:5px 0;border-bottom:1px solid var(--line,#8883);font-size:14px"><span class="mute">W'+x.w+'</span><span>'+x.i+'</span><span>'+esc(t(x.k,x.v))+'</span></div>'});return h+'</div>'};
/* --- context capture + show hooks --- */
const CH=['star4','gx','rate35','mefeud','theme','debut','all3','risky','titlemain','sold'];
const chk={star4:(s,c)=>s.out.some(o=>o.stars>=4),gx:(s,c)=>c.gx>=1&&s.rating>=3,rate35:(s,c)=>s.rating>=3.5,mefeud:(s,c)=>c.meFeud&&c.lastStars>=3.5,theme:(s,c)=>!!c.theme&&s.rating>=3.5,debut:(s,c)=>c.debut.some((d,i)=>d&&s.out.find(o=>o.pos===i)&&s.out.find(o=>o.pos===i).stars>=3.5),all3:(s,c)=>s.out.filter(o=>o.pos!=null).every(o=>o.stars>=3),risky:(s,c)=>c.risky&&s.rating>=3.5,titlemain:(s,c)=>c.meTitle&&c.lastStars>=3.5,sold:(s,c)=>s.sold&&s.rating>=3};
function newChal(){let k;do{k=CH[Math.floor(rnd()*CH.length)]}while(G.chal&&G.chal.k===k&&CH.length>1);G.chal={k:k,wk:G.week,streak:(G.chal&&G.chal.streak)||0}}
function seaEnsure(){if(!G.sea){const p0={};mine().forEach(w=>{p0[w.id]=w.pop});G.sea={y:yr(G.week),shows:[],matches:[],wr:{},p0:p0}}return G.sea}
const _fs3=finishShow;finishShow=function(out){let ctx=null;try{const ms=(G.card||[]).filter(matchReady);ctx={parts:ms.map(m=>sides(m).A.concat(sides(m).B)),gx:ms.filter(m=>{const g=gimFx(m);return g.best&&g.v>.2}).length,theme:G.theme,risky:ms.some(m=>m.risk===2),meFeud:ms.length&&!!feudOf(ms[ms.length-1]),meTitle:ms.length&&!!ms[ms.length-1].title,debut:ms.map(m=>sides(m).A.concat(sides(m).B).some(i=>W(i)&&W(i).pop<25)),vs:ms.map(m=>vsText(m)),tt:ms.map(m=>m.title?titleName(titleOf(m.title)||{}):'')}}catch(e){}
 const r=_fs3.apply(this,arguments);
 try{const s=G.summary;if(!s||!s.out||!ctx)return r;const mo=s.out.filter(o=>o.pos!=null);ctx.lastStars=mo.length?mo[mo.length-1].stars:0;
  const wk=G.week-1;
  // challenge
  if(!G.chal)newChal();const c=G.chal;let ok=false;try{ok=chk[c.k](s,ctx)}catch(e){}
  const rp=.4,rm=Math.round(600+G.fed.pop*50);
  if(ok){G.fed.pop=clamp(G.fed.pop+rp,2,100);G.fed.cash+=rm;c.streak=(c.streak||0)+1;G.chalDone=(G.chalDone||0)+1;s.chal={k:c.k,ok:1,m:rm,p:rp}}else{c.streak=0;s.chal={k:c.k,ok:0}}
  newChal();
  // records
  const best=G.recBest||0;if(s.rating>=4.25&&s.rating>best){G.recBest=s.rating;chron('n.rec',{r:f2(s.rating)},'⭐')}else if(s.rating<=1.5)chron('n.lowshow',{r:f2(s.rating)},'📉');
  // replay
  G.rpl=G.rpl||[];G.rpl.push({w:wk,rating:s.rating,att:s.att,cap:s.cap,rev:Math.round(s.rev),m:mo.map(o=>({s:o.stars,vs:ctx.vs[o.pos]||(o.a+' vs '+o.b),win:o.winner,t:ctx.tt[o.pos]||'',f:o.finish}))});
  G.rpl.sort((a,b)=>b.rating-a.rating);if(G.rpl.length>12)G.rpl.length=12;
  // season
  const S=seaEnsure();S.shows.push({w:wk,rating:s.rating,att:s.att});
  mo.forEach(o=>{const ids=ctx.parts[o.pos]||[];const wn=o.wid||[];S.matches.push({w:wk,vs:ctx.vs[o.pos]||'',stars:o.stars,main:o.pos===mo.length-1?1:0,win:o.winner});
   ids.forEach(i=>{const w=W(i);if(!w||w.fed!==G.fed.id)return;const q=S.wr[i]=S.wr[i]||{n:w.name,wins:0,pts:0};q.n=w.name;q.pts+=.2*o.stars;if(wn.indexOf(i)>=0){q.wins++;q.pts+=1+o.stars/2}})});
  save()}catch(e){}return r};
/* --- views --- */
const _vs7=vShow;vShow=function(){const h=_vs7.apply(this,arguments);try{if(RUN)return h;if(G.summary&&G.showResult)return h;if(!G.chal)newChal();const c=G.chal;
  return h+'<div class="card stack" style="gap:6px;border-left:3px solid var(--gold,#c9a227)"><div class="row spread"><b>🎯 '+esc(t('cl.title'))+'</b><span class="mute" style="font-size:13px">'+esc(t('cl.streak',{n:c.streak||0}))+'</span></div><div>'+esc(t('cl.'+c.k))+'</div><div class="mute" style="font-size:13px">'+esc(t('cl.reward',{p:'0,4',m:money(Math.round(600+G.fed.pop*50))}))+'</div></div>'}catch(e){return h}};
const _vsum3=vSummary;vSummary=function(){let h=_vsum3.apply(this,arguments);try{const c=G.summary&&G.summary.chal;if(!c)return h;
  const l='<div class="card"><b>🎯 '+esc(c.ok?t('cl.done',{c:t('cl.'+c.k),p:'0,4',m:money(c.m)}):t('cl.missed',{c:t('cl.'+c.k)}))+'</b></div>';const key='<div class="card stack"><h3>'+t('d.news')+'</h3>';const i=h.lastIndexOf(key);return i<0?h+l:h.slice(0,i)+l+h.slice(i)}catch(e){return h}};
NEWV.rpl=function(){let h='<div class="top"><div><h2>'+esc(t('rp.title'))+'</h2><div class="mute">'+esc(t('rp.sub'))+'</div></div></div>';const l=G.rpl||[];if(!l.length)return h+'<div class="note">'+esc(t('rp.none'))+'</div>';
 return h+'<div class="grid g2">'+l.map(x=>'<div class="card stack"><div class="row spread"><b>W'+x.w+' · '+starsHtml(x.rating)+' '+f2(x.rating)+'</b><span class="mute" style="font-size:13px">'+esc(t('rp.att'))+' '+num(x.att)+' / '+num(x.cap)+' · '+money(x.rev)+'</span></div>'+
  '<div style="display:flex;align-items:flex-end;gap:6px;height:70px">'+x.m.map((m,i)=>{const col=m.s>=3.75?'#2f9e44':m.s>=2.75?'#e0a100':'#d6336c';return '<div style="flex:1;min-width:0;text-align:center;font-size:11px"><div style="height:'+Math.round(m.s/5*48)+'px;background:'+col+';border-radius:4px 4px 0 0"></div>'+f1(m.s)+(i===x.m.length-1?' ★':'')+'</div>'}).join('')+'</div>'+
  x.m.map((m,i)=>'<div style="font-size:13px"><span class="mute">'+(i===x.m.length-1?esc(t('rp.main')):'#'+(i+1))+'</span> '+esc(m.vs)+' <b>'+f2(m.s)+'★</b>'+(m.t?' · '+esc(m.t):'')+'</div>').join('')+'</div>').join('')+'</div>'};
/* --- season awards --- */
function awards(S){const out=[];
 if(S.shows.length){const b=S.shows.slice().sort((a,c)=>c.rating-a.rating)[0];out.push({k:'show',n:'W'+b.w,v:f2(b.rating)+'★'})}
 if(S.matches.length){const b=S.matches.slice().sort((a,c)=>c.stars-a.stars||c.main-a.main)[0];out.push({k:'match',n:b.vs,v:f2(b.stars)+'★',ids:[]})}
 const ws=Object.entries(S.wr).map(([id,o])=>({id:id,n:o.n,pts:o.pts,wins:o.wins})).filter(x=>W(x.id)&&W(x.id).fed===G.fed.id).sort((a,b)=>b.pts-a.pts);
 if(ws.length)out.push({k:'wrest',n:ws[0].n,v:ws[0].wins+' '+t('sn.wins'),id:ws[0].id});
 const rk=mine().filter(w=>w.age<=25&&S.p0[w.id]!=null).sort((a,b)=>(b.pop-S.p0[b.id])-(a.pop-S.p0[a.id]))[0];if(rk&&rk.pop-S.p0[rk.id]>0)out.push({k:'rookie',n:rk.name,v:'+'+f1(rk.pop-S.p0[rk.id]),id:rk.id});
 return out}
const _ew3=endWeek;endWeek=function(){try{if(G.week%52===0&&G.sea){const S=G.sea,aw=awards(S);if(aw.length){aw.forEach(a=>{const w=a.id&&W(a.id);if(a.k==='wrest'&&w){w.pop=clamp(w.pop+2.5,1,100);evMood(w,10)}if(a.k==='rookie'&&w){w.pop=clamp(w.pop+1.5,1,100);evMood(w,8)}if(a.k==='show')G.fed.pop=clamp(G.fed.pop+1,2,100);if(a.k==='match')G.fed.pop=clamp(G.fed.pop+.4,2,100);
   addNews('n.award',{a:t('aw.'+a.k),w:a.n})});G.awards=G.awards||[];G.awards.unshift({y:S.y,a:aw});G.awardQ=G.awardQ||[];G.awardQ.push({y:S.y,a:aw})}
  const p0={};mine().forEach(w=>{p0[w.id]=w.pop});G.sea={y:S.y+1,shows:[],matches:[],wr:{},p0:p0}}}catch(e){}return _ew3.apply(this,arguments)};
const _we2=weekEvents;weekEvents=async function(){try{if(G.awardQ&&G.awardQ.length){const q=G.awardQ.shift();await askGeneric(esc(t('aw.title',{y:q.y})),t('aw.body',{y:q.y})+'\n'+q.a.map(a=>'🏅 '+t('aw.'+a.k)+': '+a.n+' ('+a.v+')').join('\n'),[{l:esc(t('aw.ok'))}])}}catch(e){}return _we2.apply(this,arguments)};
NEWV.season=function(){const S=seaEnsure();let h='<div class="top"><div><h2>'+esc(t('sn.title',{y:S.y}))+'</h2><div class="mute" style="max-width:70ch">'+esc(t('sn.sub'))+'</div></div></div>';
 const ws=Object.entries(S.wr).map(([id,o])=>o).sort((a,b)=>b.pts-a.pts).slice(0,8);
 h+='<div class="grid g2"><div class="card stack"><h3>'+esc(t('sn.lead'))+'</h3>'+(ws.length?'<table><tbody>'+ws.map((o,i)=>'<tr><td class="mute">'+(i+1)+'.</td><td><b>'+esc(o.n)+'</b></td><td>'+o.wins+' '+esc(t('sn.wins'))+'</td><td class="mute">'+f1(o.pts)+' '+esc(t('sn.pts'))+'</td></tr>').join('')+'</tbody></table>':'<div class="mute">—</div>')+'</div>';
 const aw=awards(S);h+='<div class="card stack"><h3>'+esc(t('aw.title',{y:S.y}))+'</h3>'+(aw.length?aw.map(a=>'<div>🏅 <b>'+esc(t('aw.'+a.k))+'</b>: '+esc(a.n)+' <span class="mute">('+esc(a.v)+')</span></div>').join(''):'<div class="mute">—</div>')+'</div></div>';
 h+='<div class="card stack"><h3>'+esc(t('sn.hist'))+'</h3>'+((G.awards||[]).length?G.awards.map(x=>'<div><b>'+esc(t('sn.title',{y:x.y}))+'</b>: '+x.a.map(a=>esc(t('aw.'+a.k))+' – '+esc(a.n)).join(' · ')+'</div>').join(''):'<div class="mute">'+esc(t('sn.nohist'))+'</div>')+'</div>';return h};
})();
if(typeof normTexts==="function")normTexts();
