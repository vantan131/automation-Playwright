import { test, expect } from '@playwright/test';

test('kiểm tra chuyển ngôn ngữ english	', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Mở popup đăng nhập
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Thao tác đổi ngôn ngữ
  await page1.getByText('Đăng nhập/Đăng ký').click();
  await page1.getByText('Vui lòng chọn phương thức để').click();
  await page1.locator('#check-account-form #kc-form-buttons').click();
  await page1.getByText('Tiếng Việt').first().click();
  await page1.getByText('English').click();

  // Expect: text tiếng Anh xuất hiện
  await expect(page1.getByText('Log in/Sign up')).toBeVisible();
  await expect(page1.getByText('Please choose a method to')).toBeVisible();

  //Expect: text tiếng Việt biến mất (optional)
  await expect(page1.locator('body')).not.toContainText('Đăng nhập/Đăng ký');
  await expect(page1.locator('body')).not.toContainText('Vui lòng chọn phương thức để');
});
