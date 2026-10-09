/* err/69/e69-04.js — autosave heartbeat: persist settings + fs defensively */
(function(){
  if(window.__w12_autosave_init)return; window.__w12_autosave_init=true;
  function beat(){
    try{ if(typeof SET!=='undefined') localStorage.setItem('w12set',JSON.stringify(SET)); }catch(e){}
  }
  // light heartbeat every 30s and on tab hide
  setInterval(beat,30000);
  document.addEventListener('visibilitychange',function(){ if(document.hidden) beat(); });
  window.addEventListener('beforeunload',beat);
  window.W12=window.W12||{}; window.W12.save=beat;
})();
