$('#taskbar').addEventListener('contextmenu',e=>{
  e.preventDefault();e.stopPropagation();
  showCtx(e.clientX,e.clientY,[
    {label:'Task Manager',icon:'icon/system.png',fn:()=>openApp('taskmgr')},
    {label:'Taskbar settings',icon:'icon/system.png',fn:()=>openApp('settings')},
    'sep',
    {label:'Show the desktop',icon:'icon/home.png',fn:toggleShowDesktop}
  ]);
});

/* --- #83 Task Manager app --- */
APPS.taskmgr={name:'Task Manager',icon:'icon/system.png'};
function buildTaskMgr(body){
  function render(){
    const ids=Object.keys(openWins);
    body.innerHTML='<div class="tm"><div class="tmhead">Name<span>CPU</span></div><div class="tmlist">'+
      (ids.length? ids.map(id=>`<div class="tmrow" data-id="${id}"><img src="${APPS[id].icon}"><span class="tmn">${APPS[id].name}</span><span class="tmcpu">${(Math.random()*9).toFixed(1)}%</span><button class="tmend"${id==='taskmgr'?' disabled':''}>End task</button></div>`).join('')
       : '<div class="tmempty">No running apps.</div>')+
      '</div></div>';
    body.querySelectorAll('.tmend').forEach(b=>b.addEventListener('click',()=>{const id=b.closest('.tmrow').dataset.id;if(id==='taskmgr')return;closeApp(id);render();}));
  }
  render();
  const iv=setInterval(()=>{if(!document.body.contains(body)){clearInterval(iv);return;}render();},2000);
}
/* route taskmgr through buildApp */
const _origBuildApp=buildApp;
buildApp=function(id,body){ if(id==='taskmgr'){return buildTaskMgr(body);} return _origBuildApp(id,body); };
