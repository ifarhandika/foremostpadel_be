const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Investor = sequelize.define(
  "Investor",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    investor_name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    investor_image: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
    created_by: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING },
    row_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: "Investors",
    timestamps: false,
  }
)

module.exports = Investor
