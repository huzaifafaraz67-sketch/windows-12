
/* --- #22 Start menu "All apps" list --- */
(function(){
  const sm=$('#startMenu');if(!sm)return;
  const btn=document.createElement('div');btn.id='allAppsBtn';btn.textContent='All apps  ›';
  sm.appendChild(btn);
  const panel=document.createElement('div');panel.id='allAppsPanel';sm.appendChild(panel);
  function build(){
    const ids=Object.keys(APPS).filter(id=>id!=='taskmgr').sort((a,b)=>APPS[a].name.localeCompare(APPS[b].name));
    panel.innerHTML='<div class="aaHead"><span id="aaBack">‹ Back</span><b>All apps</b></div>'+
      ids.map(id=>`<div class="aaRow" data-id="${id}"><img src="${APPS[id].icon}"><span>${APPS[id].name}</span></div>`).join('');
    panel.querySelector('#aaBack').addEventListener('click',e=>{e.stopPropagation();panel.classList.remove('on');});
    panel.querySelectorAll('.aaRow').forEach(r=>r.addEventListener('click',e=>{e.stopPropagation();openApp(r.dataset.id);panel.classList.remove('on');toggleStart(false);}));
  }
  btn.addEventListener('click',e=>{e.stopPropagation();build();panel.classList.add('on');});
})();

/* --- #26 Power submenu + shutdown animation --- */
(function(){
  const pb=$('#powerBtn');if(!pb)return;
  const pb2=pb.cloneNode(true);pb.parentNode.replaceChild(pb2,pb);
  pb2.addEventListener('click',e=>{e.stopPropagation();
    const r=pb2.getBoundingClientRect();
    showCtx(Math.max(8,r.left-40),r.top-124,[
      {label:'Sleep',icon:'icon/system.png',fn:()=>doPower('sleep')},
      {label:'Restart',icon:'icon/update.png',fn:()=>doPower('restart')},
      {label:'Shut down',icon:'icon/system.png',fn:()=>doPower('shutdown')}
    ]);
  });
})();
