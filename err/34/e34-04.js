/* err/34/e34-04.js — module registry + boot self-test / diagnostics */
(function(){
  window.W12=window.W12||{}; window.W12.modules=window.W12.modules||[];
  function reg(name){ if(window.W12.modules.indexOf(name)<0) window.W12.modules.push(name); }
  ['e34-01','e34-02','e34-03','e34-04'].forEach(reg);
  window.W12.diag=function(){
    var apps=(typeof APPS!=='undefined')?Object.keys(APPS).length:0;
    var fsOK=false; try{ fsOK=!!localStorage.getItem('w12fs')||true; }catch(e){ fsOK=false; }
    return { modules: window.W12.modules.slice(), apps: apps, storage: fsOK, time: new Date().toISOString() };
  };
  try{
    console.log('%cWindows 12','font-size:20px;font-weight:800;color:#0a84ff','kernel + system32 + err modules loaded');
    console.log('[W12] diagnostics', window.W12.diag());
  }catch(e){}
  window.W12.ready=true;
})();
