;/* belts of the big promotions: original names + custom looks */
(function(){
const N={
gwf:['Imperial Undisputed Championship','Empire Heavyweight Championship','Continental Cross Championship','Liberty Eagle Championship','Crimson Tag Team Championship','Azure Tag Team Championship','Rising Star Championship','Anytime Anywhere Championship','Empress World Championship','Empress Championship','Continental Pearl Championship','Empress Tag Team Championship'],
apw:['Elevated World Championship','Globe-Trotter Championship','Primetime Championship','Purist Championship','Elevated Tag Team Championship','Triple Threat Trios Championship',"Women's Elevated Championship","Women's Primetime Championship","Women's Elevated Tag Team Championship"],
cwe:['Nonstop Heavyweight Championship','Velocity Championship','Nonstop Tag Team Championship','Stream Championship','Vixen World Championship','Vixen Tag Team Championship'],
nnp:['Nippon Heavyweight Championship','Pacific Rim Championship','Free Spirit Championship','Super Junior Championship','Nippon Tag Team Championship','Six-Man Gauntlet Championship'],
roh:['Glory World Championship','Glory Television Championship','Honor Pure Championship','Glory Tag Team Championship','Glory Six-Man Championship',"Glory Women's Championship"],
nwc:['Coalition Heavyweight Championship','Coalition Television Championship','Coalition Tag Team Championship',"Coalition Women's Championship"],
mlw:['Major World Heavyweight Championship','Major Openweight Championship','Major Middleweight Championship','Major Tag Team Championship',"Major Women's Featherweight Championship"],
gcw:['Breaker World Championship','Bloodbath Championship','Breaker Tag Team Championship',"Breaker Women's Championship"],
rsp:['Grand Triple Crown Championship','Junior Crown Championship','All-Nippon Tag Team Championship','Satellite Television Championship',"ANPW Women's Championship"],
ark:['Arc Heavyweight Championship','Arc Tag Team Championship','Arc Junior Heavyweight Championship','Arc Openweight Championship'],
str:['World of Starlight Championship','Wonder of Starlight Championship','Divas Tag Team Championship','Quicksilver Championship','Artist of Starlight Championship'],
dtt:['Cosmic Championship','Ironclad Heavymetalweight Championship','KD Tag Team Championship','Free-For-All Openweight Championship','DTT Extreme Championship','KD 6-Man Tag Team Championship'],
drg:['Open the Portal Gate Championship','Valor Gate Championship','Twin Portal Championship','Triangle Portal Championship'],
lfl:['Giga Championship','Latin Continental Championship','Triple Alianza Trios Championship','Alianza Tag Team Championship',"Alianza Women's Championship"],
rvp:['Revolt Heavyweight Championship','Revolt Cruiserweight Championship','Revolt Tag Team Championship',"Revolt Women's Championship"],
pgr:['Progressive World Championship','Titan Championship','Progressive Tag Team Championship',"Progressive Women's World Championship"],
wxx:['Unity World Championship','Scattergun Championship','Westend Tag Team Championship',"Westend Women's Championship"],
cul:['Consejo Heavyweight Championship','Consejo Welterweight Championship','Consejo Trios Championship','Consejo Tag Team Championship',"Consejo Women's World Championship"]};
// hand-made looks for the flagship belts
const H={
'Imperial Undisputed Championship':{strap:'#111111',strap2:'#d4af37',pat:'diamond',plate:'gold',mainShape:'star',mainEmb:'crown',flag:'us',sideN:4,sideShape:'hex',sideEmb:'gem'},
'Empire Heavyweight Championship':{strap:'#8a1c1c',strap2:'#f2c94c',pat:'dual',plate:'gold',mainShape:'shield',mainEmb:'letter',flag:'us',sideN:3,sideShape:'shield',sideEmb:'star'},
'Continental Cross Championship':{strap:'#1f3f8a',strap2:'#e8e6df',pat:'stripe',plate:'silver',mainShape:'round',mainEmb:'flag',flag:'eu',sideN:2,sideShape:'round',sideEmb:'flag'},
'Liberty Eagle Championship':{strap:'#2a3f7a',strap2:'#d4213d',pat:'stitch',plate:'bronze',mainShape:'octagon',mainEmb:'star',flag:'us',sideN:2,sideShape:'rect',sideEmb:'star'},
'Anytime Anywhere Championship':{strap:'#2a2a2a',strap2:'#f2c94c',pat:'barbed',plate:'rust',mainShape:'octagon',mainEmb:'bolt',sideN:1,sideShape:'diamond',sideEmb:'none',worn:true},
'Elevated World Championship':{strap:'#111111',strap2:'#e8e6df',pat:'zigzag',plate:'silver',mainShape:'hex',mainEmb:'bolt',flag:'us',sideN:3,sideShape:'hex',sideEmb:'star'},
'Primetime Championship':{strap:'#e8782a',strap2:'#111111',pat:'checker',plate:'bronze',mainShape:'diamond',mainEmb:'bolt',sideN:2,sideShape:'diamond',sideEmb:'none'},
'Nonstop Heavyweight Championship':{strap:'#1f3f8a',strap2:'#d4af37',pat:'wave',plate:'gold',mainShape:'oval',mainEmb:'star',flag:'us',sideN:2,sideShape:'rect',sideEmb:'gem'},
'Nippon Heavyweight Championship':{strap:'#8a1c1c',strap2:'#f2c94c',pat:'stitch',plate:'gold',mainShape:'octagon',mainEmb:'crown',flag:'jp',sideN:4,sideShape:'rect',sideEmb:'flag'},
'Grand Triple Crown Championship':{strap:'#5a1020',strap2:'#f2c94c',pat:'dual',plate:'gold',mainShape:'shield',mainEmb:'crown',flag:'jp',sideN:3,sideShape:'shield',sideEmb:'gem'},
'World of Starlight Championship':{strap:'#c4358a',strap2:'#f5f5f5',pat:'dots',plate:'rose',mainShape:'star',mainEmb:'star',flag:'jp',sideN:3,sideShape:'round',sideEmb:'gem'},
'Open the Portal Gate Championship':{strap:'#6a3aa8',strap2:'#13a89e',pat:'diamond',plate:'emerald',mainShape:'hex',mainEmb:'bolt',flag:'jp',sideN:2,sideShape:'hex',sideEmb:'star'},
'Cosmic Championship':{strap:'#14213d',strap2:'#e8b53c',pat:'dots',plate:'blue',mainShape:'round',mainEmb:'star',flag:'jp',sideN:2,sideShape:'round',sideEmb:'star'},
'Giga Championship':{strap:'#e8b53c',strap2:'#1d6b4f',pat:'zigzag',plate:'gold',mainShape:'shield',mainEmb:'skull',flag:'mx',sideN:3,sideShape:'diamond',sideEmb:'mix'}};
const CF={US:'us',JP:'jp',MX:'mx',GB:'gb',DE:'de',BR:'br',CA:'ca'};
const PATS=['stripe','dual','checker','zigzag','diamond','dots','wave','stitch'],SH=['shield','oval','hex','octagon','round','diamond'],EM=['crown','star','letter','bolt','flag','skull'],SS=['rect','round','diamond','hex','shield'];
const hs=s=>{let h=7;for(let i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))>>>0;return h};
let LOOK=null;
function renameAll(){
 if(typeof FEDTITLES==='undefined')return;
 Object.keys(N).forEach(f=>{const spec=FEDTITLES[f];if(!spec||spec.length!==N[f].length||spec[0][0]===N[f][0])return;
  const bc=(typeof BIGCH!=='undefined'&&BIGCH[f])||null,nb={};
  spec.forEach((s,i)=>{const old=s[0];if(bc&&bc[old])nb[N[f][i]]=bc[old];s[0]=N[f][i]});
  if(bc){Object.keys(bc).forEach(k=>delete bc[k]);Object.assign(bc,nb)}})}
function build(){
 LOOK={};
 Object.keys(N).forEach(f=>{const spec=FEDTITLES[f];if(!spec)return;const fd=(PACK&&PACK.feds||[]).find(x=>x.id===f)||{};
  spec.forEach(s=>{const nm=s[0];if(H[nm]){LOOK[nm]=H[nm];return}
   const h=hs(f+nm),base=s[5]||fd.color||'#8a1c1c',woman=s[3]==='f',tag=s[2]>1,pr=s[1];
   const L={strap:base,strap2:woman?'#ffffff':(pr>=4?'#f2c94c':'#e8e6df'),pat:PATS[h%PATS.length],plate:woman?'rose':pr>=4?'gold':pr>=3?'silver':'bronze',
    mainShape:woman?['round','diamond','star'][h%3]:SH[(h>>3)%SH.length],mainEmb:woman?'star':EM[(h>>5)%EM.length],flag:CF[fd.country]||'eu',sideN:tag?1:1+(h>>7)%3,sideShape:SS[(h>>9)%SS.length],sideEmb:['gem','star','flag','mix'][(h>>11)%4],worn:s[4]==='hardcore'};
   if(tag){L.mainEmb='none';L.mainShape=['shield','rect'.length?'round':'round','hex'][h%3]}
   LOOK[nm]=L})})}
renameAll();
if(typeof bigTitleSeed==='function'){const _b=bigTitleSeed;bigTitleSeed=function(){_b.apply(this,arguments);try{if(!LOOK)build();G.titles.forEach(tt=>{const L=LOOK[tt.name];if(L)Object.assign(tt,L)})}catch(e){}}}
})();
if(typeof normTexts==="function")normTexts();
