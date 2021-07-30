const router = require('express').Router()
const userRoutes = require('./users')
const orderRoutes = require('./orders')
const trackingRoutes = require('./liveTracking')


router.use('/', userRoutes)
router.use('/orders', orderRoutes)
router.use('/tracking', trackingRoutes)


module.exports = router