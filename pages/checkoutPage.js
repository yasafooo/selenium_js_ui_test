const { By } = require('selenium-webdriver');
const webdriver = require('../utils/webdriver');

class CheckoutPage {
    constructor() {
        this.driver = webdriver.getDriver();
        this.firstNameField = By.id('first-name');
        this.lastNameField = By.id('last-name');
        this.zipcodeField = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.checkoutHeader = By.className('header_secondary_container');
    }

    async fillShippingDetails(firstName, lastName, zipcode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.zipcodeField).sendKeys(zipcode);
    }

    async goToOverview() {
        await this.driver.findElement(this.continueButton).click();
    }

    async isCheckoutHeaderIsAvailable() {
        return await this.driver.findElement(this.checkoutHeader).isEnabled();
    }
}

module.exports = new CheckoutPage();