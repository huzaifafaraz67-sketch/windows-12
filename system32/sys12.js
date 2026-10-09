function buildApp(id,body){
  if(id==='explorer'||id==='thispc'){buildExplorer(body,id==='thispc'?'This PC':'This PC');}
  else if(id==='terminal'){buildTerminal(body);}
  else if(id==='notepad'){body.innerHTML='<textarea class="note" placeholder="Type here... (auto-saves)"></textarea>';const ta=body.querySelector('.note');try{ta.value=localStorage.getItem('w12note')||'';}catch(e){}ta.addEventListener('input',()=>{try{localStorage.setItem('w12note',ta.value);}catch(e){}});}
  else if(id==='calc'){buildCalc(body);}
  else if(id==='settings'){buildSettings(body);}
  else if(id==='recycle'){body.innerHTML='<div class="exp"><div class="main" style="padding:20px"><div class="addr">Recycle Bin</div><div class="pad">Recycle Bin is empty.</div></div></div>';}
  else if(id==='viewer'){const v=pendingView||{src:'wallpaper/oiw.jpg',name:'Photo'};body.innerHTML=`<div class="viewer"><img src="${v.src}"></div>`;const t=openWins['viewer'];if(t){const ti=t.querySelector('.ti');if(ti)ti.innerHTML=`<img src="icon/personal.png"> ${v.name} — Photos`;}}
  else if(id==='games'){body.innerHTML='<div class="pad"><h2 style="margin-bottom:14px">Game Center</h2><div style="display:flex;gap:14px;flex-wrap:wrap"><div style="text-align:center"><img src="icon/game.png" style="width:70px;height:70px"><br>WEGU-KI</div><div style="text-align:center"><img src="icon/game.png" style="width:70px;height:70px"><br>Repent Kill</div><div style="text-align:center"><img src="icon/game.png" style="width:70px;height:70px"><br>I Will Find You</div></div></div>';}
  else if(id==='edge'){body.innerHTML='<div class="pad"><div class="addr" style="margin-bottom:14px">🔒 https://www.bing.com</div><h2>Web</h2><p style="color:var(--txt2);margin-top:8px">A simple browser shell. Live browsing is disabled in this offline desktop.</p></div>';}
  else if(id==='update'){buildUpdate(body);}
  else if(id==='help'){buildHelp(body);}
  else if(id==='onedrive'){buildOneDrive(body);}
  else if(id==='weather'){buildWeather(body);}
  else if(id==='personal'){buildPersonal(body);}
  else{body.innerHTML=`<div class="pad"><h2>${APPS[id].name}</h2></div>`;}
}
let pendingView=null;
function openPhoto(src,name){pendingView={src,name};if(openWins['viewer']){closeApp('viewer');}openApp('viewer');}
