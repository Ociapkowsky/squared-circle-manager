/* ===== Media reputation with memory: credibility, journalist relations, remembered promises (numbers set by eye) ===== */
function mrEns(){if(!G.mr)G.mr={cred:50,j:{},mem:[],log:[]};return G.mr}
const mrRel=n=>mrEns().j[n]||0;
function mrLevel(){const c=mrEns().cred;return c>=70?'hi':c<=30?'lo':'mid'}
function mrJk(n){const r=mrRel(n);return r>=25?'fr':r<=-25?'ho':'ne'}
function mrTag(n){const k=mrJk(n);return k==='ne'?'':'<span class="pcc '+(k==='fr'?'up':'dn')+'" style="margin-left:4px">'+esc(t('mr.j.'+k))+'</span>'}
function mrBadAdj(q,tone){const m=mrEns();const f=tone==='bold'?1:tone==='honest'?.5:.2;return ((50-m.cred)/250+(-mrRel(q.j[0])/400))*f}
function mrNote(k,w){const m=mrEns();m.cred=clamp(m.cred+(k==='kept'?4:-6),0,100);m.mem.unshift({k,w:w.name,id:w.id,wk:G.week,asked:0});try{wmsAdd(w,k==='kept'?'pk':'pb')}catch(e){}if(m.mem.length>12)m.mem.length=12}
// memory questions
const _mrB=pcBuild;pcBuild=function(){
 const q=_mrB.apply(this,arguments);
 try{const m=mrEns();const bk=m.mem.find(x=>x.k==='broke'&&!x.asked&&G.week-x.wk<=52),kp=m.mem.find(x=>x.k==='kept'&&!x.asked&&G.week-x.wk<=26);
  const jr=()=>pickR(PC_JOUR);
  if(bk&&rnd()<.7){bk.asked=1;q.unshift({kind:'qbroke',v:{w:bk.w},ctx:'b',subj:bk.id,w:1,j:jr()})}
  else if(kp&&rnd()<.5){kp.asked=1;q.unshift({kind:'qkept',v:{w:kp.w},ctx:'g',subj:kp.id,w:1,j:jr()})}
  while(q.length>5)q.pop()}catch(e){}
 return q};
const _mrFx=pcFx;pcFx=function(q,tone){
 const f=_mrFx.apply(this,arguments);
 if(q.kind==='qbroke'){f.mood=tone==='honest'?4:tone==='bold'?-3:1;f.conf=tone==='honest'?1.5:-1;f.pop=tone==='honest'?.3:-.4;f.pr=null}
 if(q.kind==='qkept'){f.mood=2;f.pop=f.bad?-.2:.5;f.conf=f.bad?-.5:.8;f.pr=null}
 return f};
const _mrA=pcApply;pcApply=function(q,tone,f){
 _mrA.apply(this,arguments);
 try{const m=mrEns();let d=tone==='honest'?(f.bad?-.5:1.5):tone==='bold'?(f.bad?-1.5:.8):.3;
  const avgM=hlLive().length?avg(hlLive().map(w=>w.morale||60)):60,w=q.subj?pcWr(q.subj):null;
  if(tone==='bold'){
   if(q.kind==='money')d=-5;
   else if(q.kind==='rumor'&&w&&w.morale<55)d=-3;
   else if(q.kind==='locker'&&avgM<55)d=-3;
   else if(q.kind==='trustlow'&&boardEnsure().conf<40)d=-2;
   else if(q.kind==='injury'&&w&&w.injury>6)d=-2;
   else if(q.kind==='tix'||q.kind==='rival')d=f.bad?-1:.5}
  if(q.kind==='qbroke')d=tone==='honest'?3:tone==='bold'?-3:-.5;
  if(q.kind==='qkept')d=f.bad?-.3:2;
  const dj=tone==='honest'?(f.bad?-1:4):tone==='bold'?(f.bad?-6:3):(f.bad?-2:1);
  m.cred=clamp(m.cred+d,0,100);const jn=q.j[0];m.j[jn]=clamp((m.j[jn]||0)+dj,-100,100);
  m.log.unshift({wk:G.week,j:jn,k:q.kind,tn:tone,bad:f.bad?1:0,d:Math.round(d*10)/10});if(m.log.length>24)m.log.length=24;
  f.cd=Math.round(d*10)/10;f.dj=dj}catch(e){}};
// show credibility change in reaction chips
const _mrC=pcChips;pcChips=function(f,q){let h=_mrC.apply(this,arguments);if(f.cd&&Math.abs(f.cd)>=.1)h+='<span class="pcc '+(f.cd>0?'up':'dn')+'">'+esc(t('mr.cred'))+' '+(f.cd>0?'+':'')+String(f.cd).replace('.',',')+'</span>';return h};
// end of conference: reputation bonus; weekly drift and board effect
const _mrR=pcRun;pcRun=async function(){
 const had=G.pc&&G.pc.q&&G.pc.q.length;await _mrR.apply(this,arguments);
 try{if(had){const lv=mrLevel();if(lv==='hi'){xpop(.4);addNews('mr.n.hi')}else if(lv==='lo'){xpop(-.4);addNews('mr.n.lo')}}}catch(e){}};
const _mrE=endWeek;endWeek=function(){
 const r=_mrE.apply(this,arguments);
 try{if(G.mr&&G.fed.tier>=PC_MINTIER){const m=G.mr;m.cred=clamp(m.cred+(50-m.cred)*.01,0,100);xconf((m.cred-50)/1000);Object.keys(m.j).forEach(k=>{m.j[k]*=.995})}}catch(e){}
 return r};
// panel
function mrOpen(){
 const m=mrEns(),lv=mrLevel();
 let h='<h2>'+esc(t('mr.t'))+'</h2><div class="dvr"><div class="dvl">'+esc(t('mr.cred'))+' <b>'+Math.round(m.cred)+'</b> · '+esc(t('mr.lv.'+lv))+'</div>'+dvBar(m.cred,lv==='hi'?'var(--star)':lv==='lo'?'var(--red)':'var(--mute)')+'</div><p class="mute" style="margin:0;font-size:13px">'+esc(t('mr.eff.'+lv))+'</p>';
 h+='<div class="px">'+esc(t('mr.js'))+'</div><div class="pcch">'+PC_JOUR.map(j=>{const r=Math.round(mrRel(j[0]));return '<span class="pcc '+(r>=25?'up':r<=-25?'dn':'')+'">'+esc(j[0])+' · '+esc(j[1])+' · '+(r>0?'+':'')+r+'</span>'}).join('')+'</div>';
 const pr=(G.pcp||[]);if(pr.length)h+='<div class="px">'+esc(t('mr.pr'))+'</div><div class="pcch">'+pr.map(p=>'<span class="pcc pr">'+esc(p.name)+' · '+esc(t('mr.left',{n:Math.max(0,p.dl-G.week)}))+'</span>').join('')+'</div>';
 const mem=m.mem.slice(0,6);if(mem.length)h+='<div class="px">'+esc(t('mr.mem'))+'</div><div class="pcch">'+mem.map(x=>'<span class="pcc '+(x.k==='kept'?'up':'dn')+'">'+esc(t('mr.m.'+x.k,{w:x.w}))+' · '+esc(t('dv.wk',{n:x.wk}))+'</span>').join('')+'</div>';
 const lg=m.log.slice(0,6);h+='<div class="px">'+esc(t('mr.log'))+'</div>'+(lg.length?'<div class="pcch">'+lg.map(x=>'<span class="pcc '+(x.d>0?'up':x.d<0?'dn':'')+'">'+esc(t('pc.tone.'+x.tn).split(' · ')[0])+' · '+esc(x.j)+(x.d?' ('+(x.d>0?'+':'')+String(x.d).replace('.',',')+')':'')+'</span>').join('')+'</div>':'<p class="mute" style="margin:0;font-size:13px">'+esc(t('mr.nolog'))+'</p>');
 h+='<button class="btn gold" data-act="mrclose">'+esc(t('tk.close'))+'</button>';openModal('<div class="pcm">'+h+'</div>')}
ACT.mropen=()=>{mrOpen()};ACT.mrclose=()=>{closeModal()};
const _mrVB=vBoard;vBoard=function(){
 let h=_mrVB.apply(this,arguments);
 try{const m=mrEns(),lv=mrLevel();if(G.fed.tier>=PC_MINTIER)h+='<div class="card stack"><div class="row spread"><div><b>'+esc(t('mr.t'))+'</b><div class="mute" style="font-size:13px">'+esc(t('mr.cred'))+' '+Math.round(m.cred)+' · '+esc(t('mr.lv.'+lv))+'</div></div><button class="btn sm" data-act="mropen">'+esc(t('mr.open'))+'</button></div></div>'}catch(e){}
 return h};
Object.assign(D,{
 'mr.t':['Reputacja w mediach','Media reputation'],'mr.cred':['Wiarygodność','Credibility'],'mr.open':['Szczegóły','Details'],'mr.js':['Dziennikarze','Journalists'],'mr.pr':['Obietnice w toku','Open promises'],'mr.left':['zostało {n} tyg.','{n} wks left'],'mr.mem':['Co media pamiętają','What the media remember'],'mr.log':['Ostatnie odpowiedzi','Recent answers'],'mr.nolog':['Brak odpowiedzi.','No answers yet.'],
 'mr.lv.hi':['wysoka','high'],'mr.lv.mid':['przeciętna','average'],'mr.lv.lo':['niska','low'],
 'mr.eff.hi':['Media Ci ufają: ryzykowne odpowiedzi rzadziej wychodzą bokiem, po konferencji rośnie popularność, a zarząd zyskuje zaufanie.','The media trust you: risky answers backfire less, popularity rises after conferences and the board gains trust.'],
 'mr.eff.mid':['Media traktują Cię neutralnie. Dotrzymuj obietnic i mów szczerze, a wiarygodność urośnie.','The media treat you neutrally. Keep promises and be honest and credibility will grow.'],
 'mr.eff.lo':['Media Ci nie ufają: odpowiedzi częściej wychodzą bokiem, po konferencji spada popularność, a zarząd traci cierpliwość.','The media don’t trust you: answers backfire more often, popularity dips after conferences and the board loses patience.'],
 'mr.j.fr':['życzliwy','friendly'],'mr.j.ho':['wrogi','hostile'],'mr.m.kept':['Dotrzymano słowa: {w}','Promise kept: {w}'],'mr.m.broke':['Złamana obietnica: {w}','Promise broken: {w}'],
 'mr.n.hi':['Media chwalą Cię po konferencji. Popularność rośnie.','The media praise you after the conference. Popularity rises.'],'mr.n.lo':['Media krytykują Cię po konferencji. Popularność spada.','The media criticize you after the conference. Popularity dips.'],
 'pc.q.qbroke':['Rok temu obiecał Pan push dla {w}, a nic z tego nie wyszło. Dlaczego?','You promised {w} a push, and nothing came of it. Why?'],
 'pc.q.qkept':['Dotrzymał Pan słowa wobec {w}. Czy to Pana polityka?','You kept your word to {w}. Is that your policy?'],
 'pc.o.qbroke.bold':['„Plany się zmieniły i tak to wygląda.”','“Plans changed, that’s how it goes.”'],'pc.o.qbroke.honest':['„Zawiodłem. Naprawię to.”','“I let them down. I will fix it.”'],'pc.o.qbroke.dipl':['„Pracujemy nad tym.”','“We are working on it.”'],
 'pc.o.qkept.bold':['„Zawsze. Moje słowo jest coś warte.”','“Always. My word means something.”'],'pc.o.qkept.honest':['„Staram się, choć nie zawsze się udaje.”','“I try, though it doesn’t always work.”'],'pc.o.qkept.dipl':['„Zawodnicy to doceniają.”','“The wrestlers appreciate it.”']
});
(function(){_T('media','Reputacja w mediach','W ekranie Zarząd (od 4 poziomu) widać Twoją wiarygodność w mediach. Rośnie, gdy dotrzymujesz obietnic pusha i odpowiadasz szczerze, a spada, gdy je łamiesz albo mówisz nieprawdę (np. że finanse są świetne, gdy brakuje gotówki). Każdy z dziennikarzy pamięta, jak go traktowałeś: życzliwy zadaje łagodniejsze pytania, wrogi częściej Cię przyłapie. Media wracają też do starych obietnic: po złamanej pytają, dlaczego, po dotrzymanej chwalą. Wysoka wiarygodność daje po konferencji popularność i zaufanie zarządu, niska je odbiera.','On the Board screen (from tier 4) you can see your media credibility. It rises when you keep push promises and answer honestly, and falls when you break them or say something untrue (e.g. that finances are great when the cash is gone). Each journalist remembers how you treated them: a friendly one asks gentler questions, a hostile one catches you more often. The media also return to old promises: after a broken one they ask why, after a kept one they praise you. High credibility earns popularity and board trust after conferences, low credibility takes them away.');
 if(!TUTS.some(x=>x[1]==='media')){const i=TUTS.findIndex(x=>x[1]==='press');TUTS.splice(i>=0?i+1:TUTS.length-1,0,['board','media'])}})();
normTexts();
