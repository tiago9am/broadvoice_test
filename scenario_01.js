/*Scenario 01:

Search for George.
Verify that the book "O Triunfo dos Porcos" is displayed on the list.
Confirm that the book description contains the words "Quinta Manor."*/

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function scenario_01() {
    // Create Chrome options
    let chromeOptions = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').build();
    const term_to_search = "George";
    const book_to_find = "O Triunfo dos Porcos";
    const word_descripton_to_find = "Quinta Manor";

    try {
        await driver.get('https://www.leyaonline.com/pt/'); // Go to website
        console.log('Navigated to Leyaonline');
        await driver.sleep(5000);

        //Accepting cookies
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

        // Check for 'O Triunfo dos Porcos' in book-titles
        let testPassed = false;
        for (let bookTitle of bookTitles) {
            let titleText = await bookTitle.getText();
            if (titleText.includes(book_to_find)) {
                testPassed = true;
                break;
            }
        }

        // Print the result based on the flag of testPassed
        if (testPassed) {
            console.log(`Test passed: "${book_to_find}" is displayed`);
        } else {
            console.log(`Test failed: "${book_to_find}" is not displayed`);
        }


        // Click on book title to check description
        await driver.sleep(10000);
        let bookTitleElement = await driver.wait(until.elementLocated(By.xpath(`//h6[@class='book-title' and normalize-space(text())='${book_to_find}']`)), 10000);
        await driver.wait(until.elementIsVisible(bookTitleElement), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", bookTitleElement);
        await driver.executeScript("arguments[0].click();", bookTitleElement);
        //await bookTitleElement.click();
        console.log(`Clicked on the book title "${book_to_find}"`);
        await driver.wait(until.elementLocated(By.css('section.sinopse')), 10000);
        let sectionText = await driver.findElement(By.css('section.sinopse')).getText();
        console.log('Section text retrieved');

        // Check if the section text contains the words "Quinta Manor"
        if (sectionText.includes(word_descripton_to_find)) {
            console.log(`Test passed: Section text contains "${word_descripton_to_find}"`);
        } else {
            console.log(`Test failed: Section text does not contain "${word_descripton_to_find}"`);
        }

    } catch (error) {
        console.error('An error occurred:', error);

    } finally {
        await driver.quit();
        console.log('Closed browser');
    }
})();
