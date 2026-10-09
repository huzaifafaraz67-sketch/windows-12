
/* ================= BATCH 7: CONTROL PANEL ================= */
APPS.control={name:'Control Panel',icon:'icon/system.png'};
if(typeof DESKTOP_ICONS!=='undefined'&&!DESKTOP_ICONS.includes('control'))DESKTOP_ICONS.push('control');
if(typeof PINNED!=='undefined'&&!PINNED.includes('control'))PINNED.splice(2,0,'control');

const _bp7=buildApp;
buildApp=function(id,body){
  if(id==='control'){buildControl(body);return;}
  return _bp7(id,body);
};

/* open Settings on a specific page (p = nav data-p) */
function openSettingsPage(p){
  openApp('settings');
  setTimeout(()=>{const w=openWins['settings'];if(!w)return;const it=w.querySelector('.nav .it[data-p="'+p+'"]');if(it)it.click();},90);
}

const CPL_CATS=[
  ['sys','System and Security','\uD83D\uDEE1\uFE0F','Review your computer status, update, and back up','sys'],
  ['net','Network and Internet','\uD83C\uDF10','Connect, view status, Wi-Fi and sharing','net'],
  ['hw','Hardware and Sound','\uD83D\uDD0A','Devices, printers, display and audio','blu'],
  ['prog','Programs','\uD83D\uDCE6','Uninstall apps, default programs, Store','prog'],
  ['user','User Accounts','\uD83D\uDC64','Change account type, PIN and sign-in','acct'],
  ['appr','Appearance and Personalization','\uD83C\uDFA8','Theme, accent, wallpaper and taskbar','per'],
  ['clk','Clock and Region','\uD83D\uDD52','Date, time, language and formats','time'],
  ['ease','Ease of Access','\u267F','Accessibility, big cursor and scaling','acc']
];
