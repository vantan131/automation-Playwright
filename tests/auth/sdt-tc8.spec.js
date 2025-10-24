import { test, expect } from '@playwright/test';

test('TC8: kiểm tra khi nhập đúng số điện thoại thì nút Tiếp tục được bật (enable)', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Mở popup đăng nhập
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Nhập số điện thoại hợp lệ
  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });
  await phoneInput.fill('0358693739');

  // Lấy nút "Tiếp tục"
  const continueBtn = page1.getByRole('button', { name: 'Tiếp tục' });

  // ✅ Kiểm tra rằng nút không bị disable
  await expect(continueBtn).toBeEnabled();

  // Click để qua bước tiếp theo
  await continueBtn.click();
});
