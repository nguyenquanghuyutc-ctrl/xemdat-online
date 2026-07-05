import { useMemo, useState } from 'react'
import { useListings } from '../data/useListings'
import { FilterBar } from '../components/FilterBar'
import { ListingCard } from '../components/ListingCard'
import { applyFilters, DEFAULT_FILTERS } from '../lib/filters'
import { BRAND_NAME } from '../lib/constants'

export function HomePage() {
  const { listings, loading, error } = useListings()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filtered = useMemo(() => applyFilters(listings, filters), [listings, filters])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-10 text-white sm:px-10 sm:py-14">
        <h1 className="text-2xl font-bold sm:text-4xl">Quỹ đất công nghiệp uy tín</h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-50 sm:text-base">
          {BRAND_NAME} — cập nhật liên tục các lô đất đang mở bán, đầy đủ hình ảnh,
          vị trí và pháp lý minh bạch.
        </p>
      </section>

      <div className="mb-6">
        <FilterBar listings={listings} filters={filters} onChange={setFilters} />
      </div>

      {loading && <StateMessage text="Đang tải danh sách đất…" />}
      {error && <StateMessage text="Không tải được dữ liệu, vui lòng thử lại sau." isError />}

      {!loading && !error && (
        <>
          <p className="mb-4 text-sm text-slate-500">Tìm thấy {filtered.length} lô đất</p>
          {filtered.length === 0 ? (
            <StateMessage text="Không có lô đất nào phù hợp với bộ lọc." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function StateMessage({ text, isError }: { text: string; isError?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-8 text-center text-sm ${
        isError ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-200 bg-white text-slate-500'
      }`}
    >
      {text}
    </div>
  )
}
