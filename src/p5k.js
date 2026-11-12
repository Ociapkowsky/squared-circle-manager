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
 ['attack',/atak|zamaskowan|napastnik|napad|zasadz|masked|attack|ambush|assault|sabota|run-?in|wtargni|kapturz|hooded/i],
 ['presser',/konferencj|press conference|presser/i],
 ['backarg',/k.{1,2}tni|b.{1,2}jk[aię]|bijatyk|awantur|brawl|scuffle|fistfight|shoving|bar fight|fight (in|at|before|with)/i],
 ['injury',/kontuzj|uraz|medyk|injur|medic|stretcher|noszach|pogotowi/i],
 ['sponsor',/sponsor|inwestor|dotacj|premia|d[łl]ugi|kontrola skarbow|krach|bud[żz]et|investor|grant|bonus|debt|tax audit|crash/i],
 ['contract',/kontrakt|podpis|contract|signing/i],
 ['crowd',/debiutant|furor|kibic|t.{1,2}um|skandow|fani|transparent|konwent|zjazd|festiwal fan|fans|crowd|chant|convention/i],
 ['tv',/telewiz|studio|\bTV\b|stacja|broadcast|network/i],
 ['rival',/rywal|podkup|przej.{1,2}cie federacji|wrogie|konkurencj|rival|poach|takeover/i],
 ['belt',/\bpas(y|ów|a|ie|em|u)?(?![a-ząćęłńóśźż])|belts?\b|title\b/i],
 ['media',/dziennikarz|podcast|journalist|reporter|wywiad|interview/i],
 ['locker',/szatni|locker/i],
 ['board',/(^|[^a-ząćęłńóśźż])rad(a|y|zie|ę|ą)(?![a-ząćęłńóśźż])|zarz[ąa]d|akcjonariusz|board|shareholder|prezes|audytor/i],
 ['techfail',/awari|przeciek.{0,3}ceg|pr.{1,2}du|o.{1,2}wietlen|nag.{1,2}o.{1,2}nien|transmisj|stream|power|outage|lighting|failure/i],
 ['holiday',/halloween|[śs]wi[ęe]ta|noworoczn|walentyn|wielkanoc|gwiazdkow|mikołajki|black friday|christmas|easter|valentine|new year|dzie[ńn] dziecka/i],
 ['merch',/merch|koszulk|wyprzeda[żz]|podr[óo]bk/i],
 ['tour',/tras|podr[óo][żz]|wiz[ay]|bus|autobus|tour|travel|visa/i],
 ['training',/trening|obóz|akademi|mentor|warsztat|seminar|szkol|cwicz|camp|academy|workshop|training/i],
 ['legend',/legend|po[żz]egna|emerytur|ho[łl]d|weteran|ostatnia walka|retire|farewell|veteran|tribute/i],
 ['cards',/kart[ay]|kolekcj|kolekcjoner|autograf|card|collector/i],
 ['stable',/stajn|inwazj|interwencj|invasion|stable/i],
 ['venue',/hal[aęiy]|arena|stadion|dach|remont|sal[aęy]|venue|roof/i],
 ['persona',/posta[ćc]|maska|maski|image|wizerunek|character|mask|persona/i],
 ['scandal',/skandal|pozew|policj|nalot|w[łl]amanie|zatrzymani|afera|wyciek|scandal|lawsuit|police|leak/i],
 ['finale',/fina[łl]\s+feud|stawka fina|feud finale|finale stakes/i],
 ['brand',/brand|\bGM\b|GM-|draft|dwie stacje|wielka gala brand/i],
 ['mgrfight',/zdrad\w* mened|zak[łl]ad mened|starcie mened|mened[żz]er\w* (zmienia|[żz][ąa]da|naciska|traci|chce drugiego)|zwolni[ćc] mened|mened[żz]er\w* kontra/i],
 ['health',/fizjoter|dietety|rehabilit|suplement|operacj|wstrz[ąa][śs]|lekarz|lekarsk|zastrzyk|oferta kliniki|zas[łl]abni|opieka medycz|przepracow|zdrowotn|wellness|physio|doctor|medical/i],
 ['award',/nagrod|jubileusz|rocznic|plebiscyt|promotor roku|promo roku|award|anniversary/i],
 ['finisher',/finisher|kick-out|kickout/i],
 ['charity',/charytat|dobroczyn|plenerow|zbi[óo]rka|bieg|charity|outdoor/i],
 ['family',/rodzin|dynasti|dziedzic|krewn|nepotyz|\brodu\b|pa[łl]eczk|nast[ęe]pca|family|dynasty|heir/i],
 ['social',/viral|wirusow|w sieci|spo[łl]eczno[śs]ciow|kontrowersyjny wpis|\bmemy|q&a|\bboty\b|b[łl][ąa]d bota|ankiet|petycj|wpis|social media|meme|online/i],
 ['ringdmg',/ring si[ęe] [łl]amie|p[ęe]ka lina|pirotechnik|przeciwpo[żz]ar|burza w dniu|[śs]nie[żz]yca|upa[łl] w hali|problem z hal|nowe maty|zabezpiecze|hala odwo[łl]a|awari|broken ring|snapped rope/i],
 ['tagteam',/sojuszni|partner(a|[óo]w|ami|zy)\b|tag team|tag-team|dru[żz]yn|duet|dream team|para dla kamer|alliance|tag partner/i],
 ['negot',/podwy[żz]k|agent|negocjac|przed[łl]u[żz]eni|zagraniczna oferta|stawk[aęi] za wyst|klauzul|umowa zaraz|odnowieni|licytacj|opcja federacji|gwarancja miejsca|wyp[łl]ata z ubezp|raise|negotiat|extension|agent/i],
 ['manager',/menad[żz]er|manager/i]
];
function evArtFor(txt){if(typeof EVART==='undefined')return '';for(const [k,re] of EV_KW){if(EVART[k]&&re.test(txt))return EVART[k]}return ''}
(function(){const css=document.createElement('style');css.textContent='.evart{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;margin:0 0 12px;border:1px solid var(--line)}';document.head.appendChild(css)})();
(function(){const _om=openModal;openModal=function(h){
 try{if(typeof h==='string'&&h.indexOf('data-act="evopt"')>=0&&h.indexOf('class="evart"')<0&&h.indexOf('<h2>')===0){
   const mt=h.match(/^<h2>(.*?)<\/h2>/);const src=evArtFor(mt?mt[1].replace(/<[^>]+>/g,' '):'');
   if(src)h='<img class="evart" src="'+src+'" alt="">'+h}}catch(e){}
 return _om.call(this,h)}})();
if(typeof normTexts==='function')normTexts();
