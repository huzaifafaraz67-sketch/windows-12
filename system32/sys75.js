/* ---- HPES NO: screen overlays (night light, brightness, focus) ---- */
function _screenFx(){let el=document.getElementById('screenFx');if(!el){el=document.createElement('div');el.id='screenFx';document.body.appendChild(el);}return el;}
function applyNightLight(){const el=_screenFx();el.classList.toggle('night',!!SET.night);}
function applyBrightness(){const el=_screenFx();const b=SET.brightness||100;el.style.setProperty('--dim',(1-(b/100))*0.6);}
function applyFocus(){document.body.classList.toggle('focusmode',!!SET.focus);
  // in focus mode, suppress UI click sounds
  if(SET.focus)SET._sfxWas=SET.uiSfx; }
applyNightLight();applyBrightness();applyFocus();
