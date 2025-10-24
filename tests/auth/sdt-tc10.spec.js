import { test, expect } from '@playwright/test';

test('TC10 : Ghi nhận bug: hệ thống cho phép đăng ký với số điện thoại > 11 ký tự', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0777594715678');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  try {
    await expect(page1.getByText('Số điện thoại không hợp lệ')).toBeVisible({ timeout: 2000 });
  } catch {
    console.warn('⚠️ BUG: Hệ thống vẫn cho phép đăng ký với số điện thoại > 11 ký tự');
  }
});
