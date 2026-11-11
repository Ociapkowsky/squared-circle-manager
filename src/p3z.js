/* ============ Continental cups + World Cup (pure skill) ============ */
const CUPS=[
 {id:'oc',cont:'oc',wk:8,size:8},{id:'af',cont:'af',wk:13,size:8},{id:'la',cont:'la',wk:18,size:8},
 {id:'na',cont:'na',wk:23,size:8},{id:'as',cont:'as',wk:28,size:8},{id:'eu',cont:'eu',wk:33,size:8},{id:'world',cont:null,wk:44,size:16}];
const cupName=c=>t('cup.'+c.id);
function cupsEnsure(){if(!G.cups)G.cups={hist:[],last:null,win:{}};return G.cups}
function cupPower(w){return(w.ring*.5+((w.str+w.spd+w.tec+w.sta+w.psy)/5)*.4+w.cha*.1)*(1-Math.max(0,(w.fatigue||0)-50)/250)}
function cupFed(w){if(w.fed===G.fed.id)return G.fed.short;const r=G.rivals.find(x=>x.id===w.fed);return r?(r.short||r.name):'FA'}
function cupNext(){const wk=woy();let best=null;CUPS.forEach(c=>{const d=(c.wk-wk+52)%52;if(!best||d<best.d)best={c,d}});return best}
function cupCands(c){return mine().filter(w=>!w.injury&&!w.farewell&&(c.id==='world'||contOf(w.country)===c.cont)).sort((a,b)=>cupPower(b)-cupPower(a))}
function cupAiField(c,n,skip){
 const cs=cupsEnsure(),yr=yearOf(G.week),pre=[];
 if(c.id==='world')CUPS.forEach(x=>{const id=cs.win[yr+':'+x.id];const w=id&&W(id);if(w&&w.fed!==G.fed.id&&!w.injury&&w.fed!=='RET')pre.push(w)});
 const pool=G.ws.filter(w=>!w.ext&&w.fed!==G.fed.id&&w.fed!=='RET'&&w.fed!=='PRO'&&!w.injury&&(c.id==='world'||contOf(w.country)===c.cont)&&pre.indexOf(w)<0).sort((a,b)=>cupPower(b)-cupPower(a));
 const cnt={},out=pre.slice();out.forEach(w=>cnt[w.fed]=(cnt[w.fed]||0)+1);
 for(const w of pool){if(out.length>=n)break;if((cnt[w.fed]||0)>=2&&w.fed!=='FA')continue;out.push(w);cnt[w.fed]=(cnt[w.fed]||0)+1}
 return out.slice(0,n)}
const CUPR={8:['qf','sf','f'],16:['r16','qf','sf','f']};
async function cupRun(c){
 const cs=cupsEnsure(),yr=yearOf(G.week),nm=cupName(c);
 const cand=cupCands(c).slice(0,6);let own=null;
 addNews('n.cupstart',{c:nm});
 if(cand.length){
  const opts=cand.map(w=>({l:esc(w.name)+' — '+t('cup.pow',{p:Math.round(cupPower(w))}),dis:false})).concat([{l:t('cup.skip')}]);
  const i=await askGeneric(t('cup.inv.t',{c:nm}),t('cup.inv.b',{c:nm,n:c.size,k:c.id==='world'?t('cup.kw'):t('cup.kc',{k:t('ct.'+c.cont)})}),opts);
  if(i<cand.length)own=cand[i]}
 let boost=0;const log=[];
 if(own){
  {const cost=r10(wkRev()*.25);
   const i=await askGeneric(t('cup.e1.t'),t('cup.e1.b',{w:own.name,m:money(cost)}),[{l:t('cup.e1.1',{m:money(cost)}),dis:G.fed.cash<cost},{l:t('cup.e1.2')}]);
   if(i===0){G.fed.cash-=cost;boost+=4;own.fatigue=Math.max(0,own.fatigue-10)}}
  if(rnd()<.45){const m=r10(wkRev()*.3);const i=await askGeneric(t('cup.e2.t'),t('cup.e2.b',{w:own.name,m:money(m)}),[{l:t('cup.e2.1',{m:money(m)})},{l:t('cup.e2.2')}]);
   if(i===0){G.fed.cash+=m;evMood(own,-2)}else evMood(own,3)}}
 let field=cupAiField(c,c.size-(own?1:0));if(own)field.push(own);
 if(field.length<4){return}
 let sz=1;while(sz*2<=field.length)sz*=2;if(sz>c.size)sz=c.size;
 field=field.sort((a,b)=>cupPower(b)-cupPower(a)+(rnd()-.5)*6).slice(0,sz);
 // seeded bracket 1vN, 2v(N-1)...
 let cur=[];for(let i=0;i<sz/2;i++)cur.push([field[i],field[sz-1-i]]);
 const rn=CUPR[sz]||(sz===4?['sf','f']:['qf','sf','f']);const rounds=[];let ownRound=0,ownDone=!own,champ=null;
 for(let r=0;r<rn.length;r++){
  const res=[],next=[];
  for(const[a,b]of cur){
   let w=null;const hasOwn=own&&(a===own||b===own);
   if(hasOwn){
    if(rn[r]==='sf'&&rnd()<.3){
     const i=await askGeneric(t('cup.e4.t'),t('cup.e4.b',{w:own.name}),[{l:t('cup.e4.1')},{l:t('cup.e4.2')}]);
     if(i===0){boost-=6;if(rnd()<.35)injure(own,2+Math.floor(rnd()*4))}else{w=a===own?b:a}}
    else if(rn[r]===rn[Math.min(1,rn.length-2)]&&r<rn.length-1&&rnd()<.3){
     const m=r10(wkRev()*.5),o=a===own?b:a;
     const i=await askGeneric(t('cup.e3.t'),t('cup.e3.b',{w:own.name,o:o.name,m:money(m)}),[{l:t('cup.e3.1',{m:money(m)})},{l:t('cup.e3.2')}]);
     if(i===0){G.fed.cash+=m;w=o;evMood(own,-8);if(rnd()<.3){G.fed.pop=clamp(G.fed.pop-1.5,2,100);addNews('n.cupbribe',{w:own.name})}}else{evMood(own,6);boost+=1}}}
   if(!w){const pa=cupPower(a)+(a===own?boost:0),pb=cupPower(b)+(b===own?boost:0);w=rnd()<1/(1+Math.exp(-(pa-pb)/7))?a:b}
   if(hasOwn){const l=w===own?(a===own?b:a):own;if(w===own){ownRound++;log.push(t('cup.r.'+rn[r])+': '+t('cup.won',{o:l.name}))}else{log.push(t('cup.r.'+rn[r])+': '+t('cup.lost',{o:w.name}));ownDone=true}
    own.fatigue=clamp((own.fatigue||0)+12,0,100);if(!own.injury&&rnd()<.04)injure(own,1+Math.floor(rnd()*3))}
   res.push({a:a.name,b:b.name,w:w.name,fa:cupFed(a),fb:cupFed(b)});next.push(w)}
  rounds.push({r:rn[r],m:res});cur=[];for(let i=0;i<next.length;i+=2)if(next[i+1])cur.push([next[i],next[i+1]]);
  if(next.length===1)champ=next[0]}
 const R=rn.length,ownChamp=own&&champ===own;
 cs.win[yr+':'+c.id]=champ.id;
 // rewards
 const wcup=c.id==='world',k=ownRound;
 if(own){own.pop=clamp(own.pop+k*(wcup?1.1:.8)+(ownChamp?(wcup?7:4):0),1,100);evMood(own,k*3+(ownChamp?10:0));
  G.fed.pop=clamp(G.fed.pop+(ownChamp?(wcup?2.5:1.2):k*.15),2,100);
  const prize=ownChamp?r10(wkRev()*(wcup?5:2.5)):k===R-1?r10(wkRev()*(wcup?1.5:.8)):0;if(prize)G.fed.cash+=prize;
  if(ownChamp){own.cups=(own.cups||[]).concat([{id:c.id,yr}])}
  log.unshift(own.name+':');
  await askGeneric(t(ownChamp?'cup.res.win':'cup.res.t',{c:nm}),(ownChamp?t('cup.res.wb',{w:own.name,c:nm})+' ':'')+log.join(' · ')+(prize?' · '+t('cup.prize',{m:money(prize)}):''),[{l:t('ev.w.ok')}])}

 if(!ownChamp){champ.pop=clamp(champ.pop+(wcup?2.5:1.5),1,100);champ.cups=(champ.cups||[]).concat([{id:c.id,yr}])}
 cs.hist.push({yr,id:c.id,champ:champ.name,fed:cupFed(champ),own:!!own,ownName:own?own.name:'',k,ownChamp:!!ownChamp});
 cs.hist=cs.hist.slice(-40);cs.last={id:c.id,yr,wk:G.week,rounds,own:own?own.name:null,champ:champ.name};
 addNews('n.cupwin',{c:nm,w:champ.name});
 twAdd('cup',{w:champ.name,c:nm},ownChamp?'me':'wire',ownChamp?.8:.2);
 save()}
async function cupWeekly(){const c=CUPS.find(x=>x.wk===woy());if(!c)return;try{await cupRun(c)}catch(e){console.error&&console.error('cup',e)}}
function cupHtml(w){const l=(w.cups||[]).slice(-4);return careerHtml(w)+(l.length?'<div style="font-size:13px;color:var(--gold)">🏆 '+l.map(x=>esc(t('cup.'+x.id))+' '+x.yr).join(', ')+'</div>':'')}
function vCup(){
 const cs=cupsEnsure(),nx=cupNext(),wk=woy();
 let h='<div class="top"><div><h2>'+t('nav.cup')+'</h2><div class="mute" style="max-width:72ch">'+t('cup.sub')+'</div></div></div>';
 h+='<div class="card stack"><h3>'+t('cup.sched')+'</h3><div class="scroll"><table><tbody>'+CUPS.map(c=>{const d=(c.wk-wk+52)%52;const n=cupCands(c).length;return '<tr'+(nx&&nx.c===c?' style="background:var(--panel2)"':'')+'><td><b>'+esc(cupName(c))+'</b></td><td class="mute">'+t('cup.wk',{n:c.wk})+'</td><td>'+(d===0?t('cup.now'):t('cup.in',{n:d}))+'</td><td class="mute">'+t('cup.elig',{n:n})+'</td></tr>'}).join('')+'</tbody></table></div></div>';
 const L=cs.last;
 if(L){h+='<div class="card stack"><h3>'+esc(cupName({id:L.id}))+' · '+t('cup.yr',{y:L.yr})+'</h3><div class="mute">'+t('cup.champ',{w:L.champ})+'</div>'+L.rounds.map(r=>'<div><div class="px">'+t('cup.r.'+r.r)+'</div>'+r.m.map(m=>'<div class="row" style="gap:6px;font-size:13px"><span'+(m.w===m.a?' style="color:var(--gold)"':'')+'>'+esc(m.a)+' <span class="mute">('+esc(m.fa)+')</span></span><span class="mute">vs</span><span'+(m.w===m.b?' style="color:var(--gold)"':'')+'>'+esc(m.b)+' <span class="mute">('+esc(m.fb)+')</span></span></div>').join('')+'</div>').join('')+'</div>'}
 h+='<div class="card stack"><h3>'+t('cup.hall')+'</h3>'+(cs.hist.length?cs.hist.slice().reverse().map(x=>'<div class="row spread" style="gap:8px"><span>'+esc(cupName({id:x.id}))+' '+x.yr+'</span><span><b'+(x.ownChamp?' style="color:var(--gold)"':'')+'>'+esc(x.champ)+'</b> <span class="mute">('+esc(x.fed)+')</span>'+(x.own&&!x.ownChamp?' <span class="mute">· '+esc(x.ownName)+' +'+x.k+'</span>':'')+'</span></div>').join(''):'<div class="mute">'+t('cup.none')+'</div>')+'</div>';
 return h}
Object.assign(D,{
 'nav.cup':['Turnieje','Tournaments'],
 'cup.oc':['Puchar Oceanii','Oceania Cup'],'cup.af':['Puchar Afryki','Africa Cup'],'cup.la':['Puchar Ameryki Łacińskiej','Latin America Cup'],'cup.na':['Puchar Ameryki Północnej','North America Cup'],'cup.as':['Puchar Azji','Asia Cup'],'cup.eu':['Puchar Europy','Europe Cup'],'cup.world':['Puchar Świata Ring Boss','Ring Boss World Cup'],
 'cup.sub':['Turnieje kontynentalne (8 zawodników) i Puchar Świata (16). Wybierasz reprezentanta, a o wyniku decydują wyłącznie umiejętności i zmęczenie, bez bookingu.','Continental cups (8 wrestlers) and the World Cup (16). You pick a representative; results depend purely on skill and fatigue, no booking.'],
 'cup.yr':['rok {y}','year {y}'],'cup.sched':['Kalendarz','Calendar'],'cup.wk':['tydzień {n}','week {n}'],'cup.now':['TERAZ','NOW'],'cup.in':['za {n} tyg.','in {n} wk'],'cup.elig':['Twoi zawodnicy: {n}','Your wrestlers: {n}'],
 'cup.hall':['Historia zwycięzców','Winners history'],'cup.none':['Brak rozegranych turniejów.','No tournaments played yet.'],'cup.champ':['Zwycięzca: {w}','Winner: {w}'],
 'cup.pow':['siła {p}','power {p}'],'cup.skip':['Nie wysyłam nikogo','Send nobody'],'cup.kc':['Mogą wystąpić zawodnicy z kontynentu: {k}.','Open to wrestlers from: {k}.'],'cup.kw':['Otwarty dla zawodników z całego świata.','Open to wrestlers worldwide.'],
 'cup.inv.t':['Turniej: {c}','Tournament: {c}'],'cup.inv.b':['Startuje {c} ({n} uczestników). {k} Wybierz reprezentanta federacji. O wyniku zdecydują umiejętności i zmęczenie.','{c} is starting ({n} entrants). {k} Pick your representative. Skill and fatigue decide the result.'],
 'cup.r.r16':['1/8 finału','Round of 16'],'cup.r.qf':['Ćwierćfinał','Quarterfinal'],'cup.r.sf':['Półfinał','Semifinal'],'cup.r.f':['Finał','Final'],
 'cup.won':['wygrana z {o}','beat {o}'],'cup.lost':['porażka z {o}','lost to {o}'],'cup.prize':['nagroda {m}','prize {m}'],
 'cup.res.t':['Koniec turnieju: {c}','Tournament over: {c}'],'cup.res.win':['Zwycięstwo w turnieju: {c}!','Tournament won: {c}!'],'cup.res.wb':['{w} wygrywa {c}!','{w} wins {c}!'],
 'cup.e1.t':['Przygotowania','Preparation'],'cup.e1.b':['Trener proponuje intensywne przygotowania {w} do turnieju. Koszt {m}.','The coach suggests intensive preparation for {w}. Cost {m}.'],'cup.e1.1':['Zainwestuj ({m}, +siła)','Invest ({m}, +power)'],'cup.e1.2':['Bez dodatkowych przygotowań','No extra preparation'],
 'cup.e2.t':['Oferta sponsora','Sponsor offer'],'cup.e2.b':['Sponsor oferuje {m} za noszenie logo przez {w} podczas turnieju.','A sponsor offers {m} for {w} to wear their logo at the tournament.'],'cup.e2.1':['Przyjmij (+{m})','Accept (+{m})'],'cup.e2.2':['Odmów','Decline'],
 'cup.e3.t':['Podejrzana oferta','Shady offer'],'cup.e3.b':['Ktoś z otoczenia {o} oferuje {m}, jeśli {w} odda im walkę.','Someone from {o}\'s camp offers {m} if {w} throws the match.'],'cup.e3.1':['Przyjmij ({m}, przegrana walka)','Accept ({m}, lose the match)'],'cup.e3.2':['Odmów i walcz uczciwie','Refuse and fight clean'],
 'cup.e4.t':['Uraz w półfinale','Semifinal knock'],'cup.e4.b':['{w} skręca kostkę tuż przed półfinałem.','{w} twists an ankle just before the semifinal.'],'cup.e4.1':['Walcz mimo bólu (słabszy, ryzyko kontuzji)','Fight through (weaker, injury risk)'],'cup.e4.2':['Wycofaj się (walkower)','Withdraw (walkover)'],
 'n.cupstart':['Rusza turniej: {c}.','{c} is starting.'],'n.cupwin':['{w} wygrywa turniej: {c}.','{w} wins {c}.'],'n.cupbribe':['Plotki o ustawionej walce z udziałem {w}.','Rumours of a fixed match involving {w}.'],
 'tw.cup':['{w} wygrywa {c}! Co za turniej!','{w} wins {c}! What a tournament!']
});
TWGEN.cup='gw';
