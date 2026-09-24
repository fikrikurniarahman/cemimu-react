import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'

const STEP = 5

export default function FoodCard({ food, qty, onChangeQty, index }) {
  const outOfStock = food.inStock === false

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
      whileHover={outOfStock ? {} : { y: -3 }}
      className={`relative bg-white rounded-2xl shadow-card border-2 p-3 flex flex-col items-center text-center ${
        outOfStock ? 'border-transparent opacity-60' : qty > 0 ? 'border-grass' : 'border-transparent'
      }`}
    >
      {outOfStock && (
        <span className="absolute top-2 right-2 bg-barn text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-card z-10">
          STOK HABIS
        </span>
      )}
      <div className="w-14 h-14 rounded-xl bg-wheat flex items-center justify-center mb-2 overflow-hidden">
        {food.image ? (
          <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
        ) : (
          <ImageOff className="w-6 h-6 text-ink/25" strokeWidth={1.5} />
        )}
      </div>
      <p className="font-display text-sm font-semibold text-ink leading-tight">{food.name}</p>
      <p className="text-[11px] text-ink/50 mb-1">
        {food.machine} · Lv {food.level}
      </p>
      <p className="text-xs font-semibold text-grassdark mb-2">
        Rp{food.price.toLocaleString('id-ID')}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <button
          disabled={outOfStock}
          onClick={() => onChangeQty(food.id, -STEP)}
          className="w-7 h-7 rounded-full bg-wheatdark text-ink font-bold text-sm btn-press disabled:opacity-40 disabled:cursor-not-allowed"
        >
          −
        </button>
        <motion.span
          key={qty}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-9 text-center text-sm font-bold text-grassdark"
        >
          {qty}
        </motion.span>
        <button
          disabled={outOfStock}
          onClick={() => onChangeQty(food.id, STEP)}
          className="w-7 h-7 rounded-full bg-grass text-white font-bold text-sm btn-press disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </motion.div>
  )
}
