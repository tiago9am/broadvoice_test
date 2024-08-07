/*Scenario 05:

Change the background to dark mode.
Check if the dark mode has been successfully applied to the website.*/


const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function scenario_01() {
    // Create Chrome options
    let chromeOptions = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').build();
    const term_to_search = "1984";
    const book_to_find = "1984";

    try {
        await driver.get('https://www.leyaonline.com/pt/'); // Go to website
        console.log('Navigated to Leyaonline');
        await driver.sleep(5000);

        let cookieAcceptButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cookiescript_accept"]')), 10000);
        await driver.wait(until.elementIsVisible(cookieAcceptButton), 10000);
        await driver.wait(until.elementIsEnabled(cookieAcceptButton), 10000);

        await cookieAcceptButton.click(); // Click the cookie consent button
        await driver.sleep(10000);

        // Locate and click the dark mode toggle button
        let darkModeToggleButton = await driver.wait(until.elementLocated(By.id('darkmode')), 10000);
        await darkModeToggleButton.click();
        console.log('Clicked the dark mode toggle button');
        await driver.sleep(2000); // Wait for the toggle action to complete

        // Check the current mode
        let isSunIconVisible = await driver.findElements(By.className('nav-icon icon-sun'));
        let isMoonIconVisible = await driver.findElements(By.className('nav-icon icon-moon'));
        if (isMoonIconVisible.length > 0) {
            console.log('Change to dark mode worked.')
        } else if (isSunIconVisible.length > 0) {
            console.log('Change to dark mode failed.')
        } else {
            console.log('Mode not determinade.')
        }

        await driver.sleep(2000); // Wait for the transition to complete




    } catch (error) {
        console.error('An error occurred:', error);

    } finally {
        await driver.quit();
        console.log('Closed browser');
    }
})();