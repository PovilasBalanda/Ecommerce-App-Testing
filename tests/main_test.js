const { I, mainPage, cartPage } = inject();

Feature('Product Page');

Before(() => {
    I.amOnPage('/');
});

Scenario('Fail to open the card without first adding an item', () => {
    I.waitForElement(mainPage.buttons.productOne, 5);
    I.click(mainPage.buttons.cartButton);
    I.dontSeeInCurrentUrl('/cart');
});

Scenario('Add first item to cart', () => {
    I.waitForElement(mainPage.buttons.productOne, 5);
    I.click(mainPage.buttons.productOne);
    I.seeInCurrentUrl('/cart');
});

Scenario('Add first item to cart and then remove it from cart', () => {
    I.waitForElement(mainPage.buttons.productOne, 5);
    I.click(mainPage.buttons.productOne);
    I.seeInCurrentUrl('/cart');
    I.click(cartPage.buttons.deleteProductOne);
    I.dontSeeElement(cartPage.buttons.deleteProductOne);
});