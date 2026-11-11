// ---- Inbox + multi-week storylines (angles) ----
function ibx(){if(!G.inbox){G.inbox=[];G.ibxN=0;G.ibxR=0}if(!G.angles)G.angles=[];if(!G.defer)G.defer=[];if(G.angDone==null)G.angDone=0}
const stripH=s=>String(s==null?'':s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
function ibxPush(k,title,body,ch){ibx();G.inbox.unshift({w:G.week,k,t:title,b:body||'',c:ch||''});G.inbox=G.inbox.slice(0,80);G.ibxN++}
const ibxNew=()=>{if(!G||!G.inbox)return 0;return Math.min(G.inbox.length,(G.ibxN||0)-(G.ibxR||0))+(G.angles||[]).filter(a=>a.st===0&&a.wait).length};
const ibxPend=()=>G?((G.defer||[]).length+(G.angles||[]).length):0;
// log every decision modal
{const _ag=askGeneric;askGeneric=function(title,body,opts){return _ag(title,body,opts).then(i=>{try{if(G&&opts[i]&&!window.__noLog)ibxPush('d',stripH(title),stripH(body).slice(0,220),stripH(opts[i].l).slice(0,120))}catch(e){}return i})}}
function deferEv(k){ibx();G.defer.push({k,due:G.week+2+Math.floor(rnd()*2)});ibxPush('m',t('ibx.defd'),t('ev.w.'+k+'.t'),'')}
async function runDeferred(k){
 window.__noDefer=true;window.__inWE=true;let ok=false;
 try{ok=await WEV[k]()}catch(e){ok=false}finally{window.__noDefer=false;window.__inWE=false}
 if(!ok)addNews('n.deferlost')}
async function inboxWeekly(){
 ibx();const due=G.defer.filter(d=>d.due<=G.week);
 for(const d of due){G.defer=G.defer.filter(x=>x!==d);ibxPush('m',t('ibx.back'),t('ev.w.'+d.k+'.t'),'');await runDeferred(d.k)}}
// ---------- storylines ----------
const ANGK=['betray','comeback','rise','turn','topwar','mentor','champ','chase'];
const aliveA=a=>a.ids.every(id=>{const w=W(id);return w&&w.fed===G.fed.id&&!w.farewell});
function angPick(k){
 const ms=mine().filter(w=>!w.farewell&&!w.injury&&w.contract>0);
 const busy=new Set();G.angles.forEach(a=>a.ids.forEach(i=>busy.add(i)));
 const f=ms.filter(w=>!busy.has(w.id));if(f.length<2)return null;
 const sorted=f.slice().sort((x,y)=>y.pop-x.pop);
 if(k==='betray'){const a=pickR(f.filter(w=>w.role==='face'&&w.pop>=12));if(!a)return null;const al=relList(a,'al').map(W).filter(x=>x&&!busy.has(x.id)&&!x.injury);const b=al.length?pickR(al):pickR(f.filter(w=>w!==a&&w.role==='face'&&w.pop>=10));return b?[a.id,b.id]:null}
 if(k==='comeback'){const a=pickR(f.filter(w=>w.age>=33&&w.pop>=14));const b=a&&pickR(f.filter(w=>w!==a&&w.age<=29&&w.pop>=10));return a&&b?[a.id,b.id]:null}
 if(k==='rise'){const a=pickR(f.filter(w=>w.age<=27&&w.pop<=40));const b=a&&sorted.find(w=>w!==a&&w.pop>=a.pop+8);return a&&b?[a.id,b.id]:null}
 if(k==='turn'){const a=pickR(f.filter(w=>w.role==='face'&&w.pop>=18));const b=a&&pickR(f.filter(w=>w!==a&&w.role==='face'&&w.pop>=8));return a&&b?[a.id,b.id]:null}
 if(k==='topwar'){if(sorted.length<2||sorted[1].pop<14)return null;return [sorted[0].id,sorted[1].id]}
 if(k==='champ'||k==='chase'){const tt=pickR(G.titles.filter(x=>x.teams===1&&x.holders.length===1&&f.some(w=>w.id===x.holders[0])));if(!tt)return null;const h=W(tt.holders[0]);const b=sorted.find(w=>w!==h&&w.pop>=10&&genderOK(tt,[w.id]));if(!b)return null;if(k==='champ'&&h.age<30)return null;return k==='champ'?[h.id,b.id]:[b.id,h.id]}
 if(k==='mentor'){const a=pickR(f.filter(w=>w.age>=31&&w.pop>=15));const b=a&&pickR(f.filter(w=>w!==a&&w.age<=25));return a&&b?[a.id,b.id]:null}
 return null}
function angStart(){
 ibx();if(G.angles.length>=2||mine().length<4)return null;
 for(const k of shuffle(ANGK.slice())){if(G.angles.some(a=>a.k===k))continue;const ids=angPick(k);if(ids){const a={id:'an'+G.week+k,k,ids,st:0,q:0,at:G.week,wait:true};G.angles.push(a);return a}}
 return null}
const angV=a=>({a:W(a.ids[0]).name,b:W(a.ids[1]).name});
async function angStage(a){
 const v=angV(a),s=a.st+1;
 const i=await askGeneric(t('ang.'+a.k+'.'+s+'.t'),t('ang.'+a.k+'.'+s+'.b',v),[{l:t('ang.'+a.k+'.'+s+'.1',v)},{l:t('ang.'+a.k+'.'+s+'.2',v)}]);
 const A=W(a.ids[0]),B=W(a.ids[1]);
 if(i===0){if(rnd()<.62){a.q+=2;evMood(A,2)}else{a.q+=0;evMood(B,-3);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.misfire',v))}}
 else{a.q+=1;evMood(A,1);evMood(B,1)}
 if(a.k==='betray'&&s===1&&i===0)relLink(A,B,'rv');
 a.st=s;a.at=G.week;a.wait=false;
 if(s>=2){a.pay=true;a.dl=G.week+7;ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.book',v))}
 addNews('n.ang.s'+s,{a:v.a,b:v.b,n:t('ang.'+a.k+'.t')})}
async function angleWeekly(){
 ibx();
 for(const a of G.angles.slice()){
  if(!aliveA(a)){G.angles=G.angles.filter(x=>x!==a);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.cancel'));continue}
  if(a.pay){if(G.week>a.dl){G.angles=G.angles.filter(x=>x!==a);const v=angV(a);evMood(W(a.ids[0]),-3);evMood(W(a.ids[1]),-2);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.expire',v));addNews('n.ang.exp',v)}continue}
  if(a.st===1&&G.week>=a.at+1+(a.q>=2?0:1)){await angStage(a)}}
 if(G.week>=5&&G.angles.length<2&&((G.week%3===0&&rnd()<.45)||(!G.angles.length&&rnd()<.25))){
  const a=angStart();if(a){const v=angV(a);ibxPush('a',t('ang.'+a.k+'.t'),t('ibx.start',v));await angStage(a)}}}
function angleMatch(m,A,B,wi,li){
 if(!G.angles||!G.angles.length)return 0;
 const all=A.concat(B);let bonus=0;
 for(const a of G.angles.slice()){
  if(!a.pay||!a.ids.every(id=>all.indexOf(id)>=0))continue;
  const X=W(a.ids[0]),Y=W(a.ids[1]),v={a:X.name,b:Y.name,n:t('ang.'+a.k+'.t')};
  const same=(A.indexOf(a.ids[0])>=0)===(A.indexOf(a.ids[1])>=0);
  bonus=Math.max(bonus,Math.min(.8,.3+.12*a.q)-(same&&a.k!=='mentor'?.15:0));
  const hit=a.q>=3;
  if(hit){evPop(X,1.2);evPop(Y,.7);G.fed.pop=clamp(G.fed.pop+.3,2,100);evMood(X,4);evMood(Y,3)}
  else{evPop(X,.3);evMood(X,-1)}
  if(a.k==='betray'){relLink(X,Y,'rv');if(hit)X.role='heel'}
  else if(a.k==='turn'){X.role='heel';relLink(X,Y,'rv')}
  else if(a.k==='topwar'||a.k==='comeback'){relLink(X,Y,'rv')}
  else if(a.k==='mentor'){relLink(X,Y,'al');if(hit)Y.ring=Math.min(99,(Y.ring||40)+1)}
  else if(a.k==='champ'||a.k==='chase'){relLink(X,Y,'rv');if(hit){G.titles.forEach(tt=>{if(tt.holders.some(h=>a.ids.indexOf(h)>=0))tt.pdyn=clamp(prestOf(tt)+.1,1,5)})}}
  else if(a.k==='rise'){if(hit)X.ring=Math.min(99,(X.ring||40)+1)}
  G.angDone=(G.angDone||0)+1;G.angles=G.angles.filter(x=>x!==a);
  addNews(hit?'n.ang.hit':'n.ang.flop',v);ibxPush('a',v.n,t(hit?'ibx.hit':'ibx.flop',v));
  twAdd('angle',v,'wire',hit?.6:-.1)}
 return bonus}
// ---------- views ----------
function vInbox(){
 ibx();let h='<div class="top"><div><h2>'+t('nav.inbox')+'</h2><div class="mute">'+t('ibx.sub')+'</div></div></div>';
 h+='<div class="card stack"><h3>'+t('ibx.angles')+' '+G.angles.length+'/2</h3>';
 if(!G.angles.length)h+='<div class="mute">'+t('ibx.noang')+'</div>';
 G.angles.forEach(a=>{if(!aliveA(a))return;const v=angV(a);h+='<div class="stack" style="gap:2px;border-top:1px solid var(--line,#8884);padding-top:6px"><div class="row spread"><b>'+esc(t('ang.'+a.k+'.t'))+'</b><span class="tag">'+(a.pay?t('ibx.stPay'):t('ibx.stRun',{s:Math.max(1,a.st)}))+'</span></div><div>'+esc(v.a)+' ⚔ '+esc(v.b)+'</div><div class="mute" style="font-size:13px">'+(a.pay?t('ibx.book',v)+' '+t('ibx.until',{w:a.dl}):t('ibx.wait'))+'</div>'+(a.pay?'<div><button data-act="nav" data-v="show">'+t('nav.show')+'</button></div>':'')+'</div>'});
 h+='<div class="mute" style="font-size:13px">'+t('ibx.done',{n:G.angDone||0})+'</div></div>';
 h+='<div class="card stack"><h3>'+t('ibx.deferred')+'</h3>';
 if(!G.defer.length)h+='<div class="mute">'+t('ui.none')+'</div>';
 G.defer.forEach(d=>{h+='<div class="row spread" style="gap:8px"><span>'+esc(t('ev.w.'+d.k+'.t'))+' <span class="mute">· '+t('ibx.until',{w:d.due})+'</span></span><button data-act="ibxnow" data-k="'+d.k+'">'+t('ibx.now')+'</button></div>'});
 h+='</div>';
 h+='<div class="card stack"><h3>'+t('ibx.log')+'</h3>';
 if(!G.inbox.length)h+='<div class="mute">'+t('ui.none')+'</div>';
 G.inbox.slice(0,40).forEach((m,i)=>{const nw=i<Math.min(G.inbox.length,(G.ibxN||0)-(G.ibxR||0));h+='<div class="stack" style="gap:1px;border-top:1px solid var(--line,#8884);padding-top:5px"><div class="row spread" style="gap:8px"><b>'+(nw?'● ':'')+(m.k==='a'?'📖 ':m.k==='m'?'⏳ ':'✉ ')+esc(m.t)+'</b><span class="mute" style="font-size:12px">'+t('ibx.wk')+' '+m.w+'</span></div>'+(m.b?'<div class="mute" style="font-size:13px">'+esc(m.b)+'</div>':'')+(m.c?'<div style="font-size:13px">→ '+esc(m.c)+'</div>':'')+(m.e?'<div style="font-size:13px;color:var(--gold)">'+t('ibx.fx')+': '+esc(m.e)+'</div>':'')+'</div>'});
 h+='</div>';G.ibxR=G.ibxN;return h}
function angCard(){
 if(!G||!G.angles||!G.angles.length)return '';
 return '<div class="card stack"><h3>📖 '+t('ibx.angles')+'</h3>'+G.angles.filter(aliveA).map(a=>{const v=angV(a);return '<div class="row spread" style="gap:8px"><span><b>'+esc(t('ang.'+a.k+'.t'))+'</b> · '+esc(v.a)+' ⚔ '+esc(v.b)+'</span><span class="mute" style="font-size:12px">'+(a.pay?t('ibx.stPay'):t('ibx.wait'))+'</span></div>'}).join('')+'</div>'}
// ---------- texts ----------
Object.assign(D,{'nav.inbox':['Skrzynka','Inbox'],'ev.defer':['⏳ Odłóż decyzję (wróci za kilka tygodni)','⏳ Decide later (it will return in a few weeks)'],
 'ibx.sub':['Decyzje, wątki fabularne i odłożone sprawy w jednym miejscu.','Decisions, storylines and postponed matters in one place.'],
 'ibx.angles':['Wątki fabularne','Storylines'],'ibx.noang':['Brak aktywnych wątków. Co kilka tygodni pojawi się nowy.','No active storylines. A new one appears every few weeks.'],
 'ibx.stPay':['czeka na walkę','awaiting match'],'ibx.stRun':['etap {s}/2','stage {s}/2'],'ibx.wait':['rozwija się…','developing…'],
 'ibx.book':['Zabookuj walkę {a} vs {b} – tam zapłaci się cały wątek (bonus do gwiazdek).','Book {a} vs {b} – that is where the storyline pays off (star bonus).'],
 'ibx.until':['do tyg. {w}','by wk {w}'],'ibx.done':['Zakończone wątki: {n}','Finished storylines: {n}'],
 'ibx.deferred':['Odłożone decyzje','Postponed decisions'],'ibx.now':['Rozpatrz teraz','Decide now'],'ibx.log':['Dziennik','Log'],'ibx.wk':['tyg.','wk'],
 'ibx.defd':['Decyzja odłożona','Decision postponed'],'ibx.back':['Sprawa wraca','Matter returns'],
 'ibx.start':['Nowy wątek: {a} i {b}.','New storyline: {a} and {b}.'],'ibx.misfire':['Pomysł nie chwycił – {b} nie jest zachwycony.','The idea did not click – {b} is not thrilled.'],
 'ibx.cancel':['Wątek anulowany – jeden z zawodników odszedł.','Storyline cancelled – one of the wrestlers left.'],
 'ibx.expire':['Nie zabookowano walki {a} vs {b} – publiczność zapomniała o wątku.','No match {a} vs {b} was booked – the crowd forgot the storyline.'],
 'ibx.hit':['Pełny sukces! {a} vs {b} – publiczność oszalała.','A hit! {a} vs {b} – the crowd went wild.'],'ibx.flop':['Wątek {a} vs {b} wypalił średnio.','The {a} vs {b} storyline fizzled.'],
 'n.ang.s1':['Wątek „{n}”: {a} i {b} – start.','Storyline “{n}”: {a} and {b} – kickoff.'],'n.ang.s2':['Wątek „{n}”: {a} vs {b} się zaostrza.','Storyline “{n}”: {a} vs {b} escalates.'],
 'n.ang.hit':['Wątek „{n}” wypalił: {a} vs {b} to hit!','Storyline “{n}” paid off: {a} vs {b} was a hit!'],'n.ang.flop':['Wątek „{n}” ({a} vs {b}) nie porwał tłumów.','Storyline “{n}” ({a} vs {b}) failed to catch fire.'],
 'n.ang.exp':['Wątek {a} vs {b} wygasł bez walki.','The {a} vs {b} storyline died without a match.'],'n.deferlost':['Odłożona sprawa sama się rozwiązała.','The postponed matter resolved itself.'],
 'tw.angle':['{a} i {b} – fani żyją tym wątkiem!','{a} and {b} – fans are glued to this storyline!']});
TWGEN.angle='gw';
{const A=(k,np,ne,s1,s2)=>{D['ang.'+k+'.t']=[np,ne];[s1,s2].forEach((s,i)=>{const n=i+1;D['ang.'+k+'.'+n+'.t']=[s[0],s[1]];D['ang.'+k+'.'+n+'.b']=[s[2],s[3]];D['ang.'+k+'.'+n+'.1']=[s[4],s[5]];D['ang.'+k+'.'+n+'.2']=[s[6],s[7]]})};
A('betray','Zdrada','Betrayal',
 ['Cień wątpliwości','A shadow of doubt','{a} zaczyna mieć dość {b}. Kamery łapią chłodne spojrzenia za kulisami.','{a} is getting tired of {b}. Cameras catch cold stares backstage.','Podsyć konflikt – nagły cios w plecy','Fuel it – a sudden back-attack','Zasiej tylko ziarno niepewności','Plant only a seed of doubt'],
 ['Pęknięcie','The split','Napięcie rośnie. Fani wyczuwają, że przyjaźń {a} i {b} wisi na włosku.','Tension grows. Fans sense the friendship of {a} and {b} hangs by a thread.','Rozbij to publicznie – promo na całą arenę','Break it publicly – an arena-wide promo','Buduj powoli – spojrzenia i zagrywki','Build slowly – glances and mind-games']);
A('comeback','Powrót weterana','Veteran Comeback',
 ['Wielkie słowa','Big words','{a} twierdzi, że „stare psy mają jeszcze zęby”, i celuje w młodego {b}.','{a} claims “old dogs still have teeth” and eyes the young {b}.','Wielka konferencja – weteran rzuca wyzwanie','A big press event – the veteran issues a challenge','Pokaż archiwalne klipy {a}','Show archive clips of {a}'],
 ['Cios w kolano','A low blow','{b} odpowiada pogardą. Hala jest podzielona na dwa obozy.','{b} answers with scorn. The arena splits into two camps.','Pozwól {b} upokorzyć weterana w promo','Let {b} humiliate the veteran on the mic','Niech {a} odpowie spokojnie i z klasą','Let {a} answer calmly and with class']);
A('rise','Wschodząca gwiazda','Rising Star',
 ['Ktoś chce więcej','Someone wants more','{a} nie chce już otwierać gali. Spogląda w stronę {b}.','{a} no longer wants to open the show. Eyes turn to {b}.','Daj {a} szansę – atak po gali na {b}','Give {a} a shot – a post-show attack on {b}','Niech {a} najpierw wygra kilka walk','Let {a} win a few matches first'],
 ['Gorączka','Heat','{b} lekceważy debiutanta, a trybuny zaczynają skandować nazwisko {a}.','{b} brushes the upstart off, and the crowd begins chanting {a}\'s name.','Wejdź na całość – {a} publicznie żąda walki','Go all in – {a} publicly demands a match','Spokojnie – niech chór fanów zrobi swoje','Easy – let the fan chants do the work']);
A('turn','Zwrot','The Turn',
 ['Coś nie gra','Something is off','{a} zachowuje się dziwnie wobec {b}. Fani szepczą o zmianie postawy.','{a} acts strangely around {b}. Fans whisper about a change of heart.','Zagraj zaskoczeniem – ostry atak krzesłem','Go for shock – a vicious chair attack','Zostaw wskazówki – podziel trybuny','Leave clues – divide the crowd'],
 ['Ostatnia kropla','The last straw','Gala nabiera tempa. Wszyscy czekają, czy {a} naprawdę odwróci się od {b}.','The pressure builds. Everyone waits to see if {a} will really turn on {b}.','Zrób z tego wydarzenie – ogłoś walkę o honor','Make it an event – announce a match of honour','Zostaw to niedopowiedzenie – niech spekulują','Keep it ambiguous – let them speculate']);
A('topwar','Wojna o szczyt','War for the Top',
 ['Dwóch na jednym tronie','Two on one throne','{a} i {b} mają dość dzielenia głównej sceny. Szatnia jest podzielona.','{a} and {b} are tired of sharing the main stage. The locker room is divided.','Podsyć rywalizację – głośne wyzwania','Stoke the rivalry – loud challenges','Utrzymaj szacunek – rywalizacja sportowa','Keep respect – a sporting rivalry'],
 ['Gorąca krew','Hot blood','Rywalizacja {a} vs {b} wymyka się spod kontroli. Ochrona rozdziela ich za kulisami.','The {a} vs {b} rivalry gets out of hand. Security separates them backstage.','Wykorzystaj to – bij pasem w promo','Use it – swing the belt in a promo','Zażegnaj spór i zamień go w walkę','Defuse it and turn it into a match']);
A('mentor','Mistrz i uczeń','Master and Apprentice',
 ['Nauka','The lesson','{a} bierze pod skrzydła młodego {b}. Fani kochają takie historie.','{a} takes young {b} under his wing. Fans love stories like this.','Pokaż trening – wspólna sekwencja przed galą','Show training – a joint pre-show sequence','Niech uczeń najpierw obserwuje z boku','Let the student watch from ringside first'],
 ['Sprawdzian','The test','{b} chce udowodnić, że jest gotowy. {a} zgadza się na próbę.','{b} wants to prove he is ready. {a} agrees to a test.','Daj {b} szansę – walka pokazowa na żywo','Give {b} a chance – a live exhibition','Zachowaj wątek na większą okazję','Save the storyline for a bigger occasion'])}
// ---------- extra events (storyline flavour) ----------
const scp=f=>pickR(mine().filter(w=>!w.farewell&&!w.injury&&(!f||f(w))));
E('fanvote','Ankieta fanów','Fan poll','Fani w sieci głosują, kogo chcą zobaczyć w głównym wydarzeniu: wygrywa {w}.','Fans vote online on who they want in the main event: {w} wins.',[['Spełnij życzenie fanów (+popularność {w})','Grant the fans\' wish (+{w} popularity)'],['Zignoruj ankietę','Ignore the poll']]);
E('crowdchant','Skandowanie','Crowd chant','Trybuny same zaczęły skandować nazwisko {w}. Można to podkręcić albo zostawić naturalnie.','The crowd started chanting {w}\'s name on its own. You can amplify it or leave it natural.',[['Podkręć – nowa wejściówka i oświetlenie ({m})','Amplify – new entrance and lighting ({m})'],['Zostaw naturalnie','Leave it natural']]);
E('castguest','Podcast','Podcast','{w} dostał zaproszenie do popularnego podcastu wrestlingowego. Może mówić o wszystkim.','{w} was invited to a popular wrestling podcast. They could say anything.',[['Zgódź się, ale z briefem','Agree, with a brief'],['Pozwól mówić swobodnie','Let them speak freely'],['Odmów','Decline']]);
E('mercyplea','Prośba o szansę','Plea for a chance','{w} prosi o większą rolę w wątku fabularnym i obiecuje, że się wykaże.','{w} asks for a bigger storyline role and promises to deliver.',[['Daj szansę','Give a chance'],['Powiedz, żeby poczekał','Tell them to wait']]);
E('crewdrama','Dramat w szatni','Locker-room drama','{a} i {b} publicznie pokłócili się o kolejność wejść, a ekipa patrzy, jak to rozwiążesz.','{a} and {b} openly argued over the entrance order and the crew watches how you handle it.',[['Rozstrzygnij na korzyść {a}','Decide in favour of {a}'],['Rozstrzygnij na korzyść {b}','Decide in favour of {b}'],['Zamień to w wątek fabularny','Turn it into a storyline']]);
E('fakeinj','Udawana kontuzja','Fake injury','{w} proponuje udawaną kontuzję, by wrócić z hukiem za kilka tygodni.','{w} proposes a fake injury to return with a bang in a few weeks.',[['Zgoda – sprytny booking','Agree – clever booking'],['Nie, za ryzykowne','No, too risky']]);
Object.assign(D,{'n.fanvote1':['Fani dostali swojego faworyta – {w} rośnie w siłę.','Fans got their favourite – {w} is on the rise.'],'n.fanvote2':['Ankieta fanów zignorowana – w sieci jest gorąco.','The fan poll was ignored – the internet is heated.'],
 'n.chant1':['{w} dostaje spektakularne wejście – trybuny szaleją.','{w} gets a spectacular entrance – the crowd goes wild.'],'n.chant2':['Skandowanie dla {w} samo się niesie.','The chant for {w} carries on by itself.'],
 'n.cg1':['{w} w podcaście – dobra reklama federacji.','{w} on the podcast – good promotion for the federation.'],'n.cg2a':['{w} powiedział w podcaście za dużo – viral!','{w} said too much on the podcast – viral!'],'n.cg2b':['{w} był w podcaście ciekawy i wyluzowany.','{w} was entertaining and relaxed on the podcast.'],
 'n.plea1':['{w} dostaje szansę i ją wykorzystuje.','{w} gets a chance and runs with it.'],'n.plea2':['{w} czeka cierpliwie na swoją kolej.','{w} waits patiently for their turn.'],
 'n.crew1':['{a} wygrywa spór o kolejność, {b} jest zły.','{a} wins the order dispute, {b} is upset.'],'n.crew2':['{b} wygrywa spór o kolejność, {a} jest zły.','{b} wins the order dispute, {a} is upset.'],'n.crew3':['Kłótnia {a} i {b} stała się rywalizacją na ringu.','The {a} and {b} argument became an in-ring rivalry.'],
 'n.fake1a':['Udawana kontuzja {w} zadziałała – fani czekają na powrót.','{w}\'s fake injury worked – fans await the return.'],'n.fake1b':['Fani przejrzeli udawaną kontuzję {w}.','Fans saw through {w}\'s fake injury.'],'n.fake2':['Nie ma zgody na udawaną kontuzję {w}.','No fake injury for {w}.']});
Object.assign(WEV,{
 async fanvote(){const w=scp(x=>x.pop>=8&&x.pop<60);if(!w)return false;const v={w:w.name};const i=await evx('fanvote',v,['1','2'],[false,false]);if(i===0){evPop(w,1.1);evMood(w,5);addNews('n.fanvote1',v)}else{evMood(w,-3);G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.fanvote2',v)}return true},
 async crowdchant(){const w=scp(x=>x.pop>=15);if(!w)return false;const c=r10(wkRev()*.2),v={w:w.name,m:money(c)};const i=await evx('crowdchant',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;evPop(w,1.5);evMood(w,4);G.fed.pop=clamp(G.fed.pop+.15,2,100);addNews('n.chant1',v)}else{evPop(w,.4);addNews('n.chant2',v)}return true},
 async castguest(){const w=scp(x=>x.pop>=12&&x.mic>=30);if(!w)return false;const v={w:w.name};const i=await evx('castguest',v,['1','2','3'],[false,false,false]);
  if(i===0){evPop(w,.4);G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.cg1',v)}else if(i===1){if(rnd()<.45){evPop(w,1.4);addNews('n.cg2a',v);twAdd('viral',{w:v.w},'wire',0)}else{evPop(w,-.8);G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.cg2b',v)}}return true},
 async mercyplea(){const w=scp(x=>x.pop<=40&&x.morale<70);if(!w)return false;const v={w:w.name};const i=await evx('mercyplea',v,['1','2'],[false,false]);if(i===0){evMood(w,12);w.loyal=Math.min(100,(w.loyal||50)+6);if(rnd()<.5)evPop(w,.8);addNews('n.plea1',v)}else{evMood(w,-4);addNews('n.plea2',v)}return true},
 async crewdrama(){const a=scp(x=>x.pop>=14),b=a&&scp(x=>x!==a&&x.pop>=10);if(!a||!b)return false;const v={a:a.name,b:b.name};const i=await evx('crewdrama',v,['1','2','3'],[false,false,false]);
  if(i===0){evMood(a,6);evMood(b,-6);addNews('n.crew1',v)}else if(i===1){evMood(b,6);evMood(a,-6);addNews('n.crew2',v)}else{relLink(a,b,'rv');evMood(a,2);evMood(b,2);addNews('n.crew3',v)}return true},
 async fakeinj(){const w=scp(x=>x.pop>=20);if(!w)return false;const v={w:w.name};const i=await evx('fakeinj',v,['1','2'],[false,false]);
  if(i===0){suspend(w,3);if(rnd()<.6){evPop(w,1.8);addNews('n.fake1a',v)}else{evPop(w,-1);G.fed.pop=clamp(G.fed.pop-.3,2,100);addNews('n.fake1b',v)}}else addNews('n.fake2',v);return true}
});
