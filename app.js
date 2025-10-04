require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const cookieParser = require("cookie-parser")
const app = express()
const port = process.env.PORT || 3000
const authenticateDB = require("./src/services/dbService")
const errorMiddleware = require("./src/middlewares/errorMiddleware")

const publicRouter = require("./src/routes/publicRoutes")
const cmsRouter = require("./src/routes/cmsRoutes")

const seedSuperadmin = require("./src/utils/seedingData")

app.use(cookieParser())
app.use(helmet())
app.use(
  cors({
    origin: "https://cms.foremostpadel.com", 
    credentials: true, 
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Public routes (no auth)
app.use("/v1/public", publicRouter)

// CMS routes (with JWT auth)
app.use("/v1/cms", cmsRouter)

// Health check
app.get("/", (req, res) => {
  res.send("Hello, Foremost!")
})

// Error handler
app.use(errorMiddleware)

app.listen(port, async () => {
  await authenticateDB()
  await seedSuperadmin()
  console.log(`Server is running at http://localhost:${port}`)
})
