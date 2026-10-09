document.addEventListener('mouseout',e=>{if(e.target.closest('#taskbar .tbtn[data-app]')){clearTimeout(_tbPrevT);removeTbPrev();}});

/* --- Aero shake (shake title to minimize others) --- */
document.addEventListener('mousedown',e=>{
  const tbar=e.target.closest('.win .tbar');
  if(!tbar||e.target.closest('.ctrls'))return;
  const w=tbar.closest('.win');let lastX=e.clientX,dir=0,rev=0,t0=Date.now();
  function mv(ev){const dx=ev.clientX-lastX;const nd=dx>0?1:dx<0?-1:0;if(nd&&nd!==dir){rev++;dir=nd;}lastX=ev.clientX;
    if(rev>=6&&Date.now()-t0<1300){aeroShake(w);cleanup();}}
  function cleanup(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',cleanup);}
  document.addEventListener('mousemove',mv);document.addEventListener('mouseup',cleanup);
});
function aeroShake(keep){Object.keys(openWins).forEach(id=>{const w=openWins[id];if(w!==keep&&w.style.display!=='none')minimizeWin(w);});}

/* --- Clipboard history (Win+V) --- */
const CLIP=[];
document.addEventListener('copy',()=>{const s=(window.getSelection&&window.getSelection().toString())||'';if(s){CLIP.unshift(s);if(CLIP.length>12)CLIP.pop();}});
