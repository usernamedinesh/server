const express = require("express");
const multer = require('multer');


const storage = multer.diskStorage({});
const upload = multer({ storage });
const router = express.Router();
const {signup} = require("../controllers/signup");
const project = require("../controllers/project");
const {login,logout, getAllOwner} = require("../controllers/admin");
const { auth} = require("../middleware/auth");
const reviewController = require("../controllers/review");
const { getAllContactSubmissions, deleteContactSubmission} = require('../controllers/contact')
const {
  deleteBlogPost,
  createBlogPost,
  getAllBlogPosts,
  updateBlogPost,
  getSingleBlogPost,
  getBlogPostById,
  fetchBlogByTitle,
  searchMatchingTitles,
} = require("../controllers/Blog");
const {
  addDeveloper,
  deleteDeveloper,
  getAllDevelopers,
  updateDeveloper,
} = require("../controllers/devMember");


// Admin login route
router.post("/loginadmin", login);
router.post("/logout",auth, logout);
router.post("/registeradmin", signup);
router.get('/all-owner',getAllOwner)


// Create project route (only accessible by admin)
router.post("/create-projects", upload.single('thumbnail'), project.createProject);

router.get('/get-form',getAllContactSubmissions)
router.delete('/delete-form/:id',deleteContactSubmission)

router.get("/getallProjects", project.getAllProjects);

router.delete("/delete/:projectId", project.deleteProject);
router.delete("/reviews/:reviewId", reviewController.deleteReview);

//create blog
router.post("/create-blog", createBlogPost);
router.get("/blog-all", getAllBlogPosts);
router.delete("/delete-blog/:_id", deleteBlogPost);
router.put("/update-blog/:blogId", updateBlogPost);
router.get('/blog/:id', getBlogPostById);
router.get("/get-single-blog", getSingleBlogPost);
router.get('/getbytitle',fetchBlogByTitle)
router.get('/search', searchMatchingTitles);



//addEployee --->developer
router.post("/new-developer", upload.single('profile_picture'), addDeveloper);
router.delete("/delete-developer/:developerId", deleteDeveloper);
router.get("/get-all-dev", getAllDevelopers);
router.put("/update-dev/:developerId", upload.single('profile_picture'), updateDeveloper);




module.exports = router;


