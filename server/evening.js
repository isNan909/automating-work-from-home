const puppeteer = require('puppeteer');
const cron = require('node-cron');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

cron.schedule('15 9 * * 1-5', () => {
  console.log(
    'I want to run this at 9:15am every monday, tuesday, wednesday, Thursday and Friday'
  );
});

(async () => {
  const browserLaunch = await puppeteer.launch({ headless: true });
  const page = await browserLaunch.newPage();
  await page.goto(process.env.VYAGUTA_LOGIN_ROUTE);
  await page.click('#loginButton');

  enterEmail(page);
  await delay(4000);
  enterPassword(page);

  await Promise.all([page.waitForNavigation()]);
  try {
    vyagutaLeave(page);
  } catch {
    console.log('Work From Home cannot be applied !');
    // Send a email to my inbox
  }
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
  let i = 0;
  for (i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
};

const enterPassword = async (page) => {
  await page.waitForSelector('input[type=password]');
  await page.type('input[type=password]', process.env.VYAGUTA_PASSWORD);

  let i = 0;
  for (i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }

  await page.keyboard.press('Enter');
};

Array.prototype.randomize = function () {
  return this[Math.floor(Math.random() * this.length)];
};

task = [
  'Worked on the sprint task and reporting to the team stand up',
  'Worked on the remaining task from yesterday',
  'Worked on optimizing and refactoring the code',
  'Completing and be prepare for the upcomming sprint task',
  'Adding some functionality to the current working module',
];

const vyagutaLeave = async (page) => {
  await page.goto(process.env.VYAGUTA_WFH_APPLY_ROUTE);
  await delay(2000);
  await page.click('div.action-bar__btnarea button:first-child');
  await delay(4000);
  await page.type('textarea[name=taskDone]', task.randomize());
  await delay(6000);
  // Work from home submission
  await page.click('.action-bar-footer--bordered-top button[type=button]');
};
