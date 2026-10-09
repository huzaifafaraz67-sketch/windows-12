function buildUpdate(body){
  body.innerHTML='<div class="pad"><h2 style="display:flex;align-items:center;gap:10px"><img src="icon/update.png" style="width:34px">Windows Update</h2>'+
    '<div class="card" style="margin-top:14px"><div class="row"><div><div class="lb" id="upSt">You\u2019re up to date</div><div class="ds" id="upDs">Last checked: today</div></div>'+
    '<button class="btn pri" id="upChk">Check for updates</button></div></div>'+
    '<div class="card"><div class="lb">Update history</div><div class="ds" style="margin-top:8px;line-height:1.9">'+
    '\u2713 2026-09 Cumulative Update for Windows 12 (KB5031000)<br>\u2713 Security Intelligence Update (KB2267602)<br>\u2713 .NET Update (KB5030211)</div></div>'+
    '<div class="card"><div class="row"><div><div class="lb">Pause updates</div><div class="ds">Pause for 7 days</div></div><div class="toggle"></div></div></div></div>';
  const b=body.querySelector('#upChk'),st=body.querySelector('#upSt'),ds=body.querySelector('#upDs');
  b.addEventListener('click',()=>{b.disabled=true;st.textContent='Checking for updates\u2026';ds.textContent='Please wait';
    setTimeout(()=>{st.textContent='You\u2019re up to date';ds.textContent='Last checked: just now';b.disabled=false;sfx('open');},1600);});
  body.querySelector('.toggle').addEventListener('click',function(){this.classList.toggle('on');});
}
