import { useState } from 'react'
import { WiDaySunny } from 'react-icons/wi'
import { IoSearch } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'

export default function Header({ onSearch, onLocate, geoLoading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <header className="flex items-center gap-4 px-6 py-4 flex-wrap border-b border-gray-100">
      <div className="flex items-center gap-3 mr-6">
        <div className="relative">
          <WiDaySunny className="text-5xl text-yellow-400 drop-shadow-lg" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-sky-500 to-emerald-400 bg-clip-text text-transparent">
              SkyForecast
            </span>
          </h1>
          <p className="text-[11px] text-gray-400 tracking-widest uppercase">Weather Dashboard</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-[260px]">
        <div className="relative flex-1">
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 text-gray-800 placeholder-gray-400 text-base transition-all"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 transition-all cursor-pointer"
        >
          Search
        </button>
      </form>

      <button
        type="button"
        onClick={onLocate}
        disabled={geoLoading}
        className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-500 hover:text-gray-700 transition-all cursor-pointer disabled:cursor-not-allowed border border-gray-200"
        title="Use current location"
      >
        <MdMyLocation className={`text-xl ${geoLoading ? 'animate-spin' : ''}`} />
      </button>
    </header>
  )
}
