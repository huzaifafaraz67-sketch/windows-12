document.addEventListener('mouseout',e=>{if(e.target.closest('.mx'))_snapScheduleHide();});

/* --- #95 Konami-code Easter egg --- */
(function(){
  const seq=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
  let i=0;
  document.addEventListener('keydown',e=>{
    const k=e.key.length===1?e.key.toLowerCase():e.key.toLowerCase();
    if(k===seq[i]){i++;if(i===seq.length){i=0;launchEgg();}}
    else{i=(k===seq[0])?1:0;}
  });
})();
function confettiBurst(){
  const c=document.createElement('div');c.className='confetti';document.body.appendChild(c);
  const cols=['#0a84ff','#ff5c8a','#ffd60a','#30d158','#bf5af2','#ff9f0a'];
  for(let n=0;n<90;n++){const p=document.createElement('i');p.style.left=(Math.random()*100)+'vw';p.style.background=cols[n%cols.length];p.style.animationDelay=(Math.random()*0.7)+'s';p.style.setProperty('--rot',(Math.random()*360)+'deg');c.appendChild(p);}
  setTimeout(()=>c.remove(),4600);
}
