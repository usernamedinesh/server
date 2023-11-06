const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/admin");
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the detail ",
      });
    }
    let user = await User.findOne({ email });
    //if not a register user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found ",
      });
    }
    const payload = { email: user.email, id: user._id,  };
    //verify password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      //created jwtToken using sign method
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      //remove password in user object
      user.password = undefined;
      //sending cooie with response
      const options = {
        expires: new Date(Date.now() + 5 * 60 * 1000),
        // httpOnly: true, //can't access in cliet so
      };
      res.cookie("cookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User login successfully",
      });
    } else {
      //password do not match
      return res.status(500).json({
        success: false,
        message: "Password not math",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

// Admin dashboard function
exports.dashboard = (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in to access the admin dashboard.",
      });
    }

    // Access the authenticated user's information from the request object
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard!",
      userData: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while accessing the admin dashboard.",
    });
  }
};

//logout
exports.logout = (req, res) => {
  try {
    // Clear the token by setting its expiration time to the past
    res.clearCookie("cookie").status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//getAllOnwer or admin

exports.getAllOwner = async(req, res) =>{
  try {
    const admins = await User.find({}, 'name images text role'); // Select specific fields
    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching admin users.' });
  }
};
