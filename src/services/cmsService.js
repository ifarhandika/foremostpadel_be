const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const Court = require("../models/courtModel")
const Event = require("../models/eventModel")
const Investor = require("../models/investorModel")

// Auth
exports.findUserByUsername = async (user_name) => {
  return await User.findOne({ where: { user_name, row_status: 1 } })
}

// Users
exports.createUser = async (data) => {
  data.password = await bcrypt.hash(data.password, 10)
  data.row_status = 1
  return await User.create(data)
}
exports.getUsers = async ({ page, limit }) => {
  return await User.findAndCountAll({
    where: { row_status: 1 },
    offset: (page - 1) * limit,
    limit: parseInt(limit)
  })
}
exports.updateUser = async (id, data) => {
  if (data.password) data.password = await bcrypt.hash(data.password, 10)
  await User.update(data, { where: { id, row_status: 1 } })
  return await User.findByPk(id)
}
exports.softDeleteUser = async (id) => {
  await User.update({ row_status: 0 }, { where: { id } })
}

// Courts
exports.createCourt = async (data) => {
  data.row_status = 1
  return await Court.create(data)
}
exports.getCourts = async ({ page, limit }) => {
  return await Court.findAndCountAll({
    where: { row_status: 1 },
    offset: (page - 1) * limit,
    limit: parseInt(limit)
  })
}
exports.updateCourt = async (id, data) => {
  await Court.update(data, { where: { id, row_status: 1 } })
  return await Court.findByPk(id)
}
exports.softDeleteCourt = async (id) => {
  await Court.update({ row_status: 0 }, { where: { id } })
}

// Events
exports.createEvent = async (data) => {
  data.row_status = 1
  return await Event.create(data)
}
exports.getEvents = async ({ page, limit }) => {
  return await Event.findAndCountAll({
    where: { row_status: 1 },
    offset: (page - 1) * limit,
    limit: parseInt(limit)
  })
}
exports.updateEvent = async (id, data) => {
  await Event.update(data, { where: { id, row_status: 1 } })
  return await Event.findByPk(id)
}
exports.softDeleteEvent = async (id) => {
  await Event.update({ row_status: 0 }, { where: { id } })
}

// Investors
exports.createInvestor = async (data) => {
  data.row_status = 1
  return await Investor.create(data)
}
exports.getInvestors = async ({ page, limit }) => {
  return await Investor.findAndCountAll({
    where: { row_status: 1 },
    offset: (page - 1) * limit,
    limit: parseInt(limit)
  })
}
exports.updateInvestor = async (id, data) => {
  await Investor.update(data, { where: { id, row_status: 1 } })
  return await Investor.findByPk(id)
}
exports.softDeleteInvestor = async (id) => {
  await Investor.update({ row_status: 0 }, { where: { id } })
}