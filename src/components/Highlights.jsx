import {
  WiHumidity, WiBarometer, WiStrongWind,
  WiSunrise, WiSunset,
} from 'react-icons/wi'
import { BsEye, BsThermometerHalf } from 'react-icons/bs'
import { GiAirZigzag } from 'react-icons/gi'
import {
  getWindDirection,
  formatTime,
  getAQIDescription,
} from '../services/weatherApi.js'

export default function Highlights({ current, airQuality }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Highlights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <AirQualityCard airQuality={airQuality} wind={current.wind} />
        <SunriseSunsetCard sys={current.sys} timezone={current.timezone} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DetailCard icon={WiHumidity} label="Humidity" value={`${current.main.humidity}%`} />
        <DetailCard icon={WiBarometer} label="Pressure" value={`${current.main.pressure} hPa`} />
        <DetailCard icon={BsEye} label="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
        <DetailCard
          icon={BsThermometerHalf}
          label="Feels Like"
          value={`${Math.round(current.main.feels_like)}°C`}
        />
      </div>
    </div>
  )
}

function AirQualityCard({ airQuality, wind }) {
  if (!airQuality) {
    return (
      <div className="weather-card">
        <div className="flex items-center gap-2 mb-3">
          <GiAirZigzag className="text-xl text-emerald-400" />
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Air Quality Index
          </h3>
        </div>
        <p className="text-sm text-gray-400">No data available</p>
      </div>
    )
  }

  const aqi = airQuality.list[0].main.aqi
  const components = airQuality.list[0].components
  const { label, color } = getAQIDescription(aqi)

  return (
    <div className="weather-card">
      <div className="flex items-center gap-2 mb-3">
        <GiAirZigzag className="text-xl text-emerald-400" />
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Air Quality Index
        </h3>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className={`text-lg font-bold ${color.replace('text-', 'text-')}`}>
          {label}
        </span>
        <span className="text-sm text-gray-400">(AQI {aqi})</span>
      </div>

      <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
        <WiStrongWind className="text-lg" />
        <span>{wind.speed} m/s {getWindDirection(wind.deg)}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <span className="text-gray-400">CO</span>
        <span className="text-white text-right">{components.co.toFixed(1)}</span>
        <span className="text-gray-400">NO</span>
        <span className="text-white text-right">{components.no.toFixed(1)}</span>
        <span className="text-gray-400">NO₂</span>
        <span className="text-white text-right">{components.no2.toFixed(1)}</span>
        <span className="text-gray-400">O₃</span>
        <span className="text-white text-right">{components.o3.toFixed(1)}</span>
      </div>
    </div>
  )
}

function SunriseSunsetCard({ sys, timezone }) {
  return (
    <div className="weather-card">
      <div className="flex items-center gap-2 mb-4">
        <WiSunrise className="text-xl text-amber-400" />
        <WiSunset className="text-xl text-orange-400" />
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Sunrise & Sunset
        </h3>
      </div>

      <div className="flex justify-around text-center">
        <div>
          <WiSunrise className="text-3xl text-amber-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">Sunrise</p>
          <p className="text-base font-semibold text-white">
            {formatTime(sys.sunrise, timezone)}
          </p>
        </div>
        <div>
          <WiSunset className="text-3xl text-orange-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">Sunset</p>
          <p className="text-base font-semibold text-white">
            {formatTime(sys.sunset, timezone)}
          </p>
        </div>
      </div>
    </div>
  )
}

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="weather-card text-center">
      <Icon className="text-2xl text-emerald-400 mx-auto mb-2" />
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-semibold text-white mt-1">{value}</p>
    </div>
  )
}
