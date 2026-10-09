function toggleMiniFly(force){
  let f=$('#miniFly');
  if(!f){f=document.createElement('div');f.id='miniFly';document.body.appendChild(f);}
  const show=force!==undefined?force:!f.classList.contains('show');
  if(show){
    f.innerHTML='<div class="mfRow"><span class="mfIco">🔊</span>'+
      '<input type="range" id="mfVol" min="0" max="100" value="'+SET.volume+'"></div>'+
      '<div class="mfRow mfBat"><span class="mfIco">'+batEmoji(_batLevel)+'</span>'+
      '<span>Battery</span><b id="mfBatPct">'+Math.round(_batLevel*100)+'%</b></div>'+
      '<div class="mfRow"><button id="mfTheme" class="mfBtn">'+(SET.theme==='dark'?'☀️ Light mode':'🌙 Dark mode')+'</button></div>';
    const vol=f.querySelector('#mfVol');
    vol.addEventListener('input',()=>{SET.volume=+vol.value;saveSet();try{$('#startup').volume=SET.volume/100;}catch(e){}});
    f.querySelector('#mfTheme').addEventListener('click',e=>{e.stopPropagation();SET.theme=(SET.theme==='dark'?'light':'dark');saveSet();applyTheme();toggleMiniFly(false);});
  }
  f.classList.toggle('show',show);
}
if($('#batInd')){$('#batInd').addEventListener('click',e=>{e.stopPropagation();toggleMiniFly();});}
document.addEventListener('click',e=>{if(!e.target.closest('#miniFly')&&!e.target.closest('#batInd'))toggleMiniFly(false);});

/* ---- Action Center dark/light toggle (in tray flyout) ---- */
(function(){
  const fly=$('#trayFly');if(!fly)return;
  const qa=fly.querySelector('.qa');
  const t=document.createElement('div');t.className='q acTheme';t.title='Theme';
  function label(){t.innerHTML='<span style="font-size:20px">'+(SET.theme==='dark'?'☀️':'🌙')+'</span><br>'+(SET.theme==='dark'?'Light':'Dark');}
  label();
  t.addEventListener('click',e=>{e.stopPropagation();SET.theme=(SET.theme==='dark'?'light':'dark');saveSet();applyTheme();label();});
  if(qa)qa.appendChild(t);
})();
