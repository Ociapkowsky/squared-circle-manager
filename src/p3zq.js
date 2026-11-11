// ---- v88: relationships with anyone (friendship, rivalry, romance) ----
const RL_NPC={media:['Reporter','Dziennikarz/ka mediów','Media reporter'],spons:['Sponsor','Sponsor','Sponsor'],agent:['Agent','Agent zawodników','Talent agent'],lawyer:['Lawyer','Prawnik','Lawyer'],inv:['Investor','Inwestor','Investor']};
const hashS=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const RL_LOOK=new Map();
function rxEnsure(){if(!G.rel)G.rel={};if(G.relAP==null)G.relAP=2;if(!G.relNpc){G.relNpc={};const sd=(G.week||1)*7+3;Object.keys(RL_NPC).forEach((k,i)=>{const g=rnd()<.5?'f':'m';G.relNpc[k]={n:pickR(RBP.en[0])+' '+pickR(RBP.en[1]),g,s:Math.floor(rnd()*1e9)}})}return G.rel}
function rl(pid){rxEnsure();return G.rel[pid]||(G.rel[pid]={v:0,r:0,st:'',la:G.week,m:0})}
function rlGet(pid){return G.rel&&G.rel[pid]?G.rel[pid]:{v:0,r:0,st:'',la:0}}
function pLook(pid,g){if(RL_LOOK.has(pid))return RL_LOOK.get(pid);const l=randLook(mulberry(hashS(pid)),'US',g==='f');RL_LOOK.set(pid,l);return l}
function pInfo(pid){rxEnsure();const k=pid.split(':'),ty=k[0],id=k.slice(1).join(':');
 if(ty==='w'){const w=W(id);if(!w)return null;return {n:w.name,look:w.look,g:w.g==='f'?'f':'m',role:w.fed===G.fed.id?t('rl.r.roster'):fedShort(w.fed),kind:w.fed===G.fed.id?'roster':'world',w}}
 if(ty==='b'){const x=G.rb&&G.rb[id];if(!x)return null;const g=hashS('g'+id)%2?'f':'m';return {n:x.n,look:pLook(pid,g),g,role:t('rl.r.booker')+' · '+fedShort(id),kind:'booker'}}
 if(ty==='m'){const m=memEnsure().find(x=>x.r===id);if(!m)return null;const g=hashS('g'+m.n)%2?'f':'m';return {n:m.n,look:pLook(pid+m.n,g),g,role:t('rl.r.board')+' · '+t('cn.'+id),kind:'board'}}
 if(ty==='o'){const b=boardEnsure();const g=hashS('g'+b.owner)%2?'f':'m';return {n:b.owner,look:pLook(pid+b.owner,g),g,role:t('rl.r.chair'),kind:'board'}}
 if(ty==='n'){const x=G.relNpc[id];if(!x)return null;return {n:x.n,look:pLook(pid+x.s,x.g),g:x.g,role:t('rl.n.'+id),kind:'npc'}}
 return null}
const relTaken=pid=>hashS('tk'+pid)%100<20;
const relWarm=pid=>.7+(hashS('wm'+pid)%60)/100;
const relLvl=v=>v<=-30?0:v<10?1:v<30?2:v<55?3:v<80?4:5;
const relPk=v=>clamp((v-25)/75,0,1);
const relF=()=>[1,2,5,15,40][clamp(G.fed.tier,1,5)-1];
function relAdd(pid,dv,dr){const x=rl(pid);x.v=clamp(x.v+dv,-100,100);if(dr)x.r=clamp(x.r+dr,0,100);x.la=G.week;return x}
function relPartner(){rxEnsure();const k=Object.keys(G.rel).find(p=>G.rel[p].st==='partner'||G.rel[p].st==='dating');return k||null}
function relPartnerAny(){return relPartner()}
const _iw4=infraWeekly;
infraWeekly=function(){_iw4();try{rxWeekly()}catch(e){}};
function rxWeekly(){if(!G.me)return;rxEnsure();G.relAP=2;const m=meW(),ls=lsEnsure(),b=boardEnsure(),mem=memEnsure();
 Object.keys(G.rel).forEach(pid=>{const x=G.rel[pid],ty=pid.split(':')[0],id=pid.slice(ty.length+1);
  if(G.week-x.la>8&&x.st!=='partner'){x.v+=(x.v>0?-.12:.12)}if(G.week-x.la>10&&x.st==='dating'){x.r=Math.max(0,x.r-.3)}
  const pk=relPk(x.v);if(x.cheat&&rnd()<.02)x.cheat=0;
  if(ty==='w'){const w=W(id);if(w&&w.fed===G.fed.id){if(x.v>=30)w.morale=clamp(w.morale+.15*pk+.05,0,100);else if(x.v<=-30)w.morale=clamp(w.morale-.2,0,100)}}
  else if(ty==='m'){const q=mem.find(y=>y.r===id);if(q)q.t=clamp(q.t+x.v*.002,0,100)}
  else if(ty==='o'){b.conf=clamp(b.conf+x.v*.003,0,100)}
  else if(ty==='n'){if(id==='media'&&G.fed.pop<85)G.fed.pop=clamp(G.fed.pop+.015*pk,2,100);if(id==='spons')G.fed.cash+=Math.round(wkRev()*.012*pk);if(id==='inv'&&ls)ls.inv.idx=Math.round(ls.inv.idx*(1+.0005*pk))}
  if(x.st==='dating'||x.st==='partner'){const full=x.st==='partner';b.conf=clamp(b.conf+(full?.04:.02),0,100);if(m)m.wallet=Math.max(0,m.wallet-Math.round(Math.max(m.wallet*(full?.002:.001),30*relF()*(full?1:.5))));
   if(ty==='w'){const w=W(id);if(w&&w.fed===G.fed.id)mine().forEach(o=>{if(o.id!==id)o.morale=clamp(o.morale-.04,0,100)})}
   else if(ty==='m')mem.forEach(q=>{if(q.r!==id)q.t=clamp(q.t-.04,0,100)});
   else if(ty==='b'&&G.rb&&G.rb[id])G.rb[id].s+=.08}})}
/* ---- perks ---- */
function relDisc(w){const x=rlGet('w:'+w.id);let d=1-clamp(x.v/250,-.25,.3);const ag=rlGet('n:agent');d-=relPk(ag.v)*.15;if(G.me&&G.me.deal){d-=.2}return clamp(d,.5,1.25)}
function relDealUsed(){if(G.me&&G.me.deal)G.me.deal=0}
const _ac=applyChance;applyChance=function(r,bonus){let e=0;try{e+=rlGet('b:'+r.id).v*.0015+rlGet('o').v*.001+rlGet('n:agent').v*.0008;const pp=relPartner();if(pp)e+=.03}catch(x){}return _ac(r,(bonus||0)+e)};
/* ---- actions ---- */
const RL_ACT={chat:{ap:1,c:0,dv:3},coffee:{ap:1,c:20,dv:6},dinner:{ap:1,c:120,dv:10},gift:{ap:1,c:400,dv:14}};
function relDoAct(pid,k){const m=meW(),a=RL_ACT[k];if(!m||!a||G.relAP<a.ap)return null;const cost=a.c*relF();if(m.wallet<cost)return null;
 m.wallet-=cost;G.relAP-=a.ap;const x=rl(pid),warm=relWarm(pid);let dv=a.dv*warm+(rnd()-.5)*3+(k==='gift'?prestigePts()*.15:0);if(x.v<=-30&&k==='chat')dv*=.5;
 relAdd(pid,dv);const i=pInfo(pid);addNews('n.rlact',{n:i?i.n:'?',a:t('rl.a.'+k)});return dv}
function relFlirt(pid){const m=meW();if(!m||G.relAP<1)return null;const x=rl(pid);G.relAP--;const i=pInfo(pid),taken=relTaken(pid);
 const pp=relPartner();const ch=clamp(.12+x.v/220+prestigePts()*.008-(taken?.3:0)-(x.v<0?.2:0),.03,.85);
 x.la=G.week;
 if(rnd()<ch){x.r=clamp(x.r+14+rnd()*8,0,100);x.v=clamp(x.v+4,-100,100);if(x.r>=30&&x.st!=='partner'&&x.st!=='dating'){x.st='dating';addNews('n.rl.d',{n:i.n})}
  if(x.r>=70&&x.st==='dating'){x.st='partner';addNews('n.rl.p',{n:i.n})}
  if(pp&&pp!==pid){G.rel[pp].cheat=1;addNews('n.rl.cheat')}
  if(taken){x.aff=1}return {ok:1,taken}}
 x.v=clamp(x.v-4,-100,100);return {ok:0,taken}}
function relBreak(pid){const x=rl(pid),i=pInfo(pid);x.st='ex';x.v=clamp(x.v-12,-100,100);x.r=0;const m=meW();if(m)m.wallet=Math.round(m.wallet*(x.v<20?.97:.99));
 if(pid.startsWith('w:')){const w=W(pid.slice(2));if(w)evMood(w,-8)}addNews('n.rl.b',{n:i?i.n:'?'})}
function relRiskKind(pid){const ty=pid.split(':')[0],x=rl(pid);let p=.008;if(ty==='w'&&pInfo(pid)&&pInfo(pid).kind==='roster')p=.03;else if(ty==='m'||ty==='o')p=.04;else if(ty==='b')p=.035;if(relTaken(pid)||x.aff)p+=.04;if(x.cheat)p+=.04;return p}
/* ---- UI ---- */
const RLUI={c:'',q:'',sel:null,msg:''};
function rxList(){rxEnsure();const c=RLUI.c||(Object.keys(G.rel).some(p=>G.rel[p].v>=10||G.rel[p].st)?'friends':'roster'),q=(RLUI.q||'').toLowerCase().trim();let ids=[];
 if(c==='friends')ids=Object.keys(G.rel).filter(p=>G.rel[p].v>=10||G.rel[p].st||G.rel[p].v<=-30).sort((a,b)=>G.rel[b].v-G.rel[a].v);
 else if(c==='roster')ids=mine().map(w=>'w:'+w.id);
 else if(c==='board')ids=['o','m:fin','m:tv','m:pres'];
 else if(c==='bookers')ids=Object.keys(G.rb||{}).map(k=>'b:'+k);
 else if(c==='contacts')ids=Object.keys(G.relNpc).map(k=>'n:'+k);
 else ids=G.ws.filter(w=>w.fed!==G.fed.id&&w.fed!=='RET'&&w.name&&w.look).sort((a,b)=>b.pop-a.pop).map(w=>'w:'+w.id);
 let out=ids.map(p=>({p,i:pInfo(p)})).filter(x=>x.i);if(q)out=out.filter(x=>x.i.n.toLowerCase().indexOf(q)>=0);
 if(c==='world'&&!q)out=out.slice(0,30);if(c==='roster')out.sort((a,b)=>rlGet(b.p).v-rlGet(a.p).v);return {c,list:out.slice(0,60)}}
function relRow(x){const r=rlGet(x.p),lv=relLvl(r.v);return '<div class="row spread rlrow'+(RLUI.sel===x.p?' on':'')+'" data-act="relsel" data-p="'+esc(x.p)+'" style="gap:10px;cursor:pointer;flex-wrap:nowrap"><div class="row" style="gap:10px;flex-wrap:nowrap;min-width:0"><div class="av" style="padding:2px">'+avatar(x.i.look,36)+'</div><div style="min-width:0"><b>'+esc(x.i.n)+'</b>'+(r.st?' <span class="tag">'+t('rl.st.'+r.st)+'</span>':'')+'<div class="mute" style="font-size:12px">'+esc(x.i.role)+'</div></div></div><div style="text-align:right;flex-shrink:0"><span class="tag">'+t('rl.l.'+lv)+'</span><div class="mute" style="font-size:12px">'+Math.round(r.v)+(r.r?' · ♥ '+Math.round(r.r):'')+'</div></div></div>'}
function relDetail(){const p=RLUI.sel;if(!p)return '';const i=pInfo(p);if(!i)return '';const r=rlGet(p),f=relF(),m=meW(),ap=G.relAP;
 const btn=(k)=>{const a=RL_ACT[k],c=a.c*f;return '<button class="btn sm" data-act="relact" data-p="'+esc(p)+'" data-k="'+k+'"'+((ap<a.ap||m.wallet<c)?' disabled':'')+'>'+t('rl.a.'+k)+(c?' · '+money(c):'')+'</button>'};
 const romOk=r.v>=15,known=r.v>=30||r.aff;
 let h='<div class="card stack"><div class="row" style="gap:14px;flex-wrap:nowrap;align-items:flex-start"><div class="av" style="padding:6px">'+avatar(i.look,84)+'</div><div class="stack" style="gap:6px;min-width:0"><h3>'+esc(i.n)+'</h3><div class="mute">'+esc(i.role)+'</div>'+
  '<div class="lbl"><span>'+t('rl.rel')+' · '+t('rl.l.'+relLvl(r.v))+'</span><b>'+Math.round(r.v)+'</b></div>'+bar(clamp((r.v+100)/2,0,100),r.v<0?'':'t')+
  (r.st?'<div class="lbl"><span>♥ '+t('rl.st.'+r.st)+'</span><b>'+Math.round(r.r)+'</b></div>'+bar(r.r):'')+
  '<div class="mute" style="font-size:13px">'+(known?t(relTaken(p)?'rl.taken':'rl.free'):t('rl.unk'))+'</div></div></div>'+
  '<div class="mute" style="font-size:13px">'+t('rl.perk.'+i.kind+(i.kind==='npc'?'.'+p.slice(2):''))+'</div><div class="mute" style="font-size:13px">'+t('rl.risk.'+(i.kind==='roster'?'roster':i.kind==='board'?'board':i.kind==='booker'?'booker':'any'))+'</div>'+
  '<div class="row" style="gap:6px;flex-wrap:wrap">'+['chat','coffee','dinner','gift'].map(btn).join('')+
  '<button class="btn sm" data-act="relflirt" data-p="'+esc(p)+'"'+((ap<1||!romOk)?' disabled':'')+'>♥ '+t('rl.a.flirt')+'</button>'+
  ((r.st==='dating'||r.st==='partner')?'<button class="btn sm" data-act="reldate" data-p="'+esc(p)+'"'+((ap<1||m.wallet<200*f)?' disabled':'')+'>'+t('rl.a.date')+' · '+money(200*f)+'</button><button class="btn sm" data-act="relbreak" data-p="'+esc(p)+'">'+t('rl.a.break')+'</button>':'')+'</div>'+
  (RLUI.msg?'<div class="tag" style="align-self:flex-start">'+esc(RLUI.msg)+'</div>':'')+(romOk?'':'<div class="mute" style="font-size:12px">'+t('rl.need')+'</div>')+'</div>';return h}
function vRel(){const m=meW();if(!m)return '<div class="top"><div><h2>'+t('nav.rel')+'</h2></div></div><div class="card mute">'+t('tcg.nome')+'</div>';
 rxEnsure();const L=rxList(),pp=relPartner(),pi=pp?pInfo(pp):null;
 let h='<div class="top"><div><h2>'+t('nav.rel')+'</h2><div class="mute">'+t('rl.sub')+'</div></div></div>';
 h+='<div class="card"><div class="grid g3" style="gap:10px"><div><div class="px">'+t('rl.ap')+'</div><b>'+G.relAP+' / 2</b></div><div><div class="px">'+t('rl.friends')+'</div><b>'+Object.keys(G.rel).filter(p=>G.rel[p].v>=30).length+'</b></div><div><div class="px">'+t('rl.partner')+'</div><b>'+(pi?esc(pi.n)+' ('+t('rl.st.'+G.rel[pp].st)+')':'—')+'</b></div></div></div>';
 h+=relDetail();
 h+='<div class="card stack"><div class="row" style="gap:8px;flex-wrap:wrap"><select id="relc" class="field" style="width:auto" data-chg="relc">'+['friends','roster','board','bookers','contacts','world'].map(k=>'<option value="'+k+'"'+(L.c===k?' selected':'')+'>'+t('rl.c.'+k)+'</option>').join('')+'</select><input id="relq" class="field" style="width:200px" placeholder="'+esc(t('rl.search'))+'" value="'+esc(RLUI.q)+'" data-chg="relq"></div>'+(L.list.length?L.list.map(relRow).join(''):'<div class="mute">'+t('ui.none')+'</div>')+'</div>';return h}
/* ---- events ---- */
const rlPickP=(kinds)=>{const k=pickR(kinds);if(k==='world'){const w=pickR(G.ws.filter(x=>x.fed!==G.fed.id&&x.fed!=='RET'&&x.name&&x.look));return w?'w:'+w.id:null}
 if(k==='roster'){const w=pickR(mine());return w?'w:'+w.id:null}if(k==='board')return pickR(['o','m:fin','m:tv','m:pres']);if(k==='booker'){const b=Object.keys(G.rb||{});return b.length?'b:'+pickR(b):null}if(k==='npc')return 'n:'+pickR(Object.keys(RL_NPC));return null};
const relFriends=(min,pre)=>Object.keys(G.rel||{}).filter(p=>G.rel[p].v>=min&&(!pre||p.startsWith(pre)));
E('rl.meet','Nowa znajomość','New acquaintance','Na gali poznajesz {n} ({r}). Rozmowa się klei.','At a show you meet {n} ({r}). The conversation clicks.',[['Porozmawiaj dłużej','Talk longer'],['Grzecznie się pożegnaj','Politely part ways']]);
E('rl.coffee','Zaproszenie na kawę','Coffee invitation','{n} ({r}) zaprasza Cię na kawę. Okazja, żeby się lepiej poznać (koszt {m}).','{n} ({r}) invites you for coffee. A chance to get to know each other (cost {m}).',[['Przyjmij zaproszenie ({m})','Accept ({m})'],['Odmów','Decline']]);
E('rl.dinner','Kolacja z zarządem','Board dinner','{n} ({r}) zaprasza Cię na kolację (koszt {m}). Atmosfera robi się nieformalna.','{n} ({r}) invites you to dinner (cost {m}). The mood gets informal.',[['Zjedz kolację ({m})','Have dinner ({m})'],['Potraktuj to jak randkę ({m})','Treat it as a date ({m})'],['Odmów','Decline']]);
E('rl.gossip','Plotka w tabloidzie','Tabloid rumor','Tabloid pisze o Twoim życiu prywatnym{x}.','A tabloid writes about your private life{x}.',[['Zaprzecz publicznie ({m})','Deny it publicly ({m})'],['Zignoruj','Ignore it'],['Podkręć temat','Fan the flames']]);
E('rl.jealous','Zazdrość','Jealousy','{n} jest zazdrosny/a o Twoje spotkania z innymi i chce poważnej rozmowy.','{n} is jealous of your meetings with others and wants a serious talk.',[['Uspokój ({m})','Reassure ({m})'],['Zbagatelizuj','Brush it off']]);
E('rl.anniv','Rocznica','Anniversary','Rocznica Waszego związku z {n}. Prezent kosztuje {m}.','The anniversary of your relationship with {n}. A gift costs {m}.',[['Kup prezent ({m})','Buy a gift ({m})'],['Zapomnij','Forget it']]);
E('rl.favor','Prośba o przysługę','A favor','{n} ze składu, Twój przyjaciel, prosi o lepsze miejsce na karcie. Reszta może to źle odebrać.','{n} from your roster, a friend, asks for a better spot on the card. The rest may take it badly.',[['Daj mu szansę','Give him a shot'],['Odmów','Decline']]);
E('rl.ref','Polecenie','A recommendation','{n} poleca Cię w {f}. Mogą złożyć Ci ofertę na stanowisko bookera.','{n} recommends you at {f}. They might offer you the booker job.',[['Skorzystaj z polecenia','Use the recommendation'],['Podziękuj','Thanks, no']]);
E('rl.ex','Powrót byłej osoby','An ex returns','{n} odzywa się po dłuższej przerwie.','{n} reaches out after a long silence.',[['Odnów kontakt','Reconnect'],['Zamknij rozdział','Close the chapter']]);
E('rl.agent','Okazja od agenta','Agent\'s deal','{n} (agent) ma dla Ciebie okazję: 20% zniżki na najbliższe podpisanie zawodnika.','{n} (agent) has a deal: 20% off your next signing.',[['Przyjmij okazję','Take the deal'],['Odmów','Decline']]);
E('rl.tip','Cynk od bookera','Booker\'s tip','{n} szepnął Ci pomysł na storyline. Fani i feudy dostaną kopa.','{n} whispered a storyline idea. Fans and feuds get a boost.',[['Wykorzystaj pomysł','Use the idea'],['Odpuść','Pass']]);
E('rl.scandal','Skandal','Scandal','Wyciekła informacja o Twojej relacji z {n}. Media huczą.','News of your relationship with {n} leaked. The media is buzzing.',[['Zatuszuj ({m})','Cover it up ({m})'],['Przyznaj się publicznie','Come clean'],['Zignoruj','Ignore it']]);
E('rl.drama','Dramat w związku','Relationship drama','{n} odchodzi – relacja nie przetrwała.','{n} leaves – the relationship did not survive.',[['Pozwól odejść','Let go'],['Spróbuj ratować ({m})','Try to save it ({m})']]);
const iN=pid=>{const i=pInfo(pid);return i?i.n:'?'},iR=pid=>{const i=pInfo(pid);return i?i.role:''};
const wdo=(k,f)=>{WEV[k]=f};
Object.assign(WEV,{
 async relmeet(){if(!G.me||G.week<6)return false;const p=rlPickP(['world','npc','booker','world']);if(!p||pInfo(p)==null)return false;const i=await evx('rl.meet',{n:iN(p),r:iR(p)},['1','2'],[false,false]);if(i===0)relAdd(p,8);return true},
 async relcoffee(){if(!G.me||G.week<6)return false;const l=relFriends(8).concat(['o','m:fin','m:tv','m:pres']);const p=pickR(l);if(!p||!pInfo(p))return false;const m=meW(),c=20*relF();const i=await evx('rl.coffee',{n:iN(p),r:iR(p),m:money(c)},['1','2'],[m.wallet<c,false]);if(i===0){m.wallet-=c;relAdd(p,6)}else relAdd(p,-2);return true},
 async reldinner(){if(!G.me||G.week<10)return false;const p=pickR(['o','m:fin','m:tv','m:pres']);const m=meW(),c=120*relF();const i=await evx('rl.dinner',{n:iN(p),r:iR(p),m:money(c)},['1','2','3'],[m.wallet<c,m.wallet<c,false]);if(i===0){m.wallet-=c;relAdd(p,8)}else if(i===1){m.wallet-=c;relAdd(p,5);const o=rl(p);if(o.v>=15&&rnd()<.35+o.v/250){o.r=clamp(o.r+14,0,100);if(o.r>=30&&!o.st){o.st='dating';addNews('n.rl.d',{n:iN(p)})}}else relAdd(p,-5)}else relAdd(p,-3);return true},
 async relgossip(){const pp=relPartner();const fr=relFriends(30);if(!G.me||(!pp&&!fr.length))return false;const m=meW(),c=150*relF(),who=pp||pickR(fr);const i=await evx('rl.gossip',{x:' ('+iN(who)+')',m:money(c)},['1','2','3'],[m.wallet<c,false,false]);
  if(i===0){m.wallet-=c;G.fed.pop=clamp(G.fed.pop+.1,2,100);addNews('n.rg1')}else if(i===1){G.fed.pop=clamp(G.fed.pop-.3,2,100);if(pp)relAdd(pp,-3);addNews('n.rg2')}else{G.fed.pop=clamp(G.fed.pop+.4,2,100);boardEnsure().conf=clamp(boardEnsure().conf-2,0,100);if(pp)relAdd(pp,-6);addNews('n.rg3')}return true},
 async reljealous(){const pp=relPartner();if(!G.me||!pp)return false;const m=meW(),c=100*relF();const i=await evx('rl.jealous',{n:iN(pp),m:money(c)},['1','2'],[m.wallet<c,false]);if(i===0){m.wallet-=c;relAdd(pp,4,4)}else relAdd(pp,-4,-4);return true},
 async relanniv(){const pp=relPartner();if(!G.me||!pp||G.rel[pp].r<30)return false;const m=meW(),c=400*relF();const i=await evx('rl.anniv',{n:iN(pp),m:money(c)},['1','2'],[m.wallet<c,false]);if(i===0){m.wallet-=c;relAdd(pp,5,6)}else relAdd(pp,-5,-6);return true},
 async relfavor(){const l=relFriends(20,'w:').filter(p=>{const w=W(p.slice(2));return w&&w.fed===G.fed.id});if(!G.me||!l.length)return false;const p=pickR(l),w=W(p.slice(2));const i=await evx('rl.favor',{n:w.name},['1','2'],[false,false]);if(i===0){relAdd(p,10);w.pop=clamp(w.pop+.5,1,100);mine().forEach(o=>{if(o.id!==w.id)evMood(o,-2)})}else relAdd(p,-6);return true},
 async relref(){jobsEnsure();const l=relFriends(40).filter(p=>p.startsWith('b:')||p==='o');if(!G.me||!l.length)return false;const rv=pickR(G.rivals.filter(r=>r.tier>=1&&!G.offers.some(o=>o.id===r.id)&&G.rb&&G.rb[r.id]));if(!rv)return false;const p=pickR(l);const i=await evx('rl.ref',{n:iN(p),f:rv.name},['1','2'],[false,false]);if(i===0){G.offers.push({id:rv.id,wk:G.week,exp:G.week+10});addNews('n.ap2',{f:rv.name});const j=await askGeneric(t('ap.yes',{f:rv.name}),t('ap.yesb',{f:rv.name}),[{l:t('job.1',{f:rv.name})},{l:t('job.2')}]);if(j===0&&takeOver(rv.id))G.screen='dash'}return true},
 async relex(){const l=Object.keys(G.rel||{}).filter(p=>G.rel[p].st==='ex'&&pInfo(p));if(!G.me||!l.length||relPartner())return false;const p=pickR(l);const i=await evx('rl.ex',{n:iN(p)},['1','2'],[false,false]);if(i===0){const x=rl(p);x.st='';relAdd(p,8,10);addNews('n.rl.x',{n:iN(p)})}else relAdd(p,-5);return true},
 async relagent(){const ag=rlGet('n:agent');if(!G.me||ag.v<30||G.me.deal)return false;const i=await evx('rl.agent',{n:iN('n:agent')},['1','2'],[false,false]);if(i===0){G.me.deal=1;addNews('n.rag')}return true},
 async reltip(){const l=relFriends(40,'b:');if(!G.me||!l.length)return false;const p=pickR(l);const i=await evx('rl.tip',{n:iN(p)},['1','2'],[false,false]);if(i===0){G.feuds.forEach(f=>{f.heat=clamp(f.heat+5,0,100)});G.fed.pop=clamp(G.fed.pop+.2,2,100);addNews('n.rtp')}return true},
 async relscandal(){const l=Object.keys(G.rel||{}).filter(p=>(G.rel[p].st==='dating'||G.rel[p].st==='partner')&&pInfo(p));if(!G.me||!l.length)return false;const p=pickR(l);if(rnd()>relRiskKind(p)*5)return false;
  const m=meW(),c=300*relF(),lw=relPk(rlGet('n:lawyer').v),md=relPk(rlGet('n:media').v),k=.8*(1-.5*lw-.3*md),b=boardEnsure();const i=await evx('rl.scandal',{n:iN(p),m:money(c)},['1','2','3'],[m.wallet<c,false,false]);
  if(i===0){m.wallet-=c;b.conf=clamp(b.conf-1*k,0,100);addNews('n.rs.1')}else if(i===1){G.fed.pop=clamp(G.fed.pop-.2*k,2,100);b.conf=clamp(b.conf-2*k,0,100);relAdd(p,4);addNews('n.rs.2')}else{b.conf=clamp(b.conf-3.5*k,0,100);G.fed.pop=clamp(G.fed.pop-.35*k,2,100);memEnsure().forEach(q=>q.t=clamp(q.t-2*k,0,100));addNews('n.rs.3')}return true},
 async reldrama(){const l=Object.keys(G.rel||{}).filter(p=>(G.rel[p].st==='partner'||G.rel[p].st==='dating')&&(G.rel[p].r<20||G.rel[p].cheat)&&pInfo(p));if(!G.me||!l.length)return false;const p=pickR(l),m=meW(),c=400*relF();const i=await evx('rl.drama',{n:iN(p),m:money(c)},['1','2'],[false,m.wallet<c]);
  if(i===1&&rnd()<.65){m.wallet-=c;G.rel[p].cheat=0;relAdd(p,6,10)}else{relBreak(p);if(G.rel[p]&&G.rel[p].cheat){boardEnsure().conf=clamp(boardEnsure().conf-2,0,100)}}return true}
});
Object.assign(D,{'nav.rel':['Relacje','Relationships'],'rl.sub':['Buduj relacje z każdym w świecie gry: znajomości, przyjaźnie, a czasem coś więcej. Dobre relacje dają zniżki, polecenia i prestiż, ale każda ma cenę i ryzyko. Masz 2 akcje tygodniowo.','Build relationships with anyone in the game world: acquaintances, friendships, sometimes more. Good relations bring discounts, referrals and prestige, but every one has a price and a risk. You have 2 actions per week.'],
 'rl.ap':['Akcje w tym tygodniu','Actions this week'],'rl.friends':['Przyjaciele','Friends'],'rl.partner':['Partner/ka','Partner'],'rl.rel':['Relacja','Relationship'],'rl.search':['Szukaj po imieniu…','Search by name…'],
 'rl.c.friends':['Moje relacje','My relationships'],'rl.c.roster':['Twój skład','Your roster'],'rl.c.board':['Rada i szef','Board and chair'],'rl.c.bookers':['Bookerzy','Bookers'],'rl.c.contacts':['Kontakty','Contacts'],'rl.c.world':['Świat wrestlingu','Wrestling world'],
 'rl.r.roster':['Twój skład','Your roster'],'rl.r.booker':['Booker','Booker'],'rl.r.board':['Rada','Board'],'rl.r.chair':['Przewodniczący rady','Board chair'],
 'rl.n.media':['Dziennikarstwo i media','Media'],'rl.n.spons':['Sponsor','Sponsor'],'rl.n.agent':['Agent zawodników','Talent agent'],'rl.n.lawyer':['Prawnik','Lawyer'],'rl.n.inv':['Inwestor','Investor'],
 'rl.l.0':['Wróg','Enemy'],'rl.l.1':['Obcy','Stranger'],'rl.l.2':['Znajomy','Acquaintance'],'rl.l.3':['Przyjaciel','Friend'],'rl.l.4':['Bliski przyjaciel','Close friend'],'rl.l.5':['Najlepszy przyjaciel','Best friend'],
 'rl.st.dating':['Randkujecie','Dating'],'rl.st.partner':['Związek','In a relationship'],'rl.st.ex':['Była osoba','Ex'],
 'rl.a.chat':['Rozmowa','Chat'],'rl.a.coffee':['Kawa','Coffee'],'rl.a.dinner':['Kolacja','Dinner'],'rl.a.gift':['Prezent','Gift'],'rl.a.flirt':['Flirt','Flirt'],'rl.a.date':['Randka','Date'],'rl.a.break':['Zerwij','Break up'],
 'rl.taken':['Jest w związku.','Is in a relationship.'],'rl.free':['Wolny/a.','Single.'],'rl.unk':['Stan cywilny: nieznany (poznasz go, gdy relacja się pogłębi).','Relationship status: unknown (you\'ll find out as the relationship deepens).'],'rl.need':['Flirt wymaga relacji od ok. 15 punktów.','Flirting needs a relationship of about 15 points.'],
 'rl.perk.roster':['Dobra relacja: wyższe morale zawodnika i tańsze podpisanie lub kontrakt. Zła relacja: kłopoty i droższy kontrakt.','A good relationship: higher morale and cheaper signing or contract. A bad one: trouble and a pricier contract.'],
 'rl.perk.world':['Dobra relacja: taniej podpiszesz tego zawodnika, gdy będzie wolnym agentem.','A good relationship: you can sign him cheaper when he is a free agent.'],
 'rl.perk.booker':['Dobra relacja: większa szansa przy aplikacji do jego federacji, polecenia i cynki. Ryzyko: przecieki.','A good relationship: a better chance when applying to his federation, referrals and tips. Risk: leaks.'],
 'rl.perk.board':['Dobra relacja: większe zaufanie rady lub szefa i pomoc w ocenie. Ryzyko: konflikt interesów.','A good relationship: more trust from the board or chair and help in reviews. Risk: conflict of interest.'],
 'rl.perk.npc.media':['Przyjaciel w mediach: powoli buduje rozgłos federacji i łagodzi skandale.','A friend in the media: slowly builds the federation\'s buzz and softens scandals.'],'rl.perk.npc.spons':['Sponsor: dobra relacja to stały dodatkowy przychód federacji.','Sponsor: a good relationship is steady extra revenue for the federation.'],'rl.perk.npc.agent':['Agent: dobra relacja to tańsze podpisania zawodników i okazje.','Agent: a good relationship means cheaper signings and deals.'],'rl.perk.npc.lawyer':['Prawnik: dobra relacja łagodzi skutki skandali.','Lawyer: a good relationship softens the fallout of scandals.'],'rl.perk.npc.inv':['Inwestor: dobra relacja podnosi zyski z Twoich inwestycji.','Investor: a good relationship raises your investment returns.'],
 'rl.risk.roster':['Ryzyko: związek ze zawodnikiem ze składu obniża morale pozostałych i grozi skandalem.','Risk: dating a wrestler on your roster lowers everyone else\'s morale and risks a scandal.'],'rl.risk.board':['Ryzyko: romans w radzie obniża zaufanie pozostałych jej członków.','Risk: a romance on the board lowers the trust of the other members.'],'rl.risk.booker':['Ryzyko: romans z rywalem to przecieki i skandale.','Risk: a romance with a rival means leaks and scandals.'],'rl.risk.any':['Ryzyko: każdy związek kosztuje pieniądze i może wywołać plotki.','Risk: every relationship costs money and can cause rumors.'],
 'rl.res.act':['Relacja: {d}','Relationship: {d}'],'rl.res.ok':['Flirt zadziałał!','The flirting worked!'],'rl.res.no':['Flirt się nie udał.','The flirting fell flat.'],'rl.res.taken':['Flirt zadziałał, ale ta osoba jest już w związku…','The flirting worked, but this person is already taken…'],
 'n.rlact':['Spotkanie z {n}: {a}.','Time with {n}: {a}.'],'n.rl.d':['Zaczynasz randkować z {n}.','You start dating {n}.'],'n.rl.p':['Związek z {n} staje się poważny.','Your relationship with {n} gets serious.'],'n.rl.cheat':['Flirtujesz na boku – to może się źle skończyć.','You flirt on the side – this may end badly.'],'n.rl.b':['Koniec relacji z {n}.','The relationship with {n} is over.'],'n.rl.x':['Wracacie do siebie z {n}.','You and {n} are back together.'],
 'n.rg1':['Plotka zdementowana.','The rumor was denied.'],'n.rg2':['Plotka krąży – cisza w odpowiedzi.','The rumor circulates – silence in reply.'],'n.rg3':['Podkręciłeś temat – gazety zacierają ręce.','You fanned the flames – the papers rub their hands.'],'n.rag':['Agent załatwił okazję na tańsze podpisanie.','The agent lined up a cheaper signing.'],'n.rtp':['Cynk bookera pomógł feudom.','The booker\'s tip boosted feuds.'],
 'n.rs.1':['Skandal zatuszowany.','Scandal covered up.'],'n.rs.2':['Przyznajesz się – szczerość docenia część fanów.','You come clean – some fans appreciate the honesty.'],'n.rs.3':['Skandal rośnie – rada zaniepokojona.','The scandal grows – the board is worried.']});
