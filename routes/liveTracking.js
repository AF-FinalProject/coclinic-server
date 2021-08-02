const router = require('express').Router()
const LiveTrackingController = require('../controllers/LiveTrackingController')
const { authAdmin, authCustomer } = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.put('/:id', authCustomer, LiveTrackingController.update)
router.get('/:id', authAdmin, LiveTrackingController.detail)


module.exports = router