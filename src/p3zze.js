// ---- v104: famous managers (real-inspired, altered names) ----
const MG_FAM=[
{k:'heymann',n:'Paul Heymann',cc:'US',g:'m',s:95,f:'mic',pop:85},
{k:'cornett',n:'Jim Cornett',cc:'US',g:'m',s:90,f:'mic',pop:70},
{k:'prichart',n:'Bruce Prichart',cc:'US',g:'m',s:84,f:'heel',pop:60},
{k:'hartt',n:'Jimmy Hartt',cc:'US',g:'m',s:76,f:'face',pop:62},
{k:'andersen',n:'Arn Andersen',cc:'US',g:'m',s:86,f:'mentor',pop:70},
{k:'blanchett',n:'Tully Blanchett',cc:'US',g:'m',s:78,f:'mentor',pop:55},
{k:'coulter',n:'Zeb Coulter',cc:'US',g:'m',s:72,f:'heel',pop:50},
{k:'lang',n:'Teddy Lang',cc:'US',g:'m',s:70,f:'face',pop:55},
{k:'hathway',n:'Stokely Hathway',cc:'US',g:'m',s:80,f:'mic',pop:45},
{k:'guerrera',n:'Vicky Guerrera',cc:'MX',g:'f',s:82,f:'heel',pop:65},
{k:'perri',n:'Lana Perri',cc:'RU',g:'f',s:74,f:'face',pop:60},
{k:'alfonzo',n:'Bill Alfonzo',cc:'US',g:'m',s:70,f:'mentor',pop:40},
{k:'tomasso',n:'Tazz Tomasso',cc:'US',g:'m',s:78,f:'mentor',pop:50}];
function mgSeedRng(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return((h>>>0)%100000)/100000}}
function mgFamSal(f){return Math.round(mgSal(f.s)*1.3/100)*100}
function mgFamFee(f){return mgFamSal(f)*10}
function mgFamHired(k){return mgEnsure().l.some(m=>m.fam===k)}
function mgFamAvail(){const g=mgEnsure();if(!g.fam||G.week-(g.fw||0)>=10){const pool=MG_FAM.filter(f=>!mgFamHired(f.k)).sort(()=>rnd()-.5).slice(0,4).map(f=>f.k);g.fam=pool;g.fw=G.week}
 g.fam=g.fam.filter(k=>!mgFamHired(k));return g.fam.map(k=>MG_FAM.find(f=>f.k===k)).filter(Boolean)}
function mgHireFam(k,disc){const g=mgEnsure(),f=MG_FAM.find(x=>x.k===k);if(!f||mgFamHired(k)||g.l.length>=mgCap())return false;const sal=mgFamSal(f),fee=Math.round(mgFamFee(f)*(disc||1)/100)*100;if(G.fed.cash<fee)return false;
 G.fed.cash-=fee;g.l.push({id:'mg'+(G.uid++),n:f.n,g:f.g,cc:f.cc,s:f.s,f:f.f,look:randLook(mgSeedRng(f.k),f.cc,f.g==='f'),sal,since:G.week,w:'',fam:k,legend:true});g.fam=(g.fam||[]).filter(x=>x!==k);addNews('n.mghire',{n:f.n});return true}
const _mgpw=mgPow;mgPow=function(w){const p=_mgpw(w),m=mgOf(w.id);return m&&m.fam?p*1.15:p};
const _iwmf=infraWeekly;infraWeekly=function(){_iwmf();const g=G.mg;if(!g)return;g.l.forEach(m=>{if(m.fam)xpop(.02*m.s/100)})};
const _vmgf=vMg;vMg=function(){let h=_vmgf();const av=mgFamAvail(),full=mgEnsure().l.length>=mgCap();
 if(!av.length)return h;
 return h+'<h3>'+t('mgf.h')+'</h3><div class="mute" style="font-size:13px">'+t('mgf.n')+'</div>'+av.map(f=>{const sal=mgFamSal(f),fee=mgFamFee(f);
  return '<div class="card row spread" style="gap:8px;flex-wrap:wrap;align-items:center"><span class="row" style="gap:8px;align-items:center"><span class="av" style="padding:2px">'+avatar(randLook(mgSeedRng(f.k),f.cc,f.g==='f'),44)+'</span><span><b>'+esc(f.n)+'</b> ★<div class="mute" style="font-size:13px">'+cn(f.cc)+' · '+t('mg.skill',{s:f.s})+' · '+t('mg.f.'+f.f)+' · '+t('mg.sal',{m:money(sal)})+(mgFamOk(f)?'':' · <span style="color:var(--bad,#c4358a)">'+t('mgr.req',{t:mgFamReq(f).t,p:mgFamReq(f).p})+'</span>')+'</div></span></span><button class="btn sm" data-act="mghirefam" data-k="'+f.k+'"'+(!full&&G.fed.cash>=fee&&mgFamOk(f)?'':' disabled')+'>'+t('mg.hire',{m:money(fee)})+'</button></div>'}).join('')};
Object.assign(D,{'mgf.h':['Znani menedżerowie','Famous managers'],'mgf.n':['Wielkie nazwiska branży. Są drogie, ale działają o 15% mocniej i budują markę federacji. Lista zmienia się co kilka tygodni.','Big names of the business. They are expensive but work 15% stronger and build the federation brand. The list rotates every few weeks.']});
XE({k:'mgfamoffer',t:['Znany menedżer chce do Ciebie','A famous manager wants in'],b:['{f} ma wolny kalendarz i proponuje współpracę z połową zwykłej opłaty wstępnej ({m}).','{f} has a free calendar and offers to join for half the usual entry fee ({m}).'],
 v:()=>{const a=mgFamAvail(),f=a[0];const fee=f?Math.round(mgFamFee(f)*.5/100)*100:0;return {f:f?f.n:'?',k:f?f.k:'',c:fee,m:money(fee)}},o:[['Zatrudnij ({m})','Hire ({m})'],['Odmów','Decline']],cost:[1,0],
 gate:()=>mgEnsure().l.length<mgCap()&&mgFamAvail().length>0,n:[['Wielkie nazwisko dołącza do ekipy.','A big name joins the crew.'],['Okazja przechodzi obok.','The chance passes.']],fx:[v=>{mgHireFam(v.k,.5)},()=>{}]});
XE({k:'mgfamfeud',t:['Znany menedżer atakuje','A famous manager attacks'],b:['{f} publicznie krytykuje Twoją federację i zapowiada, że jej gwiazdy "nie mają klasy".','{f} publicly slams your federation and says its stars "have no class".'],
 v:()=>{const a=mgFamAvail(),f=a[0];return {f:f?f.n:'?'}},o:[['Odpowiedz promo','Answer with a promo'],['Zignoruj','Ignore']],gate:()=>mgFamAvail().length>0,n:[['Wojna na słowa nakręca fanów.','The war of words fires up fans.'],['Sprawa cichnie.','The matter dies down.']],fx:[()=>{xpop(.5);const w=pickR(mine().filter(x=>!x.ext));if(w)w.mic=clamp(w.mic+1,1,99)},()=>{}]});
XE({k:'mgfamclient',t:['Menedżer-legenda za kulisami','A legend behind the curtain'],b:['{f} odwiedza Twoją galę i chwali młodego zawodnika.','{f} visits your show and praises a young wrestler.'],
 v:()=>{const a=mgFamAvail(),f=a[0];return {f:f?f.n:'?'}},o:[['Wykorzystaj to w promocji','Use it in promotion'],['Zostaw dyskretnie','Keep it discreet']],gate:()=>mgFamAvail().length>0&&mine().some(x=>!x.ext&&x.age<=27),n:[['Młody zawodnik rośnie w oczach.','The youngster grows in stature.'],['Młody zawodnik jest wdzięczny.','The youngster is grateful.']],fx:[()=>{xyoung(1).forEach(w=>{w.pop=clamp(w.pop+3,1,100);w.mic=clamp(w.mic+2,1,99);evMood(w,8)});xpop(.3)},()=>{xyoung(1).forEach(w=>evMood(w,5))}]});
