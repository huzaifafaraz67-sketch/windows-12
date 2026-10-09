
/* ---- 2048 (arrow keys) ---- */
function game2048(area){
  let g,score;
  function reset(){g=Array(16).fill(0);score=0;add();add();render();}
  function add(){const e=g.map((v,i)=>v?-1:i).filter(i=>i>=0);if(!e.length)return;g[e[Math.floor(Math.random()*e.length)]]=Math.random()<.9?2:4;}
  function rot(a){const n=Array(16).fill(0);for(let r=0;r<4;r++)for(let c=0;c<4;c++)n[c*4+(3-r)]=a[r*4+c];return n;}
  function slide(row){let a=row.filter(v=>v);for(let i=0;i<a.length-1;i++){if(a[i]===a[i+1]){a[i]*=2;score+=a[i];a.splice(i+1,1);}}while(a.length<4)a.push(0);return a;}
  function move(dirN){
    let a=g.slice();for(let i=0;i<dirN;i++)a=rot(a);
    let moved=false;const out=[];
    for(let r=0;r<4;r++){const row=a.slice(r*4,r*4+4);const s=slide(row);out.push(...s);if(s.join()!==row.join())moved=true;}
    a=out;for(let i=0;i<(4-dirN)%4;i++)a=rot(a);
    if(moved){g=a;add();render();}
  }
  function render(){
    area.innerHTML='<div class="g2Head">Score: <b>'+score+'</b> <button class="gBtn" id="g2New">New</button></div><div class="g2Grid"></div><div class="snHint">Arrow keys to merge tiles.</div>';
    const gr=area.querySelector('.g2Grid');
    g.forEach(v=>{const t=document.createElement('div');t.className='g2Tile'+(v?' v'+Math.min(v,2048):'');t.textContent=v||'';gr.appendChild(t);});
    area.querySelector('#g2New').addEventListener('click',reset);
  }
  function key(e){
    if(!document.body.contains(area)){document.removeEventListener('keydown',key);return;}
    const m={ArrowLeft:0,ArrowUp:1,ArrowRight:2,ArrowDown:3};
    if(e.key in m){e.preventDefault();move(m[e.key]);}
  }
  reset();document.addEventListener('keydown',key);
}
