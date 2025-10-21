const { test, expect } = require('@playwright/test')
////truyen page can tesst////
test('Verify Application Title ',async function({page}){
    //   expect(12).toBe(12)
    ///moi buoc ta them await/
    await page.goto("https://google.com")

    const url = await page.url()

    console.log("Tilte is "+url)

    const title =  await page.title()

    console.log("Tilte is "+title)

    await expect(page).toHaveTitle("Yahoo")
})