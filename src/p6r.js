;/* ===== Livelier card: match previews, risk, show theme, pace chart, post-match moments ===== */
(function(){
const STY={pur:['technician','strong'],brw:['brawler','hardcore'],fly:['highflyer','lucha'],pwr:['powerhouse']};
const TH=['pur','brw','fly','pwr','fam','edge'];
Object.assign(D,{
'pv.feud1':['Napięcie między {a} a {b} sięgnęło zenitu. Dziś ma się rozstrzygnąć.','The tension between {a} and {b} has peaked. Tonight it should be settled.'],
'pv.feud2':['Konflikt {a} z {b} rośnie. Dziś kolejny rozdział historii.','The {a} vs {b} conflict is growing. Tonight, another chapter.'],
'pv.feud3':['{a} i {b} jeszcze się nie rozgrzali, ale iskry już lecą.','{a} and {b} are only warming up, but sparks are already flying.'],
'pv.title1':['Pas na szali: {a} kontra {b}. Ktoś wyjdzie z hali jako mistrz.','The title is on the line: {a} vs {b}. Someone leaves as champion.'],
'pv.title2':['O pas! {a} i {b} wiedzą, że takiej szansy może nie być drugiej.','For the belt! {a} and {b} know there may be no second chance.'],
'pv.gim':['Starcie znane z legend: {a} kontra {b}. Hala już czuje, jak to się skończy.','A clash from legend: {a} vs {b}. The crowd already feels how it ends.'],
'pv.cl1':['Klasyk: bohater kontra łotr. {a} kontra {b}.','A classic: hero vs villain. {a} vs {b}.'],
'pv.cl2':['Hala wie, komu kibicować. {a} kontra {b}, z klasyczną chemią dobra i zła.','The crowd knows who to cheer. {a} vs {b}, with classic good-vs-evil chemistry.'],
'pv.same':['{a} kontra {b}: nikt nie wie, komu kibicować, i to jest piękne.','{a} vs {b}: nobody knows who to root for, and that is the beauty.'],
'pv.young':['Młody {a} kontra wyjadacz {b}: lekcja pokory czy zmiana warty?','Young {a} vs veteran {b}: a lesson in humility or a changing of the guard?'],
'pv.star':['Gwiazda {a} kontra {b}. Czy underdog zaskoczy faworyta?','Star {a} vs {b}. Can the underdog surprise the favourite?'],
'pv.stip':['{a} i {b} w specjalnych warunkach. Nie będzie litości.','{a} and {b} under special rules. There will be no mercy.'],
'pv.gen1':['{a} kontra {b}: dobra okazja, żeby pokazać, na co ich stać.','{a} vs {b}: a good chance to show what they are made of.'],
'pv.gen2':['{a} wchodzi do ringu z pewnością siebie, {b} z głodem wygranej.','{a} steps in with confidence, {b} with a hunger to win.'],
'pv.gen3':['Dwa style, jedna hala. {a} kontra {b}.','Two styles, one arena. {a} vs {b}.'],
'rk.0':['🛡 Bezpiecznie','🛡 Safe'],'rk.1':['⚖ Normalnie','⚖ Normal'],'rk.2':['🎲 Ryzykownie','🎲 Risky'],
'rk.0d':['Mniej wpadek i mniejszy rozrzut oceny (ok. 3★), mniej zdarzeń w walce.','Fewer mishaps, smaller rating spread (around 3★), fewer in-match events.'],
'rk.1d':['Standardowa walka.','A standard match.'],'rk.2d':['Szansa na 5★, ale też na wpadkę, kontuzję i więcej zdarzeń.','A shot at 5★, but also at a flop, injury and more events.'],
'th.title':['Motyw gali','Show theme'],'th.none':['Bez motywu','No theme'],'th.sub':['Walki pasujące do motywu dostają bonus do oceny, a wybrana grupa fanów chętniej wraca. Walki całkiem obok tematu tracą trochę. Motyw działa na jedną galę.','Matches that fit the theme get a rating bonus, and the chosen fan group warms up. Matches far off theme lose a bit. The theme lasts one show.'],
'pc.title':['Tempo gali','Show pace'],'pc.weak':['Dwie słabe walki z rzędu uśpią halę. Wstaw tu mocniejszą walkę.','Two weak matches in a row put the arena to sleep. Put a stronger match here.'],'pc.me':['Main event jest słabszy niż reszta karty: finał nie zrobi wrażenia.','The main event is weaker than the rest: the finish will not land.'],'pc.good':['Dobre tempo: karta narasta do głównej walki.','Good pace: the card builds toward the main event.'],'pc.est':['szacunkowo','estimated'],
'cd.pace1':['Tempo gali: {v}','Show pace: {v}'],'cd.pgood':['dobre, karta narastała','good, the card built up'],'cd.pbad':['słabe, przestój w środku karty','poor, a lull mid-card'],
'mm.ok':['OK','OK'],'n.mom':['Po gali: {t}','After the show: {t}']});
/* ---- previews ---- */
function hash(s){let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
const short=ids=>{const n=ids.map(W).filter(Boolean).map(w=>w.name);return n.length>2?n.slice(0,2).join(' & ')+'+':n.join(' & ')};
function blurb(m){const s=sides(m);if(!s.A.length||!s.B.length)return '';const a=short(s.A),b=short(s.B),ffa=MODES[m.mode].ffa;
 if(ffa)return '';const A=s.A.map(W),B=s.B.map(W);const fo=feudOf(m);let k;const seed=hash(s.A.concat(s.B).join(',')+G.week);
 const pick=arr=>arr[seed%arr.length];
 if(m.title)k=pick(['pv.title1','pv.title2']);
 else if(fo&&fo.f.heat>=60)k='pv.feud1';
 else if(fo&&fo.f.heat>=25)k='pv.feud2';
 else if(fo)k='pv.feud3';
 else{let gx=null;try{gx=gimFx(m)}catch(e){}
  if(gx&&gx.best&&gx.v>.2)k='pv.gim';
  else if(m.stip&&m.stip!=='none')k='pv.stip';
  else{const ra=avg(A.map(w=>w.role==='face'?1:w.role==='heel'?-1:0)),rb=avg(B.map(w=>w.role==='face'?1:w.role==='heel'?-1:0));
   if(ra*rb<0)k=pick(['pv.cl1','pv.cl2']);
   else if(ra===rb&&ra!==0)k='pv.same';
   else{const ya=avg(A.map(w=>w.age)),yb=avg(B.map(w=>w.age));
    if(Math.abs(ya-yb)>=10)k='pv.young';else if(Math.abs(avg(A.map(w=>w.pop))-avg(B.map(w=>w.pop)))>=22)k='pv.star';else k=pick(['pv.gen1','pv.gen2','pv.gen3'])}}}
 let x1=a,x2=b;if(k==='pv.young'&&avg(A.map(w=>w.age))>avg(B.map(w=>w.age))){x1=b;x2=a}
 if(k==='pv.star'&&avg(A.map(w=>w.pop))<avg(B.map(w=>w.pop))){x1=b;x2=a}
 return t(k,{a:x1,b:x2})}
/* ---- risk ---- */
const riskOf=m=>m.risk==null?1:m.risk;
const _fixM=null;
const _bs6=baseStars;baseStars=function(m,pos,total){let s=_bs6.apply(this,arguments);try{const r=riskOf(m);if(r===0)s=s+(3-s)*.22;else if(r===2)s+=(rnd()-.4)*1.3;
  if(G.theme){const f=themeFrac(m,G.theme);s+=.35*f-(f<.2?.12:0)}}catch(e){}return clamp(s,.5,5)};
const _pe=pickEvent;pickEvent=function(m){let e=_pe.apply(this,arguments);try{const r=riskOf(m);if(r===0&&e&&rnd()<.5)return null;if(r===2&&!e&&rnd()<.15)return _pe.apply(this,arguments)}catch(x){}return e};
const _fm=finalizeMatch;finalizeMatch=function(m){const r=_fm.apply(this,arguments);try{if(riskOf(m)===2&&rnd()<.05){const ps=sides(m).A.concat(sides(m).B).map(W).filter(w=>w&&!w.injury);const w=pickR(ps);if(w)injure(w,1+Math.floor(rnd()*3))}}catch(e){}return r};
/* ---- theme ---- */
function themeFrac(m,th){const ps=sides(m).A.concat(sides(m).B).map(W).filter(Boolean);if(!ps.length)return 0;
 if(STY[th])return ps.filter(p=>STY[th].indexOf(p.style)>=0).length/ps.length;
 if(th==='fam')return ps.filter(p=>p.role==='face').length/ps.length;
 return Math.min(1,ps.filter(p=>p.role==='heel').length/ps.length*.7+(feudOf(m)?.5:0))}
/* ---- UI ---- */
const _slot2=slotHtml;slotHtml=function(m,i){let h=_slot2.apply(this,arguments);try{if(!matchReady(m))return h;const r=riskOf(m),bl=blurb(m);
  let x='';if(bl)x+='<div style="font-style:italic;font-size:13px;opacity:.85">„'+esc(bl)+'”</div>';
  x+='<div class="row" style="gap:6px;flex-wrap:wrap;align-items:center">'+[0,1,2].map(v=>'<button class="btn sm'+(r===v?' gold':'')+'" data-act="mrisk" data-i="'+i+'" data-v="'+v+'" title="'+esc(t('rk.'+v+'d'))+'">'+esc(t('rk.'+v))+'</button>').join('')+'<span class="mute" style="font-size:12px">'+esc(t('rk.'+r+'d'))+'</span></div>';
  const k=h.lastIndexOf('</div>');return h.slice(0,k)+x+h.slice(k)}catch(e){return h}};
function est(m,i,n){let s=0;for(let q=0;q<3;q++)s+=baseStars(m,i,n);return s/3}
function pacePanel(){const ms=(G.card||[]).filter(matchReady);let h='<div class="card stack" style="gap:8px"><h3>'+esc(t('th.title'))+'</h3><div class="mute" style="font-size:13px;max-width:80ch">'+esc(t('th.sub'))+'</div><div class="row" style="gap:6px;flex-wrap:wrap">'+
  '<button class="btn sm'+(!G.theme?' gold':'')+'" data-act="theme" data-v="">'+esc(t('th.none'))+'</button>'+TH.map(k=>'<button class="btn sm'+(G.theme===k?' gold':'')+'" data-act="theme" data-v="'+k+'">'+esc(t('sg.'+k))+'</button>').join('')+'</div>';
 if(ms.length>=2){const n=ms.length,v=ms.map((m,i)=>est(m,i,n));const mx=5;
  h+='<h3 style="margin-top:6px">'+esc(t('pc.title'))+' <span class="mute" style="font-size:12px;font-weight:400">('+esc(t('pc.est'))+')</span></h3><div style="display:flex;align-items:flex-end;gap:8px;height:96px">'+
   v.map((s,i)=>{const col=s>=3.75?'#2f9e44':s>=2.75?'#e0a100':'#d6336c';return '<div style="flex:1;min-width:0;text-align:center;font-size:11px"><div style="height:'+Math.round(s/mx*70)+'px;background:'+col+';border-radius:5px 5px 0 0;opacity:.85"></div><b>'+(Math.round(s*10)/10).toString().replace('.',lang==='pl'?',':'.')+'</b>'+(i===n-1?' ★':'')+'</div>'}).join('')+'</div>';
  const weak=v.some((s,i)=>i>0&&s<=2.5&&v[i-1]<=2.5),me=v[n-1]<avg(v.slice(0,n-1))-.05;
  h+=weak?'<div class="note">⚠ '+esc(t('pc.weak'))+'</div>':me?'<div class="note">⚠ '+esc(t('pc.me'))+'</div>':'<div class="mute" style="font-size:13px">✓ '+esc(t('pc.good'))+'</div>'}
 return h+'</div>'}
const _vs6=vShow;vShow=function(){const h=_vs6.apply(this,arguments);try{if(RUN||(G.summary&&G.showResult))return h;return h+pacePanel()}catch(e){return h}};
Object.assign(ACT,{mrisk(e){const m=G.card[+e.dataset.i];if(!m)return;m.risk=+e.dataset.v;render()},theme(e){G.theme=e.dataset.v||null;render()}});
/* ---- finish: pace effect, theme effect, moments ---- */
const MOM={
 chant:{pl:['Hala skanduje nazwisko {w}','The arena chants {w}\'s name'],bpl:['Po walce publiczność nie przestaje śpiewać nazwiska {w}.','After the match the crowd will not stop chanting {w}\'s name.'],o:[
  ['Niech wchłonie ten moment','Let him soak it in',[[1,{wp:1,mw:4},'{w} jest wniebowzięty.','{w} is on cloud nine.']]],
  ['Daj mu mikrofon','Give him the mic',[[.6,{wp:1.6,fed:.3},'Przemowa {w} porwała halę.','{w}\'s speech lifted the arena.'],[.4,{wp:-.3,fed:-.2},'{w} się zaciął, hala ucichła.','{w} choked and the room went quiet.']]],
  ['Skromnie schodzi do szatni','Quietly back to the locker room',[[1,{mw:2,fed:.1},'Szacunek za klasę.','Respect for the class.']]]]},
 jumpin:{pl:['{l} wskakuje na ring','{l} jumps the ring'],bpl:['Przegrany {l} nie wytrzymał i wpada na ring po walce przeciwko {w}.','Beaten {l} cannot take it and storms the ring against {w}.'],o:[
  ['Niech zacznie się feud','Let a feud begin',[[1,{feud:1,fed:.2},'Rodzi się nowa rywalizacja.','A new rivalry is born.']]],
  ['Ochrona, wyrzućcie go','Security, remove him',[[1,{fed:-.1,ml:-3},'Hala buczy na ochronę.','The crowd boos security.']]],
  ['Niech sobie podadzą ręce','Make them shake hands',[[1,{mw:2,ml:2,fed:.2},'Szacunek między rywalami.','Respect between rivals.']]]]},
 promo:{pl:['{w} prosi o głos','{w} asks for the mic'],bpl:['{w} chce po walce powiedzieć kilka słów do publiczności.','{w} wants to say a few words to the crowd after the match.'],o:[
  ['Pozwól mu mówić','Let him talk',[[.62,{wp:1.2,fed:.4},'Mocne promo, fani oszaleli.','A strong promo, fans went wild.'],[.38,{wp:-.4,fed:-.2},'Promo wyszło drewniane.','The promo came out wooden.']]],
  ['Nie, koniec gali','No, the show is over',[[1,{},'Spokojnie.','Calm.']]]]},
 respect:{pl:['Szacunek po walce','Respect after the match'],bpl:['{w} i {l} ściskają sobie ręce, hala bije brawo.','{w} and {l} shake hands and the arena applauds.'],o:[
  ['Oklaski dla obu','Applause for both',[[1,{wp:.5,lp:.5,fed:.3},'Piękny moment.','A beautiful moment.']]],
  ['Zapowiedz rewanż','Announce a rematch',[[1,{fed:.2,mw:2,ml:2},'Fani czekają na rewanż.','Fans are waiting for the rematch.']]]]},
 boo:{pl:['Hala buczy po walce','The arena boos after the match'],bpl:['Walka {w} z {l} nie porwała publiczności, słychać buczenie.','The {w} vs {l} match did not move the crowd, boos are heard.'],o:[
  ['Przeprosiny z mikrofonu','Apologise on the mic',[[1,{fed:.1,conf:1},'Fani doceniają szczerość.','Fans appreciate the honesty.']]],
  ['Zignoruj','Ignore it',[[1,{fed:-.3},'Buczenie nie cichnie.','The boos do not fade.']]],
  ['Obwiń zawodników','Blame the wrestlers',[[1,{mw:-4,ml:-4},'W szatni zrobiło się nerwowo.','The locker room turned tense.']]]]}};
const nm=(s,w,l)=>s.replace(/\{w\}/g,w).replace(/\{l\}/g,l);
async function playMoment(mo){const d=MOM[mo.k],W1=W(mo.w),L1=mo.l?W(mo.l):null;if(!d||!W1)return;const wn=W1.name,ln=L1?L1.name:'?';
 const opts=d.o.map(o=>({l:esc(nm(lang==='pl'?o[0]:o[1],wn,ln))}));
 const i=await askGeneric(esc(nm(lang==='pl'?d.pl[0]:d.pl[1],wn,ln)),nm(lang==='pl'?d.bpl[0]:d.bpl[1],wn,ln),opts);
 const o=d.o[i];if(!o)return;let r=rnd(),br=o[2][o[2].length-1];for(const b of o[2]){r-=b[0];if(r<=0){br=b;break}}const fx=br[1];
 if(fx.wp)W1.pop=clamp(W1.pop+fx.wp*popDim(W1.pop),1,100);if(fx.lp&&L1)L1.pop=clamp(L1.pop+fx.lp*popDim(L1.pop),1,100);
 if(fx.mw)evMood(W1,fx.mw);if(fx.ml&&L1)evMood(L1,fx.ml);if(fx.fed)G.fed.pop=clamp(G.fed.pop+fx.fed,2,100);if(fx.conf){const b=boardEnsure();b.conf=clamp(b.conf+fx.conf,0,100)}
 if(fx.feud&&L1){const busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(q=>busy.add(q)));if(!busy.has(W1.id)&&!busy.has(L1.id)){const sc=Object.keys(SC).find(k=>{const f={id:'f'+(G.uid++),sc:k,A:[W1.id],B:[L1.id],stA:null,stB:null,stR:null,titleId:null,fedId:null,mw:0,g:1,heat:SC[k].h*2,matches:0,used:false};if(!feudMode(f))return false;flog(f,{k:'s'});G.feuds.push(f);addNews('n.feudstart',{a:sideLabel(f.A,null),b:sideLabel(f.B,null)});return true})}}
 addNews('n.mom',{t:nm(lang==='pl'?br[2]:br[3],wn,ln)})}
const _we=weekEvents;weekEvents=async function(){try{if(G.mom&&G.mom.length){const l=G.mom.splice(0,2);for(const mo of l)await playMoment(mo);save()}}catch(e){}return _we.apply(this,arguments)};
const _fs2=finishShow;finishShow=function(out){let ctx=null;try{const ms=(G.card||[]).filter(matchReady);ctx={parts:ms.map(m=>({A:sides(m).A.slice(),B:sides(m).B.slice()})),theme:G.theme}}catch(e){}
 const r=_fs2.apply(this,arguments);
 try{const s=G.summary;if(s&&s.out){const ms=s.out.filter(o=>o.pos!=null&&!o.promo);let adj=0,pv=0;const v=ms.map(o=>o.stars);
   const weak=v.some((x,i)=>i>0&&x<=2.5&&v[i-1]<=2.5),cres=v.length>=3&&v[v.length-1]>=avg(v.slice(0,-1))&&!weak;
   if(weak){adj=-.15;pv=-1}else if(cres){adj=.15;pv=1}
   if(adj){const b2=G.fed.pop;G.fed.pop=clamp(G.fed.pop+adj,2,100);s.dpop+=G.fed.pop-b2}
   if(s.cx)s.cx.pace=pv;
   if(ctx&&ctx.theme&&G.seg&&G.seg[ctx.theme]){G.seg[ctx.theme].sat=clamp(G.seg[ctx.theme].sat+(s.rating>=3?3:-2),0,100)}
   G.theme=null;
   // moments
   G.mom=G.mom||[];const idxs=ms.map((o,i)=>i);const best=ms.slice().sort((a,b)=>b.stars-a.stars)[0],worst=ms.slice().sort((a,b)=>a.stars-b.stars)[0];
   const mk=(o,k)=>{const p=ctx&&ctx.parts[o.pos];if(!p)return;const wid=(o.wid||[])[0];if(!wid)return;const all=p.A.concat(p.B);const los=all.find(x=>(o.wid||[]).indexOf(x)<0);G.mom.push({k:k,w:wid,l:los||null})};
   if(best&&best.stars>=3.75&&rnd()<.6)mk(best,pickR(['chant','jumpin','promo','respect']));
   else if(worst&&worst.stars<=2.25&&rnd()<.6)mk(worst,'boo');
   if(G.mom.length>3)G.mom=G.mom.slice(-3);save()}}catch(e){}return r};
const _vsum2=vSummary;vSummary=function(){let h=_vsum2.apply(this,arguments);try{const c=G.summary&&G.summary.cx;if(!c||!c.pace)return h;const l='<div style="font-size:14px">🎼 '+esc(t('cd.pace1',{v:t(c.pace>0?'cd.pgood':'cd.pbad')}))+'</div>';const i=h.indexOf('</div></div>',h.indexOf(esc(t('cd.title'))));return i<0?h:h.slice(0,i)+l+h.slice(i)}catch(e){return h}};
})();
if(typeof normTexts==="function")normTexts();
