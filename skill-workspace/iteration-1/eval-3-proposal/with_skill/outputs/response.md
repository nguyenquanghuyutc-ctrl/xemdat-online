# PROPOSAL & BÁO GIÁ TRIỂN KHAI
# HỆ THỐNG QUẢN LÝ GIAO DỊCH BĐS CÔNG NGHIỆP TRÊN APPSHEET

---

**Chuẩn bị bởi:** Chuyên gia BA & Tư vấn Chuyển đổi Số  
**Ngày:** 17/05/2026  
**Phiên bản:** 1.0 — Bản chính thức  
**Hiệu lực báo giá:** 30 ngày kể từ ngày phát hành

---

## MỤC LỤC

1. Tổng quan bài toán nghiệp vụ
2. Giải pháp đề xuất — Hệ thống 8 Module
3. Phạm vi công việc & Deliverables
4. Cấu trúc database & Kiến trúc kỹ thuật
5. Timeline triển khai chi tiết
6. Báo giá — 3 Gói dịch vụ
7. Điều khoản support & SLA
8. Điều kiện hợp tác & Thanh toán

---

## 1. TỔNG QUAN BÀI TOÁN NGHIỆP VỤ

### 1.1 Thực trạng doanh nghiệp BĐS công nghiệp hiện nay

Với quy mô **10 sale + 2 kế toán**, các công ty BĐS công nghiệp thường đang vận hành theo mô hình thủ công với các điểm nghẽn điển hình sau:

| Pain Point | Biểu hiện | Hậu quả |
|---|---|---|
| Dữ liệu phân tán | Sale lưu thông tin chủ đất trong Excel riêng, Zalo, sổ tay | Mất lead khi nhân viên nghỉ việc, dữ liệu không đồng nhất |
| Thiếu visibility pipeline | Manager không biết deal nào đang ở đâu, xác suất chốt bao nhiêu | Ra quyết định chậm, không dự báo được doanh thu |
| Bàn giao kế toán thủ công | Sau khi chốt, sale gửi thông tin qua Zalo/email cho kế toán | Sai sót hợp đồng, chậm trễ, thiếu lịch sử theo dõi |
| Nhắc thanh toán rời rạc | Kế toán nhớ theo lịch cá nhân hoặc ghi chú Zalo | Bỏ sót đợt thu, ảnh hưởng dòng tiền công ty |
| Không có báo cáo real-time | Báo cáo cuối tháng làm thủ công từ nhiều nguồn | Mất 2-3 ngày/tháng, dễ sai số |

### 1.2 Bài toán cần giải quyết

> **Mục tiêu:** Xây dựng hệ thống quản lý tập trung trên AppSheet — nơi 10 sale nhập liệu từ thực địa qua điện thoại, 2 kế toán theo dõi tiến độ thanh toán, manager có dashboard real-time, tất cả dữ liệu đồng nhất và bảo mật theo phân quyền.

**Quy trình nghiệp vụ cần số hóa (8 bước):**

```
[1] Sale lấy thông tin chủ đất
    ↓
[2] Nhập nguồn đất vào hệ thống (< 3 phút)
    ↓
[3] Triển khai giao bán cho khách hàng
    ↓
[4] Theo dõi pipeline: Quan tâm → Tư vấn → Đàm phán
    ↓
[5] Khách chốt → Tạo giao dịch (tự động)
    ↓
[6] Chuyển kế toán làm hợp đồng (tự động notify)
    ↓
[7] Theo dõi tiến độ thanh toán (cảnh báo tự động)
    ↓
[8] Hoàn tất giao dịch, lưu hồ sơ
```

---

## 2. GIẢI PHÁP ĐỀ XUẤT — HỆ THỐNG 8 MODULE

### Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────┐
│              APPSHEET APPLICATION                    │
├──────────────┬──────────────┬───────────────────────┤
│  SALE VIEW   │ MANAGER VIEW │  KẾ TOÁN VIEW         │
│  (Mobile)    │ (Dashboard)  │  (Hợp đồng/TT)        │
├──────────────┴──────────────┴───────────────────────┤
│                  8 MODULE CORE                       │
│  Nguồn Đất | Chủ Đất | Khách Hàng | Pipeline        │
│  Giao Dịch | Kế Toán | Dashboard  | Phân Quyền      │
├─────────────────────────────────────────────────────┤
│         Google Sheets (Database Backend)            │
│         Google Drive (File Storage)                 │
│         Gmail / Google Chat (Notifications)         │
└─────────────────────────────────────────────────────┘
```

### Mô tả 8 Module

| # | Module | Người dùng chính | Tính năng cốt lõi |
|---|---|---|---|
| 1 | **Nguồn Đất** | Sale | Nhập, tra cứu, cập nhật trạng thái nguồn đất. Map view vị trí GPS |
| 2 | **Chủ Đất** | Sale + Manager | Hồ sơ chủ đất, lịch sử liên hệ, trạng thái hợp tác |
| 3 | **Khách Hàng** | Sale | CRM khách mua, nhu cầu, ngân sách, lịch sử tương tác |
| 4 | **Pipeline Sale** | Sale + Manager | Kanban/list theo stage. Xác suất chốt. Forecast doanh thu |
| 5 | **Giao Dịch** | Sale + Kế toán | Hợp đồng, giá trị, điều khoản. Tự động tạo khi Pipeline chốt |
| 6 | **Kế Toán & Thanh Toán** | Kế toán | Đợt thanh toán, cảnh báo đến hạn, theo dõi dòng tiền |
| 7 | **Dashboard & Báo Cáo** | Manager + Giám đốc | KPI sale, funnel pipeline, doanh thu tháng/quý, hiệu suất team |
| 8 | **Phân Quyền Nhân Sự** | Admin | Role-based: sale chỉ thấy data của mình, kế toán thấy giao dịch đã chốt |

---

## 3. PHẠM VI CÔNG VIỆC & DELIVERABLES

### 3.1 Phân tích & Thiết kế (Giai đoạn 1)

- [ ] Workshop phân tích nghiệp vụ với ban lãnh đạo và đại diện sale/kế toán (2 buổi, mỗi buổi 2h)
- [ ] Tài liệu Business Requirement Document (BRD) — mô tả đầy đủ quy trình
- [ ] Wireframe UX các màn hình chính trên mobile
- [ ] Thiết kế cấu trúc database (6 bảng + quan hệ)
- [ ] Thiết kế luồng automation và phân quyền
- [ ] Sign-off với khách hàng trước khi build

### 3.2 Xây dựng hệ thống (Giai đoạn 2)

- [ ] Setup Google Workspace (Sheets, Drive, Gmail integration)
- [ ] Xây dựng 6 bảng dữ liệu với đầy đủ validation
- [ ] Cấu hình 8 module AppSheet với Views đầy đủ
- [ ] Thiết lập 4 automation workflow chính
- [ ] Cấu hình Security Filter cho 4 role (Sale / Manager / Kế toán / Giám đốc)
- [ ] Build Dashboard với 5 KPI chính
- [ ] Map View cho nguồn đất (GPS integration)
- [ ] Test nội bộ — QA toàn bộ luồng nghiệp vụ

### 3.3 Triển khai & Đào tạo (Giai đoạn 3)

- [ ] Migration dữ liệu cũ (nếu có, từ Excel sang hệ thống mới)
- [ ] Training sale (buổi thực hành trên điện thoại, 2h/buổi)
- [ ] Training kế toán và manager (buổi riêng, 2h/buổi)
- [ ] Tài liệu hướng dẫn sử dụng (PDF + video hướng dẫn ngắn)
- [ ] Go-live chính thức với support trực tiếp 1 tuần đầu

### 3.4 Bàn giao

- [ ] Source Google Sheets (tất cả bảng, công thức)
- [ ] AppSheet app (2 version: Sale mobile + Manager desktop)
- [ ] Tài liệu kỹ thuật (database schema, automation docs)
- [ ] Tài liệu vận hành (SOP cho từng role)
- [ ] Video training cho từng nhóm người dùng

---

## 4. CẤU TRÚC DATABASE & KIẾN TRÚC KỸ THUẬT

### 4.1 Sơ đồ quan hệ bảng

```
CHU_DAT (1) ──────< NGUON_DAT (N)
                         │
                         │ (1)
                         ↓
NHAN_SU ──────> PIPELINE_SALE
KHACH_HANG ───>      (N)
                         │
                         │ (1)
                         ↓
                    GIAO_DICH (N)
                         │
                         │ (1)
                         ↓
                    THANH_TOAN (N)
```

### 4.2 Chi tiết bảng NGUON_DAT

| Column | Type | Validation | Ghi chú |
|---|---|---|---|
| ID_Nguon | Text (Key) | Auto: ND-2026-001 | Tự tăng |
| Ten_KhuDat | Text | Required | Tên gọi nội bộ |
| Chu_Dat_Ref | Ref → CHU_DAT | Required | |
| DienTich_m2 | Decimal | > 0 | Diện tích m² |
| GiaBan_Ty | Decimal | > 0 | Giá chủ muốn bán |
| ViTri_GPS | LatLong | — | Hiển thị trên Map View |
| TinhTrang_PhapLy | Enum | Required | Sổ đỏ / Sổ hồng / Chờ sổ / Tranh chấp |
| Status | Enum | Default: Mới | Mới / Đang giao bán / Đã chốt / Ngừng bán |
| Sale_PhuTrach | Ref → NHAN_SU | Default: USEREMAIL() | |
| Ngay_Lay | Date | Required | |
| Ghi_Chu | LongText | — | |

### 4.3 Chi tiết bảng PIPELINE_SALE

| Column | Type | Validation | Ghi chú |
|---|---|---|---|
| ID_Pipeline | Text (Key) | Auto: PL-2026-001 | |
| KH_Ref | Ref → KHACH_HANG | Required | |
| Dat_Ref | Ref → NGUON_DAT | Required | |
| Sale_Ref | Ref → NHAN_SU | Required | |
| Stage | Enum | Required | Quan tâm → Tư vấn → Xem thực địa → Đàm phán → Chờ QĐ → Chốt / Rớt |
| XacSuat_Chot | Enum | — | 10% / 25% / 50% / 75% / 90% |
| GiaDeXuat_Ty | Decimal | > 0 | |
| Ngay_TiepCan | Date | Required | |
| Ngay_CapNhat | DateTime | Auto | |
| Ghi_Chu | LongText | — | |

### 4.4 Automation Workflow (4 quy trình tự động)

**Workflow 1 — Thông báo lead mới cho sale**
```
Trigger : On Add — bảng KHACH_HANG
Condition: [Sale_PhuTrach] = USEREMAIL()
Action   : Send Notification
Message  : "Lead mới: [Ten_KH] | SĐT: [SDT] | Ngân sách: [NganSach_Ty] tỷ"
```

**Workflow 2 — Tạo giao dịch khi pipeline chốt**
```
Trigger : On Change — bảng PIPELINE_SALE
Condition: [Stage] = "Chốt"
Action 1 : Add Row → GIAO_DICH (copy thông tin từ pipeline)
Action 2 : Send Notification → Kế toán + Manager
Message  : "Deal mới cần xử lý HĐ: [KH_Ref] - [GiaDeXuat_Ty] tỷ"
```

**Workflow 3 — Cảnh báo thanh toán sắp đến hạn**
```
Trigger  : Scheduled — 8:00 sáng mỗi ngày
Condition: [NgayDuKien] <= TODAY() + 3
           AND [TrangThai] = "Chưa đến hạn"
Action   : Send Email → Kế toán + Manager
Subject  : "⚠ Nhắc nhở thanh toán: [ID_GiaoDich]"
Body     : "Đợt [Dot_ThanhToan] | Số tiền: [SoTien_Ty] tỷ | Hạn: [NgayDuKien]"
```

**Workflow 4 — Tự động đánh dấu thanh toán trễ hạn**
```
Trigger  : Scheduled — 7:00 sáng mỗi ngày
Condition: [NgayDuKien] < TODAY()
           AND [TrangThai] <> "Đã nhận"
Action   : Set Row Value → [TrangThai] = "Trễ hạn"
```

### 4.5 Security Filter theo Role

```
SALE (chỉ thấy data của mình):
  NGUON_DAT   : [Sale_PhuTrach] = USEREMAIL()
  KHACH_HANG  : [Sale_PhuTrach] = USEREMAIL()
  PIPELINE    : [Sale_Ref] = USEREMAIL()

MANAGER (thấy toàn bộ team):
  Tất cả bảng: IN(USEREMAIL(), Manager_Email_List)

KẾ TOÁN (chỉ thấy giao dịch đã chốt):
  GIAO_DICH   : [TrangThai_HopDong] <> ""  (tức là đã có hợp đồng)
  THANH_TOAN  : IN([GiaoDich_Ref], KeToan_Assigned_List)

GIÁM ĐỐC (xem tất cả, không chỉnh sửa):
  Read-only access toàn bộ + Dashboard full
```

---

## 5. TIMELINE TRIỂN KHAI CHI TIẾT

### Gói Standard (8 tuần — khuyến nghị)

| Tuần | Giai đoạn | Công việc chính | Deliverable |
|---|---|---|---|
| **Tuần 1** | Phân tích | Workshop nghiệp vụ (2 buổi). Khảo sát quy trình hiện tại. Phỏng vấn sale, kế toán | BRD Document |
| **Tuần 2** | Thiết kế | Database schema. Wireframe UX mobile. Luồng automation. Sign-off khách hàng | Design Document + Wireframe |
| **Tuần 3** | Build Core | Setup Google Workspace. Xây 6 bảng dữ liệu. Validation & Enum | Google Sheets backend |
| **Tuần 4** | Build App | 8 module AppSheet. Form view mobile. Table view + filter | App v0.1 (nội bộ test) |
| **Tuần 5** | Automation | 4 workflow tự động. Email/notification. Security filter 4 role | App v0.2 (automation) |
| **Tuần 6** | Dashboard | 5 KPI charts. Pipeline funnel. Báo cáo doanh thu. Map view | App v0.3 (full feature) |
| **Tuần 7** | QA & UAT | Test toàn bộ luồng. Fix bugs. Migration dữ liệu cũ (nếu có). UAT với khách hàng | App v1.0 (production-ready) |
| **Tuần 8** | Go-live | Training sale (2 buổi). Training kế toán/manager (2 buổi). Go-live. Support tuần đầu | Bàn giao toàn bộ |

---

## 6. BÁO GIÁ — 3 GÓI DỊCH VỤ

### So sánh 3 gói

| Tính năng | Basic | Standard | Enterprise |
|---|---|---|---|
| **Module** | 4 module cơ bản | 7 module | Full 8 module |
| **Nguồn Đất + Chủ Đất** | ✓ | ✓ | ✓ |
| **Khách Hàng + Pipeline** | ✓ | ✓ | ✓ |
| **Giao Dịch + Kế Toán** | — | ✓ | ✓ |
| **Dashboard & Báo Cáo** | Cơ bản | Full | Custom |
| **Map View GPS** | — | ✓ | ✓ |
| **Automation Workflow** | 1 | 4 | 4 + Custom |
| **Security Filter** | 2 role | 4 role | 4 role + Custom |
| **Số lượng user** | Tối đa 5 | Tối đa 15 | Không giới hạn |
| **Migration dữ liệu cũ** | — | ✓ (1 file) | ✓ (không giới hạn) |
| **Training** | 2 buổi | 5 buổi | 8 buổi + video |
| **Tài liệu hướng dẫn** | PDF cơ bản | PDF + SOP | PDF + SOP + Video |
| **Timeline triển khai** | 4 tuần | 8 tuần | 12 tuần |
| **Support sau go-live** | 1 tháng | 3 tháng | 12 tháng |
| **SLA response** | 48h | 24h | 4h |

---

### Chi tiết báo giá

#### GÓI BASIC — 45.000.000 VNĐ

> **Phù hợp:** Doanh nghiệp muốn thử nghiệm hệ thống, đội nhỏ ≤ 5 người, ngân sách hạn chế

**Bao gồm:**
- 4 module: Nguồn Đất, Chủ Đất, Khách Hàng, Pipeline Sale
- 1 automation workflow (thông báo lead mới)
- Security filter 2 role (Sale + Manager)
- Dashboard cơ bản: số nguồn đất, pipeline overview
- Training 2 buổi (2h/buổi)
- Support 1 tháng sau go-live (response trong 48h)
- Tài liệu hướng dẫn sử dụng dạng PDF

**Không bao gồm:** Module Giao Dịch, Kế Toán, Map View, Migration dữ liệu cũ

---

#### GÓI STANDARD — 85.000.000 VNĐ ⭐ KHUYẾN NGHỊ

> **Phù hợp:** Doanh nghiệp 10-15 nhân viên, muốn hệ thống đầy đủ từ sale đến kế toán  
> **Phù hợp nhất với yêu cầu của bạn: 10 sale + 2 kế toán**

**Bao gồm toàn bộ Basic, cộng thêm:**
- Thêm 3 module: Giao Dịch, Kế Toán & Thanh Toán, Dashboard nâng cao
- 4 automation workflow đầy đủ (lead mới, chốt deal, nhắc thanh toán, trễ hạn)
- Security filter 4 role (Sale / Manager / Kế toán / Giám đốc)
- Map View GPS cho nguồn đất
- Dashboard 5 KPI: Pipeline funnel, doanh thu tháng/quý, hiệu suất sale, tổng hợp thanh toán
- Migration dữ liệu cũ từ 1 file Excel hiện tại
- Training 5 buổi (sale riêng, kế toán riêng, manager riêng)
- Support 3 tháng sau go-live (response trong 24h)
- Tài liệu hướng dẫn PDF + SOP cho từng role

**Lý do chọn gói này:** Với 10 sale + 2 kế toán, bạn cần đầy đủ vòng quản lý từ nguồn đất → pipeline → hợp đồng → thanh toán. Gói Basic thiếu module kế toán, gói Enterprise sẽ dư thừa tính năng custom.

---

#### GÓI ENTERPRISE — 150.000.000 VNĐ

> **Phù hợp:** Doanh nghiệp lớn, nhiều chi nhánh, cần tùy biến cao, tích hợp hệ thống khác

**Bao gồm toàn bộ Standard, cộng thêm:**
- Full 8 module bao gồm module Phân Quyền Nhân Sự custom
- Custom automation theo quy trình riêng của doanh nghiệp
- Custom dashboard theo yêu cầu báo cáo ban giám đốc
- Tích hợp hệ thống khác (nếu có): phần mềm kế toán, ERP
- Migration dữ liệu từ nhiều nguồn (không giới hạn file)
- Training 8 buổi + video hướng dẫn cho từng role
- Support 12 tháng (response trong 4h trong giờ hành chính)
- Quarterly review (review 3 tháng/lần, đề xuất tối ưu hệ thống)
- 1 lần nâng cấp/thay đổi tính năng trong năm đầu (không tính phí)

---

### Bảng tóm tắt báo giá

| Gói | Giá niêm yết | Chiết khấu đối tác* | Giá sau CK |
|---|---|---|---|
| Basic | 45.000.000 VNĐ | 15% = 6.750.000 | **38.250.000 VNĐ** |
| Standard ⭐ | 85.000.000 VNĐ | 15% = 12.750.000 | **72.250.000 VNĐ** |
| Enterprise | 150.000.000 VNĐ | 15% = 22.500.000 | **127.500.000 VNĐ** |

*Chiết khấu áp dụng khi có đối tác giới thiệu hoặc ký hợp đồng trước ngày 30/06/2026

**Phí phát sinh ngoài gói (nếu có):**
- Thay đổi tính năng phát sinh ngoài scope: 2.000.000 VNĐ/ngày công
- Migration dữ liệu thêm (gói Standard): 3.000.000 VNĐ/file Excel
- Buổi training thêm: 2.500.000 VNĐ/buổi 2h
- Gia hạn support sau kỳ hạn: 5.000.000 VNĐ/tháng (gói Standard)

---

## 7. ĐIỀU KHOẢN SUPPORT & SLA

### 7.1 Cam kết chất lượng

| Hạng mục | Cam kết |
|---|---|
| **Uptime hệ thống** | AppSheet + Google Workspace đảm bảo 99.9% uptime theo SLA của Google |
| **Bảo mật dữ liệu** | Dữ liệu lưu trên Google Drive của doanh nghiệp, không qua server trung gian |
| **Backup** | Google Sheets tự động lưu lịch sử 30 ngày. Khuyến nghị backup thủ công hàng tuần |
| **Bàn giao source** | Toàn bộ Google Sheets và cấu hình AppSheet thuộc sở hữu của doanh nghiệp |

### 7.2 Phạm vi support sau go-live

**Bao gồm trong gói support:**
- Sửa lỗi phát sinh từ hệ thống được bàn giao (bugs, automation không chạy đúng)
- Hướng dẫn sử dụng qua Zalo/email cho nhân viên mới
- Điều chỉnh nhỏ: thêm/sửa Enum value, điều chỉnh validation
- Hỗ trợ khắc phục khi Google cập nhật AppSheet gây ảnh hưởng

**Không bao gồm (tính phí ngày công):**
- Thêm module mới
- Thay đổi cấu trúc database
- Xây dựng báo cáo mới ngoài scope ban đầu
- Training nhân viên mới sau kỳ hạn training

### 7.3 Kênh hỗ trợ

- **Kênh chính:** Zalo nhóm riêng (Sale + Kế toán + Manager + Support team)
- **Báo lỗi khẩn:** Gọi điện trực tiếp (giờ hành chính 8:00–17:30, thứ 2–6)
- **Báo cáo định kỳ:** Email tổng hợp tình trạng hệ thống hàng tuần (2 tháng đầu)

---

## 8. ĐIỀU KIỆN HỢP TÁC & THANH TOÁN

### 8.1 Lịch thanh toán

| Đợt | Thời điểm | Tỷ lệ | Số tiền (Gói Standard) |
|---|---|---|---|
| **Đợt 1** | Ký hợp đồng | 40% | 34.000.000 VNĐ |
| **Đợt 2** | Sign-off thiết kế (hết tuần 2) | 30% | 25.500.000 VNĐ |
| **Đợt 3** | Go-live chính thức (hết tuần 8) | 30% | 25.500.000 VNĐ |

*Số tiền trên chưa bao gồm VAT 10%*

### 8.2 Điều kiện hợp tác

**Phía doanh nghiệp cung cấp:**
- Tài khoản Google Workspace (Business hoặc Enterprise) cho toàn bộ nhân viên
- Danh sách nhân viên + email + role
- Dữ liệu lịch sử (nếu có, format Excel)
- Đầu mối liên hệ dự án: 1 người từ management, 1 từ sale, 1 từ kế toán
- Tham gia đầy đủ các buổi workshop và UAT theo lịch đã thống nhất

**Lưu ý về AppSheet:**
- AppSheet yêu cầu gói **AppSheet Core** hoặc cao hơn cho phân quyền nâng cao
- Chi phí AppSheet license: ~10 USD/user/tháng (Google Workspace Business Plus đã bao gồm một số tính năng)
- **Chi phí này là chi phí trực tiếp với Google, không bao gồm trong báo giá triển khai trên**
- Ước tính: 12 users × 10 USD × 12 tháng ≈ **34.560.000 VNĐ/năm** (tính theo tỷ giá 24.000)

### 8.3 Điều khoản bảo hành

- **Bảo hành lỗi:** 12 tháng kể từ ngày go-live chính thức (toàn bộ gói)
- **Định nghĩa lỗi được bảo hành:** Tính năng không hoạt động đúng như thiết kế đã sign-off
- **Không bảo hành:** Thay đổi yêu cầu nghiệp vụ sau khi sign-off, lỗi do thay đổi từ phía Google

### 8.4 Quyền sở hữu & Bảo mật

- Toàn bộ dữ liệu và cấu hình hệ thống thuộc sở hữu của doanh nghiệp
- Bên triển khai ký cam kết bảo mật thông tin (NDA) trước khi bắt đầu dự án
- Không lưu trữ bản sao dữ liệu doanh nghiệp trên hệ thống của bên triển khai

---

## KHUYẾN NGHỊ & BƯỚC TIẾP THEO

### Khuyến nghị cho doanh nghiệp 10 sale + 2 kế toán

**Chọn Gói Standard (85.000.000 VNĐ)** vì:

1. **Đủ module cho toàn bộ vòng nghiệp vụ** — từ nguồn đất đến thu tiền cuối cùng
2. **2 kế toán cần đầy đủ tính năng** theo dõi hợp đồng và thanh toán — Gói Basic không có
3. **10 sale cần phân quyền rõ ràng** — Security filter 4 role trong Standard đảm bảo sale không xem được data của nhau
4. **ROI rõ ràng** — Tiết kiệm 2-3 ngày/tháng cho báo cáo thủ công, loại bỏ rủi ro mất data khi nhân viên nghỉ

**Ước tính ROI:**
- Tiết kiệm thời gian báo cáo: 3 ngày × 12 tháng × chi phí nhân sự = ~36 ngày công/năm
- Tăng tỷ lệ chốt deal nhờ pipeline rõ ràng: ước tính tăng 10-15% hiệu quả bám đuổi
- Giảm rủi ro bỏ sót thanh toán: 1 đợt thanh toán bỏ sót = vài trăm triệu đến hàng tỷ đồng rủi ro

### Các bước tiếp theo

1. **Xác nhận quan tâm** — Phản hồi proposal này trong vòng 7 ngày làm việc
2. **Buổi demo miễn phí** — Chúng tôi sẽ demo prototype hệ thống (45 phút, online hoặc trực tiếp)
3. **Ký hợp đồng nguyên tắc** — Sau khi thống nhất gói và điều khoản
4. **Kick-off workshop** — Bắt đầu phân tích nghiệp vụ tuần 1

---

## THÔNG TIN LIÊN HỆ

Để được tư vấn thêm hoặc sắp xếp buổi demo, vui lòng liên hệ:

**Chuyên gia tư vấn dự án:**  
Email: nguyenquanghuy.utc@gmail.com  
Zalo/Phone: *(cập nhật khi gửi proposal thực tế)*

---

*Proposal này được chuẩn bị riêng cho doanh nghiệp BĐS công nghiệp với quy mô 10 sale + 2 kế toán. Mọi thông tin trong tài liệu này là bảo mật và chỉ phục vụ mục đích đánh giá.*

*Hiệu lực báo giá: 30 ngày kể từ ngày 17/05/2026*

---
*Phiên bản tài liệu: v1.0 | Ngày phát hành: 17/05/2026*
