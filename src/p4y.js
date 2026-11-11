/* ===== Talks with wrestlers: topics, approaches, personalities, mentors (numbers set by eye) ===== */
const TK_MAX=3,TK_CD=3;
const TK_TRAITS=['proud','calm','ambitious','loyal','sensitive'];
const TK_ADJ={proud:[1,-3,0],calm:[0,0,1],ambitious:[-1,2,1],loyal:[1,0,1],sensitive:[3,-4,-1]};
function tkTrait(w){let h=0;const s=String(w.id);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return TK_TRAITS[h%5]}
function tkEns(){if(!G.tk||G.tk.wk!==G.week)G.tk={wk:G.week,n:0};return G.tk}
function tkLeft(){return Math.max(0,TK_MAX-tkEns().n)}
function tkCool(w){return w.tkw!=null&&G.week-w.tkw<TK_CD}
function tkPartner(w){
 const pool=hlLive().filter(x=>x.id!==w.id&&!x.mentor&&!hlLive().some(y=>y.mentor===x.id));
 if(w.age>=33)return pool.filter(x=>x.age<=26&&!x.mentor).sort((a,b)=>b.pop-a.pop)[0]||null;
 if(w.age<=26)return hlLive().filter(x=>x.age>=33&&!hlLive().some(y=>y.mentor===x.id)).sort((a,b)=>b.pop-a.pop)[0]||null;
 return null}
function tkTopics(w){
 const T=[];
 if(w.pop>=15)T.push('praise');
 T.push('critic');
 if(w.morale<65)T.push('pep');
 if(w.injury>0)T.push('injury');
 T.push('push');
 if(w.contract>0&&w.contract<=40)T.push('contract');
 if(!w.mentor&&!hlLive().some(y=>y.mentor===w.id)&&tkPartner(w))T.push('mentor');
 T.push('checkin');
 return T}
function tkRel(w){const x=rlGet('w:'+w.id);if(x.st==='dating'||x.st==='partner')return 'partner';if(x.v>=30)return 'friend';if(x.v<=-30)return 'enemy';return 'none'}
function tkRelAdj(k,i,rel,dm){
 if(rel==='friend'){let a=0;if(k==='praise'||k==='pep'||k==='checkin')a=1;else if(k==='critic')a=1;else if(k==='push'&&i===1)a=2;else if(k==='push'&&i===2)a=1;return a}
 if(rel==='partner'){if(k==='praise'||k==='pep')return 2;if(k==='critic')return -2;if(k==='push'&&i===1)return -3;if(k==='checkin')return 1;return 0}
 if(rel==='enemy'){if(k==='praise'||k==='pep')return -dm*.5;if(k==='critic')return -2;if(k==='push'&&i===1)return -2;return 0}
 return 0}
function tkIssue(w){
 if(w.injury>0)return 'injury';if(w.fatigue>70)return 'tired';if(w.morale<45)return 'down';if(w.contract>0&&w.contract<=10)return 'contract';
 if(w.morale>=80)return 'great';return 'ok'}
const TK_BASE={praise:[5,2,3],critic:[-1,-3,-2],pep:[6,3,4],injury:[4,1,2],checkin:[2,0,1]};
const sg1=n=>(n>0?'+':'')+(Math.round(n*10)/10).toString().replace('.',',');
function tkHead(w){
 const tr=tkTrait(w),rel=tkRel(w);
 return '<div class="tkh"><span class="tka">'+avatar(w.look,64)+'</span><div class="tkb"><b>'+esc(w.name)+'</b><div class="mute" style="font-size:13px">'+esc(t('tk.tr.'+tr))+' · '+esc(t('st.morale'))+' '+Math.round(w.morale)+' · '+esc(t('st.loy'))+' '+Math.round(w.loyal||0)+'</div><div class="mute" style="font-size:12.5px">'+esc(t('tk.left',{n:tkLeft()}))+'</div>'+(rel!=='none'?'<div style="font-size:12.5px" class="tkrel '+rel+'">'+esc(t('tk.rel.'+rel))+'</div>':'')+'</div></div>'}
function tkOpen(id){
 const w=pcWr(id);if(!w)return;window.__tk={id};
 let h=tkHead(w)+'<h2>'+esc(t('tk.t'))+'</h2>';
 if(tkCool(w)||!tkLeft()){h+='<p class="mute">'+esc(t(tkCool(w)?'tk.cool':'tk.none'))+'</p><button class="btn" data-act="tkclose">'+esc(t('tk.close'))+'</button>';return openModal('<div class="pcm">'+h+'</div>')}
 tkTopics(w).forEach(k=>{h+='<button class="opt" data-act="tktopic" data-k="'+k+'"><b>'+esc(t('tk.k.'+k))+'</b><small>'+esc(t('tk.kd.'+k))+'</small></button>'});
 h+='<button class="btn" data-act="tkclose">'+esc(t('tk.close'))+'</button>';openModal('<div class="pcm">'+h+'</div>')}
function tkTopic(k){
 const w=pcWr(window.__tk&&window.__tk.id);if(!w)return closeModal();window.__tk.k=k;
 let h=tkHead(w)+'<h2>'+esc(t('tk.k.'+k))+'</h2>';
 if(k==='contract'){const c=Math.round(w.salary*10*(w.loyal>=70?.85:1));window.__tk.cost=c;
  [[.55,'26'],[1,'52'],[2.1,'104']].forEach((x,i)=>{const cc=Math.round(c*x[0]);h+='<button class="opt" data-act="tkapp" data-i="'+i+'"'+(G.fed.cash<cc?' disabled':'')+'><b>'+esc(t('tk.c.'+i,{n:x[1]}))+'</b><small>'+esc(money(cc))+'</small></button>'})}
 else if(k==='mentor'){const p=tkPartner(w);if(!p)return closeModal();window.__tk.pid=p.id;
  h+='<p class="mute">'+esc(t('tk.m.q',{p:p.name}))+'</p><button class="opt" data-act="tkapp" data-i="0"><b>'+esc(t('tk.m.0'))+'</b><small>'+esc(t('tk.m.0d'))+'</small></button><button class="opt" data-act="tkapp" data-i="1"><b>'+esc(t('tk.m.1'))+'</b></button>'}
 else for(let i=0;i<3;i++)h+='<button class="opt" data-act="tkapp" data-i="'+i+'"><b>'+esc(t('tk.a.'+k+'.'+i))+'</b><small>'+esc(t('tk.tone.'+i))+'</small></button>';
 h+='<button class="btn" data-act="tkopen" data-id="'+w.id+'">'+esc(t('tk.back'))+'</button>';openModal('<div class="pcm">'+h+'</div>')}
function tkApply(i){
 const S=window.__tk,w=pcWr(S&&S.id);if(!w)return closeModal();const k=S.k;
 let dm=0,pr=false,cost=0,line='',stat='',ctx={};const tr=tkTrait(w),chips=[];
 const pos=()=>{};
 if(k==='contract'){const m=[.55,1,2.1][i];cost=Math.round(S.cost*m);if(G.fed.cash<cost)return;G.fed.cash-=cost;w.contract=[26,52,104][i];
  dm=[1,3,5][i];if(i===2){w.salary=Math.round(w.salary*1.1);w.loyal=clamp((w.loyal||50)+4,0,100)}line=t('tk.rc.'+i)}
 else if(k==='mentor'){if(i===0){const p=W(S.pid);if(p){const y=w.age<=26?w:p,v=w.age<=26?p:w;y.mentor=v.id;ctx.p=p.name;try{wmsAdd(y,'mentor',{p:v.name});wmsAdd(v,'mentor',{p:y.name})}catch(e){}line=t('tk.rm',{p:p.name});dm=2;evMood(p,2)}}else{line=t('tk.rm1')}}
 else if(k==='push'){if(i===0){pcEns();if(!G.pcp.some(x=>x.id===w.id))G.pcp.push({id:w.id,name:w.name,dl:G.week+8});pr=true;dm=7}else if(i===1)dm=-4;else dm=1}
 else{
  dm=TK_BASE[k][i]+TK_ADJ[tr][i]+(rnd()<.5?1:-1)*(rnd()<.4?1:0);
  if(dm>0&&w.morale>85)dm*=.5;
  if(k==='critic'&&rnd()<[.15,.45,.3][i]){const s=pickR(['ring','psy','mic']);if(w[s]<95){w[s]+=1;stat=t('st.'+s)}}
  if(k==='injury'&&i===0&&rnd()<.35&&w.injury>1){w.injury--;stat=t('tk.inj')}
  if(k==='checkin')line=t('tk.i.'+tkIssue(w));
 }
 const rel=tkRel(w);let fav=0;
 if(k!=='contract'&&k!=='mentor'){const a=tkRelAdj(k,i,rel,dm);dm+=a}
 if(rel==='partner'&&((k==='push'&&i===0)||(k==='praise'&&dm>=4)||(k==='contract'&&i===2))){fav=.5;mine().forEach(o=>{if(o.id!==w.id)evMood(o,-fav)});tkEns().fav=(tkEns().fav||0)+1}
 if(rel!=='none'&&dm>=3&&rlGet('w:'+w.id).v!==0)relAdd('w:'+w.id,1,0);
 evMood(w,dm);if(dm>=4)w.loyal=clamp((w.loyal||50)+1,0,100);else if(dm<=-3)w.loyal=clamp((w.loyal||50)-1,0,100);
 w.tkw=G.week;tkEns().n++;
 const ok=dm>=0;
 const tone=['s','f','h'][i]||'s';
 let h=tkHead(w)+'<p class="pcr">'+esc(k==='contract'||k==='mentor'?line:t('tk.r.'+tone+(ok?'.p':'.n'),{w:w.name}))+'</p>';
 if(k!=='contract'&&k!=='mentor'&&line)h+='<p class="pcr">'+esc(line)+'</p>';
 if(k!=='mentor'||i===0)h+='<p class="mute" style="font-size:13px;margin:0">'+esc(t('tk.f.'+tr+(ok?'.p':'.n')))+'</p>';
 let c='';const cc=(x,cl)=>{c+='<span class="pcc '+cl+'">'+esc(x)+'</span>'};
 if(Math.abs(dm)>=.1)cc(t('pc.c.mood')+' '+sg1(dm),dm>0?'up':'dn');
 if(cost)cc(t('tk.cost')+' '+money(cost),'dn');
 if(pr)cc(t('pc.c.prom',{w:w.name}),'pr');
 if(fav)cc(t('tk.fav',{n:sg1(-fav)}),'dn');
 if(stat)cc(stat+' +1','up');
 h+='<div class="pcch">'+c+'</div>';
 h+='<p class="mute" style="font-size:12.5px;margin:0">'+esc(t('tk.left',{n:tkLeft()}))+'</p><button class="btn gold" data-act="tkclose">'+esc(t('tk.close'))+'</button>';
 openModal('<div class="pcm">'+h+'</div>');try{save()}catch(e){}}
// roster button
const _wC=wCard;wCard=function(w,extra){
 if(extra&&extra.indexOf('data-act="avedit"')>=0&&w.fed===G.fed.id&&!w.ext){extra=extra.replace('<div class="row"><button class="btn sm" data-act="avedit"','<div class="row"><button class="btn sm" data-act="tkopen" data-id="'+w.id+'">'+esc(t('tk.btn'))+'</button><button class="btn sm" data-act="avedit"')}
 return _wC.call(this,w,extra)};
// mentors: weekly growth, auto-break if someone leaves
const _tkEw=endWeek;endWeek=function(){
 const r=_tkEw.apply(this,arguments);
 try{hlLive().forEach(y=>{if(!y.mentor)return;const v=pcWr(y.mentor);if(!v){y.mentor=null;return}
  y.pop=clamp(y.pop+.12,1,100);evMood(y,.3);evMood(v,.2);if(rnd()<.04&&y.ring<95)y.ring++})}catch(e){}
 return r};
ACT.tkopen=e=>{tkOpen(e.dataset.id)};ACT.tkpick=()=>{if(window.__tk)tkOpen(window.__tk.id)};
ACT.tktopic=e=>{tkTopic(e.dataset.k)};ACT.tkapp=e=>{tkApply(+e.dataset.i)};
ACT.tkclose=()=>{closeModal();window.__tk=null;render()};
// event: wrestler asks for a talk
NX('tkask',['Prośba o rozmowę','A request for a talk'],['{w} prosi o rozmowę w cztery oczy. Widać, że coś go gryzie.','{w} asks for a one-on-one talk. Something is clearly bothering them.'],
 [['Porozmawiaj','Talk it through'],['Nie masz teraz czasu','No time right now']],[['{w} czuje się wysłuchany.','{w} feels heard.'],['{w} wychodzi rozgoryczony.','{w} leaves bitter.']],
 [v=>{const w=W(v.id);if(w)evMood(w,7)},v=>{const w=W(v.id);if(w)evMood(w,-5)}],pcv(w=>w.morale<50),()=>{try{return G.week>=12&&hlLive().some(w=>w.morale<50)&&rnd()<.35}catch(e){return false}});
Object.assign(D,{
 'tk.btn':['Rozmowa służbowa','Work talk'],'tk.t':['Rozmowa służbowa','Work talk'],'tk.rel.partner':['Wasz związek wpływa na odbiór rozmowy.','Your relationship colors how this lands.'],'tk.rel.friend':['Przyjaciel: przyjmie to łagodniej.','A friend: will take it more gently.'],'tk.rel.enemy':['Zła relacja: nie ufa Twoim słowom.','A bad relationship: doesn’t trust your words.'],'tk.fav':['Reszta składu, morale {n}','Rest of roster, morale {n}'],'tk.close':['Zakończ','Finish'],'tk.back':['Wróć do tematów','Back to topics'],'tk.more':['Kolejna rozmowa (zostało {n})','Another talk ({n} left)'],
 'tk.left':['Rozmów w tym tygodniu: {n}','Talks left this week: {n}'],'tk.cool':['Rozmawialiście niedawno. Daj mu kilka tygodni.','You talked recently. Give it a few weeks.'],'tk.none':['Nie masz już dziś czasu na kolejne rozmowy. Wróć w przyszłym tygodniu.','No time for more talks. Come back next week.'],
 'tk.cost':['Koszt','Cost'],'tk.inj':['Rehabilitacja: −1 tydzień','Rehab: −1 week'],
 'tk.tr.proud':['Charakter: dumny','Personality: proud'],'tk.tr.calm':['Charakter: spokojny','Personality: calm'],'tk.tr.ambitious':['Charakter: ambitny','Personality: ambitious'],'tk.tr.loyal':['Charakter: lojalny','Personality: loyal'],'tk.tr.sensitive':['Charakter: wrażliwy','Personality: sensitive'],
 'tk.tone.0':['Wspierająco','Supportive'],'tk.tone.1':['Stanowczo','Firm'],'tk.tone.2':['Szczerze','Honest'],
 'tk.k.praise':['Pochwal','Praise'],'tk.kd.praise':['Doceń dobrą pracę','Recognize good work'],'tk.k.critic':['Skrytykuj','Critique'],'tk.kd.critic':['Wskaż, co trzeba poprawić','Point out what needs work'],
 'tk.k.pep':['Podnieś na duchu','Pep talk'],'tk.kd.pep':['Morale poniżej normy','Morale is below par'],'tk.k.injury':['Wesprzyj w kontuzji','Support through injury'],'tk.kd.injury':['Pomoc w powrocie do formy','Help with the comeback'],
 'tk.k.push':['Rozmowa o roli','Talk about role'],'tk.kd.push':['Push, miejsce w karcie, plany','Push, card spot, plans'],'tk.k.contract':['Umowa','Contract'],'tk.kd.contract':['Przedłuż kontrakt teraz','Extend the deal now'],
 'tk.k.mentor':['Mentor','Mentor'],'tk.kd.mentor':['Połącz weterana z młodym zawodnikiem','Pair a veteran with a youngster'],'tk.k.checkin':['Jak się czujesz?','How are you doing?'],'tk.kd.checkin':['Sprawdź, co go trapi','Find out what’s bothering them'],
 'tk.a.praise.0':['„Świetna robota, jestem z Ciebie dumny.”','“Great work, I’m proud of you.”'],'tk.a.praise.1':['„Dobrze, ale stać Cię na więcej.”','“Good, but you’re capable of more.”'],'tk.a.praise.2':['„Ostatnie walki były mocne i to widać.”','“Your recent matches were strong and it shows.”'],
 'tk.a.critic.0':['„Pracujmy razem nad tym, co nie wyszło.”','“Let’s work together on what didn’t go well.”'],'tk.a.critic.1':['„Musisz się wziąć w garść.”','“You need to pull yourself together.”'],'tk.a.critic.2':['„Szczerze, ostatnio nie było dobrze.”','“Honestly, it hasn’t been good lately.”'],
 'tk.a.pep.0':['„Jesteś ważną częścią tej federacji.”','“You’re an important part of this company.”'],'tk.a.pep.1':['„Wstań i pokaż, na co Cię stać.”','“Get up and show what you can do.”'],'tk.a.pep.2':['„Wiem, że to trudny okres. Jak mogę pomóc?”','“I know it’s a rough patch. How can I help?”'],
 'tk.a.injury.0':['„Nie spiesz się, wrócisz silniejszy.”','“Take your time, you’ll come back stronger.”'],'tk.a.injury.1':['„Trzymaj się planu rehabilitacji.”','“Stick to the rehab plan.”'],'tk.a.injury.2':['„Potrzebujemy Cię, ale zdrowie jest najważniejsze.”','“We need you, but health comes first.”'],
 'tk.a.checkin.0':['„Opowiedz, jak się czujesz.”','“Tell me how you’re feeling.”'],'tk.a.checkin.1':['„Mów wprost, co Ci przeszkadza.”','“Tell me straight what bothers you.”'],'tk.a.checkin.2':['„Chcę wiedzieć, co się dzieje.”','“I want to know what’s going on.”'],
 'tk.a.push.0':['„Obiecuję: pas lub walka wieczoru w 8 tygodni.”','“I promise: a title or main event within 8 weeks.”'],'tk.a.push.1':['„Na razie nie widzę Cię na szczycie.”','“I don’t see you at the top yet.”'],'tk.a.push.2':['„Mam wobec Ciebie plany, ale nic nie obiecuję.”','“I have plans for you, but no promises.”'],
 'tk.c.0':['Krótka umowa na {n} tygodni','Short deal for {n} weeks'],'tk.c.1':['Standardowa umowa na {n} tygodni','Standard deal for {n} weeks'],'tk.c.2':['Długa umowa na {n} tygodni z podwyżką','Long deal for {n} weeks with a raise'],
 'tk.rc.0':['Podpisaliście krótki kontrakt. Zawodnik woli zachować elastyczność.','You signed a short contract. The wrestler prefers flexibility.'],'tk.rc.1':['Podpisaliście standardową umowę. Obie strony są zadowolone.','You signed a standard deal. Both sides are happy.'],'tk.rc.2':['Długa umowa z podwyżką. Zawodnik czuje się doceniony i wiąże z Wami przyszłość.','A long deal with a raise. The wrestler feels valued and ties their future to you.'],
 'tk.m.q':['Mentorem lub podopiecznym będzie {p}. Młody rośnie szybciej, a weteran czuje się potrzebny.','{p} will be the mentor or mentee. The youngster grows faster and the veteran feels needed.'],'tk.m.0':['Połącz ich','Pair them'],'tk.m.0d':['Co tydzień: lekka popularność i morale dla obu','Weekly: a little popularity and morale for both'],'tk.m.1':['Nie teraz','Not now'],
 'tk.rm':['Od teraz {p} pomaga w rozwoju. Obaj zawodnicy to doceniają.','From now on {p} helps with development. Both appreciate it.'],'tk.rm1':['Zostawiasz to na później.','You leave it for later.'],
 'tk.r.s.p':['{w} uśmiecha się i czuje wsparcie.','{w} smiles and feels supported.'],'tk.r.s.n':['{w} nie wierzy w Twoje słowa.','{w} doesn’t buy your words.'],
 'tk.r.f.p':['{w} kiwa głową i bierze to do siebie.','{w} nods and takes it on board.'],'tk.r.f.n':['{w} jest zraniony i milczy.','{w} is hurt and goes quiet.'],
 'tk.r.h.p':['{w} docenia uczciwość.','{w} appreciates the honesty.'],'tk.r.h.n':['{w} nie ukrywa rozczarowania.','{w} doesn’t hide the disappointment.'],
 'tk.f.proud.p':['Dumny zawodnik ceni sobie takie słowa.','A proud wrestler values such words.'],'tk.f.proud.n':['Dumny zawodnik nie znosi, gdy ktoś tak do niego mówi.','A proud wrestler can’t stand being talked to like that.'],
 'tk.f.calm.p':['Spokojny zawodnik przyjmuje to rzeczowo.','A calm wrestler takes it in stride.'],'tk.f.calm.n':['Spokojny zawodnik nie dał po sobie poznać, ale zapamięta.','A calm wrestler doesn’t show it, but will remember.'],
 'tk.f.ambitious.p':['Ambitny zawodnik chce więcej i widzi w tym szansę.','An ambitious wrestler wants more and sees a chance.'],'tk.f.ambitious.n':['Ambitny zawodnik szuka okazji gdzie indziej.','An ambitious wrestler looks for chances elsewhere.'],
 'tk.f.loyal.p':['Lojalny zawodnik czuje, że jest tu na swoim miejscu.','A loyal wrestler feels at home here.'],'tk.f.loyal.n':['Lojalny zawodnik wybacza, ale to boli.','A loyal wrestler forgives, but it hurts.'],
 'tk.f.sensitive.p':['Wrażliwy zawodnik jest wzruszony.','A sensitive wrestler is moved.'],'tk.f.sensitive.n':['Wrażliwy zawodnik bierze to bardzo do siebie.','A sensitive wrestler takes it very personally.'],
 'tk.i.injury':['Najbardziej martwi go kontuzja i niepewność powrotu.','The injury and uncertainty about a return worry them most.'],'tk.i.tired':['Czuje się wyczerpany. Daj mu odpocząć.','They feel exhausted. Let them rest.'],'tk.i.down':['Jest przygnębiony i potrzebuje wsparcia.','They are down and need support.'],
 'tk.i.contract':['Zbliża się koniec jego umowy i nie jest pewien przyszłości.','Their contract is ending and they’re unsure about the future.'],'tk.i.great':['Jest w świetnej formie i dobrze mu się tu pracuje.','They’re in great shape and enjoy working here.'],'tk.i.ok':['Wszystko w porządku, nie ma większych problemów.','All is well, no major problems.'],
 'tk.tut':['Rozmowy z zawodnikami','Talks with wrestlers']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('tkcss')){const s=document.createElement('style');s.id='tkcss';s.textContent='.tkh{display:flex;gap:10px;align-items:center}.tka{display:inline-flex;line-height:0}.tka svg{width:46px;height:auto}.tkb{min-width:0}';document.head.appendChild(s)}}catch(e){}}
(function(){_T('talks','Rozmowy z zawodnikami','Na liście zawodników każdy ma przycisk Rozmowa. Masz 3 rozmowy tygodniowo, a z jednym zawodnikiem możesz rozmawiać co 3 tygodnie. Tematy: pochwała, krytyka, podniesienie na duchu, wsparcie po kontuzji, rozmowa o roli (obietnica pusha), przedłużenie umowy, mentor i luźne pytanie o samopoczucie. Każdy zawodnik ma charakter: dumny, spokojny, ambitny, lojalny albo wrażliwy. Ten sam ton działa na różne osoby inaczej, np. wrażliwy cenisz wsparcie, a ambitny lubi stanowczość. Znajomość z zawodnikiem z ekranu Relacji wpływa na rozmowę: przyjaciel przyjmuje ją łagodniej, wróg gorzej, a faworyzowanie partnera obniża morale reszty składu. Mentor przyspiesza rozwój młodego zawodnika.','Each wrestler on the roster has a Talk button. You get 3 talks per week, and you can talk to the same wrestler every 3 weeks. Topics: praise, critique, pep talk, injury support, a talk about role (push promise), contract extension, mentor and a casual check-in. Every wrestler has a personality: proud, calm, ambitious, loyal or sensitive. The same tone lands differently, e.g. sensitive wrestlers value support while ambitious ones like firmness. Your relationship with a wrestler from the Relationships screen affects the talk: a friend takes it gently, an enemy badly, and favoring a partner lowers the rest of the roster’s morale. A mentor speeds up a youngster’s development.');
 if(!TUTS.some(x=>x[1]==='talks')){const i=TUTS.findIndex(x=>x[1]==='roster');TUTS.splice(i>=0?i+1:TUTS.length-1,0,['roster','talks'])}})();
normTexts();
