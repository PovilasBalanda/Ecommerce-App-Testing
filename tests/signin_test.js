const { I, signinPage } = inject();

Feature('Sign In');

Before(() => {
    I.amOnPage('/signin');
});

Scenario('Successful login', () => {
    signinPage.signin('test@gmail.com', 'zxcvb');
    I.seeInCurrentUrl('/admin/products');
});

Scenario('Failed login with correct email but wrong password', () => {
    signinPage.signin('test@gmail.com', 'qweqweqwe');
    I.see('Password is incorrect', signinPage.errors.password);
});

Scenario('Failed login with incorrect credentials', () => {
    signinPage.signin('Matt@gmail.com', '12345');
    I.see('Email not found!', signinPage.errors.email);
    I.see('Invalid password', signinPage.errors.password);
});

Scenario('Failed login with invalid credentials', () => {
    signinPage.signin('Matt', 'a');
    I.see('Must provide a valid email', signinPage.errors.email);
    I.see('Invalid password', signinPage.errors.password);
});

Scenario('Attempt to go to products page without logging in', () => {
    I.seeElement(signinPage.fields.email);
    I.click(signinPage.buttons.products);
    I.dontSeeInCurrentUrl('/admin/products');
});

Scenario('Going to the products page from the sign in page after you\'ve already logged in', () => {
    signinPage.signin('test@gmail.com', 'zxcvb');
    I.seeInCurrentUrl('/admin/products');
    I.amOnPage('/signin');
    I.click(signinPage.buttons.products);
    I.seeInCurrentUrl('/admin/products');
});