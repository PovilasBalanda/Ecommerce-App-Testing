const express = require('express'); // express is used for dynamic serverside 
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express(); // we need to call express into some variable

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // if we want all of our route handlers to use the same middleware, we use app.use
app.use(cookieSession({ // the cookie generator is also middleware that we want to run for all requests
    keys: ['13nr13j45n12l3j5rn12jh123uj5tg1'] // this is basically a random sting of numbers that is used as an encryption key for our website
}));

app.use(authRouter); // the way we call all the other route handlers from another file
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3000, () => { // we're listening for requests within the 3000 port of our localhost
    console.log('Listening');
});