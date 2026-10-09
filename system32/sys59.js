
/* ---- Start menu search: include all apps + settings pages ---- */
const SETTINGS_PAGES=[['Personalization','per'],['Sound','snd'],['Accessibility','acc'],['System','sys'],['Bluetooth & devices','blu'],['Network','net'],['Windows Update','upd'],['About','abt'],['Accounts','acct'],['Time & language','time']];
function openSettingsPage(p){openApp('settings');setTimeout(()=>{const w=openWins['settings'];if(!w)return;const it=w.querySelector('.nav .it[data-p="'+p+'"]');if(it)it.click();},80);}
function startSearch(q){
  const g=$('#pinGrid');if(!g)return;
  if(!q){renderPinned();return;}
  g.innerHTML='';
  const appHits=Object.keys(APPS).filter(id=>id!=='taskmgr'&&!(APPS[id]&&APPS[id]._folder)&&APPS[id].name.toLowerCase().includes(q));
  const setHits=SETTINGS_PAGES.filter(s=>s[0].toLowerCase().includes(q));
  appHits.forEach((id,i)=>{const a=APPS[id];const el=document.createElement('div');el.className='pinItem slidein';el.style.animationDelay=(i*0.03)+'s';
    el.innerHTML='<img src="'+a.icon+'"><span>'+a.name+'</span>';
    el.addEventListener('click',()=>{openApp(id);toggleStart(false);});g.appendChild(el);});
  setHits.forEach((s,i)=>{const el=document.createElement('div');el.className='pinItem slidein';el.style.animationDelay=((appHits.length+i)*0.03)+'s';
    el.innerHTML='<img src="icon/system.png"><span>'+s[0]+'</span>';
    el.addEventListener('click',()=>{openSettingsPage(s[1]);toggleStart(false);});g.appendChild(el);});
  if(!appHits.length&&!setHits.length){const em=document.createElement('div');em.style.cssText='grid-column:1/-1;color:var(--txt2);padding:16px;text-align:center';em.textContent='No results for “'+q+'”';g.appendChild(em);}
}
if($('#smSearch')){$('#smSearch').addEventListener('input',e=>startSearch(e.target.value.toLowerCase().trim()));}

/* ================= BATCH 5 FEATURES: playable Game Center ================= */
/* override the Games app with a launcher + real mini-games */
const _bp5=buildApp;
