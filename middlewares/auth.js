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
  (req.logginUser.role.tolowerCase() === 'admin') ? next() : { msg: "UnAuthorized - Access is denied" }
};

const authCustomer = async (req, res, next) => {
  const idOrder = +req.params.id;
  try {
    const order = await Order.findByPk(idOrder)
    if (order) {
      const isAuthorized = order.UserId === +req.logginUser.id;
      isAuthorized ? next() : next({ msg: "UnAuthorized - Access is denied" })
    } else {
      next({ msg: 'Order not found' })
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { authentication, authAdmin, authCustomer };




