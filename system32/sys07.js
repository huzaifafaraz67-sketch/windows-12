$('#pinGo').addEventListener('click',signIn);
$('#pinInput').addEventListener('keydown',e=>{if(e.key==='Enter')signIn();});

/* ================= APP REGISTRY ================= */
/* ---- weather (mock data, emoji icon, no missing assets) ---- */
const WX_ICON='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd34e"/><stop offset="1" stop-color="#ff9d2e"/></linearGradient></defs><circle cx="18" cy="18" r="9" fill="url(#s)"/><g stroke="#ffcf4a" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="2" x2="18" y2="6"/><line x1="18" y1="30" x2="18" y2="34"/><line x1="2" y1="18" x2="6" y2="18"/><line x1="30" y1="18" x2="34" y2="18"/><line x1="6.5" y1="6.5" x2="9" y2="9"/><line x1="27" y1="27" x2="29.5" y2="29.5"/><line x1="29.5" y1="6.5" x2="27" y2="9"/><line x1="9" y1="27" x2="6.5" y2="29.5"/></g><path d="M24 38c-5 0-9-1.6-9-6 0-3.7 3-6 6.4-6 1-3 3.8-5 7-5 4.2 0 7.6 3.3 7.6 7.4 0 .3 0 .6-.1.9 2.4.4 4.1 2.3 4.1 4.8 0 2.9-2.4 4.9-5.5 4.9H24z" fill="#eaf2fb"/></svg>');
const WX={
  loc:'San Francisco',
  temp:24,cond:'Sunny',ico:'☀️',hi:26,lo:16,feels:25,
  humidity:48,wind:12,uv:6,
  hourly:[['Now',24,'☀️'],['3PM',25,'☀️'],['4PM',25,'⛅'],['5PM',23,'⛅'],['6PM',21,'☁️'],['7PM',19,'☁️'],['8PM',18,'🌙'],['9PM',17,'🌙']],
  daily:[['Today','☀️',26,16],['Mon','⛅',25,15],['Tue','🌦️',22,14],['Wed','🌧️',19,13],['Thu','☁️',20,13],['Fri','☀️',24,15],['Sat','☀️',27,17]]
};
