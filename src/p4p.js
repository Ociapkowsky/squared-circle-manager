Object.assign(ACT,{lktalk(){if(lkTalk())save();render()},lkgift(){if(lkGift())save();render()},lkmentor(){if(lkMentor())save();render()},
 lkrep(){if(LKUI.pick&&lkReplace(LKUI.pick))save();LKUI.pick='';render()},lkdisc(e){if(lkDisc(e.dataset.id))save();render()},lkfire(e){const w=W(e.dataset.id);if(w){releaseW(w);save()}render()},lkconf(e){if(lkConf(e.dataset.id))save();render()}});
Object.assign(CHG,{lkpick(e){LKUI.pick=e.value}});
