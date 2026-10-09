/* err/34/e34-01.js — toast notifications + global error capture */
(function(){
  if(window.__w12_toast_init)return; window.__w12_toast_init=true;
  var st=document.createElement('style');
  st.textContent='#w12toasts{position:fixed;right:16px;bottom:64px;display:flex;flex-direction:column;gap:10px;z-index:999999;pointer-events:none}'+
  '.w12toast{min-width:220px;max-width:340px;background:rgba(32,32,36,.92);color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 14px;box-shadow:0 10px 30px rgba(0,0,0,.45);backdrop-filter:blur(16px);font:13px "Segoe UI",system-ui,sans-serif;transform:translateX(120%);opacity:0;transition:.28s cubic-bezier(.2,.8,.2,1);pointer-events:auto}'+
  '.w12toast.show{transform:none;opacity:1}'+
  '.w12toast .tTitle{font-weight:600;margin-bottom:3px;display:flex;align-items:center;gap:8px}'+
  '.w12toast .tBody{opacity:.82;line-height:1.4}';
  document.head.appendChild(st);
  var host=document.createElement('div'); host.id='w12toasts'; document.body.appendChild(host);
  window.W12TOAST=function(title,body,icon){
    try{
      var t=document.createElement('div'); t.className='w12toast';
      t.innerHTML='<div class="tTitle"><span>'+(icon||'\uD83D\uDD14')+'</span><span>'+String(title||'').replace(/[<>&]/g,'')+'</span></div>'+(body?'<div class="tBody">'+String(body).replace(/[<>&]/g,'')+'</div>':'');
      host.appendChild(t);
      requestAnimationFrame(function(){ t.classList.add('show'); });
      setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); },320); },4200);
    }catch(e){}
  };
  var last=0;
  window.addEventListener('error',function(ev){
    var now=Date.now(); if(now-last<4000)return; last=now;
    window.W12TOAST('System',(ev && ev.message)? ('A background task reported: '+ev.message) : 'A background task reported an issue.', '\u26A0\uFE0F');
  });
})();
