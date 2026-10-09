try{recycle=JSON.parse(localStorage.getItem('w12recycle'))||[];}catch(e){}
try{deskCustom=JSON.parse(localStorage.getItem('w12deskCustom'))||[];}catch(e){}
try{savedOrder=JSON.parse(localStorage.getItem('w12deskOrder'));}catch(e){}
deskCustom.forEach(it=>{APPS[it.id]={name:it.name,icon:it.icon,_folder:!!it.folder};});
if(Array.isArray(savedOrder)){DESKTOP_ICONS.length=0;savedOrder.forEach(id=>{if(APPS[id])DESKTOP_ICONS.push(id);});}
function saveDesk(){try{localStorage.setItem('w12deskNames',JSON.stringify(deskNames));
  localStorage.setItem('w12recycle',JSON.stringify(recycle));
  localStorage.setItem('w12deskCustom',JSON.stringify(deskCustom));
  localStorage.setItem('w12deskOrder',JSON.stringify(DESKTOP_ICONS));}catch(e){}}
function deskName(id){return deskNames[id]||(APPS[id]?APPS[id].name:id);}

/* wrap renderIcons: tag ids, apply custom names, rename-on-dbl-click label */
const _origRenderIcons=renderIcons;
renderIcons=function(){
  _origRenderIcons();
  const layer=$('#iconLayer');
  [...layer.children].forEach((el,i)=>{
    const id=DESKTOP_ICONS[i];if(!id)return;el.dataset.id=id;
    const nm=el.querySelector('span');if(nm){nm.textContent=deskName(id);
      nm.addEventListener('dblclick',ev=>{ev.stopPropagation();startRename(el,id,nm);});}
  });
};
