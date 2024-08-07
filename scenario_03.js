/*Scenario 03:

Search for the book "1984."
Verify that the book "A Quinta dos Animais" is authored by the same author.*/

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function scenario_01() {
    // Create Chrome options
    let chromeOptions = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').build();
    const term_to_search = "1984";
    const book_to_find = "1984";
    const book_to_compare = "A Quinta dos Animais";

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

            let authorElement = await driver.wait(until.elementLocated(By.xpath("//a[@class='nome_autor']")), 10000);
            await driver.wait(until.elementIsVisible(authorElement), 10000);
            await authorElement.click();

            await driver.sleep(10000)

            // Locate the 'similar-books' section
            let similarBooksSection = await driver.wait(until.elementLocated(By.className('similar-books')), 10000);

            // Find all 'book-title' elements within the 'similar-books' section
            let bookTitleElements = await similarBooksSection.findElements(By.className('book-title'));

            let testPassedOtherBooks = false;
            for (let bookTitleElement of bookTitleElements) {
                let titleText = await bookTitleElement.getAttribute('innerText');
                if (titleText.includes(book_to_compare)) {
                    testPassedOtherBooks = true;
                    break;
                }
            }
            if (testPassedOtherBooks) {
                console.log(`Test passed: "${book_to_compare}" has the same author.`);
            } else {
                console.log(`Test failed: "${book_to_compare}" don't have the same author.`);
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