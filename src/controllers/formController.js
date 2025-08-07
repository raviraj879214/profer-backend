const notificationController = require('./notificationController');

async function submitForm(req, res) {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    await notificationController.sendFormSubmissionNotification({ title, message });

    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error in submitForm:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { submitForm };
