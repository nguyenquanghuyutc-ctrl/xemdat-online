import { Link } from 'react-router-dom'
import type { Listing } from '../types/listing'
import { formatArea, formatPrice } from '../lib/format'

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const cover = listing.images[0]

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {cover ? (
          <img
            src={cover}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            Chưa có ảnh
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow">
          {listing.statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold text-slate-900">{listing.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-500">{listing.address}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-accent-600">
            {formatPrice(listing.price, listing.priceDisplay)}
          </span>
          <span className="text-sm text-slate-500">{formatArea(listing.area)}</span>
        </div>

        {listing.titleType && (
          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {listing.titleType}
          </span>
        )}
      </div>
    </Link>
  )
}
