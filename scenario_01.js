const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function scenario_01() {
// Create Chrome options
    let chromeOptions = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').build();
    let book_to_find = "O Triunfo dos Porcos"
    try {
        await driver.get('https://www.leyaonline.com/pt/'); // Go to website
        console.log('Navigated to Leyaonline');
        await driver.sleep(5000);
        let searchBox = await driver.wait(until.elementLocated(By.id('searchbar-large')), 10000); // Check for searchbar 
        console.log('Found search bar');
        await driver.sleep(5000);

        await searchBox.sendKeys(book_to_find, Key.RETURN); // Enter submission
        console.log('Entered search term"',book_to_find,'"and submitted search');
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
            console.log('Test passed: "',book_to_find,'" is displayed');
        } else {
            console.log('Test failed: "',book_to_find,'" is not displayed');
        }

        
        // Click on book title to check description
        await driver.sleep(10000);
        let bookTitleElement = await driver.findElement(By.xpath(`//h6[@class='book-title' and text()='${book_to_find}']`));
        await bookTitleElement.click();
        await driver.sleep(444433);
        console.log('Clicked on the book title "O Triunfo dos Porcos"');



    } catch (error) {
        console.error('An error occurred:', error);

    } finally {
        await driver.quit();
        console.log('Closed browser');
    }
})();
