;/* roster preview on the federation picker */
(function(){
Object.assign(D,{'fp.btn':['👁 Podgląd rosteru','👁 Preview roster'],'fp.title':['Roster: {n}','Roster: {n}'],'fp.close':['Zamknij','Close'],'fp.sort':['Sortuj:','Sort:'],'fp.pop':['Popularność','Popularity'],'fp.ring':['Ring','Ring'],'fp.age':['Wiek','Age'],'fp.name':['Nazwa','Name'],'fp.empty':['Ta federacja startuje bez rosteru.','This promotion starts with no roster.'],'fp.avg':['Średnia popularność: {a} · {m} zawodników, {f} kobiet','Average popularity: {a} · {m} wrestlers, {f} women']});
let SORT='pop';
function body(id){
 const f=PACK.feds.find(x=>x.id===id);if(!f)return '';
 let ws=PACK.wrestlers.filter(w=>w.fed===id);
 const key={pop:(a,b)=>b.pop-a.pop,ring:(a,b)=>b.ring-a.ring,age:(a,b)=>a.age-b.age,name:(a,b)=>a.name.localeCompare(b.name)}[SORT]||((a,b)=>b.pop-a.pop);
 ws=ws.slice().sort(key);
 const fem=ws.filter(w=>w.g==='f').length,avg=ws.length?Math.round(ws.reduce((s,w)=>s+w.pop,0)/ws.length):0;
 let h='<h2>'+esc(f.name)+'</h2>';
 if(!ws.length)return h+'<p class="mute">'+esc(t('fp.empty'))+'</p><div class="row" style="justify-content:flex-end"><button class="btn" data-act="fpclose">'+esc(t('fp.close'))+'</button></div>';
 h+='<p class="mute" style="margin:0 0 8px">'+esc(t('fp.avg',{a:avg,m:ws.length,f:fem}))+'</p>';
 h+='<div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:8px"><span class="px">'+esc(t('fp.sort'))+'</span>'+['pop','ring','age','name'].map(k=>'<button class="btn sm'+(SORT===k?' gold':'')+'" data-act="fpsort" data-k="'+k+'" data-v="'+esc(id)+'">'+esc(t('fp.'+k))+'</button>').join('')+'</div>';
 h+='<div style="max-height:56vh;overflow:auto;display:grid;gap:6px;padding-right:4px">'+ws.map(w=>{
  const tag=w.g==='f'?' ♀':'';
  return '<div class="row" style="flex-wrap:nowrap;gap:10px;align-items:center;border:1px solid var(--line);border-radius:8px;padding:5px 8px"><div class="av" style="min-width:36px;padding:2px">'+avatar(w.look,44)+'</div><div style="min-width:0;flex:1"><div class="wname" style="font-size:14px">'+esc(w.name)+tag+'</div><div class="mute" style="font-size:12px">'+esc(cn(w.country))+' · '+esc(t('style.'+w.style))+' · '+esc(t('st.age',{n:w.age}))+'</div></div><div style="text-align:right;font-size:12px;white-space:nowrap">Pop <b>'+w.pop+'</b><br>Ring <b>'+w.ring+'</b></div></div>'}).join('')+'</div>';
 return h+'<div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn" data-act="fpclose">'+esc(t('fp.close'))+'</button></div>';
}
Object.assign(ACT,{fpreview(el){try{openModal(body(el.dataset.v))}catch(e){}},fpsort(el){try{SORT=el.dataset.k;openModal(body(el.dataset.v))}catch(e){}},fpclose(){closeModal()}});
const _vs=viewStart;viewStart=function(){let h=_vs.apply(this,arguments);try{if(typeof h==='string')h=h.replace(/<button class="btn gold" data-act="start" data-v="([^"]*)">/g,(m,id)=>'<button class="btn" data-act="fpreview" data-v="'+id+'">'+esc(t('fp.btn'))+'</button> '+m)}catch(e){}return h};
})();
if(typeof normTexts==="function")normTexts();
