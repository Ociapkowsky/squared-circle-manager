;/* ===== Belt history: reigns, longest reigns, most reigns ===== */
(function(){
Object.assign(D,{'bh.title':['Historia pasów','Title history'],'bh.hist':['Mistrzowie','Champions'],'bh.long':['Najdłuższe panowania','Longest reigns'],'bh.most':['Najwięcej panowań','Most reigns'],'bh.all':['Wszystkie pasy','All titles'],'bh.now':['obecnie','current'],'bh.wk':['tyg.','wk'],'bh.def':['obron','defences'],'bh.vac':['Pas wakujący','Vacant'],'bh.none':['Brak historii: pas nie zmienił jeszcze właściciela.','No history yet: the title has not changed hands.'],'bh.times':['razy','times'],'bh.total':['łącznie','total'],'bh.click':['Kliknij pas, żeby zobaczyć jego historię','Click a belt to see its history'],'bh.since':['od tygodnia {w}','since week {w}'],'bh.reign':['panowanie','reign']});
let UI={tid:null,view:'hist'};
function keyOf(ids){return ids.slice().sort().join('+')}
function trk(){if(!G.thx)G.thx={};return G.thx}
function thxTick(){const T=trk();G.titles.forEach(tt=>{const key=keyOf(tt.holders||[]);let r=T[tt.id];
  if(!r){r=T[tt.id]={cur:null,list:[]}}
  if(r.cur&&r.cur.key===key){r.cur.d=Math.max(r.cur.d||0,tt.def||0);r.cur.n=tt.holders.length?names(tt.holders):r.cur.n;return}
  if(r.cur&&r.cur.ids.length){r.list.push({n:r.cur.n,ids:r.cur.ids,s:r.cur.s,e:G.week,d:r.cur.d||0})}
  r.cur={key:key,ids:(tt.holders||[]).slice(),n:(tt.holders||[]).length?names(tt.holders):'',s:(tt.holders||[]).length?(r.cur?G.week:(tt.since||G.week)):G.week,d:tt.def||0}})}
const _ew2=endWeek;endWeek=function(){try{thxTick()}catch(e){}return _ew2.apply(this,arguments)};
function reigns(tid){const T=trk();const out=[];const add=(tt)=>{const r=T[tt.id];if(!r)return;r.list.forEach(x=>out.push({tid:tt.id,n:x.n,s:x.s,e:x.e,d:x.d,cur:false,key:keyOf(x.ids)}));if(r.cur&&r.cur.ids.length)out.push({tid:tt.id,n:r.cur.n,s:r.cur.s,e:G.week,d:Math.max(r.cur.d||0,tt.def||0),cur:true,key:r.cur.key})};
 if(tid==='all')G.titles.forEach(add);else{const tt=G.titles.find(x=>x.id===tid);if(tt)add(tt)}return out}
const wks=r=>Math.max(1,r.e-r.s);
const tn=id=>{const tt=G.titles.find(x=>x.id===id);return tt?titleName(tt):'?'};
function view(){thxTick();const tid=UI.tid||(G.titles[0]&&G.titles[0].id);UI.tid=tid;const rs=reigns(tid);
 let h='<div class="row spread"><h2 style="margin:0">'+esc(t('bh.title'))+'</h2><button class="btn sm" data-act="mclose">'+t('f.close')+'</button></div><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px">'+G.titles.map(tt=>'<button class="btn sm'+(UI.tid===tt.id?' gold':'')+'" data-act="thxsel" data-t="'+tt.id+'">'+esc(titleName(tt))+'</button>').join('')+'<button class="btn sm'+(UI.tid==='all'?' gold':'')+'" data-act="thxsel" data-t="all">'+esc(t('bh.all'))+'</button></div>'+
  '<div class="row" style="gap:6px;margin:8px 0">'+['hist','long','most'].map(v=>'<button class="btn sm'+(UI.view===v?' gold':'')+'" data-act="thxview" data-v="'+v+'">'+esc(t('bh.'+v))+'</button>').join('')+'</div>';
 const multi=UI.tid==='all',tcol=r=>multi?'<td class="mute">'+esc(tn(r.tid))+'</td>':'';
 if(!rs.length)return h+'<div class="note">'+esc(t('bh.none'))+'</div><div class="row" style="margin-top:8px"><button class="btn" data-act="mclose">'+t('f.close')+'</button></div>';
 let rows='';
 if(UI.view==='hist'){rs.slice().sort((a,b)=>(b.cur?1:0)-(a.cur?1:0)||b.s-a.s||b.e-a.e).forEach((r,i)=>{rows+='<tr><td class="mute">'+(r.cur?'▶':'')+'</td><td><b>'+esc(r.n)+'</b>'+(r.cur?' <span class="tag">'+esc(t('bh.now'))+'</span>':'')+'</td>'+tcol(r)+'<td class="mute">W'+r.s+(r.cur?'':'–W'+r.e)+'</td><td><b>'+wks(r)+'</b> '+esc(t('bh.wk'))+'</td><td class="mute">'+r.d+' '+esc(t('bh.def'))+'</td></tr>'})}
 else if(UI.view==='long'){rs.slice().sort((a,b)=>wks(b)-wks(a)).slice(0,12).forEach((r,i)=>{rows+='<tr><td class="mute">'+(i+1)+'.</td><td><b>'+esc(r.n)+'</b>'+(r.cur?' <span class="tag">'+esc(t('bh.now'))+'</span>':'')+'</td>'+tcol(r)+'<td><b>'+wks(r)+'</b> '+esc(t('bh.wk'))+'</td><td class="mute">'+r.d+' '+esc(t('bh.def'))+'</td></tr>'})}
 else{const g={};rs.forEach(r=>{const o=g[r.key+(multi?'':'')]=g[r.key]||{n:r.n,c:0,w:0};o.c++;o.w+=wks(r);o.n=r.n});Object.values(g).sort((a,b)=>b.c-a.c||b.w-a.w).slice(0,12).forEach((o,i)=>{rows+='<tr><td class="mute">'+(i+1)+'.</td><td><b>'+esc(o.n)+'</b></td><td><b>'+o.c+'</b> '+esc(t('bh.times'))+'</td><td class="mute">'+esc(t('bh.total'))+' '+o.w+' '+esc(t('bh.wk'))+'</td></tr>'})}
 return h+'<div class="scroll" style="max-height:52vh;overflow:auto"><table><tbody>'+rows+'</tbody></table></div><div class="row" style="margin-top:8px"><button class="btn" data-act="mclose">'+t('f.close')+'</button></div>'}
const _vt=vTitles;vTitles=function(){let h=_vt.apply(this,arguments);try{let i=0;h=h.replace(/<div class="beltbox">/g,()=>{const tt=G.titles[i++];return tt?'<div class="beltbox" data-act="thx" data-t="'+tt.id+'" style="cursor:pointer" title="'+esc(t('bh.click'))+'">':'<div class="beltbox">'});
  h=h.replace('</div><div class="grid g2">','</div><div class="mute" style="font-size:13px">📜 '+esc(t('bh.click'))+'</div><div class="grid g2">')}catch(e){}return h};
Object.assign(ACT,{thx(e){UI.tid=e.dataset.t;UI.view='hist';openModal(view())},thxsel(e){UI.tid=e.dataset.t;openModal(view())},thxview(e){UI.view=e.dataset.v;openModal(view())}});
})();
try{document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const m=document.getElementById('modal');if(m&&!m.hidden&&m.querySelector('[data-act="mclose"]'))closeModal()})}catch(e){}
if(typeof normTexts==="function")normTexts();
