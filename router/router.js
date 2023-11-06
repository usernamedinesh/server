const express = require("express");
const router = express.Router();
const {getThreeReview,createReview} = require("../controllers/review");
const { submitContactForm} = require('../controllers/contact');

// contact form submission
router.post("/submit", submitContactForm);

//for adding review
router.post("/submit-review", createReview);

//getThree Review
router.get('/get-review',getThreeReview)

module.exports = router;
