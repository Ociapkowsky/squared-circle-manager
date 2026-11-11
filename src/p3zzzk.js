/* ===== Splash / title screen ===== */
let SPLASH=true;const GAME_VER='1.0';
const _vsSplash=viewStart;
viewStart=function(){
 if(!SPLASH)return _vsSplash();
 const sv=loadSave();
 let h='<div class="spl"><div class="spl-top">'+sndQuick()+'</div><div class="spl-mid"><img class="spl-logo" src="'+LOGO_SRC+'" alt="Squared Circle Manager" width="720" height="480">'
 +'<div class="px spl-tag">'+t('app.tag')+'</div>'
 +'<div class="row spl-btns" style="justify-content:center">'
 +(sv?'<button class="btn gold spl-b" data-act="continue">'+t('start.continue')+'</button>':'')
 +'<button class="btn '+(sv?'':'gold ')+'spl-b" data-act="splashgo">'+t(sv?'spl.new':'spl.play')+'</button></div>'
 +(sv?'<div class="mute" style="font-size:13px">'+esc(sv.fed.name)+' · '+t('common.week',{w:((sv.week-1)%52)+1,y:yearOf(sv.week)})+'</div>':'')
 +'</div><div class="spl-foot"><div class="spl-cr">'+t('spl.by')+'</div><div class="px spl-ver">v'+GAME_VER+'</div>'+'<div class="mute spl-cp">'+t('spl.cp')+'</div></div></div>';
 return h};
Object.assign(D,{
 'spl.play':['Graj','Play'],'spl.new':['Nowa gra','New game'],
 'spl.by':['Stworzone przez <b>Ociapkowsky</b> i <b>Claude</b> (Anthropic)','Created by <b>Ociapkowsky</b> and <b>Claude</b> (Anthropic)'],
 'spl.cp':['© 2026 Ociapkowsky · Darmowa gra fanowska, niekomercyjna i nieoficjalna. Wszystkie federacje, zapaśnicy i nazwy w pakiecie domyślnym są fikcyjne, a ewentualne podobieństwo do prawdziwych osób i organizacji jest przypadkowe. Gra nie jest powiązana z żadną prawdziwą federacją wrestlingu.','© 2026 Ociapkowsky · Free, non-commercial, unofficial fan game. All promotions, wrestlers and names in the default pack are fictional; any resemblance to real people or organisations is coincidental. Not affiliated with any real wrestling promotion.']});
if(hasDoc&&typeof document.head!=='undefined'){try{if(!document.getElementById('splcss')){const s=document.createElement('style');s.id='splcss';s.textContent='.spl{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;padding-block:14px 18px;max-width:900px;margin:0 auto;gap:10px}.spl-top{align-self:flex-end}.spl-top .qs{margin:0}.spl-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center}.spl-logo{width:min(560px,86vw);height:auto;filter:drop-shadow(0 10px 28px color-mix(in srgb,var(--gold) 35%,transparent))}.spl-tag{font-size:9px;letter-spacing:.12em}.spl-b{font-size:20px;padding:12px 38px}.spl-foot{text-align:center;display:flex;flex-direction:column;gap:6px;padding-top:12px;border-top:1px solid var(--line);width:100%}.spl-cr{font-size:14px}.spl-logo{animation:splIn 1.1s cubic-bezier(.2,.8,.2,1) both,splGlow 3.6s ease-in-out 1.1s infinite alternate}.spl-tag{animation:splUp .8s ease .7s both}.spl-btns,.spl-mid>.mute{animation:splUp .8s ease 1s both}.spl-foot{animation:splUp 1s ease 1.3s both}@keyframes splIn{from{opacity:0;transform:scale(.82) translateY(14px);filter:blur(6px)}to{opacity:1;transform:none;filter:drop-shadow(0 10px 28px color-mix(in srgb,var(--gold) 35%,transparent))}}@keyframes splGlow{from{filter:drop-shadow(0 10px 22px color-mix(in srgb,var(--gold) 25%,transparent))}to{filter:drop-shadow(0 12px 40px color-mix(in srgb,var(--gold) 55%,transparent))}}@keyframes splUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.spl *{animation:none!important}}.spl-ver{font-size:8px}.spl-cp{font-size:11px;line-height:1.5;max-width:70ch;margin:0 auto}';document.head.appendChild(s)}}catch(e){}}
