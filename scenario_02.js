/*Scenario 02:

Search for the book "1984."
Validate that the author is "George Orwell."
Confirm that the ISBN is "9789722071550."
Check that the number of pages is "344."
Ensure that the dimensions of the book are "235 x 157 x 23 mm." */

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function scenario_01() {
    // Create Chrome options
    let chromeOptions = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').build();
    const term_to_search = "1984";
    const book_to_find = "1984";
    const word_descripton_to_find = "Quinta Manor";
    const author = "George Orwell";
    const ISBN = "9789722071550";
    const nmr_pages = "344";
    const dimensions = "235 x 157 x 23 mm";

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

        // Print the result based on the flag of testPassed
        if (testPassed) {
            console.log('Book: "', book_to_find, '" was found.');
            await driver.sleep(10000);
            let bookTitleElement = await driver.wait(until.elementLocated(By.xpath(`//h6[@class='book-title' and normalize-space(text())='${book_to_find}']`)), 10000);
            await driver.wait(until.elementIsVisible(bookTitleElement), 10000);
            await driver.executeScript("arguments[0].scrollIntoView(true);", bookTitleElement);
            await driver.wait(until.elementIsEnabled(bookTitleElement), 10000); 

            await bookTitleElement.click();
            console.log(`Clicked on the book title "${book_to_find}"`);
            await driver.sleep(5000); 

            let authorElement = await driver.wait(until.elementLocated(By.xpath("//a[@class='nome_autor']")), 10000);
            await driver.sleep(10000);
            let authorText = await authorElement.getText();
            await driver.sleep(10000);
            console.log(authorText);
            if (authorText.toLowerCase() === author.toLowerCase()) {
                console.log('Author is correctly displayed as "', author, '".');
            } else {
                console.log('Author validation failed.');
            }

            // Validate ISBN
            let isbnElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='_sinpose-address']//li[contains(text(),'ISBN')]")), 10000);
            let isbnText = await isbnElement.getText();
            console.log(isbnText)
            if (isbnText.includes(ISBN)) {
                console.log('ISBN is correctly displayed as "', ISBN, '".');
            } else {
                console.log('ISBN validation failed.');
            }

            // Validate the number of pages
            let pagesElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='_sinpose-address']//li[contains(text(),'Páginas')]")), 10000);
            let pagesText = await pagesElement.getText();
            console.log(pagesText)
            if (pagesText.includes(nmr_pages)) {
                console.log('Number of pages is correctly displayed as "', nmr_pages, '".');
            } else {
                console.log('Number of pages validation failed.');
            }

            // Validate dimensions
            let dimensionsElement = await driver.wait(until.elementLocated(By.xpath("//div[@class='_sinpose-address']//li[contains(text(),'Dimensões')]")), 10000);
            let dimensionsText = await dimensionsElement.getText();
            console.log(dimensionsText)
            if (dimensionsText.includes(dimensions)) {
                console.log('Dimensions are correctly displayed as "', dimensions, '".');
            } else {
                console.log('Dimensions validation failed.');
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
