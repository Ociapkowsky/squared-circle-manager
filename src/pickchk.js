const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];p.on('pageerror',e=>{if(!/Invalid regular/.test(e.message))errs.push(e.message)});
await p.goto('file:///home/claude/ring-boss.html');await p.waitForTimeout(2500);
await p.click('[data-act="splashgo"]',{timeout:60000});await p.waitForTimeout(1500);await p.click('[data-act="start"]');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=document.querySelector('[data-act="tutskip"],[data-act="tutclose"]');if(s)s.click()});
await p.click('.nav [data-v="titles"]');await p.waitForTimeout(600);
console.log('pickers',await p.locator('.plpick').count(),'thumbs',await p.locator('.plpick .pl-b').count());
await p.locator('.plpick').first().scrollIntoViewIfNeeded();
await p.click('.plpick >> nth=0 >> button[data-v="M7"]');await p.waitForTimeout(200);
await p.click('.plpick >> nth=1 >> button[data-v="S3"]');await p.waitForTimeout(300);
console.log('draft',await p.evaluate(()=>JSON.stringify({m:G.td.mainImg,s:G.td.sideImg})));
await p.screenshot({path:'/tmp/pick.png'});
await p.fill('#tdname','Plate Test');await p.click('[data-act="tdcreate"]');await p.waitForTimeout(500);
console.log('saved',await p.evaluate(()=>{const t=G.titles[G.titles.length-1];return t.name+' '+t.mainImg+' '+t.sideImg+' '+(belt(t,100).indexOf('plM7')>0)}));
// edit existing flow
await p.evaluate(()=>{ACT.tdedit({dataset:{id:G.titles[G.titles.length-1].id}})});await p.waitForTimeout(300);
await p.click('.plpick >> nth=0 >> button[data-v=""]');await p.click('[data-act="tdsave"]');await p.waitForTimeout(300);
console.log('after edit',await p.evaluate(()=>{const t=G.titles[G.titles.length-1];return JSON.stringify([t.mainImg,t.sideImg])}));
console.log(errs);await b.close()})()
