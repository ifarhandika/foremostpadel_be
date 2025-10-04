require("../models/userModel")
require("../models/courtModel")
require("../models/eventModel")
require("../models/investorModel")
const sequelize = require("../config/database")

const authenticateDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync() // creates tables if they don't exist
    console.log("Database connected and tables synced.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    process.exit(1)
  }
}

module.exports = authenticateDB
