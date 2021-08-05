const router = require('express').Router()
const userRoutes = require('./users')
const orderRoutes = require('./orders')
const trackingRoutes = require('./liveTracking')
const midtransRoutes = require('./midtrans')
const locationLogRoutes = require('./locationLog')
const certificateRoutes = require('./certificate')

router.use('/', userRoutes)
router.use('/orders', orderRoutes)
router.use('/tracking', trackingRoutes)
router.use('/midtrans', midtransRoutes)
router.use('/logs', locationLogRoutes)
router.use('/certificate', certificateRoutes)


module.exports = router