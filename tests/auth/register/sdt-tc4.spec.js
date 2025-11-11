import { test, expect } from '@playwright/test';

test('TC_04 - kiểm tra khi nhập SDT không tồn tại ', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).click();
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('156165161');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page1).toHaveURL(/https:\/\/id\.antbuddy\.com\/auth\/realms\/production\.antbuddy\.com\/login-actions\/registration/);
});