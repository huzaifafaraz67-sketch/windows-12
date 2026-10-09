/* --- Jump list (right-click a taskbar app) --- */
document.addEventListener('contextmenu',e=>{
  const tb=e.target.closest('#taskbar .tbtn[data-app]');
  if(tb){e.preventDefault();e.stopPropagation();
    const id=tb.dataset.app;const r=tb.getBoundingClientRect();
    const items=[{label:APPS[id].name,icon:APPS[id].icon,fn:()=>openApp(id)},'sep'];
    if(openWins[id]){items.push({label:'Close window',icon:'icon/system.png',fn:()=>closeApp(id)});}
    else{items.push({label:'Open',icon:APPS[id].icon,fn:()=>openApp(id)});}
    items.push({label:'Pin to taskbar',icon:'icon/home.png',fn:()=>openApp(id)});
    showCtx(r.left,Math.max(8,r.top-120),items);
  }
},true);

/* --- Taskbar thumbnail preview on hover --- */
let _tbPrev=null,_tbPrevT=null;
function removeTbPrev(){if(_tbPrev){_tbPrev.remove();_tbPrev=null;}}
document.addEventListener('mouseover',e=>{
  const tb=e.target.closest('#taskbar .tbtn[data-app]');
  if(tb){const id=tb.dataset.app;clearTimeout(_tbPrevT);
    _tbPrevT=setTimeout(()=>{
      removeTbPrev();
      const run=openWins[id]&&openWins[id].style.display!=='none';
      const prev=document.createElement('div');prev.className='tbPrev';
      prev.innerHTML=`<div class="tpBar"><img src="${APPS[id].icon}"><span>${APPS[id].name}</span></div>`+
        `<div class="tpBody">${run?('<img src="'+APPS[id].icon+'" class="tpThumb">'):'<span class="tpOff">Not running</span>'}</div>`;
      document.body.appendChild(prev);
      const r=tb.getBoundingClientRect();
      prev.style.left=Math.max(8,Math.min(r.left+r.width/2-100,innerWidth-208))+'px';
      prev.style.top=(r.top-prev.offsetHeight-10)+'px';
      _tbPrev=prev;
    },420);
  }
});
