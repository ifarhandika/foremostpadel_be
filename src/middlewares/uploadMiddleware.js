const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "public/others"
    if (req.baseUrl.includes("courts")) folder = "public/courts"
    if (req.baseUrl.includes("events")) folder = "public/events"
    if (req.baseUrl.includes("investors")) folder = "public/investors"
    const fullPath = path.join(__dirname, "../../", folder)
    // Create folder if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
    cb(null, fullPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

module.exports = upload
