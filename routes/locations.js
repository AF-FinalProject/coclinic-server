const router = require('express').Router()
const LocationController = require('../controllers/LocationController')
const { authAdmin } = require('../middlewares/auth')


router.post('/', authAdmin, LocationController.add)
router.get('/:id', authAdmin, LocationController.detail)



module.exports = router