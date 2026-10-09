$('#smSearch').addEventListener('input',e=>renderPinned(e.target.value.toLowerCase()));

/* ================= START MENU ================= */
function toggleStart(force){
  const m=$('#startMenu');
  const show=force!==undefined?force:!m.classList.contains('show');
  m.classList.toggle('show',show);
  $('#startBtn').classList.toggle('active',show);
  if(show){renderPinned();$('#smSearch').value='';setTimeout(()=>$('#smSearch').focus(),50);}
}
$('#startBtn').addEventListener('click',e=>{e.stopPropagation();toggleStart();});
$('#tbSearch').addEventListener('click',e=>{e.stopPropagation();toggleStart(true);});
$('#powerBtn').addEventListener('click',()=>{if(confirm('Sign out and lock?')){location.reload();}});

/* taskbar app buttons */
$$('#taskbar .tbtn[data-app]').forEach(b=>b.addEventListener('click',()=>toggleWin(b.dataset.app)));

/* ================= TRAY FLYOUT ================= */
function renderCal(){
  const d=new Date();const cal=$('#flyCal');cal.innerHTML='';
  const hd=['S','M','T','W','T','F','S'];hd.forEach(x=>{const e=document.createElement('div');e.className='hd';e.textContent=x;cal.appendChild(e);});
  const first=new Date(d.getFullYear(),d.getMonth(),1).getDay();
  const days=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
  for(let i=0;i<first;i++)cal.appendChild(document.createElement('div'));
  for(let n=1;n<=days;n++){const e=document.createElement('div');e.textContent=n;if(n===d.getDate())e.className='tdy';cal.appendChild(e);}
}
