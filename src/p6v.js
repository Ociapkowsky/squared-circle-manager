;/* ===== Contracts with character (clauses) and finance risk (loans, sponsor flight) ===== */
(function(){
window.NEWV=window.NEWV||{};
Object.assign(D,{'nav.loan':['Pożyczki','Loans'],
'cl2.raise.t':['{w} żąda podwyżki','{w} demands a raise'],'cl2.raise.b':['{w} uważa, że zarabia za mało w stosunku do swojej pozycji.','{w} feels underpaid for his standing.'],
'cl2.noloss.t':['Klauzula „nie przegrywam czysto”','The “no clean losses” clause'],'cl2.noloss.b':['{w} chce zapisu w umowie, że nie będzie przegrywał czysto w zwykłych walkach.','{w} wants a contract clause that he will not lose clean in regular matches.'],
'cl2.shot.t':['{w} chce szansy na pas','{w} wants a title shot'],'cl2.shot.b':['{w} żąda obietnicy walki o tytuł w najbliższym czasie.','{w} demands a promise of a title match soon.'],
'cl2.res1':['{w} jest zadowolony z podwyżki.','{w} is happy with the raise.'],'cl2.res2':['{w} przyjął kompromis, choć bez entuzjazmu.','{w} accepted the compromise, without enthusiasm.'],'cl2.res3':['{w} jest wściekły po odmowie.','{w} is furious after the refusal.'],
'n.clauseP':['{w} przegrał czysto mimo klauzuli. Morale spada.','{w} lost clean despite his clause. Morale drops.'],'n.shotok':['{w} dostał obiecaną walkę o pas i jest wdzięczny.','{w} got the promised title match and is grateful.'],'n.shotfail':['{w} nie dostał obiecanej walki o pas i czuje się oszukany.','{w} did not get the promised title match and feels cheated.'],'n.spflee':['Sponsor wycofał się po skandalu.','The sponsor pulled out after the scandal.'],'n.creditor':['Wierzyciele naciskają: zadłużenie bije w wizerunek federacji.','Creditors are pressing: the debt hurts the promotion\'s image.'],
'cl2.panel':['Klauzule w umowach','Contract clauses'],'cl2.noloss':['nie przegrywa czysto','no clean losses'],'cl2.shot':['obiecana walka o pas do W{d}','promised title match by W{d}'],
'ln.title':['Pożyczki','Loans'],'ln.sub':['Gotówka z banku na wzrost, ale z odsetkami co tydzień. Gdy gotówka spada poniżej zera, a dług trwa, wizerunek cierpi.','Bank cash for growth, but with weekly interest. When cash goes negative while in debt, your image suffers.'],'ln.cur':['Aktualny dług: {r} (odsetki {i} tygodniowo)','Current debt: {r} (interest {i} per week)'],'ln.none':['Brak aktywnej pożyczki.','No active loan.'],'ln.s':['Mała pożyczka','Small loan'],'ln.m':['Średnia pożyczka','Medium loan'],'ln.l':['Duża pożyczka','Large loan'],'ln.take':['Weź {a}','Borrow {a}'],'ln.rep25':['Spłać 25%','Repay 25%'],'ln.repall':['Spłać całość','Repay in full'],'ln.have':['Najpierw spłać obecną pożyczkę.','Repay the current loan first.'],'ln.rate':['Oprocentowanie 0,8% tygodniowo.','Interest 0.8% per week.'],'ln.nocash':['Brak gotówki na spłatę.','Not enough cash to repay.']});
/* --- clauses --- */
const RESP={raise:[['Przyznaj podwyżkę 15%','Grant a 15% raise'],['Kompromis: 7%','Compromise: 7%'],['Odmów','Refuse']],noloss:[['Zgódź się na klauzulę','Agree to the clause'],['Kompromis: tylko poza feudami','Compromise: outside feuds only'],['Odmów','Refuse']],shot:[['Obiecaj walkę o pas w 10 tygodni','Promise a title match within 10 weeks'],['Kompromis: w 16 tygodni','Compromise: within 16 weeks'],['Odmów','Refuse']]};
async function demand(){const el=mine().filter(w=>!w.ext&&w.pop>=35&&!w.injury&&!w.farewell);if(!el.length)return;const w=pickR(el);w.cl2=w.cl2||{};
 const ks=['raise','noloss','shot'].filter(k=>k==='raise'||(k==='noloss'&&!w.cl2.noloss)||(k==='shot'&&!w.cl2.shot&&G.titles.length));const k=pickR(ks);
 const i=await askGeneric(esc(t('cl2.'+k+'.t',{w:w.name})),t('cl2.'+k+'.b',{w:w.name}),RESP[k].map(o=>({l:esc(lang==='pl'?o[0]:o[1])})));
 if(k==='raise'){if(i===0){w.salary=r10(w.salary*1.15);evMood(w,8);addNews('n.mom',{t:t('cl2.res1',{w:w.name})})}else if(i===1){w.salary=r10(w.salary*1.07);evMood(w,3);addNews('n.mom',{t:t('cl2.res2',{w:w.name})})}else{evMood(w,-6);addNews('n.mom',{t:t('cl2.res3',{w:w.name})});if(w.morale<30&&rnd()<.3){addNews('n.leave',{w:w.name,f:'?'});w.fed='FA';purgeW(w.id)}}}
 else if(k==='noloss'){if(i===0){w.cl2.noloss=1;evMood(w,10)}else if(i===1){w.cl2.noloss=2;evMood(w,4)}else evMood(w,-5)}
 else{if(i===0){w.cl2.shot={due:G.week+10};evMood(w,8)}else if(i===1){w.cl2.shot={due:G.week+16};evMood(w,4)}else evMood(w,-5)}}
const _we4=weekEvents;weekEvents=async function(){try{if(G.week>8&&rnd()<.1)await demand()}catch(e){}return _we4.apply(this,arguments)};
const _fs4=finishShow;finishShow=function(out){let ctx=null;try{ctx=(G.card||[]).filter(matchReady).map(m=>({ids:sides(m).A.concat(sides(m).B),title:!!m.title,feud:!!feudOf(m)}))}catch(e){}
 const r=_fs4.apply(this,arguments);
 try{const s=G.summary;if(s&&s.out&&ctx){s.out.filter(o=>o.pos!=null).forEach(o=>{const c=ctx[o.pos];if(!c)return;const wn=o.wid||[];
   c.ids.forEach(id=>{const w=W(id);if(!w||!w.cl2)return;const lost=wn.indexOf(id)<0;
    if(w.cl2.noloss&&lost&&o.finish==='clean'&&!(w.cl2.noloss===2&&c.feud)){evMood(w,-8);addNews('n.clauseP',{w:w.name})}
    if(w.cl2.shot&&c.title){evMood(w,8);w.pop=clamp(w.pop+.4,1,100);addNews('n.shotok',{w:w.name});delete w.cl2.shot}})})}}catch(e){}return r};
const _ew5=endWeek;endWeek=function(){try{mine().forEach(w=>{if(w.cl2&&w.cl2.shot&&w.cl2.shot.due<G.week){evMood(w,-14);addNews('n.shotfail',{w:w.name});delete w.cl2.shot}});
  const L=G.loan;if(L&&L.rem>0){const i=Math.round(L.rem*.008);G.fed.cash-=i;L.paid=(L.paid||0)+i;if(G.fed.cash<0){G.fed.pop=clamp(G.fed.pop-.5,2,100);const b=boardEnsure();b.conf=clamp(b.conf-2,0,100);addNews('n.creditor')}}}catch(e){}return _ew5.apply(this,arguments)};
const _vct=vCt;vCt=function(){let h=_vct.apply(this,arguments);try{const l=mine().filter(w=>w.cl2&&(w.cl2.noloss||w.cl2.shot));if(!l.length)return h;
  return h+'<div class="card stack"><h3>'+esc(t('cl2.panel'))+'</h3>'+l.map(w=>'<div>'+esc(w.name)+': '+[w.cl2.noloss?t('cl2.noloss')+(w.cl2.noloss===2?' (*)':''):'',w.cl2.shot?t('cl2.shot',{d:w.cl2.shot.due}):''].filter(Boolean).join(' · ')+'</div>').join('')+'</div>'}catch(e){return h}};
/* --- sponsor flight --- */
const _an2=addNews;addNews=function(k,v){const r=_an2.apply(this,arguments);try{if(/^n\.(crime|drug|raidp|shady|payoff)/.test(k)&&G.sponsor&&rnd()<.45){G.sponsor=null;_an2('n.spflee')}}catch(e){}return r};
/* --- loans --- */
const offers=()=>{const b=Math.max(wkRev(),2000);return [['s',r10(b*3)],['m',r10(b*8)],['l',r10(b*20)]]};
NEWV.loan=function(){const L=G.loan;let h='<div class="top"><div><h2>'+esc(t('ln.title'))+'</h2><div class="mute" style="max-width:70ch">'+esc(t('ln.sub'))+' '+esc(t('ln.rate'))+'</div></div></div>';
 h+='<div class="card stack">'+(L&&L.rem>0?'<div><b>'+esc(t('ln.cur',{r:money(L.rem),i:money(Math.round(L.rem*.008))}))+'</b></div><div class="row"><button class="btn" data-act="lnrep" data-v="25">'+esc(t('ln.rep25'))+'</button><button class="btn gold" data-act="lnrep" data-v="100">'+esc(t('ln.repall'))+'</button></div>':'<div class="mute">'+esc(t('ln.none'))+'</div>')+'</div>';
 h+='<div class="grid g3">'+offers().map(o=>'<div class="card stack"><b>'+esc(t('ln.'+o[0]))+'</b><div style="font-size:22px">'+money(o[1])+'</div><button class="btn'+(L&&L.rem>0?'':' gold')+'" data-act="lntake" data-v="'+o[1]+'"'+(L&&L.rem>0?' disabled':'')+'>'+esc(t('ln.take',{a:money(o[1])}))+'</button></div>').join('')+'</div>'+(L&&L.rem>0?'<div class="mute">'+esc(t('ln.have'))+'</div>':'');return h};
Object.assign(ACT,{lntake(e){if(G.loan&&G.loan.rem>0)return;const a=+e.dataset.v;G.loan={rem:a,p:a,paid:0};G.fed.cash+=a;save();render()},
 lnrep(e){const L=G.loan;if(!L||L.rem<=0)return;const a=Math.min(L.rem,e.dataset.v==='100'?L.rem:Math.round(L.p*.25));if(G.fed.cash<a){const m=document.querySelector('.top');if(m)m.insertAdjacentHTML('afterend','<div class="note">'+esc(t('ln.nocash'))+'</div>');return}G.fed.cash-=a;L.rem-=a;if(L.rem<=0)G.loan=null;save();render()}});
})();
if(typeof normTexts==="function")normTexts();
