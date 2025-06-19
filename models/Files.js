const mongoose = require('mongoose');

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

module.exports = mongoose.model('file',fileSchema);