// ---- Difficulty + challenges ----
let START_D='norm',START_CH='none';
const DIFF={easy:{cash:1.6,rev:1.1,pat:.8},norm:{cash:1,rev:1,pat:1},hard:{cash:.7,rev:.9,pat:1.25},legend:{cash:.5,rev:.8,pat:1.5}};
const CHALS=['none','tier3','cash','rank1','cup'];
const diffRev=()=>(DIFF[(G&&G.diff)||'norm']||DIFF.norm).rev;
{const _ng=newGame;newGame=function(id,c){_ng(id,c);const d=DIFF[START_D]||DIFF.norm;G.diff=START_D;G.fed.cash=Math.round(G.fed.cash*d.cash);try{boardEnsure();G.board.pat*=d.pat}catch(e){}
 G.chal=START_CH==='none'?null:{k:START_CH,st:G.week,end:G.week+({tier3:104,cash:156,rank1:156,cup:208}[START_CH]),res:0};ibx();
 if(G.chal)ibxPush('m',t('chal.t'),t('chal.'+G.chal.k)+' '+t('chal.dl',{w:G.chal.end}))}}
function chalMet(c){
 if(c.k==='tier3')return G.fed.tier>=3;
 if(c.k==='cash')return G.fed.cash>=1e7;
 if(c.k==='rank1')return fedRank()===1;
 if(c.k==='cup')return !!(G.cups&&G.cups.hist.some(h=>h.ownChamp));
 return false}
function chalWeekly(){
 const c=G.chal;if(!c||c.res)return;
 if(chalMet(c)){c.res=1;c.wk=G.week;G.ach.chal=G.week;addNews('n.chalok',{c:t('chal.'+c.k)});ibxPush('m',t('chal.ok'),t('chal.'+c.k))}
 else if(G.week>c.end){c.res=-1;addNews('n.chalfail',{c:t('chal.'+c.k)});ibxPush('m',t('chal.fail'),t('chal.'+c.k))}}
function chalHtml(){const c=G&&G.chal;if(!c)return '';
 return '<div class="card stack"><h3>🎯 '+t('chal.t')+'</h3><div class="row spread"><span>'+esc(t('chal.'+c.k))+'</span><span class="tag">'+(c.res===1?t('chal.ok'):c.res===-1?t('chal.fail'):t('chal.dl',{w:c.end}))+'</span></div></div>'}
Object.assign(D,{'start.diff':['Trudność','Difficulty'],'start.chal':['Wyzwanie','Challenge'],'diff.easy':['Łatwy','Easy'],'diff.norm':['Normalny','Normal'],'diff.hard':['Trudny (mniej kasy, ostrzejszy zarząd)','Hard (less cash, stricter board)'],'diff.legend':['Legenda (−50% kasy, −20% przychodów)','Legend (−50% cash, −20% revenue)'],
 'chal.none':['Bez wyzwania','No challenge'],'chal.tier3':['Dotrzyj do poziomu 3 w 2 lata','Reach tier 3 within 2 years'],'chal.cash':['Zgromadź 10 mln w 3 lata','Save $10M within 3 years'],'chal.rank1':['Zostań nr 1 rankingu w 3 lata','Become #1 in the ranking within 3 years'],'chal.cup':['Wygraj turniej kontynentalny w 4 lata','Win a continental cup within 4 years'],
 'chal.t':['Wyzwanie','Challenge'],'chal.dl':['do tyg. {w}','by wk {w}'],'chal.ok':['Wyzwanie zaliczone!','Challenge complete!'],'chal.fail':['Wyzwanie nieudane','Challenge failed'],
 'n.chalok':['Wyzwanie zaliczone: {c}','Challenge complete: {c}'],'n.chalfail':['Wyzwanie nieudane: {c}','Challenge failed: {c}'],'ach.chal':['Wyzwanie zaliczone','Challenge complete']});
// ---- extra events ----
E('pressprofile','Profil w prasie','Press profile','Lokalna gazeta chce zrobić duży profil Twojej federacji. Dziennikarz pyta o plany.','A local paper wants a big profile of your federation. The reporter asks about your plans.',[['Pochwal się ambicjami','Boast about your ambitions'],['Mów skromnie','Stay modest']]);
E('fanclub','Klub kibica','Fan club','Fani założyli oficjalny klub i proszą o wsparcie ({m}).','Fans started an official fan club and ask for support ({m}).',[['Wesprzyj klub','Support the club'],['Odmów grzecznie','Politely decline']]);
E('rainout','Dziura w kalendarzu','Calendar gap','Hala, którą zwykle wynajmujesz, oferuje tańszy termin, ale gorszą porę.','The venue you usually rent offers a cheaper slot, but a worse time.',[['Weź tańszy termin','Take the cheaper slot'],['Zostań przy standardzie','Stay with the standard']]);
E('lucky','Szczęśliwy traf','Lucky break','Nieoczekiwany sponsor lokalny pyta, czy może dorzucić pieniądze na następną galę.','An unexpected local sponsor asks if it can chip in for the next show.',[['Przyjmij ({m})','Accept ({m})'],['Odmów, by uniknąć zobowiązań','Decline to avoid obligations']]);
Object.assign(D,{'n.press1':['Artykuł o ambicjach federacji podbija zainteresowanie.','The article on the federation\'s ambitions boosts interest.'],'n.press2':['Skromny artykuł nie robi wrażenia, ale buduje zaufanie.','The modest article is low-key but builds trust.'],
 'n.fclub1':['Klub kibica rośnie i nosi Twoje barwy.','The fan club grows and wears your colours.'],'n.fclub2':['Klub kibica się obraził.','The fan club took offence.'],
 'n.rain1':['Tańszy termin – oszczędność, ale mniej widzów.','Cheaper slot – savings, but fewer fans.'],'n.rain2':['Zostajesz przy standardzie.','You stay with the standard.'],
 'n.lucky1':['Lokalny sponsor dorzuca pieniądze.','A local sponsor chips in.'],'n.lucky2':['Odmawiasz sponsorowi.','You turn the sponsor down.']});
Object.assign(WEV,{
 async pressprofile(){const v={};const i=await evx('pressprofile',v,['1','2'],[false,false]);if(i===0){if(rnd()<.6){G.fed.pop=clamp(G.fed.pop+.4,2,100);addNews('n.press1')}else{G.fed.pop=clamp(G.fed.pop-.2,2,100);addNews('n.press2')}}else{G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.press2')}return true},
 async fanclub(){const c=r10(wkRev()*.1),v={m:money(c)};const i=await evx('fanclub',v,['1','2'],[G.fed.cash<c,false]);if(i===0){G.fed.cash-=c;G.fed.pop=clamp(G.fed.pop+.3,2,100);addNews('n.fclub1')}else{G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.fclub2')}return true},
 async rainout(){const v={};const i=await evx('rainout',v,['1','2'],[false,false]);if(i===0){G.fed.cash+=r10(wkRev()*.25);G.fed.pop=clamp(G.fed.pop-.1,2,100);addNews('n.rain1')}else addNews('n.rain2');return true},
 async lucky(){const b=r10(wkRev()*.8),v={m:money(b)};const i=await evx('lucky',v,['1','2'],[false,false]);if(i===0){G.fed.cash+=b;addNews('n.lucky1')}else addNews('n.lucky2');return true}
});
