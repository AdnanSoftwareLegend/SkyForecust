import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoSearch } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'

export default function SearchBar({ onSearch, onLocate, geoLoading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex items-center gap-2 max-w-xl mx-auto px-4"
    >
      <div className="relative flex-1">
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 text-gray-800 dark:text-white placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors cursor-pointer"
      >
        <IoSearch className="text-lg" />
      </button>
      <button
        type="button"
        onClick={onLocate}
        disabled={geoLoading}
        className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
        title="Use current location"
      >
        <MdMyLocation className={`text-lg ${geoLoading ? 'animate-spin' : ''}`} />
      </button>
    </motion.form>
  )
}
