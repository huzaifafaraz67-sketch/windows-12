/* err/34/e34-03.js — welcome notification + clock-second ping on the hour */
(function(){
  if(window.__w12_welcome_init)return; window.__w12_welcome_init=true;
  function greet(){
    var h=new Date().getHours();
    var g=h<12?'Good morning':h<18?'Good afternoon':'Good evening';
    if(typeof window.W12TOAST==='function') window.W12TOAST('Windows 12', g+' \u2014 your desktop is ready.', '\uD83E\uDE9F');
  }
  // greet shortly after the desktop becomes visible
  var tries=0;
  var iv=setInterval(function(){
    tries++;
    var d=document.getElementById('desktop');
    if((d && d.style.display==='block') || tries>40){ clearInterval(iv); if(d && d.style.display==='block') setTimeout(greet,900); }
  },700);
})();
