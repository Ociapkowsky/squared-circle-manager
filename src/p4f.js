// ---- Calendar view ----
function calChosen(){const hs=healthy().filter(w=>intvOk(w)).sort((a,b)=>b.pop-a.pop);let w=hs.find(x=>x.id===G.calSel);if(!w){w=hs[0];G.calSel=w?w.id:''}return{w,hs}}
function calMatchRow(r,c,m,i,w){
 const iv=G.intv&&G.intv.wk===G.week&&G.intv.fed===r.id&&G.intv.mi===i?G.intv:null;
 const btn=s=>{const on=iv&&iv.side===s;const ch=w?Math.round(intvChance(w,m,c)*100):0;
  return '<button class="btn sm'+(on?' gold':'')+'" data-act="intv" data-f="'+esc(r.id)+'" data-i="'+i+'" data-s="'+s+'"'+(w?'':' disabled')+'>'+t('cal.help',{n:esc(s==='a'?m.an:m.bn)})+(w?' · '+ch+'%':'')+'</button>'};
 return '<div class="row spread" style="gap:8px;padding:6px 0;border-top:1px solid var(--line);flex-wrap:wrap"><div style="min-width:0"><b>'+esc(m.an)+'</b> <span class="mute">vs</span> <b>'+esc(m.bn)+'</b>'+(m.main?' <span class="tag">'+t('cal.main')+'</span>':'')+(iv?' <span class="tag" style="color:var(--gold)">'+t('cal.set',{n:esc(W(iv.wid)?W(iv.wid).name:'?')})+'</span>':'')+'</div><div class="row" style="gap:6px">'+btn('a')+btn('b')+'</div></div>'}
function calFeds(){if(G.calAll)return G.rivals;const near=G.rivals.slice().sort((a,b)=>Math.abs(a.pop-G.fed.pop)-Math.abs(b.pop-G.fed.pop));const s=new Set(near.slice(0,6).map(r=>r.id));near.forEach(r=>{if(s.size<10&&rvBig(r,G.week))s.add(r.id)});return G.rivals.filter(r=>s.has(r.id))}
function vCal(){
 const {w,hs}=calChosen();
 let h='<div class="top"><div><h2>'+t('cal.title')+'</h2><div class="mute" style="max-width:70ch">'+t('cal.sub')+'</div></div></div>';
 // this week
 h+='<div class="card stack"><div class="row spread"><h3>'+t('cal.thisweek',{n:G.week})+'</h3>'+(isBig()?'<span class="tag" style="color:var(--gold)">★ '+esc(bigName())+'</span>':'')+'</div>'+
  '<div class="mute" style="font-size:13px">'+t('cal.ownnow',{n:G.card.length})+'</div>';
 if(G.intv&&G.intv.wk===G.week){const rv=G.rivals.find(x=>x.id===G.intv.fed);h+='<div class="note gold row spread"><span>'+t('cal.active',{w:esc(W(G.intv.wid)?W(G.intv.wid).name:'?'),f:esc(rv?rv.name:'?')})+'</span><button class="btn sm danger" data-act="intvx">'+t('cal.cancel')+'</button></div>'}
 h+='<div><label class="px" for="calw">'+t('cal.pick')+'</label><select id="calw" class="field" data-chg="calw">'+(hs.length?hs.map(x=>'<option value="'+x.id+'"'+(w&&x.id===w.id?' selected':'')+'>'+esc(x.name)+' · '+t('st.pop')+' '+Math.round(x.pop)+'</option>').join(''):'<option value="">—</option>')+'</select><div class="mute" style="font-size:12px">'+t('cal.rules')+'</div></div></div>';
 h+='<div class="row spread"><span class="mute">'+t(G.calAll?'cal.all':'cal.near',{n:calFeds().length})+'</span><button class="btn sm" data-act="calall">'+t(G.calAll?'cal.shownear':'cal.showall')+'</button></div><div class="grid g2">'+calFeds().map(r=>{const c=rivalShow(r,G.week);
  return '<div class="card stack"><div class="row spread"><div class="row" style="gap:8px"><span class="dot" style="background:'+esc(r.color||'#888')+'"></span><b>'+esc(r.name)+'</b></div>'+(c&&c.big?'<span class="tag" style="color:var(--gold)">★ '+esc(c.name)+'</span>':'<span class="tag">'+t('cal.show')+'</span>')+'</div>'+
   (c&&c.ms.length?c.ms.map((m,i)=>calMatchRow(r,c,m,i,w)).join(''):'<div class="mute">'+t('cal.nocard')+'</div>')+'</div>'}).join('')+'</div>';
 // schedule
 const feds=[G.fed].concat(calFeds());
 let rows='';for(let k=0;k<12;k++){const wk=G.week+k;rows+='<tr'+(k===0?' style="background:var(--panel2)"':'')+'><td class="mute">'+t('cal.wk',{n:wk})+'</td>'+feds.map(f=>{const own=f.id===G.fed.id;const big=own?wk%4===0:rvBig(f,wk);const nm=own?ownBigName(wk):rvBigName(f,wk);
   return '<td>'+(big?'<b style="color:var(--gold)">★ '+esc(nm)+'</b>':'<span class="mute">•</span>')+'</td>'}).join('')+'</tr>'}
 h+='<div class="card stack"><h3>'+t('cal.sched')+'</h3><div class="scroll"><table><thead><tr><th>'+t('cal.week')+'</th>'+feds.map(f=>'<th><span class="dot" style="background:'+esc(f.color||'#888')+'"></span> '+esc(f.short||f.name)+'</th>').join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div><div class="mute" style="font-size:12px">'+t('cal.legend')+'</div></div>';
 // results
 let res='';Object.values(G.cal||{}).filter(c=>c.done).sort((a,b)=>b.wk-a.wk).slice(0,12).forEach(c=>{const r=G.rivals.find(x=>x.id===c.fed);const m=c.ms[0];if(!r||!m)return;const wn=m.w==='a'?m.an:m.bn,ln=m.w==='a'?m.bn:m.an;
  const iv=c.ms.find(x=>x.intv);res+='<div class="row spread" style="gap:8px;padding:4px 0;border-top:1px solid var(--line);flex-wrap:wrap"><span><span class="mute">'+t('cal.wk',{n:c.wk})+'</span> · '+esc(r.name)+(c.big?' ★':'')+': <b>'+esc(wn)+'</b> '+t('cal.def')+' '+esc(ln)+'</span>'+(iv?'<span class="tag" style="color:var('+(iv.intv==='ok'?'--gold':'--bad,#c44')+')">'+t('cal.'+(iv.intv==='ok'?'ok':'fail'))+'</span>':'')+'</div>'});
 if(res)h+='<div class="card stack"><h3>'+t('cal.results')+'</h3>'+res+'</div>';
 return h}
Object.assign(ACT,{
 intv(e){const d=e.dataset;if(!G.intv||G.intv.wk!==G.week||true){const wid=calChosen().w;if(wid&&setIntv(d.f,+d.i,wid.id,d.s))save()}render()},
 calall(){G.calAll=!G.calAll;render()},
 intvx(){G.intv=null;save();render()}});
Object.assign(CHG,{calw(e){G.calSel=e.value;render()}});
