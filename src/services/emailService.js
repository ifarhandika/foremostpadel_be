const transporter = require("../config/email")

exports.sendEmail = async ({ subject, name, email, message }) => {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `${subject} - ${name}`,
    text: message,
  }

  return transporter.sendMail(mailOptions)
}
