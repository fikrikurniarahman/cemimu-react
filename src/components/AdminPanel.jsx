import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import ProductForm from './ProductForm'

export default function AdminPanel({ open, onClose, foods, onAdd, onUpdate, onDelete, onResetDefault }) {
  const [editingFood, setEditingFood] = useState(null)
  const [tableSearch, setTableSearch] = useState('')

  const filteredFoods = useMemo(() => {
    if (!tableSearch) return foods
    const q = tableSearch.toLowerCase()
    return foods.filter((f) => f.name.toLowerCase().includes(q) || f.machine.toLowerCase().includes(q))
  }, [foods, tableSearch])

  function handleSubmit(data) {
    if (editingFood) {
      onUpdate(editingFood.id, data)
      setEditingFood(null)
    } else {
      onAdd(data)
    }
  }

  function handleDelete(food) {
    if (confirm(`Hapus "${food.name}" dari daftar produk?`)) {
      onDelete(food.id)
      if (editingFood?.id === food.id) setEditingFood(null)
    }
  }

  function toggleStock(food) {
    onUpdate(food.id, { inStock: food.inStock === false })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-wheat w-full max-w-4xl rounded-2xl shadow-pop max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-wheatdark">
              <div>
                <h2 className="font-display text-lg text-grassdark">Panel Admin — Kelola Produk</h2>
                <p className="text-[11px] text-ink/50">{foods.length} produk tersimpan di browser ini</p>
              </div>
              <button onClick={onClose} className="text-ink/50 hover:text-ink text-xl leading-none">
                ×
              </button>
            </div>

            <div className="px-5 py-4 border-b border-wheatdark">
              <ProductForm
                editingFood={editingFood}
                onSubmit={handleSubmit}
                onCancelEdit={() => setEditingFood(null)}
              />
            </div>

            <div className="px-5 pt-3">
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Cari produk di tabel ini..."
                className="w-full border-2 border-wheatdark rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-grass"
              />
            </div>

            <div className="px-5 py-3 overflow-y-auto flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase text-ink/50 sticky top-0 bg-wheat">
                    <th className="py-2 pr-2"> </th>
                    <th className="py-2 pr-2">Nama</th>
                    <th className="py-2 pr-2">Mesin</th>
                    <th className="py-2 pr-2">Level</th>
                    <th className="py-2 pr-2">Harga</th>
                    <th className="py-2 pr-2">Stok</th>
                    <th className="py-2 pr-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map((f) => {
                    const outOfStock = f.inStock === false
                    return (
                      <tr key={f.id} className={`border-t border-wheatdark/60 ${outOfStock ? 'opacity-50' : ''}`}>
                        <td className="py-2 pr-2">
                          <div className="w-8 h-8 rounded-lg bg-wheat flex items-center justify-center overflow-hidden">
                            {f.image ? (
                              <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageOff className="w-4 h-4 text-ink/25" strokeWidth={1.5} />
                            )}
                          </div>
                        </td>
                        <td className="py-2 pr-2 font-semibold">{f.name}</td>
                        <td className="py-2 pr-2 text-ink/70">{f.machine}</td>
                        <td className="py-2 pr-2 text-ink/70">{f.level}</td>
                        <td className="py-2 pr-2 text-ink/70">Rp{f.price.toLocaleString('id-ID')}</td>
                        <td className="py-2 pr-2">
                          <button
                            onClick={() => toggleStock(f)}
                            className={`text-[10px] font-bold px-2 py-1 rounded-full transition btn-press ${
                              outOfStock
                                ? 'bg-barn/10 text-barn border border-barn/30'
                                : 'bg-grass/10 text-grassdark border border-grass/30'
                            }`}
                          >
                            {outOfStock ? 'Habis' : 'Ada'}
                          </button>
                        </td>
                        <td className="py-2 pr-2">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingFood(f)}
                              className="text-xs font-semibold text-grassdark border-2 border-grass/40 px-3 py-1 rounded-lg hover:bg-grass hover:text-white transition btn-press"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(f)}
                              className="text-xs font-semibold text-barn border-2 border-barn/40 px-3 py-1 rounded-lg hover:bg-barn hover:text-white transition btn-press"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {filteredFoods.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-ink/50">
                        {foods.length === 0 ? 'Belum ada produk. Tambahkan lewat form di atas.' : 'Tidak ada produk yang cocok dengan pencarian.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-wheatdark flex justify-between items-center">
              <button
                onClick={() => confirm('Kembalikan semua produk ke data default? Perubahan admin akan hilang.') && onResetDefault()}
                className="text-xs font-semibold text-ink/50 hover:text-barn"
              >
                Reset ke data default
              </button>
              <button
                onClick={onClose}
                className="text-sm font-semibold text-white bg-grassdark px-5 py-2 rounded-xl btn-press"
              >
                Selesai
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
