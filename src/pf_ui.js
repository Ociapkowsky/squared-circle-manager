const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [w,h,n] of [[1000,900,'d'],[390,860,'m']]){
const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>{if(!/Invalid regular/.test(e.message))errs.push(e.message)});
await p.goto('file:///home/claude/ring-boss.html');await p.waitForTimeout(1500);
await p.click('[data-act="splashgo"]');await p.click('[data-act="start"]');await p.waitForTimeout(400);
await p.evaluate(async()=>{G.tut={step:0,done:1};const t=document.getElementById('tut');t&&t.remove();
 for(let i=0;i<6;i++){autoBook();G.screen='show';RUN={fast:true,started:false};G.showResult=false;render();const pm=(async()=>{for(let k=0;k<40;k++){await new Promise(r=>setTimeout(r,15));if(!document.getElementById('modal').hidden&&window.__evResolve)window.__evResolve(0)}})();await runShow();await pm;G.showResult=false}
 G.screen='roster';render()});
await p.waitForTimeout(2200);
await p.click('[data-act="pfopen"]');await p.waitForTimeout(300);await p.screenshot({path:'/tmp/pf1'+n+'.png'});await p.click('[data-act="pfclose"]');
await p.evaluate(async()=>{autoBook();G.screen='show';RUN={fast:true,started:false};G.showResult=false;render();const pm=(async()=>{for(let k=0;k<40;k++){await new Promise(r=>setTimeout(r,15));if(!document.getElementById('modal').hidden&&window.__evResolve)window.__evResolve(0)}})();await runShow();await pm;render()});
await p.waitForTimeout(2200);const e2=await p.$('.fxp');console.log(n,'fx',!!e2);if(e2){await e2.scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/pf2'+n+'.png'})}
console.log(n,await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));await p.close()}
console.log(errs);await b.close()})();
