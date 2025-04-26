const puppeteer = require('puppeteer');


const paths =__dirname+"./historyOverride";


const opts = {
  headless: false,
  devtools: true,
  args: [
    `--disable-extensions-except=${paths}`,
    `--load-extension=${paths}`,
    `--window-size=800,600`
  ]
};

(async () => {
  try {
    console.log('==>Open Browser');
    const browser = await puppeteer.launch(opts);

    console.log('==>Navigate to Extension');
    const [page] = await browser.pages();


    await page.goto('chrome://extensions/');

    console.log('==> Take Screenshot');
    await page.screenshot({ path: 'extension.png' });


    await page.evaluate(() => {
      alert('===== Exit =====');
    });
    await page.close();
    await browser.close();

  } catch (err) {
    console.error(err);
  }
})

