
/* ---- #74 Alt+Tab switcher ---- */
let _altOv=null,_altIdx=0,_altList=[];
function openAltTab(){
  _altList=$$('.win').filter(w=>w.style.display!=='none');
  if(_altList.length<=1){return false;}
  _altIdx=1%_altList.length;
  _altOv=document.createElement('div');_altOv.id='altTab';
  renderAlt();document.body.appendChild(_altOv);
  return true;
}
function renderAlt(){
  if(!_altOv)return;
  _altOv.innerHTML='';
  _altList.forEach((w,i)=>{
    const id=w.dataset.app,a=APPS[id];
    const c=document.createElement('div');c.className='atile'+(i===_altIdx?' on':'');
    c.innerHTML=`<img src="${a.icon}"><div class="al">${a.name}</div>`;
    c.addEventListener('click',()=>{_altIdx=i;commitAlt();});
    _altOv.appendChild(c);
  });
}
function commitAlt(){
  if(!_altOv)return;const w=_altList[_altIdx];
  _altOv.remove();_altOv=null;
  if(w){w.classList.remove('minz');w.style.display='flex';focusWin(w);}
}
