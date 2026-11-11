/* ===== Balance: soft ceiling on popularity above 85 (by eye) ===== */
const _blE=endWeek;endWeek=function(){
 const r=_blE.apply(this,arguments);
 try{if(G&&G.fed&&G.fed.pop>85)G.fed.pop=clamp(G.fed.pop-(G.fed.pop-85)*.04,2,100)}catch(e){}
 return r};

/* QA: autosave failures (full storage) were silent -> show a warning banner once */
(function(){Object.assign(D,{'sv.full':['Nie udało się zapisać gry: pamięć przeglądarki jest pełna. Zapisz kod gry (Zapis → kopiuj) albo usuń stare sloty, inaczej postęp zniknie po odświeżeniu.','Could not save the game: browser storage is full. Copy your save code or delete old slots, or progress will be lost on refresh.']});
const _sv=save;let warned=0;
save=function(){if(!G)return;let ok=true;try{localStorage.setItem(LS_SAVE,JSON.stringify(G))}catch(e){ok=false}
 if(!ok&&!warned&&typeof document!=='undefined'&&document.body){warned=1;try{const d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:99999;background:#7a1f1f;color:#fff;padding:10px 14px;border-radius:8px;font:14px/1.4 sans-serif';d.textContent=t('sv.full');d.onclick=()=>d.remove();document.body.appendChild(d)}catch(e){}}
 if(ok)warned=0};
})();
