const { test, expect } = require('@playwright/test');

// test.use({ headless: false, slowMo: 300 }); // 🔹 mở trình duyệt thật + chậm lại để dễ theo dõi
//test.use({viewport:{width:1500,height:1000}})
test('Valid Login', async ({ page }) => {
    await page.goto('https://www.antbuddy.com/');

});
