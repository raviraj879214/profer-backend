const nodemailer = require('nodemailer');



// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass:  process.env.SMTP_PASS,         
  }
});

// Send Email Function
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM, 
      to,
      subject,
      text,
      html
    });

    console.log("Email sent: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);  // Log full error details
    return { 
      success: false, 
      error: error.message || "An unknown error occurred while sending email", 
      stack: error.stack // Optional: Include stack trace for debugging
    };
  }
};

module.exports = sendEmail;
