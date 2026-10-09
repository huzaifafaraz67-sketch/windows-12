function buildExplorer(body,start){
  body.innerHTML=`<div class="exp">
    <div class="rib">
      <div class="navbtns"><div class="nb" id="expBack" title="Back">←</div><div class="nb" id="expFwd" title="Forward">→</div><div class="nb" id="expUp" title="Up">↑</div></div>
      <div class="ribdiv"></div>
      <div class="rb" id="rbNew"><img src="icon/tool-new.png">New folder</div>
      <div class="rb" id="rbCut"><img src="icon/tool-cut.png">Cut</div>
      <div class="rb" id="rbCopy"><img src="icon/tool-copy.png">Copy</div>
      <div class="rb" id="rbPaste"><img src="icon/tool-paste.png">Paste</div>
      <div class="rb" id="rbRen"><img src="icon/tool-rename.png">Rename</div>
      <div class="rb" id="rbDel"><img src="icon/rb.png">Delete</div>
      <div class="rb" id="rbSort"><img src="icon/tool-sort.png">Sort</div>
      <div class="rb" id="rbView"><img src="icon/tool-view.png">View</div>
      <div class="expSearch"><input id="expQ" placeholder="Search this folder"></div>
    </div>
    <div class="side">
      <div class="it" data-f="This PC"><img src="icon/thispc.png">This PC</div>
      <div class="it" data-f="Documents"><img src="icon/folder.png">Documents</div>
      <div class="it" data-f="Downloads"><img src="icon/folder.png">Downloads</div>
      <div class="it" data-f="Pictures"><img src="icon/folder.png">Pictures</div>
      <div class="it" data-f="Music"><img src="icon/folder.png">Music</div>
      <div class="it" data-f="Projects"><img src="icon/folder.png">Projects</div>
    </div>
    <div class="main"><div class="crumbs" id="expCrumb"></div><div class="grid" id="expGrid"></div><div class="statusbar" id="expStatus"></div></div>
  </div>`;
  const hist=[];let hi=-1,cur='This PC',sel=-1,q='';
  let view=(typeof SET!=='undefined'&&SET.expView)||'grid';
  const main=body.querySelector('.main');
  function sizeFor(ty){return ty==='folder'?'':((ty==='img'?680:ty==='file'?128:12)+' KB');}
  function crumbs(){
    const c=body.querySelector('#expCrumb');c.innerHTML='';
    const parts=cur==='This PC'?['This PC']:['This PC',cur];
    parts.forEach((p,i)=>{
      const s=document.createElement('span');s.className='crumb';s.textContent=p;
      s.addEventListener('click',()=>nav(p));c.appendChild(s);
      if(i<parts.length-1){const sep=document.createElement('span');sep.className='csep';sep.textContent='›';c.appendChild(sep);}
    });
  }
  function render(f){
    cur=f;sel=-1;
    body.querySelectorAll('.side .it').forEach(i=>i.classList.toggle('on',i.dataset.f===f));
    crumbs();
    const g=body.querySelector('#expGrid');g.className='grid'+(view==='list'?' list':'');g.innerHTML='';
    let items=(FSW[f]||[]).slice();
    if(q)items=items.filter(it=>it[0].toLowerCase().includes(q));
    items.forEach((it,idx)=>{
      const[nm,ic,ty]=it;
      const el=document.createElement('div');el.className='fi';el.dataset.idx=idx;
      el.innerHTML=`<img src="${ic}"><span class="fnm">${nm}</span>`+(view==='list'?`<span class="fty">${ty==='folder'?'Folder':(ty==='img'?'Image':'File')}</span><span class="fsz">${sizeFor(ty)}</span>`:'');
      el.addEventListener('click',e=>{e.stopPropagation();selectItem(idx,el);});
      el.addEventListener('dblclick',()=>openItem(nm,ic,ty));
      el.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();selectItem(idx,el);
        showCtx(e.clientX,e.clientY,[
          {label:'Open',icon:ic,fn:()=>openItem(nm,ic,ty)},
          'sep',
          {label:'Cut',icon:'icon/tool-cut.png',fn:()=>{fsClip={mode:'cut',from:f,item:it.slice()};}},
          {label:'Copy',icon:'icon/tool-copy.png',fn:()=>{fsClip={mode:'copy',from:f,item:it.slice()};}},
          {label:'Rename',icon:'icon/tool-rename.png',fn:()=>renameSel()},
          {label:'Delete',icon:'icon/rb.png',fn:()=>deleteSel()}
        ]);});
      g.appendChild(el);
    });
    const all=FSW[f]||[],folders=all.filter(x=>x[2]==='folder').length;
    body.querySelector('#expStatus').textContent=all.length+' item'+(all.length===1?'':'s')+(folders?(' · '+folders+' folder'+(folders===1?'':'s')):'')+(q?(' · filtered'):'');
    updNav();
  }
  function selectItem(idx,el){sel=idx;body.querySelectorAll('.fi.sel').forEach(x=>x.classList.remove('sel'));if(el)el.classList.add('sel');
    const it=(FSW[cur]||[])[idx];if(it)body.querySelector('#expStatus').textContent=it[0]+'  ·  '+(it[2]==='folder'?'Folder':(it[2]==='img'?'Image file':'File'))+(sizeFor(it[2])?('  ·  '+sizeFor(it[2])):'');}
  function openItem(nm,ic,ty){if(ty==='folder'){if(!FSW[nm])FSW[nm]=[];nav(nm);}else if(ty==='img')openPhoto(ic,nm);else if(/\.(txt|docx)$/i.test(nm))openApp('notepad');else if(/\.(html?)$/i.test(nm))openApp('edge');}
  function nav(f){if(!FSW[f])FSW[f]=[];if(hi<hist.length-1)hist.splice(hi+1);if(hist[hi]!==f){hist.push(f);hi=hist.length-1;}q='';const qi=body.querySelector('#expQ');if(qi)qi.value='';render(f);}
  function updNav(){const b=body.querySelector('#expBack'),fw=body.querySelector('#expFwd'),up=body.querySelector('#expUp');
    b.classList.toggle('off',hi<=0);fw.classList.toggle('off',hi>=hist.length-1);up.classList.toggle('off',cur==='This PC');}
  function newFolder(){
    let base='New folder',nm=base,n=1;const names=(FSW[cur]||[]).map(x=>x[0]);
    while(names.includes(nm)){n++;nm=base+' ('+n+')';}
    FSW[cur]=FSW[cur]||[];FSW[cur].push([nm,'icon/folder.png','folder']);FSW[nm]=[];saveFS();render(cur);
    setTimeout(()=>{const els=[...body.querySelectorAll('.fi')];const el=els.find(e=>e.querySelector('.fnm').textContent===nm);if(el){sel=+el.dataset.idx;el.classList.add('sel');renameSel();}},40);
  }
  function renameSel(){
    if(sel<0)return;const el=body.querySelector('.fi[data-idx="'+sel+'"]');if(!el)return;
    const span=el.querySelector('.fnm');const old=span.textContent;
    const inp=document.createElement('input');inp.className='dRename';inp.value=old;span.replaceWith(inp);inp.focus();inp.select();
    inp.addEventListener('mousedown',e=>e.stopPropagation());
    function commit(){const v=inp.value.trim()||old;const it=FSW[cur][sel];if(it){if(it[2]==='folder'&&FSW[old]){FSW[v]=FSW[old];if(v!==old)delete FSW[old];}it[0]=v;}saveFS();render(cur);}
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();commit();}if(e.key==='Escape')render(cur);});
    inp.addEventListener('blur',commit);
  }
  function deleteSel(){if(sel<0)return;const it=(FSW[cur]||[])[sel];if(!it)return;FSW[cur].splice(sel,1);saveFS();sfx('close');render(cur);}
  function paste(){if(!fsClip)return;FSW[cur]=FSW[cur]||[];const it=fsClip.item.slice();
    const names=FSW[cur].map(x=>x[0]);let nm=it[0],n=1;while(names.includes(nm)){n++;nm=it[0].replace(/(\.[^.]+)?$/,' ('+n+')$1');}it[0]=nm;
    FSW[cur].push(it);if(it[2]==='folder')FSW[nm]=FSW[nm]||[];
    if(fsClip.mode==='cut'){const src=FSW[fsClip.from];if(src){const k=src.findIndex(x=>x[0]===fsClip.item[0]);if(k>=0)src.splice(k,1);}fsClip=null;}
    saveFS();render(cur);}
  function sortNow(){FSW[cur]=(FSW[cur]||[]).slice().sort((a,b)=>{if((a[2]==='folder')!==(b[2]==='folder'))return a[2]==='folder'?-1:1;return a[0].localeCompare(b[0]);});saveFS();render(cur);}
  function toggleView(){view=view==='grid'?'list':'grid';if(typeof SET!=='undefined'){SET.expView=view;try{saveSet();}catch(e){}}render(cur);}
  body.querySelector('#expBack').addEventListener('click',()=>{if(hi>0){hi--;render(hist[hi]);}});
  body.querySelector('#expFwd').addEventListener('click',()=>{if(hi<hist.length-1){hi++;render(hist[hi]);}});
  body.querySelector('#expUp').addEventListener('click',()=>{if(cur!=='This PC')nav('This PC');});
  body.querySelector('#rbNew').addEventListener('click',newFolder);
  body.querySelector('#rbCut').addEventListener('click',()=>{if(sel>=0)fsClip={mode:'cut',from:cur,item:FSW[cur][sel].slice()};});
  body.querySelector('#rbCopy').addEventListener('click',()=>{if(sel>=0)fsClip={mode:'copy',from:cur,item:FSW[cur][sel].slice()};});
  body.querySelector('#rbPaste').addEventListener('click',paste);
  body.querySelector('#rbRen').addEventListener('click',renameSel);
  body.querySelector('#rbDel').addEventListener('click',deleteSel);
  body.querySelector('#rbSort').addEventListener('click',sortNow);
  body.querySelector('#rbView').addEventListener('click',toggleView);
  body.querySelector('#expQ').addEventListener('input',e=>{q=e.target.value.toLowerCase().trim();render(cur);});
  body.querySelectorAll('.side .it[data-f]').forEach(i=>i.addEventListener('click',()=>nav(i.dataset.f)));
  main.addEventListener('click',()=>{sel=-1;body.querySelectorAll('.fi.sel').forEach(x=>x.classList.remove('sel'));});
  main.addEventListener('contextmenu',e=>{if(e.target.closest('.fi'))return;e.preventDefault();e.stopPropagation();
    showCtx(e.clientX,e.clientY,[
      {label:'New folder',icon:'icon/tool-new.png',fn:newFolder},
      {label:'Paste',icon:'icon/tool-paste.png',fn:paste},
      'sep',
      {label:'Sort by name',icon:'icon/tool-sort.png',fn:sortNow},
      {label:(view==='grid'?'List view':'Grid view'),icon:'icon/tool-view.png',fn:toggleView}
    ]);});
  nav(start);
}
