
/* ---- Pong (canvas vs AI) ---- */
function gamePong(area){
  area.innerHTML='<div class="snScore">You <b id="ppY">0</b> — <b id="ppA">0</b> CPU</div><canvas id="ppC" width="420" height="280"></canvas><div class="snHint">Move the mouse over the board to control your paddle.</div>';
  const cv=area.querySelector('#ppC'),ctx=cv.getContext('2d');
  const W=420,H=280,PW=10,PH=60;
  let py=H/2-PH/2,ay=H/2-PH/2,bx=W/2,by=H/2,vx=3.4,vy=2.2,sY=0,sA=0,iv;
  cv.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();py=Math.max(0,Math.min(H-PH,e.clientY-r.top-PH/2));});
  function step(){
    bx+=vx;by+=vy;
    if(by<6||by>H-6)vy=-vy;
    ay+=Math.max(-4,Math.min(4,(by-(ay+PH/2))*0.09));ay=Math.max(0,Math.min(H-PH,ay));
    if(bx<16&&by>py&&by<py+PH){vx=Math.abs(vx)*1.03;vy+=(by-(py+PH/2))*0.04;}
    if(bx>W-16&&by>ay&&by<ay+PH){vx=-Math.abs(vx);vy+=(by-(ay+PH/2))*0.04;}
    if(bx<0){sA++;reset();}
    if(bx>W){sY++;reset();}
    draw();
  }
  function reset(){bx=W/2;by=H/2;vx=(Math.random()<.5?-1:1)*3.4;vy=(Math.random()*2-1)*2.4;area.querySelector('#ppY').textContent=sY;area.querySelector('#ppA').textContent=sA;}
  function draw(){
    ctx.fillStyle='#10131a';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,.2)';ctx.setLineDash([6,8]);ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);
    const ac=getComputedStyle(document.documentElement).getPropertyValue('--accent')||'#0a84ff';
    ctx.fillStyle=ac;ctx.fillRect(6,py,PW,PH);
    ctx.fillStyle='#ff6b6b';ctx.fillRect(W-6-PW,ay,PW,PH);
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(bx,by,5,0,7);ctx.fill();
  }
  draw();iv=setInterval(()=>{if(!document.body.contains(area)){clearInterval(iv);return;}step();},18);
}
