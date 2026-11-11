/* ===== round 11: dashboard (federation level, next PPV/PLE), home-country commentators ===== */
Object.assign(D,{
 'dx.tier':['Poziom federacji','Promotion level'],'dx.ppv':['Najbliższe PPV/PLE','Next PPV/PLE'],'dx.ppvnow':['w tym tygodniu','this week'],'dx.ppvin':['za {n} tyg.','in {n} wk']
});
const STAFF_HOME=[.85,.7,.5,.35,.25];   /* set by eye: chance that a commentator/announcer comes from the federation's country */
function staffCC(role,tier){const p=(STAFF_HOME[clamp(tier|0,1,5)-1]||.3)*((role==='comm'||role==='ann')?1:.5);
 return (typeof G!=='undefined'&&G&&G.fed&&G.fed.country&&rnd()<p)?G.fed.country:pickR(COUNTRIES)}
function ppvCard(){const n=isBig()?0:4-G.week%4;
 return '<div class="card row spread" style="gap:10px"><div><span class="px">'+t('dx.ppv')+'</span> <b>'+esc(bigNameFor(G.fed.id,G.week+n))+'</b></div><span class="tag'+(n===0?' gold':'')+'" style="'+(n===0?'color:var(--gold);border-color:var(--gold)':'')+'">'+(n===0?t('dx.ppvnow'):t('dx.ppvin',{n:n}))+'</span></div>'}
(function(){const _cc=cmdCard;cmdCard=function(){let c='';try{c=ppvCard()}catch(e){}return c+_cc.apply(this,arguments)};
 const _vd=vDash;vDash=function(){let h=_vd.apply(this,arguments);const f=G.fed;
  const o='<div class="px">'+t('d.venue')+'</div><div class="v" style="font-size:20px">'+t('venue.'+f.tier)+'</div>';
  return h.replace(o,'<div class="px">'+t('dx.tier')+'</div><div class="v" style="font-size:20px">'+t('tier.'+f.tier)+' · '+f.tier+'/5</div><div class="s">'+t('venue.'+f.tier)+'</div>')}})();
if(typeof normTexts==='function')normTexts();
