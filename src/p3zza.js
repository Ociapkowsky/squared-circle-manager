// ---- v100: polish: dashboard career card, roster brand tags ----
function dashCareer(){const m=meW();if(!m)return '';const b=bkEnsure(),tt=bkTitle(b.lv);
 const pct=b.lv>=BK_MAX?100:Math.round(b.xp/bkNeed(b.lv)*100);
 let bits=[];
 bits.push('<div class="stack" style="gap:4px;min-width:180px;flex:1"><div class="row spread"><b>'+t('bk.lv',{l:b.lv})+' <span class="mute">· '+(lang==='pl'?tt[1]:tt[2])+'</span></b>'+(b.sp>0?'<button class="btn sm gold" data-act="nav" data-v="bk">'+t('dc.sp',{n:b.sp})+'</button>':'')+'</div><div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden"><div style="height:6px;width:'+pct+'%;background:var(--gold)"></div></div></div>');
 bits.push('<div class="stack" style="gap:2px;min-width:140px"><span class="px">'+t('tcg.wallet')+'</span><b>'+money(m.wallet)+'</b><span class="mute" style="font-size:12px">'+t('ls.nw')+': '+money(netWorth())+'</span></div>');
 if(brOn()){const a=brActive(),bp=G.br.pop;bits.push('<div class="stack" style="gap:2px;min-width:160px"><span class="px">'+t('nav.br')+'</span><span>'+brTag(a)+'</span><span class="mute" style="font-size:12px">'+brLbl('A')+' '+Math.round(bp.A)+' · '+brLbl('B')+' '+Math.round(bp.B)+'</span></div>')}
 else if(G.fed.tier>=4)bits.push('<div class="stack" style="gap:2px;min-width:160px"><span class="px">'+t('nav.br')+'</span><button class="btn sm" data-act="nav" data-v="br">'+t('dc.brsplit')+'</button></div>');
 const d=dvEnsure();if(d){const r=dvRival();bits.push('<div class="stack" style="gap:2px;min-width:160px"><span class="px">'+t('nav.dev')+'</span><b>'+esc(r.name)+'</b><span class="mute" style="font-size:12px">'+t('dv.lvl',{l:d.lvl})+' · '+t('dv.cap',{a:dvSent().length,b:dvCapN(d)})+'</span></div>')}
 else if(G.fed.tier>=5)bits.push('<div class="stack" style="gap:2px;min-width:160px"><span class="px">'+t('nav.dev')+'</span><button class="btn sm" data-act="nav" data-v="dev">'+t('dc.dev')+'</button></div>');
 return '<div class="card row" style="gap:18px;flex-wrap:wrap;align-items:flex-start">'+bits.join('')+'</div>'}
const _vd1=vDash;vDash=function(){const h=_vd1();let c='';try{c=dashCareer()}catch(e){}const k='<div class="grid g4">';const i=h.indexOf(k);return i<0||!c?h:h.slice(0,i)+c+h.slice(i)};
const _wc1=wCard;wCard=function(w,extra){if(brOn()&&w.fed===G.fed.id&&!w.ext)extra='<div class="row">'+brTag(brOf(w))+'<button class="btn sm" data-act="brmove" data-id="'+w.id+'"'+(isChamp(w.id)?' disabled':'')+'>→ '+brLbl(brOther(brOf(w)))+'</button></div>'+(extra||'');return _wc1(w,extra)};
Object.assign(D,{'dc.sp':['Punkty umiejętności: {n}','Skill points: {n}'],'dc.brsplit':['Podziel na brandy','Split into brands'],'dc.dev':['Wykup rozwojówkę','Buy a farm league']});
