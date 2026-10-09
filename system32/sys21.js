function buildOneDrive(body){
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/od.png" style="width:34px">OneDrive</h2>'+
    '<div class="card" style="margin-top:14px"><div class="row"><div><div class="lb">\u2713 Your files are synced</div><div class="ds">Up to date \u2014 4.2 GB of 5 GB used</div></div>'+
    '<button class="btn" id="odSync">Sync now</button></div>'+
    '<div style="height:6px;border-radius:4px;background:rgba(255,255,255,.12);margin-top:14px;overflow:hidden"><div style="height:100%;width:84%;background:var(--accent)"></div></div></div>'+
    '<div class="card"><div class="lb" style="margin-bottom:10px">Recent files</div><div class="grid" id="odGrid" style="display:flex;flex-wrap:wrap;gap:6px"></div></div></div>';
  const g=body.querySelector('#odGrid');
  [['Resume.docx','icon/tool-new.png'],['Notes.txt','icon/tool-new.png'],['92e.png','wallpaper/92e.png'],['Projects','icon/folder.png']].forEach(([nm,ic])=>{
    const el=document.createElement('div');el.className='fi';el.style.cssText='width:92px;padding:10px 4px;border-radius:6px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center';el.innerHTML=`<img src="${ic}" style="width:40px;height:40px;object-fit:contain"><span style="font-size:12px;word-break:break-word">${nm}</span>`;g.appendChild(el);});
  const b=body.querySelector('#odSync');b.addEventListener('click',()=>{b.textContent='Syncing\u2026';setTimeout(()=>{b.textContent='Sync now';sfx('open');},1400);});
}
