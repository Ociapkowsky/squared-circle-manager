const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage();const errs=[];p.on('pageerror',e=>{if(!/Invalid regular/.test(e.message))errs.push(e.message)});
await p.goto('file:///home/claude/ring-boss.html');await p.waitForTimeout(2000);
await p.click('[data-act="splashgo"]');await p.waitForTimeout(1500);await p.click('[data-act="start"]');await p.waitForTimeout(2500);
const r=await p.evaluate(async()=>{let n=0;const o=SFX.pen;SFX.pen=function(){n++;return o.apply(this,arguments)};
 const w=mine()[0];G.fed.cash=1e7;ACT.renew({dataset:{id:w.id}});await new Promise(r=>setTimeout(r,300));const a=n;
 G.fed.cash=0;await new Promise(r=>setTimeout(r,1000));ACT.renew({dataset:{id:w.id}});await new Promise(r=>setTimeout(r,300));
 return [a,n,PENB.b&&PENB.b.duration.toFixed(2)]});
console.log('pen after renew ok / after failed renew / dur',r);console.log(errs);await b.close()})()
