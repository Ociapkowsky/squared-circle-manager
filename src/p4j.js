// ---- v101: roster filters (brand, status, name search) ----
const RFUI={br:'',st:'',q:'',sb:''};
function rfPass(w){
 if(RFUI.br&&brOn()&&(w.br||'A')!==RFUI.br)return false;
 if(RFUI.sb){const sb=stableOf(w.id);if(!sb||sb.id!==RFUI.sb)return false}
 const q=(RFUI.q||'').trim().toLowerCase();if(q&&w.name.toLowerCase().indexOf(q)<0)return false;
 switch(RFUI.st){
  case 'inj':return w.injury>0;
  case 'ok':return !(w.injury>0);
  case 'champ':return isChamp(w.id);
  case 'exp':return w.contract<=8;
  case 'low':return (w.morale||0)<40;
  case 'tired':return (w.fatigue||0)>=60;
  case 'young':return w.age<=25;
  case 'vet':return w.age>=34;
  case 'foreign':return foreign(w);
 }
 return true}
function rfBar(all,list){
 const so=(v,l)=>'<option value="'+v+'"'+(RFUI.st===v?' selected':'')+'>'+t('rf.st.'+l)+'</option>';
 const brSel=brOn()?'<select class="field" style="width:auto" data-chg="rfbr"><option value="">'+t('rf.br.all')+'</option>'+['A','B'].map(b=>'<option value="'+b+'"'+(RFUI.br===b?' selected':'')+'>'+brLbl(b)+'</option>').join('')+'</select>':'';
 return '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">'+brSel+
  '<select class="field" style="width:auto" data-chg="rfst"><option value="">'+t('rf.st.all')+'</option>'+so('ok','ok')+so('inj','inj')+so('champ','champ')+so('exp','exp')+so('low','low')+so('tired','tired')+so('young','young')+so('vet','vet')+so('foreign','foreign')+'</select>'+
  (G.stables&&G.stables.length?'<select class="field" style="width:auto" data-chg="rfsb"><option value="">'+t('rf.sb.all')+'</option>'+G.stables.map(x=>'<option value="'+x.id+'"'+(RFUI.sb===x.id?' selected':'')+'>'+esc(x.name)+'</option>').join('')+'</select>':'')+
  '<input class="field" style="width:180px;max-width:100%" data-chg="rfq" placeholder="'+t('rf.q')+'" value="'+esc(RFUI.q||'')+'">'+
  ((RFUI.br||RFUI.st||RFUI.q||RFUI.sb)?'<button class="btn sm" data-act="rfreset">'+t('rf.reset')+'</button>':'')+
  '<span class="mute" style="font-size:13px">'+t('rf.shown',{a:list.length,b:all.length})+'</span></div>'}
vRoster=function(){
 const all=mine(),list=all.filter(w=>(!G.rgen||(G.rgen==='f')===(w.g==='f'))&&rfPass(w)).sort((a,b)=>G.sort==='ct'?CONTS.indexOf(contOf(a.country))-CONTS.indexOf(contOf(b.country))||cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='cn'?cn(a.country).localeCompare(cn(b.country))||b.pop-a.pop:G.sort==='name'?a.name.localeCompare(b.name):G.sort==='ring'?b.ring-a.ring:b.pop-a.pop);
 let h='<div class="top"><div><h2>'+t('r.title')+'</h2><div class="mute">'+t('r.limit',{n:all.length,m:ROSTERMAX[G.fed.tier-1]})+'</div></div><div class="row"><select class="field" style="width:auto" data-chg="rgen"><option value="">'+t('g.all')+'</option><option value="m"'+(G.rgen==='m'?' selected':'')+'>'+t('g.m')+'</option><option value="f"'+(G.rgen==='f'?' selected':'')+'>'+t('g.f')+'</option></select><label class="px" for="sort">'+t('r.sort')+'</label><select id="sort" class="field" style="width:auto" data-chg="sort"><option value="pop"'+(G.sort==='pop'?' selected':'')+'>'+t('r.sortpop')+'</option><option value="ring"'+(G.sort==='ring'?' selected':'')+'>'+t('r.sortring')+'</option><option value="name"'+(G.sort==='name'?' selected':'')+'>'+t('r.sortname')+'</option><option value="ct"'+(G.sort==='ct'?' selected':'')+'>'+t('ui.sCt')+'</option><option value="cn"'+(G.sort==='cn'?' selected':'')+'>'+t('ui.sCn')+'</option></select></div></div>';
 return h+rfBar(all,list)+'<div class="grid gW">'+list.map(w=>wCard(w,'<div class="row"><button class="btn sm" data-act="avedit" data-id="'+w.id+'">'+t('r.edit')+'</button><button class="btn sm" data-act="neg" data-id="'+w.id+'">'+t('ng.btn')+'</button><button class="btn sm" data-act="renew" data-id="'+w.id+'"'+(G.fed.cash<w.salary*10?' disabled':'')+'>'+t('r.renew')+' ('+money(w.salary*10)+')</button><button class="btn sm" data-act="retire" data-id="'+w.id+'">'+t('r.retire')+'</button><button class="btn sm danger" data-act="release" data-id="'+w.id+'">'+t('r.release')+'</button></div>'+(w.farewell?'<div class="row"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('rt.tag',{n:wks(Math.max(0,w.farewell.left)),r:w.farewell.role?t('sr.'+w.farewell.role):t('rt.norole')})+'</span><button class="btn sm" data-act="cancelfw" data-id="'+w.id+'">'+t('rt.cancel2')+'</button></div>':''))).join('')+'</div>';
};

Object.assign(CHG,{rfbr(e){RFUI.br=e.value;render()},rfst(e){RFUI.st=e.value;render()},rfsb(e){RFUI.sb=e.value;render()},rfq(e){RFUI.q=e.value;render()}});
Object.assign(ACT,{rfreset(){RFUI.br='';RFUI.st='';RFUI.q='';RFUI.sb='';render()}});
Object.assign(D,{'rf.br.all':['Oba brandy','Both brands'],'rf.st.all':['Każdy status','Any status'],'rf.st.ok':['Zdrowi','Healthy'],'rf.st.inj':['Kontuzjowani','Injured'],'rf.st.champ':['Mistrzowie','Champions'],'rf.st.exp':['Kończy się kontrakt (≤8 tyg.)','Contract ending (≤8 wks)'],'rf.st.low':['Niski nastrój','Low morale'],'rf.st.tired':['Zmęczeni','Tired'],'rf.st.young':['Młodzi (≤25)','Young (≤25)'],'rf.st.vet':['Weterani (34+)','Veterans (34+)'],'rf.st.foreign':['Zagraniczni','Foreign'],'rf.q':['Szukaj nazwiska…','Search name…'],'rf.sb.all':['Każda stajnia','Any stable'],'rf.reset':['Wyczyść filtry','Clear filters'],'rf.shown':['Pokazano {a} z {b}','Showing {a} of {b}']});
