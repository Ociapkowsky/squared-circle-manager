// ---- Dashboard command center ----
function cmdItems(){
 const L=[],add=(p,i,k,v,view)=>L.push({p,i,t:t(k,v),view});
 try{
 const rd=G.card.filter(matchReady).length;
 if(rd<2)add(1,'📋','cmd.card',{n:rd},'show');
 const exp=mine().filter(w=>!w.farewell&&w.contract<=4);if(exp.length)add(2,'✍️','cmd.contract',{n:exp.length,w:exp.slice(0,2).map(w=>w.name).join(', ')},'roster');
 const low=mine().filter(w=>w.morale<35);if(low.length)add(3,'😠','cmd.morale',{n:low.length,w:low.slice(0,2).map(w=>w.name).join(', ')},'roster');
 const inj=mine().filter(w=>w.injury&&!(w.inj&&w.inj.k==='susp'));if(inj.length>=2)add(6,'🩹','cmd.inj',{n:inj.length},'roster');
 const pay=(G.angles||[]).filter(a=>a.pay&&aliveA(a));if(pay.length)add(2,'📖','cmd.angle',{a:W(pay[0].ids[0]).name,b:W(pay[0].ids[1]).name,w:pay[0].dl},'show');
 if((G.defer||[]).length)add(4,'⏳','cmd.defer',{n:G.defer.length},'inbox');
 const fin=G.feuds.filter(f=>f.heat>=70&&!f.fedId);if(fin.length)add(3,'🔥','cmd.feud',{n:fin.length},'feuds');
 const vac=G.titles.filter(tt=>!tt.holders.length);if(vac.length)add(3,'🏆','cmd.vacant',{t:titleName(vac[0])},'titles');
 const m=G.media;if(m&&m.p==='tv'&&m.exp-G.week<=8&&m.exp-G.week>=0)add(4,'📺','cmd.tv',{n:m.exp-G.week},'money');
 if(G.offers&&G.offers.length)add(5,'💼','cmd.job',{n:G.offers.length},'board');
 const cheap=FACS.map(k=>({k,c:facCost(k)})).filter(x=>x.c>0).sort((a,b)=>a.c-b.c)[0];if(cheap&&G.fed.cash>cheap.c*2.5)add(5,'🏗️','cmd.fac',{f:t('fac.'+cheap.k),m:money(cheap.c)},'infra');
 if(G.chal&&!G.chal.res&&G.chal.end-G.week<=20)add(4,'🎯','cmd.chal',{n:Math.max(0,G.chal.end-G.week)},'dash');
 if(G.cash<0||G.fed.cash<0)add(1,'💸','cmd.debt',{},'money');
 }catch(e){}
 return L.sort((a,b)=>a.p-b.p).slice(0,6)}
function cmdCard(){
 const L=cmdItems();
 return '<div class="card stack"><h3>🧭 '+t('cmd.t')+'</h3>'+(L.length?L.map(x=>'<div class="row spread" style="gap:8px"><span>'+x.i+' '+esc(x.t)+'</span><button class="btn sm" data-act="nav" data-v="'+x.view+'">'+t('cmd.go')+'</button></div>').join(''):'<div class="mute">✓ '+t('cmd.ok')+'</div>')+'</div>'}
Object.assign(D,{'cmd.t':['Do załatwienia','To do'],'cmd.go':['Idź','Go'],'cmd.ok':['Wszystko pod kontrolą.','Everything under control.'],
 'cmd.card':['Karta gali niepełna: gotowych walk {n} (potrzeba min. 2).','Show card incomplete: {n} matches ready (min. 2 needed).'],
 'cmd.contract':['Kończą się kontrakty ({n}): {w}','Contracts ending ({n}): {w}'],'cmd.morale':['Niski humor ({n}): {w}','Low morale ({n}): {w}'],'cmd.inj':['Kontuzje w składzie: {n}','Injuries in the roster: {n}'],
 'cmd.angle':['Wątek czeka na walkę: {a} vs {b} (do tyg. {w}).','A storyline awaits a match: {a} vs {b} (by wk {w}).'],'cmd.defer':['Odłożone decyzje: {n}','Postponed decisions: {n}'],
 'cmd.feud':['Feudy gotowe na finał: {n}','Feuds ready for the finale: {n}'],'cmd.vacant':['Pas bez mistrza: {t}','Vacant belt: {t}'],'cmd.tv':['Umowa TV wygasa za {n} tyg.','TV deal ends in {n} wks'],
 'cmd.job':['Oferty pracy: {n}','Job offers: {n}'],'cmd.fac':['Stać Cię na rozbudowę: {f} ({m})','You can afford an upgrade: {f} ({m})'],'cmd.chal':['Wyzwanie: zostało {n} tyg.','Challenge: {n} wks left'],'cmd.debt':['Ujemne saldo – sprawdź finanse.','Negative balance – check finances.']});
// ---- late-game money sinks ----
E('academy','Akademia talentów','Talent academy','Możesz sfinansować akademię młodych zawodników ({m}). Najmłodsi dostaną kopa rozwojowego.','You can fund a young-talent academy ({m}). The youngest will get a development kick.',[['Sfinansuj akademię ({m})','Fund the academy ({m})'],['Nie teraz','Not now']]);
E('megatour','Światowa trasa','World tour','Agencja proponuje wielką trasę po arenach świata za {m}. Wielki prestiż, ale i koszty.','An agency proposes a huge world tour of arenas for {m}. Big prestige, big costs.',[['Zaakceptuj trasę ({m})','Accept the tour ({m})'],['Odmów','Decline']]);
E('legacyfund','Fundusz dziedzictwa','Legacy fund','Możesz ufundować muzeum i galerię sław federacji za {m}. Fani to docenią.','You can fund a museum and hall of fame for the federation for {m}. Fans will appreciate it.',[['Ufunduj ({m})','Fund it ({m})'],['Zrezygnuj','Skip']]);
Object.assign(D,{'n.acad1':['Akademia talentów rusza – młodzi wyraźnie się rozwijają.','The talent academy opens – youngsters visibly develop.'],'n.acad2':['Akademia odłożona na później.','The academy is postponed.'],
 'n.mt1':['Światowa trasa wzmacnia markę federacji.','The world tour strengthens the federation brand.'],'n.mt2':['Trasa odrzucona.','The tour was declined.'],'n.lf1':['Muzeum federacji otwarte – fani wzruszeni.','The federation museum opens – fans are moved.'],'n.lf2':['Fundusz dziedzictwa odłożony.','The legacy fund is postponed.']});
const bigCash=pc=>G.fed.tier>=4&&G.fed.cash>=wkRev()*40?r10(G.fed.cash*pc):0;
Object.assign(WEV,{
 async academy(){const c=bigCash(.05);if(!c)return false;const v={m:money(c)};const i=await evx('academy',v,['1','2'],[false,false]);if(i===0){G.fed.cash-=c;mine().filter(w=>w.age<=26).sort((a,b)=>a.age-b.age).slice(0,5).forEach(w=>{w.ring=clamp(w.ring+2,1,99);w.mic=clamp(w.mic+1,1,99);evMood(w,5)});addNews('n.acad1')}else addNews('n.acad2');return true},
 async megatour(){const c=bigCash(.06);if(!c)return false;const v={m:money(c)};const i=await evx('megatour',v,['1','2'],[false,false]);if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.6,2,100);mine().filter(w=>w.pop>=40).forEach(w=>evPop(w,.5));addNews('n.mt1')}else addNews('n.mt2');return true},
 async legacyfund(){const c=bigCash(.04);if(!c)return false;const v={m:money(c)};const i=await evx('legacyfund',v,['1','2'],[false,false]);if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.4,2,100);G.titles.forEach(tt=>{tt.pdyn=clamp(prestOf(tt)+.05,1,5)});addNews('n.lf1')}else addNews('n.lf2');return true}
});
