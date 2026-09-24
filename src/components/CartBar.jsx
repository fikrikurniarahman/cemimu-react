import { motion } from 'framer-motion'

export default function CartBar({ totalQty, onOpenSummary }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-grassdark text-wheat rounded-2xl shadow-pop px-4 py-3 flex items-center justify-between"
        >
          <div className="text-sm">
            <p className="font-display text-lg leading-none">{totalQty} Pcs</p>
            <p className="text-[11px] text-wheat/70 mt-0.5">Minimal order 5 pcs</p>
          </div>
          <button
            onClick={onOpenSummary}
            className="bg-gold text-grassdark font-bold text-sm px-5 py-2.5 rounded-xl shadow-card btn-press"
          >
            Final Food List →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
