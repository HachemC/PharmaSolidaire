const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // email provider
  auth: {
    user: process.env.EMAIL_USER, // pharmasolidaire email address
    pass: process.env.EMAIL_PASS, // pharmasolidaire password or app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Add this line
  },
});

  
  const sendMail = (to, subject, text) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return reject(error);
        }
        console.log('Email sent:', info.response);
        resolve(info);
      });
    });
  };
  
  module.exports = sendMail;