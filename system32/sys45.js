
/* --- Store --- */
function buildStore(body){
  const items=Object.keys(APPS).filter(id=>!['store','taskmgr'].includes(id));
  body.innerHTML='<div class="pad"><h2 style="margin-bottom:14px">Store</h2><div class="stGrid">'+
    items.map(id=>`<div class="stCard" data-id="${id}"><img src="${APPS[id].icon}"><div class="stN">${APPS[id].name}</div><button class="stGet">Open</button></div>`).join('')+
    '</div></div>';
  body.querySelectorAll('.stCard .stGet').forEach(b=>b.addEventListener('click',()=>openApp(b.closest('.stCard').dataset.id)));
}

/* route new apps */
const _bp3=buildApp;
buildApp=function(id,body){
  if(id==='sticky')return buildSticky(body);
  if(id==='clockapp')return buildClock(body);
  if(id==='calendar')return buildCalendar(body);
  if(id==='paint')return buildPaint(body);
  if(id==='media')return buildMedia(body);
  if(id==='store')return buildStore(body);
  return _bp3(id,body);
};
