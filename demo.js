const puppeteer = require('puppeteer');

(async () => {
  const browserLaunch = await puppeteer.launch({ headless: false });
  const page = await browserLaunch.newPage();
  await page.goto('https://vyaguta.lftechnology.com/api/auth/login');
  await page.click('#loginButton');
  enterEmail(page);
  enterPassword(page);

  // navigate to Leave page
})();

enterEmail = async (page) => {
  await page.waitForSelector('input');
  await page.type('input', process.env.VYAGUTA_EMAIL);
  if (((i = 0), i < 3, i++)) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
};

const enterPassword = async (page) => {
  await page.waitForSelector('input[type=password]');
  await page.type('input[type=password]', process.env.VYAGUTA_PASSWORD);

  if (((i = 0), i < 3, i++)) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
};
