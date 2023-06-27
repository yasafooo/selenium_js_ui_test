const { By } = require('selenium-webdriver');
const webdriver = require('../utils/webdriver');

class CartPage {
    constructor() {
        this.driver = webdriver.getDriver();
        this.cartIcon = By.className('shopping_cart_link');
        this.checkoutButton = By.id('checkout');
        this.cartItemCount = By.className('shopping_cart_badge');
    }

    async openCart() {
        await this.driver.findElement(this.cartIcon).click();
    }

    async goToCheckout() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async isCartEmpty() {
        const elements = await this.driver.findElements(this.cartItemCount);
        return elements.length === 0;
    }

    async addRandomItemsToCart(itemCount) {
        const itemElements = await this.driver.findElements(By.css('.inventory_item'));
        const randomIndexes = this.getRandomIndexes(itemElements.length, itemCount);

        for (const index of randomIndexes) {
            await itemElements[index].findElement(By.css('.btn_inventory')).click();
        }
    }

    getRandomIndexes(maxValue, count) {
        const indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * maxValue);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    }
    async getCartItemCount() {
        return parseInt(await this.driver.findElement(this.cartItemCount).getText());
    }
}

module.exports = new CartPage();