;/* custom promotion: own roster / own belts or auto-generated */
(function(){
Object.assign(D,{'cb.roster':['Roster','Roster'],'cb.belts':['Pasy','Belts'],'cb.auto':['Wygeneruj automatycznie','Generate automatically'],'cb.own':['Stworzę własne','I will create my own'],
 'cb.title':['Twoja federacja: {n}','Your promotion: {n}'],'cb.rt':['Zawodnicy (statystyki wylosuję)','Wrestlers (stats are random)'],'cb.bt':['Pasy mistrzowskie','Championship belts'],'cb.name':['Imię i nazwisko','Name'],'cb.gender':['Płeć','Gender'],'cb.m':['Mężczyzna','Male'],'cb.f':['Kobieta','Female'],'cb.style':['Styl','Style'],'cb.role':['Rola','Role'],
 'cb.addw':['+ Dodaj zawodnika','+ Add wrestler'],'cb.addb':['+ Dodaj pas','+ Add belt'],'cb.del':['Usuń','Remove'],'cb.go':['Zacznij grę','Start the game'],'cb.back':['Wróć','Back'],'cb.rnd':['Losuj nazwisko','Random name'],'cb.bname':['Nazwa pasa','Belt name'],'cb.bkind':['Rodzaj','Kind'],'cb.bcol':['Kolor paska','Strap colour'],
 'cb.k.classic':['Klasyczny (główny)','Classic (main)'],'cb.k.heritage':['Tradycyjny','Heritage'],'cb.k.hardcore':['Hardcore','Hardcore'],'cb.k.ultra':['Nowoczesny','Modern'],'cb.k.women':['Damski','Women'],'cb.k.tag':['Drużynowy (2 os.)','Tag team (2)'],'cb.k.euro':['Międzynarodowy','International'],
 'cb.hint':['Wygląd zawodników wylosuję, a zmienisz go potem w edytorze wyglądu na liście zawodników.','Looks are randomized; change them later in the look editor on the roster.'],'cb.min':['Potrzebujesz co najmniej 2 zawodników i 1 pasa (albo wybierz automat).','You need at least 2 wrestlers and 1 belt (or choose auto).']});
let S=null;
const KINDS=['classic','heritage','hardcore','ultra','women','tag','euro'];
const rname=(cc,fem)=>{const N=NAMES[cc]||NAMES.US,FN=fem?(NAMESF[cc]||NAMESF.US):N.f;return FN[Math.floor(Math.random()*FN.length)]+' '+N.l[Math.floor(Math.random()*N.l.length)]};
function init(cc,mw,mb){S={cc,name:(document.getElementById('cname')||{}).value||'My Promotion',mw,mb,w:[],b:[]};
 if(mw){for(let i=0;i<6;i++){const f=i>=4;S.w.push({n:rname(cc,f),g:f?'f':'m',st:STYLES[Math.floor(Math.random()*7)],r:i%2?'heel':'face'})}}
 if(mb){S.b=[{n:'World Heavyweight Championship',k:'classic',c:BPRESETS.classic.strap},{n:'Tag Team Championship',k:'tag',c:BPRESETS.tag.strap}]}}
function sync(){const g=id=>document.getElementById(id);S.w.forEach((w,i)=>{const a=g('cbn'+i);if(a){w.n=a.value;w.g=g('cbg'+i).value;w.st=g('cbs'+i).value;w.r=g('cbr'+i).value}});S.b.forEach((b,i)=>{const a=g('cbbn'+i);if(a){b.n=a.value;b.k=g('cbbk'+i).value;b.c=g('cbbc'+i).value}})}
function view(){
 let h='<h2>'+esc(t('cb.title',{n:S.name}))+'</h2><p class="mute" style="margin:0 0 6px">'+esc(t('cb.hint'))+'</p><div style="max-height:62vh;overflow:auto;padding-right:4px" class="stack">';
 if(S.mw){h+='<div class="px">'+esc(t('cb.rt'))+'</div>'+S.w.map((w,i)=>'<div class="row" style="gap:6px;flex-wrap:wrap;align-items:center"><input id="cbn'+i+'" class="field" style="flex:2;min-width:140px" maxlength="32" value="'+esc(w.n)+'" aria-label="'+esc(t('cb.name'))+'"><select id="cbg'+i+'" class="field" style="width:auto"><option value="m"'+(w.g==='m'?' selected':'')+'>'+esc(t('cb.m'))+'</option><option value="f"'+(w.g==='f'?' selected':'')+'>'+esc(t('cb.f'))+'</option></select><select id="cbs'+i+'" class="field" style="width:auto">'+STYLES.map(s=>'<option value="'+s+'"'+(w.st===s?' selected':'')+'>'+esc(t('style.'+s))+'</option>').join('')+'</select><select id="cbr'+i+'" class="field" style="width:auto">'+['face','heel','tweener'].map(r=>'<option value="'+r+'"'+(w.r===r?' selected':'')+'>'+esc(t('role.'+r))+'</option>').join('')+'</select><button class="btn sm" data-act="cbrn" data-i="'+i+'">🎲</button><button class="btn sm" data-act="cbdw" data-i="'+i+'">'+esc(t('cb.del'))+'</button></div>').join('')+(S.w.length<12?'<div><button class="btn sm" data-act="cbaw">'+esc(t('cb.addw'))+'</button></div>':'')}
 if(S.mb){h+='<div class="px" style="margin-top:8px">'+esc(t('cb.bt'))+'</div>'+S.b.map((b,i)=>'<div class="row" style="gap:6px;flex-wrap:wrap;align-items:center"><input id="cbbn'+i+'" class="field" style="flex:2;min-width:170px" maxlength="40" value="'+esc(b.n)+'" aria-label="'+esc(t('cb.bname'))+'"><select id="cbbk'+i+'" class="field" style="width:auto">'+KINDS.map(k=>'<option value="'+k+'"'+(b.k===k?' selected':'')+'>'+esc(t('cb.k.'+k))+'</option>').join('')+'</select><input id="cbbc'+i+'" type="color" value="'+esc(b.c)+'" aria-label="'+esc(t('cb.bcol'))+'" style="width:40px;height:32px;padding:0"><button class="btn sm" data-act="cbdb" data-i="'+i+'">'+esc(t('cb.del'))+'</button></div>').join('')+(S.b.length<10?'<div><button class="btn sm" data-act="cbab">'+esc(t('cb.addb'))+'</button></div>':'')}
 h+='</div>'+(S.msg?'<p style="color:var(--red,#c0392b);margin:6px 0"><b>'+esc(S.msg)+'</b></p>':'')+'<div class="row" style="justify-content:space-between;margin-top:10px"><button class="btn" data-act="cbback">'+esc(t('cb.back'))+'</button><button class="btn gold" data-act="cbgo">'+esc(t('cb.go'))+'</button></div>';
 return h}
const show=()=>{try{openModal(view())}catch(e){}};
Object.assign(ACT,{
 cbaw(){sync();S.w.push({n:rname(S.cc,false),g:'m',st:STYLES[Math.floor(Math.random()*7)],r:'face'});show()},
 cbdw(el){sync();S.w.splice(+el.dataset.i,1);show()},
 cbrn(el){sync();const w=S.w[+el.dataset.i];w.n=rname(S.cc,w.g==='f');show()},
 cbab(){sync();S.b.push({n:'New Championship',k:'heritage',c:BPRESETS.heritage.strap});show()},
 cbdb(el){sync();S.b.splice(+el.dataset.i,1);show()},
 cbback(){closeModal()},
 cbgo(){sync();if((S.mw&&S.w.filter(w=>w.n.trim()).length<2)||(S.mb&&S.b.filter(b=>b.n.trim()).length<1)){S.msg=t('cb.min');show();return}
  closeModal();newGame(null,{name:S.name,country:S.cc,roster:S.mw?S.w.filter(w=>w.n.trim()):null,belts:S.mb?S.b.filter(b=>b.n.trim()):null});render()}});
const _c=ACT.custom;
ACT.custom=function(){const g=id=>(document.getElementById(id)||{}).value;const mw=g('cbmw')==='own',mb=g('cbmb')==='own';
 if(!mw&&!mb)return _c.apply(this,arguments);
 init(g('ccountry')||'PL',mw,mb);show()};
const _vs=viewStart;viewStart=function(){let h=_vs.apply(this,arguments);try{if(typeof h==='string')h=h.replace('<button class="btn gold" data-act="custom">','<label class="px" for="cbmw">'+esc(t('cb.roster'))+'</label><select id="cbmw" class="field"><option value="auto">'+esc(t('cb.auto'))+'</option><option value="own">'+esc(t('cb.own'))+'</option></select><label class="px" for="cbmb">'+esc(t('cb.belts'))+'</label><select id="cbmb" class="field"><option value="auto">'+esc(t('cb.auto'))+'</option><option value="own">'+esc(t('cb.own'))+'</option></select><button class="btn gold" data-act="custom">')}catch(e){}return h};
function holders(){const used=new Set(),mine=G.ws.filter(w=>w.fed==='mine');
 G.titles.forEach(tt=>{tt.holders=[];const pool=mine.filter(w=>!used.has(w.id)&&((tt.g==='f')===(w.g==='f'))).sort((a,b)=>b.pop-a.pop);if(pool.length>=tt.teams){tt.holders=pool.slice(0,tt.teams).map(w=>w.id);tt.holders.forEach(i=>used.add(i))}})}
const _ng=newGame;newGame=function(fedId,custom){const r=_ng.apply(this,arguments);
 try{if(custom&&(custom.roster||custom.belts)){const cc=custom.country||'PL';
  if(custom.roster){G.ws=G.ws.filter(w=>!(w.fed==='mine'));const used=new Set(G.ws.map(w=>w.name));
   custom.roster.forEach((s,i)=>{let nm=s.n.trim().slice(0,32);while(used.has(nm))nm+=' II';used.add(nm);const fem=s.g==='f',st=STYLES.includes(s.st)?s.st:'technician',b=SBIAS[st];
    const w={id:'c'+i,name:nm,country:cc,style:st,role:['face','heel','tweener'].includes(s.r)?s.r:'face',ring:clamp(Math.round(34+b.ring+(Math.random()-.5)*12),20,60),mic:30+Math.floor(Math.random()*20),cha:32+Math.floor(Math.random()*20),pop:6+Math.floor(Math.random()*8),age:22+Math.floor(Math.random()*12),fed:'mine',contract:52,injury:0,look:randLook(Math.random,cc,fem),acc:0};
    if(fem)w.g='f';genStats(w,Math.random);w.salary=salaryOf(w,1);G.ws.push(w)});
   G.stables=[];try{seedStables()}catch(e){}}
  if(custom.belts){G.titles=custom.belts.map((b,i)=>{const bp=BPRESETS[b.k]||BPRESETS.classic,tt={id:'T'+(G.uid++),kind:'custom',name:b.n.trim().slice(0,40),prestige:i===0?3:2,pdyn:i===0?3:2,pv:2,teams:bp.teams||1,g:bp.g||'m',holders:[],since:1,custom:true};BELTKEYS.forEach(k=>{tt[k]=bp[k]});if(/^#[0-9a-f]{6}$/i.test(b.c))tt.strap=b.c;tt.plate=i===0?'silver':bp.plate;return tt})}
  holders();save()}}catch(e){}
 return r};
})();
if(typeof normTexts==="function")normTexts();
