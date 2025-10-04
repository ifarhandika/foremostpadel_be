const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // JWT now stored in cookies
  const token = req.cookies?.token // assuming your cookie name is "token"

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" })
  }
}
