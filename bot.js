const puppeteer = require('puppeteer');
const fs = require("fs/promises")


const testFunc = async () => {
    
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://animepahe.com/anime/55c339dc-7c29-ca18-e6b3-93c0cd1614c9');
  await page.screenshot({ path: 'test.png' });

  const episodes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".play")).map(x => x.textContent)
  })
  console.log(episodes);
  await fs.writeFile("episodes.txt", episodes.join("\r\n"))

  await browser.close();
}

testFunc()
    .catch(console.error)
    .then(() => console.log("we do cleanup here"));
