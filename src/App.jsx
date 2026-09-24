import { useEffect, useMemo, useState } from 'react'
import { useFoods } from './hooks/useFoods'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import FoodGrid from './components/FoodGrid'
import CartBar from './components/CartBar'
import SummaryModal from './components/SummaryModal'
import AdminPanel from './components/AdminPanel'
import AdminGate from './components/AdminGate'

export default function App() {
  const { foods, addFood, updateFood, deleteFood, resetToDefault } = useFoods()

  const [level, setLevel] = useState(null)
  const [search, setSearch] = useState('')
  const [machine, setMachine] = useState(null)
  const [qtyMap, setQtyMap] = useState({})
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  // Akses tersembunyi: tekan Ctrl+Shift+A (atau Cmd+Shift+A di Mac) di mana saja
  // untuk membuka gerbang PIN admin. Tidak ada tombol yang terlihat di halaman.
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setGateOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const machines = useMemo(() => [...new Set(foods.map((f) => f.machine))], [foods])

  const visibleFoods = useMemo(() => {
    return foods.filter((f) => {
      const levelOk = level ? f.level <= level : true
      const searchOk = search ? f.name.toLowerCase().includes(search.toLowerCase()) : true
      const machineOk = machine ? f.machine === machine : true
      return levelOk && searchOk && machineOk
    })
  }, [foods, level, search, machine])

  const selectedFoods = useMemo(
    () =>
      foods.filter((f) => (qtyMap[f.id] || 0) > 0).map((f) => ({ ...f, qty: qtyMap[f.id] })),
    [foods, qtyMap]
  )

  const totalQty = selectedFoods.reduce((sum, f) => sum + f.qty, 0)

  function handleChangeQty(id, delta) {
    setQtyMap((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  function handleReset() {
    setLevel(null)
    setSearch('')
    setMachine(null)
    setQtyMap({})
  }

  return (
    <div className="text-ink">
      <Header />
      <Hero onApplyLevel={setLevel} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        machine={machine}
        onMachineChange={setMachine}
        machines={machines}
        onReset={handleReset}
        shownCount={visibleFoods.length}
        selectedCount={selectedFoods.length}
        totalQty={totalQty}
      />
      <main className="max-w-6xl mx-auto px-4 pb-32 pt-4">
        <FoodGrid foods={visibleFoods} qtyMap={qtyMap} onChangeQty={handleChangeQty} />
      </main>
      <CartBar totalQty={totalQty} onOpenSummary={() => setSummaryOpen(true)} />
      <SummaryModal
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        selectedFoods={selectedFoods}
      />
      <AdminGate
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onSuccess={() => { setGateOpen(false); setAdminOpen(true) }}
      />
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        foods={foods}
        onAdd={addFood}
        onUpdate={updateFood}
        onDelete={deleteFood}
        onResetDefault={resetToDefault}
      />
    </div>
  )
}
