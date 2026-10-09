function buildTerminal(body){
  body.innerHTML='<div class="term" id="tOut"></div>';
  const out=body.querySelector('#tOut');
  const banner='Windows 12 [Version 12.0.1000.1]\n(c) Microsoft Corporation. All rights reserved.\n\n';
  function line(t){const d=document.createElement('div');d.textContent=t;out.appendChild(d);}
  function prompt(){
    const w=document.createElement('div');w.className='in';
    w.innerHTML='<span>C:\\Users\\Huzaifa></span>';
    const inp=document.createElement('input');inp.autofocus=true;w.appendChild(inp);out.appendChild(w);inp.focus();
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const c=inp.value.trim();inp.disabled=true;run(c);prompt();out.scrollTop=out.scrollHeight;}});
  }
  function run(c){
    const lc=c.toLowerCase();
    if(!c)return;
    if(lc==='help')line('Commands: help, ver, dir, echo, date, time, whoami, cls, systeminfo');
    else if(lc==='ver')line('Windows 12 [Version 12.0.1000.1]');
    else if(lc==='whoami')line('penguin\\huzaifa');
    else if(lc==='dir')line(' Documents  Downloads  Pictures  Music  Projects');
    else if(lc==='date')line(new Date().toDateString());
    else if(lc==='time')line(new Date().toLocaleTimeString());
    else if(lc.startsWith('echo '))line(c.slice(5));
    else if(lc==='cls'){out.innerHTML='';line(banner.trim());}
    else if(lc==='systeminfo')line('OS Name: Windows 12 Pro\nSystem Type: x64\nProcessor: Virtual CPU\nMemory: 16 GB');
    else line("'"+c+"' is not recognized as a command. Type 'help'.");
  }
  line(banner.trim());prompt();
  body.addEventListener('click',()=>{const ins=out.querySelectorAll('input:not([disabled])');if(ins.length)ins[ins.length-1].focus();});
}
