module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Missing Authorization Header" })
  }
  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
  const [username, password] = credentials.split(":")
  // Replace with your user validation logic
  if (
    username === process.env.BASIC_AUTH_USER &&
    password === process.env.BASIC_AUTH_PASS
  ) {
    return next()
  }
  return res.status(401).json({ message: "Invalid Authentication Credentials" })
}
