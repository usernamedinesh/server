const mongoose = require("mongoose");
const Review = require("./review");
require('dotenv').config();

// Define schema for projects
const projectSchema = new mongoose.Schema({
  thumbnail: {
    url:{
      type:String,
      required:true
    }
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['APP', 'WEB', 'UX/UI'], // Define the allowed categories
    required: true
},
  content: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
