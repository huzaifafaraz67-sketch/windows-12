function toggleTray(force){
  const f=$('#trayFly');const show=force!==undefined?force:!f.classList.contains('show');
  f.classList.toggle('show',show);if(show)renderCal();
}
$('#systray').addEventListener('click',e=>{e.stopPropagation();toggleTray();});
$$('#trayFly .qa .q').forEach(q=>q.addEventListener('click',e=>{e.stopPropagation();q.classList.toggle('on');sfx('open');}));

/* ================= CONTEXT MENU ================= */
const ctx=$('#ctx');
function showCtx(x,y,items){
  ctx.innerHTML='';
  items.forEach(it=>{
    if(it==='sep'){const s=document.createElement('div');s.className='sep';ctx.appendChild(s);return;}
    const d=document.createElement('div');d.className='ci';
    d.innerHTML=(it.icon?`<img src="${it.icon}">`:'<span style="width:16px"></span>')+it.label;
    d.addEventListener('click',()=>{ctx.style.display='none';it.fn&&it.fn();});
    ctx.appendChild(d);
  });
  ctx.style.display='block';
  const mw=ctx.offsetWidth,mh=ctx.offsetHeight;
  ctx.style.left=Math.min(x,innerWidth-mw-6)+'px';
  ctx.style.top=Math.min(y,innerHeight-mh-6)+'px';
}
