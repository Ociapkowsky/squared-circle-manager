// ---- dynamic title prestige (1..5) and large-federation title sets ----
function prestOf(tt){return clamp(tt.pdyn==null?(tt.prestige||1):tt.pdyn,1,5)}
function pr1(tt){return prestOf(tt).toFixed(1)}
function prTrend(tt){const d=tt.ptr||0;const b=tt.prestige||1;const base=' <span class="mute" style="font-size:12px">('+t('t.pbase')+' '+(+b).toFixed(1)+')</span>';return (d>.004?' <span style="color:var(--teal)">▲</span>':d<-.004?' <span style="color:var(--red)">▼</span>':'')+base}
function titleWeekly(){
 G.titles.forEach(tt=>{
  const base=tt.prestige||1,old=prestOf(tt);let p=old;
  if(!tt.holders.length)p-=.07;
  else{const hs=tt.holders.map(W).filter(Boolean);if(hs.length){const h=avg(hs.map(w=>w.pop)),exp=10+base*11;p+=clamp((h-exp)/400,-.05,.05);
    if(hs.some(w=>w.injury))p-=.015;
    if((G.week-(tt.since||1))>20&&(tt.def||0)>=3)p+=.02;
    if((G.week-(tt.since||1))>60&&!(tt.def>=2))p-=.03}}
  p+=(base-p)*.015;
  p=clamp(p,Math.max(1,base-1.5),Math.min(5,base+1.5));
  tt.pdyn=p;tt.ptr=p-old})}
function migrateTitles(){(G.titles||[]).forEach(tt=>{if(!tt.pv){tt.pv=2;tt.prestige=[2,3.5,5][clamp(Math.round(tt.prestige||2),1,3)-1];tt.pdyn=tt.prestige}else if(tt.pdyn==null)tt.pdyn=tt.prestige})}
// [name, base prestige, teams(1-3), gender, belt preset, strap colour]
const FEDTITLES={
gwf:[['Undisputed World Championship',5,1,'m','classic','#8a1c1c'],['World Heavyweight Championship',5,1,'m','classic','#1f3f8a'],['Intercontinental Championship',4,1,'m','euro'],['United States Championship',3,1,'m','heritage'],['Raw Tag Team Championship',3,2,'m','tag','#8a1c1c'],['SmackDown Tag Team Championship',3,2,'m','tag','#1f3f8a'],['Developmental Championship',2,1,'m','ultra'],['24/7 Championship',1,1,'m','hardcore'],['Women\'s World Championship',4,1,'f','women','#c4358a'],['Women\'s Championship',4,1,'f','women','#6a3aa8'],['Women\'s Intercontinental Championship',3,1,'f','women','#13a89e'],['Women\'s Tag Team Championship',3,2,'f','tag','#c4358a']],
apw:[['World Championship',5,1,'m','classic','#1a1a1a'],['International Championship',4,1,'m','euro','#13a89e'],['TNT Championship',3,1,'m','ultra','#e8782a'],['Pure Rules Championship',3,1,'m','heritage'],['World Tag Team Championship',4,2,'m','tag','#1a1a1a'],['World Trios Championship',3,3,'m','tag','#6a3aa8'],['Women\'s World Championship',4,1,'f','women','#c4358a'],['Women\'s Television Championship',3,1,'f','women','#13a89e'],['Women\'s Tag Team Championship',3,2,'f','tag','#c4358a']],
cwe:[['Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['X-Division Championship',3,1,'m','ultra','#e8b53c'],['Tag Team Championship',3,2,'m','tag'],['Digital Media Championship',2,1,'m','hardcore'],['Knockouts World Championship',4,1,'f','women'],['Knockouts Tag Team Championship',2,2,'f','tag','#c4358a']],
nnp:[['World Heavyweight Championship',5,1,'m','classic','#8a1c1c'],['Intercontinental Championship',4,1,'m','euro','#e8e6df'],['Openweight Championship',3,1,'m','heritage'],['Junior Heavyweight Championship',3,1,'m','ultra'],['Tag Team Championship',4,2,'m','tag','#1f3f8a'],['Six-Man Tag Championship',2,3,'m','tag','#b26a1a']],
roh:[['World Championship',4,1,'m','classic','#1a1a1a'],['Television Championship',3,1,'m','heritage'],['Pure Championship',3,1,'m','euro','#e8e6df'],['Tag Team Championship',3,2,'m','tag'],['Six-Man Tag Championship',2,3,'m','tag','#b26a1a'],['Women\'s World Championship',3,1,'f','women']],
nwc:[['National Heavyweight Championship',4,1,'m','classic','#8a1c1c'],['Television Championship',3,1,'m','heritage'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
mlw:[['World Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['National Openweight Championship',3,1,'m','heritage'],['World Middleweight Championship',3,1,'m','ultra'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Featherweight Championship',3,1,'f','women']],
gcw:[['World Championship',4,1,'m','classic','#1a1a1a'],['Ultraviolent Championship',2,1,'m','hardcore'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
rsp:[['Triple Crown Heavyweight Championship',4,1,'m','classic','#8a1c1c'],['Junior Heavyweight Championship',3,1,'m','ultra'],['World Tag Team Championship',4,2,'m','tag'],['Gaora Television Championship',2,1,'m','heritage'],['Women\'s Championship',3,1,'f','women']],
ark:[['Global Championship',4,1,'m','classic','#1f3f8a'],['Global Tag Team Championship',3,2,'m','tag'],['Junior Heavyweight Championship',3,1,'m','ultra'],['Openweight Championship',2,1,'m','heritage']],
str:[['World of Starburst Championship',4,1,'f','women','#c4358a'],['Wonder of Starburst Championship',3,1,'f','women','#13a89e'],['Goddesses Tag Team Championship',3,2,'f','tag','#c4358a'],['High Speed Championship',2,1,'f','women','#e8b53c'],['Artist of Starburst Championship',2,3,'f','tag','#6a3aa8']],
dtt:[['Universal Championship',4,1,'m','classic','#1d6b4f'],['Ironman Heavymetalweight Championship',1,1,'m','hardcore'],['KO-D Tag Team Championship',3,2,'m','tag'],['Openweight Championship',3,1,'m','heritage'],['Extreme Championship',2,1,'m','hardcore'],['KO-D 6-Man Tag Team Championship',2,3,'m','tag']],
drg:[['Open the Dream Gate Championship',4,1,'m','classic','#6a3aa8'],['Brave Gate Championship',3,1,'m','ultra'],['Twin Gate Championship',3,2,'m','tag'],['Triangle Gate Championship',3,3,'m','tag','#13a89e']],
lfl:[['Mega Championship',4,1,'m','classic','#e8b53c'],['Latin American Championship',3,1,'m','euro'],['Trios Championship',3,3,'m','tag','#1d6b4f'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
rvp:[['Heavyweight Championship',4,1,'m','classic','#1f3f8a'],['British Cruiserweight Championship',3,1,'m','ultra'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
pgr:[['World Championship',4,1,'m','classic','#1a1a1a'],['Atlas Championship',3,1,'m','heritage','#6b4423'],['Tag Team Championship',3,2,'m','tag'],['Women\'s World Championship',3,1,'f','women']],
wxx:[['Unified World Wrestling Championship',4,1,'m','classic','#8a1c1c'],['Shotgun Championship',3,1,'m','heritage'],['Tag Team Championship',3,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
nlw:[['Heavyweight Championship',3,1,'m','classic','#8a1c1c'],['Maple Leaf Championship',3,1,'m','euro'],['Tag Team Championship',2,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
spw:[['Brazil Heavyweight Championship',3,1,'m','classic','#1d6b4f'],['Carnival Championship',3,1,'m','ultra','#e8b53c'],['Tag Team Championship',2,2,'m','tag'],['Women\'s Championship',3,1,'f','women']],
cul:[['World Heavyweight Championship',4,1,'m','classic','#1d6b4f'],['Welterweight Championship',3,1,'m','ultra'],['Trios Championship',3,3,'m','tag','#e8782a'],['Tag Team Championship',3,2,'m','tag'],['Women\'s World Championship',3,1,'f','women']]
};
function bigTitleSeed(){
 const spec=FEDTITLES[G.fed.id];if(!spec)return;
 const used=new Set(),pool={m:mine().filter(w=>w.g!=='f').sort((a,b)=>b.pop-a.pop),f:mine().filter(w=>w.g==='f').sort((a,b)=>b.pop-a.pop)};
 const pre=(typeof BIGCH!=='undefined'&&BIGCH[G.fed.id])||{},preH={};
 spec.forEach(s=>{const nm=pre[s[0]];if(!nm||nm.length!==s[2])return;const ids=nm.map(n=>{const w=mine().find(z=>z.name===n);return w&&!used.has(w.id)?w.id:null});if(ids.every(Boolean)&&new Set(ids).size===ids.length){preH[s[0]]=ids;ids.forEach(i=>used.add(i))}});
 G.titles=spec.map((s,i)=>{const bp=BPRESETS[s[4]]||BPRESETS.classic,tt={id:'T'+(G.uid++),kind:'custom',name:s[0],prestige:s[1],pdyn:s[1],pv:2,teams:s[2],g:s[3],holders:[],since:1,custom:true};
  BELTKEYS.forEach(k=>{tt[k]=bp[k]});if(s[5])tt.strap=s[5];tt.plate=s[1]>=4?'gold':s[1]>=3?'silver':bp.plate;
  if(preH[s[0]])tt.holders=preH[s[0]].slice();
  else{const p=pool[s[3]].filter(w=>!used.has(w.id));if(p.length>=s[2]){tt.holders=p.slice(0,s[2]).map(w=>w.id);tt.holders.forEach(id=>used.add(id))}}
  return tt})}
Object.assign(D,{'t.pbase':['bazowy','base']});
