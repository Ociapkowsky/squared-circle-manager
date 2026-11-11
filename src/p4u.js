Object.assign(ACT,{
 rtadd(){const w=+(document.getElementById('rtw')||{}).value;const r=rtAdd(RTUI.m,w,RTUI.mode);RTUI.msg=t(r==='ok'?'rt.m.ok':'rt.m.full');if(r==='ok')save();render()},
 rtall(){RTUI.all=!RTUI.all;render()},
 rtdel(e){rtEnsure().plan.splice(+e.dataset.i,1);save();render()},
 rtres(e){const r=rtRes(e.dataset.k);RTUI.msg=t(r==='ok'?'rt.m.res':'rt.m.nores');if(r==='ok')save();render()}});
Object.assign(CHG,{rtm(e){RTUI.m=e.value;render()},rtmode(e){RTUI.mode=e.value;render()}});
