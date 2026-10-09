function buildWeather(body){
  const hourly=WX.hourly.map(([t,tp,ic])=>`<div class="wh"><div class="wht">${t}</div><div class="whi">${ic}</div><div class="whp">${tp}°</div></div>`).join('');
  const daily=WX.daily.map(([d,ic,hi,lo])=>`<div class="wd"><div class="wdd">${d}</div><div class="wdi">${ic}</div><div class="wdb"><span class="lo">${lo}°</span><div class="bar"><div style="left:${(lo-10)*4}%;right:${100-(hi-10)*4}%"></div></div><span class="hi">${hi}°</span></div></div>`).join('');
  body.innerHTML=`<div class="wxapp">
    <div class="wxhero">
      <div class="wxloc">${WX.loc}</div>
      <div class="wxbig"><span class="wxicoBig">${WX.ico}</span><span class="wxtemp">${WX.temp}°</span></div>
      <div class="wxcond">${WX.cond}</div>
      <div class="wxhl">H:${WX.hi}° · L:${WX.lo}° · Feels like ${WX.feels}°</div>
    </div>
    <div class="wxcard"><div class="wxlbl">Hourly forecast</div><div class="wxhours">${hourly}</div></div>
    <div class="wxcard"><div class="wxlbl">7-day forecast</div><div class="wxdays">${daily}</div></div>
    <div class="wxcard"><div class="wxlbl">Conditions</div><div class="wxstats">
      <div class="wxst"><div class="k">Humidity</div><div class="v">${WX.humidity}%</div></div>
      <div class="wxst"><div class="k">Wind</div><div class="v">${WX.wind} km/h</div></div>
      <div class="wxst"><div class="k">UV index</div><div class="v">${WX.uv}</div></div>
      <div class="wxst"><div class="k">Feels like</div><div class="v">${WX.feels}°</div></div>
    </div></div>
  </div>`;
}

/* ================= DESKTOP ICONS (draggable) ================= */
