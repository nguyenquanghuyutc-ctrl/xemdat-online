import { HOTLINE, ZALO_URL } from '../lib/constants'

/** Thanh gọi nhanh cố định dưới cùng màn hình, chỉ hiện trên mobile. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white p-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] sm:hidden">
      <a
        href={`tel:${HOTLINE}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 py-3 font-semibold text-white active:scale-[0.98]"
      >
        Gọi ngay
      </a>
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-300 py-3 font-semibold text-brand-700 active:scale-[0.98]"
      >
        Chat Zalo
      </a>
    </div>
  )
}
