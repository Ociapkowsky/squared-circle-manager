// ---- v97: brand split (two brands for tier 4-5 federations) ----
const BRUI={cs:false,msg:''};
const BR_BASEMAX=ROSTERMAX.slice();
function brOn(){return !!(G&&G.br&&G.br.on)}
function brOf(w){return w.br==='B'?'B':'A'}
function brActive(){if(!brOn())return null;if(G.week%4===0)return 'X';const i=G.week-Math.floor(G.week/4);return i%2===1?'A':'B'}
function brAt(wk){if(wk%4===0)return 'X';const i=wk-Math.floor(wk/4);return i%2===1?'A':'B'}
function brLbl(b){return t('br.n.'+b)}
function brClr(b){return b==='A'?'#c0392b':b==='B'?'#2f6fd0':'#d4a72c'}
function brTag(b){return '<span class="tag" style="border-color:'+brClr(b)+';color:'+brClr(b)+'">'+brLbl(b)+'</span>'}
function brApply(){[3,4].forEach(i=>{ROSTERMAX[i]=Math.round(BR_BASEMAX[i]*(brOn()?1.5:1))});
 if(brOn()){const ws=mine().filter(w=>!w.ext&&!w.br);if(ws.length){const c={A:0,B:0};mine().forEach(w=>{if(w.br)c[w.br]++});ws.forEach(w=>{const b=c.A<=c.B?'A':'B';w.br=b;c[b]++})}}}
function brMembers(b){return mine().filter(w=>!w.ext&&brOf(w)===b)}
function brPower(b){const m=brMembers(b).filter(w=>!w.injury);return m.length?avg(m.map(w=>w.pop)):0}
function brStartCost(){return Math.max(1.5e6,Math.round(wkRev()*10/1e4)*1e4)}
function brCan(){return G.fed.tier>=4&&!brOn()&&mine().filter(w=>!w.ext).length>=12}
function brTitleMake(b,kind){const wp=Math.min(5,G.fed.tier+1);const base=kind==='world'?{kind:'world',prestige:Math.max(1,wp-(b==='B'?.4:0)),teams:1,strap:b==='A'?'#8a1c1c':'#1f3f8a',plate:'gold'}:kind==='second'?{kind:'second',prestige:Math.max(1,wp-1.7),teams:1,strap:b==='A'?'#a5552b':'#1f6b8a',plate:'silver'}:{kind:'tag',prestige:Math.max(1,wp-1.7),teams:2,strap:b==='A'?'#6b4f1d':'#1d6b4f',plate:'silver'};
 G.titles.push(Object.assign({id:'b'+b+kind,g:'m',name:null,holders:[],since:G.week,br:b},base))}
function brSplit(keepChamps){
 const ws=mine().filter(w=>!w.ext);const fix={};
 if(keepChamps)G.titles.forEach(tt=>{if(tt.br)tt.holders.forEach(id=>{fix[id]=tt.br})});
 const cnt={A:{m:0,f:0,p:0},B:{m:0,f:0,p:0}};
 ws.forEach(w=>{if(fix[w.id]){w.br=fix[w.id];const c=cnt[w.br];c[w.g==='f'?'f':'m']++;c.p+=w.pop}});
 ws.filter(w=>!fix[w.id]).sort((a,b)=>b.pop-a.pop).forEach(w=>{const k=w.g==='f'?'f':'m';const b=cnt.A[k]<cnt.B[k]?'A':cnt.A[k]>cnt.B[k]?'B':(cnt.A.p<=cnt.B.p?'A':'B');w.br=b;cnt[b][k]++;cnt[b].p+=w.pop})}
function brStart(){if(!brCan())return false;const c=brStartCost();if(G.fed.cash<c)return false;G.fed.cash-=c;
 G.br={on:1,pop:{A:Math.round(G.fed.pop*.9),B:Math.round(G.fed.pop*.9)},start:G.week,cnt:{A:0,B:0,X:0},hist:[],draft:G.week,paid:c};
 const ts=G.titles.slice().sort((a,b)=>(b.prestige||0)-(a.prestige||0));ts.forEach((tt,i)=>{tt.br=i%2===0?'A':'B'});
 ['A','B'].forEach(b=>{const mt=G.titles.filter(tt=>tt.br===b&&tt.g!=='f');const s1=mt.filter(tt=>tt.teams===1),tg=mt.filter(tt=>tt.teams===2);if(!s1.length)brTitleMake(b,'world');if(s1.length<2)brTitleMake(b,'second');if(!tg.length)brTitleMake(b,'tag')});
 G.ws.forEach(w=>{delete w.br});brSplit(true);brApply();G.card=[];G.promos=[];xconf(2);addNews('n.brstart');try{bkXp(80)}catch(e){}G.ach=G.ach||{};if(!G.ach.brands)G.ach.brands=G.week;return true}
function brMerge(){if(!brOn())return false;G.titles.forEach(tt=>{delete tt.br});G.ws.forEach(w=>{delete w.br});G.br=null;brApply();G.card=[];G.promos=[];addNews('n.brmerge');return true}
function brDraft(){if(!brOn()||G.week-(G.br.draft||0)<26)return false;G.ws.forEach(w=>{if(!w.ext)delete w.br});brSplit(true);G.br.draft=G.week;mine().forEach(w=>{evMood(w,rnd()<.5?3:-3)});G.card=[];G.promos=[];addNews('n.brdraft');return true}
function brMove(id){const w=W(id);if(!brOn()||!w||w.fed!==G.fed.id||w.ext||isChamp(w.id))return false;w.br=brOf(w)==='A'?'B':'A';G.card=G.card.filter(m=>!sides(m).A.concat(sides(m).B).some(x=>x===id));return true}
// --- hooks ---
const _bk0=bookable;bookable=function(){const l=_bk0();const a=brActive();if(!a||a==='X')return l;return l.filter(w=>w.fed!==G.fed.id||w.ext||brOf(w)===a)};
const _tok0=titleOk;titleOk=function(tt,m){if(tt.br){const a=brActive();if(a&&a!=='X'&&a!==tt.br)return false}return _tok0(tt,m)};
const _ab0=autoBook;autoBook=function(){const a=brActive();if(!a||a==='X')return _ab0();
 const off=mine().filter(w=>!w.ext&&brOf(w)!==a);off.forEach(w=>{w._bi=w.injury||0;w.injury=999});const saved=G.titles;G.titles=saved.filter(tt=>!tt.br||tt.br===a);
 try{return _ab0()}finally{off.forEach(w=>{w.injury=w._bi;delete w._bi});G.titles=saved}};
const _tn0=titleName;titleName=function(tt){const n=_tn0(tt);if(!tt.br||tt.name)return n;return n.indexOf(G.fed.short)===0?G.fed.short+' '+brLbl(tt.br)+n.slice(G.fed.short.length):brLbl(tt.br)+' '+n};
const _fs1=finishShow;finishShow=function(out){const a=brActive();const c0=G.fed.cash;_fs1(out);if(!a||!G.br)return;
 const r=G.lastRating||0,bp=G.br.pop,d=G.fed.cash-c0;
 const bs=a==='X'?['A','B']:[a];bs.forEach(b=>{bp[b]=clamp(bp[b]+clamp((r-2.8)*1.2,-3,3)*(1-bp[b]/140),5,100);G.br.cnt[a==='X'?'X':b]=(G.br.cnt[a==='X'?'X':b]||0)+(a==='X'&&b==='B'?0:1)});
 if(d>0&&a!=='X'){G.fed.cash+=d*(bp[a]-50)/400}
 G.br.hist=(G.br.hist||[]).concat([{wk:G.week,b:a,r:Math.round(r*100)/100}]).slice(-10);if(a==='X'){xpop(.15)}};
const _iwbr=infraWeekly;infraWeekly=function(){_iwbr();brApply();if(!brOn())return;const bp=G.br.pop;
 ['A','B'].forEach(b=>{bp[b]=clamp(bp[b]+(G.fed.pop-bp[b])*.02,5,100)});
 const w=wkRev(),avgp=(bp.A+bp.B)/2;G.fed.cash+=w*.28*(.8+avgp/250)-w*.09;
 if(brMembers('A').length<5||brMembers('B').length<5){bp.A=clamp(bp.A-.3,5,100);bp.B=clamp(bp.B-.3,5,100)}};
const _to1=takeOver;takeOver=function(tid){const ok=_to1(tid);if(ok&&G.br){G.ws.forEach(w=>{delete w.br});G.br=null;brApply()}return ok};
const _cr4=careerRep;careerRep=function(){return _cr4()+(brOn()?2:0)};
const _vs2=vShow;vShow=function(){const h=_vs2();if(!brOn()||RUN)return h;const a=brActive();const nx=[1,2,3].map(i=>brAt(G.week+i));
 return '<div class="card row spread" style="gap:8px;flex-wrap:wrap;border-left:4px solid '+brClr(a)+'"><span>'+t('br.onair')+' '+brTag(a)+'</span><span class="row" style="gap:8px;align-items:center">'+brGmBtn(a)+'<span class="mute" style="font-size:13px">'+t('br.next')+': '+nx.map(b=>brLbl(b)).join(' → ')+'</span></span></div>'+h};
const _rd1=render;render=function(){try{brApply()}catch(e){}return _rd1.apply(this,arguments)};
// --- screen ---
function vBr(){let h='<div class="top"><div><h2>'+t('nav.br')+'</h2><div class="mute">'+t('br.sub')+'</div></div></div>';
 if(G.fed.tier<4&&!brOn())return h+'<div class="card mute">'+t('br.locked')+'</div>';
 if(!brOn()){const c=brStartCost(),n=mine().filter(w=>!w.ext).length;
  return h+'<div class="card stack"><h3>'+t('br.start.h')+'</h3><div class="mute" style="font-size:13px">'+t('br.start.n')+'</div><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn gold" data-act="brstart"'+(brCan()&&G.fed.cash>=c?'':' disabled')+'>'+t('br.start',{m:money(c)})+'</button>'+(n<12?'<span class="mute">'+t('br.need',{n:n})+'</span>':'')+'</div></div>'}
 const a=brActive(),bp=G.br.pop;
 const bar=(b)=>'<div class="stack" style="gap:4px;flex:1;min-width:200px"><div class="row spread"><b style="color:'+brClr(b)+'">'+brLbl(b)+'</b><span class="mute">'+t('br.pop',{p:Math.round(bp[b])})+' · '+t('br.pow',{p:Math.round(brPower(b))})+'</span></div><div style="height:8px;background:var(--line);border-radius:4px;overflow:hidden"><div style="height:8px;width:'+Math.round(bp[b])+'%;background:'+brClr(b)+'"></div></div></div>';
 h+='<div class="card stack"><div class="row spread" style="gap:8px;flex-wrap:wrap"><span>'+t('br.onair')+' '+brTag(a)+'</span><span class="mute" style="font-size:13px">'+t('br.next')+': '+[1,2,3,4].map(i=>brLbl(brAt(G.week+i))).join(' → ')+'</span></div><div class="row" style="gap:14px;flex-wrap:wrap">'+bar('A')+bar('B')+'</div>'+
  '<div class="mute" style="font-size:13px">'+t('br.eco',{i:money(Math.round(wkRev()*.28*(.8+(bp.A+bp.B)/500))),c:money(Math.round(wkRev()*.09))})+'</div>'+
  ((G.br.hist||[]).length?'<div class="mute" style="font-size:13px">'+G.br.hist.slice().reverse().slice(0,5).map(x=>t('br.hist',{w:x.wk,b:brLbl(x.b),r:x.r})).join(' · ')+'</div>':'')+
  '<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn sm" data-act="brdraft"'+(G.week-(G.br.draft||0)>=26?'':' disabled')+'>'+t('br.draft')+'</button><span class="mute" style="font-size:13px">'+(G.week-(G.br.draft||0)>=26?t('br.draft.n'):t('br.draft.cd',{w:26-(G.week-G.br.draft)}))+'</span>'+
  (BRUI.cs?'<button class="btn sm" data-act="brmerge">'+t('br.merge.ok')+'</button><button class="btn sm" data-act="brno">'+t('dv.no')+'</button>':'<button class="btn sm" data-act="brmerge">'+t('br.merge')+'</button>')+'</div></div>';
 h+=gmCands()+'<div class="grid g2" style="gap:12px">'+['A','B'].map(b=>{const ms=brMembers(b).sort((x,y)=>y.pop-x.pop);const ts=G.titles.filter(tt=>tt.br===b);
  return '<div class="card stack" style="border-top:3px solid '+brClr(b)+'"><h3 style="color:'+brClr(b)+'">'+brLbl(b)+' <span class="mute" style="font-size:13px">('+ms.length+')</span></h3>'+gmCard(b)+
   (ts.length?'<div class="mute" style="font-size:13px">'+ts.map(tt=>esc(titleName(tt))+(tt.holders.length?': '+esc(tt.holders.map(i=>W(i)?W(i).name:'?').join(', ')):'')).join('<br>')+'</div>':'')+
   ms.map(w=>'<div class="row spread" style="gap:6px"><span>'+esc(w.name)+' <span class="mute">· '+t('dv.pop',{p:Math.round(w.pop)})+(isChamp(w.id)?' · 🏆':'')+(w.injury>0?' · 🩹':'')+'</span></span><button class="btn sm" data-act="brmove" data-id="'+w.id+'"'+(isChamp(w.id)?' disabled':'')+'>'+(b==='A'?'→ '+brLbl('B'):'→ '+brLbl('A'))+'</button></div>').join('')+'</div>'}).join('')+'</div>';
 return h}
// --- events ---
const brGate=()=>brOn();
const brOther=b=>b==='A'?'B':'A';
const brLow=()=>G.br.pop.A<=G.br.pop.B?'A':'B';
const XSR=[
{k:'brrivalry',t:['Rywalizacja brandów','Brand rivalry'],b:['Fani żyją sporem brandów. Możesz go podkręcić specjalną kampanią (koszt {m}).','Fans are buzzing about the brand feud. You can fuel it with a special campaign (cost {m}).'],v:()=>{const c=xc(.06);return {c,m:money(c)}},o:[['Podkręć ({m})','Fuel it ({m})'],['Zostaw naturalnie','Let it ride']],cost:[1,0],gate:brGate,n:[['Oba brandy zyskują na rywalizacji.','Both brands gain from the rivalry.'],['Zainteresowanie opada samo.','Interest fades on its own.']],fx:[v=>{xcash(-v.c);G.br.pop.A=clamp(G.br.pop.A+2,5,100);G.br.pop.B=clamp(G.br.pop.B+2,5,100);xpop(.3)},()=>{}]},
{k:'brdefect',t:['Zawodnik chce zmienić brand','A wrestler wants to switch brands'],b:['{w} prosi o przeniesienie do drugiego brandu.','{w} asks to be moved to the other brand.'],v:()=>{const w=pickR(mine().filter(x=>!x.ext&&!isChamp(x.id)));return {w:w?w.name:'?'}},o:[['Przenieś go','Move him'],['Odmów','Refuse']],gate:()=>brOn()&&mine().some(x=>!x.ext&&!isChamp(x.id)),n:[['Zmiana brandu poprawia mu nastrój.','The move lifts his mood.'],['Zawodnik jest niezadowolony.','The wrestler is unhappy.']],fx:[()=>{const w=pickR(mine().filter(x=>!x.ext&&!isChamp(x.id)));if(w){w.br=brOther(brOf(w));evMood(w,8)}},()=>{const w=pickR(mine().filter(x=>!x.ext&&!isChamp(x.id)));if(w)evMood(w,-8)}]},
{k:'brcross',t:['Inwazja między brandami','Cross-brand invasion'],b:['Zawodnicy jednego brandu pojawiają się na gali drugiego. Fani szaleją.','Wrestlers from one brand show up on the other\'s show. Fans go wild.'],o:[['Rozwiń wątek','Run the angle'],['Pomiń','Skip it']],gate:brGate,n:[['Wątek robi furorę.','The angle is a hit.'],['Okazja przepada.','The chance passes.']],fx:[()=>{G.br.pop.A=clamp(G.br.pop.A+1.5,5,100);G.br.pop.B=clamp(G.br.pop.B+1.5,5,100);xpop(.4)},()=>{}]},
{k:'brslump',t:['Brand w kryzysie','A brand in a slump'],b:['Oglądalność jednego z brandów wyraźnie spada. Możesz go wesprzeć nowymi wątkami (koszt {m}).','Viewership of one brand is clearly dropping. You can back it with new storylines (cost {m}).'],v:()=>{const c=xc(.07);return {c,m:money(c),b:brLbl(brLow())}},o:[['Wspomóż brand {b} ({m})','Back the {b} brand ({m})'],['Poczekaj','Wait it out']],cost:[1,0],gate:brGate,n:[['Brand odbija się od dna.','The brand bounces back.'],['Spadek postępuje.','The slide continues.']],fx:[v=>{xcash(-v.c);const b=brLow();G.br.pop[b]=clamp(G.br.pop[b]+5,5,100)},()=>{const b=brLow();G.br.pop[b]=clamp(G.br.pop[b]-3,5,100)}]},
{k:'brtv',t:['Dwie stacje, jeden spór','Two networks, one dispute'],b:['Dwie stacje telewizyjne kłócą się o prawa do Twoich brandów.','Two TV networks fight over the rights to your brands.'],o:[['Rozpisz aukcję','Hold an auction'],['Zostań przy obecnym układzie','Keep the current setup']],gate:brGate,n:[['Aukcja przynosi sporą gotówkę.','The auction brings a nice sum.'],['Spokój w relacjach z telewizją.','Calm relations with TV.']],fx:[()=>{rnd()<.7?xcash(xc(1.2)):xcash(-xc(.1))},()=>{xconf(1)}]},
{k:'brhead',t:['Kierownik brandu chce więcej','A brand head wants more'],b:['Odpowiedzialny za jeden z brandów żąda większego budżetu kreatywnego (koszt {m}).','The person running one brand demands a bigger creative budget (cost {m}).'],v:()=>{const c=xc(.05);return {c,m:money(c)}},o:[['Zgódź się ({m})','Agree ({m})'],['Odmów','Refuse']],cost:[1,0],gate:brGate,n:[['Brand dostaje nowy impuls.','The brand gets fresh momentum.'],['Kierownik jest rozczarowany.','The head is disappointed.']],fx:[v=>{xcash(-v.c);const b=brLow();G.br.pop[b]=clamp(G.br.pop[b]+3,5,100)},()=>{xmood(-1)}]},
{k:'brsurvivor',t:['Wielka gala brandów','Brand supershow'],b:['Możesz zorganizować specjalną galę, na której oba brandy walczą o prestiż (koszt {m}).','You can stage a special supershow where both brands fight for pride (cost {m}).'],v:()=>{const c=xc(.12);return {c,m:money(c)}},o:[['Zorganizuj ({m})','Stage it ({m})'],['Pomiń','Skip']],cost:[1,0],gate:brGate,n:[['Gala przechodzi do historii.','The show goes down in history.'],['Bez wielkiej gali.','No supershow.']],fx:[v=>{xcash(-v.c+xc(.3));xpop(.8);G.br.pop.A=clamp(G.br.pop.A+2,5,100);G.br.pop.B=clamp(G.br.pop.B+2,5,100)},()=>{}]},
{k:'brfans',t:['Fani narzekają na podział','Fans grumble about the split'],b:['Część fanów nie chce oglądać dwóch brandów i domaga się powrotu do jednej gali.','Some fans do not want two brands and demand a return to one show.'],o:[['Wyjaśnij decyzję','Explain the decision'],['Zignoruj','Ignore them']],gate:brGate,n:[['Większość się uspokaja.','Most calm down.'],['Narzekania trwają.','The grumbling goes on.']],fx:[()=>{xpop(.1)},()=>{xpop(-.3)}]},
{k:'brtrade',t:['Wymiana między brandami','Brand trade'],b:['Możesz przeprowadzić wymianę gwiazd między brandami, by odświeżyć karty.','You can trade stars between brands to refresh the cards.'],o:[['Zrób wymianę','Make the trade'],['Zostaw jak jest','Leave it as is']],gate:()=>brOn()&&mine().filter(x=>!x.ext&&!isChamp(x.id)).length>=6,n:[['Nowe układy dają świeżość.','New matchups bring freshness.'],['Bez zmian.','No changes.']],fx:[()=>{['A','B'].forEach(b=>{const w=brMembers(b).filter(x=>!isChamp(x.id)).sort((x,y)=>y.pop-x.pop)[0];if(w){w.br=brOther(b);evMood(w,3)}});xpop(.2)},()=>{}]},
{k:'brstar',t:['Gwiazda brandu','Brand star'],b:['Gwiazda jednego z brandów zdobywa głosowanie fanów na twarz federacji.','A brand\'s top star wins the fan vote as the face of the federation.'],o:[['Wyeksponuj go','Push him'],['Rozłóż akcenty','Spread the spotlight']],gate:()=>brOn()&&mine().some(x=>!x.ext),n:[['Brand zyskuje twarz, popularność rośnie.','The brand gains a face and popularity grows.'],['Szatnia docenia równe traktowanie.','The locker room values fair treatment.']],fx:[()=>{const w=mine().filter(x=>!x.ext).sort((x,y)=>y.pop-x.pop)[0];if(w){w.pop=Math.min(100,w.pop+1);const b=brOf(w);G.br.pop[b]=clamp(G.br.pop[b]+3,5,100)}},()=>{xmood(2)}]},
{k:'brmerchwar',t:['Wojna merchowa brandów','Brand merch war'],b:['Każdy brand chce mieć swoją linię koszulek. Wspólna linia kosztuje mniej ({m}).','Each brand wants its own t-shirt line. A joint line costs less ({m}).'],v:()=>{const c=xc(.04);return {c,m:money(c)}},o:[['Osobne linie ({m}×2)','Separate lines ({m}×2)'],['Wspólna linia ({m})','Joint line ({m})']],cost:[1,1],gate:brGate,n:[['Dwa brandy, dwa wizerunki.','Two brands, two identities.'],['Prosto i tanio.','Simple and cheap.']],fx:[v=>{xcash(-2*v.c+xc(.15));G.br.pop.A=clamp(G.br.pop.A+1,5,100);G.br.pop.B=clamp(G.br.pop.B+1,5,100)},v=>{xcash(-v.c+xc(.08))}]}
];
XSR.forEach(XE);
Object.assign(D,{'nav.br':['Brandy','Brands'],'br.sub':['Podziel federację na dwa brandy z osobnymi rosterami i pasami. Gale odbywają się na przemian, a co 4. tydzień jest wspólna gala.','Split your federation into two brands with separate rosters and titles. Shows alternate, and every 4th week is a joint show.'],
 'br.locked':['Podział na brandy odblokowuje się od poziomu federacji 4.','Brand split unlocks at federation tier 4.'],'br.start.h':['Podziel federację na dwa brandy','Split into two brands'],
 'br.start.n':['Roster zostanie podzielony po równo (mistrzowie zostają przy swoich pasach), a pasy dostaną po jednej stronie. Wiele nowych miejsc w rosterze (+50%), drugi kontrakt TV i dodatkowe koszty produkcji. Brand, który ma gale na antenie, zbiera popularność. Co 4. tydzień odbywa się wspólna gala, gdzie można mieszać roster.','The roster is split evenly (champions stay with their belts) and titles are shared out. Roster slots +50%, a second TV deal and extra production costs. The brand on air earns popularity. Every 4th week is a joint show where you can mix rosters.'],
 'br.start':['Podziel federację ({m})','Split the federation ({m})'],'br.need':['Potrzeba co najmniej 12 zawodników (masz {n}).','You need at least 12 wrestlers (you have {n}).'],
 'br.n.A':['Czerwony','Red'],'br.n.B':['Niebieski','Blue'],'br.n.X':['Wspólna gala','Joint show'],'br.onair':['Na antenie:','On air:'],'br.next':['Dalej','Next'],'br.pop':['pop. brandu {p}','brand pop {p}'],'br.pow':['siła {p}','strength {p}'],
 'br.eco':['Drugi kontrakt TV: ok. +{i} tygodniowo, dodatkowa produkcja: ok. -{c}.','Second TV deal: about +{i} weekly, extra production: about -{c}.'],'br.hist':['tydz. {w}: {b} {r}★','wk {w}: {b} {r}★'],
 'br.draft':['Przeprowadź draft','Run a draft'],'br.draft.n':['Roster zostanie rozdzielony od nowa (mistrzowie zostają).','The roster is redistributed (champions stay).'],'br.draft.cd':['Kolejny draft za {w} tyg.','Next draft in {w} wks'],
 'br.merge':['Połącz brandy','Merge brands'],'br.merge.ok':['Potwierdź połączenie','Confirm merge'],
 'n.brstart':['Federacja dzieli się na dwa brandy.','The federation splits into two brands.'],'n.brmerge':['Brandy zostają połączone.','The brands are merged.'],'n.brdraft':['Odbył się draft: roster został rozdzielony na nowo.','A draft took place: the roster was redistributed.'],'ach.brands':['Dwa brandy','Two brands']});
