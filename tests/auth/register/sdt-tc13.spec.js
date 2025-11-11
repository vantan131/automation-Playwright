import { test, expect } from '@playwright/test';

// Bug known: hệ thống không hiển thị lỗi khi nhập đầu số sai
test.fail(true, 'Known issue [BUG-1023]: Invalid phone prefix not validated');

test('Kiểm tra khi nhập sai đầu số (SĐT không thuộc nhà mạng nào)', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0612345678');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  await expect(page1.locator('text=/số điện thoại không hợp lệ/i')).toBeVisible({ timeout: 5000 });
});
