import mockWeatherData from './data/mockWeatherData.js'
import Header from './components/Header.jsx'
import CurrentWeather from './components/CurrentWeather.jsx'
import Forecast from './components/Forecast.jsx'
import Highlights from './components/Highlights.jsx'
import { useWeather } from './hooks/useWeather.js'

export default function App() {
  const { current: apiCurrent, forecast: apiForecast, airQuality: apiAirQuality, loading, geoLoading, error, searchByCity, locate } =
    useWeather()

  const current = apiCurrent || mockWeatherData.current
  const forecast = apiForecast || mockWeatherData.forecast
  const airQuality = apiAirQuality || mockWeatherData.airQuality

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={searchByCity} onLocate={locate} geoLoading={loading || geoLoading} />

      <main className="max-w-7xl mx-auto px-4 pb-8">
        {error && (
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 mt-6">
          <aside className="space-y-0">
            <CurrentWeather data={current} />
            <Forecast data={forecast} />
          </aside>

          <section>
            <Highlights current={current} airQuality={airQuality} />
          </section>
        </div>
      </main>
    </div>
  )
}
