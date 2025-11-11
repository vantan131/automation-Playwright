import { test, expect } from '@playwright/test';

test('Kiểm tra có thể click vào nút WhatsApp Nhận mã OTP qua', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Nhập số điện thoại
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0777594715');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  //  Xác định nút WhatsApp
  const whatsappButton = page1.getByRole('button', { name: /WhatsApp Nhận mã OTP qua/i });

  //  Kiểm tra nút có hiển thị và có thể click
  await expect(whatsappButton).toBeVisible({ timeout: 10000 });
  await expect(whatsappButton).toBeEnabled();

  //  Click vào nút WhatsApp
  await whatsappButton.click();


});
