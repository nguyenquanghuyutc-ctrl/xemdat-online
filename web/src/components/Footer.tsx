import { BRAND_NAME, HOTLINE_DISPLAY } from '../lib/constants'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
        <p className="font-semibold text-slate-700">{BRAND_NAME}</p>
        <p className="mt-1">Hotline tư vấn: {HOTLINE_DISPLAY}</p>
        <p className="mt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} — Thông tin đất được cập nhật định kỳ từ hệ thống nội bộ.
        </p>
      </div>
    </footer>
  )
}
