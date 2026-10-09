
/* --- #27 Action Center (Win+A) --- */
(function(){
  const ac=document.createElement('div');ac.id='actionCenter';
  ac.innerHTML=
    '<div class="acQuick">'+
      '<div class="acq on" data-t="wifi"><img src="icon/network.png"><span>Wi-Fi</span></div>'+
      '<div class="acq on" data-t="bt"><img src="icon/blueteeth.png"><span>Bluetooth</span></div>'+
      '<div class="acq" data-t="air"><span class="acqi">✈</span><span>Airplane</span></div>'+
      '<div class="acq" data-t="night"><span class="acqi">🌙</span><span>Night light</span></div>'+
    '</div>'+
    '<div class="acSlider"><span>🔆</span><input type="range" id="acBright" min="40" max="100" value="100"></div>'+
    '<div class="acSlider"><span>🔊</span><input type="range" id="acVol" min="0" max="100"></div>'+
    '<div class="acNotTitle">Notifications</div>'+
    '<div class="acNots" id="acNots"></div>';
  document.body.appendChild(ac);
  const WICO=(typeof WX_ICON!=='undefined'&&WX_ICON)?WX_ICON:'icon/system.png';
  const NOTS=[['Windows Security','Your device is protected and up to date.','icon/safe.png'],
    ['Weather','Sunny today — 24°, light breeze.',WICO],
    ['Windows Update','You\'re running the latest Windows 12.','icon/update.png']];
  ac.querySelector('#acNots').innerHTML=NOTS.map(n=>`<div class="acNot"><img src="${n[2]}"><div><b>${n[0]}</b><div class="acNmsg">${n[1]}</div></div></div>`).join('');
  ac.querySelectorAll('.acq').forEach(q=>q.addEventListener('click',()=>{q.classList.toggle('on');if(q.dataset.t==='night')setNight(q.classList.contains('on'));sfx('open');}));
  const br=ac.querySelector('#acBright');br.addEventListener('input',()=>setBright(+br.value));
  const vl=ac.querySelector('#acVol');vl.value=SET.volume;vl.addEventListener('input',()=>{SET.volume=+vl.value;saveSet();});
  window.toggleActionCenter=function(force){const show=force!==undefined?force:!ac.classList.contains('on');ac.classList.toggle('on',show);};
  document.addEventListener('keydown',e=>{if((e.key==='a'||e.key==='A')&&e.metaKey){e.preventDefault();window.toggleActionCenter();}});
  document.addEventListener('click',e=>{if(!e.target.closest('#actionCenter'))window.toggleActionCenter(false);});
})();
