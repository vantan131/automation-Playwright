// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Không nên chạy song song khi test production */
  fullyParallel: false,

  /* Ngăn commit code có test.only */
  forbidOnly: !!process.env.CI,

  /* Thử lại 2 lần nếu fail (CI chậm hơn local nhiều) */
  retries: process.env.CI ? 2 : 1,

  /* Chạy 1 worker để tránh tạo nhiều tab lên production */
  workers: process.env.CI ? 1 : 1,

  /* Báo cáo kết quả */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'https://nghiatestsaas.beeiq.co',

    /* Giữ session đăng nhập nếu có file auth.json */
    // storageState: 'auth.json',

    /* Timeout cho thao tác */
    actionTimeout: 15 * 1000,
    navigationTimeout: 60 * 1000,

    /* Cấu hình hỗ trợ debug khi fail */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    /* Môi trường chạy */
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      headless: process.env.CI ? true : false, // CI chạy headless, local thì thấy trình duyệt
      slowMo: process.env.CI ? 0 : 300, // local chạy chậm cho dễ quan sát
    },
  },

  /* Timeout toàn bộ 1 test (CI thường bị chậm) */
  timeout: 180 * 1000,

  expect: {
    timeout: 20 * 1000,
  },

  projects: [
    {
      name: 'production-test',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
