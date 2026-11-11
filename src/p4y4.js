/* ===== Transfer market: watchlist with scout reports, offers to rival wrestlers, rival bids for yours (numbers set by eye) ===== */
const TRN_MULT=[1,1.3,1.6],TRN_BON=[0,12,25],TRN_RAISE=[1,1.15,1.3],TRN_MAXOFF=3,TRN_WAIT=2;
function trnEns(){if(!G.trn)G.trn={w:{},off:[],hist:[],f:'all'};return G.trn}
function trnRival(w){return (G.rivals||[]).find(r=>r.id===w.fed)||null}
function trnPool(){return G.ws.filter(w=>w.fed!==G.fed.id&&!w.ext&&trnRival(w)&&w.pop>=15&&!w.farewell)}
function trnCost(w,lvl){const r=trnRival(w);const base=salaryOf(w,G.fed.tier)*(6+Math.min(52,Math.max(0,w.contract==null?26:w.contract))*.4)*(r&&r.pop>G.fed.pop?1.15:1);return Math.round(base*TRN_MULT[lvl]*(typeof relDisc==='function'?Math.min(1,relDisc(w)):1)/10)*10}
function trnWL(w,lvl){const r=trnRival(w);if(!r)return 0;
 let v=40+(G.fed.pop-r.pop)*.4+(60-(w.morale==null?60:w.morale))*.3-(w.loyal==null?50:w.loyal)*.2+((w.contract||0)<=10?15:0)+TRN_BON[lvl];
 try{v+=(mrEns().cred-50)*.1;v+=rlGet('w:'+w.id).v*.1}catch(e){}
 return clamp(v,5,95)}
function trnLab(p){return p>=65?'hi':p>=40?'mid':'lo'}
function trnRep(w){
 const o=trnEns().w[w.id]||0,err=Math.round(potErr(w)*Math.max(.25,1-o/12)),hp=hpOf(w);
 return{o,err,est:clamp(Math.round(hp+(w.hn||0)*err),20,99),trait:(w.trv||o>=6)?(trOf(w)||''):null}}
function trnCard(w,watch){
 const r=trnRival(w),rep=trnRep(w),off=trnEns().off.find(x=>x.id===w.id),sh=rep.o>=2?trnLab(trnWL(w,0)):null;
 let h='<div class="trc"><span class="tka">'+avatar(w.look,56)+'</span><div class="tkb"><b>'+esc(w.name)+'</b> <span class="mute" style="font-size:12.5px">'+esc(r?r.short||r.name:'')+' · '+esc(t('st.age',{n:w.age}))+'</span>'
  +'<div style="font-size:12.5px" class="mute">'+esc(t('rk.ovr'))+' '+ovr(w)+' · '+esc(t('st.pop'))+' '+Math.round(w.pop)+' · '+esc(t('dv.pot'))+' ≈ '+rep.est+' ±'+rep.err+'</div>'
  +'<div style="font-size:12.5px" class="mute">'+esc(t('st.salary',{m:money(w.salary)}))+' · '+esc(t('st.contract',{n:wks(Math.max(0,w.contract||0))}))+(rep.trait!==null?' · '+esc(rep.trait?t('tr.'+rep.trait):t('trn.notrait')):'')+'</div>'
  +(watch?'<div style="font-size:12.5px">'+esc(t('trn.rep',{n:rep.o}))+' · '+esc(sh?t('trn.wl.'+sh):t('trn.wl.q'))+'</div>':'')
  +'</div></div>';
 let b='<div class="dvch" style="margin-top:4px">';
 if(off)b+='<span class="pcc pr">'+esc(t('trn.pend',{n:Math.max(0,off.wk+TRN_WAIT-G.week)}))+'</span>';
 else{[0,1,2].forEach(l=>{const c=trnCost(w,l);b+='<button class="btn sm" data-act="trnoffer" data-id="'+w.id+'" data-l="'+l+'"'+(G.fed.cash<c?' disabled':'')+'>'+esc(t('trn.o.'+l))+' · '+esc(money(c))+'</button>'});b+=(watch?'<button class="btn sm" data-act="trnunwatch" data-id="'+w.id+'">'+esc(t('trn.unwatch'))+'</button>':'<button class="btn sm" data-act="trnwatch" data-id="'+w.id+'">'+esc(t('trn.watch'))+'</button>')}
 return h+b+'</div>'}
function trnOpen(){
 const T=trnEns();const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 const watch=Object.keys(T.w).map(W).filter(w=>w&&w.fed!==G.fed.id&&trnRival(w));
 let h='<h2>'+esc(t('trn.t'))+'</h2><p class="mute" style="margin:0;font-size:13px">'+esc(t('trn.sub',{s:scoutLvl()}))+'</p>';
 if(full)h+='<div class="pcc dn" style="align-self:flex-start">'+esc(t('trn.full'))+'</div>';
 h+='<div class="px">'+esc(t('trn.wl'))+' · '+watch.length+'</div>'+(watch.length?watch.map(w=>trnCard(w,true)).join(''):'<p class="mute" style="margin:0;font-size:13px">'+esc(t('trn.nowatch'))+'</p>');
 if(T.hist.length)h+='<div class="px">'+esc(t('trn.hist'))+'</div><div class="pcch">'+T.hist.slice(0,5).map(x=>'<span class="pcc '+(x.ok?'up':'dn')+'">'+esc(t('trn.h.'+(x.ok?'ok':'no'),{w:x.n}))+'</span>').join('')+'</div>';
 const F={all:()=>true,young:w=>w.age<=25,stars:w=>w.pop>=45,cheap:w=>salaryOf(w,G.fed.tier)<=salaryOf({pop:30,ring:40},G.fed.tier)*1.6};
 h+='<div class="px">'+esc(t('trn.find'))+'</div><div class="dvch">'+Object.keys(F).map(k=>'<button class="btn sm'+(T.f===k?' gold':'')+'" data-act="trnf" data-k="'+k+'">'+esc(t('trn.f.'+k))+'</button>').join('')+'</div>';
 const SO={ovr:w=>ovr(w),pop:w=>w.pop,age:w=>w.age,pay:w=>w.salary||0},lo=T.dr==='lo'?1:-1;
 h+='<div class="dvch"><select class="field" data-chg="trnset" data-k="fd" aria-label="'+esc(t('trn.fd'))+'"><option value="all">'+esc(t('trn.fd.all'))+'</option>'+(G.rivals||[]).map(r=>'<option value="'+r.id+'"'+(T.fd===r.id?' selected':'')+'>'+esc(r.name)+' ('+trnPool().filter(w=>w.fed===r.id).length+')</option>').join('')+'</select>'
  +'<select class="field" data-chg="trnset" data-k="so" aria-label="'+esc(t('trn.sort'))+'">'+[['ovr',t('rk.ovr')],['pop',t('st.pop')],['age',t('mk.age')],['pay',t('mk.pay')]].map(x=>'<option value="'+x[0]+'"'+((T.so||'ovr')===x[0]?' selected':'')+'>'+esc(x[1])+'</option>').join('')+'</select>'
  +'<select class="field" data-chg="trnset" data-k="dr" aria-label="'+esc(t('mk.dir'))+'"><option value="hi">'+esc(t('mk.hi'))+'</option><option value="lo"'+(T.dr==='lo'?' selected':'')+'>'+esc(t('mk.lo'))+'</option></select></div>';
 const sk=SO[T.so||'ovr'];const cand=trnPool().filter(F[T.f]||F.all).filter(w=>(!T.fd||T.fd==='all'||w.fed===T.fd)).filter(w=>!(w.id in T.w)).sort((a,b)=>lo*(sk(a)-sk(b))||ovr(b)-ovr(a)).slice(0,25);
 h+=cand.length?cand.map(w=>trnCard(w,false)).join(''):'<p class="mute" style="margin:0;font-size:13px">'+esc(t('trn.none'))+'</p>';
 h+='<button class="btn gold" data-act="trnclose">'+esc(t('tk.close'))+'</button>';openModal('<div class="pcm">'+h+'</div>')}
ACT.trnopen=()=>{trnOpen()};ACT.trnclose=()=>{closeModal();try{save()}catch(e){}render()};
Object.assign(CHG,{trnset(e){const T=trnEns();T[e.dataset.k]=e.value;trnOpen()}});
ACT.trnf=e=>{trnEns().f=e.dataset.k;trnOpen()};
ACT.trnwatch=e=>{const T=trnEns();if(Object.keys(T.w).length>=12)return;T.w[e.dataset.id]=0;trnOpen()};
ACT.trnunwatch=e=>{const T=trnEns();delete T.w[e.dataset.id];T.off=T.off.filter(x=>x.id!==e.dataset.id);trnOpen()};
ACT.trnoffer=e=>{const T=trnEns(),w=W(e.dataset.id),l=+e.dataset.l;if(!w||T.off.length>=TRN_MAXOFF||T.off.some(x=>x.id===w.id))return;
 const c=trnCost(w,l);if(G.fed.cash<c||mine().length>=ROSTERMAX[G.fed.tier-1])return;T.off.push({id:w.id,lvl:l,wk:G.week,cost:c});trnOpen()};
// weekly: observe, resolve offers
const _trnE=endWeek;endWeek=function(){
 const r=_trnE.apply(this,arguments);
 try{const T=trnEns();
  Object.keys(T.w).forEach(id=>{const w=W(id);if(!w||w.fed===G.fed.id||!trnRival(w)){delete T.w[id];return}T.w[id]++;if(T.w[id]===6){trOf(w);w.trv=1}});
  T.off=T.off.filter(o=>{if(G.week<o.wk+TRN_WAIT)return true;const w=W(o.id);if(!w||!trnRival(w))return false;
   const c=trnCost(w,o.lvl),p=trnWL(w,o.lvl)/100;let ok=false;
   if(G.fed.cash<c||mine().length>=ROSTERMAX[G.fed.tier-1]){addNews('trn.n.fail2',{w:w.name})}
   else if(rnd()<p){ok=true;const rv=trnRival(w);G.fed.cash-=c;purgeW(w.id);w.fed=G.fed.id;w.salary=Math.round(w.salary*TRN_RAISE[o.lvl]/10)*10;w.contract=52;w.acc=accStart(w.country,G.fed.country);w.morale=70;w.fatigue=0;
    if(rv)rv.pop=clamp(rv.pop-(w.pop>=45?.4:.1),3,99);G.fed.pop=clamp(G.fed.pop+(w.pop>=45?.3:0),2,100);delete T.w[w.id];try{wmsAdd(w,'signed',{f:rv?rv.name:'?'})}catch(e){}addNews('trn.n.ok',{w:w.name,f:rv?rv.name:'?'})}
   else addNews('trn.n.no',{w:w.name,f:trnRival(w)?trnRival(w).name:'?'});
   T.hist.unshift({n:w.name,ok:ok?1:0});if(T.hist.length>10)T.hist.length=10;return false})}catch(e){}
 return r};
// rival bids for your wrestlers
NX('trpoach',['Rywal chce Twojego zawodnika','A rival wants your wrestler'],['{r} składa ofertę za {w}. Może go kupić za {mm} albo go przekonać do ofert.','{r} makes an offer for {w}. They can buy them out for {mm}, or lure them away.'],
 [['Zatrzymaj podwyżką ({mc})','Keep with a raise ({mc})'],['Sprzedaj za {mm}','Sell for {mm}'],['Odmów','Refuse']],
 [['{w} zostaje, a Ty zyskujesz lojalność.','{w} stays and you gain their loyalty.'],['{w} odchodzi, a w kasie robi się większy ruch.','{w} leaves and the till gets busier.'],['Odmowa zostaje przyjęta, ale zawodnik jest niezadowolony.','The refusal stands, but the wrestler is unhappy.']],
 [v=>{const w=W(v.id);if(w){w.salary=Math.round(w.salary*1.2/10)*10;w.contract=104;w.morale=clamp(w.morale+6,0,100);w.loyal=clamp((w.loyal||50)+4,0,100)}xcash(-v.c)},
  v=>{const w=W(v.id),r=G.rivals.find(x=>x.id===v.rid);if(w&&r){purgeW(w.id);w.fed=r.id;w.contract=52;r.pop=clamp(r.pop+.3,3,99)}xcash(v.p)},
  v=>{const w=W(v.id);if(w){evMood(w,-5);if(rnd()<.25&&w.morale<45){const r=G.rivals.find(x=>x.id===v.rid);if(r){purgeW(w.id);w.fed=r.id;w.contract=52;addNews('trn.n.left',{w:w.name,f:r.name})}}}}],
 ()=>{const l=hlLive().filter(w=>w.pop>=35&&(w.contract||0)<=70&&!pcChamp(w.id)),w=l.length?pickR(l):null,r=G.rivals.filter(x=>x.pop>=G.fed.pop*.6).sort(()=>rnd()-.5)[0]||pickR(G.rivals||[]);
  if(!w||!r)return{w:'?',id:'',r:'?',rid:'',mm:'?',mc:'?',c:0,p:0};const p=Math.round(salaryOf(w,G.fed.tier)*(8+Math.min(52,w.contract||0)*.3)/10)*10,c=Math.round(w.salary*10*.6);
  return{w:w.name,id:w.id,r:r.name||r.short,rid:r.id,mm:money(p),mc:money(c),c,p}},
 ()=>{try{return G.week>=20&&G.fed.tier>=2&&(G.rivals||[]).length>0&&hlLive().some(w=>w.pop>=35&&(w.contract||0)<=70)&&rnd()<.22}catch(e){return false}},[1,0,0]);
// entry point on the Free agents screen
const _trnVF=vFa;vFa=function(){
 let h=_trnVF.apply(this,arguments);
 try{const T=trnEns();h=h.replace(/(<div class="top"><h2>[^<]*<\/h2>)/,'$1')+'';
  h=trnCardHtml(T)+h}catch(e){}
 return h};
Object.assign(D,{
 'trn.t':['Rynek transferowy','Transfer market'],'trn.open':['Otwórz','Open'],'trn.card':['Obserwowani: {a} · oferty w toku: {b}','Watched: {a} · offers pending: {b}'],
 'trn.sub':['Obserwuj zawodników rywali: z czasem raport się doprecyzowuje (margines potencjału maleje, po 6 tygodniach poznasz cechę). Oferty rozstrzygają się po 2 tygodniach. Poziom skauta: {s}.','Watch rivals’ wrestlers: over time the report sharpens (the potential margin shrinks, after 6 weeks you learn the trait). Offers are decided after 2 weeks. Scout level: {s}.'],
 'trn.full':['Skład pełny: nie możesz składać ofert.','Roster full: you can’t make offers.'],'trn.wl':['Obserwowani','Watchlist'],'trn.nowatch':['Nikogo nie obserwujesz. Wybierz kogoś poniżej.','You’re not watching anyone. Pick someone below.'],
 'trn.hist':['Ostatnie oferty','Recent offers'],'trn.h.ok':['Pozyskano: {w}','Signed: {w}'],'trn.h.no':['Odrzucono: {w}','Declined: {w}'],'trn.find':['Szukaj','Search'],
 'trn.f.all':['Wszyscy','All'],'trn.f.young':['Młodzi','Young'],'trn.f.stars':['Gwiazdy','Stars'],'trn.f.cheap':['Tani','Cheap'],'trn.none':['Brak kandydatów w tym filtrze.','No candidates in this filter.'],
 'trn.watch':['Obserwuj','Watch'],'trn.unwatch':['Przestań','Stop'],'trn.pend':['Oferta w toku, zostało {n} tyg.','Offer pending, {n} wks left'],'trn.notrait':['cecha nieznana','trait unknown'],
 'trn.rep':['Obserwacja: {n} tyg.','Watched for {n} wks'],'trn.wl.hi':['chęć do przejścia: wysoka','willingness to move: high'],'trn.wl.mid':['chęć do przejścia: średnia','willingness to move: medium'],'trn.wl.lo':['chęć do przejścia: niska','willingness to move: low'],'trn.wl.q':['chęć do przejścia: nieznana','willingness to move: unknown'],
 'trn.o.0':['Standard','Standard'],'trn.o.1':['Hojna','Generous'],'trn.o.2':['Agresywna','Aggressive'],
 'trn.n.ok':['{w} przechodzi z {f} do Twojej federacji.','{w} moves from {f} to your promotion.'],'trn.n.no':['{f} zatrzymuje {w}. Oferta odrzucona.','{f} keeps {w}. Offer declined.'],'trn.n.fail2':['Oferta za {w} upadła: brak gotówki lub miejsca w składzie.','The offer for {w} fell through: no cash or roster space.'],'trn.n.left':['{w} odchodzi do {f} mimo odmowy.','{w} leaves for {f} despite the refusal.'],
 'trn.tut':['Rynek transferowy','Transfer market']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('trncss')){const s=document.createElement('style');s.id='trncss';s.textContent='.trc{display:flex;gap:10px;align-items:flex-start;border-top:1px solid var(--line);padding-top:8px}';document.head.appendChild(s)}}catch(e){}}
(function(){_T('transfers','Rynek transferowy','Na ekranie Wolni agenci jest karta Rynek transferowy. Możesz obserwować zawodników federacji rywali: im dłużej, tym dokładniejszy raport (mniejszy margines potencjału, a po 6 tygodniach poznasz cechę). Ofertę składasz w jednej z trzech wersji: standardowej, hojnej albo agresywnej. Wyższa daje większą szansę, ale kosztuje więcej, a zawodnik dostaje podwyżkę. Wynik poznasz po 2 tygodniach. Na szansę wpływa popularność Twojej federacji w porównaniu z jego obecną, morale i lojalność zawodnika, końcówka kontraktu, relacja z nim i Twoja wiarygodność w mediach. Rywale też składają oferty za Twoich zawodników, a Ty decydujesz: zatrzymać podwyżką, sprzedać albo odmówić.','On the Free agents screen there is a Transfer market card. You can watch wrestlers of rival promotions: the longer you watch, the sharper the report (a smaller potential margin, and after 6 weeks you learn the trait). You make an offer in one of three versions: standard, generous or aggressive. A higher one raises the chance but costs more, and the wrestler gets a raise. You learn the result after 2 weeks. The chance depends on your promotion’s popularity compared with their current one, the wrestler’s morale and loyalty, the end of their contract, your relationship with them and your media credibility. Rivals also bid for your wrestlers and you decide: keep with a raise, sell or refuse.');
 if(!TUTS.some(x=>x[1]==='transfers')){let i=-1;TUTS.forEach((x,k)=>{if(x[0]==='fa')i=k});TUTS.splice(i>=0?i+1:TUTS.length-1,0,['fa','transfers'])}})();
normTexts();

function trnCardHtml(T){return '<div class="card stack" style="margin-bottom:10px;border-color:var(--gold)"><div class="row spread" style="gap:10px"><div><b>'+esc(t('trn.big'))+'</b><div class="mute" style="font-size:13px">'+esc(t('trn.bigd'))+'</div><div class="mute" style="font-size:13px">'+esc(t('trn.card',{a:Object.keys(T.w).length,b:T.off.length}))+'</div></div><button class="btn gold" data-act="trnopen">'+esc(t('trn.open'))+'</button></div></div>'}
(function(){const _vw=vWorld;vWorld=function(){let h=_vw.apply(this,arguments);try{return trnCardHtml(trnEns())+h}catch(e){return h}}})();
Object.assign(D,{'trn.fd':['Federacja','Federation'],'trn.fd.all':['Wszystkie federacje','All federations'],'trn.sort':['Sortuj','Sort'],
 'trn.big':['Podkup zawodnika innej federacji','Sign a wrestler from another promotion'],
 'trn.bigd':['Przeglądaj zawodników rywali, obserwuj ich dla dokładniejszych raportów i składaj oferty.','Browse rival wrestlers, watch them for better reports and make offers.']});
