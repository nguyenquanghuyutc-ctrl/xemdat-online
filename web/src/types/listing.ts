export interface ListingLocation {
  lat: number
  lng: number
}

/** Khớp đúng với JSON công khai do apps-script/Filter.gs (sanitizeRow_) trả về. */
export interface Listing {
  id: string
  title: string
  address: string
  location: ListingLocation | null
  area: number | null
  titleType: string
  usage: string
  price: number | null
  priceDisplay: string
  statusLabel: string
  updatedAt: string
  images: string[]
  companyName?: string
}

export interface ListingsResponse {
  listings: Listing[]
}
