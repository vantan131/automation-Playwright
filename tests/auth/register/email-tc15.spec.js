import { test, expect } from '@playwright/test';

test('tc15: Kiểm tra khi nhập email đã tồn tại ', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Chuyển sang tab Email
  await page1.getByRole('radio', { name: /email/i }).check().catch(async () => {
    await page1.locator('span', { hasText: /email/i }).click();
  });

  // Nhập email đã tồn tại
  const emailInput = page1.getByRole('textbox', { name: /Tên đăng nhập hoặc Email/i });
  await emailInput.fill('testmailboxabvip@gmail.com');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Kiểm tra: input email biến mất (vì chuyển sang form mật khẩu)
  await expect(emailInput).toBeHidden();

  // Kiểm tra: input mật khẩu xuất hiện
  const passwordInput = page1.getByRole('textbox', { name: /Mật khẩu/i });
  await expect(passwordInput).toBeVisible();

  console.log('chuyển đến form đăng nhập và trường email disable');
});
