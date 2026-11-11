function sgStart(id,mode){const w=W(id);if(!w)return;if(mine().length>=ROSTERMAX[G.fed.tier-1])return;if(G.fed.cash<sgFee(w,mode))return;
 if(mode==='poach'){if(w.fed==='FA'||w.fed==='PRO'||w.fed==='RET'||w.fed===G.fed.id||w.ext||(w.pcd||0)>G.week||!G.rivals.find(x=>x.id===w.fed))return}
 G.neg={id:w.id,len:52,pct:0,bonus:0,type:'full',cl:[],msg:'',done:false,sign:mode};openModal(negModal())}
ACT.__sign=ACT.sign;
Object.assign(ACT,{sign(e){sgStart(e.dataset.id,'fa')},signpro(e){sgStart(e.dataset.id,'pro')},poach(e){sgStart(e.dataset.id,'poach')},
 negsend(){const n=G.neg,w=n&&W(n.id);if(!w)return;const r=n.sign?ctSignOffer(n):ctOffer(n);n.msg=r.msg;if(r.res==='ok'){n.done=true;save();negRefresh();render()}else{if(r.res==='walk'||r.res==='wait'||r.res==='fin')n.done=true;negRefresh()}},
 negbest(){const n=G.neg,w=n&&W(n.id);if(!w)return;const b=ctBest(w,n);if(b){n.type=b.type;n.len=b.len;n.pct=b.pct;n.cl=b.cl.slice();n.bonus=0;n.msg=t('ng.best.set')}else n.msg=t('ng.best.none');negRefresh()}});
