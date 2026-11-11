
if(hasDoc)init();

/* QA fix: six lessons were registered with 4 args (English body landed in the title slot) */
(function(){const EN={talks:'Talks with wrestlers',develop:'Development',profile:'Wrestler profile',press:'Press conferences',media:'Media reputation',transfers:'Transfer market'};
Object.keys(EN).forEach(id=>{const T=D['tut.'+id+'.t'],B=D['tut.'+id+'.b'];if(T&&B&&B[1]===undefined){B[1]=T[1];T[1]=EN[id]}});
if(typeof normTexts==='function')normTexts()})();
