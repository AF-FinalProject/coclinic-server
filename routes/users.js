const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication, authAdmin } = require("../middlewares/auth");

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/customers', authentication, authAdmin, UserController.fetchAllCustomer)

module.exports = router