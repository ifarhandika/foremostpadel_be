module.exports.isSuperadmin = (user) => {
  return user && user.user_name === process.env.JWT_SUPERADMIN_USER
}
