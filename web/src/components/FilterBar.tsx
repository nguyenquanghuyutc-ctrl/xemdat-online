import type { Listing } from '../types/listing'
import { AREA_RANGES, PRICE_RANGES, uniqueValues, type FilterState } from '../lib/filters'

interface FilterBarProps {
  listings: Listing[]
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function FilterBar({ listings, filters, onChange }: FilterBarProps) {
  const titleTypes = uniqueValues(listings, 'titleType')
  const usages = uniqueValues(listings, 'usage')

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => set('search', e.target.value)}
        placeholder="Tìm theo tên hoặc địa chỉ, VD: Đông Hải…"
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Select
          label="Mức giá"
          value={filters.priceRange}
          onChange={(v) => set('priceRange', v)}
          options={PRICE_RANGES.map((r) => ({ value: r.value, label: r.label }))}
        />
        <Select
          label="Diện tích"
          value={filters.areaRange}
          onChange={(v) => set('areaRange', v)}
          options={AREA_RANGES.map((r) => ({ value: r.value, label: r.label }))}
        />
        <Select
          label="Loại sổ"
          value={filters.titleType}
          onChange={(v) => set('titleType', v)}
          options={[{ value: 'all', label: 'Tất cả loại sổ' }, ...titleTypes.map((t) => ({ value: t, label: t }))]}
        />
        <Select
          label="Mục đích SD"
          value={filters.usage}
          onChange={(v) => set('usage', v)}
          options={[{ value: 'all', label: 'Tất cả mục đích' }, ...usages.map((u) => ({ value: u, label: u }))]}
        />
      </div>
    </div>
  )
}

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
