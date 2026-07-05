import { HOTLINE, HOTLINE_DISPLAY, ZALO_URL } from '../lib/constants'

interface ContactCTAProps {
  className?: string
}

export function ContactCTA({ className = '' }: ContactCTAProps) {
  return (
    <div className={`rounded-2xl border border-brand-100 bg-brand-50 p-5 ${className}`}>
      <p className="text-sm font-medium text-slate-600">
        Quan tâm lô đất này? Liên hệ ngay để được tư vấn chi tiết
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${HOTLINE}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-[0.98]"
        >
          <PhoneIcon />
          Gọi {HOTLINE_DISPLAY}
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-300 bg-white px-5 py-3 font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-[0.98]"
        >
          <ChatIcon />
          Chat Zalo
        </a>
      </div>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.4 21 3 14.6 3 6a2 2 0 0 1 1-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M21 12a8 8 0 1 1-3.4-6.55L21 4l-1 4.2A7.96 7.96 0 0 1 21 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
