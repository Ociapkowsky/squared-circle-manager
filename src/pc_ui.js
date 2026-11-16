const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [w,h,n] of [[1000,900,'d'],[390,860,'m']]){
const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>{errs.push(e.message);console.log('PERR',e.message)});p.on('console',m=>{if(/rror/.test(m.text()))console.log('CON',m.text().slice(0,200))});
await p.goto('file:///home/claude/ring-boss.html');await p.waitForTimeout(1500);
await p.click('[data-act="splashgo"]');await p.click('[data-act="start"]');await p.waitForTimeout(300);
const r=await p.evaluate(async()=>{G.tut={step:0,done:1};const t=document.getElementById('tut');t&&t.remove();
 const fid=FED_SPECS.find(f=>f.tier>=4).id;newGame(fid);G.tut={step:0,done:1};
 while(!isBig()){G.week++}
 autoBook();const rd=G.card.filter(matchReady).length;const dbg=[G.week,isBig(),G.fed.tier,G.card.length,rd];G.screen='show';RUN={fast:true,started:false};G.showResult=false;render();const pm=(async()=>{for(let k=0;k<80;k++){await new Promise(r=>setTimeout(r,20));if(!document.getElementById('modal').hidden&&window.__evResolve&&window.__evOpts)window.__evResolve(0)}})();let er='';try{await runShow()}catch(e){er=e.message+e.stack.split('\n')[1]}window.__dbg=dbg.concat([JSON.stringify(G.summary&&{b:G.summary.big,o:G.summary.out&&G.summary.out.length}),er,!!G.summary,!!RUN]);
 let pe='';try{pe='len'+pcBuild().length+' '+Object.keys(G.summary).join()}catch(e){pe=e.message+e.stack.split('\n')[1]}return [pe,isBig(),G.fed.tier,window.__dbg,G.week,!!G.pc,G.pc&&G.pc.q.length,G.screen,G.showResult]});
console.log(n,r);
await p.waitForTimeout(2200);
const done=await p.$('[data-act="done"]');console.log('done btn',!!done);
if(done){console.log(await p.evaluate(()=>{try{return [typeof ACT.done,String(ACT.done).slice(0,60),!!G.pc,document.querySelector('[data-act=done]').outerHTML.slice(0,100)]}catch(e){return e.message}}));await p.evaluate(()=>{window.__pce=[];const oa=pcAsk;pcAsk=function(h){window.__pce.push('ask '+h.length);const r=oa.apply(this,arguments);r.then(v=>window.__pce.push('res '+v));return r};const oc=closeModal;closeModal=function(){window.__pce.push('close '+new Error().stack.split('\n').slice(2,4).join('|'));return oc()};const o=pcRun;pcRun=async function(){try{await o.apply(this,arguments)}catch(e){window.__pce.push(e.message+' '+e.stack.split('\n').slice(0,3).join('|'))}}});await done.click();await p.waitForTimeout(200);console.log('PCE',await p.evaluate(()=>window.__pce));console.log('state',await p.evaluate(()=>[document.getElementById('modal').hidden,document.getElementById('modal').innerHTML.slice(0,80),!!G.pc,G.showResult]));await p.waitForTimeout(400);await p.screenshot({path:'/tmp/pc1'+n+'.png'});
 await p.click('[data-act="pcopt"][data-i="0"]');await p.waitForTimeout(300);await p.screenshot({path:'/tmp/pc2'+n+'.png'});
 await p.click('[data-act="pcopt"][data-i="0"]');await p.waitForTimeout(300);await p.screenshot({path:'/tmp/pc3'+n+'.png'});
 for(let k=0;k<12;k++){const o=await p.$('#modal:not([hidden]) [data-act="pcopt"]');if(!o)break;await o.click();await p.waitForTimeout(150)}
 console.log('after',await p.evaluate(()=>[G.screen,document.getElementById('modal').hidden,G.pcp.length,JSON.stringify(G.pcs)]));
 console.log('hscroll',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))}
await p.close()}
console.log(errs);await b.close()})();
