const express = require("express")
const router = express.Router()
const publicController = require("../controllers/publicController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/courts", authMiddleware, publicController.getAllCourts)
router.get("/events", authMiddleware, publicController.getAllEvents)
router.get("/investors", authMiddleware, publicController.getAllInvestors)

module.exports = router
