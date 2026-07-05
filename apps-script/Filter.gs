/**
 * Logic bảo mật cốt lõi: quyết định DÒNG nào và CỘT nào được công khai.
 */

/**
 * Kiểm tra 1 giá trị "Trạng thái" có nằm trong whitelist công khai không.
 */
function isPublicStatus_(status) {
  var normalized = String(status || '').trim();
  for (var i = 0; i < STATUS_WHITELIST.length; i++) {
    if (normalized === STATUS_WHITELIST[i]) {
      return true;
    }
  }
  return false;
}

/**
 * Chuyển 1 dòng dữ liệu thô (đầy đủ mọi cột, bao gồm cột nhạy cảm)
 * thành object công khai an toàn, CHỈ chứa các trường trong allowlist.
 * Đây là hàm duy nhất được phép tạo ra dữ liệu trả về cho web —
 * không có đường nào khác để 1 cột không nằm trong allowlist lọt ra ngoài.
 */
function sanitizeRow_(row) {
  var location = parseLatLng_(row['Vị trí đất']);
  var priceRaw = row['Giá bán'];

  var publicRow = {
    id: String(row['ID'] || ''),
    title: String(row['Tiêu đề'] || ''),
    address: String(row['Địa chỉ'] || ''),
    location: location,
    area: parseNumber_(row['Diện tích']),
    titleType: String(row['Loại sổ'] || ''),
    usage: String(row['Sử dụng'] || ''),
    price: parseNumber_(priceRaw),
    priceDisplay: String(priceRaw || ''),
    statusLabel: PUBLIC_STATUS_LABEL,
    updatedAt: formatDate_(row['Ngày cập nhật']),
    images: resolvePublicImages_(row)
  };

  if (SHOW_COMPANY_NAME) {
    publicRow.companyName = String(row['Tên công ty'] || '');
  }

  return publicRow;
}

/**
 * Đọc toàn bộ sheet, lọc theo whitelist trạng thái, sanitize từng dòng.
 * Đây là hàm chính được Code.gs gọi để trả JSON công khai.
 */
function getPublicListings() {
  var rows = getRawRows_();
  var result = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (isPublicStatus_(row['Trạng thái'])) {
      result.push(sanitizeRow_(row));
    }
  }

  return result;
}

/**
 * Parse "19.873752, 105.866951" -> {lat: 19.873752, lng: 105.866951}
 */
function parseLatLng_(value) {
  var str = String(value || '').trim();
  if (!str) return null;

  var parts = str.split(',');
  if (parts.length !== 2) return null;

  var lat = parseFloat(parts[0]);
  var lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) return null;

  return { lat: lat, lng: lng };
}

/**
 * Parse số có định dạng dấu chấm ngăn cách hàng nghìn kiểu Việt Nam
 * ("10.000.000.000" hoặc "12000") -> number.
 */
function parseNumber_(value) {
  if (typeof value === 'number') return value;
  var str = String(value || '').trim();
  if (!str) return null;

  var cleaned = str.replace(/\./g, '').replace(/,/g, '.');
  var num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Format ngày về dạng "dd/MM/yyyy" bất kể input là Date object hay string.
 */
function formatDate_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'dd/MM/yyyy');
  }
  return String(value || '');
}
