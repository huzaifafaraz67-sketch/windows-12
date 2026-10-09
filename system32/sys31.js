function applySnap(w,zone){
  const r=snapRect(zone);if(!r)return;
  w.classList.remove('max');
  w.style.left=r[0]+'px';w.style.top=r[1]+'px';w.style.width=r[2]+'px';w.style.height=r[3]+'px';
  sfx('open');
}

/* ---- #75 Win+D show desktop, Win+arrows snap focused window ---- */
let _deskHidden=false,_hiddenWins=[];
function toggleShowDesktop(){
  const wins=$$('.win');
  if(!_deskHidden){_hiddenWins=wins.filter(w=>w.style.display!=='none');_hiddenWins.forEach(w=>{w.classList.add('minz');w.style.display='none';});_deskHidden=true;}
  else{_hiddenWins.forEach(w=>{w.classList.remove('minz');w.style.display='flex';});_deskHidden=false;_hiddenWins=[];}
}
function topWin(){let top=null,z=-1;$$('.win').forEach(w=>{if(w.style.display!=='none'){const zz=+w.style.zIndex||0;if(zz>=z){z=zz;top=w;}}});return top;}
document.addEventListener('keydown',e=>{
  if(e.metaKey||e.key==='Meta'){
    if(e.key.toLowerCase()==='d'){e.preventDefault();toggleShowDesktop();return;}
    const w=topWin();
    if(w){
      if(e.key==='ArrowLeft'){e.preventDefault();applySnap(w,'left');}
      else if(e.key==='ArrowRight'){e.preventDefault();applySnap(w,'right');}
      else if(e.key==='ArrowUp'){e.preventDefault();toggleMax(w);}
    }
  }
});
