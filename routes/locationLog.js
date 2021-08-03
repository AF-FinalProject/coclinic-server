const router = require('express').Router()
const LocationLogController = require('../controllers/LocationLogController')
const { authAdmin } = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/:id', authAdmin, LocationLogController.fetchAllByOrderId)


module.exports = router