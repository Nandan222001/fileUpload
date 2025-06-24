const File = require("../models/Files");
const cloudinary = require('cloudinary');

const isFileTypeSupported = (fileType, supportedTypes) => {
  return supportedTypes.includes(fileType);
};

const uploadFileToCloudinary = async(file,folder,quality) => {
    const options= {
        folder : folder,
        resource_type : "video",
        public_id: file.name,
        use_filename: true,
        unique_filename: false
    };
    console.log("The file Info :- ",file);
    if(quality) {
        options.quality = quality;
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Result :- ",result);
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
}

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

        const files = req.files.file;
        
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = files.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
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
            url : response.secure_url 
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

const videoUpload = async(req,res) => {
    try {
        console.log("Start");
        const {name,email,tags} = req.body;
        if(!email || !name || !tags ) {
            return res.status(400).json({
                success : false,
                message : "Fill All required Fields."
            })
        }

        const file = req.files.file;

        const supportedTypes = ["mp4","mov","mkv"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "File Type Not Supported !!!"
            })
        }
        // console.log("Nandan Singh :- ",file);

        const response = await uploadFileToCloudinary(file,"/Home/NkTech");
        console.log("Nandan response :- ",response);

        const data = await File.create({
            name,
            email,
            tags,
            url:response.secure_url
        })

        return res.status(200).json({
            success:true,
            data : data ,
            message : "File Uploaded Succesfully ."
        })

    } catch (error) {
        console.log("Error :- ",error.message);
        res.status(500).json({
           success : false,
           message : "Internal Server Error !!!" 
        });
    }
}

module.exports = {localUploads , imageUpload , videoUpload}