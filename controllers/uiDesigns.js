const cloudinary = require('cloudinary').v2; // Make sure you've properly configured Cloudinary
const Image = require('../model/uiDesigns');

exports.designUi = async (req, res) => {
    try {
        // Assuming imageId and filename are provided in the request body
        const { imageId, filename,thumbnail } = req.body;

        console.log(imageId,filename,thumbnail)

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(thumbnail,{folder: 'project'});

        // Create a new image document in the database
        const newImage = new Image({
            imageId,
            filename,
            imageUrl: uploadResult.secure_url,
            
        });

        const savedImage = await newImage.save();
        res.json(savedImage);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
};
