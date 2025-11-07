import { test, expect } from '@playwright/test';

test('Kiểm tra nhập email chưa tồn tại', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;
  await page1.locator('#check-account-form').getByText('Tên đăng nhập/Email').click();
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).click();
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).fill('dasdsadasdas@gmail.com');
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).press('Enter');
  ///waiting for link/
  await page1.waitForURL('**/login-actions/registration**', { timeout: 10000 });
  ///xac thuc co vao link khong//
  await expect(page1).toHaveURL(/login-actions\/registration/); 
});