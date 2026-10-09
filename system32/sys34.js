
/* ---- #20 taskbar alignment, #19 auto-hide ---- */
function applyTaskbar(){
  document.body.classList.toggle('task-left',SET.taskAlign==='left');
  document.body.classList.toggle('task-hide',!!SET.taskHide);
  let hz=document.getElementById('tbHotzone');
  if(!hz){hz=document.createElement('div');hz.id='tbHotzone';document.body.appendChild(hz);
    const tb=document.getElementById('taskbar');
    hz.addEventListener('mouseenter',()=>{if(tb)tb.classList.add('peek');});
    if(tb)tb.addEventListener('mouseleave',()=>tb.classList.remove('peek'));}
}
applyTaskbar();

/* ================= BATCH 2 FEATURES ================= */

/* --- #18 taskbar right-click context menu --- */
