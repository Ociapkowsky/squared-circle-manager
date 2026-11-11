// ---- Global-tier (tier 5) extra pressure ----
function globalWeekly(f,a3){
 if(f.tier<5)return;
 if(f.pop>=92&&a3<4.4)f.pop=clamp(f.pop-.25,2,100);
 const n=G.netPen;if(n&&n.wk>0){n.wk--;if(n.wk<=0)G.netPen=null}
 if(G.week%13===0&&(G.hist||[]).length>=6){const a=lastRat(13);
  if(a<3.9){G.netPen={wk:13,m:.88};addNews('n.netbad',{r:f2(a)})}
  else if(a>=4.3){f.cash+=r10(wkRev()*2);f.pop=clamp(f.pop+.4,2,100);addNews('n.netgood',{r:f2(a)})}}
}
Object.assign(WEV,{
 async raid(){
  if(G.fed.tier<5)return false;const w=mine().filter(x=>x.pop>=60&&!x.farewell&&!x.injury).sort((a,b)=>b.pop-a.pop)[pickR([0,0,1,2])];if(!w)return false;
  const rv=pickR(G.rivals.filter(r=>r.tier>=5));if(!rv)return false;const c=r10(w.salary*14),v={w:w.name,f:rv.short||rv.name,m:money(c)};
  const i=await evx('raid',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;w.salary=r10(w.salary*1.4);w.contract=52;w.morale=clamp((w.morale||60)+6,0,100);addNews('n.raid1',v)}
  else{w.fed=rv.id;purgeW(w.id);G.fed.pop=clamp(G.fed.pop-.6,2,100);rv.pop=clamp(rv.pop+.5,3,99);addNews('n.raid2',v)}
  return true},
 async hostile(){
  if(G.fed.tier<5||G.netPen)return false;const c=r10(wkRev()*10),v={m:money(c)};
  const i=await evx('hostile',v,['1','2'],[G.fed.cash<c,false]);
  if(i===0){G.fed.cash-=c;addNews('n.host1',v)}else{G.netPen={wk:8,m:.85};G.fed.pop=clamp(G.fed.pop-.5,2,100);addNews('n.host2')}
  return true}
});
E('raid','Rywal wykrada gwiazdę','Rival raids a star','{f} składa ofertę {w}. Podwyżka i nowy kontrakt kosztują {m} (pensja +40%). Jeśli odmówisz, odchodzi.','{f} makes an offer to {w}. A raise and new deal cost {m} (salary +40%). Refuse and they leave.',[['Przebij ofertę ({m})','Match the offer ({m})'],['Pozwól odejść','Let them go']]);
E('hostile','Wrogie przejęcie','Hostile takeover bid','Inwestorzy próbują przejąć kontrolę. Obrona (wypłata dla akcjonariuszy) kosztuje {m}. Bez obrony na 8 tygodni stracisz część przychodów z TV.','Investors attempt a hostile takeover. Defending (shareholder payout) costs {m}. Without a defense you lose part of your TV income for 8 weeks.',[['Broń się ({m})','Defend ({m})'],['Nie broń','Do not defend']]);
Object.assign(D,{
'n.netbad':['Stacja oceniła średnią gal na {r}: poniżej oczekiwań, przychody z TV obcięte o 20% na kwartał.','The network rated your shows {r} on average: below expectations, TV income cut by 20% for a quarter.'],
'n.netgood':['Stacja chwali średnią {r}: premia za wyniki.','The network praises your {r} average: performance bonus.'],
'n.raid1':['Przebito ofertę rywala: {w} został w federacji.','You matched the rival offer: {w} stays.'],
'n.raid2':['{w} przeszedł do federacji {f}.','{w} left for {f}.'],
'n.host1':['Odparto próbę wrogiego przejęcia ({m}).','Hostile takeover repelled ({m}).'],
'n.host2':['Inwestorzy przejęli część kontroli: przychody z TV spadły.','Investors gained a foothold: TV income dropped.']
});
