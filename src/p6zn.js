;/* new look options in editors + family resemblance */
(function(){
const NH=['sidepart','wild','rockstar','bowl','twinspike','sidefade','mpony','viking','curtain','twinbuns','sidepony','crimped','pixie'],NB=['chops','fumanchu','neck','longgoat','viking','stachegrey'];
NH.forEach(x=>{if(!HAIRS.includes(x))HAIRS.push(x)});NB.forEach(x=>{if(!BEARDS.includes(x))BEARDS.push(x)});
const EY=['dot','white','narrow','wide','lashes'],BR=['none','thin','thick','angry'],NO=['dot','long','tip','wide'],MO=['line','smile','smirk','frown','open','teeth'],DE=['none','side','band','twin','flame','dots','cross','long','longside'],SO=['none','boots','shoes','sneak','socks'];
const LB={hs:{sidepart:['Z przedziałkiem','Side parted'],wild:['Dzikie','Wild'],rockstar:['Rockowe','Rock star'],bowl:['Miseczka','Bowl cut'],twinspike:['Dwa kolce','Twin spikes'],sidefade:['Boki krótko','Fade'],mpony:['Męski kucyk','Man ponytail'],viking:['Wikińskie','Viking'],curtain:['Kurtyna','Curtain'],twinbuns:['Dwa koczki','Twin buns'],sidepony:['Boczny kucyk','Side ponytail'],crimped:['Karbowane','Crimped'],pixie:['Pixie','Pixie']},
 bd:{chops:['Bokobrody','Chops'],fumanchu:['Fu Manchu','Fu Manchu'],neck:['Pod brodą','Neck beard'],longgoat:['Długa kozia','Long goatee'],viking:['Wikińska','Viking'],stachegrey:['Siwy wąs','Grey stache']},
 ey:{dot:['Zwykłe','Plain'],white:['Z białkami','Whites'],narrow:['Wąskie','Narrow'],wide:['Szerokie','Wide'],lashes:['Rzęsy','Lashes']},
 br:{none:['Brak','None'],thin:['Cienkie','Thin'],thick:['Grube','Thick'],angry:['Groźne','Angry']},
 no:{dot:['Mały','Small'],long:['Długi','Long'],tip:['Końcówka','Tip'],wide:['Szeroki','Wide']},
 mo:{line:['Kreska','Line'],smile:['Uśmiech','Smile'],smirk:['Uśmieszek','Smirk'],frown:['Skrzywione','Frown'],open:['Otwarte','Open'],teeth:['Zęby','Teeth']},
 de:{none:['Brak','None'],side:['Boczne paski','Side stripes'],band:['Pas','Band'],twin:['Dwa pasy','Two bands'],flame:['Płomienie','Flames'],dots:['Kropki','Dots'],cross:['Krzyż','Cross'],long:['Do kolan','Long'],longside:['Długie z paskiem','Long striped']},
 so:{none:['Boso','Barefoot'],boots:['Wysokie buty','Boots'],shoes:['Buty','Shoes'],sneak:['Sneakersy','Sneakers'],socks:['Skarpety','Socks']}};
const T={};Object.keys(LB).forEach(p=>Object.keys(LB[p]).forEach(k=>{T[p+'.'+k]=LB[p][k]}));
Object.assign(D,T,{'av.eyes':['Oczy','Eyes'],'av.brow':['Brwi','Brows'],'av.nose':['Nos','Nose'],'av.mouth':['Usta','Mouth'],'av.deco':['Wzór spodenek','Trunks pattern'],'av.shoe':['Obuwie','Footwear']});
const rows=(act,id,l)=>{const tx=(k,arr,cur,pfx)=>'<div class="sw">'+arr.map(v=>'<button class="txt'+(cur===v?' on':'')+'" data-act="'+act+'" data-id="'+id+'" data-k="'+k+'" data-v="'+v+'">'+t(pfx+'.'+v)+'</button>').join('')+'</div>';
 return '<div class="px">'+t('av.eyes')+'</div>'+tx('eyes',EY,l.eyes||'dot','ey')+'<div class="px">'+t('av.brow')+'</div>'+tx('brow',BR,l.brow||'none','br')+'<div class="px">'+t('av.nose')+'</div>'+tx('nose',NO,l.nose||'dot','no')+'<div class="px">'+t('av.mouth')+'</div>'+tx('mouth',MO,l.mouth||'line','mo')+'<div class="px">'+t('av.deco')+'</div>'+tx('deco',DE,l.deco||'none','de')+'<div class="px">'+t('av.shoe')+'</div>'+tx('shoe',SO,l.shoe||'none','so')};
const bake=l=>{if(!l)return;const d=avatarDerive(l);['hair','beard','deco','shoe','gear','face','eyes','brow','nose','mouth'].forEach(k=>{if(d[k]!=null)l[k]=d[k]});l.nh=1;l.nb=1};
const _ae=avEditor;avEditor=function(id){try{bake(W(id).look)}catch(e){}let h=_ae.apply(this,arguments);try{h+=rows('look',id,W(id).look)}catch(e){}return h};
if(typeof meEditor==='function'){const _me=meEditor;meEditor=function(){try{bake(START_ME.look)}catch(e){}let h=_me.apply(this,arguments);try{h+=rows('melook','me',START_ME.look)}catch(e){}return h}}
// keep hand-picked hair/beard when changed in an editor
['look','melook'].forEach(k=>{const f=ACT[k];if(typeof f==='function')ACT[k]=function(el){const r=f.apply(this,arguments);try{const l=k==='look'?W(el.dataset.id).look:START_ME.look;if(l){l.nh=1;l.nb=1}}catch(e){}return r}});
// family resemblance
function resemble(c,h){if(!c||!h||!c.look||!h.look)return;const hd=avatarDerive(h.look),l=c.look;
 l.skin=h.look.skin;l.hairC=h.look.hairC;l.beardC=h.look.beardC==null?h.look.hairC:h.look.beardC;['eyes','brow','nose','mouth'].forEach(k=>{if(hd[k]!=null)l[k]=hd[k]})}
function famFix(){try{G.ws.forEach(w=>{if(w.fr&&w.fr.of){const h=G.ws.find(x=>x.id===w.fr.of);if(h)resemble(w,h)}});const dy=(G.dy||{});(dy.kids||[]).forEach(k=>{const h=G.ws.find(x=>x.id===k.par);if(h)resemble(k,h)})}catch(e){}}
if(typeof dySeed==='function'){const _ds=dySeed;dySeed=function(){const r=_ds.apply(this,arguments);famFix();return r}}
if(typeof dyKid==='function'){const _dk=dyKid;dyKid=function(w){const k=_dk.apply(this,arguments);try{resemble(k,w)}catch(e){}return k}}
if(typeof dyAdult==='function'){const _da=dyAdult;dyAdult=function(host){const w=_da.apply(this,arguments);try{resemble(w,host)}catch(e){}return w}}
})();
if(typeof normTexts==="function")normTexts();
