/* ===== Streaks: win/loss runs and runs at a named PPV (balance set by eye) ===== */
let SKOFF=false;const SKM_W=[5,10,15,20,30],SKM_L=[6,10,15,25];
function skEnsure(){if(!G.sk)G.sk={rec:{win:{n:0},loss:{n:0},pv:{n:0}},log:[]};if(!G.sk.rec.pv)G.sk.rec.pv={n:0};return G.sk}
function skOf(w){if(!w.sk)w.sk={w:0,l:0,bw:0,bl:0,pv:{}};return w.sk}
function skPpv(){try{if(G.week%4!==0)return null;return {key:ppvName(G.week,'en'),label:ppvName(G.week)}}catch(e){return null}}
function skLog(o){const s=skEnsure();s.log.unshift(Object.assign({wk:G.week},o));s.log=s.log.slice(0,30)}
const _fmSk=finalizeMatch;
finalizeMatch=function(m,res,pos,total,fo){
 let wi=[],li=[],pre=0,pp=null;
 try{const o=outcome(m);wi=o.wi;li=o.li;pp=skPpv();
  o.wi.concat(o.li).forEach(i=>{const w=W(i);if(!w)return;const s=skOf(w);if(s.w>=10)pre=Math.max(pre,.3);else if(s.w>=5)pre=Math.max(pre,.15);if(pp){const q=s.pv[pp.key];if(q&&q.s>=3)pre=Math.max(pre,.2)}})}catch(e){}
 const r=_fmSk(m,res,pos,total,fo);
 try{
  if(!r||r.finish==='draw'||(r.finish||m.finish)==='draw')return r;
  const sk=skEnsure();let add=SKOFF?0:pre;
  li.forEach(i=>{const w=W(i);if(!w||w.fed!==G.fed.id)return;const s=skOf(w);const was=s.w;
   if(was>=3){skLog({k:'w',w:w.name,n:was,by:names(wi)});
    if(was>=5){addNews('n.skend',{w:w.name,n:was,by:names(wi)});add+=was>=10?.5:.25;
     w.morale=clamp(w.morale-Math.min(8,was*.5),0,100);w.pop=clamp(w.pop-Math.min(1.5,was*.08),1,100);
     wi.forEach(j=>{const x=W(j);if(x)x.pop=clamp(x.pop+Math.min(2,was*.12)*popDim(x.pop),1,100)})}}
   s.w=0;s.l++;if(s.l>s.bl)s.bl=s.l;if(s.l>sk.rec.loss.n)sk.rec.loss={n:s.l,name:w.name,wk:G.week};
   if(s.l>=6){if(!s.gag)w.morale=clamp(w.morale-1.5,0,100);else w.pop=clamp(w.pop+.15,1,100);if(s.l>=8&&!s.gag)w.pop=clamp(w.pop-.1,1,100)}
   if(SKM_L.indexOf(s.l)>=0)addNews('n.skloss',{w:w.name,n:s.l});
   if(pp){const q=s.pv[pp.key];if(q){if(q.s>=3){skLog({k:'p',w:w.name,n:q.s,p:pp.label,by:names(wi)});addNews('n.skppvend',{w:w.name,n:q.s,p:pp.label,by:names(wi)});add+=.4;wi.forEach(j=>{const x=W(j);if(x)x.pop=clamp(x.pop+2*popDim(x.pop),1,100)})}q.s=0}else s.pv[pp.key]={s:0,b:0}}});
  wi.forEach(i=>{const w=W(i);if(!w||w.fed!==G.fed.id)return;const s=skOf(w);const wasL=s.l;
   if(wasL>=6){addNews('n.skbreakl',{w:w.name,n:wasL});add+=.25;w.pop=clamp(w.pop+(s.gag?1.5:1),1,100);w.morale=clamp(w.morale+8,0,100);skLog({k:'l',w:w.name,n:wasL})}
   s.l=0;s.gag=false;s.w++;if(s.w>s.bw)s.bw=s.w;if(s.w>sk.rec.win.n)sk.rec.win={n:s.w,name:w.name,wk:G.week};
   if(SKM_W.indexOf(s.w)>=0){addNews('n.skwin',{w:w.name,n:s.w});w.pop=clamp(w.pop+.5*popDim(w.pop),1,100);w.morale=clamp(w.morale+3,0,100)}
   if(pp){const q=s.pv[pp.key]||(s.pv[pp.key]={s:0,b:0});q.s++;if(q.s>q.b)q.b=q.s;if(q.s>sk.rec.pv.n)sk.rec.pv={n:q.s,name:w.name,p:pp.label,wk:G.week};if(q.s===3||q.s===5||q.s===8)addNews('n.skppv',{w:w.name,n:q.s,p:pp.label})}});
  if(add)r.stars=Math.round(clamp(r.stars+add,.5,5)*4)/4;
 }catch(e){}
 return r};
/* roster tag */
function skTag(w){const s=w&&w.sk;if(!s)return '';if(s.w>=3)return '<span class="tag" style="color:var(--gold);border-color:var(--gold)" title="'+esc(t('sk.winH'))+'">🔥 '+s.w+t('sk.w')+'</span>';if(s.l>=4)return '<span class="tag" style="color:var(--blue);border-color:var(--blue)" title="'+esc(t('sk.lossH'))+'">❄ '+s.l+t('sk.l')+'</span>';return ''}
const _ptSk=potTag;potTag=function(w){return _ptSk(w)+skTag(w)};
/* screen */
function vStreaks(){const sk=skEnsure(),ws=mine();
 const row=(a,b)=>'<div class="row spread" style="gap:8px"><span>'+a+'</span><b>'+b+'</b></div>',card=(ti,b)=>'<div class="card stack"><h3>'+ti+'</h3>'+b+'</div>';
 let h='<div class="top"><div><h2>'+t('nav.sk')+'</h2><div class="mute" style="max-width:66ch">'+t('sk.sub')+'</div></div></div>';
 const top=(k,min)=>ws.filter(w=>w.sk&&w.sk[k]>=min).sort((a,b)=>b.sk[k]-a.sk[k]).slice(0,8);
 const list=(arr,k,ic)=>arr.length?arr.map(w=>row(esc(w.name)+(w.injury?' <span class="tag inj">'+injTxt(w)+'</span>':'')+(k==='l'&&w.sk.gag?' <span class="tag">'+t('sk.gagtag')+'</span>':''),ic+' '+w.sk[k])).join(''):'<div class="mute">'+t('sk.none')+'</div>';
 h+='<div class="grid g2">'+card('🔥 '+t('sk.cw'),list(top('w',2),'w','🔥'))+card('❄ '+t('sk.cl'),list(top('l',2),'l','❄'))+'</div>';
 const pv=[];ws.forEach(w=>{if(!w.sk)return;Object.keys(w.sk.pv).forEach(k=>{const q=w.sk.pv[k];if(q.s>=2)pv.push({w:w.name,k,s:q.s})})});pv.sort((a,b)=>b.s-a.s);
 h+=card(t('sk.cp'),pv.length?pv.slice(0,8).map(x=>row(esc(x.w)+' <span class="mute">· '+esc(skPpvLabel(x.k))+'</span>','🏆 '+x.s)).join(''):'<div class="mute">'+t('sk.nonep')+'</div>');
 const R=sk.rec;h+=card(t('sk.rec'),row(t('sk.rw'),R.win.n?esc(R.win.name)+' · '+R.win.n:'—')+row(t('sk.rl'),R.loss.n?esc(R.loss.name)+' · '+R.loss.n:'—')+row(t('sk.rp'),R.pv.n?esc(R.pv.name)+' · '+R.pv.n+' ('+esc(R.pv.p)+')':'—'));
 h+=card(t('sk.log'),sk.log.length?sk.log.slice(0,12).map(x=>'<div class="row spread" style="gap:8px"><span>'+t('sk.lg.'+x.k,{w:esc(x.w),n:x.n,by:esc(x.by||''),p:esc(x.p||'')})+'</span><span class="mute" style="font-size:12px">'+t('common.week',{w:((x.wk-1)%52)+1,y:yearOf(x.wk)})+'</span></div>').join(''):'<div class="mute">'+t('sk.nolog')+'</div>');
 return h}
function skPpvLabel(key){try{const l=ppvEnsure().find(x=>x.en===key);return l?(lang==='pl'?l.pl:l.en):key}catch(e){return key}}
/* events */
{
const KG=f=>()=>{try{return G.week>=20&&f()}catch(e){return false}};
const kp=(k,min)=>{const l=mine().filter(w=>!w.ext&&!w.farewell&&w.sk&&w.sk[k]>=min);return l.length?pickR(l):null};
const kv=(k,min,ex)=>()=>{const w=kp(k,min);return Object.assign({w:w?w.name:'?',id:w?w.id:''},w&&w.sk?{n:w.sk[k]}:{n:0},ex?ex(w):{})};
const cm=f=>({c:xc(f),mm:money(xc(f))});
[
{k:'skmerch',t:['Koszulki z licznikiem','Counter T-shirts'],b:['Kibice domagają się koszulek z licznikiem wygranych {w} ({n} z rzędu). Wydruk to {mm}.','Fans demand T-shirts with {w}\'s win counter ({n} in a row). Printing costs {mm}.'],v:kv('w',5,()=>cm(.05)),gate:KG(()=>!!kp('w',5)&&rnd()<.4),o:[['Wydrukuj ({mm})','Print them ({mm})'],['Nie teraz','Not now']],cost:[1,0],n:[['Wyprzedane w tydzień.','Sold out within a week.'],['Fani kręcą nosem.','Fans grumble.']],fx:[v=>{xcash(-v.c);xcash(Math.round(v.c*2.4));xpop(.3)},()=>{}]},
{k:'skcount',t:['Hala odlicza','The crowd counts down'],b:['Publiczność odlicza kolejne zwycięstwa {w}: już {n}! Możesz podkręcić nastrój.','The crowd counts down {w}\'s wins: {n} already! You can fan the flames.'],v:kv('w',8),gate:KG(()=>!!kp('w',8)&&rnd()<.4),o:[['Dodaj licznik na ekranie','Add an on-screen counter'],['Zostaw jak jest','Leave it']],n:[['Atmosfera jak na finale.','The atmosphere of a final.'],['Kibice sami robią swoje.','Fans do their own thing.']],fx:[v=>{const w=W(v.id);if(w){w.pop=clamp(w.pop+.6,1,100);w.morale=clamp(w.morale+4,0,100)}xpop(.2)},()=>{}]},
{k:'skhype',t:['„Kto go powstrzyma?"','"Who will stop him?"'],b:['Media pytają, kto przerwie serię {w} ({n} wygranych). Możesz ogłosić otwarte wyzwanie.','The media ask who will end {w}\'s streak ({n} wins). You can announce an open challenge.'],v:kv('w',6),gate:KG(()=>!!kp('w',6)&&rnd()<.35),o:[['Ogłoś otwarte wyzwanie','Announce an open challenge'],['Chroń serię','Protect the streak']],n:[['Cała szatnia chce go pokonać.','The whole locker room wants to beat him.'],['Seria jest bezpieczna, a fani spokojni.','The streak is safe and fans are calm.']],fx:[v=>{xmood(2);xpop(.3);const w=W(v.id);if(w)w.morale=clamp(w.morale+3,1,100)},v=>{const w=W(v.id);if(w)w.morale=clamp(w.morale+2,0,100)}]},
{k:'skgag',t:['Memy o pechowcu','Memes about the unlucky one'],b:['Internet żartuje z {w}: {n} porażek z rzędu. Możesz uczynić z tego element postaci albo przerwać żarty.','The internet jokes about {w}: {n} straight losses. You can make it part of the character or shut the jokes down.'],v:kv('l',6),gate:KG(()=>!!kp('l',6)&&rnd()<.4),o:[['Zrób z tego gag','Lean into the gag'],['Daj mu wygraną','Give him a win']],n:[['Kibice go pokochali jako sympatycznego pechowca.','Fans love him as a lovable loser.'],['Wygrana go odbuduje.','A win will rebuild him.']],fx:[v=>{const w=W(v.id);if(w){skOf(w).gag=true;w.pop=clamp(w.pop+.4,1,100)}},v=>{const w=W(v.id);if(w){w.morale=clamp(w.morale+6,0,100)}}]},
{k:'skquit',t:['Wrestler traci pewność siebie','A wrestler loses confidence'],b:['{w} przegrał {n} walk z rzędu i prosi o rozmowę. Zastanawia się, czy ma tu przyszłość.','{w} has lost {n} matches in a row and asks to talk. He wonders if he has a future here.'],v:kv('l',8),gate:KG(()=>!!kp('l',8)&&rnd()<.4),o:[['Porozmawiaj i zmotywuj','Talk and motivate'],['Powiedz, żeby się starał','Tell him to try harder']],n:[['Wraca z nową energią.','He comes back with new energy.'],['Morale spada jeszcze niżej.','Morale drops even lower.']],fx:[v=>{const w=W(v.id);if(w){w.morale=clamp(w.morale+12,0,100);w.loyal=clamp((w.loyal||50)+4,0,100)}},v=>{const w=W(v.id);if(w){w.morale=clamp(w.morale-6,0,100);w.loyal=clamp((w.loyal||50)-4,0,100)}}]},
{k:'skppvmyth',t:['Mit wielkiej gali','The myth of the big show'],b:['Media piszą o „klątwie" {w} na gali, na której wygrał już {n} razy z rzędu. Można to rozdmuchać za {mm}.','The media write about {w}\'s "curse" at the show where he has won {n} times in a row. You can hype it for {mm}.'],v:()=>{let best=null;mine().forEach(w=>{if(!w.sk)return;Object.keys(w.sk.pv).forEach(k=>{const q=w.sk.pv[k];if(q.s>=3&&(!best||q.s>best.n))best={w:w.name,id:w.id,n:q.s}})});return Object.assign({w:best?best.w:'?',id:best?best.id:'',n:best?best.n:0},cm(.07))},gate:KG(()=>mine().some(w=>w.sk&&Object.keys(w.sk.pv).some(k=>w.sk.pv[k].s>=3))&&rnd()<.35),o:[['Rozdmuchaj legendę ({mm})','Hype the legend ({mm})'],['Zignoruj','Ignore it']],cost:[1,0],n:[['Bilety na tę galę rozchodzą się szybciej.','Tickets for that show sell faster.'],['Temat cichnie.','The topic dies down.']],fx:[v=>{xcash(-v.c);xpop(.7);xconf(2)},()=>{}]},
{k:'skdare',t:['Młody chce przerwać serię','A rookie wants to end the streak'],b:['Ambitny nowicjusz domaga się walki z {w} ({n} wygranych), by przerwać serię.','An ambitious rookie demands a match with {w} ({n} wins) to end his streak.'],v:kv('w',5),gate:KG(()=>!!kp('w',5)&&rnd()<.3),o:[['Zgódź się na pojedynek','Grant the match'],['Odmów','Refuse']],n:[['Zainteresowanie rośnie przed walką.','Interest grows ahead of the match.'],['Nowicjusz jest rozgoryczony.','The rookie is bitter.']],fx:[()=>{xpop(.3);xmood(1)},()=>{xmood(-1)}]}
].forEach(XE)}
Object.assign(D,{'nav.sk':['Serie','Streaks'],'sk.sub':['Serie wygranych i przegranych Twoich zawodników oraz serie na konkretnych galach PPV, jak legendarna passa na jednej wielkiej gali. Długa seria podbija ocenę walki, a jej przerwanie jest wielkim momentem.','Win and loss streaks of your wrestlers, plus streaks at a specific PPV, like a legendary run at one big show. A long streak lifts a match\'s rating and ending it is a big moment.'],
 'sk.cw':['Serie wygranych','Win streaks'],'sk.cl':['Serie przegranych','Loss streaks'],'sk.cp':['Serie na galach PPV','Streaks at PPVs'],'sk.rec':['Rekordy federacji','Promotion records'],'sk.log':['Zakończone serie','Ended streaks'],
 'sk.rw':['Najdłuższa seria wygranych','Longest win streak'],'sk.rl':['Najdłuższa seria przegranych','Longest loss streak'],'sk.rp':['Najdłuższa seria na jednej gali','Longest streak at one show'],
 'sk.none':['Brak aktywnych serii.','No active streaks.'],'sk.nonep':['Brak serii na galach PPV (od 2 wygranych z rzędu na tej samej gali).','No PPV streaks yet (from 2 wins in a row at the same show).'],'sk.nolog':['Żadna seria jeszcze się nie zakończyła.','No streak has ended yet.'],
 'sk.w':['W','W'],'sk.l':['P','L'],'sk.winH':['Seria wygranych','Win streak'],'sk.lossH':['Seria przegranych','Loss streak'],'sk.gagtag':['gag','gag'],
 'sk.lg.w':['{w}: koniec serii {n} wygranych (pokonał go: {by}).','{w}: {n}-win streak ended (beaten by {by}).'],'sk.lg.p':['{w}: koniec serii {n} wygranych na {p} (pokonał go: {by}).','{w}: {n}-win streak at {p} ended (beaten by {by}).'],'sk.lg.l':['{w}: koniec {n} porażek z rzędu.','{w}: ended a {n}-loss streak.'],
 'n.skwin':['{w} ma już {n} wygranych z rzędu!','{w} is on a {n}-win streak!'],'n.skend':['{by} przerywa serię {n} wygranych {w}!','{by} end {w}\'s {n}-win streak!'],'n.skloss':['{w} przegrywa {n}. walkę z rzędu.','{w} loses a {n}th straight match.'],
 'n.skbreakl':['{w} wygrywa po {n} porażkach z rzędu! Hala szaleje.','{w} wins after {n} straight losses! The arena erupts.'],'n.skppv':['{w} wygrywa {n}. raz z rzędu na gali {p}.','{w} wins at {p} for the {n}th time in a row.'],'n.skppvend':['Koniec legendy: {by} przerywa serię {n} wygranych {w} na gali {p}!','End of a legend: {by} end {w}\'s {n}-win streak at {p}!']});
