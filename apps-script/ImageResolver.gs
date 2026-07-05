/**
 * Xử lý ảnh Google Drive: tra cứu file theo đường dẫn tương đối lưu trong
 * Sheet (kiểu "nguondat_Images/ten-file.jpg"), CHỈ mở quyền xem công khai
 * cho TỪNG FILE thuộc tin đang được whitelist — không bao giờ public
 * cả thư mục.
 */

/**
 * Với 1 dòng dữ liệu, trả về mảng URL ảnh công khai (đã lọc bỏ ảnh trống).
 * Đồng thời đảm bảo quyền chia sẻ của từng file ảnh là "Anyone with link".
 */
function resolvePublicImages_(row) {
  var urls = [];

  for (var i = 0; i < IMAGE_COLUMNS.length; i++) {
    var relativePath = row[IMAGE_COLUMNS[i]];
    if (!relativePath) continue;

    var url = resolveImageUrl_(String(relativePath).trim());
    if (url) urls.push(url);
  }

  return urls;
}

/**
 * Tra file Drive theo đường dẫn tương đối, đảm bảo quyền "Anyone with link
 * - Viewer", trả về URL dạng lh3.googleusercontent.com (tải nhanh, có cache
 * trình duyệt, không cần round-trip qua Apps Script mỗi lần xem ảnh).
 */
function resolveImageUrl_(relativePath) {
  var file = findDriveFileForPath_(relativePath);
  if (!file) return null;

  try {
    var access = file.getSharingAccess();
    if (access !== DriveApp.Access.ANYONE_WITH_LINK && access !== DriveApp.Access.ANYONE) {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    }
  } catch (err) {
    Logger.log('Không thể đổi quyền chia sẻ file ' + relativePath + ': ' + err);
    return null;
  }

  return 'https://lh3.googleusercontent.com/d/' + file.getId() + '=w1200';
}

/**
 * Tìm file Drive tương ứng với đường dẫn "TenThuMuc/ten-file.jpg", có cache
 * fileId để tránh phải quét thư mục lặp lại ở mỗi lần gọi.
 */
function findDriveFileForPath_(relativePath) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'imgpath:' + relativePath;
  var cachedId = cache.get(cacheKey);

  if (cachedId) {
    try {
      return DriveApp.getFileById(cachedId);
    } catch (err) {
      // File đã bị xoá/đổi id — bỏ qua cache, tra lại bên dưới.
    }
  }

  var segments = relativePath.split('/');
  var fileName = segments[segments.length - 1];

  var folder = getImageFolder_();
  if (!folder) return null;

  var files = folder.getFilesByName(fileName);
  if (!files.hasNext()) {
    Logger.log('Không tìm thấy file ảnh: ' + relativePath);
    return null;
  }

  var file = files.next();
  cache.put(cacheKey, file.getId(), IMAGE_LOOKUP_CACHE_SECONDS);
  return file;
}

/**
 * Lấy reference tới thư mục ảnh (theo tên cấu hình ở Config.gs).
 * Cache trong phạm vi 1 lần thực thi script.
 */
var _imageFolderCache_ = null;
function getImageFolder_() {
  if (_imageFolderCache_) return _imageFolderCache_;

  var folders = DriveApp.getFoldersByName(IMAGE_FOLDER_NAME);
  if (!folders.hasNext()) {
    Logger.log('Không tìm thấy thư mục Drive tên: ' + IMAGE_FOLDER_NAME);
    return null;
  }

  _imageFolderCache_ = folders.next();
  return _imageFolderCache_;
}
