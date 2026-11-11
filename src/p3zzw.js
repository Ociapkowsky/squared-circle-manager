// ---- v124: Road to the Big One (yearly flagship show, plan, hype, Royal Rumble, payoff) ----
MODES['8way']={a:8,b:0,ffa:1,g:1};MODES['10way']={a:10,b:0,ffa:1,g:1};
const RDY=52,RDLEN=16,RDSTK={std:1,high:1.5,career:2.2};
const rdOn=()=>!!(G&&G.fed&&G.fed.tier>=2);
const rdFlagAt=w=>Math.ceil(Math.max(1,w)/RDY)*RDY;
function rdFresh(fl,name,hist){return {fl,name:name||'',p:null,hype:0,rr:null,main:null,done:0,hist:hist||[],camp:-9,seg:-9,hw:0,ev:{},mitb:0}}
function rdEnsure(){if(!G.rd)G.rd=rdFresh(rdFlagAt(G.week));else if(G.week>G.rd.fl)G.rd=rdFresh(rdFlagAt(G.week),G.rd.name,G.rd.hist);return G.rd}
const rdName=()=>rdEnsure().name||'Mega Mania';
const rdLeft=()=>rdEnsure().fl-G.week;
const rdRoad=()=>rdOn()&&rdLeft()<=RDLEN&&rdLeft()>=0;
function rdPlanOk(){const p=rdEnsure().p;if(!p)return false;const a=W(p.a),b=W(p.b);return !!(a&&b&&a.fed===G.fed.id&&b.fed===G.fed.id&&!a.ext&&!b.ext&&!a.farewell&&!b.farewell)}
const rdLive=()=>rdRoad()&&rdPlanOk()&&rdLeft()>=1;
function rdSetPlan(a,b,tt,st,win){const g=rdEnsure(),A=W(a),B=W(b);if(!A||!B||a===b||A.fed!==G.fed.id||B.fed!==G.fed.id||A.ext||B.ext)return 'no';
 let ti='';if(tt){const T=titleOf(tt);if(!T||T.teams!==1||!genderOK(T,[a,b]))return 'title';ti=tt}
 if(g.p&&g.p.lock&&g.p.a!==a)return 'lock';
 g.p={a,b,tt:ti,st:RDSTK[st]?st:'std',win:win==='b'?'b':'a',lock:g.p?g.p.lock:0};return 'ok'}
function rdMainMatch(){const g=rdEnsure(),p=g.p;if(!p||!rdPlanOk())return null;return G.card.findIndex(m=>{const s=sides(m),all=s.A.concat(s.B);return all.indexOf(p.a)>=0&&all.indexOf(p.b)>=0})}
function rdAddMain(){const g=rdEnsure(),p=g.p;if(!p||!rdPlanOk()||G.week!==g.fl)return 'no';if(rdMainMatch()>=0)return 'dup';const u=usedIds(-1);if(u.has(p.a)||u.has(p.b)||G.card.length>=6)return 'busy';
 const m=emptyMatch();m.mode='1v1';m.a[0]=p.a;m.b[0]=p.b;m.winner=p.win;m.finish='clean';if(p.tt)m.title=p.tt;m.rd='main';fixMatch(m);G.card.push(m);return 'ok'}
function rdAddRumble(){const g=rdEnsure();if(!rdOn()||G.week!==g.fl-12||g.rr)return 'no';const u=usedIds(-1),pool=healthy().filter(w=>!u.has(w.id)&&!w.ext&&!w.farewell).sort((a,b)=>b.pop-a.pop);
 const n=pool.length>=10?10:pool.length>=8?8:pool.length>=6?6:0;if(!n||G.card.length>=6)return 'busy';
 const m=emptyMatch();m.mode=n+'way';pool.slice(0,n).forEach((w,i)=>{m.a[i]=w.id});m.finish='clean';m.rd='rumble';fixMatch(m);G.card.push(m);return 'ok'}
// hype sources
function rdWeekly(){if(!rdOn())return;const g=rdEnsure();if(!rdRoad())return;
 if(g.p&&rdPlanOk()){const a=W(g.p.a),b=W(g.p.b);let d=.9+((a.mic||40)+(b.mic||40))/200*.8;
  if(a.fin&&a.fin.lv>=50)d+=.1;if(a.ent&&a.ent.lv>=2)d+=.1;if(g.hype>80)d-=.8;
  [a,b].forEach(w=>{if(w.injury>0&&!g.ev['i'+w.id+w.injury]){g.ev['i'+w.id+w.injury]=1;d-=8;addNews('n.rdinj',{w:w.name})}});
  g.hype=clamp(g.hype+d,0,100);
  const h=G.hist&&G.hist[G.hist.length-1];if(h&&h.week!==g.hw){g.hw=h.week;if(h.rating>=3.8)g.hype=clamp(g.hype+2,0,100);else if(h.rating<2.5)g.hype=clamp(g.hype-3,0,100)}}
 else g.hype=Math.max(0,g.hype-.3)}
const _iwRd=infraWeekly;infraWeekly=function(){_iwRd();try{rdWeekly();const g=rdEnsure();
 if(rdOn()&&G.week===g.fl+1&&!g.done&&G.rd===g){}}catch(e){}};
// flagship name in schedule/header
const _bnfRd=bigNameFor;bigNameFor=function(fid,wk){try{if(G&&G.fed&&fid===G.fed.id&&rdOn()&&wk%RDY===0)return (G.rd&&G.rd.name)||'Mega Mania'}catch(e){}return _bnfRd(fid,wk)};
// demand on the night, rating of the main event
const _dmRd=demandAt;demandAt=function(pm,noise){let d=_dmRd(pm,noise);try{if(rdOn()&&G.rd&&G.rd.p&&rdPlanOk()){if(G.week===G.rd.fl)d+=G.rd.hype/100*.14;else if(rdRoad())d+=G.rd.hype/100*.03}}catch(e){}return d};
const _bsRd=baseStars;baseStars=function(m,pos,total){let r=_bsRd(m,pos,total);try{const g=G.rd;if(rdOn()&&g&&g.p&&G.week===g.fl&&rdPlanOk()){const{A,B}=sides(m),all=A.concat(B);if(all.indexOf(g.p.a)>=0&&all.indexOf(g.p.b)>=0)r+=g.hype/100*.45}}catch(e){}return r};
const _fmRd=finalizeMatch;finalizeMatch=function(m,res,pos,total,fo){const r=_fmRd(m,res,pos,total,fo);try{if(!rdOn())return r;const g=rdEnsure(),oc=outcome(m);
 if(m.rd==='rumble'&&!g.rr&&oc.wi.length){const id=oc.wi[0],w=W(id);g.rr={w:id,wk:G.week};g.hype=clamp(g.hype+10,0,100);
  if(w&&w.fed===G.fed.id&&!w.ext){const T=G.titles.find(x=>x.teams===1&&x.holders.length===1&&x.holders[0]!==id&&genderOK(x,[id]));const ch=T?T.holders[0]:null;
   if(!g.p||!g.p.lock){const b=ch&&W(ch)&&W(ch).fed===G.fed.id&&!W(ch).ext?ch:(g.p&&g.p.b!==id?g.p.b:null);const bb=b||mine().filter(x=>!x.ext&&x.id!==id).sort((x,y)=>y.pop-x.pop)[0];
    if(bb){g.p={a:id,b:bb.id||bb,tt:T&&ch===(bb.id||bb)?T.id:(g.p?g.p.tt:''),st:g.p?g.p.st:'std',win:'a',lock:1}}}}
  addNews('n.rdrumble',{w:w?w.name:'?'})}
 if(m.stip==='prizematch'&&rdRoad()&&!g.mitb&&G.week<g.fl){g.mitb=1;g.hype=clamp(g.hype+5,0,100);addNews('n.rdmitb')}
 if(G.week===g.fl&&g.p&&!g.main){const{A,B}=sides(m),all=A.concat(B);if(all.indexOf(g.p.a)>=0&&all.indexOf(g.p.b)>=0)g.main={stars:res.stars,win:oc.wi.indexOf(g.p.a)>=0?'a':'b',title:!!m.title}}}catch(e){}return r};
// payoff at the flagship show
function rdResolve(){if(!rdOn())return;const g=rdEnsure();if(G.week!==g.fl||g.done)return;g.done=1;const p=g.p,k=p?RDSTK[p.st]:1;let res='skip',cash=0,st=0;
 if(!p||!rdPlanOk()||!g.main){xpop(-1.2);xconf(-3);addNews('n.rdskip',{n:rdName()})}
 else{st=g.main.stars;const R=k*(g.hype/100),ok=st>=3.5&&g.main.win===p.win,A=W(p.a),B=W(p.b);
  let bonus=1;if(g.rr)bonus+=.1;if(g.hype>=60)bonus+=.1;if(st>=4.2)bonus+=.1;if(g.mitb)bonus+=.05;
  if(ok){res='ok';cash=r10(wkRev()*3.2*R*bonus);G.fed.cash+=cash;xpop(Math.min(3,.9*R*bonus));xconf(4*R);if(A){A.pop=clamp(A.pop+Math.min(6,3*k),1,100);evMood(A,6)}addNews('n.rdok',{n:rdName(),m:money(cash)});G.ach=G.ach||{};G.ach.rdok=G.week}
  else if(st>=3){res='part';cash=r10(wkRev()*1.2*R);G.fed.cash+=cash;xpop(.3*R);addNews('n.rdpart',{n:rdName()})}
  else{res='flop';xpop(-.8*k);xconf(-3*k);if(A)evMood(A,-4);if(B)evMood(B,-4);addNews('n.rdflop',{n:rdName()})}
  if(p.st==='career'){const lw=g.main.win==='a'?B:A;if(lw){lw.pop=clamp(lw.pop-5,1,100);evMood(lw,-8)}}}
 g.hist.push({fl:g.fl,name:rdName(),stars:st,hype:Math.round(g.hype),res,cash});if(g.hist.length>8)g.hist.shift();g.last=G.week}
const _fsRd=finishShow;finishShow=function(out){try{rdResolve()}catch(e){}return _fsRd(out)};
const _vsuRd=vSummary;vSummary=function(){let h=_vsuRd();try{const g=G.rd,x=g&&g.hist&&g.hist[g.hist.length-1];if(x&&g.last&&G.week-g.last<=1&&G.showResult)h+='<div class="card stack"><h3>★ '+esc(x.name)+'</h3><b style="color:'+(x.res==='ok'?'var(--gold)':x.res==='part'?'inherit':'#d4343c')+'">'+t('rd.res.'+x.res)+'</b><div class="mute" style="font-size:13px">'+(x.stars?'★ '+f2(x.stars)+' · ':'')+t('rd.hype')+' '+x.hype+(x.cash?' · +'+money(x.cash):'')+'</div></div>'}catch(e){}return h};
const _toRd=takeOver;takeOver=function(tid){const ok=_toRd(tid);if(ok)G.rd=null;return ok};
// ---- UI ----
const RDUI={msg:''};
const rdSel=(id,list,cur,blank)=>'<select id="'+id+'" class="field" style="width:auto;max-width:100%">'+(blank?'<option value="">'+blank+'</option>':'')+list.map(x=>'<option value="'+x[0]+'"'+(x[0]===cur?' selected':'')+'>'+esc(x[1])+'</option>').join('')+'</select>';
function vRd(){const g=rdEnsure();let h='<div class="top"><div><h2>'+t('nav.rd')+'</h2><div class="mute" style="max-width:66ch">'+t('rd.sub')+'</div></div></div>';
 if(!rdOn())return h+'<div class="card mute">'+t('rd.locked')+'</div>';
 if(RDUI.msg){h+='<div class="note">'+esc(RDUI.msg)+'</div>';RDUI.msg=''}
 const left=rdLeft(),p=g.p,ok=rdPlanOk(),stage=left<=0?'gala':left<=RDLEN?'road':'plan';
 h+='<div class="card stack"><div class="row spread" style="gap:8px;flex-wrap:wrap"><h3>★ '+esc(rdName())+'</h3><span class="tag" style="color:var(--gold)">'+(left>0?t('rd.in',{n:left}):t('rd.today'))+' · '+t('rd.stage.'+stage)+'</span></div>'+
  '<div class="row" style="gap:6px"><input id="rdname" class="field" maxlength="30" value="'+esc(rdName())+'" data-chg="rdname" style="min-width:0;max-width:260px"><span class="mute" style="font-size:12px">'+t('rd.name')+'</span></div>'+
  '<div class="lbl"><span>'+t('rd.hype')+'</span><b>'+Math.round(g.hype)+'</b></div>'+bar(g.hype,'t')+'<div class="mute" style="font-size:13px">'+t('rd.hyped')+'</div></div>';
 const ms=mine().filter(w=>!w.ext&&!w.farewell).sort((a,b)=>b.pop-a.pop).map(w=>[w.id,w.name+' · '+Math.round(w.pop)]);
 const tts=G.titles.filter(x=>x.teams===1).map(x=>[x.id,titleName(x)]);
 h+='<div class="card stack"><h3>'+t('rd.plan')+'</h3><div class="mute" style="font-size:13px">'+t('rd.pland')+'</div>'+
  '<div class="grid g2" style="gap:8px"><div><div class="px">'+t('rd.a')+'</div>'+rdSel('rda',ms,p?p.a:'')+'</div><div><div class="px">'+t('rd.b')+'</div>'+rdSel('rdb',ms,p?p.b:'')+'</div>'+
  '<div><div class="px">'+t('rd.title')+'</div>'+rdSel('rdt',tts,p?p.tt:'',t('rd.notitle'))+'</div><div><div class="px">'+t('rd.stake')+'</div>'+rdSel('rds',Object.keys(RDSTK).map(k=>[k,t('rd.st.'+k)]),p?p.st:'std')+'</div>'+
  '<div><div class="px">'+t('rd.win')+'</div>'+rdSel('rdw',[['a',t('rd.win.a')],['b',t('rd.win.b')]],p?p.win:'a')+'</div></div>'+
  '<div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn gold" data-act="rdplan">'+t('rd.save')+'</button>'+
  (G.week===g.fl?'<button class="btn" data-act="rdmain"'+(!ok||rdMainMatch()>=0?' disabled':'')+'>'+t(rdMainMatch()>=0?'rd.onc':'rd.addmain')+'</button>':'')+'</div>'+
  (p&&p.lock?'<div class="mute" style="font-size:13px">🔒 '+t('rd.lock')+'</div>':'')+(!ok&&p?'<div class="mute" style="font-size:13px;color:#d4343c">'+t('rd.bad')+'</div>':'')+'</div>';
 const camps=[[1,.1,6],[2,.25,12],[3,.6,25]],cd=g.camp+2-G.week;
 h+='<div class="card stack"><h3>'+t('rd.hh')+'</h3><div class="row" style="gap:6px;flex-wrap:wrap">'+camps.map(c=>'<button class="btn sm" data-act="rdcamp" data-k="'+c[0]+'"'+((!ok||!rdRoad()||cd>0||G.fed.cash<xc(c[1]))?' disabled':'')+'>'+t('rd.camp.'+c[0])+' · '+money(xc(c[1]))+' · +'+c[2]+'</button>').join('')+'<button class="btn sm" data-act="rdseg"'+((!ok||!rdRoad()||g.seg>=G.week)?' disabled':'')+'>'+t('rd.seg')+'</button></div>'+
  '<div class="mute" style="font-size:13px">'+(cd>0?t('gi.cd',{n:cd})+' · ':'')+t('rd.hsrc')+'</div></div>';
 const rw=g.fl-12;h+='<div class="card stack"><h3>'+t('rd.rr')+'</h3><div class="mute" style="font-size:13px">'+t('rd.rrd',{n:rw})+'</div>'+(g.rr?'<div class="tag" style="align-self:flex-start">🏆 '+esc(W(g.rr.w)?W(g.rr.w).name:'?')+'</div>':'<div><button class="btn sm" data-act="rdrumble"'+(G.week!==rw?' disabled':'')+'>'+(G.week===rw?t('rd.addrr'):t('rd.rrwk',{n:rw}))+'</button></div>')+'</div>';
 const case_=(G.prizes||[]).find(x=>x.kind==='case'&&x.holder);
 h+='<div class="card stack"><h3>'+t('rd.mitb')+'</h3><div class="mute" style="font-size:13px">'+t('rd.mitbd')+'</div>'+(case_&&W(case_.holder)?'<div class="tag" style="align-self:flex-start">💼 '+esc(W(case_.holder).name)+'</div>':'')+'<div><button class="btn sm" data-act="rdgo" data-s="prizes">'+t('rd.toprizes')+'</button></div></div>';
 const goals=[[ok,'rd.g1'],[g.hype>=60,'rd.g2'],[!!g.rr,'rd.g3'],[g.mitb,'rd.g4'],[!!(p&&ok&&!(W(p.a).injury>0)&&!(W(p.b).injury>0)),'rd.g5']];
 h+='<div class="card stack"><h3>'+t('rd.goals')+'</h3>'+goals.map(x=>'<div class="row" style="gap:8px"><span>'+(x[0]?'✅':'⬜')+'</span><span>'+t(x[1])+'</span></div>').join('')+'<div class="mute" style="font-size:13px">'+t('rd.goald')+'</div></div>';
 if(g.hist.length)h+='<div class="card stack"><h3>'+t('rd.hist')+'</h3>'+g.hist.slice().reverse().map(x=>'<div class="row spread" style="gap:8px;flex-wrap:wrap"><span>'+esc(x.name)+' <span class="mute">· '+t('cal.wk',{n:x.fl})+'</span></span><span class="mute">'+t('rd.res.'+x.res)+(x.stars?' · ★'+f2(x.stars):'')+(x.cash?' · +'+money(x.cash):'')+'</span></div>').join('')+'</div>';
 return h}
// ---- events ----
const rdG=f=>()=>{try{return rdLive()&&f(rdEnsure())}catch(e){return false}};
const rdV=()=>{const p=rdEnsure().p,a=p&&W(p.a),b=p&&W(p.b);return {w:a?a.name:'?',w2:b?b.name:'?',id:p?p.a:'',id2:p?p.b:'',n:rdName()}};
const rdH=d=>{const g=rdEnsure();g.hype=clamp(g.hype+d,0,100)};
const XRD=[
{k:'rdscare',t:['Strach przed kontuzją','An injury scare'],b:['{w} poczuł ból przed „{n}”. Ryzyko jest realne.','{w} felt pain ahead of "{n}". The risk is real.'],v:rdV,gate:rdG(g=>true),o:[['Zachowaj plan','Keep the plan'],['Zmień przeciwnika','Change the opponent']],n:[['Plan trwa, ale ryzyko zostaje.','The plan stays, and so does the risk.'],['Główna walka dostaje nowego rywala.','The main event gets a new opponent.']],fx:[v=>{const w=lrW(v.id);if(w&&rnd()<.4){lrHurt(w,3+Math.floor(rnd()*4));rdH(-15)}else rdH(3)},()=>{const g=rdEnsure(),p=g.p;const o=pickR(mine().filter(x=>!x.ext&&x.id!==p.a&&x.id!==p.b&&!(x.injury>0)));if(o){p.b=o.id}rdH(-6)}]},
{k:'rdleak',t:['Przeciek planów','Plans leaked'],b:['Wynik walki {w} z {w2} wyciekł do sieci.','The result of {w} vs {w2} leaked online.'],v:rdV,gate:rdG(g=>g.hype>=20),o:[['Wykorzystaj to w angle','Work it into an angle'],['Zdementuj','Deny it']],n:[['Fani czekają na zwrot akcji.','Fans wait for the twist.'],['Plotka cichnie.','The rumor fades.']],fx:[()=>{if(rnd()<.5)rdH(5);else rdH(-10)},()=>rdH(-3)]},
{k:'rdceleb',t:['Celebryta na gali','A celebrity at the show'],b:['Znana osoba chce pojawić się na „{n}” za {m}.','A well-known figure wants to appear at "{n}" for {m}.'],v:()=>{const c=xc(.12);return {...rdV(),c,m:money(c)}},gate:rdG(g=>true),o:[['Zaproś ({m})','Invite ({m})'],['Odmów','Decline']],cost:[1,0],n:[['Media oszalały.','The media went wild.'],['Okazja przepada.','The chance is gone.']],fx:[v=>{xcash(-v.c);rdH(12);xpop(.2)},()=>{}]},
{k:'rdfans',t:['Petycja fanów','A fan petition'],b:['Fani żądają, by {w2} wygrał na „{n}”.','Fans demand {w2} wins at "{n}".'],v:rdV,gate:rdG(g=>true),o:[['Spełnij życzenie','Give them what they want'],['Zostań przy planie','Stick to the plan']],n:[['Fani szaleją z radości.','Fans go wild.'],['Część fanów jest zawiedziona.','Some fans are disappointed.']],fx:[()=>{const g=rdEnsure();g.p.win=g.p.win==='a'?'b':'a';rdH(8)},()=>rdH(-4)]},
{k:'rdrival',t:['Rywal kontruje ogłoszenie','A rival counters the announcement'],b:['Konkurencja ogłasza swoją wielką galę w tym samym tygodniu co „{n}”.','The competition announces its big show for the same week as "{n}".'],v:()=>{const c=xc(.08);return {...rdV(),c,m:money(c)}},gate:rdG(g=>g.hype>=15),o:[['Odpowiedz kampanią ({m})','Answer with a campaign ({m})'],['Ignoruj','Ignore it']],cost:[1,0],n:[['Twoja gala przyciąga uwagę.','Your show draws the attention.'],['Część widzów ucieka.','Some viewers slip away.']],fx:[v=>{xcash(-v.c);rdH(4)},()=>{rdH(-6);if(G.war){G.war.mod=.95;G.war.modw=1}}]},
{k:'rdnaming',t:['Sponsor chce nazwę gali','A sponsor wants naming rights'],b:['Sponsor oferuje {m} za nazwę „{n}” z jego logo.','A sponsor offers {m} for putting its logo on "{n}".'],v:()=>{const c=xc(.15);return {...rdV(),c,m:money(c)}},gate:rdG(g=>true),o:[['Przyjmij ({m})','Accept ({m})'],['Zachowaj czystą nazwę','Keep the name clean']],n:[['Pieniądze wpływają.','The money arrives.'],['Fani doceniają.','Fans appreciate it.']],fx:[v=>{xcash(v.c);rdH(-1)},()=>rdH(2)]},
{k:'rdtix',t:['Rekordowa przedsprzedaż','Record presale'],b:['Bilety na „{n}” schodzą w tempie rekordowym.','Tickets for "{n}" are selling at a record pace.'],v:()=>({...rdV(),c:xc(.08)}),gate:rdG(g=>g.hype>=30),o:[['Podnieś ceny','Raise prices'],['Zostaw ceny','Keep the prices']],n:[['Kasa rośnie, hype nieco słabnie.','More cash, a little less hype.'],['Fani to doceniają.','Fans appreciate it.']],fx:[v=>{xcash(v.c);rdH(3)},()=>rdH(8)]},
{k:'rdlegend',t:['Powrót legendy','A legend returns'],b:['Legenda chce wrócić na „{n}” na jedną noc. Koszt {m}.','A legend wants to return for one night at "{n}". Cost {m}.'],v:()=>{const c=xc(.1);return {...rdV(),c,m:money(c)}},gate:rdG(g=>true),o:[['Zgódź się ({m})','Agree ({m})'],['Odmów','Decline']],cost:[1,0],n:[['Hala dostaje gęsiej skórki.','Goosebumps in the arena.'],['Wspomnienia zostają wspomnieniami.','Memories stay memories.']],fx:[v=>{xcash(-v.c);rdH(10);const w=lrW(v.id);if(w)evMood(w,3)},()=>{}]},
{k:'rdsplit',t:['Spór o finał','A dispute over the finish'],b:['{w} i {w2} nie zgadzają się co do zakończenia walki.','{w} and {w2} disagree on the finish.'],v:rdV,gate:rdG(g=>true),o:[['Pośrednicz','Mediate'],['Przeforsuj swój plan','Force your plan']],n:[['Obaj się dogadują.','They come to terms.'],['Jeden z nich się obraża.','One of them sulks.']],fx:[v=>{const a=lrW(v.id),b=lrW(v.id2);if(a)evMood(a,2);if(b)evMood(b,2);rdH(1)},v=>{const b=lrW(v.id2);if(b)evMood(b,-4);rdH(2)}]},
{k:'rdpress',t:['Bijatyka na konferencji','A press-conference brawl'],b:['Na konferencji przed „{n}” {w} i {w2} rzucają się sobie do gardeł.','At the press conference ahead of "{n}", {w} and {w2} go for each other\'s throats.'],v:rdV,gate:rdG(g=>true),o:[['Zostaw to','Let it play out'],['Rozdziel ich','Separate them']],n:[['Sieć eksploduje.','The internet explodes.'],['Spokojnie, ale mniej widowiskowo.','Calm, but less spectacular.']],fx:[v=>{rdH(9);if(rnd()<.25){const w=lrW(v.id2);if(w)lrHurt(w,2)}},()=>rdH(2)]},
{k:'rdboard',t:['Rada żąda większej stawki','The board wants higher stakes'],b:['Rada nadzorcza chce, by „{n}” był większy niż w zeszłym roku.','The board wants "{n}" to be bigger than last year.'],v:rdV,gate:rdG(g=>g.p&&g.p.st==='std'),o:[['Podnieś stawkę','Raise the stakes'],['Zostaw','Leave it']],n:[['Stawka rośnie, hype też.','The stakes rise, and so does the hype.'],['Rada kręci nosem.','The board grumbles.']],fx:[()=>{const g=rdEnsure();g.p.st='high';rdH(6)},()=>xconf(-1)]}
];
XRD.forEach(XE);
ACHS.push(['rdok',()=>G.ach&&G.ach.rdok]);
Object.assign(D,{'nav.rd':['Droga do wielkiej gali','Road to the Big One'],'ach.rdok':['Wielka gala: udana droga','The Big One: a successful road'],
 'rd.sub':['Raz w roku (co 52 tygodnie) Twoja federacja organizuje flagową galę. Zaplanuj główną walkę, buduj hype tygodniami, zrób Royal Rumble i Money in the Bank, a na gali zbierz owoce. Dostępne od tieru 2.','Once a year (every 52 weeks) your promotion stages a flagship show. Plan the main event, build hype for weeks, run a Royal Rumble and Money in the Bank, and reap the reward on the night. Available from tier 2.'],
 'rd.locked':['Droga do wielkiej gali zaczyna się od tieru 2.','The road to the big show begins at tier 2.'],'rd.in':['za {n} tyg.','in {n} wks'],'rd.today':['dziś','today'],
 'rd.stage.plan':['planowanie','planning'],'rd.stage.road':['droga do gali','on the road'],'rd.stage.gala':['gala','showtime'],'rd.name':['nazwa gali','show name'],
 'rd.hype':['Hype','Hype'],'rd.hyped':['Rośnie z czasem, kampanii, segmentów i dobrych gal. Podnosi frekwencję, ocenę głównej walki i nagrodę. Zbyt wczesny szczyt (powyżej 80) zaczyna opadać.','Grows with time, campaigns, segments and good shows. Raises attendance, the main event rating and the payoff. Peaking too early (above 80) starts to fade.'],
 'rd.plan':['Plan głównej walki','Main-event plan'],'rd.pland':['Wybierz bohatera, jego rywala, pas, stawkę i oczekiwanego zwycięzcę. Na gali trzeba tę walkę postawić na karcie. Sukces to ≥3,5★ i zakładany wynik.','Pick the hero, his opponent, the title, the stakes and the winner you expect. At the show you must put this match on the card. Success means ≥3.5★ and the planned result.'],
 'rd.a':['Bohater (gwiazda drogi)','Hero (star of the road)'],'rd.b':['Przeciwnik','Opponent'],'rd.title':['Pas','Title'],'rd.notitle':['Bez pasa','No title'],'rd.stake':['Stawka','Stakes'],'rd.win':['Zwycięzca','Winner'],'rd.win.a':['Bohater','Hero'],'rd.win.b':['Przeciwnik','Opponent'],
 'rd.st.std':['Standardowa (×1)','Standard (×1)'],'rd.st.high':['Wysoka (×1,5)','High (×1.5)'],'rd.st.career':['Kariera na szali (×2,2)','Career on the line (×2.2)'],
 'rd.save':['Zapisz plan','Save the plan'],'rd.addmain':['Dodaj główną walkę do karty','Add the main event to the card'],'rd.onc':['Już na karcie','Already on the card'],'rd.lock':['Bohater wywalczony w Rumble, nie można go zmienić.','The hero earned in the Rumble cannot be changed.'],'rd.bad':['Plan nie jest już możliwy (zawodnik odszedł).','The plan is no longer possible (a wrestler left).'],
 'rd.hh':['Budowanie hype’u','Building hype'],'rd.camp.1':['Mała kampania','Small campaign'],'rd.camp.2':['Średnia kampania','Medium campaign'],'rd.camp.3':['Duża kampania','Big campaign'],'rd.seg':['Segment promo (+5)','Promo segment (+5)'],
 'rd.hsrc':['Kampanie co 2 tygodnie. Segment raz w tygodniu, mocniejszy przy dobrych mikrofonach i finisherze.','Campaigns every 2 weeks. A segment once a week, stronger with good mic skills and a finisher.'],
 'rd.rr':['Royal Rumble','Royal Rumble'],'rd.rrd':['Wielka bitwa 6–10 zawodników w tygodniu {n}. Zwycięzca zdobywa walkę o pas na wielkiej gali.','A big battle of 6–10 wrestlers in week {n}. The winner earns the title shot at the big show.'],'rd.addrr':['Dodaj Royal Rumble do karty','Add the Royal Rumble to the card'],'rd.rrwk':['Dostępne w tygodniu {n}','Available in week {n}'],
 'rd.mitb':['Money in the Bank','Money in the Bank'],'rd.mitbd':['Walka o nagrodę (walizka) w drodze do gali podnosi hype. Posiadacz może ją wymienić na walkę o pas.','A prize match (briefcase) on the road lifts hype. The holder can cash it in for a title match.'],'rd.toprizes':['Przejdź do nagród','Go to prizes'],
 'rd.goals':['Cele','Goals'],'rd.goald':['Każdy spełniony cel zwiększa nagrodę za sukces.','Every completed goal increases the reward on success.'],
 'rd.g1':['Plan głównej walki gotowy','Main-event plan ready'],'rd.g2':['Hype ≥ 60','Hype ≥ 60'],'rd.g3':['Royal Rumble rozegrany','Royal Rumble held'],'rd.g4':['Walka o nagrodę (MITB) rozegrana','Prize match (MITB) held'],'rd.g5':['Bohater i przeciwnik zdrowi','Hero and opponent healthy'],
 'rd.hist':['Poprzednie gale','Previous shows'],'rd.res.ok':['Sukces','Success'],'rd.res.part':['Przeciętnie','Mediocre'],'rd.res.flop':['Klapa','Flop'],'rd.res.skip':['Brak głównej walki','No main event'],
 'n.rdok':['„{n}” przechodzi do historii. Zysk z gali: {m}.','"{n}" goes down in history. Show profit: {m}.'],'n.rdpart':['„{n}” była przeciętna. Fani liczyli na więcej.','"{n}" was mediocre. Fans hoped for more.'],'n.rdflop':['„{n}” to klapa. Fani i rada są niezadowoleni.','"{n}" is a flop. Fans and the board are unhappy.'],'n.rdskip':['Na „{n}” zabrakło zaplanowanej głównej walki. Fani są wściekli.','"{n}" lacked the planned main event. Fans are furious.'],
 'n.rdrumble':['{w} wygrywa Royal Rumble i zdobywa walkę o pas.','{w} wins the Royal Rumble and earns a title match.'],'n.rdmitb':['Walka o nagrodę podkręca atmosferę przed wielką galą.','The prize match builds the atmosphere ahead of the big show.'],'n.rdinj':['Kontuzja {w} podcina hype wielkiej gali.','{w}\'s injury cuts the big show\'s hype.']});
