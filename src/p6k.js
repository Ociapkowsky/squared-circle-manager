;/* ===== show face/heel/tweener in the wrestler pickers (feuds, booking) ===== */
(function(){const _wb=wBadge;wBadge=function(w){let r='';try{const k=w&&w.role;if(k==='face'||k==='heel'||k==='tweener')r=t('role.'+k).split(' ')[0]+' · '}catch(e){}return _wb.apply(this,arguments)+r}})();
/* ===== To-do "storyline awaits a match": Go books that match on the show card ===== */
(function(){const _ci=cmdItems;cmdItems=function(){const L=_ci.apply(this,arguments);try{const pay=(G.angles||[]).filter(a=>a.pay&&aliveA(a));if(pay.length){const a=pay[0],txt=t('cmd.angle',{a:W(a.ids[0]).name,b:W(a.ids[1]).name,w:a.dl});const it=L.find(x=>x.view==='show'&&x.t===txt);if(it)it.act='angleplace'}}catch(e){}return L};
 cmdCard=function(){const L=cmdItems();return '<div class="card stack"><h3>🧭 '+t('cmd.t')+'</h3>'+(L.length?L.map(x=>'<div class="row spread" style="gap:8px"><span>'+x.i+' '+esc(x.t)+'</span><button class="btn sm" data-act="'+(x.act||'nav')+'" data-v="'+x.view+'">'+t('cmd.go')+'</button></div>').join(''):'<div class="mute">✓ '+t('cmd.ok')+'</div>')+'</div>'};
 Object.assign(ACT,{angleplace(e){if(RUN)return;try{const a=(G.angles||[]).find(x=>x.pay&&aliveA(x));G.screen='show';G.showResult=false;
   if(a&&a.ids.length>=2){const ok=bookable().map(w=>w.id),used=new Set();G.card.forEach(m=>m.a.concat(m.b).forEach(i=>{if(i)used.add(i)}));
    const both=G.card.some(m=>{const all=m.a.concat(m.b);return all.indexOf(a.ids[0])>=0&&all.indexOf(a.ids[1])>=0});
    if(!both&&G.card.length<6&&a.ids.slice(0,2).every(i=>ok.indexOf(i)>=0&&!used.has(i))){const m=emptyMatch();m.mode='1v1';m.a[0]=a.ids[0];m.b[0]=a.ids[1];fixMatch(m);G.card.push(m);try{save()}catch(x){}}}
  }catch(x){}render()}})})();
