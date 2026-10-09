function signIn(){
  const l=$('#lock'),d=$('#desktop');
  if(window._signing)return;
  // demo PIN check: blank signs in, or correct PIN '1234'; wrong PIN = shake
  const pin=($('#pinInput')?$('#pinInput').value:'')||'';
  if(pin!==''&&pin!=='1234'){
    const box=$('#login');if(box){box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');}
    const h=$('#lockHint');if(h){h.textContent='Incorrect PIN. Try again. (demo PIN: 1234)';h.style.color='#ff8a8a';}
    const pi=$('#pinInput');if(pi){pi.value='';pi.focus();}
    sfx('close');return;
  }
  window._signing=true;
  // reveal desktop (becomes the back face of the spin), ready underneath
  d.style.display='block';applyWall();
  try{playStartup();}catch(e){}
  l.style.display='none';
  cssSpin3D(()=>finishLogin());
}
function finishLogin(){
  const d=$('#desktop');d.classList.add('wake');
  $$('#iconLayer .dicon').forEach((el,i)=>{el.style.animationDelay=(0.05+i*0.06)+'s';el.classList.add('pop');});
  setTimeout(()=>{d.classList.remove('wake');
    $$('#iconLayer .dicon').forEach(el=>{el.classList.remove('pop');el.style.animationDelay='';});window._signing=false;},1000);
}
