/* ===== rename your wrestlers in the appearance editor ===== */
(function(){const _ae=avEditor;avEditor=function(id){let h=_ae.apply(this,arguments);try{const w=W(id);if(!w)return h;
  const m='<b>'+esc(w.name)+'</b>';const f='<div><label class="px" for="avname">'+t('av.name')+'</label><input id="avname" class="field" maxlength="30" value="'+esc(w.name)+'" data-chg="avname" data-id="'+id+'" autocomplete="off"></div>';
  if(h.indexOf(m)>=0)h=h.replace(m,f)}catch(e){}return h};
 Object.assign(CHG,{avname(e){try{const w=W(e.dataset.id);if(!w)return;const v=String(e.value||'').replace(/\s+/g,' ').trim().slice(0,30);if(!v){e.value=w.name;return}
   if(v===w.name)return;w.name=v;try{save()}catch(x){}render()}catch(x){}}})})();
Object.assign(D,{'r.edit':['Edytuj','Edit'],'av.title':['Edycja zawodnika','Edit wrestler'],'av.name':['Imię i nazwisko (lub ksywa)','Name (or ring name)']});
if(typeof normTexts==="function")normTexts();
