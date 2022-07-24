// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('connect ok!');
    } catch (error) {
        console.log('connect fail!');
    }
}

module.exports = { connect };
