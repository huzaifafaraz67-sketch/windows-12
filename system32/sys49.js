
/* --- Clip assistant (fun helper) --- */
(function(){
  const cl=document.createElement('div');cl.id='clippy';
  const tips=['Tip: Press Win+A to open Action Center.','Tip: Drag a window to a screen edge to snap it.','Tip: Press Win+V for clipboard history.','Tip: Right-click the desktop to change the wallpaper.','Tip: Hover a window\'s square button for snap layouts.','Secret: type "egg" on the desktop for a surprise!'];
  cl.innerHTML='<div class="clBubble" id="clBubble">Hi! I\'m Clip. Type <b>egg</b> on the desktop for a surprise! <span id="clX">✕</span></div><div class="clChar" title="Click for a tip">📎</div>';
  document.body.appendChild(cl);
  cl.querySelector('.clChar').addEventListener('click',()=>{const b=cl.querySelector('#clBubble');b.innerHTML=tips[Math.floor(Math.random()*tips.length)]+' <span id="clX2">✕</span>';b.style.display='block';const x=b.querySelector('#clX2');if(x)x.addEventListener('click',ev=>{ev.stopPropagation();b.style.display='none';});});
  const x0=cl.querySelector('#clX');if(x0)x0.addEventListener('click',e=>{e.stopPropagation();cl.querySelector('#clBubble').style.display='none';});
})();

/* --- Easy Easter-egg trigger: type "egg" on desktop --- */
(function(){let buf='',tmr=null;
  document.addEventListener('keydown',e=>{
    const el=document.activeElement;if(el&&(el.tagName==='INPUT'||el.tagName==='TEXTAREA'))return;
    if(e.key&&e.key.length===1){buf=(buf+e.key.toLowerCase()).slice(-3);clearTimeout(tmr);tmr=setTimeout(()=>buf='',1500);if(buf==='egg'){buf='';launchEgg();}}
  });
})();

/* ================= BATCH 4 FEATURES ================= */

/* ---- desktop file management: new folder / rename / delete / recycle ---- */
let deskNames={},recycle=[],deskCustom=[],savedOrder=null;
try{deskNames=JSON.parse(localStorage.getItem('w12deskNames'))||{};}catch(e){}
