import type { Listing } from '../types/listing'

export interface FilterState {
  search: string
  priceRange: string
  areaRange: string
  titleType: string
  usage: string
}

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  priceRange: 'all',
  areaRange: 'all',
  titleType: 'all',
  usage: 'all',
}

export const PRICE_RANGES: { value: string; label: string; test: (price: number | null) => boolean }[] = [
  { value: 'all', label: 'Tất cả mức giá', test: () => true },
  { value: 'lt5', label: 'Dưới 5 tỷ', test: (p) => p != null && p < 5_000_000_000 },
  { value: '5-10', label: '5 - 10 tỷ', test: (p) => p != null && p >= 5_000_000_000 && p < 10_000_000_000 },
  { value: '10-20', label: '10 - 20 tỷ', test: (p) => p != null && p >= 10_000_000_000 && p < 20_000_000_000 },
  { value: 'gt20', label: 'Trên 20 tỷ', test: (p) => p != null && p >= 20_000_000_000 },
]

export const AREA_RANGES: { value: string; label: string; test: (area: number | null) => boolean }[] = [
  { value: 'all', label: 'Tất cả diện tích', test: () => true },
  { value: 'lt1000', label: 'Dưới 1.000 m²', test: (a) => a != null && a < 1000 },
  { value: '1000-5000', label: '1.000 - 5.000 m²', test: (a) => a != null && a >= 1000 && a < 5000 },
  { value: '5000-10000', label: '5.000 - 10.000 m²', test: (a) => a != null && a >= 5000 && a < 10000 },
  { value: 'gt10000', label: 'Trên 10.000 m²', test: (a) => a != null && a >= 10000 },
]

export function uniqueValues(listings: Listing[], key: 'titleType' | 'usage'): string[] {
  const set = new Set<string>()
  for (const listing of listings) {
    if (listing[key]) set.add(listing[key])
  }
  return Array.from(set).sort()
}

export function applyFilters(listings: Listing[], filters: FilterState): Listing[] {
  const search = filters.search.trim().toLowerCase()
  const priceTest = PRICE_RANGES.find((r) => r.value === filters.priceRange)?.test ?? (() => true)
  const areaTest = AREA_RANGES.find((r) => r.value === filters.areaRange)?.test ?? (() => true)

  return listings.filter((listing) => {
    if (search) {
      const haystack = `${listing.title} ${listing.address}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    if (!priceTest(listing.price)) return false
    if (!areaTest(listing.area)) return false
    if (filters.titleType !== 'all' && listing.titleType !== filters.titleType) return false
    if (filters.usage !== 'all' && listing.usage !== filters.usage) return false
    return true
  })
}
