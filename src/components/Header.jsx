import { WA_ADMIN_NUMBER } from '../data/foods'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-grass text-wheat shadow-pop">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-wheat flex items-center justify-center shadow-card overflow-hidden shrink-0">
            <img src="/images/logo.jpg" alt="Logo Cemimu" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-display text-xl leading-none tracking-tight">Cemimu</p>
            <p className="text-[11px] text-wheat/80 leading-none mt-1">You Can Get It All Here</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${WA_ADMIN_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-barn hover:bg-barndark text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-pop btn-press"
        >
          Chat Admin
        </a>
      </div>
    </header>
  )
}
