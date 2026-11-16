const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>{if(!/Invalid regular/.test(e.message))errs.push(e.message)});
await p.goto('file:///home/claude/ring-boss.html');await p.waitForTimeout(2500);
const r=await p.evaluate(async()=>{let n=0;const _s=SFX.phone;SFX.phone=function(){n++;return _s.apply(this,arguments)};
 const ok=typeof sPlay==='function';
 openModal('<h2>Twardy agent</h2><button data-act="evopt" data-i="0">x</button>');await new Promise(r=>setTimeout(r,500));
 const a=n;openModal('<h2>Inne zdarzenie</h2><button data-act="evopt" data-i="0">x</button>');await new Promise(r=>setTimeout(r,500));
 return {ok,afterHeadhunter:a,afterOther:n,hasPhone:typeof SFX.phone}});
console.log(JSON.stringify(r),errs);await b.close()})()
