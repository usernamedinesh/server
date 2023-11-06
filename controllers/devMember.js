const Developer = require("../model/devMember");
const Project = require("../model/project");
const cloudinary = require('cloudinary').v2;

exports.addDeveloper = async (req, res) => {
  const { FullName, email,  roles, skill,  } = req.body;
  const profile_picture = req.file.path

  try {
    if (!FullName || !email || !roles || !skill || !profile_picture) {
      return res.status(403).json({
        success: false,
        message: "All fields are required ",
      });
    }
    const existingMember = await Developer.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const result = await cloudinary.uploader.upload(profile_picture, {
      folder: 'kodevana/members',
    });

    // Create a new developer document
    const newDeveloper = new Developer({
      FullName,
      email,
      profile_picture:{
        url: result.secure_url
      } ,
      roles,
      skill,
    });
    const savedDeveloper = await newDeveloper.save();

    // const projectsDetails = await Project.find().select("title ");

    res.status(201).json({
      success: true,
      message: "New developer added!",
      savedDeveloper,
      // projectsDetails,
    });
  } catch (error) {
    console.error("An error occurred while adding a developer:", error);
    res.status(500).json({ error: "An error occurred!" });
}
};

// Controller to retrieve all developer members
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve developers", error: err.message });
  }
};

// Controller to update a specific developer member by ID
exports.updateDeveloper = async (req, res) => {
  try {
    const developerId = req.params.developerId;
    const { roles,email,name,skill } = req.body;

    
    const updateFields = {};
    if (roles) {
      updateFields.roles = roles;
    }
    if (name) {
      updateFields.FullName = name;
    }
    if (email) {
      updateFields.email = email;
    }
   
    if (skill) {
      updateFields.skill = skill;
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'kodevana/members',
      });
      updateFields.profile_picture = { url: result.secure_url };
    }

    const updatedDeveloper = await Developer.findByIdAndUpdate(
      developerId,
      updateFields,
      { new: true } 
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.json({
      message: "Developer updated successfully",
      data: updatedDeveloper,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update developer", error: err.message });
  }
};

// Controller to delete a specific developer member by ID
exports.deleteDeveloper = async (req, res) => {
  try {
    const developerId = req.params.developerId;
    const deletedDeveloper = await Developer.findByIdAndDelete(developerId);
    if (!deletedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }
    res.json({
      message: "Developer deleted successfully",
      data: deletedDeveloper,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete developer", error: err.message });
  }
};
