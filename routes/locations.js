const router = require('express').Router()
const LocationController = require('../controllers/LocationController')

router.post('/', LocationController.add)
router.get('/:id', LocationController.detail)

module.exports = router