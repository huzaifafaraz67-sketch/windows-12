$('#desktop').addEventListener('contextmenu',e=>{
  if(e.target.closest('.win'))return;
  e.preventDefault();
  showCtx(e.clientX,e.clientY,[
    {label:'View  ›',icon:'icon/tool-view.png',fn:()=>showCtx(e.clientX,e.clientY,[
      {label:'Large icons',fn:()=>setIconSize('lg')},
      {label:'Medium icons',fn:()=>setIconSize('md')},
      {label:'Small icons',fn:()=>setIconSize('sm')},
      'sep',
      {label:'Align icons to grid',fn:alignIconsToGrid},
      {label:'Auto arrange icons',fn:autoArrangeIcons}
    ])},
    {label:'Sort by  ›',icon:'icon/tool-sort.png',fn:()=>showCtx(e.clientX,e.clientY,[
      {label:'Name',fn:()=>sortIcons('name')},
      {label:'Type',fn:()=>sortIcons('type')}
    ])},
    {label:'Refresh',icon:'icon/update.png',fn:renderIcons},
    'sep',
    {label:'New folder',icon:'icon/tool-new.png',fn:()=>window.newDeskFolder&&window.newDeskFolder()},
    {label:'Change background',icon:'icon/personal.png',fn:()=>{const i=WALLS.indexOf(curWall);curWall=WALLS[(i+1)%WALLS.length];SET.wall=curWall;SET.liveOn=false;saveSet();$('#lock').style.backgroundImage=`url('${curWall}')`;applyWall();}},
    'sep',
    {label:'Display settings',icon:'icon/system.png',fn:()=>openApp('settings')},
    {label:'Terminal',icon:'icon/terminal.svg',fn:()=>openApp('terminal')}
  ]);
});
/* global close */
