;/* ===== Card market: foil, signed and federation-belt cards; auctions, grading, market index ===== */
(function(){
Object.assign(D,{'nav.cmk':['Rynek kart','Card market'],
'cm.title':['Rynek kart','Card market'],
'cm.sub':['Ceny kart żyją własnym życiem: zależą od rzadkości, folii, podpisu, oceny, indeksu rynku i formy zawodnika lub federacji. Sprzedaj od ręki taniej albo wystaw na aukcję.','Card prices have a life of their own: rarity, foil, signature, grade, the market index and the form of the wrestler or federation all matter. Sell instantly for less, or auction.'],
'cm.idx':['Indeks rynku','Market index'],'cm.wallet':['Portfel bookera','Booker wallet'],'cm.earn':['Zarobione na rynku','Earned on the market'],
'cm.mine':['Twoje karty','Your cards'],'cm.f.foil':['Foil ✨','Foil ✨'],'cm.f.dup':['Duplikaty','Duplicates'],'cm.f.all':['Wszystkie','All'],'cm.f.sig':['Z podpisem ✒️','Signed ✒️'],'cm.f.belt':['Pasy 🏆','Belts 🏆'],
'cm.none':['Brak kart pasujących do filtra.','No cards match this filter.'],'cm.last':['ostatnia kopia – zostaje w albumie','last copy – stays in the album'],
'cm.fair':['Wartość','Value'],'cm.shop':['Do sklepu {m}','To shop {m}'],'cm.auc':['Aukcja…','Auction…'],'cm.grade':['Oceń {m}','Grade {m}'],'cm.ask':['Poproś o podpis','Ask for a signature'],
'cm.gr':['Ocena {g}/10','Grade {g}/10'],'cm.lst':['Aktywne aukcje','Active auctions'],'cm.nolst':['Brak aukcji.','No auctions.'],
'cm.lstrow':['cena {p} · jeszcze {w} tyg.','ask {p} · {w} wk left'],'cm.cancel':['Wycofaj','Withdraw'],
'cm.off':['Oferty sprzedawców','Dealer offers'],'cm.buy':['Kup {m}','Buy {m}'],'cm.deal':['OKAZJA','DEAL'],
'cm.offnone':['Dziś nic ciekawego. Wróć za parę tygodni.','Nothing interesting today. Check back in a few weeks.'],
'cm.bpx':['Paczka z pasami federacji','Federation belt pack'],'cm.bps':['4 karty z pasami federacji. Im większa federacja i ważniejszy tytuł, tym rzadsza karta.','4 federation belt cards. The bigger the federation and the more important the title, the rarer the card.'],
'cm.bpbuy':['Kup paczkę {m}','Buy pack {m}'],'cm.bpopen':['Paczka z pasami','Belt pack'],
'cm.sg':['Podpis','Signed'],'cm.sgfound':['Wyjątkowo rzadka karta z podpisem zawodnika „{n}"!','An exceptionally rare card signed by "{n}"!'],
'cm.q.auc':['Za ile wystawić kartę „{n}"? Wartość rynkowa: {v}. Prowizja serwisu 5%. Aukcja trwa do 4 tygodni.','At what price should "{n}" go up? Market value: {v}. Platform fee 5%. The auction runs up to 4 weeks.'],
'cm.q.o1':['Taniej ({p}) · duża szansa na sprzedaż','Cheap ({p}) · high chance to sell'],'cm.q.o2':['Rynkowa ({p}) · średnia szansa','Market ({p}) · medium chance'],'cm.q.o3':['Wysoka ({p}) · mała szansa','High ({p}) · low chance'],'cm.q.o4':['Marzenie ({p}) · bardzo mała szansa','Dream ({p}) · very low chance'],'cm.q.no':['Anuluj','Cancel'],
'cm.q.gr':['Ocena kosztuje {m}. Wynik jest losowy: od słabej po idealną dziesiątkę. Ocena zostaje na stałe.','Grading costs {m}. The result is random, from poor to a perfect ten. The grade is permanent.'],'cm.q.gyes':['Oceń kartę','Grade the card'],
'cm.msg.nomoney':['Za mało pieniędzy w portfelu.','Not enough money in the wallet.'],'cm.msg.sold':['Sprzedano „{n}" za {m}.','Sold "{n}" for {m}.'],'cm.msg.listed':['Wystawiono „{n}" za {m}.','Listed "{n}" for {m}.'],'cm.msg.bought':['Kupiono „{n}" za {m}.','Bought "{n}" for {m}.'],'cm.msg.graded':['„{n}": ocena {g}/10.','"{n}": grade {g}/10.'],
'cm.msg.signok':['{n} podpisał kartę. Wyjątkowo rzadkie trafienie!','{n} signed the card. An exceptionally rare hit!'],'cm.msg.signno':['{n} nie ma dziś nastroju na autografy.','{n} is not in the mood for autographs today.'],'cm.msg.signcd':['{n} podpisywał niedawno. Spróbuj za kilka tygodni.','{n} signed recently. Try again in a few weeks.'],
'cm.msg.signdup':['Do podpisu potrzebny jest zapasowy egzemplarz karty.','A spare copy of the card is needed for the signature.'],
'n.cmsold':['Aukcja: „{n}" sprzedana za {m}.','Auction: "{n}" sold for {m}.'],'n.cmexp':['Aukcja wygasła, „{n}" wraca do kolekcji.','Auction ended, "{n}" returns to your collection.'],
'n.cmboom':['Rynek kart szaleje – ceny idą w górę o {p}%.','The card market is booming – prices up {p}%.'],'n.cmcrash':['Krach na rynku kart – ceny spadają o {p}%.','The card market crashed – prices down {p}%.'],'n.cmsig':['Wypadła karta z podpisem: {n}.','A signed card dropped: {n}.'],
'cm.ev1.t':['Zjazd kolekcjonerów','Collectors\' convention'],'cm.ev1.b':['W mieście trwa wielki zjazd kolekcjonerów. Ludzie szukają rzadkich kart i płacą ponad cenę. Twoja „{n}" przyciąga uwagę. Sprzedasz za {m}?','A big collectors\' convention is in town. People hunt rare cards and overpay. Your "{n}" draws attention. Sell for {m}?'],
'cm.ev1.o1':['Sprzedaj','Sell'],'cm.ev1.o2':['Zostaw w kolekcji','Keep it'],
'cm.ev2.t':['Anonimowy kolekcjoner','Anonymous collector'],'cm.ev2.b':['Ktoś pisze do Ciebie, że chce kupić „{n}" za {m}, czyli sporo ponad rynek.','Someone messages you offering {m} for "{n}", well above market.'],
'cm.ev2.o1':['Sprzedaj','Sell'],'cm.ev2.o2':['Odmów','Decline']});
Object.assign(D,{'tcg.p.std':['Paczka zwykła','Standard pack'],'tcg.p.pre':['Paczka gwarantowana (min. 1 niebieska)','Guaranteed pack (min. 1 blue)'],
'tcg.odds':['Zwykła paczka to 5 losowych kart. Gwarantowana ma co najmniej jedną niebieską (rzadką) lub lepszą. W każdej paczce trafiają się zawodnicy, menedżerowie i pasy federacji, a bardzo rzadko karta z podpisem.','A standard pack is 5 random cards. The guaranteed pack has at least one blue (rare) card or better. Every pack can hold wrestlers, managers and federation belts, and very rarely a signed card.']});
const _vhM=vHobby;vHobby=function(){let h=_vhM.apply(this,arguments);try{h=h.replace(/<button[^>]*data-k="col"[^>]*>.*?<\/button>/,'').replace(/<div class="row" style="gap:8px;flex-wrap:wrap"><select id="hfed"[\s\S]*?<\/select><button[^>]*data-k="fed"[^>]*>.*?<\/button><\/div>/,'').replace(/<button[^>]*data-k="mgr"[^>]*>.*?<\/button>/,'')}catch(e){}return h};
const GRM={10:2.5,9:1.6,8:1.2,7:1,6:.7,5:.45},FOILX=6,SIGX=22,CD=12;
const AUC=[[.85,'cm.q.o1'],[1,'cm.q.o2'],[1.3,'cm.q.o3'],[1.7,'cm.q.o4']];
const SGP={std:.0015,fed:.0015,pre:.004,col:.012};
function C(){if(!G.cmk)G.cmk={idx:1,h:[1],lst:[],off:[],ow:0,earn:0,sgw:{}};return G.cmk}
function store(){const m=meW();if(!m.sg)m.sg=[];if(!m.bc)m.bc={};return m}
const sc=()=>TCG_TM[clamp(G.fed.tier||1,1,5)-1];
/* ---------- federation belt cards ---------- */
const KF={world:1,second:.8,tag:.72};
function hashN(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function fedPop(id){if(id===G.fed.id)return G.fed.pop;const r=(G.rivals||[]).find(x=>x.id===id);if(r)return r.pop;const f=(PACK.feds||[]).find(x=>x.id===id);return f?f.pop:30}
function beltSnap(tt){return {kind:tt.kind,teams:tt.teams,strap:tt.strap,strap2:tt.strap2,plate:tt.plate,pat:tt.pat,mainShape:tt.mainShape,sideShape:tt.sideShape,sideN:tt.sideN,mainEmb:tt.mainEmb,sideEmb:tt.sideEmb,mainImg:tt.mainImg,sideImg:tt.sideImg,txt:tt.txt,name:titleName(tt)}}
function beltPool(){const out=[];const plates=['gold','silver','bronze','black','blue','red'],pats=['plain','stripe','dots'];
 (PACK.feds||[]).forEach(f=>{const own=f.id===G.fed.id;const base=own?G.titles.filter(x=>x.holders!==undefined):defaultTitles(f.tier||1);
  base.forEach(tt=>{let snap;if(own)snap=beltSnap(tt);else{const h=hashN(f.id+tt.id);snap=beltSnap(Object.assign({},tt,{name:(f.short||f.name)+' '+t(tt.kind==='world'?'t.world':tt.kind==='second'?'t.second':'t.tag'),plate:plates[h%plates.length],strap2:f.color||'#f2c94c',pat:pats[(h>>3)%pats.length]}))}
   const k=KF[tt.kind]||.7,p=fedPop(f.id)*k;out.push({id:'B:'+f.id+':'+tt.id,n:snap.name,f:f.id,r:tcgRar({pop:p}),p:Math.round(p),tt:snap})})});return out}
function beltDraw(n){const pool=beltPool();if(pool.length<3)return[];const by={c:[],u:[],r:[],e:[],l:[]};pool.forEach(c=>by[c.r].push(c));const out=[];
 for(let i=0;i<n;i++){let r=rnd()*100,a=0,want='c';for(let k=0;k<5;k++){a+=TCG_W[k];if(r<a){want=TCG_R[k];break}}if(i===n-1&&TCG_R.indexOf(want)<2)want=rnd()<.8?'r':'e';
  let idx=TCG_R.indexOf(want),c=null;for(let d=0;d<5&&!c;d++){for(const j of [idx+d,idx-d]){if(j>=0&&j<5&&by[TCG_R[j]].length){c=pickR(by[TCG_R[j]]);break}}}
  if(c)out.push(Object.assign({kind:'belt',foil:rnd()<.1},c))}return out}
function beltHtml(c,i){return '<div class="tcg r-'+c.r+(c.foil?' foil':'')+'" style="animation-delay:'+((i||0)*.18)+'s"><div class="tc-top"><span>'+esc(t('tcg.r.'+c.r))+'</span><span>'+(c.foil?'✨':'')+(c._new?' <b>NEW</b>':'')+'</span></div><div class="tc-av" style="height:auto;margin:6px 0">'+belt(c.tt,112)+'</div><b class="tc-n">'+esc(c.n)+'</b><div class="tc-s">'+esc(fedShort(c.f))+'</div><div class="tc-p">🏆</div></div>'}
/* ---------- value ---------- */
function heatOf(c){if(c.kind==='belt')return clamp((fedPop(c.f)*(KF[c.tt.kind]||.7)+12)/((c.p||30)+12),.6,1.8);const w=W(c.id);let k=1;if(w){k=clamp((w.pop+12)/((c.p||w.pop)+12),.6,1.8);try{if(isChamp(w.id))k*=1.2}catch(x){}if(w.fed==='RET')k*=1.25;if(w.injury>0)k*=.95}return k}
function valueOf(c,foil,gr,sig){const g=foil&&gr?GRM[gr]:1;return Math.max(5,Math.round(TCG_SELL[c.r]*sc()*(foil?FOILX:1)*(sig?SIGX:1)*g*C().idx*heatOf(c)/5)*5)}
/* ---------- inventory abstraction ---------- */
function count(row){return row.cnt}
function takeRow(row){const m=store();
 if(row.src==='s'){const i=m.sg.indexOf(row.it);if(i<0)return null;m.sg.splice(i,1);return {src:'s',card:row.it.card,foil:!!row.it.foil,gr:row.it.gr||0}}
 if(row.src==='b'){const e=m.bc[row.id];if(!e)return null;if(row.foil){if(e.fo<1)return null;e.fo--}else{if(e.n-e.fo<1)return null}e.n--;const gr=row.foil?e.gr||0:0;const card=e.card;if(e.n<=0)delete m.bc[row.id];return {src:'b',card,foil:row.foil,gr}}
 const e=m.col[row.id];if(!e)return null;if(row.foil){if(e.fo<1)return null;e.fo--}else{if(e.n-e.fo<1||e.n<2)return null}e.n--;const gr=row.foil?e.gr||0:0;const card=e.card;if(e.n<=0)delete m.col[row.id];return {src:'w',card,foil:row.foil,gr}}
function giveBack(it){const m=store();
 if(it.src==='s'){m.sg.push({card:it.card,foil:it.foil,gr:it.gr||0});return}
 const S=it.src==='b'?m.bc:m.col;const e=S[it.card.id]||(S[it.card.id]={card:Object.assign({},it.card),n:0,fo:0});e.n++;if(it.foil){e.fo++;if(it.gr)e.gr=it.gr;e.card.foil=true}}
function valOfItem(it){return valueOf(it.card,it.foil,it.gr,it.src==='s')}
function rowsAll(){const m=store();const f=UIc.f;const out=[];
 if(f==='sig'){m.sg.forEach((it,i)=>out.push({src:'s',it,id:'s'+i,card:it.card,foil:!!it.foil,gr:it.gr,cnt:1,v:valueOf(it.card,it.foil,it.gr,true)}));return out.sort((a,b)=>b.v-a.v)}
 if(f==='belt'){Object.entries(m.bc).forEach(([id,e])=>{const nn=e.n-e.fo;if(e.fo>0)out.push({src:'b',id,card:e.card,foil:true,gr:e.gr,cnt:e.fo,v:valueOf(e.card,true,e.gr)});if(nn>0)out.push({src:'b',id,card:e.card,foil:false,cnt:nn,v:valueOf(e.card,false),last:e.n<2&&e.fo===0?false:false})});return out.sort((a,b)=>b.v-a.v)}
 Object.entries(m.col).forEach(([id,e])=>{const nf=e.fo,nn=e.n-e.fo;
  if(nf>0&&(f==='foil'||f==='all'||(f==='dup'&&nf>1)))out.push({src:'w',id,card:e.card,foil:true,gr:e.gr,cnt:nf,v:valueOf(e.card,true,e.gr)});
  if(f!=='foil'&&nn>0&&(e.n>1||f==='all'))out.push({src:'w',id,card:e.card,foil:false,cnt:nn,v:valueOf(e.card,false),last:e.n<2})});
 return out.sort((a,b)=>b.v-a.v)}
const UIc={f:'foil'};
/* ---------- market tick ---------- */
const _ew4=endWeek;endWeek=function(){try{tick()}catch(e){}return _ew4.apply(this,arguments)};
function tick(){const m=meW();if(!m||m.hobbyOff)return;store();const c=C();let sh=0;const r=rnd();if(r<.035)sh=.22+rnd()*.12;else if(r<.07)sh=-.18-rnd()*.1;
 const old=c.idx;c.idx=clamp(c.idx+(1-c.idx)*.1+(rnd()-.5)*.1+sh,.55,1.9);c.h.push(Math.round(c.idx*1000)/1000);if(c.h.length>40)c.h.shift();
 if(sh>0)addNews('n.cmboom',{p:Math.round((c.idx/old-1)*100)});else if(sh<0)addNews('n.cmcrash',{p:Math.round((1-c.idx/old)*100)});
 c.lst=c.lst.filter(l=>{const f=valOfItem(l),ratio=l.ask/Math.max(5,f);const p=clamp(.95-(ratio-.85)*1.1,.04,.9);
  if(rnd()<p){const g=Math.round(l.ask*.95);m.wallet+=g;c.earn+=g;addNews('n.cmsold',{n:l.card.n,m:money(g)});return false}
  l.w--;if(l.w<=0){giveBack(l);addNews('n.cmexp',{n:l.card.n});return false}return true});
 if(c.ow<=G.week){c.ow=G.week+3+Math.floor(rnd()*3);c.off=mkOffers()}}
function mkOffers(){const pool=tcgPool(null);if(pool.length<5)return[];const out=[];const used=new Set();const bp=beltPool();
 for(let i=0;i<4;i++){const roll=rnd();
  if(roll<.2&&bp.length){const b=pickR(bp);if(used.has(b.id))continue;used.add(b.id);const foil=rnd()<.2,deal=rnd()<.2,cd=Object.assign({kind:'belt',foil},b);const v=valueOf(cd,foil);out.push({src:'b',card:cd,foil,deal,price:Math.max(10,Math.round(v*(deal?.85:1.3)/5)*5)});continue}
  const w=pickR(pool);if(used.has(w.id))continue;used.add(w.id);const sig=roll>.96,foil=!sig&&rnd()<.3,deal=rnd()<.25;const cd={id:w.id,n:w.name,f:w.fed,r:tcgRar(w),l:w.look,c:w.country,g:w.g||'m',p:Math.round(w.pop||0),foil};
  const v=valueOf(cd,foil,0,sig);out.push({src:sig?'s':'w',card:cd,foil,sig,deal,price:Math.max(10,Math.round(v*(deal?.85:1.3)/5)*5)})}return out}
/* ---------- signed pulls from packs ---------- */
let pend=[],pendB=[];
const _tdr=tcgDraw;tcgDraw=function(kind){let out=_tdr.apply(this,arguments);pend=[];pendB=[];
 try{if(kind==='std'||kind==='pre'){const pb=kind==='pre'?.12:.09,keep=[];out.forEach((c,i)=>{const guaranteed=kind==='pre'&&i===out.length-1;if(!guaranteed&&rnd()<pb){const b=beltDraw(1)[0];if(b){pendB.push(b);return}}keep.push(c)});out=keep;
   if(kind==='pre'&&!out.concat(pendB).some(c=>TCG_R.indexOf(c.r)>=2)){const b=beltDraw(1).find(x=>TCG_R.indexOf(x.r)>=2);if(b)pendB.push(b);else if(out.length)out[out.length-1]=mgDraw1('r')}}
  const ch=SGP[kind]||0;out.forEach((c,i)=>{if(ch&&W(c.id)&&rnd()<ch)pend.push(i)})}catch(e){}return out};
const _top=tcgOpen;tcgOpen=function(){const cards=_top.apply(this,arguments);try{const m=store();pend.forEach(i=>{const c=cards[i];if(!c)return;const cl=Object.assign({},c);delete cl._new;delete cl._rv;m.sg.push({card:cl,foil:!!c.foil,gr:0});c._sg=1;addNews('n.cmsig',{n:c.n})});
  pendB.forEach(c=>{const e=m.bc[c.id]||(m.bc[c.id]={card:Object.assign({},c,{foil:false}),n:0,fo:0});c._new=e.n===0;e.n++;if(c.foil)e.fo++;cards.push(c)})}catch(e){}pend=[];pendB=[];return cards};
const _tch=tcgCardHtml;tcgCardHtml=function(c,i){if(c&&c.kind==='belt')return beltHtml(c,i);let h=_tch.apply(this,arguments);if(c&&c._sg){h=h.replace('class="tcg ','class="tcg sig ').replace('<div class="tc-av">','<div class="tc-av"><svg class="tc-sg" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M4 22 C14 2 22 2 20 16 S30 26 38 10 S50 4 52 18 S64 26 70 12 S82 6 96 20" fill="none" stroke="#f5d76e" stroke-width="2.4" stroke-linecap="round"/></svg>')}return h};
try{const st=document.createElement('style');st.textContent='.tcg.sig{border-color:#f5d76e;box-shadow:0 0 14px #f5d76e99}.tcg .tc-av{position:relative}.tcg .tc-sg{position:absolute;left:0;right:0;bottom:2px;width:100%;height:28px;pointer-events:none;filter:drop-shadow(0 0 3px #000)}';document.head.appendChild(st)}catch(e){}
/* ---------- random events ---------- */
const _we7=weekEvents;weekEvents=async function(){try{const m=meW();if(m&&!m.hobbyOff&&G.week>10&&rnd()<.07){store();const rs=[];Object.entries(m.col).forEach(([id,e])=>{if(e.fo>0)rs.push({src:'w',id,card:e.card,foil:true,gr:e.gr})});m.sg.forEach((it,i)=>rs.push({src:'s',it,id:'s'+i,card:it.card,foil:!!it.foil,gr:it.gr}));
  if(rs.length){const row=pickR(rs),conv=rnd()<.5;const sig=row.src==='s';const v=Math.round(valueOf(row.card,row.foil,row.gr,sig)*(conv?1.4:1.8)/5)*5;
  const k=conv?'cm.ev1':'cm.ev2';const i=await askGeneric(esc(t(k+'.t')),esc(t(k+'.b',{n:row.card.n,m:money(v)})),[{l:esc(t(k+'.o1'))},{l:esc(t(k+'.o2'))}]);
  if(i===0&&takeRow(row)){m.wallet+=v;C().earn+=v;if(conv)C().idx=clamp(C().idx+.06,.55,1.9)}}}}catch(x){}return _we7.apply(this,arguments)};
const _td=tcgDups;tcgDups=function(){const d=_td.apply(this,arguments);try{return{n:d.n,v:Math.round(d.v*C().idx)}}catch(e){return d}};
/* ---------- screen ---------- */
function spark(){const h=C().h;if(h.length<2)return'';const W0=300,H=60,mn=Math.min(...h,.9),mx=Math.max(...h,1.1);const pts=h.map((v,i)=>(i/(h.length-1)*W0).toFixed(1)+','+(H-(v-mn)/(mx-mn)*(H-8)-4).toFixed(1)).join(' ');
 const y1=(H-(1-mn)/(mx-mn)*(H-8)-4).toFixed(1);return '<svg viewBox="0 0 '+W0+' '+H+'" width="100%" height="64" preserveAspectRatio="none" style="max-width:420px"><line x1="0" x2="'+W0+'" y1="'+y1+'" y2="'+y1+'" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="3 3"/><polyline points="'+pts+'" fill="none" stroke="var(--gold)" stroke-width="2"/></svg>'}
const cardHtml=(c,i,foil,sig)=>c.kind==='belt'?beltHtml(Object.assign({},c,{foil,_new:false}),i):tcgCardHtml(Object.assign({},c,{foil,_new:false,_sg:sig?1:0}),i);
NEWV.cmk=function(){const m=meW();let h='<div class="top"><div><h2>'+esc(t('cm.title'))+'</h2><div class="mute" style="max-width:70ch">'+esc(t('cm.sub'))+'</div></div></div>';
 if(!m)return h+'<div class="card mute">'+esc(t('tcg.nome'))+'</div>';if(m.hobbyOff)return h+'<div class="card mute">'+esc(t('tcg.off'))+'</div>';store();
 const c=C(),ip=Math.round((c.idx-1)*100);if(!c.off.length&&c.ow<=G.week){c.ow=G.week+3;c.off=mkOffers()}
 h+='<div class="card"><div class="grid g3" style="gap:10px"><div><div class="px">'+esc(t('cm.wallet'))+'</div><b>'+money(m.wallet)+'</b></div><div><div class="px">'+esc(t('cm.idx'))+'</div><b style="color:'+(ip>=0?'var(--pos,#6c6)':'var(--neg,#e66)')+'">'+(ip>=0?'▲ +':'▼ ')+ip+'%</b></div><div><div class="px">'+esc(t('cm.earn'))+'</div><b>'+money(c.earn)+'</b></div></div><div style="margin-top:8px">'+spark()+'</div></div>';
 if(G.cmmsg)h+='<div class="note">'+esc(G.cmmsg)+'</div>';
 h+='<div class="card stack"><h3>'+esc(t('cm.off'))+'</h3>'+(c.off.length?'<div class="tcggrid">'+c.off.map((o,i)=>'<div class="stack" style="gap:4px;align-items:stretch">'+cardHtml(o.card,i,o.foil,o.sig)+(o.deal?'<div class="tag" style="color:var(--gold);align-self:center">'+esc(t('cm.deal'))+'</div>':'')+(o.sig?'<div class="tag" style="color:#f5d76e;align-self:center">✒️ '+esc(t('cm.sg'))+'</div>':'')+'<button class="btn sm gold" data-act="cmbuy" data-i="'+i+'"'+(m.wallet<o.price?' disabled':'')+'>'+esc(t('cm.buy',{m:money(o.price)}))+'</button></div>').join('')+'</div>':'<div class="mute">'+esc(t('cm.offnone'))+'</div>')+'</div>';
 h+='<div class="card stack"><h3>'+esc(t('cm.lst'))+'</h3>'+(c.lst.length?c.lst.map((l,i)=>'<div class="row spread" style="gap:8px;flex-wrap:wrap"><span><b>'+esc(l.card.n)+'</b>'+(l.foil?' ✨':'')+(l.src==='s'?' ✒️':'')+(l.gr?' <span class="tag">'+esc(t('cm.gr',{g:l.gr}))+'</span>':'')+' <span class="mute">· '+esc(t('cm.lstrow',{p:money(l.ask),w:l.w}))+'</span></span><button class="btn sm" data-act="cmcancel" data-i="'+i+'">'+esc(t('cm.cancel'))+'</button></div>').join(''):'<div class="mute">'+esc(t('cm.nolst'))+'</div>')+'</div>';
 const rs=rowsAll();
 h+='<div class="card stack"><div class="row spread" style="gap:8px;flex-wrap:wrap"><h3>'+esc(t('cm.mine'))+'</h3><div class="row" style="gap:6px;flex-wrap:wrap">'+['foil','sig','belt','dup','all'].map(k=>'<button class="btn sm'+(UIc.f===k?' gold':'')+'" data-act="cmfilter" data-f="'+k+'">'+esc(t('cm.f.'+k))+'</button>').join('')+'</div></div>'+
  (rs.length?'<div class="tcggrid">'+rs.slice(0,36).map((r,i)=>{const key=r.src+'|'+r.id+'|'+(r.foil?'F':'N'),gc=Math.round(r.v*.1/5)*5||5,sig=r.src==='s';
   const own=r.src==='w'&&!r.foil&&!r.last&&(W(r.card.id)||{}).fed===G.fed.id;
   return '<div class="stack" style="gap:4px;align-items:stretch">'+cardHtml(r.card,i,r.foil,sig)+'<div style="text-align:center;font-size:12px">'+(r.cnt>1?'×'+r.cnt+' · ':'')+esc(t('cm.fair'))+' <b>'+money(r.v)+'</b>'+(r.foil&&r.gr?'<br><span class="tag">'+esc(t('cm.gr',{g:r.gr}))+'</span>':'')+'</div>'+
    (r.last?'<div class="mute" style="font-size:11px;text-align:center">'+esc(t('cm.last'))+'</div>':'<button class="btn sm" data-act="cmsell" data-k="'+key+'">'+esc(t('cm.shop',{m:money(Math.round(r.v*.7/5)*5)}))+'</button><button class="btn sm gold" data-act="cmauc" data-k="'+key+'">'+esc(t('cm.auc'))+'</button>')+
    (r.foil&&r.src!=='s'&&!r.gr?'<button class="btn sm" data-act="cmgrade" data-k="'+key+'"'+(m.wallet<gc?' disabled':'')+'>'+esc(t('cm.grade',{m:money(gc)}))+'</button>':'')+
    (own?'<button class="btn sm" data-act="cmsign" data-k="'+key+'">✒️ '+esc(t('cm.ask'))+'</button>':'')+'</div>'}).join('')+'</div>':'<div class="mute">'+esc(t('cm.none'))+'</div>')+'</div>';
 return h};
function rowOf(k){const m=store(),[src,id,f]=k.split('|'),foil=f==='F';
 if(src==='s'){const i=+id.slice(1),it=m.sg[i];return it?{src:'s',it,id,card:it.card,foil:!!it.foil,gr:it.gr}:null}
 const S=src==='b'?m.bc:m.col,e=S[id];return e?{src,id,card:e.card,foil,gr:foil?e.gr:0}:null}
Object.assign(ACT,{
 cmfilter(e){UIc.f=e.dataset.f;G.cmmsg='';render()},
 cmsell(e){const row=rowOf(e.dataset.k);if(!row){render();return}const it=takeRow(row);if(!it){render();return}const v=Math.round(valOfItem(it)*.7/5)*5,m=meW();m.wallet+=v;C().earn+=v;G.cmmsg=t('cm.msg.sold',{n:it.card.n,m:money(v)});try{save()}catch(z){}render()},
 async cmauc(e){const row=rowOf(e.dataset.k);if(!row)return;const v=valueOf(row.card,row.foil,row.gr,row.src==='s');const opts=AUC.map(a=>({l:esc(t(a[1],{p:money(Math.round(v*a[0]/5)*5)}))})).concat([{l:esc(t('cm.q.no'))}]);
  const i=await askGeneric(esc(row.card.n),esc(t('cm.q.auc',{n:row.card.n,v:money(v)})),opts);if(i>=AUC.length)return;
  const r2=rowOf(e.dataset.k);if(!r2)return;const it=takeRow(r2);if(!it)return;const ask=Math.round(v*AUC[i][0]/5)*5;
  C().lst.push(Object.assign({ask,w:4},it));G.cmmsg=t('cm.msg.listed',{n:it.card.n,m:money(ask)});try{save()}catch(z){}render()},
 cmcancel(e){const c=C(),l=c.lst[+e.dataset.i];if(!l)return;c.lst.splice(+e.dataset.i,1);giveBack(l);render()},
 async cmgrade(e){const row=rowOf(e.dataset.k);if(!row||!row.foil||row.gr||row.src==='s')return;const m=meW(),cost=Math.round(valueOf(row.card,true,0)*.1/5)*5||5;if(m.wallet<cost){G.cmmsg=t('cm.msg.nomoney');render();return}
  const i=await askGeneric(esc(row.card.n),esc(t('cm.q.gr',{m:money(cost)})),[{l:esc(t('cm.q.gyes'))},{l:esc(t('cm.q.no'))}]);if(i!==0||m.wallet<cost)return;
  const S=row.src==='b'?m.bc:m.col,en=S[row.card.id];if(!en||en.gr)return;m.wallet-=cost;const r=rnd()*100;const g=r<8?10:r<28?9:r<58?8:r<86?7:r<96?6:5;en.gr=g;G.cmmsg=t('cm.msg.graded',{n:row.card.n,g});try{save()}catch(z){}render()},
 cmsign(e){const row=rowOf(e.dataset.k);if(!row||row.src!=='w')return;const m=store(),w=W(row.card.id),c=C();if(!w)return;const last=(c.sgw[w.id]||-99);
  if(G.week-last<CD){G.cmmsg=t('cm.msg.signcd',{n:w.name});render();return}
  const it=takeRow(row);if(!it){G.cmmsg=t('cm.msg.signdup');render();return}c.sgw[w.id]=G.week;
  if(rnd()<clamp(.2+(w.morale||60)/150,.25,.85)){m.sg.push({card:it.card,foil:false,gr:0});evMood(w,2);G.cmmsg=t('cm.msg.signok',{n:w.name});addNews('n.cmsig',{n:w.name})}
  else{giveBack(it);evMood(w,-2);G.cmmsg=t('cm.msg.signno',{n:w.name})}try{save()}catch(z){}render()},
 cmbuy(e){const c=C(),m=store(),o=c.off[+e.dataset.i];if(!o)return;if(m.wallet<o.price){G.cmmsg=t('cm.msg.nomoney');render();return}m.wallet-=o.price;c.off.splice(+e.dataset.i,1);
  if(o.sig)m.sg.push({card:Object.assign({},o.card,{foil:false}),foil:false,gr:0});else{giveBack({src:o.src==='b'?'b':'w',card:o.card,foil:o.foil,gr:0});if(o.src!=='b')try{tcgMilestones()}catch(z){}}
  G.cmmsg=t('cm.msg.bought',{n:o.card.n,m:money(o.price)});try{save()}catch(z){}render()}});
})();
if(typeof normTexts==="function")normTexts();
