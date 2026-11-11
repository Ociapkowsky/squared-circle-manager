// ---- v117: patience bar, scouting (reports reveal what a wrestler wants) ----
function ctPatBase(w){return clamp(35+(w.morale||50)*.3+(w.loyal||50)*.3-(w.pop>=80?10:w.pop>=60?5:0)+(w.age>=33?5:0)+lkMood(),20,100)}
const ctPat=w=>w.pat==null?ctPatBase(w):w.pat;
const ctPatHit=(w,d)=>{w.pat=clamp(ctPat(w)-d,0,100)};
function ctKnow(w){if(!w)return 0;const own=(w.fed===G.fed.id&&!w.ext)?2:0,r=(w.rep&&w.rep.until>G.week)?w.rep.lv:0;return Math.max(own,r)}
function ctWalk(w,n){w.negCD=G.week+10;w.pat=25;evMood(w,-5);w.loyal=clamp((w.loyal||50)-5,0,100);if(n)n.done=true;return t('ng.walk',{w:w.name,n:10})}
function ctFail(w,n,s){const loss=clamp(8+(62-s)*.6,6,35)*(s<48?1.5:1);ctPatHit(w,loss);if(s<48)evMood(w,-2);
 if(ctPat(w)<=0)return {res:'walk',msg:ctWalk(w,n)};
 const K=ctKnow(w),want=ctWant(w).filter(c=>n.cl.indexOf(c)<0&&CTV[c]>0),need=Math.max(0,62-s),pn=Math.ceil(need/1.3),can=n.cl.length<ctMax(w);
 let hint;
 if(K>=4)hint=pn<=25?(want.length&&can&&pn>10?t('ng.ctr.both',{p:Math.ceil(pn/2),c:t('cl.'+want[0])}):t('ng.ctr.pct',{p:pn})):(want.length&&can?t('ng.ctr.cl',{c:t('cl.'+want[0])}):t('ng.h.pay'));
 else if(K>=2)hint=want.length&&can&&s>=52?t('ng.h.cl',{c:t('cl.'+want[0])}):t('ng.h.pay');
 else hint=s<48?t('ng.h.ins'):t('ng.h.vague');
 return {res:'no',msg:t('ng.no',{w:w.name})+' '+hint}}
function ctPatH(w,n){const p=Math.round(ctPat(w)),k=ctKnow(w),m=p>=60?0:p>=30?1:2;
 return '<div class="lbl"><span>'+t('ng.pat')+'</span><span>'+(k>=3?p:t('ng.mood.'+m))+'</span></div>'+(k>=3?bar(p,m===2?'r':'t'):'<div class="mute" style="font-size:13px">'+t('ng.mood.'+m+'.d')+'</div>')}
function ctBest(w,n){let best=null;const wants=ctWant(w).filter(c=>CTV[c]>0),base=ctReq(w).slice(),mx=ctMax(w),pool=wants.filter(c=>base.indexOf(c)<0),sets=[];
 const subs=(i,cur)=>{if(cur.length+base.length>mx)return;if(i===pool.length){sets.push(base.concat(cur));return}subs(i+1,cur);subs(i+1,cur.concat([pool[i]]))};subs(0,[]);
 CTTK.filter(k=>ctTypeOk(w,k)).forEach(ty=>[26,52,104].forEach(len=>[-10,0,10,20,35].forEach(pct=>sets.forEach(cl=>{const m={id:n.id,type:ty,len,pct,bonus:0,cl,sign:n.sign};let s=ctScore(w,m);const sal=ctSal(w,m);if(n.sign&&w.salary>sal)s-=(1-sal/w.salary)*50;if(s<70)return;const c=sal*(1+cl.length*.01);if(!best||c<best.c)best={type:ty,len,pct,cl:cl.slice(),c}}))));return best}
function ctRepH(w,n){const K=ctKnow(w);if(!K&&!(w.fed===G.fed.id))return '<div class="note">'+t('ng.rep.none')+'</div>';
 const L=(lv,txt)=>K>=lv?'<div>'+txt+'</div>':'<div class="mute">🔒 '+t('ng.rep.lock',{n:lv})+'</div>';
 const dis=ctKnow(w)>=0?['exclusive','nocompete'].map(c=>t('cl.'+c)).join(', '):'',wn=ctWant(w).map(c=>t('cl.'+c)).join(', ')||'-',rq=ctReq(w).map(c=>t('cl.'+c)).join(', ')||'-';
 const pl=ctKnow(w)>=1?(w.age>=33?104:w.age<=27?26:52):0;
 let h='<div class="card stack" style="gap:4px;font-size:13px"><b>'+t('ng.rep.title',{n:K})+'</b>';
 h+=L(1,t('ng.rep.l1',{a:money(ctAsk(w)),l:wks(pl)}));
 h+=L(2,t('ng.rep.l2',{w:wn,d:dis}));
 h+=L(3,t('ng.rep.l3',{r:rq,m:Math.round(w.morale||50),y:Math.round(w.loyal||50)}));
 h+=L(4,w.bid&&w.bid.until>G.week?t('ng.rep.l4',{f:esc(w.bid.f),m:money(w.bid.s)}):t('ng.rep.l4n',{c:wks(Math.max(0,w.contract))}));
 if(K>=5){const b=ctBest(w,n);h+='<div class="row"><button class="btn sm gold" data-act="negbest"'+(b?'':' disabled')+'>'+t('ng.best')+'</button>'+(b?'':'<span class="mute">'+t('ng.best.none')+'</span>')+'</div>'}else h+='<div class="mute">🔒 '+t('ng.rep.lock',{n:5})+' · '+t('ng.best')+'</div>';
 return h+'</div>'}
const _nmp=negModal;negModal=function(){let h=_nmp();const n=G.neg,w=n&&W(n.id);if(!w||n.done)return h;return h.replace('<label class="px" for="ngt">',ctRepH(w,n)+'<label class="px" for="ngt">')};
const _iwp=infraWeekly;infraWeekly=function(){_iwp();(G.ws||[]).forEach(w=>{if(w.pat!=null){const b=ctPatBase(w);w.pat=Math.min(b,w.pat+4);if(w.pat>=b)w.pat=null}if(w.rep&&w.rep.until<=G.week)w.rep=null});sctTick()};
// ---- scouts ----
const SCTUI={t:'',r:'eu',msg:''};
const SCTREG=['na','latam','eu','jp','oth'];
const SCTNEED=[3,7,12,18];
function sctEnsure(){if(!G.sct)G.sct={l:[],cand:null,cw:-99};return G.sct}
const sctCap=()=>Math.min(3,1+Math.floor(G.fed.tier/2));
function sctSal(s){return Math.max(2500,Math.round(wkRev()*(.002+.0025*s.lv)/100)*100)}
function sctMake(){const cc=pickR(COUNTRIES),fem=rnd()<.3,lv=G.fed.tier>=4&&rnd()<.1?5:clamp(1+Math.floor(rnd()*3+(G.fed.tier>=3?1:0)),1,4);return {id:'sc'+(G.uid++),n:nameFor(cc,fem),g:fem?'f':'m',cc,lv,xp:0,look:randLook(Math.random,cc,fem),job:null}}
function sctRefresh(){const g=sctEnsure();g.cand=[sctMake(),sctMake(),sctMake()];g.cw=G.week}
function sctHire(i){const g=sctEnsure();if(g.l.length>=sctCap())return false;if(!g.cand)sctRefresh();const x=g.cand[i];if(!x)return false;const fee=sctSal(x)*5;if(G.fed.cash<fee)return false;G.fed.cash-=fee;g.l.push(x);g.cand.splice(i,1);addNews('n.schire',{w:x.n});return true}
function sctFire(id){const g=sctEnsure();const i=g.l.findIndex(x=>x.id===id);if(i<0)return false;g.l.splice(i,1);return true}
const sctRC=cc=>{const r=mgReg(cc);return r==='pl'?'eu':r};
const sctReg=s=>sctRC(s.cc);
function sctTargets(){return (G.ws||[]).filter(w=>!w.ext&&w.fed!=='RET'&&w.pop>=20).sort((a,b)=>b.pop-a.pop).slice(0,60)}
function sctFed(w){return w.fed===G.fed.id?t('sc.own'):w.fed==='FA'?t('sc.fa'):w.fed==='PRO'?t('sc.pro'):((G.rivals.find(x=>x.id===w.fed)||{}).short||(G.rivals.find(x=>x.id===w.fed)||{}).name||'?')}
function sctSend(sid,kind,target){const g=sctEnsure(),s=g.l.find(x=>x.id===sid);if(!s||s.job)return false;
 if(kind==='w'){const w=W(target);if(!w)return false;const far=sctRC(w.country)!==sctReg(s),c=xc(far?.016:.008),tot=Math.max(2,3+(far?1:0)-(s.lv>=4?1:0));if(G.fed.cash<c)return false;G.fed.cash-=c;s.job={k:'w',t:target,left:tot,tot};return true}
 if(kind==='r'){if(SCTREG.indexOf(target)<0)return false;const c=xc(.02);if(G.fed.cash<c)return false;G.fed.cash-=c;s.job={k:'r',t:target,left:5,tot:5};return true}
 return false}
function sctDone(s){const j=s.job;s.job=null;if(!j)return;s.xp++;while(s.lv<5&&s.xp>=SCTNEED[s.lv-1])s.lv++;
 if(j.k==='w'){const w=W(j.t);if(!w)return;const eff=Math.min(5,s.lv+(sctRC(w.country)===sctReg(s)?1:0));w.rep={lv:Math.max(eff,(w.rep&&w.rep.until>G.week)?w.rep.lv:0),until:G.week+30};addNews('n.screp',{w:s.n,t:w.name,n:w.rep.lv})}
 else{const pool=(G.ws||[]).filter(w=>!w.ext&&w.fed!==G.fed.id&&w.fed!=='RET'&&w.pop>=25&&sctRC(w.country)===j.t).sort((a,b)=>b.pop-a.pop).slice(0,12).sort(()=>rnd()-.5).slice(0,2+Math.floor(s.lv/2));
  const eff=Math.min(5,s.lv+(sctReg(s)===j.t?1:0));pool.forEach(w=>{w.rep={lv:Math.max(eff,(w.rep&&w.rep.until>G.week)?w.rep.lv:0),until:G.week+30}});addNews('n.scsweep',{w:s.n,r:t('sr.'+j.t),n:pool.length,l:pool.slice(0,3).map(w=>w.name).join(', ')})}}
function sctTick(){const g=G.sct;if(!g)return;g.l.forEach(s=>{G.fed.cash-=sctSal(s);if(s.job){s.job.left--;if(s.job.left<=0)sctDone(s)}});if(!g.cand||G.week-g.cw>=10)sctRefresh()}
const _tosc=takeOver;takeOver=function(tid){const ok=_tosc(tid);if(ok)G.sct=null;return ok};
const stars5=lv=>'★'.repeat(lv)+'☆'.repeat(5-lv);
function vSct(){const g=sctEnsure();if(!g.cand)sctRefresh();const cap=sctCap(),pay=g.l.reduce((a,s)=>a+sctSal(s),0);
 let h='<div class="top"><div><h2>'+t('nav.sct')+'</h2><div class="mute" style="max-width:66ch">'+t('sc.sub')+'</div></div></div>';
 if(SCTUI.msg){h+='<div class="note">'+esc(SCTUI.msg)+'</div>';SCTUI.msg=''}
 h+='<div class="card stack" style="gap:3px;font-size:13px"><b>'+t('sc.lv.t')+'</b>'+[1,2,3,4,5].map(i=>'<div><span class="tag">'+i+'</span> '+t('sc.lv.'+i)+'</div>').join('')+'<div class="mute">'+t('sc.lv.note')+'</div></div>';
 h+='<h3>'+t('sc.team',{n:g.l.length,m:cap})+' · '+t('sc.pay',{m:money(pay)})+'</h3>';
 const tg=sctTargets();if(!SCTUI.t||!W(SCTUI.t))SCTUI.t=tg[0]?tg[0].id:'';
 h+=g.l.length?'<div class="grid g2">'+g.l.map(s=>{const need=SCTNEED[s.lv-1],j=s.job;
  const ctr=j?('<div class="note">'+(j.k==='w'?t('sc.jobw',{n:(W(j.t)||{name:'?'}).name}):t('sc.jobr',{r:t('sr.'+j.t)}))+' · '+t('sc.left',{n:j.left})+'</div>'+bar(100*(j.tot-j.left)/j.tot,'t'))
   :('<div class="row" style="gap:6px;flex-wrap:wrap"><select class="field" style="width:auto;max-width:100%" data-chg="sctw">'+tg.map(w=>'<option value="'+w.id+'"'+(SCTUI.t===w.id?' selected':'')+'>'+esc(w.name)+' · '+Math.round(w.pop)+' · '+esc(sctFed(w))+'</option>').join('')+'</select><button class="btn sm" data-act="sctgo" data-k="w" data-id="'+s.id+'">'+t('sc.gow')+'</button></div><div class="row" style="gap:6px;flex-wrap:wrap"><select class="field" style="width:auto" data-chg="sctr">'+SCTREG.map(r=>'<option value="'+r+'"'+(SCTUI.r===r?' selected':'')+'>'+t('sr.'+r)+'</option>').join('')+'</select><button class="btn sm" data-act="sctgo" data-k="r" data-id="'+s.id+'">'+t('sc.gor')+'</button></div>');
  return '<div class="card stack"><div class="row" style="flex-wrap:nowrap;gap:8px"><div class="av" style="min-width:40px;padding:3px">'+avatar(s.look,38)+'</div><div style="min-width:0"><b>'+esc(s.n)+'</b><div class="mute" style="font-size:13px">'+stars5(s.lv)+' · '+t('sc.home',{r:t('sr.'+sctReg(s))})+' · '+money(sctSal(s))+t('ng.perwk')+'</div></div></div>'+(need?'<div class="lbl"><span>'+t('sc.xp')+'</span><span>'+s.xp+'/'+need+'</span></div>'+bar(100*s.xp/need,'t'):'')+ctr+'<div class="row"><button class="btn sm" data-act="sctfire" data-id="'+s.id+'">'+t('sc.fire')+'</button></div></div>'}).join('')+'</div>':'<div class="card mute">'+t('sc.none')+'</div>';
 if(g.l.length<cap){h+='<h3>'+t('sc.cand')+'</h3><div class="grid g3">'+g.cand.map((x,i)=>'<div class="card stack"><div class="row" style="flex-wrap:nowrap;gap:8px"><div class="av" style="min-width:40px;padding:3px">'+avatar(x.look,38)+'</div><div style="min-width:0"><b>'+esc(x.n)+'</b><div class="mute" style="font-size:13px">'+stars5(x.lv)+' · '+t('sc.home',{r:t('sr.'+sctReg(x))})+'</div></div></div><div class="mute" style="font-size:13px">'+money(sctSal(x))+t('ng.perwk')+'</div><button class="btn sm gold" data-act="scthire" data-i="'+i+'"'+(G.fed.cash<sctSal(x)*5?' disabled':'')+'>'+t('sc.hire',{m:money(sctSal(x)*5)})+'</button></div>').join('')+'</div>'}
 const reps=(G.ws||[]).filter(w=>w.rep&&w.rep.until>G.week).sort((a,b)=>b.rep.lv-a.rep.lv||b.pop-a.pop);
 h+='<h3>'+t('sc.reps')+'</h3>'+(reps.length?'<div class="grid g2">'+reps.map(w=>'<div class="card stack">'+wMini(w,sctFed(w)+' · '+t('sc.replv',{n:w.rep.lv})+' · '+t('sc.repleft',{n:w.rep.until-G.week}))+'<div class="mute" style="font-size:13px">'+t('ng.rep.l1',{a:money(ctAsk(w)),l:wks(w.age>=33?104:w.age<=27?26:52)})+'</div></div>').join('')+'</div>':'<div class="card mute">'+t('sc.noreps')+'</div>');
 return h}
// events
const XSSC=[
{k:'scgem',t:['Skaut znalazł perełkę','A scout found a gem'],b:['Jeden z Twoich skautów wypatrzył obiecującego zawodnika: {w}.','One of your scouts spotted a promising wrestler: {w}.'],v:()=>{const w=pickR((G.ws||[]).filter(x=>!x.ext&&x.fed==='FA'&&x.pop>=20));return {w:w?w.name:'?',id:w?w.id:''}},gate:()=>sctEnsure().l.length>0&&(G.ws||[]).some(x=>!x.ext&&x.fed==='FA'&&x.pop>=20),o:[['Zleć pełny raport','Order a full report'],['Zostaw jako ciekawostkę','Keep as a curiosity']],n:[['Raport przygotowany.','Report prepared.'],['Wpis do notesu.','A note in the notebook.']],fx:[v=>{const w=W(v.id);if(w)w.rep={lv:Math.min(5,(sctEnsure().l[0]||{lv:2}).lv),until:G.week+30}},()=>{}]},
{k:'scrival',t:['Skaut wyniuchał ofertę rywala','A scout sniffed out a rival offer'],b:['Skaut donosi, że rywal przygląda się Twojej gwieździe {w}.','A scout reports a rival is eyeing your star {w}.'],v:()=>lrv(lrw(x=>x.pop>=60)),gate:()=>sctEnsure().l.length>0&&mine().some(x=>!x.ext&&x.pop>=60),o:[['Porozmawiaj z nim od razu','Talk to him right away'],['Poczekaj','Wait']],n:[['Gwiazda docenia gest i zostaje dłużej w rozmowie.','The star appreciates the gesture.'],['Sprawa jest na razie nieznana.','The matter stays unknown for now.']],fx:[v=>{const w=lrW(v.id);if(w){w.pat=null;lrL(w,3);w.rep={lv:4,until:G.week+20}}},()=>{}]},
{k:'scpoached',t:['Rywal chce podkupić skauta','A rival wants to poach your scout'],b:['{w} dostał lepszą ofertę od innej federacji.','{w} got a better offer from another promotion.'],v:()=>{const s=pickR(sctEnsure().l);return {w:s?s.n:'?',id:s?s.id:''}},gate:()=>sctEnsure().l.some(s=>s.lv>=3),o:[['Zatrzymaj (−)','Keep him'],['Pozwól odejść','Let him go']],n:[['Skaut zostaje i dostaje wsparcie na przyszłość.','The scout stays and gets support for the future.'],['Skaut odchodzi.','The scout leaves.']],fx:[v=>{const s=sctEnsure().l.find(x=>x.id===v.id);if(s)s.xp+=2;xcash(-xc(.03))},v=>sctFire(v.id)]},
{k:'sctraining',t:['Kurs skautingowy','A scouting course'],b:['Skaut {w} proponuje kurs, który wzmocni jego umiejętności. Koszt: {m}.','Scout {w} proposes a course to sharpen his skills. Cost: {m}.'],v:()=>{const s=pickR(sctEnsure().l.filter(x=>x.lv<5)),c=xc(.04);return {w:s?s.n:'?',id:s?s.id:'',c,m:money(c)}},gate:()=>sctEnsure().l.some(x=>x.lv<5),o:[['Opłać kurs ({m})','Pay for the course ({m})'],['Nie teraz','Not now']],cost:[1,0],n:[['Skaut wraca bystrzejszy.','The scout returns sharper.'],['Nic się nie dzieje.','Nothing happens.']],fx:[v=>{xcash(-v.c);const s=sctEnsure().l.find(x=>x.id===v.id);if(s){s.xp+=3;while(s.lv<5&&s.xp>=SCTNEED[s.lv-1])s.lv++}},()=>{}]},
{k:'sctip',t:['Podpowiedź ze środowiska','A tip from the scene'],b:['Znajomy z branży wspomniał, czego chce {w}.','An industry friend mentioned what {w} wants.'],v:()=>lrv(lrw(x=>x.pop>=50)),gate:()=>mine().some(x=>!x.ext&&x.pop>=50),o:[['Zanotuj','Note it'],['Zignoruj','Ignore']],n:[['Wiesz teraz więcej o jego oczekiwaniach.','You know more about his expectations.'],['Wiadomość przepada.','The info is lost.']],fx:[v=>{const w=lrW(v.id);if(w)w.rep={lv:Math.max(3,(w.rep&&w.rep.until>G.week?w.rep.lv:0)),until:G.week+16}},()=>{}]}
];
XSSC.forEach(XE);
Object.assign(D,{'nav.sct':['Skauci','Scouts'],
 'ng.pat':['Cierpliwość','Patience'],'ng.mood.0':['Spokojna rozmowa','Calm talk'],'ng.mood.1':['Zaczyna się niecierpliwić','Getting impatient'],'ng.mood.2':['Na skraju cierpliwości','At the end of his patience'],
 'ng.mood.0.d':['Zawodnik chętnie słucha.','He is happy to listen.'],'ng.mood.1.d':['Kolejne słabe oferty mogą zakończyć rozmowę.','Another poor offer could end the talks.'],'ng.mood.2.d':['Jeszcze jedna zła oferta i wychodzi.','One more bad offer and he walks.'],
 'ng.walk':['{w} kończy rozmowę i odmawia negocjacji przez {n} tyg.','{w} ends the talks and refuses to negotiate for {n} wks.'],
 'ng.ctr.pct':['Przystałby na około +{p}% pensji.','He would agree to about +{p}% pay.'],'ng.ctr.cl':['Przystałby, gdybyś dodał: {c}.','He would agree if you added: {c}.'],'ng.ctr.both':['Przystałby na około +{p}% i klauzulę: {c}.','He would agree to about +{p}% and the clause: {c}.'],
 'ng.h.vague':['Brakuje mu czegoś, ale nie wiesz czego.','Something is missing for him, but you do not know what.'],
 'ng.rep.none':['Nie znasz tego zawodnika. Wyślij skauta, żeby sprawdził jego oczekiwania.','You do not know this wrestler. Send a scout to check his expectations.'],'ng.rep.title':['Raport (poziom {n})','Report (level {n})'],'ng.rep.lock':['wymaga skauta poz. {n}','needs scout level {n}'],
 'ng.rep.l1':['💰 Oczekuje {a}/tydz., preferuje umowę na {l}.','💰 Expects {a}/wk, prefers a {l} deal.'],'ng.rep.l2':['⭐ Zależy mu na: {w}. Nie znosi: {d}.','⭐ Cares about: {w}. Dislikes: {d}.'],'ng.rep.l3':['⚠️ Twardy warunek: {r}. Nastrój {m}, lojalność {y}.','⚠️ Hard condition: {r}. Mood {m}, loyalty {y}.'],
 'ng.rep.l4':['🕵️ Ofertę składa {f}: {m}/tydz.','🕵️ {f} bids {m}/wk.'],'ng.rep.l4n':['🕵️ Brak ofert rywali. Do końca umowy: {c}.','🕵️ No rival bids. Time left on deal: {c}.'],
 'ng.best':['Idealna oferta','Ideal offer'],'ng.best.set':['Wstawiono ofertę, którą zawodnik na pewno przyjmie.','Inserted an offer he will certainly accept.'],'ng.best.none':['Brak oferty, którą na pewno przyjmie.','No offer he will certainly accept.'],
 'sc.sub':['Skauci sprawdzają, czego chcą zawodnicy: im wyższy poziom, tym więcej odkryją. Wyślij ich do konkretnego zawodnika albo do regionu świata. Skaut z danego regionu odkrywa tam więcej.','Scouts find out what wrestlers want: the higher the level, the more they uncover. Send them to a specific wrestler or a region. A scout from a region learns more there.'],
 'sc.lv.t':['Co odkrywa skaut','What a scout uncovers'],'sc.lv.1':['Oczekiwana pensja i preferowana długość umowy.','Expected salary and preferred contract length.'],'sc.lv.2':['Klauzule, na których mu zależy, i te, których nie znosi.','Clauses he cares about and those he dislikes.'],'sc.lv.3':['Twardy warunek, nastrój, lojalność, dokładna cierpliwość i szansa na zgodę.','Hard condition, mood, loyalty, exact patience and chance of agreeing.'],'sc.lv.4':['Oferty rywali, szczegóły obecnej umowy i dokładne kontrpropozycje.','Rival bids, current deal details and exact counteroffers.'],'sc.lv.5':['Idealna oferta, którą zawodnik na pewno przyjmie.','The ideal offer he will certainly accept.'],'sc.lv.note':['Własnych zawodników znasz na poziomie 2. Raport obowiązuje 30 tygodni.','You know your own wrestlers at level 2. A report is valid for 30 weeks.'],
 'sc.team':['Skauci ({n}/{m})','Scouts ({n}/{m})'],'sc.pay':['koszt {m}/tydz.','cost {m}/wk'],'sc.none':['Nie masz jeszcze skautów.','You have no scouts yet.'],'sc.cand':['Kandydaci','Candidates'],'sc.hire':['Zatrudnij ({m})','Hire ({m})'],'sc.fire':['Zwolnij','Dismiss'],'sc.home':['rejon: {r}','home: {r}'],'sc.xp':['Doświadczenie','Experience'],
 'sc.gow':['Wyślij do zawodnika','Send to wrestler'],'sc.gor':['Wyślij do regionu','Send to region'],'sc.jobw':['Bada: {n}','Scouting: {n}'],'sc.jobr':['Przeszukuje region: {r}','Sweeping region: {r}'],'sc.left':['zostało {n} tyg.','{n} wks left'],
 'sc.reps':['Aktualne raporty','Active reports'],'sc.noreps':['Brak raportów.','No reports.'],'sc.replv':['poz. {n}','lvl {n}'],'sc.repleft':['ważny jeszcze {n} tyg.','valid {n} more wks'],'sc.own':['Twoja federacja','Your promotion'],'sc.fa':['wolny agent','free agent'],'sc.pro':['scena pro','pro scene'],
 'sr.na':['Ameryka Północna','North America'],'sr.latam':['Ameryka Łacińska','Latin America'],'sr.eu':['Europa','Europe'],'sr.jp':['Japonia','Japan'],'sr.oth':['Reszta świata','Rest of the world'],
 'n.schire':['Skaut {w} dołącza do zespołu.','Scout {w} joins the team.'],'n.screp':['Skaut {w} przygotował raport o {t} (poziom {n}).','Scout {w} filed a report on {t} (level {n}).'],'n.scsweep':['Skaut {w} przeszukał region ({r}) i przygotował {n} raportów: {l}.','Scout {w} swept the region ({r}) and filed {n} reports: {l}.']});
