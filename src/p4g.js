// ---- Rankings: TOP 100 ----
const RKS={ovr:w=>ovr(w),pop:w=>w.pop,ring:w=>w.ring,mic:w=>w.mic,cha:w=>w.cha};
function ovr(w){const o=(w.str+w.spd+w.tec+w.sta+w.psy)/5;return Math.round(w.ring*.4+o*.2+w.mic*.12+w.cha*.12+w.pop*.16)}
const rkPool=()=>G.ws.filter(w=>!w.ext&&w.fed!=='RET'&&w.fed!=='GST'&&w.fed!=='PRO'&&w.str!==undefined);
function rkState(){G.rk=G.rk||{f:'all',s:'ovr',g:'all',c:'all'};return G.rk}
function rankWeekly(){const p=rkPool().sort((a,b)=>ovr(b)-ovr(a)||b.pop-a.pop);G.rankPrev=G.rankNow||{};G.rankNow={};p.forEach((w,i)=>G.rankNow[w.id]=i+1)}
function fedTag(id){if(id==='FA')return '<span class="tag">'+t('rk.fa')+'</span>';const f=id===G.fed.id?G.fed:G.rivals.find(r=>r.id===id);if(!f)return '';return '<span class="dot" style="background:'+esc(f.color||'#888')+'"></span> '+esc(f.short||f.name)}
function vRank(){
 const d=rkState();
 let list=rkPool();
 if(d.f==='FA')list=list.filter(w=>w.fed==='FA');else if(d.f!=='all')list=list.filter(w=>w.fed===d.f);
 if(d.c&&d.c!=='all')list=list.filter(w=>w.country===d.c);
 if(d.k&&d.k!=='all')list=list.filter(w=>contOf(w.country)===d.k);
 if(d.g==='m')list=list.filter(w=>w.g!=='f');else if(d.g==='f')list=list.filter(w=>w.g==='f');
 const fn=RKS[d.s]||RKS.ovr;
 list=list.sort((a,b)=>fn(b)-fn(a)||b.pop-a.pop).slice(0,100);
 const opt=(v,l,cur)=>'<option value="'+esc(v)+'"'+(cur===v?' selected':'')+'>'+esc(l)+'</option>';
 let h='<div class="top"><div><h2>'+t('rk.title')+'</h2><div class="mute" style="max-width:70ch">'+t('rk.sub')+'</div></div></div>';
 h+='<div class="card"><div class="grid g3" style="gap:8px"><div><label class="px" for="rkk">'+t('ui.continent')+'</label><select id="rkk" class="field" data-chg="rkset" data-k="k">'+opt('all',t('rk.all'),d.k||'all')+CONTS.map(c=>opt(c,t('ct.'+c),d.k)).join('')+'</select></div><div><label class="px" for="rkc">'+t('rk.cn')+'</label><select id="rkc" class="field" data-chg="rkset" data-k="c">'+opt('all',t('rk.all'),d.c||'all')+[...new Set(rkPool().map(w=>w.country))].sort((a,b)=>cn(a).localeCompare(cn(b))).map(c=>opt(c,cn(c),d.c)).join('')+'</select></div><div><label class="px" for="rkf">'+t('rk.fed')+'</label><select id="rkf" class="field" data-chg="rkset" data-k="f">'+opt('all',t('rk.all'),d.f)+opt('FA',t('rk.fa'),d.f)+opt(G.fed.id,G.fed.name+' ('+t('rk.mine')+')',d.f)+G.rivals.slice().sort((a,b)=>cn(a.country).localeCompare(cn(b.country))||a.name.localeCompare(b.name)).map(r=>opt(r.id,'['+r.country+'] '+r.name,d.f)).join('')+'</select></div>'+
  '<div><label class="px" for="rkg">'+t('rk.div')+'</label><select id="rkg" class="field" data-chg="rkset" data-k="g">'+opt('all',t('rk.all'),d.g)+opt('m',t('g.m'),d.g)+opt('f',t('g.f'),d.g)+'</select></div>'+
  '<div><label class="px" for="rks">'+t('rk.sort')+'</label><select id="rks" class="field" data-chg="rkset" data-k="s">'+opt('ovr',t('rk.ovr'),d.s)+opt('pop',t('st.pop'),d.s)+opt('ring',t('st.ring'),d.s)+opt('mic',t('st.mic'),d.s)+opt('cha',t('st.cha'),d.s)+'</select></div></div></div>';
 const rows=list.map((w,i)=>{const pr=(G.rankPrev||{})[w.id],nw=(G.rankNow||{})[w.id];let mv='<span class="mute">–</span>';
  if(pr&&nw&&d.f==='all'&&d.g==='all'&&d.s==='ovr'){const df=pr-nw;mv=df>0?'<span style="color:var(--gold)">▲'+df+'</span>':df<0?'<span style="color:#c44">▼'+(-df)+'</span>':'<span class="mute">=</span>'}
  const mineW=w.fed===G.fed.id;
  return '<tr'+(mineW?' style="background:var(--panel2)"':'')+'><td class="mute">'+(i+1)+'</td><td>'+mv+'</td><td><div class="row" style="gap:8px;flex-wrap:nowrap"><div style="width:34px;height:34px;overflow:hidden;flex:none">'+avatar(w.look,34)+'</div><b>'+esc(w.name)+'</b>'+(w.stb&&w.fed!==G.fed.id&&w.fed!=='FA'?' <span class="tag">'+esc(w.stb)+'</span>':'')+(w.g==='f'?' <span style="color:#c4358a">♀</span>':'')+(w.injury?' <span class="tag inj">'+t('r.inj',{n:wks(w.injury)})+'</span>':'')+'</div></td><td>'+fedTag(w.fed)+'</td><td>'+cn(w.country)+'</td><td>'+w.age+'</td><td><b>'+ovr(w)+'</b></td><td>'+Math.round(w.pop)+'</td><td>'+w.ring+'</td><td>'+w.mic+'</td><td>'+w.cha+'</td><td>'+rkAct(w)+'</td></tr>'}).join('');
 h+='<div class="card stack"><div class="mute">'+t('rk.count',{n:list.length})+'</div><div class="scroll"><table><thead><tr><th>#</th><th></th><th>'+t('rk.w')+'</th><th>'+t('rk.fed')+'</th><th>'+t('rk.cn')+'</th><th>'+t('rk.age')+'</th><th>'+t('rk.ovr')+'</th><th>'+t('st.pop')+'</th><th>'+t('st.ring')+'</th><th>'+t('st.mic')+'</th><th>'+t('st.cha')+'</th><th>'+t('rk.act')+'</th></tr></thead><tbody>'+(rows||'<tr><td colspan="12" class="mute">'+t('rk.none')+'</td></tr>')+'</tbody></table></div></div>';
 return h}
Object.assign(CHG,{rkset(e){rkState()[e.dataset.k]=e.value;render()}});

// ---- Free-agent market with filters and pages ----
const MKP=24;
function mkState(){G.mk=G.mk||{s:'pop',g:'all',q:'',p:0,c:'all'};return G.mk}
function marketView(full){
 const d=mkState();let fa=G.ws.filter(w=>w.fed==='FA');const total=fa.length;
 if(d.g==='m')fa=fa.filter(w=>w.g!=='f');else if(d.g==='f')fa=fa.filter(w=>w.g==='f');
 if(d.c!=='all')fa=fa.filter(w=>w.country===d.c);
 const q=(d.q||'').trim().toLowerCase();if(q)fa=fa.filter(w=>w.name.toLowerCase().indexOf(q)>=0);
 const key={pop:w=>w.pop,ovr:w=>ovr(w),age:w=>w.age,price:w=>salaryOf(w,G.fed.tier),tcg:w=>mkTcgN(w)}[d.s]||(w=>w.pop);const lo=d.dir==='lo'?1:-1;
 fa.sort((a,b)=>lo*(key(a)-key(b))||b.pop-a.pop);
 const pages=Math.max(1,Math.ceil(fa.length/MKP));d.p=clamp(d.p,0,pages-1);
 const opt=(v,l,c)=>'<option value="'+esc(v)+'"'+(c===v?' selected':'')+'>'+esc(l)+'</option>';
 const cs=[...new Set(G.ws.filter(w=>w.fed==='FA').map(w=>w.country))].sort((a,b)=>cn(a).localeCompare(cn(b)));
 let h='<h3>'+t('w.market')+' · '+total+'</h3><div class="card"><div class="grid g4" style="gap:8px">'+
  '<div><label class="px" for="mkq">'+t('mk.search')+'</label><input id="mkq" class="field" data-chg="mkset" data-k="q" value="'+esc(d.q||'')+'" placeholder="'+t('mk.ph')+'"></div>'+
  '<div><label class="px" for="mks">'+t('rk.sort')+'</label><select id="mks" class="field" data-chg="mkset" data-k="s">'+opt('pop',t('st.pop'),d.s)+opt('ovr',t('rk.ovr'),d.s)+opt('age',t('mk.age'),d.s)+opt('price',t('mk.pay'),d.s)+opt('tcg',t('mk.tcg'),d.s)+'</select><select class="field" style="margin-top:6px" data-chg="mkset" data-k="dir" aria-label="'+t('mk.dir')+'">'+opt('hi',t('mk.hi'),d.dir||'hi')+opt('lo',t('mk.lo'),d.dir||'hi')+'</select></div>'+
  '<div><label class="px" for="mkg">'+t('rk.div')+'</label><select id="mkg" class="field" data-chg="mkset" data-k="g">'+opt('all',t('rk.all'),d.g)+opt('m',t('g.m'),d.g)+opt('f',t('g.f'),d.g)+'</select></div>'+
  '<div><label class="px" for="mkc">'+t('rk.cn')+'</label><select id="mkc" class="field" data-chg="mkset" data-k="c">'+opt('all',t('rk.all'),d.c)+cs.map(c=>opt(c,cn(c),d.c)).join('')+'</select></div></div></div>';
 const pg=pages>1?'<div class="row spread"><button class="btn sm" data-act="mkpage" data-d="-1"'+(d.p<=0?' disabled':'')+'>◀</button><span class="mute">'+t('mk.page',{p:d.p+1,n:pages,c:fa.length})+'</span><button class="btn sm" data-act="mkpage" data-d="1"'+(d.p>=pages-1?' disabled':'')+'>▶</button></div>':'<div class="mute">'+t('mk.found',{c:fa.length})+'</div>';
 h+=pg+'<div class="grid gW">'+fa.slice(d.p*MKP,d.p*MKP+MKP).map(w=>{const fee=Math.round(salaryOf(w,G.fed.tier)*8*relDisc(w));return wCard(w,mkTcgTag(w)+'<div><button class="btn sm gold" data-act="sign" data-id="'+w.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('w.sign',{m:money(fee)})+'</button> <span class="mute" style="font-size:12px">'+(full?t('w.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>')}).join('')+'</div>'+(pages>1?pg:'');
 return h}
Object.assign(CHG,{mkset(e){const d=mkState();d[e.dataset.k]=e.value;if(e.dataset.k==='s')d.dir='hi';d.p=0;render()}});
Object.assign(ACT,{mkpage(e){const d=mkState();d.p+=+e.dataset.d;render();window.scrollTo(0,document.body.scrollHeight>2000?600:0)}});
// ---- Talent prospects on the World screen ----
function prosView(){
 const ps=G.ws.filter(w=>w.fed==='PRO').sort((a,b)=>b.potEst-a.potEst);const scouts=staffOf('scout').length;const full=mine().length>=ROSTERMAX[G.fed.tier-1];
 let h='<h3>'+t('pr.title')+' · '+ps.length+'</h3><div class="mute" style="max-width:70ch">'+t(scouts?'pr.sub':'pr.noscout')+'</div>';
 if(!ps.length)return h;
 return h+'<div class="grid gW">'+ps.map(w=>{const fee=proFee(w);return wCard(w,'<div class="row" style="gap:8px;flex-wrap:wrap"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('pr.pot')+' '+potStars(w.potEst)+'</span><span class="mute" style="font-size:12px">'+t('pr.found',{s:esc(w.by||'?'),n:Math.max(0,w.exp-G.week)})+'</span></div><div><button class="btn sm gold" data-act="signpro" data-id="'+w.id+'"'+(full||G.fed.cash<fee?' disabled':'')+'>'+t('w.sign',{m:money(fee)})+'</button> <span class="mute" style="font-size:12px">'+(full?t('w.full'):G.fed.cash<fee?t('w.cannot'):'')+'</span></div>')}).join('')+'</div>'}
Object.assign(ACT,{signpro(e){if(signPro(e.dataset.id)){save()}render()},
 scoutreg(e){const s=G.staff.find(x=>x.id===e.dataset.id);if(!s)return;const ks=Object.keys(REGS);s.reg=ks[(ks.indexOf(s.reg)+1)%ks.length];save();render()}});

function rkAct(w){if(w.fed==='FA'||w.fed==='PRO'||w.fed===G.fed.id||w.fed==='RET'||w.ext)return '';
 const off=mine().length>=ROSTERMAX[G.fed.tier-1]||(w.pcd||0)>G.week;const fee=poachFee(w);
 return '<button class="btn sm" data-act="poach" data-id="'+w.id+'"'+(off||G.fed.cash<fee?' disabled':'')+'>'+t('rk.poach',{m:money(fee),p:Math.round(poachChance(w)*100)})+'</button>'}
Object.assign(ACT,{async poach(e){await poach(e.dataset.id)}});

function mkTcgN(w){try{const m=G.me&&G.me.col&&G.me.col[w.id];return m?m.n:0}catch(e){return 0}}
function mkTcgTag(w){const n=mkTcgN(w);return n?'<div class="row"><span class="tag" style="color:var(--gold);border-color:var(--gold)">'+t('mk.tcgtag',{n:n})+'</span></div>':''}
Object.assign(D,{'mk.age':['Wiek','Age'],'mk.pay':['Pensja','Salary'],'mk.tcg':['Moje karty TCG','My TCG cards'],'mk.dir':['Kierunek sortowania','Sort direction'],'mk.hi':['Od największej wartości','Highest first'],'mk.lo':['Od najmniejszej wartości','Lowest first'],'mk.tcgtag':['🃏 Masz kartę TCG ×{n}','🃏 You own the TCG card ×{n}']});
