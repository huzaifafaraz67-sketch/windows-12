function buildExplorer(body,start){
  body.innerHTML=`<div class="exp">
    <div class="rib">
      <div class="navbtns"><div class="nb" id="expBack" title="Back">←</div><div class="nb" id="expFwd" title="Forward">→</div><div class="nb" id="expUp" title="Up">↑</div></div>
      <div class="ribdiv"></div>
      <div class="rb"><img src="icon/tool-new.png">New</div>
      <div class="rb"><img src="icon/tool-cut.png">Cut</div>
      <div class="rb"><img src="icon/tool-copy.png">Copy</div>
      <div class="rb"><img src="icon/tool-paste.png">Paste</div>
      <div class="rb"><img src="icon/tool-rename.png">Rename</div>
      <div class="rb"><img src="icon/tool-sort.png">Sort</div>
      <div class="rb"><img src="icon/tool-view.png">View</div>
    </div>
    <div class="side">
      <div class="it" data-f="This PC"><img src="icon/thispc.png">This PC</div>
      <div class="it" data-f="Documents"><img src="icon/folder.png">Documents</div>
      <div class="it" data-f="Downloads"><img src="icon/folder.png">Downloads</div>
      <div class="it" data-f="Pictures"><img src="icon/folder.png">Pictures</div>
      <div class="it" data-f="Music"><img src="icon/folder.png">Music</div>
      <div class="it"><img src="icon/od.png">OneDrive</div>
      <div class="it"><img src="icon/network.png">Network</div>
    </div>
    <div class="main"><div class="addr" id="expAddr"></div><div class="grid" id="expGrid"></div><div class="statusbar" id="expStatus"></div></div>
  </div>`;
  const hist=[];let hi=-1;
  function render(f){
    body.querySelectorAll('.side .it').forEach(i=>i.classList.toggle('on',i.dataset.f===f));
    body.querySelector('#expAddr').textContent='📁 '+f;
    const g=body.querySelector('#expGrid');g.innerHTML='';
    const items=FS[f]||[];
    items.forEach(([nm,ic,ty])=>{
      const el=document.createElement('div');el.className='fi';
      el.innerHTML=`<img src="${ic}"><span>${nm}</span>`;
      el.addEventListener('dblclick',()=>{if(ty==='folder'&&FS[nm])nav(nm);else if(ty==='img')openPhoto(ic,nm);else if(/\.(txt)$/i.test(nm))openApp('notepad');});
      g.appendChild(el);
    });
    const folders=items.filter(x=>x[2]==='folder').length;
    body.querySelector('#expStatus').textContent=items.length+' item'+(items.length===1?'':'s')+(folders?(' · '+folders+' folder'+(folders===1?'':'s')):'');
    updNav();
  }
  function nav(f){
    if(hi<hist.length-1)hist.splice(hi+1);
    if(hist[hi]!==f){hist.push(f);hi=hist.length-1;}
    render(f);
  }
  function updNav(){
    const b=body.querySelector('#expBack'),fw=body.querySelector('#expFwd'),up=body.querySelector('#expUp');
    b.classList.toggle('off',hi<=0);fw.classList.toggle('off',hi>=hist.length-1);
    up.classList.toggle('off',hist[hi]==='This PC');
  }
  body.querySelector('#expBack').addEventListener('click',()=>{if(hi>0){hi--;render(hist[hi]);}});
  body.querySelector('#expFwd').addEventListener('click',()=>{if(hi<hist.length-1){hi++;render(hist[hi]);}});
  body.querySelector('#expUp').addEventListener('click',()=>{if(hist[hi]!=='This PC')nav('This PC');});
  body.querySelectorAll('.side .it[data-f]').forEach(i=>i.addEventListener('click',()=>nav(i.dataset.f)));
  nav(start);
}
