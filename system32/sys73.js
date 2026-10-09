function buildHpes(body){
  const dark=SET.theme!=='light';
  body.innerHTML='<div class="hpes">'+
    '<div class="hpHead"><div class="hpLogo">⚡</div><div><div class="hpTitle">HPES NO</div><div class="hpSub">Special control panel — tweak everything in one place</div></div></div>'+
    '<div class="hpSecLbl">Quick toggles</div>'+
    '<div class="hpGrid">'+
      '<div class="hpTile" data-k="theme"><div class="hpIco">'+(dark?'🌙':'☀️')+'</div><div class="hpName">'+(dark?'Dark mode':'Light mode')+'</div><div class="hpState" id="hpThemeS">'+(dark?'On':'Off')+'</div></div>'+
      '<div class="hpTile" data-k="transp"><div class="hpIco">🫧</div><div class="hpName">Transparency</div><div class="hpState" id="hpTranspS">'+(SET.transp?'On':'Off')+'</div></div>'+
      '<div class="hpTile" data-k="hide"><div class="hpIco">📥</div><div class="hpName">Auto-hide taskbar</div><div class="hpState" id="hpHideS">'+(SET.taskHide?'On':'Off')+'</div></div>'+
      '<div class="hpTile" data-k="cursor"><div class="hpIco">🖱️</div><div class="hpName">Big cursor</div><div class="hpState" id="hpCurS">'+(SET.bigCursor?'On':'Off')+'</div></div>'+
      '<div class="hpTile" data-k="night"><div class="hpIco">🌅</div><div class="hpName">Night light</div><div class="hpState" id="hpNightS">'+(SET.night?'On':'Off')+'</div></div>'+
      '<div class="hpTile" data-k="focus"><div class="hpIco">🎯</div><div class="hpName">Focus mode</div><div class="hpState" id="hpFocusS">'+(SET.focus?'On':'Off')+'</div></div>'+
    '</div>'+
    '<div class="hpSecLbl">Accent color</div><div class="hpAcc" id="hpAcc"></div>'+
    '<div class="hpSecLbl">Volume</div><div class="hpRow"><span>🔊</span><input type="range" id="hpVol" min="0" max="100" value="'+SET.volume+'"><b id="hpVolV">'+SET.volume+'%</b></div>'+
    '<div class="hpSecLbl">Screen brightness</div><div class="hpRow"><span>☀️</span><input type="range" id="hpBri" min="30" max="100" value="'+(SET.brightness||100)+'"><b id="hpBriV">'+(SET.brightness||100)+'%</b></div>'+
    '<div class="hpSecLbl">Display</div>'+
    '<div class="hpRow"><span>🖼️</span><span style="width:92px">Icon size</span><select id="hpIcon" class="hpSel">'+
      [['sm','Small'],['md','Medium'],['lg','Large']].map(o=>'<option value="'+o[0]+'"'+((SET.iconSize||'md')===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div>'+
    '<div class="hpRow"><span>📏</span><span style="width:92px">Taskbar</span><select id="hpTask" class="hpSel">'+
      [['center','Center'],['left','Left']].map(o=>'<option value="'+o[0]+'"'+((SET.taskAlign||'center')===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div>'+
    '<div class="hpSecLbl">Quick launch</div>'+
    '<div class="hpLaunch" id="hpLaunch"></div>'+
    '<div class="hpSecLbl">Actions</div>'+
    '<div class="hpBtns">'+
      '<button class="hpBtn" id="hpShuffle">🎲 Shuffle wallpaper</button>'+
      '<button class="hpBtn" id="hpClean">🧹 Empty Recycle Bin</button>'+
      '<button class="hpBtn" id="hpReset">♻️ Reset desktop</button>'+
      '<button class="hpBtn" id="hpClrNote">🗒️ Clear notes</button>'+
      '<button class="hpBtn" id="hpMinAll">🪟 Minimize all windows</button>'+
      '<button class="hpBtn" id="hpGame">🎮 Random game</button>'+
      '<button class="hpBtn hpFun" id="hpParty">🎉 Party mode</button>'+
    '</div>'+
    '<div class="hpSecLbl">System</div>'+
    '<div class="hpInfo">Windows 12 Pro · 12.0.1000.1 · 16 GB RAM · Device PENGUIN · 64-bit</div>'+
  '</div>';
  // accents
  const ACC=['#0a84ff','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#14b8a6','#6366f1'];
  const accWrap=body.querySelector('#hpAcc');
  ACC.forEach(c=>{const d=document.createElement('div');d.className='hpSw'+(c===SET.accent?' on':'');d.style.background=c;
    d.addEventListener('click',()=>{SET.accent=c;saveSet();applyTheme();[...accWrap.children].forEach(x=>x.classList.remove('on'));d.classList.add('on');});accWrap.appendChild(d);});
  // toggles
  body.querySelectorAll('.hpTile').forEach(t=>t.addEventListener('click',()=>{
    const k=t.dataset.k;
    if(k==='theme'){SET.theme=SET.theme==='light'?'dark':'light';saveSet();applyTheme();buildHpes(body);return;}
    if(k==='transp'){SET.transp=!SET.transp;body.querySelector('#hpTranspS').textContent=SET.transp?'On':'Off';}
    if(k==='hide'){SET.taskHide=!SET.taskHide;body.querySelector('#hpHideS').textContent=SET.taskHide?'On':'Off';applyTaskbar();}
    if(k==='cursor'){SET.bigCursor=!SET.bigCursor;body.querySelector('#hpCurS').textContent=SET.bigCursor?'On':'Off';document.body.classList.toggle('bigcur',SET.bigCursor);}
    if(k==='night'){SET.night=!SET.night;body.querySelector('#hpNightS').textContent=SET.night?'On':'Off';applyNightLight();}
    if(k==='focus'){SET.focus=!SET.focus;body.querySelector('#hpFocusS').textContent=SET.focus?'On':'Off';applyFocus();}
    saveSet();if(k==='transp')applyTheme();
    t.classList.add('hpPulse');setTimeout(()=>t.classList.remove('hpPulse'),300);
  }));
  // volume
  const v=body.querySelector('#hpVol');v.addEventListener('input',()=>{SET.volume=+v.value;body.querySelector('#hpVolV').textContent=v.value+'%';saveSet();try{$('#startup').volume=SET.volume/100;}catch(e){}});
  // brightness
  const br=body.querySelector('#hpBri');br.addEventListener('input',()=>{SET.brightness=+br.value;body.querySelector('#hpBriV').textContent=br.value+'%';saveSet();applyBrightness();});
  // display selects
  const ic=body.querySelector('#hpIcon');if(ic)ic.addEventListener('change',()=>{setIconSize(ic.value);});
  const tk=body.querySelector('#hpTask');if(tk)tk.addEventListener('change',()=>{SET.taskAlign=tk.value;saveSet();applyTaskbar();});
  // quick launch
  const QL=['explorer','terminal','settings','notepad','calc','weather','games','edge'];
  const ql=body.querySelector('#hpLaunch');
  if(ql)QL.forEach(id=>{if(!APPS[id])return;const d=document.createElement('div');d.className='hpQl';d.title=APPS[id].name;
    d.innerHTML='<img src="'+APPS[id].icon+'"><span>'+APPS[id].name+'</span>';d.addEventListener('click',()=>openApp(id));ql.appendChild(d);});
  // actions
  body.querySelector('#hpShuffle').addEventListener('click',()=>{const i=(WALLS.indexOf(curWall)+1+Math.floor(Math.random()*(WALLS.length-1)))%WALLS.length;curWall=WALLS[i];SET.wall=curWall;SET.liveOn=false;saveSet();$('#lock').style.backgroundImage=`url('${curWall}')`;applyWall();});
  body.querySelector('#hpClean').addEventListener('click',()=>{if(typeof recycle!=='undefined'){recycle.length=0;saveDesk();const rb=openWins['recycle'];if(rb)buildApp('recycle',rb.querySelector('.body'));}sfx('close');});
  body.querySelector('#hpReset').addEventListener('click',()=>{if(confirm('Reset desktop icons and names to default?')){['w12deskNames','w12recycle','w12deskCustom','w12deskOrder','w12icons'].forEach(k=>{try{localStorage.removeItem(k);}catch(e){}});location.reload();}});
  body.querySelector('#hpClrNote').addEventListener('click',()=>{if(confirm('Clear Notepad and Sticky Notes text?')){try{localStorage.removeItem('w12note');localStorage.removeItem('w12sticky');}catch(e){}['notepad','sticky'].forEach(a=>{const w=openWins[a];if(w)buildApp(a,w.querySelector('.body'));});sfx('close');}});
  body.querySelector('#hpMinAll').addEventListener('click',()=>{if(typeof minimizeAll==='function')minimizeAll();});
  body.querySelector('#hpGame').addEventListener('click',()=>{openApp('games');setTimeout(()=>{const w=openWins['games'];if(!w)return;const cards=w.querySelectorAll('.gcCard');if(cards.length)cards[Math.floor(Math.random()*cards.length)].click();},120);});
  body.querySelector('#hpParty').addEventListener('click',()=>{launchEgg();});
}
