module.exports = {
    getError(errors, prop) { // we're inputting the errors and the properties of the given data into the getError function so we can print it out on the page
        try { // we use a try catch here instead of doing an if statement for every single argument
            return errors.mapped()[prop].msg; // errors.mapped gives us an object
        } catch (err) {
            return '';
        };
    }
}