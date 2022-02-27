const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'localhost:3000',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js',
    signinPage: './page_objects/signinPage',
    signupPage: './page_objects/signupPage',
    mainPage: './page_objects/mainPage',
    cartPage: './page_objects/cartPage'
  },
  bootstrap: null,
  mocha: {},
  name: 'E-Commerce Testing'
}