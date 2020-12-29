const puppeteer = require('puppeteer');
const cron = require('node-cron');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

taskMorning = [
  'Work on the sprint task and reporting to the team stand up',
  'Work on the remaining task from yesterday',
  'Work on optimizing and refactoring the code',
  'Complete and be prepare for the upcomming sprint task',
  'Add some functionality to the current working module',
];

taskEvening = [
  'Worked on the sprint task and reporting to the team stand up',
  'Worked on the remaining task from yesterday',
  'Worked on optimizing and refactoring the code',
  'Completing and be prepare for the upcomming sprint task',
  'Adding some functionality to the current working module',
];

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

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

Array.prototype.randomize = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const vyagutaLeaveMorning = async (page) => {
  await page.goto('https://vyaguta.lftechnology.com/leave/wfh/apply');
  await page.type('input[name=availability]', '9 to 6');
  await delay(2000);
  await page.type('textarea[name=taskToDo]', taskMorning.randomize());
  await delay(2000);
  await page.click('label.morale-label');
  await delay(2000);
  // Work from home submission
  await page.click('.action-bar-footer--bordered-top button[type="submit"]');
};

cron.schedule('15 9 * * 1-5', () => {
  //   console.log(
  //     'I want to run this at 9:15am every monday, tuesday, wednesday, Thursday and Friday'
  //   );
  (async () => {
    const browserLaunch = await puppeteer.launch({ headless: true });
    const page = await browserLaunch.newPage();
    await page.goto('https://vyaguta.lftechnology.com/api/auth/login');
    await page.click('#loginButton');

    enterEmail(page);
    await delay(4000);
    enterPassword(page);

    await Promise.all([page.waitForNavigation()]);

    try {
      vyagutaLeaveMorning(page);
    } catch {
      console.log('Work From Home cannot be applied !');
    }
    await browserLaunch.close();
  })();
});

const vyagutaLeaveEvening = async (page) => {
  await page.goto('https://vyaguta.lftechnology.com/leave/wfh/apply');
  await delay(2000);
  await page.click('div.action-bar__btnarea button:first-child');
  await delay(4000);
  await page.type('textarea[name=taskDone]', taskEvening.randomize());
  await delay(6000);
  // Work from home submission
  await page.click('.action-bar-footer--bordered-top button[type=button]');
};

cron.schedule('15 18 * * 1-5', () => {
  //   console.log(
  //     'I want to run this at 6:15pm every monday, tuesday, wednesday, Thursday and Friday'
  //   );
  (async () => {
    const browserLaunch = await puppeteer.launch({ headless: true });
    const page = await browserLaunch.newPage();
    await page.goto('https://vyaguta.lftechnology.com/api/auth/login');
    await page.click('#loginButton');

    enterEmail(page);
    await delay(4000);
    enterPassword(page);

    await Promise.all([page.waitForNavigation()]);
    try {
      vyagutaLeaveEvening(page);
    } catch {
      console.log('Work From Home cannot be applied !');
      // Send a email to my inbox
    }
    await browserLaunch.close();
  })();
});
