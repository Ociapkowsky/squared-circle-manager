
/* ============ Static game data ============ */
const STYLES=['technician','powerhouse','highflyer','lucha','strong','brawler','hardcore'];
const COUNTRIES=['US','JP','MX','GB','DE','PL','CA','BR','AU','NG','FR','ES','IT','CZ'];
const REGION={US:'na',CA:'na',MX:'la',BR:'la',GB:'eu',DE:'eu',PL:'eu',FR:'eu',ES:'eu',IT:'eu',CZ:'eu',JP:'as',AU:'oc',NG:'af',RU:'eu',UA:'eu',FI:'eu',SE:'eu',NO:'eu',DK:'eu',NL:'eu',BE:'eu',AT:'eu',HU:'eu',HR:'eu',GR:'eu',BG:'eu',TR:'eu',PT:'eu',ZA:'af',QA:'as',IL:'as',SG:'as',CN:'as',IN:'as',AR:'la'};
const NEARREG=['la|na','eu|na','af|eu','as|oc','eu|la'];
const NEIGH=['CZ|PL','DE|PL','CZ|DE','DE|FR','ES|FR','FR|IT','FR|GB','CA|US','MX|US','DK|SE','NO|SE','FI|SE','FI|NO','NL|BE','DE|NL','DE|AT','AT|HU','HU|PL','PL|UA','RU|UA','GR|BG','BG|TR','ES|PT','DE|DK','AT|HR','BE|FR','BE|DE','CN|SG','IN|SG','QA|IL'];
const pairKey=(a,b)=>[a,b].sort().join('|');
function accStart(c,fc){if(c===fc)return 55;if(NEIGH.indexOf(pairKey(c,fc))>=0)return 42;const a=REGION[c],b=REGION[fc];if(a&&a===b)return 32;if(NEARREG.indexOf(pairKey(a,b))>=0)return 18;return 8}
const NAMES={
 US:{f:['Jake','Cole','Marcus','Dante','Tyler','Nate','Colt','Zane','Wade','Luke'],l:['Steele','Maddox','Cross','Holloway','Ryker','Dalton','Voss','Mercer','Hale','Kane']},
 JP:{f:['Kenji','Daichi','Ryota','Haruto','Shun','Takumi','Akira','Naoki'],l:['Tanaka','Mori','Sakamoto','Hayashi','Kuroda','Fujimoto','Ishida','Nakano']},
 MX:{f:['Diego','Mateo','Santiago','Rafael','Emilio','Joaquín','Ángel','Hugo'],l:['Ramírez','Torres','Navarro','Castillo','Vargas','Ortega','Mendoza','Salazar']},
 GB:{f:['Oliver','Callum','Rhys','Jamie','Liam','Archie','Finn','Declan'],l:['Whitfield','Blackwood','Hargreaves','Pryce','Lockhart','Ashby','Thorne','Fenwick']},
 DE:{f:['Lukas','Jonas','Felix','Tobias','Niklas','Jens','Moritz','Stefan'],l:['Krüger','Becker','Hartmann','Vogel','Brandt','Lehmann','Richter','Falk']},
 PL:{f:['Marek','Kamil','Bartosz','Szymon','Dawid','Michał','Kuba','Radek'],l:['Wrona','Kowal','Zalewski','Sokół','Mazur','Bielak','Cichocki','Dudek']},
 CA:{f:['Ethan','Mason','Gavin','Brody','Carter','Dylan'],l:['Tremblay','Gagnon','MacLeod','Fraser','Lavoie','Sutherland']},
 BR:{f:['Thiago','Rodrigo','Caio','Bruno','Gustavo','Leandro'],l:['Almeida','Barbosa','Carvalho','Teixeira','Moreira','Duarte']},
 AU:{f:['Hayden','Riley','Brandon','Cameron','Josh','Kyle'],l:['Mitchell','Sullivan','Cooper','Gibson','Nash','Baxter']},
 NG:{f:['Chidi','Tunde','Emeka','Kunle','Obi','Segun'],l:['Okafor','Adeyemi','Nwosu','Balogun','Eze','Oladipo']},
 FR:{f:['Lucas','Hugo','Théo','Maxime','Antoine','Julien','Baptiste','Romain'],l:['Moreau','Lefèvre','Garnier','Roussel','Fontaine','Dubois','Marchand','Girard']},
 ES:{f:['Javier','Alejandro','Pablo','Álvaro','Sergio','Iván','Adrián','Rubén'],l:['Herrera','Molina','Cabrera','Ibáñez','Santana','Quintero','Pastor','Vidal']},
 IT:{f:['Matteo','Luca','Marco','Davide','Federico','Andrea','Nicolò','Riccardo'],l:['Rossetti','Bellini','Moretti','Ferraro','Caruso','Conti','Greco','Lombardi']},
 CZ:{f:['Tomáš','Jakub','Ondřej','Matěj','Filip','Vojtěch','Martin','Lukáš'],l:['Novák','Dvořák','Černý','Procházka','Horák','Kučera','Veselý','Král']}
};
const NAMESF={US:['Ava','Brooke','Skylar','Jade','Harper','Reese','Quinn','Tessa'],JP:['Yui','Aiko','Rin','Sakura','Mio','Hana','Nanami','Kaede'],MX:['Valentina','Camila','Ximena','Renata','Daniela','Itzel','Marisol','Fernanda'],GB:['Poppy','Imogen','Freya','Eleanor','Isla','Matilda','Harriet','Beatrice'],DE:['Lena','Marie','Greta','Hanna','Svenja','Clara','Jana','Franziska'],PL:['Kinga','Ola','Weronika','Zuzia','Agata','Marta','Natalia','Julia'],CA:['Chloe','Addison','Maeve','Piper','Sloane','Willa'],BR:['Larissa','Beatriz','Camila','Luana','Giovana','Thaís'],AU:['Matilda','Stevie','Kayla','Tahlia','Indi','Bronte'],NG:['Adaeze','Ngozi','Folake','Amara','Zainab','Chioma'],FR:['Camille','Léa','Manon','Chloé','Inès','Margaux','Océane','Élodie'],ES:['Lucía','Carmen','Paula','Noelia','Irene','Marta','Alba','Sara'],IT:['Giulia','Chiara','Sofia','Elisa','Martina','Federica','Alice','Giorgia'],CZ:['Tereza','Klára','Eliška','Adéla','Barbora','Kateřina','Nikola','Veronika']};
const STYLEW={
 US:{technician:2,powerhouse:3,highflyer:2,lucha:.5,strong:1,brawler:3,hardcore:2},
 JP:{technician:3,powerhouse:1,highflyer:2,lucha:.5,strong:5,brawler:1,hardcore:1},
 MX:{technician:1,powerhouse:.5,highflyer:3,lucha:6,strong:.3,brawler:1,hardcore:.5},
 GB:{technician:5,powerhouse:1,highflyer:1,lucha:.3,strong:1,brawler:2,hardcore:1},
 DE:{technician:3,powerhouse:3,highflyer:1,lucha:.3,strong:2,brawler:1,hardcore:1},
 PL:{technician:2,powerhouse:3,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:1},
 CA:{technician:3,powerhouse:2,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:1},
 BR:{technician:2,powerhouse:1,highflyer:3,lucha:2,strong:.5,brawler:2,hardcore:.5},
 AU:{technician:1,powerhouse:2,highflyer:1,lucha:.3,strong:1,brawler:3,hardcore:3},
 NG:{technician:1,powerhouse:4,highflyer:2,lucha:.3,strong:1,brawler:2,hardcore:1},
 FR:{technician:3,powerhouse:2,highflyer:2,lucha:.5,strong:1,brawler:2,hardcore:1},
 ES:{technician:2,powerhouse:1.5,highflyer:2.5,lucha:3,strong:.5,brawler:1.5,hardcore:1},
 IT:{technician:3,powerhouse:2,highflyer:1.5,lucha:.5,strong:1,brawler:2.5,hardcore:1},
 CZ:{technician:3,powerhouse:3,highflyer:1,lucha:.3,strong:1.5,brawler:2.5,hardcore:1}
};
const SBIAS={technician:{ring:6,mic:-3,cha:0},powerhouse:{ring:0,mic:0,cha:3},highflyer:{ring:2,mic:-2,cha:4},lucha:{ring:3,mic:-4,cha:3},strong:{ring:5,mic:-5,cha:0},brawler:{ring:-3,mic:3,cha:1},hardcore:{ring:-4,mic:0,cha:2}};
const STYLE_SUB={technician:{tec:14,psy:8,str:-4,spd:0,sta:2},powerhouse:{str:16,sta:4,spd:-8,tec:-6,psy:-2},highflyer:{spd:14,tec:2,str:-8,sta:0,psy:0},lucha:{spd:16,tec:4,str:-10,sta:-2,psy:2},strong:{str:10,sta:12,tec:3,spd:-2,psy:2},brawler:{str:8,sta:6,tec:-8,spd:-2,psy:0},hardcore:{sta:14,str:4,tec:-6,spd:0,psy:-2}};
const KEY={technician:'tec',powerhouse:'str',highflyer:'spd',lucha:'spd',strong:'str',brawler:'str',hardcore:'sta'};
const CHEM={'technician|strong':8,'technician|technician':6,'highflyer|lucha':8,'lucha|lucha':6,'highflyer|powerhouse':7,'brawler|hardcore':8,'hardcore|hardcore':6,'brawler|powerhouse':6,'strong|strong':7,'brawler|strong':5,'highflyer|highflyer':5,'powerhouse|powerhouse':3,'brawler|brawler':4,'lucha|technician':5,'highflyer|technician':5,'powerhouse|strong':5,'powerhouse|technician':4,'hardcore|powerhouse':4,'hardcore|highflyer':-2,'hardcore|technician':-4,'brawler|lucha':-2,'brawler|highflyer':-2,'hardcore|lucha':-3,'lucha|strong':2,'highflyer|strong':3,'hardcore|strong':1,'brawler|technician':0,'lucha|powerhouse':1};
function chem(a,b){const k=pairKey(a,b);const v=CHEM[k]!==undefined?CHEM[k]:0;return{v,k:v>=7?'chem.great':v>=4?'chem.ok':v<0?'chem.bad':'chem.none'}}
const FED_SPECS=[
 // global giants
 {id:'gwf',name:'World Wrestling Empire',short:'WWE',country:'US',tier:5,pop:90,cash:150e6,n:26,color:'#d7263d'},
 {id:'apw',name:'All Elevated Wrestling',short:'AEW',country:'US',tier:5,pop:82,cash:90e6,n:22,color:'#f2b632'},
 // big
 {id:'cwe',name:'Total Nonstop Attack',short:'TNA',country:'US',tier:4,pop:66,cash:30e6,n:16,color:'#2b6fd6'},
 {id:'nnp',name:'New Nippon Pro-Wrestling',short:'NNPW',country:'JP',tier:4,pop:72,cash:40e6,n:18,color:'#c8102e'},
 {id:'cul',name:'Consejo Universal de Lucha Libre',short:'CULL',country:'MX',tier:4,pop:62,cash:25e6,n:16,color:'#1e90a8'},
 // strong
 {id:'roh',name:'Ring of Glory',short:'ROG',country:'US',tier:3,pop:56,cash:6e6,n:14,color:'#8c1d2f'},
 {id:'nwc',name:'National Wrestling Coalition',short:'NWC',country:'US',tier:3,pop:46,cash:3e6,n:12,color:'#5c6b8a'},
 {id:'mlw',name:'Major Pro Wrestling',short:'MPW',country:'US',tier:3,pop:43,cash:2.6e6,n:12,color:'#3b7a57'},
 {id:'gcw',name:'Game Breaker Wrestling',short:'GBW',country:'US',tier:3,pop:42,cash:2.4e6,n:12,color:'#e8782a'},
 {id:'rsp',name:'All Nippon Pro-Wrestling',short:'ANPW',country:'JP',tier:3,pop:52,cash:5e6,n:14,color:'#d9577a'},
 {id:'ark',name:'Pro Wrestling ARK',short:'ARK',country:'JP',tier:3,pop:50,cash:4.5e6,n:14,color:'#2f6fb0'},
 {id:'str',name:'World Wonder Ring Starburst',short:'WWRS',country:'JP',tier:3,pop:51,cash:4.5e6,n:13,wo:1,color:'#f06292'},
 {id:'dtt',name:'DTT Pro-Wrestling',short:'DTT',country:'JP',tier:3,pop:45,cash:3e6,n:12,color:'#ffb300'},
 {id:'drg',name:'Dragon Portal Pro',short:'DPP',country:'JP',tier:3,pop:43,cash:2.6e6,n:12,color:'#00897b'},
 {id:'lfl',name:'Lucha Libre Triple Alianza',short:'LTA',country:'MX',tier:3,pop:54,cash:5e6,n:14,color:'#3cc4b1'},
 {id:'rvp',name:'Revolt Pro Wrestling',short:'RVP',country:'GB',tier:3,pop:48,cash:3.2e6,n:12,color:'#ef6c00'},
 {id:'pgr',name:'Progressive Wrestling',short:'PRG',country:'GB',tier:3,pop:44,cash:2.6e6,n:12,color:'#7e57c2'},
 {id:'wxx',name:'Westend Xtreme Wrestling',short:'WXW',country:'DE',tier:3,pop:49,cash:3.5e6,n:13,color:'#546e7a'},
 {id:'nlw',name:'Northern Lights Wrestling',short:'NLW',country:'CA',tier:3,pop:40,cash:2.2e6,n:11,color:'#5fb3e6'},
 {id:'spw',name:'Samba Pro Wrestling',short:'SPW',country:'BR',tier:3,pop:44,cash:2.2e6,n:12,color:'#35a853'},
 // regional
 {id:'bra',name:'British Ring Alliance',short:'BRA',country:'GB',tier:2,pop:34,cash:220e3,n:10,color:'#6a96f2'},
 {id:'icw',name:'Insane Clash Wrestling',short:'ICW',country:'GB',tier:2,pop:31,cash:180e3,n:10,color:'#c62828'},
 {id:'eve',name:'Pro-Wrestling EDEN',short:'EDEN',country:'GB',tier:2,pop:27,cash:140e3,n:9,color:'#ab47bc'},
 {id:'hwu',name:'Hanse Wrestling Union',short:'HWU',country:'DE',tier:2,pop:30,cash:160e3,n:10,color:'#9b7bff'},
 {id:'bwf',name:'Berlin Wrestling Federation',short:'BWF',country:'DE',tier:2,pop:24,cash:120e3,n:9,color:'#455a64'},
 {id:'cwa',name:'Catch Wrestling Alliance',short:'CWA',country:'DE',tier:2,pop:22,cash:110e3,n:9,color:'#8d6e63'},
 {id:'bnp',name:'Big Nippon Pro-Wrestling',short:'BNPW',country:'JP',tier:2,pop:31,cash:180e3,n:10,color:'#6d4c41'},
 {id:'atl',name:'Arena Titán',short:'ATL',country:'MX',tier:2,pop:29,cash:150e3,n:10,color:'#e8b53c'},
 {id:'sxw',name:'Sydney City Wrestling',short:'SCW',country:'AU',tier:2,pop:28,cash:140e3,n:9,color:'#2f9ec9'},
 {id:'mys',name:'Mystère Wrestling',short:'MYS',country:'CA',tier:2,pop:32,cash:170e3,n:10,color:'#6a1b9a'},
 {id:'def',name:'Defiance Wrestling',short:'DEF',country:'US',tier:2,pop:33,cash:190e3,n:10,color:'#00838f'},
 {id:'orw',name:'Ohio River Wrestling',short:'ORW',country:'US',tier:2,pop:28,cash:140e3,n:9,color:'#9e7b2e'},
 {id:'llf',name:'Lutte Libre Française',short:'LLF',country:'FR',tier:2,pop:25,cash:130e3,n:9,color:'#3b5bdb'},
 {id:'lib',name:'Lucha Ibérica',short:'LIB',country:'ES',tier:2,pop:26,cash:130e3,n:9,color:'#d94a4a'},
 {id:'rwc',name:'Roma Wrestling Club',short:'RWC',country:'IT',tier:2,pop:22,cash:110e3,n:9,color:'#2f8f5a'},
 {id:'llp',name:'Lagos Lariat Pro',short:'LLP',country:'NG',tier:2,pop:24,cash:100e3,n:9,color:'#2aa876'},
 {id:'psw',name:'Prague Steel Wrestling',short:'PSW',country:'CZ',tier:2,pop:28,cash:140e3,n:9,color:'#8a56d9'},
 // Poland
 {id:'ptw',name:'Primetime Wrestling',short:'PTW',country:'PL',tier:2,pop:21,cash:90e3,n:30,color:'#f9a825'},
 {id:'plz',name:'Fundacja Rozwoju Polskiego Wrestlingu',short:'FRPW',country:'PL',tier:1,pop:14,cash:15e3,n:10,color:'#d8344c'},
 {id:'ppw',name:'PpW Fenomen',short:'PpW',country:'PL',tier:1,pop:16,cash:18e3,n:44,color:'#b71c1c'},
 {id:'mzw',name:'Manic Zone Wrestling',short:'MZW',country:'PL',tier:1,pop:12,cash:12e3,n:24,color:'#e65100'},
 {id:'mcw',name:'Mining City Wrestling',short:'MCW',country:'PL',tier:1,pop:11,cash:11e3,n:9,color:'#37474f'},
 {id:'kpw',name:'Kaszuby Pro Wrestling',short:'KPW',country:'PL',tier:1,pop:13,cash:13e3,n:40,color:'#0277bd'},
 {id:'low',name:'Legacy of Wrestling',short:'LOW',country:'PL',tier:1,pop:9,cash:9e3,n:22,color:'#6a1b9a'},
 // small independents
 {id:'flw',name:'Freelance Wrestling',short:'FLW',country:'US',tier:1,pop:14,cash:15e3,n:8,color:'#c2185b'},
 {id:'nst',name:'Preston City Wrestling',short:'PCW',country:'GB',tier:1,pop:15,cash:16e3,n:7,color:'#7a8aa6'},
 {id:'rpc',name:'WrestlingKULT',short:'WK',country:'DE',tier:1,pop:10,cash:10e3,n:6,color:'#4a4a55'},
 {id:'tfc',name:'The Crash',short:'CRASH',country:'MX',tier:1,pop:9,cash:9e3,n:6,color:'#6bbf3a'},
 {id:'tir',name:'Superkick-D',short:'SKD',country:'CA',tier:1,pop:13,cash:12e3,n:6,color:'#d96a6a'},
 {id:'nfw',name:'Nezavisimaya Federatsiya Wrestlinga',short:'NFW',country:'RU',tier:2,pop:20,cash:80e3,n:8,color:'#c0392b'},
 {id:'uwa',name:'Ukrainian Wrestling Area',short:'UWA',country:'UA',tier:1,pop:14,cash:14e3,n:8,color:'#1e88e5'},
 {id:'fcf',name:'Fight Club Suomi',short:'FCS',country:'FI',tier:1,pop:13,cash:13e3,n:8,color:'#0d47a1'},
 {id:'sth',name:'STHLM Wrestlers',short:'STW',country:'SE',tier:1,pop:14,cash:14e3,n:8,color:'#f9a825'},
 {id:'nwf',name:'Norsk Wrestling Forbund',short:'NWB',country:'NO',tier:1,pop:13,cash:13e3,n:8,color:'#c62828'},
 {id:'dpw',name:'Dansk Wrestling Pro',short:'DWP',country:'DK',tier:1,pop:12,cash:12e3,n:8,color:'#d32f2f'},
 {id:'pwh',name:'Pro Wrestling Nederland',short:'PWN',country:'NL',tier:2,pop:21,cash:90e3,n:8,color:'#ef6c00'},
 {id:'pwb',name:'Pro Wrestling Allstars Belgie',short:'PWB',country:'BE',tier:1,pop:13,cash:13e3,n:8,color:'#fbc02d'},
 {id:'ewa',name:'Euro Wrestling Alliance',short:'EWL',country:'AT',tier:1,pop:15,cash:16e3,n:8,color:'#b71c1c'},
 {id:'hcw',name:'Hungaria Championship Wrestling',short:'HUN',country:'HU',tier:2,pop:22,cash:90e3,n:8,color:'#2e7d32'},
 {id:'cwf',name:'Hrvatska Wrestling Federacija',short:'HWF',country:'HR',tier:1,pop:10,cash:10e3,n:8,color:'#1565c0'},
 {id:'zmk',name:'Zmaki Wrestling',short:'ZMK',country:'GR',tier:1,pop:14,cash:14e3,n:8,color:'#0277bd'},
 {id:'bwe',name:'Bulgaria Wrestling Event',short:'BWV',country:'BG',tier:1,pop:10,cash:10e3,n:8,color:'#388e3c'},
 {id:'tpw',name:'Turkiye Power Wrestling',short:'TPW',country:'TR',tier:2,pop:20,cash:80e3,n:8,color:'#d50000'},
 {id:'saw',name:'Southern Africa Wrestling',short:'SAW',country:'ZA',tier:1,pop:12,cash:12e3,n:8,color:'#00897b'},
 {id:'qpw',name:'Qatar Pro Wrestling',short:'QPW',country:'QA',tier:2,pop:24,cash:150e3,n:8,color:'#6a1b3a'},
 {id:'awo',name:'All Wrestling Organisation',short:'AWO',country:'IL',tier:1,pop:11,cash:11e3,n:8,color:'#3949ab'},
 {id:'sgw',name:'Lion City Pro Wrestling',short:'LCW',country:'SG',tier:1,pop:14,cash:14e3,n:8,color:'#e53935'},
 {id:'mkw',name:'Middle Empire Wrestling',short:'MEW',country:'CN',tier:1,pop:13,cash:13e3,n:8,color:'#ff8f00'},
 {id:'ind',name:'Wrestle Square India',short:'WSI',country:'IN',tier:1,pop:12,cash:12e3,n:8,color:'#ff6f00'},
 {id:'ctw',name:'Centro de Treino de Wrestling',short:'CTW',country:'PT',tier:1,pop:12,cash:12e3,n:8,color:'#2e7d32'},
 {id:'fal',name:'Federacion Argentina de Lucha Libre',short:'FAL',country:'AR',tier:1,pop:11,cash:11e3,n:8,color:'#4fc3f7'}
];
const TD=[{cap:250,price:15,prod:350,tv:0},{cap:1200,price:18,prod:5e3,tv:2e3},{cap:5000,price:30,prod:30e3,tv:25e3},{cap:14000,price:50,prod:150e3,tv:300e3},{cap:50000,price:80,prod:600e3,tv:2.5e6}];
const TPOP=[0,18,38,60,80],UPG=[0,16e3,300e3,4e6,90e6],ROSTERMAX=[12,17,25,34,48],SALM=[.6,2.3,9,32,110];
const OVHR=[0,.05,.12,.22,.32],PGR=[.75,.44];
function priceFx(pm){const x=pm/100-1;return x>0?x*.5+x*x*.9:x*.4}
const OBJ_POP=[18,38,60,80,95],OBJ_CASH=[25e3,600e3,12e6,120e6,400e6];
const EV={
 interf:[{stars:.5,heat:15},{stars:.25,heat:3},{stars:-.25,heat:8,fin:'dq'}],
 turn:[{stars:.5,heat:25,turn:1},{stars:.1,heat:4}],
 crowd:[{stars:.5,inj:.12},{stars:-.25,inj:0},{stars:.75,inj:.3}],
 after:[{heat:20},{heat:-5},{heat:8}],
 botch:[{stars:-.25,inj:.2},{stars:.25,inj:.1},{stars:-.5,inj:0,fin:'dq'}],
 chant:[{stars:.5,heat:5},{stars:0},{stars:.25,heat:10,turn:1}],
 weapon:[{stars:.25,heat:12,fin:'dq'},{stars:-.25,heat:-3},{stars:.5,heat:8,inj:.2}],
 fanrun:[{stars:-.25},{stars:.25,heat:5,inj:.1},{stars:.5,heat:10}],
 refbump:[{stars:.25,heat:6},{stars:.5,heat:10,fin:'dirty'},{stars:0}],
 mic:[{stars:-.25},{stars:.25,heat:4},{stars:0}]
};
const MODES={};
for(let a=1;a<=10;a++)for(let b=a;b<=10;b++)MODES[a+'v'+b]={a,b};
[3,4,5,6].forEach(n=>MODES[n+'way']={a:n,b:0,ffa:1,g:1});
MODES['2v2v2']={a:6,b:0,ffa:1,g:2};MODES['2v2v2v2']={a:8,b:0,ffa:1,g:2};MODES['3v3v3']={a:9,b:0,ffa:1,g:3};
const STIPS={
 none:{tier:1,cost:0,inj:1,noDQ:false,aff:{}},
 extreme:{tier:1,cost:.04,inj:1.8,noDQ:true,aff:{hardcore:4,brawler:3,powerhouse:1,technician:-3,strong:0,highflyer:0,lucha:-1}},
 submission:{tier:1,cost:0,inj:1,noDQ:true,aff:{technician:4,strong:2,hardcore:-2,brawler:-1,powerhouse:0,highflyer:-2,lucha:0}},
 ironman:{tier:2,cost:0,inj:1.2,noDQ:false,aff:{technician:3,strong:4,highflyer:1,lucha:1,powerhouse:-1,brawler:-2,hardcore:-3}},
 lms:{tier:2,cost:.03,inj:1.6,noDQ:true,aff:{brawler:3,hardcore:3,strong:3,powerhouse:2,technician:-1,highflyer:-2,lucha:-2}},
 tables:{tier:2,cost:.05,inj:1.9,noDQ:true,aff:{hardcore:4,brawler:2,powerhouse:2,highflyer:1,technician:-3,strong:-1,lucha:0}},
 cage:{tier:3,cost:.1,inj:1.5,noDQ:true,aff:{brawler:3,powerhouse:3,hardcore:2,strong:1,highflyer:-1,lucha:-1,technician:0}},
 ladder:{tier:3,cost:.12,inj:2.1,noDQ:true,aff:{highflyer:4,lucha:4,hardcore:2,technician:-2,powerhouse:-2,strong:-1,brawler:0}},
 prizematch:{tier:2,cost:.1,inj:1.8,noDQ:true,aff:{highflyer:3,lucha:3,hardcore:2,brawler:1,technician:0,strong:-1,powerhouse:-1}},
 tourney:{tier:1,cost:0,inj:1,noDQ:false,aff:{}}
};
const SKIN=['#f1c9a5','#e0ac7e','#c68642','#8d5524','#5c3a21','#f6d7c3','#fde2cf','#a0673a','#3b2414','#d9a27a','#e8b894','#6f4326','#f9e0d0'];
const HAIRC=['#1b1b1b','#4a2c1a','#8a5a2b','#d9b45a','#c4c4c4','#b2342a','#f2e6b8','#6b3a1f','#2f6df2','#e0488f','#2fae5c','#8a56d9','#7a7a7a','#ff6b00','#14b8a6','#f5f5f5'];
const OUTC=['#d94a4a','#3b82d6','#35a853','#e8b53c','#8a56d9','#e8e6df','#2a2a2a','#e8782a','#14b8a6','#ec4899','#84cc16','#0ea5e9','#7a1f1f','#1e293b','#d4af37','#556b2f','#5a1020','#14213d','#b8bcc8','#0f766e','#6b4423','#111111','#f8f8f8','#f43f5e'];
const HAIRS=['bald','buzz','short','crop','side','slick','pompadour','spiky','fauxhawk','mohawk','curly','afro','dreads','braids','mullet','bun','long','bob','pony','pigtails','shaggy','undercut','topknot','flattop','wavy','bangs','cornrows','halfup'];
const BEARDS=['none','stubble','heavy','full','mustache','handlebar','goatee','soulpatch','chinstrap','vandyke','mutton','sideburns','long','anchor','circle','bushy','patchy'];
const OUTFITS=['trunks','singlet','pants','suit','tank','shorts','tights','jacket','vest','gi','stripes','armor','tshirt','hoodie','leather','coat','robe','tux','leotard','overalls','kilt','bodysuit'];
const MASKS=['none','half','full','domino','bandana','paint','hood','skull','cat','oni','stripe','wings'];
const ACCS=['none','headband','cap','backcap','bandana','shades','glasses','crown','cowboy','earrings','beanie','fedora','visor','tiara','flowers'];
const NECKS=['none','scarf','bowtie','towel','belt','tie'];
const GEARS=['none','kneepads','wristbands','pads','tape','chain','tattoo','armband','gloves','elbow','boots'];
const FACES=['none','scar','freckles','stripe','eyepatch','bruise','lipstick','eyeliner','warpaint','bandage','tears'];
const BUILDS=['std','big','lean','stocky','bulk'];
const STRAPS=['#1a1a1a','#8a1c1c','#1f3f8a','#1d6b4f','#6a3aa8','#b26a1a','#e8e6df','#c4358a','#2b2b6e','#6b4423','#13a89e','#e0541f'];
const PLATE={gold:['#f2c94c','#9a6a00'],silver:['#e6e9ef','#6f7890'],bronze:['#d08a4a','#6e3f14'],black:['#3a3a44','#a8acc0'],rose:['#f4b6d4','#a0366a'],blue:['#7fb4ff','#1f4e9a'],red:['#ff8a80','#8a1c1c'],rust:['#a65a2a','#4a2410'],emerald:['#6fd6a0','#14664a']};

/* ============ Data pack ============ */
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function tierOfPop(p){let tr=1;for(let i=1;i<5;i++)if(p>=TPOP[i])tr=i+1;return tr}
function salaryOf(w,tier){return Math.max(20,Math.round((w.pop*w.pop/8+w.ring*2)*SALM[tier-1]/10)*10)}
function genStats(w,r){
 const b=STYLE_SUB[w.style]||{};
 ['str','spd','tec','sta','psy'].forEach(k=>{if(w[k]===undefined)w[k]=clamp(Math.round(w.ring+(b[k]||0)+(r()-.5)*16),10,98)});
 if(w.loyal===undefined)w.loyal=clamp(Math.round(35+r()*55),10,98);
 if(w.morale===undefined)w.morale=Math.round(55+r()*30);
 if(w.fatigue===undefined)w.fatigue=0;
 return w;
}
function randLook(r,cc,fem){
 const skinBias={JP:[0,5,0,1,9],NG:[3,4,3,2,8,7],MX:[1,2,1,2,9],BR:[1,2,3,4,7,9]}[cc];
 const sk=skinBias&&r()<.7?skinBias[Math.floor(r()*skinBias.length)]:Math.floor(r()*SKIN.length);
 const pk=a=>a[Math.floor(r()*a.length)];
 const MH=['shaggy','undercut','topknot','flattop','cornrows','bald','buzz','buzz','short','short','short','crop','crop','side','side','slick','slick','pompadour','spiky','fauxhawk','mohawk','curly','afro','dreads','braids','mullet','bun','long'];
 const FH=['wavy','bangs','halfup','long','long','long','bob','bob','pony','pony','pony','pigtails','short','side','curly','afro','braids','bun','crop','dreads','buzz'];
 const MB=['none','none','none','none','none','stubble','stubble','heavy','full','full','mustache','handlebar','goatee','soulpatch','chinstrap','vandyke','mutton','sideburns','long','anchor','circle','bushy','patchy'];
 const MO=['trunks','trunks','trunks','singlet','singlet','pants','pants','tank','shorts','tights','jacket','vest','gi','stripes','armor','suit','tshirt','hoodie','leather','kilt','bodysuit'];
 const FO=['singlet','singlet','suit','tank','tights','jacket','stripes','armor','gi','leotard','leotard','bodysuit','robe','overalls'];
 const hairC=Math.floor(r()*(r()<.8?6:HAIRC.length)),outC=Math.floor(r()*OUTC.length);
 const L={skin:sk,hair:fem?pk(FH):pk(MH),hairC,beardC:hairC,beard:fem?'none':pk(MB),outfit:fem?pk(FO):pk(MO),outC,o2:Math.floor(r()*OUTC.length),
  mask:r()<(fem?.08:.14)?pk(MASKS.slice(1)):'none',maskC:Math.floor(r()*OUTC.length),acc:r()<.25?pk(ACCS.slice(1)):'none',gear:r()<.4?pk(GEARS.slice(1)):'none',face:r()<.15?pk(FACES.slice(1)):'none',neck:r()<.1?pk(NECKS.slice(1)):'none',build:r()<.25?pk(['big','lean','stocky','bulk']):'std'};
 return L;
}
function buildPack(){
 const r=mulberry(20261108),used=new Set(),W=[];let n=1;
 const wpick=o=>{const ks=Object.keys(o);let tot=0;ks.forEach(k=>tot+=o[k]);let x=r()*tot;for(const k of ks){x-=o[k];if(x<=0)return k}return ks[0]};
 const mk=(fed,cc,fpop,rank,total,fc,fem)=>{
  let nm;for(let g=0;g<40;g++){const N=NAMES[cc],FN=fem?NAMESF[cc]:N.f;nm=FN[Math.floor(r()*FN.length)]+' '+N.l[Math.floor(r()*N.l.length)];if(!used.has(nm))break}
  if(used.has(nm))nm+=' Jr.';used.add(nm);
  const style=wpick(STYLEW[cc]),b=SBIAS[style];
  const pop=clamp(Math.round(fpop+(0.5-rank/total)*40+(r()-.5)*10),3,98),tr=tierOfPop(pop);
  const base=28+tr*9,g=()=>(r()-.5)*24;
  const w={id:'w'+(n++),name:nm,country:cc,style,role:r()<.5?'face':r()<.7?'heel':'tweener',
   ring:clamp(Math.round(base+b.ring+g()+(pop-fpop)*.2),18,97),mic:clamp(Math.round(base-6+b.mic+g()),12,97),cha:clamp(Math.round(base-2+b.cha+g()),12,97),
   pop,age:20+Math.floor(r()*r()*22)+Math.floor(r()*8),fed,contract:12+Math.floor(r()*90),injury:0,look:randLook(r,cc,fem)};
  if(fem)w.g='f';
  genStats(w,r);
  w.acc=fed==='FA'?0:clamp(accStart(cc,fc)+Math.floor(r()*r()*130),0,100);
  w.salary=salaryOf(w,tierOfPop(fpop));return w;
 };
 const HK={long:'long',short:'short',buzz:'buzz',bald:'bald',slick:'slick',side:'side',spiky:'spiky',mohawk:'mohawk',fauxhawk:'fauxhawk',curly:'curly',afro:'afro',dreads:'dreads',braids:'braids',mullet:'mullet',bun:'bun',bob:'bob',pony:'pony',pigtails:'pigtails',crop:'crop',pompadour:'pompadour',shaggy:'shaggy',undercut:'undercut',topknot:'topknot',flattop:'flattop',wavy:'wavy',bangs:'bangs',cornrows:'cornrows',halfup:'halfup'};
 const mkCur=(f,e,rank,total)=>{
  const s=e.split('|'),nm=s[0],cc=s[1],style=STYLES.indexOf(s[2])>=0?s[2]:'technician',fem=s[4]==='f',tk={};
  (s[5]||'').split(' ').forEach(x=>{const i=x.indexOf(':');if(i>0)tk[x.slice(0,i)]=x.slice(i+1)});
  const tot=total||f.n,fp=fem?f.pop*.92:f.pop,b=SBIAS[style];
  const pop=clamp(Math.round(fp+(f.tier>=3?14:10)-Math.pow(rank/tot,.85)*(f.tier>=3?58:44)+(r()-.5)*5),3,98),tr=tierOfPop(pop),base=28+tr*9,g=()=>(r()-.5)*24;
  const role=s[3]==='f'?'face':s[3]==='h'?'heel':'tweener';
  const L=randLook(r,cc,fem),num=k=>tk[k]===undefined?undefined:+tk[k];
  if(tk.sk!==undefined)L.skin=num('sk');if(tk.h)L.hair=HK[tk.h]||L.hair;else if(tk.mk&&tk.mk!=='none')L.hair='bald';if(tk.hc!==undefined){L.hairC=num('hc');L.beardC=num('hc')}
  L.beard=tk.b||(fem?'none':(tk.h?'none':L.beard));if(tk.bc!==undefined)L.beardC=num('bc');
  if(tk.of)L.outfit=tk.of;if(tk.oc!==undefined)L.outC=num('oc');if(tk.o2!==undefined)L.o2=num('o2');
  L.mask=tk.mk||'none';if(tk.mc!==undefined)L.maskC=num('mc');L.acc=tk.ac||'none';L.gear=tk.gr||'none';L.face=tk.fc||'none';L.neck=tk.nk||'none';L.build=tk.bd||'std';
  const w={id:'w'+(n++),name:nm,country:cc,style,role,
   ring:clamp(Math.round(base+b.ring+g()+(pop-fp)*.2),18,97),mic:clamp(Math.round(base-6+b.mic+g()),12,97),cha:clamp(Math.round(base-2+b.cha+g()),12,97),
   pop,age:+(tk.a||30),fed:f.id,contract:12+Math.floor(r()*90),injury:0,look:L};
  if(fem)w.g='f';used.add(nm);genStats(w,r);
  w.acc=clamp(accStart(cc,f.country)+Math.floor(r()*r()*130),0,100);w.salary=salaryOf(w,tierOfPop(f.pop));return w;
 };
 try{bigChOrder()}catch(e){}
 FED_SPECS.forEach(f=>{if(f.wo)return;const cur=((typeof CUR!=='undefined'&&CUR[f.id])||[]).filter(e=>e.split('|')[4]!=='f');const CN=Math.max(f.n,cur.length);for(let i=0;i<CN;i++){if(i<cur.length){W.push(mkCur(f,cur[i],i,CN));continue}const home=r()<(f.tier>=4?.35:f.tier>=2?.7:.75)?f.country:COUNTRIES[Math.floor(r()*COUNTRIES.length)];W.push(mk(f.id,home,f.pop,i,CN,f.country))}});
 {const fa=(typeof CUR!=='undefined'&&CUR.FA||[]).filter(e=>e.split('|')[4]!=='f');fa.forEach((e,i)=>{const w=mkCur({id:'FA',pop:26,country:'PL',n:fa.length},e,i,fa.length);w.acc=0;W.push(w)})}
 for(let i=0;i<24;i++){const fp=8+Math.floor(r()*42);W.push(mk('FA',COUNTRIES[Math.floor(r()*COUNTRIES.length)],fp,Math.floor(r()*10),10,'US'))}
 {const fa=(typeof CUR!=='undefined'&&CUR.FA||[]).filter(e=>e.split('|')[4]==='f');fa.forEach((e,i)=>{const w=mkCur({id:'FA',pop:24,country:'PL',n:fa.length},e,i,fa.length);w.acc=0;W.push(w)})}
 FED_SPECS.forEach(f=>{const nf=Math.max(3,Math.round(f.n*.4));const curF=((typeof CUR!=='undefined'&&CUR[f.id])||[]).filter(e=>e.split('|')[4]==='f');const NF=Math.max(nf,curF.length);for(let i=0;i<NF;i++){if(i<curF.length){W.push(mkCur(f,curF[i],i,NF));continue}const home=r()<(f.tier>=4?.35:f.tier>=2?.7:.75)?f.country:COUNTRIES[Math.floor(r()*COUNTRIES.length)];W.push(mk(f.id,home,f.pop*.92,i,NF,f.country,1))}});
 for(let i=0;i<8;i++){const fp=8+Math.floor(r()*38);W.push(mk('FA',COUNTRIES[Math.floor(r()*COUNTRIES.length)],fp,Math.floor(r()*10),10,'US',1))}
 FED_SPECS.forEach(f=>{const cap=Math.round(ROSTERMAX[f.tier-1]*(f.tier===1?1.05:1.3)),mc=f.wo?0:Math.ceil(cap*.72),fc=cap-mc;const mine=W.filter(w=>w.fed===f.id);[mine.filter(w=>w.g!=='f').sort((x,y)=>y.pop-x.pop).slice(mc),mine.filter(w=>w.g==='f').sort((x,y)=>y.pop-x.pop).slice(fc)].forEach(l=>l.forEach(w=>{w.fed='FA';w.acc=0;delete w.stb}))});
 const byName={};W.forEach(w=>{if(!byName[w.fed+'|'+w.name])byName[w.fed+'|'+w.name]=w});const stables=[];
 if(typeof STB!=='undefined')Object.keys(STB).forEach(fid=>STB[fid].forEach(s=>{const ms=s[1].map(n=>byName[fid+'|'+n]).filter(Boolean);if(ms.length>=2){ms.forEach(w=>w.stb=s[0]);stables.push({fed:fid,name:s[0],members:ms.map(w=>w.id)})}}));
 return{name:'Squared Circle Manager default pack (fictional)',version:2,feds:FED_SPECS.map(f=>Object.assign({},f)),wrestlers:W,stables};
}
let PACK=buildPack();
function validPack(p){return p&&Array.isArray(p.feds)&&p.feds.length>0&&Array.isArray(p.wrestlers)&&p.wrestlers.length>0&&p.feds.every(f=>f.id&&f.name&&f.tier>=1&&f.tier<=5)&&p.wrestlers.every(w=>w.id&&w.name&&STYLES.indexOf(w.style)>=0)}
function loadPackLS(){try{const s=localStorage.getItem(LS_PACK);if(s){const p=JSON.parse(s);if(validPack(p))PACK=p}}catch(e){}}
function packText(){return '{"name":'+JSON.stringify(PACK.name||'pack')+',"version":2,\n"feds":[\n'+PACK.feds.map(f=>JSON.stringify(f)).join(',\n')+'\n],\n"wrestlers":[\n'+PACK.wrestlers.map(w=>JSON.stringify(w)).join(',\n')+'\n]}'}
