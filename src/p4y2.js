/* ===== Development: training plans, career phase, potential estimate, growth log (numbers set by eye) ===== */
const DV_ST=['ring','mic','cha','str','spd','tec','sta','psy'];
const DV_FOC=['auto','ring','mic','power','air'];
function dvPlan(w){if(!w.plan)w.plan={f:'auto',i:1};return w.plan}
function dvPhase(w){return w.age<=24?'rise':w.age<=31?'peak':w.age<=35?'late':'decl'}
function dvEst(w){const hp=hpOf(w),er=potErr(w);return{v:clamp(Math.round(hp+(w.hn||0)*er),20,99),e:Math.round(er)}}
const _dvOrig=develop;develop=function(w){
 const own=w.fed===G.fed.id&&!w.ext;const b=own?DV_ST.map(k=>w[k]):null;
 _dvOrig.apply(this,arguments);
 if(!own)return;
 try{const p=w.plan;
  if(p&&!w.injury&&!w.farewell){
   if(p.i===0)w.fatigue=Math.max(0,w.fatigue-2);
   else if(p.f!=='auto'||p.i===2){
    const am=w.age<=27?1:w.age<=32?.6:.2,pm=.7+hpOf(w)/150,ch=(p.i===2?.11:.06)*am*pm;
    if(rnd()<ch){const pool=p.f==='auto'?DV_ST:SPEC_ST[p.f];const k=pickR(pool);if(w[k]<Math.min(99,hpOf(w)+15))w[k]=clamp(w[k]+1,1,99)}
    if(p.i===2){w.fatigue=Math.min(100,w.fatigue+2);evMood(w,-.2);if(rnd()<.005)injure(w,2+Math.floor(rnd()*3),false)}}}
  const l=w.dvl||(w.dvl=[]);DV_ST.forEach((k,i)=>{const d=w[k]-b[i];if(d)l.unshift({wk:G.week,k,d})});if(l.length>8)l.length=8}catch(e){}};
function dvBar(v,col){return '<div class="dvb"><i style="width:'+clamp(v,0,100)+'%;background:'+col+'"></i></div>'}
function dvOpen(id){
 const w=pcWr(id);if(!w)return;window.__dv=id;const p=dvPlan(w),est=dvEst(w),cur=Math.round(avgSt(w)),ph=dvPhase(w);
 const gap=est.v-cur;
 let h='<div class="tkh"><span class="tka">'+avatar(w.look,64)+'</span><div class="tkb"><b>'+esc(w.name)+'</b><div class="mute" style="font-size:13px">'+esc(t('st.age',{n:w.age}))+' · '+esc(t('dv.ph.'+ph))+'</div></div></div><h2>'+esc(t('dv.t'))+'</h2>';
 h+='<div class="dvr"><div class="dvl">'+esc(t('dv.cur'))+' <b>'+cur+'</b></div>'+dvBar(cur,'var(--red)')+'<div class="dvl">'+esc(t('dv.pot'))+' <b>≈ '+est.v+'</b> <span class="mute">±'+est.e+'</span></div>'+dvBar(est.v,'var(--star)')+'</div>';
 h+='<p class="mute" style="margin:0;font-size:13px">'+esc(t(gap>=8?'dv.g.hi':gap>=3?'dv.g.mid':'dv.g.lo'))+'</p>';
 h+='<div class="px">'+esc(t('dv.focus'))+'</div><div class="dvch">';
 DV_FOC.forEach(f=>{h+='<button class="btn sm'+(p.f===f?' gold':'')+'" data-act="dvplan" data-f="'+f+'">'+esc(t('dv.f.'+f))+'</button>'});
 h+='</div><div class="px">'+esc(t('dv.int'))+'</div><div class="dvch">';
 [0,1,2].forEach(i=>{h+='<button class="btn sm'+(p.i===i?' gold':'')+'" data-act="dvplan" data-i="'+i+'">'+esc(t('dv.i.'+i))+'</button>'});
 h+='</div><p class="mute" style="margin:0;font-size:12.5px">'+esc(t('dv.id.'+p.i))+'</p>';
 const mt=w.mentor?W(w.mentor):hlLive().find(y=>y.mentor===w.id);
 if(mt)h+='<div class="pcc pr" style="align-self:flex-start">'+esc(t(w.mentor?'dv.mentor':'dv.mentee',{p:mt.name}))+'</div>';
 const l=(w.dvl||[]).slice(0,6);
 h+='<div class="px">'+esc(t('dv.log'))+'</div>'+(l.length?'<div class="pcch">'+l.map(x=>'<span class="pcc '+(x.d>0?'up':'dn')+'">'+esc(t('st.'+x.k))+' '+(x.d>0?'+':'')+x.d+' · '+esc(t('dv.wk',{n:x.wk}))+'</span>').join('')+'</div>':'<p class="mute" style="margin:0;font-size:13px">'+esc(t('dv.nolog'))+'</p>');
 h+='<button class="btn gold" data-act="dvclose">'+esc(t('tk.close'))+'</button>';
 openModal('<div class="pcm">'+h+'</div>')}
const _wC2=wCard;wCard=function(w,extra){
 let h=_wC2.call(this,w,extra);
 if(h.indexOf('data-act="tkopen"')>=0)h=h.replace(/(data-act="tkopen" data-id="[^"]*">[^<]*<\/button>)/,'$1<button class="btn sm" data-act="dvopen" data-id="'+w.id+'">'+esc(t('dv.btn'))+'</button>');
 return h};
ACT.dvopen=e=>{dvOpen(e.dataset.id)};
ACT.dvplan=e=>{const w=pcWr(window.__dv);if(!w)return;const p=dvPlan(w);if(e.dataset.f)p.f=e.dataset.f;if(e.dataset.i!=null&&e.dataset.i!=='')p.i=+e.dataset.i;dvOpen(w.id)};
ACT.dvclose=()=>{closeModal();window.__dv=null;try{save()}catch(e){}render()};
NX('dvbreak',['Przełom treningowy','A training breakthrough'],['{w} nagle łapie flow na treningach. Trener widzi szansę na skok formy.','{w} suddenly finds a groove in training. The coach sees a chance for a leap.'],
 [['Dołóż dodatkowy trening ({mm})','Add extra training ({mm})'],['Zostaw jak jest','Leave it as is']],[['{w} robi duży krok naprzód.','{w} makes a big step forward.'],['{w} rozwija się własnym tempem.','{w} develops at their own pace.']],
 [v=>{const w=W(v.id);if(w){const k=pickR(DV_ST);if(w[k]<97)w[k]+=2;w.fatigue=Math.min(100,w.fatigue+8)}xcash(-xc(.04))},v=>{const w=W(v.id);if(w){const k=pickR(DV_ST);if(w[k]<98)w[k]+=1}}],
 ()=>{const w=hp(x=>x.age<=25);return Object.assign({w:w?w.name:'?',id:w?w.id:''},{mm:money(xc(.04))})},()=>{try{return G.week>=15&&hlLive().some(w=>w.age<=25)&&rnd()<.3}catch(e){return false}},[1,0]);
Object.assign(D,{
 'dv.btn':['Rozwój','Development'],'dv.t':['Rozwój zawodnika','Wrestler development'],'dv.cur':['Obecny poziom','Current level'],'dv.pot':['Potencjał','Potential'],
 'dv.ph.rise':['faza wzrostu','rising phase'],'dv.ph.peak':['szczyt formy','peak years'],'dv.ph.late':['późna kariera','late career'],'dv.ph.decl':['schyłek kariery','career decline'],
 'dv.g.hi':['Dużo miejsca na rozwój. Dobry kandydat do planu treningowego i mentora.','Plenty of room to grow. A good candidate for a training plan and a mentor.'],'dv.g.mid':['Wciąż może urosnąć, ale nie bardzo.','Can still grow, but not by much.'],'dv.g.lo':['Jest blisko swojego sufitu.','Close to their ceiling.'],
 'dv.focus':['Nacisk treningowy','Training focus'],'dv.f.auto':['Brak','None'],'dv.f.ring':['Ring i technika','Ring and technique'],'dv.f.mic':['Mikrofon i charyzma','Mic and charisma'],'dv.f.power':['Siła i kondycja','Strength and stamina'],'dv.f.air':['Szybkość i akrobatyka','Speed and aerial'],
 'dv.int':['Intensywność','Intensity'],'dv.i.0':['Lekki','Light'],'dv.i.1':['Normalny','Normal'],'dv.i.2':['Intensywny','Intense'],
 'dv.id.0':['Lekki: szybciej regeneruje siły, bez dodatkowego rozwoju.','Light: recovers faster, no extra growth.'],'dv.id.1':['Normalny: standardowy rozwój, a przy wybranym nacisku nieco większa szansa na wzrost tej statystyki.','Normal: standard development, with a slightly better chance to grow the chosen focus.'],'dv.id.2':['Intensywny: największa szansa na wzrost, ale zmęczenie rośnie, morale spada, a rośnie ryzyko kontuzji.','Intense: the best chance to grow, but fatigue rises, morale dips and injury risk goes up.'],
 'dv.mentor':['Mentor: {p}','Mentor: {p}'],'dv.mentee':['Podopieczny: {p}','Mentee: {p}'],'dv.log':['Ostatnie zmiany','Recent changes'],'dv.nolog':['Brak zmian w ostatnim czasie.','No recent changes.'],'dv.wk':['tydz. {n}','wk {n}']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('dvcss')){const s=document.createElement('style');s.id='dvcss';s.textContent='.dvr{display:flex;flex-direction:column;gap:4px}.dvl{font-size:13.5px}.dvb{height:8px;border-radius:4px;background:var(--line);overflow:hidden}.dvb i{display:block;height:100%}.dvch{display:flex;gap:6px;flex-wrap:wrap}';document.head.appendChild(s)}}catch(e){}}
(function(){_T('develop','Rozwój zawodników','Przycisk Rozwój na liście składu pokazuje fazę kariery (wzrost, szczyt, późna kariera, schyłek), obecny poziom i szacowany potencjał z marginesem błędu. Margines maleje, gdy zawodnik dłużej pracuje u Ciebie, a skaut ma wysoki poziom. Możesz wybrać nacisk treningowy (ring, mikrofon, siła, akrobatyka) i intensywność. Lekki trening szybciej regeneruje, intensywny daje największą szansę na wzrost, ale męczy, obniża morale i zwiększa ryzyko kontuzji. Młodzi z wysokim potencjałem rosną najszybciej, a po 32. roku życia wzrost jest już rzadki. Poniżej widać ostatnie zmiany statystyk.','The Development button on the roster shows career phase (rising, peak, late, decline), current level and an estimated potential with a margin of error. The margin shrinks the longer a wrestler works for you and with a higher scout level. You can pick a training focus (ring, mic, power, aerial) and an intensity. Light recovers faster, intense gives the best growth chance but tires, lowers morale and raises injury risk. Young high-potential wrestlers grow fastest, and after 32 growth is rare. Recent stat changes are listed below.');
 if(!TUTS.some(x=>x[1]==='develop')){const i=TUTS.findIndex(x=>x[1]==='talks');TUTS.splice(i>=0?i+1:TUTS.length-1,0,['roster','develop'])}})();
normTexts();
