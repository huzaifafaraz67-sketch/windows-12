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
