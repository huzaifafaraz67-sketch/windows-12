function launchEgg(){
  confettiBurst();sfx('open');
  const d=document.createElement('div');d.id='eggCard';
  d.innerHTML='<img src="icon/thispc.png"><h2>Windows 12 🎉</h2><p>Secret unlocked! You found the hidden code.<br>Built with ❤ for Huzaifa.</p><button id="eggCl">Awesome!</button>';
  document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('on'));
  d.querySelector('#eggCl').addEventListener('click',()=>{d.classList.remove('on');setTimeout(()=>d.remove(),300);});
}

/* ================= BATCH 3 FEATURES ================= */

/* new apps registered */
APPS.sticky  ={name:'Sticky Notes',icon:'icon/tool-new.png'};
APPS.clockapp={name:'Clock',icon:'icon/qa.png'};
APPS.calendar={name:'Calendar',icon:'icon/system.png'};
APPS.paint   ={name:'Paint',icon:'icon/personal.png'};
APPS.media   ={name:'Media Player',icon:'icon/game.png'};
APPS.store   ={name:'Store',icon:'icon/apps.png'};

/* --- Sticky Notes --- */
function buildSticky(body){
  body.innerHTML='<div class="sticky"><div class="stBar">Sticky Note</div><textarea class="stTa" placeholder="Write a note…"></textarea></div>';
  const ta=body.querySelector('.stTa');
  try{ta.value=localStorage.getItem('w12sticky')||'';}catch(e){}
  ta.addEventListener('input',()=>{try{localStorage.setItem('w12sticky',ta.value);}catch(e){}});
}

/* --- Clock (live + world + stopwatch) --- */
