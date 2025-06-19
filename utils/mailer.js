const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'your-app-password'
  }
});

const sendReminderEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'youremail@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Error sending email:', err);
    else console.log('Email sent:', info.response);
  });
};

module.exports = sendReminderEmail;
