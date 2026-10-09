function doPower(kind){
  toggleStart(false);
  const ov=document.createElement('div');ov.id='powerScreen';
  ov.innerHTML='<div class="psring"></div><div class="pstxt">'+(kind==='sleep'?'Sleeping…':kind==='restart'?'Restarting…':'Shutting down…')+'</div>';
  document.body.appendChild(ov);requestAnimationFrame(()=>ov.classList.add('on'));
  setTimeout(()=>{
    if(kind==='sleep'){
      ov.querySelector('.pstxt').textContent='Press any key to wake…';
      const wake=()=>{ov.classList.remove('on');setTimeout(()=>ov.remove(),400);document.removeEventListener('keydown',wake);document.removeEventListener('mousedown',wake);};
      setTimeout(()=>{document.addEventListener('keydown',wake);document.addEventListener('mousedown',wake);},700);
    } else { location.reload(); }
  },2200);
}

/* --- brightness + night-light overlays --- */
(function(){
  const bo=document.createElement('div');bo.id='brightOverlay';document.body.appendChild(bo);
  const no=document.createElement('div');no.id='nightOverlay';document.body.appendChild(no);
})();
function setNight(on){const no=document.getElementById('nightOverlay');if(no)no.style.opacity=on?'0.28':'0';}
function setBright(v){const bo=document.getElementById('brightOverlay');if(bo)bo.style.opacity=String((100-v)/100*0.6);}
