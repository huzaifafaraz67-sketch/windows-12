/* err/69/e69-01.js — Alt+Tab window switcher overlay */
(function(){
  if(window.__w12_alttab_init)return; window.__w12_alttab_init=true;
  var st=document.createElement('style');
  st.textContent='#w12alt{position:fixed;inset:0;z-index:999997;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.35);backdrop-filter:blur(6px)}'+
  '#w12alt.on{display:flex}'+
  '#w12alt .wrap{display:flex;gap:14px;flex-wrap:wrap;max-width:76vw;justify-content:center;background:rgba(30,30,34,.9);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px}'+
  '#w12alt .it{width:120px;text-align:center;color:#fff;font:12px "Segoe UI",system-ui,sans-serif;padding:10px;border-radius:12px;border:2px solid transparent}'+
  '#w12alt .it.sel{border-color:#0a84ff;background:rgba(10,132,255,.18)}'+
  '#w12alt .it img{width:46px;height:46px;object-fit:contain;display:block;margin:0 auto 8px}'+
  '#w12alt .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
  document.head.appendChild(st);
  var ov=document.createElement('div'); ov.id='w12alt'; ov.innerHTML='<div class="wrap"></div>'; document.body.appendChild(ov);
  var wrap=ov.querySelector('.wrap');
  var ids=[],sel=0,open=false;
  function list(){
    if(typeof openWins==='undefined')return [];
    return Object.keys(openWins).filter(function(id){ var w=openWins[id]; return w && w.style.display!=='none'; });
  }
  function render(){
    wrap.innerHTML=ids.map(function(id,i){
      var a=(typeof APPS!=='undefined'&&APPS[id])?APPS[id]:{name:id,icon:''};
      return '<div class="it'+(i===sel?' sel':'')+'"><img src="'+(a.icon||'')+'"><div class="nm">'+(a.name||id)+'</div></div>';
    }).join('');
    wrap.querySelectorAll('img').forEach(function(im){ im.addEventListener('error',function(){ im.style.visibility='hidden'; }); });
  }
  function commit(){
    open=false; ov.classList.remove('on');
    var id=ids[sel]; if(!id)return;
    try{ if(typeof openApp==='function') openApp(id); if(typeof focusWin==='function' && typeof openWins!=='undefined' && openWins[id]) focusWin(openWins[id]); }catch(e){}
  }
  window.addEventListener('keydown',function(e){
    if(e.altKey && e.key==='Tab'){
      e.preventDefault();
      if(!open){ ids=list(); if(ids.length<2)return; sel=1; open=true; ov.classList.add('on'); }
      else { sel=(sel + (e.shiftKey?-1:1) + ids.length)%ids.length; }
      render();
    }
  });
  window.addEventListener('keyup',function(e){ if(open && (e.key==='Alt'||!e.altKey)) commit(); });
})();
