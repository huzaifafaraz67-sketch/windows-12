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
