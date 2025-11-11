import { test, expect } from '@playwright/test';

test('Không nhập mã OTP thì không cho đăng ký', async ({ page }) => {
  // B1: Mở trang chính
  await page.goto('https://www.antbuddy.com/');

  // B2: Bắt popup đăng nhập
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;

  // B3: Nhập số điện thoại và gửi OTP
  await page1.getByRole('textbox', { name: /Số điện thoại/ }).fill('0777594715');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();
  await page1.getByRole('button', { name: /Nhận mã OTP qua/ }).click();

  // B4: KHÔNG nhập OTP → kiểm tra nút “Xác nhận”
  const confirmButton = page1.getByRole('button', { name: 'Xác nhận' });

  // ✅ Nếu nút bị disable
  await expect(confirmButton).toBeDisabled();

  // Hoặc nếu cho click nhưng hiện lỗi
  // await confirmButton.click();
  // await expect(page1.getByText(/Mã OTP|vui lòng nhập mã OTP|Mã OTP đã hết hạn/i)).toBeVisible();
});
