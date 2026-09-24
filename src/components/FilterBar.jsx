export default function FilterBar({
  search,
  onSearchChange,
  machine,
  onMachineChange,
  machines,
  onReset,
  shownCount,
  selectedCount,
  totalQty,
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 sticky top-[60px] z-20 bg-wheat/95 backdrop-blur border-b border-wheatdark">
      <input
        type="text"
        placeholder="Cari food..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[160px] border-2 border-wheatdark rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-grass"
      />
      <button
        onClick={onReset}
        className="text-sm font-semibold text-barn border-2 border-barn/30 px-3 py-2 rounded-xl hover:bg-barn hover:text-white transition btn-press"
      >
        Reset
      </button>
      <div className="w-full sm:w-auto text-xs text-ink/60 flex gap-3 font-medium">
        <span>
          Tampil <b className="text-grassdark">{shownCount}</b> food
        </span>
        <span>
          Dipilih <b className="text-grassdark">{selectedCount}</b> jenis
        </span>
        <span>
          Jumlah <b className="text-grassdark">{totalQty}</b> item
        </span>
      </div>
      <select
        value={machine ?? ''}
        onChange={(e) => onMachineChange(e.target.value || null)}
        className="w-full sm:w-auto border-2 border-wheatdark rounded-xl px-3 py-2 text-sm bg-white font-semibold text-ink/80 focus:outline-none focus:border-grass"
      >
        <option value="">Semua Mesin</option>
        {machines.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  )
}
