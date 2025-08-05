const sendEmail = require("../lib/emailService");



exports.testPublic = (req, res) => {
  res.json({ message: '🟢 Public route accessed successfully (no auth required)' });
};



exports.testProtected = (req, res) => {
  
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized: No user token found' });
  }

  res.json({
    message: '🔐 Protected route accessed successfully',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role.name,
      status : req.user.status
    },
  });
};


exports.sendWelcomeEmail = async (req, res) => {
  const { email, name } = req.body;

  const result = await sendEmail({
    to: email,
    subject: "Welcome to Our Platform",
    text: `Hello ${name}, welcome!`,
    html: `<p>Hello <strong>${name}</strong>, welcome to our platform!</p>`
  });

  if (result.success) {
    return res.status(200).json({ message: "Email sent successfully" });
  } else {
    return res.status(500).json({ error: "Failed to send email", details: result.error });
  }
};