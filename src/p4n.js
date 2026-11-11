Object.assign(ACT,{scthire(e){if(sctHire(+e.dataset.i))save();render()},sctfire(e){if(sctFire(e.dataset.id))save();render()},
 sctgo(e){const k=e.dataset.k,ok=sctSend(e.dataset.id,k,k==='w'?SCTUI.t:SCTUI.r);SCTUI.msg=ok?'':t('ng.cash');if(ok)save();render()}});
Object.assign(CHG,{sctw(e){SCTUI.t=e.value},sctr(e){SCTUI.r=e.value}});
