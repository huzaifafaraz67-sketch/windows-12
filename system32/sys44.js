function buildPaint(body){
  body.innerHTML='<div class="paint"><div class="pToolbar">'+
    '<input type="color" id="pCol" value="#0a84ff">'+
    '<input type="range" id="pSize" min="1" max="40" value="6">'+
    '<button id="pErase">Eraser</button><button id="pClear">Clear</button></div>'+
    '<canvas id="pCanvas"></canvas></div>';
  const cv=body.querySelector('#pCanvas'),ctx2=cv.getContext('2d');
  function fit(){const r=cv.parentElement.getBoundingClientRect();cv.width=r.width;cv.height=r.height-46;}
  setTimeout(fit,50);
  let drawing=false,erase=false;const col=body.querySelector('#pCol'),size=body.querySelector('#pSize');
  function pos(e){const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];}
  cv.addEventListener('mousedown',e=>{drawing=true;const[x,y]=pos(e);ctx2.beginPath();ctx2.moveTo(x,y);});
  cv.addEventListener('mousemove',e=>{if(!drawing)return;const[x,y]=pos(e);ctx2.lineCap='round';ctx2.lineWidth=+size.value;ctx2.strokeStyle=erase?'#ffffff':col.value;ctx2.lineTo(x,y);ctx2.stroke();});
  window.addEventListener('mouseup',()=>drawing=false);
  body.querySelector('#pErase').addEventListener('click',function(){erase=!erase;this.style.background=erase?'var(--accent)':'';this.style.color=erase?'#fff':'';});
  body.querySelector('#pClear').addEventListener('click',()=>ctx2.clearRect(0,0,cv.width,cv.height));
}

/* --- Media Player (fake) --- */
function buildMedia(body){
  const tracks=[['Startup Suite','System Sounds','3:12'],['Ambient Drift','W12 Audio','4:05'],['Neon Nights','Synth Collective','2:48']];
  let idx=0,playing=false,prog=0,iv=null;
  function render(){
    const t=tracks[idx];
    body.innerHTML='<div class="mp"><div class="mpArt">♪</div>'+
      '<div class="mpTitle">'+t[0]+'</div><div class="mpArtist">'+t[1]+'</div>'+
      '<div class="mpBar"><div class="mpFill" id="mpFill"></div></div>'+
      '<div class="mpTimes"><span id="mpCur">0:00</span><span>'+t[2]+'</span></div>'+
      '<div class="mpCtrls"><button id="mpPrev">⏮</button><button id="mpPlay">'+(playing?'⏸':'▶')+'</button><button id="mpNext">⏭</button></div></div>';
    body.querySelector('#mpPlay').addEventListener('click',toggle);
    body.querySelector('#mpPrev').addEventListener('click',()=>{idx=(idx-1+tracks.length)%tracks.length;prog=0;render();});
    body.querySelector('#mpNext').addEventListener('click',()=>{idx=(idx+1)%tracks.length;prog=0;render();});
    const f=body.querySelector('#mpFill');if(f)f.style.width=prog+'%';
  }
  function toggle(){playing=!playing;render();if(playing){iv=setInterval(()=>{if(!document.body.contains(body)){clearInterval(iv);return;}prog+=0.6;if(prog>=100){prog=0;}const f=body.querySelector('#mpFill');if(f)f.style.width=prog+'%';const c=body.querySelector('#mpCur');if(c){const sec=Math.floor(prog/100*190);c.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}},300);}else if(iv)clearInterval(iv);}
  render();
}
