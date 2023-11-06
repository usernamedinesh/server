const Project = require("../model/project");
const Review = require("../model/review");

//create Review
exports.createReview = async (req, res) => {
  try {
    const { projectId, name, email, comment, rating } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const existingReview = await Review.findOne({ projectId, email });
    if (existingReview) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already submitted a review for this project.",
        });
    }
    if(!name || ! email){
      return res.status(402).json({
        message:"enter the name and email first"
      })
    }

    const review = new Review({ name, email, comment, rating });
    await review.save();

    project.reviews.push(review);
    await project.save();

    res.json({ success: true, message: "Review submitted successfully." });
  } catch (error) {
    console.error("Error creating review:", error);

    if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyValue);
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already submitted a review for this project.",
        });
    }

    console.error("Validation Errors:", error.errors);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while submitting the review.",
      });
  }
};

//delete Review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    // Find the project that contains the review
    const project = await Project.findOne({ reviews: reviewId });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    // Remove the review from the project's reviews array
    project.reviews = project.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    await project.save();

    await Review.findByIdAndDelete(reviewId);

    res.json({ success: true, message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while deleting the review.",
      });
  }
};
//get Three Review
exports.getThreeReview = async (req, res) => {
  try {
    const reviews = await Review.find().limit(3).sort({ createdAt: -1 });

    if (reviews.length === 0) {
      res.json({ message: 'No reviews found.' });
    } else if (reviews.length < 3) {
      res.json({
        message: `Only ${reviews.length} review(s) found.`,
        reviews: reviews,
      });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};