import { test, expect } from '@playwright/test';

test('Kiểm tra nút Quay lại hoạt động', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // Nhập số điện thoại
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0777594715');
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).press('Enter');

  //  Xác định nút Quay lại
  const backButton = page1.getByRole('link', { name: /Quay lại/i });

  //  Kiểm tra nút hiển thị và có thể click
  await expect(backButton).toBeVisible({ timeout: 10000 });
  await expect(backButton).toBeEnabled();

  //  Click vào nút Quay lại
  await backButton.click();

  // (Tuỳ chọn) kiểm tra sau khi click có quay lại trang nhập số điện thoại
  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });
  await expect(phoneInput).toBeVisible();
});
