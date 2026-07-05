import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useListings } from '../data/useListings'
import { ImageGallery } from '../components/ImageGallery'
import { MapEmbed } from '../components/MapEmbed'
import { ContactCTA } from '../components/ContactCTA'
import { ShareButtons } from '../components/ShareButtons'
import { formatArea, formatPrice } from '../lib/format'

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { listings, loading, error } = useListings()

  if (loading) {
    return <CenteredMessage text="Đang tải thông tin lô đất…" />
  }

  if (error) {
    return <CenteredMessage text="Không tải được dữ liệu, vui lòng thử lại sau." />
  }

  const listing = listings.find((item) => item.id === id)

  if (!listing) {
    return (
      <CenteredMessage text="Không tìm thấy lô đất này — có thể tin đã được cập nhật hoặc không còn mở bán.">
        <Link to="/" className="mt-4 inline-block font-semibold text-brand-700 hover:underline">
          ← Xem các lô đất khác
        </Link>
      </CenteredMessage>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-700">
        ← Danh sách lô đất
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ImageGallery images={listing.images} title={listing.title} />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <span className="mb-2 inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
              {listing.statusLabel}
            </span>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{listing.title}</h1>
            <p className="mt-1 text-slate-500">{listing.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <Info label="Giá bán" value={formatPrice(listing.price, listing.priceDisplay)} highlight />
            <Info label="Diện tích" value={formatArea(listing.area)} />
            <Info label="Loại sổ" value={listing.titleType || '—'} />
            <Info label="Mục đích SD" value={listing.usage || '—'} />
            {listing.companyName && <Info label="Đơn vị môi giới" value={listing.companyName} />}
            <Info label="Cập nhật" value={listing.updatedAt || '—'} />
          </div>

          <ContactCTA />
          <ShareButtons title={listing.title} />
        </div>
      </div>

      {listing.location && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Vị trí lô đất</h2>
          <MapEmbed location={listing.location} />
        </div>
      )}
    </div>
  )
}

function Info({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={highlight ? 'font-bold text-accent-600' : 'font-medium text-slate-800'}>{value}</p>
    </div>
  )
}

function CenteredMessage({ text, children }: { text: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-slate-500">{text}</p>
      {children}
    </div>
  )
}
