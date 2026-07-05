import { Link } from 'react-router-dom'
import { BRAND_NAME, HOTLINE, HOTLINE_DISPLAY } from '../lib/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-base font-bold text-white">
            H
          </span>
          <span className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
            {BRAND_NAME}
          </span>
        </Link>

        <a
          href={`tel:${HOTLINE}`}
          className="flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <span className="hidden sm:inline">Hotline</span> {HOTLINE_DISPLAY}
        </a>
      </div>
    </header>
  )
}
