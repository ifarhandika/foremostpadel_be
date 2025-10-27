const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Employee = sequelize.define(
  "Employee",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_name: { type: DataTypes.STRING, allowNull: false },
    employee_image: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, allowNull: false },
    status: { 
      type: DataTypes.ENUM("active", "inactive", "terminated"), 
      defaultValue: "active" 
    },
    join_date: { type: DataTypes.DATE, allowNull: false },
    leave_date: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_by: { type: DataTypes.STRING },
    updated_at: { type: DataTypes.DATE },
    updated_by: { type: DataTypes.STRING },
    row_status: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
)

module.exports = Employee
