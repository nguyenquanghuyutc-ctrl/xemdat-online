/**
 * Dọn dẹp định kỳ: khi 1 tin đất KHÔNG còn nằm trong whitelist trạng thái
 * công khai nữa (ví dụ đã chuyển sang "Đang đàm phán", "Đã chốt", "Ngưng
 * bán"), thu hồi lại quyền chia sẻ "Anyone with link" đã từng cấp cho ảnh
 * của tin đó — để link ảnh cũ không còn xem được nữa dù ai đó đã lưu lại.
 *
 * Cách bật chạy tự động: mở hàm installDailyMaintenanceTrigger() bên dưới,
 * bấm nút Run (▶) MỘT LẦN trong trình soạn Apps Script. Sau đó Apps Script
 * sẽ tự chạy revokeStaleImageSharing() mỗi ngày mà không cần làm gì thêm.
 */
function revokeStaleImageSharing() {
  var rows = getRawRows_();
  var revokedCount = 0;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (isPublicStatus_(row['Trạng thái'])) continue; // vẫn đang công khai, bỏ qua

    for (var c = 0; c < IMAGE_COLUMNS.length; c++) {
      var relativePath = row[IMAGE_COLUMNS[c]];
      if (!relativePath) continue;

      var file = findDriveFileForPath_(String(relativePath).trim());
      if (!file) continue;

      try {
        var access = file.getSharingAccess();
        if (access === DriveApp.Access.ANYONE_WITH_LINK || access === DriveApp.Access.ANYONE) {
          file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
          revokedCount++;
        }
      } catch (err) {
        Logger.log('Không thể thu hồi quyền ảnh ' + relativePath + ': ' + err);
      }
    }
  }

  Logger.log('Đã thu hồi quyền xem cho ' + revokedCount + ' ảnh không còn công khai.');
  return revokedCount;
}

/**
 * Chạy 1 lần để tạo trigger hàng ngày cho revokeStaleImageSharing().
 * Không cần chạy lại trừ khi bạn xoá trigger và muốn tạo lại.
 */
function installDailyMaintenanceTrigger() {
  // Xoá trigger cũ (nếu có) để tránh tạo trùng khi chạy lại hàm này.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'revokeStaleImageSharing') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger('revokeStaleImageSharing')
    .timeBased()
    .everyDays(1)
    .atHour(2) // chạy lúc 2h sáng, ít ảnh hưởng nếu có sự cố
    .create();

  Logger.log('Đã tạo trigger chạy revokeStaleImageSharing() hàng ngày lúc 2h sáng.');
}
