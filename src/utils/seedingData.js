const bcrypt = require("bcrypt")
const User = require("../models/userModel")

async function seedSuperadmin() {
  const existing = await User.findOne({ where: { user_name: "admin" } })
  if (!existing) {
    const hashedPassword = await bcrypt.hash(process.env.JWT_SUPERADMIN_PASS, 10)
    await User.create({
      user_name: process.env.JWT_SUPERADMIN_USER || "admin",
      password: hashedPassword,
      row_status: 1,
      created_by: "system"
    })
    console.log("Superadmin user seeded: admin")
  }
}

module.exports = seedSuperadmin