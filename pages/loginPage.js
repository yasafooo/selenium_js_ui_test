const { By, until } = require('selenium-webdriver');
const webdriver = require('../utils/webdriver');

class LoginPage {
    constructor() {
        this.driver = webdriver.getDriver();
        this.usernameField = By.id('user-name');
        this.passwordField = By.id('password');
        this.loginButton = By.css('input.btn_action');
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async open() {
        await this.driver.get(webdriver.getBaseUrl());
        await this.driver.wait(until.titleIs('Swag Labs'), 5000);
    }
}

module.exports = new LoginPage();