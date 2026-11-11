/* Replaces localStorage with file-backed storage (no 5 MB browser limit). Runs before the game. */
(function(){
 if(!window.scmFS)return;
 var data=window.scmFS.all()||{};
 var P=Storage.prototype,real={g:P.getItem,s:P.setItem,r:P.removeItem,k:P.key,c:P.clear};
 function mine(o){return o===window.localStorage}
 P.getItem=function(k){if(!mine(this))return real.g.call(this,k);k=String(k);return Object.prototype.hasOwnProperty.call(data,k)?data[k]:null};
 P.setItem=function(k,v){if(!mine(this))return real.s.call(this,k,v);k=String(k);v=String(v);data[k]=v;window.scmFS.set(k,v)};
 P.removeItem=function(k){if(!mine(this))return real.r.call(this,k);k=String(k);delete data[k];window.scmFS.del(k)};
 P.key=function(i){if(!mine(this))return real.k.call(this,i);return Object.keys(data)[i]===undefined?null:Object.keys(data)[i]};
 P.clear=function(){if(!mine(this))return real.c.call(this);Object.keys(data).forEach(function(k){window.scmFS.del(k)});data={}};
 try{Object.defineProperty(P,'length',{configurable:true,get:function(){return mine(this)?Object.keys(data).length:0}})}catch(e){}
})();
