# PROPOSAL & BÁO GIÁ
## Hệ Thống Quản Lý Giao Dịch Bất Động Sản Công Nghiệp trên AppSheet

---

**Kính gửi:** Ban Lãnh Đạo [Tên Công Ty BĐS]

**Ngày:** 17/05/2026

**Người lập:** [Tên đơn vị tư vấn / phát triển]

**Mã số đề xuất:** PROP-2026-BDSCN-001

---

## MỤC LỤC

1. Tóm tắt điều hành
2. Phân tích nhu cầu & bài toán
3. Giải pháp đề xuất
4. Phạm vi công việc & tính năng hệ thống
5. Kiến trúc hệ thống
6. Lộ trình triển khai
7. Báo giá chi tiết
8. Điều khoản & điều kiện
9. Về đơn vị thực hiện

---

## 1. TÓM TẮT ĐIỀU HÀNH

Chúng tôi trân trọng gửi đến [Tên Công Ty BĐS] đề xuất xây dựng **Hệ Thống Quản Lý Giao Dịch Bất Động Sản Công Nghiệp** trên nền tảng AppSheet — một giải pháp no-code/low-code tiên tiến của Google, được thiết kế đặc biệt để đáp ứng nhu cầu vận hành của đội ngũ **10 sale** và **2 kế toán**.

Hệ thống sẽ số hóa toàn bộ quy trình từ tiếp nhận khách hàng, quản lý dự án/lô đất, theo dõi giao dịch, đến báo cáo doanh thu và kiểm soát hoa hồng — giúp công ty nâng cao hiệu suất làm việc, giảm thiểu sai sót thủ công và có cái nhìn toàn diện, tức thời về hiệu quả kinh doanh.

**Điểm nổi bật của giải pháp:**
- Triển khai nhanh: 6–8 tuần
- Chi phí hợp lý, không cần đầu tư hạ tầng server
- Hoạt động trên mobile (iOS/Android) và desktop
- Dữ liệu lưu trữ an toàn trên Google Workspace
- Dễ mở rộng khi công ty phát triển

---

## 2. PHÂN TÍCH NHU CẦU & BÀI TOÁN

### 2.1 Thực trạng phổ biến của công ty BĐS công nghiệp

Qua quá trình tìm hiểu, chúng tôi nhận thấy các công ty BĐS công nghiệp thường gặp phải những thách thức sau:

| Vấn đề | Hậu quả |
|--------|---------|
| Quản lý thông tin khách hàng phân tán (Excel, Zalo, ghi chú) | Mất khách, trùng lặp dữ liệu |
| Thiếu hệ thống theo dõi tiến độ giao dịch | Giao dịch "rơi" giữa các bước |
| Tính hoa hồng thủ công, dễ nhầm lẫn | Tranh chấp nội bộ, mất uy tín |
| Báo cáo doanh thu tốn thời gian, không real-time | Lãnh đạo thiếu thông tin ra quyết định |
| Quản lý quỹ đất/nhà xưởng không cập nhật | Sale báo sai tình trạng cho khách |
| Kế toán không có đầy đủ hồ sơ giao dịch | Chậm trễ xuất hóa đơn, theo dõi công nợ |

### 2.2 Đặc thù BĐS công nghiệp cần lưu ý

- Giá trị giao dịch lớn (tỷ đồng/USD), quy trình phê duyệt nhiều cấp
- Khách hàng thường là doanh nghiệp FDI, cần hồ sơ pháp lý phức tạp
- Giao dịch kéo dài (3–18 tháng), cần theo dõi nhiều mốc quan trọng
- Hoa hồng có thể chia nhiều đầu (sale chủ quản, sale hỗ trợ, giới thiệu)
- Quỹ đất/nhà xưởng cho thuê lẫn bán, cần phân loại rõ ràng

---

## 3. GIẢI PHÁP ĐỀ XUẤT

### 3.1 Tại sao AppSheet?

**AppSheet** là nền tảng phát triển ứng dụng no-code của Google, phù hợp hoàn hảo với quy mô và nhu cầu của công ty:

| Tiêu chí | AppSheet | Phần mềm truyền thống |
|----------|----------|----------------------|
| Chi phí triển khai | Thấp | Cao (custom software) |
| Thời gian ra mắt | 6–8 tuần | 6–12 tháng |
| Bảo trì | Đơn giản, tự chỉnh sửa | Phụ thuộc nhà cung cấp |
| Tích hợp Google Workspace | Hoàn hảo | Phức tạp |
| Mobile-first | Có | Tuỳ chọn |
| Phù hợp 10–50 người | Tối ưu | Quá lớn/phức tạp |

### 3.2 Kiến trúc tổng thể

```
[Google Sheets / Google Drive]  ← Nền tảng lưu trữ dữ liệu
         ↕
    [AppSheet App]
    ┌─────────────────────────────────┐
    │  Module 1: Quản lý Khách hàng  │
    │  Module 2: Quản lý Quỹ đất     │
    │  Module 3: Quản lý Giao dịch   │
    │  Module 4: Hoa hồng & Tài chính│
    │  Module 5: Báo cáo & Dashboard  │
    └─────────────────────────────────┘
         ↕
[Email / Google Chat Notifications]
```

---

## 4. PHẠM VI CÔNG VIỆC & TÍNH NĂNG HỆ THỐNG

### MODULE 1: QUẢN LÝ KHÁCH HÀNG (CRM)

**Dành cho:** Sale, Quản lý

**Tính năng:**
- Tạo & quản lý hồ sơ khách hàng (cá nhân/doanh nghiệp)
- Phân loại: khách tiềm năng, đang tư vấn, đã giao dịch
- Lịch sử liên lạc, ghi chú cuộc gọi/email
- Phân công khách hàng cho từng sale
- Cảnh báo follow-up tự động (nhắc nhở khi quá X ngày chưa liên hệ)
- Tìm kiếm & lọc theo ngành nghề, quy mô, nhu cầu diện tích
- Upload tài liệu khách hàng (NDA, hồ sơ pháp lý doanh nghiệp)

**Fields quan trọng:**
- Tên công ty, MST, địa chỉ, ngành nghề
- Người liên hệ, chức vụ, số điện thoại, email
- Nhu cầu: loại BĐS, diện tích, khu công nghiệp mục tiêu, ngân sách
- Nguồn khách hàng (referral, website, cold call, event)
- Mức độ ưu tiên (Hot/Warm/Cold)

---

### MODULE 2: QUẢN LÝ QUỸ ĐẤT & NHÀ XƯỞNG

**Dành cho:** Sale, Quản lý, Kế toán (xem)

**Tính năng:**
- Danh mục toàn bộ bất động sản đang chào bán/cho thuê
- Phân loại: đất KCN, nhà xưởng xây sẵn, nhà xưởng xây theo yêu cầu
- Trạng thái: Còn trống / Đang đặt cọc / Đã bán / Đang cho thuê
- Upload bản đồ, ảnh, tài liệu pháp lý từng lô
- Lịch sử giao dịch theo từng lô đất
- Cảnh báo khi đặt cọc/hợp đồng sắp hết hạn

**Fields quan trọng:**
- Mã lô, tên dự án, khu công nghiệp
- Diện tích đất, diện tích xây dựng
- Giá bán/cho thuê (USD/m² hoặc VND)
- Thời hạn sử dụng đất còn lại
- Chủ sở hữu/đơn vị quản lý
- Đặc điểm kỹ thuật (điện, nước, PCCC, cao độ nền...)

---

### MODULE 3: QUẢN LÝ GIAO DỊCH

**Dành cho:** Sale, Quản lý, Kế toán

**Tính năng:**
- Tạo giao dịch, liên kết với khách hàng + BĐS
- Pipeline trực quan: 7 giai đoạn giao dịch
- Upload & lưu trữ hợp đồng, biên bản
- Theo dõi mốc thời gian quan trọng
- Phê duyệt nhiều cấp (Sale → Trưởng phòng → Giám đốc)
- Cảnh báo deadline tự động qua email/notification
- Lịch sử thay đổi trạng thái (audit trail)

**7 Giai đoạn Pipeline:**
1. Khảo sát nhu cầu
2. Giới thiệu BĐS / Đi xem thực địa
3. Đàm phán điều khoản
4. Đặt cọc / LOI (Letter of Intent)
5. Ký hợp đồng chính thức
6. Thanh toán & Bàn giao
7. Hoàn tất / Hậu mãi

**Fields quan trọng:**
- Mã giao dịch (tự sinh)
- Sale phụ trách, sale hỗ trợ
- Giá trị giao dịch (bán/thuê)
- Loại giao dịch: Mua bán / Cho thuê
- Thời hạn hợp đồng thuê (nếu có)
- Ngày dự kiến ký hợp đồng
- Ghi chú đàm phán

---

### MODULE 4: HOA HỒNG & TÀI CHÍNH

**Dành cho:** Kế toán, Quản lý, Sale (xem phần của mình)

**Tính năng:**
- Tự động tính hoa hồng dựa trên quy tắc đã cấu hình
- Hỗ trợ chia hoa hồng nhiều đầu (% tùy chỉnh theo từng giao dịch)
- Theo dõi tiến độ thanh toán hoa hồng cho từng sale
- Quản lý thu tiền từ khách hàng (đặt cọc, từng đợt thanh toán)
- Xuất bảng tổng hợp hoa hồng theo tháng/quý
- Cảnh báo công nợ quá hạn

**Cấu trúc hoa hồng có thể cấu hình:**
- % hoa hồng trên giá trị giao dịch
- Phân chia: Sale chủ quản / Sale hỗ trợ / Giới thiệu nội bộ / Công ty
- Hoa hồng trả theo từng đợt thu tiền của khách

**Theo dõi thanh toán:**
- Lịch thanh toán (payment schedule)
- Số tiền đã thu / còn lại
- Ngày đến hạn từng đợt
- Trạng thái: Chưa đến hạn / Đến hạn / Quá hạn / Đã thu

---

### MODULE 5: BÁO CÁO & DASHBOARD

**Dành cho:** Quản lý, Kế toán

**Dashboard Realtime:**
- Tổng giao dịch theo tháng (số lượng & giá trị)
- Doanh thu thực hiện vs. kế hoạch
- Pipeline hiện tại (số giao dịch ở từng giai đoạn)
- Top sale theo doanh số
- Quỹ đất còn trống theo khu công nghiệp

**Báo cáo xuất được:**
- Báo cáo doanh số theo sale (tuần/tháng/quý)
- Báo cáo hoa hồng phải trả
- Báo cáo công nợ khách hàng
- Báo cáo tình trạng quỹ đất
- Báo cáo pipeline theo giai đoạn

---

### PHÂN QUYỀN HỆ THỐNG

| Vai trò | Quyền truy cập |
|---------|----------------|
| **Sale** | Xem/sửa khách hàng & giao dịch của mình, xem quỹ đất, xem hoa hồng của mình |
| **Trưởng phòng Sale** | Tất cả của Sale + xem toàn bộ team, phê duyệt giao dịch |
| **Kế toán** | Xem giao dịch đã được duyệt, quản lý thanh toán, hoa hồng, báo cáo tài chính |
| **Giám đốc / Admin** | Toàn quyền, xem tất cả dashboard, phê duyệt cấp cao |

---

## 5. KIẾN TRÚC HỆ THỐNG

### 5.1 Hạ tầng kỹ thuật

**Nền tảng:** AppSheet (Google Cloud)
**Lưu trữ dữ liệu:** Google Sheets (có thể nâng cấp lên Google Cloud SQL)
**Tài liệu/File:** Google Drive
**Email tự động:** Gmail API / AppSheet Automation
**Xác thực người dùng:** Google Account (SSO)

### 5.2 Cấu trúc dữ liệu (Google Sheets)

```
Sheet 1: KhachHang         - Hồ sơ khách hàng
Sheet 2: BatDongSan        - Danh mục quỹ đất & nhà xưởng
Sheet 3: GiaoDich          - Giao dịch
Sheet 4: ChiTietThanhToan  - Lịch sử thanh toán
Sheet 5: HoaHong           - Bảng hoa hồng
Sheet 6: NguoiDung         - Danh sách user & phân quyền
Sheet 7: DanhMuc           - Bảng mã (KCN, loại BĐS, nguồn KH...)
Sheet 8: LichSuHoatDong    - Audit log
```

### 5.3 Tự động hóa (Automations)

- **Tự động thông báo** khi giao dịch chuyển giai đoạn
- **Nhắc nhở follow-up** khách hàng sau X ngày không liên hệ
- **Cảnh báo đến hạn** thanh toán (trước 3 ngày, 1 ngày)
- **Tự động tính hoa hồng** khi cập nhật trạng thái giao dịch
- **Email tóm tắt hàng tuần** gửi cho quản lý
- **Thông báo có giao dịch mới** cần phê duyệt

---

## 6. LỘ TRÌNH TRIỂN KHAI

### Tổng thời gian: 7 tuần

| Tuần | Giai đoạn | Công việc chính |
|------|-----------|-----------------|
| **Tuần 1** | Khảo sát & thiết kế | Thu thập yêu cầu chi tiết, xác nhận quy trình nghiệp vụ, thiết kế cấu trúc dữ liệu, prototype UI |
| **Tuần 2–3** | Phát triển core | Module KH, Quỹ đất, Giao dịch cơ bản |
| **Tuần 4** | Phát triển finance | Module Hoa hồng, Thanh toán, tự động hóa |
| **Tuần 5** | Dashboard & Reports | Xây dựng dashboard, báo cáo, phân quyền |
| **Tuần 6** | UAT & Training | Test với người dùng thực, chỉnh sửa, đào tạo |
| **Tuần 7** | Go-live & Hỗ trợ | Triển khai chính thức, nhập dữ liệu ban đầu, hỗ trợ vận hành |

### Checkpoint & bàn giao:
- **Cuối tuần 1:** Tài liệu thiết kế có chữ ký xác nhận
- **Cuối tuần 3:** Demo phiên bản beta, phản hồi lần 1
- **Cuối tuần 5:** Demo đầy đủ tính năng, phản hồi lần 2
- **Cuối tuần 7:** Bàn giao chính thức, tài liệu hướng dẫn

---

## 7. BÁO GIÁ CHI TIẾT

### 7.1 Chi phí phát triển (một lần)

| Hạng mục | Mô tả | Đơn giá | Số lượng | Thành tiền |
|----------|-------|---------|---------|-----------|
| **Khảo sát & Thiết kế** | Thu thập yêu cầu, vẽ wireframe, thiết kế CSDL | 5.000.000đ | 1 | 5.000.000đ |
| **Module Khách hàng (CRM)** | Phát triển đầy đủ tính năng module KH | 8.000.000đ | 1 | 8.000.000đ |
| **Module Quản lý BĐS** | Quỹ đất, nhà xưởng, trạng thái | 7.000.000đ | 1 | 7.000.000đ |
| **Module Giao dịch** | Pipeline 7 giai đoạn, phê duyệt, alert | 10.000.000đ | 1 | 10.000.000đ |
| **Module Hoa hồng & Tài chính** | Tính hoa hồng, theo dõi thanh toán | 10.000.000đ | 1 | 10.000.000đ |
| **Dashboard & Báo cáo** | 5 dashboard, 6 loại báo cáo | 8.000.000đ | 1 | 8.000.000đ |
| **Phân quyền & Bảo mật** | Cấu hình role, row-level security | 3.000.000đ | 1 | 3.000.000đ |
| **Tự động hóa (Automation)** | 6 luồng tự động, email notification | 5.000.000đ | 1 | 5.000.000đ |
| **Đào tạo người dùng** | Đào tạo 12 người (10 sale + 2 kế toán), tài liệu hướng dẫn | 4.000.000đ | 1 | 4.000.000đ |
| **Nhập dữ liệu ban đầu** | Hỗ trợ migrate dữ liệu từ Excel/file cũ | 3.000.000đ | 1 | 3.000.000đ |
| | | | **Tổng phát triển** | **63.000.000đ** |

### 7.2 Chi phí nền tảng AppSheet (hàng tháng/năm)

| Gói | Số lượng user | Giá/user/tháng | Chi phí tháng | Chi phí năm |
|-----|--------------|----------------|---------------|-------------|
| AppSheet Core | 12 users | ~$10/user | ~$120/tháng | ~$1.440/năm |
| (tương đương) | | | ~3.000.000đ/tháng | ~36.000.000đ/năm |

> Lưu ý: Giá AppSheet có thể thay đổi theo tỷ giá USD. Khuyến nghị ký gói năm để tiết kiệm ~20%.

### 7.3 Chi phí bảo trì & hỗ trợ (tùy chọn)

| Gói hỗ trợ | Nội dung | Chi phí/tháng |
|------------|----------|---------------|
| **Cơ bản** | Sửa lỗi phát sinh, hỗ trợ kỹ thuật qua chat (giờ hành chính) | 2.000.000đ |
| **Tiêu chuẩn** | Cơ bản + thêm 2 tính năng nhỏ/tháng, đào tạo user mới | 4.000.000đ |
| **Nâng cao** | Tiêu chuẩn + ưu tiên 24/7, thêm 4 tính năng/tháng, báo cáo tùy chỉnh | 7.000.000đ |

### 7.4 TỔNG HỢP CHI PHÍ

#### Phương án 1: Trọn gói năm đầu
| Khoản mục | Giá trị |
|-----------|---------|
| Chi phí phát triển (một lần) | **63.000.000đ** |
| AppSheet license 12 users (1 năm) | **~36.000.000đ** |
| Gói bảo trì Tiêu chuẩn (1 năm) | **48.000.000đ** |
| **Tổng năm đầu** | **~147.000.000đ** |
| **Từ năm thứ 2** (license + bảo trì) | **~84.000.000đ/năm** |

#### Phương án 2: Tối thiểu (không bảo trì)
| Khoản mục | Giá trị |
|-----------|---------|
| Chi phí phát triển (một lần) | **63.000.000đ** |
| AppSheet license 12 users (1 năm) | **~36.000.000đ** |
| **Tổng năm đầu** | **~99.000.000đ** |

### 7.5 Điều kiện thanh toán

| Đợt | Thời điểm | Tỷ lệ | Giá trị |
|-----|-----------|-------|---------|
| Đợt 1 | Ký hợp đồng | 40% | 25.200.000đ |
| Đợt 2 | Hoàn thành demo beta (cuối tuần 3) | 30% | 18.900.000đ |
| Đợt 3 | Bàn giao chính thức (cuối tuần 7) | 30% | 18.900.000đ |

*(Áp dụng cho phần chi phí phát triển 63.000.000đ)*

---

## 8. ĐIỀU KHOẢN & ĐIỀU KIỆN

### 8.1 Bảo hành
- **Thời gian bảo hành:** 3 tháng kể từ ngày bàn giao
- **Phạm vi bảo hành:** Sửa lỗi phát sinh từ quá trình phát triển (không bao gồm thay đổi yêu cầu mới)
- **Thời gian phản hồi lỗi:** Trong vòng 24 giờ làm việc

### 8.2 Quyền sở hữu & bảo mật dữ liệu
- Toàn bộ dữ liệu thuộc sở hữu của **[Tên Công Ty BĐS]**
- Dữ liệu được lưu trữ trên Google Workspace của khách hàng
- Đơn vị phát triển không lưu trữ dữ liệu kinh doanh của khách hàng
- Ký NDA (Non-Disclosure Agreement) trước khi bắt đầu dự án

### 8.3 Giới hạn phạm vi
- Báo giá trên áp dụng cho tối đa 12 users (10 sale + 2 kế toán)
- Nếu có yêu cầu phát sinh ngoài scope đã thống nhất, sẽ báo giá bổ sung
- Thay đổi yêu cầu sau khi đã xác nhận thiết kế có thể ảnh hưởng đến timeline và chi phí

### 8.4 Hiệu lực báo giá
- Báo giá có hiệu lực trong vòng **30 ngày** kể từ ngày lập
- Sau thời gian trên, vui lòng liên hệ để cập nhật báo giá mới nhất

### 8.5 Điều kiện tiên quyết từ phía khách hàng
- Cung cấp tài khoản Google Workspace (hoặc Gmail) cho toàn bộ nhân viên
- Cử 1 người đầu mối (Project Owner) phối hợp xuyên suốt dự án
- Phản hồi ý kiến trong vòng 3 ngày làm việc tại mỗi checkpoint
- Chuẩn bị dữ liệu Excel/file hiện có để migrate vào hệ thống mới

---

## 9. VỀ ĐƠN VỊ THỰC HIỆN

### Tại sao chọn chúng tôi?

**[Tên đơn vị phát triển]** là đơn vị chuyên tư vấn và phát triển giải pháp số hóa cho doanh nghiệp, với kinh nghiệm đặc biệt trong lĩnh vực bất động sản và AppSheet:

- Đội ngũ **AppSheet Certified Developer** được Google chứng nhận
- Đã triển khai hơn **[X] dự án AppSheet** cho các công ty BĐS, logistics, sản xuất
- Hiểu sâu nghiệp vụ BĐS công nghiệp (quy trình giao dịch, hoa hồng, pháp lý)
- Hỗ trợ sau triển khai bằng tiếng Việt, phản hồi nhanh

### Tham khảo dự án tương tự:
- Hệ thống CRM + Giao dịch cho Công ty BĐS XYZ (8 sale, 1 kế toán) — 2025
- Quản lý quỹ đất KCN cho Công ty ABC — 2024
- *(Sẵn sàng cung cấp case study và demo theo yêu cầu)*

---

## LỜI KẾT

Chúng tôi tin rằng giải pháp này sẽ giúp **[Tên Công Ty BĐS]** vận hành hiệu quả hơn, giảm thiểu rủi ro thất thoát giao dịch và nâng cao năng lực cạnh tranh trong lĩnh vực BĐS công nghiệp đang tăng trưởng mạnh tại Việt Nam.

**Bước tiếp theo được đề xuất:**
1. Sắp xếp buổi họp trình bày/demo (30–45 phút)
2. Ký NDA và hợp đồng nguyên tắc
3. Bắt đầu tuần khảo sát thiết kế

---

**Liên hệ:**

| | |
|--|--|
| **Đơn vị:** | [Tên công ty phát triển] |
| **Người phụ trách:** | [Tên Account Manager] |
| **Điện thoại:** | [Số điện thoại] |
| **Email:** | [Email] |
| **Website:** | [Website] |

---

*Tài liệu này mang tính bảo mật, chỉ dành cho [Tên Công Ty BĐS]. Vui lòng không chia sẻ cho bên thứ ba.*

---

**© 2026 [Tên đơn vị phát triển] — Chuyên gia giải pháp AppSheet cho Doanh nghiệp**
