const express = require('express');
const multer = require('multer'); // multer is used to parse multipart form data
const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');
const products = require('../../repositories/products');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }) // we need to specify where we're uploading the images

router.get('/admin/products', requireAuth, async (req, res) => { // a router for listing out all the products in the admin panel
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => { // a router for adding in new products in the admin panel
    res.send(productsNewTemplate({})); // we put in an empty object just because we will need to input in variables into the template when posting
});

router.post('/admin/products/new',
    requireAuth, // we're putting in requireAuth first because we don't want the user to be able to upload a file before we can check if he's authorized to be in the page
    upload.single('image'), 
    [requireTitle, requirePrice], 
    handleErrors(productsNewTemplate), 
    async (req, res) => { // the middleware order goes from left to right, and it's important
    const image = req.file.buffer.toString('base64'); // we're taking the uploaded file and putting it as a base64 string so we can put it in the products.json file
    const { title, price } = req.body; // we're also destructuring the title and price from the request body
    await productsRepo.create({ title, price, image}); // we use the create function of the productsRepo class to create a new product in the products.json file
    res.redirect('/admin/products'); // this is how we redirect people after a successful created product
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => { // we need to first find out what ID we're trying to open when clicking edit
    const product = await productsRepo.getOne(req.params.id); // req.params.id shows us the ID that we're trying to open and we can use it to get the information of the product
    if (!product) {
        return res.send('Product not found');
    }
    res.send(productsEditTemplate({ product }));
});

router.post('/admin/products/:id/edit', // handling the actual editing of the data inside a package.json file 
    requireAuth, // first we check if the user is authorized to do this
    upload.single('image'), // then we use a middleware for handling the upload of a new image
    [requireTitle, requirePrice], // adding in express-validator validators
    handleErrors(productsEditTemplate, async (req) => {
        const product = await productsRepo.getOne(req.params.id);
        return { product };
    }), // handleErrors will handle any errors and print them out
    async (req, res) => {
        const changes = req.body; // first we check for any changes in the submitted form
        if (req.file) {
            changes.image = req.file.buffer.toString('base64'); // if the user uploads an image, we need to check and then change the image value in the object
        };
        try { // we need to use a try catch here because the update method has an error for when we can't find the ID in the products.json file
        await productsRepo.update(req.params.id, changes); // we then use the update method of the repository to update the data
        } catch (err) {
            return res.send('Could not find item');
        };
        res.redirect('/admin/products');
    }
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
    await productsRepo.delete(req.params.id);

    res.redirect('/admin/products');
});

module.exports = router;