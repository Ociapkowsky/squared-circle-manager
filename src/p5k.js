/* ===== round 11g: illustrations in event windows (matched by keywords in the event text) ===== */
const EV_KW=[
 ['ref',/s.{1,2}dzi|referee/i],
 ['comm',/komentator|commentator/i],
 ['ann',/mikrofon|announcer/i],
 ['coach',/trener|coach/i],
 ['movie',/film|movie/i],
 ['album',/singl|album/i],
 ['strong',/si.{1,2}acz|strongman/i],
 ['builder',/kulturyst|bodybuild/i],
 ['influ',/streamer|influenc/i],
 ['sport',/przerwa mi.{1,2}dzy sezon|off-?season/i],
 ['local',/w okolicy|local star|in the area/i],
 ['attack',/zamaskowan|napastnik|napad|zasadz|masked|attack|ambush|assault|sabota|run-?in|wtargni|kapturz|hooded/i],
 ['presser',/konferencj|press conference|presser/i],
 ['backarg',/k.{1,2}tni|b.{1,2}jk[aię]|bijatyk|awantur|brawl|scuffle|fistfight|shoving|bar fight|fight (in|at|before|with)/i],
 ['injury',/kontuzj|uraz|medyk|injur|medic|stretcher|noszach|pogotowi/i],
 ['sponsor',/sponsor/i],
 ['contract',/kontrakt|podpis|contract|signing/i],
 ['crowd',/kibic|tłum|skanduj|fans|crowd|chant/i],
 ['tv',/telewiz|studio|\bTV\b|stacja|broadcast|network/i],
 ['rival',/rywal.*(w[łl]a[śs]ciciel|federacj)|rival (owner|promotion)|konkurencyjn/i],
 ['belt',/\bpas(y|ów|a|ie|em|u)?(?![a-ząćęłńóśźż])|belts?\b|title\b/i],
 ['media',/dziennikarz|podcast|journalist|reporter|wywiad|interview/i],
 ['locker',/szatni|locker/i]
];
function evArtFor(txt){if(typeof EVART==='undefined')return '';for(const [k,re] of EV_KW){if(EVART[k]&&re.test(txt))return EVART[k]}return ''}
(function(){const css=document.createElement('style');css.textContent='.evart{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;margin:0 0 12px;border:1px solid var(--line)}';document.head.appendChild(css)})();
(function(){const _om=openModal;openModal=function(h){
 try{if(typeof h==='string'&&h.indexOf('data-act="evopt"')>=0&&h.indexOf('class="evart"')<0&&h.indexOf('<h2>')===0){
   const mt=h.match(/^<h2>(.*?)<\/h2>/);const src=evArtFor(mt?mt[1].replace(/<[^>]+>/g,' '):'');
   if(src)h='<img class="evart" src="'+src+'" alt="">'+h}}catch(e){}
 return _om.call(this,h)}})();
if(typeof normTexts==='function')normTexts();
