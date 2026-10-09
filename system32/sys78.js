function buildControl(body){
  function cards(){
    return '<div class="cplGrid">'+CPL_CATS.map(c=>
      '<div class="cplCard" data-p="'+c[4]+'" data-k="'+c[0]+'">'+
        '<div class="cplIco">'+c[2]+'</div>'+
        '<div class="cplTx"><div class="cplH">'+c[1]+'</div><div class="cplD">'+c[3]+'</div></div>'+
      '</div>').join('')+'</div>';
  }
  body.innerHTML='<div class="cpl">'+
    '<div class="cplBar">'+
      '<div class="cplCrumb"><img src="icon/system.png"><span>Control Panel</span><b id="cplSub"></b></div>'+
      '<input class="cplSearch" id="cplSearch" placeholder="Search Control Panel">'+
    '</div>'+
    '<div class="cplView" id="cplView">'+cards()+'</div>'+
    '<div class="cplFoot">All Control Panel Items \u00B7 Windows 12</div>'+
  '</div>';
  const view=body.querySelector('#cplView');
  const sub=body.querySelector('#cplSub');
  function bindCards(){
    view.querySelectorAll('.cplCard').forEach(card=>{
      card.addEventListener('click',()=>openCat(card.dataset.k));
    });
  }
  function openCat(k){
    const c=CPL_CATS.find(x=>x[0]===k);if(!c)return;
    sub.textContent=' \u203A '+c[1];
    const tasks=CPL_TASKS[k]||[];
    view.innerHTML='<div class="cplBack" id="cplBack">\u2039 All Control Panel Items</div>'+
      '<div class="cplList">'+tasks.map((t,i)=>
        '<div class="cplItem" data-i="'+i+'"><span class="cplItemIco">'+t[1]+'</span>'+
        '<span class="cplItemTx"><b>'+t[0]+'</b><i>'+t[2]+'</i></span></div>').join('')+'</div>';
    view.querySelector('#cplBack').addEventListener('click',()=>{sub.textContent='';view.innerHTML=cards();bindCards();});
    view.querySelectorAll('.cplItem').forEach(el=>el.addEventListener('click',()=>{const t=tasks[+el.dataset.i];if(t&&t[3])t[3]();}));
  }
  bindCards();
  body.querySelector('#cplSearch').addEventListener('input',function(){
    const q=this.value.trim().toLowerCase();
    if(!q){sub.textContent='';view.innerHTML=cards();bindCards();return;}
    const hits=[];
    CPL_CATS.forEach(c=>{(CPL_TASKS[c[0]]||[]).forEach(t=>{if((t[0]+' '+t[2]).toLowerCase().includes(q))hits.push([c[1],t]);});});
    sub.textContent=' \u203A Search';
    view.innerHTML=hits.length?'<div class="cplList">'+hits.map((h,i)=>
      '<div class="cplItem" data-i="'+i+'"><span class="cplItemIco">'+h[1][1]+'</span>'+
      '<span class="cplItemTx"><b>'+h[1][0]+'</b><i>'+h[0]+' \u2014 '+h[1][2]+'</i></span></div>').join('')+'</div>'
      :'<div class="cplEmpty">No results for \u201C'+q+'\u201D</div>';
    view.querySelectorAll('.cplItem').forEach((el,i)=>el.addEventListener('click',()=>{const t=hits[+el.dataset.i][1];if(t&&t[3])t[3]();}));
  });
}
