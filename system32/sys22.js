function buildPersonal(body){
  body.innerHTML='<div class="pad"><div style="display:flex;align-items:center;gap:18px;margin-bottom:8px">'+
    '<div style="width:84px;height:84px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#3aa0ff,#0a5fd0);flex-shrink:0"><img src="icon/personal.png" style="width:100%;height:100%;object-fit:cover"></div>'+
    '<div><h2>Huzaifa</h2><div class="ds">penguin\\huzaifa \u00b7 Local account</div></div></div>'+
    '<div class="card"><div class="row"><div class="lb">Account type</div><div class="ds">Administrator</div></div></div>'+
    '<div class="card"><div class="lb" style="margin-bottom:8px">Your info</div><div class="ds" style="line-height:1.9">Device: PENGUIN<br>Edition: Windows 12 Pro<br>Signed in with PIN</div></div>'+
    '<div class="card"><div class="row"><div><div class="lb">Sign out</div><div class="ds">Lock the device and return to sign-in</div></div><button class="btn pri" id="pSignout">Sign out</button></div></div></div>';
  body.querySelector('#pSignout').addEventListener('click',()=>{if(confirm('Sign out and lock?'))location.reload();});
}
