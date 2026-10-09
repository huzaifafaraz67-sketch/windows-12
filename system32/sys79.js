
const CPL_TASKS={
  sys:[
    ['Security and Maintenance','\uD83D\uDEE1\uFE0F','Review recent messages and resolve problems',()=>openSettingsPage('upd')],
    ['Windows Update','\u2B07\uFE0F','Check for updates',()=>openApp('update')],
    ['Backup and Restore','\uD83D\uDCBE','Back up your files to OneDrive',()=>openApp('onedrive')],
    ['System','\uD83D\uDDA5\uFE0F','View device name, processor and RAM',()=>openSettingsPage('abt')],
    ['Power Options','\uD83D\uDD0B','Change what the power buttons do',()=>openSettingsPage('sys')]
  ],
  net:[
    ['Network and Sharing Center','\uD83C\uDF10','View network status and tasks',()=>openSettingsPage('net')],
    ['Internet Options','\uD83E\uDDED','Open the Web browser',()=>openApp('edge')],
    ['Wi-Fi','\uD83D\uDCF6','View available networks',()=>openSettingsPage('net')]
  ],
  hw:[
    ['Devices and Printers','\uD83D\uDDA8\uFE0F','Add a device or printer',()=>openSettingsPage('blu')],
    ['Display','\uD83D\uDDA5\uFE0F','Resolution, scale and night light',()=>openSettingsPage('sys')],
    ['Sound','\uD83D\uDD0A','Volume and playback devices',()=>openSettingsPage('snd')],
    ['Night light','\uD83C\uDF19','Toggle warm colors',()=>{SET.night=!SET.night;saveSet();if(typeof applyNightLight==='function')applyNightLight();}]
  ],
  prog:[
    ['Programs and Features','\uD83D\uDCE6','Uninstall or change a program',()=>openApp('store')],
    ['Default Programs','\u2B50','Choose default apps',()=>openSettingsPage('sys')],
    ['Microsoft Store','\uD83D\uDED8','Get apps and games',()=>openApp('store')],
    ['Task Manager','\uD83D\uDCCA','See running apps',()=>openApp('taskmgr')]
  ],
  user:[
    ['User Accounts','\uD83D\uDC64','Change your account type',()=>openSettingsPage('acct')],
    ['Sign-in options','\uD83D\uDD11','Change your PIN',()=>openSettingsPage('acct')],
    ['Credential Manager','\uD83D\uDDDD\uFE0F','Manage saved sign-ins',()=>openSettingsPage('acct')]
  ],
  appr:[
    ['Personalization','\uD83C\uDFA8','Theme, accent and background',()=>openSettingsPage('per')],
    ['Taskbar','\uD83D\uDCCB','Alignment and auto-hide',()=>openApp('hpes')],
    ['HPES NO','\u2699\uFE0F','Open the quick control hub',()=>openApp('hpes')],
    ['Dark / Light mode','\uD83C\uDF13','Switch appearance',()=>{SET.theme=SET.theme==='light'?'dark':'light';saveSet();applyTheme();}]
  ],
  clk:[
    ['Date and Time','\uD83D\uDD52','Set the clock',()=>openSettingsPage('time')],
    ['Region','\uD83C\uDF0D','Formats and locale',()=>openSettingsPage('time')],
    ['Language','\uD83D\uDD24','Add a display language',()=>openSettingsPage('time')]
  ],
  ease:[
    ['Ease of Access Center','\u267F','Accessibility settings',()=>openSettingsPage('acc')],
    ['Large cursor','\uD83D\uDDB1\uFE0F','Make the pointer bigger',()=>{SET.bigCursor=!SET.bigCursor;saveSet();if(typeof applyScale==='function')applyScale();document.body.classList.toggle('bigcur',!!SET.bigCursor);}],
    ['Display scale','\uD83D\uDD0D','Make text larger',()=>openSettingsPage('sys')]
  ]
};
