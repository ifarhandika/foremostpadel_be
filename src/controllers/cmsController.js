const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const cmsService = require("../services/cmsService")
const { isSuperadmin } = require("../utils/authUtils")

exports.login = async (req, res, next) => {
  try {
    const { user_name, password } = req.body

    const user = await cmsService.findUserByUsername(user_name)
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" })
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, user_name: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // ✅ Set JWT as httpOnly cookie (cannot be accessed by JS)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ must be true for HTTPS (set to false if testing on localhost)
      sameSite: "None", // ✅ required for cross-domain (frontend <> backend)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    // ✅ Return success JSON (no token in body anymore)
    return res.json({
      success: true,
      message: "Login successful",
    })
  } catch (err) {
    next(err)
  }
}

exports.checkAuth = (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.json({ success: false, message: "No token found" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return res.json({
      success: true,
      user: {
        id: decoded.id,
        user_name: decoded.user_name,
      },
    })
  } catch (err) {
    return res.json({ success: false, message: "Invalid or expired token" })
  }
}

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  })
  res.json({ success: true, message: "Logged out successfully" })
}


// Users
exports.createUser = async (req, res, next) => {
  if (!isSuperadmin(req.user)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only admin can create users",
    })
  }
  try {
    const user = await cmsService.createUser(req.body)
    res.json({ success: true, message: "User created", data: user })
  } catch (err) {
    next(err)
  }
}
exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const users = await cmsService.getUsers({ page, limit })
    res.json({ success: true, message: "Users fetched", data: users })
  } catch (err) {
    next(err)
  }
}
exports.updateUser = async (req, res, next) => {
  if (!isSuperadmin(req.user)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only admin can update users",
    })
  }
  try {
    const user = await cmsService.updateUser(req.params.id, req.body)
    res.json({ success: true, message: "User updated", data: user })
  } catch (err) {
    next(err)
  }
}
exports.deleteUser = async (req, res, next) => {
  if (!isSuperadmin(req.user)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only admin can delete users",
    })
  }
  try {
    await cmsService.softDeleteUser(req.params.id)
    res.json({ success: true, message: "User deleted" })
  } catch (err) {
    next(err)
  }
}

// Courts
exports.createCourt = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      // Generate public URL (adjust domain as needed)
      data.court_image = `${process.env.BASE_URL}/public/courts/${req.file.filename}`
    }
    const court = await cmsService.createCourt(data)
    res.json({ success: true, message: "Court created", data: court })
  } catch (err) {
    next(err)
  }
}
exports.getCourts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const courts = await cmsService.getCourts({ page, limit })
    res.json({ success: true, message: "Courts fetched", data: courts })
  } catch (err) {
    next(err)
  }
}
exports.updateCourt = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.court_image = `${process.env.BASE_URL}/public/courts/${req.file.filename}`
    }
    const court = await cmsService.updateCourt(req.params.id, data)
    res.json({ success: true, message: "Court updated", data: court })
  } catch (err) {
    next(err)
  }
}
exports.deleteCourt = async (req, res, next) => {
  try {
    await cmsService.softDeleteCourt(req.params.id)
    res.json({ success: true, message: "Court deleted" })
  } catch (err) {
    next(err)
  }
}

// Events
exports.createEvent = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.event_image = `${process.env.BASE_URL}/public/events/${req.file.filename}`
    }
    const event = await cmsService.createEvent(data)
    res.json({ success: true, message: "Event created", data: event })
  } catch (err) {
    next(err)
  }
}
exports.getEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const events = await cmsService.getEvents({ page, limit })
    res.json({ success: true, message: "Events fetched", data: events })
  } catch (err) {
    next(err)
  }
}
exports.updateEvent = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.event_image = `${process.env.BASE_URL}/public/events/${req.file.filename}`
    }
    const event = await cmsService.updateEvent(req.params.id, data)
    res.json({ success: true, message: "Event updated", data: event })
  } catch (err) {
    next(err)
  }
}
exports.deleteEvent = async (req, res, next) => {
  try {
    await cmsService.softDeleteEvent(req.params.id)
    res.json({ success: true, message: "Event deleted" })
  } catch (err) {
    next(err)
  }
}

// Investors
exports.createInvestor = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.investor_image = `${process.env.BASE_URL}/public/investors/${req.file.filename}`
    }
    const investor = await cmsService.createInvestor(data)
    res.json({ success: true, message: "Investor created", data: investor })
  } catch (err) {
    next(err)
  }
}
exports.getInvestors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const investors = await cmsService.getInvestors({ page, limit })
    res.json({ success: true, message: "Investors fetched", data: investors })
  } catch (err) {
    next(err)
  }
}
exports.updateInvestor = async (req, res, next) => {
  try {
    let data = req.body
    if (req.file) {
      data.investor_image = `${process.env.BASE_URL}/public/investors/${req.file.filename}`
    }
    const investor = await cmsService.updateInvestor(req.params.id, data)
    res.json({ success: true, message: "Investor updated", data: investor })
  } catch (err) {
    next(err)
  }
}
exports.deleteInvestor = async (req, res, next) => {
  try {
    await cmsService.softDeleteInvestor(req.params.id)
    res.json({ success: true, message: "Investor deleted" })
  } catch (err) {
    next(err)
  }
}
