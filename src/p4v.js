Object.assign(ACT,{
 dyseg(e){const r=dySeg(e.dataset.id);DYUI.msg=t('dy.m.'+r);if(r==='ok')save();render()},
 dytrain(e){const r=dyTrain(e.dataset.id);DYUI.msg=t('dy.m.'+(r==='ok'?'ok':r==='cd'?'cd':'cash'));if(r==='ok')save();render()},
 dyscout(e){const r=dyScout(e.dataset.id);DYUI.msg=t('dy.m.'+(r==='ok'?'ok':'cash'));if(r==='ok')save();render()},
 dyacad(){const r=dyAcad();DYUI.msg=t('dy.m.'+(r==='ok'?'ok':r==='max'?'max':'cash'));if(r==='ok')save();render()}});
Object.assign(ACT,{eminv(e){const r=emInvest(e.dataset.k);EMUI.msg=t(r==='ok'?'em.m.ok':'em.m.cash');if(r==='ok')save();render()}});
Object.assign(ACT,{
 hdunlock(){const r=hdUnlock();HDUI.msg=t('hd.m.'+(r==='ok'?'ok':r==='cash'?'cash':'req'));if(r==='ok')save();render()},
 hdbuy(e){const r=hdBuy(e.dataset.id);HDUI.msg=t('hd.m.'+(['ok','cash','busy','max','fail'].includes(r)?r:'no'));if(r==='ok')save();render()},
 hdswitch(e){const r=hdSwitch(e.dataset.id);if(r!=='ok')HDUI.msg=t('hd.m.'+(r==='busy'?'busy':'no'));else save();render()},
 hdpull(e){const r=hdPull(e.dataset.id);HDUI.msg=t('hd.m.'+(r==='ok'?'ok':r==='low'?'low':'no'));if(r==='ok')save();render()},
 hdmgr(e){const r=hdMgr(e.dataset.id);HDUI.msg=t('hd.m.'+(r==='ok'?'ok':r==='cash'?'cash':'max'));if(r==='ok')save();render()}});

Object.assign(ACT,{csarm(){CSUI.arm=1;render()},cscancel(){CSUI.arm=0;render()},csret(){csRetire()},csback(){csUnretire()},csnew(){if(CSUI.arm==2){try{localStorage.removeItem(LS_SAVE)}catch(x){}G=null;CSUI.arm=0;render()}else{CSUI.arm=2;render()}}});
Object.assign(ACT,{tutnext(){if(!G||!G.tut)return;if(G.tut.step>=TUTS.length-1)tutEnd();else tutGo(G.tut.step+1)},tutprev(){if(G&&G.tut)tutGo(G.tut.step-1)},tutskip(){tutEnd()},tutstart(){tutStart()}});
Object.assign(ACT,{chm(e){CHUI.m=e.dataset.k;render()},chr(e){CHUI.r=+e.dataset.r;render()},
 hlrehab(e){const r=hlRehab(e.dataset.id);HLUI.msg=t('hl.m.'+(r==='ok'?'ok':r==='cash'?'cash':'no'));if(r==='ok')save();render()},
 hlrush(e){HLUI.arm=e.dataset.id;render()},hlrushno(){HLUI.arm='';render()},hlrushgo(e){const r=hlRush(e.dataset.id);HLUI.arm='';HLUI.msg=t('hl.m.'+(r==='ok'?'ok':'no'));if(r==='ok')save();render()},
 hlrest(e){const r=hlRest(e.dataset.id);HLUI.msg=t('hl.m.'+(r==='ok'?'ok':'no'));if(r==='ok')save();render()},
 hlcheck(){const r=hlCheck();HLUI.msg=t('hl.m.'+(r==='ok'?'ok':r==='cash'?'cash':'no'));if(r==='ok')save();render()}});
Object.assign(ACT,{
 async svsave(e){const n=+e.dataset.n,had=!!svGet(n);if(had&&SVUI.arm!=='save:'+n){SVUI.arm='save:'+n;render();return}SVUI.arm='';await svSave(n);render()},
 async svload(e){const n=+e.dataset.n;if(SVUI.arm!=='load:'+n){SVUI.arm='load:'+n;render();return}SVUI.arm='';await svLoad(n);render()},
 svdel(e){const n=+e.dataset.n;if(SVUI.arm!=='del:'+n){SVUI.arm='del:'+n;render();return}SVUI.arm='';svDel(n);render()},
 async svexport(){await svExport();render()},
 svcopy(){const ta=document.getElementById('svout');if(!ta)return;ta.select();try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(x){}SVUI.msg=t('sv.copied');render()},
 async svimport(){const ta=document.getElementById('svin'),v=ta?ta.value:'';if(SVUI.arm!=='imp'){SVUI.arm='imp';render();const t2=document.getElementById('svin');if(t2)t2.value=v;return}SVUI.arm='';await svImport(v);render()},
 setdiff(e){if(!G)return;G.diff=e.dataset.k;save();render()}});
CHG.svfile=el=>{const f=el.files&&el.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const ta=document.getElementById('svin');if(ta)ta.value=String(r.result)};r.readAsText(f)};
Object.assign(ACT,{sndtoggle(){SND.on=!SND.on;sndSave();sndCtx();if(SND.on)sPlay('pop');render()},sndtest(){sndCtx();sPlay('bell',1);setTimeout(()=>sPlay('cheer',2),500);setTimeout(()=>sPlay('slam'),1700);setTimeout(()=>sPlay('fanfare'),2300);setTimeout(()=>sPlay('cash'),3400)}});
CHG.sndvol=el=>{SND.vol=clamp(+el.value/100,0,1);sndSave();sndCtx();sPlay('pop')};
Object.assign(ACT,{sndclk(){SND.clk=!SND.clk;sndSave();if(SND.clk)sPlay('click');render()}});

Object.assign(ACT,{qtheme(){const n=qDark()?'light':'dark';try{localStorage.setItem(THK,n)}catch(e){}themeApply();render()}});

Object.assign(ACT,{splashgo(){sPlay('gong');SPLASH=false;render();window.scrollTo&&window.scrollTo(0,0)}});

NAVG.forEach(g=>{if(g[0]==='g.hist'&&g[1].indexOf('sk')<0)g[1].push('sk')});if(NAV.indexOf('sk')<0)NAV.push('sk');
NAVIC.sk='<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>';
if(!TUTS.some(x=>x[1]==='sk'))TUTS.splice(TUTS.length-1,0,['sk','sk']);
_T('sk','Serie','Seria wygranych albo przegranych zawodnika pojawia się jako odznaka na jego karcie (🔥 lub ❄). Długa seria podbija ocenę walki, a przerwanie jej to wielki moment i bonus popularności. Osobno liczone są serie na tej samej gali PPV, jak legendarna passa Undertakera. Długie serie porażek obniżają morale, ale możesz zrobić z nich gag.','Streaks','A win or loss streak appears as a badge on the wrestler card (🔥 or ❄). A long streak lifts a match rating and ending it is a big moment with a popularity bonus. Streaks at the same PPV are tracked separately, like a legendary run at one big show. Long losing runs sink morale, but you can turn them into a gag.');

CHG.mfam=e=>{const m=G.card[+e.dataset.i];if(!m)return;m.mode=MFDEF[e.value]||'1v1';fixMatch(m);render()};

ACT.stpick=e=>{if(RUN)return;stpOpen(+e.dataset.i)};
ACT.stpclose=()=>{closeModal();STPK.i=-1};
ACT.stpcat=e=>{STPK.c=e.dataset.c;stpRefresh()};
ACT.stpfav=e=>{const k=e.dataset.k,o=stpLoad(),i=o.fav.indexOf(k);if(i>=0)o.fav.splice(i,1);else o.fav.push(k);stpSaveLS(o);if(STPK.c==='fav'&&!o.fav.length)STPK.c='all';stpRefresh()};
ACT.stpset=e=>{const m=G.card[STPK.i];if(!m)return;const k=e.dataset.k;if(stpLock(m,k))return;m.stip=k;fixMatch(m);if(k!=='none'){const o=stpLoad();o.rec=[k].concat(o.rec.filter(x=>x!==k)).slice(0,8);stpSaveLS(o)}closeModal();STPK.i=-1;render();save()};
if(hasDoc)document.addEventListener('input',ev=>{const el=ev.target;if(el&&el.id==='stpq'){STPK.q=el.value;stpRefresh()}});

ACT.svimport0=async()=>{const ta=document.getElementById('svin0');SVUI.msg='';await svImport(ta?ta.value:'');render()};
Object.assign(D,{'sv.start':['Wczytaj zapis z kodu','Load a save from code'],'sv.startd':['Wklej kod zapisu (zaczyna się od SCM1:), który skopiowałeś w Ustawieniach → Zapisy → Kod zapisu.','Paste a save code (starts with SCM1:) that you copied in Settings → Saves → Save code.']});

/* ===== text normalization pass (typography + US spelling), runs once after all labels are registered ===== */
function normTexts(){
 const US={colour:'color',colours:'colors',defence:'defense',defences:'defenses',rumour:'rumor',rumours:'rumors',favourite:'favorite',favourites:'favorites',favour:'favor',honour:'honor',neighbour:'neighbor',neighbours:'neighbors',programme:'program',programmes:'programs',centre:'center',organised:'organized',organise:'organize',organising:'organizing',organisation:'organization',organisations:'organizations',acclimatise:'acclimatize',stabilise:'stabilize',capitalise:'capitalize',offence:'offense',offences:'offenses',grey:'gray',favouritism:'favoritism'};
 const re=new RegExp('\\b('+Object.keys(US).join('|')+')\\b','gi');
 const us=s=>s.replace(re,m=>{const r=US[m.toLowerCase()];return m[0]===m[0].toUpperCase()?r[0].toUpperCase()+r.slice(1):r});
 const SKIP={'s.bad':1};
 Object.keys(D).forEach(k=>{const v=D[k];if(!Array.isArray(v)||SKIP[k])return;
  let p=v[0],e=v[1];if(typeof p!=='string'||typeof e!=='string')return;
  p=p.replace(/\.\.\./g,'…');e=e.replace(/\.\.\./g,'…');
  if(p.indexOf('<')<0)p=p.replace(/„([^„”"]*)"/g,'„$1”').replace(/"([^"„”]+)"/g,'„$1”');
  if(e.indexOf('<')<0)e=e.replace(/"([^"“”]+)"/g,'“$1”');
  e=us(e);v[0]=p;v[1]=e});
}
normTexts();
