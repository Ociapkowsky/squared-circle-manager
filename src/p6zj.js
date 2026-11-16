;/* hiring: show weekly impact before signing */
(function(){
 Object.assign(D,{
  'hn.sal':['Pensja ustalisz w negocjacjach: od {lo}/tydz. (zwykła oferta) do {hi}/tydz. (jego oczekiwanie). Opłata za podpis {f} jest jednorazowa, a pensja schodzi co tydzień.','You set the pay in negotiation: from {lo}/wk (standard offer) to {hi}/wk (his ask). The {f} signing fee is one-off, the salary is paid every week.'],
  'hn.pos':['Wynik tygodnia po podpisaniu: ≈ {a} przy zwykłej ofercie, ≈ {b} przy jego oczekiwaniu (średnia z ostatnich gal: {m}).','Weekly result after signing: ≈ {a} at the standard offer, ≈ {b} at his ask (recent shows average: {m}).'],
  'hn.neg':['Uwaga: wynik tygodnia po podpisaniu ≈ {a} przy zwykłej ofercie i ≈ {b} przy jego oczekiwaniu (średnia z ostatnich gal: {m}). Gotówka po opłacie starczy na ok. {k} tyg.','Warning: weekly result after signing ≈ {a} at the standard offer and ≈ {b} at his ask (recent shows average: {m}). Cash after the fee lasts about {k} wk.'],
  'hn.neg0':['Uwaga: wynik tygodnia po podpisaniu ≈ {a} przy zwykłej ofercie i ≈ {b} przy jego oczekiwaniu (średnia z ostatnich gal: {m}).','Warning: weekly result after signing ≈ {a} at the standard offer and ≈ {b} at his ask (recent shows average: {m}).'],
  'hn.new':['Brak danych z gal, więc trudno ocenić wpływ na wynik.','No show data yet, so the impact on results is unclear.']});
 const sg=n=>(n<0?'−':'+')+money(Math.abs(n));
 function note(w){try{const lo=salaryOf(w,G.fed.tier),hi=typeof ctAsk==='function'?Math.max(lo,ctAsk(w)):lo,f=typeof sgFee==='function'?sgFee(w,'fa'):lo*8;
  let h='<div class="mute" style="font-size:12px;margin-top:4px">'+esc(t('hn.sal',{lo:money(lo),hi:money(hi),f:money(f)}))+'</div>';
  const H=(G.hist||[]).slice(-4).filter(x=>isFinite(x.rev)&&isFinite(x.cost));
  if(!H.length)return h+'<div class="mute" style="font-size:12px">'+esc(t('hn.new'))+'</div>';
  const m=H.reduce((q,x)=>q+(x.rev-x.cost),0)/H.length,a=m-lo,b=m-hi,v={a:sg(a),b:sg(b),m:sg(m)};
  if(b>=0)return h+'<div class="mute" style="font-size:12px">'+esc(t('hn.pos',v))+'</div>';
  const worst=Math.min(a,b),left=G.fed.cash-f,k=worst<0&&left>0?Math.floor(left/-worst):0;v.k=k;
  return h+'<div style="font-size:12px;font-weight:700;color:'+(a<0?'#d83a3a':'#c27a12')+';margin-top:2px">⚠️ '+esc(t(left>0?'hn.neg':'hn.neg0',v))+'</div>'}catch(e){return ''}}
 const _wc=wCard;wCard=function(w,extra){if(typeof extra==='string'&&extra.indexOf('data-act="sign"')>=0)extra+=note(w);return _wc.call(this,w,extra)};
})();
if(typeof normTexts==="function")normTexts();
