const APPS={
  explorer:{name:'File Explorer',icon:'icon/explorer.png'},
  thispc:{name:'This PC',icon:'icon/thispc.png'},
  recycle:{name:'Recycle Bin',icon:'icon/rb.png'},
  terminal:{name:'Terminal',icon:'icon/terminal.svg'},
  notepad:{name:'Notepad',icon:'icon/tool-new.png'},
  calc:{name:'Calculator',icon:'icon/qa.png'},
  settings:{name:'Settings',icon:'icon/system.png'},
  games:{name:'Games',icon:'icon/game.png'},
  viewer:{name:'Photos',icon:'icon/personal.png'},
  edge:{name:'Web',icon:'icon/network.png'},
  update:{name:'Update',icon:'icon/update.png'},
  help:{name:'Get Help',icon:'icon/help.png'},
  personal:{name:'Personal',icon:'icon/personal.png'},
  onedrive:{name:'OneDrive',icon:'icon/od.png'},
  weather:{name:'Weather',icon:WX_ICON}
};
const DESKTOP_ICONS=['thispc','recycle','explorer','terminal','settings','games','edge'];
const PINNED=['explorer','terminal','settings','notepad','calc','weather','games','edge','update','help','onedrive'];

/* ================= WINDOW MANAGER ================= */
let zTop=100, winCount=0;
const openWins={};
function focusWin(w){zTop++;w.style.zIndex=zTop;$$('.tbtn.active').forEach(b=>b.classList.remove('active'));
  const tb=$(`.tbtn[data-app="${w.dataset.app}"]`);if(tb)tb.classList.add('active');}
