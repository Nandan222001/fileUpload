const File = require("../models/Files");

const localUploads = async(req,res) => {
    try {

        const file = req.files.file;
        // console.log("The File is ",file);
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        // console.log("Path is ",path);
        file.mv(path,(error) => {
            console.log("Getting Error While Uploading On Server :- ",error);
        });

        res.status(200).json({
            success : true ,
            message : "Local File Uploaded Succesfully :- "
        });

    } catch (error) {
        console.error("Error Encountered While Uploading :- ",error.message);
    }
}

const imageUpload = async(req,res) => {
    try {

        // console.log(req.body);
        const {name , email , tags } = req.body;
        if(!email || !name || !tags) {
            return res.status(400),json({
                success : false , 
                message : "Fill All required Fields ."
            });
        }

        // console.log("Name :- "+name+" Email :- "+email+" tage :- " +tags);

        const files = req.files.file;
        
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = files.split('.')[1].toLowerCase();
        console.log("The file is :- ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400),json({
                success : false , 
                message : "File type not suported ."
            });
        }

        const response = await uploadFileToCloudinary(files , "NkTech");

        console.log("Response :- ",response);

        const data = await File.create({
            name,
            tags,
            email,
            url : secure_url 
        });

        res.status(200).json({
            success : true ,
            data : data ,
            message : "File Saved Succesfully !!!"
        })

    } catch (error) {
        res.status(500).json({
            success : false ,
            message : "Internal Server Error !!!"
        })
    }
}

const isFileTypeSupported = (fileType, supportedTypes) => {
  return supportedTypes.includes(fileType);
};

const uploadFileToCloudinary = async(file,folder) => {
    const options= {folder};
    console.log("Options :- ",options );
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

module.exports = {localUploads , imageUpload }