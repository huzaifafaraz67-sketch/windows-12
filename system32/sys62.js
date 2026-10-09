
/* ---- Tic-Tac-Toe (vs simple AI) ---- */
function gameTTT(area){
  let b=Array(9).fill(''),done=false;
  const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function winner(s){for(const l of L){if(s[l[0]]&&s[l[0]]===s[l[1]]&&s[l[1]]===s[l[2]])return s[l[0]];}return s.every(x=>x)?'draw':null;}
  function ai(){const empty=b.map((v,i)=>v?-1:i).filter(i=>i>=0);
    for(const p of['O','X'])for(const l of L){const vals=l.map(i=>b[i]);if(vals.filter(v=>v===p).length===2&&vals.includes('')){const k=l[vals.indexOf('')];b[k]='O';return;}}
    if(b[4]===''){b[4]='O';return;}
    const k=empty[Math.floor(Math.random()*empty.length)];if(k!=null)b[k]='O';}
  function play(i){if(b[i]||done)return;b[i]='X';let w=winner(b);if(!w){ai();w=winner(b);}if(w)done=true;render(w);}
  function render(w){
    area.innerHTML='<div class="tttMsg">'+(w?(w==='draw'?'Draw!':w+' wins!'):'Your turn (X)')+'</div><div class="tttGrid"></div><button class="gBtn" id="tttNew">New game</button>';
    const g=area.querySelector('.tttGrid');
    b.forEach((v,i)=>{const c=document.createElement('div');c.className='tttCell';c.textContent=v;c.addEventListener('click',()=>play(i));g.appendChild(c);});
    area.querySelector('#tttNew').addEventListener('click',()=>{b=Array(9).fill('');done=false;render(null);});
  }
  render(null);
}

/* ---- Memory Match ---- */
