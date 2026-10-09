
/* ---- #2 window snapping (drag to edges) ---- */
function snapZone(x,y){
  const W=innerWidth,H=innerHeight,m=22;
  if(y<=m){ if(x<=W*0.18)return 'tl'; if(x>=W*0.82)return 'tr'; return 'max'; }
  if(y>=H-m){ if(x<=W*0.18)return 'bl'; if(x>=W*0.82)return 'br'; return null; }
  if(x<=m)return 'left';
  if(x>=W-m)return 'right';
  return null;
}
let _snapPrev=null;
function snapRect(zone){
  const W=innerWidth,H=innerHeight-64; // leave room above taskbar
  const half={left:[0,0,W/2,H],right:[W/2,0,W/2,H],max:[0,0,W,H],
    tl:[0,0,W/2,H/2],tr:[W/2,0,W/2,H/2],bl:[0,H/2,W/2,H/2],br:[W/2,H/2,W/2,H/2]};
  return half[zone];
}
function showSnapPreview(zone){
  if(!zone){hideSnapPreview();return;}
  const r=snapRect(zone);if(!r)return;
  if(!_snapPrev){_snapPrev=document.createElement('div');_snapPrev.id='snapPrev';document.body.appendChild(_snapPrev);}
  _snapPrev.style.display='block';_snapPrev.classList.add('on');
  _snapPrev.style.left=r[0]+'px';_snapPrev.style.top=r[1]+'px';_snapPrev.style.width=r[2]+'px';_snapPrev.style.height=r[3]+'px';
}
function hideSnapPreview(){if(_snapPrev){_snapPrev.classList.remove('on');_snapPrev.style.display='none';}}
