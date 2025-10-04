const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
    created_by: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING },
    row_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
)

module.exports = User
