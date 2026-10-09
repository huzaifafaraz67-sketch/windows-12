applyScale();

/* ---- sound system ---- */
let AC=null;
function actx(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function sfx(type){
  if(!SET.uiSfx)return;const c=actx();if(!c)return;
  const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);
  const v=(SET.volume/100)*0.12;const t=c.currentTime;
  if(type==='open'){o.frequency.setValueAtTime(520,t);o.frequency.exponentialRampToValueAtTime(880,t+.09);}
  else if(type==='close'){o.frequency.setValueAtTime(600,t);o.frequency.exponentialRampToValueAtTime(300,t+.1);}
  else{o.frequency.setValueAtTime(700,t);}
  o.type='sine';g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.0001,t+.16);
  o.start(t);o.stop(t+.18);
}
function playStartup(){try{const a=$('#startup');a.volume=SET.volume/100;a.currentTime=0;a.play().catch(()=>{});}catch(e){}}

/* ---- clock ---- */
function pad(n){return n<10?'0'+n:n;}
