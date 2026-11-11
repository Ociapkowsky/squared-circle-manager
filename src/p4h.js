/* ============ Tweener X view ============ */
function twNew(){return G&&G.tw?G.tw.filter(p=>p.id>(G.twSeen||0)).length:0}
function twAcc(p){
 const a=p.acc||'wire';
 if(a==='me')return{name:G.fed.name,handle:'@'+String(G.fed.short||G.fed.name).toLowerCase().replace(/[^a-z0-9]/g,''),ver:1};
 if(a==='wire')return{name:'Ring Wire',handle:'@RingWire',ver:1};
 if(a.indexOf('r:')===0){const r=G.rivals.find(x=>x.id===a.slice(2));return{name:r?r.name:'?',handle:'@'+String(r?(r.short||r.id):'x').toLowerCase().replace(/[^a-z0-9]/g,''),ver:1}}
 const h=a.slice(4);return{name:h.slice(1).replace(/_/g,' '),handle:h,ver:0}}
function twCol(s){let n=0;for(let i=0;i<s.length;i++)n=(n*31+s.charCodeAt(i))%360;return 'hsl('+n+',45%,42%)'}
function twAv(s,name){return '<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;flex:none;color:#fff;font-weight:700;font-size:13px;background:'+twCol(s)+'">'+esc(String(name||s).replace('@','').charAt(0).toUpperCase())+'</span>'}
function twHeart(on,n,id,ci){return '<button data-act="twlike" data-id="'+id+'"'+(ci!=null?' data-c="'+ci+'"':'')+' aria-pressed="'+(on?'true':'false')+'" style="background:none;border:0;padding:0 2px;cursor:pointer;font:inherit;font-size:inherit;color:'+(on?'#e0245e':'inherit')+'">'+(on?'♥':'♡')+' '+n+'</button>'}
function twPost(p){
 const a=twAcc(p);
 let h='<div class="card stack" style="gap:8px"><div class="row" style="gap:8px;flex-wrap:nowrap">'+twAv(a.handle,a.name)+'<div style="min-width:0"><b>'+esc(a.name)+'</b>'+(a.ver?' <span style="color:var(--gold)">✔</span>':'')+' <span class="mute" style="font-size:13px">'+esc(a.handle)+' · W'+p.w+'</span></div></div>';
 h+='<div style="font-size:15px;overflow-wrap:anywhere">'+esc(t('tw.'+p.k,p.v))+'</div><div class="mute" style="font-size:13px">💬 '+p.c.length+' &nbsp; ♻ '+p.rt+' &nbsp; '+twHeart(p.liked,p.lk,p.id)+'</div>';
 h+=p.c.map((c,ci)=>{const you=c.u==='you';return '<div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start;padding-left:12px;border-left:2px solid var(--line,#8884)">'+twAv(c.u,you?t('tw.you'):c.u)+'<div style="min-width:0;font-size:14px;overflow-wrap:anywhere"><b>'+(you?esc(t('tw.you')):esc(c.u))+'</b> '+esc(c.raw!=null?c.raw:t(c.k,Object.assign({w:p.v.f||G.fed.name},p.v)))+' <span class="mute" style="font-size:12px">'+twHeart(c.liked,c.lk||0,p.id,ci)+'</span>'+'</div></div>'}).join('');
 return h+'<div class="row" style="gap:6px;flex-wrap:nowrap"><input class="field" id="twin'+p.id+'" maxlength="140" placeholder="'+esc(t('tw.ph'))+'" style="min-width:0"><button class="btn sm" data-act="twrep" data-id="'+p.id+'">'+t('tw.reply')+'</button></div></div>';
}
function vTw(){
 twEnsure();const top=G.tw.length?G.tw[0].id:0;
 const h='<div class="top"><div><h2>Tweener X <span class="mute" style="font-size:15px;font-weight:400">'+t('tw.sub')+'</span></h2></div></div><div class="stack">'+(G.tw.length?G.tw.slice(0,40).map(twPost).join(''):'<p class="mute">'+t('tw.empty')+'</p>')+'</div>';
 G.twSeen=top;return h}
Object.assign(ACT,{twrep(e){
 const id=+e.dataset.id,p=(G.tw||[]).find(x=>x.id===id),inp=document.getElementById('twin'+id);if(!p||!inp)return;
 const txt=inp.value.trim().slice(0,140);if(!txt)return;
 p.c.push({u:'you',raw:txt,lk:0});
 if(rnd()<.6)p.c.push({u:pickR(G.fans).h,k:pickR(TWC.reply.x),lk:Math.floor(rnd()*6)});
 save();render()}});
Object.assign(ACT,{twlike(e){
 const p=(G.tw||[]).find(x=>x.id===+e.dataset.id);if(!p)return;
 const o=e.dataset.c!=null?p.c[+e.dataset.c]:p;if(!o)return;
 o.liked=!o.liked;o.lk=Math.max(0,(o.lk||0)+(o.liked?1:-1));save();render()}});
