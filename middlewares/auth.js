const { User, Order } = require('../models')
const { verifyToken } = require('../helpers/token-helper')


const authentication = async (req, res, next) => {
  const decode = verifyToken(req.headers.access_token)
  try {
    const user = await User.findByPk(+decode.id)
    if (user) {
      req.logginUser = { id: user.id, email: user.email, role: user.role }
      next()
    } else {
      next({ msg: "Invalid email or password" })
    }
  } catch (err) {
    next(err)
  }

};

const authAdmin = (req, res, next) => {
  (req.logginUser.role.toLowerCase() === 'admin') ? next() : next({ msg: "UnAuthorized - Access is denied" })
};

const authCustomer = async (req, res, next) => {
  (req.logginUser.role.toLowerCase() === 'customer') ? next() : next({ msg: "UnAuthorized - Access is denied" })
};

module.exports = { authentication, authAdmin, authCustomer };




