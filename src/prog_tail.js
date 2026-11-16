;(async()=>{
 const modalOpen=()=>!document.getElementById('modal').hidden;
 const pump=async()=>{for(let k=0;k<30;k++){await new Promise(r=>setTimeout(r,0));if(modalOpen()){const o=window.__evOpts||[];let k=o.findIndex(x=>!x.dis);window.__evResolve(k<0?0:k)}}};
 const run=async(id,W,t0force)=>{newGame(id);if(t0force)G.t0=t0force;const tgtN=mine().length;let mg=[],rs=[],line=[];
  for(let wk=0;wk<W;wk++){
   {let g=0;while(mine().length<Math.min(tgtN,ROSTERMAX[G.fed.tier-1]-3)&&g++<6){const fa=G.ws.filter(w=>w.fed==='FA').sort((a,b)=>(b.pop+b.ring*.3)-(a.pop+a.ring*.3)).find(w=>salaryOf(w,G.fed.tier)*8<G.fed.cash*.25);if(!fa)break;ACT.sign({dataset:{id:fa.id}})}}
   autoBook();const ready=G.card.filter(matchReady);
   if(ready.length<2){skipWeek();await pump()}else{RUN={fast:true,started:false};G.showResult=false;await runShow();await pump()}
   if(G.fed.cash>UPG[G.fed.tier]*1.5&&G.fed.tier<5&&G.fed.pop>=TPOP[G.fed.tier])ACT.upgrade();
   if(G.debt>=6){line.push('BANKRUPT@'+wk);break}
   const l=G.hist[G.hist.length-1];if(l){rs.push(l.rating);mg.push((l.rev-l.cost)/Math.max(1,l.rev))}
   if(wk%26===25){const a=x=>x.reduce((p,q)=>p+q,0)/Math.max(1,x.length);line.push('w'+(wk+1)+':T'+G.fed.tier+' p'+Math.round(G.fed.pop)+' m'+Math.round(a(mg.slice(-26))*100)+'% $'+(G.fed.cash>1e6?(G.fed.cash/1e6).toFixed(0)+'M':(G.fed.cash/1e3).toFixed(0)+'k'))}
  }
  console.log(id+(t0force?'(t0='+t0force+')':''),line.join(' | '))};
 await run('dtt',260);await run('nnp',156);await run('bra',208);
 console.log('cmpdone');
})();
