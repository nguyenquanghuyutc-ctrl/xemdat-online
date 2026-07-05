import { useMemo, useState } from 'react'
import { useListings } from '../data/useListings'
import { FilterBar } from '../components/FilterBar'
import { ListingCard } from '../components/ListingCard'
import { applyFilters, DEFAULT_FILTERS } from '../lib/filters'
import { BRAND_NAME, BRAND_REGION, HOTLINE, HOTLINE_DISPLAY } from '../lib/constants'

type TransactionTab = 'sale' | 'rent'

export function HomePage() {
  const { listings, loading, error } = useListings()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [tab, setTab] = useState<TransactionTab>('sale')

  const filtered = useMemo(() => applyFilters(listings, filters), [listings, filters])

  const stats = useMemo(() => {
    const totalArea = listings.reduce((sum, l) => sum + (l.area ?? 0), 0)
    const zones = new Set(listings.map((l) => l.address).filter(Boolean))
    return {
      count: listings.length,
      areaHa: totalArea / 10000,
      zones: zones.size,
    }
  }, [listings])

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 px-4 pb-24 pt-10 text-white sm:px-6 sm:pb-32 sm:pt-14">
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 sm:h-64 sm:w-64" />
        <span className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-white/5 sm:h-48 sm:w-48" />

        <div className="relative mx-auto max-w-6xl">
          <span className="mb-3 inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Uy tín · Minh bạch · Chuyên nghiệp
          </span>
          <h1 className="max-w-2xl text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Đất công nghiệp {BRAND_REGION}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-brand-100 sm:text-base">
            {BRAND_NAME} — quỹ đất công nghiệp {BRAND_REGION} được thẩm định kỹ, cập nhật
            liên tục hình ảnh, vị trí thực tế và pháp lý minh bạch cho khách hàng tại {BRAND_REGION} và
            các vùng lân cận.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:max-w-lg">
            <Stat value={`${stats.count}+`} label="Lô đất đang bán" />
            <Stat value={stats.areaHa >= 1 ? `${stats.areaHa.toFixed(1)} ha` : '—'} label="Tổng diện tích" />
            <Stat value={`${stats.zones}+`} label={`Khu vực tại ${BRAND_REGION}`} />
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-16 sm:px-6">
        <div className="rounded-2xl bg-white p-4 shadow-xl shadow-brand-900/10 sm:p-5">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 p-1">
            <TabButton label="Bán đất" active={tab === 'sale'} onClick={() => setTab('sale')} />
            <TabButton label="Cho thuê đất" active={tab === 'rent'} onClick={() => setTab('rent')} />
          </div>

          {tab === 'sale' && <FilterBar listings={listings} filters={filters} onChange={setFilters} />}

          {tab === 'rent' && (
            <p className="text-sm text-slate-500">
              Tính năng cho thuê đất công nghiệp đang được chuẩn bị ra mắt. Gọi hotline{' '}
              <a href={`tel:${HOTLINE}`} className="font-semibold text-brand-700">
                {HOTLINE_DISPLAY}
              </a>{' '}
              để được tư vấn nhu cầu thuê đất ngay.
            </p>
          )}
        </div>

        {tab === 'sale' && (
          <div className="pb-10 pt-8">
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
        )}

        {tab === 'rent' && (
          <div className="pb-16 pt-10 text-center">
            <StateMessage text="Chưa có tin cho thuê đất nào — quay lại sau nhé!" />
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
        active ? 'bg-brand-800 text-white shadow' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-extrabold text-white sm:text-2xl">{value}</p>
      <p className="text-xs text-brand-200 sm:text-sm">{label}</p>
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
