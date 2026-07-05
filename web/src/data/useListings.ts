import { useEffect, useState } from 'react'
import type { Listing, ListingsResponse } from '../types/listing'

interface UseListingsResult {
  listings: Listing[]
  loading: boolean
  error: string | null
}

/**
 * Tải danh sách tin đất từ file JSON tĩnh (data/listings.json), được
 * GitHub Actions tạo định kỳ từ Google Apps Script — trình duyệt khách
 * KHÔNG bao giờ gọi trực tiếp vào Apps Script hay Google Sheet.
 */
export function useListings(): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.BASE_URL}data/listings.json`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được dữ liệu tin đất')
        return res.json() as Promise<ListingsResponse>
      })
      .then((data) => {
        if (!cancelled) setListings(data.listings || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { listings, loading, error }
}
