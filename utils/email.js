const nodemailer = require("nodemailer");

const sendMail = async options => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Define the email options
  const mailOptions = {
    from: "Paul Ngisiro <support@mafuta.io>",
    to: options.email,
    subject: options.subject,  
    text: options.message
    //html:
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
