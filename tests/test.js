const { expect } = require('chai');
const LoginPage = require('../pages/loginPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const OverviewPage = require('../pages/overviewPage');
const ConfirmationPage = require('../pages/confirmationPage');
const testData = require('../data/testdata');
const webdriver = require('../utils/webdriver');

describe('Sauce Demo Automation', function () {
    this.timeout(20000);
    let itemCount = 3;
    before(async function () {
        await LoginPage.open();
    });

    it('should login successfully', async function () {
        await LoginPage.login(testData.username, testData.password);
        expect(await CartPage.isCartEmpty(),'Cart is not empty').to.be.true;
    });

    it('should add 3 random items to the cart', async function () {
        await CartPage.addRandomItemsToCart(itemCount);
        expect(await CartPage.getCartItemCount(),'Incorrect item total on Cart Page').to.equal(itemCount);
    });

    it('should go to cart and initiate checkout', async function () {
        await CartPage.openCart();
        await CartPage.goToCheckout();
        expect(await CheckoutPage.isCheckoutHeaderIsAvailable(),'Checkout page does not loaded').to.equal(true);
    });

    it('should fill shipping details', async function () {
        await CheckoutPage.fillShippingDetails(testData.firstName, testData.lastName, testData.zipcode);
        await CheckoutPage.goToOverview();
        expect(await OverviewPage.isOverviewHeaderIsAvailable(),'Overview page does not loaded').to.equal(true);
    });

    it('should verify checkout overview', async function () {
        const paymentInfo = await OverviewPage.getPaymentInfo();
        const shippingInfo = await OverviewPage.getShippingInfo();
        const priceTotal = await OverviewPage.getPriceTotal();
        const tax = await OverviewPage.getTax();
        const totalAmount = await OverviewPage.getTotalAmount();

        expect(paymentInfo,'Payment information is wrong').to.equal(testData.paymentInfo);
        expect(shippingInfo,"Shipping information is wrong").to.equal(testData.shippingInfo);
        expect(priceTotal,"Price Total is wrong").to.equal(testData.itemTotal+await OverviewPage.getSumOfPrices());
        expect(tax,"Tax is wrong").to.equal(testData.tax+await OverviewPage.getTaxAmountSummary());
        expect(totalAmount,'Total amount is wrong').to.equal(testData.total+await OverviewPage.getTotalAmountSummary());
    });

    it('should finish the order and display confirmation', async function () {
        await OverviewPage.finishOrder();
        const confirmationMessage = await ConfirmationPage.getConfirmationMessage();
        expect(confirmationMessage,'Thank you message is wrong').to.equal(testData.thankYouMessage);
    });
    after(async function () {
        await webdriver.getDriver().quit();
    });
});
