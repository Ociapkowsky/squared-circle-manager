/* ===== Live show: match cards with avatars, title/main-event highlight, result banner ===== */
const MC_MAXAV=6;
function mcAv(ids){
 const sh=ids.slice(0,MC_MAXAV);let h='<div class="mca">';
 sh.forEach(id=>{const w=W(id);if(w)h+='<span class="mcw" title="'+esc(w.name)+'">'+avatar(w.look,64)+'</span>'});
 if(ids.length>MC_MAXAV)h+='<span class="mcm">+'+(ids.length-MC_MAXAV)+'</span>';
 return h+'</div>'}
function mcTeams(m){
 const{A,B}=sides(m);const ffa=!!MODES[m.mode].ffa;
 const tm=ffa?teamsOf(m):[A,B];return tm}
function mcNew(live,m,i,total,tt){
 const d=document.createElement('div');
 d.className='mc'+(tt?' mc-title':'')+(i===total-1?' mc-main':'')+(m.stip&&m.stip!=='none'?' mc-stip':'');
 const tm=mcTeams(m);let av='';
 if(tm.length>3){const all=[].concat.apply([],tm);av='<div class="mcv ffa">'+mcAv(all)+'<div class="mcl">'+esc(t('mc.ffa',{n:all.length}))+'</div></div>'}
 else av='<div class="mcv">'+tm.map((S,k)=>(k?'<span class="mcvs">'+esc(t('mc.vs'))+'</span>':'')+'<div class="mcs">'+mcAv(S)+'</div>').join('')+'</div>';
 let rb='<div class="mcb"><span class="mcn">'+esc(t('mc.match',{i:i+1,n:total}))+'</span>';
 if(i===total-1)rb+='<span class="mcx mc-main">'+esc(t('mc.main'))+'</span>';
 if(tt)rb+='<span class="mcx mc-belt">'+esc(t('mc.title'))+'</span>';
 rb+='</div>';
 d.innerHTML=rb+av;live.appendChild(d);return d}
function mcSame(a,b){return !!a&&!!b&&a.length===b.length&&a.every(x=>b.indexOf(x)>=0)}
function mcResult(m,res,oc,tt,held0){
 const fin=res.finish||'clean',nm=names(oc.wi);
 const changed=!!tt&&!!held0&&!mcSame(held0,tt.holders);
 let tag='';
 if(changed)tag='<span class="mcx mc-champ">'+esc(t('mc.champ'))+'</span>';
 else if(tt&&fin==='draw')tag='<span class="mcx mc-def">'+esc(t('mc.kept'))+'</span>';
 else if(tt)tag='<span class="mcx mc-def">'+esc(t('mc.def'))+'</span>';
 const head=fin==='draw'?t('mc.draw'):t('mc.wins',{w:nm});
 return '<div class="mcr'+(changed?' mc-champ':'')+(fin==='draw'?' mc-draw':'')+'"><div class="mcw2"><span class="mct">'+esc(head)+'</span>'+tag+'<span class="mcf">'+esc(t('fin.'+fin))+'</span></div>'
  +'<div class="mcst">'+starsHtml(res.stars)+' <b class="mcnum" data-v="'+res.stars+'">'+f2(res.stars)+'</b></div></div>'}
function mcProg(live,total){
 let p=live.querySelector('.mcp');if(p)p.remove();p=document.createElement('div');p.className='mcp';p.setAttribute('aria-hidden','true');
 let h='';for(let k=0;k<total;k++)h+='<i></i>';p.innerHTML=h;live.insertBefore(p,live.firstChild);return p}
function mcProgSet(live,i){const p=live.querySelector('.mcp');if(!p)return;[].forEach.call(p.children,(el,k)=>{el.className=k<i?'d':k===i?'c':''})}
function mcCount(card){
 const el=card&&card.querySelector('.mcnum');if(!el||RUN&&RUN.fast)return;const v=+el.dataset.v;const t0=performance.now(),dur=650;
 const step=now=>{const k=Math.min(1,(now-t0)/dur);el.textContent=f2(v*k*(2-k));if(k<1&&document.body.contains(el))requestAnimationFrame(step)};requestAnimationFrame(step)}
Object.assign(D,{
 'mc.match':['Walka {i}/{n}','Match {i}/{n}'],'mc.main':['Walka wieczoru','Main event'],'mc.title':['O pas','Title match'],'mc.vs':['vs','vs'],'mc.ffa':['{n} zawodników','{n} wrestlers'],
 'mc.wins':['Wygrywa: {w}','Winner: {w}'],'mc.draw':['Remis','Draw'],'mc.champ':['Nowy mistrz!','New champion!'],'mc.def':['Obrona tytułu','Title defended'],'mc.kept':['Pas zostaje u mistrza','Champion retains']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('mccss')){const s=document.createElement('style');s.id='mccss';s.textContent=
'.live>.mc{display:flex;flex-direction:column;gap:8px;background:var(--panel2);border:1px solid var(--line);border-radius:12px;padding:12px 14px;animation:mcin .4s ease-out both}'
+'.live>.mc.mc-promo{border-style:dashed}.live>.mc.mc-stip{border-left:3px solid var(--red)}'
+'.live>.mc.mc-title{border-color:var(--star);box-shadow:0 0 0 1px var(--star) inset,0 0 18px -6px var(--star)}'
+'.live>.mc.mc-main{background:linear-gradient(180deg,var(--panel2),var(--panel))}.live>.mc.mc-main.mc-title{box-shadow:0 0 0 1px var(--star) inset,0 0 26px -4px var(--star)}'
+'.mc .hd{margin-top:2px!important;font-size:16px!important}.mc .ln{animation:mcin .3s ease-out both}'
+'.mcb{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.mcn{font-family:var(--font-px,inherit);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}'
+'.mcx{font-size:11.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:5px;padding:1px 7px;border:1px solid var(--line);color:var(--fg)}'
+'.mcx.mc-main{border-color:var(--red);color:var(--red)}.mcx.mc-belt{background:var(--star);border-color:var(--star);color:#1a1405}'
+'.mcx.mc-champ{background:var(--star);border-color:var(--star);color:#1a1405;animation:mcpop .6s ease-out both}.mcx.mc-def{border-color:var(--star);color:var(--fg)}'
+'.mcv{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}.mcv.ffa{flex-direction:column;gap:4px}.mcs{display:flex;justify-content:center;min-width:0}'
+'.mcvs{font-family:var(--font-px,inherit);font-size:12px;color:var(--mute);text-transform:uppercase}.mcl{font-size:12.5px;color:var(--mute)}'
+'.mca{display:flex;flex-wrap:wrap;justify-content:center;gap:2px;align-items:flex-end}.mcw{display:inline-flex;line-height:0;animation:mcpop .45s ease-out both}'
+'.mcw svg{display:block;max-width:100%;height:auto}.mcm{font-size:13px;font-weight:700;color:var(--mute);padding:0 6px;align-self:center}'
+'.mcr{display:flex;align-items:center;justify-content:space-between;gap:8px 14px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:8px;margin-top:2px;animation:mcin .45s ease-out both}'
+'.mcr.mc-champ{border-top-color:var(--star)}.mcw2{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0}.mct{font-family:var(--font-d,inherit);font-size:17px;overflow-wrap:anywhere}'
+'.mcf{font-size:12.5px;color:var(--mute)}.mcst{display:flex;align-items:center;gap:8px}.mcst .stars{font-size:21px}.mcnum{min-width:2.6em;font-variant-numeric:tabular-nums}'
+'.mcp{display:flex;gap:4px;margin-bottom:2px}.mcp i{flex:1;height:5px;border-radius:3px;background:var(--line);transition:background .3s}.mcp i.d{background:var(--star)}.mcp i.c{background:var(--red);animation:mcpulse 1.1s ease-in-out infinite}'
+'@keyframes mcin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes mcpop{0%{opacity:0;transform:scale(.6)}70%{transform:scale(1.08)}100%{opacity:1;transform:none}}@keyframes mcpulse{50%{opacity:.45}}'
+'@media (prefers-reduced-motion:reduce){.live>.mc,.mc .ln,.mcw,.mcr,.mcx.mc-champ,.mcp i.c{animation:none!important}}'
+'@media (max-width:520px){.mcw svg{width:46px}.mct{font-size:15px}}';
document.head.appendChild(s)}}catch(e){}}

/* ---- summary rows: avatars, title/main-event/match-of-the-night badges ---- */
function sumRow(o,s){
 const ms=s.out.filter(x=>!x.promo);let best=null;ms.forEach(x=>{if(!best||x.stars>=best.stars)best=x});
 const motn=best===o&&o.stars>=4,main=ms.length>1&&ms[ms.length-1]===o;
 let av='';(o.wid||[]).forEach(id=>{const w=W(id);if(w)av+='<span class="sra">'+avatar(w.look,44)+'</span>'});
 let bd='';
 if(main)bd+='<span class="mcx mc-main">'+esc(t('mc.main'))+'</span>';
 if(motn)bd+='<span class="mcx mc-motn">★ '+esc(t('sr.motn'))+'</span>';
 if(o.title)bd+='<span class="mcx '+(o.tc?'mc-champ':'mc-def')+'">'+esc(o.tc?t('mc.champ'):t('mc.def'))+'</span>';
 if(o.blow)bd+='<span class="mcx mc-def">'+esc(t('sr.blow'))+'</span>';
 return '<div class="sr'+(o.title?' sr-t':'')+(o.tc?' sr-c':'')+'"><div class="sr-av">'+av+'</div><div class="sr-b" style="min-width:0"><div><b>'+esc(o.a)+'</b>'+(o.b?' <span class="mute">vs</span> <b>'+esc(o.b)+'</b>':'')+'</div>'
  +'<div class="mute" style="font-size:13px">'+esc(o.winner)+' · '+esc(t('fin.'+o.finish))+(o.stip&&o.stip!=='none'?' · '+esc(t('stip.'+o.stip)):'')+(o.title?' · '+esc(o.title):'')+'</div>'
  +(bd?'<div class="sr-bd">'+bd+'</div>':'')+'</div><div class="sr-st">'+starsHtml(o.stars)+'</div></div>'}
Object.assign(D,{'sr.motn':['Walka gali','Match of the night'],'sr.blow':['Koniec feudu','Feud ended']});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('srcss')){const s=document.createElement('style');s.id='srcss';s.textContent=
'.sr{display:flex;align-items:center;gap:12px;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:var(--panel2)}'
+'.sr.sr-t{border-color:var(--star)}.sr.sr-c{box-shadow:0 0 0 1px var(--star) inset,0 0 16px -6px var(--star)}'
+'.sr-av{display:flex;gap:2px;flex:0 0 auto;min-width:46px;justify-content:center}.sra{display:inline-flex;line-height:0}.sra svg{display:block;width:40px;height:auto}'
+'.sr-b{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;overflow-wrap:break-word}.sr-bd{display:flex;flex-wrap:wrap;gap:6px}.sr-st{flex:0 0 auto}'
+'.mcx.mc-motn{border-color:var(--star);color:var(--fg)}@media (max-width:520px){.sr{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:start}.sr-st{grid-column:1/-1}.sr-av{min-width:0}}';
document.head.appendChild(s)}}catch(e){}}
