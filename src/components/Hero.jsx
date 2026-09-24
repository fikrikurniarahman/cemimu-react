import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hero({ onApplyLevel }) {
  const [value, setValue] = useState('')

  return (
    <section className="field-texture border-b-4 border-wheatdark">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 pt-10 pb-8 text-center"
      >
        <p className="inline-block bg-white/70 text-grassdark text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Pilihan kuliner lumbung
        </p>
        <motion.h1
          className="font-display text-3xl sm:text-4xl font-extrabold text-grassdark mb-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {"Pilih Resep & Makanan Favoritmu".split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <p className="text-ink/70 max-w-xl mx-auto text-sm sm:text-base">
          Masukkan level Hay Day-mu, lalu pilih menu terbaik untuk melengkapi pesanan lumbungmu hari ini.
        </p>

        <div className="mt-6 max-w-sm mx-auto bg-white rounded-2xl shadow-card p-4 text-left">
          <label className="text-xs font-semibold text-grassdark flex items-center gap-1 mb-2">
            🎯 Atur level kamu dulu
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Contoh: 45"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 border-2 border-wheatdark rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-grass"
            />
            <button
              onClick={() => onApplyLevel(Number(value) > 0 ? Number(value) : null)}
              className="bg-grass hover:bg-grassdark text-white text-sm font-semibold px-4 rounded-xl shadow-pop btn-press"
            >
              Siap!
            </button>
          </div>
          <p className="text-[11px] text-ink/50 mt-2">Item yang tampil otomatis menyesuaikan level ini.</p>
        </div>
      </motion.div>
    </section>
  )
}
