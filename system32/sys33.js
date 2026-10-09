document.addEventListener('keydown',e=>{
  if(e.altKey&&e.key==='Tab'){
    e.preventDefault();
    if(!_altOv){if(!openAltTab())return;}
    else{_altIdx=(e.shiftKey?_altIdx-1+_altList.length:_altIdx+1)%_altList.length;renderAlt();}
  }
});
document.addEventListener('keyup',e=>{if((e.key==='Alt'||!e.altKey)&&_altOv)commitAlt();});

/* ---- #7 rubber-band selection on desktop ---- */
(function(){
  const layer=$('#iconLayer');if(!layer)return;
  layer.addEventListener('mousedown',e=>{
    if(e.button!==0||e.target.closest('.dicon'))return;
    const sx=e.clientX,sy=e.clientY;let box=null,moved=false;
    function mv(ev){
      const dx=ev.clientX-sx,dy=ev.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;
      if(!moved)return;
      if(!box){box=document.createElement('div');box.id='selBox';document.body.appendChild(box);}
      const x=Math.min(sx,ev.clientX),y=Math.min(sy,ev.clientY),w=Math.abs(dx),h=Math.abs(dy);
      box.style.left=x+'px';box.style.top=y+'px';box.style.width=w+'px';box.style.height=h+'px';
      $$('#iconLayer .dicon').forEach(ic=>{
        const r=ic.getBoundingClientRect();
        const hit=!(r.right<x||r.left>x+w||r.bottom<y||r.top>y+h);
        ic.classList.toggle('sel',hit);
      });
    }
    function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);if(box)box.remove();}
    document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
  });
})();
