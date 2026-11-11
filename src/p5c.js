/* ===== round 11: promo turn (heel/face turn) + writers who unlock feud scenarios ===== */
Object.assign(D,{
 'pr.turn.lbl':['Zwrot akcji','Turn'],'pr.turn.none':['Bez zwrotu','No turn'],'pr.turn.opt':['Zwrot: {r}','Turn: {r}'],
 'pr.turn.cd':['Niedawny zwrot, kolejny za {n} tyg.','Recent turn, next one in {n} wk'],'pr.turn.tw':['Tweener nie ma zwrotu','Tweeners have no turn'],
 'pr.turn.heel':['{a} zwraca się przeciwko fanom! To heel turn, hala wrze.','{a} turns on the fans! A heel turn, the arena erupts.'],
 'pr.turn.face':['{a} prosi o wybaczenie i staje po stronie fanów. Face turn!','{a} asks for forgiveness and stands with the fans. A face turn!'],
 'pr.turn.flop':['Fani nie kupują zwrotu. Reakcja jest chłodna.','The fans do not buy the turn. The reaction is cold.'],
 'sr.writer':['Scenarzysta','Writer'],
 'stf.d.writer':['Scenarzyści odblokowują mocniejsze feudy. Bez nich dostępne są tylko podstawowe scenariusze (do siły {b}). Im lepszy scenarzysta, tym wyższa siła feudu możesz zacząć.','Writers unlock stronger feuds. Without one only basic scenarios (up to strength {b}) are available. The better the writer, the stronger the feud you can start.'],
 'stf.fx.writer':['Feudy do siły {n}','Feuds up to strength {n}'],
 'wr.locked':['Ten scenariusz jest zablokowany. Zatrudnij (lepszego) scenarzystę w zakładce Personel.','This scenario is locked. Hire a (better) writer in the Staff screen.'],
 'wr.lockopt':['🔒 {n} (scenarzysta {l}+)','🔒 {n} (writer {l}+)']
});
/* ---- writers as a staff role ---- */
const WR_BASE=60;   /* set by eye: strongest feud scenario available without any writer */
SROLES.push('writer');SMAX.writer=[1,1,2,2,3];SMUL.writer=.9;
function wrMax(){try{const ws=staffOf('writer');if(!ws.length)return WR_BASE;const b=Math.max.apply(null,ws.map(s=>s.lvl));return Math.min(100,WR_BASE+Math.round(b*.45+(ws.length-1)*4))}catch(e){return WR_BASE}}
function wrNeed(s){return Math.max(1,Math.ceil((s-WR_BASE)/.45))}
(function(){const _fb=staffFxBox;staffFxBox=function(){let h=_fb.apply(this,arguments);const tr=G.fed.tier-1;const i=h.lastIndexOf('</div>');
 return h.slice(0,i)+'<div class="card kpi"><div class="px">'+t('sr.writer')+'</div><div class="v" style="font-size:20px">'+staffOf('writer').length+' / '+SMAX.writer[tr]+'</div><div class="s">'+t('stf.fx.writer',{n:wrMax()})+'</div></div></div>'};
 const _fd=fdDefaults;fdDefaults=function(sc){try{if(SC[sc]&&SC[sc].s>wrMax()){const k=Object.keys(SC).filter(x=>SC[x].cat<=9&&SC[x].kind==='duo'&&SC[x].s<=wrMax()).sort((a,b)=>SC[b].s-SC[a].s)[0];if(k)sc=k}}catch(e){}return _fd.call(this,sc)};
 const _nf=ACT.newfeud;ACT.newfeud=function(){const d=G.fd;if(d&&SC[d.sc]&&SC[d.sc].s>wrMax()){G.fdmsg='wr.locked';render();return}return _nf.apply(this,arguments)};
 /* locked scenarios are greyed out in the feud form */
 const _vf=vFeuds;vFeuds=function(){let h=_vf.apply(this,arguments);const mx=wrMax();
  h=h.replace(/<option value="([^"]+)"( selected)?>([^<]*) · (\d+)\/100<\/option>/g,(m,id,sel,nm,s)=>+s>mx?'<option value="'+id+'"'+(sel||'')+' disabled>'+t('wr.lockopt',{n:nm+' · '+s+'/100',l:wrNeed(+s)})+'</option>':m);
  return h};
})();
/* the staff description needs the base strength */
(function(){const k='stf.d.writer';const orig=D[k];D[k]=[orig[0].replace('{b}',WR_BASE),orig[1].replace('{b}',WR_BASE)]})();
/* ---- promo turn ---- */
const TURN_CD=26;   /* weeks between turns of one wrestler, set by eye */
function turnState(p){const a=p.a?W(p.a):null;if(!a)return{ok:false,why:''};if(a.role!=='face'&&a.role!=='heel')return{ok:false,why:'pr.turn.tw'};
 const left=a.turnWk?TURN_CD-(G.week-a.turnWk):0;if(left>0)return{ok:false,why:'pr.turn.cd',n:left};return{ok:true,to:a.role==='face'?'heel':'face'}}
(function(){const _ph=promoHtml;promoHtml=function(p,i,pos,len){let h=_ph.apply(this,arguments);if(!p.a)return h;const st=turnState(p);
 const sel=st.ok?'<select data-chg="pr" data-k="turn" data-i="'+i+'"><option value="">'+t('pr.turn.none')+'</option><option value="1"'+(p.turn?' selected':'')+'>'+t('pr.turn.opt',{r:t('role.'+st.to).split(' ')[0]})+'</option></select>':'<div class="note">'+t(st.why,{n:st.n})+'</div>';
 const j=h.lastIndexOf('</div>');return h.slice(0,j)+'<div><div class="px">'+t('pr.turn.lbl')+'</div>'+sel+'</div></div>'};
 const _rp=runPromo;runPromo=function(p,log){const r=_rp.apply(this,arguments);
  if(p.turn&&r&&r.promo){const a=W(p.a),st=turnState(p);
   if(a&&st.ok){const to=st.to,stars=r.stars,pf=promoFeud(p);a.role=to;a.turnWk=G.week;
    if(stars>=3){a.pop=clamp(a.pop+(stars-2)*(to==='heel'?.9:.7),1,100);a.morale=clamp(a.morale+1,0,100);log('ln',esc(t('pr.turn.'+to,{a:a.name})));if(pf)pf.f.heat=clamp(pf.f.heat+8,0,100);r.turn=to}
    else{a.pop=clamp(a.pop-1,1,100);log('ln',esc(t('pr.turn.flop')));r.turn=to}
    addNews('n.turn',{w:a.name,r:t('role.'+to).split(' ')[0]})}}
  return r};
})();
if(typeof normTexts==='function')normTexts();
