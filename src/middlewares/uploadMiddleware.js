const multer = require("multer")
const path = require("path")
const fs = require("fs")

// Base folder where files should be stored (cPanel public_html)
const BASE_UPLOAD_PATH = process.env.BASE_UPLOAD_PATH

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "others"

    if (req.path.includes("/courts")) folder = "courts"
    if (req.path.includes("/events")) folder = "events"
    if (req.path.includes("/investors")) folder = "investors"

    const fullPath = path.join(BASE_UPLOAD_PATH, folder)

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
