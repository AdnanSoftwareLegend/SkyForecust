import { useState, useCallback, useEffect } from 'react'
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
  fetchAirQuality,
} from '../services/weatherApi.js'

function getGeolocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ coords: null, error: 'Geolocation not supported' })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ coords: { lat: position.coords.latitude, lon: position.coords.longitude }, error: null }),
      (err) => resolve({ coords: null, error: err.message }),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  })
}

export function useWeather() {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [geoLoading, setGeoLoading] = useState(true)

  async function fetchAll(lat, lon, city) {
    setLoading(true)
    setError(null)
    try {
      const [currentData, forecastData] = city
        ? await Promise.all([fetchCurrentWeather(city), fetchForecast(city)])
        : await Promise.all([fetchCurrentWeatherByCoords(lat, lon), fetchForecastByCoords(lat, lon)])
      setCurrent(currentData)
      setForecast(forecastData)
      const { coord } = currentData
      try {
        const aqData = await fetchAirQuality(coord.lat, coord.lon)
        setAirQuality(aqData)
      } catch {
        setAirQuality(null)
      }
    } catch (err) {
      const msg =
        err.response?.status === 404
          ? 'City not found. Please try a different city name.'
          : err.response?.status === 401
            ? 'Invalid API key. Please check your .env file.'
            : 'Failed to fetch weather data. Please try again.'
      setError(msg)
      setCurrent(null)
      setForecast(null)
      setAirQuality(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchByCoords = useCallback(async (lat, lon) => {
    await fetchAll(lat, lon, null)
  }, [])

  const searchByCity = useCallback(async (city) => {
    await fetchAll(null, null, city)
  }, [])

  useEffect(() => {
    let cancelled = false
    getGeolocation().then(({ coords }) => {
      if (cancelled) return
      setGeoLoading(false)
      if (coords) {
        fetchByCoords(coords.lat, coords.lon)
      }
    })
    return () => { cancelled = true }
  }, [fetchByCoords])

  const locate = useCallback(async () => {
    setGeoLoading(true)
    const { coords } = await getGeolocation()
    setGeoLoading(false)
    if (coords) {
      await fetchAll(coords.lat, coords.lon, null)
    } else {
      await searchByCity('London')
    }
  }, [searchByCity])

  return { current, forecast, airQuality, loading, geoLoading, error, searchByCity, locate }
}
