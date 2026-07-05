import { BRAND_NAME, BRAND_TAGLINE, HOTLINE_DISPLAY, LOGO_ICON } from '../lib/constants'

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center text-sm text-brand-100 sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm">
          <img src={LOGO_ICON} alt="" className="h-full w-full" />
        </span>
        <p className="font-semibold text-white">{BRAND_NAME}</p>
        <p className="text-accent-400">{BRAND_TAGLINE}</p>
        <p>Hotline tư vấn: {HOTLINE_DISPLAY}</p>
        <p className="mt-2 text-xs text-brand-300">
          © {new Date().getFullYear()} — Thông tin đất được cập nhật định kỳ từ hệ thống nội bộ.
        </p>
      </div>
    </footer>
  )
}
