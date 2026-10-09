function gameMemo(area){
  const EM=['🍎','🚀','🌟','🎧','🐱','🍕','⚽','🎸'];let deck=[],first=null,lock=false,found=0,moves=0;
  function build(){deck=EM.concat(EM).map(e=>({e,up:false,done:false})).sort(()=>Math.random()-.5);first=null;lock=false;found=0;moves=0;render();}
  function flip(i){if(lock||deck[i].up||deck[i].done)return;deck[i].up=true;render();
    if(first===null){first=i;}
    else{moves++;lock=true;
      if(deck[first].e===deck[i].e){deck[first].done=deck[i].done=true;found++;first=null;lock=false;render();
        if(found===EM.length)setTimeout(()=>{const m=area.querySelector('.memoMsg');if(m)m.textContent='🎉 Done in '+moves+' moves!';},50);}
      else{setTimeout(()=>{deck[first].up=false;deck[i].up=false;first=null;lock=false;render();},700);}
    }}
  function render(){
    area.innerHTML='<div class="memoMsg">Moves: '+moves+'</div><div class="memoGrid"></div><button class="gBtn" id="memoNew">Restart</button>';
    const g=area.querySelector('.memoGrid');
    deck.forEach((c,i)=>{const d=document.createElement('div');d.className='memoCard'+((c.up||c.done)?' up':'')+(c.done?' done':'');d.textContent=(c.up||c.done)?c.e:'';d.addEventListener('click',()=>flip(i));g.appendChild(d);});
    area.querySelector('#memoNew').addEventListener('click',build);
  }
  build();
}

/* ---- Snake (canvas, arrow keys) ---- */
