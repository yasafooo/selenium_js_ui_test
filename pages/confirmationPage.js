const { By } = require('selenium-webdriver');
const webdriver = require('../utils/webdriver');

class ConfirmationPage {
    constructor() {
        this.driver = webdriver.getDriver();
        this.confirmationMessage = By.css('.complete-header');
    }

    async getConfirmationMessage() {
        return await this.driver.findElement(this.confirmationMessage).getText();
    }
}

module.exports = new ConfirmationPage();