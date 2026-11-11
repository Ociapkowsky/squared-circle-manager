/* ===== round 11: show card layout, champion/feud markers in pickers, belt editing, retirement lock ===== */
Object.assign(D,{
 'tdx.edit':['Edytuj','Edit'],'tdx.editing':['Edytuj pas','Edit belt'],'tdx.save':['Zapisz zmiany','Save changes'],'tdx.cancel':['Anuluj','Cancel'],
 'tdx.note':['Zmieniasz nazwę i wygląd. Typ pasa, prestiż i obecni mistrzowie zostają bez zmian.','You are changing the name and look. Belt type, prestige and current holders stay as they are.'],
 'sh.up':['Wcześniej w karcie','Earlier on the card'],'sh.down':['Później w karcie','Later on the card'],
 'ch.tag':['Mistrz: {n}','Champion: {n}'],'ch.feudleg':['⚔ = w feudzie','⚔ = in a feud'],'ch.leg':['🏆 mistrz · ⚔ w feudzie','🏆 champion · ⚔ in a feud']
});
/* champion / feud helpers */
function champTitles(id){return G.titles.filter(tt=>tt.holders&&tt.holders.indexOf(id)>=0)}
function inFeud(id){return G.feuds.some(f=>f.A.indexOf(id)>=0||f.B.indexOf(id)>=0)}
function wBadge(w){const c=champTitles(w.id);return (c.length?'🏆 ':'')+(inFeud(w.id)?'⚔ ':'')}
function wOptSty(w){return inFeud(w.id)?' style="color:#e0892b"':champTitles(w.id).length?' style="color:#d4a53a"':''}
function champTag(w){const c=champTitles(w.id);if(!c.length)return '';return c.map(tt=>'<span class="tag" style="color:var(--gold);border-color:var(--gold)">🏆 '+esc(titleName(tt))+'</span>').join('')}
/* show card: vertical list instead of a horizontal scroller, arrows up/down */
mvBtns=function(pos,len){return '<button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="-1" title="'+t('sh.up')+'" aria-label="'+t('sh.up')+'"'+(pos>0?'':' disabled')+'>▲</button><button class="btn sm" data-act="tmove" data-p="'+pos+'" data-d="1" title="'+t('sh.down')+'" aria-label="'+t('sh.down')+'"'+(pos<len-1?'':' disabled')+'>▼</button>'};
(function(){const _sl=slotHtml;slotHtml=function(m,i,pos,len){return _sl.apply(this,arguments).replace('<div class="slot">','<div class="slot mt'+(i===G.card.length-1&&G.card.length>1?' mainev':'')+'">')};
 const _vs=vShow;vShow=function(){let h=_vs.apply(this,arguments);if(h.indexOf('class="tl"')>=0&&h.indexOf('ch-leg')<0)h=h.replace('<div class="tl">','<div class="mute ch-leg" style="font-size:13px">'+t('ch.leg')+'</div><div class="tl">');return h};
 if(typeof document!=='undefined'&&!document.getElementById('p5acss')){const s=document.createElement('style');s.id='p5acss';s.textContent=
 '.tl{display:grid!important;grid-template-columns:minmax(0,1fr);gap:14px;overflow:visible!important;scroll-snap-type:none!important;padding-bottom:0!important}'+
 '.tl>.slot{flex:none!important;width:auto!important;scroll-snap-align:none}'+
 '.slot.mainev{border-color:var(--gold)}'+
 '@media (min-width:900px){.slot.mt{display:grid;grid-template-columns:230px minmax(0,1fr);column-gap:16px;row-gap:0}.slot.mt>*{margin-bottom:10px}.slot.mt>:first-child{grid-column:1/-1}.slot.mt>.poster{grid-column:1;grid-row:2/span 9;align-self:start}.slot.mt>:not(:first-child):not(.poster){grid-column:2}}'+
 '.slot .btn[disabled]{opacity:.35}';
 document.head.appendChild(s)}
})();
/* belt editing */
Object.assign(ACT,{
 tdedit(e){const tt=titleOf(e.dataset.id);if(!tt)return;const tag=tt.teams===2;
  const d=Object.assign({},BPRESETS.classic,{strap:'#1a1a1a',strap2:'#f2c94c',pat:'plain',plate:'gold',mainShape:'oval',mainEmb:tag?'none':'letter',sideN:1,sideShape:'rect',sideEmb:'gem'});
  BELTKEYS.forEach(k=>{if(tt[k]!==undefined)d[k]=tt[k]});d.name=titleName(tt);d.teams=tt.teams;d.prestige=tt.prestige||3;d.g=tt.g||'m';G.td=d;G.tdEdit=tt.id;render();
  const el=document.getElementById('tdname');if(el&&el.scrollIntoView)el.scrollIntoView({block:'center'})},
 tdsave(){const tt=titleOf(G.tdEdit),d=tdraft();if(!tt){G.tdEdit=null;G.td=null;render();return}
  const el=document.getElementById('tdname');const nm=((el&&el.value)||d.name||'').trim().slice(0,30);
  if(nm)tt.name=nm;BELTKEYS.forEach(k=>{if(d[k]!==undefined)tt[k]=d[k]});G.td=null;G.tdEdit=null;save();render()},
 tdcancel(){G.td=null;G.tdEdit=null;render()}
});
(function(){const _tc=tdCreator;tdCreator=function(){let h=_tc.apply(this,arguments);if(!G.tdEdit)return h;
 h=h.replace('<h3>'+t('t.create')+'</h3>','<h3>'+t('tdx.editing')+'</h3><div class="note">'+t('tdx.note')+'</div>');
 const a=h.indexOf('<div class="grid g2" style="gap:8px"><div><label class="px" for="tdteams"');
 if(a>=0){const e=h.indexOf('</select></div></div>',h.indexOf('for="tdpres"',a));if(e>=0)h=h.slice(0,a)+h.slice(e+'</select></div></div>'.length)}
 const g0='<div class="px">'+t('g.div')+'</div><div class="sw">';const b=h.indexOf(g0);
 if(b>=0){const e=h.indexOf('</div>',b+g0.length);if(e>=0)h=h.slice(0,b)+h.slice(e+6)}
 h=h.replace('<button class="btn gold" data-act="tdcreate">'+t('t.add')+'</button>','<button class="btn gold" data-act="tdsave">'+t('tdx.save')+'</button> <button class="btn" data-act="tdcancel">'+t('tdx.cancel')+'</button>');
 return h}})();
/* retirement: once agreed, it cannot be cancelled from the roster */
ACT.cancelfw=function(){};
if(typeof normTexts==='function')normTexts();
Object.assign(D,{'sh.timeline':['Kolejność gali (od góry do dołu)','Show order (top to bottom)']});
