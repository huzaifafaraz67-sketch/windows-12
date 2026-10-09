function openApp(id){
  const a=APPS[id];if(!a)return;
  if(openWins[id]){const w=openWins[id];w.style.display='flex';w.classList.remove('minz');focusWin(w);return;}
  winCount++;
  const w=document.createElement('div');
  w.className='win';w.dataset.app=id;
  const ww=Math.min(880,innerWidth-80),wh=Math.min(560,innerHeight-140);
  w.style.width=ww+'px';w.style.height=wh+'px';
  w.style.left=(60+winCount*26%180)+'px';w.style.top=(40+winCount*24%140)+'px';
  w.innerHTML=`<div class="tbar"><div class="ti"><img src="${a.icon}"> ${a.name}</div>`+
    `<div class="ctrls"><div class="mn">–</div><div class="mx">□</div><div class="cl">✕</div></div></div>`+
    `<div class="body"></div>`+
    `<div class="rh n"></div><div class="rh s"></div><div class="rh e"></div><div class="rh w"></div>`+
    `<div class="rh ne"></div><div class="rh nw"></div><div class="rh se"></div><div class="rh sw"></div>`;
  $('#desktop').appendChild(w);
  openWins[id]=w;
  const body=w.querySelector('.body');
  buildApp(id,body);
  // 2s opening animation
  const ld=document.createElement('div');ld.className='loader';
  ld.innerHTML=`<img src="${a.icon}"><div class="ring"></div><div class="lt">Opening ${a.name}…</div>`;
  w.appendChild(ld);
  setTimeout(()=>{ld.style.transition='opacity .3s';ld.style.opacity='0';setTimeout(()=>ld.remove(),320);},1800);
  focusWin(w);sfx('open');
  // taskbar running dot
  let tb=$(`.tbtn[data-app="${id}"]`);
  if(!tb){tb=document.createElement('div');tb.className='tbtn';tb.dataset.app=id;tb.title=a.name;tb.innerHTML=`<img src="${a.icon}">`;tb.addEventListener('click',()=>toggleWin(id));$('#taskbar').appendChild(tb);}
  tb.classList.add('run');
  w.addEventListener('mousedown',()=>focusWin(w));
  // controls
  w.querySelector('.cl').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();sfx('close');closeApp(id);});
  w.querySelector('.mn').addEventListener('click',e=>{e.stopPropagation();minimizeWin(w);});
  w.querySelector('.mx').addEventListener('click',e=>{e.stopPropagation();toggleMax(w);});
  // drag
  const tbar=w.querySelector('.tbar');
  tbar.addEventListener('mousedown',e=>{if(e.target.closest('.ctrls'))return;if(w.classList.contains('max'))return;
    const ox=e.clientX-w.offsetLeft,oy=e.clientY-w.offsetTop;let zone=null;
    function mv(ev){w.style.left=Math.max(0,ev.clientX-ox)+'px';w.style.top=Math.max(0,ev.clientY-oy)+'px';
      zone=snapZone(ev.clientX,ev.clientY);showSnapPreview(zone);}
    function up(ev){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);
      hideSnapPreview();if(zone)applySnap(w,zone);}
    document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);});
  tbar.addEventListener('dblclick',e=>{if(!e.target.closest('.ctrls'))toggleMax(w);});
  // multi-direction resize
  w.querySelectorAll('.rh').forEach(h=>{
    const dir=h.className.replace('rh','').trim();
    h.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();if(w.classList.contains('max'))return;
      const sx=e.clientX,sy=e.clientY,sw=w.offsetWidth,sh=w.offsetHeight,sl=w.offsetLeft,st=w.offsetTop;
      function mv(ev){let dx=ev.clientX-sx,dy=ev.clientY-sy,nw=sw,nh=sh,nl=sl,nt=st;
        if(dir.indexOf('e')>-1)nw=Math.max(360,sw+dx);
        if(dir.indexOf('s')>-1)nh=Math.max(240,sh+dy);
        if(dir.indexOf('w')>-1){nw=Math.max(360,sw-dx);nl=sl+(sw-nw);}
        if(dir.indexOf('n')>-1){nh=Math.max(240,sh-dy);nt=st+(sh-nh);}
        w.style.width=nw+'px';w.style.height=nh+'px';w.style.left=nl+'px';w.style.top=nt+'px';}
      function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}
      document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);});
  });
}
