const Project = require("../model/project");
const cloudinary = require('cloudinary').v2;

exports.createProject = async (req, res) => {
  try {
    const {  title, content ,category} = req.body;
    const thumbnail = req.file.path;

    // Check if required fields are provided
    if (!thumbnail || !title || !content || !category) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields.",
        });
    }
   
    const result = await cloudinary.uploader.upload(thumbnail, {
      folder: 'kodevana/projects',
    });

    const newProject = new Project({
      thumbnail:{
        url: result.secure_url,
      },
      title,
      content,
      category
    });

    const project = await newProject.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Project created successfully.",
        project,
      });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while creating the project.",
      });
  }
};

// Delete project function
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    // Delete the project from the database
    await Project.deleteOne({ _id: projectId });

    res.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while deleting the project.",
      });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database with populated reviews
    const projects = await Project.find().populate("reviews").exec();

    res.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while fetching projects.",
      });
  }
};