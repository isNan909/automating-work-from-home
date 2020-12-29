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

  vyagutaLeave(page);

  //await browserLaunch.close();
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

Array.prototype.randomize = function () {
  return this[Math.floor(Math.random() * this.length)];
};

task = [
  'Work on the sprint task and reporting to the team stand up',
  'Work on the remaining task from yesterday',
  'Work on optimizing and refactoring the code',
  'Complete and be prepare for the upcomming sprint task',
  'Add some functionality to the current working module',
];

const vyagutaLeave = async (page) => {
  await page.goto('https://vyaguta.lftechnology.com/leave/wfh/apply');
  await page.type('input[name=availability]', '9 to 6');
  await delay(2000);
  await page.type('textarea[name=taskToDo]', task.randomize());
  await delay(2000);
  await page.click('label.morale-label');
  await delay(2000);
  // uncomment if we you want the work from home submission
  await page.click('.action-bar-footer--bordered-top button[type="submit"]');
};
