// the body parser we wrote to parse the data we get from a form
// usually this is not that good, since in the industry, people just use the bodyParser module instead

const bodyParser = (req, res, next) => { // the next callback function is provided by Express that lets us end the parse middleware
    if (req.method === 'POST'){ // we're checking if the method of the request is POST, not anything else like GET
        req.on('data', data => { // we need to use the on method, which is the equivalent of the addEventListener command in the DOM
            const parsed = data.toString('utf8').split('&'); // the data that is return on submission is in hex form, so we need to turn it into a string by using the toString method
            const formData = {}; // we create an empty object to store our data in
            for (let pair of parsed) { // then for each array property that was created by the split method, we split it up even more
                const [key, value] = pair.split('='); // by using another split method to split through the equals signs
                formData[key] = value; // then we just assign the key value pairs to each input of the form
            };
            req.body = formData; // after that we input that data into the request body
            next(); // then we use the next function to continue the request
        });
    } else {
        next(); // if the method is not POST, we just end the parser middleware
    };
};