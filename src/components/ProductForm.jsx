import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'

const EMPTY = { name: '', level: '', price: '', machine: '', image: '', inStock: true }

export default function ProductForm({ editingFood, onSubmit, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (editingFood) {
      setForm({
        name: editingFood.name,
        level: editingFood.level,
        price: editingFood.price,
        machine: editingFood.machine,
        image: editingFood.image || '',
        inStock: editingFood.inStock !== false,
      })
    } else {
      setForm(EMPTY)
    }
  }, [editingFood])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleImageFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1.5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 1.5MB ya, biar tidak memberatkan browser.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => handleChange('image', reader.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.machine.trim()) {
      alert('Nama dan mesin wajib diisi.')
      return
    }
    onSubmit({
      name: form.name.trim(),
      level: Number(form.level) || 1,
      price: Number(form.price) || 0,
      machine: form.machine.trim(),
      image: form.image || '',
      inStock: form.inStock,
    })
    setForm(EMPTY)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl bg-wheat border-2 border-wheatdark flex items-center justify-center overflow-hidden shrink-0">
          {form.image ? (
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageOff className="w-6 h-6 text-ink/25" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex-1">
          <label className="text-[11px] font-semibold text-ink/60 block mb-1">Foto Produk</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="flex-1 text-xs file:mr-2 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-grass file:text-white file:text-xs file:font-semibold border-2 border-wheatdark rounded-lg"
            />
            {form.image && (
              <button
                type="button"
                onClick={() => {
                  handleChange('image', '')
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="text-xs font-semibold text-barn px-2 rounded-lg border-2 border-barn/30 btn-press"
              >
                Hapus
              </button>
            )}
          </div>
          <p className="text-[10px] text-ink/40 mt-1">Maks 1.5MB. Kalau kosong, kartu tampil ikon placeholder.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2">
          <label className="text-[11px] font-semibold text-ink/60">Nama Food</label>
          <input
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Contoh: Bread"
            className="w-full border-2 border-wheatdark rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-grass"
          />
        </div>
        <div className="col-span-1">
          <label className="text-[11px] font-semibold text-ink/60">Level</label>
          <input
            type="number"
            value={form.level}
            onChange={(e) => handleChange('level', e.target.value)}
            placeholder="3"
            className="w-full border-2 border-wheatdark rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-grass"
          />
        </div>
        <div className="col-span-1">
          <label className="text-[11px] font-semibold text-ink/60">Harga</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="250"
            className="w-full border-2 border-wheatdark rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-grass"
          />
        </div>
        <div className="col-span-2 sm:col-span-4">
          <label className="text-[11px] font-semibold text-ink/60">Mesin</label>
          <input
            value={form.machine}
            onChange={(e) => handleChange('machine', e.target.value)}
            placeholder="Bakery"
            className="w-full border-2 border-wheatdark rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-grass"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={form.inStock}
          onChange={(e) => handleChange('inStock', e.target.checked)}
          className="rounded border-wheatdark"
        />
        Stok tersedia (uncheck kalau sedang habis)
      </label>

      <div className="flex gap-2 justify-end pt-1">
        {editingFood && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm font-semibold text-ink/60 px-4 py-2 rounded-xl border-2 border-wheatdark btn-press"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          className="text-sm font-semibold text-white bg-grass hover:bg-grassdark px-5 py-2 rounded-xl shadow-card btn-press"
        >
          {editingFood ? 'Simpan Perubahan' : '+ Tambah Produk'}
        </button>
      </div>
    </form>
  )
}
