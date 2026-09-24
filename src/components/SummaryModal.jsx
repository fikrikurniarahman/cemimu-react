import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WA_ADMIN_NUMBER } from '../data/foods'

const MIN_ORDER = 5

export default function SummaryModal({ open, onClose, selectedFoods }) {
  const [useMachineName, setUseMachineName] = useState(true)
  const [copied, setCopied] = useState(false)

  const totalQty = selectedFoods.reduce((sum, f) => sum + f.qty, 0)
  const belowMinimum = totalQty > 0 && totalQty < MIN_ORDER
  const canSend = totalQty >= MIN_ORDER

  const listText =
    selectedFoods.length === 0
      ? 'Belum ada food yang dipilih.'
      : [
          '*PESANAN CEMIMU*',
          '',
          ...selectedFoods.map(
            (f) => `• ${f.name}${useMachineName ? ` (${f.machine})` : ''} x${f.qty}`
          ),
          '',
          `Total: ${totalQty} pcs`,
        ].join('\n')

  const waHref = `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(listText)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(listText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      alert('Gagal menyalin otomatis, silakan salin manual.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-wheat w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-pop max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-wheatdark">
              <h2 className="font-display text-lg text-grassdark">Daftar Siap Dikirim</h2>
              <button onClick={onClose} className="text-ink/50 hover:text-ink text-xl leading-none">
                ×
              </button>
            </div>
            <div className="px-5 py-3">
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={useMachineName}
                  onChange={(e) => setUseMachineName(e.target.checked)}
                  className="rounded border-wheatdark"
                />
                Gunakan nama mesin di daftar
              </label>
            </div>
            <div className="px-5 pb-3 overflow-y-auto flex-1">
              <pre className="bg-white border-2 border-wheatdark rounded-xl p-3 text-sm whitespace-pre-wrap leading-relaxed">
                {listText}
              </pre>
              {belowMinimum && (
                <p className="text-barn text-xs font-semibold mt-2">
                  ⚠️ Minimal order {MIN_ORDER} pcs. Tambah dulu jumlahnya ya, baru {totalQty} pcs.
                </p>
              )}
            </div>
            <div className="px-5 py-4 border-t border-wheatdark flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!canSend}
                className="flex-1 bg-white border-2 border-grass text-grassdark font-semibold text-sm py-2.5 rounded-xl btn-press disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copied ? 'Tersalin ✓' : 'Salin List'}
              </button>
              {canSend ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-barn hover:bg-barndark text-white font-semibold text-sm py-2.5 rounded-xl btn-press"
                >
                  Kirim ke WA Admin
                </a>
              ) : (
                <button
                  disabled
                  className="flex-1 text-center bg-barn/40 text-white font-semibold text-sm py-2.5 rounded-xl cursor-not-allowed"
                >
                  Kirim ke WA Admin
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
