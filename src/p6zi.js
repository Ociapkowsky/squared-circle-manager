;/* "one more turn" pack: forward plan card, permanent chronicle, debt escalation, choice events */
(function(){
 Object.assign(D,{
  'pl.t':['Najbliższe tygodnie','Coming up'],'pl.now':['teraz','now'],'pl.in':['za {n} tyg.','in {n} wk'],'pl.chr':['Kronika','Chronicle'],'pl.none':['Spokojnie. Nic ważnego na horyzoncie.','Quiet. Nothing big on the horizon.'],
  'pl.contract':['Kontrakt kończy się: {w}','Contract ends: {w}'],'pl.inj':['Wraca po kontuzji: {w}','Back from injury: {w}'],'pl.tv':['Umowa TV wygasa','TV deal expires'],'pl.chal':['Termin wyzwania','Challenge deadline'],
  'pl.angle':['Wątek do rozegrania: {a} vs {b}','Storyline due: {a} vs {b}'],'pl.rival':['Gala rywala: {n}','Rival show: {n}'],'pl.year':['Koniec roku i podsumowanie sezonu','Year end and season recap'],'pl.fare':['Pożegnanie: {w}','Farewell: {w}'],
  'ch.t':['Kronika federacji','Federation chronicle'],'ch.yr':['Rok {y}','Year {y}'],'ch.years':['Sezony','Seasons'],'ch.empty':['Kronika jest jeszcze pusta.','The chronicle is still empty.'],'ch.close':['Zamknij','Close'],
  'dbt.1':['Wierzyciele się niecierpliwią: zawodnicy słyszą plotki o problemach z wypłatami.','Creditors are getting restless: wrestlers hear rumors about missed pay.'],
  'dbt.2':['Długi rosną. Część zawodników szuka innych ofert.','Debts keep growing. Some wrestlers are looking at other offers.'],
  'dbt.3':['OSTATNIE OSTRZEŻENIE: jeszcze tydzień pod kreską i federacja upada.','FINAL WARNING: one more week in the red and the promotion folds.']});
 Object.keys(D).forEach(k=>{});
 const wk=n=>n<=0?t('pl.now'):t('pl.in',{n});
 function planItems(){const L=[],add=(d,i,k,v,view)=>{if(d>=0&&(d<=10||k==='pl.year'))L.push({d,i,t:t(k,v),view})};
  try{
   mine().forEach(w=>{if(w.farewell){add(w.farewell.left,'👋','pl.fare',{w:w.name},'roster');return}if(w.contract!=null)add(w.contract,'✍️','pl.contract',{w:w.name},'roster');if(w.injury>0&&w.pop>=50&&!(w.inj&&w.inj.k==='susp'))add(w.injury,'🩹','pl.inj',{w:w.name},'roster')});
   const m=G.media;if(m&&m.exp!=null)add(m.exp-G.week,'📺','pl.tv',{},'money');
   if(G.chal&&!G.chal.res)add(G.chal.end-G.week,'🎯','pl.chal',{},'dash');
   (G.angles||[]).filter(a=>a.pay&&aliveA(a)).forEach(a=>add(a.dl-G.week,'📖','pl.angle',{a:W(a.ids[0]).name,b:W(a.ids[1]).name},'show'));
   Object.values(G.cal||{}).filter(c=>c.big&&!c.done).forEach(c=>{const r=(G.rivals||[]).find(x=>x.id===c.fed);add(c.wk-G.week,'🏟️','pl.rival',{n:c.name||(r?r.name:'')},'world')});
   const ye=Math.ceil((G.week+1)/52)*52;add(ye-G.week,'📅','pl.year',{},'history');
  }catch(e){}
  return L.sort((a,b)=>a.d-b.d).slice(0,7)}
 function planCard(){const L=planItems();
  return '<div class="card stack" id="rx-plan" style="margin-bottom:12px"><div class="row spread"><h3>🗓️ '+esc(t('pl.t'))+'</h3><button class="btn sm" data-act="nav" data-v="chron">📜 '+esc(t('pl.chr'))+'</button></div>'+
   (L.length?L.map(x=>'<div class="row spread" style="gap:8px"><span>'+x.i+' '+esc(x.t)+'</span><span class="mute" style="font-size:13px;white-space:nowrap">'+esc(wk(x.d))+'</span></div>').join(''):'<p class="mute">'+esc(t('pl.none'))+'</p>')+'</div>'}
 const _vd2=vDash;vDash=function(){let h=_vd2.apply(this,arguments);try{const c=planCard();const j=h.indexOf('<div class="top">');if(j>=0){const e=h.indexOf('</div>',h.indexOf('</button>',j));const k=e>=0?e+6:-1;if(k>0)return h.slice(0,k)+c+h.slice(k)}return c+h}catch(e){}return h};
 /* stakes: debt escalates before the game-over */
 const _fs=finishShow;finishShow=function(){const r=_fs.apply(this,arguments);try{const d=G.debt|0;
   if(d>=2){xmood(-2);xpop(-.3)}
   if(d===2)addNews('dbt.1');else if(d===4)addNews('dbt.2');else if(d===5)addNews('dbt.3')}catch(e){}return r};
 /* choice events with a real cost */
 const star=()=>mine().filter(w=>!w.ext&&w.pop>=55&&w.morale<55&&!w.farewell)[0];
 [
 {k:'rxstar',t:['Gwiazda grozi odejściem','A star threatens to leave'],b:['{w} jest niezadowolony i rozgląda się za innymi ofertami. Chce poważnej rozmowy.','{w} is unhappy and looking at other offers. They want a serious talk.'],v:()=>{const s=star();return s?{w:s.name,id:s.id}:{w:'?',id:''}},gate:()=>!!star()&&rnd()<.5,o:[['Podwyżka i obietnica pasa','Raise and a title promise'],['Postaw na swoim','Stand firm']],n:[['{w} zostaje, humor wraca.','{w} stays, spirits are back.'],['{w} jest wściekły. Humor spada.','{w} is furious. Morale drops.']],fx:[v=>{const w=W(v.id);xcash(-xc(.12));if(w){evMood(w,14);w.contract=Math.max(w.contract,26);w.salary=Math.round(w.salary*1.08)}},v=>{const w=W(v.id);if(w)evMood(w,-12);xmood(-1)}]},
 {k:'rxdebt',t:['Wierzyciel naciska','A creditor is pushing'],b:['Wierzyciel żąda zapłaty. Możesz sprzedać prawa do archiwum gal albo negocjować raty.','A creditor demands payment. You can sell the show-archive rights or negotiate instalments.'],v:()=>({}),gate:()=>G.fed.cash<0&&rnd()<.6,o:[['Sprzedaj prawa do archiwum','Sell archive rights'],['Negocjuj raty','Negotiate instalments']],n:[['Gotówka wpada, ale archiwum przepada.','Cash comes in, but the archive is gone.'],['Raty ustalone, nerwy zostają.','Instalments agreed, nerves remain.']],fx:[()=>{xcash(xc(.5));xpop(-.5)},()=>{xmood(-3);xpop(-.3)}]},
 {k:'rxbid',t:['Rywal chce Twojego sponsora','A rival wants your sponsor'],b:['Konkurencyjna federacja próbuje przejąć Twojego sponsora. Podbij ofertę albo ryzykuj stratę prestiżu.','A rival promotion is trying to poach your sponsor. Raise the offer or risk losing prestige.'],v:()=>({}),gate:()=>G.week>40&&rnd()<.25,o:[['Podbij ofertę','Raise the offer'],['Odpuść','Let it go']],n:[['Sponsor zostaje. Prestiż rośnie.','The sponsor stays. Prestige grows.'],['Sponsor odchodzi do rywala.','The sponsor goes to the rival.']],fx:[()=>{xcash(-xc(.1));xpop(.4);xconf(1)},()=>{xpop(-.9);xconf(-1)}]},
 {k:'rxrematch',t:['Fani żądają rewanżu','Fans demand a rematch'],b:['Po ostatniej gali internet huczy: fani chcą rewanżu. Spełnienie prośby kosztuje czas na karcie.','After the last show the internet is buzzing: fans want a rematch. Granting it costs card space.'],v:()=>({}),gate:()=>G.hist&&G.hist.length>3&&rnd()<.3,o:[['Obiecaj rewanż','Promise a rematch'],['Zignoruj fanów','Ignore the fans']],n:[['Fani są zadowoleni.','Fans are happy.'],['Fani mruczą pod nosem.','Fans grumble.']],fx:[()=>{xpop(.6);xmood(2)},()=>{xpop(-.4)}]},
 {k:'rxcharity',t:['Gala charytatywna','Charity show'],b:['Lokalna fundacja prosi o galę charytatywną. To kosztuje, ale buduje wizerunek.','A local charity asks for a benefit show. It costs money but builds your image.'],v:()=>({}),gate:()=>G.week>20&&rnd()<.25,o:[['Zorganizuj galę','Run the show'],['Odmów grzecznie','Politely decline']],n:[['Wizerunek rośnie, zawodnicy są dumni.','Image grows, wrestlers are proud.'],['Nic się nie dzieje.','Nothing happens.']],fx:[()=>{xcash(-xc(.1));xpop(1);xconf(2);xmood(3)},()=>{}]}
 ].forEach(XE);
})();
if(typeof normTexts==="function")normTexts();
