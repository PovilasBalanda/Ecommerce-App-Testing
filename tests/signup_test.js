const { I, signupPage, signinPage } = inject();

Feature('Sign Up');

Before(() => {
    I.amOnPage('/signup');
});

Scenario('Successfully create account', () => {
    signupPage.signup('wow@gmail.com', 'qwert', 'qwert');
    I.seeInCurrentUrl('/admin/products');
});

Scenario('Fail to create an account with an email that already exists', () => {
    signupPage.signup('wow@gmail.com', 'qwert', 'qwert');
    I.see('Email in use', signupPage.errors.email);
});

Scenario('Fail to create account with an invalid email', () => {
    signupPage.signup('wow', 'qwert', 'qwert');
    I.see('Must be a valid email', signupPage.errors.email);
});

Scenario('Fail to create account with an invalid email and invalid password', () => {
    signupPage.signup('wow', 'qwe', 'qwe');
    I.see('Must be a valid email', signupPage.errors.email);
});

Scenario('Fail to create account with a password that is invalid (below 4 characters)', () => {
    signupPage.signup('wowee@gmail.com', 'qwe', 'qwe');
    I.see('Must be between 4 and 20 characters', signupPage.errors.password);
    I.see('Must be between 4 and 20 characters', signupPage.errors.passwordConfirmation);
});

Scenario('Fail to create account with a password that is invalid (above 20 characters)', () => {
    signupPage.signup('wowee@gmail.com', 'qqqqqqqqqqqqqqqqqqqqq', 'qqqqqqqqqqqqqqqqqqqqq');
    I.see('Must be between 4 and 20 characters', signupPage.errors.password);
    I.see('Must be between 4 and 20 characters', signupPage.errors.passwordConfirmation);
});

Scenario('Fail to create account with mismatched passwords', () => {
    signupPage.signup('wowee@gmail.com', 'qwert', 'qwerty');
    I.see('Passwords must match', signupPage.errors.passwordConfirmation);
});

Scenario('Fail to create account with mismatched passwords and the first field having an invalid password', () => {
    signupPage.signup('wowee@gmail.com', 'qwe', 'qwerty');
    I.see('Must be between 4 and 20 characters', signupPage.errors.password);
    I.see('Passwords must match', signupPage.errors.passwordConfirmation);
});

Scenario('Attempt to go to products page without logging in from the sign up page', () => {
    I.seeElement(signupPage.fields.email);
    I.click(signupPage.buttons.products);
    I.seeInCurrentUrl('/signin');
});

Scenario('Going to the products page from the sign up page after you\'ve already logged in', () => {
    I.amOnPage('/signin')
    signinPage.fillEmailAndPasswordFields('test@gmail.com', 'zxcvb');
    I.click(signinPage.buttons.submit);
    I.seeInCurrentUrl('/admin/products');
    I.amOnPage('/signup');
    I.click(signupPage.buttons.products);
    I.seeInCurrentUrl('/admin/products');
});