/**
 * Các hàm chạy thử thủ công trong trình soạn Apps Script (nút Run ▶)
 * để tự kiểm tra trước khi Deploy Web App. Không được gọi từ web.
 */

/**
 * Chạy hàm này trước tiên: sẽ hiện hộp thoại xin quyền truy cập
 * Sheets + Drive (chỉ cần đồng ý 1 lần duy nhất).
 * Xem kết quả tại View > Logs (hoặc Ctrl+Enter).
 */
function testListings() {
  var listings = getPublicListings();
  Logger.log('Số tin công khai: ' + listings.length);
  Logger.log(JSON.stringify(listings, null, 2));
}

/**
 * Kiểm tra riêng việc tra + mở quyền 1 ảnh cụ thể.
 * Sửa lại giá trị bên dưới bằng 1 đường dẫn ảnh có thật trong sheet của bạn.
 */
function testSingleImage() {
  var sampleRelativePath = 'nguondat_Images/b5402149.Hình ảnh đất.070104.jpg';
  var url = resolveImageUrl_(sampleRelativePath);
  Logger.log('URL ảnh: ' + url);
}
