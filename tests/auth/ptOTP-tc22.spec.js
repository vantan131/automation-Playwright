import { test, expect } from '@playwright/test';

test('kiểm tra text thông báo', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();

  const page1 = await popupPromise;
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0777594715');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Expect: có hiển thị thông báo chứa chuỗi này
  const message = page1.locator('span[ng-show="email.length > 0"]');
  await expect(message).toHaveText(/Bạn muốn nhận mã OTP qua số/);


});
