import { Link } from 'react-router-dom'
import { BRAND_SHORT_NAME, BRAND_TAGLINE, HOTLINE, HOTLINE_DISPLAY, LOGO_ICON } from '../lib/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img src={LOGO_ICON} alt={BRAND_SHORT_NAME} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-lg font-extrabold tracking-tight text-brand-800 sm:text-xl">
              {BRAND_SHORT_NAME}
            </span>
            <span className="hidden text-xs font-medium text-slate-400 sm:block">
              {BRAND_TAGLINE}
            </span>
          </span>
        </Link>

        <a
          href={`tel:${HOTLINE}`}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600 sm:px-4"
        >
          <span className="hidden sm:inline">Hotline</span> {HOTLINE_DISPLAY}
        </a>
      </div>
    </header>
  )
}
