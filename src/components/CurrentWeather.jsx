import { getWeatherIcon } from '../services/weatherApi.js'

export default function CurrentWeather({ data }) {
  const { name, sys, main, weather, timezone } = data
  const now = new Date()
  const localTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + timezone * 1000)

  const dateStr = localTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const w = weather[0]

  return (
    <div className="weather-card text-center">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Now</p>
      <p className="text-6xl font-light text-white my-2">
        {Math.round(main.temp)}°C
      </p>
      <img
        src={getWeatherIcon(w.icon)}
        alt={w.description}
        className="w-20 h-20 mx-auto"
      />
      <p className="text-lg capitalize text-gray-300 mt-1">{w.description}</p>
      <p className="text-sm text-gray-400 mt-2">{dateStr}</p>
      <p className="text-base font-semibold text-white mt-1">
        {name}, {sys.country}
      </p>
    </div>
  )
}
