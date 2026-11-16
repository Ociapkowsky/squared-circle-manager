
/* ============ Views: feuds, stables, titles, money, world, settings ============ */
const avsHtml=ids=>'<div class="avs">'+ids.filter(i=>W(i)).map(i=>'<div class="av" title="'+esc(W(i).name)+'">'+avatar(W(i).look,44)+'</div>').join('')+'</div>';
