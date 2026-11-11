const {app,BrowserWindow,ipcMain,Menu,shell,dialog}=require('electron');
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
 w.loadFile(path.join(__dirname,'..','app','index.html'));setupUpdater(w);
 w.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/.test(url))shell.openExternal(url);return{action:'deny'}});
 w.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:')){e.preventDefault();if(/^https?:/.test(url))shell.openExternal(url)}});
 w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}});
}
Menu.setApplicationMenu(null);
/* ---- auto update (GitHub Releases). Only in the packaged app. ---- */
const PL=(app.getLocale()||'').toLowerCase().startsWith('pl');
const TX=PL?{avail:'Dostępna nowa wersja {v}',ask:'Pobrać i zainstalować teraz?',yes:'Aktualizuj',no:'Później',ready:'Aktualizacja pobrana',restart:'Zrestartować grę i zainstalować?',rst:'Restartuj',err:'Nie udało się sprawdzić aktualizacji.',portable:'Dostępna nowa wersja {v}. Wersja przenośna nie aktualizuje się sama: otworzyć stronę pobierania?',open:'Otwórz'}
 :{avail:'A new version {v} is available',ask:'Download and install now?',yes:'Update',no:'Later',ready:'Update downloaded',restart:'Restart the game and install?',rst:'Restart',err:'Could not check for updates.',portable:'A new version {v} is available. The portable build cannot update itself: open the download page?',open:'Open'};
function setupUpdater(win){
 if(!app.isPackaged)return;
 let au;try{au=require('electron-updater').autoUpdater}catch(e){return}
 au.autoDownload=false;au.autoInstallOnAppQuit=true;
 const portable=!!process.env.PORTABLE_EXECUTABLE_DIR;
 au.on('update-available',async info=>{
  if(portable){const r=await dialog.showMessageBox(win,{type:'info',message:TX.portable.replace('{v}',info.version),buttons:[TX.open,TX.no],defaultId:0,cancelId:1});if(r.response===0)shell.openExternal('https://github.com/Ociapkowsky/squared-circle-manager/releases/latest');return}
  const r=await dialog.showMessageBox(win,{type:'info',title:'Squared Circle Manager',message:TX.avail.replace('{v}',info.version),detail:TX.ask,buttons:[TX.yes,TX.no],defaultId:0,cancelId:1});
  if(r.response===0)au.downloadUpdate().catch(()=>{})});
 au.on('download-progress',p=>{try{win.setProgressBar(p.percent/100)}catch(e){}});
 au.on('update-downloaded',async()=>{try{win.setProgressBar(-1)}catch(e){}
  const r=await dialog.showMessageBox(win,{type:'info',title:'Squared Circle Manager',message:TX.ready,detail:TX.restart,buttons:[TX.rst,TX.no],defaultId:0,cancelId:1});
  if(r.response===0)au.quitAndInstall()});
 au.on('error',()=>{});
 setTimeout(()=>au.checkForUpdates().catch(()=>{}),4000)}
const lock=app.requestSingleInstanceLock();
if(!lock)app.quit();else{app.on('second-instance',()=>{const w=BrowserWindow.getAllWindows()[0];if(w){if(w.isMinimized())w.restore();w.focus()}});app.whenReady().then(create);app.on('window-all-closed',()=>app.quit())}
