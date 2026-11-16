;(async()=>{lang='pl';newGame('ppw');G.week=5;
 const nb=ppvNextWeek();console.log('nb',nb,'names',[0,1,2,3].map(k=>ppvName(nb+4*k)).join(' | '),'| cal',ownBigName(8),bigNameFor(G.fed.id,12));
 G.screen='ppv';render();
 ACT.ppvadd.call(null);document.getElementById('ppvnew').value='Moja Gala';ACT.ppvadd();
 console.log('list',G.ppv.map(x=>x.pl).join(' | '));
 ACT.ppvup({dataset:{i:String(G.ppv.length-1)}});console.log('after up',G.ppv.map(x=>x.pl).slice(-3).join(' | '));
 CHG.ppvname({dataset:{i:'0'},value:'Pierwsza Gala'});console.log('name0',ppvName(8),ownBigName(8));
 lang='en';console.log('en',ownBigName(8),ownBigName(12));lang='pl';
 // rotate through endWeek
 G.week=8;console.log('before rotate',ppvName(8),'| next',ppvName(12));ppvRotate();G.week=9;console.log('after',ppvName(12),'| old first now last:',G.ppv[G.ppv.length-1].pl);
 ACT.ppvreset();console.log('reset',G.ppv.length);
 console.log('html ok',document.getElementById('app').innerHTML.includes('Najbliższe')||document.getElementById('app').innerHTML.includes('Upcoming'));console.log('tdone')})();
