const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('scmFS',{
 all:()=>ipcRenderer.sendSync('scm:all'),
 set:(k,v)=>ipcRenderer.send('scm:set',k,v),
 del:k=>ipcRenderer.send('scm:del',k)
});
