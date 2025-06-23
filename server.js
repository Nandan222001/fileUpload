const express = require("express");
const app = express();
require("dotenv").config();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'), 
}));

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

const dbConnect = require('./config/dbConnect');
dbConnect();

const router = require('./routes/fileUpload');
app.use('/api/v1/uploads',router);

app.listen(PORT,(req,res)=> {
    console.log("Server is running on port :- ",PORT);
})

app.post('/',(req,res) => {
    res.send("<h1>Hello From Server .</h1>");
})