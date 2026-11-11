// ---- v133: breakaway promotions (rare): unhappy stars leave and found a rival ----
const BQADJ=['Renegade','Outlaw','Rebel','Breakout','Defiant','Rogue','Maverick','Underground','Ascendant','Uprising','Independent','Vanguard'];
const BQNOUN=['Wrestling Alliance','Pro Wrestling','Championship Wrestling','Wrestling Federation','Wrestling Collective','Wrestling Syndicate'];
const BQCOL=['#8e44ad','#16a085','#d35400','#2c3e50','#c0392b','#27ae60','#2980b9','#f39c12'];
function bqEnsure(){if(!G.bq)G.bq={last:-999,l:[]};return G.bq}
function bqName(){for(let i=0;i<40;i++){const a=pickR(BQADJ),n=pickR(BQNOUN),nm=a+' '+n,sh=(a[0]+n.split(' ').map(x=>x[0]).join('')).toUpperCase().slice(0,4),id='bq'+(G.uid++);if(!G.rivals.some(r=>r.name===nm||r.short===sh)&&G.fed.name!==nm&&G.fed.short!==sh)return {nm,sh,id}}return {nm:'Free Wrestling '+G.uid,sh:'FW'+(G.uid%90),id:'bq'+(G.uid++)}}
function bqLeaders(fid,n){return G.ws.filter(w=>w.fed===fid&&!w.ext&&!w.farewell&&w.pop>=18).sort((a,b)=>b.pop-a.pop).slice(0,n)}
function bqUnhappy(){return mine().filter(w=>!w.ext&&!w.farewell&&w.pop>=22&&((w.morale||60)<50||(w.loyal||50)<38))}
function bqCreate(fromId,ids,mine){const ws=ids.map(W).filter(Boolean);if(ws.length<2)return null;const nm=bqName(),from=fromId===G.fed.id?G.fed:G.rivals.find(r=>r.id===fromId)||G.fed;
 const tier=clamp((from.tier||3)-1,2,4),avg=ws.reduce((s,w)=>s+w.pop,0)/ws.length,pop=clamp(Math.round(avg*.7),18,48);
 const r={id:nm.id,name:nm.nm,short:nm.sh,country:from.country,tier,pop,cash:Math.round(SB[tier-1]*50*(.8+rnd()*.6)),n:10+Math.floor(rnd()*6),color:pickR(BQCOL),bq:1};
 G.rivals.push(r);
 ws.forEach(w=>{try{purgeW(w.id)}catch(e){}w.fed=r.id;w.contract=52;w.morale=80;w.loyal=70;w.salary=Math.max(w.salary||0,salaryOf(w,tier))});
 if(from.champ&&ws.some(w=>w.id===from.champ))from.champ='';
 bqEnsure().l.push({id:r.id,wk:G.week,from:fromId,tgt:48+Math.floor(rnd()*26),ids:ws.map(w=>w.id),mine:!!mine});bqEnsure().last=G.week;
 addNews('n.bq1',{a:ws[0].name,b:ws[1].name,f:r.name});try{twAdd('job',{f:r.name,o:from.name},'wire',.4)}catch(e){}
 return r}
function bqWeekly(){const b=bqEnsure();
 b.l.forEach(e=>{const r=G.rivals.find(x=>x.id===e.id);if(!r||G.week-e.wk>208)return;if(r.pop<e.tgt)r.pop=clamp(r.pop+Math.min(.14,(e.tgt-r.pop)*.03),3,99);r.cash+=Math.round(SB[r.tier-1]*(.4+rnd()*.6));
  if(r.tier<5&&r.tier<(G.fed.tier||5)&&r.pop>=TPOP[r.tier]&&r.cash>=UPG[r.tier]){r.cash-=UPG[r.tier];r.tier++;addNews('n.bqup',{f:r.name})}});
 // rivals can split too (very rare, world news only)
 if(G.week>=120&&G.week-b.last>=100&&rnd()<.0012){const c=G.rivals.filter(r=>!r.bq&&r.tier>=3&&G.ws.filter(w=>w.fed===r.id&&w.pop>=25).length>=7);const r=c.length?pickR(c):null;if(r){const ls=bqLeaders(r.id,3+Math.floor(rnd()*3)).filter(w=>w.id!==r.champ);if(ls.length>=3)bqCreate(r.id,ls.map(w=>w.id),false)}}}
const _iwBk=infraWeekly;infraWeekly=function(){_iwBk();try{bqWeekly()}catch(e){}};
const bqG=f=>()=>{try{return G.fed.tier>=3&&G.week>=104&&f(bqEnsure())}catch(e){return false}};
const bqMine=()=>bqEnsure().l.filter(e=>e.mine&&G.rivals.some(r=>r.id===e.id));
const bqRv=()=>{const e=pickR(bqMine());const r=e&&G.rivals.find(x=>x.id===e.id);return e&&r?{e,r}:null};
function bqMerge(r){const h=G.ws.filter(w=>w.fed===r.id&&!w.ext);let n=0;const room=ROSTERMAX[G.fed.tier-1]-mine().length;h.sort((a,b)=>b.pop-a.pop).forEach(w=>{if(n<room){w.fed=G.fed.id;w.contract=52;w.salary=Math.max(w.salary||0,salaryOf(w,G.fed.tier));n++}else{w.fed='FA';w.contract=0}});G.rivals=G.rivals.filter(x=>x.id!==r.id);return n}
const XBQ=[
{k:'bqplot',t:['Bunt w szatni','Locker-room revolt'],b:['{w}, {w2} i kilku innych niezadowolonych zawodników spotyka się potajemnie. Mówi się o bogatym inwestorze, który chce sfinansować nową federację.','{w}, {w2} and a few other unhappy wrestlers are meeting in secret. There is talk of a rich backer ready to fund a new promotion.'],
 v:()=>{const u=bqUnhappy().sort((a,b)=>b.pop-a.pop).slice(0,5);return {w:u[0]?u[0].name:'?',w2:u[1]?u[1].name:'?',ids:u.map(w=>w.id).join(','),c:xc(.3),mm:money(xc(.3)),c2:xc(.08),m2:money(xc(.08))}},
 gate:bqG(b=>G.week-b.last>=150&&bqUnhappy().length>=3&&rnd()<.3),
 o:[['Zaoferuj im udział w zyskach ({mm})','Offer them a share of the profits ({mm})'],['Pozwól im odejść','Let them go'],['Zagroź pozwem ({m2})','Threaten legal action ({m2})']],cost:[1,0,1],
 n:[['Rozmowy trwają. Zobaczysz skutki w wiadomościach.','Talks are on. You will see the outcome in the news.'],['Odchodzą, a Ty zostajesz z mniejszą szatnią.','They walk out and you are left with a smaller roster.'],['Napięcie rośnie. Zobaczysz skutki w wiadomościach.','Tension rises. You will see the outcome in the news.']],
 fx:[v=>{xcash(-v.c);const ids=v.ids.split(',');const ok=rnd()<.62;if(ok){ids.forEach(id=>{const w=W(id);if(w){w.morale=clamp((w.morale||50)+18,0,100);w.loyal=clamp((w.loyal||50)+12,0,100);w.contract=52;w.salary=Math.round((w.salary||0)*1.12)}});addNews('n.bqok')}else{bqCreate(G.fed.id,ids,true);xpop(-.6);xconf(-6)}},
  v=>{const r=bqCreate(G.fed.id,v.ids.split(','),true);if(r){xpop(-1);xconf(-8)}},
  v=>{xcash(-v.c2);const ids=v.ids.split(',');if(rnd()<.5){ids.forEach(id=>{const w=W(id);if(w){w.morale=clamp((w.morale||50)-12,0,100);w.loyal=clamp((w.loyal||50)-8,0,100)}});addNews('n.bqok')}else{const r=bqCreate(G.fed.id,ids,true);if(r){xpop(-1.5);xconf(-8)}}}]},
{k:'bqinvade',t:['Rywal rzuca wyzwanie','The upstart throws down the gauntlet'],b:['{f}, założona przez dawnych Waszych zawodników, ogłasza gale w tym samym terminie co Wy. Możecie odpowiedzieć kampanią za {mm}.','{f}, founded by your former wrestlers, announces shows on the same night as yours. You can answer with a campaign for {mm}.'],
 v:()=>{const x=bqRv();return {f:x?x.r.name:'?',rid:x?x.r.id:'',c:xc(.1),mm:money(xc(.1))}},gate:bqG(b=>bqMine().length>0&&rnd()<.5),o:[['Kontratakuj kampanią ({mm})','Counter with a campaign ({mm})'],['Zignoruj','Ignore it']],cost:[1,0],n:[['Fani trzymają Waszą stronę.','Fans stay on your side.'],['Rywal przejmuje część widowni.','The rival takes part of the audience.']],fx:[v=>{xcash(-v.c);xpop(.5)},v=>{xpop(-.6);const r=G.rivals.find(x=>x.id===v.rid);if(r)r.pop=clamp(r.pop+.8,3,99)}]},
{k:'bqpeace',t:['Propozycja pokoju','A peace offer'],b:['Założyciele {f} proponują fuzję: dołączą do Was z całym rosterem, jeśli zapłacicie {mm}.','The founders of {f} propose a merger: they join you with their whole roster if you pay {mm}.'],
 v:()=>{const x=bqRv();const c=x?Math.round(hdPrice(x.r)*.8/1e5)*1e5:0;return {f:x?x.r.name:'?',rid:x?x.r.id:'',c,mm:money(c)}},gate:bqG(b=>bqMine().length>0&&G.week-(b.l[b.l.length-1]||{wk:0}).wk>=30&&rnd()<.4),o:[['Przyjmij fuzję ({mm})','Accept the merger ({mm})'],['Odrzuć','Decline']],cost:[1,0],n:[['Dawni buntownicy wracają do szatni.','The old rebels return to the locker room.'],['Rywal zostaje niezależny.','The rival stays independent.']],fx:[v=>{xcash(-v.c);const r=G.rivals.find(x=>x.id===v.rid);if(r){const n=bqMerge(r);addNews('n.bqmerge',{f:r.name,n});xpop(1)}},()=>{}]},
{k:'bqreturn',t:['Powrót zbłąkanej owcy','A prodigal return'],b:['{w}, który odszedł do {f}, prosi o powrót i obiecuje lojalność.','{w}, who left for {f}, asks to return and promises loyalty.'],
 v:()=>{const x=bqRv();const w=x?pickR(G.ws.filter(z=>z.fed===x.r.id&&x.e.ids.includes(z.id))):null;return {w:w?w.name:'?',id:w?w.id:'',f:x?x.r.name:'?'}},gate:bqG(b=>bqMine().length>0&&rnd()<.4&&mine().length<ROSTERMAX[G.fed.tier-1]),o:[['Przyjmij z powrotem','Take him back'],['Odmów','Refuse']],n:[['Wraca z pokorą, a fani to doceniają.','He returns humbly and fans appreciate it.'],['Zawodnik zostaje u rywala.','The wrestler stays with the rival.']],fx:[v=>{const w=W(v.id);if(w&&w.fed!==G.fed.id){w.fed=G.fed.id;w.contract=52;w.salary=Math.max(w.salary||0,salaryOf(w,G.fed.tier));w.morale=85;w.loyal=80;xpop(.4)}},()=>{}]}
];
XBQ.forEach(XE);
Object.assign(D,{'n.bq1':['{a}, {b} i inni odchodzą i zakładają nową federację: {f}.','{a}, {b} and others walk out and found a new promotion: {f}.'],'n.bqok':['Bunt został zażegnany, a gwiazdy zostają.','The revolt is defused and the stars stay.'],'n.bqup':['{f} awansuje na wyższy poziom.','{f} rises to a higher tier.'],'n.bqmerge':['{f} łączy siły z Wami, a do szatni trafia {n} zawodników.','{f} joins forces with you and {n} wrestlers join the locker room.']});
