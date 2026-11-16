;/* hiring: show weekly impact before signing */
(function(){
 Object.assign(D,{'hn.sal':['U Ciebie zarobi: {s}/tydz. (liczone dla Twojego poziomu federacji). Opłata {f} jest jednorazowa = 8 tygodni pensji.','Pay at your promotion: {s}/wk (based on your tier). The {f} fee is one-off = 8 weeks of pay.'],
  'hn.pos':['Wynik tygodnia po podpisaniu ≈ {n} (ostatnie gale: {a})','Weekly result after signing ≈ {n} (recent shows: {a})'],
  'hn.neg':['Uwaga: po podpisaniu wynik tygodnia ≈ {n} (ostatnie gale: {a}). Gotówka po opłacie starczy na ok. {k} tyg.','Warning: after signing the weekly result ≈ {n} (recent shows: {a}). Cash after the fee lasts about {k} wk.'],
  'hn.neg0':['Uwaga: po podpisaniu wynik tygodnia ≈ {n} (ostatnie gale: {a}).','Warning: after signing the weekly result ≈ {n} (recent shows: {a}).'],'hn.new':['Brak danych z gal, więc trudno ocenić wpływ na wynik.','No show data yet, so the impact on results is unclear.']});
 const sg=n=>(n<0?'−':'+')+money(Math.abs(n));
 function note(w){try{const f=Math.round(salaryOf(w,G.fed.tier)*8*(typeof relDisc==='function'?relDisc(w):1)),s=salaryOf(w,G.fed.tier);
  let h='<div class="mute" style="font-size:12px;margin-top:4px">'+esc(t('hn.sal',{s:money(s),f:money(f)}))+'</div>';
  const H=(G.hist||[]).slice(-4).filter(x=>isFinite(x.rev)&&isFinite(x.cost));
  if(!H.length)return h+'<div class="mute" style="font-size:12px">'+esc(t('hn.new'))+'</div>';
  const a=H.reduce((q,x)=>q+(x.rev-x.cost),0)/H.length,n=a-s;
  if(n>=0)return h+'<div class="mute" style="font-size:12px">'+esc(t('hn.pos',{n:sg(n),a:sg(a)}))+'</div>';
  const left=G.fed.cash-f,k=left>0?Math.floor(left/-n):0;
  return h+'<div style="font-size:12px;font-weight:700;color:#d83a3a;margin-top:2px">⚠️ '+esc(t(left>0?'hn.neg':'hn.neg0',{n:sg(n),a:sg(a),k}))+'</div>'}catch(e){return ''}}
 const _wc=wCard;wCard=function(w,extra){const mk=typeof extra==='string'&&extra.indexOf('data-act="sign"')>=0;if(mk)extra+=note(w);let h=_wc.call(this,w,extra);
  if(mk){try{const sal=t('st.salary',{m:money(w.salary)});h=h.replace(' · '+sal,'')}catch(e){}}return h};
})();
if(typeof normTexts==="function")normTexts();
