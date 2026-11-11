/* ===== Stipulation picker: search, category filter, favorites, recents, recommendations ===== */
const STPK_LS='ringboss.stipfav.v1';
let STPK={i:-1,q:'',c:'all'};
function stpLoad(){try{const o=JSON.parse(localStorage.getItem(STPK_LS)||'{}');return{fav:Array.isArray(o.fav)?o.fav:[],rec:Array.isArray(o.rec)?o.rec:[]}}catch(e){return{fav:[],rec:[]}}}
function stpSaveLS(o){try{localStorage.setItem(STPK_LS,JSON.stringify(o))}catch(e){}}
function stpNorm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l')}
function stpFit(m,k){try{return stipBonus(Object.assign({},m,{stip:k}))/20}catch(e){return 0}}
function stpFeud(m){try{const fo=feudOf(m);const f=fo?fo.f:null;return{fav:(f&&f.fav)||'',sc:(f&&SC[f.sc]&&SC[f.sc].stip)||''}}catch(e){return{fav:'',sc:''}}}
function stpLock(m,k){const s=STIPS[k];if(!s)return'';
 if(G.fed.tier<s.tier)return t('stip.lock',{v:t('tier.'+s.tier)});
 if(lvlOf(k)>maxLvl())return t('stip.plat');
 if(STNEED[k]&&!stNeedOk(m,STNEED[k]))return t('stip.need',{v:t('stip.need.'+STNEED[k])});
 return''}
function stpRec(m,k,fe){if(k==='none')return false;if(k===fe.fav||(fe.sc&&k===fe.sc))return true;return stpFit(m,k)>=.15}
function stpFitTxt(v){const r=Math.round(v*20)/20;return(r>0?'+':r<0?'−':'')+Math.abs(r).toFixed(2).replace(/0$/,'')+'★'}
function stpBadge(m,k,fe){
 if(k==='none')return'';let h='';const f=stpFit(m,k);
 if(k===fe.fav)h+='<span class="stpg">'+esc(t('stp.favfeud'))+'</span>';
 else if(fe.sc&&k===fe.sc)h+='<span class="stpg">'+esc(t('stp.scfeud'))+'</span>';
 if(Math.abs(f)>=.05)h+='<span class="stpf2 '+(f>0?'up':'dn')+'" title="'+esc(t('stp.fitlbl'))+'">'+stpFitTxt(f)+'</span>';
 const c=STIPS[k].cost;h+='<span class="stpc" title="'+esc(t('stp.cost'))+'">'+(c<.05?'$':c<.12?'$$':'$$$')+'</span>';
 if(STIPS[k].inj>=2)h+='<span class="stpi" title="'+esc(t('stp.inj'))+'">⚠</span>';
 return h}
function stpRow(m,k,fav,fe){
 const lock=stpLock(m,k),on=m.stip===k,isF=fav.indexOf(k)>=0;
 const desc=k==='none'?t('stp.nonedesc'):t('stipd.'+k);
 return '<div class="stpr'+(on?' on':'')+(lock?' lk':'')+'"><button class="stpm" '+(lock?'disabled ':'')+'data-act="stpset" data-k="'+k+'"><span class="stpn">'+esc(k==='none'?t('stp.none'):t('stip.'+k))+'</span><span class="stpd">'+esc(lock||desc)+'</span><span class="stpbd">'+stpBadge(m,k,fe)+'</span></button>'+(k==='none'?'':'<button class="stpfv'+(isF?' on':'')+'" data-act="stpfav" data-k="'+k+'" aria-label="'+esc(t('stp.fav'))+'" aria-pressed="'+(isF?'true':'false')+'">'+(isF?'★':'☆')+'</button>')+'</div>'}
function stpList(m){
 const o=stpLoad(),fe=stpFeud(m),q=stpNorm(STPK.q.trim());
 let keys=Object.keys(STIPS).filter(k=>k!=='none'&&(k!=='tourney'||m.stip==='tourney'));
 const nm=k=>stpNorm(t('stip.'+k)+' '+(D['stip.'+k]?D['stip.'+k][0]+' '+D['stip.'+k][1]:'')+' '+k+' '+t('stipd.'+k));
 if(q)keys=keys.filter(k=>q.split(/\s+/).every(w=>nm(k).indexOf(w)>=0));
 const c=STPK.c;
 if(c==='fav')keys=keys.filter(k=>o.fav.indexOf(k)>=0);
 else if(c==='recent')keys=o.rec.filter(k=>keys.indexOf(k)>=0);
 else if(c==='rec')keys=keys.filter(k=>stpRec(m,k,fe)&&!stpLock(m,k));
 else if(c!=='all')keys=keys.filter(k=>STCAT[k]===c);
 const sortK=(a,b)=>{const la=stpLock(m,a)?1:0,lb=stpLock(m,b)?1:0;if(la!==lb)return la-lb;const ra=(a===fe.fav||a===fe.sc)?1:0,rb=(b===fe.fav||b===fe.sc)?1:0;if(ra!==rb)return rb-ra;const fa=stpFit(m,a),fb=stpFit(m,b);if(Math.abs(fa-fb)>.001)return fb-fa;return STIPS[a].tier-STIPS[b].tier};
 let h='';
 const row=k=>stpRow(m,k,o.fav,fe);
 if(c==='all'&&!q){
  h+=row('none');
  const rc=keys.filter(k=>stpRec(m,k,fe)&&!stpLock(m,k)).sort(sortK).slice(0,5);
  if(rc.length)h+='<div class="stph">'+esc(t('stp.rec'))+'</div>'+rc.map(row).join('');
  const fv=keys.filter(k=>o.fav.indexOf(k)>=0);if(fv.length)h+='<div class="stph">★ '+esc(t('stp.fav'))+'</div>'+fv.sort(sortK).map(row).join('');
  const rs=o.rec.filter(k=>keys.indexOf(k)>=0).slice(0,5);if(rs.length)h+='<div class="stph">'+esc(t('stp.recent'))+'</div>'+rs.map(row).join('');
  STCATS.forEach(cc=>{const ks=keys.filter(k=>STCAT[k]===cc[0]).sort(sortK);if(ks.length)h+='<div class="stph">'+esc(t('stc.'+cc[0]))+' <small>'+ks.length+'</small></div>'+ks.map(row).join('')});
  const seen=new Set(STCATS.map(x=>x[0]));const rest=keys.filter(k=>!seen.has(STCAT[k]));if(rest.length)h+=rest.sort(sortK).map(row).join('');
 }else{
  if(c!=='recent')keys.sort(sortK);
  h=(!q&&c==='all'?'':'')+(keys.length?keys.map(row).join(''):'<div class="mute stpe">'+esc(t('stp.empty'))+'</div>')}
 return h}
function stpChips(m){
 const o=stpLoad();const mk=(c,l)=>'<button class="stpch'+(STPK.c===c?' on':'')+'" data-act="stpcat" data-c="'+c+'">'+esc(l)+'</button>';
 let h=mk('all',t('stp.all'))+mk('rec',t('stp.rec'));if(o.fav.length)h+=mk('fav','★ '+t('stp.fav'));if(o.rec.length)h+=mk('recent',t('stp.recent'));
 STCATS.forEach(c=>h+=mk(c[0],t('stc.'+c[0])));return h}
function stpOpen(i){
 const m=G.card[i];if(!m)return;STPK={i,q:'',c:'all'};stpDraw(m)}
function stpDraw(m){
 if(!hasDoc)return;
 openModal('<div class="row spread"><h2 style="margin:0">'+esc(t('stp.title'))+'</h2><button class="btn ghost" data-act="stpclose">'+esc(t('stp.close'))+'</button></div>'
  +'<div class="mute" style="font-size:13px">'+esc(vsText(m))+'</div>'
  +'<input id="stpq" class="stpq" type="search" autocomplete="off" placeholder="'+esc(t('stp.search'))+'" value="'+esc(STPK.q)+'">'
  +'<div class="stpchs" id="stpchs">'+stpChips(m)+'</div>'
  +'<div class="stpl" id="stpl">'+stpList(m)+'</div>');
 const mb=document.querySelector('#modal .mbox');if(mb)mb.classList.add('stpbox')}
function stpRefresh(){const m=G.card[STPK.i];if(!m||!hasDoc)return;const l=document.getElementById('stpl'),c=document.getElementById('stpchs');if(l)l.innerHTML=stpList(m);if(c)c.innerHTML=stpChips(m)}
function stpBtn(m,i){
 const fe=stpFeud(m);const on=m.stip!=='none';const rec=on&&stpRec(m,m.stip,fe);
 return '<button class="stpb" data-act="stpick" data-i="'+i+'"><span class="stpbn">'+esc(on?t('stip.'+m.stip):t('stp.none'))+'</span>'+(on?stpBadge(m,m.stip,fe):'')+'<span class="stpbc">▾</span></button>'}
Object.assign(D,{
 'stp.title':['Wybierz stypulację','Choose a stipulation'],
 'stp.search':['Szukaj: nazwa, opis, słowo…','Search: name, description, word…'],
 'stp.all':['Wszystkie','All'],'stp.rec':['Polecane','Recommended'],'stp.fav':['Ulubione','Favorites'],'stp.recent':['Ostatnie','Recent'],
 'stp.none':['Bez stypulacji','No stipulation'],'stp.nonedesc':['Zwykła walka na zasadach standardowych.','A regular match under standard rules.'],
 'stp.close':['Zamknij','Close'],'stp.empty':['Nic nie pasuje do wyszukiwania.','Nothing matches your search.'],
 'stp.favfeud':['Ulubiona w feudzie','Feud favorite'],'stp.scfeud':['Pasuje do feudu','Fits the feud'],
 'stp.fitlbl':['Dopasowanie do stylów zawodników','Fit with the wrestlers’ styles'],'stp.cost':['Koszt produkcji','Production cost'],'stp.inj':['Podwyższone ryzyko kontuzji','Higher injury risk']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('stpcss')){const s=document.createElement('style');s.id='stpcss';s.textContent=
'.stpb{display:flex;align-items:center;gap:6px;flex-wrap:wrap;width:100%;min-height:36px;text-align:left;background:var(--panel2);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:6px 10px;font:inherit;cursor:pointer}'
+'.stpb:hover{border-color:var(--gold)}.stpbn{font-weight:600;min-width:0;overflow-wrap:anywhere}.stpbc{margin-left:auto;color:var(--mute)}'
+'.stpbox{max-width:640px}.stpq{width:100%;box-sizing:border-box;background:var(--panel2);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font:inherit}'
+'.stpchs{display:flex;flex-wrap:wrap;gap:6px}.stpch{background:var(--panel2);color:var(--fg);border:1px solid var(--line);border-radius:999px;padding:4px 10px;font:inherit;font-size:12.5px;cursor:pointer}'
+'.stpch.on{background:var(--gold);color:var(--gold-ink);border-color:var(--gold)}'
+'.stpl{display:flex;flex-direction:column;gap:6px;overflow:auto;min-height:120px;max-height:52vh;padding-right:2px}'
+'.stph{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);margin-top:6px}.stph small{opacity:.7}'
+'.stpr{display:flex;gap:6px;align-items:stretch}.stpr.on .stpm{border-color:var(--gold)}.stpr.lk .stpm{opacity:.55}'
+'.stpm{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;text-align:left;background:var(--panel2);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit;cursor:pointer}'
+'.stpm:not(:disabled):hover{border-color:var(--gold)}.stpm:disabled{cursor:not-allowed}'
+'.stpn{font-weight:600}.stpd{font-size:12.5px;color:var(--mute);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'
+'.stpbd{display:flex;flex-wrap:wrap;gap:6px;align-items:center}'
+'.stpg{font-size:11.5px;color:var(--gold-ink);background:var(--gold);border-radius:5px;padding:1px 6px}'
+'.stpf2{font-size:12px;font-weight:600}.stpf2.up{color:var(--teal)}.stpf2.dn{color:var(--red)}.stpc{font-size:12px;color:var(--mute)}.stpi{font-size:12px;color:var(--red)}'
+'.stpfv{flex:0 0 40px;background:var(--panel2);color:var(--mute);border:1px solid var(--line);border-radius:8px;font-size:18px;cursor:pointer}.stpfv.on{color:var(--star)}'
+'.stpe{padding:16px 4px}';
document.head.appendChild(s)}}catch(e){}}
