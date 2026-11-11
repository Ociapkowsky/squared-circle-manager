// look-related world events
Object.assign(WEV,{
 async makeover(){
  const w=pickR(mine().filter(x=>x.pop>=12&&!x.injury&&!x.farewell&&x.look));if(!w)return false;
  const fee=Math.round(sw()*.5/10)*10,v={w:w.name,m:money(fee)};
  const i=await evx('makeover',v,['1','2'],[G.fed.cash<fee,false]);
  if(i===0){G.fed.cash-=fee;const o=w.look,n=randLook(rnd,w.country,w.g==='f');
   w.look=Object.assign({},o,{hair:n.hair,hairC:n.hairC,outfit:n.outfit,outC:n.outC,o2:n.o2,acc:n.acc,gear:n.gear,neck:n.neck});
   w.pop=clamp(w.pop+1.5,1,100);w.cha=clamp(w.cha+2,1,100);w.morale=clamp((w.morale||60)+8,0,100);addNews('n.makeover',{w:w.name})}
  else{w.morale=clamp((w.morale||60)-6,0,100)}
  return true},
 async cosplay(){
  const w=pickR(mine().filter(x=>x.pop>=20&&!x.farewell));if(!w)return false;
  const v={w:w.name};await evx('cosplay',v,['1']);
  w.pop=clamp(w.pop+1,1,100);G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.cosplay',{w:w.name});return true}
});
Object.assign(D,{
'ev.w.makeover.t':['Nowy image','New look'],'ev.w.makeover.b':['{w} prosi o zmianę wyglądu: nowa fryzura, strój i dodatki. Koszt stylizacji: {m}.','{w} asks for a new look: new hair, outfit and accessories. Styling costs {m}.'],'ev.w.makeover.1':['Zapłać {m}','Pay {m}'],'ev.w.makeover.2':['Odmów','Refuse'],
'ev.w.cosplay.t':['Fani przebierają się!','Fans in costume!'],'ev.w.cosplay.b':['Na widowni zrobiło się głośno o przebierańcach za {w}. Popularność rośnie.','Fans dressed up as {w} went viral. Popularity rises.'],'ev.w.cosplay.1':['Super','Great'],
'n.makeover':['{w} pokazał nowy image.','{w} debuted a new look.'],'n.cosplay':['Fani przebrani za {w} podbijają media społecznościowe.','Fans dressed as {w} are all over social media.']
});
// rival stable invasion
Object.assign(WEV,{
 async invasion(){
  const sts=(PACK.stables||[]).filter(s=>s.fed!==G.fed.id&&G.rivals.some(r=>r.id===s.fed));if(!sts.length)return false;
  const s=pickR(sts),r=G.rivals.find(x=>x.id===s.fed),v={s:s.name,f:r.short||r.name};
  const ours=pickR(healthy().filter(w=>w.pop>=10));if(!ours)return false;v.w=ours.name;
  const i=await evx('invasion',v,['1','2']);
  if(i===0){G.fed.pop=clamp(G.fed.pop+.5,2,100);r.pop=clamp(r.pop+.3,3,99);ours.injury=Math.max(ours.injury||0,2);ours.morale=clamp((ours.morale||60)-5,0,100);addNews('n.invasion',v)}
  else{const fee=Math.round(sw()*.3/10)*10;G.fed.cash-=fee;addNews('n.invasion2',v)}
  return true}
});
Object.assign(D,{
'ev.w.invasion.t':['Inwazja stajni!','Stable invasion!'],'ev.w.invasion.b':['Stajnia {s} z federacji {f} wpada na Twoją galę i zaatakowała {w}. Pozwolić im na to dla szumu medialnego, czy wezwać ochronę?','The stable {s} from {f} storms your show and targets {w}. Let it happen for the buzz, or call security?'],'ev.w.invasion.1':['Niech wejdą','Let them in'],'ev.w.invasion.2':['Wezwij ochronę','Call security'],
'n.invasion':['Stajnia {s} ({f}) wtargnęła na galę i pobiła {w}. Media szaleją.','{s} ({f}) invaded the show and beat down {w}. The press is buzzing.'],'n.invasion2':['Ochrona wyprowadziła stajnię {s} z hali.','Security removed {s} from the arena.']
});
