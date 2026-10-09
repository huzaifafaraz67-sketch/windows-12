function buildCalendar(body){
  let view=new Date();view.setDate(1);
  function render(){
    const y=view.getFullYear(),m=view.getMonth();
    const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
    const today=new Date();
    const title=view.toLocaleDateString('en-US',{month:'long',year:'numeric'});
    let cells='';for(let i=0;i<first;i++)cells+='<div class="caC empty"></div>';
    for(let d=1;d<=days;d++){const isT=(d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear());cells+=`<div class="caC${isT?' today':''}">${d}</div>`;}
    body.innerHTML='<div class="cal2"><div class="caHead"><button id="caPrev">‹</button><b>'+title+'</b><button id="caNext">›</button></div>'+
      '<div class="caDow"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'+
      '<div class="caGrid">'+cells+'</div></div>';
    body.querySelector('#caPrev').addEventListener('click',()=>{view.setMonth(view.getMonth()-1);render();});
    body.querySelector('#caNext').addEventListener('click',()=>{view.setMonth(view.getMonth()+1);render();});
  }
  render();
}

/* --- Paint (canvas) --- */
