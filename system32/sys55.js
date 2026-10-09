function cascadeWindows(){
  let i=0;$$('.win').forEach(w=>{
    if(w.style.display==='none')return;
    w.classList.remove('max');
    const off=i*30;
    w.style.left=(50+off)+'px';w.style.top=(40+off)+'px';
    w.style.width=Math.min(820,innerWidth-120)+'px';
    w.style.height=Math.min(520,innerHeight-160)+'px';
    zTop++;w.style.zIndex=zTop;i++;
  });
}

/* ---- always-on-top toggle ---- */
function toggleOnTop(w){
  const on=w.classList.toggle('ontop');
  if(on){w.style.zIndex=9000;w.dataset.ontop='1';}
  else{delete w.dataset.ontop;zTop++;w.style.zIndex=zTop;}
  return on;
}

/* ---- titlebar right-click menu ---- */
document.addEventListener('contextmenu',e=>{
  const tb=e.target.closest('.tbar');
  if(!tb)return;
  const w=tb.closest('.win');if(!w)return;
  e.preventDefault();e.stopPropagation();
  const id=w.dataset.app;
  const isMax=w.classList.contains('max');
  showCtx(e.clientX,e.clientY,[
    {label:(isMax?'Restore':'Maximize'),icon:'icon/tool-view.png',fn:()=>toggleMax(w)},
    {label:'Minimize',icon:'icon/tool-sort.png',fn:()=>minimizeWin(w)},
    'sep',
    {label:(w.classList.contains('ontop')?'Remove always on top':'Always on top'),icon:'icon/safe.png',fn:()=>toggleOnTop(w)},
    'sep',
    {label:'Close',icon:'icon/rb.png',fn:()=>{sfx('close');closeApp(id);}}
  ]);
},true);
