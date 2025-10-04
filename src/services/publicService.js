const Court = require("../models/courtModel")
const Event = require("../models/eventModel")
const Investor = require("../models/investorModel")

exports.getAllCourts = async () => {
  return await Court.findAll({ where: { row_status: 1 } })
}

exports.getAllEvents = async () => {
  return await Event.findAll({ where: { row_status: 1 } })
}

exports.getAllInvestors = async () => {
  return await Investor.findAll({ where: { row_status: 1 } })
}
