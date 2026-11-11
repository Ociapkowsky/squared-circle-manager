// ---- v83: character creator (your booker) ----
const ME_BG=['ex','jour','biz','fan','heir'],ME_TR=['fin','tv','pres'];
const ME_FX={ex:{cash:.9,conf:0,pat:1,mor:.2,stars:0},jour:{cash:1,conf:-5,pat:1,mor:0,stars:.03,buzz:.03},biz:{cash:1.15,conf:5,pat:1.1,mor:-.1,stars:0},fan:{cash:1,conf:0,pat:.92,mor:.05,stars:.06},heir:{cash:1.25,conf:8,pat:1,mor:-.1,stars:-.04}};
let START_ME=null;
function meInit(){if(!START_ME){START_ME={name:'',g:'m',bg:'ex',tr:'fin',country:'PL',look:randLook(Math.random,'PL',false)}}return START_ME}
const _ngm=newGame;
newGame=function(id,c){_ngm(id,c);try{const s=meInit(),fx=ME_FX[s.bg]||ME_FX.ex;
 G.me={name:(s.name||'').trim()||t('me.defname'),g:s.g,bg:s.bg,tr:s.tr,look:JSON.parse(JSON.stringify(s.look))};
 G.fed.cash=Math.round(G.fed.cash*fx.cash);const b=boardEnsure();b.conf=clamp(b.conf+fx.conf,0,100);b.pat*=fx.pat;
 const m=memEnsure();const x=m.find(y=>y.r===s.tr);if(x)x.t=clamp(x.t+15,0,100);const o=m.find(y=>y.r!==s.tr&&y.r!=='pres');if(o)o.t=clamp(o.t-5,0,100)}catch(e){}};
function meFx(){return G&&G.me?ME_FX[G.me.bg]:null}
function meStars(){const f=meFx();return f?f.stars:0}
const _iw=infraWeekly;
infraWeekly=function(){_iw();const f=meFx();if(!f)return;if(f.mor)mine().forEach(w=>{w.morale=clamp(w.morale+f.mor,0,100)});if(f.buzz&&G.fed.pop<60)G.fed.pop=clamp(G.fed.pop+f.buzz,2,100)};
function meCardHtml(){const s=meInit();
 const sel=(id,arr,cur,pfx)=>'<select id="'+id+'" class="field" style="width:auto" data-chg="'+id+'">'+arr.map(v=>'<option value="'+v+'"'+(cur===v?' selected':'')+'>'+t(pfx+'.'+v)+'</option>').join('')+'</select>';
 return '<div class="card"><div class="row" style="align-items:flex-start;flex-wrap:wrap;gap:14px"><div class="av" style="padding:8px">'+avatar(s.look,96)+'</div><div class="stack" style="gap:8px;flex:1;min-width:220px"><h3>'+t('me.h')+'</h3>'+
  '<div class="row"><input id="mename" class="field" style="width:200px" maxlength="24" placeholder="'+esc(t('me.defname'))+'" value="'+esc(s.name)+'" data-chg="mename"> '+sel('mebg',ME_BG,s.bg,'me.bg')+' '+sel('metr',ME_TR,s.tr,'me.tr')+'</div>'+
  '<div class="mute" style="font-size:13px">'+t('me.bg.'+s.bg+'.d')+'</div><div class="mute" style="font-size:13px">'+t('me.tr.'+s.tr+'.d')+'</div>'+
  '<div class="row"><button class="btn sm" data-act="meedit">'+t('me.edit')+'</button><button class="btn sm" data-act="merandom">'+t('av.random')+'</button><button class="btn sm'+(s.g==='m'?' gold':'')+'" data-act="meg" data-v="m">'+t('me.m')+'</button><button class="btn sm'+(s.g==='f'?' gold':'')+'" data-act="meg" data-v="f">'+t('me.f')+'</button></div></div></div></div>'}
const _vs=viewStart;
viewStart=function(){let h=_vs();const k='<div class="row"><label class="px" for="sd"';const i=h.indexOf(k);return i<0?h:h.slice(0,i)+meCardHtml()+h.slice(i)};
const _cdh=councilHtml;
councilHtml=function(){let p='';if(G.me){const f=ME_FX[G.me.bg];p='<div class="card"><div class="row" style="flex-wrap:nowrap;gap:12px"><div class="av" style="padding:6px">'+avatar(G.me.look,72)+'</div><div><b>'+esc(G.me.name)+'</b><div class="mute" style="font-size:13px">'+t('me.title')+' · '+t('me.bg.'+G.me.bg)+' · '+t('me.tr.'+G.me.tr)+'</div></div></div></div>'}return p+_cdh()};
function meEditor(){
 const id='me',w=START_ME,l=w.look;
 const sw=(k,arr,cur)=>'<div class="sw">'+arr.map((c,i)=>'<button style="background:'+c+'" class="'+(cur===i?'on':'')+'" data-act="melook" data-id="'+id+'" data-k="'+k+'" data-v="'+i+'" aria-label="'+k+' '+(i+1)+'"></button>').join('')+'</div>';
 const tx=(k,arr,cur,pfx)=>'<div class="sw">'+arr.map(v=>'<button class="txt'+(cur===v?' on':'')+'" data-act="melook" data-id="'+id+'" data-k="'+k+'" data-v="'+v+'">'+t(pfx+'.'+v)+'</button>').join('')+'</div>';
 return '<div class="row spread"><h2>'+t('av.title')+'</h2><button class="btn gold" data-act="meclose">'+t('av.close')+'</button></div><div class="row" style="align-items:flex-start;flex-wrap:nowrap"><div class="av" style="padding:10px">'+avatar(l,150)+'</div><div class="stack" style="gap:8px;min-width:0"><b>'+esc(w.name)+'</b><button class="btn sm" data-act="merand" data-id="'+id+'">'+t('av.random')+'</button></div></div>'+
  '<div class="px">'+t('av.build')+'</div>'+tx('build',BUILDS,l.build||'std','bld')+'<div class="px">'+t('av.skin')+'</div>'+sw('skin',SKIN,l.skin)+'<div class="px">'+t('av.hair')+'</div>'+tx('hair',HAIRS,l.hair,'hs')+'<div class="px">'+t('av.hairc')+'</div>'+sw('hairC',HAIRC,l.hairC)+
  '<div class="px">'+t('av.beard')+'</div>'+tx('beard',BEARDS,l.beard||'none','bd')+'<div class="px">'+t('av.beardc')+'</div>'+sw('beardC',HAIRC,l.beardC==null?l.hairC:l.beardC)+
  '<div class="px">'+t('av.outfit')+'</div>'+tx('outfit',OUTFITS,l.outfit,'of')+'<div class="px">'+t('av.outc')+'</div>'+sw('outC',OUTC,l.outC)+'<div class="px">'+t('av.o2')+'</div>'+sw('o2',OUTC,l.o2==null?((l.outC||0)+3)%OUTC.length:l.o2)+
  '<div class="px">'+t('av.acc')+'</div>'+tx('acc',ACCS,l.acc||'none','acc')+'<div class="px">'+t('av.neck')+'</div>'+tx('neck',NECKS,l.neck||'none','nk')+'<div class="px">'+t('av.gear')+'</div>'+tx('gear',GEARS,l.gear||'none','gear')+'<div class="px">'+t('av.face')+'</div>'+tx('face',FACES,l.face||'none','face')+
  '<div class="px">'+t('av.mask')+'</div>'+tx('mask',MASKS,l.mask||'none','mk')+'<div class="px">'+t('av.maskc')+'</div>'+sw('maskC',OUTC,l.maskC);
}
Object.assign(D,{
 'me.h':['Twoja postać – booker','Your character – the booker'],'me.defname':['Booker','Booker'],'me.title':['Booker federacji','Federation booker'],'me.edit':['Wygląd','Look'],'me.m':['Mężczyzna','Male'],'me.f':['Kobieta','Female'],
 'me.bg.ex':['Były zawodnik','Ex-wrestler'],'me.bg.jour':['Dziennikarz','Journalist'],'me.bg.biz':['Biznesmen','Businessman'],'me.bg.fan':['Fan z pasją','Passionate fan'],'me.bg.heir':['Spadkobierca','Heir'],
 'me.bg.ex.d':['Szatnia Cię szanuje: morale zawodników rośnie szybciej. Start z mniejszą gotówką (−10%).','The locker room respects you: morale recovers faster. Starts with less cash (−10%).'],
 'me.bg.jour.d':['Znasz media: małe federacje zyskują darmowy rozgłos, walki ciut lepiej się sprzedają. Rada traktuje Cię jak outsidera (−5 zaufania na start).','You know the media: small feds get free buzz, matches sell slightly better. The board sees you as an outsider (−5 trust at start).'],
 'me.bg.biz.d':['Start z +15% gotówki i większym zaufaniem rady (+5), jej cierpliwość jest większa. Szatnia czuje chłód (morale rośnie wolniej).','Start with +15% cash and more board trust (+5), and the board is more patient. The locker room feels cold (slower morale).'],
 'me.bg.fan.d':['Czujesz, czego chcą fani: walki dostają więcej gwiazdek. Rada jest mniej cierpliwa.','You feel what fans want: matches earn more stars. The board is less patient.'],
 'me.bg.heir.d':['Start z +25% gotówki i zaufaniem rady (+8). Za to walki są trochę słabiej oceniane, a szatnia traktuje Cię z dystansem.','Start with +25% cash and board trust (+8). But matches rate slightly lower and the locker room keeps its distance.'],
 'me.tr.fin':['Finansista','Money man'],'me.tr.tv':['Człowiek telewizji','TV person'],'me.tr.pres':['Prestiżysta','Prestige seeker'],
 'me.tr.fin.d':['Członek rady od finansów ufa Ci od początku (+15), telewizyjny trochę mniej.','The board\'s finance member trusts you from day one (+15), the TV member a bit less.'],
 'me.tr.tv.d':['Członek rady od telewizji ufa Ci od początku (+15), od finansów trochę mniej.','The board\'s TV member trusts you from day one (+15), the finance member a bit less.'],
 'me.tr.pres.d':['Członek rady od prestiżu ufa Ci od początku (+15), finansista trochę mniej.','The board\'s prestige member trusts you from day one (+15), the finance member a bit less.']});
