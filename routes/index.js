const router = require('express').Router()
const userRoutes = require('./users')
const orderRoutes = require('./orders')
const locationRoutes = require('./locations')
const { authentication } = require('../middlewares/auth')


router.use('/', userRoutes)
router.use(authentication)
router.use('/orders', orderRoutes)
router.use('/location', locationRoutes)


module.exports = router