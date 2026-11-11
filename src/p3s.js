/* ============ PPV/PLE editor: own promotion's big-event names and order ============ */
function ppvDefault(){
 const cl=fedBigList(G.fed.id);
 if(cl)return cl.map(p=>({pl:p[0],en:p[1]}));
 const h=hsh(G.fed.id),r=[];for(let i=0;i<8;i++){const b=BIGN[(h+i*13)%BIGN.length];r.push({pl:b[0],en:b[1]})}return r}
function ppvEnsure(){if(!G.ppv||!G.ppv.length)G.ppv=ppvDefault();return G.ppv}
function ppvNextWeek(){return G.week%4===0?G.week:G.week+(4-G.week%4)}
function ppvName(wk,lg){
 const l=ppvEnsure(),idx=Math.round((wk-ppvNextWeek())/4),i=((idx%l.length)+l.length)%l.length;
 return (lg||lang)==='pl'?l[i].pl:l[i].en}
function ppvRotate(){const l=ppvEnsure();if(l.length>1)l.push(l.shift());__bnG=null}
Object.assign(D,{'nav.ppv':['PPV/PLE','PPV/PLE'],
 'pv.sub':['Lista nazw wielkich gal Twojej federacji. Pierwsza pozycja to najbliższa gala (co 4 tygodnie); po każdej gali pozycja trafia na koniec listy. Zmień nazwy i kolejność jak chcesz.','Names of your promotion\'s big shows. The first entry is the next show (every 4 weeks); after each show it moves to the end of the list. Edit names and order as you like.'],
 'pv.upc':['Najbliższe gale','Upcoming shows'],'pv.list':['Lista gal','Show list'],'pv.wk':['Tydz. {n}','Wk {n}'],
 'pv.add':['Dodaj','Add'],'pv.addph':['Nazwa nowej gali...','New show name...'],'pv.reset':['Przywróć domyślne','Restore defaults'],
 'pv.up':['W górę','Move up'],'pv.dn':['W dół','Move down'],'pv.del':['Usuń','Delete']});
