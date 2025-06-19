const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DATABASE_URL;

const dbConnect = () => {
    try {
        mongoose.connect(url);
    } catch (error) {
        console.log("Database Connection Failed :- ",error.message);
    }
};

module.exports = dbConnect;