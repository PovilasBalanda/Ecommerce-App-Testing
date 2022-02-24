const { I } = inject();

module.exports = {
    //selectors
    fields: {
        email: '[data-test-id=signupEmailField]',
        password: '[data-test-id=signupPasswordField]',
        passwordConfirmation: '[data-test-id=signupPasswordConfirmationField]'
    },
    buttons: {
        submit: '[data-test-id=signupSubmit]',
        products: '[data-test-id=productsButton]'
    },
    errors: {
        email: '[data-test-id=signupEmailError]',
        password: '[data-test-id=signupPasswordError]',
        passwordConfirmation: '[data-test-id=signupPasswordConfirmationError]'
    },

    //methods
    fillEmailAndPasswordFields(email, password) {
        I.waitForElement(this.fields.email, 3);
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
    },

    signup(email, password, passwordConfirmation) {
        this.fillEmailAndPasswordFields(email, password);
        I.fillField(this.fields.passwordConfirmation, passwordConfirmation);
        I.click(this.buttons.submit);
    }
}