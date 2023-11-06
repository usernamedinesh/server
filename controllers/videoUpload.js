const videoUploads = require('../model/video');
const cloudinary = require('cloudinary').v2; 

const { Readable } = require('stream');

exports.videoUpload = async (req, res) => {
  try {
    const { title } = req.body;
    const videoBuffer = req.file.buffer;

    // Create a readable stream from videoBuffer
    const videoStream = new Readable();
    videoStream._read = () => {};
    videoStream.push(videoBuffer);
    videoStream.push(null);

    // Optimize and upload the video to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploader = cloudinary.uploader.upload_stream(
        { resource_type: 'video', quality: 'auto' }, // Add optimization options as needed
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      videoStream.pipe(uploader);
    });

    // Save the Cloudinary URL to the database
    const video = new videoUploads({
      title,
      videoUrl: result.secure_url,
    });
    await video.save();

    res.status(200).json({ message: 'Video uploaded and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload video', error: error.message });
  }
};
//fetch video
exports.videosUploaded = async(req, res) =>{
    try {
        
        const videos = await videoUploads.find({}, 'title videoUrl'); 
        if (videos.length === 0) {
            return res.status(200).json({ message: 'No videos available' });
          }
        res.status(200).json(videos);

      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
      }
}