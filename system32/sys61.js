
/* ---- Minesweeper (9x9, 10 mines) ---- */
function gameMine(area){
  const N=9,M=10;let grid=[],rev=[],flag=[],over=false,won=false,left=N*N-M;
  function build(){grid=[];rev=[];flag=[];for(let i=0;i<N*N;i++){grid.push(0);rev.push(false);flag.push(false);}
    let p=0;while(p<M){const k=Math.floor(Math.random()*N*N);if(grid[k]!==-1){grid[k]=-1;p++;}}
    for(let i=0;i<N*N;i++){if(grid[i]===-1)continue;let c=0;neigh(i).forEach(j=>{if(grid[j]===-1)c++;});grid[i]=c;}
    over=false;won=false;left=N*N-M;render();}
  function neigh(i){const r=Math.floor(i/N),c=i%N,o=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<N&&nc>=0&&nc<N)o.push(nr*N+nc);}return o;}
  function reveal(i){if(rev[i]||flag[i]||over)return;rev[i]=true;left--;
    if(grid[i]===-1){over=true;render();return;}
    if(grid[i]===0)neigh(i).forEach(reveal);
    if(left<=0){won=true;over=true;}render();}
  function render(){
    area.innerHTML='<div class="msBar"><span>💣 '+M+'</span><button class="gBtn" id="msNew">'+(over?(won?'😎 You win!':'💥 Boom'):'🙂')+' New</button></div><div class="msGrid"></div>';
    const g=area.querySelector('.msGrid');g.style.gridTemplateColumns='repeat('+N+',30px)';
    for(let i=0;i<N*N;i++){const c=document.createElement('div');c.className='msCell'+(rev[i]?' op':'')+(grid[i]===-1&&rev[i]?' mine':'');
      if(rev[i]){if(grid[i]===-1)c.textContent='💣';else if(grid[i]>0){c.textContent=grid[i];c.dataset.n=grid[i];}}
      else if(flag[i])c.textContent='🚩';
      c.addEventListener('click',()=>reveal(i));
      c.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();if(!rev[i]&&!over){flag[i]=!flag[i];render();}});
      g.appendChild(c);}
    area.querySelector('#msNew').addEventListener('click',build);
  }
  build();
}
