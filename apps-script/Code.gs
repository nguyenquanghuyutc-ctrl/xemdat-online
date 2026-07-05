/**
 * Entry point của Web App. Chỉ nên được gọi từ GitHub Actions (server-to-
 * server), KHÔNG bao giờ gọi trực tiếp từ trình duyệt khách hàng — URL này
 * chỉ nên được lưu trong GitHub Secret, không hiển thị công khai.
 *
 * Cách deploy: Deploy > New deployment > loại "Web app" >
 * Execute as "Me", Who has access "Anyone".
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'listings';
  var payload;

  if (action === 'listings') {
    payload = { listings: getPublicListings() };
  } else {
    payload = { error: 'Unknown action: ' + action };
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
