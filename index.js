const puppeteer = require('puppeteer');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

(async () => {
  const browserLaunch = await puppeteer.launch({ headless: false });
  const page = await browserLaunch.newPage();
  await page.goto('https://vyaguta.lftechnology.com/api/auth/login');
  await page.screenshot({ path: 'screenshots/vyaguta-login.png' });
  await page.click('#loginButton');
  await page.screenshot({ path: 'screenshots/addEmail-google.png' });

  enterEmail(page);
  await delay(4000);
  enterPassword(page);

  await Promise.all([
    page.waitForNavigation(),
    page.screenshot({ path: 'screenshots/vyaguta.png' }),
  ]);

  await browserLaunch.close();
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const enterEmail = async (page) => {
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
