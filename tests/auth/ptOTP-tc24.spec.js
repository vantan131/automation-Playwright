import { test, expect } from '@playwright/test';

test('Kiểm tra có thể click vào nút Zalo Nhận mã OTP qua ZNS', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0777594715');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  //  Expect: kiểm tra nút tồn tại và có thể click
  const zaloButton = page1.getByRole('button', { name: 'Zalo Nhận mã OTP qua ZNS' });
  await expect(zaloButton).toBeVisible({ timeout: 1000 }); // nút hiển thị
  await expect(zaloButton).toBeEnabled(); // nút có thể click

  //  Nếu nút hợp lệ → click
  await zaloButton.click();
});
