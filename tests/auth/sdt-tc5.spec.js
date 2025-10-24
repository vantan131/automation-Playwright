import { test, expect } from '@playwright/test';

test('TC_05 - kiểm tra khi nhập SĐT hợp lệ thì hiển thị form mật khẩu', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Chọn tab "Số điện thoại"
  await page1.getByText('Số điện thoại').first().click();

  // Nhập số điện thoại hợp lệ
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0358693739');

  // Click "Tiếp tục"
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Đợi trang xử lý và hiển thị form mật khẩu
  await page1.waitForSelector('#password', { timeout: 5000 });

  // ✅ Kiểm tra input mật khẩu xuất hiện
  await expect(page1.locator('#password')).toBeVisible();

  // ✅ (Tuỳ chọn) kiểm tra đúng loại input password
  await expect(page1.locator('#password')).toHaveAttribute('type', 'password');

  // ✅ (Tuỳ chọn) đảm bảo không phải trang đăng ký
  await expect(page1).not.toHaveURL(/register/);
});
