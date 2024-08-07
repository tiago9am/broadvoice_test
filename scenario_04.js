/*Scenario 04:

Search for the book "1984."
Add the book to the basket.
Confirm that the number of items in the basket is "1."*/


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


        let searchBox = await driver.wait(until.elementLocated(By.id('searchbar-large')), 10000); // Check for searchbar 
        console.log('Found search bar');
        await driver.sleep(5000);

        await searchBox.sendKeys(term_to_search, Key.RETURN); // Enter submission
        console.log('Entered search term"', term_to_search, '"and submitted search');
        await driver.sleep(5000); // Wait 5 seconds to load page

        let bookTitles = await driver.findElements(By.className('book-title')); // Look for book-title class 

        let testPassed = false;
        for (let bookTitle of bookTitles) {
            let titleText = await bookTitle.getText();
            if (titleText.includes(book_to_find)) {
                testPassed = true;
                break;
            }
        }
        if (testPassed) {
            console.log('Book: "', book_to_find, '" was found.');
            await driver.sleep(10000);
            let bookTitleElement = await driver.wait(until.elementLocated(By.xpath(`//h6[@class='book-title' and normalize-space(text())='${book_to_find}']`)), 10000);
            await driver.wait(until.elementIsVisible(bookTitleElement), 10000);
            await driver.executeScript("arguments[0].scrollIntoView(true);", bookTitleElement);
            await driver.wait(until.elementIsEnabled(bookTitleElement), 10000); // Ensure the element is enabled

            await bookTitleElement.click();
            console.log(`Clicked on the book title "${book_to_find}"`);
            await driver.sleep(5000); // Wait for the book details page to load

            let addToBasketButton = await driver.wait(until.elementLocated(By.xpath("//div[@class='choose-op-item book']//a[@class='more buy-button'][normalize-space()='Comprar']")), 10000);
            await driver.wait(until.elementIsVisible(addToBasketButton), 10000);


            await driver.executeScript("arguments[0].scrollIntoView(true);", addToBasketButton); // Scroll to the button
            await driver.executeScript("arguments[0].click();", addToBasketButton); // Click using JavaScript

            console.log('Added book to basket');
            await driver.sleep(5000); // Wait for the basket update

            //////////////
            // Confirm the presence of the item in the basket
            let basketItems = await driver.wait(until.elementsLocated(By.className('addToCart-item')), 10000); // Locate items with class 'addToCart-item'
            let itemFound = false;
            for (let item of basketItems) {
                let itemName = await item.getText();
                if (itemName.includes(book_to_find)) {
                    itemFound = true;
                    break;
                }
            }

            if (itemFound) {
                console.log(`The item "${book_to_find}" is in the basket.`);
            } else {
                console.log(`The item "${book_to_find}" is NOT in the basket.`);
            }


        } else {
            console.log(`Book: "${book_to_find}" was not found.`);
        }




    } catch (error) {
        console.error('An error occurred:', error);

    } finally {
        await driver.quit();
        console.log('Closed browser');
    }
})();