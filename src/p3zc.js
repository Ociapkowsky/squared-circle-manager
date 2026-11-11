/* ============ Facilities and job market ============ */
const FACS=['dojo','merch','studio','medic'];
const FAC_ICON={dojo:'🥋',merch:'🛍️',studio:'🎬',medic:'🩺'};
function infra(){if(!G.infra)G.infra={dojo:0,merch:0,studio:0,medic:0,disc:0};return G.infra}
const facLvl=k=>infra()[k]||0;
const infraDojo=()=>.03*facLvl('dojo'),merchMul=()=>1+.1*facLvl('merch'),studioMul=()=>1+.06*facLvl('studio'),medMul=()=>1-.12*facLvl('medic');
const facBase=()=>Math.max(wkRev(),SB[G.fed.tier-1]*.8);
const facCost=k=>{const L=facLvl(k);if(L>=3)return 0;return r10(facBase()*[8,18,36][L]*(1-infra().disc))};
const facUpkeep=()=>FACS.reduce((s,k)=>s+facLvl(k),0)*r10(facBase()*.012);
function infraWeekly(){const u=facUpkeep();if(u>0)G.fed.cash-=u}
function vInfra(){
 let h='<div class="top"><div><h2>'+t('nav.infra')+'</h2><div class="mute" style="max-width:70ch">'+t('fac.sub')+'</div></div></div>';
 h+='<div class="card"><div class="row spread"><span class="mute">'+t('fac.upk')+'</span><b>'+money(facUpkeep())+'</b></div>'+(infra().disc?'<div class="pos" style="font-size:13px">'+t('fac.disc',{p:Math.round(infra().disc*100)})+'</div>':'')+'</div>';
 h+='<div class="grid g2">'+FACS.map(k=>{const L=facLvl(k),c=facCost(k);return '<div class="card stack"><h3>'+FAC_ICON[k]+' '+t('fac.'+k)+' · '+t('fac.lvl',{n:L})+'</h3><div class="mute">'+t('fac.'+k+'.d')+'</div><div>'+bar(L/3*100,'')+'</div><div class="mute" style="font-size:13px">'+t('fac.eff',{e:t('fac.'+k+'.e',{n:L*({dojo:3,merch:10,studio:6,medic:12})[k]})})+'</div>'+(L>=3?'<div class="pos">'+t('fac.max')+'</div>':'<button class="btn sm" data-act="facup" data-k="'+k+'"'+(G.fed.cash<c?' disabled':'')+'>'+t('fac.up',{m:money(c)})+'</button>')+'</div>'}).join('')+'</div>';
 return h}
Object.assign(WEV,{
 async fireinsp(){if(G.fed.tier<2)return false;const c=r10(facBase()*.4),v={m:money(c)};const i=await evx('fireinsp',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.insp1')}else if(rnd()<.5){G.fed.cash-=c*2;G.fed.pop=clamp(G.fed.pop-.4,2,100);addNews('n.insp2',{m:money(c*2)})}else addNews('n.insp3');return true},
 async dojomaster(){const c=r10(facBase()*.5),v={m:money(c)};const y=mine().filter(w=>w.age<=29).sort(()=>rnd()-.5).slice(0,3);if(y.length<2)return false;
  const i=await evx('dojomaster',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;y.forEach(w=>{const k=pickR(['ring','tec','psy','str','spd','sta']);w[k]=clamp(w[k]+1+(facLvl('dojo')>=2?1:0),1,99)});addNews('n.dmaster',{w:y.map(w=>w.name).join(', ')})}return true},
 async merchhit(){const v={m:money(r10(facBase()*.8*merchMul()))};const w=pickR(mine());if(!w)return false;const x={w:w.name,m:v.m};
  const i=await evx('merchhit',x,['1','2'],[false,false]);if(i===0){G.fed.cash+=r10(facBase()*.8*merchMul());w.pop=clamp(w.pop+.6,1,100);addNews('n.merchhit',x)}return true},
 async facgrant(){if(infra().disc||FACS.every(k=>facLvl(k)>=3))return false;const v={};const i=await evx('facgrant',v,['1','2'],[false,false]);if(i===0){infra().disc=.4;addNews('n.facgrant')}else G.fed.pop=clamp(G.fed.pop+.1,2,100);return true},
 async roofleak(){const c=r10(facBase()*.3),v={m:money(c)};const i=await evx('roofleak',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.roof1')}else{G.ws.filter(w=>w.fed===G.fed.id).slice(0,2).forEach(w=>evMood(w,-2));G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.roof2')}return true}
});
E('fireinsp','Kontrola przeciwpożarowa','Fire inspection','Inspektorzy sprawdzają halę. Doposażenie kosztuje {m}.','Inspectors check the venue. Upgrades cost {m}.',[['Doposaż halę ({m})','Upgrade the venue ({m})'],['Zaryzykuj','Take the risk']]);
E('dojomaster','Gościnny trener','Guest trainer','Znany trener oferuje intensywny trening dla młodych zawodników za {m}.','A well-known trainer offers intensive training for young wrestlers for {m}.',[['Zatrudnij ({m})','Hire ({m})'],['Odmów','Decline']]);
E('merchhit','Hit merchowy','Merch hit','Koszulka z {w} sprzedaje się świetnie. Domawiasz partię ({m}).','The {w} t-shirt is selling great. You reorder ({m}).',[['Domów partię (+{m})','Reorder (+{m})'],['Nie teraz','Not now']]);
E('facgrant','Dotacja miejska','City subsidy','Miasto oferuje dotację: 40% zniżki na najbliższą rozbudowę obiektów.','The city offers a subsidy: 40% off your next facility upgrade.',[['Przyjmij','Accept'],['Odrzuć','Decline']]);
E('roofleak','Przeciekający dach','Leaking roof','W hali przecieka dach. Naprawa kosztuje {m}.','The venue roof is leaking. Repair costs {m}.',[['Napraw ({m})','Repair ({m})'],['Odłóż','Postpone']]);
/* ---------- job market ---------- */
function jobsEnsure(){if(!G.jobs)G.jobs=[];if(!G.offers)G.offers=[]}
function takeOver(tid){
 const r=G.rivals.find(x=>x.id===tid);if(!r)return false;jobsEnsure();
 const old=G.fed,oldRec={id:old.id,name:old.name,short:old.short,country:old.country,tier:old.tier,pop:old.pop,color:old.color,cash:old.cash};
 const spec=PACK.feds.find(f=>f.id===tid)||r;const nf=Object.assign({},spec,{pop:r.pop,tier:r.tier});nf.cash=Math.max(Math.min(spec.cash||0,Math.round(SB[nf.tier-1]*15)),Math.round(old.cash*.3));
 G.rivals=G.rivals.filter(x=>x.id!==tid);G.rivals.push(oldRec);
 G.ws.filter(w=>w.ext&&w.fed===old.id).forEach(w=>{});
 G.fed=nf;G.card=[];G.promos=[];G.feuds=[];G.reigns=[];G.hist=[];G.popHist=[nf.pop];G.streak=0;G.debt=0;G.summary=null;G.sponsor=null;G.stables=[];G.pairs={};G.media=null;G.arena=0;G.infra=null;G.ppv=null;G.board=null;G.tvr=null;G.relInit=0;G.staff=[];G.tours=[];G.price=100;G.fired=0;G.offers=[];
 G.titles=defaultTitles(nf.tier);G.prizes=defaultPrizes();
 fedSetup(false);G.fd=fdDefaults('betrayal');refreshMarkets(true);
 G.jobs.push({wk:G.week,from:oldRec.short||oldRec.name,to:nf.short||nf.name,tier:nf.tier});
 addNews('n.takeover',{f:nf.name});twAdd('job',{f:nf.name,o:oldRec.name},'wire',.3);
 save();return true}
async function jobWeekly(){
 jobsEnsure();G.offers=G.offers.filter(o=>o.exp>G.week&&G.rivals.some(r=>r.id===o.id));
 if(G.week<26||G.week%13!==5||G.offers.length>=2||(G.jobs.length&&G.week-G.jobs[G.jobs.length-1].wk<52))return;const b=boardEnsure();
 let c=[];if(b.conf>=68)c=G.rivals.filter(r=>r.tier>=G.fed.tier&&r.tier<=G.fed.tier+1&&r.pop>=G.fed.pop*.95&&!G.offers.some(o=>o.id===r.id)).sort((a,b)=>a.pop-b.pop).slice(0,4);
 else if(b.conf<35&&rnd()<.5)c=G.rivals.filter(r=>r.tier<=G.fed.tier&&r.tier>=1&&r.pop<G.fed.pop&&!G.offers.some(o=>o.id===r.id)).slice(0,5);
 if(!c.length||rnd()>.5)return;const r=pickR(c);G.offers.push({id:r.id,wk:G.week,exp:G.week+10});
 const v={f:r.name,t:t('tier.'+r.tier),p:Math.round(r.pop),c:cn(r.country)};
 const i=await askGeneric(t('job.t'),t('job.b',v),[{l:t('job.1',v)},{l:t('job.2')}]);if(i===0){if(takeOver(r.id)){G.screen='dash'}}}
function jobsHtml(){jobsEnsure();let h='';
 if(G.offers.length)h+='<div class="card stack"><h3>'+t('job.list')+'</h3>'+G.offers.map(o=>{const r=G.rivals.find(x=>x.id===o.id);return r?'<div class="row spread" style="gap:8px"><span><b>'+esc(r.name)+'</b> <span class="mute">('+esc(cn(r.country))+', '+t('tier.'+r.tier)+', '+Math.round(r.pop)+')</span></span><button class="btn sm" data-act="takejob" data-id="'+r.id+'">'+t('job.take')+'</button></div>':''}).join('')+'<div class="mute" style="font-size:13px">'+t('job.warn')+'</div></div>';
 if(G.jobs.length)h+='<div class="card stack"><h3>'+t('job.career')+'</h3>'+G.jobs.slice().reverse().map(j=>'<div class="row spread"><span class="mute">'+t('pv.wk',{n:j.wk})+'</span><span>'+esc(j.from)+' → <b>'+esc(j.to)+'</b></span></div>').join('')+'</div>';
 return h}
function firedModal(b){jobsEnsure();const low=G.rivals.filter(r=>r.tier<=Math.max(1,G.fed.tier-1)).sort(()=>rnd()-.5).slice(0,3);
 return '<h2>'+t('bd.fired.t')+'</h2><p class="mute">'+t('bd.fired.b',{o:b.owner})+'</p>'+(low.length?'<p class="mute">'+t('job.after')+'</p>'+low.map(r=>'<button class="opt" data-act="takejob" data-id="'+r.id+'"><b>'+esc(r.name)+'</b> <span class="mute">('+esc(cn(r.country))+', '+t('tier.'+r.tier)+')</span></button>').join(''):'')+'<button class="btn gold" data-act="gameover">'+t('go.again')+'</button>'}
Object.assign(D,{
 'nav.infra':['Obiekty','Facilities'],
 'fac.sub':['Rozbudowuj zaplecze federacji. Każdy poziom daje stałą korzyść, ale kosztuje w utrzymaniu co tydzień.','Expand your federation\'s facilities. Each level gives a permanent benefit but costs upkeep every week.'],'fac.upk':['Utrzymanie obiektów (tygodniowo)','Facility upkeep (weekly)'],'fac.disc':['Dotacja: −{p}% na najbliższą rozbudowę','Subsidy: −{p}% on the next upgrade'],'fac.lvl':['poz. {n}/3','lvl {n}/3'],'fac.max':['Maksymalny poziom','Max level'],'fac.up':['Rozbuduj ({m})','Upgrade ({m})'],'fac.eff':['Obecny efekt: {e}','Current effect: {e}'],
 'fac.dojo':['Ośrodek treningowy','Training dojo'],'fac.dojo.d':['Młodzi i trenowani zawodnicy szybciej się rozwijają.','Young and trained wrestlers develop faster.'],'fac.dojo.e':['+{n}% szansy na rozwój','+{n}% development chance'],
 'fac.merch':['Sklep z merchem','Merch store'],'fac.merch.d':['Większe przychody ze sprzedaży koszulek i gadżetów.','Higher income from t-shirts and merchandise.'],'fac.merch.e':['+{n}% przychodu z merchu','+{n}% merch revenue'],
 'fac.studio':['Studio telewizyjne','TV studio'],'fac.studio.d':['Lepsza produkcja: więcej widzów i sponsorów.','Better production: more viewers and sponsors.'],'fac.studio.e':['+{n}% widzów i sponsorów','+{n}% viewers and sponsors'],
 'fac.medic':['Centrum medyczne','Medical center'],'fac.medic.d':['Krótsze kontuzje zawodników.','Shorter injuries.'],'fac.medic.e':['−{n}% czasu kontuzji','−{n}% injury time'],
 'n.facup':['Rozbudowa: {f}, poziom {l}.','Upgrade: {f}, level {l}.'],'n.insp1':['Kontrola przeciwpożarowa zakończona bez uwag.','Fire inspection passed with no issues.'],'n.insp2':['Kontrola wykryła uchybienia: kara {m}.','The inspection found violations: fine {m}.'],'n.insp3':['Kontrola nie wykryła problemów.','The inspection found no problems.'],'n.dmaster':['Trener gościnny podszkolił: {w}.','The guest trainer coached: {w}.'],'n.merchhit':['Koszulka {w} jest hitem (+{m}).','The {w} shirt is a hit (+{m}).'],'n.facgrant':['Miasto przyznało dotację na rozbudowę.','The city granted an upgrade subsidy.'],'n.roof1':['Dach naprawiony.','The roof was repaired.'],'n.roof2':['Dach nadal przecieka, nastroje spadają.','The roof still leaks; morale drops.'],
 'job.t':['Oferta pracy','Job offer'],'job.b':['Federacja {f} ({c}, {t}, popularność {p}) proponuje Ci stanowisko. Przejmiesz jej skład, a Twoja obecna federacja przejdzie pod kontrolę komputera.','{f} ({c}, {t}, popularity {p}) offers you the job. You would take over their roster, and your current federation would be run by the computer.'],'job.1':['Przyjmij ofertę: {f}','Accept the offer: {f}'],'job.2':['Zostań (oferta wisi w zakładce Zarząd)','Stay (the offer stays in the Board tab)'],
 'job.list':['Oferty pracy','Job offers'],'job.take':['Przyjmij','Accept'],'job.warn':['Przejście zresetuje obiekty, zarząd, umowę TV, personel i pasy. Skład przejmujesz od nowej federacji, a Twoje rekordy i historia zostają.','A move resets facilities, board, TV deal, staff and titles. You take over the new federation\'s roster, while your records and history stay.'],'job.career':['Kariera menedżera','Manager career'],'job.after':['Możesz objąć mniejszą federację i zacząć od nowa:','You can take a smaller federation and start again:'],
 'n.takeover':['Nowa praca: przejmujesz {f}.','New job: you take over {f}.'],'tw.job':['{o} traci szefa! Nowy boss {f} już działa.','{o} loses its boss! The new head of {f} is already at work.']
});
TWGEN.job='gw';
