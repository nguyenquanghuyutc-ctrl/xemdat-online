# Website xem đất — BĐS Công Nghiệp Hoàng Hoắc Hải

Website tĩnh (host miễn phí trên GitHub Pages) hiển thị các lô đất đang rao bán cho khách hàng xem. Dữ liệu lấy tự động từ Google Sheet (do AppSheet quản lý), qua một lớp trung gian (Google Apps Script) để **lọc bỏ mọi thông tin nội bộ nhạy cảm** trước khi hiển thị công khai.

## Cấu trúc thư mục

```
apps-script/     Code Google Apps Script — dán vào Extensions > Apps Script trên Google Sheet
web/              Website (Vite + React + TypeScript + Tailwind CSS)
.github/workflows Workflow tự động build + deploy lên GitHub Pages
```

## Bước 1 — Deploy Google Apps Script (backend lọc dữ liệu)

1. Mở Google Sheet nguồn đất → menu **Extensions (Tiện ích mở rộng) → Apps Script**.
2. Xoá nội dung mặc định trong `Code.gs`, sau đó tạo từng file `.gs` trong thư mục `apps-script/` của repo này vào Apps Script (mỗi file trong repo = 1 file trong Apps Script, giữ nguyên tên): `Config.gs`, `SheetReader.gs`, `Filter.gs`, `ImageResolver.gs`, `Code.gs`, `Maintenance.gs`, `Test.gs`.
3. Mở `Config.gs`, kiểm tra lại các giá trị:
   - `STATUS_WHITELIST` — trạng thái nào được coi là "đang rao bán" và hiển thị công khai (mặc định `['1. Đang rao bán']`).
   - `SHOW_COMPANY_NAME` — đang để `false` (ẩn tên công ty) theo yêu cầu.
4. Chọn hàm `testListings` ở thanh công cụ trên cùng → bấm **Run (▶)**. Lần đầu chạy sẽ hiện hộp thoại xin quyền — bấm **Cho phép**, chọn đúng tài khoản Google đang sở hữu Sheet này.
5. Xem kết quả tại **View (Xem) > Logs** để chắc chắn JSON trả về đúng, không có SĐT/Gmail/tên chủ đất.
6. Chọn hàm `installDailyMaintenanceTrigger` → **Run** một lần để bật cơ chế tự động thu hồi quyền xem ảnh của các tin không còn công khai (chạy mỗi ngày lúc 2h sáng).
7. Bấm **Deploy (Triển khai) → New deployment (Triển khai mới)** → loại **Web app** → Execute as: **Me**, Who has access: **Anyone** → **Deploy**.
8. Copy **Web app URL** vừa tạo — đây là URL bí mật, chỉ dùng ở bước 3 bên dưới, **không** dán vào code hay chia sẻ công khai.
9. Mỗi khi sửa code trong Apps Script sau này, vào **Deploy → Manage deployments → Edit (bút chì) → Version: New version → Deploy** để cập nhật (URL vẫn giữ nguyên).

## Bước 2 — Đưa code lên GitHub

```bash
git init
git add .
git commit -m "Khởi tạo website xem đất"
git branch -M main
git remote add origin https://github.com/nguyenquanghuy-utc-ctrl/xemdat-online.git
git push -u origin main
```

(Nếu muốn đổi tên repo khác `xemdat-online`, nhớ sửa `base` trong `web/vite.config.ts` cho khớp.)

## Bước 3 — Thêm Secret chứa URL Apps Script

Vào repo trên GitHub → **Settings → Secrets and variables → Actions → New repository secret**:
- Name: `APPS_SCRIPT_URL`
- Value: URL Web app đã copy ở Bước 1.8

## Bước 4 — Bật GitHub Pages

Vào **Settings → Pages** → mục **Source** chọn **GitHub Actions**.

## Bước 5 — Chạy thử

Vào tab **Actions** của repo → chọn workflow **Build and deploy** → **Run workflow** để chạy lần đầu. Sau khi chạy xong (khoảng 1-2 phút), web sẽ có tại:

```
https://nguyenquanghuy-utc-ctrl.github.io/xemdat-online/
```

Từ nay web sẽ **tự động cập nhật dữ liệu mỗi 30 phút**. Nếu vừa thêm tin mới trong AppSheet và muốn thấy ngay trên web, vào tab **Actions → Run workflow** để cập nhật ngay lập tức, không cần đợi.

## Tuỳ chỉnh thương hiệu

- Tên thương hiệu, hotline, Zalo: sửa trong [`web/src/lib/constants.ts`](web/src/lib/constants.ts).
- Màu sắc chủ đạo (đang là xanh dương): sửa các biến `--color-brand-*` trong [`web/src/index.css`](web/src/index.css).
- Logo: hiện đang dùng chữ "H" đơn giản trong [`web/src/components/Header.tsx`](web/src/components/Header.tsx) — có thể thay bằng ảnh logo thật.

## Chạy thử trên máy tính (trước khi deploy)

```bash
cd web
npm install
npm run dev
```

Mặc định trang sẽ đọc dữ liệu mẫu tại `web/public/data/listings.json` — chỉ để xem giao diện, dữ liệu thật sẽ do workflow tự động ghi đè khi deploy.

## Đảm bảo an toàn thông tin

- Trình duyệt của khách **không bao giờ** gọi trực tiếp vào Google Sheet, Google Drive, hay Apps Script — chỉ đọc file JSON tĩnh do GitHub Actions tạo sẵn.
- Apps Script chỉ trả về đúng các trường: tiêu đề, địa chỉ, vị trí, diện tích, loại sổ, mục đích sử dụng, giá bán, ngày cập nhật, ảnh — **không bao giờ** trả chủ đất, SĐT/Gmail chủ đất, mã số thuế, tên công ty, tên nhân viên, ghi chú nội bộ, lịch sử cập nhật, hay trạng thái quy trình nội bộ.
- Chỉ tin có trạng thái nằm trong `STATUS_WHITELIST` (mặc định: "1. Đang rao bán") mới hiển thị; các tin khác (đang đàm phán, đã chốt, ngưng bán) không xuất hiện và ảnh của chúng sẽ tự động bị thu hồi quyền xem công khai.
