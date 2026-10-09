
/* add "New folder" to desktop context menu via capture wrapper is complex; expose globally */
window.newDeskFolder=newDeskFolder;

/* folder windows + recycle bin (override buildApp) */
const _bp4=buildApp;
buildApp=function(id,body){
  if(APPS[id]&&APPS[id]._folder){
    body.innerHTML='<div class="exp"><div class="main" style="padding:0"><div class="addr">'+deskName(id)+'</div><div class="pad" style="color:var(--txt2)">This folder is empty.</div></div></div>';
    return;
  }
  if(id==='recycle'){
    body.innerHTML='<div class="exp"><div class="main" style="padding:16px"><div class="addr">Recycle Bin'+
      '<button class="rbBtn" id="rbEmpty">Empty Recycle Bin</button></div>'+
      (recycle.length?'<div class="rbGrid">'+recycle.map((it,i)=>`<div class="rbItem" data-i="${i}"><img src="${it.icon}"><span>${it.name}</span><button class="rbRestore">Restore</button></div>`).join('')+'</div>'
       :'<div class="pad" style="color:var(--txt2)">Recycle Bin is empty.</div>')+
      '</div></div>';
    const em=body.querySelector('#rbEmpty');if(em)em.addEventListener('click',()=>{recycle.length=0;saveDesk();buildApp('recycle',body);});
    body.querySelectorAll('.rbRestore').forEach(b=>b.addEventListener('click',()=>{
      const i=+b.closest('.rbItem').dataset.i,it=recycle[i];if(!it)return;
      if(it.custom&&!APPS[it.id])APPS[it.id]={name:it.name,icon:it.icon,_folder:true};
      if(!DESKTOP_ICONS.includes(it.id))DESKTOP_ICONS.push(it.id);
      recycle.splice(i,1);saveDesk();renderIcons();buildApp('recycle',body);
    }));
    return;
  }
  return _bp4(id,body);
};
