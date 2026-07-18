import { WiDaySunny } from 'react-icons/wi'

export default function Navbar() {
  return (
    <nav className="text-center py-6">
      <div className="flex items-center justify-center gap-2">
        <WiDaySunny className="text-4xl text-sky-500" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          SkyForecast
        </h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Real-time weather for any city worldwide
      </p>
    </nav>
  )
}
