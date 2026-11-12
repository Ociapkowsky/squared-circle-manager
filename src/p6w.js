;/* ===== Rival counter-programming and "day of the booker" backstage decisions ===== */
(function(){
Object.assign(D,{
'cp.t':['Kontr-program rywala','Rival counter-programming'],
'cp.b1':['{r} ogłasza wielką galę w ten sam wieczór co Twoja. Część fanów może wybrać ich.','{r} announces a big show on the same night as yours. Some fans may pick them.'],
'cp.b2':['{r} wypuszcza darmową transmisję tuż przed Twoją galą i próbuje przejąć widownię.','{r} drops a free stream right before your show to steal your audience.'],
'cp.b3':['{r} ściąga znaną postać na swoją galę dokładnie w Twoim terminie.','{r} brings in a known name for their show right on your date.'],
'cp.o1':['Kampania promocyjna (płacisz)','Promo campaign (you pay)'],'cp.o2':['Wystaw swoje największe gwiazdy','Push your biggest stars'],'cp.o3':['Zignoruj','Ignore it'],
'n.cprog':['Kontr-program {r}: frekwencja może ucierpieć.','{r} counter-programs: attendance may suffer.'],
'dy.o':['Dzień gali','Show day'],
'dy1.t':['Dziennikarz tuż przed galą','A reporter right before the show'],'dy1.b':['Dziennikarz Ring Wire prosi o komentarz tuż przed rozpoczęciem gali.','A Ring Wire reporter asks for a comment just before the show starts.'],
'dy2.t':['Kłótnia w szatni','A locker-room argument'],'dy2.b':['{a} i {b} wdali się w kłótnię za kulisami tuż przed galą.','{a} and {b} got into an argument backstage right before the show.'],
'dy3.t':['Spóźniony zawodnik','A late wrestler'],'dy3.b':['{a} spóźnia się na galę i nikt nie wie, kiedy dotrze.','{a} is late for the show and nobody knows when he will arrive.'],
'dy4.t':['Sponsor na widowni','A sponsor in the crowd'],'dy4.b':['Przedstawiciel sponsora siedzi w pierwszym rzędzie i chce poczuć klimat gali.','A sponsor representative sits ringside and wants to feel the show.'],
'dy5.t':['Fani czekają przed halą','Fans waiting outside'],'dy5.b':['Kilkudziesięciu fanów czeka przed halą i prosi o chwilę rozmowy.','A few dozen fans wait outside the arena and ask for a quick chat.'],
'dy6.t':['Luźna lina','A loose rope'],'dy6.b':['Ekipa technika zauważa, że lina w ringu jest luźna na kilka minut przed gongiem.','The crew spots a loose rope in the ring minutes before the bell.'],
'dy.res':['Efekt: {t}','Result: {t}']});
const DAY=[
 {k:'dy1',o:[['Szczere wyznanie','An honest confession',[[.6,{fed:.4,st:.05},'Fani doceniają szczerość.','Fans appreciate the honesty.'],[.4,{fed:-.3},'Cytat wyrwany z kontekstu.','The quote was taken out of context.']]],['Zbywaj ogólnikami','Dodge with generalities',[[1,{},'Spokojnie, nic się nie stało.','All calm, nothing happened.']]],['Rozbudź sensację','Stoke the sensation',[[.5,{fed:.6,st:.1},'Hype wokół gali rośnie.','Hype around the show grows.'],[.5,{fed:-.5,mor:-2},'Wyszło nieszczerze.','It came out hollow.']]]]},
 {k:'dy2',o:[['Rozdziel ich','Separate them',[[1,{mor:-1},'Spokój wraca, atmosfera trochę napięta.','Peace returns, the mood a bit tense.']]],['Wykorzystaj w ringu','Use it in the ring',[[.6,{st:.15},'Walka dostaje prawdziwy ogień.','The match gets real fire.'],[.4,{st:-.1,mor:-3},'Emocje poniosły ich za daleko.','Emotions carried them too far.']]],['Kara pieniężna','A fine',[[1,{cash:-300,mor:-1},'Kara zadziałała.','The fine did its job.']]]]},
 {k:'dy3',o:[['Zamień na rezerwowego','Swap in a replacement',[[1,{st:-.1},'Rezerwowy robi, co może.','The substitute does what he can.']]],['Poczekaj','Wait for him',[[.7,{},'Dotarł w ostatniej chwili.','He made it just in time.'],[.3,{st:-.15},'Gala ruszyła z opóźnieniem.','The show started late.']]],['Ukarz po gali','Punish after the show',[[1,{mw:-4},'Zawodnik czuje, że przegiąłeś.','The wrestler feels you overdid it.']]]]},
 {k:'dy4',o:[['Zrób dla niego show','Put on a show for him',[[.6,{st:.1,cashk:.8},'Sponsor zachwycony i dopłaca.','The sponsor is thrilled and pays more.'],[.4,{st:-.05},'Nacisk Ci zaszkodził.','The pressure backfired.']]],['Spotkaj się po gali','Meet after the show',[[1,{cashk:.3},'Miła rozmowa, drobna premia.','A pleasant talk, a small bonus.']]],['Nie masz czasu','No time',[[1,{fed:-.1},'Sponsor czuje się zlekceważony.','The sponsor feels snubbed.']]]]},
 {k:'dy5',o:[['Wyjdź do fanów','Go out to the fans',[[1,{fed:.3,mor:1},'Fani są w siódmym niebie.','The fans are over the moon.']]],['Poślij zawodników','Send the wrestlers',[[1,{mor:2,fed:.1},'Zawodnicy cieszą się kontaktem z fanami.','The wrestlers enjoy meeting fans.']]],['Odmów','Decline',[[1,{},'Brak echa.','No echo.']]]]},
 {k:'dy6',o:[['Napraw teraz (płacisz)','Fix it now (you pay)',[[1,{cash:-200},'Ring bezpieczny.','The ring is safe.']]],['Zaryzykuj','Take the risk',[[.6,{},'Nic się nie stało.','Nothing happened.'],[.4,{st:-.2,inj:1},'Lina pękła w trakcie gali.','The rope snapped during the show.']]]]}];
const _run=ACT.run;ACT.run=function(){if(RUN)return;const r=G.card.filter(matchReady);if(r.length<2||G.dayWk===G.week||rnd()>.35)return _run.apply(this,arguments);G.dayWk=G.week;
 const self=this,args=arguments;const ev=pickR(DAY);const ids=r.map(m=>sides(m).A.concat(sides(m).B)).flat().filter((x,i,a)=>a.indexOf(x)===i).map(W).filter(Boolean);const a=pickR(ids),b=pickR(ids.filter(x=>x!==a))||a;
 const vars={a:a.name,b:b.name};
 askGeneric(esc(t(ev.k+'.t')),t(ev.k+'.b',vars),ev.o.map(o=>({l:esc(lang==='pl'?o[0]:o[1])}))).then(i=>{const o=ev.o[i]||ev.o[0];let rr=rnd(),br=o[2][o[2].length-1];for(const x of o[2]){rr-=x[0];if(rr<=0){br=x;break}}const fx=br[1];
  G.dayFx={st:fx.st||0};if(fx.fed)G.fed.pop=clamp(G.fed.pop+fx.fed,2,100);if(fx.mor)ids.forEach(w=>{if(w.fed===G.fed.id)evMood(w,fx.mor)});if(fx.mw)evMood(a,fx.mw);
  const cash=fx.cash||(fx.cashk?Math.round(fx.cashk*(800+G.fed.pop*60)):0);if(cash)G.fed.cash+=cash;
  if(fx.inj){const w=pickR(ids.filter(x=>!x.injury&&x.fed===G.fed.id));if(w)injure(w,1+Math.floor(rnd()*3))}
  addNews('n.mom',{t:(lang==='pl'?br[2]:br[3]).replace(/\{a\}/g,a.name)});try{render()}catch(e){}_run.apply(self,args)})};
const _bs9=baseStars;baseStars=function(m,pos,total){let s=_bs9.apply(this,arguments);try{if(G.dayFx)s+=G.dayFx.st||0}catch(e){}return clamp(s,.5,5)};
const _fs5=finishShow;finishShow=function(){const r=_fs5.apply(this,arguments);G.dayFx=null;return r};
/* counter-programming */
const _dm2=demandAt;demandAt=function(){let d=_dm2.apply(this,arguments);try{const c=G.cprog;if(c&&c.wk===G.week){const mit=c.mit==='star'?((typeof cardSP==='function'?cardSP():0)>=50?.6:.1):c.mit;d-=.07*(1-mit)}}catch(e){}return d};
async function counter(){const rv=pickR(G.rivals.filter(r=>r.pop>=12));if(!rv)return;const n=1+Math.floor(rnd()*3);
 const i=await askGeneric(esc(t('cp.t')),t('cp.b'+n,{r:rv.short||rv.name}),[{l:esc(t('cp.o1'))},{l:esc(t('cp.o2'))},{l:esc(t('cp.o3'))}]);
 if(i===0){G.fed.cash-=Math.round(300+G.fed.pop*30);G.cprog={wk:G.week,r:rv.name,mit:.7}}else if(i===1)G.cprog={wk:G.week,r:rv.name,mit:'star'};else G.cprog={wk:G.week,r:rv.name,mit:0};
 rv.pop=clamp(rv.pop+.3,3,99);addNews('n.cprog',{r:rv.short||rv.name})}
const _we5=weekEvents;weekEvents=async function(){try{if(G.week>5&&rnd()<.18)await counter()}catch(e){}return _we5.apply(this,arguments)};
})();
if(typeof normTexts==="function")normTexts();
