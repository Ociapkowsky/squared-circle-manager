Object.assign(ACT,{warstance(e){const g=warEnsure();g.stance=e.dataset.k;if(g.stance==='counter'&&!g.tgt){const r=warRivals()[0];g.tgt=r?r.id:''}render()},warslot(e){const r=warSetSlot(e.dataset.k);WUI.msg=r==='ok'?t('wr.m.ok'):r==='cash'?t('fn.m.cash'):r==='cd'?t('fn.m.cd'):'';if(r==='ok')save();render()}});
Object.assign(CHG,{wartgt(e){warEnsure().tgt=e.value}});
