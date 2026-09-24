import { useEffect, useState } from 'react'
import { DEFAULT_FOODS } from '../data/foods'

const STORAGE_KEY = 'cemimu_foods_v1'

function loadFoods() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_FOODS
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
    return DEFAULT_FOODS
  } catch {
    return DEFAULT_FOODS
  }
}

export function useFoods() {
  const [foods, setFoods] = useState(loadFoods)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
    } catch {
      // localStorage penuh/tidak tersedia — perubahan tetap jalan di sesi ini
    }
  }, [foods])

  function addFood(food) {
    const nextId = foods.length > 0 ? Math.max(...foods.map((f) => f.id)) + 1 : 1
    setFoods((prev) => [...prev, { ...food, id: nextId }])
  }

  function updateFood(id, updates) {
    setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  function deleteFood(id) {
    setFoods((prev) => prev.filter((f) => f.id !== id))
  }

  function resetToDefault() {
    setFoods(DEFAULT_FOODS)
  }

  return { foods, addFood, updateFood, deleteFood, resetToDefault }
}
