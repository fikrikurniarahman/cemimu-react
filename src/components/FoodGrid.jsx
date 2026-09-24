import { useMemo } from 'react'
import FoodCard from './FoodCard'
import { CATEGORY_ORDER } from '../data/categoryOrder'
import { motion } from 'framer-motion'

export default function FoodGrid({ foods, qtyMap, onChangeQty }) {
  const grouped = useMemo(() => {
    const byMachine = {}
    foods.forEach((f) => {
      if (!byMachine[f.machine]) byMachine[f.machine] = []
      byMachine[f.machine].push(f)
    })

    const orderedNames = [
      ...CATEGORY_ORDER.filter((name) => byMachine[name]),
      ...Object.keys(byMachine).filter((name) => !CATEGORY_ORDER.includes(name)),
    ]

    return orderedNames.map((name) => ({ name, items: byMachine[name] }))
  }, [foods])

  if (foods.length === 0) {
    return (
      <p className="text-center text-ink/50 text-sm py-16">
        Tidak ada food yang cocok. Coba ubah level, mesin, atau kata kunci pencarian.
      </p>
    )
  }

  let globalIndex = 0

  return (
    <div className="space-y-8">
      {grouped.map((group) => (
        <motion.section
          key={group.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex items-baseline gap-2 mb-3">
            <motion.h2
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-display text-lg text-grassdark"
            >
              {group.name}
            </motion.h2>
            <span className="text-xs text-ink/40">({group.items.length} produk)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.items.map((food) => {
              const idx = globalIndex++
              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  qty={qtyMap[food.id] || 0}
                  onChangeQty={onChangeQty}
                  index={idx}
                />
              )
            })}
          </div>
        </motion.section>
      ))}
    </div>
  )
}