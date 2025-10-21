import { test, expect } from '@playwright/test';

test('codegen', async ({ page }) => {
  // test.setTimeout(120000);
  await page.goto('https://www.antbuddy.com/');
  // await page.waitForTimeout(200); // Đợi 5s
  
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Đăng nhập' }).click();
  const page1 = await page1Promise;
  
  await page1.locator('span').nth(5).click();
  // await page.waitForTimeout(200); // Đợi 5s
  
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).click();
  await page1.getByRole('textbox', { name: 'Tên đăng nhập hoặc Email Tên' }).fill('testmailboxabvip@gmail.com');
  // await page.waitForTimeout(200); // Đợi 5s
  
  await page1.getByRole('button', { name: 'Tiếp tục' }).click();
  await page1.getByRole('textbox', { name: 'Mật khẩu' }).fill('Ant@3332858');
  await page1.getByRole('textbox', { name: 'Mật khẩu' }).press('Enter');
  // await page.waitForTimeout(200); // Đợi 5s
  
  await page1.getByRole('link', { name: 'Company Logo anhh Nghĩa 5 1' }).click();
  page1.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page1.goto('https://nghiatestsaas.beeiq.co/#/app/unified_omni');
  await page1.locator('.dropdown.dropdown-list.profile-dropdown > a').click();
});