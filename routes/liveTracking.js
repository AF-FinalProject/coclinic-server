const router = require('express').Router()
const LiveTrackingController = require('../controllers/LiveTrackingController')
const { authAdmin } = require('../middlewares/auth')


router.put('/:id', authAdmin, LiveTrackingController.update)
router.get('/:id', authAdmin, LiveTrackingController.detail)


module.exports = router