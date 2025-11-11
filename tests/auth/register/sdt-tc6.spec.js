import { test, expect } from '@playwright/test';

test('TC_06 - Kiểm tra icon hiển thị mật khẩu hoặc che mật khẩu	', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Bắt popup đăng nhập
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Điền SĐT để tới form mật khẩu
  await page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' }).fill('0358693739');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Chờ input mật khẩu xuất hiện
  const passwordInput = page1.locator('#password');
  await passwordInput.waitFor({ state: 'visible', timeout: 5000 });

  // Nhập mật khẩu (bổ sung bước bạn thiếu)
  const testPassword = '5156156156651';
  await passwordInput.fill(testPassword);

  // Kiểm tra ban đầu là type="password"
  await expect(passwordInput).toHaveAttribute('type', 'password');

  // Click nút hiển thị mật khẩu
  await page1.locator('.show-password').click();

  // Khi hiện mật khẩu, type = "text"
  await expect(passwordInput).toHaveAttribute('type', 'text');

  // (Tuỳ chọn) kiểm tra giá trị input đúng khi hiện (nhìn thấy value)
  await expect(passwordInput).toHaveValue(testPassword);

  // Click nút ẩn mật khẩu
  await page1.locator('.hide-password').click();

  // Khi ẩn mật khẩu, type = "password" trở lại
  await expect(passwordInput).toHaveAttribute('type', 'password');

  // (Tuỳ chọn) vẫn giữ giá trị nội dung input sau khi ẩn
  await expect(passwordInput).toHaveValue(testPassword);
});
