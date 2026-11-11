// ---- v131: Empire - endless late-game investment programs (high upkeep, small returns) ----
const EMUI={msg:''};
const EMP=[
 {k:'acad',ic:'🎓',K:2.0,cap:0},
 {k:'brand',ic:'🏷️',K:3.0,cap:.05},
 {k:'found',ic:'🤝',K:2.5,cap:.12},
 {k:'studio',ic:'🎬',K:4.0,cap:.18},
 {k:'hall',ic:'🏛️',K:3.0,cap:3}
];
const emOn=()=>!!(G&&G.fed&&G.fed.tier>=4);
function emEnsure(){if(!G.emp)G.emp={l:{acad:0,brand:0,found:0,studio:0,hall:0},pros:[],disc:0,spent:0,inc:0};return G.emp}
const emL=k=>emEnsure().l[k]||0;
const emSat=l=>1-Math.exp(-l/10);
const emCost=k=>{const p=EMP.find(x=>x.k===k),l=emL(k);return Math.round(facBase()*p.K*Math.pow(1.38,l)*(1-emEnsure().disc)/1000)*1000};
const emUp=()=>Math.round(facBase()*.006*EMP.reduce((s,p)=>s+emL(p.k),0));
const emLP=()=>EMP.reduce((s,p)=>s+emL(p.k),0);
const emBrand=()=>EMP[1].cap*emSat(emL('brand')),emFound=()=>EMP[2].cap*emSat(emL('found')),emStudio=()=>EMP[3].cap*emSat(emL('studio')),emHall=()=>EMP[4].cap*emSat(emL('hall'));
const emRate=()=>.12*emSat(emL('acad'));
function emInvest(k){if(!emOn())return 'no';const c=emCost(k);if(G.fed.cash<c)return 'cash';G.fed.cash-=c;const e=emEnsure();e.l[k]=(e.l[k]||0)+1;e.disc=0;e.spent+=c;addNews('n.eminv',{p:t('em.'+k),l:e.l[k]});return 'ok'}
function emProspect(){const lv=emL('acad');const cc=pickR(COUNTRIES.concat(RTNEWC));const w=rtMkW(cc,true);w.fed='EM';w.rev=1;w.pot=clamp((w.pot||55)+Math.round(lv*.6),40,98);w.age=18+Math.floor(rnd()*5);emEnsure().pros.push({id:w.id,wk:G.week});addNews('n.empros',{w:w.name,c:cn(cc)});return w}
const _iwEm=infraWeekly;infraWeekly=function(){_iwEm();try{if(!emOn()||!G.emp)return;const e=emEnsure(),lp=emLP();if(!lp)return;
 const up=emUp();G.fed.cash-=up;const rv=(G.summary&&G.summary.rev)||0,inc=Math.round(rv*emBrand());G.fed.cash+=inc;e.inc=inc-up;
 if(emFound()>0)G.fed.pop=clamp(G.fed.pop+emFound()*.1,2,100);
 if(emHall()>0){xconf(emHall()*.08);G.dy&&G.dy.f.forEach(f=>{f.pres=clamp(f.pres+emHall()*.05,0,100)})}
 if(rnd()<emRate())emProspect();
 e.pros=e.pros.filter(p=>{const w=W(p.id);if(!w||w.fed!=='EM')return false;if(G.week-p.wk>26){const i=G.ws.indexOf(w);if(i>=0)G.ws.splice(i,1);return false}return true})
}catch(er){}};
const _bsEm=baseStars;baseStars=function(m,pos,total){let r=_bsEm(m,pos,total);try{if(emOn()&&G.emp)r+=emStudio()}catch(e){}return r};
function vEmp(){const e=emEnsure();let h='<div class="top"><div><h2>'+t('nav.emp')+'</h2><div class="mute" style="max-width:66ch">'+t('em.sub')+'</div></div></div>';
 if(EMUI.msg){h+='<div class="note">'+esc(EMUI.msg)+'</div>';EMUI.msg=''}
 if(!emOn())return h+'<div class="card"><div class="mute">'+t('em.lock')+'</div></div>';
 const net=e.inc||0;
 h+='<div class="card row spread" style="gap:12px;flex-wrap:wrap"><span>'+t('em.lp')+' <b>'+emLP()+'</b></span><span>'+t('em.upk')+' <b>'+money(emUp())+'</b></span><span>'+t('em.net')+' <b class="'+(net>=0?'pos':'neg')+'">'+(net>=0?'+':'−')+money(Math.abs(net))+'</b></span><span>'+t('em.spent')+' <b>'+money(e.spent)+'</b></span>'+(e.disc?'<span class="pos">'+t('em.disc',{p:Math.round(e.disc*100)})+'</span>':'')+'</div>';
 const eff={acad:()=>t('em.acad.e',{p:(emRate()*100).toFixed(1)}),brand:()=>t('em.brand.e',{p:(emBrand()*100).toFixed(1)}),found:()=>t('em.found.e',{p:(emFound()*10).toFixed(2)}),studio:()=>t('em.studio.e',{s:emStudio().toFixed(2)}),hall:()=>t('em.hall.e',{c:(emHall()*.08).toFixed(2)})};
 h+='<div class="grid g2">'+EMP.map(p=>{const l=emL(p.k),c=emCost(p.k);return '<div class="card stack"><h3>'+p.ic+' '+t('em.'+p.k)+' · '+t('fac.lvl',{n:l})+'</h3><div class="mute">'+t('em.'+p.k+'.d')+'</div><div style="font-size:13px">'+eff[p.k]()+'</div><div class="row spread" style="gap:8px;flex-wrap:wrap"><span class="mute" style="font-size:13px">'+t('em.next')+' '+money(c)+'</span><button class="btn sm" data-act="eminv" data-k="'+p.k+'"'+(G.fed.cash>=c?'':' disabled')+'>'+t('em.inv')+'</button></div></div>'}).join('')+'</div>';
 const pl=e.pros.map(p=>({p,w:W(p.id)})).filter(x=>x.w&&x.w.fed==='EM');
 h+='<div class="card stack"><h3>🎓 '+t('em.pros')+'</h3><div class="mute" style="font-size:13px">'+t('em.prosd')+'</div>'+(pl.length?pl.map(({p,w})=>'<div class="row" style="gap:10px;flex-wrap:nowrap;align-items:center;padding:6px 0;border-top:1px solid var(--line)"><div class="av" style="padding:4px;flex:none">'+avatar(w.look,52)+'</div><div style="min-width:0;flex:1"><b>'+esc(w.name)+'</b><div class="mute" style="font-size:13px">'+esc(cn(w.country))+' · '+t('style.'+w.style)+' · '+w.age+' · ★'+Math.round(w.pop)+' · '+t('rt.pot')+' '+'★'.repeat(dyStars(w.pot||50))+'</div><div class="mute" style="font-size:12px">'+t('dy.left',{n:Math.max(0,26-(G.week-p.wk))})+'</div></div><button class="btn sm" data-act="sign" data-id="'+w.id+'">'+t('rt.sign')+'</button></div>').join(''):'<div class="mute">'+t('em.nopros')+'</div>')+'</div>';
 return h}
// events
const emG=f=>()=>{try{return emOn()&&f(emEnsure())}catch(e){return false}};
const XEM=[
{k:'emgrant',t:['Dotacja na rozwój','A development grant'],b:['Miasto oferuje dofinansowanie następnej inwestycji z programu Imperium.','The city offers co-funding for your next Empire investment.'],v:()=>({}),gate:emG(e=>emLP()>=1&&!e.disc),o:[['Przyjmij (−30% na następną)','Accept (−30% on the next one)'],['Odrzuć','Decline']],n:[['Następna inwestycja będzie tańsza.','The next investment will be cheaper.'],['Pozostajesz niezależny.','You stay independent.']],fx:[()=>{emEnsure().disc=.3},()=>{}]},
{k:'emaudit',t:['Kontrola finansowa','A financial audit'],b:['Audytorzy badają wydatki na programy. Doradca kosztuje {mm}.','Auditors review the programme spending. An adviser costs {mm}.'],v:()=>({c:xc(.05),mm:money(xc(.05))}),gate:emG(e=>emLP()>=3),o:[['Wynajmij doradcę ({mm})','Hire an adviser ({mm})'],['Radź sobie sam','Handle it yourself']],cost:[1,0],n:[['Audyt przechodzi bez uwag.','The audit passes without remarks.'],['Zarząd traci część zaufania.','The board loses some trust.']],fx:[v=>{xcash(-v.c)},()=>{xconf(-4)}]},
{k:'emgem',t:['Perła z akademii','A gem from the academy'],b:['Trenerzy akademii wskazują wyjątkowy talent. Chcesz go przyjąć na pokaz?','Academy coaches point to an exceptional talent. Do you want to bring him to a showcase?'],v:()=>({}),gate:emG(e=>emL('acad')>=2),o:[['Zaproś na pokaz','Invite him to a showcase'],['Odmów','Decline']],n:[['Talent trafia na listę zawodników akademii.','The talent lands on the academy list.'],['Szansa przepada.','The chance is gone.']],fx:[()=>{const w=emProspect();w.pot=Math.max(w.pot||0,80+Math.floor(rnd()*15))},()=>{}]},
{k:'emgala',t:['Gala dobroczynna','A charity gala'],b:['Fundacja proponuje galę dobroczynną. Koszt organizacji to {mm}.','The foundation proposes a charity gala. It costs {mm} to organize.'],v:()=>({c:xc(.06),mm:money(xc(.06))}),gate:emG(e=>emL('found')>=1),o:[['Zorganizuj ({mm})','Organize it ({mm})'],['Nie teraz','Not now']],cost:[1,0],n:[['Fani i zarząd to doceniają.','Fans and the board appreciate it.'],['Pomysł zostaje na później.','The idea is put off.']],fx:[v=>{xcash(-v.c);xpop(.6);xconf(4)},()=>{}]},
{k:'emtour',t:['Tłumy w muzeum','Crowds at the museum'],b:['Muzeum odwiedza rekordowa liczba turystów. Wpływy z biletów wynoszą {mm}.','The museum draws record tourist numbers. Ticket income is {mm}.'],v:()=>({c:xc(.02),mm:money(xc(.02))}),gate:emG(e=>emL('hall')>=1),o:[['Świetnie','Great']],n:[['Kasa wpada do skarbca.','The cash lands in the treasury.']],fx:[v=>{xcash(v.c)}]},
{k:'emname',t:['Nazwa na licencji','Naming rights'],b:['Sponsor chce dodać swoje logo do waszej marki. Oferuje {mm}.','A sponsor wants its logo on your brand. It offers {mm}.'],v:()=>({c:xc(.12),mm:money(xc(.12))}),gate:emG(e=>emL('brand')>=2),o:[['Zgódź się','Accept'],['Odmów','Decline']],n:[['Gotówka jest, ale marka traci trochę prestiżu.','The cash is in, but the brand loses some prestige.'],['Marka pozostaje czysta.','The brand stays clean.']],fx:[v=>{xcash(v.c);xpop(-.3)},()=>{xconf(1)}]}
];
XEM.forEach(XE);
Object.assign(D,{'nav.emp':['Imperium','Empire'],'em.sub':['Programy rozwoju bez limitu poziomów. Każdy kolejny poziom jest dużo droższy, kosztuje w utrzymaniu i daje coraz mniejszy zwrot. To miejsce na nadmiar gotówki i budowę dziedzictwa.','Endless development programmes. Each level costs far more, adds upkeep and returns less and less. It is a place for spare cash and legacy building.'],
 'em.lock':['Imperium odblokowuje się na 4. poziomie hali.','The Empire unlocks at venue tier 4.'],'em.lp':['Punkty dziedzictwa','Legacy points'],'em.upk':['Utrzymanie tyg.','Upkeep/wk'],'em.net':['Bilans tyg.','Weekly net'],'em.spent':['Wydano łącznie','Total spent'],'em.disc':['dotacja −{p}%','grant −{p}%'],'em.next':['Następny poziom:','Next level:'],'em.inv':['Inwestuj','Invest'],
 'em.acad':['Akademia talentów','Talent academy'],'em.acad.d':['Szkoła wrestlingu dla młodych. Co jakiś czas wyłania kandydatów, których możesz zatrudnić.','A wrestling school for the young. It now and then produces candidates you can hire.'],'em.acad.e':['Szansa na kandydata: {p}% tygodniowo','Chance of a prospect: {p}% per week'],
 'em.brand':['Marka i licencje','Brand and licensing'],'em.brand.d':['Gry, zabawki i licencje. Daje niewielki dodatek do przychodu.','Games, toys and licences. Gives a small boost to revenue.'],'em.brand.e':['Dodatek do przychodu: {p}%','Revenue boost: {p}%'],
 'em.found':['Fundacja społeczna','Community foundation'],'em.found.d':['Działania charytatywne budują dobre imię federacji.','Charity work builds the promotion\'s good name.'],'em.found.e':['Popularność: +{p} tygodniowo','Popularity: +{p} per week'],
 'em.studio':['Studio produkcji','Production studio'],'em.studio.d':['Lepsza realizacja podnosi odbiór każdej gali.','Better production lifts the reception of every show.'],'em.studio.e':['Bonus do oceny gal: +{s}','Show rating bonus: +{s}'],
 'em.hall':['Muzeum i Galeria Sław','Museum and Hall of Fame'],'em.hall.d':['Wystawy i upamiętnienie legend. Buduje zaufanie zarządu i prestiż rodów.','Exhibits and legends\' tributes. Builds board trust and clan prestige.'],'em.hall.e':['Zaufanie zarządu: +{c} tygodniowo','Board trust: +{c} per week'],
 'em.pros':['Kandydaci z akademii','Academy prospects'],'em.prosd':['Młodzi zawodnicy z Twojej akademii. Kandydat bez kontraktu odchodzi po pół roku.','Young wrestlers from your academy. A prospect without a contract leaves after half a year.'],'em.nopros':['Na razie brak kandydatów. Rozbuduj akademię.','No prospects yet. Expand the academy.'],
 'em.m.ok':['Zainwestowano.','Invested.'],'em.m.cash':['Brak gotówki.','Not enough cash.'],'n.eminv':['Imperium: {p} rośnie do poziomu {l}.','Empire: {p} rises to level {l}.'],'n.empros':['Akademia wyłania kandydata: {w} ({c}).','The academy produces a prospect: {w} ({c}).']});
