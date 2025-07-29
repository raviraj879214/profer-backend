const nodemailer = require('nodemailer');



// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass:  process.env.SMTP_PASS,         
  }
});


// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "ravirajalphainfo@gmail.com",
//       pass: "dtdt usys ucsn fdva", // use App Password if 2FA is enabled
//     },
//   });



// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'peggie.swaniawski3@ethereal.email',
//         pass: 'htJGs4sj9a8w7Y9DUt'
//     }
// });


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
