import { test, expect } from '@playwright/test';

test('Kiểm tra đổi ngôn ngữ từ English sang Tiếng Việt', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Mở popup đăng nhập
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Đổi ngôn ngữ sang English rồi quay lại Tiếng Việt
  await page1.getByText('Tiếng Việt').first().click();
  await page1.getByText('English').click();
  await page1.getByText('English').first().click();
  await page1.getByText('Tiếng Việt').click();

  //  Kiểm tra giao diện đã chuyển về tiếng Việt
  await expect(page1.getByText('Đăng nhập/Đăng ký')).toBeVisible();
  await expect(page1.getByText('Vui lòng chọn phương thức để')).toBeVisible();

  //  Kiểm tra text tiếng Anh biến mất (optional)
  await expect(page1.locator('body')).not.toContainText('Log in/Sign up');
  await expect(page1.locator('body')).not.toContainText('Please choose a method to');
});
