const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Court = sequelize.define(
  "Court",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    court_name: { type: DataTypes.STRING, allowNull: false },
    court_image: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
    created_by: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING },
    row_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: "Court",
    timestamps: false,
  }
)

module.exports = Court
