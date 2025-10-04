const express = require("express")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")
const cmsController = require("../controllers/cmsController")

// Auth
router.post("/login", cmsController.login)

// Users
router.post("/users", jwtAuth, cmsController.createUser)
router.get("/users", jwtAuth, cmsController.getUsers)
router.put("/users/:id", jwtAuth, cmsController.updateUser)
router.delete("/users/:id", jwtAuth, cmsController.deleteUser)

// Courts
router.post("/courts", jwtAuth, cmsController.createCourt)
router.get("/courts", jwtAuth, cmsController.getCourts)
router.put("/courts/:id", jwtAuth, cmsController.updateCourt)
router.delete("/courts/:id", jwtAuth, cmsController.deleteCourt)

// Events
router.post("/events", jwtAuth, cmsController.createEvent)
router.get("/events", jwtAuth, cmsController.getEvents)
router.put("/events/:id", jwtAuth, cmsController.updateEvent)
router.delete("/events/:id", jwtAuth, cmsController.deleteEvent)

// Investors
router.post("/investors", jwtAuth, cmsController.createInvestor)
router.get("/investors", jwtAuth, cmsController.getInvestors)
router.put("/investors/:id", jwtAuth, cmsController.updateInvestor)
router.delete("/investors/:id", jwtAuth, cmsController.deleteInvestor)

module.exports = router