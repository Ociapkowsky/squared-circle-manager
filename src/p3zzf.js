// ---- v105: famous managers from other countries + home-country synergy ----
MG_FAM.push(
{k:'gedou',n:'Gedou Sakai',cc:'JP',g:'m',s:82,f:'mentor',pop:55},
{k:'kojikka',n:'Great Kojikka',cc:'JP',g:'m',s:72,f:'heel',pop:50},
{k:'konnen',n:'Konnen Reyes',cc:'MX',g:'m',s:80,f:'mic',pop:60},
{k:'roldan',n:'Dorian Roldán',cc:'MX',g:'m',s:72,f:'heel',pop:50},
{k:'regel',n:'William Regel',cc:'GB',g:'m',s:82,f:'mentor',pop:62},
{k:'finley',n:'Dave Finley',cc:'GB',g:'m',s:76,f:'mentor',pop:50},
{k:'pawlowicz',n:'Arek Pawłowicz',cc:'PL',g:'m',s:78,f:'mic',pop:58},
{k:'kruk',n:'Zbigniew Kruk',cc:'PL',g:'m',s:66,f:'heel',pop:35});
const _mgpw2=mgPow;mgPow=function(w){const p=_mgpw2(w),m=mgOf(w.id);return m&&m.cc&&m.cc===w.country?p*1.1:p};
const _iwmc=infraWeekly;infraWeekly=function(){_iwmc();const g=G.mg;if(!g)return;g.l.forEach(m=>{const w=m.w?W(m.w):null;if(w&&w.fed===G.fed.id&&m.cc===w.country&&foreign(w)&&(w.acc||0)<100)w.acc=Math.min(100,(w.acc||0)+.2)})};
Object.assign(D,{'mgf.n':['Wielkie nazwiska branży z różnych krajów. Są drogie, ale działają o 15% mocniej i budują markę federacji. Menedżer z tego samego kraju co zawodnik daje dodatkowe +10% i pomaga obcokrajowcowi się zaaklimatyzować. Lista zmienia się co kilka tygodni.','Big names from different countries. They are expensive but work 15% stronger and build the federation brand. A manager from the same country as the wrestler adds +10% and helps a foreigner acclimatise. The list rotates every few weeks.']});
