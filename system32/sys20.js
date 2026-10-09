function buildHelp(body){
  const faqs=[['How do I open an app?','Double-click an icon on the desktop, or open the Start menu and pick a pinned app.'],
    ['How do I change the wallpaper?','Open Settings \u2192 Personalization \u2192 Background, or right-click the desktop and choose Change background.'],
    ['How do I move desktop icons?','Click and drag any icon. Its position is saved automatically.'],
    ['How do I resize a window?','Drag any edge or corner of a window. Drag the title bar to move it, or double-click the title bar to maximize.'],
    ['How do I change the accent color?','Settings \u2192 Personalization \u2192 Accent color.']];
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/help.png" style="width:34px">Get Help</h2>'+
    '<input id="hpQ" placeholder="Search for help\u2026" style="width:100%;margin:14px 0;padding:11px 16px;border-radius:22px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:var(--txt);outline:none;font-size:14px">'+
    '<div id="hpList"></div></div>';
  const list=body.querySelector('#hpList');
  function render(f){list.innerHTML='';faqs.filter(([q,a])=>!f||q.toLowerCase().includes(f)||a.toLowerCase().includes(f)).forEach(([q,a])=>{
    const c=document.createElement('div');c.className='card';c.style.cursor='pointer';
    c.innerHTML='<div class="lb">'+q+'</div><div class="ds" style="margin-top:6px;display:none;line-height:1.6">'+a+'</div>';
    c.addEventListener('click',()=>{const d=c.querySelector('.ds');d.style.display=d.style.display==='none'?'block':'none';});
    list.appendChild(c);});
    if(!list.children.length)list.innerHTML='<div class="card ds">No results found.</div>';}
  render();body.querySelector('#hpQ').addEventListener('input',e=>render(e.target.value.toLowerCase()));
}
