(function(){
  const cp=document.createElement('div');cp.id='clipPanel';document.body.appendChild(cp);
  function render(){
    cp.innerHTML='<div class="cpHead">Clipboard history</div>'+
      (CLIP.length?CLIP.map((t,i)=>`<div class="cpItem" data-i="${i}">${t.replace(/</g,'&lt;').slice(0,120)}</div>`).join('')
       :'<div class="cpEmpty">Nothing copied yet. Select text and press Ctrl+C.</div>');
    cp.querySelectorAll('.cpItem').forEach(it=>it.addEventListener('click',()=>{const el=document.activeElement;const txt=CLIP[+it.dataset.i];
      if(el&&(el.tagName==='TEXTAREA'||el.tagName==='INPUT')){const s=el.selectionStart||el.value.length,eN=el.selectionEnd||s;el.value=el.value.slice(0,s)+txt+el.value.slice(eN);el.dispatchEvent(new Event('input'));}
      cp.classList.remove('on');}));
  }
  document.addEventListener('keydown',e=>{if((e.key==='v'||e.key==='V')&&e.metaKey){e.preventDefault();render();cp.classList.toggle('on');}});
  document.addEventListener('click',e=>{if(!e.target.closest('#clipPanel'))cp.classList.remove('on');});
})();

/* --- Idle screensaver (floating clock) --- */
(function(){
  let t=null,sv=null;
  const ss=document.createElement('div');ss.id='screensaver';
  ss.innerHTML='<div class="ssInner"><div class="ssClock" id="ssClock">00:00</div><div class="ssDate" id="ssDate"></div></div>';
  document.body.appendChild(ss);
  function upd(){const d=new Date();ss.querySelector('#ssClock').textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});ss.querySelector('#ssDate').textContent=d.toLocaleDateString([],{weekday:'long',month:'long',day:'numeric'});}
  function showSS(){ss.classList.add('on');upd();sv=setInterval(upd,1000);}
  function hideSS(){if(ss.classList.contains('on')){ss.classList.remove('on');clearInterval(sv);}}
  function reset(){hideSS();clearTimeout(t);t=setTimeout(showSS,60000);}
  ['mousemove','mousedown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,reset,true));
  reset();
})();
