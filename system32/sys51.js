function startRename(el,id,nm){
  const inp=document.createElement('input');inp.className='dRename';inp.value=deskName(id);
  nm.replaceWith(inp);inp.focus();inp.select();
  function commit(){const v=inp.value.trim()||deskName(id);deskNames[id]=v;saveDesk();renderIcons();}
  inp.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();commit();}if(ev.key==='Escape')renderIcons();});
  inp.addEventListener('blur',commit);
  inp.addEventListener('mousedown',ev=>ev.stopPropagation());
}
function deleteIcon(id){
  const idx=DESKTOP_ICONS.indexOf(id);if(idx<0)return;
  recycle.push({id,name:deskName(id),icon:APPS[id]?APPS[id].icon:'icon/folder.png',custom:deskCustom.some(c=>c.id===id)});
  DESKTOP_ICONS.splice(idx,1);saveDesk();renderIcons();sfx('close');
  const rb=openWins['recycle'];if(rb)buildApp('recycle',rb.querySelector('.body'));
}
function newDeskFolder(){
  const id='folder_'+Date.now();
  APPS[id]={name:'New folder',icon:'icon/folder.png',_folder:true};
  deskCustom.push({id,name:'New folder',icon:'icon/folder.png',folder:true});
  DESKTOP_ICONS.push(id);saveDesk();renderIcons();
  setTimeout(()=>{const el=[...$('#iconLayer').children].find(c=>c.dataset.id===id);if(el){const nm=el.querySelector('span');if(nm)startRename(el,id,nm);}},60);
}

/* icon right-click menu (capture, before desktop menu) */
document.addEventListener('contextmenu',e=>{
  const el=e.target.closest('#iconLayer .dicon');
  if(el){e.preventDefault();e.stopPropagation();const id=el.dataset.id;
    showCtx(e.clientX,e.clientY,[
      {label:'Open',icon:(APPS[id]&&APPS[id].icon),fn:()=>openApp(id)},
      {label:'Rename',icon:'icon/tool-rename.png',fn:()=>{const nm=el.querySelector('span');if(nm)startRename(el,id,nm);}},
      'sep',
      {label:'Delete',icon:'icon/rb.png',fn:()=>deleteIcon(id)}
    ]);
  }
},true);
