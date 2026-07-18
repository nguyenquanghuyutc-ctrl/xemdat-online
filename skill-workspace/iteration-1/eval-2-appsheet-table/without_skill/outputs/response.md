# Thiết Kế Cấu Trúc Database AppSheet - Quản Lý Nguồn Đất BĐS Công Nghiệp

## Tổng Quan Hệ Thống

Hệ thống quản lý nguồn đất BĐS công nghiệp trên AppSheet bao gồm các module chính:
1. **Quản lý Chủ đất** (Land Owners)
2. **Quản lý Lô đất** (Land Parcels)
3. **Pipeline Bán hàng** (Sales Pipeline)
4. **Quản lý Liên hệ & Tương tác** (Contacts & Activities)
5. **Danh mục dùng chung** (Reference Tables)

---

## 1. BẢNG CHỦ ĐẤT (ChuDat)

**Mô tả:** Lưu thông tin cá nhân/tổ chức sở hữu đất

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| ChuDat_ID | Text (Key) | Mã chủ đất (tự sinh) | VD: CD-2024-001 |
| Ho_Ten | Name | Họ và tên chủ đất | Bắt buộc |
| Loai_Chu_So_Huu | Enum | Cá nhân / Doanh nghiệp / Hộ gia đình | Dropdown |
| So_CCCD_CMND | Text | Số CCCD hoặc CMND | Dành cho cá nhân |
| Ma_So_Thue_DN | Text | Mã số thuế doanh nghiệp | Dành cho DN |
| Ten_Cong_Ty | Text | Tên công ty (nếu là DN) | |
| Nguoi_Dai_Dien | Name | Người đại diện pháp luật | Dành cho DN |
| So_Dien_Thoai_1 | Phone | Số điện thoại chính | Bắt buộc |
| So_Dien_Thoai_2 | Phone | Số điện thoại phụ | |
| Email | Email | Địa chỉ email | |
| Zalo | Text | Số Zalo | |
| Dia_Chi_Thuong_Tru | LongText | Địa chỉ thường trú | |
| Tinh_Thanh_ChuDat | Ref → DanhMuc_TinhThanh | Tỉnh/thành phố | |
| Nguon_Gioi_Thieu | Enum | Tự liên hệ / Môi giới / Giới thiệu / Marketing | Kênh tiếp cận |
| Nhan_Vien_Phu_Trach | Ref → NhanVien | Nhân viên quản lý | |
| Muc_Do_Hop_Tac | Enum | Tốt / Trung bình / Khó / Chưa xác định | Đánh giá hợp tác |
| Ghi_Chu | LongText | Ghi chú thêm về chủ đất | |
| Trang_Thai | Enum | Đang hợp tác / Tạm dừng / Không hợp tác | Trạng thái |
| Ngay_Tao | DateTime | Ngày tạo hồ sơ | Auto timestamp |
| Ngay_Cap_Nhat | DateTime | Ngày cập nhật cuối | Auto timestamp |
| Nguoi_Tao | Ref → NhanVien | Người tạo hồ sơ | Auto: USEREMAIL() |
| Hinh_Anh_CCCD | Image | Ảnh CCCD/CMND | |
| File_HopDong | File | File hợp đồng ủy quyền | |

---

## 2. BẢNG LÔ ĐẤT (LoDat)

**Mô tả:** Lưu thông tin chi tiết từng lô đất/thửa đất

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| LoDat_ID | Text (Key) | Mã lô đất (tự sinh) | VD: LD-2024-001 |
| Ten_Lo_Dat | Text | Tên/mô tả lô đất | Bắt buộc |
| ChuDat_ID | Ref → ChuDat | Chủ sở hữu | Bắt buộc |
| Loai_Dat | Enum | Đất KCN / Đất kho xưởng / Đất thổ cư / Đất nông nghiệp chuyển đổi | |
| Ma_Thua | Text | Mã thửa đất | Theo sổ đỏ |
| Ma_To_Ban_Do | Text | Mã tờ bản đồ | |
| So_GCN | Text | Số giấy chứng nhận quyền sử dụng đất | |
| Dien_Tich_Tong | Decimal | Tổng diện tích (m²) | |
| Dien_Tich_Co_The_Xay | Decimal | Diện tích có thể xây dựng (m²) | |
| Mat_Tien | Decimal | Chiều rộng mặt tiền (m) | |
| Chieu_Sau | Decimal | Chiều sâu lô đất (m) | |
| Tinh_Thanh | Ref → DanhMuc_TinhThanh | Tỉnh/Thành phố | Bắt buộc |
| Quan_Huyen | Text | Quận/Huyện | |
| Xa_Phuong | Text | Xã/Phường | |
| Dia_Chi_Cu_The | LongText | Địa chỉ chi tiết | |
| Vi_Do | Decimal | Vĩ độ GPS | |
| Kinh_Do | Decimal | Kinh độ GPS | |
| Vi_Tri_Google_Maps | Text | Link Google Maps | |
| KCN_Gan_Nhat | Text | Khu công nghiệp gần nhất | |
| Khoang_Cach_KCN | Decimal | Khoảng cách đến KCN gần nhất (km) | |
| Duong_Vao | Enum | Đường nhựa / Đường đất / Đường bê tông | |
| Rong_Duong | Decimal | Rộng đường vào (m) | |
| Quy_Hoach | Enum | Đất KCN / Đất công nghiệp / Đất ở / Đất nông nghiệp / Chưa quy hoạch | |
| Trang_Thai_Phap_Ly | Enum | Sổ đỏ / Sổ hồng / Đang làm sổ / Không có sổ | |
| Tinh_Trang_Hien_Tai | Enum | Đất trống / Có công trình / Đang thuê / Đang sử dụng | |
| Gia_Mong_Muon | Currency | Giá chủ đất yêu cầu (VNĐ) | |
| Gia_Tham_Khao | Currency | Giá thị trường tham khảo (VNĐ) | |
| Don_Gia_M2 | Currency | Đơn giá/m² (VNĐ) | Tính tự động |
| Hinh_Thuc_Giao_Dich | EnumList | Bán / Cho thuê / Hợp tác đầu tư | Multi-select |
| Thoi_Gian_Co_The_Ban | Date | Thời điểm sẵn sàng giao dịch | |
| Trang_Thai_Lo_Dat | Enum | Đang tìm kiếm khách / Đang đàm phán / Đã có khách / Đã giao dịch / Tạm dừng | |
| Nhan_Vien_Phu_Trach | Ref → NhanVien | Nhân viên quản lý lô đất | |
| Tien_Ich_Xung_Quanh | EnumList | Điện / Nước / Internet / Cống thoát nước / Đường sắt / Cảng | |
| Mo_Ta_Chi_Tiet | LongText | Mô tả chi tiết lô đất | |
| Diem_Manh | LongText | Điểm mạnh của lô đất | |
| Diem_Yeu | LongText | Điểm yếu/hạn chế | |
| Hinh_Anh_1 | Image | Hình ảnh lô đất 1 | |
| Hinh_Anh_2 | Image | Hình ảnh lô đất 2 | |
| Hinh_Anh_3 | Image | Hình ảnh lô đất 3 | |
| Thu_Muc_Anh | File | Thư mục chứa ảnh (Google Drive link) | |
| File_So_Do | File | File sơ đồ/bản vẽ | |
| File_GCN | File | File giấy chứng nhận | |
| Ngay_Tiep_Nhan | Date | Ngày tiếp nhận thông tin | |
| Ngay_Tao | DateTime | Ngày tạo | Auto |
| Ngay_Cap_Nhat | DateTime | Ngày cập nhật | Auto |
| Nguoi_Tao | Ref → NhanVien | Người tạo | Auto |

---

## 3. BẢNG KHÁCH HÀNG TIỀM NĂNG (KhachHang)

**Mô tả:** Lưu thông tin khách hàng/nhà đầu tư quan tâm

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| KhachHang_ID | Text (Key) | Mã khách hàng | VD: KH-2024-001 |
| Ten_Cong_Ty | Text | Tên công ty/tổ chức | |
| Nguoi_Lien_He | Name | Người liên hệ chính | Bắt buộc |
| Chuc_Vu | Text | Chức vụ người liên hệ | |
| So_Dien_Thoai | Phone | Số điện thoại | Bắt buộc |
| Email | Email | Địa chỉ email | |
| Quoc_Tich | Text | Quốc tịch nhà đầu tư | |
| Linh_Vuc_SX | Text | Lĩnh vực sản xuất/kinh doanh | |
| Nhu_Cau | LongText | Nhu cầu cụ thể | |
| Dien_Tich_Can | Decimal | Diện tích cần tìm (m²) từ | |
| Dien_Tich_Den | Decimal | Diện tích cần tìm (m²) đến | |
| Ngan_Sach_Tu | Currency | Ngân sách tối thiểu | |
| Ngan_Sach_Den | Currency | Ngân sách tối đa | |
| Tinh_Thanh_Can | EnumList | Tỉnh/thành phố quan tâm | Multi-select |
| Hinh_Thuc_Can | EnumList | Mua / Thuê / Hợp tác | |
| Muc_Do_Uu_Tien | Enum | Hot / Warm / Cold | Phân loại |
| Nguon_Khach | Enum | Website / Facebook / Zalo / Giới thiệu / Hội thảo / Khác | |
| Nhan_Vien_Phu_Trach | Ref → NhanVien | Nhân viên phụ trách | |
| Trang_Thai | Enum | Mới / Đang tư vấn / Đang đàm phán / Đã chốt / Không thành | |
| Ghi_Chu | LongText | Ghi chú | |
| Ngay_Tao | DateTime | Ngày tạo | Auto |
| Ngay_Cap_Nhat | DateTime | Ngày cập nhật | Auto |

---

## 4. BẢNG PIPELINE BÁN HÀNG (Pipeline)

**Mô tả:** Theo dõi tiến trình giao dịch từng cơ hội bán hàng

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| Pipeline_ID | Text (Key) | Mã pipeline | VD: PL-2024-001 |
| LoDat_ID | Ref → LoDat | Lô đất liên quan | Bắt buộc |
| KhachHang_ID | Ref → KhachHang | Khách hàng | Bắt buộc |
| Ten_Co_Hoi | Text | Tên cơ hội bán hàng | |
| Giai_Doan | Enum | Tiếp cận / Giới thiệu / Khảo sát thực địa / Đàm phán / Ký HĐ đặt cọc / Ký HĐ chính thức / Hoàn tất | |
| So_Tien_Du_Kien | Currency | Giá trị giao dịch dự kiến | |
| So_Tien_Thuc_Te | Currency | Giá trị giao dịch thực tế | |
| Phan_Tram_Hoa_Hong | Decimal | % hoa hồng | |
| So_Tien_Hoa_Hong | Currency | Số tiền hoa hồng (tính tự động) | |
| Xac_Suat_Thanh_Cong | Percent | Xác suất thành công (%) | |
| Ngay_Bat_Dau | Date | Ngày bắt đầu pipeline | |
| Ngay_Muc_Tieu | Date | Ngày mục tiêu hoàn thành | |
| Ngay_Hoan_Thanh | Date | Ngày hoàn thành thực tế | |
| Nguyen_Nhan_That_Bai | LongText | Lý do thất bại (nếu có) | |
| Nhan_Vien_Kinh_Doanh | Ref → NhanVien | Nhân viên kinh doanh | |
| Truong_Nhom | Ref → NhanVien | Trưởng nhóm phụ trách | |
| Trang_Thai | Enum | Đang thực hiện / Thành công / Thất bại / Tạm hoãn | |
| Ghi_Chu | LongText | Ghi chú | |
| Ngay_Tao | DateTime | Ngày tạo | Auto |
| Ngay_Cap_Nhat | DateTime | Ngày cập nhật | Auto |

---

## 5. BẢNG LỊCH SỬ TƯƠNG TÁC (LichSuTuongTac)

**Mô tả:** Ghi lại mọi hoạt động tương tác với chủ đất và khách hàng

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| TuongTac_ID | Text (Key) | Mã tương tác | Auto |
| Loai_Doi_Tuong | Enum | Chủ đất / Khách hàng | |
| ChuDat_ID | Ref → ChuDat | Liên kết chủ đất | Điều kiện theo loại |
| KhachHang_ID | Ref → KhachHang | Liên kết khách hàng | Điều kiện theo loại |
| Pipeline_ID | Ref → Pipeline | Liên kết pipeline | |
| Loai_Tuong_Tac | Enum | Gọi điện / Nhắn tin Zalo / Email / Gặp mặt / Khảo sát thực địa / Hội thảo | |
| Ngay_Gio_TuongTac | DateTime | Thời điểm tương tác | Bắt buộc |
| Noi_Dung | LongText | Nội dung trao đổi | |
| Ket_Qua | Enum | Tích cực / Trung lập / Tiêu cực / Cần theo dõi thêm | |
| Buoc_Tiep_Theo | LongText | Hành động tiếp theo cần làm | |
| Ngay_Hen_Tiep | Date | Ngày hẹn tương tác tiếp theo | |
| Nhan_Vien | Ref → NhanVien | Nhân viên thực hiện | Auto |
| File_Dinh_Kem | File | File đính kèm | |
| Ngay_Tao | DateTime | Ngày tạo | Auto |

---

## 6. BẢNG GHI CHÚ CÔNG VIỆC / TASK (CongViec)

**Mô tả:** Quản lý công việc và nhắc nhở

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| CongViec_ID | Text (Key) | Mã công việc | Auto |
| Tieu_De | Text | Tiêu đề công việc | Bắt buộc |
| Mo_Ta | LongText | Mô tả chi tiết | |
| Loai_CongViec | Enum | Gọi điện / Gặp mặt / Khảo sát / Chuẩn bị tài liệu / Theo dõi hồ sơ / Khác | |
| Doi_Tuong_Lien_Quan | Enum | Chủ đất / Khách hàng / Lô đất / Pipeline | |
| ChuDat_ID | Ref → ChuDat | Liên kết chủ đất | |
| KhachHang_ID | Ref → KhachHang | Liên kết khách hàng | |
| LoDat_ID | Ref → LoDat | Liên kết lô đất | |
| Pipeline_ID | Ref → Pipeline | Liên kết pipeline | |
| Nguoi_Thuc_Hien | Ref → NhanVien | Người được giao việc | |
| Nguoi_Giao | Ref → NhanVien | Người giao việc | Auto |
| Han_Hoan_Thanh | DateTime | Hạn hoàn thành | |
| Muc_Do_Uu_Tien | Enum | Khẩn cấp / Cao / Trung bình / Thấp | |
| Trang_Thai | Enum | Chưa bắt đầu / Đang thực hiện / Hoàn thành / Hủy | |
| Ghi_Chu | LongText | Ghi chú | |
| Ngay_Tao | DateTime | Ngày tạo | Auto |
| Ngay_Hoan_Thanh_TT | DateTime | Ngày hoàn thành thực tế | |

---

## 7. BẢNG NHÂN VIÊN (NhanVien)

**Mô tả:** Thông tin nhân viên sử dụng hệ thống

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| NhanVien_ID | Text (Key) | Mã nhân viên | |
| Ho_Ten | Name | Họ và tên | Bắt buộc |
| Email | Email | Email đăng nhập AppSheet | Bắt buộc, unique |
| So_Dien_Thoai | Phone | Số điện thoại | |
| Chuc_Vu | Enum | Giám đốc / Trưởng phòng / Nhân viên KD / Nhân viên hỗ trợ | |
| Phong_Ban | Text | Phòng ban | |
| Vung_Phu_Trach | EnumList | Danh sách tỉnh phụ trách | |
| Truong_Nhom | Ref → NhanVien | Trưởng nhóm quản lý | |
| Role | Enum | Admin / Manager / Sales / Viewer | Phân quyền |
| Trang_Thai | Enum | Đang làm việc / Nghỉ phép / Đã nghỉ việc | |
| Ngay_Bat_Dau | Date | Ngày bắt đầu làm việc | |
| Avatar | Image | Ảnh đại diện | |

---

## 8. BẢNG DANH MỤC TỈNH THÀNH (DanhMuc_TinhThanh)

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả |
|---|---|---|
| TinhThanh_ID | Text (Key) | Mã tỉnh/thành |
| Ten_TinhThanh | Text | Tên tỉnh/thành |
| Vung_Kinh_Te | Enum | Miền Bắc / Miền Trung / Miền Nam / Tây Nguyên |
| Co_KCN | Yes/No | Có khu công nghiệp không |
| So_KCN | Number | Số lượng KCN trong tỉnh |

---

## 9. BẢNG KHU CÔNG NGHIỆP (KhuCongNghiep)

**Mô tả:** Thông tin các KCN tham chiếu

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| KCN_ID | Text (Key) | Mã KCN | |
| Ten_KCN | Text | Tên khu công nghiệp | |
| Tinh_Thanh | Ref → DanhMuc_TinhThanh | Tỉnh/thành | |
| Dien_Tich_KCN | Decimal | Tổng diện tích (ha) | |
| Ti_Le_Lap_Day | Percent | Tỷ lệ lấp đầy (%) | |
| Don_Vi_Quan_Ly | Text | Đơn vị quản lý | |
| Nam_Thanh_Lap | Number | Năm thành lập | |
| Nganh_Nghe_UuTien | LongText | Ngành nghề ưu tiên | |
| Gia_Thue_Dat | Currency | Giá thuê đất (USD/m²/kỳ) | |
| Vi_Do | Decimal | Vĩ độ | |
| Kinh_Do | Decimal | Kinh độ | |
| Trang_Thai | Enum | Đang hoạt động / Quy hoạch / Đang xây dựng | |
| Ghi_Chu | LongText | Ghi chú | |

---

## 10. BẢNG BÁO CÁO ĐỊNH GIÁ (DinhGia)

**Mô tả:** Lưu lịch sử định giá cho từng lô đất

| Tên Cột | Kiểu Dữ Liệu AppSheet | Mô tả | Ghi chú |
|---|---|---|---|
| DinhGia_ID | Text (Key) | Mã định giá | |
| LoDat_ID | Ref → LoDat | Lô đất | Bắt buộc |
| Ngay_DinhGia | Date | Ngày định giá | |
| Nguoi_DinhGia | Ref → NhanVien | Người định giá | |
| Gia_DinhGia_Thap | Currency | Giá định giá thấp nhất | |
| Gia_DinhGia_TB | Currency | Giá định giá trung bình | |
| Gia_DinhGia_Cao | Currency | Giá định giá cao nhất | |
| Phuong_Phap | Enum | So sánh thị trường / Thu nhập / Chi phí / Kết hợp | |
| Tai_San_So_Sanh | LongText | Tài sản so sánh tham chiếu | |
| Nhan_Xet | LongText | Nhận xét định giá | |
| File_BaoCao | File | File báo cáo định giá | |

---

## Sơ Đồ Quan Hệ (ERD Summary)

```
NhanVien (1) ←——→ (N) ChuDat
NhanVien (1) ←——→ (N) LoDat
NhanVien (1) ←——→ (N) KhachHang
NhanVien (1) ←——→ (N) Pipeline
NhanVien (1) ←——→ (N) CongViec
NhanVien (1) ←——→ (N) LichSuTuongTac

ChuDat (1) ←——→ (N) LoDat
ChuDat (1) ←——→ (N) LichSuTuongTac

LoDat (1) ←——→ (N) Pipeline
LoDat (1) ←——→ (N) DinhGia

KhachHang (1) ←——→ (N) Pipeline
KhachHang (1) ←——→ (N) LichSuTuongTac

Pipeline (1) ←——→ (N) LichSuTuongTac
Pipeline (1) ←——→ (N) CongViec

DanhMuc_TinhThanh (1) ←——→ (N) ChuDat
DanhMuc_TinhThanh (1) ←——→ (N) LoDat
DanhMuc_TinhThanh (1) ←——→ (N) KCN

KCN (1) ←——→ (N) LoDat [tham chiếu gần nhất]
```

---

## Cấu Hình AppSheet Đề Xuất

### Views (Màn hình hiển thị)

| View | Loại | Bảng | Mô tả |
|---|---|---|---|
| Dashboard | Dashboard | Tổng hợp | Tổng quan KPI |
| Danh sách Lô đất | Gallery / Deck | LoDat | Hiển thị dạng card |
| Bản đồ Lô đất | Map | LoDat | Hiển thị vị trí GPS |
| Chi tiết Lô đất | Detail | LoDat | Thông tin đầy đủ |
| Danh sách Chủ đất | Table | ChuDat | Danh sách dạng bảng |
| Pipeline Kanban | Kanban | Pipeline | Theo dõi giai đoạn |
| Lịch công việc | Calendar | CongViec | Nhắc nhở theo ngày |
| Khách hàng | Table | KhachHang | Quản lý CRM |
| Báo cáo | Chart | Tổng hợp | Biểu đồ thống kê |

### Automations (Tự động hóa)

1. **Nhắc nhở công việc:** Gửi email/notification khi đến hạn CongViec
2. **Cập nhật trạng thái lô đất:** Tự động cập nhật Trang_Thai_Lo_Dat khi Pipeline thay đổi
3. **Thông báo pipeline mới:** Notify trưởng nhóm khi có pipeline mới được tạo
4. **Báo cáo tuần:** Tự động gửi báo cáo tổng hợp mỗi thứ 6
5. **Nhắc hạn follow-up:** Gửi nhắc khi đến ngày Ngay_Hen_Tiep trong LichSuTuongTac

### Security Filters (Phân quyền dữ liệu)

| Role | Quyền truy cập |
|---|---|
| Admin | Toàn quyền tất cả dữ liệu |
| Manager | Xem tất cả, sửa trong phạm vi vùng |
| Sales | Chỉ xem và sửa dữ liệu do mình phụ trách |
| Viewer | Chỉ xem, không sửa |

**Security Filter cho Sales:**
```
[Nhan_Vien_Phu_Trach] = USEREMAIL()
```

---

## Computed Columns (Cột Tính Toán)

| Bảng | Cột | Công thức AppSheet |
|---|---|---|
| LoDat | Don_Gia_M2 | [Gia_Mong_Muon] / [Dien_Tich_Tong] |
| Pipeline | So_Tien_Hoa_Hong | [So_Tien_Thuc_Te] * [Phan_Tram_Hoa_Hong] / 100 |
| Pipeline | So_Ngay_Mo | TODAY() - [Ngay_Bat_Dau] |
| ChuDat | So_Lo_Dat | COUNT(LoDat[ChuDat_ID] = [ChuDat_ID]) |
| KhachHang | So_Pipeline | COUNT(Pipeline[KhachHang_ID] = [KhachHang_ID]) |

---

## Lưu Ý Triển Khai

1. **Google Sheets làm backend:** Mỗi bảng là một sheet trong cùng một Google Spreadsheet hoặc nhiều file riêng tùy quy mô.
2. **ID Generation:** Sử dụng UNIQUEID() hoặc công thức ghép ngày tháng + số thứ tự để tạo mã tự động.
3. **Image/File Storage:** Sử dụng Google Drive làm nơi lưu ảnh và file, AppSheet tự động link.
4. **Offline Mode:** Bật chế độ offline cho nhân viên làm việc thực địa.
5. **Performance:** Giới hạn mỗi sheet khoảng 5,000-10,000 dòng để AppSheet hoạt động mượt mà; nếu dữ liệu lớn hơn, cân nhắc dùng Google Cloud SQL hoặc Firestore.
