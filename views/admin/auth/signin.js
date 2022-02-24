const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign in</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" data-test-id="loginEmailField" name="email" />
                <p class="help is-danger" data-test-id="signinEmailError">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" data-test-id="loginPasswordField" name="password" type="password" />
                <p class="help is-danger" data-test-id="signinPasswordError">${getError(errors, 'password')}</p>
              </div>
              <button class="button is-primary" data-test-id="loginSubmit">Submit</button>
            </form>
            <a href="/signup">Need an account? Sign Up</a>
          </div>
        </div>
      </div>
    `
  });
};
