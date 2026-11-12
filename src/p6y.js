;/* ===== Delete any belt (with confirmation) ===== */
(function(){
Object.assign(D,{'td.delq':['Usunąć pas „{n}"? Obecni mistrzowie stracą tytuł, a zaplanowane walki o ten pas zostaną zwykłymi walkami.','Delete the "{n}" belt? Current champions lose the title and booked title matches become ordinary matches.'],
'td.delyes':['Usuń pas','Delete belt'],'td.delno':['Anuluj','Cancel']});
const _vt3=vTitles;vTitles=function(){let h=_vt3.apply(this,arguments);try{h=h.replace(/(<button class="btn sm" data-act="tdedit" data-id="([^"]+)">[^<]*<\/button>)(<\/div>)(?!<div><button class="btn sm danger" data-act="tddelete")/g,(m,b,id,c)=>{const tt=G.titles.find(x=>x.id===id);return tt&&tt.custom?m:b+'<button class="btn sm danger" data-act="tddelete" data-id="'+id+'">'+esc(t('t.delete'))+'</button>'+c})}catch(e){}return h};
ACT.tddelete=async function(e){const id=e.dataset.id,tt=G.titles.find(x=>x.id===id);if(!tt)return;
 const i=await askGeneric(esc(titleName(tt)),esc(t('td.delq',{n:titleName(tt)})),[{l:esc(t('td.delyes'))},{l:esc(t('td.delno'))}]);if(i!==0)return;
 G.titles=G.titles.filter(x=>x.id!==id);G.card.forEach(m=>{if(m.title===id)m.title=''});
 try{(G.feuds||[]).forEach(f=>{if(f.title===id)f.title=''})}catch(x){}
 try{if(G.thx)delete G.thx[id]}catch(x){}
 save();render()};
})();
if(typeof normTexts==="function")normTexts();
