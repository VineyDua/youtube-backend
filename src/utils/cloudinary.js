import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        //file has been uploaded successfully
        console.log("File is uploaded on cloudinary", result.url);
        //return the uploaded file url
        return result;
    } catch (error) {
        throw error;
    } finally {
        //delete the file from the local file system
        fs.unlinkSync(localFilePath);
    }
};

export {uploadOnCloudinary};
