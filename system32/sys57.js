document.addEventListener('keydown',e=>{
  if(!(e.metaKey||e.key==='Meta'))return;
  const k=(e.key||'').toLowerCase();
  if(k==='x'){e.preventDefault();openWinX();}
  else if(k==='l'){e.preventDefault();lockNow();}
  else if(k==='m'){e.preventDefault();if(e.shiftKey)restoreAll();else minimizeAll();}
});

/* ---- battery indicator in systray + volume/battery mini flyout ---- */
let _batLevel=0.86,_batCharging=false;
function batEmoji(l){if(_batCharging)return '⚡';if(l>=.8)return '🔋';if(l>=.4)return '🔋';return '🪫';}
(function initBattery(){
  const ic=$('#systray .ic');if(!ic)return;
  const b=document.createElement('span');b.id='batInd';b.title='Battery';
  b.innerHTML='<span id="batGlyph">🔋</span><span id="batPct">86%</span>';
  ic.appendChild(b);
  function paint(){const g=$('#batGlyph'),p=$('#batPct');if(g)g.textContent=batEmoji(_batLevel);if(p)p.textContent=Math.round(_batLevel*100)+'%';}
  if(navigator.getBattery){navigator.getBattery().then(bt=>{
    _batLevel=bt.level;_batCharging=bt.charging;paint();
    bt.addEventListener('levelchange',()=>{_batLevel=bt.level;paint();});
    bt.addEventListener('chargingchange',()=>{_batCharging=bt.charging;paint();});
  }).catch(()=>paint());}else paint();
})();
