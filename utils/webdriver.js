const { Builder } = require('selenium-webdriver');
const config = require('../config/config');

let driver;

function getDriver() {
    if (!driver) {
        driver = new Builder().forBrowser('chrome').build();
    }
    return driver;
}

function getBaseUrl() {
    return config.baseUrl;
}

module.exports = {
    getDriver,
    getBaseUrl,
};