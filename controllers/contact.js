const Contact = require("../model/contact");


 exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message, attachment } = req.body;
    let attachmentFileName = null;
    if (attachment) {
      const base64Data = attachment.replace(/^data:image\/png;base64,/, '');
      // Handle the attachment as needed (e.g., saving to disk, database, etc.)
      attachmentFileName = `attachment-${Date.now()}.png`;
    }
    const newContact = new Contact({
      name,
      email,
      message,
      attachment,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully.',
      contact: savedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the contact form.',
      error: error.message,
    });
  }
};














// Controller function to get all contact form submissions
exports.getAllContactSubmissions = async (req, res) => {
  try {
    // Retrieve all contact form submissions from the database
    const submissions = await Contact.find();
    res.status(200).json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching contact form submissions.",
    });
  }
};

exports.deleteContactSubmission = async (req, res) => {
  const submissionId = req.params.id;

  try {
    const deletedSubmission = await Contact.findByIdAndDelete(submissionId);
    if (!deletedSubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the submission.',
    });
  }
};