
/* ---- Win+X power-user menu, Win+M/Shift+M, Win+L ---- */
function openWinX(){
  const x=document.body.classList.contains('task-left')?6:Math.round(innerWidth/2-120);
  showCtx(x,innerHeight-70,[
    {label:'Task Manager',icon:'icon/system.png',fn:()=>openApp('taskmgr')},
    {label:'Settings',icon:'icon/system.png',fn:()=>openApp('settings')},
    {label:'File Explorer',icon:'icon/explorer.png',fn:()=>openApp('explorer')},
    {label:'Terminal',icon:'icon/terminal.svg',fn:()=>openApp('terminal')},
    'sep',
    {label:'Cascade windows',icon:'icon/tool-view.png',fn:cascadeWindows},
    {label:'Minimize all',icon:'icon/tool-sort.png',fn:minimizeAll},
    {label:'Restore all',icon:'icon/tool-view.png',fn:restoreAll},
    'sep',
    {label:'Lock',icon:'icon/safe.png',fn:lockNow},
    {label:'Sign out',icon:'icon/update.png',fn:()=>{if(confirm('Sign out and lock?'))location.reload();}}
  ]);
}
