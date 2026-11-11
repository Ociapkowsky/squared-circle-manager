// ---- v82: supervisory board (council) + job applications ----
const BMEM={fin:['Daniel Kessler','Irene Markovic','Paul Whitcombe','Sofia Lindqvist'],tv:['Marcus Bell','Yuki Sato','Carla Navarro','Tom Ashby'],pres:['Eleanor Grey','Henryk Zalewski','Amira Haddad','Victor Lang']};
function memEnsure(){const b=boardEnsure();if(!b.mem||b.mem.length!==3){b.mem=['fin','tv','pres'].map(r=>({r,n:pickR(BMEM[r]),t:55+Math.round(rnd()*15)}))}return b.mem}
const MEMICO={fin:'💰',tv:'📺',pres:'🏆'};
function memWeekly(){
 const b=boardEnsure(),m=memEnsure(),last=G.hist[G.hist.length-1];
 if(last&&last.week!==b.memHW){b.memHW=last.week;
  const profit=last.rev-last.cost,ph=G.popHist||[],pd=ph.length>8?ph[ph.length-1]-ph[ph.length-9]:0;
  m.forEach(x=>{let d=0;
   if(x.r==='fin')d=profit>0?.35:-.45;
   else if(x.r==='tv')d=last.rating>=3.5?.45:last.rating<2.5?-.45:0;
   else d=pd>.3?.35:pd<-.3?-.4:0;
   x.t=clamp(x.t+d+(55-x.t)*.004,0,100)})}
 if(b.mqs!==b.qs){const first=b.mqs===undefined;b.mqs=b.qs;if(!first){
  const lo=m.filter(x=>x.t<35).length,hi=m.filter(x=>x.t>=72).length;
  if(lo>=2){b.conf=clamp(b.conf-6,0,100);addNews('n.cn1');b.motions=(b.motions||0)+1}
  else if(hi===3){b.conf=clamp(b.conf+3,0,100);G.fed.cash+=r10(wkRev()*1.5);addNews('n.cn2')}}}}
const _bw=boardWeekly;
boardWeekly=async function(){const r=await _bw();if(r)return r;memWeekly();await applyWeekly();return false};
/* ---- applying for jobs ---- */
function careerRep(){const b=boardEnsure();return G.fed.pop*.55+G.fed.tier*9+b.conf*.2+((G.hof||[]).length)*2+Math.min(10,(b.sold||0)*.25)}
function jobTarget(r){return r.pop*.55+r.tier*9}
function applyChance(r,bonus){return clamp(.25+(careerRep()-jobTarget(r))/50+(bonus||0),.05,.9)}
function appsEnsure(){if(!G.apps)G.apps=[];if(!G.appCool)G.appCool={};jobsEnsure()}
function canApply(id){appsEnsure();return !G.apps.length&&!(G.appCool[id]>G.week)&&!G.offers.some(o=>o.id===id)&&G.rivals.some(r=>r.id===id)}
function applyTo(id){appsEnsure();if(!canApply(id))return false;const r=G.rivals.find(x=>x.id===id);G.apps.push({id,wk:G.week,due:G.week+3});addNews('n.ap1',{f:r.name});return true}
async function applyWeekly(){
 appsEnsure();const due=G.apps.filter(a=>a.due<=G.week);if(!due.length)return;
 for(const a of due){G.apps=G.apps.filter(x=>x!==a);const r=G.rivals.find(x=>x.id===a.id);if(!r)continue;
  const v={f:r.name,c:Math.round(applyChance(r)*100)};
  const i=await askGeneric(t('ap.t',v),t('ap.b',v),[{l:t('ap.1')},{l:t('ap.2')},{l:t('ap.3')}]);
  const bonus=i===0?.12:i===1?.06:-.06,var0=i===0?.18:i===1?.1:.02;
  const ok=rnd()<applyChance(r,bonus);
  if(rnd()<(i===0?.3:.15)){const b=boardEnsure();b.conf=clamp(b.conf-3,0,100);memEnsure().forEach(x=>x.t=clamp(x.t-3,0,100));addNews('n.ap4',{o:b.owner})}
  if(ok){G.offers.push({id:r.id,wk:G.week,exp:G.week+10});addNews('n.ap2',{f:r.name});
   const j=await askGeneric(t('ap.yes',v),t('ap.yesb',v),[{l:t('job.1',v)},{l:t('job.2')}]);if(j===0&&takeOver(r.id)){G.screen='dash'}}
  else{G.appCool[r.id]=G.week+12;addNews('n.ap3',{f:r.name})}}}
function applyHtml(){appsEnsure();
 let h='<div class="card stack"><h3>'+t('ap.h')+'</h3><div class="mute">'+t('ap.sub',{n:Math.round(careerRep())})+'</div>';
 if(G.apps.length){const a=G.apps[0],r=G.rivals.find(x=>x.id===a.id);h+='<div class="row spread"><span>'+t('ap.pend',{f:r?esc(r.name):a.id})+'</span><span class="mute">'+t('ap.left',{n:Math.max(0,a.due-G.week)})+'</span></div>'}
 const list=G.rivals.filter(r=>r.tier>=1).sort((a,b)=>b.tier-a.tier||b.pop-a.pop).slice(0,12);
 h+=list.map(r=>{const can=canApply(r.id),cd=G.appCool[r.id]>G.week,c=Math.round(applyChance(r)*100);
  return '<div class="row spread" style="gap:8px"><span><b>'+esc(r.name)+'</b> <span class="mute">('+esc(cn(r.country))+', '+t('tier.'+r.tier)+', '+Math.round(r.pop)+')</span></span>'+(can?'<button class="btn sm" data-act="applyjob" data-id="'+r.id+'">'+t('ap.btn',{c})+'</button>':'<span class="mute">'+(cd?t('ap.cool',{n:G.appCool[r.id]-G.week}):'—')+'</span>')+'</div>'}).join('')+'</div>';return h}
function councilHtml(){const m=memEnsure(),b=boardEnsure();
 return '<div class="card stack"><h3>'+t('cn.h')+'</h3><div class="mute">'+t('cn.sub',{o:b.owner})+'</div>'+m.map(x=>'<div><div class="lbl"><span>'+MEMICO[x.r]+' '+esc(x.n)+' <span class="mute">· '+t('cn.'+x.r)+'</span></span><b>'+Math.round(x.t)+'</b></div>'+bar(x.t,x.t<35?'':'t')+'</div>').join('')+'</div>'}
const _jh=jobsHtml;jobsHtml=function(){return councilHtml()+_jh()+applyHtml()};
Object.assign(D,{
 'cn.h':['Rada nadzorcza','Supervisory board'],'cn.sub':['Przewodniczący: {o}. Trzech członków rady ocenia Cię z różnych stron – gdy dwóch straci do Ciebie zaufanie, rada ruszy z wnioskiem o odwołanie.','Chair: {o}. Three board members judge you from different angles – if two lose faith in you, the board moves to remove you.'],
 'cn.fin':['finanse','finance'],'cn.tv':['telewizja i oceny','TV and ratings'],'cn.pres':['prestiż i popularność','prestige and popularity'],
 'n.cn1':['Rada złożyła wniosek o Twoje odwołanie – zaufanie szefa spada.','The board filed a motion to remove you – the chairman\'s confidence drops.'],'n.cn2':['Rada jednogłośnie chwali Twoje rządy – premia dla federacji.','The board unanimously praises your work – a bonus for the federation.'],
 'ap.h':['Aplikuj do innej federacji','Apply to another federation'],'ap.sub':['Twoja renoma: {n}. Szansę zwiększają popularność, tier, zaufanie rady i Hall of Fame; im wyżej mierzysz, tym trudniej.','Your reputation: {n}. Popularity, tier, board confidence and Hall of Fame help; the higher you aim, the harder it gets.'],
 'ap.btn':['Aplikuj (~{c}%)','Apply (~{c}%)'],'ap.pend':['Aplikacja: {f}','Application: {f}'],'ap.left':['rozmowa za {n} tyg.','interview in {n} wks'],'ap.cool':['odmowa, za {n} tyg.','rejected, {n} wks'],
 'ap.t':['Rozmowa kwalifikacyjna: {f}','Job interview: {f}'],'ap.b':['Rada federacji {f} zaprasza Cię na rozmowę o stanowisko bookera. Jak chcesz się zaprezentować? Obecna szansa: ok. {c}%.','The {f} board invites you for a booker interview. How do you pitch yourself? Current chance: about {c}%.'],
 'ap.1':['Obiecaj wzrost i wielkie plany (+szansa, ryzyko przecieku)','Promise growth and big plans (+chance, leak risk)'],'ap.2':['Pokaż wyniki i liczby','Show results and numbers'],'ap.3':['Zachowaj skromność','Stay modest'],
 'ap.yes':['{f} chce Cię zatrudnić!','{f} wants to hire you!'],'ap.yesb':['Rada {f} oferuje Ci stanowisko bookera. Przejmiesz skład, a Twoja obecna federacja przejdzie pod kontrolę komputera.','The {f} board offers you the booker job. You take over its roster, and your current federation goes to the computer.'],
 'n.ap1':['Złożono aplikację do {f}.','You applied to {f}.'],'n.ap2':['{f} złożyła Ci ofertę pracy.','{f} made you a job offer.'],'n.ap3':['{f} wybrała kogoś innego.','{f} chose someone else.'],'n.ap4':['Wyciekła wieść o Twoich rozmowach – {o} jest zły.','News of your interviews leaked – {o} is furious.']});
/* ---- board member events ---- */
const memOf=r=>memEnsure().find(x=>x.r===r);
E('mem.fin','Jastrząb finansowy','Finance hawk','{n} z rady domaga się cięcia kosztów: zamrożenia pensji i mniejszej liczby gal specjalnych.','{n} from the board demands cost cuts: a salary freeze and fewer special shows.',[['Zgódź się (morale −, zaufanie +)','Agree (morale −, trust +)'],['Odmów','Refuse']]);
E('mem.tv','Nacisk telewizyjny','TV pressure','{n} z rady chce, by w main evencie wystąpiła największa gwiazda – tego żąda sieć.','{n} from the board wants your biggest star in the main event – the network demands it.',[['Spełnij żądanie','Comply'],['Postaw na swoje','Stand your ground']]);
E('mem.pres','Plan prestiżowy','Prestige project','{n} proponuje projekt wizerunkowy (kampania, pokaz, ceremonia) za {m}.','{n} proposes an image project (campaign, showcase, ceremony) for {m}.',[['Sfinansuj ({m})','Fund it ({m})'],['Odrzuć','Reject']]);
E('mem.fight','Spór w radzie','Board feud','{a} i {b} z rady kłócą się o kierunek federacji i proszą Cię o poparcie.','{a} and {b} on the board are clashing over the federation\'s direction and ask for your support.',[['Poprzyj {a}','Back {a}'],['Poprzyj {b}','Back {b}'],['Zostań neutralny','Stay neutral']]);
Object.assign(D,{'n.mf1':['Cięcia kosztów wchodzą w życie – szatnia kręci nosem.','Cost cuts take effect – the locker room grumbles.'],'n.mf2':['Odrzucasz cięcia – rada patrzy sceptycznie.','You reject the cuts – the board is skeptical.'],
 'n.mt1':['Gwiazda w main evencie – sieć jest zadowolona.','Star in the main event – the network is pleased.'],'n.mt2':['Nie ulegasz sieci – rada wzdycha.','You resist the network – the board sighs.'],
 'n.mp1':['Projekt wizerunkowy wypalił – popularność rośnie.','The image project paid off – popularity rises.'],'n.mp2':['Projekt prestiżowy odrzucony.','The prestige project is rejected.'],
 'n.mb1':['Poparłeś jedną ze stron – druga to zapamięta.','You backed one side – the other will remember.'],'n.mb2':['Zachowujesz neutralność – nikt nie jest zachwycony.','You stay neutral – nobody is thrilled.']});
Object.assign(WEV,{
 async memfin(){if(G.week<20)return false;const x=memOf('fin'),b=boardEnsure(),i=await evx('mem.fin',{n:x.n},['1','2'],[false,false]);if(i===0){x.t=clamp(x.t+10,0,100);b.conf=clamp(b.conf+2,0,100);mine().forEach(w=>evMood(w,-2));addNews('n.mf1')}else{x.t=clamp(x.t-8,0,100);addNews('n.mf2')}return true},
 async memtv(){if(G.week<20)return false;const x=memOf('tv'),i=await evx('mem.tv',{n:x.n},['1','2'],[false,false]);if(i===0){x.t=clamp(x.t+10,0,100);const s=mine().sort((a,b)=>b.pop-a.pop)[0];if(s)s.pop=clamp(s.pop+.4,1,100);addNews('n.mt1')}else{x.t=clamp(x.t-8,0,100);memOf('pres').t=clamp(memOf('pres').t+3,0,100);addNews('n.mt2')}return true},
 async mempres(){if(G.week<20)return false;const x=memOf('pres'),c=r10(Math.max(wkRev()*.6,G.fed.cash*.01));if(G.fed.cash<c*2)return false;const i=await evx('mem.pres',{n:x.n,m:money(c)},['1','2'],[false,false]);if(i===0){G.fed.cash-=c;x.t=clamp(x.t+10,0,100);G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.mp1')}else{x.t=clamp(x.t-6,0,100);addNews('n.mp2')}return true},
 async memfight(){if(G.week<20)return false;const m=memEnsure(),k=shuffle(m.slice()),A=k[0],B=k[1],i=await evx('mem.fight',{a:A.n,b:B.n},['1','2','3'],[false,false,false]);if(i===0){A.t=clamp(A.t+12,0,100);B.t=clamp(B.t-8,0,100);addNews('n.mb1')}else if(i===1){B.t=clamp(B.t+12,0,100);A.t=clamp(A.t-8,0,100);addNews('n.mb1')}else{A.t=clamp(A.t-3,0,100);B.t=clamp(B.t-3,0,100);addNews('n.mb2')}return true}
});
