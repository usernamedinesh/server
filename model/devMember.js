const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  FullName:{
    type:String,
    required:true,
  } ,
  email:{
    type:String,
    required:true,
  },
  profile_picture: {
    url:{
      type:String,
      required:true
    }
  },
  roles:{
    type:String,
  },
  skill:{
    type:String
  },
});

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
