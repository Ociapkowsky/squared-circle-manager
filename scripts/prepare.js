// Wraps build/game.html with a storage shim so the game's localStorage is kept in real files.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const ver=require(path.join(root,'package.json')).version;
const game=fs.readFileSync(path.join(root,'build','game.html'),'utf8').replace(/const GAME_VER='[^']*'/,"const GAME_VER='"+ver+"'");
const shim=fs.readFileSync(path.join(root,'electron','shim.js'),'utf8');
const i=game.search(/<script>/i);
if(i<0)throw new Error('no <script> in game.html');
const out=game.slice(0,i)+'<script>\n'+shim+'\n</script>\n'+game.slice(i);
fs.mkdirSync(path.join(root,'app'),{recursive:true});
fs.writeFileSync(path.join(root,'app','index.html'),out);
console.log('app/index.html',out.length,'bytes');
