const publicService = require("../services/publicService")

exports.getAllCourts = async (req, res, next) => {
  try {
    const courts = await publicService.getAllCourts()
    res.json({
      success: true,
      message: "Court list fetched successfully",
      data: courts
    })
  } catch (err) {
    next(err)
  }
}

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await publicService.getAllEvents()
    res.json({
      success: true,
      message: "Event list fetched successfully",
      data: events
    })
  } catch (err) {
    next(err)
  }
}

exports.getAllInvestors = async (req, res, next) => {
  try {
    const investors = await publicService.getAllInvestors()
    res.json({
      success: true,
      message: "Investor list fetched successfully",
      data: investors
    })
  } catch (err) {
    next(err)
  }
}

exports.getCompanyData = async (req, res, next) => {
  try {
    const companyData = await publicService.getCompanyData()
    res.json({
      success: true,
      message: "Company Data fetched successfully",
      data: companyData
    })
  } catch (err) {
    next(err)
  }
}