
/* ---- 3D login spin: the screen becomes a panel that rotates in real 3D space.
   Front face = the lock (wallpaper + clock); back face = the REAL desktop with its
   actual app icons attached, so the apps turn with the panel. Done with CSS 3D so it
   works offline on local file:// pages (WebGL can't texture local images there). ---- */
let _spinBusy=false;
function cssSpin3D(done){
  if(_spinBusy){done&&done();return;}_spinBusy=true;
  const d=$('#desktop');
  const lc=$('#lockClock')?$('#lockClock').textContent:'9:41';
  const ld=$('#lockDate')?$('#lockDate').textContent:'';
  // real desktop stays in the body, visible underneath the spinning panel
  d.style.display='block';
  const stage=document.createElement('div');stage.id='spinStage';
  const grp=document.createElement('div');grp.id='spinGroup';
  const front=document.createElement('div');front.className='sface sfront';
  front.style.backgroundImage=`url('${curWall}')`;
  front.innerHTML='<div class="sfdark"></div><div class="sfclock">'+lc+'</div><div class="sfdate">'+ld+'</div>';
  const back=document.createElement('div');back.className='sface sback';
  back.innerHTML='<div class="sbcard"><div class="sblogo"><i></i><i></i><i></i><i></i></div><div class="sbbrand">Windows<b>12</b></div></div>';
  grp.appendChild(front);grp.appendChild(back);stage.appendChild(grp);document.body.appendChild(stage);
  let finished=false;
  function restore(){
    if(finished)return;finished=true;
    stage.remove();_spinBusy=false;done&&done();
  }
  requestAnimationFrame(()=>requestAnimationFrame(()=>{grp.classList.add('go');stage.classList.add('out');}));
  grp.addEventListener('animationend',restore);
  setTimeout(restore,2000); // safety net
}
