;/* ===== Locker room: bonds, plot twists, training ===== */
(function(){
window.NEWV=window.NEWV||{};
Object.assign(D,{'nav.bonds':['Więzi','Bonds'],'nav.train':['Trening','Training'],
'bnd.title':['Relacje w szatni','Locker-room bonds'],'bnd.sub':['Przyjaźnie, zazdrość i mentoring wpływają na chemię walk i humor zawodników. Wykorzystaj to na karcie: przyjaciele przeciw sobie i zazdrośnicy w jednym ringu robią emocje, ale zazdrośnicy w jednej drużynie psują grę.','Friendships, jealousy and mentoring shape match chemistry and morale. Use them on the card: friends against each other and jealous rivals in one ring bring emotion, but jealous partners in one team spoil it.'],
'bnd.friend':['Przyjaciele','Friends'],'bnd.jealous':['Zazdrość','Jealousy'],'bnd.mentor':['Mentor i uczeń','Mentor & pupil'],'bnd.none':['Brak relacji. Potrzebni zawodnicy w szatni.','No bonds yet. You need some wrestlers.'],
'bnd.fx.friend':['Razem w drużynie +0,15★, przeciw sobie +0,2★ (emocje)','Together on a team +0.15★, against each other +0.2★ (emotion)'],'bnd.fx.jealous':['Przeciw sobie +0,35★, w jednej drużynie −0,3★','Against each other +0.35★, on the same team −0.3★'],'bnd.fx.mentor':['Razem +0,2★, uczeń wygrywa z mentorem +0,35★','Together +0.2★, pupil beats mentor +0.35★'],
'bnd.c.friend':['Przyjaciele {v}★','Friends {v}★'],'bnd.c.jealous':['Zazdrość {v}★','Jealousy {v}★'],'bnd.c.mentor':['Mentor i uczeń {v}★','Mentor & pupil {v}★'],
'tw2.betray.t':['Zdrada w stajni','Betrayal in the stable'],'tw2.betray.b':['{x} szykuje się, by zdradzić stajnię {s} i zwrócić się przeciwko {y}.','{x} is preparing to betray the stable {s} and turn on {y}.'],
'tw2.back.t':['Niespodziewany powrót','A surprise return'],'tw2.back.b':['Na liście wolnych agentów jest {x}, gwiazda, która ostatnio zniknęła ze sceny. Fani mówią o jego powrocie.','{x}, a star who vanished from the scene, is among the free agents. Fans are talking about a comeback.'],
'tw2.up.t':['Bohater znikąd','A hero from nowhere'],'tw2.up.b':['{x} z dołu karty nagle porywa halę po wygranej, którą nikt się nie spodziewał.','{x} from the bottom of the card suddenly lifts the arena after a win nobody expected.'],
'trn.title':['Trening','Training'],'trn.sub':['Ustaw tygodniowy cel treningowy zawodnikom. Młodzi rosną najszybciej, każdy trening kosztuje i lekko męczy. Trener przyspiesza efekty.','Set a weekly training focus for your wrestlers. The young grow fastest, each session costs money and tires a little. A coach speeds it up.'],
'trn.none':['— brak —','— none —'],'trn.slots':['Miejsca treningowe: {u} / {m}. Koszt: {c} tygodniowo na osobę.','Training slots: {u} / {m}. Cost: {c} a week per person.'],'trn.auto':['Auto: młodzi na najsłabszą cechę','Auto: youngsters on weakest stat'],'trn.clear':['Wyczyść wszystko','Clear all'],'trn.full':['Brak wolnych miejsc','No free slots'],'n.trained2':['{w} podciągnął {k} dzięki treningowi.','{w} improved {k} through training.'],'trn.age':['{n} l.','age {n}']});
/* ---------- bonds ---------- */
function bondsEnsure(){const own=mine().filter(w=>!w.ext);G.bonds=(G.bonds||[]).filter(b=>{const a=W(b.a),c=W(b.b);return a&&c&&a.fed===G.fed.id&&c.fed===G.fed.id});
 const want=Math.min(12,Math.ceil(own.length/3));let tries=0;
 while(G.bonds.length<want&&tries++<40){const a=pickR(own),c=pickR(own);if(!a||!c||a.id===c.id)continue;if(G.bonds.some(b=>(b.a===a.id&&b.b===c.id)||(b.a===c.id&&b.b===a.id)))continue;
  let t_,x=a,y=c;if(Math.abs(a.age-c.age)>=9&&Math.abs(a.pop-c.pop)>=12){t_='mentor';if(a.age<c.age||a.pop<c.pop){x=c;y=a}}else t_=rnd()<.5?'friend':'jealous';
  if(t_==='jealous'&&Math.abs(a.pop-c.pop)>22)t_='friend';G.bonds.push({a:x.id,b:y.id,t:t_,w:G.week})}
 return G.bonds}
function bondFx(m){const s=sides(m),A=s.A,B=s.B;if(MODES[m.mode].ffa)return{v:0,list:[]};let v=0;const list=[];
 bondsEnsure().forEach(b=>{const inA=id=>A.indexOf(id)>=0,inB=id=>B.indexOf(id)>=0;const same=(inA(b.a)&&inA(b.b))||(inB(b.a)&&inB(b.b)),opp=(inA(b.a)&&inB(b.b))||(inB(b.a)&&inA(b.b));if(!same&&!opp)return;let x=0;
  if(b.t==='friend')x=same?.15:.2;else if(b.t==='jealous')x=same?-.3:.35;else{if(same)x=.2;else{const pupilSide=inA(b.b)?'a':'b';x=m.winner===pupilSide?.35:.1}}
  v+=x;list.push({t:b.t,x:x})});return{v:Math.max(-.4,Math.min(.6,v)),list:list}}
window.bondFx=bondFx;
const _bs8=baseStars;baseStars=function(m,pos,total){let s=_bs8.apply(this,arguments);try{s+=bondFx(m).v}catch(e){}return clamp(s,.5,5)};
const _slot3=slotHtml;slotHtml=function(m){let h=_slot3.apply(this,arguments);try{if(!matchReady(m))return h;const f=bondFx(m);if(!f.list.length)return h;const f2s=x=>(x>=0?'+':'−')+String(Math.abs(x)).replace('.',lang==='pl'?',':'.');
  const chips=f.list.map(l=>'<span class="tag" style="color:'+(l.x>=0?'#2f9e44':'#d6336c')+'">'+(l.t==='friend'?'🤝':l.t==='jealous'?'😤':'🎓')+' '+esc(t('bnd.c.'+l.t,{v:f2s(l.x)}))+'</span>').join('');
  const i=h.lastIndexOf('</div>');return h.slice(0,i)+'<div class="row" style="gap:6px;flex-wrap:wrap">'+chips+'</div>'+h.slice(i)}catch(e){return h}};
NEWV.bonds=function(){const bs=bondsEnsure();let h='<div class="top"><div><h2>'+esc(t('bnd.title'))+'</h2><div class="mute" style="max-width:76ch">'+esc(t('bnd.sub'))+'</div></div></div>';if(!bs.length)return h+'<div class="note">'+esc(t('bnd.none'))+'</div>';
 return h+'<div class="grid g2">'+bs.map(b=>{const a=W(b.a),c=W(b.b);return '<div class="card stack"><div class="row spread"><b>'+(b.t==='friend'?'🤝 ':b.t==='jealous'?'😤 ':'🎓 ')+esc(t('bnd.'+b.t))+'</b><span class="mute" style="font-size:12px">W'+b.w+'</span></div>'+wMini(a,t('role.'+a.role).split(' ')[0])+wMini(c,t('role.'+c.role).split(' ')[0])+'<div class="mute" style="font-size:13px">'+esc(t('bnd.fx.'+b.t))+'</div></div>'}).join('')+'</div>'};
/* ---------- weekly: bond morale + training ---------- */
const slots=()=>2+(G.fed.tier||1)*2;
const trCost=()=>r10(Math.max(wkRev()*.006,40));
function trained(){const T=G.train||{};return mine().filter(w=>T[w.id]&&!w.injury)}
const _ew4=endWeek;endWeek=function(){try{if(G.summary){
   bondsEnsure().forEach(b=>{const a=W(b.a),c=W(b.b);if(!a||!c)return;if(b.t==='jealous'){const ca=isChamp(a.id),cc=isChamp(c.id);if(ca&&!cc)evMood(c,-.7);else if(cc&&!ca)evMood(a,-.7)}
    else if(b.t==='friend'){if(a.morale<40)evMood(c,-.3);if(c.morale<40)evMood(a,-.3)}
    else if(b.t==='mentor'&&!a.injury&&!c.injury&&c.pop<a.pop)c.pop=clamp(c.pop+.04,1,100)});
   const T=G.train||{};let paid=0;const cf=coachFx();
   Object.keys(T).forEach(id=>{const w=W(id);if(!w||w.fed!==G.fed.id){delete T[id];return}if(w.injury)return;if(paid>=slots()*trCost()*2&&0)return;G.fed.cash-=trCost();paid++;
    const p=(w.age<=26?.2:w.age<=32?.13:.06)*(1+(cf.p||0)*4);w.fatigue=clamp((w.fatigue||0)+3,0,100);evMood(w,.3);const k=T[id];if(w[k]<99&&rnd()<p){w[k]=clamp(w[k]+1,1,99);if(rnd()<.35)addNews('n.trained2',{w:w.name,k:t('st.'+k)})}})}}catch(e){}return _ew4.apply(this,arguments)};
NEWV.train=function(){const T=G.train||(G.train={});const used=Object.keys(T).filter(id=>W(id)&&W(id).fed===G.fed.id).length,mx=slots();
 let h='<div class="top"><div><h2>'+esc(t('trn.title'))+'</h2><div class="mute" style="max-width:74ch">'+esc(t('trn.sub'))+'</div></div><div class="row"><button class="btn sm" data-act="trauto">'+esc(t('trn.auto'))+'</button><button class="btn sm" data-act="trclear">'+esc(t('trn.clear'))+'</button></div></div>'+
  '<div class="note">'+esc(t('trn.slots',{u:used,m:mx,c:money(trCost())}))+'</div><div class="grid g2">';
 const list=mine().filter(w=>!w.ext).sort((a,b)=>a.age-b.age);const ks=['ring','str','spd','tec','sta','psy','mic','cha'];
 list.forEach(w=>{h+='<div class="card stack">'+wMini(w,t('trn.age',{n:w.age})+' · '+t('style.'+w.style))+'<select class="field" data-chg="trfocus" data-id="'+w.id+'"><option value="">'+esc(t('trn.none'))+'</option>'+ks.map(k=>'<option value="'+k+'"'+(T[w.id]===k?' selected':'')+(used>=mx&&!T[w.id]?' disabled':'')+'>'+esc(t('st.'+k))+' ('+w[k]+')</option>').join('')+'</select></div>'});return h+'</div>'};
Object.assign(CHG,{trfocus(e){const T=G.train||(G.train={});const used=Object.keys(T).length;if(e.value){if(!T[e.dataset.id]&&used>=slots()){render();return}T[e.dataset.id]=e.value}else delete T[e.dataset.id];save();render()}});
Object.assign(ACT,{trclear(){G.train={};save();render()},trauto(){const T=G.train={};const ks=['ring','str','spd','tec','sta','psy','mic','cha'];mine().filter(w=>!w.ext).sort((a,b)=>a.age-b.age).slice(0,slots()).forEach(w=>{T[w.id]=ks.slice().sort((x,y)=>w[x]-w[y])[0]});save();render()}});
/* ---------- plot twists ---------- */
function mkFeud(a,b){const busy=new Set();G.feuds.forEach(x=>x.A.concat(x.B).forEach(q=>busy.add(q)));if(busy.has(a.id)||busy.has(b.id))return false;return !!Object.keys(SC).find(k=>{const f={id:'f'+(G.uid++),sc:k,A:[a.id],B:[b.id],stA:null,stB:null,stR:null,titleId:null,fedId:null,mw:0,g:1,heat:SC[k].h*2,matches:0,used:false};if(!feudMode(f))return false;flog(f,{k:'s'});G.feuds.push(f);addNews('n.feudstart',{a:sideLabel(f.A,null),b:sideLabel(f.B,null)});return true})}
async function twist(){const kinds=[];
 const st=(G.stables||[]).filter(s=>s.members.map(W).filter(w=>w&&w.fed===G.fed.id).length>=2);if(st.length)kinds.push('betray');
 const fa=G.ws.filter(w=>w.fed==='FA'&&w.pop>=40).sort((a,b)=>b.pop-a.pop)[0];if(fa)kinds.push('back');
 const up=mine().filter(w=>!w.ext&&w.pop<35&&w.age<=30&&!w.injury);if(up.length)kinds.push('up');if(!kinds.length)return;const k=pickR(kinds);
 if(k==='betray'){const s=pickR(st),ms=s.members.map(W).filter(w=>w&&w.fed===G.fed.id),x=ms[ms.length-1],y=ms[0];if(x.id===y.id)return;
  const i=await askGeneric(esc(t('tw2.betray.t')),t('tw2.betray.b',{x:x.name,y:y.name,s:s.name}),[{l:esc(lang==='pl'?'Rozegraj zdradę na gali':'Play the betrayal on a show')},{l:esc(lang==='pl'?'Zażegnaj spór':'Defuse the conflict')},{l:esc(lang==='pl'?'Podsyć spisek (ryzykowne)':'Stoke the plot (risky)')}]);
  if(i===0){s.members=s.members.filter(id=>id!==x.id);mkFeud(x,y);x.pop=clamp(x.pop+1,1,100);G.fed.pop=clamp(G.fed.pop+.5,2,100);addNews('n.mom',{t:lang==='pl'?x.name+' porzuca stajnię i staje przeciw '+y.name+'.':x.name+' leaves the stable and turns on '+y.name+'.'})}
  else if(i===1){evMood(x,-3);evMood(y,2);G.fed.pop=clamp(G.fed.pop-.1,2,100)}
  else{if(rnd()<.55){G.fed.pop=clamp(G.fed.pop+.9,2,100);s.members=s.members.filter(id=>id!==x.id);mkFeud(x,y);x.pop=clamp(x.pop+1.2,1,100)}else{G.fed.pop=clamp(G.fed.pop-.4,2,100);evMood(x,-5);evMood(y,-3)}}}
 else if(k==='back'){const i=await askGeneric(esc(t('tw2.back.t')),t('tw2.back.b',{x:fa.name}),[{l:esc(lang==='pl'?'Zaproś na galę (płacisz gażę)':'Invite him to a show (you pay a fee)')},{l:esc(lang==='pl'?'Zignoruj':'Ignore')}]);
  if(i===0){G.fed.cash-=Math.round(800+G.fed.pop*40);G.fed.pop=clamp(G.fed.pop+.6,2,100);fa.pop=clamp(fa.pop+.8,1,100);addNews('n.mom',{t:lang==='pl'?fa.name+' wraca na jedną galę, hala szaleje.':fa.name+' returns for one show, the arena erupts.'})}}
 else{const x=pickR(up);const i=await askGeneric(esc(t('tw2.up.t')),t('tw2.up.b',{x:x.name}),[{l:esc(lang==='pl'?'Zrób z niego gwiazdę':'Make him a star')},{l:esc(lang==='pl'?'Niech jeszcze poczeka':'Make him wait')},{l:esc(lang==='pl'?'Zbuduj mu pierwszego rywala':'Build his first rival')}]);
  if(i===0){x.pop=clamp(x.pop+2,1,100);evMood(x,8);mine().filter(w=>w.id!==x.id).forEach(w=>{if(w.pop>x.pop)evMood(w,-1)})}
  else if(i===1){evMood(x,-3);x.pop=clamp(x.pop+.4,1,100)}
  else{const r=mine().filter(w=>w.id!==x.id&&w.pop>=x.pop&&w.pop<=x.pop+25&&!w.injury)[0];if(r&&mkFeud(x,r)){x.pop=clamp(x.pop+1,1,100)}else x.pop=clamp(x.pop+.6,1,100)}}}
const _we3=weekEvents;weekEvents=async function(){try{if(G.week>6&&rnd()<.12)await twist()}catch(e){}return _we3.apply(this,arguments)};
})();
if(typeof normTexts==="function")normTexts();
