Object.assign(ACT,{mghire(e){if(mgHire(+e.dataset.i)){save();render()}},mghirel(e){if(mgHireLegend(e.dataset.id)){save();render()}},mgfire(e){if(MGUI.cs!==e.dataset.id){MGUI.cs=e.dataset.id;render();return}MGUI.cs='';if(mgFire(e.dataset.id)){save();render()}},mgno(){MGUI.cs='';render()}});
Object.assign(CHG,{mgas(e){if(mgAssign(e.dataset.id,e.value)){save()}render()}});
ACHS.push(['manager1',()=>mgEnsure().l.length>0]);
Object.assign(D,{'ach.manager1':['Pierwszy menedżer','First manager']});
Object.assign(ACT,{mghirefam(e){if(mgHireFam(e.dataset.k)){save();render()}}});
Object.assign(CHG,{mgreg(e){MGUI.reg=e.value;render()}});
Object.assign(ACT,{mgfamre(){const g=mgEnsure();g.fam=null;render()}});
Object.assign(ACT,{mgstadd(e){const sel=document.getElementById('mgsel-'+e.dataset.id);if(sel&&mgAssignSt(sel.value,e.dataset.id)){save();render()}},mgstrm(e){if(mgAssignSt(e.dataset.id,'')){save();render()}},mgclash(e){if(mgClash(e.dataset.id)){save();render()}}});
Object.assign(CHG,{mgst(e){if(mgAssignSt(e.dataset.id,e.value))save();render()}});
