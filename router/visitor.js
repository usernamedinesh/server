const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { addVisitor, getVisitors } = require ("../controllers/visitor");
const {designUi} = require('../controllers/uiDesigns');
const {videosUploaded, videoUpload} = require('../controllers/videoUpload');



router.post('/add', addVisitor);
router.get('/get', getVisitors);
router.post('/uidesign',designUi);

router.post('/video-upload', upload.single('video'), videoUpload);
router.get('/get-video',videosUploaded)


module.exports = router;