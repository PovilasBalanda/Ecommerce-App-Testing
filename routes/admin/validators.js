const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: 
    check('title')
        .trim()
        .isLength({ min: 5, max: 40 })
        .withMessage('Must be between 5 and 40 characters long'),
    requirePrice:
    check('price')
        .trim()
        .toFloat() // we're checking whether the user submitted a price
        .isFloat({ min: 1 })
        .withMessage('Must be a number greater than 1'),
    requireEmail: // we're moving all the validators here so we can use them without cluttering up the auth.js file
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail() // trim removes all spaces from both sides, normalizeEmail makes it into a normal email string, isEmail is self-explainatory
        .withMessage('Must be a valid email')
        .custom(async (email) => { // we can also make a custom validator and make it throw Errors into the validator error array itself (mind blowing)
            const existingUser = await usersRepo.getOneBy({ email }); // we check if the user has another account under the same email (refer to users.js for getOneBy explanation)
            if (existingUser) {
                throw new Error('Email in use');
            };
        }),
    requirePassword: 
    check('password')
        .trim()
        .isLength({ min: 4, max: 20}) // isLength checks if the password is the length within the provided range
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation:
    check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => { // we can check whether the password and passwordConfirmation are the same with a custom validator
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            } else {
                return true;
            }
        }),
    requireEmailExists:
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('Email not found!');
            };
        }),
    requireValidPasswordForUser:
    check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('Invalid password');
            };
            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword) {
                throw new Error('Password is incorrect')
            };
        })
};