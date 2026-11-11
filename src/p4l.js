Object.assign(ACT,{
 neg(e){const w=W(e.dataset.id);if(!w)return;G.neg={id:w.id,len:52,pct:0,bonus:0,type:(w.cl&&w.cl.until>G.week&&w.cl.type)||'full',cl:(w.cl&&w.cl.until>G.week)?w.cl.l.slice():[],msg:'',done:false};openModal(negModal())},
 negsend(){const n=G.neg,w=n&&W(n.id);if(!w)return;const r=ctOffer(n);n.msg=r.msg;if(r.res==='ok'){n.done=true;save();negRefresh();render()}else{if(r.res==='walk'||r.res==='wait'||r.res==='fin')n.done=true;negRefresh()}},
 negclose(){closeModal();G.neg=null;render()},
 gichg(e){const sel=document.getElementById('gisel-'+e.dataset.id);if(!sel)return;const r=giSet(e.dataset.id,sel.value);GIUI.msg=r==='ok'?t('gi.m.ok'):r==='cd'?t('gi.m.cd'):r==='cash'?t('gi.m.cash'):r==='lock'?t('gi.m.lock'):r==='veto'?t('gi.m.veto'):'';if(r==='ok')save();render()}});
Object.assign(CHG,{
 negt(e){if(G.neg){G.neg.type=e.value;negRefresh()}},negl(e){if(G.neg){G.neg.len=+e.value;negRefresh()}},negp(e){if(G.neg){G.neg.pct=+e.value;negRefresh()}},negb(e){if(G.neg){G.neg.bonus=+e.value;negRefresh()}},
 negc(e){const n=G.neg;if(!n)return;const c=e.dataset.c,i=n.cl.indexOf(c);if(e.checked&&i<0)n.cl.push(c);else if(!e.checked&&i>=0)n.cl.splice(i,1);negRefresh()}});
Object.assign(CHG,{ctf(e){CTUI.f=e.value;render()}});
