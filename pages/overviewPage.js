const { By } = require('selenium-webdriver');
const webdriver = require('../utils/webdriver');

class OverviewPage {
    constructor() {
        this.driver = webdriver.getDriver();
        this.finishButton = By.id('finish');
        this.paymentInfo = By.xpath("//div[@class='summary_value_label'][1]");
        this.shippingInfo = By.xpath("//div[@class='summary_value_label'][2]");
        this.priceTotal = By.className('summary_subtotal_label');
        this.tax = By.className('summary_tax_label');
        this.totalAmount = By.className('summary_info_label summary_total_label');
        this.overviewHeader = By.xpath('//span[@class="title" and text()="Checkout: Overview"]');
        this.itemPrice = By.css('.inventory_item_price');
    }

    async getPaymentInfo() {
        return await this.driver.findElement(this.paymentInfo).getText();
    }

    async getShippingInfo() {
        return await this.driver.findElement(this.shippingInfo).getText();
    }

    async getPriceTotal() {
        return await this.driver.findElement(this.priceTotal).getText();
    }

    async getTax() {
        return await this.driver.findElement(this.tax).getText();
    }

    async getTotalAmount() {
        return await this.driver.findElement(this.totalAmount).getText();
    }

    async finishOrder() {
        await this.driver.findElement(this.finishButton).click();
    }

    async isOverviewHeaderIsAvailable() {
        return await this.driver.findElement(this.overviewHeader).isEnabled();
    }

    async getSumOfPrices() {
        const priceElements = await this.driver.findElements(this.itemPrice);
        let sum = 0;

        for (const element of priceElements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            sum += price;
        }

        return sum;
    }

    async getTaxAmountSummary() {
        return (await this.getSumOfPrices()*0.08).toFixed(2);
    }

    async getTotalAmountSummary() {
        let sum = parseFloat(await this.getSumOfPrices())+parseFloat(await this.getTaxAmountSummary());
        return sum
    }
}

module.exports = new OverviewPage();