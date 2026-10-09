/* err/34/e34-02.js — keyboard shortcuts help overlay (F1 toggles) */
(function(){
  if(window.__w12_help_init)return; window.__w12_help_init=true;
  var st=document.createElement('style');
  st.textContent='#w12help{position:fixed;inset:0;z-index:999998;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);backdrop-filter:blur(4px)}'+
  '#w12help.on{display:flex}'+
  '#w12help .card{width:460px;max-width:92vw;max-height:80vh;overflow:auto;background:rgba(28,28,32,.96);color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:22px 24px;box-shadow:0 24px 60px rgba(0,0,0,.5);font:14px "Segoe UI",system-ui,sans-serif}'+
  '#w12help h3{margin:0 0 14px;font-size:18px}'+
  '#w12help .k{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.07)}'+
  '#w12help kbd{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:6px;padding:2px 8px;font:12px ui-monospace,monospace}'+
  '#w12help .hint{margin-top:14px;opacity:.6;font-size:12px}';
  document.head.appendChild(st);
  var ov=document.createElement('div'); ov.id='w12help';
  var rows=[['Open / focus Start','Win'],['Switch windows','Alt + Tab'],['Open Control Panel','via Start or desktop'],['Open HPES NO hub','via Start'],['Toggle this help','F1'],['Sign-in demo PIN','1234'],['Close window','Esc / ×'],['Snap window','drag to edge']];
  ov.innerHTML='<div class="card"><h3>\u2328\uFE0F Keyboard shortcuts</h3>'+rows.map(function(r){return '<div class="k"><span>'+r[0]+'</span><kbd>'+r[1]+'</kbd></div>';}).join('')+'<div class="hint">Press F1 or click anywhere to close.</div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(){ ov.classList.remove('on'); });
  window.addEventListener('keydown',function(e){
    if(e.key==='F1'){ e.preventDefault(); ov.classList.toggle('on'); }
    else if(e.key==='Escape' && ov.classList.contains('on')){ ov.classList.remove('on'); }
  });
})();
