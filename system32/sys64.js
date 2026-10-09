function gameSnake(area){
  area.innerHTML='<div class="snScore">Score: <b id="snS">0</b></div><canvas id="snC" width="360" height="360"></canvas><div class="snHint">Use arrow keys. Click board to focus.</div>';
  const cv=area.querySelector('#snC'),ctx=cv.getContext('2d'),G=18,CELL=360/G;
  let snake,dir,food,iv,score,dead;
  function reset(){snake=[{x:9,y:9}];dir={x:1,y:0};food=spawn();score=0;dead=false;area.querySelector('#snS').textContent='0';}
  function spawn(){let p;do{p={x:Math.floor(Math.random()*G),y:Math.floor(Math.random()*G)};}while(snake&&snake.some(s=>s.x===p.x&&s.y===p.y));return p;}
  function step(){
    if(dead)return;
    const h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(h.x<0||h.y<0||h.x>=G||h.y>=G||snake.some(s=>s.x===h.x&&s.y===h.y)){dead=true;draw();return;}
    snake.unshift(h);
    if(h.x===food.x&&h.y===food.y){score++;area.querySelector('#snS').textContent=score;food=spawn();}
    else snake.pop();
    draw();
  }
  function draw(){
    ctx.fillStyle='#10131a';ctx.fillRect(0,0,360,360);
    ctx.fillStyle='#ff5a5a';ctx.fillRect(food.x*CELL+2,food.y*CELL+2,CELL-4,CELL-4);
    snake.forEach((s,i)=>{ctx.fillStyle=i===0?getComputedStyle(document.documentElement).getPropertyValue('--accent')||'#0a84ff':'#5aa0ff';ctx.fillRect(s.x*CELL+1,s.y*CELL+1,CELL-2,CELL-2);});
    if(dead){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,360,360);ctx.fillStyle='#fff';ctx.font='22px system-ui';ctx.textAlign='center';ctx.fillText('Game Over — Score '+score,180,170);ctx.font='14px system-ui';ctx.fillText('Press any arrow to restart',180,200);}
  }
  function key(e){
    if(!area.closest('.win')||!document.body.contains(area)){document.removeEventListener('keydown',key);clearInterval(iv);return;}
    const k=e.key;if(!k.startsWith('Arrow'))return;e.preventDefault();
    if(dead){reset();return;}
    if(k==='ArrowUp'&&dir.y===0)dir={x:0,y:-1};
    else if(k==='ArrowDown'&&dir.y===0)dir={x:0,y:1};
    else if(k==='ArrowLeft'&&dir.x===0)dir={x:-1,y:0};
    else if(k==='ArrowRight'&&dir.x===0)dir={x:1,y:0};
  }
  reset();draw();
  document.addEventListener('keydown',key);
  iv=setInterval(()=>{if(!document.body.contains(area)){clearInterval(iv);document.removeEventListener('keydown',key);return;}step();},130);
}
