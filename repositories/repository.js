const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
    constructor(filename) {
        if (!filename) { // first we check whether a filename was provided
            throw new Error('Creating a repository requires a filename'); // if there's no filename provided, we throw an error
        };
        this.filename = filename; // we then assign the filename variable
        try {
            fs.accessSync(this.filename); // we're using accessSync here to check if the file exists. we shouldn't use the sync version due to performance, but constructor functions
        } catch (err) { // can't have asynchronous code
            fs.writeFileSync(this.filename, '[]'); // we then use the writeFile method to create a file with the provided filename and the data we want in it, which is an empty arr
        };
    }

    async getAll() { 
        return JSON.parse( // we're using the promise version of readFile to check the data inside our json file
            await fs.promises.readFile(this.filename, { encoding: 'utf8' }) // we then need to parse the data from the JSON file
        ); // and then we need to return the data that the parse provides us
    }

    async create(attrs) { // we're creating a separate create functions from the one in the usersRepository so it's more universal for different repos
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // we move this into a separate function to use it anywhere, not just inside the create function
    } // we can put in additional arguments in the JSON function to format the JSON file itself, the argument 2 is the number of indentations we should use inside of our string
    
    randomId() {
        return crypto.randomBytes(4).toString('hex'); // we're using a node.js module called crypto to generate a random 4 byte string for the id
    }

    async getOne(id) { // finding data by ID
        const records = await this.getAll(); // we first need to call getAll first, and then search through it to find the id that we want
        return records.find(record => record.id === id); // we're using the find array helper method to find an array object with the id we're looking for
    }

    async delete(id) { // deleting data by ID
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id); // the filter helper array method filters out everything that doesn't return true
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs) { // updating data
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) {
            throw new Error(`Record with id ${id} is not found`);
        };
        Object.assign(record, attrs); // Object.assign takes whatever is in the second argument and puts in into the first argument object
        await this.writeAll(records);
    }

    async getOneBy(filters) { // we're using some sort of a filter object to check whether we have any data according to it
        const records = await this.getAll(); // first we grab the entire file
        for (let record of records) { // then we use a for...of loop to iterate over the entire array
            let found = true; // we declare a found variable here to check whether our method found what we're looking for
            for(let key in filters) { // then we use a for...in loop to iterate over the object
                if (record[key] !== filters[key]){ // if the filter key is not equal to the record key
                    found = false; // we change found to false and continue iterating
                };
            };
            if (found) {
                return record; // if we find something we just return the first result
            };
        };
    }
}