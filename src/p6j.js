;/* ===== change country and gender of your wrestlers in the editor ===== */
(function(){const _ae=avEditor;avEditor=function(id){let h=_ae.apply(this,arguments);try{const w=W(id);if(!w||w.fed!==G.fed.id)return h;
  const g=w.g==='f'?'f':'m';
  const f='<div class="grid g2" style="gap:8px;margin-top:8px"><div><label class="px" for="avcountry">'+t('av.country')+'</label><select id="avcountry" class="field" data-chg="avcountry" data-id="'+id+'">'+COUNTRIES.map(c=>'<option value="'+c+'"'+(w.country===c?' selected':'')+'>'+cn(c)+'</option>').join('')+'</select></div>'+
   '<div><label class="px" for="avgender">'+t('av.gender')+'</label><select id="avgender" class="field" data-chg="avgender" data-id="'+id+'"><option value="m"'+(g==='m'?' selected':'')+'>'+t('av.g.m')+'</option><option value="f"'+(g==='f'?' selected':'')+'>'+t('av.g.f')+'</option></select></div></div><div id="avmsg" class="mute" style="font-size:13px;margin-top:4px" role="status"></div>';
  const m=h.indexOf('<button class="btn sm" data-act="avrand"');if(m>=0){const e=h.indexOf('</button>',m)+9;h=h.slice(0,e)+f+h.slice(e)}}catch(e){}return h};
 Object.assign(CHG,{
  avcountry(e){try{const w=W(e.dataset.id);if(!w||w.fed!==G.fed.id||COUNTRIES.indexOf(e.value)<0)return;w.country=e.value;try{save()}catch(x){}render()}catch(x){}},
  avgender(e){try{const w=W(e.dataset.id);if(!w||w.fed!==G.fed.id)return;const ng=e.value==='f'?'f':'m',msg=document.getElementById('avmsg');
   const held=G.titles.find(tt=>tt.holders.indexOf(w.id)>=0&&(tt.g||'m')!=='x'&&(tt.g==='f')!==(ng==='f'));
   if(held){e.value=w.g==='f'?'f':'m';if(msg)msg.textContent=t('av.gblock',{t:titleName(held)});return}
   w.g=ng;try{save()}catch(x){}render();if(msg)msg.textContent=''}catch(x){}}});
})();
Object.assign(D,{'av.country':['Kraj','Country'],'av.gender':['Płeć','Gender'],'av.g.m':['Mężczyzna','Male'],'av.g.f':['Kobieta','Female'],
 'av.gblock':['Najpierw odbierz tytuł „{t}”, potem zmienisz płeć.','Strip the “{t}” title first, then change gender.']});
if(typeof normTexts==="function")normTexts();
