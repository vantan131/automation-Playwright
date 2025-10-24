const {test,expect} = require('@playwright/test')
test('Login to Antbuddy successfully', async ({ page }) => {
  await page.goto('https://www.antbuddy.com/');
  // Bắt popup đúng cách
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Đăng nhập').click();
//   await page.pause(); // Dừng để debug
  const page1 = await page1Promise; // ⬅️ Lúc này mới có page1
  await page1.waitForTimeout(6000);
  await page1.locator('#check-account-form').getByText('Tên đăng nhập/Email').click();
  await page1.waitForTimeout(2000);
  await page1.locator('#usernameEmail').fill('testmailboxabvip@gmail.com')
//   await page.pause(); // Dừng để debug
  await page1.locator('#kc-form-buttons button:has-text("Tiếp tục")').click();
  await page1.locator('#password').fill('Ant@3332858')
  // Đợi nút “Đăng nhập” được kích hoạt
  await page1.locator('input[name="preLogin"]').waitFor({ state: 'visible' });
// Click nút “Đăng nhập”
  await page1.locator('input[name="preLogin"]').click(),
//   await page1.pause()
  await page1.waitForTimeout(5000); 
  await page1.waitForSelector('a.list-group-item', { timeout: 0 });
  await page1.locator('a:has-text("anhh Nghĩa 5 1")').click();
  await page1.locator('.dropdown.dropdown-list.profile-dropdown > a').click();
  await page1.waitForTimeout(3000); 
  //dang nhap thanh cong  se co link nay//
  await expect(page1).toHaveURL(/https:\/\/nghiatestsaas\.beeiq\.co\/#\/app\/unified_omni/);
  // await page1.getByText('Đăng xuất', { exact: true }).click();
  // await page.pause()
});

