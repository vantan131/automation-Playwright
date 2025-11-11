import { test, expect } from '@playwright/test';

test('test ', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  await page1.locator('#check-account-form').getByText('Tên đăng nhập/Email').click();
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).fill('hoanguyen123@gmail.com');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();
  await page1.getByRole('textbox', { name: 'Mật khẩu' }).fill('123123');
  await page1.getByRole('textbox', { name: 'Mật khẩu' }).press('Enter');

  // ✅ Đợi trang login load xong
  await page1.waitForTimeout(5000);

  // ✅ Sau đó mới chuyển qua trang omni
  await page1.goto('https://hoanguyen.beeiq.co/#/app/omni', { waitUntil: 'domcontentloaded' });
  await expect(page1).toHaveURL('https://hoanguyen.beeiq.co/#/app/omni')
});
