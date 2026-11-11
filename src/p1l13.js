// ---- Real-world-based champions for the big federations (names as altered in-game) ----
const BIGCH={
gwf:{'Undisputed World Championship':['Sammy Zane'],'World Heavyweight Championship':['Roman Rains'],'Intercontinental Championship':['Ethan Paige'],'United States Championship':['Trick Williams'],'Raw Tag Team Championship':['Bron Breaker','Austin Theory'],'SmackDown Tag Team Championship':['Tama Tonga Jr','Talla Tongo'],'Developmental Championship':['Grayson Waler'],'Women\'s Championship':['Chelsea Greene'],'Women\'s World Championship':['Liv Morgen'],'Women\'s Intercontinental Championship':['Raquel Rodriguez'],'Women\'s Tag Team Championship':['Mia Yimm','Bea Fabb']},
apw:{'World Championship':['Will Osprey'],'International Championship':['Kazuchika Okata'],'TNT Championship':['Darby Allen'],'Pure Rules Championship':['Jon Moxlee'],'World Tag Team Championship':['Matt Jacksen','Nick Jacksen'],'World Trios Championship':['Hangman Paige','Brody Kingg','Bandidoh'],'Women\'s World Championship':['Mercedes Mon'],'Women\'s Television Championship':['Queen Aminato'],'Women\'s Tag Team Championship':['Jamie Hayder','Alex Windsore']},
cwe:{'Heavyweight Championship':['Leon Slayter'],'X-Division Championship':['Amazing Red'],'Tag Team Championship':['Nic Nemith','Ryan Nemith'],'Knockouts World Championship':['Xia Brookeside'],'Knockouts Tag Team Championship':['Allie Kay','Kiera Hogann']},
nnp:{'World Heavyweight Championship':['Yota Tsuji'],'Intercontinental Championship':['Gabe Kid'],'Openweight Championship':['Aaron Wolfe'],'Junior Heavyweight Championship':['YOH'],'Tag Team Championship':['Oskarr','Yuto-Ise']},
roh:{'World Championship':['Bandido Jr'],'Television Championship':['Action Andretty'],'Pure Championship':['Lee Moriarti'],'Tag Team Championship':['Místico X','Mascara Dorado'],'Six-Man Tag Championship':['Jay Lethel','Blake Christien','Lee Johnsen']},
cul:{'World Heavyweight Championship':['Hechicero Jr'],'Welterweight Championship':['Titan'],'Trios Championship':['Mistiko','Mascara Doradah Jr','Neonn'],'Tag Team Championship':['Angel de Oroh','Niebla Rojah']},
nwc:{'National Heavyweight Championship':['Thrillbilly Silas Mason'],'Television Championship':['Alex Mizery'],'Tag Team Championship':['AJ Cazano','KC Cazano']},
mlw:{'World Heavyweight Championship':['Killer Kross'],'National Openweight Championship':['Austin Aries']},
gcw:{'World Championship':['Joe Sawyar'],'Tag Team Championship':['KJ Orsso','Sam Stackhause']},
rsp:{'Triple Crown Heavyweight Championship':['Kento Miyahira'],'Junior Heavyweight Championship':['Dan Tamora'],'World Tag Team Championship':['Jun Saitoh','Rei Saitoh']},
ark:{'Global Championship':['Tetsuya Naido Jr'],'Global Tag Team Championship':['Manabu Soyah','Yuki Iyno'],'Junior Heavyweight Championship':['Kai Fujimora']},
dtt:{'Universal Championship':['Ryusuke Taguchii'],'Ironman Heavymetalweight Championship':['Kazuki Hirato'],'KO-D Tag Team Championship':['Takeshi Masado','Yuya Korocku'],'Openweight Championship':['Maoh'],'Extreme Championship':['Shunma Katsumatta'],'KO-D 6-Man Tag Team Championship':['Daisuke Sasakii','Hideki Okatanii','Ilusionn']},
drg:{'Open the Dream Gate Championship':['Yoshiki Katoh'],'Brave Gate Championship':['Homaree'],'Triangle Gate Championship':['El Ciello','Kota Minoura','Yuki Yoshioka']},
pgr:{'World Championship':['Cara Noire'],'Atlas Championship':['Tommy Tannar'],'Tag Team Championship':['Connor Mylls','Nico Angelow'],'Women\'s World Championship':['Rhioo']},
str:{'World of Starburst Championship':['Suzu Suzuky'],'Wonder of Starburst Championship':['Hannan'],'Goddesses Tag Team Championship':['Azem','Miyu Amasaky'],'High Speed Championship':['Yuna Mizumory'],'Artist of Starburst Championship':['Thekkla','Julie Harte','Skye Bluu']},
lfl:{'Mega Championship':['El Grande Americano'],'Trios Championship':['Dagga','Angel Jr','Berto Jr'],'Latin American Championship':['La Parca'],'Tag Team Championship':['Hijo del Dr. Wagner','Galena']},
rvp:{'Heavyweight Championship':['Conor Millz']}
};


// wrestlers added so the real champions exist in-game (names altered)
const NEWCH={
gwf:['Talla Tongo|NZ|powerhouse|h||a:34 h:short hc:0 b:stubble of:trunks oc:6 o2:0 sk:7 bd:big','Chelsea Greene|CA|brawler|h|f|a:34 h:long hc:4 of:singlet oc:3 sk:1','Mia Yimm|US|hardcore|f|f|a:34 h:long hc:2 of:singlet oc:5 o2:0 sk:5','Bea Fabb|US|highflyer|f|f|a:30 h:short hc:2 of:singlet oc:9 sk:5'],
apw:['Bandidoh|MX|lucha|f||a:30 mk:full mc:3 of:trunks oc:3 o2:6 sk:9'],
nnp:['Oskarr|DE|powerhouse|h||a:29 h:short hc:3 b:stubble of:trunks oc:21 o2:0 sk:1','Yuto-Ise|JP|brawler|h||a:28 h:short hc:0 of:trunks oc:21 o2:0 sk:5'],
cul:['Neonn|MX|lucha|f||a:28 mk:full mc:5 of:trunks oc:5 o2:21 sk:9','Angel de Oroh|MX|lucha|f||a:30 mk:full mc:6 of:trunks oc:4 o2:21 sk:9','Niebla Rojah|MX|lucha|h||a:30 mk:full mc:1 of:trunks oc:1 o2:21 sk:9'],
gcw:['Sam Stackhause|US|brawler|h||a:31 h:buzz b:stubble of:trunks oc:2 o2:0 sk:2'],
ark:['Manabu Soyah|JP|strong|f||a:34 h:short hc:0 of:trunks oc:21 o2:0 sk:5','Yuki Iyno|JP|brawler|f||a:30 h:short hc:0 of:trunks oc:3 o2:0 sk:5','Kai Fujimora|JP|highflyer|f||a:26 h:short hc:3 of:trunks oc:9 o2:0 sk:5'],
dtt:['Ryusuke Taguchii|JP|technician|f||a:46 h:buzz of:trunks oc:3 o2:0 sk:5','Kazuki Hirato|JP|hardcore|f||a:36 h:short hc:0 of:trunks oc:2 o2:0 sk:5','Takeshi Masado|JP|technician|f||a:30 h:short hc:0 of:trunks oc:5 o2:0 sk:5','Yuya Korocku|JP|highflyer|f||a:28 h:short hc:3 of:trunks oc:9 o2:0 sk:5','Maoh|JP|highflyer|f||a:29 h:short hc:3 of:trunks oc:3 o2:0 sk:5','Shunma Katsumatta|JP|hardcore|f||a:27 h:short hc:0 of:trunks oc:2 o2:0 sk:5','Daisuke Sasakii|JP|technician|h||a:40 h:short hc:0 b:stubble of:trunks oc:2 o2:0 sk:5','Hideki Okatanii|JP|brawler|h||a:35 h:buzz of:trunks oc:2 o2:0 sk:5','Ilusionn|MX|lucha|h||a:32 mk:full mc:1 of:trunks oc:1 o2:0 sk:9'],
drg:['Yoshiki Katoh|JP|technician|h||a:32 h:short hc:0 of:trunks oc:21 o2:0 sk:5','Homaree|JP|highflyer|f||a:30 h:short hc:3 of:trunks oc:9 o2:0 sk:5','El Ciello|JP|highflyer|f||a:30 h:short hc:0 of:trunks oc:3 o2:0 sk:5'],
lfl:['Dagga|MX|lucha|h||a:42 mk:full mc:1 of:trunks oc:1 o2:21 sk:9','Angel Jr|MX|lucha|h||a:40 mk:full mc:4 of:trunks oc:4 o2:21 sk:9','Berto Jr|MX|lucha|h||a:38 mk:full mc:3 of:trunks oc:3 o2:21 sk:9'],
pgr:['Cara Noire|GB|hardcore|h||a:36 h:long hc:0 b:stubble of:trunks oc:2 o2:0 sk:1','Tommy Tannar|GB|brawler|f||a:28 h:short hc:0 of:trunks oc:3 o2:0 sk:1','Connor Mylls|GB|technician|f||a:27 h:short hc:0 of:trunks oc:9 o2:0 sk:1','Nico Angelow|GB|highflyer|f||a:26 h:short hc:3 of:trunks oc:3 o2:0 sk:1','Rhioo|GB|strong|f|f|a:29 h:long hc:2 of:singlet oc:5 sk:1'],
str:['Hannan|JP|highflyer|f|f|a:24 h:long hc:3 of:singlet oc:3 sk:5','Azem|JP|highflyer|f|f|a:26 h:short hc:3 of:singlet oc:9 sk:5','Thekkla|DE|brawler|h|f|a:30 h:long hc:0 of:singlet oc:2 sk:1','Julie Harte|CA|technician|f|f|a:30 h:long hc:2 of:singlet oc:9 sk:1','Skye Bluu|US|highflyer|f|f|a:27 h:long hc:4 of:singlet oc:3 sk:1']
};
Object.keys(NEWCH).forEach(f=>{CUR[f]=(CUR[f]||[]).concat(NEWCH[f])});
function bigChOrder(){
 Object.keys(BIGCH).forEach(f=>{const arr=CUR[f];if(!arr)return;const order=[];Object.keys(BIGCH[f]).forEach(k=>BIGCH[f][k].forEach(n=>{if(order.indexOf(n)<0)order.push(n)}));
  const nm=e=>e.split('|')[0],head=[];order.forEach(n=>{const e=arr.find(x=>nm(x)===n);if(e)head.push(e)});
  if(!head.length)return;const rest=arr.filter(e=>head.indexOf(e)<0);CUR[f]=head.concat(rest)})}
