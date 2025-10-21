// import { test, expect } from '@playwright/test';

// test('Open Playwright website', async ({ page }) => {
//   await page.goto('https://playwright.dev');
//   await expect(page).toHaveTitle(/Playwright/);
// });
const { test, expect } = require('@playwright/test')
test('My first Test 1',async function({page}){
  expect(12).toBe(12)
})
test.skip('My firth Test 2',async function({page}){
  expect('tao la ai').toContain('taoo')
})
test('My second 1 Test',async function({page}){
  expect('tao la ai').toContain('tao')
  expect(true).toBeTruthy()
})

test('My second 2 Test',async function({page}){
  expect('tao la ai').toContain('taoo')
  expect(false).toBeFalsy()
})
test('My Third Test',async function({page}){
    expect('tao la ai').toContain('tao')

})
test('My final',async function({page}){
    expect("this is real".includes("real")).toBeTruthy()

})