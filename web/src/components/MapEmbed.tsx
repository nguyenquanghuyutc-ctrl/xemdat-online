import type { ListingLocation } from '../types/listing'

interface MapEmbedProps {
  location: ListingLocation
}

/** Nhúng Google Maps qua iframe — không cần API key, không tốn phí. */
export function MapEmbed({ location }: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${location.lat},${location.lng}&hl=vi&z=16&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <iframe
        title="Vị trí lô đất"
        src={src}
        className="h-64 w-full sm:h-80"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-50 px-4 py-2.5 text-center text-sm font-medium text-brand-700 hover:bg-slate-100"
      >
        Chỉ đường trên Google Maps →
      </a>
    </div>
  )
}
