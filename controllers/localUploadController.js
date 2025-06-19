const file = require("../models/Files");

const localUploads = async(req,res) => {
    try {

        const file = req.files.file;
        // console.log("The File is ",file);
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path is ",path);
        file.mv(path,(error) => {
            console.log("Getting Error While Uploading On Server :- ",error);
        });

        res.status(200).json({
            success : true ,
            message : "Local File Uploaded Succesfully :- "
        });

    } catch (error) {
        console.log("Error Encountered While Uploading :- ",error.message);
    }
}

module.exports = {localUploads}