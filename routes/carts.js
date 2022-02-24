const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// we need to receive a post request to add an item to a cart

router.post('/cart/products', async (req, res) => {
    // figure out the cart (is there already a cart, is this the first cart that is being made and so on)
    let cart;
    if(!req.session.cartId) {
        // we don't have a card, we need to create one and astore the cart id on the req.session.cartId property
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        // we have a card and lets get it from the repository
        cart = await cartsRepo.getOne(req.session.cartId);
    };

    const existingItem = cart.items.find(item => item.id === req.body.productId); // first we create a variable that will check if we have have an existing item already
    
    if (existingItem) {
        // either increment quantity for the existing product
        existingItem.quantity++;
    } else {
        // or add a new product to the items array in the cart
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    }); // we also need to update the carts.json file with the .update method in our repo
    res.redirect('/cart');
});

// we need to receive a GET request to show all items in the cart

router.get('/cart', async (req, res) => {
    if (!req.session.cartId) { // if the user doesn't have a cart, it will redirect them to the main page
        return res.redirect('/');
    }
    const cart = await cartsRepo.getOne(req.session.cartId); // first we need to open up the cart of the user
    for (let item of cart.items) { // then we need to iterate over each item in the array to cross reference it with the productsRepo
        const product = await productsRepo.getOne(item.id);
        item.product = product;
    }
    res.send(cartShowTemplate({ items: cart.items }));
});

// we need to receive a post request to delete an item out of the cart

router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body; // first we destructure out the itemId that the user made a POST request for
    const cart = await cartsRepo.getOne(req.session.cartId); // we then get the item with that Id in it
    const items = cart.items.filter(item => item.id !== itemId); // we then filter out all of the items that weren't selected into a new array
    await cartsRepo.update(req.session.cartId, { items }); // we then update our carts.json file
    res.redirect('/cart');
});

module.exports = router;