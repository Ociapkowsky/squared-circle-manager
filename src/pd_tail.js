;(async()=>{
 const pump=async()=>{for(let k=0;k<60;k++){await new Promise(r=>setTimeout(r,0));if(!document.getElementById('modal').hidden){const o=window.__evOpts;let j=0;if(o){j=Math.floor(Math.random()*o.length);if(o[j]&&o[j].dis)j=0}if(window.__evResolve)window.__evResolve(j)}}};
 lang='pl';START_ME=null;meInit();newGame('str');G.week=40;G.fed.tier=4;G.fed.pop=70;G.fed.cash=1e11;let errs=0,fired=0;
 try{
 const ks=Object.keys(WEV).filter(k=>k.indexOf('x_pd')===0);console.log('pd events',ks.length);
 for(const k of ks)for(let r=0;r<6;r++){G.fed.cash=1e11;try{const res=await Promise.all([WEV[k](),pump()]);if(res[0])fired++}catch(e){errs++;console.log('ERR',k,e.stack.split('\n').slice(0,3).join(' | '))}}
 console.log('fired',fired);
 const ms=mine().filter(x=>!x.ext);mgHire(0);mgHire(1);mgAssign(G.mg.l[0].id,ms[0].id);mgAssign(G.mg.l[1].id,ms[1].id);
 G.feuds.push({id:'fT',sc:'revenge',A:[ms[0].id],B:[ms[1].id],stA:null,stB:null,stR:null,titleId:null,fedId:null,mw:0,g:1,heat:20,matches:0,used:false});
 G.screen='feuds';const h=vFeuds();console.log('feuds html',!/undefined|NaN|\{[a-z]/.test(h),/Menedżerowie:/.test(h),(h.match(/Wojny menedżerów/g)||[]).length);
 for(let i=0;i<10;i++){G.fed.cash=1e11;await Promise.all([endWeek(),pump()])}
 }catch(e){errs++;console.log('ERR',e.stack.split('\n').slice(0,4).join(' | '))}
 console.log('errs',errs,'tdone')})();
