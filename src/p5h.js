/* ===== round 11d: postpone a feud finale to the next PPV/PLE ===== */
Object.assign(D,{
 'fp.opt':['Odłóż finał na najbliższe PLE/PPV (za {n} tyg.)','Postpone the finale to the next PLE/PPV (in {n} wk)'],
 'fp.optd':['Zapowiedź buduje napięcie: finał na PLE/PPV dostaje bonus do oceny.','The build-up adds tension: a finale on a PLE/PPV gets a rating bonus.'],
 'fp.btn':['Odłóż na PLE/PPV','Postpone to PLE/PPV'],'fp.cancel':['Zdejmij z PLE/PPV','Take off the PLE/PPV'],
 'fp.tag':['Finał zaplanowany na PLE/PPV: {n}, za {w} tyg.','Finale set for the PLE/PPV: {n}, in {w} wk'],'fp.tagnow':['Finał zaplanowany na PLE/PPV: {n}, w tym tygodniu','Finale set for the PLE/PPV: {n}, this week'],
 'fp.news':['Finał feudu „{s}” czeka na PLE/PPV „{n}”.','The finale of “{s}” is waiting for the PLE/PPV “{n}”.'],
 'fp.ppvline':['Finał feudu: {f}','Feud finale: {f}']
});
const FP_BONUS=.3;   /* set by eye: extra rating for a postponed finale played on the big show */
function fpWeeks(){return isBig()?0:4-G.week%4}
function fpOn(f){return !!(f.ppv&&f.ppv>=G.week)}
function ppvFeudUi(f,i){if(f.heat<70)return '';
 if(fpOn(f)){const w=f.ppv-G.week;return '<div class="note gold">'+t(w>0?'fp.tag':'fp.tagnow',{n:esc(bigNameFor(G.fed.id,f.ppv)),w:w})+'</div><div class="row"><button class="btn sm" data-act="fdppv" data-i="'+i+'">'+t('fp.cancel')+'</button></div>'}
 return '<div class="row"><button class="btn sm" data-act="fdppv" data-i="'+i+'">'+t('fp.btn')+'</button></div>'}
ACT.fdppv=function(e){const f=G.feuds[+e.dataset.i];if(!f)return;if(fpOn(f)){f.ppv=0;f.ppvd=false}else{f.ppv=G.week+fpWeeks();f.ppvd=true}save();render()};
/* stake question gets a 5th option: postpone */
fbStake=async function(f){
 const p=fbPair(f);if(!p)return false;const c=r10(wkRev()*.3),v={f:fLabel(f),s:t('sc.'+f.sc),m:money(c),n:fpWeeks()};
 const opts=[{l:t('fb.stake.0',v)},{l:t('fb.stake.1',v)},{l:t('fb.stake.2',v)},{l:t('fb.stake.3',v),dis:G.fed.cash<c}];
 if(!isBig())opts.push({l:t('fp.opt',v)+' — '+t('fp.optd')});
 const i=await askGeneric(t('fb.stake.t',v),t('fb.stake.b',v),opts);
 if(i===4){f.ppv=G.week+fpWeeks();f.ppvd=true;return true}
 f.stake=['none','leave','push','prize'][i];
 if(i>0){f.heat=clamp(f.heat+4,0,100);addNews('n.fb.stake'+i,v)}if(i===3)G.fed.cash-=c;return true};
/* bonus when the postponed finale is played on the big show */
(function(){const _fm=finalizeMatch;finalizeMatch=function(m,res,pos,total,fo){
  try{if(fo&&fo.f&&fo.f.ppvd&&isBig()&&fo.f.heat>=70&&fo.cov>=.99){res.stars+=FP_BONUS;fo.f.ppvd=false;fo.f.ppv=0}}catch(e){}
  return _fm.apply(this,arguments)};
 /* reminder on the big week, flag cleanup afterwards */
 const _ew=endWeek;endWeek=async function(){const r=await _ew.apply(this,arguments);
  try{(G.feuds||[]).forEach(f=>{if(f.ppv&&f.ppv<G.week){f.ppv=0;f.ppvd=false}else if(f.ppv&&f.ppv===G.week&&isBig())addNews('fp.news',{s:fLabel(f),n:bigNameFor(G.fed.id,G.week)})})}catch(e){}
  return r};
 const _pc=ppvCard;ppvCard=function(){let h=_pc.apply(this,arguments);try{const fs=(G.feuds||[]).filter(f=>fpOn(f)&&f.heat>=70);if(fs.length){const j=h.lastIndexOf('</div>');h=h.slice(0,j)+'<div class="mute" style="font-size:13px;width:100%">'+fs.map(f=>t('fp.ppvline',{f:esc(fLabel(f))})).join(' · ')+'</div></div>'}}catch(e){}return h}})();
if(typeof normTexts==='function')normTexts();
