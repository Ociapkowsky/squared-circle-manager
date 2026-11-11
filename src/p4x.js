/* ===== Press conferences after big shows (tier 4+): questions, tones, push promises, press events ===== */
const PC_MINTIER=4;
const PC_JOUR=[['Marek Zawadzki','Ring Daily'],['Ola Brzezińska','Turnbuckle Post'],['Tom Hartley','Pro Wrestling Wire'],['Ines Duarte','Canvas Report'],['Kuba Lis','Sportowy Ring'],['Dana Whitmore','The Squared Press'],['Piotr Walczak','Gong FM'],['Sam Okafor','Apron Weekly']];
function pcEns(){if(!G.pcs)G.pcs={n:0,skip:0,kept:0,broke:0};if(!G.pcp)G.pcp=[];return G.pcs}
function pcChamp(id){return G.titles.some(tt=>tt.holders.indexOf(id)>=0)}
function pcWr(id){const w=W(id);return w&&w.fed===G.fed.id&&!w.ext&&!w.farewell?w:null}
function pcBuild(){
 const s=G.summary;if(!s||!s.out)return [];const ms=s.out.filter(x=>!x.promo);if(!ms.length)return [];
 const pool=[];const jr=()=>pickR(PC_JOUR);
 const add=(kind,v,ctx,subj,w)=>pool.push({kind,v:v||{},ctx:ctx||'n',subj:subj||'',w:w||1,j:jr()});
 const sorted=ms.slice().sort((a,b)=>b.stars-a.stars),best=sorted[0],worst=sorted[sorted.length-1],main=ms[ms.length-1];
 if(best&&best.stars>=3.5)add('best',{a:best.a,b:best.b?' vs '+best.b:'',s:f2(best.stars)},'g','',3);
 if(worst&&worst!==best&&worst.stars<3)add('worst',{a:worst.a,b:worst.b?' vs '+worst.b:'',s:f2(worst.stars)},'b','',3);
 if(main&&main.stars<3.5&&main!==worst)add('main',{a:main.a,b:main.b?' vs '+main.b:'',s:f2(main.stars)},'b','',2);
 const tcs=ms.find(x=>x.tc);if(tcs)add('champ',{w:tcs.winner,t:tcs.title||''},'g',(tcs.wid&&tcs.wid[0])||'',3);
 const st=ms.find(x=>x.stip&&x.stip!=='none');if(st)add('stip',{a:st.a,b:st.b?' vs '+st.b:'',st:t('stip.'+st.stip)},'n','',2);
 const fe=ms.find(x=>x.blow);if(fe)add('feud',{a:fe.a,b:fe.b?' vs '+fe.b:''},'n','',2);
 // push: a popular or young non-champion
 const lv=hlLive().filter(w=>!pcChamp(w.id)&&!w.injury);
 const pc=lv.filter(w=>w.pop>=35&&!G.pcp.some(p=>p.id===w.id)).sort((a,b)=>(b.pop+(30-a.age>0?8:0)+(b.morale<60?6:0))-(a.pop+(30-b.age>0?8:0)+(a.morale<60?6:0)));
 if(pc.length)add('push',{w:pc[0].name},'n',pc[0].id,4);
 if(pc.length>2&&rnd()<.5)add('push2',{w:pc[2].name,w2:pc[1].name},'n',pc[2].id,2);
 const ct=hlLive().filter(w=>w.pop>=30&&w.contract>0&&w.contract<=26).sort((a,b)=>b.pop-a.pop)[0];
 if(ct)add('rumor',{w:ct.name},'n',ct.id,3);
 const inj=hlLive().filter(w=>w.injury>0&&w.pop>=30).sort((a,b)=>b.pop-a.pop)[0];
 if(inj)add('injury',{w:inj.name,n:inj.injury},'n',inj.id,2);
 const rv=(G.rivals||[]).filter(r=>r.pop>=G.fed.pop*.7).sort((a,b)=>b.pop-a.pop)[0];
 if(rv&&rnd()<.5)add('rival',{r:rv.name||rv.short||'?'},'n','',2);
 if(G.fed.cash<wkRev()*5)add('money',{},'b','',3);else add('tix',{},'n','',1);
 const grumpy=hlLive().filter(w=>w.morale<45&&w.pop>=25)[0];
 if(grumpy)add('locker',{w:grumpy.name},'b',grumpy.id,2);

 // --- extra questions ---
 const sd=s.sold||0,cp=s.cap||0;
 const wf=hlLive().filter(w=>w.g==='f'&&w.pop>=25).sort((a,b)=>b.pop-a.pop)[0];
 if(wf&&G.titles.some(tt=>tt.g==='f'))add('women',{w:wf.name},'n',wf.id,2);
 const vet=hlLive().filter(w=>w.age>=38&&w.pop>=25).sort((a,b)=>b.age-a.age)[0];
 if(vet)add('vet',{w:vet.name,n:vet.age},'n',vet.id,2);
 const rk=hlLive().filter(w=>w.age<=23&&w.pop>=20).sort((a,b)=>b.pop-a.pop)[0];
 if(rk)add('rookie',{w:rk.name},'n',rk.id,2);
 const lr=G.titles.filter(tt=>tt.holders.length&&G.week-(tt.since||1)>=40).sort((a,b)=>(a.since||1)-(b.since||1))[0];
 if(lr){const h=pcWr(lr.holders[0]);if(h)add('longreign',{w:h.name,n:G.week-(lr.since||1),t:titleName(lr)},'n',h.id,3)}
 if(G.streak>=3)add('streak',{n:G.streak},'g','',3);
 if(cp&&sd>=cp*.97)add('sellout',{},'g','',3);else if(cp&&sd<cp*.75)add('empty',{p:Math.round(sd/cp*100)},'b','',3);
 const dr=ms.find(x=>x.finish&&x.finish!=='clean'&&x.finish!=='draw');if(dr)add('dirty',{a:dr.a,b:dr.b?' vs '+dr.b:''},'n','',2);
 const dw=ms.find(x=>x.finish==='draw');if(dw)add('drawm',{a:dw.a,b:dw.b?' vs '+dw.b:''},'n','',2);
 if(boardEnsure().conf<50)add('trustlow',{},'b','',3);
 if(typeof brOn==='function'&&brOn())add('brand',{},'n','',2);
 const stb=(G.stables||[]).filter(x=>x.members&&x.members.filter(pcWr).length>=2).sort(()=>rnd()-.5)[0];
 if(stb)add('stable',{s:stb.name},'n','',2);
 add('future',{},'n','',1);add('merch',{},'n','',1);add('fans',{},'n','',1);add('tier',{},'n','',1);add('predict',{},'n','',1);add('prestige',{},'n','',1);

 // --- batch 3 ---
 const tgh=G.titles.find(tt=>tt.teams>=2&&tt.holders.length);if(tgh){const h=pcWr(tgh.holders[0]);if(h)add('tagdiv',{},'n',h.id,2)}
 if(rv)add('transfer',{r:rv.name||rv.short||'?'},'n','',2);
 if((s.ppv||0)>0)add('ppvprice',{},'n','',2);
 if((s.profit||0)<0)add('loss',{},'b','',3);else if((s.profit||0)>0)add('profit',{},'g','',2);
 if(s.rating>=4.5)add('great',{s:f2(s.rating)},'g','',3);else if(s.rating<3.3)add('meh',{s:f2(s.rating)},'b','',3);
 const pr=s.out.filter(x=>x.promo);if(pr.length)add('promo',{},'n','',2);
 const inn=hlLive().filter(w=>w.injury>0).length;if(inn>=3)add('injrisk',{n:inn},'b','',3);
 add('salary',{},'n','',1);
 if((G.feuds||[]).length>=2)add('storyline',{},'n','',2);
 const am=hlLive().length?avg(hlLive().map(w=>w.morale||60)):60;
 if(am>=75)add('moodgood',{},'g','',2);else if(am<50)add('moodbad',{},'b','',3);
 if(ms.filter(x=>x.tc).length>=2)add('titlechg',{n:ms.filter(x=>x.tc).length},'n','',3);
 if(best&&best.stars>=4)add('rematch',{a:best.a,b:best.b?' vs '+best.b:''},'g','',2);
 add('tvdeal',{},'n','',1);add('gm',{},'n','',1);add('crowd',{},'n','',1);add('hof',{},'n','',1);
 // choose 3-5 distinct, weighted
 const n=3+(G.fed.tier>=5?1:0)+(rnd()<.35?1:0),out=[];
 while(out.length<n&&pool.length){let tot=pool.reduce((a,q)=>a+q.w,0),r=rnd()*tot,i=0;for(;i<pool.length;i++){r-=pool[i].w;if(r<=0)break}i=Math.min(i,pool.length-1);out.push(pool.splice(i,1)[0])}
 return out}
// tone table: [fedPop, board conf, subject mood, backfire chance]. Set by eye.
const PC_TONE={bold:[1.1,.5,3,.35],honest:[.4,1.5,-1,.08],dipl:[.2,.6,1,.02]};
const PC_BAD={b:{bold:.5,honest:.1,dipl:0},g:{bold:-.05,honest:0,dipl:0},n:{bold:.15,honest:.05,dipl:0}};
function pcFx(q,tone){
 const T=PC_TONE[tone];let bf=T[3]+(PC_BAD[q.ctx]?PC_BAD[q.ctx][tone]:0)+(typeof mrBadAdj==='function'?mrBadAdj(q,tone):0);bf=Math.max(0,Math.min(.9,bf));
 const bad=rnd()<bf;let pop=T[0],conf=T[1],mood=T[2],pr=null;
 if(bad){pop=-T[0]*1.6-.4;conf=-1.5;mood=-Math.abs(mood)-2}
 if(q.kind==='push'||q.kind==='push2'){
  if(tone==='bold'){pr=q.subj;pop=bad?-.6:.7;mood=bad?-2:7;conf=bad?-1:.3}
  else if(tone==='honest'){mood=-4;conf=1.2;pop=.2}
  else{mood=1;conf=.4;pop=.1}}
 if(q.kind==='rumor'){if(tone==='bold'){mood=bad?-6:4;pop=bad?-.8:.8}else if(tone==='honest'){mood=2;conf=.8}else{mood=0}}
 if(q.kind==='injury'){if(tone==='honest'){mood=3;conf=1}else if(tone==='bold'){mood=bad?-3:1}}
 if(q.kind==='money'){conf=tone==='honest'?(bad?-2:2):tone==='bold'?(bad?-4:1.5):.5;pop=tone==='bold'&&bad?-1.2:.2}
 if(q.kind==='tix'){pop=tone==='bold'?(bad?-.5:.9):.3;conf=.2}
 if(q.kind==='locker'){mood=tone==='honest'?5:tone==='dipl'?2:(bad?-6:3)}
 if(q.kind==='champ'){mood=bad?-1:tone==='bold'?4:2}
 if(q.kind==='streak'||q.kind==='sellout'||q.kind==='great'||q.kind==='profit'){pop=tone==='bold'?(bad?-.3:1.2):tone==='honest'?.6:.4}
 if(q.kind==='loss'||q.kind==='moodbad'||q.kind==='injrisk'||q.kind==='meh'){conf=tone==='honest'?(bad?-1.5:1.8):tone==='bold'?(bad?-3:1.2):.5;pop=tone==='bold'&&bad?-1:.1}
 if(q.kind==='trustlow'){conf=tone==='honest'?(bad?-2.5:2.5):tone==='bold'?(bad?-4:2):.8}
 if(q.kind==='empty'){pop=tone==='honest'?.5:tone==='bold'?(bad?-1.4:.6):.1}
 if(q.kind==='vet'||q.kind==='rookie'||q.kind==='women'||q.kind==='longreign'){mood=tone==='bold'?(bad?-4:5):tone==='honest'?(q.kind==='vet'?-3:2):1.5}
 return{pop,conf,mood,pr,bad}}
function pcApply(q,tone,f){
 xpop(f.pop);xconf(f.conf);
 const w=q.subj?pcWr(q.subj):null;if(w&&f.mood)evMood(w,f.mood);
 if(f.pr&&w){pcEns();G.pcp.push({id:w.id,name:w.name,dl:G.week+8});}
 pcEns().n++}
function pcChips(f,q){
 let h='';const c=(txt,cls)=>{h+='<span class="pcc '+cls+'">'+esc(txt)+'</span>'};
 const sg=n=>(n>0?'+':'')+(Math.round(n*10)/10).toString().replace('.',',');
 if(Math.abs(f.pop)>=.1)c(t('pc.c.pop')+' '+sg(f.pop),f.pop>0?'up':'dn');
 if(Math.abs(f.conf)>=.1)c(t('pc.c.conf')+' '+sg(f.conf),f.conf>0?'up':'dn');
 const w=q.subj?pcWr(q.subj):null;if(w&&f.mood)c(w.name+' · '+t('pc.c.mood')+' '+sg(f.mood),f.mood>0?'up':'dn');
 if(f.pr&&w)c(t('pc.c.prom',{w:w.name}),'pr');
 return h}
function pcAsk(html){return new Promise(res=>{openModal('<div class="pcm">'+html+'</div>');window.__pcRes=res})}
async function pcRun(){
 const pc=G.pc;G.pc=null;if(!pc||!pc.q||!pc.q.length)return;pcEns();
 const go=await pcAsk('<h2>'+esc(t('pc.t'))+'</h2><p class="mute">'+esc(t('pc.intro',{n:pc.q.length}))+'</p><button class="opt" data-act="pcopt" data-i="0"><b>'+esc(t('pc.go'))+'</b><small>'+esc(t('pc.god'))+'</small></button><button class="opt" data-act="pcopt" data-i="1"><b>'+esc(t('pc.skip'))+'</b><small>'+esc(t('pc.skipd'))+'</small></button>');
 if(go===1){xpop(-1);G.pcs.skip++;addNews('pc.n.skip');return}
 let totP=0,totC=0;
 for(let k=0;k<pc.q.length;k++){
  const q=pc.q[k];if(q.subj&&!pcWr(q.subj))q.subj='';
  const tones=['bold','honest','dipl'];
  let h='<div class="pcj"><span class="pcjn">'+esc(q.j[0])+'</span><span class="pcjo">'+esc(q.j[1])+'</span>'+(typeof mrTag==='function'?mrTag(q.j[0]):'')+'<span class="pcjk">'+(k+1)+'/'+pc.q.length+'</span></div><p class="pcq">“'+esc(t('pc.q.'+q.kind,q.v))+'”</p>';
  tones.forEach((tn,i)=>{h+='<button class="opt pco" data-act="pcopt" data-i="'+i+'"><b>'+esc(t('pc.o.'+q.kind+'.'+tn,q.v))+'</b><small>'+esc(t('pc.tone.'+tn))+'</small></button>'});
  const i=await pcAsk(h),tn=tones[i]||'dipl',f=pcFx(q,tn);pcApply(q,tn,f);totP+=f.pop;totC+=f.conf;
  await pcAsk('<p class="pcq">“'+esc(t('pc.q.'+q.kind,q.v))+'”</p><p class="pcr">'+esc(t('pc.r.'+(f.bad?'bad':'ok')+'.'+tn,Object.assign({},q.v,{j:q.j[0]})))+'</p><div class="pcch">'+pcChips(f,q)+'</div><button class="btn gold" data-act="pcopt" data-i="0">'+esc(t(k<pc.q.length-1?'pc.next':'pc.end'))+'</button>');
 }
 G.pcs.n+=0;addNews('pc.n.done',{p:(totP>=0?'+':'')+(Math.round(totP*10)/10)});closeModal()}
// promises: fulfil on title/main-event appearance, expire after the deadline
const _pcFs=finishShow;finishShow=function(out){
 const r=_pcFs.apply(this,arguments);
 try{pcEns();const ms=(G.summary&&G.summary.out||[]).filter(x=>!x.promo);
  G.pcp=G.pcp.filter(p=>{const w=pcWr(p.id);if(!w)return false;
   const hit=ms.some((x,i)=>(x.title||i===ms.length-1&&ms.length>1)&&(x.wid||[]).indexOf(p.id)>=0);
   if(hit){evMood(w,6);xconf(1);G.pcs.kept++;addNews('pc.n.kept',{w:w.name});try{mrNote('kept',w)}catch(e){}return false}return true});
  if(G.fed.tier>=PC_MINTIER&&G.summary&&G.summary.big&&G.summary&&G.summary.out){const q=pcBuild();G.pc=q.length?{q}:null}else G.pc=null}catch(e){G.pc=null}
 return r};
const _pcEw=endWeek;endWeek=function(){
 const r=_pcEw.apply(this,arguments);
 try{pcEns();G.pcp=G.pcp.filter(p=>{const w=pcWr(p.id);if(!w)return false;if(G.week>p.dl){evMood(w,-10);xconf(-2);G.pcs.broke++;addNews('pc.n.broke',{w:w.name});try{mrNote('broke',w)}catch(e){}return false}return true})}catch(e){}
 return r};
// press random events (tier 4+)
const PCG=f=>()=>{try{return G.week>=20&&G.fed.tier>=PC_MINTIER&&f()}catch(e){return false}};
const NX=(k,t,b,o,n,fx,v,gate,cost)=>XE({k,t,b,o,n,fx,v:v||(()=>({})),gate,cost});
const PCH=f=>()=>{const l=hlLive().filter(f);return l.length?pickR(l):null};
const pcv=f=>()=>{const w=PCH(f)();return{w:w?w.name:'?',id:w?w.id:''}};
NX('pcleak',['Przeciek do prasy','A leak to the press'],['Dziennikarz zdobył plany Twojej głównej fabuły i zamierza je opublikować.','A reporter got hold of your main storyline and is about to publish it.'],
 [['Potwierdź i zrób z tego hype','Confirm it and play up the hype'],['Wszystkiemu zaprzecz','Deny everything']],[['Fani nie mogą się doczekać, choć niespodzianka przepadła.','Fans can’t wait, though the surprise is gone.'],['Plotka cichnie, ale szatnia podejrzewa przeciek.','The rumor fades, but the locker room suspects a leak.']],
 [()=>{xpop(.8);xconf(-.5)},()=>{xmood(-1.5)}],null,PCG(()=>rnd()<.35));
NX('pcpodcast',['Wywiad w podcaście','A podcast interview'],['{w} w głośnym podcaście krytykuje decyzje bookerskie. Klip krąży po sieci.','{w} slammed the booking in a popular podcast. The clip is spreading.'],
 [['Porozmawiaj i uspokój sprawę','Talk it out'],['Nałóż karę finansową','Fine the wrestler']],[['{w} ostudził emocje, a media dostały swoją historię.','{w} cooled down and the media got its story.'],['Kara boli i szatnia to widzi.','The fine stings and the locker room sees it.']],
 [()=>{xconf(.8)},v=>{const w=W(v.id);if(w)evMood(w,-8);xmood(-1);xcash(xc(.03))}],pcv(w=>w.pop>=30&&w.morale<70),PCG(()=>rnd()<.3));
NX('pcprofile',['Reportaż w magazynie','A magazine feature'],['Poczytny magazyn proponuje duży reportaż o Twojej federacji. Wymaga to czasu, wizyt za kulisami i opłaty.','A popular magazine offers a big feature on your promotion. It needs time, backstage access and a fee.'],
 [['Zgódź się ({mm})','Accept ({mm})'],['Odmów','Decline']],[['Reportaż robi wrażenie, rośnie zainteresowanie.','The feature impresses and interest grows.'],['Okazja przechodzi bokiem.','The chance passes by.']],
 [()=>{xcash(-xc(.12));xpop(1.8)},()=>{}],()=>({mm:money(xc(.12))}),PCG(()=>rnd()<.3),[1,0]);
NX('pcrumor',['Plotka w tabloidzie','A tabloid rumor'],['Tabloid pisze, że {w} szykuje odejście do rywala. Nic takiego się nie dzieje.','A tabloid claims {w} is about to jump to a rival. Nothing of the sort is happening.'],
 [['Publiczne oświadczenie','Public statement'],['Zignoruj','Ignore it']],[['{w} czuje wsparcie federacji.','{w} feels backed by the company.'],['Plotka żyje własnym życiem i drażni zawodnika.','The rumor lives on and irritates the wrestler.']],
 [v=>{const w=W(v.id);if(w)evMood(w,4);xpop(.2)},v=>{const w=W(v.id);if(w)evMood(w,-4)}],pcv(w=>w.pop>=35),PCG(()=>rnd()<.3));
Object.assign(D,{
 'pc.t':['Konferencja prasowa','Press conference'],'pc.intro':['Po gali czeka sala pełna dziennikarzy. Liczba pytań od mediów: {n}.','A room full of reporters waits after the show. You face {n} questions.'],
 'pc.go':['Wejdź na konferencję','Take the stage'],'pc.god':['Odpowiadasz na pytania mediów','Answer the media’s questions'],'pc.skip':['Pomiń konferencję','Skip it'],'pc.skipd':['Popularność −1: media czują się zlekceważone','Popularity −1: the media feel snubbed'],
 'pc.next':['Następne pytanie','Next question'],'pc.end':['Zakończ konferencję','End the conference'],
 'pc.tone.bold':['Pewnie · większa stawka, większe ryzyko','Bold · higher stakes, higher risk'],'pc.tone.honest':['Szczerze · uczciwie, ale bywa niewygodnie','Honest · straight, but can be awkward'],'pc.tone.dipl':['Dyplomatycznie · bezpiecznie, małe efekty','Diplomatic · safe, small effects'],
 'pc.c.pop':['Popularność','Popularity'],'pc.c.conf':['Zaufanie zarządu','Board trust'],'pc.c.mood':['Morale','Morale'],'pc.c.prom':['Obietnica pusha: {w} (8 tygodni)','Push promise: {w} (8 weeks)'],
 'pc.q.best':['{a}{b} dostali {s}★. Czy to najlepsza walka, jaką ostatnio pokazaliście?','{a}{b} earned {s}★. Is that the best match you have shown lately?'],
 'pc.q.worst':['Fani narzekają na walkę {a}{b} ({s}★). Co poszło nie tak?','Fans are complaining about {a}{b} ({s}★). What went wrong?'],
 'pc.q.main':['Walka wieczoru, {a}{b}, nie zachwyciła ({s}★). Czy główny wątek się wypala?','The main event, {a}{b}, did not wow ({s}★). Is the main storyline running out of steam?'],
 'pc.q.champ':['Nowym mistrzem ({t}) został {w}. Czy to początek nowej ery?','{w} is the new champion ({t}). Is this the start of a new era?'],
 'pc.q.stip':['Stypulacja „{st}” w walce {a}{b} podzieliła widzów. Czy nie posunęliście się za daleko?','The “{st}” stipulation in {a}{b} divided viewers. Did you go too far?'],
 'pc.q.feud':['Zakończyliście feud {a}{b}. Czy to nie za wcześnie?','You ended the {a}{b} feud. Was that too soon?'],
 'pc.q.push':['Dlaczego {w} wciąż nie dostał poważnego pusha? Kibice domagają się go od miesięcy.','Why has {w} still not got a serious push? Fans have been asking for months.'],
 'pc.q.push2':['Kto bardziej zasługuje na szansę: {w} czy {w2}? Obaj czekają w kolejce.','Who deserves a shot more: {w} or {w2}? Both are waiting in line.'],
 'pc.q.rumor':['Mówi się, że {w} rozmawia z rywalami. Czy zostanie w Twojej federacji?','The word is {w} is talking to rivals. Will they stay with your promotion?'],
 'pc.q.injury':['Kontuzja {w} ({n} tyg.) rozwala plany. Jak sobie z tym poradzicie?','{w}’s injury ({n} wks) wrecks your plans. How will you cope?'],
 'pc.q.rival':['{r} depcze Wam po piętach. Czy boicie się konkurencji?','{r} is breathing down your neck. Are you afraid of the competition?'],
 'pc.q.money':['Plotki mówią o problemach finansowych. Czy zarząd traci cierpliwość?','Rumors point to money trouble. Is the board losing patience?'],
 'pc.q.tix':['Czy ceny biletów nie są zbyt wysokie dla zwykłego kibica?','Aren’t ticket prices too high for the average fan?'],
 'pc.q.locker':['Słychać, że w szatni nie jest dobrze, a {w} jest niezadowolony. Prawda?','There is talk of trouble in the locker room and {w} is unhappy. True?'],
 'pc.o.best.bold':['„Tak, a to dopiero początek sezonu.”','“Yes, and the season has only started.”'],'pc.o.best.honest':['„Świetna walka, ale mamy jeszcze lepsze pomysły.”','“Great match, but we have even better ideas.”'],'pc.o.best.dipl':['„Zawodnicy dali z siebie wszystko.”','“The wrestlers gave everything.”'],
 'pc.o.worst.bold':['„Nie zgadzam się, krytycy się mylą.”','“I disagree, the critics are wrong.”'],'pc.o.worst.honest':['„Masz rację, to nie był nasz poziom.”','“You’re right, that wasn’t our level.”'],'pc.o.worst.dipl':['„Każda gala ma lepsze i gorsze momenty.”','“Every show has highs and lows.”'],
 'pc.o.main.bold':['„Główny wątek dopiero się rozkręca.”','“The main story is only getting started.”'],'pc.o.main.honest':['„Przyznaję, że wymaga to poprawy.”','“I admit it needs work.”'],'pc.o.main.dipl':['„Patrzymy na to w szerszej perspektywie.”','“We’re looking at the bigger picture.”'],
 'pc.o.champ.bold':['„Tak. To nowy rozdział całej federacji.”','“Yes. A new chapter for the whole company.”'],'pc.o.champ.honest':['„Zobaczymy, jak sobie poradzi z presją.”','“We’ll see how they handle the pressure.”'],'pc.o.champ.dipl':['„Zasłużył na tę szansę.”','“They earned this chance.”'],
 'pc.o.stip.bold':['„Fani chcą ekstremum, to je dostają.”','“Fans want extreme, so they get extreme.”'],'pc.o.stip.honest':['„Może faktycznie było ostro, wyciągniemy wnioski.”','“Maybe it was rough, we’ll learn from it.”'],'pc.o.stip.dipl':['„Wszystko w granicach naszej platformy.”','“All within the limits of our platform.”'],
 'pc.o.feud.bold':['„Zakończyliśmy go w najlepszym momencie.”','“We ended it at its peak.”'],'pc.o.feud.honest':['„Być może tak, ale historia się domknęła.”','“Perhaps, but the story closed.”'],'pc.o.feud.dipl':['„Zawodnicy wejdą w nowe wątki.”','“The wrestlers move on to new stories.”'],
 'pc.o.push.bold':['„Obiecuję: dostanie szansę na pas lub walkę wieczoru w 8 tygodni.”','“I promise: a title shot or a main event within 8 weeks.”'],'pc.o.push.honest':['„Jeszcze na to nie zasłużył.”','“Not yet, he hasn’t earned it.”'],'pc.o.push.dipl':['„Mamy wobec niego plany, ale nic nie zdradzę.”','“We have plans for him, but I won’t reveal them.”'],
 'pc.o.push2.bold':['„{w}! Dostanie szansę na pas lub walkę wieczoru w 8 tygodni.”','“{w}! A title shot or a main event within 8 weeks.”'],'pc.o.push2.honest':['„Obaj muszą jeszcze na to zapracować.”','“Both still have to earn it.”'],'pc.o.push2.dipl':['„Obaj mają przed sobą przyszłość.”','“Both have a future ahead.”'],
 'pc.o.rumor.bold':['„Zostaje. Pewnie, że zostaje.”','“They stay. Of course they stay.”'],'pc.o.rumor.honest':['„Rozmawiamy o nowej umowie.”','“We are talking about a new contract.”'],'pc.o.rumor.dipl':['„Nie komentuję kontraktów.”','“I don’t comment on contracts.”'],
 'pc.o.injury.bold':['„Żadnego problemu, mamy głębokie zaplecze.”','“No problem, we have a deep roster.”'],'pc.o.injury.honest':['„To cios, ale zawodnik ma nasze pełne wsparcie.”','“It’s a blow, but the wrestler has our full support.”'],'pc.o.injury.dipl':['„Życzymy mu szybkiego powrotu.”','“We wish a speedy return.”'],
 'pc.o.rival.bold':['„Nie boimy się nikogo. To oni gonią nas.”','“We fear no one. They are the ones chasing us.”'],'pc.o.rival.honest':['„To dobra konkurencja, motywuje nas.”','“They’re good competition and it motivates us.”'],'pc.o.rival.dipl':['„Skupiamy się na własnej robocie.”','“We focus on our own work.”'],
 'pc.o.money.bold':['„Finanse są w świetnej formie.”','“Finances are in great shape.”'],'pc.o.money.honest':['„Mamy trudniejszy okres, ale mamy plan.”','“It’s a tougher period, but we have a plan.”'],'pc.o.money.dipl':['„Zarząd ma pełne zaufanie do zespołu.”','“The board fully trusts the team.”'],
 'pc.o.tix.bold':['„Płacisz za najlepszy show w mieście.”','“You pay for the best show in town.”'],'pc.o.tix.honest':['„Obserwujemy ceny i reagujemy na frekwencję.”','“We watch prices and react to attendance.”'],'pc.o.tix.dipl':['„Dbamy o fanów na każdym poziomie.”','“We look after fans at every level.”'],
 'pc.o.locker.bold':['„Szatnia to jedna rodzina.”','“The locker room is one family.”'],'pc.o.locker.honest':['„Są napięcia i pracujemy nad nimi.”','“There is tension and we are working on it.”'],'pc.o.locker.dipl':['„Rozmawiamy z zawodnikami na bieżąco.”','“We talk with the wrestlers all the time.”'],
 'pc.r.ok.bold':['Sala wybucha oklaskami. {j} kiwa głową.','The room applauds. {j} nods.'],'pc.r.ok.honest':['Uczciwa odpowiedź robi dobre wrażenie na dziennikarzach.','The honest answer impresses the press.'],'pc.r.ok.dipl':['Bezpieczna odpowiedź. Nikt nie ma o co się czepiać.','A safe answer. Nothing to pounce on.'],
 'pc.r.bad.bold':['{j} nie daje się przekonać i publikuje ostrą ripostę.','{j} isn’t convinced and publishes a sharp rebuttal.'],'pc.r.bad.honest':['Szczerość wychodzi bokiem, bo nagłówki wyolbrzymiają Twoje słowa.','The honesty backfires as headlines blow your words up.'],'pc.r.bad.dipl':['Wymijająca odpowiedź irytuje sale.','The evasive answer annoys the room.'],
 'pc.n.done':['Konferencja prasowa po gali. Wpływ na popularność: {p}.','Post-show press conference. Popularity effect: {p}.'],'pc.n.skip':['Federacja pominęła konferencję prasową.','The promotion skipped the press conference.'],
 'pc.n.kept':['Obietnica spełniona: {w} dostał swoją szansę.','Promise kept: {w} got their shot.'],'pc.n.broke':['Obiecany push dla {w} nie nadszedł. Zawodnik czuje się oszukany.','The promised push for {w} never came. The wrestler feels cheated.']
});

Object.assign(D,{
 'pc.q.women':['Dywizja kobiet zyskuje na znaczeniu. Czy {w} może być twarzą całej federacji?','The women’s division is on the rise. Could {w} become the face of the whole company?'],
 'pc.q.vet':['{w} ma {n} lat i wciąż wychodzi do ringu. Czy nie czas na emeryturę?','{w} is {n} and still wrestles. Isn’t it time to retire?'],
 'pc.q.rookie':['Młody {w} robi furorę. Czy za szybko go rozpędzacie?','Young {w} is a sensation. Are you pushing them too fast?'],
 'pc.q.longreign':['{w} dzierży pas ({t}) od {n} tygodni. Czy to nie robi się nudne?','{w} has held the {t} for {n} weeks. Isn’t this getting stale?'],
 'pc.q.streak':['Macie serię {n} świetnych gal z rzędu. Jaki jest przepis?','You have a run of {n} great shows in a row. What’s the recipe?'],
 'pc.q.sellout':['Hala wyprzedana do ostatniego miejsca. Czy czas na większy obiekt?','A sold-out arena. Is it time for a bigger venue?'],
 'pc.q.empty':['Frekwencja to tylko {p}% hali. Fani przestają przychodzić?','Attendance was only {p}% of the arena. Are fans staying away?'],
 'pc.q.dirty':['Zakończenie walki {a}{b} wzbudziło kontrowersje. Czy to było zaplanowane?','The finish of {a}{b} caused controversy. Was it planned?'],
 'pc.q.drawm':['Walka {a}{b} zakończyła się remisem. Czy fani nie czują się oszukani?','{a}{b} ended in a draw. Don’t fans feel cheated?'],
 'pc.q.trustlow':['Pojawiają się głosy, że zarząd traci do Ciebie zaufanie. Co odpowiesz?','There are voices saying the board is losing faith in you. What do you say?'],
 'pc.q.brand':['Dwa brandy to dwie oferty. Czy nie rozmywacie przez to marki?','Two brands mean two products. Aren’t you diluting the brand?'],
 'pc.q.stable':['Stajnia {s} dominuje w kulisach. Czy nie ma za dużo władzy?','The {s} stable rules the backstage. Does it have too much power?'],
 'pc.q.future':['Jakie są Wasze plany na następne miesiące?','What are your plans for the coming months?'],
 'pc.q.merch':['Jak sprzedają się koszulki i gadżety? Fani chcą nosić Wasze logo?','How is merch selling? Do fans want to wear your logo?'],
 'pc.q.fans':['Fani skandują nazwisko zawodnika, którego nie dopuszczacie do głosu. Słyszycie ich?','Fans chant for a wrestler you keep off the mic. Do you hear them?'],
 'pc.q.tier':['Kiedy zobaczymy Waszą federację na kolejnym poziomie?','When will we see your promotion at the next level?'],
 'pc.q.predict':['Krytycy zarzucają Wam przewidywalny booking. Co na to odpowiecie?','Critics call your booking predictable. What’s your answer?'],
 'pc.q.prestige':['Czy pasy w Waszej federacji wciąż coś znaczą?','Do the titles in your promotion still mean something?'],
});
const PCO={
 women:[['„Tak, kobiety to przyszłość tej federacji.”','“Yes, women are the future of this company.”'],['„Dywizja rośnie, ale jest jeszcze dużo pracy.”','“The division is growing, but there’s work to do.”'],['„Wszyscy zawodnicy zasługują na szansę.”','“Every wrestler deserves a chance.”']],
 vet:[['„Dopóki fani chcą go oglądać, zostaje.”','“As long as fans want him, he stays.”'],['„To jego decyzja i będziemy ją szanować.”','“It’s his decision and we’ll respect it.”'],['„Doświadczenie jest bezcenne dla szatni.”','“Experience is priceless for the locker room.”']],
 rookie:[['„Z talentem nie ma co czekać.”','“With talent there’s no point waiting.”'],['„Wiemy, że ryzykujemy, ale pilnujemy tempa.”','“We know it’s a risk, but we watch the pace.”'],['„Rozwija się według planu.”','“He’s developing according to plan.”']],
 longreign:[['„Mistrz zasłużył na każdy dzień panowania.”','“The champion earned every day of the reign.”'],['„Czas na świeżą krew, to prawda.”','“Time for fresh blood, that’s true.”'],['„Każdy pas ma swój cykl.”','“Every title has its cycle.”']],
 streak:[['„Najlepsi zawodnicy i najlepszy booking.”','“The best wrestlers and the best booking.”'],['„Ciężka praca całego zespołu.”','“The hard work of the whole team.”'],['„Nie zdradzamy przepisów.”','“We don’t give away recipes.”']],
 sellout:[['„Tak. Plany na większy obiekt już powstają.”','“Yes. Plans for a bigger venue are underway.”'],['„Najpierw upewnijmy się, że to nie jednorazowy sukces.”','“First let’s make sure it’s not a one-off.”'],['„Cieszymy się, że fani nas wspierają.”','“We’re glad the fans support us.”']],
 empty:[['„To wyjątek. Wrócimy z rekordem.”','“That’s a blip. We’ll be back with a record.”'],['„To sygnał ostrzegawczy i zamierzamy go wykorzystać.”','“It’s a warning sign and we’ll act on it.”'],['„Pracujemy nad ofertą dla fanów.”','“We’re working on the offer for fans.”']],
 dirty:[['„Tak, to była część historii.”','“Yes, it was part of the story.”'],['„Przyznaję, że można to było lepiej rozegrać.”','“I admit it could have been handled better.”'],['„Wrestling lubi niespodzianki.”','“Wrestling loves surprises.”']],
 drawm:[['„Remis też jest wynikiem. Rewanż będzie wielki.”','“A draw is a result too. The rematch will be huge.”'],['„Niektórzy czują niedosyt, rozumiem.”','“Some feel unsatisfied, I understand.”'],['„Obaj zawodnicy dali z siebie wszystko.”','“Both wrestlers gave it all.”']],
 trustlow:[['„Zarząd może na mnie liczyć, wyniki będą lepsze.”','“The board can count on me, results will improve.”'],['„Wiem, że jest presja, i zamierzam to naprawić.”','“I know there is pressure and I intend to fix it.”'],['„Mamy świetną relację z zarządem.”','“We have an excellent relationship with the board.”']],
 brand:[['„Dwa brandy to dwa razy więcej wrestlingu.”','“Two brands mean twice the wrestling.”'],['„Wymaga to dużo pracy, ale się opłaca.”','“It takes a lot of work, but it pays off.”'],['„Każdy brand ma własną tożsamość.”','“Each brand has its own identity.”']],
 stable:[['„Dostali swoją pozycję ciężką pracą.”','“They earned their position through hard work.”'],['„Mają wpływy, ale pilnujemy równowagi.”','“They have influence, but we keep the balance.”'],['„W kulisach decyduje zespół bookerski.”','“The booking team decides backstage.”']],
 future:[['„Będzie głośniej niż kiedykolwiek.”','“It will be louder than ever.”'],['„Chcemy stopniowo i stabilnie rosnąć.”','“We want steady, gradual growth.”'],['„Nie zdradzam szczegółów.”','“I won’t give details.”']],
 merch:[['„Rekordowa sprzedaż, a to dopiero początek.”','“Record sales, and it’s only the beginning.”'],['„Sprzedaż jest solidna, ale mogłaby być lepsza.”','“Sales are solid, but could be better.”'],['„Fani okazują nam ogromne wsparcie.”','“Fans show us huge support.”']],
 fans:[['„Słyszymy, i niedługo usłyszycie ich w mikrofonie.”','“We hear them, and soon you’ll hear him on the mic.”'],['„Fani mają rację, ale to nie takie proste.”','“Fans have a point, but it’s not that simple.”'],['„Cenimy głos publiczności.”','“We value the voice of the crowd.”']],
 tier:[['„Szybciej, niż myślicie.”','“Sooner than you think.”'],['„Jeszcze nie jesteśmy gotowi. Pracujemy nad tym.”','“We’re not ready yet. We’re working on it.”'],['„Skupiamy się na tu i teraz.”','“We focus on the here and now.”']],
 predict:[['„Zobaczycie, co dla Was przygotowaliśmy.”','“Wait and see what we have prepared.”'],['„Czasem krytycy mają rację.”','“Sometimes the critics are right.”'],['„Szanujemy każdą opinię.”','“We respect every opinion.”']],
 prestige:[['„Nasze pasy to najcenniejsze trofea w branży.”','“Our titles are the most valuable trophies in the business.”'],['„Prestiż trzeba budować każdą walką.”','“Prestige is built with every match.”'],['„Mistrzowie dobrze je reprezentują.”','“The champions represent them well.”']]
};
Object.keys(PCO).forEach(k=>['bold','honest','dipl'].forEach((tn,i)=>{D['pc.o.'+k+'.'+tn]=PCO[k][i]}));

Object.assign(D,{
 'pc.q.tagdiv':['Dywizja tag team to dziś Wasza najmocniejsza strona. Czy dostanie więcej czasu na galach?','The tag division is your strong suit now. Will it get more time on shows?'],
 'pc.q.transfer':['Podobno zerkacie na gwiazdy z {r}. Czy szykuje się wielki transfer?','The word is you’re eyeing stars at {r}. Is a big transfer coming?'],
 'pc.q.ppvprice':['Czy cena gal PPV nie jest zbyt wysoka dla widza?','Isn’t the PPV price too high for viewers?'],
 'pc.q.loss':['Ta gala przyniosła stratę. Czy finanse federacji są pod kontrolą?','This show lost money. Are the promotion’s finances under control?'],
 'pc.q.profit':['Gala przyniosła zysk. Na co go przeznaczycie?','The show turned a profit. What will you spend it on?'],
 'pc.q.great':['Gala oceniona na {s}★ to jedna z Waszych najlepszych. Da się to powtórzyć?','A {s}★ show is among your best. Can you repeat it?'],
 'pc.q.meh':['Gala ({s}★) rozczarowała krytyków. Czy to chwilowy spadek formy?','The show ({s}★) disappointed critics. Is it a temporary slump?'],
 'pc.q.promo':['Wystąpienia mikrofonowe wywołały dyskusję. Czy nie ma za dużo gadania?','The mic segments sparked debate. Isn’t there too much talking?'],
 'pc.q.injrisk':['{n} zawodników jest kontuzjowanych. Czy Wasze walki nie są zbyt ryzykowne?','{n} wrestlers are injured. Aren’t your matches too risky?'],
 'pc.q.salary':['Czy zawodnicy zarabiają tyle, ile zasługują?','Are wrestlers paid what they deserve?'],
 'pc.q.storyline':['Prowadzicie kilka feudów naraz. Który uważacie za najważniejszy?','You run several feuds at once. Which one matters most?'],
 'pc.q.moodgood':['Mówi się, że atmosfera w szatni jest świetna. Co jest tego powodem?','They say the locker room mood is great. What’s behind it?'],
 'pc.q.moodbad':['Źródła mówią o złej atmosferze w szatni. Czy to się nie odbije na gali?','Sources report a bad mood in the locker room. Won’t it show on the cards?'],
 'pc.q.titlechg':['Pasy zmieniły właścicieli {n} razy w jeden wieczór. Czy przechodzą z rąk do rąk zbyt łatwo?','Titles changed hands {n} times tonight. Do belts change too easily?'],
 'pc.q.rematch':['Czy po walce {a}{b} możemy liczyć na rewanż?','After {a}{b}, can we expect a rematch?'],
 'pc.q.tvdeal':['Co z Waszym kontraktem medialnym? Czy telewizja jest zadowolona?','What about your media deal? Is the network happy?'],
 'pc.q.gm':['Kto naprawdę decyduje o tym, co dzieje się w ringu?','Who really decides what happens in the ring?'],
 'pc.q.crowd':['Publiczność była dziś bardzo głośna. Czy to najlepsi fani w branży?','The crowd was very loud tonight. Are they the best fans in the business?'],
 'pc.q.hof':['Czy planujecie uhonorować legendę swojej federacji?','Do you plan to honor a legend of your promotion?']
});
const PCO2={
 tagdiv:[['„Tag team to serce naszej federacji.”','“Tag teams are the heart of our company.”'],['„Dostaną więcej czasu, jeśli sobie na to zapracują.”','“They’ll get more time if they earn it.”'],['„Wszystkie dywizje są dla nas ważne.”','“All divisions matter to us.”']],
 transfer:[['„Dla odpowiedniej gwiazdy otworzymy portfel.”','“For the right star we’ll open the wallet.”'],['„Rozmawiamy z wieloma, ale nic nie jest pewne.”','“We talk to many, but nothing is certain.”'],['„Nie komentuję rynku transferowego.”','“I don’t comment on the transfer market.”']],
 ppvprice:[['„Płacisz tyle, ile warte jest widowisko.”','“You pay what the spectacle is worth.”'],['„Obserwujemy wyniki i reagujemy na opinie.”','“We watch the numbers and react to feedback.”'],['„Dbamy o to, by oferta była uczciwa.”','“We make sure the offer is fair.”']],
 loss:[['„To inwestycja w przyszłe zyski.”','“It’s an investment in future profits.”'],['„Tak, musimy pilnować wydatków.”','“Yes, we need to watch spending.”'],['„Sytuacja jest stabilna.”','“The situation is stable.”']],
 profit:[['„Wszystko wraca do zawodników i fanów.”','“It all goes back to wrestlers and fans.”'],['„Część odkładamy, resztę inwestujemy w rozwój.”','“Part is saved, the rest goes into growth.”'],['„Zarząd zdecyduje o szczegółach.”','“The board will decide the details.”']],
 great:[['„Tak, i będzie jeszcze lepiej.”','“Yes, and it will get even better.”'],['„To był świetny wieczór, ale każdy wieczór to nowy test.”','“It was a great night, but every night is a new test.”'],['„Zawodnicy zasługują na pochwały.”','“The wrestlers deserve the praise.”']],
 meh:[['„To była tylko jedna słabsza noc.”','“It was just one weaker night.”'],['„Zawiedliśmy i wyciągniemy wnioski.”','“We let you down and we’ll learn.”'],['„Pracujemy nad poprawą.”','“We’re working to improve.”']],
 promo:[['„Fani kochają dobre promo i dostaną więcej.”','“Fans love a good promo and they’ll get more.”'],['„Może rzeczywiście trochę za długo.”','“Maybe it really ran a bit long.”'],['„Dbamy o równowagę.”','“We care about balance.”']],
 injrisk:[['„Wrestling to ciężki sport, to jego natura.”','“Wrestling is a tough sport, that’s its nature.”'],['„To nas niepokoi i weźmiemy to pod uwagę.”','“It worries us and we’ll take it into account.”'],['„Zdrowie zawodników jest priorytetem.”','“The wrestlers’ health is a priority.”']],
 salary:[['„Płacimy jednym z najlepszych stawek w branży.”','“We pay among the best rates in the business.”'],['„Zawsze może być lepiej.”','“It can always be better.”'],['„Rozmawiamy z każdym indywidualnie.”','“We talk to each one individually.”']],
 storyline:[['„Ten, który zaskoczy Was najbardziej.”','“The one that will surprise you most.”'],['„Wszystkie wątki mają swoje miejsce, ale jeden wyróżnia się.”','“All stories have their place, but one stands out.”'],['„Nie wskazuję faworytów.”','“I won’t name favorites.”']],
 moodgood:[['„Mamy najlepszą szatnię w branży.”','“We have the best locker room in the business.”'],['„To efekt szacunku i rozmów.”','“It’s the result of respect and talking.”'],['„Dobrzy ludzie robią dobry show.”','“Good people make a good show.”']],
 moodbad:[['„Plotki. Szatnia ma się świetnie.”','“Rumors. The locker room is great.”'],['„Są tarcia i zajmiemy się nimi.”','“There’s friction and we’ll deal with it.”'],['„Nie wnikamy w plotki.”','“We don’t go into rumors.”']],
 titlechg:[['„Zmiany napędzają emocje.”','“Changes drive the excitement.”'],['„Może rzeczywiście trochę za dużo.”','“Maybe it really was a bit much.”'],['„Każda zmiana wynika z fabuły.”','“Every change follows the story.”']],
 rematch:[['„Rewanż będzie jeszcze większy.”','“The rematch will be even bigger.”'],['„Rozważamy to, ale to nie jest pewne.”','“We’re considering it, but it’s not certain.”'],['„Zobaczymy, co przyniesie los.”','“We’ll see what fate brings.”']],
 tvdeal:[['„Telewizja jest zachwycona.”','“The network is delighted.”'],['„Rozmowy trwają i zależy nam na dobrych warunkach.”','“Talks continue and we want good terms.”'],['„Mamy dobre relacje z partnerami.”','“We have good relations with our partners.”']],
 gm:[['„Ja. I biorę za to odpowiedzialność.”','“I do. And I take responsibility.”'],['„To praca zespołu, ale decyzja należy do mnie.”','“It’s teamwork, but the decision is mine.”'],['„Cały zespół kreatywny.”','“The whole creative team.”']],
 crowd:[['„Najlepsi na świecie i to nie przesada.”','“The best in the world, no exaggeration.”'],['„Wspaniali, ale szanujemy też innych.”','“Wonderful, but we respect others too.”'],['„Dziękujemy każdemu, kto przyszedł.”','“We thank everyone who came.”']],
 hof:[['„Tak, wkrótce ogłosimy coś wielkiego.”','“Yes, we’ll announce something big soon.”'],['„Pomysł jest na stole, ale to złożona decyzja.”','“The idea is on the table, but it’s a complex decision.”'],['„Szanujemy historię, nic więcej nie powiem.”','“We respect history, I’ll say no more.”']]
};
Object.keys(PCO2).forEach(k=>['bold','honest','dipl'].forEach((tn,i)=>{D['pc.o.'+k+'.'+tn]=PCO2[k][i]}));
ACT.pcopt=e=>{const r=window.__pcRes;window.__pcRes=null;closeModal();if(r)r(+(e&&e.dataset&&e.dataset.i||0))};
const _pcDone=ACT.done;ACT.done=function(){const a=arguments,self=this;
 if(G.pc&&G.pc.q&&G.pc.q.length&&hasDoc){G.showResult=false;pcRun().then(()=>_pcDone.apply(self,a),()=>_pcDone.apply(self,a))}else _pcDone.apply(this,a)};
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('pccss')){const s=document.createElement('style');s.id='pccss';s.textContent=
'.pcm{display:flex;flex-direction:column;gap:10px}.pcj{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.pcjn{font-weight:700}.pcjo{color:var(--mute);font-size:13px}.pcjk{margin-left:auto;color:var(--mute);font-size:12px}'
+'.pcq{font-size:16px;line-height:1.45;margin:2px 0;overflow-wrap:break-word}.pcr{color:var(--mute);margin:0;line-height:1.45}.pcch{display:flex;gap:6px;flex-wrap:wrap}'
+'.pcc{font-size:12.5px;font-weight:700;border:1px solid var(--line);border-radius:6px;padding:2px 8px}.pcc.up{border-color:var(--grn,#3a9);color:var(--grn,#3a9)}.pcc.dn{border-color:var(--red);color:var(--red)}.pcc.pr{border-color:var(--star);color:var(--fg)}';
document.head.appendChild(s)}}catch(e){}}
// tutorial lesson, inserted before the end
(function(){_T('press','Konferencje prasowe','Od 4 poziomu federacji po każdej gali PPV/PLE odbywa się konferencja prasowa. Dziennikarze pytają o najlepszą i najsłabszą walkę, o nowych mistrzów, stypulacje, kontuzje, plotki kontraktowe, rywali, finanse i zawodników, którzy czekają na push. Na każde pytanie odpowiadasz pewnie, szczerze albo dyplomatycznie. Pewność daje największy zysk i największe ryzyko, dyplomacja jest bezpieczna, ale mało daje. Odpowiedzi wpływają na popularność federacji, zaufanie zarządu i morale zawodnika, którego dotyczy pytanie. Jeśli obiecasz push, masz 8 tygodni, żeby dać mu walkę o pas lub walki wieczoru, inaczej morale spadnie, a zarząd straci zaufanie. Konferencję możesz pominąć kosztem 1 pkt popularności.','From tier 4 up, a press conference follows every PPV/PLE show. Reporters ask about the best and worst matches, new champions, stipulations, injuries, contract rumors, rivals, finances and wrestlers waiting for a push. You answer boldly, honestly or diplomatically. Bold has the biggest gain and the biggest risk, diplomatic is safe but gives little. Answers move the promotion’s popularity, board trust and the morale of the wrestler in question. If you promise a push, you have 8 weeks to give them a title match or a main event, otherwise morale drops and the board loses trust. You can skip the conference for a 1 point popularity cost.');
 const i=TUTS.findIndex(x=>x[1]==='ppv');const e=['show','press'];if(TUTS.some(x=>x[1]==='press'))return;
 const at=i>=0?i+1:TUTS.length-1;TUTS.splice(at,0,['ppv','press'])})();
normTexts();
