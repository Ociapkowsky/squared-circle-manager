
/* ============ Game state ============ */
let G=null,RUN=null,START_F='all',START_C='all',START_K='all',START_S='tier';
const W=id=>G.ws.find(w=>w.id===id);
const mine=()=>G.ws.filter(w=>w.fed===G.fed.id);
const healthy=()=>mine().filter(w=>!w.injury);
const stableOf=id=>G.stables.find(s=>s.members.indexOf(id)>=0)||null;
const names=ids=>ids.filter(Boolean).map(i=>W(i)?W(i).name:'?').join(' & ');
const tdNow=()=>TD[G.fed.tier-1];
const yearOf=w=>1+Math.floor((w-1)/52);
const inter=(a,b)=>a.filter(x=>b.indexOf(x)>=0);
function addNews(k,v){G.news.unshift({w:G.week,k,v:v||{}});G.news=G.news.slice(0,40);try{twHook(k,v)}catch(e){}}
const isF=id=>{const w=W(id);return !!w&&w.g==='f'};
function genderOK(tt,ids){const g=tt.g||'m';if(g==='x')return true;return ids.every(i=>isF(i)===(g==='f'))}
function titleName(tt){return tt.name||(G.fed.short+' '+t(tt.kind==='world'?'t.world':tt.kind==='second'?'t.second':tt.kind==='wworld'?'t.wworld':tt.kind==='wtag'?'t.wtag':'t.tag'))}
const titleOf=id=>G.titles.find(x=>x.id===id);
const isChamp=id=>G.titles.some(tt=>tt.holders.indexOf(id)>=0);

function defaultTitles(tier){const wp=Math.min(5,(tier||1)+1);return[
 {id:'w',g:'m',kind:'world',name:null,prestige:wp,teams:1,strap:'#8a1c1c',plate:'gold',holders:[],since:1},
 {id:'s',g:'m',kind:'second',name:null,prestige:Math.max(1,wp-1.5),teams:1,strap:'#1f3f8a',plate:'silver',holders:[],since:1},
 {id:'tg',g:'m',kind:'tag',name:null,prestige:Math.max(1,wp-1.5),teams:2,strap:'#1d6b4f',plate:'silver',holders:[],since:1}]}

/* ----- match structure ----- */
function emptyMatch(){return{mode:'1v1',a:Array(10).fill(''),b:Array(10).fill(''),winner:'a',fw:0,finish:'clean',stip:'none',title:''}}
function sides(m){const n=MODES[m.mode];return{A:m.a.slice(0,n.a).filter(Boolean),B:m.b.slice(0,n.b).filter(Boolean)}}
function matchReady(m){const n=MODES[m.mode];if(!n)return false;const A=m.a.slice(0,n.a),B=m.b.slice(0,n.b);const all=A.concat(B);return all.every(x=>x&&W(x))&&new Set(all).size===all.length}
function teamsOf(m){const{A,B}=sides(m);const n=MODES[m.mode];if(!n.ffa)return[A,B];const g=n.g||1,r=[];for(let i=0;i<A.length;i+=g)r.push(A.slice(i,i+g));return r}
function outcome(m){const{A,B}=sides(m);const n=MODES[m.mode];
 if(n.ffa){const g=n.g||1,ti=m.fw||0;let wi=A.slice(ti*g,ti*g+g);if(!wi.length)wi=A.slice(0,g);return{wi,li:A.filter(x=>wi.indexOf(x)<0)}}
 return m.winner==='a'?{wi:A,li:B}:{wi:B,li:A}}
function vsText(m){return MODES[m.mode].ffa?teamsOf(m).map(S=>names(S)).join(' vs '):names(sides(m).A)+' vs '+names(sides(m).B)}
function modeLabel(k){const n=MODES[k];if(D['mode.'+k])return t('mode.'+k);if(n.ffa)return n.g>1?t('mode.teamffa',{n:k}):t('mode.ffa',{n:n.a});return n.a===n.b?t('mode.same',{a:n.a}):t('mode.hand',{a:n.a,b:n.b})}
function usedIds(except){const u=new Set();G.card.forEach((m,i)=>{if(i===except)return;const s=sides(m);s.A.concat(s.B).forEach(x=>u.add(x))});return u}
function titleOk(tt,m){const n=MODES[m.mode];const s=sides(m);if(!genderOK(tt,s.A.concat(s.B))||s.A.concat(s.B).some(x=>W(x)&&W(x).ext))return false;return tt.teams===2?(m.mode==='2v2'||(n.ffa&&n.g===2)):(m.mode==='1v1'||(n.ffa&&(n.g||1)===1))}
function fixMatch(m){if(typeof lvlOf==='function'&&lvlOf(m.stip)>maxLvl())m.stip='none';const n=MODES[m.mode],s=STIPS[m.stip]||STIPS.none;
 if(s.noDQ&&(m.finish==='dq'||m.finish==='count'))m.finish='clean';
 if(n.ffa&&(m.finish==='dq'||m.finish==='count'||m.finish==='draw'))m.finish='clean';
 if(m.title){const tt=titleOf(m.title);if(!tt||!titleOk(tt,m))m.title=''}
 if(m.tour){const tr=(G.tours||[]).find(x=>x.id===m.tour.tid),mt=tr&&!tr.done&&tr.rounds[m.tour.r]&&tr.rounds[m.tour.r][m.tour.i];
  if(!mt||mt.w||!W(mt.a)||!W(mt.b)||W(mt.a).injury||W(mt.b).injury){m.tour=null;if(m.stip==='tourney')m.stip='none'}
  else{m.mode='1v1';m.a=Array(10).fill('');m.b=Array(10).fill('');m.a[0]=mt.a;m.b[0]=mt.b;m.stip='tourney';m.title='';m.prize='';m.cash=''}}
 if(m.stip==='tourney'&&!m.tour)m.stip='none';
 if(m.stip==='prizematch'){if(!(m.prize&&prizeOf(m.prize)))m.prize=((G.prizes||[])[0]||{}).id||'';if(!m.prize)m.stip='none'}else m.prize='';
 if(m.cash&&!cashOk(m,prizeOf(m.cash)))m.cash=''
 if(n.ffa&&m.fw>=n.a/(n.g||1))m.fw=0}

/* ----- stables ----- */
function removeFromStable(id,quiet){const st=stableOf(id);if(!st)return;st.members=st.members.filter(x=>x!==id);
 if(!quiet&&W(id))addNews('n.leftst',{w:W(id).name,s:st.name});
 if(st.members.length<2){G.stables=G.stables.filter(x=>x!==st);addNews('n.stdisband',{s:st.name})}}
function seedStables(){
 const tr=G.fed.tier,n=tr>=5?3:tr>=4?2:tr>=3?1:0;if(!n)return;
 const nm=['Iron Circle','Black Sun','Night Shift','Red Hand'];
 const pool=mine().filter(w=>!isChamp(w.id)).sort((a,b)=>b.pop-a.pop);
 for(let k=0;k<n;k++){const role=k%2===0?'heel':'face';let g=pool.filter(w=>w.role===role&&!stableOf(w.id)).slice(0,3);
  if(g.length<2)g=pool.filter(w=>!stableOf(w.id)).slice(0,3);if(g.length<2)break;
  G.stables.push({id:'s'+(G.uid++),name:nm[k],members:g.map(w=>w.id)})}
}
function purgeW(id){
 G.titles.forEach(tt=>{if(tt.holders.indexOf(id)>=0)tt.holders=[]});
 removeFromStable(id,true);
 G.feuds.forEach(f=>{f.A=f.A.filter(x=>x!==id);f.B=f.B.filter(x=>x!==id)});
 G.feuds=G.feuds.filter(f=>f.mw?f.A.length>=2:(f.A.length&&f.B.length));
 (G.prizes||[]).forEach(p=>{if(p.holder===id)p.holder=''});
 G.card=[];G.promos=[];
}
function cleanFeuds(){G.feuds=G.feuds.filter(f=>f.A.length&&(f.mw||f.B.length)&&(!f.stA||G.stables.some(s=>s.id===f.stA))&&(!f.stB||G.stables.some(s=>s.id===f.stB))&&(!f.stR||G.stables.some(s=>s.id===f.stR))&&(!f.fedId||G.rivals.some(r=>r.id===f.fedId))&&(!f.titleId||titleOf(f.titleId)))}

/* ----- feuds ----- */
function sideLabel(ids,stId){const st=stId?G.stables.find(s=>s.id===stId):null;return st?st.name:names(ids)}
const core=ids=>ids.slice().sort((a,b)=>(W(b)?W(b).pop:0)-(W(a)?W(a).pop:0)).slice(0,10);
function mwTeams(f){const g=f.g||1,r=[];for(let i=0;i<f.A.length;i+=g)r.push(f.A.slice(i,i+g));return r}
function fLabel(f){return f.mw?mwTeams(f).map(S=>names(S)).join(' vs '):sideLabel(f.A,f.stA)+' vs '+sideLabel(f.B,f.stB)}
function feudMode(f){if(f.mw){const g=f.g||1,n=f.A.length;if(n%g||n<2)return null;if(g===1)return MODES[n+'way']?n+'way':null;const k=Array(n/g).fill(g).join('v');return MODES[k]?k:null}
 const a=f.A.length,b=f.B.length;if(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa)return a+'v'+b;if(MODES[b+'v'+a]&&!MODES[b+'v'+a].ffa)return b+'v'+a;return null}
function feudHit(f,A,B){
 if(f.mw){const c=inter(f.A,A.concat(B)).length;return c>=2?c:0}
 const ia=inter(f.A,A),ib=inter(f.B,B),ja=inter(f.A,B),jb=inter(f.B,A);
 if(ia.length&&ib.length)return ia.length+ib.length;
 if(ja.length&&jb.length)return ja.length+jb.length;
 if(!B.length&&ia.length&&jb.length)return ia.length+jb.length;
 return 0}
function feudOf(m){const{A,B}=sides(m);let best=null;
 G.feuds.forEach(f=>{const h=feudHit(f,A,B);if(h){const cov=h/(f.A.length+f.B.length);if(!best||cov>best.cov||(cov===best.cov&&f.heat>best.f.heat))best={f,cov}}});return best}
const guestIds=()=>{const s=new Set();G.feuds.forEach(f=>{if(f.fedId)f.B.forEach(i=>s.add(i))});return s};
const isGuest=id=>guestIds().has(id);
const kd=sc=>KINDS[SC[sc].kind];
function topOf(fedId,n,fem){return G.ws.filter(w=>w.fed===fedId&&!w.injury&&(fem===undefined||isF(w.id)===fem)).sort((a,b)=>b.pop-a.pop).slice(0,n).map(w=>w.id)}
function bookable(){const g=guestIds();return healthy().concat(G.ws.filter(w=>(g.has(w.id)||(w.ext&&w.fed==='GST'))&&!w.injury))}
function fdDefaults(sc){
 const k=kd(sc),pool=mine().sort((a,b)=>b.pop-a.pop);const d={sc,A:[],B:[],stA:'',stB:'',mem:'',titleId:'',fedId:''};
 if(k.st===2){d.stA=(G.stables[0]||{}).id||'';d.stB=(G.stables[1]||{}).id||''}
 else if(k.st===1){const st=G.stables[0];d.stA=st?st.id:'';
  if(k.extra){const x=pool.find(w=>!stableOf(w.id));d.B=[x?x.id:'']}
  else if(k.member)d.mem=st?st.members[st.members.length-1]:'';
  else if(k.pair){d.A=[st?st.members[0]:''];d.B=[st?st.members[1]:'']}}
 else if(k.title){const tt=G.titles.find(x=>x.holders.length===x.teams);d.titleId=tt?tt.id:'';const ch=pool.filter(w=>!tt||(tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id])));for(let i=0;i<(tt?tt.teams:1);i++)d.A.push((ch[i]||{}).id||'')}
 else if(k.fed){const rv=G.rivals.filter(r=>G.ws.some(w=>w.fed===r.id)).sort((a,b)=>Math.abs(a.pop-G.fed.pop)-Math.abs(b.pop-G.fed.pop))[0];d.fedId=rv?rv.id:'';for(let i=0;i<SC[sc].n;i++)d.A.push((pool[i]||{}).id||'')}
 else{d.fmt=2;d.gen=mine().filter(w=>!isF(w.id)).length>=k.a+k.b?'m':'f';fdFill(d)}
 return d}
function genPool(d){return mine().filter(w=>(d.gen||'x')==='x'||((d.gen==='f')===isF(w.id)))}
function fdFill(d){const k=kd(d.sc),pool=genPool(d).sort((a,b)=>b.pop-a.pop);d.A=[];d.B=[];let j=0;
 if(d.fmt>2){for(let i=0;i<d.fmt*k.a;i++)d.A.push((pool[j++]||{}).id||'')}
 else{for(let i=0;i<k.a;i++)d.A.push((pool[j++]||{}).id||'');for(let i=0;i<k.b;i++)d.B.push((pool[j++]||{}).id||'')}}
const multiOK=sc=>{const k=kd(sc);return !!(k.a&&k.a===k.b)};
const maxFmt=sc=>{const g=kd(sc).a;return g===1?6:g===2?4:3};
function fdSides(d){
 const sp=SC[d.sc],k=kd(d.sc);let A=[],B=[],stA='',stB='',stR='',titleId='',fedId='',mw=0,mg=1;
 if(k.st===2){const a=G.stables.find(s=>s.id===d.stA),b=G.stables.find(s=>s.id===d.stB);if(!a||!b||a===b)return null;A=core(a.members);B=core(b.members);stA=a.id;stB=b.id}
 else if(k.st===1){const a=G.stables.find(s=>s.id===d.stA);if(!a)return null;
  if(k.extra){stA=a.id;A=core(a.members);B=[d.B[0]]}
  else if(k.member){stA=a.id;if(a.members.indexOf(d.mem)<0)return null;A=core(a.members.filter(x=>x!==d.mem));B=[d.mem]}
  else if(k.pair){stR=a.id;A=[d.A[0]];B=[d.B[0]];if(!A[0]||!B[0]||a.members.indexOf(A[0])<0||a.members.indexOf(B[0])<0)return{err:'f.invalid'}}}
 else if(k.title){const tt=titleOf(d.titleId);if(!tt||tt.holders.length!==tt.teams)return{err:'f.notitle'};titleId=tt.id;A=d.A.slice(0,tt.teams);B=tt.holders.slice()}
 else if(k.fed){const rv=G.rivals.find(r=>r.id===d.fedId);if(!rv)return{err:'f.invalid'};fedId=rv.id;A=d.A.slice(0,sp.n);B=topOf(rv.id,sp.n,isF(A[0]));if(B.length<sp.n)return{err:'f.invalid'}}
 else if(d.fmt>2&&multiOK(d.sc)){A=d.A.slice(0,d.fmt*k.a);B=[];mw=1;mg=k.a}
 else{A=d.A.slice(0,k.a);B=d.B.slice(0,k.b)}
 const all=A.concat(B);if(!all.every(x=>x&&W(x))||new Set(all).size!==all.length)return{err:'f.invalid'};
 return{A,B,stA,stB,stR,titleId,fedId,mw,g:mg}}
function applyEnd(f,aWon,li){
 const e=SC[f.sc].end;const st=G.stables.find(s=>s.id===f.stA);
 if(e==='join'&&st){const w=W(f.B[0]);if(w){if(aWon&&!stableOf(w.id)){st.members.push(w.id);w.morale=clamp(w.morale+4,0,100);addNews('n.joined',{w:w.name,s:st.name})}else{w.pop=clamp(w.pop+2,1,100);addNews('n.resisted',{w:w.name,s:st.name})}}}
 else if(e==='leave'&&st){const w=W(f.B[0]);if(w){if(!aWon)removeFromStable(w.id);else st.members.forEach(i=>{if(W(i))W(i).morale=clamp(W(i).morale+3,0,100)})}}
 else if(e==='war'){(aWon?f.B:f.A).forEach(i=>{if(W(i))W(i).morale=clamp(W(i).morale-4,0,100)})}
 else if(e==='fed'){const rv=G.rivals.find(r=>r.id===f.fedId);if(rv){if(aWon){rv.pop=clamp(rv.pop-3,3,99);G.fed.pop=clamp(G.fed.pop+2,2,100)}else{rv.pop=clamp(rv.pop+3,3,99);G.fed.pop=clamp(G.fed.pop-2,2,100)}addNews('n.fedwin',{f:(aWon?rv:G.fed).short||(aWon?rv:G.fed).name})}}
 else if(e==='retire'){li.slice().forEach(i=>{const w=W(i);if(w&&w.fed===G.fed.id){w.fed='RET';addNews('n.retire',{w:w.name});purgeW(i)}})}
 else if(e==='fire'){li.slice().forEach(i=>{const w=W(i);if(w&&w.fed===G.fed.id){w.fed='FA';addNews('n.fired',{w:w.name});purgeW(i)}})}
 else if(e==='heel'){const w=W(f.A[0]);if(w&&w.role==='face'){w.role='heel';addNews('n.turn',{w:w.name,r:t('role.heel').split(' ')[0]})}}
}

/* ----- per-federation state setup (new game and job change) ----- */
function fedSetup(custom){
 if(!custom){const cap=ROSTERMAX[G.fed.tier-1]-2,mc=Math.ceil(cap*.72);const m=mine().filter(w=>w.g!=='f').sort((a,b)=>champPri(b)-champPri(a)||b.pop-a.pop),f=mine().filter(w=>w.g==='f').sort((a,b)=>champPri(b)-champPri(a)||b.pop-a.pop);const fk=Math.min(f.length,Math.max(cap-Math.min(m.length,mc),0));m.slice(mc).concat(f.slice(fk)).forEach(w=>{w.fed='FA';w.acc=0})}
 const top=mine().filter(w=>w.g!=='f').sort((a,b)=>b.pop-a.pop);
 {const wom=mine().filter(w=>w.g==='f').sort((a,b)=>b.pop-a.pop);if(wom.length>=2)G.titles.push({id:'ww',g:'f',kind:'wworld',name:null,prestige:wom[0].pop>45?Math.min(5,G.fed.tier+1):Math.max(1,G.fed.tier),teams:1,strap:'#c4358a',plate:'gold',holders:[wom[0].id],since:1});if(wom.length>=4)G.titles.push({id:'wt',g:'f',kind:'wtag',name:null,prestige:Math.max(1,G.fed.tier-.5),teams:2,strap:'#6a3aa8',plate:'silver',holders:[wom[2].id,wom[3].id],since:1})}
 if(top[0])G.titles[0].holders=[top[0].id];if(top[1])G.titles[1].holders=[top[1].id];
 if(top.length>=4)G.titles[2].holders=[top[2].id,top[3].id];
 if(!custom&&typeof bigTitleSeed==='function')bigTitleSeed();
 if(!custom)champSeed();
 {const st=(!custom&&PACK.stables||[]).filter(s=>s.fed===G.fed.id);st.forEach(s=>{const ms=s.members.filter(id=>{const w=W(id);return w&&w.fed===G.fed.id&&!stableOf(id)});if(ms.length>=2)G.stables.push({id:'s'+(G.uid++),name:s.name,members:ms})});if(!G.stables.length)seedStables()}
}

/* ----- new game ----- */
function newGame(fedId,custom){
 const ws=JSON.parse(JSON.stringify(PACK.wrestlers));let fed,rivals;const fedC={};PACK.feds.forEach(f=>fedC[f.id]=f.country);
 if(custom){
  const nm=(custom.name||'My Promotion').slice(0,40),cc=custom.country||'PL';fedC.mine=cc;
  fed={id:'mine',name:nm,short:(nm.replace(/[^A-Za-z0-9 ]/g,'').split(' ').filter(Boolean).map(x=>x[0]).join('').slice(0,4)||'MYP').toUpperCase(),country:cc,tier:1,pop:6,cash:12000,color:'#f2b632'};
  rivals=PACK.feds.map(f=>Object.assign({},f));
  for(let i=0;i<4;i++){const N=NAMES[cc]||NAMES.US;const nmw=N.f[Math.floor(rnd()*N.f.length)]+' '+N.l[Math.floor(rnd()*N.l.length)];const style=STYLES[Math.floor(rnd()*7)];
   const w={id:'c'+i,name:nmw,country:cc,style,role:i%2?'heel':'face',ring:clamp(Math.round(34+SBIAS[style].ring+(rnd()-.5)*12),20,60),mic:30+Math.floor(rnd()*20),cha:32+Math.floor(rnd()*20),pop:6+Math.floor(rnd()*8),age:22+Math.floor(rnd()*12),fed:'mine',contract:52,injury:0,look:randLook(Math.random,cc)};
   w.salary=salaryOf(w,1);ws.push(w)}
  for(let i=0;i<2;i++){const N=NAMES[cc]||NAMES.US,FN=NAMESF[cc]||NAMESF.US;const nmw=FN[Math.floor(rnd()*FN.length)]+' '+N.l[Math.floor(rnd()*N.l.length)];const style=STYLES[Math.floor(rnd()*7)];
   const w={id:'c'+(4+i),g:'f',name:nmw,country:cc,style,role:i%2?'heel':'face',ring:clamp(Math.round(34+SBIAS[style].ring+(rnd()-.5)*12),20,60),mic:30+Math.floor(rnd()*20),cha:32+Math.floor(rnd()*20),pop:6+Math.floor(rnd()*8),age:22+Math.floor(rnd()*12),fed:'mine',contract:52,injury:0,look:randLook(Math.random,cc,1)};
   w.salary=salaryOf(w,1);ws.push(w)}
 }else{
  const spec=PACK.feds.find(f=>f.id===fedId);fed=Object.assign({},spec);rivals=PACK.feds.filter(f=>f.id!==fedId).map(f=>Object.assign({},f));
 }
 ws.forEach(w=>{genStats(w,Math.random);if(w.acc===undefined)w.acc=w.fed==='FA'?0:clamp(accStart(w.country,fedC[w.fed]||w.country)+Math.floor(rnd()*rnd()*130),0,100)});
 G={v:2,screen:'dash',week:1,fed,rivals,ws,price:100,card:[],promos:[],feuds:[],titles:defaultTitles(fed.tier),reigns:[],hist:[],news:[],streak:0,debt:0,lastRating:null,popHist:[fed.pop],sponsor:null,summary:null,uid:1,sort:'pop',stables:[],pairs:{},fd:null,td:null};
 fedSetup(custom);
 G.fd=fdDefaults('betrayal');initExtras();
 save();
}
function save(){if(!G)return;try{localStorage.setItem(LS_SAVE,JSON.stringify(G))}catch(e){}}
function loadSave(){try{const s=localStorage.getItem(LS_SAVE);if(s){const g=JSON.parse(s);if(g&&g.v===2&&g.ws&&g.fed){g.promos=g.promos||[];return g}}}catch(e){}return null}

/* ----- auto booking ----- */
function flog(f,o){f.log=f.log||[];f.log.push(Object.assign({wk:G.week},o));if(f.log.length>80)f.log.shift()}
function feudFoes(id){const s=[];G.feuds.forEach(f=>{const a=f.A.indexOf(id)>=0,b=f.B.indexOf(id)>=0;if(!a&&!b)return;(f.mw?f.A.filter(x=>x!==id):a?f.B:f.A).forEach(x=>{if(s.indexOf(x)<0&&W(x))s.push(x)})});return s}
function feudTag(id){const s=feudFoes(id);if(!s.length)return '';const n=s.slice(0,2).map(x=>W(x).name);return ' ('+t('sh.feudwith',{n:n.join(', ')+(s.length>2?' +'+(s.length-2):'')})+')'}
function buildFeudMatch(f){
 const mode=feudMode(f);if(!mode)return null;const gst=guestIds(),used=usedIds(-1);const ids=f.A.concat(f.B);
 if(!ids.every(id=>{const w=W(id);return w&&!w.injury&&(w.fed===G.fed.id||gst.has(id))&&!used.has(id)}))return null;
 const a=f.A.length,b=f.B.length;const flip=!f.mw&&!(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa);
 const A=flip?f.B:f.A,B=flip?f.A:f.B;const m=emptyMatch();m.mode=mode;A.forEach((x,i)=>m.a[i]=x);B.forEach((x,i)=>m.b[i]=x);
 const sa=avg(A.map(x=>W(x).pop))+(rnd()-.5)*30,sb=avg(B.map(x=>W(x).pop))+(rnd()-.5)*30;m.winner=sa>=sb?'a':'b';
 const nn=MODES[mode];if(nn.ffa)m.fw=Math.floor(rnd()*nn.a/(nn.g||1));
 if(f.fav&&G.fed.tier>=STIPS[f.fav].tier)m.stip=f.fav;
 fixMatch(m);return m}
function promoReady(p){const a=W(p.a);if(!p.a||!a||a.injury)return false;if(p.b){const b=W(p.b);if(!b||b.injury||p.b===p.a)return false}return true}
function autoBook(){
 const hl=healthy().sort((a,b)=>b.pop-a.pop);const used=new Set();const card=[];
 const maxM=Math.min(5,Math.floor(hl.length/2));
 const gst=guestIds();const free=id=>{const w=W(id);return w&&!w.injury&&(w.fed===G.fed.id||gst.has(id))&&!used.has(id)};
 const roleOpp=(a,b)=>(W(a).role==='face'&&W(b).role==='heel')||(W(a).role==='heel'&&W(b).role==='face')?1:0;
 const mk=(mode,A,B,o)=>{const m=emptyMatch();m.mode=mode;A.forEach((x,i)=>m.a[i]=x);B.forEach((x,i)=>m.b[i]=x);A.concat(B).forEach(x=>used.add(x));
  const sa=avg(A.map(x=>W(x).pop))+(rnd()-.5)*30,sb=avg(B.map(x=>W(x).pop))+(rnd()-.5)*30;m.winner=sa>=sb?'a':'b';
  const nn=MODES[mode];if(nn.ffa)m.fw=Math.floor(rnd()*nn.a/(nn.g||1));Object.assign(m,o||{});fixMatch(m);return m};
 G.feuds.slice().sort((x,y)=>y.heat-x.heat).forEach(f=>{
  if(card.length>=maxM)return;const mode=feudMode(f);if(!mode)return;if(!f.A.concat(f.B).every(free))return;
  const a=f.A.length,b=f.B.length;const flip=!f.mw&&!(MODES[a+'v'+b]&&!MODES[a+'v'+b].ffa);const so=f.fav&&G.fed.tier>=STIPS[f.fav].tier?{stip:f.fav}:{};
  card.push(flip?mk(mode,f.B,f.A,so):mk(mode,f.A,f.B,so))});
 const capT=(typeof isBig==='function'&&isBig())?3:(rnd()<.6?1:0);let nT=0;
 const tryT=tt=>{
  const c=hl.filter(w=>free(w.id)&&tt.holders.indexOf(w.id)<0&&genderOK(tt,[w.id]));
  if(tt.teams===1){
   if(tt.holders.length===1&&free(tt.holders[0])){const h=tt.holders[0];const ch=c.slice().sort((x,y)=>(roleOpp(h,y.id)*8-Math.abs(y.pop-W(h).pop)/4)-(roleOpp(h,x.id)*8-Math.abs(x.pop-W(h).pop)/4))[0];if(ch)card.push(mk('1v1',[h],[ch.id],{title:tt.id,winner:'a'}))}
   else if(!tt.holders.length&&c.length>=2)card.push(mk('1v1',[c[0].id],[c[1].id],{title:tt.id}));
  }else{
   if(tt.holders.length===2&&tt.holders.every(free)&&c.length>=2)card.push(mk('2v2',tt.holders,[c[0].id,c[1].id],{title:tt.id,winner:'a'}));
   else if(!tt.holders.length&&c.length>=4)card.push(mk('2v2',[c[0].id,c[2].id],[c[1].id,c[3].id],{title:tt.id}));
  }};
 G.titles.slice().sort((x,y)=>(G.week-(y.lw||y.since||0))-(G.week-(x.lw||x.since||0))).forEach(tt=>{if(card.length>=maxM||nT>=capT)return;const b0=card.length;tryT(tt);if(card.length>b0)nT++});
 while(card.length<maxM){const c0=hl.filter(w=>free(w.id));const cm=c0.filter(w=>!isF(w.id)),cf=c0.filter(w=>isF(w.id));const hasF=card.some(m=>sides(m).A.some(isF));
  const c=(cf.length>=2&&(!hasF||cm.length<2))?cf:(cm.length>=2?cm:cf);if(c.length<2)break;
  if(c.length>=4&&rnd()<.3){card.push(mk('2v2',[c[0].id,c[2].id],[c[1].id,c[3].id]));continue}
  const a=c[0];let best=null,bs=-99;c.slice(1,7).forEach(b=>{const s=chem(a.style,b.style).v-Math.abs(a.pop-b.pop)/6+roleOpp(a.id,b.id)*3;if(s>bs){bs=s;best=b}});
  card.push(mk('1v1',[a.id],[best.id]))}
 const wt=m=>{const s=sides(m);return s.A.concat(s.B).reduce((x,i)=>x+W(i).pop,0)/Math.max(1,s.A.length+s.B.length)+(m.title?18*(titleOf(m.title)?prestOf(titleOf(m.title)):1):0)};
 card.sort((x,y)=>wt(x)-wt(y));G.card=card;
 G.promos=[];
 const pf=G.feuds.filter(f=>!f.titleId||1).sort((x,y)=>y.heat-x.heat).find(f=>{const ids=f.mw?f.A:[f.A[0],f.B[0]];return ids.length>=2&&ids[0]&&ids[1]&&W(ids[0])&&W(ids[1])&&!W(ids[0]).injury&&!W(ids[1]).injury&&(isGuest(ids[0])||W(ids[0]).fed===G.fed.id)&&(isGuest(ids[1])||W(ids[1]).fed===G.fed.id)});
 if(pf){const ids=pf.mw?pf.A:[pf.A[0],pf.B[0]];G.promos.push({id:'p'+(G.uid++),a:ids[0],b:ids[1],at:Math.max(0,card.length-1)})}
 tourSlots();
 guestsHired().filter(g=>!g.injury&&!G.promos.some(x=>x.a===g.id||x.b===g.id)).slice(0,2).forEach(g=>{if(G.promos.length<4)G.promos.push({id:'p'+(G.uid++),a:g.id,b:'',at:Math.max(0,card.length-1)})});
}
