# 🌤️ SkyCast — Live Weather App

A cinematic, real-time weather dashboard built with vanilla HTML, CSS and JavaScript.

![SkyCast Banner](https://img.shields.io/badge/SkyCast-Live%20Weather-60c8ff?style=for-the-badge&logo=cloudflare&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge)

---

## ✨ Features

### 🎨 Visual and UI

- Animated sky canvas — live particles per weather (rain, snow, stars, clouds, lightning)
- Aurora blobs — drifting radial gradients that shift color with the weather theme
- Dynamic color theming — palette changes per condition (gold for Clear, purple for Thunderstorm, cyan for Rain)
- Glassmorphism cards — `backdrop-filter` blur with layered shadows
- 3D card tilt — mouse-tracked `perspective` + `rotateX/Y` on every card
- Shimmer sweep — animated light gleam across each glass card
- Ripple effects — ink ripple from exact click position on all buttons
- Scroll reveal — `IntersectionObserver`-driven staggered entrance animations

### 🌡️ Weather Data

- Current conditions — temperature, feels like, humidity, wind speed, visibility, description
- Celsius / Fahrenheit toggle — unit switch without re-fetching
- Sunrise and Sunset — local formatted times
- Rain probability — current percentage chance of precipitation
- 7-Day Outlook — daily high/low, icon, description, rain chance, normalized temperature bar
- 8-slot Hourly Forecast — scrollable strip with icon, temp, rain %, wind speed
- 24h Temperature Sparkline — bezier canvas curve with gradient fill and dot labels
- UV Index — color-coded arc gauge (Low to Extreme) with health recommendation

### 📊 Atmosphere Panel

Four SVG arc gauges:

| Gauge | Data | Color |
| ----- | ---- | ----- |
| Humidity | % | Blue to Indigo |
| Wind Direction | Animated compass needle + degrees | Red/Blue needle |
| Pressure | hPa | Green to Cyan |
| Cloud Cover | % | Steel muted |

### 🗺️ Map

- Leaflet.js interactive map with OpenStreetMap tiles
- Live precipitation overlay from OpenWeatherMap tile API
- Auto-marker on searched or detected location

### ⚡ UX

- Auto-geolocation on load — falls back to Delhi if denied
- City search by name with Enter key support
- Use My Location button — re-triggers geolocation any time
- `/` keyboard shortcut — focuses search from anywhere on the page
- Toast notifications — success/error/info non-blocking pill toasts
- Sticky frosted navbar — appears on scroll
- Scroll-to-top button — appears after 320px of scroll
- Live clock — blinking colons, correct 12h AM/PM
- Scrolling ticker — all weather stats in a CSS-animated strip

---

## 📁 Project Structure

```text
skycast/
├── home.html        # Main weather dashboard
├── contact.html     # Contact / developer info page
├── style.css        # All styles (glassmorphism, animations, themes, responsive)
└── script.js        # All logic (API, canvas, gauges, compass, sparkline, etc.)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/skycast.git
cd skycast
```

### 2. Get a free API key

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to **API Keys** in your account dashboard
3. Copy your key

### 3. Add your API key

Open `script.js` and replace the value on line 8:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

### 4. Add your images

Place weather images in an `images/` folder (see structure above). Free images are available at [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com).

### 5. Open in browser

```bash
open home.html
```

Or use the **Live Server** extension in VS Code for auto-reload.

---

## 🔌 APIs Used

| Service | Purpose | Free Tier |
| ------- | ------- | --------- |
| [OpenWeatherMap Forecast](https://openweathermap.org/api/hourly-forecast) | 5-day / 3h forecast | 1,000 calls/day |
| [OpenWeatherMap Current](https://openweathermap.org/current) | City search by name | 1,000 calls/day |
| [OpenWeatherMap UV](https://openweathermap.org/api/uvi) | UV Index | 1,000 calls/day |
| [OpenWeatherMap Map Tiles](https://openweathermap.org/api/weathermaps) | Precipitation overlay | Free |
| [OpenStreetMap](https://www.openstreetmap.org) | Base map tiles | Free |
| [Leaflet.js](https://leafletjs.com) | Interactive map | Free / Open Source |

> **Note:** The free OpenWeatherMap plan returns up to 5 days of 3h forecast slots. The 7-day grid displays however many unique calendar dates are available — typically 5 to 6. For a true 7-day daily forecast, upgrade to the One Call API 3.0 plan.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
| ---------- | ------ |
| > 1200px | Full layout, 7-col day grid |
| ≤ 1200px | 4-col day grid |
| ≤ 1100px | 3-col gauges, 3-col day grid |
| ≤ 1000px | 2-col gauges |
| ≤ 760px | Single-column hero card, 2-col day grid |
| ≤ 680px | Mobile nav drawer |
| ≤ 480px | 2-col day grid, compact stats |

---

## 🐛 Bugs Fixed

- Duplicate search event listener removed
- Broken API key (33-char typo) consolidated to one correct key
- `cod !== "200"` — correct string check for forecast endpoint
- `parseInt()` for hour comparison — no more string vs number bugs
- Clock 12 PM/AM bug — `h % 12 || 12` handles midnight and noon correctly
- `sunrise` and `sunset` comma-operator bug fixed
- Forecast index out-of-bounds — bounds-checked with `Math.min()`
- `script.js` null-guarded — no console errors on contact page
- `display:flex` on `#content` replaced with `display:block`
- Double `initTilt()` listeners fixed via event delegation
- 5-day bar width always 100% bug fixed
- SVG gauge transition uses double-rAF for reliable animation
- Compass needle no longer overridden by tilt handler
- Duplicate `font-size` in `.hc-desc` removed
- `--a-r` CSS variable defined in `:root` fallback

---

## 🛠️ Tech Stack

- **Vanilla HTML5, CSS3, JavaScript ES2020+** — zero frameworks, zero build tools
- **Canvas API** — animated sky particles and sparkline chart
- **CSS Custom Properties** — dynamic weather theming
- **IntersectionObserver API** — scroll-driven reveal animations
- **Geolocation API** — browser location detection
- **Fetch API** — async weather data with proper error handling
- **Leaflet.js** — interactive map
- **Font Awesome 6** — weather icons
- **Google Fonts** — DM Serif Display, IBM Plex Mono, Outfit

---

## 📸 Screenshots

Add your screenshots here after deployment.

---

## 🌐 Live Demo

[Live Demo](https://yashvardhansingh-x5x.github.io/Live_Weather_Forecast/)

### Deploy to GitHub Pages in 30 seconds

1. Push your code to a GitHub repo
2. Go to **Settings → Pages**
3. Set Source to `main` branch and `/ (root)` folder
4. Click **Save** — your site is live at `https://yashvardhansingh-x5x.github.io/Live_Weather_Forecast/`

---

## 👨‍💻 Developer

### Yashvardhan Singh

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yashvardhan-singh-data/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:singhyashvardhan582@gmail.com)

📍 Delhi, India — 📞 +91 9315976969

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

Built with ☁️ and JavaScript — Data provided by OpenWeatherMap
[empty line here]
