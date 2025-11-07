import { test, expect } from '@playwright/test';

test('Đăng nhập bằng OTP (mock) — chọn Zalo rồi hiển thị form đăng ký', async ({ page }) => {
  // Chặn tất cả request tới /session/* và trả giả lập kết quả phù hợp
  await page.route('**/session/**', async route => {
    const req = route.request();
    const url = req.url();

    // Khi client gọi API tạo/ gửi OTP qua ZNS
    if (url.endsWith('/session/otp-zns')) {
      // bạn có thể đọc body nếu cần: await req.postDataJSON()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
      return;
    }

    // Một số hệ thống có endpoint verify otp khác tên (ví dụ /session/verify-otp hoặc /session/verify)
    // Bắt luôn các request verify chứa "verify" hoặc "otp-verify"
    if (url.includes('verify') || url.includes('otp-verify')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, verified: true }),
      });
      return;
    }

    // Nếu không khớp, tiếp tục request bình thường
    await route.continue();
  });

  // Mở trang chính và nhấn Đăng nhập -> popup
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Nhập số điện thoại
  await page1.getByRole('textbox', { name: /Số điện thoại/ }).fill('0777594715');

  // Bước: chọn tuỳ chọn Zalo (nút có text "Zalo Nhận mã OTP qua ZNS" hoặc tương tự)
  // Dùng contains (/Zalo/) để bắt được variant text
  await page1.getByRole('button', { name: 'Zalo Nhận mã OTP qua ZNS' }).click();
  // Click nút "Nhận mã OTP" nếu có bước tách biệt (nếu nút Zalo chính là nhận OTP thì dòng này vẫn ổn)
  // Nếu giao diện có nút khác, locator này vẫn có thể bắt được vì dùng regex /Nhận mã OTP|Nhận mã/
  // await page1.getByRole('button', { name: /Nhận mã OTP|Nhận mã/ }).click();

  // Điền mã OTP (mock)
  const otp = ['9','6','3','7','6','1'];
  for (let i = 0; i < otp.length; i++) {
    // locator input[name="otp1"] ... tương tự như layout bạn dùng
    await page1.locator(`input[name="otp${i+1}"]`).fill(otp[i]);
  }

  // Click xác nhận (sẽ trigger route mock verify)
  await page1.getByRole('button', { name: /Xác nhận|Xac nhan/ }).click();

  // Expect: form đăng ký hiển thị (tìm text đặc trưng)
  await expect(page1.getByText(/Đăng ký|Tạo tài khoản|Tạo hồ sơ/i)).toBeVisible({ timeout: 10000 });
});
