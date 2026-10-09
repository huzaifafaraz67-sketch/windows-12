function toggleMax(w){
  if(w.classList.contains('max')){w.classList.remove('max');
    w.style.left=w._px||'80px';w.style.top=w._py||'50px';w.style.width=w._pw||'840px';w.style.height=w._ph||'540px';
  }else{w._px=w.style.left;w._py=w.style.top;w._pw=w.style.width;w._ph=w.style.height;
    w.classList.add('max');w.style.left='0';w.style.top='0';w.style.width='100%';w.style.height='calc(100% - 4px)';}
}
