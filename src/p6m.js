;/* ===== Tweener X: own comments use booker's face + random handle derived from booker name ===== */
(function(){
const PAT=[b=>b+'_Fan',b=>'Real'+b,b=>b+rnd2(99),b=>'xX'+b+'Xx',b=>b+'_Smark',b=>'Not'+b,b=>b+'Mark',b=>'Big'+b,b=>b+'_Booker',b=>'The'+b+'Show',b=>b+'WasRobbed',b=>b+'_Wrestling',b=>'Mr'+b,b=>b+'Forever'];
function rnd2(n){return 1+Math.floor(rnd()*n)}
function twHandle(){let b=String((G.me&&G.me.name)||t('tw.you')).split(/\s+/)[0].normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l').replace(/Ł/g,'L').replace(/[^A-Za-z0-9]/g,'');if(!b)b='Booker';b=b.charAt(0).toUpperCase()+b.slice(1);return '@'+PAT[Math.floor(rnd()*PAT.length)](b)}
window.twFace=function(px){px=px||30;if(!(G.me&&G.me.look))return twAv('you',t('tw.you'));
 let svg=avatar(G.me.look,px).replace(/viewBox="[^"]*"/,'viewBox="3.5 0.5 9 8.5"').replace(/width="[^"]*" height="[^"]*"/,'width="'+px+'" height="'+px+'" preserveAspectRatio="xMidYMid slice"');
 return '<span style="display:inline-flex;width:'+px+'px;height:'+px+'px;border-radius:50%;flex:none;overflow:hidden;background:#e9dfd2;line-height:0">'+svg+'</span>'};
const _tp=twPost;twPost=function(p){let h=_tp.apply(this,arguments);try{
 // replace own comments: avatar + alias
 let i=0;p.c.forEach(c=>{if(c.u!=='you')return;const al=c.hn||'';
  const marker='<b>'+esc(t('tw.you'))+'</b>';const at=h.indexOf(marker,i);if(at<0)return;
  const rs=h.lastIndexOf('<span style="display:inline-flex',at);if(rs<0||rs<i)return;const re=h.indexOf('</span>',rs)+7;
  h=h.slice(0,rs)+twFace(30)+h.slice(re);
  const at2=h.indexOf(marker,rs);h=h.slice(0,at2)+'<b>'+esc(al||t('tw.you'))+'</b>'+h.slice(at2+marker.length);i=at2+10})}catch(e){}return h};
ACT.twrep=function(e){
 const id=+e.dataset.id,p=(G.tw||[]).find(x=>x.id===id),inp=document.getElementById('twin'+id);if(!p||!inp)return;
 const txt=inp.value.trim().slice(0,140);if(!txt)return;
 p.c.push({u:'you',hn:twHandle(),raw:txt,lk:0});
 if(rnd()<.6)p.c.push({u:pickR(G.fans).h,k:pickR(TWC.reply.x),lk:Math.floor(rnd()*6)});
 save();render()}})();
if(typeof normTexts==="function")normTexts();
