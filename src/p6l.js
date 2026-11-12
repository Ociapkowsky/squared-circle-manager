;/* ===== booker skill tree: show what the next rank changes ===== */
(function(){const _vb=vBk;vBk=function(){let h=_vb.apply(this,arguments);try{const b=bkEnsure();if(!b)return h;
  BKS.forEach(s=>{const r=bkR(s[0]);if(r>=s[2])return;const unit=s[9]==='%'?'%':'';const nx=Math.round((r+1)*s[8]*100)/100+unit;const full=s[lang==='pl'?6:7].replace('{v}',nx);
   const btn='data-act="bkup" data-k="'+s[0]+'"';const i=h.indexOf(btn);if(i<0)return;
   // line under the "Now:" text: find the end of this skill's "mute" block (the </div></div> before the button)
   const bi=h.lastIndexOf('<button',i+btn.length);const start=h.lastIndexOf('</div></div>',bi);if(start<0||start>bi)return;
   h=h.slice(0,start)+'</div><div style="font-size:13px;color:var(--gold)">'+t('bk.next')+' '+esc(full)+'</div></div>'+h.slice(start+12);
   const j=h.indexOf(btn);h=h.slice(0,j)+'title="'+esc(t('bk.next')+' '+full)+'" '+h.slice(j)})}catch(e){}return h};
 Object.assign(D,{'bk.next':['Po ulepszeniu:','After upgrade:']})})();
if(typeof normTexts==="function")normTexts();
