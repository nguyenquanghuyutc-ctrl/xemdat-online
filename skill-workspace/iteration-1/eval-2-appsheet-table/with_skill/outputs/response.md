# Thiết Kế Database AppSheet — Hệ Thống Quản Lý Nguồn Đất BĐS Công Nghiệp

---

## 1. PHÂN TÍCH NGHIỆP VỤ

**Bài toán cốt lõi:**
Hệ thống cần quản lý vòng đời đầy đủ của một lô đất công nghiệp: từ lúc chủ đất muốn bán → sale tiếp nhận → giao bán cho khách → đàm phán → chốt → thanh toán. Ba thực thể trung tâm là **Chủ Đất**, **Lô Đất (Nguồn Đất)**, và **Pipeline Sale**.

**Pain point thường gặp nếu không có hệ thống:**
- Sale lưu thông tin chủ đất rải rác trong điện thoại, Zalo, Excel — không ai biết lô đất nào đang được giao bán
- Không có tracking: khách quan tâm lô nào, đang ở stage nào, ai đang xử lý
- Kế toán không biết giao dịch nào đã chốt để soạn hợp đồng
- Giám đốc không có dashboard để thấy toàn cảnh danh mục

---

## 2. TỔNG QUAN KIẾN TRÚC DATABASE

Hệ thống gồm **6 bảng chính** chia làm 3 nhóm:

```
Nhóm 1 — Tài sản & Chủ sở hữu:
  CHU_DAT ← NGUON_DAT

Nhóm 2 — Khách hàng & Pipeline:
  KHACH_HANG ← PIPELINE_SALE → NGUON_DAT

Nhóm 3 — Giao dịch & Kế toán:
  PIPELINE_SALE ← GIAO_DICH ← THANH_TOAN
```

---

## 3. CẤU TRÚC CÁC BẢNG (TABLE STRUCTURE)

### BẢNG 1: CHU_DAT — Hồ sơ chủ đất

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_ChuDat** | Text (Key) | Yes | Auto format: CD-001, CD-002... |
| Ho_Ten | Text | Yes | Họ tên đầy đủ |
| SDT | Phone | Yes | Số điện thoại chính |
| SDT_Phu | Phone | No | Số phụ / Zalo |
| Email | Email | No | |
| DiaChi | Text | No | Địa chỉ liên hệ |
| LoaiGiayTo | Enum | Yes | CMND / CCCD / Hộ chiếu / Doanh nghiệp |
| SoGiayTo | Text | Yes | Số CMND/CCCD/MST |
| NguonTiepCan | Enum | Yes | Referral / Cold call / Mạng XH / Giới thiệu nội bộ |
| Sale_PhuTrach | Ref → NHAN_SU | Yes | Sale tiếp nhận chủ đất |
| Status | Enum | Yes | Tiềm năng / Đang hợp tác / Ngưng hợp tác |
| Ngay_TiepNhan | Date | Yes | Ngày sale lấy thông tin |
| LichSu_LienHe | LongText | No | Ghi chú lịch sử trao đổi |
| Anh_GiayTo | Image | No | Chụp CMND/CCCD |

**Key column:** ID_ChuDat
**Display name:** Ho_Ten

---

### BẢNG 2: NGUON_DAT — Thông tin lô đất

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_Nguon** | Text (Key) | Yes | Auto format: ND-2024-001 |
| Ten_LoiDat | Text | Yes | Tên gọi nội bộ (VD: "Đất KCN Bình Dương 5ha") |
| ChuDat_Ref | Ref → CHU_DAT | Yes | Liên kết chủ đất |
| DienTich_m2 | Decimal | Yes | Diện tích m² |
| DienTich_Ha | Formula | — | `=[DienTich_m2]/10000` — tự tính |
| GiaBan_Ty | Decimal | Yes | Giá chủ đất chào bán (tỷ VNĐ) |
| GiaThietLap_Ty | Decimal | No | Giá thấp nhất chủ đất chấp nhận (nội bộ) |
| GiaDauRa_Ty | Decimal | No | Giá sale đưa ra thị trường |
| HoaHong_Pct | Decimal | No | % hoa hồng sale (nếu thỏa thuận) |
| Tinh_ThanhPho | Enum | Yes | Hà Nội / TP.HCM / Bình Dương / Đồng Nai / Long An / Hải Phòng / Khác |
| Huyen_Quan | Text | Yes | Huyện / Quận |
| DiaChi_DayDu | Text | No | Địa chỉ chi tiết |
| ViTri_GPS | LatLong | No | Tọa độ bản đồ |
| TenKhuCongNghiep | Text | No | Tên KCN lân cận hoặc thuộc KCN |
| MucDichSuDung | Enum | Yes | Đất KCN / Nhà xưởng / Kho bãi / Đất ở công nghiệp / Đất nông nghiệp chuyển đổi |
| TinhTrang_PhapLy | Enum | Yes | Sổ đỏ đầy đủ / Sổ hồng / Chờ cấp sổ / Đang giải phóng mặt bằng / Tranh chấp |
| TinhTrang_VatLy | Enum | Yes | Đất trống / Có công trình / Đang cho thuê / Đang xây dựng |
| HaTang_KetNoi | LongText | No | Mô tả hạ tầng (điện, nước, đường, cảng...) |
| Sale_PhuTrach | Ref → NHAN_SU | Yes | Sale được phân công giao bán |
| Status | Enum | Yes | Mới tiếp nhận / Đang giao bán / Đang đàm phán / Đã chốt / Ngừng bán / Chờ pháp lý |
| Ngay_TiepNhan | Date | Yes | Ngày lấy thông tin từ chủ đất |
| Ngay_CapNhat | DateTime | Auto | Tự cập nhật khi có thay đổi |
| Anh_TongQuan | ImageList | No | Ảnh lô đất (tối đa 10 ảnh) |
| FilePapLy | File | No | File pháp lý đính kèm (PDF) |
| Ghi_Chu | LongText | No | Ghi chú nội bộ |

**Key column:** ID_Nguon
**Display name:** Ten_LoiDat

**Enum Status — luồng chuyển trạng thái:**
```
Mới tiếp nhận → Đang giao bán → Đang đàm phán → Đã chốt
                                                 → Ngừng bán (chủ đất rút)
                              → Chờ pháp lý (tạm dừng)
```

---

### BẢNG 3: KHACH_HANG — CRM khách mua

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_KH** | Text (Key) | Yes | Auto: KH-001 |
| Ten_KH | Text | Yes | Tên cá nhân hoặc công ty |
| NguoiDaiDien | Text | No | Nếu là doanh nghiệp |
| SDT | Phone | Yes | |
| Email | Email | No | |
| LoaiKH | Enum | Yes | Cá nhân / Doanh nghiệp trong nước / FDI |
| NguonKH | Enum | Yes | Referral / Marketing online / Cold call / Website / Hội thảo |
| NhuCau_DienTich | Text | No | VD: "2-5 ha" |
| NhuCau_ViTri | Text | No | VD: "Bình Dương hoặc Đồng Nai" |
| NhuCau_MucDich | Text | No | VD: "Xây nhà máy sản xuất linh kiện điện tử" |
| NganSach_Ty | Decimal | No | Ngân sách tối đa |
| ThoiGian_CanMua | Enum | No | Ngay / 1-3 tháng / 3-6 tháng / Linh hoạt |
| Sale_PhuTrach | Ref → NHAN_SU | Yes | |
| Status | Enum | Yes | Lead mới / Đang tư vấn / Tiềm năng cao / Ngưng theo đuổi |
| Ngay_TiepNhan | Date | Yes | |
| LichSu_TuongTac | LongText | No | Ghi chú các buổi gặp, trao đổi |

**Key column:** ID_KH
**Display name:** Ten_KH

---

### BẢNG 4: PIPELINE_SALE — Theo dõi giao dịch

Đây là bảng trung tâm, kết nối Khách Hàng ↔ Nguồn Đất và tracking toàn bộ quá trình đàm phán.

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_Pipeline** | Text (Key) | Yes | Auto: PL-2024-001 |
| KH_Ref | Ref → KHACH_HANG | Yes | Khách đang quan tâm |
| Dat_Ref | Ref → NGUON_DAT | Yes | Lô đất đang xem xét |
| Sale_Ref | Ref → NHAN_SU | Yes | Sale đang xử lý deal này |
| Stage | Enum | Yes | Quan tâm / Đang tư vấn / Đã xem thực địa / Đang đàm phán / Chờ quyết định / Chốt / Rớt |
| LyDo_Rot | Text | No | Bắt buộc điền nếu Stage = "Rớt" |
| GiaDeXuat_Ty | Decimal | No | Giá sale đề xuất với khách |
| GiaDamPhan_Ty | Decimal | No | Giá đang đàm phán |
| XacSuat_Chot | Enum | Yes | 10% / 25% / 50% / 75% / 90% / 100% |
| GiaTriDuKien_Ty | Formula | — | `=[GiaDamPhan_Ty] * IF([XacSuat_Chot]="10%",0.1,IF([XacSuat_Chot]="25%",0.25,...))` |
| Ngay_TiepCan | Date | Yes | Ngày đầu tiên khách quan tâm lô này |
| Ngay_XemThucDia | Date | No | |
| Ngay_DuKien_Chot | Date | No | Dự kiến chốt deal |
| Ngay_CapNhat | DateTime | Auto | Tự cập nhật |
| Ghi_Chu | LongText | No | Diễn biến đàm phán, yêu cầu đặc biệt |

**Key column:** ID_Pipeline
**Display name:** Công thức `=[ID_Pipeline] & " | " & [KH_Ref] & " — " & [Dat_Ref]`

**Enum Stage — Pipeline Funnel:**
```
Quan tâm (10%)
   → Đang tư vấn (25%)
      → Đã xem thực địa (50%)
         → Đang đàm phán (75%)
            → Chờ quyết định (90%)
               → Chốt (100%) ✓
               → Rớt ✗
```

---

### BẢNG 5: GIAO_DICH — Hợp đồng

Bảng này chỉ được tạo khi Pipeline Stage = "Chốt".

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_GiaoDich** | Text (Key) | Yes | Auto: GD-2024-001 |
| Pipeline_Ref | Ref → PIPELINE_SALE | Yes | Link về pipeline gốc |
| GiaTriHopDong_Ty | Decimal | Yes | Giá trị hợp đồng chính thức |
| HoaHong_Sale_Ty | Decimal | No | Hoa hồng sale được nhận |
| Ngay_KyHopDong | Date | No | |
| SoHopDong | Text | No | Số HĐ do kế toán đánh |
| TrangThai_HopDong | Enum | Yes | Soạn thảo / Đã ký / Đang thanh toán / Hoàn tất / Hủy |
| KeToan_PhuTrach | Ref → NHAN_SU | Yes | Kế toán xử lý hợp đồng này |
| TongTienDaThu_Ty | Formula | — | `=SUM(SELECT(THANH_TOAN[SoTien_Ty], [GiaoDich_Ref]=[ID_GiaoDich], [TrangThai]="Đã nhận"))` |
| ConLai_PhamThu_Ty | Formula | — | `=[GiaTriHopDong_Ty] - [TongTienDaThu_Ty]` |
| PhanTram_DaThu | Formula | — | `=([TongTienDaThu_Ty] / [GiaTriHopDong_Ty]) * 100` |
| File_HopDong | File | No | Upload PDF hợp đồng ký |
| Ghi_Chu | LongText | No | |

---

### BẢNG 6: THANH_TOAN — Đợt thanh toán

| Column | Type | Required | Ghi chú |
|---|---|---|---|
| **ID_ThanhToan** | Text (Key) | Yes | Auto: TT-2024-001 |
| GiaoDich_Ref | Ref → GIAO_DICH | Yes | Thuộc hợp đồng nào |
| Dot_ThanhToan | Number | Yes | Đợt 1, 2, 3... |
| TenDot | Text | No | VD: "Đặt cọc", "Thanh toán lần 1", "Thanh toán cuối" |
| SoTien_Ty | Decimal | Yes | Số tiền đợt này |
| NgayDuKien | Date | Yes | Ngày dự kiến nhận tiền |
| NgayThucNhan | Date | No | Để trống nếu chưa nhận |
| TrangThai | Enum | Yes | Chưa đến hạn / Đến hạn / Đã nhận / Trễ hạn |
| HinhThuc_ThanhToan | Enum | No | Chuyển khoản / Tiền mặt / Séc |
| SoTaiKhoan | Text | No | TK nhận tiền |
| FileMinhChung | File | No | Upload ảnh/PDF sao kê |
| GhiChu | LongText | No | |

---

## 4. SƠ ĐỒ QUAN HỆ (RELATIONSHIPS)

```
NHAN_SU (bảng nhân sự — parent)
   ├── CHU_DAT.Sale_PhuTrach  (Ref)
   ├── NGUON_DAT.Sale_PhuTrach (Ref)
   ├── KHACH_HANG.Sale_PhuTrach (Ref)
   ├── PIPELINE_SALE.Sale_Ref  (Ref)
   └── GIAO_DICH.KeToan_PhuTrach (Ref)

CHU_DAT (parent)
   └── NGUON_DAT.ChuDat_Ref [1 chủ đất → nhiều lô đất]

NGUON_DAT (parent)
   └── PIPELINE_SALE.Dat_Ref [1 lô đất → nhiều pipeline]

KHACH_HANG (parent)
   └── PIPELINE_SALE.KH_Ref [1 khách → nhiều pipeline]

PIPELINE_SALE (parent)
   └── GIAO_DICH.Pipeline_Ref [1 pipeline → 1 giao dịch]

GIAO_DICH (parent)
   └── THANH_TOAN.GiaoDich_Ref [1 hợp đồng → nhiều đợt thanh toán]
```

**Cascade rules:**
- Xóa CHU_DAT → Cảnh báo (không xóa cascade, vì còn NGUON_DAT liên quan)
- Xóa NGUON_DAT → Block nếu có PIPELINE_SALE đang active
- Xóa PIPELINE_SALE → Block nếu Stage = "Chốt" và đã có GIAO_DICH
- Xóa GIAO_DICH → Block nếu có THANH_TOAN đã nhận tiền

---

## 5. AUTOMATION & WORKFLOW

### Auto 1: Cảnh báo chủ đất sắp hết hạn hợp tác
```
Trigger: Scheduled — 8:00 sáng hàng ngày
Condition: [Status]="Đang hợp tác" AND DATEDIF([Ngay_TiepNhan], TODAY(), "D") > 90
Action: Notify Sale_PhuTrach
Message: "Chủ đất [Ho_Ten] — đã 90+ ngày chưa cập nhật. Cần liên hệ lại."
```

### Auto 2: Tự động cập nhật status nguồn đất khi pipeline chốt
```
Trigger: Khi PIPELINE_SALE.[Stage] thay đổi = "Chốt"
Action: Set row value → NGUON_DAT.[Status] = "Đã chốt"
Action: Notify Manager — "Chốt deal: [Ten_LoiDat] - Khách: [KH_Ref]"
```

### Auto 3: Tạo giao dịch tự động khi pipeline chốt
```
Trigger: Khi PIPELINE_SALE.[Stage] thay đổi = "Chốt"
Action: Add row → GIAO_DICH
  GiaTriHopDong_Ty = [GiaDamPhan_Ty]
  Pipeline_Ref = [ID_Pipeline]
  TrangThai_HopDong = "Soạn thảo"
Action: Notify KeToan — "Có hợp đồng mới cần soạn: [ID_GiaoDich]"
```

### Auto 4: Cảnh báo thanh toán sắp đến hạn
```
Trigger: Scheduled — 8:00 sáng hàng ngày
Condition: [NgayDuKien] <= TODAY() + 3 AND [TrangThai] = "Chưa đến hạn"
Action: Send email → KeToan + Manager
Subject: "⚠ Đợt thanh toán [TenDot] — [GiaoDich_Ref] sắp đến hạn"
```

### Auto 5: Tự động đánh dấu thanh toán trễ hạn
```
Trigger: Scheduled — 7:00 sáng hàng ngày
Condition: [NgayDuKien] < TODAY() AND [TrangThai] <> "Đã nhận"
Action: Set row value → [TrangThai] = "Trễ hạn"
Action: Notify KeToan + Manager
```

### Auto 6: Pipeline không cập nhật quá 7 ngày
```
Trigger: Scheduled — mỗi thứ Hai 9:00 sáng
Condition: [Stage] NOT IN ("Chốt","Rớt") AND DATEDIF([Ngay_CapNhat], NOW(), "D") > 7
Action: Notify Sale_Ref — "Deal [ID_Pipeline] chưa cập nhật 7 ngày. Vui lòng cập nhật tiến độ."
```

---

## 6. SECURITY FILTER (PHÂN QUYỀN)

### Sale thường
```
NGUON_DAT:    [Sale_PhuTrach] = USEREMAIL()
KHACH_HANG:   [Sale_PhuTrach] = USEREMAIL()
PIPELINE_SALE: [Sale_Ref] = USEREMAIL()
CHU_DAT:      IN([ID_ChuDat], SELECT(NGUON_DAT[ChuDat_Ref], [Sale_PhuTrach]=USEREMAIL()))
GIAO_DICH:    FALSE  (sale không xem được hợp đồng)
THANH_TOAN:   FALSE  (sale không xem được thanh toán)
```

### Kế toán
```
GIAO_DICH:    [TrangThai_HopDong] <> "Soạn thảo"  — chỉ thấy HĐ đã ký
THANH_TOAN:   IN([GiaoDich_Ref], SELECT(GIAO_DICH[ID_GiaoDich], TRUE))
NGUON_DAT:    TRUE  (xem được tất cả để đối chiếu)
PIPELINE_SALE: [Stage] = "Chốt"  — kế toán chỉ thấy deal đã chốt
```

### Sales Manager
```
Tất cả bảng: TRUE  (xem toàn bộ)
Có quyền edit tất cả record trong team
```

### Giám đốc
```
Tất cả bảng: TRUE  (read-only trên hầu hết)
Chỉ xem Dashboard, không edit trực tiếp
```

---

## 7. UX VIEWS CHO MOBILE

### NGUON_DAT Views
- **Gallery/Deck view** (default mobile): Hiển thị ảnh lô đất + tên + diện tích + giá + status badge
- **Map view**: Tất cả lô đất trên bản đồ, màu theo status (xanh=đang bán, đỏ=đã chốt)
- **Table view**: Dạng danh sách lọc nhanh theo Status, Tỉnh, Sale
- **Detail view**: Thông tin đầy đủ + Related pipelines + Related documents
- **Form — Nhập nguồn đất mới**: Tối ưu mobile, có dropdowns, date picker, camera upload ảnh

### PIPELINE_SALE Views
- **Kanban/Deck view**: Cột theo Stage, kéo thả để đổi stage
- **Table view**: Filter theo Sale, Stage, Ngày cập nhật
- **Detail view**: Lịch sử cập nhật, nút "Chuyển stage" prominent

### Dashboard (Manager/Giám đốc)
- Số nguồn đất theo Status (Pie chart)
- Pipeline funnel (Bar chart theo Stage)
- Tổng giá trị deals đang đàm phán (số lớn hiển thị nổi bật)
- Top 5 sale theo số deal / giá trị
- Cảnh báo thanh toán trễ hạn (Deck view đỏ)

---

## 8. VALIDATION RULES QUAN TRỌNG

| Bảng | Column | Rule |
|---|---|---|
| NGUON_DAT | GiaBan_Ty | > 0 |
| NGUON_DAT | DienTich_m2 | > 0 |
| NGUON_DAT | Ngay_TiepNhan | <= TODAY() |
| PIPELINE_SALE | LyDo_Rot | Required nếu Stage = "Rớt" |
| PIPELINE_SALE | GiaDamPhan_Ty | <= GiaBan gốc * 1.5 (cảnh báo nếu vượt) |
| THANH_TOAN | NgayThucNhan | >= NgayDuKien - 30 days |
| THANH_TOAN | SoTien_Ty | > 0 |
| GIAO_DICH | GiaTriHopDong_Ty | > 0 |

---

## 9. LƯU Ý KHI TRIỂN KHAI

**Bắt buộc làm ngay từ đầu:**
1. Tạo bảng NHAN_SU trước — đây là bảng lookup cho tất cả Ref nhân sự
2. Thiết lập Security Filter từ ngày đầu, không để "dọn dẹp sau" — rất khó fix retroactive
3. Dùng App formula cho ID auto-increment ngay từ đầu: `="ND-" & TEXT(YEAR(TODAY()),"0000") & "-" & RIGHT("000"&ROW(),3)`
4. Không để trống Required columns — AppSheet sẽ cho lưu nhưng báo cáo sẽ bị lỗi sau

**Rủi ro cần tránh:**
- Đừng dùng Free text cho Status/Stage — phải là Enum để filter/chart hoạt động
- GPS LatLong: Sale phải bật location permission, hướng dẫn kỹ khi training
- File/Image: Cần Google Drive có đủ dung lượng và cấu trúc folder rõ ràng
- Công thức SUM trong GIAO_DICH: AppSheet tính lại real-time, chú ý performance nếu > 1000 rows

**Thứ tự build:**
```
Tuần 1: CHU_DAT + NGUON_DAT + NHAN_SU + Security Filter cơ bản
Tuần 2: KHACH_HANG + PIPELINE_SALE + Views mobile
Tuần 3: GIAO_DICH + THANH_TOAN + Automation
Tuần 4: Dashboard + Training sale + Go-live
```
