/*Scenario 07:
Open Burger menu
Validate that burger menu has:
-Livros
-Ebooks
-Livros Escolares
-Apoio Escolar
-Acessos Digitais
-Tecnologia
-Leya Express
-Kobo Plus e_LeYa
-Close burger menu
-Confirm burger menu is closed
*/

const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const expectedLinks = [
  "Livros",
  "Ebooks",
  "Livros Escolares",
  "Apoio Escolar",
  "Acessos Digitais",
  "Tecnologia",
  "Leya Express",
  "Kobo Plus e_LeYa",
];

(async function scenario_01() {
  // Create Chrome options
  let chromeOptions = new chrome.Options();
  let driver = await new Builder().forBrowser("chrome").build();
  const term_to_search = "1984";
  const book_to_find = "1984";

  try {
    await driver.get("https://www.leyaonline.com/pt/"); // Go to website
    console.log("Navigated to Leyaonline");
    await driver.sleep(5000);

    let cookieAcceptButton = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="cookiescript_accept"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(cookieAcceptButton), 10000);
    await driver.wait(until.elementIsEnabled(cookieAcceptButton), 10000);

    await cookieAcceptButton.click(); // Click the cookie consent button
    await driver.sleep(10000);

    let burgerMenuButton = await driver.wait(
      until.elementLocated(By.className("menu-toggler-btn align-self-end")),
      10000
    );
    await burgerMenuButton.click();
    console.log("Clicked on burger menu button");
    await driver.sleep(2000); // Wait for the menu to open

    // Check if the burger menu is open
    let isVisible = await driver.wait(
      until.elementLocated(
        By.css("#offcanvasMenu1[style*='visibility: visible']")
      ),
      10000
    );
    await driver.sleep(10000);
    if (isVisible) {
      console.log("Burger menu is open.");

      // Locate all menu items
      let menuItems = await driver.findElements(
        By.css("#offcanvasMenu1 .offcanvas-menu-item ul li a")
      );
      let menuTexts = await Promise.all(
        menuItems.map(async (item) => await item.getText())
      );

      // Verify each expected link in the burger menu
      for (const link of expectedLinks) {
        if (menuTexts.includes(link)) {
          console.log(`"${link}" is present in the menu.`);
        } else {
          console.log(`"${link}" is NOT present in the menu.`);
        }
      }

      // Close the burger menu
      let closeButton = await driver.wait(
        until.elementLocated(
          By.xpath(
            "//div[@class='offcanvas-header']//button[@aria-label='Close']"
          )
        ),
        10000
      );
      await closeButton.click();
      console.log("Clicked to close the burger menu");

      // Optionally, confirm that the burger menu is closed
      await driver.sleep(2000); // Wait for the menu to close
      let isClosed = await driver.wait(
        until.elementLocated(
          By.css("#offcanvasMenu1[style*='visibility: hidden']")
        ),
        10000
      );
      console.log("Burger menu should now be closed.");
    } else {
      console.log("Burger menu is not open.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
    console.log("Closed browser");
  }
})();
