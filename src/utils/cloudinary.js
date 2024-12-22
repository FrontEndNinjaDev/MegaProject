import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs' // fileSystem from node.js


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null 
        // upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : 'auto'
        })
        // file has been succesfully upload
        console.log('file is uploaded on cloudinary',response.url);
        return response
    } catch (error) {
        // for in synchronous way
        // remove the locally saved temporary file as the uupload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}