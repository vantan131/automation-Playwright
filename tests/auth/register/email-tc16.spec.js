import { test, expect } from '@playwright/test';

test('chuyển hướng sang trang đăng ký khi email chưa tồn tại', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  //  Chọn loại đăng nhập là Email (loại bỏ cái bị disable)
  await page1.locator('input[type="radio"][value="email"]:not([disabled])').first().check();

  //  Nhập email chưa tồn tại
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).fill('asdsad@gmail.comcom');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  //  Kiểm tra đã chuyển đến trang đăng ký
  await expect(page1).toHaveURL(/login-actions\/registration/);
});
