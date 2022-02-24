// for structuring purposes, we're moving out the authentication code into a different js file

const express = require('express');
const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser } = require('./validators');
const users = require('../../repositories/users');

const router = express.Router(); // to be able to use the route handlers in different files, we need to make a new route and then export it and require it in the main file

router.get('/signup', (req, res) => { // on GET request, we run a callback function
    res.send(signupTemplate({ req })); 
});

router.post('/signup', 
    [requireEmail,requirePassword, requirePasswordConfirmation], // we're using a separate argument to validate and sanitize the email and password that the user is putting in
    handleErrors(signupTemplate),
    async (req, res) => { // on POST request, we can run a different callback function, but it runs right after the request is made, before we get all the data from it
    const {email, password, passwordConfirmation} = req.body; // we destructure all the data first
    const user = await usersRepo.create({ email, password }); // we first create a user in our user repo to represent a person
    req.session.userId = user.id; // the session method is added to the req by the cookie session module and it is used to store the id of the user inside the users cookie
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => { // we're creating a get request to the /signout page that will remove the cookie
    req.session = null;
    res.send('You are logged out');
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate({})); // we pass in an empty object into the template just so we can pass in other arguments
}); // making a HTML page for the sign in

router.post('/signin', [requireEmailExists, requireValidPasswordForUser], handleErrors(signinTemplate), async (req, res) => {
    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });
    req.session.userId = user.id; // adding a cookie to the sign in
    res.redirect('/admin/products');
});

module.exports = router;