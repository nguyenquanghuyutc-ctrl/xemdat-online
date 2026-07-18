# Thiết kế Module Pipeline Sale — Hệ thống Quản lý Giao dịch BĐS Công Nghiệp

---

## 1. PHÂN TÍCH NGHIỆP VỤ — BÀI TOÁN ĐANG GẶP

**Pain point chính:**
- Sale không cập nhật trạng thái deal → manager mù thông tin, không thể can thiệp kịp thời
- Không biết deal nào đang ở bước nào → không ưu tiên được effort, bỏ sót deal nóng
- Thiếu reminder → deal "chết" im lặng không ai hay

**Nguyên nhân gốc rễ (thường gặp):**
1. Cập nhật status quá nhiều thao tác → sale lười làm
2. App không nhắc nhở → sale quên
3. Không có áp lực hiển thị → deal rớt không ai thấy

**Giải pháp cốt lõi:** Thiết kế Pipeline cực kỳ đơn giản để cập nhật < 30 giây, kết hợp automation nhắc nhở và dashboard visible cho manager.

---

## 2. ĐỀ XUẤT GIẢI PHÁP — CẤU TRÚC MODULE PIPELINE SALE

### 2.1 Table Structure — Bảng PIPELINE_SALE

| Column | Type | Ghi chú |
|---|---|---|
| ID_Pipeline | Text (Key) | Auto-generate: PL-[YEAR]-[###] |
| KH_Ref | Ref → KHACH_HANG | Khách hàng đang theo dõi |
| Dat_Ref | Ref → NGUON_DAT | Lô đất đang tư vấn |
| Sale_Ref | Ref → NHAN_SU | Sale phụ trách |
| Stage | Enum | Quan tâm / Tư vấn / Xem thực địa / Đàm phán / Chờ quyết định / Chốt / Rớt |
| XacSuat_Chot | Enum | 10% / 25% / 50% / 75% / 90% |
| GiaDeXuat_Ty | Decimal | Giá đề xuất cho khách (tỷ đồng) |
| Ngay_TiepCan | Date | Ngày đầu tiên liên hệ |
| Ngay_CapNhat | DateTime | Auto = NOW() khi có thay đổi |
| Ngay_HenTiepTheo | Date | Sale tự set — trigger reminder |
| LyDo_Rot | Text | Bắt buộc điền khi Stage = "Rớt" |
| Ghi_Chu | LongText | Ghi chú nội dung tư vấn, đàm phán |
| Days_In_Stage | Number | =TODAY() - [Ngay_CapNhat] (tính ngày ì) |

**Công thức Auto-ID:**
```
"PL-" & YEAR(TODAY()) & "-" & TEXT(ROW(), "000")
```

**Công thức Days_In_Stage (phát hiện deal ì):**
```
IF(OR([Stage]="Chốt", [Stage]="Rớt"), 0, DATEDIF([Ngay_CapNhat], TODAY(), "D"))
```

---

### 2.2 Relationships (Ref)

```
KHACH_HANG (1) ──→ PIPELINE_SALE (nhiều)
NGUON_DAT  (1) ──→ PIPELINE_SALE (nhiều)
NHAN_SU    (1) ──→ PIPELINE_SALE (nhiều)
PIPELINE_SALE (1) ──→ GIAO_DICH (1) [khi Stage = "Chốt"]
```

- Một khách hàng có thể có nhiều pipeline (xem nhiều lô đất khác nhau)
- Một lô đất có thể có nhiều pipeline (nhiều khách quan tâm cùng lúc)
- Khi Stage chuyển "Chốt" → tự động tạo row trong GIAO_DICH

---

### 2.3 Enum Status Chuẩn — Pipeline Stage

| Stage | Ý nghĩa | Xác suất chốt mặc định |
|---|---|---|
| Quan tâm | Khách hỏi thông tin, chưa xem thực địa | 10% |
| Tư vấn | Đang tư vấn chi tiết, gửi hồ sơ | 25% |
| Xem thực địa | Đã hẹn/đã đi xem đất | 50% |
| Đàm phán | Đang thương lượng giá, điều khoản | 75% |
| Chờ quyết định | Khách nội bộ họp/báo cáo lãnh đạo | 75% |
| Chốt | Deal thành công → chuyển sang Giao Dịch | 100% |
| Rớt | Deal thất bại — bắt buộc điền LyDo_Rot | 0% |

---

### 2.4 Automation & Workflow

#### Automation 1: Nhắc sale cập nhật deal bị ì
```
Trigger:   Scheduled — mỗi ngày 8:30 sáng
Condition: [Days_In_Stage] >= 3
           AND NOT(OR([Stage]="Chốt", [Stage]="Rớt"))
Action:    Send notification → [Sale_Ref].[Email]
Body:      "⚠️ Deal [ID_Pipeline] - [KH_Ref].[Ten_KH] đã " 
           & [Days_In_Stage] & " ngày chưa cập nhật. Kiểm tra ngay!"
```

#### Automation 2: Nhắc lịch hẹn tiếp theo
```
Trigger:   Scheduled — mỗi ngày 7:00 sáng
Condition: [Ngay_HenTiepTheo] = TODAY()
           AND NOT(OR([Stage]="Chốt", [Stage]="Rớt"))
Action:    Send notification → [Sale_Ref].[Email]
Body:      "📅 Hôm nay có hẹn với [KH_Ref].[Ten_KH] 
           (Deal: [ID_Pipeline]). Chuẩn bị tốt!"
```

#### Automation 3: Tự động tạo Giao Dịch khi Chốt
```
Trigger:   On change — khi [Stage] thay đổi
Condition: [Stage] = "Chốt"
Action 1:  Add row → GIAO_DICH
           - Pipeline_Ref = [ID_Pipeline]
           - GiaTriHopDong_Ty = [GiaDeXuat_Ty]
           - TrangThai_HopDong = "Soạn thảo"
Action 2:  Send notification → Manager + Kế toán
           Body: "🎉 Deal mới chốt: [ID_Pipeline] 
                 Khách: [KH_Ref].[Ten_KH]
                 Giá: [GiaDeXuat_Ty] tỷ
                 Sale: [Sale_Ref].[Ho_Ten]"
```

#### Automation 4: Cảnh báo manager khi deal ì > 7 ngày
```
Trigger:   Scheduled — mỗi thứ Hai 9:00 sáng
Condition: [Days_In_Stage] >= 7
           AND NOT(OR([Stage]="Chốt", [Stage]="Rớt"))
Action:    Send email → Manager
Subject:   "Báo cáo deal ì — tuần này"
Body:      Danh sách tất cả deal ì >= 7 ngày
```

#### Automation 5: Log lịch sử khi thay đổi Stage
```
Trigger:   On change — khi [Stage] thay đổi
Action:    Add row → PIPELINE_HISTORY (bảng log)
           - Pipeline_Ref = [ID_Pipeline]
           - Stage_Cu = [Stage] (giá trị trước)
           - Stage_Moi = [Stage] (giá trị mới)
           - Thoi_Gian = NOW()
           - Nguoi_Cap_Nhat = USEREMAIL()
```

> **Tại sao cần bảng PIPELINE_HISTORY?** Để manager xem được lịch sử thay đổi, phát hiện sale chỉnh ngược stage để qua mặt KPI.

---

### 2.5 Security Filter

```
// Sale chỉ thấy deal của mình
PIPELINE_SALE: USEREMAIL() = [Sale_Ref].[Email]

// Manager thấy toàn bộ team
PIPELINE_SALE: IN(USEREMAIL(), 
  SELECT(NHAN_SU[Email], [Role] = "Manager"))

// Giám đốc thấy tất cả — không cần filter
PIPELINE_SALE: TRUE

// Kế toán không thấy pipeline (chỉ thấy Giao Dịch đã Chốt)
PIPELINE_SALE: FALSE
```

---

### 2.6 UX Views — Thiết kế Màn Hình Mobile

#### View 1: Pipeline Board (Deck View)
Mục đích: Sale mở ra thấy ngay toàn bộ deal của mình theo stage
```
View Type: Deck
Sort:      [Ngay_CapNhat] ASC (deal cũ nhất lên trên — nhắc cập nhật)
Filter:    Security filter đã set
Card hiển thị:
  - Tiêu đề: [KH_Ref].[Ten_KH]
  - Phụ đề: [Stage] | [Days_In_Stage] ngày
  - Badge đỏ nếu Days_In_Stage >= 3
```

#### View 2: Pipeline Quick Update (Form inline)
Mục đích: Cập nhật stage trong < 30 giây
```
Chỉ hiển thị 3 field trên màn hình:
  1. Stage          → Enum dropdown (lớn, dễ tap)
  2. Ghi_Chu        → LongText (optional)
  3. Ngay_HenTiepTheo → Date picker
  
Ẩn các field kỹ thuật: ID, Ngay_TiepCan, Sale_Ref...
```

**Cách tạo trong AppSheet:**
- Vào View → New Form View → chọn bảng PIPELINE_SALE
- Trong Column Order: kéo Stage, Ghi_Chu, Ngay_HenTiepTheo lên đầu
- Show/hide: ẩn tất cả column không cần thiết khi edit

#### View 3: Pipeline Funnel (Chart View)
Mục đích: Manager thấy funnel tổng quan
```
View Type: Chart — Bar Chart
X-axis:    [Stage]
Y-axis:    COUNT([ID_Pipeline])
Filter:    Loại bỏ Stage "Rớt" và "Chốt" (đã xong)
Group by:  [Sale_Ref] (xem được theo từng sale)
```

#### View 4: Deal Detail (Detail View)
```
Section 1 — Thông tin chính:
  KH_Ref, Dat_Ref, Stage, XacSuat_Chot, GiaDeXuat_Ty

Section 2 — Timeline:
  Ngay_TiepCan, Ngay_CapNhat, Ngay_HenTiepTheo, Days_In_Stage

Section 3 — Related:
  Inline list: PIPELINE_HISTORY (lịch sử thay đổi stage)
  
Section 4 — Ghi chú:
  Ghi_Chu, LyDo_Rot (hiện khi Stage = "Rớt")
```

---

### 2.7 Dashboard Cần Thiết

#### Dashboard Sale (mỗi sale tự xem KPI của mình)
```
Card 1: Tổng deal đang active = 
  COUNTIF(PIPELINE_SALE[Stage], 
    NOT(OR([Stage]="Chốt", [Stage]="Rớt")))

Card 2: Deal sắp chốt (Stage = "Đàm phán" hoặc "Chờ quyết định") =
  COUNTIF(PIPELINE_SALE[Stage], 
    OR([Stage]="Đàm phán", [Stage]="Chờ quyết định"))

Card 3: Giá trị pipeline đang theo (tỷ đồng) =
  SUMIF(PIPELINE_SALE[GiaDeXuat_Ty], 
    NOT(OR([Stage]="Chốt", [Stage]="Rớt")))

Card 4: Deal chốt tháng này =
  COUNTIFS(PIPELINE_SALE[Stage], [Stage]="Chốt",
           PIPELINE_SALE[Ngay_CapNhat], MONTH([Ngay_CapNhat])=MONTH(TODAY()))
```

#### Dashboard Manager (xem toàn team)
```
Funnel chart: số deal theo từng stage
Bar chart:    doanh thu theo từng sale (tháng này)
Table:        top 5 deal ì nhất (Days_In_Stage cao nhất)
KPI card:     tỷ lệ chuyển đổi = Chốt / (Chốt + Rớt)
```

---

## 3. HƯỚNG DẪN TRIỂN KHAI — STEP BY STEP

### Tuần 1: Xây dựng nền tảng
1. Tạo bảng PIPELINE_SALE trong Google Sheets
2. Import vào AppSheet, đặt Key = ID_Pipeline
3. Cấu hình tất cả Enum cho cột Stage
4. Thiết lập Ref đến KHACH_HANG, NGUON_DAT, NHAN_SU
5. Thêm cột Days_In_Stage với formula tự tính

### Tuần 2: Automation & Security
1. Thiết lập 5 automation đã mô tả ở trên
2. Cấu hình Security Filter theo role
3. Tạo bảng PIPELINE_HISTORY để log thay đổi
4. Test thử toàn bộ flow: tạo deal → cập nhật stage → nhận notification

### Tuần 3: UX & Dashboard
1. Thiết kế View mobile cho sale (Pipeline Board + Quick Update Form)
2. Thiết kế Dashboard cho manager
3. Training sale: chỉ cần 30 phút, focus vào 2 thao tác chính
4. Chạy thử 1 tuần, thu thập feedback

### Tuần 4: Tinh chỉnh
1. Điều chỉnh threshold Days_In_Stage dựa trên thực tế (3 ngày hay 5 ngày?)
2. Thêm bất kỳ automation nào phát sinh từ feedback
3. Bàn giao chính thức

---

## 4. LƯU Ý & RỦI RO KHI TRIỂN KHAI

### Rủi ro 1: Sale vẫn không chịu cập nhật
**Giải pháp:** Làm màn hình Quick Update cực đơn giản (3 tap là xong). Đồng thời manager cần tạo văn hóa: họp sáng thứ Hai review pipeline — deal nào không cập nhật = sale phải giải trình.

### Rủi ro 2: Days_In_Stage tính sai nếu sale không cập nhật đúng thời điểm
**Giải pháp:** Dùng bảng PIPELINE_HISTORY làm nguồn tin cậy hơn. Tính Days_In_Stage từ timestamp cuối cùng trong PIPELINE_HISTORY.

### Rủi ro 3: Nhiều pipeline cho cùng 1 lô đất gây nhầm lẫn
**Giải pháp:** Trong View của NGUON_DAT, hiển thị inline list tất cả pipeline đang active. Sale thấy ngay lô đất mình đang tư vấn đã có người khác theo hay chưa.

### Rủi ro 4: AppSheet notification không đến do thiết bị
**Giải pháp:** Ngoài push notification, cấu hình thêm email backup. Training sale bật notification cho app AppSheet.

### Điểm cần quyết định trước khi build:
- [ ] Days_In_Stage bao nhiêu ngày thì gửi cảnh báo lần 1? (đề xuất: 3 ngày)
- [ ] Ai có quyền xem pipeline của sale khác? (chỉ manager trực tiếp hay tất cả manager?)
- [ ] Có cần track lý do rớt theo danh mục không? (Giá cao / Đối thủ / Pháp lý / Tài chính khách)
- [ ] Pipeline history lưu bao lâu? (đề xuất: giữ nguyên không xóa)

---

## TÓM TẮT NHANH

| Vấn đề | Giải pháp |
|---|---|
| Sale quên cập nhật | Auto reminder sau 3 ngày không cập nhật |
| Không biết deal ở đâu | Deck View sắp xếp theo ngày cập nhật — cũ nhất lên đầu |
| Cập nhật mất thời gian | Quick Update Form chỉ 3 field, < 30 giây |
| Manager không theo dõi được | Funnel Chart + cảnh báo deal ì > 7 ngày |
| Deal chốt không chuyển kế toán | Auto tạo Giao Dịch + notify kế toán ngay lập tức |

