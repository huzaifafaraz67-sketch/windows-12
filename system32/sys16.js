function buildSettings(body){
  body.innerHTML=`<div class="settings">
    <div class="nav">
      <div class="it on" data-p="per">Personalization</div>
      <div class="it" data-p="snd">Sound</div>
      <div class="it" data-p="acc">Accessibility</div>
      <div class="it" data-p="sys">System</div>
      <div class="it" data-p="acct">Accounts</div>
      <div class="it" data-p="time">Time &amp; language</div>
      <div class="it" data-p="blu">Bluetooth &amp; devices</div>
      <div class="it" data-p="net">Network</div>
      <div class="it" data-p="upd">Windows Update</div>
      <div class="it" data-p="abt">About</div>
    </div>
    <div class="cnt" id="setCnt"></div></div>`;
  const cnt=body.querySelector('#setCnt');
  const ACCENTS=['#0a84ff','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#14b8a6','#6366f1'];
  function show(p){
    if(p==='per'){
      cnt.innerHTML='<h2>Personalization</h2>'+
        '<div class="card"><div class="lb" style="margin-bottom:4px">Choose your mode</div>'+
        '<div class="ds" style="margin-bottom:14px">Select Light or Dark mode for the desktop and apps.</div>'+
        '<div class="modepick">'+
          '<div class="modecard light'+(SET.theme==="light"?" sel":"")+'" data-m="light">'+
            '<div class="mprev mprev-l"><div class="mwin"><span></span><span></span></div><div class="mtask"></div></div>'+
            '<div class="mname">Light</div></div>'+
          '<div class="modecard dark'+(SET.theme==="dark"?" sel":"")+'" data-m="dark">'+
            '<div class="mprev mprev-d"><div class="mwin"><span></span><span></span></div><div class="mtask"></div></div>'+
            '<div class="mname">Dark</div></div>'+
        '</div></div>'+
        '<div class="card"><div class="row"><div><div class="lb">Transparency effects</div><div class="ds">Acrylic blur on windows</div></div>'+
        '<div class="toggle '+(SET.transp?'on':'')+'" id="tgTransp"></div></div></div>'+
        '<div class="card"><div class="lb">Accent color</div><div class="swatches" id="swAcc"></div></div>'+
        '<div class="card"><div class="lb" style="margin-bottom:8px">Background</div><div class="wpgrid" id="wpg"></div></div>'+
        '<div class="card"><div class="lb" style="margin-bottom:8px">Live wallpaper</div><div class="ds" style="margin-bottom:4px">Pick a video to animate your desktop background.</div><div class="wpgrid" id="lwg"></div></div>';
      const g=cnt.querySelector('#wpg');
      WALLS.forEach(w=>{const im=document.createElement('img');im.src=w;if(w===curWall&&!SET.liveOn)im.style.borderColor=SET.accent;im.addEventListener('click',()=>{curWall=w;SET.wall=w;SET.liveOn=false;saveSet();$('#lock').style.backgroundImage=`url('${w}')`;applyWall();[...g.children].forEach(c=>c.style.borderColor='transparent');[...lg.children].forEach(c=>c.style.borderColor='transparent');im.style.borderColor=SET.accent;});g.appendChild(im);});
      const lg=cnt.querySelector('#lwg');
      LIVE.forEach(src=>{const vd=document.createElement('video');vd.src=src;vd.muted=true;vd.loop=true;vd.playsInline=true;vd.setAttribute('preload','metadata');if(SET.liveOn&&SET.live===src)vd.style.borderColor=SET.accent;
        vd.addEventListener('mouseenter',()=>{const p=vd.play();if(p&&p.catch)p.catch(()=>{});});
        vd.addEventListener('mouseleave',()=>vd.pause());
        vd.addEventListener('click',()=>{SET.live=src;SET.liveOn=true;saveSet();applyWall();[...lg.children].forEach(c=>c.style.borderColor='transparent');[...g.children].forEach(c=>c.style.borderColor='transparent');vd.style.borderColor=SET.accent;});
        lg.appendChild(vd);});
      const sw=cnt.querySelector('#swAcc');
      ACCENTS.forEach(c=>{const d=document.createElement('div');d.className='sw'+(c===SET.accent?' on':'');d.style.background=c;d.addEventListener('click',()=>{SET.accent=c;saveSet();applyTheme();[...sw.children].forEach(x=>x.classList.remove('on'));d.classList.add('on');});sw.appendChild(d);});
      cnt.querySelectorAll('.modecard').forEach(mc=>mc.addEventListener('click',function(){
        SET.theme=this.dataset.m;saveSet();applyTheme();
        cnt.querySelectorAll('.modecard').forEach(x=>x.classList.remove('sel'));this.classList.add('sel');
      }));
      cnt.querySelector('#tgTransp').addEventListener('click',function(){SET.transp=!SET.transp;this.classList.toggle('on');saveSet();});
    }else if(p==='snd'){
      cnt.innerHTML='<h2>Sound</h2>'+
        '<div class="card"><div class="row"><div><div class="lb">Master volume</div><div class="ds"><span id="volv">'+SET.volume+'</span>%</div></div>'+
        '<input type="range" class="slider" id="volS" min="0" max="100" value="'+SET.volume+'"></div>'+
        '<div class="row"><div><div class="lb">UI sounds</div><div class="ds">Play a click when opening apps</div></div>'+
        '<div class="toggle '+(SET.uiSfx?'on':'')+'" id="tgSfx"></div></div></div>'+
        '<div class="card"><div class="row"><div><div class="lb">Startup sound</div><div class="ds">Plays when you sign in</div></div>'+
        '<button class="btn pri" id="testSnd">▶ Test</button></div></div>';
      const vs=cnt.querySelector('#volS');
      vs.addEventListener('input',()=>{SET.volume=+vs.value;cnt.querySelector('#volv').textContent=vs.value;saveSet();try{$('#startup').volume=SET.volume/100;}catch(e){}});
      cnt.querySelector('#tgSfx').addEventListener('click',function(){SET.uiSfx=!SET.uiSfx;this.classList.toggle('on');saveSet();sfx('open');});
      cnt.querySelector('#testSnd').addEventListener('click',playStartup);
    }else if(p==='acc'){
      cnt.innerHTML='<h2>Accessibility</h2>'+
        '<div class="card"><div class="row"><div><div class="lb">Large white cursor</div><div class="ds">Make the mouse pointer bigger</div></div>'+
        '<div class="toggle '+(SET.bigCursor?'on':'')+'" id="tgCur"></div></div></div>'+
        '<div class="card"><div class="ds">The desktop uses a custom white cursor for better visibility.</div></div>';
      cnt.querySelector('#tgCur').addEventListener('click',function(){SET.bigCursor=!SET.bigCursor;this.classList.toggle('on');saveSet();document.body.classList.toggle('bigcur',SET.bigCursor);});
    }else if(p==='abt'){cnt.innerHTML='<h2>About</h2><div class="card">Edition: Windows 12 Pro<br>Version: 12.0.1000.1<br>Installed: 2026<br>Processor: Virtual CPU @ 3.2GHz<br>RAM: 16 GB<br>Device name: PENGUIN<br>System type: 64-bit</div>';}
    else if(p==='upd'){cnt.innerHTML='<h2>Windows Update</h2><div class="card"><img src="icon/update.png" style="width:40px;vertical-align:middle"> You\'re up to date.<br><br>Last checked: today</div><button class="btn" id="chk">Check for updates</button>';const b=cnt.querySelector('#chk');b.addEventListener('click',()=>{b.textContent='Checking...';setTimeout(()=>b.textContent='You\'re up to date',1200);});}
    else if(p==='net'){cnt.innerHTML='<h2>Network &amp; Internet</h2><div class="card"><img src="icon/network.png" style="width:32px;vertical-align:middle"> Connected — penguin<br>IPv4: 100.115.92.2<br>Status: Online</div>';}
    else if(p==='blu'){cnt.innerHTML='<h2>Bluetooth &amp; devices</h2><div class="card"><div class="row"><div class="lb"><img src="icon/blueteeth.png" style="width:24px;vertical-align:middle"> Bluetooth</div><div class="toggle on"></div></div></div><div class="card">No devices paired.</div>';}
    else if(p==='acct'){cnt.innerHTML='<h2>Accounts</h2>'+
      '<div class="card"><div class="row"><div class="lb"><img src="icon/user.png" style="width:40px;height:40px;border-radius:50%;vertical-align:middle" onerror="this.style.display=\'none\'"> Huzaifa</div><div class="ds">Local Account • Administrator</div></div></div>'+
      '<div class="card"><div class="lb" style="margin-bottom:6px">Sign-in options</div><div class="ds">PIN (demo): 1234 • Windows Hello not set up</div></div>'+
      '<div class="card"><div class="ds">Your info, Email &amp; accounts, Family &amp; other users.</div></div>';}
    else if(p==='time'){const d=new Date();cnt.innerHTML='<h2>Time &amp; language</h2>'+
      '<div class="card"><div class="lb">Current date &amp; time</div><div class="ds">'+d.toLocaleString()+'</div></div>'+
      '<div class="card"><div class="row"><div><div class="lb">Set time automatically</div><div class="ds">Sync with internet time</div></div><div class="toggle on"></div></div>'+
      '<div class="row"><div><div class="lb">Time zone</div><div class="ds">(UTC) Coordinated Universal Time</div></div></div></div>'+
      '<div class="card"><div class="lb">Language</div><div class="ds">English (United States)</div></div>';}
    else{cnt.innerHTML='<h2>System</h2>'+
      '<div class="row"><div><div class="lb">Resolution</div><div class="ds">Pick a display resolution</div></div>'+
      '<select id="resSel" class="selbox">'+
        RESOS.map(r=>'<option value="'+r.z+'"'+(Math.abs((SET.scale||1)-r.z)<0.001?' selected':'')+'>'+r.label+'</option>').join('')+
      '</select></div></div>'+
      '<div class="card"><div class="lb" style="margin-bottom:8px">Desktop icon size</div>'+
      '<div class="row"><div><div class="lb">Icon size</div><div class="ds">Small, medium or large</div></div>'+
      '<select id="icSel" class="selbox">'+
        [['sm','Small'],['md','Medium'],['lg','Large']].map(o=>'<option value="'+o[0]+'"'+((SET.iconSize||'md')===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+
      '</select></div></div>'+
      '<div class="card"><div class="lb" style="margin-bottom:8px">Taskbar</div>'+
      '<div class="row"><div><div class="lb">Alignment</div><div class="ds">Center or left</div></div>'+
      '<select id="taSel" class="selbox">'+
        [['center','Center'],['left','Left']].map(o=>'<option value="'+o[0]+'"'+((SET.taskAlign||'center')===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+
      '</select></div>'+
      '<div class="row"><div><div class="lb">Automatically hide the taskbar</div><div class="ds">Shows when you move the pointer to the bottom</div></div>'+
      '<div class="toggle '+(SET.taskHide?'on':'')+'" id="tgHide"></div></div></div>';
      const rs=cnt.querySelector('#resSel');
      rs.addEventListener('change',()=>{SET.scale=+rs.value;saveSet();applyScale();});
      const ic=cnt.querySelector('#icSel');
      ic.addEventListener('change',()=>{setIconSize(ic.value);});
      const ta=cnt.querySelector('#taSel');
      ta.addEventListener('change',()=>{SET.taskAlign=ta.value;saveSet();applyTaskbar();});
      cnt.querySelector('#tgHide').addEventListener('click',function(){SET.taskHide=!SET.taskHide;this.classList.toggle('on');saveSet();applyTaskbar();});
    }
  }
  body.querySelectorAll('.nav .it').forEach(i=>i.addEventListener('click',()=>{body.querySelectorAll('.nav .it').forEach(x=>x.classList.remove('on'));i.classList.add('on');show(i.dataset.p);}));
  show('per');
}
