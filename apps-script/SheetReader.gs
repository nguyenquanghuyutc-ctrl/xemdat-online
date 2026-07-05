/**
 * Đọc dữ liệu thô từ sheet, map theo TÊN cột (không theo vị trí cột),
 * để việc thêm/xoá/đổi thứ tự cột trong Sheet sau này không làm vỡ code.
 */

/**
 * Trả về mảng object, mỗi object là 1 dòng dữ liệu, key = tên cột gốc.
 */
function getRawRows_() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Không tìm thấy sheet tên "' + SHEET_NAME + '"');
  }

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return [];
  }

  var headers = values[0];
  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var rowValues = values[i];
    var rowObj = {};
    for (var col = 0; col < headers.length; col++) {
      var header = String(headers[col]).trim();
      if (header) {
        rowObj[header] = rowValues[col];
      }
    }
    // Bỏ qua dòng trống hoàn toàn (không có ID).
    if (rowObj['ID']) {
      rows.push(rowObj);
    }
  }

  return rows;
}
