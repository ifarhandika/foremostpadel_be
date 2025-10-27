// src/controllers/emailController.js
const { sendEmail } = require("../services/emailService")

exports.sendContactEmail = async (req, res) => {
  const { subject, name, email, message } = req.body

  if (!subject || !name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" })
  }

  try {
    await sendEmail({ subject, name, email, message })
    res.json({ success: true, message: "Email sent successfully!" })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({ success: false, error: "Failed to send email" })
  }
}
