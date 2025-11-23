# Ryu Weather — Weather App (React + Vite)

A fast, user-friendly weather app to view current conditions and forecast by city or your current location. Includes search suggestions, unit switching, loading/error states, and ready i18n.

**Key Features**
- Current weather by city name.
- 3-hour forecast from OpenWeatherMap.
- City search with suggestions (Geocoding API).
- Use current location via Geolocation API.
- Toggle temperature units between `°C` and `°F`.
- Loading overlay and friendly error handling.
- i18n support (English/Vietnamese) — preconfigured.
- Tailwind CSS configured and can be used alongside existing CSS.

**Tech Stack**
- `React`, `Vite`.
- `Tailwind CSS`, `PostCSS`, `Autoprefixer`.
- `i18next`, `react-i18next` (`src/i18n`).
- OpenWeatherMap APIs (`weather`, `forecast`, `geocoding`).
- `lucide-react` for icons.

---

## Getting Started

Requirements:
- Node.js 18+.
- Internet connection for OpenWeatherMap API calls.

Install dependencies:
- Run: `npm install`

Development server:
- `npm run dev`

Production build:
- `npm run build`

Preview build:
- `npm run preview`

---

## API Key Configuration

The app uses OpenWeatherMap. Currently, the API key is hardcoded here:
- `src/services/weatherApi.js` → constant `API_KEY`.

Replace it with your own key (free signup at https://openweathermap.org/api).

Security best practice: move the API key to a Vite environment variable (`.env`) and read it via `import.meta.env.VITE_OPENWEATHER_API_KEY`. Example:

1) Create `.env`:
```
VITE_OPENWEATHER_API_KEY=your_key_here
```
2) In `weatherApi.js`, read from `import.meta.env.VITE_OPENWEATHER_API_KEY` instead of a hardcoded constant.

---

## Tailwind CSS Integration

Tailwind is already set up:
- `tailwind.config.js` (content: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`).
- `postcss.config.js`.
- Directives in `src/index.css`: `@tailwind base; @tailwind components; @tailwind utilities;`.

Quick usage:
- Add utility classes directly in JSX, e.g. `<div className="p-4 bg-slate-100">...</div>`.
- Use alongside existing CSS files like `Weather.css`, `WeatherCard.css`, etc.

---

## Project Structure

```
src/
  assets/            # Images/icons
  components/        # LoadingSpinner, SettingDialog, WeatherCard, WeatherForecast
  hooks/             # useWeather (data fetching logic)
  i18n/              # en.json, vi.json, i18n.js
  layouts/           # WeatherHeader (search, suggestions, location)
  pages/             # Weather.jsx + Weather.css
  services/          # weatherApi.js (OpenWeatherMap API calls)
  utils/             # weatherUtil.js (utility functions if any)
  index.css          # Global CSS + Tailwind directives
  main.jsx           # React entry + StrictMode
```

---

## Using the App

- Search by city: type a city name; suggestions appear after a few characters.
- Use current location: click the location button; the browser will request permission.
- Change temperature unit: open the settings menu (SettingDialog) and choose `°C` or `°F`.
- Language: read from `localStorage.language` (default `en`). You can update it to switch between `en`/`vi`.

---

## Notes & Recommendations

- Geolocation requires user permission; if denied, search by city instead.
- OpenWeatherMap rate limits requests; avoid calling the API too frequently.
- Do not commit real API keys; use `.env` for development and configuration for deployments.

---

## License

This project is for learning and demo purposes. Please review OpenWeatherMap terms when using their data.
