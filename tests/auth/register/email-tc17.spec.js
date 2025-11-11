import { test, expect } from '@playwright/test';

test('TC17: kiểm tra khi nhập định dạng sai email', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await popupPromise;

  // Chọn đăng nhập bằng Email
  await page1.locator('input[type="radio"][value="email"]').first().check();

  // Nhập email không hợp lệ
  const emailInput = page1.getByRole('textbox', { name: /Tên đăng nhập hoặc Email/i });
  await emailInput.fill('sad @gmail.com');
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();

  // Kiểm tra hiển thị lỗi
  await expect(page1.getByText('Email không hợp lệ')).toBeVisible();

  // Kiểm tra nút bị disable
  const continueBtn = page1.getByRole('button', { name: 'Tiếp tục' });
  await expect(continueBtn).toBeDisabled();

  // ✅ Kiểm tra màu viền có tone đỏ (thay vì so tuyệt đối)
  const borderColor = await emailInput.evaluate(el => getComputedStyle(el).borderColor);
  console.log('👉 Border color thực tế:', borderColor);

  const [r, g, b] = borderColor.match(/\d+/g).map(Number);

  // Cho phép CI hoặc local có sai số nhẹ
  expect(r).toBeGreaterThan(g + 10);
  expect(r).toBeGreaterThan(b + 10);
});
