import { test, expect } from '@playwright/test';

test('Kiểm tra khi nhập sai đầu số (SĐT không thuộc nhà mạng nào)', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });
  await phoneInput.fill('0612345678');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Nếu hệ thống không hiện thông báo lỗi -> fail test
  const errorMessage = page1.locator('text=/số điện thoại không hợp lệ/i');
  const hasError = await errorMessage.isVisible();

  // Nếu không có lỗi -> bug
  expect(hasError, ' BUG: Hệ thống cho phép đầu số không hợp lệ!').toBeTruthy();
});
