import { motion } from 'framer-motion'
import { MdErrorOutline } from 'react-icons/md'

export default function Error({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mx-auto max-w-md text-center"
    >
      <MdErrorOutline className="text-4xl text-red-400 mx-auto mb-3" />
      <p className="text-red-600 dark:text-red-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm cursor-pointer"
        >
          Try Again
        </button>
      )}
    </motion.div>
  )
}
