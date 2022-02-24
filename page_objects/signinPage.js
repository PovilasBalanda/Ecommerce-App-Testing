const { I } = inject();

module.exports = {
    //selectors
    fields: {
        email: '[data-test-id=loginEmailField]',
        password: '[data-test-id=loginPasswordField]'
    },
    buttons: {
        products: '[data-test-id=productsButton]',
        submit: '[data-test-id=loginSubmit]'
    },
    errors: {
        email: '[data-test-id=signinEmailError]',
        password: '[data-test-id=signinPasswordError]'
    },

    //methods
    fillEmailAndPasswordFields(email, password) {
        I.waitForElement(this.fields.email, 3);
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
    },

    signin(email, password) {
        this.fillEmailAndPasswordFields(email, password);
        I.click(this.buttons.submit);
    }
};