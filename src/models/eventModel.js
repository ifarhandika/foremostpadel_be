const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  event_name: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  time: { type: DataTypes.DATE },
  location: { type: DataTypes.STRING },
  event_image: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE },
  created_by: { type: DataTypes.STRING },
  updated_by: { type: DataTypes.STRING },
  row_status: { type: DataTypes.INTEGER, defaultValue: 1 }
}, {
  tableName: "Events",
  timestamps: false
})

module.exports = Event