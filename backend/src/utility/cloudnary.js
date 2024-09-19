const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_Key,
    api_secret: process.env.Cloud_Api_Secret
})



const uploadOnCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath) return console.log('File path not found')

           const result= await cloudinary.uploader.upload(localFilePath,{resource_type:"image",use_filename:true,})
            return result

    } catch (error) {
        console.log('cloudinary upload error',error)
        
    }


}

module.exports={
    uploadOnCloudinary
}