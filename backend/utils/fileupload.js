const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//config cloudinay 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary,
    allowedFormats : ["jpeg","jpg","png"],
    params :{
        folder:"jasmita-bloggie",
        format:"jpg",
        transformation:[{width:500,height:500,crop:"limit"}]
    }
})

module.exports=storage;