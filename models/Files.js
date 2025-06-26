const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    tags : {
        type : String,
    },
    url : {
        type : String,
    },
    email : {
        type : String
    }
});

fileSchema.post("save",async function(doc) {
    console.log("Doc :- ",doc);

    try {
        const transport = nodemailer.createTransport({
            host : process.env.HOST_NAME,
            auth : {
                user : process.env.USER_MAIL,
                pass : process.env.USER_PASS,
            }
        })
    
        const info = transport.sendMail({
            from : "NkTECH",
            to: doc.email,
            subject : "Hello From NKTECH",
            html : "<h1>Hii Bro !!! </h1><p>THis is from Server of Node.js</p>"
        })
    } catch (error) {
        console.log("Error While Sending Mail :- ",error.message);
    }
})

module.exports = mongoose.model('File',fileSchema);