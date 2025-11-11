import { test, expect } from '@playwright/test';

test('TC12 :Kiểm tra input SĐT tự lọc: khi fill chuỗi hỗn hợp thì chỉ giữ chữ số', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  
  // Mở popup đăng nhập
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  const phoneInput = page1.getByRole('textbox', { name: 'Số điện thoại Số điện thoại' });

  // Fill chuỗi có cả chữ và số
  await phoneInput.fill('561a561bXYZ%$#@#@%@#@#');

  // Lấy giá trị thật sự trong ô input
  const value = await phoneInput.inputValue();
  console.log(' Giá trị thực trong input:', value);

  // Kỳ vọng: chỉ còn lại chữ số
  await expect(phoneInput).toHaveValue('561561');
});
