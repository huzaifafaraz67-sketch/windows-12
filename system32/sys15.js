function buildCalc(body){
  body.innerHTML='<div class="calc"><div class="scr" id="cScr">0</div><div class="kp" id="cKp"></div></div>';
  const scr=body.querySelector('#cScr'),kp=body.querySelector('#cKp');
  const keys=['C','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','=' ];
  let expr='';
  const map={'÷':'/','×':'*','−':'-'};
  keys.forEach(k=>{const b=document.createElement('button');b.textContent=k;
    if('÷×−+='.includes(k))b.className=k==='='?'eq':'op';
    if(k==='0')b.style.gridColumn='span 2';
    b.addEventListener('click',()=>{
      if(k==='C'){expr='';scr.textContent='0';return;}
      if(k==='='){try{let r=Function('return '+expr.replace(/[^-()\d/*+.]/g,''))();expr=String(r);scr.textContent=r;}catch(e){scr.textContent='Error';expr='';}return;}
      if(k==='±'){if(expr){expr='-('+expr+')';scr.textContent=expr;}return;}
      if(k==='%'){try{expr=String(Function('return '+expr)()/100);scr.textContent=expr;}catch(e){}return;}
      expr+=(map[k]||k);scr.textContent=expr;
    });kp.appendChild(b);});
}
