const express = require("express")
const router = express.Router()
const upload = require("../middlewares/uploadMiddleware")
const jwtAuth = require("../middlewares/jwtAuth")
const cmsController = require("../controllers/cmsController")

// Auth
router.post("/login", cmsController.login)
router.post("/logout", cmsController.logout)
router.get("/check-auth", cmsController.checkAuth)

// Users
router.post("/users", jwtAuth, cmsController.createUser)
router.get("/users", jwtAuth, cmsController.getUsers)
router.put("/users/:id", jwtAuth, cmsController.updateUser)
router.delete("/users/:id", jwtAuth, cmsController.deleteUser)

// Courts
router.post("/courts", jwtAuth, upload.single("court_image"), cmsController.createCourt)
router.get("/courts", jwtAuth, cmsController.getCourts)
router.put("/courts/:id", jwtAuth, upload.single("court_image"), cmsController.updateCourt)
router.delete("/courts/:id", jwtAuth, cmsController.deleteCourt)

// Events
router.post("/events", jwtAuth, upload.single("event_image"), cmsController.createEvent)
router.get("/events", jwtAuth, cmsController.getEvents)
router.put("/events/:id", jwtAuth, upload.single("event_image"),  cmsController.updateEvent)
router.delete("/events/:id", jwtAuth, cmsController.deleteEvent)

// Investors
router.post("/investors", jwtAuth, upload.single("investor_image"), cmsController.createInvestor)
router.get("/investors", jwtAuth, cmsController.getInvestors)
router.put("/investors/:id", jwtAuth, upload.single("investor_image"), cmsController.updateInvestor)
router.delete("/investors/:id", jwtAuth, cmsController.deleteInvestor)

// Employees
router.post("/employees", jwtAuth, upload.single("employee_image"), cmsController.createEmployee)
router.get("/employees", jwtAuth, cmsController.getEmployees)
router.put("/employees/:id", jwtAuth, upload.single("employee_image"), cmsController.updateEmployee)
router.delete("/employees/:id", jwtAuth, cmsController.deleteEmployee)

module.exports = router