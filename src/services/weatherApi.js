import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
const BASE_URL = 'https://api.openweathermap.org'

const api = axios.create({
  baseURL: BASE_URL,
  params: { appid: API_KEY },
})

export async function fetchCurrentWeather(city) {
  const { data } = await api.get('/data/2.5/weather', {
    params: { q: city, units: 'metric' },
  })
  return data
}

export async function fetchCurrentWeatherByCoords(lat, lon) {
  const { data } = await api.get('/data/2.5/weather', {
    params: { lat, lon, units: 'metric' },
  })
  return data
}

export async function fetchForecast(city) {
  const { data } = await api.get('/data/2.5/forecast', {
    params: { q: city, units: 'metric' },
  })
  return data
}

export async function fetchForecastByCoords(lat, lon) {
  const { data } = await api.get('/data/2.5/forecast', {
    params: { lat, lon, units: 'metric' },
  })
  return data
}

export async function fetchAirQuality(lat, lon) {
  const { data } = await api.get('/data/2.5/air_pollution', {
    params: { lat, lon },
  })
  return data
}

export function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function getAQIDescription(aqi) {
  const levels = {
    1: { label: 'Good', color: 'text-green-500' },
    2: { label: 'Fair', color: 'text-yellow-500' },
    3: { label: 'Moderate', color: 'text-orange-500' },
    4: { label: 'Poor', color: 'text-red-500' },
    5: { label: 'Very Poor', color: 'text-purple-600' },
  }
  return levels[aqi] || { label: 'Unknown', color: 'text-gray-500' }
}

export function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(deg / 45) % 8]
}

export function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}
