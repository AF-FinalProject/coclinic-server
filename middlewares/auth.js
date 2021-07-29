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
  (req.logginUser.role.toLowerCase() === 'admin') ? next() : { msg: "UnAuthorized - Access is denied" }
};



const authCustomer = async (req, res, next) => {
  const isCustomer = req.logginUser.role.toLowerCase() === 'customer'
  if (isCustomer) {
    try {
      const orders = await Order.findAll({ where: { UserId: +req.logginUser.id } })
        (orders.length) ? next() : next({ msg: "Order not found" })
    } catch (err) {
      next(err)
    }
  } else {
    next({ msg: "UnAuthorized - Access is denied" })
  }
};

module.exports = { authentication, authAdmin, authCustomer };




