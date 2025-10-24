import { test, expect } from '@playwright/test';

test('TC7: kiểm tra khi bỏ trống trường nhập SĐT thì nút Tiếp tục bị disable', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');

  // Mở popup đăng nhập
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Lấy textbox nhập SĐT
  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });
  await phoneInput.waitFor({ state: 'visible', timeout: 5000 });

  // Kiểm tra để trống
  await expect(phoneInput).toHaveValue('');

  // Lấy nút "Tiếp tục"
  const continueBtn = page1.getByRole('button', { name: 'Tiếp tục' });

  // Kiểm tra nút bị disable (nếu dùng thuộc tính disabled)
  await expect(continueBtn).toBeDisabled();

  // Click thử vào nút (bắt buộc dùng force để tránh lỗi)
  await continueBtn.click({ force: true });

  //  Kiểm tra rằng vẫn ở trang check-account, KHÔNG bị điều hướng sang /authenticate
  await expect(page1).not.toHaveURL(/authenticate/);
});
