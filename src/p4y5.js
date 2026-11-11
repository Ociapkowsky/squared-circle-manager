/* ===== Wrestler profile with career history, wrestler records, post-show fan reactions (numbers set by eye) ===== */
function crEns(w){if(!w.cr)w.cr={m:0,w:0,l:0,d:0,s45:0,s5:0,main:0,tw:0,bs:0,bo:'',bwk:0};if(!w.ms)w.ms=[];return w.cr}
function wmsAdd(w,k,v){if(!w)return;crEns(w);w.ms.unshift({wk:G.week,k,v:v||{}});if(w.ms.length>20)w.ms.length=20}
function rc2Ens(){if(!G.rc2)G.rc2={s:0,a:'',b:'',wk:0};return G.rc2}
const _crFm=finalizeMatch;finalizeMatch=function(m,res,pos,total,fo){
 let held=null,tt=null;try{if(m.title){tt=titleOf(m.title);held=tt?tt.holders.join(','):null}}catch(e){}
 const r=_crFm.apply(this,arguments);
 try{const{A,B}=sides(m),oc=outcome(m),all=A.concat(B),own=all.map(W).filter(w=>w&&w.fed===G.fed.id&&!w.ext);
  const fin=res.finish||'clean',main=pos===total-1&&total>1,changed=!!tt&&held!==null&&held!==tt.holders.join(',');
  own.forEach(w=>{const c=crEns(w);const first=c.m===0;c.m++;
   if(fin==='draw')c.d++;else if(oc.wi.indexOf(w.id)>=0)c.w++;else c.l++;
   if(first)wmsAdd(w,'debut');
   if(main){c.main++;if(res.stars>=3.5)wmsAdd(w,'main',{s:f2(res.stars)})}
   if(res.stars>=4.5){c.s45++;if(res.stars>=5)c.s5++;wmsAdd(w,'star',{s:f2(res.stars),o:names(all.filter(i=>i!==w.id).slice(0,2))})}
   if(res.stars>c.bs){c.bs=res.stars;c.bo=names(all.filter(i=>i!==w.id).slice(0,2));c.bwk=G.week}
   if(changed&&oc.wi.indexOf(w.id)>=0){c.tw++;wmsAdd(w,'title',{t:titleName(tt)})}});
  const b=rc2Ens();if(res.stars>b.s&&own.length){b.s=res.stars;b.a=names(A.slice(0,3));b.b=names(B.slice(0,3));b.wk=G.week}}catch(e){}
 return r};
const _crInj=injure;injure=function(w){const r=_crInj.apply(this,arguments);try{if(w.fed===G.fed.id&&w.injury>0)wmsAdd(w,'inj',{n:w.injury})}catch(e){}return r};
const _crSign=ACT.sign;ACT.sign=function(e){const w=W(e.dataset.id),f0=w&&w.fed;const r=_crSign.apply(this,arguments);try{if(w&&f0!==G.fed.id&&w.fed===G.fed.id)wmsAdd(w,'signed',{f:t('pf.fa')})}catch(x){}return r};
// profile
function pfTags(w){const st=stableOf(w.id);let h='<span class="pcc">'+esc(cn(w.country))+'</span><span class="pcc">'+esc(t('style.'+w.style))+'</span><span class="pcc">'+esc(t('role.'+w.role).split(' ')[0])+'</span>';if(st)h+='<span class="pcc">'+esc(st.name)+'</span>';return h}
function pfOpen(id){
 const w=pcWr(id);if(!w)return;window.__pf=id;const c=crEns(w);
 const tit=G.titles.filter(tt=>tt.holders.indexOf(w.id)>=0).map(titleName);
 const fe=(G.feuds||[]).filter(f=>(f.A||[]).indexOf(w.id)>=0||(f.B||[]).indexOf(w.id)>=0).slice(0,3).map(f=>names(((f.A||[]).indexOf(w.id)>=0?f.B:f.A)||[]).replace(/^$/,'?'));
 const rel=typeof tkRel==='function'?tkRel(w):'none',ph=typeof dvPhase==='function'?dvPhase(w):'peak';
 const mt=w.mentor?W(w.mentor):hlLive().find(y=>y.mentor===w.id);
 let h='<div class="tkh"><span class="tka">'+avatar(w.look,72)+'</span><div class="tkb"><b style="font-size:17px">'+esc(w.name)+'</b><div class="pcch" style="margin-top:3px">'+pfTags(w)+'</div><div class="mute" style="font-size:13px">'+esc(t('st.age',{n:w.age}))+' · '+esc(t('dv.ph.'+ph))+(typeof tkTrait==='function'?' · '+esc(t('tk.tr.'+tkTrait(w)).replace(/^[^:]*: /,'')):'')+'</div></div></div>';
 const sx=(l,v)=>'<div class="pfs"><b>'+v+'</b><span>'+esc(l)+'</span></div>';
 h+='<div class="pfg">'+sx(t('pf.m'),c.m)+sx(t('pf.rec'),c.w+'-'+c.l+(c.d?'-'+c.d:''))+sx(t('pf.s45'),c.s45)+sx(t('pf.s5'),c.s5)+sx(t('pf.main'),c.main)+sx(t('pf.tw'),c.tw)+'</div>';
 if(c.bs>0)h+='<div class="mute" style="font-size:13px">'+esc(t('pf.best',{s:f2(c.bs),o:c.bo||'?',w:c.bwk}))+'</div>';
 h+='<div class="pcch">'+(tit.length?tit.map(x=>'<span class="pcc pr">🏆 '+esc(x)+'</span>').join(''):'')+'<span class="pcc">'+esc(t('st.morale'))+' '+Math.round(w.morale)+'</span><span class="pcc">'+esc(t('st.loy'))+' '+Math.round(w.loyal||0)+'</span><span class="pcc">'+esc(t('st.contract',{n:wks(Math.max(0,w.contract))}))+'</span><span class="pcc">'+esc(money(w.salary))+t('pf.perwk')+'</span></div>';
 if(rel!=='none')h+='<div class="pcc '+(rel==='enemy'?'dn':'up')+'" style="align-self:flex-start">'+esc(t('tk.rel.'+rel))+'</div>';
 if(mt)h+='<div class="pcc pr" style="align-self:flex-start">'+esc(t(w.mentor?'dv.mentor':'dv.mentee',{p:mt.name}))+'</div>';
 const pr=(G.pcp||[]).find(p=>p.id===w.id);if(pr)h+='<div class="pcc pr" style="align-self:flex-start">'+esc(t('pc.c.prom',{w:w.name}))+' · '+esc(t('mr.left',{n:Math.max(0,pr.dl-G.week)}))+'</div>';
 if(fe.length)h+='<div class="px">'+esc(t('pf.feuds'))+'</div><div class="mute" style="font-size:13.5px">'+fe.map(esc).join(' · ')+'</div>';
 h+='<div class="px">'+esc(t('pf.ms'))+'</div>';
 h+=w.ms&&w.ms.length?'<div class="pft">'+w.ms.slice(0,10).map(x=>'<div class="pfr"><span class="mute">'+esc(t('dv.wk',{n:x.wk}))+'</span><span>'+esc(t('pf.k.'+x.k,x.v))+'</span></div>').join('')+'</div>':'<p class="mute" style="margin:0;font-size:13px">'+esc(t('pf.nom'))+'</p>';
 h+='<div class="dvch"><button class="btn sm" data-act="tkopen" data-id="'+w.id+'">'+esc(t('tk.btn'))+'</button><button class="btn sm" data-act="dvopen" data-id="'+w.id+'">'+esc(t('dv.btn'))+'</button></div><button class="btn gold" data-act="pfclose">'+esc(t('tk.close'))+'</button>';
 openModal('<div class="pcm">'+h+'</div>')}
ACT.pfopen=e=>{pfOpen(e.dataset.id)};ACT.pfclose=()=>{closeModal();window.__pf=null};
const _wC3=wCard;wCard=function(w,extra){let h=_wC3.call(this,w,extra);
 if(h.indexOf('data-act="tkopen"')>=0)h=h.replace(/(<button class="btn sm" data-act="tkopen" data-id="[^"]*">[^<]*<\/button>)/,'<button class="btn sm" data-act="pfopen" data-id="'+w.id+'">'+esc(t('pf.btn'))+'</button>$1');return h};
// wrestler records on the Legacy screen
const _vH=vHof;vHof=function(){let h=_vH.apply(this,arguments);
 try{const all=G.ws.filter(w=>w.cr&&w.cr.m>0);const top=(f,min)=>all.filter(w=>f(w)>=min).sort((a,b)=>f(b)-f(a))[0];
  const rows=[['wins',w=>w.cr.w,1],['s5',w=>w.cr.s5,1],['tw',w=>w.cr.tw,1],['main',w=>w.cr.main,1],['m',w=>w.cr.m,1],['bw',w=>(w.sk&&w.sk.bw)||0,2]];
  let c='<div class="card stack"><h3>'+esc(t('rc.t'))+'</h3>';const b=rc2Ens();
  if(b.s>0)c+='<div class="row spread" style="gap:8px"><span>'+esc(t('rc.bm'))+'</span><b style="text-align:right">'+esc(b.a)+(b.b?' vs '+esc(b.b):'')+' · '+f2(b.s)+'★</b></div>';
  rows.forEach(r=>{const w=top(r[1],r[2]);c+='<div class="row spread" style="gap:8px"><span>'+esc(t('rc.'+r[0]))+'</span><b>'+(w?esc(w.name)+' · '+r[1](w):'—')+'</b></div>'});
  c+='</div>';h=h.replace(/(<div class="card stack"><h3>[^<]*<\/h3><div class="row spread"><span>[^<]*<\/span><b>)/,c+'$1')}catch(e){}
 return h};
// fan reactions after the show
const FX_H=['@ringsideRita','@turnbuckleTom','@apron_andy','@chairshot_chloe','@bellringer88','@heelHeat_hana','@suplexSam','@lariatLena'];
function fxPosts(s){
 const ms=s.out.filter(x=>!x.promo),P=[],pk=a=>a[Math.floor(rnd()*a.length)];const L=()=>Math.max(3,Math.round(G.fed.pop*(4+rnd()*14)*(s.rating>=4?1.6:s.rating>=3?1:.5)));
 const best=ms.slice().sort((a,b)=>b.stars-a.stars)[0],main=ms[ms.length-1],tc=ms.find(x=>x.tc),dty=ms.find(x=>x.finish&&x.finish!=='clean'&&x.finish!=='draw'),st=ms.find(x=>x.stip&&x.stip!=='none');
 const vs=x=>x.a+(x.b?' vs '+x.b:'');
 if(best&&best.stars>=4)P.push(['fx.best',{m:vs(best),s:f2(best.stars)}]);
 if(tc)P.push(['fx.champ',{w:tc.winner,t:tc.title||''}]);
 if(main&&ms.length>1&&main.stars>=4)P.push(['fx.main',{m:vs(main)}]);
 if(st)P.push(['fx.stip',{st:t('stip.'+st.stip)}]);
 if(dty)P.push(['fx.dirty',{m:vs(dty)}]);
 if(s.cap&&s.sold>=s.cap*.97)P.push(['fx.sold',{}]);else if(s.cap&&s.sold<s.cap*.7&&s.rating<3.8)P.push(['fx.empty',{}]);
 if(s.rating>=4.2)P.push(['fx.great',{}]);else if(s.rating<3)P.push(['fx.meh',{}]);
 P.push(['fx.gen',{}]);
 const out=[];const used={};P.sort(()=>rnd()-.5);P.slice(0,4).forEach(p=>{let h;do{h=pk(FX_H)}while(used[h]&&Object.keys(used).length<FX_H.length);used[h]=1;out.push({h,k:p[0],v:p[1],l:L()})});
 return out}
function fxCard(s){
 const ps=fxPosts(s),tag=(G.fed.short||'WR').replace(/[^A-Za-z0-9]/g,'')+(s.big?'PPV':'Night');
 let h='<div class="card stack"><div class="row spread"><b>'+esc(t('fx.t'))+'</b><span class="pcc pr">'+esc(t('fx.trend'))+' #'+esc(tag)+'</span></div>';
 ps.forEach(p=>{h+='<div class="fxp"><b>'+esc(p.h)+'</b> <span class="mute">· ♥ '+p.l+'</span><div>'+esc(t(p.k,p.v))+'</div></div>'});
 return h+'</div>'}
const _fxVS=vShow;vShow=function(){let h=_fxVS.apply(this,arguments);
 try{if(G.showResult&&G.summary&&G.summary.out){if(!G.summary.fxc)G.summary.fxc=fxCard(G.summary);h+=G.summary.fxc}}catch(e){}return h};
Object.assign(D,{
 'pf.btn':['Profil','Profile'],'pf.fa':['wolny agent','free agent'],'pf.perwk':['/tydz.','/wk'],'pf.m':['Walki','Matches'],'pf.rec':['Bilans','Record'],'pf.s45':['4,5★+','4.5★+'],'pf.s5':['5★','5★'],'pf.main':['Główne walki','Main events'],'pf.tw':['Pasy','Title wins'],
 'pf.best':['Najlepsza walka: {s}★ z {o} (tydz. {w})','Best match: {s}★ vs {o} (wk {w})'],'pf.feuds':['Aktualne feudy','Current feuds'],'pf.ms':['Kamienie milowe','Milestones'],'pf.nom':['Jeszcze brak wydarzeń w karierze u Ciebie.','No career events with you yet.'],
 'pf.k.debut':['Debiut w Twojej federacji','Debut in your promotion'],'pf.k.main':['Walka wieczoru ({s}★)','Main event ({s}★)'],'pf.k.star':['Świetna walka {s}★ z {o}','Great match {s}★ vs {o}'],'pf.k.title':['Zdobywa pas: {t}','Wins the title: {t}'],
 'pf.k.inj':['Kontuzja na {n} tyg.','Injury for {n} wks'],'pf.k.signed':['Pozyskany z: {f}','Signed from: {f}'],'pf.k.pk':['Dotrzymano obietnicy pusha','Push promise kept'],'pf.k.pb':['Złamano obietnicę pusha','Push promise broken'],'pf.k.mentor':['Zaczyna współpracę z mentorem: {p}','Starts working with a mentor: {p}'],
 'rc.t':['Rekordy zawodników','Wrestler records'],'rc.bm':['Najlepsza walka w historii','Best match ever'],'rc.wins':['Najwięcej zwycięstw','Most wins'],'rc.s5':['Najwięcej walk 5★','Most 5★ matches'],'rc.tw':['Najwięcej zdobytych pasów','Most title wins'],'rc.main':['Najwięcej głównych walk','Most main events'],'rc.m':['Najwięcej walk','Most matches'],'rc.bw':['Najdłuższa seria zwycięstw','Longest win streak'],
 'fx.t':['Reakcje fanów','Fan reactions'],'fx.trend':['Trenduje:','Trending:'],
 'fx.best':['{m}? Absolutne mistrzostwo, {s}★ i ani grama mniej!','{m}? Absolute masterpiece, {s}★ and not a gram less!'],'fx.champ':['Mamy nowego mistrza! {w} z pasem ({t}). Wreszcie!','We have a new champion! {w} with the belt ({t}). Finally!'],
 'fx.main':['Walka wieczoru ({m}) dowiozła. Ciary na plecach.','The main event ({m}) delivered. Goosebumps.'],'fx.stip':['Stypulacja „{st}” była szalona. Nie mogłem oderwać wzroku.','The “{st}” stipulation was wild. Couldn’t look away.'],
 'fx.dirty':['Kto to wymyślił? Zakończenie walki {m} to skandal!','Who came up with that? The finish of {m} was a scandal!'],'fx.sold':['Hala wyprzedana do ostatniego krzesła. Atmosfera była nie do opisania.','Arena sold out to the last seat. The atmosphere was indescribable.'],
 'fx.empty':['Połowa trybun pusta. Co się dzieje z tą federacją?','Half the stands were empty. What’s happening to this promotion?'],'fx.great':['Najlepsza gala od miesięcy. Bilety na następną biorę od razu.','The best show in months. I’m buying tickets for the next one right away.'],
 'fx.meh':['Dzisiaj było przeciętnie, liczę na więcej następnym razem.','Mediocre tonight, hoping for more next time.'],'fx.gen':['Dobry wieczór z wrestlingiem. Do zobaczenia za tydzień!','A good night of wrestling. See you next week!']
});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('pfcss')){const s=document.createElement('style');s.id='pfcss';s.textContent='.pfg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.pfs{display:flex;flex-direction:column;align-items:center;border:1px solid var(--line);border-radius:8px;padding:6px 4px;text-align:center}.pfs b{font-size:18px}.pfs span{font-size:11.5px;color:var(--mute)}.pft{display:flex;flex-direction:column;gap:4px}.pfr{display:flex;gap:10px;font-size:13.5px}.pfr span:first-child{flex:0 0 58px}.fxp{border-top:1px solid var(--line);padding-top:6px;font-size:14px;overflow-wrap:break-word}';document.head.appendChild(s)}}catch(e){}}
(function(){_T('profile','Profil zawodnika','Przycisk Profil na liście składu otwiera kartę zawodnika z całą historią u Ciebie: liczbą walk, bilansem, walkami 4,5★+ i 5★, głównymi walkami, zdobytymi pasami, najlepszą walką, aktualnymi feudami oraz kamieniami milowymi (debiut, pasy, świetne walki, kontuzje, transfery, obietnice pusha). Stąd możesz przejść też do rozmowy służbowej i rozwoju. Na ekranie Historia pojawiły się rekordy zawodników, a po każdej gali, w jej podsumowaniu, widać Reakcje fanów.','The Profile button on the roster opens a wrestler card with their whole history with you: matches, record, 4.5★+ and 5★ matches, main events, title wins, the best match, current feuds and milestones (debut, titles, great matches, injuries, transfers, push promises). From here you can also jump to a work talk and development. The Legacy screen now lists wrestler records, and after every show the summary shows Fan reactions.');
 if(!TUTS.some(x=>x[1]==='profile')){const i=TUTS.findIndex(x=>x[1]==='develop');TUTS.splice(i>=0?i+1:TUTS.length-1,0,['roster','profile'])}})();
normTexts();
