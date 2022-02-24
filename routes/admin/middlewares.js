const { validationResult } = require('express-validator'); // we're moving the error checking into a separate middleware function

module.exports = {
    handleErrors(templateFunc, dataCb) { // all middlewares must be functions
        return async (req, res, next) => { // we need to put in next as return value to continue going through the middlewares in our request
            const errors = validationResult(req); // we're checking the validation results from express-validator when the request is made
            if (!errors.isEmpty()) { // if errors is not an empty object we return
                let data = {}; // we're adding an optional data check here because some of our views need a product to be inputted, so the handleErrors middleware won't work
                if (dataCb) {
                    data = await dataCb(req); // we check whether the data was passed in
                }
                return res.send(templateFunc({ errors, ...data })); // and then when returning, we pass in the data with rest so we can merge the two
            }
            next();
        };
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        };
        next();
    }
};