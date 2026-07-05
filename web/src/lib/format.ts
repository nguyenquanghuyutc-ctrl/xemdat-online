/** Format số VND kiểu "10.000.000.000 đ" hoặc rút gọn "10 tỷ". */
export function formatPrice(price: number | null, fallback: string): string {
  if (price == null) return fallback || 'Liên hệ'

  if (price >= 1_000_000_000) {
    const value = price / 1_000_000_000
    return `${trimZero(value)} tỷ`
  }
  if (price >= 1_000_000) {
    const value = price / 1_000_000
    return `${trimZero(value)} triệu`
  }
  return `${price.toLocaleString('vi-VN')} đ`
}

function trimZero(value: number): string {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)
}

/** Format diện tích kèm đơn vị m². */
export function formatArea(area: number | null): string {
  if (area == null) return '—'
  return `${area.toLocaleString('vi-VN')} m²`
}
