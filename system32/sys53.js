
renderIcons();

/* ================= BATCH 4B FEATURES ================= */

/* ---- login-screen Easter egg: type "win" on the lock/login screen ---- */
(function(){
  let buf='';
  document.addEventListener('keydown',e=>{
    const lockOpen=$('#lock')&&$('#lock').style.display!=='none';
    if(!lockOpen)return;
    const k=(e.key||'').toLowerCase();
    if(k.length===1&&k>='a'&&k<='z'){buf=(buf+k).slice(-6);
      if(buf.endsWith('win')){buf='';launchEgg();}
    }
  },true);
})();
