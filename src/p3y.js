/* ============ Real champions seeded into gameplay + continents ============ */
const CHAMPS={
kpw:[['world',null,['Filip Fuks']],['second','KPW Oldtown Championship',['Leon Lato']]],
flw:[['world','Freelance World Championship',['Trevor Outlaw']],['tag','Freelance Tag Team Championship',['Davey Bangg','August Mathews']],['second','Freelance Legacy Championship',['Chico Suavé']]],
nst:[['world','PCW Heavyweight Championship',['RP Davis']],['second','PCW Cruiserweight Championship',['Jack Jonson']],['tag','PCW Tag Team Championship',['Rampage Braun','Tyson T-Bonne']],['wworld','PCW Women\'s Championship',['Commander Stefanie Sterlin']]],
rpc:[['world','WrestlingKULT Championship',['Mike Schwarz']],['tag','WrestlingKULT Tag Team Championship',['Don Shin','Kevin Kaydan']],['wworld','WrestlingKULT Women\'s Championship',['Amalé']]],
tfc:[['world','Crash Heavyweight Championship',['D-Luxe']],['second','Crash Cruiserweight Championship',['Anubiss']],['tag','Crash Tag Team Championship',['El Texano Junior','Super Novva']],['x','Crash Junior Championship',['Zonic']],['wworld','Crash Women\'s Championship',['Lady Shadoww']]],
tir:[['world','Superkick-D Championship',['Dallas Kyle']],['second','Superkick-D 420 Championship',['Dior Nolinz']],['tag','Kings of the 6IX Tag Team Championship',['Psycho Mikee','Duragg']]],
nfw:[['world','NFW Heavyweight Championship',['Dmitri Orlovsky']],['second','NFW Moscow Championship',['Aleksei Prisiazhny']],['x','NFW Lightweight World Championship',['Artem Vlasik']],['x','NFW Extreme Championship',['Akamir Bojkin']],['tag','NFW Tag Team Championship',['Digital Mesiah','Ronnie Carmine']],['wworld','NFW Women\'s Championship',['Alisa Ostrovska']]],
uwa:[['world','UWA World Championship',['Adam Hart']],['second','UWA Extreme Championship',['Ranger Leon']],['tag','UWA Tag Team Championship',['Miller Volodymyr','Zlovisniy Voron']]],
fcf:[['world','FCS Finnish Heavyweight Championship',['Septimus Rex']],['second','FCS Nordic Championship',['Jake Luupaa']],['tag','FCS Tag Team Championship',['Koobra Kovanen','Raivo Romppanen']]],
sth:[['world','STW Championship',['Emil fran Holo']],['second','STW Swedish Heavyweight Championship',['Captain TooT TooT']],['x','STW Glam Championship',['Youngblood Glam']]],
nwf:[['world','NWB Norwegian Championship',['Espen Olsson']],['second','NWB West Coast Championship',['Fredrik Den Store']],['x','NWB European Heavyweight Championship',['Jonny Stormen']],['tag','NWB Tag Team Championship',['Aron Frosten','Erik Isaksson']]],
dpw:[['world','DWP World Championship',['Nitro Greenfield']],['second','DWP Heavyweight Championship',['Robert Starr']],['x','DWP Light Heavyweight Championship',['El Tesoro Nego']],['tag','DWP Tag Team Championship',['Christian Colombus','Nicolai Wachman']]],
pwh:[['world','PWN Heavyweight Championship',['Lorenzo Linna']],['second','PWN Television Championship',['TANK Dutch']],['tag','PWN Tag Team Championship',['Axl Starr','Scotty Valentin']],['wworld','PWN Women\'s Championship',['Julia Stone']]],
pwb:[['world','PWB European Allstar Championship',['Noe Ahuka Jr']],['second','PWB DareDevil Championship',['O. Nathaniel']],['tag','PWB Tag Team Championship',['Rami Romero','Joel Vauxe']],['wworld','PWB Queen of Diamonds Championship',['Calypsa']]],
ewa:[['world','EWL World Heavyweight Championship',['Kris Rabber']],['second','EWL Intercontinental Championship',['Iestin Rees']],['x','EWL European Championship',['Martin Payne']],['x','EWL Austrian National Championship',['Rage Sniper']],['tag','EWL Tag Team Championship',['Barbarossa Wrath','Curtis Blaque']],['wworld','EWL Women\'s Championship',['Mila Smitt']]],
hcw:[['world','HUN Championship',['Icarus Hun']],['second','HUN Revolution Championship',['Kris Jokich']],['x','HUN Passion Championship',['Sentinell']],['tag','HUN Tag Team Championship',['Mylan Boros','Zafar Amen Hun']]],
cwf:[['world','HWF Heavyweight Championship',['Frozen Flame']],['tag','HWF Tag Team Championship',['Krampus Bal','Iron Benn']],['wworld','HWF Balkan Women\'s Championship',['Wesna Busich']]],
zmk:[['world','ZMK Championship',['Leonidas Tombolis']],['second','ZMK International Championship',['Markellos Komninos']],['x','ZMK Cyprus Championship',['Ninja Cyprus']],['tag','ZMK Tag Team Championship',['Mr. Perris','Gedeon Tax']]],
bwe:[['world','BWV Heavyweight Championship',['Sexy Kev']],['second','BWV National Championship',['Asen Bg']],['tag','BWV Tag Team Championship',['Nsereko Lion','Sebb Strife']]],
tpw:[['world','TPW Heavyweight Championship',['Murat Bosphorus']],['second','TPW Intercontinental Championship',['Ozgur Bakir']]],
saw:[['world','SAW Heavyweight Championship',['Johnny Palazzo']],['second','SAW Cruiserweight Championship',['Romeo Valentino Jr']]],
qpw:[['world','QPW Championship',['Mustafa Alley']],['second','QPW Middle East Championship',['Matt Cardone']],['x','QPW King of Ladders Championship',['Shaheen Gold']],['x','QPW Qatar Championship',['Classy Alley']],['tag','QPW Tag Team Championship',['Anas Rexx','Sam Ex']]],
sgw:[['world','LCW Singapore Championship',['Carlo Cannan']],['x','LCW Hardcore Championship',['Mason Dollar']],['tag','LCW Southeast Asian Tag Team Championship',['The Statement Sg','Emman Azmin']],['wworld','LCW Queen of Asia Championship',['Miss Selene']]],
mkw:[['world','MEW World Championship',['Ho Ho Lan']],['tag','MEW Tag Team Championship',['Benji Chen','Sunny Zed']]],
ind:[['world','WSI Indian Championship',['Baliyan Akki']],['second','WSI Intercontinental Championship',['Deepak Rana']],['tag','WSI Tag Team Championship',['Rudra Singh','Shera Khan']]],
ctw:[['world','CTW World Heavyweight Championship',['Lencastro']],['second','CTW European Championship',['Red Eagle Pt']]],
fal:[['world','FAL Championship',['Alan Strongh']]]
};
const champPri=w=>{const id=G&&G.fed&&G.fed.id,c=CHAMPS[id];if(c)return c.some(x=>x[2].indexOf(w.name)>=0)?1:0;const b=typeof BIGCH!=='undefined'&&BIGCH[id];return b&&Object.keys(b).some(k=>b[k].indexOf(w.name)>=0)?1:0};
const XSTRAP=['#6a3aa8','#b26a1a','#13a89e','#e8782a','#1f3f8a'];
function champSeed(){
 G.rivals.forEach(r=>{const sp=CHAMPS[r.id];if(!sp&&!(typeof BIGCH!=='undefined'&&BIGCH[r.id]))return;const wd=sp&&sp.find(x=>x[0]==='world');const w=wd&&G.ws.find(z=>z.fed===r.id&&z.name===wd[2][0]);if(w)r.champ=w.id;else if(!sp&&typeof BIGCH!=='undefined'&&BIGCH[r.id]){const k0=Object.keys(BIGCH[r.id])[0],w2=G.ws.find(z=>z.fed===r.id&&z.name===BIGCH[r.id][k0][0]);if(w2)r.champ=w2.id}});
 const sp=CHAMPS[G.fed.id];if(!sp||FEDTITLES[G.fed.id])return;
 const wp=Math.min(5,G.fed.tier+1),used=new Set(),seeded=new Set(),M={w:'w',s:'s',tg:'tg'},KID={world:'w',second:'s',tag:'tg',wworld:'ww',wtag:'wt'};let xi=0;
 const idOf=nm=>{const w=mine().find(z=>z.name===nm);return w?w.id:null};
 sp.forEach(([k,name,names])=>{const ids=names.map(idOf);if(ids.some(i=>!i))return;
  let tt=k==='x'?null:G.titles.find(x=>x.id===KID[k]);
  if(k==='x'){tt={id:'x'+(++xi),g:'m',kind:'second',name:null,prestige:Math.max(1,wp-2),teams:1,strap:XSTRAP[xi%XSTRAP.length],plate:'silver',holders:[],since:1};G.titles.push(tt)}
  if(!tt||tt.teams!==ids.length)return;
  tt.holders=ids;if(name)tt.name=name;ids.forEach(i=>used.add(i));seeded.add(tt.id)});
 G.titles.forEach(tt=>{if(seeded.has(tt.id)||!tt.holders.some(i=>used.has(i)))return;
  const pool=mine().filter(w=>!used.has(w.id)&&(tt.g==='f')===(w.g==='f')&&!w.injury).sort((a,b)=>b.pop-a.pop);
  tt.holders=pool.slice(0,tt.teams).map(w=>w.id);tt.holders.forEach(i=>used.add(i))});
 // rivalries and alliances from the champions
 try{const hw=(G.titles.find(x=>x.id==='w')||{}).holders||[],hs=(G.titles.find(x=>x.id==='s')||{}).holders||[];
  if(hw[0]&&hs[0])relLink(W(hw[0]),W(hs[0]),'rv');
  G.titles.forEach(tt=>{if(tt.teams===2&&tt.holders.length===2)relLink(W(tt.holders[0]),W(tt.holders[1]),'al')})}catch(e){}
}
/* continents */
const CONTS=['na','la','eu','as','oc','af'];
const contOf=cc=>REGION[cc]||'x';
Object.assign(D,{'ct.na':['Ameryka Północna','North America'],'ct.la':['Ameryka Południowa i Środkowa','Latin America'],'ct.eu':['Europa','Europe'],'ct.as':['Azja i Bliski Wschód','Asia & Middle East'],'ct.oc':['Oceania','Oceania'],'ct.af':['Afryka','Africa'],'ct.x':['Inne','Other'],'ui.continent':['Kontynent','Continent'],'ui.sCt':['Kontynent','Continent']});
