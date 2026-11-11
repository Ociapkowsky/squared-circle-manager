Object.assign(ACT,{
 tmmake(){const ok=tmMake(TMUI.a,TMUI.b,TMUI.nk>=0?TMUI.nk:null);TMUI.msg=ok?'':t('ng.cash');if(ok){TMUI.nk=-1;save()}render()},
 tmsug(){const s=tmSuggest();if(s&&tmMake(s.a.id,s.b.id,null))save();render()},
 tmfin(e){const x=tmEnsure().l.find(y=>y.id===e.dataset.id),sel=document.querySelector('select[data-chg="tmf"][data-id="'+e.dataset.id+'"]');if(x&&sel&&tmSetFin(x.id,+sel.value))save();render()},
 tmdel(e){if(tmDel(e.dataset.id))save();render()},
 entup(e){const w=W(e.dataset.id);if(!w)return;const en=entOf(w),c=xc(.03*en.lv);if(en.lv<3&&G.fed.cash>=c){G.fed.cash-=c;en.lv++;save()}render()},
 rebuild(e){const w=W(e.dataset.id);if(!w)return;const c=xc(.05);if(G.fed.cash<c)return;G.fed.cash-=c;const g=giOf(w);g.q=Math.max(g.q,45);w.bury=0;w.bad=0;w.morale=clamp((w.morale||50)+4,0,100);save();render()}});
Object.assign(CHG,{tma(e){TMUI.a=e.value;render()},tmb(e){TMUI.b=e.value},tmn(e){TMUI.nk=+e.value},tmf(e){},
 entsel(e){const w=W(e.dataset.id);if(w){entOf(w).k=e.value;save();render()}}});
