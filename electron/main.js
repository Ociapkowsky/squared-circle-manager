const {app,BrowserWindow,ipcMain,Menu,shell}=require('electron');
const fs=require('fs'),path=require('path');
const dir=()=>path.join(app.getPath('userData'),'saves');
const fileOf=k=>path.join(dir(),encodeURIComponent(k)+'.json');
function readAll(){const o={};try{fs.mkdirSync(dir(),{recursive:true});for(const f of fs.readdirSync(dir())){if(!f.endsWith('.json'))continue;try{o[decodeURIComponent(f.slice(0,-5))]=fs.readFileSync(path.join(dir(),f),'utf8')}catch(e){}}}catch(e){}return o}
function writeAtomic(k,v){try{fs.mkdirSync(dir(),{recursive:true});const f=fileOf(k),tmp=f+'.tmp';fs.writeFileSync(tmp,v);fs.renameSync(tmp,f)}catch(e){console.error('save failed',e)}}
ipcMain.on('scm:all',e=>{e.returnValue=readAll()});
ipcMain.on('scm:set',(e,k,v)=>writeAtomic(String(k),String(v)));
ipcMain.on('scm:del',(e,k)=>{try{fs.unlinkSync(fileOf(String(k)))}catch(err){}});
function create(){
 const w=new BrowserWindow({width:1280,height:820,minWidth:900,minHeight:600,backgroundColor:'#0d0d12',title:'Squared Circle Manager',autoHideMenuBar:true,
  webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:false}});
 w.loadFile(path.join(__dirname,'..','app','index.html'));
 w.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/.test(url))shell.openExternal(url);return{action:'deny'}});
 w.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:')){e.preventDefault();if(/^https?:/.test(url))shell.openExternal(url)}});
 w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}});
}
Menu.setApplicationMenu(null);
const lock=app.requestSingleInstanceLock();
if(!lock)app.quit();else{app.on('second-instance',()=>{const w=BrowserWindow.getAllWindows()[0];if(w){if(w.isMinimized())w.restore();w.focus()}});app.whenReady().then(create);app.on('window-all-closed',()=>app.quit())}
