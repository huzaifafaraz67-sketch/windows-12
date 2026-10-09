/* err/69/e69-03.js — version badge + about-the-build easter egg */
(function(){
  window.W12=window.W12||{};
  window.W12.build={ name:'Windows 12', edition:'Pro', version:'12.0.2026', ring:'Stable', layout:'desktop.html + system32(20) + style 328i(10) + err/34,err/69' };
  window.W12.about=function(){
    var b=window.W12.build;
    var msg='Windows 12 '+b.edition+'  \u00b7  v'+b.version+'  ('+b.ring+')';
    if(typeof window.W12TOAST==='function') window.W12TOAST('About this build', msg, '\u2139\uFE0F');
    return b;
  };
  // typing "w12" quickly anywhere pops the about toast
  var buf='';
  window.addEventListener('keydown',function(e){
    if(e.target && /input|textarea/i.test(e.target.tagName))return;
    buf=(buf+(e.key||'')).slice(-3).toLowerCase();
    if(buf==='w12'){ buf=''; window.W12.about(); }
  });
})();
