const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt); // instead of using a callback version of crypto.scrypt, we're promisifying it using the utilities module from nodejs
// what extends do is basically put every function from the parent class into the UsersRepository
class UsersRepository extends Repository { // we're using a class to create repositories for our stored data
    async create(attrs) { // the function to actually write in the email and password into the file
        attrs.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex'); // to make the password more secure, we make a random string called salt
        const buff = await scrypt(attrs.password, salt, 64); // this lets us create a hashed password using the salt that we generated
        const records = await this.getAll(); // first we get all the information from the file
        const record = {
            ...attrs,
            password: `${buff.toString('hex')}.${salt}` // to store the the hashed and salted password along with the salt and email, we need to destructure first and then replace psw
        }
        records.push(record); // then we push in some data that we want to add
        await this.writeAll(records); // then we use writeFile to store the data into the file itself
        return record;
    }

    async comparePasswords(saved, supplied) { // we're inputting the saved hashed and salted password and the supplied password from the HTML form as input variables
        const [hashed, salt] = saved.split('.'); // we're destructuring the array when splitting it so we don't have 3 lines of code for no reason
        const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
        return hashed === hashedSuppliedBuff.toString('hex'); // we're checking if the supplied and hashed password is the same as the one that is saved in our database
    } // we also want to turn it to a string, since the scrypt function only returns a buffer
};

module.exports = new UsersRepository('users.json');