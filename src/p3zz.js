// ---- v99: retirement into a GM role (and retired legends as GM candidates) ----
const isGmRole=r=>r==='gmA'||r==='gmB';
const gmRoleB=r=>r==='gmA'?'A':'B';
function gmFit(w){return clamp(Math.round((w.psy||40)*.3+(w.mic||40)*.2+(w.cha||40)*.2+(w.tec||40)*.15+w.pop*.15+(w.age>=33?6:0)),20,95)}
function gmFree(r){return brOn()&&isGmRole(r)&&!gmOf(gmRoleB(r))}
function gmFocusOf(w){const c=(w.psy||40)*.5+(w.tec||40)*.3+(w.ring||40)*.2,p=(w.cha||40)*.5+(w.mic||40)*.3+w.pop*.2,b=(w.psy||40)*.4+(w.mic||40)*.2+30;return c>=p&&c>=b?'creative':p>=b?'people':'business'}
function gmFromW(w,b,disc){const s=clamp(gmFit(w)+(w.pop>=60?4:0),20,96);const x={id:'gmw'+w.id,n:w.name,g:w.g==='f'?'f':'m',cc:w.country,s,f:gmFocusOf(w),look:w.look||randLook(Math.random,w.country,w.g==='f'),since:G.week,sal:Math.round(gmSal(s)*(disc||1)/100)*100,fromW:w.id,legend:w.pop>=45};
 gmEnsure()[b]=x;w.staffed='gm';return x}
const _ra1=retAnswer;retAnswer=function(w,weeks,role){if(!isGmRole(role))return _ra1(w,weeks,role);
 if(!gmFree(role))return _ra1(w,weeks,'');const p=clamp(retireWill(w)+.08,.05,.97),r=rnd();
 if(r<p)return{res:'ok',weeks,role};if(r<p+(1-p)*.45)return{res:'counter',weeks:weeks<52?52:13,role,why:'time'};return{res:'no'}};
const _sf1=startFarewell;startFarewell=function(w,weeks,role){if(!isGmRole(role))return _sf1(w,weeks,role);
 if(!gmFree(role)){role='';addNews('n.rolefull')}if(!role)return _sf1(w,weeks,'');
 if(weeks<=0){finishRetire(w,role);return}
 w.farewell={left:weeks,total:weeks,role};w.contract=Math.max(w.contract,weeks+1);w.morale=clamp(w.morale+4,0,100);addNews('n.farewell',{w:w.name,n:wks(weeks)})};
const _fr1=finishRetire;finishRetire=function(w,role){if(!isGmRole(role))return _fr1(w,role);
 if(!gmFree(role))return _fr1(w,'');const b=gmRoleB(role);gmFromW(w,b,.85);delete w.farewell;w.fed='RET';addNews('n.retgm',{w:w.name,b:brLbl(b)});purgeW(w.id);try{bkXp(30)}catch(e){}};
const _rm1=retModal;retModal=function(){let h=_rm1();if(!brOn())return h;const r=G.ret,w=r&&W(r.id);if(!w||r.counter||r.done)return h;
 const key='</select><div class="row"><button class="btn gold" data-act="retsend">';if(h.indexOf(key)<0)return h;
 const opts=['A','B'].map(b=>{const rr='gm'+b,full=!!gmOf(b);return '<option value="'+rr+'"'+(r.role===rr?' selected':'')+(full?' disabled':'')+'>'+t('sr.'+rr)+' · '+t('stf.fit',{n:gmFit(w)})+(full?' · '+t('stf.full'):'')+'</option>'}).join('');
 return h.replace(key,opts+key)};
const _gf1=gmFire;gmFire=function(b){const x=gmOf(b);const ok=_gf1(b);if(ok&&x&&x.fromW){const w=W(x.fromW);if(w)w.staffed=0}return ok};
const _bm1=brMerge;brMerge=function(){const g=brOn()&&gmEnsure();const xs=g?[g.A,g.B]:[];const ok=_bm1();if(ok)xs.forEach(x=>{if(x&&x.fromW){const w=W(x.fromW);if(w)w.staffed=0}});return ok};
function gmLegends(){return G.ws.filter(w=>w.fed==='RET'&&!w.staffed&&!w.ext&&w.pop>=30&&w.name&&w.look).sort((a,b)=>gmFit(b)-gmFit(a)).slice(0,4)}
function gmHireLegend(id,b){const w=W(id);if(!brOn()||!w||w.fed!=='RET'||w.staffed||gmOf(b))return false;const s=clamp(gmFit(w)+(w.pop>=60?4:0),20,96),sal=Math.round(gmSal(s)*.85/100)*100,fee=sal*6;if(G.fed.cash<fee)return false;
 G.fed.cash-=fee;gmFromW(w,b,.85);addNews('n.gmhire',{n:w.name,b:brLbl(b)});return true}
const _gc1=gmCands;gmCands=function(){const h=_gc1();if(!brOn())return h;const l=gmLegends();if(!l.length)return h;const g=gmEnsure();
 return h+'<div class="card stack"><h3>'+t('gm.leg.h')+'</h3><div class="mute" style="font-size:13px">'+t('gm.leg.n')+'</div>'+l.map(w=>{const s=clamp(gmFit(w)+(w.pop>=60?4:0),20,96),sal=Math.round(gmSal(s)*.85/100)*100;
  return '<div class="row spread" style="gap:8px;flex-wrap:wrap;align-items:center"><span class="row" style="gap:8px;align-items:center"><span class="av" style="padding:2px">'+avatar(w.look,36)+'</span><span><b>'+esc(w.name)+'</b> <span class="mute">· '+t('dv.pop',{p:Math.round(w.pop)})+' · '+t('gm.skill',{s})+' · '+t('gm.f.'+gmFocusOf(w))+' · '+t('gm.sal',{m:money(sal)})+'</span></span></span><span class="row" style="gap:6px">'+['A','B'].map(b=>'<button class="btn sm" data-act="gmhirel" data-id="'+w.id+'" data-b="'+b+'"'+(!g[b]&&G.fed.cash>=sal*6?'':' disabled')+'>'+t('gm.hire',{b:brLbl(b),m:money(sal*6)})+'</button>').join('')+'</span></div>'}).join('')+'</div>'};
const _iwz=infraWeekly;infraWeekly=function(){_iwz();G.ws.forEach(w=>{if(w.staffed==='gm'&&!(brOn()&&['A','B'].some(b=>gmOf(b)&&gmOf(b).fromW===w.id)))w.staffed=0})};
// event: an aging star proposes to retire into a GM role
XE({k:'retgm',t:['Gwiazda myśli o emeryturze','A star thinks about retiring'],b:['{w} ({a} lat) mówi, że czas zakończyć karierę, ale chętnie poprowadziłby brand {b} jako generalny menadżer.','{w} ({a}) says it is time to retire, but would gladly run the {b} brand as general manager.'],
 v:()=>{const w=pickR(mine().filter(x=>!x.ext&&x.age>=34&&x.pop>=40&&!isChamp(x.id)&&!x.farewell));const b=['A','B'].find(x=>!gmOf(x));return {w:w?w.name:'?',a:w?w.age:0,id:w?w.id:'',b:b?brLbl(b):'',bk:b||''}},
 o:[['Zgódź się (krótkie pożegnanie)','Agree (short farewell)'],['Poproś, żeby jeszcze został','Ask him to stay']],
 gate:()=>brOn()&&(!gmOf('A')||!gmOf('B'))&&mine().some(x=>!x.ext&&x.age>=34&&x.pop>=40&&!isChamp(x.id)&&!x.farewell),
 n:[['Zaczyna się jego pożegnanie, a potem obejmie brand.','His farewell begins, then he takes over the brand.'],['Zostaje jeszcze na jakiś czas, nastrój lekko spada.','He stays for a while, but his mood dips.']],
 fx:[v=>{const w=W(v.id);if(w&&v.bk)startFarewell(w,4,'gm'+v.bk)},v=>{const w=W(v.id);if(w){evMood(w,-4);w.retCD=G.week+30}}]});
Object.assign(D,{'sr.gmA':['GM brandu Czerwony','GM of the Red brand'],'sr.gmB':['GM brandu Niebieski','GM of the Blue brand'],'n.retgm':['{w} kończy karierę i zostaje GM-em brandu {b}.','{w} retires and becomes GM of the {b} brand.'],
 'gm.leg.h':['Legendy na emeryturze','Retired legends'],'gm.leg.n':['Byli zawodnicy, którzy skończyli karierę, mogą zostać GM-ami. Są nieco tańsi od kandydatów z rynku, a ich nazwiska budują markę.','Retired wrestlers can become GMs. They are slightly cheaper than market candidates, and their names build the brand.']});
