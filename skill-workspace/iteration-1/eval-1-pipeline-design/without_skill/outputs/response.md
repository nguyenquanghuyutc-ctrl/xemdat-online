# Thiết Kế Module Pipeline Sale cho Hệ Thống Quản Lý Giao Dịch BĐS Công Nghiệp trên AppSheet

## 1. Tổng Quan Giải Pháp

Module Pipeline Sale giúp đội ngũ sale theo dõi toàn bộ hành trình của từng deal BĐS công nghiệp từ khi tiếp cận khách hàng đến khi ký hợp đồng. AppSheet là nền tảng no-code phù hợp vì có thể kết nối trực tiếp với Google Sheets, tích hợp thông báo tự động, và xây dựng giao diện trực quan.

---

## 2. Các Bước (Stage) trong Pipeline BĐS Công Nghiệp

Đề xuất 7 giai đoạn phù hợp với quy trình bán BĐS công nghiệp (khu công nghiệp, nhà xưởng, đất công nghiệp):

| STT | Stage | Mô tả |
|-----|-------|-------|
| 1 | Lead Mới | Khách hàng vừa liên hệ hoặc được tạo từ nguồn marketing |
| 2 | Đã Liên Hệ | Sale đã gọi/gặp, xác nhận nhu cầu ban đầu |
| 3 | Khảo Sát Nhu Cầu | Đã thu thập thông tin chi tiết: diện tích, vị trí, ngân sách |
| 4 | Tham Quan Thực Tế | Đã đưa khách đến xem mặt bằng/khu công nghiệp |
| 5 | Đang Đàm Phán | Đang thương lượng giá, điều khoản hợp đồng |
| 6 | Chờ Ký Hợp Đồng | Hai bên đã thống nhất, chuẩn bị ký |
| 7 | Đã Đóng | Hợp đồng đã ký hoặc deal thất bại (Won/Lost) |

---

## 3. Thiết Kế Cơ Sở Dữ Liệu (Google Sheets)

### Bảng 1: DEALS (Sheet chính)

| Tên Cột | Kiểu Dữ Liệu | Mô Tả |
|---------|--------------|-------|
| Deal_ID | Text (Key) | Mã deal tự động: DEAL-001 |
| Ten_Deal | Text | Tên deal / tên dự án |
| Khach_Hang_ID | Ref → CUSTOMERS | Liên kết khách hàng |
| Sale_PIC | Ref → USERS | Sale phụ trách |
| Stage | Enum | 7 giai đoạn ở trên |
| Gia_Tri_Du_Kien | Price | Giá trị ước tính (VNĐ) |
| Xac_Suat_Chot | Percent | % khả năng thành công |
| Ngay_Tao | Date | Ngày tạo deal |
| Ngay_Cap_Nhat_Stage | DateTime | Lần cuối đổi stage |
| Ngay_Du_Kien_Dong | Date | Dự kiến đóng deal |
| Ghi_Chu | LongText | Ghi chú tổng quan |
| Ket_Qua | Enum | Won / Lost / In Progress |
| Ly_Do_That_Bai | Text | Nếu Lost, lý do là gì |
| Nguon_Lead | Enum | Website / Referral / Call / Event |
| Loai_San_Pham | Enum | Đất KCN / Nhà xưởng / Văn phòng / Kho |
| Dien_Tich_YC | Number | Diện tích khách yêu cầu (m²) |
| Vi_Tri_YC | Text | Tỉnh/KCN khách muốn |

### Bảng 2: DEAL_ACTIVITIES (Lịch sử hoạt động)

| Tên Cột | Kiểu Dữ Liệu | Mô Tả |
|---------|--------------|-------|
| Activity_ID | Text (Key) | Mã tự động |
| Deal_ID | Ref → DEALS | Liên kết deal |
| Loai_Hoat_Dong | Enum | Gọi điện / Email / Gặp mặt / Tham quan / Gửi hồ sơ |
| Mo_Ta | LongText | Nội dung hoạt động |
| Ngay_Thuc_Hien | DateTime | Thời điểm thực hiện |
| Nguoi_Thuc_Hien | Ref → USERS | Ai thực hiện |
| Stage_Truoc | Text | Stage trước khi đổi |
| Stage_Sau | Text | Stage sau khi đổi |
| File_Dinh_Kem | File | Hợp đồng, hồ sơ, hình ảnh |

### Bảng 3: CUSTOMERS (Khách hàng)

| Tên Cột | Kiểu Dữ Liệu | Mô Tả |
|---------|--------------|-------|
| Customer_ID | Text (Key) | Mã khách hàng |
| Ten_Cong_Ty | Text | Tên doanh nghiệp |
| Nguoi_Lien_He | Text | Người đại diện |
| So_Dien_Thoai | Phone | SĐT |
| Email | Email | Email |
| Nganh_Nghe | Text | Ngành sản xuất/kinh doanh |
| Quoc_Tich | Enum | Việt Nam / Hàn Quốc / Nhật Bản / Đài Loan / Khác |

### Bảng 4: TASKS (Công việc nhắc nhở)

| Tên Cột | Kiểu Dữ Liệu | Mô Tả |
|---------|--------------|-------|
| Task_ID | Text (Key) | Mã task |
| Deal_ID | Ref → DEALS | Liên kết deal |
| Tieu_De | Text | Tiêu đề công việc |
| Mo_Ta | LongText | Chi tiết |
| Deadline | DateTime | Hạn hoàn thành |
| Assigned_To | Ref → USERS | Giao cho ai |
| Trang_Thai | Enum | Chưa làm / Đang làm / Hoàn thành |
| Uu_Tien | Enum | Cao / Trung bình / Thấp |

---

## 4. Cấu Hình AppSheet

### 4.1 Tạo App và Kết Nối Data

1. Vào appsheet.com → New App → Start with existing data
2. Kết nối Google Sheets chứa 4 bảng trên
3. AppSheet sẽ tự nhận diện các cột và kiểu dữ liệu

### 4.2 Cấu Hình Kiểu Dữ Liệu Quan Trọng

**Cột Stage (DEALS):**
- Type: Enum
- Values: Lead Mới, Đã Liên Hệ, Khảo Sát Nhu Cầu, Tham Quan Thực Tế, Đang Đàm Phán, Chờ Ký Hợp Đồng, Đã Đóng
- Input mode: Buttons (để dễ chọn trên mobile)

**Cột Ngay_Cap_Nhat_Stage:**
- Type: DateTime
- App formula: `NOW()` — tự động cập nhật khi mở form, hoặc dùng Automation

**Cột Xac_Suat_Chot:**
- Có thể dùng formula tự động theo Stage:
```
IFS(
  [Stage] = "Lead Mới", 0.1,
  [Stage] = "Đã Liên Hệ", 0.2,
  [Stage] = "Khảo Sát Nhu Cầu", 0.35,
  [Stage] = "Tham Quan Thực Tế", 0.5,
  [Stage] = "Đang Đàm Phán", 0.7,
  [Stage] = "Chờ Ký Hợp Đồng", 0.9,
  [Stage] = "Đã Đóng", 1,
  TRUE, 0
)
```

### 4.3 Thiết Kế Views (Giao Diện)

#### View 1: Kanban Pipeline (Quan trọng nhất)
- View name: Pipeline Board
- View type: **Deck** hoặc **Gallery** nhóm theo Stage
- Group by: Stage
- Sort by: Ngay_Cap_Nhat_Stage (mới nhất lên đầu)
- Card hiển thị: Tên deal, Khách hàng, Giá trị, Ngày dự kiến đóng

> Lưu ý: AppSheet không có Kanban kéo-thả như Trello, nhưng có thể nhóm theo Stage bằng Deck view. Để có Kanban thực sự, có thể nhúng AppSheet vào Google Sites kết hợp với script.

#### View 2: Danh Sách Deals
- View type: Table
- Filter: Show only deals của user đang đăng nhập
- Formula lọc: `[Sale_PIC] = USEREMAIL()`
- Hiển thị cột: Deal_ID, Ten_Deal, Stage, Gia_Tri_Du_Kien, Ngay_Du_Kien_Dong, Ngay_Cap_Nhat_Stage

#### View 3: Chi Tiết Deal
- View type: Detail
- Tabs: Thông tin chung | Lịch sử hoạt động | Công việc
- Inline view cho DEAL_ACTIVITIES và TASKS liên kết

#### View 4: Dashboard Quản Lý
- View type: Dashboard (kết hợp nhiều chart)
- Chart 1: Donut chart - Số deal theo Stage
- Chart 2: Bar chart - Giá trị pipeline theo sale
- Chart 3: Line chart - Số deal mới theo tháng

#### View 5: Deals Cần Chú Ý (cho Manager)
- Filter: Deals không cập nhật stage quá 7 ngày
- Formula: `TODAY() - [Ngay_Cap_Nhat_Stage] > 7`

---

## 5. Automation - Giải Quyết Vấn Đề "Quên Cập Nhật"

Đây là phần quan trọng nhất để giải quyết vấn đề sale quên cập nhật.

### Automation 1: Nhắc Nhở Khi Deal Không Cập Nhật

**Trigger:** Scheduled (chạy mỗi ngày lúc 8:00 sáng)

**Condition:**
```
AND(
  [Ket_Qua] = "In Progress",
  (TODAY() - DATE([Ngay_Cap_Nhat_Stage])) >= 3
)
```

**Action:** Send Email / Push Notification
- To: [Sale_PIC]
- Subject: `Nhắc nhở: Deal "[Ten_Deal]" chưa cập nhật {{TODAY() - DATE([Ngay_Cap_Nhat_Stage])}} ngày`
- Body: 
```
Xin chào,

Deal [Ten_Deal] - Khách hàng [Khach_Hang_ID] 
đang ở stage: [Stage]
Chưa có cập nhật trong [số ngày] ngày.

Vui lòng cập nhật trạng thái hoặc ghi chú hoạt động mới nhất.

[Link vào deal]
```

### Automation 2: Thông Báo Khi Đổi Stage

**Trigger:** Data Change - When Stage column changes

**Action:** 
1. Tự động tạo record vào DEAL_ACTIVITIES (ghi lại stage cũ và mới)
2. Gửi thông báo cho Manager
3. Cập nhật Ngay_Cap_Nhat_Stage = NOW()

**Bot để ghi lịch sử tự động:**
```
Add row to DEAL_ACTIVITIES:
  Deal_ID = [Deal_ID]
  Loai_Hoat_Dong = "Đổi Stage"
  Mo_Ta = CONCATENATE("Stage đổi từ ", [_THISROW_BEFORE].[Stage], " → ", [Stage])
  Ngay_Thuc_Hien = NOW()
  Nguoi_Thuc_Hien = USEREMAIL()
  Stage_Truoc = [_THISROW_BEFORE].[Stage]
  Stage_Sau = [Stage]
```

### Automation 3: Cảnh Báo Deal Sắp Hết Hạn

**Trigger:** Scheduled (hàng ngày)

**Condition:**
```
AND(
  [Ket_Qua] = "In Progress",
  [Ngay_Du_Kien_Dong] - TODAY() <= 7,
  [Ngay_Du_Kien_Dong] >= TODAY()
)
```

**Action:** Push notification + Email cho sale và manager

### Automation 4: Tổng Kết Tuần (Weekly Summary)

**Trigger:** Scheduled - Mỗi thứ 6 lúc 17:00

**Action:** Gửi email tổng kết cho từng sale:
- Số deal mới trong tuần
- Số deal đã đổi stage
- Deals cần follow up

---

## 6. Security & Phân Quyền

### Cấu hình Security Filters

**Sale thông thường - chỉ xem deal của mình:**
```
DEALS: [Sale_PIC] = USEREMAIL()
DEAL_ACTIVITIES: LOOKUP([Deal_ID], "DEALS", "Deal_ID", "Sale_PIC") = USEREMAIL()
TASKS: [Assigned_To] = USEREMAIL()
```

**Manager/Admin - xem tất cả:**
```
IN(USEREMAIL(), {"manager@company.com", "admin@company.com"})
```

### Role-based Access (dùng bảng USERS)

| Role | Quyền |
|------|-------|
| Sale | Xem/sửa deals của mình, thêm activity |
| Team Lead | Xem deals của cả team, không xóa |
| Manager | Full access, xem báo cáo |
| Admin | Full access + cấu hình hệ thống |

---

## 7. Actions (Nút Hành Động Nhanh)

Thêm các action button trong deal detail để sale thao tác nhanh:

### Action 1: Chuyển Stage Nhanh
- Tên: "Chuyển sang bước tiếp theo"
- Type: Data: set the value of some columns
- Set Stage = bước tiếp theo trong pipeline
- Confirmation: "Xác nhận chuyển deal sang [stage mới]?"

### Action 2: Ghi Nhanh Hoạt Động
- Tên: "+ Ghi hoạt động"
- Type: App: go to another view
- Target: Form view của DEAL_ACTIVITIES
- Pre-fill: Deal_ID = [Deal_ID], Ngay_Thuc_Hien = NOW()

### Action 3: Đánh Dấu Won/Lost
- Tên: "Đóng Deal"
- Type: Data: set the value of some columns
- Set Ket_Qua, Stage = "Đã Đóng", Ngay_Cap_Nhat_Stage = NOW()

### Action 4: Tạo Task Follow-up
- Tên: "Tạo Nhắc Việc"
- Type: App: go to another view
- Pre-fill thông tin deal vào form TASKS

---

## 8. Reports và KPI Dashboard

### Virtual Columns Hỗ Trợ Báo Cáo

Thêm các virtual column vào bảng DEALS:

**So_Ngay_O_Stage:**
```
TODAY() - DATE([Ngay_Cap_Nhat_Stage])
```

**Canh_Bao_Tre:**
```
IF([So_Ngay_O_Stage] > 7, "Cần chú ý", "Bình thường")
```

**Gia_Tri_Weight:**
```
[Gia_Tri_Du_Kien] * [Xac_Suat_Chot]
```

### Slice cho Dashboard

**Slice "Deals Tôi Cần Làm Ngay":**
```
AND(
  [Sale_PIC] = USEREMAIL(),
  [Ket_Qua] = "In Progress",
  [So_Ngay_O_Stage] >= 3
)
```

**Slice "Pipeline Tháng Này":**
```
AND(
  MONTH([Ngay_Du_Kien_Dong]) = MONTH(TODAY()),
  YEAR([Ngay_Du_Kien_Dong]) = YEAR(TODAY()),
  [Ket_Qua] = "In Progress"
)
```

---

## 9. Hướng Dẫn Triển Khai Từng Bước

### Bước 1: Chuẩn Bị Google Sheets (30 phút)
1. Tạo file Google Sheets mới
2. Tạo 4 sheet: DEALS, DEAL_ACTIVITIES, CUSTOMERS, TASKS, USERS
3. Điền header theo cấu trúc ở mục 3
4. Nhập 5-10 deal mẫu để test

### Bước 2: Tạo App AppSheet (1 giờ)
1. Vào appsheet.com, đăng nhập bằng Google
2. New App → Start with existing data → Google Sheets
3. Chọn file vừa tạo
4. Cấu hình kiểu dữ liệu cho từng cột

### Bước 3: Thiết Kế Views (2 giờ)
1. Tạo Kanban/Deck view nhóm theo Stage
2. Tạo Detail view với inline related tables
3. Tạo Dashboard với charts
4. Cấu hình navigation menu

### Bước 4: Cài Đặt Automation (1 giờ)
1. Tạo bot nhắc nhở hàng ngày
2. Tạo bot ghi lịch sử khi đổi stage
3. Test automation với deal thử

### Bước 5: Phân Quyền (30 phút)
1. Cấu hình Security Filters
2. Test với 2-3 account khác nhau

### Bước 6: Training (1 buổi)
1. Hướng dẫn sale cách thêm deal, cập nhật stage
2. Hướng dẫn manager xem dashboard
3. Thiết lập quy trình: mỗi cuộc gặp/gọi phải log activity

---

## 10. Mẹo Thực Tế để Sale Không Quên Cập Nhật

1. **Quy tắc 5 phút**: Sau mỗi cuộc gọi/gặp, dành 5 phút ghi activity ngay trên app
2. **Morning review**: Mỗi sáng, sale xem màn hình "Deals cần chú ý" trước khi làm việc
3. **KPI gắn với app**: Gắn số deal đã cập nhật vào KPI tuần/tháng của sale
4. **Notification push**: Bật notification trên điện thoại để nhận nhắc nhở kịp thời
5. **Quick log**: Tạo shortcut vào app trên màn hình điện thoại, đặt widget AppSheet

---

## 11. Tổng Chi Phí và Lựa Chọn Plan

| Plan | Giá | Phù hợp |
|------|-----|---------|
| Starter (Free) | $0/tháng | 1 app, tối đa 10 users, đủ dùng cho team nhỏ |
| Core | $5/user/tháng | Automation nâng cao, nhiều app hơn |
| Enterprise | Liên hệ | Team lớn, bảo mật cao |

**Khuyến nghị**: Bắt đầu với plan Free để test, sau khi team adopt thì nâng cấp lên Core để dùng đầy đủ Automation.

---

## 12. Kết Luận

Module Pipeline Sale này giải quyết trực tiếp vấn đề của bạn:

- **Sale quên cập nhật**: Automation nhắc nhở sau 3 ngày không hoạt động, giao diện mobile đơn giản để log nhanh
- **Không biết deal đang ở đâu**: Kanban view trực quan theo stage, dashboard tổng quan cho manager
- **Mất lịch sử**: Mọi thay đổi stage đều tự động ghi vào DEAL_ACTIVITIES
- **Khó quản lý team**: Manager xem được toàn bộ pipeline, filter được theo sale/stage/thời gian

Thời gian triển khai ước tính: **1-2 ngày** cho phiên bản MVP đầy đủ chức năng cơ bản.
