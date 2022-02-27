const { I } = inject();

module.exports = {

    //selectors

    buttons: {
        productOne: '[data-test-id=addToCart-62b582ba]', // This is definitely not the right way to handle a changing product list size with separate ids
        productTwo: '[data-test-id=addToCart-ac3d7258]', // I tried using grabbers and other solutions but they didn't work
        productThree: '[data-test-id=addToCart-e7fccbd5]',
        productFour: '[data-test-id=addToCart-9317ff17]',
        productFive: '[data-test-id=addToCart-2c8745bb]',
        productSix: '[data-test-id=addToCart-ed1a0390]',
        productSeven: '[data-test-id=addToCart-5755ac09]',
        productEight: '[data-test-id=addToCart-f6b1fbbc]',
        productNine: '[data-test-id=addToCart-84d23150]',
        cartButton: '[data-test-id=cartButton]'
    }
};