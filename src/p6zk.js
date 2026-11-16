;/* dynasties: consistent relations (age + gender), sane surnames, custom fictional families */
(function(){
 Object.assign(D,{'dy.r.sis':['siostra','sister'],'dy.r.cuzf':['kuzynka','cousin'],'dy.r.nec':['bratanica','niece'],'dy.r.unc':['stryj','uncle'],'dy.r.aunt':['ciotka','aunt']});
 const BADSUR=/^(jr|sr|ii|iii|iv|hijo|junior|el|la|de|del)$/i;
 const surOf=n=>{const p=String(n).trim().split(/\s+/);if(p.length<2)return '';let s=p[p.length-1];if(BADSUR.test(s))return '';return s.replace(/[.,]/g,'')};
 /* relation of x to the clan head, given ages and gender */
 function relFor(x,h){const f=x.g==='f',d=(h.age||40)-(x.age||25);
  if(d>=18)return 'son';
  if(d>=10)return f?'nec':'nep';
  if(d>=-8)return rnd()<.6?(f?'sis':'bro'):(f?'cuzf':'cuz');
  return f?'aunt':'unc'}
 dySeed=function(dy){const used={};const names=new Set(G.ws.map(w=>w.name));
  const vets=G.ws.filter(w=>!w.ext&&w.fed!=='RET'&&w.age>=35&&w.age<=58&&w.pop>=28&&surOf(w.name)&&surOf(w.name).length>=3&&w.g!=='f'&&(((NAMES[w.country]||NAMES.US).l||[]).includes(surOf(w.name))||((NAMES[w.country]||NAMES.US).f||[]).includes(w.name.split(' ')[0]))).sort(()=>rnd()-.5);
  const mineV=vets.filter(w=>w.fed===G.fed.id);const pool=mineV.slice(0,1).concat(vets.filter(w=>w.fed!==G.fed.id));
  for(const w of pool){if(dy.f.length>=4)break;const s=surOf(w.name);if(!s||used[s]||w.fam)continue;used[s]=1;
   const f={id:'f'+(G.uid++),n:s,cc:w.country,pres:clamp(Math.round(w.pop*.6),10,60),h:w.id,hist:[]};dy.f.push(f);w.fam=f.id;
   const c=G.ws.filter(x=>!x.ext&&!x.fam&&x.fed!=='RET'&&x.country===w.country&&x.age>=19&&x.age<=w.age+6&&x.id!==w.id&&x.name.trim().split(/\s+/).length>=2&&!used[surOf(x.name)]).sort(()=>rnd()-.5);
   const n=1+(rnd()<.5?1:0);let made=0;
   for(let i=0;i<c.length&&made<n;i++){const x=c[i],nn=x.name.split(' ')[0]+' '+s;if(names.has(nn))continue;names.add(nn);x.name=nn;x.fam=f.id;x.fr={t:relFor(x,w),of:w.id};made++}
   const nk=1+(rnd()<.6?1:0);for(let i=0;i<nk;i++)dyKid(w,f,14+Math.floor(rnd()*4),true)}
  try{customDynasties(dy,names)}catch(e){}};
 const _da=dyAdult;dyAdult=function(host){const w=_da.apply(this,arguments);try{if(w&&w.fr)w.fr.t=relFor(w,host)}catch(e){}return w};
 /* custom fictional families (surnames chosen to avoid real wrestling families) */
 const CUSTOM=[
  {n:'Wilk',cc:'PL',pres:34,m:[['Tomasz','powerhouse',47,0,46,'head'],['Kuba','highflyer',25,0,24,'son'],['Ola','technician',22,1,20,'son']],kids:1},
  {n:'Ashgrove',cc:'GB',pres:30,m:[['Edmund','technician',52,0,44,'head'],['Harriet','technician',47,1,38,'sis'],['Wesley','strong',23,0,19,'nep']],kids:1},
  {n:'Villaverde',cc:'MX',pres:38,m:[['Rafael','lucha',50,0,45,'head'],['Rafaelito','lucha',25,0,25,'son'],['Estrella','lucha',22,1,21,'son']],kids:2},
  {n:'Nakagawa',cc:'JP',pres:36,m:[['Kenzo','strong',48,0,43,'head'],['Daichi','strong',25,0,26,'son'],['Mio','technician',21,1,18,'nec']],kids:0},
  {n:'Brannigan',cc:'US',pres:32,m:[['Dutch','brawler',51,0,42,'head'],['Shane','brawler',46,0,36,'bro'],['Tyler','hardcore',24,0,22,'son']],kids:1},
  {n:'Obiora',cc:'NG',pres:28,m:[['Chidi','powerhouse',45,0,36,'head'],['Amara','technician',39,1,28,'sis'],['Nnamdi','highflyer',22,0,16,'nep']],kids:1}];
 function customDynasties(dy,names){
  CUSTOM.forEach(c=>{if(dy.f.some(f=>f.n===c.n))return;const f={id:'f'+(G.uid++),n:c.n,cc:c.cc,pres:c.pres,h:null,hist:[]};let head=null;
   const N=NAMES[c.cc]||NAMES.US;
   c.m.forEach(([fn,st,age,fem,pop,rel])=>{const nm=fn+' '+c.n;if(names.has(nm))return;names.add(nm);const b=SBIAS[st]||{ring:0,mic:0,cha:0},base=34+pop*.35;
    const w={id:'x'+(G.uid++),name:nm,country:c.cc,style:st,role:pickR(['face','heel','tweener']),ring:clamp(Math.round(base+b.ring+(rnd()-.5)*8),20,88),mic:clamp(Math.round(base-4+b.mic+(rnd()-.5)*10),14,88),cha:clamp(Math.round(base+b.cha+(rnd()-.5)*10),14,88),pop,age,fed:'FA',contract:0,injury:0,look:randLook(Math.random,c.cc,!!fem),acc:0,pot:clamp(Math.round(50+(80-age)*.5+rnd()*15),40,92),fam:f.id,rev:1};
    if(fem)w.g='f';genStats(w,Math.random);w.salary=salaryOf(w,1);if(rel==='head'){head=w}else w.fr={t:rel,of:head?head.id:null};G.ws.push(w);if(rel==='head'){f.h=w.id}});
   if(!head)return;dy.f.push(f);for(let i=0;i<(c.kids||0);i++)dyKid(head,f,14+Math.floor(rnd()*4),true)})}
})();
if(typeof normTexts==="function")normTexts();
