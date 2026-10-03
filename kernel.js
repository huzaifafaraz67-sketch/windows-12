'use strict';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const WALLS=[];for(let i=1;i<=20;i++)WALLS.push('wallpaper/'+i+'.png');
const LIVE=[];for(let i=1;i<=9;i++)LIVE.push('wallpaper/live/'+i+'.mp4');
let curWall=WALLS[0];

/* ---- settings state (persisted) ---- */
const DEF={accent:'#0a84ff',theme:'dark',transp:true,volume:60,uiSfx:true,wall:'wallpaper/1.png',live:null,liveOn:false,bigCursor:false,scale:1};
let SET=Object.assign({},DEF);
try{const s=JSON.parse(localStorage.getItem('w12set'));if(s)SET=Object.assign(SET,s);}catch(e){}
curWall=SET.wall||WALLS[0];
function applyWall(){
  const d=$('#desktop'),v=$('#liveWall');
  if(!d)return;
  d.style.backgroundImage=`url('${curWall}')`;
  if(SET.liveOn&&SET.live){
    if(v){if(v.getAttribute('src')!==SET.live){v.src=SET.live;}v.style.display='block';const p=v.play();if(p&&p.catch)p.catch(()=>{});}
  }else if(v){v.pause();v.style.display='none';v.removeAttribute('src');v.load();}
}
function saveSet(){try{localStorage.setItem('w12set',JSON.stringify(SET));}catch(e){}}
function applyTheme(){
  const r=document.documentElement.style;
  r.setProperty('--accent',SET.accent);
  if(SET.theme==='light'){
    r.setProperty('--glass','rgba(245,246,250,.7)');
    r.setProperty('--glass2','rgba(250,251,254,.82)');
    r.setProperty('--txt','#1a1c22');r.setProperty('--txt2','#4a4d55');
  }else{
    r.setProperty('--glass','rgba(30,32,40,.62)');
    r.setProperty('--glass2','rgba(40,42,52,.78)');
    r.setProperty('--txt','#f2f3f5');r.setProperty('--txt2','#c7c9cf');
  }
  const bd=SET.transp?'blur(30px) saturate(1.4)':'blur(0px)';
  document.body.classList.toggle('flat',!SET.transp);
  document.body.classList.toggle('bigcur',!!SET.bigCursor);
}
applyTheme();

/* ---- display scale / resolution ---- */
/* lower resolution = bigger zoom factor */
const RESOS=[
  {label:'2560 × 1440 (QHD)',z:0.8},
  {label:'1920 × 1080 (Full HD)',z:1},
  {label:'1600 × 900',z:1.15},
  {label:'1366 × 768',z:1.3},
  {label:'1280 × 720 (HD)',z:1.45},
  {label:'1024 × 768',z:1.7}
];
function applyScale(){
  const z=SET.scale||1;
  try{document.documentElement.style.zoom=z;}catch(e){}
}
applyScale();

/* ---- sound system ---- */
let AC=null;
function actx(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function sfx(type){
  if(!SET.uiSfx)return;const c=actx();if(!c)return;
  const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);
  const v=(SET.volume/100)*0.12;const t=c.currentTime;
  if(type==='open'){o.frequency.setValueAtTime(520,t);o.frequency.exponentialRampToValueAtTime(880,t+.09);}
  else if(type==='close'){o.frequency.setValueAtTime(600,t);o.frequency.exponentialRampToValueAtTime(300,t+.1);}
  else{o.frequency.setValueAtTime(700,t);}
  o.type='sine';g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.0001,t+.16);
  o.start(t);o.stop(t+.18);
}
function playStartup(){try{const a=$('#startup');a.volume=SET.volume/100;a.currentTime=0;a.play().catch(()=>{});}catch(e){}}

/* ---- clock ---- */
function pad(n){return n<10?'0'+n:n;}
function tick(){
  const d=new Date();
  let h=d.getHours(),m=pad(d.getMinutes());
  const ap=h>=12?'PM':'AM';let h12=h%12;if(h12===0)h12=12;
  const t12=h12+':'+m;
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mons=['January','February','March','April','May','June','July','August','September','October','November','December'];
  $('#lockClock').textContent=t12;
  $('#lockDate').textContent=days[d.getDay()]+', '+mons[d.getMonth()]+' '+d.getDate();
  $('#tcTime').textContent=t12+' '+ap;
  $('#tcDate').textContent=(d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();
  const ft=$('#flyTime');if(ft){ft.textContent=t12;$('#flyDate').textContent=days[d.getDay()]+', '+mons[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();}
  const wt=$('#wgTime');if(wt){wt.textContent=t12+' '+ap;$('#wgDate').textContent=days[d.getDay()]+', '+mons[d.getMonth()]+' '+d.getDate();}
}
setInterval(tick,1000);tick();

/* ---- boot -> lock -> desktop ---- */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const b=$('#boot');b.style.opacity='0';
    setTimeout(()=>{b.style.display='none';
      const l=$('#lock');l.style.backgroundImage=`url('${curWall}')`;
    },800);
  },3200);
});
$('#lock').addEventListener('click',e=>{revealLogin();});
document.addEventListener('keydown',e=>{if($('#lock').style.display!=='none'&&$('#boot').style.display==='none'&&$('#login').style.display!=='flex'){revealLogin();}},true);
function revealLogin(){
  if($('#login').style.display==='flex')return;
  $('#login').style.display='flex';
  $('#lockInfo').style.display='none';
  $('#pinInput').focus();
}
function signIn(){
  const l=$('#lock'),d=$('#desktop');
  if(window._signing)return;window._signing=true;
  // reveal desktop (becomes the back face of the spin), ready underneath
  d.style.display='block';applyWall();
  try{playStartup();}catch(e){}
  l.style.display='none';
  cssSpin3D(()=>finishLogin());
}
function finishLogin(){
  const d=$('#desktop');d.classList.add('wake');
  $$('#iconLayer .dicon').forEach((el,i)=>{el.style.animationDelay=(0.05+i*0.06)+'s';el.classList.add('pop');});
  setTimeout(()=>{d.classList.remove('wake');
    $$('#iconLayer .dicon').forEach(el=>{el.classList.remove('pop');el.style.animationDelay='';});window._signing=false;},1000);
}

/* ---- 3D login spin: the screen becomes a panel that rotates in real 3D space.
   Front face = the lock (wallpaper + clock); back face = the REAL desktop with its
   actual app icons attached, so the apps turn with the panel. Done with CSS 3D so it
   works offline on local file:// pages (WebGL can't texture local images there). ---- */
let _spinBusy=false;
function cssSpin3D(done){
  if(_spinBusy){done&&done();return;}_spinBusy=true;
  const d=$('#desktop');
  const home=d.parentNode,next=d.nextSibling;
  const lc=$('#lockClock')?$('#lockClock').textContent:'9:41';
  const ld=$('#lockDate')?$('#lockDate').textContent:'';
  const stage=document.createElement('div');stage.id='spinStage';
  const grp=document.createElement('div');grp.id='spinGroup';
  const front=document.createElement('div');front.className='sface sfront';
  front.style.backgroundImage=`url('${curWall}')`;
  front.innerHTML='<div class="sfdark"></div><div class="sfclock">'+lc+'</div><div class="sfdate">'+ld+'</div>';
  const back=document.createElement('div');back.className='sface sback';
  grp.appendChild(front);grp.appendChild(back);stage.appendChild(grp);document.body.appendChild(stage);
  back.appendChild(d); // the live desktop IS the back face
  let finished=false;
  function restore(){
    if(finished)return;finished=true;
    if(next&&next.parentNode===home)home.insertBefore(d,next);else home.appendChild(d);
    stage.remove();_spinBusy=false;done&&done();
  }
  requestAnimationFrame(()=>requestAnimationFrame(()=>{grp.classList.add('go');}));
  grp.addEventListener('animationend',restore);
  setTimeout(restore,1800); // safety net
}
$('#pinGo').addEventListener('click',signIn);
$('#pinInput').addEventListener('keydown',e=>{if(e.key==='Enter')signIn();});

/* ================= APP REGISTRY ================= */
/* ---- weather (mock data, emoji icon, no missing assets) ---- */
const WX_ICON='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd34e"/><stop offset="1" stop-color="#ff9d2e"/></linearGradient></defs><circle cx="18" cy="18" r="9" fill="url(#s)"/><g stroke="#ffcf4a" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="2" x2="18" y2="6"/><line x1="18" y1="30" x2="18" y2="34"/><line x1="2" y1="18" x2="6" y2="18"/><line x1="30" y1="18" x2="34" y2="18"/><line x1="6.5" y1="6.5" x2="9" y2="9"/><line x1="27" y1="27" x2="29.5" y2="29.5"/><line x1="29.5" y1="6.5" x2="27" y2="9"/><line x1="9" y1="27" x2="6.5" y2="29.5"/></g><path d="M24 38c-5 0-9-1.6-9-6 0-3.7 3-6 6.4-6 1-3 3.8-5 7-5 4.2 0 7.6 3.3 7.6 7.4 0 .3 0 .6-.1.9 2.4.4 4.1 2.3 4.1 4.8 0 2.9-2.4 4.9-5.5 4.9H24z" fill="#eaf2fb"/></svg>');
const WX={
  loc:'San Francisco',
  temp:24,cond:'Sunny',ico:'☀️',hi:26,lo:16,feels:25,
  humidity:48,wind:12,uv:6,
  hourly:[['Now',24,'☀️'],['3PM',25,'☀️'],['4PM',25,'⛅'],['5PM',23,'⛅'],['6PM',21,'☁️'],['7PM',19,'☁️'],['8PM',18,'🌙'],['9PM',17,'🌙']],
  daily:[['Today','☀️',26,16],['Mon','⛅',25,15],['Tue','🌦️',22,14],['Wed','🌧️',19,13],['Thu','☁️',20,13],['Fri','☀️',24,15],['Sat','☀️',27,17]]
};
const APPS={
  explorer:{name:'File Explorer',icon:'icon/explorer.png'},
  thispc:{name:'This PC',icon:'icon/thispc.png'},
  recycle:{name:'Recycle Bin',icon:'icon/rb.png'},
  terminal:{name:'Terminal',icon:'icon/terminal.svg'},
  notepad:{name:'Notepad',icon:'icon/tool-new.png'},
  calc:{name:'Calculator',icon:'icon/qa.png'},
  settings:{name:'Settings',icon:'icon/system.png'},
  games:{name:'Games',icon:'icon/game.png'},
  viewer:{name:'Photos',icon:'icon/personal.png'},
  edge:{name:'Web',icon:'icon/network.png'},
  update:{name:'Update',icon:'icon/update.png'},
  help:{name:'Get Help',icon:'icon/help.png'},
  personal:{name:'Personal',icon:'icon/personal.png'},
  onedrive:{name:'OneDrive',icon:'icon/od.png'},
  weather:{name:'Weather',icon:WX_ICON}
};
const DESKTOP_ICONS=['thispc','recycle','explorer','terminal','settings','games','edge'];
const PINNED=['explorer','terminal','settings','notepad','calc','weather','games','edge','update','help','onedrive'];

/* ================= WINDOW MANAGER ================= */
let zTop=100, winCount=0;
const openWins={};
function focusWin(w){zTop++;w.style.zIndex=zTop;$$('.tbtn.active').forEach(b=>b.classList.remove('active'));
  const tb=$(`.tbtn[data-app="${w.dataset.app}"]`);if(tb)tb.classList.add('active');}

function openApp(id){
  const a=APPS[id];if(!a)return;
  if(openWins[id]){const w=openWins[id];w.style.display='flex';w.classList.remove('minz');focusWin(w);return;}
  winCount++;
  const w=document.createElement('div');
  w.className='win';w.dataset.app=id;
  const ww=Math.min(880,innerWidth-80),wh=Math.min(560,innerHeight-140);
  w.style.width=ww+'px';w.style.height=wh+'px';
  w.style.left=(60+winCount*26%180)+'px';w.style.top=(40+winCount*24%140)+'px';
  w.innerHTML=`<div class="tbar"><div class="ti"><img src="${a.icon}"> ${a.name}</div>`+
    `<div class="ctrls"><div class="mn">–</div><div class="mx">□</div><div class="cl">✕</div></div></div>`+
    `<div class="body"></div>`+
    `<div class="rh n"></div><div class="rh s"></div><div class="rh e"></div><div class="rh w"></div>`+
    `<div class="rh ne"></div><div class="rh nw"></div><div class="rh se"></div><div class="rh sw"></div>`;
  $('#desktop').appendChild(w);
  openWins[id]=w;
  const body=w.querySelector('.body');
  buildApp(id,body);
  // 2s opening animation
  const ld=document.createElement('div');ld.className='loader';
  ld.innerHTML=`<img src="${a.icon}"><div class="ring"></div><div class="lt">Opening ${a.name}…</div>`;
  w.appendChild(ld);
  setTimeout(()=>{ld.style.transition='opacity .3s';ld.style.opacity='0';setTimeout(()=>ld.remove(),320);},1800);
  focusWin(w);sfx('open');
  // taskbar running dot
  let tb=$(`.tbtn[data-app="${id}"]`);
  if(!tb){tb=document.createElement('div');tb.className='tbtn';tb.dataset.app=id;tb.title=a.name;tb.innerHTML=`<img src="${a.icon}">`;tb.addEventListener('click',()=>toggleWin(id));$('#taskbar').appendChild(tb);}
  tb.classList.add('run');
  w.addEventListener('mousedown',()=>focusWin(w));
  // controls
  w.querySelector('.cl').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();sfx('close');closeApp(id);});
  w.querySelector('.mn').addEventListener('click',e=>{e.stopPropagation();w.classList.add('minz');w.style.display='none';});
  w.querySelector('.mx').addEventListener('click',e=>{e.stopPropagation();toggleMax(w);});
  // drag
  const tbar=w.querySelector('.tbar');
  tbar.addEventListener('mousedown',e=>{if(e.target.closest('.ctrls'))return;if(w.classList.contains('max'))return;
    const ox=e.clientX-w.offsetLeft,oy=e.clientY-w.offsetTop;
    function mv(ev){w.style.left=Math.max(0,ev.clientX-ox)+'px';w.style.top=Math.max(0,ev.clientY-oy)+'px';}
    function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}
    document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);});
  tbar.addEventListener('dblclick',e=>{if(!e.target.closest('.ctrls'))toggleMax(w);});
  // multi-direction resize
  w.querySelectorAll('.rh').forEach(h=>{
    const dir=h.className.replace('rh','').trim();
    h.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();if(w.classList.contains('max'))return;
      const sx=e.clientX,sy=e.clientY,sw=w.offsetWidth,sh=w.offsetHeight,sl=w.offsetLeft,st=w.offsetTop;
      function mv(ev){let dx=ev.clientX-sx,dy=ev.clientY-sy,nw=sw,nh=sh,nl=sl,nt=st;
        if(dir.indexOf('e')>-1)nw=Math.max(360,sw+dx);
        if(dir.indexOf('s')>-1)nh=Math.max(240,sh+dy);
        if(dir.indexOf('w')>-1){nw=Math.max(360,sw-dx);nl=sl+(sw-nw);}
        if(dir.indexOf('n')>-1){nh=Math.max(240,sh-dy);nt=st+(sh-nh);}
        w.style.width=nw+'px';w.style.height=nh+'px';w.style.left=nl+'px';w.style.top=nt+'px';}
      function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}
      document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);});
  });
}
function toggleMax(w){
  if(w.classList.contains('max')){w.classList.remove('max');
    w.style.left=w._px||'80px';w.style.top=w._py||'50px';w.style.width=w._pw||'840px';w.style.height=w._ph||'540px';
  }else{w._px=w.style.left;w._py=w.style.top;w._pw=w.style.width;w._ph=w.style.height;
    w.classList.add('max');w.style.left='0';w.style.top='0';w.style.width='100%';w.style.height='calc(100% - 4px)';}
}
function toggleWin(id){const w=openWins[id];if(!w)return openApp(id);
  if(w.style.display==='none'||w.classList.contains('minz')){w.classList.remove('minz');w.style.display='flex';focusWin(w);}
  else{w.classList.add('minz');w.style.display='none';}}
function closeApp(id){const w=openWins[id];if(!w)return;w.remove();delete openWins[id];
  const tb=$(`.tbtn[data-app="${id}"]`);
  if(tb){if(['explorer','terminal','settings','games'].includes(id)){tb.classList.remove('run','active');}else{tb.remove();}}}

/* ================= APP CONTENT ================= */
const FS={
  'This PC':[['Local Disk (C:)','icon/diskwin.png','folder'],['Data (D:)','icon/disk.png','folder'],['Documents','icon/folder.png','folder'],['Downloads','icon/folder.png','folder'],['Pictures','icon/folder.png','folder'],['Music','icon/folder.png','folder']],
  'Documents':[['Resume.docx','icon/tool-new.png','file'],['Notes.txt','icon/tool-new.png','file'],['Projects','icon/folder.png','folder']],
  'Pictures':[['92e.png','wallpaper/92e.png','img'],['e1u.png','wallpaper/e1u.png','img'],['oiw.jpg','wallpaper/oiw.jpg','img'],['oitgb.png','wallpaper/oitgb.png','img']],
  'Downloads':[['setup.exe','icon/apps.png','file'],['game.zip','icon/game.png','file']],
  'Music':[['startup.mp3','icon/qa.png','file']],
  'Projects':[['JUIM OS','icon/folder.png','folder'],['index.html','icon/network.png','file']]
};
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
function buildExplorer(body,start){
  body.innerHTML=`<div class="exp">
    <div class="rib">
      <div class="navbtns"><div class="nb" id="expBack" title="Back">←</div><div class="nb" id="expFwd" title="Forward">→</div><div class="nb" id="expUp" title="Up">↑</div></div>
      <div class="ribdiv"></div>
      <div class="rb"><img src="icon/tool-new.png">New</div>
      <div class="rb"><img src="icon/tool-cut.png">Cut</div>
      <div class="rb"><img src="icon/tool-copy.png">Copy</div>
      <div class="rb"><img src="icon/tool-paste.png">Paste</div>
      <div class="rb"><img src="icon/tool-rename.png">Rename</div>
      <div class="rb"><img src="icon/tool-sort.png">Sort</div>
      <div class="rb"><img src="icon/tool-view.png">View</div>
    </div>
    <div class="side">
      <div class="it" data-f="This PC"><img src="icon/thispc.png">This PC</div>
      <div class="it" data-f="Documents"><img src="icon/folder.png">Documents</div>
      <div class="it" data-f="Downloads"><img src="icon/folder.png">Downloads</div>
      <div class="it" data-f="Pictures"><img src="icon/folder.png">Pictures</div>
      <div class="it" data-f="Music"><img src="icon/folder.png">Music</div>
      <div class="it"><img src="icon/od.png">OneDrive</div>
      <div class="it"><img src="icon/network.png">Network</div>
    </div>
    <div class="main"><div class="addr" id="expAddr"></div><div class="grid" id="expGrid"></div><div class="statusbar" id="expStatus"></div></div>
  </div>`;
  const hist=[];let hi=-1;
  function render(f){
    body.querySelectorAll('.side .it').forEach(i=>i.classList.toggle('on',i.dataset.f===f));
    body.querySelector('#expAddr').textContent='📁 '+f;
    const g=body.querySelector('#expGrid');g.innerHTML='';
    const items=FS[f]||[];
    items.forEach(([nm,ic,ty])=>{
      const el=document.createElement('div');el.className='fi';
      el.innerHTML=`<img src="${ic}"><span>${nm}</span>`;
      el.addEventListener('dblclick',()=>{if(ty==='folder'&&FS[nm])nav(nm);else if(ty==='img')openPhoto(ic,nm);else if(/\.(txt)$/i.test(nm))openApp('notepad');});
      g.appendChild(el);
    });
    const folders=items.filter(x=>x[2]==='folder').length;
    body.querySelector('#expStatus').textContent=items.length+' item'+(items.length===1?'':'s')+(folders?(' · '+folders+' folder'+(folders===1?'':'s')):'');
    updNav();
  }
  function nav(f){
    if(hi<hist.length-1)hist.splice(hi+1);
    if(hist[hi]!==f){hist.push(f);hi=hist.length-1;}
    render(f);
  }
  function updNav(){
    const b=body.querySelector('#expBack'),fw=body.querySelector('#expFwd'),up=body.querySelector('#expUp');
    b.classList.toggle('off',hi<=0);fw.classList.toggle('off',hi>=hist.length-1);
    up.classList.toggle('off',hist[hi]==='This PC');
  }
  body.querySelector('#expBack').addEventListener('click',()=>{if(hi>0){hi--;render(hist[hi]);}});
  body.querySelector('#expFwd').addEventListener('click',()=>{if(hi<hist.length-1){hi++;render(hist[hi]);}});
  body.querySelector('#expUp').addEventListener('click',()=>{if(hist[hi]!=='This PC')nav('This PC');});
  body.querySelectorAll('.side .it[data-f]').forEach(i=>i.addEventListener('click',()=>nav(i.dataset.f)));
  nav(start);
}
function buildTerminal(body){
  body.innerHTML='<div class="term" id="tOut"></div>';
  const out=body.querySelector('#tOut');
  const banner='Windows 12 [Version 12.0.1000.1]\n(c) Microsoft Corporation. All rights reserved.\n\n';
  function line(t){const d=document.createElement('div');d.textContent=t;out.appendChild(d);}
  function prompt(){
    const w=document.createElement('div');w.className='in';
    w.innerHTML='<span>C:\\Users\\Huzaifa></span>';
    const inp=document.createElement('input');inp.autofocus=true;w.appendChild(inp);out.appendChild(w);inp.focus();
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const c=inp.value.trim();inp.disabled=true;run(c);prompt();out.scrollTop=out.scrollHeight;}});
  }
  function run(c){
    const lc=c.toLowerCase();
    if(!c)return;
    if(lc==='help')line('Commands: help, ver, dir, echo, date, time, whoami, cls, systeminfo');
    else if(lc==='ver')line('Windows 12 [Version 12.0.1000.1]');
    else if(lc==='whoami')line('penguin\\huzaifa');
    else if(lc==='dir')line(' Documents  Downloads  Pictures  Music  Projects');
    else if(lc==='date')line(new Date().toDateString());
    else if(lc==='time')line(new Date().toLocaleTimeString());
    else if(lc.startsWith('echo '))line(c.slice(5));
    else if(lc==='cls'){out.innerHTML='';line(banner.trim());}
    else if(lc==='systeminfo')line('OS Name: Windows 12 Pro\nSystem Type: x64\nProcessor: Virtual CPU\nMemory: 16 GB');
    else line("'"+c+"' is not recognized as a command. Type 'help'.");
  }
  line(banner.trim());prompt();
  body.addEventListener('click',()=>{const ins=out.querySelectorAll('input:not([disabled])');if(ins.length)ins[ins.length-1].focus();});
}
function buildCalc(body){
  body.innerHTML='<div class="calc"><div class="scr" id="cScr">0</div><div class="kp" id="cKp"></div></div>';
  const scr=body.querySelector('#cScr'),kp=body.querySelector('#cKp');
  const keys=['C','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','=' ];
  let expr='';
  const map={'÷':'/','×':'*','−':'-'};
  keys.forEach(k=>{const b=document.createElement('button');b.textContent=k;
    if('÷×−+='.includes(k))b.className=k==='='?'eq':'op';
    if(k==='0')b.style.gridColumn='span 2';
    b.addEventListener('click',()=>{
      if(k==='C'){expr='';scr.textContent='0';return;}
      if(k==='='){try{let r=Function('return '+expr.replace(/[^-()\d/*+.]/g,''))();expr=String(r);scr.textContent=r;}catch(e){scr.textContent='Error';expr='';}return;}
      if(k==='±'){if(expr){expr='-('+expr+')';scr.textContent=expr;}return;}
      if(k==='%'){try{expr=String(Function('return '+expr)()/100);scr.textContent=expr;}catch(e){}return;}
      expr+=(map[k]||k);scr.textContent=expr;
    });kp.appendChild(b);});
}
function buildSettings(body){
  body.innerHTML=`<div class="settings">
    <div class="nav">
      <div class="it on" data-p="per">Personalization</div>
      <div class="it" data-p="snd">Sound</div>
      <div class="it" data-p="acc">Accessibility</div>
      <div class="it" data-p="sys">System</div>
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
        '<div class="card"><div class="row"><div><div class="lb">Theme</div><div class="ds">Switch between dark and light</div></div>'+
        '<div class="toggle '+(SET.theme==='dark'?'on':'')+'" id="tgTheme"></div></div>'+
        '<div class="row"><div><div class="lb">Transparency effects</div><div class="ds">Acrylic blur on windows</div></div>'+
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
      cnt.querySelector('#tgTheme').addEventListener('click',function(){SET.theme=SET.theme==='dark'?'light':'dark';this.classList.toggle('on');saveSet();applyTheme();});
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
    else{cnt.innerHTML='<h2>System</h2>'+
      '<div class="card"><div class="lb" style="margin-bottom:8px">Display scale &amp; resolution</div>'+
      '<div class="ds" style="margin-bottom:10px">Adjust how large everything looks on screen.</div>'+
      '<div class="row"><div><div class="lb">Resolution</div><div class="ds">Pick a display resolution</div></div>'+
      '<select id="resSel" class="selbox">'+
        RESOS.map(r=>'<option value="'+r.z+'"'+(Math.abs((SET.scale||1)-r.z)<0.001?' selected':'')+'>'+r.label+'</option>').join('')+
      '</select></div></div>'+
      '<div class="card"><div class="ds">Sound, Notifications, Power &amp; battery, Storage.</div></div>';
      const rs=cnt.querySelector('#resSel');
      rs.addEventListener('change',()=>{SET.scale=+rs.value;saveSet();applyScale();});
    }
  }
  body.querySelectorAll('.nav .it').forEach(i=>i.addEventListener('click',()=>{body.querySelectorAll('.nav .it').forEach(x=>x.classList.remove('on'));i.classList.add('on');show(i.dataset.p);}));
  show('per');
}

/* ================= EXTRA APPS ================= */
function buildUpdate(body){
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/update.png" style="width:34px">Windows Update</h2>'+
    '<div class="card" style="margin-top:14px"><div class="row"><div><div class="lb" id="upSt">You\u2019re up to date</div><div class="ds" id="upDs">Last checked: today</div></div>'+
    '<button class="btn pri" id="upChk">Check for updates</button></div></div>'+
    '<div class="card"><div class="lb">Update history</div><div class="ds" style="margin-top:8px;line-height:1.9">'+
    '\u2713 2026-09 Cumulative Update for Windows 12 (KB5031000)<br>\u2713 Security Intelligence Update (KB2267602)<br>\u2713 .NET Update (KB5030211)</div></div>'+
    '<div class="card"><div class="row"><div><div class="lb">Pause updates</div><div class="ds">Pause for 7 days</div></div><div class="toggle"></div></div></div></div>';
  const b=body.querySelector('#upChk'),st=body.querySelector('#upSt'),ds=body.querySelector('#upDs');
  b.addEventListener('click',()=>{b.disabled=true;st.textContent='Checking for updates\u2026';ds.textContent='Please wait';
    setTimeout(()=>{st.textContent='You\u2019re up to date';ds.textContent='Last checked: just now';b.disabled=false;sfx('open');},1600);});
  body.querySelector('.toggle').addEventListener('click',function(){this.classList.toggle('on');});
}
function buildHelp(body){
  const faqs=[['How do I open an app?','Double-click an icon on the desktop, or open the Start menu and pick a pinned app.'],
    ['How do I change the wallpaper?','Open Settings \u2192 Personalization \u2192 Background, or right-click the desktop and choose Change background.'],
    ['How do I move desktop icons?','Click and drag any icon. Its position is saved automatically.'],
    ['How do I resize a window?','Drag any edge or corner of a window. Drag the title bar to move it, or double-click the title bar to maximize.'],
    ['How do I change the accent color?','Settings \u2192 Personalization \u2192 Accent color.']];
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/help.png" style="width:34px">Get Help</h2>'+
    '<input id="hpQ" placeholder="Search for help\u2026" style="width:100%;margin:14px 0;padding:11px 16px;border-radius:22px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:var(--txt);outline:none;font-size:14px">'+
    '<div id="hpList"></div></div>';
  const list=body.querySelector('#hpList');
  function render(f){list.innerHTML='';faqs.filter(([q,a])=>!f||q.toLowerCase().includes(f)||a.toLowerCase().includes(f)).forEach(([q,a])=>{
    const c=document.createElement('div');c.className='card';c.style.cursor='pointer';
    c.innerHTML='<div class="lb">'+q+'</div><div class="ds" style="margin-top:6px;display:none;line-height:1.6">'+a+'</div>';
    c.addEventListener('click',()=>{const d=c.querySelector('.ds');d.style.display=d.style.display==='none'?'block':'none';});
    list.appendChild(c);});
    if(!list.children.length)list.innerHTML='<div class="card ds">No results found.</div>';}
  render();body.querySelector('#hpQ').addEventListener('input',e=>render(e.target.value.toLowerCase()));
}
function buildOneDrive(body){
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/od.png" style="width:34px">OneDrive</h2>'+
    '<div class="card" style="margin-top:14px"><div class="row"><div><div class="lb">\u2713 Your files are synced</div><div class="ds">Up to date \u2014 4.2 GB of 5 GB used</div></div>'+
    '<button class="btn" id="odSync">Sync now</button></div>'+
    '<div style="height:6px;border-radius:4px;background:rgba(255,255,255,.12);margin-top:14px;overflow:hidden"><div style="height:100%;width:84%;background:var(--accent)"></div></div></div>'+
    '<div class="card"><div class="lb" style="margin-bottom:10px">Recent files</div><div class="grid" id="odGrid" style="display:flex;flex-wrap:wrap;gap:6px"></div></div></div>';
  const g=body.querySelector('#odGrid');
  [['Resume.docx','icon/tool-new.png'],['Notes.txt','icon/tool-new.png'],['92e.png','wallpaper/92e.png'],['Projects','icon/folder.png']].forEach(([nm,ic])=>{
    const el=document.createElement('div');el.className='fi';el.style.cssText='width:92px;padding:10px 4px;border-radius:6px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center';el.innerHTML=`<img src="${ic}" style="width:40px;height:40px;object-fit:contain"><span style="font-size:12px;word-break:break-word">${nm}</span>`;g.appendChild(el);});
  const b=body.querySelector('#odSync');b.addEventListener('click',()=>{b.textContent='Syncing\u2026';setTimeout(()=>{b.textContent='Sync now';sfx('open');},1400);});
}
function buildPersonal(body){
  body.innerHTML='<div class="pad"><div style="display:flex;align-items:center;gap:18px;margin-bottom:8px">'+
    '<div style="width:84px;height:84px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#3aa0ff,#0a5fd0);flex-shrink:0"><img src="icon/personal.png" style="width:100%;height:100%;object-fit:cover"></div>'+
    '<div><h2>Huzaifa</h2><div class="ds">penguin\\huzaifa \u00b7 Local account</div></div></div>'+
    '<div class="card"><div class="row"><div class="lb">Account type</div><div class="ds">Administrator</div></div></div>'+
    '<div class="card"><div class="lb" style="margin-bottom:8px">Your info</div><div class="ds" style="line-height:1.9">Device: PENGUIN<br>Edition: Windows 12 Pro<br>Signed in with PIN</div></div>'+
    '<div class="card"><div class="row"><div><div class="lb">Sign out</div><div class="ds">Lock the device and return to sign-in</div></div><button class="btn pri" id="pSignout">Sign out</button></div></div></div>';
  body.querySelector('#pSignout').addEventListener('click',()=>{if(confirm('Sign out and lock?'))location.reload();});
}
function buildWeather(body){
  const hourly=WX.hourly.map(([t,tp,ic])=>`<div class="wh"><div class="wht">${t}</div><div class="whi">${ic}</div><div class="whp">${tp}°</div></div>`).join('');
  const daily=WX.daily.map(([d,ic,hi,lo])=>`<div class="wd"><div class="wdd">${d}</div><div class="wdi">${ic}</div><div class="wdb"><span class="lo">${lo}°</span><div class="bar"><div style="left:${(lo-10)*4}%;right:${100-(hi-10)*4}%"></div></div><span class="hi">${hi}°</span></div></div>`).join('');
  body.innerHTML=`<div class="wxapp">
    <div class="wxhero">
      <div class="wxloc">${WX.loc}</div>
      <div class="wxbig"><span class="wxicoBig">${WX.ico}</span><span class="wxtemp">${WX.temp}°</span></div>
      <div class="wxcond">${WX.cond}</div>
      <div class="wxhl">H:${WX.hi}° · L:${WX.lo}° · Feels like ${WX.feels}°</div>
    </div>
    <div class="wxcard"><div class="wxlbl">Hourly forecast</div><div class="wxhours">${hourly}</div></div>
    <div class="wxcard"><div class="wxlbl">7-day forecast</div><div class="wxdays">${daily}</div></div>
    <div class="wxcard"><div class="wxlbl">Conditions</div><div class="wxstats">
      <div class="wxst"><div class="k">Humidity</div><div class="v">${WX.humidity}%</div></div>
      <div class="wxst"><div class="k">Wind</div><div class="v">${WX.wind} km/h</div></div>
      <div class="wxst"><div class="k">UV index</div><div class="v">${WX.uv}</div></div>
      <div class="wxst"><div class="k">Feels like</div><div class="v">${WX.feels}°</div></div>
    </div></div>
  </div>`;
}

/* ================= DESKTOP ICONS (draggable) ================= */
let iconPos={};
try{iconPos=JSON.parse(localStorage.getItem('w12icons'))||{};}catch(e){}
function defaultPos(i){const col=Math.floor(i/7),row=i%7;return{x:14+col*96,y:14+row*92};}
function renderIcons(){
  const layer=$('#iconLayer');layer.innerHTML='';
  DESKTOP_ICONS.forEach((id,i)=>{
    const a=APPS[id];const el=document.createElement('div');el.className='dicon';el.tabIndex=0;
    const p=iconPos[id]||defaultPos(i);el.style.left=p.x+'px';el.style.top=p.y+'px';
    el.innerHTML=`<img src="${a.icon}"><span>${a.name}</span>`;
    el.addEventListener('click',e=>{$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));el.classList.add('sel');e.stopPropagation();});
    el.addEventListener('dblclick',()=>openApp(id));
    // drag to reposition
    el.addEventListener('mousedown',e=>{
      if(e.button!==0)return;
      const sx=e.clientX,sy=e.clientY,ol=el.offsetLeft,ot=el.offsetTop;let moved=false;
      function mv(ev){const dx=ev.clientX-sx,dy=ev.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;
        if(moved){el.classList.add('drag');
          let nx=Math.max(0,Math.min(innerWidth-86,ol+dx)),ny=Math.max(0,Math.min(innerHeight-150,ot+dy));
          el.style.left=nx+'px';el.style.top=ny+'px';}}
      function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);
        if(moved){el.classList.remove('drag');iconPos[id]={x:el.offsetLeft,y:el.offsetTop};try{localStorage.setItem('w12icons',JSON.stringify(iconPos));}catch(e){}}}
      document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
    });
    layer.appendChild(el);
  });
}
renderIcons();

/* ---- weather widget wiring ---- */
function fillWeatherWidget(){
  const ic=$('#wgIco');if(!ic)return;
  ic.textContent=WX.ico;$('#wgTemp').textContent=WX.temp+'°';
  $('#wgCond').textContent=WX.cond;$('#wgLoc').textContent=WX.loc;
}
fillWeatherWidget();
(function(){const wv=$('#wWeather');if(wv)wv.addEventListener('click',()=>openApp('weather'));})();

/* ================= PINNED (start menu) ================= */
function renderPinned(filter){
  const g=$('#pinGrid');g.innerHTML='';
  PINNED.filter(id=>!filter||APPS[id].name.toLowerCase().includes(filter)).forEach((id,i)=>{
    const a=APPS[id];const el=document.createElement('div');el.className='pinItem slidein';
    el.style.animationDelay=(i*0.035)+'s';
    el.innerHTML=`<img src="${a.icon}"><span>${a.name}</span>`;
    el.addEventListener('click',()=>{openApp(id);toggleStart(false);});
    g.appendChild(el);
  });
}
renderPinned();
$('#smSearch').addEventListener('input',e=>renderPinned(e.target.value.toLowerCase()));

/* ================= START MENU ================= */
function toggleStart(force){
  const m=$('#startMenu');
  const show=force!==undefined?force:!m.classList.contains('show');
  m.classList.toggle('show',show);
  $('#startBtn').classList.toggle('active',show);
  if(show){renderPinned();$('#smSearch').value='';setTimeout(()=>$('#smSearch').focus(),50);}
}
$('#startBtn').addEventListener('click',e=>{e.stopPropagation();toggleStart();});
$('#tbSearch').addEventListener('click',e=>{e.stopPropagation();toggleStart(true);});
$('#powerBtn').addEventListener('click',()=>{if(confirm('Sign out and lock?')){location.reload();}});

/* taskbar app buttons */
$$('#taskbar .tbtn[data-app]').forEach(b=>b.addEventListener('click',()=>toggleWin(b.dataset.app)));

/* ================= TRAY FLYOUT ================= */
function renderCal(){
  const d=new Date();const cal=$('#flyCal');cal.innerHTML='';
  const hd=['S','M','T','W','T','F','S'];hd.forEach(x=>{const e=document.createElement('div');e.className='hd';e.textContent=x;cal.appendChild(e);});
  const first=new Date(d.getFullYear(),d.getMonth(),1).getDay();
  const days=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
  for(let i=0;i<first;i++)cal.appendChild(document.createElement('div'));
  for(let n=1;n<=days;n++){const e=document.createElement('div');e.textContent=n;if(n===d.getDate())e.className='tdy';cal.appendChild(e);}
}
function toggleTray(force){
  const f=$('#trayFly');const show=force!==undefined?force:!f.classList.contains('show');
  f.classList.toggle('show',show);if(show)renderCal();
}
$('#systray').addEventListener('click',e=>{e.stopPropagation();toggleTray();});
$$('#trayFly .qa .q').forEach(q=>q.addEventListener('click',e=>{e.stopPropagation();q.classList.toggle('on');sfx('open');}));

/* ================= CONTEXT MENU ================= */
const ctx=$('#ctx');
function showCtx(x,y,items){
  ctx.innerHTML='';
  items.forEach(it=>{
    if(it==='sep'){const s=document.createElement('div');s.className='sep';ctx.appendChild(s);return;}
    const d=document.createElement('div');d.className='ci';
    d.innerHTML=(it.icon?`<img src="${it.icon}">`:'<span style="width:16px"></span>')+it.label;
    d.addEventListener('click',()=>{ctx.style.display='none';it.fn&&it.fn();});
    ctx.appendChild(d);
  });
  ctx.style.display='block';
  const mw=ctx.offsetWidth,mh=ctx.offsetHeight;
  ctx.style.left=Math.min(x,innerWidth-mw-6)+'px';
  ctx.style.top=Math.min(y,innerHeight-mh-6)+'px';
}
$('#desktop').addEventListener('contextmenu',e=>{
  if(e.target.closest('.win'))return;
  e.preventDefault();
  showCtx(e.clientX,e.clientY,[
    {label:'View',icon:'icon/tool-view.png'},
    {label:'Sort by',icon:'icon/tool-sort.png'},
    {label:'Refresh',icon:'icon/update.png',fn:renderIcons},
    'sep',
    {label:'New folder',icon:'icon/tool-new.png'},
    {label:'Change background',icon:'icon/personal.png',fn:()=>{const i=WALLS.indexOf(curWall);curWall=WALLS[(i+1)%WALLS.length];SET.wall=curWall;SET.liveOn=false;saveSet();$('#lock').style.backgroundImage=`url('${curWall}')`;applyWall();}},
    'sep',
    {label:'Display settings',icon:'icon/system.png',fn:()=>openApp('settings')},
    {label:'Terminal',icon:'icon/terminal.svg',fn:()=>openApp('terminal')}
  ]);
});
/* global close */
document.addEventListener('click',e=>{
  ctx.style.display='none';
  if(!e.target.closest('#startMenu')&&!e.target.closest('#startBtn')&&!e.target.closest('#tbSearch'))toggleStart(false);
  if(!e.target.closest('#trayFly')&&!e.target.closest('#systray'))toggleTray(false);
  if(!e.target.closest('.dicon'))$$('.dicon.sel').forEach(x=>x.classList.remove('sel'));
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){ctx.style.display='none';toggleStart(false);toggleTray(false);}});
