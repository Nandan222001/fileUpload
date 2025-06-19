const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudName = process.env.CLOUD_NAME ;
const apiKey = process.env.API_KEY ;
const apiSecretKey = process.env.API_SECRET_KEY ;

const cloudinaryConnect = () => {

    try {
        cloudinary.config({
            cloud_name : cloudName ,
            api_key : apiKey , 
            api_secret : apiSecretKey
        })
    } catch (error) {
        console.log("Cloudinary Connection is Failed :- ",error.message);
    }

}
 
module.exports = { cloudinaryConnect };