
/* ================= BATCH 6: upgraded File Explorer ================= */
/* mutable working filesystem (persisted) */
let FSW;
try{FSW=JSON.parse(localStorage.getItem('w12fs'));}catch(e){}
if(!FSW||typeof FSW!=='object')FSW=JSON.parse(JSON.stringify(FS));
function saveFS(){try{localStorage.setItem('w12fs',JSON.stringify(FSW));}catch(e){}}
let fsClip=null; // {mode:'copy'|'cut', from, item}

/* redefine File Explorer with search, breadcrumbs, view toggle, file ops */
