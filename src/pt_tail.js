;(async()=>{
 const pump=async()=>{for(let k=0;k<60;k++){await new Promise(r=>setTimeout(r,0));if(!document.getElementById('modal').hidden){const o=window.__evOpts;let j=Math.floor(Math.random()*o.length);if(o[j]&&o[j].dis)j=0;window.__evResolve(j)}}};
 lang='pl';let bad=0;const orig=askGeneric;askGeneric=function(t1,b,o){if(/\{[a-z]|undefined|NaN/.test(t1+b+o.map(x=>x.l).join())){bad++;console.log('BAD',t1,'|',b)}return orig.apply(this,arguments)};
 for(const f of ['kpw','nfw']){newGame(f);G.fed.cash=3e5;
  for(let i=0;i<80;i++){autoBook();const r=G.card.filter(matchReady);if(r.length<2){skipWeek();await pump()}else{RUN={fast:true,started:false};G.showResult=false;await runShow();await pump()}
   if(G.fired)G.fired=0;if(i%20===0){for(const fn of [vRoster,vFa,vDash]){const h=fn();if(/undefined|NaN|\{[a-z]/.test(h))console.log('BAD HTML',fn.name,h.match(/.{0,40}(undefined|NaN|\{[a-z]).{0,40}/)[0])}}}
  console.log(f,G.week,'hpset',G.ws.filter(w=>w.hp!=null).length,'pot tags',(vRoster().match(/Potencjał/g)||[]).length)}
 for(const k of ['prodigy','latebloom','slump','rivalscout','showcase']){window.__inWE=false;for(let r=0;r<4;r++){const p=WEV[k]();const q=pump();await p;await q}}
 console.log('bad',bad,'tdone')})();
