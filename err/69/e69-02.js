/* err/69/e69-02.js — Show desktop (Win+D) minimize-all toggle + bottom-right peek */
(function(){
  if(window.__w12_showdesk_init)return; window.__w12_showdesk_init=true;
  var minimized=[];
  function winList(){ if(typeof openWins==='undefined')return []; return Object.keys(openWins).map(function(id){return openWins[id];}).filter(Boolean); }
  function showDesktop(){
    var ws=winList();
    var anyVisible=ws.some(function(w){return w.style.display!=='none';});
    if(anyVisible){ minimized=[]; ws.forEach(function(w){ if(w.style.display!=='none'){ minimized.push(w); w.style.display='none'; } });
      if(typeof window.W12TOAST==='function') window.W12TOAST('Desktop','Showing desktop','\uD83D\uDDA5\uFE0F');
    } else { minimized.forEach(function(w){ w.style.display='block'; }); minimized=[]; }
  }
  window.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey) && (e.key==='d'||e.key==='D')){ e.preventDefault(); showDesktop(); }
  });
  window.W12=window.W12||{}; window.W12.showDesktop=showDesktop;
})();
