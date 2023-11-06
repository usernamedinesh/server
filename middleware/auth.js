const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/admin");

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.cookie;

    if (!token || token == undefined) {
      return res.status(500).json({
        success: false,
        message: "Please login first",
        auth: false // Set auth to false for unsuccessful authentication
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next()
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Token is invalid",
        auth: false // Set auth to false for unsuccessful authentication
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      auth: false // Set auth to false for unsuccessful authentication
    });
  }
};


// const isAdmin = async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token;
//     // const token = req.body.token;
//     const token = req.cookies.cookie;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication token not provided.",
//       });
//     }

//     // Verify the token
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decode;

//     // Assuming the email and role are stored in the JWT payload
//     const user = await User.findOne({ email: req.user.email });

//     if (user && req.user.role === "Admin") {
//       return next(); // Proceed to the next middleware or route handler
//     }

//     return res.status(403).json({
//       success: false,
//       message: "You don't have permission to access this route.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };

// module.exports = { auth, isAdmin };
