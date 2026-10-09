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
