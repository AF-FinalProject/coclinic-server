const router = require('express').Router()
const userRoutes = require('./users')
const orderRoutes = require('./orders')
const trackingRoutes = require('./liveTracking')
const midtransRoutes = require('./midtrans')


router.use('/', userRoutes)
router.use('/orders', orderRoutes)
router.use('/tracking', trackingRoutes)
router.use('/midtrans', midtransRoutes)


module.exports = router