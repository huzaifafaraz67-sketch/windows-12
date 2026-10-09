function toggleWin(id){const w=openWins[id];if(!w)return openApp(id);
  if(w.style.display==='none'||w.classList.contains('minz')){w.classList.remove('minz','minimizing');w.style.display='flex';w.classList.add('restoring');setTimeout(()=>w.classList.remove('restoring'),240);focusWin(w);}
  else{minimizeWin(w);}}
function minimizeWin(w){
  w.classList.add('minimizing');
  setTimeout(()=>{w.classList.add('minz');w.classList.remove('minimizing');w.style.display='none';},230);
}
function closeApp(id){const w=openWins[id];if(!w)return;w.remove();delete openWins[id];
  const tb=$(`.tbtn[data-app="${id}"]`);
  if(tb){if(['explorer','terminal','settings','games'].includes(id)){tb.classList.remove('run','active');}else{tb.remove();}}}

/* ================= APP CONTENT ================= */
const FS={
  'This PC':[['Local Disk (C:)','icon/diskwin.png','folder'],['Data (D:)','icon/disk.png','folder'],['Documents','icon/folder.png','folder'],['Downloads','icon/folder.png','folder'],['Pictures','icon/folder.png','folder'],['Music','icon/folder.png','folder']],
  'Documents':[['Resume.docx','icon/tool-new.png','file'],['Notes.txt','icon/tool-new.png','file'],['Projects','icon/folder.png','folder']],
  'Pictures':[['92e.png','wallpaper/92e.png','img'],['e1u.png','wallpaper/e1u.png','img'],['oiw.jpg','wallpaper/oiw.jpg','img'],['oitgb.png','wallpaper/oitgb.png','img']],
  'Downloads':[['setup.exe','icon/apps.png','file'],['game.zip','icon/game.png','file']],
  'Music':[['startup.mp3','icon/qa.png','file']],
  'Projects':[['JUIM OS','icon/folder.png','folder'],['index.html','icon/network.png','file']]
};
