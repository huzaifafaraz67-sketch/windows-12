function buildClock(body){
  body.innerHTML='<div class="clk">'+
    '<div class="clkBig" id="clkNow">00:00:00</div>'+
    '<div class="clkWorld" id="clkWorld"></div>'+
    '<div class="clkSw"><div class="swTime" id="swT">00:00.0</div>'+
      '<div class="swBtns"><button id="swGo">Start</button><button id="swRs">Reset</button></div></div>'+
    '</div>';
  const now=body.querySelector('#clkNow'),world=body.querySelector('#clkWorld');
  const cities=[['New York','America/New_York'],['London','Europe/London'],['Tokyo','Asia/Tokyo'],['Dubai','Asia/Dubai']];
  function tick(){
    const d=new Date();now.textContent=d.toLocaleTimeString();
    world.innerHTML=cities.map(c=>{let t='';try{t=new Date().toLocaleTimeString('en-US',{timeZone:c[1],hour:'2-digit',minute:'2-digit'});}catch(e){t='--:--';}return `<div class="cwRow"><span>${c[0]}</span><b>${t}</b></div>`;}).join('');
  }
  tick();const iv=setInterval(()=>{if(!document.body.contains(body)){clearInterval(iv);clearInterval(sw);return;}tick();},1000);
  // stopwatch
  let swT0=0,swEl=0,swRun=false,sw=null;
  const swEl2=body.querySelector('#swT'),swGo=body.querySelector('#swGo'),swRs=body.querySelector('#swRs');
  function fmt(ms){const m=Math.floor(ms/60000),s=Math.floor(ms/1000)%60,t=Math.floor(ms/100)%10;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+t;}
  function draw(){swEl2.textContent=fmt(swEl+(swRun?Date.now()-swT0:0));}
  swGo.addEventListener('click',()=>{if(swRun){swEl+=Date.now()-swT0;swRun=false;swGo.textContent='Start';}else{swT0=Date.now();swRun=true;swGo.textContent='Stop';}});
  swRs.addEventListener('click',()=>{swEl=0;swRun=false;swGo.textContent='Start';draw();});
  sw=setInterval(draw,100);
}

/* --- Calendar (month grid) --- */
