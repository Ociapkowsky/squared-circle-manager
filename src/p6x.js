;/* ===== Press conference after PPV/PLE (tier 4+) ===== */
(function(){
Object.assign(D,{
'pc.t':['Konferencja prasowa','Press conference'],
'pc.intro':['Po gali „{n}" ({s}★) sala prasowa jest pełna. Dziennikarze mają trzy pytania.','After "{n}" ({s}★) the press room is packed. Reporters have three questions.'],
'pc.q':['Pytanie {i}/3','Question {i}/3'],
'pc.tone':['Ton: {t}','Tone: {t}'],
'pc.t1':['przyjazny','friendly'],'pc.t2':['neutralny','neutral'],'pc.t3':['wrogi','hostile'],
'pc.sum':['Konferencja: {t}','Press conference: {t}'],
'pc.g':['wypadła świetnie, media piszą o Tobie dobrze','went great, the media write well of you'],
'pc.m':['przeszła bez większego echa','passed without much echo'],
'pc.b':['wypadła słabo, prasa wbija szpilki','went badly, the press is pointed'],
'pc.hy':['Hype na następną galę: +{v}','Hype for the next show: +{v}'],
'n.pc':['Konferencja prasowa po „{n}": {t}','Press conference after "{n}": {t}']});
const Q=[
 {a:['Czy ta gala spełniła Twoje oczekiwania?','Did this show live up to your expectations?'],o:[
  ['Była dokładnie taka, jak planowałem','It was exactly as I planned',{pop:.3,hy:.01,risk:.35}],
  ['Jest sporo do poprawy','There is a lot to improve',{pop:.1,mor:1,hy:0,risk:.1}],
  ['Zaskoczyliśmy wszystkich i to dopiero początek','We surprised everyone and it is only the start',{pop:.5,hy:.03,risk:.55}]]},
 {a:['Rywale mówią, że depczą Ci po piętach. Co na to?','Rivals say they are on your heels. Thoughts?'],o:[
  ['Szanuję ich, ale to my wyznaczamy standardy','I respect them, but we set the standard',{pop:.2,hy:.01,risk:.2}],
  ['Niech spróbują nas dogonić','Let them try to catch us',{pop:.4,rv:.3,hy:.02,risk:.45}],
  ['Bez komentarza','No comment',{pop:0,hy:0,risk:0}]]},
 {a:['Fani pytają o przyszłość głównych gwiazd. Co szykujesz?','Fans ask about your top stars. What are you planning?'],o:[
  ['Nie zdradzę, ale będzie głośno','I will not spill, but it will be loud',{pop:.2,hy:.04,risk:.3}],
  ['Zapowiem wielki powrót, który wszystkich zaskoczy','I will tease a huge return that will shock everyone',{pop:.3,hy:.05,risk:.5,mor:-1}],
  ['Zawodnicy zasłużyli na odpoczynek','The wrestlers deserve a rest',{pop:.1,mor:2,hy:-.01,risk:.1}]]},
 {a:['Pojawiają się plotki o kłopotach finansowych. Prawda?','Rumors of money trouble are going around. True?'],o:[
  ['Absolutnie nie, liczby mówią same za siebie','Absolutely not, the numbers speak for themselves',{pop:.2,hy:0,risk:.35}],
  ['Każda firma ma wyzwania, my mamy plan','Every company has challenges, we have a plan',{pop:.1,hy:0,risk:.15}],
  ['Wypowiem się dopiero po audycie','I will speak only after the audit',{pop:-.1,hy:-.01,risk:.05}]]},
 {a:['Pytanie o Twój styl bookowania: czy to nie jest zbyt ryzykowne?','A question on your booking style: is it too risky?'],o:[
  ['Ryzyko to część wrestlingu','Risk is part of wrestling',{pop:.3,hy:.02,risk:.5}],
  ['Stawiam na sprawdzone rozwiązania','I stick to proven ideas',{pop:.1,hy:0,risk:.1}],
  ['Krytycy zmienią zdanie przy następnej gali','Critics will change their minds at the next show',{pop:.3,hy:.03,risk:.55}]]}];
function tone(s){return s>=3.5?0:s>=2.5?1:2}
async function presser(){const p=G.press;G.press=null;if(!p)return;const tn=tone(p.s);
 let pop=0,hy=0,mor=0,rv=0,bad=0;
 const qs=[];const pool=Q.slice();for(let i=0;i<3;i++){qs.push(pool.splice(Math.floor(rnd()*pool.length),1)[0])}
 await askGeneric(esc(t('pc.t')),t('pc.intro',{n:p.n,s:f1(p.s)})+'<br><span class="mut">'+esc(t('pc.tone',{t:t('pc.t'+(tn+1))}))+'</span>',[{l:esc(t('mm.ok'))}]);
 for(let i=0;i<3;i++){const q=qs[i];
  const k=await askGeneric(esc(t('pc.q',{i:i+1})),esc(lang==='pl'?q.a[0]:q.a[1]),q.o.map(o=>({l:esc(lang==='pl'?o[0]:o[1])})));
  const o=q.o[k]||q.o[0],e=o[2];
  /* risk is more likely to backfire when the mood is hostile or the show was weak */
  const back=rnd()<e.risk*(.25+.3*tn);
  if(back){pop-=Math.abs(e.pop)*1.3+.2;hy-=Math.abs(e.hy||0)+.01;bad++}
  else{pop+=e.pop;hy+=e.hy||0}
  mor+=e.mor||0;if(!back)rv+=e.rv||0;}
 pop=clamp(pop,-1.2,1.4);hy=clamp(hy,-.05,.1);
 G.fed.pop=clamp(G.fed.pop+pop,2,100);
 if(mor)mine().forEach(w=>evMood(w,mor));
 if(rv&&G.rivals&&G.rivals.length){const r=pickR(G.rivals);if(r)r.pop=clamp(r.pop+rv,3,99)}
 if(hy>0)G.hype={wk:G.week,v:hy};
 const key=bad===0&&pop>=.5?'pc.g':bad>=2||pop<0?'pc.b':'pc.m';
 G.pcHist=(G.pcHist||0)+1;
 addNews('n.pc',{n:p.n,t:t(key)});
 await askGeneric(esc(t('pc.t')),esc(t('pc.sum',{t:t(key)}))+'<br>'+esc((pop>=0?'+':'')+f1(pop)+' '+(lang==='pl'?'prestiżu':'prestige'))+(hy>0?'<br>'+esc(t('pc.hy',{v:Math.round(hy*100)+'%'})):''),[{l:esc(t('mm.ok'))}])}
const _fs6=finishShow;finishShow=function(){let big=false,nm='';try{big=isBig();nm=bigName()}catch(e){}const r=_fs6.apply(this,arguments);
 try{if(big&&(G.fed.tier||1)>=4&&G.summary&&G.summary.big)G.press={s:G.summary.rating,n:nm}}catch(e){}return r};
const _we6=weekEvents;weekEvents=async function(){try{if(G.press)await presser()}catch(e){G.press=null}return _we6.apply(this,arguments)};
const _dm3=demandAt;demandAt=function(){let d=_dm3.apply(this,arguments);try{const h=G.hype;if(h&&h.wk===G.week)d+=h.v}catch(e){}return d};
})();
if(typeof normTexts==="function")normTexts();
