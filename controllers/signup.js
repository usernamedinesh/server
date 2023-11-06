const bcrypt = require("bcrypt");
const User = require("../model/admin");
require("dotenv").config();






exports.signup = async (req, res) => {
  try {
    // Get data from the request body
    const { name, email, password, role, } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
  
    // const result = await cloudinary.uploader.upload(images, {
    //   folder: 'profile'
    // })
    
    // Secure password by hashing it
    const hashPassword = await bcrypt.hash(password, 10);

    // Create entry in the database
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    //  images:{
    //   url: result.secure_url
    //  },
    //   text
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be created, please try again later",
    });
  }
};
