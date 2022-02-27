# Testing an E-commerce App

These are some tests I wrote for an E-commerce app that was written through a codealong. The E-commerce app code itself is not written by me, I just coded along to a Udemy course.

The files where the code was written by me are located in /tests and /page_objects. I also added some data-test-id's to the HTML part of the app.

Tests are performed with the CodeceptJS framework.

Steps to run the tests:

1. Install Node.js.
2. Pull the app and test code from the repo.
3. Install the dependencies through the terminal with "npm install".
4. Run the app through the terminal with "node index.js".
5. On a seperate terminal, run the tests with "npm run codeceptjs".

If you're looking to update the code while Express is running, you can install Nodemon globally through npm and then run the app with "nodemon index.js". Pretty useful when changing HTML attributes, classes or ID's on the fly.

The tests are only written for the sign up and sign in pages for the admin panel (Updated to have a couple of main product page and cart page tests).
