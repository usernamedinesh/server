// models/image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    
    imageId:{
        type:String,
        required:true
    },
    filename: {
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }
});

const ImageDesign = mongoose.model('ImageDesign', imageSchema);

module.exports = ImageDesign;
