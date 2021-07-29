const router = require('express').Router()
const LiveTrackingController = require('../controllers/LiveTrackingController')
const { authAdmin } = require('../middlewares/auth')


// router.post('/', authAdmin, LiveTrackingController.add)
router.get('/:id', authAdmin, LiveTrackingController.detail)



module.exports = router