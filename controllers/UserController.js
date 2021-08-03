const { User } = require('../models')
const { comparedPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')



class UserController {
  static async register(req, res, next) {
    try {
      const { name, nik, email, password, address, phone_number, dob, latitude, longitude } = req.body;
      const newUser = { name, nik, email, password, address, phone_number, dob, latitude, longitude }

      await User.create(newUser)
      res.status(201).json({ status: true, message: "Successfully Added User" })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } })
      if (user && comparedPassword(password, user.password)) {
        const access_token = generateToken({ id: user.id, email: user.email, name: user.name })
        res.status(200).json({ status: true, access_token })
      } else {
        next({ msg: "Invalid email or password" })
      }
    } catch (err) {
      next(err)
    }
  }
  //tambahan, belum ada test case(x) dan api_doc(v)
  static async fetchAllCustomer(req, res, next) {
		try {
			const customers = await User.findAll({
        where: { role: "Customer" },
        attributes: {
          exclude: ['password']
        },
				order: [['createdAt', 'DESC']]
			})
			res.status(200).json({ success: true, data: { customers } })
		} catch (err) {
			next(err)
		}
  }

}

module.exports = UserController