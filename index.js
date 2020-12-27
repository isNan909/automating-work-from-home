const puppeteer = require('puppeteer');

(async () => {
  const browserLaunch = await puppeteer.launch();
  const page = await browserLaunch.newPage();
  await page.goto('https://vyaguta.lftechnology.com/api/auth/login');
  await page.screenshot({ path: 'screenshots/example.png' });

  await browserLaunch.close();
})();
