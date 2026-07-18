import { getWeatherIcon } from '../services/weatherApi.js'

function getDailyForecast(list) {
  const days = {}
  for (const item of list) {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US')
    if (!days[date]) {
      days[date] = item
    }
  }
  return Object.values(days).slice(0, 5)
}

function ForecastRow({ day }) {
  const date = new Date(day.dt * 1000)

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-500/30 last:border-b-0">
      <img
        src={getWeatherIcon(day.weather[0].icon)}
        alt={day.weather[0].description}
        className="w-10 h-10"
      />
      <span className="text-lg font-semibold text-white w-16">
        {Math.round(day.main.temp)}°C
      </span>
      <span className="text-sm text-gray-400 flex-1">
        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </span>
      <span className="text-sm text-gray-300 capitalize text-right truncate max-w-[120px]">
        {day.weather[0].description}
      </span>
    </div>
  )
}

export default function Forecast({ data }) {
  const daily = getDailyForecast(data.list)

  return (
    <div className="weather-card mt-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
        5-Day Forecast
      </h3>
      {daily.map((day) => (
        <ForecastRow key={day.dt} day={day} />
      ))}
    </div>
  )
}
