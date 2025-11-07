// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // ❌ Không nên chạy song song khi test production
  forbidOnly: !!process.env.CI,
  retries: 1, // thử lại 1 lần nếu fail
  workers: 1, // chỉ 1 worker để tránh spam production
  reporter: [['html', { open: 'never' }]],

  use: {
    storageState: 'auth.json', // 🔥 Dùng lại phiên đăng nhập
    baseURL: 'https://nghiatestsaas.beeiq.co', // domain production của bạn
    actionTimeout: 0,
    navigationTimeout: 45 * 1000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      slowMo: 300, // chậm thao tác cho dễ theo dõi
      headless: false, // mở trình duyệt thật để bạn nhìn thấy
    },
  },

  timeout: 120 * 1000,
  expect: { timeout: 15 * 1000 },

  projects: [
    {
      name: 'production-test',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});


