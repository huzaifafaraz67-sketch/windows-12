'use strict';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const WALLS=[];for(let i=1;i<=20;i++)WALLS.push('wallpaper/'+i+'.png');
const LIVE=[];for(let i=1;i<=9;i++)LIVE.push('wallpaper/live/'+i+'.mp4');
let curWall=WALLS[0];

/* ---- settings state (persisted) ---- */
const DEF={accent:'#0a84ff',theme:'dark',transp:true,volume:60,uiSfx:true,wall:'wallpaper/1.png',live:null,liveOn:false,bigCursor:false,scale:1,iconSize:'md',taskAlign:'center',taskHide:false};
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
