let iconPos={};
try{iconPos=JSON.parse(localStorage.getItem('w12icons'))||{};}catch(e){}
function defaultPos(i){const sp=ICON_SP[SET.iconSize]||ICON_SP.md;const rows=Math.max(1,Math.floor((innerHeight-120)/sp.y));const col=Math.floor(i/rows),row=i%rows;return{x:14+col*sp.x,y:14+row*sp.y};}
const ICON_SP={sm:{x:78,y:74},md:{x:96,y:92},lg:{x:116,y:112}};
function renderIcons(){
  const layer=$('#iconLayer');layer.innerHTML='';
  layer.className='';layer.classList.add('sz-'+(SET.iconSize||'md'));
  DESKTOP_ICONS.forEach((id,i)=>{
    const a=APPS[id];const el=document.createElement('div');el.className='dicon';el.tabIndex=0;
    const p=iconPos[id]||defaultPos(i);el.style.left=p.x+'px';el.style.top=p.y+'px';
    el.innerHTML=`<img src="${a.icon}"><span>${a.name}</span>`;
    el.addEventListener('click',e=>{$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));el.classList.add('sel');e.stopPropagation();});
    el.addEventListener('dblclick',()=>openApp(id));
    // drag to reposition
    el.addEventListener('mousedown',e=>{
      if(e.button!==0)return;
      const sx=e.clientX,sy=e.clientY,ol=el.offsetLeft,ot=el.offsetTop;let moved=false;
      function mv(ev){const dx=ev.clientX-sx,dy=ev.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;
        if(moved){el.classList.add('drag');
          let nx=Math.max(0,Math.min(innerWidth-86,ol+dx)),ny=Math.max(0,Math.min(innerHeight-150,ot+dy));
          el.style.left=nx+'px';el.style.top=ny+'px';}}
      function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);
        if(moved){el.classList.remove('drag');iconPos[id]={x:el.offsetLeft,y:el.offsetTop};try{localStorage.setItem('w12icons',JSON.stringify(iconPos));}catch(e){}}}
      document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
    });
    layer.appendChild(el);
  });
}
