import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// PIN sederhana untuk mencegah orang iseng yang tidak sengaja tahu shortcut-nya.
// Ganti sesuai keinginan kamu. ⚠️ Ini bukan keamanan tingkat tinggi (PIN tersimpan di kode
// front-end), hanya "kunci pintu" ringan untuk pemakaian personal/lokal.
const ADMIN_PIN = '2468'

export default function AdminGate({ open, onClose, onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setPin('')
      setError(false)
      onSuccess()
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-wheat rounded-2xl shadow-pop p-5 w-full max-w-xs text-center"
          >
            <p className="text-3xl mb-2">🔒</p>
            <p className="font-display text-lg text-grassdark mb-1">Akses Admin</p>
            <p className="text-xs text-ink/50 mb-4">Masukkan PIN untuk mengelola produk.</p>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false) }}
              className={`w-full text-center tracking-[0.5em] text-lg border-2 rounded-xl px-3 py-2 focus:outline-none ${
                error ? 'border-barn' : 'border-wheatdark focus:border-grass'
              }`}
              placeholder="••••"
            />
            {error && <p className="text-barn text-xs mt-2">PIN salah, coba lagi.</p>}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 text-sm font-semibold text-ink/60 px-4 py-2 rounded-xl border-2 border-wheatdark btn-press"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 text-sm font-semibold text-white bg-grass hover:bg-grassdark px-4 py-2 rounded-xl btn-press"
              >
                Masuk
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
