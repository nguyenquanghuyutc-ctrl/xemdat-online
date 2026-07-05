/**
 * Cấu hình trung tâm — đây là nơi DUY NHẤT quyết định dữ liệu nào được công khai.
 * Sửa các giá trị bên dưới cho phù hợp, không cần sửa các file .gs khác.
 */

// ID của Google Sheet chứa dữ liệu nguồn đất.
var SHEET_ID = '1X_nfGBPCvfZf3sdGP4Jr5DdqxOshpuSW_DKa1DiMsOI';

// Tên tab (sheet) chứa dữ liệu.
var SHEET_NAME = 'nguondat';

// Chỉ những dòng có giá trị cột "Trạng thái" nằm trong danh sách này
// mới được trả về công khai. Đây là WHITELIST — an toàn mặc định:
// trạng thái mới phát sinh sau này sẽ KHÔNG tự động lộ ra web trừ khi
// được thêm vào đây.
var STATUS_WHITELIST = ['1. Đang rao bán'];

// Nhãn hiển thị công khai cho mọi tin hợp lệ — KHÔNG bao giờ trả
// nguyên văn giá trị cột "Trạng thái" gốc ra ngoài.
var PUBLIC_STATUS_LABEL = 'Cần bán';

// Tên thư mục Google Drive (do AppSheet tự tạo) chứa ảnh của sheet này.
var IMAGE_FOLDER_NAME = 'nguondat_Images';

// Có hiển thị công khai cột "Tên công ty" hay không.
// Người dùng đã xác nhận: ẨN LUÔN để an toàn.
var SHOW_COMPANY_NAME = false;

// Thời gian cache (giây) cho việc tra cứu fileId ảnh trong Drive,
// giúp giảm số lần tìm kiếm file lặp lại giữa các lần gọi.
var IMAGE_LOOKUP_CACHE_SECONDS = 6 * 60 * 60; // 6 giờ

// Allowlist TƯỜNG MINH các cột sẽ xuất hiện trong JSON công khai.
// Đây là cơ chế bảo mật cốt lõi: bất kỳ cột nào KHÔNG có tên ở đây
// (kể cả cột mới thêm sau này trong Sheet) sẽ KHÔNG bao giờ được trả ra,
// dù người viết code quên cập nhật.
var PUBLIC_COLUMNS = [
  'ID',
  'Tiêu đề',
  'Địa chỉ',
  'Vị trí đất',
  'Diện tích',
  'Loại sổ',
  'Sử dụng',
  'Giá bán',
  'Ngày cập nhật'
];

// Tên các cột ảnh, theo đúng thứ tự hiển thị trên web.
var IMAGE_COLUMNS = ['Hình ảnh 1', 'Hình ảnh 2', 'Hình ảnh 3'];
