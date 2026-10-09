document.addEventListener('click',e=>{
  ctx.style.display='none';
  if(!e.target.closest('#startMenu')&&!e.target.closest('#startBtn')&&!e.target.closest('#tbSearch'))toggleStart(false);
  if(!e.target.closest('#trayFly')&&!e.target.closest('#systray'))toggleTray(false);
  if(!e.target.closest('.dicon'))$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){ctx.style.display='none';toggleStart(false);toggleTray(false);}});

/* ================= BATCH 1 FEATURES ================= */
/* ---- #8 icon size, #6 auto-arrange / align, sort ---- */
function setIconSize(sz){SET.iconSize=sz;saveSet();iconPos={};try{localStorage.removeItem('w12icons');}catch(e){}renderIcons();}
function autoArrangeIcons(){iconPos={};try{localStorage.removeItem('w12icons');}catch(e){}renderIcons();}
function alignIconsToGrid(){
  const sp=ICON_SP[SET.iconSize]||ICON_SP.md;
  $$('#iconLayer .dicon').forEach((el,i)=>{
    const id=DESKTOP_ICONS[i];const x=Math.round((el.offsetLeft-14)/sp.x)*sp.x+14,y=Math.round((el.offsetTop-14)/sp.y)*sp.y+14;
    el.style.left=x+'px';el.style.top=y+'px';iconPos[id]={x,y};
  });
  try{localStorage.setItem('w12icons',JSON.stringify(iconPos));}catch(e){}
}
function sortIcons(by){
  DESKTOP_ICONS.sort((a,b)=>{
    if(by==='type')return (APPS[a].name>APPS[b].name?1:-1); // simple fallback
    return APPS[a].name.localeCompare(APPS[b].name);
  });
  iconPos={};try{localStorage.removeItem('w12icons');}catch(e){}renderIcons();
}
