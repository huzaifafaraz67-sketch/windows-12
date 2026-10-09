/* ---- lock now (Win+L) ---- */
function lockNow(){
  // close start/tray, hide desktop, show lock + login again
  try{toggleStart(false);}catch(e){} try{toggleTray(false);}catch(e){}
  const l=$('#lock'),d=$('#desktop'),lg=$('#login');
  if(!l)return;
  d.style.display='none';
  l.style.display='flex';
  l.style.backgroundImage=`url('${curWall}')`;
  if(lg)lg.style.display='none';
  const li=$('#lockInfo');if(li)li.style.display='';
  const pi=$('#pinInput');if(pi)pi.value='';
  window._signing=false;
  sfx('close');
}

/* ---- minimize all / restore all (Win+M / Win+Shift+M) ---- */
function minimizeAll(){$$('.win').forEach(w=>{if(w.style.display!=='none')minimizeWin(w);});}
function restoreAll(){$$('.win').forEach(w=>{w.classList.remove('minz','minimizing');w.style.display='flex';});const t=topWin();if(t)focusWin(t);}

/* ---- cascade windows ---- */
