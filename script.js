/* ============================================================
   SKYCAST v3 — script.js
   Features: animated canvas sky, aurora theming, 3D card tilt,
   ripple effects, SVG arc gauges, animated compass, 5-day
   forecast, animated number counters, spring physics, all bugs fixed
   ============================================================ */

const API_KEY = "f9e2938b9061a8eeffde96229166b5af";

// ── STATE ──────────────────────────────────────────────────────
let rawTempC  = null, rawFeelsC = null, isCelsius = true;
let map = null, precipLayer = null, prevMarker = null;
let skyMode = "clear", animFrame, particles = [];

// ── $ helper ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ── CANVAS SETUP ──────────────────────────────────────────────
const canvas = $("skyCanvas");
const ctx    = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ── PARTICLE FACTORY ──────────────────────────────────────────
function makeParticle() {
  const w = canvas.width, h = canvas.height;
  const mode = skyMode;

  if (mode === "rain" || mode === "drizzle") {
    return { type:"rain", x:Math.random()*w, y:Math.random()*h - h,
      vx:1.8, vy:15+Math.random()*7, len:12+Math.random()*10,
      alpha:0.25+Math.random()*0.4, width:0.8+Math.random()*0.5 };
  }
  if (mode === "thunderstorm") {
    return { type:"rain", x:Math.random()*w, y:Math.random()*h - h,
      vx:3, vy:22+Math.random()*8, len:18, alpha:0.2+Math.random()*0.35, width:1 };
  }
  if (mode === "snow") {
    return { type:"snow", x:Math.random()*w, y:Math.random()*h - h,
      vx:(Math.random()-.5)*0.6, vy:0.6+Math.random()*1.2,
      r:1.5+Math.random()*2.5, alpha:0.5+Math.random()*0.5,
      wobble:Math.random()*Math.PI*2, wobbleSpeed:0.015+Math.random()*0.02 };
  }
  if (["clouds","mist","haze","smoke"].includes(mode)) {
    return { type:"cloud", x:Math.random()*canvas.width*1.5 - canvas.width*0.25,
      y:20+Math.random()*(canvas.height*0.6),
      rx:100+Math.random()*160, ry:55+Math.random()*70,
      vx:0.06+Math.random()*0.1, alpha:0.03+Math.random()*0.055 };
  }
  // Clear — stars with twinkle
  return { type:"star", x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    r:0.4+Math.random()*1.6, alpha:0.1+Math.random()*0.9,
    da:(Math.random()-.5)*0.025, pulse:Math.random()*Math.PI*2 };
}

function initParticles() {
  const count = {
    star:120, rain:90, thunderstorm:110, snow:80, cloud:14,
    clouds:14, mist:10, haze:10, smoke:10
  }[skyMode] || 120;
  particles = Array.from({ length:count }, makeParticle);
}

// ── SKY GRADIENT COLOURS ──────────────────────────────────────
const SKY_COLORS = {
  clear:        ["#050c1e","#0a1840"],
  clouds:       ["#10151e","#1c2437"],
  rain:         ["#070d14","#0d1c2c"],
  drizzle:      ["#070d14","#0d1c2c"],
  thunderstorm: ["#050508","#0c0b18"],
  snow:         ["#0c1320","#172035"],
  mist:         ["#0d1015","#181e2b"],
  haze:         ["#0d1015","#181e2b"],
  smoke:        ["#0d1015","#181e2b"],
};

// ── DRAW LOOP ─────────────────────────────────────────────────
function animateSky() {
  if (!ctx) return;
  const [c1, c2] = SKY_COLORS[skyMode] || SKY_COLORS.clear;
  const w = canvas.width, h = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, w*.35, h);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (p.type === "rain") {
      ctx.save();
      ctx.strokeStyle = `rgba(160,215,255,${p.alpha})`;
      ctx.lineWidth = p.width;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx, p.y + p.len);
      ctx.stroke();
      ctx.restore();
      p.x += p.vx; p.y += p.vy;
      if (p.y > h + 20) { particles[i] = makeParticle(); particles[i].y = -20; }

    } else if (p.type === "snow") {
      p.pulse += p.wobbleSpeed;
      const wx = Math.sin(p.pulse) * 1.2;
      ctx.save();
      ctx.fillStyle = `rgba(220,240,255,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x + wx, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
      p.x += p.vx; p.y += p.vy;
      if (p.y > h) { particles[i] = makeParticle(); particles[i].y = -8; }

    } else if (p.type === "cloud") {
      ctx.save();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.rx);
      g.addColorStop(0, `rgba(210,225,255,${p.alpha})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
      p.x += p.vx;
      if (p.x - p.rx > w) p.x = -p.rx;

    } else { // star
      p.pulse += p.da;
      const a = Math.max(0, Math.min(1, p.alpha + Math.sin(p.pulse)*0.3));
      ctx.save();
      ctx.fillStyle = `rgba(220,235,255,${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Lightning flicker
  if (skyMode === "thunderstorm" && Math.random() < 0.004) {
    ctx.fillStyle = "rgba(210,190,255,0.06)";
    ctx.fillRect(0, 0, w, h);
  }

  animFrame = requestAnimationFrame(animateSky);
}

function setSkyMode(weatherMain) {
  const m = (weatherMain || "clear").toLowerCase();
  if (m === skyMode && particles.length) return; // no flicker on same mode
  skyMode = m;
  cancelAnimationFrame(animFrame);
  initParticles();
  animateSky();

  const all = ["clear","clouds","rain","drizzle","thunderstorm","snow","mist","haze","smoke"];
  document.body.className = `weather-${all.includes(m) ? m : "clear"}`;
}

setSkyMode("clear");

// ── 3D TILT ───────────────────────────────────────────────────
// BUG 2 FIX: use event delegation on document instead of attaching
// per-card listeners (avoids doubling when initTilt is called again)
document.addEventListener("mousemove", e => {
  const card = e.target.closest(".tilt-card");
  if (!card) return;
  // Skip compass card inner needle — tilt would override its rotation
  if (card.id === "compassNeedle") return;
  const rect = card.getBoundingClientRect();
  const dx = (e.clientX - (rect.left + rect.width/2))  / (rect.width/2);
  const dy = (e.clientY - (rect.top  + rect.height/2)) / (rect.height/2);
  const t  = 7;
  card.style.transform = `perspective(900px) rotateY(${dx*t}deg) rotateX(${-dy*t}deg) scale3d(1.015,1.015,1.015)`;
});
document.addEventListener("mouseleave", e => {
  const card = e.target.closest(".tilt-card");
  if (!card || card.id === "compassNeedle") return;
  card.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";
  card.style.transform  = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
  setTimeout(() => { card.style.transition = ""; }, 600);
}, true);
function initTilt() { /* no-op — delegation handles it */ }

// ── RIPPLE EFFECT ─────────────────────────────────────────────
document.addEventListener("click", e => {
  const btn = e.target.closest(".ripple-btn");
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const rip  = document.createElement("span");
  rip.className = "ripple";
  const size = Math.max(rect.width, rect.height);
  rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  btn.appendChild(rip);
  rip.addEventListener("animationend", () => rip.remove());
});

// ── ANIMATED NUMBER COUNTER ────────────────────────────────────
function animateNum(el, target, suffix="", duration=900) {
  if (!el) return;
  const start = performance.now();
  const from  = parseFloat(el.textContent) || 0;
  const to    = parseFloat(target) || 0;
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * ease) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ── SVG GRADIENT DEFS ─────────────────────────────────────────
function injectSVGDefs() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  svg.innerHTML = `
    <defs>
      <linearGradient id="gradBlue" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#60c8ff"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
      <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#6bffb8"/>
        <stop offset="100%" stop-color="#60c8ff"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
}
injectSVGDefs();

// ── ARC GAUGE ─────────────────────────────────────────────────
// Arc length of the semicircle path ≈ 157
const ARC_LEN = 157;
function setGauge(fillId, pct) {
  const el = $(fillId);
  if (!el) return;
  const target = ARC_LEN - (ARC_LEN * Math.min(Math.max(pct,0),1));
  // BUG 4 FIX: double rAF forces a real repaint between reset and target
  // so the CSS transition actually fires every time
  el.style.transition = "none";
  el.style.strokeDashoffset = ARC_LEN;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.2,0.8,0.3,1)";
    el.style.strokeDashoffset = target;
  }));
}

// ── COMPASS ───────────────────────────────────────────────────
function setCompass(deg) {
  const needle = $("compassNeedle");
  if (needle) needle.style.transform = `rotate(${deg}deg)`;
  setText("compassDirText", windDir(deg));
  setText("compassDeg", `${Math.round(deg)}°`);
}

// ── WIND DIRECTION ─────────────────────────────────────────────
function windDir(deg) {
  return ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round(deg/22.5)%16];
}

// ── DEW POINT ─────────────────────────────────────────────────
function dewPt(tc, rh) {
  const a=17.27, b=237.7, g=(a*tc)/(b+tc)+Math.log(rh/100);
  return Math.round(b*g/(a-g));
}

// ── FORMAT TIME ───────────────────────────────────────────────
function pad(n) { return String(n).padStart(2,"0"); }
function fmtUnix(u) {
  const d = new Date(u*1000);
  const h12 = d.getHours()%12||12, ampm = d.getHours()>=12?"PM":"AM";
  return `${pad(h12)}:${pad(d.getMinutes())} ${ampm}`;
}
function fmtHour(dtTxt) {
  const h = parseInt(dtTxt.slice(11,13),10); // FIX: parseInt not string compare
  const h12 = h%12||12;
  return `${h12}${h>=12?"PM":"AM"}`;
}

// ── ICONS ─────────────────────────────────────────────────────
const ICONS = {
  Clouds:'<i class="fa-solid fa-cloud-sun"></i>',
  Drizzle:'<i class="fa-solid fa-cloud-rain"></i>',
  Thunderstorm:'<i class="fa-solid fa-cloud-bolt"></i>',
  Clear:'<i class="fa-solid fa-sun"></i>',
  Mist:'<i class="fa-solid fa-smog"></i>',
  Rain:'<i class="fa-solid fa-cloud-showers-heavy"></i>',
  Haze:'<i class="fa-solid fa-smog"></i>',
  Snow:'<i class="fa-solid fa-snowflake"></i>',
  Smoke:'<i class="fa-solid fa-smog"></i>',
};
const ico = k => ICONS[k] || '<i class="fa-solid fa-cloud"></i>';

// ── CLOCK ─────────────────────────────────────────────────────
function updateClock() {
  const ch=$("ch"),cm=$("cm"),cs=$("cs"),camp=$("camp"),hdate=$("hdate");
  if(!ch)return;
  const now=new Date(), h=now.getHours(), m=now.getMinutes(), s=now.getSeconds();
  const h12=h%12||12, ampm=h>=12?"PM":"AM";
  ch.textContent=pad(h12); cm.textContent=pad(m); cs.textContent=pad(s);
  camp.textContent=ampm;
  if(hdate) hdate.textContent=now.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"});
}

// ── TEMPERATURE ────────────────────────────────────────────────
const toF = c => Math.round(c*9/5+32);
function fmtTemp(c) { return isCelsius ? `${Math.round(c)}°C` : `${toF(c)}°F`; }
function setUnit(c) {
  isCelsius=c;
  $("btnC")&&$("btnC").classList.toggle("active",c);
  $("btnF")&&$("btnF").classList.toggle("active",!c);
  renderTemps();
}
function renderTemps() {
  if(rawTempC===null)return;
  setText("tempDisplay", fmtTemp(rawTempC));
  setText("feelsVal", fmtTemp(rawFeelsC));
}

// ── MAP ────────────────────────────────────────────────────────
function updateMap(lat,lon) {
  if(!map)return;
  map.setView([lat,lon],7);
  if(precipLayer) map.removeLayer(precipLayer);
  precipLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
    {opacity:0.8,attribution:'&copy; OpenWeather'}
  ).addTo(map);
  if(prevMarker) map.removeLayer(prevMarker);
  prevMarker = L.marker([lat,lon]).addTo(map);
}

// ── UI STATE ──────────────────────────────────────────────────
function showLoader()  { show("loaderWrap","flex"); hide("content"); hide("errWrap"); }
// BUG 1 FIX: #content is a block container — must use display:block, not flex
function showContent() { hide("loaderWrap"); show("content","block"); hide("errWrap"); }
function showError(m)  { hide("loaderWrap"); show("errWrap","flex"); setText("errMsg",m||"Something went wrong."); }
function show(id, d="flex") { const e=$(id); if(e) e.style.display=d; }
function hide(id) { const e=$(id); if(e) e.style.display="none"; }
function setText(id,v) { const e=$(id); if(e) e.textContent=v; }
function setHTML(id,v) { const e=$(id); if(e) e.innerHTML=v; }

// ── SEARCH ────────────────────────────────────────────────────
async function handleSearch() {
  const city=(inputbox&&inputbox.value.trim())||"";
  if(!city) return showError("Please enter a city name.");
  showLoader();
  try {
    const r=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`);
    const d=await r.json();
    if(d.cod!==200) throw new Error(d.message||"City not found");
    updateMap(d.coord.lat,d.coord.lon);
    fetchWeather(d.coord.lat,d.coord.lon);
  } catch(e){ showError(e.message); }
}

// ── MAIN FETCH ─────────────────────────────────────────────────
async function fetchWeather(lat,lon) {
  try {
    const r    = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await r.json();
    if(data.cod!=="200") throw new Error(data.message||"Failed to fetch weather.");

    // Find nearest slot
    const now=new Date();
    const nowStr=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:00:00`;
    let idx=data.list.findIndex(i=>i.dt_txt>=nowStr);
    if(idx<0)idx=0;
    const cur=data.list[idx], city=data.city;

    rawTempC  = cur.main.temp-273.15;
    rawFeelsC = cur.main.feels_like-273.15;

    setSkyMode(cur.weather[0].main);

    // Hero card
    setText("cityName", city.name+",");
    setText("countryName", city.country);
    setText("weatherDesc", `${cur.weather[0].description} · ${cur.dt_txt.slice(11,16)}`);
    setText("humVal",  `${cur.main.humidity}%`);
    setText("windVal", `${Math.round(3.6*cur.wind.speed)} kph`);
    setText("visVal",  cur.visibility?`${(cur.visibility/1000).toFixed(1)} km`:"—");
    setText("popVal",  `${Math.round(100*cur.pop)}%`);
    setText("sriseVal",fmtUnix(city.sunrise));
    setText("ssetVal", fmtUnix(city.sunset));
    renderTemps();
    setHTML("bigIcon", ico(cur.weather[0].main));

    // Ticker
    const tick=$("tickerInner");
    if(tick) tick.textContent=
      `${city.name}, ${city.country}  ·  ${cur.weather[0].description}  ·  `+
      `${Math.round(rawTempC)}°C  ·  Humidity: ${cur.main.humidity}%  ·  `+
      `Wind: ${Math.round(3.6*cur.wind.speed)} kph  ·  Rain: ${Math.round(100*cur.pop)}%  ·  `+
      `Pressure: ${cur.main.pressure} hPa  ·  Dew Point: ${dewPt(rawTempC,cur.main.humidity)}°C`;

    // Gauges
    const humPct   = cur.main.humidity/100;
    const presPct  = Math.min(Math.max((cur.main.pressure-950)/100,0),1);
    const cloudPct = cur.clouds.all/100;

    setGauge("humGaugeFill",   humPct);
    setGauge("presGaugeFill",  presPct);
    setGauge("cloudGaugeFill", cloudPct);

    animateNum($("humGaugeVal"),   cur.main.humidity, "");
    animateNum($("presGaugeVal"),  cur.main.pressure, "");
    animateNum($("cloudGaugeVal"), cur.clouds.all,    "");

    // Gauge sub-labels
    setText("humSub",   humLabel(cur.main.humidity));
    setText("presSub",  presLabel(cur.main.pressure));
    setText("cloudSub", cloudLabel(cur.clouds.all));

    // Compass
    if(cur.wind.deg!==undefined) setCompass(cur.wind.deg);

    // Hourly forecast (8 slots, bounds checked)
    const fRow=$("forecastRow");
    if(fRow){
      fRow.innerHTML="";
      const slots=Math.min(8,data.list.length-idx);
      for(let i=0;i<slots;i++){
        const s=data.list[idx+i], tc=s.main.temp-273.15;
        const fc=document.createElement("div");
        fc.className="fc"+(i===0?" fc-now":"");
        fc.style.animationDelay=`${0.04+i*0.04}s`;
        // BUG 6 FIX: fc-now card already has a CSS ::after "NOW" badge — don't
        // also render "Now" as the fc-t text (would double-label the card)
        const timeLabel = i===0 ? "" : fmtHour(s.dt_txt);
        fc.innerHTML=`
          <div class="fc-t">${timeLabel}</div>
          <div class="fc-ico">${ico(s.weather[0].main)}</div>
          <div class="fc-tmp">${Math.round(tc)}°C</div>
          <div class="fc-pop"><i class="fa-solid fa-droplet"></i> ${Math.round(100*s.pop)}%</div>
          <div class="fc-wnd"><i class="fa-solid fa-wind"></i> ${Math.round(3.6*s.wind.speed)} kph</div>
        `;
        fRow.appendChild(fc);
      }
    }

    // 5-day forecast (aggregate by date)
    build5Day(data.list, idx);

    // v4 hook: fire after all data is rendered
    if (typeof window._afterFetch === 'function') {
      window._afterFetch(lat, lon, data, idx);
    }

    showContent();

  } catch(e){ showError(e.message); console.error("Weather error:",e); }
}

// ── 5-DAY BUILDER ─────────────────────────────────────────────
function build5Day(list, startIdx) {
  const grid=$("daysGrid");
  if(!grid)return;
  grid.innerHTML="";

  // Group by calendar date
  const days={};
  list.slice(startIdx).forEach(item=>{
    const d=item.dt_txt.slice(0,10);
    if(!days[d]) days[d]={slots:[]};
    days[d].slots.push(item);
  });

  const keys=Object.keys(days).slice(0,7);

  // BUG 3 FIX: normalize bar width across all 5 days using pop (rain chance)
  // The old code did (hiC-loC)/(hiC-loC)*100 = always 100%. Use pop instead.
  keys.forEach((dateStr, i)=>{
    const slots=days[dateStr].slots;
    const hiC =Math.max(...slots.map(s=>s.main.temp_max-273.15));
    const loC =Math.min(...slots.map(s=>s.main.temp_min-273.15));
    const mid =slots[Math.floor(slots.length/2)];
    const pop =Math.round(100*Math.max(...slots.map(s=>s.pop)));
    const date=new Date(dateStr+"T12:00:00");
    const dayName=i===0?"Today":date.toLocaleDateString(undefined,{weekday:"short"});
    const dateLabel=date.toLocaleDateString(undefined,{month:"short",day:"numeric"});

    const card=document.createElement("div");
    card.className="day-card";
    card.innerHTML=`
      <div class="day-name">${dayName}</div>
      <div class="day-date">${dateLabel}</div>
      <div class="day-ico">${ico(mid.weather[0].main)}</div>
      <div class="day-desc">${mid.weather[0].description}</div>
      <div class="day-temps">
        <span class="day-hi">${Math.round(hiC)}°</span>
        <span class="day-lo">${Math.round(loC)}°</span>
      </div>
      <div class="day-pop"><i class="fa-solid fa-droplet"></i> ${pop}%</div>
      <div class="day-bar"><div class="day-bar-fill" style="width:${pop}%"></div></div>
    `;
    grid.appendChild(card);

    // BUG 7 FIX: trigger entrance via JS timeout so opacity transition doesn't
    // conflict with any CSS animation on the transform property
    setTimeout(() => card.classList.add("day-visible"), 50 + i * 60);
  });
}

// ── GAUGE LABELS ──────────────────────────────────────────────
function humLabel(h)   { return h<30?"Dry":h<60?"Comfortable":h<80?"Humid":"Very Humid"; }
function presLabel(p)  { return p<1000?"Low Pressure":p<1015?"Normal":p<1025?"High":"Very High"; }
function cloudLabel(c) { return c<10?"Clear Sky":c<40?"Mostly Clear":c<75?"Partly Cloudy":"Overcast"; }

// ── INIT IF HOME PAGE ─────────────────────────────────────────
const inputbox  = $("inputbox");
const searchBtn = $("searchBtn");
const locateBtn = $("locateBtn");

if(inputbox){
  // Clock
  updateClock();
  setInterval(updateClock,1000);

  // Map
  map = L.map("map").setView([28.6,77.2],5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Auto-locate
  showLoader();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      p=>{ fetchWeather(p.coords.latitude,p.coords.longitude); updateMap(p.coords.latitude,p.coords.longitude); },
      ()=>{ fetchWeather(28.6139,77.2090); updateMap(28.6139,77.2090); }
    );
  } else {
    fetchWeather(28.6139,77.2090); updateMap(28.6139,77.2090);
  }

  searchBtn.addEventListener("click", handleSearch);
  inputbox.addEventListener("keydown", e=>{ if(e.key==="Enter") handleSearch(); });
  locateBtn.addEventListener("click", ()=>{
    if(!navigator.geolocation) return showError("Geolocation not supported.");
    showLoader();
    navigator.geolocation.getCurrentPosition(
      p=>{ fetchWeather(p.coords.latitude,p.coords.longitude); updateMap(p.coords.latitude,p.coords.longitude); },
      ()=>showError("Location permission denied.")
    );
  });

  $("btnC")&&$("btnC").addEventListener("click",()=>setUnit(true));
  $("btnF")&&$("btnF").addEventListener("click",()=>setUnit(false));
}

/* ============================================================
   SKYCAST v4 ADDITIONS
   ============================================================ */

// ── TOAST SYSTEM ──────────────────────────────────────────────
const toastContainer = document.getElementById("toastContainer");

function showToast(msg, type="info", duration=3200) {
  if (!toastContainer) return;
  const iconMap = { success:"fa-circle-check", error:"fa-circle-xmark", info:"fa-circle-info" };
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid ${iconMap[type]||iconMap.info}"></i> ${msg}`;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.classList.add("toast-out");
    t.addEventListener("animationend", () => t.remove(), { once:true });
  }, duration);
}

// ── SCROLL REVEAL (IntersectionObserver) ──────────────────────
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards in a gauge row or days grid
        const siblings = entry.target.parentElement.querySelectorAll(".reveal");
        let idx = [...siblings].indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("revealed"), idx * 55);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

// ── SCROLL TO TOP ─────────────────────────────────────────────
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 320);
  }, { passive:true });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
}

// ── STICKY NAV ON SCROLL ──────────────────────────────────────
const navEl = document.querySelector(".nav");
if (navEl) {
  window.addEventListener("scroll", () => {
    navEl.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive:true });
}

// ── KEYBOARD SHORTCUT: "/" focuses search ─────────────────────
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== inputbox && inputbox) {
    e.preventDefault();
    inputbox.focus();
    inputbox.select();
  }
  if (e.key === "Escape" && inputbox) inputbox.blur();
});

// ── UV INDEX FETCH & GAUGE ────────────────────────────────────
async function fetchUV(lat, lon) {
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const d = await r.json();
    const uv = Math.round(d.value || 0);
    renderUV(uv);
  } catch {
    setText("uvGaugeVal", "—");
    setText("uvSub", "Unavailable");
  }
}

function renderUV(uv) {
  const fill = $("uvGaugeFill");
  if (fill) {
    fill.className = "gauge-fill " + uvClass(uv);
    setGauge("uvGaugeFill", uv / 11);
  }
  animateNum($("uvGaugeVal"), uv, "");
  setText("uvSub", uvLabel(uv));
}

function uvClass(uv) {
  if (uv <= 2)  return "uv-low";
  if (uv <= 5)  return "uv-moderate";
  if (uv <= 7)  return "uv-high";
  if (uv <= 10) return "uv-vhigh";
  return "uv-extreme";
}
function uvLabel(uv) {
  if (uv <= 2)  return "Low — no protection needed";
  if (uv <= 5)  return "Moderate — wear sunscreen";
  if (uv <= 7)  return "High — protect yourself";
  if (uv <= 10) return "Very High — extra protection";
  return "Extreme — avoid sun exposure";
}

// ── 24H SPARKLINE ─────────────────────────────────────────────
function drawSparkline(slots) {
  const canvas = document.getElementById("sparklineCanvas");
  if (!canvas) return;

  // Size canvas to its CSS render size
  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.offsetWidth;
  const H   = canvas.offsetHeight || 120;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const temps  = slots.map(s => s.main.temp - 273.15);
  const minT   = Math.min(...temps) - 2;
  const maxT   = Math.max(...temps) + 2;
  const range  = maxT - minT || 1;
  const pad    = { l:10, r:10, t:18, b:10 };
  const w      = W - pad.l - pad.r;
  const h      = H - pad.t - pad.b;

  const xOf = i  => pad.l + (i / (slots.length - 1)) * w;
  const yOf = tc => pad.t + (1 - (tc - minT) / range) * h;

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.t, 0, H);
  const [ar] = [window.getComputedStyle(document.body).getPropertyValue("--a-r").trim() || "96,200,255"];
  grad.addColorStop(0,   `rgba(${ar},0.35)`);
  grad.addColorStop(1,   `rgba(${ar},0.0)`);

  // Draw filled area
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(temps[0]));
  for (let i = 1; i < temps.length; i++) {
    const xc = (xOf(i-1) + xOf(i)) / 2;
    ctx.bezierCurveTo(xc, yOf(temps[i-1]), xc, yOf(temps[i]), xOf(i), yOf(temps[i]));
  }
  ctx.lineTo(xOf(temps.length-1), H);
  ctx.lineTo(xOf(0), H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(temps[0]));
  for (let i = 1; i < temps.length; i++) {
    const xc = (xOf(i-1) + xOf(i)) / 2;
    ctx.bezierCurveTo(xc, yOf(temps[i-1]), xc, yOf(temps[i]), xOf(i), yOf(temps[i]));
  }
  ctx.strokeStyle = `rgba(${ar},0.9)`;
  ctx.lineWidth   = 2;
  ctx.lineJoin    = "round";
  ctx.stroke();

  // Dots + labels at every 2nd point
  for (let i = 0; i < temps.length; i++) {
    const x = xOf(i), y = yOf(temps[i]);
    // Dot
    ctx.beginPath();
    ctx.arc(x, y, i % 2 === 0 ? 3.5 : 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ar},${i % 2 === 0 ? 1 : 0.5})`;
    ctx.fill();
    // Temp label above every other dot
    if (i % 2 === 0) {
      ctx.fillStyle = `rgba(238,242,255,0.8)`;
      ctx.font      = `bold ${9 * dpr / dpr}px IBM Plex Mono, monospace`;
      ctx.textAlign = "center";
      ctx.fillText(`${Math.round(temps[i])}°`, x, y - 7);
    }
  }

  // Build hour labels below canvas
  const labelsEl = document.getElementById("sparklineLabels");
  if (labelsEl) {
    labelsEl.innerHTML = "";
    slots.forEach((s, i) => {
      if (i % 2 !== 0) return;
      const span = document.createElement("span");
      span.textContent = fmtHour(s.dt_txt);
      labelsEl.appendChild(span);
    });
  }
}

// ── NORMALIZED 5-DAY BAR ─────────────────────────────────────
// Overrides build5Day's bar width with cross-week normalization
function normalizeDayBars(allHiC, allLoC) {
  const absMax = Math.max(...allHiC);
  const absMin = Math.min(...allLoC);
  const absRange = absMax - absMin || 1;

  document.querySelectorAll(".day-card").forEach((card, i) => {
    const fill = card.querySelector(".day-bar-fill");
    if (!fill) return;
    const lo = allLoC[i], hi = allHiC[i];
    const left  = Math.round(((lo - absMin) / absRange) * 100);
    const width = Math.round(((hi - lo)    / absRange) * 100);
    fill.style.marginLeft = left + "%";
    fill.style.width      = Math.max(width, 4) + "%";
  });
}


// ── INTEGRATION: wire v4 features into the data flow ─────────
// Called by fetchWeather (original) at the end of a successful fetch
// via the _afterFetch hook set on the window object
window._afterFetch = async function(lat, lon, data, idx) {
  // UV Index
  fetchUV(lat, lon);

  // Sparkline: next 12 forecast slots (~36h)
  const sparkSlots = data.list.slice(idx, idx + 12);
  setTimeout(() => drawSparkline(sparkSlots), 180);

  // Normalize 5-day bars
  const days = {};
  data.list.slice(idx).forEach(item => {
    const d = item.dt_txt.slice(0,10);
    if (!days[d]) days[d] = [];
    days[d].push(item);
  });
  const keys   = Object.keys(days).slice(0,7);
  const allHiC = keys.map(k => Math.max(...days[k].map(s => s.main.temp_max - 273.15)));
  const allLoC = keys.map(k => Math.min(...days[k].map(s => s.main.temp_min - 273.15)));
  setTimeout(() => normalizeDayBars(allHiC, allLoC), 280);

  // Kick off scroll-reveal after content is visible
  setTimeout(initScrollReveal, 60);
};

// ── TOAST WIRING (safe — runs after all function declarations) ──
// We use a MutationObserver trick: once #content becomes visible, show success toast
const _contentEl = document.getElementById("content");
if (_contentEl) {
  const mo = new MutationObserver(() => {
    if (_contentEl.style.display !== "none" && _contentEl.style.display !== "") {
      const city = document.getElementById("cityName");
      if (city && city.textContent && city.textContent !== "—") {
        showToast(`Loaded: ${city.textContent.replace(",","")}`, "success", 2800);
      }
    }
  });
  mo.observe(_contentEl, { attributes:true, attributeFilter:["style"] });
}

// "/" key focuses search (safe to re-declare — this is just adding listener)
// Already handled above via keydown listener in ADDITIONS block