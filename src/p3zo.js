// ---- v85: booker wallet + hobby: trading-card collection (wrestler booster packs) ----
const TCG_R=['c','u','r','e','l'],TCG_W=[55,25,12,6,2],TCG_SELL={c:10,u:25,r:80,e:300,l:1200};
const TCG_PACKS={std:{p:200,n:5},fed:{p:350,n:5},pre:{p:900,n:5},col:{p:4000,n:6}};
function meW(){if(!G.me)return null;const m=G.me;if(m.wallet==null){m.wallet=0;m.col={};m.free={std:0,pre:0};m.opened=0;m.ms={};m.sel='gwf'}return m}
function meSalary(){return Math.round([400,1500,5000,16000,45000][clamp(G.fed.tier,1,5)-1]*(1+(boardEnsure().conf-50)/250))}
const _iw2=infraWeekly;infraWeekly=function(){_iw2();const m=meW();if(m)m.wallet+=meSalary()};
const TCG_TM=[1,1.5,3,8,20];
function tcgPrice(k){return Math.max(10,Math.round(TCG_PACKS[k].p*TCG_TM[clamp(G.fed.tier,1,5)-1]/10)*10)}
function tcgRar(w){const p=w.pop||0;return p>=82?'l':p>=66?'e':p>=48?'r':p>=28?'u':'c'}
function tcgPool(fed){return G.ws.filter(w=>w.fed!=='RET'&&w.name&&w.look&&(!fed||w.fed===fed))}
function fedShort(id){if(id==='FA')return t('tcg.fa');if(id==='PRO')return t('tcg.pro');const f=(PACK.feds||[]).find(x=>x.id===id);return f?(f.short||f.name):id}
function tcgDraw(kind,fed){const def=TCG_PACKS[kind];let pool=tcgPool(kind==='fed'?fed:null);if(pool.length<5)pool=tcgPool(null);
 const by={c:[],u:[],r:[],e:[],l:[]};pool.forEach(w=>by[tcgRar(w)].push(w));const out=[];
 for(let i=0;i<def.n;i++){let want;let r=rnd()*100,a=0;want='c';for(let k=0;k<5;k++){a+=TCG_W[k];if(r<a){want=TCG_R[k];break}}
  if(kind==='pre'&&i===def.n-1&&TCG_R.indexOf(want)<2)want=rnd()<.8?'r':'e';
  if(kind==='col'){if(i===def.n-1)want=rnd()<.15?'l':'e';else if(TCG_R.indexOf(want)<1)want='u'}
  let idx=TCG_R.indexOf(want),c=null;for(let d=0;d<5&&!c;d++){for(const j of [idx+d,idx-d]){if(j>=0&&j<5&&by[TCG_R[j]].length){c=pickR(by[TCG_R[j]]);break}}}
  if(!c)continue;const foil=rnd()<(kind==='col'?.2:.06);out.push({id:c.id,n:c.name,f:c.fed,r:tcgRar(c),l:c.look,c:c.country,g:c.g||'m',p:Math.round(c.pop||0),foil})}
 return out}
function tcgOpen(kind,fed){const m=meW();const cards=tcgDraw(kind,fed);m.opened++;const nw=[];
 cards.forEach(c=>{const e=m.col[c.id]||(m.col[c.id]={card:c,n:0,fo:0});e.card=Object.assign({},e.card||c,{foil:e.card&&e.card.foil||c.foil});if(e.n===0)nw.push(c.id);if(e.n===0){const w0=W(c.id);if(w0&&w0.fed!==G.fed.id&&w0.fed!=='RET'){w0.rev=1;c._rv=1;if(TCG_R.indexOf(c.r)>=2||c.foil){try{trOf(w0)}catch(x){};w0.trv=1;c._rv=2}}}e.n++;if(c.foil)e.fo++;c._new=e.n===1;
  const w=W(c.id);if(w&&w.fed===G.fed.id&&e.n===1){evMood(w,3)}});
 tcgMilestones();try{save()}catch(e){};return cards}
const TCG_MS=[10,25,50,100,200,400,800];
function tcgUnique(){const m=meW();return m?Object.keys(m.col).length:0}
function tcgMilestones(){const m=meW();const u=tcgUnique();TCG_MS.forEach((n,i)=>{if(u>=n&&!m.ms['u'+n]){m.ms['u'+n]=1;const r=Math.round(500*Math.pow(3.2,i));m.wallet+=r;addNews('n.tcgm',{n,m:money(r)})}});
 const mine1=Object.values(m.col).filter(e=>e.card.f===G.fed.id).length,tot=tcgPool(G.fed.id).length;
 if(tot>=6&&!m.ms.own50&&mine1>=tot*.5){m.ms.own50=1;mine().forEach(w=>evMood(w,3));addNews('n.tcgo',{p:50})}
 if(tot>=6&&!m.ms.own100&&mine1>=tot){m.ms.own100=1;mine().forEach(w=>evMood(w,5));G.fed.pop=clamp(G.fed.pop+.5,2,100);addNews('n.tcgo',{p:100})}
 if(Object.values(m.col).some(e=>e.card.r==='l')&&!m.ms.leg){m.ms.leg=1;G.ach=G.ach||{};G.ach.tcgleg=G.week}}
function tcgCardHtml(c,i){return '<div class="tcg r-'+c.r+(c.foil?' foil':'')+'" style="animation-delay:'+((i||0)*.18)+'s"><div class="tc-top"><span>'+t('tcg.r.'+c.r)+'</span><span>'+(c.foil?'✨':'')+(c._new?' <b>NEW</b>':'')+'</span></div>'+(c._rv?'<div class="tc-rv">🔍 '+t(c._rv===2?'tcg.rv2':'tcg.rv1')+'</div>':'')+'<div class="tc-av">'+avatar(c.l,72)+'</div><b class="tc-n">'+esc(c.n)+'</b><div class="tc-s">'+esc(fedShort(c.f))+' · '+esc(cn(c.c))+'</div><div class="tc-p">★ '+c.p+'</div></div>'}
function tcgDups(){const m=meW();let v=0,n=0;Object.values(m.col).forEach(e=>{if(e.n>1){const x=e.n-1;n+=x;v+=x*TCG_SELL[e.card.r]*(e.fo>0?2:1)}});return {n,v}}
function vHobby(){const m=meW();if(!m)return '<div class="top"><div><h2>'+t('nav.hobby')+'</h2></div></div><div class="card mute">'+t('tcg.nome')+'</div>';
 const fs=(PACK.feds||[]).filter(f=>tcgPool(f.id).length>=5);if(!fs.some(f=>f.id===m.sel))m.sel=G.fed.id;
 const dp=tcgDups(),u=tcgUnique(),all=tcgPool(null).length;
 if(m.hobbyOff)return '<div class="top"><div><h2>'+t('nav.hobby')+'</h2></div></div><div class="card mute">'+t('tcg.off')+'</div>';
 let h='<div class="top"><div><h2>'+t('nav.hobby')+'</h2><div class="mute">'+t('tcg.sub')+'<br>'+t('tcg.rvnote')+'</div></div></div>';
 h+='<div class="card"><div class="grid g3" style="gap:10px"><div><div class="px">'+t('tcg.wallet')+'</div><b>'+money(m.wallet)+'</b></div><div><div class="px">'+t('tcg.sal')+'</div><b>'+money(meSalary())+'</b></div><div><div class="px">'+t('tcg.col')+'</div><b>'+u+' / '+all+'</b></div></div></div>';
 const btn=(k,extra)=>{const pr=tcgPrice(k),free=(k==='std'||k==='pre')&&m.free[k]>0;return '<button class="btn'+(free?' gold':'')+'" data-act="tcgbuy" data-k="'+k+'"'+((!free&&m.wallet<pr)?' disabled':'')+'>'+t('tcg.p.'+k)+' · '+(free?t('tcg.free',{n:m.free[k]}):money(pr))+'</button>'};
 h+='<div class="card stack"><h3>'+t('tcg.packs')+'</h3><div class="row" style="gap:8px;flex-wrap:wrap">'+btn('std')+btn('pre')+btn('col')+'</div><div class="row" style="gap:8px;flex-wrap:wrap"><select id="hfed" class="field" style="width:auto" data-chg="hfed">'+fs.map(f=>'<option value="'+f.id+'"'+(m.sel===f.id?' selected':'')+'>'+esc(f.short||f.name)+'</option>').join('')+'</select>'+btn('fed')+'</div><div class="mute" style="font-size:13px">'+t('tcg.odds')+'</div></div>';
 h+='<div class="card stack"><div class="row spread"><h3>'+t('tcg.dups')+'</h3><button class="btn sm" data-act="tcgsell"'+(dp.n?'':' disabled')+'>'+t('tcg.sell',{n:dp.n,m:money(dp.v)})+'</button></div></div>';
 const rc={c:0,u:0,r:0,e:0,l:0};Object.values(m.col).forEach(e=>rc[e.card.r]++);
 h+='<div class="card stack"><h3>'+t('tcg.stats')+'</h3><div class="row" style="gap:6px;flex-wrap:wrap">'+TCG_R.map(r=>'<span class="tag">'+t('tcg.r.'+r)+': '+rc[r]+'</span>').join('')+'<span class="tag">'+t('tcg.opened',{n:m.opened})+'</span></div></div>';
 const fl=m.flt||'all';
 const list=Object.values(m.col).filter(e=>fl==='all'||e.card.f===fl).sort((a,b)=>TCG_R.indexOf(b.card.r)-TCG_R.indexOf(a.card.r)||b.card.p-a.card.p);
 const fedsHave=[...new Set(Object.values(m.col).map(e=>e.card.f))];
 h+='<div class="card stack"><div class="row spread" style="gap:8px;flex-wrap:wrap"><h3>'+t('tcg.album')+'</h3><select id="hflt" class="field" style="width:auto" data-chg="hflt"><option value="all">'+t('start.all')+'</option>'+fedsHave.map(f=>'<option value="'+f+'"'+(fl===f?' selected':'')+'>'+esc(fedShort(f))+' ('+Object.values(m.col).filter(e=>e.card.f===f).length+')</option>').join('')+'</select></div>'+(list.length?'<div class="tcggrid">'+list.slice(0,120).map(e=>tcgCardHtml(Object.assign({},e.card,{_new:false,_rv:0}),0).replace('</div><div class="tc-av">','<span class="tc-x">×'+e.n+'</span></div><div class="tc-av">')).join('')+'</div>':'<div class="mute">'+t('ui.none')+'</div>')+'</div>';
 return h}
function tcgModal(cards){return '<div class="row spread"><h2>'+t('tcg.open')+'</h2><button class="btn gold" data-act="tcgclose">'+t('tcg.ok')+'</button></div><div class="tcggrid">'+cards.map((c,i)=>tcgCardHtml(c,i)).join('')+'</div>'}
/* ---- hobby events ---- */
E('tcg.find','Znalezisko na pchlim targu','Flea-market find','Na pchlim targu trafiasz na nieotwartą paczkę kart z wrestlerami. Sprzedawca chce za nią symboliczną sumę.','You stumble on a sealed pack of wrestler cards at a flea market. The seller wants a token sum.',[['Kup i dostań darmową paczkę premium','Buy it, get a free premium pack'],['Przejdź obok','Walk past']]);
E('tcg.trade','Kolekcjoner proponuje wymianę','Collector offers a trade','Zapalony kolekcjoner chce wykupić Twoje duplikaty z dopłatą ({m}).','An avid collector wants to buy your duplicates at a premium ({m}).',[['Sprzedaj duplikaty ({m})','Sell duplicates ({m})'],['Zatrzymaj','Keep them']]);
E('tcg.fake','Podróbka karty','Counterfeit card','Ktoś oferuje „unikatową" kartę legendy za wysoką cenę. Może to podróbka.','Someone offers a "one-of-a-kind" legend card for a high price. It might be a fake.',[['Kup ({m})','Buy ({m})'],['Sprawdź autentyczność','Check authenticity']]);
E('tcg.sign','Autograf na karcie','Signed card','Zawodnik z Twojego składu prosi, by podpisać jego kartę z Twojej kolekcji. Sam się wzruszył.','A wrestler on your roster asks to sign his card in your collection. He is touched.',[['Zgódź się','Agree'],['Odmów','Decline']]);
Object.assign(D,{'nav.hobby':['Hobby','Hobby'],'tcg.rv1':['odkryty potencjał','potential revealed'],'tcg.rv2':['odkryta cecha i potencjał','trait and potential revealed'],'tcg.off':['Hobby jest wyłączone. Włącz je w zakładce Majątek.','The hobby is turned off. Turn it on in the Wealth tab.'],'tcg.rvnote':['Pierwsza karta zawodnika spoza Twojej federacji odsłania jego potencjał. Rzadkie, epickie, legendarne i foliowe odkrywają też cechę.','The first card of a wrestler outside your federation reveals his potential. Rare, epic, legendary and foil cards also reveal his trait.'],'tcg.nome':['Hobby odblokuje się po utworzeniu postaci.','The hobby unlocks once your character exists.'],'tcg.sub':['Twoje prywatne hobby: kolekcjonowanie kart wrestlerów. Płacisz z osobnego konta bookera.','Your private hobby: collecting wrestler cards. You pay from your personal booker wallet.'],
 'tcg.wallet':['Portfel bookera','Booker wallet'],'tcg.sal':['Pensja tygodniowo','Weekly salary'],'tcg.col':['Kolekcja','Collection'],'tcg.packs':['Paczki','Packs'],'tcg.free':['darmowych: {n}','free: {n}'],'tcg.odds':['Szanse (standard): zwykła 55%, niezwykła 25%, rzadka 12%, epicka 6%, legendarna 2%. Premium daje gwarantowaną rzadką lub lepszą, Kolekcjonerska – epicką lub lepszą.','Odds (standard): common 55%, uncommon 25%, rare 12%, epic 6%, legendary 2%. Premium guarantees a rare or better, Collector an epic or better.'],
 'tcg.p.std':['Paczka standard','Standard pack'],'tcg.p.pre':['Paczka premium','Premium pack'],'tcg.p.col':['Paczka kolekcjonerska','Collector pack'],'tcg.p.fed':['Paczka federacji','Federation pack'],
 'tcg.dups':['Duplikaty','Duplicates'],'tcg.sell':['Sprzedaj {n} dup. za {m}','Sell {n} dupes for {m}'],'tcg.stats':['Statystyki','Statistics'],'tcg.opened':['Otwartych paczek: {n}','Packs opened: {n}'],'tcg.album':['Album','Album'],'tcg.open':['Otwieranie paczki','Opening pack'],'tcg.ok':['Do albumu','To the album'],
 'tcg.r.c':['Zwykła','Common'],'tcg.r.u':['Niezwykła','Uncommon'],'tcg.r.r':['Rzadka','Rare'],'tcg.r.e':['Epicka','Epic'],'tcg.r.l':['Legendarna','Legendary'],'tcg.fa':['Wolny agent','Free agent'],'tcg.pro':['Zawodowiec','Pro'],
 'n.tcgm':['Kolekcja: {n} różnych kart – nagroda {m}.','Collection: {n} different cards – reward {m}.'],'n.tcgo':['Kolekcja Twojej federacji: {p}% – szatnia się cieszy.','Your federation\'s set: {p}% – the locker room is delighted.'],
 'n.tf1':['Okazja na targu – darmowa paczka premium.','A flea-market bargain – a free premium pack.'],'n.tf2':['Paczka została na targu.','The pack stayed at the market.'],'n.tt1':['Duplikaty sprzedane kolekcjonerowi.','Duplicates sold to the collector.'],'n.tt2':['Duplikaty zostają w pudełku.','Duplicates stay in the box.'],
 'n.tfk1':['Karta okazała się podróbką – strata.','The card was a fake – a loss.'],'n.tfk2':['Autentyczna! Karta legendy trafia do albumu.','Authentic! The legend card goes into your album.'],'n.tfk3':['Sprawdzenie ujawniło podróbkę – unikasz oszustwa.','The check exposed a fake – you dodge the scam.'],
 'n.ts1':['Podpisana karta – zawodnik wzruszony.','The signed card – the wrestler is touched.'],'n.ts2':['Odmowa autografu.','Autograph refused.']});
Object.assign(WEV,{
 async tcgfind(){const m=meW();if(!m||m.hobbyOff||G.week<8)return false;const i=await evx('tcg.find',{},['1','2'],[m.wallet<100,false]);if(i===0){m.wallet-=100;m.free.pre++;addNews('n.tf1')}else addNews('n.tf2');return true},
 async tcgtrade(){const m=meW();if(!m||m.hobbyOff)return false;const d=tcgDups();if(d.n<4)return false;const v=Math.round(d.v*1.5);const i=await evx('tcg.trade',{m:money(v)},['1','2'],[false,false]);if(i===0){Object.values(m.col).forEach(e=>{e.n=1;e.fo=Math.min(e.fo,1)});m.wallet+=v;addNews('n.tt1')}else addNews('n.tt2');return true},
 async tcgfake(){const m=meW();if(!m||m.hobbyOff||tcgUnique()<8)return false;const c=Math.max(1500,Math.round(m.wallet*.15));if(m.wallet<c)return false;const i=await evx('tcg.fake',{m:money(c)},['1','2'],[false,false]);
  if(i===0){m.wallet-=c;if(rnd()<.45){const lg=tcgPool(null).sort((a,b)=>b.pop-a.pop)[0];if(lg){const cd={id:lg.id,n:lg.name,f:lg.fed,r:'l',l:lg.look,c:lg.country,g:lg.g||'m',p:Math.round(lg.pop),foil:true};const e=m.col[cd.id]||(m.col[cd.id]={card:cd,n:0,fo:0});e.n++;e.fo++;addNews('n.tfk2')}}else addNews('n.tfk1')}else addNews('n.tfk3');return true},
 async tcgsign(){const m=meW();if(!m||m.hobbyOff||tcgUnique()<5)return false;const l=Object.values(m.col).map(e=>W(e.card.id)).filter(w=>w&&w.fed===G.fed.id);if(!l.length)return false;const w=pickR(l);const i=await evx('tcg.sign',{},['1','2'],[false,false]);if(i===0){evMood(w,7);addNews('n.ts1')}else addNews('n.ts2');return true}
});
