// admin.js (in the model folder)

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // images: {
  //   url:{
  //     type:String,
  //     required:true
  //   }
  //   },
  // text: { 
  //   type: String,
  //    required: true 
  // },

  token: {
    type: String,
  },
  role:{
    type:String,
    
  }

});

const User = mongoose.model("User", adminSchema);

module.exports = User;
