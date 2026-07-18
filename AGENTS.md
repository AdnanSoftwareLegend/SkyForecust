# SkyForecast — Agent Guide

## Stack

- **Vite 8** + **@vitejs/plugin-react** (Oxc-based)
- **React 19** (JSX, no TypeScript)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no PostCSS config)
- **Axios**, **React Icons**, **Framer Motion**
- **OpenWeatherMap API** (free tier)
- **oxlint** for linting (config: `.oxlintrc.json`)

## Commands (npm)

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |

No test framework or typecheck step is configured.

## Conventions

- **No TypeScript** — all source is `.jsx` / `.js`.
- Imports use `.jsx` extensions explicitly (e.g., `import App from './App.jsx'`).
- Oxlint rules: `react/rules-of-hooks` (error), `react/only-export-components` (warn with `allowConstantExport`).

## Setup

1. Get a free API key at https://openweathermap.org/appid
2. Copy `.env.example` to `.env` and set `VITE_OPENWEATHERMAP_API_KEY`

## Architecture

```
src/
  components/     # UI components (Header, SearchBar, CurrentWeather, Forecast, etc.)
  hooks/          # useGeolocation, useWeather
  services/       # weatherApi.js — all OpenWeatherMap API calls + helpers
  App.jsx         # Root layout, wires search + geolocation + weather data
  main.jsx        # Entrypoint
  index.css        # Tailwind v4 import + custom layer utilities
```

- `App.jsx` uses `useGeolocation` to auto-fetch weather on load, then falls through to `useWeather` for city search.
- API functions in `weatherApi.js` each target one OWM endpoint. Shared helpers (`getWeatherIcon`, `getAQIDescription`, etc.) live there too.
- Tailwind config is entirely in `index.css` (`@import "tailwindcss"` + `@layer` utilities). No `tailwind.config.js` or `postcss.config.js`.
