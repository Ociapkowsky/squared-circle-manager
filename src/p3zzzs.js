/* ===== Two-step match type picker: family first, then size ===== */
const MFAM=['single','tag','team','handicap','multi','multiteam'];
const MFDEF={single:'1v1',tag:'2v2',team:'3v3',handicap:'1v2',multi:'3way',multiteam:'2v2v2'};
function mfamOf(k){const n=MODES[k];if(!n)return 'single';if(n.ffa)return (n.g||1)>1?'multiteam':'multi';if(n.a===n.b)return n.a===1?'single':n.a===2?'tag':'team';return 'handicap'}
function mfSizeLabel(k,fam){const n=MODES[k];
 if(fam==='team')return t('mode.same',{a:n.a});
 if(fam==='handicap')return t('mode.hs',{a:n.a,b:n.b});
 if(fam==='multi')return t('mode.mp',{n:n.a})+(n.a===3?' · Triple Threat':n.a===4?' · Fatal 4-Way':'');
 return modeLabel(k)}
function modeSel(m,i){
 const fam=mfamOf(m.mode),ks=Object.keys(MODES);
 let h='<div><div class="px">'+t('sh.mode')+'</div><select data-chg="mfam" data-i="'+i+'">'+MFAM.map(f=>'<option value="'+f+'"'+(fam===f?' selected':'')+'>'+t('mf.'+f)+'</option>').join('')+'</select></div>';
 if(fam==='team'||fam==='handicap'||fam==='multi'||fam==='multiteam'){
  const list=ks.filter(k=>mfamOf(k)===fam),o=k=>'<option value="'+k+'"'+(m.mode===k?' selected':'')+'>'+esc(mfSizeLabel(k,fam))+'</option>';
  let body;
  if(fam==='handicap'){body='';for(let a=1;a<=9;a++){const g=list.filter(k=>MODES[k].a===a);if(g.length)body+='<optgroup label="'+esc(t('mode.g.n',{n:a}))+'">'+g.map(o).join('')+'</optgroup>'}}
  else body=list.map(o).join('');
  h+='<div><div class="px">'+t('mf.size')+'</div><select data-chg="mode" data-i="'+i+'">'+body+'</select></div>'}
 return h}
Object.assign(D,{'mf.single':['Pojedynek','Singles'],'mf.tag':['Tag team 2 na 2','Tag team 2v2'],'mf.team':['Drużynowa 3+','Team 3+'],'mf.handicap':['Handicap','Handicap'],'mf.multi':['Każdy na każdego','Free-for-all'],'mf.multiteam':['Wiele drużyn','Multi-team'],'mf.size':['Ilu na ilu','Size'],
 'mode.hs':['{a} na {b}','{a} vs {b}'],'mode.mp':['{n} osób','{n} people']});
