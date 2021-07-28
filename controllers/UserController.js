const { User } = require('../models')
const { comparedPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')



class UserController {
  static async register(req, res, next) {
    try {
      const { name, nik, email, password, address, phone_number, dob, latitude, longitude } = req.body;
      const newUser = { name, nik, email, password, address, phone_number, dob, latitude, longitude }

      await User.create(newUser)
      res.status(201).json({ status: true, message: "Successfully Added User"})
    } catch (err) {
      next(err)
    }
  }

  static login(req, res, next) {
    
  }

}

module.exports = UserController