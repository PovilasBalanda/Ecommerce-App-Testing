const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" data-test-id="signupEmailField" name="email" />
                <p class="help is-danger" data-test-id="signupEmailError">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" data-test-id="signupPasswordField" type="password" />
                <p class="help is-danger" data-test-id="signupPasswordError">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" data-test-id="signupPasswordConfirmationField" name="passwordConfirmation" type="password" />
                <p class="help is-danger" data-test-id="signupPasswordConfirmationError">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="button is-primary" data-test-id="signupSubmit">Submit</button>
            </form>
            <a href="/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `
  });
};
