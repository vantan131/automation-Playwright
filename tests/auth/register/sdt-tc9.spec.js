import { test, expect } from '@playwright/test';

test('TC9: Kiểm tra khi nhập thiếu số điện thoại thì hiển thị thông báo "Số điện thoại không hợp lệ"', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Mở popup đăng nhập
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Nhập thiếu số điện thoại
  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });
  await phoneInput.fill('077759474'); // thiếu số

  // Click nút Tiếp tục
  const continueBtn = page1.getByRole('button', { name: 'Tiếp tục' });
  await continueBtn.click();

  // ✅ Kiểm tra thông báo lỗi hiển thị
  const errorMsg = page1.getByText('Số điện thoại không hợp lệ');
  await expect(errorMsg).toBeVisible();
});
