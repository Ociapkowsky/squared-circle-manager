;/* ===== Tweener X: mentions of the booker with reply choices and consequences + flavour posts ===== */
(function(){
const MEN=[
{s:'fan',pl:"{me} Ostatnia gala? Najlepsza rzecz w tym roku. Dzięki za to, co robicie!",en:"{me} Last show? Best thing all year. Thanks for what you do!",o:[
 ["Dzięki, to dla was!","Thanks, this is for you!",[[1,{pop:.2},"Fani przybijają piątkę.","Fans send high fives."]]],
 ["Dopiero się rozkręcamy 😎","We're only getting started 😎",[[.7,{pop:.4},"Hype robi swoje.","The hype does its thing."],[.3,{pop:-.2},"Fani: „za dużo gadania”.","Fans: “too much talk”."]]],
 ["Lajk i lecę dalej","Like and move on",[[1,{},"Nic się nie stało.","Nothing happened."]]]]},
{s:'fan',pl:"{me} Ten main event to był żart. Poważnie, zatrudnij kogoś, kto umie bookować.",en:"{me} That main event was a joke. Seriously, hire someone who can book.",o:[
 ["Przepraszam, popracujemy nad tym","Sorry, we'll work on it",[[.8,{pop:.1,conf:1},"Docenili szczerość.","They appreciated the honesty."],[.2,{pop:-.1},"Ktoś dopisał: „za późno”.","Someone added: “too late”."]]],
 ["Bookuję lepiej, niż ty komentujesz","I book better than you comment",[[.4,{pop:.5},"Post zrobił się viralem na plus.","The post went viral, positively."],[.6,{pop:-.5,conf:-1},"Fani nie darowali tonu.","Fans didn't forgive the tone."]]],
 ["Zapraszam na gratis bilet","Here's a free ticket on me",[[1,{pop:.3,cash:-300},"Miły gest, post poszedł w świat.","Nice gesture, the post spread."]]],
 ["Dziękuję za opinię","Thanks for the feedback",[[1,{},"Poprawnie, bez fajerwerków.","Correct, no fireworks."]]]]},
{s:'rival',pl:"{me} {r} to jedyna prawdziwa liga. Reszta to amatorzy.",en:"{me} {r} is the only real league. The rest are amateurs.",o:[
 ["Spotkamy się w ringu. Wasze karty są nudne.","See you in the ring. Your cards are boring.",[[.55,{pop:.5,rpop:-.8},"Internet stanął po Twojej stronie.","The internet sided with you."],[.45,{pop:-.4},"Rywal odpowiedział lepiej.","The rival replied better."]]],
 ["Życzę powodzenia","Good luck to you",[[1,{pop:.1,conf:1},"Klasa. Zarząd to widział.","Class act. The board noticed."]]],
 ["Wyzwanie: porównajmy widownię","Challenge: let's compare attendance",[[.5,{pop:.8,rpop:-1.2},"Wygrałeś porównanie, rywal się wycofał.","You won the comparison, the rival backed off."],[.5,{pop:-.8,conf:-2},"Liczby nie wyszły po Twojej myśli.","The numbers did not go your way."]]],
 ["Bez komentarza","No comment",[[1,{},"Rywal zostaje bez odpowiedzi.","The rival is left without a reply."]]]]},
{s:'wire',pl:"{me} Szefie, krążą plotki o wielkim podpisaniu. Potwierdzisz?",en:"{me} Boss, rumors say a big signing is coming. Care to confirm?",o:[
 ["Bez komentarza","No comment",[[1,{},"Plotki żyją własnym życiem.","The rumors live on."]]],
 ["Tak, i będzie hałas! 🔥","Yes, and it'll be loud! 🔥",[[.5,{pop:.6},"Fani oszaleli z ciekawości.","Fans went wild with curiosity."],[.5,{pop:-.5,conf:-1},"Fani czują się wyrolowani.","Fans feel misled."]]],
 ["To tylko plotki","Just rumors",[[1,{conf:1},"Spokojna reakcja zarządu.","The board is calm about it."]]],
 ["Może… 😏","Maybe… 😏",[[.7,{pop:.3},"Zainteresowanie rośnie.","Interest is growing."],[.3,{},"Nikt nie wie, co myśleć.","Nobody knows what to think."]]]]},
{s:'roster',pl:"{me} Szefie, tu {w}. Czuję, że zasługuję na szansę walki o pas.",en:"{me} Boss, it's {w}. I feel I deserve a title shot.",o:[
 ["Zasłużysz w ringu","Earn it in the ring",[[1,{mw:2},"{w} kiwa głową i trenuje dalej.","{w} nods and keeps training."]]],
 ["Obiecuję, pomyślę o tym","Promise, I'll think about it",[[.7,{mw:8},"{w} jest podekscytowany.","{w} is excited."],[.3,{mw:-5},"{w} oczekuje konkretów i się obraził.","{w} expected specifics and sulked."]]],
 ["Nie ten czas","Not the time",[[1,{mw:-6},"{w} nie jest zadowolony.","{w} is not happy."]]],
 ["Widzę w tobie potencjał","I see potential in you",[[1,{mw:5,pop:.1},"{w} urósł w oczach fanów.","{w} grew in the fans' eyes."]]]]},
{s:'brand',pl:"{me} Tu {w}. Zauważyliśmy Waszą federację i chcielibyśmy porozmawiać o współpracy.",en:"{me} {w} here. We noticed your promotion and we'd like to talk partnership.",o:[
 ["Pogadajmy, wyślij DM","Let's talk, send a DM",[[.7,{cashk:1.5},"Podpisano drobny deal sponsorski.","A small sponsor deal was signed."],[.3,{pop:-.3},"Marka okazała się dziwna, fani kręcą nosem.","The brand turned out weird, fans frowned."]]],
 ["Nie, dziękuję","No, thanks",[[1,{},"Zamknięty temat.","Topic closed."]]],
 ["Tylko bez nachalnych reklam","Only without pushy ads",[[.6,{cashk:1,pop:.2},"Rozsądny kompromis.","A sensible compromise."],[.4,{},"Marka się wycofała.","The brand backed out."]]]]},
{s:'fan',pl:"{me} Czy federacja wesprze zbiórkę dla dziecięcego szpitala? Każdy grosz się liczy.",en:"{me} Will the promotion support the children's hospital fundraiser? Every bit counts.",o:[
 ["Pewnie, wpłacamy","Of course, we'll donate",[[1,{cashk:-.7,pop:.6,mor:2,conf:1},"Szatnia dumna, fani wzruszeni.","Locker room proud, fans touched."]]],
 ["Zorganizujmy galę charytatywną","Let's run a charity show",[[1,{cashk:-1.3,pop:1,mor:3,conf:2},"Wielki ruch, pozytywny szum.","Big move, positive buzz."]]],
 ["Nie tym razem","Not this time",[[.7,{},"Bez echa.","No echo."],[.3,{pop:-.3},"Ktoś zwrócił uwagę na brak reakcji.","Someone noticed the lack of response."]]]]},
{s:'fan',pl:"{me} Ceny biletów są kosmiczne. Dla rodziny to naprawdę wydatek.",en:"{me} Ticket prices are huge. For a family it's a real expense.",o:[
 ["Wprowadzimy tańsze miejsca","We'll add cheaper seats",[[1,{pop:.4,cashk:-.6},"Fani doceniają.","Fans appreciate it."]]],
 ["Jakość kosztuje","Quality costs money",[[.5,{conf:1},"Zarząd zadowolony ze stanowczości.","The board likes the firmness."],[.5,{pop:-.4},"Fani nie kupili tej odpowiedzi.","Fans didn't buy that answer."]]],
 ["Dzieci za pół ceny na następnej gali","Kids half price at the next show",[[1,{pop:.5,cashk:-.8},"Rodziny zacierają ręce.","Families are delighted."]]]]},
{s:'fan',pl:"{me} Słyszałem, że sprzedajesz federację. Prawda?!",en:"{me} I heard you're selling the promotion. True?!",o:[
 ["Fake news, federacja zostaje!","Fake news, the promotion stays!",[[.8,{pop:.2,conf:1},"Plotka ucięta.","Rumor shut down."],[.2,{pop:-.1},"Nie wszyscy uwierzyli.","Not everyone believed it."]]],
 ["Może za dobrą cenę…","Maybe for the right price…",[[.6,{conf:-3,pop:-.4},"Zarząd zbladł, fani zdenerwowani.","The board went pale, fans got nervous."],[.4,{pop:.3},"Fani uznali to za żart.","Fans took it as a joke."]]],
 ["Bez komentarza","No comment",[[1,{conf:-1},"Cisza podsyciła plotki.","Silence fueled the rumors."]]]]},
{s:'fan',pl:"{me} Który zawodnik to Twój faworyt w historii federacji? Mamy spór w pubie!",en:"{me} Who's your all-time favorite in the promotion? We have a pub argument!",o:[
 ["Nie wybiorę, kocham wszystkich","Can't pick, I love them all",[[1,{mor:2},"Szatnia się uśmiecha.","The locker room smiles."]]],
 ["Powiem tak: {w}","I'll say this: {w}",[[1,{mw:7,mor:-1,pop:.1},"{w} się cieszy, reszta trochę mniej.","{w} is thrilled, the rest less so."]]],
 ["Moim faworytem jest widownia","My favorite is the audience",[[1,{pop:.3},"Fani podbijają posta.","Fans boost the post."]]]]},
{s:'fan',pl:"{me} Zrobiłem mema z Twojej miny przy ostatniej gali 😂",en:"{me} I made a meme out of your face at the last show 😂",o:[
 ["Wrzuć na ścianę sławy","Put it on the wall of fame",[[.7,{pop:.4},"Mem poszedł w świat.","The meme took off."],[.3,{pop:.1},"Trochę się pośmiali.","They had a small laugh."]]],
 ["Dostaniesz pozew 😅","You'll get sued 😅",[[1,{pop:.2},"Fani się śmieją.","Fans laugh."]]],
 ["Pokażę ekipie","Showing it to the crew",[[1,{mor:2},"Ekipa ryczy ze śmiechu.","The crew is roaring."]]]]},
{s:'wire',pl:"{me} Wywiad dla Ring Wire w tym tygodniu? Pięć pytań, szczerze.",en:"{me} An interview for Ring Wire this week? Five questions, honest ones.",o:[
 ["Chętnie","Gladly",[[.6,{pop:.5,conf:1},"Wywiad wypadł świetnie.","The interview went great."],[.4,{pop:-.3,conf:-1},"Dziennikarz wyciął najgorszy cytat.","The reporter pulled the worst quote."]]],
 ["Nie udzielam wywiadów","No interviews",[[1,{},"Spokój.","Quiet."]]]]}];
const FLV=[["Kto jedzie na następną galę? Szukam miejsc w ekipie.","Who's going to the next show? Looking for seats in a group."],["Ranking jedzenia na hali: hot-dogi vs nachos. Głosujcie.","Arena food ranking: hot dogs vs nachos. Vote."],["Mój syn pierwszy raz na gali. Teraz chce zostać wrestlerem.","My son's first live show. Now he wants to be a wrestler."],["Przypomnienie: dziś prawdziwy wrestling, nie scenariusz serialu.","Reminder: real wrestling tonight, not a TV plot."],["Moja babcia ogląda {f} i krzyczy na sędziego. Jestem dumny.","My grandma watches {f} and yells at the referee. So proud."],["Pytanie dnia: najlepszy finisher w historii?","Question of the day: best finisher ever?"],["Sprzedam stare plakaty {f}. Kolekcjonerzy, piszcie.","Selling old {f} posters. Collectors, DM me."],["Pierwszy rząd przy ringu to najlepszy wydatek roku.","Front row at ringside is the best spend of the year."],["Każdy tydzień bez wrestlingu to stracony tydzień.","Every week without wrestling is a lost week."],["Kto ma ochotę na wspólne oglądanie? Przynoszę przekąski.","Anyone up for a watch party? I'm bringing snacks."],["Pogoda piękna, a ja i tak siedzę w domu i oglądam galę.","Beautiful weather and I'm still home watching the show."],["Czy ktoś pamięta pierwszą galę {f}? Ja tak, i płakałem.","Anyone remember the first {f} show? I do, and I cried."]];
MEN.forEach((m,i)=>{D['tw.mt'+i]=[m.pl,m.en];TWGEN['mt'+i]='gf'});
FLV.forEach((m,i)=>{D['tw.fl'+i]=m;TWGEN['fl'+i]='gf'});
Object.assign(D,{'tw.mentag':['@ Oznaczył Cię','@ Mentioned you'],'tw.fx.pop':['Popularność','Popularity'],'tw.fx.conf':['Zaufanie zarządu','Board confidence'],'tw.fx.cash':['Gotówka','Cash'],'tw.fx.mor':['Morale ekipy','Roster morale'],'tw.fx.mw':['Morale {w}','{w} morale'],'tw.fx.rpop':['{r}','{r}'],'tw.reply2':['Twoja odpowiedź:','Your reply:'],'tw.risk':['🎲 ryzyko','🎲 risky'],'tw.fxnone':['bez zmian','no change']});
const nf=x=>(x>0?'+':'−')+String(Math.abs(x)).replace('.',lang==='pl'?',':'.');
function apply(p,fx){const out=[];const pop=G.fed.pop;
 if(fx.pop){G.fed.pop=clamp(G.fed.pop+fx.pop,2,100);out.push(['pop',fx.pop])}
 if(fx.conf){const b=boardEnsure();b.conf=clamp(b.conf+fx.conf,0,100);out.push(['conf',fx.conf])}
 if(fx.cash||fx.cashk){const c=fx.cash||Math.round(fx.cashk*(800+G.fed.pop*60));G.fed.cash+=c;out.push(['cash',c])}
 if(fx.mor){mine().forEach(w=>evMood(w,fx.mor));out.push(['mor',fx.mor])}
 if(fx.mw){const w=twW(p.v.w);if(w)evMood(w,fx.mw);out.push(['mw',fx.mw])}
 if(fx.rpop){const r=G.rivals.find(x=>x.id===p.v.rid);if(r)r.pop=clamp(r.pop-(-fx.rpop),3,99);out.push(['rpop',fx.rpop])}
 return out}
function fxHtml(p){const parts=(p.rfx||[]).map(a=>{const k=a[0],v=a[1];let lab=t('tw.fx.'+k,{w:p.v.w||'',r:p.v.r||''});
  const val=k==='cash'?(v>0?'+':'−')+money(Math.abs(v)):nf(v);return '<span class="tag" style="color:'+(v>=0?'#2f9e44':'#d6336c')+'">'+esc(lab)+' '+esc(val)+'</span>'});
 return '<div class="stack" style="gap:4px;padding:6px 0 0"><div class="mute" style="font-size:13px">'+esc(t('tw.reply2'))+' <b>'+esc(p.chosen)+'</b></div><div style="font-size:14px">➜ '+esc(p.rtext)+'</div><div class="row" style="gap:6px;flex-wrap:wrap">'+(parts.length?parts.join(''):'<span class="mute" style="font-size:13px">'+esc(t('tw.fxnone'))+'</span>')+'</div></div>'}
function menHtml(p,m){if(p.done)return fxHtml(p);
 return '<div class="stack" style="gap:6px;padding:6px 0 0"><div class="row" style="gap:6px;flex-wrap:wrap">'+m.o.map((o,i)=>'<button class="btn sm" data-act="twmen" data-id="'+p.id+'" data-o="'+i+'" style="white-space:normal;text-align:left">'+esc(t_(o,p))+(o[2].length>1?' <span class="mute" style="font-size:12px">'+esc(t('tw.risk'))+'</span>':'')+'</button>').join('')+'</div></div>'}
function t_(o,p){const s=lang==='pl'?o[0]:o[1];return s.replace(/\{w\}/g,p.v.w||'')}
const _tp4=twPost;twPost=function(p){let h=_tp4.apply(this,arguments);const mm=/^mt(\d+)$/.exec(p.k);if(!mm)return h;
 try{const m=MEN[+mm[1]];h=h.replace(/^<div class="card stack"/,'<div class="card stack" style="gap:8px;border-left:3px solid var(--gold,#c9a227)"');
  h=h.replace(/(<div class="mute" style="font-size:13px">💬)/,'<div style="font-size:12px;color:var(--gold)">'+esc(t('tw.mentag'))+'</div>$1');
  h=h.replace(/(<div class="row" style="gap:6px;flex-wrap:nowrap"><div><select)/,menHtml(p,m)+'$1');
  if(h.indexOf('data-act="twmen"')<0&&!p.done)h=h.replace(/(<div><select class="field" data-chg="twquick")/,menHtml(p,m)+'$1');
  if(p.done&&h.indexOf(esc(t('tw.reply2')))<0)h=h.replace(/(<div><select class="field" data-chg="twquick")/,fxHtml(p)+'$1')}catch(e){}return h};
Object.assign(ACT,{twmen(e){const id=+e.dataset.id,p=(G.tw||[]).find(x=>x.id===id);if(!p||p.done)return;const mm=/^mt(\d+)$/.exec(p.k);if(!mm)return;
 const m=MEN[+mm[1]],o=m.o[+e.dataset.o];if(!o)return;let r=rnd(),br=o[2][o[2].length-1];for(const b of o[2]){r-=b[0];if(r<=0){br=b;break}}
 p.rfx=apply(p,br[1]);p.done=1;p.chosen=t_(o,p);p.rtext=(lang==='pl'?br[2]:br[3]).replace(/\{w\}/g,p.v.w||'');p.rpl=br[2].replace(/\{w\}/g,p.v.w||'');p.ren=br[3].replace(/\{w\}/g,p.v.w||'');p.rtext=lang==='pl'?p.rpl:p.ren;
 p.chosen=(lang==='pl'?o[0]:o[1]).replace(/\{w\}/g,p.v.w||'');
 p.c.push({u:'you',hn:twHandle(),raw:p.chosen,lk:0});
 if(rnd()<.75)p.c.push({u:pickR(G.fans).h,k:pickR(TWC.reply.x),lk:Math.floor(rnd()*6)});
 save();render()}});
/* weekly generator */
function handleOf(){const n=(G.me&&G.me.name)||'booker';return '@'+(String(n).split(/\s+/)[0].normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]/g,'')||'booker')}
const BRANDS=['NovaDrink','Brightwave','PixelPop','HeavyDuty Gear','IronRoots Coffee'];
function twMentionWeekly(){twEnsure();
 const open=G.tw.filter(p=>/^mt\d+$/.test(p.k)&&!p.done).length;
 if(open<3&&rnd()<.4){const i=Math.floor(rnd()*MEN.length),m=MEN[i];let acc,v={me:handleOf()};
  if(m.s==='fan')acc='fan:'+pickR(G.fans).h;
  else if(m.s==='wire')acc='wire';
  else if(m.s==='rival'){const r=pickR(G.rivals);if(!r)return;acc='r:'+r.id;v.r=r.name;v.rid=r.id}
  else if(m.s==='roster'){const w=pickR(mine());if(!w)return;acc='fan:@'+w.name.replace(/\s+/g,'_');v.w=w.name}
  else{const b=pickR(BRANDS);acc='fan:@'+b.replace(/\s+/g,'_');v.w=b}
  if(m.pl.indexOf('{w}')>=0&&!v.w){const w=pickR(mine());if(w)v.w=w.name}
  const np=twAdd('mt'+i,v,acc,0);np.c=[]}
 if(rnd()<.45){const i=Math.floor(rnd()*FLV.length);twAdd('fl'+i,{},'fan:'+pickR(G.fans).h,(rnd()-.4)*.8)}}
const _tw=twWeekly;twWeekly=function(){_tw.apply(this,arguments);try{twMentionWeekly()}catch(e){}};
})();
if(typeof normTexts==="function")normTexts();
