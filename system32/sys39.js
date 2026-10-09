
/* --- #24 Snap layouts flyout on maximize-button hover --- */
let _snapFly=null,_snapFlyHideT=null;
function removeSnapFly(){if(_snapFly){_snapFly.remove();_snapFly=null;}}
function _snapScheduleHide(){clearTimeout(_snapFlyHideT);_snapFlyHideT=setTimeout(removeSnapFly,260);}
function _snapCancelHide(){clearTimeout(_snapFlyHideT);}
document.addEventListener('mouseover',e=>{
  const mx=e.target.closest('.mx');
  if(mx){
    _snapCancelHide();
    if(_snapFly&&_snapFly._mx===mx)return;
    removeSnapFly();
    const w=mx.closest('.win');if(!w)return;
    const fly=document.createElement('div');fly.className='snapFly';fly._mx=mx;
    fly.innerHTML='<div class="slGrid">'+
      '<div class="slTile halves"><div class="slCell" data-z="left"></div><div class="slCell" data-z="right"></div></div>'+
      '<div class="slTile quads"><div class="slCell" data-z="tl"></div><div class="slCell" data-z="tr"></div><div class="slCell" data-z="bl"></div><div class="slCell" data-z="br"></div></div>'+
      '</div>';
    document.body.appendChild(fly);
    const r=mx.getBoundingClientRect();
    fly.style.left=Math.max(8,Math.min(r.left-50,innerWidth-fly.offsetWidth-8))+'px';
    fly.style.top=(r.bottom+6)+'px';
    fly.querySelectorAll('.slCell').forEach(c=>c.addEventListener('click',()=>{applySnap(w,c.dataset.z);removeSnapFly();}));
    fly.addEventListener('mouseenter',_snapCancelHide);
    fly.addEventListener('mouseleave',_snapScheduleHide);
    _snapFly=fly;
  }
});
