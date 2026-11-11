Object.assign(ACT,{
 rdplan(e){const v=id=>{const x=document.getElementById(id);return x?x.value:''};const r=rdSetPlan(v('rda'),v('rdb'),v('rdt'),v('rds'),v('rdw'));RDUI.msg=r==='ok'?t('rd.m.ok'):r==='lock'?t('rd.lock'):r==='title'?t('rd.m.title'):t('rd.m.no');if(r==='ok')save();render()},
 rdmain(){const r=rdAddMain();if(r==='ok'){G.screen='show';save()}else RDUI.msg=t(r==='busy'?'rd.m.busy':'rd.m.no');render()},
 rdrumble(){const r=rdAddRumble();if(r==='ok'){G.screen='show';save()}else RDUI.msg=t(r==='busy'?'rd.m.busy':'rd.m.no');render()},
 rdcamp(e){const g=rdEnsure(),k=+e.dataset.k,c=[0,[.1,6],[.25,12],[.6,25]][k];if(!c||!rdRoad()||!rdPlanOk()||g.camp+2>G.week)return;const cost=xc(c[0]);if(G.fed.cash<cost)return;G.fed.cash-=cost;g.hype=clamp(g.hype+c[1],0,100);g.camp=G.week;save();render()},
 rdseg(){const g=rdEnsure();if(!rdRoad()||!rdPlanOk()||g.seg>=G.week)return;const a=W(g.p.a),b=W(g.p.b);const d=3+((a.mic||40)+(b.mic||40))/200*4+(a.fin&&a.fin.lv>=50?1:0);g.hype=clamp(g.hype+d,0,100);g.seg=G.week;[a,b].forEach(w=>{w.fatigue=clamp((w.fatigue||0)+3,0,100)});save();render()},
 rdgo(e){G.screen=e.dataset.s;render()}});
Object.assign(CHG,{rdname(e){rdEnsure().name=e.value.trim().slice(0,30)}});
Object.assign(D,{'rd.m.ok':['Plan zapisany.','Plan saved.'],'rd.m.no':['Nie można tego zrobić.','That cannot be done.'],'rd.m.title':['Ten pas nie pasuje do tej pary.','That title does not fit this pair.'],'rd.m.busy':['Karta jest pełna albo zawodnicy są już zajęci.','The card is full or the wrestlers are already booked.']});
