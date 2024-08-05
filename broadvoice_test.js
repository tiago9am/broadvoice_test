const { Builder } = require('selenium-webdriver');
require('chromedriver');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Your selenium script goes here
    await driver.get('https://www.leyaonline.com/pt/');
  } finally {
    // Close the browser
    await sleep(5000);

    await driver.quit();
  }
})();
