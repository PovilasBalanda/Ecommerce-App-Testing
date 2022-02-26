const { I, mainPage } = inject();

Feature('Product Page');

Before(() => {
    I.amOnPage('/');
});

Scenario('Add first item to cart', () => {
    I.waitForElement(mainPage.buttons.productOne, 5);
    I.click(mainPage.buttons.productOne);
    I.seeInCurrentUrl('/cart');
});
