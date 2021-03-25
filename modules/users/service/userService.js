const User = require('../models/User')

/**
 * Create a new user add returns it
 * @param {Object} userInput It is user input with all varibles for user modul
 */
const addUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}

module.exports = { addUser }
